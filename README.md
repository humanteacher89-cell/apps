# apps
## 올리기 (2026-11-16부터 GitHub이 올림)
- `main`에 들어오면 GitHub Actions(`.github/workflows/deploy.yml`)가 묶음 만들기(`scripts/build.mjs` → `_site/`: `site-root/`의 첫 화면 · `_redirects` + 앱들은 `_site/apps/`) → 점검(`scripts/check.mjs`) → Cloudflare Pages `humanssaem-apps`에 올리기 → 실제 주소 확인(`scripts/verify.mjs`, 바이트까지)을 한다. 확인이 실패하면 앞 판으로 되돌린다(`scripts/cf.mjs`).
- 열쇠는 저장소 비밀 `CLOUDFLARE_API_TOKEN`(휴먼쌤이 넣음). 저장소 파일에는 열쇠가 없다.
- GitHub이 막혔을 때(PC): `node scripts/build.mjs` → `node scripts/check.mjs _site` → `wrangler pages deploy _site --project-name humanssaem-apps --branch main` → `node scripts/verify.mjs _site https://humanssaem-apps.pages.dev`.

## 고장 났을 때
1. Cloudflare 화면 → Workers & Pages → humanssaem-apps → Deployments → 앞 판의 … → Rollback(1분).
2. GitHub에서 문제 생긴 기록을 Revert → 자동으로 다시 올라감(5분).
3. PC 창에 "미니앱 되돌려"(10분).
