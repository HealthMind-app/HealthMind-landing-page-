import assert from 'node:assert/strict';
import test from 'node:test';
import {recipients,message,ENDPOINT} from './feedback-sender.mjs';
test('headerless export retains first recipient and deduplicates quoted CSV',()=>{assert.deepEqual(recipients('id,first@example.com,true,,,"Name, One"\r\nid2,second@example.com,true,,,Two\r\nid3,FIRST@example.com,true'),['first@example.com','second@example.com']);});
test('headers and malformed records',()=>{assert.deepEqual(recipients('uid,email\nid,a@example.com'),['a@example.com']);assert.throws(()=>recipients('id,broken'));assert.throws(()=>recipients('id,"broken'));});
test('email points directly to Firebase page and carries token in both formats',()=>{const token='a'.repeat(43),m=message(token,true);const href=m.html.match(/href="([^"]+)"/)[1].replaceAll('&amp;','&');const u=new URL(href);assert.equal(u.origin+u.pathname,ENDPOINT);assert.equal(u.searchParams.get('view'),'page');assert.equal(u.searchParams.get('token'),token);assert.ok(m.text.includes(href));assert.ok(!m.html.includes('www.healthmindgroup.com'));assert.ok(m.subject.startsWith('[TEST]'));});
