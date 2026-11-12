// Caderno da Roça — guarda o app no celular para abrir sem internet.
// Ao mudar qualquer arquivo do app, aumente o número da versão abaixo.
const VERSAO = 'caderno-da-roca-v4';
const ARQUIVOS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Abre do celular na hora; se tiver internet, atualiza em segundo plano.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(VERSAO).then(cache =>
      cache.match(req, { ignoreSearch: true }).then(guardado => {
        const daRede = fetch(req).then(resp => {
          if (resp && resp.ok) cache.put(req, resp.clone());
          return resp;
        }).catch(() => guardado || (req.mode === 'navigate' ? cache.match('./index.html') : undefined));
        return guardado || daRede;
      })
    )
  );
});
