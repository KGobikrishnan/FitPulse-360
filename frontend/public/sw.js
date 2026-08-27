const CACHE_NAME = 'fitpulse-pwa-v2.5';
const OFFLINE_URL = '/index.html';

const STATIC_PRECACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/pwa-192x192.svg',
  '/pwa-512x512.svg'
];

// 1. Install Event: Pre-cache static PWA shells & immediately activate
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_PRECACHE);
    })
  );
});

// 2. Activate Event: Immediately wipe all old cached versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[FitPulse PWA] Purging outdated cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event: Network-First for Navigation & Bundles, Cache Fallback for Offline
self.addEventListener('fetch', (event) => {
  // Ignore non-HTTP / browser extension requests
  if (!event.request.url.startsWith('http') || event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);

  // Bypass API calls from Service Worker cache (handled by Axios & IndexedDB)
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // Network-First for HTML navigation and JS/CSS chunks to ensure always-fresh updates
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type === 'basic' &&
          event.request.url.startsWith('http')
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache).catch(() => {});
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Fallback to cache if network fails (Offline mode)
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
        });
      })
  );
});

// 4. Background Sync for Offline Workout Logs
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-offline-workouts') {
    event.waitUntil(syncOfflineWorkouts());
  }
});

async function syncOfflineWorkouts() {
  console.log('[FitPulse PWA] Syncing pending offline workouts to cloud.');
}
