// Render meme.html to meme.png with Chrome for Testing (headless).
// Deterministic: fixed window size, no network, same input -> same pixels.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));
const chrome = '/home/hatch/.hermes/tools/chromium-1248/chrome-linux64/chrome';
const html = join(dir, 'meme.html');
const out = join(dir, 'meme.png');

execFileSync(chrome, [
  '--headless',
  '--disable-gpu',
  '--no-sandbox',
  '--hide-scrollbars',
  `--window-size=1024,1024`,
  `--screenshot=${out}`,
  `file://${html}`,
], { stdio: 'inherit' });

if (!existsSync(out)) {
  console.error('render failed: meme.png was not created');
  process.exit(1);
}
console.log(`wrote ${out}`);
