import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, BookOpen, Loader2, AlertCircle, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import { sanitizarTxt } from '../lib/sanitizarTxt';
import Footer from '../components/Footer';
import { BIBLE_DATA } from '../data/bibleData';
import { BOOK_CONFIG } from './LivroPage';

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Secao {
  num: number;   // número inteiro da seção, ex: 1
  ref: string;   // ex: "Levítico 1:1–3:17"
  titulo: string;
}

interface LinhaQuiasmo {
  letra: string;
  ref: string;
  descricoes: string[];
  nivel: number;
  espelho: boolean; // tem prime/apóstrofo
}

interface BlocoQuiasmo {
  num: number;
  cabecalho: string;
  linhas: LinhaQuiasmo[];
  resumo: string[];
}

// ─── Parsers ──────────────────────────────────────────────────────────────────

function parsearSecoes(texto: string): Secao[] {
  const result: Secao[] = [];
  for (const linha of texto.split('\n')) {
    const l = linha.trim();
    if (!l) continue;
    // Formato: [01] - ref - titulo  ou  [01] ref — titulo  ou  [01] titulo
    const m1 = l.match(/^\[(\d+)\]\s*-\s*(.+?)\s*-\s*(.+)$/);
    if (m1) { result.push({ num: parseInt(m1[1], 10), ref: m1[2].trim(), titulo: m1[3].trim() }); continue; }
    const m2 = l.match(/^\[(\d+)\]\s+(.+?)\s+[—–]\s+(.+)$/);
    if (m2) { result.push({ num: parseInt(m2[1], 10), ref: m2[2].trim(), titulo: m2[3].trim() }); continue; }
    const m3 = l.match(/^\[(\d+)\]\s+(.+)$/);
    if (m3) { result.push({ num: parseInt(m3[1], 10), ref: '', titulo: m3[2].trim() }); continue; }
  }
  return result;
}

const RESUMO_RE = /^[A-Z][''''’‘]?\s*:/;

function temPrime(letra: string) {
  return /[''''’‘]/.test(letra);
}

function ehSimbolo(texto: string): boolean {
  const partes = texto.split(' ');
  if (partes.length < 2) return /^[A-Z].{0,3}$/.test(texto);
  return /^[A-Z].{0,3}$/.test(partes[0]) && partes.slice(1).join(' ').startsWith('(');
}

function parsearBlocoLinhas(linhasBruto: string[]): LinhaQuiasmo[] {
  const resultado: LinhaQuiasmo[] = [];
  let atual: LinhaQuiasmo | null = null;
  for (const linha of linhasBruto) {
    const recuo = linha.match(/^(\s+)/)?.[1].length ?? 0;
    const texto = linha.trim();
    if (!texto) continue;
    const nivel = Math.floor(recuo / 4);
    if (ehSimbolo(texto)) {
      if (atual) resultado.push(atual);
      const idxP = texto.indexOf(' (');
      const letra = idxP === -1 ? texto.trim() : texto.slice(0, idxP).trim();
      const ref   = idxP === -1 ? '' : texto.slice(idxP).replace(/[()]/g, '').trim();
      atual = { letra, ref, descricoes: [], nivel, espelho: temPrime(letra) };
    } else if (atual) {
      atual.descricoes.push(texto);
    }
  }
  if (atual) resultado.push(atual);
  return resultado;
}

function parsearQuiasmos(texto: string): BlocoQuiasmo[] {
  return texto
    .split(/={10,}/)
    .map(b => b.trim())
    .filter(b => b.length > 0)
    .flatMap(b => {
      const linhas = b.split('\n').map(l => l.trimEnd());
      const ci = linhas.findIndex(l => /^\[(\d+)\]/.test(l.trim()));
      if (ci === -1) return [];
      const cab = linhas[ci].trim();
      const m = cab.match(/^\[(\d+)\]/);
      if (!m) return [];
      const num = parseInt(m[1], 10);
      const corpo = linhas.slice(ci + 1);
      const estrutura: string[] = [];
      const resumo: string[] = [];
      for (const l of corpo) {
        const t = l.trim();
        if (RESUMO_RE.test(t)) resumo.push(t);
        else estrutura.push(l);
      }
      return [{ num, cabecalho: cab, linhas: parsearBlocoLinhas(estrutura), resumo }];
    });
}

// ─── Constantes visuais ───────────────────────────────────────────────────────

const NIVEL_CORES = ['#60a5fa', '#a78bfa', '#34d399', '#fbbf24', '#f472b6', '#38bdf8'];

function baseLetra(letra: string) {
  return letra.replace(/[^A-Z0-9]/g, '');
}

function slugLetra(letra: string): string {
  return letra.toLowerCase().replace(/'/g, '-prime').replace(/[^a-z0-9-]/g, '');
}

// ─── Componente diagrama ──────────────────────────────────────────────────────

interface ConexaoSVG { cor: string; x: number; y1: number; y2: number }

function DiagramaQuiasmo({
  linhas,
  resumo,
}: {
  linhas: LinhaQuiasmo[];
  resumo: string[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const [conexoes, setConexoes] = useState<ConexaoSVG[]>([]);

  badgeRefs.current = [];

  const calcular = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const mapa: Record<string, number[]> = {};
    linhas.forEach((g, i) => {
      const base = baseLetra(g.letra);
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
        novas.push({ cor: NIVEL_CORES[Math.min(linhas[ia].nivel, 5)], x, y1, y2 });
      }
    });
    setConexoes(novas);
  }, [linhas]);

  useEffect(() => {
    const t = setTimeout(calcular, 80);
    window.addEventListener('resize', calcular);
    return () => { clearTimeout(t); window.removeEventListener('resize', calcular); };
  }, [calcular]);

  return (
    <div ref={containerRef} className="relative">
      {/* SVG conexões espelhadas */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <style>{`@keyframes qpulse{0%,100%{opacity:.2}50%{opacity:.75}}`}</style>
        </defs>
        {conexoes.map((c, i) => (
          <line key={i} x1={c.x} y1={c.y1} x2={c.x} y2={c.y2}
            stroke={c.cor} strokeWidth={2} strokeDasharray="5 4"
            style={{ filter: `drop-shadow(0 0 4px ${c.cor})`, animation: `qpulse ${2.2 + i * 0.25}s ease-in-out infinite` }}
          />
        ))}
      </svg>

      <div className="relative" style={{ zIndex: 1 }}>
        {linhas.map((g, i) => {
          const cor    = NIVEL_CORES[Math.min(g.nivel, 5)];
          const indent = g.nivel * 40;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03, duration: 0.25 }}
              className="flex items-start gap-4 sm:gap-5 py-4 border-b border-white/[0.06] last:border-0"
              style={{ paddingLeft: indent + 12 }}
            >
              {/* Badge letra */}
              <div
                ref={el => { badgeRefs.current[i] = el; }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center
                  font-mono font-black text-base sm:text-lg border shrink-0"
                style={{
                  color: cor,
                  borderColor: cor + (g.espelho ? '90' : '60'),
                  background: cor + (g.espelho ? '28' : '15'),
                  boxShadow: g.espelho ? `0 0 14px ${cor}44` : 'none',
                }}
              >
                {g.letra}
              </div>

              {/* Conteúdo */}
              <div className="flex-1 flex flex-col gap-0.5 min-w-0 py-1">
                {g.ref && (
                  <span className="font-mono text-sm font-black" style={{ color: cor }}>
                    {g.ref}
                  </span>
                )}
                {g.descricoes.map((d, j) => (
                  <span key={j} className={`text-base sm:text-lg leading-snug ${d.startsWith('"') ? 'italic' : ''}`}
                    style={{ color: '#f1f5f9ee', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                    {d.split(/(\[[^\]]+\])/).map((part, pi) =>
                      part.startsWith('[') && part.endsWith(']')
                        ? (
                          <span key={pi} style={{
                            whiteSpace: 'nowrap',
                            unicodeBidi: 'isolate',
                            direction: 'ltr',
                            fontFamily: '"SBL Hebrew","Ezra SIL","Noto Serif Hebrew","Noto Sans Hebrew","Times New Roman",serif',
                            fontSize: 'clamp(15px,3vw,18px)',
                            fontWeight: 600,
                            color: cor,
                            letterSpacing: '0.04em',
                            marginLeft: 4,
                          }}>
                            {part}
                          </span>
                        )
                        : part
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Resumo dos elementos */}
      {resumo.length > 0 && (
        <div className="mt-8 pt-6 border-t border-white/[0.08]">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/35 font-black mb-4">
            Resumo dos Elementos
          </p>
          <div className="flex flex-wrap gap-3">
            {resumo.map((linha, i) => {
              const col   = NIVEL_CORES[i % NIVEL_CORES.length];
              const match = linha.match(/^([A-Z][''''’‘]?)\s*:\s*(.+)$/);
              return (
                <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border"
                  style={{ borderColor: col + '40', background: col + '10' }}>
                  {match && (
                    <span className="font-mono font-black text-sm shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border"
                      style={{ color: col, borderColor: col + '55', background: col + '20', boxShadow: `0 0 8px ${col}30` }}>
                      {match[1]}
                    </span>
                  )}
                  <span className="text-sm text-white/80 font-medium leading-snug">
                    {match ? match[2] : linha}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────

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

  type Estado = 'carregando' | 'ok' | 'semArquivo';
  const [estado,   setEstado]   = useState<Estado>('carregando');
  const [secoes,   setSecoes]   = useState<Secao[]>([]);
  const [quiasmos, setQuiasmos] = useState<BlocoQuiasmo[]>([]);
  const [erroMsg,  setErroMsg]  = useState('');

  useEffect(() => {
    let cancelado = false;
    setEstado('carregando');
    setSecoes([]);
    setQuiasmos([]);
    setErroMsg('');

    (async () => {
      try {
        const [rEst, rQ] = await Promise.all([fetch(urlEstrutura), fetch(urlQuiasmo)]);
        if (cancelado) return;

        const rawEst = rEst.ok ? await rEst.text() : '';
        const rawQ   = rQ.ok  ? await rQ.text()  : '';
        if (cancelado) return;

        if (!rawEst) {
          setErroMsg('O arquivo estrutura.txt ainda não foi inserido para este livro.');
          setEstado('semArquivo');
          return;
        }

        const secoesP  = parsearSecoes(sanitizarTxt(rawEst));
        const quiasmoP = rawQ ? parsearQuiasmos(sanitizarTxt(rawQ)) : [];

        setSecoes(secoesP);
        setQuiasmos(quiasmoP);
        setEstado('ok');
      } catch (e) {
        if (!cancelado) {
          setErroMsg(String(e));
          setEstado('semArquivo');
        }
      }
    })();

    return () => { cancelado = true; };
  }, [urlEstrutura, urlQuiasmo]);

  useEffect(() => { window.scrollTo(0, 0); }, [idx]);

  // Seção atual (1-based → 0-indexed)
  const secao  = secoes.find(s => s.num === idx) ?? secoes[idx - 1] ?? null;
  const total  = secoes.length;
  const numSec = secao?.num ?? idx;
  const quiasmo = quiasmos.find(q => q.num === numSec) ?? null;

  const podePrev = idx > 1;
  const podeProx = total > 0 && idx < total;

  return (
    <div className="min-h-screen flex flex-col bg-bg-deep text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-white/50 mb-10 flex-wrap font-mono">
          <Link to="/biblioteca" className="hover:text-brand-blue transition-colors font-bold">Biblioteca</Link>
          <ChevronRight className="w-3 h-3 text-white/25" />
          <Link to={base} className="hover:text-brand-blue transition-colors font-bold text-white/70">
            {livroData?.nome ?? livroId}
          </Link>
          <ChevronRight className="w-3 h-3 text-white/25" />
          <span style={{ color: corHex }}>
            {secao?.ref ? secao.ref : `Seção ${idx}`}
          </span>
        </nav>

        {/* ── Carregando ──────────────────────────────────────────────────── */}
        {estado === 'carregando' && (
          <div className="flex items-center justify-center py-48">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: corHex + '60' }} />
          </div>
        )}

        {/* ── Sem arquivo ─────────────────────────────────────────────────── */}
        {estado === 'semArquivo' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6 py-48 text-center"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: `${corHex}15`, border: `1px solid ${corHex}30` }}>
              <AlertCircle className="w-7 h-7" style={{ color: corHex }} />
            </div>
            <div>
              <p className="font-display font-black text-xl uppercase tracking-tight text-white/70 mb-2">
                Conteúdo não disponível
              </p>
              <p className="text-white/40 text-sm max-w-xs mx-auto leading-relaxed">{erroMsg}</p>
            </div>
            <Link to={`/admin/${testamento.toLowerCase()}/${livroId}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-bold transition-all"
              style={{ borderColor: `${corHex}40`, color: corHex, background: `${corHex}10` }}>
              <ShieldCheck className="w-4 h-4" />
              Inserir via Área Admin
            </Link>
            <Link to={base} className="text-xs text-white/30 hover:text-white/60 transition-colors font-bold">
              ← Voltar às seções
            </Link>
          </motion.div>
        )}

        {/* ── Conteúdo ────────────────────────────────────────────────────── */}
        {estado === 'ok' && (
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Cabeçalho da seção */}
              <div className="flex items-start gap-4 mb-10">
                {cfg && (
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${cfg.grad} border border-white/10 shrink-0 hidden sm:flex`}>
                    <Icone className="w-7 h-7 text-white/90" strokeWidth={1.2} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] font-black"
                      style={{ color: corHex }}>
                      {livroData?.nome ?? livroId}
                    </span>
                    <span className="font-mono text-[10px] text-white/25 font-bold">
                      Seção {String(idx).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                  </div>
                  {secao?.ref && (
                    <p className="font-mono text-base sm:text-lg font-black mb-2 tracking-wide"
                      style={{ color: corHex }}>
                      {secao.ref}
                    </p>
                  )}
                  {secao ? (
                    <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tighter leading-none text-white">
                      {secao.titulo}
                    </h1>
                  ) : (
                    <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tighter leading-none text-white/40">
                      Seção {idx}
                    </h1>
                  )}
                </div>
              </div>

              {/* Divisor */}
              <div className="h-px mb-10" style={{ background: `linear-gradient(90deg, ${corHex}50, transparent)` }} />

              {/* ── Quiasma ── */}
              {quiasmo ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {/* Badge título */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black
                      uppercase tracking-widest border"
                      style={{ color: corHex, borderColor: corHex + '40', background: corHex + '10' }}>
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: corHex }} />
                      Estrutura Quiástica Espelhada
                    </div>
                    <div className="flex-1 h-px bg-white/[0.06]" />
                  </div>

                  <p className="font-mono text-xs text-white/50 mb-8 font-bold tracking-wide">
                    {quiasmo.cabecalho}
                  </p>

                  {/* Diagrama */}
                  <div className="rounded-2xl border border-white/[0.08] p-5 sm:p-8 overflow-x-auto"
                    style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))' }}>
                    <DiagramaQuiasmo
                      linhas={quiasmo.linhas}
                      resumo={quiasmo.resumo}
                    />
                  </div>

                  {/* Botão Ver Diagramas da Seção */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="mt-8"
                  >
                    <Link
                      to={`${base}/${idx}/${slugLetra(quiasmo.linhas[0]?.letra || 'a')}`}
                      className="group relative flex items-center justify-between gap-4 w-full
                        px-7 py-5 rounded-2xl border-2 transition-all duration-300
                        hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        borderColor: corHex + '50',
                        background: `linear-gradient(135deg, ${corHex}15, ${corHex}05)`,
                        boxShadow: `0 0 32px ${corHex}18`,
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 48px ${corHex}35`;
                        (e.currentTarget as HTMLElement).style.borderColor = corHex + '80';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 32px ${corHex}18`;
                        (e.currentTarget as HTMLElement).style.borderColor = corHex + '50';
                      }}
                    >
                      {/* Ícone + texto */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: corHex + '20', border: `1.5px solid ${corHex}50` }}>
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            style={{ color: corHex }} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                              d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-mono font-black text-xs uppercase tracking-[0.3em] mb-0.5"
                            style={{ color: corHex }}>
                            Explorar Diagramas
                          </p>
                          <p className="text-white/60 text-sm font-medium">
                            Ver todos os diagramas desta seção
                          </p>
                        </div>
                      </div>

                      {/* Seta */}
                      <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                        transition-all duration-300 group-hover:translate-x-1"
                        style={{ background: corHex + '20', border: `1.5px solid ${corHex}40` }}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                          style={{ color: corHex }} strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  </motion.div>

                </motion.div>
              ) : (
                /* Quiasma não disponível */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-2xl border-2 border-dashed border-white/10 p-10 sm:p-16
                    text-center flex flex-col items-center gap-6"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: `${corHex}12`, border: `1px solid ${corHex}25` }}>
                    <AlertCircle className="w-6 h-6" style={{ color: corHex + '80' }} />
                  </div>
                  <div>
                    <p className="font-display font-black text-lg uppercase tracking-tight text-white/50 mb-2">
                      Estrutura Quiástica não disponível
                    </p>
                    <p className="text-white/30 text-sm max-w-xs mx-auto leading-relaxed">
                      {quiasmos.length === 0
                        ? <>O arquivo <span className="font-mono font-black text-white/50">quiastico.txt</span> ainda não foi inserido para este livro.</>
                        : 'Nenhuma estrutura quiástica encontrada para esta seção no arquivo carregado.'
                      }
                    </p>
                  </div>
                  {quiasmos.length === 0 && (
                    <Link to={`/admin/${testamento.toLowerCase()}/${livroId}`}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-bold transition-all"
                      style={{ borderColor: `${corHex}35`, color: corHex + 'cc', background: `${corHex}0c` }}>
                      <ShieldCheck className="w-4 h-4" />
                      Inserir via Área Admin
                    </Link>
                  )}
                </motion.div>
              )}

              {/* ── Navegação ── */}
              <div className="flex items-center justify-between mt-16 gap-3">
                {podePrev ? (
                  <Link to={`${base}/${idx - 1}`}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20
                      text-sm font-black text-white/70 hover:border-white/40 hover:text-white
                      transition-all duration-200 font-mono uppercase tracking-wider">
                    <ArrowLeft className="w-4 h-4" /> Anterior
                  </Link>
                ) : (
                  <span className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.07]
                    text-sm font-black text-white/20 cursor-not-allowed select-none font-mono uppercase tracking-wider">
                    <ArrowLeft className="w-4 h-4" /> Anterior
                  </span>
                )}

                <Link to={base}
                  className="px-5 py-3 rounded-xl border text-xs uppercase tracking-widest font-black
                    font-mono transition-all duration-200 hover:scale-105"
                  style={{ borderColor: corHex + '35', color: corHex, background: corHex + '0c' }}>
                  Todas as seções
                </Link>

                {podeProx ? (
                  <Link to={`${base}/${idx + 1}`}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20
                      text-sm font-black text-white/70 hover:border-white/40 hover:text-white
                      transition-all duration-200 font-mono uppercase tracking-wider">
                    Próxima <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <span className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.07]
                    text-sm font-black text-white/20 cursor-not-allowed select-none font-mono uppercase tracking-wider">
                    Próxima <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </div>

            </motion.div>
          </AnimatePresence>
        )}

      </main>
      <Footer />
    </div>
  );
}
