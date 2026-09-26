import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Star, Library, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ── Ícone SVG: coroa (Isabel) ─────────────────────────────────────────────────
function IconCoroa({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <path
        d="M8 48 L12 24 L24 36 L32 12 L40 36 L52 24 L56 48 Z"
        stroke={color} strokeWidth="2.5" strokeLinejoin="round"
        fill={color + '18'}
      />
      <circle cx="12" cy="22" r="3" fill={color} opacity="0.7" />
      <circle cx="32" cy="10" r="4" fill={color} opacity="0.9" />
      <circle cx="52" cy="22" r="3" fill={color} opacity="0.7" />
      <rect x="8" y="48" width="48" height="5" rx="2.5" fill={color} opacity="0.5" />
    </svg>
  );
}

// ── Ícone SVG: chama + martelo (Lutero) ──────────────────────────────────────
function IconChama({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      {/* chama */}
      <path
        d="M32 52 C18 52 12 40 14 30 C16 20 22 18 22 18 C20 26 26 28 26 28 C24 20 30 10 32 8 C34 10 36 16 34 22 C38 16 40 20 40 28 C44 24 44 18 42 14 C48 18 52 26 50 36 C48 46 42 52 32 52 Z"
        stroke={color} strokeWidth="2" strokeLinejoin="round"
        fill={color + '22'}
      />
      <circle cx="32" cy="38" r="5" fill={color} opacity="0.5" />
      {/* tese / pergaminho */}
      <rect x="20" y="44" width="24" height="3" rx="1.5" fill={color} opacity="0.4" />
      <rect x="24" y="49" width="16" height="2" rx="1" fill={color} opacity="0.25" />
    </svg>
  );
}

const RESENHAS = [
  {
    slug: 'gonzalez-era-reformadores-cap1',
    parteRomano: 'I',
    titulo: 'A Era dos Reformadores',
    tituloDestaque: 'Isabel, a Católica',
    subtitulo: 'A Reforma Antes da Reforma',
    autor: 'Justo L. González',
    ano: '1995',
    editora: 'Vida Nova',
    referencia: 'Vol. 6 · Cap. I · p. 19–41',
    area: 'História da Igreja',
    serie: 'Resenhas da Reforma Protestante',
    parte: 1,
    categorias: ['Reforma Protestante', 'História Medieval', 'Igreja e Estado'],
    sinopse:
      'González escolhe começar a história da Reforma pela Espanha de Isabel I — demonstrando que a Reforma do século XVI foi gestada num cenário cujas raízes antecedem Lutero em décadas.',
    accentColor: '#fb7185',
    gradHero: 'linear-gradient(135deg, #1a0010 0%, #180010 50%, #0d0818 100%)',
    gradOrb1: '#fb7185',
    gradOrb2: '#a855f7',
    IconFigura: IconCoroa,
  },
  {
    slug: 'gonzalez-lutero-cap2',
    parteRomano: 'II',
    titulo: 'Martinho Lutero',
    tituloDestaque: 'A Peregrinação que Mudou o Mundo',
    subtitulo: 'A Crise que Gerou uma Época',
    autor: 'Justo L. González',
    ano: '1995',
    editora: 'Vida Nova',
    referencia: 'Vol. 6 · Cap. II · p. 43–63',
    area: 'História da Igreja',
    serie: 'Resenhas da Reforma Protestante',
    parte: 2,
    categorias: ['Reforma Protestante', 'Lutero', 'Justificação pela Fé'],
    sinopse:
      'Lutero não planejou a Reforma. González apresenta um homem em crise existencial profunda cuja descoberta de Rm 1:17 — e a coragem de não recuar em Worms — gerou a maior ruptura da história cristã ocidental.',
    accentColor: '#f97316',
    gradHero: 'linear-gradient(135deg, #140800 0%, #100c00 50%, #0d0818 100%)',
    gradOrb1: '#f97316',
    gradOrb2: '#fbbf24',
    IconFigura: IconChama,
  },
];

export default function BibliotecaResenhasPage() {
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
            <span className="text-white/75">Resenhas</span>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <p className="text-[10px] font-black tracking-[0.35em] uppercase text-[#fb7185] mb-3">
              Análise Crítica
            </p>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight mb-3">
              Resenhas
            </h1>
            <p className="text-white/60 text-sm sm:text-base max-w-lg leading-relaxed">
              Análises detalhadas de obras importantes para o ministério, a pregação e o estudo teológico.
            </p>
          </motion.div>

          {/* Banner de série */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex items-center gap-4 mb-10 p-4 rounded-2xl border border-[#fb7185]/20 bg-[#fb7185]/5"
          >
            <div className="w-9 h-9 rounded-xl bg-[#fb7185]/15 flex items-center justify-center flex-shrink-0">
              <Library className="w-4 h-4 text-[#fb7185]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#fb7185]/70 mb-0.5">Série em andamento</p>
              <p className="text-white/85 text-xs font-bold">Resenhas da Reforma Protestante</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              {[1, 2].map(n => (
                <div key={n} className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black bg-white/10 text-white/50 border border-white/10">
                  {n}
                </div>
              ))}
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black bg-white/5 text-white/20 border border-white/5 border-dashed">
                +
              </div>
            </div>
          </motion.div>

          {/* ── Cards ─────────────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            {RESENHAS.map((r, i) => (
              <motion.div
                key={r.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
              >
                <Link
                  to={`/biblioteca/resenhas/${r.slug}`}
                  className="group block rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 hover:shadow-2xl hover:scale-[1.008] active:scale-[0.998] transition-all duration-300"
                  style={{ background: r.gradHero }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr]">

                    {/* ── Painel visual esquerdo ─────────────────────────────── */}
                    <div
                      className="relative flex flex-col items-center justify-center p-8 sm:p-0 min-h-[200px] sm:min-h-0 overflow-hidden"
                      style={{ borderRight: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      {/* glow de fundo */}
                      <div
                        className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity duration-500"
                        style={{ background: `radial-gradient(ellipse at center, ${r.gradOrb1} 0%, transparent 70%)` }}
                      />
                      <div
                        className="absolute bottom-0 right-0 w-32 h-32 blur-3xl opacity-15"
                        style={{ background: r.gradOrb2 }}
                      />

                      {/* número romano grande decorativo */}
                      <div
                        className="absolute top-4 left-0 right-0 text-center font-black leading-none select-none pointer-events-none"
                        style={{
                          fontSize: '120px',
                          color: r.accentColor,
                          opacity: 0.06,
                          letterSpacing: '-0.05em',
                        }}
                      >
                        {r.parteRomano}
                      </div>

                      {/* ícone SVG temático */}
                      <div className="relative z-10 w-20 h-20 mb-4">
                        <div
                          className="absolute inset-0 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                          style={{ background: r.accentColor }}
                        />
                        <div className="relative w-full h-full">
                          <r.IconFigura color={r.accentColor} />
                        </div>
                      </div>

                      {/* badge Parte N */}
                      <div
                        className="relative z-10 flex flex-col items-center gap-1"
                      >
                        <span
                          className="text-[8px] font-black uppercase tracking-[0.3em]"
                          style={{ color: r.accentColor + '80' }}
                        >
                          Série
                        </span>
                        <div
                          className="px-4 py-1.5 rounded-full border font-black text-[11px] uppercase tracking-widest"
                          style={{
                            color: r.accentColor,
                            background: r.accentColor + '18',
                            borderColor: r.accentColor + '35',
                          }}
                        >
                          Parte {r.parteRomano}
                        </div>
                      </div>
                    </div>

                    {/* ── Conteúdo direito ───────────────────────────────────── */}
                    <div className="flex flex-col justify-between p-6 sm:p-8 gap-5">
                      <div>
                        {/* badges topo */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span
                            className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                            style={{ color: r.accentColor, background: r.accentColor + '15', border: `1px solid ${r.accentColor}28` }}
                          >
                            <Library className="w-2.5 h-2.5" />
                            {r.serie}
                          </span>
                          <span
                            className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-amber-400/80 bg-amber-400/10 border border-amber-400/20"
                          >
                            <Star className="w-2.5 h-2.5 fill-current" />
                            Destaque
                          </span>
                        </div>

                        {/* título */}
                        <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-1" style={{ color: r.accentColor + 'aa' }}>
                          {r.titulo}
                        </p>
                        <h2 className="font-display font-black text-xl sm:text-2xl text-white leading-tight mb-1">
                          {r.tituloDestaque}
                        </h2>
                        <p className="text-white/55 text-xs italic mb-4">{r.subtitulo}</p>

                        {/* meta */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {[r.autor, r.editora, r.referencia].map(m => (
                            <span key={m} className="px-3 py-1 rounded-lg text-[10px] font-bold text-white/65 bg-white/5 border border-white/8">
                              {m}
                            </span>
                          ))}
                        </div>

                        {/* sinopse */}
                        <p className="text-white/75 text-sm leading-relaxed line-clamp-3">
                          {r.sinopse}
                        </p>
                      </div>

                      {/* rodapé do card */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/6">
                        <div className="flex flex-wrap gap-1.5">
                          {r.categorias.map(c => (
                            <span key={c} className="px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-white/55 border border-white/8">
                              {c}
                            </span>
                          ))}
                        </div>
                        <span
                          className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-all duration-200 group-hover:gap-3"
                          style={{ color: r.accentColor }}
                        >
                          <BookOpen className="w-3.5 h-3.5" strokeWidth={2} />
                          Ler resenha
                          <ChevronRight className="w-3.5 h-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform duration-200" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Voltar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <Link
              to="/biblioteca"
              className="inline-flex items-center gap-2 text-white/55 hover:text-white text-xs font-black uppercase tracking-widest transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar para a Biblioteca
            </Link>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
