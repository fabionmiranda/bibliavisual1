import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Layers, Shield, Cpu, Zap, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ACCENT     = '#38bdf8'; // sky-400
const ACCENT_RGB = '56,189,248';
const BG         = '#020d1a';

const FOTO_URL = 'https://commons.wikimedia.org/wiki/Special:FilePath/Alvin_Plantinga.jpg';

// ─── 6 eixos filosófico-teológicos ───────────────────────────────────────────
const PILARES = [
  {
    num: '01', label: 'Epistemologia', titulo: 'Crítica ao Evidencialismo e ao Fundacionalismo Clássico',
    cor: '#38bdf8', corRgb: '56,189,248', icon: Layers,
    texto: 'O Iluminismo impôs uma regra tácita: a crença em Deus só seria racional se pudesse ser demonstrada por <span style="color:#38bdf8;font-weight:700;">argumentos dedutivos</span> aceitos por qualquer observador neutro. Essa postura ficou conhecida como <span style="background:rgba(56,189,248,0.12);border-left:3px solid #38bdf8;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,240,255,0.95);">evidencialismo.</span> Plantinga questionou a própria exigência: o <span style="background:rgba(129,140,248,0.15);border:1px solid rgba(129,140,248,0.35);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;">fundacionalismo clássico</span> afirmava que apenas verdades autoevidentes ou imediatamente evidentes aos sentidos poderiam ser aceitas sem provas. Plantinga demonstrou que isso é um erro: diariamente aceitamos crenças que jamais foram demonstradas por provas lógicas — a <em style="color:#34d399;">existência do mundo externo,</em> a <em style="color:#a78bfa;">confiabilidade da memória,</em> a <em style="color:#fbbf24;">existência de outras mentes.</em> Exigir essa demonstração apenas para a <strong style="color:#fff;">fé teísta</strong> é um critério arbitrário e epistemicamente inconsistente.',
    destaque: 'Exigir prova dedutiva apenas para a fé teísta é um critério arbitrário — não uma exigência universal da razão.',
  },
  {
    num: '02', label: 'Teoria do Conhecimento', titulo: 'A Crença em Deus como Propriamente Básica',
    cor: '#a78bfa', corRgb: '167,139,250', icon: Cpu,
    texto: 'A maior contribuição de Plantinga para a teoria do conhecimento foi demonstrar que a crença em Deus é uma <span style="color:#a78bfa;font-weight:700;">crença propriamente básica</span> <span style="background:rgba(129,140,248,0.15);border:1px solid rgba(129,140,248,0.35);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;">properly basic belief</span> — uma crença que não precisa ser inferida ou deduzida de proposições anteriores para ser <strong style="color:#fff;">racional e legítima.</strong> Uma crença básica não é arbitrária: ela é formada diretamente pela <em style="color:#38bdf8;">experiência, percepção</em> ou funcionamento adequado de uma <span style="background:rgba(167,139,250,0.12);border-left:3px solid #a78bfa;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(230,220,255,0.95);">faculdade cognitiva.</span> Plantinga não rejeita os argumentos filosóficos tradicionais sobre a existência de Deus (cosmológico, teleológico, ontológico) — eles servem para esclarecer e defender a fé, mas não constituem a <span style="color:#fbbf24;font-weight:700;">condição necessária para a sua racionalidade.</span>',
    destaque: 'A crença em Deus pode ser racional sem ser inferida de argumentos — assim como a percepção do mundo externo.',
  },
  {
    num: '03', label: 'Teologia Natural', titulo: 'O Modelo Tomás-Calvino e o Sensus Divinitatis',
    cor: '#34d399', corRgb: '52,211,153', icon: BookOpen,
    texto: 'Para fundamentar como a crença em Deus surge espontaneamente sem depender de silogismos, Plantinga retoma a intuição do <span style="color:#34d399;font-weight:700;">Sensus Divinitatis</span> formulada por <strong style="color:#fff;">João Calvino</strong> — o que ele chama de <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,230,0.95);">Modelo Tomás-Calvino.</span> Deus equipou o ser humano com um <em style="color:#38bdf8;">mecanismo cognitivo</em> ou disposição natural: o <span style="color:#fbbf24;font-weight:700;">Sensus Divinitatis.</span> Assim como a visão produz percepções visuais e a memória produz recordações quando estimuladas, o Sensus Divinitatis produz <em style="color:#a78bfa;">instantaneamente</em> a crença em Deus ao contemplarmos a ordem do cosmo, a beleza da natureza, a consciência moral ou a providência. A fé não é superstição: é uma <span style="background:rgba(129,140,248,0.15);border:1px solid rgba(129,140,248,0.35);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;">faculdade funcionando corretamente.</span>',
    destaque: 'O Sensus Divinitatis é uma faculdade cognitiva criada por Deus — não uma inferência, mas uma percepção imediata.',
  },
  {
    num: '04', label: 'Epistemologia Reformada', titulo: 'Garantia Epistêmica (Warrant) e o Plano de Criação',
    cor: '#fbbf24', corRgb: '251,191,36', icon: Shield,
    texto: 'Em sua monumental trilogia epistemológica (<em style="color:#38bdf8;">Warrant: The Current Debate, 1993; Warrant and Proper Function, 1993; Warranted Christian Belief, 2000</em>), Plantinga distingue três conceitos: <em style="color:#a78bfa;">Justificação</em> (relação interna entre as crenças do sujeito), <em style="color:#34d399;">Racionalidade</em> (ausência de violação de deveres epistêmicos) e <span style="color:#fbbf24;font-weight:700;">Warrant</span> <span style="background:rgba(251,191,36,0.12);border-left:3px solid #fbbf24;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,245,210,0.95);">Garantia Epistêmica — a propriedade que transforma uma crença verdadeira em conhecimento real.</span> Uma crença em Deus possui garantia quando é produzida por faculdades cognitivas em <span style="background:rgba(129,140,248,0.15);border:1px solid rgba(129,140,248,0.35);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;">proper function</span>, seguindo um <span style="color:#fb923c;font-weight:700;">design plan</span> desenhado por Deus e voltado à produção de <strong style="color:#fff;">crenças verdadeiras.</strong> Se o teísmo cristão é verdadeiro, a crença cristã tem warrant — é conhecimento genuíno, não mera fé cega.',
    destaque: 'Se o teísmo é verdadeiro, a crença cristã possui garantia epistêmica plena — é conhecimento, não suposição.',
  },
  {
    num: '05', label: 'Antropologia Teológica', titulo: 'Efeitos Noéticos do Pecado e o Espírito Santo',
    cor: '#f472b6', corRgb: '244,114,182', icon: Zap,
    texto: 'Enraizado na teologia reformada de <span style="color:#f472b6;font-weight:700;">Agostinho, Calvino e Bavinck,</span> Plantinga aborda os <span style="background:rgba(244,114,182,0.12);border-left:3px solid #f472b6;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,220,240,0.95);">efeitos noéticos do pecado</span>: o pecado não destruiu a razão nem a estrutura ontológica da mente humana, mas <em style="color:#38bdf8;">desordenou e obscureceu</em> o funcionamento adequado do <span style="color:#34d399;font-weight:700;">Sensus Divinitatis.</span> A mente caída não é irracional — mas sua orientação espiritual foi desordenada, tornando-a resistente à verdade sobre Deus. O conhecimento especificamente cristão — <strong style="color:#fff;">Encarnação, Expiação, Ressurreição</strong> — depende da ação sobrenatural da graça. O <span style="color:#fbbf24;font-weight:700;">Espírito Santo</span> <span style="background:rgba(129,140,248,0.15);border:1px solid rgba(129,140,248,0.35);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;">Internal Instigation of the Holy Spirit</span> atua diretamente sobre as faculdades cognitivas do crente, regenerando-as e curando a cegueira espiritual.',
    destaque: 'O Espírito Santo repara o que o pecado desordenou — restaurando as faculdades cognitivas para o conhecimento de Deus.',
  },
  {
    num: '06', label: 'Teodiceia', titulo: 'A Defesa do Livre-Arbítrio e o Problema do Mal',
    cor: '#fb923c', corRgb: '251,146,60', icon: Layers,
    texto: 'No campo da metafísica e apologética, Plantinga formulou a <span style="color:#fb923c;font-weight:700;">Defesa do Livre-Arbítrio</span> <span style="background:rgba(251,146,60,0.12);border-left:3px solid #fb923c;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,230,200,0.95);">Free Will Defense</span>, redefinindo o debate sobre o problema do mal. É crucial distinguir <em style="color:#f472b6;">Teodiceia</em> (justificar as razões reais pelas quais Deus permite cada mal) de <em style="color:#38bdf8;">Defesa</em> (demonstrar apenas a <strong style="color:#fff;">não-contradição lógica</strong> entre Deus onipotente e infinitamente bom e a existência do mal). Plantinga provou rigorosamente que não há inconsistência lógica formal no teísmo: é perfeitamente possível que Deus tenha razões moralmente suficientes para permitir o mal — como a criação de agentes dotados de <span style="color:#fbbf24;font-weight:700;">liberdade moral autêntica.</span> Um mundo com criaturas genuinamente livres pode ser mais valioso do que um mundo de <span style="background:rgba(129,140,248,0.15);border:1px solid rgba(129,140,248,0.35);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;">autômatos morais perfeitos.</span>',
    destaque: 'Plantinga não explica cada mal — demonstra que a existência do mal não contradiz logicamente a existência de Deus.',
  },
];

// ─── Tabela comparativa ───────────────────────────────────────────────────────
const COMPARATIVO = [
  { teol: 'Francis Turretin', modelo: 'Teologia Elênctica (Quaestiones)', foco: 'Uso ministerial da razão escolástica para refutar heresias e ordenar distinções', cor: '#818cf8' },
  { teol: 'Petrus van Mastricht', modelo: 'Teologia Teórico-Prática (Quádrupla)', foco: 'Integração da exegese e dogmática com a piedade e a adoração a Deus', cor: '#2dd4bf' },
  { teol: 'Herman Bavinck', modelo: 'Dogmática Orgânica', foco: 'Sistema orgânico; a graça restaura a natureza e a Imago Dei garante a inteligibilidade', cor: '#fb923c' },
  { teol: 'John Webster', modelo: 'Razão Santificada / Doutrina de Deus', foco: 'Teocentrismo radical; a Bibliologia é uma extensão da Doutrina de Deus', cor: '#34d399' },
  { teol: 'Alvin Plantinga', modelo: 'Epistemologia Reformada (Warrant)', foco: 'Crença em Deus como propriamente básica, garantida pelo Sensus Divinitatis e pelo Espírito Santo', cor: '#38bdf8' },
];

export default function AutorPlantingaPage() {
  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#e4e8ff' }}>
      <Navbar />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(84px,10vw,106px) clamp(20px,4vw,40px) 120px' }}>

        {/* ── Breadcrumb ── */}
        <motion.div
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 48, fontSize: 10, fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(200,205,255,0.35)' }}
        >
          <Link to="/biblioteca" style={{ color: 'inherit', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,205,255,0.35)')}>Biblioteca</Link>
          <ChevronRight size={12} />
          <Link to="/biblioteca/autores" style={{ color: 'inherit', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,205,255,0.35)')}>Autores</Link>
          <ChevronRight size={12} />
          <span style={{ color: `rgba(${ACCENT_RGB},0.85)` }}>Alvin Plantinga</span>
        </motion.div>

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative', borderRadius: 32, overflow: 'hidden', marginBottom: 64,
            background: 'linear-gradient(135deg, #030e1c 0%, #020d1a 50%, #030f1e 100%)',
            border: `1.5px solid rgba(${ACCENT_RGB},0.25)`,
          }}
        >
          <div style={{ position: 'absolute', top: -60, right: -40, width: 320, height: 320, borderRadius: '50%', background: ACCENT, filter: 'blur(100px)', opacity: 0.12, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -20, width: 220, height: 220, borderRadius: '50%', background: '#a78bfa', filter: 'blur(80px)', opacity: 0.07, pointerEvents: 'none' }} />

          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 0 }}>

            {/* ── coluna texto ── */}
            <div style={{ padding: 'clamp(32px,5vw,56px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                {['Epistemologia Reformada', 'Nascido em 1932', 'Filosofia Analítica', 'Notre Dame'].map(t => (
                  <span key={t} style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: ACCENT, background: `rgba(${ACCENT_RGB},0.12)`, border: `1px solid rgba(${ACCENT_RGB},0.25)`, padding: '5px 14px', borderRadius: 99 }}>
                    {t}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.38em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.58)`, marginBottom: 12 }}>
                Perfil Teológico · Autor 06
              </p>
              <h1 style={{
                fontSize: 'clamp(28px,4.5vw,50px)', fontWeight: 900, lineHeight: 1.06, margin: '0 0 4px',
                background: `linear-gradient(135deg, #fff 30%, rgba(${ACCENT_RGB},0.88) 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Alvin Plantinga
              </h1>
              <p style={{ fontSize: 13, fontWeight: 700, color: `rgba(${ACCENT_RGB},0.60)`, margin: '0 0 10px', letterSpacing: '0.10em' }}>
                Alvin Carl Plantinga · Epistemologia Reformada
              </p>
              <p style={{ fontSize: 17, color: `rgba(${ACCENT_RGB},0.85)`, fontWeight: 600, fontStyle: 'italic', margin: '0 0 32px', lineHeight: 1.5 }}>
                A Garantia Epistêmica — Crença em Deus como Propriamente Básica
              </p>

              {/* frase central */}
              <div style={{ borderLeft: `4px solid ${ACCENT}`, background: `rgba(${ACCENT_RGB},0.08)`, borderRadius: '0 14px 14px 0', padding: '18px 22px' }}>
                <p style={{ margin: 0, fontSize: 'clamp(15px,2.2vw,19px)', fontWeight: 700, color: '#fff', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 10 }}>
                  "A crença em Deus não precisa ser inferida de argumentos para ser racional — ela pode ser propriamente básica, assim como a crença no mundo externo."
                </p>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: `rgba(${ACCENT_RGB},0.72)`, letterSpacing: '0.10em' }}>
                  — Warranted Christian Belief, 2000
                </p>
              </div>
            </div>

            {/* ── coluna foto ── */}
            <div style={{
              width: 'clamp(180px, 26vw, 280px)',
              flexShrink: 0,
              position: 'relative',
              borderLeft: `1px solid rgba(${ACCENT_RGB},0.14)`,
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                background: `linear-gradient(to right, rgba(3,14,28,0.55) 0%, transparent 30%), linear-gradient(to top, rgba(2,13,26,0.70) 0%, transparent 35%)`,
              }} />
              <img
                src={FOTO_URL}
                alt="Retrato de Alvin Plantinga"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  filter: 'sepia(10%) contrast(1.05) brightness(0.92)',
                  minHeight: 320,
                }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
              />
              <div style={{
                position: 'absolute', bottom: 14, left: 0, right: 0, zIndex: 3,
                textAlign: 'center', padding: '0 12px',
              }}>
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.75)`, background: 'rgba(0,0,0,0.55)', padding: '4px 10px', borderRadius: 8, backdropFilter: 'blur(4px)' }}>
                  Alvin Plantinga · Notre Dame, 2004
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Quem Foi Plantinga ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 20 }}>
            Quem É Plantinga
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              '<strong style="color:#fff;">Alvin Plantinga</strong> <span style="color:#38bdf8;font-weight:700;">(nascido em 1932)</span> é um dos filósofos analíticos e teólogos cristãos contemporâneos mais influentes do mundo — amplamente reconhecido como o principal formulador da <span style="background:rgba(56,189,248,0.12);border-left:3px solid #38bdf8;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,240,255,0.95);">Epistemologia Reformada</span> e como o pensador que operou um verdadeiro reposicionamento da <em style="color:#a78bfa;">filosofia analítica da religião</em> nas últimas décadas do século XX.',
              'Professor por décadas na <span style="color:#fbbf24;font-weight:700;">Universidade de Notre Dame</span> (EUA), Plantinga recebeu o <em style="color:#38bdf8;">Prêmio Templeton em 2017,</em> considerado o mais alto reconhecimento por contribuições ao conhecimento espiritual. Seu projeto intelectual consistiu em desconstruir a acusação iluminista de que a fé cristã seria <em style="color:rgba(200,205,255,0.65);">"irracional"</em>, demonstrando que a crença em Deus é <span style="color:#34d399;font-weight:700;">racional, epistemicamente garantida</span> e <strong style="color:#fff;">propriamente básica.</strong>',
              'Sua obra abrange desde <em style="color:#a78bfa;">metafísica modal e lógica</em> (<em style="color:rgba(200,205,255,0.65);">God and Other Minds, 1967; The Nature of Necessity, 1974</em>) até <span style="color:#38bdf8;font-weight:700;">epistemologia teológica</span> (a trilogia <span style="color:#fbbf24;font-weight:700;">Warrant, 1993–2000</span>) e apologética (<em style="color:rgba(200,205,255,0.65);">God, Freedom and Evil, 1974</em>). Ao lado de <em style="color:#34d399;">Nicholas Wolterstorff,</em> fundou o movimento da <span style="background:rgba(56,189,248,0.12);border-left:3px solid #38bdf8;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,240,255,0.95);">Epistemologia Reformada</span> que revolucionou o debate sobre racionalidade e fé nas universidades seculares.',
            ].map((p, i) => (
              <p key={i} style={{ margin: 0, fontSize: 'clamp(16px,2.1vw,18px)', color: 'rgba(228,232,255,0.93)', lineHeight: 2.0 }} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </motion.div>

        {/* ── divisor ── */}
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.20), transparent)`, marginBottom: 64 }} />

        {/* ── Contexto — O Giro Epistemológico ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          style={{ marginBottom: 64, borderRadius: 22, background: 'rgba(167,139,250,0.06)', border: '1.5px solid rgba(167,139,250,0.20)', padding: 'clamp(24px,4vw,40px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 180, height: 180, borderRadius: '50%', background: '#a78bfa', filter: 'blur(70px)', opacity: 0.08, pointerEvents: 'none' }} />
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.75)', marginBottom: 16, position: 'relative' }}>
            O Giro Epistemológico
          </p>
          <h3 style={{ margin: '0 0 18px', fontSize: 'clamp(17px,2.5vw,22px)', fontWeight: 900, color: '#fff', lineHeight: 1.22, position: 'relative' }}>
            Plantinga devolveu a racionalidade à fé cristã no coração da academia secular
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }}>
            <p style={{ margin: 0, fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(228,232,255,0.88)', lineHeight: 1.90 }}>
              Antes de Plantinga, a filosofia analítica dominante tratava a crença religiosa como epistemicamente suspeita — um resíduo pré-científico que precisava se justificar no tribunal da razão secular. O ônus da prova estava inteiramente sobre o crente.
            </p>
            <p style={{ margin: 0, fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(228,232,255,0.88)', lineHeight: 1.90 }}>
              Plantinga inverteu o jogo: <strong style={{ color: '#c4b5fd' }}>o verdadeiro problema epistemológico não é a fé cristã, mas o evidencialismo</strong> — a doutrina filosófica que exige provas dedutivas para toda crença racional, sendo que essa própria doutrina não consegue se justificar por seus próprios critérios. O evidencialismo se refuta a si mesmo.
            </p>
          </div>
        </motion.div>

        {/* ── Estrutura do Warrant ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 10 }}>
            Os Três Requisitos do Warrant
          </p>
          <h2 style={{ margin: '0 0 8px', fontSize: 'clamp(20px,3vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.18 }}>
            Quando uma Crença se Torna Conhecimento Genuíno
          </h2>
          <p style={{ margin: '0 0 28px', fontSize: 16, color: 'rgba(210,215,255,0.70)', lineHeight: 1.8 }}>
            Para Plantinga, <em>warrant</em> é a propriedade que transforma uma crença verdadeira em conhecimento real — não mero palpite ou acidente:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 16 }}>
            {[
              { pilar: 'Proper Function', detalhe: 'Faculdades cognitivas funcionando adequadamente — sem disfunção, distorção ou defeito cognitivo', cor: '#38bdf8', corRgb: '56,189,248' },
              { pilar: 'Ambiente Cognitivo', detalhe: 'Operando no ambiente para o qual as faculdades foram projetadas pelo plano de criação', cor: '#a78bfa', corRgb: '167,139,250' },
              { pilar: 'Design Plan', detalhe: 'Um plano de criação desenhado por Deus e voltado à produção de crenças verdadeiras — não meramente adaptativas', cor: '#34d399', corRgb: '52,211,153' },
            ].map(e => (
              <div key={e.pilar} style={{ borderRadius: 18, padding: '20px 22px', background: `rgba(${e.corRgb},0.07)`, border: `1.5px solid rgba(${e.corRgb},0.22)` }}>
                <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: e.cor, marginBottom: 8 }}>
                  {e.pilar}
                </div>
                <p style={{ margin: 0, fontSize: 14, color: 'rgba(220,225,255,0.80)', lineHeight: 1.75 }}>
                  {e.detalhe}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── divisor ── */}
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.20), transparent)`, marginBottom: 64 }} />

        {/* ── 6 Eixos — título ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }} style={{ marginBottom: 40, textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.38em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.60)`, marginBottom: 12 }}>
            Contribuições Filosófico-Teológicas
          </p>
          <h2 style={{ margin: 0, fontSize: 'clamp(22px,3.5vw,32px)', fontWeight: 900, color: '#fff', lineHeight: 1.18, marginBottom: 14 }}>
            Seis Eixos da Epistemologia Reformada
          </h2>
          <p style={{ margin: '0 auto', maxWidth: 560, fontSize: 16, color: 'rgba(210,215,255,0.72)', lineHeight: 1.85 }}>
            Do evidencialismo ao warrant, do Sensus Divinitatis ao problema do mal — cada eixo articula uma peça do projeto filosófico de Plantinga.
          </p>
        </motion.div>

        {/* ── fluxo epistemológico ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.30 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}>
          {[
            { label: 'Crítica', cor: '#38bdf8', corRgb: '56,189,248' },
            { label: 'Crença Básica', cor: '#a78bfa', corRgb: '167,139,250' },
            { label: 'Sensus Dei', cor: '#34d399', corRgb: '52,211,153' },
            { label: 'Warrant', cor: '#fbbf24', corRgb: '251,191,36' },
            { label: 'Pecado / Graça', cor: '#f472b6', corRgb: '244,114,182' },
            { label: 'Livre-Arbítrio', cor: '#fb923c', corRgb: '251,146,60' },
          ].map((m, i, arr) => (
            <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ padding: '8px 18px', borderRadius: 99, background: `rgba(${m.corRgb},0.14)`, border: `1.5px solid rgba(${m.corRgb},0.32)`, fontSize: 11, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: m.cor }}>
                {m.label}
              </div>
              {i < arr.length - 1 && <ArrowRight size={14} color="rgba(200,205,255,0.25)" />}
            </div>
          ))}
        </motion.div>

        {/* ── Cards dos eixos ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {PILARES.map((p, i) => {
            const IconComp = p.icon;
            return (
              <motion.div key={p.num} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 + i * 0.09 }}
                style={{ borderRadius: 22, border: `1.5px solid rgba(${p.corRgb},0.22)`, background: `rgba(${p.corRgb},0.05)`, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 0, borderBottom: `1px solid rgba(${p.corRgb},0.16)` }}>
                  <div style={{ width: 68, minHeight: 68, background: `rgba(${p.corRgb},0.13)`, borderRight: `1px solid rgba(${p.corRgb},0.18)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, gap: 4, padding: '12px 0' }}>
                    <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: `rgba(${p.corRgb},0.60)` }}>Eixo</div>
                    <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1, color: p.cor }}>{p.num}</div>
                  </div>
                  <div style={{ padding: '16px 22px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: `rgba(${p.corRgb},0.16)`, border: `1px solid rgba(${p.corRgb},0.28)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconComp size={14} color={p.cor} strokeWidth={2} />
                      </div>
                      <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: p.cor }}>{p.label}</span>
                    </div>
                    <h3 style={{ margin: 0, fontSize: 'clamp(16px,2.4vw,20px)', fontWeight: 900, color: '#fff', lineHeight: 1.22 }}>{p.titulo}</h3>
                  </div>
                </div>
                <div style={{ padding: '24px 28px 28px' }}>
                  <p style={{ margin: '0 0 20px', fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(228,232,255,0.90)', lineHeight: 2.0 }} dangerouslySetInnerHTML={{ __html: p.texto }} />
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, borderRadius: 12, background: `rgba(${p.corRgb},0.10)`, border: `1px solid rgba(${p.corRgb},0.25)`, padding: '10px 18px' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.cor, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: p.cor, fontStyle: 'italic' }}>"{p.destaque}"</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Síntese ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.86 }}
          style={{ marginTop: 64, borderRadius: 24, background: `linear-gradient(135deg, rgba(${ACCENT_RGB},0.10) 0%, rgba(${ACCENT_RGB},0.04) 100%)`, border: `1.5px solid rgba(${ACCENT_RGB},0.28)`, padding: 'clamp(28px,4vw,44px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: ACCENT, filter: 'blur(70px)', opacity: 0.10, pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 18 }}>
              A Visão de Plantinga em Síntese
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
              {[
                { label: 'Crítica',    sub: 'Evidencialismo',  cor: '#38bdf8' },
                { label: 'Básica',     sub: 'Proper Basic',    cor: '#a78bfa' },
                { label: 'Sensus',     sub: 'Divinitatis',     cor: '#34d399' },
                { label: 'Warrant',    sub: 'Garantia',        cor: '#fbbf24' },
                { label: 'Mal',        sub: 'Livre-Arbítrio',  cor: '#fb923c' },
              ].map((item, i, arr) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: item.cor, marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: 9, fontWeight: 800, color: item.cor + '99', letterSpacing: '0.22em', textTransform: 'uppercase' }}>{item.sub}</div>
                  </div>
                  {i < arr.length - 1 && <ArrowRight size={16} color="rgba(200,205,255,0.22)" />}
                </div>
              ))}
            </div>
            <p style={{ margin: '0 auto', maxWidth: 640, fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(228,232,255,0.90)', lineHeight: 1.90, fontStyle: 'italic' }}>
              "Para Plantinga, a fé cristã não precisa se justificar diante do tribunal secular — ela é epistemicamente garantida pelo design plan de Deus, pelo Sensus Divinitatis e pela obra regeneradora do Espírito Santo. Longe de ser irracional, a crença cristã é o conhecimento mais bem fundamentado disponível à mente humana."
            </p>
          </div>
        </motion.div>

        {/* ── Tabela Comparativa ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.94 }}
          style={{ marginTop: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 16 }}>
            Comparação Crítica na Tradição
          </p>
          <h3 style={{ margin: '0 0 24px', fontSize: 'clamp(18px,2.6vw,24px)', fontWeight: 900, color: '#fff', lineHeight: 1.22 }}>
            Turretin · Mastricht · Bavinck · Webster · Plantinga
          </h3>
          <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {['Teólogo', 'Modelo Central', 'Estatuto da Razão / Conhecimento'].map(h => (
                <div key={h} style={{ padding: '14px 18px', fontSize: 10, fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(200,205,255,0.45)' }}>{h}</div>
              ))}
            </div>
            {COMPARATIVO.map((row, i) => (
              <div key={row.teol} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: i < COMPARATIVO.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', background: row.cor === ACCENT ? `rgba(${ACCENT_RGB},0.06)` : 'transparent' }}>
                <div style={{ padding: '16px 18px' }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: row.cor }}>{row.teol}</span>
                </div>
                <div style={{ padding: '16px 18px' }}>
                  <span style={{ fontSize: 13, color: 'rgba(220,225,255,0.80)', lineHeight: 1.65 }}>{row.modelo}</span>
                </div>
                <div style={{ padding: '16px 18px' }}>
                  <span style={{ fontSize: 13, color: 'rgba(200,205,255,0.65)', lineHeight: 1.65 }}>{row.foco}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Referência ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
          style={{ marginTop: 52, borderRadius: 18, background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.16)', padding: '22px 28px' }}>
          <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.30em', textTransform: 'uppercase', color: 'rgba(251,191,36,0.70)', marginBottom: 14 }}>
            Referências Bibliográficas
          </p>
          <p style={{ margin: '0 0 10px', fontSize: 14, color: 'rgba(220,215,180,0.88)', lineHeight: 1.85 }}>
            PLANTINGA, Alvin. <em>Warranted Christian Belief.</em> New York: Oxford University Press, 2000.
          </p>
          <p style={{ margin: '0 0 10px', fontSize: 13, color: 'rgba(200,200,180,0.62)', lineHeight: 1.75 }}>
            PLANTINGA, Alvin. <em>Warrant: The Current Debate.</em> New York: Oxford University Press, 1993.
          </p>
          <p style={{ margin: '0 0 10px', fontSize: 13, color: 'rgba(200,200,180,0.62)', lineHeight: 1.75 }}>
            PLANTINGA, Alvin. <em>God, Freedom and Evil.</em> Grand Rapids: Eerdmans, 1974.
          </p>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(200,200,180,0.62)', lineHeight: 1.75 }}>
            PLANTINGA, Alvin; WOLTERSTORFF, Nicholas (eds.). <em>Faith and Rationality: Reason and Belief in God.</em> Notre Dame: University of Notre Dame Press, 1983.
          </p>
        </motion.div>

        {/* ── Fonte da imagem ── */}
        <p style={{ marginTop: 16, fontSize: 11, color: 'rgba(200,205,255,0.28)', lineHeight: 1.6 }}>
          Retrato: domínio público — <a href="https://commons.wikimedia.org/wiki/File:Alvin_Plantinga.jpg" target="_blank" rel="noopener noreferrer" style={{ color: `rgba(${ACCENT_RGB},0.50)`, textDecoration: 'none' }}>Wikimedia Commons</a>
        </p>

        {/* ── Voltar ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.04 }} style={{ marginTop: 48 }}>
          <Link to="/biblioteca/autores"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(200,205,255,0.45)', fontSize: 11, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.18s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,205,255,0.45)')}>
            ← Voltar para Autores
          </Link>
        </motion.div>

      </div>
      <Footer />
    </div>
  );
}
