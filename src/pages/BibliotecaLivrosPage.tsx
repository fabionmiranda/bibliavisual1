import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, ChevronRight, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LIVROS = [
  {
    slug: 'is-there-meaning',
    titulo: 'Is There Meaning in This Text?',
    subtitulo: 'The Bible, the Reader, and the Morality of Literary Knowledge',
    autor: 'Kevin J. Vanhoozer',
    ano: '1998',
    editora: 'Zondervan',
    capa: '/livros/is-there-meaning.jpg',
    categorias: ['Hermenêutica', 'Filosofia da Linguagem'],
    sinopse:
      'Um dos livros mais importantes sobre hermenêutica bíblica. Vanhoozer responde à crise interpretativa pós-moderna com rigor filosófico e profundidade teológica — defendendo que o texto tem um significado real, determinado pelo autor, e que interpretá-lo bem é um ato moral.',
    destaque: true,
    nota: 5,
    accentColor: '#a855f7',
    grad: 'from-violet-950 via-purple-950 to-slate-950',
  },
];

export default function BibliotecaLivrosPage() {
  return (
    <div className="min-h-screen relative">
      <Navbar />

      <section className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-10 text-[10px] font-black uppercase tracking-widest text-white/30"
          >
            <Link to="/biblioteca" className="hover:text-brand-blue transition-colors">Biblioteca</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/55">Livros Recomendados</span>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <p className="text-[10px] font-black tracking-[0.35em] uppercase text-brand-blue mb-3">
              Seleção Curada
            </p>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight mb-3">
              Livros Recomendados
            </h1>
            <p className="text-white/40 text-sm sm:text-base max-w-lg leading-relaxed">
              Obras selecionadas que moldam pregadores, teólogos e estudiosos sérios da Palavra.
            </p>
          </motion.div>

          {/* Lista de livros */}
          <div className="flex flex-col gap-5">
            {LIVROS.map((livro, i) => (
              <motion.div
                key={livro.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/biblioteca/livros/${livro.slug}`}
                  className={`group grid grid-cols-1 sm:grid-cols-[160px_1fr] lg:grid-cols-[200px_1fr] gap-6 sm:gap-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${livro.grad} border border-white/10 hover:border-white/25 hover:scale-[1.01] hover:shadow-2xl active:scale-[0.99] transition-all duration-300`}
                >
                  {/* Capa */}
                  <div className="relative w-full max-w-[160px] mx-auto sm:mx-0">
                    <div
                      className="absolute -inset-3 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                      style={{ background: livro.accentColor }}
                    />
                    <img
                      src={livro.capa}
                      alt={`Capa de ${livro.titulo}`}
                      className="relative w-full rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] border border-white/10 object-cover"
                      style={{ aspectRatio: '2/3', objectFit: 'cover' }}
                      onError={e => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-full rounded-xl border border-white/10 bg-white/5 flex flex-col items-center justify-center p-4 gap-2" style={{ aspectRatio: '2/3' }}>
                      <BookOpen className="w-10 h-10 text-white/20" strokeWidth={1} />
                      <span className="text-white/30 text-[9px] text-center font-bold">{livro.titulo}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-between gap-4">
                    <div>
                      {livro.destaque && (
                        <span
                          className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-3"
                          style={{ color: livro.accentColor, background: livro.accentColor + '18', border: `1px solid ${livro.accentColor}30` }}
                        >
                          <Star className="w-2.5 h-2.5 fill-current" />
                          Destaque
                        </span>
                      )}
                      <h2 className="font-display font-black text-xl sm:text-2xl text-white leading-tight mb-1">
                        {livro.titulo}
                      </h2>
                      <p className="text-white/35 text-xs italic mb-3">{livro.subtitulo}</p>
                      <p className="text-white/55 text-[11px] font-bold uppercase tracking-wider mb-4">
                        {livro.autor} · {livro.editora} · {livro.ano}
                      </p>
                      <p className="text-white/50 text-sm leading-relaxed line-clamp-3 sm:line-clamp-4">
                        {livro.sinopse}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        {livro.categorias.map(c => (
                          <span key={c} className="px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-white/40 border border-white/10">
                            {c}
                          </span>
                        ))}
                      </div>
                      <span
                        className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-all duration-200 group-hover:gap-2.5"
                        style={{ color: livro.accentColor }}
                      >
                        Ver completo
                        <ChevronRight className="w-3.5 h-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform duration-200" />
                      </span>
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
              className="inline-flex items-center gap-2 text-white/35 hover:text-white text-xs font-black uppercase tracking-widest transition-colors"
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
