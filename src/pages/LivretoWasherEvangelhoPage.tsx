import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, BookHeart, Quote, Sparkles, Cross, Crown, HeartHandshake,
  AlertTriangle, Sunrise, Clock, Palette, PlayCircle,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { LIVRETO_WASHER, PARTES_WASHER } from '../data/livretoWasherEvangelho';

const OURO = '#fbbf24';
const VERMELHO = '#f43f5e';

/* ─── Ênfases coloridas ─────────────────────────────────────────────────────── */
function Enfase({ t }: { t: string }) {
  const partes = t.split(/(\*\*[^*]+\*\*|==[^=]+==|!![^!]+!!|\+\+[^+]+\+\+|~~[^~]+~~|__[^_]+__|¹)/g);
  return (
    <>
      {partes.map((p, i) => {
        const m = p.slice(2, -2);
        if (p.startsWith('**')) return <strong key={i} className="font-bold text-amber-300">{m}</strong>;
        if (p.startsWith('==')) return <mark key={i} className="px-1 rounded-md bg-amber-300/20 text-amber-100 font-semibold [box-decoration-break:clone]">{m}</mark>;
        if (p.startsWith('!!')) return <span key={i} className="font-bold text-rose-300 underline decoration-rose-400/60 decoration-2 underline-offset-4">{m}</span>;
        if (p.startsWith('++')) return <span key={i} className="px-1 rounded-md font-bold text-emerald-200 bg-emerald-400/15 [box-decoration-break:clone]">{m}</span>;
        if (p.startsWith('~~')) return <span key={i} className="font-bold text-sky-300">{m}</span>;
        if (p.startsWith('__')) return <em key={i} className="font-semibold text-violet-300">{m}</em>;
        if (p === '¹') return <sup key={i} className="text-amber-300 font-black ml-0.5">1</sup>;
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

const LEGENDA_CORES = [
  { cls: 'bg-amber-300/20 text-amber-100', rot: 'Frase central' },
  { cls: 'text-amber-300', rot: 'Ideia-chave' },
  { cls: 'text-rose-300 underline decoration-rose-400/60', rot: 'O problema: pecado e culpa' },
  { cls: 'text-sky-300', rot: 'A pessoa de Cristo' },
  { cls: 'bg-emerald-400/15 text-emerald-200', rot: 'A salvação' },
  { cls: 'text-violet-300 italic', rot: 'Termo definido' },
];

/* ─── Mapa da Introdução ────────────────────────────────────────────────────── */
const MAPA = [
  { icon: AlertTriangle, cor: VERMELHO, t: 'O problema', d: 'Culpa profunda e corrupção que nenhuma solução humana resolve.' },
  { icon: Crown, cor: '#38bdf8', t: 'A pessoa', d: 'O Filho enviado por Deus: concebido pelo Espírito, nascido de uma virgem, o Deus-homem.' },
  { icon: Cross, cor: OURO, t: 'A obra', d: 'Morte em nosso lugar, que satisfaz a justiça de Deus. Ressurreição ao terceiro dia.' },
  { icon: HeartHandshake, cor: '#34d399', t: 'A resposta', d: 'Fé na pessoa e na obra de Cristo: perdão, reconciliação e vida eterna.' },
];

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45 },
};

/* ─── Capa desenhada ────────────────────────────────────────────────────────── */
function Capa() {
  const [erro, setErro] = useState(false);
  if (!erro) {
    return (
      <img
        src={LIVRETO_WASHER.capa}
        alt={`Capa do livreto ${LIVRETO_WASHER.titulo}, de ${LIVRETO_WASHER.autor}`}
        onError={() => setErro(true)}
        className="w-[130px] sm:w-[170px] lg:w-full rounded-2xl ring-1 ring-white/15 shadow-[0_30px_60px_rgba(0,0,0,0.65)] object-cover"
      />
    );
  }
  return (
    <div className="relative w-[130px] sm:w-[170px] lg:w-full aspect-[2/3] rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-[0_30px_60px_rgba(0,0,0,0.65)] bg-gradient-to-b from-[#3b0a14] via-[#1a0509] to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(251,191,36,0.35),transparent_55%)]" />
      <div className="absolute left-1/2 top-[18%] -translate-x-1/2 w-[10px] h-[44%] rounded-full bg-gradient-to-b from-amber-200 to-amber-500 shadow-[0_0_30px_rgba(251,191,36,0.7)]" />
      <div className="absolute left-1/2 top-[30%] -translate-x-1/2 w-[38%] h-[10px] rounded-full bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.7)]" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-200/80 mb-1">Paul Washer</p>
        <p className="font-display font-black text-white text-[19px] leading-tight">O Evangelho de<br />Jesus Cristo</p>
        <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/45">Defesa do Evangelho</p>
      </div>
    </div>
  );
}

/* ─── Vídeo (YouTube) ──────────────────────────────────────────────────────── */
function idYoutube(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
  return m ? m[1] : /^[\w-]{11}$/.test(url.trim()) ? url.trim() : null;
}

function VideoLivreto() {
  const id = idYoutube(LIVRETO_WASHER.video);
  return (
    <div className="relative w-full rounded-3xl p-1.5 sm:p-2 bg-gradient-to-br from-amber-300/30 via-white/5 to-rose-500/30">
      <div className="relative w-full aspect-video rounded-[18px] sm:rounded-[20px] overflow-hidden bg-slate-950">
        {id ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
            title={`Animação: ${LIVRETO_WASHER.titulo}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center bg-[radial-gradient(circle_at_50%_40%,rgba(251,191,36,0.18),transparent_60%)]">
            <PlayCircle className="w-14 h-14 sm:w-20 sm:h-20 text-amber-300/80" strokeWidth={1.4} />
            <p className="font-display font-black text-lg sm:text-2xl text-white">Vídeo de animação</p>
            <p className="text-white/55 text-[14px] sm:text-base">Em breve, a Introdução em animação.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Página ────────────────────────────────────────────────────────────────── */
export default function LivretoWasherEvangelhoPage() {
  const [lang] = useLanguage();
  const L = LIVRETO_WASHER;

  return (
    <div className="min-h-screen relative">
      <Navbar lang={lang} />

      <section className="relative pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="pointer-events-none absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-[0.12] bg-rose-500" />
        <div className="pointer-events-none absolute top-24 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-[0.10] bg-amber-400" />

        <div lang="pt-BR" className="relative max-w-5xl mx-auto [&_p]:[text-align:inherit] text-left">
          <Link to="/biblioteca" className="inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-widest text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Biblioteca
          </Link>

          {/* ════ TÍTULO ════ */}
          <motion.header initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="mb-7 sm:mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-black uppercase tracking-widest text-rose-200 bg-rose-500/15 border border-rose-400/35 mb-4">
              <BookHeart className="w-3.5 h-3.5" /> Livretos Evangelísticos
            </span>
            <h1 className="font-display font-black text-[34px] leading-[1.08] sm:text-5xl lg:text-6xl sm:leading-[1.05] mb-3 sm:mb-4 break-words">
              <span className="bg-gradient-to-r from-amber-200 via-rose-200 to-amber-300 bg-clip-text text-transparent">{L.titulo}</span>
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-lg sm:text-xl text-white/90 font-semibold">{L.autor}</p>
              <span className="hidden sm:block w-px h-5 bg-white/20" />
              <div className="flex flex-wrap gap-2">
                {[L.editora, `${L.cidade}, ${L.ano}`, L.edicao].map(x => (
                  <span key={x} className="px-2.5 py-1 rounded-lg text-[13px] sm:text-[14px] font-bold text-white/75 bg-white/[0.06] border border-white/10">{x}</span>
                ))}
              </div>
            </div>
          </motion.header>

          {/* ════ VÍDEO + CAPA ════ */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_220px] gap-6 lg:gap-8 items-start mb-12 sm:mb-14">
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="min-w-0">
              <VideoLivreto />
            </motion.div>
            <motion.aside initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex lg:flex-col items-center lg:items-stretch gap-5">
              <div className="shrink-0 lg:-rotate-2"><Capa /></div>
              <p className="text-white/65 text-[15px] leading-relaxed lg:text-center">
                Livreto evangelístico que apresenta <strong className="text-amber-300">o caráter de Deus</strong>, <strong className="text-rose-300">o pecado do homem</strong> e <strong className="text-emerald-300">a salvação em Cristo</strong>.
              </p>
            </motion.aside>
          </div>

          {/* ════ SUMÁRIO ════ */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12 sm:mb-16">
            {PARTES_WASHER.map(p => (
              <a key={p.id} href={`#${p.id}`} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[14px] font-black uppercase tracking-widest text-slate-950 bg-amber-300 hover:bg-amber-200 transition-colors">
                {p.titulo}
              </a>
            ))}
            <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[14px] font-bold uppercase tracking-widest text-white/50 border border-dashed border-white/20">
              <Clock className="w-4 h-4" /> Novas partes em breve
            </span>
          </div>

          {PARTES_WASHER.map(parte => (
            <article key={parte.id} id={parte.id} className="scroll-mt-28">
              {/* título da parte */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-amber-300/15 border border-amber-300/40">
                  <Sunrise className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <p className="text-[14px] font-black tracking-[0.3em] uppercase text-amber-300">Parte {parte.n}</p>
                  <h2 className="font-display font-black text-2xl sm:text-4xl text-white leading-tight">{parte.titulo}</h2>
                </div>
                <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-white/15 to-transparent" />
              </div>

              {/* legenda */}
              {parte.legenda && (
                <motion.div {...fade} className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 mb-8 sm:mb-10 border border-amber-300/30 bg-gradient-to-br from-rose-600/20 via-slate-950/70 to-amber-500/15">
                  <Quote className="absolute -top-3 -left-2 w-28 h-28 text-amber-300/10" />
                  <p className="relative font-display font-black text-[22px] sm:text-3xl lg:text-4xl leading-tight text-white mb-4">
                    {parte.legenda.split('Boa Notícia').map((s, i, arr) => (
                      <span key={i}>{s}{i < arr.length - 1 && <span className="text-amber-300">Boa Notícia</span>}</span>
                    ))}
                  </p>
                  {parte.subLegenda && (
                    <p className="relative text-[17px] sm:text-xl text-white/75 leading-relaxed max-w-3xl" style={{ textAlign: 'justify', hyphens: 'auto', WebkitHyphens: 'auto' }}>
                      {parte.subLegenda.replace(' Só Cristo alcança.', '')} <strong className="text-rose-300">Só Cristo alcança.</strong>
                    </p>
                  )}
                </motion.div>
              )}

              {/* mapa */}
              <motion.div {...fade} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {MAPA.map((m, i) => {
                  const Icone = m.icon;
                  return (
                    <div key={m.t} className="relative overflow-hidden rounded-2xl p-5 border" style={{ borderColor: m.cor + '40', background: `linear-gradient(160deg, ${m.cor}1c, rgba(2,6,23,.5) 60%)` }}>
                      <span className="absolute right-3 top-2 font-display font-black text-5xl text-white/[0.06]">{i + 1}</span>
                      <Icone className="w-7 h-7 mb-3" style={{ color: m.cor }} />
                      <p className="font-display font-black text-lg text-white mb-1">{m.t}</p>
                      <p className="text-white/70 text-[15px] leading-snug" style={{ textAlign: 'justify', hyphens: 'auto', WebkitHyphens: 'auto' }}>{m.d}</p>
                    </div>
                  );
                })}
              </motion.div>

              {/* como ler os destaques */}
              <div className="rounded-2xl p-4 sm:p-5 mb-8 border border-white/10 bg-white/[0.03]">
                <p className="flex items-center gap-2 text-[13px] font-black uppercase tracking-widest text-white/55 mb-3">
                  <Palette className="w-4 h-4" /> Como ler os destaques
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {LEGENDA_CORES.map(c => (
                    <span key={c.rot} className={`px-1.5 rounded font-bold text-[14px] ${c.cls}`}>{c.rot}</span>
                  ))}
                </div>
              </div>

              {/* texto */}
              <div className="flex flex-col gap-6 mb-8">
                {parte.paragrafos.map((p, i) => (
                  <motion.div
                    key={i}
                    {...fade}
                    className="relative rounded-2xl sm:rounded-3xl p-5 pl-6 sm:p-8 sm:pl-9 border bg-slate-950/50"
                    style={{ borderColor: p.cor + '35' }}
                  >
                    <div className="absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full" style={{ background: p.cor, boxShadow: `0 0 16px ${p.cor}80` }} />
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-black text-slate-950" style={{ background: p.cor }}>{i + 1}</span>
                      <p className="text-[14px] font-black uppercase tracking-[0.2em]" style={{ color: p.cor }}>{p.rotulo}</p>
                    </div>
                    <p className="text-white/85 text-[17px] sm:text-[19px] lg:text-[20px] leading-[1.8] sm:leading-[1.85]" style={{ textAlign: 'justify', hyphens: 'auto', WebkitHyphens: 'auto' }}>
                      <Enfase t={p.texto} />
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* síntese */}
              <motion.div {...fade} className="rounded-3xl p-6 sm:p-8 border border-emerald-400/30 bg-emerald-500/[0.08] mb-6">
                <p className="flex items-center gap-2 text-[14px] font-black uppercase tracking-[0.2em] text-emerald-300 mb-3">
                  <Sparkles className="w-4 h-4" /> Em uma frase
                </p>
                <p className="font-display font-black text-xl sm:text-2xl text-white leading-snug">
                  Deus enviou o <span className="text-sky-300">Seu Filho</span>, que <span className="text-amber-300">morreu em nosso lugar</span> e <span className="text-amber-300">ressuscitou</span>, para que todo aquele que <span className="text-emerald-300">crê</span> seja <span className="text-emerald-300">perdoado, reconciliado e tenha a vida eterna</span>.
                </p>
              </motion.div>

              <div className="border-t border-white/10 pt-4 flex flex-col gap-2 text-white/55 text-[15px]">
                {parte.notas?.map((n, i) => (
                  <p key={i} style={{ textAlign: 'justify', hyphens: 'auto', WebkitHyphens: 'auto' }}><sup className="text-amber-300 font-black mr-1">{i + 1}</sup>{n}</p>
                ))}
                <p className="text-white/40 text-[14px]">Fonte: {L.autor}, <em>{L.titulo}</em>, {L.editora}, {L.cidade}, {L.ano}, {L.edicao}.</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
