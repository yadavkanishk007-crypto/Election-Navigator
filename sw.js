/**
 * @file Service Worker — Offline-first caching for PWA capability
 * @description Implements a cache-first strategy for static assets and
 *              network-first for HTML. Provides offline fallback.
 * @author Kanishk Yadav
 * @version 1.0.0
 */
'use strict';

/** @type {string} Cache version — increment on deploy */
const CACHE_NAME = 'election-nav-v1';

/** @type {string[]} Critical assets to pre-cache on install */
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/tokens.css',
  '/css/base.css',
  '/css/layout.css',
  '/css/components.css',
  '/css/neon-grid.css',
  '/js/main.js',
  '/js/state.js',
  '/js/renderer.js',
  '/js/navigation.js',
  '/js/quiz.js',
  '/js/security.js',
  '/js/i18n.js',
  '/js/analytics.js',
  '/js/gtag.js',
  '/data/phases.js',
  '/data/quizzes.js',
  '/data/timelines.js',
  '/data/i18n.js',
  '/manifest.json'
];

/**
 * Install event — pre-cache critical assets.
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/**
 * Activate event — clean up old caches.
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

/**
 * Fetch event — cache-first for static assets, network-first for HTML.
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and external resources
  if (request.method !== 'GET') { return; }
  if (url.origin !== self.location.origin) { return; }

  // Network-first for HTML (always get fresh content)
  if (request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(request)
      .then((cached) => {
        if (cached) { return cached; }
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
  );
});
