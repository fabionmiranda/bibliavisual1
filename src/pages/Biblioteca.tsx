import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import {
  Sparkles, Flame, BookOpen, Compass, Scroll, Shield, Scale,
  Wheat, Crown, Building, Library, Music, Lightbulb, Sun, Heart,
  Eye, Droplets, Fish, Mountain, Star, Zap, CloudLightning,
  Anchor, Globe, Unlock, Trophy, Cloud, Users, Swords,
  Flower2, HeartHandshake, Cross, Search, X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BIBLE_DATA } from '../data/bibleData';

type BookConfig = { icon: LucideIcon; grad: string };

const BOOK_CONFIG: Record<string, BookConfig> = {
  genesis:              { icon: Sparkles,       grad: 'from-indigo-950 via-blue-950 to-slate-950' },
  exodo:                { icon: Flame,          grad: 'from-orange-950 via-red-950 to-slate-950' },
  levitico:             { icon: BookOpen,       grad: 'from-yellow-950 via-amber-950 to-slate-950' },
  numeros:              { icon: Compass,        grad: 'from-amber-950 via-orange-950 to-slate-950' },
  deuteronomio:         { icon: Scroll,         grad: 'from-stone-900 via-yellow-950 to-slate-950' },
  josue:                { icon: Swords,         grad: 'from-green-950 via-teal-950 to-slate-950' },
  juizes:               { icon: Scale,          grad: 'from-red-950 via-rose-950 to-slate-950' },
  rute:                 { icon: Wheat,          grad: 'from-yellow-900 via-lime-950 to-slate-950' },
  '1-samuel':           { icon: Crown,          grad: 'from-violet-950 via-purple-950 to-slate-950' },
  '2-samuel':           { icon: Crown,          grad: 'from-purple-950 via-violet-950 to-slate-950' },
  '1-reis':             { icon: Building,       grad: 'from-amber-950 via-yellow-950 to-slate-950' },
  '2-reis':             { icon: Flame,          grad: 'from-red-950 via-orange-950 to-slate-950' },
  '1-cronicas':         { icon: Library,        grad: 'from-slate-800 via-zinc-900 to-slate-950' },
  '2-cronicas':         { icon: Building,       grad: 'from-zinc-800 via-slate-900 to-slate-950' },
  esdras:               { icon: Scroll,         grad: 'from-teal-950 via-cyan-950 to-slate-950' },
  neemias:              { icon: Shield,         grad: 'from-stone-800 via-zinc-900 to-slate-950' },
  ester:                { icon: Crown,          grad: 'from-rose-950 via-pink-950 to-slate-950' },
  jo:                   { icon: CloudLightning, grad: 'from-slate-800 via-gray-900 to-slate-950' },
  salmos:               { icon: Music,          grad: 'from-sky-950 via-blue-950 to-slate-950' },
  proverbios:           { icon: Lightbulb,      grad: 'from-yellow-800 via-amber-900 to-slate-950' },
  eclesiastes:          { icon: Sun,            grad: 'from-orange-900 via-amber-950 to-slate-950' },
  canticos:             { icon: Flower2,        grad: 'from-pink-950 via-rose-950 to-slate-950' },
  isaias:               { icon: Eye,            grad: 'from-blue-900 via-indigo-950 to-slate-950' },
  jeremias:             { icon: Droplets,       grad: 'from-slate-800 via-blue-950 to-slate-950' },
  lamentacoes:          { icon: Droplets,       grad: 'from-gray-800 via-slate-900 to-slate-950' },
  ezequiel:             { icon: Eye,            grad: 'from-purple-950 via-indigo-950 to-slate-950' },
  daniel:               { icon: Shield,         grad: 'from-amber-900 via-yellow-950 to-slate-950' },
  oseias:               { icon: Heart,          grad: 'from-rose-900 via-pink-950 to-slate-950' },
  joel:                 { icon: CloudLightning, grad: 'from-orange-950 via-red-950 to-slate-950' },
  amos:                 { icon: Scale,          grad: 'from-stone-900 via-amber-950 to-slate-950' },
  obadias:              { icon: Mountain,       grad: 'from-zinc-800 via-stone-900 to-slate-950' },
  jonas:                { icon: Fish,           grad: 'from-cyan-950 via-teal-950 to-slate-950' },
  miqueias:             { icon: Scale,          grad: 'from-teal-950 via-green-950 to-slate-950' },
  naum:                 { icon: Swords,         grad: 'from-red-950 via-rose-950 to-slate-950' },
  habacuque:            { icon: Eye,            grad: 'from-sky-950 via-slate-900 to-slate-950' },
  sofonias:             { icon: Flame,          grad: 'from-orange-950 via-amber-950 to-slate-950' },
  ageu:                 { icon: Building,       grad: 'from-yellow-950 via-amber-950 to-slate-950' },
  zacarias:             { icon: Star,           grad: 'from-indigo-950 via-violet-950 to-slate-950' },
  malaquias:            { icon: Sun,            grad: 'from-yellow-900 via-orange-950 to-slate-950' },
  mateus:               { icon: Star,           grad: 'from-blue-950 via-indigo-950 to-slate-950' },
  marcos:               { icon: Zap,            grad: 'from-green-950 via-teal-950 to-slate-950' },
  lucas:                { icon: Heart,          grad: 'from-sky-900 via-blue-950 to-slate-950' },
  joao:                 { icon: Sparkles,       grad: 'from-cyan-950 via-blue-950 to-slate-950' },
  atos:                 { icon: Flame,          grad: 'from-orange-900 via-red-950 to-slate-950' },
  romanos:              { icon: Anchor,         grad: 'from-slate-800 via-zinc-900 to-slate-950' },
  '1-corintios':        { icon: Cross,          grad: 'from-blue-950 via-sky-950 to-slate-950' },
  '2-corintios':        { icon: Shield,         grad: 'from-teal-950 via-cyan-950 to-slate-950' },
  galatas:              { icon: Unlock,         grad: 'from-green-950 via-emerald-950 to-slate-950' },
  efesios:              { icon: Shield,         grad: 'from-violet-950 via-purple-950 to-slate-950' },
  filipenses:           { icon: Trophy,         grad: 'from-yellow-900 via-amber-950 to-slate-950' },
  colossenses:          { icon: Globe,          grad: 'from-indigo-950 via-blue-950 to-slate-950' },
  '1-tessalonicenses':  { icon: Cloud,          grad: 'from-sky-950 via-indigo-950 to-slate-950' },
  '2-tessalonicenses':  { icon: Zap,            grad: 'from-gray-800 via-slate-900 to-slate-950' },
  '1-timoteo':          { icon: BookOpen,       grad: 'from-stone-800 via-zinc-900 to-slate-950' },
  '2-timoteo':          { icon: Crown,          grad: 'from-amber-900 via-yellow-950 to-slate-950' },
  tito:                 { icon: Users,          grad: 'from-teal-950 via-slate-900 to-slate-950' },
  filemom:              { icon: HeartHandshake, grad: 'from-rose-950 via-pink-950 to-slate-950' },
  hebreus:              { icon: Building,       grad: 'from-yellow-950 via-amber-950 to-slate-950' },
  tiago:                { icon: Wheat,          grad: 'from-green-950 via-lime-950 to-slate-950' },
  '1-pedro':            { icon: Anchor,         grad: 'from-blue-950 via-sky-950 to-slate-950' },
  '2-pedro':            { icon: Mountain,       grad: 'from-slate-800 via-gray-900 to-slate-950' },
  '1-joao':             { icon: Heart,          grad: 'from-rose-950 via-red-950 to-slate-950' },
  '2-joao':             { icon: Heart,          grad: 'from-pink-950 via-rose-950 to-slate-950' },
  '3-joao':             { icon: Users,          grad: 'from-emerald-950 via-green-950 to-slate-950' },
  judas:                { icon: Flame,          grad: 'from-red-950 via-orange-950 to-slate-950' },
  apocalipse:           { icon: Star,           grad: 'from-indigo-950 via-violet-950 to-purple-950' },
};

const livrosAT = BIBLE_DATA.livros.filter(l => l.testamento === 'AT');
const livrosNT = BIBLE_DATA.livros.filter(l => l.testamento === 'NT');

function CardLivro({ livro, cor, index }: {
  livro: typeof livrosAT[0];
  cor: string;
  index: number;
}) {
  const cfg   = BOOK_CONFIG[livro.id] ?? { icon: BookOpen, grad: 'from-slate-900 to-slate-950' };
  const Icone = cfg.icon;
  const grad  = cfg.grad;

  const comEstudo = livro.capitulos.filter(c => c.estudo).length;
  const totalCaps = livro.capitulos.length;
  const rota = `/${livro.id}/estrutura`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.02, 0.6), duration: 0.4 }}
    >
      <Link
        to={rota}
        className={`group flex flex-col items-center justify-between p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${grad} border border-white/10 hover:border-white/30 hover:scale-[1.04] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] active:scale-[0.98] transition-all duration-300 aspect-[3/4] w-full`}
      >
        {/* Ícone */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/8 group-hover:bg-white/15 transition-colors duration-300 shadow-inner">
            <Icone
              className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-${cor} group-hover:scale-110 transition-transform duration-300 drop-shadow-lg`}
              strokeWidth={1.2}
            />
          </div>
        </div>

        {/* Texto */}
        <div className="w-full text-center space-y-2 mt-3">
          <p className="text-white font-black text-lg sm:text-xl md:text-2xl lg:text-2xl leading-tight tracking-tight drop-shadow-md">
            {livro.nome}
          </p>
          <p className={`text-xs sm:text-sm font-bold uppercase tracking-widest text-${cor}`}
            style={{ opacity: 0.85 }}>
            {comEstudo > 0 ? `${comEstudo} / ${totalCaps} cap.` : `${totalCaps} cap.`}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

const todosLivros = BIBLE_DATA.livros;

function normalizar(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

function Secao({ titulo, livros, cor }: {
  titulo: string;
  livros: typeof livrosAT;
  cor: string;
}) {
  if (livros.length === 0) return null;
  const corHex = cor === 'brand-blue' ? '#00d4ff' : '#ff2d55';
  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 rounded-full" style={{ background: corHex, boxShadow: `0 0 12px ${corHex}80` }} />
          <h2 className="font-display font-black text-lg sm:text-xl uppercase tracking-widest leading-none"
            style={{ color: corHex }}>
            {titulo}
          </h2>
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md"
            style={{ color: corHex, background: corHex + '18', border: `1px solid ${corHex}30` }}>
            {livros.length}
          </span>
        </div>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,${corHex}30,transparent)` }} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
        {livros.map((livro, i) => (
          <CardLivro key={livro.id} livro={livro} cor={cor} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function Biblioteca() {
  const [busca, setBusca] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const termo = normalizar(busca.trim());

  const filtrados = termo
    ? todosLivros.filter(l => normalizar(l.nome).includes(termo))
    : null;

  const atFiltrado = filtrados
    ? filtrados.filter(l => l.testamento === 'AT')
    : livrosAT;

  const ntFiltrado = filtrados
    ? filtrados.filter(l => l.testamento === 'NT')
    : livrosNT;

  const semResultado = filtrados !== null && filtrados.length === 0;

  // foca o input ao abrir a página
  useEffect(() => { inputRef.current?.focus(); }, []);

  return (
    <div className="min-h-screen relative">
      <Navbar />

      <section className="pt-28 sm:pt-32 md:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Clube banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 sm:mb-12"
          >
            <a
              href="https://chat.whatsapp.com/HEIIFYAmLij62M0jRwwVhH"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6
                px-6 sm:px-10 py-5 sm:py-6 rounded-2xl border border-brand-blue/30
                hover:border-brand-blue/70 transition-all duration-300
                hover:shadow-[0_0_40px_rgba(0,212,255,0.12)]"
              style={{ background: 'linear-gradient(135deg,rgba(0,212,255,0.06),rgba(123,47,247,0.04))' }}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-5 text-center sm:text-left">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.3)' }}>
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <p className="font-display font-black text-base sm:text-lg uppercase tracking-tight text-white leading-none mb-1">
                    Clube Biblia Visual
                  </p>
                  <p className="text-white/60 text-sm sm:text-base">
                    Grupo exclusivo para estudo expositivo — junte-se agora
                  </p>
                </div>
              </div>
              <span className="shrink-0 px-6 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider
                border border-brand-blue text-brand-blue group-hover:bg-brand-blue group-hover:text-bg-deep
                transition-all duration-200">
                Entrar no Clube →
              </span>
            </a>
          </motion.div>

          {/* Barra de Pesquisa */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-14 sm:mb-20 max-w-2xl mx-auto"
          >
            <div className="relative group">
              <Search
                className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-white/30 group-focus-within:text-brand-blue transition-colors duration-200 pointer-events-none"
              />
              <input
                ref={inputRef}
                type="text"
                value={busca}
                onChange={e => setBusca(e.target.value)}
                placeholder="Pesquisar livro… ex: Gên, Ex, Sal, Jo, Ap"
                className="w-full bg-white/5 border border-white/10 focus:border-brand-blue/60 focus:bg-white/[0.07] rounded-2xl pl-12 sm:pl-14 pr-12 sm:pr-14 py-4 sm:py-5 text-base sm:text-xl text-white placeholder-white/25 outline-none transition-all duration-200 font-medium"
              />
              <AnimatePresence>
                {busca && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    onClick={() => { setBusca(''); inputRef.current?.focus(); }}
                    className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Contador de resultados */}
            <AnimatePresence>
              {filtrados !== null && (
                <motion.p
                  key="resultado"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-sm sm:text-base text-white/40 mt-3 font-medium"
                >
                  {semResultado
                    ? 'Nenhum livro encontrado.'
                    : `${filtrados.length} livro${filtrados.length > 1 ? 's' : ''} encontrado${filtrados.length > 1 ? 's' : ''}`}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Resultados */}
          <AnimatePresence mode="wait">
            {semResultado ? (
              <motion.div
                key="vazio"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24 text-white/20 text-xl font-bold"
              >
                Nenhum livro encontrado para "{busca}"
              </motion.div>
            ) : (
              <motion.div key="lista" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Secao titulo="Antigo Testamento" livros={atFiltrado} cor="brand-blue" />
                <Secao titulo="Novo Testamento"   livros={ntFiltrado} cor="brand-rose" />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      <Footer />
    </div>
  );
}
