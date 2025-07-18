const cacheName = 'terminal-pwgen-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/pw_generator_ru.html',
  '/pw_generator_en.html',
  '/sw-register.js',
  '/passquick-icon_192-v3.png',
  '/passquick-icon_512-v3.png',
  '/passquick-maskable-icon_512.png',
  '/passquick-adaptive-icon_512-v2.svg',
  '/manifest.json',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  if (url.pathname.endsWith('manifest.json')) {
    e.respondWith(fetch(e.request));
  } else {
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request))
    );
  }
});
