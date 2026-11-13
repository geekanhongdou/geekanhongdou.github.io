/* Retire the legacy blog worker so old cached copies cannot hide the new homepage. */
const legacyCaches = [
  'main-precache-then-runtime',
  'precache-v1',
  'runtime',
  'main-precache-v1',
  'main-runtime'
];

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    await Promise.all(legacyCaches.map((name) => caches.delete(name)));
    await self.clients.claim();
    await self.registration.unregister();
  })());
});