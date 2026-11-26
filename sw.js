// Guiana Explorer v3: siempre pide la versión nueva al servidor; copia local solo sin cobertura
const C='ge-v3';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.json','./icon-192.png'])))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
  const same=new URL(r.url).origin===location.origin;
  e.respondWith((same?fetch(r.url,{cache:'no-cache',credentials:'same-origin'}):fetch(r)).then(res=>{if(res.ok&&(res.type==='basic'||res.type==='cors')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreSearch:true})))});
