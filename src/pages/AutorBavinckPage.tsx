import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Layers, Cpu, Globe, Zap, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ACCENT     = '#fb923c'; // amber-orange
const ACCENT_RGB = '251,146,60';
const BG         = '#0d0800';

const FOTO_URL = 'https://commons.wikimedia.org/wiki/Special:FilePath/Herman_Bavinck.jpg';

// ─── 5 eixos dogmáticos ───────────────────────────────────────────────────────
const PILARES = [
  {
    num: '01', label: 'Prolegômenos', titulo: 'Dogmática Orgânica — Scientia e Sapientia',
    cor: '#fb923c', corRgb: '251,146,60', icon: Layers,
    texto: 'Para Bavinck, a dogmática é definida como a "ciência da verdade revelada, recebida pela igreja e articulada sistematicamente." Diferente de um sistema mecânico — cujas peças são fabricadas separadamente e encaixadas de fora — o sistema teológico em Bavinck possui caráter orgânico: as doutrinas não são capítulos isolados ou amontoados de textos-prova (proof-texting); formam um organismo vivo. A Trindade, a criação, a antropologia, o pecado, a cristologia, a eclesialidade e a escatologia existem em função do todo, e o todo vive através de cada parte. Bavinck enfatiza que a teologia não produz a Deus nem cria a revelação; ela é um ato humilde e rigoroso de receber, escutar e pensar em unidade aquilo que Deus revelou historicamente. Por isso conserva simultaneamente seu caráter científico (rigor conceitual) e seu caráter sapiencial (seu fim supremo é conduzir à adoração e à comunhão com Deus).',
    destaque: 'A teologia é um organismo vivo — cada doutrina existe em função de todas as outras.',
  },
  {
    num: '02', label: 'Epistemologia', titulo: 'Os Princípios do Conhecimento Teológico',
    cor: '#60a5fa', corRgb: '96,165,250', icon: Cpu,
    texto: 'Bavinck organiza a epistemologia teológica sob uma estrutura trinitária de princípios claros. O Princípio Objetivo (Principium Cognoscendi Externum) é a Revelação Divina: a origem da verdade está totalmente fora da consciência humana — Deus é o Sujeito primário que toma a livre iniciativa de se dar a conhecer. O Princípio Subjetivo (Principium Cognoscendi Internum) é a Fé Regenerada e Iluminada pelo Espírito Santo: a revelação objetiva precisa ser acolhida por uma disposição cognitiva renovada pela graça. A Norma Objetiva é a Escritura Sagrada como regra suprema e inerrante (Norma Normans) que julga toda dogmática. O Dogma é a forma eclesial da verdade: a igreja não cria a verdade, mas confessa publicamente o que recebeu do testemunho canônico. A quadripartição — Revelação, Criação, Consciência, Imago Dei — garante que o conhecimento humano corresponda estruturalmente à realidade revelada sem reduzir a fonte ao sujeito cognoscente.',
    destaque: 'A revelação é objetiva; a consciência é lugar de recepção, jamais a fonte da verdade.',
  },
  {
    num: '03', label: 'Ontologia', titulo: 'A Graça Restaura a Natureza — Gratia Non Tollit Naturam',
    cor: '#34d399', corRgb: '52,211,153', icon: Globe,
    texto: 'A célebre máxima de Bavinck — "A graça não destrói a natureza, restaura-a" — não é apenas uma tese soteriológica, mas o pilar de toda sua ontologia e epistemologia. O pecado corrompeu profundamente a humanidade, mas não destruiu a estrutura ontológica da natureza humana ou da razão: o ser humano caído não se tornou irracional; sua razão continuou funcional (produzindo ciência, arte e cultura), mas teve sua orientação moral e espiritual desordenada contra Deus. A redenção realizada por Cristo e aplicada pelo Espírito Santo não destrói o intelecto para colocar algo estranho no lugar — ela cura, purifica e reorienta a razão para que volte a pensar em conformidade com a verdade do Criador. O mundo criado é pressuposto da revelação: a criação é intrinsecamente inteligível porque procede do Logos divino, e a providência a sustenta na sua inteligibilidade. Essa ontologia impede tanto o dualismo (graça vs. natureza) quanto o naturalismo (natureza absorve a graça).',
    destaque: 'A redenção não aliena o humano — restaura-o à conformidade com o Logos que o criou.',
  },
  {
    num: '04', label: 'Teologia Própria', titulo: 'Incompreensibilidade, Acomodação e Conhecimento Ectípico',
    cor: '#a78bfa', corRgb: '167,139,250', icon: BookOpen,
    texto: 'Bavinck reitera a assimetria ontológica infinita entre Deus e a criatura: Deus é incompreensível, inesgotável para o intelecto criado (finitum non capax infiniti). Conhecemos a Deus porque Ele condescende e adapta Sua verdade infinita à capacidade limitada da mente humana — falando em linguagem humana, como uma mãe que balbucia com seu filho (acomodação divina). O conhecimento humano de Deus é derivado e ectípico (Theologia Ectypa): absolutamente verdadeiro e objetivo, porém jamais exaustivo. Nossa linguagem sobre Deus funciona por analogia — aponta para uma realidade objetiva preservando a distinção de ser entre o Criador e a criatura. Isso significa que a incompreensibilidade de Deus não leva ao agnosticismo: ela afirma que o que conhecemos é real, revelado e suficiente para a vida e a piedade, mas reconhece que Deus sempre excede infinitamente toda compreensão criada.',
    destaque: 'Conhecemos Deus verdadeiramente — porém nunca exaustivamente. Ectípico, não arquétipo.',
  },
  {
    num: '05', label: 'Crítica Moderna', titulo: 'Resposta a Schleiermacher e à Modernidade',
    cor: '#f472b6', corRgb: '244,114,182', icon: Zap,
    texto: 'Schleiermacher havia reduzido a dogmática à descrição da autoconsciência religiosa e do "sentimento de dependência absoluta." Bavinck refuta esse subjetivismo: a experiência e a consciência são o lugar de recepção, mas a fonte e a norma da teologia pertencem unicamente à revelação objetiva de Deus. Ao mesmo tempo, Bavinck rejeitou os falsos extremos que fragmentaram o pensamento moderno: o fideísmo (que despreza a razão e a cultura), o racionalismo autônomo (que faz da razão o tribunal sobre Deus), o naturalismo e o sobrenaturalismo extrínseco (que trata a graça como algo alienígena à criação). Frente ao idealismo alemão (Kant, Hegel), ao liberalismo teológico (Ritschl), ao historicismo e ao positivismo, Bavinck demonstrou que os princípios clássicos da fé reformada permanecem intelectualmente fecundos para responder às perguntas do mundo moderno sem capitular ao subjetivismo ou ao irracionalismo.',
    destaque: 'A fé reformada não precisa capitular à modernidade — nem ignorá-la. Ela a responde.',
  },
];

// ─── Tabela comparativa ───────────────────────────────────────────────────────
const COMPARATIVO = [
  { teol: 'Francis Turretin', modelo: 'Teologia Elênctica (Quaestiones)', forca: 'Precisão conceitual e rigor no uso ministerial da razão', risco: 'Formalização escolástica ou abstração excessiva', cor: '#818cf8' },
  { teol: 'Petrus van Mastricht', modelo: 'Teologia Teórico-Prática (Quádrupla)', forca: 'Integração perfeita entre exegese, dogmática, defesa e vida devocional', risco: 'Absorção da dogmática na prática pastoral', cor: '#2dd4bf' },
  { teol: 'Herman Bavinck', modelo: 'Dogmática Orgânica', forca: 'Síntese entre revelação, criação, história e inteligibilidade moderna', risco: 'Elevada complexidade sintética e conceitual', cor: '#fb923c' },
  { teol: 'John Webster', modelo: 'Razão Santificada / Doutrina de Deus', forca: 'Teocentrismo radical e recentramento da Escritura no agir divino', risco: 'Menor atenção ao desenvolvimento sócio-histórico do Cânone', cor: '#34d399' },
];

export default function AutorBavinckPage() {
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
          <span style={{ color: `rgba(${ACCENT_RGB},0.85)` }}>Herman Bavinck</span>
        </motion.div>

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative', borderRadius: 32, overflow: 'hidden', marginBottom: 64,
            background: 'linear-gradient(135deg, #1a0800 0%, #0d0800 50%, #100a04 100%)',
            border: `1.5px solid rgba(${ACCENT_RGB},0.25)`,
          }}
        >
          <div style={{ position: 'absolute', top: -60, right: -40, width: 320, height: 320, borderRadius: '50%', background: ACCENT, filter: 'blur(100px)', opacity: 0.12, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -20, width: 220, height: 220, borderRadius: '50%', background: '#34d399', filter: 'blur(80px)', opacity: 0.07, pointerEvents: 'none' }} />

          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 0 }}>

            {/* ── coluna texto ── */}
            <div style={{ padding: 'clamp(32px,5vw,56px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                {['Neocalvinismo', '1854 – 1921', 'Dogmática Reformada', 'Modernidade'].map(t => (
                  <span key={t} style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: ACCENT, background: `rgba(${ACCENT_RGB},0.12)`, border: `1px solid rgba(${ACCENT_RGB},0.25)`, padding: '5px 14px', borderRadius: 99 }}>
                    {t}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.38em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.58)`, marginBottom: 12 }}>
                Perfil Teológico · Autor 05
              </p>
              <h1 style={{
                fontSize: 'clamp(28px,4.5vw,50px)', fontWeight: 900, lineHeight: 1.06, margin: '0 0 4px',
                background: `linear-gradient(135deg, #fff 30%, rgba(${ACCENT_RGB},0.88) 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Herman Bavinck
              </h1>
              <p style={{ fontSize: 13, fontWeight: 700, color: `rgba(${ACCENT_RGB},0.60)`, margin: '0 0 10px', letterSpacing: '0.10em' }}>
                Hermanus Bavinck · Neocalvinismo Holandês
              </p>
              <p style={{ fontSize: 17, color: `rgba(${ACCENT_RGB},0.85)`, fontWeight: 600, fontStyle: 'italic', margin: '0 0 32px', lineHeight: 1.5 }}>
                A Dogmática Orgânica — Graça que Restaura a Natureza
              </p>

              {/* frase central */}
              <div style={{ borderLeft: `4px solid ${ACCENT}`, background: `rgba(${ACCENT_RGB},0.08)`, borderRadius: '0 14px 14px 0', padding: '18px 22px' }}>
                <p style={{ margin: 0, fontSize: 'clamp(15px,2.2vw,19px)', fontWeight: 700, color: '#fff', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 10 }}>
                  "A graça não destrói a natureza — ela a restaura. A redenção recapitula e cura a criação, não a substitui."
                </p>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: `rgba(${ACCENT_RGB},0.72)`, letterSpacing: '0.10em' }}>
                  — Gereformeerde Dogmatiek, 1895–1901
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
                background: `linear-gradient(to right, rgba(26,8,0,0.55) 0%, transparent 30%), linear-gradient(to top, rgba(13,8,0,0.70) 0%, transparent 35%)`,
              }} />
              <img
                src={FOTO_URL}
                alt="Retrato de Herman Bavinck"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  filter: 'sepia(20%) contrast(1.05) brightness(0.90)',
                  minHeight: 320,
                }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
              />
              <div style={{
                position: 'absolute', bottom: 14, left: 0, right: 0, zIndex: 3,
                textAlign: 'center', padding: '0 12px',
              }}>
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.75)`, background: 'rgba(0,0,0,0.55)', padding: '4px 10px', borderRadius: 8, backdropFilter: 'blur(4px)' }}>
                  Herman Bavinck · c. 1910
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Quem Foi Bavinck ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 20 }}>
            Quem Foi Bavinck
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              'Herman Bavinck (1854–1921) foi um dos maiores teólogos dogmáticos da tradição reformada e da história do protestantismo. Figura central do neocalvinismo holandês ao lado de Abraham Kuyper, foi professor de Teologia Dogmática na Escola Teológica de Kampen e, depois, na Universidade Livre de Amsterdã — cadeira que herdou do próprio Kuyper.',
              'Sua obra magna, a Gereformeerde Dogmatiek (4 vols., 1895–1901), traduzida ao inglês como Reformed Dogmatics, é um dos projetos sistemáticos mais ambiciosos do protestantismo: revisita toda a tradição teológica cristã — Pais da Igreja, escolástica medieval, Reforma, ortodoxia reformada — e a articula em diálogo direto com os desafios da modernidade: o idealismo alemão (Kant, Hegel), o liberalismo teológico (Schleiermacher, Ritschl), o historicismo e o positivismo.',
              'Diferente de teólogos do século XVII como Turretin, Bavinck não escreveu para a Academia de Genebra, mas para um mundo em que a fé reformada precisava demonstrar sua inteligibilidade em plena modernidade. Seu projeto: realizar uma continuidade criativa da ortodoxia reformada, mostrando que os princípios clássicos da fé permanecem intelectualmente fecundos sem capitular ao subjetivismo.',
            ].map((p, i) => (
              <p key={i} style={{ margin: 0, fontSize: 'clamp(16px,2.1vw,18px)', color: 'rgba(228,232,255,0.93)', lineHeight: 2.0 }}>
                {p}
              </p>
            ))}
          </div>
        </motion.div>

        {/* ── divisor ── */}
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.20), transparent)`, marginBottom: 64 }} />

        {/* ── Contexto Historiográfico ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          style={{ marginBottom: 64, borderRadius: 22, background: 'rgba(96,165,250,0.06)', border: '1.5px solid rgba(96,165,250,0.20)', padding: 'clamp(24px,4vw,40px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 180, height: 180, borderRadius: '50%', background: '#60a5fa', filter: 'blur(70px)', opacity: 0.08, pointerEvents: 'none' }} />
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(96,165,250,0.75)', marginBottom: 16, position: 'relative' }}>
            Posição Histórica
          </p>
          <h3 style={{ margin: '0 0 18px', fontSize: 'clamp(17px,2.5vw,22px)', fontWeight: 900, color: '#fff', lineHeight: 1.22, position: 'relative' }}>
            Bavinck na virada entre Ortodoxia e Modernidade
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }}>
            <p style={{ margin: 0, fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(228,232,255,0.88)', lineHeight: 1.90 }}>
              Bavinck ocupa um lugar único na história do pensamento reformado: está firmemente enraizado na <strong style={{ color: '#93c5fd' }}>ortodoxia do século XVII</strong> (Turretin, Voetius, Owen), mas escreve em pleno diálogo com a <strong style={{ color: '#93c5fd' }}>filosofia e teologia do século XIX</strong>. Não é um escolástico tardio nem um liberal moderado — é uma síntese original.
            </p>
            <p style={{ margin: 0, fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(228,232,255,0.88)', lineHeight: 1.90 }}>
              Sua grandeza está em mostrar que a fé reformada não precisa escolher entre rigor histórico e relevância intelectual. A <strong style={{ color: '#93c5fd' }}>máxima gratia non tollit naturam, sed perficit</strong> (a graça não suprime a natureza, mas a aperfeiçoa) — tomada de Tomás de Aquino e reformulada — torna-se o eixo de uma visão integrada do mundo que abraça ciência, arte, política e cultura como âmbitos onde a redenção opera.
            </p>
          </div>
        </motion.div>

        {/* ── Quadripartição do Conhecimento ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 10 }}>
            Estrutura Epistemológica
          </p>
          <h2 style={{ margin: '0 0 8px', fontSize: 'clamp(20px,3vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.18 }}>
            A Quadripartição Orgânica do Conhecimento
          </h2>
          <p style={{ margin: '0 0 28px', fontSize: 16, color: 'rgba(210,215,255,0.70)', lineHeight: 1.8 }}>
            Bavinck integra quatro dimensões que garantem a objetividade e a riqueza do conhecimento teológico:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 16 }}>
            {[
              { pilar: 'Revelação', detalhe: 'Autocomunicação graciosa e objetiva de Deus — origem externa à consciência humana', cor: '#fb923c', corRgb: '251,146,60' },
              { pilar: 'Criação', detalhe: 'Ordem inteligível do cosmo, sustentada pela providência e procedente do Logos divino', cor: '#60a5fa', corRgb: '96,165,250' },
              { pilar: 'Consciência', detalhe: 'O sujeito cognoscente que acolhe e interpreta a verdade — condição de recepção, jamais a fonte', cor: '#a78bfa', corRgb: '167,139,250' },
              { pilar: 'Imago Dei', detalhe: 'Fundamento antropológico que garante correspondência entre o intelecto humano e a racionalidade da revelação', cor: '#34d399', corRgb: '52,211,153' },
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

        {/* ── 5 Eixos — título ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }} style={{ marginBottom: 40, textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.38em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.60)`, marginBottom: 12 }}>
            Contribuições Dogmáticas
          </p>
          <h2 style={{ margin: 0, fontSize: 'clamp(22px,3.5vw,32px)', fontWeight: 900, color: '#fff', lineHeight: 1.18, marginBottom: 14 }}>
            Cinco Eixos da Dogmática Orgânica
          </h2>
          <p style={{ margin: '0 auto', maxWidth: 560, fontSize: 16, color: 'rgba(210,215,255,0.72)', lineHeight: 1.85 }}>
            Cada eixo articula um aspecto do sistema orgânico de Bavinck, onde nenhuma doutrina existe em isolamento — tudo flui da Trindade e retorna à glória de Deus.
          </p>
        </motion.div>

        {/* ── fluxo orgânico ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.30 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}>
          {[
            { label: 'Revelação', cor: '#fb923c', corRgb: '251,146,60' },
            { label: 'Princípios', cor: '#60a5fa', corRgb: '96,165,250' },
            { label: 'Natureza', cor: '#34d399', corRgb: '52,211,153' },
            { label: 'Acomodação', cor: '#a78bfa', corRgb: '167,139,250' },
            { label: 'Modernidade', cor: '#f472b6', corRgb: '244,114,182' },
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
                  <p style={{ margin: '0 0 20px', fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(228,232,255,0.90)', lineHeight: 2.0 }}>
                    {p.texto}
                  </p>
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
              A Visão de Bavinck em Síntese
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
              {[
                { label: 'Revelação',  sub: 'Objetiva',    cor: '#fb923c' },
                { label: 'Natureza',   sub: 'Restaurada',  cor: '#34d399' },
                { label: 'Razão',      sub: 'Ectípica',    cor: '#60a5fa' },
                { label: 'Organismo',  sub: 'Trinitário',  cor: '#a78bfa' },
                { label: 'Modernidade', sub: 'Respondida', cor: '#f472b6' },
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
              "Para Bavinck, a teologia verdadeira não capitula à modernidade nem a ignora — ela a responde demonstrando que a fé reformada é o único sistema capaz de integrar revelação, criação, razão e redenção em um organismo vivo cuja raiz é a Trindade e cujo fim é a glória de Deus."
            </p>
          </div>
        </motion.div>

        {/* ── Tabela Comparativa ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.80 }}
          style={{ marginTop: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 16 }}>
            Comparação Crítica na Tradição
          </p>
          <h3 style={{ margin: '0 0 24px', fontSize: 'clamp(18px,2.6vw,24px)', fontWeight: 900, color: '#fff', lineHeight: 1.22 }}>
            Turretin · Mastricht · Bavinck · Webster
          </h3>
          <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)' }}>
            {/* header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {['Teólogo', 'Modelo Central', 'Força Metodológica', 'Risco Potencial'].map(h => (
                <div key={h} style={{ padding: '14px 18px', fontSize: 10, fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(200,205,255,0.45)' }}>{h}</div>
              ))}
            </div>
            {COMPARATIVO.map((row, i) => (
              <div key={row.teol} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', borderBottom: i < COMPARATIVO.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', background: row.cor === ACCENT ? `rgba(${ACCENT_RGB},0.06)` : 'transparent' }}>
                <div style={{ padding: '16px 18px' }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: row.cor }}>{row.teol}</span>
                </div>
                <div style={{ padding: '16px 18px' }}>
                  <span style={{ fontSize: 13, color: 'rgba(220,225,255,0.80)', lineHeight: 1.65 }}>{row.modelo}</span>
                </div>
                <div style={{ padding: '16px 18px' }}>
                  <span style={{ fontSize: 13, color: 'rgba(220,225,255,0.75)', lineHeight: 1.65 }}>{row.forca}</span>
                </div>
                <div style={{ padding: '16px 18px' }}>
                  <span style={{ fontSize: 13, color: 'rgba(200,205,255,0.55)', lineHeight: 1.65 }}>{row.risco}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Referência ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.86 }}
          style={{ marginTop: 52, borderRadius: 18, background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.16)', padding: '22px 28px' }}>
          <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.30em', textTransform: 'uppercase', color: 'rgba(251,191,36,0.70)', marginBottom: 14 }}>
            Referência Bibliográfica
          </p>
          <p style={{ margin: '0 0 10px', fontSize: 14, color: 'rgba(220,215,180,0.88)', lineHeight: 1.85 }}>
            BAVINCK, Herman. <em>Reformed Dogmatics.</em> 4 vols. Edição de John Bolt. Tradução de John Vriend. Grand Rapids: Baker Academic, 2003–2008.
          </p>
          <p style={{ margin: '0 0 10px', fontSize: 13, color: 'rgba(200,200,180,0.62)', lineHeight: 1.75 }}>
            Obra original: BAVINCK, Herman. <em>Gereformeerde Dogmatiek.</em> 4 vols. Kampen: Kok, 1895–1901.
          </p>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(200,200,180,0.62)', lineHeight: 1.75 }}>
            BOLT, John. <em>A Free Church, A Holy Nation: Abraham Kuyper's American Public Theology.</em> Grand Rapids: Eerdmans, 2001.
          </p>
        </motion.div>

        {/* ── Fonte da imagem ── */}
        <p style={{ marginTop: 16, fontSize: 11, color: 'rgba(200,205,255,0.28)', lineHeight: 1.6 }}>
          Retrato: domínio público — <a href="https://commons.wikimedia.org/wiki/File:Herman_Bavinck.jpg" target="_blank" rel="noopener noreferrer" style={{ color: `rgba(${ACCENT_RGB},0.50)`, textDecoration: 'none' }}>Wikimedia Commons</a>
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
