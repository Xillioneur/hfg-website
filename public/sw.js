const CACHE_NAME = 'holyforge-v1';
const ASSETS_TO_PREFETCH = [
  '/games/sample.js',
  '/games/sample.wasm',
  '/games/cr-episode-8.js',
  '/games/cr-episode-8.wasm',
  '/games/cr-episode-10.js',
  '/games/cr-episode-10.wasm',
  '/games/starforge-3d.js',
  '/games/starforge-3d.wasm'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Non-blocking background fetch
      return cache.addAll(ASSETS_TO_PREFETCH);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
