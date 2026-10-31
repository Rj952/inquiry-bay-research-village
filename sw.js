// Inquiry Bay offline support. Pages and scripts: network first, so updates arrive when online.
// Images: cache first. Audio and other sites are never cached.
const C = "ib-v1";
const CORE = ["./", "index.html", "data.js?v=6", "map.js?v=6", "app.js?v=6", "sync.js?v=6", "transcripts.js?v=1", "extras.js?v=1", "map.css", "image.png", "host-guide.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => Promise.all(CORE.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin || r.headers.has("range") || /\.mp3/.test(u.pathname)) return;
  if (/\.(png|jpe?g|webp|svg)$/.test(u.pathname)) {
    e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => { const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); return res; })));
    return;
  }
  e.respondWith(fetch(r).then(res => { if (res.ok) { const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); } return res; })
    .catch(() => caches.match(r).then(m => m || (r.mode === "navigate" ? caches.match("index.html") : undefined))));
});
