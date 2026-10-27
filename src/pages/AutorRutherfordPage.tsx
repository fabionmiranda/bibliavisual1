import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Scale, Layers, Shield, ArrowRight, Zap, Crown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ACCENT     = '#f97316'; // orange-500
const ACCENT_RGB = '249,115,22';
const BG         = '#06061a';

const FOTO_URL = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Samuel_Rutherford_St._Andrews.jpg';

// ─── Notas de rodapé ─────────────────────────────────────────────────────────
const NOTAS: { num: number; ref: string }[] = [
  { num: 1,  ref: 'RUTHERFORD, Samuel. <em>Lex, Rex: The Law and the Prince.</em> Londres: John Field, 1644. Reimpr.: Harrisonburg, VA: Sprinkle Publications, 1982.' },
  { num: 2,  ref: 'RUTHERFORD, Samuel. <em>The Due Right of Presbyteries.</em> Londres: E. Griffin, 1644.' },
  { num: 3,  ref: 'RUTHERFORD, Samuel. <em>Disputatio Scholastica de Divina Providentia.</em> Edimburgo, 1649. In: <em>The Works of Samuel Rutherford.</em> Reimpr.: Edinburgh: Banner of Truth Trust, 1984.' },
  { num: 4,  ref: 'RUTHERFORD, Samuel. <em>The Covenant of Life Opened: or, A Treatise of the Covenant of Grace.</em> Edimburgo: Robert Brown, 1655.' },
  { num: 5,  ref: 'RUTHERFORD, Samuel. <em>Disputatio Scholastica de Divina Providentia.</em> Op. cit. Disp. I, Thesis 54–55: "The foundation of our Faith is Gods Word" [A fundação da nossa fé é a Palavra de Deus]. [Tradução nossa]' },
  { num: 6,  ref: 'RUTHERFORD, Samuel. <em>Disputatio Scholastica de Divina Providentia.</em> Op. cit. Disp. I, Thesis 57–59: "The further from Scripture, the more derivative is the authority." [Tradução nossa]' },
  { num: 7,  ref: 'WESTMINSTER ASSEMBLY. <em>The Westminster Confession of Faith.</em> Londres, 1646. Cap. I, art. 6. Rutherford foi delegado escocês e contribuiu diretamente para a formulação deste artigo sobre a autoridade da Escritura e a boa e necessária consequência.' },
  { num: 8,  ref: 'RUTHERFORD, Samuel. <em>Disputatio Scholastica de Divina Providentia.</em> Op. cit. Disp. II, Thesis 60–63. Sobre os três graus de doutrina: fundamentos, suprafundamentos e circunfundamentos.' },
  { num: 9,  ref: 'MULLER, Richard A. <em>Post-Reformation Reformed Dogmatics.</em> 4 vols. Grand Rapids: Baker Academic, 2003. v. 1: <em>Prolegomena to Theology,</em> p. 430–450. Sobre a distinção escolástica entre causa primeira e causas secundárias na teologia reformada.' },
  { num: 10, ref: 'RUTHERFORD, Samuel. <em>Disputatio Scholastica de Divina Providentia.</em> Op. cit. Disp. III, Thesis 64–65. Sobre os dois erros acerca do uso da razão: racionalismo autônomo e fideísmo anti-intelectual.' },
  { num: 11, ref: 'RUTHERFORD, Samuel. <em>Disputatio Scholastica de Divina Providentia.</em> Op. cit. Disp. III, Thesis 70. Sobre a filosofia como <em>ancilla theologiae</em> (serva da teologia).' },
  { num: 12, ref: 'RUTHERFORD, Samuel. <em>Disputatio Scholastica de Divina Providentia.</em> Op. cit. Disp. IV, Thesis 75–77. Sobre as três zonas do conhecimento humano: <em>contra rationem, secundum rationem, supra rationem.</em>' },
  { num: 13, ref: 'RUTHERFORD, Samuel. <em>Disputatio Scholastica de Divina Providentia.</em> Op. cit. Disp. IV, Thesis 78–80: "Knowing truly does not require knowing exhaustively." [Tradução nossa]' },
  { num: 14, ref: 'RUTHERFORD, Samuel. <em>Disputatio Scholastica de Divina Providentia.</em> Op. cit. Disp. V, Thesis 81–84. Sobre os quatro pilares do método escolástico reformado.' },
  { num: 15, ref: 'RUTHERFORD, Samuel. <em>Disputatio Scholastica de Divina Providentia.</em> Op. cit. Disp. V, Thesis 85–86. Refutação do fatalismo e distinção entre Causa Primeira e causas secundárias.' },
  { num: 16, ref: 'RUTHERFORD, Samuel. <em>Lex, Rex.</em> Op. cit. Quest. I–XIV. Sobre a distinção entre soberania ontológica de Deus e autoridade delegada dos governantes.' },
  { num: 17, ref: 'RUTHERFORD, Samuel. <em>Lex, Rex.</em> Op. cit. Quest. XLII, p. 232: "The truth towards Christ cannot be treason to Caesar." [A verdade para com Cristo não pode ser traição a César]. [Tradução nossa]' },
  { num: 18, ref: 'COFFEY, John. <em>Politics, Religion and the British Revolutions: The Mind of Samuel Rutherford.</em> Cambridge: Cambridge University Press, 1997. Monografia indispensável sobre o pensamento político-teológico de Rutherford.' },
  { num: 19, ref: 'RUTHERFORD, Samuel. <em>Disputatio Scholastica de Divina Providentia.</em> Op. cit. Disp. VI, Thesis 87. Sobre o paradoxo da Reforma: novidade temporal versus antiguidade normativa.' },
];

// ─── Oito eixos ───────────────────────────────────────────────────────────────
const PILARES = [
  {
    num: '01', label: 'Bibliologia', titulo: 'A Palavra Final — Fundação de Todo o Conhecimento',
    cor: '#f97316', corRgb: '249,115,22', icon: BookOpen,
    texto: 'Rutherford estabelece a premissa metodológica central com precisão lapidar: <span style="color:#f97316;font-weight:700;">"The foundation of our Faith is Gods Word"</span><sup style="color:#f97316;font-size:0.72em;vertical-align:super;">5</sup> — a Palavra de Deus é a fundação absoluta; a teologia é a superestrutura. A <span style="background:rgba(249,115,22,0.12);border-left:3px solid #f97316;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,220,190,0.95);">Regra de Rutherford</span> é direta: <em style="color:#fbbf24;">"Quanto mais distante da Escritura, mais derivada é a autoridade."</em><sup style="color:#f97316;font-size:0.72em;vertical-align:super;">6</sup> A dogmática não produz a Escritura — a Escritura é que produz a dogmática. A <strong style="color:#fff;">Escada do Conhecimento</strong> desce em autoridade progressivamente: <span style="color:#f97316;">Revelação</span> → <span style="color:#fbbf24;">Escritura</span> → <span style="color:#2dd4bf;">Exegese</span> → <span style="color:#a78bfa;">Teologia Bíblica</span> → <span style="color:#34d399;">Dogmática</span> → <span style="color:#60a5fa;">Sistema</span> → <span style="color:rgba(200,205,255,0.65);">Confissão</span><sup style="color:#f97316;font-size:0.72em;vertical-align:super;">7</sup>. A Confissão de Westminster, da qual Rutherford foi delegado, consagra esse princípio em seu Capítulo I.',
    destaque: 'A dogmática não produz a Escritura — a Escritura é que produz a dogmática.',
  },
  {
    num: '02', label: 'Epistemologia', titulo: 'Os Três Graus de Doutrina',
    cor: '#fbbf24', corRgb: '251,191,36', icon: Layers,
    texto: 'Rutherford categoriza os ensinos teológicos em três níveis hierárquicos<sup style="color:#fbbf24;font-size:0.72em;vertical-align:super;">8</sup>. As <span style="color:#f97316;font-weight:700;">Doutrinas Fundamentais</span> são essenciais para a fé salvadora — Trindade, Encarnação, Justificação pela Fé, Autoridade das Escrituras. As <span style="color:#fbbf24;font-weight:700;">Doutrinas Suprafundamentais</span> são consequências e desdobramentos diretos do sistema doutrinário. As <span style="color:#2dd4bf;font-weight:700;">Doutrinas Circundamentais</span> são detalhes secundários ou fatos históricos específicos. A distinção crítica para a teologia: <span style="background:rgba(251,191,36,0.12);border-left:3px solid #fbbf24;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,240,180,0.95);">importância doutrinária ≠ autoridade epistemológica</span><sup style="color:#fbbf24;font-size:0.72em;vertical-align:super;">8</sup>. Uma doutrina pode ser periférica no sistema, mas se foi revelada por Deus, sua <strong style="color:#fff;">autoridade é absoluta</strong>. A autoridade não depende da posição do tema no sistema — depende de <em style="color:#f97316;">QUEM fala</em>.',
    destaque: 'Importância doutrinária ≠ autoridade epistemológica. Deus fala — e isso é absoluto.',
  },
  {
    num: '03', label: 'Método', titulo: 'Philosophia Ancilla Theologiae — A Razão Serva',
    cor: '#2dd4bf', corRgb: '45,212,191', icon: Scale,
    texto: 'Rutherford combate dois erros fatais sobre o papel da razão<sup style="color:#2dd4bf;font-size:0.72em;vertical-align:super;">10</sup>. O <span style="color:#fb7185;font-weight:700;">Racionalismo Autônomo</span>: colocar a razão no topo como tribunal que julga o que Deus pode ou não revelar — a razão como norma suprema. O <span style="color:#f59e0b;font-weight:700;">Fideísmo / Anti-Intelectualismo</span>: rejeitar a razão e a lógica sob o pretexto de fé — o avesso igualmente destruidor. O <span style="color:#2dd4bf;font-weight:700;">Modelo Rutherfordiano</span><sup style="color:#2dd4bf;font-size:0.72em;vertical-align:super;">11</sup>: a razão é criação legítima de Deus e deve ser usada como <span style="background:rgba(45,212,191,0.12);border-left:3px solid #2dd4bf;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,250,0.95);">instrumento lógico governado pela revelação</span> — <span style="color:#fbbf24;font-style:italic;font-weight:700;">Philosophia Ancilla Theologiae</span>. A filosofia fornece a gramática, a lógica e as categorias formais (aristotélicas e medievais) para organizar e defender a fé, estando <em style="color:#f97316;">sempre no banco dos réus</em> e jamais na cadeira de juiz.',
    destaque: 'A razão serve a teologia — não a julga. Ela está no banco dos réus, não na cadeira de juiz.',
  },
  {
    num: '04', label: 'Epistemologia', titulo: 'As Três Zonas da Compreensão Humana',
    cor: '#a78bfa', corRgb: '167,139,250', icon: Zap,
    texto: 'Rutherford organiza o alcance da mente humana em três zonas<sup style="color:#a78bfa;font-size:0.72em;vertical-align:super;">12</sup>. A zona <span style="color:#fb7185;font-weight:700;">Contra a Razão</span> é rejeitada: contradições lógicas absolutas não podem ser revelações divinas, pois Deus é o autor da verdade e não da contradição. A zona <span style="color:#34d399;font-weight:700;">Segundo a Razão</span> é aceita: fenômenos naturais e relações lógicas acessíveis à investigação científica e filosófica. A zona <span style="color:#a78bfa;font-weight:700;">Acima da Razão</span> é aceita por fé e reverenciada<sup style="color:#a78bfa;font-size:0.72em;vertical-align:super;">12</sup>: mistérios revelados por Deus (a Trindade, a Encarnação) excedem a capacidade da razão natural finita, mas são <span style="background:rgba(167,139,250,0.12);border-left:3px solid #a78bfa;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(220,215,255,0.95);">recebidos por fé porque Deus os revelou</span>. A regra de ouro: <em style="color:#fbbf24;">"Conhecer verdadeiramente não exige conhecer exaustivamente."</em><sup style="color:#a78bfa;font-size:0.72em;vertical-align:super;">13</sup>',
    destaque: 'Conhecer verdadeiramente não exige conhecer exaustivamente.',
  },
  {
    num: '05', label: 'Escolástica', titulo: 'A Escolástica Reformada — Quatro Pilares Metodológicos',
    cor: '#34d399', corRgb: '52,211,153', icon: Shield,
    texto: 'A escolástica não é dogma católico romano — é um <span style="color:#34d399;font-weight:700;">método rigoroso de investigação teológica</span><sup style="color:#34d399;font-size:0.72em;vertical-align:super;">14</sup> que os reformados adotaram e purificaram. Rutherford utilizava quatro pilares: <span style="color:#f97316;font-weight:700;">(1) Distinções Claras</span> — definir rigorosamente os termos do debate para eliminar ambiguidades. <span style="color:#fbbf24;font-weight:700;">(2) Silogismos Lógicos</span> — construir argumentos válidos onde a conclusão decorre inevitavelmente das premissas. <span style="color:#2dd4bf;font-weight:700;">(3) Análise Causal</span> — mapear a relação entre a <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,230,0.95);">Causa Primeira e as causas secundárias</span><sup style="color:#34d399;font-size:0.72em;vertical-align:super;">9</sup>. <span style="color:#a78bfa;font-weight:700;">(4) Refutação de Objeções</span> — antecipar e desconstruir sistematicamente os argumentos contrários, respondendo adversário por adversário.',
    destaque: 'A escolástica não é dogma romano — é método rigoroso a serviço da verdade revelada.',
  },
  {
    num: '06', label: 'Providência', titulo: 'A Engenharia da Providência — Deus e a Liberdade Humana',
    cor: '#60a5fa', corRgb: '96,165,250', icon: Layers,
    texto: 'Na <span style="color:#fbbf24;font-weight:700;">Disputatio Scholastica de Divina Providentia</span><sup style="color:#60a5fa;font-size:0.72em;vertical-align:super;">3</sup>, Rutherford rejeita dois extremos sobre a providência. O <span style="color:#fb7185;font-weight:700;">fatalismo cego</span>: a ideia de que tudo é determinado mecanicamente, destruindo a real responsabilidade humana<sup style="color:#60a5fa;font-size:0.72em;vertical-align:super;">15</sup>. O <span style="color:#f59e0b;font-weight:700;">acaso / libertarismo</span>: a ideia de que escolhas humanas escapam completamente à soberania de Deus. A <span style="color:#60a5fa;font-weight:700;">solução rutherfordiana</span>: Deus atua como <span style="background:rgba(96,165,250,0.12);border-left:3px solid #60a5fa;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,230,255,0.95);">Causa Primeira governando soberanamente</span>, estabelecendo e preservando a realidade, a contingência e a responsabilidade das <em style="color:#2dd4bf;">causas secundárias</em> — as escolhas humanas reais<sup style="color:#60a5fa;font-size:0.72em;vertical-align:super;">9</sup>. A soberania de Deus e a responsabilidade humana não se contradizem; coexistem no plano da Causa Primeira e das causas secundárias.',
    destaque: 'Deus governa soberanamente sem anular a real responsabilidade das causas secundárias.',
  },
  {
    num: '07', label: 'Reforma', titulo: 'O Paradoxo da Restauração — Novidade Temporal, Antiguidade Normativa',
    cor: '#fb7185', corRgb: '251,113,133', icon: BookOpen,
    texto: 'Diante da acusação de que a Reforma Protestante era uma "nova religião"<sup style="color:#fb7185;font-size:0.72em;vertical-align:super;">19</sup>, Rutherford responde com uma distinção precisa. A Reforma possuía <span style="color:#fb7185;font-weight:700;">novidade temporal</span>: era uma restauração recente na história após séculos de corrupção doutrinária. Mas conservava a <span style="color:#34d399;font-weight:700;">antiguidade normativa</span>: o resgate da <span style="background:rgba(251,113,133,0.12);border-left:3px solid #fb7185;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,210,215,0.95);">origem pura na Palavra de Deus</span> — a própria fonte que a Igreja antiga havia seguido antes da corrupção medieval. A Reforma não inventou uma nova religião; ela <em style="color:#f97316;">restaurou a antiga</em>. O critério de autenticidade não é o tempo de existência de uma prática, mas sua conformidade com a Escritura<sup style="color:#fb7185;font-size:0.72em;vertical-align:super;">7</sup>.',
    destaque: 'A Reforma não inventou uma nova religião — restaurou a antiga pela Palavra.',
  },
  {
    num: '08', label: 'Política', titulo: 'Lex, Rex — A Lei É Rei',
    cor: '#f59e0b', corRgb: '245,158,11', icon: Crown,
    texto: '<span style="color:#f59e0b;font-weight:700;">Lex, Rex</span><sup style="color:#f59e0b;font-size:0.72em;vertical-align:super;">1</sup> <em style="color:rgba(200,205,255,0.65)">(1644)</em> inverte a fórmula absolutista <em>Rex, Lex</em> ("o rei é a lei") com três afirmações revolucionárias. <strong style="color:#fff;">(1)</strong> Toda soberania ontológica e autoridade absoluta pertencem unicamente a Deus<sup style="color:#f59e0b;font-size:0.72em;vertical-align:super;">16</sup>. <strong style="color:#fff;">(2)</strong> Nenhum rei ou governante civil possui autoridade ilimitada ou "direito divino" para agir acima da lei — o poder delegado ao governante pelo povo é <span style="background:rgba(245,158,11,0.12);border-left:3px solid #f59e0b;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,235,180,0.95);">condicional e limitado debaixo do Senhorio de Cristo</span><sup style="color:#f59e0b;font-size:0.72em;vertical-align:super;">16</sup>. <strong style="color:#fff;">(3)</strong> A Lei de Deus está acima do rei. Por isso, a obediência a Cristo nunca pode ser traição ao Estado: <span style="color:#fbbf24;font-style:italic;font-weight:700;">"A verdade para com Cristo não pode ser traição a César."</span><sup style="color:#f59e0b;font-size:0.72em;vertical-align:super;">17</sup> O livro foi queimado publicamente em 1660 — e seu autor perdeu sua cátedra e morreu sob perseguição no ano seguinte<sup style="color:#f59e0b;font-size:0.72em;vertical-align:super;">18</sup>.',
    destaque: '"A verdade para com Cristo não pode ser traição a César." — Lex, Rex, 1644',
  },
];

const ESCADA = [
  { label: 'Revelação',         sub: 'Deus fala',              cor: '#f97316' },
  { label: 'Escritura',         sub: 'Registrada',             cor: '#fbbf24' },
  { label: 'Exegese',           sub: 'Interpretação',          cor: '#2dd4bf' },
  { label: 'Teologia Bíblica',  sub: 'Progresso da Redenção',  cor: '#a78bfa' },
  { label: 'Dogmática',         sub: 'Síntese',                cor: '#34d399' },
  { label: 'Confissão',         sub: 'Autoridade Derivada',    cor: '#60a5fa' },
];

export default function AutorRutherfordPage() {
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
          <span style={{ color: `rgba(${ACCENT_RGB},0.85)` }}>Samuel Rutherford</span>
        </motion.div>

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative', borderRadius: 32, overflow: 'hidden', marginBottom: 64,
            background: 'linear-gradient(135deg, #1a0800 0%, #0d0400 50%, #080200 100%)',
            border: `1.5px solid rgba(${ACCENT_RGB},0.25)`,
          }}
        >
          <div style={{ position: 'absolute', top: -60, right: -40, width: 320, height: 320, borderRadius: '50%', background: ACCENT, filter: 'blur(100px)', opacity: 0.12, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -20, width: 220, height: 220, borderRadius: '50%', background: '#fbbf24', filter: 'blur(80px)', opacity: 0.07, pointerEvents: 'none' }} />

          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 0 }}>
            <div style={{ padding: 'clamp(32px,5vw,56px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                {['Westminster 1643–1648', '1600 – 1661', 'Lex, Rex', 'Escolástica Reformada'].map(t => (
                  <span key={t} style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: ACCENT, background: `rgba(${ACCENT_RGB},0.12)`, border: `1px solid rgba(${ACCENT_RGB},0.25)`, padding: '5px 14px', borderRadius: 99 }}>
                    {t}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.38em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.58)`, marginBottom: 12 }}>
                Perfil Teológico · Assembleia de Westminster
              </p>
              <h1 style={{
                fontSize: 'clamp(28px,4.5vw,50px)', fontWeight: 900, lineHeight: 1.06, margin: '0 0 4px',
                background: `linear-gradient(135deg, #fff 30%, rgba(${ACCENT_RGB},0.88) 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Samuel Rutherford
              </h1>
              <p style={{ fontSize: 13, fontWeight: 700, color: `rgba(${ACCENT_RGB},0.60)`, margin: '0 0 10px', letterSpacing: '0.10em' }}>
                Samuel Rutherfordus · Teólogo Presbiteriano Escocês
              </p>
              <p style={{ fontSize: 17, color: `rgba(${ACCENT_RGB},0.85)`, fontWeight: 600, fontStyle: 'italic', margin: '0 0 32px', lineHeight: 1.5 }}>
                Arquitetura do Conhecimento, A Razão Serva e Lex, Rex
              </p>
              <div style={{ borderLeft: `4px solid ${ACCENT}`, background: `rgba(${ACCENT_RGB},0.08)`, borderRadius: '0 14px 14px 0', padding: '18px 22px' }}>
                <p style={{ margin: 0, fontSize: 'clamp(15px,2.2vw,19px)', fontWeight: 700, color: '#fff', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 10 }}>
                  "A verdade para com Cristo não pode ser traição a César."<sup style={{ fontSize: '0.6em', color: `rgba(${ACCENT_RGB},0.75)`, verticalAlign: 'super' }}>17</sup>
                </p>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: `rgba(${ACCENT_RGB},0.72)`, letterSpacing: '0.10em' }}>
                  — Lex, Rex, 1644
                </p>
              </div>
            </div>

            <div style={{ width: 'clamp(180px, 26vw, 280px)', flexShrink: 0, position: 'relative', borderLeft: `1px solid rgba(${ACCENT_RGB},0.14)`, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', background: `linear-gradient(to right, rgba(26,8,0,0.55) 0%, transparent 30%), linear-gradient(to top, rgba(6,6,26,0.70) 0%, transparent 35%)` }} />
              <img
                src={FOTO_URL}
                alt="Retrato de Samuel Rutherford"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', filter: 'sepia(15%) contrast(1.06) brightness(0.92)', minHeight: 320 }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
              />
              <div style={{ position: 'absolute', bottom: 14, left: 0, right: 0, zIndex: 3, textAlign: 'center', padding: '0 12px' }}>
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.75)`, background: 'rgba(0,0,0,0.55)', padding: '4px 10px', borderRadius: 8, backdropFilter: 'blur(4px)' }}>
                  Samuel Rutherford · c. 1645
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Quem Foi Rutherford ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 20 }}>
            Quem Foi Rutherford
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              '<strong style="color:#fff;">Samuel Rutherford</strong> <span style="color:#f97316;font-weight:700;">(1600–1661)</span> foi um teólogo escolástico presbiteriano escocês, pastor de profunda piedade e devoção, e representante de destaque na <em style="color:#fbbf24;">Assembleia de Westminster</em><sup style="color:#f97316;font-size:0.72em;vertical-align:super;">18</sup> <span style="color:rgba(200,205,255,0.60)">(1643–1648)</span>. Combinava como poucos a rigidez doutrinária da escolástica reformada com a intensidade devocional de seus célebres <em style="color:#2dd4bf;">Letters</em> — correspondência espiritual que o tornou conhecido como o "João da Cruz" do presbiterianismo escocês.',
              'Suas obras principais cobrem um espectro extraordinariamente amplo. <span style="color:#fbbf24;font-weight:700;">Lex, Rex</span><sup style="color:#f97316;font-size:0.72em;vertical-align:super;">1</sup> <em style="color:rgba(200,205,255,0.65)">(1644)</em> revolucionou a filosofia política ao colocar a lei de Deus acima do monarca. <span style="color:#fbbf24;font-weight:700;">The Due Right of Presbyteries</span><sup style="color:#f97316;font-size:0.72em;vertical-align:super;">2</sup> defende o governo eclesiástico presbiteriano. A <span style="color:#fbbf24;font-weight:700;">Disputatio Scholastica de Divina Providentia</span><sup style="color:#f97316;font-size:0.72em;vertical-align:super;">3</sup> é uma obra técnica de escolástica reformada sobre providência, causalidade e epistemologia. <span style="color:#fbbf24;font-weight:700;">The Covenant of Life Opened</span><sup style="color:#f97316;font-size:0.72em;vertical-align:super;">4</sup> trata da teologia da aliança.',
              'Por causa de <em style="color:#f97316;">Lex, Rex</em>, Rutherford foi convocado ao parlamento escocês para ser julgado por traição em 1660. Morreu antes de chegar ao tribunal — mas sob perseguição e tendo perdido sua cátedra em St Andrews. O livro foi queimado publicamente. A <span style="background:rgba(249,115,22,0.14);border-left:3px solid #f97316;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,220,190,0.95);">sua recusa de recuar diante do poder</span><sup style="color:#f97316;font-size:0.72em;vertical-align:super;">18</sup> foi a aplicação mais cara e literal de sua própria tese: nenhum rei está acima da lei de Deus.',
            ].map((p, i) => (
              <p key={i} style={{ margin: 0, fontSize: 'clamp(16px,2.1vw,18px)', color: 'rgba(228,232,255,0.93)', lineHeight: 2.0 }} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </motion.div>

        {/* ── divisor ── */}
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.20), transparent)`, marginBottom: 64 }} />

        {/* ── Escada do Conhecimento ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          style={{ marginBottom: 64, borderRadius: 22, background: 'rgba(249,115,22,0.05)', border: '1.5px solid rgba(249,115,22,0.20)', padding: 'clamp(24px,4vw,40px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 180, height: 180, borderRadius: '50%', background: '#f97316', filter: 'blur(70px)', opacity: 0.07, pointerEvents: 'none' }} />
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(249,115,22,0.75)', marginBottom: 10, position: 'relative' }}>
            Arquitetura do Conhecimento
          </p>
          <h3 style={{ margin: '0 0 8px', fontSize: 'clamp(17px,2.5vw,22px)', fontWeight: 900, color: '#fff', lineHeight: 1.22, position: 'relative' }}>
            A Escada do Conhecimento Teológico<sup style={{ fontSize: '0.6em', color: 'rgba(249,115,22,0.75)', verticalAlign: 'super', marginLeft: 4 }}>6,7</sup>
          </h3>
          <p style={{ margin: '0 0 28px', fontSize: 15, color: 'rgba(228,232,255,0.72)', lineHeight: 1.8, position: 'relative' }}>
            A autoridade decresce progressivamente à medida que nos afastamos da Revelação. A Confissão é indispensável — mas sempre subordinada à Escritura.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 8, position: 'relative' }}>
            {ESCADA.map((e, i, arr) => (
              <div key={e.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ padding: '8px 16px', borderRadius: 99, background: `rgba(249,115,22,0.10)`, border: `1.5px solid ${e.cor}44`, fontSize: 11, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: e.cor, marginBottom: 4 }}>
                    {e.label}
                  </div>
                  <div style={{ fontSize: 9, color: e.cor + '88', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{e.sub}</div>
                </div>
                {i < arr.length - 1 && <ArrowRight size={14} color="rgba(200,205,255,0.20)" style={{ flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Contribuições — título ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }} style={{ marginBottom: 40, textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.38em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.60)`, marginBottom: 12 }}>
            Contribuições Teológicas
          </p>
          <h2 style={{ margin: 0, fontSize: 'clamp(22px,3.5vw,32px)', fontWeight: 900, color: '#fff', lineHeight: 1.18, marginBottom: 14 }}>
            Oito Eixos do Pensamento de Rutherford
          </h2>
          <p style={{ margin: '0 auto', maxWidth: 560, fontSize: 16, color: 'rgba(210,215,255,0.72)', lineHeight: 1.85 }}>
            Da bibliologia à filosofia política, da epistemologia escolástica à doutrina da providência.
          </p>
        </motion.div>

        {/* ── Cards dos eixos ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {PILARES.map((p, i) => {
            const IconComp = p.icon;
            return (
              <motion.div key={p.num} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 + i * 0.08 }}
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
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
          style={{ marginTop: 64, borderRadius: 24, background: `linear-gradient(135deg, rgba(${ACCENT_RGB},0.10) 0%, rgba(${ACCENT_RGB},0.04) 100%)`, border: `1.5px solid rgba(${ACCENT_RGB},0.28)`, padding: 'clamp(28px,4vw,44px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: ACCENT, filter: 'blur(70px)', opacity: 0.10, pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 18 }}>
              A Visão de Rutherford em Síntese
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
              {[
                { label: 'Palavra',       sub: 'Fundação',         cor: '#f97316' },
                { label: 'Razão Serva',   sub: 'Ancilla',          cor: '#fbbf24' },
                { label: 'Três Zonas',    sub: 'do Conhecimento',  cor: '#2dd4bf' },
                { label: 'Providência',   sub: 'Causa Primeira',   cor: '#60a5fa' },
                { label: 'Lex, Rex',      sub: 'Lei sobre o Rei',  cor: '#f59e0b' },
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
              "Para Rutherford, toda autoridade — teológica, filosófica e política — é subordinada à Palavra de Deus. A razão serve a fé. As causas secundárias operam sob a Causa Primeira. E nenhum rei está acima da lei de Deus. Esse é o sistema em que tudo se sustenta mutuamente."
            </p>
          </div>
        </motion.div>

        {/* ── Obras Principais ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.06 }}
          style={{ marginTop: 52, borderRadius: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(22px,3.5vw,38px)' }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 16 }}>
            Obras Principais
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { obra: 'Lex, Rex: The Law and the Prince', data: '1644', nota: 1, desc: 'Filosofia política reformada: a lei de Deus está acima do rei. Queimado publicamente em 1660.', cor: '#f59e0b' },
              { obra: 'The Due Right of Presbyteries', data: '1644', nota: 2, desc: 'Defesa do governo eclesiástico presbiteriano e da estrutura da Igreja reformada.', cor: '#f97316' },
              { obra: 'Disputatio Scholastica de Divina Providentia', data: '1649', nota: 3, desc: 'Obra técnica de escolástica reformada sobre providência, epistemologia e método teológico.', cor: '#2dd4bf' },
              { obra: 'The Covenant of Life Opened', data: '1655', nota: 4, desc: 'Tratado sobre a teologia da aliança da graça — teologia pactual em profundidade.', cor: '#a78bfa' },
            ].map(o => (
              <div key={o.obra} style={{ borderRadius: 14, padding: '16px 20px', background: `rgba(249,115,22,0.04)`, border: `1px solid rgba(249,115,22,0.12)`, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 10, background: `rgba(249,115,22,0.12)`, border: `1px solid rgba(249,115,22,0.22)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={18} color={o.cor} />
                </div>
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 900, color: '#fff' }}>
                    {o.obra} <span style={{ color: `rgba(${ACCENT_RGB},0.55)`, fontWeight: 700 }}>({o.data})</span>
                    <sup style={{ color: `rgba(${ACCENT_RGB},0.75)`, fontSize: '0.72em', verticalAlign: 'super', marginLeft: 2 }}>{o.nota}</sup>
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: 'rgba(200,205,255,0.68)', lineHeight: 1.65 }}>{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── divisor notas ── */}
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.15), transparent)`, margin: '56px 0 40px' }} />

        {/* ── Notas de Rodapé ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.10 }}>
          <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.50)`, marginBottom: 20 }}>
            Notas de Rodapé
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {NOTAS.map(n => (
              <div key={n.num} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, minWidth: 24, fontSize: 11, fontWeight: 900, color: `rgba(${ACCENT_RGB},0.65)`, fontVariantNumeric: 'tabular-nums', paddingTop: 2 }}>
                  {n.num}.
                </span>
                <p style={{ margin: 0, fontSize: 13, color: 'rgba(200,205,255,0.62)', lineHeight: 1.80 }} dangerouslySetInnerHTML={{ __html: n.ref }} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Voltar ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.14 }} style={{ marginTop: 48 }}>
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
