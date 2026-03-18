const CACHE_NAME = 'clubnoteke-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/membership.html',
  '/events.html',
  '/know-your-car.html',
  '/gallery.html',
  '/community.html',
  '/dashboard.html',
  '/garage.html',
  '/css/shared.css',
  '/css/style.css',
  '/css/gallery.css',
  '/js/main.js',
  '/js/session-guard.js',
  '/js/gallery.js',
  '/assets/club_logo.png',
  '/assets/hero-wide-lineup.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
