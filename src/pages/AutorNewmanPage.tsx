import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Sprout, Layers, Scale, ArrowRight, Shield, Link2, Compass, Anchor, Flame } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ACCENT     = '#f43f5e'; // rose-500 — púrpura cardinalícia
const ACCENT_RGB = '244,63,94';
const BG         = '#06061a';

const FOTO_URL = 'https://commons.wikimedia.org/wiki/Special:FilePath/John_Henry_Newman_by_Sir_John_Everett_Millais,_1st_Bt.jpg';

const SUP = (n: string, cor = ACCENT) => `<sup style="color:${cor};font-size:0.72em;vertical-align:super;">${n}</sup>`;

// ─── Notas de rodapé ─────────────────────────────────────────────────────────
const NOTAS: { num: number; ref: string }[] = [
  { num: 1,  ref: 'NEWMAN, John Henry. <em>An Essay on the Development of Christian Doctrine.</em> Londres: James Toovey, 1845. Ed. rev.: Londres: Basil Montagu Pickering, 1878. Reimpr.: Notre Dame: University of Notre Dame Press, 1989.' },
  { num: 2,  ref: 'NEWMAN, John Henry. <em>Apologia Pro Vita Sua.</em> Londres: Longman, Green, Longman, Roberts and Green, 1864.' },
  { num: 3,  ref: 'NEWMAN, John Henry. <em>An Essay in Aid of a Grammar of Assent.</em> Londres: Burns, Oates, 1870.' },
  { num: 4,  ref: 'NEWMAN, John Henry. <em>Remarks on Certain Passages in the Thirty-Nine Articles</em> (Tract 90). In: <em>Tracts for the Times.</em> Londres: J. G. F. &amp; J. Rivington, 1841.' },
  { num: 5,  ref: 'NEWMAN, John Henry. <em>An Essay on the Development of Christian Doctrine.</em> Op. cit. (ed. 1878), cap. 1, seç. 1, § 7: "In a higher world it is otherwise, but here below to live is to change, and to be perfect is to have changed often." [Tradução nossa]' },
  { num: 6,  ref: 'NEWMAN, John Henry. <em>An Essay on the Development of Christian Doctrine.</em> Op. cit. (ed. 1878), cap. 5: "Genuine Developments Contrasted with Corruptions". Exposição das sete notas do desenvolvimento autêntico.' },
  { num: 7,  ref: 'VICENTE DE LÉRINS. <em>Commonitorium,</em> 23 (434 d.C.): "Sed ita tamen ut vere profectus sit ille fidei, non permutatio" [Mas de tal modo que seja verdadeiro progresso da fé, não mutação]. In: <em>Patrologia Latina,</em> v. 50. [Tradução nossa]' },
  { num: 8,  ref: 'KER, Ian. <em>John Henry Newman: A Biography.</em> Oxford: Oxford University Press, 1988.' },
  { num: 9,  ref: 'CHADWICK, Owen. <em>From Bossuet to Newman: The Idea of Doctrinal Development.</em> Cambridge: Cambridge University Press, 1957.' },
  { num: 10, ref: 'MOZLEY, James Bowling. <em>The Theory of Development: A Criticism of Dr. Newman\'s Essay on the Development of Christian Doctrine.</em> Londres: Rivingtons, 1878.' },
  { num: 11, ref: 'FÓRMULA DE CONCÓRDIA (1577). Epítome, "Da Suma, Regra e Norma". In: <em>Livro de Concórdia: as confissões da Igreja Evangélica Luterana.</em> São Leopoldo: Sinodal; Porto Alegre: Concórdia, 1980. Origem da distinção entre a Escritura como norma e os credos como testemunhos subordinados.' },
  { num: 12, ref: 'ASSEMBLEIA DE WESTMINSTER. <em>Confissão de Fé de Westminster.</em> Londres, 1646. Cap. I, art. 10: o juiz supremo de todas as controvérsias "não pode ser outro senão o Espírito Santo falando na Escritura".' },
  { num: 13, ref: 'MULLER, Richard A. <em>Post-Reformation Reformed Dogmatics.</em> 4 v. Grand Rapids: Baker Academic, 2003. v. 2: <em>Holy Scripture: The Cognitive Foundation of Theology.</em> Sobre Escritura como <em>principium cognoscendi</em> e a autoridade derivada das confissões.' },
];

// ─── As sete notas do desenvolvimento autêntico ──────────────────────────────
const NOTAS_NEWMAN = [
  {
    num: '01', label: 'Preservation of Type', titulo: 'Preservação do Tipo',
    cor: '#f43f5e', corRgb: '244,63,94', icon: Shield,
    texto: `A primeira e mais importante nota${SUP('6', '#f43f5e')}: a <span style="color:#f43f5e;font-weight:700;">estrutura fundamental</span> da doutrina permanece <strong style="color:#fff;">reconhecível</strong> ao longo de toda a transformação conceitual. Newman usa a analogia do corpo: o adulto tem proporções diferentes da criança, mas é a <em style="color:#fda4af;">mesma pessoa</em>. Do mesmo modo, a fé de Niceia não tem a mesma "aparência" da fé dos apóstolos, mas o observador atento reconhece o <span style="background:rgba(244,63,94,0.12);border-left:3px solid #f43f5e;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,215,222,0.95);">mesmo tipo, a mesma fisionomia</span>. Quando o tipo se perde, já não há desenvolvimento — há <span style="color:#fb7185;font-weight:700;">corrupção</span>.`,
    destaque: 'O adulto não se parece com a criança — mas é a mesma pessoa.',
  },
  {
    num: '02', label: 'Continuity of Principles', titulo: 'Continuidade dos Princípios',
    cor: '#fbbf24', corRgb: '251,191,36', icon: Link2,
    texto: `Newman distingue <span style="color:#fbbf24;font-weight:700;">doutrinas</span> de <span style="color:#fbbf24;font-weight:700;">princípios</span>${SUP('6', '#fbbf24')}. As doutrinas se desenvolvem; os princípios que as governam — as <strong style="color:#fff;">premissas básicas</strong> e a <strong style="color:#fff;">ordem teológica</strong> da fé original — <span style="background:rgba(251,191,36,0.12);border-left:3px solid #fbbf24;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,240,180,0.95);">permanecem constantes</span>. Um sistema que abandona seus princípios fundantes, ainda que mantenha o vocabulário antigo, <em style="color:#fda4af;">deixou de ser o que era</em>. Princípios são o "DNA" que garante que a árvore cresça segundo a sua espécie.`,
    destaque: 'As doutrinas crescem; os princípios que as governam permanecem.',
  },
  {
    num: '03', label: 'Power of Assimilation', titulo: 'Poder de Assimilação',
    cor: '#34d399', corRgb: '52,211,153', icon: Sprout,
    texto: `Uma ideia viva <span style="color:#34d399;font-weight:700;">absorve e integra</span> vocabulários, filosofias e idiomas culturais <strong style="color:#fff;">sem ser absorvida por eles</strong>${SUP('6', '#34d399')}. Foi o que aconteceu quando a Igreja tomou termos gregos como <em style="color:#a7f3d0;">ousia</em> e <em style="color:#a7f3d0;">hypostasis</em> para confessar a Trindade: a filosofia foi <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,230,0.95);">posta a serviço da fé, e não a fé a serviço da filosofia</span>. A heresia, ao contrário, é a fé digerida pela cultura — perde sua forma ao entrar em contato com o ambiente.`,
    destaque: 'A fé viva digere a cultura — a heresia é digerida por ela.',
  },
  {
    num: '04', label: 'Logical Sequence', titulo: 'Sequência Lógica',
    cor: '#60a5fa', corRgb: '96,165,250', icon: ArrowRight,
    texto: `As formulações posteriores devem <span style="color:#60a5fa;font-weight:700;">derivar necessariamente</span> das afirmações originais${SUP('6', '#60a5fa')}. Se Cristo é verdadeiramente Deus (Jo 1.1) e verdadeiramente homem (Jo 1.14), então a fórmula de <span style="color:#fbbf24;font-weight:700;">Calcedônia (451)</span> — duas naturezas numa só pessoa — não é invenção, mas <span style="background:rgba(96,165,250,0.12);border-left:3px solid #60a5fa;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(210,230,255,0.95);">conclusão lógica das premissas bíblicas</span>. O desenvolvimento autêntico pode ser "reconstruído" do fim para o começo: cada passo se explica pelo anterior.`,
    destaque: 'Cada passo do desenvolvimento se explica pelo passo anterior.',
  },
  {
    num: '05', label: 'Anticipation of its Future', titulo: 'Antecipação do Futuro',
    cor: '#a78bfa', corRgb: '167,139,250', icon: Compass,
    texto: `Intuições que só seriam <span style="color:#a78bfa;font-weight:700;">explicitadas em concílios posteriores</span> já se encontram <strong style="color:#fff;">germinalmente presentes</strong> na fé primitiva${SUP('6', '#a78bfa')}. A fórmula batismal de <span style="color:#fbbf24;font-weight:700;">Mateus 28.19</span> — um só <em>nome</em> do Pai, do Filho e do Espírito — antecipa o que Niceia e Constantinopla definiriam séculos depois. <span style="background:rgba(167,139,250,0.12);border-left:3px solid #a78bfa;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(225,220,255,0.95);">O desenvolvimento autêntico deixa "pegadas" antecipadas</span>; a corrupção aparece sem antecedentes.`,
    destaque: 'O futuro autêntico já deixa pegadas no passado.',
  },
  {
    num: '06', label: 'Conservative Action', titulo: 'Ação Conservadora sobre o Passado',
    cor: '#2dd4bf', corRgb: '45,212,191', icon: Anchor,
    texto: `Um desenvolvimento genuíno <span style="color:#2dd4bf;font-weight:700;">confirma e protege</span> o que veio antes — nunca o contradiz ou o anula${SUP('6', '#2dd4bf')}. Calcedônia não revogou Niceia; <span style="background:rgba(45,212,191,0.12);border-left:3px solid #2dd4bf;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,250,0.95);">a pressupôs e a guardou</span>. Newman resume: o desenvolvimento verdadeiro é <em style="color:#99f6e4;">"uma adição que ilustra, não que obscurece; que corrobora, não que corrige"</em> o corpo de pensamento de onde procede. Toda "novidade" que exige negar o passado é sinal de corrupção.`,
    destaque: 'O desenvolvimento verdadeiro corrobora o passado — não o corrige.',
  },
  {
    num: '07', label: 'Chronic Vigour', titulo: 'Vigor Crônico',
    cor: '#f97316', corRgb: '249,115,22', icon: Flame,
    texto: `A corrupção é, por natureza, <span style="color:#fb7185;font-weight:700;">transitória</span>: ela leva à dissolução e se esgota. O desenvolvimento autêntico, ao contrário, mostra <span style="color:#f97316;font-weight:700;">vigor duradouro</span> — atravessa séculos sem perder sua força${SUP('6', '#f97316')}. As heresias antigas (arianismo, nestorianismo, gnosticismo) floresceram e murcharam; <span style="background:rgba(249,115,22,0.12);border-left:3px solid #f97316;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,220,190,0.95);">a fé confessada nos credos permaneceu viva por quinze séculos</span>. A longevidade não prova a verdade sozinha — mas a corrupção raramente a possui.`,
    destaque: 'A corrupção se esgota; o desenvolvimento autêntico perdura.',
  },
];

const WHEEL_LABELS = ['Tipo', 'Princípios', 'Assimilação', 'Sequência', 'Antecipação', 'Conservação', 'Vigor'];

// ─── Roda das 7 notas (geometria calculada) ──────────────────────────────────
const CX = 250, CY = 250, R_OUT = 185, R_IN = 60;
const ponto = (r: number, graus: number) => {
  const rad = (graus * Math.PI) / 180;
  return [+(CX + r * Math.cos(rad)).toFixed(1), +(CY + r * Math.sin(rad)).toFixed(1)];
};
const FATIAS = NOTAS_NEWMAN.map((n, i) => {
  const passo = 360 / NOTAS_NEWMAN.length;
  const a0 = -90 + i * passo, a1 = a0 + passo, meio = a0 + passo / 2;
  const [ix0, iy0] = ponto(R_IN, a0), [ox0, oy0] = ponto(R_OUT, a0);
  const [ox1, oy1] = ponto(R_OUT, a1), [ix1, iy1] = ponto(R_IN, a1);
  const [lx, ly] = ponto(124, meio);
  return {
    num: n.num, lx, ly,
    path: `M ${ix0} ${iy0} L ${ox0} ${oy0} A ${R_OUT} ${R_OUT} 0 0 1 ${ox1} ${oy1} L ${ix1} ${iy1} A ${R_IN} ${R_IN} 0 0 0 ${ix0} ${iy0} Z`,
  };
});

// ─── Linha do tempo do problema ──────────────────────────────────────────────
const LINHA_DOUTRINA = [
  { quando: 'Séc. I',      evento: 'Novo Testamento',          cor: '#fbbf24', vocab: '"O Verbo era Deus… e o Verbo se fez carne."', nota: 'A fé em forma de testemunho, narrativa e confissão.' },
  { quando: '325 · 381',   evento: 'Niceia e Constantinopla',  cor: '#34d399', vocab: 'homoousios — "da mesma substância"',             nota: 'Vocabulário trinitário que não aparece literalmente na Bíblia.' },
  { quando: '451',         evento: 'Calcedônia',               cor: '#60a5fa', vocab: '"duas naturezas, sem confusão, sem divisão"',     nota: 'Precisão cristológica ausente da letra dos Evangelhos.' },
  { quando: 'Séc. XVI',    evento: 'Reforma',                  cor: '#a78bfa', vocab: 'justiça imputada · sola fide',                     nota: 'Distinções soteriológicas que levaram séculos de maturação.' },
];

// ─── Componente interativo da roda ───────────────────────────────────────────
function RodaNotas() {
  const [hovered, setHovered] = useState(-1);
  const sel = hovered >= 0 ? NOTAS_NEWMAN[hovered] : null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.30 }}
      style={{ marginBottom: 60 }}>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', maxWidth: 600, filter: `drop-shadow(0 10px 50px rgba(${ACCENT_RGB},0.24))` }}>
          <circle cx="250" cy="250" r="192" fill="none" stroke={`rgba(${ACCENT_RGB},0.06)`} strokeWidth="1" />

          {FATIAS.map((e, i) => {
            const p = NOTAS_NEWMAN[i];
            const isHov = hovered === i;
            const isDim = hovered >= 0 && !isHov;
            return (
              <g key={e.num} style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(-1)}>
                {isHov && <path d={e.path} fill={`rgba(${p.corRgb},0.22)`} style={{ filter: 'blur(8px)' }} />}
                <path d={e.path}
                  fill={`rgba(${p.corRgb},${isHov ? 0.38 : isDim ? 0.06 : 0.17})`}
                  stroke={BG} strokeWidth="3.5"
                  style={{ transition: 'fill 0.18s ease' }} />
                <path d={e.path} fill="none" stroke={p.cor}
                  strokeWidth={isHov ? 2.2 : 1.1}
                  opacity={isHov ? 1 : isDim ? 0.18 : 0.42}
                  style={{ transition: 'all 0.18s ease' }} />
                <text x={e.lx} y={e.ly - 10} textAnchor="middle"
                  fontSize={isHov ? '20' : '17'} fontWeight="900"
                  fill={p.cor} fontFamily="system-ui,sans-serif"
                  opacity={isDim ? 0.28 : 1}
                  style={{ transition: 'all 0.18s ease', userSelect: 'none' }}>{e.num}</text>
                <text x={e.lx} y={e.ly + 11} textAnchor="middle"
                  fontSize={isHov ? '12' : '10.5'} fontWeight={isHov ? '900' : '700'}
                  fill={isHov ? p.cor : `rgba(${p.corRgb},0.80)`} fontFamily="system-ui,sans-serif"
                  opacity={isDim ? 0.25 : 1}
                  style={{ transition: 'all 0.18s ease', userSelect: 'none' }}>{WHEEL_LABELS[i]}</text>
              </g>
            );
          })}

          <circle cx="250" cy="250" r="62" fill={BG}
            stroke={sel ? sel.cor : `rgba(${ACCENT_RGB},0.32)`} strokeWidth="1.8"
            style={{ transition: 'stroke 0.2s' }} />
          <circle cx="250" cy="250" r="55" fill="none"
            stroke={sel ? `rgba(${sel.corRgb},0.14)` : `rgba(${ACCENT_RGB},0.08)`} strokeWidth="8"
            style={{ transition: 'all 0.2s' }} />

          {sel ? (
            <>
              <text x="250" y="240" textAnchor="middle" fontSize="22" fontWeight="900"
                fill={sel.cor} fontFamily="system-ui,sans-serif" style={{ userSelect: 'none' }}>{sel.num}</text>
              <text x="250" y="260" textAnchor="middle" fontSize="9.5" fontWeight="800"
                fill={`rgba(${sel.corRgb},0.78)`} fontFamily="system-ui,sans-serif"
                letterSpacing="1.2" style={{ userSelect: 'none' }}>{WHEEL_LABELS[hovered]}</text>
            </>
          ) : (
            <>
              <text x="250" y="244" textAnchor="middle" fontSize="10" fontWeight="900"
                fill={`rgba(${ACCENT_RGB},0.88)`} fontFamily="system-ui,sans-serif"
                letterSpacing="2.5" style={{ userSelect: 'none' }}>SETE</text>
              <text x="250" y="261" textAnchor="middle" fontSize="10" fontWeight="900"
                fill={`rgba(${ACCENT_RGB},0.88)`} fontFamily="system-ui,sans-serif"
                letterSpacing="1.2" style={{ userSelect: 'none' }}>NOTAS</text>
            </>
          )}
        </svg>
      </div>

      <div style={{ minHeight: 90, marginBottom: 32 }}>
        {sel ? (
          <div style={{
            borderRadius: 18, padding: '20px 26px',
            background: `rgba(${sel.corRgb},0.09)`, border: `1.5px solid rgba(${sel.corRgb},0.30)`,
            display: 'flex', alignItems: 'flex-start', gap: 18, transition: 'all 0.18s ease',
          }}>
            <div style={{ flexShrink: 0, width: 52, height: 52, borderRadius: 14, background: `rgba(${sel.corRgb},0.18)`, border: `1.5px solid rgba(${sel.corRgb},0.35)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 22, fontWeight: 900, color: sel.cor }}>{sel.num}</span>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 900, color: sel.cor, letterSpacing: '0.22em', textTransform: 'uppercase' }}>{WHEEL_LABELS[hovered]}</span>
                <span style={{ fontSize: 10, color: 'rgba(200,205,255,0.35)' }}>·</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(210,215,255,0.60)', letterSpacing: '0.10em', fontStyle: 'italic' }}>{sel.label}</span>
              </div>
              <p style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 900, color: '#fff', lineHeight: 1.25 }}>{sel.titulo}</p>
              <p style={{ margin: 0, fontSize: 13, color: sel.cor, fontStyle: 'italic', fontWeight: 700 }}>"{sel.destaque}"</p>
            </div>
          </div>
        ) : (
          <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(200,205,255,0.35)', fontStyle: 'italic', margin: '16px 0' }}>
            Passe o mouse sobre uma nota para ver os detalhes
          </p>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: 10 }}>
        {NOTAS_NEWMAN.map((p, i) => {
          const isActive = hovered === i;
          return (
            <div key={p.num}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(-1)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 13,
                borderRadius: 13, padding: '13px 16px', cursor: 'pointer',
                background: isActive ? `rgba(${p.corRgb},0.14)` : `rgba(${p.corRgb},0.05)`,
                border: `1.5px solid rgba(${p.corRgb},${isActive ? 0.40 : 0.18})`,
                transform: isActive ? 'translateY(-1px)' : 'none',
                transition: 'all 0.16s ease',
              }}>
              <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 10, background: `rgba(${p.corRgb},${isActive ? 0.28 : 0.14})`, border: `1.5px solid rgba(${p.corRgb},${isActive ? 0.45 : 0.26})`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.16s ease' }}>
                <span style={{ fontSize: 15, fontWeight: 900, color: p.cor }}>{p.num}</span>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 5, marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 900, color: p.cor, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{WHEEL_LABELS[i]}</span>
                  <span style={{ fontSize: 9, color: 'rgba(200,205,255,0.28)' }}>·</span>
                  <span style={{ fontSize: 10, color: 'rgba(200,205,255,0.50)', fontWeight: 700, letterSpacing: '0.06em', fontStyle: 'italic' }}>{p.label}</span>
                </div>
                <p style={{ margin: 0, fontSize: 12.5, color: isActive ? 'rgba(228,232,255,0.92)' : 'rgba(210,215,255,0.72)', lineHeight: 1.55, fontStyle: 'italic', transition: 'color 0.16s' }}>
                  "{p.destaque}"
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function Rotulo({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.70)`, marginBottom: 10, position: 'relative' }}>
      {children}
    </p>
  );
}

export default function AutorNewmanPage() {
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
          <span style={{ color: `rgba(${ACCENT_RGB},0.85)` }}>John Henry Newman</span>
        </motion.div>

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative', borderRadius: 32, overflow: 'hidden', marginBottom: 64,
            background: 'linear-gradient(135deg, #1a0510 0%, #10040a 50%, #080206 100%)',
            border: `1.5px solid rgba(${ACCENT_RGB},0.25)`,
          }}
        >
          <div style={{ position: 'absolute', top: -60, right: -40, width: 320, height: 320, borderRadius: '50%', background: ACCENT, filter: 'blur(100px)', opacity: 0.12, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -20, width: 220, height: 220, borderRadius: '50%', background: '#fbbf24', filter: 'blur(80px)', opacity: 0.07, pointerEvents: 'none' }} />

          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 0 }}>
            <div style={{ padding: 'clamp(32px,5vw,56px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                {['1801 – 1890', 'Ensaio de 1845', 'Desenvolvimento da Doutrina', 'Oxford → Roma'].map(t => (
                  <span key={t} style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: ACCENT, background: `rgba(${ACCENT_RGB},0.12)`, border: `1px solid rgba(${ACCENT_RGB},0.25)`, padding: '5px 14px', borderRadius: 99 }}>
                    {t}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.38em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.58)`, marginBottom: 12 }}>
                Perfil Teológico · Teologia Histórica
              </p>
              <h1 style={{
                fontSize: 'clamp(28px,4.5vw,50px)', fontWeight: 900, lineHeight: 1.06, margin: '0 0 4px',
                background: `linear-gradient(135deg, #fff 30%, rgba(${ACCENT_RGB},0.88) 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                John Henry Newman
              </h1>
              <p style={{ fontSize: 13, fontWeight: 700, color: `rgba(${ACCENT_RGB},0.60)`, margin: '0 0 10px', letterSpacing: '0.10em' }}>
                Do Movimento de Oxford ao Cardinalato
              </p>
              <p style={{ fontSize: 17, color: `rgba(${ACCENT_RGB},0.85)`, fontWeight: 600, fontStyle: 'italic', margin: '0 0 32px', lineHeight: 1.5 }}>
                O Desenvolvimento da Doutrina e o Problema da Identidade
              </p>
              <div style={{ borderLeft: `4px solid ${ACCENT}`, background: `rgba(${ACCENT_RGB},0.08)`, borderRadius: '0 14px 14px 0', padding: '18px 22px' }}>
                <p style={{ margin: 0, fontSize: 'clamp(15px,2.2vw,19px)', fontWeight: 700, color: '#fff', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 10 }}>
                  "Aqui embaixo, viver é mudar, e ser perfeito é ter mudado muitas vezes."<sup style={{ fontSize: '0.6em', color: `rgba(${ACCENT_RGB},0.75)`, verticalAlign: 'super' }}>5</sup>
                </p>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: `rgba(${ACCENT_RGB},0.72)`, letterSpacing: '0.10em' }}>
                  — An Essay on the Development of Christian Doctrine, 1845
                </p>
              </div>
            </div>

            <div style={{ width: 'clamp(180px, 26vw, 280px)', flexShrink: 0, position: 'relative', borderLeft: `1px solid rgba(${ACCENT_RGB},0.14)`, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to right, rgba(26,5,16,0.55) 0%, transparent 30%), linear-gradient(to top, rgba(6,6,26,0.70) 0%, transparent 35%)' }} />
              <img
                src={FOTO_URL}
                alt="Retrato de John Henry Newman por John Everett Millais"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', filter: 'sepia(12%) contrast(1.06) brightness(0.92)', minHeight: 320 }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
              />
              <div style={{ position: 'absolute', bottom: 14, left: 0, right: 0, zIndex: 3, textAlign: 'center', padding: '0 12px' }}>
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.75)`, background: 'rgba(0,0,0,0.55)', padding: '4px 10px', borderRadius: 8, backdropFilter: 'blur(4px)' }}>
                  J. E. Millais · 1881
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Quem Foi Newman ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 20 }}>
            Quem Foi Newman
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              `<strong style="color:#fff;">John Henry Newman</strong> <span style="color:#f43f5e;font-weight:700;">(1801–1890)</span> foi fellow do Oriel College e vigário da igreja universitária de St Mary, em Oxford — o pregador anglicano mais influente de sua geração. Foi um dos líderes do <span style="color:#fbbf24;font-weight:700;">Movimento de Oxford</span>, que a partir de <span style="color:#fbbf24;">1833</span> buscou recuperar a herança patrística e sacramental da Igreja da Inglaterra por meio dos <em style="color:#fda4af;">Tracts for the Times</em>. O polêmico <span style="color:#fbbf24;font-weight:700;">Tract 90</span>${SUP('4')} <span style="color:rgba(200,205,255,0.60)">(1841)</span>, que lia os Trinta e Nove Artigos em chave católica, encerrou sua carreira anglicana.`,
              `Estudando as controvérsias do século IV, Newman passou a ver nos debates de seu tempo um espelho das disputas antigas. Enquanto escrevia o <span style="color:#f43f5e;font-weight:700;">Ensaio sobre o Desenvolvimento da Doutrina Cristã</span>${SUP('1')}, convenceu-se de sua própria tese — e, em <span style="background:rgba(244,63,94,0.14);border:1px solid rgba(244,63,94,0.35);border-radius:5px;padding:1px 8px;color:#fecdd3;font-weight:800;">outubro de 1845</span>, foi recebido na Igreja Católica Romana. O livro foi publicado como estava, inacabado, com uma nota explicando a conversão.`,
              `Depois fundou o Oratório de Birmingham, escreveu a autobiografia espiritual <span style="color:#fbbf24;font-weight:700;">Apologia Pro Vita Sua</span>${SUP('2')} <span style="color:rgba(200,205,255,0.60)">(1864)</span> e a <span style="color:#fbbf24;font-weight:700;">Grammar of Assent</span>${SUP('3')} <span style="color:rgba(200,205,255,0.60)">(1870)</span>, sobre a natureza da certeza religiosa. Foi feito <span style="color:#f43f5e;font-weight:700;">cardeal em 1879</span> e canonizado em 2019${SUP('8')}. Para a teologia protestante, Newman permanece um <span style="background:rgba(251,191,36,0.12);border-left:3px solid #fbbf24;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,240,180,0.95);">interlocutor indispensável</span>: ninguém formulou com mais força a pergunta sobre como a doutrina pode mudar sem deixar de ser a mesma${SUP('9')}.`,
            ].map((p, i) => (
              <p key={i} style={{ margin: 0, fontSize: 'clamp(16px,2.1vw,18px)', color: 'rgba(228,232,255,0.93)', lineHeight: 2.0 }} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </motion.div>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.20), transparent)`, marginBottom: 64 }} />

        {/* ── 1. O Problema Central ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          style={{ marginBottom: 64, borderRadius: 22, background: `rgba(${ACCENT_RGB},0.05)`, border: `1.5px solid rgba(${ACCENT_RGB},0.20)`, padding: 'clamp(24px,4vw,40px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 180, height: 180, borderRadius: '50%', background: ACCENT, filter: 'blur(70px)', opacity: 0.07, pointerEvents: 'none' }} />
          <Rotulo>1 · O Problema Central</Rotulo>
          <h3 style={{ margin: '0 0 8px', fontSize: 'clamp(17px,2.5vw,22px)', fontWeight: 900, color: '#fff', lineHeight: 1.22, position: 'relative' }}>
            Identidade Através do Tempo<sup style={{ fontSize: '0.6em', color: `rgba(${ACCENT_RGB},0.75)`, verticalAlign: 'super', marginLeft: 4 }}>1</sup>
          </h3>
          <p style={{ margin: '0 0 24px', fontSize: 15, color: 'rgba(228,232,255,0.78)', lineHeight: 1.8, position: 'relative' }}>
            A história da Igreja mostra de forma incontestável que as doutrinas passam por um processo progressivo de <strong style={{ color: '#fff' }}>inteligibilidade, explicitação e precisão conceitual</strong>. O vocabulário muda — e muda muito:
          </p>

          {/* linha do tempo */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', marginBottom: 26 }}>
            {LINHA_DOUTRINA.map((l, i) => (
              <motion.div key={l.evento} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.22 + i * 0.06 }}
                style={{ display: 'flex', alignItems: 'stretch', borderRadius: 14, background: `${l.cor}0d`, border: `1.5px solid ${l.cor}33`, overflow: 'hidden' }}>
                <div style={{ width: 92, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 6px', background: `${l.cor}1a`, borderRight: `1px solid ${l.cor}33`, fontSize: 12, fontWeight: 900, color: l.cor, letterSpacing: '0.04em' }}>
                  {l.quando}
                </div>
                <div style={{ flex: 1, minWidth: 0, padding: '12px 16px' }}>
                  <div style={{ fontSize: 15, fontWeight: 900, color: l.cor, marginBottom: 3 }}>{l.evento}</div>
                  <div style={{ fontSize: 14, color: '#fff', fontStyle: 'italic', fontWeight: 600, marginBottom: 4 }}>{l.vocab}</div>
                  <div style={{ fontSize: 13, color: 'rgba(210,215,255,0.65)', lineHeight: 1.55 }}>{l.nota}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* a pergunta */}
          <div style={{ borderRadius: 16, padding: '20px 22px', background: 'rgba(251,191,36,0.07)', border: '1.5px solid rgba(251,191,36,0.28)', position: 'relative', marginBottom: 14 }}>
            <p style={{ margin: '0 0 6px', fontSize: 10, fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(251,191,36,0.75)' }}>A pergunta metodológica de Newman</p>
            <p style={{ margin: 0, fontSize: 'clamp(15px,2.1vw,18px)', fontWeight: 800, color: '#fde68a', lineHeight: 1.6, fontStyle: 'italic' }}>
              Como uma doutrina pode mudar seu vocabulário, suas distinções e suas consequências ao longo do tempo sem deixar de ser a mesma doutrina?
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, position: 'relative' }}>
            <div style={{ borderRadius: 12, background: 'rgba(200,205,255,0.05)', border: '1px solid rgba(200,205,255,0.18)', padding: '12px 14px', fontSize: 13, color: 'rgba(228,232,255,0.80)', lineHeight: 1.6 }}>
              <strong style={{ color: '#c8cdff' }}>Não é a questão.</strong> <em>Se</em> as doutrinas se desenvolvem — a história já o comprova.
            </div>
            <div style={{ borderRadius: 12, background: `rgba(${ACCENT_RGB},0.07)`, border: `1px solid rgba(${ACCENT_RGB},0.25)`, padding: '12px 14px', fontSize: 13, color: 'rgba(228,232,255,0.80)', lineHeight: 1.6 }}>
              <strong style={{ color: ACCENT }}>É a questão.</strong> Que critérios distinguem um <em>desenvolvimento autêntico</em> de uma <em>corrupção dogmática</em>?
            </div>
          </div>
        </motion.div>

        {/* ── 2. Anatomia do Desenvolvimento ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} style={{ marginBottom: 64 }}>
          <Rotulo>2 · Anatomia do Desenvolvimento Legítimo</Rotulo>
          <h3 style={{ margin: '0 0 22px', fontSize: 'clamp(17px,2.5vw,22px)', fontWeight: 900, color: '#fff', lineHeight: 1.22 }}>
            Da Semente ao Carvalho
          </h3>

          {/* semente → árvore */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 14 }}>
            {[
              { icon: Sprout, cor: '#34d399', rgb: '52,211,153', titulo: 'Novidade de expressão', texto: 'Uma formulação posterior pode trazer <strong style="color:#fff;">novo vocabulário, maior precisão técnica, novas distinções e novas consequências lógicas</strong> — sem possuir um <span style="color:#34d399;font-weight:700;">novo objeto de fé</span>.' },
              { icon: Layers, cor: '#fbbf24', rgb: '251,191,36', titulo: 'A semente e a árvore', texto: 'A bolota e o carvalho adulto têm aparências completamente diferentes, mas mantêm <span style="color:#fbbf24;font-weight:700;">continuidade orgânica ininterrupta</span>. A fidelidade doutrinária <strong style="color:#fff;">não exige imobilidade verbal</strong>.' },
            ].map(c => {
              const Icone = c.icon;
              return (
                <div key={c.titulo} style={{ borderRadius: 18, padding: '20px 22px', background: `rgba(${c.rgb},0.06)`, border: `1.5px solid rgba(${c.rgb},0.24)` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: `rgba(${c.rgb},0.16)`, border: `1px solid rgba(${c.rgb},0.30)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icone size={17} color={c.cor} />
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 900, color: c.cor }}>{c.titulo}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 15, color: 'rgba(228,232,255,0.85)', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: c.texto }} />
                </div>
              );
            })}
          </div>

          {/* Vicente de Lérins */}
          <div style={{ borderRadius: 18, padding: 'clamp(20px,3vw,28px)', background: 'rgba(167,139,250,0.06)', border: '1.5px solid rgba(167,139,250,0.26)', marginBottom: 14 }}>
            <p style={{ margin: '0 0 6px', fontSize: 10, fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.80)' }}>A Regra de Vicente de Lérins (434)</p>
            <p style={{ margin: '0 0 8px', fontSize: 'clamp(18px,2.6vw,23px)', fontWeight: 900, color: '#e9d5ff', fontStyle: 'italic' }}>
              profectus fidei, non permutatio<sup style={{ fontSize: '0.55em', color: 'rgba(167,139,250,0.80)', verticalAlign: 'super', marginLeft: 3 }}>7</sup>
            </p>
            <p style={{ margin: 0, fontSize: 15, color: 'rgba(228,232,255,0.80)', lineHeight: 1.75 }}>
              "Progresso da fé, e não transformação da fé em outra coisa." O desenvolvimento legítimo <strong style={{ color: '#fff' }}>explicita</strong> o que já estava implícito na revelação originária.
            </p>
          </div>

          {/* desenvolvimento x corrupção */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            <div style={{ borderRadius: 16, padding: '18px 20px', background: 'rgba(52,211,153,0.06)', border: '1.5px solid rgba(52,211,153,0.28)' }}>
              <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#34d399' }}>✓ Desenvolvimento</p>
              {['Explicita o que estava implícito', 'Preserva a substância da fé', 'Cresce segundo o tipo original', 'Novas palavras, mesmo objeto'].map(t => (
                <p key={t} style={{ margin: '0 0 6px', fontSize: 14, color: 'rgba(228,232,255,0.85)', lineHeight: 1.55 }}>• {t}</p>
              ))}
            </div>
            <div style={{ borderRadius: 16, padding: '18px 20px', background: 'rgba(251,113,133,0.06)', border: '1.5px solid rgba(251,113,133,0.28)' }}>
              <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#fb7185' }}>✗ Corrupção</p>
              {['Introduz o que não estava na origem', 'Altera a substância da fé', 'Destrói o tipo original', 'Palavras antigas, objeto novo'].map(t => (
                <p key={t} style={{ margin: '0 0 6px', fontSize: 14, color: 'rgba(228,232,255,0.85)', lineHeight: 1.55 }}>• {t}</p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── 3. As notas — título ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }} style={{ marginBottom: 40, textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.38em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.60)`, marginBottom: 12 }}>
            3 · Os Critérios do Desenvolvimento Autêntico
          </p>
          <h2 style={{ margin: 0, fontSize: 'clamp(22px,3.5vw,32px)', fontWeight: 900, color: '#fff', lineHeight: 1.18, marginBottom: 14 }}>
            As Sete Notas de Newman<sup style={{ fontSize: '0.5em', color: `rgba(${ACCENT_RGB},0.75)`, verticalAlign: 'super', marginLeft: 4 }}>6</sup>
          </h2>
          <p style={{ margin: '0 auto', maxWidth: 580, fontSize: 16, color: 'rgba(210,215,255,0.72)', lineHeight: 1.85 }}>
            Critérios para distinguir a explicitação orgânica da degeneração herética — como um médico distingue o crescimento saudável de um tumor.
          </p>
        </motion.div>

        <RodaNotas />

        {/* ── Cards das notas ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {NOTAS_NEWMAN.map((p, i) => {
            const IconComp = p.icon;
            return (
              <motion.div key={p.num} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 + i * 0.08 }}
                style={{ borderRadius: 22, border: `1.5px solid rgba(${p.corRgb},0.22)`, background: `rgba(${p.corRgb},0.05)`, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 0, borderBottom: `1px solid rgba(${p.corRgb},0.16)` }}>
                  <div style={{ width: 68, minHeight: 68, background: `rgba(${p.corRgb},0.13)`, borderRight: `1px solid rgba(${p.corRgb},0.18)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, gap: 4, padding: '12px 0' }}>
                    <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: `rgba(${p.corRgb},0.60)` }}>Nota</div>
                    <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1, color: p.cor }}>{p.num}</div>
                  </div>
                  <div style={{ padding: '16px 22px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: `rgba(${p.corRgb},0.16)`, border: `1px solid rgba(${p.corRgb},0.28)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconComp size={14} color={p.cor} strokeWidth={2} />
                      </div>
                      <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: p.cor }}>{p.label}</span>
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

        {/* ── 4. Newman x Reformados ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} style={{ marginTop: 72 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.38em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.60)`, marginBottom: 12 }}>
              4 · Mesma Pergunta, Respostas Diferentes
            </p>
            <h2 style={{ margin: 0, fontSize: 'clamp(22px,3.5vw,32px)', fontWeight: 900, color: '#fff', lineHeight: 1.18 }}>
              Quem Julga o Desenvolvimento?
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 20 }}>
            {/* Newman */}
            <div style={{ borderRadius: 20, padding: 'clamp(22px,3vw,30px)', background: `rgba(${ACCENT_RGB},0.06)`, border: `1.5px solid rgba(${ACCENT_RGB},0.28)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `rgba(${ACCENT_RGB},0.16)`, border: `1px solid rgba(${ACCENT_RGB},0.32)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Scale size={17} color={ACCENT} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT }}>O caminho de Newman</span>
              </div>
              <p style={{ margin: '0 0 12px', fontSize: 15, color: 'rgba(228,232,255,0.88)', lineHeight: 1.85 }}>
                Se o desenvolvimento é real, alguém precisa decidir <strong style={{ color: '#fff' }}>quais consequências estavam legitimamente implícitas</strong> na origem. Newman buscou um <span style={{ color: ACCENT, fontWeight: 700 }}>tribunal histórico infalível</span> para esse julgamento.
              </p>
              <p style={{ margin: 0, fontSize: 15, color: 'rgba(228,232,255,0.88)', lineHeight: 1.85 }}>
                Concluiu que essa autoridade residia no <span style={{ background: `rgba(${ACCENT_RGB},0.14)`, border: `1px solid rgba(${ACCENT_RGB},0.35)`, borderRadius: 5, padding: '1px 7px', color: '#fecdd3', fontWeight: 700 }}>magistério vivo da Igreja Católica Romana</span> — e isso motivou sua conversão.
              </p>
            </div>

            {/* Reformados */}
            <div style={{ borderRadius: 20, padding: 'clamp(22px,3vw,30px)', background: 'rgba(96,165,250,0.06)', border: '1.5px solid rgba(96,165,250,0.28)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(96,165,250,0.16)', border: '1px solid rgba(96,165,250,0.32)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={17} color="#60a5fa" />
                </div>
                <span style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#60a5fa' }}>A resposta reformada</span>
              </div>
              <p style={{ margin: '0 0 12px', fontSize: 15, color: 'rgba(228,232,255,0.88)', lineHeight: 1.85 }}>
                A tradição reformada <strong style={{ color: '#fff' }}>acolhe a gravidade da pergunta</strong> de Newman sobre a historicidade do dogma<sup style={{ fontSize: '0.7em', color: '#60a5fa' }}>10</sup>, mas <span style={{ color: '#60a5fa', fontWeight: 700 }}>rejeita sua solução eclesial</span>.
              </p>
              <p style={{ margin: 0, fontSize: 15, color: 'rgba(228,232,255,0.88)', lineHeight: 1.85 }}>
                O tribunal não é uma instituição histórica, mas <span style={{ background: 'rgba(96,165,250,0.14)', border: '1px solid rgba(96,165,250,0.35)', borderRadius: 5, padding: '1px 7px', color: '#bfdbfe', fontWeight: 700 }}>o Espírito Santo falando na Escritura</span><sup style={{ fontSize: '0.7em', color: '#60a5fa' }}>12</sup>.
              </p>
            </div>
          </div>

          {/* norma normans x normatae */}
          <div style={{ borderRadius: 22, padding: 'clamp(22px,3.5vw,34px)', background: 'rgba(251,191,36,0.05)', border: '1.5px solid rgba(251,191,36,0.24)' }}>
            <p style={{ margin: '0 0 18px', fontSize: 11, fontWeight: 900, letterSpacing: '0.30em', textTransform: 'uppercase', color: 'rgba(251,191,36,0.80)', textAlign: 'center' }}>
              A Hierarquia das Normas<sup style={{ fontSize: '0.8em', marginLeft: 3 }}>11,13</sup>
            </p>
            <div style={{ borderRadius: 16, padding: '18px 20px', background: 'rgba(251,191,36,0.10)', border: '1.5px solid rgba(251,191,36,0.40)', textAlign: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 'clamp(18px,2.6vw,22px)', fontWeight: 900, color: '#fde68a', fontStyle: 'italic' }}>Norma normans</div>
              <div style={{ fontSize: 13, color: 'rgba(255,240,200,0.80)', marginTop: 4 }}>A Sagrada Escritura — "a norma que normatiza e nunca é normatizada"</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0 10px' }}>
              <ArrowRight size={18} color="rgba(251,191,36,0.55)" style={{ transform: 'rotate(90deg)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8, marginBottom: 14 }}>
              {['Credos', 'Concílios', 'Tradições', 'Dogmas'].map(n => (
                <div key={n} style={{ borderRadius: 12, padding: '10px 12px', background: 'rgba(200,205,255,0.05)', border: '1px solid rgba(200,205,255,0.18)', textAlign: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 900, color: '#c8cdff' }}>{n}</div>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(200,205,255,0.50)', marginTop: 2 }}>norma normata</div>
                </div>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: 15, color: 'rgba(228,232,255,0.85)', lineHeight: 1.85, textAlign: 'center' }}>
              Credos e concílios são <strong style={{ color: '#fff' }}>autoridades reais</strong> — porém <span style={{ color: '#c8cdff', fontWeight: 700 }}>derivadas, históricas, falíveis e subordinadas</span>. A Escritura é o <span style={{ color: '#fde68a', fontWeight: 700 }}>juiz supremo</span> que examina, julga e corrige perpetuamente toda tradição e todo desenvolvimento doutrinário.
            </p>
          </div>
        </motion.div>

        {/* ── Síntese ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
          style={{ marginTop: 64, borderRadius: 24, background: `linear-gradient(135deg, rgba(${ACCENT_RGB},0.10) 0%, rgba(${ACCENT_RGB},0.04) 100%)`, border: `1.5px solid rgba(${ACCENT_RGB},0.28)`, padding: 'clamp(28px,4vw,44px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: ACCENT, filter: 'blur(70px)', opacity: 0.10, pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 18 }}>
              Newman em Síntese
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
              {[
                { label: 'Semente',      sub: 'Revelação',        cor: '#34d399' },
                { label: 'Crescimento',  sub: 'Explicitação',     cor: '#fbbf24' },
                { label: 'Sete Notas',   sub: 'Critérios',        cor: '#f43f5e' },
                { label: 'Juiz',         sub: 'Quem decide?',     cor: '#60a5fa' },
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
            <p style={{ margin: '0 auto', maxWidth: 660, fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(228,232,255,0.90)', lineHeight: 1.90, fontStyle: 'italic' }}>
              "Newman fez a pergunta certa: como a fé pode crescer sem se tornar outra coisa? Suas sete notas continuam úteis para qualquer tradição. A divergência está no juiz: para Newman, o magistério romano; para a Reforma, a Escritura — norma normans — diante da qual todo desenvolvimento, inclusive o nosso, permanece sempre sob exame."
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
              { obra: 'Tract 90 (Tracts for the Times)', data: '1841', nota: 4, desc: 'Leitura católica dos Trinta e Nove Artigos anglicanos. A reação encerrou o Movimento de Oxford na sua forma original.', cor: '#fbbf24' },
              { obra: 'An Essay on the Development of Christian Doctrine', data: '1845', nota: 1, desc: 'A obra seminal sobre identidade e mudança na doutrina; as sete notas do desenvolvimento autêntico.', cor: '#f43f5e' },
              { obra: 'Apologia Pro Vita Sua', data: '1864', nota: 2, desc: 'Autobiografia espiritual — a história da sua peregrinação de Oxford a Roma.', cor: '#a78bfa' },
              { obra: 'An Essay in Aid of a Grammar of Assent', data: '1870', nota: 3, desc: 'Epistemologia da fé: como chegamos à certeza religiosa por convergência de probabilidades.', cor: '#34d399' },
            ].map(o => (
              <div key={o.obra} style={{ borderRadius: 14, padding: '16px 20px', background: `rgba(${ACCENT_RGB},0.04)`, border: `1px solid rgba(${ACCENT_RGB},0.12)`, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 10, background: `rgba(${ACCENT_RGB},0.12)`, border: `1px solid rgba(${ACCENT_RGB},0.22)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
