const CACHE_NAME = 'buana-studio-v19';
const ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/essentials.html',
  '/journal.html',
  '/learning.html',
  '/practice.html',
  '/products.html',
  '/systems.html',
  '/css/style.css',
  '/js/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
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
