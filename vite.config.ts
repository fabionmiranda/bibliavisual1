import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
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
            // Verifica token (dev: aceita qualquer token não-vazio)
            const authH = (req as any).headers['authorization'] ?? '';
            if (!authH.match(/^Bearer\s+\S+/i)) {
              res.statusCode = 401;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: false, error: 'Token ausente' }));
              return;
            }
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
            // Verifica token + role admin (dev: lê .dev-auth.json)
            const authHD = (req as any).headers['authorization'] ?? '';
            const matchD = authHD.match(/^Bearer\s+(.+)$/i);
            if (!matchD) {
              res.statusCode = 401;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: false, error: 'Token ausente' }));
              return;
            }
            const tokD = matchD[1].trim();
            const dbFileD = path.join(__dirname, '.dev-auth.json');
            try {
              const dbD = JSON.parse(fs.readFileSync(dbFileD, 'utf-8'));
              const trD = dbD.tokens.find((t: any) => t.token === tokD && t.expiresAt > Date.now());
              const uD  = trD ? dbD.users.find((u: any) => u.id === trD.userId) : null;
              if (!uD) { res.statusCode = 401; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ ok: false, error: 'Token invalido' })); return; }
              if (uD.role !== 'admin') { res.statusCode = 403; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ ok: false, error: 'Acesso restrito a administradores' })); return; }
            } catch {
              res.statusCode = 401;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: false, error: 'Token invalido' }));
              return;
            }
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

          // POST /api/admin/auth  { action, username?, password?, token? }
          server.middlewares.use('/api/admin/auth', (req, res) => {
            if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
            let body = '';
            req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
            req.on('end', () => {
              try {
                const data   = JSON.parse(body);
                const action = data.action ?? '';
                const dbFile = path.join(__dirname, '.dev-auth.json');
                type UserRec = { id: number; username: string; passwordHash: string; role: string };
                type TokenRec = { userId: number; token: string; expiresAt: number };
                type DB = { users: UserRec[]; tokens: TokenRec[]; nextId: number };

                let db: DB = { users: [], tokens: [], nextId: 1 };
                if (fs.existsSync(dbFile)) {
                  try { db = JSON.parse(fs.readFileSync(dbFile, 'utf-8')); } catch { /* ignore */ }
                }
                // Seed admin
                if (db.users.length === 0) {
                  db.users.push({ id: db.nextId++, username: 'admin', passwordHash: 'PLAIN:Meu1amor1!', role: 'admin' });
                }
                const saveDb = () => fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
                const genToken = (userId: number) => {
                  db.tokens = db.tokens.filter(t => t.expiresAt > Date.now());
                  const tok = crypto.randomBytes(32).toString('hex');
                  db.tokens.push({ userId, token: tok, expiresAt: Date.now() + 86400000 });
                  saveDb();
                  return tok;
                };
                const checkPlain = (plain: string, hash: string) =>
                  hash.startsWith('PLAIN:') ? hash.slice(6) === plain : false;
                const getTokenUser = (tok: string) => {
                  const tr = db.tokens.find(t => t.token === tok && t.expiresAt > Date.now());
                  if (!tr) return null;
                  return db.users.find(u => u.id === tr.userId) ?? null;
                };
                const authHeader = (req as any).headers['authorization'] ?? '';
                const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
                const headerToken = bearerMatch ? bearerMatch[1] : null;

                res.setHeader('Content-Type', 'application/json');

                if (action === 'login') {
                  const u = db.users.find(x => x.username === data.username);
                  if (!u || !checkPlain(data.password, u.passwordHash)) {
                    res.statusCode = 401;
                    res.end(JSON.stringify({ ok: false, error: 'Credenciais invalidas' }));
                    return;
                  }
                  res.end(JSON.stringify({ ok: true, token: genToken(u.id), user: { id: u.id, username: u.username, role: u.role } }));
                } else if (action === 'register') {
                  if (db.users.find(x => x.username === data.username)) {
                    res.statusCode = 409;
                    res.end(JSON.stringify({ ok: false, error: 'Username ja em uso' }));
                    return;
                  }
                  const newUser: UserRec = { id: db.nextId++, username: data.username, passwordHash: 'PLAIN:' + data.password, role: 'user' };
                  db.users.push(newUser);
                  saveDb();
                  res.end(JSON.stringify({ ok: true, token: genToken(newUser.id), user: { id: newUser.id, username: newUser.username, role: newUser.role } }));
                } else if (action === 'verify') {
                  const tok = headerToken ?? data.token;
                  const u = tok ? getTokenUser(tok) : null;
                  if (!u) { res.statusCode = 401; res.end(JSON.stringify({ ok: false, error: 'Token invalido' })); return; }
                  res.end(JSON.stringify({ ok: true, user: { id: u.id, username: u.username, role: u.role } }));
                } else if (action === 'users') {
                  const caller = headerToken ? getTokenUser(headerToken) : null;
                  if (!caller) { res.statusCode = 401; res.end(JSON.stringify({ ok: false, error: 'Token invalido' })); return; }
                  if (caller.role !== 'admin') { res.statusCode = 403; res.end(JSON.stringify({ ok: false, error: 'Acesso restrito' })); return; }
                  res.end(JSON.stringify({ ok: true, users: db.users.map(u => ({ id: u.id, username: u.username, role: u.role, created_at: 0 })) }));
                } else if (action === 'logout') {
                  if (headerToken) db.tokens = db.tokens.filter(t => t.token !== headerToken);
                  saveDb();
                  res.end(JSON.stringify({ ok: true }));
                } else {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ ok: false, error: 'Action invalida' }));
                }
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
