import { motion } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, ChevronRight, ChevronDown, Feather, Quote, Users, Clock, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { TEOLOGOS_BATISTAS, type BlocoGrupo, type TeologoBatista } from '../data/teologosBatistas';
import { FOTOS_TEOLOGOS_BATISTAS } from '../data/fotosTeologosBatistas';

// Página de cada teólogo de "Os Batistas e a Bíblia" — o conteúdo vem de src/data/teologosBatistas.ts

const ACCENT = '#f97316';
const ACCENT_BG = '#f9731618';
const ACCENT_BORDER = '#f9731635';

const LIVRO_URL = '/biblioteca/livros/os-batistas-e-a-biblia';

// Ênfase no texto: **trecho** = negrito branco; ==trecho== = destaque na cor da seção
function Enfase({ texto, cor = ACCENT }: { texto: string; cor?: string }) {
  return (
    <>
      {texto.split(/(\*\*[^*]+\*\*|==[^=]+==)/).map((parte, i) => {
        if (parte.startsWith('**')) return <strong key={i} className="text-white font-extrabold">{parte.slice(2, -2)}</strong>;
        if (parte.startsWith('==')) return (
          <mark key={i} className="font-bold rounded px-1 py-0.5" style={{ color: cor, background: `${cor}1f` }}>{parte.slice(2, -2)}</mark>
        );
        return parte;
      })}
    </>
  );
}

function Retrato({ t }: { t: TeologoBatista }) {
  // foto própria do teólogo ou, se não houver, o retrato usado no card do livro
  const foto = t.foto ?? FOTOS_TEOLOGOS_BATISTAS[t.nome];
  const [ok, setOk] = useState(Boolean(foto));
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ aspectRatio: '3/4', background: 'linear-gradient(160deg,#1a0800,#2d0e00 40%,#050200)', border: `1px solid ${ACCENT_BORDER}`, boxShadow: '0 32px 80px rgba(0,0,0,0.8)' }}
    >
      {ok && foto ? (
        <img src={foto} alt={`${t.nome} (imagem ilustrativa)`} onError={() => setOk(false)}
          className="w-full h-full object-cover object-top" style={{ filter: 'sepia(15%) contrast(1.05) brightness(0.92)' }} />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
          <Feather className="w-14 h-14 opacity-60" style={{ color: ACCENT }} strokeWidth={1} />
          <p className="text-white font-black text-lg">{t.nome}</p>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none" style={{ background: 'linear-gradient(0deg, rgba(5,2,0,0.85), transparent)' }} />
      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
        <span className="px-3 py-1.5 rounded-full text-[11px] font-black tracking-widest backdrop-blur-sm"
          style={{ color: ACCENT, background: 'rgba(0,0,0,0.55)', border: `1px solid ${ACCENT_BORDER}` }}>
          {t.datas}
        </span>
      </div>
    </div>
  );
}

function TituloSecao({ cor, titulo, sub }: { cor: string; titulo: string; sub?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-8">
      <div className="w-1.5 h-8 rounded-full shrink-0" style={{ background: cor, boxShadow: `0 0 14px ${cor}90` }} />
      <div>
        <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-wide">{titulo}</h2>
        {sub && <p className="text-white/70 text-base mt-1">{sub}</p>}
      </div>
    </motion.div>
  );
}

function DiscussaoGrupo({ grupo }: { grupo: BlocoGrupo[] }) {
  const total = grupo.reduce((n, b) => n + b.perguntas.length, 0);
  const [abertas, setAbertas] = useState<Set<number>>(new Set());
  const todasAbertas = abertas.size === total;
  const alternar = (n: number) => setAbertas(prev => {
    const novo = new Set(prev);
    if (novo.has(n)) novo.delete(n); else novo.add(n);
    return novo;
  });
  let contador = 0;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto">
        <TituloSecao cor="#fbbf24" titulo="Para discussão em grupo" sub="Perguntas e respostas sugeridas para estudos, células e escola bíblica" />

        {/* Orientações ao líder */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {[
            { icone: Clock, t: '45 a 60 minutos', d: 'Leia a página antes; no encontro, use os textos bíblicos indicados.' },
            { icone: Users, t: 'Todos participam', d: 'Deixe o grupo responder primeiro; a resposta sugerida vem depois.' },
            { icone: MessageCircle, t: 'Termine em oração', d: 'Feche com a última pergunta e orem pelo passo combinado.' },
          ].map(o => {
            const Icone = o.icone;
            return (
              <div key={o.t} className="flex items-start gap-3 rounded-2xl p-4 border border-amber-400/25 bg-amber-400/[0.06]">
                <Icone className="w-5 h-5 shrink-0 mt-0.5 text-amber-300" />
                <div>
                  <p className="text-white font-black text-base leading-snug">{o.t}</p>
                  <p className="text-white/75 text-sm leading-relaxed mt-0.5">{o.d}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={() => setAbertas(todasAbertas ? new Set() : new Set(Array.from({ length: total }, (_, i) => i + 1)))}
            className="text-xs font-black uppercase tracking-widest text-amber-300 hover:text-white transition-colors"
          >
            {todasAbertas ? 'Recolher todas as respostas' : 'Mostrar todas as respostas'}
          </button>
        </div>

        <div className="flex flex-col gap-8">
          {grupo.map(b => (
            <div key={b.bloco}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-black uppercase tracking-[0.25em]" style={{ color: b.cor }}>{b.bloco}</span>
                <span className="flex-1 h-px" style={{ background: `${b.cor}35` }} />
              </div>
              <div className="flex flex-col gap-3">
                {b.perguntas.map(q => {
                  const n = ++contador;
                  const aberta = abertas.has(n);
                  return (
                    <div key={n} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${b.cor}35`, background: `${b.cor}08` }}>
                      <button
                        type="button"
                        onClick={() => alternar(n)}
                        aria-expanded={aberta}
                        className="w-full flex items-start gap-4 text-left px-5 py-4 hover:bg-white/[0.03] transition-colors"
                      >
                        <span className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black"
                          style={{ color: b.cor, background: `${b.cor}1f`, border: `1px solid ${b.cor}45` }}>
                          {n}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-white font-bold text-[17px] sm:text-lg leading-snug">{q.p}</span>
                          <span className="inline-flex items-center gap-1.5 mt-2 text-sm font-bold" style={{ color: b.cor }}>
                            <BookOpen className="w-3.5 h-3.5" /> {q.leitura}
                          </span>
                        </span>
                        <ChevronDown className="w-5 h-5 shrink-0 mt-2 text-white/60 transition-transform" style={{ transform: aberta ? 'rotate(180deg)' : 'none' }} />
                      </button>
                      {aberta && (
                        <div className="px-5 pb-5 sm:pl-[4.5rem]">
                          <div className="rounded-xl px-4 py-3 border-l-4" style={{ borderColor: b.cor, background: 'rgba(255,255,255,0.03)' }}>
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-1.5" style={{ color: b.cor }}>Resposta sugerida</p>
                            <p className="text-white/90 text-[17px] leading-[1.75]"><Enfase texto={q.r} cor={b.cor} /></p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NaoEncontrado() {
  return (
    <div className="min-h-screen relative bg-bg-deep">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-40 pb-24 text-center">
        <h1 className="font-display font-black text-3xl text-white mb-4">Perfil em preparação</h1>
        <p className="text-white/70 text-lg mb-8">A página deste teólogo ainda não foi publicada.</p>
        <Link to={LIVRO_URL} className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-black uppercase tracking-widest"
          style={{ color: ACCENT, border: `1px solid ${ACCENT_BORDER}`, background: ACCENT_BG }}>
          <ArrowLeft className="w-4 h-4" /> Voltar para Os Batistas e a Bíblia
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default function TeologoBatistaPage() {
  const { slug } = useParams();
  const idx = TEOLOGOS_BATISTAS.findIndex(x => x.slug === slug);
  if (idx === -1) return <NaoEncontrado />;
  const t = TEOLOGOS_BATISTAS[idx];
  const anterior = TEOLOGOS_BATISTAS[idx - 1];
  const proximo = TEOLOGOS_BATISTAS[idx + 1];

  return (
    <div className="min-h-screen relative bg-bg-deep">
      <Navbar />

      {/* ════ HERO ════ */}
      <section className="pt-24 sm:pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumb */}
          <motion.nav initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center gap-2 mb-10 text-[11px] font-black uppercase tracking-widest">
            <Link to="/biblioteca" className="text-white/50 hover:text-orange-400 transition-colors">Biblioteca</Link>
            <ChevronRight className="w-3 h-3 text-white/25" />
            <Link to="/biblioteca/livros" className="text-white/50 hover:text-orange-400 transition-colors">Livros</Link>
            <ChevronRight className="w-3 h-3 text-white/25" />
            <Link to={LIVRO_URL} className="text-white/50 hover:text-orange-400 transition-colors">Os Batistas e a Bíblia</Link>
            <ChevronRight className="w-3 h-3 text-white/25" />
            <span className="text-white/80">{t.nome}</span>
          </motion.nav>

          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 lg:gap-14 items-start">
            <motion.div key={t.slug} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[260px] mx-auto md:mx-0">
              <Retrato t={t} />
              {t.fotoNota && <p className="mt-2 text-xs text-white/55 text-center leading-snug">{t.fotoNota}</p>}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider"
                  style={{ color: ACCENT, border: `1px solid ${ACCENT_BORDER}`, background: ACCENT_BG }}>
                  Teólogo {String(t.num).padStart(2, '0')} · {t.cap}
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-white/70 border border-white/15">
                  {t.grupo}
                </span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] mb-3">{t.nome}</h1>
              <p className="text-lg sm:text-xl font-bold mb-6" style={{ color: '#fdba74' }}>{t.subtitulo}</p>

              <p className="text-white/90 text-lg sm:text-xl leading-[1.75] mb-6"><Enfase texto={t.intro} /></p>

              <div className="rounded-2xl border-l-4 px-5 py-4" style={{ borderColor: ACCENT, background: ACCENT_BG }}>
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 shrink-0 mt-0.5" style={{ color: ACCENT }} />
                  <p className="text-lg sm:text-xl font-bold italic leading-relaxed" style={{ color: '#fed7aa' }}>{t.citacao}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════ RELAÇÃO COM A BÍBLIA ════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <TituloSecao cor={ACCENT} titulo={`${t.nome} e a Bíblia`} sub={t.eixosSub} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {t.eixos.map((e, i) => {
              const Icone = e.icone;
              return (
                <motion.article key={e.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-2xl overflow-hidden flex flex-col"
                  style={{ border: `1px solid ${e.cor}35`, background: `${e.cor}0a` }}>
                  <div className="flex items-center gap-4 px-6 py-4" style={{ borderBottom: `1px solid ${e.cor}25` }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${e.cor}1f`, border: `1px solid ${e.cor}45` }}>
                      <Icone className="w-5 h-5" style={{ color: e.cor }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black uppercase tracking-[0.25em]" style={{ color: e.cor }}>Eixo {e.num}</div>
                      <h3 className="text-white font-black text-xl leading-snug">{e.titulo}</h3>
                    </div>
                  </div>
                  <div className="px-6 py-5 flex flex-col gap-4 flex-1">
                    <p className="text-white/90 text-[17px] sm:text-lg leading-[1.8]"><Enfase texto={e.texto} cor={e.cor} /></p>
                    <p className="mt-auto text-base sm:text-[17px] font-bold italic rounded-xl px-4 py-3 border-l-4" style={{ color: e.cor, background: `${e.cor}14`, borderColor: e.cor }}>
                      “{e.destaque}”
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════ LINHA DO TEMPO ════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <TituloSecao cor="#fbbf24" titulo="Linha do tempo" sub={t.linhaSub} />
          <ol className="relative border-l-2 ml-3" style={{ borderColor: 'rgba(249,115,22,0.30)' }}>
            {t.linha.map((m, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.04 }} className="relative pl-7 pb-7 last:pb-0">
                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full" style={{ background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
                <div className="text-sm font-black uppercase tracking-widest mb-1" style={{ color: '#fdba74' }}>{m.ano}</div>
                <div className="text-white font-black text-xl leading-snug mb-1.5">{m.titulo}</div>
                <p className="text-white/90 text-[17px] sm:text-lg leading-[1.75]"><Enfase texto={m.texto} /></p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ════ LIÇÕES ════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <TituloSecao cor="#2dd4bf" titulo={`O que aprendemos com ${t.nomeCurto}`} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.licoes.map((l, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="rounded-2xl p-5 border border-white/10 bg-white/[0.03]">
                <div className="text-3xl font-black mb-2" style={{ color: '#2dd4bf' }}>{i + 1}</div>
                <h3 className="text-white font-black text-xl leading-snug mb-2">{l.t}</h3>
                <p className="text-white/90 text-[17px] leading-[1.75]"><Enfase texto={l.d} cor="#2dd4bf" /></p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ DISCUSSÃO EM GRUPO ════ */}
      <DiscussaoGrupo key={t.slug} grupo={t.grupoPerguntas} />

      {/* ════ OBRAS ════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <TituloSecao cor="#a78bfa" titulo="Principais obras" />
          <div className="flex flex-col gap-2.5">
            {t.obras.map(o => (
              <div key={o.titulo} className="flex items-start gap-4 rounded-xl px-4 py-3 border border-white/10 bg-white/[0.02]">
                <span className="shrink-0 w-14 text-base font-black" style={{ color: '#c4b5fd' }}>{o.ano}</span>
                <div className="min-w-0">
                  <p className="text-white font-bold italic text-lg leading-snug">{o.titulo}</p>
                  <p className="text-white/80 text-base leading-relaxed">{o.nota}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ REFERÊNCIAS ════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <TituloSecao cor="rgba(255,255,255,0.5)" titulo="Referências" />
          <div className="flex flex-col gap-3">
            {t.referencias.map(r => (
              <p key={r.autor + r.titulo} className="text-white/80 text-base leading-relaxed">
                {r.autor} <em className="text-white/90 font-bold">{r.titulo}</em>. {r.resto}
              </p>
            ))}
          </div>

          {/* Navegação entre teólogos */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {anterior ? (
              <Link to={`${LIVRO_URL}/${anterior.slug}`} className="group rounded-2xl px-5 py-4 border border-white/10 hover:border-orange-400/50 bg-white/[0.02] transition-colors">
                <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-white/50"><ArrowLeft className="w-3.5 h-3.5" /> Anterior</span>
                <span className="block mt-1 text-white font-black text-lg group-hover:text-orange-300">{anterior.nome}</span>
              </Link>
            ) : <span className="hidden sm:block" />}
            {proximo && (
              <Link to={`${LIVRO_URL}/${proximo.slug}`} className="group rounded-2xl px-5 py-4 border border-white/10 hover:border-orange-400/50 bg-white/[0.02] transition-colors sm:text-right">
                <span className="flex items-center sm:justify-end gap-1.5 text-xs font-black uppercase tracking-widest text-white/50">Próximo <ArrowRight className="w-3.5 h-3.5" /></span>
                <span className="block mt-1 text-white font-black text-lg group-hover:text-orange-300">{proximo.nome}</span>
              </Link>
            )}
          </div>

          <div className="mt-8">
            <Link to={LIVRO_URL}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-colors"
              style={{ color: ACCENT, border: `1px solid ${ACCENT_BORDER}`, background: ACCENT_BG }}>
              <ArrowLeft className="w-4 h-4" /> Voltar para Os Batistas e a Bíblia
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
