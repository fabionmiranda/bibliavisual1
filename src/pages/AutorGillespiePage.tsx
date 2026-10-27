import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Scale, Layers, Shield, ArrowRight, Zap, Church } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ACCENT     = '#a78bfa';
const ACCENT_RGB = '167,139,250';
const BG         = '#06061a';

const FOTO_URL = 'https://commons.wikimedia.org/wiki/Special:FilePath/George_Gillespie.jpg';

// ─── Notas de rodapé ─────────────────────────────────────────────────────────
const NOTAS: { num: number; ref: string }[] = [
  { num: 1,  ref: 'GILLESPIE, George. <em>A Dispute Against the English Popish Ceremonies.</em> Edimburgo: Robert Bryson, 1637. Reimpr.: Naphtali Press, 1993.' },
  { num: 2,  ref: 'GILLESPIE, George. <em>Aaron\'s Rod Blossoming, or, the Divine Ordinance of Church Government Vindicated.</em> Londres: Robert Bostock, 1646. Reimpr.: Sprinkle Publications, 1985.' },
  { num: 3,  ref: 'GILLESPIE, George. <em>Miscellany Questions.</em> Edimburgo: Gedeon Lithgow, 1649. In: <em>The Works of George Gillespie.</em> 2 vols. Edmonton: Still Waters Revival Books, 1991. v. 2.' },
  { num: 4,  ref: 'YOUNG, John. "George Gillespie and the Scottish Contribution to the Westminster Assembly." In: DUNCAN III, J. Ligon (ed.). <em>The Westminster Confession into the 21st Century.</em> v. 1. Fearn: Mentor, 2003. p. 99–134.' },
  { num: 5,  ref: 'WESTMINSTER ASSEMBLY. <em>The Westminster Confession of Faith.</em> Londres, 1646. Cap. I, art. 6: "O conselho todo de Deus acerca de tudo o que é necessário para a sua própria glória, salvação do homem, fé e vida, está expressamente posto na Escritura, ou pode ser por boa e necessária consequência deduzido dela."' },
  { num: 6,  ref: 'ERASTUS, Thomas. <em>Explicatio Gravissimae Quaestionis.</em> Londres, 1589. Obra que subordinava o poder disciplinar da Igreja ao Estado — o "erastianismo" que Gillespie refutou em <em>Aaron\'s Rod Blossoming.</em>' },
  { num: 7,  ref: 'GILLESPIE, George. <em>A Dispute Against the English Popish Ceremonies.</em> Op. cit. Part I, cap. 1: "Antiquity must be examined, not simply obeyed." [Tradução nossa]' },
  { num: 8,  ref: 'MULLER, Richard A. <em>Post-Reformation Reformed Dogmatics.</em> 4 vols. Grand Rapids: Baker Academic, 2003. v. 2: <em>Holy Scripture,</em> p. 493–494. Muller contextualiza a doutrina da "boa e necessária consequência" na escolástica reformada.' },
  { num: 9,  ref: 'WESTMINSTER ASSEMBLY. <em>The Westminster Confession of Faith.</em> Op. cit. Cap. XX, art. 2: "Deus somente é o Senhor da consciência e deixou-a livre das doutrinas e mandamentos dos homens que sejam contrários à sua Palavra ou além dela." [Tradução nossa]' },
  { num: 10, ref: 'GILLESPIE, George. <em>Miscellany Questions.</em> Op. cit. Quest. XI. Gillespie distingue obstinação (pertinácia) de firmeza na verdade, e ceticismo de humildade epistêmica, afirmando que o Espírito Santo capacita crentes falíveis a alcançar certeza infalível nas verdades essenciais.' },
  { num: 11, ref: 'DONALDSON, Gordon. <em>The Making of the Scottish Prayer Book of 1637.</em> Edinburgh: Edinburgh University Press, 1954. Contextualiza o ambiente político-eclesiástico em que Gillespie escreveu sua primeira grande obra.' },
  { num: 12, ref: 'RICHARD, Guy M. "Samuel Rutherford\'s Supralapsarianism Revealed: A Key to the Lapsarian Controversy in the Westminster Assembly." <em>Scottish Journal of Theology,</em> v. 59, n. 1, p. 27–44, 2006. Contextualiza o debate eclesiológico na Assembleia de Westminster em que Gillespie foi protagonista.' },
];

// ─── Seis eixos ───────────────────────────────────────────────────────────────
const PILARES = [
  {
    num: '01', label: 'Eclesiologia', titulo: 'Cristo, Único Cabeça da Igreja',
    cor: '#a78bfa', corRgb: '167,139,250', icon: Church,
    texto: 'Gillespie parte de um axioma inegociável: <span style="color:#a78bfa;font-weight:700;">Jesus Cristo é o único Cabeça e Rei da Igreja</span><sup style="color:#a78bfa;font-size:0.72em;vertical-align:super;">9</sup> — nem reis, nem bispos, nem concílios possuem soberania sobre a consciência do crente ou sobre o governo da Igreja. Os ministros são <span style="background:rgba(167,139,250,0.14);border-left:3px solid #a78bfa;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(220,215,255,0.95);">embaixadores do Rei</span>, não legisladores: entregam a mensagem do Soberano sem poder criar novas leis ou costumes religiosos. Essa distinção é a espinha dorsal de <span style="color:#fbbf24;font-weight:700;">Aaron\'s Rod Blossoming</span><sup style="color:#a78bfa;font-size:0.72em;vertical-align:super;">2</sup> <em style="color:rgba(200,205,255,0.65);">(1646)</em> — resposta exaustiva ao erastianismo<sup style="color:#a78bfa;font-size:0.72em;vertical-align:super;">6</sup>, que pretendia subordinar o poder eclesiástico ao poder civil. A tese de Gillespie: a Igreja possui poder espiritual <em style="color:#34d399;">distinto e independente</em> do Estado, derivado diretamente de Cristo pela Escritura.',
    destaque: 'Cristo governa sua Igreja — nenhum rei ou concílio pode usurpar esse trono.',
  },
  {
    num: '02', label: 'Culto', titulo: 'Princípio Regulador — Somente o que Deus Ordena',
    cor: '#f59e0b', corRgb: '245,158,11', icon: BookOpen,
    texto: 'O <span style="color:#f59e0b;font-weight:700;">Princípio Regulador do Culto</span><sup style="color:#f59e0b;font-size:0.72em;vertical-align:super;">1</sup> <span style="background:rgba(245,158,11,0.12);border-left:3px solid #f59e0b;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,235,180,0.95);">Regulative Principle of Worship</span> afirma que no culto e governo da Igreja <strong style="color:#fff;">apenas aquilo que Deus expressamente ordena na Palavra</strong> — ou deduzido por <em style="color:#a78bfa;">boa e necessária consequência</em> — é legítimo. Este foi o argumento central de <span style="color:#fbbf24;font-weight:700;">A Dispute Against the English Popish Ceremonies</span><sup style="color:#f59e0b;font-size:0.72em;vertical-align:super;">1</sup> <em style="color:rgba(200,205,255,0.65);">(1637)</em>, escrito quando Gillespie tinha apenas 24 anos<sup style="color:#f59e0b;font-size:0.72em;vertical-align:super;">11</sup>, contra a imposição de ritos anglicanos na Escócia. A <span style="color:#2dd4bf;font-weight:700;">Regra de Ouro sobre o Costume</span> enuncia: <span style="background:rgba(167,139,250,0.12);border:1px solid rgba(167,139,250,0.30);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;">"A antiguidade deve ser examinada, não simplesmente obedecida."</span><sup style="color:#f59e0b;font-size:0.72em;vertical-align:super;">7</sup> O fato de um rito ser antigo não o torna divinamente autorizado.',
    destaque: 'A antiguidade deve ser examinada, não simplesmente obedecida.',
  },
  {
    num: '03', label: 'Epistemologia', titulo: 'Boa e Necessária Consequência',
    cor: '#2dd4bf', corRgb: '45,212,191', icon: Layers,
    texto: 'Formulado nas <span style="color:#a78bfa;font-weight:700;">Miscellany Questions</span><sup style="color:#2dd4bf;font-size:0.72em;vertical-align:super;">3</sup>, o método da <span style="color:#2dd4bf;font-weight:700;">Boa e Necessária Consequência</span> afirma que a Bíblia ensina de duas formas: por <span style="background:rgba(45,212,191,0.12);border-left:3px solid #2dd4bf;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,250,0.95);">declarações diretas e explícitas</span> e por <span style="background:rgba(167,139,250,0.12);border:1px solid rgba(167,139,250,0.30);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;">ilações e deduções lógicas necessárias</span> extraídas das premissas bíblicas. Exemplo paradigmático: a frase <em style="color:#fbbf24;">"Deus é uma essência em três pessoas"</em> não aparece em um único versículo, mas é a <strong style="color:#fff;">conclusão formal e vinculante</strong> deduzida do conjunto das afirmações bíblicas sobre o Pai, o Filho e o Espírito<sup style="color:#2dd4bf;font-size:0.72em;vertical-align:super;">8</sup>. As consequências necessárias são tão autoritativas quanto as declarações explícitas — princípio consagrado pela <span style="color:#f59e0b;font-weight:700;">Confissão de Westminster</span> (I.6)<sup style="color:#2dd4bf;font-size:0.72em;vertical-align:super;">5</sup>.',
    destaque: 'A Trindade não aparece numa frase bíblica — mas é conclusão necessária e vinculante.',
  },
  {
    num: '04', label: 'Confessionalismo', titulo: 'Norma Normans vs. Norma Normata',
    cor: '#fb7185', corRgb: '251,113,133', icon: Scale,
    texto: 'Gillespie distingue com precisão duas ordens de autoridade. A <span style="color:#fb7185;font-weight:700;">Norma Normans</span> <em style="color:rgba(200,205,255,0.65)">(a norma que normatiza)</em> é a <strong style="color:#fff;">Escritura Sagrada</strong> — autoridade suprema, inerrante e juiz final de toda controvérsia<sup style="color:#fb7185;font-size:0.72em;vertical-align:super;">5</sup>. A <span style="color:#f59e0b;font-weight:700;">Norma Normata</span> <em style="color:rgba(200,205,255,0.65)">(a norma normatizada/subordinada)</em> são os credos e confissões — instrumentos humanos indispensáveis de unidade, mas com <span style="background:rgba(251,113,133,0.12);border-left:3px solid #fb7185;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,210,215,0.95);">autoridade estritamente derivada e reformável</span><sup style="color:#fb7185;font-size:0.72em;vertical-align:super;">4</sup>. O princípio <span style="color:#a78bfa;font-weight:700;font-style:italic;">Ecclesia Reformata, Semper Reformanda</span> — a Igreja Reformada sempre se reformando — não é relativismo, mas o reconhecimento de que a Escritura <em>governa e julga</em> continuamente a confissão da Igreja<sup style="color:#fb7185;font-size:0.72em;vertical-align:super;">12</sup>.',
    destaque: 'A Escritura governa a confissão — a confissão não governa a Escritura.',
  },
  {
    num: '05', label: 'Liberdade', titulo: 'Liberdade de Consciência e os Dois Extremos Falsos',
    cor: '#34d399', corRgb: '52,211,153', icon: Shield,
    texto: 'Gillespie rejeita dois erros fatais sobre a unidade da Igreja<sup style="color:#34d399;font-size:0.72em;vertical-align:super;">1</sup>. O primeiro é a <span style="color:#fb7185;font-weight:700;">Coerção Cega / Uniformidade Artificial</span>: impor ritos, tradições e dogmas humanos por meio da força ou coerção, escravizando e aviltando a consciência do crente, exigindo submissão a regras sem fundamento bíblico<sup style="color:#34d399;font-size:0.72em;vertical-align:super;">9</sup>. O segundo é o <span style="color:#f59e0b;font-weight:700;">Relativismo Isolado / Fragmentação</span>: tratar doutrinas como opiniões isoladas, gerando o desigrejismo e a anarquia espiritual. A <span style="color:#34d399;font-weight:700;">solução</span>: a unidade autêntica não nasce da imposição humana, mas da <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,230,0.95);">submissão de toda a Igreja à Palavra de Deus</span>. Um Deus → Uma Verdade → Uma Revelação → Uma Teologia Coerente.',
    destaque: 'Unidade autêntica não nasce da imposição — nasce da submissão à Palavra.',
  },
  {
    num: '06', label: 'Epistemologia', titulo: 'Certeza com Humildade — O Ponto de Equilíbrio',
    cor: '#fbbf24', corRgb: '251,191,36', icon: Zap,
    texto: 'Gillespie ensina como navegar entre dois perigos epistemológicos<sup style="color:#fbbf24;font-size:0.72em;vertical-align:super;">10</sup>. A <span style="color:#fb7185;font-weight:700;">Obstinação / Pertinácia</span> <em style="color:rgba(200,205,255,0.65)">(Tradicionalismo Cego)</em>: teimosia em achar que já sabemos tudo e nada pode ser corrigido, tratando a tradição como infabilidade. O <span style="color:#f59e0b;font-weight:700;">Ceticismo / Leviandade</span> <em style="color:rgba(200,205,255,0.65)">(Relativismo)</em>: crer que por sermos falíveis é impossível ter certeza de qualquer verdade teológica<sup style="color:#fbbf24;font-size:0.72em;vertical-align:super;">10</sup>. O <span style="color:#fbbf24;font-weight:700;">ponto de equilíbrio</span>: pela <span style="background:rgba(167,139,250,0.14);border:1px solid rgba(167,139,250,0.30);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;">iluminação do Espírito Santo operando através da Bíblia</span>, crentes falíveis podem alcançar um <strong style="color:#fff;">conhecimento certo e infalível</strong> de verdades essenciais, mantendo humildade pessoal diante do mistério.',
    destaque: 'Crentes falíveis podem ter certeza — o Espírito ilumina a Escritura.',
  },
];

// ─── Roda dos 6 Eixos (hexágono donut) ──────────────────────────────────────
// cx=250, cy=250, r_outer=185, r_inner=60, cada fatia=60°, início -90° (topo)
const WHEEL_LABELS_G = ['Eclesiologia','Culto','Consequência','Confessional','Liberdade','Certeza'];

const GRAFICO_GILLESPIE: { num: string; path: string; lx: number; ly: number }[] = [
  { num: '01', path: 'M 250 190 L 250 65 A 185 185 0 0 1 410.2 157.5 L 302 220 A 60 60 0 0 0 250 190 Z',     lx: 312.5, ly: 141.8 },
  { num: '02', path: 'M 302 220 L 410.2 157.5 A 185 185 0 0 1 410.2 342.5 L 302 280 A 60 60 0 0 0 302 220 Z', lx: 375,   ly: 250   },
  { num: '03', path: 'M 302 280 L 410.2 342.5 A 185 185 0 0 1 250 435 L 250 310 A 60 60 0 0 0 302 280 Z',     lx: 312.5, ly: 358.3 },
  { num: '04', path: 'M 250 310 L 250 435 A 185 185 0 0 1 89.8 342.5 L 198 280 A 60 60 0 0 0 250 310 Z',      lx: 187.5, ly: 358.3 },
  { num: '05', path: 'M 198 280 L 89.8 342.5 A 185 185 0 0 1 89.8 157.5 L 198 220 A 60 60 0 0 0 198 280 Z',   lx: 125,   ly: 250   },
  { num: '06', path: 'M 198 220 L 89.8 157.5 A 185 185 0 0 1 250 65 L 250 190 A 60 60 0 0 0 198 220 Z',       lx: 187.5, ly: 141.8 },
];

function RodaEixosG() {
  const [hovered, setHovered] = useState(-1);
  const sel = hovered >= 0 ? PILARES[hovered] : null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.30 }}
      style={{ marginBottom: 60 }}>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', maxWidth: 600, filter: `drop-shadow(0 10px 50px rgba(${ACCENT_RGB},0.24))` }}>

          <circle cx="250" cy="250" r="192" fill="none" stroke={`rgba(${ACCENT_RGB},0.06)`} strokeWidth="1" />

          {GRAFICO_GILLESPIE.map((e, i) => {
            const p = PILARES[i];
            const isHov = hovered === i;
            const isDim = hovered >= 0 && !isHov;
            return (
              <g key={e.num} style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(-1)}>
                {isHov && (
                  <path d={e.path} fill={`rgba(${p.corRgb},0.22)`} style={{ filter: 'blur(8px)' }} />
                )}
                <path d={e.path}
                  fill={`rgba(${p.corRgb},${isHov ? 0.38 : isDim ? 0.06 : 0.17})`}
                  stroke={BG} strokeWidth="3.5"
                  style={{ transition: 'fill 0.18s ease' }} />
                <path d={e.path} fill="none"
                  stroke={p.cor}
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
                  style={{ transition: 'all 0.18s ease', userSelect: 'none' }}>{WHEEL_LABELS_G[i]}</text>
              </g>
            );
          })}

          <circle cx="250" cy="250" r="62" fill={BG}
            stroke={sel ? sel.cor : `rgba(${ACCENT_RGB},0.32)`}
            strokeWidth="1.8"
            style={{ transition: 'stroke 0.2s' }} />
          <circle cx="250" cy="250" r="55" fill="none"
            stroke={sel ? `rgba(${sel.corRgb},0.14)` : `rgba(${ACCENT_RGB},0.08)`}
            strokeWidth="8"
            style={{ transition: 'all 0.2s' }} />

          {sel ? (
            <>
              <text x="250" y="240" textAnchor="middle" fontSize="22" fontWeight="900"
                fill={sel.cor} fontFamily="system-ui,sans-serif"
                style={{ userSelect: 'none' }}>{sel.num}</text>
              <text x="250" y="260" textAnchor="middle" fontSize="9.5" fontWeight="800"
                fill={`rgba(${sel.corRgb},0.78)`} fontFamily="system-ui,sans-serif"
                letterSpacing="1.2" style={{ userSelect: 'none' }}>{WHEEL_LABELS_G[PILARES.indexOf(sel)]}</text>
            </>
          ) : (
            <>
              <text x="250" y="244" textAnchor="middle" fontSize="10" fontWeight="900"
                fill={`rgba(${ACCENT_RGB},0.88)`} fontFamily="system-ui,sans-serif"
                letterSpacing="2.5" style={{ userSelect: 'none' }}>GEORGE</text>
              <text x="250" y="261" textAnchor="middle" fontSize="10" fontWeight="900"
                fill={`rgba(${ACCENT_RGB},0.88)`} fontFamily="system-ui,sans-serif"
                letterSpacing="1" style={{ userSelect: 'none' }}>GILLESPIE</text>
            </>
          )}
        </svg>
      </div>

      {/* Painel de detalhe */}
      <div style={{ minHeight: 90, marginBottom: 32 }}>
        {sel ? (
          <div style={{
            borderRadius: 18, padding: '20px 26px',
            background: `rgba(${sel.corRgb},0.09)`,
            border: `1.5px solid rgba(${sel.corRgb},0.30)`,
            display: 'flex', alignItems: 'flex-start', gap: 18,
            transition: 'all 0.18s ease',
          }}>
            <div style={{ flexShrink: 0, width: 52, height: 52, borderRadius: 14, background: `rgba(${sel.corRgb},0.18)`, border: `1.5px solid rgba(${sel.corRgb},0.35)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 22, fontWeight: 900, color: sel.cor }}>{sel.num}</span>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 900, color: sel.cor, letterSpacing: '0.22em', textTransform: 'uppercase' }}>{WHEEL_LABELS_G[PILARES.indexOf(sel)]}</span>
                <span style={{ fontSize: 10, color: 'rgba(200,205,255,0.35)' }}>·</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(210,215,255,0.60)', letterSpacing: '0.10em' }}>{sel.label}</span>
              </div>
              <p style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 900, color: '#fff', lineHeight: 1.25 }}>{sel.titulo}</p>
              <p style={{ margin: 0, fontSize: 13, color: sel.cor, fontStyle: 'italic', fontWeight: 700 }}>"{sel.destaque}"</p>
            </div>
          </div>
        ) : (
          <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(200,205,255,0.35)', fontStyle: 'italic', margin: '16px 0' }}>
            Passe o mouse sobre um eixo para ver os detalhes
          </p>
        )}
      </div>

      {/* Grade resumo */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: 10 }}>
        {PILARES.map((p, i) => {
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
                  <span style={{ fontSize: 11, fontWeight: 900, color: p.cor, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{WHEEL_LABELS_G[i]}</span>
                  <span style={{ fontSize: 9, color: 'rgba(200,205,255,0.28)' }}>·</span>
                  <span style={{ fontSize: 10, color: 'rgba(200,205,255,0.50)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{p.label}</span>
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

const FLUXO_UNIDADE = [
  { label: 'Um Deus',       cor: '#a78bfa' },
  { label: 'Uma Verdade',   cor: '#f59e0b' },
  { label: 'Uma Revelação', cor: '#2dd4bf' },
  { label: 'Uma Teologia',  cor: '#34d399' },
];

export default function AutorGillespiePage() {
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
          <span style={{ color: `rgba(${ACCENT_RGB},0.85)` }}>George Gillespie</span>
        </motion.div>

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative', borderRadius: 32, overflow: 'hidden', marginBottom: 64,
            background: 'linear-gradient(135deg, #0d0520 0%, #06061a 50%, #090418 100%)',
            border: `1.5px solid rgba(${ACCENT_RGB},0.25)`,
          }}
        >
          <div style={{ position: 'absolute', top: -60, right: -40, width: 320, height: 320, borderRadius: '50%', background: ACCENT, filter: 'blur(100px)', opacity: 0.12, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -20, width: 220, height: 220, borderRadius: '50%', background: '#f59e0b', filter: 'blur(80px)', opacity: 0.07, pointerEvents: 'none' }} />

          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 0 }}>
            <div style={{ padding: 'clamp(32px,5vw,56px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                {['Westminster 1643–1648', '1613 – 1648', 'Eclesiologia', 'Liberdade de Consciência'].map(t => (
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
                George Gillespie
              </h1>
              <p style={{ fontSize: 13, fontWeight: 700, color: `rgba(${ACCENT_RGB},0.60)`, margin: '0 0 10px', letterSpacing: '0.10em' }}>
                Georgius Gillespius · Teólogo Presbiteriano Escocês
              </p>
              <p style={{ fontSize: 17, color: `rgba(${ACCENT_RGB},0.85)`, fontWeight: 600, fontStyle: 'italic', margin: '0 0 32px', lineHeight: 1.5 }}>
                Eclesiologia, Arquitetura da Verdade e Liberdade de Consciência
              </p>
              <div style={{ borderLeft: `4px solid ${ACCENT}`, background: `rgba(${ACCENT_RGB},0.08)`, borderRadius: '0 14px 14px 0', padding: '18px 22px' }}>
                <p style={{ margin: 0, fontSize: 'clamp(15px,2.2vw,19px)', fontWeight: 700, color: '#fff', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 10 }}>
                  "A antiguidade deve ser examinada, não simplesmente obedecida."<sup style={{ fontSize: '0.6em', color: `rgba(${ACCENT_RGB},0.75)`, verticalAlign: 'super' }}>7</sup>
                </p>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: `rgba(${ACCENT_RGB},0.72)`, letterSpacing: '0.10em' }}>
                  — A Dispute Against the English Popish Ceremonies, 1637
                </p>
              </div>
            </div>

            <div style={{
              width: 'clamp(180px, 26vw, 280px)', flexShrink: 0, position: 'relative',
              borderLeft: `1px solid rgba(${ACCENT_RGB},0.14)`, overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', background: `linear-gradient(to right, rgba(10,5,32,0.55) 0%, transparent 30%), linear-gradient(to top, rgba(6,6,26,0.70) 0%, transparent 35%)` }} />
              <img
                src={FOTO_URL}
                alt="Retrato de George Gillespie"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', filter: 'sepia(15%) contrast(1.06) brightness(0.92)', minHeight: 320 }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
              />
              <div style={{ position: 'absolute', bottom: 14, left: 0, right: 0, zIndex: 3, textAlign: 'center', padding: '0 12px' }}>
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.75)`, background: 'rgba(0,0,0,0.55)', padding: '4px 10px', borderRadius: 8, backdropFilter: 'blur(4px)' }}>
                  George Gillespie · c. 1640
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Quem Foi Gillespie ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 20 }}>
            Quem Foi Gillespie
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              '<strong style="color:#fff;">George Gillespie</strong> <span style="color:#a78bfa;font-weight:700;">(1613–1648)</span> foi um teólogo presbiteriano escocês e uma das figuras mais brilhantes e combativas da <em style="color:#f59e0b;">Assembleia de Westminster</em><sup style="color:#a78bfa;font-size:0.72em;vertical-align:super;">4</sup> <span style="color:rgba(200,205,255,0.60)">(1643–1648)</span>. Morreu aos 35 anos, mas sua influência sobre a eclesiologia reformada e o governo presbiteriano da Igreja foi desproporcional à brevidade de sua vida.',
              'Sua primeira grande obra, <span style="color:#fbbf24;font-weight:700;">A Dispute Against the English Popish Ceremonies</span><sup style="color:#a78bfa;font-size:0.72em;vertical-align:super;">1</sup> <em style="color:rgba(200,205,255,0.65)">(1637)</em>, foi escrita aos 24 anos como resposta à imposição de ritos anglicanos na Igreja Escocesa<sup style="color:#a78bfa;font-size:0.72em;vertical-align:super;">11</sup>. Nela, Gillespie <span style="background:rgba(167,139,250,0.14);border-left:3px solid #a78bfa;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(220,215,255,0.95);">formulou o Princípio Regulador do Culto</span> com rigor inigualado: no culto, apenas o que Deus ordena na Palavra — explicitamente ou por dedução necessária — é legítimo.',
              'Em <span style="color:#fbbf24;font-weight:700;">Aaron\'s Rod Blossoming</span><sup style="color:#a78bfa;font-size:0.72em;vertical-align:super;">2</sup> <em style="color:rgba(200,205,255,0.65)">(1646)</em> — sua obra mais madura — Gillespie defende que <strong style="color:#fff;">a Igreja possui poder espiritual distinto e independente do Estado</strong>, refutando o erastianismo de Thomas Erastus<sup style="color:#a78bfa;font-size:0.72em;vertical-align:super;">6</sup>. As <span style="color:#2dd4bf;font-weight:700;">Miscellany Questions</span><sup style="color:#a78bfa;font-size:0.72em;vertical-align:super;">3</sup> consolidam seu método epistemológico, incluindo a doutrina da <em style="color:#a78bfa;">boa e necessária consequência</em>, consagrada na Confissão de Westminster I.6<sup style="color:#a78bfa;font-size:0.72em;vertical-align:super;">5</sup>.',
            ].map((p, i) => (
              <p key={i} style={{ margin: 0, fontSize: 'clamp(16px,2.1vw,18px)', color: 'rgba(228,232,255,0.93)', lineHeight: 2.0 }} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </motion.div>

        {/* ── divisor ── */}
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.20), transparent)`, marginBottom: 64 }} />

        {/* ── O Problema da Unidade ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          style={{ marginBottom: 64, borderRadius: 22, background: 'rgba(245,158,11,0.06)', border: '1.5px solid rgba(245,158,11,0.22)', padding: 'clamp(24px,4vw,40px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 180, height: 180, borderRadius: '50%', background: '#f59e0b', filter: 'blur(70px)', opacity: 0.07, pointerEvents: 'none' }} />
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(245,158,11,0.75)', marginBottom: 16, position: 'relative' }}>
            O Problema Central
          </p>
          <h3 style={{ margin: '0 0 18px', fontSize: 'clamp(17px,2.5vw,22px)', fontWeight: 900, color: '#fff', lineHeight: 1.22, position: 'relative' }}>
            Se a verdade de Deus é uma só, por que existem tantas divisões na Igreja?
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }}>
            <p style={{ margin: 0, fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(228,232,255,0.88)', lineHeight: 1.90 }}>
              Gillespie identifica dois erros fatais<sup style={{ color: '#f59e0b', fontSize: '0.72em', verticalAlign: 'super' }}>1</sup>: a <strong style={{ color: '#fb7185' }}>Coerção Cega</strong> — impor uniformidade artificial pela força, escravizando a consciência<sup style={{ color: '#f59e0b', fontSize: '0.72em', verticalAlign: 'super' }}>9</sup> — e o <strong style={{ color: '#f59e0b' }}>Relativismo Isolado</strong> — tratar doutrinas como opiniões subjetivas, gerando anarquia espiritual e desigrejismo.
            </p>
            <p style={{ margin: 0, fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(228,232,255,0.88)', lineHeight: 1.90 }}>
              A solução: a unidade autêntica nasce da <strong style={{ color: '#a78bfa' }}>submissão de toda a Igreja à Palavra de Deus</strong><sup style={{ color: '#f59e0b', fontSize: '0.72em', verticalAlign: 'super' }}>5</sup>. A teologia opera como um organismo vivo — alterar uma doutrina em um nível (como na Doutrina de Deus ou Cristologia) ressoa por todo o sistema, afetando a Soteriologia, o Culto e o Governo da Igreja<sup style={{ color: '#f59e0b', fontSize: '0.72em', verticalAlign: 'super' }}>8</sup>.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginTop: 28 }}>
            {FLUXO_UNIDADE.map((f, i, arr) => (
              <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ padding: '8px 18px', borderRadius: 99, background: `rgba(167,139,250,0.12)`, border: `1.5px solid rgba(167,139,250,0.28)`, fontSize: 11, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: f.cor }}>
                  {f.label}
                </div>
                {i < arr.length - 1 && <ArrowRight size={14} color="rgba(200,205,255,0.25)" />}
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
            Seis Eixos do Pensamento de Gillespie
          </h2>
          <p style={{ margin: '0 auto', maxWidth: 560, fontSize: 16, color: 'rgba(210,215,255,0.72)', lineHeight: 1.85 }}>
            Da eclesiologia presbiteriana ao princípio regulador, da epistemologia teológica à liberdade de consciência.
          </p>
        </motion.div>

        {/* ── Gráfico — Roda dos 6 Eixos ── */}
        <RodaEixosG />

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
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.90 }}
          style={{ marginTop: 64, borderRadius: 24, background: `linear-gradient(135deg, rgba(${ACCENT_RGB},0.10) 0%, rgba(${ACCENT_RGB},0.04) 100%)`, border: `1.5px solid rgba(${ACCENT_RGB},0.28)`, padding: 'clamp(28px,4vw,44px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: ACCENT, filter: 'blur(70px)', opacity: 0.10, pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 18 }}>
              A Visão de Gillespie em Síntese
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
              {[
                { label: 'Cristo Cabeça',    sub: 'da Igreja',      cor: '#a78bfa' },
                { label: 'Princípio',        sub: 'Regulador',      cor: '#f59e0b' },
                { label: 'Consequência',     sub: 'Necessária',     cor: '#2dd4bf' },
                { label: 'Norma Normans',    sub: 'Escritura',      cor: '#fb7185' },
                { label: 'Certeza',          sub: 'com Humildade',  cor: '#34d399' },
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
              "Para Gillespie, a Igreja verdadeira não se governa pela imposição humana nem pelo relativismo subjetivo — ela se governa por Cristo, pela sua Palavra, no poder do Espírito. A liberdade de consciência e a unidade confessional não são opostos: são dois lados da mesma submissão à Escritura como Norma Normans."
            </p>
          </div>
        </motion.div>

        {/* ── Obras Principais ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.96 }}
          style={{ marginTop: 52, borderRadius: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(22px,3.5vw,38px)' }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 16 }}>
            Obras Principais
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { obra: 'A Dispute Against the English Popish Ceremonies', data: '1637', nota: 1, desc: 'Formulação do Princípio Regulador do Culto contra a imposição de ritos anglicanos na Escócia.', cor: '#a78bfa' },
              { obra: "Aaron's Rod Blossoming", data: '1646', nota: 2, desc: 'Defesa do poder espiritual distinto da Igreja contra o erastianismo de Erastus.', cor: '#f59e0b' },
              { obra: 'Miscellany Questions', data: '1649', nota: 3, desc: 'Método epistemológico — doutrina da boa e necessária consequência e confessionalismo reformável.', cor: '#2dd4bf' },
            ].map(o => (
              <div key={o.obra} style={{ borderRadius: 14, padding: '16px 20px', background: `rgba(167,139,250,0.05)`, border: `1px solid rgba(167,139,250,0.14)`, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 10, background: `rgba(167,139,250,0.13)`, border: `1px solid rgba(167,139,250,0.22)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.02 }}>
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.08 }} style={{ marginTop: 48 }}>
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
