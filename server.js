'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 8080;
const TYPES = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png'};
const PUBLIC_FILES = new Set(['index.html','styles.css','game-core.js','app.js','manifest.webmanifest','sw.js']);

const server = http.createServer((request, response) => {
  if (!['GET','HEAD'].includes(request.method)) {
    response.writeHead(405, {'Allow':'GET, HEAD'}).end('Method not allowed'); return;
  }
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const requested = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  if (!PUBLIC_FILES.has(requested) && !requested.startsWith('assets/')) {
    response.writeHead(404).end('Not found'); return;
  }
  const file = path.resolve(ROOT, requested);
  if (!file.startsWith(ROOT + path.sep)) {
    response.writeHead(403).end('Forbidden'); return;
  }
  fs.stat(file, (error, stat) => {
    if (error || !stat.isFile()) { response.writeHead(404).end('Not found'); return; }
    const extension = path.extname(file).toLowerCase();
    const immutable = file.includes(path.join('assets', ''));
    response.writeHead(200, {
      'Content-Type': TYPES[extension] || 'application/octet-stream',
      'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'no-cache',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; manifest-src 'self'"
    });
    if (request.method === 'HEAD') { response.end(); return; }
    const stream = fs.createReadStream(file);
    stream.on('error', () => { if (!response.headersSent) response.writeHead(500); response.end(); });
    stream.pipe(response);
  });
});

server.on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? `Port ${PORT} pahile se busy ba.` : error.message);
  process.exitCode = 1;
});
server.listen(PORT, '127.0.0.1', () => console.log(`Kawan Hawe Chorwa: http://127.0.0.1:${PORT}`));
