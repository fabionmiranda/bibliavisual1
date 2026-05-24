import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'admin-upload',
        configureServer(server) {
          // POST /api/admin/upload  { testamento, livroId, tipo, content (base64) }
          server.middlewares.use('/api/admin/upload', (req, res) => {
            if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
            let body = '';
            req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
            req.on('end', () => {
              try {
                const { testamento, livroId, tipo, content } = JSON.parse(body);
                const dir = path.join(__dirname, 'public', 'admin', testamento, livroId);
                fs.mkdirSync(dir, { recursive: true });
                fs.writeFileSync(path.join(dir, `${tipo}.txt`), Buffer.from(content, 'base64'));
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ ok: true }));
              } catch (e) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ ok: false, error: String(e) }));
              }
            });
          });

          // GET /api/admin/check?testamento=AT&livroId=genesis&tipo=estrutura
          server.middlewares.use('/api/admin/check', (req, res) => {
            const url  = new URL(req.url!, `http://localhost`);
            const t    = url.searchParams.get('testamento') ?? '';
            const l    = url.searchParams.get('livroId')    ?? '';
            const tipo = url.searchParams.get('tipo')       ?? '';
            const filePath = path.join(__dirname, 'public', 'admin', t, l, `${tipo}.txt`);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ exists: fs.existsSync(filePath) }));
          });
        },
      },
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
