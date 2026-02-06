// Simple Service Worker to improve system notifications and handle clicks.
// Place this at ./sw.js in repo root (GitHub Pages: https://username.github.io/repo/sw.js).

self.addEventListener('install', (e) => {
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  // Focus or open the app when notification clicked
  event.waitUntil(clients.matchAll({type:'window', includeUncontrolled:true}).then(list=>{
    for (const c of list) {
      if (c.url && 'focus' in c) return c.focus();
    }
    if (clients.openWindow) return clients.openWindow('./');
  }));
});
