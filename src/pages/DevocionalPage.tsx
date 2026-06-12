import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, Search, X, Moon } from 'lucide-react';
import { toPng } from 'html-to-image';
import Navbar from '../components/Navbar';
import { PLANO_COMPLETO, TOTAL_DIAS, getDayOfYear, type DiaDevocional } from '../data/calendarioDevocional';

// Design tokens
const C = {
  bg:      '#05071a',
  bgCard:  'rgba(255,255,255,0.03)',
  bgCardH: 'rgba(255,255,255,0.06)',
  blue:    'rgba(0,212,255,1)',
  blueD:   'rgba(0,172,210,1)',
  blueL:   'rgba(0,212,255,0.12)',
  blueB:   'rgba(0,212,255,0.30)',
  gold:    'rgba(255,200,80,1)',
  goldL:   'rgba(255,200,80,0.15)',
  goldB:   'rgba(255,200,80,0.40)',
  rose:    'rgba(255,100,130,1)',
  roseL:   'rgba(255,100,130,0.12)',
  white:   'rgba(255,255,255,0.92)',
  muted:   'rgba(255,255,255,0.45)',
  dimmed:  'rgba(255,255,255,0.18)',
  border:  'rgba(255,255,255,0.07)',
  borderH: 'rgba(255,255,255,0.14)',
  atColor: 'rgba(255,180,50,1)',
  ntColor: 'rgba(80,200,255,1)',
};

const diaMap = new Map<number, DiaDevocional>(PLANO_COMPLETO.map(d => [d.dia, d]));

const LIVROS_LIST: string[] = Array.from(
  PLANO_COMPLETO.reduce((acc, d) => { acc.set(d.livro, d.testamento); return acc; }, new Map<string, string>()).keys()
);

const LIVRO_INDEX = new Map<string, DiaDevocional[]>();
for (const livro of LIVROS_LIST) LIVRO_INDEX.set(livro, []);
for (const d of PLANO_COMPLETO) LIVRO_INDEX.get(d.livro)!.push(d);

const LIVRO_TESTAMENTO = new Map<string, 'AT' | 'NT'>(
  PLANO_COMPLETO.map(d => [d.livro, d.testamento])
);

const LIVRO_SLUG: Record<string, string> = {
  'Genesis': 'genesis', 'Exodo': 'exodo', 'Levitico': 'levitico',
  'Numeros': 'numeros', 'Deuteronomio': 'deuteronomio', 'Josue': 'josue',
  'Juizes': 'juizes', 'Rute': 'rute', '1 Samuel': '1-samuel', '2 Samuel': '2-samuel',
  '1 Reis': '1-reis', '2 Reis': '2-reis', '1 Cronicas': '1-cronicas', '2 Cronicas': '2-cronicas',
  'Esdras': 'esdras', 'Neemias': 'neemias', 'Ester': 'ester', 'Jo': 'jo',
  'Salmos': 'salmos', 'Proverbios': 'proverbios', 'Eclesiastes': 'eclesiastes',
  'Cantares': 'cantares', 'Isaias': 'isaias', 'Jeremias': 'jeremias',
  'Lamentacoes': 'lamentacoes', 'Ezequiel': 'ezequiel', 'Daniel': 'daniel',
  'Oseias': 'oseias', 'Joel': 'joel', 'Amos': 'amos', 'Obadias': 'obadias',
  'Jonas': 'jonas', 'Miqueias': 'miqueias', 'Naum': 'naum', 'Habacuque': 'habacuque',
  'Sofonias': 'sofonias', 'Ageu': 'ageu', 'Zacarias': 'zacarias', 'Malaquias': 'malaquias',
  'Mateus': 'mateus', 'Marcos': 'marcos', 'Lucas': 'lucas', 'Joao': 'joao',
  'Atos': 'atos', 'Romanos': 'romanos', '1 Corintios': '1-corintios', '2 Corintios': '2-corintios',
  'Galatas': 'galatas', 'Efesios': 'efesios', 'Filipenses': 'filipenses',
  'Colossenses': 'colossenses', '1 Tessalonicenses': '1-tessalonicenses',
  '2 Tessalonicenses': '2-tessalonicenses', '1 Timoteo': '1-timoteo', '2 Timoteo': '2-timoteo',
  'Tito': 'tito', 'Filemom': 'filemom', 'Hebreus': 'hebreus', 'Tiago': 'tiago',
  '1 Pedro': '1-pedro', '2 Pedro': '2-pedro', '1 Joao': '1-joao', '2 Joao': '2-joao',
  '3 Joao': '3-joao', 'Judas': 'judas', 'Apocalipse': 'apocalipse',
};

// Normaliza nome do livro para lookup no slug map
function slugDeLivro(livro: string): string {
  const normalizado = livro
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ã/g, 'a')
    .replace(/õ/g, 'o');
  return LIVRO_SLUG[normalizado] ?? normalizado.toLowerCase().replace(/\s+/g, '-');
}

function livroPath(livro: string, testamento: 'AT' | 'NT') {
  return `/admin/${testamento}/${slugDeLivro(livro)}`;
}

function extractQuiasmaBloco(text: string, idx: number): string {
  // Matches [N] or [0N] or [00N] — handles zero-padded section numbers
  const markerRe = new RegExp(`^\\[0*${idx}\\]`);
  const anyMarkerRe = /^\[\d/;
  const sepRe = /^={5,}/;

  const lines = text.split(/\r?\n/);
  let blockStart = -1;

  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (markerRe.test(t)) { blockStart = i; break; }
  }
  if (blockStart === -1) return '';

  let blockEnd = lines.length;
  for (let i = blockStart + 1; i < lines.length; i++) {
    const t = lines[i].trim();
    if ((anyMarkerRe.test(t) && !markerRe.test(t)) || sepRe.test(t)) {
      blockEnd = i;
      break;
    }
  }

  return lines.slice(blockStart, blockEnd).join('\n').trim();
}

// ─── Sub-components ───────────────────────────────────────────────

function BadgeTestamento({ t }: { t: 'AT' | 'NT' }) {
  const isAT = t === 'AT';
  return (
    <span style={{
      fontSize: 9, fontWeight: 900, letterSpacing: '0.18em',
      padding: '3px 9px', borderRadius: 100, textTransform: 'uppercase',
      background: isAT ? C.goldL : C.blueL,
      color: isAT ? C.atColor : C.ntColor,
      border: `1px solid ${isAT ? C.goldB : C.blueB}`,
    }}>
      {isAT ? 'A.T.' : 'N.T.'}
    </span>
  );
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function DiaCard({ d, isHoje, onClick, onShare }: {
  d: DiaDevocional; isHoje: boolean;
  onClick: () => void; onShare: (d: DiaDevocional) => void;
}) {
  const [hov, setHov] = useState(false);
  const cor = d.testamento === 'AT' ? C.atColor : C.ntColor;
  return (
    <motion.div
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      initial={{ opacity: 0, y: 8 }}
      animate={isHoje
        ? { opacity: 1, y: 0, boxShadow: [
            `0 0 0 1px ${C.blueB}, 0 4px 24px rgba(0,212,255,0.12)`,
            `0 0 0 2px ${C.blueB}, 0 4px 36px rgba(0,212,255,0.35)`,
            `0 0 0 1px ${C.blueB}, 0 4px 24px rgba(0,212,255,0.12)`,
          ]}
        : { opacity: 1, y: 0 }
      }
      transition={isHoje
        ? { opacity: { duration: 0.3 }, y: { duration: 0.3 },
            boxShadow: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } }
        : { duration: 0.3 }
      }
      style={{
        cursor: 'pointer', display: 'block', width: '100%',
        background: isHoje
          ? 'linear-gradient(135deg,rgba(0,212,255,0.20) 0%,rgba(80,200,255,0.09) 100%)'
          : hov ? C.bgCardH : C.bgCard,
        border: `1px solid ${isHoje ? C.blueB : hov ? C.borderH : C.border}`,
        borderRadius: 14, padding: '14px 16px', textAlign: 'left',
        transition: 'background 0.2s, border-color 0.2s',
        position: 'relative', overflow: 'hidden', boxSizing: 'border-box',
      }}
      onClick={onClick}
    >
      {isHoje && (
        <span style={{
          position: 'absolute', top: 10, right: 38,
          fontSize: 9, fontWeight: 900, letterSpacing: '0.2em',
          color: C.blue, textTransform: 'uppercase',
        }}>
          HOJE
        </span>
      )}
      {/* WhatsApp share button */}
      <button
        onClick={e => { e.stopPropagation(); onShare(d); }}
        title="Compartilhar no WhatsApp"
        style={{
          all: 'unset', position: 'absolute', top: 8, right: 8,
          width: 26, height: 26, borderRadius: 8, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(37,211,102,0.15)',
          border: '1px solid rgba(37,211,102,0.35)',
          color: '#25d366',
          transition: 'background 0.2s, border-color 0.2s',
          flexShrink: 0,
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(37,211,102,0.28)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(37,211,102,0.15)'; }}
      >
        <WhatsAppIcon size={13} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{
          fontSize: 24, fontWeight: 900, color: C.white,
          fontVariantNumeric: 'tabular-nums', lineHeight: 1,
          letterSpacing: '-0.02em',
        }}>
          {String(d.dia).padStart(3, '0')}
        </span>
        <BadgeTestamento t={d.testamento} />
      </div>
      <div style={{ fontWeight: 800, fontSize: 14, color: C.white, marginBottom: 6, lineHeight: 1.3 }}>
        {d.livroAbrev} {d.capitulos}
      </div>
      <div style={{ fontSize: 13, color: cor, lineHeight: 1.45, fontWeight: 600 }}>
        {d.pericope}
      </div>
    </motion.div>
  );
}

// Paleta de cores para niveis do quiasma
const QUIASMA_PALETA = [
  { label: 'rgba(255,200,80,1)',  bg: 'rgba(255,200,80,0.12)',  border: 'rgba(255,200,80,0.45)'  },
  { label: 'rgba(80,200,255,1)',  bg: 'rgba(80,200,255,0.10)',  border: 'rgba(80,200,255,0.40)'  },
  { label: 'rgba(180,120,255,1)', bg: 'rgba(180,120,255,0.10)', border: 'rgba(180,120,255,0.40)' },
  { label: 'rgba(100,220,160,1)', bg: 'rgba(100,220,160,0.10)', border: 'rgba(100,220,160,0.40)' },
  { label: 'rgba(255,140,80,1)',  bg: 'rgba(255,140,80,0.10)',  border: 'rgba(255,140,80,0.40)'  },
  { label: 'rgba(255,100,130,1)', bg: 'rgba(255,100,130,0.10)', border: 'rgba(255,100,130,0.40)' },
  { label: 'rgba(80,220,220,1)',  bg: 'rgba(80,220,220,0.10)',  border: 'rgba(80,220,220,0.40)'  },
];

type QuiasmaStatus = 'loading' | 'ok' | 'sem-arquivo' | 'sem-pericope';

function QuiasmaSection({ d, pericopeIdx }: { d: DiaDevocional; pericopeIdx: number }) {
  const [quiasma, setQuiasma] = useState<string>('');
  const [status, setStatus] = useState<QuiasmaStatus>('loading');
  const isAT = d.testamento === 'AT';
  const cor = isAT ? C.atColor : C.ntColor;
  const corB = isAT ? C.goldB : C.blueB;

  useEffect(() => {
    const path = livroPath(d.livro, d.testamento);
    setStatus('loading');
    fetch(`${path}/quiastico.txt`)
      .then(r => {
        if (!r.ok) { setStatus('sem-arquivo'); return null; }
        return r.text();
      })
      .then(text => {
        if (!text) return;
        const bloco = extractQuiasmaBloco(text, pericopeIdx);
        if (!bloco) { setStatus('sem-pericope'); return; }
        setQuiasma(bloco);
        setStatus('ok');
      })
      .catch(() => setStatus('sem-arquivo'));
  }, [d, pericopeIdx]);

  if (status === 'loading') return null;

  // ── Mensagem quando arquivo ou perícope não existe no admin ──────────
  if (status === 'sem-arquivo' || status === 'sem-pericope') {
    const adminPath = `/admin/${d.testamento.toLowerCase()}/${slugDeLivro(d.livro)}`;
    return (
      <div style={{
        marginTop: 28, borderRadius: 16,
        border: `1px solid ${corB}`,
        background: 'rgba(5,7,26,0.70)',
        padding: 'clamp(14px,4vw,22px)',
        display: 'flex', alignItems: 'flex-start', gap: 14,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: isAT ? 'rgba(255,200,80,0.12)' : 'rgba(80,200,255,0.12)',
          border: `1px solid ${corB}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <BookOpen size={16} color={cor} />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 900, color: cor, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>
            Estrutura Quiástica
          </div>
          <div style={{ fontSize: 'clamp(12px,3vw,14px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 10 }}>
            {status === 'sem-arquivo'
              ? <>O arquivo <span style={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.75)' }}>quiastico.txt</span> ainda não foi inserido no admin para <strong style={{ color: 'rgba(255,255,255,0.85)' }}>{d.livro}</strong>.</>
              : <>A perícope <strong style={{ color: 'rgba(255,255,255,0.85)' }}>{d.pericope}</strong> ainda não possui quiasma cadastrado no admin para <strong style={{ color: 'rgba(255,255,255,0.85)' }}>{d.livro}</strong>.</>
            }
          </div>
          <a
            href={adminPath}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 12, fontWeight: 800, color: cor,
              border: `1px solid ${corB}`, borderRadius: 8,
              padding: '5px 12px', textDecoration: 'none',
              background: isAT ? 'rgba(255,200,80,0.08)' : 'rgba(80,200,255,0.08)',
            }}
          >
            Inserir no Admin →
          </a>
        </div>
      </div>
    );
  }

  if (!quiasma) return null;

  // ── Parse into structured entries ──────────────────────────────────
  type QEntry =
    | { kind: 'title'; text: string }
    | { kind: 'row'; label: string; desc: string; level: number; isCenter: boolean }
    | { kind: 'spacer' };

  const entries: QEntry[] = [];
  const linhas = quiasma.split('\n');

  // First pass: collect unique base letters for level mapping
  const baseLetters: string[] = [];
  for (const l of linhas) {
    const m = l.trim().match(/^([A-Z])'?\d*\s*[\(\-]/);
    if (m) {
      const base = m[1].toUpperCase();
      if (!baseLetters.includes(base)) baseLetters.push(base);
    }
  }
  const maxLevel = baseLetters.length - 1;

  // Second pass: group each label with all its following description lines
  let i = 0;
  while (i < linhas.length) {
    const trimmed = linhas[i].trim();

    if (!trimmed) { entries.push({ kind: 'spacer' }); i++; continue; }

    if (/^\[\d/.test(trimmed)) { entries.push({ kind: 'title', text: trimmed }); i++; continue; }

    const labelMatch = trimmed.match(/^([A-Z])'?\d*\s*[\(\-]/);
    if (labelMatch) {
      const base = labelMatch[1].toUpperCase();
      const level = Math.max(0, baseLetters.indexOf(base));
      const isCenter = level === maxLevel;
      // Collect description lines that follow (non-label, non-empty, non-title)
      const descLines: string[] = [];
      let j = i + 1;
      while (j < linhas.length) {
        const next = linhas[j].trim();
        if (!next) { j++; break; }            // blank line ends description
        if (/^\[\d/.test(next)) break;        // next section title [N]
        if (/^([A-Z])'?\d*\s*[\(\-]/.test(next)) break; // next label
        descLines.push(next);
        j++;
      }
      entries.push({ kind: 'row', label: trimmed, desc: descLines.join(' '), level, isCenter });
      i = j;
      continue;
    }

    i++;
  }

  // ── Render ────────────────────────────────────────────────────────
  // Indent step: smaller so deep nesting still fits on narrow screens
  const STEP = 16; // px per level on desktop; clamped for mobile

  return (
    <div style={{
      marginTop: 28,
      borderRadius: 20,
      overflow: 'hidden',
      border: `1px solid ${corB}`,
      boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
    }}>
      {/* Cabeçalho */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
        borderBottom: `1px solid ${corB}`,
        padding: '14px 22px',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10, flexShrink: 0,
          background: isAT ? 'rgba(255,200,80,0.18)' : 'rgba(80,200,255,0.18)',
          border: `1px solid ${corB}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <BookOpen size={16} color={cor} />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 900, color: cor, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            Estrutura Quiástica Espelhada
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>
            {d.livro} — Perícope {pericopeIdx}
          </div>
        </div>
      </div>

      {/* Corpo */}
      <div dir="ltr" style={{ background: 'rgba(5,7,26,0.85)', padding: 'clamp(12px,3vw,20px) clamp(8px,2.5vw,18px)' }}>
        {entries.map((entry, idx) => {
          if (entry.kind === 'spacer') return <div key={idx} style={{ height: 4 }} />;

          if (entry.kind === 'title') {
            return (
              <div key={idx} style={{
                fontSize: 'clamp(15px,3vw,17px)', fontWeight: 800, color: cor,
                lineHeight: 1.4, marginBottom: 14, marginTop: 4,
              }}>
                {entry.text}
              </div>
            );
          }

          // Row: label badge + description side by side
          const { label, desc, level, isCenter } = entry;
          const pal = QUIASMA_PALETA[level % QUIASMA_PALETA.length];
          // Extract just the letter portion (e.g. "A", "B'", "C") for the badge
          const badgeLetter = label.match(/^([A-Z]'?\d*)/)?.[1] ?? label[0];
          // The reference part: "(1.1–2)" or "— something"
          const refPart = label.slice(badgeLetter.length).trim();

          return (
            <div
              key={idx}
              dir="ltr"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'clamp(5px,1.2vw,9px)',
                marginTop: isCenter ? 14 : (level === 0 ? 12 : 6),
                marginBottom: isCenter ? 14 : 4,
                paddingLeft: `clamp(${level * 4}px, ${level * 1.2}vw, ${level * STEP}px)`,
              }}
            >
              {/* Accent bar */}
              <div style={{
                width: 3, minHeight: 34, borderRadius: 4,
                background: pal.label, flexShrink: 0, marginTop: 3,
              }} />

              {/* Badge — never shrinks */}
              <div style={{
                flexShrink: 0,
                minWidth: 'clamp(28px,5vw,38px)',
                textAlign: 'center',
                background: isCenter ? pal.bg : pal.bg.replace(/[\d.]+\)$/, '0.10)'),
                border: `1px solid ${isCenter ? pal.border : pal.border.replace(/[\d.]+\)$/, '0.35)')}`,
                borderRadius: 7,
                padding: 'clamp(4px,0.8vw,6px) clamp(5px,1vw,9px)',
                fontSize: 'clamp(14px,3vw,17px)',
                fontWeight: 900,
                color: pal.label,
                lineHeight: 1.3,
                boxShadow: isCenter ? `0 0 14px ${pal.bg}` : undefined,
                letterSpacing: '0.04em',
                alignSelf: 'flex-start',
              }}>
                {badgeLetter}
              </div>

              {/* Reference + Description — single inline text block, no internal breaks */}
              <div style={{
                flex: 1,
                minWidth: 0,
                fontSize: 'clamp(15px,3vw,17px)',
                lineHeight: 1.65,
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
              }}>
                {refPart && (
                  <span style={{
                    color: pal.label,
                    opacity: 0.75,
                    fontWeight: 600,
                    fontSize: 'clamp(11px,2.2vw,13px)',
                    marginRight: 6,
                    whiteSpace: 'nowrap',
                  }}>
                    {refPart}
                  </span>
                )}
                <span style={{
                  color: isCenter ? pal.label : 'rgba(255,255,255,0.88)',
                  fontWeight: isCenter ? 700 : 400,
                }}>
                  {/* Split on [...] so Hebrew/Greek inside brackets never line-breaks */}
                  {desc.split(/(\[[^\]]+\])/).map((part, pi) =>
                    part.startsWith('[') && part.endsWith(']')
                      ? (
                        <span key={pi} style={{
                          whiteSpace: 'nowrap',
                          unicodeBidi: 'isolate',
                          direction: 'ltr',
                          fontFamily: '"SBL Hebrew","Ezra SIL","Noto Serif Hebrew","Noto Sans Hebrew","Times New Roman",serif',
                          fontSize: 'clamp(17px,3.5vw,21px)',
                          fontWeight: 600,
                          color: pal.label,
                          letterSpacing: '0.04em',
                          marginLeft: 4,
                        }}>
                          {part}
                        </span>
                      )
                      : part
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function gerarReflexao(d: DiaDevocional): string {
  const ref = `${d.livroAbrev} ${d.capitulos}`;
  const p = d.pericope.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  // ── GÊNESIS ──────────────────────────────────────────────────────────────
  // [1] Seis Dias de Criação e O Sábado
  if (/seis dias de criacao/i.test(p))
    return `A simetria da criação é perfeito: os dias se espelham em pares — luz (dia 1) ↔ astros (dia 4); firmamento (dia 2) ↔ aves e peixes (dia 5); terra seca e plantas (dia 3) ↔ animais e ser humano (dia 6). O centro da estrutura não é um dia de obra — é o sábado do dia 7, o descanso de Deus. Toda a criação foi feita para convergir no repouso com Deus. Na vida da igreja: reunir-se para adorar não interrompe a semana — é o ponto ao redor do qual a semana inteira faz sentido. O culto não é pausa do trabalho; é o centro que dá significado a tudo o mais.`;
  // [2] Jardim no Éden
  if (/jardim no eden/i.test(p))
    return `A simetria do jardim coloca no centro o rio que nasce no Éden e se divide em quatro — imagem de vida que flui para os quatro cantos do mundo. Os elementos externos espelham o caos inicial (terra sem chuva, sem homem) ↔ a proibição terminal ("no dia que dela comeres, morrerás"). Entre a vida que flui e a morte anunciada, Deus coloca o homem no jardim para cultivar e guardar. Na vida da igreja: somos chamados a ser guardiões do que Deus planta — a comunidade, o chamado, a missão. Cultivar é mais do que crescer; é preservar o que Deus confiou, dentro dos limites que ele estabeleceu.`;
  // [3] Criação de Mulher
  if (/criacao de mulher/i.test(p))
    return `A simetria da criação da mulher tem no centro o sono profundo de Adão — o momento em que ele nada pode fazer e Deus age sozinho. Os elementos externos espelham o "não é bom estar só" ↔ "por isso o homem deixa pai e mãe e se une à mulher". No centro, Deus opera na ausência total de esforço humano: constrói da costela o que nenhuma busca produziria. Na vida da igreja: as dádivas mais preciosas — comunidade, vocação, graça — chegam quando paramos de nos completar por conta própria. A complementaridade que Deus constrói não é produto de habilidade relacional; é dom recebido com as mãos abertas.`;
  // [4] Primeiro Pecado e Punição
  if (/primeiro pecado/i.test(p))
    return `A simetria da queda tem no centro exato a pergunta de Deus: "Onde estás?" — não porque ele não saiba, mas porque o pecador precisa responder. Os elementos externos espelham a sedução da serpente ↔ a punição do homem; a mulher come ↔ o homem come. O pivô não é o pecado — é o chamado de Deus ao escondido. Na vida da igreja: o evangelho começa sempre com Deus rompendo o silêncio. O pecado cria escondimento; a graça cria convocação. Cada vez que Deus nos encontra onde estamos — não onde deveríamos estar —, ele repete o padrão do jardim.`;
  // [5] Caim assassina Abel
  if (/caim assassina abel/i.test(p))
    return `A simetria de Caim e Abel coloca no centro a advertência divina antes do crime: "o pecado está à porta, desejando-te; porém tu deves dominá-lo." Os elementos externos espelham as vocações (lavrador e pastor) ↔ os descendentes de Caim (linhagem de violência). O pivô é o aviso ignorado — Deus falou antes. Na vida da igreja: antes de cada grande queda há uma palavra que avisa. A questão não é se Deus falou — é se havia disposição de ouvir antes que a ira se instalasse. Construir cultura de escuta às advertências é um dos maiores serviços que uma comunidade pode prestar.`;
  // [6] De Adão Descendentes a Noé e seu Filhos
  if (/adao descendentes/i.test(p))
    return `A genealogia de Adão a Noé tem estrutura simétrica: dez nomes com o padrão "viveu, gerou e morreu" — exceto Enoque, no centro da lista. Dele se diz apenas: "andou com Deus, e não foi achado, porque Deus o tomou." No centro da lista de morte está um homem que não morreu. Na vida da igreja: no meio da rotina de nascimentos, trabalho e morte, Deus insere exceções — vidas que "andam com Deus" e perturbam a normalidade do ciclo. Enoque é o convite a que cada crente seja a anomalia que não se encaixa no padrão "viveu, trabalhou e morreu" — mas viveu diferente porque andou com Deus.`;
  // [7] Grande Dilúvio
  if (/grande diluvio/i.test(p))
    return `O dilúvio tem uma das estruturas quiásticas mais elaboradas da Bíblia: entrada na arca ↔ saída da arca; águas sobem ↔ águas descem; corrupção da terra ↔ promessa de não tornar a amaldiçoar. No clímax das águas que prevalecem por 150 dias, o pivô de toda a narrativa: "Deus se lembrou de Noé." Não é o poder das águas que muda — é a memória de Deus. Na vida da igreja: o ponto de virada das situações que cobrem tudo não é o que fazemos — é Deus se lembrando de quem está dentro da arca. A arca não é mérito; é graça. E Deus não esquece quem ele abrigou.`;
  // [8] A Aliança com Noé
  if (/alianca com noe/i.test(p))
    return `A aliança com Noé tem estrutura tripartida: a bênção ("sede fecundos") espelha a bênção repetida no final, com a proibição do sangue no centro — "quem derramar sangue humano, pelo homem seu sangue será derramado." O pivô é a sacralidade da vida humana como fundamento de qualquer sociedade. E o fecho é o arco-íris: Deus se compromete com toda criatura. Na vida da igreja: a dignidade de cada vida humana não é princípio moderno — é aliança de Gênesis 9. Antes de qualquer outro valor, a comunidade que honra a Deus honra a vida. O arco após a tempestade não é esperança vaga — é assinatura de Deus.`;
  // [9] Noé e seu Filhos
  if (/noe e seu filhos/i.test(p))
    return `A simetria de Noé e seus filhos coloca no centro o contraste entre dois gestos diante da mesma cena: Cam vê a nudez do pai e conta aos irmãos; Sem e Jafé caminham de costas e cobrem o pai sem olhar. O pivô é o gesto de cobertura — o mesmo fato gera duas reações opostas. Na vida da igreja: há uma ética de cobertura que pertence à comunidade de fé. Expor a fraqueza do irmão para outros é o caminho de Cam. Cobrir com dignidade, sem minimizar a realidade, é o caminho de Sem. Fofoca é o oposto de misericórdia — e a diferença está no que fazemos com o que vemos.`;
  // [10] Nações desceu de Noé
  if (/nacoes desceu/i.test(p))
    return `A tábua dos povos tem estrutura simétrica: as listas de Jafé e Cam espelham a lista central de Sem. No centro de toda a diversidade humana — no meio das setenta nações — está Ninrode: o primeiro herói, fundador de reinos, construtor de cidades. O pivô é ambíguo: o poder humano de organizar e expandir está presente desde Gênesis 10, antes de Babel. Na vida da igreja: a diversidade de povos, línguas e culturas não é acidente — é ordem de Deus. Mas o poder que organiza sem Deus sempre tende a construir Babel. A missão não é apagar culturas; é redimir o que cada povo edificou para que sirva ao Criador.`;
  // [11] Torre de Babel
  if (/torre de babel/i.test(p))
    return `A simetria da torre de Babel é preciso: o plano humano ("façamos tijolos; façamos uma torre") espelha simetricamente o julgamento divino ("confundamos; espalhemo-los"). No centro exato: "O SENHOR desceu para ver." O pivô é a descida de Deus — a grande realeza do céu precisa descer para enxergar o que os homens chamavam de magno. O que construíam para tocar o céu, Deus precisou se abaixar para ver. Na vida da igreja: todo projeto que começa com "façamos um nome para nós" é Babel. Missão verdadeira começa com a iniciativa divina — não com a nossa escada.`;
  // [12] Descendentes de Sem
  if (/descendentes de sem/i.test(p))
    return `A genealogia de Sem a Abrão espelha a de Adão a Noé: dez nomes, padrão rítmico, vidas progressivamente mais curtas. No centro: Seru e Naor, em declínio de longevidade. Mas aqui não há exceção dentro da lista — a exceção virá fora dela, no chamado de Abrão em Gênesis 12. A estrutura estreita o foco: do mundo inteiro para uma família. Na vida da igreja: Deus age na história por meio de reduções deliberadas. Da diversidade de Gênesis 10, ele chega a uma família específica. O chamado individual carrega peso universal — uma pessoa obediente é suficiente para reorientar a história de todos os povos.`;
  // [13] Descendentes de Tera
  if (/descendentes de tera/i.test(p))
    return `A perícope de Tera coloca no centro o estado de Sarai: estéril. Os elementos externos espelham o início da linhagem (Tera gera filhos) ↔ o fim (Tera morre em Harã). No centro da narrativa de transição está o problema que dominará os próximos capítulos: a promessa de descendência para um casal sem filhos. Tera saiu de Ur rumo a Canaã — mas ficou em Harã. Na vida da igreja: há missões que a geração anterior começou mas não concluiu. O que Tera deixou inacabado, Abrão será chamado a completar. A esterilidade no centro da genealogia não é o fim da história — é o setup para o milagre da promessa.`;
  // [14] O Chamado de Abrão
  if (/chamado de abrao/i.test(p))
    return `A simetria do chamado de Abrão espelha as três perdas pedidas ("tua terra, tua parentela, tua casa paterna") ↔ os dois altares erguidos no final da jornada. No centro: a chegada em Canaã e a primeira promessa territorial — "a teus descendentes darei esta terra" — enquanto os cananeus ainda a ocupam. O pivô é que Abrão chega à terra prometida e não a recebe ainda — recebe a palavra. Na vida da igreja: obedecer o chamado de Deus muitas vezes significa chegar a um lugar que ainda não é seu e erguer um altar. A posse não é imediata; a promessa é. O altar marca: "Deus disse que este lugar um dia será da minha descendência."`;
  // [15] Abrão e Sarai em Egito
  if (/abrao e sarai/i.test(p))
    return `A simetria da descida ao Egito coloca no centro o fato mais constrangedor: Abrão é enriquecido pela entrega da esposa — "e ele recebeu ovelhas, bois e jumentos por causa dela." Os elementos externos espelham a fome que provoca a descida ↔ a expulsão pelo faraó. O pivô é a ironia: Deus protege a promessa através de pragas sobre o faraó enquanto o portador da promessa age com medo e engano. Na vida da igreja: a fidelidade de Deus à sua palavra não depende da consistência de quem a carrega. Isso não é licença para o engano — é consolo. Deus cumpre o que prometeu mesmo quando o instrumento falha. O problema de Abrão foi não confiar que Deus tinha um plano A.`;
  // [16] Abrão e Ló se Separam
  if (/lo se separam/i.test(p))
    return `A simetria da separação de Abrão e Ló coloca no centro a escolha de Ló: ele levanta os olhos, vê o vale do Jordão fértil "como o jardim do SENHOR" e escolhe para si. Os elementos externos espelham o conflito entre pastores ↔ a promessa renovada a Abrão após a separação. O pivô é que quem escolheu com os olhos foi para Sodoma; quem cedeu o direito recebeu a promessa. Na vida da igreja: as melhores escolhas raramente são as que fazemos levantando os olhos para o que parece mais próspero. Ceder o direito de escolha ao outro, confiando que Deus provê, é um dos atos de fé mais difíceis — e mais transformadores.`;
  // [17] De Ló Cativeiro
  if (/de lo cativeiro/i.test(p))
    return `A simetria do cativeiro de Ló espelha a força dos quatro reis do Oriente ↔ a derrota dos cinco reis de Sodoma. A escalada da violência culmina com Sodoma derrotada e Ló levado cativo — ele que havia escolhido morar perto de Sodoma acaba sendo arrastado junto com ela. Na vida da igreja: a proximidade com o que Deus vai julgar tem consequências. Ló não era um homem mau — mas havia escolhido vizinhança com o que era. As guerras de outros às vezes nos envolvem não pelo que fizemos, mas por onde decidimos morar. Sabedoria não é isolamento do mundo, mas discernimento sobre onde se instalar.`;
  // [18] Abrão e Melquisedeque
  if (/melquisedeque/i.test(p))
    return `A simetria de Melquisedeque coloca no centro a dupla bênção: Melquisedeque abençoa Abrão em nome do Deus Altíssimo, e Abrão responde com o dízimo de tudo. Os elementos externos espelham o resgate militar ↔ a recusa total do butim de Sodoma. O pivô é a sequência: antes de qualquer recompensa do rei de Sodoma, o sacerdote intercede e o adorador responde com generosidade. Hebreus 7 mostrará que Melquisedeque prefigura Cristo. Na vida da igreja: o crente passa pelo altar antes de passar pelo mercado. Generosidade não é consequência do acúmulo — é resposta à bênção que já foi recebida.`;
  // [19] De Deus Aliança com Abrão
  if (/alianca com abrao/i.test(p))
    return `A simetria da aliança com Abrão tem no centro o versículo mais teologicamente denso de Gênesis: "Abrão creu no SENHOR, e isso lhe foi imputado como justiça." Os elementos externos espelham o problema inicial ("não tenho filhos") ↔ o rito dos animais divididos (onde Deus passa sozinho). O pivô não é um ato de Abrão — é uma fé que Deus contabiliza como justiça. Paulo citará este versículo em Romanos 4. Na vida da igreja: a justificação não é conquista de desempenho — é crédito divino sobre quem crê. A fé de Abrão não produziu mérito; ela recebeu graça. Esse é o centro da simetria — e o centro do evangelho.`;
  // [20] O Nascimento de Ismael
  if (/nascimento de ismael/i.test(p))
    return `A simetria do nascimento de Ismael coloca no centro o encontro inesperado: o Anjo do SENHOR encontra Hagar sozinha no deserto, junto à fonte, e lhe promete multiplicar sua descendência. Os elementos externos espelham a esterilidade de Sarai (que cede Hagar) ↔ o reconhecimento de Hagar ("Tu és o Deus que me vê"). O pivô é radical: Deus vai ao encontro da escrava rejeitada no deserto antes de se revelar a Abrão nessa narrativa. Na vida da igreja: Deus vê quem os outros descartam. Hagar foi expulsa pelas escolhas erradas de outros — mas recebeu uma promessa própria. Cada membro marginalizado tem nome diante de Deus.`;
  // [21] O Sinal da Aliança
  if (/sinal da alianca/i.test(p))
    return `A simetria do sinal da aliança espelha a mudança de nome de Abrão → Abraão ↔ a mudança de nome de Sarai → Sara, com o centro na circuncisão como sinal corporal da aliança. O pivô é que o sinal é dado antes do cumprimento — a circuncisão marca o corpo de quem ainda não tem o filho prometido. Na vida da igreja: os sacramentos (batismo, ceia) têm a mesma lógica — são sinais dados antes e durante, não troféus do que já foi concluído. O batismo não celebra o que o batizado fez; declara o que Deus prometeu. A marca precede o milagre — e isso é graça, não conquista.`;
  // [22] Um Filho prometido a Abraão e Sara
  if (/filho prometido a abraao/i.test(p))
    return `A simetria da visita dos três homens coloca no centro a pergunta: "Onde está Sara, tua mulher?" — antes de renovar a promessa. Os elementos externos espelham a hospitalidade de Abraão ↔ a negação de Sara ("não ri"). O pivô é que Deus pergunta pela mulher antes de prometer o filho — Sara estava escondida na tenda, por trás da hospitalidade do marido, e a pergunta do SENHOR a traz ao centro. Na vida da igreja: o evangelho não é transmitido por representação. Deus pergunta por você pelo nome. Não é suficiente ser casado com alguém que crê — a promessa precisa ser ouvida pessoalmente. O "onde estás?" de Deus é sempre individual.`;
  // [23] Julgamento pronunciado sobre Sodoma
  if (/julgamento pronunciado/i.test(p))
    return `A simetria da intercessão de Abraão tem no centro a pergunta mais audaciosa do Antigo Testamento: "Destruirás o justo com o ímpio?" Os elementos externos espelham a revelação do plano divino ↔ a saída do SENHOR. A estrutura desce em degraus — 50, 45, 40, 30, 20, 10 — cada passo uma nova negociação. O pivô não é a barganha — é que Deus permite que o justo intervenha pelos que estão ao redor. Na vida da igreja: intercessão não é convencer Deus a ser misericordioso — ele já é. É participar da mente de Deus sobre quem está em perigo. A pergunta de Abraão não mudou o caráter de Deus; revelou-o. Orar pelos que estão do lado de fora é padrão desde Gênesis 18.`;
  // [24] A Depravação de Sodoma
  if (/depravacao de sodoma/i.test(p))
    return `A simetria da depravação de Sodoma coloca no centro a ameaça contra Ló: "trataremos mal a ti" — aquele que exercia hospitalidade é transformado em alvo. Os elementos externos espelham a chegada e acolhida dos anjos ↔ a cegueira dos que procuravam a porta. O pivô é a violação da hospitalidade: em Gênesis, acolher o estrangeiro é sagrado; recusá-lo com violência é o sinal máximo de corrupção. Na vida da igreja: a disposição de abrir espaço para quem chega — especialmente o diferente e o inesperado — é termômetro de saúde espiritual. Onde a hospitalidade é substituída por controle e exclusão, algo da imagem de Deus na comunidade apaga.`;
  // [25] Sodoma e Gomorra destruiu
  if (/sodoma e gomorra/i.test(p))
    return `A simetria da destruição de Sodoma espelha a urgência dos anjos ao conduzir Ló para fora ↔ a visão de Abraão olhando a fumaça de longe. No centro: Ló pede para escapar para a pequena Zoar — uma concessão dentro do julgamento, e os anjos aceitam. Mas o pivô mais impactante está fora do centro: a mulher de Ló olha para trás e vira estátua de sal. Jesus citará esse momento em Lucas 17: "Lembrai-vos da mulher de Ló." Na vida da igreja: o maior perigo no momento da libertação não é o julgamento lá atrás — é o apego ao que Deus mandou deixar. Há formas de sair de Sodoma fisicamente e permanecer lá com o coração. A saída real começa por dentro.`;
  // [26] Vergonhoso Origem de Moabe e Amom
  if (/moabe e amom/i.test(p))
    return `A perícope das filhas de Ló tem estrutura paralela: primeira filha age ↔ segunda filha repete. O ponto central implícito é a desconfiança total no futuro — as filhas agem como se não houvesse mais nenhum homem no mundo, ignorando que Zoar estava a poucos quilômetros. Na vida da igreja: as piores decisões costumam ser tomadas quando a pessoa acredita que é a última oportunidade. Fé é a capacidade de esperar por Deus quando tudo parece acabado, em vez de forçar uma solução que cria novos problemas.`;
  // [27] Abraão e Sara em Gerar
  if (/abraao e sara em gerar/i.test(p))
    return `A simetria de Abraão em Gerar espelha a primeira descida ao Egito (Gn 12): o mesmo padrão — mentira sobre Sara, proteção divina, saída com bens. No centro aqui está o sonho de Abimeleque: Deus intervém antes que qualquer mal seja feito. A repetição do erro revela que Abraão ainda opera por medo em certos contextos. Na vida da igreja: crescer na fé não elimina o retorno a padrões antigos de medo. O que muda é que Deus continua intervindo — e a história cada vez mais rápida serve como espelho para reconhecer o padrão.`;
  // [28] O Nascimento de Isaque
  if (/nascimento de isaque/i.test(p))
    return `A simetria do nascimento de Isaque espelha a promessa (Sara terá um filho) ↔ o cumprimento (Sara dá à luz). No centro: "Sara disse: Deus me proporcionou motivo de riso; todo que ouvir rirá comigo." O nome Isaque — "ele ri" — carrega o pivô da narrativa: a risada de incredulidade (Gn 18) foi transformada em risada de alegria. Na vida da igreja: Deus tem o costume de transformar o motivo da nossa dúvida no título do nosso testemunho. O que rimos com descrença, ele faz objeto de celebração.`;
  // [29] Hagar e Ismael enviado para Longe
  if (/ismael enviado/i.test(p))
    return `A simetria da expulsão de Hagar e Ismael espelha a angústia de Abraão ↔ o consolo de Deus a Hagar. No centro: o choro de Ismael no deserto e Deus que o ouve. "Deus ouviu a voz do menino" — o nome Ismael significa exatamente isso. Na vida da igreja: o filho da escrava não era filho da promessa principal, mas também tinha um nome diante de Deus. Nenhuma criança, nenhum marginalizado, nenhum esquecido é invisível para Deus. Ouvir o choro do fraco é imitação do caráter divino.`;
  // [30] A Aliança de Abrão e Abimeleque
  if (/alianca de abrao e abimeleque/i.test(p))
    return `A simetria da aliança em Berseba espelha o conflito pelo poço ↔ a resolução com nome (Berseba = "poço do juramento"). No centro: Abraão planta um tamargueiro e invoca o nome do Senhor, o Deus eterno. Uma disputa de poço torna-se local de adoração. Na vida da igreja: conflitos resolvidos com honestidade e pacto se tornam memoriais da fidelidade de Deus — os problemas não apagados, mas transformados em altares.`;
  // [31] Ordenar a Sacrifício Isaque
  if (/sacrificio isaque/i.test(p))
    return `A simetria de Gênesis 22 é considerado uma das estruturas literárias mais elaboradas da Bíblia. Os elementos se espelham: subida ao monte ↔ descida do monte; "os dois juntos" (antes) ↔ "os dois juntos" (depois); a pergunta de Isaque ↔ a resposta de Abraão. No centro absoluto: a mão de Abraão levantada com a faca — e o anjo que grita: "Não estendas a mão." O pivô é a interrupção divina. Na vida da igreja: Deus não pede obediência para testemunhar a crueldade — ele testa a fé até o limite para então revelar que o provedor já preparou o sacrifício. A cruz de Jesus é onde esse padrão se cumpre definitivamente: não houve anjo para interromper.`;
  // [32] As Crianças de Naor
  if (/criancas de naor/i.test(p))
    return `A genealogia dos filhos de Naor parece apenas uma lista, mas no contexto quiástico de Gênesis funciona como elo estrutural entre o teste de Abraão (Gn 22) e a morte de Sara (Gn 23). O último nome na lista é Rebeca — futura esposa de Isaque. A narrativa da promessa continua: após o maior teste de fé, Deus já está preparando a próxima geração. Na vida da igreja: o que parece lista burocrática muitas vezes carrega o nome da próxima resposta de Deus para a sua história.`;
  // [33] De Sara Morte e Sepultamento
  if (/sara morte e sepultamento/i.test(p))
    return `A simetria da morte de Sara espelha o luto de Abraão ↔ o sepultamento de Sara; a negociação pública com os hititas forma o corpo central da perícope. No centro está a insistência de Abraão em comprar, não receber como presente: "Pelo preço pleno dá-me a cova." O pivô é a recusa da graça do estrangeiro e a escolha do contrato justo. Na vida da igreja: há momentos em que receber favor de quem não participa do propósito de Deus comprometeria a herança. Pagar o preço justo pode ser mais importante do que aceitar o favor barato.`;
  // [34] O Casamento de Isaque e Rebeca
  if (/casamento de isaque e rebeca/i.test(p))
    return `A simetria do casamento de Isaque e Rebeca tem no centro a oração do servo junto ao poço: "Eis que estou aqui junto a esta fonte… seja a moça a quem disseres: bebe — aquela que preparaste para Isaque." Os elementos externos espelham a missão confiada ↔ a missão cumprida; o caminho de ida ↔ o caminho de volta. O pivô é a oração de dependência antes de qualquer ação. Na vida da igreja: toda missão bem-sucedida começa com o servo que para, ora e declara dependência total antes de dar o primeiro passo.`;
  // [35] Abraão se casa Quetura
  if (/quetura/i.test(p))
    return `A perícope de Quetura completa o ciclo de Abraão: mais filhos, mais nações, mas a herança principal passa a Isaque. A estrutura espelha a prolificidade de Abraão ↔ a organização da herança. No centro: "Abraão deu tudo quanto tinha a Isaque." A simetria da vida de Abraão começa com um chamado para deixar tudo e termina com a transmissão de tudo. Na vida da igreja: fidelidade ao chamado de Deus não é apenas o que recebemos — é o que organizamos e transmitimos para a próxima geração com clareza.`;
  // [36] A Morte de Abraão
  if (/morte de abraao/i.test(p))
    return `A simetria da morte de Abraão espelha o início (Gn 12 — chamado e partida) ↔ o final (morte "saciado de anos" em Canaã). No centro da perícope: Isaque e Ismael — os dois filhos, histórias opostas — enterram o pai juntos em Macpela, assim como Esaú e Jacó enterrarão Isaque, e os irmãos de José chorarão sobre ele. A reconciliação em torno da morte é um padrão em Gênesis. Na vida da igreja: há reconciliações que só o luto consegue produzir. A morte do pai reúne quem a vida havia separado — e isso é graça, mesmo no momento da perda.`;
  // [37] De Ismael Descendentes
  if (/de ismael descendentes/i.test(p))
    return `A genealogia de Ismael espelha estruturalmente a de Esaú (Gn 36): doze príncipes, lista completa, encerramento com a morte do patriarca. O texto cumpre a promessa feita a Hagar: Ismael se tornou grande nação. A simetria maior de Gênesis coloca as genealogias das linhas secundárias antes das linhas da promessa — Ismael antes de Isaque, Esaú antes de Jacó. Na vida da igreja: o texto não ignora os que ficaram de fora da linha principal da promessa. Deus é fiel às suas palavras para todas as linhagens — o que nos convida a não tratar como "secundário" quem Deus considera digno de memória.`;
  // [38] O Nascimento e Juventude de Esaú e Jacó
  if (/nascimento e juventude/i.test(p))
    return `A simetria do nascimento dos gêmeos espelha a profecia antes do parto ("o maior servirá ao menor") ↔ o nascimento invertido (Esaú sai primeiro, Jacó segura o calcanhar). No centro está a oração de Rebeca e a resposta de Deus: "Duas nações estão no teu ventre." O pivô não é o nascimento — é a palavra divina antes do nascimento que já determina o desfecho. Na vida da igreja: o propósito de Deus sobre uma vida não depende da ordem de nascimento nem das circunstâncias de chegada. Ele declara antes — e o que ele declara acontece.`;
  // [39] Esaú vende seu Primogenitura
  if (/esau vende/i.test(p))
    return `A simetria da venda da primogenitura espelha Esaú chegando da caça (faminto) ↔ Esaú partindo sem a primogenitura (esvaziado). No centro: o juramento. Jacó exige um juramento antes de dar o pão — e Esaú jura com descaso. O pivô é o momento em que algo sagrado é tratado como descartável. O texto conclui sem condenar Jacó ou absolver Esaú — simplesmente registra: "Esaú desprezou a primogenitura." Na vida da igreja: o que desprezamos no dia de pressão revela o que realmente valorizamos. A primogenitura espiritual — a herança do chamado — não se mantém sem cultivo intencional.`;
  // [40] Isaque e Abimeleque
  if (/isaque e abimeleque/i.test(p))
    return `A simetria de Isaque em Gerar espelha a bênção de Deus (promessa renovada) ↔ a prosperidade de Isaque (colheita centuplicada). No centro: a mentira sobre Rebeca, descoberta por Abimeleque. O texto repete o padrão de Abraão no Egito e em Gerar — o filho imita o erro do pai. Na vida da igreja: padrões familiares de medo se transmitem entre gerações. Reconhecer o padrão herdado é o primeiro passo para não passar adiante o que deveria ter sido quebrado antes.`;
  // [41] Trouble com Poços, Aliança com Deus
  if (/trouble com pocos/i.test(p))
    return `A simetria dos poços de Isaque espelha três disputas (Esek, Sitna, Reobote) ↔ a paz em Berseba. No centro: Deus aparece em Berseba e renova a aliança abraâmica — "Eu sou o Deus de Abraão, teu pai; não temas, porque sou contigo." O pivô é a aparição divina no meio das contendas repetidas. Na vida da igreja: às vezes Deus permite que o conflito se repita várias vezes antes de aparecer e falar. Cada disputa "perdida" pode ser o passo que aproxima do lugar onde Deus vai se revelar.`;
  // [42] Aliança com Abimeleque
  if (/alianca com abimeleque/i.test(p))
    return `A simetria do pacto com Abimeleque espelha o reconhecimento ("vemos que o Senhor está contigo") ↔ a descoberta da água ("seus servos vieram e lhe contaram acerca do poço"). No centro: o banquete e o juramento. O pivô é o reconhecimento público de quem Deus acompanha — o inimigo de ontem pede aliança porque viu a bênção. Na vida da igreja: a prosperidade da comunidade de fé não é para provocar inveja — é testemunho que convida outros a buscar paz com o Deus que abençoa.`;
  // [43] De Esaú Heteu Esposas
  if (/heteu esposas/i.test(p))
    return `Esta brevíssima perícope (dois versículos) funciona estruturalmente como transição e contraste: Isaque em paz com Abimeleque ↔ Esaú em conflito com os pais por causa das esposas. Não há simetria interno elaborado — a brevidade é a mensagem. O texto registra que as escolhas de Esaú "foram motivo de amargura de espírito para Isaque e Rebeca" sem dramatismo. Na vida da igreja: nem todo problema familiar precisa de longa análise. Às vezes o texto bíblico registra o dano de uma escolha em duas linhas — e isso é suficiente para quem tem ouvidos para ouvir.`;
  // [44] Jacó rouba A Bênção
  if (/jaco rouba/i.test(p))
    return `A simetria do roubo da bênção espelha Isaque enviando Esaú caçar ↔ Esaú voltando e descobrindo o que aconteceu. No centro: Jacó diante do pai cego, recebendo a bênção destinada ao primogênito. O pivô não é o engano — é a irrevogabilidade da bênção: "Já o abençoei, e ele será abençoado." A soberania de Deus avança mesmo pelo meio do pecado humano. Na vida da igreja: isso não justifica o engano — mas ensina que o propósito de Deus não é abortado pela falha humana. A promessa é maior do que os meios imperfeitos pelos quais passa.`;
  // [45] Rebeca recomenda Aquele Jacó fugir
  if (/rebeca recomenda/i.test(p))
    return `A simetria da fuga de Jacó espelha o ódio de Esaú (que planeja matar) ↔ o plano de Rebeca (que organiza a saída). No centro: Rebeca diz "por que seria eu privada de vós dois no mesmo dia?" — ela não apenas teme perder Jacó para Esaú, mas Esaú para a vingança que recairia sobre ele. Na vida da igreja: quem ama profundamente a comunidade pensa nas consequências para todos os lados. A sabedoria de Rebeca não é egoísta — ela salva o filho que vai e protege o filho que fica.`;
  // [46] Jacó escapa de Esaú Fúria
  if (/jaco escapa de esau/i.test(p))
    return `A simetria desta perícope espelha a ordem de Isaque para Jacó partir ↔ a reação de Esaú ao ver que o pai aprova casamento endogâmico. No centro: a bênção formal de Isaque sobre Jacó com as palavras da aliança abraâmica — "o Deus Todo-poderoso te abençoe… e te dê a bênção de Abraão." O pivô é a bênção consciente e deliberada — agora não mais roubada, mas proclamada. Na vida da igreja: há momentos em que a crise do passado force a clareza do presente — Isaque agora abençoa intencionalmente o que antes foi tomado pelo engano.`;
  // [47] De Jacó Sonho em Betel
  if (/jaco sonho em betel/i.test(p))
    return `A simetria do sonho de Betel espelha Jacó partindo sozinho e com medo ↔ Jacó fazendo um voto e erguendo um memorial. No centro: a voz de Deus no topo da escada renovando a promessa abraâmica — "estou contigo e te guardarei em todo lugar para onde fores." O pivô é que Deus se revela ao fugitivo antes de qualquer mérito ou arrependimento. Na vida da igreja: Deus não espera que estejamos em paz para se revelar. Às vezes ele aparece exatamente quando dormimos exaustos de fuga — e transforma a pedra de travesseiro em altar.`;
  // [48] Jacó encontra Raquel
  if (/jaco encontra raquel/i.test(p))
    return `A simetria de Jacó no poço espelha o protótipo de Gênesis 24 (servo de Abraão encontra Rebeca na fonte). Aqui: Jacó chega ao poço, encontra Raquel, remove sozinho a pedra e beija Raquel. No centro: "ergueu a voz e chorou." O homem que veio fugindo chora ao encontrar a família. O pivô é que o exilado encontra pertencimento. Na vida da igreja: o acolhimento da família de Deus tem o poder de transformar o fugitivo em alguém que encontrou lar — e esse encontro muitas vezes vem junto com lágrimas.`;
  // [49] Jacó se casa de Labão Filhas
  if (/jaco se casa/i.test(p))
    return `A simetria do casamento de Jacó espelha estruturalmente seu próprio engano: assim como ele enganou o pai cego, Labão engana Jacó na escuridão da noite de bodas. No centro: "Pela manhã, era Lia." O enganador encontra seu espelho — o pivô é o reconhecimento do que é ser enganado. Na vida da igreja: o sofrimento que sentimos pelo engano do outro muitas vezes nos ajuda a entender o dano que causamos quando enganamos. Deus usa as consequências do pecado para formar empatia e arrependimento genuíno.`;
  // [50] Crianças de Jacó
  if (/criancas de jaco/i.test(p))
    return `A simetria dos nascimentos dos filhos de Jacó espelha as duas mães legítimas (Lia e Raquel) ao redor das duas escravas (Zilpa e Bilha). No centro da narrativa está o episódio das mandrágoras — Raquel negocia com Lia pela planta da fertilidade e perde a noite com Jacó para isso. O pivô irônico: a que negocia pela fertilidade ainda não concebeu; a que cedeu a noite concebeu mais dois filhos. Na vida da igreja: tentar controlar o que é dom de Deus por meios humanos frequentemente produz o oposto do desejado. A fertilidade espiritual não se compra — se recebe.`;
  // [51] Jacó prospera em de Labão Custo
  if (/jaco prospera/i.test(p))
    return `A simetria da prosperidade de Jacó espelha a negociação inicial com Labão ↔ o resultado final (Jacó muito rico, Labão empobrecido). No centro: a estratégia das varas descascadas — seja ela milagrosa ou natural, o texto a apresenta como resultado da fidelidade de Deus ao que Jacó serviu. Na vida da igreja: o texto não endossa todas as estratégias de Jacó — mas mostra que Deus é capaz de abençoar mesmo em contextos de competição injusta. A prosperidade legítima vem do trabalho fiel, não da manipulação do sistema.`;
  // [52] Jacó foge com Família e Rebanhos
  if (/jaco foge com familia/i.test(p))
    return `A simetria da fuga de Jacó de Labão espelha a motivação divina (Deus manda voltar) ↔ o problema humano (Raquel rouba os ídolos). No centro: a justificativa de Jacó para suas filhas e filho — "o Deus do meu pai está comigo." A fuga é obediência, mas o texto insere um elemento complicador no centro: ídolos escondidos na bagagem. Na vida da igreja: obediência ao chamado de Deus não significa que a viagem está livre de bagagem escondida. Às vezes é preciso descobrir o que foi trazido sem permissão no meio do caminho.`;
  // [53] Labão alcança Jacó
  if (/labao alcanca/i.test(p))
    return `A simetria de Labão e Jacó em Gileade espelha a perseguição (Labão alcança) ↔ a resolução (pacto e separação). No centro: Labão diz que poderia fazer mal a Jacó, mas Deus o advertiu em sonho. O pivô é a contenção divina do adversário — Deus age nos bastidores, em sonho, para proteger o fugitivo antes de qualquer confronto. Na vida da igreja: nem sempre sabemos quando Deus está contendo o que ameaça nos destruir. O relato de Labão revela que Deus trabalha no campo inimigo com instruções que o outro lado obedece sem entender por quê.`;
  // [54] Labão e Jacó Fazer uma Aliança
  if (/labao e jaco fazer/i.test(p))
    return `A simetria do pacto de Gileade espelha a tensão do confronto ↔ a paz do memorial de pedras. No centro: "O Senhor vigie entre mim e ti quando estivermos ausentes um do outro." O pivô é a invocação de Deus como testemunha de um acordo entre dois homens que desconfiam um do outro. Na vida da igreja: nem toda reconciliação é completa. Às vezes o melhor resultado possível entre dois grupos em conflito é um pacto de não-agressão com Deus como testemunha — e isso já é graça.`;
  // [55] Maanaim
  if (/maanaim/i.test(p))
    return `A simetria de Maanaim espelha o encontro com os anjos (proteção divina) ↔ o envio de mensageiros a Esaú (tensão humana). No centro: Jacó reconhece "este é o acampamento de Deus" e depois imediatamente enfrenta a notícia de que Esaú vem com quatrocentos homens. O pivô é o contraste entre a paz celestial vista e o medo terreno sentido. Na vida da igreja: ver a proteção de Deus e ainda assim ter medo não é falta de fé — é honestidade humana. A fé não elimina o medo; ela o coloca diante de Deus em oração.`;
  // [56] Jacó envia Presentes a Apaziguar Esaú
  if (/jaco envia presentes/i.test(p))
    return `A simetria dos presentes a Esaú espelha o medo de Jacó (divide a família em dois grupos) ↔ a estratégia dos presentes (leva em grupos separados). No centro: a oração de Jacó — "livra-me, rogo-te, da mão de meu irmão Esaú." O pivô é que entre a estratégia humana e a ação humana, há uma oração. Na vida da igreja: planejar com sabedoria e orar com humildade não são contraditórios. O modelo de Jacó é: organize o que pode, ore pelo que não pode controlar.`;
  // [57] Jacó luta em Peniel
  if (/luta em peniel/i.test(p))
    return `A simetria de Peniel tem no centro o toque no quadril de Jacó — o momento em que o ser divino não consegue vencer pelo poder, e então atinge a vulnerabilidade física. Os elementos externos espelham a noite da luta (início) ↔ o amanhecer com o novo nome (final). O pivô é paradoxal: Jacó vence a luta e sai manco. O nome Israel — "luta com Deus e prevaleceu" — é dado a quem coxeia. Na vida da igreja: a marca da luta com Deus é sempre uma vulnerabilidade. Quem saiu transformado de um encontro real com Deus carrega no corpo ou na alma algo que lembra que dependeu Dele para continuar.`;
  // [58] Jacó e Esaú Meet
  if (/esau meet/i.test(p))
    return `A simetria do encontro com Esaú espelha o medo antecipado de Jacó (anos de fuga) ↔ a reconciliação inesperada (Esaú corre, abraça, chora). No centro: Jacó se prostra sete vezes antes de encontrar o irmão — e Esaú corre ao encontro dele. O pivô é a corrida de Esaú: o texto usa o mesmo verbo usado para o pai que corre ao encontro do filho pródigo em Lucas 15. Na vida da igreja: o irmão de quem mais tememos às vezes é quem mais nos aguardava. A reconciliação que parecia impossível muitas vezes está mais próxima do que o medo nos convenceu.`;
  // [59] A Violação de Diná
  if (/violacao de dina/i.test(p))
    return `A simetria da violação de Diná espelha o crime de Siquém (toma Diná) ↔ o crime de Simeão e Levi (matam os homens). No centro: a negociação falsa dos filhos de Jacó — eles concordam com a circuncisão enquanto planejam o massacre. O pivô é o engano que responde ao engano — violência que responde à violência. Jacó ao final diz: "Trouxestes-me a lamentar." Na vida da igreja: a violência da vingança não restaura a honra da vítima — ela multiplica a desonra e isola a comunidade. Justiça e vingança não são a mesma coisa.`;
  // [60] Jacó retorna a Betel
  if (/jaco retorna a betel/i.test(p))
    return `A simetria do retorno a Betel espelha a ordem de Deus ("sobe a Betel") ↔ a obediência de Jacó (sobe e ergue altar). No centro: a purificação — Jacó manda enterrar os ídolos estrangeiros debaixo do carvalho em Siquém. O pivô é a limpeza antes da subida. Na vida da igreja: não dá para subir ao lugar da adoração carregando os ídolos que foram adquiridos no caminho. Renovação espiritual começa com o enterramento do que não pode ir junto.`;
  // [61] A Aliança renovado (Gênesis)
  if (d.livroAbrev === 'Gn' && /alianca renovado/i.test(p))
    return `A simetria da renovação da aliança em Betel espelha a primeira aparição em Betel (Gn 28 — Jacó fugindo) ↔ esta aparição (Jacó retornando transformado). No centro: a mudança de nome confirmada — "teu nome não mais se chamará Jacó, mas Israel." O pivô é a confirmação pública do que foi dado em Peniel. Na vida da igreja: Deus às vezes confirma em público o que já tinha dado em particular — não porque a primeira vez não valeu, mas porque a transformação interna precisa de afirmação externa para ser plenamente recebida.`;
  // [62] Mortes e Nascimento de um Criança
  if (/mortes e nascimento/i.test(p))
    return `A simetria desta perícope espelha a morte de Raquel ↔ a morte de Isaque — duas mortes encerram uma geração. No centro: o nascimento de Benjamim, o décimo segundo filho, entre as duas mortes. O pivô é a vida nova no meio do luto. Na vida da igreja: Deus não pausa a história nos momentos de maior perda. Enquanto enterramos, outros nascem. A continuidade da promessa não espera que o luto termine — ela avança no meio dele.`;
  // [63] De Esaú Descendentes
  if (/de esau descendentes/i.test(p))
    return `A genealogia de Esaú (Edom) espelha estruturalmente a de Ismael: ambas são listas de linhagens "laterais" que recebem atenção completa antes da história principal continuar. O texto registra que Edom teve reis antes de Israel ter qualquer rei. A simetria maior de Gênesis coloca essa lista exatamente antes da história de José — o que parece marginal é lembrado com nome próprio. Na vida da igreja: ninguém é irrelevante para Deus. As genealogias "secundárias" da Bíblia são a afirmação de que cada ramo da história humana tem nome diante do Criador.`;
  // [64] José Sonhos de Grandeza
  if (/jose sonhos de grandeza/i.test(p))
    return `A simetria dos sonhos de José espelha o primeiro sonho (feixes de trigo) ↔ o segundo sonho (sol, lua e estrelas). No centro: a reação — os irmãos o invejam mais, o pai o repreende mas "guardou o assunto no coração." O pivô é o contraste entre quem rejeita e quem guarda. Na vida da igreja: o chamado de Deus sobre uma vida muitas vezes provoca rejeição antes de produzir fruto. Quem guarda no coração o que não entende ainda está mais próximo de Deus do que quem descarta o que incomoda.`;
  // [65] José É vendeu por seu Irmãos
  if (/jose e vendeu/i.test(p))
    return `A simetria da venda de José espelha a chegada de José (túnica colorida, favorito do pai) ↔ a chegada da túnica ensanguentada (pai acredita na morte). No centro: José na cisterna, os irmãos comem pão enquanto ele clama. O pivô é o silêncio em torno do grito — os irmãos ouviram e ignoraram. Na vida da igreja: indiferença ao sofrimento próximo enquanto se "come pão" é uma das formas mais antigas de cumplicidade com o mal. O texto não permite que o leitor se console dizendo que "apenas não agiram" — silenciar o clamor do próximo é participar do crime.`;
  // [66] Judá e Tamar
  if (/juda e tamar/i.test(p))
    return `A simetria de Judá e Tamar espelha a injustiça de Judá (recusa Selá a Tamar) ↔ o reconhecimento de Judá ("ela é mais justa do que eu"). No centro: Tamar com o véu, Judá sem reconhecê-la. O pivô é a ironia: o homem que não cumpriu a lei do levirato é confrontado com seus próprios sinais de identidade. Na vida da igreja: Judá reconhece sua culpa — e este capítulo, estrategicamente inserido entre a venda de José e a história no Egito, mostra que a linha messiânica (Jesus virá de Judá/Perez) passa por uma história de falha e reconhecimento de culpa. A linhagem de Cristo não é de perfeitos.`;
  // [67] José e de Potifar Esposa
  if (/potifar esposa/i.test(p))
    return `A simetria de José e Potifar espelha a ascensão de José na casa (Deus está com ele) ↔ a descida de José para a prisão (Deus está com ele). No centro: a acusação falsa da mulher de Potifar com a túnica na mão. O pivô é que a mesma peça de roupa usada para identificá-lo como filho favorito (Gn 37) agora é usada como evidência falsa — mas Deus está com José nos dois extremos. Na vida da igreja: a peça que outros usam contra você é muitas vezes a mesma que Deus vai usar para revelar Sua fidelidade. A túnica não define o destino — Deus sim.`;
  // [68] José interpreta Sonhos
  if (/jose interpreta sonhos/i.test(p))
    return `A simetria desta perícope é duplo: os sonhos do copeiro e do padeiro espelham-se (um sobe, outro desce); os sonhos do faraó espelham-se (sete vacas gordas/sete magras; sete espigas cheias/sete vazias). No centro de ambos: a interpretação de José — "as interpretações pertencem a Deus." O pivô não é a sabedoria de José, mas sua fonte declarada. Na vida da igreja: quando Deus dá discernimento para interpretar o que outros não conseguem, a resposta correta é apontar para Deus antes de apresentar a resposta. O dom não glorifica o portador — glorifica quem deu.`;
  // [69] Crianças de José
  if (/criancas de jose/i.test(p))
    return `A simetria dos filhos de José espelha os sete anos de fartura (acumulação) ↔ o início dos sete anos de fome (distribuição). No centro: o nascimento de Manassés e Efraim, com nomes que são teologia: "Deus me fez esquecer" e "Deus me fez frutificar." O pivô é a memória curada e a fertilidade no lugar do sofrimento. Na vida da igreja: quando Deus restaura, Ele não apenas repara o dano — Ele faz frutificar na terra da aflição. O lugar do sofrimento se torna o lugar do crescimento, e os nomes dos filhos declaram que Deus estava presente nos dois momentos.`;
  // [70] Primeira Viagem dos Irmãos de José ao Egito
  if (/primeira viagem/i.test(p))
    return `A simetria da primeira viagem dos irmãos espelha a acusação de José ("sois espiões") ↔ a acusação de consciência dos irmãos ("padecemos por causa de nosso irmão"). No centro: José os prende três dias e no terceiro dia diz "fazei isto e vivereis." O pivô é o terceiro dia — o mesmo padrão de morte-espera-vida que ressoa em toda a narrativa bíblica. Na vida da igreja: os momentos de confinamento e espera muitas vezes são a câmara onde a consciência finalmente fala o que havia sido silenciada por anos.`;
  // [71] Segunda Viagem dos Irmãos de José ao Egito
  if (/segunda viagem/i.test(p))
    return `A simetria da segunda viagem espelha a partida com Benjamim (Jacó reluta, Judá garante) ↔ a revelação de José (José chora, os irmãos ficam sem fala). No centro: o discurso de Judá diante de José — "pois como voltarei ao meu pai se o menino não estiver comigo?" O pivô é Judá oferecendo-se como substituto por Benjamim — o mesmo Judá que propôs vender José agora se oferece como escravo no lugar do irmão. Na vida da igreja: arrependimento genuíno não é apenas sentir culpa — é agir diferente quando a mesma situação se repete. Judá passa no teste que antes reprovou.`;
  // [72] Jacó traz seu Todo Família a Egito
  if (/jaco traz.*familia/i.test(p))
    return `A simetria da descida de Jacó ao Egito espelha o chamado de Deus a Abrão para sair de sua terra ↔ o chamado de Deus a Jacó para descer ao Egito. Em Berseba — o mesmo lugar onde Isaque e Abraão encontraram Deus — Deus fala: "não temas descer ao Egito." No centro: a visão noturna e a promessa de que Deus subirá com ele de lá. O pivô é a presença que acompanha na descida e promete a subida. Na vida da igreja: Deus não só envia às terras estranhas — Ele vai junto e traz de volta. A promessa do retorno é parte do chamado à ida.`;
  // [73] Lista de de Jacó Família
  if (/lista de de jaco/i.test(p))
    return `A lista dos setenta membros da família de Jacó que descem ao Egito espelha estruturalmente a tábua dos povos de Gênesis 10 — setenta nações saíram de Noé; setenta pessoas entram no Egito. A simetria maior de Gênesis aponta: de onde vieram setenta nações, de setenta pessoas virá o povo de Deus. No centro da lista está a preservação do nome de cada pessoa — cada um foi contado. Na vida da igreja: a contagem importa. Cada pessoa que entra na história da comunidade de fé tem nome, não apenas número — e a fidelidade de Deus inclui memória de cada um.`;
  // [74] Jacó e Faraó
  if (/jaco e farao/i.test(p))
    return `A simetria do encontro de Jacó com o faraó coloca no centro a bênção de Jacó sobre o faraó — e Jacó abençoa duas vezes (ao chegar e ao sair). Os elementos externos espelham José apresentando a família ↔ José assentando a família em Gósen. O pivô é surpreendente: o ancião nômade, pastoreiro, abençoa o rei do mundo. Na vida da igreja: a posição social não determina quem tem autoridade de bênção. Quem carrega a promessa de Deus tem algo a oferecer ao mais poderoso da terra — e esse algo não é riqueza, mas bênção.`;
  // [75] A Fome em Egito
  if (/fome em egito/i.test(p))
    return `A simetria da administração da fome por José espelha a progressão da crise (dinheiro → rebanhos → terras → pessoas) ↔ a redistribuição após a crise (terra devolvida em troca de 20%). No centro: o povo diz "salvaste nossas vidas." O pivô é o reconhecimento público. Na vida da igreja: o texto não idealiza o sistema de José — centralizar poder no faraó tem consequências que serão sentidas no Êxodo. A sabedoria de servir bem dentro de um sistema imperfeito não absolve o sistema imperfeito. A consciência política faz parte da sabedoria bíblica.`;
  // [76] Últimos Dias de Jacó
  if (/ultimos dias de jaco/i.test(p))
    return `A simetria dos últimos dias de Jacó espelha a promessa de José (não te enterrarei no Egito) ↔ o gesto de Jacó (se inclina sobre a cabeceira da cama). No centro: o juramento solene exigido por Jacó — "põe a tua mão debaixo da minha coxa." O pivô é a confiança do ancião que morre: ele não controla o futuro, mas confia o futuro à palavra de quem ficará. Na vida da igreja: envelhecer com fé é aprender a depositar o que não podemos mais segurar nas mãos de quem Deus posicionou para continuar. Esse desprendimento é um ato de adoração.`;
  // [77] Jacó abençoa de José Filhos
  if (/jaco abencoa de jose/i.test(p))
    return `A simetria da bênção de Efraim e Manassés espelha José apresentando os filhos na ordem correta ↔ Jacó cruzando as mãos deliberadamente para inverter a ordem. No centro: "Eu sei, meu filho, eu sei — ele também se tornará um povo; mas seu irmão menor será maior do que ele." O pivô é a soberania de Deus sobre a primogenitura expressa pelo velho que "vê" com os olhos do Espírito o que não enxerga mais com os olhos do corpo. Na vida da igreja: as inversões de ordem que Deus faz não são erros — são padrão. O menor, o mais novo, o menos provável recebe a maior bênção em Gênesis repetidas vezes. Isso é graça, não meritocracia.`;
  // [78] De Jacó Últimas Palavras a seu Filhos
  if (/jaco ultimas palavras/i.test(p))
    return `A simetria das últimas palavras de Jacó espelha as tribos do norte ao sul, com a bênção de Judá no centro da lista — a mais longa e messiânica: "O cetro não se apartará de Judá, nem o bastão de entre seus pés, até que venha Siló, e a ele obedecerão os povos." Na vida da igreja: o centro da bênção profética de Jacó aponta para o Messias que virá de Judá. Cada tribo tem sua palavra, mas a bênção central carrega a promessa que sustenta todas as outras. Jesus é o Siló — o de quem a autoridade definitiva pertence.`;
  // [79] De Jacó Morte e Sepultamento
  if (/jaco morte e sepultamento/i.test(p))
    return `Jacó morre com 147 anos, reunindo os pés na cama após as últimas instruções. José chora sobre ele. O corpo é embalsamado pelos médicos egípcios. Um grande cortejo sobe a Canaã; patriarcas, servos do faraó e anciãos de Israel enterram Jacó na caverna de Macpela, junto a Abraão e Sara.`;
  // [80] José perdoa seu Irmãos
  if (/jose perdoa/i.test(p))
    return `Após a morte de Jacó, os irmãos temem a vingança de José. Enviam uma mensagem alegando que o pai pediu perdão para eles. José chora ao ouvir. Eles se prostram diante dele. José responde com as palavras mais profundas de Gênesis: "Vocês planejaram o mal contra mim, mas Deus planejou para o bem."`;
  // [81] De José Últimos Dias e Morte
  if (/de jose ultimos dias/i.test(p))
    return `José vive 110 anos, vê três gerações de filhos de Efraim e os filhos de Maquir. Antes de morrer, faz os irmãos jurarem: "Deus certamente cuidará de vocês — levem meus ossos daqui." José morre e é embalsamado no Egito. Os ossos aguardarão o Êxodo — a promessa ainda não acabou.`;

  // ── ÊXODO ────────────────────────────────────────────────────────────────
  // [82] Introdução (Êx 1.1–7)
  if (d.livroAbrev === 'Êx' && /^introducao$/.test(p))
    return `A simetria da introdução do Êxodo espelha os nomes dos que desceram ao Egito ↔ a terra que se encheu deles. No centro: a morte de Jacó e sua geração fecha o elo com Gênesis. O que sobra é a multiplicação — "fecundos, prolíficos, cresceram em extremo." O pivô é que a bênção abraâmica ("sede fecundos") atravessou o luto de uma geração inteira e chegou ao Êxodo sem interrupção. Na vida da igreja: o povo de Deus persiste além de seus líderes. Quando uma geração parte, o que Deus prometeu não vai com ela — fica nos filhos. A promessa é maior do que qualquer vida individual.`;
  // [83] Construção de Cidades (Êx 1.8–14)
  if (/construcao de cidades/i.test(p))
    return `A simetria da construção das cidades espelha o novo rei que esqueceu José (A) ↔ a servidão impiedosa em todo tipo de trabalho (A'). No centro: a imposição dos trabalhos forçados — Pitom e Ramessés construídas sobre os ombros do povo de Deus. O pivô: quanto mais oprimiam, mais cresciam. O plano do faraó fracassou por dentro. Na vida da igreja: o crescimento que Deus planta não é impedido pelo sistema que tenta suprimi-lo. A opressão que pretendia destruir Israel o fez multiplicar. Quando o inimigo aumenta a pressão, Deus frequentemente multiplica o fruto.`;
  // [84] Ordenar a matar Meninos (Êx 1.15–22)
  if (/matar meninos/i.test(p))
    return `A simetria desta perícope espelha a ordem privada do faraó às parteiras ↔ a ordem pública a todo o povo para jogar os meninos no Nilo — a escalada do genocídio. No centro: o interrogatório — "por que não mataram?" — e a resposta das parteiras: "as hebreias parem antes de chegarmos." O pivô é a desobediência civil que salva vidas. Sifra e Puá são os primeiros heróis da resistência no Êxodo — mulheres sem nome no registro do faraó, mas com nome diante de Deus, que lhes deu descendência. Na vida da igreja: temer a Deus é o único temor que liberta de todos os outros. Há ordens que não se obedece.`;
  // [85] Nascimento e Juventude de Moisés (Êx 2.1–10)
  if (/juventude de moises/i.test(p))
    return `A simetria do nascimento de Moisés espelha o casal que concebe "um filho belo" ↔ o menino adotado pela filha do faraó com o nome "Moisés — porque das águas o tirei." No centro: a irmã que fica à distância para ver o que aconteceria — testemunha silenciosa da providência. O pivô é o olhar que aguarda sem intervir. Na vida da igreja: há momentos em que a fé não age, mas observa. A irmã de Moisés não sabe o que vai acontecer — sabe que precisa ver. Essa vigilância atenta é uma forma de fé. Deus usa a casa do opressor para criar o libertador.`;
  // [86] Moisés foge a Midiã (Êx 2.11–15)
  if (/moises foge a midia/i.test(p))
    return `A simetria da fuga de Moisés espelha o adulto que observa a opressão do seu povo ↔ Moisés fugindo para Midiã após o caso ser descoberto. No centro: dois hebreus brigam e um pergunta: "Quem te constituiu chefe e juiz sobre nós?" — o libertador rejeitado pelos seus antes de começar. O pivô é a rejeição que precede a missão. Na vida da igreja: quem é chamado por Deus quase sempre experimenta a rejeição do próprio círculo primeiro. Moisés foge não do Egito, mas da desconfiança do seu povo. A dor da rejeição dos irmãos frequentemente antecede o chamado público.`;
  // [87] Casamento de Moisés (Êx 2.16–22)
  if (/casamento de moises/i.test(p))
    return `A simetria do casamento de Moisés espelha as filhas defendidas no poço ↔ Moisés vivendo como peregrino — o nome do filho, Gérson, declara: "Sou estrangeiro em terra estranha." No centro: a pergunta do pai de Zípora — "Onde está o homem? Por que o deixastes? Chamai-o para comer pão." O pivô é a hospitalidade que abre futuro. Na vida da igreja: receber bem um estranho que age com justiça é um ato teológico. Uma refeição pode mudar o destino de um exilado. Hospitalidade não é detalhe social — é porta de providência.`;
  // [88] Misericórdia do SENHOR para Israel (Êx 2.23–25)
  if (/misericordia para israel/i.test(p))
    return `A simetria desta brevíssima perícope espelha a morte do rei do Egito ↔ o olhar de Deus sobre Israel. No centro: "E Deus ouviu o seu gemido" — o momento em que o silêncio divino termina. Três verbos em sequência mudam tudo: Deus ouviu, lembrou da aliança, conheceu o povo. O pivô é que o clamor que sobe a Deus não é ignorado. Na vida da igreja: há períodos em que Deus parece ausente enquanto a opressão continua. Esta perícope garante: o gemido sincero já é o começo do êxodo. Deus registra o que o povo sofre antes de qualquer intervenção visível.`;
  // [89] Moisés em Sarça Ardente (Êx 3.1–4.17)
  if (/sarca ardente/i.test(p))
    return `A simetria da sarça ardente espelha a curiosidade do pastor no deserto ↔ Arão designado como porta-voz, completando o comissionamento. No centro: a missão e a objeção — "Envia-me ao faraó" e "Quem sou eu?" Na mesma perícope Deus revela o nome EU SOU, dá sinais e designa Arão. O pivô é a inadequação reconhecida que recebe equipe divina. Na vida da igreja: o chamado raramente vem com sensação de suficiência. Vem com uma missão clara, um nome que sustenta ("EU SOU estará contigo") e os recursos certos. A questão nunca é "sou capaz?" — é "quem me envia?"`;
  // [90] Moisés retorna a Egito (Êx 4.18–31)
  if (/moises retorna a egito/i.test(p))
    return `A simetria do retorno espelha a partida de Moisés com esposa, filhos e a vara de Deus ↔ o povo que crê e se inclina em adoração. No centro: um episódio perturbador — Deus quis matar Moisés no caminho; Zípora circuncida o filho e declara "És meu esposo de sangue." O pivô é que a aliança (circuncisão) protege o próprio libertador. Na vida da igreja: nenhuma missão é tão urgente que passe por cima dos compromissos do pacto. O que parece interrupção no caminho pode ser o momento em que os sinais da aliança precisam ser levados a sério antes de tudo.`;
  // [91] Tijolos sem Palha (Êx 5.1–23)
  if (/tijolos sem palha/i.test(p))
    return `A simetria dos tijolos sem palha espelha o confronto de Moisés com o faraó ↔ Moisés clamando ao SENHOR: "Por que afligiste este povo?" No centro: a injustiça absoluta — capatazes batem nos chefes israelitas que não conseguem cumprir uma tarefa impossível. O pivô é a crise de fé: o povo culpa Moisés; Moisés culpa Deus. Na vida da igreja: obediência ao chamado não garanta resultado imediato. Às vezes a obediência piora as coisas antes da libertação. O clamor honesto de Moisés — "por que fizeste mal a este povo?" — é oração legítima, não incredulidade.`;
  // [92] A Libertação de Israel Assegurada (Êx 6.1–12)
  if (/libertacao assegurado/i.test(p))
    return `A simetria desta perícope espelha a resposta de Deus ("agora verás o que farei ao faraó") ↔ o povo que não ouve e Moisés que objeta de novo. No centro: as sete promessas divinas em sequência — "Eu vos tirarei… livrarei… resgatarei… tomarei… serei vosso Deus… levarei… darei." O pivô é a densidade da promessa no pior momento: quando o povo não ouve e o líder duvida, Deus não reduz as promessas — as dobra. Na vida da igreja: a fidelidade de Deus não depende do estado de fé do povo. Sete promessas no fundo do desânimo — esse é o caráter de YHWH.`;
  // [93] A Genealogia de Moisés e Arão (Êx 6.13–27)
  if (/genealogia de moises/i.test(p))
    return `A simetria da genealogia espelha a ordem divina a Moisés e Arão ↔ "são eles que falaram ao faraó — este é o Moisés e o Arão." No centro: a genealogia de Levi em detalhe — chegando a Arão, Moisés e Fineias, a linha sacerdotal legitimada. O pivô é a missão com rosto e história. Na vida da igreja: genealogias bíblicas afirmam que Deus age através de pessoas reais com histórias reais. Ninguém é chamado no vácuo. O Deus que liberta Israel conhece cada nome da família que usa para isso. Identidade e linhagem importam para a missão.`;
  // [94] Moisés e Arão Obedecem (Êx 6.28–7.7)
  if (/moises e arao obedecer/i.test(p))
    return `A simetria desta perícope espelha o mandato de Deus ("dize ao faraó tudo") ↔ a obediência total — "fizeram como o SENHOR lhes ordenara" (Moisés com 80 anos, Arão com 83). No centro: a redefinição dos papéis — "Constituí-te deus para o faraó; Arão será teu profeta." O pivô é que o confronto é espiritual antes de ser político. Na vida da igreja: quando a mensagem de Deus enfrenta o poder estabelecido, o embate real é de natureza espiritual. O mensageiro não é apenas funcionário — é representante do Deus que define a realidade.`;
  // [95] Dez Milagres (Pragas) (Êx 7.8–10.29)
  if (/dez milagres/i.test(p))
    return `A simetria das dez pragas tem sete camadas: sangue/última negativa nos extremos, rãs/compromisso recusado na segunda camada, piolhos e moscas/trevas na terceira, morte dos animais e chagas na quarta, e no centro absoluto — o granizo. O pivô é a declaração: "Para que saibas que não há outro como eu em toda a terra." Cada praga desmonta um deus egípcio. Na vida da igreja: o julgamento de Deus sobre os ídolos não é arbitrário — é pedagógico. O que a cultura chama de proteção e segurança é exposto como ilusão diante do Deus vivo.`;
  // [96] Advertência da Última Praga (Êx 11.1–10)
  if (/final praga/i.test(p))
    return `A simetria do aviso espelha o mandato de despojar os egípcios ↔ o coração endurecido e a glória de YHWH como propósito final. No centro: o anúncio solene — "à meia-noite sairei pelo meio do Egito" — todo primogênito, do faraó ao escravo. O pivô é a distinção que Deus estabelece: "Para que saibais que o SENHOR faz diferença entre Egito e Israel." Na vida da igreja: a proteção da aliança não é favorecimento arbitrário — é fidelidade ao pacto. O Deus que distingue é o mesmo que declarou "serei vosso Deus." A diferença vem da relação, não do mérito.`;
  // [97] Instituição da Primeira Páscoa (Êx 12.1–28)
  if (/primeiro pascoa/i.test(p))
    return `A simetria da primeira Páscoa espelha o novo calendário para Israel ↔ o povo que obedece e se inclina em adoração. No centro: "Ao ver o sangue nas ombreiras, passarei por cima de vós." O pivô é que o sangue no portal é o único sinal que separa morte e vida — não o mérito do habitante, mas o sinal visível na porta. Na vida da igreja: Cristo é "o nosso cordeiro pascal" (1 Co 5.7). O sangue que cobre não identifica os melhores — identifica os que se colocaram sob o sinal prometido. A proteção vem da cobertura, não do desempenho.`;
  // [98] A Décima Praga (Êx 12.29–32)
  if (/decimo praga/i.test(p))
    return `A simetria da décima praga espelha a morte de todo primogênito no Egito ↔ a frase final: "abençoai-me também a mim" — o opressor pedindo bênção ao oprimido. No centro: o faraó chama Moisés e Arão de noite e ordena: "Levantai-vos, saí — ide, servi ao SENHOR como tendes dito." A rendição total em uma única noite. O pivô é a inversão completa. Na vida da igreja: a libertação que Deus produz supera qualquer expectativa humana. Quem perseguiu pede bênção. Quem humilhava se humilha. O poder que Deus inverte reconhece, no final, quem tem a autoridade real.`;
  // [99] O Êxodo (Êx 12.33–41)
  if (/^o exodo$/.test(p))
    return `A simetria do Êxodo espelha a urgência dos egípcios para expulsar Israel ↔ os 430 anos de habitação e a saída dos exércitos do SENHOR. No centro: 600 mil homens a pé além das crianças e uma multidão heterogênea — o número revela a grandeza da promessa cumprida. O pivô é que de 70 pessoas que desceram com Jacó, saíram centenas de milhares. Na vida da igreja: o que começa pequeno — uma família, uma aliança, uma promessa — é sinal de uma multiplicação que Deus sustenta. Os 430 anos de espera não foram abandono; foram incubação. O Deus que prometeu não se atrasa.`;
  // [100] Direções para a Páscoa (Êx 12.42–51)
  if (/directions para/i.test(p))
    return `A simetria das instruções da Páscoa espelha a noite de vigília perpétua para o SENHOR ↔ a obediência total no mesmo dia em que Israel saiu. No centro: toda a congregação deve celebrá-la — e "nenhum osso dele quebrareis." O pivô é a integridade do cordeiro e a inclusão do estrangeiro circuncidado. Na vida da igreja: João 19.36 cita esse versículo ao descrever a morte de Jesus — "nenhum osso seu foi quebrado." A Páscoa do Êxodo aponta para uma Páscoa maior. A inclusão do estrangeiro que entra pela aliança antecipa a missão universal: todos que se circuncidam no coração participam da mesa.`;
  // [101] A Consagração dos Primogênitos (Êx 13.1–2)
  if (/consagracao de primogenito/i.test(p) && d.capitulos.includes('13.1-2'))
    return `A simetria desta brevíssima perícope tem no centro a declaração absoluta: "Todo primogênito — tanto dos homens como dos animais — é meu." O pivô é a propriedade divina sobre o que abre o ventre. A vida resgatada pertence ao Resgatador. Na vida da igreja: a consagração dos primogênitos é teologia do resgate. Toda vida que foi salva da morte pertence ao Senhor. O que recebemos de volta — filho, vocação, segundo fôlego — não é nossa propriedade; é mordomo de algo que Deus resgatou.`;
  // [102] A Festa dos Pães Asmos (Êx 13.3–10)
  if (/festa de pao sem fermento/i.test(p))
    return `A simetria da festa espelha o mandato de lembrar o dia da saída ↔ o sinal na mão e memorial entre os olhos — a lei incorporada no corpo. No centro: sete dias de ausência total de fermento em todo o território. O pivô é a pureza que reflete o início da liberdade. Na vida da igreja: o fermento é imagem do que contamina lentamente (Mt 16.6; 1 Co 5.8). Celebrar a libertação com pão sem fermento é declarar: não voltamos ao que fomos. A memória da saída do Egito não é nostalgia — é identidade que molda o presente.`;
  // [103] A Consagração dos Primogênitos — continuação (Êx 13.11–16)
  if (/consagracao de primogenito/i.test(p) && d.capitulos.includes('13.11'))
    return `A simetria desta perícope espelha a entrada na terra prometida ↔ o sinal na mão e entre os olhos. No centro: "Quando teu filho perguntar: que é isso? Dirás: com mão forte o SENHOR nos tirou do Egito." O pivô é a pergunta das gerações futuras como motor da memória. Na vida da igreja: os rituais que transmitem fé são projetados para provocar perguntas. O culto não é só para os que já sabem — é para que os filhos perguntem e os pais transmitam. Liturgia é pedagogia de memória para quem ainda não nasceu.`;
  // [104] As Colunas de Nuvem e Fogo (Êx 13.17–22)
  if (/colunas de nuvem/i.test(p))
    return `A simetria das colunas espelha o caminho mais longo escolhido por Deus — "para que o povo não se arrependa ao ver guerra" ↔ a nuvem e o fogo permanentes, em todas as jornadas. No centro: o acampamento em Etã — na beira do deserto, a fronteira entre servidão e liberdade. O pivô é que Deus guia o espaço intermediário com presença visível. Na vida da igreja: há um trecho entre sair do Egito e chegar à terra prometida. Deus está nesse espaço — nuvem de dia, fogo à noite. A vida cristã tem momentos entre o que deixamos e o que ainda não chegou — e a presença de Deus cobre cada passo.`;
  // [105] Travessia do Mar Vermelho (Êx 14.1–18)
  if (/travessia mar vermelho/i.test(p))
    return `A simetria da travessia espelha a instrução de acampar diante do mar ↔ a ordem de estender a vara para a glória de Deus. No centro: Israel vê os egípcios e clama de medo — "não havia sepulcros no Egito?" O pivô é a fé em crise diante do impossível, e a resposta de Moisés: "Estai quietos e verei a salvação do SENHOR — Ele pelejará por vós." Na vida da igreja: o maior inimigo no momento da libertação não é o exército atrás — é o desejo de voltar. Quando Deus coloca um mar à frente e um inimigo atrás, ele não pede coragem heroica — pede quietude e confiança.`;
  // [106] Os Perseguidores Afogados (Êx 14.19–31)
  if (/perseguidores afogados/i.test(p))
    return `A simetria desta perícope espelha a nuvem que separa Israel e Egito ↔ Israel vendo os egípcios mortos na praia e crendo no SENHOR. No centro: os egípcios dentro do mar com confusão nos carros — "o SENHOR pelejou contra nós; fujamos." O pivô é o momento em que o inimigo reconhece que está lutando contra Deus. Na vida da igreja: há batalhas que não são travadas por nós — são travadas por Deus enquanto passamos. A fé que nasce ao ver os inimigos derrotados é real, mas não garante fé permanente — o que garante é conhecer quem venceu a batalha.`;
  // [107] O Cântico de Moisés (Êx 15.1–19)
  if (d.livroAbrev === 'Êx' && /cantico de moises/i.test(p))
    return `A simetria do cântico espelha "Cantarei ao SENHOR, pois se glorificou" ↔ "O SENHOR reinará para todo o sempre." No centro: a arrogância do inimigo — "perseguirei, alcançarei, dividirei o despojo" — e a resposta imediata de Deus: "sopraste com teu sopro — o mar os cobriu." O pivô é o contraste entre o planejamento arrogante e o sopro divino que encerra tudo. Na vida da igreja: o cântico não é apenas celebração — é interpretação teológica da história. Louvar que explica o que Deus fez é mais profundo que louvar que apenas sente o alívio. O cântico de Moisés ensina a colocar palavras no milagre.`;
  // [108] O Cântico de Miriã (Êx 15.20–21)
  if (/cantico de miria/i.test(p))
    return `A simetria do cântico de Miriã é simples e poderosa: Miriã com tamborim ↔ todas as mulheres saindo após ela com danças. No centro: o refrão — "Cantai ao SENHOR, pois se glorificou; o cavalo e o seu cavaleiro lançou no mar." O pivô é que a resposta feminina ecoa e confirma o que o cântico de Moisés proclamou. Na vida da igreja: o louvor não é exclusivo do líder. O culto que inclui vozes diversas reflete melhor o Deus que ouviu o clamor das parteiras e o gemido dos escravizados. Miriã é profetisa — o dom de interpretar os atos de Deus não é só dos homens.`;
  // [109] Água Amarga Tornada Doce (Êx 15.22–27)
  if (/agua amarga/i.test(p))
    return `A simetria desta perícope espelha três dias de caminhada sem água ↔ a chegada a Elim com doze fontes e setenta palmeiras. No centro: Deus mostra a Moisés uma árvore — ele a lança na água amarga e ela se torna doce. O pivô é a palavra de Deus que transforma a amargura. Na vida da igreja: o deserto é real, a água amarga é real, Elim também é real. Entre Marah e Elim há uma árvore. O que transforma a amargura não é o fim da dificuldade, mas a palavra e a presença de Deus jogadas dentro da situação. Paulo evocará esse padrão: "aprendi em todo estado a ser contente."`;
  // [110] Pão de Céu (Êx 16.1–36)
  if (/pao de ceu/i.test(p))
    return `A simetria do maná espelha a murmuração por comida ↔ a preservação de um ômer para as gerações futuras. No centro: o maná aparece pela primeira vez — "o que é isso?" — e cada um recolhe exatamente o que necessita; nem mais, nem menos. O pivô é a provisão diária proporcional à necessidade. Na vida da igreja: o maná ensina dependência cotidiana. Não se acumula, não se herda. Jesus ensina a orar "o pão de cada dia" — não o da semana toda. A fé que confia para amanhã começa praticando confiar para hoje. Guardar mais do que precisa apodrece — em maná e em tudo mais.`;
  // [111] Água da Rocha (Êx 17.1–7)
  if (/agua da rocha/i.test(p))
    return `A simetria da água da rocha espelha Israel sem água em Refidim ↔ o lugar chamado Massá e Meribá — "Prova" e "Contenda" — com a pergunta gravada no nome: "Está o SENHOR no meio de nós ou não?" No centro: Moisés clama ao SENHOR — "que farei a este povo? Pouco falta para me apedrejar." O pivô é o mediador no limite absoluto. Na vida da igreja: quem media conflitos na comunidade chega ao ponto em que o único recurso é o clamor a Deus. Paulo interpreta: "a rocha era Cristo" (1 Co 10.4). O que sustenta no deserto é a mesma Fonte que sustenta hoje.`;
  // [112] Amaleque ataca Israel e É derrotado (Êx 17.8–16)
  if (/amaleque/i.test(p))
    return `A simetria desta perícope espelha o ataque de Amaleque ↔ o altar e a memória perpétua da vitória. No centro: os braços de Moisés levantados — quando sobem, Israel prevalece; quando descem, Amaleque prevalece. Arão e Hur sustentam as mãos do intercessor até o pôr do sol. O pivô é a intercessão sustentada por outros. Na vida da igreja: a vitória na batalha depende de quem sustenta os braços do intercessor. Toda liderança tem momentos de esgotamento — o modelo bíblico não é o líder sozinho, mas o líder sustentado. Arão e Hur são os heróis silenciosos desta batalha.`;
  // [113] O Conselho de Jetro (Êx 18.1–27)
  if (/de jetro conselho/i.test(p))
    return `A simetria do conselho de Jetro espelha o sogro que ouviu e veio trazendo a família ↔ Moisés que ouviu e fez tudo o que Jetro disse. No centro: Moisés julgando o povo do amanhecer ao anoitecer — e Jetro: "o que fazes não é bom; te esgotarás e o povo também." O pivô é o diagnóstico de insustentabilidade vindo de um de fora. Na vida da igreja: às vezes a sabedoria para reformar a estrutura vem de alguém de fora — não do inimigo, mas do amigo que ama o suficiente para dizer o que os de dentro não veem. Delegar não é fraqueza; é sabedoria que multiplica a missão.`;
  // [114] Os Israelitas Chegam ao Sinai (Êx 19.1–9)
  if (/israelitas chegam/i.test(p))
    return `A simetria desta perícope espelha a chegada ao deserto do Sinai ↔ o SENHOR que virá em densa nuvem para ser ouvido pelo povo. No centro: as palavras fundantes da aliança — "Trouxe-vos sobre asas de águia… sereis o meu tesouro, reino de sacerdotes, nação santa." O pivô é a identidade declarada antes da lei. Na vida da igreja: o povo de Deus não é definido primeiro pelo que deve fazer, mas pelo que Deus declara. "Reino de sacerdotes" não é resultado da obediência — é a base para ela. Pedro reutilizará essas palavras para a igreja (1 Pe 2.9): a identidade do povo de Deus não mudou, foi cumprida em Cristo.`;
  // [115] O SENHOR Desce sobre o Sinai (Êx 19.10–19)
  if (/vem sobre monte sinai/i.test(p))
    return `A simetria da descida espelha a instrução de santificação do povo ↔ o monte fumegante e a voz de Deus que se faz ouvir. No centro: Moisés desce, santifica o povo e diz — "preparai-vos para o terceiro dia." Trovões, relâmpagos, nuvem densa, tremor. O pivô é o terceiro dia como data do encontro com Deus. Na vida da igreja: o padrão do "terceiro dia" atravessa toda a Escritura. A preparação para o encontro com Deus exige separação real. Santidade não é lista de regras — é disposição de coração para suportar a proximidade do Santo.`;
  // [116] Moisés Sobe ao Monte Sinai (Êx 19.20–25)
  if (/moises vai a monte sinai/i.test(p))
    return `A simetria desta perícope espelha o SENHOR descendo ao cume e chamando Moisés ↔ Moisés descendo ao povo para comunicar. No centro: Moisés responde — "o povo não pode subir; tu mesmo nos ordenaste pôr limites ao monte." O pivô é a fronteira como proteção, não como exclusão. Na vida da igreja: a santidade de Deus não é hostil ao povo — é incompatível com o que o pecado faz à criatura. O limite ao redor do monte é misericórdia. O mediador que sobe e desce representa o que Jesus cumpriu definitivamente: subiu onde nenhum de nós poderia ir e desceu com a palavra que sustenta.`;
  // [117] Dez Mandamentos (Êx 20.1–21)
  if (d.livroAbrev === 'Êx' && /dez mandamentos/i.test(p))
    return `A simetria do Decálogo espelha "Eu sou o SENHOR que te tirei do Egito" ↔ o povo que treme e Moisés que entra na escuridão onde está Deus. No centro exato: o quinto mandamento — "honra teu pai e tua mãe" — a charneira entre as duas tábuas. O pivô é a família como elo entre o vertical (amor a Deus) e o horizontal (amor ao próximo). Na vida da igreja: a ética bíblica não começa com princípios abstratos — começa com relações concretas. Honrar pai e mãe é o primeiro mandamento com promessa. A família é o laboratório onde aprendemos a amar Deus e o próximo ao mesmo tempo.`;
  // [118] O Livro da Aliança (Êx 20.22–23.33)
  if (/livro da alianca/i.test(p))
    return `A simetria do Livro da Aliança espelha a proibição de imagens e o altar simples ↔ a promessa do anjo guia e a conquista da terra. No centro: as leis que protegem o estrangeiro, a viúva e o órfão — "se o afligires e ele clamar a mim, ouvirei." O pivô é que os mais vulneráveis estão no centro da lei, não na margem. Na vida da igreja: qualquer comunidade que segue o Livro da Aliança precisa perguntar: quem são os vulneráveis entre nós? A lei que protege o fraco não é detalhe do código ético de Israel — é o seu coração. Deus ouve o clamor do afligido antes de qualquer intercessão.`;
  // [119] O Sangue da Aliança (Êx 24.1–18)
  if (/sangue da alianca/i.test(p))
    return `A simetria desta perícope espelha a subida de Moisés com Arão, Nadabe, Abiú e setenta anciãos ↔ Moisés entrando na nuvem por quarenta dias. No centro: o ritual do sangue — metade no altar, metade aspergida sobre o povo: "Este é o sangue da aliança que o SENHOR fez convosco." O pivô é que a aliança é selada com sangue antes de ser vivida na obediência. Na vida da igreja: Jesus reinterpreta este momento na última ceia: "Este é o meu sangue da aliança, derramado por muitos." O que começou com o sangue de bois é cumprido com o Sangue do Mediador definitivo. O pacto exige sangue — e Deus mesmo o proveu.`;
  // [120] Ordenar a Fazer o Tabernáculo (Êx 25.1–31.12)
  if (/fazer o tabernaculo/i.test(p))
    return `A simetria desta grande seção espelha a oferta voluntária para o santuário ↔ o sábado como sinal da aliança. No centro: as vestes sagradas e a consagração dos sacerdotes — a mediação contínua entre Deus e o povo. O pivô é que no centro de todas as instruções técnicas está a pessoa do sacerdote. Na vida da igreja: o tabernáculo foi construído com detalhes precisos, mas o que o faz funcionar é a mediação. Hebreus 4–10 desdobra como Cristo é o Sumo Sacerdote que cumpre tudo isso — não na tenda física, mas na presença definitiva diante do Pai.`;
  // [121] Normas do Sábado (Êx 31.12–18)
  if (/sabado regulamentos/i.test(p))
    return `A simetria das normas do sábado espelha o sábado como selo de tudo que veio antes ↔ as tábuas do testemunho escritas pelo dedo de Deus. No centro: "No sétimo dia, sábado de repouso sagrado — quem trabalhar, morrerá." O pivô é que o sábado é mais do que descanso: é reconhecimento de quem criou. Na vida da igreja: parar não é improdutividade — é declaração de que o sustento não depende do meu esforço ininterrupto. "Em seis dias Deus fez; no sétimo repousou" — e nos chamou a viver o mesmo ritmo. O descanso semanal é ato de adoração e confiança, não apenas higiene mental.`;
  // [122] O Bezerro de Ouro (Êx 32.1–33.6)
  if (/bezerro de ouro/i.test(p))
    return `A simetria do bezerro de ouro espelha a impaciência do povo com a demora de Moisés ↔ Moisés intercedendo — "perdoa o pecado deles, ou apaga-me do teu livro." No centro: Moisés descendo com as tábuas e as quebrando; queimando o bezerro e fazendo o povo beber. A aliança quebrada visualmente antes de qualquer sentença. O pivô é a idolatria nascida da impaciência. Na vida da igreja: o bezerro foi feito com o ouro que Deus havia dado. Os nossos ídolos raramente são coisas ruins — são bênçãos de Deus usadas no lugar errado. Quando Deus demora, a tendência é construir algo visível e controlável que o substitua.`;
  // [123] A Tenda Fora do Acampamento (Êx 33.7–11)
  if (/tenda fora do acampamento/i.test(p))
    return `A simetria desta perícope espelha a tenda armada fora do acampamento ↔ o SENHOR falando com Moisés "face a face, como fala um homem com seu amigo." No centro: a coluna de nuvem descendo à porta — o povo adorando cada um da entrada da sua tenda. O pivô é a presença de Deus distante do meio do povo — consequência do bezerro de ouro. Na vida da igreja: o pecado tem consequências para a proximidade com Deus. A adoração a distância é melhor que nenhuma adoração — mas a Bíblia nunca a apresenta como ideal. O restante do Êxodo é a história de como Deus retorna ao centro.`;
  // [124] O SENHOR Acompanha os Israelitas (Êx 33.12–17)
  if (/senhor vai com israelitas/i.test(p))
    return `A simetria desta perícope espelha o pedido de Moisés — "deixa-me conhecer os teus caminhos" ↔ a resposta de Deus — "farei isso, pois te conheço pelo nome." No centro: a condição absoluta de Moisés — "se a tua presença não for conosco, não nos faças partir daqui." O pivô é a preferência pelo deserto com Deus à terra prometida sem Ele. Na vida da igreja: o maior perigo não é o deserto sem terra — é a terra sem presença. Crescimento sem Deus é apenas crescimento. Missão sem a presença de Deus é ativismo. Moisés escolhe ficar onde Deus está em vez de avançar para onde Deus não vai.`;
  // [125] A Glória de Deus (Êx 33.18–23)
  if (/gloria de deus/i.test(p))
    return `A simetria desta perícope espelha o pedido mais ousado da Escritura — "mostra-me a tua glória" ↔ "verás as minhas costas; minha face não se verá." No centro: "Não podes ver a minha face, pois ninguém pode ver-me e viver." O pivô é a desproporção entre a santidade de Deus e a capacidade humana. Na vida da igreja: ver Deus plenamente não é algo que o ser humano suporta nesta vida. O que temos é a "fenda da rocha" — o lugar protegido de onde vemos o rastro da glória. João 1.18 dirá: "o Filho unigênito o revelou." Jesus é a fenda da rocha — a forma humana que torna a glória divina suportável e comunicável.`;
  // [126] A Aliança Renovada (Êx 34.1–28)
  if (d.livroAbrev === 'Êx' && /alianca renovado/i.test(p))
    return `A simetria desta perícope espelha Moisés lavrando novas tábuas e subindo sozinho ↔ quarenta dias sem comer nem beber e as dez palavras escritas — a aliança restaurada. No centro: Moisés se inclina e adora — e intercede: "vai no meio de nós; perdoa a nossa iniquidade." O pivô é a adoração nascida do encontro com o caráter de Deus: "misericordioso, piedoso, tardio em irar-se." Na vida da igreja: Êxodo 34.6-7 é o "credo" mais citado do Antigo Testamento. Quando Israel precisava renovar a aliança, voltava para esse retrato de Deus. A renovação não começa com prometer fazer melhor — começa com ver quem Ele é.`;
  // [127] O Rosto Resplandecente de Moisés (Êx 34.29–35)
  if (/rosto resplandecente/i.test(p))
    return `A simetria desta perícope espelha Moisés descendo sem saber que o rosto resplandecia ↔ o véu que vai e vem conforme Moisés entra ou sai diante do SENHOR. No centro: Moisés chama os que temiam — e eles se aproximam; a glória comunica a lei. O pivô é a glória como meio de comunicação, não de exclusão. Na vida da igreja: Paulo interpreta este véu em 2 Coríntios 3 — o véu simboliza a glória que passa; a glória permanente é a do novo pacto. Quem contempla o Senhor "de face descoberta" é transformado na mesma imagem. A presença de Deus frequentada transforma quem a frequenta.`;
  // [128] Preparativos para a Construção do Tabernáculo (Êx 35.1–39.43)
  if (/preparacao para construcao/i.test(p))
    return `A simetria desta grande seção espelha o mandamento do sábado repetido antes de tudo ↔ Moisés vendo toda a obra pronta e abençoando o povo. No centro: Bezalel e Aoliabe — "cheios do Espírito de Deus em sabedoria, inteligência e ciência para toda obra." O povo doa mais do que o necessário e é preciso mandar parar. O pivô é a arte sagrada como dom do Espírito. Na vida da igreja: criatividade, habilidade artística e talento manual são dons do Espírito tanto quanto os dons mais "espirituais." Bezalel é o primeiro homem descrito como cheio do Espírito de Deus na Bíblia — e ele é artesão.`;
  // [129] A Construção do Tabernáculo (Êx 40.1–33)
  if (/construcao do tabernaculo/i.test(p))
    return `A simetria desta perícope espelha a ordem divina de armar o tabernáculo no primeiro dia do primeiro mês ↔ "Assim Moisés acabou a obra." No centro: a colocação da arca com a coberta — o lugar mais sagrado em seu lugar. O pivô é a obediência fiel em cada detalhe: "como o SENHOR ordenara a Moisés" se repete sete vezes neste capítulo. Na vida da igreja: o eco é deliberado — Gênesis 2.1: "assim foram acabados os céus e a terra." O tabernáculo é uma nova criação: Deus prepara um lugar para habitar no meio do povo. O que o Éden foi no começo, o tabernáculo é na caminhada — e a Nova Jerusalém será no fim.`;
  // [130] A Nuvem e a Glória (Êx 40.34–38)
  if (/nuvem e a gloria/i.test(p))
    return `A simetria da conclusão do Êxodo espelha a nuvem e a glória que enchem o tabernáculo — Moisés não consegue entrar ↔ "em todas as suas jornadas." No centro: a nuvem guia — quando se levantava, Israel partia; quando não se levantava, não partiam. O pivô é a obediência ao movimento da nuvem como obediência a Deus. A última palavra do Êxodo é presença permanente: "a nuvem do SENHOR em todas as suas jornadas." Na vida da igreja: o livro que começa com escravidão termina com glória habitando no meio do povo. A missão da igreja não é trazer Deus para onde vamos — é aprender a mover quando Ele se move.`;

  // ── LEVÍTICO ─────────────────────────────────────────────────────────────
  // [131] Ofertas (Lv 1–3)
  if (d.livroAbrev === 'Lv' && /^ofertas$/i.test(p))
    return `A simetria das primeiras ofertas de Levítico espelha o holocausto totalmente queimado ↔ a oferta de paz compartilhada. No centro: a oferta de manjares com sal da aliança — "não deixarás faltar o sal da aliança do teu Deus." O pivô é o cotidiano santificado: o pão de cada dia pode ser oferta. Na vida da igreja: adoração não é apenas o extraordinário — o sacrifício total do culto e a comunhão da mesa. É também o sal da aliança no ordinário — o trabalho, o alimento, os gestos diários que carregam o flavor da presença de Deus.`;
  // [132] Pecado Ofertas (Lv 4–5)
  if (d.livroAbrev === 'Lv' && /pecado ofertas/i.test(p))
    return `A simetria das ofertas pelo pecado espelha a culpa do sacerdote ungido ↔ a culpa do israelita comum — todos sob a mesma necessidade de expiação. No centro: a oferta de toda a congregação, colocada antes da do líder e do povo individualmente. O pivô é que a comunidade inteira pode pecar inadvertidamente. Na vida da igreja: há pecados corporativos — padrões de injustiça, omissão coletiva, falhas sistêmicas — que nenhum membro individual percebe como seu. O Levítico prevê expiação para o que a congregação fez sem saber. Discernimento corporativo é tão necessário quanto arrependimento individual.`;
  // [133] Ofertas com Restituição (Lv 5:14–26)
  if (/ofertas com restituicao/i.test(p))
    return `A simetria das ofertas com restituição espelha a violação de coisas sagradas ↔ a oferta pelo delito diante do Senhor. No centro: a fraude contra o próximo — quebra de aliança horizontal. O pivô é surpreendente: ferir o próximo está no coração do Levítico cultual, entre a ofensa a Deus e o ritual de restauração. Danos ao próximo exigem restituição com acréscimo de um quinto antes da oferta. Na vida da igreja: não há reconciliação com Deus que pule a reconciliação com quem foi lesado. Jesus reafirmará: "deixa a oferta ali e vai primeiro reconciliar-te" (Mt 5.24). O altar não aceita o que ainda deve ao irmão.`;
  // [134] Instruções Sobre Sacrifícios (Lv 6–7:10)
  if (/instrucoes sobre sacrificios/i.test(p))
    return `A simetria das instruções sobre sacrifícios espelha o fogo perpétuo do holocausto que nunca se apaga ↔ as porções sacerdotais da oferta pelo delito. No centro: a oferta diária do sacerdote ungido — o mediador entre Deus e o povo oferece pela própria conta todos os dias. O pivô é que o sacerdote não está acima da necessidade de oferta. Na vida da igreja: o pastor, o líder, o servo da comunidade não está isento da disciplina de adoração pessoal. O centro do manual dos sacrifícios não é o povo — é o mediador que serve diariamente diante de Deus. Liderança espiritual sem devoção privada é serviço sem sustento.`;
  // [135] Mais Instruções (Lv 7:11–38)
  if (d.livroAbrev === 'Lv' && /^mais instrucoes$/i.test(p))
    return `A simetria das instruções complementares espelha a oferta de paz por ação de graças ↔ o sumário de todas as leis dos sacrifícios. No centro: a proibição de comer gordura e sangue — "não comereis gordura nem sangue; é lei perpétua." O pivô é a reserva: a gordura (o melhor, o excesso) e o sangue (a vida) pertencem ao Senhor — o adorador come o que resta. Na vida da igreja: gratidão genuína reconhece que o melhor é de Deus. Quando a ação de graças é real, ela reserva ao Senhor o que lhe pertence antes de tomar para si. A plenitude da vida é Dele — não nossa para consumir.`;
  // [136] Os Ritos de Ordenação (Lv 8)
  if (/ritos de ordenacao/i.test(p))
    return `A simetria dos ritos de ordenação espelha a convocação da congregação como testemunha ↔ os sete dias de permanência na entrada da tenda. No centro: o ungimento — Moisés unge o tabernáculo, o altar, todos os utensílios e depois Arão. O óleo de unção satura tudo antes de qualquer ministério. O pivô é a sequência: primeiro o lugar, depois a pessoa; primeiro o espaço, depois o servo. Na vida da igreja: ordenação não é apenas credencial pessoal — é saturação com a presença de Deus antes de qualquer função. O que importa não é o cargo conferido, mas o óleo derramado. E a testemunha da congregação valida o que Deus faz.`;
  // [137] O Sacerdócio de Arão Inaugurado (Lv 9)
  if (/sacerdocio de arao inaugurado/i.test(p))
    return `A simetria da inauguração do sacerdócio espelha o oitavo dia com instruções de Moisés ↔ o fogo que desce do céu consumindo o holocausto diante de todo o povo. No centro: Arão oferece pelo povo — saindo da série de ofertas pelo próprio pecado para interceder pela congregação. O pivô é o oitavo dia: depois de sete dias de preparação e oferta pelos próprios erros, o ministério começa e a glória aparece. Na vida da igreja: a glória de Deus não desce antes do tempo de formação. Não há atalho para a inauguração da presença divina — ela exige o ciclo completo de santificação.`;
  // [138] Nadabe e Abiú (Lv 10)
  if (/nadabe e abiu/i.test(p))
    return `A simetria de Nadabe e Abiú espelha o fogo estranho e a morte imediata ↔ a questão de Moisés sobre a oferta não comida — Arão responde em silêncio. No centro: a instrução súbita após a tragédia — "não bebas vinho nem bebida forte ao entrar na tenda, para distinguir o santo do profano, o impuro do puro." O pivô é a clareza que vem depois da tragédia: o fogo estranho pode ter tido sua origem no estado do sacerdote. Na vida da igreja: servir a Deus com mente e coração embotados é perigoso para quem serve e para quem é servido. Sobriedade no ministério não é austeridade — é responsabilidade com o sagrado.`;
  // [139] Limpo e Imundo Alimentos, Animais (Lv 11)
  if (/limpo e imundo/i.test(p))
    return `A simetria dos animais puros e impuros espelha os critérios para animais terrestres ↔ o sumário final: "sede santos porque eu sou santo." No centro: as aves e insetos — as categorias mais difíceis de classificar, exigindo mais discernimento. O pivô é o sumário: todas as leis de pureza são pedagógicas, ensinando Israel a distinguir categorias. Na vida da igreja: a santidade não é isolamento do mundo — é a capacidade formada de distinguir o que edifica do que contamina. As leis de pureza criavam reflexos: perguntar antes de agir "isso é limpo ou impuro?" é a disciplina que Romanos 12.2 descreve como renovação da mente.`;
  // [140] Purificação de Mulheres Após Parto (Lv 12)
  if (/purificacao de mulheres/i.test(p))
    return `A simetria da purificação após o parto espelha a impureza declarada após o nascimento ↔ o holocausto e a oferta pelo pecado ao completar os dias. No centro: o período de separação — mas encaixado ali o sinal da aliança: a circuncisão no oitavo dia. O pivô é que no meio da impureza da vida que veio ao mundo, Deus insere o sinal da aliança. Na vida da igreja: a criação de nova vida é ao mesmo tempo milagrosa e vulnerável. O sinal da aliança não espera a purificação completa — é dado dentro do período de impureza. Deus marca o recém-nascido com sua promessa antes que qualquer ritual de limpeza seja concluído.`;
  // [141] Lepra (Lv 13–14)
  if (d.livroAbrev === 'Lv' && /^lepra$/i.test(p))
    return `A simetria de Levítico 13–14 espelha o diagnóstico da lepra na pele ↔ a lepra nas casas. No centro: a lepra nas roupas — a contaminação material que nem é da pessoa nem do lugar, mas do que cobre e acompanha. O pivô é a progressão: a impureza se move da pele para o que a cobre, e desse para onde a pessoa habita. Na vida da igreja: o que carregamos conosco contamina os espaços onde vivemos — e o que habitamos penetra no que vestimos. O diagnóstico levítico pergunta: a mancha parou ou cresceu? Isso é discernimento espiritual: não toda irregularidade é impura, mas quando se expande precisa de exame e purificação.`;
  // [142] Sobre Fluxos Corporais (Lv 15)
  if (/fluxos corporais/i.test(p))
    return `A simetria dos fluxos corporais espelha as condições do homem ↔ o sumário que protege Israel da impureza mortal. No centro: a emissão de sêmen — impureza compartilhada entre homem e mulher. O pivô é a comunhão que cria status ritual comum. Na vida da igreja: o corpo não é inimigo da fé — é objeto de cuidado sagrado. As leis de pureza ensinam que a vida corporal importa para Deus. A intimidade tem consequências rituais — não porque o sexo seja impuro, mas porque o corpo que toca outro carrega responsabilidade pelo estado do outro. Nossas conexões físicas criam responsabilidades espirituais.`;
  // [143] O Dia de Expiação (Lv 16)
  if (/dia de expiacao/i.test(p))
    return `A simetria do Dia da Expiação espelha a advertência nascida da tragédia de Nadabe e Abiú ↔ a lei perpétua: expiação total uma vez por ano. No centro: Arão entra sozinho no Santo dos Santos com sangue — todo o povo aguarda fora. O pivô é a entrada solitária com sangue: ninguém pode acompanhar o sumo sacerdote nessa travessia. Na vida da igreja: Hebreus 9–10 mostra que Cristo entrou no Santo dos Santos com o seu próprio sangue — "uma vez por todas." O véu se rasgou. O que Arão fazia em solidão anual, Jesus fez definitivamente. A entrada que ninguém acompanhava tornou-se entrada que todos podem fazer em Cristo.`;
  // [144] Massacre de Animais (Lv 17)
  if (d.livroAbrev === 'Lv' && /massacre de.*animais/i.test(p))
    return `A simetria desta perícope espelha o mandato de trazer todo abate à entrada da tenda ↔ a purificação de quem comer animal morto. No centro: a proibição absoluta de comer sangue — "a vida da carne está no sangue, e eu vo-lo dei para fazer expiação." O pivô é teológico: o sangue não pode ser consumido porque é o agente da reconciliação. Comê-lo seria destruir o que Deus designou como instrumento de expiação. Na vida da igreja: "sem derramamento de sangue não há remissão" (Hb 9.22). O que o Levítico proibia de ser comido, Jesus deu para ser bebido na Ceia: "este é o meu sangue." O instrumento da expiação tornou-se convite à comunhão.`;
  // [145] Ritual e Moral Santidade (Lv 18–20)
  if (/ritual e moral santidade/i.test(p))
    return `A simetria do código de santidade espelha a proibição das práticas do Egito e de Canaã ↔ os estatutos que separam Israel das nações. No centro: "Sede santos porque eu, o SENHOR vosso Deus, sou santo." O pivô é que a santidade não é lista de regras — é participação na natureza de Deus. Na vida da igreja: a ética cristã não começa com o que não podemos fazer, mas com quem é o Deus que nos convoca. "Sede santos porque EU SOU" — a motivação é o caráter de Deus, não o medo do castigo. Pedro reutilizará este versículo: "sede santos em todo o vosso proceder" (1 Pe 1.15-16). A santidade imitativa flui do encontro com o Santo.`;
  // [146] A Santidade de Sacerdotes (Lv 21:1–15)
  if (/santidade de sacerdotes/i.test(p))
    return `A simetria da santidade sacerdotal espelha as restrições do sacerdote comum ↔ as restrições absolutas do sumo sacerdote. No centro: a mulher do sacerdote deve ser pura — a santidade do mediador inclui sua família. O pivô é que o cargo sacerdotal não é apenas uma função individual; ele envolve o círculo doméstico. Na vida da igreja: o padrão levítico não é cruel — é pedagógico. O mediador vive sob exigências que seus vizinhos não carregam porque representa algo maior do que si mesmo. Liderança espiritual tem implicações domésticas: o que acontece na casa do líder não é isolado do seu ministério.`;
  // [147] Sacerdotes com Deficiências (Lv 21:16–24)
  if (/sacerdotes com deficiencias/i.test(p))
    return `A simetria desta perícope coloca no centro a exclusão do altar — o sacerdote com defeito físico não pode oferecer. Mas os elementos externos revelam o que essa exclusão não significa: pode comer o pão sagrado. O pivô é a distinção entre função e pertencimento. Na vida da igreja: o texto não exclui da comunidade — exclui de uma função específica. Hebreus explica: o sacrifício definitivo exige perfeição que aponta para Cristo, o sacerdote sem defeito. Mas a exclusão funcional não é exclusão pessoal. Todos que estão "dentro" participam da mesa. Pertencimento e função são categorias diferentes — confundi-las produz exclusão onde Deus não excluiu.`;
  // [148] O Uso de Santo Ofertas (Lv 22:1–16)
  if (/uso de.*santo ofertas/i.test(p))
    return `A simetria do uso das ofertas santas espelha a impureza que impede o acesso ↔ o estranho que come por engano e deve restituir. No centro: "Guardarão o meu encargo para que não incorram em pecado e morram por isso." O pivô é a seriedade do encargo. Na vida da igreja: as coisas sagradas confiadas à comunidade — a Palavra, os sacramentos, o cuidado pastoral — carregam responsabilidade de guarda. Negligência não é neutralidade. Quem está perto das coisas sagradas sem atenção ao próprio coração está em perigo. Acesso e responsabilidade são inseparáveis.`;
  // [149] Aceitável Ofertas (Lv 22:17–33)
  if (/aceitavel ofertas/i.test(p))
    return `A simetria das ofertas aceitáveis espelha a exigência de animais sem defeito ↔ o mandato de santificar o nome de Deus. No centro — inesperado: "o recém-nascido ficará sete dias com sua mãe." A lei do sacrifício tem no seu centro uma lei de compaixão: não separe o filhote da mãe antes do tempo. O pivô é que misericórdia está embutida na lei cultual. Na vida da igreja: a santidade que Deus exige não é separada da compaixão — ela a inclui. As mesmas leis que definem o que é aceitável para o altar também protegem os vínculos naturais entre criatura e cria. A perfeição da oferta não pode ser conquistada à custa da crueldade.`;
  // [150] Nomeado Festas (Lv 23)
  if (/nomeado festas/i.test(p))
    return `A simetria do calendário sagrado espelha o sábado semanal (o micro-ritmo de toda vida) ↔ a Festa dos Tabernáculos — habitar em tendas por sete dias lembrando o deserto. No centro: a Festa das Trombetas — o único festival cujo propósito no texto é ser convocação: "ajuntamento sagrado, memorial ao som de trombetas." O pivô é que antes do Dia da Expiação há uma convocação. Na vida da igreja: o arrependimento precede a expiação — mas antes do arrependimento há um chamado que o torna possível. A trombeta é Deus convocando o povo antes de julgá-lo. A convocação é graça antes do julgamento.`;
  // [151] A Lâmpada e Pão (Lv 24:1–9)
  if (/lampada e pao/i.test(p))
    return `A simetria do candelabro e dos pães espelha o azeite puro que arde continuamente ↔ os pães da presença renovados todo sábado como aliança eterna. No centro: o incenso puro sobre os pães como memorial — o que sobe a Deus diante do que permanece na mesa. O pivô é a tripla presença diante de Deus: a luz que ilumina, o pão que sustenta, o incenso que intercede. Na vida da igreja: a comunidade que adora diante de Deus é luz, pão e intercessão ao mesmo tempo. O templo não era silêncio nem caos — era três elementos em ordem: iluminação, sustento e memorial que sobe.`;
  // [152] Blasfêmia e Punição (Lv 24:10–23)
  if (/blasfemia e punicao/i.test(p))
    return `A simetria da blasfêmia e punição espelha o caso individual — o filho do egípcio que amaldiçoa o Nome ↔ a execução conforme o mandato divino. No centro: a lei universal — "tanto ao estrangeiro como ao nativo: quem blasfemar o nome, morrerá." O pivô é a igualdade da lei: o nome de Deus tem o mesmo peso para todos. Na vida da igreja: santidade do Nome não é propriedade dos de dentro — vale igualmente para todos que se aproximam da comunidade. E o princípio estrutural também aparece: "vida por vida, olho por olho" — não é crueldade, é proporcionalidade. O julgamento de Deus é perfeitamente calibrado ao dano causado.`;
  // [153] O Sabático Ano e Jubileu (Lv 25)
  if (/sabatico ano e jubileu/i.test(p))
    return `A simetria do ano sabático e jubileu espelha o descanso da terra no sétimo ano ↔ a declaração final: "os filhos de Israel são meus servos — eu sou o SENHOR." No centro: "a terra não será vendida em perpetuidade, porque a terra é minha." O pivô é a propriedade divina como fundamento de toda economia justa. Na vida da igreja: o jubileu — dívidas canceladas, escravos libertos, terras devolvidas — pressupõe que tudo pertence a Deus. Jesus inaugura o "ano aceitável do Senhor" (Lc 4.18) — o jubileu escatológico que anula as dívidas definitivamente. A economia do reino não começa com redistribuição — começa com reconhecimento de quem é o dono.`;
  // [154] Obediência e Desobediência (Lv 26)
  if (/obediencia e desobediencia/i.test(p))
    return `A simetria de Levítico 26 espelha as bênçãos pela obediência (chuva, paz, abundância) ↔ a restauração pela confissão — "lembrareis a aliança de Jacó." No centro: a virada — "mas se não me ouvirdes." O pivô é o ponto exato em que a trajetória muda. Notavelmente, a seção de punições é muito mais longa que a de bênçãos, e escalona em sete graus. Mas o último versículo é sobre restauração: Deus lembra a aliança mesmo no exílio. Na vida da igreja: o capítulo mais rigoroso do Levítico termina com graça. A disciplina de Deus não é descarte — é pedagógica, proporcional e reversível. A confissão abre o mesmo Deus que disciplinou.`;
  // [155] Ofertas Votivas (Lv 27)
  if (/ofertas votivas/i.test(p))
    return `A simetria do último capítulo de Levítico espelha os votos de pessoas com estimativa sacerdotal ↔ as coisas que não se resgatam: primogênitos, coisas consagradas, dízimos — "são santíssimos do SENHOR." No centro: a consagração de casas — pode ser resgatada com acréscimo. O pivô é o encerramento: Levítico começa com Deus chamando Moisés para falar sobre ofertas, e termina com o povo aprendendo que qualquer coisa — vidas, animais, campos, casas — pode ser consagrada ao Senhor. Na vida da igreja: adoração não é apenas para templos e altares. O espaço doméstico pode entrar na órbita da consagração. Tudo o que é cotidiano pode ser oferta.`;

  // ── NÚMEROS ──────────────────────────────────────────────────────────────
  // [156]
  if (/primeiro recenseamento de israel/i.test(p))
    return `A simetria do primeiro censo espelha a ordem de Deus para contar ↔ o total de 603.550 — com os levitas deliberadamente excluídos. No centro: o registro por genealogia — cada homem de vinte anos, pelo seu nome e família. O pivô é que o censo não é burocracia militar; é reconhecimento de que cada pessoa tem identidade e futuro diante de Deus. Na vida da igreja: o povo de Deus é contável e nomeável. Ninguém é número anônimo — cada um está registrado. O Novo Testamento dirá: "vossos nomes estão escritos nos céus" (Lc 10.20).`;
  // [157]
  if (/os deveres dos levitas/i.test(p))
    return `A simetria dos deveres levíticos espelha a separação: os levitas não serão recenseados com Israel ↔ Israel faz tudo conforme o Senhor ordenou. No centro: "o estranho que se aproximar morrerá." O pivô é a fronteira sagrada: quem não foi consagrado para o santuário não pode tocá-lo impunemente. Na vida da igreja: há funções que exigem preparação e consagração específicas. Proximidade ao sagrado sem formação e chamado não é devoção — é presunção. Os levitas não herdaram terra; herdaram responsabilidade.`;
  // [158]
  if (/ordem do acampamento e da marcha/i.test(p))
    return `A simetria da organização do acampamento espelha as tribos ao leste e ao sul ↔ as tribos ao oeste e ao norte. No centro: a tenda da congregação no meio das divisões — o tabernáculo como ponto de referência de toda a ordem. O pivô é que a ordem de Israel não é militar nem política — é teológica: Deus no centro, o povo ao redor. Na vida da igreja: a comunidade cristã se organiza ao redor da presença de Deus, não ao redor de lideranças carismáticas ou interesses tribais. O culto dá a direção.`;
  // [159]
  if (/os deveres e recenseamento de levitas 1/i.test(p))
    return `A simetria da primeira lista levítica espelha a introdução com os filhos de Arão ↔ o resgate dos primogênitos além dos levitas. No centro: o censo dos levitas por clãs — Gérson, Coate, Merari. O pivô é a substituição: os levitas foram tomados em lugar dos primogênitos de Israel. Toda primogenitura pertence ao Senhor — os levitas são o pagamento dessa dívida coletiva. Na vida da igreja: servir a Deus não é um favor ao Senhor — é a devolução do que Lhe pertence de direito desde o princípio.`;
  // [160]
  if (/os deveres e recenseamento de levitas 2/i.test(p))
    return `A simetria do segundo levantamento levítico espelha o censo dos coatitas ↔ o total recenseado: 8.580 levitas em serviço ativo. No centro: o clã de Gérson — responsável pelas telas e coberturas, o que envolve e protege a estrutura. O pivô é a diversidade de funções: Coate carrega o mais sagrado; Gérson, o que envolve; Merari, o que sustenta. Na vida da igreja: toda função de apoio é indispensável. Quem sustenta a estrutura e quem cobre o espaço não é menos importante do que quem carrega o que é mais visível.`;
  // [161]
  if (/regulamentos para rituais e voto/i.test(p))
    return `A simetria dos regulamentos rituais espelha a expulsão dos impuros do acampamento ↔ a bênção sacerdotal — "o Senhor te abençoe e te guarde." No centro: a lei do ciúme — o caso da mulher suspeita perante o Senhor. O pivô surpreende: entre as leis de pureza e a bênção mais conhecida da Bíblia, Números 5 coloca um caso de conflito matrimonial diante de Deus. Na vida da igreja: as questões domésticas não são irrelevantes para o culto. O que acontece em casa — ciúme, suspeita, injustiça — pode ser levado diante do Senhor.`;
  // [162]
  if (/ofertas dos lideres/i.test(p))
    return `A simetria das ofertas dos líderes espelha a apresentação inicial dos carros e bois ↔ o total de todos os presentes de dedicação do altar. No centro: cada líder oferece na dedicação do altar — doze dias, doze líderes, cada um com a mesma oferta. O pivô é a igualdade dos líderes diante do altar: cada tribo tem seu dia e sua oferta idêntica. Na vida da igreja: a liderança plural onde cada voz tem igual peso no ato da adoração reflete o ideal de Números 7. Nenhuma tribo é mais generosa; nenhum líder tem mais acesso do que o próximo.`;
  // [163]
  if (/consagracao e servico de levitas/i.test(p))
    return `A simetria da consagração levítica espelha a voz de Deus que Moisés ouve do propiciatório ↔ a definição de idade de serviço: de 25 a 50 anos. No centro: a purificação e dedicação dos levitas — a cerimônia que os torna capazes de servir. O pivô é a sequência: primeiro o encontro com Deus, depois a preparação do povo para servir, depois os limites de serviço. Na vida da igreja: o chamado tem início, formação e aposentadoria. Servir sem prazo nem limite também é desobediência — Deus institui ritmo para o serviço.`;
  // [164]
  if (/a pascoa em sinai/i.test(p))
    return `A simetria da Páscoa em Sinai espelha a ordem divina de celebrá-la ↔ a lei estendida ao estrangeiro que quiser participar. No centro: os impuros que consultam Moisés — e Moisés consulta a Deus. O pivô é o caso especial: quando a lei encontra a situação real, Deus cria uma segunda Páscoa para quem estava impuro na primeira. Na vida da igreja: a misericórdia de Deus prevê exceções para quem estava impedido na primeira oportunidade. E a lei que inclui o estrangeiro anuncia que a mesa da Páscoa sempre foi maior do que Israel.`;
  // [165]
  if (/a nuvem e o fogo/i.test(p))
    return `A simetria da nuvem e do fogo espelha a nuvem que cobre o tabernáculo de dia e o fogo à noite ↔ Israel guardando o encargo do Senhor. No centro: "conforme a boca do Senhor, Israel acampava; conforme a boca do Senhor, marchava." O pivô é a obediência ao ritmo de Deus: nem partir antes, nem permanecer depois — mover quando Ele se move, parar quando Ele para. Na vida da igreja: o maior desafio não é saber para onde ir, mas saber quando partir e quando ficar. Obedecer ao calendário de Deus é tão difícil quanto obedecer à sua direção.`;
  // [166]
  if (/a prata trombetas/i.test(p))
    return `A simetria das trombetas de prata espelha os sinais de convocação da congregação ↔ o uso nas festas e nas ofertas. No centro: os alarmes de marcha — sequência de sons distintos para convocar e para mover. O pivô é a linguagem sonora: Deus institui um código de comunicação com o povo — sinais diferentes para reunir, partir, avisar e celebrar. Na vida da igreja: a comunidade cristã precisa de linguagem compartilhada. O culto não é improviso; é comunicação estruturada com o povo de Deus.`;
  // [167]
  if (/partida de sinai/i.test(p))
    return `A simetria da partida de Sinai espelha a nuvem que se levanta — Israel parte ↔ "esta é a ordem das marchas dos filhos de Israel." No centro: os levitas carregam o tabernáculo no meio da marcha — Deus vai junto, no centro, carregado. O pivô é que a presença de Deus não é destino — é companhia de jornada. Na vida da igreja: Sinai foi o lugar do encontro; Canaã é o destino; mas o tabernáculo no centro da marcha diz que Deus vai junto. A presença de Deus não fica no lugar onde foi encontrada — ela acompanha o caminho.`;
  // [168]
  if (/moises e hobab/i.test(p))
    return `A simetria do episódio com Hobabe espelha o convite de Moisés ↔ a promessa de compartilhar os bens. No centro: "tu serás os nossos olhos" — Moisés reconhece que precisam de alguém que conheça o deserto. O pivô é a humildade do líder diante de quem conhece o terreno: o guia espiritual pede ajuda ao guia prático. Na vida da igreja: reconhecer o que não se sabe é liderança sábia. Deus usa tanto o profeta que ouve a voz da nuvem quanto o nativo que conhece os poços do deserto.`;
  // [169]
  if (d.livroAbrev === 'Nm' && /a arca da alianca/i.test(p))
    return `A simetria do canto da arca espelha a arca partindo na frente por três dias ↔ o canto quando ela parava: "volta, Senhor, aos milhares de Israel!" No centro: a oração da partida — "levanta-te, Senhor, e se dispersem os teus inimigos." O pivô é a arca como presença vocal: Israel não apenas a carregava — cantava para ela partir e para ela voltar. Na vida da igreja: a presença de Deus não é silenciosa — é convocada com voz e saudada com cântico. A oração que pede a Deus para "levantar-se" não é arrogância — é intimidade com o Senhor que habita nos louvores.`;
  // [170]
  if (/reclamando no deserto/i.test(p))
    return `A simetria das reclamações no deserto espelha o fogo que consome os murmuradores em Taberá ↔ as codornizes em abundância — mas com ira de Deus. No centro: Moisés se queixa ao Senhor — "o peso deste povo é grande demais para mim; se tu me tratas assim, mata-me." O pivô é o líder no limite. A resposta de Deus não é disciplina ao clamor honesto — é distribuição do Espírito aos setenta anciãos. Na vida da igreja: quando o líder está esgotado, a solução de Deus é distribuir a carga, não aumentar a capacidade do indivíduo.`;
  // [171]
  if (/arao e miria com ciumes de moises/i.test(p))
    return `A simetria do ciúme de Miriã e Arão espelha a acusação contra Moisés por causa de sua esposa ↔ Miriã curada após sete dias fora do acampamento. No centro: Deus distingue Moisés — "com ele falo face a face, e não por enigmas." O pivô é a singularidade da mediação de Moisés: a intimidade com Deus que Miriã e Arão reivindicam para si não é acessível por decreto — é dada por Deus a quem Ele escolhe. Na vida da igreja: ciúme espiritual da posição do próximo revela mais sobre quem sente do que sobre quem é alvo.`;
  // [172]
  if (/espiaos enviado em canaa/i.test(p))
    return `A simetria do envio dos espias espelha o mandato divino de enviar um homem de cada tribo ↔ o vale de Escol com o cacho de uvas carregado por dois. No centro: as instruções de Moisés — "observai a terra: é boa ou má?" O pivô é que a espionagem foi ordenada por Deus e preparada com instruções precisas. Na vida da igreja: reconhecer a realidade do terreno à frente não é falta de fé — é obediência ao mandato. O problema de Canaã não foi a espionagem, mas o que se fez com o que foi visto.`;
  // [173]
  if (/o relatorio dos espiaos/i.test(p))
    return `A simetria do relatório dos espias espelha o retorno após quarenta dias ↔ os dez que contradizem Calebe. No centro: a lista dos inimigos enumerados — a terra apresentada como inacessível. O pivô é que o centro da estrutura é a enumeração do problema, não a solução. Calebe diz "podemos" antes de a lista terminar — mas ela termina com "somos como gafanhotos." Na vida da igreja: fé e medo frequentemente olham para a mesma lista. A diferença não é o que veem — é de qual promessa partem para interpretar.`;
  // [174]
  if (/o povo rebelar-se/i.test(p))
    return `A simetria da rebelião do povo espelha o choro coletivo e o desejo de voltar ao Egito ↔ a tentativa de apedrejar Josué e Calebe — e a glória que aparece. No centro: Moisés e Arão prostraram-se diante de toda a congregação. O pivô é a prostração dos líderes: não rendição ao povo, mas clamor silencioso a Deus diante do descontrole. Na vida da igreja: quando a congregação se levanta contra seus líderes, o modelo bíblico não é contraataque — é prostração diante de Deus. A glória aparece quando a situação parece irrecuperável.`;
  // [175]
  if (/pecado de rebeliao/i.test(p))
    return `A simetria do pecado de rebelião espelha a ameaça de Deus de destruir Israel ↔ os quarenta anos de peregrinação. No centro: "perdoei conforme a tua palavra — mas nenhum dos que me tentaram verá a terra." O pivô é a tensão entre perdão e consequência: Deus perdoa a geração — e ao mesmo tempo determina que ela não entrará. Na vida da igreja: misericórdia divina não elimina as consequências das escolhas — ela garante que há futuro para quem se arrepende, mesmo que o presente ainda carregue o peso do que foi decidido.`;
  // [176]
  if (/uma tentativa de invasao e repelida/i.test(p))
    return `A simetria desta perícope espelha os espias maus que morrem de praga ↔ Israel que avança presunçosamente e é derrotado em Hormá. No centro: Moisés avisa — "não subais, pois o Senhor não está no meio de vós." O pivô é a ausência de Deus como causa da derrota: não a fraqueza militar, mas a falta da presença divina. Na vida da igreja: iniciativa sem a presença de Deus é ativismo que derrota a si mesmo. Ir sem a nuvem é ir sozinho — e Israel descobriu isso da pior maneira possível.`;
  // [177]
  if (d.livroAbrev === 'Nm' && /pecado ofertas/i.test(p))
    return `A simetria das ofertas pelo pecado em Números 15 espelha as leis para quando habitardes na terra ↔ o pecado com mão levantada — sem perdão. No centro: o pecado involuntário da congregação — expiação coletiva. O pivô é a distinção entre involuntário e presunçoso: o que é feito inadvertidamente tem expiação disponível; o que é feito com desafio deliberado, não. Na vida da igreja: há diferença entre cair e rebelar-se. A comunidade que peca sem perceber pode ser restaurada; a que desafia abertamente a soberania de Deus colocou-se fora do alcance da expiação ordinária.`;
  // [178]
  if (/penalidade por violar o sabado/i.test(p))
    return `A simetria do caso do violador do sábado espelha o homem encontrado colhendo lenha ↔ a congregação que o apedreja fora do acampamento. No centro: o homem posto em custódia — a sentença ainda não era conhecida; Moisés consulta a Deus. O pivô é o caso-limite que a lei não havia respondido explicitamente. Na vida da igreja: a lei escrita não prevê todos os casos — há momentos em que a comunidade precisa levar o caso diante de Deus antes de decidir. Não toda decisão disciplinar tem resposta imediata no código.`;
  // [179]
  if (/franjas sobre as vestes/i.test(p))
    return `A simetria das franjas espelha o mandato de fazê-las ↔ "Eu sou o Senhor que vos tirei da terra do Egito para ser vosso Deus." No centro: "para que não sigais vossos corações e vossos olhos." O pivô é a função das franjas: não são ornamento — são dispositivo de memória para interromper o impulso. Na vida da igreja: a tradição cristã tem seus equivalentes das franjas — práticas, ritmos, símbolos que interrompem o impulso e reorientam o coração. Quando os olhos vão para o que seduz, a franja diz: lembra quem és e a quem pertences.`;
  // [180]
  if (/revolta de core/i.test(p))
    return `A simetria da revolta de Coré espelha a rebelião de 250 líderes com incensários ↔ a vara de cada tribo diante do Senhor — sinal contra os rebeldes. No centro: a terra que se abre engolindo Datã e Abirão; o fogo que consome os 250. O pivô é o contraste entre os incensários dos rebeldes e a vara que floresce: o que Deus aprova brota vida; o que Deus não aprova encontra julgamento. Na vida da igreja: o ministério reivindicado por ambição é diferente do ministério reconhecido por Deus. O incensário pode ser erguido por qualquer mão — mas só o sacerdote consagrado sobrevive diante de Deus.`;
  // [181]
  if (/arao salva o povo/i.test(p))
    return `A simetria desta perícope espelha o povo que murmura — "vós matastes o povo do Senhor" ↔ 14.700 mortos além dos de Coré. No centro: Moisés manda Arão correr com o incensário — "corre ao meio da congregação e faz expiação." O pivô é a corrida de Arão: o sacerdote que se coloca entre os mortos e os vivos — e a praga cessa. Na vida da igreja: o sacerdócio de Cristo cumpre exatamente este papel — ele se colocou entre a morte e a vida. Hebreus 7 mostra que Jesus "vive sempre para interceder": o incensário nunca para.`;
  // [182]
  if (/de arao vara/i.test(p))
    return `A simetria da vara de Arão espelha o mandato de trazer uma vara de cada tribo ↔ o clamor do povo: "pereceremos." No centro: a vara de Arão floresce, brota e produz amêndoas maduras — em uma noite. O pivô é a vida inesperada de um pedaço de madeira seca: não houve plantio, não houve rega — apenas a eleição divina expressa em florescer. Na vida da igreja: o ministério que Deus aprova floresce onde outros não esperavam. A eleição de Deus não depende de condições favoráveis — a vara seca que passa a noite no tabernáculo pode amanhecer com flores.`;
  // [183]
  if (/regulamentos sobre sacerdotes e levitas/i.test(p))
    return `A simetria dos regulamentos sacerdotais espelha a responsabilidade de Arão e seus filhos pelo santuário ↔ a instrução sobre o dízimo do melhor. No centro: o dízimo dado aos levitas pelo seu serviço na tenda — "em vez de herança." O pivô é a sustentação pelo dízimo: os levitas não herdam terra porque Deus é a herança deles, e o dízimo é o sinal material dessa realidade espiritual. Na vida da igreja: sustentar os que servem em tempo integral não é generosidade extra — é obrigação estrutural da comunidade que os comissiona.`;
  // [184]
  if (/cerimonia de bezerra vermelha/i.test(p))
    return `A simetria da bezerra vermelha espelha o sacrifício fora do acampamento ↔ o rito de purificação com água e cinzas. No centro: as cinzas guardadas como água de purificação permanente para Israel. O pivô é a duração: uma única bezerra vermelha produzia cinzas para purificações repetidas ao longo do tempo. Um sacrifício passado servia para muitos casos futuros. Na vida da igreja: Hebreus 9.13-14 contrasta as cinzas que purificam o corpo com o sangue de Cristo que purifica a consciência — o que a bezerra fazia provisoriamente, Cristo fez definitivamente.`;
  // [185]
  if (/as aguas de meriba/i.test(p))
    return `A simetria das águas de Meribá espelha a chegada ao deserto — Miriã morre ↔ o Senhor condena Moisés e Arão. No centro: a glória aparece — "fala à rocha diante dos olhos deles, e ela dará água." O pivô é a instrução descumprida: Deus disse "fala," Moisés feriu. A distinção entre falar e ferir define o acesso à terra prometida. Na vida da igreja: maturidade espiritual inclui discernir quando Deus pede graça e quando pede autoridade. Golpear onde Deus pediu para falar tem consequências reais — mesmo para quem viveu décadas de fidelidade.`;
  // [186]
  if (/passagem por edom recusada/i.test(p))
    return `A simetria da passagem recusada espelha o pedido de passagem pelo caminho real ↔ Israel que desvia sem resistir. No centro: Edom recusa com ameaça — "sairemos contra vós com a espada." O pivô é a resposta de Israel: não há contraataque — há desvio. Edom era irmão de Jacó, e Israel não provoca o que não é batalha sua. Na vida da igreja: reconhecer os limites do que não é batalha nossa é discernimento. Nem toda resistência exige confronto — às vezes o desvio é a resposta mais sábia.`;
  // [187]
  if (d.livroAbrev === 'Nm' && /a morte de arao/i.test(p))
    return `A simetria da morte de Arão espelha o anúncio divino — "Arão não entrará na terra" ↔ toda a congregação que chora trinta dias. No centro: as vestes sacerdotais sendo tiradas de Arão e colocadas em Eleazar — no cume do monte Hor. O pivô é a transferência ainda em vida: o ministério sacerdotal não morre com o sacerdote — passa para o seguinte antes que o atual parta. Na vida da igreja: sucessão bem feita acontece ainda em vida. Quem vai partir passa as vestes, e a congregação chora o que passou com gratidão enquanto reconhece quem continua.`;
  // [188]
  if (/rei arade derrotou/i.test(p))
    return `A simetria da vitória sobre Arade espelha o ataque inicial do rei cananeu ↔ o lugar chamado Hormá — destruição total. No centro: o voto de Israel — "se me deres esta vitória, consagraremos as suas cidades." O pivô é o voto antes da batalha: a vitória é prometida a Deus antes de ser conquistada, e o resultado é entregue a Ele. Na vida da igreja: consagrar o resultado antes do combate é fé radical. Não "se vencermos, daremos os louros a Deus" — mas "esta vitória é tua desde antes de começar."`;
  // [189]
  if (/o bronze serpente/i.test(p))
    return `A simetria da serpente de bronze espelha a murmuração de Israel ↔ todo picado que olhava para ela vivia. No centro: o povo confessa o pecado e Moisés intercede — o ponto de virada entre a consequência e a solução. O pivô é a confissão que precede a cura: "pecamos, pois falamos contra o Senhor e contra ti." Na vida da igreja: Jesus cita esta cena em João 3.14 — "como Moisés levantou a serpente, assim é preciso que o Filho do Homem seja levantado." A cura não vem de curar a ferida — vem de olhar para o que foi levantado. A confissão abre o olho; a fé o direciona.`;
  // [190]
  if (/a jornada a moabe/i.test(p))
    return `A simetria da jornada a Moabe espelha as etapas de marcha ↔ a chegada ao Pisga com vista para o deserto. No centro: Beer — "o poço onde o Senhor disse: darei água ao povo" — e o cântico do poço: "sobe, ó poço!" O pivô é o cântico no meio da jornada, não no destino. Na vida da igreja: adoração que só acontece quando chegamos ao destino perde a maior parte da história com Deus. Os poços no caminho merecem cântico tanto quanto as vitórias finais.`;
  // [191]
  if (/rei seom e rei ogue derrotou/i.test(p))
    return `A simetria das vitórias sobre Seom e Ogue espelha o pedido de passagem recusado ↔ Ogue que desce ao encontro de Israel em Edrei. No centro: Israel toma todas as cidades dos amorreus. O pivô é a expansão: o que começou como pedido de passagem tornou-se conquista territorial porque os inimigos escolheram o confronto. Na vida da igreja: há momentos em que o crescimento da missão acontece porque o inimigo provoca o que Deus já havia preparado para dar. A iniciativa agressiva do oponente pode ser o instrumento pelo qual Deus abre portas maiores.`;
  // [192]
  if (/balaque e balaao/i.test(p))
    return `A simetria de Balaque e Balaão espelha o medo de Balaque que manda chamar Balaão para amaldiçoar ↔ Balaão: "só falarei o que Deus me der." No centro: o anjo que bloqueia o caminho — e a jumenta que fala. O pivô é a visão da jumenta: ela vê o anjo que o profeta não vê. Deus usa o animal para reprovar a presunção do profeta contratado. Na vida da igreja: às vezes quem vê o que está à frente é quem parece menos qualificado para ver. Humildade de profeta inclui ouvir quando o improvável fala.`;
  // [193]
  if (/de balaao oraculo/i.test(p))
    return `A simetria dos oráculos de Balaão espelha "não posso amaldiçoar quem Deus não amaldiçoou" ↔ os oráculos finais contra Amaleque e Assur. No centro: o terceiro oráculo — "como são belas as tuas tendas, ó Jacó! Como os teus tabernáculos, ó Israel!" O pivô é que o maior elogio a Israel vem da boca do inimigo contratado para maldizer. Na vida da igreja: quando Deus decide abençoar, nem o profeta contratado pelo inimigo consegue segurar a bênção. O que Balaque quis como maldição virou o mais belo louvor a Israel.`;
  // [194]
  if (/adoracao de baal de peor/i.test(p))
    return `A simetria da apostasia em Peor espelha Israel que adora Baal ↔ o mandato de hostilidade contra Midiã. No centro: Fineias que transpassa o israelita e a midianita — e a praga cessa. O pivô é a intervenção radical que para o julgamento coletivo: a ação de um homem zeloso diante do que era público interrompeu o que estava destruindo o povo. Na vida da igreja: há momentos em que a passividade diante do pecado público é cumplicidade. O zelo de Fineias não era crueldade — era amor ao povo que estava sendo destruído pela conivência.`;
  // [195]
  if (/um recenseamento de novo geracao/i.test(p))
    return `A simetria do novo censo espelha o mandato após a praga — novo começo ↔ a declaração final: nenhum do primeiro censo sobreviveu, exceto Josué e Calebe. No centro: a terra a ser distribuída por sorte e proporção numérica. O pivô é a transição: a geração da incredulidade passou — o novo censo conta quem vai para a terra. Na vida da igreja: Deus cumpriu o que disse no julgamento — e cumpre o que disse na promessa. Os que creram entraram. A nova geração pronta para o que a anterior recusou.`;
  // [196]
  if (/as filhas de zelofeade/i.test(p))
    return `A simetria das filhas de Zelofeade espelha o pedido de herança para o pai sem filhos homens ↔ a lei geral de herança estendida para filhas, irmãos e tios. No centro: "o Senhor diz: a petição delas é justa — dai-lhes herança." O pivô é que Deus expande a lei ao ouvir o caso particular. Na vida da igreja: a lei de Deus não é estática quando confrontada com injustiça real. As filhas de Zelofeade ensinaram Israel que a fidelidade de uma geração pode criar justiça para as gerações seguintes.`;
  // [197]
  if (/josue nomeado moises' sucessor/i.test(p))
    return `A simetria da sucessão de Moisés espelha Deus que diz "sobe ao Abarim e morre" ↔ Moisés que impõe as mãos sobre Josué conforme ordenado. No centro: Josué, homem em quem há Espírito — "impõe tuas mãos sobre ele." O pivô é o critério da sucessão: não experiência, não parentesco — mas o Espírito de Deus que já está no homem antes da imposição das mãos. Na vida da igreja: suceder é reconhecer quem Deus já escolheu, não promover quem parece qualificado. A imposição das mãos confirma o que o Espírito já fez.`;
  // [198]
  if (/regulamentos sobre ofertas e voto/i.test(p))
    return `A simetria dos regulamentos de ofertas e votos espelha a oferta diária — dois cordeiros, manhã e tarde ↔ os estatutos sobre votos de marido e mulher. No centro: "o homem que fizer voto ao Senhor não violará sua palavra." O pivô é a integridade da palavra: entre as leis das festas e as leis dos votos familiares, o centro é a palavra dada a Deus. Na vida da igreja: votos feitos ao Senhor — no batismo, no casamento, na ordenação — não são promessas condicionais. A comunidade que cumpre seus votos honra a Deus mais do que a que multiplica promessas não cumpridas.`;
  // [199]
  if (/guerra contra midia/i.test(p))
    return `A simetria da guerra contra Midiã espelha a ordem de vingar Israel ↔ os líderes que oferecem ouro como expiação. No centro: Moisés que se ira pelos cativos poupados — purificação do exército. O pivô é que vencer militarmente não é suficiente se o que causou a apostasia não for tratado. Na vida da igreja: celebrar vitórias sem examinar o que ainda pode comprometer a missão é incompleto. O ouro que os líderes oferecem como expiação ao final é o reconhecimento de que nenhuma vitória é totalmente limpa sem exame.`;
  // [200]
  if (/conquista e divisao da transjordania/i.test(p))
    return `A simetria da Transjordânia espelha o pedido de Rúben e Gade pelas terras do leste ↔ a distribuição das cidades confirmada por Moisés. No centro: a proposta — "construiremos currais para nosso gado e cidades para nossas famílias, mas iremos à guerra com os irmãos." O pivô é a condição da herança antecipada: a terra pode ser recebida antes — mas o compromisso com os irmãos não pode ser evitado. Na vida da igreja: receber a bênção antes dos outros não cancela a responsabilidade de servir ao lado deles. Aqueles que chegaram primeiro têm obrigação especial com quem ainda está a caminho.`;
  // [201]
  if (/as etapas de de israel jornada de egito/i.test(p))
    return `A simetria do registro das etapas espelha Moisés escrevendo as saídas conforme o Senhor ordenou ↔ o acampamento final junto ao Jordão. No centro: Monte Hor — morte de Arão no quadragésimo ano. No meio de uma lista de etapas, o registro de uma morte. O pivô é o luto no meio da jornada: a geração de transição vai morrendo enquanto as etapas continuam. Na vida da igreja: a história da comunidade inclui mortes no caminho — de líderes, de sonhos, de formas de ser. Registrá-las com cuidado é honrar a jornada sem negar a perda.`;
  // [202]
  if (/ordenacoes sobre a heranca/i.test(p))
    return `A simetria das ordenações sobre a herança espelha a instrução de expulsar os habitantes e destruir os ídolos ↔ os líderes nomeados por tribo para distribuir a terra. No centro: nove tribos e meia receberão herança dentro do Jordão — as outras duas já a têm. O pivô é que a herança é distribuída por Deus antes de ser conquistada: o mapa cai por sorte antes do primeiro passo na terra. Na vida da igreja: o que Deus promete, Ele já sabe como distribuir. A logística da promessa é tão precisa quanto a promessa em si.`;
  // [203]
  if (/cidades para levitas e refugio/i.test(p))
    return `A simetria das cidades para levitas e de refúgio espelha as quarenta e oito cidades dadas aos levitas ↔ a proibição de profanar a terra com sangue. No centro: a distinção legal entre homicídio intencional e involuntário — morte com ódio prévio ou sem ele. O pivô é que a lei de proteção ao inocente depende da distinção de intenção. Na vida da igreja: justiça que não distingue intenção é crueldade disfarçada de lei. O Deus de Israel criou espaço para o acidente e a tragédia não planejada sem anular a responsabilidade pelo sangue derramado com propósito.`;
  // [204]
  if (/casamentos das herdeiras/i.test(p))
    return `A simetria do encerramento de Números espelha o temor dos líderes de Manassés — a herança das filhas passará para outra tribo ↔ as filhas de Zelofeade que obedecem e casam dentro da tribo. No centro: "nenhuma herança de Israel passará de uma tribo a outra — cada tribo guardará sua herança." O pivô é a proteção da herança pela escolha responsável: liberdade e limite coexistem. Na vida da igreja: liberdade e responsabilidade não são opostos — são complementos. As filhas obedecem sem que a lei anule sua liberdade; a herança é guardada sem que a obediência se torne opressão.`;

  // ── DEUTERONÔMIO ─────────────────────────────────────────────────────────
  // [205]
  if (/acontecimentos em horebe relembrados/i.test(p))
    return `A simetria desta abertura espelha Moisés falando no deserto do Jordão ↔ o mandato de partir e tomar a terra prometida aos patriarcas. No centro: Moisés declara esta lei — Deuteronômio é uma pregação, não um código. O pivô é que antes de entrar é preciso ouvir. O povo que está prestes a herdar a terra precisa primeiro ter a lei declarada de novo. Na vida da igreja: cada nova fase exige interpretação renovada da Palavra. O que os pais receberam no Sinai, os filhos ouvem no Jordão — e cada geração precisa que alguém declare a lei com voz própria.`;
  // [206]
  if (/nomeacao de lideres tribais/i.test(p))
    return `A simetria da nomeação de líderes espelha o peso insuportável de Moisés sozinho ↔ o princípio: "o julgamento é de Deus; o caso difícil virá a mim." No centro: "escolhei homens sábios e entendidos de cada tribo." O pivô é a sabedoria delegada: o critério não é lealdade ao líder, mas qualidade de julgamento. Na vida da igreja: a delegação de autoridade exige discernimento. O que torna a delegação sábia é que os escolhidos têm sabedoria para distinguir o justo do injusto — não apenas para executar ordens.`;
  // [207]
  if (/de israel refusal a enter a terra/i.test(p))
    return `A simetria desta perícope espelha a chegada a Cades-Barneia e o mandato — "subi, tomai" ↔ "não crestes no Senhor que ia à vossa frente." No centro: a rebelião nas tendas — "Deus nos trouxe do Egito para sermos destruídos." O pivô é o deslocamento da narrativa: o problema não era a terra nem os inimigos — era a interpretação que a incredulidade fazia da providência. Na vida da igreja: fé e incredulidade olham para os mesmos fatos e chegam a narrativas opostas. O que define a narrativa não é o que acontece — é em quem se confia para interpretá-lo.`;
  // [208]
  if (/a penalidade para de israel rebeliao/i.test(p))
    return `A simetria da penalidade espelha o juramento de Deus — "nenhum desta geração verá a terra, exceto Calebe" ↔ Israel que tenta subir por conta própria e é derrotado em Hormá. No centro: "vossos filhos, que não sabem o bem nem o mal, entrarão." O pivô é a transferência da promessa: a geração que recusou perdeu o direito — a geração seguinte receberá o que a anterior rejeitou. Na vida da igreja: a incredulidade de uma geração não cancela a fidelidade de Deus — pode apenas transferir o cumprimento para quem vier depois.`;
  // [209]
  if (/o deserto anos/i.test(p))
    return `A simetria dos anos no deserto espelha os dias em Cades ↔ o Senhor começando a dar o medo de Israel sobre as nações. No centro: a passagem por Moabe — o texto registra que toda a geração de guerra havia morrido. O pivô é a nota silenciosa: a geração julgada terminou sua sentença sem alarde — simplesmente morreu no caminho. Na vida da igreja: às vezes o julgamento divino não vem como catástrofe visível — vem como extinção gradual de quem resistiu. E quando essa geração passa, o Senhor começa a agir de novo.`;
  // [210]
  if (/defeat de rei seom/i.test(p))
    return `A simetria da derrota de Seom espelha a mensagem de paz que Moisés enviou ↔ Seom destruído com todas as suas cidades. No centro: "o Senhor disse: comecei a entregar Seom — Israel o derrota." O pivô é a iniciativa divina: Deus endureceu Seom para entregá-lo. O que parecia recusa agressiva foi o instrumento pelo qual Deus entregou o território. Na vida da igreja: nem toda porta fechada é obstáculo — algumas são a estratégia de Deus para dar mais do que a passagem que foi pedida.`;
  // [211]
  if (/a terra de rei seom e ogue/i.test(p))
    return `A simetria das terras de Seom e Ogue espelha o confronto com Ogue em Edrei ↔ a distribuição da terra a Rúben, Gade e Manassés. No centro: toda a terra além do Jordão distribuída a duas tribos e meia — antes de cruzar o rio. O pivô é a distribuição antes da conquista total: parte do povo herda antes, e por isso carrega responsabilidade de ajudar os demais. Na vida da igreja: bênção recebida antes do tempo não é graça sem custo — é convocação para serviço ao lado de quem ainda não chegou.`;
  // [212]
  if (/moises avista canaa de pisga/i.test(p))
    return `A simetria desta perícope espelha a súplica de Moisés — "deixa-me ver a boa terra" ↔ a ordem de fortalecer Josué para continuar. No centro: "o Senhor se irou com Moisés por causa de Israel — não passarás." O pivô é o peso de liderar: Moisés carrega a consequência de um pecado que aconteceu por causa do povo que ele servia. Na vida da igreja: líderes pagam preços que os outros não percebem. Ver de longe o que serviram a preparar não é fracasso — é cumprimento de um chamado que termina onde começa o de outro.`;
  // [213]
  if (/exortacao a guarda a lei/i.test(p))
    return `A simetria desta exortação espelha o mandato de não acrescentar nem diminuir ↔ "o Senhor vos declarou a aliança — os dez mandamentos." No centro: "esta sabedoria e inteligência — que povo grande que tem estatutos justos como esta lei." O pivô é a visibilidade da lei diante das nações: a obediência de Israel não é apenas piedade privada — é testemunho público da sabedoria de Deus. Na vida da igreja: a forma como a comunidade vive a lei de Deus é sua apologética mais poderosa. A ética do povo de Deus fala às nações antes de qualquer declaração verbal.`;
  // [214]
  if (/contra idolatria/i.test(p))
    return `A simetria da advertência contra a idolatria espelha "não vistes forma alguma em Horebe" ↔ "mas se buscardes o Senhor, o encontrareis." No centro: "o Senhor é fogo que consome, Deus zeloso." O pivô é o nome de Deus: zeloso. Não indiferente — apaixonado pelo relacionamento com o seu povo. A advertência contra ídolos não é restrição — é proteção de um relacionamento que Deus ama demais para compartilhar. Na vida da igreja: o ciúme de Deus não é insegurança — é expressão de amor que não admite substituto.`;
  // [215]
  if (/poderoso acts de deus/i.test(p))
    return `A simetria dos atos poderosos espelha "algum povo ouviu a voz de Deus e viveu?" ↔ "guardai os estatutos e prosperareis." No centro: "tu foste mostrado para que soubesses que o Senhor é Deus — não há outro." O pivô é o propósito da revelação: Deus não revelou seus atos para impressionar — revelou para que Israel soubesse com certeza quem Ele é. Na vida da igreja: cada experiência extraordinária de Deus tem um propósito de conhecimento. Sinais não são para serem colecionados — são para forjar certeza sobre quem é o Senhor.`;
  // [216]
  if (/cidades de refugio a leste do jordao/i.test(p))
    return `A simetria desta perícope brevíssima espelha a separação das três cidades ↔ os nomes: Bezer, Ramote, Golã. No centro: "o homicida involuntário — que matou sem inimizade prévia — fugirá a uma destas cidades e viverá." O pivô é a proteção ao inocente acidental: antes de cruzar o Jordão, Deus estabelece refúgio para quem trouxe morte sem querer. Na vida da igreja: a graça que protege o inocente involuntário é a mesma que distingue intenção de consequência. Há uma cidade de refúgio para quem matou sem planejar — porque Deus é juiz de intenções, não apenas de resultados.`;
  // [217]
  if (/transicao a segundo discurso/i.test(p))
    return `A simetria desta transição espelha "esta é a lei que Moisés pôs diante dos filhos de Israel" ↔ "toda a planície além do Jordão." No centro: "após a derrota de Seom e Ogue — a terra tomada." O pivô é o contexto que enquadra a lei: a segunda declaração da lei acontece depois de vitórias e antes da travessia — não em derrota, mas em antecipação. Na vida da igreja: a lei de Deus é sempre declarada no contexto de vitória e herança prometida — instrução para um povo prestes a receber, não fardo para um povo quebrado.`;
  // [218]
  if (d.livroAbrev === 'Dt' && /dez mandamentos/i.test(p))
    return `A simetria deuteronômica do Decálogo espelha "o Senhor fez aliança conosco em Horebe" ↔ "o Senhor falou e escreveu em duas tábuas." No centro: o sábado — com uma motivação nova: "lembrai que fostes escravos no Egito." O pivô é a diferença entre Êxodo e Deuteronômio: no Êxodo o sábado aponta para a criação; no Deuteronômio aponta para a redenção. A memória da escravidão qualifica o descanso como ato de libertação. Na vida da igreja: descansar é lembrar que Deus nos tirou do ciclo em que a identidade era produção. O sábado é a memória corporificada da redenção.`;
  // [219]
  if (/moises o mediador de de deus ira/i.test(p))
    return `A simetria desta cena espelha o povo que ouve a voz e teme ↔ "caminhai no caminho que o Senhor ordenou." No centro: o pedido do povo — "vai tu, ouve tudo o que o Senhor disser — nós ouviremos e faremos." O pivô é o pedido de mediador: o povo não recusa Deus — recusa o contato direto. Deus responde com aprovação: "o povo falou bem — quem dera observassem sempre." Na vida da igreja: desejar um mediador não é fraqueza espiritual — foi aprovado por Deus. Cristo é o mediador que o povo em Horebe antecipou: "vai tu" está cumprido definitivamente no Filho.`;
  // [220]
  if (/nao esquecer senhor/i.test(p))
    return `A simetria de Deuteronômio 6 espelha os mandamentos para guardar na terra ↔ atá-los na mão, testa e portas. No centro: "Ouve, Israel — o Senhor nosso Deus é o único Senhor. Amarás o Senhor teu Deus de todo o coração, de toda a alma e de todas as tuas forças." O pivô é o Shemá: a identidade monoteísta de Israel declarada como mandamento do amor total. Na vida da igreja: Jesus cita isso como o maior mandamento. O amor a Deus não é emoção — é orientação de todo o ser. Esse amor deve sair da câmara interna para as mãos, a testa e as portas — do pessoal para o público.`;
  // [221]
  if (/cautela contra desobediencia/i.test(p))
    return `A simetria desta perícope espelha "quando entrardes na terra e tiverdes tudo em abundância — não esqueças" ↔ "quando teu filho perguntar: responderás." No centro: "não tentareis o Senhor como em Massá." O pivô é Massá como caso paradigmático da tentação a Deus: "está o Senhor no meio de nós ou não?" — testar se Deus está presente colocando condições é o oposto da fé. Na vida da igreja: perguntar "onde está Deus?" em tom de exigência é diferente de clamar em desespero. O que Massá representa é a manipulação disfarçada de dúvida.`;
  // [222]
  if (/destruir them/i.test(p))
    return `A simetria desta perícope espelha as sete nações que virão ↔ a destruição dos seus altares e imagens. No centro: "não farás aliança com elas nem te casarás com elas." O pivô é o risco da aliança, não da guerra: o inimigo militarmente derrotado que se torna aliado social pode desviar o coração mais eficientemente do que o que ataca de frente. Na vida da igreja: o que não destruímos por aliança destrói o que somos por influência. Não há zona neutra entre consagração e contaminação quando o coração está em jogo.`;
  // [223]
  if (/deus escolhe israelitas/i.test(p))
    return `A simetria da eleição de Israel espelha "tu és povo santo — escolhido entre todos" ↔ "sereis benditos acima de todos os povos." No centro: "o Senhor guarda a aliança por mil gerações com os que o amam e guardam seus mandamentos." O pivô é a fidelidade de Deus através do tempo como garantia da aliança: não é Israel que sustenta a promessa — é o Senhor que a guarda. Na vida da igreja: a segurança do povo de Deus não depende de sua fidelidade constante, mas da fidelidade imutável de Deus. O amor que escolheu sem razão é o mesmo amor que garante sem condição.`;
  // [224]
  if (/nao ser com medo/i.test(p))
    return `A simetria de Deuteronômio 7.16-26 espelha "destruirás todos os povos — teu olho não os poupará" ↔ "queimais suas imagens — não trareis coisa abominável." No centro: "o Senhor enviará vespas — não te espantes diante deles." O pivô é o método incomum de Deus: vespas, não exércitos. A expulsão gradual é mais sustentável — Deus expulsa pouco a pouco para que a terra não seja desolada. Na vida da igreja: Deus tem métodos próprios que não precisam ser espetaculares para serem eficazes. O que parece pequeno pode estar fazendo a obra que nenhum exército faria.`;
  // [225]
  if (/de deus cuidado no deserto/i.test(p))
    return `A simetria do cuidado divino no deserto espelha os quarenta anos de jornada ↔ "é o Senhor que vos dá poder para adquirir riquezas." No centro: "entrarás numa boa terra — comerás e te fartarás e darás graças." O pivô é que a promessa da fartura está no centro da advertência sobre o passado e o futuro. Na vida da igreja: o maná do deserto foi provisório; a boa terra é permanente. Mas lembrar o maná enquanto se come da terra protege contra o esquecimento que transforma abundância em arrogância. A riqueza que esquece o maná produz a ilusão de autossuficiência.`;
  // [226]
  if (/advertencia sobre perecer/i.test(p))
    return `A simetria desta perícope espelha "passas hoje o Jordão para expulsar nações maiores" ↔ "sabei que não é pela vossa justiça — sois povo de dura cerviz." No centro: "não digas em teu coração: pela minha justiça o Senhor me deu esta terra." O pivô é a advertência contra a narrativa errada da vitória: quando a terra for conquistada, a tentação será atribuir ao merecimento o que veio de graça. Na vida da igreja: toda vitória espiritual carrega o risco de transformar o que Deus fez em prova do que somos. O antídoto é nomear a causa real: a graça de Deus e os pecados das nações — não a nossa santidade.`;
  // [227]
  if (/consequencias de se rebelar contra deus/i.test(p))
    return `A simetria desta perícope espelha "desde o Egito provocastes ao Senhor" ↔ "Taberá, Massá, Quibrote, Cades-Barneia — sempre provocastes." No centro: o bezerro de ouro — Moisés quebra as tábuas. O pivô é o padrão: a rebelião não foi acidente em Horebe — foi padrão desde o Egito. Deuteronômio obriga Israel a ouvir a lista completa. Na vida da igreja: reconhecer padrões de rebeldia é diferente de catalogar pecados isolados. Nomeá-los como padrão é o primeiro passo para quebrar o ciclo — e a intercessão de Moisés quarenta dias de joelhos é o modelo.`;
  // [228]
  if (/segundo par de tabuas/i.test(p))
    return `A simetria do segundo par de tábuas espelha o mandato de lavrar novas tábuas e fazer a arca ↔ os levitas separados para carregar a arca. No centro: "Moisés coloca as tábuas na arca — ali estão até hoje." O pivô é a permanência: a restauração da aliança após o bezerro de ouro é guardada na arca para sempre. Na vida da igreja: a aliança renovada não é reescrita da história — são as mesmas palavras escritas de novo pelo mesmo Deus. O que quebrou foi reconstruído com o mesmo conteúdo. A graça não revisa a lei — ela a restaura.`;
  // [229]
  if (/a essencia da lei/i.test(p))
    return `A simetria da essência da lei espelha "que pede o Senhor de ti?" ↔ "a ele te apegarás — ele é teu louvor e teu Deus." No centro: "o Senhor é Deus dos deuses — faz justiça ao órfão e à viúva, ama o estrangeiro." O pivô é o caráter de Deus como fundamento da ética: o que o Senhor pede de Israel é exatamente o que Ele pratica. Na vida da igreja: amar o estrangeiro porque fostes estrangeiros no Egito — a ética de Deuteronômio é sempre fundamentada na memória da experiência própria. Compaixão que nasce da memória é mais profunda do que compaixão que nasce de princípio.`;
  // [230]
  if (/grande feitos de senhor/i.test(p))
    return `A simetria dos grandes feitos espelha "amarás e guardarás sempre" ↔ "vossos olhos viram tudo — guardai os mandamentos para viverdes." No centro: "o que fez no deserto até chegardes a este lugar." O pivô é a memória do deserto como motivação para a obediência na terra. Na vida da igreja: quando a fidelidade na prosperidade falha, o remédio de Deuteronômio é sempre o mesmo: lembrar o deserto. O que Deus fez quando não tínhamos nada é a prova mais confiável de quem Ele é quando temos tudo.`;
  // [231]
  if (/bencaos e amaldicoa/i.test(p))
    return `A simetria de Deuteronômio 11.10-32 espelha "a terra não é como o Egito" ↔ bênção e maldição postas diante de vós no Ebal e no Gerizim. No centro: "ponde estas palavras no coração — ensinai-as a vossos filhos." O pivô é a transmissão como ato de fidelidade: a lei que move entre bênção e maldição só continua movendo se for ensinada às gerações seguintes. Na vida da igreja: o culto que forma a geração próxima é mais urgente do que o culto que satisfaz a presente. O que não é ensinado não é preservado.`;
  // [232]
  if (/lugar correto para a adoracao/i.test(p))
    return `A simetria desta perícope espelha "estes são os estatutos a guardar na terra" ↔ "vos alegrareis diante do Senhor com vossos filhos e levitas." No centro: "buscareis o lugar que o Senhor escolher para pôr o seu nome." O pivô é a centralização do culto como fidelidade: Israel não pode multiplicar altares conforme a conveniência local — há um lugar que Deus escolhe. Na vida da igreja: pluralidade de formas de adoração não deve significar pluralidade de objetos de adoração. O Deus que escolhe onde pôr o seu nome não muda conforme a conveniência do adorador.`;
  // [233]
  if (/um lugar prescrito para a adoracao/i.test(p))
    return `A simetria do lugar prescrito espelha "guarda-te de oferecer em qualquer lugar" ↔ "tuas ofertas consagradas levarás ao lugar que o Senhor escolher." No centro: "não podes comer o dízimo em tuas cidades — vai ao lugar escolhido." O pivô é a distinção entre o cotidiano e o consagrado: comer carne no dia a dia é permitido em qualquer lugar; o que foi consagrado exige o lugar sagrado. Na vida da igreja: a liturgia que distingue o sagrado do cotidiano não é legalismo — é pedagogia da presença. Nem tudo que é espiritual pode ser feito de qualquer forma em qualquer lugar.`;
  // [234]
  if (d.livroAbrev === 'Dt' && /massacre de animais/i.test(p))
    return `A simetria de Deuteronômio 12.29–13 espelha "não perguntes como as nações serviam seus deuses" ↔ a cidade idólatra que será destruída completamente. No centro: "teu irmão, filho, mulher, amigo que te seduzir a outros deuses — não pouparás." O pivô é que a maior ameaça à fidelidade não vem de fora — vem de dentro, dos relacionamentos mais próximos. Na vida da igreja: a sedução para o sincretismo raramente vem de estranhos — vem de quem amamos, que usa a linguagem afetiva para introduzir o que não pertence à aliança. Fidelidade a Deus pode custar relações — e Deuteronômio olha esse custo sem romantizá-lo.`;
  // [235]
  if (d.livroAbrev === 'Dt' && /^regulamentos$/i.test(p))
    return `A simetria da grande seção dos regulamentos espelha as leis de pureza e os dízimos ↔ as leis de família, propriedade e justiça. No centro: festas, juízes e reis — a ordem da comunidade santa. O pivô é que o centro da maior seção legal de Deuteronômio é a estrutura de governo do povo de Deus: como celebrar, como julgar, como governar. Na vida da igreja: as grandes questões de liturgia, justiça e autoridade não são acessórias — são o núcleo da ordem comunitária. O povo que adora mal julga mal; o povo que julga mal governa mal.`;
  // [236]
  if (/destruir amaleque/i.test(p))
    return `A simetria desta perícope brevíssima espelha "lembrai o que Amaleque vos fez no caminho" ↔ "apagarás a memória de Amaleque — não esqueças." No centro: "não temeu a Deus." O pivô é que a maldade definitória de Amaleque não foi a crueldade — foi o destemor a Deus. O que torna o mal irreparável é a ausência de qualquer freio transcendente. Na vida da igreja: o antídoto do mal sem freio é o temor a Deus — não a lei, não a força, não a cultura — mas o reconhecimento de que há um Juiz acima de todos os juízes.`;
  // [237]
  if (/primeiro frutos e dizimos/i.test(p))
    return `A simetria das primícias e dízimos espelha a confissão histórica — "meu pai era arameu errante" ↔ "ouve do céu e abençoa o teu povo." No centro: "te alegrarás com todos os bens que o Senhor te deu." O pivô é a alegria como resposta ao dom: a oferta das primícias não é apenas devolução — é ato de alegria que nasce da memória. Na vida da igreja: oferta sem memória é transação; oferta com memória é adoração. A alegria que nasce de "lembrai de onde viemos" é a mais profunda e a mais sustentável.`;
  // [238]
  if (/exortacao final/i.test(p))
    return `A simetria da exortação final espelha "hoje o Senhor te ordena cumprir estes estatutos" ↔ "para que sejas povo santo ao Senhor como ele prometeu." No centro: "o Senhor declarou hoje que sois seu povo peculiar." O pivô é a declaração mútua: Israel declara que o Senhor é seu Deus; o Senhor declara que Israel é seu povo. É uma troca de votos. Na vida da igreja: a aliança é bilateral em declaração — Deus não é apenas o Soberano que ordena; é o Parceiro que se compromete. O povo que responde não apenas obedece — declara de volta quem é seu Deus.`;
  // [239]
  if (/inscribed pedras e altar sobre monte ebal/i.test(p))
    return `A simetria das pedras inscritas espelha "erguereis grandes pedras caiadas" ↔ "ouvirás a voz do Senhor e cumprirás seus mandamentos." No centro: "escrevereis nelas todas as palavras desta lei muito claramente." O pivô é a publicidade da lei: não é segredo de iniciados — é esculpida em pedra, visível a todos. Na vida da igreja: o evangelho e a lei de Deus não são propriedade da classe sacerdotal — são declarações públicas. A Reforma retomou isso: a Bíblia em língua do povo é a pedra caiada de cada geração.`;
  // [240]
  if (/doze amaldicoa/i.test(p))
    return `A simetria das doze maldições espelha seis tribos no Gerizim para bênçãos ↔ todo o povo dizendo: amém. No centro: as doze maldições proclamadas em voz alta pelos levitas — cada uma seguida de amém do povo. O pivô é o amém: o povo não apenas ouve as maldições — as endossa. Na vida da igreja: o "amém" após uma maldição é a recusa de esconder-se da lei de Deus. Confessamos que o que Deus chama de amaldiçoado é realmente amaldiçoado — antes de sermos tentados a praticá-lo. Lucidez moral precede a obediência.`;
  // [241]
  if (/bencaos pela obediencia e advertencias contra a desobediencia/i.test(p))
    return `A simetria de Deuteronômio 28.1-46 espelha as bênçãos pela obediência ↔ "virão sobre ti como sinal e maravilha — porque não ouviste." No centro: "mas se não ouvires a voz do Senhor, virão sobre ti todas estas maldições." O pivô é o "mas": o centro exato do capítulo mais longo das bênçãos e maldições é a conjunção adversativa que muda tudo. Na vida da igreja: a escolha não está no final do capítulo — está no meio. A virada acontece no interior da decisão cotidiana, não em um momento dramático distante.`;
  // [242]
  if (/advertencia contra descendentes/i.test(p))
    return `A simetria desta advertência espelha "porque não serviste ao Senhor com alegria" ↔ "sereis levados de volta ao Egito em navios." No centro: o cerco extremo — "comereis a carne de vossos filhos." O pivô é a progressão: o que começa com falta de alegria no serviço termina no inimaginável. Na vida da igreja: o afastamento de Deus nunca fica estável — escala. O que parece pequena concessão no início pode se tornar tragédia que nenhum dos envolvidos escolheria se pudesse ver o fim. A advertência não é para assustar — é para interromper antes da descida.`;
  // [243]
  if (d.livroAbrev === 'Dt' && /alianca renovado em moabe/i.test(p))
    return `A simetria da aliança em Moabe espelha "estas são as palavras da aliança" ↔ as nações que dirão: "por que o Senhor fez assim? Porque abandonaram a aliança." No centro: "estais todos aqui diante do Senhor — e também os ausentes." O pivô é a inclusão dos que ainda não nasceram: a aliança de Moabe abarca as gerações futuras. Na vida da igreja: o batismo inclui na aliança quem ainda não pode conscientemente assinar — porque Deus faz pacto com comunidades e linhagens, não apenas com indivíduos em momento de decisão pessoal.`;
  // [244]
  if (/com coracao e alma/i.test(p))
    return `A simetria de Deuteronômio 30.1-14 espelha "quando te voltares ao Senhor do cativeiro" ↔ "este mandamento não está longe — está na tua boca e no teu coração." No centro: "o Senhor circuncidará o teu coração para que o ames com todo o coração." O pivô é a circuncisão do coração: a lei exterior aponta para uma lei interior que só Deus pode realizar. Na vida da igreja: Paulo citará Deuteronômio 30.14 em Romanos 10 — a palavra que salva está próxima. O novo nascimento é o cumprimento desta promessa: Deus faz pelo coração o que a lei não conseguia.`;
  // [245]
  if (/vida e morte/i.test(p))
    return `A simetria de Deuteronômio 30.15-20 espelha "vê que ponho diante de ti a vida e o bem, a morte e o mal" ↔ "amar ao Senhor, ouvir a sua voz, apegar-se a Ele — isso é a tua vida." No centro: "mas se o teu coração se desviar — perecereis." O pivô é que a escolha não é entre opções igualmente atraentes — é entre vida e morte real. Na vida da igreja: "escolhe a vida" é imperativo de amor, não de coerção. Indiferença não é terceira opção — é morte gradual sem o drama da recusa declarada.`;
  // [246]
  if (/josue torna-se moises' sucessor/i.test(p))
    return `A simetria da passagem de liderança espelha "tenho 120 anos — não posso mais sair e entrar" ↔ "sede fortes e corajosos — o Senhor vai convosco, não vos deixará." No centro: "o Senhor os destruirá como fez com Seom e Ogue." O pivô é a continuidade do agente: o que muda é o líder humano — o Deus que age não muda. Na vida da igreja: transições de liderança são tão estáveis quanto o Deus que permanece. A coragem que Josué precisa não vem de si — vem de quem o acompanha. Cada novo Josué serve ao mesmo Deus que serviu Moisés.`;
  // [247]
  if (/a lei a ser leu cada setimo ano/i.test(p))
    return `A simetria da leitura septena espelha Moisés escrevendo e entregando a lei ↔ "para que seus filhos aprendam a temer o Senhor todos os dias." No centro: "lerás esta lei em voz alta diante de todo Israel — homens, mulheres, crianças, estrangeiros." O pivô é a inclusividade da leitura: a lei não é apenas para os letrados ou os líderes — crianças e estrangeiros ouvem. Na vida da igreja: a Palavra de Deus lida em voz alta, regularmente, para toda a comunidade — incluindo quem não lê — é mandamento, não tradição opcional. A leitura pública forma o povo antes que qualquer ensino especializado o forme.`;
  // [248]
  if (/introducao a cantico de moises/i.test(p))
    return `A simetria da introdução ao cântico espelha "teus dias de morrer se aproximam" ↔ Moisés escreve o cântico e o Senhor manda Josué ser forte. No centro: "escrevei agora este cântico — para que seja testemunho contra eles." O pivô é o cântico como instrumento profético: não foi composto para celebração — foi preparado para o momento do julgamento futuro. Na vida da igreja: a Escritura não é apenas instrução para o presente — é testemunho para o julgamento futuro. A Palavra de Deus que a comunidade ignorou ainda estará lá quando for necessária.`;
  // [249]
  if (/moises prepares a recitar seu cantico/i.test(p))
    return `A simetria desta perícope espelha Moisés acabando de escrever a lei ↔ "sei que após minha morte vos corrompereis." No centro: "ajuntai todos os anciãos e líderes — farei testemunhar contra vós." O pivô é o lúcido fim de Moisés: ele sabe o que virá, nomeia claramente e ainda assim faz o que lhe compete — convoca, escreve, fala. Na vida da igreja: um líder que conhece as limitações de quem serve não desiste de servir. Faz o que compete antes de partir: convoca os anciãos, coloca a lei ao lado da arca, escreve o cântico.`;
  // [250]
  if (d.livroAbrev === 'Dt' && /o cantico de moises/i.test(p))
    return `A simetria do cântico de Moisés espelha "o Senhor é a Rocha — suas obras são perfeitas" ↔ "Eu sou Ele, não há outro Deus além de mim." No centro: "o Senhor vê a rejeição de Israel — mas poupa por causa dos inimigos." O pivô é a razão da misericórdia: Deus não poupa Israel por sua fidelidade — poupa para que os inimigos não atribuam a si mesmos o que foi julgamento divino. A misericórdia tem um componente apologético. Na vida da igreja: a preservação do povo de Deus não é apenas por amor ao povo — é pelo nome de Deus diante das nações. Ser preservado não é prova de merecimento — é glória para Quem preserva.`;
  // [251]
  if (/moises' morte predito/i.test(p))
    return `A simetria da morte predita espelha "estas palavras são vossa vida" ↔ "verás a terra de longe — mas não entrarás." No centro: "sobe ao monte Nebo e vê Canaã — e morre lá como Arão." O pivô é a simultaneidade: a lei é vida para Israel e morte de Moisés. As mesmas palavras que sustentam o povo selam o destino do mediador. Na vida da igreja: às vezes o que sustenta outros não nos poupa de pagar o preço do serviço. Moisés morreu fora da terra que seus sermões prepararam o povo para herdar. Fidelidade ao chamado não garante a colheita pessoal.`;
  // [252]
  if (/moises' bencao sobre israel/i.test(p))
    return `A simetria da bênção de Moisés espelha as bênçãos sobre Rúben, Judá e Levi ↔ "não há ninguém como o Deus de Jesurum — feliz és, Israel!" No centro: a bênção sobre Benjamim, José e Efraim — "o amado do Senhor habitará em segurança." O pivô é a bênção específica para cada tribo: não uma bênção genérica sobre o povo, mas palavras particulares que conhecem cada herança e cada chamado. Na vida da igreja: Deus não abençoa em série — cada pessoa recebe a bênção no seu nome, em acordo com quem ela é. A bênção que conhece o nome transforma.`;
  // [253]
  if (/israel lamenta a morte de moises/i.test(p))
    return `A simetria do encerramento de Deuteronômio espelha Moisés subindo ao Pisga — o Senhor lhe mostra toda a terra ↔ "nunca mais houve em Israel profeta como Moisés." No centro: "Moisés tinha cento e vinte anos quando morreu — seus olhos não se escureceram." O pivô é a integridade até o fim: os olhos que viram a glória de Deus na fenda da rocha chegaram intactos ao cume do Pisga. Na vida da igreja: fidelidade não gasta o que é de Deus — preserva. A vida vivida na intimidade com Deus chega ao fim sem escurecer os olhos que O viram. O legado de Moisés não é seu sepulcro — é Josué cheio do Espírito que ele passou adiante.`;

  // Josué
  // [254]
  if (/de deus comissao a josue/i.test(p))
    return `A simetria da comissão a Josué espelha "sê forte e corajoso" (A) ↔ "sê forte e corajoso" (A') — eco que envolve toda a perícope. No centro: Josué interpela as tribos do Jordão Oriental sobre o cumprimento do seu encargo. O pivô é que a coragem não é autogerada — é convocada por Quem envia; o eco do versículo 9 confirma o versículo 6 porque o mesmo Deus fala os dois. Na vida da igreja: a coragem ministerial precisa de repetição não por dúvida de Deus, mas pela fraqueza de quem serve. Lideres que retornam ao versículo da comissão não estão em crise — estão se abastecendo. A simetria ensina que a missão começa e termina na voz de Deus, não na disposição do servo.`;
  // [255]
  if (/espioes enviado a jerico/i.test(p))
    return `A simetria dos espiões em Jericó espelha Josué enviando os dois (A) ↔ os espiões retornam com relatório de fé (A'). No centro: Raabe confessa "o Senhor vos deu esta terra" — a mulher de fora enuncia o que Israel ainda não viveu. O pivô é o fio escarlate: sinal de aliança dado a uma gentil antes que Jericó caia, mostrando que a graça de Deus precede a conquista. Na vida da igreja: os "de fora" frequentemente enxergam o que o povo de Deus demora a ver. Raabe não aguardou confirmação — ela confessou com base no relato. A fé que age antes do cumprimento é a fé que a Bíblia celebra.`;
  // [256]
  if (/israel atravessa jordao/i.test(p))
    return `A simetria da travessia do Jordão espelha as instruções do acampamento (A) ↔ os sacerdotes permanecem até o povo completar (A'). No centro: a arca entra nas águas e as águas param — o sinal precede a travessia. O pivô é a prioridade da arca: não a coragem do povo, não a estratégia de Josué, mas a presença do Senhor abrindo caminho. Na vida da igreja: quando a presença de Deus vai à frente, o impossível recua. A travessia em terra seca não é mérito — é testemunho. Cada batismo recorda que passamos pelo que era intransponível por causa de Quem vai à frente.`;
  // [257]
  if (/doze pedras coloca em gilgal/i.test(p))
    return `A simetria das doze pedras em Gilgal espelha a ordem do memorial (A) ↔ as pedras erguidas como sinal permanente (A'). No centro: Josué é exaltado como Moisés foi — a continuidade do chamado é confirmada. O pivô é a pergunta futura: "quando vossos filhos perguntarem, contai-lhes." O memorial não é para os que viram — é para os que ainda nascerão. Na vida da igreja: os rituais litúrgicos — a Ceia, o batismo, as festas — são pedras de Gilgal: respostas preparadas para perguntas de gerações que ainda não existem. Liturgia é memória corporativa que carrega quem ainda não se lembra.`;
  // [258]
  if (/novo geracao circuncidado/i.test(p))
    return `A simetria da circuncisão da nova geração espelha a ordem divina (A) ↔ comer do produto da terra prometida (A'). No centro: "hoje removi de vós a vergonha do Egito" — Gilgal como lugar de restauração da identidade. O pivô é a geração do deserto: eles morreram sem o sinal da aliança. A nova geração entra na terra com o sinal antes do fruto. Na vida da igreja: há marcas de identidade que a geração anterior não recebeu — e cabe à nova geração não omitir o que foi negligenciado. Pertencer ao povo de Deus não é automático; é marcado, confirmado, celebrado.`;
  // [259]
  if (d.livroAbrev === 'Js' && /a pascoa/i.test(p))
    return `A simetria da Páscoa em Gilgal espelha a celebração (A) ↔ a transição da provisão do deserto (A'). No centro: o maná cessa — o fim de uma era é o começo de outra. O pivô é que Deus provisiona de formas diferentes em estações diferentes: o maná foi para o deserto; o produto da terra é para quem já entrou. Na vida da igreja: há provisões de Deus específicas para cada estação. Quando uma forma de provisão cessa, não é abandono — é troca de registro. Discernir em que estação se está é essencial para receber o que Deus está dando agora.`;
  // [260]
  if (/de josue visao/i.test(p))
    return `A simetria da visão de Josué espelha o homem com espada desembainhada (A) ↔ "tira o calçado — este lugar é sagrado" (A'). No centro: "como comandante do exército do Senhor vim" — nem aliado, nem inimigo; a pergunta estava errada. O pivô é a recusa de lados: Deus não está "a favor de Josué" no sentido tribal — Josué precisa posicionar-se sob o comando de Deus. Na vida da igreja: a questão não é se Deus está do nosso lado — é se estamos do lado de Deus. Todo projeto que começa com "Deus nos apoia" precisa primeiro perguntar: estamos sob o Seu comando?`;
  // [261]
  if (/jerico levado e destruiu/i.test(p))
    return `A simetria de Jericó destruída espelha Jericó fechada (A) ↔ Raabe poupada, o resto destruído (A'). No centro: a marcha de sete dias com a arca — obediência prolongada sem resultado visível. O pivô é que o plano de Deus não pede compreensão — pede fidelidade até o último dia. Raabe, poupada dentro da destruição geral, é a exceção da graça no meio do julgamento. Na vida da igreja: a obediência que não vê resultado no sexto dia precisa chegar ao sétimo. E há sempre uma Raabe: alguém que o julgamento poupar por causa da aliança — mesmo dentro do que parecia condenado.`;
  // [262]
  if (/maldicao de josue/i.test(p))
    return `A simetria da maldição de Josué espelha a pronúncia da maldição (A) ↔ "o Senhor estava com Josué" (A'). No centro: "com o primogênito lançará os fundamentos" — a maldição é específica e profética. O pivô é que a maldição não é raiva — é salvaguarda: Jericó não pode ser reconstruída porque carrega o sinal do anátema. Na vida da igreja: há lugares que a Escritura declara interditados não por crueldade, mas por proteção. Ignorar advertências proféticas não as anula — as cumpre. A maldição que Hiel desprezou séculos depois (1Rs 16.34) confirmou o que Josué pronunciou.`;
  // [263]
  if (/o pecado de aca e punicao/i.test(p))
    return `A simetria do pecado de Acã espelha o anátema violado (A) ↔ Acã apedrejado no vale de Acor (A'). No centro: Josué e os anciãos prostram-se diante da arca — liderança que recorre à presença antes de buscar culpados. O pivô é o "anátema": o que pertence a Deus não pode ser privatizado sem consequências comunitárias. Acã não apenas pecou — contaminou o acampamento. Na vida da igreja: o pecado escondido de um membro não é assunto privado quando a comunidade avança junta. A transparência diante de Deus não é opção de piedade pessoal — é responsabilidade comunitária. Acor se tornará "porta de esperança" (Os 2.15) — o lugar da punição é o lugar da restauração futura.`;
  // [264]
  if (/ai capturou por um estratagema e destruiu/i.test(p))
    return `A simetria de Ai destruída espelha "não temas" (A) ↔ Ai completamente destruída (A'). No centro: Josué estende o dardo — o sinal da vitória que sustenta a batalha enquanto a emboscada se executa. O pivô é o dardo estendido: Josué não abaixa o braço antes de a vitória estar completa — evocação de Moisés com as mãos erguidas no Refidim. Na vida da igreja: há lutas que requerem postura sustentada de intercessão até o último inimigo ser derrotado. O sinal não é performático — é parte da batalha. Quem sustenta a postura de fé até o fim, não por efeito estético, mas por confiança real, participa da vitória.`;
  // [265]
  if (/josue renova a alianca/i.test(p))
    return `A simetria da aliança no Ebal espelha o altar erguido (A) ↔ Josué lendo toda a lei — bênçãos e maldições (A'). No centro: a lei gravada nas pedras — publicidade permanente da palavra de Deus. O pivô é que a lei não é privada: gravada em pedra, lida em voz alta para todo Israel, incluindo crianças e estrangeiros. Na vida da igreja: a Palavra de Deus proclamada publicamente, em toda a sua extensão — incluindo as maldições — é ato de amor, não de intimidação. Omitir o que desconforta não é misericórdia — é privação.`;
  // [266]
  if (/gibeonitas salvar eles mesmos por ardil/i.test(p))
    return `A simetria dos gibeonitas espelha os reis de Canaã se unindo contra Israel (A) ↔ gibeonitas tornados servos perpétuos mas poupados (A'). No centro: Israel firma aliança sem consultar o Senhor — o erro que nenhuma estratégia pode reparar depois. O pivô é a consulta omitida: o texto não critica a compaixão de Israel, mas a precipitação. Decisões irreversíveis exigem consulta ao Senhor antes, não depois. Na vida da igreja: a pressa nas alianças — ministeriais, matrimoniais, institucionais — produz vínculos que depois não podem ser desfeitos sem dano. O que Josué aprendeu com os gibeonitas é que a aparência de fraqueza pode ser estratégia de sobrevivência.`;
  // [267]
  if (/cinco reis derrotou/i.test(p))
    return `A simetria dos cinco reis derrotados espelha os reis atacando Gibeom (A) ↔ a campanha completa ao sul (A'). No centro: o sol para — o dia mais longo da história, registrado como resposta à oração de Josué. O pivô é que o cosmos obedece ao Deus que ordena a batalha: sol e lua suspendem o ritmo para que a justiça se complete. Na vida da igreja: quando Deus convoca uma missão, Ele providencia o tempo necessário para executá-la. A oração audaciosa de Josué — pedir ao sol que pare — nasce de quem já viu o Jordão se partir. Fé audaciosa não é ingenuidade; é memória de milagres anteriores.`;
  // [268]
  if (/unido reis de do norte canaa derrotou/i.test(p))
    return `A simetria dos reis do norte derrotados espelha a mobilização de Jabim (A) ↔ toda a região conquistada (A'). No centro: Josué ataca de surpresa — a estratégia de Deus é revelar o plano antes da batalha: "amanhã eu os entregarei." O pivô é o "amanhã": Deus dá os inimigos antes que a batalha aconteça. A vitória é declarada no dia anterior — o ataque de Josué é execução de uma promessa já dada. Na vida da igreja: há batalhas que precisam ser vencidas primeiro no espírito da promessa antes de serem travadas no campo. Quem age antes do "amanhã" do Senhor tropeça; quem aguarda o timing divino e age quando ele chegou — triunfa.`;
  // [269]
  if (/resumo de de josue conquistas/i.test(p))
    return `A simetria do resumo das conquistas espelha todo o território conquistado (A) ↔ "a terra descansou — repartida por herança" (A'). No centro: os anaquins exterminados de toda a terra — os gigantes que paralisaram a geração do deserto agora foram removidos. O pivô é o descanso: o objetivo da conquista não é guerra permanente, mas herança habitada em paz. Na vida da igreja: o propósito da luta espiritual não é o conflito perpétuo — é a posse pacífica do que Deus prometeu. Quando os anaquins — os medos que paralisaram gerações — são removidos, a terra descansa. O descanso é herança, não ausência de desafio.`;
  // [270]
  if (/os reis conquistou por moises e josue/i.test(p))
    return `A simetria da lista dos reis conquistados espelha os reis do Jordão Oriental — por Moisés (A) ↔ os 31 reis por Josué (A'). No centro: o rei de Jericó e de Ai — os primeiros da lista ocidental, fundação de toda a campanha. O pivô é a continuidade entre Moisés e Josué: a lista abarca os dois líderes porque a missão é uma só. Na vida da igreja: a obra de Deus não recomeça do zero com cada geração de líderes — ela continua. Josué não apaga Moisés; os dois formam um único registro. Quem lidera agora está escrevendo um capítulo que começou antes de si e continuará depois.`;
  // [271]
  if (/as partes de canaa ainda nao conquistadas/i.test(p))
    return `A simetria das terras não conquistadas espelha "Josué é velho, resta muito" (A) ↔ "a terra será repartida como herança" (A'). No centro: Deus promete expulsar os habitantes — a promessa não depende da longevidade de Josué. O pivô é que a missão incompleta não é falha — é herança deixada para as próximas gerações receberem. Na vida da igreja: líderes que envelhecem sem ter completado tudo o que começaram não são fracassos — são fiéis ao que Deus lhes confiou para sua estação. O restante é promessa para a geração seguinte, não vergonha para a geração atual.`;
  // [272]
  if (/o territorio a leste do jordao/i.test(p))
    return `A simetria do território leste espelha as tribos recebendo herança de Moisés (A) ↔ "o Senhor é a herança dos levitas" (A'). No centro: Moisés destruiu os reis e expulsou — o passado é fundamento do presente. O pivô é o contraste levítico: enquanto as tribos recebem terra, os levitas recebem o próprio Senhor. Na vida da igreja: nem toda herança é territorial. Quem foi chamado ao ministério da Palavra recebe algo mais precioso do que posses: a presença de Deus como herança. A vida levítica é chamada a demonstrar que o Senhor é suficiente.`;
  // [273]
  if (/o territorio de ruben, gade e manasses/i.test(p))
    return `A simetria da herança de Rúben, Gade e Manassés espelha a herança de Rúben (A) ↔ "o Senhor é a herança deles" — os levitas (A'). No centro: a meia tribo de Manassés recebe a herança central entre os do leste. O pivô é a repetição do princípio levítico: no encerramento de cada lista tribal, o texto recorda que os levitas não têm terra. Na vida da igreja: a distinção entre herança material e herança espiritual não é desvantagem para os levitas — é clareza vocacional. Quem serve ao Senhor sem acumulação de terra demonstra que há herança que não pode ser confiscada.`;
  // [274]
  if (/a distribuicao de territorio oeste de jordao/i.test(p))
    return `A simetria da distribuição oeste espelha as heranças por sorte conforme Moisés (A) ↔ "Israel repartiu conforme o Senhor ordenou" (A'). No centro: os filhos de José formam duas tribos — o número doze é preservado mesmo excluindo os levitas. O pivô é a obediência estrutural: a divisão não é resultado de negociação humana, mas de sorte diante do Senhor — forma de consulta divina. Na vida da igreja: quando decisões sobre "quem recebe o quê" são submetidas ao Senhor, o ciúme é reduzido. A sorte de Josué não era acaso — era Deus distribuindo o que era Seu.`;
  // [275]
  if (/o territorio de juda/i.test(p))
    return `A simetria do território de Judá espelha Calebe reivindicando Hebrom — "sou tão forte como antes" (A) ↔ cidades de Judá — Jerusalém não expulsa (A'). No centro: os limites precisos do território de Judá — herança demarcada. O pivô é Calebe: oitenta e cinco anos, a mesma força que o Senhor lhe deu no deserto. Na vida da igreja: os que mantiveram fé durante quarenta anos de deserto chegam à terra com força não gastada. A fé sustentada não envelhece — ela matura. Calebe pediu a montanha dos anaquins, não o vale fácil.`;
  // [276]
  if (/o territorio de efraim e manasses/i.test(p))
    return `A simetria do território de Efraim e Manassés espelha os limites de Efraim (A) ↔ as tribos de José pedindo mais terra — Josué as desafia ao bosque (A'). No centro: a petição das filhas de Zelofeade — herança das mulheres dentro do sistema patriarcal. O pivô é o desafio de Josué: se a herança parece pequena, derruba o bosque e toma mais. Deus deu a terra; o trabalho de tomar é da tribo. Na vida da igreja: há promessas que estão disponíveis mas requerem desbravamento. Reclamar da porção pequena quando há bosque não desmatado é desperdício da graça recebida.`;
  // [277]
  if (/os territorios das tribos restantes/i.test(p))
    return `A simetria dos territórios das tribos restantes espelha a tenda do encontro armada em Siló (A) ↔ Josué recebendo sua porção pessoal (A'). No centro: Benjamim recebe herança por sorte em Siló — a distribuição acontece diante da presença de Deus. O pivô é Siló: o lugar onde a tenda é estabelecida define o centro geográfico e teológico da distribuição. Na vida da igreja: quando as decisões de distribuição acontecem diante da presença de Deus, o resultado carrega peso diferente. Siló não é burocracia — é altar. A partilha justa nasce da adoração, não apenas da equidade.`;
  // [278]
  if (d.livroAbrev === 'Js' && /as cidades de refugio/i.test(p))
    return `A simetria das cidades de refúgio espelha a ordem divina (A) ↔ "para que não morra antes do julgamento" (A'). No centro: seis cidades designadas — três a cada lado do Jordão, igualmente acessíveis para todo Israel. O pivô é a acessibilidade: o refúgio precisa estar ao alcance de quem foge — não pode ser tão distante que o vingador alcance antes. Na vida da igreja: a graça de Deus não é refúgio teórico — é geograficamente real, próximo o suficiente para quem corre. A comunidade cristã é cidade de refúgio quando está próxima o suficiente dos que fogem de seus próprios erros.`;
  // [279]
  if (/cidades distribuido a levitas/i.test(p))
    return `A simetria das cidades para levitas espelha o pedido conforme a promessa de Moisés (A) ↔ "nada falhou de todas as boas promessas do Senhor" (A'). No centro: quarenta e oito cidades distribuídas a todas as famílias levíticas — presença ministerial espalhada por todo o território. O pivô é a presença distribuída: os levitas não vivem concentrados — estão em todas as tribos. A instrução e o sacerdócio são descentralizados por design. Na vida da igreja: o ministério da Palavra não pode ser monopólio de um centro — precisa alcançar toda a herança. "Nada falhou" é o testemunho de Deus sobre Suas próprias promessas.`;
  // [280]
  if (/as tribos do leste retornam a seu territorio/i.test(p))
    return `A simetria do retorno das tribos do leste espelha Josué convocando — "cumpristes vosso encargo" (A) ↔ as tribos retornando com grandes riquezas (A'). No centro: "amai ao Senhor — andai em todos os seus caminhos" — o encargo deixado para a vida após o cumprimento da missão. O pivô é que o mandato continua além da missão pontual: cumprida a guerra, o chamado ao amor e obediência permanece. Na vida da igreja: há uma tendência de dispensar o discipulado depois que a "missão" foi cumprida. Josué recorda que a missão cotidiana de amar a Deus não tem fase de término.`;
  // [281]
  if (/o altar das tribos do leste/i.test(p))
    return `A simetria do altar do testemunho espelha as tribos construindo o altar (A) ↔ o altar chamado "Testemunho" (A'). No centro: a explicação — "não para holocaustos, mas como testemunho para vossas gerações." O pivô é a intenção declarada: o que parecia apostasia era memorial. O mal-entendido quase resultou em guerra. Na vida da igreja: ações que parecem desvio nem sempre são — e confrontar antes de perguntar produz guerra desnecessária. O modelo das tribos do leste é a declaração pública da intenção antes que a acusação solidifique. Transparência evita conflito.`;
  // [282]
  if (/josue exorta o povo/i.test(p))
    return `A simetria da exortação de Josué espelha a convocação de Israel (A) ↔ "toda a boa palavra foi cumprida — a maldição também virá" (A'). No centro: "um homem perseguirá mil — o Senhor luta por vós." O pivô é a assimetria da guerra com Deus: não é questão de número, mas de aliança. A lógica de "um contra mil" não é entusiasmo humano — é aritmética da fidelidade divina. Na vida da igreja: minorias que avançam em fidelidade não estão em desvantagem numérica — estão sob promessa. E a advertência do verso final é igualmente simétrica: a mesma Palavra que cumpriu a bênção cumprirá a maldição se a aliança for abandonada.`;
  // [283]
  if (d.livroAbrev === 'Js' && /as tribos renova a alianca/i.test(p))
    return `A simetria da renovação da aliança em Siquém espelha a convocação diante de Deus (A) ↔ a aliança renovada com pedra de testemunho (A'). No centro: "escolhei hoje a quem servireis" — a escolha é colocada antes que a resposta seja dada. O pivô é que Josué coloca a escolha sem pressionar a resposta: o povo poderia dizer não. A pedra de testemunho é outra Gilgal — memorial de uma decisão, não de um milagre. Na vida da igreja: cada geração precisa escolher por si mesma, em Siquém própria, a quem serve. E a declaração de Josué — "quanto a mim e à minha casa" — é modelo de liderança que influencia sem coagir.`;
  // [284]
  if (/morte de josue e eleazar/i.test(p))
    return `A simetria da morte de Josué e Eleazar espelha a morte de Josué com 110 anos (A) ↔ Eleazar enterrado em Gibeá de Finéias (A'). No centro: os ossos de José enterrados em Siquém — a promessa feita no Egito cumprida séculos depois. O pivô é José: no encerramento do livro de Josué, o cumprimento de uma promessa do Gênesis. A herança da terra inclui os ossos dos que esperaram. Na vida da igreja: Deus cumpre promessas que atravessam gerações — e o cumprimento é registrado onde ninguém esperava. A morte de líderes fiéis não é o fim da história: é a conclusão de um capítulo e a confirmação de que Deus nunca esqueceu o que prometeu.`;

  // Juízes
  // [285]
  if (/de israel fracasso a completo conquista de canaa/i.test(p))
    return `A simetria do fracasso de Israel espelha Judá e Simeão com vitórias iniciais (A) ↔ Dã recuado para a montanha (A'). No centro: Bete-El tomado por traição interna — não pela força, mas pela informação de um desertor. O pivô é a descida progressiva: a narrativa começa com vitórias parciais e termina com regressão. Cada tribo falha um pouco mais do que a anterior. Na vida da igreja: o compromisso parcial com a santidade não estabiliza — regride. Cada concessão ao que deveria ser expulso cria raízes que a próxima geração pagará. O mapa do fracasso de Israel é lição de anatomia espiritual: a obediência incompleta não é virtude moderada, é início de apostasia.`;
  // [286]
  if (/de israel infidelidade/i.test(p))
    return `A simetria da infidelidade de Israel espelha o anjo em Boquim (A) ↔ Israel vivendo entre cananeus e servindo seus deuses (A'). No centro: o ciclo dos juízes — o padrão recorrente: pecado, opressão, clamor, libertação, recaída. O pivô é que o ciclo é descrito não como história passada, mas como lição metodológica: cada juiz executará o mesmo padrão. Na vida da igreja: reconhecer o padrão é a metade da libertação. O ciclo não é inevitável — é interrompido quando o clamor é acompanhado de arrependimento genuíno, não apenas de desconforto. Boquim — "o lugar do choro" — é onde o ciclo pode ser quebrado.`;
  // [287]
  if (/otoniel/i.test(p))
    return `A simetria de Otoniel espelha Israel fazendo o mal (A) ↔ a terra descansando quarenta anos (A'). No centro: Otoniel levantado — o Espírito veio sobre ele. O pivô é a brevidade: o primeiro juiz recebe a narrativa mais condensada. O Espírito vem, a vitória acontece, a terra descansa. Sem drama, sem vacilação, sem desvios. Na vida da igreja: a fidelidade silenciosa de Otoniel é modelo que o texto preserva precisamente por não ter história complicada. Não é a narrativa mais dramática — é a mais limpa. Há ministérios que Deus usa sem que a história deles caiba num romance.`;
  // [288]
  if (/eude/i.test(p))
    return `A simetria de Eúde espelha dezoito anos de opressão de Moabe (A) ↔ Moabe subjugado, terra descansando oitenta anos (A'). No centro: Eúde mata Eglom no aposento privado — a cena mais íntima e mais brutal de Juízes. O pivô é a espada de dois gumes escondida na coxa direita: Eúde usa a surpresa e a ineficiência dos servos de Eglom. Na vida da igreja: Deus usa estratégias que não constam nos manuais de guerra. Eúde não tinha exército — tinha coragem e clareza de missão. O maior período de descanso em Juízes (oitenta anos) nasce da ação mais solitária registrada no livro.`;
  // [289]
  if (/sangar/i.test(p))
    return `A simetria de Sangar espelha o seu nome e origem (A) ↔ "e também livrou Israel" (A'). No centro: feriu seiscentos filisteus com uma aguilhada de bois. O pivô é o instrumento: não uma espada, não um exército — uma ferramenta agrícola. Na vida da igreja: Sangar não tinha armamento militar — tinha o que estava em sua mão. A libertação de Israel veio de um agricultor com o instrumento do seu trabalho diário. O que está na mão de cada pessoa, quando consagrado ao Senhor, pode liberar uma nação. Deus não pede ferramentas extraordinárias — pede coragem de usar o ordinário.`;
  // [290]
  if (/debora e baraque/i.test(p))
    return `A simetria de Débora e Baraque espelha Jabim oprimindo por vinte anos (A) ↔ Jabim destruído (A'). No centro: "o Senhor entregará Sísera nas mãos de uma mulher" — a profecia muda a narrativa antes da batalha. O pivô é a recusa de Baraque: ele vai apenas se Débora for. A consequência é que a honra da vitória passa para Jaele. Na vida da igreja: a hesitação diante do chamado não cancela a missão de Deus — transfere a glória. Débora não repreende Baraque com amargura — declara as consequências com clareza. O Senhor cumpre Seu propósito com ou sem a coragem dos que hesitam.`;
  // [291]
  if (d.livroAbrev === 'Jz' && /o cantico de debora/i.test(p))
    return `A simetria do Cântico de Débora espelha "bendizei ao Senhor — líderes que se ofereceram" (A) ↔ "mãe de Sísera esperando em vão" (A'). No centro: os astros lutaram contra Sísera — o cosmos se mobiliza para a batalha do Senhor. O pivô é o contraste final: enquanto Débora e Baraque cantam vitória, a mãe de Sísera aguarda à janela o que nunca chegará. Na vida da igreja: o mesmo evento é vitória para uns e devastação para outros. O cântico não é cruel — é honesto sobre o que o julgamento de Deus significa para os dois lados. A janela vazia de Sísera é lembrete de que o lado errado da batalha de Deus tem consequências reais.`;
  // [292]
  if (/o chamado de gideao/i.test(p))
    return `A simetria do chamado de Gideão espelha sete anos de opressão de Midiã (A) ↔ o altar "O Senhor é paz" (A'). No centro: o anjo chama Gideão debaixo do carvalho — "homem valente" dito a quem está escondido. O pivô é o nome antes da realidade: Deus chama Gideão pelo que ele se tornará, não pelo que está fazendo no momento. Na vida da igreja: Deus frequentemente fala ao chamado com a linguagem do destino, não da circunstância presente. "Homem valente" pronunciado sobre quem debulha trigo escondido não é ironia — é profecia. O chamado de Deus cria o que nomeia.`;
  // [293]
  if (/gideao destroi o altar de baal/i.test(p))
    return `A simetria da destruição do altar espelha a ordem divina de derrubar o altar do pai (A) ↔ "que Baal se defenda" — o nome Jerubaal (A'). No centro: os homens da cidade exigem a morte de Gideão. O pivô é o pai de Gideão defendendo o filho: "se Baal é deus, defenda-se por si mesmo." A lógica irônica do pai vira teologia. Na vida da igreja: ídolos que precisam ser defendidos por seus adoradores não são deuses. O verdadeiro Deus defende a si mesmo. O nome Jerubaal — "que Baal contenda" — se tornará testemunho da impotência do ídolo toda vez que Gideão for chamado.`;
  // [294]
  if (/o sinal do velo/i.test(p))
    return `A simetria do sinal do velo espelha os midianitas reunidos e o Espírito revestindo Gideão (A) ↔ o sinal inverso confirmando o chamado (A'). No centro: o velo cheio de orvalho — o sinal pedido é dado. O pivô é a paciência de Deus com a dúvida: dois sinais contraditórios atendidos sem repreensão. Na vida da igreja: Deus é mais paciente com nossas dúvidas do que imaginamos — mas a mesma paciência que atende ao pedido do velo reduz o exército de 32 mil para 300. A confirmação não cancela o custo da obediência. O sinal dado é prévia da batalha; a batalha pequena é prévia da glória de Deus.`;
  // [295]
  if (/gideao surpreende e derrota os midianitas/i.test(p))
    return `A simetria da derrota dos midianitas espelha o exército reduzido de 32.000 para 300 (A) ↔ Efraim capturando e matando os príncipes (A'). No centro: "cada espada para o Senhor e para Gideão" — os cântaros quebrados e as tochas reveladas. O pivô é a redução: Deus não quer 32.000 nem 10.000 — quer 300. Na vida da igreja: a estratégia de Deus frequentemente ofende o senso militar comum. Quando a vitória vier com trezentos homens e cântaros quebrados, a glória não terá endereço humano. A redução do exército não é fraqueza — é clareza teológica antecipada.`;
  // [296]
  if (/gideao e efraim/i.test(p))
    return `A simetria de Gideão e Efraim espelha a contenda de Efraim (A) ↔ a ira acalmando (A'). No centro: a resposta suave de Gideão — "o rebusco de Efraim é melhor que a vindima de Abiezer." O pivô é a sabedoria da resposta: Gideão poderia ter reivindicado autoridade e criado guerra civil. Em vez disso, honrou o que Efraim fez. Na vida da igreja: conflitos ministeriais que poderiam dividir comunidades são desarmados por quem escolhe honrar em vez de reivindicar. A resposta suave que quebra o osso (Pv 25.15) não é fraqueza — é a mais sofisticada forma de liderança.`;
  // [297]
  if (/de gideao vinganca/i.test(p))
    return `A simetria da vingança de Gideão espelha Sucote recusando provisão (A) ↔ Gideão matando os dois reis (A'). No centro: os anciãos de Sucote punidos com espinhos — a recusa de hospitalidade cobrada com rigor. O pivô é a memória: Gideão prometeu voltar. A ameaça feita a Sucote e Penuel não foi esquecida. Na vida da igreja: há um lado da justiça de Deus que recorda o que foi prometido — e cumpre. Sucote apostou que Gideão não voltaria. A punição com espinhos não é crueldade arbitrária — é o preço exato da recusa de solidariedade com o povo de Deus em luta.`;
  // [298]
  if (/de gideao idolatria/i.test(p))
    return `A simetria da idolatria de Gideão espelha Israel pedindo a Gideão que reine (A) ↔ a terra tendo paz nos dias de Gideão (A'). No centro: Gideão faz éfode em Ofra — Israel se prostitui diante dele. O pivô é a contradição: Gideão recusa o reino mas fabrica um objeto de adoração. Ele nega o título mas aceita o papel. Na vida da igreja: é possível recusar o poder formal enquanto se exerce o controle informal por meio de objetos, símbolos ou estruturas que centralizam a devoção de outros. O éfode de Gideão não foi construído com má intenção — mas tornou-se armadilha. Intenção boa não protege contra consequências idolátricas.`;
  // [299]
  if (/morte de gideao/i.test(p))
    return `A simetria da morte de Gideão espelha a família numerosa e a vida doméstica (A) ↔ Israel se prostituindo a Baalins — não lembrando a misericórdia (A'). No centro: Gideão morre em boa velhice — o melhor fim possível para um juiz. O pivô é a brevidade da memória: Gideão não terminou de ser enterrado quando Israel voltou à prostituição espiritual. Na vida da igreja: a gratidão espiritual tem vida curta quando não é cultivada ativamente. A geração que viveu sob Gideão e esqueceu o Senhor não era necessariamente mais má — era simplesmente humana sem disciplina de memória. Rituais de memória não são opcional — são vacinas contra a ingratidão.`;
  // [300]
  if (/a queda de abimeleque/i.test(p))
    return `A simetria da queda de Abimeleque espelha os setenta meios-irmãos mortos sobre uma pedra (A) ↔ uma mulher jogando pedra de moinho sobre a cabeça de Abimeleque (A'). No centro: Deus enviou espírito maligno entre Abimeleque e Siquém — o retribuidor da violência usa a própria aliança que produziu o poder. O pivô é a simetria do julgamento: quem subiu pelo derramamento de sangue sobre pedra morre por pedra, pela mão de uma mulher. Na vida da igreja: o julgamento de Deus frequentemente usa a mesma estrutura do pecado para execução da punição. A parábola de Jotão — a espinheira reinando sobre as árvores — é lida como absurda, mas é exatamente o que ocorre quando a liderança é buscada pelo assassinato.`;
  // [301]
  if (d.livroAbrev === 'Jz' && /tola/i.test(p))
    return `A simetria de Tolá espelha o seu levantamento para salvar Israel (A) ↔ vinte e três anos de julgamento e morte em Samir (A'). No centro: habitou em Samir na montanha de Efraim — a localização como dado teológico. O pivô é a contenção da narrativa: Tolá não tem história de batalha, não tem crise, não tem falha registrada. Simplesmente foi levantado, habitou no lugar dado, julgou, morreu. Na vida da igreja: nem todo chamado tem epopeia. A fidelidade silenciosa que ocupa o lugar designado por anos sem drama é tão honrada quanto a batalha de Gideão — simplesmente não ocupa o mesmo espaço na narrativa humana.`;
  // [302]
  if (d.livroAbrev === 'Jz' && /jair/i.test(p))
    return `A simetria de Jair espelha os vinte e dois anos de julgamento (A) ↔ a morte em Camom (A'). No centro: trinta filhos em trinta jumentos com trinta cidades — a simetria da abundância. O pivô é o número trinta: filhos, jumentos, cidades — a prosperidade de Jair é representada em tríades. Na vida da igreja: a bênção material de um juiz não é condenação nem celebração — é dado. O texto não critica nem elogia a prosperidade de Jair. O que Deus julga é a fidelidade, não a condição econômica. Jair exerceu seu chamado e foi enterrado. Isso é suficiente para o registro.`;
  // [303]
  if (/opressao por amonitas/i.test(p))
    return `A simetria da opressão por amonitas espelha Israel servindo a oito deuses (A) ↔ "sua alma ficou angustiada por causa da miséria de Israel" (A'). No centro: Israel clama — Deus responde "ide clamar aos deuses que escolhestes." O pivô é a recusa divina: pela primeira vez no ciclo dos juízes, Deus não responde imediatamente com misericórdia — Ele recusa com ironia. Na vida da igreja: há momentos em que Deus permite que a consequência de nossas escolhas seja o único professor disponível. A recusa de Deus não é abandono — é pedagogia severa. O retorno genuíno de Israel — removendo os deuses — é o que finalmente move a angústia de Deus.`;
  // [304]
  if (/jefte/i.test(p))
    return `A simetria de Jefté espelha o ilegítimo expulso pelos meios-irmãos (A) ↔ vitória sobre amonitas e seis anos de julgamento (A'). No centro: o voto de Jefté — "o que sair primeiro" — a promessa que nenhum triunfo pode desfazer. O pivô é a filha: saiu ela primeiro. O voto foi cumprido. Na vida da igreja: as promessas feitas a Deus têm peso que o sucesso não anula. Jefté venceu a batalha e perdeu a filha. O texto não resolve a tensão — apenas a apresenta. O ilegítimo que se tornou líder descobriu que a vitória militar não é o capítulo final de sua história. O que prometemos importa mais do que o que conquistamos.`;
  // [305]
  if (/ibsa/i.test(p))
    return `A simetria de Ibsã espelha Ibsã de Belém julgando Israel (A) ↔ sete anos de julgamento (A'). No centro: trinta filhos e trinta filhas — alianças externas para todos. O pivô é a estratégia matrimonial: Ibsã teceu trinta alianças externas para filhos e filhas, garantindo presença de Israel nas famílias vizinhas. Na vida da igreja: há sabedoria que se expressa não em batalhas mas em alianças bem tecidas. O juiz que forma vínculos com o mundo ao redor não é comprometedor da pureza — pode estar exercendo missão. O critério é quem está influenciando quem na aliança.`;
  // [306]
  if (/elom/i.test(p))
    return `A simetria de Elom espelha os dez anos de julgamento (A) ↔ "julgou Israel" (A'). No centro: morreu em Aijalom — o lugar registrado é o único dado além do tempo e tribo. O pivô é o mínimo: tribo, tempo, lugar de sepultura. Nada mais. Na vida da igreja: Elom é o juiz mais anônimo de todos. O texto não tem sequer uma narrativa de conflito. Simplesmente foi, julgou, morreu. Há uma dignidade no serviço que não deixa rastros espetaculares — apenas décadas de fidelidade e um lugar de sepultura que alguém achou digno de registrar.`;
  // [307]
  if (/abdao/i.test(p))
    return `A simetria de Abdão espelha o julgamento de Israel (A) ↔ oito anos de julgamento (A'). No centro: quarenta filhos e trinta netos em setenta jumentos — a prosperidade mais numerosa dos juízes menores. O pivô é o crescimento: Abdão tem mais herdeiros montados do que qualquer outro juiz menor. Na vida da igreja: a prosperidade de Abdão não é garantia de fidelidade das gerações seguintes — o livro de Juízes já demonstrou isso repetidamente. Mas o texto não condena. Setenta jumentos com setenta herdeiros é imagem de abundância que o juiz não pediu esconder. A bênção visível pode ser testemunho da provisão de Deus.`;
  // [308]
  if (/a profecia de de sansao nascimento/i.test(p))
    return `A simetria do nascimento de Sansão espelha Israel entregue por quarenta anos (A) ↔ Sansão nascendo com o Espírito começando a movê-lo (A'). No centro: o anjo reaparece com o nome maravilhoso — "meu nome é maravilhoso." O pivô é o nome não revelado: o mensageiro que faz a coisa maravilhosa não se nomeia para que a atenção fique em Quem envia. Na vida da igreja: os melhores intercessores são frequentemente os que não revelam seus nomes. O serviço que recusa a celebração pessoal aponta para o Senhor. O Espírito que começa a mover Sansão já na infância é o mesmo que se moverá nele nos momentos mais imprevisíveis da narrativa.`;
  // [309]
  if (/de sansao casamento/i.test(p))
    return `A simetria do casamento de Sansão espelha o desejo pela filha filisteia (A) ↔ Sansão matando trinta filisteus e a noiva sendo dada a outro (A'). No centro: a charada do mel no leão — "do que come saiu comida, do que é forte saiu doçura." O pivô é que a charada só existe porque Sansão tocou o cadáver impuro — violação do voto nazireno que gerou a "sabedoria" da charada. Na vida da igreja: às vezes o que parece astúcia intelectual nasce de uma concessão espiritual anterior. A fonte da charada era uma transgressão. O mel era real, mas tinha uma origem que Sansão preferia não mencionar à família.`;
  // [310]
  if (/sansao e tres cem raposas/i.test(p))
    return `A simetria de Sansão e as trezentas raposas espelha o retorno de Sansão à esposa dada a outro (A) ↔ "já que fizestes assim — só me deterei depois da vingança" (A'). No centro: trezentas raposas com tochas destroem as searas, vinhas e olivais dos filisteus. O pivô é a proporção: a ofensa pessoal de Sansão produziu destruição econômica coletiva. Na vida da igreja: o pecado raramente é contido em quem o pratica. A reação de Sansão — legítima na sua percepção — incendiou o sustento de uma população inteira. A espiral de vingança nunca para onde iniciou: Sansão e os filisteus escalarão até o fim do livro.`;
  // [311]
  if (/sansao derrota filisteus/i.test(p))
    return `A simetria da derrota dos filisteus por Sansão espelha os filisteus subindo a Judá para prendê-lo (A) ↔ Sansão julgando Israel vinte anos (A'). No centro: o Espírito vem — Sansão mata mil com a queixada de jumento. O pivô é a sede depois da vitória: o herói que matou mil tem sede e quase morre. Deus abre a rocha. Na vida da igreja: mesmo os que o Espírito usa extraordinariamente têm necessidades ordinárias. A sede de Sansão após a queixada não é fraqueza vergonhosa — é humana. E Deus não critica a sede — Ele abre a rocha. O mesmo Deus que usa o extraordinário cuida do ordinário.`;
  // [312]
  if (/sansao e dalila/i.test(p))
    return `A simetria de Sansão e Dalila espelha Sansão em Gaza — carregando as portas (A) ↔ "Sansão não sabe que o Senhor o abandonou" (A'). No centro: "minha força está no cabelo — sou nazireno desde o ventre de minha mãe." O pivô é a confissão: Sansão cedeu após três resistências porque Dalila o pressionou "todos os dias" até sua alma não aguentar mais. Na vida da igreja: a erosão da fidelidade raramente acontece num momento único — é pressão diária acumulada. Sansão não capitulou de uma vez; capitulou exausto. E o texto mais ominoso do livro: "não sabia que o Senhor o havia deixado." A ausência de Deus nem sempre é imediatamente perceptível.`;
  // [313]
  if (/de sansao morte/i.test(p))
    return `A simetria da morte de Sansão espelha os filisteus festejando — "Dagom entregou nosso inimigo" (A) ↔ Sansão matando mais na morte do que em vida (A'). No centro: "lembra-te de mim, Senhor — fortifica-me uma última vez." O pivô é a oração final: cego, acorrentado, humilhado, Sansão ora. É a oração mais honesta do juiz mais problemático — sem promessa de reforma, sem voto de mudança, apenas "lembra-te de mim." Na vida da igreja: não há momento tarde demais para se virar ao Senhor. A maior vitória de Sansão acontece quando ele nada mais tem — sem visão, sem força própria, sem futuro visível. O Senhor que se lembra de Sansão é o mesmo que se lembra de nós.`;
  // [314]
  if (/a migracao de da/i.test(p))
    return `A simetria da migração de Dã espelha Mica fazendo ídolo de prata — culto doméstico (A) ↔ Dã conquistando Laís e instalando o ídolo (A'). No centro: os danitas tomam o ídolo e o levita de Mica — religião portátil para a nova conquista. O pivô é o levita: contratado por Mica, recrutado pelos danitas, o sacerdócio sem fidelidade segue o poder mais forte. Na vida da igreja: um ministério que serve quem paga melhor é símbolo de uma religião que valida poder em vez de desafiá-lo. O ídolo de Mica não nasceu com intenção maliciosa — mas a religião doméstica sem fundamento na revelação é a primeira etapa de uma idolatria que migra junto com os seus donos.`;
  // [315]
  if (/o crime de gibea/i.test(p))
    return `A simetria do crime de Gibeá espelha o levita e a concubina — violência em Gibeá (A) ↔ provisão de esposas para Benjamim — "cada um fazia o que parecia certo" (A'). No centro: derrota de Israel nos dois primeiros dias — clamor e consulta. O pivô é a consulta: Israel consultou o Senhor após a primeira derrota, após a segunda, e somente na terceira o resultado mudou. Na vida da igreja: o crime de Gibeá é o espelho final de Juízes — o que começa com "não havia rei" termina em violência que espelha Sodoma. A frase conclusiva do livro não é sentença sobre falta de monarquia — é diagnóstico de ausência de Senhor. O rei que Israel precisava não era Saul; era o Deus que eles continuaram a ignorar.`;

  // Rute
  if (/familia.*elimeleque|moabe.*naomi|naomi.*rute/i.test(p))
    return `A família deixa Belém por causa da fome e encontra morte no estrangeiro — Elimeleque e os filhos morrem. Naomi fica com duas noras moabitas. A história começa na perda total. Na vida real: às vezes Deus precisa que o cenário humano chegue ao fundo para que a providência divina possa operar claramente.`;
  if (/naomi.*noemi.*nora|rute.*onde.*morreres/i.test(p))
    return `Rute se recusa a deixar Noemi: "Onde tu morreres, morrerei eu." É fidelidade radical a uma sogra viúva e amargurada — sem garantia de futuro. Na vida real: hesed (amor fiel) é o coração do livro de Rute. Amar sem garantia de retorno é a marca do amor que imita o caráter de Deus.`;
  if (/rute.*boaz|espigando.*campo/i.test(p))
    return `Rute "por acaso" vai espigar no campo de Boaz, parente próximo de Noemi. Boaz a protege, a alimenta e a honra. O texto é cheio de providência disfarçada de coincidência. Na vida real: Deus frequentemente age através de encontros "ordinários" que só se revelam providenciais quando olhamos para trás.`;
  if (/boaz.*rute.*casamento|resgate.*rute|parente.*resgatador/i.test(p))
    return `Boaz age como "parente resgatador" — o goel — e redime Rute e a herança de Elimeleque. É tipo de Cristo: aquele que paga o preço para restaurar quem estava perdido. Na vida real: a redenção bíblica sempre tem um custo pago por alguém — e o resgatador escolhe pagar porque quer, não porque é obrigado.`;

  // 1 Samuel
  if (/samuel.*nascimento|ana.*ora|voto.*ana/i.test(p))
    return `Ana, humilhada e estéril, derrama sua alma diante de Deus em oração silenciosa — tão intensa que o sacerdote a confunde com bêbada. Deus a ouve. Na vida real: a oração mais profunda muitas vezes não tem palavras bonitas — é ânsia, dor e entrega diante de Quem vê o coração.`;
  if (/vocacao.*samuel|deus.*chama.*samuel|fala.*senhor.*servo/i.test(p))
    return `O jovem Samuel ouve seu nome três vezes antes de Eli entender que é Deus quem chama. "Fala, Senhor, pois teu servo ouve." Deus revelou ao menino coisas que Eli, o sacerdote experiente, não recebeu. Na vida real: estar disponível para ouvir importa mais do que ter o título ou a experiência. Deus fala a quem está disposto a escutar.`;
  if (/israel.*exige.*rei|rei.*como.*nacoes/i.test(p))
    return `Israel pede um rei para ser como as outras nações. Deus o interpreta como rejeição a Seu próprio reinado. Samuel adverte sobre o preço da monarquia — e o povo insiste. Na vida real: há momentos em que recebemos o que pedimos, mas não o que precisávamos. Conformar-se ao mundo ao redor sempre tem um custo que só é percebido depois.`;
  if (/saul.*ungido.*rei|saul.*escolhido/i.test(p))
    return `Saul é ungido rei: alto, impressionante, de boa família. Parece perfeito para o papel. Mas Deus já havia advertido sobre o que um rei faria ao povo. Na vida real: aparência e capacidade humana impressionam, mas o que Deus busca é o coração. A queda de Saul começa muito antes do trono — começa nas prioridades do coração.`;
  if (/davi.*ungido|davi.*ungiu|samuel.*unge.*davi|deus.*homem.*coracao/i.test(p))
    return `Deus manda Samuel ungir um dos filhos de Jessé. Sete passam diante dele. Deus diz sobre cada um: "não é este." O mais novo está no campo com as ovelhas. "O homem olha para a aparência, mas o Senhor olha para o coração." Na vida real: os critérios de Deus para uso e honra invertem os critérios humanos. Quem parece não qualificado pode ser exatamente quem Deus escolheu.`;
  if (/davi.*golias|golias.*filisteu/i.test(p))
    return `Davi, jovem pastor, enfrenta o gigante que paralisou o exército inteiro. Sua confiança não é na funda — é no Deus que já o ajudou com o leão e o urso. Na vida real: a fé que sustenta os grandes desafios é construída nas fidelidades menores que ninguém viu. As batalhas públicas são vencidas com a fé formada no silêncio.`;
  if (/amizade.*davi.*jonata|jonata.*davi/i.test(p))
    return `Jonatã, filho do rei, cede a Davi os direitos ao trono que eram seus por herança — e jura amizade eterna. É um dos exemplos mais bonitos de amizade desinteressada na Bíblia. Na vida real: amizade verdadeira não compete — ela celebra o crescimento do outro, mesmo quando isso custa algo a si mesmo.`;
  if (/davi.*poupa.*saul|davi.*nao.*mato/i.test(p))
    return `Davi tem Saul na mão, dentro de uma caverna. Seus homens dizem: "Esta é a hora." Davi corta apenas a borda do manto e depois sente remorso por isso. "Não seja isto da minha parte... que eu estenda a mão contra o ungido do Senhor." Na vida real: a vingança que parece justificada pode ser exatamente o teste que Deus usa para revelar o caráter.`;

  // 2 Samuel
  if (/davi.*lamenta.*saul.*jonata/i.test(p))
    return `Davi chora por Saul e Jonatã com um dos lamentos mais belos da Bíblia: "Como caíram os valentes!" Davi não tinha motivo humano para chorar por Saul — mas chora. Na vida real: a grandeza de caráter se revela em como tratamos quem nos perseguiu. Davi honra mesmo quem o quis matar.`;
  if (/alianca.*davi.*deus|davi.*profecia.*filho/i.test(p))
    return `Deus estabelece com Davi uma aliança: "Tua casa e teu reino durarão para sempre diante de mim." Davi queria construir uma casa para Deus; Deus promete construir uma "casa" para Davi. Na vida real: muitas vezes nossas iniciativas para servir a Deus se tornam o contexto onde Ele nos serve com promessas maiores do que planejávamos.`;
  if (/mefibosete.*davi|bondade.*mefibosete/i.test(p))
    return `Davi procura alguém da casa de Saul para quem possa mostrar bondade por causa de Jonatã. Mefibosete, coxo, escondido, convocado ao palácio — recebe terras, servos e lugar à mesa do rei. Na vida real: Deus nos convoca exatamente quando nos sentimos escondidos, coxos e indignos — e nos dá lugar à mesa não por mérito, mas por aliança.`;
  if (/davi.*bate-seba|adulterio.*davi|uria.*morto/i.test(p))
    return `Davi vê, deseja, toma, mente e mata. O homem segundo o coração de Deus comete adultério e manda matar o marido inocente. A queda de Davi mostra que ninguém está imune ao pecado — poder, riqueza e religiosidade não nos tornam imunes. Na vida real: o pecado começa no olhar que se demora, na fantasia que se alimenta, antes de se tornar ação.`;
  if (/nata.*condena.*davi|parabola.*ovelha.*nata/i.test(p))
    return `O profeta Natã conta uma parábola ao rei: um rico que rouba a única ovelha de um pobre. Davi inflama de indignação — e Natã aponta: "Tu és esse homem." Davi, que julgou o personagem da história, é o personagem da história. Na vida real: é mais fácil enxergar o pecado nos outros do que no espelho. A Palavra de Deus serve como esse espelho.`;

  // 1 Reis
  if (/salomao.*sabedoria|sabedoria.*salomao|julgamento.*sabio/i.test(p))
    return `Salomão pede sabedoria em vez de riqueza ou vitória — e Deus lhe dá tudo. A cena do julgamento entre as duas mães revela essa sabedoria em ação: ele propõe cortar a criança ao meio para revelar quem é a mãe verdadeira. Na vida real: sabedoria não é apenas conhecimento — é a capacidade de ver o coração humano e responder com discernimento.`;
  if (/templo.*salomao.*construir|salomao.*constroi.*templo/i.test(p))
    return `Salomão constrói o templo com os detalhes dados por Deus — cedro, ouro, querubins. Sete anos de construção. O lugar onde Deus habitaria no meio do povo. Na vida real: o cuidado com o culto e a adoração importa. O que fazemos quando nos reunimos para adorar não é indiferente — reflete o que acreditamos sobre Quem estamos adorando.`;
  if (/dedicacao.*templo.*salomao/i.test(p))
    return `Na dedicação do templo, Salomão ora: "O céu dos céus não pode te conter; quanto menos esta casa que edifiquei." E mesmo assim pede que Deus ponha os olhos naquele lugar. É a tensão entre a grandeza de Deus e a graça da proximidade. Na vida real: adorar a Deus é reconhecer que Ele é maior do que qualquer espaço ou sistema que criamos — e ao mesmo tempo que Ele se aproxima.`;
  if (/salomao.*erros|salomao.*esposas.*estrangeiras|idolatria.*salomao/i.test(p))
    return `No final, Salomão — o mais sábio dos homens — tem o coração desviado pelas suas mil esposas e concubinas. Constrói altares para os deuses delas. O texto é sóbrio: o que destrói não precisa ser dramático — pode ser uma concessão por vez. Na vida real: nenhum grau de sabedoria e experiência espiritual nos torna automaticamente imunes ao desvio gradual.`;
  if (/elias.*seca|elias.*corvos|elias.*sarefa/i.test(p))
    return `Elias anuncia três anos de seca e depois vai se esconder às margens do ribeiro Querite, alimentado por corvos. Na fome, Deus provê — de formas inesperadas. Na vida real: a obediência radical frequentemente leva a lugares de espera e escondimento antes dos grandes confrontos. O período de Querite forma antes de o Carmelo chegar.`;
  if (/elias.*carmelo.*baal|profetas.*baal.*elias|elias.*triunfo.*baal|sacerdotes.*baal/i.test(p))
    return `No Monte Carmelo, Elias desafia 450 profetas de Baal em um confronto público. "Se o Senhor é Deus, segui-o; se Baal, segui-o." O fogo cai sobre o sacrifício de Elias; o de Baal, silêncio. Na vida real: há momentos em que a fé precisa ser pública — não por arrogância, mas porque a ambiguidade se torna apostasia quando a decisão é necessária.`;
  if (/elias.*jezabel.*foge|elias.*foge.*jezabel|elias.*junipero|voz.*branda.*mansa/i.test(p))
    return `Elias, após a maior vitória, foge de Jezabel com medo e pede a morte: "Já basta, Senhor." Deus não o repreende — manda um anjo com comida: "Levanta-te e come, porque o caminho é muito para ti." Na vida real: esgotamento espiritual após grandes batalhas é real. Deus não pede mais esforço imediato — primeiro, cuida do corpo, depois fala.`;
  if (/vinhedo.*nabote|acabe.*nabote/i.test(p))
    return `Acabe quer o vinhedo de Nabote. Nabote recusa: "Guarda-me o Senhor de dar a herança de meus pais." Jezabel articula a morte de Nabote com falsa religiosidade. Acabe herda o vinhedo sobre o cadáver do inocente. Elias aparece: "Achaste-me, ó meu inimigo?" Na vida real: poder sem ética devora os inocentes — e o julgamento divino chega exatamente no lugar do crime.`;

  // 2 Reis
  if (/eliseu.*sucede.*elias|manto.*elias/i.test(p))
    return `Elias sobe num carro de fogo. Eliseu pede uma porção dupla do espírito de Elias — e recebe. O manto cai e as águas se abrem. Na vida real: a herança espiritual não se herda passivamente — ela é pedida com intenção e recebida com fidelidade. Quem quer prosseguir o que o predecessor construiu precisa querer isso mais do que qualquer outra coisa.`;
  if (/eliseu.*milagres|eliseu.*suna.*menino|naama.*lepra/i.test(p))
    return `Eliseu realiza milagres que ecoam os de Elias: multiplicação de alimento, ressurreição de criança, cura de Naamã o sírio leproso. Naamã era general do exército inimigo — e foi curado pela fé simples e obediente no Deus de Israel. Na vida real: a graça de Deus não tem fronteiras nacionais ou religiosas — alcança quem se humilha e obedece.`;
  if (/israel.*cativo.*assiria|queda.*samaria/i.test(p))
    return `O reino do Norte, Israel, cai diante da assiria após décadas de idolatria. O texto explica: "Isso aconteceu porque os filhos de Israel pecaram contra o Senhor seu Deus." A queda não foi surpresa — foi consequência acumulada de escolhas que ignoraram os avisos proféticos. Na vida real: nem toda consequência chega imediatamente, mas chega. A fidelidade importa no longo prazo.`;
  if (/ezequias.*senaqueribe.*invasao|senaqueribe.*juda/i.test(p))
    return `Senaqueribe cerca jerusalem e manda um oficial fazer discurso de rendição — em voz alta, para desmoralizar o povo. Ezequias estende a carta ameaçadora diante do Senhor e ora. O exército assírio é destruído numa noite. Na vida real: quando a ameaça é grande demais para uma resposta humana, apresentá-la diante de Deus em oração — literalmente — é o passo mais poderoso disponível.`;
  if (/josias.*reforma|livro.*lei.*templo.*josias/i.test(p))
    return `Durante a reforma do templo, o livro da Lei é encontrado — provavelmente Deuteronômio. Josias o ouve e rasga as suas vestes. Manda consultar a profetisa Hulda. A Palavra de Deus, recuperada, provoca arrependimento genuíno. Na vida real: há momentos em que um contato fresco e sério com a Palavra de Deus revira tudo — não porque ela mudou, mas porque percebemos o quanto nos distanciamos dela.`;

  // 1 e 2 Crônicas
  if (/genealogia.*israel|genealogia.*davi|genealogia.*adao/i.test(p))
    return `As genealogias de Crônicas não são listas mortas — são a estrutura da memória de um povo. Cada nome é uma história, uma linha de promessa que chegou até aqui. Na vida real: nossa fé não começa conosco. Estamos no meio de uma história muito maior — herdeiros de uma fidelidade que vem de gerações e que somos chamados a passar adiante.`;
  if (/davi.*arca.*jerusalem|arca.*louvor.*davi/i.test(p))
    return `Davi traz a arca a jerusalem com louvor, dança e sacrifícios. Seu salmo de ação de graças celebra o Deus que age na história. Na vida real: adoração que lembra o que Deus fez na história — não apenas emoção do momento — é a que sustenta a fé nos tempos secos.`;
  if (/familias.*levitas.*funcoes|levitas.*ministerio.*cronicas/i.test(p))
    return `Crônicas detalha as funções dos levitas com precisão: músicos, porteiros, tesoureiros. Cada função tem um nome, uma família, uma responsabilidade. Na vida real: na comunidade de fé, não existe tarefa pequena. O porteiro que abre a porta do templo é tão necessário quanto o sacerdote que oferta — ambos servem ao mesmo Senhor.`;
  if (/davi.*prepara.*templo|salomao.*instruido.*templo/i.test(p))
    return `Davi não pôde construir o templo, mas reuniu os materiais, organizou os trabalhadores e preparou os planos — entregando tudo a Salomão. Sua contribuição foi invisível na dedicação, mas essencial para o que foi construído. Na vida real: nem sempre colhemos o que plantamos. Fidelidade no preparo honra a Deus tanto quanto fidelidade na conclusão.`;

  // Esdras e Neemias
  if (/retorno.*exilio.*babilonia|ciro.*decreto|exiles.*retornam/i.test(p))
    return `Ciro, rei da Pérsia, decreta o retorno dos exilados — e o texto diz que Deus "despertou o espírito" dele para isso. Um rei pagão como instrumento da promessa de Deus. Na vida real: Deus não está limitado aos meios religiosos para cumprir seus propósitos. Ele usa governos, circunstâncias e até inimigos para fazer avançar o que prometeu.`;
  if (/templo.*reconstruido|restauracao.*templo.*esdras/i.test(p))
    return `O povo voltou do exílio e reconstruiu o altar primeiro — antes de assentar as fundações do templo. A prioridade foi a adoração, não a infraestrutura. Na vida real: recomeçar começa por recolocar a adoração no centro. Antes de reconstruir estruturas, restaura o altar.`;
  if (/esdras.*lei|esdras.*leitura.*lei/i.test(p))
    return `Esdras lê a lei em voz alta diante de todo o povo por horas. O povo chora ao ouvi-la. Os levitas explicam o sentido. E Neemias diz: "Não choreis; a alegria do Senhor é a vossa força." Na vida real: ouvir e entender a Palavra de Deus produz primeiro convicção — e depois restauração. O choro que vem da Palavra não é fim; é começo.`;
  if (/neemias.*muro|reconstrucao.*muro.*jerusalem/i.test(p))
    return `Neemias reconstruiu os muros de jerusalem em 52 dias, com metade do povo trabalhando e metade de guarda. Os inimigos ridicularizaram, ameaçaram e intrigaram — mas o trabalho continuou. Na vida real: toda reconstrução tem opositores. A resposta de Neemias foi não parar para debater — continuar construindo e orar.`;
  if (/confissao.*nacional.*neemias|confissao.*pecado.*povo/i.test(p))
    return `O povo se reúne para confissão nacional: leem a Lei, confessam os pecados das gerações, recordam o que Deus fez. É um ato coletivo de arrependimento e renovação. Na vida real: há momentos em que a comunidade de fé precisa se humilhar coletivamente — não apenas o indivíduo, mas o grupo inteiro diante do Senhor.`;

  // Ester
  if (/ester.*rainha|ester.*torna.*rainha/i.test(p))
    return `Ester se torna rainha sem que ninguém saiba que é judia. A providência está tecendo algo que nenhum personagem consegue ver ainda. Na vida real: Deus frequentemente nos posiciona antes de revelar o propósito. Estar no lugar certo antes de entender o porquê é parte da providência divina.`;
  if (/hama.*judeus.*destruir|decreto.*exterminio/i.test(p))
    return `Hamã convence o rei a decretar o extermínio de todos os judeus do império. O decreto é enviado; Mordecai rasga as vestes. A situação parece irreversível. Na vida real: o mal às vezes avança com toda a aparência de legalidade e poder. Mas Deus não está ausente — está aguardando o momento certo para agir.`;
  if (/ester.*mordecai.*tal vez|para um tempo como este/i.test(p))
    return `Mordecai envia a Ester a mensagem decisiva: "Quem sabe se não foi para um momento como este que você chegou à realeza?" Ester responde: "Se perecer, perecerei." Na vida real: há momentos em nossa vida que concentram propósito — reconhecê-los exige sensibilidade espiritual e coragem de agir mesmo com risco.`;

  // Jó
  if (/vicissitudes.*jo|sofrimentos.*jo|adversidades.*jo/i.test(p))
    return `Em um único dia, Jó perde gado, servos, filhos. É fiel a Deus e sofre de forma extrema. O livro não responde "por quê" — ele vai além: questiona se o sofrimento precisa de explicação para que a fé se sustente. Na vida real: a fé madura não depende de resposta para cada dor — mas de ancoragem em quem Deus é, mesmo quando não entendemos o que Ele faz.`;
  if (/jo.*amaldicoa.*dia|lamento.*jo/i.test(p))
    return `Jó amaldiçoa o dia de seu nascimento — não a Deus, mas a existência em si. A dor chegou ao limite do suportável. Na vida real: lamentar diante de Deus não é falta de fé — é fé honesta. Deus suporta nosso clamor em desespero. O que Ele não aceita é o silêncio fingido que evita o encontro real.`;
  if (/dialogo.*elifaz|dialogo.*bildade|dialogo.*zofar|dialogo.*elihu|elifu/i.test(p))
    return `Os amigos de Jó têm as respostas erradas para as perguntas certas. Eles defendem Deus com teologia precisa, mas aplicada mecanicamente. Deus ao final dirá: "Minha ira se acendeu contra ti... porque não falastes de mim o que é reto." Na vida real: defender Deus com teologia rígida, sem compaixão pela dor real da pessoa, pode ser mais prejudicial do que o silêncio.`;
  if (/senhor.*responde.*jo|deus.*responde.*jo|discurso.*tempestade/i.test(p))
    return `Deus responde a Jó do meio do redemoinho — não com explicações sobre o sofrimento, mas com perguntas sobre a criação: "Onde estavas quando fundei a terra?" Jó encontra paz não em respostas, mas no encontro com Deus. Na vida real: o que nos sustenta não é entender a dor, mas ter certeza de que Quem a conhece é digno de confiança.`;

  // Salmos
  if (/salmo.*1(?![\d])|salmos.*1-2|o justo.*impio/i.test(p))
    return `O Saltério começa com uma descrição do homem bendito: medita na lei de Deus dia e noite, como árvore plantada às margens do rio. Os ímpios são como palha varrida. Dois caminhos. Na vida real: onde investimos nossa atenção define quem nos tornamos. Meditar na Palavra não é atividade religiosa adicional — é o que forma o caráter ao longo do tempo.`;
  if (/salmo 22|salmo.*abandonado.*deus|deus.*abandonaste/i.test(p))
    return `"Deus meu, Deus meu, por que me abandonaste?" — Jesus citou este salmo na cruz. É um clamor de desamparo que termina em confiança. Na vida real: o sentimento de abandono não é prova de que Deus se foi. O Salmo 22 mostra que é possível clamar a partir do fundo do abandono e chegar à adoração — o caminho passa pelo meio da dor, não ao redor dela.`;
  if (/salmo 23|pastor.*ovelho|verde pastos/i.test(p))
    return `"O Senhor é meu pastor." O salmo mais memorizado da Bíblia descreve Deus como o que guia, restaura, protege e acompanha — inclusive no vale da sombra da morte. Na vida real: paz não é ausência de vale — é presença do pastor. A segurança cristã não é circunstancial; é relacional.`;
  if (/salmo 51|misericordia.*deus.*pecado.*davi|create.*coracao.*limpo/i.test(p))
    return `Davi escreve o Salmo 51 após o pecado com Bate-Seba: "Cria em mim, ó Deus, um coração puro." É o arrependimento mais honesto da Bíblia — sem desculpas, sem minimização. Na vida real: arrependimento genuíno reconhece o pecado como ofensa a Deus antes de qualquer outra coisa, e pede transformação, não apenas perdão.`;
  if (/salmo 119|lei.*senhor.*perfeita|seu testemunho/i.test(p))
    return `O Salmo 119, o mais longo da Bíblia, é uma meditação de 176 versículos sobre a Palavra de Deus. Cada seção começa com uma letra do alfabeto hebraico. O amor pela lei de Deus é o tema central. Na vida real: a Palavra não é referência de emergência — é o alimento diário que sustenta a caminhada.`;
  if (/salmo\s+\d+/i.test(p))
    return `Este salmo é uma oração poética — pode ser louvor, lamento, confiança ou clamor. Os salmos ensinaram Israel a falar com Deus com honestidade sobre toda experiência humana. Na vida real: qualquer estado emocional — alegria, medo, raiva, gratidão — pode ser trazido a Deus em oração. Os salmos são permissão para sermos honestos diante de Deus.`;

  // proverbios / Eclesiastes / Cantares
  if (/proverbios|convite.*sabedoria|mulher.*sabedoria|advertencia/i.test(p))
    return `proverbios é sabedoria prática destilada em frases: como trabalhar, falar, gerenciar relacionamentos, dinheiro, criação dos filhos. Tudo começa com "o temor do Senhor é o princípio da sabedoria." Na vida real: sabedoria bíblica não é um conjunto de princípios genéricos — é uma orientação de vida a partir da reverência a Deus, aplicada nas decisões concretas do cotidiano.`;
  if (/eclesiastes|vaidade.*vaidades|coelet|pregador.*vanidade/i.test(p))
    return `Eclesiastes avalia a vida "debaixo do sol" — trabalho, prazer, sabedoria, riqueza — e conclui: "Vaidade de vaidades." Mas o livro não termina no niilismo: "Teme a Deus e guarda os seus mandamentos; pois isso é o todo do homem." Na vida real: buscar significado em conquistas, experiências ou posses tem prazo de validade. O significado duradouro vem de quem nos criou e para quem vivemos.`;
  if (/cantares|cantaro.*amor|esposa.*esposo.*cantico/i.test(p))
    return `Cantares celebra o amor entre o amado e a amada com poesia ousada e bela. A tradição o leu como metáfora do amor de Deus por Israel e de Cristo pela igreja. Na vida real: o amor fiel, exclusivo e celebrado é criação de Deus — não expressão de fraqueza. Cuidar e ser cuidado, desejar e ser desejado de forma honesta e comprometida reflete algo do coração do Criador.`;

  // Isaías
  if (/isaias.*chamado|visao.*deus.*templo|aqui estou.*enviai/i.test(p))
    return `Isaías vê o Senhor no templo em toda a sua glória — e sua reação imediata é: "Ai de mim! Estou perdido." A santidade de Deus revela a condição humana. O carvão toca os lábios, o pecado é removido, e então: "Aqui estou, enviai-me." Na vida real: quem encontra a santidade de Deus de verdade sai transformado — primeiro é esmagado, depois é limpo, depois é enviado.`;
  if (/servo.*senhor.*isaias|sofrimento.*servo|traspassado.*nossas.*transgressoes/i.test(p))
    return `Isaías 53 descreve um servo que carrega os pecados do povo, é desprezado, ferido e morto — "traspassado pelas nossas transgressões, moído pelas nossas iniquidades." O texto foi escrito séculos antes de Jesus. Na vida real: a substituição vicária não é conceito abstrato — é a lógica da cruz: alguém inocente pagando o que nós devíamos.`;
  if (/consolai.*consolai|voz.*deserto.*preparai|boas.*novas.*isaias/i.test(p))
    return `"Consolai, consolai o meu povo" — a virada de Isaías. Após capítulos de julgamento, vem a promessa de restauração. "O povo que andava em trevas viu uma grande luz." Na vida real: a mensagem do evangelho sempre chega como ruptura — do julgamento para a misericórdia, do exílio para o retorno, da morte para a vida.`;
  if (/ciro.*instrumento.*deus|ciro.*isaias/i.test(p))
    return `Isaías nomeia Ciro — um rei que ainda nem nasceu — como instrumento de Deus para libertar Israel. A profecia é escrita 150 anos antes do cumprimento. Na vida real: a soberania de Deus sobre a história significa que Ele opera em escalas que estão além da nossa perspectiva temporal. O que parece improvável ou impossível pode estar no plano que já foi escrito.`;

  // Jeremias
  if (/chamado.*jeremias|jeremias.*chamado|antes.*formastes.*ventre|profeta.*nacoes/i.test(p))
    return `Deus diz a Jeremias: "Antes que eu te formasse no ventre materno, eu te conheci." Jeremias objeta: "Sou jovem, não sei falar." Deus toca seus lábios e diz: "Ponho as minhas palavras na tua boca." Na vida real: o chamado de Deus precede nosso nascimento — não começa quando nos sentimos prontos, mas quando Ele determinou.`;
  if (/nova.*alianca.*jeremias|escreverem.*coracoes/i.test(p))
    return `Jeremias 31 promete uma nova aliança — não escrita em pedra, mas no coração. "Não ensinará mais cada um o seu próximo... porque todos me conhecerão." Na vida real: o Espírito Santo cumprindo a nova aliança no crente é o que torna a obediência não apenas dever externo, mas desejo nascido de dentro.`;
  if (/jeremias.*compra.*campo|campo.*anatote/i.test(p))
    return `Com jerusalem cercada e o exílio iminente, Deus manda Jeremias comprar um campo. É um ato profético de esperança: "Campos e vinhas serão ainda comprados nesta terra." Na vida real: investir no futuro em meio à crise é um ato de fé. Plantar quando tudo parece acabar é declarar que Deus tem última palavra sobre a história.`;

  // Lamentações
  if (/lamentacoes|lamentacao|cantico.*lamento.*siao|primeiro.*segundo.*terceiro.*cantico/i.test(p))
    return `Lamentações é choro sem resposta imediata — Jerusalem destruída, povo em exílio, o Senhor aparentemente silencioso. Mas no centro do livro (3.22-23): "As misericórdias do Senhor nunca cessam; as suas compaixões nunca chegam ao fim; renovam-se cada manhã." Na vida real: o lamento honesto cabe dentro da fé — e no centro da escuridão, a Palavra de Deus insiste em uma luz que não se apaga.`;

  // Ezequiel
  if (/vocacao.*ezequiel|carro.*fogo.*ezequiel|querubins.*ezequiel/i.test(p))
    return `Ezequiel vê a glória de Deus sobre um carro de fogo com quatro seres viventes — uma visão de majestade incompreensível. E então Deus o chama: "Vai à casa de Israel." Na vida real: o chamado profético sempre começa com visão do que Deus é — não do que queremos realizar. Quem não viu a glória de Deus não tem o que comunicar.`;
  if (/gloria.*parte.*jerusalem|deus.*abandona.*templo/i.test(p))
    return `A glória de Deus parte do templo gradualmente, em estágios — o ponto mais perturbador de Ezequiel. A presença de Deus não mora automaticamente onde há estrutura religiosa. Na vida real: a forma sem a presença é o perigo permanente da religião. Deus se vai quando não é mais tratado como Deus — mesmo que os rituais continuem.`;
  if (/vale.*ossos.*secos|ossos.*ezequiel.*vivam/i.test(p))
    return `Ezequiel vê um vale de ossos secos e Deus pergunta: "Podem esses ossos viver?" Ele profetiza, os ossos se juntam, tendões crescem, carne cobre, sopro entra. Na vida real: a ressurreição — pessoal, comunitária, espiritual — começa quando a Palavra de Deus é anunciada sobre o que parece morto. O impossível se torna possível quando Deus sopra vida.`;
  if (/novo.*templo.*ezequiel|agua.*fluindo.*templo/i.test(p))
    return `Ezequiel 40-48 descreve um templo ideal e um rio que flui do templo, crescendo mais e mais até se tornar inenavegável — trazendo vida por onde passa. É visão de restauração total. Na vida real: o Espírito Santo flui do templo que somos (1 Co 6.19), trazendo vida às situações em que entramos. Quanto mais nos abrimos à presença de Deus, mais vida flui através de nós.`;

  // Daniel
  if (/nabucodonosor.*sonho|fornalha.*ardente|tres.*jovens/i.test(p))
    return `Três jovens se recusam a se prostrar diante da estátua de ouro. Nabucodonosor os lança na fornalha. Mas dentro do fogo aparece um quarto — "semelhante a um filho dos deuses." Na vida real: há ocasiões em que a fidelidade leva direto ao fogo — e é exatamente no fogo que a presença de Deus se manifesta de forma mais próxima.`;
  if (/daniel.*leao.*cova|daniel.*leao.*covil|cova.*leoes/i.test(p))
    return `Daniel é jogado na cova dos leões por continuar orando três vezes ao dia, janelas abertas para jerusalem — mesmo com a lei proibindo. O rei passa a noite insone. De manhã, Daniel está vivo. Na vida real: a fidelidade em disciplinas espirituais simples (oração regular, Palavra diária) é o que sustenta quando a pressão para abandonar a fé se intensifica.`;
  if (/visao.*bestas|visoes.*bestas|quatro.*bestas|quatro.*bestas.*daniel/i.test(p))
    return `As visões de Daniel descrevem impérios como bestas — poder humano em sua brutalidade. Mas no centro está o Filho do Homem recebendo domínio eterno do Ancião de Dias. Na vida real: nenhum sistema político ou poder humano tem a última palavra. O reino de Deus sobrevive a todos os impérios — e é o único que não será destruído.`;

  // Profetas Menores
  if (/oseias|hosea|amor.*redentor.*deus|maior.*certeza.*amor/i.test(p))
    return `Oseias recebe a missão perturbadora de amar uma esposa infiel como metáfora do amor de Deus por Israel. Deus compra de volta a esposa que o abandonou. Na vida real: o amor de Deus não é proporcional à fidelidade do amado — é doado gratuitamente mesmo ao infiel. "Eu os amarei livremente" (Os 14.4).`;
  if (/joel.*espirito.*derramado|espirito.*todo.*carne|espirito.*deus.*derramado|espirito.*derramado/i.test(p))
    return `Joel profetiza: "Derramarei o meu Espírito sobre toda a carne; vossos filhos e vossas filhas profetizarão." Pedro cita isso em Pentecostes. Na vida real: o Espírito Santo não é privilégio de uma elite espiritual — é promessa para toda a comunidade de fé, independente de gênero, idade ou classe social.`;
  if (/amos.*justiça.*corra|amos.*julgamento|buscar.*senhor.*amos/i.test(p))
    return `Amós, pastor e cultivador de sicômoros, denuncia a injustiça social de Israel: "Corra o direito como água e a justiça como ribeiro perene." Deus rejeita adoração que coexiste com opressão dos pobres. Na vida real: não é possível adorar a Deus aos domingos e explorar os vulneráveis nos outros dias. A adoração verdadeira transforma a ética.`;
  if (/jonas.*foge|jonas.*peixe|niinve.*arrependimento/i.test(p))
    return `Jonas foge de Deus para escapar de uma missão. Uma tempestade, um peixe, três dias, uma segunda chance. Nínive, a cidade inimiga, se arrepende — e Jonas fica com raiva porque Deus tem misericórdia. Na vida real: muitas vezes Deus tem mais misericórdia pelos nossos inimigos do que nós. O maior adversário de Jonas não era Nínive — era seu coração fechado para a graça.`;
  if (/miqueias.*belem|governante.*belem|miqueas/i.test(p))
    return `Miquéias anuncia que de Belém sairá aquele que governará Israel — profecia do nascimento do Messias. No mesmo livro: "O que o Senhor requer de ti: que pratiques a justiça, ames a misericórdia e andes humildemente com o teu Deus." Na vida real: a chegada do Rei não substitui a ética — a fundamenta.`;
  if (/naum|ninive.*destruicao.*naum/i.test(p))
    return `Naum anuncia o julgamento de Nínive — a mesma cidade que Deus havia poupado no tempo de Jonas. Desta vez, a arrogância está no máximo e o julgamento não virá como oportunidade de arrependimento, mas como destruição. Na vida real: a paciência de Deus tem propósito: ela é convite ao arrependimento. Ignorar esse convite repetidamente não é impunidade — é acúmulo.`;
  if (/habacuque|profeta.*queixa.*habacuque|injusto.*vivo|torre.*vigia/i.test(p))
    return `Habacuque faz ao Senhor as perguntas mais honestas do AT: "Por que permites a injustiça?" Deus responde com uma visão que exige espera. O profeta conclui: "Ainda que a figueira não produza... ainda assim me alegrarei no Senhor." Na vida real: fé madura não é ausência de perguntas — é persistência na confiança mesmo quando as respostas não chegam no nosso tempo.`;
  if (/sofonias|grande.*dia.*senhor.*sofonias/i.test(p))
    return `Sofonias anuncia o Dia do Senhor como purificação — primeiro julgamento, depois promessa: "O Senhor teu Deus está no meio de ti como poderoso Salvador. Ele se deleitará em ti com alegria." Na vida real: o julgamento bíblico não é fim — é purificação que abre caminho para a alegria plena de Deus habitando no meio do povo.`;
  if (/ageu|reconstruir.*templo.*ageu|ordem.*reconstruir/i.test(p))
    return `O povo voltou do exílio mas priorizou suas próprias casas. Deus diz através de Ageu: "Considerai os vossos caminhos." O povo obedece, começa a construção e Deus promete: "A glória futura deste templo será maior que a anterior." Na vida real: o chamado a priorizar a casa de Deus — a comunidade de adoração — antes das conveniências pessoais ainda ressoa hoje.`;
  if (/zacarias.*visoes|branc.*visao.*zacarias/i.test(p))
    return `Zacarias recebe visões noturnas de cavalos, chifres, medidor, lampião, oliveiras — cada uma prometendo que Deus não abandonou seu povo. "Não por poder, nem por força, mas pelo meu Espírito." Na vida real: a reconstrução do povo de Deus não é projeto humano sustentado pela habilidade humana — é obra do Espírito que age onde o poder humano chegou ao seu limite.`;
  if (/malaquias|mensageiro.*senhor.*malaquias|dizimo.*malaquias/i.test(p))
    return `Malaquias fecha o AT com acusações de Deus a um povo que oferece o pior ao Senhor — animais doentes, adoração de fachada, divórcio casual. E promete o enviado que preparará o caminho. Na vida real: a qualidade do que ofertamos a Deus reflete a qualidade do que cremos sobre Ele. Dar a Deus o que sobra revela que Ele não é de fato a prioridade.`;

  // Mateus [1]–[145]
  // [1]
  if (d.livroAbrev === 'Mt' && /genealogia de jesus/i.test(p))
    return `A simetria de A genealogia de Jesus Messias espelha A: filho de Abraão e Davi ↔ A': de Abraão a Davi são catorze gerações. No centro: três genealogias em paralelo (B1–B3). O pivô teológico é que o Messias tem história — nomes, falhas, exílios. Na vida da igreja: nenhuma linhagem é perfeita, mas Deus age dentro delas. A encarnação começa antes do presépio, nas genealogias imperfeitas. Que a nossa história, com todas as suas fraturas, também possa ser palco da graça.`;
  // [2]
  if (d.livroAbrev === 'Mt' && /nascimento de jesus/i.test(p))
    return `A simetria de O nascimento de Jesus Messias espelha A: José resolve repudiar Maria ↔ A': José recebeu Maria conforme o anjo ordenara. No centro: o cumprimento da palavra do Senhor pelo profeta (C). O pivô teológico é a obediência de José que transforma a crise em cumprimento. Na vida da igreja: a obediência silenciosa pode ser o gesto que permite que a promessa se cumpra. Deus age por meio de pessoas dispostas a mudar de plano quando o anjo fala.`;
  // [3]
  if (d.livroAbrev === 'Mt' && /visita.*magos|magos/i.test(p))
    return `A simetria de A visita de magos espelha A: magos chegam a Jerusalém ↔ A': partiram por outro caminho. No centro: a profecia de Miquéias (D). O pivô teológico é que pagãos do Oriente reconhecem o rei que Herodes quer eliminar. Na vida da igreja: Deus frequentemente é reconhecido primeiro pelos de fora. A adoração dos magos denuncia a indiferença ou hostilidade dos que tinham as Escrituras mas não foram ao presépio.`;
  // [4]
  if (d.livroAbrev === 'Mt' && /fuga.*egito|fuga a egito/i.test(p))
    return `A simetria de A fuga a Egito espelha A: palavras do anjo ↔ A': palavras do profeta. No centro: a obediência de José que levantou de noite (B). O pivô teológico é a correspondência entre o anjo e a Escritura — ambos dizem a mesma coisa. Na vida da igreja: a proteção divina age através de obediência imediata. José não esperou o amanhecer — levantou-se de noite. A fé que protege raramente tem a opção de esperar.`;
  // [5]
  if (d.livroAbrev === 'Mt' && /massacre.*bebes|massacre dos bebes/i.test(p))
    return `A simetria de O massacre dos bebês espelha A: genocídio das crianças ↔ A': Raquel chorando seus filhos. No centro: o cumprimento da profecia de Jeremias (B). O pivô teológico é que o lamento de Raquel é profecia — o sofrimento real encontra eco na Escritura. Na vida da igreja: a teologia cristã não minimiza o sofrimento inocente. O Evangelho começa com choro. Deus não anestesia a dor — a inscreve na história da redenção.`;
  // [6]
  if (d.livroAbrev === 'Mt' && /retorno.*egito|retorno de egito/i.test(p))
    return `A simetria de O retorno de Egito espelha A: mensagem de sonho ↔ A': mensagem de sonho. No centro: as viagens de José com a família (B–B'). O pivô teológico é a dupla orientação por sonho — Deus guia passo a passo, não com um plano completo revelado de uma vez. Na vida da igreja: a obediência ao que Deus diz hoje não exige ver todo o caminho. José foi para Israel, depois para Nazaré — guiado por etapas.`;
  // [7]
  if (d.livroAbrev === 'Mt' && /proclamacao.*joao.*batista|proclamacao de joao/i.test(p))
    return `A simetria de A proclamação de João Batista espelha A: arrependei-vos ↔ A': produzi frutos dignos de arrependimento. No centro: João como profeta (C). O pivô teológico é que o arrependimento não é sentimento — é fruto. Na vida da igreja: preparar o caminho do Senhor começa com honestidade sobre o que precisa mudar. João não anunciava um Deus tolerante com a hipocrisia — anunciava um que está chegando e já tem o machado na raiz.`;
  // [8]
  if (d.livroAbrev === 'Mt' && /batismo de jesus/i.test(p))
    return `A simetria de O batismo de Jesus espelha A: Jesus vai ser batizado ↔ A': depois de ser batizado. No centro: a correspondência entre cumprir toda justiça e ser o Filho amado (B–B'). O pivô teológico é que identidade e missão chegam juntas no batismo. Na vida da igreja: antes de qualquer ministério, há a voz do Pai sobre a identidade. "Este é o meu Filho amado" não é aprovação por desempenho — é declaração que precede toda ação.`;
  // [9]
  if (d.livroAbrev === 'Mt' && /tentacao de jesus/i.test(p))
    return `A simetria de A tentação de Jesus espelha A: o Espírito leva Jesus ↔ A': os anjos ministram a Jesus. No centro: não tentarás o Senhor teu Deus (C). O pivô teológico é que a fé não força a mão de Deus — confia nele sem exigir prova. Na vida da igreja: toda tentação tem uma lógica aparente. O diabo não pede o óbvio — pede o razoável. A resistência de Jesus vem da Palavra bem aplicada, não apenas memorizada.`;
  // [10]
  if (d.livroAbrev === 'Mt' && /jesus.*ministerio.*galile|jesus inicia.*ministerio/i.test(p))
    return `A simetria de Jesus começa seu ministério em Galiléia espelha A: João preso ↔ A': Jesus começa a pregar. No centro: o cumprimento de Isaías sobre a Galileia (C). O pivô teológico é que a prisão de João não interrompe o reino — é o sinal de que o próximo capítulo começou. Na vida da igreja: o silenciamento de um mensageiro não cala a mensagem. Deus levanta o próximo donde o último parou.`;
  // [11]
  if (d.livroAbrev === 'Mt' && /chama.*primeiros.*discipulos|jesus chama/i.test(p))
    return `A simetria de Jesus chama primeiro discípulos espelha A: Jesus vê Simão e André ↔ A': Jesus vê Tiago e João. No centro: os irmãos deixam tudo e seguem (C–C'). O pivô teológico é a imediatidade — "deixando imediatamente". Na vida da igreja: o chamado de Jesus não espera conveniência. Os primeiros discípulos não negociaram nem adiaram. A velocidade da resposta revela o peso que a palavra de Jesus tinha sobre eles.`;
  // [12]
  if (d.livroAbrev === 'Mt' && /jesus ministra.*multidoes/i.test(p))
    return `A simetria de Jesus ministra às multidões espelha A: por toda a Galileia ↔ A': da Galileia, Decápolis, Jerusalém e Judeia. No centro: a fama que se espalha pela Síria (C). O pivô teológico é a compaixão que precede toda estratégia — Jesus cura porque tem compaixão, não porque quer fama. Na vida da igreja: o ministério que nasce da compaixão não precisa de marketing. A necessidade real das pessoas atrai quem realmente ama.`;
  // [13]
  if (d.livroAbrev === 'Mt' && /bem.*aventurancas/i.test(p))
    return `A simetria de As bem-aventuranças espelha A: o reino dos céus ↔ A': o reino dos céus. No centro: ser saciado e a regra de ouro (D–D'). O pivô teológico é que o reino é dado aos que não o merecem segundo critérios humanos — pobres de espírito, mansos, que choram. Na vida da igreja: a constituição do reino inverte toda pirâmide. Quem o mundo marginaliza, Deus exalta. Isso não é consolo — é realidade do reino que já chegou.`;
  // [14]
  if (d.livroAbrev === 'Mt' && /sal e luz/i.test(p))
    return `A simetria de Sal e luz espelha A: vós sois o sal ↔ A': vós sois a luz. No centro: a reação das outras pessoas (C–C'). O pivô teológico é que identidade e missão são inseparáveis — não "fazei boas obras" mas "vós sois". Na vida da igreja: antes de perguntar o que devo fazer, a pergunta é o que sou. Sal que perdeu o sabor e luz escondida não são problemas de programa — são problemas de identidade esquecida.`;
  // [15]
  if (d.livroAbrev === 'Mt' && /lei e.*profetas|lei e os profetas/i.test(p))
    return `A simetria de A lei e os profetas espelha A: não vim abolir a lei ↔ A': quem violar um mínimo mandamento. No centro: o céu e a terra passarão antes da lei falhar (B–B'). O pivô teológico é a permanência da lei que Jesus veio cumprir, não destruir. Na vida da igreja: Jesus não aboliu a lei — radicalizou-a. A justiça que ele pede excede a dos fariseus porque vai ao coração, não apenas ao comportamento externo.`;
  // [16]
  if (d.livroAbrev === 'Mt' && /sobre.*ira|sobre a ira/i.test(p))
    return `A simetria de Sobre ira espelha A: quem matar será réu de julgamento ↔ A': teu adversário te entregará ao juiz. No centro: vai primeiro reconciliar-te com teu irmão (B). O pivô teológico é que a oferta a Deus é inseparável da reconciliação com o irmão. Na vida da igreja: não se pode adorar com integridade enquanto se sustenta uma ruptura não resolvida. Jesus coloca a reconciliação horizontal antes do ato vertical de adoração.`;
  // [17]
  if (d.livroAbrev === 'Mt' && /adulterio e divorcio|sobre.*adulterio/i.test(p))
    return `A simetria de Sobre adultério e divórcio espelha A: olhar com cobiça já é adultério ↔ A': repudiar a mulher a torna adúltera. No centro: o olho direito e a mão direita que escandalizem (B–B'). O pivô teológico é que o pecado começa no olhar, não na ação. Na vida da igreja: a pureza sexual não é apenas comportamental — é formação do olhar. O que alimentamos nos olhos forma o que o coração deseja.`;
  // [18]
  if (d.livroAbrev === 'Mt' && /sobre.*juramentos|sobre os juramentos/i.test(p))
    return `A simetria de Sobre juramentos espelha A: não jurarás em falso ↔ A': seja vosso falar sim, sim; não, não. No centro: a lista de objetos pelos quais não se deve jurar (B1–B4). O pivô teológico é a integridade da palavra — quem precisa jurar ainda não alcançou a credibilidade que o discípulo deve ter. Na vida da igreja: a palavra do cristão deve valer sem reforços. Quando temos de jurar para ser acreditados, é sinal de que nossa reputação precisa de restauração.`;
  // [19]
  if (d.livroAbrev === 'Mt' && /sobre.*retaliacao/i.test(p))
    return `A simetria de Sobre retaliação espelha A: não resistais ao mal ↔ A': dá a quem te pedir. No centro: a face direita, a túnica, a milha extra (B1–B3). O pivô teológico é a não-reciprocidade como estilo de vida do discípulo. Na vida da igreja: o mundo opera na lógica do equivalente — dou o que recebi. Jesus inverte: dá mais do que o exigido. Isso não é fraqueza — é o poder do reino que desarma o ciclo da retaliação.`;
  // [20]
  if (d.livroAbrev === 'Mt' && /amor.*inimigos|amor para inimigos/i.test(p))
    return `A simetria de Amor para inimigos espelha A: amai os inimigos ↔ A': se amardes apenas quem vos ama. No centro: serdes filhos do Pai celestial (B–B'). O pivô teológico é que amar inimigos não é estratégia — é participação no caráter de Deus que faz chover sobre justos e injustos. Na vida da igreja: o critério para amar não pode ser a reciprocidade. Onde paramos de amar por falta de retorno, revelamos que ainda não captamos a lógica do Pai.`;
  // [21]
  if (d.livroAbrev === 'Mt' && /sobre.*esmola/i.test(p))
    return `A simetria de Sobre esmola espelha A: não tereis recompensa do Pai celestial ↔ A': teu Pai que vê em segredo te recompensará. No centro: os hipócritas que já receberam sua recompensa (C). O pivô teológico é que a esmola pública troca a recompensa de Deus pela aprovação humana. Na vida da igreja: o anonimato da generosidade não é modéstia — é teologia. Dar sem audiência é uma declaração de que o único Pai de quem buscamos aprovação está no céu.`;
  // [22]
  if (d.livroAbrev === 'Mt' && /sobre.*oracao.*mt.*6\.5|sobre a oracao/i.test(p))
    return `A simetria de Sobre oração espelha A: quando orardes em público ↔ A': quando orares em secreto. No centro: as recompensas públicas versus a recompensa do Pai (B–B'). O pivô teológico é que a oração tem um destinatário — Deus, não a plateia. Na vida da igreja: oração que precisa de audiência revelou quem de fato está sendo adorado. A oração no quarto fechado é o calibrador da autenticidade de toda oração pública.`;
  // [23]
  if (d.livroAbrev === 'Mt' && /oracao do senhor|pai nosso|nao senhor oracao/i.test(p))
    return `A simetria de A oração do Senhor espelha A: vosso Pai sabe antes que peçais ↔ A': vosso Pai não perdoará se não perdoardes. No centro: o pão de cada dia (E). O pivô teológico é que oração alinhada começa com Deus (nome, reino, vontade) antes de chegar às necessidades. Na vida da igreja: a ordem do Pai Nosso é pedagógica — nos forma na prioridade. Quem começa pela necessidade ainda não aprendeu onde está o centro.`;
  // [24]
  if (d.livroAbrev === 'Mt' && /sobre.*jejum/i.test(p))
    return `A simetria de Sobre jejum espelha A: não mostreis semblante triste ↔ A': lava o rosto. No centro: os hipócritas já receberam sua recompensa (C–C'). O pivô teológico é que o jejum autêntico é invisível ao redor e visível apenas a Deus. Na vida da igreja: o jejum que precisa ser percebido já virou performance. Lavar o rosto antes de jejuar é um ato teológico — une humildade exterior com intensidade interior.`;
  // [25]
  if (d.livroAbrev === 'Mt' && /sobre.*tesouros/i.test(p))
    return `A simetria de Sobre tesouros espelha A: não acumuleis tesouros na terra ↔ A': acumulai tesouros no céu. No centro: onde está o tesouro, aí estará o coração (P). O pivô teológico é que acumular revela prioridade. Na vida da igreja: a questão não é quanto se tem, mas onde se confia. Tesouros terrenos não são errados em si — o problema é quando se tornam o lugar de segurança que só o céu pode oferecer.`;
  // [26]
  if (d.livroAbrev === 'Mt' && /olho sao|sao olho/i.test(p))
    return `A simetria de São olho espelha A: a candeia do corpo é o olho ↔ A': se a luz que há em ti são trevas. No centro: corpo iluminado versus corpo em trevas (B–B'). O pivô teológico é que o olho são não é apenas visão — é atenção, intenção, o que se escolhe ver. Na vida da igreja: a saúde espiritual começa no que alimentamos com o olhar. Corpo cheio de luz ou trevas não é resultado de circunstâncias — é resultado de escolhas do que recebemos como foco.`;
  // [27]
  if (d.livroAbrev === 'Mt' && /nao.*ansioso|nao fique ansioso/i.test(p))
    return `A simetria de Não Fique Ansioso espelha A: não podeis servir a Deus e a Mamom ↔ A': buscai em primeiro lugar o reino. No centro: nem as aves nem os lírios se preocupam (C–C'). O pivô teológico é que a ansiedade é falsa lealdade — diz que Mamom pode prover onde Deus não pode. Na vida da igreja: buscar primeiro o reino não é passividade — é reordenação de prioridades. A ansiedade diminui quando o rei, não a provisão, ocupa o centro.`;
  // [28]
  if (d.livroAbrev === 'Mt' && /judging others|julgamento.*outros/i.test(p))
    return `A simetria de Judging others espelha A: não julgueis ↔ A': não deis o que é santo aos cães. No centro: tira primeiro a trave do teu olho (B–B'). O pivô teológico é que quem julga sem se examinar perde o credencial para discernir. Na vida da igreja: a proibição de julgar não é relativismo — é sequência. Primeiro a própria trave. Depois, com o olho limpo, o discernimento é possível e necessário.`;
  // [29]
  if (d.livroAbrev === 'Mt' && /ask.*busca.*bate|pedi.*buscai.*batei/i.test(p))
    return `A simetria de Ask, busca, bate espelha A: pedi e dar-se-vos-á ↔ A': o Pai celestial dará boas coisas. No centro: o pai humano não dá pedra ao filho que pede pão (B). O pivô teológico é o argumento do menor para o maior — se pais falhos dão boas coisas, quanto mais o Pai perfeito. Na vida da igreja: a persistência na oração não convence Deus — ela forma o coração do que ora. Pedir, buscar e bater são postura de dependência, não técnica de negociação.`;
  // [30]
  if (d.livroAbrev === 'Mt' && /estreito.*porta|porta estreita/i.test(p))
    return `A simetria de Estreito porta espelha A: larga é a porta ↔ A': como é estreita a porta. No centro: entrai pela porta estreita (P). O pivô teológico é o contraste numérico — muitos entram pela larga, poucos pela estreita. Na vida da igreja: a popularidade de um caminho não é validação. Jesus não chama para o caminho de menor resistência — chama para o que conduz à vida, mesmo sendo estreito e difícil. A maioria não é critério de verdade.`;
  // [31] Mt 7
  if (d.livroAbrev === 'Mt' && /arvore.*fruto|um arvore e fruto/i.test(p) && d.capitulos.startsWith('7'))
    return `A simetria de Um árvore e fruto (Mt 7) espelha A: pelos frutos os conhecereis ↔ A': pelos frutos os conhecereis. No centro: boa árvore produz bons frutos (B–B'). O pivô teológico é a correspondência inevitável entre a natureza e o produto. Na vida da igreja: o ensinamento de Jesus sobre falsos profetas não depende de revelação especial — depende de observação paciente. Frutos revelam raízes. O que uma vida produz ao longo do tempo é mais confiável que as palavras que afirma.`;
  // [32]
  if (d.livroAbrev === 'Mt' && /auto.*engano|engano de si mesmo/i.test(p))
    return `A simetria de Sobre engano de si mesmo espelha A: Senhor, Senhor ↔ A': Senhor, Senhor. No centro: fazer a vontade do Pai versus praticar iniquidade (B–B'). O pivô teológico é a possibilidade de confessar Jesus sem conhecê-lo. Na vida da igreja: profecia, exorcismo e milagres em nome de Jesus não garantem relação com ele. O critério final é fazer a vontade do Pai — não o volume do ministério, mas a obediência cotidiana.`;
  // [33]
  if (d.livroAbrev === 'Mt' && /ouvintes.*praticantes|que ouvem.*praticam/i.test(p))
    return `A simetria de Ouvintes e praticantes espelha A: os que praticam ↔ A': os que não praticam. No centro: a casa que não cai versus a casa que cai (B–B'). O pivô teológico é que ouvir sem praticar não é neutro — é construir sobre areia. Na vida da igreja: o Sermão do Monte termina com uma pergunta implícita: sobre qual fundamento está minha vida? A resposta não é doutrinária — é verificável pela resistência que minha vida demonstra nas tempestades.`;
  // [34]
  if (d.livroAbrev === 'Mt' && /jesus purifica um leproso/i.test(p))
    return `A simetria de Jesus purifica um leproso espelha A: Senhor, se quiseres, podes purificar-me ↔ A': a sua lepra ficou purificada. No centro: as palavras de Jesus (B–B'). O pivô teológico é a condição do leproso: "se quiseres" — fé sem presumir. Na vida da igreja: orar com humildade não é falta de fé — é reconhecer que Deus age na soberania, não à nossa ordem. "Se quiseres" é a oração mais honesta e mais fiel ao mesmo tempo.`;
  // [35]
  if (d.livroAbrev === 'Mt' && /centuriao|cura.*servo.*centuriao/i.test(p))
    return `A simetria de Jesus cura um de centurião servo espelha A: meu servo está paralítico ↔ A': o servo ficou curado. No centro: muitos virão do Oriente e Ocidente ao banquete (C'). O pivô teológico é a fé do centurião que supera a de Israel — gentio entende autoridade delegada melhor que os religiosos. Na vida da igreja: fé não é produto de ambiente religioso. O centurião não cresceu nos salmos — cresceu na cadeia de comando. E reconheceu a autoridade de Jesus onde os entendidos tropeçaram.`;
  // [36]
  if (d.livroAbrev === 'Mt' && /casa de pedro|cura.*casa de pedro/i.test(p))
    return `A simetria de Jesus cura muitos na casa de Pedro espelha A: Jesus entra na casa de Pedro ↔ A': trouxeram-lhe muitos endemoninhados. No centro: o cumprimento da profecia de Isaías (P). O pivô teológico é que a cura individual (sogra de Pedro) e a cura coletiva são ambas cumprimento da missão do Servo sofredor. Na vida da igreja: o ministério de Jesus não distingue o íntimo do público — o mesmo cuidado que cura uma febre curou multidões.`;
  // [37]
  if (d.livroAbrev === 'Mt' && /would.*be.*seguidores|seguidores de jesus/i.test(p))
    return `A simetria de Would-be seguidores de Jesus espelha A: palavras do escriba ↔ A': palavras do discípulo. No centro: a resposta de Jesus (B–B'). O pivô teológico é que Jesus não recruta com promessas fáceis — o Filho do Homem não tem onde reclinar a cabeça. Na vida da igreja: o chamado de Jesus é honesto sobre o custo. Quem é atraído pelo conforto do seguimento vai ser surpreendido pela realidade. O compromisso com os mortos não pode atrasar o compromisso com o reino vivo.`;
  // [38]
  if (d.livroAbrev === 'Mt' && /acalma.*tempestade|jesus acalma/i.test(p))
    return `A simetria de Jesus acalma A tempestade espelha A: grande tempestade ↔ A': grande bonança. No centro: a reação das pessoas diante de Jesus (B–B'). O pivô teológico é o contraste entre o pânico dos discípulos e o sono de Jesus — quem dorme não é o que não vê o perigo, mas o que não precisa do perigo para dormir. Na vida da igreja: a paz que Jesus dá não é ausência de tempestade — é a presença de quem tem autoridade sobre ela.`;
  // [39]
  if (d.livroAbrev === 'Mt' && /gadarenos|endemoninhados.*gadara/i.test(p))
    return `A simetria de Jesus cura Gadarenos endemoninhados espelha A: dois endemoninhados saem ao encontro ↔ A': toda a cidade saiu ao encontro de Jesus. No centro: as palavras de Jesus (E). O pivô teológico é que a cidade, após a libertação, pediu que Jesus fosse embora — a cura custou os porcos. Na vida da igreja: a presença de Jesus sempre tem custo. Quando o preço da cura parece alto demais, a comunidade pode preferir o familiar à liberdade que ele oferece.`;
  // [40]
  if (d.livroAbrev === 'Mt' && /jesus cura um paralitico/i.test(p))
    return `A simetria de Jesus cura um paralítico espelha A: teus pecados estão perdoados ↔ A': levanta-te, toma o leito. No centro: blasfêmia versus glorificação a Deus (B–B'). O pivô teológico é que Jesus cura o que os críticos não veem — primeiro o pecado, depois o corpo. Na vida da igreja: a cura mais importante não é sempre a mais visível. Jesus poderia ter curado o paralítico sem mencionar o pecado — mas a raiz mais profunda precisava ser tratada primeiro.`;
  // [41]
  if (d.livroAbrev === 'Mt' && /chamado de mateus/i.test(p))
    return `A simetria de O chamado de Mateus espelha A: segue-me ↔ A': não vim chamar justos, mas pecadores. No centro: Jesus à mesa com publicanos e pecadores (B–B'). O pivô teológico é que a mesa de Jesus é escândalo — quem come junto define comunidade. Na vida da igreja: o evangelismo começa com presença, não com palco. Jesus não enviou Mateus para um seminário — sentou com ele e seus amigos. A mesa aberta é estratégia missionária antes de ser tradição litúrgica.`;
  // [42]
  if (d.livroAbrev === 'Mt' && /questao.*jejum|pergunta.*jejum/i.test(p))
    return `A simetria de A pergunta sobre jejum espelha A1: discípulos e o esposo ↔ A3: vinho novo e odres velhos. No centro: o novo não cabe no velho (B2–B3). O pivô teológico é que Jesus não é uma emenda na religião — é algo radicalmente novo. Na vida da igreja: não se pode conter o evangelho em estruturas feitas para outro vinho. A resistência ao novo nem sempre é fidelidade — às vezes é simplesmente odre velho que não se dobrou.`;
  // [43]
  if (d.livroAbrev === 'Mt' && /filha de jairo|menina.*mulher.*curou/i.test(p))
    return `A simetria de Um menina restaurado a vida e uma mulher curou espelha A: minha filha acaba de morrer ↔ A': a menina se levantou. No centro: desde aquela hora a mulher ficou curada (C). O pivô teológico é que Jesus atende no caminho — a mulher é curada enquanto ele vai para a menina. Na vida da igreja: a interrupção no caminho da missão pode ser a própria missão. Jesus não se irritou com a demora — curou a mulher e depois ressuscitou a menina.`;
  // [44] Mt 9
  if (d.livroAbrev === 'Mt' && /jesus cura dois.*cego/i.test(p) && d.capitulos.startsWith('9'))
    return `A simetria de Jesus cura dois cego homens (Mt 9) espelha A: dois cegos clamam ↔ A': a fama se espalhou. No centro: a confissão de fé (C). O pivô teológico é a pergunta de Jesus: "Credes que posso fazer isso?" — fé é pré-condição, não consequência. Na vida da igreja: Jesus não cura para produzir fé — responde à fé que já existe, mesmo incipiente. A confissão simples "sim, Senhor" é suficiente para mover a mão de Jesus.`;
  // [45]
  if (d.livroAbrev === 'Mt' && /jesus cura um.*mudo|cura.*mudo/i.test(p))
    return `A simetria de Jesus cura um que foi mudo espelha A: o demônio foi expulso ↔ A': expulsa pelo príncipe dos demônios. No centro: nunca se viu coisa semelhante em Israel (B). O pivô teológico é o contraste entre admiração popular e acusação farisaica — o mesmo milagre divide as audiências. Na vida da igreja: a obra de Deus não produz consenso. O que uns reconhecem como graça, outros atribuem ao diabo. A divisão que Jesus provoca não é acidente — é revelação do coração.`;
  // [46]
  if (d.livroAbrev === 'Mt' && /messe.*grande.*operarios|colheita.*grande/i.test(p))
    return `A simetria de A colheita é grande, Os trabalhadores poucos espelha A: Jesus percorria todas as cidades ↔ A': a messe é grande, os operários são poucos. No centro: encheu-se de compaixão (B). O pivô teológico é que a missão nasce da compaixão de Jesus, não da urgência estratégica. Na vida da igreja: a resposta à escassez de obreiros não é recrutamento — é oração. "Rogai ao Senhor da messe" é o primeiro passo, não o último recurso.`;
  // [47]
  if (d.livroAbrev === 'Mt' && /doze apostolos/i.test(p))
    return `A lista dos doze apóstolos é o registro de quem Jesus escolheu — pescadores, publicano, zelote. A diversidade é intencional: o reino não é monolítico. O pivô teológico é que Judas Iscariotes está na lista — Jesus não ignora quem vai trair. Na vida da igreja: a comunidade cristã inclui pessoas com histórias, temperamentos e lealdades diferentes. A unidade não vem de uniformidade — vem de um único Senhor que chama pessoas díspares ao mesmo seguimento.`;
  // [48]
  if (d.livroAbrev === 'Mt' && /missao.*doze/i.test(p))
    return `A simetria de A missão de doze espelha A: não tomeis o caminho dos gentios ↔ A': mais tolerável para Sodoma. No centro: o operário é digno do seu sustento (E). O pivô teológico é a dependência intencional — ir sem bolsa, sem sandálias extras, confiando na hospitalidade. Na vida da igreja: a missão com dependência estrutural não é ingenuidade — é teologia. O missionário que chega sem recursos precisa de anfitriões, e os anfitriões precisam de bênção. A missão conecta comunidades.`;
  // [49]
  if (d.livroAbrev === 'Mt' && /vinda.*perseguicoes|perseguicoes futuras/i.test(p))
    return `A simetria de Vinda perseguições espelha A: vos entregarão aos tribunais ↔ A': sereis odiados por todos. No centro: o mestre e o discípulo (C'). O pivô teológico é que a perseguição não é sinal de que algo errou — é sinal de fidelidade à missão. Na vida da igreja: Jesus prepara os discípulos para a oposição antes de enviá-los. Comunidades que nunca enfrentam resistência deveriam perguntar se o evangelho que pregam ainda ofende alguma coisa.`;
  // [50]
  if (d.livroAbrev === 'Mt' && /quem.*temer|a quem.*fear/i.test(p))
    return `A simetria de A quem a fear espelha A: falai à luz do dia ↔ A': todo aquele que me confessar. No centro: nem um pardal cai sem o Pai (C–C'). O pivô teológico é que o medo de Deus liberta do medo humano. Na vida da igreja: o discípulo que teme a Deus não teme os homens com o mesmo peso. A coragem na confissão pública não é heroísmo — é consequência de saber que os cabelos estão contados e que o Pai cuida.`;
  // [51]
  if (d.livroAbrev === 'Mt' && /nao.*paz.*espada/i.test(p))
    return `A simetria de Não paz, mas um espada espelha A: paz e espada ↔ A': encontrar e perder a vida. No centro: separar filho do pai, filha da mãe (B–B'). O pivô teológico é que o evangelho divide antes de unir. Na vida da igreja: a lealdade a Jesus pode criar tensão com lealdades familiares. Isso não é incentivo à ruptura — é aviso honesto de que o chamado é supremo. Quem ama pai ou mãe mais que a Jesus ainda não encontrou a ordem certa das lealdades.`;
  // [52]
  if (d.livroAbrev === 'Mt' && /as recompensas|recompensas/i.test(p))
    return `A simetria de As Recompensas espelha A: quem vos recebe ↔ A': por ser discípulo. No centro: a recompensa de profeta e de justo (B–B'). O pivô teológico é que receber o discípulo é receber Jesus. Na vida da igreja: a hospitalidade para com os enviados do reino tem valor eterno. Um copo de água fria dado a um discípulo não perde recompensa — o menor gesto de acolhimento do mensageiro conta como acolhimento do Mestre.`;
  // [53]
  if (d.livroAbrev === 'Mt' && /mensageiros.*joao.*batista|enviados.*joao/i.test(p))
    return `A simetria de Mensageiros de João Batista espelha A: és tu aquele que há de vir? ↔ A': veio o Filho do Homem. No centro: o menor no reino dos céus é maior que João (D). O pivô teológico é a transição de eras — João pertence ao AT, mas quem está no reino está num lugar maior. Na vida da igreja: a pergunta de João na prisão não é fraqueza de fé — é teologia honesta. Jesus responde com obras, não com rótulos. O critério do Messias é o que acontece: cegos veem, coxos andam, pobres ouvem as boas novas.`;
  // [54]
  if (d.livroAbrev === 'Mt' && /lamentos.*cidades|cidades impenitentes/i.test(p))
    return `A simetria de Lamentos a Impenitente cidades espelha A: Corazim e Betsaida ↔ A': Cafarnaum. No centro: o dia do juízo (B–B'). O pivô teológico é que privilégio aumenta responsabilidade. Na vida da igreja: Corazim e Betsaida não eram más em excesso — simplesmente não se arrependeram apesar dos milagres. Ter crescido na Bíblia, ter ouvido o evangelho desde criança, não é garantia — pode ser agravante no juízo se não houver resposta real.`;
  // [55]
  if (d.livroAbrev === 'Mt' && /jesus agradece.*pai|agradece ao pai/i.test(p))
    return `A simetria de Jesus Agradece a seu Pai espelha A: os simples (νηπίος) ↔ A': os cansados e sobrecarregados. No centro: aprender de mim (B'). O pivô teológico é que a revelação está escondida dos sábios e entregue aos simples. Na vida da igreja: o convite "vinde a mim" é para os que chegaram ao limite do esforço. O jugo de Jesus é leve não porque a vida cristã é fácil, mas porque ele carrega junto. A aprendizagem se dá no jugo, não na distância.`;
  // [56]
  if (d.livroAbrev === 'Mt' && /colhendo.*espigas.*sabado|questao.*sabado/i.test(p))
    return `A simetria de Colhendo Espigas no Sábado espelha A: Jesus no sábado ↔ A': o Filho do Homem é Senhor do sábado. No centro: sacerdotes violam o sábado e são inocentes (C–C'). O pivô teológico é que Jesus não viola o sábado — ele o cumpre. Na vida da igreja: o legalismo tende a proteger a regra mais do que a pessoa. Jesus sempre prioriza a pessoa. O sábado foi feito para o ser humano, não o inverso. Misericórdia pesa mais do que sacrifício ritual.`;
  // [57]
  if (d.livroAbrev === 'Mt' && /homem.*mao.*ressequida|mao.*seca/i.test(p))
    return `A simetria de O homem com um seco mão espelha A: partindo dali ↔ A': os fariseus saíram. No centro: salvar a ovelha no sábado (D). O pivô teológico é a pergunta de Jesus: é lícito fazer o bem no sábado? Na vida da igreja: quando a religião proíbe o bem, algo está errado. Os fariseus saíram para complotar contra Jesus logo após ele curar. A rigidez religiosa pode produzir mais dureza do coração do que aqueles que não têm religião alguma.`;
  // [58]
  if (d.livroAbrev === 'Mt' && /servo.*escolhido.*deus|servo de deus/i.test(p))
    return `A simetria de De Deus escolhido servo espelha A: ordenou que não o tornassem manifesto ↔ A': não contenderá nem gritará. No centro: o cumprimento da profecia de Isaías (B). O pivô teológico é o servo silencioso que não briga nem grita nas praças — padrão oposto ao messianismo político esperado. Na vida da igreja: o impacto do reino frequentemente acontece sem anúncio. Deus age em quietude onde o espetáculo esperava ser o palco.`;
  // [59]
  if (d.livroAbrev === 'Mt' && /jesus e belzebu|beelzebul/i.test(p))
    return `A simetria de Jesus e Beelzebul espelha A: o Filho de Davi ↔ A': o Filho do Homem. No centro: expulsar demônios pelo Espírito versus pelo poder de Belzebu (D–D'). O pivô teológico é que o reino de Deus chegou se Jesus expulsa demônios pelo Espírito. Na vida da igreja: a blasfêmia contra o Espírito é atribuir a Satanás o que é claramente obra de Deus. O endurecimento que leva a isso não acontece de repente — é resultado de escolhas repetidas de recusa à luz.`;
  // [60] Mt 12
  if (d.livroAbrev === 'Mt' && /arvore.*fruto|um arvore e fruto/i.test(p) && d.capitulos.startsWith('12'))
    return `A simetria de Um árvore e fruto (Mt 12) espelha A: boa árvore e árvore má ↔ A': homem bom e homem mau. No centro: da abundância do coração fala a boca (B). O pivô teológico é que palavras revelam coração. Na vida da igreja: o teste das palavras é mais confiável do que o das ações planejadas. Ações podem ser administradas para a plateia — palavras espontâneas revelam o que está no coração. O que sai quando ninguém está preparando o discurso é o verdadeiro fruto.`;
  // [61]
  if (d.livroAbrev === 'Mt' && /exigencia.*sinal.*mt.*12|sinal.*mt.*12/i.test(p))
    return `A simetria de Sobre um Exigência para um Sinal espelha A: esta geração má e adúltera ↔ A': esta geração perversa. No centro: os homens de Nínive e a rainha do Sul se levantarão no juízo (B–B'). O pivô teológico é que pagãos responderam a menos que esta geração recebeu — e isso os condena. Na vida da igreja: exposição ao evangelho aumenta a responsabilidade. Não basta ter ouvido — a resposta é o que conta. Nínive se arrependeu com um sermão; Israel pediu mais sinais e ainda assim não creu.`;
  // [62]
  if (d.livroAbrev === 'Mt' && /verdadeira.*familia.*jesus|parentes.*jesus/i.test(p))
    return `A simetria de Verdadeiro parentes de Jesus espelha A: mãe e irmãos estavam lá fora ↔ A': eis aqui minha mãe e meus irmãos. No centro: quem é minha mãe? (B). O pivô teológico é a redefinição radical de família — não laço de sangue, mas obediência ao Pai. Na vida da igreja: a família de Deus é mais ampla e mais profunda que a biológica. Isso não deprecia a família natural — mas estabelece uma lealdade que a ultrapassa quando entra em conflito com a vontade do Pai.`;
  // [63]
  if (d.livroAbrev === 'Mt' && /parabola do semeador.*mt|semeador.*mt.*13\.1/i.test(p))
    return `A simetria de A parábola do semeador espelha A: falou-lhes por parábolas ↔ A': quem tem ouvidos, ouça. No centro: os quatro lugares onde a semente cai (B1–B4). O pivô teológico é que a semente é a mesma — o solo é o que varia. Na vida da igreja: a questão não é a qualidade do pregador ou da mensagem — é a condição do coração. Caminho, pedra, espinhos e boa terra podem estar na mesma congregação ao mesmo tempo.`;
  // [64]
  if (d.livroAbrev === 'Mt' && /semeador.*explicou|semeador.*explicada/i.test(p))
    return `A simetria de A parábola do semeador explicou espelha A: o conhecimento dos mistérios do reino ↔ A': explicação da parábola. No centro: bem-aventurados os olhos que veem (C). O pivô teológico é que entender a parábola é privilégio — os de fora não entendem porque não querem entender. Na vida da igreja: a clareza espiritual não é produto apenas de inteligência — é dom dado aos que querem. Quem busca entende; quem prefere a superfície permanece na parábola sem entrar no mistério.`;
  // [65]
  if (d.livroAbrev === 'Mt' && /parabola.*reino.*ceu.*1|parabola.*reino.*ceu.*mt.*13\.24/i.test(p))
    return `A simetria de A parábola do reino de céu 1 espelha as parábolas do joio, mostarda e fermento em paralelo (A1–A3). O pivô teológico é que o reino começa imperceptível e cresce sem ser detido. Na vida da igreja: o joio e o trigo coexistem até a colheita — a tentação de purificar a igreja prematuramente pode arrancar o trigo junto. O crescimento do reino não depende de nossa policia — depende do Senhor da messe.`;
  // [66]
  if (d.livroAbrev === 'Mt' && /parabola.*reino.*ceu.*2|parabola.*reino.*ceu.*mt.*13\.36/i.test(p))
    return `A simetria de A parábola do reino de céu 2 espelha A: lançados na fornalha de fogo ↔ A': lançados na fornalha de fogo. No centro: vender tudo e comprar (B–B'). O pivô teológico é que o reino vale mais do que tudo — o tesouro escondido e a pérola preciosa justificam a venda total. Na vida da igreja: o problema não é o custo do reino — é não ter visto seu valor. Quem entendeu vende com alegria, não com relutância.`;
  // [67]
  if (d.livroAbrev === 'Mt' && /tesouros novos.*velhos|tesouros novos e velhos/i.test(p))
    return `A simetria de Tesouros Novos e Antigos espelha A: palavras de Jesus ↔ A': palavras de Jesus. No centro: as palavras dos discípulos (B). O pivô teológico é o escriba instruído que tira do tesouro coisas novas e antigas — o Antigo Testamento lido à luz de Cristo. Na vida da igreja: fidelidade à tradição e abertura ao novo não são opostos — são complementos. O discípulo maduro sabe quando uma verdade antiga fala em linguagem nova.`;
  // [68]
  if (d.livroAbrev === 'Mt' && /rejeicao.*jesus.*nazare|rejection.*nazare/i.test(p))
    return `A simetria de Rejection de Jesus em Nazaré espelha A: foi para a sua pátria ↔ A': profeta não é desprezado senão na sua pátria. No centro: a incompreensão do povo (C). O pivô teológico é que o conhecimento de origem impede o reconhecimento de identidade. Na vida da igreja: a familiaridade pode ser o maior obstáculo à fé. Os que cresceram ouvindo sobre Jesus às vezes são os mais resistentes — a proximidade cultural não é o mesmo que encontro pessoal.`;
  // [69]
  if (d.livroAbrev === 'Mt' && /morte de joao.*batista/i.test(p))
    return `A simetria de A morte de João Batista espelha A: ressuscitou dos mortos ↔ A': tomaram o cadáver e enterraram. No centro: o juramento de Herodes (D). O pivô teológico é que Herodes mata por vergonha de voltar atrás num juramento feito em público. Na vida da igreja: a pressão social pode levar à violência moral e física. O medo do que os convidados pensariam custou a vida de João. A coragem de mudar de ideia em público é uma virtude que Herodes não tinha.`;
  // [70]
  if (d.livroAbrev === 'Mt' && /feeding cinco mil|multiplicacao.*cinco.*paes/i.test(p))
    return `A simetria de Feeding cinco mil espelha A: encheu-se de compaixão ↔ A': todos comeram e se fartaram. No centro: cinco pães e dois peixes (D). O pivô teológico é a sequência: compaixão → instrução aos discípulos → ação de graças → multiplicação. Na vida da igreja: o milagre começa no que há disponível. Jesus não esperou os recursos certos — abençoou o que estava ali. A escassez consagrada se torna abundância distribuída.`;
  // [71]
  if (d.livroAbrev === 'Mt' && /jesus caminha.*agua|caminha sobre.*agua/i.test(p))
    return `A simetria de Jesus caminha sobre A água espelha A: é um fantasma! ↔ A': verdadeiramente és o Filho de Deus. No centro: as palavras de Pedro (C–C'). O pivô teológico é que Pedro afunda não por falta de fé, mas por desviar o olhar. Na vida da igreja: fé não é ausência de medo — é manter o olhar em Jesus mesmo com medo. Pedro foi o único que andou sobre as águas. Que ele tenha afundado não cancela que andou — e Jesus alcançou a mão mesmo assim.`;
  // [72]
  if (d.livroAbrev === 'Mt' && /enfermos.*genesare|cura.*genesare/i.test(p))
    return `A simetria de Jesus Cura os Enfermos em Genesaré espelha A: chegaram ↔ A': levaram-lhe todos os enfermos. No centro: a proclamação pela região (B). O pivô teológico é a borda do manto — tão famosa a cura que bastava tocar a beira da veste. Na vida da igreja: fama de compaixão abre portas que nenhuma estratégia abre. Genesaré não foi alcançada por programa — foi alcançada porque a notícia de que Jesus curava se espalhou pelo testemunho dos que foram curados.`;
  // [73]
  if (d.livroAbrev === 'Mt' && /tradicao dos anciaos/i.test(p))
    return `A simetria de A tradição dos anciãos espelha A: não lavam as mãos ↔ A': comer sem lavar as mãos não contamina. No centro: o que sai da boca contamina (C). O pivô teológico é a inversão: pureza não é ritual exterior — é interior. Na vida da igreja: tradições religiosas podem se tornar muros entre as pessoas e Deus. Jesus não condena a tradição — condena quando ela substitui o mandamento de Deus. Honrar pai e mãe pesa mais que o Corban.`;
  // [74]
  if (d.livroAbrev === 'Mt' && /cananeia|fe.*mulher.*cananeia/i.test(p))
    return `A simetria de Cananeia de mulher fé espelha A: minha filha é atormentada ↔ A': sua filha ficou curada. No centro: o desejo da mãe (D). O pivô teológico é a persistência que vence a recusa — Jesus recusou duas vezes; ela não desistiu. Na vida da igreja: a fé da cananeia é o padrão de persistência em oração. Ela não tinha título religioso, raça certa ou status. Tinha necessidade e confiança que Jesus podia ajudar. Isso foi suficiente.`;
  // [75]
  if (d.livroAbrev === 'Mt' && /jesus cura muitas pessoas|cura muitos enfermos/i.test(p))
    return `A simetria de Jesus Cura Muitas Pessoas espelha A: Jesus sentou-se na montanha ↔ A': curou-os. No centro: correspondência entre as doenças e as curas (B–B'). O pivô teológico é a completude da cura — mudos a falar, aleijados sãos, coxos a andar, cegos a ver. Na vida da igreja: o ministério de cura de Jesus é abrangente. Não há categoria de necessidade humana que esteja fora do seu alcance. A multidão glorificou a Deus de Israel ao ver o que aconteceu.`;
  // [76]
  if (d.livroAbrev === 'Mt' && /feeding quatro mil|multiplicacao.*sete.*paes/i.test(p))
    return `A simetria de Feeding quatro mil espelha A: não têm o que comer ↔ A': todos comeram e se fartaram. No centro: sete pães e alguns peixes (D). O pivô teológico é a compaixão que não espera iniciativa humana — Jesus é quem vê a necessidade antes dos discípulos. Na vida da igreja: o segundo milagre de alimentação não é repetição — é confirmação. Deus não se cansa de suprir. A abundância que sobrou (sete cestos) é o sinal de que a graça excede a necessidade.`;
  // [77]
  if (d.livroAbrev === 'Mt' && /exigencia.*sinal.*mt.*16|sinal.*mt.*16/i.test(p))
    return `A simetria de A exigência para um sinal espelha A: pediram um sinal do céu ↔ A': esta geração pede um sinal. No centro: discernir o céu mas não os sinais dos tempos (B–B'). O pivô teológico é a ironia — sabem prever o clima mas não reconhecem o Messias diante deles. Na vida da igreja: pedir sinais pode ser expressão de fé ou de resistência. Quando o sinal é condição para crer, o problema não é falta de evidência — é disposição do coração.`;
  // [78]
  if (d.livroAbrev === 'Mt' && /fermento.*fariseus.*saduceus/i.test(p))
    return `A simetria de Cuidado do fermento de Fariseus e Saduceus espelha A: esqueceram o pão ↔ A': então entenderam. No centro: não acreditais por causa do pão esquecido? (C–C'). O pivô teológico é a cegueira espiritual mesmo após dois milagres de multiplicação. Na vida da igreja: os discípulos viram pão ser multiplicado duas vezes e ainda pensaram em falta de pão. A experiência de graça não garante memória de graça. É preciso cultivar intencionalmente a lembrança do que Deus fez.`;
  // [79]
  if (d.livroAbrev === 'Mt' && /confissao.*pedro/i.test(p))
    return `A simetria de De Pedro declaração espelha A: quem dizem que sou? ↔ A': quem dizeis que sou? No centro: palavras de Jesus a Pedro (P). O pivô teológico é a revelação do Pai — Pedro não chegou a isso por raciocínio, mas por revelação. Na vida da igreja: a confissão "tu és o Cristo, o Filho de Deus vivo" não é conclusão teológica — é revelação. Sobre essa pedra Jesus edifica a igreja. A confissão genuína de quem é Jesus é o fundamento de tudo.`;
  // [80]
  if (d.livroAbrev === 'Mt' && /jesus prediz.*morte.*ressurreicao.*mt.*16|morte.*ressurreicao.*predita/i.test(p))
    return `A simetria de Jesus prediz seu morte e ressurreição espelha A: era o Cristo ↔ A': vai, Satanás. No centro: a profecia da paixão (B). O pivô teológico é o contraste entre a confissão de Pedro (tu és o Cristo) e a repreensão de Jesus (vai, Satanás) — o mesmo Pedro em dois versículos. Na vida da igreja: é possível confessar Cristo corretamente e logo depois agir como adversário da vontade de Deus. Fé e obediência ao caminho da cruz são coisas distintas que precisam andar juntas.`;
  // [81]
  if (d.livroAbrev === 'Mt' && /cruz.*negacao.*si mesmo|abnegacao/i.test(p))
    return `A simetria de A cruz e negação de si mesmo espelha A: vir após mim ↔ A': o Filho do Homem vindo. No centro: que lucro terá o homem que ganhar o mundo e perder a alma (C–C'). O pivô teológico é o paradoxo do seguimento: perder a vida por Jesus é encontrá-la. Na vida da igreja: a abnegação não é masoquismo — é reorientação. O eu que morre é o eu autônomo que não precisa de Deus. O eu que vive é o que encontrou em Jesus o único centro estável.`;
  // [82]
  if (d.livroAbrev === 'Mt' && /transfiguracao/i.test(p))
    return `A simetria de A transfiguração espelha A: Moisés e Elias aparecem ↔ A': não viram ninguém senão Jesus sozinho. No centro: este é o meu Filho amado, ouvi-o (C). O pivô teológico é a absorção de Moisés e Elias em Jesus — a Lei e os Profetas culminam nele. Na vida da igreja: o clímax da revelação não é um sistema teológico — é uma Pessoa. Todos os fios da Escritura convergem para Jesus. Ao descer do monte, havia só Jesus.`;
  // [83]
  if (d.livroAbrev === 'Mt' && /elias.*ja.*come|elias ja veio/i.test(p))
    return `A simetria de Elias tem já come espelha A: palavras de Jesus sobre o Filho do Homem ↔ A': palavras de Jesus sobre o Filho do Homem. No centro: os discípulos entendem que falou de João Batista (B'). O pivô teológico é que a profecia de Elias se cumpriu em João — e foi rejeitado. Na vida da igreja: Deus cumpre promessas de formas que exigem olhos abertos para reconhecer. Quem esperava Elias literalmente perdeu João. Quem esperava o Messias triunfante perdeu Jesus crucificado.`;
  // [84]
  if (d.livroAbrev === 'Mt' && /menino.*demonio|cura.*menino.*endemoninhado/i.test(p))
    return `A simetria de Jesus Cura um Menino com um Demônio espelha A: os discípulos não puderam ↔ A': por que não pudemos? No centro: pouca fé (B'). O pivô teológico é a resposta de Jesus: por causa da vossa pouca fé. Na vida da igreja: há batalhas que os discípulos não conseguem vencer por ausência de fé — não ausência de técnica. A criança ficou em convulsão enquanto os discípulos faziam o que sabiam. Às vezes o problema não é método — é a fé que move montanhas.`;
  // [85]
  if (d.livroAbrev === 'Mt' && /jesus.*prediz.*novamente|prediz.*segunda.*vez.*morte/i.test(p))
    return `A segunda predição da paixão em Mateus 17 é breve — mas pesada. Jesus anuncia que será entregue nas mãos dos homens, morto e ressuscitado no terceiro dia. Os discípulos ficaram muito tristes. O pivô teológico é que a tristeza deles mostra que ainda não tinham integrado a ressurreição na promessa. Na vida da igreja: é possível ouvir a promessa da ressurreição e fixar apenas na morte. A fé madura aprende a segurar as duas partes — morte real, ressurreição real.`;
  // [86]
  if (d.livroAbrev === 'Mt' && /imposto.*templo/i.test(p))
    return `A simetria de Jesus e O templo imposto espelha A: o mestre paga o didracma? ↔ A': dá-lhes por mim e por ti. No centro: os reis da terra e seus filhos (C). O pivô teológico é que os filhos são livres — mas Jesus paga para não ofender. Na vida da igreja: liberdade e consideração pelo próximo não são opostos. Paulo ensina o mesmo em 1 Coríntios — tenho direito, mas abro mão por amor. A moeda no peixe é o sinal de que a liberdade do filho pode ser exercida com generosidade.`;
  // [87]
  if (d.livroAbrev === 'Mt' && /quem.*maior|sobre quem sera/i.test(p))
    return `A simetria de Sobre Quem Será o Maior espelha A: quem é o maior no reino? ↔ A': o maior no reino dos céus. No centro: tornar-se como crianças e acolher crianças (B–B'). O pivô teológico é que a criança como modelo não é sobre inocência — é sobre dependência radical. Na vida da igreja: a pergunta sobre quem é maior revela que os discípulos ainda operam com lógica de poder. Jesus não responde diretamente — mostra uma criança. O maior no reino é o que aprende a depender.`;
  // [88]
  if (d.livroAbrev === 'Mt' && /vida eterna.*mt.*18|eterno vida/i.test(p))
    return `A simetria de O eterno vida espelha A: melhor atar uma pedra ao pescoço ↔ A': melhor entrar manco na vida. No centro: os escândalos são inevitáveis (C). O pivô teológico é a gravidade do escândalo — causar tropeço ao pequeno é mais grave do que perder um membro. Na vida da igreja: o "ai" de Jesus sobre os escândalos não é retórica. Há um peso de responsabilidade sobre quem tem influência sobre os pequenos. O que ensinamos, modelamos e permitimos forma ou deforma os que nos seguem.`;
  // [89]
  if (d.livroAbrev === 'Mt' && /ovelha.*perdida|parabola.*ovelha/i.test(p))
    return `A simetria de A parábola de perdeu ovelha espelha A: não desprezeis os pequeninos ↔ A': que nenhum pequenino se perca. No centro: as noventa e nove e a ovelha extraviada (B–B'). O pivô teológico é que o Pai não está satisfeito com noventa e nove por cento. Na vida da igreja: o cuidado pelo que está fora não pode ser sacrificado pelo conforto do rebanho presente. A ovelha que se perdeu não perdeu valor por se perder. Deus não atualiza o cadastro — vai buscá-la.`;
  // [90]
  if (d.livroAbrev === 'Mt' && /corrigir.*irmao|repreendendo.*peca/i.test(p))
    return `A simetria de Repreendendo outro que pecados espelha A: reprova-o a sós entre ti e ele ↔ A': onde dois ou três estão reunidos em meu nome. No centro: na terra e no céu (B–B'). O pivô teológico é o processo graduado da correção fraterna — a sós, depois com testemunhas, depois a comunidade. Na vida da igreja: a repreensão começa em privado. O objetivo é ganhar o irmão, não expô-lo. A escala aumenta apenas quando o privado falhou — não como punição, mas como ampliação do cuidado.`;
  // [91]
  if (d.livroAbrev === 'Mt' && /servo.*impiedoso|parabola.*servo.*impiedoso/i.test(p))
    return `A simetria de A parábola de impiedoso servo espelha A: quantas vezes perdoarei? ↔ A': se não perdoardes de coração. No centro: o servo não perdoa (D). O pivô teológico é a proporção — uma dívida imperdoável foi perdoada, e o servo não perdoou uma ínfima. Na vida da igreja: o problema do servo não é não ter sido perdoado — é não ter deixado o perdão recebido transformar o coração. Receber graça sem ser formado por ela produz o monstro da parábola.`;
  // [92]
  if (d.livroAbrev === 'Mt' && /ensino.*divorcio|sobre.*divorcio/i.test(p))
    return `A simetria de Ensino sobre divórcio espelha A: é lícito repudiar a mulher ↔ A': carta de divórcio. No centro: o que Deus uniu o homem não separe (C). O pivô teológico é o retorno ao início — a criação define o padrão, não a concessão mosaica. Na vida da igreja: a dureza do coração humano gerou permissões que não eram o ideal de Deus. Jesus não endurece a lei — restaura a intenção original. Toda comunidade que lida com casamentos sabe o peso dessa passagem e a necessidade de graça real.`;
  // [93]
  if (d.livroAbrev === 'Mt' && /jesus.*bencoa.*criancas|abencoa.*criancas/i.test(p))
    return `A simetria de Jesus abençoa pequeno crianças espelha A: imposição de mãos e oração ↔ A': impôs-lhes as mãos. No centro: não os impeçais (B). O pivô teológico é a acessibilidade de Jesus — os discípulos bloquearam, Jesus abriu. Na vida da igreja: toda estrutura que afasta as crianças do centro do ministério de Jesus vai contra o espírito desta passagem. O reino dos céus pertence a elas — não como metáfora, mas como declaração de quem está mais próximo do padrão do reino.`;
  // [94]
  if (d.livroAbrev === 'Mt' && /jovem rico|rico.*jovem/i.test(p))
    return `A simetria de O rico jovem homem espelha A: alguém se aproximou ↔ A': o jovem foi embora triste. No centro: as condições de Jesus (B–B'). O pivô teológico é a inversão — o jovem que tinha tudo foi embora com o coração vazio; os discípulos que largaram tudo herdaram a vida eterna. Na vida da igreja: a questão do jovem rico não é sobre riqueza material — é sobre o que ocupa o lugar de Deus no coração. Cada geração tem seu equivalente da resposta correta às perguntas e da tristeza do que é pedido depois.`;
  // [95]
  if (d.livroAbrev === 'Mt' && /perigo.*riquezas|sobre.*riquezas/i.test(p))
    return `A simetria de Sobre O Perigo de Riquezas espelha A: difícil ao rico entrar no reino ↔ A': sentar em doze tronos. No centro: para Deus tudo é possível (C). O pivô teológico é que a salvação do rico é impossível para homens e possível para Deus. Na vida da igreja: o ensinamento sobre riqueza e reino não é convite à pobreza compulsória — é alerta sobre o que a riqueza faz ao coração. O camelo e a agulha não é hipérbole cômica — é aviso sobre a gravidade do apego.`;
  // [96]
  if (d.livroAbrev === 'Mt' && /trabalhadores.*vinha|trabalhadores no vinhedo/i.test(p))
    return `A simetria de Trabalhadores no Vinhedo espelha A: o reino é semelhante ↔ A': os últimos serão os primeiros. No centro: começando pelos últimos (E). O pivô teológico é a generosidade soberana que escandaliza quem calcula merecimento. Na vida da igreja: reclamar da generosidade de Deus com os que chegaram por último revela que ainda operamos em lógica de mercado. A graça não é justa — é generosa. Isso é escândalo para o religioso e libertação para o que chegou na última hora.`;
  // [97]
  if (d.livroAbrev === 'Mt' && /terceira.*vez.*prediz|terceiro.*morte.*ressurreicao/i.test(p))
    return `A terceira predição da paixão em Mateus 20 é a mais detalhada — Jesus menciona gentios, escárnio, flagelação e crucificação. O pivô teológico é a especificidade crescente: Jesus sabia para onde estava indo. Na vida da igreja: a coragem do caminho para Jerusalém não é heroísmo inconsciente — é obediência informada. Jesus subiu sabendo o que aconteceria. O discipulado inclui às vezes seguir em direção ao que sabemos que vai custar.`;
  // [98]
  if (d.livroAbrev === 'Mt' && /pedido.*mae.*tiago.*joao|mae de tiago e joao/i.test(p))
    return `A simetria de O pedido da Mãe de Tiago e João espelha A: desejando pedir um favor ↔ A': não sabeis o que pedis. No centro: sentar à direita e à esquerda (B–B'). O pivô teológico é que os lugares de honra ao lado de Jesus já estão reservados — mas para a cruz, não para o trono. Na vida da igreja: ambição de posição no reino ignora que a lógica do reino é o cálice e o batismo de sofrimento. Os que querem o trono precisam primeiro entender a cruz.`;
  // [99]
  if (d.livroAbrev === 'Mt' && /ser.*servo|ser um servo/i.test(p))
    return `A simetria de Ser um servo espelha A: os governantes dominam ↔ A': dar a vida em resgate por muitos. No centro: servir (B–B'). O pivô teológico é o Filho do Homem como modelo de serviço radical — não veio para ser servido, mas para servir e dar a vida. Na vida da igreja: liderança cristã é serviço estrutural, não gestão do poder. O contraste com os governantes pagãos é explícito — eles dominam, vós não sereis assim. A autoridade que Cristo dá é exercida de baixo para cima.`;
  // [100] Mt 20
  if (d.livroAbrev === 'Mt' && /jesus cura dois.*cego/i.test(p) && d.capitulos.startsWith('20'))
    return `A simetria de Jesus cura dois cego homens (Mt 20) espelha A: o seguiam ↔ A': o seguiram. No centro: que quereis que eu vos faça? (D). O pivô teológico é a pergunta de Jesus aos cegos — ele quer ouvir o pedido expresso, não apenas o óbvio. Na vida da igreja: Deus convida à articulação do desejo. "Que quereis?" não é ignorância — é respeito pela voz humana. Os cegos disseram "que os nossos olhos se abram" — e foram curados e seguiram. Ver para seguir.`;
  // [101]
  if (d.livroAbrev === 'Mt' && /entrada.*triunfal.*jerusalem/i.test(p))
    return `A simetria de De Jesus entrada triunfal em Jerusalém espelha A: aproximaram-se de Jerusalém ↔ A': entrou em Jerusalém. No centro: o comportamento dos discípulos e da multidão (C–C'). O pivô teológico é a vinda do rei manso, montado em jumento — cumprimento de Zacarias 9.9. Na vida da igreja: o reino de Jesus não chegou com exércitos — chegou com humildade. A aclamação popular que o recebe não durou uma semana. Servir a um rei manso exige mais do que gritar hosana.`;
  // [102]
  if (d.livroAbrev === 'Mt' && /jesus purifica.*templo/i.test(p))
    return `A simetria de Jesus purifica O templo espelha A: expulsou todos que vendiam e compravam ↔ A': saiu da cidade. No centro: cegos e coxos no templo, crianças gritando (C–C'). O pivô teológico é que Jesus expulsa o comércio e acolhe os marginais — o templo é casa de oração, não mercado. Na vida da igreja: o que ocupa espaço na casa de Deus define o que a comunidade valoriza. Quando o acesso ao lugar de oração é mediado por dinheiro, algo precisa ser purificado.`;
  // [103]
  if (d.livroAbrev === 'Mt' && /amaldicoa.*figueira|figueira.*seca/i.test(p))
    return `A simetria de Jesus amaldiçoa A figueira espelha A: palavras de Jesus ↔ A': palavras de Jesus. No centro: a figueira secou imediatamente (B–B'). O pivô teológico é a figueira com folhas mas sem frutos — aparência de vida, ausência de produto. Na vida da igreja: a figueira é Israel religioso que tem a forma da piedade mas não o fruto. O aviso se estende a toda comunidade que cultiva aparência sem substância. A fé que move montanhas não é magia — é confiança ativa na palavra de Deus.`;
  // [104]
  if (d.livroAbrev === 'Mt' && /autoridade.*jesus.*questionada|autoridade.*jesus.*contestada/i.test(p))
    return `A simetria de A autoridade de Jesus questionado espelha A: com que autoridade? ↔ A': com que autoridade faço estas coisas. No centro: do céu ou dos homens? (B–B'). O pivô teológico é a questão devolvida — Jesus não esquiva, desafia o presuposto. Na vida da igreja: a autoridade de Jesus não é validada pelos que detêm o poder religioso — é confirmada pelas obras e pelas Escrituras. Quando os que têm autoridade institucional recusam responder a perguntas honestas, revelam que a questão os desconforta.`;
  // [105]
  if (d.livroAbrev === 'Mt' && /parabola.*dois.*filhos/i.test(p))
    return `A simetria de A parábola de dois filhos espelha A: arrependeu-se e foi ↔ A': não vos arrependestes depois. No centro: a vontade do pai (B). O pivô teológico é que fazer a vontade do pai importa mais do que dizer que vai fazer. Na vida da igreja: publicanos e prostitutas entrarão primeiro no reino porque obedeceram ao João que os religiosos recusaram. O filho que disse não e foi é mais fiel que o que disse sim e não foi. Ação conta mais do que declaração.`;
  // [106]
  if (d.livroAbrev === 'Mt' && /lavradores.*maus|arrendatarios.*impios/i.test(p))
    return `A simetria de A parábola de ímpio arrendatários espelha A: parábola ↔ A': ouviram as suas parábolas. No centro: a pedra angular (C). O pivô teológico é a pedra que os construtores rejeitaram — tornou-se a principal. Na vida da igreja: Jesus não é apenas o herdeiro rejeitado — é a pedra angular sobre a qual tudo é construído ou destruída. O reino será tirado de quem não produz frutos e dado a um povo que produza. A vinha tem dono e ele cobra prestação de contas.`;
  // [107]
  if (d.livroAbrev === 'Mt' && /banquete.*casamento|parabola.*casamento/i.test(p))
    return `A simetria de A parábola do casamento banquete espelha A: mandou os servos chamar ↔ A': os que foram convidados não eram dignos. No centro: destruiu os assassinos e incendiou a cidade (C). O pivô teológico é que o convite rejeitado não cancela o banquete — estranhos são convidados. Na vida da igreja: a parábola anuncia a abertura do evangelho para os gentios após a rejeição de Israel. E termina com o homem sem traje — entrar no banquete exige responder ao convite com adequação, não apenas presença.`;
  // [108]
  if (d.livroAbrev === 'Mt' && /tributo.*cesar|paying.*impostos|questao.*cesar/i.test(p))
    return `A simetria de A pergunta sobre paying impostos espelha A: os fariseus foram ↔ A': retiraram-se. No centro: de quem é esta imagem? (C–C'). O pivô teológico é a distinção entre o que pertence a César e o que pertence a Deus. Na vida da igreja: a moeda traz a imagem de César — devolva-se a César. O ser humano foi feito à imagem de Deus — devolva-se a Deus. A pergunta sobre impostos se torna teologia da imago Dei. O que porte a imagem de Deus pertence a Deus.`;
  // [109]
  if (d.livroAbrev === 'Mt' && /questao.*ressurreicao|pergunta.*ressurreicao/i.test(p))
    return `A simetria de A pergunta sobre A ressurreição espelha A: foram ter com ele ↔ A': ficaram admirados. No centro: não conheceis as Escrituras nem o poder de Deus (D). O pivô teológico é a dupla ignorância — Escritura e poder. Na vida da igreja: argumentar com Deus a partir de premissas erradas sobre a ressurreição produz questões sem sentido. Jesus não valida a pergunta — corrige o pressuposto. Na ressurreição, a realidade é tão diferente que as categorias atuais simplesmente não se aplicam.`;
  // [110]
  if (d.livroAbrev === 'Mt' && /maior.*mandamento/i.test(p))
    return `A simetria de O Maior Mandamento espelha A: qual é o maior mandamento da lei? ↔ A': destes dois dependem toda a lei e os profetas. No centro: o primeiro e o segundo mandamento (C–C'). O pivô teológico é a síntese — amor a Deus e amor ao próximo como estrutura de toda obrigação moral. Na vida da igreja: o maior mandamento não elimina os outros — os fundamenta. Toda regra ética cristã é aplicação de amor. Quando a aplicação perde a origem no amor, vira legalismo.`;
  // [111]
  if (d.livroAbrev === 'Mt' && /filho de davi|questao.*filho.*davi/i.test(p))
    return `A simetria de A pergunta sobre de Davi filho espelha A: Jesus os interrogou ↔ A': ninguém ousou interrogá-lo. No centro: Davi chama o Messias de Senhor (C–C'). O pivô teológico é a paradoxo — como o filho pode ser o Senhor do pai? Na vida da igreja: Jesus não é apenas descendente de Davi — é Senhor de Davi. A cristologia não cabe nos moldes humanos de sucessão. A pergunta que Jesus faz silencia os adversários porque eles precisariam reconhecer sua divindade para respondê-la.`;
  // [112]
  if (d.livroAbrev === 'Mt' && /denuncia.*escribas.*fariseus|ais.*hipócritas/i.test(p))
    return `A simetria de Jesus denuncia Escribas e Fariseus espelha A: não querem mover nem o dedo ↔ A': não quisestes. No centro: o que é santo — ouro ou templo (C). O pivô teológico é o "ai" sêxtuplo — sete lamentos sobre hipócrisia religiosa. Na vida da igreja: a hipócrisia que Jesus denuncia não é fingimento consciente — é dissociação entre aparência e realidade que se torna tão habitual que o religioso não a vê mais. Lavar por fora o que está sujo por dentro é trabalho que começa pelo interior.`;
  // [113]
  if (d.livroAbrev === 'Mt' && /destruicao.*templo.*predita|destruicao do templo/i.test(p))
    return `A destruição do templo predita é breve em Mateus 24 — dois versículos — mas brutal: pedra sobre pedra não ficará. O pivô teológico é que a instituição religiosa mais sagrada de Israel não é permanente. Na vida da igreja: nenhuma estrutura religiosa é eterna. O que Deus usa numa geração pode precisar ser demolido para que o novo surja. Apego a estruturas sagradas pode se tornar obstáculo ao que Deus está fazendo a seguir.`;
  // [114]
  if (d.livroAbrev === 'Mt' && /sinais.*fim.*era|sinais.*end/i.test(p))
    return `A simetria de Sinais de end da era espelha A: qual o sinal da tua vinda e do fim? ↔ A': então virá o fim. No centro: vos matarão (D). O pivô teológico é que entre o presente e o fim haverá guerra, fome, perseguição e falsos profetas. Na vida da igreja: Jesus não promete que o caminho ao fim será tranquilo — mas promete que quem perseverar será salvo. Escatologia cristã saudável não é evasão do presente — é resistência informada pela certeza do fim.`;
  // [115]
  if (d.livroAbrev === 'Mt' && /abominacao.*desolacao|desolacao.*sacrilega/i.test(p))
    return `A simetria de A desolação sacrilégia espelha A: a abominação da desolação ↔ A': será a vinda do Filho do Homem. No centro: para enganar os eleitos (C). O pivô teológico é o contraste entre a desolação que vem e a vinda gloriosa que responde a ela. Na vida da igreja: os falsos cristos aparecem justamente no momento de maior desespero. Jesus avisa antes — não para criar ansiedade, mas para que, quando vier, reconheçamos e não sejamos enganados.`;
  // [116]
  if (d.livroAbrev === 'Mt' && /vinda.*filho.*homem.*ceu|filho do homem.*nuvens/i.test(p))
    return `A simetria de A vinda do filho de homem espelha A: poderes dos céus serão abalados ↔ A': de uma a outra extremidade dos céus. No centro: o Filho do Homem vindo com poder e glória (B–B'). O pivô teológico é a visibilidade universal — toda nação lamentará e verá. Na vida da igreja: a segunda vinda não é assunto para especulação de datas — é horizonte que orienta o presente. Saber que ele virá transforma como vivemos agora, não depois.`;
  // [117]
  if (d.livroAbrev === 'Mt' && /licao.*figueira|parabola.*figueira/i.test(p))
    return `A simetria de Lição da Figueira espelha A: aprendei esta parábola ↔ A': as minhas palavras não passarão. No centro: todas estas coisas se cumpram (B–B'). O pivô teológico é a certeza da palavra de Jesus — céu e terra passarão, mas o que ele disse permanece. Na vida da igreja: a figueira que brota é sinal de que o verão está próximo. A vigilância escatológica não é paranoia — é atenção aos sinais do que Jesus disse que viria. A Palavra que não passa é fundamento para viver sem ansiedade.`;
  // [118]
  if (d.livroAbrev === 'Mt' && /necessidade.*vigilancia|vigilancia/i.test(p))
    return `A simetria de Necessidade de Vigilância espelha A: será a vinda do Filho do Homem ↔ A': o Filho do Homem virá. No centro: um tomado, outro deixado (C–C'). O pivô teológico é a imprevisibilidade — ninguém sabe, nem o Filho, mas o Pai. Na vida da igreja: a vigilância que Jesus pede não é ansiedade sobre datas — é prontidão constante. Não saber quando é condição permanente de preparação. O discípulo pronto é o que está pronto agora, não o que calcula quando.`;
  // [119]
  if (d.livroAbrev === 'Mt' && /servo.*fiel.*infiel|fiel.*infiel.*escravo/i.test(p))
    return `A simetria de Fiel ou infiel escravo espelha A: o servo fiel e prudente ↔ A': o servo mau. No centro: as recompensas e os castigos (C–C'). O pivô teológico é que fidelidade na ausência do senhor é o teste de caráter do discípulo. Na vida da igreja: o que fazemos quando ninguém supervisiona define quem somos. O servo mau começa a maltratar quando o senhor demora — a pressão revela o coração. O servo fiel age da mesma forma sabendo que o senhor pode chegar a qualquer momento.`;
  // [120]
  if (d.livroAbrev === 'Mt' && /dez.*madrinhas|dez virgens/i.test(p))
    return `A simetria de A parábola de dez madrinhas espelha A: saíram ao encontro do esposo ↔ A': saí ao seu encontro. No centro: o contraste entre dormir e despertar (C–C'). O pivô teológico é o azeite que não pode ser emprestado — a preparação interior é intransferível. Na vida da igreja: cinco eram insensatas não por má vontade — simplesmente não se prepararam. A preparação para o reino não pode ser delegada nem comprada na última hora. O que está dentro não pode ser transferido.`;
  // [121]
  if (d.livroAbrev === 'Mt' && /parabola.*talentos/i.test(p))
    return `A simetria de A parábola dos talentos espelha A: chamou os servos e entregou os bens ↔ A': voltou e ajustou contas. No centro: o que enterrou o talento (D). O pivô teológico é que enterrar por medo é recusa de usar o que foi dado. Na vida da igreja: o servo de um talento não desperdiçou — guardou. Mas guardar é o mesmo que desperdiçar quando o esperado é multiplicar. O dom não usado atrofia. A prestação de contas do reino inclui o que fizemos com o que recebemos.`;
  // [122]
  if (d.livroAbrev === 'Mt' && /julgamento.*nacoes|juizo.*nacoes/i.test(p))
    return `A simetria de Julgamento das Nações espelha A: bênção do Rei ↔ A': maldição do Rei. No centro: o que fizestes a um destes irmãos mais pequeninos, a mim fizestes (C). O pivô teológico é a identificação de Jesus com os vulneráveis. Na vida da igreja: o critério do julgamento final não é declaração doutrinária — é cuidado com os famintos, estrangeiros, nus, doentes, presos. O que surpresa os justos é que servir os necessitados era servir a Jesus. A missão social não é alternativa ao evangelho — é o evangelho em ação.`;
  // [123]
  if (d.livroAbrev === 'Mt' && /complô.*matar.*jesus|plano.*matar.*jesus/i.test(p))
    return `A simetria de O complô a matar Jesus espelha A: daqui a dois dias será a Páscoa ↔ A': não durante a festa. No centro: a conspiração dos sumos sacerdotes (C). O pivô teológico é a ironia pascal — Jesus, o Cordeiro, é condenado exatamente na festa da libertação. Na vida da igreja: o plano humano de matar Jesus no momento "errado" foi sobreposto pelo plano divino que o colocou exatamente na hora certa. Os que planejavam eliminar Jesus foram os instrumentos do cumprimento profético.`;
  // [124]
  if (d.livroAbrev === 'Mt' && /uncao.*betania/i.test(p))
    return `A simetria de A unção em Betânia espelha A: derramou o perfume ↔ A': ao derramar este perfume. No centro: ela fez uma boa obra para comigo (C). O pivô teológico é o memorial — onde quer que o evangelho for pregado, isso que ela fez será contado. Na vida da igreja: o gesto extravagante que os discípulos condenaram como desperdício, Jesus consagrou como preparação para a sepultura. A devoção que parece irracional para o calculista pode ser exatamente o que o momento exige.`;
  // [125]
  if (d.livroAbrev === 'Mt' && /judas.*trair.*jesus|judas.*concorda/i.test(p))
    return `A simetria de Judas concorda a trair Jesus espelha A: que quereis dar-me para entregar? ↔ A': para o entregar. No centro: trinta moedas de prata (B). O pivô teológico é a precificação do Messias — trinta moedas, o preço de um escravo (Êx 21.32). Na vida da igreja: o que Judas fez por trinta moedas é o que fazemos cada vez que trocamos fidelidade a Jesus por qualquer vantagem. Não é necessário trair explicitamente — basta silenciar na hora que custaria.`;
  // [126]
  if (d.livroAbrev === 'Mt' && /pascoa.*discipulos|ultima.*ceia.*pascoa/i.test(p))
    return `A simetria de A páscoa com Os discípulos espelha A: onde prepararmos a ceia? ↔ A': porventura sou eu, Mestre? No centro: um de vós me há de trair (D). O pivô teológico é que Jesus sabe quem o trairá — e serve a todos na mesma mesa. Na vida da igreja: a mesa do Senhor inclui os que vão falhar. Jesus não esperou que os discípulos fossem perfeitos para sentar com eles. A Ceia não é para os que já chegaram — é para os que ainda estão no caminho.`;
  // [127]
  if (d.livroAbrev === 'Mt' && /institution.*senhor.*ceia|instituicao.*eucaristia/i.test(p))
    return `A simetria de Institution de não Senhor ceia espelha A: tomou o pão e abençoou ↔ A': tomou o cálice e deu graças. No centro: isto é o meu corpo / este é o meu sangue (B–B'). O pivô teológico é a correspondência entre a oração e o dom — ação de graças precede a partilha. Na vida da igreja: a Ceia do Senhor é ação de graças (eucaristia) antes de ser memorial. O pão e o cálice dizem: o corpo foi dado, o sangue foi derramado. Cada vez que compartilhamos, proclamamos a morte do Senhor.`;
  // [128]
  if (d.livroAbrev === 'Mt' && /negacao.*pedro.*predita|predicao.*negacao.*pedro/i.test(p))
    return `A simetria de De Pedro negação predito espelha A: todos vos escandalizareis ↔ A': tu me negarás três vezes. No centro: a negação pelos discípulos (B–B'). O pivô teológico é a confiança excessiva de Pedro — "nunca te negarei" — logo antes da queda. Na vida da igreja: a autoconfiança espiritual é frequentemente o antecedente da falha. A hora de mais vulnerabilidade pode ser a que segue a declaração mais corajosa. Jesus predisse para que Pedro, ao cair, soubesse que a restauração já estava prevista.`;
  // [129]
  if (d.livroAbrev === 'Mt' && /getsemani|jesus ora.*getsemani/i.test(p))
    return `A simetria de Jesus ora em Getsêmani espelha A: assentai-vos aqui ↔ A': levantai-vos. No centro: vigiai e orai (D). O pivô teológico é "não como eu quero, mas como tu queres" — a oração mais difícil e mais fiel ao mesmo tempo. Na vida da igreja: Getsêmani é o modelo de oração sob pressão máxima — honestidade sobre o que sentimos combinada com entrega ao que Deus determina. Os discípulos dormiram; Jesus orou. A distância entre os dois é o abismo entre fé exercida e fé declarada.`;
  // [130]
  if (d.livroAbrev === 'Mt' && /traicao.*prisao.*jesus/i.test(p))
    return `A simetria de A traição e prisão de Jesus espelha A: espadas e porretes ↔ A': com espadas e porretes. No centro: quem pega na espada à espada morrerá (C–C'). O pivô teológico é o cumprimento das Escrituras como razão da não-resistência de Jesus. Na vida da igreja: Jesus poderia ter pedido doze legiões de anjos — escolheu não pedir. A renúncia ao poder para cumprir a Escritura é o modelo de quem serve por amor e não por estratégia.`;
  // [131]
  if (d.livroAbrev === 'Mt' && /jesus.*sumo.*sacerdote|jesus.*high.*sacerdote/i.test(p))
    return `A simetria de Jesus antes de high sacerdote espelha A: levaram Jesus a Caifás ↔ A': cuspiam-lhe no rosto. No centro: Jesus fica em silêncio (F). O pivô teológico é o silêncio de Jesus diante das falsas acusações — cumprimento do Servo Sofredor de Isaías. Na vida da igreja: há momentos em que o silêncio é a resposta mais poderosa. Jesus não precisava se defender — a verdade não precisava de defesa naquele momento. A dignidade de não responder às acusações falsas pode ser mais eloquente do que qualquer réplica.`;
  // [132]
  if (d.livroAbrev === 'Mt' && /negacao.*pedro.*jesus|pedro.*nega.*jesus/i.test(p))
    return `A simetria de De Pedro negação de Jesus espelha A: Pedro estava lá fora no pátio ↔ A': saiu para fora e chorou amargamente. No centro: as três negações (B1–B3). O pivô teológico é o pranto amargo — Pedro não endurece, chora. Na vida da igreja: a queda de Pedro não o elimina — é o início da restauração (Jo 21). O choro amargo após a falha é mais próximo de Deus do que o endurecimento. Pedro que chora tem mais esperança do que Judas que devolve as moedas mas não busca o perdão.`;
  // [133]
  if (d.livroAbrev === 'Mt' && /jesus.*pilatos|jesus.*levado.*pilatos/i.test(p))
    return `Jesus é levado diante de Pilatos — o poder político encontra o Filho de Deus. A transferência de Jesus do tribunal religioso para o romano é o momento em que a condenação religiosa busca cumprimento legal. O pivô teológico é que nenhuma autoridade — religiosa ou política — age fora do permissivo de Deus. Na vida da igreja: Jesus não resistiu à entrega porque entendeu que esse era o caminho. O poder que condena o justo não triunfa — torna-se instrumento do que não consegue controlar.`;
  // [134]
  if (d.livroAbrev === 'Mt' && /suicidio.*judas/i.test(p))
    return `A simetria de O suicídio de Judas espelha A: devolveu as trinta moedas ↔ A': tomaram as trinta moedas. No centro: o campo do oleiro (B–B'). O pivô teológico é o contraste com Pedro — ambos falharam; um chorou e buscou restauração, o outro devolveu o dinheiro e foi destruído. Na vida da igreja: o remorso que devolve o dinheiro mas não busca o perdão é diferente da arrependimento que corre para a cruz. Judas reconheceu o erro — mas não sabia que o Senhor que traiu poderia perdoar.`;
  // [135]
  if (d.livroAbrev === 'Mt' && /pilatos.*interroga.*jesus|pilatos.*questiona/i.test(p))
    return `A simetria de Pilatos questiona Jesus espelha A: pergunta de Pilatos ↔ A': pergunta de Pilatos. No centro: Jesus não responde (B–B'). O pivô teológico é o silêncio de Jesus que maravilhou Pilatos — um governador acostumado a respostas, enfrenta o único que não se defende. Na vida da igreja: a majestade do silêncio de Jesus diante do poder é desconcertante. Não havia nada que Jesus precisasse provar a Pilatos. A inocência não precisa se justificar — apenas ser.`;
  // [136]
  if (d.livroAbrev === 'Mt' && /barrabas.*jesus/i.test(p))
    return `A simetria de Barrabás ou Jesus? espelha A: qual quereis que solte? ↔ A': soltou-lhes Barrabás. No centro: seja crucificado! (C). O pivô teológico é a substituição — o culpado solto, o inocente crucificado. Na vida da igreja: Barrabás é a imagem de cada ser humano. O culpado é libertado porque o inocente toma o lugar. A exigência "crucifica-o" que a multidão gritou é o que a justiça divina satisfez — só que em favor de nós, não contra nós.`;
  // [137]
  if (d.livroAbrev === 'Mt' && /soldados.*zombam.*jesus/i.test(p))
    return `A simetria de Os soldados zombar Jesus espelha A: salve, rei dos judeus ↔ A': este é Jesus, o rei dos judeus. No centro: a cruz (B–B'). O pivô teológico é a ironia — proclamaram a verdade sem saber. O "rei dos judeus" que zombaram na clámide escarlate era realmente o Rei. Na vida da igreja: as insígnias do escárnio viraram insígnias de glória. A coroa de espinhos, o cetro de cana, o título acima da cruz — tudo que foi zombaria tornou-se confissão de quem ele é.`;
  // [138]
  if (d.livroAbrev === 'Mt' && /crucificacao.*jesus/i.test(p))
    return `A simetria de A crucificação de Jesus espelha A: dois salteadores crucificados com ele ↔ A': os salteadores que estavam com ele. No centro: a salvação de Deus — desça se é Filho de Deus (B–B'). O pivô teológico é que Jesus não desceu da cruz porque sua missão era permanecer nela. Na vida da igreja: os que desafiavam "salva-te a ti mesmo" não entendiam que a salvação deles exigia que ele não se salvasse. O poder da cruz está exatamente na recusa de descer.`;
  // [139]
  if (d.livroAbrev === 'Mt' && /morte de jesus/i.test(p))
    return `A simetria de A morte de Jesus espelha A: Jesus exclamou em alta voz ↔ A': Jesus exclamou de novo em alta voz. No centro: a esponja com vinagre (C). O pivô teológico é o grito de abandono — "Deus meu, Deus meu, por que me abandonaste?" — que é o início do Salmo 22, que termina em louvor. Na vida da igreja: Jesus não morreu em silêncio stoico — morreu gritando a realidade do abandono. A morte de Jesus inclui a dimensão do desamparo que nós nunca precisaremos viver, porque ele a viveu.`;
  // [140]
  if (d.livroAbrev === 'Mt' && /testemunhas.*crucificacao/i.test(p))
    return `A simetria de Testemunhas da crucificação espelha A: terra estremeceu, rochas fenderam ↔ A': o terremoto e o que sucedera. No centro: a ressurreição (B–B'). O pivô teológico é o centurião que viu e confessou — gentio, soldado de Roma, o primeiro a confessar Jesus como Filho de Deus diante da morte. Na vida da igreja: às vezes a confissão mais clara vem de quem estava do lado errado. O centurião não tinha teologia — tinha olhos. E o que viu foi suficiente para confessar.`;
  // [141]
  if (d.livroAbrev === 'Mt' && /sepultamento.*jesus/i.test(p))
    return `A simetria de O sepultamento de Jesus espelha A: Maria Madalena e Maria ↔ A': Maria Madalena e a outra Maria. No centro: Pilatos autoriza a entrega do corpo (D). O pivô teológico é o cuidado com o corpo morto — José pede, Pilatos autoriza, as mulheres observam. Na vida da igreja: o sepultamento importa teologicamente — Jesus realmente morreu, foi realmente sepultado. A ressurreição não é despertar de desmaio — é vitória sobre morte real. As mulheres que ficaram são as primeiras testemunhas do túmulo vazio.`;
  // [142]
  if (d.livroAbrev === 'Mt' && /guarda.*tumulo|guarda no sepulcro/i.test(p))
    return `A simetria de Guarda no túmulo espelha A: sacerdotes e fariseus diante de Pilatos ↔ A': Pilatos lhes disse. No centro: os guardas do sepulcro (C). O pivô teológico é a ironia — ao tentar prevenir a ressurreição, os inimigos de Jesus tornaram-se as melhores testemunhas de que o túmulo estava vazio. Na vida da igreja: o esforço humano para manter Jesus morto produziu as condições para o testemunho mais irrefutável. Os próprios guardas relataram o que viram — e foram pagos para mudar a história.`;
  // [143]
  if (d.livroAbrev === 'Mt' && /ressurreicao.*jesus/i.test(p))
    return `A simetria de A ressurreição de Jesus espelha A: foram ver o sepulcro ↔ A': partiram apressadamente do sepulcro. No centro: ide à Galileia (C–C'). O pivô teológico é a transformação do luto em missão — as mulheres que foram chorar são enviadas a anunciar. Na vida da igreja: a ressurreição não apenas confirma a divindade de Jesus — redefine o que fazer com a notícia. Foram ao sepulcro com especiarias; saíram com o evangelho. O encontro com o ressurreto sempre transforma a direção do caminho.`;
  // [144]
  if (d.livroAbrev === 'Mt' && /relatorio.*guarda|guarda.*relatorio/i.test(p))
    return `A simetria de Guarda relatório de guarda espelha A: contaram tudo aos sacerdotes ↔ A': esta versão se divulgou. No centro: o falso testemunho (C). O pivô teológico é que a história fabricada ("os discípulos roubaram o corpo") confirma que o túmulo estava vazio — ninguém discutiu isso. Na vida da igreja: a resposta mais antiga à ressurreição não foi refutação do fato — foi fabricação de uma explicação alternativa. O túmulo vazio não é questionado; o que aconteceu com o corpo é o que divide as narrativas.`;
  // [145]
  if (d.livroAbrev === 'Mt' && /missao.*discipulos|grande.*comissao/i.test(p))
    return `A simetria de Missão dos Discípulos espelha A: quando o viram ↔ A': eu estou convosco todos os dias. No centro: fazei discípulos de todas as nações (C). O pivô teológico é a autoridade universal como fundamento da missão universal — "todo poder me foi dado, portanto ide". Na vida da igreja: a Grande Comissão não termina com o batismo — inclui ensinar a guardar tudo o que Jesus ordenou. Discipulado é formação, não apenas conversão. E a presença de Jesus não é condição futura — é realidade presente que sustenta o ir.`;

  // MARCOS [1]–[81]
  // [1]
  if (d.livroAbrev === 'Mc' && /profecia de isaias/i.test(p))
    return `A simetria de Profecia de Isaías espelha A: "princípio do evangelho" ↔ A': o caminho do Senhor sendo preparado. No centro: a voz que clama no deserto. O pivô teológico é que o evangelho começa com uma voz profética que antecede o próprio Jesus. Na vida da igreja: toda proclamação genuína é precedida por uma voz preparatória; a missão começa quando alguém aceita ser aquela voz que aplaina o caminho para o Senhor.`;
  // [2]
  if (d.livroAbrev === 'Mc' && /proclamacao.*joao.*batista|proclamacao de joao/i.test(p))
    return `A simetria de Proclamação de João Batista espelha A: batismo de arrependimento ↔ A': contraste água/Espírito. No centro: João como enviado preparatório vestido como Elias. O pivô teológico é que João só tem sentido em relação àquele que vem. Na vida da igreja: o ministério que aponta para além de si mesmo — que diz "ele deve crescer e eu diminuir" — é o ministério que cumpre seu propósito.`;
  // [3]
  if (d.livroAbrev === 'Mc' && /preparacao para ministerio/i.test(p))
    return `A simetria de Preparação para ministério espelha A: batismo de Jesus ↔ A': anjos ministram. No centro: "Tu és o meu Filho amado, em ti me comprazo." O pivô teológico é que antes de qualquer ato ministerial, a identidade de Jesus é confirmada pelo Pai. Na vida da igreja: toda missão começa com a confirmação da identidade — servimos não para conquistar aprovação mas porque a voz do Pai já falou sobre nós.`;
  // [4]
  if (d.livroAbrev === 'Mc' && /inicio do ministerio na galile/i.test(p))
    return `A simetria de O Início do Ministério na Galileia espelha A: depois de João ser preso ↔ A': crede no evangelho. No centro: "O tempo está cumprido e o reino de Deus está próximo." O pivô teológico é a urgência do cumprimento — o reino não é futuro distante, está chegando agora. Na vida da igreja: o arrependimento e a fé não são reações ao medo mas respostas ao anúncio de que o rei chegou.`;
  // [5]
  if (d.livroAbrev === 'Mc' && /chama.*primeiros.*discipulos|jesus chama.*Mc/i.test(p))
    return `A simetria de Jesus chama primeiros discípulos espelha A: Simão e André deixam redes ↔ A': Tiago e João deixam o pai. No centro: "Farei que sejais pescadores de homens." O pivô teológico é a transformação da vocação — o mesmo impulso com que pescavam peixes agora é orientado para alcançar pessoas. Na vida da igreja: o chamado não desperdicia as capacidades anteriores, mas as redireciona para o reino.`;
  // [6]
  if (d.livroAbrev === 'Mc' && /imundo espirito/i.test(p))
    return `A simetria de O homem com um imundo espírito espelha A: ensino com autoridade ↔ A': fama da autoridade se espalha. No centro: "Cala-te e sai dele." O pivô teológico é que a Palavra de Jesus tem poder executivo — não apenas informa, mas transforma. Na vida da igreja: a pregação com autoridade não é volume nem retórica; é a voz do próprio reino que faz o que diz.`;
  // [7]
  if (d.livroAbrev === 'Mc' && /cura muitos.*casa.*simon|casa de simon/i.test(p))
    return `A simetria de Jesus cura muitos na casa de Simão espelha A: cura da sogra de Pedro ↔ A': missão mais ampla pela Galileia. No centro: Jesus ora no deserto antes do amanhecer. O pivô teológico é que o serviço nasce da oração — antes de servir a todos, Jesus se retira para estar só com o Pai. Na vida da igreja: a sustentabilidade do ministério depende de haver um "lugar deserto" antes da multidão.`;
  // [8]
  if (d.livroAbrev === 'Mc' && /purifica um leproso/i.test(p))
    return `A simetria de Jesus purifica um leproso espelha A: suplica "se quiseres" ↔ A': Jesus não pode mais entrar nas cidades. No centro: "A lepra partiu dele e ficou purificado." O pivô teológico é a compaixão que toca o intocável — Jesus estende a mão onde a lei proibia o contato. Na vida da igreja: a missão cristã frequentemente envolve tocar o que a cultura declara impuro; a compaixão vai aonde a lei se recusava a ir.`;
  // [9]
  if (d.livroAbrev === 'Mc' && /cura um paralitico/i.test(p))
    return `A simetria de Jesus cura um paralítico espelha A: multidão reunida ↔ A': todos glorificam a Deus. No centro: "Os teus pecados estão perdoados" — autoridade para perdoar. O pivô teológico é que a cura física é sinal de algo mais profundo: o poder de Jesus para perdoar. Na vida da igreja: a comunidade que abre o teto para trazer o amigo a Jesus é modelo de intercessão; a fé dos outros pode ser o caminho da cura de alguém.`;
  // [10]
  if (d.livroAbrev === 'Mc' && /chama levi/i.test(p))
    return `A simetria de Jesus chama Levi espelha A: ensinando à beira do mar ↔ A': "não vim chamar justos, mas pecadores." No centro: Jesus come com publicanos na casa de Levi. O pivô teológico é que a mesa de Jesus é o lugar mais subversivo da sua missão — comer com pecadores declara o alcance do reino. Na vida da igreja: a mesa aberta, a hospitalidade radical, é ainda hoje o sinal mais visível do reino que inclui os excluídos.`;
  // [11]
  if (d.livroAbrev === 'Mc' && /pergunta sobre jejum/i.test(p))
    return `A simetria de A pergunta sobre jejum espelha A: jejum dos discípulos de João ↔ A': vinho novo em odres novos. No centro: remendo de pano novo — a ruptura inevitável. O pivô teológico é que Jesus anuncia uma nova era que não cabe nas estruturas antigas. Na vida da igreja: tentar conter o evangelho em formas religiosas velhas resulta em rasgo; a nova criação requer novas expressões de fé.`;
  // [12]
  if (d.livroAbrev === 'Mc' && /pronoucement.*sabado|pronunciamento.*sabado/i.test(p))
    return `A simetria de Pronunciamento sobre O sábado espelha A: discípulos colhem espigas ↔ A': Filho do Homem é senhor do sábado. No centro: Davi comendo os pães da proposição — necessidade humana acima da lei ritual. O pivô teológico é que a lei existe para servir a vida, não ao contrário. Na vida da igreja: o legalismo que sacrifica o bem humano no altar da observância religiosa inverte a ordem que Deus estabeleceu.`;
  // [13]
  if (d.livroAbrev === 'Mc' && /homem.*mao seca|mao.*seca/i.test(p))
    return `A simetria de O homem com a mão seca espelha A: Jesus na sinagoga ↔ A': fariseus conspíram para destruir Jesus. No centro: "É lícito fazer bem no sábado?" — Jesus irado com a dureza do coração. O pivô teológico é que a dureza religiosa é tão grave quanto a transgressão — Jesus fica irado diante de corações que preferem a regra ao ser humano. Na vida da igreja: a pergunta que transforma é "é lícito fazer bem hoje?" — não "quais são os limites?"`;
  // [14]
  if (d.livroAbrev === 'Mc' && /multidao.*beira.*mar/i.test(p))
    return `A simetria de Uma Multidão à Beira-Mar espelha A: grande multidão de toda região ↔ A': segredo messiânico com discrição. No centro: espíritos imundos proclamam "Tu és o Filho de Deus." O pivô teológico é a ironia do segredo messiânico — os que não deveriam saber proclamam, e os que deveriam proclamar são mandados a calar. Na vida da igreja: a verdade sobre Jesus frequentemente irrompe por canais inesperados, precisamente quando esperamos que venha pelos convencionais.`;
  // [15]
  if (d.livroAbrev === 'Mc' && /nomeia os doze/i.test(p))
    return `A simetria de Jesus Nomeia os Doze espelha A: sobe ao monte e chama ↔ A': lista completa com Judas. No centro: missão dupla — pregar e expulsar demônios. O pivô teológico é que os doze existem primeiro "para estarem com ele" — a comunhão precede a missão. Na vida da igreja: o perigo é sair em missão sem primeiro ter estado com Jesus; a presença precede a proclamação.`;
  // [16]
  if (d.livroAbrev === 'Mc' && /jesus e beelzebul/i.test(p))
    return `A simetria de Jesus e Beelzebul espelha A: família diz "está fora de si" ↔ A': diziam que tinha espírito imundo. No centro: "Como pode Satanás expulsar Satanás?" — o homem forte precisa ser amarrado. O pivô teológico é que a cura dos endemoniados prova que o homem forte (Satanás) já está sendo amarrado. Na vida da igreja: cada libertação, cada cura, é sinal de que o reino veio com poder e o reinado do adversário está em colapso.`;
  // [17]
  if (d.livroAbrev === 'Mc' && /verdadeiros.*parentes|verdadeiro.*parentes/i.test(p))
    return `A simetria de Verdadeiros parentes de Jesus espelha A: mãe e irmãos do lado de fora ↔ A': "quem fizer a vontade de Deus." No centro: "Quem é minha mãe e quem são meus irmãos?" O pivô teológico é a redefinição radical da família — o reino cria laços mais fortes que o sangue. Na vida da igreja: a comunidade de fé não é substituta da família biológica, mas é o contexto mais amplo de pertencimento onde a vontade do Pai une os que o buscam.`;
  // [18]
  if (d.livroAbrev === 'Mc' && /parabola do semeador/i.test(p))
    return `A simetria de A parábola do semeador espelha A: Jesus ensina da barca ↔ A': explicação dos quatro solos. No centro: "Quem tem ouvidos para ouvir, ouça." O pivô teológico é que a questão não é o semeador nem a semente, mas o solo — a receptividade do coração. Na vida da igreja: o pregador fiel semeia amplamente; o resultado depende do estado do coração do ouvinte, não da habilidade do semeador.`;
  // [19]
  if (d.livroAbrev === 'Mc' && /parabolas do reino/i.test(p))
    return `A simetria de As parábolas do reino de Deus espelha A: candeeiro oculto ↔ A': em parábolas conforme podiam entender. No centro: o reino como semente que cresce sozinha — o lavrador não sabe como. O pivô teológico é a autonomia do reino: Deus age independentemente do nosso entendimento pleno. Na vida da igreja: plantamos, regamos e dormimos, mas é Deus quem faz crescer — a ansiedade pastoral pode ser sintoma de esquecimento dessa dependência.`;
  // [20]
  if (d.livroAbrev === 'Mc' && /acalma.*tempestade|jesus acalma/i.test(p))
    return `A simetria de Jesus acalma uma tempestade espelha A: "passemos para a outra margem" ↔ A': "por que haveis temer?" No centro: Jesus dormia — "não te importas que pereçamos?" O pivô teológico é o contraste entre o pânico dos discípulos e o repouso de Jesus. Na vida da igreja: a paz de Jesus em meio à tempestade não é indiferença, mas confiança absoluta no Pai; a pergunta "não te importas?" revela a teologia da comunidade em crise.`;
  // [21]
  if (d.livroAbrev === 'Mc' && /endemoninhado geraseno/i.test(p))
    return `A simetria de Jesus Cura o Endemoninhado Geraseno espelha A: chegada à região gerasena ↔ A': o curado declara o que Deus fez. No centro: "Legião é o meu nome" — Jesus ordena e os demônios entram nos porcos. O pivô teológico é a restauração radical da identidade — o que estava entre os mortos, cortando-se com pedras, agora está sentado, vestido e em juízo perfeito. Na vida da igreja: a missão tem o poder de restaurar a dignidade humana destruída pelo mal.`;
  // [22]
  if (d.livroAbrev === 'Mc' && /menina restaur.*vida.*mulher|menina.*mulher curou/i.test(p))
    return `A simetria de Um menina restaurado à vida e uma mulher curou espelha A: Jairo suplica pela filha ↔ A': Jesus ressuscita a menina. No centro: "A tua fé te salvou; vai em paz" — fé que sana. O pivô teológico é o sanduíche marcano: a cura da mulher no caminho não atrapalha a missão de Jairo — ela a enriquece. Na vida da igreja: as interrupções do caminho frequentemente são o próprio chamado; Deus age nos desvios tanto quanto no destino planejado.`;
  // [23]
  if (d.livroAbrev === 'Mc' && /rejection.*nazare|rejeicao.*nazare/i.test(p))
    return `A simetria de Rejeição de Jesus em Nazaré espelha A: Jesus vai à sua terra natal ↔ A': não podia fazer milagres por causa da incredulidade. No centro: "Não é este o carpinteiro?" — escândalo da origem comum. O pivô teológico é que a familiaridade impede a fé — quem conhece apenas o Jesus histórico da cidade de origem não vê o Cristo do reino. Na vida da igreja: a familiaridade religiosa é um perigo; conhecer sobre Jesus não é o mesmo que recebê-lo com fé.`;
  // [24]
  if (d.livroAbrev === 'Mc' && /missao.*doze/i.test(p))
    return `A simetria de A missão de doze espelha A: autoridade sobre espíritos ↔ A': pregaram, expulsaram demônios e curaram. No centro: "Onde entrardes numa casa, ficai nela." O pivô teológico é a vulnerabilidade intencional da missão — sem bolsa, sem pão, dependendo da hospitalidade do próximo. Na vida da igreja: a missão que depende da generosidade alheia é mais evangelizadora do que a missão autossuficiente, pois cria relações de reciprocidade.`;
  // [25]
  if (d.livroAbrev === 'Mc' && /morte de joao batista/i.test(p))
    return `A simetria de A morte de João Batista espelha A: Herodes identifica Jesus como João ressuscitado ↔ A': discípulos recolhem o corpo. No centro: Herodes temia João e o ouvia com prazer — mas a pressão social o venceu. O pivô teológico é a tragédia do homem que respeita a voz profética mas não tem coragem de obedecer. Na vida da igreja: ouvir a voz profética com prazer sem deixá-la transformar as decisões é a forma mais sofisticada de rejeição.`;
  // [26]
  if (d.livroAbrev === 'Mc' && /feeding cinco mil/i.test(p))
    return `A simetria de Feeding cinco mil espelha A: apóstolos retornam e Jesus convida ao descanso ↔ A': cinco mil homens saciados. No centro: Jesus toma os pães, olha para o céu, abençoa e reparte. O pivô teológico é o gesto eucarístico — a multiplicação começa no ato de dar graças. Na vida da igreja: o que colocamos nas mãos de Jesus, mesmo parecendo insuficiente, pode se tornar abundância quando é oferecido com gratidão.`;
  // [27]
  if (d.livroAbrev === 'Mc' && /caminha sobre a agua/i.test(p))
    return `A simetria de Jesus caminha sobre A água espelha A: Jesus vai ao monte orar ↔ A': discípulos espantados no barco. No centro: Jesus caminha sobre o mar — "queria passar adiante deles." O pivô teológico é a teofania — caminhar sobre as águas é linguagem do Deus criador (Jó 9.8). Na vida da igreja: Jesus vai adiante das circunstâncias que nos paralisam; a pergunta não é "onde está Jesus?" mas "conseguimos reconhecê-lo quando ele passa?"`;
  // [28]
  if (d.livroAbrev === 'Mc' && /cura.*enfermos.*genesare/i.test(p))
    return `A simetria de Cura dos Enfermos em Genesaré espelha A: povo reconhece Jesus imediatamente ↔ A': todos curados pelo toque do manto. No centro: puseram os enfermos nas praças onde quer que Jesus entrasse. O pivô teológico é a fé popular que coloca o necessitado no caminho do Senhor — não esperam que Jesus venha até eles, mas colocam os enfermos onde ele vai passar. Na vida da igreja: às vezes a missão é apenas colocar os necessitados no caminho da graça.`;
  // [29]
  if (d.livroAbrev === 'Mc' && /tradicao.*anciãos|tradicao sobre os anc/i.test(p))
    return `A simetria de A tradição dos anciãos espelha A: mãos não lavadas ↔ A': o que sai do coração contamina. No centro: Corban — tradição que anula o mandamento de honrar os pais. O pivô teológico é que a tradição religiosa pode se tornar instrumento de desobediência ao próprio Deus. Na vida da igreja: a criatividade com que os sistemas religiosos justificam descumprir os mandamentos éticos de Deus revela o quanto o coração humano pode ser enganoso.`;
  // [30]
  if (d.livroAbrev === 'Mc' && /siro.*fenicia.*mulher/i.test(p))
    return `A simetria de Siro-fenícia de mulher fé espelha A: Jesus quer ficar oculto ↔ A': "o demônio saiu de tua filha." No centro: Jesus testa a fé da mulher — "deixa que primeiro se fartem os filhos." O pivô teológico é a resposta da mulher que não desiste, mas encontra dentro da metáfora uma brecha para a graça. Na vida da igreja: a fé persistente que não se ofende com os testes da graça e encontra no próprio argumento do adiamento uma razão para confiar.`;
  // [31]
  if (d.livroAbrev === 'Mc' && /cura.*homem surdo|jesus cura.*surdo/i.test(p))
    return `A simetria de Jesus Cura um Homem Surdo espelha A: Jesus atravessa o Decápolis ↔ A': "fez bem todas as coisas." No centro: "Efatá" — o toque pessoal que abre ouvidos e língua. O pivô teológico é a singularidade do método de Jesus — cura particular, longe da multidão, com gestos físicos carregados de intenção. Na vida da igreja: a cura às vezes requer afastar a pessoa do ruído da multidão para que possa ouvir apenas a voz de Jesus.`;
  // [32]
  if (d.livroAbrev === 'Mc' && /feeding quatro mil/i.test(p))
    return `A simetria de Feeding quatro mil espelha A: compaixão pela multidão sem comer ↔ A': sete cestos de sobras. No centro: Jesus dá graças, parte e distribui os sete pães. O pivô teológico é a repetição — Marcos relata duas multiplicações, ressaltando que a compaixão de Jesus não tem cotas. Na vida da igreja: a segunda multiplicação ocorre em território gentílico — a misericórdia de Jesus atravessa fronteiras étnicas e religiosas.`;
  // [33]
  if (d.livroAbrev === 'Mc' && /fermento.*fariseus.*herodes/i.test(p))
    return `A simetria de O fermento de Fariseus e de Herodes espelha A: fariseus pedem sinal ↔ A': "Ainda não entendeis?" No centro: "Guardai-vos do fermento dos fariseus e de Herodes." O pivô teológico é o fermento como metáfora de influência corruptora — o ceticismo religioso e o pragmatismo político corrompem de dentro. Na vida da igreja: os discípulos que acabaram de ver duas multiplicações discutem por não ter pão — a presença do milagre não garante a compreensão do milagre.`;
  // [34]
  if (d.livroAbrev === 'Mc' && /cura.*cego.*betsaida/i.test(p))
    return `A simetria de Jesus Cura um Homem Cego em Betsaida espelha A: trazem o cego para toque ↔ A': visão completamente restaurada. No centro: primeira aplicação — "vejo homens como árvores andando" — cura parcial. O pivô teológico é a cura em duas etapas — narrativa intencionalmente paralela à compreensão gradual dos discípulos que ainda "veem mal." Na vida da igreja: a compreensão espiritual muitas vezes é um processo em duas etapas; reconhecer que se vê "homens como árvores" já é um progresso.`;
  // [35]
  if (d.livroAbrev === 'Mc' && /declaracao.*pedro|pedro.*declaracao/i.test(p))
    return `A simetria de De Pedro declaração sobre Jesus espelha A: aldeias de Cesareia ↔ A': não falar a ninguém. No centro: "E vós, quem dizeis que sou eu?" O pivô teológico é o ponto de virada central da narrativa de Marcos — tudo antes prepara para esta pergunta; tudo depois é iluminado por ela. Na vida da igreja: a pergunta pessoal de Jesus — "e vós?" — não pode ser respondida por procuração; cada discípulo precisa de sua própria confissão.`;
  // [36]
  if (d.livroAbrev === 'Mc' && /prediz.*morte.*ressurreicao.*Mc.*8|prediz sua morte/i.test(p))
    return `A simetria de Jesus prediz sua morte e ressurreição espelha A: o Filho do Homem deve sofrer ↔ A': "cogitas as coisas dos homens." No centro: Pedro repreende Jesus — resistência ao caminho da cruz. O pivô teológico é que a confissão de Pedro é imediatamente seguida de uma tentação disfarçada de lealdade. Na vida da igreja: a maior ameaça à cruz não vem dos inimigos mas dos amigos que dizem "Deus te livre disso, Senhor."`;
  // [37]
  if (d.livroAbrev === 'Mc' && /losing vida/i.test(p))
    return `A simetria de Perdendo a vida por Jesus espelha A: "negue-se a si mesmo e tome a cruz" ↔ A': quem se envergonhar de Jesus. No centro: "Que aproveita ao homem ganhar o mundo e perder a alma?" O pivô teológico é o paradoxo cristão fundamental — a vida encontrada pela perda, o ganho descoberto pela entrega. Na vida da igreja: a pergunta sobre o que vale a alma redefine cada decisão de carreira, relacionamento e uso do tempo.`;
  // [38]
  if (d.livroAbrev === 'Mc' && /nao provara a morte/i.test(p))
    return `A simetria de Um Homem que Não Provará a Morte espelha A: "Em verdade vos digo" ↔ A': garantia da palavra de Jesus. No centro: "não provarão a morte sem ver o reino de Deus vir com poder." O pivô teológico é a promessa imediata que conecta diretamente à transfiguração — alguns verão o poder do reino antes de morrer, antecipando a glória futura. Na vida da igreja: a transfiguração é penhor do que será: o mesmo Jesus glorioso que os três viram é o que voltará.`;
  // [39]
  if (d.livroAbrev === 'Mc' && /transfiguracao/i.test(p))
    return `A simetria de A transfiguração espelha A: subida ao monte com os três ↔ A': descida com ordem de silêncio. No centro: "Este é o meu Filho amado; ouvi-o." O pivô teológico é a confirmação da identidade de Jesus no ponto mais alto da narrativa — o mesmo que ouviu no batismo, os discípulos agora ouvem. Na vida da igreja: os momentos de monte — experiências transformadoras de adoração — não são fim em si mesmos; a descida com o Filho amado é o destino.`;
  // [40]
  if (d.livroAbrev === 'Mc' && /cura.*menino.*espirito/i.test(p))
    return `A simetria de A cura do menino com espírito espelha A: debate com os escribas ↔ A': "esta casta só sai pela oração." No centro: "Creio! Ajuda-me na minha incredulidade." O pivô teológico é a oração mais honesta do NT — a fé que reconhece sua própria insuficiência e apela ao Senhor para suprir o que falta. Na vida da igreja: a comunidade que confessa honestamente onde sua fé é fraca está mais perto da cura do que a que simula plena certeza.`;
  // [41]
  if (d.livroAbrev === 'Mc' && /novamente prediz.*morte.*ressurreicao/i.test(p))
    return `A simetria de Jesus novamente prediz sua morte e ressurreição espelha A: travessia secreta da Galileia ↔ A': discípulos não entendem e temem perguntar. No centro: "O Filho do Homem será entregue nas mãos dos homens." O pivô teológico é a incompreensão persistente dos discípulos — mesmo após a transfiguração, a entrega não faz sentido. Na vida da igreja: a incompreensão do caminho da cruz não é defeito exclusivo dos doze; é a reação natural da carne ao escândalo do sofrimento redentor.`;
  // [42]
  if (d.livroAbrev === 'Mc' && /quem e o maior/i.test(p))
    return `A simetria de Quem é o Maior espelha A: discutem quem é maior ↔ A': advertências sobre escândalos. No centro: Jesus abraça uma criança — "quem receber uma destas crianças, a mim recebe." O pivô teológico é que o critério de grandeza no reino é a disposição de receber os sem poder. Na vida da igreja: o debate sobre quem é maior ainda ocorre em comitês, púlpitos e redes sociais; a resposta de Jesus é sempre a criança no meio — o sem nome, sem influência, sem agenda.`;
  // [43]
  if (d.livroAbrev === 'Mc' && /ensino sobre divorcio/i.test(p))
    return `A simetria de Ensino sobre divórcio espelha A: multidões o seguem ↔ A': adultério definido. No centro: "Por causa da dureza do vosso coração" — a intenção original da criação. O pivô teológico é que Jesus recorre ao "desde o princípio" — o padrão da criação, não a concessão da lei — como norma do reino. Na vida da igreja: o ensino de Jesus sobre o casamento não é moralismo; é recuperação da intenção criacional contra a desfiguração causada pela dureza de coração.`;
  // [44]
  if (d.livroAbrev === 'Mc' && /abencoa.*criancas|jesus.*bencoa.*criancas/i.test(p))
    return `A simetria de Jesus abençoa as crianças espelha A: discípulos repreendem ↔ A': Jesus abraça e abençoa. No centro: "Quem não receber o reino como criança não entrará nele." O pivô teológico é que a criança não é símbolo de inocência, mas de dependência radical — o que não tem nada para oferecer em troca. Na vida da igreja: entrar no reino como criança significa abandonar toda a negociação e receber simplesmente o que é dado.`;
  // [45]
  if (d.livroAbrev === 'Mc' && /rico homem|homem rico/i.test(p))
    return `A simetria de O rico homem espelha A: "o que farei para herdar a vida eterna?" ↔ A': "para os homens é impossível, mas não para Deus." No centro: Jesus o ama e diz "vende tudo" — o bem-amado vai embora entristecido. O pivô teológico é a sequência: Jesus o ama, Jesus faz a demanda, o homem não consegue. Na vida da igreja: Deus não nos pede o que não precisa — a demanda de vender tudo revela onde está o coração; o tristeza do rico é o retrato de uma fidelidade dividida.`;
  // [46]
  if (d.livroAbrev === 'Mc' && /terceiro.*prediz.*morte|terceira.*morte.*ressurreicao/i.test(p))
    return `A simetria de Um terceiro tempo Jesus prediz sua morte e ressurreição espelha A: Jesus vai adiante no caminho ↔ A': "ao terceiro dia ressuscitará." No centro: terceira predição detalhada — entregue a sacerdotes, escribas e gentios. O pivô teológico é a progressão das três predições: cada uma mais detalhada, cada uma mais resistida pelos discípulos. Na vida da igreja: a cruz não é acidente — Jesus vai adiante de nós para o sofrimento, não conosco por obrigação, mas como pioneiro.`;
  // [47]
  if (d.livroAbrev === 'Mc' && /pedido.*tiago.*joao/i.test(p))
    return `A simetria de O pedido de Tiago e João espelha A: pedido de sentar à direita e esquerda ↔ A': "o Filho do Homem veio servir." No centro: os dez se indignam — contraste com o modo do mundo. O pivô teológico é que os lugares à direita e esquerda de Jesus na "glória" são precisamente os ladrões crucificados com ele. Na vida da igreja: quem pede lugar de honra ao lado de Jesus não entende que esse lugar é a cruz; o serviço que liberta começa com a renúncia ao poder.`;
  // [48]
  if (d.livroAbrev === 'Mc' && /cura.*cego bartimeu|bartimeu/i.test(p))
    return `A simetria de A cura de cego Bartimeu espelha A: Bartimeu sentado à beira do caminho ↔ A': recebe a vista e segue Jesus no caminho. No centro: "Levanta-te, ele te chama." O pivô teológico é a persistência de Bartimeu contra a repressão da multidão — grita mais alto quanto mais é repreendido. Na vida da igreja: "Jesus, Filho de Davi, tem misericórdia de mim" é a oração que atravessa o ruído da multidão religiosa e chega ao Senhor que para e chama.`;
  // [49]
  if (d.livroAbrev === 'Mc' && /entrada triunfal.*jerusalem/i.test(p))
    return `A simetria de Jesus' entrada triunfal em Jerusalém espelha A: discípulos buscam o jumentinho ↔ A': Jesus observa tudo e retorna a Betânia. No centro: o povo estende mantos e ramos — aclamação messiânica. O pivô teológico é o contraste entre a aclamação pública e a observação silenciosa de Jesus — ele não é seduzido pela aclamação; entra, olha tudo e vai embora. Na vida da igreja: a popularidade não é sinal de missão cumprida; Jesus observa o que está sendo construído em seu nome.`;
  // [50]
  if (d.livroAbrev === 'Mc' && /amaldicoa.*figueira|figueira.*amaldicoa/i.test(p))
    return `A simetria de Jesus amaldiçoa A figueira espelha A: Jesus tem fome ↔ A': discípulos ouvem a maldição. No centro: "Nunca mais ninguém coma fruto de ti" — julgamento sobre o que parece vivo mas não dá fruto. O pivô teológico é o sanduíche marcano — a figueira emoldura a purificação do templo: ambos falam de religião que tem aparência mas não tem substância. Na vida da igreja: o perigo mais sutil é a folhagem religiosa sem o fruto do reino.`;
  // [51]
  if (d.livroAbrev === 'Mc' && /purifica o templo/i.test(p))
    return `A simetria de Jesus purifica O templo espelha A: Jesus entra no templo ↔ A': sai da cidade ao anoitecer. No centro: "Minha casa será chamada casa de oração para todas as nações." O pivô teológico é que a limpeza do templo não é apenas reforma moral — é julgamento sobre a instituição que excluiu as nações do propósito original. Na vida da igreja: quando a logística religiosa ocupa o espaço destinado à oração dos estrangeiros, o templo perdeu seu propósito.`;
  // [52]
  if (d.livroAbrev === 'Mc' && /licao.*figueira.*seca/i.test(p))
    return `A simetria de Lição da Figueira Seca espelha A: figueira seca desde as raízes ↔ A': perdoai para que o Pai vos perdoe. No centro: "Tende fé em Deus" — o poder da fé que não duvida. O pivô teológico é que Jesus conecta a figueira seca à fé e ao perdão — o julgamento do infrutífero e a oração da fé pertencem ao mesmo ensinamento. Na vida da igreja: a fé que move montanhas e o coração que perdoa são inseparáveis; a oração eficaz nasce de um coração limpo.`;
  // [53]
  if (d.livroAbrev === 'Mc' && /autoridade.*questionado/i.test(p))
    return `A simetria de Jesus' autoridade é questionada espelha A: sumos sacerdotes interrogam ↔ A': "também eu não vos digo." No centro: "O batismo de João era do céu ou dos homens?" O pivô teológico é a contrapergunta que revela a desonestidade dos interrogadores — não é ignorância que os impede de responder, mas cálculo. Na vida da igreja: quem questiona a autoridade de Jesus por calcular consequências políticas já deu a resposta — a incredulidade é sempre escolha, nunca apenas dúvida intelectual.`;
  // [54]
  if (d.livroAbrev === 'Mc' && /parabola.*arrendatarios.*impios|arrendatarios impios/i.test(p))
    return `A simetria de A parábola de ímpio arrendatários espelha A: vinha plantada com todos os equipamentos ↔ A': "a pedra que os construtores rejeitaram." No centro: o filho amado enviado — "a ele respeitarão" — mas matam-no. O pivô teológico é a transparência intencional da parábola — os líderes entendem que é sobre eles, mas em vez de se arrependerem, planejam prendê-lo. Na vida da igreja: a parábola do reino julgado revela que a resistência ao Filho não é ignorância mas recusa consciente.`;
  // [55]
  if (d.livroAbrev === 'Mc' && /pergunta.*paying.*impostos|paying impostos/i.test(p))
    return `A simetria de A pergunta sobre paying impostos espelha A: armadilha verbal ↔ A': ficaram maravilhados. No centro: "De quem é esta imagem e inscrição?" O pivô teológico é a distinção entre as esferas — o que leva a imagem de César pertence a César; o que leva a imagem de Deus pertence a Deus. Na vida da igreja: a pergunta silenciosa é "quem leva a imagem de Deus?" — o ser humano criado à sua imagem pertence a Deus de uma forma que nenhum tributo pode capturar.`;
  // [56]
  if (d.livroAbrev === 'Mc' && /pergunta.*ressurreicao/i.test(p))
    return `A simetria de A pergunta sobre A ressurreição espelha A: saduceus apresentam caso ↔ A': "errais muito." No centro: "Não errais por não conhecerdes as Escrituras nem o poder de Deus?" O pivô teológico é a dupla ignorância denunciada — falta de Escritura e falta de poder. Na vida da igreja: a teologia que conhece as Escrituras mas desconfia do poder de Deus, e o entusiasmo que tem experiência mas ignora a Escritura, ambos erram.`;
  // [57]
  if (d.livroAbrev === 'Mc' && /primeiro mandamento/i.test(p))
    return `A simetria de Primeiro mandamento espelha A: pergunta do escriba ↔ A': "não estás longe do reino." No centro: "Amarás o teu próximo como a ti mesmo." O pivô teológico é que os dois mandamentos não são dois — Jesus os une como inseparáveis. Na vida da igreja: a teologia que separa o amor a Deus do amor ao próximo produz devoção sem ética; a que separa o amor ao próximo do amor a Deus produz filantropia sem adoração.`;
  // [58]
  if (d.livroAbrev === 'Mc' && /pergunta.*filho.*davi/i.test(p))
    return `A simetria de A pergunta sobre de Davi filho espelha A: Jesus ensina no templo ↔ A': multidão o ouve com prazer. No centro: "O Senhor disse ao meu Senhor: assenta-te à minha direita." O pivô teológico é que o Cristo não é apenas filho de Davi — é seu Senhor. Na vida da igreja: o messianismo que reduz Jesus a herói nacional ou reformador político perde a dimensão divina que Davi já reconhecia no Salmo 110.`;
  // [59]
  if (d.livroAbrev === 'Mc' && /denuncia.*escribas/i.test(p))
    return `A simetria de Jesus Denuncia os Escribas espelha A: "guardai-vos dos escribas" ↔ A': "receberão juízo mais severo." No centro: "devoram as casas das viúvas" — injustiça social sob capa religiosa. O pivô teológico é que a denuncia de Jesus conecta a liturgia longa com a exploração econômica — as orações prolongadas são cobertura para o roubo. Na vida da igreja: o juízo mais severo é para quem usa a religião para explorar os vulneráveis enquanto mantém aparência de piedade.`;
  // [60]
  if (d.livroAbrev === 'Mc' && /viuva oferta/i.test(p))
    return `A simetria de De viúva oferta espelha A: Jesus observa o cofre ↔ A': "lançou tudo o que tinha, todo o seu sustento." No centro: "Esta viúva pobre lançou mais do que todos." O pivô teológico é que Jesus redefine a grandeza da oferta — não pelo valor absoluto, mas pela proporção do coração. Na vida da igreja: imediatamente após denunciar os que devoram casas de viúvas, Jesus aponta uma viúva como modelo de devoção — a mais explorada é a mais generosa.`;
  // [61]
  if (d.livroAbrev === 'Mc' && /destruicao.*templo.*predita/i.test(p))
    return `A simetria de A destruição do templo predita espelha A: discípulos admiram pedras do templo ↔ A': "eu vos disse tudo de antemão." No centro: "O evangelho deve ser pregado a todas as nações antes do fim." O pivô teológico é que as perseguições são oportunidade de testemunho — o que parece obstáculo é na verdade abertura missionária. Na vida da igreja: nos momentos de maior pressão sobre a comunidade, a missão não para; é convocada com maior urgência.`;
  // [62]
  if (d.livroAbrev === 'Mc' && /desolacao sacrilegia/i.test(p))
    return `A simetria de A desolação sacrilégia espelha A: "depois daquela tribulação" ↔ A': "dos quatro ventos à extremidade do céu." No centro: "Verão o Filho do Homem vindo nas nuvens com grande poder e glória." O pivô teológico é que a parousia é resposta ao tempo de tribulação — o próprio Filho do Homem vem reunir os seus. Na vida da igreja: a esperança escatológica não é fuga do sofrimento, mas certeza de que o sofrimento tem um limite e o Filho do Homem vem além dele.`;
  // [63]
  if (d.livroAbrev === 'Mc' && /licao.*figueira(?!.*seca)/i.test(p))
    return `A simetria de Lição da Figueira espelha A: ramos tenros como sinal ↔ A': "as minhas palavras não passarão." No centro: "Esta geração não passará." O pivô teológico é a permanência da palavra de Jesus contra a transitoriedade do céu e da terra. Na vida da igreja: quando tudo muda — instituições, culturas, gerações — a Palavra de Jesus permanece como o único fundamento que não cedará.`;
  // [64]
  if (d.livroAbrev === 'Mc' && /necessidade.*vigilancia/i.test(p))
    return `A simetria de Necessidade de Vigilância espelha A: "ninguém sabe o dia nem a hora" ↔ A': "a todos digo: Vigiai." No centro: parábola do senhor em viagem — a cada servo sua obra. O pivô teológico é que a ignorância do tempo convoca à fidelidade no presente — não à especulação sobre o futuro. Na vida da igreja: a vigilância cristã não é ansiedade profética sobre datas, mas fidelidade diária à obra que o Senhor confiou a cada um.`;
  // [65]
  if (d.livroAbrev === 'Mc' && /complô.*matar jesus/i.test(p))
    return `A simetria de O complô a matar Jesus espelha A: dois dias antes da Páscoa ↔ A': a Páscoa se tornará o momento do verdadeiro cordeiro. No centro: "não durante a festa, para que não haja tumulto." O pivô teológico é a ironia divina — os líderes planejam fora da festa mas Deus orquestra que seja exatamente na Páscoa. Na vida da igreja: os planos humanos contra o propósito divino frequentemente se tornam os instrumentos que o cumprem.`;
  // [66]
  if (d.livroAbrev === 'Mc' && /uncao.*betania/i.test(p))
    return `A simetria de A unção em Betânia espelha A: perfume precioso vertido ↔ A': "onde o evangelho for pregado, o que ela fez será narrado." No centro: "Deixai-a; fez uma boa obra para comigo." O pivô teológico é que Jesus transforma um gesto "desperdiçado" em proclamação evangelística eterna. Na vida da igreja: o que parece desperdício para a racionalidade econômica pode ser o gesto profético que o Senhor transforma em testemunho permanente.`;
  // [67]
  if (d.livroAbrev === 'Mc' && /judas.*trair.*jesus|judas.*concorda/i.test(p))
    return `A simetria de Judas concorda a trair Jesus espelha A: Judas vai aos sacerdotes ↔ A': ameaça interna pior que a externa. No centro: Judas buscava oportunidade de entregar Jesus. O pivô teológico é o contraste com a mulher que ungiu — ela deu tudo por amor; ele vende por dinheiro. Na vida da igreja: a traição que mais dilacera o coração de Jesus não vem de fora, mas da mesa, do beijo, do que partilhou o pão.`;
  // [68]
  if (d.livroAbrev === 'Mc' && /preparacao para a pascoa/i.test(p))
    return `A simetria de A preparação para A Páscoa espelha A: primeiro dia dos Ázimos ↔ A': discípulos preparam a Páscoa conforme Jesus disse. No centro: "Onde está a sala onde hei de comer a Páscoa com meus discípulos?" O pivô teológico é a soberania providencial de Jesus — tudo está preparado de antemão, os sinais são específicos, a sala já existe. Na vida da igreja: a missão do Senhor sempre encontra o espaço preparado quando os discípulos obedecem aos sinais dados.`;
  // [69]
  if (d.livroAbrev === 'Mc' && /pascoa.*discipulos/i.test(p))
    return `A simetria de A Páscoa com Os discípulos espelha A: Jesus e os doze se assentam ↔ A': "ai daquele que o trai." No centro: discípulos perguntam um a um "Sou eu?" O pivô teológico é que a auto-interrogação dos discípulos é a resposta correta à predição — não a autoconfiança de Pedro, mas o "serei eu?" de cada um. Na vida da igreja: a ceia do Senhor convoca cada participante à auto-examinação honesta — "sou eu?" é a pergunta que purifica a mesa.`;
  // [70]
  if (d.livroAbrev === 'Mc' && /instrucoes.*senhor.*ceia/i.test(p))
    return `A simetria de As instruções de não Senhor ceia espelha A: Jesus toma o pão ↔ A': saem cantando um hino. No centro: "Isto é o meu sangue da nova aliança, derramado por muitos." O pivô teológico é a aliança selada no sangue — não mais o sangue de animais, mas o sangue do Filho. Na vida da igreja: cada celebração da ceia proclama a nova aliança até que ele venha; o hino que se canta ao sair indica que a eucaristia não termina na mesa, mas leva à missão.`;
  // [71]
  if (d.livroAbrev === 'Mc' && /negacao.*pedro.*predita/i.test(p))
    return `A simetria de De Pedro negação predita espelha A: "todos vós vos escandalizareis" ↔ A': discípulos insistem em lealdade. No centro: Pedro declara "ainda que todos se escandalizem, eu não." O pivô teológico é que a autoconfiança de Pedro diante da predição de Jesus é ela mesma sinal de que cairá. Na vida da igreja: a certeza de que "eu não negarei" sem a vigilância da oração é a mais perigosa forma de imprudência espiritual.`;
  // [72]
  if (d.livroAbrev === 'Mc' && /jesus ora.*getsemani|getsemani/i.test(p))
    return `A simetria de Jesus ora em Getsêmani espelha A: "Assentai-vos enquanto oro" ↔ A': "Levantai-vos, vamos." No centro: "Não o que eu quero, mas o que tu queres." O pivô teológico é a oração da entrega total — Jesus não suprime o clamor ("passa de mim este cálice") mas o subordina à vontade do Pai. Na vida da igreja: a oração autêntica não é resignação fatalista nem manipulação pela fé — é o clamor honesto submetido à vontade perfeita do Pai.`;
  // [73]
  if (d.livroAbrev === 'Mc' && /traicao.*prisao.*jesus/i.test(p))
    return `A simetria de A traição e prisão de Jesus espelha A: Judas chega com multidão armada ↔ A': todos fogem, o jovem nu escapa. No centro: prendem Jesus — orelha do servo cortada; as Escrituras cumpridas. O pivô teológico é o abandono total — o jovem nu que foge é a imagem perfeita do discipulado que prefere a fuga à cruz. Na vida da igreja: "saístes como contra um salteador" — a violência religiosa que prende o Filho de Deus ainda usa a linguagem da lei.`;
  // [74]
  if (d.livroAbrev === 'Mc' && /jesus.*antes.*concilio/i.test(p))
    return `A simetria de Jesus antes do concílio espelha A: Pedro segue de longe ↔ A': escárnio e cuspidelas. No centro: "Eu sou" — declaração messiânica plena diante do sumo sacerdote. O pivô teológico é o contraste entre o "eu sou" de Jesus diante do tribunal e o "não sou" que Pedro dirá no pátio. Na vida da igreja: Jesus confessa exatamente onde o confessar custa a vida; Pedro nega exatamente onde o negar parecia salvar a vida.`;
  // [75]
  if (d.livroAbrev === 'Mc' && /pedro nega jesus/i.test(p))
    return `A simetria de Pedro nega Jesus espelha A: criada reconhece Pedro ↔ A': Pedro chora ao ouvir o galo. No centro: terceira negação com maldições — "não conheço esse homem." O pivô teológico é que o discípulo que prometia morrer com Jesus não consegue confessar diante de uma criada. Na vida da igreja: as negações mais profundas raramente acontecem nos tribunais — acontecem ao pé do fogo, nas conversas cotidianas, quando confessar tem algum custo social.`;
  // [76]
  if (d.livroAbrev === 'Mc' && /jesus.*antes de pilatos/i.test(p))
    return `A simetria de Jesus antes de Pilatos espelha A: Jesus levado de madrugada ↔ A': Pilatos fica maravilhado. No centro: Pilatos maravilha-se com o silêncio de Jesus — o servo sofredor de Isaías 53. O pivô teológico é o silêncio como testemunho — Jesus responde "tu o dizes" e depois não diz mais nada; o silêncio é mais eloquente que qualquer defesa. Na vida da igreja: há momentos em que o testemunho mais poderoso é o silêncio de quem confia que Deus o justificará.`;
  // [77]
  if (d.livroAbrev === 'Mc' && /pilatos.*crucificado/i.test(p))
    return `A simetria de Pilatos mãos Jesus sobre a ser crucificado espelha A: povo pede Barrabás ↔ A': Pilatos entrega Jesus. No centro: sacerdotes incitam a multidão — o poder religioso mobiliza o poder popular contra Jesus. O pivô teológico é que Pilatos, consciente da inocência de Jesus, cede à pressão da multidão — a injustiça de estado raramente é ignorância, mas cálculo. Na vida da igreja: "quero satisfazer a multidão" é a sentença que crucificou Jesus; a fidelidade ao justo não pode ser negociada pela popularidade.`;
  // [78]
  if (d.livroAbrev === 'Mc' && /crucificacao de jesus/i.test(p))
    return `A simetria de A crucificação de Jesus espelha A: escárnio dos soldados ↔ A': hora terceira da crucificação. No centro: Jesus chega ao Gólgota e recusa o anestésico. O pivô teológico é a recusa do vinho com mirra — Jesus enfrenta a cruz em plena consciência, sem anestesia. Na vida da igreja: o Cordeiro que carrega o pecado do mundo não se ausenta da dor; a redenção acontece em plena lucidez, não em evasão.`;
  // [79]
  if (d.livroAbrev === 'Mc' && /morte de jesus/i.test(p))
    return `A simetria de A morte de Jesus espelha A: crucificação com escárnio ↔ A': véu rasgado e confissão do centurião. No centro: "Eloí, Eloí, lamá sabactâni?" — o clamor do abandono. O pivô teológico é o Salmo 22 na boca do Filho — o abandono real dentro da obediência perfeita. Na vida da igreja: o centurião gentio que vê a morte de Jesus é o primeiro a confessar "verdadeiramente este homem era Filho de Deus" — a cruz converte quem a contempla com honestidade.`;
  // [80]
  if (d.livroAbrev === 'Mc' && /sepultamento de jesus/i.test(p))
    return `A simetria de O sepultamento de Jesus espelha A: mulheres observam de longe ↔ A': mulheres notam onde foi posto. No centro: Pilatos verifica com o centurião se Jesus de fato morreu. O pivô teológico é a verificação histórica da morte — Marcos sublinha que a ressurreição não é de alguém que apenas desmaiou, mas de alguém confirmado morto. Na vida da igreja: o sepultamento real é parte essencial do evangelho — "foi sepultado" (1 Co 15) garante que a ressurreição não é evasão mas vitória sobre a morte real.`;
  // [81]
  if (d.livroAbrev === 'Mc' && /ressurreicao de jesus/i.test(p))
    return `A simetria de A ressurreição de Jesus espelha A: mulheres compram especiarias ↔ A': saem correndo com temor e espanto. No centro: "Ressuscitou, não está aqui; vede o lugar onde o puseram." O pivô teológico é o final abrupto de Marcos — "não disseram nada a ninguém, pois estavam com medo" — que convoca o leitor a ser o continuador da história. Na vida da igreja: o evangelho de Marcos termina com silêncio e medo precisamente para que a comunidade quebre o silêncio e proclame o que as mulheres não conseguiram dizer.`;

  // ── LUCAS [1]–[145] ────────────────────────────────────────────────
  // [1]
  if (d.livroAbrev === 'Lc' && /dedicacao a teofilo/i.test(p))
    return `A simetria de "Dedicação a Teófilo" espelha A: muitos narradores ↔ A': certeza plena para Teófilo. No centro: Lucas decide escrever "ordenadamente" (kathexês). O pivô teológico é a diferença entre boatos e investigação cuidadosa — Lucas distingue fé de credulidade. Na vida da igreja: o evangelho suporta escrutínio histórico; confiar em Lucas não é fé cega mas adesão a testemunho verificado. A comunidade cristã não precisa temer perguntas difíceis — a solidez das palavras de Jesus sobrevive a toda investigação honesta.`;
  // [2]
  if (d.livroAbrev === 'Lc' && /nascimento.*joao.*batista.*predito/i.test(p))
    return `A simetria do nascimento predito de João espelha A: casal justo mas estéril ↔ A': Zacarias emudecido, Isabel concebe. No centro: o anjo anuncia o nome João e a missão de preparar o povo. O pivô teológico é a esterilidade transformada em missão — Deus começa o evangelho pelo impossível humano. Na vida da igreja: onde a comunidade parece estéril, Deus pode estar preparando exatamente o anúncio que faltava. A fidelidade silenciosa de Zacarias e Isabel durou décadas antes de ser respondida.`;
  // [3]
  if (d.livroAbrev === 'Lc' && /nascimento.*jesus.*predito/i.test(p))
    return `A simetria do anúncio a Maria espelha A: virgem prometida ↔ A': "Faça-se em mim segundo a tua palavra". No centro: "Conceberás e darás à luz um filho, e seu reino não terá fim." O pivô teológico é a resposta de Maria — ela não pergunta "por que eu?" mas "como será isso?" e então consente. Na vida da igreja: a disponibilidade de Maria modela toda vocação cristã. Antes de qualquer chamado grandioso há um "faça-se em mim" que é o ato mais corajoso de qualquer crente.`;
  // [4]
  if (d.livroAbrev === 'Lc' && /maria visita isabel/i.test(p))
    return `A simetria da visita de Maria a Isabel espelha A: Maria parte apressada ↔ A': "Bem-aventurada a que creu." No centro: João salta no ventre e Isabel é cheia do Espírito Santo. O pivô teológico é o reconhecimento profético — antes de qualquer palavra humana, o Espírito já reconheceu o Messias. Na vida da igreja: a presença de Jesus muda o ambiente antes de qualquer proclamação formal. Comunidades que carregam Cristo sentem esse mesmo salto de alegria e reconhecimento mútuo.`;
  // [5]
  if (d.livroAbrev === 'Lc' && /maria.*cantico.*louvor/i.test(p))
    return `A simetria do Magnificat espelha A: "minha alma engrandece ao Senhor" ↔ A': Maria permanece com Isabel. No centro: Deus exaltou os humildes e encheu de bens os famintos. O pivô teológico é a inversão social do reino — a jovem de Nazaré tornou-se o veículo do grande programa de Deus. Na vida da igreja: adoração genuína sempre inclui a dimensão da justiça. Cantar o Magnificat é comprometer-se com um Deus que derruba poderosos e levanta humilhados.`;
  // [6]
  if (d.livroAbrev === 'Lc' && /nascimento.*joao.*batista(?!.*predito)/i.test(p))
    return `A simetria do nascimento de João espelha A: vizinhos se alegram ↔ A': "a mão do Senhor estava com ele." No centro: Zacarias escreve "João é seu nome" e sua língua se solta. O pivô teológico é a obediência restaurando a fala — quarenta semanas de silêncio ensinaram Zacarias que Deus define os nomes, não a tradição familiar. Na vida da igreja: há momentos em que a fidelidade silenciosa precede a proclamação pública, e quando a obediência é total, a voz volta com ainda mais clareza.`;
  // [7]
  if (d.livroAbrev === 'Lc' && /profecia.*zacarias/i.test(p))
    return `A simetria do Benedictus espelha A: "Bendito o Senhor Deus de Israel" ↔ A': João crescia no deserto. No centro: cumprir a aliança com Abraão — a promessa chega ao seu cumprimento por misericórdia, não por mérito humano. O pivô teológico é a continuidade da aliança: o que Deus prometeu a Abraão ele cumpre em Jesus. Na vida da igreja: a oração de Zacarias é modelo — louvor que narra a história de Deus antes de pedir qualquer coisa; a memória da fidelidade passada alimenta a confiança presente.`;
  // [8]
  if (d.livroAbrev === 'Lc' && /nascimento.*jesus(?!.*predito)/i.test(p))
    return `A simetria do nascimento de Jesus espelha A: César ordena o censo ↔ A': Jesus é circuncidado e nomeado. No centro: o anjo anuncia aos pastores "hoje nasceu o Salvador, Cristo o Senhor." O pivô teológico é a ironia imperial — o decreto de Augusto, pensando controlar o mundo, cumpre sem saber a profecia de Miquéias sobre Belém. Na vida da igreja: Deus usa os poderes do mundo para executar seus propósitos sem que eles saibam. O Senhor da história converte até as ordens dos impérios em serviço ao seu plano.`;
  // [9]
  if (d.livroAbrev === 'Lc' && /jesus.*apresentado.*templo/i.test(p))
    return `A simetria da apresentação de Jesus espelha A: os pais trazem Jesus conforme a Lei ↔ A': o menino crescia e se fortalecia. No centro: Simeão proclama Jesus como "luz para iluminar as nações e glória de Israel." O pivô teológico é a inclusão universal — a salvação é preparada "diante de todos os povos." Na vida da igreja: a apresentação de Jesus no templo já anunciava que o evangelho não ficaria dentro das fronteiras de Israel. Todo acolhimento de Cristo implica participação nessa missão universal.`;
  // [10]
  if (d.livroAbrev === 'Lc' && /menino.*jesus.*templo/i.test(p))
    return `A simetria do menino Jesus espelha A: família sobe para a Páscoa ↔ A': Jesus os obedece e cresce em sabedoria. No centro: encontrado no templo ouvindo e perguntando — "Não sabíeis que me importa estar na casa de meu Pai?" O pivô teológico é a primeira autodeclaração de Jesus: antes de qualquer milagre, ele define sua identidade pela relação com o Pai. Na vida da igreja: a formação dos filhos na fé exige que a casa do Pai seja lugar natural, não estranho — e que perguntas difíceis sejam incentivadas, não silenciadas.`;
  // [11]
  if (d.livroAbrev === 'Lc' && /proclamacao.*joao.*batista/i.test(p))
    return `A simetria da proclamação de João espelha A: contexto histórico — Tibério, Pilatos, Herodes ↔ A': João prega e é preso. No centro: "Produzi frutos dignos de arrependimento" com instruções específicas para soldados, publicanos e povo. O pivô teológico é o arrependimento que muda práticas concretas — não apenas emoções religiosas. Na vida da igreja: o arrependimento genuíno tem endereço — o publicano para de extorquir, o soldado para de intimidar. A pregação que não especifica é pregação que não transforma.`;
  // [12]
  if (d.livroAbrev === 'Lc' && /batismo.*jesus/i.test(p))
    return `A simetria do batismo de Jesus espelha A: todo o povo sendo batizado ↔ A': "Tu és meu Filho amado." No centro: o Espírito desce sobre Jesus em oração. O pivô teológico é a oração — Lucas é o único que menciona que Jesus estava orando quando o céu se abriu. Na vida da igreja: os momentos mais decisivos de missão nascem da oração. A identidade de Jesus foi proclamada pelo Pai no contexto de oração, e a identidade do crente também se consolida no mesmo lugar.`;
  // [13]
  if (d.livroAbrev === 'Lc' && /ancestrais.*jesus/i.test(p))
    return `A simetria da genealogia espelha A: "filho de José" ↔ A': "filho de Adão, filho de Deus." No centro: Abraão — o ponto onde a promessa do Deus de todas as nações foi feita a um homem específico. O pivô teológico é a direção ascendente da genealogia de Lucas — de Jesus a Adão, não de Abraão a Jesus — mostrando que Jesus é o Salvador de toda a humanidade, não só de Israel. Na vida da igreja: a salvação em Cristo não é propriedade de uma etnia ou cultura, mas restauração do que Adão perdeu para todos.`;
  // [14]
  if (d.livroAbrev === 'Lc' && /tentacao.*jesus/i.test(p))
    return `A simetria da tentação espelha A: quarenta dias no deserto ↔ A': Jesus retorna cheio do Espírito para ensinar. No centro: a tentação do poder — todos os reinos do mundo por um ato de adoração. O pivô teológico é que cada tentação ataca a identidade de Jesus como Filho: "Se és Filho de Deus..." — mas Jesus responde com a Palavra, não com demonstração de poder. Na vida da igreja: as tentações mais profundas não são de imoralidade óbvia, mas de usar os meios errados para fins aparentemente certos. A Escritura como resposta não é recurso intelectual — é dependência real do Pai.`;
  // [15]
  if (d.livroAbrev === 'Lc' && /rejection.*nazare/i.test(p))
    return `A simetria da rejeição em Nazaré espelha A: Jesus recebe o rolo de Isaías ↔ A': passa por entre eles. No centro: "Hoje se cumpriu esta Escritura nos vossos ouvidos." O pivô teológico é a rejeição do profeta em sua própria terra — e a resposta de Jesus com os exemplos de Elias e Eliseu ministrando a gentios, provocando a ira daqueles que queriam exclusividade. Na vida da igreja: o evangelho que não provoca nenhuma resistência pode não estar tocando nos pontos certos. A palavra de Jesus sobre a graça estendida aos de fora ainda perturba quem quer monopólio sobre Deus.`;
  // [16]
  if (d.livroAbrev === 'Lc' && /jesus.*expulsa.*mau.*espirito/i.test(p))
    return `A simetria do mau espírito espelha A: Jesus ensina com autoridade ↔ A': "Devo pregar o reino a outras cidades." No centro: "Com autoridade e poder manda aos espíritos imundos e eles saem." O pivô teológico é a unidade entre ensino e ação — a autoridade da palavra de Jesus se manifesta tanto na doutrina quanto na libertação. Na vida da igreja: a proclamação do reino é inseparável da demonstração do reino. Uma Igreja que só ensina sem liberta, ou só cura sem ensinar, não representa o ministério completo de Jesus.`;
  // [17]
  if (d.livroAbrev === 'Lc' && /jesus.*chama.*primeiro.*discipulos/i.test(p))
    return `A simetria do chamado dos discípulos espelha A: Jesus ensina da barca de Simão ↔ A': "Desde agora serás pescador de homens." No centro: a rede repleta de peixes que quase afunda dois barcos. O pivô teológico é a sequência — abundância milagrosa seguida de confissão de indignidade e então chamado. Pedro não é chamado apesar do seu pecado, mas após reconhecê-lo. Na vida da igreja: a missão começa com o encontro com a santidade de Cristo que nos torna conscientes de quem somos — e então o chamado vem justamente para os que dizem "sou homem pecador."`;
  // [18]
  if (d.livroAbrev === 'Lc' && /jesus.*purifica.*um.*leproso/i.test(p))
    return `A simetria da purificação do leproso espelha A: "Se quiseres, podes" ↔ A': Jesus se retira para orar. No centro: "Quero; fica purificado" — a vontade de Jesus é a resposta ao "se quiseres." O pivô teológico é o toque — Jesus toca o intocável, violando o protocolo de impureza por amor. Na vida da igreja: a limpeza de Jesus não opera à distância segura. Ele entra no espaço do excluído. Qualquer missão que cuida dos marginalizados sem tocar, sem proximidade real, não imita o gesto de Jesus.`;
  // [19]
  if (d.livroAbrev === 'Lc' && /jesus.*cura.*paralitico/i.test(p))
    return `A simetria da cura do paralítico espelha A: fariseus presentes, fé dos amigos ↔ A': todos espantados glorificam a Deus. No centro: "Homem, os teus pecados são perdoados" — a cura interior precede a cura exterior. O pivô teológico é que Jesus liga perdão e cura — a questão mais profunda não é a paralisia mas a separação de Deus. Na vida da igreja: amigos que abrem o teto representam o tipo de comunidade que não aceita barreiras institucionais quando alguém precisa chegar a Jesus. A fé que desce pelo teto é a fé comunitária em sua forma mais radical.`;
  // [20]
  if (d.livroAbrev === 'Lc' && /jesus.*chama.*levi/i.test(p))
    return `A simetria do chamado de Levi espelha A: Jesus vê Levi e diz "Segue-me" ↔ A': "Não vim chamar justos, mas pecadores." No centro: fariseus murmuram sobre Jesus comer com publicanos. O pivô teológico é a mesa — Jesus não apenas passa por Levi, mas come com ele e com seus amigos. Na vida da igreja: a inclusão à mesa é o gesto mais radical do evangelho. Uma Igreja que prega aceitação mas não senta à mesa com os "errados" contradiz o padrão de Jesus, que usou o banquete como sacramento de missão.`;
  // [21]
  if (d.livroAbrev === 'Lc' && /pergunta.*sobre.*jejum/i.test(p))
    return `A simetria do jejum espelha A: discípulos de João jejuam, os teus comem ↔ A': a prática religiosa é moldada pela presença do Noivo. No centro: "Dias virão quando o noivo lhes será tirado — então jejuarão." O pivô teológico é que a forma das práticas religiosas deve refletir a realidade teológica do momento — tempo de festa ou tempo de luto. Na vida da igreja: impor práticas religiosas sem discernimento do tempo é legalismo. A liturgia serve ao evangelho, não o contrário.`;
  // [22]
  if (d.livroAbrev === 'Lc' && /parabolas.*vinho.*manto/i.test(p))
    return `A simetria das parábolas espelha A: remendo novo em roupa velha — ambos se perdem ↔ A': "o velho é bom." No centro: vinho novo em odres novos — a novidade radical do reino exige recipientes capazes de contê-la. O pivô teológico é a incompatibilidade — o evangelho não é uma atualização do judaísmo religioso mas algo qualitativamente novo. Na vida da igreja: tentar conter o movimento do Espírito em estruturas velhas rígidas produz ruptura. A disposição para formas novas não é abandono da fé mas fidelidade ao Deus que faz novas todas as coisas.`;
  // [23]
  if (d.livroAbrev === 'Lc' && /pergunta.*sobre.*sabado/i.test(p))
    return `A simetria do sábado espelha A: discípulos colhem espigas, fariseus acusam ↔ A': "O Filho do Homem é Senhor do sábado." No centro: o exemplo de Davi comendo os pães da proposição — necessidade humana prevaleceu sobre regulação litúrgica. O pivô teológico é que o sábado foi criado para o homem, não o homem para o sábado. Na vida da igreja: regras religiosas devem servir ao florescimento humano. Quando a prática religiosa se volta contra as pessoas, ela perdeu sua razão de ser.`;
  // [24]
  if (d.livroAbrev === 'Lc' && /homem.*mao.*seca/i.test(p))
    return `A simetria do homem com a mão seca espelha A: escribas e fariseus observam para acusar ↔ A': encheram-se de furor. No centro: "Estende a tua mão" — ela é restaurada diante de todos. O pivô teológico é a pergunta de Jesus: "É lícito no sábado fazer bem ou fazer mal, salvar a vida ou destruí-la?" — que expõe a agenda de morte dos observadores religiosos. Na vida da igreja: quando a observância religiosa se torna mecanismo de exclusão e julgamento, já se encontra do lado errado da pergunta de Jesus.`;
  // [25]
  if (d.livroAbrev === 'Lc' && /jesus.*escolhe.*doze.*apostolos/i.test(p))
    return `A simetria da escolha dos doze espelha A: Jesus passa a noite em oração ↔ A': poder sai dele e cura a todos. No centro: a lista dos doze, terminando com Judas o traidor — inclusão sombria que lembra que o chamado não garante a perseverança. O pivô teológico é que a missão nasce da oração — Jesus não escolhe os doze sem antes passar a noite com o Pai. Na vida da igreja: decisões sobre liderança e chamado devem emergir de oração profunda, não apenas de competência aparente.`;
  // [26]
  if (d.livroAbrev === 'Lc' && /bencaos.*lamentos/i.test(p))
    return `A simetria das bênçãos e lamentos espelha A: "bem-aventurados os pobres" ↔ A': "ai de vós quando todos falarem bem de vós." No centro: a bem-aventurança do perseguido por causa do Filho do Homem. O pivô teológico é a inversão escatológica — as categorias do presente serão revertidas no reino. Na vida da igreja: o evangelho não é uma promessa de conforto presente mas de inversão futura. A teologia da prosperidade lê o Magnificat ao contrário — Jesus declara bem-aventurados exatamente os que a prosperidade prometida deveria eliminar.`;
  // [27]
  if (d.livroAbrev === 'Lc' && /amor.*inimigos/i.test(p))
    return `A simetria do amor aos inimigos espelha A: "Amai os vossos inimigos" ↔ A': "Sede misericordiosos como vosso Pai é misericordioso." No centro: "Fazei aos outros como quereis que eles vos façam" — a regra de ouro como síntese ética. O pivô teológico é a imitação do Pai — amar inimigos não é utopia social mas filiação divina em ação. Na vida da igreja: a distinção entre cristãos e o mundo não é a moralidade convencional, mas o amor que não calcula retorno. Amar quem nos ama é humano; amar quem nos odeia é divino.`;
  // [28]
  if (d.livroAbrev === 'Lc' && /judging others/i.test(p))
    return `A simetria de "julgando os outros" espelha A: "Não julgueis" ↔ A': "Com a mesma medida com que medirdes, vos medirão." No centro: "Perdoai e sereis perdoados." O pivô teológico é a reciprocidade — o padrão que aplicamos aos outros voltará para nós. Na vida da igreja: comunidades que funcionam como tribunais de julgamento uns dos outros destroem-se. A generosidade do perdão não é ingenuidade mas reconhecimento de que também somos devedores que precisam de misericórdia.`;
  // [29]
  if (d.livroAbrev === 'Lc' && /discipulo.*mestre/i.test(p))
    return `A simetria do discípulo e o mestre espelha A: "Pode um cego guiar outro cego?" ↔ A': seguir o mestre certo. No centro: "O discípulo não está acima do mestre." O pivô teológico é que o problema de liderança começa pela escolha do modelo — um líder cego forma discípulos cegos. Na vida da igreja: a formação espiritual depende criticamente de quem se escolhe como modelo. Seguir Jesus como mestre não é metáfora — é o único caminho para não cair no barranco junto com líderes que não enxergam.`;
  // [30]
  if (d.livroAbrev === 'Lc' && /argueiro.*olho.*irmao/i.test(p))
    return `A simetria do argueiro espelha A: "Por que vês o argueiro no olho do irmão?" ↔ A': "Então verás claramente para tirar o argueiro." No centro: "Hipócrita! Tira primeiro a viga do teu." O pivô teológico é a sequência correta — auto-exame antes de cuidar do outro. Na vida da igreja: a correção fraternal não é proibida, mas só é legítima depois do trabalho interior. A comunidade que pula o auto-exame e vai direto à correção do outro é comunidade de hipócritas, não de discípulos.`;
  // [31]
  if (d.livroAbrev === 'Lc' && /arvore.*frutos/i.test(p))
    return `A simetria da árvore e os frutos espelha A: árvore boa não dá fruto mau ↔ A': "A boca fala do que está cheio o coração." No centro: não se colhem figos de espinheiros. O pivô teológico é que o caráter determina a conduta — não o esforço superficial mas a natureza profunda. Na vida da igreja: transformação moral não começa pela disciplina externa mas pela renovação do coração. O que sai da boca, das decisões e dos relacionamentos revela o que realmente habita no interior.`;
  // [32]
  if (d.livroAbrev === 'Lc' && /dois.*alicerces/i.test(p))
    return `A simetria dos dois alicerces espelha A: "Por que me chamais Senhor e não fazeis o que digo?" ↔ A': a casa sem fundamento é destruída completamente. No centro: a enchente vem contra a casa fundada na rocha — e ela não estremece. O pivô teológico é que a diferença entre os dois construtores não é o esforço mas a obediência — ambas as casas enfrentam a mesma tempestade. Na vida da igreja: a crise revela o fundamento. Comunidades que ouviram muito mas praticaram pouco desmoronam sob pressão — não por falta de conhecimento mas por falta de obediência.`;
  // [33]
  if (d.livroAbrev === 'Lc' && /jesus.*cura.*servo.*centuriao/i.test(p))
    return `A simetria da cura do servo espelha A: servo doente à morte ↔ A': enviados voltam e o acham são. No centro: "Dize apenas uma palavra e meu servo será curado." O pivô teológico é a fé do centurião gentio que supera a de Israel — ele entende autoridade porque a exerce, e por isso reconhece a autoridade de Jesus. Na vida da igreja: a fé mais impressionante que Jesus encontrou estava fora dos limites religiosos estabelecidos. O reconhecimento da autoridade de Cristo não depende de pertencimento étnico ou religioso, mas de humildade real.`;
  // [34]
  if (d.livroAbrev === 'Lc' && /jesus.*ressuscita.*filho.*viuva.*naim/i.test(p))
    return `A simetria da ressurreição em Naim espelha A: Jesus se aproxima com multidão ↔ A': "Um grande profeta se levantou entre nós." No centro: "Não chores... Mancebo, levanta-te!" O pivô teológico é a compaixão de Jesus que age antes de qualquer pedido — ninguém pediu nada, Jesus viu e se comoveu. Na vida da igreja: a missão não espera pedidos formais. A viúva não sabia que podia pedir ressurreição. A Igreja que age antes de ser pedida, movida pela compaixão, age à imagem de Jesus.`;
  // [35]
  if (d.livroAbrev === 'Lc' && /mensageiros.*joao.*batista/i.test(p))
    return `A simetria dos mensageiros de João espelha A: João pergunta da prisão ↔ A': "Bem-aventurado o que não achar em mim escândalo." No centro: "Ide anunciar a João o que vistes e ouvis: cegos veem, coxos andam..." O pivô teológico é a confirmação pelo cumprimento de Isaías 61 — Jesus não argumenta sobre sua identidade, aponta para a evidência. Na vida da igreja: quando a dúvida chega, a resposta está nos frutos. A missão de Jesus com os pobres, doentes e marginalizados é a própria prova de que o reino chegou.`;
  // [36]
  if (d.livroAbrev === 'Lc' && /ninguem.*maior.*joao/i.test(p))
    return `A simetria sobre João espelha A: "O que fostes ver no deserto?" ↔ A': "O menor no reino é maior do que ele." No centro: "Este é de quem está escrito: Eis que envio o meu mensageiro adiante de ti." O pivô teológico é a descontinuidade na continuidade — João é o maior dos profetas e, ao mesmo tempo, pertence a uma era que foi superada pelo reino. Na vida da igreja: a grandeza no reino não é medida por dons ou posição mas por proximidade ao Rei. Quem serve no reino já possui algo que toda a era dos profetas esperava ver.`;
  // [37]
  if (d.livroAbrev === 'Lc' && /povo.*esta.*geracao/i.test(p))
    return `A simetria sobre "esta geração" espelha A: publicanos reconhecem, fariseus rejeitam ↔ A': "A sabedoria é justificada por todos os seus filhos." No centro: João e Jesus são ambos rejeitados por motivos opostos. O pivô teológico é a irracionalidade da rejeição — quando qualquer forma de Deus se aproximar é rejeitada, o problema não é a mensagem mas o coração endurecido. Na vida da igreja: é possível ter objeções para tudo e nunca se arrepender. A conversão exige disposição de ser alcançado, independentemente da forma como Deus escolhe chegar.`;
  // [38]
  if (d.livroAbrev === 'Lc' && /mulher.*pecadora.*perdoada/i.test(p))
    return `A simetria da mulher perdoada espelha A: Simão convida Jesus ↔ A': "A tua fé te salvou." No centro: a parábola dos dois devedores — quem mais ama é o que mais foi perdoado. O pivô teológico é a inversão total — a mulher chamada de pecadora demonstra mais amor do que o fariseu chamado de justo. Na vida da igreja: o maior obstáculo ao amor por Jesus não é a imoralidade passada, mas a autossuficiência religiosa presente. A consciência do muito que foi perdoado gera o amor intenso que o fariseu nunca vai entender.`;
  // [39]
  if (d.livroAbrev === 'Lc' && /algumas.*mulheres.*acompanham/i.test(p))
    return `A simetria das mulheres que seguem Jesus espelha A: Jesus percorre cidades proclamando o reino ↔ A': a missão sustentada pelos recursos das mulheres. No centro: Maria Madalena, Joana, Suzana — curadas e comprometidas. O pivô teológico é a inclusão estrutural de mulheres na equipe missionária de Jesus, radical para o primeiro século. Na vida da igreja: as mulheres não são suporte periférico mas parceiras centrais da missão desde o princípio. Qualquer eclesiologia que as marginaliza contradiz o padrão do próprio Jesus.`;
  // [40]
  if (d.livroAbrev === 'Lc' && /parabola.*semeador/i.test(p))
    return `A simetria do semeador espelha A: semente no caminho — perdida ↔ A': semente na boa terra — cem vezes mais. No centro: semente entre espinhos sufocada pelos cuidados, riquezas e prazeres — a ameaça mais próxima da realidade média. O pivô teológico é que a terra, não a semente, é a variável. A Palavra é constante; o que muda é a receptividade do coração. Na vida da igreja: a pregação fiel não garante resultados uniformes. A responsabilidade do pregador é semear; a responsabilidade do ouvinte é preparar o solo.`;
  // [41]
  if (d.livroAbrev === 'Lc' && /they may look/i.test(p))
    return `A simetria do ver sem ver espelha A: discípulos recebem os mistérios do reino ↔ A': a parábola revela e oculta. No centro: "Para que vendo não vejam e ouvindo não entendam." O pivô teológico é que a parábola é separadora — não por intenção de excluir mas porque a resposta ao evangelho revela quem já tem ouvidos para ouvir. Na vida da igreja: a palavra pregada nunca é neutra. Ela expõe a condição do ouvinte — alguns saem mais endurecidos, outros mais abertos. O mesmo sermão nunca produz os mesmos efeitos em todos.`;
  // [42]
  if (d.livroAbrev === 'Lc' && /significado.*parabola.*semeador/i.test(p))
    return `A simetria da explicação espelha A: semente roubada pelo diabo ↔ A': semente na boa terra com perseverança. No centro: semente sufocada pelos cuidados, riquezas e prazeres da vida — sem fruto. O pivô teológico é a perseverança como critério — não quem começa com entusiasmo, mas quem permanece e dá fruto ao longo do tempo. Na vida da igreja: o discipulado mede-se em décadas, não em emoções iniciais. A palavra de Deus é verdadeiramente recebida quando produz fruto visível e duradouro na vida cotidiana.`;
  // [43]
  if (d.livroAbrev === 'Lc' && /lampada.*sob.*pote/i.test(p))
    return `A simetria da lâmpada espelha A: ninguém esconde a lâmpada ↔ A': responsabilidade proporcional ao que se recebe. No centro: "Portanto, considerai como ouvis." O pivô teológico é que receber a Palavra sem praticá-la não é neutro — é perda. Ao que tem, será dado; ao que não tem, até o que pensa ter lhe será tirado. Na vida da igreja: ouvir sem fazer não conserva a iluminação recebida — ela diminui. A lâmpada da Palavra precisa ser exposta, não guardada; usada, não conservada.`;
  // [44]
  if (d.livroAbrev === 'Lc' && /verdadeiros.*parentes.*jesus/i.test(p))
    return `A simetria dos parentes de Jesus espelha A: mãe e irmãos não conseguem chegar ↔ A': a obediência cria família mais profunda que o sangue. No centro: "Minha mãe e meus irmãos são os que ouvem a Palavra de Deus e a praticam." O pivô teológico é a redefinição de família pelo critério da obediência — sem negar os laços biológicos, Jesus cria uma nova comunidade. Na vida da igreja: a comunidade de fé não é substituta da família, mas onde a Palavra é ouvida e obedecida há laços que superam qualquer outro.`;
  // [45]
  if (d.livroAbrev === 'Lc' && /jesus.*acalma.*tempestade/i.test(p))
    return `A simetria da tempestade espelha A: "Passemos para o outro lado" ↔ A': "Onde está a vossa fé?" No centro: os discípulos acordam Jesus em pânico — "Mestre, perecemos!" O pivô teológico é a distância entre as palavras de Jesus ("passemos para o outro lado") e o pânico dos discípulos — ele já havia prometido a chegada. Na vida da igreja: a fé não é ausência de tormenta, mas memória das promessas de Jesus dentro da tormenta. Acordar Jesus não é fraqueza; abandonar sua palavra no meio da crise é.`;
  // [46]
  if (d.livroAbrev === 'Lc' && /jesus.*cura.*endemoninhado.*geraseno/i.test(p))
    return `A simetria do geraseno espelha A: homem nos sepulcros, nu e acorrentado ↔ A': Jesus o envia como testemunha. No centro: os demônios entram nos porcos que se precipitam ao lago. O pivô teológico é a restauração completa — "sentado, vestido e em seu perfeito juízo" — e o contraste com os moradores que pedem Jesus que parta. Na vida da igreja: a comunidade que prefere seus porcos à salvação de um homem escolheu o que realmente valoriza. Jesus respeita essa escolha e parte — mas deixa um testemunho onde não foi recebido.`;
  // [47]
  if (d.livroAbrev === 'Lc' && /uma.*mulher.*curou/i.test(p))
    return `A simetria da mulher curada espelha A: Jairo suplica pela filha ↔ A': "A tua fé te salvou." No centro: ela toca a orla do manto e o fluxo para imediatamente. O pivô teológico é que Jesus para no meio de uma emergência para honrar uma cura que aconteceu às suas costas — a mulher invisível torna-se o centro da cena. Na vida da igreja: as pessoas que a urgência da missão tende a invisibilizar são exatamente as que Jesus para para ver. Ninguém é atropelado pelo ritmo do reino.`;
  // [48]
  if (d.livroAbrev === 'Lc' && /menina.*restaurada.*vida/i.test(p))
    return `A simetria da menina restaurada espelha A: "Tua filha morreu" ↔ A': os pais ficam atônitos. No centro: Jesus entra com os três discípulos; "A menina não morreu, dorme" — e riram. O pivô teológico é que a morte é redefinida pelo poder de Jesus — o que parece irreversível não é, para quem tem poder sobre a vida. Na vida da igreja: as situações declaradas mortas — relacionamentos, ministérios, vocações — ainda podem receber a palavra de Jesus: "Levanta-te." A fé persiste além do ponto onde os outros já encerraram o processo.`;
  // [49]
  if (d.livroAbrev === 'Lc' && /missao.*doze/i.test(p))
    return `A simetria da missão dos doze espelha A: poder e autoridade dados ↔ A': percorrem aldeias pregando e curando. No centro: instrução mínima — nem cajado, nem bolsa, nem pão. O pivô teológico é a dependência radical como metodologia missionária — nada de excesso, tudo de confiança no Provedor. Na vida da igreja: a missão sobrecarregada de recursos e planejamento pode perder a dependência do Espírito que é sua fonte. Ir com pouco não é pobreza de estratégia — é teologia da dependência do Pai.`;
  // [50]
  if (d.livroAbrev === 'Lc' && /perplexidade.*herodes/i.test(p))
    return `A simetria da perplexidade de Herodes espelha A: Herodes ouve os relatos ↔ A': Herodes procurava ver Jesus. No centro: "João, eu o decapitei; quem é este?" O pivô teológico é o confronto com a consciência culpada — Herodes matou João e agora a pergunta sobre Jesus o persegue. Na vida da igreja: quem silenciou um profeta não consegue silenciar a questão sobre Cristo. A perplexidade de Herodes é o fruto natural de quem atende ao poder humano em vez de escutar a Palavra.`;
  // [51]
  if (d.livroAbrev === 'Lc' && /alimentacao.*cinco.*mil/i.test(p))
    return `A simetria da alimentação espelha A: os doze voltam da missão ↔ A': doze cestos sobraram. No centro: Jesus manda que se assentem em grupos de cinquenta — o caos da multidão torna-se comunidade ordenada. O pivô teológico é a eucaristia antecipada — "tomou, olhou para o céu, abençoou, partiu e deu." O milagre acontece no ato de partir e distribuir. Na vida da igreja: a multiplicação dos recursos começa pelo ato de colocar nas mãos de Jesus o que parece insuficiente.`;
  // [52]
  if (d.livroAbrev === 'Lc' && /declaracao.*pedro.*jesus/i.test(p))
    return `A simetria da confissão de Pedro espelha A: Jesus orando a sós ↔ A': a confissão pessoal. No centro: "Mas vós, quem dizeis que sou eu?" O pivô teológico é a mudança de "as multidões dizem" para "vós dizeis" — a fé pessoal não pode ser herdada da opinião coletiva. Na vida da igreja: cada geração e cada indivíduo precisa responder à pergunta de Jesus por si mesmo. A confissão de Pedro não foi transferida para os seus descendentes — cada discípulo precisa ter o seu próprio momento de resposta.`;
  // [53]
  if (d.livroAbrev === 'Lc' && /jesus.*prediz.*morte.*ressurreicao/i.test(p) && d.capitulos.startsWith('9'))
    return `A simetria do primeiro anúncio da paixão espelha A: "não contem a ninguém" ↔ A': "ressuscitará ao terceiro dia." No centro: "pelos anciãos, sacerdotes e escribas" — a rejeição vem de dentro do sistema religioso, não de fora. O pivô teológico é a necessidade — "deve sofrer" — mostrando que a cruz não é acidente mas propósito. Na vida da igreja: a sequência rejeição-morte-ressurreição não é tragédia com final feliz; é o próprio caminho de Deus. Sofrer por causa da fidelidade ao evangelho segue o mesmo padrão.`;
  // [54]
  if (d.livroAbrev === 'Lc' && /natureza.*discipulado/i.test(p))
    return `A simetria do discipulado espelha A: "Negue-se a si mesmo, tome sua cruz cada dia" ↔ A': "Alguns não provarão a morte antes de ver o reino." No centro: "De que adianta ao homem ganhar o mundo e perder-se a si mesmo?" O pivô teológico é o paradoxo do ganho e da perda — a lógica invertida do reino onde perder a vida é salvá-la. Na vida da igreja: o discipulado diário ("cada dia") distingue a cruz cristã do heroísmo ocasional. Não é um momento de sacrifício, mas uma orientação de vida que se renova a cada manhã.`;
  // [55]
  if (d.livroAbrev === 'Lc' && /transfiguracao/i.test(p))
    return `A simetria da transfiguração espelha A: Jesus sobe ao monte para orar ↔ A': "Este é meu Filho amado; a ele ouvi!" No centro: Moisés e Elias falam do êxodo que Jesus há de cumprir em Jerusalém. O pivô teológico é que a glória de Jesus é revelada no contexto da conversa sobre sua morte — a transfiguração não desvia do caminho da cruz, mas o ilumina. Na vida da igreja: os momentos de visão clara da glória de Cristo não eliminam o caminho de sofrimento — eles fortalecem para percorrê-lo.`;
  // [56]
  if (d.livroAbrev === 'Lc' && /jesus.*cura.*menino.*demonio/i.test(p))
    return `A simetria da cura do menino espelha A: pai suplica pelo filho único ↔ A': todos atônitos com a grandeza de Deus. No centro: "Geração incrédula e perversa! Até quando estarei convosco?" O pivô teológico é o contraste entre a glória da transfiguração (9.28-36) e a impotência da descida — o confronto com a realidade da incredulidade logo após a visão. Na vida da igreja: os momentos de mountain-top precisam descer ao vale onde as pessoas sofrem e os discípulos falham. A fé que funciona só nas alturas não é suficiente.`;
  // [57]
  if (d.livroAbrev === 'Lc' && /jesus.*novamente.*prediz.*morte/i.test(p))
    return `A simetria do segundo anúncio espelha A: "Ponde estas palavras nos vossos ouvidos" ↔ A': "Temiam perguntar-lhe sobre isso." No centro: "Eles não entenderam esta palavra — estava encoberta." O pivô teológico é o velamento divino — Lucas indica que a incompreensão dos discípulos não era apenas obtusidade humana mas ocultamento providencial até o momento certo. Na vida da igreja: nem toda verdade é assimilada imediatamente. A abertura para aprender o que ainda não entendemos é parte do discipulado honesto.`;
  // [58]
  if (d.livroAbrev === 'Lc' && /ambicao.*ciume.*repreendidos/i.test(p))
    return `A simetria da ambição repreendida espelha A: disputam quem é maior ↔ A': "Quem não é contra vós é por vós." No centro: "O menor entre vós é o grande." O pivô teológico é que Jesus responde à disputa sobre grandeza colocando uma criança ao seu lado — a criança sem poder social se torna o critério de grandeza no reino. Na vida da igreja: ambição por status e ciúme de ministérios alheios são as patologias mais antigas das comunidades cristãs. O remédio é a mesma criança que Jesus colocou no centro.`;
  // [59]
  if (d.livroAbrev === 'Lc' && /samaritan aldeia/i.test(p))
    return `A simetria da aldeia samaritana espelha A: Jesus resolve ir a Jerusalém com determinação ↔ A': partem para outra aldeia. No centro: Tiago e João querem chamar fogo do céu. O pivô teológico é a repreensão de Jesus aos "Filhos do Trovão" — o poder do reino não é para destruir os que rejeitam, mas para continuar a missão. Na vida da igreja: a rejeição não é chamado para retaliação mas para reorientação. A missão prossegue — há outras aldeias, outros povos que esperam.`;
  // [60]
  if (d.livroAbrev === 'Lc' && /would-be seguidores/i.test(p))
    return `A simetria dos seguidores potenciais espelha A: "Seguir-te-ei para onde quer que fores" ↔ A': "Ninguém que olha para trás é apto para o reino." No centro: "Segue-me" — resposta à segunda pessoa, com chamado imediato. O pivô teológico é que as três desculpas (sem lar, sepultar o pai, despedir-se da família) são todas legítimas fora do contexto do reino — mas o chamado de Jesus exige prioridade absoluta. Na vida da igreja: o problema não é ter família ou obrigações; é colocar qualquer coisa antes de responder ao chamado de Cristo.`;
  // [61]
  if (d.livroAbrev === 'Lc' && /missao.*setenta/i.test(p))
    return `A simetria da missão dos setenta espelha A: enviados dois a dois ↔ A': no dia do juízo Sodoma será mais tolerável. No centro: entrar nas casas, comer o que derem, curar e anunciar — "o reino de Deus está próximo." O pivô teológico é a encarnação da missão na hospitalidade — o missionário não chega com seus próprios recursos mas recebe a hospitalidade do lugar. Na vida da igreja: a missão que depende de total autossuficiência perde a oportunidade de receber o anfitrião — e de deixar o reino como presente na casa que acolheu.`;
  // [62]
  if (d.livroAbrev === 'Lc' && /lamentos.*cidades.*impenitentes/i.test(p))
    return `A simetria dos lamentos espelha A: ai de Corazim e Betsaida ↔ A': "quem vos rejeita a mim me rejeita." No centro: ai de Cafarnaum — a cidade que mais recebeu e mais rejeitou. O pivô teológico é a proporcionalidade do julgamento — a responsabilidade é proporcional à revelação recebida. Na vida da igreja: privilege spiritual não é garantia de salvação — é aumento de responsabilidade. A cidade que viu mais milagres e permaneceu indiferente está em pior situação que aquela que nunca ouviu.`;
  // [63]
  if (d.livroAbrev === 'Lc' && /retorno.*setenta/i.test(p))
    return `A simetria do retorno espelha A: voltam com alegria — os demônios se submetem ↔ A': "alegrai-vos porque os vossos nomes estão escritos nos céus." No centro: "Dei-vos poder... nada vos fará mal." O pivô teológico é a reorientação da alegria — de resultados visíveis (demônios submetidos) para fundamento eterno (nomes escritos). Na vida da igreja: a alegria baseada em resultados é vulnerável à decepção. A alegria baseada na segurança da graça é inabalável porque não depende do desempenho missionário.`;
  // [64]
  if (d.livroAbrev === 'Lc' && /jesus.*exulta/i.test(p))
    return `A simetria do júbilo de Jesus espelha A: louvor ao Pai pela revelação aos pequeninos ↔ A': profetas e reis desejaram ver o que vós vedes. No centro: "Ninguém sabe quem é o Filho senão o Pai; quem é o Pai senão o Filho e a quem o Filho revelar." O pivô teológico é o conhecimento mútuo do Pai e do Filho como fundamento de toda revelação. Na vida da igreja: conhecer a Deus não é produto de inteligência ou posição social — é dom do Filho para os pequeninos. O acesso ao Pai passa exclusivamente por Cristo.`;
  // [65]
  if (d.livroAbrev === 'Lc' && /parabola.*bom.*samaritano/i.test(p))
    return `A simetria do bom samaritano espelha A: "que farei para herdar a vida eterna?" ↔ A': "vai e faze o mesmo." No centro: sacerdote passa, levita passa, samaritano para e cuida — amor que cruza fronteiras étnicas e religiosas. O pivô teológico é a redefiniçāo de "próximo" — não "quem é meu próximo?" mas "de quem fui próximo?" A pergunta muda o sujeito. Na vida da igreja: a misericórdia não começa pela definição categórica de quem merece ajuda, mas pela disposição de ser próximo do que está diante de nós, independentemente da sua origem.`;
  // [66]
  if (d.livroAbrev === 'Lc' && /jesus.*visita.*marta.*maria/i.test(p))
    return `A simetria de Marta e Maria espelha A: Marta recebe Jesus em casa ↔ A': "a boa parte não lhe será tirada." No centro: Marta reclama do serviço solitário — Jesus responde com ternura e correção. O pivô teológico é que o serviço a Jesus sem estar com Jesus é finalmente vazio. Maria escolheu o que é necessário e eterno. Na vida da igreja: a atividade cristã pode tornar-se fuga da presença de Cristo. A comunidade que serve muito e ora pouco perdeu a ordem das prioridades — o serviço nasce do estar aos pés de Jesus.`;
  // [67]
  if (d.livroAbrev === 'Lc' && /nao.*senhor.*oracao|nao lord.*oracao/i.test(p))
    return `A simetria do Pai Nosso espelha A: discípulo pede ser ensinado a orar ↔ A': a oração fecha com proteção. No centro: "Venha o teu reino" — o eixo da oração é a soberania de Deus, não as necessidades humanas. O pivô teológico é a sequência: santificação do nome → vinda do reino → provisão diária → perdão → proteção. Na vida da igreja: a oração cristã é fundamentalmente orientada para Deus antes de ser orientada para nós. Começar pela santidade de Deus ordena todo o resto.`;
  // [68]
  if (d.livroAbrev === 'Lc' && /sobre.*oracao/i.test(p))
    return `A simetria do ensino sobre oração espelha A: amigo que acorda à meia-noite ↔ A': o Pai dará o Espírito Santo. No centro: "Pedi, buscai, batei" — tríade de persistência orante. O pivô teológico é o argumento do menor para o maior — se um amigo humano atende por importunação, quanto mais o Pai celestial atenderá. Na vida da igreja: a oração não é monólogo religioso mas relação com um Pai que ouve e responde. A persistência não é para convencer um Deus relutante mas para exercitar a fé do que pede.`;
  // [69]
  if (d.livroAbrev === 'Lc' && /jesus.*belzebu/i.test(p))
    return `A simetria de Jesus e Belzebu espelha A: acusação de expulsar por Belzebu ↔ A': espírito imundo volta com sete piores. No centro: "Se expulso pelo dedo de Deus, certamente o reino de Deus chegou a vós." O pivô teológico é o "dedo de Deus" — memória do Êxodo onde os magos de Faraó reconheceram o poder divino. Na vida da igreja: diante dos milagres de Jesus há duas opções — reconhecer o reino ou inventar uma explicação alternativa. Quem escolhe a segunda fecha-se ao Espírito e fica em risco de um vazio que atrai piores ocupantes.`;
  // [70]
  if (d.livroAbrev === 'Lc' && /verdadeira.*bem-aventuranca/i.test(p))
    return `A simetria da verdadeira bem-aventurança espelha A: louvor biológico — "bendito o ventre" ↔ A': a intimidade com Jesus pela obediência supera a intimidade pelo sangue. No centro: "Antes, bem-aventurados os que ouvem a Palavra de Deus e a guardam." O pivô teológico é a reorientação do privilégio — nem maternidade biológica de Jesus, nem pertencimento étnico, define a verdadeira bem-aventurança. Na vida da igreja: a posição espiritual não é herdada nem conquistada pelo nascimento — é recebida pela escuta e obediência à Palavra.`;
  // [71]
  if (d.livroAbrev === 'Lc' && /sinal.*jonas/i.test(p))
    return `A simetria do sinal de Jonas espelha A: nenhum sinal exceto Jonas ↔ A': os ninivitas se levantarão no juízo. No centro: a rainha do sul e os ninivitas como juízes da geração que tem diante de si algo maior — e permanece indiferente. O pivô teológico é a comparação devastadora — gentios responderam a mensageiros menores com mais fé do que Israel respondeu ao próprio Filho. Na vida da igreja: a familiaridade com o evangelho pode produzir o pior dos ceticismos — o de quem já ouviu tudo e por isso nada mais o alcança.`;
  // [72]
  if (d.livroAbrev === 'Lc' && /luz.*corpo/i.test(p))
    return `A simetria da luz do corpo espelha A: a lâmpada não é escondida ↔ A': o corpo totalmente iluminado. No centro: "Se o teu olho for bom, todo o teu corpo estará cheio de luz." O pivô teológico é o olho como fonte de luz interior — o que olhamos com atenção e desejo molda quem somos. Na vida da igreja: atenção, afeto e contemplação formam o caráter. Uma vida orientada para Deus irradia Deus. Onde está o olhar, está o coração — e donde o coração for, irá o homem.`;
  // [73]
  if (d.livroAbrev === 'Lc' && /jesus.*denuncia.*fariseus.*doutores/i.test(p))
    return `A simetria dos seis ais espelha A: espanto por Jesus não se lavar ↔ A': escribas e fariseus pressionam para apanhá-lo. No centro: "Mestre, nos insultas também a nós" — o confronto com os doutores. O pivô teológico é que a denúncia de Jesus atinge o coração do problema religioso — limpeza externa com corrupção interna, dízimo sem justiça, honrar profetas do passado enquanto perseguem os do presente. Na vida da igreja: a religiosidade sem integridade é sepulcro adornado — belo por fora, podridão por dentro.`;
  // [74]
  if (d.livroAbrev === 'Lc' && /advertencia.*hipocrisia/i.test(p))
    return `A simetria da advertência espelha A: "guardai-vos do fermento da hipocrisia" ↔ A': "o que sussurraram nos aposentos será proclamado dos terraços." No centro: "Nada há encoberto que não venha a ser descoberto." O pivô teológico é a inevitabilidade da revelação — a hipocrisia não tem futuro, só presente ilusório. Na vida da igreja: a transparência não é vulnerabilidade — é sabedoria. Quem vive como se fosse ser visto por todos está apenas antecipando a realidade do juízo, onde tudo será manifesto.`;
  // [75]
  if (d.livroAbrev === 'Lc' && /a quem.*temer/i.test(p))
    return `A simetria de "a quem temer" espelha A: não temais os que matam o corpo ↔ A': o Espírito ensinará na hora do confronto. No centro: quem confessar o Filho do Homem diante dos homens, o Filho do Homem o confessará diante dos anjos. O pivô teológico é a hierarquia dos temores — o temor de Deus liberta de todos os outros temores. Na vida da igreja: a coragem missionária nasce do temor correto. Quem teme mais a Deus do que aos homens pode falar livremente — e nas horas mais difíceis, o Espírito provê as palavras.`;
  // [76]
  if (d.livroAbrev === 'Lc' && /parabola.*rico.*fool|rico.*insensato/i.test(p))
    return `A simetria do rico insensato espelha A: recusa de ser juiz da herança ↔ A': "assim é o que acumula para si e não é rico para com Deus." No centro: "Esta noite te pedirão a tua alma — o que preparaste, de quem será?" O pivô teológico é a ilusão da autossuficiência material — a alma não pertence ao homem, é pedida de volta por Deus. Na vida da igreja: riqueza não é errada, mas acumular sem ser rico para com Deus é insensatez de primeira ordem. A questão não é o tamanho do celeiro mas o tamanho do coração para com Deus e os outros.`;
  // [77]
  if (d.livroAbrev === 'Lc' && /nao.*fique.*preocupado/i.test(p))
    return `A simetria de "não fique preocupado" espelha A: não vos preocupeis com comida e roupa ↔ A': "não temais, pequeno rebanho." No centro: os lírios que não trabalham mas são vestidos por Deus — muito mais que os pássaros. O pivô teológico é o Pai que conhece as necessidades — a ansiedade é incompatível com o conhecimento de quem cuida de nós. Na vida da igreja: a preocupação não é humildade; é funcionalmente uma declaração de que Deus não é confiável. Buscar primeiro o reino não é romantismo mas reorientação de prioridades com consequências práticas.`;
  // [78]
  if (d.livroAbrev === 'Lc' && /tesouro.*ceu/i.test(p))
    return `A simetria do tesouro espelha A: "vendei os vossos bens e dai esmolas" ↔ A': "onde está o vosso tesouro, aí estará o vosso coração." No centro: tesouro inesgotável nos céus onde ladrão não chega nem traça corrói. O pivô teológico é que o investimento molda a afeição — o coração segue o tesouro. Na vida da igreja: generosidade não é apenas ato moral; é decisão de onde o coração vai morar. Dar para os pobres e para o reino é mover o coração em direção ao que é eterno.`;
  // [79]
  if (d.livroAbrev === 'Lc' && /servos.*vigilantes/i.test(p))
    return `A simetria dos servos vigilantes espelha A: "lombos cingidos e lâmpadas acesas" ↔ A': "o Filho do Homem virá na hora em que não pensais." No centro: se vier na segunda ou terceira vigília e os achar vigilantes — bem-aventurados. O pivô teológico é a inversão do banquete — o senhor que chega tarde serve seus próprios servos. Na vida da igreja: a vigilância escatológica não é ansiedade sobre datas mas postura de serviço constante. O servo fiel não calcula quando o senhor volta — simplesmente está fazendo o que foi chamado a fazer.`;
  // [80]
  if (d.livroAbrev === 'Lc' && /servo.*fiel.*infiel/i.test(p))
    return `A simetria do servo fiel espelha A: Pedro pergunta se a parábola é para todos ↔ A': "a quem muito foi dado, muito será pedido." No centro: servo que maltrata enquanto o senhor demora — será surpreendido e punido. O pivô teológico é que o conhecimento da vontade do senhor aumenta a responsabilidade. Na vida da igreja: líderes que conhecem a Escritura e a pregam, mas não a vivem, são culpados de hipocrisia agravada. O padrão de Deus é proporcional ao acesso que cada um teve à Sua palavra.`;
  // [81]
  if (d.livroAbrev === 'Lc' && /jesus.*causa.*divisao/i.test(p))
    return `A simetria de Jesus como causa de divisão espelha A: "vim lançar fogo sobre a terra" ↔ A': pai contra filho, mãe contra filha. No centro: "Pensais que vim trazer paz? Não, mas sim divisão." O pivô teológico é que o evangelho inevitavelmente cria linhas de demarcação — não como objetivo mas como efeito. Na vida da igreja: a falsa paz que evita todo conflito pode ser recusa do evangelho. Onde Cristo é anunciado com fidelidade, haverá divisão entre os que respondem e os que resistem — até dentro das famílias.`;
  // [82]
  if (d.livroAbrev === 'Lc' && /sinais.*dos.*tempos/i.test(p))
    return `A simetria dos sinais dos tempos espelha A: leem a nuvem e preveem chuva ↔ A': "Como não sabeis interpretar este tempo?" No centro: "Hipócritas! Sabeis interpretar a face da terra e do céu." O pivô teológico é a ironia da cegueira seletiva — peritos em meteorologia mas cegos para o maior evento da história humana acontecendo diante de seus olhos. Na vida da igreja: discernimento espiritual é mais urgente que inteligência mundana. Ler os sinais do presente requer os olhos da fé, não apenas os da análise cultural.`;
  // [83]
  if (d.livroAbrev === 'Lc' && /opponent.*turn/i.test(p))
    return `A simetria do acordo com o adversário espelha A: "por que não julgais por vós mesmos o que é justo?" ↔ A': "não sairás até pagar o último centavo." No centro: faça as pazes no caminho antes de chegar ao tribunal. O pivô teológico é a urgência da reconciliação antes do julgamento — a imagem sugere que há ainda tempo, mas esse tempo tem fim. Na vida da igreja: adiar a reconciliação com Deus e com os outros é apostar na sorte de chegar antes de ser levado ao juiz. O evangelho é convite de urgência, não de comodidade.`;
  // [84]
  if (d.livroAbrev === 'Lc' && /arrependimento.*perdicao/i.test(p))
    return `A simetria do arrependimento espelha A: galileus mortos por Pilatos — não eram piores pecadores ↔ A': "se não vos arrependerdes, todos igualmente perecereis." No centro: os dezoito que morreram quando caiu a torre — também não eram mais culpados. O pivô teológico é que o sofrimento alheio não é termômetro de culpa alheia — é chamado ao arrependimento de quem observa. Na vida da igreja: usar tragédias como evidência de pecado específico dos afetados é erro teológico e moral. A tragédia deve produzir no observador autoexame, não acusação.`;
  // [85]
  if (d.livroAbrev === 'Lc' && /parabola.*figueira.*esteril/i.test(p))
    return `A simetria da figueira estéril espelha A: três anos sem fruto — "corta-a" ↔ A': "se não der fruto, manda cortá-la." No centro: "Deixa-a ainda este ano" — o jardineiro intercede por mais tempo. O pivô teológico é a tensão entre misericórdia e responsabilidade — Deus dá prazo, mas o prazo é real. Na vida da igreja: a paciência de Deus não é indiferença ao fruto — é oportunidade prolongada. Cada dia de graça é novo prazo para responder. A misericórdia tem urgência, não relaxamento.`;
  // [86]
  if (d.livroAbrev === 'Lc' && /jesus.*cura.*mulher.*aleijada/i.test(p))
    return `A simetria da mulher aleijada espelha A: dezoito anos curvada ↔ A': adversários envergonhados, multidão alegre. No centro: "Esta filha de Abraão devia ser solta no sábado?" O pivô teológico é a identidade — Jesus a chama "filha de Abraão," afirmando sua plena pertença ao povo da aliança antes de qualquer regulação religiosa. Na vida da igreja: pessoas marginalizadas por sistemas religiosos são primeiro filhos e filhas de Abraão — sua libertação é celebração, não escândalo. A misericórdia nunca viola o sábado — ela cumpre o seu propósito original.`;
  // [87]
  if (d.livroAbrev === 'Lc' && /parabola.*mostarda.*fermento/i.test(p))
    return `A simetria da mostarda e do fermento espelha A: grão de mostarda que cresce em árvore ↔ A': fermento que levedou toda a farinha. No centro: as aves do céu aninham-se nos ramos — o reino abriga o inesperado, inclusive os de fora. O pivô teológico é o duplo crescimento — externo e visível (árvore) e interno e invisível (fermento). Na vida da igreja: o reino cresce de formas que não controlamos nem sempre vemos. A obsessão com resultados imediatos pode ignorar o trabalho silencioso do fermento que já está transformando tudo.`;
  // [88]
  if (d.livroAbrev === 'Lc' && /porta.*estreita/i.test(p))
    return `A simetria da porta estreita espelha A: Jesus ensina em direção a Jerusalém ↔ A': "haverá pranto e ranger de dentes." No centro: "Uma vez que o dono da casa fechar a porta... não sei de onde sois." O pivô teológico é a temporalidade da oportunidade — a porta que está aberta pode ser fechada. Na vida da igreja: a familiaridade superficial com Jesus — "comemos e bebemos contigo" — não substitui a entrada pela porta estreita da conversão real. O julgamento distinguirá entre os que usaram a presença de Jesus como contexto social e os que entraram.`;
  // [89]
  if (d.livroAbrev === 'Lc' && /lamento.*sobre.*jerusalem/i.test(p))
    return `A simetria do lamento espelha A: fariseus avisam sobre Herodes ↔ A': "não me vereis até que digais: Bendito o que vem em nome do Senhor." No centro: "Jerusalém, Jerusalém, que matas os profetas — quantas vezes quis reunir teus filhos como a galinha... não quisestes." O pivô teológico é o desejo frustrado de Jesus — não falta de poder, mas recusa de ser reunida. Na vida da igreja: a resistência ao evangelho entristece o coração de Cristo antes de resultar em julgamento. O lamento de Jesus sobre Jerusalém é modelo de como a Igreja deve tratar os que rejeitam — com coração partido, não com satisfação.`;
  // [90]
  if (d.livroAbrev === 'Lc' && /jesus.*cura.*hidropisia/i.test(p))
    return `A simetria da hidropisia espelha A: observavam Jesus para acusá-lo ↔ A': não puderam responder. No centro: Jesus cura e então pergunta — "É lícito curar no sábado?" O pivô teológico é a sequência invertida — Jesus age primeiro, justifica depois, e o silêncio dos adversários é mais eloquente que qualquer resposta. Na vida da igreja: a ação misericordiosa precede muitas vezes o argumento teológico. Quando a cura fala por si mesma, o debate sobre a cura fica sem fundamento.`;
  // [91]
  if (d.livroAbrev === 'Lc' && /parabola.*grande.*jantar/i.test(p))
    return `A simetria do grande jantar espelha A: não escolhas o lugar de honra ↔ A': "para que a minha casa fique cheia." No centro: tudo está preparado — os convidados recusam com desculpas plausíveis. O pivô teológico é que a rejeição do banquete resulta na inclusão dos excluídos — pobres, mancos, cegos — e depois os dos caminhos e das cercas. Na vida da igreja: quando os religiosos recusam o evangelho, os marginalizados o recebem. A mesa de Deus sempre estará cheia — a questão é apenas quem a ocupará.`;
  // [92]
  if (d.livroAbrev === 'Lc' && /custo.*discipulado/i.test(p))
    return `A simetria do custo do discipulado espelha A: "Se alguém não odeia pai e mãe... não pode ser meu discípulo" ↔ A': "sal que perde o sabor não serve." No centro: "Calcula primeiro o custo" — as parábolas da torre e do rei em guerra. O pivô teológico é a honestidade radical de Jesus — ele não seduz com promessas fáceis mas convoca com exigências claras. Na vida da igreja: evangelismo que esconde o custo do discipulado produz cristãos que desistem na primeira tormenta. A verdade sobre o custo não afasta os chamados — os chama ainda mais profundamente.`;
  // [93]
  if (d.livroAbrev === 'Lc' && /parabola.*ovelha.*perdida.*moeda.*perdida/i.test(p))
    return `A simetria do perdido e encontrado espelha A: publicanos e pecadores se aproximam; fariseus murmuram ↔ A': "alegria diante dos anjos por um pecador que se arrepende." No centro: "Assim haverá mais alegria no céu por um pecador que se arrepende do que por noventa e nove justos." O pivô teológico é o excesso de alegria — desproporcionalmente maior pelo encontrado que pelos que nunca se perderam. Na vida da igreja: a missão com perdidos não é obrigação constrangedora mas participação na alegria que o céu sente ao ver um pecador retornar.`;
  // [94]
  if (d.livroAbrev === 'Lc' && /parabola.*prodigo.*irmao/i.test(p))
    return `A simetria do filho pródigo espelha A: filho mais novo desperdiça tudo em país distante ↔ A': "este teu irmão estava morto e reviveu." No centro: o pai corre, abraça e proclama "este meu filho estava morto e reviveu" — a ressurreição como metáfora do arrependimento. O pivô teológico é que ambos os filhos estão perdidos — o mais novo da forma óbvia, o mais velho de forma religiosa. Na vida da igreja: a Igreja sempre tem em si os dois filhos. O perigo do mais velho (obediência sem comunhão, serviço sem celebração) é mais sutil e mais perigoso que o do mais novo.`;
  // [95]
  if (d.livroAbrev === 'Lc' && /parabola.*mordomo.*desonesto/i.test(p))
    return `A simetria do mordomo espelha A: acusado de dissipar bens ↔ A': "Não podeis servir a Deus e às riquezas." No centro: o senhor louva a astúcia do mordomo injusto — não a desonestidade, mas a criatividade diante da crise. O pivô teológico é a aplicação inversa — se um homem desonesto usa recursos materiais com tanta criatividade para seu benefício futuro, com quanto mais ardor os filhos da luz devem usar seus recursos para o reino. Na vida da igreja: criatividade na generosidade honra a Deus mais do que a cautela na retenção.`;
  // [96]
  if (d.livroAbrev === 'Lc' && /lei.*reino.*deus/i.test(p))
    return `A simetria da lei e do reino espelha A: fariseus amigos do dinheiro escarneciam ↔ A': quem repudia a mulher e casa com outra comete adultério. No centro: "A lei e os profetas duravam até João; desde então o reino de Deus é anunciado." O pivô teológico é a descontinuidade — não abolição da lei, mas entrada em uma nova era inaugurada pelo reino. Na vida da igreja: o evangelho não é um apêndice da lei — é o cumprimento e a superação de tudo o que a lei apontava. Apegar-se à lei como caminho de salvação depois de Cristo é recusar a nova era.`;
  // [97]
  if (d.livroAbrev === 'Lc' && /rico.*lazaro/i.test(p))
    return `A simetria do rico e Lázaro espelha A: rico na púrpura, Lázaro mendigo à porta ↔ A': "se não ouvem Moisés, tampouco se persuadirão se alguém ressuscitar dos mortos." No centro: "há um abismo fixo" — a inversão após a morte é irreversível. O pivô teológico é que a Escritura já contém tudo o necessário para o arrependimento — sinais extraordinários não convencem quem já endureceu diante da Palavra. Na vida da igreja: a missão que busca apenas milagres para convencer está buscando no lugar errado. Onde a Palavra é pregada fielmente, o Espírito convence.`;
  // [98]
  if (d.livroAbrev === 'Lc' && /alguns.*ditos.*jesus/i.test(p))
    return `A simetria dos ditos de Jesus espelha A: "ai de quem causa escândalos" ↔ A': "Somos servos inúteis." No centro: "Senhor, aumenta-nos a fé" — a resposta à enormidade das exigências. O pivô teológico é que fé do tamanho de grão de mostarda é suficiente — a questão não é a quantidade de fé mas sua direção. Na vida da igreja: a progressão perdão sete vezes → fé como mostarda → servos inúteis revela que a vida do discipulado exige perdão radical, fé genuína e humildade estrutural. Nenhum dos três é natural — todos são dom.`;
  // [99]
  if (d.livroAbrev === 'Lc' && /jesus.*purifica.*dez.*leprosos/i.test(p))
    return `A simetria dos dez leprosos espelha A: dez clamam à distância ↔ A': "a tua fé te salvou." No centro: "Ide, mostrai-vos aos sacerdotes" — enquanto iam foram limpos. O pivô teológico é o contraste entre os dez curados e o um que voltou para agradecer — e era samaritano. Na vida da igreja: gratidão é mais rara do que a cura que a gerou. A missão não pode ser motivada pela expectativa de reconhecimento. Que os dez foram curados é certo; que apenas um reconheceu o Curador é a pergunta que permanece.`;
  // [100]
  if (d.livroAbrev === 'Lc' && /vinda.*reino/i.test(p))
    return `A simetria da vinda do reino espelha A: "o reino de Deus está no meio de vós" ↔ A': "onde estiver o corpo, ali se ajuntarão as águias." No centro: "primeiro é necessário que ele padeça muito e seja rejeitado." O pivô teológico é a sequência paixão-reino — não há manifestação gloriosa sem a rejeição e morte anteriores. Na vida da igreja: qualquer esperança escatológica que pule o sofrimento presente falsifica o padrão de Cristo. O reino já está presente em forma velada e ainda virá em manifestação gloriosa — e entre os dois há o caminho da cruz.`;
  // [101]
  if (d.livroAbrev === 'Lc' && /parabola.*viuva.*juiz.*injusto/i.test(p))
    return `A simetria da viúva e o juiz espelha A: "orar sempre e não desanimar" ↔ A': "quando vier o Filho do Homem, achará fé na terra?" No centro: o juiz iníquo atende por importunação — quanto mais o Pai fará justiça aos seus. O pivô teológico é que a persistência em oração não é convencer Deus mas exercitar a fé que espera. Na vida da igreja: a questão final não é "Deus responde?" mas "haverá fé quando ele voltar?" A viúva modela a perseverança que o Filho do Homem procurará e não quer encontrar extinta.`;
  // [102]
  if (d.livroAbrev === 'Lc' && /parabola.*fariseu.*publicano/i.test(p))
    return `A simetria do fariseu e o publicano espelha A: contada aos que confiavam em si mesmos ↔ A': "todo o que se exaltar será humilhado." No centro: publicano bate no peito — "Deus, sê misericordioso para comigo, pecador." O pivô teológico é a justificação como dom dado ao que não tem nada a oferecer. Na vida da igreja: a oração do fariseu não é má pela forma — é má pelo pressuposto. Qualquer ato de culto que nos compare favoravelmente com outros já escolheu o lado errado da parábola.`;
  // [103]
  if (d.livroAbrev === 'Lc' && /jesus.*abencoa.*criancas/i.test(p))
    return `A simetria das crianças espelha A: discípulos as repreendiam ↔ A': "de modo algum nele entrará" quem não receber como criança. No centro: "Deixai as crianças virem a mim — o reino de Deus é de tais como estas." O pivô teológico é a criança como modelo epistemológico — recepcão sem negociação, dependência sem vergonha, confiança sem reservas. Na vida da igreja: os discípulos tentavam proteger o tempo de Jesus dos indesejados — mas os indesejados eram exatamente o modelo do reino. A comunidade que exclui os pequenos exclui o padrão de recepção do próprio reino.`;
  // [104]
  if (d.livroAbrev === 'Lc' && /rico.*governante/i.test(p))
    return `A simetria do rico governante espelha A: pergunta sobre vida eterna ↔ A': "receberá muito mais e a vida eterna." No centro: "ele ficou muito triste, porque era muito rico." O pivô teológico é a tristeza como revelação — a proposta de Jesus sobre a riqueza não encontrou resistência intelectual mas apego afetivo. Na vida da igreja: o problema não é ter riqueza, mas que a riqueza seja o que impede de seguir. A tristeza do governante é o autodiagnóstico mais honesto do evangelho — e ele foi embora sem ser curado dela.`;
  // [105]
  if (d.livroAbrev === 'Lc' && /jesus.*prediz.*morte.*ressurreicao/i.test(p) && d.capitulos.startsWith('18'))
    return `A simetria do terceiro anúncio da paixão espelha A: "subimos a Jerusalém, os profetas se cumprirão" ↔ A': "não entenderam nada — o sentido estava oculto." No centro: "após açoitá-lo, o matarão." O pivô teológico é o cumprimento profético — o sofrimento de Jesus não é acidente histórico mas escritura que se realiza. Na vida da igreja: quando a realidade dolorosa chega, a fé busca o cumprimento, não o abandono. O mesmo Deus que anunciou a morte anunciou a ressurreição — ambas são parte da mesma fidelidade.`;
  // [106]
  if (d.livroAbrev === 'Lc' && /jesus.*cura.*cego.*mendigo.*jerico/i.test(p))
    return `A simetria do cego de Jericó espelha A: mendigo cego pede de que se tratava ↔ A': seguia-o glorificando a Deus. No centro: Jesus para e pergunta: "Que queres que eu te faça?" O pivô teológico é a pergunta de Jesus ao óbvio — o cego quer ver, mas Jesus o convida a articular seu desejo, tornando-o um ato de fé. Na vida da igreja: Deus conhece nossas necessidades mas nos convida a expressá-las. A oração específica não informa Deus — exercita nossa fé e torna o recebimento um ato consciente de reconhecimento.`;
  // [107]
  if (d.livroAbrev === 'Lc' && /jesus.*zaqueu/i.test(p))
    return `A simetria de Zaqueu espelha A: rico chefe de publicanos que queria ver Jesus ↔ A': "o Filho do Homem veio buscar e salvar o perdido." No centro: "Zaqueu, hoje devo hospedar-me em tua casa" — Jesus convida a si mesmo. O pivô teológico é a iniciativa de Jesus — Zaqueu queria ver, Jesus veio salvar. A subida na árvore foi curiosidade; a descida foi salvação. Na vida da igreja: Jesus sempre vai além do que esperamos quando nos aproximamos com curiosidade sincera. E a salvação transforma imediatamente a relação com as riquezas — Zaqueu dá metade e restitui quatro vezes.`;
  // [108]
  if (d.livroAbrev === 'Lc' && /parabola.*dez.*minas|parabola.*dez.*pounds/i.test(p))
    return `A simetria das dez minas espelha A: parábola contada porque esperavam o reino imediatamente ↔ A': "ao que tem, será dado." No centro: os servos fiéis recebem cidades; o que guardou a mina recebe julgamento. O pivô teológico é que o período entre a partida do Mestre e o seu retorno é tempo de fidelidade produtiva, não de espera passiva. Na vida da igreja: escatologia realista não é passividade — é responsabilidade multiplicada. O que fizemos com o que recebemos é a pergunta que o Senhor fará ao voltar.`;
  // [109]
  if (d.livroAbrev === 'Lc' && /entrada.*triunfal/i.test(p))
    return `A simetria da entrada triunfal espelha A: Jesus manda buscar o jumentinho ↔ A': "não conheceste o tempo da tua visitação." No centro: fariseus pedem silêncio — "as pedras clamarão." O pivô teológico é o choro de Jesus sobre Jerusalém no meio do louvor — reconhece a aclamação e ao mesmo tempo lamenta a cegueira que levará à destruição. Na vida da igreja: é possível aplaudir Jesus culturalmente e ao mesmo tempo não reconhecer o que pertence à paz. A adoração que não produz transformação pode ser apenas performance festiva.`;
  // [110]
  if (d.livroAbrev === 'Lc' && /jesus.*purifica.*templo/i.test(p))
    return `A simetria da purificação do templo espelha A: "minha casa será casa de oração" ↔ A': todo o povo suspenso a ouvi-lo. No centro: sacerdotes e escribas procuravam matá-lo — mas não achavam como. O pivô teológico é que Jesus reclamou o templo para sua função original — encontro com Deus — e o povo respondeu. Na vida da igreja: qualquer estrutura religiosa pode tornar-se espaço de comércio espiritual. A limpeza que Jesus fez não foi reforma administrativa — foi declaração de que a presença de Deus não coabita com mercantilismo religioso.`;
  // [111]
  if (d.livroAbrev === 'Lc' && /autoridade.*questionado/i.test(p))
    return `A simetria da autoridade questionada espelha A: líderes perguntam sobre autoridade de Jesus ↔ A': "também não vos digo com que autoridade." No centro: a deliberação dos líderes — condenados por sua própria recusa de responder. O pivô teológico é que a questão sobre a autoridade de Jesus só pode ser respondida por quem está disposto a reconhecer a autoridade de João — e portanto a de Deus. Na vida da igreja: rejeitar a autoridade de Cristo não é postura neutra — é recusa que se torna seu próprio julgamento.`;
  // [112]
  if (d.livroAbrev === 'Lc' && /parabola.*arrendatarios.*impios/i.test(p))
    return `A simetria dos lavradores espelha A: vinha arrendada, dono ausente ↔ A': "a pedra rejeitada tornou-se pedra angular." No centro: "enviarei meu filho amado — talvez o respeitem." O pivô teológico é a consciência da identidade do Filho pelos lavradores — "este é o herdeiro; matemo-lo" — e ainda assim o matam. Na vida da igreja: o pecado da rejeição de Cristo não é ignorância mas recusa consciente. A parábola convida cada ouvinte a perguntar: em que grupo estou — entre os que recebem o Filho ou entre os que o rejeitam?`;
  // [113]
  if (d.livroAbrev === 'Lc' && /pergunta.*paying.*impostos/i.test(p))
    return `A simetria dos impostos espelha A: espiões fingidos de justos ↔ A': não puderam apanhá-lo nas palavras. No centro: "Pagai a César o que é de César e a Deus o que é de Deus." O pivô teológico é a distinção e a unidade — há uma esfera legítima do Estado e uma de Deus, mas a imagem de Deus no ser humano excede infinitamente a imagem de César na moeda. Na vida da igreja: cidadania e fé coexistem sem se confundir. O cristão é bom cidadão sem fazer do Estado um ídolo — e tudo o que pertence a Deus (imagem, vida, adoração) não pode ser cedido a César.`;
  // [114]
  if (d.livroAbrev === 'Lc' && /qusetion.*ressurreicao/i.test(p))
    return `A simetria da questão sobre a ressurreição espelha A: saduceus com o dilema dos sete irmãos ↔ A': "Deus não é de mortos mas de vivos." No centro: "os filhos do século vindouro são como anjos" — categorias distintas de existência. O pivô teológico é que a ressurreição não é continuação da vida presente mas transformação para uma nova forma de existência. Na vida da igreja: projeções superficiais sobre o que é a vida eterna empobreceram a esperança cristã. A ressurreição é real, corporal e radicalmente diferente — e o Deus de Abraão ainda o sustenta vivo.`;
  // [115]
  if (d.livroAbrev === 'Lc' && /pergunta.*filho.*davi/i.test(p))
    return `A simetria do Filho de Davi espelha A: "Como dizem que o Cristo é filho de Davi?" ↔ A': a questão aponta para a identidade divina do Cristo. No centro: Davi o chama Senhor nos Salmos — impossível se Cristo fosse apenas descendente humano. O pivô teológico é a tensão irresolúvel humanamente — filho de Davi e Senhor de Davi ao mesmo tempo. Na vida da igreja: a cristologia de Jesus desafia qualquer redução — ele não é apenas messias político (filho de Davi) nem apenas ser divino sem humanidade (Senhor). A fé cristã afirma os dois, sem resolver a tensão pela eliminação de um polo.`;
  // [116]
  if (d.livroAbrev === 'Lc' && /jesus.*denuncia.*escribas/i.test(p))
    return `A simetria da denúncia espelha A: Jesus fala ao povo sobre os escribas ↔ A': "receberão condenação mais severa." No centro: primeiros lugares nas sinagogas e banquetes — a visibilidade religiosa como fim em si mesma. O pivô teológico é que o ostento espiritual combinado com a exploração das viúvas não é apenas hipocrisia — é dupla culpa. Na vida da igreja: qualquer liderança que usa a plataforma religiosa para acumular honra social enquanto devora os vulneráveis está repetindo exatamente o padrão denunciado por Jesus.`;
  // [117]
  if (d.livroAbrev === 'Lc' && /viuva.*oferta/i.test(p))
    return `A simetria da oferta da viúva espelha A: ricos lançam das sobras ↔ A': ela lançou tudo o que tinha para viver. No centro: "esta viúva pobre lançou mais do que todos." O pivô teológico é a medida divina — não o valor absoluto mas a proporção do sacrifício. Na vida da igreja: a oferta que Deus nota não é a que impressiona o observador humano mas a que emana da dependência total. A generosidade máxima não é dar muito enquanto sobra muito — é dar de onde falta, confiando no Provedor.`;
  // [118]
  if (d.livroAbrev === 'Lc' && /destruicao.*templo.*predita/i.test(p))
    return `A simetria da predição do templo espelha A: admiração pelas pedras belas ↔ A': "não vos assusteis — essas coisas devem acontecer primeiro." No centro: "Mestre, quando será isso?" — a pergunta sobre o tempo. O pivô teológico é que a beleza religiosa visível não garante permanência — o templo mais glorioso do mundo foi destruído. Na vida da igreja: a comunidade que investe mais na beleza dos seus edifícios do que na fidelidade à missão pode estar admirando o que Jesus já predisse que cairá.`;
  // [119]
  if (d.livroAbrev === 'Lc' && /end do mundo/i.test(p))
    return `A simetria do fim do mundo espelha A: terremotos, pestes, prodígios ↔ A': "pela vossa perseverança salvareis as vossas almas." No centro: "não premediteis como responder — eu vos darei boca e sabedoria." O pivô teológico é que a perseguição é oportunidade de testemunho, não apenas ameaça à sobrevivência. Na vida da igreja: o sofrimento pelo nome de Cristo não é sinal de abandono divino mas de fidelidade ao caminho do Mestre. A boca que Jesus promete encher é a que primeiro foi esvaziada do próprio ego.`;
  // [120]
  if (d.livroAbrev === 'Lc' && /destruicao.*jerusalem.*predita/i.test(p))
    return `A simetria da destruição de Jerusalém espelha A: "rodeada de exércitos — seu assalamento está próximo" ↔ A': "até que os tempos dos gentios se cumpram." No centro: "dias de vingança para que se cumpra tudo o que está escrito." O pivô teológico é o cumprimento profético histórico — a queda de Jerusalém em 70 d.C. é verificação concreta da precisão das profecias de Jesus. Na vida da igreja: a palavra de Jesus cumpre-se na história com exatidão suficiente para exigir confiança também nas promessas ainda não cumpridas.`;
  // [121]
  if (d.livroAbrev === 'Lc' && /vinda.*filho.*homem/i.test(p))
    return `A simetria da vinda do Filho do Homem espelha A: sinais cósmicos, angústia das nações ↔ A': "a vossa redenção está próxima." No centro: "verão o Filho do Homem vindo numa nuvem com poder e muita glória." O pivô teológico é a inversão de expectativa — o que causa terror ao mundo é sinal de redenção para o povo de Deus. Na vida da igreja: a escatologia cristã não é apocalipticismo ansioso mas esperança certa. Levantai as cabeças — a postura corporal da esperança é diferente da do medo.`;
  // [122]
  if (d.livroAbrev === 'Lc' && /parabola.*figueira(?!.*esteril)/i.test(p))
    return `A simetria da figueira espelha A: "quando as árvores brotam, o verão está próximo" ↔ A': "as minhas palavras jamais passarão." No centro: "não passará esta geração sem que tudo aconteça." O pivô teológico é a perenidade da Palavra — o céu e a terra passarão, mas as palavras de Jesus são o único ponto fixo no universo variável. Na vida da igreja: a hermenêutica correta da escatologia não é a especulação sobre datas mas a confiança na permanência da Palavra. Interpretar os sinais do tempo é legítimo; substituir a fidelidade diária pela especulação cronológica é desvio.`;
  // [123]
  if (d.livroAbrev === 'Lc' && /exortacao.*vigilancia/i.test(p))
    return `A simetria da vigilância espelha A: "não sobrecarregueis os corações com excessos" ↔ A': todo o povo madrugava para ouvi-lo. No centro: "Vigiai pois, orando em todo o tempo, para poderdes escapar." O pivô teológico é que a vigilância escatológica não é tensão nervosa mas oração constante. Na vida da igreja: o antídoto para o entorpecimento espiritual — dissipação, embriaguez, cuidados da vida — é a vida de oração. Quem ora está acordado; quem abandonou a oração já adormeceu sem perceber.`;
  // [124]
  if (d.livroAbrev === 'Lc' && /complô.*matar.*jesus/i.test(p))
    return `A simetria do complô espelha A: sacerdotes temiam o povo ↔ A': Judas procurava ocasião sem tumulto. No centro: Satanás entrou em Judas — o complô humano tem uma dimensão espiritual mais profunda. O pivô teológico é que a traição de Judas não foi apenas política mas o cumprimento de um papel espiritual na ofensiva das trevas contra o Filho de Deus. Na vida da igreja: decisões motivadas por dinheiro e conveniência podem estar servindo a interesses que superam o puramente humano. O diagnóstico de Judas é advertência para toda liderança.`;
  // [125]
  if (d.livroAbrev === 'Lc' && /preparacao.*pascoa/i.test(p))
    return `A simetria da preparação espelha A: Jesus envia Pedro e João ↔ A': acharam como Jesus havia dito. No centro: "O Mestre te pergunta: Onde está o aposento?" O pivô teológico é a soberania providencial — Jesus já tinha providenciado o espaço antes de ser buscado. Na vida da igreja: o detalhe logístico do cenáculo ensina que a providência de Deus opera nos pormenores antes de operarmos nós mesmos. Quando Jesus envia, o que ele prometeu já está preparado — cabe a nós ir e confirmar.`;
  // [126]
  if (d.livroAbrev === 'Lc' && /institution.*senhor.*ceia/i.test(p))
    return `A simetria da Ceia do Senhor espelha A: ardente desejo de Jesus de celebrar a Páscoa ↔ A': discussão sobre quem era o traidor. No centro: "Isto é o meu corpo... Este cálice é a nova aliança no meu sangue." O pivô teológico é o memorial como participação — a Ceia não é apenas lembrança mas comunhão real com o Cristo que morre e ressuscita. Na vida da igreja: a mesa do Senhor é o centro da vida comunitária — onde a morte de Cristo é proclamada e a sua vinda futura é antecipada. Celebrar a Ceia é afirmar que a aliança nova é real e operante.`;
  // [127]
  if (d.livroAbrev === 'Lc' && /dispute.*grandeza/i.test(p))
    return `A simetria da disputa sobre grandeza espelha A: contenda sobre quem seria o maior ↔ A': "comereis e bebereis à minha mesa e julgareis as doze tribos." No centro: "entre vós não será assim — o maior seja como o menor, o que governa como o que serve." O pivô teológico é que Jesus promete honra futura e exige serviço presente — a grandeza no reino tem sequência invertida. Na vida da igreja: a última ceia produziu tanto a instituição da Eucaristia quanto a mais intensa discussão sobre hierarquia — lembrando que o ambiente mais sagrado não imuniza o coração da tentação de poder.`;
  // [128]
  if (d.livroAbrev === 'Lc' && /jesus.*prediz.*negacao.*pedro/i.test(p))
    return `A simetria da predição da negação espelha A: "Satanás pediu para peneirar como trigo" ↔ A': "o galo cantará antes que me negues três vezes." No centro: "quando te converteres, confirma teus irmãos." O pivô teológico é a intercessão de Jesus pela fé de Pedro — não para que não falhe, mas para que a fé não desfaleça completamente. Na vida da igreja: a queda de Pedro é prevista, sua restauração é planejada, e sua missão pós-queda é confirmada antes da queda. A graça de Cristo opera além de nossas falhas.`;
  // [129]
  if (d.livroAbrev === 'Lc' && /bolsa.*espada/i.test(p))
    return `A simetria da bolsa e da espada espelha A: "antes ides sem bolsa, faltou-vos algo?" ↔ A': saem para o Monte das Oliveiras. No centro: "é necessário que se cumpra em mim este escrito: foi contado entre os malfeitores." O pivô teológico é a nova fase da missão — o tempo de provisão miraculosa passou; agora vem o tempo do cumprimento profético da paixão. Na vida da igreja: há fases diferentes na missão que exigem posturas diferentes. Discernir o tempo — que tipo de recurso e disposição a missão presente requer — é sabedoria que o Espírito fornece.`;
  // [130]
  if (d.livroAbrev === 'Lc' && /jesus.*ora.*monte.*oliveiras/i.test(p))
    return `A simetria da oração no Monte espelha A: "orai para não cairdes em tentação" ↔ A': "levantai-vos e orai para não cairdes em tentação." No centro: um anjo aparece para fortalecê-lo — o céu responde à oração de Jesus. O pivô teológico é a oração como preparação para o sofrimento — Jesus ora e é fortalecido; os discípulos dormem e falham. Na vida da igreja: a falta de oração antes da crise é o que explica a queda na crise. Não é falta de coragem mas falta de preparação espiritual que faz Pedro negar e os outros fugir.`;
  // [131]
  if (d.livroAbrev === 'Lc' && /traicao.*prisao.*jesus/i.test(p))
    return `A simetria da traição espelha A: Judas vai à frente para beijar Jesus ↔ A': "esta é a vossa hora e o poder das trevas." No centro: Jesus restaura a orelha do servo cortada — cura no momento da prisão. O pivô teológico é que Jesus, mesmo sendo preso, exerce misericórdia — o poder das trevas não pode apagar o gesto de amor. Na vida da igreja: nas horas mais sombrias da própria vida ou da comunidade, o gesto de misericórdia no meio da crise é o testemunho mais eloquente da presença de Cristo.`;
  // [132]
  if (d.livroAbrev === 'Lc' && /pedro.*nega.*jesus/i.test(p))
    return `A simetria da negação de Pedro espelha A: Pedro segue de longe ↔ A': Pedro saiu e chorou amargamente. No centro: "O Senhor voltou-se e olhou para Pedro" — o olhar de Jesus que atravessa a negação. O pivô teológico é o olhar de Cristo como pivô do arrependimento — não acusação, mas reconhecimento. Na vida da igreja: o arrependimento genuíno começa quando a presença de Cristo cruza o nosso olhar mesmo no meio da nossa pior falha. O choro de Pedro não é desespero mas o início da restauração.`;
  // [133]
  if (d.livroAbrev === 'Lc' && /jesus.*perante.*concilio/i.test(p))
    return `A simetria do concílio espelha A: conselho se reúne ao amanhecer ↔ A': "nós mesmos o ouvimos da sua boca." No centro: "desde agora o Filho do Homem estará assentado à direita do poder de Deus." O pivô teológico é que no momento de maior vulnerabilidade humana Jesus faz sua mais alta afirmação de identidade — não defensiva, mas autorrevlatória. Na vida da igreja: a confissão de Cristo diante de autoridades hostis não se redige com cuidado político mas brota da identidade que o Espírito confirma no interior.`;
  // [134]
  if (d.livroAbrev === 'Lc' && /jesus.*antes.*de.*pilatos/i.test(p))
    return `A simetria de Jesus perante Pilatos espelha A: três acusações políticas ↔ A': "Não acho delito algum neste homem." No centro: "Tu o dizes" — resposta que confirma e relativiza ao mesmo tempo. O pivô teológico é a primeira declaração de inocência de Pilatos — a autoridade romana testemunha a justiça de Jesus antes de condená-lo por pressão. Na vida da igreja: o julgamento de Jesus revela que o poder humano pode saber a verdade e ainda assim agir contra ela. A condenação do inocente está no coração do evangelho — e expõe os sistemas de poder que sacrificam os justos.`;
  // [135]
  if (d.livroAbrev === 'Lc' && /jesus.*perante.*herodes/i.test(p))
    return `A simetria de Jesus perante Herodes espelha A: Pilatos envia Jesus a Herodes ↔ A': Herodes e Pilatos tornam-se amigos. No centro: Jesus não responde a Herodes — silêncio total diante do curioso e do frivolo. O pivô teológico é o silêncio de Cristo diante de quem busca espetáculo, não verdade. Na vida da igreja: a palavra de Cristo não está disponível para quem a quer como entretenimento ou validação. O silêncio de Jesus perante Herodes é o mais alto sermão sobre a seriedade da busca pela verdade.`;
  // [136]
  if (d.livroAbrev === 'Lc' && /jesus.*sentenciado.*morte/i.test(p))
    return `A simetria da sentença espelha A: Pilatos declara inocência pela terceira vez ↔ A': entrega Jesus e solta Barrabás. No centro: "Crucifica-o! Crucifica-o!" — a escolha da multidão. O pivô teológico é a substituição — o culpado (Barrabás) é solto, o inocente (Jesus) é condenado — que prefigura o sentido da expiação. Na vida da igreja: o Barrabás em cada um de nós é solto exatamente porque o Inocente tomou o nosso lugar. A substituição não é doutrina abstrata — é a estrutura do julgamento de Jesus.`;
  // [137]
  if (d.livroAbrev === 'Lc' && /jesus.*guiado.*para.*longe/i.test(p))
    return `A simetria de Jesus guiado espelha A: Simão de Cirene carrega a cruz ↔ A': dois malfeitores levados junto. No centro: "Filhas de Jerusalém, não choreis por mim, mas por vós mesmas." O pivô teológico é a reorientação do choro — Jesus no caminho da morte preocupa-se com o julgamento que virá sobre a cidade. Na vida da igreja: a compaixão de Cristo nunca cessa — mesmo carregando a cruz, ele está mais preocupado com os outros do que consigo mesmo. Esse é o modelo de serviço que o evangelismo deve imitar.`;
  // [138]
  if (d.livroAbrev === 'Lc' && /crucificacao/i.test(p))
    return `A simetria da crucificação espelha A: "no lugar chamado Crânio, crucificaram-no" ↔ A': inscrição "Este é o Rei dos Judeus." No centro: "Pai, perdoa-lhes, porque não sabem o que fazem." O pivô teológico é a primeira palavra da cruz em Lucas — perdão no ato do assassínio. Na vida da igreja: o perdão de Jesus na cruz não é posterior à dor — é simultâneo. Isso define o padrão cristão: não o perdão dado quando a dor passou, mas o perdão oferecido no momento mais agudo da ferida.`;
  // [139]
  if (d.livroAbrev === 'Lc' && /jesus.*dois.*criminosos/i.test(p))
    return `A simetria dos dois criminosos espelha A: um blasfemava ↔ A': "hoje estarás comigo no paraíso." No centro: "Jesus, lembra-te de mim quando vieres no teu reino." O pivô teológico é a salvação no último momento — sem batismo, sem obras, sem tempo para nada além de um pedido. Na vida da igreja: o ladrão na cruz destrói qualquer teologia que condiciona a salvação a desempenho. Ao mesmo tempo, desafia qualquer presunção — ele reconheceu o Rei onde todos viam um condenado.`;
  // [140]
  if (d.livroAbrev === 'Lc' && /morte.*de.*jesus/i.test(p))
    return `A simetria da morte de Jesus espelha A: trevas sobre toda a terra ↔ A': multidão bate no peito, mulheres assistem de longe. No centro: "Pai, nas tuas mãos entrego o meu espírito." O pivô teológico é a confiança filial no momento final — Jesus morre orando, e a oração é de abandono ao Pai. Na vida da igreja: "nas tuas mãos entrego" é a oração de quem viveu de fé e morre da mesma forma. O centurião que glorifica a Deus ao ver como Jesus morre reconhece que essa morte é diferente de todas as outras.`;
  // [141]
  if (d.livroAbrev === 'Lc' && /sepultamento.*de.*jesus/i.test(p))
    return `A simetria do sepultamento espelha A: José pede o corpo a Pilatos ↔ A': as mulheres descansam no sábado. No centro: era o dia da preparação — o sábado estava chegando. O pivô teológico é o repouso do sábado sobre o sepulcro fechado — um silêncio que parece derrota mas é véspera de ressurreição. Na vida da igreja: há sábados da fé — momentos de silêncio e aparente derrota entre a sexta-feira da cruz e o domingo da ressurreição. Nesses momentos, a fidelidade às práticas de devoção (como as mulheres que descansaram) sustenta a espera.`;
  // [142]
  if (d.livroAbrev === 'Lc' && /ressurreicao.*de.*jesus/i.test(p))
    return `A simetria da ressurreição espelha A: mulheres chegam ao sepulcro vazio ↔ A': Pedro corre, vê e volta admirado. No centro: "Lembrou-se das suas palavras" — a memória das promessas de Jesus é a chave da fé pascal. O pivô teológico é que a ressurreição é entendida pela memória das palavras de Jesus, não apenas pelo sepulcro vazio. Na vida da igreja: o testemunho da ressurreição começa na memória da Palavra. A Escritura que foi plantada no coração floresce no momento em que o impossível se torna realidade.`;
  // [143]
  if (d.livroAbrev === 'Lc' && /caminho.*emaus/i.test(p))
    return `A simetria de Emaús espelha A: caminham tristes, olhos impedidos ↔ A': voltam a Jerusalém com alegria. No centro: Jesus explica todas as Escrituras sobre si mesmo — "não devia o Cristo padecer?" O pivô teológico é a abertura dos olhos no partir do pão — a explicação das Escrituras prepara o coração, mas o reconhecimento se dá na Ceia. Na vida da igreja: a comunidade que reúne Palavra e mesa experimenta o mesmo reconhecimento. Separadas, ambas são incompletas; juntas, revelam o ressurreto.`;
  // [144]
  if (d.livroAbrev === 'Lc' && /jesus.*aparece.*discipulos/i.test(p))
    return `A simetria da aparição espelha A: "Paz seja convosco" ↔ A': "sois testemunhas — aguardai o poder do alto." No centro: Jesus come peixe diante deles — a ressurreição é corporal, verificável, não fantasmagórica. O pivô teológico é a abertura do entendimento para compreender as Escrituras — o ressurreto não apenas mostra o corpo mas explica a Palavra. Na vida da igreja: testemunhar a ressurreição exige duas coisas que Jesus dá: a abertura do entendimento pelas Escrituras e o poder do Espírito Santo. Nenhum testemunho é possível sem os dois.`;
  // [145]
  if (d.livroAbrev === 'Lc' && /ascensao.*jesus/i.test(p))
    return `A simetria da ascensão espelha A: Jesus levanta as mãos e abençoa ↔ A': continuamente no templo, louvando. No centro: foi elevado para o céu enquanto os abençoava — a ascensão como ato sacerdotal. O pivô teológico é que Lucas começa e termina no templo — o sacerdote Zacarias no templo (1.5-22) e os discípulos louvando no templo (24.53). Na vida da igreja: a ascensão não é abandono mas envio — Jesus sobe para interceder e enviar o Espírito. A alegria dos discípulos no templo é a resposta correta: não lamento da ausência, mas louvor pela presença prometida.`;

  // Atos dos Apóstolos
  if (/pentecostes|espirito.*santo.*fogo|linguas.*fogo/i.test(p))
    return `No Pentecostes, o Espírito Santo desce sobre os discípulos como línguas de fogo. Pedro prega e três mil se convertem em um dia. A Igreja começa não como organização, mas como derramamento. Na vida real: a missão da Igreja não é possível sem o poder do Espírito. Ativismo religioso sem o Espírito produz barulho sem transformação.`;
  if (/conversao.*paulo|saulo.*damasco|saulo.*luz/i.test(p))
    return `Saulo, o perseguidor, é derrubado no caminho de Damasco por uma luz e a voz de Jesus: "Por que me persegues?" Saulo fica cego por três dias — e sai do outro lado como Paulo, o apóstolo. Na vida real: Deus pode usar uma ruptura radical para redirecionar uma vida. A conversão genuína é uma virada de 180 graus na direção do coração.`;
  if (/pedro.*cornelio|gentios.*espirito|casa.*cornelio/i.test(p))
    return `Pedro tem uma visão e é enviado à casa de Cornélio — gentio, centurião romano. O Espírito cai sobre eles antes mesmo do batismo. Pedro conclui: "Em verdade reconheço que Deus não faz acepção de pessoas." Na vida real: Deus frequentemente usa visões e encontros para expandir os limites do que achamos que é o alcance da sua graça.`;
  if (/paulo.*missao|viagem.*missionaria|igreja.*antioquia/i.test(p))
    return `A Igreja de Antioquia é enviada pelo Espírito Santo: "Separai-me Barnabé e Saulo para a obra a que os tenho chamado." O primeiro movimento missionário começa com oração, jejum e obediência ao Espírito. Na vida real: a missão não é gerada por planejamento estratégico — ela é enviada pelo Espírito a partir de comunidades que oram e estão disponíveis.`;

  // Romanos
  if (/romanos.*evangelho.*poder|justificacao.*fe|justo.*vivera.*fe/i.test(p))
    return `Paulo declara: "Não me envergonho do evangelho, porque é o poder de Deus para a salvação de todo aquele que crê." A justificação é pela fé, não por obras da lei. Na vida real: a boa nova não é que nos tornamos melhores — é que Deus nos declara justos através de Cristo. A diferença é enorme: um é construção humana, o outro é doação divina.`;
  if (/ofereçam.*corpos.*sacrificio.*vivo|sede.*transformados.*renovacao/i.test(p))
    return `Romanos 12 pede que o crente ofereça o corpo como sacrifício vivo e seja transformado pela renovação da mente. Depois vem a ética concreta: dons, amor, hospitalidade, perseverança. Na vida real: a transformação começa na mente e se expressa no corpo e nas relações. Teologia sem ética é incompleta.`;

  // 1 e 2 Coríntios
  if (/corintios.*cruz.*loucura|palavra.*cruz/i.test(p))
    return `Paulo diz que a mensagem da cruz é loucura para os gregos e escândalo para os judeus — mas para os chamados é poder de Deus. Deus escolheu o fraco para envergonhar o forte. Na vida real: o evangelho subverte a lógica do mérito e do poder. O que parece fraqueza — vulnerabilidade, serviço, sacrifício — é onde o poder de Deus opera mais claramente.`;
  if (/ressurreiçao.*corintios|se.*cristo.*nao.*ressuscitou/i.test(p))
    return `"Se Cristo não ressuscitou, a nossa pregação é vã e a vossa fé é vã." Paulo não suaviza: sem ressurreição não há fé. Mas Cristo ressuscitou — e é as primícias dos que dormem. Na vida real: a ressurreição não é opcional no evangelho. Ela é o fundamento histórico que sustenta a esperança escatológica e a vida ética presente.`;

  // Gálatas
  if (/galatas.*evangelho|obras.*lei.*galatas|liberdade.*galatas/i.test(p))
    return `Paulo escreve aos Gálatas com urgência: "Há outros que vos perturbam e querem perverter o evangelho de Cristo." A adição de obras da Lei à fé em Cristo não melhora o evangelho — o destrói. Na vida real: a tendência de adicionar condições humanas à graça de Deus é permanente. A cada geração, o evangelho precisa ser defendido em sua pureza.`;

  // Efésios
  if (/efesios.*bencaos.*espirituais|sentados.*lugares.*celestiais|planejou.*fundacao/i.test(p))
    return `Efésios 1 canta uma doxologia de bênçãos espirituais: eleição antes da fundação do mundo, adoção, redenção, revelação, herança, Espírito como penhor. Tudo "em Cristo". Na vida real: a identidade cristã não é construída — é recebida. Antes de qualquer chamado, qualquer missão, qualquer esforço, há uma identidade dada: filhos amados, eleitos, redimidos.`;
  if (/armadura.*deus|espiritais.*trevas.*efesios/i.test(p))
    return `Efésios 6 descreve a armadura de Deus: verdade, justiça, paz, fé, salvação, Palavra, oração. A batalha é espiritual, não carnal. Na vida real: as lutas mais decisivas da vida cristã não são físicas ou políticas — são espirituais. A maior vulnerabilidade não é falta de recursos, mas descuido com a armadura que Deus já forneceu.`;

  // Filipenses
  if (/filipenses.*alegria|regozijai.*sempre.*felipe/i.test(p))
    return `Filipenses é escrita da prisão com a palavra "alegria" repetida ao longo de todo o livro. "Regozijai-vos sempre no Senhor; outra vez digo: regozijai-vos." Na vida real: alegria cristã não é sentimento circunstancial — é ancoragem no Senhor que não muda. Por isso pode coexistir com prisão, dificuldade e incerteza.`;
  if (/mente.*de.*cristo.*humilhou|esvaziou.*forma.*servo/i.test(p))
    return `Filipenses 2 apresenta o hino da kenosis: Cristo, sendo igual a Deus, se esvaziou e tomou forma de servo, humilhou-se até a morte de cruz. Por isso Deus o exaltou. Na vida real: o caminho para a honra no reino de Deus passa pela humilhação voluntária — não como estratégia de ascensão, mas como imitação do Cristo que se inclinou.`;

  // Colossenses / 1-2 Tessalonicenses
  if (/colossenses.*preeminencia|primogenito.*toda.*criacao/i.test(p))
    return `Colossenses 1 apresenta Jesus como supremo sobre toda a criação: "Nele foram criadas todas as coisas... e nele tudo subsiste." E o mesmo Cristo é cabeça da Igreja. Na vida real: qualquer diminuição de Cristo — seja na teologia, na prática ou no coração — leva a distorções em tudo. A centralidade de Cristo não é apenas doutrina — é arquitetura da vida.`;
  if (/tessalonicenses.*retorno.*cristo|arrebatamento|vinda.*senhor/i.test(p))
    return `Paulo escreve sobre a vinda do Senhor para consolar os que perderam entes queridos: "Assim estaremos para sempre com o Senhor." A escatologia não é especulação abstrata — é consolo concreto para quem sofre perda. Na vida real: a esperança da vinda de Cristo não nos tira do presente — nos ancora nele, sabendo que tem destino certo.`;

  // Epístolas Pastorais e Gerais
  if (/timoteo.*pregacao|predique.*conveniente|timoteo.*fe/i.test(p))
    return `Paulo instrui Timóteo: "Pregue a Palavra, insista, quer seja oportuno quer não." E: "Não descuides do dom que há em ti." Na vida real: o ministério fiel não depende de circunstância favorável — exige consistência mesmo quando o ambiente é adverso. O dom dado por Deus precisa ser exercitado, não guardado.`;
  if (/hebreus.*superior|sacerdocio.*melquisedec|hebreus.*fe/i.test(p))
    return `Hebreus demonstra a superioridade de Cristo sobre anjos, Moisés, o sacerdócio aarônico e os sacrifícios do templo. Jesus é o sumo sacerdote perfeito que entrou de uma vez por todas no verdadeiro Santo dos Santos com seu próprio sangue. Na vida real: nenhuma prática religiosa, nenhuma mediação humana adiciona algo ao que Cristo já fez. O acesso ao Pai é direto, pleno e permanente.`;
  if (/tiago.*fe.*obras|fe.*sem.*obras.*morta/i.test(p))
    return `Tiago pergunta: "De que adianta, irmãos meus, dizer alguém que tem fé, se não tiver obras?" Fé que não se traduz em ação é fé morta. Na vida real: Tiago não contradiz Paulo — completa. A fé que salva é a que age. A fé que não transforma a conduta é declaração vazia, não adesão viva a Cristo.`;
  if (/1pedro.*sofrimento|pedra.*eleita.*sacerdocio.*real/i.test(p))
    return `Pedro escreve a perseguidos: "Vós sois geração eleita, sacerdócio real, nação santa." E: "Rejubilai-vos, ainda que por breve tempo tendes de sofrer várias provações." Na vida real: identidade sólida sustenta o sofrimento. Quem sabe quem é em Cristo não define sua vida pela dor passageira, mas pela herança permanente.`;
  if (/apocalipse.*visao|revelacao.*joao|sete.*igrejas/i.test(p))
    return `Apocalipse é revelação de Jesus Cristo — não um manual de previsão política. João vê o Cordeiro de pé, como imolado, recebendo o rolo selado. A história tem um Senhor. Na vida real: nos momentos de maior opressão, Apocalipse declara: o Cordeiro imolado reina. A violência visível não tem a última palavra — o trono de Deus, sim.`;
  if (/beato.*quem.*guarda|vinde.*senhor.*jesus|apocalipse.*final/i.test(p))
    return `Apocalipse termina com o convite: "Vem, Senhor Jesus!" e a promessa: "Eis que venho em breve." A Bíblia inteira é uma história que caminha para um encontro. Na vida real: a esperança cristã não é vaga — é pessoal. Jesus vem, e a resposta da fé é manter a chama acesa enquanto aguarda.`;

  return `Em ${ref}, o texto narra "${d.pericope}". Preste atenção em quem age, o que Deus diz ou faz e qual é o ponto de virada da passagem. O que mais importa costuma estar no núcleo da estrutura — e tem algo concreto a dizer sobre como viver hoje.`;
}

function gerarOracao(d: DiaDevocional): string {
  const p = d.pericope.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  // ── GÊNESIS ──────────────────────────────────────────────────────────────
  // [1]
  if (/seis dias de criacao/i.test(p))
    return `Senhor, tu estruturaste a criação para convergir ao descanso contigo. Que o culto seja o centro ao redor do qual toda a minha semana faça sentido — não uma pausa, mas o eixo que sustenta tudo. Amém.`;
  // [2]
  if (/jardim no eden/i.test(p))
    return `Pai, tu me colocaste para cultivar e guardar o que confiaste à minha vida — comunidade, chamado, missão. Guarda-me dentro dos limites que estabeleceste, e que eu seja guardião fiel do que plantaste em mim. Amém.`;
  // [3]
  if (/criacao de mulher/i.test(p))
    return `Senhor, tu ages no silêncio quando eu nada posso fazer. Ensinai-me a receber as tuas dádivas com as mãos abertas, sem tentar fabricar o que só tu podes dar. Amém.`;
  // [4]
  if (/primeiro pecado/i.test(p))
    return `Pai, tu rompes o silêncio e me convocas do escondimento. Onde eu me afastei e me escondi, respondo aqui: estou aqui, Senhor. Faz em mim o que o pecado desfez. Amém.`;
  // [5]
  if (/caim assassina abel/i.test(p))
    return `Senhor, antes de cada grande queda tu falas. Abre meus ouvidos para ouvir as advertências antes que a ira se instale. Que a nossa comunidade seja lugar onde a tua voz é ouvida a tempo. Amém.`;
  // [6]
  if (/adao descendentes/i.test(p))
    return `Deus eterno, no meio de uma linhagem de nascimentos e mortes, Enoque andou contigo e não foi mais achado. Faz de mim essa exceção — uma vida que não se encaixa no ciclo comum porque anda contigo. Amém.`;
  // [7]
  if (/grande diluvio/i.test(p))
    return `Deus que te lembras, mesmo quando as águas cobrem tudo, tu te lembras de quem está dentro da arca. Nos momentos em que tudo parece submerso, ainda confio: tu te lembras de mim. Amém.`;
  // [8]
  if (/alianca com noe/i.test(p))
    return `Senhor de toda vida, tu firmaste aliança com Noé e colocaste no centro a sacralidade de cada vida humana. Que a nossa comunidade honre a vida em todas as suas formas — do nascimento à velhice, do próximo ao estranho. Amém.`;
  // [9]
  if (/noe e seu filhos/i.test(p))
    return `Pai misericordioso, ensina-me o caminho de Sem e Jafé — cobrir a fraqueza do irmão com dignidade, sem expor e sem minimizar. Guarda minha boca e meu coração da fofoca que destrói. Amém.`;
  // [10]
  if (/nacoes desceu/i.test(p))
    return `Criador de todas as nações, tu organizaste a diversidade humana com propósito. Que a nossa missão honre as culturas, redimindo o que cada povo edificou para que sirva ao teu nome. Amém.`;
  // [11]
  if (/torre de babel/i.test(p))
    return `Senhor Deus, guarda-me de todo projeto que começa com "façamos um nome para nós." Que a nossa missão parta da tua iniciativa, não da nossa escada. Que eu construa para o teu nome, nunca para o meu. Amém.`;
  // [12]
  if (/descendentes de sem/i.test(p))
    return `Deus que ages por reduções deliberadas, tu chegaste a uma família para alcançar todas as famílias. Usa a minha obediência individual para reorientar a história ao meu redor — mesmo que eu não veja o alcance. Amém.`;
  // [13]
  if (/descendentes de tera/i.test(p))
    return `Senhor, há missões que a geração anterior começou mas não concluiu. Dá-me coragem de continuar o que outros deixaram inacabado, e humildade de recomeçar do ponto onde pararam. Amém.`;
  // [14]
  if (/chamado de abrao/i.test(p))
    return `Senhor, como Abrão chegou à terra e ergueu um altar sem ainda possuí-la, ensina-me a adorar diante da promessa antes de receber o cumprimento. Faz de mim alguém que ergue altares na terra que ainda não é sua. Amém.`;
  // [15]
  if (/abrao e sarai/i.test(p))
    return `Pai fiel, tu cumpres o que prometeste mesmo quando o instrumento falha. Perdoa os momentos em que atuei por medo em vez de confiar no teu plano. Que eu aprenda a te confiar o que só tu podes guardar. Amém.`;
  // [16]
  if (/lo se separam/i.test(p))
    return `Senhor, guarda-me de escolher com os olhos aquilo que parece mais próspero. Ensinai-me a ceder o direito de escolha ao outro, confiando que tu provês para quem te confia o futuro. Amém.`;
  // [17]
  if (/de lo cativeiro/i.test(p))
    return `Deus sábio, ensina-me sabedoria sobre onde me instalo — não isolamento do mundo, mas discernimento de não morar junto ao que tu julgarás. Que eu trave as guerras que devo travar, não as que escolhi por vizinhança errada. Amém.`;
  // [18]
  if (/melquisedeque/i.test(p))
    return `Deus Altíssimo, que eu passe pelo altar antes de passar pelo mercado. Que a generosidade seja resposta à bênção já recebida, não resultado do acúmulo conquistado. Que eu devolva a décima parte antes de negociar o restante. Amém.`;
  // [19]
  if (/alianca com abrao/i.test(p))
    return `Senhor que justificas o ímpio que crê, que a minha confiança em Ti seja hoje o que Romanos 4 declara: fé que recebe crédito de graça. Não o que realizei, mas o que abraço pela fé. Em nome de Jesus, amém.`;
  // [20]
  if (/nascimento de ismael/i.test(p))
    return `Deus que vês, tu foste ao deserto atrás de Hagar antes de se revelar de novo a Abrão. Que a nossa comunidade veja quem o sistema descartou. Que nenhum membro marginalizado seja invisível entre nós. Amém.`;
  // [21]
  if (/sinal da alianca/i.test(p))
    return `Senhor, tu dás sinais antes do cumprimento — marcas o corpo de quem ainda não tem o filho prometido. Que eu carregue os teus sacramentos com fé, não como certificado do que conquistei, mas como promessa do que ainda virá. Amém.`;
  // [22]
  if (/filho prometido a abraao/i.test(p))
    return `Pai, tu perguntas por mim pelo nome. Não é suficiente estar próximo de quem crê — a tua promessa precisa ser ouvida por mim pessoalmente. Que eu saia da tenda onde me escondi e ouça a tua voz diretamente. Amém.`;
  // [23]
  if (/julgamento pronunciado/i.test(p))
    return `Senhor, faz de mim um intercessor que participa da tua mente sobre quem está em perigo. Que eu ore pelos que estão do lado de fora com a audácia de Abraão — não para convencer a tua misericórdia, mas para exercê-la junto contigo. Amém.`;
  // [24]
  if (/depravacao de sodoma/i.test(p))
    return `Deus do estrangeiro e do diferente, que a nossa comunidade seja lugar de hospitalidade genuína. Guarda-nos do espírito de controle e exclusão que apaga a tua imagem entre nós. Que sempre haja lugar à mesa para quem chega. Amém.`;
  // [25]
  if (/sodoma e gomorra/i.test(p))
    return `Senhor, guarda-me do apego ao que tu mandaste largar. Que eu não saia de Sodoma fisicamente e permaneça lá com o coração. Dá-me coragem de partir completamente quando tu disseres partir. Amém.`;
  // [26]
  if (/moabe e amom/i.test(p))
    return `Pai, guarda-me de agir como se fosse a última oportunidade quando tu ainda és o Deus que provê. Onde o medo do futuro me leva a forçar soluções que criam novos problemas, que a fé restaure a capacidade de esperar por ti. Amém.`;
  // [27]
  if (/abraao e sara em gerar/i.test(p))
    return `Senhor, mesmo depois de crescer na fé, reconheço que volto a padrões antigos de medo. Perdoa-me. Quando eu repetir o erro antigo, intervém antes que o dano seja feito — como fizeste com Abimeleque. Amém.`;
  // [28]
  if (/nascimento de isaque/i.test(p))
    return `Deus que ri por último, transforma o motivo da minha dúvida no título do meu testemunho. O que eu ri com descrença, faz que eu celebre com alegria quando vieres cumprir. Amém.`;
  // [29]
  if (/ismael enviado/i.test(p))
    return `Deus que ouves o choro do fraco, que os nossos ouvidos sejam afinados com os teus. Que a nossa comunidade ouça quem ninguém mais está ouvindo — a criança, o marginalizado, o esquecido que clama no deserto. Amém.`;
  // [30]
  if (/alianca de abrao e abimeleque/i.test(p))
    return `Senhor, que os conflitos resolvidos com honestidade se tornem altares na minha história. Onde houve disputa de poço, que haja invocação do teu nome. Faz dos meus acordos difíceis memoriais da tua fidelidade. Amém.`;
  // [31]
  if (/sacrificio isaque/i.test(p))
    return `Deus que provês, quando eu subir ao monte da obediência que não entendo, que eu ouça a tua voz antes de executar o que parece ser pedido. E quando a mão for detida, que eu veja o cordeiro que tu já preparaste. Em nome de Jesus, o Cordeiro definitivo. Amém.`;
  // [32]
  if (/criancas de naor/i.test(p))
    return `Senhor, o que parece lista burocrática às vezes carrega o nome da próxima resposta que tenho esperado. Que eu leia a tua Palavra com olhos atentos até o último nome — porque tu estás preparando a próxima geração enquanto eu ainda espero. Amém.`;
  // [33]
  if (/sara morte e sepultamento/i.test(p))
    return `Pai, há momentos em que aceitar o favor fácil comprometeria a herança que confiaste à minha vida. Dá-me discernimento para pagar o preço justo quando for necessário, e humildade para não confundir conveniência com bênção. Amém.`;
  // [34]
  if (/casamento de isaque e rebeca/i.test(p))
    return `Senhor, que toda missão que eu receba comece como o servo junto ao poço: parado, orando, declarando dependência total antes do primeiro passo. Que o sucesso das missões que realizo seja fruto da oração, não apenas da estratégia. Amém.`;
  // [35]
  if (/quetura/i.test(p))
    return `Deus eterno, assim como Abraão transmitiu tudo a Isaque com clareza, que eu também organize e transmita o que tu confiaste à minha vida com fidelidade. Que a próxima geração receba herança clara, não confusão. Amém.`;
  // [36]
  if (/morte de abraao/i.test(p))
    return `Pai, tu às vezes produces reconciliações que só o luto consegue gerar. Onde há separações que a vida não curou, usa os teus momentos de graça para reunir o que foi dividido. Que eu seja instrumento de paz nesses momentos. Amém.`;
  // [37]
  if (/de ismael descendentes/i.test(p))
    return `Senhor que lembras de todos, ninguém é irrelevante para ti — nem as linhagens secundárias. Que a nossa comunidade não trate como "lateral" quem tu consideras digno de memória. Que eu veja com teus olhos quem está às margens. Amém.`;
  // [38]
  if (/nascimento e juventude/i.test(p))
    return `Deus que declaras antes, tu conheces o propósito de uma vida antes do nascimento. Que eu confie que a tua palavra sobre mim não depende da ordem de chegada nem das circunstâncias de origem. O que declaraste, acontecerá. Amém.`;
  // [39]
  if (/esau vende/i.test(p))
    return `Senhor, guarda-me de desprezar a herança espiritual que confiaste à minha vida nos momentos de pressão e fome imediata. Que eu cultive intencionalmente o chamado que recebi e nunca o trate como descartável. Amém.`;
  // [40]
  if (/isaque e abimeleque/i.test(p))
    return `Pai, reconheço os padrões de medo que herdei. Dá-me discernimento para identificar o que foi transmitido de geração em geração e deveria ter sido quebrado antes. Que eu não passe adiante o que Jesus pagou para quebrar. Amém.`;
  // [41]
  if (/trouble com pocos/i.test(p))
    return `Senhor, às vezes permites que o conflito se repita várias vezes antes de aparecer e falar. Dá-me paciência para não abandonar antes do encontro. Que cada disputa "perdida" seja o passo que me aproxima do lugar onde te revelarás. Amém.`;
  // [42]
  if (/alianca com abimeleque/i.test(p))
    return `Deus que abençoas, que a prosperidade da nossa comunidade não seja troféu de autossuficiência, mas testemunho que convida outros a buscar paz com o Deus que abençoa. Que quem discordava de nós ontem veja a tua presença e venha em paz. Amém.`;
  // [43]
  if (/heteu esposas/i.test(p))
    return `Pai, que eu tenha ouvidos para ouvir as duas linhas que o texto registra sobre o dano de uma escolha errada. Que o conciso da tua Palavra seja suficiente para quem está disposto a ouvir. Guarda-me de escolhas que causam amargura aos que amo. Amém.`;
  // [44]
  if (/jaco rouba/i.test(p))
    return `Senhor soberano, a tua vontade avança mesmo quando o instrumento é imperfeito. Isso não me dá licença para o engano — mas me consola que o teu propósito é maior do que a minha falha. Perdoa o que precisa ser perdoado; cumpre o que prometeste. Amém.`;
  // [45]
  if (/rebeca recomenda/i.test(p))
    return `Deus sábio, faz-me alguém que pensa nas consequências para todos os lados. Que eu ame a comunidade com sabedoria suficiente para proteger tanto quem vai quanto quem fica. Amém.`;
  // [46]
  if (/jaco escapa de esau/i.test(p))
    return `Pai, há momentos em que a crise do passado força a clareza do presente. Que as crises da minha vida produzam bênçãos intencionais — não o que foi tomado pelo engano, mas o que é proclamado com propósito. Amém.`;
  // [47]
  if (/jaco sonho em betel/i.test(p))
    return `Senhor que apareces ao fugitivo, tu não esperas que eu esteja em paz para se revelar. Encontra-me exatamente onde estou — cansado, com medo, dormindo com pedra de travesseiro. E transforma esse lugar em altar. Amém.`;
  // [48]
  if (/jaco encontra raquel/i.test(p))
    return `Pai, o acolhimento da família de Deus transforma o fugitivo em alguém que encontrou lar. Que a nossa comunidade seja esse poço onde o exilado encontra pertencimento — e que esse encontro venha com lágrimas de alívio. Amém.`;
  // [49]
  if (/jaco se casa/i.test(p))
    return `Senhor, usa as consequências dos meus próprios erros para formar em mim empatia genuína. Que o sofrimento que sinto pelo engano do outro me ajude a entender o dano que causei quando enganei. Que o arrependimento seja completo. Amém.`;
  // [50]
  if (/criancas de jaco/i.test(p))
    return `Deus que dás filhos e graça, guarda-me de tentar controlar o que é dom teu por meios próprios. A fertilidade espiritual não se compra nem se negocia — se recebe com gratidão. Que eu pare de buscar mandrágoras e abra as mãos. Amém.`;
  // [51]
  if (/jaco prospera/i.test(p))
    return `Senhor, tu és capaz de abençoar mesmo em contextos de competição injusta. Que a minha prosperidade seja fruto de trabalho fiel, não de manipulação do sistema. E quando a injustiça persistir, que eu confie que és o administrador final da minha herança. Amém.`;
  // [52]
  if (/jaco foge com familia/i.test(p))
    return `Pai, em obediência ao teu chamado, ajuda-me a descobrir o que trouxe na bagagem sem permissão. O que é ídolo escondido na viagem da fé — conforto, controle, aprovação — que eu o entregue antes de cruzar a fronteira. Amém.`;
  // [53]
  if (/labao alcanca/i.test(p))
    return `Deus que trabalhas no campo inimigo, às vezes não sei quando estás contendo o que ameaça me destruir. Que eu confie na tua proteção invisível tanto quanto na visível — e te agradeça pelos perigos dos quais nunca soube. Amém.`;
  // [54]
  if (/labao e jaco fazer/i.test(p))
    return `Senhor, nem toda reconciliação que desejo será completa nesta vida. Ensina-me a aceitar o pacto de não-agressão onde a restauração plena não é possível, e a deixar contigo o que só tu podes resolver. Amém.`;
  // [55]
  if (/maanaim/i.test(p))
    return `Pai, ver tua proteção e ainda ter medo não é falta de fé — é honestidade humana. Como Jacó em Maanaim, recebo a visão dos teus anjos e ainda assim trago o medo diante de ti. Aqui está o medo, Senhor. E aqui está a confiança. Amém.`;
  // [56]
  if (/jaco envia presentes/i.test(p))
    return `Senhor, como Jacó que organizou os presentes e orou no meio dos preparativos, que eu planeje o que posso e ore pelo que não posso controlar. Que nunca substitua a oração pela estratégia nem abandone a estratégia pela passividade. Amém.`;
  // [57]
  if (/luta em peniel/i.test(p))
    return `Deus que lutas com quem te busca, marca-me com a tua presença de tal forma que eu carregue a evidência do encontro. Não a vitória sem custo — mas a transformação que deixa rastro. Que eu coxeie sabendo que prevaleci porque dependi de ti. Amém.`;
  // [58]
  if (/esau meet/i.test(p))
    return `Pai da reconciliação, o irmão de quem mais me afastei talvez esteja aguardando mais perto do que o medo me convenceu. Dá-me coragem de ir ao encontro do que adiei. E que o abraço que recebo seja reflexo do teu coração de Pai correndo ao meu encontro. Amém.`;
  // [59]
  if (/violacao de dina/i.test(p))
    return `Deus de justiça, guarda-me de confundir justiça com vingança. A violência que responde à violência multiplica a desonra da vítima. Ensina-me a buscar restauração genuína — que honra quem foi ferido sem criar novas vítimas. Amém.`;
  // [60]
  if (/jaco retorna a betel/i.test(p))
    return `Senhor, não posso subir ao lugar da adoração carregando os ídolos que adquiri no caminho. Antes de subir a Betel, que eu enterre debaixo do carvalho tudo que não pode ir junto. Que a renovação espiritual comece com limpeza real. Amém.`;
  // [61]
  if (d.livroAbrev === 'Gn' && /alianca renovado/i.test(p))
    return `Deus que confirmas em público o que deste em particular, que eu receba as tuas afirmações externas como confirmação fiel do que já foi dado no segredo. Que eu não minimize o que tu declaras duas vezes. Amém.`;
  // [62]
  if (/mortes e nascimento/i.test(p))
    return `Pai, tu não pausas a história nos momentos de maior perda. Obrigado porque enquanto enterramos, outros nascem. A continuidade da tua promessa não espera que o luto termine. Que eu confie na tua fidelidade mesmo nos dias de dupla saudade. Amém.`;
  // [63]
  if (/de esau descendentes/i.test(p))
    return `Criador de todos, as genealogias "secundárias" afirmam que ninguém é irrelevante para ti. Que eu nunca trate como "marginal" quem tu consideras digno de nome. E que a nossa comunidade seja lugar onde ninguém é apenas número. Amém.`;
  // [64]
  if (/jose sonhos de grandeza/i.test(p))
    return `Senhor, o chamado que tu colocas sobre uma vida provoca rejeição antes de produzir fruto. Faz de mim alguém que guarda no coração o que não entende ainda, em vez de descartar o que incomoda. Amém.`;
  // [65]
  if (/jose e vendeu/i.test(p))
    return `Deus que ouves os clamores, guarda-me da indiferença que come pão enquanto o próximo clama. Que eu nunca participe do silêncio ao redor do sofrimento visível. Que a nossa comunidade seja lugar onde o grito é ouvido, não abafado. Amém.`;
  // [66]
  if (/juda e tamar/i.test(p))
    return `Senhor, a tua linhagem passou pela confissão de Judá — "ela é mais justa do que eu." Faz de mim alguém que reconhece a culpa com a mesma clareza. E obrigado porque o teu propósito não é abortado pela falha reconhecida e arrependida. Amém.`;
  // [67]
  if (/potifar esposa/i.test(p))
    return `Deus fiel, o que outros usam contra mim tu usas para revelar tua fidelidade. Guarda-me de definir meu destino pelas acusações alheias. Tu estás comigo tanto na ascensão quanto na prisão. Amém.`;
  // [68]
  if (/jose interpreta sonhos/i.test(p))
    return `Senhor, quando tu deres discernimento para o que outros não conseguem ver, que eu aponte para ti antes de apresentar a resposta. Que o dom que me deste glorifique o Doador, nunca o portador. Amém.`;
  // [69]
  if (/criancas de jose/i.test(p))
    return `Deus que restauras, quando restauras tu não apenas repara o dano — tu faz frutificar na terra da aflição. Que eu carregue os dois nomes: a memória curada e a fertilidade nova. Obrigado porque estavas presente nos dois momentos. Amém.`;
  // [70]
  if (/primeira viagem/i.test(p))
    return `Pai, os momentos de confinamento e espera são às vezes a câmara onde a consciência fala o que silenciou por anos. Usa os meus momentos de espera para me fazer ouvir o que não quero ouvir — antes que o dano se multiplique. Amém.`;
  // [71]
  if (/segunda viagem/i.test(p))
    return `Senhor, arrependimento genuíno não é apenas sentir culpa — é agir diferente quando a mesma situação se repete. Como Judá diante de José, que eu passe nos testes que antes reprovei. Faz de mim alguém que realmente mudou. Amém.`;
  // [72]
  if (/jaco traz.*familia/i.test(p))
    return `Deus que vais junto, tu não apenas envias às terras estranhas — tu acompanhas na descida e prometes a subida. Onde quer que tu me envies, a tua presença é a promessa do retorno. Não temo descer quando tu prometes subir comigo. Amém.`;
  // [73]
  if (/lista de de jaco/i.test(p))
    return `Senhor que contas cada um, a tua fidelidade inclui a memória de cada nome. Que a nossa comunidade conte cada pessoa com cuidado — ninguém é apenas número na tua lista. Obrigado por ter o meu nome na tua memória. Amém.`;
  // [74]
  if (/jaco e farao/i.test(p))
    return `Deus da inversão, aquele que carrega a tua promessa tem algo a oferecer ao mais poderoso da terra — não riqueza, mas bênção. Que eu não subestime o que tu colocaste em mim para oferecer ao mundo. Amém.`;
  // [75]
  if (/fome em egito/i.test(p))
    return `Senhor sábio, dá-me sabedoria para servir bem dentro dos sistemas imperfeitos em que vivo, sem iludir-me de que o sistema é bom. Que a consciência política faça parte da minha sabedoria e que eu nunca confunda eficiência com justiça. Amém.`;
  // [76]
  if (/ultimos dias de jaco/i.test(p))
    return `Pai eterno, envelhecer com fé é aprender a depositar o que não posso mais segurar nas mãos de quem tu posicionaste para continuar. Que eu aprenda esse desprendimento como ato de adoração, e não de derrota. Amém.`;
  // [77]
  if (/jaco abencoa de jose/i.test(p))
    return `Deus que inverte a ordem, as tuas inversões não são erros — são padrão de graça. O menor, o mais novo, o menos provável recebe a maior bênção repetidas vezes. Que eu nunca me apoie na ordem esperada, mas confie na soberania que abençoa quem tu escolhes. Amém.`;
  // [78]
  if (/jaco ultimas palavras/i.test(p))
    return `Senhor Jesus, Siló que vieste — o cetro não se apartou de Judá e finalmente chegaste. A bênção central de Jacó encontrou cumprimento em ti. Que eu viva sob tua autoridade, não como súdito relutante, mas como filho que reconhece o Rei. Amém.`;
  // [79]
  if (/jaco morte e sepultamento/i.test(p))
    return `Pai, Jacó morreu reunindo os pés na cama, após as últimas instruções. Ensina-me a viver de tal forma que a minha morte possa ser assim — reunida, confiante, transmitindo o que precisa ser transmitido. Que eu saiba o que dizer quando o momento chegar. Amém.`;
  // [80]
  if (/jose perdoa/i.test(p))
    return `Deus que transformas o mal em bem, onde sofri injustiça, ajuda-me a ver o teu plano maior. E onde causei dano a outros, que eu receba o mesmo perdão que José ofereceu — sem cobrar conta depois. Amém.`;
  // [81]
  if (/de jose ultimos dias/i.test(p))
    return `Senhor fiel, José morreu com a promessa do Êxodo nos lábios. Que eu também morra com fé maior do que minha própria história — apontando para o que Deus ainda fará, mesmo além da minha morte. Que a minha fé sobreviva à minha vida. Amém.`;

  // ── ÊXODO ────────────────────────────────────────────────────────────────
  // [82]
  if (d.livroAbrev === 'Êx' && /^introducao$/.test(p))
    return `Pai, a tua promessa atravessou o luto de uma geração inteira e chegou ao Êxodo sem interrupção. Que eu confie que o que tu prometeste não vai embora com quem parte — fica nos filhos. A tua fidelidade é maior do que qualquer vida individual. Amém.`;
  // [83]
  if (/construcao de cidades/i.test(p))
    return `Senhor, o crescimento que tu plantas não é impedido pelo sistema que tenta suprimi-lo. Quanto mais oprimiam, mais cresciam — o plano do faraó fracassou por dentro. Que eu não perca a esperança quando a pressão aumenta: pode ser sinal de que estamos perto da libertação. Amém.`;
  // [84]
  if (/matar meninos/i.test(p))
    return `Deus a quem tememos acima de tudo, as parteiras Sifra e Puá ensinaram que temer a ti é o único temor que liberta de todos os outros. Dá-me a coragem de desobedecer ordens que contradizem a tua lei. Que eu tenha nome diante de ti, mesmo que não tenha nome diante do poder. Amém.`;
  // [85]
  if (/juventude de moises/i.test(p))
    return `Senhor, há momentos em que a fé não age, mas observa. Dá-me a vigilância da irmã de Moisés — a atenção que aguarda sem intervir, sabendo que tu estás agindo. Que eu não confunda inatividade com falta de fé quando tu peças que eu apenas veja. Amém.`;
  // [86]
  if (/moises foge a midia/i.test(p))
    return `Pai, quem é chamado por ti quase sempre experimenta a rejeição do próprio círculo primeiro. Como Moisés que fugiu não do Egito mas da desconfiança dos seus, guarda-me do desânimo quando os meus não entendem ainda. A rejeição dos irmãos frequentemente antecede o chamado público. Amém.`;
  // [87]
  if (/casamento de moises/i.test(p))
    return `Deus que transformas uma refeição em providência, que a nossa comunidade receba bem o estrangeiro que age com justiça. Hospitalidade não é detalhe social — é porta de providência. Que eu nunca trate uma refeição compartilhada como coisa pequena. Amém.`;
  // [88]
  if (/misericordia para israel/i.test(p))
    return `Deus que ouves, tu ouviste o gemido de Israel e três verbos mudaram tudo: ouviu, lembrou, conheceu. Quando eu clamo e o silêncio parece resposta, lembro: o gemido sincero já é o começo do êxodo. Tu registras o que sofro antes de qualquer intervenção visível. Amém.`;
  // [89]
  if (/sarca ardente/i.test(p))
    return `Senhor EU SOU, o chamado não vem com sensação de suficiência — vem com missão clara e nome que sustenta. Que eu pare de perguntar "sou capaz?" e comece a perguntar "quem me envia?" Tu estarás comigo — e isso é suficiente. Amém.`;
  // [90]
  if (/moises retorna a egito/i.test(p))
    return `Pai, nenhuma missão é tão urgente que passe por cima dos compromissos do pacto. Guarda-me de usar a urgência da obra como desculpa para negligenciar o que tu estabeleceste como fundamental. O que parece interrupção no caminho pode ser exatamente o que precisa ser feito antes de tudo. Amém.`;
  // [91]
  if (/tijolos sem palha/i.test(p))
    return `Senhor, a obediência ao teu chamado não garante resultado imediato. Às vezes as coisas pioram antes da libertação. Como Moisés que clamou "por que fizeste mal a este povo?", que eu possa ser honesto contigo nas crises sem perder a confiança no teu propósito. Amém.`;
  // [92]
  if (/libertacao assegurado/i.test(p))
    return `Deus fiel, quando o povo não ouve e o líder duvida, tu não reduz as promessas — as dobra. No fundo do desânimo recebo sete: tirarei, livrarei, resgatarei, tomarei, serei, levarei, darei. A tua fidelidade não depende do meu estado de fé. Amém.`;
  // [93]
  if (/genealogia de moises/i.test(p))
    return `Senhor que chamas por nome, tu ages através de pessoas reais com histórias reais. Ninguém é chamado no vácuo. Tu conheces cada nome da família que usas para a tua missão. Que eu não desvalorize a linhagem que me formou — ela faz parte de como tu trabalhas. Amém.`;
  // [94]
  if (/moises e arao obedecer/i.test(p))
    return `Deus que defines a realidade, o confronto com o poder estabelecido é espiritual antes de ser político. Que eu não subestime a dimensão espiritual das batalhas que parecem apenas humanas. Faz de mim mensageiro fiel do teu caráter diante do poder que não te reconhece. Amém.`;
  // [95]
  if (/dez milagres/i.test(p))
    return `Senhor, tu desmontas os ídolos metodicamente — cada praga expõe um deus egípcio como ilusão. Usa os desmoronamentos da minha vida para revelar o que estou confiando no teu lugar. Que o que cai seja o que não deveria estar de pé. Amém.`;
  // [96]
  if (/final praga/i.test(p))
    return `Pai, a distinção que fazes entre Egito e Israel não é favorecimento arbitrário — é fidelidade ao pacto. Obrigado porque a tua proteção vem da relação, não do mérito. Que eu nunca presuma desta proteção — mas nunca duvide dela. Amém.`;
  // [97]
  if (/primeiro pascoa/i.test(p))
    return `Senhor, o sangue no portal não identificava os melhores — identificava os que se colocaram sob o sinal prometido. Cristo é o nosso cordeiro pascal. A proteção vem da cobertura, não do meu desempenho. Que eu viva hoje debaixo desse sangue. Amém.`;
  // [98]
  if (/decimo praga/i.test(p))
    return `Deus que invertes completamente, a libertação que produces supera qualquer expectativa humana. Quem perseguiu pede bênção; quem humilhava se humilha. O poder que tu inverts reconhece, no final, quem tem a autoridade real. Que eu nunca subestime o alcance da tua obra. Amém.`;
  // [99]
  if (/^o exodo$/.test(p))
    return `Senhor fiel, de 70 pessoas que desceram com Jacó saíram centenas de milhares. O que começa pequeno — uma família, uma aliança, uma promessa — é sinal de uma multiplicação que tu sustentas. Os 430 anos de espera não foram abandono; foram incubação. Que eu confie no teu tempo. Amém.`;
  // [100]
  if (/directions para/i.test(p))
    return `Deus que incluis o estrangeiro circuncidado na mesa da Páscoa, tu antecipaste a missão universal desde o Sinai. Que a nossa comunidade seja mesa onde o de fora pode entrar pela aliança. Que nenhuma barreira cultural impeça quem entra pelo coração de participar do banquete. Amém.`;
  // [101]
  if (/consagracao de primogenito/i.test(p) && d.capitulos.includes('13.1-2'))
    return `Senhor Resgatador, toda vida que foi salva da morte pertence a ti. O que recebi de volta — saúde, vocação, segundo fôlego — não é minha propriedade; é mordomia de algo que tu resgataste. Que eu viva como mordomo do que me foi devolvido. Amém.`;
  // [102]
  if (/festa de pao sem fermento/i.test(p))
    return `Pai, a festa sem fermento declara: não voltamos ao que fomos. Que a memória da minha libertação molde o meu presente — não como nostalgia, mas como identidade. Que o fermento antigo — arrogância, amargura, impureza — seja varrido antes de cada celebração. Amém.`;
  // [103]
  if (/consagracao de primogenito/i.test(p) && d.capitulos.includes('13.11'))
    return `Deus das gerações, os rituais que transmitem fé são projetados para provocar perguntas. Que a nossa liturgia seja pedagogia viva para os filhos que ainda vão perguntar "o que é isso?" Que a nossa celebração nunca se torne tão privada que não tenha resposta para a geração seguinte. Amém.`;
  // [104]
  if (/colunas de nuvem/i.test(p))
    return `Senhor das jornadas, há um trecho entre o Egito que deixei e a terra prometida que ainda não cheguei. Nesse espaço intermediário, tu és nuvem de dia e fogo à noite. Que eu não me desespere no meio do caminho — a tua presença cobre cada passo. Amém.`;
  // [105]
  if (/travessia mar vermelho/i.test(p))
    return `Senhor que pelejais por mim, quando há um mar à frente e um inimigo atrás, tu não pedes coragem heroica — pedes quietude e confiança. "Estai quietos e vereis a salvação do SENHOR." Que eu aprenda a parar quando tu disseres parar — e ver o que só tu podes fazer. Amém.`;
  // [106]
  if (/perseguidores afogados/i.test(p))
    return `Deus que travas as batalhas que não entendo, há guerras que tu travas enquanto eu passo. A fé que nasce ao ver inimigos derrotados é real — mas o que me sustenta é conhecer quem venceu, não apenas ver o que caiu. Que eu confie em ti antes de ver os egípcios mortos na praia. Amém.`;
  // [107]
  if (/cantico de moises/i.test(p))
    return `Senhor, que o meu louvor não seja apenas alívio emocional — que seja interpretação teológica da história. Que eu aprenda a colocar palavras no que tu fizestes: não apenas "que bom" mas "tu fizeste assim, por isso, e isso significa aquilo." Ensina-me a louvar com entendimento. Amém.`;
  // [108]
  if (/cantico de miria/i.test(p))
    return `Deus que ouves todas as vozes, que o culto da nossa comunidade inclua vozes diversas — não apenas a do líder. O dom de interpretar os teus atos não é exclusivo de nenhum gênero nem posição. Que Miriã profetisa tenha espaço entre nós. Amém.`;
  // [109]
  if (/agua amarga/i.test(p))
    return `Senhor, o que transforma a amargura não é o fim da dificuldade — é a tua palavra e presença jogadas dentro da situação. Onde há Marah na minha vida, mostra-me a árvore. E que Elim não seja sonho distante — seja o próximo acampamento depois da água transformada. Amém.`;
  // [110]
  if (/pao de ceu/i.test(p))
    return `Pai provedor, o maná ensina dependência cotidiana. Não se acumula, não se herda. Que eu aprenda a confiar para hoje sem acumular o amanhã que ainda não chegou. O que guardo além do que preciso apodrece. Ensina-me o ritmo do "o pão de cada dia." Amém.`;
  // [111]
  if (/agua da rocha/i.test(p))
    return `Senhor, quem media conflitos na comunidade chega ao ponto em que o único recurso é o clamor a ti. Como Moisés em Refidim — "que farei a este povo? Pouco falta para me apedrejar" — que a minha exaustão me leve ao clamor, não à amargura. A rocha é Cristo. Amém.`;
  // [112]
  if (/amaleque/i.test(p))
    return `Deus da batalha, a vitória dependeu de quem sustentou os braços do intercessor. Faz de mim Arão e Hur para quem está com os braços caindo ao meu redor. E quando eu esgotar, que haja quem me sustente até o pôr do sol. Amém.`;
  // [113]
  if (/de jetro conselho/i.test(p))
    return `Senhor sábio, às vezes a sabedoria para reformar o que faço vem de alguém de fora — não inimigo, mas amigo que ama o suficiente para dizer o que os de dentro não veem. Que eu ouça o Jetro da minha vida. Que delegar seja sabedoria, não fraqueza. Amém.`;
  // [114]
  if (/israelitas chegam/i.test(p))
    return `Pai, tu declaras quem sou antes de dizer o que devo fazer. "Tesouro, reino de sacerdotes, nação santa" — não como resultado da obediência, mas como base para ela. Que eu viva a partir do que tu declaras sobre mim, não em busca de provar que mereço o que tu já disseste. Amém.`;
  // [115]
  if (/vem sobre monte sinai/i.test(p))
    return `Deus Santo, santidade não é lista de regras — é disposição de coração para suportar a tua proximidade. Prepara-me para o encontro contigo. Que eu não chegue à tua presença distraído, apressado, sem ter separado o tempo para estar pronto no terceiro dia. Amém.`;
  // [116]
  if (/moises vai a monte sinai/i.test(p))
    return `Senhor, os limites ao redor do monte não eram para excluir — eram porque a tua santidade é incompatível com o que o pecado faz à criatura. Obrigado porque Jesus subiu onde nenhum de nós poderia ir e desceu com a palavra que sustenta. Ele é o mediador definitivo. Amém.`;
  // [117]
  if (/dez mandamentos/i.test(p))
    return `Deus da família, o quinto mandamento é a charneira das duas tábuas. Que eu honre pai e mãe não apenas por obrigação cultural, mas como ato que une amor a ti com amor ao próximo. Que a minha família seja o laboratório onde aprendo a amar bem. Amém.`;
  // [118]
  if (/livro da alianca/i.test(p))
    return `Senhor que ouves o clamor do afligido, os vulneráveis estão no centro da tua lei, não na margem. Que a nossa comunidade pergunte: quem são os estrangeiros, as viúvas e os órfãos entre nós? Tu os ouves antes de qualquer intercessão. Que eu os proteja antes que precisem clamar. Amém.`;
  // [119]
  if (/sangue da alianca/i.test(p))
    return `Senhor, a aliança foi selada com sangue antes de ser vivida na obediência. Jesus reinterpretou esse sangue na última ceia: "este é o meu sangue da aliança." O que começou com bois foi cumprido com o Mediador definitivo. Que eu receba a Ceia sabendo que o pacto já foi assinado. Amém.`;
  // [120]
  if (/fazer o tabernaculo/i.test(p))
    return `Pai, no centro de todas as instruções técnicas está a pessoa do mediador. Cristo cumpriu tudo — não na tenda física, mas na presença definitiva diante de ti. Que eu me aproxime com confiança do trono da graça, através do Sumo Sacerdote que entrou de uma vez por todas. Amém.`;
  // [121]
  if (/sabado regulamentos/i.test(p))
    return `Senhor Criador, parar não é improdutividade — é declaração de que o sustento não depende do meu esforço ininterrupto. Que o descanso semanal seja ato de adoração e confiança, não apenas higiene mental. Em seis dias o trabalho é feito — no sétimo, descansamos juntos. Amém.`;
  // [122]
  if (/bezerro de ouro/i.test(p))
    return `Deus da paciência, o bezerro foi feito com o ouro que tu mesmo havias dado. Os meus ídolos raramente são coisas ruins — são bênçãos tuas usadas no lugar errado. Quando tu demoras, guarda-me de construir algo visível e controlável que te substitua. Amém.`;
  // [123]
  if (/tenda fora do acampamento/i.test(p))
    return `Senhor que desejas habitar no meio do povo, o pecado afasta a tua presença do centro da comunidade. A adoração a distância é melhor que nenhuma — mas não é o que desejas. Aproxima-te de nós novamente. Que a nossa história seja o retorno da tua presença ao centro. Amém.`;
  // [124]
  if (/senhor vai com israelitas/i.test(p))
    return `Pai, que eu prefira o deserto com a tua presença à terra prometida sem ela. Crescimento sem ti é apenas crescimento. Missão sem a tua presença é ativismo. Como Moisés: "se a tua presença não for conosco, não nos faças partir daqui." Amém.`;
  // [125]
  if (/gloria de deus/i.test(p))
    return `Deus cuja glória nenhum ser humano suporta plenamente, obrigado porque Jesus é a fenda da rocha — a forma humana que torna a tua glória comunicável. Em Cristo posso ver o teu rosto sem morrer. Que eu contemple a glória do Filho para conhecer o Pai. Amém.`;
  // [126]
  if (d.livroAbrev === 'Êx' && /alianca renovado/i.test(p))
    return `Senhor misericordioso, piedoso, tardio em irar-se — Êxodo 34.6 é o teu retrato mais citado no Antigo Testamento. Quando eu precisar renovar a aliança contigo, que eu não comece prometendo fazer melhor — que eu comece vendo quem tu és. A tua misericórdia é maior do que a minha quebra. Amém.`;
  // [127]
  if (/rosto resplandecente/i.test(p))
    return `Senhor, a presença frequentada transforma quem a frequenta. Como Moisés que descia sem saber que o rosto resplandecia, que a minha convivência contigo produza transformação que outros vejam antes de eu perceber. Que eu contemple a tua glória com o rosto descoberto. Amém.`;
  // [128]
  if (/preparacao para construcao/i.test(p))
    return `Espírito Criador, Bezalel é o primeiro homem descrito como cheio do Espírito de Deus — e ele é artesão. Que eu nunca separe criatividade e espiritualidade. Que a nossa comunidade celebre talentos artísticos e manuais como dons teus, tanto quanto os dons mais "espirituais." Amém.`;
  // [129]
  if (/construcao do tabernaculo/i.test(p))
    return `Senhor, "como o SENHOR ordenara a Moisés" se repete sete vezes neste capítulo. Que a fidelidade nos detalhes seja o tom da minha obediência — não a grandiosidade do projeto, mas a consistência de cada "como tu ordenaste." Que eu também possa dizer: assim acabei a obra. Amém.`;
  // [130]
  if (/nuvem e a gloria/i.test(p))
    return `Senhor, a última palavra do Êxodo é presença permanente. O livro que começa com escravidão termina com glória habitando no meio do povo. Que a nossa missão não seja trazer-te para onde queremos ir — mas aprender a mover quando tu te moves. Que eu caminhe ao ritmo da nuvem. Amém.`;

  // ── LEVÍTICO ─────────────────────────────────────────────────────────────
  // [131]
  if (d.livroAbrev === 'Lv' && /^ofertas$/i.test(p))
    return `Senhor, que o sal da aliança esteja presente no meu cotidiano. Que o trabalho, a refeição e os gestos diários sejam ofertas que carregam o flavor da tua presença. Que eu aprenda a adorar não só nos momentos extraordinários, mas no ordinário santificado. Amém.`;
  // [132]
  if (d.livroAbrev === 'Lv' && /pecado ofertas/i.test(p))
    return `Pai, há pecados que cometemos juntos sem perceber — padrões de omissão, injustiça silenciosa, falhas corporativas. Que a nossa comunidade tenha coragem de se examinar coletivamente, não apenas individualmente. Dá-nos olhos para o que a nossa congregação faz sem saber. Amém.`;
  // [133]
  if (/ofertas com restituicao/i.test(p))
    return `Senhor, que eu não chegue ao altar com dívidas não resolvidas com quem prejudiquei. Onde causei dano ao próximo, dá-me coragem de restituir com acréscimo antes de levantar a oferta. Que a reconciliação com o irmão seja parte inseparável da minha adoração. Amém.`;
  // [134]
  if (/instrucoes sobre sacrificios/i.test(p))
    return `Pai, o mediador oferece todos os dias pela própria conta — o sacerdote não está acima da necessidade de oferta. Que os líderes da nossa comunidade não se excetuem da disciplina de adoração pessoal. Que eu nunca sirva ao povo sem primeiro servir a ti no altar da minha própria vida. Amém.`;
  // [135]
  if (d.livroAbrev === 'Lv' && /^mais instrucoes$/i.test(p))
    return `Senhor, que a minha gratidão seja genuína: que reserve a ti o melhor antes de tomar para mim o restante. A gordura e o sangue são teus — a plenitude e a vida pertencem ao Criador. Que eu nunca trate como meu o que é teu. Amém.`;
  // [136]
  if (/ritos de ordenacao/i.test(p))
    return `Pai, que toda ordenação e comissionamento na nossa comunidade seja saturação com a tua presença antes de qualquer função. Que eu nunca confunda credencial com unção. E que o povo seja sempre testemunha do que tu fazes, não apenas da cerimônia humana. Amém.`;
  // [137]
  if (/sacerdocio de arao inaugurado/i.test(p))
    return `Deus da glória, que desce fogo quando o sacerdote está pronto, não me permitas queimar etapas na minha formação. Os sete dias precedem o oitavo. A preparação silenciosa precede a manifestação pública. Que eu honre cada etapa do processo de santificação. Amém.`;
  // [138]
  if (/nadabe e abiu/i.test(p))
    return `Senhor Santo, que eu nunca ministre com mente e coração embotados por qualquer coisa que obscureça a distinção entre o sagrado e o profano. Que o serviço à tua presença me encontre sóbrio, atento e reverente. O que chamamos de fogo pode ser estranho sem que percebamos. Amém.`;
  // [139]
  if (/limpo e imundo/i.test(p))
    return `Deus Santo, a santidade que pediste não é isolamento — é discernimento formado. Que a renovação da minha mente me dê reflexos para perguntar antes de agir: isso é puro ou impuro? Que eu seja santo como tu és santo — não pela separação do mundo, mas pela distinção dentro dele. Amém.`;
  // [140]
  if (/purificacao de mulheres/i.test(p))
    return `Pai, tu marcas o recém-nascido com a tua aliança antes de qualquer ritual de purificação ser concluído. Obrigado porque a tua promessa não espera que estejamos limpos para nos alcançar. Que eu confie que tu ages no meio da vulnerabilidade, não apenas depois dela. Amém.`;
  // [141]
  if (d.livroAbrev === 'Lv' && /^lepra$/i.test(p))
    return `Senhor, examina-me como o sacerdote examinava o leproso. Onde há manchas que crescem — padrões que se espalham na minha pele, nas minhas roupas, na minha casa — não as ignore nem as declare puras por conveniência. Faz o diagnóstico e provê o rito de purificação. Amém.`;
  // [142]
  if (/fluxos corporais/i.test(p))
    return `Deus que criaste o corpo como boa dádiva, que eu cuide dele com a seriedade que o Levítico exige. Que as minhas conexões físicas e emocionais com outros sejam marcadas por responsabilidade — sabendo que o que faço com meu corpo carrega consequências para os que toco. Amém.`;
  // [143]
  if (/dia de expiacao/i.test(p))
    return `Jesus, sumo sacerdote que entrou onde Arão entrava uma vez por ano — tu entraste de uma vez por todas com o teu próprio sangue. O véu se rasgou. Que eu jamais trate como trivial o acesso que isso me deu ao trono da graça. Que eu entre com confiança no que só o sangue torna possível. Amém.`;
  // [144]
  if (d.livroAbrev === 'Lv' && /massacre de.*animais/i.test(p))
    return `Senhor, a vida da carne está no sangue — e tu o destinaste à expiação. O que o Levítico proibia de ser consumido, Jesus ofereceu na Ceia: "bebei dele, todos." Obrigado por transformar o instrumento da expiação no convite à comunhão. Que eu beba com fé e gratidão. Amém.`;
  // [145]
  if (/ritual e moral santidade/i.test(p))
    return `Deus Santo, a tua santidade não é requisito imposto — é convite à participação na tua natureza. Que a minha ética não nasça do medo do castigo, mas do encontro com quem tu és. Que eu seja santo não para merecer algo, mas porque tu és o Senhor meu Deus. Amém.`;
  // [146]
  if (/santidade de sacerdotes/i.test(p))
    return `Pai, que os líderes da nossa comunidade entendam que a santidade do ministério inclui o que acontece em casa. Que a família do líder não seja negligenciada em nome do serviço público. Que a integridade privada sustente a credibilidade pública. Amém.`;
  // [147]
  if (/sacerdotes com deficiencias/i.test(p))
    return `Senhor, que eu não confunda pertencimento com função. Tu excluístes o sacerdote com defeito do altar — mas não da mesa. Que a nossa comunidade seja lugar onde todos pertencem, mesmo que não todos exerçam a mesma função. Amém.`;
  // [148]
  if (/uso de.*santo ofertas/i.test(p))
    return `Senhor, que eu guarde o teu encargo com seriedade — o que me confiaste da tua Palavra, dos sacramentos, do cuidado dos teus filhos. Que nunca o trate com negligência. Acesso às coisas sagradas não é privilégio sem responsabilidade — é encargo que exige cuidado constante. Amém.`;
  // [149]
  if (/aceitavel ofertas/i.test(p))
    return `Deus de misericórdia e santidade, tu embutiste compaixão dentro da lei cultual. Que eu nunca separe rigor teológico de sensibilidade para com os fracos e vulneráveis. Que a perfeição que ofereço a ti não seja conquistada à custa da crueldade com quem está sob meu cuidado. Amém.`;
  // [150]
  if (/nomeado festas/i.test(p))
    return `Senhor, obrigado porque antes do julgamento há convocação. O toque da trombeta não é sentença — é chamado para se reunir. Que eu responda à tua convocação antes que precise da expiação de emergência. Que o ritmo do teu calendário sagrado forme o ritmo da minha vida. Amém.`;
  // [151]
  if (/lampada e pao/i.test(p))
    return `Pai, que a nossa comunidade seja azeite que arde, pão que sustenta e incenso que intercede diante de ti. Que a nossa adoração seja contínua como o fogo do candelabro, renovada como os pães do sábado e ascendente como o incenso. Que a tua presença seja o centro ao redor do qual tudo se organiza. Amém.`;
  // [152]
  if (/blasfemia e punicao/i.test(p))
    return `Senhor, que o teu nome seja santo entre nós — não como tabu cultural, mas como reconhecimento real de quem tu és. Que eu nunca trate levianamente o teu nome — em palavras, atitudes ou promessas feitas em teu nome que não cumpro. Que reverência e intimidade coexistam na minha boca. Amém.`;
  // [153]
  if (/sabatico ano e jubileu/i.test(p))
    return `Senhor de toda a criação, a terra é tua — eu sou mordomo, não proprietário definitivo. Que o princípio do jubileu forme a minha relação com o dinheiro, as posses e os deveres: o que tenho foi cedido por ti e deve circular conforme a tua justiça. Que eu segure levemente o que pertence a ti. Amém.`;
  // [154]
  if (/obediencia e desobediencia/i.test(p))
    return `Pai, que eu reconheça a virada — o ponto onde a trajetória muda pela desobediência. E quando chegar ao exílio das consequências, que eu saiba que o mesmo Deus que disciplinou se lembra da aliança. Que a confissão me abra ao mesmo Deus que fechou as portas. Amém.`;
  // [155]
  if (/ofertas votivas/i.test(p))
    return `Senhor, que eu consagre ao teu serviço não apenas momentos religiosos, mas espaços, casas, rotinas. Que a órbita da adoração inclua o ordinário. E que quando eu resgatar o que havia consagrado, seja com o acréscimo que reconhece que o que é teu tem valor maior do que o que é meu. Amém.`;

  // ── NÚMEROS ──────────────────────────────────────────────────────────────
  // [156]
  if (/primeiro recenseamento de israel/i.test(p))
    return `Senhor que conheces cada nome, tu contaste Israel — não para estatística, mas para missão. Cada número é uma vida convocada. Que eu me lembre de que estar no recenseamento de Deus é estar no chamado de Deus. Amém.`;
  // [157]
  if (/os deveres dos levitas/i.test(p))
    return `Pai, os levitas não tinham terra — tinham presença. Envoltos ao redor da tua habitação, eram a fronteira viva entre o sagrado e o comum. Quando eu servir como guarda do que é teu — família, comunidade, palavra — que eu o faça como missão, não como fardo. Amém.`;
  // [158]
  if (/ordem do acampamento e da marcha/i.test(p))
    return `Senhor de ordem, até no acampamento no deserto havia estrutura ao redor da tua presença. Que a nossa comunidade organize-se ao redor de ti — não de programas, não de lideranças humanas, mas do centro que és tu. Amém.`;
  // [159]
  if (/os deveres e recenseamento de levitas 1/i.test(p))
    return `Pai, cada família levita carregava algo diferente — uns as cortinas, outros os utensílios, outros as estruturas. Que eu abrace o meu encargo específico sem invejar o do outro, sabendo que o tabernáculo só se monta quando todos carregam o que é seu. Amém.`;
  // [160]
  if (/os deveres e recenseamento de levitas 2/i.test(p))
    return `Senhor, há tempo para cada fase do serviço. Ensina-me a honrar o momento presente do chamado sem lamentar o que passou ou apressar o que ainda virá. Que eu sirva plenamente enquanto estou na idade do meu encargo. Amém.`;
  // [161]
  if (/regulamentos para rituais e voto/i.test(p))
    return `Deus que recebes a consagração, o nazireno abria mão de uva, navalha e contato com mortos por amor ao teu nome. Que eu ofereça a ti não apenas o que é fácil, mas separação real de tudo que me afasta de ti. Que a minha consagração seja visível ao mundo. Amém.`;
  // [162]
  if (/ofertas dos lideres/i.test(p))
    return `Pai de justiça, todos os líderes trouxeram a mesma oferta — sem gradação de poder ou prestígio. Que o altar nos nivele. Que eu nunca use a minha posição para oferecer menos ou para exigir honra especial no serviço a ti. Amém.`;
  // [163]
  if (/consagracao e servico de levitas/i.test(p))
    return `Senhor que consagras, os levitas foram levantados como oferta viva diante de ti. Como Paulo disse séculos depois — "apresentai os vossos corpos como sacrifício vivo." Que eu me ofereça hoje com a mesma intenção de quem sabe que está sendo levantado para o teu serviço. Amém.`;
  // [164]
  if (/a pascoa em sinai/i.test(p))
    return `Deus da segunda chance, tu fizeste provisão para quem perdeu a páscoa por razões fora do seu controle. O segundo mês é a misericórdia que entra onde a regra seria morte. Que eu jamais declare que alguém está fora da tua mesa permanentemente. Amém.`;
  // [165]
  if (/a nuvem e o fogo/i.test(p))
    return `Senhor que guias, eles não escolhiam quando partir nem quando ficar — a nuvem decidia. Ensina-me a esperar o teu sinal antes de mover. Que a impaciência não me faça marchar sem ti, nem o conforto me faça ficar quando tu já saíste. Amém.`;
  // [166]
  if (/a prata trombetas/i.test(p))
    return `Pai, as mesmas trombetas que chamavam para a guerra chamavam para a festa. A vida de fé mistura batalha e celebração, e tu és Senhor de ambas. Que eu saiba ouvir quando a trombeta chama para lutar e quando chama para adorar. Amém.`;
  // [167]
  if (/partida de sinai/i.test(p))
    return `Senhor que vais à frente, Israel partiu do Sinai não como refugiado mas como exército. Que eu parta das minhas estações de aprendizado formado e não apressado, pronto para o que vier. Tu que marchaste à frente de Israel, marcha à frente de mim. Amém.`;
  // [168]
  if (/moises e hobab/i.test(p))
    return `Deus sábio, até o servo mais íntimo de Deus soube pedir ajuda ao conhecimento prático de quem conhecia o terreno. Que eu nunca confunda intimidade com Deus com dispensa de colaboração humana. Dá-me humildade para pedir o que o outro sabe melhor. Amém.`;
  // [169]
  if (d.livroAbrev === 'Nm' && /a arca da alianca/i.test(p))
    return `Senhor que levantas e repousas, tu ias à frente de Israel e eles declaravam tua saída e tua chegada. Que eu também anuncie tua presença quando me movo e quando me estabeleço. Que "levanta-te, Senhor" seja o grito de toda partida minha. Amém.`;
  // [170]
  if (/reclamando no deserto/i.test(p))
    return `Pai que disciplinas com amor, a murmuração de Israel não foi ignorada — o fogo ardeu. Mas Moisés intercedeu e o fogo se apagou. Guarda-me da murmuração que provoca fogo, e levanta intercessores ao redor da nossa comunidade que apaguem antes que se espalhe. Amém.`;
  // [171]
  if (/arao e miria com ciumes de moises/i.test(p))
    return `Senhor, a mansidão de Moisés não era fraqueza — era o caráter de quem fala face a face contigo. Que eu não confunda agressividade com força espiritual. Que a minha resposta ao ataque seja o silêncio que te deixa defender, não a retaliação que me ocupa o lugar. Amém.`;
  // [172]
  if (/espioes enviado em canaa/i.test(p))
    return `Deus que capacitas, Calebe viu a mesma terra e o mesmo inimigo que os outros espiões — mas concluiu diferente. A diferença era quem ele conhecia. Que eu também veja os obstáculos através de quem tu és, não através do tamanho do inimigo. Amém.`;
  // [173]
  if (/o relatorio dos espioes/i.test(p))
    return `Senhor, a fé que nos faz pequenos não é humildade — é traição à tua promessa. Guarda-me de me enxergar tão pequeno que esqueço o quão grande és. Que eu nunca reduza a tua capacidade às minhas limitações. Amém.`;
  // [174]
  if (/o povo rebelar-se/i.test(p))
    return `Pai, em momentos de desânimo profundo o coração busca o que era familiar, mesmo que fosse escravidão. Guarda-me de romantizar o Egito que me deixaste. Que a lembrança da tua libertação seja mais forte do que a saudade do cativeiro antigo. Amém.`;
  // [175]
  if (/pecado de rebeliao/i.test(p))
    return `Deus de graça e seriedade, tu perdoaste Israel mas não eliminaste as consequências. Ensina-me a separar misericórdia — que não é condenação eterna — de consequência, que ainda disciplina. Que eu tema não apenas o perdão negado, mas o privilégio perdido por incredulidade. Amém.`;
  // [176]
  if (/uma tentativa de invasao e repelida/i.test(p))
    return `Senhor presente ou ausente, há diferença entre agir com tua bênção e agir sem ela. Que eu nunca parta para o combate presumindo que tu vás junto. Que a certeza da tua presença preceda toda iniciativa importante da minha vida. Amém.`;
  // [177]
  if (d.livroAbrev === 'Nm' && /pecado ofertas/i.test(p))
    return `Pai santo, há diferença entre pecar por fraqueza e pecar com desafio aberto. Que eu trate o teu nome e a tua lei com seriedade suficiente para não confundir tua misericórdia com permissividade. Que a graça me faça mais sério, não menos. Amém.`;
  // [178]
  if (/penalidade por violar o sabado/i.test(p))
    return `Senhor do descanso, o sábado não era capricho — era aliança encarnada no tempo. Que eu honre os ritmos que tu construíste na criação, não como legalismo, mas como reconhecimento de que não sou o dono do meu tempo — és tu. Amém.`;
  // [179]
  if (/franjas sobre as vestes/i.test(p))
    return `Deus que crias memória, as franjas eram lembretes visíveis do compromisso invisível. Que eu construa práticas que me lembrem de quem sou e de quem és — sinais externos que me reorientem para ti no dia a dia. Amém.`;
  // [180]
  if (/revolta de core, data e abrao/i.test(p))
    return `Senhor que proteges a santidade do chamado, Coré reivindicou uma espiritualidade que não lhe pertencia por origem mas por ambição. Guarda-me de confundir desejo de influência com chamado de Deus. Que eu ministre onde fui colocado, não onde quero estar. Amém.`;
  // [181]
  if (/arao salva o povo/i.test(p))
    return `Jesus, sumo sacerdote eterno, Arão com o incensário entre os vivos e os mortos é figura de ti. Tu te interpuseste entre a morte e a vida de cada um de nós. Que eu viva sabendo que o meu mediador está de pé, e que a sua intercessão é ativa agora. Amém.`;
  // [182]
  if (/de arao vara/i.test(p))
    return `Deus que ressuscitas o que parece morto, uma vara seca floresceu por decreto teu. Onde em mim — ou na minha comunidade — há varas que parecem secas, que tu possas florescer o que só tu podes fazer viver. Que eu não descarte o que ainda não floresceu. Amém.`;
  // [183]
  if (/regulamentos sobre sacerdotes e levitas/i.test(p))
    return `Pai, tu disseste a Arão: "eu sou a tua herança." Não terra, não riqueza — tu mesmo. Que eu aprenda a avaliar o que tenho em ti antes de invejar qualquer coisa que outro possui. Que a minha maior riqueza seja a tua presença. Amém.`;
  // [184]
  if (/cerimonia de bezerra vermelha/i.test(p))
    return `Senhor de paradoxos sagrados, o que purificava o impuro tornava impuro o puro. Esta sombra aponta para a cruz onde Cristo carregou a nossa impureza e na troca nos deu a sua pureza. Que eu nunca me esqueça do custo da minha limpeza. Amém.`;
  // [185]
  if (/as aguas de meriba/i.test(p))
    return `Deus de paciência infinita, Moisés que tanto suportou falhou justamente ali — numa pedra, num momento de ira, num gesto de presunção. Guarda-me de achar que os anos de obediência me dão licença para um momento de desobediência. Que a longevidade do chamado me torne mais humilde, não mais autossuficiente. Amém.`;
  // [186]
  if (/passagem por edom recusada/i.test(p))
    return `Senhor soberano, às vezes os caminhos bloqueados são parte do teu roteiro, não falhas do teu plano. Israel desviou e continuou. Que eu não trate todo obstáculo como rejeição divina. Às vezes o desvio é a rota correta. Amém.`;
  // [187]
  if (d.livroAbrev === 'Nm' && /a morte de arao/i.test(p))
    return `Pai eterno, Arão morreu com dignidade — no monte, com a família, passando as vestes ao filho. Que quando minha hora de passar a tarefa chegar, eu o faça com a mesma graça. E que eu viva de modo que o que passo seja digno de ser carregado por quem vem depois. Amém.`;
  // [188]
  if (/rei arade derrotou/i.test(p))
    return `Senhor de batalhas, quando o povo clamou a ti em voto de dependência total, tu entregaste o inimigo. Que eu aprenda que a declaração de dependência antes da batalha não é fraqueza estratégica — é a condição da vitória. Amém.`;
  // [189]
  if (/o bronze serpente/i.test(p))
    return `Senhor Jesus, tu mesmo disseste: "como Moisés levantou a serpente no deserto, assim o Filho do Homem será levantado." O olhar que cura é o olhar para ti levantado na cruz. Que eu nunca busque cura em outro lugar. Que o olhar simples de fé seja o meu remédio. Amém.`;
  // [190]
  if (/a jornada a moabe/i.test(p))
    return `Deus de águas no deserto, no meio da jornada Israel cantou ao poço. Que eu também interrompa a marcha para cantar quando tu abrires a fonte inesperada. Que o reconhecimento do teu milagre ordinário seja tão espontâneo quanto o cântico daquele acampamento. Amém.`;
  // [191]
  if (/rei seom e rei ogue derrotou/i.test(p))
    return `Senhor que vais preparando o caminho, as vitórias sobre Seom e Ogue precederam Canaã. Cada conquista anterior é preparo para a próxima. Que eu veja as pequenas vitórias de hoje como o Deus de amanhã preparando o que ainda não vi. Amém.`;
  // [192]
  if (/balaque e balaao/i.test(p))
    return `Deus soberano, tu falaste por um asno quando o profeta não queria ouvir. Não te limitas a profetas acreditados nem a canais convencionais. Que eu tenha ouvidos abertos para reconhecer tua voz em qualquer veículo que escolheres — sem precisar que a fonte seja impressionante. Amém.`;
  // [193]
  if (/de balaao oraculo/i.test(p))
    return `Senhor, o que tu abençoaste não pode ser maldito por nenhum Balaão humano. Quando forças se organizarem contra mim — palavras, intenções, rituais — que eu repouse na certeza de que a bênção que tu declaraste sobre mim é mais forte do que qualquer maldição tentada. Amém.`;
  // [194]
  if (/adoracao de baal de peor/i.test(p))
    return `Pai santo, o zelo de Finéias não era violência religiosa — era intercessão encarnada. Quando o que é teu está sendo comprometido dentro da comunidade, dá-me coragem de agir e não apenas observar. Que o amor pela tua honra seja mais forte do que o medo do conflito. Amém.`;
  // [195]
  if (/um recenseamento de novo geracao/i.test(p))
    return `Deus fiel, toda a geração que duvidou morreu no deserto — mas Calebe e Josué entraram. A fé persistente até o fim é a que herda a promessa. Que eu seja da geração que termina o que começou, não a que morre nas margens por incredulidade acumulada. Amém.`;
  // [196]
  if (/as filhas de zelofeade/i.test(p))
    return `Senhor justo, as filhas de Zelofeade trouxeram a ti o que a lei não havia previsto e tu respondeste: "têm razão." Que eu nunca use a tradição como muro contra a justiça que tu mesmo reclamas. Que a nossa comunidade seja lugar onde a voz de quem foi excluído encontra resposta. Amém.`;
  // [197]
  if (/josue nomeado moises' sucessor/i.test(p))
    return `Bom Pastor, a preocupação central de Moisés antes de morrer não era o seu legado — era o teu povo. Que os líderes que formares em mim ou ao meu redor tenham o mesmo instinto: que o povo não fique desamparado. Que a sucessão seja ato de amor, não de ambição. Amém.`;
  // [198]
  if (/regulamentos sobre ofertas e voto/i.test(p))
    return `Pai, os votos feitos a ti são sérios o suficiente para exigir responsabilidade antes de serem cumpridos. Que as promessas que faço a ti sejam feitas com consciência e nunca como manobra de espiritualidade individual desconectada da comunidade. Amém.`;
  // [199]
  if (/guerra contra midia/i.test(p))
    return `Senhor de vitórias, Israel voltou de Midiã sem perder um único homem — e a resposta foi oferta de gratidão. Quando tu me deres vitórias que excedem a minha expectativa, que a minha primeira resposta seja adoração, não autossuficiência. Que o milagre produza culto. Amém.`;
  // [200]
  if (/conquista e divisao da transjordania/i.test(p))
    return `Pai, a tentação de estabelecer-se antes de terminar a missão coletiva era real. Guarda-me de acomodar-me antes que todos os meus irmãos tenham entrado na herança. Que o meu conforto não compre a indiferença ao que o próximo ainda precisa alcançar. Amém.`;
  // [201]
  if (/as etapas de de israel jornada de egito/i.test(p))
    return `Deus de memória fiel, listar cada acampamento era dizer: "em cada lugar, eu estava." Que eu faça o exercício de listar as paradas da minha própria jornada com Deus. Cada estação difícil e cada milagre é prova de que não fui abandonado. Amém.`;
  // [202]
  if (/ordenacoes sobre a heranca/i.test(p))
    return `Senhor soberano, o sorteio era a forma de dizer que a porção de cada um era tua decisão, não negociação humana. Que eu receba com gratidão o que tu designas como minha herança, mesmo que outro tenha recebido o que eu preferiria. A tua escolha é sábia. Amém.`;
  // [203]
  if (/cidades para levitas e refugio/i.test(p))
    return `Deus de refúgio, tu criaste cidades onde quem matou sem querer encontrava proteção contra a vingança antes do julgamento. Que a nossa comunidade seja lugar de refúgio para quem carrega culpa sem intencionalidade — onde o processo precede a sentença e a proteção precede o julgamento definitivo. Amém.`;
  // [204]
  if (/casamentos das herdeiras/i.test(p))
    return `Senhor que ordenas heranças, o cuidado com a herança exige decisões que vão além do interesse individual. Que eu veja o que carrego como herança de Deus como algo a ser preservado, não apenas aproveitado. Que as minhas escolhas guardem o que recebi para os que virão. Amém.`;

  // ── DEUTERONÔMIO ─────────────────────────────────────────────────────────
  // [205]
  if (/acontecimentos em horebe relembrados/i.test(p))
    return `Senhor que chama à partida, há momentos em que a obediência não é ficar mas ir. Horebe foi encontro, não residência. Que eu não confunda um lugar de revelação com um lugar de permanência — receba a revelação e parta para o que ela ordena. Amém.`;
  // [206]
  if (/nomeacao de lideres tribais/i.test(p))
    return `Pai, Moisés reconheceu o seu limite não como fracasso mas como princípio de multiplicação. Que eu também saiba nomear outros para carregar o que não foi feito para ser carregado por um só. Que a delegação seja ato de fé, não de desistência. Amém.`;
  // [207]
  if (/de israel refusal a enter a terra/i.test(p))
    return `Deus que prometes terras, é possível ouvir a promessa e ainda assim recuar por medo do relatório do inimigo. Guarda-me de deixar o relatório negativo sobrepor a palavra positiva que tu declaraste. Que eu seja alguém que acredita mais no que tu disseste do que no que vejo. Amém.`;
  // [208]
  if (/a penalidade para de israel rebeliao/i.test(p))
    return `Senhor sério, tu foste claro: quem recusou a terra não entrou. A incredulidade tem consequências que as lágrimas posteriores não desfazem. Ensina-me a temer a incredulidade com o mesmo peso com que temo outros pecados — pois ela é a raiz que destrói a herança. Amém.`;
  // [209]
  if (/o deserto anos/i.test(p))
    return `Deus paciente, tu esperaste quarenta anos. Não te apressaste, não cedeste, não abandonaste — esperaste que a geração contrária fosse substituída. Que eu aprenda a esperar os teus tempos com a mesma paciência soberana, sabendo que tua promessa não tem prazo de validade. Amém.`;
  // [210]
  if (/defeat de rei seom/i.test(p))
    return `Senhor de batalhas justas, Israel tentou primeiro a paz — e só quando foi recusada combateu. Que eu aprenda a oferecer paz antes de entrar em conflito. E quando o conflito for inevitável porque o outro recusou a paz, que eu lute sem culpa e com confiança em ti. Amém.`;
  // [211]
  if (/a terra de rei seom e ogue/i.test(p))
    return `Pai, Moisés recordou as vitórias passadas no momento de preparar a próxima geração. A memória histórica da fidelidade de Deus é um dos mais poderosos combustíveis para a fé presente. Que eu invista na memória coletiva da minha comunidade com as histórias do que tu já fizeste. Amém.`;
  // [212]
  if (/moises avista canaa de pisga/i.test(p))
    return `Deus que cumpres a tua palavra mesmo quando ela dói, Moisés viu a terra mas não entrou — não por falta de amor teu, mas por consequência real. Mas tu mostraste a terra com misericórdia. Que eu aprenda a receber o "não" de Deus sem interpretar como abandono, e o "mas vê" como sinal de que ainda és bom. Amém.`;
  // [213]
  if (/exortacao a guarda a lei/i.test(p))
    return `Senhor próximo, a lei não era fardo — era evidência de que tu estás perto. Que eu não veja as tuas instruções como distância formalizada mas como proximidade que cuida. Um Deus que instrui é um Deus que está presente. Amém.`;
  // [214]
  if (/contra idolatria/i.test(p))
    return `Deus invisível, tu falaste e eles ouviram uma voz, não uma forma. Guarda-me de fabricar imagens do que não deve ter imagem — de reduzir tua infinita realidade a algo que caiba no meu controle. Que o meu conhecimento de ti cresça pela tua palavra, não pelos meus ídolos conceituais. Amém.`;
  // [215]
  if (/poderoso acts de deus/i.test(p))
    return `Deus de prodígios históricos, tu tiraste Israel do Egito por fogo, sinais e maravilhas — algo sem precedente. Esse mesmo Deus que fez o impossível histórico é o Deus que age hoje. Que a leitura da história de Deus aumente a minha expectativa do que ele pode fazer na minha história. Amém.`;
  // [216]
  if (/cidades de refugio a leste do jordao/i.test(p))
    return `Senhor de misericórdia prática, as cidades de refúgio eram misericórdia institucionalizada — locais onde a proteção era garantia antes do processo. Que a nossa comunidade crie estruturas de cuidado que protejam o vulnerável enquanto a verdade ainda está sendo apurada. Amém.`;
  // [217]
  if (/transicao a segundo discurso/i.test(p))
    return `Pai, o segundo discurso de Moisés começa com identificação — quem fala, onde, quando. A palavra de Deus tem localização histórica. Que eu receba a Bíblia como palavra contextualizada que ainda fala, não como abstração atemporal que não compromete ninguém. Amém.`;
  // [218]
  if (d.livroAbrev === 'Dt' && /dez mandamentos/i.test(p))
    return `Senhor único, o coração de toda a lei é este: tu és único e não divides a minha adoração com nada. Que eu faça uma auditoria honesta do que compete contigo pelo centro da minha vida. E que cada dia eu te recoloque no único lugar que satisfaz — o primeiro. Amém.`;
  // [219]
  if (/moises o mediador de de deus ira/i.test(p))
    return `Senhor Jesus, o pedido de Israel por um mediador foi aprovado por Deus. Tu és o mediador que Israel pediu e que a lei prefigurou. Que eu aproveite plenamente o acesso que tenho a ti — não como algo garantido mas como privilégio conquistado pela tua obra. Amém.`;
  // [220]
  if (/nao esquecer senhor/i.test(p))
    return `Deus que pedes amor, o Shemá não é regra — é convite ao amor total. Que eu ame a ti com a totalidade do que sou — mente, vontade, emoção, força. Não como obrigação religiosa, mas como resposta ao teu amor que primeiro me amou. Amém.`;
  // [221]
  if (/cautela contra desobediencia/i.test(p))
    return `Pai, a prosperidade é o momento mais perigoso para a fé — quando estiver farto, guarda-me do esquecimento. Que a abundância produza gratidão e não autossuficiência. Que eu agradeça antes de poupar, adore antes de planejar. Amém.`;
  // [222]
  if (/destruir them/i.test(p))
    return `Senhor que proteges o coração, a separação ordenada não era racismo — era proteção contra a idolatria que vem pela intimidade. Que eu seja sábio nas alianças que construo, sabendo que o coração segue o que mais amamos. Que as minhas amizades mais próximas me movam em tua direção. Amém.`;
  // [223]
  if (/deus escolhe israelitas/i.test(p))
    return `Deus que amas por pura graça, a eleição de Israel não foi por mérito — foi por amor imerecido. A minha eleição também. Que eu nunca me orgulhe do que recebi como se tivesse conquistado. E que a consciência de ser amado sem mérito me faça mais generoso para com quem ainda não o sabe. Amém.`;
  // [224]
  if (/nao ser com medo/i.test(p))
    return `Senhor que já venceu, quando o medo me atacar, a primeira medicina é a memória. Lembra-me do que já fizeste. Cada testemunho de tua intervenção passada é argumento contra o medo presente. Que eu colecione histórias de tua fidelidade para usar nos dias de tremor. Amém.`;
  // [225]
  if (/de deus cuidado no deserto/i.test(p))
    return `Pai que cuidas dos detalhes, quarenta anos sem desgaste de roupa ou inchaço de pé — tu sustentaste o que eles não notaram. Quantas vezes tu me sustentaste em coisas que não percebi? Abre os meus olhos para a providência silenciosa que me mantém vivo cada dia. Amém.`;
  // [226]
  if (/advertencia sobre perecer/i.test(p))
    return `Deus de graça pura, Israel não entrou por mérito próprio — entrou porque tu expulsaste o que era pior. Que eu nunca me posicione diante de ti como merecedor. O que tenho é graça, não recompensa. Que a humildade seja a postura permanente diante de tua bondade. Amém.`;
  // [227]
  if (/consequencias de se rebelar contra deus/i.test(p))
    return `Senhor que ouves a intercessão, Moisés prostrou-se quarenta dias e Deus ouviu. A intercessão persistente tem resultado. Que eu invista nas horas de prostração diante de ti pela minha família, pela minha comunidade, pelo meu povo. Que o que Moisés fez por Israel, eu faça pelos que amo. Amém.`;
  // [228]
  if (/segundo par de tabuas/i.test(p))
    return `Deus de nova aliança, tu não abandonaste o pacto quando Moisés quebrou as tábuas — reescreveste. Quando eu quebro os compromissos feitos contigo, tu não me descartaste. Reescreve em mim a lei que eu destruí pela desobediência. A nova aliança é tua iniciativa, não a minha recuperação. Amém.`;
  // [229]
  if (/a essencia da lei/i.test(p))
    return `Senhor que resume toda a lei no amor, a essência não é regulamento — é relação: temer, amar, andar, servir. Que eu não reduza a espiritualidade à observância de regras enquanto o coração permanece distante. Que cada obediência minha seja expressão de amor, não de medo. Amém.`;
  // [230]
  if (/grande feitos de senhor/i.test(p))
    return `Deus de atos visíveis, a geração que viu os prodígios devia transmiti-los. Que eu também transmita aos que vierem depois de mim o que os meus olhos viram de tua fidelidade. A testemunha ocular é responsável pela narrativa. Que eu não silencie o que Deus fez na minha vida. Amém.`;
  // [231]
  if (/bencaos e amaldicoa/i.test(p))
    return `Pai que nos ofereces a escolha, tu nunca eliminaste o livre-arbítrio — puseste diante de nós a vida e a morte e disseste "escolhe." Que hoje eu escolha a vida. Que cada decisão minha, pequena ou grande, seja calibrada para o que te agrada — não para o que me convém. Amém.`;
  // [232]
  if (/lugar correto para a adoracao/i.test(p))
    return `Senhor que reúne o culto, a adoração não é uma prática privada e dispersa — tem lugar, tem comunidade, tem centro. Que eu não substitua a comunhão do povo reunido por devoção solitária que nunca se submete a nada além de si mesma. Amém.`;
  // [233]
  if (/um lugar prescrito para a adoracao/i.test(p))
    return `Pai de ordem, a fé que faz cada um o que bem lhe parece não é liberdade — é individualismo disfarçado de espiritualidade. Que eu aceite a estrutura e a liderança que tu colocas ao redor do culto como parte do que me forma, não como obstáculo. Amém.`;
  // [234]
  if (d.livroAbrev === 'Dt' && /massacre de animais/i.test(p))
    return `Senhor santo, a advertência é clara: não perguntes "como eles fazem" para aprender a adorar. Que o meu método de adoração venha de ti, não da cultura ao redor. Que a curiosidade pelo que as nações fazem não me corroa o coração. Amém.`;
  // [235]
  if (d.livroAbrev === 'Dt' && /^regulamentos$/.test(p))
    return `Pai de justiça ordenada, a vida de fé não é só culto — inclui justiça administrada nas cidades. Que a minha fé produza interesse por estruturas justas na sociedade. Que eu não separe adoração de justiça como se fossem esferas incompatíveis. Amém.`;
  // [236]
  if (/destruir amaleque/i.test(p))
    return `Senhor que ordenas memória e esquecimento, há o que deve ser lembrado e o que deve ser apagado. Que eu não preserve o que tu ordenas extirpar, nem esqueça o que tu ordenas lembrar. Que a tua ordem sobre a memória forme a minha espiritualidade. Amém.`;
  // [237]
  if (/primeiro frutos e dizimos/i.test(p))
    return `Deus da história, antes de entregar os primeiros frutos, Israel confessava: "éramos errantes, fomos escravos, fomos libertados." A oferta material seguia a memória histórica. Que eu nunca ofereça a ti sem primeiro relembrar o que tu fizeste por mim. A gratidão precede o gesto. Amém.`;
  // [238]
  if (/exortacao final/i.test(p))
    return `Senhor de aliança mútua, a renovação da aliança é um ato de declaração dupla — eu digo que tu és meu Deus, tu dizes que eu sou teu povo. Que eu renove essa declaração com consciência hoje. Não apenas como tradição herdada, mas como escolha pessoal e atual. Amém.`;
  // [239]
  if (/inscribed pedras e altar sobre monte ebal/i.test(p))
    return `Pai que inscreves, tu querias que a lei fosse visível e pública — gravada em pedra. Que o que aprendi de ti não seja apenas arquivo interior mas algo que marca visivelmente a forma como vivo. Que a minha vida seja pedra inscrita com a tua lei. Amém.`;
  // [240]
  if (/doze amaldicoa/i.test(p))
    return `Senhor de fronteiras justas, as maldições do Ebal protegiam os vulneráveis de injustiças feitas no escondido. Tu vês o que nenhum testemunho humano registra. Que o temor de ti me governe mais do que o temor do escândalo público. Que eu seja justo onde ninguém está olhando. Amém.`;
  // [241]
  if (/bencaos pela obediencia e advertencias contra a desobediencia/i.test(p))
    return `Pai que prometes vida boa, a prosperidade não é acidente — tem forma e condição. Mas as advertências pela desobediência são igualmente reais e graduadas. Que eu tome a sério tanto a promessa quanto a advertência. Que a obediência seja minha resposta de fé, não meio de barganha. Amém.`;
  // [242]
  if (/advertencia contra descendentes/i.test(p))
    return `Senhor que disciplinas através da história, o exílio não foi abandono — foi consequência anunciada. Mas mesmo no espalhamento a promessa de restauração sobrevive. Que a consciência da disciplina histórica de Deus me faça mais sério sobre a responsabilidade coletiva da minha geração. Amém.`;
  // [243]
  if (d.livroAbrev === 'Dt' && /a alianca renovado em moabe/i.test(p))
    return `Deus de revelação e mistério, tu revelaste o que precisamos saber e guardaste o que não nos pertence. Que eu viva confortavelmente na fronteira entre o revelado e o oculto — sem pretender saber o que tu não revelaste, e sem negligenciar o que claramente deste. Amém.`;
  // [244]
  if (/com coracao e alma/i.test(p))
    return `Senhor que operas a circuncisão do coração, a obediência que tu pedes é além da capacidade humana sem o teu toque interior. O coração só ama totalmente quando tu o transformas. Opera em mim o que me pedes antecipadamente. A obediência que produzirás em mim é obra tua, não minha conquista. Amém.`;
  // [245]
  if (/vida e morte/i.test(p))
    return `Deus que amas a vida, tu me pões diante da escolha e clamas que eu escolha a vida — não para teu benefício, mas para o meu e dos que virão depois de mim. A minha escolha hoje forma a herança dos meus filhos. Que eu escolha a vida com consciência da sua dimensão geracional. Amém.`;
  // [246]
  if (/josue torna-se moises' sucessor/i.test(p))
    return `Senhor que acompanhas o chamado, Josué recebeu tanto o encargo quanto a promessa da presença. O chamado sempre vem com a promessa "eu estou contigo." Que quando eu receber um encargo que me excede, minha primeira certeza seja não a minha capacidade mas a tua presença garantida. Amém.`;
  // [247]
  if (/a lei a ser leu cada setimo ano/i.test(p))
    return `Pai que instituís ritmos de escuta, a leitura da lei a cada sete anos não era opcional — era convocação nacional. Que eu não imagine que um encontro remoto com a Escritura é suficiente. A palavra deve ser ouvida em comunidade, repetidamente, ao longo de gerações. Amém.`;
  // [248]
  if (/introducao a cantico de moises/i.test(p))
    return `Senhor que prevês e ainda assim amas, tu sabes que vamos falhar antes de falharmos. E mesmo assim não retiras o teu amor — apenas colocas uma testemunha. O teu conhecimento da nossa fraqueza não é condenação antecipada, é misericórdia que prepara o retorno. Amém.`;
  // [249]
  if (/moises prepares a recitar seu cantico/i.test(p))
    return `Senhor vivo, a palavra que Moisés ia recitar não era poesia — era vida. Que eu nunca trate as Escrituras como literatura religiosa mas como palavra que, se obedecida, prolonga a vida e, se ignorada, encurta. Que a leitura seja sempre seguida de obediência. Amém.`;
  // [250]
  if (d.livroAbrev === 'Dt' && /o cantico de moises/i.test(p))
    return `Senhor único, o centro do cântico é a tua unicidade soberana sobre a vida e a morte, a ferida e a cura. Não há área da minha existência fora do teu governo. Que eu entregue a ti tanto os momentos de ferida quanto os de cura, sabendo que ambos estão nas tuas mãos soberanas. Amém.`;
  // [251]
  if (/moises' morte predito/i.test(p))
    return `Pai que falas a verdade com misericórdia, Moisés soube antecipadamente como e onde morreria — e mesmo assim abençoou Israel. A consciência da mortalidade não precisa produzir amargura, mas plenitude. Que eu viva cada dia com a clareza de que morro, e por isso dê o melhor agora. Amém.`;
  // [252]
  if (/moises' bencao sobre israel/i.test(p))
    return `Senhor nosso escudo e espada, a última palavra de Moisés sobre Israel foi bênção — tribo por tribo, cada uma pelo nome. Que a minha última palavra sobre os que amo seja bênção. Que eu aprenda a pronunciar o bem sobre cada pessoa antes que o momento passe. Amém.`;
  // [253]
  if (/israel lamenta a morte de moises/i.test(p))
    return `Espírito Santo que unes os chamados, quando Moisés partiu Josué estava pronto — ungido com o mesmo Espírito. A obra de Deus não para com a morte de um servo. Que eu contribua para formar os Josués da próxima geração com a mesma fidelidade com que Moisés treinou o seu. Amém.`;

  // ── JOSUÉ ────────────────────────────────────────────────────────────
  // [254]
  if (/de deus comissao a josue/i.test(p))
    return `Senhor, tu és o mesmo Deus que comissionaste Josué — e o "sê forte e corajoso" que ecoa no início e no fim da perícope é dirigido também a mim hoje. Que eu não espere me sentir corajoso para obedecer — que eu aja a partir de Quem me envia, não de como me sinto. Amém.`;
  // [255]
  if (/espioes enviado a jerico/i.test(p))
    return `Pai, tu usaste Raabe — de fora, de passado complicado — para confirmar a tua promessa a Israel. Guarda-me de subestimar de onde pode vir a palavra de fé que preciso ouvir. Que eu reconheça a tua voz mesmo quando ela chega por vozes inesperadas. Amém.`;
  // [256]
  if (/israel atravessa jordao/i.test(p))
    return `Deus que divides as águas, a arca entrou antes do povo — a presença foi à frente. Que eu não avance em nenhuma direção onde a tua presença não foi primeiro. E quando as águas recuarem diante da arca, que eu atravesse sem olhar para trás. Amém.`;
  // [257]
  if (/doze pedras coloca em gilgal/i.test(p))
    return `Senhor que ordenas memoriais, ajuda-me a erguer pedras de Gilgal na minha vida — marcos concretos que recordam o que tu fizeste, para que eu possa contar às gerações que vêm depois de mim. Que a minha memória espiritual seja fértil o suficiente para sustentar a fé dos que ainda não nasceram. Amém.`;
  // [258]
  if (/novo geracao circuncidado/i.test(p))
    return `Senhor, há marcas de identidade que a minha geração precisa receber ou renovar. Que eu não chegue à herança prometida carregando a vergonha de uma geração anterior não resolvida. "Hoje removi de vós a vergonha do Egito" — que essa palavra seja verdadeira também em mim. Amém.`;
  // [259]
  if (d.livroAbrev === 'Js' && /a pascoa/i.test(p))
    return `Pai, o maná cessou em Gilgal porque a terra estava pronta para prover. Ensina-me a reconhecer quando uma forma de tua provisão foi substituída por outra — e a receber a nova sem saudade paralisante da antiga. Cada estação tem o seu maná e o seu produto da terra. Amém.`;
  // [260]
  if (/de josue visao/i.test(p))
    return `Senhor dos exércitos, como Josué tirou o calçado diante do Comandante, que eu me aproxime das minhas batalhas com adoração antes de estratégia. A questão não é se estás do meu lado — é se estou sob o teu comando. Que eu faça a pergunta certa antes de cada desafio. Amém.`;
  // [261]
  if (/jerico levado e destruiu/i.test(p))
    return `Deus que derrubas muros sem catapultas, há resistências na minha vida que não cedem à força humana. Dá-me fidelidade para o sétimo dia — quando ainda não vejo resultado mas a obediência ainda é requerida. E que a graça que poupou Raabe dentro do julgamento seja lembrada quando eu olhar para quem parece condenado. Amém.`;
  // [262]
  if (/maldicao de josue/i.test(p))
    return `Senhor que guardas as tuas advertências, as maldições proféticas não se dissipam com o tempo — Hiel descobriu isso. Que eu trate com reverência as interdições da tua Palavra, mesmo quando parecem arcaicas ou exageradas para quem não viu a Jericó que caiu. Amém.`;
  // [263]
  if (/o pecado de aca e punicao/i.test(p))
    return `Pai que vês o que está escondido, o anátema de Acã não era apenas seu — afetou o acampamento inteiro. Que eu não prive a minha comunidade de vitória por guardar para mim o que pertence a ti. Busco a transparência diante de ti e diante dos meus irmãos, antes que o vale de Acor se torne necessário. Amém.`;
  // [264]
  if (/ai capturou por um estratagema e destruiu/i.test(p))
    return `Senhor, Josué estendeu o dardo e não abaixou antes de a vitória estar completa — como Moisés com as mãos erguidas no Refidim. Sustenta a minha postura de fé quando eu quero baixar os braços antes do tempo. Que a obediência sustentada até o fim seja a minha parte na batalha que tu já declaraste ganha. Amém.`;
  // [265]
  if (/josue renova a alianca/i.test(p))
    return `Deus que gravaste a lei em pedra para todos verem, que a tua Palavra seja proclamada entre nós com a mesma publicidade — sem omitir as bênçãos nem as maldições. Que a nossa comunidade ouça a lei inteira, inclua crianças e estrangeiros, e responda com o amém que custa algo. Amém.`;
  // [266]
  if (/gibeonitas salvar eles mesmos por ardil/i.test(p))
    return `Senhor, Israel firmou aliança sem te consultar — e o vínculo foi irreversível. Guarda-me de decisões rápidas em áreas de consequências longas. Que eu aprenda a desacelerar diante de alianças, parcerias e comprometimentos — especialmente quando a urgência parece óbvia. Amém.`;
  // [267]
  if (/cinco reis derrotou/i.test(p))
    return `Deus que suspendes o sol quando a batalha exige, tu providencias o tempo necessário para completar o que iniciaste. Que a minha oração seja audaciosa como a de Josué — não por presumir, mas porque tenho memória de milagres anteriores que me autorizam a pedir com ousadia. Amém.`;
  // [268]
  if (/unido reis de do norte canaa derrotou/i.test(p))
    return `Senhor que declaras a vitória na véspera da batalha, que eu aprenda a receber a tua promessa antes de entrar no campo. "Amanhã eu os entregarei" — que essa lógica de fé forme o meu avanço: primeiro a promessa, depois a ação, não o contrário. Amém.`;
  // [269]
  if (/resumo de de josue conquistas/i.test(p))
    return `Pai, a terra descansou depois da conquista — e o descanso era o objetivo, não a guerra. Que eu não trate o conflito espiritual como estado permanente, mas como o caminho para a herança habitada em paz. Os anaquins que paralisaram gerações foram removidos — que eu entre no descanso que tu preparaste. Amém.`;
  // [270]
  if (/os reis conquistou por moises e josue/i.test(p))
    return `Senhor que registras as duas metades da mesma missão, lembra-me que o que estou fazendo agora foi começado antes de mim e será completado depois. Que eu sirva ao meu capítulo com fidelidade, sem precisar que toda a história caiba no meu mandato. Amém.`;
  // [271]
  if (/as partes de canaa ainda nao conquistadas/i.test(p))
    return `Deus que completas o que nenhum líder humano termina, Josué foi velho e ainda havia terra por conquistar — e isso não foi falha. Que eu não carregue a angústia do que não concluí, sabendo que tu continuas a obra depois que minha estação termina. A promessa não expira com o servo. Amém.`;
  // [272]
  if (/o territorio a leste do jordao/i.test(p))
    return `Senhor que és herança dos levitas, que eu nunca trate a tua presença como consolação de quem não recebeu terra. Tu és a melhor parte. Que o chamado que me privou de algumas acumulações seja vivido com a certeza de que "o Senhor é a minha herança" é a declaração mais rica que existe. Amém.`;
  // [273]
  if (/o territorio de ruben, gade e manasses/i.test(p))
    return `Pai, as tribos recebem terra e os levitas recebem a ti — e o texto repete isso duas vezes no mesmo capítulo como se fosse o versículo mais importante. Que eu nunca inveje as heranças materiais dos outros quando a minha herança é a tua presença. Amém.`;
  // [274]
  if (/a distribuicao de territorio oeste de jordao/i.test(p))
    return `Senhor que distribuís por sorte diante de ti, que as decisões sobre herança e partilha na minha comunidade sejam feitas diante de ti — não pela pressão dos mais fortes ou pela estratégia dos mais espertos. Que a sorte de Siló seja o nosso modelo: presença de Deus antes de divisão de porções. Amém.`;
  // [275]
  if (/o territorio de juda/i.test(p))
    return `Deus de Calebe, ele tinha oitenta e cinco anos e pediu a montanha dos anaquins. Guarda-me de pedir o vale fácil quando há montanha prometida esperando por quem tem fé para pedi-la. Que a força que tu deste não seja guardada para uma batalha que nunca chego a travar. Amém.`;
  // [276]
  if (/o territorio de efraim e manasses/i.test(p))
    return `Senhor que desafias ao bosque, que eu não reclame da porção pequena quando há território por desbravar que ainda não abri. Antes de pedir mais, que eu tome o que já foi dado. E que a petição das filhas de Zelofeade me lembre que a herança não é apenas para quem tem voz mais alta. Amém.`;
  // [277]
  if (/os territorios das tribos restantes/i.test(p))
    return `Pai que distribuís em Siló — diante da tenda do encontro —, que as decisões de partilha da nossa comunidade aconteçam na presença de Deus antes de acontecerem no papel. A liturgia antes da logística. A adoração antes da administração. Amém.`;
  // [278]
  if (d.livroAbrev === 'Js' && /as cidades de refugio/i.test(p))
    return `Senhor das cidades de refúgio, tu as distribuíste igualmente dos dois lados do Jordão para que o refugiado chegasse antes do vingador. Que a nossa comunidade seja acessível assim — próxima o suficiente para quem foge de seus próprios erros, sem exigir que se mereça a entrada antes de entrar. Amém.`;
  // [279]
  if (/cidades distribuido a levitas/i.test(p))
    return `Deus que espalhaste os levitas por quarenta e oito cidades em todas as tribos, que o ministério da tua Palavra nunca fique concentrado num único centro. Que eu contribua para uma presença ministerial distribuída — instrução e intercessão em cada bairro, em cada tribo, em cada margem. E "nada falhou de todas as tuas boas promessas" — que eu viva da certeza disso. Amém.`;
  // [280]
  if (/as tribos do leste retornam a seu territorio/i.test(p))
    return `Senhor, a missão pontual das tribos do leste terminou — mas o mandato de amar a ti e andar nos teus caminhos não termina depois que o encargo é cumprido. Guarda-me de tratar o discipulado como fase temporária que encerra quando o projeto termina. Amém.`;
  // [281]
  if (/o altar das tribos do leste/i.test(p))
    return `Pai, o altar que quase causou guerra era na verdade um memorial. Antes de acusar, ajuda-me a perguntar. Antes de mobilizar confronto, ajuda-me a buscar a intenção. Que eu seja rápido para ouvir e lento para declarar apostasia no que ainda não entendi. Amém.`;
  // [282]
  if (/josue exorta o povo/i.test(p))
    return `Senhor que combates por nós, a lógica de "um perseguirá mil" não é entusiasmo — é aritmética da aliança. Que eu nunca me intimide pela desproporção numérica quando estou sob a tua cobertura. E que a mesma seriedade com que recebo as bênçãos me faça levar a sério a advertência: a Palavra que cumpriu o bem cumprirá o mal se eu abandonar a aliança. Amém.`;
  // [283]
  if (d.livroAbrev === 'Js' && /as tribos renova a alianca/i.test(p))
    return `Deus de Siquém, "escolhei hoje a quem servireis" — tu colocas a escolha sem garantir a resposta. Eu escolho a ti hoje, não por herança familiar nem por costume religioso, mas porque tu és o Deus que tirou Terá de Ur, que atravessou o Jordão e que nunca falhou com uma palavra. Quanto a mim, servirei ao Senhor. Amém.`;
  // [284]
  if (/morte de josue e eleazar/i.test(p))
    return `Pai que lembras de promessas através das gerações, os ossos de José foram enterrados em Siquém — promessa do Gênesis cumprida no encerramento de Josué. Que eu viva com a certeza de que as promessas que recebi e não verei cumpridas em vida serão enterradas no lugar certo, no tempo certo, pelo Deus que nunca esquece. Amém.`;

  // ── JUÍZES ───────────────────────────────────────────────────────────
  // [285]
  if (/de israel fracasso a completo conquista de canaa/i.test(p))
    return `Senhor, o mapa do fracasso de Israel começa com vitórias parciais e termina em recuo. Guarda-me do compromisso incompleto que parece tolerável mas prepara a apostasia da geração seguinte. Que eu não deixe cananeus que deveriam ser expulsos porque a conquista parcial já parece suficiente. Amém.`;
  // [286]
  if (/de israel infidelidade/i.test(p))
    return `Deus de Boquim, o ciclo que Juízes descreve é tão familiar que me assusta. Que eu reconheça o padrão na minha própria vida — não para me condenar, mas para interrompê-lo antes que a opressão seja necessária para me fazer clamar. Que o choro de Boquim aconteça antes da servidão, não por causa dela. Amém.`;
  // [287]
  if (/otoniel/i.test(p))
    return `Senhor, a narrativa de Otoniel não tem drama — apenas obediência limpa, Espírito recebido, vitória e descanso. Que eu não desprezar a estação de fidelidade silenciosa. Nem todo chamado tem a história de Gideão. Que o meu seja fiel ao formato que tu determinaste para mim, sem inveja do formato mais dramático dos outros. Amém.`;
  // [288]
  if (/eude/i.test(p))
    return `Pai, Eúde tinha uma espada de dois gumes e coragem para uma missão solitária. O maior período de descanso em Juízes nasceu da ação mais silenciosa. Usa o que está na minha mão — por mais improvável que pareça — para a libertação que só tu podes planejar. Amém.`;
  // [289]
  if (/sangar/i.test(p))
    return `Senhor, Sangar tinha uma aguilhada de bois e libertou Israel. Que eu não aguarde ferramentas extraordinárias para exercer o chamado que tens para mim. O que está na minha mão hoje, consagrado a ti, pode ser suficiente para o que precisas fazer através de mim. Amém.`;
  // [290]
  if (/debora e baraque/i.test(p))
    return `Deus que levantaste Débora quando os homens hesitavam, tu não esperas pelo líder ideal — levantas quem está disponível. Guarda-me da hesitação de Baraque, que transferiu a glória por medo. E quando for chamado a avançar, que eu avance sem exigir que alguém mais corajoso vá na frente. Amém.`;
  // [291]
  if (d.livroAbrev === 'Jz' && /o cantico de debora/i.test(p))
    return `Senhor dos exércitos, os astros lutaram contra Sísera — o cosmos obedece quando tu entras na batalha. Que eu cante a vitória com honestidade: ela é gloriosa para quem está do teu lado e devastadora para o outro. Não posso suavizar o que o teu julgamento implica. Que o meu louvor seja tão honesto quanto o de Débora. Amém.`;
  // [292]
  if (/o chamado de gideao/i.test(p))
    return `Pai, tu chamaste Gideão de "homem valente" quando ele estava escondido. Esse é o teu jeito: tu nomeias o que vamos ser antes de ser. Que eu receba hoje o nome que tu me dás — não o que a minha circunstância sugere — e que esse nome me mova a levantar do lagar onde me escondi. Amém.`;
  // [293]
  if (/gideao destroi o altar de baal/i.test(p))
    return `Senhor, o pai de Gideão disse "que Baal se defenda por si mesmo" — e o ídolo não se defendeu. Que eu nunca gaste energia defendendo o que deveria defender a si mesmo. O verdadeiro Deus não precisa de minha proteção — precisa da minha obediência. E os ídolos que precisam de defensores já se denunciaram. Amém.`;
  // [294]
  if (/o sinal do velo/i.test(p))
    return `Pai paciente, tu atendeste ao velo molhado e ao velo seco sem repreender Gideão. Obrigado pela tua paciência com as minhas dúvidas. E ajuda-me a entender que a confirmação que recebi não elimina o custo da obediência — o exército de 300 vinha logo depois dos sinais. Que eu receba a confirmação com gratidão e siga até a batalha reduzida. Amém.`;
  // [295]
  if (/gideao surpreende e derrota os midianitas/i.test(p))
    return `Deus que reduziste 32.000 para 300 para que a vitória não tivesse endereço humano, que eu nunca confie nos números quando tu me chamaste para algo que só pode ser explicado por ti. Que os cântaros quebrados e as tochas reveladas sejam o meu testemunho: o que brilha veio de dentro de um vaso fraco. Amém.`;
  // [296]
  if (/gideao e efraim/i.test(p))
    return `Senhor da resposta suave, Gideão desarmou Efraim com honra em vez de autoridade. Que eu aprenda a honrar antes de reivindicar. Em conflitos ministeriais, a palavra que afirma a contribuição do outro é mais poderosa do que a defesa dos próprios direitos. Que eu seja mais Gideão do que Efraim nos desentendimentos que encontrar. Amém.`;
  // [297]
  if (/de gideao vinganca/i.test(p))
    return `Pai da justiça, Sucote apostou que Gideão não voltaria — e errou. Que eu não aposte na impunidade do que foi prometido pelo teu Espírito. E que eu seja a pessoa que cumpre o que disse, no tempo que prometeu, sem esquecer nem o incentivo nem a advertência que pronunciou. Amém.`;
  // [298]
  if (/de gideao idolatria/i.test(p))
    return `Senhor, Gideão recusou o reino mas fez um éfode — e Israel se prostituiu diante dele. Guarda-me dos objetos, símbolos e estruturas que centralizam a devoção dos outros em mim sem que eu os tenha pedido explicitamente. A boa intenção não protege contra o resultado idolátrico. Que eu seja instrumento que aponta para ti, não para onde se pára. Amém.`;
  // [299]
  if (/morte de gideao/i.test(p))
    return `Pai, Israel esqueceu o Senhor antes de Gideão ser enterrado. Que eu não dependa de um líder humano para manter a minha fidelidade — porque líderes morrem. Que a minha gratidão espiritual seja cultivada ativamente, não apenas reativa à presença dos que me inspiram. A memória de Deus é responsabilidade minha, não de quem está ao meu lado. Amém.`;
  // [300]
  if (/a queda de abimeleque/i.test(p))
    return `Deus que julgas com simetria, Abimeleque matou sobre uma pedra e morreu por uma pedra — lançada por uma mulher. Que eu nunca esqueça que o mesmo instrumento do meu pecado pode tornar-se instrumento do meu julgamento. E que a parábola de Jotão me faça desconfiar de qualquer liderança que sobe pelo derramamento do sangue dos irmãos. Amém.`;
  // [301]
  if (d.livroAbrev === 'Jz' && /tola/i.test(p))
    return `Senhor que honras a fidelidade silenciosa, Tolá habitou em Samir, julgou vinte e três anos e morreu. Sem batalha registrada, sem crise narrada. Que eu não desprezar a estação em que minha vocação é simplesmente ocupar o lugar designado com constância. O registro silencioso também é honrado por ti. Amém.`;
  // [302]
  if (d.livroAbrev === 'Jz' && /jair/i.test(p))
    return `Pai, Jair teve trinta filhos, trinta jumentos e trinta cidades — e o texto não condena nem celebra. Tu julgaste a sua fidelidade, não a sua conta bancária. Que eu não use a prosperidade nem a pobreza como termômetro de aprovação divina. O que tu perguntas é se ocupei o meu chamado. Amém.`;
  // [303]
  if (/opressao por amonitas/i.test(p))
    return `Senhor que respondes "ide clamar aos deuses que escolhestes", às vezes a tua pedagogia é deixar que a consequência das minhas escolhas seja o professor. Que quando o desconforto do distanciamento de ti me mover ao clamor, eu não apenas clame — mas remova os deuses estrangeiros que instalei. A angústia de Deus pela miséria do seu povo é o versículo mais comovente desta perícope. Amém.`;
  // [304]
  if (/jefte/i.test(p))
    return `Pai, Jefté venceu a batalha e perdeu a filha. O voto feito a ti não pode ser desfeito pelo sucesso subsequente. Que eu seja cuidadoso com o que prometo diante de ti — especialmente nos momentos de pressão, quando as promessas saem de uma ânsia que não pensa nas consequências. O que prometo importa mais do que o que conquisto. Amém.`;
  // [305]
  if (/ibsa/i.test(p))
    return `Senhor, Ibsã teceu alianças com famílias de fora para todos os seus filhos e filhas. Que a nossa comunidade também teça vínculos com o mundo ao redor — não para ser conformada, mas para estar presente. A missão às vezes tem a forma de um casamento, não de uma batalha. Amém.`;
  // [306]
  if (/elom/i.test(p))
    return `Pai, Elom tem tribo, tempo e sepultura — e nada mais. Há uma santidade na vida que não deixa rastros espetaculares. Que eu não meça o valor do meu serviço pela quantidade da narrativa que gera. Fui chamado para ser fiel, não para ser memorável. Amém.`;
  // [307]
  if (/abdao/i.test(p))
    return `Senhor, Abdão tinha setenta herdeiros montados em jumentos — abundância visível. Que a bênção que recebi seja testemunho da tua provisão e não tropeço para a vaidade. E que os que vêm depois de mim não precisem de crise para lembrar de onde veio o que têm. Amém.`;
  // [308]
  if (/a profecia de de sansao nascimento/i.test(p))
    return `Deus cujo nome é maravilhoso, o anjo que anunciou Sansão não revelou seu nome para que a atenção ficasse em ti. Que o meu serviço seja assim — sem precisar que meu nome seja lembrado, desde que o teu seja glorificado no resultado. Que o Espírito que começa a mover seja reconhecido antes que a história se complique. Amém.`;
  // [309]
  if (/de sansao casamento/i.test(p))
    return `Pai, a charada de Sansão sobre o mel no leão tinha uma origem que ele preferia não mencionar — uma concessão escondida no início da história. Guarda-me de construir sabedoria sobre transgressões que fingi não existirem. O que não confesso continua presente na estrutura do que construo. Amém.`;
  // [310]
  if (/sansao e tres cem raposas/i.test(p))
    return `Senhor, a ofensa de Sansão incendiou o sustento de uma população inteira. Que eu reconheça que os meus pecados nunca ficam contidos em mim — eles queimam o que está ao redor. A espiral de vingança não termina onde começa. Antes de acender a tocha, que eu considere o que vai queimar além do meu alvo imediato. Amém.`;
  // [311]
  if (/sansao derrota filisteus/i.test(p))
    return `Deus que abres rochas para os que têm sede, Sansão matou mil com a queixada e quase morreu de sede logo depois. Tu não criticas a sede — abres a rocha. Que eu não me envergonhe das necessidades ordinárias que seguem os momentos extraordinários. O mesmo Deus que usa o excepcional cuida do cotidiano. Amém.`;
  // [312]
  if (/sansao e dalila/i.test(p))
    return `Pai, "não sabia que o Senhor o havia deixado" é o versículo mais assustador de Juízes. Guarda-me de afastamentos tão graduais que eu deixe de perceber a tua ausência. Que a pressão diária acumulada não me eroda — e que eu reconheça quando estou cedendo por exaustão o que prometei guardar por convicção. Amém.`;
  // [313]
  if (/de sansao morte/i.test(p))
    return `Senhor que te lembras, "lembra-te de mim" — cego, acorrentado, sem passado apresentável. E tu te lembraste. Não há momento tarde demais para me virar a ti. Não há condição tão degradada que te impeça de responder. Que a oração de Sansão me ensine que o que importa não é o que tenho para oferecer, mas a quem me dirijo. Amém.`;
  // [314]
  if (/a migracao de da/i.test(p))
    return `Senhor, o levita de Mica seguiu o poder mais forte e chamou isso de ministério. Guarda-me de um sacerdócio que serve quem paga melhor. Que o meu ministério tenha raízes na tua revelação — não na estrutura que mais me convém no momento. E que os ídolos que carrego comigo ao migrar sejam identificados antes de serem instalados no novo lugar. Amém.`;
  // [315]
  if (/o crime de gibea/i.test(p))
    return `Pai, Juízes termina com o que começa em Gênesis 19 — violência que espelha Sodoma. O diagnóstico não é falta de monarquia — é ausência de Senhor. Que eu nunca busque estruturas externas para fazer o que só a tua presença interna pode fazer. O rei que Israel precisava eras tu. O rei que eu preciso também és tu. Amém.`;

  // Mateus orações [1]–[145]
  if (d.livroAbrev === 'Mt' && /genealogia de jesus/i.test(p))
    return `Pai, tu entraste na história humana com todas as suas irregularidades. Nomes improváveis estão na linhagem do Messias — e isso me inclui. Que eu nunca ache minha história demasiado quebrada para ser parte do teu plano. Amém.`;
  if (d.livroAbrev === 'Mt' && /nascimento de jesus/i.test(p))
    return `Senhor, José obedeceu sem entender tudo. Dá-me coragem para agir quando és claro, mesmo quando não vejo o quadro completo. Que minha obediência silenciosa abra espaço para o teu cumprimento. Amém.`;
  if (d.livroAbrev === 'Mt' && /visita.*magos|magos/i.test(p))
    return `Deus, os magos vieram de longe para adorar. Afasta em mim tudo que é Herodes — o medo do teu reino, a hostilidade disfarçada de interesse. Que minha adoração seja genuína como a deles, sem calcular o custo. Amém.`;
  if (d.livroAbrev === 'Mt' && /fuga.*egito|fuga a egito/i.test(p))
    return `Pai, José levantou de noite porque confiou na tua voz. Ensina-me a obedecer prontamente, sem esperar confirmação de todo mundo. Que a proteção da minha família comece na minha disponibilidade de mover quando tu falas. Amém.`;
  if (d.livroAbrev === 'Mt' && /massacre.*bebes/i.test(p))
    return `Senhor, este texto não deixa escapar o peso do sofrimento inocente. Ajuda-me a não minimizar a dor real com respostas fáceis. Que eu fique com quem chora, como tu ficaste com Raquel. Amém.`;
  if (d.livroAbrev === 'Mt' && /retorno.*egito|retorno de egito/i.test(p))
    return `Deus, tu guiaste José passo a passo — um sonho de cada vez. Guarda-me da ansiedade de precisar saber todo o plano de uma vez. Que eu confie no próximo passo que tu mostras, sem exigir o mapa completo. Amém.`;
  if (d.livroAbrev === 'Mt' && /proclamacao.*joao.*batista|proclamacao de joao/i.test(p))
    return `Pai, João preparou o caminho com arrependimento e frutos. Mostra-me o que em minha vida ainda não corresponde ao que declaro crer. Que meu arrependimento produza frutos visíveis, não apenas sentimentos passageiros. Amém.`;
  if (d.livroAbrev === 'Mt' && /batismo de jesus/i.test(p))
    return `Senhor, antes de qualquer obra tu declaraste Jesus como teu Filho amado. Que eu viva do meu batismo — da identidade que tu me dás — antes de tentar provar algo pelo desempenho. Que tua voz sobre mim seja mais alta do que a avaliação dos outros. Amém.`;
  if (d.livroAbrev === 'Mt' && /tentacao de jesus/i.test(p))
    return `Pai, Jesus resistiu com a Palavra. Forma em mim não apenas o conhecimento da Escritura, mas o discernimento para usá-la corretamente. Que eu reconheça as tentações que chegam com aparência de razoável e responda com a tua verdade. Amém.`;
  if (d.livroAbrev === 'Mt' && /jesus.*ministerio.*galile|jesus inicia.*ministerio/i.test(p))
    return `Senhor, a prisão de João não interrompeu o teu plano — foi o sinal do próximo capítulo. Quando o que me parecia central for silenciado, que eu confie que tu já preparaste o que vem a seguir. Amém.`;
  if (d.livroAbrev === 'Mt' && /chama.*primeiros.*discipulos|jesus chama/i.test(p))
    return `Jesus, tu chamaste e eles deixaram imediatamente. Perdoa minha lentidão de resposta, minha negociação com o chamado. Que quando tu falares, eu deixe o que precisa ser deixado sem prolongar a conversa com o que fica. Amém.`;
  if (d.livroAbrev === 'Mt' && /jesus ministra.*multidoes/i.test(p))
    return `Pai, Jesus ministrou movido por compaixão, não por estratégia. Desperta em mim a compaixão pelas pessoas ao meu redor antes que eu pense em programa ou método. Que o amor real preceda qualquer plano de alcance. Amém.`;
  if (d.livroAbrev === 'Mt' && /bem.*aventurancas/i.test(p))
    return `Senhor, tu declaraste benditos os que o mundo marginaliza. Desafia minha escala de valores onde ainda reproduzo a lógica do mundo. Que o reino dos céus seja o critério da minha admiração e da minha aspiração. Amém.`;
  if (d.livroAbrev === 'Mt' && /sal e luz/i.test(p))
    return `Pai, tu disseste que eu sou — não que posso ser — sal e luz. Ajuda-me a viver da identidade que tu me dás em vez de tentar construí-la. Que minha vida dê sabor e clareza onde há insipidez e escuridão, para que vejam tuas boas obras. Amém.`;
  if (d.livroAbrev === 'Mt' && /lei e.*profetas|lei e os profetas/i.test(p))
    return `Senhor Jesus, tu vieste cumprir a lei, não abolir. Guarda-me do antinomismo que despreza teus mandamentos e do legalismo que os cumpre sem amor. Que a tua lei escrita em meu coração produza justiça que exceda a dos fariseus. Amém.`;
  if (d.livroAbrev === 'Mt' && /sobre.*ira|sobre a ira/i.test(p))
    return `Pai, há reconciliações que preciso buscar antes de continuar adorando. Dá-me humildade para ir primeiro ao irmão, mesmo quando a ofensa não foi minha. Que nenhuma oferta chegue ao teu altar enquanto carrego uma ruptura que posso resolver. Amém.`;
  if (d.livroAbrev === 'Mt' && /adulterio e divorcio|sobre.*adulterio/i.test(p))
    return `Senhor, a pureza começa no olhar. Guarda meus olhos do que alimenta o que não devo desejar. Forma em mim um coração que honra o compromisso no silêncio, não apenas nas declarações públicas. Amém.`;
  if (d.livroAbrev === 'Mt' && /sobre.*juramentos/i.test(p))
    return `Pai, que meu sim seja sim e meu não seja não. Onde minha palavra perdeu credibilidade, restaura minha integridade através de ação consistente ao longo do tempo. Que eu não precise de juramentos para ser acreditado. Amém.`;
  if (d.livroAbrev === 'Mt' && /sobre.*retaliacao/i.test(p))
    return `Jesus, tu ensinaste a dar a outra face, caminhar a milha extra, dar a túnica. Isso é impossível por força própria. Encheme do teu amor para que eu possa responder ao mal com o bem, quebrando o ciclo que o mal quer perpetuar. Amém.`;
  if (d.livroAbrev === 'Mt' && /amor.*inimigos|amor para inimigos/i.test(p))
    return `Pai, tu fazes chover sobre justos e injustos. Onde eu amo apenas quem me ama, ainda não alcancei teu padrão. Dá-me graça para orar pelos que me perseguem, não como exercício, mas como participação no teu coração. Amém.`;
  if (d.livroAbrev === 'Mt' && /sobre.*esmola/i.test(p))
    return `Senhor, libera-me do desejo de ser visto sendo generoso. Que eu dê sem audiência, confie que teus olhos veem no secreto, e que a única aprovação que busco é a tua. Amém.`;
  if (d.livroAbrev === 'Mt' && /sobre.*oracao.*mt.*6\.5|sobre a oracao/i.test(p))
    return `Pai, que minha oração em público seja o reflexo da minha oração no quarto fechado. Onde ore para ser visto, perdoa e renova meu motivo. Que tu sejas meu único destinatário quando falo contigo. Amém.`;
  if (d.livroAbrev === 'Mt' && /oracao do senhor|pai nosso|nao senhor oracao/i.test(p))
    return `Pai nosso, ensina-me a orar na ordem que Jesus ensinou: teu nome, teu reino, tua vontade — depois minhas necessidades. Forma em mim um coração que prioritiza o que tu priorizas antes de chegar ao que eu preciso. Amém.`;
  if (d.livroAbrev === 'Mt' && /sobre.*jejum/i.test(p))
    return `Senhor, quando jejuar, que seja entre mim e tu. Libera-me da performance religiosa que precisa de plateia. Que o jejum me abra para a tua voz e não para a admiração alheia. Amém.`;
  if (d.livroAbrev === 'Mt' && /sobre.*tesouros/i.test(p))
    return `Pai, onde está meu tesouro, está meu coração. Mostra-me o que de fato ocupa o lugar de segurança na minha vida. Que eu invista no que não a traça nem a ferrugem corrói, e que meu coração siga. Amém.`;
  if (d.livroAbrev === 'Mt' && /olho sao|sao olho/i.test(p))
    return `Senhor, guarda meus olhos do que enche meu corpo de trevas. Que o que eu escolho ver, ler, assistir e meditar forme em mim luz, não escuridão. Que meu olho seja são para que todo meu ser seja iluminado. Amém.`;
  if (d.livroAbrev === 'Mt' && /nao.*ansioso|nao fique ansioso/i.test(p))
    return `Pai dos lírios e das aves, afasta de mim a ansiedade que divide minha lealdade entre ti e Mamom. Que eu busque primeiro o teu reino hoje, confiando que as coisas necessárias serão acrescentadas. Amém.`;
  if (d.livroAbrev === 'Mt' && /judging others|julgamento.*outros/i.test(p))
    return `Senhor, antes de ver a farpela no olho do irmão, mostra-me a trave no meu. Dá-me humildade para o autoexame honesto antes do julgamento do outro. Que meu discernimento venha de olho limpo, não de olho crítico. Amém.`;
  if (d.livroAbrev === 'Mt' && /ask.*busca.*bate|pedi.*buscai.*batei/i.test(p))
    return `Pai, tu és melhor do que qualquer pai humano em dar boas coisas aos que pedem. Libera-me da hesitação em pedir, da timidez em buscar, da desistência antes de bater. Que eu persista em oração confiando no teu caráter, não no meu mérito. Amém.`;
  if (d.livroAbrev === 'Mt' && /estreito.*porta|porta estreita/i.test(p))
    return `Jesus, tu es a porta estreita. Guarda-me de preferir o caminho de menor resistência porque é mais popular. Que eu entre pelo que conduz à vida, mesmo que poucos escolham esse caminho. Amém.`;
  if (d.livroAbrev === 'Mt' && /arvore.*fruto|um arvore e fruto/i.test(p) && d.capitulos.startsWith('7'))
    return `Pai, os frutos revelam as raízes. Examina minha vida e mostra-me o que os frutos dizem sobre o estado do coração. Onde há frutos ruins, não me deixa apenas podar — vai à raiz. Amém.`;
  if (d.livroAbrev === 'Mt' && /auto.*engano|engano de si mesmo/i.test(p))
    return `Senhor, guarda-me de um "Senhor, Senhor" sem obediência real. Não quero um ministério que te envergonha no final. Que eu te conheça e seja conhecido por ti — não apenas que realize coisas em teu nome. Amém.`;
  if (d.livroAbrev === 'Mt' && /ouvintes.*praticantes|que ouvem.*praticam/i.test(p))
    return `Pai, o Sermão do Monte pergunta sobre meu fundamento. Ajuda-me a não apenas ouvir e aplaudir — mas praticar. Que minha vida seja construída sobre a rocha da obediência, visível na resistência às tempestades. Amém.`;
  if (d.livroAbrev === 'Mt' && /jesus purifica um leproso/i.test(p))
    return `Senhor, como o leproso, eu te digo: se quiseres, podes. Não presumo — confio. Que minha oração carregue tanto a fé de que podes quanto a humildade de reconhecer que tu decides. Amém.`;
  if (d.livroAbrev === 'Mt' && /centuriao|cura.*servo.*centuriao/i.test(p))
    return `Jesus, o centurião entendeu autoridade delegada melhor do que os religiosos. Aumenta minha fé na tua palavra — que eu confie que quando tu dizes, é feito. Que minha fé não precise da tua presença física para agir. Amém.`;
  if (d.livroAbrev === 'Mt' && /casa de pedro|cura.*casa de pedro/i.test(p))
    return `Senhor, tu curaste no íntimo da casa de Pedro e em seguida as multidões. Que o teu cuidado comigo no privado me encha de compaixão pelo público ao meu redor. Que o milagre pessoal me torne disponível para o coletivo. Amém.`;
  if (d.livroAbrev === 'Mt' && /would.*be.*seguidores|seguidores de jesus/i.test(p))
    return `Jesus, tu foste honesto sobre o custo do seguimento. Guarda-me de um compromisso superficial baseado no conforto esperado. Que eu entenda o que significa seguir-te antes de declarar que te sigo. Amém.`;
  if (d.livroAbrev === 'Mt' && /acalma.*tempestade|jesus acalma/i.test(p))
    return `Senhor da tempestade e da bonança, quando o barco balance e eu entre em pânico, ajuda-me a acordar tu — não para exigir que a tempestade pare, mas para lembrar que tu estás no barco. A tua presença é maior do que a tormenta. Amém.`;
  if (d.livroAbrev === 'Mt' && /gadarenos|endemoninhados.*gadara/i.test(p))
    return `Pai, a cidade pediu que Jesus fosse embora após a libertação porque o custo parecia alto. Guarda-me de preferir a estabilidade do familiar à liberdade que tu ofereces. Que eu não peça que te retires quando tua presença começa a custar algo. Amém.`;
  if (d.livroAbrev === 'Mt' && /jesus cura um paralitico/i.test(p))
    return `Senhor, tu viste o que meus amigos não viram — o que estava dentro antes do que estava fora. Cura primeiro o que está escondido. Onde carrego culpa não confessada, perdoa. Onde carrego vergonha, liberta. Depois, o que for preciso no corpo, tu sabes. Amém.`;
  if (d.livroAbrev === 'Mt' && /chamado de mateus/i.test(p))
    return `Jesus, tu sentaste com Mateus e seus amigos sem precisar de uma abertura formal. Dá-me coragem de sentar onde as pessoas estão, sem esperar que venham à minha estrutura. Que minha presença seja convite, como a tua foi para Mateus. Amém.`;
  if (d.livroAbrev === 'Mt' && /questao.*jejum|pergunta.*jejum/i.test(p))
    return `Senhor, onde ainda tento colocar o evangelho em estruturas antigas, liberta-me. Que eu não resista ao novo que tu fazes por apego ao que era confortável. Que o vinho novo encontre odres que se dobraram à tua renovação. Amém.`;
  if (d.livroAbrev === 'Mt' && /filha de jairo|menina.*mulher.*curou/i.test(p))
    return `Pai, tu atendeste no caminho — a mulher foi curada enquanto Jesus ia para a menina. Ajuda-me a reconhecer que a interrupção no meu caminho pode ser a tua missão para mim naquele momento. Que eu não trate como distração o que tu tratas como destino. Amém.`;
  if (d.livroAbrev === 'Mt' && /jesus cura dois.*cego/i.test(p) && d.capitulos.startsWith('9'))
    return `Senhor, tu perguntaste: credes que posso? A minha resposta é sim. Onde minha fé está fraca, fortalece-a. Onde está presunçosa, humilha-a. Que meu "sim, Senhor" seja genuíno e não automático. Amém.`;
  if (d.livroAbrev === 'Mt' && /jesus cura um.*mudo|cura.*mudo/i.test(p))
    return `Pai, o mesmo milagre dividiu a multidão e os fariseus. Guarda-me de atribuir ao diabo o que vejo teu Espírito fazer porque não cabe na minha categoria. Que eu tenha olhos abertos para reconhecer tua obra. Amém.`;
  if (d.livroAbrev === 'Mt' && /messe.*grande.*operarios|colheita.*grande/i.test(p))
    return `Senhor da messe, a colheita é grande e os obreiros são poucos. Antes de reclamar da escassez, faz de mim um obreiro disponível. Que minha primeira resposta ao ver a messe seja oração, não estratégia. Amém.`;
  if (d.livroAbrev === 'Mt' && /doze apostolos/i.test(p))
    return `Pai, tu escolheste pescadores, um publicano, um zelote. Não buscaste os mais qualificados — buscaste os disponíveis. Que eu pare de esperar me tornar mais qualificado para servir e simplesmente me apresente disponível. Amém.`;
  if (d.livroAbrev === 'Mt' && /missao.*doze/i.test(p))
    return `Jesus, tu enviaste sem bolsa extra, dependendo de hospitalidade. Onde eu controlo demais minha segurança material, liberta-me. Que eu confie que onde tu me envias, tu já preparaste o que é necessário. Amém.`;
  if (d.livroAbrev === 'Mt' && /vinda.*perseguicoes|perseguicoes futuras/i.test(p))
    return `Senhor, tu avisaste que perseguição viria. Onde eu sofro rejeição por fidelidade a ti, ajuda-me a não interpretar isso como fracasso. Que a oposição não me faça recuar do que tu me chamaste a dizer e ser. Amém.`;
  if (d.livroAbrev === 'Mt' && /quem.*temer|a quem.*fear/i.test(p))
    return `Pai, o medo dos homens tem me silenciado onde deveria falar. Enche-me do temor de Deus que liberta do temor humano. Que o conhecimento de que meus cabelos estão contados me dê coragem para confessar teu nome. Amém.`;
  if (d.livroAbrev === 'Mt' && /nao.*paz.*espada/i.test(p))
    return `Jesus, tu avisaste que teu chamado pode criar tensão com as lealdades mais próximas. Dá-me graça para amar família e ainda assim ter clareza sobre qual lealdade é suprema. Que eu te ame mais do que os que mais amo. Amém.`;
  if (d.livroAbrev === 'Mt' && /as recompensas|recompensas/i.test(p))
    return `Senhor, quem recebe o teu mensageiro te recebe. Que eu receba bem os que tu envias, mesmo os sem títulos impressionantes. E que minha hospitalidade com os pequenos seja reconhecida por ti como hospitalidade ao Mestre. Amém.`;
  if (d.livroAbrev === 'Mt' && /mensageiros.*joao.*batista|enviados.*joao/i.test(p))
    return `Pai, João perguntou da prisão: és tu? E tu respondeste com obras. Quando minha fé vacilar, direciona meu olhar para o que estás fazendo — cegos que veem, coxos que andam, pobres que ouvem as boas novas. Que as obras respondam às minhas dúvidas. Amém.`;
  if (d.livroAbrev === 'Mt' && /lamentos.*cidades|cidades impenitentes/i.test(p))
    return `Senhor, Corazim viu milagres e não se arrependeu. Guarda-me de acumular experiências religiosas sem transformação real. Que o privilégio de conhecer o teu evangelho produza em mim resposta, não apenas familiaridade. Amém.`;
  if (d.livroAbrev === 'Mt' && /jesus agradece.*pai|agradece ao pai/i.test(p))
    return `Jesus, tu convidaste os cansados e sobrecarregados a vir. Eu venho. Carrego o que não consigo mais. Ensina-me a colocar teu jugo — que é leve porque tu carregas comigo. Que eu aprenda de ti, que és manso e humilde de coração. Amém.`;
  if (d.livroAbrev === 'Mt' && /colhendo.*espigas.*sabado|questao.*sabado/i.test(p))
    return `Senhor do sábado, guarda-me do legalismo que protege a regra às custas da pessoa. Ensina-me a reconhecer quando misericórdia pesa mais do que sacrifício ritual. Que eu seja como tu — que o ser humano importa mais do que a observância. Amém.`;
  if (d.livroAbrev === 'Mt' && /homem.*mao.*ressequida|mao.*seca/i.test(p))
    return `Pai, os fariseus saíram para complotar após uma cura. Guarda-me do endurecimento religioso que vê a obra de Deus e responde com hostilidade. Que minha religiosidade produza abertura ao teu agir, não fechamento. Amém.`;
  if (d.livroAbrev === 'Mt' && /servo.*escolhido.*deus|servo de deus/i.test(p))
    return `Senhor, o teu servo escolhido não contendeu nem gritou nas praças. Onde busco visibilidade para o que faço, humilha-me. Que eu sirva em quietude, confiando que os teus olhos veem o que a plateia não precisa ver. Amém.`;
  if (d.livroAbrev === 'Mt' && /jesus e belzebu|beelzebul/i.test(p))
    return `Pai, guarda-me de atribuir ao mal o que é claramente tua obra. Mantém meu coração aberto ao teu Espírito para que não chegue perto da blasfêmia que endurece a percepção do bem. Que eu sempre reconheça tua mão quando ela age. Amém.`;
  if (d.livroAbrev === 'Mt' && /arvore.*fruto|um arvore e fruto/i.test(p) && d.capitulos.startsWith('12'))
    return `Senhor, as palavras revelam o coração. Quando saem palavras de mim que me envergonham, não me deixa apenas controlar o discurso — vai ao coração e transforma a fonte. Que a abundância do que há dentro seja boa. Amém.`;
  if (d.livroAbrev === 'Mt' && /exigencia.*sinal.*mt.*12|sinal.*mt.*12/i.test(p))
    return `Pai, Nínive se arrependeu com um sermão. Eu tenho o evangelho completo. Que a abundância da tua revelação em minha vida produza arrependimento genuíno e não apenas familiaridade confortável. Amém.`;
  if (d.livroAbrev === 'Mt' && /verdadeira.*familia.*jesus|parentes.*jesus/i.test(p))
    return `Jesus, tu redefiniste família como aqueles que fazem a vontade do teu Pai. Que eu faça parte desta família não por nascimento ou cultura religiosa, mas pela obediência real. Que a lealdade ao Pai seja o centro da minha identidade. Amém.`;
  if (d.livroAbrev === 'Mt' && /parabola do semeador.*mt|semeador.*mt.*13\.1/i.test(p))
    return `Senhor, examina o solo do meu coração hoje. Onde está endurecido como caminho, amolece. Onde está pedregoso sem profundidade, aprofunda. Onde os espinhos me preocupam e sufocam, limpa. Que eu seja boa terra que produz fruto abundante. Amém.`;
  if (d.livroAbrev === 'Mt' && /semeador.*explicou|semeador.*explicada/i.test(p))
    return `Pai, os discípulos receberam a explicação da parábola porque perguntaram. Ensina-me a não ficar satisfeito com a superfície — a perguntar, a buscar entender, a não partir até que a palavra faça sentido no coração. Amém.`;
  if (d.livroAbrev === 'Mt' && /parabola.*reino.*ceu.*1|parabola.*reino.*ceu.*mt.*13\.24/i.test(p))
    return `Senhor, o reino começa como semente de mostarda. Guarda-me de desprezar os começos pequenos ou de tentar apressar o crescimento com meus métodos. Que eu plante, regue e confie que tu dás o crescimento. Amém.`;
  if (d.livroAbrev === 'Mt' && /parabola.*reino.*ceu.*2|parabola.*reino.*ceu.*mt.*13\.36/i.test(p))
    return `Pai, o tesouro e a pérola justificam a venda de tudo. Onde ainda seguro algo que não entrego ao teu reino, mostra-me o valor do que estou perdendo por segurar o que tenho. Que eu venda com alegria o que precisa ser vendido. Amém.`;
  if (d.livroAbrev === 'Mt' && /tesouros novos.*velhos|tesouros novos e velhos/i.test(p))
    return `Senhor, faz de mim um escriba instruído para o teu reino — capaz de tirar do tesouro coisas novas e antigas. Que a tradição me alimente e a tua renovação me atualize, sem perder nenhum dos dois. Amém.`;
  if (d.livroAbrev === 'Mt' && /rejeicao.*jesus.*nazare|rejection.*nazare/i.test(p))
    return `Pai, a familiaridade com o evangelho pode ser o maior obstáculo à fé. Guarda-me de uma relação com as Escrituras que é cultural mas não transformadora. Que eu me surpreenda com Jesus como se fosse a primeira vez. Amém.`;
  if (d.livroAbrev === 'Mt' && /morte de joao.*batista/i.test(p))
    return `Senhor, Herodes matou João para não perder a cara diante dos convidados. Guarda-me do medo da opinião alheia que me leva a decisões que sei que são erradas. Que a lealdade à verdade pese mais do que a aprovação da plateia. Amém.`;
  if (d.livroAbrev === 'Mt' && /feeding cinco mil|multiplicacao.*cinco.*paes/i.test(p))
    return `Jesus, tu abençoaste o que havia disponível e foi suficiente para todos. Onde me recuso a oferecer o que tenho porque parece pouco, liberta-me. Que eu coloque nas tuas mãos o que tenho e confie que tu multiplicas. Amém.`;
  if (d.livroAbrev === 'Mt' && /jesus caminha.*agua|caminha sobre.*agua/i.test(p))
    return `Senhor, Pedro afundou quando desviou o olhar. Onde a tempestade ao redor rouba meu foco de ti, chama-me de volta. Que eu mantenha os olhos em ti mesmo quando as ondas estão visíveis e o vento é forte. Amém.`;
  if (d.livroAbrev === 'Mt' && /enfermos.*genesare|cura.*genesare/i.test(p))
    return `Pai, Genesaré foi alcançada pelo testemunho dos que foram curados. Que minha história com Jesus se torne convite para outros. Que a borda do teu manto ainda seja acessível a quem se aproxima com fé. Amém.`;
  if (d.livroAbrev === 'Mt' && /tradicao dos anciaos/i.test(p))
    return `Senhor, guarda-me de tradições religiosas que substituem teus mandamentos. Onde honro forma sem substância, purifica. Que o que sai do meu coração e da minha boca corresponda ao que declaro acreditar. Amém.`;
  if (d.livroAbrev === 'Mt' && /cananeia|fe.*mulher.*cananeia/i.test(p))
    return `Pai, a cananeia não desistiu após duas recusas. Ensina-me persistência que não desiste quando a resposta demora. Que minha necessidade e minha confiança de que podes ajudar sejam suficientes para me manter orando. Amém.`;
  if (d.livroAbrev === 'Mt' && /jesus cura muitas pessoas|cura muitos enfermos/i.test(p))
    return `Senhor, os mudos falaram, coxos andaram, cegos viram. Tu ainda és o mesmo. Onde há em mim ou ao meu redor necessidade que ainda não foi trazida a ti, que eu a traga hoje com a mesma confiança da multidão de Genesaré. Amém.`;
  if (d.livroAbrev === 'Mt' && /feeding quatro mil|multiplicacao.*sete.*paes/i.test(p))
    return `Pai, tu viste a fome antes que os discípulos percebessem. Ensina-me a ver as necessidades ao meu redor com os teus olhos antes de esperar que outros apontem. Que a compaixão preceda a estratégia na minha vida. Amém.`;
  if (d.livroAbrev === 'Mt' && /exigencia.*sinal.*mt.*16|sinal.*mt.*16/i.test(p))
    return `Senhor, guarda-me de pedir sinais como condição para crer. Onde já recebi evidência suficiente e ainda hesito, é questão de coração, não de prova. Suaviza o que resiste em mim e aumenta minha fé. Amém.`;
  if (d.livroAbrev === 'Mt' && /fermento.*fariseus.*saduceus/i.test(p))
    return `Pai, os discípulos esqueceram os dois milagres de multiplicação e ainda pensaram em falta de pão. Guarda-me do esquecimento espiritual. Que eu cultive memória da tua fidelidade para que as preocupações presentes não apaguem o passado que testemunhei. Amém.`;
  if (d.livroAbrev === 'Mt' && /confissao.*pedro/i.test(p))
    return `Senhor Jesus, tu és o Cristo, o Filho de Deus vivo. Essa confissão não é produto meu — é revelação do teu Pai. Que eu a viva, não apenas a declare. Que a pedra sobre a qual a Igreja é construída seja também o fundamento da minha vida diária. Amém.`;
  if (d.livroAbrev === 'Mt' && /jesus prediz.*morte.*ressurreicao.*mt.*16|morte.*ressurreicao.*predita/i.test(p))
    return `Pai, Pedro confessou Jesus e logo depois o repreendeu. Guarda-me de reconhecer quem é Jesus e ao mesmo tempo resistir ao caminho que ele escolheu. Que minha fé inclua aceitar o caminho da cruz, não apenas a glória da confissão. Amém.`;
  if (d.livroAbrev === 'Mt' && /cruz.*negacao.*si mesmo|abnegacao/i.test(p))
    return `Jesus, perder a vida por ti é encontrá-la. Onde ainda me seguro com medo de perder o que tenho, liberta-me. Que o eu que precisa morrer morra, para que o eu que vive em ti viva de verdade. Amém.`;
  if (d.livroAbrev === 'Mt' && /transfiguracao/i.test(p))
    return `Pai, no monte da transfiguração só restou Jesus. Que em minha vida tudo que não é ele — tradições, sistemas, seguranças — seja relativizado. Que Jesus seja o centro que permanece quando tudo mais passa. Amém.`;
  if (d.livroAbrev === 'Mt' && /elias.*ja.*come|elias ja veio/i.test(p))
    return `Senhor, tu cumpres as promessas de formas que exigem olhos abertos para reconhecer. Onde espero o literal e perco o real, abre meus olhos. Que eu reconheça teu cumprimento mesmo quando não tem o formato que esperava. Amém.`;
  if (d.livroAbrev === 'Mt' && /menino.*demonio|cura.*menino.*endemoninhado/i.test(p))
    return `Pai, os discípulos fizeram o que sabiam e não conseguiram. Às vezes o problema não é método — é fé. Aumenta minha fé onde ela é pequena demais para a montanha que está diante de mim. Amém.`;
  if (d.livroAbrev === 'Mt' && /jesus.*prediz.*novamente|prediz.*segunda.*vez.*morte/i.test(p))
    return `Senhor, os discípulos ficaram muito tristes ao ouvir da morte — e perderam a promessa da ressurreição. Ajuda-me a segurar as duas partes da tua palavra: a morte é real, a ressurreição é certa. Que a certeza do terceiro dia fortaleça meu coração para o que vem antes. Amém.`;
  if (d.livroAbrev === 'Mt' && /imposto.*templo/i.test(p))
    return `Pai, Jesus era livre mas pagou para não ofender. Ensina-me a exercer minha liberdade com consideração pelo próximo. Que eu não use a graça como desculpa para desconsiderar os que ainda estão crescendo. Amém.`;
  if (d.livroAbrev === 'Mt' && /quem.*maior|sobre quem sera/i.test(p))
    return `Jesus, tu mostraste uma criança como modelo de grandeza no reino. Onde meu coração busca reconhecimento e posição, humilha-me. Que eu aprenda a depender de ti como criança antes de tentar ser grande para os outros. Amém.`;
  if (d.livroAbrev === 'Mt' && /vida eterna.*mt.*18|eterno vida/i.test(p))
    return `Senhor, o peso de causar tropeço nos pequenos é real. Que eu leve a sério minha influência sobre quem ainda está crescendo na fé. Que o que ensino, modelo e permito edifique, não derrube. Amém.`;
  if (d.livroAbrev === 'Mt' && /ovelha.*perdida|parabola.*ovelha/i.test(p))
    return `Pai, tu deixas as noventa e nove para buscar a uma. Onde me sinto distante e perdido, vem buscar-me. E onde há alguém ao meu redor que se afastou, move em mim a mesma busca que moves em ti mesmo. Amém.`;
  if (d.livroAbrev === 'Mt' && /corrigir.*irmao|repreendendo.*peca/i.test(p))
    return `Senhor, dá-me coragem para ir ao irmão a sós antes de qualquer outro passo. Que meu objetivo seja ganhar o irmão, não ter razão. E onde fui eu o errado, dá-me humildade para receber a repreensão fraterna como presente. Amém.`;
  if (d.livroAbrev === 'Mt' && /servo.*impiedoso|parabola.*servo.*impiedoso/i.test(p))
    return `Pai, recebi perdão que não merecia. Que esse perdão transforme meu coração e não apenas meu status. Onde ainda seguro rancor de alguém, lembra-me do que me foi perdoado — e liberta-me para perdoar de coração. Amém.`;
  if (d.livroAbrev === 'Mt' && /ensino.*divorcio|sobre.*divorcio/i.test(p))
    return `Senhor, o que Deus uniu, o homem não separe. Onde há casamentos em risco ao meu redor, que a comunidade de fé seja presença de graça e verdade. E onde há fracasso real, que haja cura e não apenas julgamento. Amém.`;
  if (d.livroAbrev === 'Mt' && /jesus.*bencoa.*criancas|abencoa.*criancas/i.test(p))
    return `Jesus, tu disseste: não os impeçais, pois deles é o reino. Guarda nossa comunidade de criar obstáculos à fé das crianças. Que as recebamos com o mesmo entusiasmo que tu demonstraste. Amém.`;
  if (d.livroAbrev === 'Mt' && /jovem rico|rico.*jovem/i.test(p))
    return `Pai, o jovem foi embora triste porque tinha muitas posses. Mostra-me o que no meu coração ocupa o lugar que deveria ser teu. Que eu tenha coragem de largar o que me impede de seguir completamente. Amém.`;
  if (d.livroAbrev === 'Mt' && /perigo.*riquezas|sobre.*riquezas/i.test(p))
    return `Senhor, para Deus tudo é possível — inclusive salvar o rico. Guarda meu coração do apego às riquezas que torna o caminho estreito ainda mais estreito. Que eu use o que tenho como instrumento do reino, não como fundamento da segurança. Amém.`;
  if (d.livroAbrev === 'Mt' && /trabalhadores.*vinha|trabalhadores no vinhedo/i.test(p))
    return `Pai generoso, tu pagas os da última hora o mesmo que os da primeira. Guarda-me do ressentimento com a tua graça para outros. Que eu me alegre com a generosidade que recebi, sem calcular o que outros merecem. Amém.`;
  if (d.livroAbrev === 'Mt' && /terceira.*vez.*prediz|terceiro.*morte.*ressurreicao/i.test(p))
    return `Senhor, tu subiste para Jerusalém sabendo o que te esperava. Dá-me coragem para caminhar na direção do que é certo mesmo quando sei que vai custar. Que a obediência informada seja minha resposta ao teu chamado. Amém.`;
  if (d.livroAbrev === 'Mt' && /pedido.*mae.*tiago.*joao|mae de tiago e joao/i.test(p))
    return `Jesus, a ambição de posição veio até de quem estava mais perto de ti. Examina em mim a motivação do que peço em oração — busco serviço ou status? Que minha ambição no reino seja de servir, não de ser visto servindo. Amém.`;
  if (d.livroAbrev === 'Mt' && /ser.*servo|ser um servo/i.test(p))
    return `Senhor, tu não vieste para ser servido, mas para servir. Onde ainda exijo reconhecimento pelo que faço, humilha-me. Que minha liderança seja serviço real, modelado no teu exemplo e não na lógica dos governantes pagãos. Amém.`;
  if (d.livroAbrev === 'Mt' && /jesus cura dois.*cego/i.test(p) && d.capitulos.startsWith('20'))
    return `Pai, tu perguntaste: que quereis que eu vos faça? Hoje eu te digo o que preciso — não escondo atrás de generalidades. Tu que viste os cegos, vê-me. E onde eu receber a cura, que eu siga como eles seguiram. Amém.`;
  if (d.livroAbrev === 'Mt' && /entrada.*triunfal.*jerusalem/i.test(p))
    return `Jesus, tu entraste em Jerusalém sobre um jumento, não num cavalo de guerra. Guarda-me de um seguimento baseado em hosanas — que eu siga o rei manso, não o triunfante que o povo queria. Amém.`;
  if (d.livroAbrev === 'Mt' && /jesus purifica.*templo/i.test(p))
    return `Pai, Jesus expulsou o que impedia a oração. Purifica minha vida dos comércios interiores que ocupam espaço que deveria ser de encontro contigo. Que minha vida seja casa de oração, não mercado de interesses religiosos. Amém.`;
  if (d.livroAbrev === 'Mt' && /amaldicoa.*figueira|figueira.*seca/i.test(p))
    return `Senhor, a figueira com folhas mas sem frutos foi amaldiçoada. Examina minha vida: onde há aparência sem substância, corrige. Que o que professo corresponda ao que produzo, visível a ti mesmo quando ninguém mais vê. Amém.`;
  if (d.livroAbrev === 'Mt' && /autoridade.*jesus.*questionada|autoridade.*jesus.*contestada/i.test(p))
    return `Jesus, a tua autoridade não precisa da aprovação dos que detêm o poder religioso. Guarda-me de buscar validação institucional para o que tu me chamaste a fazer. Que minha obediência a ti não espere o aval dos que preferem não responder. Amém.`;
  if (d.livroAbrev === 'Mt' && /parabola.*dois.*filhos/i.test(p))
    return `Pai, prefiro ser o filho que disse não e foi a ser o que disse sim e não foi. Onde há lacuna entre minha declaração e minha ação, fecha essa distância. Que o que faço corresponda ao que digo. Amém.`;
  if (d.livroAbrev === 'Mt' && /lavradores.*maus|arrendatarios.*impios/i.test(p))
    return `Senhor, a vinha tem dono e ele vem cobrar frutos. Que eu não aja como se os dons que recebi fossem propriedade minha. Que eu produza frutos para o dono da vinha, fiel administrador do que me foi confiado. Amém.`;
  if (d.livroAbrev === 'Mt' && /banquete.*casamento|parabola.*casamento/i.test(p))
    return `Pai, tu convidaste estranhos quando os primeiros convidados recusaram. Obrigado por me incluir quando não estava na lista original. Que eu corresponda ao convite chegando com o traje certo — não pela presença casual, mas pela resposta comprometida. Amém.`;
  if (d.livroAbrev === 'Mt' && /tributo.*cesar|paying.*impostos|questao.*cesar/i.test(p))
    return `Senhor, o que porta tua imagem pertence a ti. Eu fui feito à tua imagem — devolvo-me a ti. Que cada área da minha vida que ainda não está sob teu senhorio seja entregue, porque sou teu, não meu. Amém.`;
  if (d.livroAbrev === 'Mt' && /questao.*ressurreicao|pergunta.*ressurreicao/i.test(p))
    return `Pai, tu és Deus dos vivos, não dos mortos. A ressurreição não é ajuste do presente — é realidade nova que minhas categorias atuais não conseguem conter. Que minha esperança na ressurreição seja real e não apenas teórica. Amém.`;
  if (d.livroAbrev === 'Mt' && /maior.*mandamento/i.test(p))
    return `Senhor, toda a lei e os profetas dependem de amar a ti e ao próximo. Onde cumpro regras sem amor, ainda não cheguei ao núcleo. Que minha obediência brote do amor e não substitua o amor. Amém.`;
  if (d.livroAbrev === 'Mt' && /filho de davi|questao.*filho.*davi/i.test(p))
    return `Jesus, tu és filho de Davi e Senhor de Davi. A lógica humana não te contém. Que minha cristologia seja grande o suficiente para a tua realidade — não apenas o que cresci ouvindo, mas o que a Escritura e o Espírito revelam. Amém.`;
  if (d.livroAbrev === 'Mt' && /denuncia.*escribas.*fariseus|ais.*hipócritas/i.test(p))
    return `Pai, os "ais" de Jesus foram dirigidos aos religiosos, não aos pecadores. Examina em mim onde há dissociação entre aparência e realidade. Que o interior corresponda ao exterior, para que tua denúncia nunca precise ser dirigida a mim. Amém.`;
  if (d.livroAbrev === 'Mt' && /destruicao.*templo.*predita|destruicao do templo/i.test(p))
    return `Senhor, nenhuma estrutura religiosa é eterna. Guarda-me do apego a formas que passarão. Que minha fé esteja fundada em ti, não nas pedras das instituições que uso para me aproximar de ti. Amém.`;
  if (d.livroAbrev === 'Mt' && /sinais.*fim.*era|sinais.*end/i.test(p))
    return `Pai, tu disseste que haverá guerras e rumores, mas que o fim ainda não é. Guarda-me do alarmismo e da indiferença ao mesmo tempo. Que eu viva com vigilância sóbria, fiel no presente, esperando o futuro que tu prometeste. Amém.`;
  if (d.livroAbrev === 'Mt' && /abominacao.*desolacao|desolacao.*sacrilega/i.test(p))
    return `Senhor, tu avisaste sobre o engano que viria nos tempos difíceis. Guarda-me dos falsos cristos que aparecem justamente quando o desespero é maior. Que eu conheça tua voz claramente o suficiente para não ser enganado pela imitação. Amém.`;
  if (d.livroAbrev === 'Mt' && /vinda.*filho.*homem.*ceu|filho do homem.*nuvens/i.test(p))
    return `Pai, o Filho do Homem virá com poder e grande glória. Que essa esperança transforme como vivo hoje — não com evasão do presente, mas com investimento no eterno dentro do temporal. Maranata. Vem, Senhor Jesus. Amém.`;
  if (d.livroAbrev === 'Mt' && /licao.*figueira|parabola.*figueira/i.test(p))
    return `Senhor, o céu e a terra passarão, mas tuas palavras não. Que minha vida seja edificada sobre o que não passa. Onde ainda confio no que é temporário como se fosse eterno, reorienta meu coração. Amém.`;
  if (d.livroAbrev === 'Mt' && /necessidade.*vigilancia|vigilancia/i.test(p))
    return `Pai, não sei o dia nem a hora. Por isso, ajuda-me a viver pronto hoje. Que minha vigilância não seja ansiedade — seja fidelidade cotidiana, sabendo que tu podes vir a qualquer momento. Amém.`;
  if (d.livroAbrev === 'Mt' && /servo.*fiel.*infiel|fiel.*infiel.*escravo/i.test(p))
    return `Senhor, o servo fiel age da mesma forma sabendo que o dono pode chegar a qualquer hora. Que minha vida seja a mesma quando visto e quando não visto, quando elogiado e quando ignorado. Que a tua aprovação seja suficiente para minha consistência. Amém.`;
  if (d.livroAbrev === 'Mt' && /dez.*madrinhas|dez virgens/i.test(p))
    return `Pai, o azeite não podia ser emprestado. A preparação interior é minha responsabilidade — não posso depender da fé de outro na hora decisiva. Que eu cuide da minha vida interior com a mesma atenção que dou ao visível. Amém.`;
  if (d.livroAbrev === 'Mt' && /parabola.*talentos/i.test(p))
    return `Senhor, o que enterrei por medo de errar está te desonrando. Liberta-me do medo que paralisa o dom. Que eu use o que me deste com ousadia, confiando que tu honras o esforço fiel mesmo quando o resultado é imperfeito. Amém.`;
  if (d.livroAbrev === 'Mt' && /julgamento.*nacoes|juizo.*nacoes/i.test(p))
    return `Jesus, tu te identificas com os famintos, estrangeiros, nus, doentes e presos. Onde passo por eles sem ver teu rosto, abre meus olhos. Que o serviço aos pequenos não seja projeto — seja encontro com tu mesmo. Amém.`;
  if (d.livroAbrev === 'Mt' && /complô.*matar.*jesus|plano.*matar.*jesus/i.test(p))
    return `Pai, o plano humano foi sobreposto pelo teu plano. Onde o que os outros planejam contra mim me preocupa, lembra-me que tu tens autoridade sobre tudo que acontece comigo. Nada está fora do teu permissivo. Amém.`;
  if (d.livroAbrev === 'Mt' && /uncao.*betania/i.test(p))
    return `Senhor, a mulher fez o que tinha e Jesus disse que seria lembrado para sempre. Que meu gesto de devoção extravagante, mesmo que incompreendido pelos que calculam, seja recebido por ti como boa obra. Amém.`;
  if (d.livroAbrev === 'Mt' && /judas.*trair.*jesus|judas.*concorda/i.test(p))
    return `Pai, guarda-me de negociar minha fidelidade a Jesus por qualquer vantagem. Onde já troquei silêncio ou distância por conforto ou conveniência, perdoa-me e restaura minha lealdade. Amém.`;
  if (d.livroAbrev === 'Mt' && /pascoa.*discipulos|ultima.*ceia.*pascoa/i.test(p))
    return `Jesus, tu sentaste à mesa sabendo que Judas te entregaria e Pedro te negaria — e serviste a ambos. Que a mesa que partilhamos seja espaço de graça real, não de perfeição fingida. Obrigado por incluir os que ainda estão no caminho. Amém.`;
  if (d.livroAbrev === 'Mt' && /institution.*senhor.*ceia|instituicao.*eucaristia/i.test(p))
    return `Senhor, cada vez que partimos o pão proclamamos a tua morte. Que essa proclamação nunca vire rotina. Que o corpo partido e o sangue derramado sejam sempre reais para mim — não símbolo vazio, mas memória viva. Amém.`;
  if (d.livroAbrev === 'Mt' && /negacao.*pedro.*predita|predicao.*negacao.*pedro/i.test(p))
    return `Pai, Pedro estava confiante demais logo antes de cair. Guarda-me da autoconfiança espiritual que desconsidera minha vulnerabilidade. E onde eu já caí, lembra-me que a restauração estava prevista antes da queda. Amém.`;
  if (d.livroAbrev === 'Mt' && /getsemani|jesus ora.*getsemani/i.test(p))
    return `Pai, Jesus orou: não como eu quero, mas como tu queres. Ensina-me essa oração — honesta sobre o que sinto, rendida ao que decidiste. Que minha oração no momento difícil seja Getsêmani, não fuga. Amém.`;
  if (d.livroAbrev === 'Mt' && /traicao.*prisao.*jesus/i.test(p))
    return `Senhor, Jesus poderia ter chamado doze legiões de anjos e não chamou. Que eu aprenda a renunciar ao poder de autodefesa quando tu escolheste o caminho da entrega. Que minha confiança em ti seja maior que minha necessidade de controle. Amém.`;
  if (d.livroAbrev === 'Mt' && /jesus.*sumo.*sacerdote|jesus.*high.*sacerdote/i.test(p))
    return `Pai, Jesus ficou em silêncio diante das acusações falsas. Onde sou acusado injustamente, dá-me a mesma dignidade — não de fraqueza, mas de quem sabe que não precisa se defender diante de todo tribunal. Amém.`;
  if (d.livroAbrev === 'Mt' && /negacao.*pedro.*jesus|pedro.*nega.*jesus/i.test(p))
    return `Senhor, Pedro chorou amargamente após negar — e tu o restauraste. Onde eu te neguei por medo ou conveniência, recebo o teu olhar de restauração, não de condenação. Que o pranto honesto seja o início do retorno. Amém.`;
  if (d.livroAbrev === 'Mt' && /jesus.*pilatos|jesus.*levado.*pilatos/i.test(p))
    return `Pai, nenhuma autoridade age fora do teu permissivo. Quando o injusto parece triunfar, lembra-me que até Pilatos estava dentro do teu plano. Que minha confiança em ti não dependa do que o poder humano decide. Amém.`;
  if (d.livroAbrev === 'Mt' && /suicidio.*judas/i.test(p))
    return `Senhor, Judas reconheceu o erro mas não buscou o perdão. Guarda-me do remorso que devolve o dinheiro sem ir ao Pai. Que meu arrependimento sempre encontre o caminho até ti — não apenas a dor pelo que fiz, mas a certeza de que tu perdoas. Amém.`;
  if (d.livroAbrev === 'Mt' && /pilatos.*interroga.*jesus|pilatos.*questiona/i.test(p))
    return `Pai, Jesus não precisava provar sua inocência a Pilatos. Onde sinto a compulsão de me justificar diante de quem não tem ouvidos para ouvir, dá-me o silêncio de Jesus — não por covardia, mas por confiança em ti. Amém.`;
  if (d.livroAbrev === 'Mt' && /barrabas.*jesus/i.test(p))
    return `Senhor, eu sou Barrabás. O culpado foi solto porque o inocente tomou meu lugar. Que essa troca nunca vire doutrina abstrata — que seja sempre pessoal, concreta, o fundamento da minha gratidão. Amém.`;
  if (d.livroAbrev === 'Mt' && /soldados.*zombam.*jesus/i.test(p))
    return `Pai, os soldados proclamaram a verdade sem saber. A coroa de espinhos e a clámide escarlate viraram insígnias de glória. Que eu nunca me envergonhe do Rei que foi zombado — porque o escárnio foi o caminho para o trono eterno. Amém.`;
  if (d.livroAbrev === 'Mt' && /crucificacao.*jesus/i.test(p))
    return `Jesus, tu não desceste da cruz porque descendo não poderias me salvar. A potência da salvação está na tua permanência nela. Que eu nunca minimize o que custou — e que a cruz nunca se torne familiar demais para me mover. Amém.`;
  if (d.livroAbrev === 'Mt' && /morte de jesus/i.test(p))
    return `Pai, Jesus gritou o abandono para que eu nunca precisasse gritar o mesmo. Tu o desamparaste a ele para que nunca me desamparasses a mim. Que essa troca seja real para mim hoje e em todo dia difícil que vier. Amém.`;
  if (d.livroAbrev === 'Mt' && /testemunhas.*crucificacao/i.test(p))
    return `Senhor, o centurião viu e confessou. Às vezes a confissão mais clara vem de onde menos se espera. Que o que vejo — a morte do teu Filho — seja suficiente para me arrancar a confissão: verdadeiramente és o Filho de Deus. Amém.`;
  if (d.livroAbrev === 'Mt' && /sepultamento.*jesus/i.test(p))
    return `Pai, Jesus realmente morreu e foi realmente sepultado. A ressurreição que vem não é despertar de desmaio — é vitória sobre morte real. Que a solidez desse fundamento sustente minha fé nos dias em que a esperança parece distante. Amém.`;
  if (d.livroAbrev === 'Mt' && /guarda.*tumulo|guarda no sepulcro/i.test(p))
    return `Senhor, ao tentar selar o sepulcro, os inimigos de Jesus tornaram-se as melhores testemunhas do túmulo vazio. Tu usas até a resistência humana para confirmar a tua verdade. Que eu confie que nada que os homens fazem pode impedir o que tu decretaste. Amém.`;
  if (d.livroAbrev === 'Mt' && /ressurreicao.*jesus/i.test(p))
    return `Pai, as mulheres foram ao sepulcro com especiarias e saíram com o evangelho. O encontro com o ressurreto sempre muda a direção do caminho. Que meu encontro com Jesus ressurreto transforme meu luto em missão, meu fim em começo. Amém.`;
  if (d.livroAbrev === 'Mt' && /relatorio.*guarda|guarda.*relatorio/i.test(p))
    return `Senhor, a história fabricada confirma o que nunca foi negado: o túmulo estava vazio. Que a ressurreição seja para mim não objeto de defesa intelectual, mas fundamento de vida. Tu ressuscitaste — e isso muda tudo. Amém.`;
  if (d.livroAbrev === 'Mt' && /missao.*discipulos|grande.*comissao/i.test(p))
    return `Jesus ressurreto, todo poder te foi dado no céu e na terra. Por isso me envias. Que eu vá não pela minha força mas pela tua autoridade, e que a tua presença — "estou convosco todos os dias" — seja o que me sustenta em cada passo da missão. Amém.`;

  // MARCOS [1]–[81]
  // [1]
  if (d.livroAbrev === 'Mc' && /profecia de isaias/i.test(p))
    return `Senhor, tu preparaste o caminho antes mesmo de Jesus aparecer — uma voz no deserto antecipou o que viria. Que eu também seja essa voz que aplaina o terreno para que outros possam encontrá-te. Onde há orgulho que precisas humilhar em mim, humilha; onde há vazio que precisas preencher, preenche. Amém.`;
  // [2]
  if (d.livroAbrev === 'Mc' && /proclamacao.*joao.*batista|proclamacao de joao/i.test(p))
    return `Pai, que eu aprenda com João a apontar para além de mim mesmo. Guarda-me do ministério que coloca luz sobre si próprio. Que o meu maior prazer seja dizer aos outros: "Ele deve crescer, eu devo diminuir." Batiza-me no Espírito Santo, não apenas na água da rotina religiosa. Amém.`;
  // [3]
  if (d.livroAbrev === 'Mc' && /preparacao para ministerio/i.test(p))
    return `Pai celestial, antes de qualquer missão, que eu ouça a tua voz sobre mim: "és meu filho amado, em ti me comprazo." Que eu nunca ministre para conquistar essa aprovação, mas porque já a recebi. Guarda-me do deserto das tentações com o mesmo Espírito que desceu sobre Jesus. Amém.`;
  // [4]
  if (d.livroAbrev === 'Mc' && /inicio do ministerio na galile/i.test(p))
    return `Senhor Jesus, o tempo está cumprido e o reino ainda está se aproximando em nós e através de nós. Que o anúncio desse reino seja urgente em minha boca e visível em minha vida. Arrependimento e fé — que sejam não apenas doutrina que ensino, mas realidade que vivo. Amém.`;
  // [5]
  if (d.livroAbrev === 'Mc' && /chama.*primeiros.*discipulos|jesus chama.*Mc/i.test(p))
    return `Jesus, tens o poder de transformar o que faço em algo maior do que posso imaginar. Ouço a tua voz: "Vem após mim." Que eu largue as redes do que me prende — hábitos, medos, planos — e te siga sem calcular o custo. Faz de mim pescador das pessoas que precisam de ti. Amém.`;
  // [6]
  if (d.livroAbrev === 'Mc' && /imundo espirito/i.test(p))
    return `Senhor, tu ensinas com autoridade e a tua Palavra tem poder para expulsar o que me escraviza. Fala sobre o meu caos interior — tudo que grita e me perturba — e diz: "Cala-te e sai." Que a tua presença na minha vida seja a autoridade que silencia o mal. Amém.`;
  // [7]
  if (d.livroAbrev === 'Mc' && /cura muitos.*casa.*simon|casa de simon/i.test(p))
    return `Pai, antes que o dia comece com toda a sua demanda, que eu vá ao lugar deserto para orar como Jesus fez. Que o serviço aos outros brote do encontro contigo, não da exaustão religiosa. Que a minha casa seja lugar de cura para quem dela precisar. Amém.`;
  // [8]
  if (d.livroAbrev === 'Mc' && /purifica um leproso/i.test(p))
    return `Jesus, tu estendes a mão onde a lei proibia o toque. Toca em mim onde me sinto intocável — as áreas que escondo, as lepras que carrego em silêncio. E guia-me a tocar nos intocáveis da minha comunidade com a mesma compaixão que recebi. Amém.`;
  // [9]
  if (d.livroAbrev === 'Mc' && /cura um paralitico/i.test(p))
    return `Senhor, como os quatro que abriram o teto, que eu seja alguém que traz os outros a ti em oração, sem me deixar bloquear pelas multidões nem pelos obstáculos. Perdoa os meus pecados, os que sei e os que não sei, e levanta-me para caminhar num vida nova. Amém.`;
  // [10]
  if (d.livroAbrev === 'Mc' && /chama levi/i.test(p))
    return `Jesus, tu encontraste Levi em sua mesa de cobrador e o chamaste. Encontra-me onde estou — na rotina, no trabalho, na mediocridade. Que a minha mesa também se torne lugar de hospitalidade para os que a sociedade rejeita. Amém.`;
  // [11]
  if (d.livroAbrev === 'Mc' && /pergunta sobre jejum/i.test(p))
    return `Senhor Jesus, tu és o noivo e a tua presença transforma o jejum em festa. Guarda-me de tentar encaixar a vida nova em formas velhas que não conseguem contê-la. Abre meu coração para as expressões novas que o teu Espírito quer criar na minha comunidade. Amém.`;
  // [12]
  if (d.livroAbrev === 'Mc' && /pronoucement.*sabado|pronunciamento.*sabado/i.test(p))
    return `Pai, que as minhas práticas religiosas sirvam à vida humana e não a esmagam. Guarda-me do legalismo que prefere a regra ao ser humano. Que o meu descanso semanal seja genuíno encontro contigo e não performance religiosa. Tu és senhor do tempo. Amém.`;
  // [13]
  if (d.livroAbrev === 'Mc' && /homem.*mao seca|mao.*seca/i.test(p))
    return `Senhor, há partes da minha vida que estão "secas" — que não funcionam, que não produzem. Estendo hoje diante de ti. Tu perguntas: "é lícito fazer bem?" Faz o bem em mim hoje, mesmo que isso incomode a religiosidade ao meu redor. Amém.`;
  // [14]
  if (d.livroAbrev === 'Mc' && /multidao.*beira.*mar/i.test(p))
    return `Senhor, os que menos deveriam te conhecer frequentemente são os primeiros a reconhecer quem és. Que a tua autoridade sobre o mal na minha vida seja um testemunho que não posso silenciar. Usa até a minha confissão inesperada para declarar que és Filho de Deus. Amém.`;
  // [15]
  if (d.livroAbrev === 'Mc' && /nomeia os doze/i.test(p))
    return `Jesus, tu me chamaste primeiro para estar contigo — antes da missão, a comunhão. Que eu nunca inverta a ordem. Que a minha vida de oração, de Palavra, de presença contigo, seja o fundamento de tudo o que faço em teu nome. Manda-me com a tua autoridade. Amém.`;
  // [16]
  if (d.livroAbrev === 'Mc' && /jesus e beelzebul/i.test(p))
    return `Senhor, tu já amarraste o homem forte. Que eu viva na certeza de que o reino veio com poder e que cada libertação que acontece na minha vida e comunidade é sinal de que o adversário está sendo despojado. Guarda-me da blasfêmia de chamar de mal o que é obra do teu Espírito. Amém.`;
  // [17]
  if (d.livroAbrev === 'Mc' && /verdadeiros.*parentes|verdadeiro.*parentes/i.test(p))
    return `Pai, obrigado por criar uma família mais ampla que o sangue. Que a minha comunidade de fé seja de fato irmãos e irmãs que fazem a tua vontade juntos. Onde a família biológica rejeita, que a família do reino acolha. Que eu seja para alguém o irmão que Jesus disse que seria. Amém.`;
  // [18]
  if (d.livroAbrev === 'Mc' && /parabola do semeador/i.test(p))
    return `Senhor, examina o solo do meu coração: onde há pedras, amolece; onde há espinhos, limpa; onde a semente não cria raiz, aprofunda. Que eu ouça com ouvidos preparados e que a tua Palavra dê em mim trinta, sessenta, cem por cento de fruto. Amém.`;
  // [19]
  if (d.livroAbrev === 'Mc' && /parabolas do reino/i.test(p))
    return `Pai, ensina-me a confiar no crescimento invisível do teu reino. Onde me impaciento com o processo, lembra-me: o lavrador dorme e a semente germina. Que eu plante, regue e descanse na tua soberania. Amém.`;
  // [20]
  if (d.livroAbrev === 'Mc' && /acalma.*tempestade|jesus acalma/i.test(p))
    return `Jesus, há tempestades na minha vida que me fazem gritar "não te importas?" Tu te importas — e em prova disso dormiste no barco como quem não teme. Fala sobre as minhas águas agitadas: "Sossega, aquieta-te." Que a tua paz governe o que os ventos não conseguem domar. Amém.`;
  // [21]
  if (d.livroAbrev === 'Mc' && /endemoninhado geraseno/i.test(p))
    return `Senhor, tu atravessas o lago para salvar um único homem que ninguém mais conseguia ajudar. Obrigado por atravessares o impossível por mim. Que eu, como o curado, vá e conte o que Deus fez por mim — não nas sinagogas dos que me conhecem, mas na minha própria região. Amém.`;
  // [22]
  if (d.livroAbrev === 'Mc' && /menina restaur.*vida.*mulher|menina.*mulher curou/i.test(p))
    return `Jesus, tu não te apressas para os poderosos nem ignoras os invisíveis. Pares no meio do caminho para uma mulher sem nome, e chegas tarde para a filha de um líder — e ambas são curadas. Que minha fé seja como a dela: toque silencioso que sabe que da tua virtude sai cura. Amém.`;
  // [23]
  if (d.livroAbrev === 'Mc' && /rejection.*nazare|rejeicao.*nazare/i.test(p))
    return `Senhor, guarda-me da familiaridade religiosa que me impede de te ver com olhos novos. Que eu não me escandalize da tua origem simples, nem reduza o poder do Senhor dos senhores ao que conheço de ti há anos. Abre os meus olhos para te ver. Amém.`;
  // [24]
  if (d.livroAbrev === 'Mc' && /missao.*doze/i.test(p))
    return `Jesus, tu me envias vulnerável — sem bolsa extra, sem segurança acumulada. Ensinai-me a depender de ti e da hospitalidade dos outros enquanto sirvo. Que eu sacuda o pó do que me prende e vá com a autoridade que tu me dás sobre tudo o que escraviza. Amém.`;
  // [25]
  if (d.livroAbrev === 'Mc' && /morte de joao batista/i.test(p))
    return `Pai, guarda-me de ser como Herodes: ouvindo com prazer a tua voz profética mas cedendo ao que a multidão espera. Que eu não troque a fidelidade à tua Palavra pelo custo social de obedecê-la. Que o silêncio de João diante da morte seja para mim convite à fidelidade sem cálculo. Amém.`;
  // [26]
  if (d.livroAbrev === 'Mc' && /feeding cinco mil/i.test(p))
    return `Senhor, o que tenho parece insuficiente para a demanda ao meu redor. Mas tu pegas o que é pouco, olhas para o céu, abençoas e multiplicas. Coloco nas tuas mãos o que tenho — tempo, recursos, energia — e confio que abençoado por ti se tornará suficiente para o que precisas fazer por meio de mim. Amém.`;
  // [27]
  if (d.livroAbrev === 'Mc' && /caminha sobre a agua/i.test(p))
    return `Jesus, tu és o que caminha sobre o que me afoga. Quando o vento contrário me exaure e começo a tomar o milagre por fantasma, fala: "Sou eu, não temas." Que a tua presença no barco seja suficiente para que o vento cesse no momento certo. Amém.`;
  // [28]
  if (d.livroAbrev === 'Mc' && /cura.*enfermos.*genesare/i.test(p))
    return `Senhor, que eu tenha fé suficiente para colocar os que precisam no caminho onde tu passas — em oração, em comunidade, na Palavra. Que minha intercessão seja o gesto de quem carrega o enfermo até a praça e o deixa no teu caminho. Amém.`;
  // [29]
  if (d.livroAbrev === 'Mc' && /tradicao.*anciãos|tradicao sobre os anc/i.test(p))
    return `Pai, examina as tradições que pratico: quais honram teus mandamentos e quais os substituem? Guarda-me de criar Corbans espirituais — usos religiosos que me livrem de deveres concretos com as pessoas. Que minha obediência seja do coração para fora, não de fora para dentro. Amém.`;
  // [30]
  if (d.livroAbrev === 'Mc' && /siro.*fenicia.*mulher/i.test(p))
    return `Jesus, como a mulher siro-fenícia eu não tenho direito, mas tenho necessidade. Não desistirei do teu sim mesmo que o processo pareça um não. Que a minha fé persista e encontre na tua graça o que a lógica da exclusão não seria capaz de imaginar. Amém.`;
  // [31]
  if (d.livroAbrev === 'Mc' && /cura.*homem surdo|jesus cura.*surdo/i.test(p))
    return `Senhor, "Efatá" — abre-te. Abre os meus ouvidos para ouvir o que o barulho do mundo me impede de escutar. Solta a minha língua para falar com clareza o que recebi. Que o encontro contigo seja pessoal, íntimo, fora do ruído da multidão religiosa. Amém.`;
  // [32]
  if (d.livroAbrev === 'Mc' && /feeding quatro mil/i.test(p))
    return `Pai, tua compaixão não tem cota. Alimentaste judeus — agora alimentas gentios. Que a minha missão não tenha fronteiras étnicas nem religiosas: que eu sirva a todos os que ficaram três dias sem comer na presença do Senhor. Abençoa o que tenho e multiplica. Amém.`;
  // [33]
  if (d.livroAbrev === 'Mc' && /fermento.*fariseus.*herodes/i.test(p))
    return `Senhor, guarda-me do ceticismo religioso que pede sinal depois de ter visto milagres, e do pragmatismo político que corrompe o testemunho. Que eu não discuta sobre pão quando devo estar distribuindo o que recebi. Abre meus olhos para enxergar com os olhos do reino. Amém.`;
  // [34]
  if (d.livroAbrev === 'Mc' && /cura.*cego.*betsaida/i.test(p))
    return `Senhor, há áreas da minha vida onde vejo "homens como árvores andando" — verdades parcialmente compreendidas, fé incompletamente formada. Impõe tuas mãos novamente. Não me contentarei com visão parcial quando tu podes dar visão plena. Amém.`;
  // [35]
  if (d.livroAbrev === 'Mc' && /declaracao.*pedro|pedro.*declaracao/i.test(p))
    return `Jesus, tu me fazes a mesma pergunta: "E tu, quem dizes que sou?" Que a minha resposta venha não do que herdei culturalmente, mas de encontro pessoal contigo. Tu és o Cristo — e isso muda tudo o que vem depois na minha história. Amém.`;
  // [36]
  if (d.livroAbrev === 'Mc' && /prediz.*morte.*ressurreicao.*Mc.*8|prediz sua morte/i.test(p))
    return `Senhor, como Pedro, às vezes meu amor por ti se torna obstáculo ao teu caminho. Guarda-me de pensar as coisas dos homens quando devo pensar as coisas de Deus. Que eu aceite a cruz — a tua e a minha — sem tentar redirecioná-la para um atalho mais confortável. Amém.`;
  // [37]
  if (d.livroAbrev === 'Mc' && /losing vida/i.test(p))
    return `Jesus, o que ganho ao preservar tudo mas perder o que importa? Que eu aprenda o paradoxo do reino: a vida encontrada pela entrega, a plenitude pela renúncia. Que me envergonhe menos de ti nas conversas difíceis e mais do que seria sem ti. Amém.`;
  // [38]
  if (d.livroAbrev === 'Mc' && /nao provara a morte/i.test(p))
    return `Senhor, tu prometeste que alguns veriam o reino antes de morrer — e logo após, três discípulos viram tua glória no monte. Que eu também tenha vislumbres do poder do reino nesta vida, penhor da glória que virá. Amém.`;
  // [39]
  if (d.livroAbrev === 'Mc' && /transfiguracao/i.test(p))
    return `Pai, a voz que confirmou Jesus no batismo o confirma novamente no monte: "Este é meu Filho amado." Que cada experiência de transfiguração na minha vida — os momentos onde vejo a glória — me oriente de volta à descida, ao serviço, ao caminho da cruz. Amém.`;
  // [40]
  if (d.livroAbrev === 'Mc' && /cura.*menino.*espirito/i.test(p))
    return `Senhor, "creio, ajuda-me na minha incredulidade" — esta é a oração mais honesta que consigo fazer. Não finjo ter mais fé do que tenho, mas trago o que tenho. Cura o que nenhuma outra estratégia foi capaz de tocar, porque esta casta só sai pela oração. Amém.`;
  // [41]
  if (d.livroAbrev === 'Mc' && /novamente prediz.*morte.*ressurreicao/i.test(p))
    return `Jesus, tu predizes a entrega com clareza — e os discípulos não entendem e temem perguntar. Que eu não tema as perguntas sobre o caminho da cruz. Que eu sente com a tua incompreensível obediência ao Pai e encontre nela força para obedecer mesmo sem entender. Amém.`;
  // [42]
  if (d.livroAbrev === 'Mc' && /quem e o maior/i.test(p))
    return `Senhor, quando o debate sobre quem é maior chegar — e chegará — que eu busque a criança no meio: o sem nome, o sem poder, o sem agenda. Que a minha grandeza seja medida pela disposição de servir o menor. Abraça-me como abraçaste aquela criança. Amém.`;
  // [43]
  if (d.livroAbrev === 'Mc' && /ensino sobre divorcio/i.test(p))
    return `Pai, que a dureza do coração não dite os meus relacionamentos. Reconduz-me ao "desde o princípio" — à intenção da criação, não à concessão da queda. Onde houve fracasso no passado, oferece cura; onde há compromisso presente, oferece fidelidade. Amém.`;
  // [44]
  if (d.livroAbrev === 'Mc' && /abencoa.*criancas|jesus.*bencoa.*criancas/i.test(p))
    return `Jesus, que eu receba o reino como criança — sem nada a negociar, sem credenciais a apresentar, simplesmente de mãos abertas. E que eu nunca afaste os pequenos, os vulneráveis, os sem voz de encontrar contigo. Impõe tuas mãos sobre quem está do meu lado. Amém.`;
  // [45]
  if (d.livroAbrev === 'Mc' && /rico homem|homem rico/i.test(p))
    return `Jesus, tu olhaste para o homem rico e o amaste — mesmo antes de ele ser capaz de obedecer. Olha para mim assim. Onde minhas posses, meu status ou minha segurança competem com o teu chamado, dá-me coragem de soltar. Que eu não vá embora entristecido. Amém.`;
  // [46]
  if (d.livroAbrev === 'Mc' && /terceiro.*prediz.*morte|terceira.*morte.*ressurreicao/i.test(p))
    return `Senhor, tu vais adiante de mim no caminho da cruz. Quando sinto espanto e medo diante do que o chamado exige, lembro que tu já foste primeiro — e ressuscitaste. Que a predição da ressurreição seja para mim a âncora no meio da terceira tempestade. Amém.`;
  // [47]
  if (d.livroAbrev === 'Mc' && /pedido.*tiago.*joao/i.test(p))
    return `Jesus, perdoa-me quando peço lugar de honra sem entender o que estou pedindo. Os lugares ao teu lado custam o cálice e o batismo da tua paixão. Que eu queira ser servo e não senhor, escravo e não estrela — porque é assim que o Filho do Homem veio. Amém.`;
  // [48]
  if (d.livroAbrev === 'Mc' && /cura.*cego bartimeu|bartimeu/i.test(p))
    return `Jesus, Filho de Davi, tem misericórdia de mim. Como Bartimeu, gritarei mesmo quando a multidão mandar calar. Que eu lance fora o manto do que me prende e salte em direção a ti quando tu me chamares. Que a tua pergunta — "o que queres que te faça?" — encontre em mim uma resposta clara. Amém.`;
  // [49]
  if (d.livroAbrev === 'Mc' && /entrada triunfal.*jerusalem/i.test(p))
    return `Senhor, tu entrastes com aclamação mas observastes em silêncio. Que minha adoração seja genuína e não performance para a multidão. Que "hosana" em minha boca seja coerente com a minha vida quando a aclamação passa e fico sozinho contigo. Amém.`;
  // [50]
  if (d.livroAbrev === 'Mc' && /amaldicoa.*figueira|figueira.*amaldicoa/i.test(p))
    return `Pai, que minha vida espiritual não seja folhagem sem fruto. Que o que aparece em público reflita o que amadurece em privado. Onde há aparência religiosa sem substância, que a tua Palavra chegue como juízo e convite ao arrependimento. Amém.`;
  // [51]
  if (d.livroAbrev === 'Mc' && /purifica o templo/i.test(p))
    return `Senhor, purifica o meu coração — o templo onde habitas — de tudo que ocupa o espaço da oração com a logística do desempenho. Que "casa de oração" seja o que me define, não "covil de mercadores." Expulsa o que impede que os que buscam te encontrem em mim. Amém.`;
  // [52]
  if (d.livroAbrev === 'Mc' && /licao.*figueira.*seca/i.test(p))
    return `Pai, que minha fé em ti não separe a confiança no milagre do coração perdoador. Guarda-me de orar com fé mas reter o perdão. Que a minha oração nasça de um coração que perdoa — e que esse coração seja formado pelo mesmo poder que murchou a figueira. Amém.`;
  // [53]
  if (d.livroAbrev === 'Mc' && /autoridade.*questionado/i.test(p))
    return `Jesus, tu não debates com quem já decidiu não crer. Dá-me sabedoria para discernir quem genuinamente busca e quem apenas testa. Que a minha confiança na tua autoridade não dependa de respostas que outros não estão dispostos a dar. Tu sabes de onde vens. Amém.`;
  // [54]
  if (d.livroAbrev === 'Mc' && /parabola.*arrendatarios.*impios|arrendatarios impios/i.test(p))
    return `Pai, tu enviaste o teu Filho amado e o rejeitamos. Mas a pedra rejeitada tornou-se a pedra angular. Que eu construa sobre ela — não sobre as fundações que a religião aprova, mas sobre o Filho que os construtores recusaram. Amém.`;
  // [55]
  if (d.livroAbrev === 'Mc' && /pergunta.*paying.*impostos|paying impostos/i.test(p))
    return `Senhor, sou feito à tua imagem — e portanto pertenceço a ti de um modo que nenhum imperador pode reclamar. Que eu dê a César o que é de César sem confundir as esferas, e que eu me dê inteiramente a ti, que me fizeste para si. Amém.`;
  // [56]
  if (d.livroAbrev === 'Mc' && /pergunta.*ressurreicao/i.test(p))
    return `Deus dos vivos, tu não és Deus dos mortos. Que minha fé na ressurreição não seja mero dogma mas certeza que reorienta o meu modo de viver, morrer e esperar. Guarda-me de errar por não conhecer as Escrituras nem o teu poder. Amém.`;
  // [57]
  if (d.livroAbrev === 'Mc' && /primeiro mandamento/i.test(p))
    return `Senhor meu Deus, que eu te ame de todo o coração, toda a alma, toda a mente e toda a força — e que esse amor transborde no amor ao próximo como a mim mesmo. Que esses dois mandamentos não sejam alternativas mas uma só realidade no meu cotidiano. Amém.`;
  // [58]
  if (d.livroAbrev === 'Mc' && /pergunta.*filho.*davi/i.test(p))
    return `Senhor Jesus, Filho de Deus e Senhor de Davi, que eu nunca te reduza a figura histórica ou herói cultural. Tu és o que o próprio Davi adorava como Senhor. Que minha adoração esteja à altura de quem tu és. Amém.`;
  // [59]
  if (d.livroAbrev === 'Mc' && /denuncia.*escribas/i.test(p))
    return `Pai, examina a minha prática religiosa: há alguma longa oração que cobre injustiça prática? Há saudações que busco para parecer piedoso enquanto deixo a viúva sem proteção? Que minha liturgia e minha ética sejam coerentes diante de ti. Amém.`;
  // [60]
  if (d.livroAbrev === 'Mc' && /viuva oferta/i.test(p))
    return `Senhor, a viúva deu tudo o que tinha como sustento. Que eu não oferte apenas o que sobra, mas que minha generosidade seja medida pelo coração e não pela calculadora. Que eu aprenda com quem tem menos como dar mais. Amém.`;
  // [61]
  if (d.livroAbrev === 'Mc' && /destruicao.*templo.*predita/i.test(p))
    return `Pai, quando as instituições que amamos são abaladas e pedras caem, que eu lembre: o evangelho deve ser pregado a todas as nações antes do fim. Que os momentos de crise sejam para mim convocação à missão, não paralisação pelo medo. Amém.`;
  // [62]
  if (d.livroAbrev === 'Mc' && /desolacao sacrilegia/i.test(p))
    return `Senhor, quando os dias de tribulação chegarem — nas formas que tenho de enfrentar —, que eu olhe para além deles e veja o Filho do Homem vindo com poder e glória. Que a esperança da parousia me sustente nos momentos de maior pressão. Amém.`;
  // [63]
  if (d.livroAbrev === 'Mc' && /licao.*figueira(?!.*seca)/i.test(p))
    return `Senhor, quando tudo mudar ao redor — culturas, gerações, instituições — as tuas palavras não passarão. Que eu edifique minha vida sobre o que permanece, não sobre o que cede. Que os ramos tenros da tua promessa me mostrem que a estação da tua volta está próxima. Amém.`;
  // [64]
  if (d.livroAbrev === 'Mc' && /necessidade.*vigilancia/i.test(p))
    return `Senhor, não sei o dia nem a hora. Por isso vigio: cuido da obra que me confiaste, fico acordado na oração, espero com fidelidade. Que a tua chegada — quando vier — me encontre fazendo o que me pediste, não especulando sobre quando virás. Amém.`;
  // [65]
  if (d.livroAbrev === 'Mc' && /complô.*matar jesus/i.test(p))
    return `Pai, os planos humanos contra o teu propósito frequentemente se tornam os instrumentos que o cumprem. Que eu confie na tua soberania sobre os complôs que vejo ao meu redor. Tu governas sobre os que governam contra ti. Amém.`;
  // [66]
  if (d.livroAbrev === 'Mc' && /uncao.*betania/i.test(p))
    return `Jesus, que o meu melhor — não o que sobra — seja reservado para ti. Que eu não calcule o custo da devoção pelo que poderia ter feito com ela. Que o gesto que parece desperdício seja, nas tuas mãos, proclamação que percorre o mundo. Amém.`;
  // [67]
  if (d.livroAbrev === 'Mc' && /judas.*trair.*jesus|judas.*concorda/i.test(p))
    return `Senhor, guarda-me de ser Judas: de servir à comunidade enquanto carrego traição no coração. Examina-me — há algo que estou "vendendo" por ganho pessoal enquanto finjo lealdade? Que minha fidelidade a ti não tenha preço. Amém.`;
  // [68]
  if (d.livroAbrev === 'Mc' && /preparacao para a pascoa/i.test(p))
    return `Pai, como os discípulos que encontraram tudo preparado conforme Jesus disse, que eu confie que tu já preparaste o que preciso para cumprir o propósito que me deste. Que eu obedeça aos sinais sem exigir o mapa completo. Amém.`;
  // [69]
  if (d.livroAbrev === 'Mc' && /pascoa.*discipulos/i.test(p))
    return `Senhor, à mesa da tua ceia, que eu faça a pergunta de cada discípulo: "Serei eu?" Que essa auto-examinação honesta purifique o meu coração antes de partir o pão. Que eu coma dignamente, reconhecendo o corpo e o sangue do Senhor. Amém.`;
  // [70]
  if (d.livroAbrev === 'Mc' && /instrucoes.*senhor.*ceia/i.test(p))
    return `Jesus, cada vez que partimos o pão proclamamos teu sangue da nova aliança derramado por muitos. Que essa proclamação não seja ritual vazio, mas renovação da aliança que me une a ti. Que o hino que cantamos ao sair nos leve à missão que a ceia anuncia. Amém.`;
  // [71]
  if (d.livroAbrev === 'Mc' && /negacao.*pedro.*predita/i.test(p))
    return `Senhor, onde estou confiante demais na minha própria fidelidade, avisa-me. Que eu não durma onde deveria vigiar, nem prometa onde deveria orar. Que a predição do teu retorno e a memória da minha fraqueza me mantenham humilde e vigilante. Amém.`;
  // [72]
  if (d.livroAbrev === 'Mc' && /jesus ora.*getsemani|getsemani/i.test(p))
    return `Abba, Pai, tudo te é possível. Há cálices que peço que passem — sofrimentos, renúncias, custos do chamado. Mas como Jesus, que eu subordine meu querer ao teu. Não o que eu quero, mas o que tu queres. Que essa oração seja minha âncora nos Getsêmanis da minha vida. Amém.`;
  // [73]
  if (d.livroAbrev === 'Mc' && /traicao.*prisao.*jesus/i.test(p))
    return `Jesus, foram buscar-te com espadas mas tu entregaste-te pela obediência às Escrituras. Onde eu fujo como o jovem sem o manto, tem misericórdia. Que eu não abandone o meu lugar ao lado de ti quando o custo aparecer. Amém.`;
  // [74]
  if (d.livroAbrev === 'Mc' && /jesus.*antes.*concilio/i.test(p))
    return `Senhor, tu disseste "eu sou" exatamente onde o dizer custava a vida. Que eu confesse teu nome onde me custa algo, não apenas onde é seguro. Que o teu silêncio diante dos falsos testemunhos me ensine que nem toda acusação merece defesa — a verdade é sua própria reivindicação. Amém.`;
  // [75]
  if (d.livroAbrev === 'Mc' && /pedro nega jesus/i.test(p))
    return `Senhor, Pedro te negou três vezes ao pé do fogo — e depois chorou amargamente. Onde eu te neguei nas conversas cotidianas, nas escolhas silenciosas, nos silêncios convenientes: tem misericórdia. Que o choro de Pedro seja meu arrependimento genuíno, e que tu, como fizeste com ele, me restaures. Amém.`;
  // [76]
  if (d.livroAbrev === 'Mc' && /jesus.*antes de pilatos/i.test(p))
    return `Jesus, tu te calastes diante dos que tinham poder sobre ti. Ensinai-me quando falar e quando calar — quando o silêncio é testemunho mais poderoso que a defesa. Que eu confie que Deus me justificará sem que eu precise me defender em todo tribunal humano. Amém.`;
  // [77]
  if (d.livroAbrev === 'Mc' && /pilatos.*crucificado/i.test(p))
    return `Senhor, Pilatos sabia que eras inocente e te entregou mesmo assim. Guarda-me de trocar a fidelidade ao justo pela paz com a multidão. Que eu não "satisfaça a multidão" quando o justo exige que eu vá contra a corrente. Amém.`;
  // [78]
  if (d.livroAbrev === 'Mc' && /crucificacao de jesus/i.test(p))
    return `Jesus, tu recusaste o anestésico e enfrentastes a cruz em plena consciência. Que eu não busque anestésicos espirituais para evitar a dor do chamado. Que a tua cruz, contemplada de frente, me forme como nada mais pode formar. Amém.`;
  // [79]
  if (d.livroAbrev === 'Mc' && /morte de jesus/i.test(p))
    return `Meu Deus, meu Deus — tu clamaste no abandono para que eu nunca estivesse verdadeiramente abandonado. O véu se rasgou: tenho acesso ao Pai pelo sangue do Filho. Que o centurião gentio que confessou à sombra da cruz seja o espelho da minha própria confissão: "Verdadeiramente este homem era Filho de Deus." Amém.`;
  // [80]
  if (d.livroAbrev === 'Mc' && /sepultamento de jesus/i.test(p))
    return `Pai, José de Arimateia foi corajosamente pedir o corpo. Que eu também tenha coragem de me identificar com Jesus nos momentos em que ele é rejeitado. Que o sepultamento real seja para mim a certeza de que a ressurreição que vem é igualmente real. Amém.`;
  // [81]
  if (d.livroAbrev === 'Mc' && /ressurreicao de jesus/i.test(p))
    return `Senhor ressurreto, as mulheres saíram tremendo e não disseram nada — por medo. Mas o evangelho chegou até mim: alguém, em algum momento, quebrou o silêncio. Que eu também quebre o meu silêncio e proclame o que as mulheres teriam dito: "Ressuscitou, não está aqui!" Amém.`;

  // ── LUCAS [1]–[145] ────────────────────────────────────────────────
  // [1]
  if (d.livroAbrev === 'Lc' && /dedicacao a teofilo/i.test(p))
    return `Senhor, que és o mesmo ontem, hoje e sempre, obrigado por um evangelho que suporta investigação honesta. Que eu não trate a fé como crença cega, mas como confiança fundada em testemunho verificado. Que a solidez das tuas palavras seja o chão firme sobre o qual cada dúvida possa ser levada — e respondida. Amém.`;
  // [2]
  if (d.livroAbrev === 'Lc' && /nascimento.*joao.*batista.*predito/i.test(p))
    return `Pai, que transformas décadas de esterilidade em anúncio de missão, sustenta a nossa fé quando as promessas demoram a se cumprir. Como Zacarias e Isabel, que sejamos fiéis mesmo no silêncio da espera — e que quando chegares, já estejamos disponíveis. Amém.`;
  // [3]
  if (d.livroAbrev === 'Lc' && /nascimento.*jesus.*predito/i.test(p))
    return `Senhor, que vieste pela disponibilidade de uma jovem humilde, forma em mim o mesmo "faça-se em mim segundo a tua palavra." Que o meu primeiro movimento diante de cada chamado não seja resistência calculista, mas disponibilidade confiante. Que a impossibilidade não me intimide quando tu a decretas. Amém.`;
  // [4]
  if (d.livroAbrev === 'Lc' && /maria visita isabel/i.test(p))
    return `Senhor Jesus, antes de qualquer proclamação formal, a tua presença já transforma o ambiente. Que a nossa comunidade seja assim — que quando nos reunimos, algo do teu Espírito se manifesta antes das palavras, e os corações saltam de alegria ao reconhecer que tu estás aqui. Amém.`;
  // [5]
  if (d.livroAbrev === 'Lc' && /maria.*cantico.*louvor/i.test(p))
    return `Senhor dos exaltados e humilhados, que o Magnificat não seja apenas texto litúrgico mas confissão que molda a minha vida. Que o meu louvor inclua a alegria pela tua justiça que inverte as ordens humanas — e que eu me comprometa a participar dessa inversão no meu contexto. Amém.`;
  // [6]
  if (d.livroAbrev === 'Lc' && /nascimento.*joao.*batista(?!.*predito)/i.test(p))
    return `Pai, que defines os nomes e as missões, guarda-me da tentação de definir os chamados alheios pela tradição familiar ou pela conveniência social. Que onde tu escreveste "João," eu não inscreva "Zacarias." Que a obediência ao teu chamado, mesmo quando surpreende a todos, desamarre a minha língua para proclamar. Amém.`;
  // [7]
  if (d.livroAbrev === 'Lc' && /profecia.*zacarias/i.test(p))
    return `Deus de Abraão, Isaque e Jacó, que não te esqueces das tuas alianças, ensina-me a orar narrando a tua fidelidade antes de listar as minhas necessidades. Que o louvor alimentado pela memória da tua história comigo seja o fundamento de toda a minha oração — e que João, em mim, prepare os caminhos para o que está por vir. Amém.`;
  // [8]
  if (d.livroAbrev === 'Lc' && /nascimento.*jesus(?!.*predito)/i.test(p))
    return `Senhor da história, que usaste o decreto de Augusto para cumprir a profecia de Miquéias, eu confio que os poderes deste mundo — mesmo sem saber — estão servindo ao teu plano. Que eu veja a tua soberania nas circunstâncias que me parecem obstáculos, e que nelas encontre a tua providência operando silenciosamente. Amém.`;
  // [9]
  if (d.livroAbrev === 'Lc' && /jesus.*apresentado.*templo/i.test(p))
    return `Senhor Jesus, luz para iluminar as nações, que a tua apresentação no templo lembre à nossa comunidade que a salvação que recebes não é propriedade privada de nenhum povo. Que sejamos, como Simeão, portadores da esperança de todas as nações — e que os nossos braços estejam abertos para receber e entregar. Amém.`;
  // [10]
  if (d.livroAbrev === 'Lc' && /menino.*jesus.*templo/i.test(p))
    return `Pai celeste, tu és o lar do teu Filho desde antes da criação. Que a casa do Pai seja o lugar mais natural para os nossos filhos também — não estranho nem obrigatório, mas atraente e formativo. E que as perguntas difíceis sobre a fé sejam incentivadas, não silenciadas, em nossas famílias e comunidades. Amém.`;
  // [11]
  if (d.livroAbrev === 'Lc' && /proclamacao.*joao.*batista/i.test(p))
    return `Senhor, que o arrependimento que preg amos tenha endereço concreto — que mude o que o publicano faz com o dinheiro e o que o soldado faz com o poder. Guarda-me de uma pregação que emocionalmente toca mas praticamente não transforma. Que os frutos do arrependimento sejam visíveis e verificáveis. Amém.`;
  // [12]
  if (d.livroAbrev === 'Lc' && /batismo.*jesus/i.test(p))
    return `Pai, que abres o céu sobre os que oram, que os momentos mais decisivos da minha vida e missão brotem do lugar de oração. Que eu não busque a identidade na aclamação humana mas na voz que diz "és meu Filho amado" — e que isso me sustente em tudo o que vier depois. Amém.`;
  // [13]
  if (d.livroAbrev === 'Lc' && /ancestrais.*jesus/i.test(p))
    return `Deus de toda a humanidade, que em Jesus recapitulaste o que Adão perdeu, obrigado por uma salvação que não pertence a uma única etnia ou cultura. Que a universalidade do evangelho me liberte de qualquer forma de exclusivismo e me abra para servir a toda a humanidade como imagem de Deus a ser restaurada. Amém.`;
  // [14]
  if (d.livroAbrev === 'Lc' && /tentacao.*jesus/i.test(p))
    return `Senhor Jesus, que venceste cada tentação pela Palavra do Pai, equipa-me com a Escritura não como argumento intelectual mas como dependência real de Deus. Que quando os meios errados parecerem mais rápidos para fins aparentemente bons, eu responda como tu respondeste: "Está escrito." Fortifica em mim a identidade de filho que não precisa provar nada. Amém.`;
  // [15]
  if (d.livroAbrev === 'Lc' && /rejection.*nazare/i.test(p))
    return `Senhor, que passaste por entre os que queriam te destruir e seguiste em frente, guarda-me do desânimo quando a rejeição vem de quem mais esperava receber. Que eu não domestique o evangelho para evitar resistência, mas o anuncie com fidelidade — e que a rejeição não me defina nem me paralise. Amém.`;
  // [16]
  if (d.livroAbrev === 'Lc' && /jesus.*expulsa.*mau.*espirito/i.test(p))
    return `Senhor que ensinas e liberta com a mesma autoridade, que a nossa proclamação do reino não seja separada da sua demonstração. Que onde houver opressão espiritual, enfermidade e exclusão, a tua Igreja chegue com a mesma autoridade — palavra e ação juntas — e proclame que o reino de Deus chegou. Amém.`;
  // [17]
  if (d.livroAbrev === 'Lc' && /jesus.*chama.*primeiro.*discipulos/i.test(p))
    return `Senhor, que chamas pecadores conhecidos a si mesmos, obrigado por não esperares que eu me tornasse suficiente antes de me convocar. Que o encontro com a tua santidade não me afaste mas me encaminhe ao chamado — e que deixar as redes não seja perda mas libertação para o que é verdadeiramente maior. Amém.`;
  // [18]
  if (d.livroAbrev === 'Lc' && /jesus.*purifica.*um.*leproso/i.test(p))
    return `Senhor que tocas o intocável e dizes "quero," que a nossa missão não cuide à distância segura. Que eu tenha a coragem do teu toque — a presença real com os excluídos, a proximidade que cura antes de qualquer palavra formal. E que o tempo de oração depois da cura, como o teu no deserto, nos recarregue para continuar. Amém.`;
  // [19]
  if (d.livroAbrev === 'Lc' && /jesus.*cura.*paralitico/i.test(p))
    return `Senhor que perdoas e curas, obrigado por amigos que não aceitam barreiras quando alguém precisa chegar a ti. Faz de mim esse amigo — que invente caminhos, que não desista da instituição mas a contorne quando necessário para que o necessitado chegue. E que eu lembre que o que mais preciso não é a cura visível, mas o teu perdão. Amém.`;
  // [20]
  if (d.livroAbrev === 'Lc' && /jesus.*chama.*levi/i.test(p))
    return `Jesus, que sentas à mesa com quem a religião exclui, que a nossa comunidade seja lugar de banquete para os que a sociedade rotula de "errados." Que a nossa mesa seja ampla como a tua — e que ninguém que venha com coração aberto seja mandado embora por falta de credencial religiosa. Amém.`;
  // [21]
  if (d.livroAbrev === 'Lc' && /pergunta.*sobre.*jejum/i.test(p))
    return `Senhor Noivo, que estás presente em meio ao teu povo, que eu saiba discernir o tempo — quando celebrar e quando lamentar, quando quebrar o pão com alegria e quando dobrar o joelho no jejum. Que as nossas práticas religiosas sejam moldadas pela tua presença ou ausência, não pela tradição vazia. Amém.`;
  // [22]
  if (d.livroAbrev === 'Lc' && /parabolas.*vinho.*manto/i.test(p))
    return `Deus que fazes novas todas as coisas, guarda-me da resistência ao novo que tu trazes — não por amor à inovação, mas por amor ao vinho do teu Espírito. Que eu seja odre novo, flexível e disposto, capaz de conter o que tu derramares na minha geração. Amém.`;
  // [23]
  if (d.livroAbrev === 'Lc' && /pergunta.*sobre.*sabado/i.test(p))
    return `Senhor do sábado, que instituíste o descanso como dom e não como fardo, guarda-me de usar as tuas ordenanças contra as pessoas que elas deveriam servir. Que eu saiba quando a regra serve ao ser humano e quando o oprime — e que em ambos os casos, escolha o caminho do teu coração. Amém.`;
  // [24]
  if (d.livroAbrev === 'Lc' && /homem.*mao.*seca/i.test(p))
    return `Senhor Jesus, que não adiaste a cura por conveniência religiosa, livra-me de usar a observância como desculpa para não agir com misericórdia. Que a pergunta que fazes — "é lícito fazer bem ou fazer mal no sábado?" — ressoe em mim cada vez que uma regra ameaça substituir a compaixão. Amém.`;
  // [25]
  if (d.livroAbrev === 'Lc' && /jesus.*escolhe.*doze.*apostolos/i.test(p))
    return `Pai, que teu Filho passou a noite inteira em oração antes de escolher os doze, ensina-nos que liderança nasce da intimidade contigo antes da habilidade administrativa. Que cada decisão sobre quem serve e como serve na tua Igreja brote de noites de oração, não apenas de análise humana. Amém.`;
  // [26]
  if (d.livroAbrev === 'Lc' && /bencaos.*lamentos/i.test(p))
    return `Senhor que declara bem-aventurados os que o mundo chama de pobres, que o Magnificat e as bem-aventuranças me protejam de uma teologia que confunde bênção divina com prosperidade humana. Que eu encontre a minha segurança não nas aprovações do presente mas nas promessas do reino que virá. Amém.`;
  // [27]
  if (d.livroAbrev === 'Lc' && /amor.*inimigos/i.test(p))
    return `Pai que fazes nascer o sol sobre bons e maus, que o amor que tu praticas seja o amor que eu imite — não o amor que calcula retorno, mas o que age como filho do Altíssimo. Quando o amor a inimigos parecer impossível, lembra-me de que és tu que amas em mim, não eu por mim mesmo. Amém.`;
  // [28]
  if (d.livroAbrev === 'Lc' && /judging others/i.test(p))
    return `Senhor misericordioso, que me perdoaste uma dívida que eu jamais poderia pagar, guarda-me de medir os outros com a régua que eu próprio não conseguiria cumprir. Que a consciência do quanto fui perdoado produza em mim a generosidade do perdão, e não a severidade do credor. Amém.`;
  // [29]
  if (d.livroAbrev === 'Lc' && /discipulo.*mestre/i.test(p))
    return `Senhor Jesus, meu único Mestre, que eu não escolha modelos humanos que me levem ao barranco por cegueira espiritual. Que os olhos da minha alma estejam fixos em ti — e que a formação que recebo e transmito tenha teu caráter como padrão, não o sucesso visível de líderes humanos. Amém.`;
  // [30]
  if (d.livroAbrev === 'Lc' && /argueiro.*olho.*irmao/i.test(p))
    return `Senhor, que vês a viga onde eu enxergo apenas argueiro, faz em mim o trabalho de auto-exame honesto antes de qualquer correção fraterna. Que eu não me torne tribunal do irmão enquanto evito o espelho. E quando chegar a hora de cuidar do outro, que seja com a clareza de quem já passou pela própria cirurgia. Amém.`;
  // [31]
  if (d.livroAbrev === 'Lc' && /arvore.*frutos/i.test(p))
    return `Senhor que conheces a árvore pelo fruto, examina o meu coração — não apenas as minhas ações visíveis. Que o que sai da minha boca, das minhas decisões e dos meus relacionamentos revele um tesouro que foi renovado por ti. Transforma-me de dentro, Senhor, porque só tu podes mudar a natureza da árvore. Amém.`;
  // [32]
  if (d.livroAbrev === 'Lc' && /dois.*alicerces/i.test(p))
    return `Senhor que és a rocha sobre a qual edifico, guarda-me de ser ouvinte que acumula conhecimento sem obediência. Que cada palavra tua que escuto, que canta, que prego, seja também palavra que faço — e que o meu fundamento seja verificado não nas bonançcas mas nas tormentas que certamente virão. Amém.`;
  // [33]
  if (d.livroAbrev === 'Lc' && /jesus.*cura.*servo.*centuriao/i.test(p))
    return `Senhor, cuja autoridade um soldado romano reconheceu melhor do que os religiosos de Israel, que eu também reconheça a tua palavra como suficiente — sem precisar de tua presença física, sem precisar de confirmação humana. "Dize apenas uma palavra" — que seja essa a minha oração sempre. Amém.`;
  // [34]
  if (d.livroAbrev === 'Lc' && /jesus.*ressuscita.*filho.*viuva.*naim/i.test(p))
    return `Jesus que te comoves antes de ser pedido e ages antes de ser invocado, obrigado por ver a dor que eu nem sei articular. Que a nossa missão tenha essa mesma iniciativa compassiva — chegando ao cortejo que ninguém convocou a ajudar, com a palavra que ninguém esperava ouvir: "Levanta-te." Amém.`;
  // [35]
  if (d.livroAbrev === 'Lc' && /mensageiros.*joao.*batista/i.test(p))
    return `Senhor, quando a dúvida chegar — e ela chegará — que eu leve ao lugar onde as evidências falam por si. Cegos que veem, coxos que andam, pobres que ouvem as boas novas. Que a missão seja a minha resposta à pergunta de quem duvida, e que eu não adie o serviço esperando que a dúvida desapareça primeiro. Amém.`;
  // [36]
  if (d.livroAbrev === 'Lc' && /ninguem.*maior.*joao/i.test(p))
    return `Senhor do reino que supera toda a era dos profetas, obrigado por me dar acesso ao que reis e profetas desejaram ver e não viram. Que a grandeza desse privilégio não me ensoberbeça mas me humilhe — e que eu sirva no reino como quem conhece o valor inestimável do que recebeu. Amém.`;
  // [37]
  if (d.livroAbrev === 'Lc' && /povo.*esta.*geracao/i.test(p))
    return `Senhor, que vieste em ascese e em festa e foste rejeitado nas duas formas, guarda-me da irracionalidade da recusa de ser alcançado. Que o meu coração permaneça disponível e mole diante de ti — não construindo objeções como defesa, mas abrindo-se como quem sabe que precisa de ti. Amém.`;
  // [38]
  if (d.livroAbrev === 'Lc' && /mulher.*pecadora.*perdoada/i.test(p))
    return `Jesus que perdoas muito e recebes amor profundo em resposta, obrigado por um perdão que não exige que eu primeiro me recomponha. Que a consciência do quanto me foi perdoado gere em mim o amor intenso que a mulher demonstrou — não vergonha paralisante, mas adoração libertadora. Amém.`;
  // [39]
  if (d.livroAbrev === 'Lc' && /algumas.*mulheres.*acompanham/i.test(p))
    return `Senhor Jesus, que incluíste mulheres como parceiras centrais desde o início da tua missão, que a nossa Igreja siga o teu padrão — valorizando, ouvindo e enviando mulheres como colaboradoras plenas do reino. Que nenhuma estrutura humana restrinja o que tu já includaste desde Galileia. Amém.`;
  // [40]
  if (d.livroAbrev === 'Lc' && /parabola.*semeador/i.test(p))
    return `Senhor semeador, que lançastes a Palavra com generosidade sobre todo tipo de terreno, ajuda-me a preparar o solo do meu coração — removendo a dureza, arrancando os espinhos, aprofundando a terra. Que a Palavra que cai sobre mim não seja roubada, não murche, não seja sufocada — mas produza fruto ao longo do tempo. Amém.`;
  // [41]
  if (d.livroAbrev === 'Lc' && /they may look/i.test(p))
    return `Senhor, que falas em parábolas para revelar aos que têm ouvidos e ocultar aos que endureceram, que eu permaneça entre os que ouvem com gratidão, não entre os que ouvem com indiferença. Que a tua Palavra nunca se torne para mim apenas conteúdo familiar — mas semente que sempre encontra terra nova para frutificar. Amém.`;
  // [42]
  if (d.livroAbrev === 'Lc' && /significado.*parabola.*semeador/i.test(p))
    return `Senhor, que medes a fé pela perseverança e não pela intensidade inicial, guarda o meu coração dos espinhos dos cuidados, das riquezas e dos prazeres que sufocam sem que eu perceba. Que a tua Palavra em mim seja raiz profunda que aguenta a seca da tentação e a pressão da decepção. Amém.`;
  // [43]
  if (d.livroAbrev === 'Lc' && /lampada.*sob.*pote/i.test(p))
    return `Senhor, que não aceitas lâmpadas escondidas, que o que recebi de ti seja exposto — no serviço, na palavra, na vida — não escondido sob o cuidado excessivo de guardar o que é meu. Que eu ouça com a intenção de fazer, não apenas de acumular. E que o que tenho seja multiplicado pela fidelidade de usá-lo. Amém.`;
  // [44]
  if (d.livroAbrev === 'Lc' && /verdadeiros.*parentes.*jesus/i.test(p))
    return `Senhor Jesus, que redefiniste família pela obediência à Palavra, obrigado por me incluir na tua família não pelo nascimento mas pela escuta e prática. Que a comunidade de fé seja para mim família real — e que a Palavra que nos une seja mais profunda do que qualquer laço de conveniência ou costumes compartilhados. Amém.`;
  // [45]
  if (d.livroAbrev === 'Lc' && /jesus.*acalma.*tempestade/i.test(p))
    return `Senhor das tormentas e das bonançcas, quando o barco da minha vida encher de água, que eu não grite de desespero vazio mas acorde quem pode repreender o vento. Que a tua palavra "passemos para o outro lado" seja o âncora que segura a fé quando os olhos veem apenas ondas. Amém.`;
  // [46]
  if (d.livroAbrev === 'Lc' && /jesus.*cura.*endemoninhado.*geraseno/i.test(p))
    return `Jesus, que restauras o endemoninhado e o envias como testemunha, obrigado por preferires uma vida à prosperidade de mil porcos. Que eu nunca calcule o custo da misericórdia em termos de conveniência própria — e que onde tu curares, eu envie o curado a proclamar, mesmo que o ambiente não seja receptivo. Amém.`;
  // [47]
  if (d.livroAbrev === 'Lc' && /uma.*mulher.*curou/i.test(p))
    return `Senhor Jesus, que paraste no meio da multidão para ver a invisível, que os teus olhos se voltem para os que a urgência tende a atropelar — e que os meus olhos aprendam o mesmo. Que ninguém seja tratado como obstáculo no caminho da missão quando é exatamente a missão. Amém.`;
  // [48]
  if (d.livroAbrev === 'Lc' && /menina.*restaurada.*vida/i.test(p))
    return `Senhor que dizes "não morreu, dorme" diante do que todos declararam morto, fala essa palavra sobre o que em mim e ao meu redor parece irreversível. Que a minha fé não se governe pelos diagnósticos humanos mas pela tua capacidade de transformar cada final em começo. Que eu acredite na ressurreição antes da pedra ser rolada. Amém.`;
  // [49]
  if (d.livroAbrev === 'Lc' && /missao.*doze/i.test(p))
    return `Senhor que envias com pouco para que dependamos de ti completamente, guarda-me da missão sobrecarregada que confia mais nos recursos que no Espírito. Que eu vá com o necessário e nada mais — e que a dependência forçada pelas tuas instruções mínimas se torne o meio pelo qual o Espírito se manifesta plenamente. Amém.`;
  // [50]
  if (d.livroAbrev === 'Lc' && /perplexidade.*herodes/i.test(p))
    return `Senhor Jesus, que perturbastes a consciência de Herodes mesmo depois de sua morte, que a questão "quem é este?" nunca deixe de me perseguir com exigência de resposta pessoal. Guarda-me de resolver a pergunta sobre ti com respostas herdadas — que ela permaneça viva e urgente dentro de mim. Amém.`;
  // [51]
  if (d.livroAbrev === 'Lc' && /alimentacao.*cinco.*mil/i.test(p))
    return `Senhor que multiplicas o que parece insuficiente quando é colocado em tuas mãos, que eu nunca retenha o que tenho com a desculpa de que é pouco. Que o ato de oferecer ao teu olhar e à tua bênção o que sou e o que tenho seja o começo de todo milagre de multiplicação que está esperando por mim. Amém.`;
  // [52]
  if (d.livroAbrev === 'Lc' && /declaracao.*pedro.*jesus/i.test(p))
    return `Senhor Jesus, que perguntas "vós, quem dizeis que sou eu?", que a minha resposta não seja eco da opinião coletiva mas confissão pessoal forjada no encontro real contigo. Que "o Cristo de Deus" não seja para mim resposta de catecismo mas declaração que molda toda a minha vida. Amém.`;
  // [53]
  if (d.livroAbrev === 'Lc' && /jesus.*prediz.*morte.*ressurreicao/i.test(p) && d.capitulos.startsWith('9'))
    return `Senhor Jesus, que anunciaste a rejeição e a morte como necessidade — não acidente — ensina-me a ver o sofrimento fiel não como falha da providência mas como cumprimento do caminho que tu mesmo percorreste. Que o "deve sofrer" da tua boca torne o meu próprio sofrimento cheio de sentido escatológico. Amém.`;
  // [54]
  if (d.livroAbrev === 'Lc' && /natureza.*discipulado/i.test(p))
    return `Senhor Jesus, que convidaste a carregar a cruz cada dia, guarda-me do discipulado de domingo que não transborda para a segunda-feira. Que a negação de mim mesmo seja renovada cada manhã — não como automortificação religiosa, mas como reorientação de vida em direção a ti. Amém.`;
  // [55]
  if (d.livroAbrev === 'Lc' && /transfiguracao/i.test(p))
    return `Senhor glorioso, que revelaste a tua glória no contexto da conversa sobre a morte em Jerusalém, que os momentos de visão clara de quem tu és não me desviem do caminho da cruz mas me deem forças para percorrê-lo. Que a voz do Pai — "a ele ouvi" — seja a única autoridade que guia meus passos daqui em diante. Amém.`;
  // [56]
  if (d.livroAbrev === 'Lc' && /jesus.*cura.*menino.*demonio/i.test(p))
    return `Senhor Jesus, que desceste do monte da glória para o vale da incredulidade, que eu não fique preso nas alturas quando o mundo ao meu redor precisa da tua libertação. Que a visão não me afaste da missão, e que o teu poder desça comigo do monte para agir onde a necessidade é real. Amém.`;
  // [57]
  if (d.livroAbrev === 'Lc' && /jesus.*novamente.*prediz.*morte/i.test(p))
    return `Senhor que anuncias a morte e a ressurreição com a mesma serenidade, que eu aprenda a receber as tuas palavras mesmo quando não as entendo ainda. Que o ocultamento providencial de certas verdades não me faça desistir da escuta — porque o que está encoberto hoje será revelado no momento que tu escolheres. Amém.`;
  // [58]
  if (d.livroAbrev === 'Lc' && /ambicao.*ciume.*repreendidos/i.test(p))
    return `Senhor Jesus, que colocaste uma criança no centro quando os discípulos disputavam grandeza, coloca em mim esse mesmo gesto — que eu volte ao menor quando o ego quiser o primeiro lugar. Guarda a nossa comunidade de competições por visibilidade. Que o menor entre nós seja honrado como tu honrarias. Amém.`;
  // [59]
  if (d.livroAbrev === 'Lc' && /samaritan aldeia/i.test(p))
    return `Senhor Jesus, que repreendes o desejo de fogo do céu sobre os que rejeitam, guarda-me de qualquer impulso de retaliação disfarçado de zelo. Que a rejeição me oriente para a próxima aldeia, não para a vingança sobre a última. A missão é maior do que qualquer resistência que encontrar. Amém.`;
  // [60]
  if (d.livroAbrev === 'Lc' && /would-be seguidores/i.test(p))
    return `Senhor Jesus, que não suavizaste o chamado para facilitar o recrutamento, dá-me a honestidade de te seguir conhecendo o custo — e a graça de colocar-te antes de tudo o que é legítimo mas secundário. Que o meu "sim" seja real, não sentimental, e que o arado que ponho a mão não encontre os meus olhos olhando para trás. Amém.`;
  // [61]
  if (d.livroAbrev === 'Lc' && /missao.*setenta/i.test(p))
    return `Senhor da messe, que envias dois a dois e provês nos lugares para onde envias, que a nossa Igreja vá em confiança — sem excesso de recursos e sem escassez de fé. Que a hospitalidade que recebemos nos lares onde servimos seja tanto um dom ao missionário quanto uma bênção ao anfitrião. Amém.`;
  // [62]
  if (d.livroAbrev === 'Lc' && /lamentos.*cidades.*impenitentes/i.test(p))
    return `Senhor que lamenta sobre as cidades que mais receberam e menos responderam, que o privilégio espiritual da nossa comunidade nos torne mais responsáveis, não mais acomodados. Que ter ouvido o evangelho tantas vezes não produza em nós a pior das durezas — a da familiaridade que não mais se espanta. Amém.`;
  // [63]
  if (d.livroAbrev === 'Lc' && /retorno.*setenta/i.test(p))
    return `Senhor que reorienta a alegria dos missionários para o que é eterno, guarda-me de uma espiritualidade dependente de resultados visíveis. Que a alegria de servir brote do fato inalterável de que o meu nome está escrito nos céus — e que isso seja suficiente nos dias em que os frutos não aparecem. Amém.`;
  // [64]
  if (d.livroAbrev === 'Lc' && /jesus.*exulta/i.test(p))
    return `Pai celeste, que revelastes os mistérios do reino aos pequeninos e os ocultastes dos sábios segundo o mundo, obrigado por um acesso a ti que não depende de inteligência ou posição. Que eu me aproxime de ti com a humildade de quem sabe que só o Filho pode revelar o Pai. Amém.`;
  // [65]
  if (d.livroAbrev === 'Lc' && /parabola.*bom.*samaritano/i.test(p))
    return `Senhor Jesus, bom samaritano que se abaixou quando ninguém mais se abaixou, que eu responda à pergunta que importa: de quem fui próximo? Que a misericórdia em mim não espere pela definição de quem merece, mas seja movida pela compaixão diante de quem está ferido e nu no caminho. Vai e faze o mesmo — faço Senhor, pela tua graça. Amém.`;
  // [66]
  if (d.livroAbrev === 'Lc' && /jesus.*visita.*marta.*maria/i.test(p))
    return `Senhor Jesus, que distingues a boa parte da boa atividade, guarda-me de servir sem estar contigo. Que o tempo aos teus pés seja o que ordena e sustenta tudo o que faço — não luxo espiritual, mas necessidade da qual tudo o mais depende. Que eu escolha a boa parte antes de correr para as boas obras. Amém.`;
  // [67]
  if (d.livroAbrev === 'Lc' && /nao.*senhor.*oracao|nao lord.*oracao/i.test(p))
    return `Pai, que nos ensinastes a começar a oração pelo teu nome e pelo teu reino, reordena a minha oração para que o teu nome seja santificado antes que as minhas necessidades sejam listadas. Que "venha o teu reino" seja o eixo ao redor do qual todo pedido gira — e que ao final encontre proteção e não apenas satisfação. Amém.`;
  // [68]
  if (d.livroAbrev === 'Lc' && /sobre.*oracao/i.test(p))
    return `Pai celestial, que és melhor do que qualquer amigo humano ou pai terreno, que a parábola da importunação me liberte da oração tímida e me convide à persistência confiante. Que eu peça, busque e bata — não para convencer um Deus relutante, mas para exercitar a fé de quem sabe que o Pai dá o melhor de todos os dons: o Espírito Santo. Amém.`;
  // [69]
  if (d.livroAbrev === 'Lc' && /jesus.*belzebu/i.test(p))
    return `Senhor que expulsa pelo dedo de Deus, que o reino de Deus chegou sobre mim também. Guarda-me da explicação alternativa que recusa reconhecer o teu poder por orgulho ou conveniência. E onde houver vazio depois da libertação, preenche completamente — para que os sete piores não encontrem espaço vago. Amém.`;
  // [70]
  if (d.livroAbrev === 'Lc' && /verdadeira.*bem-aventuranca/i.test(p))
    return `Senhor, que defines a bem-aventurança pela escuta e obediência, e não pelo privilégio de nascimento ou posição religiosa, que eu encontre a minha identidade na Palavra recebida e praticada — não em qualquer vantagem externa. Que ouvir a tua voz e obedecer seja a única bem-aventurança que busco. Amém.`;
  // [71]
  if (d.livroAbrev === 'Lc' && /sinal.*jonas/i.test(p))
    return `Senhor maior que Jonas e Salomão, que os ninivitas e a rainha do sul me envergonhem na fé. Que a familiaridade com o evangelho nunca produza em mim a pior das incredulidades — a de quem ouviu tudo e por isso já não se espanta com nada. Faz o teu sinal ressurreto alcançar meu coração de novo, hoje. Amém.`;
  // [72]
  if (d.livroAbrev === 'Lc' && /luz.*corpo/i.test(p))
    return `Senhor que és a luz do mundo, que o teu olhar molde o meu olhar — para que o que contemplo, desejo e admiro seja o que te glorifica. Que o olho do meu coração seja simples, limpo e voltado para ti — para que o corpo inteiro irradie a luz que só tu podes colocar dentro. Amém.`;
  // [73]
  if (d.livroAbrev === 'Lc' && /jesus.*denuncia.*fariseus.*doutores/i.test(p))
    return `Senhor que denuncia a religiosidade de fachada, examina em mim qualquer tendência ao sepulcro adornado — a aparência de piedade sem a substância. Que o dízimo que ofereço não substitua a justiça e o amor. Que a tua denúncia seja cirurgia, não condenação — e que eu saia mais limpo por dentro do que quando entrei. Amém.`;
  // [74]
  if (d.livroAbrev === 'Lc' && /advertencia.*hipocrisia/i.test(p))
    return `Senhor que trazes à luz o que está oculto, que eu viva como quem sabe que tudo será manifesto — e que isso não me paralise com medo mas me liberte para a transparência. Que a minha vida pública e privada sejam a mesma — e que a única coisa a proclamar dos terraços seja o que já proclamo nos aposentos. Amém.`;
  // [75]
  if (d.livroAbrev === 'Lc' && /a quem.*temer/i.test(p))
    return `Senhor que conta os cabelos da minha cabeça, que o temor correto de ti me liberte de todos os temores menores. Que quando eu for levado perante autoridades por causa da fé, o Espírito Santo me dê as palavras — e que a confissão do teu nome seja mais natural do que o silêncio covarde. Amém.`;
  // [76]
  if (d.livroAbrev === 'Lc' && /parabola.*rico.*fool|rico.*insensato/i.test(p))
    return `Senhor que perguntas "o que preparaste, de quem será?", guarda-me da insensatez de construir celeiros maiores enquanto sou pobre para contigo. Que a riqueza que acumulo seja riqueza de fé, de generosidade e de atos de misericórdia — o único tesouro que não pode ser pedido de volta esta noite. Amém.`;
  // [77]
  if (d.livroAbrev === 'Lc' && /nao.*fique.*preocupado/i.test(p))
    return `Pai que alimentas os corvos e vestes os lírios, que a tua providência seja maior para mim do que qualquer ansiedade que o dia trouxer. Que eu busque primeiro o teu reino — não como fuga das responsabilidades, mas como a única reorientação que coloca tudo mais no lugar certo. Pequeno rebanho, não temas. Amém.`;
  // [78]
  if (d.livroAbrev === 'Lc' && /tesouro.*ceu/i.test(p))
    return `Senhor que sabes onde está o meu coração pelo destino dos meus recursos, que as minhas escolhas financeiras revelem e moldem as afeições eternas. Que eu invista onde a traça não corrói e o ladrão não chega — e que o meu coração siga o meu tesouro em direção a ti. Amém.`;
  // [79]
  if (d.livroAbrev === 'Lc' && /servos.*vigilantes/i.test(p))
    return `Senhor que virás na hora em que não pensamos, que me encontres vigilante — não ansioso com especulações sobre quando, mas fiel no que me chamaste a fazer. Que os lombos cingidos e as lâmpadas acesas sejam a postura permanente da minha vida, não o estado de emergência de última hora. Amém.`;
  // [80]
  if (d.livroAbrev === 'Lc' && /servo.*fiel.*infiel/i.test(p))
    return `Senhor que pedirás a quem muito recebeu, que o conhecimento da tua vontade que possuo seja traduzido em fidelidade proporcional. Guarda-me de usar o teu atraso como desculpa para relaxar o padrão. Que quando chegares, sejas encontrado em mim o que prometeste encontrar: um servo que estava fazendo o que lhe foi ordenado. Amém.`;
  // [81]
  if (d.livroAbrev === 'Lc' && /jesus.*causa.*divisao/i.test(p))
    return `Senhor que trazes divisão antes da paz, que eu não domestique o evangelho para manter o conforto social. Que onde tua palavra precisar cortar — mesmo dentro da minha família — eu não a suavize por medo. E que as divisões que vierem sejam suportadas com amor, não com indiferença. Amém.`;
  // [82]
  if (d.livroAbrev === 'Lc' && /sinais.*dos.*tempos/i.test(p))
    return `Senhor que desafias a hipocrisia da cegueira espiritual, abre os olhos da minha fé para reconhecer o que está acontecendo ao meu redor no plano do teu reino. Que eu não seja perito em prever o tempo e ignorante sobre o tempo em que vivo. Que o discernimento espiritual seja cultivado com a mesma atenção que dou à realidade visível. Amém.`;
  // [83]
  if (d.livroAbrev === 'Lc' && /opponent.*turn/i.test(p))
    return `Senhor que convidas à reconciliação urgente antes do julgamento, que eu não adie o que deve ser resolvido agora — com os outros e contigo. Que cada dia seja vivido como o caminho antes do tribunal, onde ainda é tempo de fazer as pazes. Guarda-me da presunção de que haverá sempre mais tempo. Amém.`;
  // [84]
  if (d.livroAbrev === 'Lc' && /arrependimento.*perdicao/i.test(p))
    return `Senhor que não usa a tragédia alheia para apontar culpa alheia mas para convocar o meu próprio arrependimento, que cada notícia de morte e sofrimento seja para mim um espelho, não um tribunal. Que eu não perca o convite que está embutido em cada crise: "Se não vos arrependerdes, todos igualmente perecereis." Amém.`;
  // [85]
  if (d.livroAbrev === 'Lc' && /parabola.*figueira.*esteril/i.test(p))
    return `Senhor paciente que dá mais um ano, mais uma chance, mais um inverno com adubo, obrigado por não teres me cortado quando merecia. Que este tempo de graça não seja desperdiçado — que o fruto que falta apareça agora, enquanto o jardineiro ainda intercede. Que eu não confunda a tua paciência com indiferença ao fruto. Amém.`;
  // [86]
  if (d.livroAbrev === 'Lc' && /jesus.*cura.*mulher.*aleijada/i.test(p))
    return `Senhor Jesus, que chamaste de "filha de Abraão" a mulher que o sistema religioso curvou por dezoito anos, lembra-me de que a identidade de aliança precede qualquer regulação institucional. Que a nossa Igreja seja lugar de desamarramento — onde os que chegam curvados pelo peso da religiosidade opressora se endireitem e glorifiquem a Deus. Amém.`;
  // [87]
  if (d.livroAbrev === 'Lc' && /parabola.*mostarda.*fermento/i.test(p))
    return `Senhor do reino que cresce nos dois sentidos — visível como árvore e invisível como fermento — que eu confie no teu trabalho silencioso quando os resultados não aparecem. Que eu não meça o crescimento do reino apenas pelo que consigo ver, mas creia que o fermento já está transformando de dentro o que os olhos ainda não percebem. Amém.`;
  // [88]
  if (d.livroAbrev === 'Lc' && /porta.*estreita/i.test(p))
    return `Senhor que não aceita a familiaridade superficial como substituta da entrada real, que o meu relacionamento contigo seja mais do que proximidade cultural ou participação social. Que eu entre pela porta estreita — e que a minha entrada seja verificada não apenas pelo que digo mas pelo que o teu conhecimento de mim confirma. Amém.`;
  // [89]
  if (d.livroAbrev === 'Lc' && /lamento.*sobre.*jerusalem/i.test(p))
    return `Senhor Jesus, que choraste sobre a cidade que te rejeitou, faz brotar em mim o teu mesmo coração partido sobre os que resistem ao evangelho. Que eu não responda à rejeição com satisfação ou indiferença, mas com o lamento de quem sabe o que se perde quem não quer ser reunido sob as tuas asas. Amém.`;
  // [90]
  if (d.livroAbrev === 'Lc' && /jesus.*cura.*hidropisia/i.test(p))
    return `Senhor que age primeiro e justifica depois, que eu não adie a misericórdia enquanto debate sobre o momento ou método certo. Que o silêncio dos que me observam para criticar não me paralise — e que quando a cura falar por si mesma, o debate não encontre onde se apoiar. Amém.`;
  // [91]
  if (d.livroAbrev === 'Lc' && /parabola.*grande.*jantar/i.test(p))
    return `Senhor que manda pelas praças e ruelas buscar os pobres, os mancos e os cegos para encher a tua mesa, que a nossa Igreja vá aos lugares onde estão os que nunca foram convidados — e os traga sem condição de apresentabilidade. Que a tua casa fique cheia, Senhor — e que os que declinaram vejam o que perderam. Amém.`;
  // [92]
  if (d.livroAbrev === 'Lc' && /custo.*discipulado/i.test(p))
    return `Senhor Jesus, que não atraíste multidões com promessas fáceis mas com convocações honestas, que eu não desonre o evangelho suavizando o custo. E que o custo que conheço não me assuste, mas me convença de que aquele que convoca é digno de tudo o que peço para deixar. Amém.`;
  // [93]
  if (d.livroAbrev === 'Lc' && /parabola.*ovelha.*perdida.*moeda.*perdida/i.test(p))
    return `Senhor que deixas os noventa e nove pela uma perdida, obrigado por me ter procurado quando eu era exatamente aquela uma. Que a alegria que o céu sentiu ao me encontrar continue sendo a alegria que motiva a nossa missão com os perdidos — não obrigação, mas participação na festa da busca. Amém.`;
  // [94]
  if (d.livroAbrev === 'Lc' && /parabola.*prodigo.*irmao/i.test(p))
    return `Pai que corres ao encontro antes de qualquer discurso de arrependimento, obrigado por não esperares que eu me recompusesse completamente antes de me abraçar. Que eu perceba em mim tanto o filho mais novo quanto o mais velho — e que a tua festa me alcance em qualquer um dos dois lugares. Amém.`;
  // [95]
  if (d.livroAbrev === 'Lc' && /parabola.*mordomo.*desonesto/i.test(p))
    return `Senhor que louva a criatividade a serviço do futuro, que eu use os recursos que tens confiado a mim com ao menos a mesma astúcia com que os filhos deste século usam os seus. Que a generosidade com o reino seja tão calculada e intencional quanto o é a minha poupança. E que o "muito pouco" que administro fielmente me habilite para o que é verdadeiramente grande. Amém.`;
  // [96]
  if (d.livroAbrev === 'Lc' && /lei.*reino.*deus/i.test(p))
    return `Senhor que inaugurou a nova era do reino por meio de João, que eu viva plenamente nessa era — sem retornar à lei como caminho de justificação, sem desprezar a lei como sem valor. Que a nova aliança em Cristo seja o ar que respiro e o fundamento sobre o qual tudo mais é construído. Amém.`;
  // [97]
  if (d.livroAbrev === 'Lc' && /rico.*lazaro/i.test(p))
    return `Senhor, o abismo que separou o rico de Lázaro depois da morte foi construído por decisões feitas enquanto havia tempo. Que a Lázaro à minha porta não seja invisível por hábito de olhar para longe. E que Moisés e os profetas — e tua ressurreição — sejam suficientes para me persuadir enquanto ainda há tempo. Amém.`;
  // [98]
  if (d.livroAbrev === 'Lc' && /alguns.*ditos.*jesus/i.test(p))
    return `Senhor que exiges perdão sete vezes ao dia e prometes ao grão de mostarda de fé o suficiente para mudar o mundo, aumenta em mim essa fé — não a sua quantidade, mas a sua direção real para ti. E que ao fim de tudo eu possa dizer com honestidade: "Sou servo inútil, fiz apenas o que era meu dever." Amém.`;
  // [99]
  if (d.livroAbrev === 'Lc' && /jesus.*purifica.*dez.*leprosos/i.test(p))
    return `Senhor Jesus, que curaste dez e recebeste gratidão de um, que eu seja o samaritano que voltou — o estrangeiro que reconheceu o que os de dentro tomaram como certo. Que a cura que recebi não se torne costume sem gratidão, e que o "onde estão os outros nove?" não seja a pergunta que fazes sobre mim. Amém.`;
  // [100]
  if (d.livroAbrev === 'Lc' && /vinda.*reino/i.test(p))
    return `Senhor do reino que já está presente e ainda virá, que eu não busque a manifestação gloriosa pulando a necessária passagem pelo sofrimento e pela rejeição. Que o "primeiro é necessário que ele padeça" molde a minha teologia da esperança — e que a vinda futura me anime para a fidelidade presente. Amém.`;
  // [101]
  if (d.livroAbrev === 'Lc' && /parabola.*viuva.*juiz.*injusto/i.test(p))
    return `Pai que fazes justiça em breve a quem clama dia e noite, que a tua promessa de justiça me sustente na persistência da oração quando as respostas demoram. Que eu não desanime — porque o juiz iníquo atendeu e tu és o Pai bom. E quando o Filho do Homem voltar, que encontre em mim uma fé que perseverou. Amém.`;
  // [102]
  if (d.livroAbrev === 'Lc' && /parabola.*fariseu.*publicano/i.test(p))
    return `Deus que justificas o que bate no peito e nada mais tem a oferecer, que a minha oração seja sempre a do publicano — não a comparação com o próximo, mas o olhar honesto para mim mesmo diante de ti. Sê misericordioso para comigo, pecador — e que esse pedido seja mais genuíno hoje do que ontem. Amém.`;
  // [103]
  if (d.livroAbrev === 'Lc' && /jesus.*abencoa.*criancas/i.test(p))
    return `Senhor Jesus, que acolheste as crianças quando os discípulos as repreendiam, que eu receba o teu reino com a mesma abertura, dependência e confiança que uma criança tem. Guarda a nossa Igreja de excluir os pequenos — e guarda-me de qualquer sofisticação adulta que fecha o coração para o que só os pequenos conseguem receber. Amém.`;
  // [104]
  if (d.livroAbrev === 'Lc' && /rico.*governante/i.test(p))
    return `Senhor Jesus, que o apego aos meus bens nunca seja o motivo pelo qual me afasto triste de ti. Que onde a riqueza ameaça ser obstáculo ao seguimento, tu sejas o que o impossível humano não consegue — e que o Deus para quem tudo é possível faça o que nenhum esforço meu poderia fazer. Amém.`;
  // [105]
  if (d.livroAbrev === 'Lc' && /jesus.*prediz.*morte.*ressurreicao/i.test(p) && d.capitulos.startsWith('18'))
    return `Senhor que anuncias a morte e a ressurreição com a mesma voz, que a minha fé não tropece nas partes da tua Palavra que ainda não entendo completamente. Que o ocultamento providencial de certos sentidos seja suportado com paciência — porque o mesmo Deus que prometeu a morte prometeu o terceiro dia. Amém.`;
  // [106]
  if (d.livroAbrev === 'Lc' && /jesus.*cura.*cego.*mendigo.*jerico/i.test(p))
    return `Senhor Jesus, que paras no meio do caminho para perguntar "que queres que eu te faça?", que eu aprenda a articular os meus pedidos com honestidade diante de ti — não porque não sabes, mas porque a fé se exercita na especificidade. Que a minha fé que me salva seja tão clara quanto a do cego de Jericó. Amém.`;
  // [107]
  if (d.livroAbrev === 'Lc' && /jesus.*zaqueu/i.test(p))
    return `Senhor Jesus, que te convidaste à casa do excluído antes que ele soubesse pedir, obrigado por teres descido quando eu estava na árvore da curiosidade — ainda sem saber que precisava de salvação, não apenas de uma boa visão. Que a salvação que veio à minha casa transforme também a minha relação com o que tenho e com quem prejudiquei. Amém.`;
  // [108]
  if (d.livroAbrev === 'Lc' && /parabola.*dez.*minas|parabola.*dez.*pounds/i.test(p))
    return `Senhor que voltarás para pedir contas das minas confiadas, que o tempo entre a tua partida e a tua volta seja vivido não em espera passiva mas em multiplicação fiel. Que o que recebi — dons, recursos, conhecimento, oportunidades — seja investido com criatividade no teu reino. Amém.`;
  // [109]
  if (d.livroAbrev === 'Lc' && /entrada.*triunfal/i.test(p))
    return `Senhor Jesus, que entraste em Jerusalém com louvor e chegaste às lágrimas sobre a cegueira da cidade, que a minha adoração seja acompanhada de visão real — não euforia festiva que ignora o que ainda está perdido. Que o choro de Jesus sobre o que não conheceu o tempo da sua visitação também me alcance. Amém.`;
  // [110]
  if (d.livroAbrev === 'Lc' && /jesus.*purifica.*templo/i.test(p))
    return `Senhor que reclamaste o templo como casa de oração, que a nossa vida comunitária seja espaço de encontro real contigo — não mercado de serviços religiosos. Que o que nos afasta da oração e do encontro contigo seja limpo com a mesma determinação com que limpaste o átrio. Amém.`;
  // [111]
  if (d.livroAbrev === 'Lc' && /autoridade.*questionado/i.test(p))
    return `Senhor Jesus, que respondeste à questão sobre a tua autoridade com uma pergunta que expôs a recusa dos interrogadores, que eu nunca faça da questão sobre ti um jogo retórico. Que a minha resposta sobre a tua autoridade seja clara e pessoal — e que ela molde cada decisão que tomo. Amém.`;
  // [112]
  if (d.livroAbrev === 'Lc' && /parabola.*arrendatarios.*impios/i.test(p))
    return `Senhor que és a pedra rejeitada tornada pedra angular, que eu nunca me encontre entre os que sabem quem és e ainda assim resistem ao teu senhorio. Que a vinha que me foi confiada produza fruto para o Dono — e que quando o Filho vier, seja recebido com as mãos abertas. Amém.`;
  // [113]
  if (d.livroAbrev === 'Lc' && /pergunta.*paying.*impostos/i.test(p))
    return `Senhor que distingues o que é de César do que é de Deus, que eu seja bom cidadão sem fazer do Estado um ídolo. E que o que pertence a ti — a minha imagem, a minha vida, a minha adoração — nunca seja cedido a nenhum poder humano, por mais legítimo que ele seja. Amém.`;
  // [114]
  if (d.livroAbrev === 'Lc' && /qusetion.*ressurreicao/i.test(p))
    return `Deus de Abraão, Isaque e Jacó, que és Deus de vivos e não de mortos, que a tua promessa de ressurreição seja para mim esperança concreta e não apenas doutrina abstrata. Que eu viva à luz da existência futura — e que o Deus que sustenta Abraão vivo me sustente também através da morte. Amém.`;
  // [115]
  if (d.livroAbrev === 'Lc' && /pergunta.*filho.*davi/i.test(p))
    return `Senhor Jesus, filho de Davi e Senhor de Davi ao mesmo tempo, que a tensão irresolúvel da tua identidade me liberte de cristologias reduzidas. Que eu não te reduza ao messias conveniente que serve aos meus propósitos — mas que te adore como o mistério pleno de Deus encarnado. Amém.`;
  // [116]
  if (d.livroAbrev === 'Lc' && /jesus.*denuncia.*escribas/i.test(p))
    return `Senhor que denuncia o ostento religioso combinado com a exploração dos vulneráveis, examina em mim qualquer uso da plataforma espiritual para ganho pessoal. Que a liderança que exerço sirva aos que mais precisam, não se sirva deles. E que a condenação mais severa não seja o que eu mereça por ignorar essa advertência. Amém.`;
  // [117]
  if (d.livroAbrev === 'Lc' && /viuva.*oferta/i.test(p))
    return `Senhor que vê o que a multidão não nota, que a minha oferta — de recursos, de tempo, de presença — seja medida pela tua régua, não pela do observador humano. Que eu dê da pobreza e não apenas das sobras, confiando que o Deus que viu a viúva vê também o que dou quando custa realmente algo. Amém.`;
  // [118]
  if (d.livroAbrev === 'Lc' && /destruicao.*templo.*predita/i.test(p))
    return `Senhor que não deixa pedra sobre pedra de estruturas que perdem a sua função, que eu não invista as minhas esperanças em beauties religiosas que tu já anunciaste que cairão. Que a beleza dos templos que construo seja proporcional à fidelidade da missão que sustentam. Amém.`;
  // [119]
  if (d.livroAbrev === 'Lc' && /end do mundo/i.test(p))
    return `Senhor que prometes boca e sabedoria nos momentos de perseguição, que eu não premediteis defesas ansiosas mas confie que o Espírito me ensinará no momento. Que o sofrimento por teu nome seja suportado como testemunho, não como derrota — e que a perseverança até ao fim salve a minha alma. Amém.`;
  // [120]
  if (d.livroAbrev === 'Lc' && /destruicao.*jerusalem.*predita/i.test(p))
    return `Senhor que cumpres as tuas palavras com precisão histórica verificável, que a queda de Jerusalém em 70 d.C. seja para mim a evidência concreta de que as demais promessas — de julgamento e de redenção — também se cumprirão. Que a fidelidade da tua Palavra no passado fundamente a minha confiança no que ainda está por vir. Amém.`;
  // [121]
  if (d.livroAbrev === 'Lc' && /vinda.*filho.*homem/i.test(p))
    return `Senhor Jesus, Filho do Homem que virás nas nuvens com poder e glória, que a perspectiva da tua vinda não me encha de ansiedade mas de esperança erguida. Que o que terroriza o mundo seja para mim o sinal de que a minha redenção está próxima — e que eu levante a cabeça em vez de baixar em medo. Amém.`;
  // [122]
  if (d.livroAbrev === 'Lc' && /parabola.*figueira(?!.*esteril)/i.test(p))
    return `Senhor, cujas palavras jamais passarão mesmo que o céu e a terra passem, que a Escritura seja o único ponto fixo sobre o qual ancoro a minha vida. Que eu não me entretenha com especulações cronológicas mas me ocupe com a fidelidade diária às tuas palavras permanentes. Amém.`;
  // [123]
  if (d.livroAbrev === 'Lc' && /exortacao.*vigilancia/i.test(p))
    return `Senhor que convida a vigiar orando, que a oração em todo tempo seja o meu estado permanente, não a postura de emergência. Guarda o meu coração da dissipação, da embriaguez e dos cuidados que entorpecem a vigilância. Que quando vieres, sejas encontrado em mim acordado e pronto. Amém.`;
  // [124]
  if (d.livroAbrev === 'Lc' && /complô.*matar.*jesus/i.test(p))
    return `Senhor Jesus, que foste traído por um dos teus sem que isso interrompesse o teu plano, que eu nunca tome decisões motivado por dinheiro ou conveniência que coloquem o meu interesse acima da fidelidade a ti. Que a advertência de Judas seja suficientemente vívida para fazer-me pausar antes de cada trade que o dinheiro propõe. Amém.`;
  // [125]
  if (d.livroAbrev === 'Lc' && /preparacao.*pascoa/i.test(p))
    return `Senhor que providencias antes de sermos enviados, que quando obedecemos às tuas instruções encontremos — como Pedro e João — exatamente o que prometeste. Que a minha missão seja sempre precedida pela tua providência, e que a fidelidade ao envio revele o aposento já preparado. Amém.`;
  // [126]
  if (d.livroAbrev === 'Lc' && /institution.*senhor.*ceia/i.test(p))
    return `Senhor Jesus, que deste o teu corpo e sangue como nova aliança, que cada vez que partimos o pão a tua morte seja proclamada e a tua vinda antecipada com alegria. Que a Ceia do Senhor não seja ritual automático mas encontro real com o Cristo que morreu, ressuscitou e voltará. Amém.`;
  // [127]
  if (d.livroAbrev === 'Lc' && /dispute.*grandeza/i.test(p))
    return `Senhor Jesus, que entre a instituição da Ceia e o debate sobre grandeza não puseste divisória de tempo, que eu reconheça como o ambiente mais sagrado não imuniza o coração da tentação de poder. Que eu sirva à mesa onde és anfitrião — não busque o lugar de honra ao lado de quem serve. Amém.`;
  // [128]
  if (d.livroAbrev === 'Lc' && /jesus.*prediz.*negacao.*pedro/i.test(p))
    return `Senhor Jesus, que rogaste por Pedro para que a sua fé não desfaleça — e que fizeste isso antes mesmo da queda — roga por mim também. Que a tua intercecessão me sustente nas horas em que o galo canta. E que de cada queda eu saia convertido para confirmar os meus irmãos. Amém.`;
  // [129]
  if (d.livroAbrev === 'Lc' && /bolsa.*espada/i.test(p))
    return `Senhor que mudas a forma da missão sem mudar o seu propósito, que eu discirna o tempo em que vivo — o que requer agora, o que posso soltar e o que preciso tomar. Que a sabedoria para discernir a fase da missão venha do Espírito, e que eu não aplique métodos de ontem ao hoje que tu inaugurastes. Amém.`;
  // [130]
  if (d.livroAbrev === 'Lc' && /jesus.*ora.*monte.*oliveiras/i.test(p))
    return `Pai, que acolheste a oração do teu Filho na agonia e enviaste um anjo para fortalecê-lo, que eu não tente enfrentar as oliveiras da vida sem primeiro dobrar os joelhos. Que "não se faça a minha vontade, mas a tua" seja a oração que me sustenta quando o cálice que recebo não é o que eu escolheria. Amém.`;
  // [131]
  if (d.livroAbrev === 'Lc' && /traicao.*prisao.*jesus/i.test(p))
    return `Senhor Jesus, que na hora da tua prisão ainda curaste a orelha do inimigo, que o teu gesto de misericórdia no pior momento seja o padrão da minha resposta nas minhas piores horas. Que o amor que não cessa nem na prisão seja o amor que carrego comigo onde quer que me levem. Amém.`;
  // [132]
  if (d.livroAbrev === 'Lc' && /pedro.*nega.*jesus/i.test(p))
    return `Senhor Jesus, que te voltaste e olhaste para Pedro sem acusação, que esse mesmo olhar me alcance quando negarei. Que o teu olhar não me destrua mas me converta — e que o choro que vier depois seja o começo da restauração, não o fim da história. Amém.`;
  // [133]
  if (d.livroAbrev === 'Lc' && /jesus.*perante.*concilio/i.test(p))
    return `Senhor Jesus, que no momento de maior vulnerabilidade fizeste a mais alta afirmação da tua identidade, que eu aprenda a não defender a minha identidade em Cristo pela força, mas a declará-la com a serenidade de quem sabe quem é. Que "desde agora estarei à direita do poder de Deus" seja a esperança que sustenta qualquer comparecimento diante das autoridades. Amém.`;
  // [134]
  if (d.livroAbrev === 'Lc' && /jesus.*antes.*de.*pilatos/i.test(p))
    return `Senhor Jesus, inocente condenado pelo poder que sabia a verdade, que a tua condenação injusta seja para mim a prova de que os sistemas humanos de poder não têm a última palavra. Que a verdade declarada por Pilatos — "não acho delito algum" — seja o que ressoa quando a injustiça tentar silenciar o teu evangelho. Amém.`;
  // [135]
  if (d.livroAbrev === 'Lc' && /jesus.*perante.*herodes/i.test(p))
    return `Senhor Jesus, que ficaste em silêncio diante de quem buscava espetáculo e não verdade, que eu aprenda a discernir quando falar e quando o silêncio é a palavra mais poderosa. Guarda-me de tratar a fé como entretenimento — e que a seriedade com que busco a tua presença seja proporcional ao silêncio que tu observas diante de quem não busca de verdade. Amém.`;
  // [136]
  if (d.livroAbrev === 'Lc' && /jesus.*sentenciado.*morte/i.test(p))
    return `Senhor Jesus, que foste condenado no lugar de Barrabás e no meu lugar, que a substituição que aconteceu no pretório seja sempre a lente através da qual eu leio a minha própria vida. O culpado foi solto. O inocente tomou o meu lugar. Que essa verdade me governe completamente. Amém.`;
  // [137]
  if (d.livroAbrev === 'Lc' && /jesus.*guiado.*para.*longe/i.test(p))
    return `Senhor Jesus, que a caminho da cruz ainda te preocupastes com as filhas de Jerusalém, que o teu modelo de serviço até o último momento forme em mim a mesma orientação para fora. Que quando eu carregar as minhas próprias cruzes, o meu olhar não fique apenas em mim mesmo, mas nos que caminham ao meu lado. Amém.`;
  // [138]
  if (d.livroAbrev === 'Lc' && /crucificacao/i.test(p))
    return `Pai, que ouviste o pedido de perdão do teu Filho para os que o crucificavam, que eu não reserve o perdão apenas para quando a dor passar — mas que o ofereça no momento mais agudo da ferida, à imagem do Cristo na cruz. Que "Pai, perdoa-lhes" seja a oração que brota antes mesmo da dor diminuir. Amém.`;
  // [139]
  if (d.livroAbrev === 'Lc' && /jesus.*dois.*criminosos/i.test(p))
    return `Senhor Jesus, que disseste "hoje estarás comigo no paraíso" a alguém que não tinha nada a oferecer além de um pedido honesto, obrigado por uma salvação que não tem prazo mínimo de qualificação. Que eu sempre lembre que entre a cruz e o paraíso há apenas uma palavra de misericórdia — e ela é suficiente. Amém.`;
  // [140]
  if (d.livroAbrev === 'Lc' && /morte.*de.*jesus/i.test(p))
    return `Pai, nas tuas mãos entrego o meu espírito também — não apenas no fim, mas em cada dia que vivo. Que o modelo de Jesus de morrer em oração, em entrega confiante, molde como eu enfrento cada perda, cada fim, cada soltar que a vida exige. Que o centurião que glorificou a Deus ao ver como Jesus morreu diga o mesmo ao ver como eu vivo. Amém.`;
  // [141]
  if (d.livroAbrev === 'Lc' && /sepultamento.*de.*jesus/i.test(p))
    return `Senhor, que descansas no sepulcro do sábado enquanto os teus anseiam por ungir o teu corpo, que eu aprenda a suportar os sábados da fé — os silêncios entre a sexta-feira da crise e o domingo da ressurreição. Que a fidelidade às práticas de devoção nos tempos escuros seja o que me mantém pronto para o amanhecer. Amém.`;
  // [142]
  if (d.livroAbrev === 'Lc' && /ressurreicao.*de.*jesus/i.test(p))
    return `Senhor ressurreto, que o sepulcro vazio sem a tua Palavra ainda causa confusão, que a memória das tuas promessas ilumine o que os olhos não conseguem ver. Que a ressurreição não seja para mim apenas doutrina mas a realidade que transforma o presente: tu vives, e por isso eu também viverei. Amém.`;
  // [143]
  if (d.livroAbrev === 'Lc' && /caminho.*emaus/i.test(p))
    return `Senhor Jesus, que caminhaste incógnito ao lado dos desapontados e explicaste as Escrituras e te revelaste no partir do pão, caminha comigo também nos meus Emaús — os dias em que as esperanças parecem enterradas. Que o coração arda quando ouço a tua Palavra, e que os olhos se abram quando me sentar à tua mesa. Amém.`;
  // [144]
  if (d.livroAbrev === 'Lc' && /jesus.*aparece.*discipulos/i.test(p))
    return `Senhor ressurreto, que comeste peixe para provar que a ressurreição é real e corporal, que a minha fé seja ancorada nessa realidade verificável — não em misticismo vago. Que a abertura do entendimento para as Escrituras e o poder do Espírito Santo me tornem testemunha capaz de proclamar o que vi e ouvi. Amém.`;
  // [145]
  if (d.livroAbrev === 'Lc' && /ascensao.*jesus/i.test(p))
    return `Senhor Jesus, que ascendeste abençoando e cujas mãos levantadas foram a última imagem que os discípulos viram, que a tua intercessão contínua à direita do Pai seja a maior segurança da minha vida. Que eu volte ao templo da adoração com a alegria daqueles que entenderam que a subida não foi abandono mas envio. Aguardo o teu retorno, Senhor. Amém.`;

  return (
    `Senhor, obrigado por falar através de "${d.pericope}". Que o que aprendi hoje em ${d.livroAbrev} ${d.capitulos} permaneça em mim como semente ao longo do dia. Em nome de Jesus, amém.`
  );
}


// ─── WhatsApp Share helpers ────────────────────────────────────────

function formatarDataCompartilhamento(): string {
  const now = new Date();
  const dias = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
  const meses = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  return `${dias[now.getDay()]}, ${now.getDate()} de ${meses[now.getMonth()]} de ${now.getFullYear()}`;
}

const DEVOCIONAL_URL = 'https://bibliavisual.fabionmiranda.com';

function gerarTextoWhatsApp(d: DiaDevocional): string {
  const data = formatarDataCompartilhamento();
  const reflexao = gerarReflexao(d);
  const oracao = gerarOracao(d);
  return (
    `📖 *Devocional do Dia — ${data}*\n\n` +
    `*${d.livro}* — ${d.livroAbrev} ${d.capitulos}\n` +
    `_${d.pericope}_\n\n` +
    `*✦ Reflexão*\n${reflexao}\n\n` +
    `*🙏 Oração*\n${oracao}\n\n` +
    `─────────────────────\n` +
    `*Bíblia Visual Expositiva*\n` +
    `${DEVOCIONAL_URL}`
  );
}


function DiaModal({ d, onClose, innerRef }: { d: DiaDevocional; onClose: () => void; innerRef?: React.RefObject<HTMLDivElement> }) {
  const isAT = d.testamento === 'AT';
  const cor = isAT ? C.atColor : C.ntColor;
  const corL = isAT ? C.goldL : C.blueL;
  const corB = isAT ? C.goldB : C.blueB;

  const pericopeIdx = useMemo(() => {
    const dias = LIVRO_INDEX.get(d.livro) ?? [];
    return dias.findIndex(x => x.dia === d.dia) + 1;
  }, [d]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(5,7,26,0.88)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(0.5rem, 3vw, 1.5rem)',
      }}
    >
      <motion.div
        ref={innerRef}
        initial={{ opacity: 0, scale: 0.93, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(160deg,#080a20 0%,#0b0d28 100%)',
          border: `1px solid ${corB}`,
          borderRadius: 'clamp(16px,4vw,28px)',
          width: '100%',
          maxWidth: 'min(1080px, 96vw)',
          padding: 'clamp(1.2rem,5vw,2.5rem)',
          boxShadow: `0 0 80px rgba(0,0,0,0.7), 0 0 0 1px ${corB}, inset 0 1px 0 rgba(255,255,255,0.06)`,
          position: 'relative',
          maxHeight: '95dvh',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* Fechar */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 18, right: 18,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 10, cursor: 'pointer', color: C.muted,
          padding: '6px 8px', display: 'flex', alignItems: 'center',
          transition: 'background 0.2s',
        }}>
          <X size={16} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: 'clamp(16px,4vw,28px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{
              width: 'clamp(40px,8vw,52px)', height: 'clamp(40px,8vw,52px)',
              borderRadius: 14, flexShrink: 0,
              background: corL, border: `1px solid ${corB}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 20px ${isAT ? 'rgba(255,200,80,0.2)' : 'rgba(80,200,255,0.2)'}`,
            }}>
              <BookOpen size={20} color={cor} />
            </div>
            <div>
              <div style={{ fontSize: 'clamp(10px,2.5vw,12px)', color: C.muted, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                Dia {d.dia} de {TOTAL_DIAS}
              </div>
              <BadgeTestamento t={d.testamento} />
            </div>
          </div>

          <h2 style={{
            fontFamily: '"Cinzel Decorative", serif',
            fontSize: 'clamp(20px,5vw,32px)',
            color: C.white, marginBottom: 6, lineHeight: 1.2,
          }}>
            {d.livro}
          </h2>
          <div style={{ fontSize: 'clamp(16px,4vw,20px)', color: cor, fontWeight: 800, marginBottom: 4 }}>
            {d.livroAbrev} {d.capitulos}
          </div>
          <div style={{ fontSize: 'clamp(14px,3.5vw,17px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
            {d.pericope}
          </div>
        </div>

        {/* Reflexao e Oracao */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 4 }}>
          {[
            {
              icon: <BookOpen size={14} />,
              label: 'Reflexao',
              text: gerarReflexao(d),
            },
            {
              icon: <Moon size={14} />,
              label: 'Oracao',
              text: gerarOracao(d),
            },
          ].map(({ icon, label, text }) => (
            <div key={label} style={{
              display: 'flex', gap: 12,
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid rgba(255,255,255,0.14)`,
              borderRadius: 14, padding: 'clamp(12px,3vw,18px) clamp(14px,3.5vw,20px)',
            }}>
              <div style={{ color: cor, marginTop: 2, flexShrink: 0 }}>{icon}</div>
              <div>
                <div style={{ fontSize: 'clamp(10px,2.5vw,11px)', color: cor, fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 'clamp(14px,3.2vw,16px)', color: 'rgba(255,255,255,0.92)', lineHeight: 1.8 }}>{text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quiasma */}
        <QuiasmaSection d={d} pericopeIdx={pericopeIdx} />

        {/* Progresso */}
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
            <span style={{ fontSize: 11, color: C.muted }}>Progresso anual</span>
            <span style={{ fontSize: 11, color: cor, fontWeight: 700 }}>
              {Math.round((d.dia / TOTAL_DIAS) * 100)}%
            </span>
          </div>
          <div style={{ height: 5, borderRadius: 100, background: C.bgCardH }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(d.dia / TOTAL_DIAS) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ height: '100%', borderRadius: 100, background: cor }}
            />
          </div>
        </div>

        {/* Rodapé da marca */}
        <div style={{
          marginTop: 28, borderTop: `1px solid ${corB}`,
          paddingTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 13, color: C.white, fontWeight: 800, marginBottom: 2 }}>
              Bíblia Visual Expositiva
            </div>
            <div style={{ fontSize: 11, color: cor }}>{DEVOCIONAL_URL}</div>
          </div>
          <div style={{ fontSize: 10, color: C.muted, textAlign: 'right', lineHeight: 1.6 }}>
            Devocional Espelhado<br />por Perícopes Quiásticas
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main Page
export default function DevocionalPage() {
  const hoje = getDayOfYear();

  const livroHoje = diaMap.get(hoje)?.livro ?? LIVROS_LIST[0];
  const livroHojeIdx = LIVROS_LIST.indexOf(livroHoje);

  const [livroIdx, setLivroIdx] = useState(livroHojeIdx >= 0 ? livroHojeIdx : 0);
  const [diaSel, setDiaSel] = useState<DiaDevocional | null>(null);
  const [busca, setBusca] = useState('');
  const [mostraBusca, setMostraBusca] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [toast, setToast] = useState('');
  const modalContentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleShare = useCallback(async (d: DiaDevocional) => {
    // 1. Abre o modal real
    setDiaSel(d);
    setSharing(true);
    // 2. Aguarda animação + render completo
    await new Promise(r => setTimeout(r, 700));
    try {
      const el = modalContentRef.current;
      if (!el) throw new Error('modal not ready');

      // 3. Remove restrições de scroll temporariamente
      const prevMaxH  = el.style.maxHeight;
      const prevOverY = el.style.overflowY;
      el.style.maxHeight = 'none';
      el.style.overflowY = 'visible';
      await new Promise(r => setTimeout(r, 80));

      // 4. Captura o modal completo
      const fullPng = await toPng(el, {
        pixelRatio: 2,
        width:  el.offsetWidth,
        height: el.scrollHeight,
        backgroundColor: '#080a20',
      });

      // 5. Restaura scroll
      el.style.maxHeight = prevMaxH;
      el.style.overflowY = prevOverY;

      // 6. Escala para 1080×1350 (feed Instagram 4:5) via canvas
      const IG_W = 1080, IG_H = 1350;
      const img = new Image();
      img.src = fullPng;
      await new Promise<void>(r => { img.onload = () => r(); });

      const canvas = document.createElement('canvas');
      canvas.width  = IG_W;
      canvas.height = IG_H;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#080a20';
      ctx.fillRect(0, 0, IG_W, IG_H);

      // Escala proporcional — cabe inteiro na largura, centraliza verticalmente
      const scale = IG_W / img.width;
      const sw = img.width  * scale;
      const sh = img.height * scale;
      const sy = sh <= IG_H ? (IG_H - sh) / 2 : 0;
      ctx.drawImage(img, 0, sy, sw, Math.min(sh, IG_H));

      // 7. Download
      const link = document.createElement('a');
      link.download = `devocional-dia-${d.dia}-${d.livroAbrev.toLowerCase()}-instagram.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      // 8. Abre WhatsApp
      window.open(`https://wa.me/?text=${encodeURIComponent(gerarTextoWhatsApp(d))}`, '_blank');
      setToast('Imagem 1080×1350px baixada! Anexe-a no WhatsApp 📎');
    } catch {
      setToast('Erro ao gerar imagem. Tente novamente.');
    } finally {
      setSharing(false);
      setTimeout(() => setToast(''), 4500);
    }
  }, []);

  const livroSel = LIVROS_LIST[livroIdx];
  const diasLivro = LIVRO_INDEX.get(livroSel) ?? [];

  const resultadosBusca = useMemo(() => {
    if (!busca.trim()) return [];
    const q = busca.toLowerCase();
    return PLANO_COMPLETO.filter(d =>
      d.livro.toLowerCase().includes(q) ||
      d.pericope.toLowerCase().includes(q) ||
      d.tema.toLowerCase().includes(q) ||
      d.versiculo.toLowerCase().includes(q)
    ).slice(0, 20);
  }, [busca]);

  useEffect(() => {
    if (mostraBusca) inputRef.current?.focus();
  }, [mostraBusca]);

  const diaHoje = diaMap.get(hoje);

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.white }}>
      <Navbar />
      <div style={{ paddingTop: 'clamp(68px,10vw,80px)' }}>

        {/* Hero */}
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          padding: 'clamp(2rem,6vw,3.5rem) clamp(1rem,4vw,2rem) 0',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 40 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: C.blueL, border: `1px solid ${C.blueB}`,
                borderRadius: 100, padding: '5px 16px',
              }}>
                <Calendar size={12} color={C.blue} />
                <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.2em', color: C.blue, textTransform: 'uppercase' }}>
                  Devocional Espelhado por Pericopes Quiasticas
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <h1 style={{
                  fontFamily: '"Cinzel Decorative", serif',
                  fontSize: 'clamp(22px,5vw,40px)',
                  color: C.white, marginBottom: 10, lineHeight: 1.2,
                }}>
                  Devocional Espelhado<br />
                  <span style={{ color: C.blue }}>por Pericopes - Blocos </span>
                </h1>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, maxWidth: 480 }}>
                  Uma pericope por dia — todos os 66 livros, do Genesis ao Apocalipse.
                  {TOTAL_DIAS} dias de jornada expositiva completa da Palavra (~5 anos).
                </p>
              </div>

              {diaHoje && (
                <motion.button
                  onClick={() => setDiaSel(diaHoje)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    all: 'unset', cursor: 'pointer',
                    background: 'linear-gradient(135deg,rgba(0,212,255,0.18),rgba(0,212,255,0.06))',
                    border: `1px solid ${C.blueB}`,
                    borderRadius: 18, padding: 'clamp(12px,3vw,16px) clamp(14px,4vw,22px)',
                    width: '100%', maxWidth: 360,
                    boxShadow: '0 0 32px rgba(0,212,255,0.15)',
                    boxSizing: 'border-box' as const,
                  }}
                >
                  <div style={{ fontSize: 9, color: C.blue, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
                    Leitura de Hoje
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: C.white, marginBottom: 4 }}>
                    {diaHoje.livroAbrev} {diaHoje.capitulos}
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>
                    {diaHoje.pericope}
                  </div>
                  <div style={{ fontSize: 10, color: C.blue }}>
                    Dia {diaHoje.dia} de {TOTAL_DIAS} →
                  </div>
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Barra de busca */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <motion.div
              animate={{ width: mostraBusca ? 'min(340px,80vw)' : 44 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: C.bgCard, border: `1px solid ${mostraBusca ? C.blueB : C.border}`,
                borderRadius: 100, overflow: 'hidden', height: 44,
                transition: 'border-color 0.2s',
              }}
            >
              <button
                onClick={() => { setMostraBusca(v => !v); if (mostraBusca) setBusca(''); }}
                style={{
                  all: 'unset', cursor: 'pointer', padding: '0 14px',
                  display: 'flex', alignItems: 'center', color: C.muted, flexShrink: 0,
                }}
              >
                {mostraBusca ? <X size={16} /> : <Search size={16} />}
              </button>
              {mostraBusca && (
                <input
                  ref={inputRef}
                  value={busca}
                  onChange={e => setBusca(e.target.value)}
                  placeholder="Buscar livro, perícope, tema…"
                  style={{ all: 'unset', flex: 1, fontSize: 14, color: C.white, paddingRight: 16 }}
                />
              )}
            </motion.div>
          </div>

          {/* Seletor de livros — painel elegante AT/NT */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${C.border}`,
            borderRadius: 20, padding: 'clamp(14px,4vw,20px)',
            marginBottom: 28,
          }}>
            {/* AT */}
            <div style={{ marginBottom: 14 }}>
              <div style={{
                fontSize: 9, fontWeight: 900, letterSpacing: '0.22em', color: C.atColor,
                textTransform: 'uppercase', marginBottom: 10,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ width: 24, height: 1, background: C.goldB, display: 'inline-block' }} />
                Antigo Testamento
                <span style={{ width: 24, height: 1, background: C.goldB, display: 'inline-block' }} />
              </div>
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 'clamp(4px,1.2vw,7px)',
              }}>
                {LIVROS_LIST.filter(l => LIVRO_TESTAMENTO.get(l) === 'AT').map(livro => {
                  const i = LIVROS_LIST.indexOf(livro);
                  const isActive = i === livroIdx;
                  const isHojeLivro = i === livroHojeIdx;
                  return (
                    <button
                      key={livro}
                      onClick={() => setLivroIdx(i)}
                      style={{
                        all: 'unset', cursor: 'pointer',
                        padding: 'clamp(5px,1.5vw,8px) clamp(9px,2vw,14px)',
                        borderRadius: 100,
                        fontSize: 'clamp(10px,2.5vw,12px)',
                        fontWeight: isActive ? 900 : isHojeLivro ? 700 : 500,
                        background: isActive
                          ? 'rgba(255,200,80,0.22)'
                          : isHojeLivro ? 'rgba(255,200,80,0.08)' : 'rgba(255,255,255,0.04)',
                        color: isActive ? C.atColor : isHojeLivro ? C.gold : 'rgba(255,255,255,0.65)',
                        border: `1px solid ${isActive ? C.goldB : isHojeLivro ? 'rgba(255,200,80,0.25)' : 'rgba(255,255,255,0.08)'}`,
                        transition: 'all 0.15s',
                        whiteSpace: 'nowrap',
                        boxShadow: isActive ? `0 0 12px rgba(255,200,80,0.18)` : undefined,
                        position: 'relative',
                      }}
                    >
                      {livro}
                      {isHojeLivro && (
                        <span style={{
                          position: 'absolute', top: -3, right: -3,
                          width: 7, height: 7, borderRadius: '50%',
                          background: C.atColor,
                          boxShadow: `0 0 6px ${C.atColor}`,
                        }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* NT */}
            <div>
              <div style={{
                fontSize: 9, fontWeight: 900, letterSpacing: '0.22em', color: C.ntColor,
                textTransform: 'uppercase', marginBottom: 10,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ width: 24, height: 1, background: C.blueB, display: 'inline-block' }} />
                Novo Testamento
                <span style={{ width: 24, height: 1, background: C.blueB, display: 'inline-block' }} />
              </div>
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 'clamp(4px,1.2vw,7px)',
              }}>
                {LIVROS_LIST.filter(l => LIVRO_TESTAMENTO.get(l) === 'NT').map(livro => {
                  const i = LIVROS_LIST.indexOf(livro);
                  const isActive = i === livroIdx;
                  const isHojeLivro = i === livroHojeIdx;
                  return (
                    <button
                      key={livro}
                      onClick={() => setLivroIdx(i)}
                      style={{
                        all: 'unset', cursor: 'pointer',
                        padding: 'clamp(5px,1.5vw,8px) clamp(9px,2vw,14px)',
                        borderRadius: 100,
                        fontSize: 'clamp(10px,2.5vw,12px)',
                        fontWeight: isActive ? 900 : isHojeLivro ? 700 : 500,
                        background: isActive
                          ? 'rgba(80,200,255,0.20)'
                          : isHojeLivro ? 'rgba(80,200,255,0.07)' : 'rgba(255,255,255,0.04)',
                        color: isActive ? C.ntColor : isHojeLivro ? C.blue : 'rgba(255,255,255,0.65)',
                        border: `1px solid ${isActive ? C.blueB : isHojeLivro ? 'rgba(80,200,255,0.25)' : 'rgba(255,255,255,0.08)'}`,
                        transition: 'all 0.15s',
                        whiteSpace: 'nowrap',
                        boxShadow: isActive ? `0 0 12px rgba(80,200,255,0.18)` : undefined,
                        position: 'relative',
                      }}
                    >
                      {livro}
                      {isHojeLivro && (
                        <span style={{
                          position: 'absolute', top: -3, right: -3,
                          width: 7, height: 7, borderRadius: '50%',
                          background: C.ntColor,
                          boxShadow: `0 0 6px ${C.ntColor}`,
                        }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Resultados de busca */}
          <AnimatePresence>
            {mostraBusca && busca.trim() && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ marginBottom: 28, overflow: 'hidden' }}
              >
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 12, fontWeight: 700 }}>
                  {resultadosBusca.length} resultado{resultadosBusca.length !== 1 ? 's' : ''}
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,200px),1fr))',
                  gap: 'clamp(6px,2vw,10px)',
                }}>
                  {resultadosBusca.map(d => (
                    <DiaCard
                      key={d.dia}
                      d={d}
                      isHoje={d.dia === hoje}
                      onClick={() => setDiaSel(d)}
                      onShare={handleShare}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pericopes do livro */}
          {!mostraBusca && (
            <AnimatePresence mode="wait">
              <motion.div
                key={livroSel}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div style={{
                  display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20,
                }}>
                  <h2 style={{
                    fontFamily: '"Cinzel Decorative", serif',
                    fontSize: 'clamp(16px,3.5vw,26px)',
                    color: C.white,
                  }}>
                    {livroSel}
                  </h2>
                  <span style={{ fontSize: 12, color: C.muted }}>
                    {diasLivro.length} pericope{diasLivro.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <LivroProgress dias={diasLivro} hoje={hoje} />

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,200px),1fr))',
                  gap: 'clamp(6px,2vw,10px)', paddingBottom: 80,
                }}>
                  {diasLivro.map((d, i) => (
                    <motion.div
                      key={d.dia}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.015, duration: 0.3 }}
                    >
                      <DiaCard
                        d={d}
                        isHoje={d.dia === hoje}
                        onClick={() => setDiaSel(d)}
                        onShare={handleShare}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {diaSel && <DiaModal d={diaSel} onClose={() => setDiaSel(null)} innerRef={modalContentRef} />}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(10,14,40,0.97)', border: '1px solid rgba(37,211,102,0.45)',
              borderRadius: 100, padding: '10px 22px', zIndex: 2000,
              fontSize: 13, color: '#fff', fontWeight: 600,
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              whiteSpace: 'nowrap',
            }}
          >
            {sharing ? '⏳ Gerando imagem...' : toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading overlay ao gerar imagem */}
      <AnimatePresence>
        {sharing && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 1500,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(5,7,26,0.97)',   // opaco — esconde o InstagramCard abaixo
              pointerEvents: 'none',
            }}
          >
            <div style={{
              background: 'rgba(10,14,40,0.98)', border: '1px solid rgba(37,211,102,0.4)',
              borderRadius: 20, padding: '24px 32px', textAlign: 'center',
              color: '#25d366', fontWeight: 700, fontSize: 14,
            }}>
              <div style={{ marginBottom: 8, fontSize: 24 }}>📸</div>
              Gerando imagem para compartilhar...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LivroProgress({ dias, hoje }: { dias: DiaDevocional[]; hoje: number }) {
  const lidas = dias.filter(d => d.dia <= hoje).length;
  const pct = dias.length > 0 ? (lidas / dias.length) * 100 : 0;
  const isNT = dias[0]?.testamento === 'NT';
  const cor = isNT ? C.blue : C.gold;

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: C.muted }}>
          {lidas} de {dias.length} pericopes concluidas
        </span>
        <span style={{ fontSize: 11, color: cor, fontWeight: 700 }}>
          {Math.round(pct)}%
        </span>
      </div>
      <div style={{ height: 3, borderRadius: 100, background: C.border }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ height: '100%', borderRadius: 100, background: cor }}
        />
      </div>
    </div>
  );
}
