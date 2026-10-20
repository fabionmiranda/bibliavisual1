import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Scale, Layers, Shield, ArrowRight, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ACCENT     = '#818cf8'; // indigo-400
const ACCENT_RGB = '129,140,248';
const BG         = '#06061a';

const FOTO_URL = 'https://commons.wikimedia.org/wiki/Special:FilePath/Francis_Turretin.jpg';

// ─── 5 contribuições dogmáticas ──────────────────────────────────────────────
const PILARES = [
  {
    num: '01', label: 'Prolegômenos', titulo: 'Arquetypa & Ectypa',
    cor: '#818cf8', corRgb: '129,140,248', icon: Layers,
    texto: 'Turretin distinguiu a <span style="color:#818cf8;font-weight:700;">Theologia Archetypa</span> — o conhecimento <strong style="color:#fff;">absoluto, infinito e essencial</strong> que Deus tem de Si mesmo na vida trinitária — da <span style="color:#2dd4bf;font-weight:700;">Theologia Ectypa</span> — o conhecimento <span style="background:rgba(45,212,191,0.12);border-left:3px solid #2dd4bf;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,250,0.95);">criado, derivado e acomodado</span> que Deus concede por graça às criaturas. A teologia humana é, portanto, uma <span style="background:rgba(129,140,248,0.15);border:1px solid rgba(129,140,248,0.35);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;">scientia subalternata</span>: recebe seus primeiros princípios da <em style="color:#f59e0b;">autorrevelação de Deus</em> e nunca pode pretender exaurir o <span style="color:#fbbf24;font-weight:700;">conhecimento divino.</span>',
    destaque: 'A teologia humana conhece verdadeiramente, mas não exaustivamente.',
  },
  {
    num: '02', label: 'Epistemologia', titulo: 'Razão Ministerial vs. Magisterial',
    cor: '#f59e0b', corRgb: '245,158,11', icon: Scale,
    texto: 'Turretin formulou uma das distinções epistemológicas mais famosas da tradição reformada: o <span style="color:#fb7185;font-weight:700;">uso magisterial da razão</span> <em style="color:rgba(200,205,255,0.65);">(rejeitado)</em> ocorre quando a razão pretende atuar como <strong style="color:#fff;">tribunal autônomo</strong> sobre a revelação; o <span style="color:#f59e0b;font-weight:700;">uso ministerial ou instrumental</span> <em style="color:rgba(200,205,255,0.65);">(afirmado)</em> ocorre quando a razão atua como humilde serva <span style="background:rgba(129,140,248,0.15);border:1px solid rgba(129,140,248,0.35);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;">ancilla theologiae</span>, utilizando lógica, sintaxe e inferência para interpretar e defender a <span style="color:#2dd4bf;font-weight:700;">Palavra revelada</span> sem criar novos conteúdos. Com essa distinção, combateu simultaneamente o <span style="background:rgba(251,113,133,0.12);border-left:3px solid #fb7185;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,210,215,0.95);">racionalismo e o fideísmo.</span>',
    destaque: 'A razão serve a Escritura; não a julga.',
  },
  {
    num: '03', label: 'Método', titulo: 'Teologia Elênctica',
    cor: '#2dd4bf', corRgb: '45,212,191', icon: Shield,
    texto: 'O método das <span style="color:#818cf8;font-weight:700;">Institutio Theologiae Elencticae</span> é organizado em <span style="color:#2dd4bf;font-weight:700;">Questões Disputadas</span> <span style="background:rgba(129,140,248,0.15);border:1px solid rgba(129,140,248,0.35);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;">Quaestiones Disputatae</span>: formulação da pergunta central, <strong style="color:#fff;">mapeamento das posições adversárias</strong> (católicos romanos, arminianos/remonstrantes, luteranos, socinianos, cartesianos), <span style="background:rgba(45,212,191,0.12);border-left:3px solid #2dd4bf;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,250,0.95);">distinções conceituais rigorosas</span> para evitar ambiguidades e, finalmente, afirmação da <em style="color:#f59e0b;">tese ortodoxa</em> com resposta detalhada a cada objeção. <span style="color:#fbbf24;font-weight:700;">Elenchtic</span> deriva do grego <em style="color:#34d399;">elenchos</em> — exame crítico, refutação, demonstração do erro.',
    destaque: 'Não apenas expor a verdade — demonstrar por que os erros são inadequados.',
  },
  {
    num: '04', label: 'Soteriologia', titulo: 'Justificação Forense',
    cor: '#fb7185', corRgb: '251,113,133', icon: BookOpen,
    texto: 'Turretin refinou a arquitetura lógica da <span style="color:#fb7185;font-weight:700;">justificação forense</span>: culpa real → juízo real → <span style="color:#f59e0b;font-weight:700;">obediência ativa e passiva de Cristo</span> como satisfação → <span style="background:rgba(251,113,133,0.12);border-left:3px solid #fb7185;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,210,215,0.95);">imputação da justiça de Cristo</span> → fé como mero instrumento receptor → <strong style="color:#fff;">veredicto forense "JUSTIFICADO".</strong> Ele enfatizou que as boas obras acompanham necessariamente a fé viva, mas precisam ser rigorosamente distinguidas no <em style="color:#2dd4bf;">ato justificatório</em> para não comprometer a gratuidade da graça. A <span style="background:rgba(129,140,248,0.15);border:1px solid rgba(129,140,248,0.35);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;">obediência ativa</span> de Cristo (cumprimento da lei em vida) e a <span style="background:rgba(129,140,248,0.15);border:1px solid rgba(129,140,248,0.35);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;">obediência passiva</span> (sofrimento da pena) são ambas imputadas ao crente.',
    destaque: 'Justificação é veredicto, não processo — forense, não infusiva.',
  },
  {
    num: '05', label: 'Bibliologia', titulo: 'Autopistia da Escritura',
    cor: '#34d399', corRgb: '52,211,153', icon: Zap,
    texto: 'Turretin defendeu a <span style="color:#34d399;font-weight:700;">autopistia</span> <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,230,0.95);">auto-autenticação da Escritura</span>: as Sagradas Escrituras possuem <strong style="color:#fff;">autoridade e credibilidade intrínsecas,</strong> não derivadas de qualquer autoridade eclesiástica externa. A Escritura carrega em si mesma as <em style="color:#fbbf24;">marcas (indicia)</em> de sua origem divina — harmonia interna, sublimidade, cumprimento profético, poder transformador. Sua eficácia no coração do crente depende da <span style="color:#818cf8;font-weight:700;">iluminação interna do Espírito Santo</span> <span style="background:rgba(129,140,248,0.15);border:1px solid rgba(129,140,248,0.35);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;">testimonium Spiritus Sancti internum</span>, que sela a certeza da fé.',
    destaque: 'A Escritura se autentica por si mesma mediante o testemunho interno do Espírito.',
  },
];

// ─── a tabela dos 4 pilares da estrutura teológica ───────────────────────────
const ESTRUTURA = [
  { pilar: 'Objeto',     detalhe: 'Deus e as coisas divinas em sua relação com Deus (sub ratione revelationis)',         cor: '#818cf8' },
  { pilar: 'Gênero',     detalhe: 'Saber teórico-prático — não meramente especulativo, nem puramente prático',            cor: '#f59e0b' },
  { pilar: 'Princípio',  detalhe: 'A revelação escrita nas Escrituras como princípio cognitivo externo e Norma Normans',  cor: '#2dd4bf' },
  { pilar: 'Finalidade', detalhe: 'A glória de Deus e a salvação humana',                                                  cor: '#34d399' },
];

export default function AutorTurretinPage() {
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
          <span style={{ color: `rgba(${ACCENT_RGB},0.85)` }}>Francis Turretin</span>
        </motion.div>

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative', borderRadius: 32, overflow: 'hidden', marginBottom: 64,
            background: 'linear-gradient(135deg, #0a0520 0%, #06061a 50%, #080416 100%)',
            border: `1.5px solid rgba(${ACCENT_RGB},0.25)`,
          }}
        >
          {/* glows */}
          <div style={{ position: 'absolute', top: -60, right: -40, width: 320, height: 320, borderRadius: '50%', background: ACCENT, filter: 'blur(100px)', opacity: 0.12, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -20, width: 220, height: 220, borderRadius: '50%', background: '#f59e0b', filter: 'blur(80px)', opacity: 0.07, pointerEvents: 'none' }} />

          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 0 }}>

            {/* ── coluna texto ── */}
            <div style={{ padding: 'clamp(32px,5vw,56px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                {['Ortodoxia Reformada', '1623 – 1687', 'Teologia Sistemática', 'Escolástica Reformada'].map(t => (
                  <span key={t} style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: ACCENT, background: `rgba(${ACCENT_RGB},0.12)`, border: `1px solid rgba(${ACCENT_RGB},0.25)`, padding: '5px 14px', borderRadius: 99 }}>
                    {t}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.38em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.58)`, marginBottom: 12 }}>
                Perfil Teológico · Autor 02
              </p>
              <h1 style={{
                fontSize: 'clamp(28px,4.5vw,50px)', fontWeight: 900, lineHeight: 1.06, margin: '0 0 4px',
                background: `linear-gradient(135deg, #fff 30%, rgba(${ACCENT_RGB},0.88) 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Francis Turretin
              </h1>
              <p style={{ fontSize: 13, fontWeight: 700, color: `rgba(${ACCENT_RGB},0.60)`, margin: '0 0 10px', letterSpacing: '0.10em' }}>
                François Turrettini · Franciscus Turrettinus
              </p>
              <p style={{ fontSize: 17, color: `rgba(${ACCENT_RGB},0.85)`, fontWeight: 600, fontStyle: 'italic', margin: '0 0 32px', lineHeight: 1.5 }}>
                A Teologia Elênctica — Sistematizar e Defender a Fé Reformada
              </p>

              {/* frase central */}
              <div style={{ borderLeft: `4px solid ${ACCENT}`, background: `rgba(${ACCENT_RGB},0.08)`, borderRadius: '0 14px 14px 0', padding: '18px 22px' }}>
                <p style={{ margin: 0, fontSize: 'clamp(15px,2.2vw,19px)', fontWeight: 700, color: '#fff', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 10 }}>
                  "A teologia é um sistema doutrinal controverso, racionalmente ordenado e biblicamente fundado."
                </p>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: `rgba(${ACCENT_RGB},0.72)`, letterSpacing: '0.10em' }}>
                  — Institutio Theologiae Elencticae, 1679–1685
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
                background: `linear-gradient(to right, rgba(10,5,32,0.55) 0%, transparent 30%), linear-gradient(to top, rgba(6,6,26,0.70) 0%, transparent 35%)`,
              }} />
              <img
                src={FOTO_URL}
                alt="Retrato de Francis Turretin"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  filter: 'sepia(15%) contrast(1.06) brightness(0.92)',
                  minHeight: 320,
                }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
              />
              <div style={{
                position: 'absolute', bottom: 14, left: 0, right: 0, zIndex: 3,
                textAlign: 'center', padding: '0 12px',
              }}>
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.75)`, background: 'rgba(0,0,0,0.55)', padding: '4px 10px', borderRadius: 8, backdropFilter: 'blur(4px)' }}>
                  Francis Turretin · c. 1670
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Quem Foi Turretin ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 20 }}>
            Quem Foi Turretin
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              '<strong style="color:#fff;">Francis Turretin</strong> <span style="color:#818cf8;font-weight:700;">(1623–1687)</span> foi um teólogo genebrino e uma das figuras mais proeminentes da <em style="color:#f59e0b;">Ortodoxia Reformada</em> — também chamada de <span style="background:rgba(129,140,248,0.15);border:1px solid rgba(129,140,248,0.35);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;">Escolástica Reformada</span> — do século XVII. Professor de Teologia na <span style="color:#fbbf24;font-weight:700;">Academia de Genebra,</span> ele ocupou a mesma cadeira que <em style="color:#2dd4bf;">João Calvino</em> havia inaugurado décadas antes.',
              'Turretin não buscou inventar uma teologia nova ou original. Seu projeto foi <span style="color:#818cf8;font-weight:700;">sistematizar, organizar e defender racionalmente</span> a fé reformada herdada do século XVI diante dos novos desafios intelectuais de sua época: o <em style="color:#fb7185;">catolicismo pós-Tridentino,</em> o <em style="color:#f59e0b;">arminianismo/remonstrância,</em> o <em style="color:#60a5fa;">luteranismo,</em> o <em style="color:#2dd4bf;">socinianismo racionalista</em> e o <em style="color:#34d399;">cartesianismo filosófico.</em>',
              'Sua obra magna, as <span style="color:#fbbf24;font-weight:700;">Institutio Theologiae Elencticae</span> <em style="color:rgba(200,205,255,0.65);">(3 vols., 1679–1685),</em> tornou-se o manual de teologia sistemática <span style="background:rgba(129,140,248,0.12);border-left:3px solid #818cf8;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(220,218,255,0.95);">mais influente do protestantismo reformado por dois séculos,</span> adotado pelos puritanos ingleses, pelos reformados holandeses e, nos séculos XVIII–XIX, pelo <strong style="color:#fff;">Seminário de Princeton</strong> — onde <em style="color:#34d399;">Charles Hodge</em> a utilizou como texto base.',
            ].map((p, i) => (
              <p key={i} style={{ margin: 0, fontSize: 'clamp(16px,2.1vw,18px)', color: 'rgba(228,232,255,0.93)', lineHeight: 2.0 }} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </motion.div>

        {/* ── divisor ── */}
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.20), transparent)`, marginBottom: 64 }} />

        {/* ── Contexto Historiográfico ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          style={{ marginBottom: 64, borderRadius: 22, background: 'rgba(245,158,11,0.06)', border: '1.5px solid rgba(245,158,11,0.22)', padding: 'clamp(24px,4vw,40px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 180, height: 180, borderRadius: '50%', background: '#f59e0b', filter: 'blur(70px)', opacity: 0.07, pointerEvents: 'none' }} />
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(245,158,11,0.75)', marginBottom: 16, position: 'relative' }}>
            Reavaliação Historiográfica
          </p>
          <h3 style={{ margin: '0 0 18px', fontSize: 'clamp(17px,2.5vw,22px)', fontWeight: 900, color: '#fff', lineHeight: 1.22, position: 'relative' }}>
            Turretin não foi uma ruptura com Calvino — foi uma mudança de gênero
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }}>
            <p style={{ margin: 0, fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(228,232,255,0.88)', lineHeight: 1.90 }}>
              Pesquisadores modernos, especialmente <strong style={{ color: '#fbbf24' }}>Richard Muller</strong> (Calvin and the Reformed Tradition, 2012), desmistificaram a caricatura do século XIX que acusava Turretin de promover uma "decadência racionalista" em relação a Calvino.
            </p>
            <p style={{ margin: 0, fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(228,232,255,0.88)', lineHeight: 1.90 }}>
              A diferença entre o estilo de Calvino (sermões e comentários pastorais) e o de Turretin (disputas acadêmicas e teses escolásticas) não é uma ruptura doutrinária, mas uma <strong style={{ color: '#fbbf24' }}>mudança de gênero literário, contexto e necessidade</strong> — a Academia de Genebra precisava de um manual sistemático para treinar pastores e responder academicamente aos adversários. A doutrina é a mesma; o método é diferente.
            </p>
          </div>
        </motion.div>

        {/* ── Estrutura da Teologia (4 pilares) ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 10 }}>
            Definição de Teologia
          </p>
          <h2 style={{ margin: '0 0 8px', fontSize: 'clamp(20px,3vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.18 }}>
            Os 4 Pilares da Estrutura Teológica
          </h2>
          <p style={{ margin: '0 0 28px', fontSize: 16, color: 'rgba(210,215,255,0.70)', lineHeight: 1.8 }}>
            Para Turretin, a teologia é um <em>sistema doutrinal controverso, racionalmente ordenado e biblicamente fundado</em>, definida por quatro coordenadas:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 16 }}>
            {ESTRUTURA.map(e => (
              <div key={e.pilar} style={{ borderRadius: 18, padding: '20px 22px', background: `rgba(${e.cor === '#818cf8' ? '129,140,248' : e.cor === '#f59e0b' ? '245,158,11' : e.cor === '#2dd4bf' ? '45,212,191' : '52,211,153'},0.07)`, border: `1.5px solid ${e.cor}28` }}>
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

        {/* ── 5 Contribuições — título ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }} style={{ marginBottom: 40, textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.38em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.60)`, marginBottom: 12 }}>
            Contribuições Dogmáticas
          </p>
          <h2 style={{ margin: 0, fontSize: 'clamp(22px,3.5vw,32px)', fontWeight: 900, color: '#fff', lineHeight: 1.18, marginBottom: 14 }}>
            Cinco Eixos do Sistema Elênctico
          </h2>
          <p style={{ margin: '0 auto', maxWidth: 560, fontSize: 16, color: 'rgba(210,215,255,0.72)', lineHeight: 1.85 }}>
            Cada tópico segue o método da <em>Quaestio Disputata</em>: pergunta → adversários mapeados → distinções → tese ortodoxa → resposta às objeções.
          </p>
        </motion.div>

        {/* ── fluxo método ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.30 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}>
          {[
            { label: 'Pergunta', cor: '#818cf8', corRgb: '129,140,248' },
            { label: 'Adversários', cor: '#f59e0b', corRgb: '245,158,11' },
            { label: 'Distinções', cor: '#2dd4bf', corRgb: '45,212,191' },
            { label: 'Tese Ortodoxa', cor: '#fb7185', corRgb: '251,113,133' },
            { label: 'Objeções', cor: '#34d399', corRgb: '52,211,153' },
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
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72 }}
          style={{ marginTop: 64, borderRadius: 24, background: `linear-gradient(135deg, rgba(${ACCENT_RGB},0.10) 0%, rgba(${ACCENT_RGB},0.04) 100%)`, border: `1.5px solid rgba(${ACCENT_RGB},0.28)`, padding: 'clamp(28px,4vw,44px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: ACCENT, filter: 'blur(70px)', opacity: 0.10, pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 18 }}>
              A Visão de Turretin em Síntese
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
              {[
                { label: 'Pergunta',  sub: 'Quaestio',    cor: '#818cf8' },
                { label: 'Razão',     sub: 'Ministerial', cor: '#f59e0b' },
                { label: 'Escritura', sub: 'Autopistia',  cor: '#2dd4bf' },
                { label: 'Defesa',    sub: 'Elêntica',    cor: '#fb7185' },
                { label: 'Graça',     sub: 'Forense',     cor: '#34d399' },
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
              "Para Turretin, a teologia verdadeira não apenas proclama a verdade — ela a demonstra metodicamente diante do adversário, defende a Escritura como sua única regra, distingue o papel ministerial da razão, articula a justificação como veredicto forense e confia na autopistia da Palavra iluminada pelo Espírito."
            </p>
          </div>
        </motion.div>

        {/* ── Adversários que Turretin Combateu ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.80 }}
          style={{ marginTop: 52, borderRadius: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(22px,3.5vw,38px)' }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 16 }}>
            Adversários Teológicos Mapeados nas Institutio
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: 12 }}>
            {[
              { nome: 'Catolicismo Romano', ponto: 'Tradição, missa, justificação por obras', cor: '#fb7185' },
              { nome: 'Arminianos / Remonstrantes', ponto: 'Graça resistível, eleição condicional', cor: '#f59e0b' },
              { nome: 'Luteranos', ponto: 'Comunicação dos idiomas, ubiquidade eucarística', cor: '#60a5fa' },
              { nome: 'Socinianos', ponto: 'Negação da trindade, satisfação vicária', cor: '#818cf8' },
              { nome: 'Cartesianos', ponto: 'Razão autônoma sobre a revelação', cor: '#2dd4bf' },
            ].map(a => (
              <div key={a.nome} style={{ borderRadius: 14, padding: '16px 18px', background: `rgba(${a.cor === '#fb7185' ? '251,113,133' : a.cor === '#f59e0b' ? '245,158,11' : a.cor === '#60a5fa' ? '96,165,250' : a.cor === '#818cf8' ? '129,140,248' : '45,212,191'},0.07)`, border: `1px solid ${a.cor}22` }}>
                <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 900, color: a.cor }}>{a.nome}</p>
                <p style={{ margin: 0, fontSize: 12, color: 'rgba(200,205,255,0.65)', lineHeight: 1.6 }}>{a.ponto}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Referência ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.86 }}
          style={{ marginTop: 44, borderRadius: 18, background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.16)', padding: '22px 28px' }}>
          <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.30em', textTransform: 'uppercase', color: 'rgba(251,191,36,0.70)', marginBottom: 14 }}>
            Referência Bibliográfica
          </p>
          <p style={{ margin: '0 0 10px', fontSize: 14, color: 'rgba(220,215,180,0.88)', lineHeight: 1.85 }}>
            TURRETIN, Francis. <em>Institutes of Elenctic Theology.</em> 3 vols. Tradução de George Musgrave Giger. Edição de James T. Dennison Jr. Phillipsburg, NJ: P&R Publishing, 1992–1997.
          </p>
          <p style={{ margin: '0 0 10px', fontSize: 13, color: 'rgba(200,200,180,0.62)', lineHeight: 1.75 }}>
            Obra original: TURRETINUS, Franciscus. <em>Institutio Theologiae Elencticae.</em> 3 vols. Genebra, 1679–1685.
          </p>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(200,200,180,0.62)', lineHeight: 1.75 }}>
            MULLER, Richard A. <em>Calvin and the Reformed Tradition: On the Work of Christ and the Order of Salvation.</em> Grand Rapids: Baker Academic, 2012.
          </p>
        </motion.div>

        {/* ── Fonte da imagem ── */}
        <p style={{ marginTop: 16, fontSize: 11, color: 'rgba(200,205,255,0.28)', lineHeight: 1.6 }}>
          Retrato: domínio público — <a href="https://commons.wikimedia.org/wiki/File:Francis_Turretin.jpg" target="_blank" rel="noopener noreferrer" style={{ color: `rgba(${ACCENT_RGB},0.50)`, textDecoration: 'none' }}>Wikimedia Commons</a>
        </p>

        {/* ── Voltar ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.90 }} style={{ marginTop: 48 }}>
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
