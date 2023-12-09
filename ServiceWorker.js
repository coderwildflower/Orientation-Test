const cacheName = "Thegigabytegroup-BreakTheBank-2.4.13";
const contentToCache = [
    "Build/webgl2.4.13.loader.js",
    "Build/webgl2.4.13.framework.js.unityweb",
    "Build/webgl2.4.13.data.unityweb",
    "Build/webgl2.4.13.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
    if(e.request.url.includes("api.")||e.request.url.includes("unity3d.com")||e.request.url.includes("unity.com"))
      {
        let response = await fetch(e.request);        
        return response;
      }
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
