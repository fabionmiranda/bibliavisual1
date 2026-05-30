import { motion } from 'motion/react';
import { useEffect } from 'react';
import { 
  ArrowRight, ChevronRight, Zap, Layout, Languages, Target, Activity, 
  ArrowRightCircle, Flame, Compass, ShieldCheck, Users, Cross, BookOpen, 
  AlertTriangle, Repeat, ShieldAlert, MessageSquare, PenTool, Mic2, 
  Heart, Award, Shield, UserCheck, Home as HomeIcon, Share2
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ClubeBanner from '../components/ClubeBanner';
import { cn } from '../lib/utils';

// ─── Marca d'água: diagramas futuristas decorativos ───────────────────────
function MarcaDagua() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none" aria-hidden>

      {/* ── QUIÁSTICO — canto superior esquerdo ── */}
      <motion.div
        className="absolute -top-10 -left-16 opacity-[0.055]"
        animate={{ opacity: [0.045, 0.075, 0.045] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="420" height="380" viewBox="0 0 420 380" fill="none">
          <defs>
            <linearGradient id="qGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* linhas convergentes A–B–C–B'–A' */}
          {[0,1,2,3,4].map(k => {
            const y = 40 + k * 65; const x1 = 30 + k * 40; const x2 = 390 - k * 40;
            return <line key={k} x1={x1} y1={y} x2={x2} y2={y} stroke="url(#qGrad)" strokeWidth={1.5 - k * 0.2} />;
          })}
          {/* linhas diagonais cruzando */}
          <line x1="30" y1="40" x2="210" y2="300" stroke="#a855f7" strokeWidth="1" strokeDasharray="6 4" />
          <line x1="390" y1="40" x2="210" y2="300" stroke="#a855f7" strokeWidth="1" strokeDasharray="6 4" />
          {/* badges de letras */}
          {['A','B','C','B\'','A\''].map((l, k) => (
            <g key={k}>
              <rect x={18 + k * 40} y={28 + k * 65} width={26} height={18} rx="4" fill="#a855f7" fillOpacity="0.25" stroke="#a855f7" strokeWidth="0.8" />
              <text x={31 + k * 40} y={41 + k * 65} textAnchor="middle" fill="#a855f7" fontSize="9" fontFamily="monospace" fontWeight="bold">{l}</text>
            </g>
          ))}
          {/* ponto central */}
          <circle cx="210" cy="300" r="8" fill="#a855f7" fillOpacity="0.4" />
          <circle cx="210" cy="300" r="14" stroke="#a855f7" strokeWidth="1" fill="none" strokeDasharray="3 3" />
          <text x="210" y="304" textAnchor="middle" fill="#a855f7" fontSize="8" fontFamily="monospace">CENTRO</text>
        </svg>
      </motion.div>

      {/* ── INTERLINEAR / TEXTO ORIGINAL — topo direito ── */}
      <motion.div
        className="absolute top-20 -right-8 opacity-[0.05]"
        animate={{ opacity: [0.04, 0.07, 0.04], x: [0, -6, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="320" height="280" viewBox="0 0 320 280" fill="none">
          {/* linhas de texto hebraico simulado */}
          {[0,1,2,3,4,5].map(k => (
            <g key={k}>
              <rect x={10} y={20 + k * 42} width={280 - k * 10} height={12} rx="3" fill="#00d4ff" fillOpacity="0.35" />
              <rect x={10} y={36 + k * 42} width={220 - k * 8} height={8} rx="2" fill="#00d4ff" fillOpacity="0.18" />
              {/* badge de ref */}
              <rect x={286} y={18 + k * 42} width={24} height={14} rx="3" fill="#00d4ff" fillOpacity="0.2" stroke="#00d4ff" strokeWidth="0.6" />
              <text x={298} y={29 + k * 42} textAnchor="middle" fill="#00d4ff" fontSize="7" fontFamily="monospace">{`v.${k+1}`}</text>
            </g>
          ))}
          {/* separador */}
          <line x1="10" y1="15" x2="310" y2="15" stroke="#00d4ff" strokeWidth="1.5" strokeDasharray="8 4" />
          <text x="10" y="10" fill="#00d4ff" fontSize="8" fontFamily="monospace" opacity="0.7">INTERLINEAR · 01</text>
        </svg>
      </motion.div>

      {/* ── SINTÁTICO — centro esquerdo ── */}
      <motion.div
        className="absolute top-[38%] -left-10 opacity-[0.05]"
        animate={{ opacity: [0.04, 0.07, 0.04], y: [0, 10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <svg width="300" height="340" viewBox="0 0 300 340" fill="none">
          <defs>
            <linearGradient id="sGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* nó raiz */}
          <rect x="100" y="10" width="100" height="30" rx="6" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1" />
          <text x="150" y="30" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="monospace" fontWeight="bold">SUJEITO</text>
          {/* filhos nível 1 */}
          {[['VERBO', 30, 90], ['OBJETO', 170, 90]].map(([lbl, x, y], j) => (
            <g key={j}>
              <line x1="150" y1="40" x2={Number(x)+50} y2={Number(y)} stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="4 3" />
              <rect x={Number(x)} y={Number(y)} width="100" height="28" rx="5" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="0.8" />
              <text x={Number(x)+50} y={Number(y)+18} textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace">{String(lbl)}</text>
            </g>
          ))}
          {/* filhos nível 2 */}
          {[['Adv',55,170],['Part',130,170],['Prep',205,170]].map(([lbl, x, y], j) => (
            <g key={j}>
              <line x1={j < 2 ? 80 : 220} y1="118" x2={Number(x)+30} y2={Number(y)} stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="3 3" />
              <rect x={Number(x)} y={Number(y)} width="60" height="24" rx="4" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="0.6" />
              <text x={Number(x)+30} y={Number(y)+15} textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace">{String(lbl)}</text>
            </g>
          ))}
          {/* nível 3 */}
          {[['Pron',40,240],['Subst',120,240],['Adj',200,240]].map(([lbl, x, y], j) => (
            <g key={j}>
              <line x1={[70,160,235][j]} y1="194" x2={Number(x)+30} y2={Number(y)} stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="2 3" />
              <rect x={Number(x)} y={Number(y)} width="60" height="22" rx="4" fill="#f59e0b" fillOpacity="0.08" stroke="#f59e0b" strokeWidth="0.5" />
              <text x={Number(x)+30} y={Number(y)+14} textAnchor="middle" fill="#f59e0b" fontSize="6.5" fontFamily="monospace">{String(lbl)}</text>
            </g>
          ))}
          <text x="10" y="330" fill="#f59e0b" fontSize="8" fontFamily="monospace" opacity="0.6">SINTÁTICO · 04</text>
        </svg>
      </motion.div>

      {/* ── PROGRESSIVO — centro direito ── */}
      <motion.div
        className="absolute top-[55%] -right-6 opacity-[0.055]"
        animate={{ opacity: [0.04, 0.075, 0.04], x: [0, -8, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      >
        <svg width="260" height="320" viewBox="0 0 260 320" fill="none">
          <defs>
            <linearGradient id="pGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* linha central vertical */}
          <line x1="30" y1="10" x2="30" y2="310" stroke="#ec4899" strokeWidth="2" />
          {/* etapas progressivas */}
          {[
            ['Etapa 1', 230], ['Etapa 2', 210], ['Etapa 3', 185],
            ['Etapa 4', 155], ['Etapa 5', 120], ['Etapa 6', 80],
          ].map(([lbl, w], k) => (
            <g key={k}>
              <circle cx="30" cy={20 + k * 48} r="5" fill="#ec4899" fillOpacity="0.5" />
              <rect x="46" y={12 + k * 48} width={Number(w)} height={20} rx="4" fill="url(#pGrad)" fillOpacity="0.3" />
              <text x="56" y={26 + k * 48} fill="#ec4899" fontSize="8" fontFamily="monospace" fontWeight="500">{String(lbl)}</text>
            </g>
          ))}
          {/* seta final */}
          <path d="M26,305 L34,305 L30,315 Z" fill="#ec4899" fillOpacity="0.5" />
          <text x="44" y="314" fill="#ec4899" fontSize="8" fontFamily="monospace" opacity="0.6">PROGRESSIVO · 06</text>
        </svg>
      </motion.div>

      {/* ── TRINITÁRIO — fundo inferior esquerdo ── */}
      <motion.div
        className="absolute bottom-[8%] -left-12 opacity-[0.05]"
        animate={{ opacity: [0.04, 0.07, 0.04], rotate: [0, 2, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <svg width="360" height="340" viewBox="0 0 360 340" fill="none">
          <defs>
            <radialGradient id="tGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* triângulo */}
          <polygon points="180,20 320,280 40,280" stroke="#c084fc" strokeWidth="1.5" fill="url(#tGrad)" />
          {/* círculo inscrito */}
          <circle cx="180" cy="210" r="60" stroke="#c084fc" strokeWidth="0.8" fill="none" strokeDasharray="5 4" />
          {/* nós PAI / FILHO / ESPÍRITO */}
          {[['PAI','#f59e0b',180,20],['FILHO','#ff2d55',320,280],['ESPÍRITO','#00d4ff',40,280]].map(([lbl,col,cx,cy]) => (
            <g key={String(lbl)}>
              <circle cx={Number(cx)} cy={Number(cy)} r="18" fill={String(col)} fillOpacity="0.18" stroke={String(col)} strokeWidth="1" />
              <text x={Number(cx)} y={Number(cy)+4} textAnchor="middle" fill={String(col)} fontSize="8" fontFamily="monospace" fontWeight="bold">{String(lbl)}</text>
            </g>
          ))}
          {/* linhas internas */}
          <line x1="180" y1="38" x2="180" y2="150" stroke="#c084fc" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="302" y1="268" x2="214" y2="218" stroke="#c084fc" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="58" y1="268" x2="146" y2="218" stroke="#c084fc" strokeWidth="0.8" strokeDasharray="3 3" />
          <text x="10" y="330" fill="#c084fc" fontSize="8" fontFamily="monospace" opacity="0.6">TRINITÁRIO · 23</text>
        </svg>
      </motion.div>

      {/* ── RELACIONAL / NODOS — fundo inferior direito ── */}
      <motion.div
        className="absolute bottom-[10%] -right-8 opacity-[0.05]"
        animate={{ opacity: [0.04, 0.07, 0.04], y: [0, -8, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      >
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
          {/* arestas */}
          {[[150,150,60,60],[150,150,240,60],[150,150,40,200],[150,150,260,200],[150,150,150,270],[60,60,240,60],[40,200,150,270],[260,200,150,270]].map(([x1,y1,x2,y2],k) => (
            <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#10b981" strokeWidth="0.8" strokeDasharray="4 3" strokeOpacity="0.7" />
          ))}
          {/* nós */}
          {[[150,150,12,'#10b981'],[60,60,9,'#10b981'],[240,60,9,'#10b981'],[40,200,9,'#10b981'],[260,200,9,'#10b981'],[150,270,9,'#10b981']].map(([cx,cy,r,col],k) => (
            <g key={k}>
              <circle cx={Number(cx)} cy={Number(cy)} r={Number(r)+4} fill={String(col)} fillOpacity="0.12" />
              <circle cx={Number(cx)} cy={Number(cy)} r={Number(r)} fill={String(col)} fillOpacity="0.35" stroke={String(col)} strokeWidth="0.8" />
            </g>
          ))}
          <text x="10" y="294" fill="#10b981" fontSize="8" fontFamily="monospace" opacity="0.6">RELACIONAL · 10</text>
        </svg>
      </motion.div>

      {/* ── CRISTOLÓGICO / SETA CENTRAL — meio da tela ── */}
      <motion.div
        className="absolute top-[22%] left-1/2 -translate-x-1/2 opacity-[0.03]"
        animate={{ opacity: [0.025, 0.05, 0.025], scale: [1, 1.04, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      >
        <svg width="500" height="180" viewBox="0 0 500 180" fill="none">
          <defs>
            <linearGradient id="cGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff2d55" stopOpacity="0" />
              <stop offset="50%" stopColor="#ff2d55" />
              <stop offset="100%" stopColor="#ff2d55" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grande seta horizontal */}
          <line x1="20" y1="90" x2="480" y2="90" stroke="url(#cGrad)" strokeWidth="2" />
          <polygon points="470,80 500,90 470,100" fill="#ff2d55" fillOpacity="0.6" />
          {/* marcadores AT → NT */}
          {[['A.T.', 60], ['PROFECIA', 160], ['✝ CRISTO', 250], ['CUMPR.', 340], ['N.T.', 440]].map(([lbl, x], k) => (
            <g key={k}>
              <circle cx={Number(x)} cy="90" r="6" fill="#ff2d55" fillOpacity="0.4" />
              <text x={Number(x)} y="75" textAnchor="middle" fill="#ff2d55" fontSize="9" fontFamily="monospace" fontWeight="bold">{String(lbl)}</text>
            </g>
          ))}
          <text x="20" y="170" fill="#ff2d55" fontSize="8" fontFamily="monospace" opacity="0.6">CRISTOLÓGICO · 11</text>
        </svg>
      </motion.div>

    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <MarcaDagua />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-10 overflow-hidden">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="relative shrink-0"
              >
                <div className="absolute -inset-2 bg-brand-blue/20 blur-xl rounded-full" />
                <div className="relative p-3 md:p-5 bg-bg-deep/50 border border-brand-blue/20 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl backdrop-blur-sm">
                  <BookOpen className="w-8 h-8 md:w-16 md:h-16 text-brand-blue" />
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-1 -right-1 p-1 md:p-2 bg-bg-deep border border-brand-rose/30 rounded-lg md:rounded-xl shadow-lg"
                  >
                    <Share2 className="w-3 h-3 md:w-6 md:h-6 text-brand-rose" />
                  </motion.div>
                </div>
              </motion.div>

              <h1 className="font-display text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[1] text-center md:text-left">
                <motion.span 
                  className="bg-gradient-to-r from-brand-blue via-brand-purple via-brand-rose to-brand-blue bg-[length:200%_auto] bg-clip-text text-transparent uppercase inline-block pb-4"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: 1,
                    backgroundPosition: ["0% center", "200% center"],
                    textShadow: [
                      "0 0 0px rgba(0,212,255,0)",
                      "0 0 35px rgba(0,212,255,0.3)",
                      "0 0 0px rgba(0,212,255,0)"
                    ]
                  }}
                  transition={{ 
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" },
                    textShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 1 }
                  }}
                >
                  BÍBLIA VISUAL <br className="hidden md:block" /> EXPOSITIVA
                </motion.span>
              </h1>
            </div>
            <p className="text-xl md:text-3xl text-white max-w-5xl mx-auto mb-14 font-display font-medium leading-tight">
              O futuro da leitura, interpretação e aplicação da Palavra de Deus sob a ação poderosa do Espírito Santo de forma visual, expositiva, simples, e profunda!
          
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/biblioteca"
                className="inline-flex items-center gap-3 px-10 py-5 bg-brand-blue text-white text-lg font-black rounded-full
                  hover:bg-white hover:text-brand-blue transition-all hover:scale-105 active:scale-95
                  shadow-[0_0_40px_rgba(59,130,246,0.4)]"
              >
                ACESSAR <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CLUBE DESTAQUE ── */}
      <section className="relative py-10 sm:py-12 overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 via-brand-purple/10 to-brand-rose/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-32 bg-brand-blue/15 blur-[80px] rounded-full" />
        </div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.a
            href="https://bibliavisual.fabionmiranda.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.015 }}
            className="relative flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-6 rounded-2xl cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.10), rgba(168,85,247,0.08), rgba(255,45,85,0.06))',
              border: '1.5px solid rgba(0,212,255,0.35)',
              boxShadow: '0 0 40px rgba(0,212,255,0.12), inset 0 0 40px rgba(168,85,247,0.04)',
            }}
          >
            {/* Pulsing dot */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-blue" />
              </span>
              <span className="font-mono text-[10px] font-black uppercase tracking-widest text-brand-blue/80">Gratuito</span>
            </div>

            {/* Texto esquerda */}
            <div className="text-center sm:text-left">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-blue/70 font-black mb-1">
                Faca parte
              </p>
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tighter text-white leading-tight"
                style={{ textShadow: '0 0 30px rgba(0,212,255,0.3)' }}>
                Clube da Biblia Visual Expositiva
              </h3>
              <p className="text-white/55 text-sm sm:text-base mt-1.5 max-w-lg leading-relaxed">
                Receba devocionais, diagramas e ensinos profundos. Clique e acesse agora.
              </p>
            </div>

            {/* Botao direita */}
            <div
              className="shrink-0 flex items-center gap-2 px-7 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider text-bg-deep"
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
                boxShadow: '0 0 28px rgba(0,212,255,0.35)',
              }}
            >
              Acessar o Clube
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.a>
        </div>
      </section>

      {/* Diagramas de Exegese — logo após o hero */}
      <section className="py-24 relative overflow-hidden">
        {/* fundo sutil */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[160px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/8 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Cabeçalho */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-brand-purple/10 rounded-full border border-brand-purple/25 mb-6">
              <Layout className="w-4 h-4 text-brand-purple" />
              <span className="text-[11px] font-black text-brand-purple uppercase tracking-[0.25em]">Metodologia Científica</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black mb-5 uppercase tracking-tighter leading-none">
              OS <span className="text-brand-purple" style={{ textShadow: '0 0 40px rgba(168,85,247,0.5)' }}>DIAGRAMAS</span> DE EXEGESE
            </h2>
            <p className="text-white/55 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Dezenas de diagramas visuais que revelam a beleza oculta do texto sagrado — cada perspectiva, um novo olhar didático, profundo e transformador.
            </p>
          </motion.div>

          {/* Grid de cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[
              { n:  1, t: "Interlinear",     d: "Texto Original",  icon: Languages,      q: "O que o texto realmente diz em sua forma original?" },
              { n:  2, t: "Morfológico",     d: "Gramática",        icon: Zap,            q: "Que tipo de palavras e formas revelam a precisão teológica?" },
              { n:  3, t: "Quiástico",       d: "Simetria",         icon: Target,         q: "Como o texto está estruturado e onde está o seu centro de ênfase?" },
              { n:  4, t: "Sintático",       d: "Estrutura",        icon: Layout,         q: "Quem faz o quê no texto e como as ações estão organizadas?" },
              { n:  5, t: "Semântico",       d: "Significado",      icon: Activity,       q: "Qual é o fluxo de significado e a lógica das ideias do texto?" },
              { n:  6, t: "Progressivo",     d: "Fluxo",            icon: ArrowRightCircle, q: "Como o texto avança passo a passo até seu objetivo final?" },
              { n:  7, t: "Intensificação",  d: "Clímax",           icon: Flame,          q: "Onde o texto aumenta o peso, a gravidade ou a exigência?" },
              { n:  8, t: "Espacial",        d: "Dimensões",        icon: Compass,        q: "Em quais esferas (humana, social, divina) o texto se move?" },
              { n:  9, t: "Acesso",          d: "Autoridade",       icon: ShieldCheck,    q: "Quem pode agir, como pode agir e quais são os limites diante de Deus?" },
              { n: 10, t: "Relacional",      d: "Vínculos",         icon: Users,          q: "Quais relações são rompidas, afetadas ou restauradas?" },
              { n: 11, t: "Cristológico",    d: "Foco em Cristo",   icon: Cross,          q: "Como este texto aponta para ou se cumpre em Cristo?" },
              { n: 12, t: "Sistemático",     d: "Doutrina",         icon: BookOpen,       q: "Que doutrinas estão presentes e como se conectam ao todo da teologia bíblica?" },
              { n: 13, t: "Tensão",          d: "Resolução",        icon: AlertTriangle,  q: "Qual é o problema central do texto e como ele é resolvido?" },
              { n: 14, t: "Repetição",       d: "Ênfase",           icon: Repeat,         q: "O que o texto enfatiza por meio de repetição de ideias ou temas?" },
              { n: 15, t: "Causa/Efeito",    d: "Lógica",           icon: Zap,            q: "O que gera o quê dentro da lógica moral e teológica do texto?" },
              { n: 16, t: "Apologético",     d: "Defesa",           icon: ShieldAlert,    q: "Que erros, objeções ou visões distorcidas o texto corrige?" },
              { n: 17, t: "Perguntas",       d: "Investigação",     icon: MessageSquare,  q: "Que perguntas o próprio texto exige que façamos para compreendê-lo?" },
              { n: 18, t: "Autoral",         d: "Comentários",      icon: PenTool,        q: "Como diferentes intérpretes entenderam cada parte do texto?" },
              { n: 19, t: "Homilético",      d: "Pregação",         icon: Mic2,           q: "Como esse texto deve ser pregado de forma fiel e estruturada?" },
              { n: 20, t: "Pastoral",        d: "Vida Prática",     icon: Heart,          q: "Como esse texto deve ser vivido concretamente na vida da igreja?" },
              { n: 21, t: "Antropológico",   d: "Existência",       icon: UserCheck,      q: "Como o texto descreve o ser humano em sua experiência existencial?" },
              { n: 22, t: "Familiar",        d: "Família",          icon: HomeIcon,       q: "Como o texto orienta as relações familiares diante do erro e da restauração?" },
              { n: 23, t: "Trinitário",      d: "Trindade",         icon: Shield,         q: "Como a ação de Deus neste texto é compreendida à luz da Trindade?" },
            ].map((d, i) => {
              // Paleta idêntica a DiagramaLetraPage / CORES
              const PALETA_HOME: Record<number,string> = {
                1:'#00d4ff', 2:'#22c55e', 3:'#a855f7', 4:'#f59e0b', 5:'#06b6d4',
                6:'#ec4899', 7:'#f97316', 8:'#8b5cf6', 9:'#00d4ff', 10:'#10b981',
                11:'#ff2d55',12:'#6366f1',13:'#ef4444',14:'#14b8a6',15:'#eab308',
                16:'#84cc16',17:'#06b6d4',18:'#a78bfa',19:'#fb923c',20:'#34d399',
                21:'#818cf8',22:'#f472b6',23:'#c084fc',
              };
              const c = PALETA_HOME[d.n] ?? '#00d4ff';
              const num = String(d.n).padStart(2, '0');

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.03, 0.55), duration: 0.4 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative flex flex-col rounded-2xl overflow-hidden cursor-default"
                  style={{
                    background: `linear-gradient(145deg, ${c}10, ${c}04)`,
                    border: `1.5px solid ${c}35`,
                    boxShadow: `0 0 10px ${c}14`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px ${c}35, 0 8px 24px rgba(0,0,0,0.4)`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${c}70`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 10px ${c}14`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${c}35`;
                  }}
                >
                  {/* Linha de brilho no topo */}
                  <div className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${c}90, transparent)` }} />

                  <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3">

                    {/* Linha topo: ícone + número */}
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                        style={{ background: `${c}18`, border: `1px solid ${c}35`, color: c }}>
                        <d.icon className="w-4 h-4" />
                      </div>
                      <span
                        className="font-mono font-black leading-none"
                        style={{
                          fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                          color: c,
                          textShadow: `0 0 20px ${c}80`,
                        }}
                      >
                        {num}
                      </span>
                    </div>

                    {/* Título + subtítulo */}
                    <div>
                      <h4
                        className="font-display font-black uppercase leading-tight tracking-tight"
                        style={{
                          fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                          color: '#fff',
                        }}
                      >
                        {d.t}
                      </h4>
                      <span
                        className="font-mono font-bold uppercase tracking-[0.15em]"
                        style={{ fontSize: '0.65rem', color: `${c}BB` }}
                      >
                        {d.d}
                      </span>
                    </div>

                    {/* Divisor */}
                    <div className="h-px w-full"
                      style={{ background: `linear-gradient(90deg, ${c}50, transparent)` }} />

                    {/* Pergunta — destaque principal */}
                    <p
                      className="leading-snug flex-1"
                      style={{
                        fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)',
                        color: 'rgba(255,255,255,0.82)',
                        fontStyle: 'italic',
                        fontWeight: 500,
                        letterSpacing: '0.01em',
                      }}
                    >
                      {d.q}
                    </p>

                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/metodo" className="inline-flex items-center gap-2 px-8 py-3.5 glass rounded-full text-xs font-black uppercase tracking-widest border border-white/10 hover:border-brand-purple/50 hover:text-brand-purple transition-all">
              Ver Metodologia Completa <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                O PROBLEMA DA <span className="text-brand-rose text-shadow-rose">LEITURA LINEAR</span>
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
                As pessoas leem a Bíblia, mas muitas vezes não enxergam sua estrutura, seu fluxo e seu centro. A leitura superficial ignora a arquitetura divina do texto.
              </p>
              <div className="p-6 glass rounded-2xl border-l-4 border-brand-rose shadow-[0_0_15px_rgba(255,45,85,0.1)]">
                <p className="italic text-white/80">
                  "Sem estrutura, a interpretação torna-se subjetiva. Com estrutura, a revelação torna-se clara."
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video glass rounded-3xl overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-rose/20 to-transparent" />
              <div className="text-center p-8">
                <Zap className="w-16 h-16 text-brand-rose mx-auto mb-4 animate-bounce drop-shadow-[0_0_10px_rgba(255,45,85,0.5)]" />
                <p className="font-display font-bold text-xl">FALTA DE PROFUNDIDADE</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 relative aspect-video glass rounded-3xl overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-transparent" />
              <div className="text-center p-8">
                <Layout className="w-16 h-16 text-brand-blue mx-auto mb-4 animate-pulse" />
                <p className="font-display font-bold text-xl">VISÃO ESTRUTURAL</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                A SOLUÇÃO: <span className="text-brand-blue">DIAGRAMAS</span>
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                Com o sistema dos Diagramas, você enxerga o texto como Deus organizou. Nossa plataforma transforma versículos em estruturas lógicas que revelam o fluxo do pensamento bíblico.
              </p>
              <Link to="/metodo" className="inline-flex items-center gap-2 text-brand-blue font-bold hover:underline">
                Conheça os Diagramas <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Impact Section - The Transformational Power */}
      <section className="py-24 relative overflow-hidden" id="impacto">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-rose/5 -z-10 blur-[120px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-black mb-6 uppercase tracking-tighter"
            >
              A TRANSFORMAÇÃO NA SUA <span className="text-brand-rose">CAMINHADA COM CRISTO</span>
            </motion.h2>
            <p className="text-white/80 text-xl max-w-3xl mx-auto font-light">
              Os diagramas não são apenas desenhos; são lentes que corrigem sua visão espiritual para que você deixe de ler superficialmente e comece a contemplar a glória de Deus em cada versículo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Clareza Absoluta",
                desc: "Saia da confusão mental e entenda exatamente o fluxo lógico do pensamento divino em cada linha do texto sagrado.",
                icon: Zap,
                color: "brand-blue"
              },
              {
                title: "Foco Cristocêntrico",
                desc: "Treine seus olhos para enxergar como cada palavra, estrutura e padrão aponta diretamente para a glória e o sacrifício de Jesus.",
                icon: Layout,
                color: "brand-purple"
              },
              {
                title: "Raízes Teológicas",
                desc: "Desenvolva uma mente bíblica sólida, fundamentada na estrutura real da Palavra, tornando-se imune a distorções e ventos de doutrina.",
                icon: ArrowRight,
                color: "brand-rose"
              },
              {
                title: "Oração Estruturada",
                desc: "Transforme seu tempo com Deus ao orar baseado na arquitetura real do texto, gerando uma comunhão profunda e bíblica.",
                icon: ChevronRight,
                color: "brand-blue"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-[2.5rem] border border-white/10 hover:border-brand-rose/30 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-${item.color}/10 flex items-center justify-center text-${item.color} mb-8 group-hover:scale-110 transition-transform shadow-xl shadow-${item.color}/5`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4 uppercase tracking-tighter">{item.title}</h3>
                <p className="text-white/80 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different Section */}

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-12 rounded-[40px] border-brand-purple/20 shadow-[0_0_50px_rgba(123,47,247,0.1)]"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
              POR QUE ESTE MÉTODO É DIFERENTE?
            </h2>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/90 italic">
              "Não é devocional. Não é opinião. É estrutura, revelação e <span className="text-brand-purple font-bold">Cristo no centro</span>."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Clube Section */}
      <section className="py-24 relative overflow-hidden" id="clube">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ClubeBanner />
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-blue/5 -z-10" />
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-12">
            PRONTO PARA <span className="text-brand-blue">MERGULHAR</span>?
          </h2>
        </div>
      </section>

      {/* Visual Showcase Section */}
      <section className="py-32 relative overflow-hidden bg-white/[0.01]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 rounded-full border border-brand-blue/20 mb-6"
            >
              <Layout className="w-4 h-4 text-brand-blue" />
              <span className="text-[10px] font-black text-brand-blue uppercase tracking-[0.2em]">Estética do Futuro</span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-display font-black mb-6 uppercase tracking-tighter">
              A ARQUITETURA <span className="text-brand-blue">DA REVELAÇÃO</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto font-medium">
              Não são apenas estudos, são representações visuais da estrutura eterna da Palavra de Deus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Simetria Quiástica",
                type: "Estrutura Literária",
                color: "brand-blue",
                delay: 0.1
              },
              {
                title: "Conexão Trinitária",
                type: "Revelação Teológica",
                color: "brand-purple",
                delay: 0.2
              },
              {
                title: "Fluxo Expositivo",
                type: "Lógica Homilética",
                color: "brand-rose",
                delay: 0.3
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay, duration: 0.8 }}
                className="glass rounded-[2rem] p-8 border border-white/5 hover:border-white/10 transition-all flex flex-col items-center group relative overflow-hidden"
              >
                {/* Futuristic Diagram Background Visualization */}
                <div className="w-full aspect-square relative mb-8 flex items-center justify-center">
                  <div className={`absolute inset-0 bg-${item.color}/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                  
                  {/* Abstract Diagram Representation */}
                  <svg width="200" height="200" viewBox="0 0 200 200" className="relative z-10">
                    <defs>
                      <linearGradient id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" className={`stop-${item.color}`} style={{ stopColor: i === 0 ? '#00d4ff' : i === 1 ? '#a855f7' : '#ff2d55' }} />
                        <stop offset="100%" stopColor="transparent" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    
                    {i === 0 && ( // Chiasm
                      <motion.g animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }}>
                        {/* Recursive lines */}
                        <path d="M40,40 L160,40 L100,100 L160,160 L40,160 L100,100 Z" stroke={`url(#grad-${i})`} strokeWidth="1" fill="none" />
                        <circle cx="100" cy="100" r="4" fill="#00d4ff" className="animate-pulse" />
                        <circle cx="40" cy="40" r="2" fill="white" fillOpacity="0.3" />
                        <circle cx="160" cy="40" r="2" fill="white" fillOpacity="0.3" />
                        <circle cx="160" cy="160" r="2" fill="white" fillOpacity="0.3" />
                        <circle cx="40" cy="160" r="2" fill="white" fillOpacity="0.3" />
                      </motion.g>
                    )}
                    
                    {i === 1 && ( // Trinity Node
                      <motion.g animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
                        <path d="M100,40 L160,140 L40,140 Z" stroke={`url(#grad-${i})`} strokeWidth="1" fill="none" />
                        <circle cx="100" cy="100" r="50" stroke="white" strokeOpacity="0.05" fill="none" strokeDasharray="4 4" />
                        <circle cx="100" cy="40" r="6" fill="#a855f7" className="shadow-2xl shadow-brand-purple" />
                        <circle cx="160" cy="140" r="6" fill="#a855f7" />
                        <circle cx="40" cy="140" r="6" fill="#a855f7" />
                        <line x1="100" y1="40" x2="100" y2="100" stroke="white" strokeOpacity="0.1" />
                        <line x1="160" y1="140" x2="100" y2="100" stroke="white" strokeOpacity="0.1" />
                        <line x1="40" y1="140" x2="100" y2="100" stroke="white" strokeOpacity="0.1" />
                      </motion.g>
                    )}
                    
                    {i === 2 && ( // Flow
                      <motion.g>
                        {[20, 60, 100, 140, 180].map((y, idx) => (
                          <motion.rect 
                            key={idx}
                            x="40" y={y-10} width={120 - idx * 15} height="4" rx="2"
                            fill={`url(#grad-${i})`}
                            initial={{ width: 0 }}
                            whileInView={{ width: 120 - idx * 15 }}
                            transition={{ delay: 0.5 + idx * 0.1, duration: 1 }}
                          />
                        ))}
                        <line x1="40" y1="10" x2="40" y2="190" stroke="white" strokeOpacity="0.1" strokeDasharray="2 2" />
                        <motion.circle 
                          animate={{ y: [0, 180, 0] }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                          cx="40" cy="10" r="3" fill="#ff2d55" 
                        />
                      </motion.g>
                    )}
                  </svg>
                </div>

                <div className="text-center">
                  <span className="text-[10px] font-mono text-white/60 uppercase tracking-[0.3em] block mb-2">{item.type}</span>
                  <h3 className="text-xl font-display font-black text-white uppercase tracking-tight group-hover:text-white transition-colors">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 glass p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-bg-deep bg-brand-blue/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-[10px] font-black text-brand-blue">D{i}</span>
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-sm">Biblioteca em Expansão</p>
                <p className="text-white/70 text-xs mt-1">Novos diagramas adicionados mensalmente.</p>
              </div>
            </div>
            <Link to="/metodo" className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full text-xs font-black uppercase tracking-widest transition-all">
              Ver Metodologia Completa
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
