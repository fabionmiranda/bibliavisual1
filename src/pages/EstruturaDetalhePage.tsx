import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, BookOpen, Loader2, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BIBLE_DATA } from '../data/bibleData';
import { BOOK_CONFIG } from './LivroPage';

interface Item {
  num: string;
  ref: string;
  titulo: string;
}

interface BlocoQuiasmo {
  num: number;
  cabecalho: string;
  linhas: string[];
}

interface LinhaQuiasmo {
  tipo: 'simbolo' | 'descricao';
  nivel: number;
  letra?: string;
  ref?: string;
  descricoes: string[];
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

function parsearQuiasmos(texto: string): BlocoQuiasmo[] {
  return texto
    .split(/={10,}/)
    .map(b => b.trim())
    .filter(b => b.length > 0)
    .map(b => {
      const linhas = b.split('\n').map(l => l.trimEnd());
      const ci = linhas.findIndex(l => /^\[(\d+)\]/.test(l.trim()));
      if (ci === -1) return null;
      const cab = linhas[ci].trim();
      const num = parseInt(cab.match(/^\[(\d+)\]/)![1], 10);
      return { num, cabecalho: cab, linhas: linhas.slice(ci + 1) };
    })
    .filter((b): b is BlocoQuiasmo => b !== null && b.num > 0);
}

function ehSimboloQuiasmo(texto: string): boolean {
  const partes = texto.split(' ');
  if (partes.length < 2) return /^[A-Z].{0,3}$/.test(texto);
  return /^[A-Z].{0,3}$/.test(partes[0]) && partes.slice(1).join(' ').startsWith('(');
}

function extrairSimboloRef(texto: string): { letra: string; ref: string } {
  const idx = texto.indexOf(' (');
  if (idx === -1) return { letra: texto.trim(), ref: '' };
  return {
    letra: texto.slice(0, idx).trim(),
    ref: texto.slice(idx).replace(/[()]/g, '').trim(),
  };
}

function agruparLinhas(linhas: string[]): LinhaQuiasmo[] {
  const resultado: LinhaQuiasmo[] = [];
  let atual: LinhaQuiasmo | null = null;
  for (const linha of linhas) {
    const recuo = linha.match(/^(\s+)/)?.[1].length ?? 0;
    const texto = linha.trim();
    if (!texto) continue;
    const nivel = Math.floor(recuo / 4);
    if (ehSimboloQuiasmo(texto)) {
      if (atual) resultado.push(atual);
      const { letra, ref } = extrairSimboloRef(texto);
      atual = { tipo: 'simbolo', nivel, letra, ref, descricoes: [] };
    } else if (atual) {
      atual.descricoes.push(texto);
    }
  }
  if (atual) resultado.push(atual);
  return resultado;
}

const NIVEL_CORES = ['#60a5fa', '#a78bfa', '#34d399', '#fbbf24', '#f472b6', '#38bdf8'];

function temPrime(letra: string) {
  return letra.includes("'") || letra.charCodeAt(1) === 0x2019 || letra.charCodeAt(1) === 0x2018;
}

function baseLetra(letra: string) {
  return letra.replace(/[^A-Z0-9]/g, '');
}

function slugLetra(letra: string): string {
  // A -> a, A' -> a-prime, B1 -> b1
  return letra
    .toLowerCase()
    .replace(/'/g, '-prime')
    .replace(/[^a-z0-9-]/g, '');
}

interface ConexaoSVG { cor: string; x: number; y1: number; y2: number }

function DiagramaQuiasmo({ linhas, basePath, key: _ }: { linhas: string[]; basePath: string; key?: number }) {
  const grupos = agruparLinhas(linhas);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [conexoes, setConexoes] = useState<ConexaoSVG[]>([]);

  badgeRefs.current = [];

  const calcular = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const mapa: Record<string, number[]> = {};
    grupos.forEach((g, i) => {
      const base = baseLetra(g.letra ?? '');
      if (!base) return;
      if (!mapa[base]) mapa[base] = [];
      mapa[base].push(i);
    });
    const novas: ConexaoSVG[] = [];
    Object.values(mapa).forEach(indices => {
      if (indices.length < 2) return;
      for (let k = 0; k < Math.floor(indices.length / 2); k++) {
        const ia = indices[k];
        const ib = indices[indices.length - 1 - k];
        const elA = badgeRefs.current[ia];
        const elB = badgeRefs.current[ib];
        if (!elA || !elB) return;
        const rA = elA.getBoundingClientRect();
        const rB = elB.getBoundingClientRect();
        const x  = rA.left - rect.left + rA.width / 2;
        const y1 = rA.bottom - rect.top + 4;
        const y2 = rB.top - rect.top - 4;
        if (y2 <= y1) return;
        novas.push({ cor: NIVEL_CORES[Math.min(grupos[ia].nivel, 5)], x, y1, y2 });
      }
    });
    setConexoes(novas);
  }, [grupos]);

  useEffect(() => {
    const t = setTimeout(calcular, 80);
    window.addEventListener('resize', calcular);
    return () => { clearTimeout(t); window.removeEventListener('resize', calcular); };
  }, [calcular]);

  return (
    <div ref={containerRef} className="relative">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <style>{`
            @keyframes qpulse { 0%,100%{opacity:.2} 50%{opacity:.8} }
          `}</style>
        </defs>
        {conexoes.map((c, i) => (
          <line key={i} x1={c.x} y1={c.y1} x2={c.x} y2={c.y2}
            stroke={c.cor} strokeWidth={2} strokeDasharray="5 4"
            style={{
              filter: `drop-shadow(0 0 4px ${c.cor})`,
              animation: `qpulse ${2.2 + i * 0.25}s ease-in-out infinite`,
            }}
          />
        ))}
      </svg>

      <div className="relative" style={{ zIndex: 1 }}>
        {grupos.map((g, i) => {
          const cor = NIVEL_CORES[Math.min(g.nivel, 5)];
          const indent = g.nivel * 40;
          const espelho = temPrime(g.letra ?? '');
          const href = `${basePath}/${slugLetra(g.letra ?? String(i))}`;
          return (
            <div
              key={i}
              onClick={() => navigate(href)}
              className="group flex items-start gap-4 sm:gap-5 py-4 border-b border-white/[0.06] last:border-0
                cursor-pointer rounded-xl transition-all duration-200
                hover:bg-white/[0.03] hover:border-white/10 -mx-3 px-3"
              style={{ paddingLeft: indent + 12 }}
            >
              <div
                ref={el => { badgeRefs.current[i] = el; }}
                className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center
                  font-mono font-black text-base sm:text-lg border transition-all duration-200
                  group-hover:scale-110"
                style={{
                  color: cor,
                  borderColor: cor + (espelho ? '90' : '60'),
                  background: cor + (espelho ? '28' : '15'),
                  boxShadow: espelho ? `0 0 12px ${cor}44` : 'none',
                }}
              >
                {g.letra}
              </div>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-6 min-w-0 py-1">
                {g.ref && (
                  <span className="shrink-0 font-mono text-sm sm:text-base font-black whitespace-nowrap"
                    style={{ color: cor }}>
                    {g.ref}
                  </span>
                )}
                <div className="flex flex-col gap-1 flex-1">
                  {g.descricoes.map((d, j) => (
                    <span key={j}
                      className={`text-base sm:text-lg leading-snug ${d.startsWith('"') ? 'italic' : ''}`}
                      style={{ color: '#f1f5f9ee' }}>
                      {d}
                    </span>
                  ))}
                </div>
                <span
                  className="shrink-0 self-center text-xs sm:text-sm font-black uppercase tracking-wider
                    font-mono whitespace-nowrap px-3 py-1.5 rounded-lg border transition-all duration-200
                    group-hover:scale-105"
                  style={{
                    color: cor,
                    borderColor: cor + '50',
                    background: cor + '12',
                    boxShadow: `0 0 10px ${cor}20`,
                  }}
                >
                  Ver Diagramas →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function EstruturaDetalhePage() {
  const { livro: livroId = '', indice = '1' } = useParams<{ livro: string; indice: string }>();
  const idx = parseInt(indice, 10); // 1-based

  const livroData  = BIBLE_DATA.livros.find(l => l.id === livroId);
  const testamento = livroData?.testamento ?? 'AT';
  const cfg        = BOOK_CONFIG[livroId];
  const Icone      = cfg?.icon ?? BookOpen;
  const corHex     = testamento === 'AT' ? '#60a5fa' : '#fb7185';
  const urlEstrutura = `/admin/${testamento}/${livroId}/estrutura.txt`;
  const urlQuiasmo   = `/admin/${testamento}/${livroId}/quiastico.txt`;
  const base         = `/${livroId}/estrutura`;

  type Estado = 'carregando' | 'ok' | 'erro';
  const [estado,   setEstado]   = useState<Estado>('carregando');
  const [itens,    setItens]    = useState<Item[]>([]);
  const [quiasmos, setQuiasmos] = useState<BlocoQuiasmo[]>([]);

  useEffect(() => {
    setEstado('carregando');
    Promise.all([
      fetch(urlEstrutura).then(r => r.ok ? r.text() : Promise.reject()),
      fetch(urlQuiasmo).then(r => r.ok ? r.text() : ''),
    ])
      .then(([txtEst, txtQ]) => {
        setItens(parsearItens(txtEst));
        if (txtQ) setQuiasmos(parsearQuiasmos(txtQ));
        setEstado('ok');
      })
      .catch(() => setEstado('erro'));
  }, [urlEstrutura, urlQuiasmo]);

  useEffect(() => { window.scrollTo(0, 0); }, [idx]);

  const item    = itens[idx - 1] ?? null; // idx is 1-based, array is 0-based
  const total   = itens.length;
  const numSec  = item?.num ? parseInt(item.num, 10) : idx;
  const quiasmo = quiasmos.find(q => q.num === numSec) ?? null;

  const podePrev  = idx > 1;
  const podeProx  = total > 0 && idx < total;

  return (
    <div className="min-h-screen flex flex-col bg-bg-deep text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/60 mb-12 flex-wrap font-mono">
          <Link to="/biblioteca" className="hover:text-brand-blue transition-colors font-bold">Biblioteca</Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          <Link to={base} className="hover:text-brand-blue transition-colors font-bold text-white/80">
            {livroData?.nome ?? livroId}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          <span className="text-brand-blue/80">{item?.ref ?? `Secao ${idx}`}</span>
        </nav>

        {estado === 'carregando' && (
          <div className="flex items-center justify-center py-40">
            <Loader2 className="w-7 h-7 animate-spin text-white/20" />
          </div>
        )}

        {estado === 'erro' && (
          <div className="flex flex-col items-center gap-4 py-40 text-center">
            <AlertCircle className="w-10 h-10 text-white/40" />
            <p className="text-white/70 font-bold font-mono">Nao foi possivel carregar o conteudo.</p>
            <Link to={base} className="text-sm text-brand-blue hover:text-white transition-colors font-bold">Voltar</Link>
          </div>
        )}

        {estado === 'ok' && item && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

            {/* Cabecalho */}
            <div className="flex items-center gap-4 mb-10">
              {cfg && (
                <div className={`p-3.5 rounded-xl bg-gradient-to-br ${cfg.grad} border border-white/10 shadow-xl shrink-0`}>
                  <Icone className="w-8 h-8 text-white/90" strokeWidth={1.2} />
                </div>
              )}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-brand-blue font-black mb-0.5">
                  {livroData?.nome ?? livroId}
                </p>
                <p className="font-mono text-sm font-bold text-white/80">
                  Secao {String(idx).padStart(2, '0')} de {String(total).padStart(2, '0')}
                </p>
              </div>
            </div>

            {item.ref && (
              <p className="font-mono text-base sm:text-lg font-bold mb-3 tracking-wide" style={{ color: corHex }}>{item.ref}</p>
            )}

            <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter leading-none text-white mb-12">
              {item.titulo}
            </h1>

            {/* Quiasmo */}
            {quiasmo ? (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border"
                    style={{ color: corHex, borderColor: corHex + '40', background: corHex + '12' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: corHex }} />
                    Estrutura Quiastica
                  </div>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                <p className="font-mono text-xs sm:text-sm text-white/70 mb-8 tracking-wide font-bold">{quiasmo.cabecalho}</p>

                <div className="rounded-2xl border border-white/[0.08] p-6 sm:p-10 overflow-x-auto"
                  style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))' }}>
                  <DiagramaQuiasmo key={numSec} linhas={quiasmo.linhas} basePath={`${base}/${idx}`} />
                </div>
              </motion.div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
                <p className="text-white/50 text-sm uppercase tracking-widest font-bold font-mono">Quiasmo nao disponivel</p>
              </div>
            )}

            {/* Navegacao */}
            <div className="flex items-center justify-between mt-16 gap-3">

              {podePrev ? (
                <Link to={`${base}/${idx - 1}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30
                    text-sm font-black text-white hover:border-brand-blue hover:text-brand-blue
                    transition-all duration-200 hover:scale-105 active:scale-95 font-mono uppercase tracking-wider">
                  <ArrowLeft className="w-4 h-4" /> Anterior
                </Link>
              ) : (
                <span className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10
                  text-sm font-black text-white/25 cursor-not-allowed select-none font-mono uppercase tracking-wider">
                  <ArrowLeft className="w-4 h-4" /> Anterior
                </span>
              )}

              <Link to={base}
                className="px-6 py-3 rounded-xl border border-brand-blue/40 text-xs uppercase
                  tracking-widest font-black text-brand-blue hover:bg-brand-blue/10 hover:border-brand-blue
                  transition-all duration-200 hover:scale-105 active:scale-95 font-mono">
                Ver todas
              </Link>

              {podeProx ? (
                <Link to={`${base}/${idx + 1}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30
                    text-sm font-black text-white hover:border-brand-blue hover:text-brand-blue
                    transition-all duration-200 hover:scale-105 active:scale-95 font-mono uppercase tracking-wider">
                  Proxima <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10
                  text-sm font-black text-white/25 cursor-not-allowed select-none font-mono uppercase tracking-wider">
                  Proxima <ArrowRight className="w-4 h-4" />
                </span>
              )}

            </div>

          </motion.div>
        )}

      </main>
      <Footer />
    </div>
  );
}
