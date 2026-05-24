import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ChevronRight, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import ChapterStudy from '../components/ChapterStudy';
import type { SectionEntry } from './LivroPage';

interface EstudoPageProps {
  testamento: 'AT' | 'NT';
}

export default function EstudoPage({ testamento }: EstudoPageProps) {
  const { livro: livroParam } = useParams<{ livro: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const livroId = livroParam ?? '';
  const storageKey = `study_${livroId}`;
  const basePath = `/${testamento.toLowerCase()}/${livroId}`;
  const secaoIndex = parseInt(searchParams.get('secao') ?? '0', 10);

  // Load sections from localStorage
  let sections: SectionEntry[] | null = null;
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) sections = JSON.parse(stored) as SectionEntry[];
  } catch {
    /* ignore */
  }

  const section = sections?.[secaoIndex] ?? null;
  const total = sections?.length ?? 0;
  const hasPrev = secaoIndex > 0;
  const hasNext = secaoIndex < total - 1;

  if (!section) {
    return (
      <div className="min-h-screen bg-bg-deep text-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center gap-6 px-4 text-center pt-24 pb-16">
          <BookOpen className="w-16 h-16 text-white/20" />
          <p className="text-xl sm:text-2xl text-white/60 max-w-md">
            Nenhum estudo carregado. Volte ao livro e carregue um arquivo .txt.
          </p>
          <Link
            to={basePath}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue/20 border border-brand-blue/40 text-brand-blue hover:bg-brand-blue/30 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao livro
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-deep text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-white/40 mb-6">
          <Link to="/biblioteca" className="hover:text-brand-blue transition-colors">
            Biblioteca
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={basePath} className="hover:text-brand-blue transition-colors">
            {livroId}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white/70 truncate max-w-[200px]">{section.title}</span>
        </nav>

        {/* Section title + navigation */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-brand-blue font-semibold mb-1">
              Seção {secaoIndex + 1} de {total}
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              {section.title}
            </h1>
          </div>

          {total > 1 && (
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                disabled={!hasPrev}
                onClick={() => navigate(`${basePath}/estudo?secao=${secaoIndex - 1}`)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-white/60 hover:border-brand-blue/60 hover:text-brand-blue disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </button>
              <button
                disabled={!hasNext}
                onClick={() => navigate(`${basePath}/estudo?secao=${secaoIndex + 1}`)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-white/60 hover:border-brand-blue/60 hover:text-brand-blue disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Próxima
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>

        {/* Study content */}
        <motion.div
          key={secaoIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <ChapterStudy estudo={section.estudo} />
        </motion.div>

        {/* Bottom navigation */}
        {total > 1 && (
          <div className="flex items-center justify-between mt-12 gap-4">
            <button
              disabled={!hasPrev}
              onClick={() => navigate(`${basePath}/estudo?secao=${secaoIndex - 1}`)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:border-brand-blue/60 hover:text-brand-blue disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Seção anterior
            </button>
            <button
              disabled={!hasNext}
              onClick={() => navigate(`${basePath}/estudo?secao=${secaoIndex + 1}`)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:border-brand-blue/60 hover:text-brand-blue disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Próxima seção
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
