const CACHE = 'kawan-hawe-chorwa-v7';
const ASSETS = [
  './','./index.html','./styles.css','./game-core.js','./app.js','./manifest.webmanifest','./assets/icon-48.png','./assets/icon-192.png','./assets/icon-512.png',
  './assets/anime/naruto.jpg','./assets/anime/itachi.jpg','./assets/anime/luffy.jpg','./assets/anime/zoro.jpg',
  './assets/anime/goku.jpg','./assets/anime/light.jpg','./assets/anime/gojo.jpg','./assets/anime/levi.jpg',
  './assets/anime/tsunade.jpg','./assets/anime/hinata.jpg','./assets/anime/boa.jpg','./assets/anime/yoruichi.jpg',
  './assets/anime/faye.jpg','./assets/anime/revy.jpg','./assets/anime/mikasa.jpg','./assets/anime/makima.jpg',
  './assets/ravi/birthday.jpg','./assets/ravi/airport.jpg','./assets/ravi/blockbuster.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
    return response;
  })));
});
