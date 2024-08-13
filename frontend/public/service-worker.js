// public/service-worker.js

const CACHE_NAME = 'v1';

self.addEventListener('install', event => {
  // 설치 단계에서 특별히 할 작업이 없으므로, 기본 처리만 남겨둡니다.
  self.skipWaiting(); // 바로 활성화 되도록 설정
});

self.addEventListener('fetch', event => {
  // 모든 요청을 네트워크로 직접 전달
  event.respondWith(fetch(event.request));
});

self.addEventListener('activate', event => {
  // 오래된 캐시를 정리하는 부분
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
