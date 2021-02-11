const staticCacheName = "site-static-v2";
const dynamicCache = "site-dynamic-v1";
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
];

// Install service worker
self.addEventListener("install", evt => {
  evt.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  )
});

// Activate event
self.addEventListener("activate", evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      )
    })
  )
});

// Fetch event
self.addEventListener("fetch", evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open()
      });
    })
  )
});