import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, BookOpen, AlertCircle, Loader2, Download, Search, X } from 'lucide-react';
import { sanitizarTxt } from '../lib/sanitizarTxt';
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
      // Formato 1: [01] - ref - titulo
      const m1 = l.match(/^\[(\d+)\]\s*-\s*(.+?)\s*-\s*(.+)$/);
      if (m1) return { num: m1[1], ref: m1[2].trim(), titulo: m1[3].trim() };

      // Formato 2: [01] ref — titulo  (travessão —)
      const m2 = l.match(/^\[(\d+)\]\s+(.+?)\s+[—–]\s+(.+)$/);
      if (m2) return { num: m2[1], ref: m2[2].trim(), titulo: m2[3].trim() };

      // Formato 3: [01] titulo  (sem ref separada)
      const m3 = l.match(/^\[(\d+)\]\s+(.+)$/);
      if (m3) return { num: m3[1], ref: '', titulo: m3[2].trim() };

      return { num: '', ref: '', titulo: l };
    });
}

const PALETA = [
  { glow: '#60a5fa', borda: 'rgba(96,165,250,0.35)',  num: '#93c5fd', ref: '#bfdbfe', titulo: '#ffffff' },
  { glow: '#a78bfa', borda: 'rgba(167,139,250,0.35)', num: '#c4b5fd', ref: '#ddd6fe', titulo: '#ffffff' },
  { glow: '#f472b6', borda: 'rgba(244,114,182,0.35)', num: '#fda4af', ref: '#fce7f3', titulo: '#ffffff' },
  { glow: '#fbbf24', borda: 'rgba(251,191,36,0.35)',  num: '#fcd34d', ref: '#fef3c7', titulo: '#ffffff' },
  { glow: '#34d399', borda: 'rgba(52,211,153,0.35)',  num: '#6ee7b7', ref: '#d1fae5', titulo: '#ffffff' },
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

  // Infográfico: capitaliza primeira letra do id para montar o path
  const nomeCapit = livroId.charAt(0).toUpperCase() + livroId.slice(1);
  const [infograficoUrl, setInfograficoUrl] = useState<string | null>(null);

  useEffect(() => {
    const base = `/infograficos/${testamento}/${nomeCapit}`;
    const exts = ['.jpg', '.jpeg', '.png', '.webp'];
    let found = false;
    (async () => {
      for (const ext of exts) {
        try {
          const r = await fetch(base + ext, { method: 'HEAD' });
          if (r.ok) { setInfograficoUrl(base + ext); found = true; break; }
        } catch { /* ignorar */ }
      }
      if (!found) setInfograficoUrl(null);
    })();
  }, [testamento, nomeCapit]);

  type Estado = 'carregando' | 'ok' | 'indisponivel';
  const [estado,  setEstado]  = useState<Estado>('carregando');
  const [itens,   setItens]   = useState<Item[]>([]);
  const [busca,   setBusca]   = useState('');

  useEffect(() => {
    setEstado('carregando');
    fetch(url)
      .then(r => { if (!r.ok) throw new Error(); return r.text(); })
      .then(raw => {
        const txt = sanitizarTxt(raw);
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
        <nav className="flex items-center gap-2 text-sm text-white/60 mb-10 flex-wrap font-mono">
          <Link to="/biblioteca" className="hover:text-brand-blue transition-colors font-bold">Biblioteca</Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          <span className="text-white/80 font-bold">{livroData?.nome ?? livroId}</span>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          <span className="text-brand-blue/80">Estrutura</span>
        </nav>

        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-5 mb-14 flex-wrap"
        >
          {cfg && (
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${cfg.grad} border border-white/10 shadow-2xl shrink-0`}>
              <Icone className="w-10 h-10 sm:w-12 sm:h-12 text-white/90" strokeWidth={1.2} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.4em] text-brand-blue font-black mb-2">
              Estrutura Literaria
            </p>

            {/* Nome do livro */}
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tighter leading-none mb-3">
              {livroData?.nome ?? livroId}
            </h1>

            {/* Infográfico + busca na mesma linha */}
            <div className="flex items-center gap-3 flex-wrap">
              {infograficoUrl && (
                <motion.a
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25, type: 'spring', bounce: 0.4 }}
                  href={`https://wa.me/35997567535?text=${encodeURIComponent('Gostaria de receber o infografico')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                    text-xs font-black uppercase tracking-wider shrink-0
                    active:scale-95 transition-transform duration-150"
                  style={{
                    color: '#00d4ff',
                    border: '1.5px solid rgba(0,212,255,0.55)',
                    background: 'rgba(0,212,255,0.10)',
                    boxShadow: '0 0 18px rgba(0,212,255,0.25)',
                    animation: 'infoPulse 2s ease-in-out infinite',
                  }}
                >
                  <Download className="w-3.5 h-3.5" />
                  Infográfico
                </motion.a>
              )}

              {/* Campo de busca */}
              <div
                className="relative flex-1 min-w-[220px] max-w-sm"
                style={{ filter: busca ? 'drop-shadow(0 0 10px rgba(0,212,255,0.25))' : 'none', transition: 'filter 0.3s' }}
              >
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-200"
                  style={{ color: busca ? '#00d4ff' : 'rgba(255,255,255,0.35)' }}
                />
                <input
                  type="text"
                  value={busca}
                  onChange={e => setBusca(e.target.value)}
                  placeholder="Buscar por número ou referência..."
                  className="w-full pl-11 pr-9 py-2.5 rounded-2xl text-sm font-mono text-white/90 placeholder-white/35
                    outline-none transition-all duration-300"
                  style={{
                    background: busca ? 'rgba(0,212,255,0.07)' : 'rgba(255,255,255,0.05)',
                    border: busca ? '1.5px solid rgba(0,212,255,0.55)' : '1.5px solid rgba(255,255,255,0.10)',
                    boxShadow: busca ? 'inset 0 0 20px rgba(0,212,255,0.06)' : 'none',
                  }}
                />
                {busca && (
                  <button
                    onClick={() => setBusca('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 hover:scale-110"
                    style={{ color: 'rgba(0,212,255,0.6)' }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
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
              <p className="text-xl sm:text-2xl font-display font-black uppercase tracking-tighter text-white/80">
                Conteudo nao disponivel
              </p>
              <p className="text-white/60 text-sm sm:text-base max-w-xs leading-relaxed">
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

            {/* Contador de seções */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-2xl sm:text-3xl font-black text-white/90 leading-none"
                  style={{ textShadow: '0 0 20px rgba(0,212,255,0.4)' }}>
                  {itens.length}
                </span>
                <div className="flex flex-col">
                  <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-brand-blue">
                    Secoes
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60 font-medium">
                    clique para explorar
                  </span>
                </div>
              </div>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg,rgba(0,212,255,0.3),transparent)' }} />
            </div>

            {(() => {
              const q = busca.trim().toLowerCase();
              const itensFiltrados = q
                ? itens.filter(it =>
                    it.num.toLowerCase().includes(q) ||
                    it.ref.toLowerCase().includes(q) ||
                    it.titulo.toLowerCase().includes(q)
                  )
                : itens;

              if (q && itensFiltrados.length === 0) {
                return (
                  <div className="flex flex-col items-center gap-3 py-20 text-center">
                    <Search className="w-8 h-8 text-white/15" />
                    <p className="text-white/40 text-sm font-mono uppercase tracking-widest font-bold">
                      Nenhuma seção encontrada
                    </p>
                    <button onClick={() => setBusca('')} className="text-xs text-brand-blue/70 hover:text-brand-blue transition-colors font-bold">
                      Limpar busca
                    </button>
                  </div>
                );
              }

              return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {itensFiltrados.map((item, i) => {
                const originalIndex = itens.indexOf(item);
                const cor = PALETA[originalIndex % PALETA.length];
                const num = item.num ? item.num.padStart(2, '0') : String(originalIndex + 1).padStart(2, '0');
                return (
                  <motion.div
                    key={originalIndex}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.04, 0.5), duration: 0.35 }}
                    whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.18 } }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <button
                      onClick={() => navigate(`${base}/${originalIndex + 1}`)}
                      className="w-full group relative overflow-hidden rounded-2xl
                        flex flex-col items-center text-center gap-3 p-6
                        transition-all duration-300
                        hover:shadow-[0_0_40px_rgba(0,0,0,0.6)]"
                      style={{
                        background: 'linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))',
                        border: `1px solid ${cor.borda}`,
                        boxShadow: `0 0 0 0 ${cor.glow}00`,
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px ${cor.glow}30, inset 0 0 40px ${cor.glow}08`;
                        (e.currentTarget as HTMLElement).style.borderColor = cor.glow + '80';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.boxShadow = '';
                        (e.currentTarget as HTMLElement).style.borderColor = cor.borda;
                      }}
                    >
                      {/* linha de brilho no topo */}
                      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: `linear-gradient(90deg, transparent, ${cor.glow}, transparent)` }} />

                      {/* Número */}
                      <span
                        className="font-mono text-3xl sm:text-4xl font-black leading-none tracking-tighter"
                        style={{ color: cor.glow, textShadow: `0 0 20px ${cor.glow}80` }}
                      >
                        {num}
                      </span>

                      {/* Divisor */}
                      <div className="w-8 h-px opacity-30" style={{ background: cor.glow }} />

                      {/* Referência */}
                      {item.ref && (
                        <span
                          className="font-mono text-xs sm:text-sm font-bold tracking-wider uppercase"
                          style={{ color: cor.ref, opacity: 0.95 }}
                        >
                          {item.ref}
                        </span>
                      )}

                      {/* Título */}
                      <span
                        className="text-sm sm:text-base font-black uppercase tracking-wide leading-snug"
                        style={{ color: cor.titulo }}
                      >
                        {item.titulo}
                      </span>

                      {/* Explorar */}
                      <span
                        className="mt-1 text-[10px] font-black uppercase tracking-[0.25em] opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0"
                        style={{ color: cor.glow }}
                      >
                        Explorar →
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
              );
            })()}
          </motion.div>
        )}

      </main>

      <Footer />
    </div>
  );
}
