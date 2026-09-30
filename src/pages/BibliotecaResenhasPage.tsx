import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Star, Library, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RESENHAS = [
  {
    slug: 'gonzalez-era-reformadores-cap1',
    titulo: 'A Era dos Reformadores',
    tituloDestaque: 'Isabel, a Católica',
    subtitulo: 'A Reforma Antes da Reforma',
    autor: 'Justo L. González',
    ano: '1995',
    editora: 'Vida Nova',
    referencia: 'Vol. 6 · Cap. I · p. 19–41',
    area: 'História da Igreja',
    parte: 1,
    categorias: ['Reforma Protestante', 'História Medieval', 'Igreja e Estado'],
    sinopse:
      'González escolhe começar a história da Reforma pela Espanha de Isabel I — demonstrando que a Reforma do século XVI foi gestada num cenário cujas raízes antecedem Lutero em décadas.',
    accentColor: '#fb7185',
    accentRgb: '251,113,133',
    gradHero: 'linear-gradient(135deg, #1a0010 0%, #180010 50%, #0d0818 100%)',
    foto: 'https://commons.wikimedia.org/wiki/Special:FilePath/Isabel_la_Cat%C3%B3lica-2.jpg',
    fotoCredito: 'Isabel I de Castela · séc. XV · domínio público',
  },
  {
    slug: 'gonzalez-lutero-cap2',
    titulo: 'Martinho Lutero',
    tituloDestaque: 'A Peregrinação que Mudou o Mundo',
    subtitulo: 'A Crise que Gerou uma Época',
    autor: 'Justo L. González',
    ano: '1995',
    editora: 'Vida Nova',
    referencia: 'Vol. 6 · Cap. II · p. 43–63',
    area: 'História da Igreja',
    parte: 2,
    categorias: ['Reforma Protestante', 'Lutero', 'Justificação pela Fé'],
    sinopse:
      'Lutero não planejou a Reforma. González apresenta um homem em crise existencial profunda cuja descoberta de Rm 1:17 — e a coragem de não recuar em Worms — gerou a maior ruptura da história cristã ocidental.',
    accentColor: '#f97316',
    accentRgb: '249,115,22',
    gradHero: 'linear-gradient(135deg, #140800 0%, #100c00 50%, #0d0818 100%)',
    foto: 'https://commons.wikimedia.org/wiki/Special:FilePath/Martin_Luther_by_Cranach-restoration.jpg',
    fotoCredito: 'Martinho Lutero · Lucas Cranach · 1529 · domínio público',
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
                  className="group block rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 hover:shadow-2xl hover:scale-[1.008] active:scale-[0.998] transition-all duration-300"
                  style={{ background: r.gradHero, position: 'relative' }}
                >
                  {/* ── Foto de fundo do personagem ── */}
                  {r.foto && (
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl">
                      <img
                        src={r.foto}
                        alt={r.tituloDestaque}
                        className="absolute top-0 right-0 h-full object-cover object-top"
                        style={{
                          width: 'clamp(160px, 35%, 320px)',
                          filter: 'sepia(30%) contrast(0.85) brightness(0.55)',
                          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
                          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
                        }}
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                      {/* overlay gradiente para legibilidade */}
                      <div className="absolute inset-0"
                        style={{ background: `linear-gradient(to right, ${r.gradHero.match(/#\w+/)?.[0] ?? '#000'} 30%, rgba(0,0,0,0) 80%)` }} />
                    </div>
                  )}

                  {/* ── Conteúdo ── */}
                  <div className="relative z-10 flex flex-col sm:flex-row gap-0">

                    {/* Coluna esquerda: badge Dia + ícone */}
                    <div
                      className="flex sm:flex-col items-center justify-start sm:justify-center gap-4 sm:gap-3 px-6 pt-6 pb-2 sm:py-8 sm:px-6"
                      style={{ minWidth: 'clamp(100px,18vw,160px)', flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      {/* badge DIA XX */}
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className="rounded-xl px-4 py-2 flex items-center gap-2"
                          style={{ background: r.accentColor, boxShadow: `0 0 22px ${r.accentColor}55` }}
                        >
                          <span style={{ fontSize: 20, fontWeight: 900, color: '#000', letterSpacing: '0.06em', lineHeight: 1 }}>
                            DIA {String(r.parte).padStart(2, '0')}
                          </span>
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-[0.22em]"
                          style={{ color: r.accentColor + 'aa' }}>de 31</span>
                      </div>

                      {/* crédito foto — só desktop */}
                      {r.foto && (
                        <span className="hidden sm:block text-[7px] font-bold text-center leading-relaxed"
                          style={{ color: 'rgba(255,255,255,0.22)', maxWidth: 100 }}>
                          {r.fotoCredito}
                        </span>
                      )}
                    </div>

                    {/* Coluna direita: conteúdo */}
                    <div className="flex flex-col justify-between p-6 sm:p-8 gap-4 flex-1">
                      <div>
                        {/* badges topo */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span
                            className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                            style={{ color: r.accentColor, background: r.accentColor + '18', border: `1px solid ${r.accentColor}30` }}
                          >
                            <Library className="w-2.5 h-2.5" />
                            {r.area}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-amber-400/80 bg-amber-400/10 border border-amber-400/20">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            Destaque
                          </span>
                        </div>

                        {/* título */}
                        <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-1"
                          style={{ color: r.accentColor + 'aa' }}>{r.titulo}</p>
                        <h2 className="font-display font-black text-xl sm:text-2xl text-white leading-tight mb-1">
                          {r.tituloDestaque}
                        </h2>
                        <p className="text-white/60 text-xs italic mb-4">{r.subtitulo}</p>

                        {/* meta */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {[r.autor, r.editora, r.referencia].map(m => (
                            <span key={m} className="px-3 py-1 rounded-lg text-[10px] font-bold text-white/70 bg-white/6 border border-white/10">
                              {m}
                            </span>
                          ))}
                        </div>

                        {/* sinopse */}
                        <p className="text-white/78 text-sm leading-relaxed line-clamp-3">
                          {r.sinopse}
                        </p>
                      </div>

                      {/* rodapé */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/8">
                        <div className="flex flex-wrap gap-1.5">
                          {r.categorias.map(c => (
                            <span key={c} className="px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-white/50 border border-white/10">
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
