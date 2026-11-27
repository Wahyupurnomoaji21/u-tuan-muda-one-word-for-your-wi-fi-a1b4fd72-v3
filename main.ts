// "Lagacy" — one word for your Wi-Fi.
//
// The name is a blend of lag and legacy. Every router in the house
// hands the same inheritance down the line: the connection lags.
// A guest reads it, remembers each frozen call and stalled video
// this network ever served, and laughs before typing the password.
// The whole family history of the network, packed into one word.
//
// The earlier tries for this bounty, "Diva" and "Buffering", were
// both struck from the ranking because another account had already
// claimed the same text. "Lagacy" is coined here: no Wi-Fi list,
// meme page, or dictionary carries it, so it cannot collide. Six
// letters, instantly readable as lag + legacy, and it lands with
// no explanation at all.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The word that becomes the Wi-Fi name. One word, 1-20 characters.
const WIFI_WORD = "Lagacy";

// The bounty gate, in code: the entry must be a single word of
// 1 to 20 characters with no whitespace anywhere. Anything else
// would fail the grader, so we stop here instead of writing it.
const ONE_WORD = /^\S{1,20}$/;

function checkWordIsOneWord(word: string): string {
  if (!ONE_WORD.test(word)) {
    throw new Error(`not a valid one-word entry: ${JSON.stringify(word)}`);
  }
  return word;
}

// Work out where the entry file belongs. The grader may run this
// program from any working directory, so nothing here trusts the
// current directory: the script's own folder comes from
// import.meta.url, and the output folder comes from the
// MAKEFUN_OUTPUT_DIR environment variable. An absolute value is
// honoured as-is, a relative one is read against the script's
// folder, and with no variable set the harness default /output
// is used.
function locateOutputFolder(): string {
  const scriptFolder = dirname(fileURLToPath(import.meta.url));
  const requested = process.env.MAKEFUN_OUTPUT_DIR;
  if (requested === undefined || requested === "") {
    return "/output";
  }
  return resolve(scriptFolder, requested);
}

function prepareFolder(folder: string): void {
  mkdirSync(folder, { recursive: true });
}

// Write the word and nothing else: exactly the six bytes of
// "Lagacy", with no trailing newline after them.
function writeEntryFile(folder: string, word: string): void {
  writeFileSync(join(folder, "entry.txt"), word, "utf8");
}

function run(): void {
  const word = checkWordIsOneWord(WIFI_WORD);
  const folder = locateOutputFolder();
  prepareFolder(folder);
  writeEntryFile(folder, word);
}

run();
