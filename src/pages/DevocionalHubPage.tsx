import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BG = '#05071a';

const SECOES = [
  {
    icon: '🔁',
    titulo: 'Devocional Espelhado',
    subtitulo: 'Leitura bíblica progressiva',
    descricao: 'Percorra as Escrituras do Gênesis ao Apocalipse dia a dia — com estrutura quiástica, transliteração hebraica e reflexão expositiva profunda.',
    detalhes: ['Gênesis ao Apocalipse', 'Estrutura quiástica', 'Transliteração hebraica', 'Reflexão expositiva'],
    cor: 'rgba(0,212,255,1)',
    corRgb: '0,212,255',
    path: '/devocional/espelhado',
    badge: 'Bíblia Completa',
    numero: '01',
  },
  {
    icon: '💑',
    titulo: 'Devocional Familiar',
    subtitulo: 'Para namorados, noivos e casados',
    descricao: '365 dias pelo Novo Testamento inteiro — expositivo, em ordem, sem pular textos. Quatro Estações da Aliança, do nascimento ao destino eterno do casamento cristão.',
    detalhes: ['365 dias · NT completo', 'Quatro Estações da Aliança', 'Reflexões por homem, mulher e filhos', 'Mesa da Aliança semanal'],
    cor: 'rgba(251,113,133,1)',
    corRgb: '251,113,133',
    path: '/devocional/familiar',
    badge: '365 Dias · NT Completo',
    numero: '02',
  },
  {
    icon: '📜',
    titulo: 'Devocional Confessional',
    subtitulo: 'Teologia histórica na Era Digital',
    descricao: '365 devocionais percorrendo a Confissão Batista de 1689 e a Confissão de Fé de Westminster — teologia histórica aplicada ao cotidiano digital.',
    detalhes: ['CB 1689 + CFW', '365 devocionais', 'Teologia aplicada ao digital', 'Exposição e aplicação'],
    cor: 'rgba(167,139,250,1)',
    corRgb: '167,139,250',
    path: '/devocional/confessional',
    badge: '365 Dias',
    numero: '03',
  },
];

function CardDevocional({ s, i }: { s: typeof SECOES[0]; i: number }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      key={s.path}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => navigate(s.path)}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      {/* Brilho de fundo no hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'absolute', inset: -1, borderRadius: 26,
          background: `radial-gradient(ellipse at 50% 0%, rgba(${s.corRgb},0.18) 0%, transparent 70%)`,
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      <motion.div
        animate={{
          borderColor: hovered ? `rgba(${s.corRgb},0.55)` : `rgba(${s.corRgb},0.18)`,
          background: hovered ? `rgba(${s.corRgb},0.06)` : `rgba(${s.corRgb},0.03)`,
        }}
        transition={{ duration: 0.28 }}
        style={{
          position: 'relative', zIndex: 1,
          borderRadius: 24,
          border: `1.5px solid rgba(${s.corRgb},0.18)`,
          padding: 'clamp(28px,4vw,40px)',
          display: 'flex', flexDirection: 'column', gap: 0,
          overflow: 'hidden',
        }}
      >
        {/* Linha decorativa superior */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, rgba(${s.corRgb},0.8), transparent)`,
            transformOrigin: 'center',
          }}
        />

        {/* Número + Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <span style={{
            fontSize: 11, fontWeight: 900, letterSpacing: '0.28em',
            color: `rgba(${s.corRgb},0.40)`,
            fontVariantNumeric: 'tabular-nums',
          }}>
            N.º {s.numero}
          </span>
          <motion.span
            animate={{ background: hovered ? `rgba(${s.corRgb},0.18)` : `rgba(${s.corRgb},0.08)` }}
            transition={{ duration: 0.28 }}
            style={{
              fontSize: 10, fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase',
              color: s.cor, padding: '4px 14px', borderRadius: 99,
              border: `1px solid rgba(${s.corRgb},0.25)`,
            }}
          >
            {s.badge}
          </motion.span>
        </div>

        {/* Ícone */}
        <motion.div
          animate={{ scale: hovered ? 1.08 : 1, y: hovered ? -2 : 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 64, height: 64, borderRadius: 18, marginBottom: 20,
            background: `rgba(${s.corRgb},0.10)`,
            border: `1.5px solid rgba(${s.corRgb},0.22)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 30,
          }}
        >
          {s.icon}
        </motion.div>

        {/* Título + Subtítulo */}
        <h2 style={{
          fontSize: 'clamp(22px,3vw,28px)', fontWeight: 900, color: '#fff',
          margin: '0 0 6px', lineHeight: 1.15,
        }}>
          {s.titulo}
        </h2>
        <div style={{
          fontSize: 13, fontWeight: 700, marginBottom: 18,
          color: `rgba(${s.corRgb},0.80)`,
        }}>
          {s.subtitulo}
        </div>

        {/* Descrição */}
        <p style={{
          fontSize: 'clamp(14px,1.8vw,15px)',
          color: 'rgba(210,205,255,0.65)',
          lineHeight: 1.8, margin: '0 0 24px',
        }}>
          {s.descricao}
        </p>

        {/* Detalhes / Bullets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {s.detalhes.map((d, j) => (
            <motion.div
              key={j}
              animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.7 }}
              transition={{ duration: 0.22, delay: hovered ? j * 0.04 : 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <div style={{
                width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                background: `rgba(${s.corRgb},0.70)`,
              }} />
              <span style={{ fontSize: 13, color: 'rgba(210,205,255,0.75)', fontWeight: 500 }}>{d}</span>
            </motion.div>
          ))}
        </div>

        {/* Separador */}
        <div style={{ height: 1, background: `rgba(${s.corRgb},0.15)`, marginBottom: 20 }} />

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <motion.span
            animate={{ color: hovered ? s.cor : `rgba(${s.corRgb},0.65)` }}
            transition={{ duration: 0.22 }}
            style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.10em', textTransform: 'uppercase' }}
          >
            Acessar devocional
          </motion.span>
          <motion.div
            animate={{ x: hovered ? 6 : 0, opacity: hovered ? 1 : 0.5 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: `rgba(${s.corRgb},0.12)`,
              border: `1px solid rgba(${s.corRgb},0.25)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: s.cor, fontSize: 16, fontWeight: 900,
            }}
          >
            →
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function DevocionalHubPage() {
  return (
    <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
      <Navbar />

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(88px,11vw,108px) clamp(16px,4vw,40px) 120px' }}>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 72, textAlign: 'center' }}
        >
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
            style={{ fontSize: 'clamp(52px,8vw,76px)', marginBottom: 20, lineHeight: 1, display: 'inline-block' }}
          >
            🕊️
          </motion.div>

          <div style={{
            fontSize: 11, fontWeight: 900, letterSpacing: '0.38em', textTransform: 'uppercase',
            color: 'rgba(167,139,250,0.70)', marginBottom: 16,
          }}>
            Formação espiritual
          </div>

          <h1 style={{
            fontSize: 'clamp(30px,5.5vw,54px)', fontWeight: 900, lineHeight: 1.08,
            margin: '0 0 20px',
            background: 'linear-gradient(135deg, #fff 20%, rgba(167,139,250,1) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Escolha seu Devocional
          </h1>

          <p style={{
            fontSize: 'clamp(15px,2vw,17px)',
            color: 'rgba(200,200,255,0.55)', lineHeight: 1.8,
            maxWidth: 560, margin: '0 auto',
          }}>
            Três caminhos de formação espiritual — expositivo, familiar e confessional.
            Escolha o que corresponde ao seu momento e compromisso.
          </p>

          {/* Linha ornamental */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, maxWidth: 320, margin: '32px auto 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(167,139,250,0.20)' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(167,139,250,0.50)' }} />
            <div style={{ flex: 1, height: 1, background: 'rgba(167,139,250,0.20)' }} />
          </div>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 24,
        }}>
          {SECOES.map((s, i) => (
            <CardDevocional key={s.path} s={s} i={i} />
          ))}
        </div>

        {/* Rodapé informativo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            textAlign: 'center', marginTop: 64,
            fontSize: 13, color: 'rgba(200,200,255,0.30)',
            lineHeight: 1.7,
          }}
        >
          Cada devocional é independente — você pode acessar os três simultaneamente.<br />
          Nenhum dia tem data fixa; comece quando quiser e siga a sequência.
        </motion.p>

      </div>

      <Footer />
    </div>
  );
}
