const cacheName = 'passquick-pwgen-v2';
const filesToCache = [
  '/',
  '/index.html',
  '/pw_generator_ru.html',
  '/pw_generator_en.html',
  '/offline.html',
  '/sw-register.js',
  '/script_pw_gen_ru.js',
  '/script_pw_gen_en.js',
  '/script_landing.js',
  '/styles_pw_gen.css',
  '/styles_landing.css',
  '/styles_offline.css',
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

// ✅ Установка сервис-воркера и кэширование файлов
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(filesToCache))
  );
  self.skipWaiting(); // ✅ Активируем сразу
});

// ✅ Очистка старых кэшей
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => (key !== cacheName ? caches.delete(key) : null)))
    )
  );
  self.clients.claim(); // ✅ Активируем SW для всех вкладок
});

// ✅ Обработка запросов
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  if (url.pathname.endsWith('manifest.json')) {
    return fetch(e.request);
  }

  e.respondWith(
    caches.match(e.request).then((response) => {
      return (
        response ||
        fetch(e.request).catch(() => {
          // ✅ Если сети нет и файла нет в кэше → offline.html
          if (e.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        })
      );
    })
  );
});
