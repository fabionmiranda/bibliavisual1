import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronRight, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import { PLANO_COMPLETO, type DiaDevocional } from '../data/calendarioDevocional';
import { gerarParaPregar } from '../data/paraPregar';
import { SERMON_TITLES } from '../data/sermonTitles';
import { SERMON_QUESTIONS } from '../data/sermonQuestions';
import { SERMON_GANCHOS } from '../data/sermonGanchos';

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
function ParaPregarSection({ d, pericopeIdx, conteudo, sermonTitulo, sermonPergunta }: { d: DiaDevocional; pericopeIdx: number; conteudo: string; sermonTitulo?: string; sermonPergunta?: string }) {
  const [quiasmaArms, setQuiasmaArms] = useState<{ badgeLetter: string; refPart: string; desc: string; level: number; isCenter: boolean }[]>([]);
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
        let i = 0;
        while (i < linhas.length) {
          const trimmed = linhas[i].trim();
          const lm = trimmed.match(/^([A-Z])'?\d*\s*[\(\-]/);
          if (lm) {
            const base = lm[1].toUpperCase();
            const level = Math.max(0, baseLetters.indexOf(base));
            const badgeLetter = trimmed.match(/^([A-Z]'?\d*)/)?.[1] ?? trimmed[0];
            const refPart = trimmed.slice(badgeLetter.length).trim();
            // captura linhas de descrição seguintes
            const descLines: string[] = [];
            let j = i + 1;
            while (j < linhas.length) {
              const next = linhas[j].trim();
              if (!next) { j++; break; }
              if (/^\[\d/.test(next) || /^([A-Z])'?\d*\s*[\(\-]/.test(next)) break;
              descLines.push(next);
              j++;
            }
            arms.push({ badgeLetter, refPart, desc: descLines.join(' '), level, isCenter: level === maxLvl });
            i = j;
          } else { i++; }
        }
        setQuiasmaArms(arms);
      })
      .catch(() => {});
  }, [d, pericopeIdx, book]);

  // ── Detectar formato novo (rico) ──
  const isNovoFormato = conteudo.includes('MOVIMENTOS DO SERMÃO');

  // ── Parser formato NOVO ──
  interface Movimento { titulo: string; indicacao: string; exegese: string; teologia: string; aplicacao: string; isCenter: boolean; }
  let nTitulo = '', nBigIdeia = '', nPergunta = '', nPalavraChave = '', nEixoRedentor = '', nDoutrina = '', nConclusao = '';
  const nMovimentos: Movimento[] = [];
  const nAplicacoes: { label: string; texto: string }[] = [];

  if (isNovoFormato) {
    type SecaoNova = 'none'|'titulo'|'bigideia'|'pergunta'|'palavrachave'|'movimentos'|'eixoredentor'|'doutrina'|'aplicacoes'|'conclusao';
    let secao: SecaoNova = 'none';
    let movAtual: Partial<Movimento> | null = null;
    let movField: 'indicacao'|'exegese'|'teologia'|'aplicacao'|null = null;
    for (const rawLine of conteudo.split('\n')) {
      const line = rawLine.trim();
      if (!line || line.startsWith('PARA PREGAR')) continue;
      if (line === 'TÍTULO DO SERMÃO') { secao = 'titulo'; continue; }
      if (line === 'BIG IDEA') { secao = 'bigideia'; continue; }
      if (line === 'PERGUNTA DE TRANSIÇÃO') { secao = 'pergunta'; continue; }
      if (line === 'PALAVRA-CHAVE DE TRANSIÇÃO') { secao = 'palavrachave'; continue; }
      if (line === 'MOVIMENTOS DO SERMÃO') { secao = 'movimentos'; continue; }
      if (line === 'EIXO REDENTOR' || line.startsWith('EIXO REDENTOR')) { if (movAtual) { nMovimentos.push(movAtual as Movimento); movAtual = null; } secao = 'eixoredentor'; continue; }
      if (line === 'DOUTRINA CENTRAL') { secao = 'doutrina'; continue; }
      if (line === 'APLICAÇÕES PASTORAIS') { secao = 'aplicacoes'; continue; }
      if (line === 'CONCLUSÃO') { secao = 'conclusao'; continue; }
      if (line === 'EIXO CRISTOLÓGICO') { continue; } // ignorar no novo formato

      if (secao === 'titulo' && !nTitulo) { nTitulo = line; continue; }
      if (secao === 'bigideia' && !nBigIdeia) { nBigIdeia = line.replace(/^"|"$/g, ''); continue; }
      if (secao === 'pergunta' && !nPergunta) { nPergunta = line; continue; }
      if (secao === 'palavrachave') { nPalavraChave += (nPalavraChave ? ' ' : '') + line; continue; }
      if (secao === 'eixoredentor') { nEixoRedentor += (nEixoRedentor ? ' ' : '') + line; continue; }
      if (secao === 'doutrina') { nDoutrina += (nDoutrina ? ' ' : '') + line; continue; }
      if (secao === 'conclusao') { nConclusao += (nConclusao ? '\n' : '') + line; continue; }
      if (secao === 'aplicacoes') {
        const m = line.match(/^▸\s*(Para [^:]+):\s*(.*)/);
        if (m) nAplicacoes.push({ label: m[1], texto: m[2] });
        else if (nAplicacoes.length) nAplicacoes[nAplicacoes.length-1].texto += ' ' + line;
        continue;
      }
      if (secao === 'movimentos') {
        const mvMatch = line.match(/^(I{1,3}V?|VI?I?I?|IX|X)[\.\s]/);
        if (mvMatch) {
          if (movAtual) nMovimentos.push(movAtual as Movimento);
          const isCenter = line.includes('◉') || line.includes('CENTRO');
          movAtual = { titulo: line, indicacao: '', exegese: '', teologia: '', aplicacao: '', isCenter };
          movField = null; continue;
        }
        if (line.startsWith('§ Indicação') || line.startsWith('§ Indicacao')) { movField = 'indicacao'; if (movAtual) movAtual.indicacao = line.replace(/^§\s*Indicação Textual:\s*/i,'').replace(/^§\s*Indicacao Textual:\s*/i,''); continue; }
        if (line.startsWith('§ Exegese')) { movField = 'exegese'; if (movAtual) movAtual.exegese = line.replace(/^§\s*Exegese:\s*/i,''); continue; }
        if (line.startsWith('§ Teologia')) { movField = 'teologia'; if (movAtual) movAtual.teologia = line.replace(/^§\s*Teologia Reformada:\s*/i,''); continue; }
        if (line.startsWith('§ Aplicação') || line.startsWith('§ Aplicacao')) { movField = 'aplicacao'; if (movAtual) movAtual.aplicacao = line.replace(/^§\s*Aplicação:\s*/i,'').replace(/^§\s*Aplicacao:\s*/i,''); continue; }
        if (movAtual && movField) { (movAtual as any)[movField] += ' ' + line; }
      }
    }
    if (movAtual) nMovimentos.push(movAtual as Movimento);
  }

  // ── Parser formato ANTIGO ──
  interface TG { title: string; gancho: string; }
  let bigIdea = '', eixo = '';
  const titlesGanchos: TG[] = [];
  let section: 'none' | 'big' | 'movimentos' | 'eixo' = 'none';
  let pending: Partial<TG> | null = null;
  if (!isNovoFormato) {
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
  }

  // ── Render NOVO FORMATO ──────────────────────────────────────────────
  if (isNovoFormato) {
    const pv = 'clamp(14px,3.5vw,20px)';
    const ph = 'clamp(16px,4vw,24px)';
    const tagStyle = (cor: string): React.CSSProperties => ({ fontSize: 11, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: cor, marginBottom: 8 });
    const MOV_CORES = ['rgba(255,200,80,1)','rgba(80,200,255,1)','rgba(180,120,255,1)','rgba(100,220,160,1)','rgba(255,140,80,1)','rgba(255,100,160,1)'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Cabeçalho */}
        <div style={{ borderRadius: 16, padding: `${pv} ${ph}`, background: 'linear-gradient(135deg, rgba(20,12,40,0.97) 0%, rgba(10,18,48,0.97) 100%)', border: '1px solid rgba(168,120,255,0.30)', boxShadow: '0 8px 32px rgba(0,0,0,0.45)' }}>
          <div style={tagStyle('rgba(196,160,255,0.55)')}>Para Pregar · Homilética Expositiva Reformada</div>
          {nTitulo && <div style={{ fontSize: 'clamp(20px,3.8vw,28px)', fontWeight: 900, lineHeight: 1.25, background: 'linear-gradient(135deg, rgba(226,210,255,1) 0%, rgba(147,210,255,1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 16 }}>{nTitulo}</div>}
          {nBigIdeia && <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.25)', marginBottom: 12 }}>
            <div style={tagStyle('rgba(196,160,255,0.60)')}>Big Idea</div>
            <div style={{ fontSize: 'clamp(17px,3vw,21px)', color: 'rgba(226,220,255,0.97)', fontWeight: 700, fontStyle: 'italic', lineHeight: 1.5 }}>"{nBigIdeia}"</div>
          </div>}
          {nPergunta && <div style={{ padding: '12px 16px', borderRadius: 10, background: 'linear-gradient(135deg, rgba(96,165,250,0.08) 0%, rgba(139,92,246,0.06) 100%)', border: '1px solid rgba(96,165,250,0.25)', borderLeft: '4px solid rgba(96,165,250,1)', marginBottom: 12 }}>
            <div style={tagStyle('rgba(147,197,253,0.65)')}>Pergunta de Transição</div>
            <div style={{ fontSize: 'clamp(15px,2.6vw,18px)', color: 'rgba(210,230,255,0.95)', fontWeight: 600, fontStyle: 'italic', lineHeight: 1.6 }}>{nPergunta}</div>
          </div>}
          {nPalavraChave && <div style={{ fontSize: 'clamp(14px,2.4vw,16px)', color: 'rgba(180,175,220,0.78)', lineHeight: 1.65, fontStyle: 'italic' }}>{nPalavraChave}</div>}
        </div>

        {/* Movimentos */}
        {nMovimentos.length > 0 && <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={tagStyle('rgba(147,197,253,0.60)')}>Movimentos do Sermão</div>
          {nMovimentos.map((mv, i) => {
            const cor = MOV_CORES[i % MOV_CORES.length];
            const corB = cor.replace('1)', '0.25)');
            const corBg = cor.replace('1)', '0.07)');
            return (
              <div key={i} style={{ borderRadius: 14, overflow: 'hidden', border: `1px solid ${corB}`, background: `linear-gradient(135deg, ${corBg} 0%, rgba(5,7,26,0.95) 100%)` }}>
                <div style={{ height: 4, background: `linear-gradient(90deg, ${cor} 0%, ${cor.replace('1)','0.3)')} 70%, transparent 100%)` }} />
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ fontSize: 'clamp(15px,2.6vw,17px)', fontWeight: 800, color: cor, lineHeight: 1.4, marginBottom: 8 }}>{mv.titulo}</div>
                  {mv.indicacao && (() => {
                    const verseRef = mv.indicacao.split('(')[0].trim();
                    return verseRef ? (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 12, padding: '4px 12px', borderRadius: 20, background: cor.replace('1)', '0.10)'), border: `1px solid ${cor.replace('1)', '0.35)')}` }}>
                        <span style={{ fontSize: 11, fontWeight: 900, color: cor }}>§</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: cor, letterSpacing: '0.06em' }}>{verseRef}</span>
                      </div>
                    ) : null;
                  })()}
                  {[
                    { label: 'Indicação Textual', text: mv.indicacao, cor: 'rgba(255,220,120,0.80)' },
                    { label: 'Exegese', text: mv.exegese, cor: 'rgba(180,230,255,0.80)' },
                    { label: 'Teologia Reformada', text: mv.teologia, cor: 'rgba(200,170,255,0.80)' },
                    { label: 'Aplicação', text: mv.aplicacao, cor: 'rgba(120,220,160,0.90)' },
                  ].filter(f => f.text).map((f, fi) => (
                    <div key={fi} style={{ marginBottom: fi < 3 ? 12 : 0 }}>
                      <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: f.cor, marginBottom: 4 }}>{f.label}</div>
                      <div style={{ fontSize: 'clamp(14px,2.4vw,16px)', color: fi === 3 ? 'rgba(160,230,190,0.95)' : 'rgba(215,225,245,0.90)', lineHeight: 1.7, fontStyle: fi === 3 ? 'italic' : 'normal' }}>{f.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>}

        {/* Eixo Redentor */}
        {nEixoRedentor && <div style={{ borderRadius: 12, padding: '16px 20px', background: 'rgba(255,140,80,0.07)', border: '1px solid rgba(255,140,80,0.25)', borderLeft: '4px solid rgba(255,140,80,0.80)' }}>
          <div style={tagStyle('rgba(255,180,100,0.80)')}>Eixo Redentor · Perspectiva Histórico-Redentiva</div>
          <div style={{ fontSize: 'clamp(14px,2.4vw,16px)', color: 'rgba(255,225,185,0.93)', lineHeight: 1.75 }}>{nEixoRedentor}</div>
        </div>}

        {/* Doutrina Central */}
        {nDoutrina && <div style={{ borderRadius: 12, padding: '14px 20px', background: 'rgba(80,200,255,0.06)', border: '1px solid rgba(80,200,255,0.22)' }}>
          <div style={tagStyle('rgba(147,197,253,0.75)')}>Doutrina Central</div>
          <div style={{ fontSize: 'clamp(15px,2.5vw,17px)', color: 'rgba(205,232,255,0.93)', fontWeight: 600, lineHeight: 1.65 }}>{nDoutrina}</div>
        </div>}

        {/* Aplicações Pastorais */}
        {nAplicacoes.length > 0 && <div style={{ borderRadius: 12, padding: '14px 20px', background: 'rgba(100,220,160,0.06)', border: '1px solid rgba(100,220,160,0.22)' }}>
          <div style={tagStyle('rgba(120,220,160,0.75)')}>Aplicações Pastorais</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {nAplicacoes.map((ap, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, fontSize: 11, fontWeight: 900, color: 'rgba(120,220,160,0.80)', paddingTop: 2, minWidth: 100 }}>{ap.label}</div>
                <div style={{ fontSize: 'clamp(14px,2.4vw,16px)', color: 'rgba(195,232,215,0.92)', lineHeight: 1.7 }}>{ap.texto}</div>
              </div>
            ))}
          </div>
        </div>}

        {/* Conclusão */}
        {nConclusao && <div style={{ borderRadius: 12, padding: '16px 20px', background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(96,165,250,0.06) 100%)', border: '1px solid rgba(139,92,246,0.22)' }}>
          <div style={tagStyle('rgba(196,160,255,0.75)')}>Conclusão</div>
          <div style={{ fontSize: 'clamp(14px,2.4vw,16px)', color: 'rgba(222,218,255,0.92)', lineHeight: 1.85 }}>{nConclusao}</div>
        </div>}
      </div>
    );
  }

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
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(196,160,255,0.60)', marginBottom: 8 }}>
              Título do Sermão
            </div>
            <div style={{
              fontSize: 'clamp(20px,3.5vw,28px)', fontWeight: 800, lineHeight: 1.25,
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
          <div style={{ marginBottom: sermonPergunta ? 12 : 16, padding: '10px 14px', borderRadius: 10, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.20)' }}>
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(196,160,255,0.70)', marginBottom: 8 }}>Big Idea</div>
            <div style={{ fontSize: 'clamp(17px,3vw,21px)', color: 'rgba(226,220,255,0.97)', fontWeight: 700, lineHeight: 1.55, fontStyle: 'italic' }}>"{bigIdea}"</div>
          </div>
        )}

        {/* Pergunta Geradora — nasce da Big Idea, guia todos os pontos */}
        {sermonPergunta && (
          <div style={{ marginBottom: 16, padding: '14px 16px', borderRadius: 12, background: 'linear-gradient(135deg, rgba(96,165,250,0.08) 0%, rgba(139,92,246,0.06) 100%)', border: '1px solid rgba(96,165,250,0.28)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'linear-gradient(180deg, rgba(96,165,250,1) 0%, rgba(139,92,246,1) 100%)', borderRadius: '12px 0 0 12px' }} />
            <div style={{ paddingLeft: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(147,197,253,0.75)', marginBottom: 10 }}>
                Pergunta Geradora do Sermão
              </div>
              <div style={{ fontSize: 'clamp(16px,2.8vw,19px)', color: 'rgba(210,230,255,0.97)', fontWeight: 700, lineHeight: 1.65, fontStyle: 'italic' }}>
                {sermonPergunta}
              </div>
              <div style={{ marginTop: 10, fontSize: 11, color: 'rgba(147,197,253,0.50)', fontWeight: 600, letterSpacing: '0.08em' }}>
                Esta pergunta guia todos os pontos do sermão
              </div>
            </div>
          </div>
        )}
        {quiasmaArms.length > 0 && titlesGanchos.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(147,197,253,0.65)', marginBottom: 14 }}>Movimentos do Texto</div>
            {quiasmaArms.map((arm, idx) => {
              const tg = titlesGanchos[idx];
              if (!tg) return null;
              const { badgeLetter, refPart, desc, level, isCenter } = arm;
              const overrideGanchos = SERMON_GANCHOS[d.dia];
              const gancho = (overrideGanchos && overrideGanchos[idx]) ? overrideGanchos[idx] : tg.gancho;
              const pal = QUIASMA_PALETA[level % QUIASMA_PALETA.length];
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: isCenter ? 16 : 8, marginBottom: isCenter ? 16 : 2, paddingLeft: level * 14 }}>
                  {/* Barra lateral */}
                  <div style={{ width: 3, minHeight: 38, borderRadius: 4, background: pal.label, flexShrink: 0, marginTop: 4 }} />
                  {/* Badge */}
                  <div style={{ flexShrink: 0, minWidth: 'clamp(30px,4.5vw,40px)', textAlign: 'center', background: isCenter ? pal.bg : pal.bg.replace(/[\d.]+\)$/, '0.08)'), border: `1px solid ${isCenter ? pal.border : pal.border.replace(/[\d.]+\)$/, '0.28)')}`, borderRadius: 7, padding: '5px 8px', fontSize: 'clamp(14px,2.3vw,18px)', fontWeight: 900, color: pal.label, boxShadow: isCenter ? `0 0 14px ${pal.bg}` : undefined, alignSelf: 'flex-start', lineHeight: 1.2 }}>{badgeLetter}</div>
                  {/* Conteúdo */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Ref versículo — com abreviação do livro, em destaque didático */}
                    {refPart && (() => {
                      const cleanRef = refPart.match(/^\(([^)]+)\)/)?.[1] ?? refPart.split(/[\s—]/)[0].replace(/[()]/g,'');
                      const fullRef = `(${d.livroAbrev} ${cleanRef})`;
                      return (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 7, padding: '3px 11px', borderRadius: 20, background: pal.bg, border: `1px solid ${pal.border.replace(/[\d.]+\)$/, '0.45)')}` }}>
                          <span style={{ fontSize: 11, fontWeight: 900, color: pal.label, opacity: 0.7 }}>§</span>
                          <span style={{ fontSize: 13, fontWeight: 800, color: pal.label, letterSpacing: '0.05em' }}>{fullRef}</span>
                        </div>
                      );
                    })()}
                    {/* Gancho — itálico, em destaque */}
                    {gancho && (
                      <div style={{ fontSize: 'clamp(15px,2.6vw,17px)', color: isCenter ? pal.label : 'rgba(222,218,255,0.96)', fontStyle: 'italic', fontWeight: isCenter ? 700 : 500, lineHeight: 1.65, marginTop: refPart ? 4 : 0 }}>
                        {gancho}
                      </div>
                    )}
                    {/* Texto padrão do quiasma — abaixo, menor e mais suave */}
                    {desc && (
                      <div style={{ fontSize: 'clamp(12px,2.1vw,14px)', color: 'rgba(180,175,220,0.60)', marginTop: 6, lineHeight: 1.65, fontWeight: 400 }}>
                        {desc.split(/(\[[^\]]+\])/).map((part, pi) =>
                          part.startsWith('[') && part.endsWith(']')
                            ? <span key={pi} style={{ fontFamily: '"SBL Hebrew","Noto Serif Hebrew","Times New Roman",serif', fontSize: 'clamp(13px,2.5vw,16px)', color: pal.label, opacity: 0.6, marginLeft: 3 }}>{part}</span>
                            : part
                        )}
                      </div>
                    )}
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
  const [selectedBook, setSelectedBook] = useState<BibleBook>(BIBLE_BOOKS[0]);
  const [pericopes, setPericopes] = useState<Pericope[]>([]);
  const [loadingPericopes, setLoadingPericopes] = useState(false);
  const [selectedPericopeIdx, setSelectedPericopeIdx] = useState<number | null>(null);
  const [contentTab, setContentTab] = useState<'quiasma' | 'homilestica'>('homilestica');

  // Busca perícopes quando muda o livro
  useEffect(() => {
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

  const bookDays = useMemo(() => PLANO_COMPLETO.filter(d => d.livroAbrev === selectedBook.abrev), [selectedBook]);

  const selectedDia: DiaDevocional | null = useMemo(() => {
    if (!selectedPericopeIdx || bookDays.length === 0) return null;
    return bookDays[selectedPericopeIdx - 1] ?? null;
  }, [bookDays, selectedPericopeIdx]);

  const selectedPericope = pericopes.find(p => p.idx === selectedPericopeIdx) ?? null;
  const paraPregarConteudo = selectedDia ? gerarParaPregar(selectedDia) : null;

  const cor = selectedBook.testamento === 'AT' ? C.atColor : C.ntColor;
  const corB = selectedBook.testamento === 'AT' ? C.goldB : C.blueB;

  function selectBook(book: BibleBook) {
    setSelectedBook(book);
    setContentTab('homilestica');
    setTimeout(() => {
      const el = document.getElementById('pregacao-pericopes');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  function selectPericope(idx: number) {
    setSelectedPericopeIdx(idx);
    setContentTab('homilestica');
    setTimeout(() => {
      const el = document.getElementById('pregacao-content');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  const [bookDropOpen, setBookDropOpen] = useState(false);

  const GRUPOS_ABBR = [
    { label: 'Pentateuco',  t: 'AT', slugs: ['genesis','exodo','levitico','numeros','deuteronomio'] },
    { label: 'Históricos',  t: 'AT', slugs: ['josue','juizes','rute','1samuel','2samuel','1reis','2reis','1cronicas','2cronicas','esdras','neemias','ester'] },
    { label: 'Poéticos',    t: 'AT', slugs: ['jo','salmos','proverbios','eclesiastes','canticos'] },
    { label: 'Proféticos',  t: 'AT', slugs: ['isaias','jeremias','lamentacoes','ezequiel','daniel','oseias','joel','amos','obadias','jonas','miqueias','naum','habacuque','sofonias','ageu','zacarias','malaquias'] },
    { label: 'Evangelhos',  t: 'NT', slugs: ['mateus','marcos','lucas','joao'] },
    { label: 'Epístolas',   t: 'NT', slugs: ['atos','romanos','1corintios','2corintios','galatas','efesios','filipenses','colossenses','1tessalonicenses','2tessalonicenses','1timoteo','2timoteo','tito','filemom','hebreus','tiago','1pedro','2pedro','1joao','2joao','3joao','judas','apocalipse'] },
  ] as const;

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.white }} onClick={() => setBookDropOpen(false)}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(80px,10vw,100px) clamp(16px,4vw,32px) 60px' }}>

        {/* Header + seletor inline */}
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase', background: 'linear-gradient(90deg, rgba(196,160,255,1) 0%, rgba(147,197,253,1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 6 }}>
              Pregação
            </div>
            <div style={{ fontSize: 'clamp(20px,3.5vw,28px)', fontWeight: 800, color: C.white, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Estrutura quiástica & esboço homilético
            </div>
          </div>

          {/* ── Seletor compacto de livro ── */}
          <div style={{ position: 'relative', flexShrink: 0, marginTop: 4 }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setBookDropOpen(v => !v)}
              style={{
                all: 'unset', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 16px', borderRadius: 12,
                background: bookDropOpen ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${bookDropOpen ? corB : 'rgba(255,255,255,0.10)'}`,
                boxShadow: bookDropOpen ? `0 0 20px ${cor}18` : 'none',
                transition: 'all 0.2s',
                minWidth: 180,
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: cor, flexShrink: 0, boxShadow: `0 0 6px ${cor}` }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: cor, flex: 1 }}>{selectedBook.nome}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: C.muted, marginRight: 2 }}>{selectedBook.testamento}</span>
              <ChevronDown size={14} color={C.muted} style={{ transition: 'transform 0.2s', transform: bookDropOpen ? 'rotate(180deg)' : 'none' }} />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {bookDropOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                    zIndex: 100, width: 'clamp(320px, 60vw, 520px)',
                    borderRadius: 16,
                    background: 'rgba(8,10,28,0.97)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(24px)',
                    padding: '14px 16px 16px',
                    maxHeight: '70vh', overflowY: 'auto',
                  }}
                >
                  {GRUPOS_ABBR.map((g, gi) => {
                    const books = g.slugs.map(s => BIBLE_BOOKS.find(b => b.slug === s)).filter(Boolean) as BibleBook[];
                    const isNT = g.t === 'NT';
                    const groupCor = isNT ? C.ntColor : C.atColor;
                    const groupCorB = isNT ? C.blueB : C.goldB;
                    return (
                      <div key={g.label} style={{ marginBottom: gi < GRUPOS_ABBR.length - 1 ? 12 : 0 }}>
                        {/* Divisor AT→NT */}
                        {gi === 4 && (
                          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '4px 0 12px' }} />
                        )}
                        <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: groupCor, opacity: 0.5, marginBottom: 6 }}>
                          {g.label}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {books.map(book => {
                            const active = selectedBook.slug === book.slug;
                            return (
                              <button
                                key={book.slug}
                                onClick={() => { selectBook(book); setBookDropOpen(false); }}
                                style={{
                                  all: 'unset', cursor: 'pointer',
                                  padding: '4px 10px', borderRadius: 8,
                                  fontSize: 12, fontWeight: active ? 800 : 400,
                                  background: active
                                    ? (isNT ? 'rgba(80,200,255,0.14)' : 'rgba(255,200,80,0.14)')
                                    : 'rgba(255,255,255,0.04)',
                                  border: `1px solid ${active ? groupCorB : 'rgba(255,255,255,0.07)'}`,
                                  color: active ? groupCor : 'rgba(255,255,255,0.60)',
                                  boxShadow: active ? `0 0 8px ${groupCor}22` : 'none',
                                  transition: 'all 0.12s',
                                  whiteSpace: 'nowrap',
                                }}
                                onMouseEnter={e => { if (!active) { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'rgba(255,255,255,0.08)'; el.style.color = 'rgba(255,255,255,0.90)'; } }}
                                onMouseLeave={e => { if (!active) { const el = e.currentTarget as HTMLButtonElement; el.style.background = 'rgba(255,255,255,0.04)'; el.style.color = 'rgba(255,255,255,0.60)'; } }}
                              >
                                {book.nome}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Divisor */}
        <div style={{ height: 1, background: `linear-gradient(90deg, ${corB} 0%, transparent 70%)`, marginBottom: 28 }} />

        {/* ── Perícopes ── */}
        <AnimatePresence mode="wait">
          <motion.div key={selectedBook.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>

            {/* Nome do livro + contagem */}
            <div id="pregacao-pericopes" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: cor }}>{selectedBook.nome}</span>
              {loadingPericopes && <span style={{ fontSize: 12, color: C.muted }}>Carregando...</span>}
              {!loadingPericopes && pericopes.length > 0 && (
                <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{pericopes.length} perícopes</span>
              )}
              {!loadingPericopes && pericopes.length === 0 && (
                <span style={{ fontSize: 12, color: C.muted }}>Perícopes ainda não cadastradas</span>
              )}
            </div>

              {/* Grid de perícopes */}
              {pericopes.length > 0 && (
                <div style={{ marginBottom: 28 }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 10,
                  }}>
                    {pericopes.map((p, cardIdx) => {
                      const active = p.idx === selectedPericopeIdx;
                      const isAT   = selectedBook.testamento === 'AT';
                      const pCor   = isAT ? C.atColor : C.ntColor;
                      const pCorB  = isAT ? C.goldB : C.blueB;
                      const dia    = bookDays[p.idx - 1];
                      const sermonTitle = dia ? SERMON_TITLES[dia.dia] : undefined;

                      // Paleta rotativa sutil para dar personalidade a cada card
                      const CARD_ACCENTS = [
                        { glow: 'rgba(255,200,80,',  stripe: 'rgba(255,200,80,'  },
                        { glow: 'rgba(80,200,255,',  stripe: 'rgba(80,200,255,'  },
                        { glow: 'rgba(180,120,255,', stripe: 'rgba(180,120,255,' },
                        { glow: 'rgba(100,220,160,', stripe: 'rgba(100,220,160,' },
                        { glow: 'rgba(255,140,80,',  stripe: 'rgba(255,140,80,'  },
                        { glow: 'rgba(255,100,160,', stripe: 'rgba(255,100,160,' },
                        { glow: 'rgba(80,220,220,',  stripe: 'rgba(80,220,220,'  },
                      ];
                      const accent = CARD_ACCENTS[cardIdx % CARD_ACCENTS.length];
                      const accentFull   = `${accent.glow}1)`;
                      const accentStrong = `${accent.glow}0.85)`;
                      const accentMid    = `${accent.glow}0.20)`;
                      const accentLight  = `${accent.glow}0.10)`;
                      const accentBorder = `${accent.stripe}0.45)`;
                      const accentBorderL= `${accent.stripe}0.22)`;

                      return (
                        <button
                          key={p.idx}
                          onClick={() => selectPericope(p.idx)}
                          style={{
                            all: 'unset', cursor: 'pointer',
                            display: 'flex', flexDirection: 'column',
                            padding: '0', borderRadius: 16,
                            background: active
                              ? `linear-gradient(145deg, ${accentMid} 0%, rgba(5,7,26,0.98) 100%)`
                              : `linear-gradient(145deg, ${accentLight} 0%, rgba(5,7,26,0.92) 100%)`,
                            border: `1px solid ${active ? accentBorder : accentBorderL}`,
                            boxShadow: active
                              ? `0 0 32px ${accent.glow}0.28), 0 6px 24px rgba(0,0,0,0.55), inset 0 1px 0 ${accent.glow}0.15)`
                              : `0 2px 14px rgba(0,0,0,0.35), inset 0 1px 0 ${accent.glow}0.08)`,
                            transition: 'all 0.2s',
                            textAlign: 'left',
                            overflow: 'hidden',
                            position: 'relative',
                          }}
                          onMouseEnter={e => {
                            if (!active) {
                              const el = e.currentTarget as HTMLButtonElement;
                              el.style.background = `linear-gradient(145deg, ${accentMid} 0%, rgba(5,7,26,0.96) 100%)`;
                              el.style.borderColor = accentBorder;
                              el.style.boxShadow = `0 0 22px ${accent.glow}0.20), 0 5px 18px rgba(0,0,0,0.45), inset 0 1px 0 ${accent.glow}0.12)`;
                            }
                          }}
                          onMouseLeave={e => {
                            if (!active) {
                              const el = e.currentTarget as HTMLButtonElement;
                              el.style.background = `linear-gradient(145deg, ${accentLight} 0%, rgba(5,7,26,0.92) 100%)`;
                              el.style.borderColor = accentBorderL;
                              el.style.boxShadow = `0 2px 14px rgba(0,0,0,0.35), inset 0 1px 0 ${accent.glow}0.08)`;
                            }
                          }}
                        >
                          {/* Listra colorida no topo — mais espessa e viva */}
                          <div style={{
                            height: 4, width: '100%',
                            background: `linear-gradient(90deg, ${accentFull} 0%, ${accent.glow}0.5) 70%, transparent 100%)`,
                            borderRadius: '16px 16px 0 0',
                          }} />

                          <div style={{ padding: '12px 15px 15px' }}>
                            {/* Número + ref */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                              <div style={{
                                flexShrink: 0,
                                padding: '2px 8px', borderRadius: 5,
                                background: accentMid,
                                border: `1px solid ${accentBorder}`,
                                fontSize: 10, fontWeight: 900, color: accentFull,
                                letterSpacing: '0.08em',
                              }}>
                                {String(p.idx).padStart(2, '0')}
                              </div>
                              {p.ref && (
                                <span style={{ fontSize: 12, color: accentStrong, fontWeight: 700 }}>
                                  {p.ref}
                                </span>
                              )}
                              {active && (
                                <div style={{ marginLeft: 'auto', width: 7, height: 7, borderRadius: '50%', background: accentFull, boxShadow: `0 0 10px ${accentFull}` }} />
                              )}
                            </div>

                            {/* Título do sermão — destaque principal */}
                            {sermonTitle && (
                              <div style={{
                                fontSize: 14, fontWeight: 800, lineHeight: 1.38,
                                color: accentFull,
                                marginBottom: 8,
                                overflow: 'hidden', display: '-webkit-box',
                                WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
                              }}>
                                {sermonTitle}
                              </div>
                            )}

                            {/* Título da perícope — secundário com cor viva */}
                            <div style={{
                              fontSize: 11, fontWeight: 600, lineHeight: 1.4,
                              color: accentStrong,
                              overflow: 'hidden', display: '-webkit-box',
                              WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                              paddingTop: sermonTitle ? 7 : 0,
                              borderTop: sermonTitle ? `1px solid ${accentBorderL}` : 'none',
                            }}>
                              {p.titulo}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Abas de conteúdo: Estrutura Quiástica | Homilética */}
              {selectedPericope && selectedDia && (
                <motion.div id="pregacao-content" key={selectedPericopeIdx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
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
                          <ParaPregarSection d={selectedDia} pericopeIdx={selectedPericope.idx} conteudo={paraPregarConteudo} sermonTitulo={SERMON_TITLES[selectedDia.dia]} sermonPergunta={SERMON_QUESTIONS[selectedDia.dia]} />
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
        </AnimatePresence>
      </div>


    </div>
  );
}
