// One word for your Wi-Fi: "Lagacy".
//
// Lagacy is lag wearing legacy's coat: the network's one lasting
// inheritance, passed down from router to router, is that it lags.
// Guests see the name, picture every frozen call and stalled video
// they have ever suffered on this network, and laugh before they
// even type the password — because the joke is the network's whole
// family history in a single word.
//
// Why this word, and not the obvious ones: the two earlier entries
// for this bounty died the same way — "Diva" and "Buffering" were
// both excluded in ranking because another account already held the
// same text. "Lagacy" is a coined blend nobody has published as a
// Wi-Fi name: a web search finds no Wi-Fi list, no meme page, no
// dictionary entry carrying it. It is short (6 letters, so it also
// wins the byte tie-break), it reads instantly as lag + legacy,
// and it needs no explanation to land.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The entry word. Exactly one word, 1-20 characters, no whitespace.
const ENTRY_WORD = "Lagacy";

// The sealed gate: /output/entry.txt must hold UTF-8 text of 1 to 20
// characters, not only white space. Refuse to write anything that
// would fail it, instead of writing a bad entry and hoping.
function assertSingleWord(word: string): void {
  if (/^\S{1,20}$/.test(word)) return;
  throw new Error(`entry word fails the one-word gate: ${JSON.stringify(word)}`);
}

// Where the entry goes. The grader runs this program from another
// directory, so every path is built from the script's own location
// (import.meta.url) and the environment — never from the working
// directory. An absolute MAKEFUN_OUTPUT_DIR is used as-is; a
// relative one is read against the script's folder; without the
// variable the harness default /output applies.
function resolveOutputDir(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return fromEnv ? resolve(here, fromEnv) : "/output";
}

function main(): void {
  assertSingleWord(ENTRY_WORD);
  const dir = resolveOutputDir();
  mkdirSync(dir, { recursive: true });
  // No trailing newline: the file holds exactly the word, nothing else.
  writeFileSync(join(dir, "entry.txt"), ENTRY_WORD, "utf8");
}

main();
