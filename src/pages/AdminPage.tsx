import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { apiUrl } from '../lib/apiUrl';
import { BookOpen, Search, X, ShieldCheck, CheckCircle2, Circle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { BIBLE_DATA } from '../data/bibleData';
import { BOOK_CONFIG } from './LivroPage';

const PARES_ADMIN: Array<{ remover: string; manter: string; nome: string }> = [
  { remover: '2-samuel',   manter: '1-samuel',   nome: '1 e 2 Samuel'    },
  { remover: '2-reis',     manter: '1-reis',     nome: '1 e 2 Reis'      },
  { remover: '2-cronicas', manter: '1-cronicas', nome: '1 e 2 Cronicas'  },
  { remover: 'neemias',    manter: 'esdras',     nome: 'Esdras e Neemias' },
];

function agruparAdmin(lista: typeof BIBLE_DATA.livros) {
  const remover = new Set(PARES_ADMIN.map(p => p.remover));
  return lista
    .filter(l => !remover.has(l.id))
    .map(l => {
      const par = PARES_ADMIN.find(p => p.manter === l.id);
      if (par) return { ...l, nome: par.nome };
      return l;
    });
}

const livrosAT = agruparAdmin(BIBLE_DATA.livros.filter(l => l.testamento === 'AT'));
const livrosNT = agruparAdmin(BIBLE_DATA.livros.filter(l => l.testamento === 'NT'));

function normalizar(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

type Status = { estrutura: boolean; quiastico: boolean; diagramas: boolean };

async function checarStatus(testamento: string, livroId: string): Promise<Status> {
  const check = async (tipo: string) => {
    try {
      const r = await fetch(`${apiUrl.check}?testamento=${testamento}&livroId=${livroId}&tipo=${tipo}`);
      return (await r.json()).exists as boolean;
    } catch { return false; }
  };
  const checkDiagramas = async () => {
    try {
      const r = await fetch(`${apiUrl.diagramas}?testamento=${testamento}&livroId=${livroId}`);
      const j = await r.json();
      return (j.arquivos as string[]).length > 0;
    } catch { return false; }
  };
  const [estrutura, quiastico, diagramas] = await Promise.all([
    check('estrutura'), check('quiastico'), checkDiagramas(),
  ]);
  return { estrutura, quiastico, diagramas };
}

function CardLivro({ livro, status }: { livro: typeof livrosAT[0]; status: Status | null }) {
  const cfg   = BOOK_CONFIG[livro.id];
  const Icone = cfg?.icon ?? BookOpen;
  const rota  = `/admin/${livro.testamento.toLowerCase()}/${livro.id}`;
  const tudo  = status?.estrutura && status?.quiastico && status?.diagramas;
  const algum = status?.estrutura || status?.quiastico || status?.diagramas;

  const badge = (letra: string, ativo: boolean | undefined) => (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border
      ${ativo
        ? 'bg-green-500/15 border-green-500/40 text-green-400'
        : 'bg-white/5 border-white/10 text-white/20'}`}>
      {letra}
    </span>
  );

  return (
    <Link
      to={rota}
      className={`group relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.03] hover:shadow-xl aspect-[3/4] w-full
        ${tudo
          ? 'border-green-500/30 bg-green-950/20 hover:border-green-400/50'
          : algum
            ? 'border-yellow-500/20 bg-yellow-950/10 hover:border-yellow-400/40'
            : 'border-white/5 bg-white/[0.02] hover:border-white/15'
        }`}
    >
      <div className="absolute top-3 right-3">
        {tudo
          ? <CheckCircle2 className="w-4 h-4 text-green-400" />
          : algum
            ? <CheckCircle2 className="w-4 h-4 text-yellow-400" />
            : <Circle className="w-4 h-4 text-white/15" />
        }
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors">
          <Icone className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-brand-blue group-hover:scale-110 transition-transform" strokeWidth={1.2} />
        </div>
      </div>

      <div className="w-full text-center space-y-2 mt-3">
        <p className="text-white font-black text-sm sm:text-base md:text-lg leading-tight tracking-tight">
          {livro.nome}
        </p>
        <div className="flex items-center justify-center gap-1.5">
          {badge('E', status?.estrutura)}
          {badge('Q', status?.quiastico)}
          {badge('D', status?.diagramas)}
        </div>
      </div>
    </Link>
  );
}

function Secao({ titulo, livros, statuses }: { titulo: string; livros: typeof livrosAT; statuses: Record<string, Status | null> }) {
  if (!livros.length) return null;
  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-white/5" />
        <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-brand-blue whitespace-nowrap">
          {titulo} — {livros.length} livros
        </h2>
        <div className="h-px flex-1 bg-white/5" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {livros.map((livro, i) => (
          <motion.div
            key={livro.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.02, 0.5) }}
          >
            <CardLivro livro={livro} status={statuses[livro.id] ?? null} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [busca, setBusca]       = useState('');
  const [statuses, setStatuses] = useState<Record<string, Status | null>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    // Carrega status dos livros exibidos (sem duplicatas de pares agrupados)
    const remover = new Set(PARES_ADMIN.map(p => p.remover));
    BIBLE_DATA.livros.filter(l => !remover.has(l.id)).forEach(l => {
      checarStatus(l.testamento, l.id).then(s =>
        setStatuses(prev => ({ ...prev, [l.id]: s }))
      );
    });
  }, []);

  const termo   = normalizar(busca.trim());
  const filtrar = (lista: typeof livrosAT) =>
    termo ? lista.filter(l => normalizar(l.nome).includes(termo)) : lista;

  const atFiltrado = filtrar(livrosAT);
  const ntFiltrado = filtrar(livrosNT);

  const total   = livrosAT.length + livrosNT.length;
  const prontos = Object.values(statuses).filter(s => s?.estrutura && s?.quiastico && s?.diagramas).length;

  return (
    <div className="min-h-screen bg-bg-deep text-white">
      <Navbar />

      <section className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header admin */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 rounded-full border border-brand-blue/20 mb-6">
              <ShieldCheck className="w-4 h-4 text-brand-blue" />
              <span className="text-[10px] font-black text-brand-blue uppercase tracking-[0.2em]">Área Administrativa</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tighter text-white mb-4">
              GESTÃO DE <span className="text-brand-blue">ARQUIVOS</span>
            </h1>
            <p className="text-white/40 text-base sm:text-lg max-w-xl mx-auto">
              Selecione um livro para carregar os arquivos de estrutura e divisões quiásticas.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3 text-sm">
              <span className="flex items-center gap-1.5 text-green-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />{prontos} completos
              </span>
              <span className="text-white/20">·</span>
              <span className="text-white/40">{total - prontos} pendentes</span>
            </div>
          </motion.div>

          {/* Legenda */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/8">
              <span className="px-2 py-0.5 rounded-md text-[11px] font-black border bg-green-500/15 border-green-500/40 text-green-400">E</span>
              <span className="text-sm font-semibold text-white/60">Estrutura Literaria</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/8">
              <span className="px-2 py-0.5 rounded-md text-[11px] font-black border bg-green-500/15 border-green-500/40 text-green-400">Q</span>
              <span className="text-sm font-semibold text-white/60">Divisoes Quiasticas Espelhadas</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/8">
              <span className="px-2 py-0.5 rounded-md text-[11px] font-black border bg-green-500/15 border-green-500/40 text-green-400">D</span>
              <span className="text-sm font-semibold text-white/60">Diagramas por Divisao</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/8">
              <span className="px-2 py-0.5 rounded-md text-[11px] font-black border bg-white/5 border-white/10 text-white/25">·</span>
              <span className="text-sm font-semibold text-white/30">Pendente</span>
            </div>
          </div>

          {/* Busca */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-14 max-w-2xl mx-auto relative group"
          >
            <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-brand-blue transition-colors pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Pesquisar livro…"
              className="w-full bg-white/5 border border-white/10 focus:border-brand-blue/60 focus:bg-white/[0.07] rounded-2xl pl-12 sm:pl-14 pr-12 py-4 sm:py-5 text-base sm:text-xl text-white placeholder-white/25 outline-none transition-all font-medium"
            />
            {busca && (
              <button onClick={() => setBusca('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            )}
          </motion.div>

          <Secao titulo="Antigo Testamento" livros={atFiltrado} statuses={statuses} />
          <Secao titulo="Novo Testamento"   livros={ntFiltrado} statuses={statuses} />

        </div>
      </section>
    </div>
  );
}
