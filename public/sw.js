const staticCacheName = 'static-cache-v3'; // インストール時にキャッシュ」
const dynamicCacheName = 'dynamic-cache-v1'; // 動的にキャッシュ
const assets = [
  './',
  './index.html',
  './pages/fallback.html',
  './css/style.css',
  './css/popup.css',
  './js/app.js',
  './images/with-keith.jpg',
  './images/hawes.jpg',
  './images/skipton.jpg',
  './images/camden.jpg',
  './images/sheep.jpg',
  './images/gordale-scar.jpg',
  './images/malham-cove.jpg',
  './images/malham-cove2.jpg',
  './images/bolton-abbey.jpg',
  './images/sorry.png'
];

// サービスワーカーのインストール（初回インストール時にアセットをキャッシュする）
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
        cache.addAll(assets);
    })
  );
});

// 古いキャッシュを削除する（staticCacheNameが変わったら）
self.addEventListener('activae', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key != dynamicCacheName)
        .map(key => caches.delete())
      )
    })
  );
})

// キャッシュがあればそれを利用する
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          limitCacheSize(dynamicCacheName, 5);
          return fetchRes;
        })
      })
    }).catch(() => {
      if (evt.request.url.indexOf('.html') > -1) {
        return caches.match('/pages/fallback.html');
      }
    })
  );
});
