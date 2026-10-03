import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, FileText, PenLine } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FlagToggle from '../components/FlagToggle';
import { ARTIGOS_TEOLOGIA } from '../data/teologia';

const ACCENT = '#a78bfa';
const ACCENT_DIM = '#a78bfa18';
const ACCENT_BORDER = '#a78bfa35';

const CORES_CATEGORIA: Record<string, string> = {
  'Homilética & Pregação':                    '#fb7185',
  'Hermenêutica e Epistemologia Teológica':   '#a78bfa',
  'Introdução aos Estudos Teológicos':        '#2dd4bf',
  'Natureza e Finalidade da Teologia':        '#fbbf24',
  'Epistemologia Teológica':                  '#f97316',
  'História da Razão Teológica':              '#34d399',
  'Revelação e Autoridade Bíblica':           '#60a5fa',
};

function corCategoria(cat: string) {
  return CORES_CATEGORIA[cat] ?? ACCENT;
}

export default function BibliotecaArtigosPage() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const pt = lang === 'pt';

  const publicados = ARTIGOS_TEOLOGIA.filter(a => a.area === 'artigos' && a.status === 'publicado');
  const rascunhos  = ARTIGOS_TEOLOGIA.filter(a => a.area === 'artigos' && a.status === 'rascunho');

  // Agrupa publicados por categoria
  const porCategoria = publicados.reduce<Record<string, typeof publicados>>((acc, a) => {
    if (!acc[a.categoria]) acc[a.categoria] = [];
    acc[a.categoria].push(a);
    return acc;
  }, {});

  return (
    <div className="min-h-screen relative">
      <Navbar lang={lang} />

      <section className="pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-10 text-xs font-black uppercase tracking-widest text-white/35"
          >
            <Link to="/biblioteca" className="hover:text-purple-400 transition-colors">
              {pt ? 'Biblioteca' : 'Library'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/55">{pt ? 'Artigos Recomendados' : 'Recommended Articles'}</span>
          </motion.div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="p-3 rounded-2xl"
                style={{ background: ACCENT_DIM, border: `1.5px solid ${ACCENT_BORDER}` }}
              >
                <PenLine className="w-6 h-6" style={{ color: ACCENT }} strokeWidth={1.5} />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
                {pt ? 'Artigos · Teologia & Hermenêutica' : 'Articles · Theology & Hermeneutics'}
              </p>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5">
              {pt ? 'Artigos' : 'Articles'}{' '}
              <span style={{ color: ACCENT }}>{pt ? 'Recomendados' : 'Recommended'}</span>
            </h1>

            <p className="text-white/60 text-lg sm:text-xl leading-relaxed max-w-2xl mb-6">
              {pt
                ? 'Textos de aprofundamento nas grandes questões da fé cristã — escritos com rigor teológico e linguagem acessível para pastores, professores e estudantes.'
                : 'In-depth texts on the great questions of the Christian faith — written with theological rigor and accessible language for pastors, professors and students.'}
            </p>

            {/* Contadores */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl font-black" style={{ color: ACCENT }}>{publicados.length}</span>
                <span className="text-white/40 text-sm font-semibold">
                  {pt
                    ? `artigo${publicados.length !== 1 ? 's' : ''} publicado${publicados.length !== 1 ? 's' : ''}`
                    : `published article${publicados.length !== 1 ? 's' : ''}`}
                </span>
              </div>
              {rascunhos.length > 0 && (
                <>
                  <div className="w-px h-5 bg-white/10" />
                  <div className="flex items-center gap-2">
                    <span className="text-white/30 text-lg font-black">{rascunhos.length}</span>
                    <span className="text-white/25 text-sm font-semibold">
                      {pt ? 'em preparação' : 'in preparation'}
                    </span>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Divisor */}
          <div className="h-px w-full mb-14"
            style={{ background: `linear-gradient(90deg, ${ACCENT}50, transparent)` }} />

          {/* Artigos publicados */}
          {publicados.length === 0 ? (
            <div className="text-center py-20 text-white/30 text-base">
              {pt ? 'Nenhum artigo publicado ainda. Em breve.' : 'No articles published yet. Coming soon.'}
            </div>
          ) : (
            <div className="mb-16">
              {/* Por categoria */}
              {Object.entries(porCategoria).map(([categoria, artigos], ci) => {
                const cor = corCategoria(categoria);
                return (
                  <motion.div
                    key={categoria}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: ci * 0.08 }}
                    className="mb-12"
                  >
                    {/* Label categoria */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-5 rounded-full" style={{ background: cor, boxShadow: `0 0 8px ${cor}80` }} />
                      <span
                        className="text-xs font-black uppercase tracking-[0.28em] px-3 py-1.5 rounded-full"
                        style={{ color: cor, background: cor + '18', border: `1px solid ${cor}35` }}
                      >
                        {categoria}
                      </span>
                      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,${cor}30,transparent)` }} />
                    </div>

                    {/* Cards dos artigos */}
                    <div className="flex flex-col gap-4">
                      {artigos.map((artigo, i) => (
                        <motion.div
                          key={artigo.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: ci * 0.08 + i * 0.06 }}
                        >
                          <Link
                            to={`/artigos/${artigo.slug}`}
                            className="group flex items-start gap-5 p-6 sm:p-8 rounded-2xl border hover:border-white/20 transition-all duration-200 hover:scale-[1.005]"
                            style={{
                              background: `linear-gradient(135deg, ${cor}08 0%, rgba(255,255,255,0.02) 100%)`,
                              borderColor: `${cor}25`,
                            }}
                          >
                            {/* Ícone */}
                            <div
                              className="p-3 rounded-xl shrink-0 mt-0.5"
                              style={{ background: cor + '18', border: `1px solid ${cor}30` }}
                            >
                              <FileText className="w-5 h-5" style={{ color: cor }} strokeWidth={1.5} />
                            </div>

                            {/* Conteúdo */}
                            <div className="flex-1 min-w-0">
                              {artigo.parte && (
                                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: cor + 'aa' }}>
                                  {artigo.parte}
                                </p>
                              )}
                              <h2 className="text-white font-black text-lg sm:text-xl leading-tight mb-3 group-hover:text-white transition-colors">
                                {artigo.titulo}
                              </h2>
                              <p className="text-white/55 text-base leading-relaxed line-clamp-3">
                                {artigo.resumo}
                              </p>
                            </div>

                            {/* Seta */}
                            <div
                              className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center self-center transition-all duration-200 group-hover:scale-110"
                              style={{ background: cor + '15', border: `1px solid ${cor}30` }}
                            >
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" style={{ color: cor }} />
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Em preparação */}
          {rascunhos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mb-14"
            >
              {/* Header seção */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1 h-6 rounded-full bg-white/15" />
                <h2 className="font-display font-black text-sm uppercase tracking-widest text-white/30">
                  {pt ? 'Em Preparação' : 'In Preparation'}
                </h2>
                <div className="flex-1 h-px bg-white/08" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {rascunhos.map((artigo, i) => (
                  <motion.div
                    key={artigo.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.48 + i * 0.04 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/06"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/15 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-white/35 text-xs font-bold uppercase tracking-wider mb-0.5">
                        {artigo.categoria}
                      </p>
                      <p className="text-white/40 text-sm font-semibold leading-snug truncate">
                        {artigo.titulo}
                      </p>
                    </div>
                    <span className="ml-auto shrink-0 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full text-white/25 border border-white/10">
                      {pt ? 'Em breve' : 'Soon'}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Voltar para Biblioteca */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="pt-8 border-t border-white/07"
          >
            <Link
              to="/biblioteca"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/35 hover:text-purple-400 transition-colors duration-200"
            >
              <ChevronRight className="w-3.5 h-3.5 rotate-180" />
              {pt ? 'Voltar para Biblioteca' : 'Back to Library'}
            </Link>
          </motion.div>

        </div>
      </section>

      <Footer lang={lang} />
      <FlagToggle lang={lang} setLang={setLang} />
    </div>
  );
}
