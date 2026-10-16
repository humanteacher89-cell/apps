// 한글원샷은 새 주소로 옮겼다(2026-10-16). 옛 주소에 남은 서비스 워커가 옛 화면을 쥐고 있지 않게 스스로 지우고 저장본도 비운다.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  const ks = await caches.keys(); await Promise.all(ks.filter(k => k.indexOf('oneshot-') === 0).map(k => caches.delete(k)));
  await self.registration.unregister();
  const cs = await self.clients.matchAll({ type: 'window' }); cs.forEach(c => c.navigate(c.url));
})()));