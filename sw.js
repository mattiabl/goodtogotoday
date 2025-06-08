self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('goodtogo-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/quotes/quotes.json'
      ]);
    })
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});