const CACHE_NAME = 'rayien-v1';
const urlsToCache = [
  '/rayien-analytics/',
  '/rayien-analytics/index.html',
  '/rayien-analytics/manifest.json',
  '/rayien-analytics/icon-192.png',
  '/rayien-analytics/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
