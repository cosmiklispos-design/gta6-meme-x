// gta6-meme-x-01 entry (Node 22, standard library only): it copies POST.json
// (the X post's address) and meme.png (the meme picture) from the repository
// root to /output, where the gate reads POST.json. The entry is the post
// itself: a GTA 6 meme posted on X from a public account with make.fun (a
// link or written out) and/or a tag of @makefunai and the entrant's play code
// in its text, POST.json naming the post. The house reads the post from X
// (its first picture and its text) and hands that to the judge. Nothing this
// program writes about the post is judged.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });

const post = JSON.parse(readFileSync(join(BOT_DIR, 'POST.json'), 'utf8'));
if (typeof post !== 'object' || post === null || typeof post.url !== 'string') {
  console.error('POST.json must be a JSON object with a string url');
  process.exit(1);
}

try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
  copyFileSync(join(BOT_DIR, 'meme.png'), join(OUTPUT_DIR, 'meme.png'));
} catch (err) {
  console.error(`could not copy entry files from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

console.log(`copied POST.json (${post.url}) and meme.png to ${OUTPUT_DIR}`);
