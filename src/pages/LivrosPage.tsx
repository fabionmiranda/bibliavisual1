import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';
import Navbar from '../components/Navbar';

const AT = [
  'Gênesis','Êxodo','Levítico','Números','Deuteronômio','Josué','Juízes','Rute',
  '1 Samuel','2 Samuel','1 Reis','2 Reis','1 Crônicas','2 Crônicas','Esdras',
  'Neemias','Ester','Jó','Salmos','Provérbios','Eclesiastes','Cantares','Isaías',
  'Jeremias','Lamentações','Ezequiel','Daniel','Oseias','Joel','Amós','Obadias',
  'Jonas','Miquéias','Naum','Habacuque','Sofonias','Ageu','Zacarias','Malaquias',
];

const NT = [
  'Mateus','Marcos','Lucas','João','Atos','Romanos','1 Coríntios','2 Coríntios',
  'Gálatas','Efésios','Filipenses','Colossenses','1 Tessalonicenses','2 Tessalonicenses',
  '1 Timóteo','2 Timóteo','Tito','Filemom','Hebreus','Tiago','1 Pedro','2 Pedro',
  '1 João','2 João','3 João','Judas','Apocalipse',
];

const ENABLED: Record<string, string> = {
  Mateus: '/livros/mateus',
};

function BookButton({ name }: { name: string }) {
  const href = ENABLED[name];
  const enabled = !!href;

  if (enabled) {
    return (
      <Link to={href}>
        <motion.div
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="relative px-4 py-3 rounded-xl border border-brand-blue/50 bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider text-center cursor-pointer transition-all hover:bg-brand-blue/20 hover:border-brand-blue shadow-[0_0_12px_rgba(0,212,255,0.15)]"
        >
          {name}
        </motion.div>
      </Link>
    );
  }

  return (
    <div className="relative px-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.02] text-white/25 text-xs font-bold uppercase tracking-wider text-center cursor-not-allowed flex items-center justify-center gap-1.5">
      <Lock className="w-2.5 h-2.5 opacity-60" />
      <span className="truncate">{name}</span>
    </div>
  );
}

export default function LivrosPage() {
  return (
    <div className="min-h-screen bg-bg-deep">
      <Navbar />
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="font-display text-[9px] tracking-[0.4em] text-brand-blue/70 uppercase mb-3">
            Bíblia Visual Expositiva
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
            Livros da Bíblia
          </h1>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Selecione um livro para explorar sua estrutura literária, quiasmas e diagramas expositivos.
            Os livros destacados estão disponíveis nesta versão.
          </p>
        </motion.div>

        {/* NT */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="font-display text-[9px] tracking-[0.35em] text-brand-blue uppercase">
              Novo Testamento
            </span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {NT.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.025 }}
              >
                <BookButton name={name} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* AT */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="font-display text-[9px] tracking-[0.35em] text-white/40 uppercase">
              Antigo Testamento
            </span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {AT.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.018 }}
              >
                <BookButton name={name} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-white/20 text-xs mt-14 tracking-widest uppercase"
        >
          Novos livros em breve
        </motion.p>
      </div>
    </div>
  );
}
