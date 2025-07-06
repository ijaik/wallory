const CACHE_VERSION = "v1.3";
const CACHE_NAME = `wallory-cache-${CACHE_VERSION}`;
const TTL = 1000 * 60 * 60;
const urlsToCache = [
  "/",
  "/manifest.json",
  "/icons/favicon.ico",
  "/icons/apple-touch-icon.png",
  "/icons/android-chrome-192x192.png",
  "/icons/android-chrome-512x512.png",
  "https://fonts.googleapis.com/css2?family=Leckerli+One&display=swap",
];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const isAPIRequest = request.url.includes("api.unsplash.com");
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);
      if (isAPIRequest) {
        const isFresh =
          cached &&
          cached.headers.get("date") &&
          Date.now() - new Date(cached.headers.get("date")).getTime() < TTL;
        if (cached && isFresh) return cached;
        return fetch(request)
          .then((response) => {
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cached || Response.error());
      }
      if (cached) return cached;
      return fetch(request).then((networkResponse) => {
        if (
          networkResponse &&
          request.url.startsWith(self.location.origin) &&
          request.destination !== "document"
        ) {
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      });
    })
  );
});