import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve, extname } from 'node:path'
const root = fileURLToPath(new URL('.', import.meta.url))
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' }
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost')
    const name = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname).slice(1)
    const path = resolve(root, name)
    if (!path.startsWith(root)) { res.writeHead(403); res.end(); return }
    const body = await readFile(path)
    res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store' })
    res.end(body)
  } catch { res.writeHead(404); res.end('Not found') }
}).listen(4175, '127.0.0.1', () => console.log('Verge UI preview: http://127.0.0.1:4175'))
