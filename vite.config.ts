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
          // tipo pode ser 'estrutura' | 'quiastico' | 'diagrama' (neste ultimo caso, filename obrigatorio)
          server.middlewares.use('/api/admin/upload', (req, res) => {
            if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
            let body = '';
            req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
            req.on('end', () => {
              try {
                const { testamento, livroId, tipo, content, filename } = JSON.parse(body);
                const dir = path.join(__dirname, 'public', 'admin', testamento, livroId);
                fs.mkdirSync(dir, { recursive: true });
                // Para tipo 'diagrama', usa o filename original; para os outros, usa tipo.txt
                const nomeArquivo = tipo === 'diagrama' && filename ? filename : `${tipo}.txt`;
                // Sanitiza para evitar path traversal
                const safeName = path.basename(nomeArquivo);
                const rawBuf = Buffer.from(content, 'base64');
                // Detecta e converte encoding: se não for UTF-8 válido, trata como Windows-1252
                let txtFinal: string;
                try {
                  txtFinal = new TextDecoder('utf-8', { fatal: true }).decode(rawBuf);
                } catch {
                  // Fallback: decodifica como Windows-1252 e re-codifica como UTF-8
                  txtFinal = new TextDecoder('windows-1252').decode(rawBuf);
                }
                fs.writeFileSync(path.join(dir, safeName), Buffer.from(txtFinal, 'utf-8'));
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ ok: true, saved: safeName }));
              } catch (e) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ ok: false, error: String(e) }));
              }
            });
          });

          // GET /api/admin/check?testamento=AT&livroId=genesis&tipo=estrutura
          // Para diagramas: &tipo=diagrama&filename=Levitico_A_6_1_6.txt
          server.middlewares.use('/api/admin/check', (req, res) => {
            const url      = new URL(req.url!, `http://localhost`);
            const t        = url.searchParams.get('testamento') ?? '';
            const l        = url.searchParams.get('livroId')    ?? '';
            const tipo     = url.searchParams.get('tipo')       ?? '';
            const filename = url.searchParams.get('filename')   ?? '';
            const nomeArquivo = tipo === 'diagrama' && filename ? path.basename(filename) : `${tipo}.txt`;
            const filePath = path.join(__dirname, 'public', 'admin', t, l, nomeArquivo);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ exists: fs.existsSync(filePath) }));
          });

          // DELETE /api/admin/delete  { testamento, livroId, filename }
          server.middlewares.use('/api/admin/delete', (req, res) => {
            if (req.method !== 'DELETE') { res.statusCode = 405; res.end(); return; }
            let body = '';
            req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
            req.on('end', () => {
              try {
                const { testamento, livroId, filename } = JSON.parse(body);
                const safeName = path.basename(filename);
                const filePath = path.join(__dirname, 'public', 'admin', testamento, livroId, safeName);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ ok: true }));
              } catch (e) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ ok: false, error: String(e) }));
              }
            });
          });

          // GET /api/admin/diagramas?testamento=AT&livroId=genesis
          // Lista todos os arquivos de diagrama (formato NomeLivro_Letra_Cap_VI_VF.txt)
          server.middlewares.use('/api/admin/diagramas', (req, res) => {
            const url = new URL(req.url!, `http://localhost`);
            const t   = url.searchParams.get('testamento') ?? '';
            const l   = url.searchParams.get('livroId')    ?? '';
            const dir = path.join(__dirname, 'public', 'admin', t, l);
            res.setHeader('Content-Type', 'application/json');
            try {
              const arquivos = fs.existsSync(dir)
                ? fs.readdirSync(dir).filter(f => {
                    if (!f.endsWith('.txt')) return false;
                    if (f === 'estrutura.txt' || f === 'quiastico.txt') return false;
                    return /^.+_.+_\d+_\d+_\d+\.txt$/.test(f);
                  })
                : [];
              res.end(JSON.stringify({ ok: true, arquivos }));
            } catch {
              res.end(JSON.stringify({ ok: true, arquivos: [] }));
            }
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
