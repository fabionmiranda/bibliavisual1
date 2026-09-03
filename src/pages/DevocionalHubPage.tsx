import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BG = '#05071a';

function getDevocionais(pt: boolean) {
  return [
    {
      id: 'espelhado',
      num: '01',
      icon: '🔁',
      titulo: pt ? 'Devocional Espelhado' : 'Mirror Devotional',
      subtitulo: pt ? 'Leitura bíblica progressiva' : 'Progressive biblical reading',
      descricao: pt
        ? 'Percorra as Escrituras do Gênesis ao Apocalipse dia a dia — com estrutura quiástica, transliteração hebraica e reflexão expositiva profunda.'
        : 'Journey through Scripture from Genesis to Revelation day by day — with chiastic structure, Hebrew transliteration, and deep expository reflection.',
      cor: 'rgba(0,212,255,1)',
      corRgb: '0,212,255',
      path: '/devocional/espelhado',
      badge: pt ? 'Bíblia Completa' : 'Full Bible',
      bullets: pt ? [
        { icon: '📖', texto: 'Gênesis ao Apocalipse' },
        { icon: '🔄', texto: 'Estrutura quiástica' },
        { icon: '🔤', texto: 'Transliteração hebraica' },
        { icon: '💡', texto: 'Reflexão expositiva profunda' },
      ] : [
        { icon: '📖', texto: 'Genesis to Revelation' },
        { icon: '🔄', texto: 'Chiastic structure' },
        { icon: '🔤', texto: 'Hebrew transliteration' },
        { icon: '💡', texto: 'Deep expository reflection' },
      ],
      destaque: 'AT + NT',
      destaqueLabel: pt ? 'Testamentos' : 'Testaments',
    },
    {
      id: 'familiar',
      num: '02',
      icon: '💑',
      titulo: pt ? 'Devocional Familiar' : 'Family Devotional',
      subtitulo: pt ? 'Para namorados, noivos e casados' : 'For dating, engaged & married couples',
      descricao: pt
        ? '365 dias pelo Novo Testamento inteiro — expositivo, em ordem, sem pular textos. Quatro Estações da Aliança, do nascimento ao destino eterno do casamento cristão.'
        : '365 days through the entire New Testament — expository, in order, no skipped texts. Four Covenant Seasons, from birth to the eternal destiny of Christian marriage.',
      cor: 'rgba(251,113,133,1)',
      corRgb: '251,113,133',
      path: '/devocional/familiar',
      badge: pt ? '365 Dias · NT Completo' : '365 Days · Full NT',
      bullets: pt ? [
        { icon: '📅', texto: '365 dias · NT completo' },
        { icon: '🌿', texto: 'Quatro Estações da Aliança' },
        { icon: '👫', texto: 'Reflexões por homem e mulher' },
        { icon: '🍽️', texto: 'Mesa da Aliança semanal' },
      ] : [
        { icon: '📅', texto: '365 days · full NT' },
        { icon: '🌿', texto: 'Four Covenant Seasons' },
        { icon: '👫', texto: 'Reflections for man and woman' },
        { icon: '🍽️', texto: 'Weekly Covenant Table' },
      ],
      destaque: '365',
      destaqueLabel: pt ? 'Dias' : 'Days',
    },
    {
      id: 'confessional',
      num: '03',
      icon: '📜',
      titulo: pt ? 'Devocional Confessional' : 'Confessional Devotional',
      subtitulo: pt ? 'Teologia histórica na Era Digital' : 'Historic theology in the Digital Age',
      descricao: pt
        ? '365 devocionais percorrendo a Confissão Batista de 1689 e a Confissão de Fé de Westminster — teologia histórica aplicada ao cotidiano digital.'
        : '365 devotionals walking through the 1689 Baptist Confession and the Westminster Confession of Faith — historic theology applied to digital daily life.',
      cor: 'rgba(167,139,250,1)',
      corRgb: '167,139,250',
      path: '/devocional/confessional',
      badge: pt ? '365 Dias' : '365 Days',
      bullets: pt ? [
        { icon: '🏛️', texto: 'CB 1689 + CFW' },
        { icon: '📅', texto: '365 devocionais' },
        { icon: '💻', texto: 'Teologia aplicada ao digital' },
        { icon: '🔍', texto: 'Exposição e aplicação' },
      ] : [
        { icon: '🏛️', texto: 'BC 1689 + WCF' },
        { icon: '📅', texto: '365 devotionals' },
        { icon: '💻', texto: 'Theology applied to digital life' },
        { icon: '🔍', texto: 'Exposition and application' },
      ],
      destaque: 'CB+CFW',
      destaqueLabel: pt ? 'Confissões' : 'Confessions',
    },
  ];
}

function CardDevocional({ dev, index, pt }: { dev: ReturnType<typeof getDevocionais>[0]; index: number; pt: boolean }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.13, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      onClick={() => navigate(dev.path)}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      <motion.div
        animate={{ opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', inset: -2, borderRadius: 28, pointerEvents: 'none', zIndex: 0,
          background: `radial-gradient(ellipse at 50% -10%, rgba(${dev.corRgb},0.22) 0%, transparent 65%)`,
          filter: 'blur(1px)',
        }}
      />

      <motion.div
        animate={{
          borderColor: hover ? `rgba(${dev.corRgb},0.60)` : `rgba(${dev.corRgb},0.16)`,
          background: hover ? `rgba(${dev.corRgb},0.07)` : `rgba(${dev.corRgb},0.02)`,
        }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'relative', zIndex: 1,
          borderRadius: 26,
          border: `1.5px solid rgba(${dev.corRgb},0.16)`,
          padding: 'clamp(26px,3.5vw,38px)',
          display: 'flex', flexDirection: 'column', gap: 0,
          overflow: 'hidden',
          height: '100%',
        }}
      >
        <motion.div
          animate={{ scaleX: hover ? 1 : 0, opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.38 }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${dev.cor}, transparent)`,
            transformOrigin: 'center',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
          <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.28em', color: `rgba(${dev.corRgb},0.38)` }}>
            N.º {dev.num}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            <motion.span
              animate={{ background: hover ? `rgba(${dev.corRgb},0.18)` : `rgba(${dev.corRgb},0.08)` }}
              transition={{ duration: 0.25 }}
              style={{
                fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: dev.cor, padding: '4px 14px', borderRadius: 99,
                border: `1px solid rgba(${dev.corRgb},0.25)`,
              }}
            >
              {dev.badge}
            </motion.span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 22 }}>
          <motion.div
            animate={{ scale: hover ? 1.10 : 1, y: hover ? -3 : 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 62, height: 62, borderRadius: 18, flexShrink: 0,
              background: `rgba(${dev.corRgb},0.10)`,
              border: `1.5px solid rgba(${dev.corRgb},0.24)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28,
            }}
          >
            {dev.icon}
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontSize: 'clamp(26px,3.5vw,34px)', fontWeight: 900, color: `rgba(${dev.corRgb},0.55)`, letterSpacing: '-0.02em' }}>
              {dev.destaque}
            </span>
            <span style={{ fontSize: 10, fontWeight: 700, color: `rgba(${dev.corRgb},0.45)`, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {dev.destaqueLabel}
            </span>
          </div>
        </div>

        <h2 style={{ fontSize: 'clamp(20px,2.6vw,26px)', fontWeight: 900, color: '#fff', margin: '0 0 6px', lineHeight: 1.15 }}>
          {dev.titulo}
        </h2>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: `rgba(${dev.corRgb},0.75)` }}>
          {dev.subtitulo}
        </div>

        <p style={{ fontSize: 'clamp(13px,1.7vw,15px)', color: 'rgba(210,205,255,0.62)', lineHeight: 1.82, margin: '0 0 22px', flex: 1 }}>
          {dev.descricao}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 26 }}>
          {dev.bullets.map((b, j) => (
            <motion.div
              key={j}
              animate={{ x: hover ? 5 : 0, opacity: hover ? 1 : 0.68 }}
              transition={{ duration: 0.2, delay: hover ? j * 0.04 : 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <span style={{ fontSize: 14, flexShrink: 0 }}>{b.icon}</span>
              <span style={{ fontSize: 13, color: 'rgba(210,205,255,0.75)', fontWeight: 500 }}>{b.texto}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          animate={{ background: hover ? `rgba(${dev.corRgb},0.25)` : `rgba(${dev.corRgb},0.10)` }}
          transition={{ duration: 0.25 }}
          style={{ height: 1, marginBottom: 20 }}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <motion.span
            animate={{ color: hover ? dev.cor : `rgba(${dev.corRgb},0.55)` }}
            transition={{ duration: 0.22 }}
            style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.10em', textTransform: 'uppercase' }}
          >
            {pt ? 'Acessar devocional' : 'Open devotional'}
          </motion.span>
          <motion.div
            animate={{
              x: hover ? 6 : 0,
              opacity: hover ? 1 : 0.45,
              background: hover ? `rgba(${dev.corRgb},0.18)` : `rgba(${dev.corRgb},0.08)`,
            }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 38, height: 38, borderRadius: 10,
              border: `1px solid rgba(${dev.corRgb},0.28)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: dev.cor, fontSize: 16, fontWeight: 900,
            }}
          >
            →
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Comparativo interativo ───────────────────────────────────────────────────
function getComparativo(pt: boolean) {
  return [
    { label: pt ? 'Cobertura bíblica' : 'Biblical coverage',   esp: pt ? 'AT + NT inteiros' : 'Full OT + NT',     fam: pt ? 'NT completo' : 'Full NT',        conf: 'CB 1689 + CFW' },
    { label: pt ? 'Duração' : 'Duration',                       esp: pt ? 'Sem limite fixo' : 'No fixed limit',    fam: pt ? '365 dias' : '365 days',           conf: pt ? '365 dias' : '365 days' },
    { label: pt ? 'Público-alvo' : 'Target audience',           esp: pt ? 'Todo cristão' : 'All Christians',       fam: pt ? 'Casais e famílias' : 'Couples & families', conf: pt ? 'Todo cristão' : 'All Christians' },
    { label: pt ? 'Estrutura semanal' : 'Weekly structure',     esp: pt ? 'Diário expositivo' : 'Daily expository', fam: pt ? '5 leit. + apl. + mesa' : '5 readings + app. + table', conf: pt ? 'Diário temático' : 'Daily thematic' },
    { label: pt ? 'Reflexão especial' : 'Special reflection',   esp: pt ? 'Quiástica + hebraico' : 'Chiastic + Hebrew',  fam: pt ? 'Homem / Mulher / Filhos' : 'Man / Woman / Children', conf: pt ? 'Confissional histórica' : 'Historic confessional' },
  ];
}

function TabelaComparativa({ pt }: { pt: boolean }) {
  const [ativo, setAtivo] = useState<number | null>(null);
  const cores = [
    { cor: 'rgba(0,212,255,1)', rgb: '0,212,255' },
    { cor: 'rgba(251,113,133,1)', rgb: '251,113,133' },
    { cor: 'rgba(167,139,250,1)', rgb: '167,139,250' },
  ];
  const headers = pt ? ['Espelhado', 'Familiar', 'Confessional'] : ['Mirror', 'Family', 'Confessional'];
  const COMPARATIVO = getComparativo(pt);

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 520 }}>
        <thead>
          <tr>
            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 10, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(200,200,255,0.40)', width: '24%' }}>
              {pt ? 'Aspecto' : 'Aspect'}
            </th>
            {headers.map((h, i) => (
              <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 900, color: cores[i].cor, borderBottom: `2px solid rgba(${cores[i].rgb},0.25)` }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARATIVO.map((row, r) => (
            <motion.tr
              key={r}
              onHoverStart={() => setAtivo(r)}
              onHoverEnd={() => setAtivo(null)}
              animate={{ background: ativo === r ? 'rgba(255,255,255,0.03)' : 'transparent' }}
              style={{ cursor: 'default', borderRadius: 8 }}
            >
              <td style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: 'rgba(200,200,255,0.50)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {row.label}
              </td>
              {[row.esp, row.fam, row.conf].map((val, i) => (
                <td key={i} style={{ padding: '12px 16px', fontSize: 13, color: ativo === r ? cores[i].cor : 'rgba(210,205,255,0.72)', fontWeight: ativo === r ? 700 : 500, borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'color 0.2s' }}>
                  {val}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function getFaqs(pt: boolean) {
  return pt ? [
    { q: 'Posso usar mais de um devocional ao mesmo tempo?', r: 'Sim — cada devocional é independente. Você pode acessar os três simultaneamente e navegar entre eles livremente.' },
    { q: 'Os dias têm datas fixas?', r: 'Não. Nenhum dia tem data fixa. Comece quando quiser e siga a sequência no seu próprio ritmo.' },
    { q: 'O Devocional Familiar é só para casados?', r: 'Não — é para namorados, noivos e casados. As reflexões por "Homem" e "Mulher" se aplicam a qualquer relação de aliança conjugal em qualquer etapa.' },
    { q: 'O Devocional Confessional é só para batistas?', r: 'Não. A Confissão Batista de 1689 e a Confissão de Westminster compartilham quase toda a teologia reformada. É útil para qualquer cristão que queira enraizamento histórico.' },
  ] : [
    { q: 'Can I use more than one devotional at the same time?', r: 'Yes — each devotional is independent. You can access all three simultaneously and navigate between them freely.' },
    { q: 'Do the days have fixed dates?', r: 'No. No day is tied to a calendar date. Start whenever you want and follow the sequence at your own pace.' },
    { q: 'Is the Family Devotional only for married couples?', r: 'No — it is for dating, engaged, and married couples. The "Man" and "Woman" reflections apply to any covenantal relationship at any stage.' },
    { q: 'Is the Confessional Devotional only for Baptists?', r: 'No. The 1689 Baptist Confession and the Westminster Confession share nearly all Reformed theology. It is useful for any Christian seeking historical rootedness.' },
  ];
}

function FAQItem({ item, index }: { item: { q: string; r: string }; index: number }) {
  const [aberto, setAberto] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      style={{ borderRadius: 14, border: `1px solid ${aberto ? 'rgba(167,139,250,0.35)' : 'rgba(255,255,255,0.07)'}`, overflow: 'hidden', transition: 'border-color 0.22s' }}
    >
      <button
        onClick={() => setAberto(v => !v)}
        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, textAlign: 'left' }}
      >
        <span style={{ fontSize: 14, fontWeight: 700, color: aberto ? '#fff' : 'rgba(210,205,255,0.80)', lineHeight: 1.4 }}>{item.q}</span>
        <motion.span
          animate={{ rotate: aberto ? 180 : 0, color: aberto ? 'rgba(167,139,250,1)' : 'rgba(200,200,255,0.35)' }}
          transition={{ duration: 0.22 }}
          style={{ fontSize: 14, flexShrink: 0 }}
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {aberto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.26 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 20px 18px' }}>
              <p style={{ margin: 0, fontSize: 14, color: 'rgba(200,200,255,0.62)', lineHeight: 1.80 }}>{item.r}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────
export default function DevocionalHubPage() {
  const [comparativoAberto, setComparativoAberto] = useState(false);
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const pt = lang === 'pt';
  const DEVOCIONAIS = getDevocionais(pt);
  const FAQS = getFaqs(pt);

  return (
    <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
      <Navbar lang={lang} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(84px,10vw,106px) clamp(16px,4vw,40px) 120px' }}>

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 72, textAlign: 'center' }}
        >
          <motion.div
            animate={{ rotate: [0, 6, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4 }}
            style={{ fontSize: 'clamp(52px,8vw,74px)', marginBottom: 20, lineHeight: 1, display: 'inline-block' }}
          >
            🕊️
          </motion.div>

          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.40em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.70)', marginBottom: 14 }}>
            {pt ? 'Formação espiritual' : 'Spiritual formation'}
          </div>

          <h1 style={{
            fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, lineHeight: 1.08, margin: '0 0 18px',
            background: 'linear-gradient(135deg, #fff 20%, rgba(167,139,250,1) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {pt ? 'Escolha seu Devocional' : 'Choose Your Devotional'}
          </h1>

          <p style={{ fontSize: 'clamp(14px,1.9vw,17px)', color: 'rgba(200,200,255,0.52)', lineHeight: 1.85, maxWidth: 580, margin: '0 auto 32px' }}>
            {pt
              ? 'Três caminhos de formação espiritual — expositivo, familiar e confessional. Cada um tem estrutura, ritmo e público próprios. Você pode usar os três.'
              : 'Three paths of spiritual formation — expository, family, and confessional. Each has its own structure, rhythm, and audience. You can use all three.'}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, maxWidth: 280, margin: '0 auto' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(167,139,250,0.18)' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(167,139,250,0.50)' }} />
            <div style={{ flex: 1, height: 1, background: 'rgba(167,139,250,0.18)' }} />
          </div>
        </motion.div>

        {/* ── Cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 22,
          marginBottom: 72,
          alignItems: 'stretch',
        }}>
          {DEVOCIONAIS.map((dev, i) => (
            <CardDevocional key={dev.id} dev={dev} index={i} pt={pt} />
          ))}
        </div>

        {/* ── Comparativo ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 64 }}
        >
          <button
            onClick={() => setComparativoAberto(v => !v)}
            style={{
              width: '100%', background: 'none', cursor: 'pointer',
              border: `1.5px solid ${comparativoAberto ? 'rgba(167,139,250,0.40)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 16, padding: '16px 22px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
              transition: 'border-color 0.22s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 18 }}>📊</span>
              <span style={{ fontSize: 13, fontWeight: 900, color: comparativoAberto ? 'rgba(167,139,250,1)' : 'rgba(200,200,255,0.65)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {pt ? 'Comparar os três devocionais' : 'Compare the three devotionals'}
              </span>
            </div>
            <motion.span
              animate={{ rotate: comparativoAberto ? 180 : 0, color: comparativoAberto ? 'rgba(167,139,250,1)' : 'rgba(200,200,255,0.35)' }}
              transition={{ duration: 0.22 }}
              style={{ fontSize: 14 }}
            >
              ▼
            </motion.span>
          </button>

          <AnimatePresence>
            {comparativoAberto && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ borderRadius: '0 0 16px 16px', border: '1px solid rgba(167,139,250,0.18)', borderTop: 'none', padding: 'clamp(16px,2.5vw,24px)', paddingTop: 8 }}>
                  <TabelaComparativa pt={pt} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Como funciona ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 64 }}
        >
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.60)', marginBottom: 10 }}>
              {pt ? 'Princípios' : 'Principles'}
            </div>
            <h2 style={{ fontSize: 'clamp(20px,3vw,28px)', fontWeight: 900, color: '#fff', margin: 0 }}>
              {pt ? 'Como os devocionais funcionam' : 'How the devotionals work'}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: 16 }}>
            {(pt ? [
              { icon: '🗓️', titulo: 'Sem data fixa', texto: 'Nenhum dia está amarrado a uma data do calendário. Comece quando quiser e siga no seu ritmo.' },
              { icon: '📋', titulo: 'Sequencial', texto: 'O texto vai em ordem — sem pular, sem recortar. A Bíblia é lida como foi escrita: do início ao fim.' },
              { icon: '🔓', titulo: 'Independentes', texto: 'Os três devocionais são totalmente independentes. Você pode acessar qualquer um a qualquer momento.' },
              { icon: '🏠', titulo: 'Para o lar', texto: 'Pensados para serem feitos em família ou em casal — mas individualmente também funcionam.' },
            ] : [
              { icon: '🗓️', titulo: 'No fixed date', texto: 'No day is tied to a calendar date. Start whenever you want and follow at your own pace.' },
              { icon: '📋', titulo: 'Sequential', texto: 'The text goes in order — no skipping, no cutting. The Bible is read as it was written: from beginning to end.' },
              { icon: '🔓', titulo: 'Independent', texto: 'The three devotionals are completely independent. You can access any of them at any time.' },
              { icon: '🏠', titulo: 'For the home', texto: 'Designed to be done as a family or couple — but they also work individually.' },
            ]).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{ borderRadius: 18, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', padding: 'clamp(18px,2.5vw,24px)' }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: '#fff', marginBottom: 8 }}>{item.titulo}</div>
                <p style={{ margin: 0, fontSize: 13, color: 'rgba(200,200,255,0.55)', lineHeight: 1.80 }}>{item.texto}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── FAQ ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 64 }}
        >
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.60)', marginBottom: 10 }}>
              {pt ? 'Perguntas' : 'Questions'}
            </div>
            <h2 style={{ fontSize: 'clamp(20px,3vw,28px)', fontWeight: 900, color: '#fff', margin: 0 }}>
              {pt ? 'Dúvidas frequentes' : 'Frequently asked questions'}
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQS.map((f, i) => <FAQItem key={i} item={f} index={i} />)}
          </div>
        </motion.div>

        {/* ── Rodapé informativo ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, maxWidth: 320, margin: '0 auto 24px' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(167,139,250,0.14)' }} />
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(167,139,250,0.40)' }} />
            <div style={{ flex: 1, height: 1, background: 'rgba(167,139,250,0.14)' }} />
          </div>
          <p style={{ fontSize: 13, color: 'rgba(200,200,255,0.28)', lineHeight: 1.8, margin: 0, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            {pt
              ? <>Cada devocional é independente — você pode acessar os três simultaneamente.<br />Nenhum dia tem data fixa; comece quando quiser e siga a sequência.</>
              : <>Each devotional is independent — you can access all three simultaneously.<br />No day has a fixed date; start whenever you want and follow the sequence.</>}
          </p>
        </motion.div>

      </div>

      <Footer lang={lang} />

      {/* Language toggle — both flags, bottom-left, fully responsive */}
      <div
        className="fixed z-50 flex items-center gap-2 sm:gap-3"
        style={{
          bottom: 'calc(1.25rem + env(safe-area-inset-bottom))',
          left: 'max(1rem, env(safe-area-inset-left))',
          background: 'rgba(10,14,26,0.78)',
          border: '1.5px solid rgba(0,212,255,0.28)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          borderRadius: '999px',
          padding: '7px 12px',
        }}
      >
        <button
          onClick={() => setLang('pt')}
          title="Português"
          className="flex items-center justify-center"
          style={{
            opacity: lang === 'pt' ? 1 : 0.38,
            transform: lang === 'pt' ? 'scale(1.18)' : 'scale(1)',
            transition: 'opacity 0.2s, transform 0.2s',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: 0,
            lineHeight: 0,
            minWidth: '44px',
            minHeight: '44px',
          }}
        >
          <img
            src="https://flagcdn.com/br.svg"
            alt="Português"
            style={{ width: '32px', height: '22px', borderRadius: '4px', objectFit: 'cover', display: 'block', boxShadow: lang === 'pt' ? '0 0 8px rgba(0,212,255,0.5)' : 'none' }}
          />
        </button>
        <button
          onClick={() => setLang('en')}
          title="English"
          className="flex items-center justify-center"
          style={{
            opacity: lang === 'en' ? 1 : 0.38,
            transform: lang === 'en' ? 'scale(1.18)' : 'scale(1)',
            transition: 'opacity 0.2s, transform 0.2s',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: 0,
            lineHeight: 0,
            minWidth: '44px',
            minHeight: '44px',
          }}
        >
          <img
            src="https://flagcdn.com/us.svg"
            alt="English"
            style={{ width: '32px', height: '22px', borderRadius: '4px', objectFit: 'cover', display: 'block', boxShadow: lang === 'en' ? '0 0 8px rgba(0,212,255,0.5)' : 'none' }}
          />
        </button>
      </div>

    </div>
  );
}
