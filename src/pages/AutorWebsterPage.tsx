import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Eye, Layers, Heart, ArrowRight, Compass } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ACCENT     = '#34d399'; // emerald-400
const ACCENT_RGB = '52,211,153';
const BG         = '#04100c';

const FOTO_URL = 'https://www.st-andrews.ac.uk/assets/university/schools/school-of-divinity/images/news/john-webster.jpg';

const EIXOS = [
  {
    num: '01', label: 'Teocentrismo', titulo: 'A Prioridade Radical de Deus',
    cor: '#34d399', corRgb: '52,211,153', icon: Compass,
    texto: 'Webster argumentava que a teologia só permanece autêntica quando é estritamente determinada pela própria realidade de Deus e por Sua autocomunicação — não quando tenta se legitimar perante padrões externos impostos pela filosofia secular ou pelas ciências sociais. Deus não é o tema passivo sobre o qual acadêmicos falam; Ele é o Agente soberano e o Sujeito ativo que se dá a conhecer e que torna a própria reflexão teológica possível.',
    destaque: 'A teologia só é teológica quando determinada pelo próprio Deus.',
  },
  {
    num: '02', label: 'Bibliologia', titulo: 'Escritura Inserida na Doutrina de Deus',
    cor: '#60a5fa', corRgb: '96,165,250', icon: BookOpen,
    texto: 'A maioria dos tratados contemporâneos começa analisando as propriedades humanas do texto, a crítica histórica ou as estratégias hermenêuticas do leitor. Webster inverte essa ordem: a Doutrina da Escritura pertence antes à Doutrina de Deus do que à teoria do texto. A Bíblia é um ato providencial, comunicativo e santificador do Deus Triuno dentro da economia da redenção. Webster distingue a Autoria Principal (Deus, que intenciona e governa a revelação) da Autoria Instrumental (os escritores proféticos e apostólicos santificados pelo Espírito Santo como instrumenta animata).',
    destaque: 'A Escritura é ato de Deus antes de ser texto humano.',
  },
  {
    num: '03', label: 'Escritura Santificada', titulo: 'As Propriedades Teológicas do Texto',
    cor: '#f59e0b', corRgb: '245,158,11', icon: Layers,
    texto: 'A Bíblia é um texto humano consagrado e "santificado" pelo Espírito Santo para servir de instrumento permanente da autocomunicação divina. Suas propriedades: Suficiência — o texto possui tudo o que é necessário para conduzir a criatura da ilusão para o conhecimento salvífico de Deus. Unidade — os diversos livros não formam uma coleção acidental, mas o meio de um único e estendido ato de comunicação de Deus. Autoridade — deriva diretamente do Deus que fala. Webster adverte ainda contra a "analogia encarnacional estrita": não existe união pessoal entre o divino e o texto; a Escritura não possui uma "natureza divina" — permanece instrumento humano criado e utilizado pelo Criador.',
    destaque: 'Santificada, não divinizada — instrumento do Criador, não participante da natureza divina.',
  },
  {
    num: '04', label: 'Razão Santificada', titulo: 'Iluminação e o Leitor como Aprendiz',
    cor: '#c084fc', corRgb: '192,132,252', icon: Eye,
    texto: 'A razão humana não é o tribunal autônomo diante do qual Deus comparece, mas uma "criatura curada" e santificada pela graça para responder em obediência à Palavra. O processo de leitura teológica exige a iluminação do Espírito Santo (illumination), que cura a cegueira cognitiva e moral do intérprete. O leitor atua como aprendiz (pupil) — nunca como senhor (magister) do texto sagrado. Pensar teologicamente é, antes de tudo, "pensar depois de Deus" — seguir o movimento do seu falar e agir.',
    destaque: '"Pensar depois de Deus" — o teólogo como aprendiz, não como árbitro.',
  },
  {
    num: '05', label: 'Ecclesia Sub Verbo', titulo: 'A Igreja Debaixo da Palavra',
    cor: '#fb7185', corRgb: '251,113,133', icon: Heart,
    texto: 'A Bibliologia precede a Hermenêutica: primeiro a teologia define o que o texto é e o que Deus faz por meio dele (ontologia do texto); apenas depois investiga quem somos e o que fazemos com o texto. A Igreja não cria a Palavra nem confere autoridade ao Cânone — ela vive debaixo do governo e do julgamento contínuo da Palavra. A postura do teólogo é de atenção e escuta reverente ao evangelho, exercitando a disciplina de "pensar depois de Deus". Assim como Calvino, Barth e a tradição clássica, Webster afirma que a Escritura é normativa porque o Deus vivo permanece sendo o seu autor, intérprete e agente soberano.',
    destaque: 'Ecclesia sub Verbo — a Igreja existe debaixo, nunca acima da Palavra.',
  },
];

export default function AutorWebsterPage() {
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
          <span style={{ color: `rgba(${ACCENT_RGB},0.85)` }}>John Webster</span>
        </motion.div>

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative', borderRadius: 32, overflow: 'hidden', marginBottom: 64,
            background: 'linear-gradient(135deg, #001a0e 0%, #00100a 40%, #04100c 100%)',
            border: `1.5px solid rgba(${ACCENT_RGB},0.25)`,
          }}
        >
          <div style={{ position: 'absolute', top: -60, right: -40, width: 320, height: 320, borderRadius: '50%', background: ACCENT, filter: 'blur(100px)', opacity: 0.10, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -20, width: 220, height: 220, borderRadius: '50%', background: '#60a5fa', filter: 'blur(80px)', opacity: 0.07, pointerEvents: 'none' }} />

          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 0 }}>

            {/* coluna texto */}
            <div style={{ padding: 'clamp(32px,5vw,56px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                {['Teologia Reformada', '1955 – 2016', 'Teologia Sistemática', 'Anglicano'].map(t => (
                  <span key={t} style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: ACCENT, background: `rgba(${ACCENT_RGB},0.12)`, border: `1px solid rgba(${ACCENT_RGB},0.25)`, padding: '5px 14px', borderRadius: 99 }}>
                    {t}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.38em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.58)`, marginBottom: 12 }}>
                Perfil Teológico · Autor 03
              </p>
              <h1 style={{
                fontSize: 'clamp(28px,4.5vw,50px)', fontWeight: 900, lineHeight: 1.06, margin: '0 0 10px',
                background: `linear-gradient(135deg, #fff 30%, rgba(${ACCENT_RGB},0.88) 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                John Webster
              </h1>
              <p style={{ fontSize: 17, color: `rgba(${ACCENT_RGB},0.85)`, fontWeight: 600, fontStyle: 'italic', margin: '0 0 32px', lineHeight: 1.5 }}>
                Teocentrismo Radical e a Escritura Santificada
              </p>
              <div style={{ borderLeft: `4px solid ${ACCENT}`, background: `rgba(${ACCENT_RGB},0.08)`, borderRadius: '0 14px 14px 0', padding: '18px 22px' }}>
                <p style={{ margin: 0, fontSize: 'clamp(15px,2.2vw,19px)', fontWeight: 700, color: '#fff', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 10 }}>
                  "A teologia é a disciplina de pensar depois de Deus — de seguir o movimento do seu ser, de sua obra e de seu falar."
                </p>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: `rgba(${ACCENT_RGB},0.72)`, letterSpacing: '0.10em' }}>
                  — Holy Scripture: A Dogmatic Sketch, 2003
                </p>
              </div>
            </div>

            {/* coluna foto */}
            <div style={{
              width: 'clamp(180px, 26vw, 280px)',
              flexShrink: 0,
              position: 'relative',
              borderLeft: `1px solid rgba(${ACCENT_RGB},0.14)`,
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                background: `linear-gradient(to right, rgba(0,26,14,0.55) 0%, transparent 30%), linear-gradient(to top, rgba(4,16,12,0.70) 0%, transparent 35%)`,
              }} />
              <img
                src={FOTO_URL}
                alt="Retrato de John Webster"
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
                  John Webster · St Andrews
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Quem Foi Webster ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 20 }}>
            Quem Foi John Webster
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              'John Webster (1955–2016) foi um dos teólogos sistemáticos anglicanos e reformados mais proeminentes da virada do século XX para o XXI. Lecionou nas universidades de Durham, Oxford, Aberdeen e St Andrews. Seu projeto intelectual foi amplamente reconhecido pelo resgate vigoroso do teocentrismo na dogmática e por sua reconstrução da doutrina das Escrituras.',
              'Seu projeto buscou libertar a teologia do ceticismo e do naturalismo hermenêutico moderno — devolvendo ao Deus Triuno o lugar de sujeito ativo e fundamento epistemológico de toda a racionalidade teológica. Formado na tradição de Karl Barth, mas com raízes firmes na ortodoxia reformada clássica (Calvino, os puritanos, Owen), Webster desenvolveu uma dogmática rigorosa e pastoralmente comprometida.',
              'Sua obra mais influente, Holy Scripture: A Dogmatic Sketch (2003), propôs uma viragem metodológica decisiva: colocar a bibliologia dentro da doutrina de Deus em vez de começar pela teoria literária ou pela hermenêutica moderna. Essa inversão de ordem tornou-se um dos movimentos teológicos mais comentados da teologia evangélica e reformada do século XXI.',
            ].map((p, i) => (
              <p key={i} style={{ margin: 0, fontSize: 'clamp(16px,2.1vw,18px)', color: 'rgba(228,232,255,0.93)', lineHeight: 2.0 }}>
                {p}
              </p>
            ))}
          </div>
        </motion.div>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.20), transparent)`, marginBottom: 64 }} />

        {/* ── A inversão metodológica ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          style={{ marginBottom: 64, borderRadius: 22, background: 'rgba(96,165,250,0.06)', border: '1.5px solid rgba(96,165,250,0.22)', padding: 'clamp(24px,4vw,40px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 200, height: 200, borderRadius: '50%', background: '#60a5fa', filter: 'blur(80px)', opacity: 0.07, pointerEvents: 'none' }} />
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(96,165,250,0.75)', marginBottom: 16, position: 'relative' }}>
            A Inversão Metodológica Central
          </p>
          <h3 style={{ margin: '0 0 22px', fontSize: 'clamp(17px,2.5vw,22px)', fontWeight: 900, color: '#fff', lineHeight: 1.22, position: 'relative' }}>
            De "o que é o texto?" para "quem é Deus?"
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 16, position: 'relative' }}>
            {[
              { label: 'Teologia Moderna', items: ['Começa com as propriedades humanas do texto', 'Prioriza crítica histórica', 'Hermenêutica do leitor em primeiro lugar', 'A autoridade depende de validação externa'], cor: '#fb7185' },
              { label: 'Webster', items: ['Começa com a doutrina de Deus', 'A Escritura é ato comunicativo de Deus', 'Bibliologia pertence à doutrina de Deus', 'A autoridade deriva de Deus que fala'], cor: ACCENT },
            ].map(col => (
              <div key={col.label} style={{ borderRadius: 16, padding: '18px 20px', background: `rgba(${col.cor === ACCENT ? ACCENT_RGB : '251,113,133'},0.07)`, border: `1px solid ${col.cor}28` }}>
                <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: col.cor }}>{col.label}</p>
                {col.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: col.cor, flexShrink: 0, marginTop: 7 }} />
                    <p style={{ margin: 0, fontSize: 13, color: 'rgba(220,225,255,0.78)', lineHeight: 1.65 }}>{item}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── título eixos ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} style={{ marginBottom: 40, textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.38em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.60)`, marginBottom: 12 }}>
            Contribuições Dogmáticas
          </p>
          <h2 style={{ margin: 0, fontSize: 'clamp(22px,3.5vw,32px)', fontWeight: 900, color: '#fff', lineHeight: 1.18, marginBottom: 14 }}>
            Cinco Eixos do Projeto Teológico
          </h2>
          <p style={{ margin: '0 auto', maxWidth: 560, fontSize: 16, color: 'rgba(210,215,255,0.72)', lineHeight: 1.85 }}>
            Cada eixo é determinado pela mesma lógica: a prioridade ontológica e epistemológica do Deus vivo sobre todos os demais agentes e textos.
          </p>
        </motion.div>

        {/* fluxo */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}>
          {EIXOS.map((e, i) => (
            <div key={e.num} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ padding: '8px 18px', borderRadius: 99, background: `rgba(${e.corRgb},0.14)`, border: `1.5px solid rgba(${e.corRgb},0.32)`, fontSize: 11, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: e.cor }}>
                {e.label}
              </div>
              {i < EIXOS.length - 1 && <ArrowRight size={14} color="rgba(200,205,255,0.25)" />}
            </div>
          ))}
        </motion.div>

        {/* cards eixos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {EIXOS.map((e, i) => {
            const IconComp = e.icon;
            return (
              <motion.div key={e.num} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 + i * 0.09 }}
                style={{ borderRadius: 22, border: `1.5px solid rgba(${e.corRgb},0.22)`, background: `rgba(${e.corRgb},0.05)`, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 0, borderBottom: `1px solid rgba(${e.corRgb},0.16)` }}>
                  <div style={{ width: 68, minHeight: 68, background: `rgba(${e.corRgb},0.13)`, borderRight: `1px solid rgba(${e.corRgb},0.18)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, gap: 4, padding: '12px 0' }}>
                    <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: `rgba(${e.corRgb},0.60)` }}>Eixo</div>
                    <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1, color: e.cor }}>{e.num}</div>
                  </div>
                  <div style={{ padding: '16px 22px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: `rgba(${e.corRgb},0.16)`, border: `1px solid rgba(${e.corRgb},0.28)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconComp size={14} color={e.cor} strokeWidth={2} />
                      </div>
                      <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: e.cor }}>{e.label}</span>
                    </div>
                    <h3 style={{ margin: 0, fontSize: 'clamp(16px,2.4vw,20px)', fontWeight: 900, color: '#fff', lineHeight: 1.22 }}>{e.titulo}</h3>
                  </div>
                </div>
                <div style={{ padding: '24px 28px 28px' }}>
                  <p style={{ margin: '0 0 20px', fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(228,232,255,0.90)', lineHeight: 2.0 }}>
                    {e.texto}
                  </p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, borderRadius: 12, background: `rgba(${e.corRgb},0.10)`, border: `1px solid rgba(${e.corRgb},0.25)`, padding: '10px 18px' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: e.cor, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: e.cor, fontStyle: 'italic' }}>"{e.destaque}"</span>
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
              A Visão de Webster em Síntese
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
              {[
                { label: 'Deus',       sub: 'Sujeito Ativo',        cor: '#34d399' },
                { label: 'Escritura',  sub: 'Ato Santificado',      cor: '#60a5fa' },
                { label: 'Razão',      sub: 'Criatura Curada',      cor: '#f59e0b' },
                { label: 'Leitor',     sub: 'Aprendiz/Pupil',       cor: '#c084fc' },
                { label: 'Igreja',     sub: 'Sub Verbo',             cor: '#fb7185' },
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
              "Para Webster, toda teologia autêntica começa e termina em Deus: Ele é o sujeito ativo da revelação, a Escritura é Seu ato santificado, a razão humana é criatura curada pela graça, o teólogo é aprendiz que pensa depois de Deus — e a Igreja existe debaixo, nunca acima, da Palavra."
            </p>
          </div>
        </motion.div>

        {/* ── Convergências ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.80 }}
          style={{ marginTop: 52, borderRadius: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(22px,3.5vw,38px)' }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 16 }}>
            Convergências e Diálogos
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 12 }}>
            {[
              { nome: 'João Calvino', ponto: 'Teocentrismo, testemunho interno do Espírito, clareza da Escritura', cor: '#f59e0b' },
              { nome: 'Karl Barth', ponto: 'Deus como Sujeito soberano da revelação; crítica ao liberalismo', cor: '#60a5fa' },
              { nome: 'John Owen', ponto: 'Escritura e iluminação do Espírito; razão como instrumento regenerado', cor: '#c084fc' },
              { nome: 'Francis Turretin', ponto: 'Autopistia da Escritura; autoridade intrínseca da Palavra', cor: '#818cf8' },
              { nome: 'Críticos', ponto: 'Menor atenção aos processos sócio-históricos da formação do Cânone', cor: '#fb7185' },
            ].map(a => (
              <div key={a.nome} style={{ borderRadius: 14, padding: '16px 18px', background: `rgba(255,255,255,0.03)`, border: `1px solid ${a.cor}22` }}>
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
            Referências Bibliográficas
          </p>
          <p style={{ margin: '0 0 10px', fontSize: 14, color: 'rgba(220,215,180,0.88)', lineHeight: 1.85 }}>
            WEBSTER, John. <em>Holy Scripture: A Dogmatic Sketch.</em> Cambridge: Cambridge University Press, 2003.
          </p>
          <p style={{ margin: '0 0 10px', fontSize: 13, color: 'rgba(200,200,180,0.62)', lineHeight: 1.75 }}>
            WEBSTER, John. <em>The Domain of the Word: Scripture and Theological Reason.</em> London: T&T Clark, 2012.
          </p>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(200,200,180,0.62)', lineHeight: 1.75 }}>
            WEBSTER, John. <em>Word and Church: Essays in Christian Dogmatics.</em> Edinburgh: T&T Clark, 2001.
          </p>
        </motion.div>

        {/* ── Fonte da imagem ── */}
        <p style={{ marginTop: 16, fontSize: 11, color: 'rgba(200,205,255,0.28)', lineHeight: 1.6 }}>
          Fotografia: University of St Andrews, School of Divinity — domínio público para uso acadêmico.
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
