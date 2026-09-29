import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Layers, Shield, Heart, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ACCENT = '#2dd4bf';
const ACCENT_RGB = '45,212,191';
const BG = '#05071a';

const FOTO_URL = 'https://commons.wikimedia.org/wiki/Special:FilePath/Petrus_van_Mastricht.jpg';

const METODO = [
  {
    num: '01', label: 'Exegese', titulo: 'Ouvir a Escritura',
    cor: '#60a5fa', corRgb: '96,165,250', icon: BookOpen,
    texto: 'O primeiro movimento é exegético. Mastricht parte das Escrituras para estabelecer o fundamento bíblico daquilo que será afirmado teologicamente. Não se trata de construir primeiro um sistema filosófico e depois buscar textos que o confirmem — a Escritura funciona como fundamento e autoridade normativa da teologia.',
    destaque: 'O que este texto diz?',
  },
  {
    num: '02', label: 'Dogmática', titulo: 'Compreender e Organizar a Verdade',
    cor: '#f97316', corRgb: '249,115,22', icon: Layers,
    texto: 'Depois da exposição do texto, vem a formulação dogmática. A pergunta deixa de ser apenas "O que este texto diz?" e passa a ser "Que verdade doutrinária devemos afirmar a partir das Escrituras?" A dogmática organiza as verdades bíblicas em uma estrutura coerente de doutrina cristã. Para Mastricht, a teologia precisa ser intelectualmente rigorosa — mas esse rigor não constitui seu objetivo final.',
    destaque: 'Que verdade devemos afirmar?',
  },
  {
    num: '03', label: 'Elêntica', titulo: 'Confrontar o Erro',
    cor: '#f43f5e', corRgb: '244,63,94', icon: Shield,
    texto: 'O terceiro movimento é elêntico (elenchtic): a exposição e refutação das objeções e dos ensinamentos incompatíveis com a doutrina bíblica. A teologia exerce aqui função apologética e polêmica — não basta afirmar a verdade; é necessário responder aos erros que a contradizem. A preocupação de Mastricht não era acumular argumentos, mas demonstrar por que determinada formulação doutrinária era biblicamente sustentável.',
    destaque: 'Como responder às objeções?',
  },
  {
    num: '04', label: 'Prática', titulo: 'Viver a Verdade',
    cor: '#34d399', corRgb: '52,211,153', icon: Heart,
    texto: 'Finalmente, chega-se à teologia prática — o ponto essencial para compreender Mastricht. A doutrina não deve terminar na cabeça do teólogo. Ela precisa chegar à consciência, ao coração e à vida. A finalidade da teologia é a vida diante de Deus — integração entre tratamento escolástico rigoroso da doutrina e o propósito pastoral de preparar o povo de Deus para viver para Deus por meio de Cristo.',
    destaque: 'Como essa verdade transforma a vida?',
  },
];

export default function AutorMastrichtPage() {
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
          <span style={{ color: `rgba(${ACCENT_RGB},0.85)` }}>Petrus van Mastricht</span>
        </motion.div>

        {/* ── Hero: foto + info ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative', borderRadius: 32, overflow: 'hidden',
            marginBottom: 64,
            background: 'linear-gradient(135deg, #001a18 0%, #00100e 40%, #05071a 100%)',
            border: `1.5px solid rgba(${ACCENT_RGB},0.25)`,
          }}
        >
          {/* glows */}
          <div style={{ position: 'absolute', top: -60, right: -40, width: 320, height: 320, borderRadius: '50%', background: ACCENT, filter: 'blur(100px)', opacity: 0.10, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -20, width: 220, height: 220, borderRadius: '50%', background: '#0ea5e9', filter: 'blur(80px)', opacity: 0.08, pointerEvents: 'none' }} />

          <div style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) auto',
            gap: 0,
          }}>
            {/* ── coluna texto ── */}
            <div style={{ padding: 'clamp(32px,5vw,56px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {/* badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                {['Ortodoxia Reformada', '1630 – 1706', 'Teologia Sistemática'].map(t => (
                  <span key={t} style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: ACCENT, background: `rgba(${ACCENT_RGB},0.12)`, border: `1px solid rgba(${ACCENT_RGB},0.25)`, padding: '5px 14px', borderRadius: 99 }}>
                    {t}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.38em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.58)`, marginBottom: 12 }}>
                Perfil Teológico · Autor 01
              </p>
              <h1 style={{
                fontSize: 'clamp(28px,4.5vw,50px)', fontWeight: 900, lineHeight: 1.06, margin: '0 0 10px',
                background: `linear-gradient(135deg, #fff 30%, rgba(${ACCENT_RGB},0.88) 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Petrus van Mastricht
              </h1>
              <p style={{ fontSize: 17, color: `rgba(${ACCENT_RGB},0.85)`, fontWeight: 600, fontStyle: 'italic', margin: '0 0 32px', lineHeight: 1.5 }}>
                A Teologia Teórico-Prática
              </p>

              {/* frase central */}
              <div style={{ borderLeft: `4px solid ${ACCENT}`, background: `rgba(${ACCENT_RGB},0.08)`, borderRadius: '0 14px 14px 0', padding: '18px 22px' }}>
                <p style={{ margin: 0, fontSize: 'clamp(15px,2.2vw,19px)', fontWeight: 700, color: '#fff', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 10 }}>
                  "A teologia é a doutrina de viver para Deus por meio de Cristo."
                </p>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: `rgba(${ACCENT_RGB},0.72)`, letterSpacing: '0.10em' }}>
                  — Theoretico-Practica Theologia, 1699
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
              {/* overlay gradiente sobre a foto */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                background: `linear-gradient(to right, rgba(0,26,24,0.55) 0%, transparent 30%), linear-gradient(to top, rgba(5,7,26,0.70) 0%, transparent 35%)`,
              }} />
              <img
                src={FOTO_URL}
                alt="Retrato de Petrus van Mastricht"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  filter: 'sepia(15%) contrast(1.06) brightness(0.92)',
                  minHeight: 320,
                }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              {/* legenda sobre a foto */}
              <div style={{
                position: 'absolute', bottom: 14, left: 0, right: 0, zIndex: 3,
                textAlign: 'center', padding: '0 12px',
              }}>
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.75)`, background: 'rgba(0,0,0,0.55)', padding: '4px 10px', borderRadius: 8, backdropFilter: 'blur(4px)' }}>
                  Petrus van Mastricht · c. 1700
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Introdução ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 20 }}>
            Quem Foi Mastricht
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              'Petrus van Mastricht (1630–1706) foi um dos mais importantes representantes da ortodoxia reformada pós-Reforma. Professor de teologia em Utrecht, ele compreendia a teologia cristã essencialmente como uma disciplina teórico-prática — onde conhecimento e piedade não podem ser separados.',
              'Para ele, a teologia não deveria ser reduzida à aquisição intelectual de informações acerca de Deus. Seu propósito fundamental é conduzir o ser humano a viver para Deus por meio de Cristo. A verdadeira teologia nasce da Escritura, formula corretamente a doutrina, confronta os erros e, finalmente, conduz o cristão à prática da vida diante de Deus.',
              'Mastricht desenvolveu esse projeto em sua monumental Theoretico-Practica Theologia — obra tão estimada que Jonathan Edwards a considerou a maior obra de teologia de seu tempo, superior até mesmo às Institutas de Calvino em utilidade.',
            ].map((p, i) => (
              <p key={i} style={{ margin: 0, fontSize: 'clamp(16px,2.1vw,18px)', color: 'rgba(228,232,255,0.93)', lineHeight: 2.0 }}>
                {p}
              </p>
            ))}
          </div>
        </motion.div>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.20), transparent)`, marginBottom: 64 }} />

        {/* ── Método Quadriforme — título ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.20 }} style={{ marginBottom: 40, textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.38em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.60)`, marginBottom: 12 }}>
            Método Central
          </p>
          <h2 style={{ margin: 0, fontSize: 'clamp(22px,3.5vw,32px)', fontWeight: 900, color: '#fff', lineHeight: 1.18, marginBottom: 14 }}>
            O Método Quadriforme
          </h2>
          <p style={{ margin: '0 auto', maxWidth: 560, fontSize: 16, color: 'rgba(210,215,255,0.72)', lineHeight: 1.85 }}>
            Em sua <em>Theoretico-Practica Theologia</em>, cada tema é tratado segundo quatro movimentos integrados — não compartimentos isolados, mas um fluxo contínuo da Escritura até a vida.
          </p>
        </motion.div>

        {/* ── Fluxo visual ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}
        >
          {METODO.map((m, i) => (
            <div key={m.num} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ padding: '8px 18px', borderRadius: 99, background: `rgba(${m.corRgb},0.14)`, border: `1.5px solid rgba(${m.corRgb},0.32)`, fontSize: 11, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: m.cor }}>
                {m.label}
              </div>
              {i < METODO.length - 1 && <ArrowRight size={14} color="rgba(200,205,255,0.25)" />}
            </div>
          ))}
        </motion.div>

        {/* ── Cards do método ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {METODO.map((m, i) => {
            const IconComp = m.icon;
            return (
              <motion.div key={m.num} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 + i * 0.09 }}
                style={{ borderRadius: 22, border: `1.5px solid rgba(${m.corRgb},0.22)`, background: `rgba(${m.corRgb},0.05)`, overflow: 'hidden' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 0, borderBottom: `1px solid rgba(${m.corRgb},0.16)` }}>
                  <div style={{ width: 68, minHeight: 68, background: `rgba(${m.corRgb},0.13)`, borderRight: `1px solid rgba(${m.corRgb},0.18)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, gap: 4, padding: '12px 0' }}>
                    <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: `rgba(${m.corRgb},0.60)` }}>Passo</div>
                    <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1, color: m.cor }}>{m.num}</div>
                  </div>
                  <div style={{ padding: '16px 22px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: `rgba(${m.corRgb},0.16)`, border: `1px solid rgba(${m.corRgb},0.28)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconComp size={14} color={m.cor} strokeWidth={2} />
                      </div>
                      <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: m.cor }}>{m.label}</span>
                    </div>
                    <h3 style={{ margin: 0, fontSize: 'clamp(16px,2.4vw,20px)', fontWeight: 900, color: '#fff', lineHeight: 1.22 }}>{m.titulo}</h3>
                  </div>
                </div>
                <div style={{ padding: '24px 28px 28px' }}>
                  <p style={{ margin: '0 0 20px', fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(228,232,255,0.90)', lineHeight: 2.0 }}>
                    {m.texto}
                  </p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, borderRadius: 12, background: `rgba(${m.corRgb},0.10)`, border: `1px solid rgba(${m.corRgb},0.25)`, padding: '10px 18px' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: m.cor, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: m.cor, fontStyle: 'italic' }}>"{m.destaque}"</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Síntese ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
          style={{ marginTop: 64, borderRadius: 24, background: `linear-gradient(135deg, rgba(${ACCENT_RGB},0.10) 0%, rgba(${ACCENT_RGB},0.04) 100%)`, border: `1.5px solid rgba(${ACCENT_RGB},0.28)`, padding: 'clamp(28px,4vw,44px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: ACCENT, filter: 'blur(70px)', opacity: 0.10, pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 18 }}>
              A Visão de Mastricht em Síntese
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
              {[
                { label: 'Escritura', sub: 'Exegese',   cor: '#60a5fa' },
                { label: 'Doutrina', sub: 'Dogmática',  cor: '#f97316' },
                { label: 'Defesa',   sub: 'Elêntica',   cor: '#f43f5e' },
                { label: 'Piedade',  sub: 'Prática',    cor: '#34d399' },
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
            <p style={{ margin: '0 auto', maxWidth: 620, fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(228,232,255,0.90)', lineHeight: 1.90, fontStyle: 'italic' }}>
              "Para Mastricht, teologia verdadeira não é apenas saber corretamente sobre Deus — é conhecer a verdade revelada nas Escrituras, compreendê-la doutrinariamente, defendê-la contra o erro e, por meio dela, aprender a viver para Deus em Cristo."
            </p>
          </div>
        </motion.div>

        {/* ── Referência ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72 }}
          style={{ marginTop: 44, borderRadius: 18, background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.16)', padding: '22px 28px' }}
        >
          <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.30em', textTransform: 'uppercase', color: 'rgba(251,191,36,0.70)', marginBottom: 14 }}>
            Referência Bibliográfica
          </p>
          <p style={{ margin: '0 0 10px', fontSize: 14, color: 'rgba(220,215,180,0.88)', lineHeight: 1.85 }}>
            MASTRICHT, Petrus van. <em>Theoretical-Practical Theology: Volume 1 — Prolegomena.</em> Tradução de Todd M. Rester. Edição de Joel R. Beeke. Grand Rapids, MI: Reformation Heritage Books, 2018. 334 p. ISBN 978-1-60178-559-6.
          </p>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(200,200,180,0.62)', lineHeight: 1.75 }}>
            Obra original: MASTRICHT, Petrus van. <em>Theoretico-Practica Theologia.</em> Utrecht: Officina Thomae Appels, 1699.
          </p>
        </motion.div>

        {/* ── Fonte da imagem ── */}
        <p style={{ marginTop: 16, fontSize: 11, color: 'rgba(200,205,255,0.28)', lineHeight: 1.6 }}>
          Retrato: domínio público — <a href="https://commons.wikimedia.org/wiki/File:Petrus_van_Mastricht.jpg" target="_blank" rel="noopener noreferrer" style={{ color: `rgba(${ACCENT_RGB},0.50)`, textDecoration: 'none' }}>Wikimedia Commons</a>
        </p>

        {/* ── Voltar ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.78 }} style={{ marginTop: 48 }}>
          <Link to="/biblioteca/autores"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(200,205,255,0.45)', fontSize: 11, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.18s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,205,255,0.45)')}
          >
            ← Voltar para Autores
          </Link>
        </motion.div>

      </div>
      <Footer />
    </div>
  );
}
