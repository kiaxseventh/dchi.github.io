'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "/assets\AssetManifest.json": "6c64bb7d7dfcaa856792ae70b3761611",
"/assets\FontManifest.json": "f10ea0eb6f6c595664ec1622a9ef347f",
"/assets\fonts\Dchi.ttf": "40170c03e21221e2bdac2a39ff63d385",
"/assets\fonts\MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"/assets\fonts\Samim-FD.ttf": "f95b5825d726504459226099198993db",
"/assets\LICENSE": "4794d8752b82fa5bbad8e9a303596eb4",
"/icons\Icon-192.png": "5c78e7b20264b35edf850c9390c9cfda",
"/icons\Icon-512.png": "8a73db98a1d593d4151f32101e4e211f",
"/index.html": "e5a46cfd15ed76b0ef69f89ee4ca93dc",
"/main.dart.js": "dc31e8b8115c7bd05a166c327c9e2e7f",
"/manifest.json": "eb03774766e8281437a9e7dadb4e48de"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request, {
          credentials: 'include'
        });
      })
  );
});
