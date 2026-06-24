import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { PLANO_COMPLETO, type DiaDevocional } from '../data/calendarioDevocional';
import { gerarParaPregar } from '../data/paraPregar';
import { SERMON_TITLES } from '../data/sermonTitles';

// ─── Design tokens ──────────────────────────────────────────────────
const C = {
  bg:      '#05071a',
  bgCard:  'rgba(255,255,255,0.03)',
  bgCardH: 'rgba(255,255,255,0.055)',
  blue:    'rgba(0,212,255,1)',
  blueL:   'rgba(0,212,255,0.12)',
  blueB:   'rgba(0,212,255,0.30)',
  gold:    'rgba(255,200,80,1)',
  goldL:   'rgba(255,200,80,0.12)',
  goldB:   'rgba(255,200,80,0.35)',
  white:   'rgba(255,255,255,0.92)',
  muted:   'rgba(255,255,255,0.40)',
  border:  'rgba(255,255,255,0.07)',
  borderH: 'rgba(255,255,255,0.13)',
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

// ─── Todos os livros da Bíblia ──────────────────────────────────────
interface BibleBook {
  nome: string;
  abrev: string;
  testamento: 'AT' | 'NT';
  slug: string;
  grupo: string;
}

const BIBLE_BOOKS: BibleBook[] = [
  // Pentateuco
  { nome: 'Gênesis',       abrev: 'Gn',  testamento: 'AT', slug: 'genesis',      grupo: 'Pentateuco' },
  { nome: 'Êxodo',         abrev: 'Ex',  testamento: 'AT', slug: 'exodo',        grupo: 'Pentateuco' },
  { nome: 'Levítico',      abrev: 'Lv',  testamento: 'AT', slug: 'levitico',     grupo: 'Pentateuco' },
  { nome: 'Números',       abrev: 'Nm',  testamento: 'AT', slug: 'numeros',      grupo: 'Pentateuco' },
  { nome: 'Deuteronômio',  abrev: 'Dt',  testamento: 'AT', slug: 'deuteronomio', grupo: 'Pentateuco' },
  // Históricos
  { nome: 'Josué',         abrev: 'Js',  testamento: 'AT', slug: 'josue',        grupo: 'Históricos' },
  { nome: 'Juízes',        abrev: 'Jz',  testamento: 'AT', slug: 'juizes',       grupo: 'Históricos' },
  { nome: 'Rute',          abrev: 'Rt',  testamento: 'AT', slug: 'rute',         grupo: 'Históricos' },
  { nome: '1 Samuel',      abrev: '1Sm', testamento: 'AT', slug: '1samuel',      grupo: 'Históricos' },
  { nome: '2 Samuel',      abrev: '2Sm', testamento: 'AT', slug: '2samuel',      grupo: 'Históricos' },
  { nome: '1 Reis',        abrev: '1Rs', testamento: 'AT', slug: '1reis',        grupo: 'Históricos' },
  { nome: '2 Reis',        abrev: '2Rs', testamento: 'AT', slug: '2reis',        grupo: 'Históricos' },
  { nome: '1 Crônicas',    abrev: '1Cr', testamento: 'AT', slug: '1cronicas',    grupo: 'Históricos' },
  { nome: '2 Crônicas',    abrev: '2Cr', testamento: 'AT', slug: '2cronicas',    grupo: 'Históricos' },
  { nome: 'Esdras',        abrev: 'Ed',  testamento: 'AT', slug: 'esdras',       grupo: 'Históricos' },
  { nome: 'Neemias',       abrev: 'Ne',  testamento: 'AT', slug: 'neemias',      grupo: 'Históricos' },
  { nome: 'Ester',         abrev: 'Et',  testamento: 'AT', slug: 'ester',        grupo: 'Históricos' },
  // Poéticos
  { nome: 'Jó',            abrev: 'Jó',  testamento: 'AT', slug: 'jo',           grupo: 'Poéticos' },
  { nome: 'Salmos',        abrev: 'Sl',  testamento: 'AT', slug: 'salmos',       grupo: 'Poéticos' },
  { nome: 'Provérbios',    abrev: 'Pv',  testamento: 'AT', slug: 'proverbios',   grupo: 'Poéticos' },
  { nome: 'Eclesiastes',   abrev: 'Ec',  testamento: 'AT', slug: 'eclesiastes',  grupo: 'Poéticos' },
  { nome: 'Cânticos',      abrev: 'Ct',  testamento: 'AT', slug: 'canticos',     grupo: 'Poéticos' },
  // Proféticos Maiores
  { nome: 'Isaías',        abrev: 'Is',  testamento: 'AT', slug: 'isaias',       grupo: 'Proféticos' },
  { nome: 'Jeremias',      abrev: 'Jr',  testamento: 'AT', slug: 'jeremias',     grupo: 'Proféticos' },
  { nome: 'Lamentações',   abrev: 'Lm',  testamento: 'AT', slug: 'lamentacoes',  grupo: 'Proféticos' },
  { nome: 'Ezequiel',      abrev: 'Ez',  testamento: 'AT', slug: 'ezequiel',     grupo: 'Proféticos' },
  { nome: 'Daniel',        abrev: 'Dn',  testamento: 'AT', slug: 'daniel',       grupo: 'Proféticos' },
  // Proféticos Menores
  { nome: 'Oseias',        abrev: 'Os',  testamento: 'AT', slug: 'oseias',       grupo: 'Proféticos' },
  { nome: 'Joel',          abrev: 'Jl',  testamento: 'AT', slug: 'joel',         grupo: 'Proféticos' },
  { nome: 'Amós',          abrev: 'Am',  testamento: 'AT', slug: 'amos',         grupo: 'Proféticos' },
  { nome: 'Obadias',       abrev: 'Ob',  testamento: 'AT', slug: 'obadias',      grupo: 'Proféticos' },
  { nome: 'Jonas',         abrev: 'Jn',  testamento: 'AT', slug: 'jonas',        grupo: 'Proféticos' },
  { nome: 'Miquéias',      abrev: 'Mq',  testamento: 'AT', slug: 'miqueias',     grupo: 'Proféticos' },
  { nome: 'Naum',          abrev: 'Na',  testamento: 'AT', slug: 'naum',         grupo: 'Proféticos' },
  { nome: 'Habacuque',     abrev: 'Hc',  testamento: 'AT', slug: 'habacuque',    grupo: 'Proféticos' },
  { nome: 'Sofonias',      abrev: 'Sf',  testamento: 'AT', slug: 'sofonias',     grupo: 'Proféticos' },
  { nome: 'Ageu',          abrev: 'Ag',  testamento: 'AT', slug: 'ageu',         grupo: 'Proféticos' },
  { nome: 'Zacarias',      abrev: 'Zc',  testamento: 'AT', slug: 'zacarias',     grupo: 'Proféticos' },
  { nome: 'Malaquias',     abrev: 'Ml',  testamento: 'AT', slug: 'malaquias',    grupo: 'Proféticos' },
  // Evangelhos
  { nome: 'Mateus',        abrev: 'Mt',  testamento: 'NT', slug: 'mateus',       grupo: 'Evangelhos' },
  { nome: 'Marcos',        abrev: 'Mc',  testamento: 'NT', slug: 'marcos',       grupo: 'Evangelhos' },
  { nome: 'Lucas',         abrev: 'Lc',  testamento: 'NT', slug: 'lucas',        grupo: 'Evangelhos' },
  { nome: 'João',          abrev: 'Jo',  testamento: 'NT', slug: 'joao',         grupo: 'Evangelhos' },
  // Atos
  { nome: 'Atos',          abrev: 'At',  testamento: 'NT', slug: 'atos',         grupo: 'Atos' },
  // Epístolas Paulinas
  { nome: 'Romanos',       abrev: 'Rm',  testamento: 'NT', slug: 'romanos',      grupo: 'Epístolas' },
  { nome: '1 Coríntios',   abrev: '1Co', testamento: 'NT', slug: '1corintios',   grupo: 'Epístolas' },
  { nome: '2 Coríntios',   abrev: '2Co', testamento: 'NT', slug: '2corintios',   grupo: 'Epístolas' },
  { nome: 'Gálatas',       abrev: 'Gl',  testamento: 'NT', slug: 'galatas',      grupo: 'Epístolas' },
  { nome: 'Efésios',       abrev: 'Ef',  testamento: 'NT', slug: 'efesios',      grupo: 'Epístolas' },
  { nome: 'Filipenses',    abrev: 'Fp',  testamento: 'NT', slug: 'filipenses',   grupo: 'Epístolas' },
  { nome: 'Colossenses',   abrev: 'Cl',  testamento: 'NT', slug: 'colossenses',  grupo: 'Epístolas' },
  { nome: '1 Tessalonicenses', abrev: '1Ts', testamento: 'NT', slug: '1tessalonicenses', grupo: 'Epístolas' },
  { nome: '2 Tessalonicenses', abrev: '2Ts', testamento: 'NT', slug: '2tessalonicenses', grupo: 'Epístolas' },
  { nome: '1 Timóteo',     abrev: '1Tm', testamento: 'NT', slug: '1timoteo',     grupo: 'Epístolas' },
  { nome: '2 Timóteo',     abrev: '2Tm', testamento: 'NT', slug: '2timoteo',     grupo: 'Epístolas' },
  { nome: 'Tito',          abrev: 'Tt',  testamento: 'NT', slug: 'tito',         grupo: 'Epístolas' },
  { nome: 'Filemom',       abrev: 'Fm',  testamento: 'NT', slug: 'filemom',      grupo: 'Epístolas' },
  { nome: 'Hebreus',       abrev: 'Hb',  testamento: 'NT', slug: 'hebreus',      grupo: 'Epístolas' },
  { nome: 'Tiago',         abrev: 'Tg',  testamento: 'NT', slug: 'tiago',        grupo: 'Epístolas' },
  { nome: '1 Pedro',       abrev: '1Pe', testamento: 'NT', slug: '1pedro',       grupo: 'Epístolas' },
  { nome: '2 Pedro',       abrev: '2Pe', testamento: 'NT', slug: '2pedro',       grupo: 'Epístolas' },
  { nome: '1 João',        abrev: '1Jo', testamento: 'NT', slug: '1joao',        grupo: 'Epístolas' },
  { nome: '2 João',        abrev: '2Jo', testamento: 'NT', slug: '2joao',        grupo: 'Epístolas' },
  { nome: '3 João',        abrev: '3Jo', testamento: 'NT', slug: '3joao',        grupo: 'Epístolas' },
  { nome: 'Judas',         abrev: 'Jd',  testamento: 'NT', slug: 'judas',        grupo: 'Epístolas' },
  { nome: 'Apocalipse',    abrev: 'Ap',  testamento: 'NT', slug: 'apocalipse',   grupo: 'Apocalipse' },
];

const AT_GRUPOS = ['Pentateuco', 'Históricos', 'Poéticos', 'Proféticos'];
const NT_GRUPOS = ['Evangelhos', 'Atos', 'Epístolas', 'Apocalipse'];

interface Pericope {
  idx: number;
  titulo: string;
  ref: string;
}

function livroPath(slug: string, testamento: 'AT' | 'NT') {
  return `/admin/${testamento}/${slug}`;
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
    if ((anyMarkerRe.test(t) && !markerRe.test(t)) || sepRe.test(t)) { blockEnd = i; break; }
  }
  return lines.slice(blockStart, blockEnd).join('\n').trim();
}

// ─── Quiasma renderer ───────────────────────────────────────────────
function QuiasmaSection({ d, pericopeIdx }: { d: DiaDevocional; pericopeIdx: number }) {
  const [quiasma, setQuiasma] = useState('');
  const [status, setStatus] = useState<'loading' | 'ok' | 'none'>('loading');
  const book = BIBLE_BOOKS.find(b => b.abrev === d.livroAbrev);
  const isAT = d.testamento === 'AT';
  const cor = isAT ? C.atColor : C.ntColor;
  const corB = isAT ? C.goldB : C.blueB;

  useEffect(() => {
    if (!book) { setStatus('none'); return; }
    setStatus('loading');
    fetch(`${livroPath(book.slug, book.testamento)}/quiastico.txt`)
      .then(r => r.ok ? r.text() : null)
      .then(text => {
        if (!text) { setStatus('none'); return; }
        const bloco = extractQuiasmaBloco(text, pericopeIdx);
        if (!bloco) { setStatus('none'); return; }
        setQuiasma(bloco);
        setStatus('ok');
      })
      .catch(() => setStatus('none'));
  }, [d, pericopeIdx, book]);

  if (status === 'loading') return (
    <div style={{ padding: 40, textAlign: 'center', color: C.muted, fontSize: 12 }}>Carregando estrutura...</div>
  );

  if (status !== 'ok') return (
    <div style={{ padding: 32, textAlign: 'center', color: C.muted, fontSize: 13 }}>
      Esta perícope ainda não possui estrutura quiástica cadastrada.
    </div>
  );

  type QEntry = { kind: 'title'; text: string } | { kind: 'row'; label: string; desc: string; level: number; isCenter: boolean } | { kind: 'spacer' };
  const linhas = quiasma.split('\n');
  const baseLetters: string[] = [];
  for (const l of linhas) {
    const m = l.trim().match(/^([A-Z])'?\d*\s*[\(\-]/);
    if (m) { const base = m[1].toUpperCase(); if (!baseLetters.includes(base)) baseLetters.push(base); }
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
        if (/^\[\d/.test(next) || /^([A-Z])'?\d*\s*[\(\-]/.test(next)) break;
        descLines.push(next); j++;
      }
      entries.push({ kind: 'row', label: trimmed, desc: descLines.join(' '), level, isCenter });
      i = j; continue;
    }
    i++;
  }

  return (
    <div style={{ borderRadius: 18, overflow: 'hidden', border: `1px solid ${corB}`, boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
      <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)', borderBottom: `1px solid ${corB}`, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0, background: isAT ? 'rgba(255,200,80,0.18)' : 'rgba(80,200,255,0.18)', border: `1px solid ${corB}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BookOpen size={15} color={cor} />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 900, color: cor, letterSpacing: '0.20em', textTransform: 'uppercase' }}>Estrutura Quiástica</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{d.livro} — Perícope {pericopeIdx}</div>
        </div>
      </div>
      <div style={{ background: 'rgba(5,7,26,0.85)', padding: '16px 14px' }}>
        {entries.map((entry, idx) => {
          if (entry.kind === 'spacer') return <div key={idx} style={{ height: 4 }} />;
          if (entry.kind === 'title') return (
            <div key={idx} style={{ fontSize: 'clamp(14px,2.5vw,16px)', fontWeight: 800, color: cor, lineHeight: 1.4, marginBottom: 12, marginTop: 4 }}>
              {entry.text}
            </div>
          );
          const { label, desc, level, isCenter } = entry;
          const pal = QUIASMA_PALETA[level % QUIASMA_PALETA.length];
          const badgeLetter = label.match(/^([A-Z]'?\d*)/)?.[1] ?? label[0];
          const refPart = label.slice(badgeLetter.length).trim();
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(5px,1.2vw,8px)', marginTop: isCenter ? 12 : (level === 0 ? 10 : 5), marginBottom: isCenter ? 12 : 4, paddingLeft: `clamp(${level * 4}px, ${level * 1.2}vw, ${level * 14}px)` }}>
              <div style={{ width: 3, minHeight: 30, borderRadius: 4, background: pal.label, flexShrink: 0, marginTop: 3 }} />
              <div style={{ flexShrink: 0, minWidth: 'clamp(26px,4.5vw,34px)', textAlign: 'center', background: isCenter ? pal.bg : pal.bg.replace(/[\d.]+\)$/, '0.10)'), border: `1px solid ${isCenter ? pal.border : pal.border.replace(/[\d.]+\)$/, '0.35)')}`, borderRadius: 7, padding: 'clamp(4px,0.8vw,6px) clamp(5px,1vw,8px)', fontSize: 'clamp(13px,2.6vw,16px)', fontWeight: 900, color: pal.label, lineHeight: 1.3, boxShadow: isCenter ? `0 0 12px ${pal.bg}` : undefined, letterSpacing: '0.04em', alignSelf: 'flex-start' }}>
                {badgeLetter}
              </div>
              <div style={{ flex: 1, minWidth: 0, fontSize: 'clamp(13px,2.6vw,15px)', lineHeight: 1.6, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                {refPart && <span style={{ color: pal.label, opacity: 0.75, fontWeight: 600, fontSize: 'clamp(10px,2vw,12px)', marginRight: 6, whiteSpace: 'nowrap' }}>{refPart}</span>}
                <span style={{ color: isCenter ? pal.label : 'rgba(255,255,255,0.88)', fontWeight: isCenter ? 700 : 400 }}>
                  {desc.split(/(\[[^\]]+\])/).map((part, pi) =>
                    part.startsWith('[') && part.endsWith(']')
                      ? <span key={pi} style={{ whiteSpace: 'nowrap', unicodeBidi: 'isolate', direction: 'ltr', fontFamily: '"SBL Hebrew","Ezra SIL","Noto Serif Hebrew","Noto Sans Hebrew","Times New Roman",serif', fontSize: 'clamp(16px,3vw,19px)', fontWeight: 600, color: pal.label, letterSpacing: '0.04em', marginLeft: 4 }}>{part}</span>
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

// ─── Para Pregar renderer ────────────────────────────────────────────
function ParaPregarSection({ d, pericopeIdx, conteudo, sermonTitulo }: { d: DiaDevocional; pericopeIdx: number; conteudo: string; sermonTitulo?: string }) {
  const [quiasmaArms, setQuiasmaArms] = useState<{ label: string; badgeLetter: string; refPart: string; level: number; isCenter: boolean }[]>([]);
  const book = BIBLE_BOOKS.find(b => b.abrev === d.livroAbrev);

  useEffect(() => {
    if (!book) return;
    fetch(`${livroPath(book.slug, book.testamento)}/quiastico.txt`)
      .then(r => r.ok ? r.text() : null)
      .then(text => {
        if (!text) return;
        const bloco = extractQuiasmaBloco(text, pericopeIdx);
        if (!bloco) return;
        const linhas = bloco.split('\n');
        const baseLetters: string[] = [];
        for (const l of linhas) {
          const m = l.trim().match(/^([A-Z])'?\d*\s*[\(\-]/);
          if (m) { const base = m[1].toUpperCase(); if (!baseLetters.includes(base)) baseLetters.push(base); }
        }
        const maxLvl = baseLetters.length - 1;
        const arms: typeof quiasmaArms = [];
        for (const line of linhas) {
          const trimmed = line.trim();
          const lm = trimmed.match(/^([A-Z])'?\d*\s*[\(\-]/);
          if (lm) {
            const base = lm[1].toUpperCase();
            const level = Math.max(0, baseLetters.indexOf(base));
            const badgeLetter = trimmed.match(/^([A-Z]'?\d*)/)?.[1] ?? trimmed[0];
            const refPart = trimmed.slice(badgeLetter.length).trim();
            arms.push({ label: trimmed, badgeLetter, refPart, level, isCenter: level === maxLvl });
          }
        }
        setQuiasmaArms(arms);
      })
      .catch(() => {});
  }, [d, pericopeIdx, book]);

  interface TG { title: string; gancho: string; }
  let bigIdea = '', eixo = '';
  const titlesGanchos: TG[] = [];
  let section: 'none' | 'big' | 'movimentos' | 'eixo' = 'none';
  let pending: Partial<TG> | null = null;
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
      const mvMatch = line.match(/^(?:◉\s*)?\[[A-Z]'?\d*\]\s*·?\s*(.+)/);
      if (mvMatch) { if (pending) titlesGanchos.push({ title: pending.title ?? '', gancho: pending.gancho ?? '' }); pending = { title: mvMatch[1].trim(), gancho: '' }; continue; }
      const gMatch = line.match(/^→\s*(.+)/);
      if (gMatch && pending) { pending.gancho = gMatch[1]; continue; }
    }
  }
  if (pending) titlesGanchos.push({ title: pending.title ?? '', gancho: pending.gancho ?? '' });

  return (
    <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', background: 'linear-gradient(135deg, rgba(20,12,40,0.95) 0%, rgba(10,18,48,0.95) 60%, rgba(20,12,40,0.95) 100%)', border: '1px solid rgba(168,120,255,0.28)', boxShadow: '0 0 0 1px rgba(96,165,250,0.08), 0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 50% at 15% 50%, rgba(139,92,246,0.10) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 85% 30%, rgba(96,165,250,0.08) 0%, transparent 70%)' }} />
      <div style={{ position: 'relative', padding: 'clamp(14px,3.5vw,20px) clamp(16px,4vw,22px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: 'linear-gradient(135deg, rgba(139,92,246,0.35), rgba(96,165,250,0.25))', border: '1px solid rgba(168,120,255,0.40)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 12px rgba(139,92,246,0.25)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(196,160,255,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <div style={{ fontSize: 'clamp(11px,2.2vw,13px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', background: 'linear-gradient(90deg, rgba(196,160,255,1) 0%, rgba(147,197,253,1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Para Pregar</div>
          <div style={{ flex: 1, height: 1, marginLeft: 4, background: 'linear-gradient(90deg, rgba(139,92,246,0.40) 0%, rgba(96,165,250,0.15) 60%, transparent 100%)' }} />
        </div>
        {/* Título do Sermão */}
        {sermonTitulo && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 'clamp(10px,1.8vw,11px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(196,160,255,0.50)', marginBottom: 6 }}>
              Título do Sermão
            </div>
            <div style={{
              fontSize: 'clamp(20px,3.5vw,26px)', fontWeight: 800, lineHeight: 1.25,
              background: 'linear-gradient(135deg, rgba(226,210,255,1) 0%, rgba(167,210,255,1) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.01em',
            }}>
              {sermonTitulo}
            </div>
            <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(139,92,246,0.35) 0%, rgba(96,165,250,0.15) 50%, transparent 100%)', marginTop: 14 }} />
          </div>
        )}

        {bigIdea && (
          <div style={{ marginBottom: 16, padding: '10px 14px', borderRadius: 10, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.20)' }}>
            <div style={{ fontSize: 'clamp(10px,1.8vw,12px)', fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(196,160,255,0.65)', marginBottom: 6 }}>Big Idea</div>
            <div style={{ fontSize: 'clamp(16px,3vw,19px)', color: 'rgba(226,220,255,0.96)', fontWeight: 700, lineHeight: 1.5, fontStyle: 'italic' }}>"{bigIdea}"</div>
          </div>
        )}
        {quiasmaArms.length > 0 && titlesGanchos.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 'clamp(10px,1.8vw,12px)', fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(147,197,253,0.60)', marginBottom: 12 }}>Movimentos do Texto</div>
            {quiasmaArms.map((arm, idx) => {
              const tg = titlesGanchos[idx];
              if (!tg) return null;
              const { badgeLetter, refPart, level, isCenter } = arm;
              const pal = QUIASMA_PALETA[level % QUIASMA_PALETA.length];
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: isCenter ? 14 : 6, marginBottom: isCenter ? 14 : 0, paddingLeft: level * 12 }}>
                  <div style={{ width: 3, minHeight: 30, borderRadius: 4, background: pal.label, flexShrink: 0, marginTop: 3 }} />
                  <div style={{ flexShrink: 0, minWidth: 'clamp(30px,4.5vw,38px)', textAlign: 'center', background: isCenter ? pal.bg : pal.bg.replace(/[\d.]+\)$/, '0.08)'), border: `1px solid ${isCenter ? pal.border : pal.border.replace(/[\d.]+\)$/, '0.28)')}`, borderRadius: 6, padding: '4px 7px', fontSize: 'clamp(13px,2.3vw,17px)', fontWeight: 900, color: pal.label, boxShadow: isCenter ? `0 0 12px ${pal.bg}` : undefined, alignSelf: 'flex-start' }}>{badgeLetter}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {refPart && <span style={{ fontSize: 'clamp(11px,2vw,13px)', color: pal.label, opacity: 0.78, fontWeight: 700, marginRight: 6, whiteSpace: 'nowrap' }}>{refPart}</span>}
                    <span style={{ fontSize: 'clamp(14px,2.6vw,17px)', color: isCenter ? pal.label : 'rgba(220,215,255,0.88)', fontWeight: isCenter ? 700 : 400, lineHeight: 1.5 }}>{tg.title}</span>
                    {tg.gancho && <div style={{ fontSize: 'clamp(12px,2.3vw,14px)', color: 'rgba(190,190,220,0.55)', fontStyle: 'italic', marginTop: 4, lineHeight: 1.4 }}>→ {tg.gancho}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {eixo && (
          <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.18)' }}>
            <div style={{ fontSize: 'clamp(10px,1.8vw,12px)', fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(147,197,253,0.65)', marginBottom: 6 }}>Eixo Cristológico</div>
            <div style={{ fontSize: 'clamp(14px,2.5vw,16px)', color: 'rgba(200,220,255,0.85)', lineHeight: 1.7 }}>{eixo}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────
export default function PregacaoPage() {
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [pericopes, setPericopes] = useState<Pericope[]>([]);
  const [loadingPericopes, setLoadingPericopes] = useState(false);
  const [selectedPericopeIdx, setSelectedPericopeIdx] = useState<number | null>(null);
  const [contentTab, setContentTab] = useState<'quiasma' | 'homilestica'>('homilestica');

  // Busca perícopes quando muda o livro
  useEffect(() => {
    if (!selectedBook) return;
    setLoadingPericopes(true);
    setPericopes([]);
    setSelectedPericopeIdx(null);
    fetch(`${livroPath(selectedBook.slug, selectedBook.testamento)}/quiastico.txt`)
      .then(r => r.ok ? r.text() : '')
      .then(text => {
        const list: Pericope[] = [];
        for (const raw of text.split(/\r?\n/)) {
          const line = raw.trim();
          const m = line.match(/^\[(\d+)\]\s+(.+?)(?:\s+[—–-]\s+(.+))?$/);
          if (m) list.push({ idx: parseInt(m[1], 10), titulo: m[2].trim(), ref: (m[3] ?? '').trim() });
        }
        setPericopes(list);
        if (list.length > 0) setSelectedPericopeIdx(list[0].idx);
        setLoadingPericopes(false);
      })
      .catch(() => setLoadingPericopes(false));
  }, [selectedBook]);

  const bookDays = useMemo(() => {
    if (!selectedBook) return [];
    return PLANO_COMPLETO.filter(d => d.livroAbrev === selectedBook.abrev);
  }, [selectedBook]);

  const selectedDia: DiaDevocional | null = useMemo(() => {
    if (!selectedPericopeIdx || bookDays.length === 0) return null;
    return bookDays[selectedPericopeIdx - 1] ?? null;
  }, [bookDays, selectedPericopeIdx]);

  const selectedPericope = pericopes.find(p => p.idx === selectedPericopeIdx) ?? null;
  const paraPregarConteudo = selectedDia ? gerarParaPregar(selectedDia) : null;

  const atGroups = AT_GRUPOS.map(g => ({ grupo: g, books: BIBLE_BOOKS.filter(b => b.testamento === 'AT' && b.grupo === g) }));
  const ntGroups = NT_GRUPOS.map(g => ({ grupo: g, books: BIBLE_BOOKS.filter(b => b.testamento === 'NT' && b.grupo === g) }));

  const renderBookGroup = (grupo: string, books: BibleBook[], cor: string) => (
    <div key={grupo} style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: cor, opacity: 0.6, marginBottom: 8, paddingLeft: 2 }}>
        {grupo}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {books.map(book => {
          const active = selectedBook?.slug === book.slug;
          return (
            <button
              key={book.slug}
              onClick={() => { setSelectedBook(book); setContentTab('quiasma'); }}
              style={{
                all: 'unset', cursor: 'pointer',
                padding: '8px 14px', borderRadius: 8,
                fontSize: 14, fontWeight: 700,
                background: active ? (book.testamento === 'AT' ? 'rgba(255,200,80,0.15)' : 'rgba(80,200,255,0.12)') : 'rgba(255,255,255,0.04)',
                border: `1px solid ${active ? cor : 'rgba(255,255,255,0.08)'}`,
                color: active ? cor : 'rgba(255,255,255,0.65)',
                transition: 'all 0.15s',
                boxShadow: active ? `0 0 10px ${cor}22` : 'none',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.9)'; } }}
              onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.65)'; } }}
            >
              {book.nome}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.white }}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(80px,10vw,100px) clamp(16px,4vw,32px) 60px' }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase', background: 'linear-gradient(90deg, rgba(196,160,255,1) 0%, rgba(147,197,253,1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>
            Pregação
          </div>
          <div style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: 800, color: C.white, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Estrutura quiástica & esboço homilético
          </div>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 6, lineHeight: 1.6 }}>
            Selecione um livro da Bíblia para explorar as perícopes, a estrutura quiástica e o esboço para pregar.
          </div>
        </div>

        {/* ── Grade de livros ── */}
        <div style={{ borderRadius: 20, border: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.025)', padding: 'clamp(16px,3vw,24px)', marginBottom: 28 }}>
          {/* AT */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.atColor, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>Antigo Testamento</span>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(255,180,50,0.30) 0%, transparent 100%)' }} />
            </div>
            {atGroups.map(({ grupo, books }) => renderBookGroup(grupo, books, C.atColor))}
          </div>

          {/* Divisor */}
          <div style={{ height: 1, background: C.border, margin: '4px 0 20px' }} />

          {/* NT */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.ntColor, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>Novo Testamento</span>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(80,200,255,0.30) 0%, transparent 100%)' }} />
            </div>
            {ntGroups.map(({ grupo, books }) => renderBookGroup(grupo, books, C.ntColor))}
          </div>
        </div>

        {/* ── Perícopes (abas horizontais) ── */}
        <AnimatePresence mode="wait">
          {selectedBook && (
            <motion.div key={selectedBook.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>

              {/* Cabeçalho do livro */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <ChevronRight size={15} color={selectedBook.testamento === 'AT' ? C.atColor : C.ntColor} />
                <span style={{ fontSize: 15, fontWeight: 800, color: selectedBook.testamento === 'AT' ? C.atColor : C.ntColor }}>
                  {selectedBook.nome}
                </span>
                {loadingPericopes && <span style={{ fontSize: 12, color: C.muted }}>Carregando perícopes...</span>}
                {!loadingPericopes && pericopes.length > 0 && (
                  <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{pericopes.length} perícopes</span>
                )}
                {!loadingPericopes && pericopes.length === 0 && (
                  <span style={{ fontSize: 12, color: C.muted }}>Perícopes não cadastradas ainda</span>
                )}
              </div>

              {/* Grid de perícopes */}
              {pericopes.length > 0 && (
                <div style={{ marginBottom: 28 }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: 8,
                  }}>
                    {pericopes.map(p => {
                      const active = p.idx === selectedPericopeIdx;
                      const cor = selectedBook.testamento === 'AT' ? C.atColor : C.ntColor;
                      const corL = selectedBook.testamento === 'AT' ? 'rgba(255,200,80,0.10)' : 'rgba(80,200,255,0.09)';
                      const corB2 = selectedBook.testamento === 'AT' ? C.goldB : C.blueB;
                      return (
                        <button
                          key={p.idx}
                          onClick={() => { setSelectedPericopeIdx(p.idx); setContentTab('homilestica'); }}
                          style={{
                            all: 'unset', cursor: 'pointer',
                            display: 'flex', alignItems: 'flex-start', gap: 10,
                            padding: '12px 14px', borderRadius: 12,
                            background: active
                              ? corL
                              : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${active ? corB2 : 'rgba(255,255,255,0.07)'}`,
                            boxShadow: active ? `0 0 16px ${cor}18` : 'none',
                            transition: 'all 0.15s',
                          }}
                          onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; }}
                          onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)'; }}
                        >
                          {/* Número badge */}
                          <div style={{
                            flexShrink: 0,
                            width: 30, height: 30, borderRadius: 8,
                            background: active ? (selectedBook.testamento === 'AT' ? 'rgba(255,200,80,0.20)' : 'rgba(80,200,255,0.18)') : 'rgba(255,255,255,0.06)',
                            border: `1px solid ${active ? corB2 : 'rgba(255,255,255,0.10)'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 11, fontWeight: 900, color: active ? cor : C.muted,
                            letterSpacing: '0.04em',
                          }}>
                            {String(p.idx).padStart(2, '0')}
                          </div>
                          {/* Texto */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              fontSize: 13, fontWeight: 700, lineHeight: 1.35,
                              color: active ? C.white : 'rgba(255,255,255,0.75)',
                              overflow: 'hidden', display: '-webkit-box',
                              WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                            }}>
                              {p.titulo}
                            </div>
                            {p.ref && (
                              <div style={{ fontSize: 11, color: active ? cor : C.muted, marginTop: 3, fontWeight: 600 }}>
                                {p.ref}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Abas de conteúdo: Estrutura Quiástica | Homilética */}
              {selectedPericope && selectedDia && (
                <motion.div key={selectedPericopeIdx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  {/* Tab bar */}
                  <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: `1px solid ${C.border}`, paddingBottom: 0 }}>
                    {([
                      { key: 'homilestica', label: 'Homilética Para Pregar' },
                      { key: 'quiasma',     label: 'Estrutura Quiástica' },
                    ] as { key: 'quiasma' | 'homilestica'; label: string }[]).map(tab => {
                      const active = contentTab === tab.key;
                      return (
                        <button
                          key={tab.key}
                          onClick={() => setContentTab(tab.key)}
                          style={{
                            all: 'unset', cursor: 'pointer',
                            padding: '12px 22px',
                            fontSize: 15, fontWeight: 800,
                            color: active ? C.white : C.muted,
                            borderBottom: active ? '2px solid rgba(196,160,255,1)' : '2px solid transparent',
                            marginBottom: -1,
                            transition: 'all 0.15s',
                            letterSpacing: '0.03em',
                          }}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Pericope title */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.18em', color: selectedBook.testamento === 'AT' ? C.atColor : C.ntColor, textTransform: 'uppercase', marginBottom: 6 }}>
                      Perícope {String(selectedPericope.idx).padStart(2, '0')}
                    </div>
                    <div style={{ fontSize: 'clamp(22px,3.5vw,30px)', fontWeight: 800, color: C.white, lineHeight: 1.3 }}>
                      {selectedPericope.titulo}
                    </div>
                    {selectedPericope.ref && (
                      <div style={{ fontSize: 16, color: C.muted, marginTop: 6 }}>{selectedPericope.ref}</div>
                    )}
                  </div>

                  {/* Tab content */}
                  <AnimatePresence mode="wait">
                    {contentTab === 'quiasma' ? (
                      <motion.div key="quiasma" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.18 }}>
                        <QuiasmaSection d={selectedDia} pericopeIdx={selectedPericope.idx} />
                      </motion.div>
                    ) : (
                      <motion.div key="homilestica" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.18 }}>
                        {paraPregarConteudo ? (
                          <ParaPregarSection d={selectedDia} pericopeIdx={selectedPericope.idx} conteudo={paraPregarConteudo} sermonTitulo={SERMON_TITLES[selectedDia.dia]} />
                        ) : (
                          <div style={{ padding: 32, borderRadius: 16, border: '1px solid rgba(168,120,255,0.20)', background: 'rgba(20,12,40,0.6)', color: C.muted, fontSize: 13, textAlign: 'center' }}>
                            Esboço homilético ainda não disponível para esta perícope.
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Estado inicial (nenhum livro selecionado) */}
        {!selectedBook && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: C.muted, fontSize: 13 }}>
            Selecione um livro acima para começar.
          </div>
        )}
      </div>
    </div>
  );
}
