// MarshCount - service worker: tiene l'app disponibile senza connessione e mostra le notifiche push.
// Se pubblichi una nuova versione dei file, cambia il numero qui sotto.
const CACHE = "marshcount-v26";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Risponde subito dalla memoria del telefono e, se c'è rete, aggiorna in sottofondo.
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      const net = fetch(req).then((res) => {
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      }).catch(() => hit || (req.mode === "navigate" ? caches.match("./index.html") : undefined));
      return hit || net;
    })
  );
});

// Notifiche push (inviate da Firebase tramite lo script Google): ogni messaggio mostra sempre una notifica.
self.addEventListener("push", (e) => {
  let d = {};
  try {
    const raw = e.data ? e.data.json() : {};
    d = raw.data || raw.notification || raw;
  } catch (err) {
    try { d = { body: e.data.text() }; } catch (x) { d = {}; }
  }
  e.waitUntil(self.registration.showNotification(d.title || "MarshCount", {
    body: d.body || "",
    icon: "icon-192.png",
    badge: "icon-192.png",
    tag: d.tag || undefined,
    data: { url: d.url || "./" }
  }));
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || "./";
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) { if ("focus" in c) return c.focus(); }
      return self.clients.openWindow(url);
    })
  );
});
