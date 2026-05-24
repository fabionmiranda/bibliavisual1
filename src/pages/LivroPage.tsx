import { useState, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  BookOpen, Upload, FileText, ChevronRight, Loader2,
  Sparkles, Flame, Compass, Scroll, Shield, Scale,
  Wheat, Crown, Building, Library, Music, Lightbulb, Sun, Heart,
  Eye, Droplets, Fish, Mountain, Star, Zap, CloudLightning,
  Anchor, Globe, Unlock, Trophy, Cloud, Users, Swords,
  Flower2, HeartHandshake, Cross,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import { BIBLE_DATA } from '../data/bibleData';
import { parseStudyTxt } from '../services/txtStudyService';

type BookConfig = { icon: LucideIcon; grad: string };
export const BOOK_CONFIG: Record<string, BookConfig> = {
  genesis:             { icon: Sparkles,       grad: 'from-indigo-950 via-blue-950 to-slate-950' },
  exodo:               { icon: Flame,          grad: 'from-orange-950 via-red-950 to-slate-950' },
  levitico:            { icon: BookOpen,       grad: 'from-yellow-950 via-amber-950 to-slate-950' },
  numeros:             { icon: Compass,        grad: 'from-amber-950 via-orange-950 to-slate-950' },
  deuteronomio:        { icon: Scroll,         grad: 'from-stone-900 via-yellow-950 to-slate-950' },
  josue:               { icon: Swords,         grad: 'from-green-950 via-teal-950 to-slate-950' },
  juizes:              { icon: Scale,          grad: 'from-red-950 via-rose-950 to-slate-950' },
  rute:                { icon: Wheat,          grad: 'from-yellow-900 via-lime-950 to-slate-950' },
  '1-samuel':          { icon: Crown,          grad: 'from-violet-950 via-purple-950 to-slate-950' },
  '2-samuel':          { icon: Crown,          grad: 'from-purple-950 via-violet-950 to-slate-950' },
  '1-reis':            { icon: Building,       grad: 'from-amber-950 via-yellow-950 to-slate-950' },
  '2-reis':            { icon: Flame,          grad: 'from-red-950 via-orange-950 to-slate-950' },
  '1-cronicas':        { icon: Library,        grad: 'from-slate-800 via-zinc-900 to-slate-950' },
  '2-cronicas':        { icon: Building,       grad: 'from-zinc-800 via-slate-900 to-slate-950' },
  esdras:              { icon: Scroll,         grad: 'from-teal-950 via-cyan-950 to-slate-950' },
  neemias:             { icon: Shield,         grad: 'from-stone-800 via-zinc-900 to-slate-950' },
  ester:               { icon: Crown,          grad: 'from-rose-950 via-pink-950 to-slate-950' },
  jo:                  { icon: CloudLightning, grad: 'from-slate-800 via-gray-900 to-slate-950' },
  salmos:              { icon: Music,          grad: 'from-sky-950 via-blue-950 to-slate-950' },
  proverbios:          { icon: Lightbulb,      grad: 'from-yellow-800 via-amber-900 to-slate-950' },
  eclesiastes:         { icon: Sun,            grad: 'from-orange-900 via-amber-950 to-slate-950' },
  canticos:            { icon: Flower2,        grad: 'from-pink-950 via-rose-950 to-slate-950' },
  isaias:              { icon: Eye,            grad: 'from-blue-900 via-indigo-950 to-slate-950' },
  jeremias:            { icon: Droplets,       grad: 'from-slate-800 via-blue-950 to-slate-950' },
  lamentacoes:         { icon: Droplets,       grad: 'from-gray-800 via-slate-900 to-slate-950' },
  ezequiel:            { icon: Eye,            grad: 'from-purple-950 via-indigo-950 to-slate-950' },
  daniel:              { icon: Shield,         grad: 'from-amber-900 via-yellow-950 to-slate-950' },
  oseias:              { icon: Heart,          grad: 'from-rose-900 via-pink-950 to-slate-950' },
  joel:                { icon: CloudLightning, grad: 'from-orange-950 via-red-950 to-slate-950' },
  amos:                { icon: Scale,          grad: 'from-stone-900 via-amber-950 to-slate-950' },
  obadias:             { icon: Mountain,       grad: 'from-zinc-800 via-stone-900 to-slate-950' },
  jonas:               { icon: Fish,           grad: 'from-cyan-950 via-teal-950 to-slate-950' },
  miqueias:            { icon: Scale,          grad: 'from-teal-950 via-green-950 to-slate-950' },
  naum:                { icon: Swords,         grad: 'from-red-950 via-rose-950 to-slate-950' },
  habacuque:           { icon: Eye,            grad: 'from-sky-950 via-slate-900 to-slate-950' },
  sofonias:            { icon: Flame,          grad: 'from-orange-950 via-amber-950 to-slate-950' },
  ageu:                { icon: Building,       grad: 'from-yellow-950 via-amber-950 to-slate-950' },
  zacarias:            { icon: Star,           grad: 'from-indigo-950 via-violet-950 to-slate-950' },
  malaquias:           { icon: Sun,            grad: 'from-yellow-900 via-orange-950 to-slate-950' },
  mateus:              { icon: Star,           grad: 'from-blue-950 via-indigo-950 to-slate-950' },
  marcos:              { icon: Zap,            grad: 'from-green-950 via-teal-950 to-slate-950' },
  lucas:               { icon: Heart,          grad: 'from-sky-900 via-blue-950 to-slate-950' },
  joao:                { icon: Sparkles,       grad: 'from-cyan-950 via-blue-950 to-slate-950' },
  atos:                { icon: Flame,          grad: 'from-orange-900 via-red-950 to-slate-950' },
  romanos:             { icon: Anchor,         grad: 'from-slate-800 via-zinc-900 to-slate-950' },
  '1-corintios':       { icon: Cross,          grad: 'from-blue-950 via-sky-950 to-slate-950' },
  '2-corintios':       { icon: Shield,         grad: 'from-teal-950 via-cyan-950 to-slate-950' },
  galatas:             { icon: Unlock,         grad: 'from-green-950 via-emerald-950 to-slate-950' },
  efesios:             { icon: Shield,         grad: 'from-violet-950 via-purple-950 to-slate-950' },
  filipenses:          { icon: Trophy,         grad: 'from-yellow-900 via-amber-950 to-slate-950' },
  colossenses:         { icon: Globe,          grad: 'from-indigo-950 via-blue-950 to-slate-950' },
  '1-tessalonicenses': { icon: Cloud,          grad: 'from-sky-950 via-indigo-950 to-slate-950' },
  '2-tessalonicenses': { icon: Zap,            grad: 'from-gray-800 via-slate-900 to-slate-950' },
  '1-timoteo':         { icon: BookOpen,       grad: 'from-stone-800 via-zinc-900 to-slate-950' },
  '2-timoteo':         { icon: Crown,          grad: 'from-amber-900 via-yellow-950 to-slate-950' },
  tito:                { icon: Users,          grad: 'from-teal-950 via-slate-900 to-slate-950' },
  filemom:             { icon: HeartHandshake, grad: 'from-rose-950 via-pink-950 to-slate-950' },
  hebreus:             { icon: Building,       grad: 'from-yellow-950 via-amber-950 to-slate-950' },
  tiago:               { icon: Wheat,          grad: 'from-green-950 via-lime-950 to-slate-950' },
  '1-pedro':           { icon: Anchor,         grad: 'from-blue-950 via-sky-950 to-slate-950' },
  '2-pedro':           { icon: Mountain,       grad: 'from-slate-800 via-gray-900 to-slate-950' },
  '1-joao':            { icon: Heart,          grad: 'from-rose-950 via-red-950 to-slate-950' },
  '2-joao':            { icon: Heart,          grad: 'from-pink-950 via-rose-950 to-slate-950' },
  '3-joao':            { icon: Users,          grad: 'from-emerald-950 via-green-950 to-slate-950' },
  judas:               { icon: Flame,          grad: 'from-red-950 via-orange-950 to-slate-950' },
  apocalipse:          { icon: Star,           grad: 'from-indigo-950 via-violet-950 to-purple-950' },
};

interface Props { testamento: 'AT' | 'NT' }

export default function LivroPage({ testamento }: Props) {
  const { livro: livroId = '' } = useParams<{ livro: string }>();
  const navigate = useNavigate();

  const livroData  = BIBLE_DATA.livros.find(l => l.id === livroId);
  const cfg        = BOOK_CONFIG[livroId] ?? { icon: BookOpen, grad: 'from-slate-900 to-slate-950' };
  const Icone      = cfg.icon;
  const storageKey = `estudo_${livroId}`;
  const basePath   = `/${testamento.toLowerCase()}/${livroId}`;

  const [loading,  setLoading]  = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [erro,     setErro]     = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const processar = useCallback(async (file: File) => {
    if (!file.name.endsWith('.txt')) { setErro('Somente arquivos .txt são aceitos.'); return; }
    setErro('');
    setLoading(true);
    try {
      const texto  = await file.text();
      const estudo = parseStudyTxt(texto, livroData?.nome ?? livroId);
      localStorage.setItem(storageKey, JSON.stringify(estudo));
      navigate(`${basePath}/diagramas`);
    } catch {
      setErro('Erro ao processar o arquivo. Verifique o formato.');
    } finally {
      setLoading(false);
    }
  }, [storageKey, basePath, livroId, livroData, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-bg-deep text-white">
      <Navbar />

      <main className="flex-1 flex flex-col pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-10">
          <Link to="/biblioteca" className="hover:text-brand-blue transition-colors">Biblioteca</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white/70">{livroData?.nome ?? livroId}</span>
        </nav>

        {/* Cabeçalho do livro */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-5 mb-14"
        >
          <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${cfg.grad} border border-white/10 shadow-2xl shrink-0`}>
            <Icone className="w-10 h-10 sm:w-12 sm:h-12 text-white/90" strokeWidth={1.2} />
          </div>
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-brand-blue font-bold mb-1">
              {testamento === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'}
            </p>
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tighter text-white">
              {livroData?.nome ?? livroId}
            </h1>
          </div>
        </motion.div>

        {/* Zona de upload */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 flex flex-col items-center justify-center"
        >
          <div
            onClick={() => !loading && fileRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) processar(f); }}
            className={`w-full cursor-pointer rounded-3xl border-2 border-dashed transition-all duration-300 p-12 sm:p-20 flex flex-col items-center justify-center gap-6 text-center select-none
              ${dragOver
                ? 'border-brand-blue bg-brand-blue/10 scale-[1.01]'
                : 'border-white/15 bg-white/[0.03] hover:border-brand-blue/50 hover:bg-white/[0.06]'
              }`}
          >
            {loading
              ? <Loader2 className="w-16 h-16 sm:w-20 sm:h-20 text-brand-blue animate-spin" />
              : <Upload className={`w-16 h-16 sm:w-20 sm:h-20 transition-colors ${dragOver ? 'text-brand-blue' : 'text-white/25'}`} />
            }

            <div className="space-y-2">
              <p className="text-2xl sm:text-3xl font-bold text-white/80">
                {loading ? 'Processando…' : 'Carregar arquivo de estudo'}
              </p>
              <p className="text-base sm:text-lg text-white/35">
                {loading ? 'Aguarde, lendo o conteúdo do arquivo' : 'Arraste um arquivo .txt ou clique para selecionar'}
              </p>
            </div>

            {!loading && (
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-sm font-bold">
                <FileText className="w-4 h-4" />
                Selecionar arquivo .txt
              </div>
            )}
          </div>

          <input ref={fileRef} type="file" accept=".txt" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) processar(f); }} />

          {erro && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-brand-rose text-sm font-medium">
              {erro}
            </motion.p>
          )}
        </motion.div>

      </main>
    </div>
  );
}
