import {createHash, randomBytes} from 'node:crypto';
import fs from 'node:fs';
import {Timestamp} from 'firebase-admin/firestore';
import {getAuth} from 'firebase-admin/auth';
import {getApp} from 'firebase-admin/app';
import {feedbackDb} from '../lib/email-feedback/firebase.mjs';
import {CAMPAIGN,COLLECTION,SENDER,tokenId} from '../lib/email-feedback/core.mjs';
export const ENDPOINT='https://us-central1-healthmind-app.cloudfunctions.net/healthmindEmailFeedback';
export function recipients(csv) {
  const rows=[];let row=[],field='',quoted=false;
  csv=csv.replace(/^\uFEFF/,'');
  for(let i=0;i<csv.length;i++){const c=csv[i];if(c==='"'){if(quoted&&csv[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}else if(c===','&&!quoted){row.push(field);field='';}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&csv[i+1]==='\n')i++;row.push(field);if(row.some(Boolean))rows.push(row);row=[];field='';}else field+=c;}
  if(quoted)throw Error('Unclosed CSV quote');row.push(field);if(row.some(Boolean))rows.push(row);
  const seen=new Set();return rows.flatMap(r=>{const email=r[1]?.trim().toLowerCase();if(email==='email')return [];if(!email||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw Error('Invalid email in CSV; no send attempted');if(seen.has(email))return [];seen.add(email);return [email];});
}
export function message(token,test=false){
 const link=new URL(ENDPOINT);link.searchParams.set('view','page');link.searchParams.set('token',token);
 const subject=test?'[TEST] HealthMind feedback - working Firebase link':'HealthMind feedback - a quick question';
 const text=`Hi,\n\nWe're working to improve HealthMind and would like to hear from you.\n\nWhich areas need improvement?\n- App Speed & Performance\n- Finding Features / Navigation\n- Exercises & Content Variety\n\nShare your feedback: ${link.href}\n\nThis opens a feedback page in your browser. Select any that apply; your selections save automatically.\n\nThank you for being part of HealthMind.\nYour Health, Your Mind, Your Future.`;
 const html=`<!doctype html><html><body style="font-family:Arial,sans-serif;color:#172033;margin:0"><div style="max-width:560px;margin:auto;padding:28px 20px;line-height:1.6"><p>Hi,</p><p>We're working to improve HealthMind and would like to hear from you.</p><p><strong>Which areas need improvement?</strong></p><ul><li>App Speed &amp; Performance</li><li>Finding Features / Navigation</li><li>Exercises &amp; Content Variety</li></ul><p><a href="${link.href.replaceAll('&','&amp;')}" style="display:inline-block;background:#2067a1;color:white;padding:14px 22px;border-radius:8px;text-decoration:none">Share your feedback</a></p><p>This opens a feedback page in your browser. Select any that apply; your selections save automatically.</p><p>Thank you for being part of HealthMind.</p><p>Your Health, Your Mind, Your Future.</p></div></body></html>`;
 return {from:`HealthMind <${SENDER}>`,subject,text,html};
}
export async function run(mode,args=process.argv.slice(2)){
 process.loadEnvFile('.env.local');
 if(mode==='preview'){fs.mkdirSync('.feedback-preview',{recursive:true});fs.writeFileSync('.feedback-preview/web-email.html',message(randomBytes(32).toString('base64url'),true).html);console.log('Preview written; no email sent.');return;}
 const test=mode==='test';
 if(!process.env.RESEND_API_KEY)throw Error('Missing RESEND_API_KEY');
 const page=await fetch(ENDPOINT+'?view=page',{redirect:'manual',signal:AbortSignal.timeout(20000)});
 if(page.status!==200||!(await page.text()).includes('Help us improve HealthMind'))throw Error('Firebase page check failed; send stopped');
 const runId=test?'firebase-correction-test-2026-10-01':'firebase-correction-2026-10-01';
 const db=feedbackDb();let accepted=0,skipped=0;
 try{
 const addresses=new Set(['jeffersonmagala@gmail.com']);let pageToken;let accounts=0,withoutEmail=0,disabled=0;
 if(!test){do{const page=await getAuth(getApp('healthmind-feedback')).listUsers(1000,pageToken);for(const user of page.users){accounts++;if(user.disabled){disabled++;continue;}if(!user.email){withoutEmail++;continue;}const email=user.email.trim().toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw Error('Invalid current Auth email; stopped');addresses.add(email);}pageToken=page.pageToken;}while(pageToken);}
 const emails=[...addresses];
 console.log(JSON.stringify({source:'current Firebase Authentication plus requested test address',accounts,withoutEmail,disabled,uniqueRecipients:emails.length}));
 if(!test&&!args.includes('--send')){console.log('Dry run; no email sent.');return;}
 for(const email of emails){
 const prior=await db.collection(COLLECTION).where('email','==',email).get();
 if(!test&&prior.docs.some(d=>['complained','unsubscribed'].includes(d.data().deliveryStatus)||d.data().unsubscribed===true||(d.data().deliveryStatus==='bounced'&&email!=='jeffersonmagala@gmail.com'))){skipped++;continue;}
 const dispatchId=createHash('sha256').update(runId+'\n'+email).digest('hex');
 const dispatch=db.collection('healthmind_email_dispatches').doc(dispatchId);
 const token=randomBytes(32).toString('base64url'),ref=db.collection(COLLECTION).doc(tokenId(token));
 const claimed=await db.runTransaction(async tx=>{const previous=await tx.get(dispatch);if(previous.exists&&!(previous.data().status==='rejected'&&previous.data().providerError==='monthly_quota_exceeded'))return false;tx.set(dispatch,{runId,email,status:'pending',feedbackRecord:ref.id,createdAt:Timestamp.now()});tx.create(ref,{email,campaign:CAMPAIGN,format:test?'firebase-correction-test':'firebase-correction',choices:[],responseReceived:false,createdAt:Timestamp.now(),lastUpdatedAt:Timestamp.now(),expiresAt:Timestamp.fromMillis(Date.now()+30*86400000),deliveryStatus:'pending'});return true;});
 if(!claimed){skipped++;continue;}
 try{
 const r=await fetch('https://api.resend.com/emails',{method:'POST',redirect:'error',signal:AbortSignal.timeout(30000),headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':dispatchId},body:JSON.stringify({...message(token,test),to:[email]})});
 const data=await r.json();if(!r.ok||!data.id){const error=Error(`Resend HTTP ${r.status}: ${data.name||'no email ID'}`);if(data.name==='monthly_quota_exceeded')error.quotaExceeded=true;throw error;}
 const batch=db.batch();batch.update(ref,{deliveryStatus:'accepted',providerEmailId:data.id});batch.update(dispatch,{status:'accepted',providerEmailId:data.id});await batch.commit();accepted++;
 console.log(JSON.stringify({status:'accepted',providerEmailId:data.id,feedbackRecord:ref.id,...(test?{recipient:email,subject:message(token,true).subject}:{})}));
 }catch(e){const batch=db.batch();const state=e.quotaExceeded?'rejected':'unknown';const details=e.quotaExceeded?{providerError:'monthly_quota_exceeded',httpStatus:429}:{};batch.update(ref,{deliveryStatus:state,...details});batch.update(dispatch,{status:state,...details});await batch.commit();throw Error(`Send stopped; reconcile dispatch ${dispatchId} in Resend before retrying. ${e.message}`);}
 if(!test)await new Promise(r=>setTimeout(r,1000));
 }
 console.log(JSON.stringify({accepted,skipped,note:'Accepted is not confirmation of inbox delivery.'}));
 }finally{await db.terminate();}
}
