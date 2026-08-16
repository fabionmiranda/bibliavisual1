import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  BookMarked, Star, User, FileText, BookOpen,
  Layers, Search, Mic2, Landmark, Handshake, Cross,
  ChevronRight,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SECAO_PRINCIPAL = [
  {
    icon: BookMarked,
    label: 'Livros Recomendados',
    descricao: 'Seleção criteriosa dos melhores livros de teologia e exposição bíblica.',
    cor: 'from-blue-950 via-indigo-950 to-slate-950',
    accent: '#00d4ff',
    path: '/biblioteca/livros',
    badge: '1 disponível',
  },
  {
    icon: FileText,
    label: 'Artigos Recomendados',
    descricao: 'Artigos teológicos selecionados para aprofundar o estudo da Palavra.',
    cor: 'from-violet-950 via-purple-950 to-slate-950',
    accent: '#a78bfa',
    path: '/biblioteca/artigos',
    badge: 'Em breve',
  },
  {
    icon: Star,
    label: 'Livro da Semana',
    descricao: 'Uma recomendação nova a cada semana, com resenha e aplicação pastoral.',
    cor: 'from-amber-950 via-yellow-950 to-slate-950',
    accent: '#fbbf24',
    path: '/biblioteca/semana',
    badge: 'Em breve',
  },
  {
    icon: User,
    label: 'Autores',
    descricao: 'Perfis de teólogos, pregadores e escritores que moldaram a fé cristã.',
    cor: 'from-teal-950 via-cyan-950 to-slate-950',
    accent: '#2dd4bf',
    path: '/biblioteca/autores',
    badge: 'Em breve',
  },
  {
    icon: BookOpen,
    label: 'Resenhas',
    descricao: 'Análises detalhadas de obras importantes para o ministério e estudo.',
    cor: 'from-rose-950 via-pink-950 to-slate-950',
    accent: '#fb7185',
    path: '/biblioteca/resenhas',
    badge: 'Em breve',
  },
  {
    icon: Layers,
    label: 'Guias de Leitura',
    descricao: 'Roteiros temáticos para uma leitura sistemática e progressiva.',
    cor: 'from-green-950 via-emerald-950 to-slate-950',
    accent: '#34d399',
    path: '/biblioteca/guias',
    badge: 'Em breve',
  },
];

const SECAO_AREAS = [
  { icon: BookOpen,  label: 'Teologia Bíblica',       path: '/biblioteca/area/teologia-biblica', accent: '#00d4ff' },
  { icon: Layers,    label: 'Teologia Sistemática',    path: '/biblioteca/area/sistematica',      accent: '#a78bfa' },
  { icon: Search,    label: 'Exegese e Hermenêutica',  path: '/biblioteca/area/exegese',          accent: '#fbbf24' },
  { icon: Mic2,      label: 'Homilética e Pregação',   path: '/biblioteca/area/homiletica',       accent: '#fb7185' },
  { icon: Landmark,  label: 'História da Igreja',      path: '/biblioteca/area/historia',         accent: '#2dd4bf' },
  { icon: Handshake, label: 'Teologia do Pacto',       path: '/biblioteca/area/pacto',            accent: '#34d399' },
  { icon: Cross,     label: 'Teologia Reformada',      path: '/biblioteca/area/reformada',        accent: '#f472b6' },
];

export default function BibliotecaPage() {
  return (
    <div className="min-h-screen relative">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-14 sm:mb-18"
          >
            <p className="text-[10px] font-black tracking-[0.35em] uppercase text-brand-blue mb-3">
              Recursos Teológicos
            </p>
            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4">
              Biblioteca
            </h1>
            <p className="text-white/45 text-base sm:text-lg max-w-xl leading-relaxed">
              Livros, artigos, autores e guias de leitura selecionados para
              aprofundar o estudo expositivo da Bíblia.
            </p>
          </motion.div>

          {/* Cards principais */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-6 rounded-full bg-brand-blue" style={{ boxShadow: '0 0 10px #00d4ff80' }} />
              <h2 className="font-display font-black text-sm uppercase tracking-widest text-brand-blue">
                Biblioteca
              </h2>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg,#00d4ff30,transparent)' }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {SECAO_PRINCIPAL.map((item, i) => {
                const Icone = item.icon;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                  >
                    <Link
                      to={item.path}
                      className={`group flex flex-col justify-between p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${item.cor} border border-white/10 hover:border-white/25 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] transition-all duration-300 h-full min-h-[180px]`}
                    >
                      <div className="flex items-start justify-between mb-5">
                        <div
                          className="p-3 rounded-xl"
                          style={{ background: item.accent + '18', border: `1px solid ${item.accent}30` }}
                        >
                          <Icone className="w-6 h-6" style={{ color: item.accent }} strokeWidth={1.5} />
                        </div>
                        {item.badge && (
                          <span
                            className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                            style={{ color: item.accent, background: item.accent + '18', border: `1px solid ${item.accent}30` }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-white font-black text-base sm:text-lg leading-tight mb-2">
                          {item.label}
                        </h3>
                        <p className="text-white/45 text-xs sm:text-sm leading-relaxed">
                          {item.descricao}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 mt-4" style={{ color: item.accent }}>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          Explorar
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Divisor */}
          <div className="h-px w-full my-14" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)' }} />

          {/* Por Área */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-6 rounded-full bg-brand-rose" style={{ boxShadow: '0 0 10px #ff2d5580' }} />
              <h2 className="font-display font-black text-sm uppercase tracking-widest text-brand-rose">
                Por Área
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
                      <div
                        className="p-2.5 rounded-xl shrink-0"
                        style={{ background: item.accent + '15', border: `1px solid ${item.accent}28` }}
                      >
                        <Icone className="w-5 h-5" style={{ color: item.accent }} strokeWidth={1.5} />
                      </div>
                      <span className="text-white/70 group-hover:text-white font-bold text-sm transition-colors duration-150">
                        {item.label}
                      </span>
                      <ChevronRight
                        className="w-3.5 h-3.5 ml-auto shrink-0 text-white/20 group-hover:text-white/50 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
