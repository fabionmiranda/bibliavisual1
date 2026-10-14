import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  BookMarked, Star, User, FileText, BookOpen,
  Layers, Search, Mic2, Landmark, Handshake, Cross,
  ChevronRight, GraduationCap, Shield,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FlagToggle from '../components/FlagToggle';
import { ARTIGOS_TEOLOGIA } from '../data/teologia';

const ARTIGOS_COUNT = ARTIGOS_TEOLOGIA.filter(a => a.area === 'artigos' && a.status === 'publicado').length;

/* ─── SVG patterns (inline, zero external deps) ──────────────────────────── */

const PatternCross = ({ color }: { color: string }) => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.07 }}>
    <defs>
      <pattern id="cross" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
        <path d="M14 4v20M4 14h20" stroke={color} strokeWidth="1" fill="none" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#cross)" />
  </svg>
);

const PatternDots = ({ color }: { color: string }) => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.10 }}>
    <defs>
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill={color} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

const PatternLines = ({ color }: { color: string }) => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.08 }}>
    <defs>
      <pattern id="lines" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="24" y2="24" stroke={color} strokeWidth="0.8" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#lines)" />
  </svg>
);

const PatternGrid = ({ color }: { color: string }) => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.08 }}>
    <defs>
      <pattern id="grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M32 0H0V32" fill="none" stroke={color} strokeWidth="0.7" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

const PatternWave = ({ color }: { color: string }) => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.07 }}>
    <defs>
      <pattern id="wave" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
        <path d="M0 10 Q10 0 20 10 Q30 20 40 10" stroke={color} strokeWidth="1" fill="none" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#wave)" />
  </svg>
);

const PatternHex = ({ color }: { color: string }) => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.07 }}>
    <defs>
      <pattern id="hex" x="0" y="0" width="30" height="26" patternUnits="userSpaceOnUse">
        <polygon points="15,1 28,8 28,19 15,26 2,19 2,8" stroke={color} strokeWidth="0.8" fill="none" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hex)" />
  </svg>
);

const PatternScroll = ({ color }: { color: string }) => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.07 }}>
    <defs>
      <pattern id="scroll" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
        <circle cx="18" cy="18" r="10" stroke={color} strokeWidth="0.7" fill="none" />
        <circle cx="18" cy="18" r="3" stroke={color} strokeWidth="0.7" fill="none" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#scroll)" />
  </svg>
);

/* ─── card data ────────────────────────────────────────────────────────────── */

function getSecaoPrincipal(pt: boolean) {
  return [
    {
      icon: GraduationCap,
      label: pt ? 'Estudos Bíblicos e Confessionais' : 'Biblical & Confessional Studies',
      descricao: pt
        ? 'Cadernos de discipulado confessional — estudo sistemático das grandes confissões de fé com perguntas, gabaritos e referências.'
        : 'Confessional discipleship notebooks — systematic study of the great confessions of faith with questions, answers and references.',
      accent: '#f97316',
      path: '/discipulado/confessional',
      badge: pt ? 'Novo' : 'New',
      bg: 'linear-gradient(145deg, #1c0d00 0%, #150900 50%, #0d0806 100%)',
      Pattern: PatternCross,
    },
    {
      icon: BookMarked,
      label: pt ? 'Livros Recomendados' : 'Recommended Books',
      descricao: pt
        ? 'Seleção criteriosa dos melhores livros de teologia e exposição bíblica.'
        : 'A careful selection of the best books in theology and biblical exposition.',
      accent: '#00d4ff',
      path: '/biblioteca/livros',
      badge: pt ? '1 disponível' : '1 available',
      bg: 'linear-gradient(145deg, #00131a 0%, #00090f 50%, #060c10 100%)',
      Pattern: PatternDots,
    },
    {
      icon: FileText,
      label: pt ? 'Artigos Recomendados' : 'Recommended Articles',
      descricao: pt
        ? 'Artigos teológicos selecionados para aprofundar o estudo da Palavra.'
        : 'Selected theological articles to deepen study of the Word.',
      accent: '#a78bfa',
      path: '/biblioteca/artigos',
      badge: pt ? `${ARTIGOS_COUNT} artigos` : `${ARTIGOS_COUNT} articles`,
      bg: 'linear-gradient(145deg, #0e0819 0%, #080511 50%, #060608 100%)',
      Pattern: PatternLines,
    },
    {
      icon: Star,
      label: pt ? 'Livro do Dia / Semana' : 'Book of the Day / Week',
      descricao: pt
        ? 'Uma recomendação diária ou semanal, com resenha e aplicação pastoral.'
        : 'A daily or weekly recommendation, with a review and pastoral application.',
      accent: '#fbbf24',
      path: '/biblioteca/semana',
      badge: pt ? 'Novo' : 'New',
      bg: 'linear-gradient(145deg, #191000 0%, #100c00 50%, #080706 100%)',
      Pattern: PatternScroll,
    },
    {
      icon: User,
      label: pt ? 'Autores-Teólogos' : 'Authors-Theologians',
      descricao: pt
        ? 'Perfis de teólogos, pregadores e escritores que moldaram a fé cristã.'
        : 'Profiles of theologians, preachers and writers who shaped Christian faith.',
      accent: '#2dd4bf',
      path: '/biblioteca/autores',
      badge: undefined as string | undefined,
      bg: 'linear-gradient(145deg, #001713 0%, #000e0c 50%, #060909 100%)',
      Pattern: PatternHex,
    },
    {
      icon: BookOpen,
      label: pt ? 'Resenhas' : 'Book Reviews',
      descricao: pt
        ? 'Análises detalhadas de obras importantes para o ministério e estudo.'
        : 'Detailed analyses of important works for ministry and study.',
      accent: '#fb7185',
      path: '/biblioteca/resenhas',
      badge: undefined as string | undefined,
      bg: 'linear-gradient(145deg, #190007 0%, #0f0005 50%, #090608 100%)',
      Pattern: PatternWave,
    },
    {
      icon: Shield,
      label: pt ? 'Heróis da Fé' : 'Heroes of Faith',
      descricao: pt
        ? 'Série de estudos sobre personagens bíblicos — suas vidas, falhas, fé e o Deus que os transformou.'
        : 'A study series on biblical characters — their lives, failures, faith and the God who transformed them.',
      accent: '#f97316',
      path: '/estudos/herois-da-fe',
      badge: pt ? 'Em breve' : 'Coming soon',
      bg: 'linear-gradient(145deg, #1a0a00 0%, #120700 50%, #090604 100%)',
      Pattern: PatternHex,
    },
    {
      icon: Layers,
      label: pt ? 'Guias de Leitura' : 'Reading Guides',
      descricao: pt
        ? 'Roteiros temáticos para uma leitura sistemática e progressiva.'
        : 'Thematic roadmaps for systematic and progressive reading.',
      accent: '#34d399',
      path: '/biblioteca/guias',
      badge: pt ? 'Em breve' : 'Coming soon',
      bg: 'linear-gradient(145deg, #001509 0%, #000e06 50%, #060907 100%)',
      Pattern: PatternGrid,
    },
  ];
}

function getSecaoAreas(pt: boolean) {
  return [
    { icon: BookOpen,  label: pt ? 'Teologia Bíblica'       : 'Biblical Theology',         path: '/biblioteca/area/teologia-biblica', accent: '#00d4ff' },
    { icon: Layers,    label: pt ? 'Teologia Sistemática'    : 'Systematic Theology',       path: '/biblioteca/area/sistematica',      accent: '#a78bfa' },
    { icon: Search,    label: pt ? 'Exegese e Hermenêutica'  : 'Exegesis and Hermeneutics', path: '/biblioteca/area/exegese',          accent: '#fbbf24' },
    { icon: Mic2,      label: pt ? 'Homilética e Pregação'   : 'Homiletics and Preaching',  path: '/biblioteca/area/homiletica',       accent: '#fb7185' },
    { icon: Landmark,  label: pt ? 'História da Igreja'      : 'Church History',            path: '/biblioteca/area/historia',         accent: '#2dd4bf' },
    { icon: Handshake, label: pt ? 'Teologia do Pacto'       : 'Covenant Theology',         path: '/biblioteca/area/pacto',            accent: '#34d399' },
    { icon: Cross,     label: pt ? 'Teologia Reformada'      : 'Reformed Theology',         path: '/biblioteca/area/reformada',        accent: '#f472b6' },
  ];
}

/* ─── page ─────────────────────────────────────────────────────────────────── */

export default function BibliotecaPage() {
  const [lang, setLang] = useState<'pt'|'en'>('pt');
  const pt = lang === 'pt';
  const SECAO_PRINCIPAL = getSecaoPrincipal(pt);
  const SECAO_AREAS = getSecaoAreas(pt);

  return (
    <div className="min-h-screen relative">
      <Navbar lang={lang} />

      <section className="relative pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #00d4ff08 0%, transparent 68%)', filter: 'blur(48px)' }} />

        <div className="max-w-7xl mx-auto">

          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="mb-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: '#00d4ff' }} />
              <p className="text-[10px] font-black tracking-[0.35em] uppercase text-brand-blue">
                {pt ? 'Recursos Teológicos' : 'Theological Resources'}
              </p>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-5">
              {pt ? 'Biblioteca' : 'Library'}
            </h1>
            <p className="text-white/40 text-base sm:text-lg max-w-2xl leading-relaxed">
              {pt
                ? 'Livros, artigos, estudos confessionais, autores e guias selecionados para aprofundar o estudo expositivo da Bíblia.'
                : 'Books, articles, confessional studies, authors and guides selected to deepen expository Bible study.'}
            </p>
          </motion.div>

          {/* section label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-6 rounded-full bg-brand-blue" style={{ boxShadow: '0 0 10px #00d4ff80' }} />
            <h2 className="font-display font-black text-sm uppercase tracking-widest text-brand-blue">
              {pt ? 'Coleções' : 'Collections'}
            </h2>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg,#00d4ff30,transparent)' }} />
          </div>

          {/* cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {SECAO_PRINCIPAL.map((item, i) => {
              const Icone = item.icon;
              const Pat = item.Pattern;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.08, duration: 0.45 }}
                >
                  <Link
                    to={item.path}
                    className="group relative flex flex-col justify-between rounded-2xl overflow-hidden hover:scale-[1.025] active:scale-[0.98] transition-all duration-300 h-full min-h-[220px]"
                    style={{
                      background: item.bg,
                      border: `1px solid ${item.accent}30`,
                      boxShadow: `0 4px 32px ${item.accent}08`,
                    }}
                  >
                    {/* contextual pattern */}
                    <Pat color={item.accent} />

                    {/* hover border glow */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ boxShadow: `inset 0 0 0 1px ${item.accent}55` }} />

                    {/* corner radial */}
                    <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none rounded-full"
                      style={{ background: `radial-gradient(circle, ${item.accent}16 0%, transparent 65%)`, transform: 'translate(30%,-30%)' }} />

                    <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-full">
                      {/* top row */}
                      <div className="flex items-start justify-between mb-6">
                        <motion.div
                          whileHover={{ scale: 1.12, rotate: 4 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                          className="p-3 rounded-xl"
                          style={{ background: `${item.accent}18`, border: `1px solid ${item.accent}38` }}
                        >
                          <Icone className="w-6 h-6" style={{ color: item.accent }} strokeWidth={1.5} />
                        </motion.div>
                        {item.badge && (
                          <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                            style={{ color: item.accent, background: `${item.accent}15`, border: `1px solid ${item.accent}30` }}>
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* text */}
                      <div className="flex-1">
                        <h3 className="text-white font-black text-base sm:text-lg leading-snug mb-2 group-hover:text-white transition-colors">
                          {item.label}
                        </h3>
                        <p className="text-white/45 text-xs sm:text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                          {item.descricao}
                        </p>
                      </div>

                      {/* cta */}
                      <div className="flex items-center gap-1.5 mt-5 pt-4"
                        style={{ borderTop: `1px solid ${item.accent}18` }}>
                        <span className="text-[10px] font-black uppercase tracking-widest transition-all duration-200 translate-x-0 group-hover:translate-x-0.5"
                          style={{ color: `${item.accent}cc` }}>
                          {pt ? 'Explorar' : 'Explore'}
                        </span>
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
                        >
                          <ChevronRight className="w-3.5 h-3.5" style={{ color: item.accent }} />
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* divider */}
          <div className="h-px w-full my-14" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)' }} />

          {/* por área */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-6 rounded-full bg-brand-rose" style={{ boxShadow: '0 0 10px #ff2d5580' }} />
              <h2 className="font-display font-black text-sm uppercase tracking-widest text-brand-rose">
                {pt ? 'Por Área' : 'By Area'}
              </h2>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg,#ff2d5530,transparent)' }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {SECAO_AREAS.map((item, i) => {
                const Icone = item.icon;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.06, duration: 0.4 }}
                  >
                    <Link
                      to={item.path}
                      className="group flex items-center gap-3.5 px-4 py-4 rounded-2xl border border-white/8 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                    >
                      <div className="p-2.5 rounded-xl shrink-0"
                        style={{ background: item.accent + '15', border: `1px solid ${item.accent}28` }}>
                        <Icone className="w-5 h-5" style={{ color: item.accent }} strokeWidth={1.5} />
                      </div>
                      <span className="text-white/70 group-hover:text-white font-bold text-sm transition-colors duration-150">
                        {item.label}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 ml-auto shrink-0 text-white/20 group-hover:text-white/50 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      <Footer lang={lang} />
      <FlagToggle lang={lang} setLang={setLang} />
    </div>
  );
}
