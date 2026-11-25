// Make the AI Judge Laugh — u-alfasurya91-make-the-ai-judge-laugh-6ed40225
// One office joke, one line, under 200 characters. The thermostat war:
// a temperature nobody agrees on, a summer coat rack and a winter fan.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Our office thermostat is set to a temperature nobody agrees on, which explains why we have a summer coat rack and a winter fan.";

function fail(message: string): never {
  console.error(`entry rejected: ${message}`);
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 200) {
  fail(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (!LINE.trim()) {
  fail("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("entry must be exactly one line");
}
// Invisible junk must never reach the stone: control characters other
// than tab are rejected, and so is leading/trailing whitespace, which
// would change the bytes without changing what a reader sees.
if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(LINE)) {
  fail("entry must not contain control characters");
}
if (LINE !== LINE.trim()) {
  fail("entry must not have leading or trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
// Read-back check: the bytes on disk must be exactly the line + newline.
const onDisk = readFileSync(outPath, "utf8");
if (onDisk !== LINE + "\n") {
  fail("read-back mismatch: file on disk differs from the entry line");
}
console.log(`wrote ${outPath}: ${LINE.length} characters`);
