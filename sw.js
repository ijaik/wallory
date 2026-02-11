if (!self.define) {
  let e,
    n = {};
  const s = (s, i) => (
    (s = new URL(s + ".js", i).href),
    n[s] ||
      new Promise((n) => {
        if ("document" in self) {
          const e = document.createElement("script");
          ((e.src = s), (e.onload = n), document.head.appendChild(e));
        } else ((e = s), importScripts(s), n());
      }).then(() => {
        let e = n[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, o) => {
    const c =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (n[c]) return;
    let r = {};
    const t = (e) => s(e, c),
      a = { module: { uri: c }, exports: r, require: t };
    n[c] = Promise.all(i.map((e) => a[e] || t(e))).then((e) => (o(...e), r));
  };
}
define(["./workbox-4b126c97"], function (e) {
  "use strict";
  (self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "index.html", revision: "9fa13c3cf9aad522645bfa12f369aa98" },
        {
          url: "icons/favicon.ico",
          revision: "e300e727076b52535f1b4cb65c77794c",
        },
        {
          url: "icons/favicon-32x32.png",
          revision: "02b77143e4e1d5e5d34d9bffaaa024fc",
        },
        {
          url: "icons/favicon-16x16.png",
          revision: "6d7f9a5b79297bbe734fa17df1b275cd",
        },
        {
          url: "icons/apple-touch-icon.png",
          revision: "dbfe993a49cd9360b00cc7eff4602e15",
        },
        {
          url: "icons/android-chrome-512x512.png",
          revision: "df81036456063a380c28ff547e944148",
        },
        {
          url: "icons/android-chrome-192x192.png",
          revision: "f72c7dd3f30c02dc755d89c110d189b8",
        },
        { url: "assets/workbox-window.prod.es5-BIl4cyR9.js", revision: null },
        { url: "assets/index-E5rYcCj7.css", revision: null },
        { url: "assets/index-CQWy1ua8.js", revision: null },
      ],
      {},
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL("index.html")),
    ),
    e.registerRoute(
      /^https:\/\/api\.unsplash\.com\/.*/i,
      new e.NetworkFirst({
        cacheName: "unsplash-api-cache",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 86400 }),
          new e.CacheableResponsePlugin({ statuses: [0, 200] }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 20, maxAgeSeconds: 31536e3 }),
          new e.CacheableResponsePlugin({ statuses: [0, 200] }),
        ],
      }),
      "GET",
    ));
});