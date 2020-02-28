'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "/assets\AssetManifest.json": "3758d562fe64ddb21c103947e2ac1769",
"/assets\assets\images\failed.png": "5a7f4af0628f04e7ff8ba40cca743a76",
"/assets\assets\images\foo.png": "239e6c54a21de2b18db1310404c70ee4",
"/assets\FontManifest.json": "f10ea0eb6f6c595664ec1622a9ef347f",
"/assets\fonts\Dchi.ttf": "40170c03e21221e2bdac2a39ff63d385",
"/assets\fonts\MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"/assets\fonts\Samim-FD.ttf": "f95b5825d726504459226099198993db",
"/assets\LICENSE": "86ac3aad54df55cf63b7007c00ffdd7c",
"/icons\Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"/icons\Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"/index.html": "e5a46cfd15ed76b0ef69f89ee4ca93dc",
"/main.dart.js": "8bc83534419c76787887db49bd08c8be",
"/manifest.json": "51eb5e6ba79c810fdeff37192178d0ce"
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
