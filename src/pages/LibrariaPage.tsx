import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, ShoppingCart, Eye, Lock, Star } from 'lucide-react';
import Navbar from '../components/Navbar';

/* ── SVGs temáticos para cada volume ── */
const SVG_VOL1 = (cor: string) => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" style={{ width: '90%', opacity: 0.72 }}>
    {/* Estrela de Belém */}
    <polygon points="60,4 63,22 78,22 66,33 70,50 60,40 50,50 54,33 42,22 57,22" fill="none" stroke={cor} strokeWidth="1.2" opacity="0.9"/>
    <circle cx="60" cy="28" r="3" fill={cor} opacity="0.8"/>
    {/* Raios */}
    {[0,45,90,135,180,225,270,315].map((a,i) => (
      <line key={i} x1="60" y1="28"
        x2={60 + Math.cos(a*Math.PI/180)*36}
        y2={28 + Math.sin(a*Math.PI/180)*36}
        stroke={cor} strokeWidth="0.5" opacity="0.25"/>
    ))}
    {/* Linhas genealógicas */}
    <line x1="20" y1="65" x2="100" y2="65" stroke={cor} strokeWidth="0.6" opacity="0.4"/>
    <line x1="30" y1="60" x2="30" y2="70" stroke={cor} strokeWidth="0.6" opacity="0.4"/>
    <line x1="60" y1="60" x2="60" y2="70" stroke={cor} strokeWidth="0.6" opacity="0.4"/>
    <line x1="90" y1="60" x2="90" y2="70" stroke={cor} strokeWidth="0.6" opacity="0.4"/>
    <circle cx="30" cy="58" r="2.5" fill="none" stroke={cor} strokeWidth="0.8" opacity="0.6"/>
    <circle cx="60" cy="58" r="2.5" fill={cor} opacity="0.8"/>
    <circle cx="90" cy="58" r="2.5" fill="none" stroke={cor} strokeWidth="0.8" opacity="0.4"/>
    {/* Texto grego */}
    <text x="60" y="77" textAnchor="middle" fontFamily="serif" fontSize="6" fill={cor} opacity="0.55" letterSpacing="1">Βίβλος γενέσεως</text>
  </svg>
);

const SVG_VOL2 = (cor: string) => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" style={{ width: '90%', opacity: 0.72 }}>
    {/* Semeador — parábola do reino */}
    <ellipse cx="60" cy="55" rx="42" ry="8" fill="none" stroke={cor} strokeWidth="0.6" opacity="0.3"/>
    {/* Sementes espalhadas */}
    {[[30,45],[45,38],[60,42],[75,36],[90,48],[38,52],[68,50],[85,56]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="1.5" fill={cor} opacity={0.4 + (i%3)*0.2}/>
    ))}
    {/* Coroa / reino */}
    <path d="M40,25 L45,10 L55,20 L60,8 L65,20 L75,10 L80,25 Z" fill="none" stroke={cor} strokeWidth="1.1" opacity="0.85"/>
    <line x1="38" y1="27" x2="82" y2="27" stroke={cor} strokeWidth="0.8" opacity="0.5"/>
    {/* Raios do sol */}
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => (
      <line key={i} x1={60 + Math.cos(a*Math.PI/180)*10} y1={16 + Math.sin(a*Math.PI/180)*10}
            x2={60 + Math.cos(a*Math.PI/180)*16} y2={16 + Math.sin(a*Math.PI/180)*16}
            stroke={cor} strokeWidth="0.5" opacity="0.3"/>
    ))}
    <text x="60" y="76" textAnchor="middle" fontFamily="serif" fontSize="6" fill={cor} opacity="0.55" letterSpacing="1">ἡ βασιλεία τῶν οὐρανῶν</text>
  </svg>
);

const SVG_VOL3 = (cor: string) => (
  <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" style={{ width: '90%', opacity: 0.72 }}>
    {/* Cruz */}
    <line x1="60" y1="8" x2="60" y2="58" stroke={cor} strokeWidth="2.5" opacity="0.9" strokeLinecap="round"/>
    <line x1="42" y1="22" x2="78" y2="22" stroke={cor} strokeWidth="2.5" opacity="0.9" strokeLinecap="round"/>
    {/* Brilho */}
    <circle cx="60" cy="14" r="8" fill={cor} opacity="0.07"/>
    {/* Monte */}
    <path d="M15,68 L45,38 L60,52 L75,38 L105,68 Z" fill="none" stroke={cor} strokeWidth="0.8" opacity="0.4"/>
    {/* Ressurreição — raios */}
    {[30,60,90,120,150].map((a,i) => (
      <line key={i}
        x1={60 + Math.cos((a-90)*Math.PI/180)*22}
        y1={33 + Math.sin((a-90)*Math.PI/180)*22}
        x2={60 + Math.cos((a-90)*Math.PI/180)*34}
        y2={33 + Math.sin((a-90)*Math.PI/180)*34}
        stroke={cor} strokeWidth="0.7" opacity="0.35"/>
    ))}
    <text x="60" y="77" textAnchor="middle" fontFamily="serif" fontSize="6" fill={cor} opacity="0.55" letterSpacing="1">ἐγερθεὶς ἀπὸ τῶν νεκρῶν</text>
  </svg>
);

const SVGS = [SVG_VOL1, SVG_VOL2, SVG_VOL3];

/* ── volumes de Mateus ── */
const VOLUMES = [
  {
    vol: 'I',
    titulo: 'Mateus',
    subtitulo: 'Genealogia ao Envio dos Doze',
    cap: 'Mt 1–10',
    seccoes: '10 seções · diagramas expositivos',
    disponivel: true,
    lerHref: '/livros/mateus',
    amazonHref: '#',   /* substituir pelo link real da Amazon */
    temas: ['Genealogia','Nascimento','Sermão da Montanha','Milagres','Envio dos Doze'],
    cor: '#00d4ff',
    corRgb: '0,212,255',
    grad: 'from-[#00d4ff]/25 to-[#7b2ff7]/15',
    badge: 'Disponível',
  },
  {
    vol: 'II',
    titulo: 'Mateus',
    subtitulo: 'O Reino e o Conflito',
    cap: 'Mt 11–20',
    seccoes: '10 seções · diagramas expositivos',
    disponivel: false,
    lerHref: null,
    amazonHref: null,
    temas: ['Parábolas do Reino','Conflito com Fariseus','Transfiguração','Discurso Comunitário'],
    cor: '#7b2ff7',
    corRgb: '123,47,247',
    grad: 'from-[#7b2ff7]/25 to-[#00d4ff]/15',
    badge: 'Em breve',
  },
  {
    vol: 'III',
    titulo: 'Mateus',
    subtitulo: 'Jerusalém e a Grande Comissão',
    cap: 'Mt 21–28',
    seccoes: '5 seções · diagramas expositivos',
    disponivel: false,
    lerHref: null,
    amazonHref: null,
    temas: ['Entrada em Jerusalém','Discurso Escatológico','Paixão','Ressurreição','Grande Comissão'],
    cor: '#ff2d55',
    corRgb: '255,45,85',
    grad: 'from-[#ff2d55]/25 to-[#7b2ff7]/15',
    badge: 'Em breve',
  },
];

const AUTOR = 'Prof. Dr. Fabio Miranda';
const AUTOR_FULL = 'Prof. Dr. Fabio Miranda — Teologia e Tecnologias';

/* ══════════════════════════════════════════════
   CAPA DO LIVRO — CSS 3D IMPACTANTE
══════════════════════════════════════════════ */
function BookCover({ vol, disponivel, idx }: { vol: typeof VOLUMES[0]; disponivel: boolean; idx: number }) {
  const { cor, corRgb } = vol;

  return (
    <div style={{ perspective: 1200 }} className="flex justify-center">
      <motion.div
        /* ── flutuação suave contínua ── */
        animate={{ y: [0, -10, 0], rotateZ: [0, 0.4, 0, -0.4, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={disponivel ? { rotateY: -14, rotateX: 3, scale: 1.05, y: -16 } : { scale: 0.98 }}
        style={{
          width: 'clamp(180px, 48vw, 230px)',
          height: 'clamp(258px, 69vw, 330px)',
          transformStyle: 'preserve-3d',
          position: 'relative',
          cursor: disponivel ? 'pointer' : 'default',
          filter: disponivel
            ? `drop-shadow(0 20px 40px rgba(${corRgb},0.35)) drop-shadow(0 0 80px rgba(${corRgb},0.15))`
            : 'drop-shadow(0 12px 24px rgba(0,0,0,0.6))',
        }}
      >
        {/* ── FRENTE DO LIVRO ── */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '3px 14px 14px 3px',
          overflow: 'hidden',
          background: `linear-gradient(160deg, #0d1a30 0%, #070d1a 60%, #050810 100%)`,
          border: `1px solid rgba(${corRgb},0.45)`,
          boxShadow: disponivel
            ? `inset 0 0 0 1px rgba(${corRgb},0.12), inset -3px 0 12px rgba(0,0,0,0.7)`
            : `inset 0 0 0 1px rgba(255,255,255,0.05), inset -3px 0 12px rgba(0,0,0,0.7)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>

          {/* ── FAIXA DE TOPO — "BÍBLIA VISUAL EXPOSITIVA" ── */}
          <div style={{
            width: '100%',
            background: disponivel
              ? `linear-gradient(90deg, rgba(${corRgb},0.9) 0%, rgba(${corRgb},0.75) 100%)`
              : `linear-gradient(90deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)`,
            padding: '10px 14px',
            textAlign: 'center',
            flexShrink: 0,
          }}>
            <p style={{
              fontFamily: '"Cinzel Decorative", serif',
              fontSize: 8.5,
              fontWeight: 900,
              letterSpacing: '0.18em',
              color: disponivel ? '#000000' : 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              lineHeight: 1.3,
              textShadow: disponivel ? 'none' : undefined,
            }}>
              Bíblia Visual<br/>Expositiva
            </p>
          </div>

          {/* ── CORPO CENTRAL ── */}
          <div style={{
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px 16px 8px',
            position: 'relative',
          }}>
            {/* Gradiente radial de fundo */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse at 50% 45%, rgba(${corRgb},0.14) 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            {/* Linha decorativa topo */}
            <div style={{ width: '75%', height: 1, background: `linear-gradient(to right, transparent, rgba(${corRgb},0.7), transparent)`, marginBottom: 14 }} />

            {/* Volume */}
            <p style={{
              fontFamily: '"Cinzel", serif',
              fontSize: 10,
              letterSpacing: '0.55em',
              color: `rgba(${corRgb},${disponivel ? '1' : '0.4'})`,
              textTransform: 'uppercase',
              marginBottom: 10,
              zIndex: 1,
            }}>Vol. {vol.vol}</p>

            {/* Título principal */}
            <p style={{
              fontFamily: '"Cinzel Decorative", serif',
              fontSize: 'clamp(28px, 11vw, 38px)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1,
              letterSpacing: '0.08em',
              textAlign: 'center',
              zIndex: 1,
              whiteSpace: 'nowrap',
              textShadow: disponivel ? `0 0 40px rgba(${corRgb},0.5), 0 2px 0 rgba(0,0,0,0.8)` : '0 2px 0 rgba(0,0,0,0.8)',
            }}>
              MATEUS
            </p>

            {/* Ilustração temática */}
            <div style={{ zIndex:1, display:'flex', justifyContent:'center', margin:'6px 0 2px' }}>
              {SVGS[idx](cor)}
            </div>

            {/* Referência */}
            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10,
              letterSpacing: '0.2em',
              color: disponivel ? `rgba(${corRgb},0.9)` : 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
              zIndex: 1,
            }}>{vol.cap}</p>

            {/* Linha decorativa baixo */}
            <div style={{ width: '75%', height: 1, background: `linear-gradient(to right, transparent, rgba(${corRgb},0.5), transparent)`, marginTop: 14 }} />
          </div>

          {/* ── FAIXA INFERIOR — AUTOR ── */}
          <div style={{
            width: '100%',
            borderTop: `1px solid rgba(${corRgb},0.2)`,
            padding: '8px 14px',
            textAlign: 'center',
            flexShrink: 0,
            background: 'rgba(0,0,0,0.3)',
          }}>
            <p style={{
              fontFamily: '"Cinzel", serif',
              fontSize: 6.5,
              letterSpacing: '0.18em',
              color: disponivel ? `rgba(${corRgb},0.85)` : 'rgba(255,255,255,0.25)',
              textTransform: 'uppercase',
              lineHeight: 1.5,
            }}>{AUTOR}</p>
          </div>

          {/* ── LOMBADA ── */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, background: `linear-gradient(to right, rgba(${corRgb},0.6), rgba(${corRgb},0.15))` }} />

          {/* Overlay de bloqueio */}
          {!disponivel && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(5,8,18,0.62)',
              backdropFilter: 'blur(2px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <Lock size={26} color="rgba(255,255,255,0.25)" />
                <span style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 8, letterSpacing: '0.35em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>Em breve</span>
              </div>
            </div>
          )}
        </div>

        {/* ── LOMBADA LATERAL ── */}
        <div style={{
          position: 'absolute',
          left: -14, top: 6, bottom: 6, width: 14,
          background: `linear-gradient(to left, rgba(${corRgb},0.3), rgba(0,0,0,0.8))`,
          borderRadius: '3px 0 0 3px',
          transform: 'rotateY(-90deg)',
          transformOrigin: 'right center',
        }} />
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   CARD DO VOLUME
══════════════════════════════════════════════ */
function VolumeCard({ vol, idx }: { vol: typeof VOLUMES[0]; idx: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65 }}
      className="rounded-2xl border overflow-hidden"
      style={{
        background: 'rgba(8,12,24,0.95)',
        borderColor: vol.disponivel ? `rgba(${vol.corRgb},0.25)` : 'rgba(255,255,255,0.06)',
        boxShadow: vol.disponivel ? `0 0 60px rgba(${vol.corRgb},0.08)` : undefined,
      }}
    >
      {/* Faixa de cor topo */}
      <div style={{
        height: 3,
        background: vol.disponivel
          ? `linear-gradient(90deg, rgba(${vol.corRgb},0.9), rgba(${vol.corRgb},0.3))`
          : 'rgba(255,255,255,0.06)',
      }} />

      <div className="p-8 sm:p-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* ── CAPA 3D ── */}
          <div className="lg:shrink-0 w-full lg:w-auto flex flex-col items-center gap-5">
            <BookCover vol={vol} disponivel={vol.disponivel} idx={idx} />

            {/* Badge de status */}
            <span
              className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full"
              style={{
                fontFamily: '"Orbitron", sans-serif',
                color: vol.disponivel ? vol.cor : 'rgba(255,255,255,0.35)',
                background: vol.disponivel ? `rgba(${vol.corRgb},0.1)` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${vol.disponivel ? `rgba(${vol.corRgb},0.4)` : 'rgba(255,255,255,0.08)'}`,
                boxShadow: vol.disponivel ? `0 0 16px rgba(${vol.corRgb},0.2)` : undefined,
              }}
            >
              {vol.disponivel && (
                <motion.span
                  className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle"
                  style={{ background: vol.cor }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              {vol.badge}
            </span>
          </div>

          {/* ── INFORMAÇÕES ── */}
          <div className="flex-1 min-w-0">

            {/* Série */}
            <p className="mb-2" style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 9, letterSpacing: '0.45em', color: `rgba(${vol.corRgb},0.7)`, textTransform: 'uppercase' }}>
              Novo Testamento · Volume {vol.vol}
            </p>

            {/* Título */}
            <h2 style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 900, color: '#ffffff', lineHeight: 1, marginBottom: 6, textShadow: vol.disponivel ? `0 0 40px rgba(${vol.corRgb},0.3)` : undefined }}>
              {vol.titulo}
            </h2>

            {/* Subtítulo */}
            <p style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 13, letterSpacing: '0.1em', color: vol.cor, marginBottom: 6 }}>
              {vol.subtitulo}
            </p>

            {/* Meta */}
            <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 22 }}>
              {vol.cap} · {vol.seccoes}
            </p>

            {/* Temas */}
            <div className="flex flex-wrap gap-2 mb-8">
              {vol.temas.map(t => (
                <span key={t} style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: 12,
                  padding: '4px 12px',
                  borderRadius: 50,
                  color: `rgba(${vol.corRgb},0.9)`,
                  background: `rgba(${vol.corRgb},0.08)`,
                  border: `1px solid rgba(${vol.corRgb},0.25)`,
                }}>{t}</span>
              ))}
            </div>

            {/* Descrição */}
            <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.78)', lineHeight: 1.85, marginBottom: 24 }}>
              {vol.disponivel
                ? `Análise expositiva completa de ${vol.cap} com diagramas hermenêuticos aplicados a cada perícope. Inclui diagramas quiásticos, análise interlinear, cristologia, homilética e muito mais.`
                : `Volume em produção. Quando lançado, incluirá análise expositiva completa de ${vol.cap} com todos os diagramas expositivos aplicados a cada uma das seções.`}
            </p>

            {/* Avaliação */}
            {vol.disponivel && (
              <div className="flex items-center gap-2 mb-8">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={15} fill="#c9a84c" color="#c9a84c" />)}
                </div>
                <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
                  Diagramas Hermenêuticos por perícope
                </span>
              </div>
            )}

            {/* Autor */}
            <p style={{ fontFamily: '"Cinzel", serif', fontSize: 11, letterSpacing: '0.12em', color: `rgba(${vol.corRgb},${vol.disponivel ? '0.75' : '0.3'})`, marginBottom: 24 }}>
              {AUTOR_FULL}
            </p>

            {/* Botões de ação */}
            {vol.disponivel ? (
              <div style={{ display:'flex', flexWrap:'wrap', gap:12 }}>
                <Link to={vol.lerHref!} style={{ flex: '1 1 140px' }}>
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: `0 0 28px rgba(${vol.corRgb},0.35)` }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: '100%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      padding: '13px 20px', borderRadius: 50,
                      fontFamily: '"Orbitron", sans-serif',
                      fontSize: 11, fontWeight: 900,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      background: `rgba(${vol.corRgb},0.12)`,
                      border: `1px solid rgba(${vol.corRgb},0.55)`,
                      color: vol.cor,
                      cursor: 'pointer',
                    }}
                  >
                    <Eye size={15} />
                    Ler Online
                  </motion.button>
                </Link>

                <a href={vol.amazonHref!} target="_blank" rel="noopener noreferrer" style={{ flex: '1 1 160px' }}>
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: `0 8px 32px rgba(${vol.corRgb},0.45)` }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: '100%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      padding: '13px 20px', borderRadius: 50,
                      fontFamily: '"Orbitron", sans-serif',
                      fontSize: 11, fontWeight: 900,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      background: vol.cor,
                      color: '#000000',
                      cursor: 'pointer',
                      border: 'none',
                      boxShadow: `0 4px 20px rgba(${vol.corRgb},0.3)`,
                    }}
                  >
                    <ShoppingCart size={15} />
                    Comprar · Amazon
                  </motion.button>
                </a>
              </div>
            ) : (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 20px', borderRadius: 50,
                fontFamily: '"Orbitron", sans-serif', fontSize: 11,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.25)',
              }}>
                <Lock size={13} />
                Em Produção
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ══════════════════════════════════════════════
   PÁGINA PRINCIPAL
══════════════════════════════════════════════ */
export default function LibrariaPage() {
  return (
    <div className="min-h-screen bg-bg-deep">
      <Navbar />

      <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          {/* Marca */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <motion.div
              className="flex items-center gap-3 px-5 py-2.5 rounded-full"
              style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.3)' }}
              animate={{ boxShadow: ['0 0 0px rgba(0,212,255,0)', '0 0 24px rgba(0,212,255,0.2)', '0 0 0px rgba(0,212,255,0)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <BookOpen size={14} color="#00d4ff" />
              <span style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: 12, letterSpacing: '0.2em', color: '#00d4ff', textTransform: 'uppercase' }}>
                Bíblia Visual Expositiva
              </span>
            </motion.div>
          </div>

          <h1 style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 'clamp(36px,7vw,68px)', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1, marginBottom: 16 }}>
            LIVRARIA
          </h1>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div style={{ height: 1, width: 60, background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.5))' }} />
            <span style={{ color: '#00d4ff', fontSize: 14 }}>✦</span>
            <div style={{ height: 1, width: 60, background: 'linear-gradient(to left, transparent, rgba(0,212,255,0.5))' }} />
          </div>

          <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, maxWidth: 520, margin: '0 auto 10px' }}>
            Volumes físicos e digitais com diagramas hermenêuticos por perícope para estudo expositivo profundo.
          </p>

          <p style={{ fontFamily: '"Cinzel", serif', fontSize: 11, letterSpacing: '0.15em', color: 'rgba(0,212,255,0.65)' }}>
            {AUTOR_FULL}
          </p>
        </motion.div>

        {/* ── Divisor ── */}
        <div className="flex items-center gap-4 mb-10">
          <div style={{ height: 1, flex: 1, background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.2))' }} />
          <span style={{ fontFamily: '"Cinzel", serif', fontSize: 10, letterSpacing: '0.4em', color: 'rgba(0,212,255,0.7)', textTransform: 'uppercase' }}>
            Evangelho de Mateus
          </span>
          <div style={{ height: 1, flex: 1, background: 'linear-gradient(to left, transparent, rgba(0,212,255,0.2))' }} />
        </div>

        {/* ── Volumes ── */}
        <div className="flex flex-col gap-8">
          {VOLUMES.map((vol, i) => <VolumeCard key={vol.vol} vol={vol} idx={i} />)}
        </div>

        {/* ── Rodapé ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-20 text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <div style={{ height: 1, width: 80, background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.3))' }} />
            <span style={{ color: '#00d4ff', fontSize: 12 }}>✦</span>
            <div style={{ height: 1, width: 80, background: 'linear-gradient(to left, transparent, rgba(0,212,255,0.3))' }} />
          </div>
          <p style={{ fontFamily: '"Cinzel", serif', fontSize: 12, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)' }}>
            {AUTOR_FULL}
          </p>
          <p style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
            Novos volumes em breve · Outros livros da Bíblia a caminho
          </p>
        </motion.div>
      </div>
    </div>
  );
}
