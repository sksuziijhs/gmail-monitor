// استقبال الإشعارات في الخلفية
self.addEventListener('push', function(event) {
    console.log('Push notification received:', event);
    
    if (event.data) {
        const notificationData = event.data.json();
        const options = {
            body: notificationData.notification.body,
            badge: '📧',
            icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%234CAF50" width="100" height="100"/><text x="50" y="70" font-size="60" text-anchor="middle" fill="white">📧</text></svg>',
            tag: 'email-notification',
            requireInteraction: true,
            actions: [
                { action: 'open', title: 'فتح' },
                { action: 'close', title: 'إغلاق' }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(
                notificationData.notification.title,
                options
            )
        );
    }
});

// التعامل مع نقر الإشعار
self.addEventListener('notificationclick', function(event) {
    console.log('Notification clicked:', event);
    event.notification.close();

    if (event.action === 'open' || !event.action) {
        event.waitUntil(
            clients.matchAll({ type: 'window' }).then(function(clientList) {
                for (let i = 0; i < clientList.length; i++) {
                    const client = clientList[i];
                    if (client.url === '/' && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow('/');
                }
            })
        );
    }
});

// تحديث التطبيق
self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
});

self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
    self.skipWaiting();
});
