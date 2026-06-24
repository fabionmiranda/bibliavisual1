import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import { PLANO_COMPLETO, type DiaDevocional } from '../data/calendarioDevocional';
import { gerarParaPregar } from '../data/paraPregar';

// ─── Design tokens ─────────────────────────────────────────────────
const C = {
  bg:      '#05071a',
  bgCard:  'rgba(255,255,255,0.03)',
  bgCardH: 'rgba(255,255,255,0.06)',
  blue:    'rgba(0,212,255,1)',
  blueL:   'rgba(0,212,255,0.12)',
  blueB:   'rgba(0,212,255,0.30)',
  gold:    'rgba(255,200,80,1)',
  goldL:   'rgba(255,200,80,0.15)',
  goldB:   'rgba(255,200,80,0.40)',
  white:   'rgba(255,255,255,0.92)',
  muted:   'rgba(255,255,255,0.45)',
  border:  'rgba(255,255,255,0.07)',
  borderH: 'rgba(255,255,255,0.14)',
  atColor: 'rgba(255,180,50,1)',
  ntColor: 'rgba(80,200,255,1)',
};

const QUIASMA_PALETA = [
  { label: 'rgba(255,200,80,1)',  bg: 'rgba(255,200,80,0.12)',  border: 'rgba(255,200,80,0.45)'  },
  { label: 'rgba(80,200,255,1)',  bg: 'rgba(80,200,255,0.10)',  border: 'rgba(80,200,255,0.40)'  },
  { label: 'rgba(180,120,255,1)', bg: 'rgba(180,120,255,0.10)', border: 'rgba(180,120,255,0.40)' },
  { label: 'rgba(100,220,160,1)', bg: 'rgba(100,220,160,0.10)', border: 'rgba(100,220,160,0.40)' },
  { label: 'rgba(255,140,80,1)',  bg: 'rgba(255,140,80,0.10)',  border: 'rgba(255,140,80,0.40)'  },
  { label: 'rgba(255,100,130,1)', bg: 'rgba(255,100,130,0.10)', border: 'rgba(255,100,130,0.40)' },
  { label: 'rgba(80,220,220,1)',  bg: 'rgba(80,220,220,0.10)',  border: 'rgba(80,220,220,0.40)'  },
];

const LIVRO_SLUG: Record<string, string> = {
  'Genesis': 'genesis', 'Exodo': 'exodo', 'Levitico': 'levitico',
  'Numeros': 'numeros', 'Deuteronomio': 'deuteronomio',
};

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
  const markerRe = new RegExp(`^\\[0*${idx}\\]`);
  const anyMarkerRe = /^\[\d/;
  const sepRe = /^={5,}/;

  const lines = text.split(/\r?\n/);
  let blockStart = -1;
  for (let i = 0; i < lines.length; i++) {
    if (markerRe.test(lines[i].trim())) { blockStart = i; break; }
  }
  if (blockStart === -1) return '';

  let blockEnd = lines.length;
  for (let i = blockStart + 1; i < lines.length; i++) {
    const t = lines[i].trim();
    if ((anyMarkerRe.test(t) && !markerRe.test(t)) || sepRe.test(t)) {
      blockEnd = i; break;
    }
  }
  return lines.slice(blockStart, blockEnd).join('\n').trim();
}

interface Pericope {
  idx: number;
  titulo: string;
  ref: string;
}

// ─── Quiasma renderer ──────────────────────────────────────────────
function QuiasmaSection({ d, pericopeIdx }: { d: DiaDevocional; pericopeIdx: number }) {
  const [quiasma, setQuiasma] = useState<string>('');
  const [status, setStatus] = useState<'loading' | 'ok' | 'sem-arquivo' | 'sem-pericope'>('loading');
  const isAT = d.testamento === 'AT';
  const cor = isAT ? C.atColor : C.ntColor;
  const corB = isAT ? C.goldB : C.blueB;

  useEffect(() => {
    const path = livroPath(d.livro, d.testamento);
    setStatus('loading');
    fetch(`${path}/quiastico.txt`)
      .then(r => r.ok ? r.text() : null)
      .then(text => {
        if (!text) { setStatus('sem-arquivo'); return; }
        const bloco = extractQuiasmaBloco(text, pericopeIdx);
        if (!bloco) { setStatus('sem-pericope'); return; }
        setQuiasma(bloco);
        setStatus('ok');
      })
      .catch(() => setStatus('sem-arquivo'));
  }, [d, pericopeIdx]);

  if (status === 'loading') return (
    <div style={{ padding: 32, textAlign: 'center', color: C.muted, fontSize: 12 }}>
      Carregando estrutura...
    </div>
  );

  if (status !== 'ok' || !quiasma) return (
    <div style={{
      marginTop: 12, borderRadius: 14, border: `1px solid ${corB}`,
      background: 'rgba(5,7,26,0.7)', padding: 18, color: C.muted, fontSize: 13,
    }}>
      Esta perícope ainda não possui estrutura quiástica cadastrada.
    </div>
  );

  type QEntry =
    | { kind: 'title'; text: string }
    | { kind: 'row'; label: string; desc: string; level: number; isCenter: boolean }
    | { kind: 'spacer' };

  const linhas = quiasma.split('\n');
  const baseLetters: string[] = [];
  for (const l of linhas) {
    const m = l.trim().match(/^([A-Z])'?\d*\s*[\(\-]/);
    if (m) {
      const base = m[1].toUpperCase();
      if (!baseLetters.includes(base)) baseLetters.push(base);
    }
  }
  const maxLevel = baseLetters.length - 1;

  const entries: QEntry[] = [];
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
      const descLines: string[] = [];
      let j = i + 1;
      while (j < linhas.length) {
        const next = linhas[j].trim();
        if (!next) { j++; break; }
        if (/^\[\d/.test(next)) break;
        if (/^([A-Z])'?\d*\s*[\(\-]/.test(next)) break;
        descLines.push(next);
        j++;
      }
      entries.push({ kind: 'row', label: trimmed, desc: descLines.join(' '), level, isCenter });
      i = j;
      continue;
    }
    i++;
  }

  return (
    <div style={{
      marginTop: 0, borderRadius: 18, overflow: 'hidden',
      border: `1px solid ${corB}`,
      boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
        borderBottom: `1px solid ${corB}`,
        padding: '12px 20px',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 9, flexShrink: 0,
          background: isAT ? 'rgba(255,200,80,0.18)' : 'rgba(80,200,255,0.18)',
          border: `1px solid ${corB}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <BookOpen size={15} color={cor} />
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 900, color: cor, letterSpacing: '0.20em', textTransform: 'uppercase' }}>
            Estrutura Quiástica
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>
            {d.livro} — Perícope {pericopeIdx}
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(5,7,26,0.85)', padding: '16px 14px' }}>
        {entries.map((entry, idx) => {
          if (entry.kind === 'spacer') return <div key={idx} style={{ height: 4 }} />;
          if (entry.kind === 'title') {
            return (
              <div key={idx} style={{
                fontSize: 'clamp(14px,2.5vw,16px)', fontWeight: 800, color: cor,
                lineHeight: 1.4, marginBottom: 12, marginTop: 4,
              }}>
                {entry.text}
              </div>
            );
          }
          const { label, desc, level, isCenter } = entry;
          const pal = QUIASMA_PALETA[level % QUIASMA_PALETA.length];
          const badgeLetter = label.match(/^([A-Z]'?\d*)/)?.[1] ?? label[0];
          const refPart = label.slice(badgeLetter.length).trim();
          return (
            <div key={idx} style={{
              display: 'flex', alignItems: 'flex-start',
              gap: 'clamp(5px,1.2vw,8px)',
              marginTop: isCenter ? 12 : (level === 0 ? 10 : 5),
              marginBottom: isCenter ? 12 : 4,
              paddingLeft: `clamp(${level * 4}px, ${level * 1.2}vw, ${level * 14}px)`,
            }}>
              <div style={{
                width: 3, minHeight: 30, borderRadius: 4,
                background: pal.label, flexShrink: 0, marginTop: 3,
              }} />
              <div style={{
                flexShrink: 0,
                minWidth: 'clamp(26px,4.5vw,34px)',
                textAlign: 'center',
                background: isCenter ? pal.bg : pal.bg.replace(/[\d.]+\)$/, '0.10)'),
                border: `1px solid ${isCenter ? pal.border : pal.border.replace(/[\d.]+\)$/, '0.35)')}`,
                borderRadius: 7,
                padding: 'clamp(4px,0.8vw,6px) clamp(5px,1vw,8px)',
                fontSize: 'clamp(13px,2.6vw,16px)',
                fontWeight: 900,
                color: pal.label,
                lineHeight: 1.3,
                boxShadow: isCenter ? `0 0 12px ${pal.bg}` : undefined,
                letterSpacing: '0.04em',
                alignSelf: 'flex-start',
              }}>
                {badgeLetter}
              </div>
              <div style={{
                flex: 1, minWidth: 0,
                fontSize: 'clamp(13px,2.6vw,15px)', lineHeight: 1.6,
                overflowWrap: 'break-word', wordBreak: 'break-word',
              }}>
                {refPart && (
                  <span style={{
                    color: pal.label, opacity: 0.75, fontWeight: 600,
                    fontSize: 'clamp(10px,2vw,12px)', marginRight: 6, whiteSpace: 'nowrap',
                  }}>
                    {refPart}
                  </span>
                )}
                <span style={{
                  color: isCenter ? pal.label : 'rgba(255,255,255,0.88)',
                  fontWeight: isCenter ? 700 : 400,
                }}>
                  {desc.split(/(\[[^\]]+\])/).map((part, pi) =>
                    part.startsWith('[') && part.endsWith(']')
                      ? (
                        <span key={pi} style={{
                          whiteSpace: 'nowrap',
                          unicodeBidi: 'isolate',
                          direction: 'ltr',
                          fontFamily: '"SBL Hebrew","Ezra SIL","Noto Serif Hebrew","Noto Sans Hebrew","Times New Roman",serif',
                          fontSize: 'clamp(16px,3vw,19px)',
                          fontWeight: 600,
                          color: pal.label,
                          letterSpacing: '0.04em',
                          marginLeft: 4,
                        }}>{part}</span>
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

// ─── Para Pregar renderer ──────────────────────────────────────────
// Os labels/cores/refs/nível vêm do quiasma real; títulos e ganchos vêm do conteudo.
function ParaPregarSection({ d, pericopeIdx, conteudo }: {
  d: DiaDevocional; pericopeIdx: number; conteudo: string;
}) {
  const [quiasmaArms, setQuiasmaArms] = useState<{
    label: string; badgeLetter: string; refPart: string; level: number; isCenter: boolean;
  }[]>([]);

  useEffect(() => {
    const path = livroPath(d.livro, d.testamento);
    fetch(`${path}/quiastico.txt`)
      .then(r => r.ok ? r.text() : null)
      .then(text => {
        if (!text) return;
        const bloco = extractQuiasmaBloco(text, pericopeIdx);
        if (!bloco) return;

        // Replicar a mesma lógica do QuiasmaSection para extrair braços
        const linhas = bloco.split('\n');
        const baseLetters: string[] = [];
        for (const l of linhas) {
          const m = l.trim().match(/^([A-Z])'?\d*\s*[\(\-]/);
          if (m) {
            const base = m[1].toUpperCase();
            if (!baseLetters.includes(base)) baseLetters.push(base);
          }
        }
        const maxLvl = baseLetters.length - 1;

        const arms: typeof quiasmaArms = [];
        let i = 0;
        while (i < linhas.length) {
          const trimmed = linhas[i].trim();
          const labelMatch = trimmed.match(/^([A-Z])'?\d*\s*[\(\-]/);
          if (labelMatch) {
            const base = labelMatch[1].toUpperCase();
            const level = Math.max(0, baseLetters.indexOf(base));
            const badgeLetter = trimmed.match(/^([A-Z]'?\d*)/)?.[1] ?? trimmed[0];
            const refPart = trimmed.slice(badgeLetter.length).trim();
            arms.push({ label: trimmed, badgeLetter, refPart, level, isCenter: level === maxLvl });
          }
          i++;
        }
        setQuiasmaArms(arms);
      })
      .catch(() => {});
  }, [d, pericopeIdx]);

  // Parsear apenas bigIdea, títulos+ganchos (em ordem) e eixo do conteudo
  interface TitleGancho { title: string; gancho: string; }
  let bigIdea = '';
  let eixo = '';
  const titlesGanchos: TitleGancho[] = [];
  let section: 'none' | 'big' | 'movimentos' | 'eixo' = 'none';
  let pending: Partial<TitleGancho> | null = null;

  for (const rawLine of conteudo.split('\n')) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line === 'BIG IDEA') { section = 'big'; continue; }
    if (line === 'MOVIMENTOS DO TEXTO') { section = 'movimentos'; continue; }
    if (line === 'EIXO CRISTOLÓGICO') { section = 'eixo'; continue; }
    if (line.startsWith('PARA PREGAR')) continue;
    if (section === 'big' && !bigIdea) { bigIdea = line.replace(/^"|"$/g, ''); continue; }
    if (section === 'eixo') { eixo += (eixo ? ' ' : '') + line; continue; }
    if (section === 'movimentos') {
      // Detectar linha de movimento (com ou sem label hardcoded)
      const mvMatch = line.match(/^(?:◉\s*)?\[[A-Z]'?\d*\]\s*·?\s*(.+)/);
      if (mvMatch) {
        if (pending !== null) titlesGanchos.push({ title: pending.title ?? '', gancho: pending.gancho ?? '' });
        pending = { title: mvMatch[1].trim(), gancho: '' };
        continue;
      }
      const gMatch = line.match(/^→\s*(.+)/);
      if (gMatch && pending) { pending.gancho = gMatch[1]; continue; }
    }
  }
  if (pending !== null) titlesGanchos.push({ title: pending.title ?? '', gancho: pending.gancho ?? '' });

  return (
    <div style={{
      position: 'relative', marginTop: 14, borderRadius: 18, overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(20,12,40,0.95) 0%, rgba(10,18,48,0.95) 60%, rgba(20,12,40,0.95) 100%)',
      border: '1px solid rgba(168,120,255,0.28)',
      boxShadow: '0 0 0 1px rgba(96,165,250,0.08), 0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
    }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 50% at 15% 50%, rgba(139,92,246,0.10) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 85% 30%, rgba(96,165,250,0.08) 0%, transparent 70%)' }} />
      <div style={{ position: 'relative', padding: 'clamp(14px,3.5vw,20px) clamp(16px,4vw,22px)' }}>

        {/* Cabeçalho */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: 'linear-gradient(135deg, rgba(139,92,246,0.35), rgba(96,165,250,0.25))', border: '1px solid rgba(168,120,255,0.40)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 12px rgba(139,92,246,0.25)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(196,160,255,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <div style={{ fontSize: 'clamp(9px,2.2vw,10px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', background: 'linear-gradient(90deg, rgba(196,160,255,1) 0%, rgba(147,197,253,1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Para Pregar</div>
          <div style={{ flex: 1, height: 1, marginLeft: 4, background: 'linear-gradient(90deg, rgba(139,92,246,0.40) 0%, rgba(96,165,250,0.15) 60%, transparent 100%)' }} />
        </div>

        {/* Big Idea */}
        {bigIdea && (
          <div style={{ marginBottom: 14, padding: '10px 14px', borderRadius: 10, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.20)' }}>
            <div style={{ fontSize: 'clamp(8px,1.8vw,9px)', fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(196,160,255,0.65)', marginBottom: 5 }}>Big Idea</div>
            <div style={{ fontSize: 'clamp(13px,3vw,15px)', color: 'rgba(226,220,255,0.96)', fontWeight: 700, lineHeight: 1.5, fontStyle: 'italic' }}>"{bigIdea}"</div>
          </div>
        )}

        {/* Movimentos — alinhados com os braços reais do quiasma */}
        {quiasmaArms.length > 0 && titlesGanchos.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 'clamp(8px,1.8vw,9px)', fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(147,197,253,0.60)', marginBottom: 10 }}>Movimentos do Texto</div>
            {quiasmaArms.map((arm, idx) => {
              const tg = titlesGanchos[idx];
              if (!tg) return null;
              const { badgeLetter, refPart, level, isCenter } = arm;
              const pal = QUIASMA_PALETA[level % QUIASMA_PALETA.length];
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: isCenter ? 14 : 6, marginBottom: isCenter ? 14 : 0, paddingLeft: level * 12 }}>
                  {/* Barra lateral */}
                  <div style={{ width: 3, minHeight: 30, borderRadius: 4, background: pal.label, flexShrink: 0, marginTop: 3 }} />
                  {/* Badge — exatamente igual ao quiasma */}
                  <div style={{
                    flexShrink: 0, minWidth: 'clamp(26px,4.5vw,34px)', textAlign: 'center',
                    background: isCenter ? pal.bg : pal.bg.replace(/[\d.]+\)$/, '0.08)'),
                    border: `1px solid ${isCenter ? pal.border : pal.border.replace(/[\d.]+\)$/, '0.28)')}`,
                    borderRadius: 6, padding: '3px 6px',
                    fontSize: 'clamp(11px,2.3vw,14px)', fontWeight: 900, color: pal.label,
                    boxShadow: isCenter ? `0 0 12px ${pal.bg}` : undefined,
                    alignSelf: 'flex-start',
                  }}>{badgeLetter}</div>
                  {/* Conteúdo */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Referência do versículo — igual ao quiasma */}
                    {refPart && (
                      <span style={{ fontSize: 'clamp(10px,2vw,11px)', color: pal.label, opacity: 0.78, fontWeight: 700, marginRight: 6, whiteSpace: 'nowrap' }}>
                        {refPart}
                      </span>
                    )}
                    {/* Título proposicional */}
                    <span style={{ fontSize: 'clamp(12px,2.6vw,14px)', color: isCenter ? pal.label : 'rgba(220,215,255,0.88)', fontWeight: isCenter ? 700 : 400, lineHeight: 1.5 }}>
                      {tg.title}
                    </span>
                    {/* Gancho */}
                    {tg.gancho && (
                      <div style={{ fontSize: 'clamp(11px,2.3vw,12px)', color: 'rgba(190,190,220,0.55)', fontStyle: 'italic', marginTop: 3, lineHeight: 1.4 }}>
                        → {tg.gancho}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Eixo Cristológico */}
        {eixo && (
          <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.18)' }}>
            <div style={{ fontSize: 'clamp(8px,1.8vw,9px)', fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(147,197,253,0.65)', marginBottom: 4 }}>Eixo Cristológico</div>
            <div style={{ fontSize: 'clamp(12px,2.5vw,13px)', color: 'rgba(200,220,255,0.85)', lineHeight: 1.65 }}>{eixo}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────
export default function PregacaoPage() {
  const [pericopes, setPericopes] = useState<Pericope[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileListOpen, setMobileListOpen] = useState(false);

  // Filter PLANO_COMPLETO for Gênesis days
  const genesisDays = useMemo(
    () => PLANO_COMPLETO.filter(d => d.livroAbrev === 'Gn'),
    []
  );

  useEffect(() => {
    fetch('/admin/AT/genesis/quiastico.txt')
      .then(r => r.ok ? r.text() : '')
      .then(text => {
        const list: Pericope[] = [];
        for (const raw of text.split(/\r?\n/)) {
          const line = raw.trim();
          const m = line.match(/^\[(\d+)\]\s+(.+?)(?:\s+[—–-]\s+(.+))?$/);
          if (m) {
            list.push({
              idx: parseInt(m[1], 10),
              titulo: m[2].trim(),
              ref: (m[3] ?? '').trim(),
            });
          }
        }
        setPericopes(list);
        if (list.length > 0) setSelectedIdx(list[0].idx);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const selectedDia = selectedIdx != null ? genesisDays[selectedIdx - 1] : null;
  const paraPregarConteudo = selectedDia ? gerarParaPregar(selectedDia) : null;
  const selectedPericope = pericopes.find(p => p.idx === selectedIdx) ?? null;

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.white }}>
      <Navbar />

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 'clamp(16px,3vw,28px) clamp(12px,3vw,24px)' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            fontSize: 'clamp(11px,2vw,12px)', fontWeight: 900, letterSpacing: '0.24em',
            textTransform: 'uppercase',
            background: 'linear-gradient(90deg, rgba(196,160,255,1) 0%, rgba(147,197,253,1) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: 6,
          }}>
            Pregação
          </div>
          <div style={{ fontSize: 'clamp(20px,4vw,28px)', fontWeight: 800, color: C.white, letterSpacing: '-0.01em' }}>
            Estrutura quiástica e esboço por perícope
          </div>
          <div style={{ fontSize: 'clamp(12px,2.4vw,14px)', color: C.muted, marginTop: 4 }}>
            Selecione uma perícope de Gênesis para visualizar o quiasma e o esboço Para Pregar.
          </div>
        </div>

        {/* Mobile dropdown */}
        <div style={{ display: 'none' }} className="pregacao-mobile-only">
          <button
            onClick={() => setMobileListOpen(o => !o)}
            style={{
              all: 'unset', cursor: 'pointer', width: '100%', boxSizing: 'border-box',
              padding: '12px 14px', borderRadius: 12,
              background: C.bgCard, border: `1px solid ${C.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: C.white }}>
              {selectedPericope ? `[${String(selectedPericope.idx).padStart(2,'0')}] ${selectedPericope.titulo}` : 'Selecionar perícope'}
            </span>
            <ChevronDown size={16} color={C.muted} style={{ transform: mobileListOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }} className="pregacao-grid">
          {/* Lista de perícopes */}
          <aside
            className="pregacao-list"
            style={{
              flex: '0 0 320px',
              maxHeight: 'calc(100vh - 200px)',
              overflowY: 'auto',
              padding: 14,
              borderRadius: 16,
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${C.border}`,
              borderRight: `1px solid ${C.border}`,
            }}
          >
            <div style={{
              fontSize: 10, fontWeight: 900, letterSpacing: '0.20em',
              textTransform: 'uppercase', color: C.gold,
              padding: '4px 8px 12px 8px', borderBottom: `1px solid ${C.border}`,
              marginBottom: 8,
            }}>
              Gênesis — {pericopes.length} perícopes
            </div>
            {loading && <div style={{ padding: 16, color: C.muted, fontSize: 12 }}>Carregando...</div>}
            {!loading && pericopes.length === 0 && (
              <div style={{ padding: 16, color: C.muted, fontSize: 12 }}>Nenhuma perícope encontrada.</div>
            )}
            {pericopes.map(p => {
              const active = p.idx === selectedIdx;
              return (
                <button
                  key={p.idx}
                  onClick={() => { setSelectedIdx(p.idx); setMobileListOpen(false); }}
                  style={{
                    all: 'unset', cursor: 'pointer', display: 'block', width: '100%',
                    boxSizing: 'border-box',
                    padding: '10px 12px', borderRadius: 10,
                    marginBottom: 4,
                    background: active ? 'rgba(255,200,80,0.10)' : 'transparent',
                    border: `1px solid ${active ? C.goldB : 'transparent'}`,
                    transition: 'background 0.15s, border-color 0.15s',
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = C.bgCardH; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                >
                  <div style={{
                    fontSize: 10, fontWeight: 900, color: active ? C.gold : C.muted,
                    letterSpacing: '0.10em', marginBottom: 3,
                  }}>
                    [{String(p.idx).padStart(2, '0')}]
                  </div>
                  <div style={{
                    fontSize: 12, fontWeight: 700,
                    color: active ? C.gold : 'rgba(255,255,255,0.85)',
                    lineHeight: 1.35,
                    marginBottom: p.ref ? 3 : 0,
                  }}>
                    {p.titulo}
                  </div>
                  {p.ref && (
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.40)', fontWeight: 500 }}>
                      {p.ref}
                    </div>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Conteúdo */}
          <main style={{ flex: 1, minWidth: 0 }}>
            <AnimatePresence mode="wait">
              {selectedDia && selectedPericope ? (
                <motion.div
                  key={selectedDia.dia}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.20em', color: C.gold, textTransform: 'uppercase', marginBottom: 4 }}>
                      Perícope {String(selectedPericope.idx).padStart(2, '0')}
                    </div>
                    <div style={{ fontSize: 'clamp(18px,3vw,22px)', fontWeight: 800, color: C.white, lineHeight: 1.3 }}>
                      {selectedPericope.titulo}
                    </div>
                    {selectedPericope.ref && (
                      <div style={{ fontSize: 13, color: C.muted, marginTop: 4, fontWeight: 500 }}>
                        {selectedPericope.ref}
                      </div>
                    )}
                  </div>

                  <QuiasmaSection d={selectedDia} pericopeIdx={selectedPericope.idx} />

                  {paraPregarConteudo ? (
                    <ParaPregarSection d={selectedDia} pericopeIdx={selectedPericope.idx} conteudo={paraPregarConteudo} />
                  ) : (
                    <div style={{
                      marginTop: 14, borderRadius: 14, padding: 18,
                      border: '1px solid rgba(168,120,255,0.28)',
                      background: 'rgba(20,12,40,0.7)',
                      color: C.muted, fontSize: 13, lineHeight: 1.6,
                    }}>
                      Esboço "Para Pregar" ainda não disponível para esta perícope.
                    </div>
                  )}
                </motion.div>
              ) : (
                <div style={{ padding: 32, textAlign: 'center', color: C.muted, fontSize: 13 }}>
                  Selecione uma perícope na lista ao lado.
                </div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pregacao-mobile-only { display: block !important; }
          .pregacao-grid { flex-direction: column !important; }
          .pregacao-list {
            flex: 1 1 auto !important;
            max-height: ${mobileListOpen ? '50vh' : '0px'} !important;
            padding: ${mobileListOpen ? '14px' : '0 14px'} !important;
            border-width: ${mobileListOpen ? '1px' : '0'} !important;
            overflow: hidden;
            transition: max-height 0.25s, padding 0.25s;
          }
        }
      `}</style>
    </div>
  );
}
