import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, ChevronRight, BookOpenText, Eye, EyeOff, CheckCircle2, Circle, PenLine,
  HelpCircle, Map as MapIcon, CornerDownRight, ArrowRight, NotebookPen, Users, Info, Sparkles,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { R, BASE_SCRUTON, CAPITULOS } from '../data/scrutonConservador';
import { LEITURAS_SCRUTON } from '../data/scrutonLeituras';
import type { LeituraGuiada, PaginaGuiada } from '../data/leituraGuiadaTipos';

// Cores por bloco temático (quadro-resumo do capítulo)
const CORES = ['#34d399', '#f87171', '#fbbf24', '#60a5fa', '#f472b6', '#fb923c', '#818cf8', '#2dd4bf', '#e879f9'];
const montarBlocos = (D: LeituraGuiada) =>
  D.quadro.map((q, i) => {
    const [a, b] = q.pars.replace('§', '').split('–').map(Number);
    return { ...q, de: a, ate: b ?? a, cor: CORES[i % CORES.length] };
  });

// ── estado salvo no navegador (opcional) ──
interface Salvo { lidas: string[]; respostas: Record<string, string> }
function carregar(store: string): Salvo {
  try {
    const s = localStorage.getItem(store);
    if (s) return JSON.parse(s);
  } catch { /* sem armazenamento */ }
  return { lidas: [], respostas: {} };
}

const irPara = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/** Converte "§1–2", "§6 e nota 2" em chips clicáveis. */
function RefChips({ texto, cor }: { texto: string; cor: string }) {
  const nums = useMemo(() => {
    const out: number[] = [];
    for (const m of texto.matchAll(/§(\d+)(?:–(\d+))?/g)) {
      const a = Number(m[1]), b = m[2] ? Number(m[2]) : a;
      for (let i = a; i <= b; i++) out.push(i);
    }
    return out;
  }, [texto]);
  return (
    <span className="inline-flex flex-wrap gap-1.5 align-middle">
      {nums.map(n => (
        <button
          key={n}
          onClick={() => irPara(`par-${n}`)}
          className="px-2 py-0.5 rounded-md text-[14px] font-black border hover:brightness-125 transition"
          style={{ color: cor, borderColor: cor + '55', background: cor + '14' }}
          title={`Ir para o §${n}`}
        >
          §{n}
        </button>
      ))}
      {/nota/.test(texto) && <span className="px-2 py-0.5 rounded-md text-[14px] font-black text-white/60 border border-white/15">{texto.split(' e ').pop()}</span>}
    </span>
  );
}

function PerguntaPagina({
  id, pergunta, resposta, refTxt, cor, rascunho, onRascunho,
}: {
  id: string; pergunta: string; resposta: string | readonly string[]; refTxt: string; cor: string;
  rascunho: string; onRascunho: (v: string) => void;
}) {
  const [ver, setVer] = useState(false);
  return (
    <div className="rounded-3xl border p-5 sm:p-7" style={{ borderColor: cor + '45', background: `linear-gradient(135deg, ${cor}14, transparent 70%)` }}>
      <p className="flex items-center gap-2 text-[14px] font-black uppercase tracking-widest mb-3" style={{ color: cor }}>
        <HelpCircle className="w-4 h-4" /> Pergunta {id === 'notas' ? 'das notas' : 'da página'}
      </p>
      <p className="font-display font-black text-xl sm:text-[28px] text-white leading-snug mb-5">{pergunta}</p>

      <label className="flex items-center gap-2 text-[14px] font-bold text-white/55 mb-2">
        <PenLine className="w-4 h-4" /> Tente responder com suas palavras
      </label>
      <textarea
        value={rascunho}
        onChange={e => onRascunho(e.target.value)}
        rows={3}
        placeholder="Escreva aqui sua resposta antes de conferir…"
        className="w-full rounded-2xl bg-black/30 border border-white/15 focus:border-white/35 outline-none p-4 text-white/90 text-[18px] leading-relaxed placeholder:text-white/30 resize-y"
      />

      <button
        onClick={() => setVer(v => !v)}
        className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-[14px] uppercase tracking-widest text-slate-950 transition-all hover:-translate-y-0.5"
        style={{ background: cor }}
      >
        {ver ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        {ver ? 'Esconder resposta' : 'Conferir resposta'}
      </button>

      <AnimatePresence initial={false}>
        {ver && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="mt-5 rounded-2xl p-5 border border-emerald-400/30 bg-emerald-500/[0.07]">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[14px] font-black uppercase tracking-widest text-emerald-300">Resposta</span>
                <span className="text-white/40 text-[14px]">apoiada em</span>
                <RefChips texto={refTxt} cor="#6ee7b7" />
              </div>
              {typeof resposta === 'string' ? (
                <p className="text-white/90 text-[18px] sm:text-xl leading-relaxed"><R t={resposta} cor="#6ee7b7" /></p>
              ) : (
                <ol className="flex flex-col gap-2">
                  {resposta.map((r, i) => <li key={i} className="text-white/90 text-[18px] sm:text-xl leading-relaxed">{r}</li>)}
                </ol>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Rota: /biblioteca/livros/como-ser-um-conservador/:capSlug/paragrafos */
export default function LeituraGuiadaParagrafosPage() {
  const { capSlug = '' } = useParams();
  const reg = LEITURAS_SCRUTON[capSlug];
  const cap = CAPITULOS.find(c => c.slug === capSlug);
  if (!reg || !cap) return <Navigate to="/biblioteca/leitura-guiada" replace />;
  const rotulo = cap.n === 'Pref.' ? 'Prefácio' : `Capítulo ${cap.n}`;
  return (
    <Leitura
      key={capSlug}
      D={reg.dados}
      store={reg.store}
      capUrl={`${BASE_SCRUTON}/${capSlug}`}
      rotulo={rotulo}
      titulo={cap.titulo}
    />
  );
}

function Leitura({ D, store, capUrl, rotulo, titulo }: { D: LeituraGuiada; store: string; capUrl: string; rotulo: string; titulo: string }) {
  const BLOCOS = useMemo(() => montarBlocos(D), [D]);
  const corDoParagrafo = (n: number) => BLOCOS.find(b => n >= b.de && n <= b.ate)?.cor ?? '#3b82f6';
  const corDaPagina = (pg: PaginaGuiada) => {
    const primeiro = pg.paragrafos.find(p => !p.cont) ?? pg.paragrafos[0];
    return corDoParagrafo(primeiro.n);
  };
  const [salvo, setSalvo] = useState<Salvo>(() => carregar(store));
  const [atual, setAtual] = useState(D.paginas[0].pagina);
  const [verFinal, setVerFinal] = useState(false);
  const { scrollYProgress } = useScroll();
  const barra = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    try { localStorage.setItem(store, JSON.stringify(salvo)); } catch { /* ignora */ }
  }, [salvo, store]);

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  // página visível no momento
  useEffect(() => {
    const obs = new IntersectionObserver(
      ents => ents.forEach(e => e.isIntersecting && setAtual(e.target.getAttribute('data-pg') || '')),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    document.querySelectorAll('[data-pg]').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const toggleLida = (pg: string) =>
    setSalvo(s => ({ ...s, lidas: s.lidas.includes(pg) ? s.lidas.filter(x => x !== pg) : [...s.lidas, pg] }));
  const setResp = (id: string, v: string) => setSalvo(s => ({ ...s, respostas: { ...s.respostas, [id]: v } }));

  const totalPaginas = D.paginas.length;
  const lidas = salvo.lidas.filter(p => D.paginas.some(x => x.pagina === p)).length;
  const pct = Math.round((lidas / totalPaginas) * 100);

  return (
    <div className="min-h-screen relative bg-bg-deep">
      <Navbar />

      {/* barra de progresso da leitura */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 z-[60] origin-left" style={{ scaleX: barra, background: 'linear-gradient(90deg,#34d399,#60a5fa,#e879f9)' }} />

      {/* ════ HERO ════ */}
      <section className="relative pt-24 sm:pt-32 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="pointer-events-none absolute -top-40 -right-20 w-[520px] h-[520px] rounded-full blur-3xl opacity-20 bg-emerald-500" />
        <div className="pointer-events-none absolute -top-20 -left-40 w-[420px] h-[420px] rounded-full blur-3xl opacity-15 bg-fuchsia-500" />
        <div className="max-w-5xl mx-auto relative">
          <div className="flex flex-wrap items-center gap-2 mb-10 text-[14px] font-black uppercase tracking-widest">
            <Link to={BASE_SCRUTON} className="text-white/50 hover:text-brand-blue transition-colors">Como Ser um Conservador</Link>
            <ChevronRight className="w-3 h-3 text-white/30" />
            <Link to={capUrl} className="text-white/50 hover:text-brand-blue transition-colors">{rotulo}</Link>
            <ChevronRight className="w-3 h-3 text-white/30" />
            <span className="text-white/75">Parágrafo por parágrafo</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <p className="flex items-center gap-2 text-[16px] font-black uppercase tracking-[0.3em] text-emerald-300 mb-3">
                <BookOpenText className="w-4 h-4" /> Leitura guiada
              </p>
              <h1 className="font-display font-black text-4xl sm:text-6xl text-white leading-[1.05] mb-3">
                {titulo}<span className="text-white/35">,</span><br />
                <span className="bg-gradient-to-r from-emerald-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">parágrafo por parágrafo</span>
              </h1>
              <p className="text-white/65 text-lg">{rotulo} · Roger Scruton · <em>Como Ser um Conservador</em></p>
              <div className="flex flex-wrap gap-3 mt-6">
                {[
                  { n: totalPaginas, l: 'páginas' },
                  { n: D.totalParagrafos, l: 'parágrafos' },
                  { n: totalPaginas + 1, l: 'perguntas' },
                ].map(s => (
                  <div key={s.l} className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10">
                    <span className="font-display font-black text-2xl text-white">{s.n}</span>
                    <span className="ml-2 text-[14px] font-bold uppercase tracking-widest text-white/55">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* anel de progresso */}
            <div className="flex items-center gap-4 rounded-3xl p-5 border border-white/10 bg-white/[0.03]">
              <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={`${(pct / 100) * 97.4} 97.4`} style={{ transition: 'stroke-dasharray .5s' }} />
              </svg>
              <div>
                <p className="font-display font-black text-3xl text-white">{pct}%</p>
                <p className="text-white/60 text-[16px]">{lidas} de {totalPaginas} páginas lidas</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto flex flex-col gap-14 [&_p]:[text-align:inherit] text-left">

          {/* ════ OBSERVAÇÃO INICIAL ════ */}
          {D.observacaoInicial && (
            <section className="rounded-3xl p-6 sm:p-7 border border-violet-400/30 bg-violet-500/[0.07] flex gap-4">
              <Info className="w-6 h-6 text-violet-300 shrink-0 mt-1" />
              <div>
                <p className="text-[14px] font-black uppercase tracking-widest text-violet-300 mb-2">{D.observacaoInicial.titulo}</p>
                <p className="text-white/85 text-[18px] sm:text-xl leading-relaxed"><R t={D.observacaoInicial.texto} cor="#c4b5fd" /></p>
              </div>
            </section>
          )}

          {/* ════ COMO USAR ════ */}
          <section>
            <p className="flex items-center gap-2 text-[14px] font-black uppercase tracking-widest text-sky-300 mb-4">
              <Info className="w-4 h-4" /> Como usar
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {D.passos.map((p, i) => (
                <div key={i} className="relative rounded-2xl p-5 border border-white/10 bg-white/[0.03] overflow-hidden">
                  <span className="absolute -right-2 -top-4 font-display font-black text-7xl text-white/[0.05]">{i + 1}</span>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center font-black text-slate-950 bg-sky-300 mb-3">{i + 1}</span>
                  <p className="text-white/85 text-[18px] leading-snug">{p}</p>
                </div>
              ))}
            </div>
            <ul className="mt-4 flex flex-col gap-1.5">
              {D.observacoes.map((o, i) => (
                <li key={i} className="flex gap-2 text-white/70 text-[17px] leading-relaxed">
                  <span className="text-sky-300">•</span>{o}
                </li>
              ))}
            </ul>
          </section>

          {/* ════ MAPA ════ */}
          <section>
            <p className="flex items-center gap-2 text-[14px] font-black uppercase tracking-widest text-amber-300 mb-4">
              <MapIcon className="w-4 h-4" /> Mapa do capítulo · toque para ir ao trecho
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {BLOCOS.map(b => (
                <button
                  key={b.pars}
                  onClick={() => irPara(`par-${b.de}`)}
                  className="group text-left rounded-2xl p-4 border bg-white/[0.02] hover:bg-white/[0.06] hover:-translate-y-0.5 transition-all"
                  style={{ borderColor: b.cor + '45' }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[14px] font-black uppercase tracking-widest" style={{ color: b.cor }}>{b.pars} · {b.pags}</span>
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="font-display font-black text-white text-[18px] leading-snug">{b.tema}</p>
                </button>
              ))}
            </div>
          </section>

          {/* ════ NAVEGAÇÃO FIXA ════ */}
          <div className="sticky top-16 sm:top-20 z-40 -mx-4 sm:mx-0 px-4 sm:px-3 py-3 sm:rounded-2xl bg-slate-950/85 backdrop-blur-md border-y sm:border border-white/10">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="shrink-0 text-[14px] font-black uppercase tracking-widest text-white/45 mr-1">Página</span>
              {D.paginas.map(p => {
                const on = atual === p.pagina;
                const lida = salvo.lidas.includes(p.pagina);
                const c = corDaPagina(p);
                return (
                  <button
                    key={p.pagina}
                    onClick={() => irPara(`pg-${p.pagina}`)}
                    className="relative shrink-0 w-11 h-10 rounded-xl text-[16px] font-black border transition-all"
                    style={on ? { background: c, color: '#020617', borderColor: c } : { color: lida ? c : 'rgba(255,255,255,.7)', borderColor: lida ? c + '70' : 'rgba(255,255,255,.12)' }}
                  >
                    {p.pagina}
                    {lida && !on && <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-950" style={{ background: c }} />}
                  </button>
                );
              })}
              <button
                onClick={() => irPara('pg-notas')}
                className={`shrink-0 px-3 h-10 rounded-xl text-[14px] font-black uppercase tracking-wider border transition-all ${atual === 'notas' ? 'bg-white text-slate-950 border-white' : 'text-white/70 border-white/15'}`}
              >
                Notas
              </button>
            </div>
          </div>

          {/* ════ PÁGINAS ════ */}
          {D.paginas.map(pg => {
            const cor = corDaPagina(pg);
            const lida = salvo.lidas.includes(pg.pagina);
            return (
              <section key={pg.pagina} id={`pg-${pg.pagina}`} data-pg={pg.pagina} className="scroll-mt-40">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.4 }}>
                  {/* cabeçalho da página */}
                  <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
                    <div className="flex items-end gap-4">
                      <span className="font-display font-black text-6xl sm:text-7xl leading-none" style={{ color: cor }}>{pg.pagina}</span>
                      <div className="pb-1">
                        <p className="text-[14px] font-black uppercase tracking-widest text-white/45">Página do PDF</p>
                        <p className="text-white/80 text-[17px] font-semibold">
                          {pg.paragrafos.filter(p => !p.cont).map(p => `§${p.n}`).join(' · ') || 'continuação'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleLida(pg.pagina)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-[14px] font-black uppercase tracking-widest transition-all"
                      style={lida ? { color: '#020617', background: cor, borderColor: cor } : { color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)' }}
                    >
                      {lida ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                      {lida ? 'Página lida' : 'Marcar como lida'}
                    </button>
                  </div>

                  {/* resumo da página */}
                  <div className="rounded-3xl p-6 sm:p-7 mb-6 border-l-4 bg-white/[0.04]" style={{ borderColor: cor }}>
                    <p className="text-[14px] font-black uppercase tracking-widest mb-2" style={{ color: cor }}>Resumo da página</p>
                    <p className="text-white text-lg sm:text-2xl leading-relaxed font-medium"><R t={pg.resumo} cor={cor} /></p>
                  </div>

                  {/* parágrafos */}
                  <div className="relative flex flex-col gap-3 mb-6 sm:pl-6">
                    <div className="hidden sm:block absolute left-0 top-3 bottom-3 w-px bg-white/10" />
                    {pg.paragrafos.map(p => {
                      const c = corDoParagrafo(p.n);
                      return (
                        <div
                          key={`${p.n}-${p.cont}`}
                          id={p.cont ? undefined : `par-${p.n}`}
                          className={`relative scroll-mt-40 rounded-2xl p-5 sm:p-6 border transition-colors ${p.cont ? 'border-dashed border-white/15 bg-transparent' : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.05]'}`}
                        >
                          <span className="hidden sm:block absolute -left-[29px] top-7 w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="px-2.5 py-1 rounded-lg font-display font-black text-[16px]" style={{ color: c, background: c + '1c', border: `1px solid ${c}45` }}>
                              §{p.n}
                            </span>
                            <span className="text-[14px] font-bold uppercase tracking-widest text-white/45">{p.pags}</span>
                            {p.cont && (
                              <span className="inline-flex items-center gap-1 text-[14px] font-bold text-white/55">
                                <CornerDownRight className="w-3.5 h-3.5" /> continuação
                              </span>
                            )}
                            {p.continua && (
                              <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[14px] font-bold text-white/70 bg-white/[0.06] border border-white/10">
                                continua na p. {p.continua} <ArrowRight className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                          {p.titulo && <h3 className="font-display font-black text-xl sm:text-[28px] text-white leading-snug mb-2">{p.titulo}</h3>}
                          <p className={`text-[18px] sm:text-xl leading-[1.8] ${p.cont ? 'text-white/75' : 'text-white/85'}`}><R t={p.texto} cor={c} /></p>
                        </div>
                      );
                    })}
                  </div>

                  <PerguntaPagina
                    id={pg.pagina}
                    pergunta={pg.pergunta}
                    resposta={pg.resposta}
                    refTxt={pg.respostaRef}
                    cor={cor}
                    rascunho={salvo.respostas[pg.pagina] ?? ''}
                    onRascunho={v => setResp(pg.pagina, v)}
                  />
                </motion.div>
              </section>
            );
          })}

          {/* ════ NOTAS ════ */}
          <section id="pg-notas" data-pg="notas" className="scroll-mt-40">
            <div className="flex items-end gap-4 mb-5">
              <span className="font-display font-black text-5xl sm:text-6xl leading-none text-white/80">{D.notas.paginas}</span>
              <div className="pb-1">
                <p className="text-[14px] font-black uppercase tracking-widest text-white/45">{D.notas.paginas.includes('–') ? 'Páginas do PDF' : 'Página do PDF'}</p>
                <p className="text-white/80 text-[17px] font-semibold">Notas</p>
              </div>
            </div>
            <div className="rounded-3xl p-6 mb-6 border-l-4 border-white/40 bg-white/[0.04]">
              <p className="text-white text-lg sm:text-2xl">{D.notas.resumo}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
              {[
                { titulo: 'Notas do tradutor', sub: D.notas.tradutorPags, itens: D.notas.tradutor, cor: '#60a5fa', icon: NotebookPen },
                { titulo: 'Notas do autor', sub: D.notas.autorPags, itens: D.notas.autor, cor: '#f472b6', icon: Users },
              ].filter(g => g.itens.length > 0).map(g => (
                <div key={g.titulo} className="rounded-3xl p-5 sm:p-6 border border-white/10 bg-white/[0.03]">
                  <p className="flex items-center gap-2 font-display font-black text-xl text-white mb-1">
                    <g.icon className="w-5 h-5" style={{ color: g.cor }} /> {g.titulo}
                  </p>
                  {g.sub ? <p className="text-[14px] font-bold uppercase tracking-widest text-white/45 mb-4">{g.sub}</p> : <div className="mb-3" />}
                  <ul className="flex flex-col gap-2.5">
                    {g.itens.map(n => (
                      <li key={n.id} className="flex gap-3 items-start">
                        <span className="w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-[14px] font-black" style={{ color: g.cor, background: g.cor + '1a', border: `1px solid ${g.cor}45` }}>{n.id}</span>
                        <div className="flex-1 text-white/85 text-[17px] sm:text-[19px] leading-snug">
                          <button onClick={() => irPara(`par-${n.ref.slice(1)}`)} className="mr-2 text-[14px] font-black hover:underline" style={{ color: g.cor }}>{n.ref}</button>
                          {n.texto}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <PerguntaPagina
              id="notas"
              pergunta={D.notas.pergunta}
              resposta={D.notas.resposta}
              refTxt={D.notas.respostaRef}
              cor="#e2e8f0"
              rascunho={salvo.respostas.notas ?? ''}
              onRascunho={v => setResp('notas', v)}
            />
          </section>

          {/* ════ CONCEITOS-CHAVE ════ */}
          {D.conceitos && (
            <section>
              <p className="text-[14px] font-black uppercase tracking-widest text-sky-300 mb-4">Conceitos-chave · {rotulo}</p>
              <div className="flex flex-wrap gap-2.5">
                {D.conceitos.map((c, i) => (
                  <span
                    key={c}
                    className="px-4 py-2 rounded-full text-[17px] font-semibold text-white/90 border"
                    style={{ borderColor: CORES[i % CORES.length] + '55', background: CORES[i % CORES.length] + '14' }}
                  >
                    {c.replace(/"/g, '')}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* ════ PERGUNTA FINAL ════ */}
          <section className="relative overflow-hidden rounded-3xl p-6 sm:p-10 border border-amber-400/35 bg-gradient-to-br from-amber-500/15 via-fuchsia-500/[0.06] to-transparent">
            <Sparkles className="absolute top-5 right-5 w-10 h-10 text-amber-300/30" />
            <p className="text-[14px] font-black uppercase tracking-[0.3em] text-amber-300 mb-3">Pergunta final · discussão em grupo</p>
            <p className="font-display font-black text-2xl sm:text-3xl text-white leading-snug mb-6">{D.final.pergunta}</p>
            <button
              onClick={() => setVerFinal(v => !v)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-[14px] uppercase tracking-widest text-slate-950 bg-amber-300 hover:-translate-y-0.5 transition-all"
            >
              {verFinal ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {verFinal ? 'Esconder sugestões' : 'Ver sugestão de resposta'}
            </button>
            <AnimatePresence initial={false}>
              {verFinal && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  {D.final.sugestao.length === 1 ? (
                    <div className="mt-6 rounded-2xl p-5 sm:p-6 border border-white/10 bg-black/20">
                      <p className="text-white/90 text-[18px] sm:text-xl leading-relaxed"><R t={D.final.sugestao[0]} cor="#fcd34d" /></p>
                    </div>
                  ) : (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {D.final.sugestao.map((s, i) => {
                      const [exp, lic] = s.split(/:\s(.+)/);
                      return (
                        <div key={i} className="rounded-2xl p-4 border border-white/10 bg-black/20">
                          <p className="font-display font-black text-white text-[18px] mb-1" style={{ color: CORES[(i + 1) % CORES.length] }}>{exp}</p>
                          <p className="text-white/85 text-[18px] leading-snug">{lic}</p>
                        </div>
                      );
                    })}
                  </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <Link to={capUrl} className="inline-flex items-center gap-2 text-white/65 hover:text-white text-sm font-black uppercase tracking-widest transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao estudo: {rotulo}
            </Link>
            <p className="text-white/40 text-sm">{D.referencia}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
