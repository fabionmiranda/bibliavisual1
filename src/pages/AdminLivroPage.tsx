import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiUrl } from '../lib/apiUrl';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload, FileText, Loader2, CheckCircle2, XCircle,
  ChevronRight, BookOpen, ShieldCheck, RefreshCw, Trash2,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { BIBLE_DATA } from '../data/bibleData';
import { BOOK_CONFIG } from './LivroPage';
import { useAuth } from '../contexts/AuthContext';

interface Props { testamento: 'AT' | 'NT' }

type UploadState = 'idle' | 'loading' | 'success' | 'error';

interface ZonaState {
  estado: UploadState;
  nomeArquivo: string;
  mensagem: string;
  jaExiste: boolean;
}

const ZONA_INICIAL: ZonaState = { estado: 'idle', nomeArquivo: '', mensagem: '', jaExiste: false };

async function uploadArquivo(
  testamento: string,
  livroId: string,
  tipo: string,
  file: File,
  token: string,
  filename?: string
): Promise<string> {
  const texto   = await file.text();
  const bytes   = new TextEncoder().encode(texto);
  let binary    = '';
  bytes.forEach(b => { binary += String.fromCharCode(b); });
  const content = btoa(binary);

  const res = await fetch(apiUrl.upload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ testamento, livroId, tipo, content, filename }),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error ?? 'Erro desconhecido');
  return json.saved ?? filename ?? `${tipo}.txt`;
}

async function checarExistencia(testamento: string, livroId: string, tipo: string, filename?: string): Promise<boolean> {
  try {
    const params = new URLSearchParams({ testamento, livroId, tipo });
    if (filename) params.set('filename', filename);
    const r = await fetch(`${apiUrl.check}?${params}`);
    return (await r.json()).exists as boolean;
  } catch { return false; }
}

async function listarDiagramas(testamento: string, livroId: string): Promise<string[]> {
  try {
    const r = await fetch(`${apiUrl.diagramas}?testamento=${testamento}&livroId=${livroId}`);
    return (await r.json()).arquivos as string[];
  } catch { return []; }
}

async function deletarArquivo(testamento: string, livroId: string, filename: string, token: string): Promise<void> {
  const res = await fetch(apiUrl.delete, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ testamento, livroId, filename }),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error ?? 'Erro ao deletar');
}

function ZonaUpload({
  titulo,
  descricao,
  cor,
  tipo,
  testamento,
  livroId,
  token,
  isAdmin,
}: {
  titulo: string;
  descricao: string;
  cor: 'brand-blue' | 'brand-purple';
  tipo: 'estrutura' | 'quiastico';
  testamento: string;
  livroId: string;
  token: string;
  isAdmin: boolean;
}) {
  const [estado, setEstado]   = useState<ZonaState>(ZONA_INICIAL);
  const [drag,   setDrag]     = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checarExistencia(testamento, livroId, tipo).then(existe =>
      setEstado(s => ({ ...s, jaExiste: existe, estado: existe ? 'success' : 'idle', mensagem: existe ? 'Arquivo já carregado anteriormente' : '' }))
    );
  }, [testamento, livroId, tipo]);

  const processar = useCallback(async (file: File) => {
    if (!file.name.endsWith('.txt')) {
      setEstado(s => ({ ...s, estado: 'error', mensagem: 'Somente arquivos .txt são aceitos.' }));
      return;
    }
    setEstado(s => ({ ...s, estado: 'loading', nomeArquivo: file.name, mensagem: '' }));
    try {
      await uploadArquivo(testamento, livroId, tipo, file, token);
      const caminho = `public/admin/${testamento}/${livroId}/${tipo}.txt`;
      setEstado({ estado: 'success', nomeArquivo: file.name, mensagem: `Salvo em ${caminho}`, jaExiste: true });
    } catch (e: any) {
      setEstado(s => ({ ...s, estado: 'error', mensagem: e.message ?? 'Erro ao salvar.' }));
    }
  }, [testamento, livroId, tipo, token]);

  const limpar = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Apagar ${tipo}.txt de ${livroId}? Esta acao nao pode ser desfeita.`)) return;
    try {
      await deletarArquivo(testamento, livroId, `${tipo}.txt`, token);
      setEstado(ZONA_INICIAL);
    } catch (err: any) {
      alert(err.message ?? 'Erro ao apagar.');
    }
  }, [testamento, livroId, tipo, token]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDrag(false);
    const f = e.dataTransfer.files[0]; if (f) processar(f);
  };

  const reiniciar = () => setEstado(s => ({ ...s, estado: 'idle', mensagem: '', nomeArquivo: '' }));

  const { estado: st } = estado;

  return (
    <div className="flex flex-col gap-4">
      {/* Cabeçalho da zona */}
      <div className={`flex items-start gap-3 p-5 rounded-2xl bg-${cor}/5 border border-${cor}/20`}>
        <FileText className={`w-6 h-6 text-${cor} mt-0.5 shrink-0`} />
        <div>
          <p className={`font-black text-lg sm:text-xl text-${cor} uppercase tracking-wide`}>{titulo}</p>
          <p className="text-white/60 text-sm sm:text-base mt-1">{descricao}</p>
          <p className="text-xs font-bold font-mono text-white/35 mt-1.5">
            → public/admin/{testamento}/{livroId}/{tipo}.txt
          </p>
        </div>
      </div>

      {/* Zona de drop */}
      <div
        onClick={() => (st === 'idle' || st === 'error') && fileRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 p-8 sm:p-10 flex flex-col items-center justify-center gap-4 text-center min-h-[180px]
          ${st === 'success'
            ? `border-green-500/40 bg-green-950/20 cursor-default`
            : st === 'error'
              ? `border-brand-rose/40 bg-brand-rose/5 cursor-pointer`
              : drag
                ? `border-${cor} bg-${cor}/10 scale-[1.01] cursor-copy`
                : `border-white/15 bg-white/[0.02] hover:border-${cor}/50 hover:bg-${cor}/5 cursor-pointer`
          }`}
      >
        <AnimatePresence mode="wait">
          {st === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3">
              <Loader2 className={`w-12 h-12 text-${cor} animate-spin`} />
              <p className="text-white/70 font-bold text-base sm:text-lg">Enviando {estado.nomeArquivo}…</p>
            </motion.div>
          )}
          {st === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
              <CheckCircle2 className="w-12 h-12 text-green-400" />
              <div className="text-center">
                <p className="text-green-400 font-black text-lg sm:text-xl">
                  {estado.jaExiste && !estado.nomeArquivo ? 'Arquivo ja existe' : 'Carregado com sucesso!'}
                </p>
                {estado.nomeArquivo && <p className="text-white/60 text-sm sm:text-base mt-1 font-mono">{estado.nomeArquivo}</p>}
                <p className="text-white/35 text-xs sm:text-sm mt-1 font-mono">{estado.mensagem}</p>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={e => { e.stopPropagation(); reiniciar(); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15
                    text-sm font-bold text-white/60 hover:text-white hover:border-white/35 transition-all"
                >
                  <RefreshCw className="w-4 h-4" /> Substituir
                </button>
                {isAdmin && (
                  <button
                    onClick={limpar}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-rose/40
                      text-sm font-black text-brand-rose hover:bg-brand-rose/10 transition-all"
                  >
                    <Trash2 className="w-4 h-4" /> Limpar dados
                  </button>
                )}
              </div>
            </motion.div>
          )}
          {st === 'error' && (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3">
              <XCircle className="w-12 h-12 text-brand-rose" />
              <p className="text-brand-rose font-black text-base sm:text-lg">{estado.mensagem}</p>
              <p className="text-white/50 text-sm sm:text-base">Clique para tentar novamente</p>
            </motion.div>
          )}
          {st === 'idle' && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3">
              <Upload className={`w-12 h-12 transition-colors ${drag ? `text-${cor}` : 'text-white/25'}`} />
              <div>
                <p className="text-white/80 font-black text-base sm:text-xl">
                  Arraste o arquivo .txt ou clique para selecionar
                </p>
                <p className="text-white/40 text-sm sm:text-base mt-1">Apenas arquivos .txt</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <input ref={fileRef} type="file" accept=".txt" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) processar(f); e.target.value = ''; }} />
    </div>
  );
}

// Valida o formato: NomeLivro_Letra_Capitulo_VersiculoInicial_VersiculoFinal.txt
function validarNomeDiagrama(nome: string): string | null {
  if (!nome.endsWith('.txt')) return 'O arquivo deve ter extensao .txt';
  const sem = nome.slice(0, -4);
  const partes = sem.split('_');
  if (partes.length !== 5) return 'Formato esperado: Livro_Letra_Capitulo_VersiculoInicial_VersiculoFinal.txt';
  const [, letra, cap, vi, vf] = partes;
  if (!letra || !/^[A-Za-z]/.test(letra)) return 'A letra do quiasma espelhado deve comecar com uma letra (ex: A, B, A-prime)';
  if (!Number.isInteger(+cap) || !Number.isInteger(+vi) || !Number.isInteger(+vf))
    return 'Capitulo, versiculo inicial e final devem ser numeros';
  return null;
}

function ZonaUploadDiagrama({
  testamento,
  livroId,
  token,
  isAdmin,
}: {
  testamento: string;
  livroId: string;
  token: string;
  isAdmin: boolean;
}) {
  const [drag,       setDrag]       = useState(false);
  const [enviando,   setEnviando]   = useState(false);
  const [mensagem,   setMensagem]   = useState('');
  const [tipoMsg,    setTipoMsg]    = useState<'ok' | 'erro' | ''>('');
  const [arquivos,   setArquivos]   = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const recarregar = useCallback(() => {
    listarDiagramas(testamento, livroId).then(setArquivos);
  }, [testamento, livroId]);

  useEffect(() => { recarregar(); }, [recarregar]);

  const processar = useCallback(async (file: File) => {
    const erro = validarNomeDiagrama(file.name);
    if (erro) { setTipoMsg('erro'); setMensagem(erro); return; }
    setEnviando(true); setMensagem(''); setTipoMsg('');
    try {
      const salvo = await uploadArquivo(testamento, livroId, 'diagrama', file, token, file.name);
      setTipoMsg('ok');
      setMensagem(`Salvo: public/admin/${testamento}/${livroId}/${salvo}`);
      recarregar();
    } catch (e: any) {
      setTipoMsg('erro');
      setMensagem(e.message ?? 'Erro ao salvar.');
    } finally { setEnviando(false); }
  }, [testamento, livroId, token, recarregar]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDrag(false);
    Array.from(e.dataTransfer.files).forEach(processar);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Cabecalho */}
      <div className="flex items-start gap-3 p-5 rounded-2xl bg-brand-rose/5 border border-brand-rose/20">
        <FileText className="w-6 h-6 text-brand-rose mt-0.5 shrink-0" />
        <div>
          <p className="font-black text-lg sm:text-xl text-brand-rose uppercase tracking-wide">
            Diagramas por Divisao
          </p>
          <p className="text-white/60 text-sm sm:text-base mt-1">
            Arquivo .txt por letra do quiasma espelhado. Nome obrigatorio no formato:
          </p>
          <p className="font-mono text-sm text-brand-rose/80 mt-1.5 font-bold">
            NomeLivro_Letra_Capitulo_VersiculoInicial_VersiculoFinal.txt
          </p>
          <p className="font-mono text-xs text-white/40 mt-0.5">
            Exemplo: Levitico_A_6_1_6.txt
          </p>
        </div>
      </div>

      {/* Zona de drop */}
      <div
        onClick={() => !enviando && fileRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 p-8 flex flex-col items-center justify-center gap-3 text-center min-h-[160px] cursor-pointer
          ${drag ? 'border-brand-rose bg-brand-rose/10 scale-[1.01]' : 'border-white/15 bg-white/[0.02] hover:border-brand-rose/50 hover:bg-brand-rose/5'}`}
      >
        {enviando ? (
          <Loader2 className="w-12 h-12 text-brand-rose animate-spin" />
        ) : (
          <>
            <Upload className={`w-12 h-12 transition-colors ${drag ? 'text-brand-rose' : 'text-white/25'}`} />
            <div>
              <p className="text-white/80 font-black text-base sm:text-xl">Arraste ou clique para enviar</p>
              <p className="text-white/40 text-sm sm:text-base mt-1">Pode enviar varios arquivos de uma vez</p>
            </div>
          </>
        )}
      </div>

      <input ref={fileRef} type="file" accept=".txt" multiple className="hidden"
        onChange={e => { Array.from(e.target.files ?? []).forEach(processar); e.target.value = ''; }} />

      {/* Feedback */}
      <AnimatePresence>
        {mensagem && (
          <motion.p
            key={mensagem}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`text-sm sm:text-base font-mono px-4 py-3 rounded-xl border ${
              tipoMsg === 'ok'
                ? 'text-green-400 border-green-500/30 bg-green-950/20'
                : 'text-brand-rose border-brand-rose/30 bg-brand-rose/5'
            }`}
          >
            {tipoMsg === 'ok' ? '✓ ' : '✗ '}{mensagem}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Arquivos ja enviados — card por arquivo */}
      {arquivos.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-black uppercase tracking-widest text-white/40 font-mono">
            {arquivos.length} arquivo{arquivos.length > 1 ? 's' : ''} enviado{arquivos.length > 1 ? 's' : ''}
          </p>
          {arquivos.map(f => {
            const partes = f.replace('.txt', '').split('_');
            const [, letra, cap, vi, vf] = partes;

            const apagar = async () => {
              if (!confirm(`Apagar ${f}? Esta acao nao pode ser desfeita.`)) return;
              try {
                await deletarArquivo(testamento, livroId, f, token);
                recarregar();
              } catch (err: any) { alert(err.message ?? 'Erro ao apagar.'); }
            };

            const substituirRef = React.createRef<HTMLInputElement>();

            const substituir = async (file: File) => {
              const erro = validarNomeDiagrama(file.name);
              if (erro) { alert(erro); return; }
              setEnviando(true);
              try {
                await uploadArquivo(testamento, livroId, 'diagrama', file, token, file.name);
                recarregar();
              } catch (err: any) { alert(err.message ?? 'Erro ao substituir.'); }
              finally { setEnviando(false); }
            };

            return (
              <div key={f} className="rounded-2xl border border-green-500/30 bg-green-950/15 p-5 flex flex-col gap-4">
                {/* Linha superior */}
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-green-400 font-black text-base sm:text-lg">Arquivo ja existe</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="font-mono text-sm font-black px-2.5 py-0.5 rounded-md text-brand-rose"
                        style={{ background: 'rgba(255,45,85,0.12)', border: '1px solid rgba(255,45,85,0.25)' }}>
                        {letra?.toUpperCase()}
                      </span>
                      <span className="font-mono text-sm text-white/60 truncate">{f}</span>
                      <span className="font-mono text-xs text-white/35 shrink-0">cap {cap} · {vi}–{vf}</span>
                    </div>
                  </div>
                </div>

                {/* Botoes */}
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => substituirRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20
                      text-sm font-bold text-white/60 hover:text-white hover:border-white/40 transition-all"
                  >
                    <RefreshCw className="w-4 h-4" /> Substituir
                  </button>
                  {isAdmin && (
                    <button
                      onClick={apagar}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-rose/40
                        text-sm font-black text-brand-rose hover:bg-brand-rose/10 transition-all"
                    >
                      <Trash2 className="w-4 h-4" /> Limpar dados
                    </button>
                  )}
                  <input ref={substituirRef} type="file" accept=".txt" className="hidden"
                    onChange={e => { const file = e.target.files?.[0]; if (file) substituir(file); e.target.value = ''; }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminLivroPage({ testamento }: Props) {
  const { livro: livroId = '' } = useParams<{ livro: string }>();
  const livroData = BIBLE_DATA.livros.find(l => l.id === livroId);
  const cfg       = BOOK_CONFIG[livroId];
  const Icone     = cfg?.icon ?? BookOpen;
  const { user, token } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen flex flex-col bg-bg-deep text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-10 flex-wrap">
          <Link to="/admin" className="hover:text-brand-blue transition-colors flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Admin
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white/30">{testamento === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white/70">{livroData?.nome ?? livroId}</span>
        </nav>

        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-5 mb-14"
        >
          {cfg && (
            <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${cfg.grad} border border-white/10 shadow-2xl shrink-0`}>
              <Icone className="w-10 h-10 sm:w-14 sm:h-14 text-white/90" strokeWidth={1.2} />
            </div>
          )}
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-brand-blue font-bold mb-1">
              Upload de arquivos · {testamento}
            </p>
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tighter">
              {livroData?.nome ?? livroId}
            </h1>
          </div>
        </motion.div>

        {/* Zonas de upload: estrutura e quiasmo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <ZonaUpload
              titulo="Estrutura do Livro"
              descricao="Arquivo com a estrutura literária geral, outline e divisões principais do livro."
              cor="brand-blue"
              tipo="estrutura"
              testamento={testamento}
              livroId={livroId}
              token={token ?? ''}
              isAdmin={isAdmin}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <ZonaUpload
              titulo="Divisões Quiásticas"
              descricao="Arquivo com as estruturas quiásticas, espelhamentos e centro teológico do livro."
              cor="brand-purple"
              tipo="quiastico"
              testamento={testamento}
              livroId={livroId}
              token={token ?? ''}
              isAdmin={isAdmin}
            />
          </motion.div>
        </div>

        {/* Zona de upload: diagramas por letra */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <ZonaUploadDiagrama
            testamento={testamento}
            livroId={livroId}
            token={token ?? ''}
            isAdmin={isAdmin}
          />
        </motion.div>

        {/* Nota de destino */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 p-5 rounded-2xl border border-white/5 bg-white/[0.02]"
        >
          <p className="text-sm sm:text-base text-white/40 font-mono leading-relaxed">
            Os arquivos serao salvos em:<br />
            <span className="text-brand-blue/70">public/admin/{testamento}/{livroId}/estrutura.txt</span><br />
            <span className="text-brand-purple/70">public/admin/{testamento}/{livroId}/quiastico.txt</span><br />
            <span className="text-brand-rose/70">public/admin/{testamento}/{livroId}/Livro_Letra_Cap_VI_VF.txt</span>
          </p>
        </motion.div>

      </main>
    </div>
  );
}
