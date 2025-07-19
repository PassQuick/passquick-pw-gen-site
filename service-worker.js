const cacheName = 'passquick-pwgen-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/pw_generator_ru.html',
  '/pw_generator_en.html',
  '/sw-register.js',
  '/script_pw_gen_ru.js',
  '/script_pw_gen_en.js',
  '/script_landing.js',
  '/styles_pw_gen.css',
  '/styles_landing.css',
  '/passquick-icon_192-v3.png',
  '/passquick-icon_512-v3.png',
  '/passquick-maskable-icon_512.png',
  '/passquick-adaptive-icon_512-v2.svg',
  '/passquick-icon_96-v3-en.png',
  '/passquick-icon_96-v3-ru.png',
  '/passquick-icon_192-v3-en.png',
  '/passquick-icon_192-v3-ru.png',
  '/passquick-icon_256-v3-en.png',
  '/passquick-icon_256-v3-ru.png',
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
