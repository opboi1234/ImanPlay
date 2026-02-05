// Simple Service Worker for showing notifications and handling clicks.
// Place this file at the site root (/<project-root>/sw.js).
// It improves the way notifications are displayed by using registration.showNotification
// when available and lets us handle notificationclick events.

self.addEventListener('install', event => {
  // Activate immediately
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  // Focus or open the app
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
