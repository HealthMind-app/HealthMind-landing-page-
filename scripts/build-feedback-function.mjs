import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import ts from "typescript";

// Reuse the tested Next.js handler; only its Firebase credential provider changes.
await mkdir("feedback-functions/generated", { recursive: true });
const source = (await readFile("app/api/email-feedback/route.ts", "utf8"))
  .replace('@/lib/email-feedback/firebase.mjs', '../firebase.mjs')
  .replace('@/lib/email-feedback/core.mjs', './core.mjs');
const result = ts.transpileModule(source, { compilerOptions: {
  target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022,
} });
await writeFile("feedback-functions/generated/route.mjs", result.outputText);
await copyFile("lib/email-feedback/core.mjs", "feedback-functions/generated/core.mjs");
console.log("Firebase feedback handler prepared.");
