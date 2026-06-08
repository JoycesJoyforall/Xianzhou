const CACHE='xz-v2';
const ASSETS=['./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('fonts.googleapis.com')||e.request.url.includes('fonts.gstatic.com')){
    e.respondWith(caches.open(CACHE).then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(resp=>{c.put(e.request,resp.clone());return resp;}).catch(()=>new Response('')))));return;}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
