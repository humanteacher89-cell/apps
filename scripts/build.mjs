// 올릴 묶음(_site/) 만들기 — GitHub Actions와 PC(GitHub이 막혔을 때)가 똑같이 쓴다.
//   _site/            ← site-root/ (첫 화면 · 옛 주소 넘김 _redirects)
//   _site/apps/       ← 이 저장소의 앱들(점검 · 올리기 도구와 안내 글은 빼고)
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const OUT = path.join(ROOT, '_site');
const SKIP = new Set(['.git', '.github', 'site-root', 'scripts', 'node_modules', '_site', 'CLAUDE.md', 'README.md', 'prev.txt']);

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'apps'), { recursive: true });
fs.cpSync(path.join(ROOT, 'site-root'), OUT, { recursive: true });
for (const name of fs.readdirSync(ROOT)) {
  if (SKIP.has(name)) continue;
  fs.cpSync(path.join(ROOT, name), path.join(OUT, 'apps', name), { recursive: true });
}
let n = 0;
(function walk(d) { for (const x of fs.readdirSync(d, { withFileTypes: true })) x.isDirectory() ? walk(path.join(d, x.name)) : n++; })(OUT);
console.log(`묶음 만듦: _site/ 파일 ${n}개`);
