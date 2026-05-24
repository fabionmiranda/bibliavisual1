import { useState, useRef, useCallback, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload, FileText, Loader2, CheckCircle2, XCircle,
  ChevronRight, BookOpen, ShieldCheck, RefreshCw,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { BIBLE_DATA } from '../data/bibleData';
import { BOOK_CONFIG } from './LivroPage';

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
  tipo: 'estrutura' | 'quiastico',
  file: File
): Promise<void> {
  const texto   = await file.text();
  // Codifica em base64 preservando UTF-8
  const bytes   = new TextEncoder().encode(texto);
  let binary    = '';
  bytes.forEach(b => { binary += String.fromCharCode(b); });
  const content = btoa(binary);

  const res = await fetch('/api/admin/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ testamento, livroId, tipo, content }),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error ?? 'Erro desconhecido');
}

async function checarExistencia(testamento: string, livroId: string, tipo: string): Promise<boolean> {
  try {
    const r = await fetch(`/api/admin/check?testamento=${testamento}&livroId=${livroId}&tipo=${tipo}`);
    return (await r.json()).exists as boolean;
  } catch { return false; }
}

function ZonaUpload({
  titulo,
  descricao,
  cor,
  tipo,
  testamento,
  livroId,
}: {
  titulo: string;
  descricao: string;
  cor: 'brand-blue' | 'brand-purple';
  tipo: 'estrutura' | 'quiastico';
  testamento: string;
  livroId: string;
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
      await uploadArquivo(testamento, livroId, tipo, file);
      const caminho = `public/admin/${testamento}/${livroId}/${tipo}.txt`;
      setEstado({ estado: 'success', nomeArquivo: file.name, mensagem: `Salvo em ${caminho}`, jaExiste: true });
    } catch (e: any) {
      setEstado(s => ({ ...s, estado: 'error', mensagem: e.message ?? 'Erro ao salvar.' }));
    }
  }, [testamento, livroId, tipo]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDrag(false);
    const f = e.dataTransfer.files[0]; if (f) processar(f);
  };

  const reiniciar = () => setEstado(s => ({ ...s, estado: 'idle', mensagem: '', nomeArquivo: '' }));

  const { estado: st } = estado;

  return (
    <div className="flex flex-col gap-4">
      {/* Cabeçalho da zona */}
      <div className={`flex items-start gap-3 p-4 rounded-2xl bg-${cor}/5 border border-${cor}/20`}>
        <FileText className={`w-5 h-5 text-${cor} mt-0.5 shrink-0`} />
        <div>
          <p className={`font-black text-base sm:text-lg text-${cor} uppercase tracking-wide`}>{titulo}</p>
          <p className="text-white/40 text-sm mt-0.5">{descricao}</p>
          <p className={`text-[10px] font-bold uppercase tracking-widest text-white/25 mt-1`}>
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
              <Loader2 className={`w-10 h-10 text-${cor} animate-spin`} />
              <p className="text-white/60 font-medium">Enviando {estado.nomeArquivo}…</p>
            </motion.div>
          )}
          {st === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
              <div>
                <p className="text-green-400 font-bold text-base sm:text-lg">
                  {estado.jaExiste && !estado.nomeArquivo ? 'Arquivo já existe' : 'Carregado com sucesso!'}
                </p>
                {estado.nomeArquivo && <p className="text-white/50 text-sm mt-1">{estado.nomeArquivo}</p>}
                <p className="text-white/30 text-xs mt-1 font-mono">{estado.mensagem}</p>
              </div>
              <button
                onClick={e => { e.stopPropagation(); reiniciar(); }}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mt-1"
              >
                <RefreshCw className="w-3 h-3" /> Substituir arquivo
              </button>
            </motion.div>
          )}
          {st === 'error' && (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3">
              <XCircle className="w-10 h-10 text-brand-rose" />
              <p className="text-brand-rose font-bold">{estado.mensagem}</p>
              <p className="text-white/40 text-sm">Clique para tentar novamente</p>
            </motion.div>
          )}
          {st === 'idle' && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3">
              <Upload className={`w-10 h-10 transition-colors ${drag ? `text-${cor}` : 'text-white/25'}`} />
              <div>
                <p className="text-white/70 font-bold text-base sm:text-lg">
                  Arraste o arquivo .txt ou clique para selecionar
                </p>
                <p className="text-white/30 text-sm mt-1">Apenas arquivos .txt</p>
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

export default function AdminLivroPage({ testamento }: Props) {
  const { livro: livroId = '' } = useParams<{ livro: string }>();
  const livroData = BIBLE_DATA.livros.find(l => l.id === livroId);
  const cfg       = BOOK_CONFIG[livroId];
  const Icone     = cfg?.icon ?? BookOpen;

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

        {/* Duas zonas de upload */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <ZonaUpload
              titulo="Estrutura do Livro"
              descricao="Arquivo com a estrutura literária geral, outline e divisões principais do livro."
              cor="brand-blue"
              tipo="estrutura"
              testamento={testamento}
              livroId={livroId}
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
            />
          </motion.div>
        </div>

        {/* Nota de destino */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 p-5 rounded-2xl border border-white/5 bg-white/[0.02]"
        >
          <p className="text-xs sm:text-sm text-white/30 font-mono leading-relaxed">
            Os arquivos serão salvos em:<br />
            <span className="text-brand-blue/60">public/admin/{testamento}/{livroId}/estrutura.txt</span><br />
            <span className="text-brand-purple/60">public/admin/{testamento}/{livroId}/quiastico.txt</span>
          </p>
        </motion.div>

      </main>
    </div>
  );
}
