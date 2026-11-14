import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronRight, Lightbulb, BookOpen, BookOpenText, Hourglass, List } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AZUL, R, CAPITULOS, BASE_SCRUTON, PARTES } from '../data/scrutonConservador';
import PrefacioEstudo from '../components/scruton/PrefacioEstudo';
import Capitulo1Estudo from '../components/scruton/Capitulo1Estudo';
import { LEITURAS_SCRUTON, rotaLeitura } from '../data/scrutonLeituras';

/** Estudos completos com layout próprio, por slug do capítulo. */
const ESTUDOS: Record<string, React.ComponentType<{ cor: string }>> = {
  prefacio: PrefacioEstudo,
  'capitulo-1': Capitulo1Estudo,
};

/** Capítulos que têm leitura guiada parágrafo por parágrafo. */
const LEITURA_GUIADA: Record<string, { to: string; detalhe: string }> = Object.fromEntries(
  Object.entries(LEITURAS_SCRUTON).map(([slug, l]) => [
    slug,
    {
      to: rotaLeitura(slug),
      detalhe: `${l.dados.totalParagrafos} parágrafos · ${l.dados.paginas.length} páginas · perguntas com resposta`,
    },
  ]),
);

function BotaoLeituraGuiada({ to, detalhe }: { to: string; detalhe: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-8">
      <Link to={to} className="group relative inline-flex rounded-2xl p-[2px] overflow-hidden max-w-full">
        {/* borda em gradiente girando */}
        <motion.span
          aria-hidden
          className="absolute inset-[-150%]"
          style={{ background: 'conic-gradient(from 0deg, #34d399, #60a5fa, #e879f9, #fbbf24, #34d399)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
        <span className="relative flex items-center gap-4 rounded-[14px] bg-slate-950/95 px-5 py-4 sm:px-6 sm:py-5 overflow-hidden">
          {/* brilho que atravessa */}
          <motion.span
            aria-hidden
            className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
            animate={{ x: ['0%', '450%'] }}
            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
          />
          <span className="relative w-12 h-12 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-400 to-sky-500 shadow-[0_0_24px_rgba(52,211,153,0.45)] group-hover:scale-110 transition-transform">
            <BookOpenText className="w-6 h-6 text-slate-950" />
          </span>
          <span className="relative flex flex-col text-left">
            <span className="text-[13px] font-black uppercase tracking-[0.25em] text-emerald-300">Leitura guiada</span>
            <span className="font-display font-black text-lg sm:text-xl text-white leading-tight">Ler o resumo parágrafo por parágrafo</span>
            <span className="text-white/55 text-[14px] mt-0.5">{detalhe}</span>
          </span>
          <ArrowRight className="relative w-6 h-6 shrink-0 text-white/60 group-hover:text-white group-hover:translate-x-1.5 transition-all" />
        </span>
      </Link>
    </motion.div>
  );
}

export default function LivroComoSerConservadorCapituloPage() {
  const { capSlug } = useParams();
  const idx = CAPITULOS.findIndex(c => c.slug === capSlug);
  const cap = CAPITULOS[idx];
  const anterior = idx > 0 ? CAPITULOS[idx - 1] : null;
  const proximo = idx >= 0 && idx < CAPITULOS.length - 1 ? CAPITULOS[idx + 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [capSlug]);

  if (!cap) {
    return (
      <div className="min-h-screen relative bg-bg-deep">
        <Navbar />
        <section className="pt-32 pb-20 px-4 text-center">
          <h1 className="font-display font-black text-3xl text-white mb-4">Capítulo não encontrado</h1>
          <Link to={BASE_SCRUTON} className="inline-flex items-center gap-2 text-brand-blue font-black uppercase tracking-widest text-sm">
            <ArrowLeft className="w-4 h-4" /> Voltar ao livro
          </Link>
        </section>
        <Footer />
      </div>
    );
  }

  const cor = cap.cor;
  const rotulo = cap.n === 'Pref.' ? 'Prefácio' : `Capítulo ${cap.n}`;

  return (
    <div className="min-h-screen relative bg-bg-deep">
      <Navbar />

      {/* ════ HERO ════ */}
      <section className="relative pt-24 sm:pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="pointer-events-none absolute -top-40 right-0 w-[520px] h-[520px] rounded-full blur-3xl opacity-20" style={{ background: cor }} />
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center gap-2 mb-10 text-[14px] font-black uppercase tracking-widest"
          >
            <Link to="/biblioteca/livros" className="text-white/50 hover:text-brand-blue transition-colors">Livros</Link>
            <ChevronRight className="w-3 h-3 text-white/30" />
            <Link to={BASE_SCRUTON} className="text-white/50 hover:text-brand-blue transition-colors">Como Ser um Conservador</Link>
            <ChevronRight className="w-3 h-3 text-white/30" />
            <span className="text-white/75">{rotulo}</span>
          </motion.div>

          <motion.div key={cap.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p className="text-[15px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: cor }}>{cap.parte}</p>
            <div className="flex items-start gap-5">
              <span
                className="hidden sm:flex w-20 h-20 shrink-0 rounded-2xl items-center justify-center font-display font-black text-2xl"
                style={{ color: cor, background: cor + '1a', border: `1px solid ${cor}50` }}
              >
                {cap.n}
              </span>
              <div>
                <p className="text-[15px] font-black uppercase tracking-widest text-white/50 mb-1">{rotulo}</p>
                <h1 className="font-display font-black text-3xl sm:text-5xl text-white leading-[1.1]">{cap.titulo}</h1>
                <p className="mt-3 text-white/55 text-base">Roger Scruton · <em>Como Ser um Conservador</em></p>
              </div>
            </div>

            {LEITURA_GUIADA[cap.slug] && (
              <BotaoLeituraGuiada to={LEITURA_GUIADA[cap.slug].to} detalhe={LEITURA_GUIADA[cap.slug].detalhe} />
            )}
          </motion.div>
        </div>
      </section>

      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">

          {/* Ideia central */}
          <motion.div
            key={cap.slug + '-ideia'}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl p-6 sm:p-8 border bg-gradient-to-br from-white/[0.05] to-transparent"
            style={{ borderColor: cor + '40' }}
          >
            <p className="flex items-center gap-2 text-[14px] font-black uppercase tracking-widest mb-3" style={{ color: cor }}>
              <BookOpen className="w-4 h-4" /> Ideia central
            </p>
            <p className="text-white/90 text-lg sm:text-xl leading-relaxed"><R t={cap.ideia} cor={cor} /></p>
          </motion.div>

          {(cap.conceito || cap.nota) && (
            <div className={`grid grid-cols-1 ${cap.conceito && cap.nota ? 'md:grid-cols-2' : ''} gap-4`}>
              {cap.conceito && (
                <div className="rounded-2xl p-6 border" style={{ background: cor + '12', borderColor: cor + '35' }}>
                  <p className="flex items-center gap-2 text-[14px] font-black uppercase tracking-widest mb-2" style={{ color: cor }}>
                    <Lightbulb className="w-4 h-4" /> Conceito-chave
                  </p>
                  <p className="text-white/90 text-[17px] sm:text-lg leading-relaxed"><R t={cap.conceito} cor={cor} /></p>
                </div>
              )}
              {cap.nota && (
                <div className="rounded-2xl p-6 border border-white/10 bg-white/[0.03]">
                  <p className="text-[14px] font-black uppercase tracking-widest text-white/50 mb-2">Para observar</p>
                  <p className="text-white/80 text-[17px] sm:text-lg leading-relaxed"><R t={cap.nota} cor={cor} /></p>
                </div>
              )}
            </div>
          )}

          {/* Conteúdo completo */}
          {ESTUDOS[cap.slug] ? (
            (() => {
              const Estudo = ESTUDOS[cap.slug];
              return <Estudo cor={cor} />;
            })()
          ) : cap.conteudo?.length ? (
            <article className="flex flex-col gap-10 mt-4">
              {cap.conteudo.map((b, i) => (
                <section key={i}>
                  {b.titulo && (
                    <h2 className="font-display font-black text-2xl sm:text-3xl text-white mb-4 flex items-center gap-3">
                      <span className="w-1.5 h-7 rounded-full" style={{ background: cor }} />
                      {b.titulo}
                    </h2>
                  )}
                  <div className="flex flex-col gap-4">
                    {b.paragrafos.map((p, j) => (
                      <p key={j} className="text-white/85 text-[17px] sm:text-lg leading-[1.8]"><R t={p} cor={cor} /></p>
                    ))}
                  </div>
                </section>
              ))}
            </article>
          ) : (
            <div className="rounded-3xl p-8 sm:p-10 border border-dashed border-white/20 text-center">
              <Hourglass className="w-9 h-9 mx-auto mb-4 text-white/40" />
              <h2 className="font-display font-black text-xl sm:text-2xl text-white mb-2">Estudo completo em preparação</h2>
              <p className="text-white/60 text-[17px] leading-relaxed max-w-lg mx-auto">
                O conteúdo detalhado deste {cap.n === 'Pref.' ? 'prefácio' : 'capítulo'} será publicado aqui nas próximas aulas.
              </p>
            </div>
          )}

          {/* Navegação anterior / próximo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {anterior ? (
              <Link
                to={`${BASE_SCRUTON}/${anterior.slug}`}
                className="group rounded-2xl p-5 border border-white/10 bg-white/[0.03] hover:border-white/25 transition-all"
              >
                <p className="flex items-center gap-2 text-[13px] font-black uppercase tracking-widest text-white/50 mb-1">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Anterior
                </p>
                <p className="font-display font-black text-white text-lg leading-snug">{anterior.titulo}</p>
              </Link>
            ) : <div className="hidden sm:block" />}
            {proximo && (
              <Link
                to={`${BASE_SCRUTON}/${proximo.slug}`}
                className="group rounded-2xl p-5 border hover:brightness-110 transition-all sm:text-right"
                style={{ borderColor: proximo.cor + '50', background: proximo.cor + '12' }}
              >
                <p className="flex items-center sm:justify-end gap-2 text-[13px] font-black uppercase tracking-widest mb-1" style={{ color: proximo.cor }}>
                  Próximo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </p>
                <p className="font-display font-black text-white text-lg leading-snug">{proximo.titulo}</p>
              </Link>
            )}
          </div>

          {/* Sumário */}
          <div className="rounded-3xl p-6 sm:p-8 border border-white/10 bg-white/[0.02] mt-4">
            <p className="flex items-center gap-2 text-[14px] font-black uppercase tracking-widest mb-5" style={{ color: AZUL }}>
              <List className="w-4 h-4" /> Sumário do livro
            </p>
            <div className="flex flex-col gap-6">
              {PARTES.map(p => (
                <div key={p.titulo}>
                  <p className="text-[13px] font-black uppercase tracking-widest mb-2" style={{ color: p.cor }}>{p.titulo}</p>
                  <div className="flex flex-col">
                    {CAPITULOS.filter(c => c.parte === p.titulo).map(c => {
                      const atual = c.slug === cap.slug;
                      return (
                        <Link
                          key={c.slug}
                          to={`${BASE_SCRUTON}/${c.slug}`}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${atual ? 'bg-white/10' : 'hover:bg-white/[0.05]'}`}
                        >
                          <span className="w-10 text-[14px] font-black shrink-0" style={{ color: c.cor }}>{c.n}</span>
                          <span className={`text-base sm:text-[17px] ${atual ? 'text-white font-bold' : 'text-white/75'}`}>{c.titulo}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to={BASE_SCRUTON}
            className="inline-flex items-center gap-2 text-white/65 hover:text-white text-sm font-black uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar para a visão geral do livro
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
