import { useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, ChevronRight, BookOpenText, Lock, ArrowRight, Compass, ListChecks, PenLine, CheckCircle2,
  ShoppingCart, ExternalLink, Eye, Brain, Target, PlayCircle, Sparkles, Library, Play, Youtube, type LucideIcon,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PARTES, BASE_SCRUTON, AMAZON, capSlug } from '../data/scrutonConservador';
import { LEITURAS_SCRUTON, rotaLeitura } from '../data/scrutonLeituras';

/**
 * Vídeo do YouTube explicando a Leitura Guiada.
 * Cole aqui o link (ex.: 'https://www.youtube.com/watch?v=XXXXXXXXXXX').
 * Enquanto estiver vazio, o botão aparece como "Vídeo em breve".
 * (Vídeo de exemplo; troque pelo vídeo definitivo quando estiver pronto.)
 */
const VIDEO_YOUTUBE = 'https://www.youtube.com/watch?v=cjLoSgCJF6Y';

/** Extrai o ID de links youtube.com/watch?v=, youtu.be/ ou /embed/. */
const idYoutube = (url: string) =>
  url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/)?.[1] ?? '';

/** Vídeo embutido (player do YouTube), com link para abrir no YouTube. */
function VideoEmbutido() {
  const id = idYoutube(VIDEO_YOUTUBE);
  if (!id) return <CartaoVideo />;
  return (
    <div>
      <div className="relative w-full overflow-hidden rounded-2xl ring-1 ring-white/15 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.55)]" style={{ aspectRatio: '16 / 9' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
          title="Como funciona a Leitura Guiada"
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="font-display font-black text-white text-[17px] leading-snug">Como funciona a Leitura Guiada</p>
        <a
          href={VIDEO_YOUTUBE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] font-black uppercase tracking-widest text-red-300 hover:text-red-200 transition-colors"
        >
          <Youtube className="w-4 h-4" /> Abrir no YouTube <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

/** Botão/cartão do vídeo explicativo. */
function CartaoVideo({ compacto = false }: { compacto?: boolean } = {}) {
  const pronto = VIDEO_YOUTUBE.trim().length > 0;
  const conteudo = (
    <>
      <span className="relative shrink-0">
        {pronto && <span className="absolute inset-0 rounded-full bg-red-500/60 animate-ping" />}
        <span
          className={`relative flex items-center justify-center rounded-full ${compacto ? 'w-11 h-11' : 'w-14 h-14'} ${pronto ? 'bg-red-600 shadow-[0_0_30px_rgba(239,68,68,0.55)]' : 'bg-white/10'}`}
        >
          <Play className={`${compacto ? 'w-5 h-5' : 'w-6 h-6'} ml-0.5 ${pronto ? 'text-white fill-white' : 'text-white/40'}`} />
        </span>
      </span>
      <span className="flex-1 min-w-0">
        <span className={`block text-[12px] font-black uppercase tracking-widest ${pronto ? 'text-red-300' : 'text-white/40'}`}>
          <Youtube className="inline w-3.5 h-3.5 -mt-0.5 mr-1" />
          {pronto ? 'Assista no YouTube' : 'Vídeo em breve'}
        </span>
        <span className={`block font-display font-black leading-snug ${compacto ? 'text-[16px]' : 'text-lg sm:text-xl'} ${pronto ? 'text-white' : 'text-white/50'}`}>
          Como funciona a Leitura Guiada
        </span>
        {!compacto && (
          <span className="block text-white/60 text-[15px] leading-snug mt-0.5">
            Uma explicação geral, passo a passo, de como estudar com esta ferramenta.
          </span>
        )}
      </span>
      {pronto && <ExternalLink className="w-4 h-4 shrink-0 text-white/50 group-hover:text-white transition-colors" />}
    </>
  );
  const cls = `group flex items-center gap-4 rounded-2xl border transition-all ${compacto ? 'p-3.5' : 'p-4 sm:p-5'} ${
    pronto
      ? 'border-red-500/40 bg-gradient-to-r from-red-600/15 via-slate-950/60 to-slate-950/60 hover:border-red-400/70 hover:-translate-y-0.5'
      : 'border-white/10 bg-white/[0.03] cursor-default'
  }`;
  return pronto ? (
    <a href={VIDEO_YOUTUBE} target="_blank" rel="noopener noreferrer" className={cls}>{conteudo}</a>
  ) : (
    <div className={cls} aria-disabled>{conteudo}</div>
  );
}

/* ─── dados derivados do registro de leituras ─────────────────────────────── */

interface CapInfo {
  slug: string;
  rotulo: string;
  titulo: string;
  cor: string;
  rota?: string;
  paginas: number;
  paragrafos: number;
  perguntas: number;
  lidas: number;
}

function lidasDe(store: string, total: number) {
  try {
    const s = JSON.parse(localStorage.getItem(store) || '{}');
    return Math.min(total, (s.lidas ?? []).length);
  } catch {
    return 0;
  }
}

function montarPartes() {
  return PARTES.map(p => ({
    titulo: p.titulo,
    cor: p.cor,
    caps: p.caps.map<CapInfo>(c => {
      const slug = capSlug(c.n);
      const reg = LEITURAS_SCRUTON[slug];
      const paginas = reg?.dados.paginas.length ?? 0;
      return {
        slug,
        rotulo: c.n === 'Pref.' ? 'Prefácio' : `Capítulo ${c.n}`,
        titulo: c.titulo,
        cor: p.cor,
        rota: reg ? rotaLeitura(slug) : undefined,
        paginas,
        paragrafos: reg?.dados.totalParagrafos ?? 0,
        perguntas: reg ? paginas + 1 : 0,
        lidas: reg ? lidasDe(reg.store, paginas) : 0,
      };
    }),
  }));
}

const PASSOS: { icon: LucideIcon; cor: string; t: string; d: string }[] = [
  { icon: BookOpenText, cor: '#38bdf8', t: 'Leia a página', d: 'No livro ou no PDF, com calma.' },
  { icon: ListChecks, cor: '#34d399', t: 'Acompanhe os §', d: 'O resumo de cada parágrafo, com os pontos-chave em cores.' },
  { icon: PenLine, cor: '#fbbf24', t: 'Responda', d: 'A pergunta da página, com suas próprias palavras.' },
  { icon: CheckCircle2, cor: '#e879f9', t: 'Confira e avance', d: 'Veja a resposta e marque a página como lida.' },
];

const PORQUE: { icon: LucideIcon; cor: string; t: string; d: string }[] = [
  { icon: Eye, cor: '#38bdf8', t: 'Leitura atenta', d: 'Você não pula etapas: cada parágrafo tem seu resumo e seu lugar no argumento.' },
  { icon: Brain, cor: '#a78bfa', t: 'Compreensão ativa', d: 'Responder antes de conferir fixa o conteúdo muito mais do que só ler.' },
  { icon: Target, cor: '#34d399', t: 'Visão do todo', d: 'Mapas, cores e conceitos-chave mostram como as partes se encaixam.' },
];

/* ─── componentes ─────────────────────────────────────────────────────────── */

function Anel({ pct, cor, size = 88 }: { pct: number; cor: string; size?: number }) {
  return (
    <svg viewBox="0 0 36 36" style={{ width: size, height: size }} className="-rotate-90 shrink-0">
      <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
      <circle
        cx="18" cy="18" r="15.5" fill="none" stroke={cor} strokeWidth="3" strokeLinecap="round"
        strokeDasharray={`${(pct / 100) * 97.4} 97.4`} style={{ transition: 'stroke-dasharray .6s' }}
      />
    </svg>
  );
}

function CardCapitulo({ c, i }: { c: CapInfo; i: number }) {
  const pct = c.paginas ? Math.round((c.lidas / c.paginas) * 100) : 0;
  const concluido = c.paginas > 0 && c.lidas === c.paginas;

  if (!c.rota) {
    return (
      <div className="relative rounded-2xl p-4 border border-white/[0.07] bg-white/[0.015]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[12px] font-black uppercase tracking-widest text-white/35">{c.rotulo}</span>
          <span className="ml-auto inline-flex items-center gap-1 text-[12px] font-bold text-white/30"><Lock className="w-3 h-3" /> em breve</span>
        </div>
        <p className="font-display font-black text-[16px] leading-snug text-white/40">{c.titulo}</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
      <Link
        to={c.rota}
        className="group relative block h-full overflow-hidden rounded-2xl p-4 sm:p-5 border hover:-translate-y-1 transition-all duration-300"
        style={{ borderColor: c.cor + '60', background: `linear-gradient(150deg, ${c.cor}24, rgba(2,6,23,0.6) 65%)`, boxShadow: `0 10px 30px ${c.cor}14` }}
      >
        <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity" style={{ background: c.cor + '60' }} />
        <div className="relative flex items-center gap-2 mb-1.5">
          <span className="text-[12px] font-black uppercase tracking-widest" style={{ color: c.cor }}>{c.rotulo}</span>
          {concluido ? (
            <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider text-slate-950" style={{ background: c.cor }}>
              <CheckCircle2 className="w-3 h-3" /> lido
            </span>
          ) : (
            <span className="ml-auto inline-flex items-center gap-1 text-[12px] font-black uppercase tracking-wider text-white/70 group-hover:text-white">
              {c.lidas ? 'continuar' : 'abrir'} <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          )}
        </div>
        <p className="relative font-display font-black text-[18px] leading-snug text-white mb-3">{c.titulo}</p>
        <div className="relative flex flex-wrap gap-1.5 mb-3">
          {[`${c.paginas} pp.`, `${c.paragrafos} §`, `${c.perguntas} perguntas`].map(t => (
            <span key={t} className="px-2 py-0.5 rounded-md text-[12px] font-bold text-white/80 bg-black/25 border border-white/10">{t}</span>
          ))}
        </div>
        <div className="relative h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: c.cor }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
        <p className="relative mt-1.5 text-[12px] font-bold text-white/55">{c.lidas} de {c.paginas} páginas lidas</p>
      </Link>
    </motion.div>
  );
}


/* ─── livros com leitura guiada ───────────────────────────────────────────── */
// Para adicionar um livro: inclua uma entrada aqui (e os dados das leituras).

interface LivroGuiado {
  slug: string;
  titulo: string;
  autor: string;
  capa: string;
  area: string;
  cor: string;
  chamada: string;
}

const LIVROS_GUIADOS: LivroGuiado[] = [
  {
    slug: 'como-ser-um-conservador',
    titulo: 'Como Ser um Conservador',
    autor: 'Roger Scruton',
    capa: '/livros/como-ser-um-conservador.jpg',
    area: 'Política & Conservadorismo',
    cor: '#38bdf8',
    chamada: 'O que é ser conservador? As coisas admiráveis são fáceis de destruir e difíceis de criar.',
  },
];

const BASE_LG = '/biblioteca/leitura-guiada';

/** Resumo de progresso de um livro (hoje só há o de Scruton). */
function resumoLivro() {
  const partes = montarPartes();
  const todos = partes.flatMap(p => p.caps);
  const disponiveis = todos.filter(c => c.rota);
  const totalPaginas = disponiveis.reduce((a, c) => a + c.paginas, 0);
  const totalLidas = disponiveis.reduce((a, c) => a + c.lidas, 0);
  return {
    partes, todos, disponiveis, totalPaginas, totalLidas,
    totalParagrafos: disponiveis.reduce((a, c) => a + c.paragrafos, 0),
    totalPerguntas: disponiveis.reduce((a, c) => a + c.perguntas, 0),
    pct: totalPaginas ? Math.round((totalLidas / totalPaginas) * 100) : 0,
    proximo: disponiveis.find(c => c.lidas < c.paginas) ?? disponiveis[0],
    comecou: totalLidas > 0,
  };
}

function Fundo() {
  return (
    <>
      <div className="pointer-events-none absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-[0.13] bg-emerald-400" />
      <div className="pointer-events-none absolute top-40 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-[0.10] bg-fuchsia-500" />
      <div className="pointer-events-none absolute top-[1100px] left-1/4 w-[480px] h-[480px] rounded-full blur-3xl opacity-[0.08] bg-sky-400" />
    </>
  );
}

/** Card do livro na lista: ao clicar abre a página do livro com páginas e trilhas. */
function CardLivroGuiado({ livro, i }: { livro: LivroGuiado; i: number }) {
  const r = useMemo(resumoLivro, []);
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
      <Link
        to={`${BASE_LG}/${livro.slug}`}
        className="group relative flex gap-5 h-full overflow-hidden rounded-3xl p-5 sm:p-6 border hover:-translate-y-1 transition-all duration-300"
        style={{ borderColor: livro.cor + '45', background: `linear-gradient(150deg, ${livro.cor}1f, rgba(2,6,23,0.65) 60%)`, boxShadow: `0 14px 40px ${livro.cor}12` }}
      >
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-sky-400 via-emerald-400 to-fuchsia-400 opacity-70 group-hover:opacity-100 transition-opacity" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" style={{ background: livro.cor }} />
        <img
          src={livro.capa}
          alt={`Capa de ${livro.titulo}`}
          className="relative w-24 sm:w-32 shrink-0 self-start rounded-xl ring-1 ring-white/20 shadow-[0_18px_40px_rgba(0,0,0,0.6)] group-hover:-rotate-2 group-hover:-translate-y-1 transition-transform duration-500"
          style={{ aspectRatio: '337/500', objectFit: 'cover' }}
        />
        <div className="relative flex flex-col min-w-0 flex-1">
          <span className="self-start px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: livro.cor, background: livro.cor + '1a', border: `1px solid ${livro.cor}45` }}>
            {livro.area}
          </span>
          <h3 className="font-display font-black text-2xl sm:text-[26px] text-white leading-tight">{livro.titulo}</h3>
          <p className="font-black uppercase tracking-wider text-[13px] mb-2" style={{ color: livro.cor }}>{livro.autor}</p>
          <p className="text-white/70 text-[15px] sm:text-[16px] leading-snug mb-4 line-clamp-3">{livro.chamada}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {[`${r.disponiveis.length} de ${r.todos.length} capítulos`, `${r.totalParagrafos} §`, `${r.totalPerguntas} perguntas`].map(t => (
              <span key={t} className="px-2 py-0.5 rounded-md text-[12px] font-bold text-white/80 bg-black/25 border border-white/10">{t}</span>
            ))}
          </div>
          <div className="mt-auto">
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-1.5">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400" style={{ width: `${r.pct}%` }} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] font-bold text-white/50">{r.totalLidas} de {r.totalPaginas} páginas lidas</span>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-black uppercase tracking-widest text-emerald-300 group-hover:gap-2.5 transition-all">
                Ver trilha <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── página: rota /biblioteca/leitura-guiada[/:livro] ────────────────────── */

export default function BibliotecaLeituraGuiadaPage() {
  const { livro } = useParams();
  if (livro) {
    const l = LIVROS_GUIADOS.find(x => x.slug === livro);
    if (!l) return <Navigate to={BASE_LG} replace />;
    return <PaginaLivroGuiado livro={l} />;
  }
  return <ListaLivrosGuiados />;
}

function ListaLivrosGuiados() {
  const totais = useMemo(() => {
    const r = resumoLivro();
    return { caps: r.disponiveis.length, par: r.totalParagrafos, perg: r.totalPerguntas };
  }, []);
  const stats = [
    { n: LIVROS_GUIADOS.length, l: LIVROS_GUIADOS.length === 1 ? 'livro' : 'livros', cor: '#38bdf8' },
    { n: totais.caps, l: 'capítulos guiados', cor: '#34d399' },
    { n: totais.par, l: 'parágrafos', cor: '#fbbf24' },
    { n: totais.perg, l: 'perguntas', cor: '#e879f9' },
  ];

  return (
    <div className="min-h-screen relative">
      <Navbar />

      <section className="relative pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <Fundo />
        <div className="relative max-w-6xl mx-auto [&_p]:[text-align:inherit] text-left">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-10 text-[13px] font-black uppercase tracking-widest text-white/60"
          >
            <Link to="/biblioteca" className="hover:text-brand-blue transition-colors">Biblioteca</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80">Leitura Guiada</span>
          </motion.div>

          {/* ════ HERO ════ */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center mb-14">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="flex items-center gap-2 text-[13px] font-black tracking-[0.35em] uppercase text-emerald-300 mb-4">
                <Compass className="w-4 h-4" /> Biblioteca
              </p>
              <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[1.02] mb-5">
                <span className="text-white">Leitura</span>{' '}
                <span className="bg-gradient-to-r from-emerald-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">Guiada</span>
              </h1>
              <p className="text-white/75 text-lg sm:text-xl leading-relaxed max-w-xl mb-7">
                Grandes livros lidos <span className="text-emerald-300 font-semibold">página por página</span> e{' '}
                <span className="text-sky-300 font-semibold">parágrafo por parágrafo</span>, com{' '}
                <span className="text-amber-300 font-semibold">perguntas de interpretação</span> e{' '}
                <span className="text-fuchsia-300 font-semibold">respostas comentadas</span>.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.l}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07 }}
                    className="rounded-2xl px-4 py-3 border bg-white/[0.03]"
                    style={{ borderColor: s.cor + '35' }}
                  >
                    <p className="font-display font-black text-3xl" style={{ color: s.cor }}>{s.n}</p>
                    <p className="text-[12px] font-bold uppercase tracking-widest text-white/55 leading-tight">{s.l}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* vídeo explicativo */}
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
              <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-red-500/50 via-sky-400/25 to-fuchsia-400/50">
                <div className="rounded-[22px] bg-slate-950/90 p-5 sm:p-6">
                  <p className="text-[13px] font-black uppercase tracking-widest text-white/55 mb-3">Antes de começar</p>
                  <VideoEmbutido />
                  <p className="mt-2 text-[14px] text-white/50 leading-snug">
                    Assista à explicação geral e depois escolha um livro abaixo para começar.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ════ COMO FUNCIONA ════ */}
          <section className="mb-16">
            <p className="text-[14px] font-black uppercase tracking-[0.25em] text-sky-300 mb-5">Como funciona</p>
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="hidden lg:block absolute top-9 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-sky-400/50 via-amber-300/50 to-fuchsia-400/50" />
              {PASSOS.map((p, i) => (
                <motion.div
                  key={p.t}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="relative flex lg:flex-col items-center lg:text-center gap-4 rounded-2xl p-5 border border-white/10 bg-slate-950/60"
                >
                  <span
                    className="relative w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center"
                    style={{ background: p.cor + '22', border: `1px solid ${p.cor}60`, boxShadow: `0 0 22px ${p.cor}35` }}
                  >
                    <p.icon className="w-6 h-6" style={{ color: p.cor }} />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-[12px] font-black flex items-center justify-center text-slate-950" style={{ background: p.cor }}>{i + 1}</span>
                  </span>
                  <div>
                    <p className="font-display font-black text-lg text-white leading-tight mb-1">{p.t}</p>
                    <p className="text-white/65 text-[15px] leading-snug">{p.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ════ LIVROS DISPONÍVEIS ════ */}
          <div className="flex items-center gap-4 mb-7">
            <div className="w-1.5 h-7 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 14px #34d39990' }} />
            <h2 className="font-display font-black text-lg sm:text-xl uppercase tracking-[0.2em] text-emerald-300">Livros disponíveis</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-emerald-400/40 to-transparent" />
          </div>
          <p className="text-white/60 text-[16px] -mt-3 mb-6">Escolha um livro para ver as páginas, o progresso e a trilha de leitura.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-16">
            {LIVROS_GUIADOS.map((l, i) => <CardLivroGuiado key={l.slug} livro={l} i={i} />)}
            <div className="flex flex-col items-center justify-center text-center rounded-3xl border border-dashed border-white/15 p-8 bg-white/[0.015] min-h-[220px]">
              <Sparkles className="w-7 h-7 mb-3 text-white/30" />
              <p className="font-display font-black text-white/70 text-lg mb-1">Novos livros em breve</p>
              <p className="text-white/45 text-[15px] max-w-xs">Outras obras para leitura guiada serão adicionadas aqui.</p>
            </div>
          </div>

          {/* ════ POR QUE LER ASSIM ════ */}
          <section className="mb-14">
            <p className="text-[14px] font-black uppercase tracking-[0.25em] text-fuchsia-300 mb-5">Por que ler assim?</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PORQUE.map(b => (
                <div key={b.t} className="relative overflow-hidden rounded-3xl p-6 border bg-white/[0.02]" style={{ borderColor: b.cor + '35' }}>
                  <div className="pointer-events-none absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl opacity-30" style={{ background: b.cor }} />
                  <b.icon className="relative w-8 h-8 mb-4" style={{ color: b.cor }} />
                  <p className="relative font-display font-black text-xl text-white mb-2">{b.t}</p>
                  <p className="relative text-white/70 text-[16px] leading-relaxed">{b.d}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12">
            <Link to="/biblioteca" className="inline-flex items-center gap-2 text-white/65 hover:text-white text-sm font-black uppercase tracking-widest transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar para a Biblioteca
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function PaginaLivroGuiado({ livro }: { livro: LivroGuiado }) {
  const { partes, todos, disponiveis, totalPaginas, totalLidas, pct, proximo, comecou } = useMemo(resumoLivro, []);
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="min-h-screen relative">
      <Navbar />

      <section className="relative pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <Fundo />
        <div className="relative max-w-6xl mx-auto [&_p]:[text-align:inherit] text-left">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center gap-2 mb-10 text-[13px] font-black uppercase tracking-widest text-white/60"
          >
            <Link to="/biblioteca" className="hover:text-brand-blue transition-colors">Biblioteca</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={BASE_LG} className="hover:text-brand-blue transition-colors">Leitura Guiada</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80">{livro.titulo}</span>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-950/80 to-black/60 mb-16"
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-sky-400 via-emerald-400 to-fuchsia-400" />
            <div className="pointer-events-none absolute -top-24 right-0 w-96 h-96 rounded-full blur-3xl opacity-15 bg-sky-500" />

            {/* cabeçalho do livro */}
            <div className="relative grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 sm:gap-8 p-6 sm:p-8 lg:p-10">
              <Link to={BASE_SCRUTON} className="group relative w-36 sm:w-44 md:w-full mx-auto md:mx-0">
                <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity bg-gradient-to-br from-sky-500 to-emerald-500" />
                <img
                  src="/livros/como-ser-um-conservador.jpg"
                  alt="Capa de Como Ser um Conservador"
                  className="relative w-full rounded-xl ring-1 ring-white/20 shadow-[0_24px_60px_rgba(0,0,0,0.65)] group-hover:-translate-y-1 group-hover:-rotate-1 transition-transform duration-500"
                  style={{ aspectRatio: '337/500', objectFit: 'cover' }}
                />
              </Link>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[12px] font-black uppercase tracking-widest text-sky-200 bg-sky-400/15 border border-sky-400/35">Política & Conservadorismo</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-black uppercase tracking-widest text-emerald-200 bg-emerald-400/15 border border-emerald-400/35">
                    <Sparkles className="w-3 h-3" /> {disponiveis.length} de {todos.length} guiados
                  </span>
                </div>
                <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.05] mb-2">Como Ser um Conservador</h1>
                <p className="font-black uppercase tracking-wider text-[15px] text-sky-300 mb-4">Roger Scruton</p>
                <p className="text-white/80 text-[17px] sm:text-lg leading-relaxed mb-2">
                  <span className="text-amber-300 font-semibold">O que é ser conservador?</span> Scruton responde que{' '}
                  <span className="px-1 rounded bg-amber-400/20 text-amber-100 font-semibold">as coisas admiráveis são fáceis de destruir e difíceis de criar</span>,
                  e mostra o que vale a pena <span className="text-emerald-300 font-semibold">preservar</span> e como.
                </p>
                <p className="text-white/45 text-[14px] mb-6">SCRUTON, Roger. Como ser um conservador. Trad. Bruno Garschagen. Rio de Janeiro: Record, 2015.</p>

                <div className="flex flex-wrap items-center gap-3">
                  {proximo && (
                    <Link
                      to={proximo.rota!}
                      className="group inline-flex items-center gap-3 px-5 py-3 rounded-xl font-black text-[14px] uppercase tracking-widest text-slate-950 bg-gradient-to-r from-emerald-400 to-sky-400 shadow-[0_10px_30px_rgba(52,211,153,0.3)] hover:-translate-y-0.5 transition-all"
                    >
                      <BookOpenText className="w-5 h-5" />
                      {comecou ? 'Continuar' : 'Começar'}: {proximo.rotulo}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                  <Link
                    to={BASE_SCRUTON}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-black text-[14px] uppercase tracking-widest text-white/85 border border-white/20 hover:border-white/40 hover:bg-white/[0.05] transition-all"
                  >
                    <Library className="w-4 h-4" /> Visão geral do livro
                  </Link>
                  <a
                    href={AMAZON}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl font-black text-[14px] uppercase tracking-widest text-amber-200 border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 hover:-translate-y-0.5 transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" /> Comprar na Amazon
                    <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                  </a>
                </div>
              </div>
            </div>

            {/* progresso neste livro */}
            {proximo && (
              <div className="relative border-t border-white/10 px-6 sm:px-8 lg:px-10 py-6">
                <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-emerald-400/60 via-sky-400/30 to-fuchsia-400/60">
                  <div className="rounded-[22px] bg-slate-950/90 p-5 sm:p-6 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 md:gap-8 items-center">
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <Anel pct={pct} cor="#34d399" size={92} />
                        <span className="absolute inset-0 flex items-center justify-center font-display font-black text-xl text-white">{pct}%</span>
                      </div>
                      <div>
                        <p className="text-[13px] font-black uppercase tracking-widest text-white/55 mb-1">
                          {comecou ? 'Seu progresso' : 'Comece agora'}
                        </p>
                        <p className="font-display font-black text-2xl text-white leading-tight">{totalLidas} de {totalPaginas}</p>
                        <p className="text-white/60 text-[15px]">páginas guiadas lidas</p>
                      </div>
                    </div>
                    <div>
                      <Link
                        to={proximo.rota!}
                        className="group flex items-center gap-4 rounded-2xl p-4 border transition-all hover:-translate-y-0.5"
                        style={{ borderColor: proximo.cor + '60', background: proximo.cor + '18' }}
                      >
                        <PlayCircle className="w-10 h-10 shrink-0" style={{ color: proximo.cor }} />
                        <div className="min-w-0 flex-1">
                          <p className="text-[12px] font-black uppercase tracking-widest" style={{ color: proximo.cor }}>
                            {comecou ? 'Continuar de onde parou' : 'Primeira leitura'}
                            {proximo.rotulo !== proximo.titulo && ` · ${proximo.rotulo}`}
                          </p>
                          <p className="font-display font-black text-lg text-white leading-snug truncate">{proximo.titulo}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </Link>
                      <p className="mt-2 text-[13px] text-white/40">O progresso fica salvo neste navegador.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* trilha de capítulos por parte */}
            <div className="relative border-t border-white/10 p-6 sm:p-8 lg:p-10 flex flex-col gap-9">
              <p className="text-[14px] font-black uppercase tracking-[0.25em] text-white/55 -mb-3">Trilha de leitura</p>
              {partes.map((p, pi) => {
                const disp = p.caps.filter(c => c.rota).length;
                return (
                  <div key={p.titulo}>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-black text-slate-950" style={{ background: p.cor }}>{['I', 'II', 'III'][pi]}</span>
                      <h4 className="font-display font-black text-lg sm:text-xl text-white">{p.titulo.replace(/^Parte [IV]+ — /, '')}</h4>
                      <span className="text-[13px] font-bold text-white/45">{disp} de {p.caps.length} guiados</span>
                      <div className="hidden sm:block flex-1 h-px" style={{ background: `linear-gradient(90deg, ${p.cor}50, transparent)` }} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {p.caps.map((c, i) => <CardCapitulo key={c.slug} c={c} i={i} />)}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.article>

          <div className="mt-2">
            <Link to={BASE_LG} className="inline-flex items-center gap-2 text-white/65 hover:text-white text-sm font-black uppercase tracking-widest transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Leitura Guiada
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
