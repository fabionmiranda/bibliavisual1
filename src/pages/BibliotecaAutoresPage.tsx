import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, User, BookOpen, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function IconMastricht({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      {/* livro aberto */}
      <rect x="8" y="20" width="22" height="28" rx="3" stroke={color} strokeWidth="2" fill={color + '10'} />
      <rect x="34" y="20" width="22" height="28" rx="3" stroke={color} strokeWidth="2" fill={color + '10'} />
      <line x1="32" y1="20" x2="32" y2="48" stroke={color} strokeWidth="2" />
      {/* linhas de texto */}
      {[26, 31, 36, 41].map(y => (
        <line key={y} x1="13" y1={y} x2="26" y2={y} stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      ))}
      {[26, 31, 36, 41].map(y => (
        <line key={y + 100} x1="38" y1={y} x2="51" y2={y} stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      ))}
      {/* cruz topo */}
      <line x1="32" y1="8" x2="32" y2="16" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="11" x2="36" y2="11" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const AUTORES = [
  {
    slug: 'mastricht',
    nome: 'Petrus van Mastricht',
    datas: '1630–1706',
    area: 'Ortodoxia Reformada',
    subtitulo: 'A Teologia Teórico-Prática',
    descricao:
      'Representante central da escolástica reformada pós-Reforma, Mastricht uniu precisão doutrinária e piedade prática em sua monumental Theoretico-Practica Theologia — uma obra que Jonathan Edwards considerou a maior de seu tempo.',
    destaque: '"Teologia é a doutrina de viver para Deus por meio de Cristo."',
    tags: ['Ortodoxia Reformada', 'Escolástica', 'Teologia Prática', 'Século XVII'],
    accentColor: '#2dd4bf',
    gradHero: 'linear-gradient(135deg, #001a18 0%, #00100e 50%, #05071a 100%)',
    gradOrb1: '#2dd4bf',
    gradOrb2: '#0ea5e9',
    IconFigura: IconMastricht,
  },
];

export default function BibliotecaAutoresPage() {
  return (
    <div className="min-h-screen relative">
      <Navbar />

      <section className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-10 text-[10px] font-black uppercase tracking-widest text-white/30"
          >
            <Link to="/biblioteca" className="hover:text-brand-blue transition-colors">Biblioteca</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/75">Autores</span>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <p className="text-[10px] font-black tracking-[0.35em] uppercase text-[#2dd4bf] mb-3">
              Perfis Teológicos
            </p>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight mb-3">
              Autores
            </h1>
            <p className="text-white/65 text-sm sm:text-base max-w-lg leading-relaxed">
              Perfis de teólogos, pregadores e escritores que moldaram a fé cristã — suas vidas, métodos e contribuições para a história da Igreja.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="flex flex-col gap-6">
            {AUTORES.map((a, i) => (
              <motion.div
                key={a.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
              >
                <Link
                  to={`/biblioteca/autores/${a.slug}`}
                  className="group block rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 hover:shadow-2xl hover:scale-[1.007] active:scale-[0.998] transition-all duration-300"
                  style={{ background: a.gradHero }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr]">

                    {/* Painel visual esquerdo */}
                    <div
                      className="relative flex flex-col items-center justify-center p-8 sm:p-0 min-h-[180px] sm:min-h-0 overflow-hidden"
                      style={{ borderRight: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <div className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity duration-500"
                        style={{ background: `radial-gradient(ellipse at center, ${a.gradOrb1} 0%, transparent 70%)` }} />
                      <div className="absolute bottom-0 right-0 w-28 h-28 blur-3xl opacity-15"
                        style={{ background: a.gradOrb2 }} />

                      {/* ícone */}
                      <div className="relative z-10 w-18 h-18 mb-4" style={{ width: 72, height: 72 }}>
                        <div className="absolute inset-0 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                          style={{ background: a.accentColor }} />
                        <div className="relative w-full h-full">
                          <a.IconFigura color={a.accentColor} />
                        </div>
                      </div>

                      {/* datas */}
                      <div className="relative z-10 text-center">
                        <div className="text-[8px] font-black uppercase tracking-[0.28em] mb-1.5"
                          style={{ color: a.accentColor + '80' }}>Viveu</div>
                        <div className="px-3 py-1.5 rounded-full border font-black text-[11px] tracking-widest"
                          style={{ color: a.accentColor, background: a.accentColor + '18', borderColor: a.accentColor + '35' }}>
                          {a.datas}
                        </div>
                      </div>
                    </div>

                    {/* Conteúdo direito */}
                    <div className="flex flex-col justify-between p-6 sm:p-8 gap-4">
                      <div>
                        {/* badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                            style={{ color: a.accentColor, background: a.accentColor + '15', border: `1px solid ${a.accentColor}28` }}>
                            <User className="w-2.5 h-2.5" />
                            {a.area}
                          </span>
                        </div>

                        {/* nome */}
                        <p className="text-[10px] font-black tracking-[0.28em] uppercase mb-1"
                          style={{ color: a.accentColor + 'aa' }}>{a.subtitulo}</p>
                        <h2 className="font-display font-black text-xl sm:text-2xl text-white leading-tight mb-3">
                          {a.nome}
                        </h2>

                        {/* descrição */}
                        <p className="text-white/72 text-sm leading-relaxed mb-4 line-clamp-3">
                          {a.descricao}
                        </p>

                        {/* destaque */}
                        <div className="rounded-xl border-l-4 px-4 py-3"
                          style={{ borderColor: a.accentColor, background: a.accentColor + '0d' }}>
                          <p className="text-sm font-bold italic leading-relaxed" style={{ color: a.accentColor + 'cc' }}>
                            {a.destaque}
                          </p>
                        </div>
                      </div>

                      {/* tags + CTA */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/6">
                        <div className="flex flex-wrap gap-1.5">
                          {a.tags.map(t => (
                            <span key={t} className="px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-white/55 border border-white/8">
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-all duration-200 group-hover:gap-3"
                          style={{ color: a.accentColor }}>
                          <BookOpen className="w-3.5 h-3.5" strokeWidth={2} />
                          Ver perfil
                          <ExternalLink className="w-3 h-3 -translate-x-1 group-hover:translate-x-0 transition-transform duration-200" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Voltar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-12">
            <Link to="/biblioteca" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs font-black uppercase tracking-widest transition-colors">
              ← Voltar para a Biblioteca
            </Link>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
