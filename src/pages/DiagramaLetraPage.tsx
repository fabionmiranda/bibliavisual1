import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, BookOpen, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BIBLE_DATA } from '../data/bibleData';
import { BOOK_CONFIG } from './LivroPage';

export default function DiagramaLetraPage() {
  const { livro: livroId = '', indice = '1', letra = '' } = useParams<{
    livro: string;
    indice: string;
    letra: string;
  }>();

  const livroData  = BIBLE_DATA.livros.find(l => l.id === livroId);
  const testamento = livroData?.testamento ?? 'AT';
  const cfg        = BOOK_CONFIG[livroId];
  const Icone      = cfg?.icon ?? BookOpen;
  const corHex     = testamento === 'AT' ? '#00d4ff' : '#ff2d55';

  const baseSecao  = `/${livroId}/estrutura/${indice}`;
  const baseEstrutura = `/${livroId}/estrutura`;

  // Converte slug de volta para exibicao: a-prime -> A', b -> B
  function exibirLetra(slug: string): string {
    return slug.replace(/-prime/g, "'").toUpperCase();
  }

  const letraDisplay = exibirLetra(letra);

  return (
    <div className="min-h-screen flex flex-col bg-bg-deep text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/60 mb-12 flex-wrap font-mono">
          <Link to="/biblioteca" className="hover:text-brand-blue transition-colors font-bold">Biblioteca</Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          <Link to={baseEstrutura} className="hover:text-brand-blue transition-colors font-bold text-white/80">
            {livroData?.nome ?? livroId}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          <Link to={baseSecao} className="hover:text-brand-blue transition-colors text-white/60">
            Secao {indice}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          <span className="font-black" style={{ color: corHex }}>{letraDisplay}</span>
        </nav>

        {/* Cabecalho */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-5 mb-14"
        >
          {cfg && (
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${cfg.grad} border border-white/10 shadow-2xl shrink-0`}>
              <Icone className="w-10 h-10 sm:w-12 sm:h-12 text-white/90" strokeWidth={1.2} />
            </div>
          )}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.4em] font-black mb-1"
              style={{ color: corHex }}>
              {livroData?.nome ?? livroId} — Secao {indice}
            </p>
            <h1 className="font-display font-black text-5xl sm:text-7xl uppercase tracking-tighter leading-none"
              style={{ color: corHex, textShadow: `0 0 40px ${corHex}60` }}>
              {letraDisplay}
            </h1>
          </div>
        </motion.div>

        {/* Area de diagramas */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-white/[0.08] p-8 sm:p-14 text-center"
          style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))' }}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-mono font-black text-3xl border-2"
              style={{
                color: corHex,
                borderColor: corHex + '60',
                background: corHex + '15',
                boxShadow: `0 0 30px ${corHex}30`,
              }}>
              {letraDisplay}
            </div>
            <div className="space-y-2">
              <p className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white/70">
                Diagramas em breve
              </p>
              <p className="text-white/40 text-sm sm:text-base max-w-sm leading-relaxed">
                Os diagramas expositivos para esta divisao serao adicionados em breve pelo administrador.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Voltar */}
        <div className="mt-12">
          <Link to={baseSecao}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20
              text-sm font-black text-white hover:border-brand-blue hover:text-brand-blue
              transition-all duration-200 hover:scale-105 active:scale-95 font-mono uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Voltar para Secao {indice}
          </Link>
        </div>

      </main>
      <Footer />
    </div>
  );
}
