import validator from "amphtml-validator";
import { buildEmail } from "../lib/email-feedback/template.mjs";
const email = buildEmail("A".repeat(43), "https://www.healthmindgroup.com");
const result = (await validator.getInstance()).validateString(email.amp, "AMP4EMAIL");
console.log(`AMP4EMAIL: ${result.status}`);
for (const error of result.errors) console.log(`${error.severity} ${error.line}:${error.col} ${error.message}`);
if (result.status !== "PASS") process.exitCode = 1;
