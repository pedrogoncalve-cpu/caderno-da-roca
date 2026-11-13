// © 2026 Pedro Gonçalves de Oliveira Silva. Todos os direitos reservados.
// Caderno da Roça — guarda o app no celular para abrir sem internet.
// Ao mudar qualquer arquivo do app, aumente o número da versão abaixo.
const VERSAO = 'caderno-da-roca-v9';
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
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS.map(u => new Request(u, {cache: 'reload'})))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  // Outras páginas do site (como o painel da secretaria) não passam pelo cache do app.
  const caminho = new URL(req.url).pathname, raiz = new URL(self.registration.scope).pathname;
  if (req.mode === 'navigate' && caminho !== raiz && caminho !== raiz + 'index.html') return;

  // A página do app: com internet, busca sempre a versão nova; sem internet, usa a guardada.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req, {cache: 'no-store'}).then(resp => {
        if (resp && resp.ok) { const copia = resp.clone(); e.waitUntil(caches.open(VERSAO).then(c => Promise.all([c.put('./index.html', copia.clone()), c.put('./', copia)]))); }
        return resp;
      }).catch(() => caches.match('./index.html', {ignoreSearch: true}).then(r => r || caches.match('./')))
    );
    return;
  }

  // Ícones e demais arquivos: abre do celular na hora e atualiza em segundo plano.
  e.respondWith(
    caches.open(VERSAO).then(cache =>
      cache.match(req, { ignoreSearch: true }).then(guardado => {
        const daRede = fetch(req).then(resp => {
          if (resp && resp.ok) cache.put(req, resp.clone());
          return resp;
        }).catch(() => guardado);
        return guardado || daRede;
      })
    )
  );
});
