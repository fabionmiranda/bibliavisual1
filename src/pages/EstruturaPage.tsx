import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, BookOpen, AlertCircle, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BIBLE_DATA } from '../data/bibleData';
import { BOOK_CONFIG } from './LivroPage';

export interface Bloco {
  titulo: string;
  linhas: string[];
  indice: number;
}

export function parsearEstrutura(texto: string): Bloco[] {
  return texto
    .split(/\n{2,}/)
    .map(g => g.trim())
    .filter(g => g.length > 0)
    .map((grupo, i) => {
      const linhas = grupo.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      return { titulo: linhas[0] ?? `Seção ${i + 1}`, linhas: linhas.slice(1), indice: i };
    });
}

interface Item {
  num: string;
  ref: string;
  titulo: string;
}

function parsearItens(texto: string): Item[] {
  return texto
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0)
    .map(l => {
      const m = l.match(/^\[(\d+)\]\s*-\s*(.+?)\s*-\s*(.+)$/);
      if (m) return { num: m[1], ref: m[2].trim(), titulo: m[3].trim() };
      return { num: '', ref: '', titulo: l };
    });
}

// Paleta cíclica — fundo escuro garantido, texto sempre contrastante
const PALETA = [
  { bg: 'from-blue-950 to-slate-950',    borda: 'border-blue-400/40',   num: '#93c5fd', ref: '#e0f2fe', titulo: '#ffffff' },
  { bg: 'from-violet-950 to-slate-950',  borda: 'border-violet-400/40', num: '#c4b5fd', ref: '#ede9fe', titulo: '#ffffff' },
  { bg: 'from-rose-950 to-slate-950',    borda: 'border-rose-400/40',   num: '#fda4af', ref: '#ffe4e6', titulo: '#ffffff' },
  { bg: 'from-amber-950 to-slate-950',   borda: 'border-amber-400/40',  num: '#fcd34d', ref: '#fef3c7', titulo: '#ffffff' },
  { bg: 'from-teal-950 to-slate-950',    borda: 'border-teal-400/40',   num: '#5eead4', ref: '#ccfbf1', titulo: '#ffffff' },
];

export default function EstruturaPage() {
  const { livro: livroId = '' } = useParams<{ livro: string }>();
  const navigate = useNavigate();

  const livroData  = BIBLE_DATA.livros.find(l => l.id === livroId);
  const testamento = livroData?.testamento ?? 'AT';
  const cfg        = BOOK_CONFIG[livroId];
  const Icone      = cfg?.icon ?? BookOpen;
  const url        = `/admin/${testamento}/${livroId}/estrutura.txt`;
  const base       = `/${livroId}/estrutura`;

  type Estado = 'carregando' | 'ok' | 'indisponivel';
  const [estado, setEstado] = useState<Estado>('carregando');
  const [itens,  setItens]  = useState<Item[]>([]);

  useEffect(() => {
    setEstado('carregando');
    fetch(url)
      .then(r => { if (!r.ok) throw new Error(); return r.text(); })
      .then(txt => {
        const lista = parsearItens(txt);
        // Valida: pelo menos um item deve ter o formato [NN] correto
        const valido = lista.some(it => /^\d+$/.test(it.num));
        if (!valido) { setEstado('indisponivel'); return; }
        setItens(lista);
        setEstado('ok');
      })
      .catch(() => setEstado('indisponivel'));
  }, [url]);

  return (
    <div className="min-h-screen flex flex-col bg-bg-deep text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/30 mb-10 flex-wrap">
          <Link to="/biblioteca" className="hover:text-white/60 transition-colors">Biblioteca</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/55">{livroData?.nome ?? livroId}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>Estrutura</span>
        </nav>

        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-5 mb-14"
        >
          {cfg && (
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${cfg.grad} border border-white/10 shadow-2xl shrink-0`}>
              <Icone className="w-10 h-10 sm:w-12 sm:h-12 text-white/90" strokeWidth={1.2} />
            </div>
          )}
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/35 font-bold mb-1">
              Estrutura Literária
            </p>
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tighter leading-none">
              {livroData?.nome ?? livroId}
            </h1>
          </div>
        </motion.div>

        {/* Carregando */}
        {estado === 'carregando' && (
          <div className="flex items-center justify-center py-40">
            <Loader2 className="w-8 h-8 animate-spin text-white/20" />
          </div>
        )}

        {/* Indisponível */}
        {estado === 'indisponivel' && (
          <div className="flex flex-col items-center gap-6 py-40 text-center">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
              <AlertCircle className="w-10 h-10 text-white/20" />
            </div>
            <div className="space-y-2">
              <p className="text-xl sm:text-2xl font-display font-black uppercase tracking-tighter text-white/50">
                Conteudo nao disponivel
              </p>
              <p className="text-white/35 text-sm sm:text-base max-w-xs leading-relaxed">
                Ver com Admin — o arquivo deste livro ainda nao foi carregado.
              </p>
            </div>
            <Link
              to="/admin"
              className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-xl
                bg-brand-blue/10 border border-brand-blue/30 text-brand-blue
                text-sm font-bold hover:bg-brand-blue/20 transition-all"
            >
              Area Admin →
            </Link>
          </div>
        )}

        {/* Grade de seções */}
        {estado === 'ok' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>

            <p className="text-[11px] uppercase tracking-[0.3em] text-white/25 font-bold mb-8">
              {itens.length} seções — clique para explorar
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
              {itens.map((item, i) => {
                const cor = PALETA[i % PALETA.length];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.04, 0.7), duration: 0.35 }}
                    whileHover={{ y: -3, transition: { duration: 0.15 } }}
                    className="h-full"
                  >
                    <button
                      onClick={() => navigate(`${base}/${i}`)}
                      className={`w-full h-full text-left group
                        bg-gradient-to-br ${cor.bg}
                        border ${cor.borda}
                        rounded-2xl p-5 sm:p-6
                        hover:brightness-110 hover:scale-[1.02]
                        transition-all duration-200
                        shadow-md hover:shadow-2xl
                        flex flex-col gap-3`}
                    >
                      {/* Número */}
                      <span
                        className="font-mono text-xl sm:text-2xl font-black leading-none"
                        style={{ color: cor.num }}
                      >
                        {item.num ? item.num : String(i + 1).padStart(2, '0')}
                      </span>

                      {/* Referência bíblica */}
                      {item.ref && (
                        <span
                          className="text-sm sm:text-base font-mono font-semibold leading-snug break-words"
                          style={{ color: cor.ref }}
                        >
                          {item.ref}
                        </span>
                      )}

                      {/* Título */}
                      <span
                        className="text-base sm:text-lg font-black uppercase tracking-tight leading-snug break-words flex-1"
                        style={{ color: cor.titulo }}
                      >
                        {item.titulo}
                      </span>

                      {/* Seta */}
                      <span
                        className="text-xs font-bold pt-2 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ color: cor.num }}
                      >
                        Explorar →
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

      </main>

      <Footer />
    </div>
  );
}
