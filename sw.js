const CACHE_NAME = "wallory-cache";
const urlsToCache = [
  "/",
  "/manifest.json",
  "/favicons/favicon.ico",
  "/favicons/apple-touch-icon.png",
  "/favicons/favicon-32x32.png",
  "/favicons/favicon-16x16.png",
  "/favicons/android-chrome-192x192.png",
  "/favicons/android-chrome-512x512.png",
];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});