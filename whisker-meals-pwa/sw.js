// Whisker Meals — Service Worker
// Handles background push notifications

const CACHE_NAME = 'whisker-meals-v1';
const ASSETS = ['/', '/index.html', '/manifest.json'];

// ── Install & Cache ──────────────────────────────────────────────────────────
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

// ── Fetch (offline support) ──────────────────────────────────────────────────
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

// ── Schedule state ───────────────────────────────────────────────────────────
let schedule = {
  wedHour: 18, wedMin: 0,
  sunHour: 18, sunMin: 0,
  messages: [
    '🐟 Wet food time! Your cats are waiting for their evening meal.',
    '😺 Mrow! Your cats say it\'s wet food evening. Time to open a pouch!',
    '🐱 Don\'t forget — it\'s wet food night for the cats!',
  ]
};

let checkTimer = null;

function startChecking() {
  if (checkTimer) clearInterval(checkTimer);
  checkTimer = setInterval(checkAndNotify, 60 * 1000);
}

function checkAndNotify() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const min = now.getMinutes();

  const isWed = day === 3 && hour === schedule.wedHour && min === schedule.wedMin;
  const isSun = day === 0 && hour === schedule.sunHour && min === schedule.sunMin;

  if (isWed || isSun) {
    const todayKey = now.toISOString().slice(0, 10);
    // Use IndexedDB or simple variable to avoid duplicate firing
    if (self._lastFired !== todayKey) {
      self._lastFired = todayKey;
      fireNotification();
    }
  }
}

function fireNotification() {
  const msgs = schedule.messages;
  const msg = msgs[Math.floor(Math.random() * msgs.length)];
  self.registration.showNotification('🐱 Whisker Meals', {
    body: msg,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'whisker-reminder',
    requireInteraction: true,
    actions: [
      { action: 'fed', title: '✅ Mark as fed' },
      { action: 'dismiss', title: 'Later' }
    ]
  });
}

// ── Messages from app ────────────────────────────────────────────────────────
self.addEventListener('message', (e) => {
  if (e.data.type === 'SCHEDULE') {
    schedule = { ...schedule, ...e.data };
    startChecking();
  }
  if (e.data.type === 'TEST') {
    self.registration.showNotification('🧪 Test — Whisker Meals', {
      body: e.data.message,
      icon: '/icon-192.png',
      tag: 'whisker-test',
    });
  }
});

// ── Notification click ───────────────────────────────────────────────────────
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  if (e.action === 'fed') {
    // Open the app — the user can log it there
    e.waitUntil(clients.openWindow('/'));
  } else {
    e.waitUntil(clients.openWindow('/'));
  }
});

// Start checking on load
startChecking();
