import {run} from './feedback-sender.mjs';
const mode=process.argv[2];
if(!['preview','send-test'].includes(mode))throw Error('Use preview or send-test. Bulk sending uses send-feedback-production.mjs.');
await run(mode==='preview'?'preview':'test');
