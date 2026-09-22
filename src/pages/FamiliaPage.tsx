import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import FlagToggle from '../components/FlagToggle';
import { PLANO_COMPLETO, type DiaDevocional } from '../data/calendarioDevocional';
import { gerarParaFamilia } from '../data/paraFamilia';

// ─── Design tokens ──────────────────────────────────────────────────
const C = {
  bg:      '#05071a',
  green:   'rgba(52,211,153,1)',
  greenL:  'rgba(52,211,153,0.12)',
  greenB:  'rgba(52,211,153,0.35)',
  gold:    'rgba(255,200,80,1)',
  blue:    'rgba(80,200,255,1)',
  white:   'rgba(255,255,255,0.92)',
  muted:   'rgba(255,255,255,0.40)',
  border:  'rgba(255,255,255,0.07)',
  atColor: 'rgba(255,180,50,1)',
  ntColor: 'rgba(80,200,255,1)',
};

const THEME_COLORS = [
  'rgba(52,211,153,1)',
  'rgba(255,200,80,1)',
  'rgba(80,200,255,1)',
  'rgba(180,120,255,1)',
  'rgba(255,140,80,1)',
  'rgba(255,100,130,1)',
];

const QUIASMA_PALETA = [
  { label: 'rgba(255,200,80,1)',  bg: 'rgba(255,200,80,0.12)',  border: 'rgba(255,200,80,0.45)'  },
  { label: 'rgba(80,200,255,1)',  bg: 'rgba(80,200,255,0.10)',  border: 'rgba(80,200,255,0.40)'  },
  { label: 'rgba(180,120,255,1)', bg: 'rgba(180,120,255,0.10)', border: 'rgba(180,120,255,0.40)' },
  { label: 'rgba(100,220,160,1)', bg: 'rgba(100,220,160,0.10)', border: 'rgba(100,220,160,0.40)' },
  { label: 'rgba(255,140,80,1)',  bg: 'rgba(255,140,80,0.10)',  border: 'rgba(255,140,80,0.40)'  },
  { label: 'rgba(255,100,130,1)', bg: 'rgba(255,100,130,0.10)', border: 'rgba(255,100,130,0.40)' },
  { label: 'rgba(80,220,220,1)',  bg: 'rgba(80,220,220,0.10)',  border: 'rgba(80,220,220,0.40)'  },
];

interface BibleBook {
  nome: string;
  abrev: string;
  testamento: 'AT' | 'NT';
  slug: string;
  grupo: string;
}

const BIBLE_BOOKS: BibleBook[] = [
  { nome: 'Gênesis',       abrev: 'Gn',  testamento: 'AT', slug: 'genesis',      grupo: 'Pentateuco' },
  { nome: 'Êxodo',         abrev: 'Êx',  testamento: 'AT', slug: 'exodo',        grupo: 'Pentateuco' },
  { nome: 'Levítico',      abrev: 'Lv',  testamento: 'AT', slug: 'levitico',     grupo: 'Pentateuco' },
  { nome: 'Números',       abrev: 'Nm',  testamento: 'AT', slug: 'numeros',      grupo: 'Pentateuco' },
  { nome: 'Deuteronômio',  abrev: 'Dt',  testamento: 'AT', slug: 'deuteronomio', grupo: 'Pentateuco' },
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
  { nome: 'Jó',            abrev: 'Jó',  testamento: 'AT', slug: 'jo',           grupo: 'Poéticos' },
  { nome: 'Salmos',        abrev: 'Sl',  testamento: 'AT', slug: 'salmos',       grupo: 'Poéticos' },
  { nome: 'Provérbios',    abrev: 'Pv',  testamento: 'AT', slug: 'proverbios',   grupo: 'Poéticos' },
  { nome: 'Eclesiastes',   abrev: 'Ec',  testamento: 'AT', slug: 'eclesiastes',  grupo: 'Poéticos' },
  { nome: 'Cânticos',      abrev: 'Ct',  testamento: 'AT', slug: 'canticos',     grupo: 'Poéticos' },
  { nome: 'Isaías',        abrev: 'Is',  testamento: 'AT', slug: 'isaias',       grupo: 'Proféticos' },
  { nome: 'Jeremias',      abrev: 'Jr',  testamento: 'AT', slug: 'jeremias',     grupo: 'Proféticos' },
  { nome: 'Lamentações',   abrev: 'Lm',  testamento: 'AT', slug: 'lamentacoes',  grupo: 'Proféticos' },
  { nome: 'Ezequiel',      abrev: 'Ez',  testamento: 'AT', slug: 'ezequiel',     grupo: 'Proféticos' },
  { nome: 'Daniel',        abrev: 'Dn',  testamento: 'AT', slug: 'daniel',       grupo: 'Proféticos' },
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
  { nome: 'Mateus',        abrev: 'Mt',  testamento: 'NT', slug: 'mateus',       grupo: 'Evangelhos' },
  { nome: 'Marcos',        abrev: 'Mc',  testamento: 'NT', slug: 'marcos',       grupo: 'Evangelhos' },
  { nome: 'Lucas',         abrev: 'Lc',  testamento: 'NT', slug: 'lucas',        grupo: 'Evangelhos' },
  { nome: 'João',          abrev: 'Jo',  testamento: 'NT', slug: 'joao',         grupo: 'Evangelhos' },
  { nome: 'Atos',          abrev: 'At',  testamento: 'NT', slug: 'atos',         grupo: 'Atos' },
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

interface Pericope {
  idx: number;
  titulo: string;
  ref: string;
}

function livroPath(slug: string, testamento: 'AT' | 'NT') {
  return `/admin/${testamento}/${slug}`;
}

function extractTema(content: string | null): string {
  if (!content) return '';
  const m = content.match(/^TEMA:\s*(.+)$/m);
  return m ? m[1].trim() : '';
}

function extractBibleRef(content: string | null): string {
  if (!content) return '';
  const m = content.match(/^PARA A FAMÍLIA\s*·\s*(.+)$/m);
  return m ? m[1].trim() : '';
}

function extractBigIdeia(content: string | null): string {
  if (!content) return '';
  const m = content.match(/^BIG IDEA PARA A FAMÍLIA\s*\n([^\n]+)/m);
  return m ? m[1].trim().replace(/^"|"$/g, '') : '';
}

function extractSermonTitulo(content: string | null): string {
  if (!content) return '';
  const m = content.match(/^TÍTULO DO SERMÃO FAMILIAR\s*\n([^\n]+)/m);
  return m ? m[1].trim() : '';
}

function extractQuiasmaBloco(text: string, idx: number): string {
  const normalized = text.replace(/'|'|ʼ/g, "'");
  const markerRe = new RegExp(`^\\[0*${idx}\\]`);
  const anyMarkerRe = /^\[\d/;
  const sepRe = /^={5,}/;
  const lines = normalized.split(/\r?\n/);
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
function QuiasmaSection({ d, pericopeIdx, pt }: { d: DiaDevocional; pericopeIdx: number; pt: boolean }) {
  const [quiasma, setQuiasma] = useState('');
  const [status, setStatus] = useState<'loading' | 'ok' | 'none'>('loading');
  const book = BIBLE_BOOKS.find(b => b.abrev === d.livroAbrev);
  const isAT = d.testamento === 'AT';
  const cor = isAT ? C.atColor : C.ntColor;
  const corB = isAT ? 'rgba(255,200,80,0.35)' : 'rgba(80,200,255,0.35)';

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
    <div style={{ padding: 40, textAlign: 'center', color: C.muted, fontSize: 12 }}>{pt ? 'Carregando estrutura...' : 'Loading structure...'}</div>
  );

  if (status !== 'ok') return (
    <div style={{ padding: 32, textAlign: 'center', color: C.muted, fontSize: 13 }}>
      {pt ? 'Esta perícope ainda não possui estrutura quiástica cadastrada.' : 'This pericope does not yet have a chiastic structure registered.'}
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
          <div style={{ fontSize: 17, fontWeight: 900, color: cor, letterSpacing: '0.20em', textTransform: 'uppercase' }}>{pt ? 'Estrutura Quiástica' : 'Chiastic Structure'}</div>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{d.livro} — {pt ? 'Perícope' : 'Pericope'} {pericopeIdx}</div>
        </div>
      </div>
      <div style={{ background: 'rgba(5,7,26,0.85)', padding: '16px 14px' }}>
        {entries.map((entry, idx) => {
          if (entry.kind === 'spacer') return <div key={idx} style={{ height: 4 }} />;
          if (entry.kind === 'title') return (
            <div key={idx} style={{ fontSize: 'clamp(19px,3.2vw,23px)', fontWeight: 800, color: cor, lineHeight: 1.4, marginBottom: 12, marginTop: 4 }}>
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
              <div style={{ flexShrink: 0, minWidth: 'clamp(30px,4.5vw,38px)', textAlign: 'center', background: isCenter ? pal.bg : pal.bg.replace(/[\d.]+\)$/, '0.10)'), border: `1px solid ${isCenter ? pal.border : pal.border.replace(/[\d.]+\)$/, '0.35)')}`, borderRadius: 7, padding: 'clamp(5px,0.8vw,7px) clamp(6px,1vw,10px)', fontSize: 'clamp(17px,2.8vw,21px)', fontWeight: 900, color: pal.label, lineHeight: 1.3, boxShadow: isCenter ? `0 0 12px ${pal.bg}` : undefined, letterSpacing: '0.04em', alignSelf: 'flex-start' }}>
                {badgeLetter}
              </div>
              <div style={{ flex: 1, minWidth: 0, fontSize: 'clamp(17px,2.8vw,20px)', lineHeight: 1.65, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                {refPart && <span style={{ color: pal.label, opacity: 0.75, fontWeight: 600, fontSize: 'clamp(15px,2.2vw,17px)', marginRight: 6, whiteSpace: 'nowrap' }}>{refPart}</span>}
                <span style={{ color: isCenter ? pal.label : 'rgba(255,255,255,0.88)', fontWeight: isCenter ? 700 : 400 }}>
                  {desc.split(/(\[[^\]]+\])/).map((part, pi) =>
                    part.startsWith('[') && part.endsWith(']')
                      ? <span key={pi} style={{ whiteSpace: 'nowrap', unicodeBidi: 'isolate', direction: 'ltr', fontFamily: '"SBL Hebrew","Ezra SIL","Noto Serif Hebrew","Noto Sans Hebrew","Times New Roman",serif', fontSize: 'clamp(18px,3vw,22px)', fontWeight: 600, color: pal.label, letterSpacing: '0.04em', marginLeft: 4 }}>{part}</span>
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

// ─── Para a Família renderer ────────────────────────────────────────
function ParaFamiliaSection({ d, pericopeIdx, conteudo, pt }: { d: DiaDevocional; pericopeIdx: number; conteudo: string; pt: boolean }) {
  const isNovoFormato = conteudo.includes('MOVIMENTOS DO SERMÃO');

  interface Movimento { titulo: string; indicacao: string; exegese: string; teologia: string; aplicacao: string; isCenter: boolean; }
  interface AutorReformado { autor: string; obra: string; citacao: string; }

  let nTitulo = '', nBigIdeia = '', nPergunta = '', nPalavraChave = '', nEixoRedentor = '', nDoutrina = '', nConclusao = '', nDinamica = '';
  const nMovimentos: Movimento[] = [];
  const nAplicacoes: { label: string; texto: string }[] = [];
  const nAutores: AutorReformado[] = [];

  if (isNovoFormato) {
    type SecaoNova = 'none'|'titulo'|'bigideia'|'pergunta'|'palavrachave'|'movimentos'|'eixoredentor'|'doutrina'|'aplicacoes'|'dinamica'|'conclusao'|'autores';
    let secao: SecaoNova = 'none';
    let movAtual: Partial<Movimento> | null = null;
    let movField: 'indicacao'|'exegese'|'teologia'|'aplicacao'|null = null;
    for (const rawLine of conteudo.split('\n')) {
      const line = rawLine.trim();
      if (!line || line.startsWith('PARA A FAMÍLIA') || line.startsWith('PARA PREGAR')) continue;
      if (line === 'TÍTULO DO SERMÃO' || line === 'TÍTULO DO SERMÃO FAMILIAR') { secao = 'titulo'; continue; }
      if (line === 'BIG IDEA' || line === 'BIG IDEA PARA A FAMÍLIA') { secao = 'bigideia'; continue; }
      if (line === 'PERGUNTA DE TRANSIÇÃO' || line === 'PERGUNTA PARA A FAMÍLIA') { secao = 'pergunta'; continue; }
      if (line === 'PALAVRA-CHAVE DE TRANSIÇÃO' || line === 'PALAVRA-CHAVE') { secao = 'palavrachave'; continue; }
      if (line === 'MOVIMENTOS DO SERMÃO') { secao = 'movimentos'; continue; }
      if (line === 'EIXO REDENTOR' || line.startsWith('EIXO REDENTOR')) { if (movAtual) { nMovimentos.push(movAtual as Movimento); movAtual = null; } secao = 'eixoredentor'; continue; }
      if (line === 'DOUTRINA CENTRAL') { secao = 'doutrina'; continue; }
      if (line === 'APLICAÇÕES PASTORAIS' || line === 'APLICAÇÕES PARA A FAMÍLIA') { secao = 'aplicacoes'; continue; }
      if (line === 'DINÂMICA FAMILIAR' || line === 'DINÂMICA PARA A FAMÍLIA') { secao = 'dinamica'; continue; }
      if (line === 'AUTORES REFORMADOS') { secao = 'autores'; continue; }
      if (line === 'CONCLUSÃO') { secao = 'conclusao'; continue; }

      if (secao === 'titulo' && !nTitulo) { nTitulo = line; continue; }
      if (secao === 'bigideia' && !nBigIdeia) { nBigIdeia = line.replace(/^"|"$/g, ''); continue; }
      if (secao === 'pergunta' && !nPergunta) { nPergunta = line; continue; }
      if (secao === 'palavrachave') { nPalavraChave += (nPalavraChave ? ' ' : '') + line; continue; }
      if (secao === 'eixoredentor') { nEixoRedentor += (nEixoRedentor ? ' ' : '') + line; continue; }
      if (secao === 'doutrina') { nDoutrina += (nDoutrina ? ' ' : '') + line; continue; }
      if (secao === 'dinamica') { nDinamica += (nDinamica ? '\n' : '') + line; continue; }
      if (secao === 'conclusao') { nConclusao += (nConclusao ? '\n' : '') + line; continue; }
      if (secao === 'aplicacoes') {
        const m = line.match(/^[▸►]\s*([^:]+):\s*(.*)/);
        if (m) nAplicacoes.push({ label: m[1].trim(), texto: m[2] });
        else if (nAplicacoes.length) nAplicacoes[nAplicacoes.length-1].texto += ' ' + line;
        continue;
      }
      if (secao === 'autores') {
        const m = line.match(/^▸\s*(.+?)\s*\(([^)]+)\):\s*"(.+)"$/);
        if (m) nAutores.push({ autor: m[1].trim(), obra: m[2].trim(), citacao: m[3].trim() });
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
        if (line.startsWith('§ Aplicação') || line.startsWith('§ Aplicacao')) { movField = 'aplicacao'; if (movAtual) movAtual.aplicacao = line.replace(/^§\s*Aplicação[^:]*:\s*/i,'').replace(/^§\s*Aplicacao[^:]*:\s*/i,''); continue; }
        if (movAtual && movField) { (movAtual as Record<string, string>)[movField] += ' ' + line; }
      }
    }
    if (movAtual) nMovimentos.push(movAtual as Movimento);
  }

  const pv = 'clamp(18px,4.5vw,28px)';
  const ph = 'clamp(20px,5vw,32px)';
  const tagStyle = (cor: string): React.CSSProperties => ({ fontSize: 16, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: cor, marginBottom: 10 });
  const MOV_CORES = ['rgba(52,211,153,1)','rgba(80,200,255,1)','rgba(180,120,255,1)','rgba(255,200,80,1)','rgba(255,140,80,1)','rgba(255,100,160,1)'];

  void d; void pericopeIdx;

  if (isNovoFormato) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Cabeçalho */}
        <div style={{ borderRadius: 16, padding: `${pv} ${ph}`, background: 'linear-gradient(135deg, rgba(12,40,28,0.97) 0%, rgba(10,32,28,0.97) 100%)', border: '1px solid rgba(52,211,153,0.30)', boxShadow: '0 8px 32px rgba(0,0,0,0.45)' }}>
          <div style={tagStyle('rgba(52,211,153,0.55)')}>{pt ? 'Para a Família · Homilética Familiar Expositiva' : 'For the Family · Expository Family Homiletics'}</div>
          {nTitulo && <div style={{ fontSize: 'clamp(28px,5vw,40px)', fontWeight: 900, lineHeight: 1.25, background: 'linear-gradient(135deg, rgba(167,243,208,1) 0%, rgba(110,231,183,1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 16 }}>{nTitulo}</div>}
          {nBigIdeia && <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)', marginBottom: 12 }}>
            <div style={tagStyle('rgba(52,211,153,0.60)')}>{pt ? 'Big Idea' : 'Big Idea'}</div>
            <div style={{ fontSize: 'clamp(22px,4vw,30px)', color: 'rgba(167,243,208,0.97)', fontWeight: 700, fontStyle: 'italic', lineHeight: 1.5 }}>"{nBigIdeia}"</div>
          </div>}
          {nPergunta && <div style={{ padding: '12px 16px', borderRadius: 10, background: 'linear-gradient(135deg, rgba(52,211,153,0.08) 0%, rgba(16,185,129,0.06) 100%)', border: '1px solid rgba(52,211,153,0.25)', borderLeft: '4px solid rgba(52,211,153,0.80)', marginBottom: 12 }}>
            <div style={tagStyle('rgba(110,231,183,0.65)')}>{pt ? 'Pergunta de Transição' : 'Transition Question'}</div>
            <div style={{ fontSize: 'clamp(20px,3.6vw,26px)', color: 'rgba(167,243,208,0.95)', fontWeight: 600, fontStyle: 'italic', lineHeight: 1.6 }}>{nPergunta}</div>
          </div>}
          {nPalavraChave && (() => {
            // Detecta palavra(s) em CAPS (3+ letras) e destaca
            const parts = nPalavraChave.split(/\b([A-ZÁÉÍÓÚÀÃÕÂÊÎÔÛÇ]{3,})\b/);
            return (
              <div style={{ fontSize: 'clamp(18px,3.2vw,23px)', color: 'rgba(167,243,208,0.82)', lineHeight: 1.8, fontStyle: 'italic', padding: '12px 16px', borderRadius: 10, background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.18)' }}>
                {parts.map((part, pi) => {
                  if (pi % 2 === 1) return (
                    <span key={pi} style={{ fontStyle: 'normal', fontWeight: 900, letterSpacing: '0.10em', fontSize: 'clamp(20px,3.6vw,26px)', color: 'rgba(52,211,153,1)', background: 'rgba(52,211,153,0.14)', border: '1px solid rgba(52,211,153,0.40)', borderRadius: 6, padding: '1px 8px', margin: '0 3px', display: 'inline-block', lineHeight: 1.4 }}>{part}</span>
                  );
                  return <span key={pi}>{part}</span>;
                })}
              </div>
            );
          })()}
        </div>

        {/* Movimentos */}
        {nMovimentos.length > 0 && <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={tagStyle('rgba(110,231,183,0.60)')}>{pt ? 'Movimentos do Sermão' : 'Sermon Movements'}</div>
          {nMovimentos.map((mv, i) => {
            const cor = MOV_CORES[i % MOV_CORES.length];
            const corB = cor.replace('1)', '0.25)');
            const corBg = cor.replace('1)', '0.07)');
            return (
              <div key={i} style={{ borderRadius: 14, overflow: 'hidden', border: `1px solid ${corB}`, background: `linear-gradient(135deg, ${corBg} 0%, rgba(5,7,26,0.95) 100%)` }}>
                <div style={{ height: 4, background: `linear-gradient(90deg, ${cor} 0%, ${cor.replace('1)','0.3)')} 70%, transparent 100%)` }} />
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ fontSize: 'clamp(20px,3.6vw,26px)', fontWeight: 800, color: cor, lineHeight: 1.4, marginBottom: 10 }}>{mv.titulo}</div>
                  {mv.indicacao && (() => {
                    const verseRef = mv.indicacao.split('(')[0].trim();
                    return verseRef ? (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 14, padding: '5px 14px', borderRadius: 20, background: cor.replace('1)', '0.10)'), border: `1px solid ${cor.replace('1)', '0.35)')}` }}>
                        <span style={{ fontSize: 16, fontWeight: 900, color: cor }}>§</span>
                        <span style={{ fontSize: 18, fontWeight: 800, color: cor, letterSpacing: '0.06em' }}>{verseRef}</span>
                      </div>
                    ) : null;
                  })()}
                  {[
                    { label: pt ? 'Indicação Textual' : 'Textual Indication', text: mv.indicacao, cor: 'rgba(255,220,120,0.80)' },
                    { label: pt ? 'Exegese' : 'Exegesis', text: mv.exegese, cor: 'rgba(180,230,255,0.80)' },
                    { label: pt ? 'Teologia Reformada' : 'Reformed Theology', text: mv.teologia, cor: 'rgba(200,170,255,0.80)' },
                    { label: pt ? 'Aplicação Familiar' : 'Family Application', text: mv.aplicacao, cor: 'rgba(52,211,153,0.90)' },
                  ].filter(f => f.text).map((f, fi) => (
                    <div key={fi} style={{ marginBottom: fi < 3 ? 14 : 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: f.cor, marginBottom: 6 }}>{f.label}</div>
                      <div style={{ fontSize: 'clamp(18px,3.2vw,22px)', color: fi === 3 ? 'rgba(110,231,183,0.95)' : 'rgba(215,225,245,0.90)', lineHeight: 1.8, fontStyle: fi === 3 ? 'italic' : 'normal' }}>{f.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>}

        {/* Eixo Redentor */}
        {nEixoRedentor && <div style={{ borderRadius: 12, padding: '16px 20px', background: 'rgba(255,140,80,0.07)', border: '1px solid rgba(255,140,80,0.25)', borderLeft: '4px solid rgba(255,140,80,0.80)' }}>
          <div style={tagStyle('rgba(255,180,100,0.80)')}>{pt ? 'Eixo Redentor · Perspectiva Histórico-Redentiva' : 'Redemptive Axis · Redemptive-Historical Perspective'}</div>
          <div style={{ fontSize: 'clamp(18px,3.2vw,22px)', color: 'rgba(255,225,185,0.93)', lineHeight: 1.8 }}>{nEixoRedentor}</div>
        </div>}

        {/* Doutrina Central */}
        {nDoutrina && <div style={{ borderRadius: 12, padding: '14px 20px', background: 'rgba(80,200,255,0.06)', border: '1px solid rgba(80,200,255,0.22)' }}>
          <div style={tagStyle('rgba(147,197,253,0.75)')}>{pt ? 'Doutrina Central' : 'Central Doctrine'}</div>
          <div style={{ fontSize: 'clamp(20px,3.5vw,25px)', color: 'rgba(205,232,255,0.93)', fontWeight: 600, lineHeight: 1.7 }}>{nDoutrina}</div>
        </div>}

        {/* Aplicações */}
        {nAplicacoes.length > 0 && <div style={{ borderRadius: 12, padding: '14px 20px', background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.22)' }}>
          <div style={tagStyle('rgba(52,211,153,0.75)')}>{pt ? 'Aplicações para a Família' : 'Family Applications'}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {nAplicacoes.map((ap, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, fontSize: 16, fontWeight: 900, color: 'rgba(52,211,153,0.80)', paddingTop: 2, minWidth: 120 }}>{ap.label}</div>
                <div style={{ fontSize: 'clamp(18px,3.2vw,22px)', color: 'rgba(167,243,208,0.92)', lineHeight: 1.8 }}>{ap.texto}</div>
              </div>
            ))}
          </div>
        </div>}

        {/* Dinâmica Familiar */}
        {nDinamica && <div style={{ borderRadius: 12, padding: '16px 20px', background: 'linear-gradient(135deg, rgba(52,211,153,0.10) 0%, rgba(16,185,129,0.06) 100%)', border: '2px solid rgba(52,211,153,0.35)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, rgba(52,211,153,1) 0%, rgba(16,185,129,0.5) 70%, transparent 100%)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={tagStyle('rgba(52,211,153,0.85)')}>{pt ? 'Dinâmica Familiar' : 'Family Activity'}</div>
          </div>
          <div style={{ fontSize: 'clamp(18px,3.2vw,22px)', color: 'rgba(167,243,208,0.95)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{nDinamica}</div>
        </div>}

        {/* Autores Reformados */}
        {nAutores.length > 0 && <div style={{ borderRadius: 12, padding: '16px 20px', background: 'rgba(180,120,255,0.06)', border: '1px solid rgba(180,120,255,0.22)' }}>
          <div style={tagStyle('rgba(200,160,255,0.75)')}>{pt ? 'Autores Reformados' : 'Reformed Authors'}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {nAutores.map((a, i) => (
              <div key={i} style={{ borderLeft: '3px solid rgba(52,211,153,0.60)', paddingLeft: 14 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'rgba(200,160,255,0.90)', marginBottom: 6 }}>
                  {a.autor}
                  {a.obra && <span style={{ fontWeight: 500, color: 'rgba(200,160,255,0.55)', marginLeft: 6 }}>· {a.obra}</span>}
                </div>
                <div style={{ fontSize: 'clamp(18px,3.2vw,21px)', color: 'rgba(215,225,245,0.88)', lineHeight: 1.8, fontStyle: 'italic' }}>
                  "{a.citacao}"
                </div>
              </div>
            ))}
          </div>
        </div>}

        {/* Conclusão */}
        {nConclusao && <div style={{ borderRadius: 12, padding: '16px 20px', background: 'linear-gradient(135deg, rgba(52,211,153,0.08) 0%, rgba(16,185,129,0.05) 100%)', border: '1px solid rgba(52,211,153,0.22)' }}>
          <div style={tagStyle('rgba(110,231,183,0.75)')}>{pt ? 'Conclusão' : 'Conclusion'}</div>
          <div style={{ fontSize: 'clamp(18px,3.2vw,22px)', color: 'rgba(167,243,208,0.92)', lineHeight: 1.9 }}>{nConclusao}</div>
        </div>}
      </div>
    );
  }

  // Formato não reconhecido
  return (
    <div style={{ padding: 24, color: C.muted, fontSize: 14, lineHeight: 1.8 }}>
      {conteudo}
    </div>
  );
}

// ─── Themed Pericope Card ────────────────────────────────────────────
function PericopeCard({
  p,
  cardIdx,
  active,
  conteudo,
  hasQuiasma,
  hasInfografico,
  hasAconselhamento,
  onClick,
  pt,
}: {
  p: Pericope;
  cardIdx: number;
  active: boolean;
  conteudo: string | null;
  hasQuiasma: boolean;
  hasInfografico: boolean;
  hasAconselhamento: boolean;
  onClick: () => void;
  pt: boolean;
}) {
  const accentColor = THEME_COLORS[cardIdx % THEME_COLORS.length];
  const accentAlpha = (a: number) => accentColor.replace('1)', `${a})`);
  const tema = extractTema(conteudo);
  const hasTema = tema.length > 0;
  const bibleRef = extractBibleRef(conteudo);
  const bigIdeia = extractBigIdeia(conteudo);
  const sermonTitulo = extractSermonTitulo(conteudo);

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: active ? 1.02 : 1.03 }}
      whileTap={{ scale: 0.98 }}
      style={{
        cursor: 'pointer',
        borderRadius: 18,
        overflow: 'hidden',
        border: `1px solid ${active ? accentAlpha(0.55) : accentAlpha(0.18)}`,
        background: active
          ? `linear-gradient(145deg, ${accentAlpha(0.18)} 0%, rgba(5,7,26,0.97) 100%)`
          : `linear-gradient(145deg, ${accentAlpha(0.07)} 0%, rgba(5,7,26,0.92) 100%)`,
        boxShadow: active
          ? `0 0 36px ${accentAlpha(0.30)}, 0 8px 28px rgba(0,0,0,0.60), inset 0 1px 0 ${accentAlpha(0.18)}`
          : `0 2px 16px rgba(0,0,0,0.35), inset 0 1px 0 ${accentAlpha(0.07)}`,
        transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
        position: 'relative',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 5,
        background: `linear-gradient(90deg, ${accentColor} 0%, ${accentAlpha(0.45)} 65%, transparent 100%)`,
      }} />

      {/* Pericope number badge — top right */}
      <div style={{
        position: 'absolute',
        top: 12,
        right: 12,
        padding: '6px 13px',
        borderRadius: 10,
        background: accentAlpha(0.18),
        border: `1.5px solid ${accentAlpha(0.55)}`,
        fontSize: 22,
        fontWeight: 900,
        color: accentColor,
        letterSpacing: '0.08em',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {String(p.idx).padStart(2, '0')}
      </div>

      <div style={{ padding: '14px 18px 18px' }}>
        {/* Bible ref badge + pericope title row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, paddingRight: 64, flexWrap: 'wrap' }}>
          {bibleRef && (
            <span style={{ fontSize: 'clamp(11px,1.5vw,13px)', fontWeight: 800, padding: '3px 10px', borderRadius: 7, background: accentAlpha(0.14), border: `1px solid ${accentAlpha(0.45)}`, color: accentColor, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
              {bibleRef}
            </span>
          )}
          <span style={{ fontSize: 'clamp(10px,1.4vw,12px)', fontWeight: 700, color: accentAlpha(0.65), letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
            {p.titulo}
          </span>
        </div>

        {/* TEMA — most prominent */}
        {hasTema ? (
          <div style={{ fontSize: 'clamp(15px,2.6vw,18px)', fontWeight: 900, color: accentColor, lineHeight: 1.3, marginBottom: sermonTitulo ? 6 : 10 }}>
            {tema}
          </div>
        ) : (
          <div style={{ fontSize: 'clamp(13px,2.2vw,15px)', fontWeight: 600, color: C.muted, lineHeight: 1.4, marginBottom: 10, fontStyle: 'italic' }}>
            {pt ? 'Em breve...' : 'Coming soon...'}
          </div>
        )}

        {/* Sermon title */}
        {sermonTitulo && (
          <div style={{ fontSize: 'clamp(13px,2vw,15px)', fontWeight: 700, color: 'rgba(255,255,255,0.85)', lineHeight: 1.45, marginBottom: 10, fontStyle: 'italic', borderLeft: `3px solid ${accentAlpha(0.50)}`, paddingLeft: 10 }}>
            "{sermonTitulo}"
          </div>
        )}

        {/* Big Idea */}
        {bigIdeia && (
          <div style={{ padding: '8px 12px', borderRadius: 9, background: accentAlpha(0.07), border: `1px solid ${accentAlpha(0.22)}`, marginBottom: 10 }}>
            <div style={{ fontSize: 'clamp(9px,1.2vw,11px)', fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: accentAlpha(0.70), marginBottom: 4 }}>💡 {pt ? 'Big Idea' : 'Big Idea'}</div>
            <div style={{ fontSize: 'clamp(12px,1.7vw,14px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.55, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
              {bigIdeia}
            </div>
          </div>
        )}

        {/* Tab availability pills */}
        {(() => {
          const tabs = [
            { key: 'F', label: pt ? 'Esboço Familiar' : 'Family Outline', ok: !!conteudo },
            { key: 'Q', label: pt ? 'Quiástica' : 'Chiastic',             ok: hasQuiasma },
            ...(hasInfografico      ? [{ key: 'I', label: 'Infográfico',        ok: true }] : []),
            ...(hasAconselhamento   ? [{ key: 'A', label: 'Aconselhamento',     ok: true }] : []),
          ];
          return (
            <div style={{ display: 'flex', gap: 4, marginTop: 10, flexWrap: 'wrap' }}>
              {tabs.map(t => (
                <span
                  key={t.key}
                  title={`${t.label}: ${t.ok ? (pt ? 'disponível' : 'available') : (pt ? 'não disponível' : 'not available')}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 3,
                    padding: '2px 6px', borderRadius: 4,
                    fontSize: 9, fontWeight: 900, letterSpacing: '0.06em',
                    background: t.ok ? 'rgba(100,220,130,0.15)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${t.ok ? 'rgba(100,220,130,0.40)' : 'rgba(255,255,255,0.10)'}`,
                    color: t.ok ? 'rgba(130,240,160,0.90)' : 'rgba(255,255,255,0.25)',
                  }}
                >
                  <span style={{
                    width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                    background: t.ok ? 'rgba(100,220,130,1)' : 'rgba(255,255,255,0.20)',
                    boxShadow: t.ok ? '0 0 4px rgba(100,220,130,0.8)' : 'none',
                  }} />
                  {t.key}
                </span>
              ))}
            </div>
          );
        })()}

        {/* Active indicator */}
        {active && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor, boxShadow: `0 0 10px ${accentColor}` }} />
            <span style={{ fontSize: 'clamp(9px,1.2vw,11px)', fontWeight: 700, color: accentAlpha(0.75), letterSpacing: '0.10em', textTransform: 'uppercase' }}>{pt ? 'Selecionada' : 'Selected'}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Noivos — aulas ──────────────────────────────────────────────────
const GOLD = 'rgba(255,200,80,1)';
const GOLD_B = 'rgba(255,200,80,0.15)';
const GOLD_BD = 'rgba(255,200,80,0.44)';

const AULAS_NOIVOS = [
  {
    num: 1,
    titulo: 'Aula Inaugural',
    subtitulo: 'O que é o Casamento? A Perspectiva Bíblica e Reformada',
    desc: 'Fundamentos: definição bíblica do casamento, sua origem em Deus, seu caráter de aliança e seu propósito redentor — à luz de Gênesis 2, Efésios 5 e da Confissão de Fé de Westminster.',
    refs: 'Gn 2:18–25 · Ef 5:22–33 · CFW XXIV',
    available: true,
  },
  {
    num: 2,
    titulo: 'Aula 2',
    subtitulo: 'Princípios Bíblicos de Comunicação',
    desc: 'Os cinco níveis de comunicação, o nível de ruptura e sete princípios bíblicos que transformam a fala conjugal — da urgência estatística à restauração pelo Evangelho.',
    refs: 'Ef 4:15,25–32 · Tg 1:19 · Pv 10:19 · 18:13 · Gl 6:1',
    available: true,
  },
  {
    num: 3,
    titulo: 'Aula 3',
    subtitulo: 'Liderança e Submissão: Complementaridade sem Hierarquia Opressiva',
    desc: 'O modelo bíblico de liderança servant-leadership e a submissão voluntária como reflexo da relação Cristo-Igreja — contra o igualitarismo e o patriarcalismo abusivo.',
    refs: 'Ef 5:22–33 · 1Pe 3:1–7 · Cl 3:18–19',
    available: false,
  },
  {
    num: 4,
    titulo: 'Aula 4',
    subtitulo: 'Comunicação, Conflito e Reconciliação',
    desc: 'Padrões de comunicação destrutivos e construtivos. Como o evangelho transforma o conflito conjugal em oportunidade de graça e crescimento mútuo.',
    refs: 'Ef 4:26–32 · Tg 1:19–20 · Mt 18:15–17',
    available: false,
  },
  {
    num: 5,
    titulo: 'Aula 5',
    subtitulo: 'Sexualidade no Casamento: Dom, Santidade e Propósito',
    desc: 'A sexualidade como criação boa de Deus, seu lugar exclusivo no casamento, a teologia do corpo e a santificação da intimidade conjugal.',
    refs: 'Gn 1:27–28 · Ct 1–8 · 1Co 7:1–5 · CFW XXIV.2',
    available: false,
  },
  {
    num: 6,
    titulo: 'Aula 6',
    subtitulo: 'Finanças, Mordomia e Vocação',
    desc: 'O dinheiro como ferramenta de missão, não de identidade. Princípios bíblicos de mordomia, orçamento conjugal e vocação como serviço ao reino.',
    refs: 'Pv 31:10–31 · Lc 16:10–13 · 2Co 9:6–8',
    available: false,
  },
  {
    num: 7,
    titulo: 'Aula 7',
    subtitulo: 'A Família como Igreja Doméstica',
    desc: 'O lar como espaço de adoração, catequese e missão. O culto familiar, a educação dos filhos na fé e o testemunho da família no bairro e na comunidade.',
    refs: 'Dt 6:4–9 · Ef 6:1–4 · At 2:46 · CFW XXV',
    available: false,
  },
  {
    num: 8,
    titulo: 'Aula 8',
    subtitulo: 'Casamento, Sofrimento e Perseverança',
    desc: 'Como o evangelho sustenta o casamento nas estações de dor — perda, doença, infertilidade, crise — e o que significa perseverar com graça e esperança escatológica.',
    refs: 'Rm 8:18–28 · 2Co 4:16–18 · Jó 2:9–10',
    available: false,
  },
];

function AulaCard({ aula, cor, onOpen, pt }: { aula: typeof AULAS_NOIVOS[0]; cor: string; onOpen: () => void; pt: boolean }) {
  const available = aula.available;
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: aula.num * 0.06 }}
      onClick={() => available && onOpen()}
      style={{
        position: 'relative',
        borderRadius: 16,
        background: available ? GOLD_B : 'rgba(255,255,255,0.03)',
        border: `1.5px solid ${available ? GOLD_BD : 'rgba(255,255,255,0.08)'}`,
        padding: '22px 22px 20px',
        cursor: available ? 'pointer' : 'default',
        opacity: available ? 1 : 0.48,
        overflow: 'hidden',
      }}
      whileHover={available ? { scale: 1.02, boxShadow: `0 6px 32px ${GOLD_BD}` } : {}}
      whileTap={available ? { scale: 0.97 } : {}}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${GOLD} 0%,transparent 100%)`, borderRadius: '16px 16px 0 0', opacity: available ? 1 : 0.25 }} />

      {!available && (
        <div style={{ position: 'absolute', top: 12, right: 12, fontSize: 9, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 5, padding: '3px 7px' }}>
          {pt ? 'Em breve' : 'Coming soon'}
        </div>
      )}

      {/* Número */}
      <div style={{ fontSize: 28, fontWeight: 900, color: available ? GOLD : 'rgba(255,255,255,0.20)', letterSpacing: '0.04em', lineHeight: 1, marginBottom: 12, fontVariantNumeric: 'tabular-nums' }}>
        {String(aula.num).padStart(2, '0')}
      </div>

      <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 800, color: available ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.35)', lineHeight: 1.3, marginBottom: 6 }}>
        {aula.subtitulo}
      </div>

      <p style={{ fontSize: 'clamp(11px,1.5vw,12.5px)', color: 'rgba(255,255,255,0.42)', lineHeight: 1.65, margin: '0 0 12px' }}>
        {aula.desc}
      </p>

      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', color: available ? 'rgba(255,200,80,0.65)' : 'rgba(255,255,255,0.20)', fontStyle: 'italic' }}>
        {aula.refs}
      </div>

      {available && (
        <div style={{ marginTop: 16, fontSize: 11, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD }}>
          {pt ? 'Abrir aula →' : 'Open lesson →'}
        </div>
      )}
    </motion.div>
  );
}

export function NoivosHub() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'pt'|'en'>('pt');
  const pt = lang === 'pt';
  const onBack = () => navigate('/familia');
  const onAula = (num: number) => {
    if (num === 1) navigate('/familia/noivos/aula-inaugural');
    if (num === 2) navigate('/familia/noivos/aula-02');
  };
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.white }}>
      <Navbar lang={lang} />
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: 'clamp(90px,11vw,110px) clamp(16px,4vw,32px) 80px' }}>

        {/* Voltar */}
        <div style={{ marginBottom: 32 }}>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,200,80,0.70)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            {pt ? '← Voltar' : '← Back'}
          </button>
        </div>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: 44 }}>
          <div style={{ fontSize: 'clamp(10px,1.4vw,12px)', fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', marginBottom: 12, background: `linear-gradient(90deg,${GOLD},rgba(255,230,140,1))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {pt ? 'Curso Pré-Matrimonial Reformado' : 'Reformed Pre-Marital Course'}
          </div>
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 16px', background: `linear-gradient(135deg,rgba(255,255,255,0.95) 0%,${GOLD} 60%,rgba(255,230,140,0.75) 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {pt ? 'Preparatório para Noivos' : 'Pre-Wedding Preparation'}
          </h1>
          <p style={{ fontSize: 'clamp(13px,1.8vw,16px)', color: 'rgba(255,255,255,0.50)', maxWidth: 620, lineHeight: 1.75 }}>
            {pt ? 'Oito aulas expositivas com fundamento nas Escrituras, na Confissão de Fé de Westminster e nos autores reformados — para construir o casamento sobre a Rocha.' : 'Eight expository lessons grounded in Scripture, the Westminster Confession of Faith, and Reformed authors — to build marriage on the Rock.'}
          </p>
        </motion.div>

        {/* Grid de aulas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 18 }}>
          {AULAS_NOIVOS.map(aula => (
            <AulaCard key={aula.num} aula={aula} cor={GOLD} onOpen={() => onAula(aula.num)} pt={pt} />
          ))}
        </div>
      </div>
      <FlagToggle lang={lang} setLang={setLang} />
    </div>
  );
}

// ─── Aula Inaugural — conteúdo ───────────────────────────────────────
const ENCONTROS_TABLE = [
  { num: 1, quando: 'Ago (presencial)',     tema: 'A Aliança como Fundamento',                          pergunta: 'De onde vem o casamento — e por que é mais que um sentimento?',                     mandato: 'Espiritual' },
  { num: 2, quando: 'Ago/Set (híbrido)',    tema: 'Os Mediadores: Identidade, Comunicação e Expectativas', pergunta: 'Quem somos como casal, e como vamos falar e ouvir um ao outro?',              mandato: 'Espiritual' },
  { num: 3, quando: 'Set (híbrido)',        tema: 'Vida Espiritual e Resolução de Conflitos',           pergunta: 'Como vamos buscar a Deus juntos e lidar com nossas diferenças?',                   mandato: 'Espiritual' },
  { num: 4, quando: 'Out (presencial)',     tema: 'Sexualidade e Intimidade Conjugal',                  pergunta: 'O que Deus ensina sobre a intimidade no casamento?',                               mandato: 'Espiritual' },
  { num: 5, quando: 'Out/Nov (híbrido)',    tema: 'Família de Origem e Sogros',                         pergunta: 'Como formar nosso lar sem romper a honra aos pais?',                               mandato: 'Social' },
  { num: 6, quando: 'Nov (híbrido)',        tema: 'Filhos e a Casa que Vamos Construir',                pergunta: 'Que tipo de lar e de descendência queremos gerar?',                                mandato: 'Social' },
  { num: 7, quando: 'Nov/Dez (híbrido)',    tema: 'Vocação, Trabalho e Finanças',                       pergunta: 'Como vamos administrar dinheiro e influenciar o mundo lá fora?',                   mandato: 'Cultural' },
  { num: 8, quando: 'Dez (presencial)',     tema: 'Consolidação e Celebração',                          pergunta: 'O que aprendemos, e a que estamos nos comprometendo?',                             mandato: 'Síntese' },
];

const MANDATO_COR: Record<string, string> = {
  Espiritual: 'rgba(52,211,153,1)',
  Social:     'rgba(80,200,255,1)',
  Cultural:   'rgba(180,120,255,1)',
  Síntese:    GOLD,
};

function Bloco({ titulo, children, delay = 0 }: { titulo: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay }}
      style={{ borderRadius: 14, background: 'rgba(255,200,80,0.055)', border: '1px solid rgba(255,200,80,0.17)', borderLeft: `3px solid ${GOLD}`, padding: '20px 22px' }}
    >
      <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: GOLD, marginBottom: 14 }}>{titulo}</div>
      {children}
    </motion.div>
  );
}

function Txt({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 'clamp(15px,2.2vw,18px)', color: 'rgba(255,255,255,0.88)', lineHeight: 1.90, whiteSpace: 'pre-line' }}>{children}</div>;
}

function Verso({ ref: r, texto }: { ref: string; texto: string }) {
  return (
    <div style={{ margin: '12px 0', padding: '14px 18px', borderRadius: 10, background: 'rgba(255,200,80,0.10)', border: '1px solid rgba(255,200,80,0.28)' }}>
      <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.18em', color: GOLD, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>{r}</span>
      <span style={{ fontSize: 'clamp(15px,2.1vw,17px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.78, fontStyle: 'italic' }}>{texto}</span>
    </div>
  );
}

function Pergunta({ n, texto }: { n: number; texto: string }) {
  return (
    <div style={{ display: 'flex', gap: 14, marginBottom: 20, padding: '14px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <span style={{ fontSize: 17, fontWeight: 900, color: GOLD, minWidth: 26, lineHeight: 1.7 }}>{n}.</span>
      <div style={{ fontSize: 'clamp(15px,2.1vw,17px)', color: 'rgba(255,255,255,0.84)', lineHeight: 1.82 }}>{texto}</div>
    </div>
  );
}

// ─── Diagrama Van Groningen — Reino · Pacto · Mediadores ─────────────
const SPIRIT = 'rgba(52,211,153,1)';
const SOCIAL  = 'rgba(80,200,255,1)';
const CULT    = 'rgba(180,120,255,1)';

const MANDATOS_DEF = [
  {
    id: 'espiritual',
    color: SPIRIT,
    icon: '✝',
    titulo: 'Mandato Espiritual',
    keywords: 'Comunhão · Aliança · Adoração · Oração',
    verso: 'Gênesis 1.26',
    textoVerso: '"Façamos o homem à nossa imagem, conforme a nossa semelhança."',
    definicao: 'A humanidade foi criada à imagem da Trindade (imago Dei) para viver em comunhão com Deus. O Mandato Espiritual é a vocação de adorar, obedecer e refletir o caráter de Deus em toda a existência. Para o casal, significa que a relação conjugal nasce da comunhão trinitária e deve ser sustentada por ela: oração conjunta, leitura da Palavra, culto familiar e submissão ao senhorio de Cristo são expressões concretas deste mandato.',
    vanGroningen: 'Van Groningen ensina que o Reino de Deus (mlkût YHWH) é o horizonte dentro do qual todos os mandatos operam. O mandato espiritual é o fundamento: sem adoração verdadeira, os mandatos social e cultural tornam-se projetos autônomos — Babel revisitada. É o Espírito Santo quem capacita o casal a viver este mandato (Ez 36.26-27; Rm 5.5).',
    referencias: [
      'VAN GRONINGEN, Gerard. Messianic Revelation in the Old Testament. Grand Rapids: Baker Book House, 1990. p. 55-89.',
      'VOS, Geerhardus. Teologia Bíblica: Antigo e Novo Testamento. São Paulo: Cultura Cristã, 2010. p. 27-43.',
      'BAVINCK, Herman. Reformed Dogmatics. Grand Rapids: Baker Academic, 2004. v. 2, p. 530-561.',
    ],
  },
  {
    id: 'social',
    color: SOCIAL,
    icon: '🏠',
    titulo: 'Mandato Social',
    keywords: 'Família · Filhos · Casa · Semente Santa · Geração',
    verso: 'Gênesis 1.28a',
    textoVerso: '"Sede fecundos, multiplicai-vos e enchei a terra."',
    definicao: 'O Mandato Social é a vocação de construir relações ordenadas por Deus: o casamento (Gn 2.24), a família, a geração de filhos e a formação de comunidades humanas que reflitam a ordem criacional. Para o casal, este mandato inclui a responsabilidade de gerar uma "semente santa" (Ml 2.15) — filhos criados no temor do Senhor — e de edificar um lar que seja uma "pequena igreja" (ecclesiola), espaço de adoração, catequese e hospitalidade.',
    vanGroningen: 'Para Van Groningen, o mandato social flui diretamente da estrutura pactual: Deus não apenas governa indivíduos, mas famílias e nações. A aliança abraâmica (Gn 17.7) é feita "com vocês e com a vossa descendência" — a família é a unidade fundamental do pacto. O casamento cristão é, por isso, um ato político-redentor: ao formar um lar pactual, o casal estende o governo de Deus à próxima geração.',
    referencias: [
      'VAN GRONINGEN, Gerard. Messianic Revelation in the Old Testament. Grand Rapids: Baker Book House, 1990. p. 117-145.',
      'KLINE, Meredith G. Kingdom Prologue: Genesis Foundations for a Covenantal Worldview. Eugene: Wipf & Stock, 2006. p. 62-78.',
      'BERKHOF, Louis. Teologia Sistemática. São Paulo: Cultura Cristã, 2014. p. 297-315.',
    ],
  },
  {
    id: 'cultural',
    color: CULT,
    icon: '🌍',
    titulo: 'Mandato Cultural',
    keywords: 'Trabalho · Arte · Cidade · Ciência · Missão · Domínio',
    verso: 'Gênesis 1.28b',
    textoVerso: '"Sujeitai a terra e dominai sobre... todo ser vivente."',
    definicao: 'O Mandato Cultural (também chamado mandato criacional ou mandato de domínio) é a vocação de desenvolver o potencial implantado por Deus na criação: trabalho, ciência, arte, tecnologia, política e missão. Para o casal, este mandato significa que a vida conjugal e familiar não é um fim em si mesma, mas plataforma para influência no mundo — no bairro, na cidade, na cultura. O casamento cristão existe para o reino, não apenas para a felicidade dos dois.',
    vanGroningen: 'Van Groningen conecta o mandato cultural à missão do Messias: o que Adão falhou em fazer — dominar redentoramente a criação — Cristo realiza como o segundo Adão (1Co 15.45-49). O casal cristão participa dessa missão restauradora: cada obra humana feita à glória de Deus é antecipação da nova criação (Ap 21.24-26). A Grande Comissão (Mt 28.18-20) é a forma escatológica do mandato cultural: "fazei discípulos de todas as nações."',
    referencias: [
      'VAN GRONINGEN, Gerard. Messianic Revelation in the Old Testament. Grand Rapids: Baker Book House, 1990. p. 201-238.',
      'KUYPER, Abraham. Calvinismo: Palestras Proferidas na Universidade de Princeton. São Paulo: Cultura Cristã, 2005. p. 89-128.',
      'WOLTERS, Albert M. Creation Regained: Biblical Basics for a Reformational Worldview. Grand Rapids: Eerdmans, 2005. p. 41-68.',
    ],
  },
];

// ─── Diagrama Reino · Pacto · Mediadores — didático ──────────────────
const RPM_DEFS = [
  {
    id: 'reino',
    cor: GOLD,
    icone: '👑',
    titulo: 'Reino',
    subtitulo: 'O Governo Soberano de Deus',
    keywords: 'Soberania · Governo · Senhorio · Criação · Escatologia',
    versos: [
      { ref: 'Salmo 103.19', texto: '"O Senhor estabeleceu nos céus o seu trono, e o seu reino domina sobre tudo."' },
      { ref: 'Mateus 6.33', texto: '"Buscai primeiro o reino de Deus e a sua justiça."' },
      { ref: 'Apocalipse 11.15', texto: '"O reino do mundo se tornou o reino do nosso Senhor e do seu Cristo."' },
    ],
    definicao: 'Reino (hebraico malkût; grego basileia) é o conceito que descreve o governo soberano de Deus sobre toda a realidade — criação, história e redenção. Não é um território geográfico, mas o exercício ativo do senhorio divino sobre tudo o que existe. O Reino de Deus não começou na encarnação de Cristo: ele é eterno (Sl 103.19), mas foi inaugurado de forma decisiva em Jesus (Mc 1.15) e será consumado na nova criação (Ap 21.1-5).\n\nPara o casal cristão, o Reino significa que o casamento nunca é um projeto privado. Ele existe sob o governo de Deus, para os propósitos de Deus, dentro da história da redenção que Deus dirige. Cada decisão conjugal — finanças, vocação, filhos, moradia — é um ato dentro do Reino, não fora dele.',
    vanGroningen: 'Van Groningen demonstra que o conceito de Reino é o fio condutor de toda a revelação messiânica no Antigo Testamento. Deus governa (Reino) por meio de alianças (Pacto) e por intermédio de agentes representativos (Mediadores). O casamento cristão ocupa o lugar dos "agentes do Reino": um casal fiel não apenas vive para si — ele participa, em escala doméstica, da missão universal do Rei.\n\nIsso significa que o fracasso conjugal é sempre também um fracasso de testemunho do Reino. E que a graça que restaura casamentos é sempre também uma demonstração pública do poder redentor do Rei.',
    referencias: [
      'VAN GRONINGEN, Gerard. Messianic Revelation in the Old Testament. Grand Rapids: Baker Book House, 1990. p. 55-89.',
      'LADD, George Eldon. Teologia do Novo Testamento. São Paulo: Hagnos, 2001. p. 57-104.',
      'HORTON, Michael. Introducing Covenant Theology. Grand Rapids: Baker Books, 2006. p. 13-38.',
    ],
  },
  {
    id: 'pacto',
    cor: SPIRIT,
    icone: '📜',
    titulo: 'Pacto (Aliança)',
    subtitulo: 'O Compromisso Solene de Deus com Seu Povo',
    keywords: 'Promessa · Fidelidade · Testemunho · Juramento · Graça',
    versos: [
      { ref: 'Gênesis 9.9', texto: '"Eis que eu estabeleço a minha aliança convosco e com a vossa descendência depois de vós."' },
      { ref: 'Malaquias 2.14', texto: '"Ela é tua companheira e a mulher da tua aliança."' },
      { ref: 'Hebreus 8.6', texto: '"Ele é o mediador de uma melhor aliança, a qual foi estabelecida sobre melhores promessas."' },
    ],
    definicao: 'Pacto (hebraico berit; grego diatheke) é o compromisso solene pelo qual Deus se vincula ao Seu povo com promessas e responsabilidades — mas sempre com Ele mesmo como fiador e garantidor. Diferentemente de um contrato (que pode ser rompido quando uma das partes falha), o pacto bíblico é unilateral na iniciativa (Deus toma a iniciativa), bilateral na resposta (o povo é chamado a obedecer), e eterno na durabilidade (Deus é fiel mesmo quando o povo falha).\n\nAs grandes alianças bíblicas formam uma estrutura progressiva: com Noé (toda a criação), com Abraão (a semente prometida), com Moisés/Israel (a lei e a terra), com Davi (o rei eterno) e, supremamente, a Nova Aliança em Cristo (Jr 31.31-34; Lc 22.20) — que cumpre e supera todas as anteriores.\n\nO casamento é explicitamente chamado de aliança em Malaquias 2.14. Isso significa que os votos matrimoniais não são promessas entre duas pessoas — são um pacto feito diante de Deus, testemunhado por Ele, e sustentado pela graça da Nova Aliança.',
    vanGroningen: 'Para Van Groningen, as alianças não são episódios isolados na história bíblica, mas uma estrutura orgânica e progressiva — cada aliança revelando mais do propósito redentor de Deus. O casamento cristão não é apenas uma instituição social inspirada na Bíblia: é uma manifestação concreta da aliança de Deus com a humanidade.\n\nIsso tem uma implicação pastoral profunda: quando um casal está em crise, a pergunta certa não é "meus sentimentos ainda estão lá?" mas "o Deus que fez esta aliança ainda é fiel?" A resposta é sempre sim — e é isso que sustenta o casamento na escuridão.',
    referencias: [
      'VAN GRONINGEN, Gerard. Messianic Revelation in the Old Testament. Grand Rapids: Baker Book House, 1990. p. 100-145.',
      'ROBERTSON, O. Palmer. O Cristo das Alianças. São Paulo: Cultura Cristã, 2010. p. 3-54.',
      'BERKHOF, Louis. Teologia Sistemática. São Paulo: Cultura Cristã, 2014. p. 285-330.',
    ],
  },
  {
    id: 'mediadores',
    cor: CULT,
    icone: '🤝',
    titulo: 'Mediadores (Agentes)',
    subtitulo: 'Representantes Humanos do Governo de Deus',
    keywords: 'Imagem · Representação · Vocação · Casal · Missão · Cristo',
    versos: [
      { ref: 'Gênesis 1.26-27', texto: '"Façamos o homem à nossa imagem... e domine sobre os peixes do mar, as aves do céu..."' },
      { ref: '1 Timóteo 2.5', texto: '"Há um só Deus e um só mediador entre Deus e os homens, Jesus Cristo homem."' },
      { ref: 'Efésios 5.25', texto: '"Maridos, amai vossas mulheres, assim como Cristo amou a Igreja e a si mesmo se entregou por ela."' },
    ],
    definicao: 'Mediadores (ou agentes) são aqueles que, na estrutura pactual, representam Deus diante do mundo e o mundo diante de Deus. Na revelação progressiva, Deus governa Seu Reino por meio de agentes humanos representativos: Adão (como vice-rei da criação), Noé (preservando a semente humana), Abraão (pai da fé), Moisés (mediador da Lei), Davi (tipo do Rei eterno) — todos apontando para Cristo, o único Mediador definitivo e perfeito (1 Tm 2.5).\n\nO casal cristão ocupa o lugar de agentes do Reino — não mediadores de salvação (função exclusiva de Cristo), mas representantes do governo de Deus na criação: na família, no trabalho, na cultura, na missão. A analogia de Efésios 5 (marido-esposa refletindo Cristo-Igreja) mostra que o casamento é, em si mesmo, um ato de mediação: ele torna visível ao mundo o amor de Cristo pela Igreja.\n\nIsso exige humildade: os agentes não governam por mérito próprio, mas por delegação. E exige fidelidade: a missão do casal é revelar o caráter do Rei, não o seu próprio.',
    vanGroningen: 'Van Groningen dedica uma grande parte de sua obra ao conceito de "revelação messiânica" — a ideia de que cada mediador humano no Antigo Testamento é um elo na cadeia que conduz ao Messias. O casal cristão, então, não é apenas beneficiário da aliança: é instrumento dela. A família que vive o evangelho em casa está cumprindo, em micro-escala, a função que Israel deveria ter cumprido entre as nações.\n\nIsso tem consequências práticas: o modo como o marido ama a esposa, o modo como a esposa honra o marido, o modo como os filhos são educados — tudo isso é uma declaração pública sobre quem é Deus. O lar cristão é apologética viva.',
    referencias: [
      'VAN GRONINGEN, Gerard. Messianic Revelation in the Old Testament. Grand Rapids: Baker Book House, 1990. p. 201-268.',
      'VOS, Geerhardus. Teologia Bíblica: Antigo e Novo Testamento. São Paulo: Cultura Cristã, 2010. p. 143-180.',
      'CALVINO, João. As Institutas da Religião Cristã. São Paulo: Cultura Cristã, 2006. v. 1, p. 227-258.',
    ],
  },
];

function DiagramaRPM({ pt }: { pt: boolean }) {
  // SVG dimensions
  const W = 1000, H = 760;
  const cx = W / 2;

  // Key layout coordinates
  const deusBox = { x: cx - 130, y: 60, w: 260, h: 90 };
  const deusCx = cx, deusCy = deusBox.y + deusBox.h / 2;

  // Ellipse center and radii
  const elCx = cx, elCy = 450, elRx = 340, elRy = 210;

  // Triangle inside ellipse (HOMEM|MULHER apex, DESCENDÊNCIA base center)
  const triTop = { x: cx, y: elCy - 80 };       // HOMEM | MULHER
  const triLeft = { x: cx - 90, y: elCy + 80 }; // left base
  const triRight = { x: cx + 90, y: elCy + 80 }; // right base
  const triBaseMid = { x: cx, y: elCy + 80 };    // DESCENDÊNCIA

  // Radial targets (left side)
  const leftTargets = [
    { label: 'POLÍTICA',  x: elCx - elRx + 60,  y: elCy - 130 },
    { label: 'TRABALHO',  x: elCx - elRx + 40,  y: elCy - 10  },
    { label: 'COMÉRCIO',  x: elCx - elRx + 55,  y: elCy + 110 },
    { label: 'ARTES',     x: elCx - 120,         y: elCy + 165 },
  ];
  // Radial targets (right side)
  const rightTargets = [
    { label: 'INDÚSTRIA',   x: elCx + elRx - 60,  y: elCy - 130 },
    { label: 'TECNOLOGIA',  x: elCx + elRx - 40,  y: elCy - 10  },
    { label: 'RECREAÇÃO',   x: elCx + elRx - 55,  y: elCy + 110 },
  ];

  // Radial center (midpoint of triangle)
  const radCx = cx, radCy = elCy - 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.12 }}
      style={{ marginBottom: 40, borderRadius: 22, background: 'rgba(255,255,255,0.022)', border: '1px solid rgba(255,255,255,0.08)', padding: '32px 20px 28px' }}
    >
      {/* Cabeçalho */}
      <div style={{ textAlign: 'center', marginBottom: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase', color: GOLD }}>
          {pt ? 'Diagrama Didático · Van Groningen' : 'Didactic Diagram · Van Groningen'}
        </span>
      </div>
      <div style={{ textAlign: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 'clamp(17px,2.6vw,22px)', fontWeight: 900, color: 'rgba(255,255,255,0.90)' }}>
          {pt ? 'Reino · Pacto · Mediadores' : 'Kingdom · Covenant · Mediators'}
        </span>
      </div>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', fontStyle: 'italic', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
          {pt ? 'Relacionamentos' : 'Relationships'}
        </span>
      </div>

      {/* SVG */}
      <div style={{ width: '100%', maxWidth: 1000, margin: '0 auto' }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            {/* Arrow markers */}
            <marker id="arwGold" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
              <path d="M0,0 L0,7 L9,3.5 z" fill={GOLD} opacity="0.85"/>
            </marker>
            <marker id="arwDown" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill={GOLD} opacity="0.80"/>
            </marker>
            <filter id="rpmGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Background rounded rect */}
          <rect x="0" y="0" width={W} height={H} rx="20" fill="rgba(10,14,40,0.6)" />

          {/* Title line: REINO — PACTO — MEDIADOR */}
          <text x={cx} y={36} textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="15" fontWeight="900" letterSpacing="4">
            REINO — PACTO — MEDIADOR
          </text>

          {/* ── DEUS box ── */}
          <rect
            x={deusBox.x} y={deusBox.y}
            width={deusBox.w} height={deusBox.h}
            rx="10"
            fill="rgba(255,200,80,0.15)"
            stroke={GOLD}
            strokeWidth="1.8"
          />
          <text x={cx} y={deusBox.y + 26} textAnchor="middle" fill="rgba(255,255,255,0.92)" fontSize="13" fontWeight="700">DEUS (PAI)</text>
          <text x={cx} y={deusBox.y + 47} textAnchor="middle" fill="rgba(255,255,255,0.80)" fontSize="12.5">A PALAVRA (FILHO)</text>
          <text x={cx} y={deusBox.y + 67} textAnchor="middle" fill={SPIRIT} fontSize="12.5">ESPÍRITO</text>

          {/* 3 downward arrows from Deus box */}
          {[-20, 0, 20].map((dx, i) => (
            <line key={i}
              x1={cx + dx} y1={deusBox.y + deusBox.h}
              x2={cx + dx} y2={deusBox.y + deusBox.h + 34}
              stroke={GOLD} strokeWidth="1.6" opacity="0.70"
              markerEnd="url(#arwDown)"
            />
          ))}

          {/* LAÇO PACTUAL label */}
          <text x={cx} y={deusBox.y + deusBox.h + 58} textAnchor="middle" fill={GOLD} fontSize="11" fontWeight="900" letterSpacing="3" opacity="0.85">
            LAÇO PACTUAL
          </text>

          {/* Diagonal dashed REINO lines from Deus box corners to ellipse sides */}
          {/* Left diagonal: bottom-left corner of Deus box -> left side of ellipse */}
          <line
            x1={deusBox.x} y1={deusBox.y + deusBox.h}
            x2={elCx - elRx + 20} y2={elCy - 160}
            stroke={GOLD} strokeWidth="1.4" strokeDasharray="7 5" opacity="0.45"
          />
          {/* Right diagonal */}
          <line
            x1={deusBox.x + deusBox.w} y1={deusBox.y + deusBox.h}
            x2={elCx + elRx - 20} y2={elCy - 160}
            stroke={GOLD} strokeWidth="1.4" strokeDasharray="7 5" opacity="0.45"
          />

          {/* REINO text along diagonals */}
          <text
            x={deusBox.x - 38} y={deusBox.y + deusBox.h + 70}
            fill={GOLD} fontSize="10" fontWeight="800" letterSpacing="3" opacity="0.60"
            transform={`rotate(-40, ${deusBox.x - 38}, ${deusBox.y + deusBox.h + 70})`}
          >
            REINO
          </text>
          <text
            x={deusBox.x + deusBox.w + 38} y={deusBox.y + deusBox.h + 70}
            fill={GOLD} fontSize="10" fontWeight="800" letterSpacing="3" opacity="0.60"
            transform={`rotate(40, ${deusBox.x + deusBox.w + 38}, ${deusBox.y + deusBox.h + 70})`}
          >
            REINO
          </text>

          {/* ── Large ellipse (mediadores space) ── */}
          <ellipse
            cx={elCx} cy={elCy}
            rx={elRx} ry={elRy}
            fill="rgba(52,211,153,0.07)"
            stroke="rgba(52,211,153,0.35)"
            strokeWidth="1.8"
          />

          {/* MEDIADORES label inside ellipse top */}
          <text x={cx} y={elCy - elRy + 36} textAnchor="middle" fill={SPIRIT} fontSize="13" fontWeight="900" letterSpacing="3">
            MEDIADORES
          </text>
          <text x={cx} y={elCy - elRy + 54} textAnchor="middle" fill="rgba(52,211,153,0.60)" fontSize="10" fontStyle="italic">
            agentes da aliança — não Cristo
          </text>

          {/* Triangle: HOMEM | MULHER / DESCENDÊNCIA */}
          <polygon
            points={`${triTop.x},${triTop.y} ${triLeft.x},${triLeft.y} ${triRight.x},${triRight.y}`}
            fill="rgba(255,200,80,0.06)"
            stroke={GOLD}
            strokeWidth="1.4"
            opacity="0.70"
          />
          <text x={cx} y={triTop.y - 10} textAnchor="middle" fill="rgba(255,255,255,0.88)" fontSize="11.5" fontWeight="700">
            HOMEM | MULHER
          </text>
          <text x={cx} y={triBaseMid.y + 18} textAnchor="middle" fill="rgba(255,255,255,0.70)" fontSize="10.5" fontStyle="italic">
            DESCENDÊNCIA
          </text>

          {/* Radial arrows + labels — left side */}
          {leftTargets.map((t, i) => {
            const dx = t.x - radCx, dy = t.y - radCy;
            const len = Math.sqrt(dx * dx + dy * dy);
            const endX = t.x - (dx / len) * 12;
            const endY = t.y - (dy / len) * 12;
            return (
              <g key={`lt${i}`}>
                <line
                  x1={radCx} y1={radCy}
                  x2={endX} y2={endY}
                  stroke={GOLD} strokeWidth="1.3" opacity="0.60"
                  markerEnd="url(#arwGold)"
                />
                <text x={t.x - 6} y={t.y + 4} textAnchor="end" fill={GOLD} fontSize="10.5" fontWeight="700" opacity="0.85">
                  {t.label}
                </text>
              </g>
            );
          })}

          {/* Radial arrows + labels — right side */}
          {rightTargets.map((t, i) => {
            const dx = t.x - radCx, dy = t.y - radCy;
            const len = Math.sqrt(dx * dx + dy * dy);
            const endX = t.x - (dx / len) * 12;
            const endY = t.y - (dy / len) * 12;
            return (
              <g key={`rt${i}`}>
                <line
                  x1={radCx} y1={radCy}
                  x2={endX} y2={endY}
                  stroke={GOLD} strokeWidth="1.3" opacity="0.60"
                  markerEnd="url(#arwGold)"
                />
                <text x={t.x + 6} y={t.y + 4} textAnchor="start" fill={GOLD} fontSize="10.5" fontWeight="700" opacity="0.85">
                  {t.label}
                </text>
              </g>
            );
          })}

          {/* MANDATO CULTURAL below ellipse */}
          <text x={cx} y={elCy + elRy + 28} textAnchor="middle" fill={CULT} fontSize="12" fontWeight="900" letterSpacing="3">
            MANDATO CULTURAL
          </text>
          <text x={cx} y={elCy + elRy + 46} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10.5" letterSpacing="1">
            Escola · Trabalho · Lar
          </text>

          {/* COSMOS bottom right */}
          <text x={W - 28} y={elCy + elRy + 46} textAnchor="end" fill="rgba(255,255,255,0.28)" fontSize="10" fontStyle="italic" letterSpacing="1">
            COSMOS →
          </text>

          {/* MANDATO ESPIRITUAL — outside ellipse right top */}
          <circle cx={elCx + elRx + 22} cy={elCy - 100} r="5" fill="#1e3a5f" stroke={SPIRIT} strokeWidth="1.2"/>
          <text x={elCx + elRx + 34} y={elCy - 96} fill="rgba(255,255,255,0.72)" fontSize="10.5" fontWeight="700">MANDATO ESPIRITUAL</text>
          <text x={elCx + elRx + 34} y={elCy - 80} fill="rgba(255,255,255,0.38)" fontSize="9.5" fontStyle="italic">Laço Pactual · Sábado</text>

          {/* MANDATO SOCIAL — outside ellipse right middle */}
          <circle cx={elCx + elRx + 22} cy={elCy + 20} r="5" fill="rgba(245,158,11,0.25)" stroke="#f59e0b" strokeWidth="1.2"/>
          <text x={elCx + elRx + 34} y={elCy + 24} fill="rgba(255,255,255,0.72)" fontSize="10.5" fontWeight="700">MANDATO SOCIAL</text>
          <text x={elCx + elRx + 34} y={elCy + 40} fill="rgba(255,255,255,0.38)" fontSize="9.5" fontStyle="italic">Família</text>

          {/* Legend box bottom left */}
          <rect x="24" y={H - 150} width="290" height="128" rx="10" fill="rgba(5,7,26,0.75)" stroke="rgba(255,255,255,0.10)" strokeWidth="1"/>
          {/* Navy dot */}
          <circle cx="44" cy={H - 124} r="5" fill="#1e3a5f" stroke={SPIRIT} strokeWidth="1"/>
          <text x="56" y={H - 120} fill="rgba(255,255,255,0.60)" fontSize="9.5">Mandato Espiritual — Trindade, Pacto e Reino</text>
          {/* Teal dot */}
          <circle cx="44" cy={H - 104} r="5" fill="rgba(52,211,153,0.25)" stroke={SPIRIT} strokeWidth="1"/>
          <text x="56" y={H - 100} fill="rgba(255,255,255,0.60)" fontSize="9.5">Mediadores — Homem e Mulher (não Cristo)</text>
          {/* Gold dot */}
          <circle cx="44" cy={H - 84} r="5" fill={GOLD} opacity="0.70"/>
          <text x="56" y={H - 80} fill="rgba(255,255,255,0.60)" fontSize="9.5">Mandato Cultural — política, trabalho, artes, lar</text>
          {/* Amber dot */}
          <circle cx="44" cy={H - 64} r="5" fill="#f59e0b" opacity="0.70"/>
          <text x="56" y={H - 60} fill="rgba(255,255,255,0.60)" fontSize="9.5">Mandato Social — expansão institucional da família</text>

          {/* Ref Van Groningen */}
          <text x={W - 18} y={H - 14} textAnchor="end" fill="rgba(255,255,255,0.20)" fontSize="9" fontStyle="italic">
            Van Groningen (1990)
          </text>
        </svg>
      </div>

      {/* ── Cards de definição ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 28 }}>
        {RPM_DEFS.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.28 + i * 0.11 }}
            style={{ borderRadius: 16, background: `${d.cor}0c`, border: `1.5px solid ${d.cor}30`, borderLeft: `4px solid ${d.cor}`, padding: '22px 24px' }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 28 }}>{d.icone}</span>
              <div>
                <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: d.cor, marginBottom: 2 }}>{d.titulo}</div>
                <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 700, color: 'rgba(255,255,255,0.75)', marginBottom: 2 }}>{d.subtitulo}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}>{d.keywords}</div>
              </div>
            </div>

            {/* Versos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {d.versos.map((v, vi) => (
                <div key={vi} style={{ padding: '10px 14px', borderRadius: 9, background: `${d.cor}0e`, border: `1px solid ${d.cor}25` }}>
                  <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase', color: d.cor, marginBottom: 4 }}>{v.ref}</div>
                  <div style={{ fontSize: 'clamp(14px,1.9vw,16px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.72, fontStyle: 'italic' }}>{v.texto}</div>
                </div>
              ))}
            </div>

            {/* Definição */}
            <div style={{ fontSize: 'clamp(14px,1.9vw,16px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.90, marginBottom: 16, whiteSpace: 'pre-line' }}>
              {d.definicao}
            </div>

            {/* Van Groningen */}
            <div style={{ padding: '14px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.09)', marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: 7 }}>
                {pt ? 'Van Groningen — Contribuição Teológica' : 'Van Groningen — Theological Contribution'}
              </div>
              <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', color: 'rgba(255,255,255,0.68)', lineHeight: 1.88, fontStyle: 'italic', whiteSpace: 'pre-line' }}>
                {d.vanGroningen}
              </div>
            </div>

            {/* Referências ABNT */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: d.cor, opacity: 0.70, marginBottom: 7 }}>
                {pt ? 'Referências (ABNT)' : 'References (ABNT)'}
              </div>
              {d.referencias.map((ref, ri) => (
                <div key={ri} style={{ fontSize: 'clamp(11px,1.5vw,12.5px)', color: 'rgba(255,255,255,0.38)', lineHeight: 1.72, padding: '5px 0', borderBottom: ri < d.referencias.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  {ref}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function DiagramaMandatos({ pt }: { pt: boolean }) {
  const W = 900, H = 680;
  const cx = W / 2, cy = H / 2 + 20;
  const R = 218;

  const nPos = {
    espiritual: { x: cx,          y: cy - R        },
    social:     { x: cx - R*0.90, y: cy + R*0.52   },
    cultural:   { x: cx + R*0.90, y: cy + R*0.52   },
  };
  const mc = { x: cx, y: cy };

  const arrowIds = [['arwG', GOLD], ['arwSp', SPIRIT], ['arwSoc', SOCIAL], ['arwCult', CULT]] as [string,string][];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.1 }}
      style={{ marginBottom: 40, borderRadius: 22, background: 'rgba(255,255,255,0.022)', border: '1px solid rgba(255,255,255,0.08)', padding: '32px 20px 28px', overflow: 'hidden' }}
    >
      {/* Cabeçalho */}
      <div style={{ textAlign: 'center', marginBottom: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase', color: GOLD }}>
          {pt ? 'Diagrama · Van Groningen' : 'Diagram · Van Groningen'}
        </span>
      </div>
      <div style={{ textAlign: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 'clamp(17px,2.6vw,22px)', fontWeight: 900, color: 'rgba(255,255,255,0.90)', letterSpacing: '0.04em' }}>
          {pt ? 'Reino · Pacto · Mediadores' : 'Kingdom · Covenant · Mediators'}
        </span>
      </div>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}>
          {pt ? 'Os três mandatos que estruturam o casamento e a família cristã' : 'The three mandates that structure marriage and the Christian family'}
        </span>
      </div>

      {/* SVG */}
      <div style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <radialGradient id="dBg" cx="50%" cy="52%" r="48%">
              <stop offset="0%" stopColor="rgba(255,200,80,0.07)" />
              <stop offset="100%" stopColor="rgba(5,7,26,0)" />
            </radialGradient>
            <filter id="dGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="7" result="b" />
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="dSoft" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="16" result="b" />
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {arrowIds.map(([id, col]) => (
              <marker key={id} id={id} markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
                <path d="M0,0 L0,7 L9,3.5 z" fill={col} opacity="0.9" />
              </marker>
            ))}
          </defs>

          {/* Fundo radial */}
          <ellipse cx={cx} cy={cy} rx="420" ry="320" fill="url(#dBg)" />

          {/* ── REINO — moldura dupla ── */}
          <rect x="16" y="16" width={W-32} height={H-32} rx="26" fill="none" stroke={GOLD} strokeWidth="1.5" strokeDasharray="7 5" opacity="0.22" />
          <rect x="26" y="26" width={W-52} height={H-52} rx="20" fill="none" stroke={GOLD} strokeWidth="0.7" strokeDasharray="3 6" opacity="0.13" />
          <text x={cx} y="13" textAnchor="middle" fill={GOLD} fontSize="12" fontWeight="900" letterSpacing="4" opacity="0.65">REINO — GOVERNO SOBERANO DE DEUS</text>
          <text x={cx} y={H-8} textAnchor="middle" fill={GOLD} fontSize="10" letterSpacing="1.5" opacity="0.35">Sl 103.19 · Mc 1.15 · Rm 14.17 · Ap 11.15</text>

          {/* ── TRINDADE ── */}
          <rect x={cx-145} y="36" width="290" height="56" rx="14" fill="rgba(255,200,80,0.11)" stroke={GOLD} strokeWidth="1.5" opacity="0.9" />
          <text x={cx} y="56" textAnchor="middle" fill={GOLD} fontSize="13" fontWeight="900" letterSpacing="3">PAI  ·  FILHO  ·  ESPÍRITO SANTO</text>
          <text x={cx} y="75" textAnchor="middle" fill="rgba(255,255,255,0.42)" fontSize="10.5" fontStyle="italic">comunhão eterna — fonte de todo amor e missão</text>

          {/* ── Linha Trindade → Centro (ALIANÇA) ── */}
          <line x1={cx} y1="92" x2={mc.x} y2={mc.y - 58}
            stroke={GOLD} strokeWidth="2.5" opacity="0.60" markerEnd="url(#arwG)" />
          <rect x={cx+6} y="126" width="66" height="18" rx="5" fill="rgba(5,7,26,0.7)" />
          <text x={cx+39} y="139" textAnchor="middle" fill={GOLD} fontSize="11" fontWeight="900" letterSpacing="1.5" opacity="0.85">ALIANÇA</text>

          {/* ── Triângulo entre mandatos (linhas de PACTO) ── */}
          {[
            [nPos.espiritual, nPos.social,   'rgba(52,211,153,0.18)',  'rgba(80,200,255,0.18)'],
            [nPos.espiritual, nPos.cultural,  'rgba(52,211,153,0.18)',  'rgba(180,120,255,0.18)'],
            [nPos.social,     nPos.cultural,  'rgba(80,200,255,0.18)',  'rgba(180,120,255,0.18)'],
          ].map(([a, b, c1, c2], i) => {
            const na = a as {x:number,y:number}, nb = b as {x:number,y:number};
            const mid = { x: (na.x+nb.x)/2, y: (na.y+nb.y)/2 };
            return (
              <g key={i}>
                <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke="rgba(255,255,255,0.12)" strokeWidth="1.8" strokeDasharray="6 5" />
                <rect x={mid.x-22} y={mid.y-10} width="44" height="18" rx="5" fill="rgba(5,7,26,0.75)" />
                <text x={mid.x} y={mid.y+4} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9.5" fontWeight="700" letterSpacing="2">PACTO</text>
              </g>
            );
          })}

          {/* ── Raios do centro para cada mandato ── */}
          {([
            [mc, nPos.espiritual, SPIRIT, 'arwSp'],
            [mc, nPos.social,     SOCIAL,  'arwSoc'],
            [mc, nPos.cultural,   CULT,    'arwCult'],
          ] as [typeof mc, typeof mc, string, string][]).map(([a, b, col, marker], i) => {
            const dx = b.x - a.x, dy = b.y - a.y;
            const len = Math.sqrt(dx*dx+dy*dy);
            const off = 62;
            const x2 = b.x - dx/len*off, y2 = b.y - dy/len*off;
            const x1 = a.x + dx/len*62, y1 = a.y + dy/len*62;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={col} strokeWidth="2.5" opacity="0.55"
                strokeDasharray="6 4" markerEnd={`url(#${marker})`} />
            );
          })}

          {/* ── Nós dos 3 mandatos ── */}
          {MANDATOS_DEF.map((m) => {
            const pos = nPos[m.id as keyof typeof nPos];
            return (
              <g key={m.id}>
                <circle cx={pos.x} cy={pos.y} r="78" fill={m.color} opacity="0.05" filter="url(#dSoft)" />
                <circle cx={pos.x} cy={pos.y} r="60" fill={`${m.color}15`} stroke={m.color} strokeWidth="2" filter="url(#dGlow)" />
                <circle cx={pos.x} cy={pos.y} r="44" fill={`${m.color}08`} stroke={m.color} strokeWidth="0.8" opacity="0.5" />
                <text x={pos.x} y={pos.y - 16} textAnchor="middle" fontSize="26">{m.icon}</text>
                <text x={pos.x} y={pos.y + 6} textAnchor="middle" fill={m.color} fontSize="12.5" fontWeight="900" letterSpacing="0.5">MANDATO</text>
                <text x={pos.x} y={pos.y + 22} textAnchor="middle" fill={m.color} fontSize="13.5" fontWeight="900" letterSpacing="0.5">{m.titulo.replace('Mandato ','')}</text>
                {m.keywords.split(' · ').slice(0,2).map((kw, ki) => (
                  <text key={ki} x={pos.x} y={pos.y + 44 + ki*14} textAnchor="middle" fill="rgba(255,255,255,0.42)" fontSize="10" fontStyle="italic">{kw}</text>
                ))}
                <text x={pos.x} y={pos.y + 82} textAnchor="middle" fill={m.color} fontSize="9.5" opacity="0.65" letterSpacing="0.5">{m.verso}</text>
              </g>
            );
          })}

          {/* ── Nó Central — Mediadores ── */}
          <circle cx={mc.x} cy={mc.y} r="68" fill="rgba(255,200,80,0.10)" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
          <circle cx={mc.x} cy={mc.y} r="56" fill="rgba(255,200,80,0.14)" stroke={GOLD} strokeWidth="2.2" filter="url(#dGlow)" />
          <text x={mc.x} y={mc.y - 14} textAnchor="middle" fontSize="26">💍</text>
          <text x={mc.x} y={mc.y + 8} textAnchor="middle" fill={GOLD} fontSize="13" fontWeight="900" letterSpacing="1">MEDIADORES</text>
          <text x={mc.x} y={mc.y + 24} textAnchor="middle" fill="rgba(255,200,80,0.60)" fontSize="10.5" fontStyle="italic">agentes · casal</text>
          <text x={mc.x} y={mc.y + 40} textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize="9.5">1 Tm 2.5</text>
        </svg>
      </div>

      {/* ── Definições dos 3 mandatos — cards completos ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 28 }}>
        {MANDATOS_DEF.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -18 : 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.3 + i * 0.12 }}
            style={{ borderRadius: 16, background: `${m.color}0c`, border: `1.5px solid ${m.color}30`, borderLeft: `4px solid ${m.color}`, padding: '22px 24px' }}
          >
            {/* Header do card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 26 }}>{m.icon}</span>
              <div>
                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: m.color, marginBottom: 2 }}>
                  {m.titulo}
                </div>
                <div style={{ fontSize: 'clamp(12px,1.7vw,13.5px)', color: 'rgba(255,255,255,0.40)', fontStyle: 'italic' }}>
                  {m.keywords}
                </div>
              </div>
            </div>

            {/* Verso */}
            <div style={{ margin: '0 0 14px', padding: '12px 16px', borderRadius: 10, background: `${m.color}10`, border: `1px solid ${m.color}28` }}>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: m.color, marginBottom: 5 }}>{m.verso}</div>
              <div style={{ fontSize: 'clamp(14px,2vw,16px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.72, fontStyle: 'italic' }}>{m.textoVerso}</div>
            </div>

            {/* Definição */}
            <div style={{ fontSize: 'clamp(14px,1.9vw,16px)', color: 'rgba(255,255,255,0.80)', lineHeight: 1.88, marginBottom: 14 }}>
              {m.definicao}
            </div>

            {/* Van Groningen */}
            <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: 7 }}>
                {pt ? 'Van Groningen — Contribuição Teológica' : 'Van Groningen — Theological Contribution'}
              </div>
              <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', color: 'rgba(255,255,255,0.68)', lineHeight: 1.85, fontStyle: 'italic' }}>
                {m.vanGroningen}
              </div>
            </div>

            {/* Referências ABNT */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: m.color, opacity: 0.70, marginBottom: 7 }}>
                {pt ? 'Referências (ABNT)' : 'References (ABNT)'}
              </div>
              {m.referencias.map((ref, ri) => (
                <div key={ri} style={{ fontSize: 'clamp(11px,1.5vw,12.5px)', color: 'rgba(255,255,255,0.38)', lineHeight: 1.70, paddingBottom: ri < m.referencias.length - 1 ? 5 : 0, borderBottom: ri < m.referencias.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', marginBottom: ri < m.referencias.length - 1 ? 5 : 0 }}>
                  {ref}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function AulaInaugural() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'pt'|'en'>('pt');
  const pt = lang === 'pt';
  const onBack = () => navigate('/familia/noivos');
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.white }}>
      <Navbar lang={lang} />
      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(90px,11vw,110px) clamp(16px,4vw,32px) 100px' }}>

        {/* Voltar */}
        <div style={{ marginBottom: 32 }}>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,200,80,0.70)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            {pt ? '← Aulas' : '← Lessons'}
          </button>
        </div>

        {/* Cabeçalho */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10, padding: '4px 12px', borderRadius: 7, background: GOLD_B, border: `1px solid ${GOLD_BD}` }}>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,200,80,0.75)' }}>{pt ? 'Curso de Noivos · Material do Aluno' : 'Pre-Wedding Course · Student Material'}</span>
          </div>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', marginBottom: 14 }}>
            {pt ? 'Aula Inaugural · Encontro 1' : 'Inaugural Lesson · Session 1'}
          </div>
          <h1 style={{ fontSize: 'clamp(26px,4.8vw,46px)', fontWeight: 900, lineHeight: 1.12, margin: '0 0 10px', background: `linear-gradient(135deg,rgba(255,255,255,0.95) 0%,${GOLD} 58%,rgba(255,230,140,0.72) 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {pt ? 'A Aliança como Fundamento' : 'The Covenant as Foundation'}
          </h1>
          <p style={{ fontSize: 'clamp(13px,1.8vw,15px)', color: 'rgba(255,255,255,0.42)', lineHeight: 1.70, fontStyle: 'italic', margin: '0 0 20px' }}>
            {pt ? 'O casamento de vocês começa antes de vocês' : 'Your marriage began before you did'}
          </p>
        </motion.div>

        {/* Boas-vindas */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }} style={{ marginBottom: 36, padding: '18px 22px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)' }}>
          <Txt>{pt ? 'Sejam bem-vindos! Este material acompanha o primeiro encontro do curso de noivos. Use-o durante a aula para acompanhar o ensino e anotar suas respostas, e leve-o para casa — vocês vão voltar a ele mais de uma vez ao longo do noivado.' : 'Welcome! This material accompanies the first session of the pre-wedding course. Use it during the lesson to follow the teaching and record your answers, and take it home — you will return to it more than once throughout your engagement.'}</Txt>
        </motion.div>

        {/* ── BLOCO 1: Diagrama e definições de Reino · Pacto · Mediadores ── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }} style={{ marginBottom: 8 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 14px', borderRadius: 7, background: 'rgba(255,200,80,0.10)', border: `1px solid ${GOLD_BD}`, marginBottom: 16 }}>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD }}>{pt ? 'Parte 1 de 2 · Estrutura Teológica' : 'Part 1 of 2 · Theological Framework'}</span>
          </div>
          <div style={{ fontSize: 'clamp(18px,3vw,26px)', fontWeight: 900, color: 'rgba(255,255,255,0.90)', marginBottom: 6 }}>
            {pt ? 'Reino · Pacto · Mediadores' : 'Kingdom · Covenant · Mediators'}
          </div>
          <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 24 }}>
            {pt ? 'A estrutura pela qual Deus governa a história da redenção — e dentro da qual o casamento de vocês existe.' : 'The framework by which God governs the history of redemption — and within which your marriage exists.'}
          </div>
        </motion.div>
        <DiagramaRPM pt={pt} />

        {/* ── BLOCO 2: Diagrama e definições dos 3 Mandatos ── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.10 }} style={{ marginBottom: 8, marginTop: 16 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 14px', borderRadius: 7, background: 'rgba(52,211,153,0.10)', border: '1px solid rgba(52,211,153,0.35)', marginBottom: 16 }}>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: SPIRIT }}>{pt ? 'Parte 2 de 2 · Os Três Mandatos' : 'Part 2 of 2 · The Three Mandates'}</span>
          </div>
          <div style={{ fontSize: 'clamp(18px,3vw,26px)', fontWeight: 900, color: 'rgba(255,255,255,0.90)', marginBottom: 6 }}>
            {pt ? 'Mandato Espiritual · Social · Cultural' : 'Spiritual · Social · Cultural Mandate'}
          </div>
          <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 24 }}>
            {pt ? 'As três dimensões da missão que Deus confiou ao casal como imagem dEle na criação — baseado em Van Groningen.' : 'The three dimensions of the mission God entrusted to the couple as His image in creation — based on Van Groningen.'}
          </div>
        </motion.div>
        <DiagramaMandatos pt={pt} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 16 }}>

          {/* Percurso */}
          <Bloco titulo={pt ? 'Nosso Percurso — 8 Encontros (Agosto a Dezembro)' : 'Our Journey — 8 Sessions (August to December)'} delay={0.14}>
            <Txt style={{ marginBottom: 16 }}>{pt ? 'Este é apenas o primeiro passo de uma caminhada de alguns meses. Os encontros presenciais marcam a abertura, um tema mais delicado e o encerramento do curso; os demais podem acontecer de forma híbrida. A coluna "Mandato" mostra onde cada tema se encaixa no diagrama — Espiritual, Social ou Cultural.' : 'This is only the first step of a journey spanning several months. In-person sessions mark the opening, a more sensitive topic, and the closing of the course; the others may be hybrid. The "Mandate" column shows where each topic fits in the diagram — Spiritual, Social, or Cultural.'}</Txt>
            <div style={{ overflowX: 'auto', marginTop: 10 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'clamp(11px,1.5vw,13px)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,200,80,0.25)' }}>
                    {(pt ? ['Nº','Quando','Tema','Pergunta que guia','Mandato'] : ['#','When','Topic','Guiding Question','Mandate']).map(h => (
                      <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontSize: 10, fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,200,80,0.65)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ENCONTROS_TABLE.map((e, i) => (
                    <tr key={e.num} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: e.num === 1 ? 'rgba(255,200,80,0.07)' : 'transparent' }}>
                      <td style={{ padding: '9px 10px', fontWeight: 900, color: e.num === 1 ? GOLD : 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap' }}>{String(e.num).padStart(2,'0')}</td>
                      <td style={{ padding: '9px 10px', color: 'rgba(255,255,255,0.50)', whiteSpace: 'nowrap' }}>{e.quando}</td>
                      <td style={{ padding: '9px 10px', color: e.num === 1 ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.60)', fontWeight: e.num === 1 ? 700 : 400 }}>{e.tema}</td>
                      <td style={{ padding: '9px 10px', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>{e.pergunta}</td>
                      <td style={{ padding: '9px 10px', whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.12em', color: MANDATO_COR[e.mandato] ?? GOLD, background: `${MANDATO_COR[e.mandato] ?? GOLD}18`, border: `1px solid ${MANDATO_COR[e.mandato] ?? GOLD}40`, borderRadius: 5, padding: '2px 7px' }}>{e.mandato}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 14, fontSize: 'clamp(12px,1.6vw,13.5px)', color: 'rgba(255,255,255,0.42)', fontStyle: 'italic' }}>
              {pt ? 'O curso inteiro é o próprio diagrama sendo desdobrado, encontro após encontro.' : 'The entire course is the diagram itself being unfolded, session by session.'}
            </div>
          </Bloco>

          {/* I */}
          <Bloco titulo={pt ? 'Mandato Espiritual (I) — O Casamento Começa em Deus, Não em Vocês' : 'Spiritual Mandate (I) — Marriage Begins in God, Not in You'} delay={0.20}>
            <Verso ref="Gênesis 1.26" texto='Deus disse: "Façamos o homem à nossa imagem, conforme a nossa semelhança."' />
            <Txt>{`No topo do diagrama estão o Pai, o Filho e o Espírito. Antes de existir qualquer casal, já existia comunhão perfeita dentro do próprio Deus. Isso muda a forma de olhar para o casamento: ele não é um projeto que vocês vão inventar do zero — é um convite para refletir, em carne humana, uma comunhão que já existe eternamente. Vocês não precisam criar a intimidade e a fidelidade a partir de si mesmos; podem recebê-las de Deus e aprender a vivê-las, dia após dia.\n\nIsso aponta para Cristo e o Espírito: o Pai enviou o Filho para restaurar a comunhão que o pecado quebrou (João 1.14; Colossenses 1.19-20), e hoje o Espírito Santo habita no casal cristão, derramando o próprio amor de Deus em nossos corações (Romanos 5.5). A comunhão que vocês buscam no casamento só é plenamente possível porque Cristo já reconciliou o que estava separado.`}</Txt>
          </Bloco>

          {/* II */}
          <Bloco titulo={pt ? 'Mandato Espiritual (II) — O Casamento Está sob o Governo de Deus' : 'Spiritual Mandate (II) — Marriage Is Under God\'s Rule'} delay={0.23}>
            <Verso ref="Salmo 103.19" texto="O Senhor estabeleceu nos céus o seu trono, e o seu reino domina sobre tudo." />
            <Txt>{`As linhas diagonais do diagrama, marcadas "Reino", envolvem toda a figura. Nada no casamento de vocês vai ficar fora do governo de Deus — nem as finanças, nem a intimidade, nem as brigas, nem a rotina do dia a dia. Isso não é uma ameaça; é uma proteção. Significa que vocês não vão precisar resolver tudo sozinhos, pelo próprio critério — há um Rei que já estabeleceu o padrão certo e que caminha com vocês em cada decisão.\n\nIsso aponta para Cristo e o Espírito: o Reino que envolve o casamento de vocês foi inaugurado por Jesus (Marcos 1.15) e é vivido, no dia a dia, pelo poder do Espírito Santo — "o Reino de Deus... é justiça, paz e alegria no Espírito Santo" (Romanos 14.17). Render-se ao governo de Deus é, na prática, render-se ao senhorio de Cristo, sustentado pelo Espírito.`}</Txt>
          </Bloco>

          {/* III */}
          <Bloco titulo={pt ? 'Mandato Espiritual (III) — O Casamento É Pacto, Não Contrato' : 'Spiritual Mandate (III) — Marriage Is Covenant, Not Contract'} delay={0.26}>
            <Verso ref="Malaquias 2.14" texto="Ela é tua companheira e a mulher da tua aliança." />
            <Verso ref="Gênesis 2.24" texto="Por isso deixará o homem pai e mãe e se unirá à sua mulher, e serão uma só carne." />
            <Txt>{`Um contrato pode ser desfeito quando uma das partes não cumpre sua parte. Um pacto bíblico é diferente: é uma promessa feita diante de Deus, que Ele mesmo testemunha e sustenta. Malaquias chama a esposa de "mulher da aliança" — não "parceira contratual". É isso que vocês estão prestes a viver: não um acordo que pode ser cancelado quando as coisas ficarem difíceis, mas um pacto diante de Deus, que Ele mesmo vai ajudar vocês a cumprir.\n\nIsso aponta para Cristo e o Espírito: nenhum casal cumpre perfeitamente sua parte no pacto — por isso Deus enviou Jesus como o Mediador de uma aliança melhor, que garante o que nós não conseguimos garantir sozinhos (Hebreus 8.6; 9.15). E é o Espírito Santo quem cumpre em nós a promessa antiga: "Porei dentro de vós o meu Espírito" (Ezequiel 36.26-27) — Ele nos capacita a viver fiéis à aliança que vocês vão fazer.`}</Txt>
          </Bloco>

          {/* IV */}
          <Bloco titulo={pt ? 'Mandato Social e Mandato Cultural — Chamados para uma Missão' : 'Social and Cultural Mandate — Called to a Mission'} delay={0.29}>
            <Verso ref="Gênesis 1.28" texto="Deus os abençoou e disse: sede fecundos, multiplicai-vos, enchei a terra e sujeitai-a." />
            <Txt>{`No centro do diagrama estão os "Mediadores (agentes)" — o próprio casal, e não Cristo, que é o único Mediador entre Deus e os homens (1 Timóteo 2.5). Da união de vocês nascem coisas: uma casa organizada (Mandato Social) e uma influência que chega ao trabalho, à cidade, à arte, à igreja (Mandato Cultural). O casamento cristão não existe só para fazer os dois felizes — embora a alegria seja parte real do plano de Deus. Ele existe para que, unidos, vocês representem a aliança de Deus no mundo: em casa, no trabalho, na vizinhança, na igreja.\n\nIsso aponta para Cristo e o Espírito: a missão de gerar fruto para o mundo — que começou em Gênesis como mandato cultural — é retomada e ampliada por Jesus na Grande Comissão: "fazei discípulos de todas as nações" (Mateus 28.18-20). E é o Espírito Santo quem dá poder para essa missão (Atos 1.8). O casamento de vocês participa, em pequena escala, da grande obra de Deus na história da redenção — do jardim do Éden até a nova criação.`}</Txt>
          </Bloco>

          {/* Para conversar */}
          <Bloco titulo={pt ? 'Para Conversar em Casal' : 'Couple Discussion'} delay={0.32}>
            <div style={{ marginBottom: 12, fontSize: 'clamp(12px,1.6vw,13.5px)', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>
              {pt ? 'Reservem alguns minutos, só vocês dois, para conversar e escrever as respostas abaixo. Não existe resposta certa — o objetivo é começar a colocar em palavras o que vocês pensam e sentem sobre o casamento.' : 'Set aside a few minutes, just the two of you, to talk and write down your answers below. There is no right answer — the goal is to begin putting into words what you think and feel about marriage.'}
            </div>
            <Pergunta n={1} texto={'Até hoje, o que vocês vinham considerando como a “base” do nosso relacionamento? Como isso se compara com a ideia de que o casamento nasce da comunhão de Deus?'} />
            <Pergunta n={2} texto={'Existe alguma área da nossa vida que já tratamos como “assunto nosso”, fora do que a Palavra de Deus ensina? Qual?'} />
            <Pergunta n={3} texto="Se o nosso casamento vai ser uma aliança testemunhada por Deus, e não um contrato entre nós, o que isso muda na forma como vamos encarar os momentos difíceis?" />
            <Pergunta n={4} texto={'Que “fruto para fora” — família, trabalho, igreja, cidade — nós sonhamos em gerar juntos, além da nossa própria felicidade?'} />
            <Pergunta n={5} texto="Em qual dos quatro pontos de hoje mais precisamos lembrar que é Jesus quem cumpre por nós, e o Espírito Santo quem nos capacita — e não o nosso próprio esforço?" />
          </Bloco>

          {/* Nosso combinado */}
          <Bloco titulo={pt ? 'Nosso Combinado' : 'Our Commitment'} delay={0.35}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <div style={{ fontSize: 'clamp(13px,1.7vw,14.5px)', color: 'rgba(255,255,255,0.70)', marginBottom: 6 }}>{pt ? 'Vamos priorizar os encontros deste curso porque...' : 'We will prioritize the sessions of this course because...'}</div>
                <div style={{ height: 36, borderBottom: '1px solid rgba(255,200,80,0.20)', borderRadius: 0 }} />
              </div>
              <div>
                <div style={{ fontSize: 'clamp(13px,1.7vw,14.5px)', color: 'rgba(255,255,255,0.70)', marginBottom: 6 }}>{pt ? 'Uma pergunta que queremos levar para o próximo encontro é...' : 'A question we want to bring to the next session is...'}</div>
                <div style={{ height: 36, borderBottom: '1px solid rgba(255,200,80,0.20)' }} />
              </div>
            </div>
          </Bloco>

          {/* Para guardar */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.38 }}
            style={{ borderRadius: 14, background: 'rgba(255,200,80,0.10)', border: `1.5px solid ${GOLD_BD}`, padding: '22px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>{pt ? 'Para Guardar no Coração' : 'To Keep in Your Heart'}</div>
            <div style={{ fontSize: 'clamp(15px,2.2vw,18px)', fontWeight: 800, color: 'rgba(255,255,255,0.88)', lineHeight: 1.5, marginBottom: 10, fontStyle: 'italic' }}>
              {pt ? '"E o cordão de três dobras não se quebra tão depressa."' : '"A threefold cord is not quickly broken."'}
            </div>
            <div style={{ fontSize: 11, color: GOLD, fontWeight: 700, letterSpacing: '0.12em', marginBottom: 14 }}>Eclesiastes 4.12</div>
            <div style={{ fontSize: 'clamp(13px,1.7vw,14.5px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.80 }}>
              {pt ? 'Que o casamento de vocês seja, desde já, um cordão de três dobras: você, seu noivo ou noiva, e Deus no centro, segurando tudo junto. Essa história não começa em vocês, nem termina em vocês. Ela começou no jardim do Éden, foi restaurada por Jesus na cruz, é sustentada hoje pelo Espírito Santo, e aponta para as bodas do Cordeiro (Apocalipse 19.7-9) — o casamento final entre Cristo e a Sua Igreja. O casamento de vocês é um pequeno reflexo dessa grande história.' : 'May your marriage be, from this moment on, a threefold cord: you, your fiancé or fiancée, and God at the center, holding everything together. This story did not begin with you, nor does it end with you. It began in the Garden of Eden, was restored by Jesus on the cross, is sustained today by the Holy Spirit, and points to the Wedding of the Lamb (Revelation 19.7-9) — the final marriage between Christ and His Church. Your marriage is a small reflection of that great story.'}
            </div>
          </motion.div>

          {/* Referências */}
          <Bloco titulo={pt ? 'Referências' : 'References'} delay={0.41}>
            {[
              'BAVINCK, Herman. Reformed Dogmatics. Grand Rapids: Baker Academic, 2003-2008. 4 v.',
              'BERKHOF, Louis. Teologia Sistemática. São Paulo: Cultura Cristã, 2014.',
              'CALVINO, João. As Institutas da Religião Cristã. São Paulo: Cultura Cristã, 2006.',
              'CONFISSÃO DE FÉ BATISTA DE 1689. São Paulo: Editora Fiel, 2004.',
              'CONFISSÃO DE FÉ DE WESTMINSTER. São Paulo: Cultura Cristã, 1999.',
              'DEVER, Mark. As Nove Marcas de uma Igreja Saudável. São Paulo: Editora Fiel, 2011.',
              'GRUDEM, Wayne. Teologia Sistemática. São Paulo: Vida Nova, 1999.',
              'HORTON, Michael. Introducing Covenant Theology. Grand Rapids: Baker Books, 2006.',
              'KLINE, Meredith G. Kingdom Prologue. Eugene: Wipf & Stock, 2006.',
              'KUYPER, Abraham. Calvinismo. São Paulo: Cultura Cristã, 2005.',
              'OWEN, John. A Comunhão com Deus. São Paulo: Editora Fiel, 2004.',
              'ROBERTSON, O. Palmer. O Cristo das Alianças. São Paulo: Cultura Cristã, 2010.',
              'SPROUL, R. C. Verdades que Sabemos. São Paulo: Cultura Cristã, 2015.',
              'SPURGEON, Charles Haddon. Teologia Sistemática de Spurgeon. Rio de Janeiro: CPAD, 2013.',
              'VAN GRONINGEN, Gerard. Messianic Revelation in the Old Testament. Grand Rapids: Baker Book House, 1990.',
              'VOS, Geerhardus. Teologia Bíblica: Antigo e Novo Testamento. São Paulo: Cultura Cristã, 2010.',
            ].map((ref, i) => (
              <div key={i} style={{ fontSize: 'clamp(11px,1.5vw,12.5px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, borderBottom: i < 15 ? '1px solid rgba(255,255,255,0.05)' : 'none', padding: '6px 0' }}>
                {ref}
              </div>
            ))}
          </Bloco>

        </div>
      </div>
      <FlagToggle lang={lang} setLang={setLang} />
    </div>
  );
}

// ─── Aula 02 — Princípios Bíblicos de Comunicação ────────────────────
export function Aula02() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'pt'|'en'>('pt');
  const pt = lang === 'pt';
  const onBack = () => navigate('/familia/noivos');
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.white }}>
      <Navbar lang={lang} />
      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(90px,11vw,110px) clamp(16px,4vw,32px) 100px' }}>

        {/* Voltar */}
        <div style={{ marginBottom: 32 }}>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,200,80,0.70)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            {pt ? '← Aulas' : '← Lessons'}
          </button>
        </div>

        {/* Cabeçalho */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10, padding: '4px 12px', borderRadius: 7, background: GOLD_B, border: `1px solid ${GOLD_BD}` }}>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,200,80,0.75)' }}>{pt ? 'Curso de Noivos · Material do Aluno' : 'Pre-Wedding Course · Student Material'}</span>
          </div>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', marginBottom: 14 }}>
            {pt ? 'Aula 2 · Encontro 2' : 'Lesson 2 · Session 2'}
          </div>
          <h1 style={{ fontSize: 'clamp(26px,4.8vw,46px)', fontWeight: 900, lineHeight: 1.12, margin: '0 0 10px', background: `linear-gradient(135deg,rgba(255,255,255,0.95) 0%,${GOLD} 58%,rgba(255,230,140,0.72) 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {pt ? 'Princípios Bíblicos de Comunicação' : 'Biblical Principles of Communication'}
          </h1>
          <p style={{ fontSize: 'clamp(13px,1.8vw,15px)', color: 'rgba(255,255,255,0.42)', lineHeight: 1.70, fontStyle: 'italic', margin: '0 0 20px' }}>
            {pt ? 'A fala nasceu antes do pecado — e pode ser restaurada pelo Evangelho' : 'Speech was born before sin — and can be restored by the Gospel'}
          </p>
        </motion.div>

        {/* Abertura estatística */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }} style={{ marginBottom: 36, padding: '18px 22px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)' }}>
          <Txt>{`Dados do IBGE mostram que, em 2024, o Brasil registrou 428.301 divórcios, para cerca de 949 mil casamentos civis — uma proporção de aproximadamente 45,7 divórcios para cada 100 casamentos registrados no país.¹\n\nMais grave: quase metade (47,8%) dos divórcios ocorre em menos de dez anos após o casamento, e o tempo médio entre casamento e divórcio caiu de 15,9 anos (2010) para 13,8 anos (2023). Os casamentos brasileiros estão sendo destruídos mais cedo, não mais tarde — o que torna a formação pré-matrimonial, incluindo comunicação, uma intervenção com janela de tempo estreita.²\n\nA urgência teológica, porém, não nasce da estatística — nasce do fato de que a fala é anterior à Queda, parte do desenho original de Deus tanto para a criação quanto para o casamento.`}</Txt>
          {/* Notas de rodapé */}
          <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: 'clamp(10px,1.3vw,11.5px)', color: 'rgba(255,255,255,0.38)', lineHeight: 1.75 }}>
              <div style={{ marginBottom: 4 }}>¹ INSTITUTO BRASILEIRO DE GEOGRAFIA E ESTATÍSTICA (IBGE). <em>Estatísticas do Registro Civil 2024.</em> Rio de Janeiro: IBGE, 2025.</div>
              <div>² INSTITUTO BRASILEIRO DE FAMÍLIA E DIREITO DAS FAMÍLIAS (IBDFAM), com base em dados do IBGE — <em>Estatísticas do Registro Civil 2023,</em> divulgação de 2025: 47,8% dos divórcios brasileiros com informação de data ocorreram em menos de dez anos de união, ante 42,8% em 2013; tempo médio entre casamento e divórcio caiu de 15,9 anos (2010) para 13,8 anos (2023).</div>
            </div>
          </div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          {/* Parte 1 — Cinco Níveis */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 14px', borderRadius: 7, background: 'rgba(255,200,80,0.10)', border: `1px solid ${GOLD_BD}`, marginBottom: 16 }}>
              <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD }}>{pt ? 'Parte 1 de 2 · Os Cinco Níveis de Comunicação' : 'Part 1 of 2 · The Five Levels of Communication'}</span>
            </div>
          </motion.div>

          <Bloco titulo={pt ? 'Nível 1 — Clichê' : 'Level 1 — Cliché'} delay={0.10}>
            <Txt>{`Ela pergunta: "Como foi seu dia?" Ele responde: "Foi bom, correria normal." — Ou, dez anos de casados: "E aí?" — "Tudo certo, as crianças já jantaram." — "Ótimo."\n\nTroca de informação de superfície. Não há risco, não há revelação. A maioria das conversas do cotidiano começa aqui — o problema é quando nunca sai daqui.`}</Txt>
          </Bloco>

          <Bloco titulo={pt ? 'Nível 2 — Fatos e Informações' : 'Level 2 — Facts and Information'} delay={0.12}>
            <Txt>{`Noivos: "O cerimonial confirmou a igreja para dia 14. Preciso te enviar o orçamento do buffet."\nCasados: "A conta de luz veio mais alta. Marquei a consulta do pediatra pra quinta. Busca as crianças amanhã?"\n\nLogística eficiente. Necessária, mas insuficiente. Um casal que vive no nível 2 administra a vida juntos, mas não a compartilha.`}</Txt>
          </Bloco>

          <Bloco titulo={pt ? 'Nível 3 — Opiniões e Julgamentos' : 'Level 3 — Opinions and Judgments'} delay={0.14}>
            <Verso ref="Provérbios 18.13" texto="O que responde antes de ouvir, estultícia lhe é, e vergonha." />
            <Verso ref="Tiago 1.19" texto="...seja todo homem pronto para ouvir, tardio para falar, tardio para se irar." />
            <Txt>{`"Acho que devíamos morar mais perto da sua igreja... mas se você preferir perto do meu trabalho, também dá certo, não é bem uma exigência."\n\nA autodesqualificação da opinião ("talvez seja só impressão minha") frequentemente não é humildade genuína — é medo disfarçado de humildade, porque antecipa rejeição sem testar se ela viria. A correção bíblica não é falar mais opinião com mais força, mas criar, através da escuta genuína do outro, segurança suficiente para que a opinião seja dita sem capa protetora.`}</Txt>
          </Bloco>

          <Bloco titulo={pt ? 'Nível 4 — Sentimentos e Emoções' : 'Level 4 — Feelings and Emotions'} delay={0.16}>
            <Verso ref="Efésios 4.25" texto="Pelo que deixai a mentira, e falai a verdade cada um com o seu próximo; porque somos membros uns dos outros." />
            <Verso ref="Efésios 4.32" texto="...sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo." />
            <Txt>{`"Quando você demora pra responder, eu me sinto ansiosa, como se não fosse prioridade pra você. Isso vem de coisas que vivi antes de te conhecer, mas preciso te contar."\n\nSentimento não expresso ao cônjuge, na lógica de Paulo, não é apenas reserva pessoal — é o corpo escondendo informação de si mesmo. O texto exige verdade emocional, não apenas factual. Mas Ef 4.32 fornece a condição que torna essa exposição segura: perdão com base no padrão do perdão de Deus em Cristo. Sem essa segurança teológica, ninguém se arrisca ao nível 4.`}</Txt>
          </Bloco>

          <Bloco titulo={pt ? 'Nível 5 — Comunicação Plena' : 'Level 5 — Full Communication'} delay={0.18}>
            <Verso ref="Gênesis 2.25" texto="E ambos estavam nus, o homem e a sua mulher; e não se envergonhavam." />
            <Verso ref="1 João 1.7" texto="...e o sangue de Jesus Cristo, seu Filho, nos purifica de todo o pecado." />
            <Txt>{`"Tenho medo de repetir o casamento dos meus pais — às vezes te trato com a desconfiança que aprendi lá em casa. Preciso da sua ajuda pra não fazer isso, e quero que me avise quando perceber, mesmo que eu me incomode na hora."\n\nGênesis 2.25 fecha a narrativa da criação antes da Queda — nudez sem vergonha é o estado original da intimidade conjugal, não uma conquista terapêutica moderna. Nível 5 não é alcançável por técnica de comunicação — é fruto de uma segurança teológica: a certeza de que ser plenamente conhecido não resulta em rejeição, porque em Cristo o casal já foi plenamente conhecido por Deus e plenamente aceito.`}</Txt>
          </Bloco>

          <Bloco titulo={pt ? 'Nível de Ruptura — Silêncio Defensivo' : 'Breakdown Level — Defensive Silence'} delay={0.20}>
            <Verso ref="Gênesis 3.8–10" texto='E ouviram a voz do Senhor Deus, que passeava no jardim... e escondeu-se Adão e sua mulher da presença do Senhor Deus... "Onde estás?" E ele disse: "Ouvi a tua voz soar no jardim, e temi, porque estava nu, e escondi-me."' />
            <Txt>{`Depois de discutir a lista de convidados, ela para de comentar sobre o casamento por três dias. Ele pergunta se está tudo bem. Ela: "Tá tudo bem" — num tom que diz o contrário.\n\nEste é o primeiro relato de retirada relacional na Escritura. O esconderijo não é neutro — é resposta ativa ao medo de exposição. Deus não aceita o silêncio como resposta suficiente: Ele pergunta diretamente "onde estás?" para forçar a verbalização do que estava sendo evitado. A pergunta de Deus é o modelo pastoral para lidar com o silêncio defensivo no casamento: não se aceita a retirada como solução; ela é gentilmente confrontada e nomeada.`}</Txt>
          </Bloco>

          {/* Parte 2 — Princípios */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.22 }} style={{ marginTop: 8 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 14px', borderRadius: 7, background: 'rgba(52,211,153,0.10)', border: '1px solid rgba(52,211,153,0.35)', marginBottom: 16 }}>
              <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: SPIRIT }}>{pt ? 'Parte 2 de 2 · Sete Princípios Bíblicos' : 'Part 2 of 2 · Seven Biblical Principles'}</span>
            </div>
            <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 8 }}>
              {pt ? 'Se vocês tivessem que escolher: preferiam um casamento com muito amor e pouca habilidade de conversar, ou um casamento com pouca intensidade de sentimento e excelente capacidade de conversar sobre qualquer assunto? A Bíblia não separa essas duas coisas.' : 'If you had to choose: would you prefer a marriage with great love and poor communication skills, or a marriage with low emotional intensity but excellent ability to discuss anything? The Bible does not separate these two things.'}
            </div>
          </motion.div>

          <Bloco titulo={pt ? 'Princípio 1 — Verdade com Amor' : 'Principle 1 — Truth in Love'} delay={0.24}>
            <Verso ref="Efésios 4.15, 25" texto="Antes, seguindo a verdade em amor, cresçamos em tudo naquele que é a cabeça, Cristo. [...] Pelo que deixai a mentira, e falai a verdade cada um com o seu próximo; porque somos membros uns dos outros." />
            <Txt>{`Paulo funde aqui os dois polos que a Queda separou: verdade (que a serpente distorceu) e amor (que Adão destruiu ao culpar Eva). Verdade sem amor vira arma. Amor sem verdade vira sentimentalismo vazio que evita qualquer assunto difícil. O casal cristão é chamado às duas coisas ao mesmo tempo, não a escolher uma.\n\n🗣 Dinâmica — Duas Colunas: peçam exemplos de frases que seriam "verdade sem amor" (ex.: "Você sempre estraga tudo") e "amor sem verdade" (ex.: "Tá tudo bem, não precisa comentar nada"). Para cada exemplo, reescrevam como "verdade com amor" (ex.: "Isso me machucou, e preciso te contar porque nos importamos um com o outro"). Perceberam que verdade com amor exige mais coragem que as duas outras opções?`}</Txt>
          </Bloco>

          <Bloco titulo={pt ? 'Princípio 2 — Escuta antes da Fala' : 'Principle 2 — Listen Before You Speak'} delay={0.26}>
            <Verso ref="Tiago 1.19" texto="...seja todo homem pronto para ouvir, tardio para falar, tardio para se irar." />
            <Verso ref="Provérbios 18.13" texto="O que responde antes de ouvir, estultícia lhe é, e vergonha." />
            <Txt>{`A ordem de Tiago não é aleatória: escuta lenta evita fala apressada, que evita ira. A Bíblia trata boa fala como consequência de boa escuta — não o contrário. A maioria dos conflitos conjugais não nasce de má intenção, mas de resposta formulada antes de a escuta terminar.\n\n🗣 Dinâmica — Repetir Antes de Responder: Um compartilha, por 1 minuto, algo real que sente sobre a preparação do casamento. Antes de responder, o outro precisa repetir com suas próprias palavras o que ouviu, até o primeiro confirmar: "sim, é isso mesmo." Só então o segundo responde. Invertam os papéis. Foi mais difícil repetir corretamente, ou segurar a vontade de já responder?`}</Txt>
          </Bloco>

          <Bloco titulo={pt ? 'Princípio 3 — Ira sem Pecado' : 'Principle 3 — Anger Without Sin'} delay={0.28}>
            <Verso ref="Efésios 4.26" texto="Irai-vos, e não pequeis; não se ponha o sol sobre a vossa ira." />
            <Txt>{`O texto grego distingue orgé (ira legítima e temporária) de parorgismós (indignação retida, processada em silêncio, que se converte em ressentimento acumulado — é essa forma que o texto proíbe ao dizer "não se ponha o sol"). A Escritura não pede supressão emocional. Pede processamento não adiado. Guardar mágoa "para não brigar" desobedece este texto tanto quanto explodir em fúria.\n\nNota pastoral: "não se ponha o sol" não significa resolver tudo em uma única conversa antes de dormir a qualquer custo — significa não deixar a indignação apodrecer em silêncio por dias ou semanas. Alguns temas exigem mais de uma conversa; o que o texto proíbe é o acúmulo silencioso, não a paciência para tratar bem um assunto complexo.\n\n🗣 Dinâmica — O Prazo do Sol: Cada um pensa em algo pequeno que ficou "engasgado" nas últimas duas semanas. Em dupla, compartilhem: "Eu me senti [sentimento] quando [situação], e eu ainda não tinha te contado isso." O outro responde apenas ouvindo e agradecendo — sem se defender ainda. O que fica mais pesado: o conflito resolvido na hora, ou o silêncio guardado por dias?`}</Txt>
          </Bloco>

          <Bloco titulo={pt ? 'Princípio 4 — Fala que Edifica' : 'Principle 4 — Speech that Builds Up'} delay={0.30}>
            <Verso ref="Efésios 4.29" texto="Não saia da vossa boca nenhuma palavra torpe, mas só a que for boa para edificação, para que dê graça aos que a ouvem." />
            <Verso ref="Colossenses 4.6" texto="A vossa palavra seja sempre agradável, temperada com sal." />
            <Txt>{`O verbo grego para "edificação" (oikodomé) é literalmente construção civil. Paulo propõe um teste funcional: cada fala deveria passar por duas perguntas — "isso é verdade?" (Ef 4.25) e "isso constrói?" (Ef 4.29). A ausência de qualquer uma das duas é desobediência — dizer uma verdade que apenas destrói não cumpre o texto tanto quanto mentir.\n\n🗣 Dinâmica — Teste da Edificação: Cada um pensa numa frase que já disse ao outro, ou pretende dizer, sobre algo difícil (família, dinheiro, hábito que incomoda). Aplica o teste: "Isso é verdade? Isso edifica?" Se falhar em qualquer um dos dois testes, reescreva a frase.`}</Txt>
          </Bloco>

          <Bloco titulo={pt ? 'Princípio 5 — Evite Aborrecer' : 'Principle 5 — Avoid Nagging'} delay={0.32}>
            <Verso ref="Provérbios 10.19" texto="Na multidão de palavras não faltará transgressão, mas o que modera os seus lábios é prudente." />
            <Verso ref="Provérbios 21.1" texto="Como ribeiros de águas, assim é o coração do rei na mão do Senhor; a tudo quanto quer o inclina." />
            <Txt>{`Provérbios 10.19 não condena falar muito por si só — condena a probabilidade de que, quanto mais palavras, maior a chance de alguma delas ferir. "Aborrecer" aqui é o desgaste acumulado de repetir a mesma queixa até que a mensagem perca força e passe a ser ruído, não comunicação.\n\nProvérbios 21.1 é aplicado aqui por extensão pastoral: se até o coração de um rei está na mão do Senhor para ser inclinado, nenhum cônjuge precisa insistir, pressionar ou repetir um argumento dez vezes para "vencer" a vontade do outro. A confiança de que Deus é quem realmente move corações liberta o casal da compulsão de aborrecer o outro até obter concordância pela exaustão.\n\n🗣 Dinâmica — Editando o Discurso: Cada um escreve um pedido ou queixa que já repetiu ao outro mais de três vezes. Reduzam a frase ao essencial. Combinem: dizer essa versão uma vez, e depois entregar o resultado a Deus. O que muda quando vocês confiam que Deus pode tocar o coração do outro?`}</Txt>
          </Bloco>

          <Bloco titulo={pt ? 'Princípio 6 — Repita as Frases Essenciais' : 'Principle 6 — Repeat the Essential Phrases'} delay={0.34}>
            <Verso ref="Efésios 4.32" texto="...sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo." />
            <Txt>{`Benignidade (chrestotes) não é traço de personalidade estático — é qualidade que se pratica em atos concretos e repetidos. Repetir frases simples — por favor, obrigado(a), eu te amo, me desculpa, eu te perdoo — não é vazio nem infantil: é a versão verbal, diária e miniatura, do mesmo perdão "como também Deus vos perdoou em Cristo".\n\n🗣 Dinâmica — Vocabulário do Amor: Cinco frases essenciais: "Por favor" · "Obrigado(a)" · "Eu te amo" · "Me desculpa" · "Eu te perdoo". Qual dessas frases vocês dizem menos um ao outro hoje? Comprometam-se a dizer, ao menos uma vez por dia nesta semana, a frase que menos costumam dizer. Vocês não vão sentir isso todos os dias com a mesma intensidade — e não precisam. A frase carrega o compromisso mesmo quando o sentimento ainda não alcançou.`}</Txt>
          </Bloco>

          <Bloco titulo={pt ? 'Princípio 7 — Não Culpe nem Critique' : 'Principle 7 — Do Not Blame or Criticize'} delay={0.36}>
            <Verso ref="Gálatas 6.1" texto="Irmãos, se um homem chegar a ser surpreendido em algum delito, vós, que sois espirituais, encaminhai o tal com espírito de mansidão, considerando-te a ti mesmo, para que não sejas também tentado." />
            <Txt>{`O verbo grego para "encaminhar" (katartizo) é o mesmo usado em Marcos 1.19 para os pescadores consertando as redes — e em contextos médicos gregos para reduzir uma fratura óssea. Restaurar, no vocabulário de Paulo, não é apontar o erro e se afastar — é o trabalho cuidadoso de recolocar algo quebrado em seu lugar.\n\nNote a condição final: "considerando-te a ti mesmo, para que não sejas também tentado" — a autocrítica antecede a crítica do outro. Isso ecoa Mateus 7.3–5 e serve como freio contra o padrão de crítica que Provérbios já havia advertido. Confrontar uma falha do cônjuge segue a lógica de katartizo — mansidão, consciência da própria vulnerabilidade ao mesmo pecado, e o objetivo de reparar, não de vencer a discussão.\n\n🗣 Dinâmica — Encaminhar em vez de Acusar: Cada um escreve uma frase de crítica no formato "você sempre..." ou "você nunca...". Reescrevam seguindo a estrutura de Gl 6.1: nomear o fato com mansidão + reconhecer a própria vulnerabilidade ao mesmo tipo de falha. Exemplo: "Você sempre chega atrasado" → "Percebi que você atrasou de novo — e eu sei que também falho em compromissos às vezes. Podemos conversar sobre isso com calma?"`}</Txt>
          </Bloco>

          {/* Para conversar */}
          <Bloco titulo={pt ? 'Para Conversar em Casal' : 'Couple Discussion'} delay={0.38}>
            <div style={{ marginBottom: 12, fontSize: 'clamp(12px,1.6vw,13.5px)', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>
              {pt ? 'Reservem alguns minutos, só vocês dois. Não existe resposta certa — o objetivo é começar a nomear padrões reais.' : 'Set aside a few minutes, just the two of you. There is no right answer — the goal is to begin naming real patterns.'}
            </div>
            <Pergunta n={1} texto="Individualmente: quando estou magoado(a) ou com medo na nossa relação, meu padrão mais comum é: (a) atacar/acusar, (b) me calar e me afastar, (c) minimizar e fingir que está tudo bem, (d) outro — qual?" />
            <Pergunta n={2} texto="Isso é falha de personalidade, ou é o mesmo padrão de Adão e Eva se escondendo entre as árvores? O que muda para você ao pensar assim?" />
            <Pergunta n={3} texto="Dos sete princípios de hoje, qual vocês precisam praticar com mais urgência como casal? Por quê?" />
            <Pergunta n={4} texto="Que frase do Vocabulário do Amor (Princípio 6) vocês vão se comprometer a dizer mais esta semana?" />
          </Bloco>

          {/* Compromisso escrito */}
          <Bloco titulo={pt ? 'Carta de Compromisso' : 'Commitment Letter'} delay={0.40}>
            <Txt>{pt ? 'Escolham, dos sete princípios trabalhados hoje, um que mais precisam praticar nas próximas semanas. Escrevam juntos uma frase concreta de compromisso abaixo — o líder de casais guardará e devolverá no encerramento do curso.' : 'Choose, from the seven principles covered today, the one you most need to practice in the coming weeks. Write together a concrete commitment phrase below — the couples leader will keep it and return it at the end of the course.'}</Txt>
            <div style={{ marginTop: 16, height: 48, borderBottom: '1px solid rgba(255,200,80,0.20)' }} />
            <div style={{ marginTop: 16, fontSize: 'clamp(12px,1.6vw,13.5px)', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>
              {pt ? 'Oração de encerramento: Adoração (pela fala como dom de Deus) → Confissão (dos padrões de Queda nomeados hoje) → Petição (por graça para verdade com amor, escuta, ira sem pecado, fala que edifica) → Consagração (cada casal, nominalmente).' : 'Closing prayer: Worship (for speech as God\'s gift) → Confession (of the Fall patterns named today) → Petition (for grace toward truth in love, listening, anger without sin, speech that builds up) → Consecration (each couple, by name).'}
            </div>
          </Bloco>

          {/* Versículo-síntese */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.42 }}
            style={{ borderRadius: 14, background: 'rgba(255,200,80,0.10)', border: `1.5px solid ${GOLD_BD}`, padding: '22px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>{pt ? 'Versículo-Síntese' : 'Key Verse'}</div>
            <div style={{ fontSize: 'clamp(15px,2.2vw,18px)', fontWeight: 800, color: 'rgba(255,255,255,0.88)', lineHeight: 1.5, marginBottom: 10, fontStyle: 'italic' }}>
              "Antes, seguindo a verdade em amor, cresçamos em tudo naquele que é a cabeça, Cristo."
            </div>
            <div style={{ fontSize: 11, color: GOLD, fontWeight: 700, letterSpacing: '0.12em' }}>Efésios 4.15</div>
          </motion.div>

          {/* Referências */}
          <Bloco titulo={pt ? 'Referências' : 'References'} delay={0.44}>
            {[
              'EGGERICHS, Emerson. Amor e Respeito. São Paulo: Mundo Cristão, 2005.',
              'HARLEY, Willard F. Amantes ou Cúmplices? O Segredo de um Casamento Feliz. Rio de Janeiro: CPAD, 2011.',
              'HARVEY, Dave. When Sinners Say I Do: Discovering the Power of the Gospel for Marriage. Shepherdsville: Shepherd Press, 2007.',
              'KELLER, Timothy; KELLER, Kathy. O Significado do Casamento. Rio de Janeiro: Vida Nova, 2012.',
            ].map((ref, i) => (
              <div key={i} style={{ fontSize: 'clamp(11px,1.5vw,12.5px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none', padding: '6px 0' }}>
                {ref}
              </div>
            ))}
          </Bloco>

        </div>
      </div>
      <FlagToggle lang={lang} setLang={setLang} />
    </div>
  );
}

// ─── Hub landing ─────────────────────────────────────────────────────
const HUB_ITEMS = [
  {
    id: 'esbocos',
    icon: '📖',
    title: 'Esboços Bíblicos\nExpositivos',
    desc: 'Esboços homiléticos expositivos por livro e perícope — CFW, CFB, autores reformados e aplicações para cada etapa familiar.',
    color: 'rgba(52,211,153,1)',
    colorB: 'rgba(52,211,153,0.18)',
    colorBorder: 'rgba(52,211,153,0.45)',
    available: true,
  },
  {
    id: 'noivos',
    icon: '💍',
    title: 'Preparatório\npara Noivos',
    desc: 'Conteúdo expositivo e reformado para noivos — fundamentos bíblicos do casamento, aliança, complementaridade e vocação conjugal.',
    color: 'rgba(255,200,80,1)',
    colorB: 'rgba(255,200,80,0.14)',
    colorBorder: 'rgba(255,200,80,0.42)',
    available: true,
  },
  {
    id: 'casados',
    icon: '🏡',
    title: 'Para Casados',
    desc: 'Recursos homiléticos e devocionais para fortalecer o casamento — liderança, submissão, resolução de conflitos e legado geracional.',
    color: 'rgba(80,200,255,1)',
    colorB: 'rgba(80,200,255,0.13)',
    colorBorder: 'rgba(80,200,255,0.40)',
    available: false,
  },
];

export function FamiliaHub() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'pt'|'en'>('pt');
  const pt = lang === 'pt';
  const onSelect = (id: string) => navigate(`/familia/${id}`);
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.white }}>
      <Navbar lang={lang} />
      <div style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(90px,11vw,110px) clamp(16px,4vw,32px) 80px' }}>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} style={{ marginBottom: 52, textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            fontSize: 'clamp(10px,1.4vw,12px)', fontWeight: 900, letterSpacing: '0.32em',
            textTransform: 'uppercase', marginBottom: 16,
            background: 'linear-gradient(90deg,rgba(52,211,153,1),rgba(110,231,183,1))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {pt ? 'Recursos para a Família Cristã' : 'Resources for the Christian Family'}
          </div>
          <h1 style={{
            fontSize: 'clamp(30px,5.5vw,52px)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 18px',
            background: 'linear-gradient(135deg,rgba(255,255,255,0.95) 0%,rgba(52,211,153,0.88) 55%,rgba(110,231,183,0.72) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {pt ? 'Família' : 'Family'}
          </h1>
          <p style={{ fontSize: 'clamp(14px,2vw,17px)', color: 'rgba(255,255,255,0.52)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            {pt ? 'Escolha o recurso que deseja acessar. Novos módulos serão disponibilizados em breve.' : 'Choose the resource you want to access. New modules will be available soon.'}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
          {HUB_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.09 }}
              onClick={() => item.available && onSelect(item.id)}
              style={{
                position: 'relative',
                borderRadius: 18,
                background: item.available ? item.colorB : 'rgba(255,255,255,0.03)',
                border: `1.5px solid ${item.available ? item.colorBorder : 'rgba(255,255,255,0.08)'}`,
                padding: '28px 24px 26px',
                cursor: item.available ? 'pointer' : 'default',
                transition: 'transform 0.18s, box-shadow 0.18s',
                opacity: item.available ? 1 : 0.52,
                overflow: 'hidden',
              }}
              whileHover={item.available ? { scale: 1.025, boxShadow: `0 8px 40px ${item.colorBorder}` } : {}}
              whileTap={item.available ? { scale: 0.97 } : {}}
            >
              {/* top accent bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${item.color} 0%,transparent 100%)`, borderRadius: '18px 18px 0 0', opacity: item.available ? 1 : 0.3 }} />

              {/* Badge "Em breve" */}
              {!item.available && (
                <div style={{ position: 'absolute', top: 14, right: 14, fontSize: 9, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 6, padding: '3px 8px' }}>
                  {pt ? 'Em breve' : 'Coming soon'}
                </div>
              )}

              <div style={{ fontSize: 34, marginBottom: 14, lineHeight: 1 }}>{item.icon}</div>
              <div style={{ fontSize: 'clamp(16px,2.2vw,19px)', fontWeight: 800, color: item.available ? item.color : 'rgba(255,255,255,0.45)', lineHeight: 1.25, marginBottom: 12, whiteSpace: 'pre-line' }}>
                {item.title}
              </div>
              <p style={{ fontSize: 'clamp(12px,1.6vw,13.5px)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.65, margin: 0 }}>
                {item.desc}
              </p>

              {item.available && (
                <div style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: item.color }}>
                  {pt ? 'Acessar →' : 'Access →'}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <FlagToggle lang={lang} setLang={setLang} />
    </div>
  );
}

// ─── Para Casados (placeholder) ──────────────────────────────────────
export function CasadosPage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'pt'|'en'>('pt');
  const pt = lang === 'pt';
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.white }}>
      <Navbar lang={lang} />
      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(90px,11vw,110px) clamp(16px,4vw,32px) 80px' }}>
        <div style={{ marginBottom: 32 }}>
          <button onClick={() => navigate('/familia')} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(80,200,255,0.70)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            {pt ? '← Voltar' : '← Back'}
          </button>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', paddingTop: 60 }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🏡</div>
          <h1 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 900, color: 'rgba(80,200,255,1)', marginBottom: 16 }}>{pt ? 'Para Casados' : 'For Married Couples'}</h1>
          <p style={{ fontSize: 'clamp(14px,2vw,17px)', color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
            {pt ? 'Recursos homiléticos e devocionais para casais. Módulo em desenvolvimento — disponível em breve.' : 'Homiletical and devotional resources for couples. Module in development — available soon.'}
          </p>
        </motion.div>
      </div>
      <FlagToggle lang={lang} setLang={setLang} />
    </div>
  );
}

// ─── Infográfico Família Josué 1 ─────────────────────────────────────
function InfograficoJosueFamiliaSection({ pt }: { pt: boolean }) {
  const MOVES = [
    {
      num: 'I', sym: 'Js 1:1–5',
      title: pt ? 'A Palavra que Comissiona a Família' : 'The Word that Commissions the Family',
      sub: pt ? 'Deus fala no luto — "levanta-te e atravessa"' : 'God speaks in mourning — "rise and cross"',
      emoji: '📯',
      key: pt ? 'A comissão vem no luto, não depois dele. YHWH não espera condições perfeitas — Ele fala à família no momento mais difícil.' : 'The commission comes in mourning, not after it. YHWH does not wait for perfect conditions — He speaks to the family in the hardest moment.',
      app: pt ? 'Pais: não esperem o momento perfeito para liderar espiritualmente. A comissão de Deus para a família chega agora.' : 'Parents: don\'t wait for the perfect moment to lead spiritually. God\'s commission for the family comes now.',
      cor: 'rgba(255,180,50,1)', corL: 'rgba(255,180,50,0.10)', corB: 'rgba(255,180,50,0.28)',
    },
    {
      num: 'II', sym: 'Js 1:6–9',
      title: pt ? 'A Palavra que Forma Coragem no Lar' : 'The Word that Forms Courage at Home',
      sub: pt ? '"Não se aparte da tua boca este livro da Lei" — hagah diurno e noturno' : '"This Book of the Law shall not depart from your mouth" — day and night hagah',
      emoji: '📜',
      key: pt ? 'Hagah = ruminação em voz baixa. Sucesso vinculado à meditação, não ao esforço. "Sê forte e corajoso" 3× — a ordem produz o que ordena quando a Palavra é meditada.' : 'Hagah = audible rumination. Success tied to meditation, not effort. "Be strong and courageous" 3× — the command produces what it commands when the Word is meditated.',
      app: pt ? 'Casal e pais: estabeleçam leitura bíblica familiar diária. A família que rumina a Palavra cria filhos corajosos sem esforço artificial.' : 'Couples and parents: establish daily family Bible reading. The family that ruminates the Word raises courageous children without artificial effort.',
      cor: 'rgba(52,211,153,1)', corL: 'rgba(52,211,153,0.10)', corB: 'rgba(52,211,153,0.28)',
    },
    {
      num: 'III', sym: 'Js 1:10–18',
      title: pt ? 'A Família que Avança Junta em Solidariedade' : 'The Family that Advances Together in Solidarity',
      sub: pt ? '"Passareis armados diante de vossos irmãos" — ninguém descansa sozinho' : '"You shall pass over armed before your brothers" — no one rests alone',
      emoji: '🛡️',
      key: pt ? 'As tribos que já tinham herança acompanharam as que ainda lutavam. Na família: o filho estabelecido acompanha o pai idoso; os pais saudáveis apoiam o filho em crise. Ninguém descansa enquanto o irmão ainda luta.' : 'Tribes with inheritance accompanied those still fighting. In the family: the established child accompanies the aging parent; healthy parents support the child in crisis. No one rests while a sibling still fights.',
      app: pt ? 'Mapeiem quem na família ainda não entrou no repouso. Planejem uma ação concreta de solidariedade esta semana.' : 'Map who in the family has not yet entered rest. Plan a concrete solidarity action this week.',
      cor: 'rgba(80,200,255,1)', corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.28)',
    },
  ];

  const ACTIVITIES = [
    { n: '1', icon: '📖', text: pt ? 'Leiam Js 1:1-2 juntos. "O que estava acontecendo quando Deus falou? Quando Deus fala à nossa família — nos momentos difíceis ou fáceis?"' : 'Read Josh 1:1-2 together. "What was happening when God spoke? Does God speak to our family in hard moments or easy ones?"' },
    { n: '2', icon: '💬', text: pt ? 'Leiam Js 1:8. Cada membro sugere um momento do dia para "ruminar" a Palavra. Comprometam-se a fazer por 7 dias.' : 'Read Josh 1:8. Each member suggests a time of day to "ruminate" the Word. Commit to doing it for 7 days.' },
    { n: '3', icon: '✊', text: pt ? 'Contem quantas vezes aparece "sê forte e corajoso" (vv.6,7,9). "Por que 3 vezes? Que tipo de coragem Deus está ordenando?"' : 'Count how many times "be strong and courageous" appears (vv.6,7,9). "Why 3 times? What kind of courage is God commanding?"' },
    { n: '4', icon: '🤝', text: pt ? 'Leiam Js 1:14. "Que irmão na nossa família ou comunidade ainda está lutando enquanto nós já estamos em repouso? O que faremos?"' : 'Read Josh 1:14. "Which sibling in our family or community is still fighting while we are at rest? What will we do?"' },
    { n: '5', icon: '🙏', text: pt ? 'Cada membro nomeia um "Jordão" pessoal — algo que está evitando atravessar. Orem juntos pedindo coragem pela Palavra.' : 'Each member names a personal "Jordan" — something they are avoiding crossing. Pray together for courage through the Word.' },
    { n: '6', icon: '📝', text: pt ? 'Escrevam Js 1:9 em um papel e colem na geladeira ou espelho. Lembrem-se diariamente: "o SENHOR teu Deus é contigo por onde quer que andares."' : 'Write Josh 1:9 on paper and stick it on the fridge or mirror. Remember daily: "the LORD your God is with you wherever you go."' },
  ];

  const APPS_FAMILIA = [
    { role: pt ? 'Pais' : 'Parents', icon: '👨‍👩‍👧', text: pt ? 'Vocês são os "oficiais" de Js 1:10 — responsáveis por mobilizar a família para o avanço. Estabeleçam devoção familiar diária e liderem com exemplo.' : 'You are the "officers" of Josh 1:10 — responsible for mobilizing the family. Establish daily family devotion and lead by example.' },
    { role: pt ? 'Filhos' : 'Children', icon: '👦', text: pt ? 'A coragem que YHWH ordenou a Josué está disponível para vocês — não como sentimento, mas como produto da meditação. Leiam a Bíblia. A Palavra produz o que ordena.' : 'The courage YHWH commanded Joshua is available to you — not as a feeling, but as a product of meditation. Read the Bible. The Word produces what it commands.' },
    { role: pt ? 'Noivos' : 'Engaged', icon: '💍', text: pt ? 'Antes de casar, perguntem: "qual será nosso Jordão juntos?" e "como nossa devoção juntos nos preparará para atravessá-lo?" A família que começa com hagah chega ao outro lado.' : 'Before marrying, ask: "what will our Jordan be together?" and "how will our devotion together prepare us to cross it?" The family that begins with hagah reaches the other side.' },
    { role: pt ? 'Casal' : 'Couple', icon: '👫', text: pt ? 'Revisem juntos se a devoção familiar está acontecendo. Se parou, recomece hoje. O "levanta-te" de Js 1:2 é agora — não amanhã.' : 'Review together whether family devotion is happening. If it stopped, restart today. The "rise" of Josh 1:2 is now — not tomorrow.' },
    { role: pt ? 'Avós' : 'Grandparents', icon: '👴', text: pt ? 'Vocês já cruzaram muitos Jordões. Contem isso aos netos. Seu testemunho de fidelidade de Deus é o "sê forte e corajoso" mais poderoso que podem pronunciar sobre a próxima geração.' : 'You have crossed many Jordans. Tell your grandchildren. Your testimony of God\'s faithfulness is the most powerful "be strong and courageous" you can speak over the next generation.' },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>

      {/* ── HERO ── */}
      <div style={{ borderRadius: 20, background: 'linear-gradient(135deg,rgba(255,180,50,0.13) 0%,rgba(52,211,153,0.09) 60%,rgba(80,200,255,0.07) 100%)', border: '1px solid rgba(255,180,50,0.30)', padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10, filter: 'drop-shadow(0 0 24px rgba(255,180,50,0.50))' }}>🏡⚔️</div>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 8 }}>
          Josué 1:1–18 · Perícope 254 · {pt ? 'Família — Dia 254' : 'Family — Day 254'}
        </div>
        <div style={{ fontSize: 'clamp(18px,3.2vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'Levanta-te e Atravessa — A Família que Não Para no Jordão' : 'Rise and Cross Over — The Family that Does Not Stop at the Jordan'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.4vw,17px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'Coragem, Palavra e Solidariedade Pactual' : 'Courage, Word and Covenantal Solidarity'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {[
            pt ? 'Comissão Familiar' : 'Family Commission',
            pt ? 'Hagah Diário' : 'Daily Hagah',
            pt ? 'Solidariedade Pactual' : 'Covenantal Solidarity',
            pt ? 'Coragem pela Palavra' : 'Courage through Word',
          ].map(t => (
            <span key={t} style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: 'rgba(255,180,50,0.12)', border: '1px solid rgba(255,180,50,0.28)', color: 'rgba(255,180,50,0.92)' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── BIG IDEA ── */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(52,211,153,0.10),rgba(255,180,50,0.07))', border: '1.5px solid rgba(52,211,153,0.32)', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>💡 {pt ? 'Big Idea · Para a Família' : 'Big Idea · For the Family'}</div>
        <p style={{ fontSize: 'clamp(18px,2.8vw,22px)', fontWeight: 800, color: '#fff', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Deus comissiona cada família cristã para avançar com coragem na obediência — não pela força própria, mas pela meditação diária na Sua Palavra e pela solidariedade com os irmãos que ainda lutam.'
            : 'God commissions each Christian family to advance with courage in obedience — not by their own strength, but through daily meditation on His Word and solidarity with brothers still fighting.'}
        </p>
      </div>

      {/* ── PERGUNTA + DOUTRINA ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,100,0.06)', border: '1px solid rgba(255,100,100,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 8 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: 0 }}>
            {pt
              ? '"O que faz a nossa família parar diante dos seus Jordões — e como a Palavra de Deus pode nos dar coragem para atravessá-los juntos?"'
              : '"What makes our family stop at its Jordans — and how can God\'s Word give us courage to cross them together?"'}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.28)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>📜 {pt ? 'Doutrina Central' : 'Central Doctrine'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: 0 }}>
            {pt
              ? 'A família cristã avança com coragem não pela força do temperamento, mas pela meditação constante na Palavra — e por isso avança junta, em solidariedade pactual, até que todos entrem no repouso que Cristo conquistou.'
              : 'The Christian family advances with courage not through natural temperament, but through constant meditation on the Word — and thus advances together, in covenantal solidarity, until all enter the rest Christ secured.'}
          </p>
        </div>
      </div>

      {/* ── MOVIMENTOS ── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
          📋 {pt ? 'Movimentos do Sermão Familiar' : 'Family Sermon Movements'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
          {MOVES.map(m => (
            <div key={m.num} style={{ borderRadius: 16, background: m.corL, border: `1.5px solid ${m.corB}`, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.cor}22`, border: `1.5px solid ${m.cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(16px,2vw,18px)', fontWeight: 900, color: m.cor }}>{m.emoji}</div>
                <div>
                  <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 700, color: m.cor, letterSpacing: '0.12em' }}>{m.num} · {m.sym}</div>
                  <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{m.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic', marginBottom: 8 }}>{m.sub}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{m.key}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: m.cor, lineHeight: 1.55, fontWeight: 600 }}>▸ {m.app}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── APLICAÇÕES POR PAPEL NA FAMÍLIA ── */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.70)', marginBottom: 18, textAlign: 'center' }}>
          🎯 {pt ? 'Aplicações por Papel na Família' : 'Applications by Family Role'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
          {APPS_FAMILIA.map(a => (
            <div key={a.role} style={{ borderRadius: 12, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.20)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: 'rgba(52,211,153,0.95)', marginBottom: 6 }}>{a.icon} {a.role}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.60 }}>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DINÂMICA FAMILIAR ── */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.70)', marginBottom: 18, textAlign: 'center' }}>
          🎲 {pt ? 'Dinâmica Familiar — 6 Atividades' : 'Family Activities — 6 Activities'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 10 }}>
          {ACTIVITIES.map(a => (
            <div key={a.n} style={{ borderRadius: 12, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.20)', padding: '12px 14px', display: 'flex', gap: 10 }}>
              <div style={{ fontSize: 'clamp(18px,2.4vw,22px)', lineHeight: 1.2 }}>{a.icon}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60 }}><span style={{ fontWeight: 800, color: 'rgba(255,200,80,0.90)' }}>{a.n}. </span>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONCLUSÃO ── */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(255,180,50,0.10),rgba(52,211,153,0.07))', border: '1.5px solid rgba(52,211,153,0.28)', padding: '20px 24px' }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 10 }}>🏁 {pt ? 'Conclusão' : 'Conclusion'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Família amada, o Jordão diante de vocês não é obstáculo — é a fronteira da obediência. A família que medita na Palavra juntos, avança junta. Os que já têm repouso acompanham os que ainda lutam. E do outro lado está o repouso eterno que Cristo já conquistou pela ressurreição. Levanta-te, família. Atravessa. O SENHOR vai na tua frente.'
            : 'Beloved family, the Jordan before you is not an obstacle — it is the boundary of obedience. The family that meditates on the Word together advances together. Those already at rest accompany those still fighting. And on the other side is the eternal rest Christ secured through resurrection. Rise, family. Cross over. The LORD goes before you.'}
        </p>
      </div>

    </div>
  );
}

// ─── Infográfico Família · Josué 8:30–35 (Card 12) ──────────────────
function InfograficoJosue265FamiliaSection({ pt }: { pt: boolean }) {
  const acc = 'rgba(210,170,40,1)';
  const accL = 'rgba(210,170,40,0.10)';
  const accB = 'rgba(210,170,40,0.30)';

  const MOVES = [
    {
      num: 'I', sym: 'Js 8:30–31',
      title: pt ? 'Altar no Ebal — Adoração Regulada' : 'Altar at Ebal — Regulated Worship',
      sub: pt ? 'Pedras sem ferro: a adoração que não aceita aperfeiçoamento humano' : 'Stones without iron: worship that refuses human improvement',
      emoji: '🪨',
      key: pt ? 'Josué constrói o altar no monte das maldições — ali, Deus coloca graça. "Como Moisés ordenara" 4× em 5 versículos: a obediência precisa à Palavra define a adoração válida. A família que adora o que Deus prescreveu forma filhos que distinguem piedade de performance.' : 'Joshua builds the altar on the mount of curses — there, God places grace. "As Moses commanded" 4× in 5 verses: precise obedience to the Word defines valid worship. The family that worships what God prescribed forms children who distinguish piety from performance.',
      app: pt ? 'Pais: após vitórias familiares, a primeira resposta é altar — adoração, Palavra, gratidão. Não comemoração antes de consagração.' : 'Parents: after family victories, the first response is altar — worship, Word, gratitude. No celebration before consecration.',
      cor: acc, corL: accL, corB: accB,
    },
    {
      num: '◉', sym: 'Js 8:32',
      title: pt ? 'Torah nas Pedras Caiadas — Centro' : 'Torah on Whitewashed Stones — Center',
      sub: pt ? 'A Palavra visível, permanente e inteligível governa a herança' : 'The visible, permanent and intelligible Word governs the inheritance',
      emoji: '📜',
      key: pt ? 'ṣîd (cal) + baʾēr hêṭēb ("muito claramente"): a lei deve ser visível e compreensível. A conquista não cria nova lei — está sujeita à lei preexistente. A herança da família cristã é inseparável da Palavra que a governa. Pedra sem inscrição não é pedra de aliança.' : 'ṣîd (lime) + baʾēr hêṭēb ("very clearly"): the law must be visible and intelligible. Conquest creates no new law — it is subject to pre-existing law. The Christian family\'s inheritance is inseparable from the Word that governs it.',
      app: pt ? 'Família: a Bíblia deve ser a "pedra grande" da casa — visível, legível, presente. Na mesa, no jantar, no carro. Não apenas na estante.' : 'Family: the Bible should be the "great stone" of the home — visible, readable, present. On the table, at dinner, in the car. Not just on the shelf.',
      cor: 'rgba(52,211,153,1)', corL: 'rgba(52,211,153,0.10)', corB: 'rgba(52,211,153,0.28)',
    },
    {
      num: 'III', sym: 'Js 8:33–35',
      title: pt ? 'Todo Israel Ouve — Ninguém Excluído' : 'All Israel Hears — No One Excluded',
      sub: pt ? 'Mulheres, meninos, estrangeiros: a Torah é para toda a assembleia' : 'Women, children, foreigners: the Torah is for the whole assembly',
      emoji: '👨‍👩‍👧‍👦',
      key: pt ? 'hanashshîm wĕhattaph wĕhagêr — "mulheres, meninos e estrangeiro." Crianças de colo presentes na liturgia aliançal: o ritual as forma antes que a teologia explícita as alcance. O gêr (estrangeiro) incluído — a aliança tem abertura universal desde Josué 8. kol-divrê hatôrâ: toda a lei, incluindo as maldições.' : 'hanashshîm wĕhattaph wĕhagêr — "women, children and stranger." Infants present in covenantal liturgy: the ritual forms them before explicit theology reaches them. The gêr (stranger) included — the covenant has universal openness from Joshua 8. kol-divrê hatôrâ: all the law, including curses.',
      app: pt ? 'Pais: não excluam os filhos pequenos da leitura bíblica por acharem que não entendem. Josué leu para os "meninos" presentes. O ritual os forma mesmo antes da compreensão plena.' : 'Parents: don\'t exclude small children from Bible reading thinking they don\'t understand. Joshua read to the "children" present. The ritual forms them even before full comprehension.',
      cor: 'rgba(80,200,255,1)', corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.28)',
    },
  ];

  const ACTIVITIES = [
    { n: '1', icon: '🪨', text: pt ? 'Leiam Js 8:30-31. "Por que Josué parou a campanha para construir altar? O que acontece na família quando paramos para adorar antes de avançar para o próximo objetivo?"' : 'Read Josh 8:30-31. "Why did Joshua stop the campaign to build an altar? What happens in the family when we stop to worship before pursuing the next goal?"' },
    { n: '2', icon: '🔨', text: pt ? '"Por que Deus não queria ferramentas de ferro nas pedras do altar? Que coisas na nossa família tentamos melhorar na adoração com métodos humanos — e o que Deus realmente quer?"' : '"Why did God not want iron tools on the altar stones? What things in our family do we try to improve in worship with human methods — and what does God actually want?"' },
    { n: '3', icon: '📜', text: pt ? 'Leiam Js 8:32. "A Torah estava escrita para todos verem. Nossa família tem pedras caiadas — coisas visivelmente cristãs na nossa casa e vida? Nomeem três."' : 'Read Josh 8:32. "The Torah was written for all to see. Does our family have whitewashed stones — visibly Christian things in our home and life? Name three."' },
    { n: '4', icon: '👶', text: pt ? 'Leiam Js 8:35. Listem quem estava presente: anciãos, mulheres, meninos, estrangeiros. "Nossa família inclui as crianças na leitura bíblica? O que elas podem aprender mesmo sem entender tudo?"' : 'Read Josh 8:35. List who was present: elders, women, children, strangers. "Does our family include children in Bible reading? What can they learn even without understanding everything?"' },
    { n: '5', icon: '⛰️', text: pt ? 'Monte Gerizim (bênçãos) × Monte Ebal (maldições). "Onde nossa família está posicionada agora — diante de qual monte? Cristo assumiu o Ebal por nós (Gl 3:13). Como isso muda nossa postura?"' : 'Mount Gerizim (blessings) × Mount Ebal (curses). "Where is our family positioned now — before which mount? Christ took the Ebal for us (Gal 3:13). How does this change our posture?"' },
    { n: '6', icon: '📔', text: pt ? 'Construam um "altar familiar": identifiquem uma vitória recente, leiam Sl 34:1-8 juntos, e registrem num caderno familiar: o que Deus fez, a data, e como respondemos com adoração.' : 'Build a "family altar": identify a recent victory, read Psalm 34:1-8 together, and record in a family journal: what God did, the date, and how we responded with worship.' },
  ];

  const APPS_FAMILIA = [
    { role: pt ? 'Pais' : 'Parents', icon: '👨‍👩‍👧', text: pt ? 'Vocês são o "Josué" da família — responsáveis por construir altar após as vitórias. Estabeleçam o costume de parar para adorar e ler a Palavra antes de qualquer comemoração. A vitória pertence ao Deus que a ordenou.' : 'You are the family\'s "Joshua" — responsible for building an altar after victories. Establish the habit of stopping to worship and read the Word before any celebration. The victory belongs to the God who ordered it.' },
    { role: pt ? 'Filhos' : 'Children', icon: '👦', text: pt ? 'Você estava presente na leitura do Ebal mesmo sendo criança. Deus conta com sua presença no culto familiar desde pequeno. A liturgia que você vive antes de entender totalmente forma o caráter que você vai precisar quando entender.' : 'You were present at the Ebal reading even as a child. God counts on your presence in family worship from an early age. The liturgy you live before fully understanding forms the character you will need when you do.' },
    { role: pt ? 'Noivos' : 'Engaged', icon: '💍', text: pt ? 'Antes de casar, definam: "como nossa família responderá às vitórias — com altar ou só com festa?" A família que consagra conquistas pela adoração antes do casamento já tem suas pedras caiadas assentadas.' : 'Before marrying, define: "how will our family respond to victories — with altar or just with party?" The family that consecrates victories through worship before marriage already has its whitewashed stones laid.' },
    { role: pt ? 'Casal' : 'Couple', icon: '👫', text: pt ? 'Identifiquem a última vitória significativa de vocês. Houve um "altar no Ebal"? Se não houve, criem um agora: leiam Ef 1:3-14 juntos e orem com gratidão específica pelo que Deus deu. O altar pode ser construído depois — não é tarde.' : 'Identify your last significant victory. Was there an "altar at Ebal"? If not, create one now: read Eph 1:3-14 together and pray with specific gratitude for what God gave. The altar can be built later — it\'s not too late.' },
    { role: pt ? 'Avós' : 'Grandparents', icon: '👴', text: pt ? 'Vocês são a "cal" que torna a Torah visível para os netos. Contem quais foram os "altares no Ebal" da família — os momentos em que, após vitória, a família parou para adorar. Esses relatos formam as gerações seguintes.' : 'You are the "lime" that makes the Torah visible to grandchildren. Tell them about the family\'s "altars at Ebal" — the moments when, after victory, the family stopped to worship. These accounts form the following generations.' },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>

      {/* HERO */}
      <div style={{ borderRadius: 20, background: `linear-gradient(135deg,${accL} 0%,rgba(52,211,153,0.07) 60%,rgba(80,200,255,0.05) 100%)`, border: `1px solid ${accB}`, padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10, filter: `drop-shadow(0 0 24px ${acc}80)` }}>🪨📜</div>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: acc, marginBottom: 8 }}>
          Josué 8:30–35 · Perícope 265 · {pt ? 'Família — Dia 265' : 'Family — Day 265'}
        </div>
        <div style={{ fontSize: 'clamp(18px,3.2vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'O Altar no Ebal — A Família que Consagra a Vitória pela Adoração e Palavra' : 'The Altar at Ebal — The Family that Consecrates Victory through Worship and Word'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.4vw,17px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'Altar de pedras brutas · Torah caiada · Todo Israel ouve' : 'Altar of uncut stones · Whitewashed Torah · All Israel hears'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {[
            pt ? 'Adoração Regulada' : 'Regulated Worship',
            pt ? 'Torah Visível' : 'Visible Torah',
            pt ? 'Toda a Família' : 'The Whole Family',
            pt ? 'Vitória Consagrada' : 'Consecrated Victory',
          ].map(t => (
            <span key={t} style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: `${acc}18`, border: `1px solid ${accB}`, color: acc }}>{t}</span>
          ))}
        </div>
      </div>

      {/* BIG IDEA */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(52,211,153,0.10),rgba(210,170,40,0.07))', border: '1.5px solid rgba(52,211,153,0.32)', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>💡 {pt ? 'Big Idea · Para a Família' : 'Big Idea · For the Family'}</div>
        <p style={{ fontSize: 'clamp(18px,2.8vw,22px)', fontWeight: 800, color: '#fff', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Depois de cada vitória, Deus convoca a família cristã a parar, construir altar e ouvir toda a Palavra — porque a conquista pertence ao Deus que a ordenou, não à família que a executou.'
            : 'After every victory, God summons the Christian family to stop, build an altar and hear all the Word — because the conquest belongs to the God who ordered it, not the family that executed it.'}
        </p>
      </div>

      {/* PERGUNTA + DOUTRINA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,100,0.06)', border: '1px solid rgba(255,100,100,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 8 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: 0 }}>
            {pt
              ? '"Se Josué parou toda a campanha para construir altar e ler a Lei depois de Ai, como nossa família responde às vitórias que Deus nos concede?"'
              : '"If Joshua stopped the entire campaign to build an altar and read the Law after Ai, how does our family respond to the victories God grants us?"'}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.28)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>📜 {pt ? 'Doutrina Central' : 'Central Doctrine'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: 0 }}>
            {pt
              ? 'A vitória aliançal deve ser consagrada pela adoração regulada pela Palavra — altar e leitura completa da Lei — porque a conquista pertence ao Deus que a ordenou, não ao povo que a executou.'
              : 'Covenantal victory must be consecrated by Word-regulated worship — altar and complete reading of the Law — because the conquest belongs to the God who ordered it, not the people who executed it.'}
          </p>
        </div>
      </div>

      {/* MOVIMENTOS */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
          📋 {pt ? 'Movimentos do Sermão Familiar' : 'Family Sermon Movements'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
          {MOVES.map(m => (
            <div key={m.num} style={{ borderRadius: 16, background: m.corL, border: `1.5px solid ${m.corB}`, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.cor}22`, border: `1.5px solid ${m.cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(16px,2vw,18px)' }}>{m.emoji}</div>
                <div>
                  <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 700, color: m.cor, letterSpacing: '0.12em' }}>{m.num} · {m.sym}</div>
                  <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{m.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic', marginBottom: 8 }}>{m.sub}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{m.key}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: m.cor, lineHeight: 1.55, fontWeight: 600 }}>▸ {m.app}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EIXO REDENTOR */}
      <div style={{ borderRadius: 16, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '18px 22px', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 10 }}>✝️ {pt ? 'Eixo Redentor' : 'Redemptive Axis'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Monte Ebal (maldições) → Cristo assumiu o Ebal eterno no Calvário (Gl 3:13) → Sua família vive em Gerizim. Torah em pedras caiadas → Jr 31:33; 2Co 3:3: lei escrita pelo Espírito no coração regenerado. A família que ouve as maldições não é aterrorizada — é aliviada, porque sabe que Cristo as absorveu todas.'
            : 'Mount Ebal (curses) → Christ took the eternal Ebal at Calvary (Gal 3:13) → His family lives at Gerizim. Torah on whitewashed stones → Jer 31:33; 2 Cor 3:3: law written by the Spirit on the regenerate heart. The family that hears the curses is not terrified — it is relieved, knowing Christ absorbed them all.'}
        </p>
      </div>

      {/* APLICAÇÕES */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.70)', marginBottom: 18, textAlign: 'center' }}>
          🎯 {pt ? 'Aplicações por Papel na Família' : 'Applications by Family Role'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
          {APPS_FAMILIA.map(a => (
            <div key={a.role} style={{ borderRadius: 12, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.20)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: 'rgba(52,211,153,0.95)', marginBottom: 6 }}>{a.icon} {a.role}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.60 }}>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DINÂMICA */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: `${acc}B0`, marginBottom: 18, textAlign: 'center' }}>
          🎲 {pt ? 'Dinâmica Familiar — 6 Atividades' : 'Family Activities — 6 Activities'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 10 }}>
          {ACTIVITIES.map(a => (
            <div key={a.n} style={{ borderRadius: 12, background: `${acc}0F`, border: `1px solid ${accB}`, padding: '12px 14px', display: 'flex', gap: 10 }}>
              <div style={{ fontSize: 'clamp(18px,2.4vw,22px)', lineHeight: 1.2 }}>{a.icon}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60 }}><span style={{ fontWeight: 800, color: acc }}>{a.n}. </span>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONCLUSÃO */}
      <div style={{ borderRadius: 16, background: `linear-gradient(135deg,${accL},rgba(52,211,153,0.07))`, border: `1.5px solid ${accB}`, padding: '20px 24px' }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 10 }}>🏁 {pt ? 'Conclusão' : 'Conclusion'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Família amada, Josué parou no monte das maldições e construiu um altar da graça. Gravou a Torah. Reuniu todo Israel — homens, mulheres, crianças, estrangeiros. Leu toda a lei. Porque a conquista pertencia ao Deus cuja Palavra governa a herança. Cristo fez mais: subiu ao Monte Ebal eterno e absorveu toda maldição. Que cada vitória da sua família termine aqui: altar, Palavra, gratidão. O Ebal mais temível já foi cruzado por Ele. Amém.'
            : 'Beloved family, Joshua stopped at the mount of curses and built an altar of grace. He inscribed the Torah. He gathered all Israel — men, women, children, foreigners. He read all the law. Because the conquest belonged to the God whose Word governs the inheritance. Christ did more: He climbed the eternal Mount Ebal and absorbed every curse. May every victory of your family end here: altar, Word, gratitude. The most fearful Ebal has already been crossed by Him. Amen.'}
        </p>
      </div>

    </div>
  );
}

// ─── Infográfico Família · Josué 2:1–24 (Card 255) ──────────────────
function InfograficoJosue255FamiliaSection({ pt }: { pt: boolean }) {
  const acc = 'rgba(220,60,90,1)';
  const accL = 'rgba(220,60,90,0.10)';
  const accB = 'rgba(220,60,90,0.30)';

  const MOVES = [
    {
      num: 'I', sym: 'Js 2:1–7',
      title: pt ? 'A Missão que Deus Governa em Segredo' : 'The Mission God Governs in Secret',
      sub: pt ? 'A providência divina opera através de meios humanos imperfeitos' : 'Divine providence operates through imperfect human means',
      emoji: '🔴',
      key: pt ? 'Os espias chegam à casa de Raabe por providência: ela já ouvira (2:10-11) e processara a fé. Josué age com discrição aprendida do fracasso anterior (Nm 13). A mentira de Raabe é tema debatido — Hb 11:31 elogia a fé, não a mentira. A providência de Deus alcança famílias improváveis.' : 'The spies reach Rahab\'s house by providence: she had already heard (2:10-11) and processed faith. Joshua acts with discretion learned from past failure (Num 13). Rahab\'s lie is debated — Heb 11:31 praises faith, not deception. God\'s providence reaches unlikely families.',
      app: pt ? 'Pais: a providência de Deus alcança famílias improváveis — inclusive a sua, com toda a sua história de falhas. A discrição de Josué ensina que liderança madura aprende com erros passados.' : 'Parents: God\'s providence reaches unlikely families — including yours, with all your history of failures. Joshua\'s discretion teaches that mature leadership learns from past mistakes.',
      cor: acc, corL: accL, corB: accB,
    },
    {
      num: '◉', sym: 'Js 2:8–14',
      title: pt ? 'A Fé que Protege e Proclama — Centro' : 'The Faith that Protects and Proclaims — Center',
      sub: pt ? 'A maior confissão de fé em Josué vem de uma cananeia' : 'The greatest confession of faith in Joshua comes from a Canaanite',
      emoji: '📢',
      key: pt ? 'Raabe confessa: "YHWH elohîm — em cima nos céus e embaixo na terra" (2:11) — fórmula de soberania total. Esta é a maior confissão de fé no livro até esse ponto. Tg 2:25 cita Raabe como fé que age. A eleição não respeita fronteiras étnicas ou morais (Rm 9:16).' : 'Rahab confesses: "YHWH elohim — above in the heavens and below on earth" (2:11) — formula of total sovereignty. This is the greatest confession of faith in the book to this point. Jas 2:25 cites Rahab as faith that acts. Election respects no ethnic or moral boundaries (Rom 9:16).',
      app: pt ? 'Pais: a fé de Raabe veio pelo ouvir (2:10). A família que conta as obras de Deus está semeando fé nos corações de todos que ouvem — inclusive visitas, filhos de amigos, empregados.' : 'Parents: Rahab\'s faith came by hearing (2:10). The family that recounts God\'s works is sowing faith in all who hear — including guests, friends\' children, employees.',
      cor: 'rgba(52,211,153,1)', corL: 'rgba(52,211,153,0.10)', corB: 'rgba(52,211,153,0.28)',
    },
    {
      num: 'III', sym: 'Js 2:15–24',
      title: pt ? 'O Cordão Escarlate — O Sinal da Aliança da Vida' : 'The Scarlet Cord — The Sign of the Covenant of Life',
      sub: pt ? 'tiqwah: o fio de esperança escarlate que marca a casa da salvação' : 'tiqwah: the scarlet thread of hope that marks the house of salvation',
      emoji: '🏚️',
      key: pt ? 'O cordão (tiqwat ḥûṭ hashshânî) é lexicamente ligado a tiqwah, "esperança". A inclusão de "toda a família de seu pai" (2:18) mostra que a salvação de Raabe é de alcance familiar — ela intercede por todos os seus. Raabe entra na genealogia de Jesus (Mt 1:5).' : 'The cord (tiqwat ḥut hashshani) is lexically linked to tiqwah, "hope." The inclusion of "all her father\'s household" (2:18) shows Rahab\'s salvation has family scope — she intercedes for all hers. Rahab enters Jesus\' genealogy (Matt 1:5).',
      app: pt ? 'Pais: Raabe pediu salvação para "meu pai, minha mãe, meus irmãos" (2:13). Que membro da sua família ainda não está sob o cordão escarlate? Ore com nomes específicos, família por família.' : 'Parents: Rahab asked for salvation for "my father, my mother, my brothers" (2:13). Which family member is not yet under the scarlet cord? Pray with specific names, family by family.',
      cor: 'rgba(80,200,255,1)', corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.28)',
    },
  ];

  const ACTIVITIES = [
    { n: '1', icon: '📖', text: pt ? 'Leiam Js 2:9-11 juntos. "O que Raabe sabia sobre Deus? Como ela soube? O que isso diz sobre como a fé pode vir pelo ouvir histórias de Deus?"' : 'Read Josh 2:9-11 together. "What did Rahab know about God? How did she know? What does this tell us about how faith can come by hearing stories of God?"' },
    { n: '2', icon: '🔴', text: pt ? 'Façam uma lista dos "mares que Deus secou" na história da família — momentos em que Deus claramente interveio. Contem essas histórias em voz alta, como Raabe contou.' : 'Make a list of "seas God parted" in your family\'s history — moments when God clearly intervened. Tell these stories aloud, as Rahab told them.' },
    { n: '3', icon: '🏠', text: pt ? 'O cordão escarlate era um sinal visível de fé. Que sinais visíveis a sua família tem — na casa, no ritmo da semana — que mostram a quem vocês pertencem?' : 'The scarlet cord was a visible sign of faith. What visible signs does your family have — in the home, in weekly rhythm — that show whom you belong to?' },
    { n: '4', icon: '📜', text: pt ? 'Leiam Hebreus 11:31. "Raabe é listada entre os heróis da fé ao lado de Abraão, Moisés e Gideão. O que isso diz sobre quem Deus considera herói?"' : 'Read Hebrews 11:31. "Rahab is listed among the heroes of faith alongside Abraham, Moses and Gideon. What does this tell us about whom God considers a hero?"' },
    { n: '5', icon: '🙏', text: pt ? 'Cada membro escreve o nome de uma pessoa fora da família que precisa do cordão escarlate. Orem juntos por essas pessoas nominalmente.' : 'Each member writes the name of one person outside the family who needs the scarlet cord. Pray together for those people by name.' },
    { n: '6', icon: '💬', text: pt ? 'Perguntem aos filhos: "Se você estivesse em Jericó e ouvisse que um povo invencível estava chegando por causa de seu Deus, o que você faria?" Conectem com a escolha de Raabe.' : 'Ask the children: "If you were in Jericho and heard that an invincible people were coming because of their God, what would you do?" Connect with Rahab\'s choice.' },
  ];

  const APPS_FAMILIA = [
    { role: pt ? 'Pais' : 'Parents', icon: '👨‍👩‍👧', text: pt ? 'Esta semana, contem explicitamente uma obra de Deus na história da família — como Raabe contou o Mar Vermelho. Nomeem a graça. A fé dos filhos cresce pelo ouvir as obras de Deus.' : 'This week, explicitly recount one of God\'s works in your family history — as Rahab recounted the Red Sea. Name the grace. Children\'s faith grows by hearing God\'s works.' },
    { role: pt ? 'Filhos' : 'Children', icon: '👦', text: pt ? 'Raabe ouviu sobre Deus e isso foi suficiente para despertar fé. O que você já ouviu sobre Deus que ainda não virou fé ativa na sua vida? Converse com seus pais sobre isso.' : 'Rahab heard about God and that was enough to awaken faith. What have you heard about God that has not yet become active faith in your life? Talk to your parents about this.' },
    { role: pt ? 'Noivos' : 'Engaged', icon: '💍', text: pt ? 'Antes de casar, conversem sobre quais membros da família de cada um ainda não estão sob o cordão escarlate. O casamento cristão é também uma missão de intercessão familiar.' : 'Before marrying, discuss which family members on each side are not yet under the scarlet cord. Christian marriage is also a mission of family intercession.' },
    { role: pt ? 'Casal' : 'Couple', icon: '👫', text: pt ? 'Façam juntos uma lista de oração com os nomes de familiares que ainda não confessaram Cristo. Orem por eles regularmente — você não sabe quantos já estão ouvindo o que Deus está fazendo.' : 'Make a prayer list together with names of family members who have not yet confessed Christ. Pray for them regularly — you don\'t know how many are already hearing what God is doing.' },
    { role: pt ? 'Avós' : 'Grandparents', icon: '👴', text: pt ? 'Raabe intercedeu por toda a sua família. Vocês têm o privilégio de ser os intercessores da família. Cada oração pelos netos é um cordão escarlate pregado sobre a janela deles. Não desistam.' : 'Rahab interceded for her whole family. You have the privilege of being the family\'s intercessors. Each prayer for grandchildren is a scarlet cord nailed over their window. Don\'t give up.' },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>
      {/* HERO */}
      <div style={{ borderRadius: 20, background: `linear-gradient(135deg,${accL} 0%,rgba(52,211,153,0.07) 60%,rgba(80,200,255,0.05) 100%)`, border: `1px solid ${accB}`, padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10, filter: `drop-shadow(0 0 24px ${acc}80)` }}>🔴🏚️</div>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: acc, marginBottom: 8 }}>
          Josué 2:1–24 · Perícope 255 · {pt ? 'Família — Dia 255' : 'Family — Day 255'}
        </div>
        <div style={{ fontSize: 'clamp(18px,3.2vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'O Cordão Escarlate — A Família que é Salva pela Graça em Meio ao Juízo' : 'The Scarlet Cord — The Family Saved by Grace in the Midst of Judgment'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.4vw,17px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'Raabe · Fé que age · Cordão escarlate · Família salva' : 'Rahab · Faith that acts · Scarlet cord · Family saved'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {[
            pt ? 'Graça Imerecida' : 'Undeserved Grace',
            pt ? 'Fé que Age' : 'Active Faith',
            pt ? 'Cordão Escarlate' : 'Scarlet Cord',
            pt ? 'Família Salva' : 'Family Saved',
          ].map(t => (
            <span key={t} style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: `${acc}18`, border: `1px solid ${accB}`, color: acc }}>{t}</span>
          ))}
        </div>
      </div>

      {/* BIG IDEA */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(52,211,153,0.10),rgba(220,60,90,0.07))', border: '1.5px solid rgba(52,211,153,0.32)', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>💡 {pt ? 'Big Idea · Para a Família' : 'Big Idea · For the Family'}</div>
        <p style={{ fontSize: 'clamp(18px,2.8vw,22px)', fontWeight: 800, color: '#fff', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Raabe não foi salva por sua bondade, mas pela fé que a levou a esconder os espias e dependurar o cordão escarlate — e Deus honrou essa fé incluindo-a na linhagem do Messias.'
            : 'Rahab was not saved by her goodness, but by the faith that led her to hide the spies and hang the scarlet cord — and God honored that faith by including her in the Messiah\'s lineage.'}
        </p>
      </div>

      {/* PERGUNTA + DOUTRINA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,100,0.06)', border: '1px solid rgba(255,100,100,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 8 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: 0 }}>
            {pt
              ? '"Como uma prostituta cananeia se tornou antepassada de Jesus Cristo, enquanto israelitas infiéis morreram no deserto? O que isso nos diz sobre como Deus escolhe e salva as famílias?"'
              : '"How did a Canaanite prostitute become an ancestor of Jesus Christ, while unfaithful Israelites died in the wilderness? What does this tell us about how God chooses and saves families?"'}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.28)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>📜 {pt ? 'Doutrina Central' : 'Central Doctrine'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: 0 }}>
            {pt
              ? 'A salvação é pela graça mediante a fé — não por mérito étnico, moral ou religioso — e alcança famílias inteiras quando um membro responde ao evangelho com fé que age e intercede pelos seus.'
              : 'Salvation is by grace through faith — not by ethnic, moral or religious merit — and reaches entire families when one member responds to the gospel with faith that acts and intercedes for their own.'}
          </p>
        </div>
      </div>

      {/* MOVIMENTOS */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
          📋 {pt ? 'Movimentos do Sermão Familiar' : 'Family Sermon Movements'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
          {MOVES.map(m => (
            <div key={m.num} style={{ borderRadius: 16, background: m.corL, border: `1.5px solid ${m.corB}`, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.cor}22`, border: `1.5px solid ${m.cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(16px,2vw,18px)' }}>{m.emoji}</div>
                <div>
                  <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 700, color: m.cor, letterSpacing: '0.12em' }}>{m.num} · {m.sym}</div>
                  <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{m.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic', marginBottom: 8 }}>{m.sub}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{m.key}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: m.cor, lineHeight: 1.55, fontWeight: 600 }}>▸ {m.app}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EIXO REDENTOR */}
      <div style={{ borderRadius: 16, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '18px 22px', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 10 }}>✝️ {pt ? 'Eixo Redentor' : 'Redemptive Axis'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'O cordão escarlate de Raabe aponta ao sangue de Cristo como único sinal que protege no dia do juízo. Como o sangue do cordeiro nas ombreiras do Egito (Êx 12), o cordão marca a casa da salvação enquanto o juízo passa. Raabe entra na genealogia de Jesus (Mt 1:5) — a prostituta cananeia se torna bisavó de Davi e antepassada do Messias. A graça que atravessou as muralhas de Jericó para salvar Raabe é a mesma graça que atravessou o véu do templo.'
            : 'Rahab\'s scarlet cord points to the blood of Christ as the only sign that protects on the day of judgment. Like the lamb\'s blood on Egypt\'s doorposts (Exod 12), the cord marks the house of salvation while judgment passes. Rahab enters Jesus\' genealogy (Matt 1:5) — the Canaanite prostitute becomes David\'s great-grandmother and ancestor of the Messiah.'}
        </p>
      </div>

      {/* APLICAÇÕES */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.70)', marginBottom: 18, textAlign: 'center' }}>
          🎯 {pt ? 'Aplicações por Papel na Família' : 'Applications by Family Role'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
          {APPS_FAMILIA.map(a => (
            <div key={a.role} style={{ borderRadius: 12, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.20)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: 'rgba(52,211,153,0.95)', marginBottom: 6 }}>{a.icon} {a.role}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.60 }}>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DINÂMICA */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: `${acc}B0`, marginBottom: 18, textAlign: 'center' }}>
          🎲 {pt ? 'Dinâmica Familiar — 6 Atividades' : 'Family Activities — 6 Activities'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 10 }}>
          {ACTIVITIES.map(a => (
            <div key={a.n} style={{ borderRadius: 12, background: `${acc}0F`, border: `1px solid ${accB}`, padding: '12px 14px', display: 'flex', gap: 10 }}>
              <div style={{ fontSize: 'clamp(18px,2.4vw,22px)', lineHeight: 1.2 }}>{a.icon}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60 }}><span style={{ fontWeight: 800, color: acc }}>{a.n}. </span>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONCLUSÃO */}
      <div style={{ borderRadius: 16, background: `linear-gradient(135deg,${accL},rgba(52,211,153,0.07))`, border: `1.5px solid ${accB}`, padding: '20px 24px' }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 10 }}>🏁 {pt ? 'Conclusão' : 'Conclusion'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Família amada, Raabe não tinha templo, não tinha lei escrita, não tinha sacerdote — tinha apenas o que ouviu sobre o Deus de Israel e um cordão escarlate pregado na janela. E isso foi suficiente. Porque o que Deus honra não é a perfeição da família, mas a fé que age, que protege os enviados de Deus e que intercede por todos os seus. Dependure o cordão, família — na sua oração, na sua mesa, no seu ritmo semanal de culto. O Deus que abriu caminho pelo Mar Vermelho pode abrir caminho pelo coração mais fechado da sua família. Amém.'
            : 'Beloved family, Rahab had no temple, no written law, no priest — only what she heard about the God of Israel and a scarlet cord nailed to the window. And that was enough. Because what God honors is not family perfection, but faith that acts, that protects God\'s messengers and intercedes for all one\'s own. Hang the cord, family — in your prayer, at your table, in your weekly rhythm of worship. Amen.'}
        </p>
      </div>
    </div>
  );
}

// ─── Infográfico Família · Josué 3:1–17 (Card 256) ──────────────────
function InfograficoJosue256FamiliaSection({ pt }: { pt: boolean }) {
  const acc = 'rgba(60,160,255,1)';
  const accL = 'rgba(60,160,255,0.10)';
  const accB = 'rgba(60,160,255,0.30)';

  const MOVES = [
    {
      num: 'I', sym: 'Js 3:1–8',
      title: pt ? 'A Arca que Precede — A Presença como Único Guia' : 'The Ark that Leads — Presence as the Only Guide',
      sub: pt ? 'Dois mil côvados de distância: veja onde a Presença vai, não a dirija' : 'Two thousand cubits apart: see where Presence goes, do not direct it',
      emoji: '🌊',
      key: pt ? 'A distância de 2.000 côvados (~900m) entre a arca e o povo é teologia visível: a Presença de Deus vai na frente, o povo segue para VER onde ela vai. "Nunca antes passastes por este caminho" (3:4) — a família cristã frequentemente enfrenta situações sem precedente, com apenas a Presença como guia. "Santificai-vos" (3:5) exige preparação espiritual antes de ação.' : 'The distance of ~900m between ark and people is visible theology: God\'s Presence leads, the people follow to SEE where it goes. "You have not passed this way before" (3:4) — the Christian family often faces unprecedented situations with only Presence as guide. "Consecrate yourselves" (3:5) demands spiritual preparation before action.',
      app: pt ? 'Pais: quando a família enfrenta decisões sem precedente, a pergunta não é "o que fazemos?" mas "onde está a Arca?" A Presença de Deus na Palavra e na oração precede todas as travessias.' : 'Parents: when the family faces unprecedented decisions, the question is not "what do we do?" but "where is the Ark?" God\'s Presence in Word and prayer precedes all crossings.',
      cor: acc, corL: accL, corB: accB,
    },
    {
      num: '◉', sym: 'Js 3:13–16',
      title: pt ? 'Os Pés nas Águas — A Fé que Obedece Antes de Ver — Centro' : 'Feet in the Waters — Faith that Obeys Before Seeing — Center',
      sub: pt ? 'O milagre não aconteceu antes dos pés tocarem a água — aconteceu no momento do toque' : 'The miracle did not happen before the feet touched the water — it happened at the moment of contact',
      emoji: '⚓',
      key: pt ? 'O Jordão em "tempo de colheita" (3:15) = cheias máximas; a dificuldade estava no pico. O milagre exigiu primeiro ato de fé (pés na água), depois veio a resposta divina. "Pararam-se as águas" usa ʿāmad (ficar de pé) — as águas ficaram como muros. A fé bíblica: obediência precede visibilidade.' : 'The Jordan in "harvest time" (3:15) = maximum flood; difficulty was at its peak. The miracle required first an act of faith (feet in water), then came the divine response. "The waters stood" uses \'amad (to stand) — waters stood like walls. Biblical faith: obedience precedes visibility.',
      app: pt ? 'Pais: que "Jordão em cheia" sua família está evitando porque espera condições melhores? A pergunta não é "quando as águas vão recuar?" mas "quando vamos colocar os pés na água?"' : 'Parents: what "flooded Jordan" is your family avoiding while waiting for better conditions? The question is not "when will the waters recede?" but "when will we put our feet in the water?"',
      cor: 'rgba(52,211,153,1)', corL: 'rgba(52,211,153,0.10)', corB: 'rgba(52,211,153,0.28)',
    },
    {
      num: 'III', sym: 'Js 3:16–17',
      title: pt ? 'Todo Israel em Pé Seco — A Travessia que Forma Memória' : 'All Israel on Dry Ground — The Crossing that Forms Memory',
      sub: pt ? 'Sacerdotes parados no meio do rio: a Presença sustentou até o último filho passar' : 'Priests standing in mid-river: Presence sustained until the last child crossed',
      emoji: '🌊',
      key: pt ? '"Todo o Israel passou" — não apenas guerreiros, mas crianças, idosos e mulheres. A travessia é comunitária e geracional. Os sacerdotes ficaram parados no meio do rio ENQUANTO o povo passava — a Presença sustentou do começo ao fim. A memória da travessia será preservada pelas pedras de Js 4 — Deus projeta memória antes da conquista acontecer.' : '"All Israel crossed" — not just warriors, but children, elderly and women. The crossing is communal and generational. The priests stood in mid-river WHILE the people crossed — Presence sustained from start to finish. The crossing\'s memory will be preserved by the stones of Josh 4 — God projects memory before conquest happens.',
      app: pt ? 'Pais: certifiquem-se de que os filhos participam das travessias da família — decisões de fé, momentos de oração em crise. Eles precisam ver vocês atravessando o Jordão para que possam atravessar os seus.' : 'Parents: make sure children participate in the family\'s crossings — faith decisions, prayer in crisis. They need to see you crossing the Jordan so they can cross their own.',
      cor: 'rgba(80,200,255,1)', corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.28)',
    },
  ];

  const ACTIVITIES = [
    { n: '1', icon: '🏛️', text: pt ? 'Leiam Js 3:4. "Nunca antes passamos por este caminho" — cada membro nomeia algo em sua vida que parece um caminho sem precedente. Orem juntos pedindo que a Arca de Deus vá na frente.' : 'Read Josh 3:4. "We have never passed this way before" — each member names something in their life that feels like an unprecedented path. Pray together asking God\'s Ark to lead the way.' },
    { n: '2', icon: '💧', text: pt ? 'Leiam Js 3:13-16. "As águas recuaram ANTES ou DEPOIS dos pés tocarem?" Por que Deus pediu que os pés tocassem primeiro? O que isso nos ensina sobre como a fé funciona?' : 'Read Josh 3:13-16. "Did the waters recede BEFORE or AFTER the feet touched?" Why did God ask the feet to touch first? What does this teach us about how faith works?' },
    { n: '3', icon: '🌊', text: pt ? 'O Jordão estava transbordante no pior momento do ano. "Deus escolheu o momento mais difícil para o milagre. Por quê?" Conectem com situações atuais da família.' : 'The Jordan was overflowing at the worst time of year. "God chose the most difficult moment for the miracle. Why?" Connect with current family situations.' },
    { n: '4', icon: '👨‍👩‍👧‍👦', text: pt ? 'Todo Israel passou junto — guerreiros, idosos, crianças. "Quem na nossa família é o mais difícil de atravessar junto? Como podemos ser sacerdotes uns para os outros no meio do rio?"' : 'All Israel crossed together — warriors, elderly, children. "Who in our family is hardest to cross with? How can we be priests for one another in the middle of the river?"' },
    { n: '5', icon: '🙏', text: pt ? 'Os sacerdotes ficaram parados no meio do rio ENQUANTO o povo passava. Que pessoas na vida de vocês estão "paradas no meio do rio" para que outros passem? Como agradecê-las?' : 'The priests stood in mid-river WHILE the people crossed. Who in your lives is "standing in the middle of the river" so others can pass? How can you thank them?' },
    { n: '6', icon: '⚓', text: pt ? 'Orem juntos pelo "Jordão" da família: nomeiem a crise, confessem o medo, e declarem: "Coloco os pés na água — YHWH vai na frente."' : 'Pray together for the family\'s "Jordan": name the crisis, confess the fear, and declare: "I put my feet in the water — YHWH goes ahead."' },
  ];

  const APPS_FAMILIA = [
    { role: pt ? 'Pais' : 'Parents', icon: '👨‍👩‍👧', text: pt ? 'Identifiquem o "Jordão" atual da família e coloquem os pés na água esta semana — uma decisão de obediência adiada que precisa de ação, não de melhores condições.' : 'Identify your family\'s current "Jordan" and put your feet in the water this week — a postponed obedience decision that needs action, not better conditions.' },
    { role: pt ? 'Filhos' : 'Children', icon: '👦', text: pt ? 'Perguntem aos pais: "Qual foi o Jordão mais difícil que nossa família já atravessou?" Ouçam a história e agradeçam a Deus pela travessia.' : 'Ask your parents: "What was the hardest Jordan our family ever crossed?" Listen to the story and thank God for the crossing.' },
    { role: pt ? 'Noivos' : 'Engaged', icon: '💍', text: pt ? 'Conversem sobre os "Jordões" que cada um traz da própria família — os pontos de medo ou de paralisia. A família que se casa preparada para atravessar junta já tem a arca na frente.' : 'Talk about the "Jordans" each of you brings from your own family — points of fear or paralysis. The family that marries ready to cross together already has the ark ahead.' },
    { role: pt ? 'Casal' : 'Couple', icon: '👫', text: pt ? 'Identifiquem uma área da vida conjugal ou familiar onde estão esperando condições perfeitas para obedecer. Decidam juntos quando colocarão os pés na água.' : 'Identify one area of conjugal or family life where you are waiting for perfect conditions to obey. Decide together when you will put your feet in the water.' },
    { role: pt ? 'Avós' : 'Grandparents', icon: '👴', text: pt ? 'Contem para os netos o maior "Jordão em cheia" que Deus abriu para vocês. Seja específico: a data, a crise, o momento em que colocaram os pés na água e as águas recuaram.' : 'Tell grandchildren about the greatest "flooded Jordan" God opened for you. Be specific: the date, the crisis, the moment you put your feet in the water and the waters receded.' },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>
      {/* HERO */}
      <div style={{ borderRadius: 20, background: `linear-gradient(135deg,${accL} 0%,rgba(52,211,153,0.07) 60%,rgba(80,200,255,0.05) 100%)`, border: `1px solid ${accB}`, padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10, filter: `drop-shadow(0 0 24px ${acc}80)` }}>🌊⚓</div>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: acc, marginBottom: 8 }}>
          Josué 3:1–17 · Perícope 256 · {pt ? 'Família — Dia 256' : 'Family — Day 256'}
        </div>
        <div style={{ fontSize: 'clamp(18px,3.2vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'Pés nas Águas — A Família que Avança pela Presença, Não pela Visibilidade' : 'Feet in the Waters — The Family that Advances by Presence, Not Visibility'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.4vw,17px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'Arca que precede · Pés na água · Todo Israel atravessa' : 'Ark that leads · Feet in water · All Israel crosses'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {[
            pt ? 'Fé sem Visibilidade' : 'Faith without Visibility',
            pt ? 'Presença que Guia' : 'Guiding Presence',
            pt ? 'Travessia Coletiva' : 'Collective Crossing',
            pt ? 'Obediência Primeiro' : 'Obedience First',
          ].map(t => (
            <span key={t} style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: `${acc}18`, border: `1px solid ${accB}`, color: acc }}>{t}</span>
          ))}
        </div>
      </div>

      {/* BIG IDEA */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(52,211,153,0.10),rgba(60,160,255,0.07))', border: '1.5px solid rgba(52,211,153,0.32)', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>💡 {pt ? 'Big Idea · Para a Família' : 'Big Idea · For the Family'}</div>
        <p style={{ fontSize: 'clamp(18px,2.8vw,22px)', fontWeight: 800, color: '#fff', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Israel só viu o Jordão recuar depois que os pés dos sacerdotes tocaram a água — porque Deus honra a fé que obedece antes de ver, não a fé que espera condições perfeitas para agir.'
            : 'Israel only saw the Jordan recede after the priests\' feet touched the water — because God honors faith that obeys before seeing, not faith that waits for perfect conditions to act.'}
        </p>
      </div>

      {/* PERGUNTA + DOUTRINA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,100,0.06)', border: '1px solid rgba(255,100,100,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 8 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: 0 }}>
            {pt
              ? '"Qual é o Jordão que a nossa família está evitando atravessar porque as águas ainda não recuaram? O que precisamos fazer para que os pés toquem a água?"'
              : '"What is the Jordan our family is avoiding crossing because the waters have not yet receded? What do we need to do for our feet to touch the water?"'}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.28)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>📜 {pt ? 'Doutrina Central' : 'Central Doctrine'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: 0 }}>
            {pt
              ? 'Deus honra a fé que obedece antes de ver — que coloca os pés nas águas do impossível confiando na Presença que precede e sustenta toda travessia coletiva para que a memória da graça forme a próxima geração.'
              : 'God honors faith that obeys before seeing — that puts feet in impossible waters trusting the Presence that precedes and sustains every collective crossing so that the memory of grace forms the next generation.'}
          </p>
        </div>
      </div>

      {/* MOVIMENTOS */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
          📋 {pt ? 'Movimentos do Sermão Familiar' : 'Family Sermon Movements'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
          {MOVES.map(m => (
            <div key={m.num} style={{ borderRadius: 16, background: m.corL, border: `1.5px solid ${m.corB}`, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.cor}22`, border: `1.5px solid ${m.cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(16px,2vw,18px)' }}>{m.emoji}</div>
                <div>
                  <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 700, color: m.cor, letterSpacing: '0.12em' }}>{m.num} · {m.sym}</div>
                  <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{m.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic', marginBottom: 8 }}>{m.sub}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{m.key}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: m.cor, lineHeight: 1.55, fontWeight: 600 }}>▸ {m.app}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EIXO REDENTOR */}
      <div style={{ borderRadius: 16, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '18px 22px', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 10 }}>✝️ {pt ? 'Eixo Redentor' : 'Redemptive Axis'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'A travessia do Jordão é tipologia do batismo (1Co 10:1-2). O batismo de Jesus no Jordão (Mc 1:9-11) é a travessia definitiva — Jesus desce às águas do juízo em lugar do Seu povo, emerge com a voz do Pai declarando-O Filho amado. A família batizada atravessa em Cristo o Jordão da condenação e entra na terra da promessa — não pelo mérito próprio, mas pela Presença de Deus que vai na frente e sustenta até o final.'
            : 'The Jordan crossing is typology of baptism (1 Cor 10:1-2). Jesus\' baptism in the Jordan (Mark 1:9-11) is the definitive crossing — Jesus descends into the waters of judgment in His people\'s place, emerges with the Father\'s voice declaring Him the beloved Son. The baptized family crosses in Christ the Jordan of condemnation and enters the promised land.'}
        </p>
      </div>

      {/* APLICAÇÕES */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.70)', marginBottom: 18, textAlign: 'center' }}>
          🎯 {pt ? 'Aplicações por Papel na Família' : 'Applications by Family Role'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
          {APPS_FAMILIA.map(a => (
            <div key={a.role} style={{ borderRadius: 12, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.20)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: 'rgba(52,211,153,0.95)', marginBottom: 6 }}>{a.icon} {a.role}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.60 }}>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DINÂMICA */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: `${acc}B0`, marginBottom: 18, textAlign: 'center' }}>
          🎲 {pt ? 'Dinâmica Familiar — 6 Atividades' : 'Family Activities — 6 Activities'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 10 }}>
          {ACTIVITIES.map(a => (
            <div key={a.n} style={{ borderRadius: 12, background: `${acc}0F`, border: `1px solid ${accB}`, padding: '12px 14px', display: 'flex', gap: 10 }}>
              <div style={{ fontSize: 'clamp(18px,2.4vw,22px)', lineHeight: 1.2 }}>{a.icon}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60 }}><span style={{ fontWeight: 800, color: acc }}>{a.n}. </span>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONCLUSÃO */}
      <div style={{ borderRadius: 16, background: `linear-gradient(135deg,${accL},rgba(52,211,153,0.07))`, border: `1.5px solid ${accB}`, padding: '20px 24px' }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 10 }}>🏁 {pt ? 'Conclusão' : 'Conclusion'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Família amada, o Jordão está em cheia. O momento nunca vai parecer perfeito. As condições nunca vão ser favoráveis o suficiente. Mas a Arca vai na frente — a Presença de Deus na Palavra e na oração precede cada travessia. O chamado é simples: colocar os pés na água. Deus honrou a fé dos sacerdotes que molharam os pés e sustentou o povo inteiro até o último filho passar em pé seco. Ele fará o mesmo por sua família. Coloque os pés na água. Amém.'
            : 'Beloved family, the Jordan is in flood. The moment will never seem perfect. Conditions will never be favorable enough. But the Ark leads the way — God\'s Presence in Word and prayer precedes every crossing. The call is simple: put your feet in the water. God honored the faith of the priests who wet their feet and sustained all the people until the last child crossed on dry ground. He will do the same for your family. Amen.'}
        </p>
      </div>
    </div>
  );
}

// ─── Infográfico Família · Josué 4:1–24 (Card 257) ──────────────────
function InfograficoJosue257FamiliaSection({ pt }: { pt: boolean }) {
  const acc = 'rgba(210,160,60,1)';
  const accL = 'rgba(210,160,60,0.10)';
  const accB = 'rgba(210,160,60,0.30)';

  const MOVES = [
    {
      num: 'I', sym: 'Js 4:1–10',
      title: pt ? 'Doze Pedras Tiradas do Meio do Jordão' : 'Twelve Stones Taken from the Middle of the Jordan',
      sub: pt ? 'A memória é construída antes da travessia estar completa' : 'Memory is built before the crossing is complete',
      emoji: '🪨',
      key: pt ? 'O mandato das pedras é dado ENQUANTO os pés dos sacerdotes ainda estão no rio (4:3) — a memória é construída antes da travessia estar completa. O número doze é pactual: uma pedra por tribo, representação total. As pedras saíram do meio do Jordão — do local do milagre, não de um lugar conveniente. A memória fiel preserva o específico, não o genérico.' : 'The stone mandate is given WHILE the priests\' feet are still in the river (4:3) — memory is built before the crossing is complete. Twelve is covenantal: one stone per tribe, total representation. The stones came from mid-Jordan — from the miracle\'s location, not a convenient place. Faithful memory preserves the specific, not the generic.',
      app: pt ? 'Pais: que pedras memoriais vocês têm na casa? Fotos de batismos, diários de oração respondida, versículos gravados em molduras? Não são superstição — são pedagogia de fé.' : 'Parents: what memorial stones do you have at home? Baptism photos, answered-prayer journals, verses in frames? These are not superstition — they are faith pedagogy.',
      cor: acc, corL: accL, corB: accB,
    },
    {
      num: '◉', sym: 'Js 4:6–7, 21–24',
      title: pt ? 'A Pergunta dos Filhos que Deus Antecipou — Centro' : 'The Children\'s Question that God Anticipated — Center',
      sub: pt ? '"Quando vossos filhos perguntarem" — Deus instituiu as pedras porque sabia que as crianças perguntariam' : '"When your children ask" — God instituted the stones because He knew children would ask',
      emoji: '✨',
      key: pt ? 'A pergunta dos filhos aparece DUAS vezes (4:6 e 4:21) — ênfase deliberada. O objeto visível provoca a pergunta; a pergunta abre a porta para o testemunho; o testemunho forma a fé. "Fareis saber" (wĕhôdaʿtĕm) é causativo — os pais são responsáveis por CAUSAR conhecimento nos filhos, não apenas aguardar que descubram.' : 'The children\'s question appears TWICE (4:6 and 4:21) — deliberate emphasis. The visible object provokes the question; the question opens the door for testimony; testimony forms faith. "You shall let know" (wehodatem) is causative — parents are responsible for CAUSING knowledge in children, not just waiting for them to discover it.',
      app: pt ? 'Pais: esta é a missão mais concreta deste sermão — construam esta semana uma pedra memorial familiar. Pode ser um diário, uma moldura, uma caixa de memórias com um versículo e a data.' : 'Parents: this is the most concrete mission of this sermon — build a family memorial stone this week. It can be a journal, a frame, a memory box with a verse and date.',
      cor: 'rgba(52,211,153,1)', corL: 'rgba(52,211,153,0.10)', corB: 'rgba(52,211,153,0.28)',
    },
    {
      num: 'III', sym: 'Js 4:24; 5:1',
      title: pt ? 'O Terror nas Nações — A Memória que Testemunha ao Mundo' : 'Terror among the Nations — Memory that Witnesses to the World',
      sub: pt ? 'A memória da graça não é privada — ela testemunha ao mundo que YHWH é Deus' : 'The memory of grace is not private — it witnesses to the world that YHWH is God',
      emoji: '🌍',
      key: pt ? 'O memorial de Gilgal tinha dois destinatários: "todos os povos da terra" (4:24) e "vós" (o próprio Israel). O "coração derretido" dos reis cananeus em 5:1 é eco da confissão de Raabe em 2:9-11: o que Deus faz pela família aliançal produz efeito missiológico. A família que preserva e conta a memória da graça é família missionária sem precisar sair de casa.' : 'The Gilgal memorial had two audiences: "all the peoples of the earth" (4:24) and "you" (Israel itself). The "melted heart" of Canaanite kings in 5:1 echoes Rahab\'s confession in 2:9-11: what God does for the covenant family produces missiological effect. The family that preserves the memory of grace is a missionary family without leaving home.',
      app: pt ? 'Pais: a memória da graça que vocês preservam não é apenas para os filhos — é para os vizinhos, amigos e familiares que veem a sua família de fora e perguntam "o que torna esta família diferente?"' : 'Parents: the memory of grace you preserve is not only for your children — it is for neighbors, friends and family who see your family from outside and ask "what makes this family different?"',
      cor: 'rgba(80,200,255,1)', corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.28)',
    },
  ];

  const ACTIVITIES = [
    { n: '1', icon: '🪨', text: pt ? 'Leiam Js 4:6-7 juntos. "Se você pudesse escolher uma pedra memorial que representa o que Deus fez por você, o que seria e qual seria o versículo que escreveria nela?"' : 'Read Josh 4:6-7 together. "If you could choose a memorial stone that represents what God did for you, what would it be and what verse would you write on it?"' },
    { n: '2', icon: '✍️', text: pt ? 'Atividade: cada membro escolhe um objeto da casa e diz uma palavra que representa uma obra de Deus. Coloquem-nos juntos em um lugar visível da casa.' : 'Activity: each member chooses a household object and says a word representing a work of God. Place them together in a visible spot in the home.' },
    { n: '3', icon: '📖', text: pt ? 'Leiam Js 4:21-23. A resposta à pergunta dos filhos incluía o Egito (v.23) — memória sobre memória. Que "Egito" da família — libertação passada — os filhos precisam conhecer?' : 'Read Josh 4:21-23. The answer to the children\'s question included Egypt (v.23) — memory upon memory. What family "Egypt" — past liberation — do children need to know?' },
    { n: '4', icon: '🌍', text: pt ? 'Js 5:1 — os reis inimigos "ficaram com o coração derretido." Que pessoa não-cristã em volta da família tem visto a obra de Deus em vocês? Orem por ela pelo nome.' : 'Josh 5:1 — the enemy kings "melted in heart." What non-Christian person around your family has been seeing God\'s work in you? Pray for them by name.' },
    { n: '5', icon: '🗃️', text: pt ? 'Criem juntos um "Mural de Gilgal" — um espaço onde registram datas e descrições breves de respostas de oração e obras de Deus. Comecem hoje.' : 'Together create a "Gilgal Wall" — a space where you record dates and brief descriptions of answered prayers and God\'s works. Start today.' },
    { n: '6', icon: '🙏', text: pt ? 'Orem juntos, nomeando as "pedras" que cada um trouxe do Jordão da própria vida. Agradeçam especificamente por cada travessia.' : 'Pray together, naming the "stones" each one brought from the Jordan of their own life. Give specific thanks for each crossing.' },
  ];

  const APPS_FAMILIA = [
    { role: pt ? 'Pais' : 'Parents', icon: '👨‍👩‍👧', text: pt ? 'Criem esta semana uma "pedra memorial" concreta — um diário de oração respondida, uma caixa de memórias, um versículo emoldurado com a data de um momento marcante. Quando o filho perguntar, a resposta estará ali.' : 'This week, create a concrete "memorial stone" — an answered-prayer journal, a memory box, a framed verse with the date of a landmark moment. When the child asks, the answer will be there.' },
    { role: pt ? 'Filhos' : 'Children', icon: '👦', text: pt ? 'Pergunte a seus pais ou avós: "Qual é a maior coisa que Deus já fez pela nossa família?" Ouça com atenção — você está ouvindo uma pedra do Jordão.' : 'Ask your parents or grandparents: "What is the greatest thing God has ever done for our family?" Listen carefully — you are hearing a stone from the Jordan.' },
    { role: pt ? 'Noivos' : 'Engaged', icon: '💍', text: pt ? 'Antes de casar, comecem um diário de casal onde registrem as obras de Deus no noivado. Esse diário será uma das primeiras pedras memoriais do novo lar.' : 'Before marrying, start a couple\'s journal recording God\'s works during the engagement. This journal will be one of the first memorial stones of the new home.' },
    { role: pt ? 'Casal' : 'Couple', icon: '👫', text: pt ? 'Identifiquem três "pedras do Jordão" da história do casamento — três momentos em que claramente viram a mão de Deus. Escrevam, datem e guardem. São o patrimônio espiritual dos filhos.' : 'Identify three "Jordan stones" from your marriage history — three moments when you clearly saw God\'s hand. Write them, date them, keep them. They are your children\'s spiritual inheritance.' },
    { role: pt ? 'Avós' : 'Grandparents', icon: '👴', text: pt ? 'Vocês são as pedras mais antigas do Jordão da família. Esta semana, escrevam ou gravem em vídeo a história da maior travessia de fé de suas vidas. Esse registro é para os bisnetos que ainda não nasceram.' : 'You are the oldest stones of the family\'s Jordan. This week, write or video-record the story of the greatest faith crossing of your lives. This record is for great-grandchildren not yet born.' },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>
      {/* HERO */}
      <div style={{ borderRadius: 20, background: `linear-gradient(135deg,${accL} 0%,rgba(52,211,153,0.07) 60%,rgba(80,200,255,0.05) 100%)`, border: `1px solid ${accB}`, padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10, filter: `drop-shadow(0 0 24px ${acc}80)` }}>🪨✨</div>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: acc, marginBottom: 8 }}>
          Josué 4:1–24 · Perícope 257 · {pt ? 'Família — Dia 257' : 'Family — Day 257'}
        </div>
        <div style={{ fontSize: 'clamp(18px,3.2vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'Doze Pedras em Gilgal — A Família que Preserva a Memória da Graça para as Gerações' : 'Twelve Stones at Gilgal — The Family that Preserves the Memory of Grace for Generations'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.4vw,17px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'Pedras do Jordão · Pergunta dos filhos · Testemunho às nações' : 'Jordan stones · Children\'s question · Witness to the nations'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {[
            pt ? 'Memória Sagrada' : 'Sacred Memory',
            pt ? 'Pedagogia de Fé' : 'Faith Pedagogy',
            pt ? 'Testemunho Vivo' : 'Living Witness',
            pt ? 'Herança Geracional' : 'Generational Heritage',
          ].map(t => (
            <span key={t} style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: `${acc}18`, border: `1px solid ${accB}`, color: acc }}>{t}</span>
          ))}
        </div>
      </div>

      {/* BIG IDEA */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(52,211,153,0.10),rgba(210,160,60,0.07))', border: '1.5px solid rgba(52,211,153,0.32)', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>💡 {pt ? 'Big Idea · Para a Família' : 'Big Idea · For the Family'}</div>
        <p style={{ fontSize: 'clamp(18px,2.8vw,22px)', fontWeight: 800, color: '#fff', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Deus ordenou as pedras memoriais antes que o último israelita saísse do Jordão — porque ele sabia que os filhos perguntariam, e queria que houvesse uma resposta visível, permanente e familiar ao alcance de cada geração.'
            : 'God ordered the memorial stones before the last Israelite left the Jordan — because He knew children would ask, and He wanted a visible, permanent, family answer within reach of every generation.'}
        </p>
      </div>

      {/* PERGUNTA + DOUTRINA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,100,0.06)', border: '1px solid rgba(255,100,100,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 8 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: 0 }}>
            {pt
              ? '"Que pedras memoriais nossa família tem — coisas visíveis e permanentes que contam o que Deus fez por nós — para quando nossos filhos e netos perguntarem o que significam para vocês?"'
              : '"What memorial stones does our family have — visible and permanent things that tell what God did for us — for when our children and grandchildren ask what they mean?"'}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.28)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>📜 {pt ? 'Doutrina Central' : 'Central Doctrine'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: 0 }}>
            {pt
              ? 'Deus institui memórias visíveis da graça porque sabe que esquecemos — e a família que constrói pedras memoriais preserva a identidade pactual para as gerações, testemunhando ao mesmo tempo ao mundo que YHWH é o único Deus poderoso.'
              : 'God institutes visible memories of grace because He knows we forget — and the family that builds memorial stones preserves covenantal identity for generations, while simultaneously witnessing to the world that YHWH is the only powerful God.'}
          </p>
        </div>
      </div>

      {/* MOVIMENTOS */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
          📋 {pt ? 'Movimentos do Sermão Familiar' : 'Family Sermon Movements'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
          {MOVES.map(m => (
            <div key={m.num} style={{ borderRadius: 16, background: m.corL, border: `1.5px solid ${m.corB}`, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.cor}22`, border: `1.5px solid ${m.cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(16px,2vw,18px)' }}>{m.emoji}</div>
                <div>
                  <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 700, color: m.cor, letterSpacing: '0.12em' }}>{m.num} · {m.sym}</div>
                  <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{m.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic', marginBottom: 8 }}>{m.sub}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{m.key}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: m.cor, lineHeight: 1.55, fontWeight: 600 }}>▸ {m.app}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EIXO REDENTOR */}
      <div style={{ borderRadius: 16, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '18px 22px', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 10 }}>✝️ {pt ? 'Eixo Redentor' : 'Redemptive Axis'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'As doze pedras de Gilgal apontam aos doze apóstolos como fundação da nova Jerusalém (Ap 21:14). A Ceia do Senhor é a "pedra memorial" definitiva: "fazei isto em memória de mim" (1Co 11:24-25). Cada vez que a família parte o pão, ela responde à pergunta dos filhos: estas pedras significam que Cristo morreu e ressuscitou, e que o Jordão do juízo já foi atravessado por Ele.'
            : 'The twelve stones of Gilgal point to the twelve apostles as the foundation of the new Jerusalem (Rev 21:14). The Lord\'s Supper is the definitive "memorial stone": "do this in remembrance of me" (1 Cor 11:24-25). Each time the family breaks bread, it answers the children\'s question: these stones mean Christ died and rose, and the Jordan of judgment was already crossed by Him.'}
        </p>
      </div>

      {/* APLICAÇÕES */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.70)', marginBottom: 18, textAlign: 'center' }}>
          🎯 {pt ? 'Aplicações por Papel na Família' : 'Applications by Family Role'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
          {APPS_FAMILIA.map(a => (
            <div key={a.role} style={{ borderRadius: 12, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.20)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: 'rgba(52,211,153,0.95)', marginBottom: 6 }}>{a.icon} {a.role}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.60 }}>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DINÂMICA */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: `${acc}B0`, marginBottom: 18, textAlign: 'center' }}>
          🎲 {pt ? 'Dinâmica Familiar — 6 Atividades' : 'Family Activities — 6 Activities'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 10 }}>
          {ACTIVITIES.map(a => (
            <div key={a.n} style={{ borderRadius: 12, background: `${acc}0F`, border: `1px solid ${accB}`, padding: '12px 14px', display: 'flex', gap: 10 }}>
              <div style={{ fontSize: 'clamp(18px,2.4vw,22px)', lineHeight: 1.2 }}>{a.icon}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60 }}><span style={{ fontWeight: 800, color: acc }}>{a.n}. </span>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONCLUSÃO */}
      <div style={{ borderRadius: 16, background: `linear-gradient(135deg,${accL},rgba(52,211,153,0.07))`, border: `1.5px solid ${accB}`, padding: '20px 24px' }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 10 }}>🏁 {pt ? 'Conclusão' : 'Conclusion'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Família amada, a pergunta dos filhos está vindo: "O que significam estas pedras?" Ela virá na mesa do jantar, na hora de dormir, num momento de crise. A resposta não precisa ser improvisada: Deus já mandou construir o memorial antes que a travessia terminasse. Sua tarefa é posicionar as pedras agora. Que cada lar cristão seja um Gilgal — onde as obras de Deus estão registradas, visíveis e prontas para responder à próxima geração. Amém.'
            : 'Beloved family, the children\'s question is coming: "What do these stones mean?" It will come at the dinner table, at bedtime, in a crisis moment. The answer does not need to be improvised: God already commanded building the memorial before the crossing ended. Your task is to position the stones now. May every Christian home be a Gilgal. Amen.'}
        </p>
      </div>
    </div>
  );
}

// ─── Infográfico Família · Josué 5:2–12 (Card 258) ──────────────────
function InfograficoJosue258FamiliaSection({ pt }: { pt: boolean }) {
  const acc = 'rgba(120,80,230,1)';
  const accL = 'rgba(120,80,230,0.10)';
  const accB = 'rgba(120,80,230,0.30)';

  const MOVES = [
    {
      num: 'I', sym: 'Js 5:2–8',
      title: pt ? 'A Nova Geração Circuncidada — O Pacto Inacabado Completado' : 'The New Generation Circumcised — The Unfinished Covenant Completed',
      sub: pt ? 'Uma geração inteira cresceu sem o sinal da aliança — em Gilgal, Deus exige que o sinal seja aplicado' : 'An entire generation grew without the covenant sign — at Gilgal, God demands the sign be applied',
      emoji: '✂️',
      key: pt ? 'A não-circuncisão durante o deserto: uma geração inteira cresceu sem o sinal da aliança. Não foi por falta de fé — foi pela situação de julgamento. Mas o mandato aliançal não foi cancelado — foi suspenso. A circuncisão dolorosa imobiliza temporariamente os guerreiros (5:8) — Deus prefere um povo consagrado e vulnerável a um exército pagão e poderoso. A prioridade é a aliança, não a eficiência militar.' : 'Non-circumcision in the wilderness: an entire generation grew without the covenant sign. Not from lack of faith — but from the judgment situation. But the covenantal mandate was not cancelled — it was suspended. The painful circumcision temporarily immobilizes warriors (5:8) — God prefers a consecrated and vulnerable people to a pagan and powerful army.',
      app: pt ? 'Pais: há promessas aliançais inacabadas na sua família — compromissos de dedicar os filhos a Deus, de estabelecer culto familiar? O vitupério é removido quando o inacabado é completado.' : 'Parents: are there unfinished covenantal promises in your family — commitments to dedicate children to God, to establish family worship? The reproach is removed when the unfinished is completed.',
      cor: acc, corL: accL, corB: accB,
    },
    {
      num: '◉', sym: 'Js 5:9',
      title: pt ? 'Gilgal — O Vitupério do Egito Removido — Centro' : 'Gilgal — The Reproach of Egypt Rolled Away — Center',
      sub: pt ? 'gālal = rolar, remover; Deus DECLARA o vitupério removido antes de qualquer conquista' : 'galal = to roll, remove; God DECLARES the reproach removed before any conquest',
      emoji: '🏕️',
      key: pt ? '"Hoje revolvi de sobre vós o opróbrio do Egito" (5:9). O "vitupério do Egito" pode ser a marca da escravidão, a ausência do sinal aliançal, ou a vergonha de quarenta anos de julgamento. A remoção do vitupério é ato de graça declaratória: Deus fala e é assim — antes de qualquer batalha, antes de qualquer fruto visível. Gilgal (gālal) preserva a memória da remoção da vergonha.' : '"Today I have rolled away the reproach of Egypt from you" (5:9). The "reproach of Egypt" may be the mark of slavery, absence of the covenant sign, or the shame of forty years of judgment. The removal of reproach is a declaratory act of grace: God speaks and it is so — before any battle, before any visible fruit. Gilgal (galal) preserves the memory of shame\'s removal.',
      app: pt ? 'Pais: há vitupérios na história da família — vícios, vergonhas, pecados geracionais — que vocês carregam como se nunca tivessem sido removidos? Em Cristo, Deus declarou em Gilgal: "hoje revolvi." Recebam a remoção pela fé.' : 'Parents: are there reproaches in family history — addictions, shames, generational sins — that you carry as if never removed? In Christ, God declared at Gilgal: "today I have rolled away." Receive the removal by faith.',
      cor: 'rgba(52,211,153,1)', corL: 'rgba(52,211,153,0.10)', corB: 'rgba(52,211,153,0.28)',
    },
    {
      num: 'III', sym: 'Js 5:10–12',
      title: pt ? 'A Páscoa na Terra Prometida — A Redenção Celebrada na Herança' : 'The Passover in the Promised Land — Redemption Celebrated in the Inheritance',
      sub: pt ? 'O maná cessa: a provisão sobrenatural cede à provisão ordinária — ambas igualmente graça' : 'The manna ceases: supernatural provision gives way to ordinary — both equally grace',
      emoji: '🍽️',
      key: pt ? 'A Páscoa em Gilgal é a primeira celebrada em solo da terra prometida — ela fecha o ciclo iniciado no Egito. O cessamento do maná é simbólico: a provisão sobrenatural do deserto cede à provisão ordinária da terra. A herança não cancela a dependência; ela muda a forma dela. A família que entra na herança ainda precisa do alimento diário de Deus — agora pelo produto da terra que Ele mesmo deu.' : 'Passover at Gilgal is the first celebrated on promised-land soil — it closes the cycle begun in Egypt. The cessation of manna is symbolic: supernatural wilderness provision yields to ordinary land provision. Inheritance does not cancel dependence; it changes its form. The family entering the inheritance still needs God\'s daily food — now from the land\'s produce He Himself gave.',
      app: pt ? 'Pais: a Páscoa em Gilgal foi antes da batalha, não depois. O culto familiar não é recompensa pela conquista — é sustento que precede e acompanha cada passo. Estabeleçam a mesa familiar de Palavra e oração como Páscoa semanal.' : 'Parents: Passover at Gilgal was before the battle, not after. Family worship is not a reward for conquest — it is sustenance that precedes and accompanies every step. Establish the family table of Word and prayer as a weekly Passover.',
      cor: 'rgba(80,200,255,1)', corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.28)',
    },
  ];

  const ACTIVITIES = [
    { n: '1', icon: '✂️', text: pt ? 'Leiam Js 5:9 juntos. "Hoje revolvi de sobre vós o opróbrio." Cada membro escreve em um papel uma vergonha ou vitupério que quer deixar em Gilgal. Depois de lerem Cl 2:13-14, rasgam o papel juntos.' : 'Read Josh 5:9 together. "Today I have rolled away your reproach." Each member writes on paper a shame or reproach they want to leave at Gilgal. After reading Col 2:13-14, tear the paper together.' },
    { n: '2', icon: '💪', text: pt ? 'A circuncisão foi dolorosa e imobilizou os guerreiros por dias. "O que Deus pediu à nossa família que custou algo mas era necessário para a consagração?" Compartilhem histórias.' : 'Circumcision was painful and immobilized warriors for days. "What did God ask of our family that cost something but was necessary for consecration?" Share stories.' },
    { n: '3', icon: '🍞', text: pt ? '"O maná cessou quando começaram a comer da terra. Deus provê de formas diferentes em épocas diferentes. Que provisão de Deus você reconhece hoje que antes não reconhecia como graça?"' : '"The manna ceased when they began eating from the land. God provides in different ways in different seasons. What provision of God do you recognize today that you previously did not recognize as grace?"' },
    { n: '4', icon: '🎉', text: pt ? 'A Páscoa foi antes da batalha, não depois. "Nossa família celebra a redenção ANTES de conseguir as conquistas, ou só depois?" Como seria uma Páscoa antes da batalha?' : 'Passover was before the battle, not after. "Does our family celebrate redemption BEFORE achieving victories, or only after?" What would a pre-battle Passover look like for your family?' },
    { n: '5', icon: '🏕️', text: pt ? 'Gilgal significa "remover, rolar." Onde na família precisamos de um Gilgal — algo que precisa ser removido ou encerrado antes de avançar?' : 'Gilgal means "to roll, remove." Where in the family do we need a Gilgal — something that needs to be removed or closed before moving forward?' },
    { n: '6', icon: '🙏', text: pt ? 'Orem juntos: nomeiem o vitupério que querem ver removido por Cristo. Declarem em oração a promessa de Cl 2:14 sobre cada item. Datem e guardem a oração.' : 'Pray together: name the reproach you want to see removed by Christ. Declare in prayer the promise of Col 2:14 over each item. Date and keep the prayer.' },
  ];

  const APPS_FAMILIA = [
    { role: pt ? 'Pais' : 'Parents', icon: '👨‍👩‍👧', text: pt ? 'Esta semana, complete um compromisso aliançal inacabado — uma promessa a Deus sobre a família que ainda não foi honrada. O vitupério do "inacabado" só é removido quando o compromisso é cumprido.' : 'This week, complete an unfinished covenantal commitment — a promise to God about the family that has not yet been honored. The reproach of the "unfinished" is only removed when the commitment is fulfilled.' },
    { role: pt ? 'Filhos' : 'Children', icon: '👦', text: pt ? 'A circuncisão doía mas era necessária. Há algo que Deus está pedindo de você que parece doloroso mas é consagração? Converse com seus pais sobre isso.' : 'Circumcision hurt but was necessary. Is there something God is asking of you that seems painful but is consecration? Talk to your parents about this.' },
    { role: pt ? 'Noivos' : 'Engaged', icon: '💍', text: pt ? 'O noivado é um "Gilgal" — um período de remoção de vitupérios e consagração antes de entrar na herança do casamento. Que compromissos aliançais estão pendentes antes do casamento?' : 'Engagement is a "Gilgal" — a period of removing reproaches and consecration before entering the inheritance of marriage. What covenantal commitments are pending before marriage?' },
    { role: pt ? 'Casal' : 'Couple', icon: '👫', text: pt ? 'Identifiquem juntos um "vitupério do Egito" que ainda governa o relacionamento — um padrão herdado da família de origem, uma vergonha não resolvida. Orem por remoção específica.' : 'Together identify an "Egyptian reproach" still governing your relationship — an inherited pattern, an unresolved shame. Pray for specific removal and seek counseling if needed.' },
    { role: pt ? 'Avós' : 'Grandparents', icon: '👴', text: pt ? 'Contem para os netos como Deus removeu um "vitupério" na história da família — uma vergonha, uma escravidão, um ciclo quebrado. Essas histórias são o Gilgal da próxima geração.' : 'Tell grandchildren how God removed a "reproach" in family history — a shame, a bondage, a broken cycle. These stories are the next generation\'s Gilgal.' },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>
      {/* HERO */}
      <div style={{ borderRadius: 20, background: `linear-gradient(135deg,${accL} 0%,rgba(52,211,153,0.07) 60%,rgba(80,200,255,0.05) 100%)`, border: `1px solid ${accB}`, padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10, filter: `drop-shadow(0 0 24px ${acc}80)` }}>✂️🏕️</div>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: acc, marginBottom: 8 }}>
          Josué 5:2–12 · Perícope 258 · {pt ? 'Família — Dia 258' : 'Family — Day 258'}
        </div>
        <div style={{ fontSize: 'clamp(18px,3.2vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'O Vitupério Removido — A Família Consagrada pela Aliança Antes de Entrar na Herança' : 'The Reproach Removed — The Family Consecrated by Covenant Before Entering the Inheritance'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.4vw,17px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'Gilgal · Vitupério removido · Páscoa na terra prometida' : 'Gilgal · Reproach removed · Passover in the promised land'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {[
            pt ? 'Aliança Renovada' : 'Covenant Renewed',
            pt ? 'Vitupério Removido' : 'Reproach Removed',
            pt ? 'Consagração Primeiro' : 'Consecration First',
            pt ? 'Páscoa antes da Batalha' : 'Passover before Battle',
          ].map(t => (
            <span key={t} style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: `${acc}18`, border: `1px solid ${accB}`, color: acc }}>{t}</span>
          ))}
        </div>
      </div>

      {/* BIG IDEA */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(52,211,153,0.10),rgba(120,80,230,0.07))', border: '1.5px solid rgba(52,211,153,0.32)', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>💡 {pt ? 'Big Idea · Para a Família' : 'Big Idea · For the Family'}</div>
        <p style={{ fontSize: 'clamp(18px,2.8vw,22px)', fontWeight: 800, color: '#fff', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Antes de qualquer batalha, Deus chamou Israel a renovar a aliança pela circuncisão — porque a conquista da herança exige que o povo seja primeiramente consagrado ao Deus que concede a herança.'
            : 'Before any battle, God called Israel to renew the covenant through circumcision — because conquering the inheritance requires the people to first be consecrated to the God who grants the inheritance.'}
        </p>
      </div>

      {/* PERGUNTA + DOUTRINA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,100,0.06)', border: '1px solid rgba(255,100,100,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 8 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: 0 }}>
            {pt
              ? '"Há vitupérios — marcas de escravidão espiritual, hábitos do deserto, compromissos inacabados — que nossa família precisa deixar remover antes de entrar na herança que Deus preparou?"'
              : '"Are there reproaches — marks of spiritual slavery, wilderness habits, unfinished commitments — that our family needs to have removed before entering the inheritance God prepared?"'}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.28)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>📜 {pt ? 'Doutrina Central' : 'Central Doctrine'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: 0 }}>
            {pt
              ? 'Antes da conquista, Deus exige consagração — e a consagração que Ele opera é graça pura: Ele remove o vitupério antes que o povo prove qualquer fruto, instituindo a Páscoa como memorial de redenção que sustenta a família em cada passo em direção à herança.'
              : 'Before conquest, God demands consecration — and the consecration He works is pure grace: He removes the reproach before the people taste any fruit, instituting Passover as a memorial of redemption that sustains the family in every step toward the inheritance.'}
          </p>
        </div>
      </div>

      {/* MOVIMENTOS */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
          📋 {pt ? 'Movimentos do Sermão Familiar' : 'Family Sermon Movements'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
          {MOVES.map(m => (
            <div key={m.num} style={{ borderRadius: 16, background: m.corL, border: `1.5px solid ${m.corB}`, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.cor}22`, border: `1.5px solid ${m.cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(16px,2vw,18px)' }}>{m.emoji}</div>
                <div>
                  <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 700, color: m.cor, letterSpacing: '0.12em' }}>{m.num} · {m.sym}</div>
                  <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{m.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic', marginBottom: 8 }}>{m.sub}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{m.key}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: m.cor, lineHeight: 1.55, fontWeight: 600 }}>▸ {m.app}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EIXO REDENTOR */}
      <div style={{ borderRadius: 16, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '18px 22px', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 10 }}>✝️ {pt ? 'Eixo Redentor' : 'Redemptive Axis'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'A circuncisão aponta ao batismo (Cl 2:11-12): em Cristo, o "vitupério da carne" é removido pela circuncisão feita sem mãos. Gilgal é tipo do Calvário — o lugar onde Deus declara o opróbrio removido. "Anulou o escrito das ordenanças que havia contra nós... pregando-o na cruz" (Cl 2:14). A Páscoa em Gilgal aponta à Ceia do Senhor: o cordeiro sacrificado, o sangue que protege, o pão da herança que sustenta o povo redimido até o banquete eterno.'
            : 'Circumcision points to baptism (Col 2:11-12): in Christ, the "reproach of the flesh" is removed by circumcision made without hands. Gilgal is a type of Calvary — the place where God declares the reproach removed. "He canceled the record of debt... nailing it to the cross" (Col 2:14). Passover at Gilgal points to the Lord\'s Supper: the sacrificed lamb, the protecting blood, the inheritance bread that sustains the redeemed people.'}
        </p>
      </div>

      {/* APLICAÇÕES */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.70)', marginBottom: 18, textAlign: 'center' }}>
          🎯 {pt ? 'Aplicações por Papel na Família' : 'Applications by Family Role'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
          {APPS_FAMILIA.map(a => (
            <div key={a.role} style={{ borderRadius: 12, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.20)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: 'rgba(52,211,153,0.95)', marginBottom: 6 }}>{a.icon} {a.role}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.60 }}>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DINÂMICA */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: `${acc}B0`, marginBottom: 18, textAlign: 'center' }}>
          🎲 {pt ? 'Dinâmica Familiar — 6 Atividades' : 'Family Activities — 6 Activities'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 10 }}>
          {ACTIVITIES.map(a => (
            <div key={a.n} style={{ borderRadius: 12, background: `${acc}0F`, border: `1px solid ${accB}`, padding: '12px 14px', display: 'flex', gap: 10 }}>
              <div style={{ fontSize: 'clamp(18px,2.4vw,22px)', lineHeight: 1.2 }}>{a.icon}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60 }}><span style={{ fontWeight: 800, color: acc }}>{a.n}. </span>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONCLUSÃO */}
      <div style={{ borderRadius: 16, background: `linear-gradient(135deg,${accL},rgba(52,211,153,0.07))`, border: `1.5px solid ${accB}`, padding: '20px 24px' }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 10 }}>🏁 {pt ? 'Conclusão' : 'Conclusion'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Família amada, há vitupérios que carregamos como se nunca tivessem sido removidos: vergonhas do passado, ciclos herdados, compromissos inacabados com Deus. Mas Deus tem um Gilgal para cada família — o lugar onde Ele declara: "hoje revolvi de sobre vós o opróbrio." Esse Gilgal tem endereço: chama-se Calvário. Vá para Gilgal. Deixe o vitupério. Coma da Páscoa. E avance. Amém.'
            : 'Beloved family, there are reproaches we carry as if they were never removed: past shames, inherited cycles, unfinished commitments to God. But God has a Gilgal for every family — the place where He declares: "today I have rolled away your reproach." That Gilgal has an address: it is called Calvary. Go to Gilgal. Leave the reproach. Eat of the Passover. And advance. Amen.'}
        </p>
      </div>
    </div>
  );
}

// ─── Infográfico Família · Josué 5:10–12 (Card 259) ─────────────────
function InfograficoJosue259FamiliaSection({ pt }: { pt: boolean }) {
  const acc = 'rgba(230,110,50,1)';
  const accL = 'rgba(230,110,50,0.10)';
  const accB = 'rgba(230,110,50,0.30)';

  const MOVES = [
    {
      num: 'I', sym: 'Js 5:10',
      title: pt ? 'A Páscoa Guardada na Terra Prometida' : 'The Passover Kept in the Promised Land',
      sub: pt ? 'As planícies de Jericó: Israel para para comer o cordeiro com as muralhas à vista' : 'The plains of Jericho: Israel stops to eat the lamb with the walls in sight',
      emoji: '🍞',
      key: pt ? 'O décimo quarto do mês é a data prescrita em Êx 12:6 — Israel guarda a Páscoa com precisão calendárica após quarenta anos de julgamento. As "planícies de Jericó" são geograficamente perturbadoras: Jericó está à vista, as muralhas visíveis. Mas Israel para para comer o cordeiro antes de atacar. A Páscoa precede a guerra; a redenção precede a conquista.' : 'The fourteenth of the month is the date prescribed in Exod 12:6 — Israel keeps Passover with calendrical precision after forty years of judgment. The "plains of Jericho" are geographically disturbing: Jericho is in sight, walls visible. But Israel stops to eat the lamb before attacking. Passover precedes war; redemption precedes conquest.',
      app: pt ? 'Pais: o culto familiar antes do dia de trabalho, a oração antes da decisão difícil, a Ceia antes da semana — são Páscoas em Gilgal. A redenção que a família lembra antes da batalha sustenta no meio dela.' : 'Parents: family worship before the workday, prayer before the hard decision, the Supper before the week — these are Passovers at Gilgal. The redemption the family remembers before battle sustains in the middle of it.',
      cor: acc, corL: accL, corB: accB,
    },
    {
      num: '◉', sym: 'Js 5:11–12',
      title: pt ? 'O Maná Cessa — A Provisão que Muda de Forma — Centro' : 'The Manna Ceases — Provision that Changes Form — Center',
      sub: pt ? 'No deserto, pão do céu; na terra, produto da herança — Deus é o mesmo Provedor' : 'In the wilderness, bread from heaven; in the land, produce of the inheritance — God is the same Provider',
      emoji: '🔥',
      key: pt ? 'O maná cessou — não porque Deus deixou de prover, mas porque a forma da provisão mudou. "Pães ázimos" em referência direta à Páscoa — o pão que conecta a redenção à provisão ordinária. O cessamento do maná não é abandono — é herança. A família que entrou na promessa agora planta, colhe e come a mesma graça de Deus num novo modo.' : 'The manna ceased — not because God stopped providing, but because the form of provision changed. "Unleavened cakes" directly referencing Passover — the bread connecting redemption to ordinary provision. The cessation of manna is not abandonment — it is inheritance. The family that entered the promise now plants, harvests and eats the same grace of God in a new mode.',
      app: pt ? 'Pais: ensinem os filhos a reconhecer a graça de Deus não apenas nos milagres dramáticos, mas no "produto ordinário da terra" — saúde, trabalho, refeição, amizade. A família que só reconhece Deus no extraordinário fica cega para Ele no cotidiano.' : 'Parents: teach children to recognize God\'s grace not only in dramatic miracles, but in the "ordinary produce of the land" — health, work, meals, friendship. The family that only recognizes God in the extraordinary becomes blind to Him in the everyday.',
      cor: 'rgba(52,211,153,1)', corL: 'rgba(52,211,153,0.10)', corB: 'rgba(52,211,153,0.28)',
    },
    {
      num: 'III', sym: 'Js 5:10 + Js 6:1',
      title: pt ? 'Jericó à Vista — Coragem da Páscoa' : 'Jericho in Sight — Passover Courage',
      sub: pt ? 'Israel ao ar livre celebra a Páscoa; Jericó fechada por dentro com medo' : 'Israel celebrates Passover in the open; Jericho closed inside with fear',
      emoji: '🏰',
      key: pt ? 'O contraste é deliberado: Israel ao ar livre celebrando a Páscoa; Jericó fechada por dentro com medo. A memória da redenção dá ao povo de Deus a capacidade de comer com paz enquanto o inimigo treme. A Páscoa não ignora Jericó — ela a enfrenta de uma posição de identidade: "somos o povo do cordeiro que nos redimiu; Jericó não define nossa identidade."' : 'The contrast is deliberate: Israel in the open celebrating Passover; Jericho closed inside with fear. The memory of redemption gives God\'s people the capacity to eat in peace while the enemy trembles. Passover does not ignore Jericho — it faces it from a position of identity: "we are the people of the lamb who redeemed us; Jericho does not define our identity."',
      app: pt ? 'Pais: a refeição familiar é um tipo de Páscoa. Antes de enviar os filhos para o mundo, ali estão vocês nas planícies de Jericó, comendo o pão que Cristo deu. Não subestimem a mesa.' : 'Parents: the family meal is a type of Passover. Before sending children into the world, there you are on the plains of Jericho, eating the bread Christ gave. Do not underestimate the table.',
      cor: 'rgba(80,200,255,1)', corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.28)',
    },
  ];

  const ACTIVITIES = [
    { n: '1', icon: '🍞', text: pt ? 'Leiam Js 5:10-12 juntos. "Israel comeu a Páscoa COM JERICÓ À VISTA. O que isso diz sobre a relação entre memória da redenção e coragem para as batalhas?"' : 'Read Josh 5:10-12 together. "Israel ate the Passover WITH JERICHO IN SIGHT. What does this say about the relationship between memory of redemption and courage for battles?"' },
    { n: '2', icon: '☁️', text: pt ? '"O maná cessou quando a herança começou. Que maná de uma fase anterior Deus substituiu pela provisão ordinária da terra? Como reconhecemos que ambos são igualmente graça?"' : '"The manna ceased when the inheritance began. What manna from a previous season has God replaced with the ordinary provision of the land? How do we recognize both as equally grace?"' },
    { n: '3', icon: '🎭', text: pt ? 'Criem um ritual de "Páscoa familiar" antes de grandes desafios: leiam Sl 116 ou 1Co 11:23-26, partam um pão juntos e orem antes de enfrentar a situação difícil.' : 'Create a "family Passover" ritual before great challenges: read Ps 116 or 1 Cor 11:23-26, break bread together, and pray before facing the difficult situation.' },
    { n: '4', icon: '🤔', text: pt ? '"Qual foi a última vez que saímos para o campo de batalha sem ter comido a Páscoa — sem ter lembrado do que Cristo fez?" Como isso afetou o resultado?' : '"When was the last time we went into battle without eating the Passover — without remembering what Christ did?" How did that affect the outcome?' },
    { n: '5', icon: '👶', text: pt ? '"Se você soubesse que amanhã haveria uma batalha muito difícil, o que você faria hoje à noite?" Conectem com a Páscoa que Israel guardou nas planícies de Jericó.' : '"If you knew there would be a very difficult battle tomorrow, what would you do tonight?" Connect with the Passover Israel kept on the plains of Jericho.' },
    { n: '6', icon: '🙏', text: pt ? 'Orem juntos nomeando as "Jericós" de cada membro. Declarem sobre cada uma: "Somos o povo do cordeiro que nos resgatou — esta Jericó não nos define."' : 'Pray together naming each member\'s "Jerichos." Declare over each: "We are the people of the lamb who redeemed us — this Jericho does not define us."' },
  ];

  const APPS_FAMILIA = [
    { role: pt ? 'Pais' : 'Parents', icon: '👨‍👩‍👧', text: pt ? 'Estabeleçam a refeição familiar como "Páscoa cotidiana" — um momento de gratidão explícita antes de enviar cada membro para as batalhas do dia.' : 'Establish the family meal as a "daily Passover" — a moment of explicit gratitude before sending each member into the battles of the day.' },
    { role: pt ? 'Filhos' : 'Children', icon: '👦', text: pt ? 'Antes de um desafio difícil esta semana, leiam juntos com os pais um versículo sobre o que Cristo fez por vocês. Saiam de casa com a Páscoa na memória.' : 'Before a difficult challenge this week, read together with your parents a verse about what Christ did for you. Leave home with Passover in your memory.' },
    { role: pt ? 'Noivos' : 'Engaged', icon: '💍', text: pt ? 'Conversem sobre como celebrarão a Ceia do Senhor juntos como casal — ela será a Páscoa do lar, o memorial que sustenta antes de cada batalha da vida conjugal.' : 'Talk about how you will celebrate the Lord\'s Supper together as a couple — it will be the home\'s Passover, the memorial that sustains before each battle of married life.' },
    { role: pt ? 'Casal' : 'Couple', icon: '👫', text: pt ? 'Identifiquem a "Jericó" mais presente na vida de vocês agora. Antes de decidir como atacá-la, sentem-se à mesa e leiam juntos 1Co 11:23-26. A Páscoa precede a estratégia.' : 'Identify the most present "Jericho" in your lives now. Before deciding how to attack it, sit at the table and read 1 Cor 11:23-26 together. Passover precedes strategy.' },
    { role: pt ? 'Avós' : 'Grandparents', icon: '👴', text: pt ? 'Contem aos netos uma batalha que enfrentaram depois de ter comido o cordeiro — e como a memória da redenção os sustentou. Vocês já guardaram muitas Páscoas nas planícies de muitas Jericós.' : 'Tell grandchildren about a battle you faced after eating the lamb — and how the memory of redemption sustained you. You have kept many Passovers on the plains of many Jerichos.' },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>
      {/* HERO */}
      <div style={{ borderRadius: 20, background: `linear-gradient(135deg,${accL} 0%,rgba(52,211,153,0.07) 60%,rgba(80,200,255,0.05) 100%)`, border: `1px solid ${accB}`, padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10, filter: `drop-shadow(0 0 24px ${acc}80)` }}>🍞🔥</div>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: acc, marginBottom: 8 }}>
          Josué 5:10–12 · Perícope 259 · {pt ? 'Família — Dia 259' : 'Family — Day 259'}
        </div>
        <div style={{ fontSize: 'clamp(18px,3.2vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'A Páscoa em Gilgal — A Família que Come da Redenção Antes de Entrar na Batalha' : 'The Passover at Gilgal — The Family that Eats of Redemption Before Entering Battle'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.4vw,17px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'Páscoa antes da guerra · Maná cessa · Jericó à vista' : 'Passover before war · Manna ceases · Jericho in sight'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {[
            pt ? 'Redenção Primeiro' : 'Redemption First',
            pt ? 'Memória que Sustenta' : 'Sustaining Memory',
            pt ? 'Coragem da Mesa' : 'Table Courage',
            pt ? 'Identidade Redimida' : 'Redeemed Identity',
          ].map(t => (
            <span key={t} style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: `${acc}18`, border: `1px solid ${accB}`, color: acc }}>{t}</span>
          ))}
        </div>
      </div>

      {/* BIG IDEA */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(52,211,153,0.10),rgba(230,110,50,0.07))', border: '1.5px solid rgba(52,211,153,0.32)', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>💡 {pt ? 'Big Idea · Para a Família' : 'Big Idea · For the Family'}</div>
        <p style={{ fontSize: 'clamp(18px,2.8vw,22px)', fontWeight: 800, color: '#fff', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Deus não deixou Israel partir para Jericó sem primeiro celebrar a Páscoa — porque a família que lembra de onde foi resgatada tem coragem para avançar, e a que esquece entra na batalha pela força própria.'
            : 'God did not let Israel depart for Jericho without first celebrating Passover — because the family that remembers where it was rescued from has courage to advance, and the one that forgets enters battle by its own strength.'}
        </p>
      </div>

      {/* PERGUNTA + DOUTRINA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,100,0.06)', border: '1px solid rgba(255,100,100,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 8 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: 0 }}>
            {pt
              ? '"Nossa família celebra a redenção de Cristo antes das batalhas ou apenas depois das vitórias? Como a memória do que Cristo fez muda nossa postura diante do que ainda precisamos enfrentar?"'
              : '"Does our family celebrate the redemption of Christ before battles or only after victories? How does the memory of what Christ did change our posture toward what we still need to face?"'}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.28)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>📜 {pt ? 'Doutrina Central' : 'Central Doctrine'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: 0 }}>
            {pt
              ? 'A família que lembra da redenção antes de entrar na batalha tem identidade e coragem que a que esquece não tem — porque a Páscoa declara: nossa conquista não depende de nossa força, mas do cordeiro que nos resgatou.'
              : 'The family that remembers redemption before entering battle has identity and courage that the one that forgets does not have — because Passover declares: our conquest does not depend on our strength, but on the lamb that redeemed us.'}
          </p>
        </div>
      </div>

      {/* MOVIMENTOS */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
          📋 {pt ? 'Movimentos do Sermão Familiar' : 'Family Sermon Movements'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
          {MOVES.map(m => (
            <div key={m.num} style={{ borderRadius: 16, background: m.corL, border: `1.5px solid ${m.corB}`, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.cor}22`, border: `1.5px solid ${m.cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(16px,2vw,18px)' }}>{m.emoji}</div>
                <div>
                  <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 700, color: m.cor, letterSpacing: '0.12em' }}>{m.num} · {m.sym}</div>
                  <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{m.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic', marginBottom: 8 }}>{m.sub}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{m.key}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: m.cor, lineHeight: 1.55, fontWeight: 600 }}>▸ {m.app}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EIXO REDENTOR */}
      <div style={{ borderRadius: 16, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '18px 22px', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 10 }}>✝️ {pt ? 'Eixo Redentor' : 'Redemptive Axis'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'A Páscoa em Gilgal é o tipo mais claro da Ceia do Senhor em Josué. O cordeiro pascal do Egito (Êx 12), a Páscoa em Gilgal (Js 5) e a Ceia do Senhor (1Co 11:23-26) formam linha progressiva: redenção do Egito → entrada na herança → antecipação do banquete eterno. Jesus declarou: "Não beberei mais deste fruto da videira até aquele dia em que o beber novo convosco no reino" (Mt 26:29). A família que parte o pão está aguardando o banquete do Rei.'
            : 'Passover at Gilgal is the clearest type of the Lord\'s Supper in Joshua. The Passover lamb of Egypt (Exod 12), Passover at Gilgal (Josh 5) and the Lord\'s Supper (1 Cor 11:23-26) form a progressive line: redemption from Egypt → entry into the inheritance → anticipation of the eternal banquet. The family that breaks bread together is awaiting the King\'s banquet.'}
        </p>
      </div>

      {/* APLICAÇÕES */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.70)', marginBottom: 18, textAlign: 'center' }}>
          🎯 {pt ? 'Aplicações por Papel na Família' : 'Applications by Family Role'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
          {APPS_FAMILIA.map(a => (
            <div key={a.role} style={{ borderRadius: 12, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.20)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: 'rgba(52,211,153,0.95)', marginBottom: 6 }}>{a.icon} {a.role}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.60 }}>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DINÂMICA */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: `${acc}B0`, marginBottom: 18, textAlign: 'center' }}>
          🎲 {pt ? 'Dinâmica Familiar — 6 Atividades' : 'Family Activities — 6 Activities'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 10 }}>
          {ACTIVITIES.map(a => (
            <div key={a.n} style={{ borderRadius: 12, background: `${acc}0F`, border: `1px solid ${accB}`, padding: '12px 14px', display: 'flex', gap: 10 }}>
              <div style={{ fontSize: 'clamp(18px,2.4vw,22px)', lineHeight: 1.2 }}>{a.icon}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60 }}><span style={{ fontWeight: 800, color: acc }}>{a.n}. </span>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONCLUSÃO */}
      <div style={{ borderRadius: 16, background: `linear-gradient(135deg,${accL},rgba(52,211,153,0.07))`, border: `1.5px solid ${accB}`, padding: '20px 24px' }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 10 }}>🏁 {pt ? 'Conclusão' : 'Conclusion'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Família amada, Jericó está à vista. Os muros são altos e as portas estão trancadas. Mas Deus não chamou Israel para atacar sem antes comer. Ele chamou para a Páscoa — para o memorial do cordeiro, para o pão da redenção. A família que senta à mesa de Cristo antes de entrar no campo tem uma força que o inimigo não tem: a memória de que Deus já venceu o maior inimigo, no maior Calvário. Comam o cordeiro. E então avancem. Amém.'
            : 'Beloved family, Jericho is in sight. The walls are high and the gates are shut. But God did not call Israel to attack without first eating. He called them to Passover — to the memorial of the lamb, to the bread of redemption. The family that sits at Christ\'s table before entering the field has a strength the enemy does not have. Eat the lamb. And then advance. Amen.'}
        </p>
      </div>
    </div>
  );
}

// ─── Infográfico Família · Josué 5:13–15 (Card 260) ─────────────────
function InfograficoJosue260FamiliaSection({ pt }: { pt: boolean }) {
  const acc = 'rgba(255,200,50,1)';
  const accL = 'rgba(255,200,50,0.10)';
  const accB = 'rgba(255,200,50,0.30)';

  const MOVES = [
    {
      num: 'I', sym: 'Js 5:13–14a',
      title: pt ? 'A Pergunta Revertida — Josué Não é o Comandante' : 'The Question Reversed — Joshua Is Not the Commander',
      sub: pt ? '"És dos nossos ou dos adversários?" — "Não" — o Príncipe recusa ambas as categorias' : '"Are you for us or against us?" — "No" — the Prince refuses both categories',
      emoji: '⚔️',
      key: pt ? 'A resposta divina recusa ambas as categorias: "Não" — nem dos teus, nem dos adversários. O Príncipe do Exército não é aliado a ser recrutado; é o Comandante a ser obedecido. Josué chegou a Jericó pensando que era ele quem comandava — a teofania corrige radicalmente. "Príncipe do exército do SENHOR" (śar-tsĕbaʾ YHWH) é uma das teofanias pré-encarnadas de Cristo.' : 'The divine response refuses both categories: "No" — neither yours nor the adversaries\'. The Commander of the Army is not an ally to be recruited; He is the Commander to be obeyed. Joshua arrived at Jericho thinking he commanded — the theophany radically corrects this. "Commander of YHWH\'s army" (sar-tseba\' YHWH) is one of the pre-incarnate theophanies of Christ.',
      app: pt ? 'Pais: nas decisões familiares difíceis, você age como Josué antes (perguntando "Deus está do nosso lado?") ou como Josué depois da teofania (perguntando "o que o Comandante ordena?") A postura muda tudo.' : 'Parents: in difficult family decisions, do you act like Joshua before (asking "Is God on our side?") or like Joshua after the theophany (asking "what does the Commander order?") The posture changes everything.',
      cor: acc, corL: accL, corB: accB,
    },
    {
      num: '◉', sym: 'Js 5:14b–15',
      title: pt ? 'A Adoração Antes da Estratégia — Centro' : 'Worship Before Strategy — Center',
      sub: pt ? 'Josué cai, adora, pergunta, obedece — a adoração precede a pergunta sobre a estratégia' : 'Joshua falls, worships, asks, obeys — worship precedes the question about strategy',
      emoji: '👑',
      key: pt ? 'A sequência é teologicamente precisa: Josué cai (prostração), adora, pergunta ("que diz meu Senhor?"), obedece imediatamente. O mandato de tirar as sandálias espelha Moisés na sarça (Êx 3:5). "O lugar onde estás é santo" — o terreno de batalha é solo sagrado; a guerra santa é litúrgica antes de ser militar. Josué recebe a estratégia de Jericó DEPOIS de se prostrar.' : 'The sequence is theologically precise: Joshua falls (prostration), worships, asks ("what does my Lord say?"), obeys immediately. The mandate to remove sandals mirrors Moses at the burning bush (Exod 3:5). "The place where you stand is holy" — the battlefield is holy ground; holy war is liturgical before military. Joshua receives Jericho\'s strategy AFTER prostrating himself.',
      app: pt ? 'Pais: a oração antes de qualquer decisão familiar não é ritual — é prostração diante do Comandante antes de pedir as ordens. Tirar as sandálias é reconhecer que o solo onde a família está é sagrado.' : 'Parents: prayer before any family decision is not ritual — it is prostration before the Commander before asking for orders. Removing sandals is recognizing that the ground where the family stands is sacred.',
      cor: 'rgba(52,211,153,1)', corL: 'rgba(52,211,153,0.10)', corB: 'rgba(52,211,153,0.28)',
    },
    {
      num: 'III', sym: 'Js 5:15 + Js 6:2',
      title: pt ? 'O Solo Santo — A Batalha é Litúrgica' : 'Holy Ground — The Battle Is Liturgical',
      sub: pt ? '"O lugar onde estás é santo" — toda a campanha de Josué é culto antes de ser guerra' : '"The place where you stand is holy" — all of Joshua\'s campaign is worship before war',
      emoji: '🌟',
      key: pt ? 'A santidade do solo implica que toda a campanha é culto antes de guerra. As marchas ao redor de Jericó (Js 6) com a Arca à frente, sacerdotes com trombetas, silêncio do povo — é uma liturgia processional. A batalha de Jericó não foi vencida pela habilidade militar, mas pela obediência litúrgica. "O que parece estratégia militar é, em sua essência, adoração obediente ao Comandante que já entregou a cidade."' : 'The holiness of the ground implies the entire campaign is worship before war. The marches around Jericho (Josh 6) with the Ark ahead, priests with trumpets, the people\'s silence — it is a processional liturgy. Jericho\'s battle was not won by military skill, but by liturgical obedience. "What looks like military strategy is, in its essence, obedient worship to the Commander who already delivered the city."',
      app: pt ? 'Pais: a escola dos filhos, o local de trabalho, a vizinhança — são solos santos onde vocês foram colocados como embaixadores de Cristo. Tirem as sandálias; o terreno onde atuam é sagrado.' : 'Parents: the children\'s school, the workplace, the neighborhood — are holy grounds where you were placed as Christ\'s ambassadors. Remove your sandals; the terrain where you operate is sacred.',
      cor: 'rgba(80,200,255,1)', corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.28)',
    },
  ];

  const ACTIVITIES = [
    { n: '1', icon: '⚔️', text: pt ? 'Leiam Js 5:13-15 juntos. "Josué perguntou: És dos nossos ou dos adversários? A resposta foi: Não. O que isso significa para como pensamos sobre Deus nas nossas batalhas?"' : 'Read Josh 5:13-15 together. "Joshua asked: Are you for us or against us? The answer was: No. What does this mean for how we think about God in our battles?"' },
    { n: '2', icon: '👟', text: pt ? 'Moisés e Josué receberam o mesmo mandato: tirar as sandálias. "O que significa tirar as sandálias para nossa família hoje? Que atitude ou postura precisamos remover diante de Deus?"' : 'Moses and Joshua received the same mandate: remove sandals. "What does removing sandals mean for our family today? What attitude or posture do we need to remove before God?"' },
    { n: '3', icon: '🤫', text: pt ? 'Josué adorou ANTES de pedir a estratégia. Pratiquem: antes de discutir qualquer assunto difícil na família esta semana, passem 2 minutos em silêncio ou oração antes de começar.' : 'Joshua worshipped BEFORE asking for strategy. Practice: before discussing any difficult topic in the family this week, spend 2 minutes in silence or prayer before starting.' },
    { n: '4', icon: '🛡️', text: pt ? '"A batalha pertence ao SENHOR" (1Sm 17:47) — como essa verdade muda o que você sente de responsabilidade, medo e pressão nas batalhas atuais? Cada membro compartilha.' : '"The battle belongs to the LORD" (1 Sam 17:47) — how does this truth change what you feel about responsibility, fear and pressure in current battles? Each member shares.' },
    { n: '5', icon: '📖', text: pt ? 'Leiam Efésios 6:10-18. Compare a armadura do crente com a liturgia de Jericó — quais elementos são litúrgicos antes de serem táticos? Como a família pode se "armar" dessa forma?' : 'Read Ephesians 6:10-18. Compare the believer\'s armor with the Jericho liturgy — which elements are liturgical before tactical? How can the family "arm" itself this way?' },
    { n: '6', icon: '🙏', text: pt ? 'Orem de joelhos juntos — literalmente prostrados — confessando que Cristo é o Príncipe do Exército da família e pedindo as ordens para a semana.' : 'Pray on your knees together — literally prostrate — confessing that Christ is the family\'s Commander of the Army and asking for orders for the week.' },
  ];

  const APPS_FAMILIA = [
    { role: pt ? 'Pais' : 'Parents', icon: '👨‍👩‍👧', text: pt ? 'Antes de qualquer decisão familiar importante esta semana, realizem uma "prostração de Josué" — um momento de adoração explícita onde a família reconhece que o Comandante é Cristo, não os pais.' : 'Before any important family decision this week, perform a "Joshua prostration" — a moment of explicit worship where the family recognizes that the Commander is Christ, not the parents.' },
    { role: pt ? 'Filhos' : 'Children', icon: '👦', text: pt ? 'Na sua maior batalha atual, pratique a pergunta de Josué pós-prostração: "Que diz meu Senhor ao seu servo?" Abra a Bíblia e procure a resposta.' : 'In your greatest current battle, practice Joshua\'s post-prostration question: "What does my Lord say to His servant?" Open the Bible and look for the answer.' },
    { role: pt ? 'Noivos' : 'Engaged', icon: '💍', text: pt ? 'Conversem sobre como tomarão decisões juntos como casal — começando pela adoração ou pela estratégia? A família que se prostra antes de decidir tem discernimento que a que não se prostra não tem.' : 'Talk about how you will make decisions together as a couple — starting with worship or strategy? The family that prostrates before deciding has discernment that the one that does not prostrate lacks.' },
    { role: pt ? 'Casal' : 'Couple', icon: '👫', text: pt ? 'Identifiquem a maior "Jericó" da vida de vocês agora. Antes de discutir como atacá-la, sentem-se juntos, tirem as "sandálias" e perguntem: "Que diz nosso Senhor?" ' : 'Identify the greatest "Jericho" in your lives now. Before discussing how to attack it, sit together, remove your "sandals" and ask: "What does our Lord say?"' },
    { role: pt ? 'Avós' : 'Grandparents', icon: '👴', text: pt ? 'Contem uma história em que Deus virou a pergunta de vocês — em que foram a Ele perguntando "Deus, você está do nosso lado?" e Ele revelou que a pergunta estava errada. Como isso mudou tudo?' : 'Tell a story when God reversed your question — when you went to Him asking "God, are you on our side?" and He revealed the question was wrong. How did that change everything?' },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>
      {/* HERO */}
      <div style={{ borderRadius: 20, background: `linear-gradient(135deg,${accL} 0%,rgba(52,211,153,0.07) 60%,rgba(80,200,255,0.05) 100%)`, border: `1px solid ${accB}`, padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10, filter: `drop-shadow(0 0 24px ${acc}80)` }}>⚔️👑</div>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: acc, marginBottom: 8 }}>
          Josué 5:13–15 · Perícope 260 · {pt ? 'Família — Dia 260' : 'Family — Day 260'}
        </div>
        <div style={{ fontSize: 'clamp(18px,3.2vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'O Príncipe do Exército — A Família que Aprende que a Batalha Pertence ao Senhor' : 'The Commander of the Army — The Family that Learns the Battle Belongs to the Lord'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.4vw,17px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'Pergunta revertida · Adoração antes da estratégia · Solo santo' : 'Question reversed · Worship before strategy · Holy ground'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {[
            pt ? 'Cristo Comanda' : 'Christ Commands',
            pt ? 'Adoração Primeiro' : 'Worship First',
            pt ? 'Solo Santo' : 'Holy Ground',
            pt ? 'Batalha Litúrgica' : 'Liturgical Battle',
          ].map(t => (
            <span key={t} style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: `${acc}18`, border: `1px solid ${accB}`, color: acc }}>{t}</span>
          ))}
        </div>
      </div>

      {/* BIG IDEA */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(52,211,153,0.10),rgba(255,200,50,0.07))', border: '1.5px solid rgba(52,211,153,0.32)', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>💡 {pt ? 'Big Idea · Para a Família' : 'Big Idea · For the Family'}</div>
        <p style={{ fontSize: 'clamp(18px,2.8vw,22px)', fontWeight: 800, color: '#fff', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Quando Josué encontrou o Príncipe do Exército com espada desembainhada, ele aprendeu a lição mais importante antes de Jericó: esta batalha não é sua — você não é o comandante, é o soldado sob ordens.'
            : 'When Joshua met the Commander of the Army with drawn sword, he learned the most important lesson before Jericho: this battle is not yours — you are not the commander, you are the soldier under orders.'}
        </p>
      </div>

      {/* PERGUNTA + DOUTRINA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,100,0.06)', border: '1px solid rgba(255,100,100,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 8 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: 0 }}>
            {pt
              ? '"Nas batalhas da nossa família, quem é o comandante? Josué precisou tirar as sandálias e se prostrar antes de receber as ordens. O que significa para a nossa família se prostrar diante do Senhor antes de agir?"'
              : '"In our family\'s battles, who is the commander? Joshua had to remove his sandals and prostrate himself before receiving orders. What does it mean for our family to prostrate before the Lord before acting?"'}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.28)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>📜 {pt ? 'Doutrina Central' : 'Central Doctrine'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: 0 }}>
            {pt
              ? 'A família que aprende a se prostrar diante do Comandante antes de agir descobre que a batalha pertence ao SENHOR — e que a estratégia divina é sempre litúrgica antes de ser tática, adoração antes de ação.'
              : 'The family that learns to prostrate before the Commander before acting discovers that the battle belongs to the LORD — and that divine strategy is always liturgical before tactical, worship before action.'}
          </p>
        </div>
      </div>

      {/* MOVIMENTOS */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
          📋 {pt ? 'Movimentos do Sermão Familiar' : 'Family Sermon Movements'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
          {MOVES.map(m => (
            <div key={m.num} style={{ borderRadius: 16, background: m.corL, border: `1.5px solid ${m.corB}`, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.cor}22`, border: `1.5px solid ${m.cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(16px,2vw,18px)' }}>{m.emoji}</div>
                <div>
                  <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 700, color: m.cor, letterSpacing: '0.12em' }}>{m.num} · {m.sym}</div>
                  <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{m.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic', marginBottom: 8 }}>{m.sub}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{m.key}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: m.cor, lineHeight: 1.55, fontWeight: 600 }}>▸ {m.app}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EIXO REDENTOR */}
      <div style={{ borderRadius: 16, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '18px 22px', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 10 }}>✝️ {pt ? 'Eixo Redentor' : 'Redemptive Axis'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'O Príncipe do Exército com espada desembainhada é Cristo pré-encarnado — o mesmo que em Ap 19:11-16 retorna com espada da boca para a batalha final. No Calvário, a espada da justiça divina foi desembainhada contra o próprio Filho (Zc 13:7). Cristo recebeu a espada para que Seu povo não a receba. Nossa batalha é litúrgica: adoração, Palavra, oração, comunhão, Ceia — as trombetas que derrubam as muralhas de Jericó.'
            : 'The Commander of the Army with drawn sword is the pre-incarnate Christ — the same who in Rev 19:11-16 returns with the sword of His mouth for the final battle. At Calvary, the sword of divine justice was drawn against the Son Himself (Zech 13:7). Christ received the sword so His people would not. Our battle is liturgical: worship, Word, prayer, fellowship, Supper — the trumpets that topple Jericho\'s walls.'}
        </p>
      </div>

      {/* APLICAÇÕES */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.70)', marginBottom: 18, textAlign: 'center' }}>
          🎯 {pt ? 'Aplicações por Papel na Família' : 'Applications by Family Role'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
          {APPS_FAMILIA.map(a => (
            <div key={a.role} style={{ borderRadius: 12, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.20)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: 'rgba(52,211,153,0.95)', marginBottom: 6 }}>{a.icon} {a.role}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.60 }}>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DINÂMICA */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: `${acc}B0`, marginBottom: 18, textAlign: 'center' }}>
          🎲 {pt ? 'Dinâmica Familiar — 6 Atividades' : 'Family Activities — 6 Activities'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 10 }}>
          {ACTIVITIES.map(a => (
            <div key={a.n} style={{ borderRadius: 12, background: `${acc}0F`, border: `1px solid ${accB}`, padding: '12px 14px', display: 'flex', gap: 10 }}>
              <div style={{ fontSize: 'clamp(18px,2.4vw,22px)', lineHeight: 1.2 }}>{a.icon}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60 }}><span style={{ fontWeight: 800, color: acc }}>{a.n}. </span>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONCLUSÃO */}
      <div style={{ borderRadius: 16, background: `linear-gradient(135deg,${accL},rgba(52,211,153,0.07))`, border: `1.5px solid ${accB}`, padding: '20px 24px' }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 10 }}>🏁 {pt ? 'Conclusão' : 'Conclusion'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Família amada, o Príncipe do Exército está diante de vocês com a espada desembainhada. Ele não está do lado de vocês nem dos adversários — Ele é o Comandante. A única pergunta certa é: "Senhor, o que ordenas?" Prostrem-se primeiro. Adorem antes de agir. Tirem as sandálias — o solo onde estão é santo. E então ouçam: "Vê, tenho entregado na tua mão Jericó." Amém.'
            : 'Beloved family, the Commander of the Army stands before you with a drawn sword. He is not on your side or the adversaries\' — He is the Commander. The only right question is: "Lord, what do you command?" Prostrate yourselves first. Worship before acting. Remove your sandals — the ground where you stand is holy. And then hear: "See, I have given Jericho into your hand." Amen.'}
        </p>
      </div>
    </div>
  );
}

// ─── Infográfico Família · Josué 6:1–25 (Card 261) ──────────────────
function InfograficoJosue261FamiliaSection({ pt }: { pt: boolean }) {
  const acc = 'rgba(180,115,50,1)';
  const accL = 'rgba(180,115,50,0.10)';
  const accB = 'rgba(180,115,50,0.30)';

  const MOVES = [
    {
      num: 'I', sym: 'Js 6:1–13',
      title: pt ? 'A Estratégia que é Culto — A Arca na Frente da Guerra' : 'The Strategy that Is Worship — The Ark at the Front of War',
      sub: pt ? 'Sete sacerdotes, sete trombetas, sete dias: toda a estrutura da campanha é litúrgica' : 'Seven priests, seven trumpets, seven days: the entire campaign structure is liturgical',
      emoji: '🏰',
      key: pt ? 'A estratégia é contracultural: não assalto frontal, não catapultas — marcha processional com a Arca na frente e sacerdotes tocando trombetas. O número sete (sacerdotes, trombetas, dias, voltas) é número da perfeição aliançal. O shôphar é instrumento do Jubileu (Lv 25:9) — Jericó cai ao som do instrumento do culto, não da guerra. Apenas Raabe sobrevive: a graça precede o juízo na narrativa.' : 'The strategy is countercultural: no frontal assault, no catapults — processional march with the Ark ahead and priests blowing trumpets. The number seven (priests, trumpets, days, circuits) is the number of covenantal perfection. The shofar is the instrument of Jubilee (Lev 25:9) — Jericho falls to the sound of the worship instrument, not war. Only Rahab survives: grace precedes judgment in the narrative.',
      app: pt ? 'Pais: qual é a Jericó da sua família — o obstáculo que parece impenetrável? A pergunta não é "como atacamos?" mas "qual é a marcha que Deus ordenou?" Às vezes é consistência fiel na Palavra; às vezes é perdão repetido; às vezes é oração diária por sete dias.' : 'Parents: what is your family\'s Jericho — the seemingly impenetrable obstacle? The question is not "how do we attack?" but "what march did God order?" Sometimes it is faithful consistency in the Word; sometimes repeated forgiveness; sometimes daily prayer for seven days.',
      cor: acc, corL: accL, corB: accB,
    },
    {
      num: '◉', sym: 'Js 6:10, 16, 20',
      title: pt ? 'O Silêncio do Povo e o Clamor que Derruba — Centro' : 'The People\'s Silence and the Shout that Topples — Center',
      sub: pt ? 'Seis dias de marcha silenciosa prepararam para um clamor que derrubou o que parecia indestrutível' : 'Six days of silent march prepared for a shout that toppled what seemed indestructible',
      emoji: '📯',
      key: pt ? '"Não griteis... até ao dia em que eu vos disser: Gritai!" (6:10). O clamor no momento certo (rûaʿ gādôl) é o ato de fé coletivo. A estrutura é quiástica: silêncio → marcha → CLAMOR → queda. O quiasma concentra no clamor o ponto de virada. Teologicamente: o silêncio obediente e o clamor no tempo de Deus são mais poderosos que qualquer iniciativa humana fora do tempo.' : '"Do not shout... until the day I say: Shout!" (6:10). The shout at the right moment (rua\' gadol) is the collective act of faith. The structure is chiastic: silence → march → SHOUT → fall. The chiasm concentrates the turning point in the shout. Theologically: obedient silence and the shout in God\'s time are more powerful than any human initiative out of time.',
      app: pt ? 'Pais: há orações da família que estão no sexto dia de marcha silenciosa? Não desistam antes do sétimo dia. O silêncio obediente é tão importante quanto o clamor final.' : 'Parents: are there family prayers on the "sixth day of silent march"? Do not give up before the seventh day. Obedient silence is as important as the final shout.',
      cor: 'rgba(52,211,153,1)', corL: 'rgba(52,211,153,0.10)', corB: 'rgba(52,211,153,0.28)',
    },
    {
      num: 'III', sym: 'Js 6:17, 22–25',
      title: pt ? 'Raabe Salva — A Graça que Precede o Juízo' : 'Rahab Saved — The Grace that Precedes Judgment',
      sub: pt ? 'Em meio ao herem, o cordão escarlate faz exceção — a casa marcada sobrevive enquanto tudo cai' : 'In the midst of herem, the scarlet cord makes an exception — the marked house survives while everything falls',
      emoji: '🔴',
      key: pt ? 'Em meio ao herem (destruição total), a graça faz exceção por Raabe. O cordão escarlate (2:18) é cumprido: a casa marcada sobrevive. A inclusão de "todos os que estiverem com ela" confirma que a salvação de Raabe tem alcance familiar. Raabe "habita no meio de Israel até hoje" (6:25) — ela se tornou israelita, foi incluída na comunidade do pacto. A narrativa começa e termina com Raabe: o livro está emoldurado pela graça.' : 'In the midst of herem (total destruction), grace makes an exception for Rahab. The scarlet cord (2:18) is fulfilled: the marked house survives. The inclusion of "all who are with her" confirms Rahab\'s salvation has family scope. Rahab "lived in the midst of Israel to this day" (6:25) — she became Israelite, was included in the covenant community. The narrative begins and ends with Rahab: the book is framed by grace.',
      app: pt ? 'Pais: Raabe pediu salvação para "meu pai, minha mãe, meus irmãos" — sua fé foi missionária para os seus antes de ser pública para os outros. A intercessão pelos membros da família ainda não salvos é a missão mais próxima que existe.' : 'Parents: Rahab asked for salvation for "my father, my mother, my brothers" — her faith was missionary to her own before being public to others. Intercession for unsaved family members is the closest mission there is.',
      cor: 'rgba(80,200,255,1)', corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.28)',
    },
  ];

  const ACTIVITIES = [
    { n: '1', icon: '🏰', text: pt ? 'Leiam Js 6:3-5 juntos. "A estratégia de Deus era marchar em silêncio por seis dias e gritar no sétimo. O que você teria pensado se fosse um soldado ouvindo isso? O que isso nos ensina sobre confiar nas instruções de Deus?"' : 'Read Josh 6:3-5 together. "God\'s strategy was to march in silence for six days and shout on the seventh. What would you have thought if you were a soldier hearing this? What does this teach us about trusting God\'s instructions?"' },
    { n: '2', icon: '🧱', text: pt ? 'Os muros de Jericó eram famosos — impenetráveis para a tecnologia militar da época. Cada membro nomeia uma "muralha de Jericó" na própria vida. Orem juntos ao redor de cada uma.' : 'The walls of Jericho were famous — impenetrable by the military technology of the era. Each member names a "Jericho wall" in their own life. Pray together around each one.' },
    { n: '3', icon: '🤫', text: pt ? 'Josué mandou o povo ficar em silêncio por seis dias. "Para a nossa família, que tipo de silêncio obediente Deus está pedindo agora — que batalha estamos tentando resolver com palavras quando precisamos de silêncio e marcha?"' : 'Joshua commanded the people to be silent for six days. "For our family, what kind of obedient silence is God asking for now — what battle are we trying to resolve with words when we need silence and march?"' },
    { n: '4', icon: '🔴', text: pt ? 'Raabe foi salva porque seu cordão escarlate estava visível. "Nossa família tem sinais visíveis de quem pertence ao Senhor? O que pessoas de fora veem que distingue esta casa?"' : 'Rahab was saved because her scarlet cord was visible. "Does our family have visible signs of who belongs to the Lord? What do people from outside see that distinguishes this home?"' },
    { n: '5', icon: '📖', text: pt ? 'Leiam Hebreus 11:30: "Pela fé caíram as muralhas de Jericó, depois de rodeadas por sete dias." A fé que derruba muros persevera em obediência mesmo sem ver resultado. Como cultivamos essa fé?' : 'Read Hebrews 11:30: "By faith the walls of Jericho fell down after they had been encircled for seven days." Faith that topples walls perseveres in obedience even without seeing results. How do we cultivate this faith?' },
    { n: '6', icon: '🚶', text: pt ? 'Orem juntos — de preferência literalmente marchando ao redor de um cômodo da casa — intercedendo por cada "Jericó" familiar. Terminem com um "clamor" unido de adoração e confiança.' : 'Pray together — preferably literally marching around a room in the house — interceding for each family "Jericho." End with a united "shout" of worship and trust.' },
  ];

  const APPS_FAMILIA = [
    { role: pt ? 'Pais' : 'Parents', icon: '👨‍👩‍👧', text: pt ? 'Identifiquem as "Jericós" da família — obstáculos que parecem impenetráveis. Esta semana, comecem uma "marcha litúrgica" ao redor deles: oração diária, leitura da Palavra, confiança silenciosa. Não parem antes do sétimo dia.' : 'Identify the family\'s "Jerichos" — seemingly impenetrable obstacles. This week, begin a "liturgical march" around them: daily prayer, reading the Word, silent trust. Do not stop before the seventh day.' },
    { role: pt ? 'Filhos' : 'Children', icon: '👦', text: pt ? 'Os muros não caíram no primeiro dia. Qual é a coisa que você está prestes a desistir porque não viu resultado? Quantas voltas você já deu? Quantas faltam?' : 'The walls did not fall on the first day. What is the thing you are about to give up on because you saw no result? How many circuits have you done? How many remain?' },
    { role: pt ? 'Noivos' : 'Engaged', icon: '💍', text: pt ? 'O casamento terá suas Jericós — obstáculos que parecem impenetráveis. Decidam agora: quando as muralhas não caírem na primeira volta, vão marchar juntos ou desistir sozinhos?' : 'Marriage will have its Jerichos — seemingly impenetrable obstacles. Decide now: when the walls do not fall on the first circuit, will you march together or give up alone?' },
    { role: pt ? 'Casal' : 'Couple', icon: '👫', text: pt ? 'Identifiquem uma "Jericó" do casamento — um padrão, uma dificuldade, um sonho adiado. Comprometam-se a "marchar" juntos por sete semanas: oração diária específica, sem desistir. Datem o início.' : 'Identify a "Jericho" in your marriage — a pattern, a difficulty, a deferred dream. Commit to "march" together for seven weeks: specific daily prayer, no giving up. Date the start.' },
    { role: pt ? 'Avós' : 'Grandparents', icon: '👴', text: pt ? 'Contem uma "Jericó" que caiu depois de muitas voltas — um familiar convertido, uma crise superada, uma oração de anos respondida. Esse testemunho é o combustível para a perseverança das gerações seguintes.' : 'Tell about a "Jericho" that fell after many circuits — a converted family member, an overcome crisis, a years-long prayer answered. That testimony is fuel for the perseverance of following generations.' },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>
      {/* HERO */}
      <div style={{ borderRadius: 20, background: `linear-gradient(135deg,${accL} 0%,rgba(52,211,153,0.07) 60%,rgba(80,200,255,0.05) 100%)`, border: `1px solid ${accB}`, padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10, filter: `drop-shadow(0 0 24px ${acc}80)` }}>🏰📯</div>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: acc, marginBottom: 8 }}>
          Josué 6:1–25 · Perícope 261 · {pt ? 'Família — Dia 261' : 'Family — Day 261'}
        </div>
        <div style={{ fontSize: 'clamp(18px,3.2vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'As Trombetas de Jericó — A Família que Derruba Muros pela Obediência Litúrgica' : 'The Trumpets of Jericho — The Family that Topples Walls through Liturgical Obedience'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.4vw,17px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'Arca na frente · Silêncio obediente · Clamor no tempo de Deus' : 'Ark in front · Obedient silence · Shout in God\'s time'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {[
            pt ? 'Vitória Litúrgica' : 'Liturgical Victory',
            pt ? 'Perseverança' : 'Perseverance',
            pt ? 'Sétimo Dia' : 'Seventh Day',
            pt ? 'Graça no Juízo' : 'Grace in Judgment',
          ].map(t => (
            <span key={t} style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: `${acc}18`, border: `1px solid ${accB}`, color: acc }}>{t}</span>
          ))}
        </div>
      </div>

      {/* BIG IDEA */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(52,211,153,0.10),rgba(180,115,50,0.07))', border: '1.5px solid rgba(52,211,153,0.32)', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>💡 {pt ? 'Big Idea · Para a Família' : 'Big Idea · For the Family'}</div>
        <p style={{ fontSize: 'clamp(18px,2.8vw,22px)', fontWeight: 800, color: '#fff', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Jericó não caiu porque Israel tinha exército superior — caiu porque Israel obedeceu a uma estratégia que parecia loucura militar mas era obediência perfeita ao Comandante que já havia entregado a cidade.'
            : 'Jericho did not fall because Israel had a superior army — it fell because Israel obeyed a strategy that looked like military madness but was perfect obedience to the Commander who had already delivered the city.'}
        </p>
      </div>

      {/* PERGUNTA + DOUTRINA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,100,0.06)', border: '1px solid rgba(255,100,100,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 8 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: 0 }}>
            {pt
              ? '"Que muros de Jericó existem na vida da nossa família — obstáculos que parecem impenetráveis — e o que significa marchar ao redor deles pela obediência à Palavra em vez de tentar derrubá-los pela força própria?"'
              : '"What Jericho walls exist in our family\'s life — seemingly impenetrable obstacles — and what does it mean to march around them through obedience to the Word instead of trying to topple them by our own strength?"'}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.28)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>📜 {pt ? 'Doutrina Central' : 'Central Doctrine'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: 0 }}>
            {pt
              ? 'A vitória da família cristã sobre as fortalezas do pecado, da dúvida e do medo não vem da força própria — vem da obediência litúrgica ao Comandante que já entregou a cidade, perseverando em silêncio e clamando no tempo de Deus.'
              : 'The Christian family\'s victory over the fortresses of sin, doubt and fear does not come from its own strength — it comes from liturgical obedience to the Commander who already delivered the city, persevering in silence and shouting in God\'s time.'}
          </p>
        </div>
      </div>

      {/* MOVIMENTOS */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
          📋 {pt ? 'Movimentos do Sermão Familiar' : 'Family Sermon Movements'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
          {MOVES.map(m => (
            <div key={m.num} style={{ borderRadius: 16, background: m.corL, border: `1.5px solid ${m.corB}`, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.cor}22`, border: `1.5px solid ${m.cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(16px,2vw,18px)' }}>{m.emoji}</div>
                <div>
                  <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 700, color: m.cor, letterSpacing: '0.12em' }}>{m.num} · {m.sym}</div>
                  <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{m.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic', marginBottom: 8 }}>{m.sub}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{m.key}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: m.cor, lineHeight: 1.55, fontWeight: 600 }}>▸ {m.app}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EIXO REDENTOR */}
      <div style={{ borderRadius: 16, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '18px 22px', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 10 }}>✝️ {pt ? 'Eixo Redentor' : 'Redemptive Axis'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Jericó é tipo do juízo escatológico: uma cidade que, apesar de suas muralhas, não pode resistir ao Príncipe do Exército. O herem aponta ao juízo final sobre tudo o que não está sob o sangue do cordeiro. Raabe e o cordão escarlate são tipo da salvação em Cristo. As trombetas de Jericó ressoam em Ap 8-9 e em 1Ts 4:16 (a trombeta final que ressuscita os mortos em Cristo). A marcha ao redor de Jericó é tipo da vida cristã — obediência litúrgica aguardando o clamor final.'
            : 'Jericho is a type of eschatological judgment: a city that, despite its walls, cannot resist the Commander of the Army. The herem points to the final judgment on everything not under the lamb\'s blood. Rahab and the scarlet cord are a type of salvation in Christ. Jericho\'s trumpets echo in Rev 8-9 and 1 Thess 4:16 (the final trumpet raising the dead in Christ).'}
        </p>
      </div>

      {/* APLICAÇÕES */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.70)', marginBottom: 18, textAlign: 'center' }}>
          🎯 {pt ? 'Aplicações por Papel na Família' : 'Applications by Family Role'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
          {APPS_FAMILIA.map(a => (
            <div key={a.role} style={{ borderRadius: 12, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.20)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: 'rgba(52,211,153,0.95)', marginBottom: 6 }}>{a.icon} {a.role}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.60 }}>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DINÂMICA */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: `${acc}B0`, marginBottom: 18, textAlign: 'center' }}>
          🎲 {pt ? 'Dinâmica Familiar — 6 Atividades' : 'Family Activities — 6 Activities'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 10 }}>
          {ACTIVITIES.map(a => (
            <div key={a.n} style={{ borderRadius: 12, background: `${acc}0F`, border: `1px solid ${accB}`, padding: '12px 14px', display: 'flex', gap: 10 }}>
              <div style={{ fontSize: 'clamp(18px,2.4vw,22px)', lineHeight: 1.2 }}>{a.icon}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60 }}><span style={{ fontWeight: 800, color: acc }}>{a.n}. </span>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONCLUSÃO */}
      <div style={{ borderRadius: 16, background: `linear-gradient(135deg,${accL},rgba(52,211,153,0.07))`, border: `1.5px solid ${accB}`, padding: '20px 24px' }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 10 }}>🏁 {pt ? 'Conclusão' : 'Conclusion'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Família amada, os muros de Jericó eram altos, grossos e impenetráveis. Mas caíram no sétimo dia porque um povo obediente marchou, ficou em silêncio e clamou quando Deus mandou clamar. Não pela força do exército — pela fé que obedece. Suas Jericós também cairão. O Príncipe do Exército que disse "tenho entregado na tua mão Jericó" ainda fala com a mesma autoridade sobre cada muralha que sua família enfrenta. Marche. Fique em silêncio. E no tempo de Deus, clame. Os muros cairão. Amém.'
            : 'Beloved family, the walls of Jericho were high, thick and impenetrable. But they fell on the seventh day because an obedient people marched, stayed silent and shouted when God said to shout. Not by the army\'s strength — by obedient faith. Your Jerichos will also fall. The Commander of the Army who said "I have given Jericho into your hand" still speaks with the same authority over every wall your family faces. March. Stay silent. And in God\'s time, shout. The walls will fall. Amen.'}
        </p>
      </div>
    </div>
  );
}

// ─── Infográfico Família · Josué 6:26–27 (Card 262) ─────────────────
function InfograficoJosue262FamiliaSection({ pt }: { pt: boolean }) {
  const acc = 'rgba(150,80,210,1)';
  const accL = 'rgba(150,80,210,0.10)';
  const accB = 'rgba(150,80,210,0.30)';

  const MOVES = [
    {
      num: 'I', sym: 'Js 6:26',
      title: pt ? 'A Maldição Pronunciada — A Palavra que Permanece' : 'The Curse Pronounced — The Word that Remains',
      sub: pt ? 'A maldição bipartida: primogênito nos fundamentos, filho mais novo nas portas — do início ao fim' : 'The bipartite curse: firstborn at foundations, youngest at gates — from start to finish',
      emoji: '⚠️',
      key: pt ? 'A maldição é pronunciada no ápice da vitória — não como ato de raiva, mas como ordenança profética. A estrutura bipartida (primogênito para os fundamentos, filho mais novo para as portas) abrange toda a obra de reconstrução. O termo ʾārûr ("maldito") é o mesmo das maldições do Sinai (Dt 27-28). A maldição é ratificada pela presença divina: "o SENHOR estava com Josué" (6:27) é o selo.' : 'The curse is pronounced at the height of victory — not as rage, but as prophetic ordinance. The bipartite structure (firstborn at foundations, youngest at gates) encompasses all reconstruction work. The term \'arur ("cursed") is the same as the Sinai curses (Deut 27-28). The curse is ratified by divine presence: "the LORD was with Joshua" (6:27) is the seal.',
      app: pt ? 'Pais: quando vocês leem a Bíblia para os filhos, ensinam tanto as advertências quanto as promessas? Uma fé que conhece só as promessas é uma fé que não entende a santidade de Deus.' : 'Parents: when you read the Bible to your children, do you teach both the warnings and the promises? A faith that knows only promises is a faith that does not understand the holiness of God.',
      cor: acc, corL: accL, corB: accB,
    },
    {
      num: '◉', sym: 'Js 6:27',
      title: pt ? 'YHWH com Josué — A Presença que Sela a Palavra — Centro' : 'YHWH with Joshua — The Presence that Seals the Word — Center',
      sub: pt ? 'A fama de Josué não veio de sua habilidade — veio da Presença divina que o acompanhou' : 'Joshua\'s fame did not come from his skill — it came from the divine Presence that accompanied him',
      emoji: '📖',
      key: pt ? '"O SENHOR estava com Josué" (wayhî YHWH ʾet-yĕhôshûaʿ) é a frase que enquadra toda a narrativa — aparece no começo (1:5,9), no meio (6:27). É a promessa cumprida: "não te deixarei nem te abandonarei" (1:5). A fama de Josué não veio de sua habilidade — veio da Presença divina. A "fama" da família cristã que honra a Deus não nasce da competência, mas da Presença de Deus que a habita.' : '"The LORD was with Joshua" (wayhi YHWH \'et-yehoshua\') is the phrase that frames the entire narrative — appearing at the beginning (1:5,9), in the middle (6:27). It is the fulfilled promise: "I will not leave you or forsake you" (1:5). Joshua\'s fame came not from skill but from divine Presence. The Christian family\'s "fame" that honors God does not come from competence, but from the Presence of God inhabiting it.',
      app: pt ? 'Pais: a "fama" que vocês querem para a família não nasce da sua gestão cuidadosa da imagem. Busquem a Presença, não a reputação. A família conhecida pela Presença de Deus tem um testemunho que a competente mas ausente de Deus não tem.' : 'Parents: the "fame" you want for the family does not come from careful image management. Seek Presence, not reputation. The family known for God\'s Presence has a testimony that the competent but God-absent family does not have.',
      cor: 'rgba(52,211,153,1)', corL: 'rgba(52,211,153,0.10)', corB: 'rgba(52,211,153,0.28)',
    },
    {
      num: 'III', sym: '1Rs 16:34',
      title: pt ? 'O Cumprimento em Hiel — Quatrocentos Anos Depois' : 'The Fulfillment in Hiel — Four Hundred Years Later',
      sub: pt ? 'A Palavra de Deus não caducou em quatrocentos anos — ela nunca caduca' : 'God\'s Word did not expire in four hundred years — it never expires',
      emoji: '📅',
      key: pt ? 'A citação explícita de "a palavra do SENHOR que havia falado por Josué" em 1Rs 16:34 é editorial deliberado. A precisão é perturbadora: primogênito nos fundamentos, filho mais novo nas portas. Hiel ignorou a maldição — mas a Palavra de Deus não caducou em quatrocentos anos. A narrativa de 1Rs 16 está no contexto do reinado de Acabe — época de maior apostasia. Jericó reconstruída = Israel reconstruindo o que Deus destruiu.' : 'The explicit citation of "the word of the LORD that He spoke by Joshua" in 1 Kgs 16:34 is deliberate editorial. The precision is disturbing: firstborn at foundations, youngest at gates. Hiel ignored the curse — but God\'s Word did not expire in four hundred years. The 1 Kgs 16 narrative is in the context of Ahab\'s reign — the era of greatest apostasy. Rebuilt Jericho = Israel rebuilding what God destroyed.',
      app: pt ? 'Pais: como vocês apresentam as advertências bíblicas aos filhos — como regras arbitrárias ou como proteções amorosas de um Pai que conhece o futuro? A maldição de Jericó não era punição mesquinha — era proteção de Israel para não reconstruir o que Deus destruiu.' : 'Parents: how do you present biblical warnings to your children — as arbitrary rules or as loving protections from a Father who knows the future? Jericho\'s curse was not petty punishment — it was protection for Israel from rebuilding what God destroyed.',
      cor: 'rgba(80,200,255,1)', corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.28)',
    },
  ];

  const ACTIVITIES = [
    { n: '1', icon: '📜', text: pt ? 'Leiam Js 6:26 e depois 1Rs 16:34 juntos. "Quatrocentos anos depois, exatamente como pronunciado. O que isso revela sobre a Palavra de Deus?" Discutam.' : 'Read Josh 6:26 and then 1 Kgs 16:34 together. "Four hundred years later, exactly as pronounced. What does this reveal about God\'s Word?" Discuss.' },
    { n: '2', icon: '⚖️', text: pt ? '"Nossa família acredita nas promessas de Deus com a mesma seriedade que nas advertências?" Façam uma lista de 3 promessas e 3 advertências que conhecem. Compare a seriedade com que tratam cada uma.' : '"Does our family believe God\'s promises with the same seriousness as His warnings?" Make a list of 3 promises and 3 warnings you know. Compare the seriousness with which you treat each.' },
    { n: '3', icon: '🤔', text: pt ? 'Por que Hiel reconstruiu Jericó? "Quando você ignora uma advertência bíblica, qual é geralmente o motivo?" Cada membro compartilha honestamente.' : 'Why did Hiel rebuild Jericho? "When you ignore a biblical warning, what is usually the reason?" Each member shares honestly.' },
    { n: '4', icon: '✨', text: pt ? '"O SENHOR estava com Josué." Discutam: o que precisaria ser verdade sobre a família para que esta frase pudesse ser dita sobre vocês? O que está impedindo?' : '"The LORD was with Joshua." Discuss: what would need to be true about the family for this phrase to be said of you? What is preventing it?' },
    { n: '5', icon: '🎯', text: pt ? 'O cumprimento da maldição em Hiel foi preciso — primogênito nos fundamentos, filho mais novo nas portas. "O que isso nos ensina sobre a precisão de Deus? Isso é confortante ou aterrorizante — ou ambos?"' : 'The fulfillment of the curse in Hiel was precise — firstborn at foundations, youngest at gates. "What does this teach us about God\'s precision? Is this comforting or terrifying — or both?"' },
    { n: '6', icon: '🙏', text: pt ? 'Orem pedindo a Deus que a família tenha temor de Sua Palavra — que nem as promessas sejam tomadas por garantidas, nem as advertências sejam tratadas como exagero. Citem Isaías 66:2 na oração.' : 'Pray asking God for the family to have fear of His Word — that neither the promises be taken for granted nor the warnings treated as exaggeration. Cite Isaiah 66:2 in the prayer.' },
  ];

  const APPS_FAMILIA = [
    { role: pt ? 'Pais' : 'Parents', icon: '👨‍👩‍👧', text: pt ? 'Esta semana, leiam juntos uma advertência bíblica que a família costuma tratar como exagero ou irrelevante. Discutam seriamente: o que acontece com quem ignora esta palavra? O que Hiel nos ensina?' : 'This week, read together a biblical warning the family tends to treat as exaggeration or irrelevant. Discuss seriously: what happens to those who ignore this word? What does Hiel teach us?' },
    { role: pt ? 'Filhos' : 'Children', icon: '👦', text: pt ? 'Há uma advertência bíblica que você conhece mas tem ignorado? Josué 6 e 1 Reis 16 mostram que o tempo de cumprimento pode ser longo — mas o cumprimento é certo. Não reconstrua o que Deus destruiu.' : 'Is there a biblical warning you know but have been ignoring? Joshua 6 and 1 Kings 16 show that the fulfillment time may be long — but fulfillment is certain. Do not rebuild what God destroyed.' },
    { role: pt ? 'Noivos' : 'Engaged', icon: '💍', text: pt ? 'Conversem sobre áreas da vida onde cada um tem sido tentado a "reconstruir Jericó" — reabilitar hábitos, relacionamentos ou padrões que Deus foi destruindo. O casamento não é lugar de reabilitar o que Deus destruiu.' : 'Talk about areas of life where each has been tempted to "rebuild Jericho" — rehabilitating habits, relationships or patterns God was destroying. Marriage is not a place to rehabilitate what God destroyed.' },
    { role: pt ? 'Casal' : 'Couple', icon: '👫', text: pt ? 'Há áreas do casamento onde vocês têm ignorado advertências bíblicas claras — sobre finanças, sobre disciplina dos filhos, sobre padrões de convivência? Nomeiem e tragam ao Senhor antes que o "primogênito nos fundamentos" se cumpra.' : 'Are there areas of marriage where you have been ignoring clear biblical warnings — about finances, children\'s discipline, patterns of relating? Name them and bring them to the Lord before the "firstborn at the foundations" fulfills.' },
    { role: pt ? 'Avós' : 'Grandparents', icon: '👴', text: pt ? 'Contem uma história em que Deus cumpriu uma promessa que parecia impossível. Mas também — com humildade — uma advertência que alguém da família ignorou e que se cumpriu. Ambas formam o temor de Deus.' : 'Tell a story when God fulfilled a seemingly impossible promise. But also — humbly — a warning that someone in the family ignored and that was fulfilled. Both form the fear of God.' },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>
      {/* HERO */}
      <div style={{ borderRadius: 20, background: `linear-gradient(135deg,${accL} 0%,rgba(52,211,153,0.07) 60%,rgba(80,200,255,0.05) 100%)`, border: `1px solid ${accB}`, padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10, filter: `drop-shadow(0 0 24px ${acc}80)` }}>⚠️📖</div>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: acc, marginBottom: 8 }}>
          Josué 6:26–27 · Perícope 262 · {pt ? 'Família — Dia 262' : 'Family — Day 262'}
        </div>
        <div style={{ fontSize: 'clamp(18px,3.2vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'A Maldição de Jericó — A Família que Aprende que as Palavras de Deus Não Voltam Vazias' : 'The Curse of Jericho — The Family that Learns God\'s Words Do Not Return Empty'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.4vw,17px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'Palavra permanente · Cumprimento exato · Hiel — quatrocentos anos depois' : 'Permanent Word · Exact fulfillment · Hiel — four hundred years later'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {[
            pt ? 'Palavra Eterna' : 'Eternal Word',
            pt ? 'Promessas Reais' : 'Real Promises',
            pt ? 'Advertências Reais' : 'Real Warnings',
            pt ? 'Temor de Deus' : 'Fear of God',
          ].map(t => (
            <span key={t} style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: `${acc}18`, border: `1px solid ${accB}`, color: acc }}>{t}</span>
          ))}
        </div>
      </div>

      {/* BIG IDEA */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(52,211,153,0.10),rgba(150,80,210,0.07))', border: '1.5px solid rgba(52,211,153,0.32)', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>💡 {pt ? 'Big Idea · Para a Família' : 'Big Idea · For the Family'}</div>
        <p style={{ fontSize: 'clamp(18px,2.8vw,22px)', fontWeight: 800, color: '#fff', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'A maldição sobre quem reconstruísse Jericó foi pronunciada por Josué, ignorada por Hiel quatrocentos anos depois, e se cumpriu com exatidão em cada filho de Hiel — porque as palavras proféticas de Deus sempre se cumprem, mesmo quando a geração que as ouviu já não existe.'
            : 'The curse on whoever rebuilt Jericho was pronounced by Joshua, ignored by Hiel four hundred years later, and fulfilled exactly in each of Hiel\'s sons — because God\'s prophetic words always come to pass, even when the generation that heard them no longer exists.'}
        </p>
      </div>

      {/* PERGUNTA + DOUTRINA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,100,0.06)', border: '1px solid rgba(255,100,100,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 8 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: 0 }}>
            {pt
              ? '"Nossa família leva a sério as promessas E as advertências de Deus na Bíblia — ou tratamos as promessas como garantidas e as advertências como exagero? O que o caso de Hiel nos ensina sobre como Deus fala?"'
              : '"Does our family take seriously both the promises AND the warnings of God in the Bible — or do we treat the promises as guaranteed and the warnings as exaggeration? What does the case of Hiel teach us about how God speaks?"'}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.28)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>📜 {pt ? 'Doutrina Central' : 'Central Doctrine'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: 0 }}>
            {pt
              ? 'As palavras de Deus — promessas e advertências — têm eficácia eterna porque Deus não falha; a família que leva tanto as promessas quanto as advertências com seriedade igual demonstra que conhece a santidade do Deus que fala.'
              : 'God\'s words — promises and warnings — have eternal efficacy because God does not fail; the family that takes both promises and warnings with equal seriousness demonstrates that it knows the holiness of the God who speaks.'}
          </p>
        </div>
      </div>

      {/* MOVIMENTOS */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
          📋 {pt ? 'Movimentos do Sermão Familiar' : 'Family Sermon Movements'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
          {MOVES.map(m => (
            <div key={m.num} style={{ borderRadius: 16, background: m.corL, border: `1.5px solid ${m.corB}`, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.cor}22`, border: `1.5px solid ${m.cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(16px,2vw,18px)' }}>{m.emoji}</div>
                <div>
                  <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 700, color: m.cor, letterSpacing: '0.12em' }}>{m.num} · {m.sym}</div>
                  <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{m.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic', marginBottom: 8 }}>{m.sub}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{m.key}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: m.cor, lineHeight: 1.55, fontWeight: 600 }}>▸ {m.app}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EIXO REDENTOR */}
      <div style={{ borderRadius: 16, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '18px 22px', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 10 }}>✝️ {pt ? 'Eixo Redentor' : 'Redemptive Axis'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'A maldição sobre Jericó é tipo da lei que amaldiçoa o transgressor (Dt 27-28) — e Cristo a absorveu em nosso lugar (Gl 3:13). O primogênito e o filho mais novo de Hiel são sombras do Filho Unigênito que recebeu toda maldição. Jesus é o primogênito que lançou os fundamentos da nova criação com Seu próprio sangue, e o Filho que selou as portas da morte com Sua ressurreição. Para os que estão em Cristo, a maldição foi absorvida — a Palavra de Deus traz agora apenas promessa.'
            : 'The curse over Jericho is a type of the law that curses the transgressor (Deut 27-28) — and Christ absorbed it in our place (Gal 3:13). Hiel\'s firstborn and youngest are shadows of the Only-Begotten Son who received every curse. For those in Christ, the curse was absorbed — God\'s Word now brings only promise.'}
        </p>
      </div>

      {/* APLICAÇÕES */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.70)', marginBottom: 18, textAlign: 'center' }}>
          🎯 {pt ? 'Aplicações por Papel na Família' : 'Applications by Family Role'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
          {APPS_FAMILIA.map(a => (
            <div key={a.role} style={{ borderRadius: 12, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.20)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: 'rgba(52,211,153,0.95)', marginBottom: 6 }}>{a.icon} {a.role}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.60 }}>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DINÂMICA */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: `${acc}B0`, marginBottom: 18, textAlign: 'center' }}>
          🎲 {pt ? 'Dinâmica Familiar — 6 Atividades' : 'Family Activities — 6 Activities'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 10 }}>
          {ACTIVITIES.map(a => (
            <div key={a.n} style={{ borderRadius: 12, background: `${acc}0F`, border: `1px solid ${accB}`, padding: '12px 14px', display: 'flex', gap: 10 }}>
              <div style={{ fontSize: 'clamp(18px,2.4vw,22px)', lineHeight: 1.2 }}>{a.icon}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60 }}><span style={{ fontWeight: 800, color: acc }}>{a.n}. </span>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONCLUSÃO */}
      <div style={{ borderRadius: 16, background: `linear-gradient(135deg,${accL},rgba(52,211,153,0.07))`, border: `1.5px solid ${accB}`, padding: '20px 24px' }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 10 }}>🏁 {pt ? 'Conclusão' : 'Conclusion'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Família amada, Hiel não acordou aquela manhã pensando: "vou perder todos os meus filhos hoje." Ele apenas ignorou uma palavra pronunciada quatrocentos anos antes. Mas a Palavra de Deus não caducou. Ela nunca caduca. O mesmo Deus que disse "maldito" disse "salvo" — e os dois têm a mesma certeza de cumprimento. A família que leva a sério tanto as promessas quanto as advertências não vive no medo — vive na reverência. "O SENHOR estava com Josué" — que esta seja a epitáfio da sua família. Amém.'
            : 'Beloved family, Hiel did not wake that morning thinking: "I will lose all my sons today." He simply ignored a word pronounced four hundred years before. But God\'s Word did not expire. It never expires. The same God who said "cursed" said "saved" — and both have the same certainty of fulfillment. The family that takes both promises and warnings seriously does not live in fear — it lives in reverence. Amen.'}
        </p>
      </div>
    </div>
  );
}

// ─── Infográfico Família · Josué 7:1–26 (Card 263) ──────────────────
function InfograficoJosue263FamiliaSection({ pt }: { pt: boolean }) {
  const acc = 'rgba(200,60,60,1)';
  const accL = 'rgba(200,60,60,0.10)';
  const accB = 'rgba(200,60,60,0.30)';

  const MOVES = [
    {
      num: 'I', sym: 'Js 7:1–9',
      title: pt ? 'A Derrota que Revela o Problema Oculto' : 'The Defeat that Reveals the Hidden Problem',
      sub: pt ? 'O leitor sabe o que Israel não sabe: há pecado no acampamento' : 'The reader knows what Israel does not: there is sin in the camp',
      emoji: '⚠️',
      key: pt ? 'O versículo 1 começa com wĕyimʿalû ("e transgrediram") — antes da derrota ser narrada, o texto já revela a causa. O verbo mʿal é termo técnico para violação da aliança — o mesmo de Nm 5:12,27 (infidelidade conjugal). Acã violou a aliança pactual de Israel tão seriamente quanto infidelidade conjugal viola a aliança do casamento. A derrota em Ai é desproporcional ao tamanho do adversário — a causa não é militar, é espiritual.' : 'Verse 1 begins with weyim\'alu ("and they transgressed") — before the defeat is narrated, the text already reveals the cause. The verb ma\'al is technical term for covenant violation — the same as Num 5:12,27 (marital infidelity). Achan violated Israel\'s covenantal alliance as seriously as marital infidelity violates the marriage covenant. The defeat at Ai is disproportionate to the adversary\'s size — the cause is not military, it is spiritual.',
      app: pt ? 'Pais: a família é uma aliança — o pecado escondido de um membro afeta a atmosfera e a bênção de todos. Isso não é superstição; é teologia pactual. Criem uma cultura de confissão segura onde o pecado pode vir à luz antes de causar "derrota" coletiva.' : 'Parents: the family is a covenant — one member\'s hidden sin affects the atmosphere and blessing of all. This is not superstition; it is covenantal theology. Create a culture of safe confession where sin can come to light before causing collective "defeat."',
      cor: acc, corL: accL, corB: accB,
    },
    {
      num: '◉', sym: 'Js 7:10–21',
      title: pt ? 'A Busca que Deus Dirige — O Pecado Exposto pela Aliança — Centro' : 'The Search God Directs — Sin Exposed by the Covenant — Center',
      sub: pt ? '"Vi, cobicei, tomei" — a sequência do pecado humano desde Gênesis 3' : '"I saw, I coveted, I took" — the sequence of human sin since Genesis 3',
      emoji: '🔎',
      key: pt ? 'O processo de eliminação (por tribo, família, casa) é teológico: Deus vai estreitando o círculo até que o responsável seja identificado. Acã confessa com detalhe: "vi... cobicei... tomei" — a sequência do pecado desde Gênesis 3 (Havá viu, apanhou, comeu). Acã tomou um "manto babilônico formoso" — beleza de Babilônia no coração de Israel. A confissão específica honra a santidade de Deus (Calvino, Inst. III.4.9).' : 'The elimination process (by tribe, family, household) is theological: God narrows the circle until the responsible one is identified. Achan confesses in detail: "I saw... I coveted... I took" — the sequence of sin from Genesis 3 (Eve saw, took, ate). Achan took a "beautiful Babylonian cloak" — the beauty of Babylon in Israel\'s heart. Specific confession honors the holiness of God (Calvin, Inst. III.4.9).',
      app: pt ? 'Pais: a cultura de confissão na família começa com os pais confessando primeiro — especificamente, sem generalidades. "Errei quando falei assim com você" é mais formativo do que "peço desculpa por tudo."' : 'Parents: the culture of confession in the family starts with parents confessing first — specifically, without generalities. "I was wrong when I spoke to you like that" is more formative than "I apologize for everything."',
      cor: 'rgba(52,211,153,1)', corL: 'rgba(52,211,153,0.10)', corB: 'rgba(52,211,153,0.28)',
    },
    {
      num: 'III', sym: 'Js 7:24–26',
      title: pt ? 'O Vale de Acor — Lugar de Angústia que se Torna Porta de Esperança' : 'The Valley of Achor — Place of Anguish that Becomes a Door of Hope',
      sub: pt ? 'Oséias 2:15: o lugar de maior vergonha em Israel se torna porta de restauração em Cristo' : 'Hosea 2:15: the place of greatest shame in Israel becomes a door of restoration in Christ',
      emoji: '🎭',
      key: pt ? 'O vale de Acor (ʿēmeq ʿākôr) significa "vale da angústia/perturbação." O monte de pedras sobre Acã espelha o monte de pedras sobre o rei de Ai (8:29) — dois monumentos do juízo de Deus. Oséias 2:15 transforma o vale de Acor em "porta de esperança" — o lugar de maior angústia em Israel se torna, em Cristo, portal de restauração. Deus escreve redenção sobre os lugares de maior vergonha.' : 'The valley of Achor (\'emeq \'akor) means "valley of anguish/trouble." The pile of stones over Achan mirrors the pile over the king of Ai (8:29) — two monuments of God\'s judgment. Hosea 2:15 transforms the valley of Achor into a "door of hope" — the place of greatest anguish in Israel becomes, in Christ, a portal of restoration. God writes redemption over places of greatest shame.',
      app: pt ? 'Pais: os "vales de Acor" da história familiar — os lugares de vergonha e punição — podem se tornar, em Cristo, portas de esperança que a família conta para as próximas gerações. A redenção não apaga a história; ela a transforma.' : 'Parents: the "valleys of Achor" in family history — places of shame and punishment — can become, in Christ, doors of hope the family tells to following generations. Redemption does not erase history; it transforms it.',
      cor: 'rgba(80,200,255,1)', corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.28)',
    },
  ];

  const ACTIVITIES = [
    { n: '1', icon: '🏹', text: pt ? 'Leiam Js 7:1 e depois Js 7:5. "O leitor sabe o que Israel não sabe. O pecado de Acã causou a morte de 36 homens que provavelmente não sabiam de nada. Como o pecado escondido de um pode afetar os outros?" Discutam exemplos reais sem expor ninguém.' : 'Read Josh 7:1 and then Josh 7:5. "The reader knows what Israel does not know. Achan\'s sin caused the death of 36 men who likely knew nothing. How can one person\'s hidden sin affect others?" Discuss real examples without exposing anyone.' },
    { n: '2', icon: '👁️', text: pt ? '"Vi, cobicei, tomei" — identifiquem juntos as três etapas de uma tentação que cada membro enfrenta. Como podemos nos ajudar mutuamente a parar no vi?' : '"I saw, I coveted, I took" — together identify the three stages of a temptation each member faces. How can we help each other stop at the "saw" stage?' },
    { n: '3', icon: '🗣️', text: pt ? 'A confissão de Acã foi específica: o manto, os duzentos siclos, o lingote. Pratiquem confissão específica: cada membro diz algo específico pelo qual pede desculpa a alguém da família esta semana.' : 'Achan\'s confession was specific: the cloak, the two hundred shekels, the ingot. Practice specific confession: each member says something specific for which they ask forgiveness from a family member this week.' },
    { n: '4', icon: '🌱', text: pt ? 'Oséias 2:15 — "darei o vale de Acor como porta de esperança." Que "vale de Acor" da família Deus pode transformar em porta de esperança? Orem especificamente por isso.' : 'Hosea 2:15 — "I will make the Valley of Achor a door of hope." What family "valley of Achor" can God transform into a door of hope? Pray specifically for this.' },
    { n: '5', icon: '❓', text: pt ? 'Por que Deus não destruiu o pecado de Acã em silêncio? Por que expô-lo diante de todo Israel? O que a exposição pública revela sobre a santidade de Deus e a seriedade do pecado pactual?' : 'Why did God not destroy Achan\'s sin in silence? Why expose it before all Israel? What does the public exposure reveal about the holiness of God and the seriousness of covenantal sin?' },
    { n: '6', icon: '🙏', text: pt ? 'Orem juntos: confessem o pecado que a família sabe que existe, peçam perdão pela solidariedade pactual no pecado, e recebam a promessa de 1Jo 1:9.' : 'Pray together: confess the sin the family knows exists, ask forgiveness for covenantal solidarity in sin, and receive the promise of 1 John 1:9.' },
  ];

  const APPS_FAMILIA = [
    { role: pt ? 'Pais' : 'Parents', icon: '👨‍👩‍👧', text: pt ? 'Criem esta semana um momento de confissão em família — não para expor vergonhas, mas para criar cultura de transparência. Comecem confessando vocês próprios algo específico. A confissão dos pais abre a porta para a confissão dos filhos.' : 'This week, create a family confession moment — not to expose shames, but to create a culture of transparency. Begin by confessing something specific yourselves. Parents\' confession opens the door for children\'s confession.' },
    { role: pt ? 'Filhos' : 'Children', icon: '👦', text: pt ? 'A sequência "vi, cobicei, tomei" começa com os olhos. Esta semana, pratique identificar o "vi" — o gatilho — antes que vire "tomei." Conte para um dos seus pais quando identificar um "vi" que está virando tentação.' : 'The "I saw, I coveted, I took" sequence starts with the eyes. This week, practice identifying the "I saw" — the trigger — before it becomes "I took." Tell one of your parents when you identify a "saw" becoming a temptation.' },
    { role: pt ? 'Noivos' : 'Engaged', icon: '💍', text: pt ? 'No casamento, o pecado escondido de um cônjuge afeta o outro de formas que nem sempre são visíveis imediatamente. Comprometam-se, antes de casar, à transparência — confissão mútua e regular, cultura de honestidade sem medo de rejeição.' : 'In marriage, one spouse\'s hidden sin affects the other in ways not always immediately visible. Commit, before marrying, to transparency — mutual and regular confession, a culture of honesty without fear of rejection.' },
    { role: pt ? 'Casal' : 'Couple', icon: '👫', text: pt ? 'Há algo "enterrado sob a tenda" — uma área de pecado, vício, dívida, segredo — que um de vocês sabe e o outro não? O custo de revelar é menor do que o custo de manter enterrado. A aliança do casamento suporta a confissão; não suporta o segredo.' : 'Is there something "buried under the tent" — an area of sin, addiction, debt, secret — that one of you knows and the other does not? The cost of revealing is less than the cost of keeping buried. The marriage covenant supports confession; it does not support secrets.' },
    { role: pt ? 'Avós' : 'Grandparents', icon: '👴', text: pt ? 'O vale de Acor da família pode se tornar porta de esperança quando narrado honestamente às gerações seguintes. Considere contar uma história de fracasso e restauração — para mostrar que Deus escreve redenção sobre os lugares de vergonha.' : 'The family\'s valley of Achor can become a door of hope when honestly narrated to following generations. Consider telling a story of failure and restoration — to show that God writes redemption over places of shame.' },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>
      {/* HERO */}
      <div style={{ borderRadius: 20, background: `linear-gradient(135deg,${accL} 0%,rgba(52,211,153,0.07) 60%,rgba(80,200,255,0.05) 100%)`, border: `1px solid ${accB}`, padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10, filter: `drop-shadow(0 0 24px ${acc}80)` }}>🔴🎭</div>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: acc, marginBottom: 8 }}>
          Josué 7:1–26 · Perícope 263 · {pt ? 'Família — Dia 263' : 'Family — Day 263'}
        </div>
        <div style={{ fontSize: 'clamp(18px,3.2vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'O Vale de Acor — A Família que Enfrenta o Pecado Escondido Antes que Ele Enterre a Próxima Batalha' : 'The Valley of Achor — The Family that Faces Hidden Sin Before It Buries the Next Battle'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.4vw,17px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'Pecado no acampamento · Vi, cobicei, tomei · Vale de Acor — porta de esperança' : 'Sin in the camp · I saw, coveted, took · Valley of Achor — door of hope'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {[
            pt ? 'Pecado Coletivo' : 'Collective Sin',
            pt ? 'Confissão Específica' : 'Specific Confession',
            pt ? 'Transparência' : 'Transparency',
            pt ? 'Porta de Esperança' : 'Door of Hope',
          ].map(t => (
            <span key={t} style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: `${acc}18`, border: `1px solid ${accB}`, color: acc }}>{t}</span>
          ))}
        </div>
      </div>

      {/* BIG IDEA */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(52,211,153,0.10),rgba(200,60,60,0.07))', border: '1.5px solid rgba(52,211,153,0.32)', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>💡 {pt ? 'Big Idea · Para a Família' : 'Big Idea · For the Family'}</div>
        <p style={{ fontSize: 'clamp(18px,2.8vw,22px)', fontWeight: 800, color: '#fff', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'O pecado de Acã não ficou no quarto dele — derrubou o exército de Israel, matou trinta e seis homens e paralisou a conquista, porque na aliança de Deus a solidariedade vai nos dois sentidos: tanto no pecado quanto na bênção.'
            : 'Achan\'s sin did not stay in his tent — it toppled Israel\'s army, killed thirty-six men and paralyzed the conquest, because in God\'s covenant solidarity goes both ways: in sin as well as in blessing.'}
        </p>
      </div>

      {/* PERGUNTA + DOUTRINA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,100,0.06)', border: '1px solid rgba(255,100,100,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 8 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: 0 }}>
            {pt
              ? '"Há pecados escondidos no acampamento da nossa família — coisas que alguém está escondendo que estão afetando a todos sem que ninguém perceba a conexão? O que o caso de Acã nos ensina sobre a importância da confissão?"'
              : '"Are there sins hidden in our family\'s camp — things someone is hiding that are affecting everyone without anyone noticing the connection? What does Achan\'s case teach us about the importance of confession?"'}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.28)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>📜 {pt ? 'Doutrina Central' : 'Central Doctrine'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: 0 }}>
            {pt
              ? 'O pecado escondido no acampamento não fica privado — ele viola a aliança coletiva, paralisa a missão e traz consequências sobre os inocentes; mas Cristo assumiu o anátema de todo pecado confessado, e o vale de Acor torna-se, em Seu sangue, porta de esperança e restauração.'
              : 'Sin hidden in the camp does not remain private — it violates the collective covenant, paralyzes the mission and brings consequences on the innocent; but Christ assumed the anathema of all confessed sin, and the valley of Achor becomes, in His blood, a door of hope and restoration.'}
          </p>
        </div>
      </div>

      {/* MOVIMENTOS */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
          📋 {pt ? 'Movimentos do Sermão Familiar' : 'Family Sermon Movements'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
          {MOVES.map(m => (
            <div key={m.num} style={{ borderRadius: 16, background: m.corL, border: `1.5px solid ${m.corB}`, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.cor}22`, border: `1.5px solid ${m.cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(16px,2vw,18px)' }}>{m.emoji}</div>
                <div>
                  <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 700, color: m.cor, letterSpacing: '0.12em' }}>{m.num} · {m.sym}</div>
                  <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{m.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic', marginBottom: 8 }}>{m.sub}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{m.key}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: m.cor, lineHeight: 1.55, fontWeight: 600 }}>▸ {m.app}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EIXO REDENTOR */}
      <div style={{ borderRadius: 16, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '18px 22px', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 10 }}>✝️ {pt ? 'Eixo Redentor' : 'Redemptive Axis'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Acã é tipo do pecado humano que viola a aliança e traz morte coletiva. Cristo é o antítipo: onde Acã escondeu o pecado e morreu por ele, Cristo que não tinha pecado assumiu o herem de todo o Seu povo e morreu por ele (Gl 3:13). O monte de pedras sobre Acã é tipo do sepulcro de Cristo — mas ao contrário de Acã, a pedra foi rolada no terceiro dia. O vale de Acor (Os 2:15) torna-se "porta de esperança" porque Cristo transformou o lugar do juízo em portal de ressurreição.'
            : 'Achan is a type of human sin that violates the covenant and brings collective death. Christ is the antitype: where Achan hid sin and died for it, the sinless Christ assumed the herem of all His people and died for it (Gal 3:13). The pile of stones over Achan is a type of Christ\'s tomb — but unlike Achan, the stone was rolled away on the third day. The valley of Achor (Hos 2:15) becomes a "door of hope" because Christ transformed the place of judgment into a portal of resurrection.'}
        </p>
      </div>

      {/* APLICAÇÕES */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.70)', marginBottom: 18, textAlign: 'center' }}>
          🎯 {pt ? 'Aplicações por Papel na Família' : 'Applications by Family Role'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
          {APPS_FAMILIA.map(a => (
            <div key={a.role} style={{ borderRadius: 12, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.20)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: 'rgba(52,211,153,0.95)', marginBottom: 6 }}>{a.icon} {a.role}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.60 }}>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DINÂMICA */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: `${acc}B0`, marginBottom: 18, textAlign: 'center' }}>
          🎲 {pt ? 'Dinâmica Familiar — 6 Atividades' : 'Family Activities — 6 Activities'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 10 }}>
          {ACTIVITIES.map(a => (
            <div key={a.n} style={{ borderRadius: 12, background: `${acc}0F`, border: `1px solid ${accB}`, padding: '12px 14px', display: 'flex', gap: 10 }}>
              <div style={{ fontSize: 'clamp(18px,2.4vw,22px)', lineHeight: 1.2 }}>{a.icon}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60 }}><span style={{ fontWeight: 800, color: acc }}>{a.n}. </span>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONCLUSÃO */}
      <div style={{ borderRadius: 16, background: `linear-gradient(135deg,${accL},rgba(52,211,153,0.07))`, border: `1.5px solid ${accB}`, padding: '20px 24px' }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 10 }}>🏁 {pt ? 'Conclusão' : 'Conclusion'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Família amada, há algo enterrado sob a tenda? O chamado de Josué 7 é: tragam à luz. O pecado escondido sempre custa mais do que o confessado. E para quem confessa — especificamente, humildemente — há uma promessa que Acã não aproveitou mas que você pode: "se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça" (1Jo 1:9). O vale de Acor não precisa ser o fim da história. Em Cristo, ele é porta de esperança. Amém.'
            : 'Beloved family, is there something buried under the tent? The call of Joshua 7 is: bring it to light. Hidden sin always costs more than confessed sin. And for whoever confesses — specifically, humbly — there is a promise Achan did not take but you can: "if we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness" (1 John 1:9). The valley of Achor does not need to be the end of the story. In Christ, it is a door of hope. Amen.'}
        </p>
      </div>
    </div>
  );
}

// ─── Infográfico Família · Josué 8:1–29 (Card 264) ──────────────────
function InfograficoJosue264FamiliaSection({ pt }: { pt: boolean }) {
  const acc = 'rgba(50,200,130,1)';
  const accL = 'rgba(50,200,130,0.10)';
  const accB = 'rgba(50,200,130,0.30)';

  const MOVES = [
    {
      num: 'I', sym: 'Js 8:1–2',
      title: pt ? 'A Recomissão Após a Queda — As Mesmas Palavras de Josué 1' : 'The Recommissioning After the Fall — The Same Words of Joshua 1',
      sub: pt ? '"Não temas nem te aterres" — as mesmas palavras de encorajamento repetidas após o fracasso mais humilhante do livro' : '"Do not fear or be dismayed" — the same encouraging words repeated after the book\'s most humiliating failure',
      emoji: '🏹',
      key: pt ? '"Não temas nem te aterres" (ʾal-tîrāʾ wĕʾal-tēḥāt) são eco direto de Josué 1:9. Deus não começa com "agora que vocês aprenderam a lição" — Ele começa com encorajamento. A condição para a recomissão não foi desempenho melhorado, mas o pecado confessado e corrigido (Acã foi tratado no cap. 7). A promessa de dar Ai repete a estrutura da promessa sobre Jericó — o fracasso não cancelou o programa divino, apenas o atrasou.' : '"Do not fear or be dismayed" (\'al-tira\' we\'al-tehat) directly echoes Joshua 1:9. God does not begin with "now that you\'ve learned your lesson" — He begins with encouragement. The condition for recommissioning was not improved performance, but sin confessed and corrected (Achan was dealt with in ch. 7). The promise of giving Ai repeats the Jericho promise structure — failure did not cancel the divine program, only temporarily delayed it.',
      app: pt ? 'Pais: quando os filhos falham — no caráter, na fé, nos relacionamentos — o impulso paterno de Josué 8 não é punição perpétua, mas recomissão depois da correção. "Levanta-te, sobe a Ai" é a língua da graça que segue a disciplina.' : 'Parents: when children fail — in character, faith, relationships — the paternal impulse of Joshua 8 is not perpetual punishment, but recommissioning after correction. "Arise, go up to Ai" is the language of grace that follows discipline.',
      cor: acc, corL: accL, corB: accB,
    },
    {
      num: '◉', sym: 'Js 8:3–22',
      title: pt ? 'A Estratégia Obediente — A Emboscada que Funciona — Centro' : 'The Obedient Strategy — The Ambush that Works — Center',
      sub: pt ? 'Deus não repete a mesma estratégia — Ele adapta o método ao contexto, mas o princípio é o mesmo: obediência ao que Ele ordena' : 'God does not repeat the same strategy — He adapts the method to context, but the principle is the same: obedience to what He commands',
      emoji: '🏔️',
      key: pt ? 'A estratégia de Ai é radicalmente diferente de Jericó: ali, marcha processional e clamor; aqui, emboscada e estratagema militar. Deus não repete a mesma estratégia — Ele adapta o método ao contexto. A emboscada funciona porque Josué executa com precisão o plano divino: trinta mil guerreiros à noite (8:3), cinco mil em posição de emboscada (8:12), o grupo principal como isca. A complexidade do plano contrasta com a simplicidade de Jericó.' : 'The Ai strategy is radically different from Jericho: there, processional march and shout; here, ambush and military stratagem. God does not repeat the same strategy — He adapts the method to context. The ambush works because Joshua executes the divine plan precisely: thirty thousand warriors by night (8:3), five thousand in ambush position (8:12), the main group as bait.',
      app: pt ? 'Pais: a estratégia que funcionou na criação do filho mais velho pode não funcionar no mais novo. Busquem Deus para cada situação — Ele não repete estratégias mecanicamente. Há uma emboscada específica para cada Ai.' : 'Parents: the strategy that worked raising the eldest child may not work for the youngest. Seek God for each situation — He does not repeat strategies mechanically. There is a specific ambush for each Ai.',
      cor: 'rgba(52,211,153,1)', corL: 'rgba(52,211,153,0.10)', corB: 'rgba(52,211,153,0.28)',
    },
    {
      num: 'III', sym: 'Js 8:23, 29',
      title: pt ? 'O Rei de Ai no Madeiro — O Juízo que Prefigura Cristo' : 'The King of Ai on the Tree — The Judgment that Prefigures Christ',
      sub: pt ? 'O rei pendurado numa árvore cumpre Dt 21:22-23 — Paulo cita este texto em Gl 3:13 para a morte de Cristo' : 'The king hanged on a tree fulfills Deut 21:22-23 — Paul cites this text in Gal 3:13 for Christ\'s death',
      emoji: '🌳',
      key: pt ? 'O rei de Ai é pendurado "numa árvore" (ʿēts) — cumprimento direto de Dt 21:22-23. Paulo cita Dt 21:23 em Gl 3:13: "maldito todo aquele que é pendurado em madeiro." O rei de Ai é tipo de Cristo — mas de forma invertida: o rei foi pendurado como culpado merecedor de maldição; Cristo foi pendurado como inocente recebendo a maldição dos outros. A derrubada ao pôr do sol cumpre o mandato de Dt 21 com precisão.' : 'The king of Ai is hanged "on a tree" (\'ets) — direct fulfillment of Deut 21:22-23. Paul cites Deut 21:23 in Gal 3:13: "cursed is everyone who is hanged on a tree." The king of Ai is a type of Christ — but inverted: the king was hanged as guilty deserving the curse; Christ was hanged as innocent receiving others\' curse. The removal at sunset fulfills Deut 21\'s mandate precisely.',
      app: pt ? 'Pais: o tipo do rei de Ai no madeiro é oportunidade para ensinar a substitutividade da morte de Cristo. "Por que Deus tinha a lei de pendurar o criminoso numa árvore? Porque estava preparando o mundo para entender o que Seu Filho faria."' : 'Parents: the type of the king of Ai on the tree is an opportunity to teach the substitutionary death of Christ. "Why did God have the law of hanging the criminal on a tree? Because He was preparing the world to understand what His Son would do."',
      cor: 'rgba(80,200,255,1)', corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.28)',
    },
  ];

  const ACTIVITIES = [
    { n: '1', icon: '🔄', text: pt ? 'Leiam Js 8:1 e depois Js 1:9. "As palavras são quase idênticas. Por que Deus repetiu as mesmas palavras depois do fracasso?" O que isso revela sobre como Deus trata os que falharam e confessaram?' : 'Read Josh 8:1 and then Josh 1:9. "The words are nearly identical. Why did God repeat the same words after the failure?" What does this reveal about how God treats those who failed and confessed?' },
    { n: '2', icon: '🗺️', text: pt ? 'A estratégia de Ai foi totalmente diferente de Jericó. "Deus não tem uma só estratégia para todas as batalhas. Como a família busca a estratégia de Deus para cada situação específica em vez de repetir a última que funcionou?"' : 'The Ai strategy was totally different from Jericho. "God does not have one strategy for all battles. How does the family seek God\'s strategy for each specific situation instead of repeating the last one that worked?"' },
    { n: '3', icon: '🌙', text: pt ? 'Trinta mil guerreiros foram enviados à noite — em segredo, sem saber se a emboscada funcionaria. "Qual é o passo de obediência que parece arriscado mas Deus ordenou?" Orem juntos sobre isso.' : 'Thirty thousand warriors were sent at night — in secret, not knowing if the ambush would work. "What is the step of obedience that seems risky but God ordered?" Pray together about this.' },
    { n: '4', icon: '🌳', text: pt ? 'O rei de Ai foi pendurado numa árvore — cumprindo Dt 21:22-23. Leiam Gálatas 3:13. "Como Cristo transformou o pendurado na árvore de símbolo de maldição em símbolo de graça?" Discutam com as crianças em nível adequado à idade.' : 'The king of Ai was hanged on a tree — fulfilling Deut 21:22-23. Read Galatians 3:13. "How did Christ transform the one hanged on a tree from a symbol of curse to a symbol of grace?" Discuss with children at an age-appropriate level.' },
    { n: '5', icon: '🪨', text: pt ? 'Josué ergueu um monte de pedras sobre o rei de Ai (8:29) — assim como sobre Acã (7:26). "Um monte marca o lugar do juízo; o outro, o do pecado de Israel. Que marcos a família precisa levantar — onde Deus julgou e restaurou?"' : 'Joshua raised a pile of stones over the king of Ai (8:29) — as over Achan (7:26). "One pile marks the place of judgment; the other, Israel\'s sin. What markers does the family need to raise — where God judged and restored?"' },
    { n: '6', icon: '🙏', text: pt ? 'Orem de pé, com Js 8:1 como base: "Senhor, não temeremos nem nos aterraremos. Levanta-nos para a batalha que adiamos. Dá-nos a estratégia para esta Ai específica. Confiamos que a cidade está nas Tuas mãos."' : 'Pray standing, with Josh 8:1 as the basis: "Lord, we will not fear or be dismayed. Raise us for the battle we have postponed. Give us the strategy for this specific Ai. We trust that the city is in Your hands."' },
  ];

  const APPS_FAMILIA = [
    { role: pt ? 'Pais' : 'Parents', icon: '👨‍👩‍👧', text: pt ? 'Qual é a "Ai" que vocês deixaram de atacar depois de um fracasso anterior? Esta semana, recebam a recomissão de Js 8:1 como palavras para vocês: "Não temas nem te aterres; levanta-te, sobe a Ai."' : 'What is the "Ai" you stopped attacking after a previous failure? This week, receive the recommissioning of Josh 8:1 as words for you: "Do not fear or be dismayed; arise, go up to Ai."' },
    { role: pt ? 'Filhos' : 'Children', icon: '👦', text: pt ? 'Há algo que você desistiu de tentar porque falhou antes? Josué foi ao mesmo lugar que o havia derrotado. Deus não o transferiu para uma batalha mais fácil — Ele o recomissionou para a mesma. O fracasso não é disqualificação.' : 'Is there something you gave up trying because you failed before? Joshua went to the same place that had defeated him. God did not transfer him to an easier battle — He recommissioned him for the same one. Failure is not disqualification.' },
    { role: pt ? 'Noivos' : 'Engaged', icon: '💍', text: pt ? 'O casamento terá suas primeiras batalhas de Ai — fracassos que envergonham. Decidam agora: quando isso acontecer, vão carregar sozinhos ou vão se apoiar mutuamente e buscar a recomissão de Deus juntos?' : 'Marriage will have its first Ai battles — embarrassing failures. Decide now: when that happens, will you carry it alone or support each other and seek God\'s recommissioning together?' },
    { role: pt ? 'Casal' : 'Couple', icon: '👫', text: pt ? 'Há uma área do casamento onde vocês falharam e nunca mais tentaram? A graça de Josué 8 é para o casamento: "não temas nem te aterres; levanta-te, sobe à Ai do casamento de novo." Identifiquem a área e orem juntos pela recomissão.' : 'Is there an area of marriage where you failed and never tried again? The grace of Joshua 8 is for marriage: "do not fear or be dismayed; arise, go up to your marriage\'s Ai again." Identify the area and pray together for recommissioning.' },
    { role: pt ? 'Avós' : 'Grandparents', icon: '👴', text: pt ? 'Contem um fracasso sério — uma "primeira batalha de Ai" da vida de vocês — e como Deus os recomissionou. Essa história é o maior presente que podem dar aos netos que estão vivendo suas próprias derrotas.' : 'Tell a serious failure — a "first Ai battle" of your lives — and how God recommissioned you. That story is the greatest gift you can give to grandchildren living their own defeats.' },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>
      {/* HERO */}
      <div style={{ borderRadius: 20, background: `linear-gradient(135deg,${accL} 0%,rgba(52,211,153,0.07) 60%,rgba(80,200,255,0.05) 100%)`, border: `1px solid ${accB}`, padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10, filter: `drop-shadow(0 0 24px ${acc}80)` }}>🏹🏔️</div>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: acc, marginBottom: 8 }}>
          Josué 8:1–29 · Perícope 264 · {pt ? 'Família — Dia 264' : 'Family — Day 264'}
        </div>
        <div style={{ fontSize: 'clamp(18px,3.2vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'Ai Capturada — A Família que Aprende que Deus Recomissiona Depois do Fracasso' : 'Ai Captured — The Family that Learns God Recommissions After Failure'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.4vw,17px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'Recomissão após queda · Emboscada obediente · Rei de Ai no madeiro' : 'Recommissioning after fall · Obedient ambush · King of Ai on the tree'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {[
            pt ? 'Graça Restauradora' : 'Restoring Grace',
            pt ? 'Nova Estratégia' : 'New Strategy',
            pt ? 'Fracasso Não Cancela' : 'Failure Does Not Cancel',
            pt ? 'Recomissão Divina' : 'Divine Recommissioning',
          ].map(t => (
            <span key={t} style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: `${acc}18`, border: `1px solid ${accB}`, color: acc }}>{t}</span>
          ))}
        </div>
      </div>

      {/* BIG IDEA */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(52,211,153,0.10),rgba(50,200,130,0.07))', border: '1.5px solid rgba(52,211,153,0.32)', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>💡 {pt ? 'Big Idea · Para a Família' : 'Big Idea · For the Family'}</div>
        <p style={{ fontSize: 'clamp(18px,2.8vw,22px)', fontWeight: 800, color: '#fff', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Depois da vergonhosa derrota em Ai causada pelo pecado de Acã, Deus não abandona Israel — Ele recomissiona Josué com as mesmas palavras de encorajamento de Josué 1, porque a graça de Deus não é cancelada pelo fracasso confessado e corrigido.'
            : 'After the shameful defeat at Ai caused by Achan\'s sin, God does not abandon Israel — He recommissions Joshua with the same words of encouragement as Joshua 1, because God\'s grace is not cancelled by failure that has been confessed and corrected.'}
        </p>
      </div>

      {/* PERGUNTA + DOUTRINA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,100,0.06)', border: '1px solid rgba(255,100,100,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 8 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: 0 }}>
            {pt
              ? '"Nossa família acredita que Deus recomissiona depois do fracasso? Ou tratamos as quedas como disqualificações permanentes? O que a segunda batalha de Ai nos ensina sobre a graça que restaura a missão?"'
              : '"Does our family believe God recommissions after failure? Or do we treat falls as permanent disqualifications? What does the second battle of Ai teach us about the grace that restores the mission?"'}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.28)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>📜 {pt ? 'Doutrina Central' : 'Central Doctrine'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: 0 }}>
            {pt
              ? 'Deus recomissiona o fracassado que confessou e corrigiu o pecado com as mesmas palavras de encorajamento do início da jornada — porque a perseverança dos santos não é ausência de queda, mas certeza de que o Senhor que começa a obra a completa.'
              : 'God recommissions the one who failed and confessed and corrected sin with the same words of encouragement from the beginning of the journey — because the perseverance of the saints is not absence of falling, but certainty that the Lord who begins the work completes it.'}
          </p>
        </div>
      </div>

      {/* MOVIMENTOS */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
          📋 {pt ? 'Movimentos do Sermão Familiar' : 'Family Sermon Movements'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
          {MOVES.map(m => (
            <div key={m.num} style={{ borderRadius: 16, background: m.corL, border: `1.5px solid ${m.corB}`, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.cor}22`, border: `1.5px solid ${m.cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(16px,2vw,18px)' }}>{m.emoji}</div>
                <div>
                  <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 700, color: m.cor, letterSpacing: '0.12em' }}>{m.num} · {m.sym}</div>
                  <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{m.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic', marginBottom: 8 }}>{m.sub}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{m.key}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: m.cor, lineHeight: 1.55, fontWeight: 600 }}>▸ {m.app}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EIXO REDENTOR */}
      <div style={{ borderRadius: 16, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '18px 22px', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 10 }}>✝️ {pt ? 'Eixo Redentor' : 'Redemptive Axis'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'A segunda batalha de Ai é tipo da graça que restaura a missão depois da queda. Adão falhou na primeira batalha (Gn 3); Cristo, o segundo Adão, vence onde o primeiro falhou. A recomissão de Josué 8:1 prefigura a restauração de Pedro em Jo 21:15-19 ("apascenta minhas ovelhas") — o mesmo Senhor que diz "não temas" a Josué diz "me amas?" a Pedro. O rei de Ai no madeiro aponta a Cristo em Gl 3:13 — o madeiro do juízo se torna o madeiro da graça. Cada batalha tem seu próprio plano divino.'
            : 'The second battle of Ai is a type of grace that restores the mission after the fall. Adam failed in the first battle (Gen 3); Christ, the second Adam, wins where the first failed. The recommissioning of Josh 8:1 prefigures the restoration of Peter in John 21:15-19 ("feed my sheep") — the same Lord who says "do not fear" to Joshua says "do you love me?" to Peter. The king of Ai on the tree points to Christ in Gal 3:13.'}
        </p>
      </div>

      {/* APLICAÇÕES */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.70)', marginBottom: 18, textAlign: 'center' }}>
          🎯 {pt ? 'Aplicações por Papel na Família' : 'Applications by Family Role'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
          {APPS_FAMILIA.map(a => (
            <div key={a.role} style={{ borderRadius: 12, background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.20)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: 'rgba(52,211,153,0.95)', marginBottom: 6 }}>{a.icon} {a.role}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.60 }}>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DINÂMICA */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: `${acc}B0`, marginBottom: 18, textAlign: 'center' }}>
          🎲 {pt ? 'Dinâmica Familiar — 6 Atividades' : 'Family Activities — 6 Activities'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 10 }}>
          {ACTIVITIES.map(a => (
            <div key={a.n} style={{ borderRadius: 12, background: `${acc}0F`, border: `1px solid ${accB}`, padding: '12px 14px', display: 'flex', gap: 10 }}>
              <div style={{ fontSize: 'clamp(18px,2.4vw,22px)', lineHeight: 1.2 }}>{a.icon}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60 }}><span style={{ fontWeight: 800, color: acc }}>{a.n}. </span>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONCLUSÃO */}
      <div style={{ borderRadius: 16, background: `linear-gradient(135deg,${accL},rgba(52,211,153,0.07))`, border: `1.5px solid ${accB}`, padding: '20px 24px' }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 10 }}>🏁 {pt ? 'Conclusão' : 'Conclusion'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Família amada, Ai derrotou Israel uma vez. Mas depois que o pecado foi tratado, Deus disse: "levanta-te, sobe de volta." A mesma Ai. O mesmo Josué. O mesmo Deus — com a mesma promessa: "a entrego na tua mão." O fracasso não encerrou a jornada. Não cancela o chamado. Em Cristo, toda primeira batalha de Ai — toda derrota causada por pecado confessado e corrigido — encontra uma recomissão: "não temas nem te aterres." Levanta-te, família. A Ai que te derrotou ainda está diante de ti. Desta vez, vai ao lugar certo, com a estratégia certa, sob o Comandante certo. Amém.'
            : 'Beloved family, Ai defeated Israel once. But after the sin was dealt with, God said: "arise, go back up." The same Ai. The same Joshua. The same God — with the same promise: "I deliver it into your hand." Failure did not end the journey. It does not cancel the calling. In Christ, every first Ai battle — every defeat caused by sin confessed and corrected — finds a recommissioning: "do not fear or be dismayed." Arise, family. The Ai that defeated you still stands before you. This time, go to the right place, with the right strategy, under the right Commander. Amen.'}
        </p>
      </div>
    </div>
  );
}

// ─── Aconselhamento Bíblico Josué 254 ────────────────────────────────
function AconselhamentoBiblicoJosue254FamiliaSection({ pt }: { pt: boolean }) {
  const green  = 'rgba(52,211,153,1)';
  const greenL = 'rgba(52,211,153,0.10)';
  const greenB = 'rgba(52,211,153,0.28)';
  const amber  = 'rgba(255,180,50,1)';
  const amberL = 'rgba(255,180,50,0.10)';
  const amberB = 'rgba(255,180,50,0.28)';
  const blue   = 'rgba(80,200,255,1)';
  const blueL  = 'rgba(80,200,255,0.10)';
  const blueB  = 'rgba(80,200,255,0.28)';
  const purple = 'rgba(180,120,255,1)';
  const purpleL= 'rgba(180,120,255,0.10)';
  const purpleB= 'rgba(180,120,255,0.28)';
  const pink   = 'rgba(255,120,160,1)';
  const pinkL  = 'rgba(255,120,160,0.10)';
  const pinkB  = 'rgba(255,120,160,0.28)';

  const titleSz = 'clamp(18px,2.8vw,22px)';
  const bodySz  = 'clamp(16px,2.4vw,19px)';
  const labelSz = 'clamp(14px,2vw,16px)';
  const smallSz = 'clamp(13px,1.7vw,15px)';

  // Footnote superscript helper
  const fn = (n: number) => (
    <sup style={{ fontSize: '0.70em', fontWeight: 900, color: amber, marginLeft: 2, verticalAlign: 'super', lineHeight: 0 }}>[{n}]</sup>
  );

  const sectionCard = (accent: string, accentL: string, accentB: string, emoji: string, heading: string, theme: string, children: React.ReactNode) => (
    <div style={{ borderRadius: 16, background: accentL, border: `1.5px solid ${accentB}`, padding: '22px 24px', marginBottom: 20 }}>
      <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: accent, marginBottom: 8 }}>
        {emoji} {heading}
      </div>
      <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.55)', marginBottom: 14, fontStyle: 'italic' }}>{theme}</div>
      {children}
    </div>
  );

  const quoteBox = (text: string, author: string, accent: string, fnNum: number) => (
    <div style={{ background: 'rgba(0,0,0,0.25)', borderLeft: `3px solid ${accent}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', marginBottom: 12 }}>
      <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, margin: '0 0 6px 0', fontStyle: 'italic' }}>"{text}"</p>
      <div style={{ fontSize: labelSz, color: accent, fontWeight: 700 }}>— {author}{fn(fnNum)}</div>
    </div>
  );

  const questionsBox = (questions: string[], accent: string) => (
    <div style={{ background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '14px 18px', marginTop: 14 }}>
      <div style={{ fontSize: labelSz, fontWeight: 900, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
        {pt ? 'Perguntas para o Conselheiro' : 'Counselor Questions'}
      </div>
      <ol style={{ margin: 0, paddingLeft: 20 }}>
        {questions.map((q, i) => (
          <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 8 }}>{q}</li>
        ))}
      </ol>
    </div>
  );

  // ABNT references — numbered 1-11
  const REFS = [
    { n: 1,  abnt: 'POWLISON, David. Seeing with New Eyes: Counseling and the Human Condition through the Lens of Scripture. Phillipsburg: Presbyterian and Reformed, 2003.' },
    { n: 2,  abnt: 'ADAMS, Jay E. Competent to Counsel: Introduction to Nouthetic Counseling. Grand Rapids: Zondervan, 1970.' },
    { n: 3,  abnt: 'TRIPP, Paul David. Instruments in the Redeemer\'s Hands: People in Need of Change Helping People in Need of Change. Phillipsburg: Presbyterian and Reformed, 2002.' },
    { n: 4,  abnt: 'WELCH, Edward T. Running Scared: Fear, Worry, and the God of Rest. Greensboro: New Growth Press, 2007.' },
    { n: 5,  abnt: 'POWLISON, David. Speaking Truth in Love: Counsel in Community. Greensboro: New Growth Press, 2005.' },
    { n: 6,  abnt: 'ADAMS, Jay E. A Theology of Christian Counseling: More Than Redemption. Grand Rapids: Zondervan, 1979.' },
    { n: 7,  abnt: 'BEEKE, Joel R. Family Worship. Grand Rapids: Reformation Heritage Books, 2009.' },
    { n: 8,  abnt: 'BAUCHAM, Voddie, Jr. Family Driven Faith: Doing What It Takes to Raise Sons and Daughters Who Walk with God. Wheaton: Crossway, 2007.' },
    { n: 9,  abnt: 'CROFT, Brian; SAVASTIO, Jim. The Pastor\'s Ministry: Biblical Priorities for Faithful Shepherds. Grand Rapids: Zondervan, 2015.' },
    { n: 10, abnt: 'TRIPP, Paul David. What Did You Expect? Redeeming the Realities of Marriage. Wheaton: Crossway, 2010.' },
    { n: 11, abnt: 'ADAMS, Jay E. Christian Living in the Home. Phillipsburg: Presbyterian and Reformed, 1972.' },
    { n: 12, abnt: 'WELCH, Edward T. Side by Side: Walking with Others in Wisdom and Love. Wheaton: Crossway, 2015.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* HERO */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(52,211,153,0.15),rgba(255,180,50,0.10))', border: `1.5px solid ${greenB}`, padding: '28px 28px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(28px,4vw,38px)', marginBottom: 10 }}>🧭📖</div>
        <div style={{ fontSize: 'clamp(20px,3.2vw,26px)', fontWeight: 900, color: green, marginBottom: 8, lineHeight: 1.3 }}>
          {pt ? 'Aconselhamento Bíblico · Josué 1:1–18' : 'Biblical Counseling · Joshua 1:1-18'}
        </div>
        <div style={{ fontSize: titleSz, fontWeight: 700, color: amber, marginBottom: 14 }}>
          {pt ? 'Recursos para o Conselheiro de Casais e Famílias' : 'Resources for the Couples and Family Counselor'}
        </div>
        <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Este guia oferece estrutura clínico-pastoral para conselheiros bíblicos que trabalham com casais e famílias, a partir dos temas centrais de Josué 1. As citações dos autores são identificadas por notas de rodapé numeradas; as referências ABNT completas constam ao final.'
            : 'This guide offers a clinical-pastoral framework for biblical counselors working with couples and families, drawn from the central themes of Joshua 1. Author citations are identified by numbered footnotes; full ABNT references appear at the end.'}
        </p>
      </div>

      {/* PROBLEMAS QUE ESTA PERÍCOPE RESOLVE */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.12)', padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>
          🎯 {pt ? 'Problemas que esta Perícope Endereça — Guia de Triagem para o Conselheiro' : 'Problems this Pericope Addresses — Counselor Triage Guide'}
        </div>
        <p style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.50)', lineHeight: 1.65, margin: '0 0 16px 0', fontStyle: 'italic' }}>
          {pt
            ? 'Josué 1:1–18 é uma perícope de comissão em contexto de luto e transição. O conselheiro pode utilizá-la sempre que o aconselhando enfrenta qualquer um dos cenários abaixo:'
            : 'Joshua 1:1–18 is a commission pericope in a context of grief and transition. The counselor may use it whenever the counselee faces any of the scenarios below:'}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 10 }}>
          {[
            { icon: '⚰️', cor: green,  titulo: pt ? 'Luto e Perda'            : 'Grief and Loss',
              desc: pt ? 'Morte de cônjuge, pai ou mãe, filho; perda de emprego, saúde ou papel de liderança na família. A perícope mostra que Deus comissiona no luto, não depois dele.'
                       : 'Death of spouse, parent, child; loss of employment, health or family leadership role. The pericope shows God commissions in grief, not after it.' },
            { icon: '🔄', cor: amber, titulo: pt ? 'Transição de Liderança'   : 'Leadership Transition',
              desc: pt ? 'Família sem pai presente (morte, abandono, incapacidade), casamento sem liderança espiritual, divórcio, filhos adultos assumindo papel de cuidadores. "Depois da morte de Moisés" = toda transição abrupta de autoridade.'
                       : 'Family without present father (death, abandonment, incapacity), marriage without spiritual leadership, divorce, adult children becoming caregivers.' },
            { icon: '😨', cor: blue,  titulo: pt ? 'Medo e Paralisia'         : 'Fear and Paralysis',
              desc: pt ? 'Casais/indivíduos que adiam decisões de fé por medo (ter filhos, servir na igreja, reconciliar relacionamentos, sair de situação de pecado). "Sê forte e corajoso" 3× é diagnóstico de medo profundo.'
                       : 'Couples/individuals who postpone faith decisions out of fear. The triple "be strong and courageous" is a diagnosis of deep fear.' },
            { icon: '📖', cor: purple, titulo: pt ? 'Ausência da Palavra no Lar' : 'Absence of the Word at Home',
              desc: pt ? 'Família sem devoção conjunta, casamento com vida espiritual paralela (cada um por si), filhos sem formação bíblica deliberada. Josué 1:8 é o texto diagnóstico central.'
                       : 'Family without joint devotion, marriage with parallel spiritual lives, children without deliberate biblical formation. Joshua 1:8 is the central diagnostic text.' },
            { icon: '🤝', cor: pink,  titulo: pt ? 'Egoísmo e Abandono Relacional' : 'Relational Selfishness and Abandonment',
              desc: pt ? 'Cônjuge que "já chegou" e não acompanha o outro em crise; filho que prosperou e negligencia os pais; família fragmentada em que cada um "já cruzou o Jordão" sem esperar os demais.'
                       : 'Spouse who "made it" and does not accompany the other in crisis; prosperous child neglecting parents; fragmented family where each "crossed the Jordan" without waiting for the others.' },
            { icon: '🏔️', cor: amber, titulo: pt ? 'Caminho sem Precedente'   : 'Unprecedented Path',
              desc: pt ? '"Nunca antes passastes por este caminho" (Js 1:4) — diagnóstico para famílias em situações inéditas: primeira geração cristã, diagnóstico grave, crise financeira extrema, migração. A Arca vai na frente: a Presença precede o mapa.'
                       : '"You have not passed this way before" (Josh 1:4) — for families in unprecedented situations: first-generation Christians, serious diagnosis, extreme financial crisis, migration.' },
          ].map((p2, i) => (
            <div key={i} style={{ background: `${p2.cor}0D`, border: `1px solid ${p2.cor}33`, borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: labelSz, fontWeight: 900, color: p2.cor, marginBottom: 6 }}>{p2.icon} {p2.titulo}</div>
              <div style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.78)', lineHeight: 1.65 }}>{p2.desc}</div>
            </div>
          ))}
        </div>

        {/* Eixo Histórico-Redentivo — painel de enquadramento */}
        <div style={{ marginTop: 18, borderRadius: 12, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '16px 20px' }}>
          <div style={{ fontSize: labelSz, fontWeight: 900, color: amber, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>
            ✝️ {pt ? 'Enquadramento Histórico-Redentivo para o Conselheiro' : 'Redemptive-Historical Frame for the Counselor'}
          </div>
          <p style={{ fontSize: bodySz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.80, margin: 0 }}>
            {pt
              ? 'Josué é o antitype de Jesus (ambos com o mesmo nome hebraico Yeshua — "YHWH salva"). A entrada em Canaã tipifica a salvação: o povo não conquista a terra pela força, mas pela obediência à Presença que os precede. O conselheiro bíblico que trabalha com esta perícope deve sempre enquadrar o problema do aconselhando dentro da grande narrativa: (1) Cristo é o Josué definitivo que cruzou o Jordão do juízo por nós (batismo — Rm 6:3–4); (2) a "terra" que a família herda é a nova criação já inaugurada; (3) "sê forte e corajoso" não é lei de autoajuda — é promessa fundada na obra consumada de Cristo ("estarei contigo" → Mt 28:20). O conselheiro que apresenta apenas a demanda ("levanta-te, obedeça, seja forte") sem a base redentiva ("porque Eu já cruzei o Jordão por você") prega lei sem evangelho — e isso não produz mudança duradoura.'
              : 'Joshua is the antitype of Jesus (both bear the same Hebrew name Yeshua). The entry into Canaan typifies salvation: the people do not conquer by strength but by obedience to the Presence that precedes them. Christ is the definitive Joshua who crossed the Jordan of judgment for us (baptism — Rom 6:3–4). "Be strong and courageous" is not self-help law — it is a promise grounded in Christ\'s finished work ("I will be with you" → Matt 28:20).'}
          </p>
        </div>
      </div>

      {/* SECTION 1 — Luto */}
      {sectionCard(green, greenL, greenB, '⚰️',
        pt ? 'Seção 1 — Luto, Transições e Liderança Familiar' : 'Section 1 — Grief, Transitions and Family Leadership',
        pt ? 'Josué 1:1–2 — morte de Moisés; Deus fala no luto; "levanta-te"' : 'Joshua 1:1-2 — death of Moses; God speaks in grief; "arise"',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'Transições de liderança na família (morte de pai/mãe, divórcio, separação, doença grave do líder da casa)' : 'Family leadership transitions (death of father/mother, divorce, separation, serious illness of the household leader)',
              pt ? 'O luto paralisante vs. o luto processado que permite avanço' : 'Paralyzing grief vs. processed grief that enables forward movement',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'O conselheiro bíblico não confronta o sofrimento com pressa — ele senta no luto com o aconselhado antes de chamá-lo a avançar, como Deus fez com Josué'
               : 'The biblical counselor does not rush suffering — he sits in grief with the counselee before calling him to advance, as God did with Joshua',
            'David Powlison', green, 1)}
          {quoteBox(
            pt ? 'O papel do conselheiro é apresentar o imperativo bíblico ("levanta-te") no contexto da promessa ("estarei contigo") — nunca como lei seca'
               : 'The counselor\'s role is to present the biblical imperative ("arise") in the context of the promise ("I will be with you") — never as dry law',
            'Jay E. Adams', amber, 2)}
          {quoteBox(
            pt ? 'A crise de liderança na família revela o ídolo da suficiência humana — o conselheiro expõe o ídolo e apresenta YHWH como o único sustentador competente'
               : 'The family leadership crisis reveals the idol of human sufficiency — the counselor exposes the idol and presents YHWH as the only competent sustainer',
            'Paul David Tripp', blue, 3)}
          <div style={{ background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: amber, marginBottom: 6 }}>✝️ {pt ? 'Perspectiva Histórico-Redentiva' : 'Redemptive-Historical Perspective'}</div>
            <p style={{ fontSize: smallSz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
              {pt
                ? 'A morte de Moisés não é falha do plano de Deus — é tipologia da Lei que não pode levar o povo à terra (Gl 3:24–25; Hb 3:5–6). Josué ("YHWH salva") assume e leva Israel aonde Moisés não pôde. Cristo é o Josué definitivo: onde a Lei condena e não pode salvar, Ele entra no Jordão do juízo e abre caminho. O conselheiro deve apresentar o "levanta-te" não como exigência da Lei, mas como convite do Evangelho: Cristo já atravessou o Jordão mais difícil — a morte e o juízo — e chama a família a avançar na força Dele (Ef 2:10).'
                : 'Moses\' death is not a failure of God\'s plan — it typifies the Law that cannot bring the people into the land (Gal 3:24–25; Heb 3:5–6). Joshua ("YHWH saves") takes over and leads Israel where Moses could not. Christ is the definitive Joshua: "arise" is Gospel invitation, not Law demand.'}
            </p>
          </div>
          {questionsBox([
            pt ? '"Quem era o Moisés da sua família — a pessoa ou estrutura que segurava tudo — e o que aconteceu quando ela não estava mais?"'
               : '"Who was the Moses of your family — the person or structure that held everything together — and what happened when they were no longer there?"',
            pt ? '"Em que área da vida conjugal/familiar vocês estão acampados diante do Jordão, esperando condições melhores para obedecer?"'
               : '"In what area of your marital/family life are you camped before the Jordan, waiting for better conditions to obey?"',
            pt ? '"Deus disse levanta-te no dia seguinte à morte de Moisés. O que impede você de ouvir esse mesmo chamado hoje? Cristo já cruzou o Jordão por você — o que ainda o segura?"'
               : '"God said arise the day after Moses died. What is preventing you from hearing that same call today? Christ already crossed the Jordan for you — what is still holding you back?"',
          ], green)}
        </>
      )}

      {/* SECTION 2 — Medo */}
      {sectionCard(amber, amberL, amberB, '🛡️',
        pt ? 'Seção 2 — Coragem, Medo e a Identidade sob Pressão' : 'Section 2 — Courage, Fear and Identity under Pressure',
        pt ? 'Josué 1:6–9 — "sê forte e corajoso" 3×; medo como tema pastoral' : 'Joshua 1:6-9 — "be strong and courageous" 3x; fear as pastoral theme',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'A repetição tripla como diagnóstico: quem precisa de três ordens é quem tem medo profundo' : 'The triple repetition as diagnosis: whoever needs three commands has deep fear',
              pt ? 'Tipologia do medo no aconselhamento bíblico: medo do futuro, medo do fracasso como pai/mãe/cônjuge, medo do abandono' : 'Fear typology in biblical counseling: fear of the future, fear of failure as parent/spouse, fear of abandonment',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'O medo é sempre adoração misdirecionada — a criatura está ocupando o lugar que pertence ao Criador. O antídoto não é coragem natural, mas o conhecimento crescente de quem é Deus'
               : 'Fear is always misdirected worship — the creature is occupying the place that belongs to the Creator. The antidote is not natural courage, but the growing knowledge of who God is',
            'Edward T. Welch', amber, 4)}
          {quoteBox(
            pt ? 'O conselheiro que apenas diz "não tema" sem mostrar em quem confiar está pregando lei sem evangelho'
               : 'The counselor who merely says "do not fear" without showing in whom to trust is preaching law without gospel',
            'David Powlison', green, 5)}
          {quoteBox(
            pt ? 'A coragem ordenada em 1:6–9 é consequência da meditação na Palavra (1:8) — o conselheiro trabalha hábitos de meditação, não apenas emoções'
               : 'The courage commanded in 1:6-9 is the consequence of meditating on the Word (1:8) — the counselor works on meditation habits, not merely emotions',
            'Jay E. Adams', blue, 6)}
          <div style={{ background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: amber, marginBottom: 6 }}>✝️ {pt ? 'Perspectiva Histórico-Redentiva' : 'Redemptive-Historical Perspective'}</div>
            <p style={{ fontSize: smallSz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
              {pt
                ? '"Sê forte e corajoso" (Js 1:6,7,9) não é motivação psicológica — é promessa ancorada em presença divina: "porque o SENHOR teu Deus é contigo" (1:9). Cristo cumpriu esse padrão definitivamente: no Getsêmani, enfrentou o medo mais profundo que qualquer ser humano poderia enfrentar, e o atravessou por obediência ao Pai (Lc 22:42–44). A ressurreição é a declaração de que o Jordão do juízo foi atravessado — o crente avança não para conquistar o que Christ ainda não garantiu, mas para habitar o que Ele já conquistou (Ef 1:3). O conselheiro que entende isso não pede coragem ao aconselhando como se ele precisasse produzi-la — ele aponta para Aquele que já é a coragem do povo de Deus (1Co 1:30).'
                : 'The triple "be strong and courageous" is promise anchored in divine presence: "for the LORD your God is with you." Christ fulfilled this pattern definitively at Gethsemane — He crossed the deepest Jordan of fear and judgment. The resurrection declares the Jordan of condemnation has been crossed. The counselor points not to self-produced courage, but to Christ who is the courage of God\'s people (1 Cor 1:30).'}
            </p>
          </div>
          {questionsBox([
            pt ? '"Se você tivesse que nomear o medo mais paralisante na sua vida conjugal agora, qual seria? A que ídolo esse medo está servindo?"'
               : '"If you had to name the most paralyzing fear in your marital life right now, what would it be? What idol is that fear serving?"',
            pt ? '"Cristo enfrentou o maior medo na cruz e o atravessou. Como isso muda a forma como você enfrenta o seu medo hoje?"'
               : '"Christ faced the greatest fear at the cross and crossed it. How does this change the way you face your fear today?"',
            pt ? '"O que sê forte e corajoso significaria concretamente para você esta semana — não como lei que você deve cumprir, mas como convite de Quem já venceu?"'
               : '"What would \'be strong and courageous\' mean concretely for you this week — not as law to fulfill, but as invitation from the One who already conquered?"',
          ], amber)}
        </>
      )}

      {/* SECTION 3 — Hagah */}
      {sectionCard(blue, blueL, blueB, '📖',
        pt ? 'Seção 3 — A Palavra como Centro do Lar: Hagah Conjugal e Familiar' : 'Section 3 — The Word as Center of the Home: Conjugal and Family Hagah',
        pt ? 'Josué 1:8 — meditação diurna e noturna; sucesso vinculado à Palavra' : 'Joshua 1:8 — day and night meditation; success tied to the Word',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'O hagah (ruminação) como prática espiritual conjugal: a Palavra compartilhada, não apenas individual' : 'Hagah (rumination) as a conjugal spiritual practice: the shared Word, not merely individual',
              pt ? 'Diagnóstico: famílias que chegam ao conselheiro frequentemente têm a Bíblia como prática individual, mas não pactual — cada membro lê sozinho, mas nunca juntos' : 'Diagnosis: families who come to the counselor often have the Bible as an individual but not covenantal practice',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'A família que não tem devoção conjunta está construindo dois mundos espirituais paralelos que eventualmente colidem na crise'
               : 'The family that has no joint devotion is building two parallel spiritual worlds that will eventually collide in crisis',
            'Joel R. Beeke', blue, 7)}
          {quoteBox(
            pt ? 'O conselheiro que não pergunta "vocês têm devoção familiar?" está ignorando o principal diagnóstico espiritual do lar cristão'
               : 'The counselor who does not ask "do you have family devotion?" is ignoring the primary spiritual diagnosis of the Christian home',
            'Voddie Baucham Jr.', amber, 8)}
          {quoteBox(
            pt ? 'A agenda do conselheiro bíblico inclui sempre o estabelecimento ou restauração da devoção familiar como meta terapêutica concreta'
               : 'The biblical counselor\'s agenda always includes establishing or restoring family devotion as a concrete therapeutic goal',
            'Brian Croft & Jim Savastio', green, 9)}
          <div style={{ background: 'rgba(80,200,255,0.10)', border: '1px solid rgba(80,200,255,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: blue, marginBottom: 6 }}>{pt ? 'Prática Clínica Pastoral' : 'Clinical Pastoral Practice'}</div>
            <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.7, margin: 0 }}>
              {pt
                ? 'O conselheiro pode pedir ao casal/família para começar um hagah juntos por 7 dias e relatar o efeito na próxima sessão.'
                : 'The counselor can ask the couple/family to begin a hagah together for 7 days and report the effect at the next session.'}
            </p>
          </div>
          <div style={{ background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: amber, marginBottom: 6 }}>✝️ {pt ? 'Perspectiva Histórico-Redentiva' : 'Redemptive-Historical Perspective'}</div>
            <p style={{ fontSize: smallSz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
              {pt
                ? 'O hagah de Josué 1:8 é praticado sobre a Torah de Moisés — mas o crente novotestamentário medita sobre a Palavra já cumprida em Cristo. João 1:14 declara que o Logos se fez carne: a meditação no Evangelho é meditação no próprio Filho. Hebreus 4:12 confirma que a Palavra que o casal medita juntos é "viva e eficaz" — não princípio de autoajuda, mas espada do Espírito que expõe e cura (Ef 6:17). O conselheiro deve perguntar: "Qual promessa do Evangelho vocês precisam ruminar juntos nesta crise?" — não "Qual regra precisam seguir?"'
                : 'The hagah of Joshua 1:8 is practiced on Moses\' Torah — but the New Testament believer meditates on the Word fulfilled in Christ. John 1:14 declares the Logos became flesh. The Word the couple meditates on together is "living and active" (Heb 4:12) — not a self-help principle, but the Spirit\'s sword. Ask: "What Gospel promise do you need to ruminate together in this crisis?" — not "What rule must you follow?"'}
            </p>
          </div>
          {questionsBox([
            pt ? '"Vocês têm um tempo de leitura bíblica juntos? Com que frequência? O que impede?"'
               : '"Do you have a time of Bible reading together? How often? What prevents it?"',
            pt ? '"Quando há conflito conjugal, vocês recorrem à Palavra juntos ou cada um vai para seu canto? Qual promessa do Evangelho essa crise específica precisa?"'
               : '"When there is marital conflict, do you turn to the Word together? What specific Gospel promise does this crisis need?"',
            pt ? '"Se Josué 1:8 é verdade — e em Cristo é mais verdade do que nunca — que diferença concreta a meditação diária na Palavra deveria fazer na relação de vocês?"'
               : '"If Joshua 1:8 is true — and in Christ it is more true than ever — what concrete difference should daily meditation on the Word make in your relationship?"',
          ], blue)}
        </>
      )}

      {/* SECTION 4 — Solidariedade */}
      {sectionCard(purple, purpleL, purpleB, '🤝',
        pt ? 'Seção 4 — Solidariedade, Obrigações e Egoísmo Familiar' : 'Section 4 — Solidarity, Obligations and Family Selfishness',
        pt ? 'Josué 1:12–18 — as tribos já estabelecidas acompanhando as que ainda lutam' : 'Joshua 1:12-18 — the already-settled tribes accompanying those still fighting',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'O egoísmo relacional: casais e familiares que "já chegaram" e abandonam quem ainda luta' : 'Relational selfishness: couples and family members who have "arrived" and abandon those still struggling',
              pt ? 'Padrões sistêmicos comuns: o filho que prosperou e negligencia o pai; o cônjuge curado que não acompanha o que ainda sofre' : 'Common systemic patterns: the son who prospered and neglects the father; the healed spouse who does not accompany the one still suffering',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'O casamento não é uma sociedade de benefícios mútuos — é um pacto de acompanhamento incondicional. O "já cheguei, você se vira" é ruptura pactual'
               : 'Marriage is not a mutual benefit society — it is a covenant of unconditional accompaniment. The "I made it, you\'re on your own" is covenantal rupture',
            'Paul David Tripp', purple, 10)}
          {quoteBox(
            pt ? 'A solidariedade de Rúben, Gade e Meia Tribo de Manassés é modelo de amor de pacto que não descansa enquanto o irmão não entrou no repouso'
               : 'The solidarity of Reuben, Gad and the half-tribe of Manasseh is a model of covenant love that does not rest until the brother has entered rest',
            'Jay E. Adams', amber, 11)}
          {quoteBox(
            pt ? 'O ministério "uns-aos-outros" que Paulo ordena é o antídoto bíblico para o isolamento que destrói casamentos e famílias. O conselheiro ensina o casal a ser sacerdote um do outro'
               : 'The "one another" ministry Paul commands is the biblical antidote to the isolation that destroys marriages and families. The counselor teaches the couple to be priests to each other',
            'Edward T. Welch', green, 12)}
          <div style={{ background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: amber, marginBottom: 6 }}>✝️ {pt ? 'Perspectiva Histórico-Redentiva' : 'Redemptive-Historical Perspective'}</div>
            <p style={{ fontSize: smallSz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
              {pt
                ? 'A solidariedade das tribos transjordânicas em Josué 1 é sombra do "uns aos outros" (allélōn) do Novo Testamento. Cristo, que já tinha toda a herança do Pai (Jo 17:24), desceu para nos acompanhar na nossa pobreza (2Co 8:9) — esse é o modelo definitivo de solidariedade: o Forte que não descansa enquanto o fraco não entra no repouso. Hebreus 2:18 afirma que Cristo, por ter sofrido, pode socorrer os que sofrem. O conselheiro deve perguntar: "Que aspecto da solidariedade de Cristo com vocês os motiva a ter essa mesma solidariedade entre si?" — porque a ética do pacto sempre flui da graça do pacto, nunca da obrigação da lei.'
                : 'The transjordanian tribes\' solidarity is a shadow of the New Testament "one another" (allélōn). Christ, who already had all the Father\'s inheritance, descended to accompany us in our poverty (2 Cor 8:9) — the definitive model: the Strong One who does not rest while the weak has not entered rest. Heb 2:18: having suffered, He can help those who suffer. Covenantal ethics always flow from covenantal grace.'}
            </p>
          </div>
          {questionsBox([
            pt ? '"Nesta fase da vida, quem na família já está no repouso e quem ainda está lutando? Vocês estão juntos — como Cristo desceu para nos acompanhar quando Ele já tinha tudo?"'
               : '"Who in the family is already at rest and who is still struggling? Are you together — as Christ descended to accompany us when He already had everything?"',
            pt ? '"Em que área do casamento você tem ficado no seu lado do rio enquanto o seu cônjuge ainda luta sozinho? O que Cristo faria com essa situação?"'
               : '"In what area of marriage have you been staying on your side of the river while your spouse still struggles alone? What would Christ do with this situation?"',
            pt ? '"O que significa, concretamente para vocês dois, passar armados diante de vossos irmãos (Js 1:14) — sabendo que Cristo passou armado diante de nós na cruz?"'
               : '"What does it mean, concretely for you, to pass over armed before your brothers (Josh 1:14) — knowing Christ passed armed before us at the cross?"',
          ], purple)}
        </>
      )}

      {/* SECTION 5 — Authors grid */}
      <div style={{ borderRadius: 16, background: pinkL, border: `1.5px solid ${pinkB}`, padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: pink, marginBottom: 16 }}>
          📚 {pt ? 'Seção 5 — Autores e Obras de Referência' : 'Section 5 — Reference Authors and Works'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 12, marginBottom: 16 }}>
          {[
            { fn: 2,  name: 'Jay E. Adams', works: 'Competent to Counsel (1970); Christian Living in the Home (1972); A Theology of Christian Counseling (1979)', desc: pt ? 'Pioneiro do aconselhamento noutético/bíblico; confrontação direta com a Palavra' : 'Pioneer of nouthetic/biblical counseling; direct confrontation with the Word', color: amber },
            { fn: 1,  name: 'David Powlison', works: 'Seeing with New Eyes (2003); Speaking Truth in Love (2005)', desc: pt ? 'Abordagem CCEF; o coração por trás do comportamento; medo, raiva e ídolos' : 'CCEF approach; the heart behind behavior; fear, anger and idols', color: green },
            { fn: 3,  name: 'Paul David Tripp', works: 'Instruments in the Redeemer\'s Hands (2002); What Did You Expect? (2010)', desc: pt ? 'Agentes de mudança; casamento como aliança santificadora' : 'Change agents; marriage as sanctifying covenant', color: blue },
            { fn: 4,  name: 'Edward T. Welch', works: 'Running Scared (2007); Side by Side (2015)', desc: pt ? 'Medo, vergonha, o ministério "uns aos outros"' : 'Fear, shame, the "one another" ministry', color: purple },
            { fn: 7,  name: 'Joel R. Beeke', works: 'Family Worship (2009); Parenting by God\'s Promises (2011)', desc: pt ? 'Piedade reformada; culto familiar; sexualidade na aliança' : 'Reformed piety; family worship; sexuality in covenant', color: amber },
            { fn: 8,  name: 'Voddie Baucham Jr.', works: 'Family Driven Faith (2007); What He Must Be (2009)', desc: pt ? 'Pregação expositiva como aconselhamento; a família como unidade de discipulado' : 'Expository preaching as counseling; the family as the discipleship unit', color: pink },
            { fn: 9,  name: 'Brian Croft & Jim Savastio', works: 'The Pastor\'s Ministry (2015)', desc: pt ? 'Cuidado pastoral e aconselhamento como um único ofício' : 'Pastoral care and counseling as one office', color: green },
          ].map((a, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', padding: '14px 16px' }}>
              <div style={{ fontSize: labelSz, fontWeight: 900, color: a.color, marginBottom: 4 }}>
                {a.name}{fn(a.fn)}
              </div>
              <div style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.50)', marginBottom: 6, fontStyle: 'italic' }}>{a.works}</div>
              <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{a.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '12px 16px', borderLeft: `3px solid ${pink}` }}>
          <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
            {pt
              ? 'Conselheiro bíblico reformado = Palavra + oração + comunidade eclesial + responsabilidade pactual. Nunca apenas técnica, sempre Espírito e Palavra.'
              : 'Reformed biblical counselor = Word + prayer + ecclesial community + covenantal accountability. Never merely technique, always Spirit and Word.'}
          </p>
        </div>
      </div>

      {/* SECTION 6 — 4-Session Plan */}
      <div style={{ borderRadius: 16, background: greenL, border: `1.5px solid ${greenB}`, padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: green, marginBottom: 16 }}>
          🗓️ {pt ? 'Seção 6 — Plano de 4 Sessões baseado em Josué 1' : 'Section 6 — 4-Session Plan based on Joshua 1'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              n: '1', ref: 'Josué 1:1–2', color: amber,
              title: pt ? 'O Luto e o Chamado' : 'Grief and the Calling',
              desc: pt
                ? 'Mapeamento do "Moisés perdido": quem/o que morreu ou desapareceu. Identificação da paralisia. Âncora histórico-redentiva: Cristo é o Josué que veio onde a Lei (Moisés) não chegou — o "levanta-te" é convite do Evangelho, não exigência da Lei (Gl 3:24–25; Mt 11:28). Powlison[1], Adams[2].'
                : 'Mapping the "lost Moses": who/what died or disappeared. Identifying paralysis. Redemptive anchor: Christ is the Joshua who came where the Law (Moses) could not — "arise" is Gospel invitation, not Law demand (Gal 3:24–25; Matt 11:28). Powlison[1], Adams[2].',
            },
            {
              n: '2', ref: 'Josué 1:6–9', color: blue,
              title: pt ? 'O Medo e a Palavra' : 'Fear and the Word',
              desc: pt
                ? 'Identificação do medo dominante e do ídolo que o alimenta. Iniciando hagah conjugal/familiar por 7 dias. Âncora histórico-redentiva: Cristo enfrentou o maior medo no Getsêmani e na cruz — Sua ressurreição é a prova de que o Jordão do juízo foi atravessado (Rm 6:3–4; Hb 2:14–15). Welch[4], Powlison[5].'
                : 'Identifying dominant fear and the idol feeding it. Starting 7-day conjugal/family hagah. Redemptive anchor: Christ faced the greatest fear at Gethsemane and the cross — His resurrection proves the Jordan of judgment was crossed (Rom 6:3–4; Heb 2:14–15). Welch[4], Powlison[5].',
            },
            {
              n: '3', ref: 'Josué 1:8', color: purple,
              title: pt ? 'O Hagah na Prática' : 'Hagah in Practice',
              desc: pt
                ? 'Avaliação dos 7 dias de hagah: o que mudou, o que resistiu. A Palavra como remédio para a identidade. Âncora histórico-redentiva: o crente medita sobre a Palavra já cumprida — o Logos feito carne (Jo 1:14), a promessa do Espírito que interpreta a Palavra (Jo 16:13). Hagah no casamento = ruminar o Evangelho juntos. Beeke[7], Baucham[8].'
                : 'Evaluating 7 days of hagah: what changed, what resisted. The Word as identity remedy. Redemptive anchor: the believer meditates on the fulfilled Word — the incarnate Logos (John 1:14), the Spirit who interprets the Word (John 16:13). Hagah in marriage = ruminating the Gospel together. Beeke[7], Baucham[8].',
            },
            {
              n: '4', ref: 'Josué 1:12–18', color: pink,
              title: pt ? 'Solidariedade e Avanço' : 'Solidarity and Advance',
              desc: pt
                ? 'Mapeamento de quem na família ainda luta; plano de solidariedade pactual concreto. Âncora histórico-redentiva: Cristo, possuindo toda a herança do Pai, desceu para nos acompanhar em nossa pobreza (2Co 8:9) — o modelo definitivo de solidariedade. A família que avança unida antecipa a nova criação em que "ninguém sofrerá sozinho" (Ap 21:4). Tripp[10], Welch[12].'
                : 'Mapping who in the family still fights; concrete covenantal solidarity plan. Redemptive anchor: Christ, possessing all the Father\'s inheritance, descended to accompany us in our poverty (2 Cor 8:9) — the definitive model of solidarity. The family that advances together anticipates the new creation. Tripp[10], Welch[12].',
            },
          ].map((s) => (
            <div key={s.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: '#000' }}>{s.n}</div>
              <div>
                <div style={{ fontSize: titleSz, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 6 }}>{s.ref}</div>
                <div style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REFERENCIAS ABNT */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.10)', padding: '22px 24px', marginBottom: 8 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.50)', marginBottom: 16 }}>
          📎 {pt ? 'Referências Bibliográficas (ABNT)' : 'Bibliographic References (ABNT)'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {REFS.map((r) => (
            <div key={r.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, minWidth: 28, height: 22, borderRadius: 6, background: amberL, border: `1px solid ${amberB}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: smallSz, fontWeight: 900, color: amber }}>{r.n}</span>
              <p style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, margin: 0, fontFamily: 'monospace' }}>{r.abnt}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── Aconselhamento Bíblico Gênesis 1 ────────────────────────────────
function AconselhamentoBiblicoGenesis1FamiliaSection({ pt }: { pt: boolean }) {
  const green  = 'rgba(52,211,153,1)';
  const greenL = 'rgba(52,211,153,0.10)';
  const greenB = 'rgba(52,211,153,0.28)';
  const amber  = 'rgba(255,180,50,1)';
  const amberL = 'rgba(255,180,50,0.10)';
  const amberB = 'rgba(255,180,50,0.28)';
  const blue   = 'rgba(80,200,255,1)';
  const blueL  = 'rgba(80,200,255,0.10)';
  const blueB  = 'rgba(80,200,255,0.28)';
  const purple = 'rgba(180,120,255,1)';
  const purpleL= 'rgba(180,120,255,0.10)';
  const purpleB= 'rgba(180,120,255,0.28)';
  const pink   = 'rgba(255,120,160,1)';
  const pinkL  = 'rgba(255,120,160,0.10)';
  const pinkB  = 'rgba(255,120,160,0.28)';

  const titleSz = 'clamp(18px,2.8vw,22px)';
  const bodySz  = 'clamp(16px,2.4vw,19px)';
  const labelSz = 'clamp(14px,2vw,16px)';
  const smallSz = 'clamp(13px,1.7vw,15px)';

  const fn = (n: number) => (
    <sup style={{ fontSize: '0.70em', fontWeight: 900, color: amber, marginLeft: 2, verticalAlign: 'super', lineHeight: 0 }}>[{n}]</sup>
  );

  const sectionCard = (accent: string, accentL: string, accentB: string, emoji: string, heading: string, theme: string, children: React.ReactNode) => (
    <div style={{ borderRadius: 16, background: accentL, border: `1.5px solid ${accentB}`, padding: '22px 24px', marginBottom: 20 }}>
      <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: accent, marginBottom: 8 }}>
        {emoji} {heading}
      </div>
      <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.55)', marginBottom: 14, fontStyle: 'italic' }}>{theme}</div>
      {children}
    </div>
  );

  const quoteBox = (text: string, author: string, accent: string, fnNum: number) => (
    <div style={{ background: 'rgba(0,0,0,0.25)', borderLeft: `3px solid ${accent}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', marginBottom: 12 }}>
      <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, margin: '0 0 6px 0', fontStyle: 'italic' }}>"{text}"</p>
      <div style={{ fontSize: labelSz, color: accent, fontWeight: 700 }}>— {author}{fn(fnNum)}</div>
    </div>
  );

  const questionsBox = (questions: string[], accent: string) => (
    <div style={{ background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '14px 18px', marginTop: 14 }}>
      <div style={{ fontSize: labelSz, fontWeight: 900, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
        {pt ? 'Perguntas para o Conselheiro' : 'Counselor Questions'}
      </div>
      <ol style={{ margin: 0, paddingLeft: 20 }}>
        {questions.map((q, i) => (
          <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 8 }}>{q}</li>
        ))}
      </ol>
    </div>
  );

  const REFS = [
    { n: 1,  abnt: 'POWLISON, David. Seeing with New Eyes: Counseling and the Human Condition through the Lens of Scripture. Phillipsburg: Presbyterian and Reformed, 2003.' },
    { n: 2,  abnt: 'ADAMS, Jay E. Competent to Counsel: Introduction to Nouthetic Counseling. Grand Rapids: Zondervan, 1970.' },
    { n: 3,  abnt: 'TRIPP, Paul David. Instruments in the Redeemer\'s Hands: People in Need of Change Helping People in Need of Change. Phillipsburg: Presbyterian and Reformed, 2002.' },
    { n: 4,  abnt: 'WELCH, Edward T. Running Scared: Fear, Worry, and the God of Rest. Greensboro: New Growth Press, 2007.' },
    { n: 5,  abnt: 'POWLISON, David. Speaking Truth in Love: Counsel in Community. Greensboro: New Growth Press, 2005.' },
    { n: 6,  abnt: 'ADAMS, Jay E. A Theology of Christian Counseling: More Than Redemption. Grand Rapids: Zondervan, 1979.' },
    { n: 7,  abnt: 'BEEKE, Joel R. Family Worship. Grand Rapids: Reformation Heritage Books, 2009.' },
    { n: 8,  abnt: 'BAUCHAM, Voddie, Jr. Family Driven Faith: Doing What It Takes to Raise Sons and Daughters Who Walk with God. Wheaton: Crossway, 2007.' },
    { n: 9,  abnt: 'CROFT, Brian; SAVASTIO, Jim. The Pastor\'s Ministry: Biblical Priorities for Faithful Shepherds. Grand Rapids: Zondervan, 2015.' },
    { n: 10, abnt: 'TRIPP, Paul David. What Did You Expect? Redeeming the Realities of Marriage. Wheaton: Crossway, 2010.' },
    { n: 11, abnt: 'BEEKE, Joel R.; JONES, Mark. A Puritan Theology: Doctrine for Life. Grand Rapids: Reformation Heritage Books, 2012.' },
    { n: 12, abnt: 'WELCH, Edward T. Side by Side: Walking with Others in Wisdom and Love. Wheaton: Crossway, 2015.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* HERO */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(52,211,153,0.15),rgba(80,200,255,0.10))', border: `1.5px solid ${greenB}`, padding: '28px 28px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(28px,4vw,38px)', marginBottom: 10 }}>🌱✨</div>
        <div style={{ fontSize: 'clamp(20px,3.2vw,26px)', fontWeight: 900, color: green, marginBottom: 8, lineHeight: 1.3 }}>
          {pt ? 'Aconselhamento Bíblico · Gênesis 1:1–2:4a' : 'Biblical Counseling · Genesis 1:1–2:4a'}
        </div>
        <div style={{ fontSize: titleSz, fontWeight: 700, color: amber, marginBottom: 14 }}>
          {pt ? 'Recursos para o Conselheiro de Casais e Famílias' : 'Resources for the Couples and Family Counselor'}
        </div>
        <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Este guia oferece estrutura clínico-pastoral para conselheiros bíblicos que trabalham com casais e famílias, a partir dos temas centrais de Gênesis 1. As citações dos autores são identificadas por notas de rodapé numeradas; as referências ABNT completas constam ao final.'
            : 'This guide offers a clinical-pastoral framework for biblical counselors working with couples and families, drawn from the central themes of Genesis 1. Author citations are identified by numbered footnotes; full ABNT references appear at the end.'}
        </p>
      </div>

      {/* TRIAGE */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.12)', padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>
          🎯 {pt ? 'Problemas que esta Perícope Endereça — Guia de Triagem para o Conselheiro' : 'Problems this Pericope Addresses — Counselor Triage Guide'}
        </div>
        <p style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.50)', lineHeight: 1.65, margin: '0 0 16px 0', fontStyle: 'italic' }}>
          {pt
            ? 'Gênesis 1:1–2:4a é a perícope da criação ordenada: Deus ordena o caos, delega o mandato à família como imagem Sua e consagra o descanso como telos da semana. O conselheiro pode utilizá-la sempre que o aconselhando enfrenta qualquer um dos cenários abaixo:'
            : 'Genesis 1:1–2:4a is the pericope of ordered creation: God orders chaos, delegates the mandate to the family as His image, and consecrates rest as the telos of the week. The counselor may use it whenever the counselee faces any of the scenarios below:'}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 10 }}>
          {[
            { icon: '🪞', cor: green,  titulo: pt ? 'Identidade Ferida — Imago Dei Distorcida'  : 'Wounded Identity — Distorted Imago Dei',
              desc: pt ? 'Pessoas que não se sentem amadas por Deus, que se autodesvalorizam, que acreditam ser um acidente ou um fardo. Gn 1:26–27 é o texto diagnóstico: a identidade humana é concedida pelo Criador, não conquistada pelo desempenho.' : 'People who do not feel loved by God, who self-devalue, who believe they are an accident or a burden. Gen 1:26–27 is the diagnostic text: human identity is granted by the Creator, not earned by performance.' },
            { icon: '🎯', cor: amber,  titulo: pt ? 'Propósito Perdido — Casal sem Visão'       : 'Lost Purpose — Couple without Vision',
              desc: pt ? 'Casais que vivem lado a lado sem projeto comum, sem mandato cultural compartilhado. Gn 1:28 dá ao casal como unidade — não ao indivíduo — o mandato de governar, multiplicar e guardar. A ausência de missão conjunta é diagnóstico de atomização pactual.' : 'Couples who live side by side without a common project or shared cultural mandate. Gen 1:28 gives the mandate to the couple as a unit — not the individual — to rule, multiply and keep. Absence of joint mission diagnoses covenantal atomization.' },
            { icon: '🌀', cor: blue,   titulo: pt ? 'Caos Doméstico — Família sem Estrutura'   : 'Domestic Chaos — Family without Structure',
              desc: pt ? 'Famílias sem rotina, sem ritmo, sem autoridade clara, onde cada membro age por conta própria. O Criador ordenou o caos em seis dias com estrutura, separação e propósito. Ordem no lar é ato de obediência criacional, não perfeccionismo.' : 'Families without routine, rhythm or clear authority, where each member acts independently. The Creator ordered chaos in six days with structure, separation and purpose. Order at home is an act of creational obedience, not perfectionism.' },
            { icon: '😴', cor: purple, titulo: pt ? 'Esgotamento e Burnout Familiar'            : 'Family Exhaustion and Burnout',
              desc: pt ? 'Famílias que nunca descansam: pais sobrecarregados, casais que só trabalham, filhos sem espaço para brincar e contemplar. Gn 2:2–3 diagnostica que o descanso é o telos — finalidade — da semana, não seu apêndice culposo. O Sábado é remédio criacional para o burnout.' : 'Families that never rest: overburdened parents, couples who only work, children with no space to play and contemplate. Gen 2:2–3 diagnoses rest as the telos — purpose — of the week, not its guilty appendage. The Sabbath is the creational remedy for burnout.' },
            { icon: '👶', cor: pink,   titulo: pt ? 'Identidade dos Filhos Construída pelo Mundo' : 'Children\'s Identity Built by the World',
              desc: pt ? 'Filhos que buscam identidade em desempenho escolar, redes sociais, grupos de pares ou conquistas esportivas. Pais que não ensinaram explicitamente que cada filho é portador da imagem de Deus. A imago Dei é a fundação que a cultura nunca pode dar.' : 'Children who seek identity in academic performance, social media, peer groups or sports achievements. Parents who never explicitly taught that each child bears the image of God. The imago Dei is the foundation that culture can never provide.' },
            { icon: '🏛️', cor: amber,  titulo: pt ? 'Ausência do Dia do Senhor no Lar'         : 'Absence of the Lord\'s Day at Home',
              desc: pt ? 'Família sem ritmo de adoração semanal: domingos consumidos por esportes, trabalho, telas. Gn 2:3 é o primeiro ato de santificação na Bíblia — Deus consagrou o tempo antes de consagrar qualquer espaço ou objeto. A família que não guarda o Dia do Senhor perdeu sua âncora de identidade pactual.' : 'Family without a weekly worship rhythm: Sundays consumed by sports, work, screens. Gen 2:3 is the first act of sanctification in the Bible — God consecrated time before any space or object. The family that does not keep the Lord\'s Day has lost its covenantal identity anchor.' },
          ].map((p2, i) => (
            <div key={i} style={{ background: `${p2.cor}0D`, border: `1px solid ${p2.cor}33`, borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: labelSz, fontWeight: 900, color: p2.cor, marginBottom: 6 }}>{p2.icon} {p2.titulo}</div>
              <div style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.78)', lineHeight: 1.65 }}>{p2.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18, borderRadius: 12, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '16px 20px' }}>
          <div style={{ fontSize: labelSz, fontWeight: 900, color: amber, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>
            ✝️ {pt ? 'Enquadramento Histórico-Redentivo para o Conselheiro' : 'Redemptive-Historical Frame for the Counselor'}
          </div>
          <p style={{ fontSize: bodySz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.80, margin: 0 }}>
            {pt
              ? 'O Criador de Gênesis 1 é o mesmo que em Cristo recria todas as coisas (Ap 21:1–5). O Logos que disse "haja luz" (Gn 1:3) é o mesmo que "veio ao mundo como a luz verdadeira" (Jo 1:9). Adão e Eva receberam o mandato de governar e multiplicar — e falharam. Cristo, o novo Adão (Rm 5:14–19), cumpriu perfeitamente o mandato cultural: governou com serviço (Fp 2:7–8), multiplicou herdeiros do Reino (Jo 17:6), guardou a criação ao carregar na cruz o juízo que a destruiria (Rm 8:21). O sétimo dia santificado (Gn 2:3) aponta para o repouso definitivo que só Cristo oferece: "Vinde a mim... e eu vos darei descanso" (Mt 11:28). Cada família que guarda o Dia do Senhor está ensaiando antecipadamente a nova criação. O conselheiro que apresenta apenas as demandas de Gênesis 1 ("tenha estrutura", "descanse", "assuma o mandato") sem o cumprimento em Cristo prega lei sem evangelho — e isso não produz mudança duradoura.'
              : 'The Creator of Genesis 1 is the same who in Christ recreates all things (Rev 21:1–5). The Logos who said "let there be light" (Gen 1:3) is the same who "came into the world as the true light" (John 1:9). Adam and Eve received the mandate to rule and multiply — and failed. Christ, the new Adam (Rom 5:14–19), perfectly fulfilled the cultural mandate: ruled through service (Phil 2:7–8), multiplied Kingdom heirs (John 17:6), kept creation by bearing on the cross the judgment that would destroy it (Rom 8:21). The sanctified seventh day (Gen 2:3) points to the definitive rest only Christ offers: "Come to me... and I will give you rest" (Matt 11:28).'}
          </p>
        </div>
      </div>

      {/* SEÇÃO 1 — Ordem e Estrutura */}
      {sectionCard(green, greenL, greenB, '🌀',
        pt ? 'Seção 1 — A Ordem que Precede a Vida: Estrutura e Caos Doméstico' : 'Section 1 — The Order that Precedes Life: Structure and Domestic Chaos',
        pt ? 'Gênesis 1:1–13 — Deus ordena o caos; dias 1–3: domínios formados antes de serem habitados' : 'Genesis 1:1–13 — God orders chaos; days 1–3: domains formed before being inhabited',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'O bara de Gn 1:1 — criar do nada — revela que somente Deus pode ordenar o caos original. O conselheiro aplica: a família que tenta ordenar seu caos doméstico pelos próprios recursos está tentando fazer bara sem ser Deus — falhará cronicamente.' : 'The bara of Gen 1:1 — create from nothing — reveals that only God can order original chaos. The counselor applies: the family that tries to order its domestic chaos by its own resources is attempting bara without being God — it will chronically fail.',
              pt ? 'Dias 1–3 formam domínios; dias 4–6 os preenchem. Ordem precede vida — a estrutura do lar não é burocracia religiosa, é condição para que a vida floresça. Famílias sem rotina nem ritmo produzem ansiedade, não liberdade.' : 'Days 1–3 form domains; days 4–6 fill them. Order precedes life — the structure of the home is not religious bureaucracy, it is the condition for life to flourish. Families without routine or rhythm produce anxiety, not freedom.',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'O caos doméstico não é apenas desorganização — é sintoma de que alguém no lar está recusando a autoridade de Deus sobre o tempo e o espaço. O conselheiro não pergunta apenas "por que está bagunçado?" — pergunta "quem está no centro do lar e quem deveria estar?"'
               : 'Domestic chaos is not merely disorganization — it is a symptom that someone in the home is refusing God\'s authority over time and space. The counselor does not only ask "why is it chaotic?" — but "who is at the center of the home and who should be?"',
            'David Powlison', green, 1)}
          {quoteBox(
            pt ? 'A estrutura que o conselheiro ajuda a família a construir não é rotina por rotina — é o reconhecimento prático de que Deus é o Criador e a família é a criatura. Ordem no lar é confissão teológica de que não somos o centro do universo.'
               : 'The structure the counselor helps the family build is not routine for routine\'s sake — it is the practical recognition that God is the Creator and the family is the creature. Order at home is a theological confession that we are not the center of the universe.',
            'Jay E. Adams', amber, 2)}
          {quoteBox(
            pt ? 'Toda família tem um "espírito dominante" — algo que governa as prioridades, o tempo, a energia. Quando esse espírito dominante é o trabalho, as telas, os filhos ou o próprio cônjuge, o caos que se instala é consequência natural. O Criador pede que Ele mesmo seja o espírito organizador do lar.'
               : 'Every family has a "ruling spirit" — something that governs priorities, time, energy. When that ruling spirit is work, screens, children or the spouse themselves, the chaos that sets in is a natural consequence. The Creator asks to be the organizing spirit of the home himself.',
            'Paul David Tripp', blue, 3)}
          <div style={{ background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: amber, marginBottom: 6 }}>✝️ {pt ? 'Perspectiva Histórico-Redentiva' : 'Redemptive-Historical Perspective'}</div>
            <p style={{ fontSize: smallSz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
              {pt
                ? 'O Logos que ordenou o caos em Gênesis 1 ("todas as coisas foram feitas por meio dEle" — Jo 1:3) é o mesmo que na cruz reordenou o cosmos caído: reconciliou "todas as coisas consigo mesmo, fazendo paz pelo sangue da cruz" (Cl 1:20). A família que conclama Cristo ao centro do lar não está apenas adotando uma espiritualidade — está alinhando sua ordem doméstica ao vetor cosmológico da nova criação (2Co 5:17). O conselheiro que ajuda o casal a colocar Cristo no centro está participando do ato criacional de ordenar o caos — não pela força da vontade, mas pela presença dAquele que é o próprio Logos organizador do universo.'
                : 'The Logos who ordered chaos in Genesis 1 ("all things were made through him" — John 1:3) is the same who on the cross reordered the fallen cosmos: reconciling "all things to himself, making peace by the blood of his cross" (Col 1:20). The family that calls Christ to the center of the home is not merely adopting a spirituality — it is aligning its domestic order to the cosmological vector of the new creation (2 Cor 5:17).'}
            </p>
          </div>
          {questionsBox([
            pt ? '"Quem ou o que está no centro do ritmo da sua família — o que governa os horários, as prioridades e a energia do lar? Como isso difere de ter Deus no centro?"'
               : '"Who or what is at the center of your family\'s rhythm — what governs the schedules, priorities and energy of the home? How does this differ from having God at the center?"',
            pt ? '"Em que área do lar vocês vivem no caos, sabendo que deveriam haver ordem? O que está impedindo de estabelecer essa estrutura?"'
               : '"In what area of the home do you live in chaos, knowing there should be order? What is preventing you from establishing that structure?"',
            pt ? '"Se o Criador colocou ordem antes de vida — o que precisa ser ordenado primeiro no lar de vocês para que a vida familiar floresça?"'
               : '"If the Creator placed order before life — what needs to be ordered first in your home for family life to flourish?"',
          ], green)}
        </>
      )}

      {/* SEÇÃO 2 — Imago Dei */}
      {sectionCard(amber, amberL, amberB, '🪞',
        pt ? 'Seção 2 — Imago Dei: Identidade do Casal e dos Filhos' : 'Section 2 — Imago Dei: Identity of the Couple and Children',
        pt ? 'Gênesis 1:26–28 — "façamos o homem à nossa imagem"; o casal como unidade portadora da imagem de Deus' : 'Genesis 1:26–28 — "let us make man in our image"; the couple as a unit bearing the image of God',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'Tselem (imagem) e demut (semelhança) estabelecem a identidade humana como concedida por Deus, não conquistada pelo desempenho. A crise de identidade moderna — individual, conjugal e parental — tem raiz aqui: quando a imago Dei é negada ou esquecida, a identidade migra para realizações, aparência ou aprovação humana.' : 'Tselem (image) and demut (likeness) establish human identity as God-granted, not performance-earned. The modern identity crisis — individual, conjugal and parental — is rooted here: when the imago Dei is denied or forgotten, identity migrates to achievements, appearance or human approval.',
              pt ? 'Crucialmente, a imagem é dada ao casal como unidade: "macho e fêmea os criou" (1:27), "dominai" (1:28 — plural). O conselheiro trabalha com essa realidade: o casal separado perde a plenitude da imagem que exerce junto. A crise conjugal é sempre uma crise de imagem.' : 'Crucially, the image is given to the couple as a unit: "male and female he created them" (1:27), "rule" (1:28 — plural). The counselor works with this reality: the separated couple loses the fullness of the image it exercises together. Marital crisis is always an image crisis.',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'O medo de não ser suficiente — no casamento, na paternidade, no trabalho — é sempre uma crise de imago Dei. Quem perdeu de vista que é portador da imagem do Rei procura compensação em todo o lugar errado. O conselheiro não trata sintomas: trata a visão de Deus que o aconselhando tem.'
               : 'The fear of not being enough — in marriage, parenting, work — is always an imago Dei crisis. Whoever has lost sight of bearing the King\'s image seeks compensation everywhere wrong. The counselor does not treat symptoms: they treat the counselee\'s vision of God.',
            'Edward T. Welch', amber, 4)}
          {quoteBox(
            pt ? 'Toda criança nasce portadora da imagem de Deus — distorcida pelo pecado, mas real. Pai cristão, você tem em casa portadores da imagem do Rei. A maior negligência parental não é a falta de educação formal — é não ensinar ao filho quem ele é diante do Criador.'
               : 'Every child is born bearing the image of God — distorted by sin, but real. Christian father, you have at home bearers of the King\'s image. The greatest parental negligence is not lack of formal education — it is failing to teach children who they are before the Creator.',
            'Joel R. Beeke', green, 7)}
          {quoteBox(
            pt ? 'O mandato cultural (Gn 1:28) é dado ao casal como unidade missional. Quando o casal perde o projeto comum — "para que existimos juntos?" — o casamento se reduz a coabitação funcional. O conselheiro resgata a visão missionária: vocês dois são portadores da imagem de Deus enviados juntos ao mundo.'
               : 'The cultural mandate (Gen 1:28) is given to the couple as a missional unit. When the couple loses the common project — "why do we exist together?" — marriage is reduced to functional cohabitation. The counselor restores the missional vision: you two bear the image of God, sent together into the world.',
            'Paul David Tripp', blue, 3)}
          <div style={{ background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: amber, marginBottom: 6 }}>✝️ {pt ? 'Perspectiva Histórico-Redentiva' : 'Redemptive-Historical Perspective'}</div>
            <p style={{ fontSize: smallSz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
              {pt
                ? 'A imagem de Deus foi distorcida pela queda (Rm 3:23) mas não destruída — e em Cristo é restaurada e aperfeiçoada. Colossenses 1:15 declara que Cristo é "a imagem do Deus invisível" — o cumprimento perfeito do tselem que Adão deveria ter sido. A salvação é processo de conformação a essa imagem: "para que fôssemos conformados à imagem do Seu Filho" (Rm 8:29). O conselheiro que ajuda o aconselhando a ver sua identidade em Cristo não está dando autoajuda — está apontando para a restauração cosmológica da imago Dei que a morte e ressurreição de Cristo inauguraram (2Co 3:18; Cl 3:10).'
                : 'The image of God was distorted by the fall (Rom 3:23) but not destroyed — and in Christ it is restored and perfected. Colossians 1:15 declares Christ is "the image of the invisible God" — the perfect fulfillment of the tselem Adam should have been. Salvation is the process of conforming to that image: "to be conformed to the image of his Son" (Rom 8:29). The counselor who helps the counselee see their identity in Christ is not giving self-help — they are pointing to the cosmological restoration of the imago Dei inaugurated by Christ\'s death and resurrection (2 Cor 3:18; Col 3:10).'}
            </p>
          </div>
          {questionsBox([
            pt ? '"Como você definiria quem você é — sem mencionar o que faz, o que tem ou o que os outros pensam de você? De onde vem sua identidade na prática?"'
               : '"How would you define who you are — without mentioning what you do, what you have, or what others think of you? Where does your identity come from in practice?"',
            pt ? '"Você já ensinou explicitamente para seus filhos que eles são portadores da imagem de Deus? O que você quer que eles acreditem sobre si mesmos quando tiverem 25 anos?"'
               : '"Have you ever explicitly taught your children that they bear the image of God? What do you want them to believe about themselves when they are 25?"',
            pt ? '"Como casal, qual é o projeto comum que justifica a existência de vocês juntos? Se não há um projeto compartilhado, o que está no lugar dele?"'
               : '"As a couple, what is the common project that justifies your existence together? If there is no shared project, what is in its place?"',
          ], amber)}
        </>
      )}

      {/* SEÇÃO 3 — Sábado (Centro) */}
      {sectionCard(blue, blueL, blueB, '😴',
        pt ? 'Seção 3 — O Sábado como Telos da Família — Centro ◉' : 'Section 3 — The Sabbath as Family Telos — Center ◉',
        pt ? 'Gênesis 2:1–3 — "Deus descansou... abençoou e santificou o sétimo dia"; primeiro ato de santificação na Bíblia' : 'Genesis 2:1–3 — "God rested... blessed and sanctified the seventh day"; first act of sanctification in the Bible',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'Qadash (santificar) é aplicado pela primeira vez ao tempo, não ao espaço ou objeto. Deus consagrou um dia antes de consagrar qualquer templo, altar ou pessoa. Para o conselheiro, isso significa: o ritmo semanal de adoração precede qualquer outra prática espiritual na família — ele é a moldura dentro da qual todas as outras práticas fazem sentido.' : 'Qadash (to sanctify) is applied for the first time to time, not space or object. God consecrated a day before consecrating any temple, altar or person. For the counselor, this means: the weekly rhythm of worship precedes any other spiritual practice in the family — it is the frame within which all other practices make sense.',
              pt ? 'O descanso de Deus (2:2) não é exaustão — é satisfação soberana: "viu que era muito bom" (1:31) e descansou na perfeição da obra. Para famílias em burnout, o diagnóstico é que estão tentando completar o que só Cristo pode consumar: "Está consumado" (Jo 19:30) é a declaração sabática definitiva.' : 'God\'s rest (2:2) is not exhaustion — it is sovereign satisfaction: "he saw that it was very good" (1:31) and rested in the perfection of the work. For families in burnout, the diagnosis is that they are trying to complete what only Christ can consummate: "It is finished" (John 19:30) is the definitive sabbatic declaration.',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'A família que não guarda o Dia do Senhor está dizendo com seu calendário: "temos mais a fazer do que Deus terminou." É uma confissão implícita de que a obra de Cristo não é suficiente. O descanso sabático é o sacramento semanal que proclama: Cristo consumou, e nós descansamos nessa consumação.'
               : 'The family that does not keep the Lord\'s Day is saying with their calendar: "we have more to do than God finished." It is an implicit confession that Christ\'s work is not enough. The Sabbath rest is the weekly sacrament that proclaims: Christ has accomplished, and we rest in that accomplishment.',
            'Joel R. Beeke', blue, 11)}
          {quoteBox(
            pt ? 'O burnout familiar não é problema de agenda — é problema de evangelha. A família exausta acredita, na prática, que o universo depende de seu trabalho para existir. O remédio não é gerenciamento de tempo: é fé de que Deus sustenta o mundo enquanto você dorme.'
               : 'Family burnout is not a scheduling problem — it is a Gospel problem. The exhausted family believes, in practice, that the universe depends on their work to exist. The remedy is not time management: it is faith that God sustains the world while you sleep.',
            'David Powlison', green, 5)}
          {quoteBox(
            pt ? 'O Dia do Senhor é a âncora semanal da identidade pactual da família. Quando os filhos crescem guardando o Dia do Senhor com alegria e adoração, eles aprendem na carne que Deus é mais importante do que esporte, tela ou lazer. Esse aprendizado vale décadas de instrução verbal.'
               : 'The Lord\'s Day is the weekly anchor of the family\'s covenantal identity. When children grow up keeping the Lord\'s Day with joy and worship, they learn in their bones that God is more important than sports, screens or leisure. That learning is worth decades of verbal instruction.',
            'Voddie Baucham Jr.', amber, 8)}
          <div style={{ background: 'rgba(80,200,255,0.10)', border: '1px solid rgba(80,200,255,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: blue, marginBottom: 6 }}>{pt ? 'Prática Clínica Pastoral' : 'Clinical Pastoral Practice'}</div>
            <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.7, margin: 0 }}>
              {pt
                ? 'O conselheiro pode pedir ao casal para guardar, por 4 semanas, um Dia do Senhor completo — culto, descanso, refeição em família sem telas — e relatar o efeito na próxima sessão. A experiência é, ela mesma, terapêutica.'
                : 'The counselor can ask the couple to keep, for 4 weeks, a complete Lord\'s Day — worship, rest, family meal without screens — and report the effect at the next session. The experience itself is therapeutic.'}
            </p>
          </div>
          <div style={{ background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: amber, marginBottom: 6 }}>✝️ {pt ? 'Perspectiva Histórico-Redentiva' : 'Redemptive-Historical Perspective'}</div>
            <p style={{ fontSize: smallSz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
              {pt
                ? 'O sétimo dia de Gênesis 2 não tem fórmula de encerramento ("e houve tarde e manhã") — permanece aberto, apontando para um descanso ainda por vir. Hebreus 4:9–11 confirma: "resta ainda um sábado para o povo de Deus." Cristo cumpriu o sábado definitivamente: "Vinde a mim... e eu vos darei descanso" (Mt 11:28–29) não é convite para eficiência — é convite para o repouso da nova criação inaugurado pela ressurreição no primeiro dia da semana. A família que guarda o Dia do Senhor não está apenas seguindo uma lei — está habitando antecipadamente o descanso eterno que Cristo garantiu (Hb 4:10).'
                : 'The seventh day of Genesis 2 has no closing formula ("there was evening and there was morning") — it remains open, pointing to a rest yet to come. Hebrews 4:9–11 confirms: "there remains a Sabbath rest for the people of God." Christ fulfilled the Sabbath definitively: "Come to me... and I will give you rest" (Matt 11:28–29) is not an invitation to efficiency — it is an invitation to the new creation rest inaugurated by the resurrection on the first day of the week. The family keeping the Lord\'s Day is not merely following a law — it is proactively inhabiting the eternal rest Christ secured (Heb 4:10).'}
            </p>
          </div>
          {questionsBox([
            pt ? '"Como vocês têm guardado o Dia do Senhor? Há esportes, trabalho ou telas que roubam o centro do domingo? O que seria necessário mudar para que o descanso sabático fosse real?"'
               : '"How have you been keeping the Lord\'s Day? Are there sports, work or screens stealing the center of Sunday? What would need to change for the Sabbath rest to be real?"',
            pt ? '"Quando foi a última vez que você sentiu, de verdade, que a obra de Deus é suficiente e você pode parar? O que impede esse repouso?"'
               : '"When was the last time you truly felt that God\'s work is sufficient and you can stop? What prevents that rest?"',
            pt ? '"Se guardar o Dia do Senhor é ensaio antecipado da nova criação, que tipo de família você quer que seus filhos se lembrem de ter crescido — uma que corria aos domingos ou uma que descansava em Deus?"'
               : '"If keeping the Lord\'s Day is anticipatory rehearsal of the new creation, what kind of family do you want your children to remember growing up in — one that rushed on Sundays or one that rested in God?"',
          ], blue)}
        </>
      )}

      {/* SEÇÃO 4 — Mandato Cultural */}
      {sectionCard(purple, purpleL, purpleB, '🎯',
        pt ? 'Seção 4 — O Mandato Cultural: A Família como Vice-Regente de Deus' : 'Section 4 — The Cultural Mandate: The Family as God\'s Vice-Regent',
        pt ? 'Gênesis 1:28 — "dominai, multiplicai, enchei"; mandato dado ao casal como unidade de governo delegado' : 'Genesis 1:28 — "rule, multiply, fill"; mandate given to the couple as a unit of delegated governance',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'O mandato cultural é dado ao casal junto ("dominai" — plural). O casamento não é apenas uma aliança de afeto: é uma parceria missionária para governar, multiplicar e guardar o que Deus criou. Casais sem projeto comum estão exercendo o mandato cultural em paralelo, não em unidade.' : 'The cultural mandate is given to the couple together ("rule" — plural). Marriage is not merely an affective covenant: it is a missionary partnership to govern, multiply and keep what God created. Couples without a common project are exercising the cultural mandate in parallel, not unity.',
              pt ? '"Enchei a terra" — multiplicar não é apenas biológico: inclui multiplicar a imagem de Deus no mundo através de filhos formados, de influência cultural, de hospitabilidade, de discipulado. A família que vive fechada em si mesma está recusando parte do mandato.' : '"Fill the earth" — multiply is not only biological: it includes multiplying the image of God in the world through formed children, cultural influence, hospitality, discipleship. The family that lives closed in on itself is refusing part of the mandate.',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'A família cristã não existe para si mesma — existe como unidade missionária de Deus no mundo. O mandato cultural não foi revogado pela queda: foi redirecionado pela redenção. Em Cristo, o casal retoma o mandato com novos recursos e nova direção: fazer discípulos é multiplicar a imagem de Deus (Mt 28:19–20).'
               : 'The Christian family does not exist for itself — it exists as God\'s missionary unit in the world. The cultural mandate was not revoked by the fall: it was redirected by redemption. In Christ, the couple retakes the mandate with new resources and new direction: making disciples is multiplying the image of God (Matt 28:19–20).',
            'Voddie Baucham Jr.', purple, 8)}
          {quoteBox(
            pt ? 'Casamento sem projeto conjunto é como dois vice-reis administrando o mesmo território sem comunicação. O conselheiro pergunta: "Qual é o mandato de vocês como casal — o que Deus os chamou a fazer juntos que nenhum dos dois poderia fazer sozinho?"'
               : 'Marriage without a joint project is like two vice-regents administering the same territory without communication. The counselor asks: "What is your mandate as a couple — what has God called you to do together that neither could do alone?"',
            'Paul David Tripp', blue, 10)}
          {quoteBox(
            pt ? 'Abraham Kuyper dizia que não há palmo de terra sobre o qual Cristo não reclame soberania. O pai cristão que discipula seus filhos com isso em mente está formando vice-regentes — não apenas cidadãos produtivos, mas herdeiros do Rei que vieram para administrar o que o Rei criou.'
               : 'Abraham Kuyper said there is not a square inch over which Christ does not cry sovereignty. The Christian father who disciples his children with this in mind is forming vice-regents — not merely productive citizens, but heirs of the King who came to steward what the King created.',
            'Joel R. Beeke', amber, 11)}
          <div style={{ background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: amber, marginBottom: 6 }}>✝️ {pt ? 'Perspectiva Histórico-Redentiva' : 'Redemptive-Historical Perspective'}</div>
            <p style={{ fontSize: smallSz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
              {pt
                ? 'Adão e Eva falharam no mandato cultural: em vez de guardar o jardim, permitiram a entrada do inimigo (Gn 3:1–6). Cristo, o novo Adão (Rm 5:14–19), cumpriu o mandato que Adão não cumpriu: "toda autoridade me foi dada no céu e na terra" (Mt 28:18) — Ele reinou, multiplicou herdeiros (Jo 17:6) e guardou a nova criação ao carregar na cruz o juízo que destruiria tudo. O Grande Comissionamento (Mt 28:19–20) é o mandato cultural redimido: a família que discipula está exercendo o domínio de Gênesis 1:28 na força da autoridade de Cristo ressurreto, não na força própria. O conselheiro que apresenta o mandato cultural sem Cristo prega obra sem graça — e isso não transforma casamentos nem famílias.'
                : 'Adam and Eve failed the cultural mandate: instead of keeping the garden, they allowed the enemy\'s entrance (Gen 3:1–6). Christ, the new Adam (Rom 5:14–19), fulfilled the mandate Adam did not: "all authority in heaven and on earth has been given to me" (Matt 28:18) — He ruled, multiplied heirs (John 17:6), and kept the new creation by bearing on the cross the judgment that would destroy everything. The Great Commission (Matt 28:19–20) is the redeemed cultural mandate: the family that disciples is exercising the dominion of Genesis 1:28 in the strength of the risen Christ\'s authority, not their own.'}
            </p>
          </div>
          {questionsBox([
            pt ? '"Como casal, qual é o projeto missionário que justifica a existência de vocês juntos no mundo? Além de se amarem, para que Deus os uniu?"'
               : '"As a couple, what is the missional project that justifies your joint existence in the world? Beyond loving each other, why did God unite you?"',
            pt ? '"Seus filhos estão sendo formados para serem portadores da imagem de Deus no mundo — vice-regentes — ou apenas para serem bem-sucedidos pelos padrões da cultura? O que diferencia as duas formações?"'
               : '"Are your children being formed to be bearers of God\'s image in the world — vice-regents — or merely to be successful by culture\'s standards? What distinguishes the two formations?"',
            pt ? '"Em qual área da vida vocês têm exercido o mandato cultural juntos — escola, vizinhança, trabalho, igreja? Em qual área vocês estão fechados em si mesmos quando deveriam estar multiplicando a imagem de Deus?"'
               : '"In what area of life have you been exercising the cultural mandate together — school, neighborhood, work, church? In what area are you closed in on yourselves when you should be multiplying the image of God?"',
          ], purple)}
        </>
      )}

      {/* SEÇÃO 5 — Autores */}
      <div style={{ borderRadius: 16, background: pinkL, border: `1.5px solid ${pinkB}`, padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: pink, marginBottom: 16 }}>
          📚 {pt ? 'Seção 5 — Autores e Obras de Referência' : 'Section 5 — Reference Authors and Works'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 12, marginBottom: 16 }}>
          {[
            { fn: 2,  name: 'Jay E. Adams',           works: 'Competent to Counsel (1970); A Theology of Christian Counseling (1979)', desc: pt ? 'Aconselhamento noutético; ordem no lar como obediência à Palavra; confrontação direta' : 'Nouthetic counseling; order at home as obedience to the Word; direct confrontation', color: amber },
            { fn: 1,  name: 'David Powlison',         works: 'Seeing with New Eyes (2003); Speaking Truth in Love (2005)', desc: pt ? 'Diagnóstico do coração; ídolos de controle; burnout como problema evangélico' : 'Heart diagnosis; idols of control; burnout as a Gospel problem', color: green },
            { fn: 3,  name: 'Paul David Tripp',       works: 'Instruments in the Redeemer\'s Hands (2002); What Did You Expect? (2010)', desc: pt ? 'Mandato cultural do casal; identidade construída em Cristo; agentes de mudança' : 'Couple\'s cultural mandate; identity built in Christ; change agents', color: blue },
            { fn: 4,  name: 'Edward T. Welch',        works: 'Running Scared (2007); Side by Side (2015)', desc: pt ? 'Imago Dei e identidade ferida; medo como adoração misdirecionada' : 'Imago Dei and wounded identity; fear as misdirected worship', color: purple },
            { fn: 7,  name: 'Joel R. Beeke',          works: 'Family Worship (2009); A Puritan Theology (2012)', desc: pt ? 'Culto doméstico; Dia do Senhor; transmissão geracional da imago Dei' : 'Family worship; Lord\'s Day; generational transmission of the imago Dei', color: amber },
            { fn: 8,  name: 'Voddie Baucham Jr.',     works: 'Family Driven Faith (2007)', desc: pt ? 'Mandato cultural; família como unidade missionária; formação de vice-regentes' : 'Cultural mandate; family as missional unit; formation of vice-regents', color: pink },
            { fn: 9,  name: 'Brian Croft & Jim Savastio', works: 'The Pastor\'s Ministry (2015)', desc: pt ? 'Supervisão pastoral do culto familiar; cuidado das famílias em burnout' : 'Pastoral supervision of family worship; care of burnout families', color: green },
          ].map((a, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', padding: '14px 16px' }}>
              <div style={{ fontSize: labelSz, fontWeight: 900, color: a.color, marginBottom: 4 }}>{a.name}{fn(a.fn)}</div>
              <div style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.50)', marginBottom: 6, fontStyle: 'italic' }}>{a.works}</div>
              <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{a.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '12px 16px', borderLeft: `3px solid ${pink}` }}>
          <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
            {pt
              ? 'Conselheiro bíblico reformado diante de Gênesis 1: não pergunte apenas "o que está errado?" — pergunte "de quem é a imagem que esta família está carregando? A quem pertence o ritmo desta semana?" O diagnóstico começa na criação, não no sintoma.'
              : 'Reformed biblical counselor before Genesis 1: do not only ask "what is wrong?" — ask "whose image is this family bearing? To whom does the rhythm of this week belong?" The diagnosis begins in creation, not in the symptom.'}
          </p>
        </div>
      </div>

      {/* SEÇÃO 6 — Plano de Sessões */}
      <div style={{ borderRadius: 16, background: greenL, border: `1.5px solid ${greenB}`, padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: green, marginBottom: 16 }}>
          🗓️ {pt ? 'Seção 6 — Plano de 4 Sessões baseado em Gênesis 1' : 'Section 6 — 4-Session Plan based on Genesis 1'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              n: '1', ref: 'Gênesis 1:1–13', color: green,
              title: pt ? 'O Caos Doméstico e Quem É o Criador' : 'Domestic Chaos and Who the Creator Is',
              desc: pt
                ? 'Mapeamento das áreas de caos no lar: rotinas, autoridade, prioridades. "Quem está no centro — governando o ritmo do lar?" Âncora histórico-redentiva: o Logos que ordenou o caos criacional reconciliou o cosmos caído pela cruz (Cl 1:20; 2Co 5:17). Colocar Cristo no centro é participar do ato criacional de ordenar o caos. Powlison[1], Adams[2].'
                : 'Mapping areas of domestic chaos: routines, authority, priorities. "Who is at the center — governing the rhythm of the home?" Redemptive anchor: the Logos who ordered creational chaos reconciled the fallen cosmos through the cross (Col 1:20; 2 Cor 5:17). Centering Christ is participating in the creative act of ordering chaos. Powlison[1], Adams[2].',
            },
            {
              n: '2', ref: 'Gênesis 1:26–28', color: amber,
              title: pt ? 'Identidade e Mandato — Quem Somos Juntos?' : 'Identity and Mandate — Who Are We Together?',
              desc: pt
                ? 'Diagnóstico de identidade: de onde cada membro da família busca valor e sentido? Identificação do mandato cultural conjunto do casal. Âncora histórico-redentiva: em Cristo a imago Dei é restaurada — "somos transformados de glória em glória" (2Co 3:18). O mandato cultural é retomado como Grande Comissionamento (Mt 28:18–20). Welch[4], Tripp[3,10].'
                : 'Identity diagnosis: from where does each family member seek value and meaning? Identification of the couple\'s joint cultural mandate. Redemptive anchor: in Christ the imago Dei is restored — "we are transformed from glory to glory" (2 Cor 3:18). The cultural mandate is resumed as the Great Commission (Matt 28:18–20). Welch[4], Tripp[3,10].',
            },
            {
              n: '3', ref: 'Gênesis 2:1–3', color: blue,
              title: pt ? 'O Sábado como Remédio — 4 Semanas de Descanso' : 'The Sabbath as Remedy — 4 Weeks of Rest',
              desc: pt
                ? 'Início da prática de guardar o Dia do Senhor completo por 4 semanas. Diagnóstico de burnout: o que o esgotamento revela sobre a visão de Deus da família? Âncora histórico-redentiva: "Está consumado" (Jo 19:30) é a declaração sabática de Cristo — o descanso não é ganho, é recebido em fé. Beeke[7,11], Baucham[8], Powlison[5].'
                : 'Beginning the practice of keeping a complete Lord\'s Day for 4 weeks. Burnout diagnosis: what does exhaustion reveal about the family\'s view of God? Redemptive anchor: "It is finished" (John 19:30) is Christ\'s sabbatic declaration — rest is not earned, it is received by faith. Beeke[7,11], Baucham[8], Powlison[5].',
            },
            {
              n: '4', ref: 'Gênesis 1:26–28; 2:3', color: purple,
              title: pt ? 'Síntese: Família como Teatro da Glória de Deus' : 'Synthesis: Family as Theater of God\'s Glory',
              desc: pt
                ? 'Avaliação das 4 semanas: o que mudou? Construção do "manifesto familiar" — identidade, mandato, ritmo semanal. Âncora histórico-redentiva: Calvino — "o mundo foi criado como teatro da glória de Deus." A família que carrega a imagem, exerce o mandato e guarda o sábado está sendo, nesta semana, um avanço da nova criação (Ap 21:1–5). Croft[9], Beeke[7], Baucham[8].'
                : 'Evaluation of 4 weeks: what changed? Building the "family manifesto" — identity, mandate, weekly rhythm. Redemptive anchor: Calvin — "the world was created as the theater of God\'s glory." The family bearing the image, exercising the mandate and keeping the Sabbath is, this week, an advance of the new creation (Rev 21:1–5). Croft[9], Beeke[7], Baucham[8].',
            },
          ].map((s) => (
            <div key={s.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: '#000' }}>{s.n}</div>
              <div>
                <div style={{ fontSize: titleSz, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 6 }}>{s.ref}</div>
                <div style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REFERÊNCIAS ABNT */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.10)', padding: '22px 24px', marginBottom: 8 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.50)', marginBottom: 16 }}>
          📎 {pt ? 'Referências Bibliográficas (ABNT)' : 'Bibliographic References (ABNT)'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {REFS.map((r) => (
            <div key={r.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, minWidth: 28, height: 22, borderRadius: 6, background: amberL, border: `1px solid ${amberB}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: smallSz, fontWeight: 900, color: amber }}>{r.n}</span>
              <p style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, margin: 0, fontFamily: 'monospace' }}>{r.abnt}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── Aconselhamento Bíblico Josué 255 ────────────────────────────────
function AconselhamentoBiblicoJosue255FamiliaSection({ pt }: { pt: boolean }) {
  const green  = 'rgba(52,211,153,1)';
  const greenL = 'rgba(52,211,153,0.10)';
  const greenB = 'rgba(52,211,153,0.28)';
  const amber  = 'rgba(255,180,50,1)';
  const amberL = 'rgba(255,180,50,0.10)';
  const amberB = 'rgba(255,180,50,0.28)';
  const blue   = 'rgba(80,200,255,1)';
  const blueL  = 'rgba(80,200,255,0.10)';
  const blueB  = 'rgba(80,200,255,0.28)';
  const purple = 'rgba(180,120,255,1)';
  const purpleL= 'rgba(180,120,255,0.10)';
  const purpleB= 'rgba(180,120,255,0.28)';
  const pink   = 'rgba(255,120,160,1)';
  const pinkL  = 'rgba(255,120,160,0.10)';
  const pinkB  = 'rgba(255,120,160,0.28)';

  const titleSz = 'clamp(18px,2.8vw,22px)';
  const bodySz  = 'clamp(16px,2.4vw,19px)';
  const labelSz = 'clamp(14px,2vw,16px)';
  const smallSz = 'clamp(13px,1.7vw,15px)';

  const fn = (n: number) => (
    <sup style={{ fontSize: '0.70em', fontWeight: 900, color: amber, marginLeft: 2, verticalAlign: 'super', lineHeight: 0 }}>[{n}]</sup>
  );

  const sectionCard = (accent: string, accentL: string, accentB: string, emoji: string, heading: string, theme: string, children: React.ReactNode) => (
    <div style={{ borderRadius: 16, background: accentL, border: `1.5px solid ${accentB}`, padding: '22px 24px', marginBottom: 20 }}>
      <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: accent, marginBottom: 8 }}>
        {emoji} {heading}
      </div>
      <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.55)', marginBottom: 14, fontStyle: 'italic' }}>{theme}</div>
      {children}
    </div>
  );

  const quoteBox = (text: string, author: string, accent: string, fnNum: number) => (
    <div style={{ background: 'rgba(0,0,0,0.25)', borderLeft: `3px solid ${accent}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', marginBottom: 12 }}>
      <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, margin: '0 0 6px 0', fontStyle: 'italic' }}>"{text}"</p>
      <div style={{ fontSize: labelSz, color: accent, fontWeight: 700 }}>— {author}{fn(fnNum)}</div>
    </div>
  );

  const questionsBox = (questions: string[], accent: string) => (
    <div style={{ background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '14px 18px', marginTop: 14 }}>
      <div style={{ fontSize: labelSz, fontWeight: 900, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
        {pt ? 'Perguntas para o Conselheiro' : 'Counselor Questions'}
      </div>
      <ol style={{ margin: 0, paddingLeft: 20 }}>
        {questions.map((q, i) => (
          <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 8 }}>{q}</li>
        ))}
      </ol>
    </div>
  );

  const hrBox = (text: string) => (
    <div style={{ background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
      <div style={{ fontSize: labelSz, fontWeight: 800, color: amber, marginBottom: 6 }}>
        ✝️ {pt ? 'Perspectiva Histórico-Redentiva' : 'Redemptive-Historical Perspective'}
      </div>
      <p style={{ fontSize: smallSz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>{text}</p>
    </div>
  );

  const REFS = [
    { n: 1,  abnt: 'POWLISON, David. Seeing with New Eyes: Counseling and the Human Condition through the Lens of Scripture. Phillipsburg: Presbyterian and Reformed, 2003.' },
    { n: 2,  abnt: 'ADAMS, Jay E. Competent to Counsel: Introduction to Nouthetic Counseling. Grand Rapids: Zondervan, 1970.' },
    { n: 3,  abnt: 'TRIPP, Paul David. Instruments in the Redeemer\'s Hands: People in Need of Change Helping People in Need of Change. Phillipsburg: Presbyterian and Reformed, 2002.' },
    { n: 4,  abnt: 'WELCH, Edward T. Running Scared: Fear, Worry, and the God of Rest. Greensboro: New Growth Press, 2007.' },
    { n: 5,  abnt: 'POWLISON, David. Speaking Truth in Love: Counsel in Community. Greensboro: New Growth Press, 2005.' },
    { n: 6,  abnt: 'ADAMS, Jay E. A Theology of Christian Counseling: More Than Redemption. Grand Rapids: Zondervan, 1979.' },
    { n: 7,  abnt: 'BEEKE, Joel R. Family Worship. Grand Rapids: Reformation Heritage Books, 2009.' },
    { n: 8,  abnt: 'BAUCHAM, Voddie, Jr. Family Driven Faith: Doing What It Takes to Raise Sons and Daughters Who Walk with God. Wheaton: Crossway, 2007.' },
    { n: 9,  abnt: 'CROFT, Brian; SAVASTIO, Jim. The Pastor\'s Ministry: Biblical Priorities for Faithful Shepherds. Grand Rapids: Zondervan, 2015.' },
    { n: 10, abnt: 'TRIPP, Paul David. What Did You Expect? Redeeming the Realities of Marriage. Wheaton: Crossway, 2010.' },
    { n: 11, abnt: 'ADAMS, Jay E. Christian Living in the Home. Phillipsburg: Presbyterian and Reformed, 1972.' },
    { n: 12, abnt: 'WELCH, Edward T. Side by Side: Walking with Others in Wisdom and Love. Wheaton: Crossway, 2015.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* HERO */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(220,60,90,0.13),rgba(255,180,50,0.10))', border: '1.5px solid rgba(220,60,90,0.30)', padding: '28px 28px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(28px,4vw,38px)', marginBottom: 10 }}>🔴🏚️</div>
        <div style={{ fontSize: 'clamp(20px,3.2vw,26px)', fontWeight: 900, color: 'rgba(220,60,90,1)', marginBottom: 8, lineHeight: 1.3 }}>
          {pt ? 'Aconselhamento Bíblico · Josué 2:1–24' : 'Biblical Counseling · Joshua 2:1-24'}
        </div>
        <div style={{ fontSize: titleSz, fontWeight: 700, color: amber, marginBottom: 14 }}>
          {pt ? 'Recursos para o Conselheiro de Casais e Famílias' : 'Resources for the Couples and Family Counselor'}
        </div>
        <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Este guia aplica os temas de Josué 2 — graça imerecida, fé que age, intercessão familiar, o cordão escarlate — ao aconselhamento bíblico de casais e famílias. Cada citação é identificada por nota de rodapé numerada; referências ABNT ao final.'
            : 'This guide applies the themes of Joshua 2 — undeserved grace, faith that acts, family intercession, the scarlet cord — to biblical counseling of couples and families. Author citations are identified by numbered footnotes; full ABNT references appear at the end.'}
        </p>
      </div>

      {/* TRIAGE */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.12)', padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>
          🎯 {pt ? 'Problemas que esta Perícope Endereça — Guia de Triagem para o Conselheiro' : 'Problems this Pericope Addresses — Counselor Triage Guide'}
        </div>
        <p style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.50)', lineHeight: 1.65, margin: '0 0 16px 0', fontStyle: 'italic' }}>
          {pt
            ? 'Josué 2:1–24 é a perícope de Raabe: graça soberana que atravessa fronteiras étnicas, morais e religiosas. O conselheiro pode utilizá-la quando o aconselhando enfrenta qualquer um dos cenários abaixo:'
            : 'Joshua 2:1–24 is the Rahab pericope: sovereign grace that crosses ethnic, moral and religious boundaries. The counselor may use it when the counselee faces any of the scenarios below:'}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 10 }}>
          {[
            { icon: '🔴', cor: 'rgba(220,60,90,1)',   titulo: pt ? 'Vergonha do Passado Pessoal ou Familiar'         : 'Shame of Personal or Family Past',
              desc: pt ? 'Pessoas com histórico de imoralidade, vício, crime ou abandono. Raabe era prostituta — e Deus a incluiu na genealogia de Cristo (Mt 1:5). A perícope endereça a crença de que o passado impede a graça.' : 'People with a history of immorality, addiction, crime or abandonment. Rahab was a prostitute — God included her in Christ\'s genealogy (Matt 1:5). The pericope addresses the belief that the past disqualifies from grace.' },
            { icon: '👨‍👩‍👧', cor: amber,  titulo: pt ? 'Primeira Geração Cristã — Sem Herança de Fé'          : 'First-Generation Christian — No Faith Heritage',
              desc: pt ? 'Famílias onde um membro converteu primeiro, sem tradição cristã. Raabe não tinha pai cristão nem lei escrita — tinha apenas o que ouviu sobre Deus (2:10). A fé pode começar com uma única pessoa em qualquer geração.' : 'Families where one member converted first, without Christian tradition. Rahab had no Christian father, no written law — only what she heard about God (2:10). Faith can begin with one person in any generation.' },
            { icon: '🙏', cor: blue,   titulo: pt ? 'Intercessão por Familiares Não Convertidos'            : 'Intercession for Unconverted Family Members',
              desc: pt ? 'Raabe pediu salvação para "meu pai, minha mãe, meus irmãos" (2:13). Texto base para aconselhar cônjuges, pais e filhos que interceddem por familiares não salvos — e que temem que seja tarde demais.' : 'Rahab asked for salvation for "my father, my mother, my brothers" (2:13). Base text for counseling spouses, parents and children interceding for unsaved family members.' },
            { icon: '👂', cor: purple, titulo: pt ? 'Fé Que Ainda Não Viu — Crença Baseada no Ouvir'        : 'Faith that Has Not Yet Seen — Belief Based on Hearing',
              desc: pt ? 'Raabe creu sem milagre pessoal — apenas pelo que ouviu sobre Deus (2:10). Para aconselhados que dizem "não vejo Deus agindo na minha vida": a fé bíblica nasce pelo ouvir (Rm 10:17), não pelo ver.' : 'Rahab believed without a personal miracle — only by what she heard about God (2:10). For counselees who say "I don\'t see God acting in my life": biblical faith comes from hearing (Rom 10:17), not seeing.' },
            { icon: '🤫', cor: pink,   titulo: pt ? 'Decisões em Situações de Conflito de Deveres'          : 'Decisions in Situations of Conflicting Duties',
              desc: pt ? 'A mentira de Raabe ao rei (2:4–5) levanta questões de ética em situações difíceis. A tradição reformada (Calvino, Henry) distingue o ato imperfeito da fé genuína — útil para aconselhar pessoas que tomaram decisões moralmente complexas em crise.' : 'Rahab\'s lie to the king (2:4–5) raises ethical questions in difficult situations. The Reformed tradition (Calvin, Henry) distinguishes the imperfect act from genuine faith — useful for counseling people who made morally complex decisions in crisis.' },
            { icon: '🪟', cor: amber,  titulo: pt ? 'Identidade — "Sou Digno de Ser Salvo?"'               : 'Identity — "Am I Worthy to be Saved?"',
              desc: pt ? 'O cordão escarlate na janela de Raabe é o sinal externo de fé que ainda duvida de si mesma. Para aconselhados com baixo senso de pertencimento ("não mereço estar aqui"): Deus é quem firma o cordão, não a qualidade do crente.' : 'The scarlet cord in Rahab\'s window is the external sign of a faith that still doubts itself. For counselees with low sense of belonging: God seals the cord, not the quality of the believer.' },
          ].map((p2, i) => (
            <div key={i} style={{ background: `${p2.cor}0D`, border: `1px solid ${p2.cor}33`, borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: labelSz, fontWeight: 900, color: p2.cor, marginBottom: 6 }}>{p2.icon} {p2.titulo}</div>
              <div style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.78)', lineHeight: 1.65 }}>{p2.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, borderRadius: 12, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '16px 20px' }}>
          <div style={{ fontSize: labelSz, fontWeight: 900, color: amber, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>
            ✝️ {pt ? 'Enquadramento Histórico-Redentivo para o Conselheiro' : 'Redemptive-Historical Frame for the Counselor'}
          </div>
          <p style={{ fontSize: bodySz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.80, margin: 0 }}>
            {pt
              ? 'Raabe é o proto-tipo da gentilidade incluída pelo Evangelho. Mateus 1:5 a coloca na genealogia de Cristo — a prostituta cananeia que dependurou um cordão escarlate se torna antepassada do Messias. O cordão escarlate (tiqwat ḥûṭ hashshânî — "fio de esperança escarlate") aponta diretamente ao sangue de Cristo como único sinal que protege no dia do juízo (Êx 12; Jo 1:29; 1Pe 1:18–19). Hebreus 11:31 e Tiago 2:25 a colocam no rol dos heróis da fé ao lado de Abraão e Moisés. O conselheiro que trabalha com esta perícope tem em mãos o texto mais poderoso do Antigo Testamento para endereçar vergonha, rejeição e a crença de que o passado exclui da graça.'
              : 'Rahab is the proto-type of the Gentiles included by the Gospel. Matthew 1:5 places her in Christ\'s genealogy — the Canaanite prostitute who hung a scarlet cord becomes an ancestor of the Messiah. The scarlet cord (tiqwat khut hashshani — "scarlet thread of hope") points directly to Christ\'s blood as the only sign that protects on the day of judgment (Ex 12; John 1:29; 1 Pet 1:18–19). Hebrews 11:31 and James 2:25 place her among the heroes of faith alongside Abraham and Moses.'}
          </p>
        </div>
      </div>

      {/* SECTION 1 */}
      {sectionCard(green, greenL, greenB, '🤫',
        pt ? 'Seção 1 — A Providência que Governa em Segredo' : 'Section 1 — The Providence that Governs in Secret',
        pt ? 'Josué 2:1–7 — missão discreta; Deus governa através de meios imperfeitos' : 'Joshua 2:1-7 — discreet mission; God governs through imperfect means',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'Providência discreta: Deus age através de caminhos que não planejamos — inclusive por pessoas e situações moralmente complexas' : 'Discreet providence: God acts through paths we did not plan — including morally complex people and situations',
              pt ? 'O conselheiro aprende a ver a mão de Deus nas histórias "tortas" dos aconselhados — onde eles veem apenas falha, o conselheiro aponta para a providência' : 'The counselor learns to see God\'s hand in the "crooked" stories of counselees — where they see only failure, the counselor points to providence',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'A providência de Deus não escolhe apenas personagens moralmente exemplares — ela age através de prostitutas, mentiras e fugitivos para cumprir seus propósitos. O conselheiro que só reconhece Deus nas histórias limpas perderá a obra de graça nas histórias tortas'
               : 'God\'s providence does not choose only morally exemplary characters — it acts through prostitutes, lies and fugitives to accomplish its purposes. The counselor who only recognizes God in clean stories will miss the work of grace in crooked ones',
            'David Powlison', green, 1)}
          {quoteBox(
            pt ? 'O papel do conselheiro nesta seção é ajudar o aconselhado a reconhecer a mão de Deus em sua própria história — mesmo nos momentos em que tomou decisões imperfeitas. Arrependimento genuíno e reconhecimento da providência andam juntos'
               : 'The counselor\'s role here is to help the counselee recognize God\'s hand in their own story — even in moments of imperfect decisions. Genuine repentance and recognition of providence go together',
            'Jay E. Adams', amber, 2)}
          {quoteBox(
            pt ? 'A história de Raabe revela que Deus não precisa de condições perfeitas para agir — Ele age dentro das condições que existem. O conselheiro apresenta isso como esperança: Deus está trabalhando na sua história mesmo quando você não consegue ver'
               : 'Rahab\'s story reveals that God does not need perfect conditions to act — He acts within existing conditions. The counselor presents this as hope: God is working in your story even when you cannot see it',
            'Paul David Tripp', blue, 3)}
          {hrBox(pt
            ? 'O envio secreto dos espias contrasta com o fracasso público dos doze espias em Números 13 — Josué aprendeu com o passado. Tipologicamente, Cristo veio ao mundo de forma discreta: "o mundo não O reconheceu" (Jo 1:10–11). Sua rejeição se tornou nossa aceitação (2Co 5:21; Ef 1:6). O conselheiro que trabalha com aconselhados que "não foram reconhecidos" — filhos negligenciados, cônjuges ignorados, pessoas descartadas — tem aqui a âncora: Cristo também não foi reconhecido, e essa rejeição se transformou em salvação para nós.'
            : 'The secret sending of the spies contrasts with the public failure of the twelve spies in Numbers 13. Typologically, Christ came to the world discretely: "the world did not recognize him" (John 1:10–11). His rejection became our acceptance (2 Cor 5:21; Eph 1:6). The counselor working with counselees who "were not recognized" — neglected children, ignored spouses — has the anchor here.')}
          {questionsBox([
            pt ? '"Em que momento da sua história você consegue ver a mão de Deus trabalhando — mesmo que o caminho tenha sido torto ou inesperado?"'
               : '"At what moment in your story can you see God\'s hand at work — even if the path was crooked or unexpected?"',
            pt ? '"Existe algo no seu passado que você considera um erro de Deus — uma circunstância que não deveria ter acontecido? Como Josué 2 fala para isso?"'
               : '"Is there something in your past you consider a mistake by God — a circumstance that should not have happened? How does Joshua 2 speak to this?"',
            pt ? '"Raabe agiu com fé imperfeita em circunstâncias difíceis. Como você avalia suas próprias decisões em situações de crise — com misericórdia ou com condenação?"'
               : '"Rahab acted with imperfect faith in difficult circumstances. How do you evaluate your own decisions in crisis — with mercy or with condemnation?"',
          ], green)}
        </>
      )}

      {/* SECTION 2 */}
      {sectionCard(amber, amberL, amberB, '👂',
        pt ? 'Seção 2 — A Fé que Vem pelo Ouvir (Centro ◉)' : 'Section 2 — Faith that Comes from Hearing (Center ◉)',
        pt ? 'Josué 2:8–14 — confissão de fé de Raabe; "o SENHOR vosso Deus é Deus em cima nos céus e embaixo na terra"' : 'Joshua 2:8-14 — Rahab\'s confession of faith; "the LORD your God is God in heaven above and on earth below"',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'Raabe ouviu o que Deus fez por outros — e isso foi suficiente para gerar fé salvadora (Rm 10:17): modelo para aconselhar convertidos de primeira geração sem tradição religiosa familiar' : 'Rahab heard what God did for others — and that was enough to generate saving faith (Rom 10:17): model for counseling first-generation converts without a religious family tradition',
              pt ? 'A confissão de Raabe em 2:11 é a mais densa teologicamente no livro — vinda de uma cananeia pagã: a graça não respeita fronteiras étnicas nem morais' : 'Rahab\'s confession in 2:11 is the theologically densest in the book — from a pagan Canaanite: grace respects neither ethnic nor moral boundaries',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'A fé de Raabe nasceu do ouvir — não de experiência sobrenatural pessoal, não de família cristã, não de catecismo. Ela ouviu o que Deus fez por outros e creu. O conselheiro que trabalha com pessoas sem tradição religiosa deve mostrar que a fé bíblica sempre nasce assim: fides ex auditu — fé pelo ouvir (Rm 10:17)'
               : 'Rahab\'s faith was born from hearing — not from a personal supernatural experience, not from a Christian family, not from a catechism. She heard what God did for others and believed. Biblical faith always comes this way: fides ex auditu — faith from hearing (Rom 10:17)',
            'Edward T. Welch', amber, 4)}
          {quoteBox(
            pt ? 'Raabe não tinha dúvida intelectual — ela tinha terror existencial: "nosso coração se derreteu" (2:11). A transformação não foi de dúvida para certeza intelectual, mas de terror para confiança. O conselheiro distingue: nem toda paralisia espiritual é dúvida — às vezes é o medo de que a graça não alcance alguém como eu'
               : 'Rahab did not have intellectual doubt — she had existential terror: "our hearts melted" (2:11). The transformation was not from doubt to intellectual certainty, but from terror to trust. Not all spiritual paralysis is doubt — sometimes it is fear that grace will not reach someone like me',
            'David Powlison', green, 5)}
          {quoteBox(
            pt ? 'A confissão de Raabe — "YHWH é Deus em cima nos céus e embaixo na terra" — é a mais completa teologia proferida por um gentio no Antigo Testamento. A família que conta as obras de Deus em voz alta está semeando fé nos que ouvem — mesmo sem perceber. O testemunho familiar é missão'
               : 'Rahab\'s confession — "YHWH is God in heaven above and on earth below" — is the most complete theology uttered by a Gentile in the Old Testament. The family that tells God\'s works aloud is sowing faith in those who hear — even without realizing it. Family testimony is mission',
            'Joel R. Beeke', blue, 7)}
          {hrBox(pt
            ? 'Hebreus 11:31 e Tiago 2:25 citam Raabe lado a lado com Abraão, Moisés e Gideão — não apesar do seu passado, mas com ele. Cristo é o cumprimento de tudo que Raabe antecipou: Ele é o Espião Divino enviado ao mundo para resgatar os que creem (Jo 3:16–17). Sua intercessão perante o Pai — "estes são os que me deste" (Jo 17:9) — é o "não os entregues" de Raabe em escala definitiva. O conselheiro que trabalha com aconselhados que se sentem indignos apresenta Raabe como evidência de que a eleição não respeita fronteiras morais (Rm 9:16): "não é de quem quer, nem de quem corre, mas de Deus que usa de misericórdia."'
            : 'Hebrews 11:31 and James 2:25 cite Rahab alongside Abraham, Moses and Gideon. Christ fulfilled all Rahab anticipated: He is the Divine Spy sent into the world to rescue those who believe (John 3:16–17). His intercession before the Father — "these are those you gave me" (John 17:9) — is Rahab\'s "do not hand them over" at definitive scale. The election respects no moral boundaries (Rom 9:16).')}
          {questionsBox([
            pt ? '"Raabe creu pelo que ouviu sobre Deus — sem milagre pessoal. Que história sobre Deus você já ouviu e ainda não deixou se tornar fé ativa na sua vida?"'
               : '"Rahab believed from what she heard about God — without a personal miracle. What story about God have you heard that you have not yet let become active faith in your life?"',
            pt ? '"Sua fé nasceu do ouvir — de quem, de que momento, de que história? Como isso mudou você?"'
               : '"Your faith was born from hearing — from whom, at what moment, from what story? How did that change you?"',
            pt ? '"Raabe disse: nosso coração se derreteu antes de confessar fé. Que emoção você experimenta ao pensar em Deus — terror, distância, esperança? O que isso revela sobre a sua percepção da graça?"'
               : '"Rahab said: our hearts melted before confessing faith. What emotion do you experience when thinking of God — terror, distance, hope? What does that reveal about your perception of grace?"',
          ], amber)}
        </>
      )}

      {/* SECTION 3 */}
      {sectionCard(blue, blueL, blueB, '🔴',
        pt ? 'Seção 3 — O Cordão Escarlate — Sinal da Aliança da Vida' : 'Section 3 — The Scarlet Cord — Sign of the Covenant of Life',
        pt ? 'Josué 2:15–24 — tiqwat ḥûṭ hashshânî; "fio de esperança escarlate"; salvação familiar pela intercessão' : 'Joshua 2:15-24 — tiqwat khut hashshani; "scarlet thread of hope"; family salvation through intercession',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'O cordão escarlate como sinal externo de fé interna: o conselheiro trabalha com aconselhados que precisam de marcos visíveis de pertencimento à família de Deus' : 'The scarlet cord as an external sign of internal faith: the counselor works with counselees who need visible markers of belonging to God\'s family',
              pt ? 'A inclusão de "toda a família de seu pai" (2:18): Raabe intercede por todos os seus — modelo de oração intercessória para cônjuges, filhos e pais que oram por familiares não convertidos' : 'The inclusion of "all her father\'s household" (2:18): Rahab intercedes for all of hers — a model of intercessory prayer for spouses, children and parents praying for unconverted family members',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'O cordão escarlate de Raabe é o primeiro sinal de aliança individual no livro de Josué. A família cristã que vive visivelmente sob o sangue de Cristo — que ora, lê a Bíblia, guarda o Dia do Senhor — está dependurando o cordão na janela. Esses sinais não salvam, mas declaram a quem se pertence'
               : 'Rahab\'s scarlet cord is the first individual covenant sign in Joshua. The Christian family that visibly lives under Christ\'s blood — praying, reading the Bible, keeping the Lord\'s Day — is hanging the cord in the window. These signs do not save, but declare to whom one belongs',
            'Voddie Baucham Jr.', amber, 8)}
          {quoteBox(
            pt ? 'O conselheiro pastoral que acompanha famílias em crise deve perguntar: qual é o cordão escarlate de vocês — o que sinaliza para quem está de fora que esta casa pertence a Deus? Sinais visíveis de fé não são superstição: são pedagogia pactual'
               : 'The pastoral counselor accompanying families in crisis must ask: what is your scarlet cord — what signals to those outside that this house belongs to God? Visible signs of faith are not superstition: they are covenantal pedagogy',
            'Brian Croft & Jim Savastio', green, 9)}
          {quoteBox(
            pt ? 'Raabe pediu salvação para meu pai, minha mãe, meus irmãos e tudo o que é deles (2:13). O casamento cristão não é apenas aliança entre dois — é missão de intercessão. O conselheiro pergunta: quais são os nomes na sua lista de intercessão familiar?'
               : 'Rahab asked for salvation for "my father, my mother, my brothers and all that belongs to them" (2:13). Christian marriage is not just a covenant between two — it is an intercession mission. The counselor asks: what are the names on your family intercession list?',
            'Paul David Tripp', purple, 10)}
          {hrBox(pt
            ? 'O tiqwat ḥûṭ hashshânî une em uma só palavra esperança (tiqwah) e sangue (cor escarlate) — isso é o Evangelho em miniatura. Cristo é o Cordão Escarlate definitivo: Seu sangue na cruz é o único sinal que protege quando o juízo passa (Êx 12:13; Ap 12:11). Raabe entra na genealogia de Jesus (Mt 1:5) — a prostituta cananeia se torna bisavó de Davi e antepassada do Messias. A graça que atravessou as muralhas de Jericó é a mesma que rasgou o véu do templo (Mt 27:51) para salvar pecadores de toda nação (Ap 7:9). O conselheiro apresenta o cordão escarlate como imagem do batismo: o sinal externo que marca quem está sob o sangue de Cristo.'
            : 'The tiqwat khut hashshani unites in one word hope (tiqwah) and blood (scarlet color) — the Gospel in miniature. Christ is the definitive Scarlet Cord: His blood at the cross is the only sign that protects when judgment passes (Ex 12:13; Rev 12:11). Rahab enters Jesus\'s genealogy (Matt 1:5). The grace that crossed Jericho\'s walls is the same that tore the temple veil (Matt 27:51) to save sinners from every nation (Rev 7:9).')}
          {questionsBox([
            pt ? '"Raabe não pediu salvação apenas para ela — pediu para toda a família. Quem está na sua lista de intercessão pelo nome? Nomeie-os agora."'
               : '"Rahab did not ask for salvation only for herself — she asked for the whole family. Who is on your intercession list by name? Name them now."',
            pt ? '"Qual é o cordão escarlate visível da sua família — o sinal que declara a quem vocês pertencem? Se não há nenhum, o que está impedindo?"'
               : '"What is the visible scarlet cord of your family — the sign that declares to whom you belong? If there is none, what is preventing it?"',
            pt ? '"Cristo é o Cordão Escarlate definitivo. Como a certeza de que Seu sangue já foi dependurado por você muda a forma como você intercede pelos seus?"'
               : '"Christ is the definitive Scarlet Cord. How does the certainty that His blood has already been hung for you change the way you intercede for yours?"',
          ], blue)}
        </>
      )}

      {/* SECTION 4 */}
      {sectionCard(purple, purpleL, purpleB, '🚪',
        pt ? 'Seção 4 — A Missão Clandestina e a Família que Protege' : 'Section 4 — The Clandestine Mission and the Family that Protects',
        pt ? 'Síntese Josué 2:1–24 — fé que age; a família como comunidade de missão e refúgio' : 'Joshua 2:1–24 synthesis — faith that acts; the family as a community of mission and refuge',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'Raabe protegeu os espias em risco pessoal — fé que age (Tg 2:25): o conselheiro trabalha com aconselhados que creem mas não agem, ou que agem mas não identificam a fé como motor' : 'Rahab protected the spies at personal risk — faith that acts (James 2:25): the counselor works with counselees who believe but do not act, or who act but do not identify faith as the motive',
              pt ? 'A casa de Raabe como lugar de refúgio: a família cristã chamada a ser espaço de acolhimento, proteção e missão para os vulneráveis ao seu redor' : 'Rahab\'s house as a place of refuge: the Christian family called to be a space of welcome, protection and mission for those vulnerable around them',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'Tiago 2:25 cita Raabe como exemplo de fé que age. O conselheiro bíblico não trabalha apenas com crenças intelectuais, mas com padrões de comportamento. A pergunta não é apenas "você crê?" mas "sua crença está gerando ação de proteção, acolhimento e risco pelos outros?"'
               : 'James 2:25 cites Rahab as an example of faith that acts. The biblical counselor works not only with intellectual beliefs but with behavioral patterns. The question is not only "do you believe?" but "is your belief generating action of protection, welcome and risk for others?"',
            'Jay E. Adams', amber, 11)}
          {quoteBox(
            pt ? 'A casa de Raabe se torna lugar de refúgio — todos dentro do cordão estão seguros, todos fora estão em perigo. A família cristã que entende sua missão é aquela que expande o espaço sob o cordão — que acolhe, intercede e protege os vulneráveis ao seu redor'
               : 'Rahab\'s house becomes a place of refuge — all inside the cord are safe, all outside are in danger. The Christian family that understands its mission expands the space under the cord — welcoming, interceding and protecting the vulnerable around them',
            'Edward T. Welch', green, 12)}
          {quoteBox(
            pt ? 'O conselheiro que acompanha famílias em missão deve perguntar: quem está refugiado na sua casa? Quem você está protegendo? A fé sem missão — sem ação de proteção e acolhimento — é a fé de quem pregou o cordão na janela sem abrir a porta'
               : 'The counselor accompanying families in mission must ask: who is taking refuge in your home? Who are you protecting? Faith without mission — without protective and welcoming action — is the faith of one who hung the cord in the window without opening the door',
            'David Powlison', blue, 1)}
          {hrBox(pt
            ? 'Cristo é o Espião Divino que desceu ao território inimigo (Fp 2:7–8) para resgatar os que creem. Sua "casa" — a Igreja — é o espaço sob o cordão escarlate: "todo aquele que invocar o nome do SENHOR será salvo" (Rm 10:13). A família que se fecha ao mundo enquanto exibe o cordão escarlate está contradizendo o próprio sinal: a salvação de Raabe foi comunitária ("toda a casa de seu pai"), não individual. O conselheiro que trabalha com famílias ensimesmadas tem aqui o diagnóstico: Raabe abriu a janela para o povo de Deus entrar — e a família convertida abre a porta para o mundo entrar sob o cordão.'
            : 'Christ is the Divine Spy who descended into enemy territory (Phil 2:7–8) to rescue those who believe. His "house" — the Church — is the space under the scarlet cord: "everyone who calls on the name of the LORD will be saved" (Rom 10:13). Rahab\'s salvation was communal ("all her father\'s household"), not individual. The counselor working with self-enclosed families has the diagnosis here: Rahab opened the window for God\'s people to enter.')}
          {questionsBox([
            pt ? '"Você crê — mas o que essa fé tem custado? Que risco concreto você já correu por causa do Evangelho na sua família ou comunidade?"'
               : '"You believe — but what has that faith cost you? What concrete risk have you taken because of the Gospel in your family or community?"',
            pt ? '"Quem está dentro da sua casa de Raabe — quem você está protegendo e intercedendo pelo nome? Se a resposta for ninguém, o que isso revela?"'
               : '"Who is inside your Rahab\'s house — who are you protecting and interceding for by name? If the answer is no one, what does that reveal?"',
            pt ? '"Cristo desceu ao território inimigo para nos resgatar. Como a família de vocês pode ser, esta semana, um espaço de refúgio para alguém em perigo?"'
               : '"Christ descended into enemy territory to rescue us. How can your family be, this week, a space of refuge for someone in danger?"',
          ], purple)}
        </>
      )}

      {/* SECTION 5 — Authors */}
      <div style={{ borderRadius: 16, background: pinkL, border: `1.5px solid ${pinkB}`, padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: pink, marginBottom: 16 }}>
          📚 {pt ? 'Seção 5 — Autores e Obras de Referência' : 'Section 5 — Reference Authors and Works'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 12, marginBottom: 16 }}>
          {[
            { fn: 2,  name: 'Jay E. Adams',           works: 'Competent to Counsel (1970); Christian Living in the Home (1972); A Theology of Christian Counseling (1979)', desc: pt ? 'Pioneiro do aconselhamento noutético/bíblico; confrontação direta com a Palavra' : 'Pioneer of nouthetic/biblical counseling; direct confrontation with the Word', color: amber },
            { fn: 1,  name: 'David Powlison',         works: 'Seeing with New Eyes (2003); Speaking Truth in Love (2005)', desc: pt ? 'Abordagem CCEF; o coração por trás do comportamento; medo, vergonha e ídolos' : 'CCEF approach; the heart behind behavior; fear, shame and idols', color: green },
            { fn: 3,  name: 'Paul David Tripp',       works: 'Instruments in the Redeemer\'s Hands (2002); What Did You Expect? (2010)', desc: pt ? 'Agentes de mudança; casamento como aliança santificadora' : 'Change agents; marriage as sanctifying covenant', color: blue },
            { fn: 4,  name: 'Edward T. Welch',        works: 'Running Scared (2007); Side by Side (2015)', desc: pt ? 'Medo, vergonha, o ministério "uns aos outros"' : 'Fear, shame, the "one another" ministry', color: purple },
            { fn: 7,  name: 'Joel R. Beeke',          works: 'Family Worship (2009); Parenting by God\'s Promises (2011)', desc: pt ? 'Piedade reformada; culto familiar; testemunho geracional' : 'Reformed piety; family worship; generational testimony', color: amber },
            { fn: 8,  name: 'Voddie Baucham Jr.',     works: 'Family Driven Faith (2007)', desc: pt ? 'A família como comunidade de missão e discipulado' : 'The family as a community of mission and discipleship', color: pink },
            { fn: 9,  name: 'Brian Croft & Jim Savastio', works: 'The Pastor\'s Ministry (2015)', desc: pt ? 'Cuidado pastoral e aconselhamento como um único ofício' : 'Pastoral care and counseling as one office', color: green },
          ].map((a, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', padding: '14px 16px' }}>
              <div style={{ fontSize: labelSz, fontWeight: 900, color: a.color, marginBottom: 4 }}>{a.name}{fn(a.fn)}</div>
              <div style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.50)', marginBottom: 6, fontStyle: 'italic' }}>{a.works}</div>
              <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{a.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '12px 16px', borderLeft: `3px solid ${pink}` }}>
          <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
            {pt
              ? 'Conselheiro bíblico reformado diante de Josué 2: não pergunte apenas "o que o aconselhando fez?" — pergunte "o que Deus está fazendo na história torta do aconselhando?" A graça de Raabe é a graça que também nos alcançou.'
              : 'Reformed biblical counselor before Joshua 2: do not only ask "what did the counselee do?" — ask "what is God doing in the counselee\'s crooked story?" The grace that reached Rahab is the grace that also reached us.'}
          </p>
        </div>
      </div>

      {/* SECTION 6 — 4-Session Plan */}
      <div style={{ borderRadius: 16, background: greenL, border: `1.5px solid ${greenB}`, padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: green, marginBottom: 16 }}>
          🗓️ {pt ? 'Seção 6 — Plano de 4 Sessões baseado em Josué 2' : 'Section 6 — 4-Session Plan based on Joshua 2'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              n: '1', ref: 'Josué 2:1–7', color: amber,
              title: pt ? 'O Passado e a Graça' : 'The Past and Grace',
              desc: pt
                ? 'Mapeamento da história de vergonha ou falha. Âncora histórico-redentiva: Deus governa em segredo por caminhos imperfeitos — a história torta do aconselhando é material da providência. Cristo não foi reconhecido pelo mundo (Jo 1:10) — Sua rejeição se tornou nossa aceitação (2Co 5:21). Powlison[1], Adams[2].'
                : 'Mapping the story of shame or failure. Redemptive anchor: God governs in secret through imperfect paths — the counselee\'s crooked story is the material of providence. Christ was not recognized by the world (John 1:10) — His rejection became our acceptance (2 Cor 5:21). Powlison[1], Adams[2].',
            },
            {
              n: '2', ref: 'Josué 2:8–14', color: blue,
              title: pt ? 'A Fé que Vem pelo Ouvir' : 'Faith that Comes from Hearing',
              desc: pt
                ? 'Identificação de como a fé chegou — de quem, de que história. Diagnóstico: terror vs. confiança (2:11). Âncora histórico-redentiva: fides ex auditu (Rm 10:17); Hb 11:31 — Raabe no rol dos heróis. A eleição não respeita fronteiras morais (Rm 9:16). Welch[4], Beeke[7].'
                : 'Identifying how faith arrived — from whom, from what story. Diagnosis: terror vs. trust (2:11). Redemptive anchor: fides ex auditu (Rom 10:17); Heb 11:31 — Rahab among the heroes. Election respects no moral boundaries (Rom 9:16). Welch[4], Beeke[7].',
            },
            {
              n: '3', ref: 'Josué 2:15–24', color: purple,
              title: pt ? 'O Cordão na Janela' : 'The Cord in the Window',
              desc: pt
                ? 'Construção de sinais visíveis de fé; lista de intercessão por familiares não convertidos. Âncora histórico-redentiva: cordão escarlate = sangue de Cristo (Êx 12; 1Pe 1:18–19); Raabe em Mt 1:5 — a mais improvável antepassada do Messias. Tripp[10], Baucham[8].'
                : 'Building visible signs of faith; intercession list for unconverted family members. Redemptive anchor: scarlet cord = blood of Christ (Ex 12; 1 Pet 1:18–19); Rahab in Matt 1:5 — the most unlikely ancestor of the Messiah. Tripp[10], Baucham[8].',
            },
            {
              n: '4', ref: 'Josué 2:1–24 síntese', color: green,
              title: pt ? 'A Casa Aberta — Missão e Acolhimento' : 'The Open House — Mission and Welcome',
              desc: pt
                ? 'Identificação de quem a família está protegendo e acolhendo. Plano concreto de missão familiar. Âncora histórico-redentiva: a Igreja é a casa de Raabe — espaço sob o cordão escarlate (Rm 10:13). Cristo abriu a porta antes de nós (Fp 2:7–8). A família que não acolhe contradiz o sinal que exibe. Adams[11], Welch[12].'
                : 'Identifying who the family is protecting and welcoming. Concrete family mission plan. Redemptive anchor: the Church is Rahab\'s house — space under the scarlet cord (Rom 10:13). Christ opened the door before us (Phil 2:7–8). The family that does not welcome contradicts the sign it displays. Adams[11], Welch[12].',
            },
          ].map((s) => (
            <div key={s.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: '#000' }}>{s.n}</div>
              <div>
                <div style={{ fontSize: titleSz, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 6 }}>{s.ref}</div>
                <div style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REFERENCIAS ABNT */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.10)', padding: '22px 24px', marginBottom: 8 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.50)', marginBottom: 16 }}>
          📎 {pt ? 'Referências Bibliográficas (ABNT)' : 'Bibliographic References (ABNT)'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {REFS.map((r) => (
            <div key={r.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, minWidth: 28, height: 22, borderRadius: 6, background: amberL, border: `1px solid ${amberB}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: smallSz, fontWeight: 900, color: amber }}>{r.n}</span>
              <p style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, margin: 0, fontFamily: 'monospace' }}>{r.abnt}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── Aconselhamento Bíblico Josué 256 ────────────────────────────────
function AconselhamentoBiblicoJosue256FamiliaSection({ pt }: { pt: boolean }) {
  const blue   = 'rgba(80,160,255,1)';
  const blueL  = 'rgba(80,160,255,0.10)';
  const blueB  = 'rgba(80,160,255,0.28)';
  const amber  = 'rgba(255,180,50,1)';
  const amberL = 'rgba(255,180,50,0.10)';
  const amberB = 'rgba(255,180,50,0.28)';
  const green  = 'rgba(52,211,153,1)';
  const greenL = 'rgba(52,211,153,0.10)';
  const greenB = 'rgba(52,211,153,0.28)';
  const purple = 'rgba(180,120,255,1)';
  const purpleL= 'rgba(180,120,255,0.10)';
  const purpleB= 'rgba(180,120,255,0.28)';
  const pink   = 'rgba(255,120,160,1)';
  const pinkL  = 'rgba(255,120,160,0.10)';
  const pinkB  = 'rgba(255,120,160,0.28)';

  const titleSz = 'clamp(18px,2.8vw,22px)';
  const bodySz  = 'clamp(16px,2.4vw,19px)';
  const labelSz = 'clamp(14px,2vw,16px)';
  const smallSz = 'clamp(13px,1.7vw,15px)';

  const fn = (n: number) => (
    <sup style={{ fontSize: '0.70em', fontWeight: 900, color: amber, marginLeft: 2, verticalAlign: 'super', lineHeight: 0 }}>[{n}]</sup>
  );

  const sectionCard = (accent: string, accentL: string, accentB: string, emoji: string, heading: string, theme: string, children: React.ReactNode) => (
    <div style={{ borderRadius: 16, background: accentL, border: `1.5px solid ${accentB}`, padding: '22px 24px', marginBottom: 20 }}>
      <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: accent, marginBottom: 8 }}>
        {emoji} {heading}
      </div>
      <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.55)', marginBottom: 14, fontStyle: 'italic' }}>{theme}</div>
      {children}
    </div>
  );

  const quoteBox = (text: string, author: string, accent: string, fnNum: number) => (
    <div style={{ background: 'rgba(0,0,0,0.25)', borderLeft: `3px solid ${accent}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', marginBottom: 12 }}>
      <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, margin: '0 0 6px 0', fontStyle: 'italic' }}>"{text}"</p>
      <div style={{ fontSize: labelSz, color: accent, fontWeight: 700 }}>— {author}{fn(fnNum)}</div>
    </div>
  );

  const questionsBox = (questions: string[], accent: string) => (
    <div style={{ background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '14px 18px', marginTop: 14 }}>
      <div style={{ fontSize: labelSz, fontWeight: 900, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase' as const, marginBottom: 10 }}>
        {pt ? 'Perguntas para o Conselheiro' : 'Counselor Questions'}
      </div>
      <ol style={{ margin: 0, paddingLeft: 20 }}>
        {questions.map((q, i) => (
          <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 8 }}>{q}</li>
        ))}
      </ol>
    </div>
  );

  const hrBox = (text: string) => (
    <div style={{ background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
      <div style={{ fontSize: labelSz, fontWeight: 800, color: amber, marginBottom: 6 }}>
        ✝️ {pt ? 'Perspectiva Histórico-Redentiva' : 'Redemptive-Historical Perspective'}
      </div>
      <p style={{ fontSize: smallSz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>{text}</p>
    </div>
  );

  const REFS = [
    { n: 1,  abnt: 'POWLISON, David. Seeing with New Eyes: Counseling and the Human Condition through the Lens of Scripture. Phillipsburg: Presbyterian and Reformed, 2003.' },
    { n: 2,  abnt: 'ADAMS, Jay E. Competent to Counsel: Introduction to Nouthetic Counseling. Grand Rapids: Zondervan, 1970.' },
    { n: 3,  abnt: 'TRIPP, Paul David. Instruments in the Redeemer\'s Hands: People in Need of Change Helping People in Need of Change. Phillipsburg: Presbyterian and Reformed, 2002.' },
    { n: 4,  abnt: 'WELCH, Edward T. Running Scared: Fear, Worry, and the God of Rest. Greensboro: New Growth Press, 2007.' },
    { n: 5,  abnt: 'LANE, Timothy S.; TRIPP, Paul David. How People Change. Greensboro: New Growth Press, 2008.' },
    { n: 6,  abnt: 'ADAMS, Jay E. A Theology of Christian Counseling: More Than Redemption. Grand Rapids: Zondervan, 1979.' },
    { n: 7,  abnt: 'BEEKE, Joel R. Family Worship. Grand Rapids: Reformation Heritage Books, 2009.' },
    { n: 8,  abnt: 'BAUCHAM, Voddie, Jr. Family Driven Faith: Doing What It Takes to Raise Sons and Daughters Who Walk with God. Wheaton: Crossway, 2007.' },
    { n: 9,  abnt: 'CROFT, Brian; SAVASTIO, Jim. The Pastor\'s Ministry: Biblical Priorities for Faithful Shepherds. Grand Rapids: Zondervan, 2015.' },
    { n: 10, abnt: 'TRIPP, Paul David. What Did You Expect? Redeeming the Realities of Marriage. Wheaton: Crossway, 2010.' },
    { n: 11, abnt: 'WELCH, Edward T. Side by Side: Walking with Others in Wisdom and Love. Wheaton: Crossway, 2015.' },
    { n: 12, abnt: 'JOHNSON, Eric L. Foundations for Soul Care: A Christian Psychology Proposal. Downers Grove: IVP Academic, 2007.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* HERO */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(80,160,255,0.13),rgba(45,212,191,0.10))', border: '1.5px solid rgba(80,160,255,0.30)', padding: '28px 28px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(28px,4vw,38px)', marginBottom: 10 }}>🌊⛏️</div>
        <div style={{ fontSize: 'clamp(20px,3.2vw,26px)', fontWeight: 900, color: blue, marginBottom: 8, lineHeight: 1.3 }}>
          {pt ? 'Aconselhamento Bíblico · Josué 3:1–17' : 'Biblical Counseling · Joshua 3:1–17'}
        </div>
        <div style={{ fontSize: titleSz, fontWeight: 700, color: amber, marginBottom: 14 }}>
          {pt ? 'Recursos para o Conselheiro de Casais e Famílias' : 'Resources for the Couples and Family Counselor'}
        </div>
        <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Este guia aplica os temas de Josué 3 — espera obediente, fé ativa antes da evidência, a presença de Deus como sustento, e solidariedade comunitária — ao aconselhamento bíblico de casais e famílias. Cada citação é identificada por nota de rodapé numerada; referências ABNT ao final.'
            : 'This guide applies the themes of Joshua 3 — obedient waiting, active faith before evidence, God\'s presence as sustenance, and communal solidarity — to biblical counseling of couples and families. Author citations are identified by numbered footnotes; full ABNT references at the end.'}
        </p>
      </div>

      {/* TRIAGE */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.12)', padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>
          🎯 {pt ? 'Problemas que esta Perícope Endereça — Guia de Triagem para o Conselheiro' : 'Problems this Pericope Addresses — Counselor Triage Guide'}
        </div>
        <p style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.50)', lineHeight: 1.65, margin: '0 0 16px 0', fontStyle: 'italic' }}>
          {pt
            ? 'Josué 3:1–17 é a perícope da travessia do Jordão: fé que avança antes de ver o resultado, a presença de Deus como sustento no meio da crise. O conselheiro pode utilizá-la quando o aconselhando enfrenta qualquer um dos cenários abaixo:'
            : 'Joshua 3:1–17 is the Jordan crossing pericope: faith that moves before seeing the result, God\'s presence as sustenance in the midst of crisis. The counselor may use it when the counselee faces any of the scenarios below:'}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 10 }}>
          {[
            { icon: '😶', cor: blue,   titulo: pt ? 'Paralisia diante do Impossível' : 'Paralysis before the Impossible',
              desc: pt ? 'Pessoas que reconhecem a promessa de Deus mas não conseguem avançar. O Jordão na cheia (Jo 3:15) é o pior momento para cruzar — e Deus escolhe exatamente esse. Para famílias paralisadas diante de crises que parecem intransponíveis.' : 'People who recognize God\'s promise but cannot move forward. The Jordan at flood stage (Josh 3:15) is the worst time to cross — yet God chooses exactly that moment. For families paralyzed before crises that seem impassable.' },
            { icon: '🙈', cor: purple, titulo: pt ? 'Fé Sem Evidência Prévia' : 'Faith Without Prior Evidence',
              desc: pt ? 'Os sacerdotes precisavam colocar os pés na água antes de as águas pararem (3:13–15). Para aconselhados que só obedecem quando veem o resultado garantido — o texto ensina que a fé bíblica age antes da prova.' : 'The priests had to put their feet in the water before the waters stopped (3:13–15). For counselees who only obey when the outcome is guaranteed — the text teaches that biblical faith acts before proof.' },
            { icon: '💪', cor: green,  titulo: pt ? 'Autossuficiência e Controle' : 'Self-Sufficiency and Control',
              desc: pt ? 'A Arca no meio do rio (3:17) diz que não é a força dos sacerdotes que sustenta a travessia, mas a presença de Deus. Para famílias que tentam atravessar crises na própria força espiritual ou emocional.' : 'The Ark in the middle of the river (3:17) declares it is not the priests\' strength that sustains the crossing, but God\'s presence. For families trying to cross crises on their own spiritual or emotional strength.' },
            { icon: '👨‍👩‍👧', cor: amber,  titulo: pt ? 'Famílias com Vulneráveis Silenciosos' : 'Families with Silent Vulnerable Members',
              desc: pt ? '"Todo o Israel passou em seco" (3:17): ninguém ficou para trás. Para líderes de família que avançam sem perceber quem está ficando para trás — filhos, cônjuges, idosos carregando pesos invisíveis.' : '"All Israel passed over on dry ground" (3:17): no one was left behind. For family leaders who advance without noticing who is being left behind — children, spouses, elderly carrying invisible burdens.' },
            { icon: '⏳', cor: pink,   titulo: pt ? 'Desânimo na Espera da Promessa' : 'Discouragement While Waiting for the Promise',
              desc: pt ? 'Israel esperou três dias antes de mover (3:1–2). Famílias no acampamento há muito tempo — a promessa parece próxima mas o movimento não vem. A santificação (v.5) no tempo de espera é o texto para este cenário.' : 'Israel waited three days before moving (3:1–2). Families who have been in the camp for a long time — the promise seems near but the movement does not come. Sanctification (v.5) during the waiting time is the text for this scenario.' },
            { icon: '👑', cor: green,  titulo: pt ? 'Liderança Sem Experiência Prévia' : 'Leadership Without Prior Experience',
              desc: pt ? 'Josué nunca tinha liderado uma travessia milagrosa antes. Para líderes de família que enfrentam situações sem precedente e sentem que deveriam ter o caminho resolvido antes de agir.' : 'Joshua had never led a miraculous crossing before. For family leaders facing unprecedented situations who feel they should have the path figured out before acting.' },
          ].map((p2, i) => (
            <div key={i} style={{ background: `${p2.cor}0D`, border: `1px solid ${p2.cor}33`, borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: labelSz, fontWeight: 900, color: p2.cor, marginBottom: 6 }}>{p2.icon} {p2.titulo}</div>
              <div style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.78)', lineHeight: 1.65 }}>{p2.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, borderRadius: 12, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '16px 20px' }}>
          <div style={{ fontSize: labelSz, fontWeight: 900, color: amber, letterSpacing: '0.16em', textTransform: 'uppercase' as const, marginBottom: 10 }}>
            ✝️ {pt ? 'Enquadramento Histórico-Redentivo para o Conselheiro' : 'Redemptive-Historical Frame for the Counselor'}
          </div>
          <p style={{ fontSize: bodySz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.80, margin: 0 }}>
            {pt
              ? 'O Jordão na época da colheita (Jo 3:15) é o momento mais improvável para cruzar — e Deus escolhe exatamente esse momento. Tipologicamente, o Jordão representa o juízo que separa a humanidade da herança prometida. Josué conduz Israel através das águas da morte assim como Cristo desceu ao Jordão para ser batizado (Mt 3:13–17), identificando-se com o pecado do Seu povo, e ressuscitou, abrindo a travessia definitiva. O batismo cristão (Rm 6:3–5) é a travessia do Jordão de cada crente: morto e ressuscitado em Cristo, a herança já está garantida mesmo antes de ver o outro lado. A Arca no centro do rio é o Cristo encarnado (Jo 1:14) habitando no meio do Seu povo: "Eis que estou convosco todos os dias" (Mt 28:20).'
              : 'The Jordan at flood stage (Josh 3:15) is the most unlikely time to cross — yet God chooses exactly that moment. Typologically, the Jordan represents the judgment that separates humanity from the promised inheritance. Joshua leads Israel through the waters of death just as Christ descended to the Jordan to be baptized (Matt 3:13–17), identifying with His people\'s sin, and rose again, opening the definitive crossing. Christian baptism (Rom 6:3–5) is each believer\'s Jordan crossing: dead and risen in Christ, the inheritance is already secured even before seeing the other side.'}
          </p>
        </div>
      </div>

      {/* SECTION 1 */}
      {sectionCard(blue, blueL, blueB, '⏳',
        pt ? 'Seção 1 — A Espera de Três Dias (Jo 3:1–2,5)' : 'Section 1 — The Three-Day Wait (Josh 3:1–2,5)',
        pt ? 'Josué 3:1–2,5 — Israel acampa três dias; "santificai-vos" antes do movimento' : 'Joshua 3:1–2,5 — Israel camps three days; "consecrate yourselves" before the movement',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'A espera de três dias não é inércia — é preparação obediente: Deus ordena a pausa (v.5: "santificai-vos") antes do milagre. O conselheiro trabalha com famílias que interpretam a espera como sinal do abandono de Deus.' : 'The three-day wait is not inertia — it is obedient preparation: God orders the pause (v.5: "consecrate yourselves") before the miracle. The counselor works with families who interpret waiting as a sign of God\'s abandonment.',
              pt ? 'A santificação no tempo de espera é o tema: o que Deus está formando no aconselhando durante o período que antecede o movimento? A pausa tem propósito pedagógico.' : 'Sanctification during the waiting time is the theme: what is God forming in the counselee during the period before the movement? The pause has a pedagogical purpose.',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'A santificação não é a condição da bênção, mas o reconhecimento de que somente Deus pode trazer o que prometeu. O período de espera é onde Deus trabalha a confiança que a crise vai exigir. O conselheiro que apressar o movimento roubará do aconselhando o fruto da espera.'
               : 'Sanctification is not the condition of blessing, but the recognition that only God can bring what He promised. The waiting period is where God works the trust that the crisis will demand. The counselor who rushes the movement will rob the counselee of the fruit of waiting.',
            'Jay E. Adams', blue, 2)}
          {quoteBox(
            pt ? 'Pessoas em crise interpretam a espera como falha de Deus. O conselheiro bíblico reposiciona: a espera é o cenário onde Deus realiza Sua obra mais profunda — não apesar do silêncio, mas através dele. Onde estão os ídolos de controle e imediatismo que tornam a espera insuportável?'
               : 'People in crisis interpret waiting as God\'s failure. The biblical counselor repositions: waiting is the scenario where God accomplishes His deepest work — not despite the silence, but through it. Where are the idols of control and immediacy that make waiting unbearable?',
            'David Powlison', green, 1)}
          {quoteBox(
            pt ? 'Israel não ficou em casa esperando — foi ao acampamento junto, acampou junto, foi santificado junto. A espera bíblica não é isolamento: é comunidade aguardando o movimento de Deus com um só coração. Famílias que esperam separadas, cada membro em seu próprio processamento, perdem o poder da espera compartilhada.'
               : 'Israel did not stay home waiting — it went to the camp together, camped together, was consecrated together. Biblical waiting is not isolation: it is community awaiting God\'s movement with one heart. Families that wait separately, each member in their own processing, lose the power of shared waiting.',
            'Paul David Tripp', amber, 3)}
          {hrBox(pt
            ? 'Cristo também esperou — três dias no sepulcro (Mt 12:40; Jo 2:19). O silêncio do Sábado Santo é o silêncio máximo: o Filho de Deus enterrado, o povo disperso, toda esperança aparentemente morta. E a ressurreição no terceiro dia prova que o silêncio de Deus nunca é abandono, mas preparação do maior milagre (Rm 8:28). O conselheiro apresenta o Sábado Santo como a âncora teológica para todo período de espera: Deus está agindo mesmo quando não parece.'
            : 'Christ also waited — three days in the tomb (Matt 12:40; John 2:19). The silence of Holy Saturday is the ultimate silence: the Son of God buried, the people scattered, all hope apparently dead. And the resurrection on the third day proves that God\'s silence is never abandonment, but preparation for the greatest miracle (Rom 8:28). The counselor presents Holy Saturday as the theological anchor for every waiting period.')}
          {questionsBox([
            pt ? '"Em que área de sua vida ou família você está acampado esperando um movimento de Deus? Há quanto tempo?"'
               : '"In what area of your life or family are you camped waiting for a movement of God? For how long?"',
            pt ? '"Como você tem interpretado esse período de espera — como abandono ou como preparação? O que muda se você o lê como Sábado Santo?"'
               : '"How have you been interpreting this waiting period — as abandonment or preparation? What changes if you read it as Holy Saturday?"',
            pt ? '"O que significa, concretamente, santificar-se durante a espera — o que Deus pode estar formando em você neste período?"'
               : '"What does it mean, concretely, to consecrate yourself during the wait — what might God be forming in you during this period?"',
          ], blue)}
        </>
      )}

      {/* SECTION 2 */}
      {sectionCard(amber, amberL, amberB, '🦶',
        pt ? 'Seção 2 — Os Pés na Água Primeiro (Jo 3:8,13–15) — Centro ◉' : 'Section 2 — Feet in the Water First (Josh 3:8,13–15) — Center ◉',
        pt ? 'Josué 3:13–15 — sacerdotes entram na água antes das águas pararem; fé que age antes da evidência' : 'Joshua 3:13–15 — priests enter the water before the waters stop; faith that acts before evidence',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'Núcleo teológico da perícope: a fé bíblica é ativa antes da evidência completa (Hb 11:1). O ciclo vicioso "só mudo quando vir resultados garantidos" é o oposto do modelo de Josué 3.' : 'Theological core of the pericope: biblical faith is active before complete evidence (Heb 11:1). The vicious cycle "I will only change when I see guaranteed results" is the opposite of the Joshua 3 model.',
              pt ? 'Os sacerdotes não entraram na água depois de serem convencidos intelectualmente — entraram em obediência ao comando. O conselheiro distingue: fé não é certeza emocional prévia, é obediência ao que Deus já revelou.' : 'The priests did not enter the water after being intellectually convinced — they entered in obedience to the command. The counselor distinguishes: faith is not prior emotional certainty, it is obedience to what God has already revealed.',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'A obediência precede o entendimento completo. Deus não pede que você veja o fundo do rio antes de entrar — ele pede que você entre confiando na promessa já revelada. O conselheiro que espera que o aconselhando se sinta pronto para agir adia indefinidamente a mudança.'
               : 'Obedience precedes complete understanding. God does not ask you to see the bottom of the river before entering — He asks you to enter trusting the promise already revealed. The counselor who waits for the counselee to feel ready to act indefinitely postpones change.',
            'David Powlison', amber, 1)}
          {quoteBox(
            pt ? 'Timothy Lane e eu costumamos dizer: mudança bíblica começa com um passo de obediência, não com um sentimento de prontidão. Os sacerdotes com os pés na lama são o modelo: entrem no rio — as águas param depois, não antes.'
               : 'Timothy Lane and I often say: biblical change begins with a step of obedience, not with a feeling of readiness. The priests with their feet in the mud are the model: enter the river — the waters stop after, not before.',
            'Paul David Tripp', blue, 5)}
          {quoteBox(
            pt ? 'A paralisia espiritual de muitas famílias não é falta de fé intelectual — é o medo de dar o passo antes de ver. O conselheiro identifica o medo subjacente: medo de fracasso, medo de julgamento, medo de que Deus não sustente. E apresenta o Jordão: Deus sustentou os pés antes de secar o leito.'
               : 'The spiritual paralysis of many families is not lack of intellectual faith — it is the fear of taking the step before seeing. The counselor identifies the underlying fear: fear of failure, fear of judgment, fear that God will not sustain. And presents the Jordan: God sustained the feet before drying the riverbed.',
            'Edward T. Welch', green, 4)}
          {hrBox(pt
            ? 'O batismo de Jesus no Jordão (Mt 3:13–17) é o momento em que o Filho entra nas águas do juízo que nos pertenciam — sem evidência prévia de aprovação humana, apenas com a voz do Pai: "Este é o meu Filho amado." Cristo colocou os pés primeiro para que as águas do julgamento eterno fossem divididas para sempre. Quem é batizado em Cristo (Rm 6:3–4) recebe a herança desta obediência ativa: atravessa o juízo em Seu nome, não pelos próprios méritos. A fé que age no aconselhado é o eco da obediência de Cristo — não a causa da salvação, mas a expressão dela.'
            : 'The baptism of Jesus in the Jordan (Matt 3:13–17) is the moment the Son enters the waters of judgment that belonged to us — without prior human approval, only with the Father\'s voice: "This is my beloved Son." Christ put His feet in first so the waters of eternal judgment would be divided forever. Those baptized into Christ (Rom 6:3–4) receive the inheritance of this active obedience: they cross judgment in His name, not by their own merits.')}
          {questionsBox([
            pt ? '"Em qual decisão familiar você está esperando garantias antes de obedecer ao que Deus já revelou? Que garantia você está exigindo que Deus não prometeu?"'
               : '"In which family decision are you waiting for guarantees before obeying what God has already revealed? What guarantee are you requiring that God did not promise?"',
            pt ? '"Qual é o passo de obediência que você pode dar esta semana — antes de ver o resultado — baseado no que você já sabe ser vontade de Deus?"'
               : '"What is the step of obedience you can take this week — before seeing the result — based on what you already know to be God\'s will?"',
            pt ? '"Cristo entrou no Jordão do juízo por você sem garantias humanas. Como essa realidade muda a forma como você enfrenta o seu Jordão particular?"'
               : '"Christ entered the Jordan of judgment for you without human guarantees. How does that reality change how you face your particular Jordan?"',
          ], amber)}
        </>
      )}

      {/* SECTION 3 */}
      {sectionCard(green, greenL, greenB, '📦',
        pt ? 'Seção 3 — A Arca no Centro do Rio (Jo 3:17)' : 'Section 3 — The Ark at the Center of the River (Josh 3:17)',
        pt ? 'Josué 3:17 — a Arca permanece parada no meio do Jordão seco; presença de Deus como sustento da travessia' : 'Joshua 3:17 — the Ark stands still in the midst of the dry Jordan; God\'s presence as sustenance of the crossing',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'A Arca no meio do rio seco: não é a força dos sacerdotes que sustenta a travessia — é a presença de Deus. Famílias em crise precisam aprender: "não é minha força espiritual que me sustenta — é Cristo no centro da minha travessia."' : 'The Ark in the middle of the dry river: it is not the priests\' strength that sustains the crossing — it is God\'s presence. Families in crisis need to learn: "it is not my spiritual strength that sustains me — it is Christ at the center of my crossing."',
              pt ? 'O aconselhamento que apela apenas à força de vontade humana abandona o aconselhando na beira do rio. O centro da mudança bíblica é a presença e a obra de Cristo, não o esforço moral do indivíduo.' : 'Counseling that appeals only to human willpower abandons the counselee at the riverbank. The center of biblical change is the presence and work of Christ, not the individual\'s moral effort.',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'Não somos chamados a cruzar sozinhos. A Arca no centro do rio grita: Deus mesmo sustenta o caminho de cada um dos seus. O conselheiro que desloca Cristo do centro e coloca técnicas, motivação ou força de vontade no centro traiu o aconselhamento bíblico antes de começar.'
               : 'We are not called to cross alone. The Ark at the center of the river shouts: God himself sustains the path of each of His own. The counselor who displaces Christ from the center and places techniques, motivation or willpower at the center has betrayed biblical counseling before it began.',
            'Paul David Tripp', green, 3)}
          {quoteBox(
            pt ? 'O que move o coração humano não é informação adicional nem força de vontade renovada — é o encontro com a presença de Deus que sustenta no meio das águas. A crise que parecia destruir revela que há alguém no centro do rio que não se move.'
               : 'What moves the human heart is not additional information or renewed willpower — it is the encounter with God\'s presence that sustains in the midst of the waters. The crisis that seemed to destroy reveals that there is someone at the center of the river who does not move.',
            'David Powlison', blue, 1)}
          {quoteBox(
            pt ? 'A família reformada que cultiva o culto doméstico está colocando a Arca no centro do lar — a Palavra de Deus, a oração, os sacramentos. Esses meios de graça não são extras devocionais; são a Arca no meio do rio que sustenta a família na travessia.'
               : 'The Reformed family that cultivates family worship is placing the Ark at the center of the home — God\'s Word, prayer, the sacraments. These means of grace are not devotional extras; they are the Ark in the middle of the river that sustains the family in the crossing.',
            'Joel R. Beeke', amber, 7)}
          {hrBox(pt
            ? 'A Arca como símbolo da presença de Deus aponta para a encarnação: "o Verbo se fez carne e habitou entre nós" (Jo 1:14). Na cruz, Cristo permaneceu no centro do juízo — as águas da ira estacionadas — para que todo o povo de Deus atravessasse. Na ressurreição, ele prometeu: "eis que estou convosco todos os dias, até a consumação do século" (Mt 28:20). O conselheiro aponta sempre para este Cristo presente: Ele está no meio do seu Jordão hoje — não como observador distante, mas como Arca no centro.'
            : 'The Ark as a symbol of God\'s presence points to the incarnation: "the Word became flesh and dwelt among us" (John 1:14). On the cross, Christ remained at the center of judgment — the waters of wrath stilled — so that all of God\'s people could cross. In the resurrection He promised: "I am with you always, to the end of the age" (Matt 28:20). The counselor always points to this present Christ: He is in the middle of your Jordan today — not as a distant observer, but as the Ark at the center.')}
          {questionsBox([
            pt ? '"O que está no centro da sua estratégia familiar para atravessar esta crise — força própria, bons conselhos, esperança de que melhore? Ou a presença de Cristo?"'
               : '"What is at the center of your family strategy for crossing this crisis — your own strength, good advice, hope that it gets better? Or Christ\'s presence?"',
            pt ? '"Quais são as práticas concretas — oração, Palavra, culto familiar — que você tem cultivado como a Arca no centro do seu lar?"'
               : '"What are the concrete practices — prayer, the Word, family worship — that you have been cultivating as the Ark at the center of your home?"',
            pt ? '"Se Cristo prometeu estar com você todos os dias, o que muda na forma como você enfrenta esta semana?"'
               : '"If Christ promised to be with you every day, what changes in how you face this week?"',
          ], green)}
        </>
      )}

      {/* SECTION 4 */}
      {sectionCard(purple, purpleL, purpleB, '👨‍👩‍👧',
        pt ? 'Seção 4 — Todo o Israel Atravessou (Jo 3:17b)' : 'Section 4 — All Israel Crossed (Josh 3:17b)',
        pt ? 'Josué 3:17b — "todo o Israel passou em seco"; ninguém foi deixado para trás na comunidade de Deus' : 'Joshua 3:17b — "all Israel passed over on dry ground"; no one was left behind in God\'s community',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? '"Todo o Israel passou em seco" (v.17): ninguém ficou para trás. Para líderes de família, a pergunta é: quem está atravessando em silêncio sem que eu perceba? Filhos, cônjuges, idosos carregando pesos invisíveis.' : '"All Israel passed over on dry ground" (v.17): no one was left behind. For family leaders, the question is: who is crossing in silence without my noticing? Children, spouses, elderly carrying invisible burdens.',
              pt ? 'A liderança de Josué é avaliada não apenas por ele ter atravessado, mas por ter garantido que todos atravessaram. O líder cristão de família é responsável pelos vulneráveis silenciosos — não apenas pelo progresso pessoal.' : 'Joshua\'s leadership is evaluated not only by his having crossed, but by his having ensured all crossed. The Christian family leader is responsible for the silent vulnerable — not only for personal progress.',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'A liderança bíblica de família não é deixar o fraco para trás enquanto o forte avança. É ajustar o passo para que todos cheguem. O conselheiro pergunta ao líder de família: quem você está carregando? Quem você está esperando? Quem está no grupo e ainda não atravessou?'
               : 'Biblical family leadership is not leaving the weak behind while the strong advance. It is adjusting the pace so everyone arrives. The counselor asks the family leader: who are you carrying? Who are you waiting for? Who is in the group and has not yet crossed?',
            'Edward T. Welch', purple, 11)}
          {quoteBox(
            pt ? 'O pai bíblico que guia a família é aquele que não apenas atravessa o Jordão, mas conta as cabeças antes e depois. O discipulado familiar não é performance pessoal — é responsabilidade comunitária de garantir que os mais fracos tenham voz e lugar na travessia.'
               : 'The biblical father who guides the family is one who not only crosses the Jordan but counts heads before and after. Family discipleship is not personal performance — it is communal responsibility to ensure the weakest have voice and place in the crossing.',
            'Voddie Baucham Jr.', amber, 8)}
          {quoteBox(
            pt ? 'O ministério "uns aos outros" não é responsabilidade apenas do pastor — é a prática do lar. Quem está chorando sozinho na sua casa enquanto você atravessa o Jordão em frente? O conselheiro cria espaço para nomear os vulneráveis invisíveis.'
               : 'The "one another" ministry is not only the pastor\'s responsibility — it is the practice of the home. Who is crying alone in your house while you cross the Jordan ahead? The counselor creates space to name the invisible vulnerable.',
            'David Powlison', green, 1)}
          {hrBox(pt
            ? 'Cristo não veio apenas pelos fortes. Ele "levou as nossas enfermidades e sobre si tomou as nossas dores" (Is 53:4; Mt 8:17). Na consumação, "uma grande multidão que ninguém podia contar, de todas as nações, tribos, povos e línguas" (Ap 7:9) estará diante do trono — ninguém foi deixado para trás na redenção de Cristo. O lar cristão antecipa este milagre escatológico quando cuida dos vulneráveis. A família que avança sem os frágeis contradiz o Evangelho que professa.'
            : 'Christ did not come only for the strong. He "took up our infirmities and bore our diseases" (Isa 53:4; Matt 8:17). At the consummation, "a great multitude that no one could count, from every nation, tribe, people and language" (Rev 7:9) will stand before the throne — no one was left behind in Christ\'s redemption. The Christian home anticipates this eschatological miracle when it cares for the vulnerable.')}
          {questionsBox([
            pt ? '"Quem na sua família está atravessando o Jordão em silêncio, sem voz para pedir ajuda? Nomeie essa pessoa agora."'
               : '"Who in your family is crossing the Jordan in silence, without a voice to ask for help? Name that person now."',
            pt ? '"Como você pode ajustar seu ritmo de liderança esta semana para incluir os mais vulneráveis — perguntar diretamente, ouvir sem resolver, estar presente?"'
               : '"How can you adjust your leadership pace this week to include the most vulnerable — ask directly, listen without fixing, be present?"',
            pt ? '"O Evangelho diz que Cristo carregou os fracos. Como essa realidade te transforma de líder que avança para pastor que cuida?"'
               : '"The Gospel says Christ carried the weak. How does that reality transform you from a leader who advances to a pastor who cares?"',
          ], purple)}
        </>
      )}

      {/* SECTION 5 — Authors */}
      <div style={{ borderRadius: 16, background: pinkL, border: `1.5px solid ${pinkB}`, padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: pink, marginBottom: 16 }}>
          📚 {pt ? 'Seção 5 — Autores e Obras de Referência' : 'Section 5 — Reference Authors and Works'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 12, marginBottom: 16 }}>
          {[
            { fn: 2,  name: 'Jay E. Adams',           works: 'Competent to Counsel (1970); A Theology of Christian Counseling (1979)', desc: pt ? 'Pioneiro do aconselhamento noutético/bíblico; obediência como resposta à Palavra' : 'Pioneer of nouthetic/biblical counseling; obedience as response to the Word', color: blue },
            { fn: 1,  name: 'David Powlison',         works: 'Seeing with New Eyes (2003); Speaking Truth in Love (2005)', desc: pt ? 'O coração por trás do comportamento; ídolos de controle e imediatismo' : 'The heart behind behavior; idols of control and immediacy', color: green },
            { fn: 3,  name: 'Paul David Tripp',       works: 'Instruments in the Redeemer\'s Hands (2002); How People Change (2008)', desc: pt ? 'Cristo no centro da mudança; obediência ativa antes da evidência' : 'Christ at the center of change; active obedience before evidence', color: amber },
            { fn: 4,  name: 'Edward T. Welch',        works: 'Running Scared (2007); Side by Side (2015)', desc: pt ? 'Medo como paralisia; ministério de cuidado aos vulneráveis' : 'Fear as paralysis; ministry of care for the vulnerable', color: purple },
            { fn: 7,  name: 'Joel R. Beeke',          works: 'Family Worship (2009); Parenting by God\'s Promises (2011)', desc: pt ? 'Culto doméstico como a Arca no centro do lar reformado' : 'Family worship as the Ark at the center of the Reformed home', color: blue },
            { fn: 8,  name: 'Voddie Baucham Jr.',     works: 'Family Driven Faith (2007)', desc: pt ? 'Responsabilidade do pai na travessia de toda a família' : 'Father\'s responsibility in the crossing of the whole family', color: pink },
            { fn: 9,  name: 'Brian Croft & Jim Savastio', works: 'The Pastor\'s Ministry (2015)', desc: pt ? 'Cuidado pastoral; ninguém fica para trás no rebanho' : 'Pastoral care; no one left behind in the flock', color: green },
          ].map((a, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', padding: '14px 16px' }}>
              <div style={{ fontSize: labelSz, fontWeight: 900, color: a.color, marginBottom: 4 }}>{a.name}{fn(a.fn)}</div>
              <div style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.50)', marginBottom: 6, fontStyle: 'italic' }}>{a.works}</div>
              <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{a.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '12px 16px', borderLeft: `3px solid ${pink}` }}>
          <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
            {pt
              ? 'Conselheiro bíblico reformado diante de Josué 3: não pergunte apenas "por que você não avança?" — pergunte "o que você está colocando no centro do rio no lugar da Arca?" Onde está Cristo na estratégia desta família?'
              : 'Reformed biblical counselor before Joshua 3: do not only ask "why are you not moving forward?" — ask "what are you placing at the center of the river instead of the Ark?" Where is Christ in this family\'s strategy?'}
          </p>
        </div>
      </div>

      {/* SECTION 6 — 4-Session Plan */}
      <div style={{ borderRadius: 16, background: greenL, border: `1.5px solid ${greenB}`, padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: green, marginBottom: 16 }}>
          🗓️ {pt ? 'Seção 6 — Plano de 4 Sessões baseado em Josué 3' : 'Section 6 — 4-Session Plan based on Joshua 3'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              n: '1', ref: 'Josué 3:1–2,5', color: blue,
              title: pt ? 'A Espera Obediente' : 'Obedient Waiting',
              desc: pt
                ? 'Mapear o "Jordão" atual da família — qual a barreira que parece intransponível? Ler Jo 3:1–2,5. Âncora histórico-redentiva: Cristo esperou três dias no sepulcro (Mt 12:40) — o silêncio de Deus nunca é abandono, é preparação do maior milagre. Adams[2], Powlison[1].'
                : 'Map the family\'s current "Jordan" — what barrier seems impassable? Read Josh 3:1–2,5. Redemptive anchor: Christ waited three days in the tomb (Matt 12:40) — God\'s silence is never abandonment, but preparation for the greatest miracle. Adams[2], Powlison[1].',
            },
            {
              n: '2', ref: 'Josué 3:8,13–15', color: amber,
              title: pt ? 'Os Pés na Água — Fé Ativa' : 'Feet in the Water — Active Faith',
              desc: pt
                ? 'Identificar área de paralisia espiritual e definir um passo de obediência antes de ver o resultado. Ler Jo 3:13–15. Âncora histórico-redentiva: Jesus entrou no Jordão do juízo por você (Mt 3:13–17; Rm 6:3–4) — sua obediência é eco da Dele, não geração de mérito próprio. Tripp[3,5], Welch[4].'
                : 'Identify an area of spiritual paralysis and define one step of obedience before seeing the result. Read Josh 3:13–15. Redemptive anchor: Jesus entered the Jordan of judgment for you (Matt 3:13–17; Rom 6:3–4) — your obedience echoes His, not self-generated merit. Tripp[3,5], Welch[4].',
            },
            {
              n: '3', ref: 'Josué 3:17', color: green,
              title: pt ? 'A Arca no Centro — Cristo na Crise' : 'The Ark at Center — Christ in Crisis',
              desc: pt
                ? 'Revisitar padrão de controle vs. confiança: onde a família tem buscado própria força no lugar da presença de Deus? Ler Jo 3:17. Âncora histórico-redentiva: o Verbo habitou entre nós (Jo 1:14); Cristo prometeu "estou convosco todos os dias" (Mt 28:20). Beeke[7], Powlison[1].'
                : 'Revisit control vs. trust pattern: where has the family been seeking its own strength instead of God\'s presence? Read Josh 3:17. Redemptive anchor: the Word dwelt among us (John 1:14); Christ promised "I am with you always" (Matt 28:20). Beeke[7], Powlison[1].',
            },
            {
              n: '4', ref: 'Josué 3:17b', color: purple,
              title: pt ? 'Ninguém Fica para Trás' : 'No One Left Behind',
              desc: pt
                ? 'Nomear os vulneráveis silenciosos da família e criar estruturas de cuidado visível. Ler Jo 3:17b. Âncora histórico-redentiva: Cristo carregou nossas enfermidades (Is 53:4; Mt 8:17); na consumação toda nação atravessa junto (Ap 7:9) — o lar cristão antecipa este milagre. Welch[11], Baucham[8].'
                : 'Name the family\'s silent vulnerable and create visible care structures. Read Josh 3:17b. Redemptive anchor: Christ bore our infirmities (Isa 53:4; Matt 8:17); at consummation all nations cross together (Rev 7:9) — the Christian home anticipates this miracle. Welch[11], Baucham[8].',
            },
          ].map((s) => (
            <div key={s.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: '#000' }}>{s.n}</div>
              <div>
                <div style={{ fontSize: titleSz, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 6 }}>{s.ref}</div>
                <div style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REFERENCIAS ABNT */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.10)', padding: '22px 24px', marginBottom: 8 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.50)', marginBottom: 16 }}>
          📎 {pt ? 'Referências Bibliográficas (ABNT)' : 'Bibliographic References (ABNT)'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {REFS.map((r) => (
            <div key={r.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, minWidth: 28, height: 22, borderRadius: 6, background: amberL, border: `1px solid ${amberB}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: smallSz, fontWeight: 900, color: amber }}>{r.n}</span>
              <p style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, margin: 0, fontFamily: 'monospace' }}>{r.abnt}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── Aconselhamento Bíblico Josué 257 ────────────────────────────────
function AconselhamentoBiblicoJosue257FamiliaSection({ pt }: { pt: boolean }) {
  const amber  = 'rgba(255,180,50,1)';
  const amberL = 'rgba(255,180,50,0.10)';
  const amberB = 'rgba(255,180,50,0.28)';
  const green  = 'rgba(52,211,153,1)';
  const greenL = 'rgba(52,211,153,0.10)';
  const greenB = 'rgba(52,211,153,0.28)';
  const blue   = 'rgba(80,200,255,1)';
  const blueL  = 'rgba(80,200,255,0.10)';
  const blueB  = 'rgba(80,200,255,0.28)';
  const purple = 'rgba(180,120,255,1)';
  const purpleL= 'rgba(180,120,255,0.10)';
  const purpleB= 'rgba(180,120,255,0.28)';
  const pink   = 'rgba(255,120,160,1)';
  const pinkL  = 'rgba(255,120,160,0.10)';
  const pinkB  = 'rgba(255,120,160,0.28)';

  const titleSz = 'clamp(18px,2.8vw,22px)';
  const bodySz  = 'clamp(16px,2.4vw,19px)';
  const labelSz = 'clamp(14px,2vw,16px)';
  const smallSz = 'clamp(13px,1.7vw,15px)';

  const fn = (n: number) => (
    <sup style={{ fontSize: '0.70em', fontWeight: 900, color: amber, marginLeft: 2, verticalAlign: 'super', lineHeight: 0 }}>[{n}]</sup>
  );

  const sectionCard = (accent: string, accentL: string, accentB: string, emoji: string, heading: string, theme: string, children: React.ReactNode) => (
    <div style={{ borderRadius: 16, background: accentL, border: `1.5px solid ${accentB}`, padding: '22px 24px', marginBottom: 20 }}>
      <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: accent, marginBottom: 8 }}>
        {emoji} {heading}
      </div>
      <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.55)', marginBottom: 14, fontStyle: 'italic' }}>{theme}</div>
      {children}
    </div>
  );

  const quoteBox = (text: string, author: string, accent: string, fnNum: number) => (
    <div style={{ background: 'rgba(0,0,0,0.25)', borderLeft: `3px solid ${accent}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', marginBottom: 12 }}>
      <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, margin: '0 0 6px 0', fontStyle: 'italic' }}>"{text}"</p>
      <div style={{ fontSize: labelSz, color: accent, fontWeight: 700 }}>— {author}{fn(fnNum)}</div>
    </div>
  );

  const questionsBox = (questions: string[], accent: string) => (
    <div style={{ background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '14px 18px', marginTop: 14 }}>
      <div style={{ fontSize: labelSz, fontWeight: 900, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
        {pt ? 'Perguntas para o Conselheiro' : 'Counselor Questions'}
      </div>
      <ol style={{ margin: 0, paddingLeft: 20 }}>
        {questions.map((q, i) => (
          <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 8 }}>{q}</li>
        ))}
      </ol>
    </div>
  );

  const REFS = [
    { n: 1,  abnt: 'POWLISON, David. Seeing with New Eyes: Counseling and the Human Condition through the Lens of Scripture. Phillipsburg: Presbyterian and Reformed, 2003.' },
    { n: 2,  abnt: 'ADAMS, Jay E. Competent to Counsel: Introduction to Nouthetic Counseling. Grand Rapids: Zondervan, 1970.' },
    { n: 3,  abnt: 'TRIPP, Paul David. Instruments in the Redeemer\'s Hands: People in Need of Change Helping People in Need of Change. Phillipsburg: Presbyterian and Reformed, 2002.' },
    { n: 4,  abnt: 'WELCH, Edward T. Running Scared: Fear, Worry, and the God of Rest. Greensboro: New Growth Press, 2007.' },
    { n: 5,  abnt: 'POWLISON, David. Speaking Truth in Love: Counsel in Community. Greensboro: New Growth Press, 2005.' },
    { n: 6,  abnt: 'ADAMS, Jay E. A Theology of Christian Counseling: More Than Redemption. Grand Rapids: Zondervan, 1979.' },
    { n: 7,  abnt: 'BEEKE, Joel R. Family Worship. Grand Rapids: Reformation Heritage Books, 2009.' },
    { n: 8,  abnt: 'BAUCHAM, Voddie, Jr. Family Driven Faith: Doing What It Takes to Raise Sons and Daughters Who Walk with God. Wheaton: Crossway, 2007.' },
    { n: 9,  abnt: 'CROFT, Brian; SAVASTIO, Jim. The Pastor\'s Ministry: Biblical Priorities for Faithful Shepherds. Grand Rapids: Zondervan, 2015.' },
    { n: 10, abnt: 'TRIPP, Paul David. What Did You Expect? Redeeming the Realities of Marriage. Wheaton: Crossway, 2010.' },
    { n: 11, abnt: 'ADAMS, Jay E. Christian Living in the Home. Phillipsburg: Presbyterian and Reformed, 1972.' },
    { n: 12, abnt: 'WELCH, Edward T. Side by Side: Walking with Others in Wisdom and Love. Wheaton: Crossway, 2015.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* HERO */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(255,180,50,0.15),rgba(52,211,153,0.10))', border: `1.5px solid ${amberB}`, padding: '28px 28px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(28px,4vw,38px)', marginBottom: 10 }}>🪨📿</div>
        <div style={{ fontSize: 'clamp(20px,3.2vw,26px)', fontWeight: 900, color: amber, marginBottom: 8, lineHeight: 1.3 }}>
          {pt ? 'Aconselhamento Bíblico · Josué 4:1–24; 5:1' : 'Biblical Counseling · Joshua 4:1–24; 5:1'}
        </div>
        <div style={{ fontSize: titleSz, fontWeight: 700, color: green, marginBottom: 14 }}>
          {pt ? 'Recursos para o Conselheiro de Casais e Famílias' : 'Resources for the Couples and Family Counselor'}
        </div>
        <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Este guia oferece estrutura clínico-pastoral para conselheiros bíblicos que trabalham com casais e famílias, a partir dos temas centrais de Josué 4. As citações dos autores são identificadas por notas de rodapé numeradas; as referências ABNT completas constam ao final.'
            : 'This guide offers a clinical-pastoral framework for biblical counselors working with couples and families, drawn from the central themes of Joshua 4. Author citations are identified by numbered footnotes; full ABNT references appear at the end.'}
        </p>
      </div>

      {/* TRIAGE */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.12)', padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>
          🎯 {pt ? 'Problemas que esta Perícope Endereça — Guia de Triagem para o Conselheiro' : 'Problems this Pericope Addresses — Counselor Triage Guide'}
        </div>
        <p style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.50)', lineHeight: 1.65, margin: '0 0 16px 0', fontStyle: 'italic' }}>
          {pt
            ? 'Josué 4:1–24 é a perícope das pedras memoriais: doze pedras tiradas do meio do Jordão e erigidas como monumento para que as gerações futuras perguntem "que significam estas pedras?" O conselheiro pode utilizá-la quando o aconselhando enfrenta qualquer um dos cenários abaixo:'
            : 'Joshua 4:1–24 is the pericope of the memorial stones: twelve stones taken from the middle of the Jordan and erected as a monument so that future generations would ask "what do these stones mean?" The counselor may use it when the counselee faces any of the scenarios below:'}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 10 }}>
          {[
            { icon: '🪨', cor: amber,  titulo: pt ? 'Família sem Memória Espiritual'         : 'Family without Spiritual Memory',
              desc: pt ? 'Famílias que não têm como responder à pergunta dos filhos: "o que Deus fez por nós?" Ausência de marcos de gratidão na história familiar. Diagnóstico central: nenhuma pedra memorial foi erguida.' : 'Families with no answer to the children\'s question: "what did God do for us?" Absence of gratitude milestones in the family story. Central diagnosis: no memorial stone was erected.' },
            { icon: '👶', cor: blue,   titulo: pt ? 'Filhos sem Herança de Fé'               : 'Children without a Faith Heritage',
              desc: pt ? '"Quando vossos filhos perguntarem" (4:6,21) — mas os pais não têm resposta. Pais de primeira geração cristã que não sabem como transmitir deliberadamente a fé. A questão dos filhos expõe a lacuna da transmissão.' : '"When your children ask" (4:6,21) — but the parents have no answer. First-generation Christian parents who do not know how to deliberately transmit faith. The children\'s question exposes the transmission gap.' },
            { icon: '🧠', cor: green,  titulo: pt ? 'Gratidão Esquecida — Ingratidão Crônica' : 'Forgotten Gratitude — Chronic Ingratitude',
              desc: pt ? 'Casais e famílias que focam apenas nos problemas presentes, esquecendo as obras de Deus no passado. A ausência de memória gera ansiedade e incredulidade. As pedras memoriais são o remédio bíblico para a ingratidão.' : 'Couples and families focused only on present problems, forgetting God\'s past works. The absence of memory generates anxiety and unbelief. Memorial stones are the biblical remedy for ingratitude.' },
            { icon: '🔗', cor: purple, titulo: pt ? 'Ruptura Geracional — Fé que Não Passa'   : 'Generational Rupture — Faith that Does Not Pass',
              desc: pt ? 'Filhos adultos que se afastaram da fé dos pais; pais que não entendem por que a fé não foi transmitida. O texto diagnostica: a memória deliberada dos atos de Deus é o veículo da transmissão geracional da fé.' : 'Adult children who drifted from parents\' faith; parents who do not understand why faith was not transmitted. The text diagnoses: deliberate memory of God\'s acts is the vehicle of generational faith transmission.' },
            { icon: '😔', cor: pink,   titulo: pt ? 'Luto por Herança Espiritual Não Recebida' : 'Grief over Unreceived Spiritual Heritage',
              desc: pt ? 'Adultos convertidos sem família cristã que lamentam não terem recebido as pedras memoriais dos pais. A perícope oferece esperança: as pedras podem ser erguidas em qualquer geração — você pode ser o primeiro construtor.' : 'Converted adults without a Christian family who grieve not having received parents\' memorial stones. The pericope offers hope: stones can be erected in any generation — you can be the first builder.' },
            { icon: '🏆', cor: amber,  titulo: pt ? 'Identidade Familiar sem Fundamento'     : 'Family Identity without Foundation',
              desc: pt ? 'Famílias sem narrativa comum de fé — cada membro tem sua própria história com Deus, mas não há história compartilhada. As doze pedras erguidas juntos forjam identidade coletiva. A família que narra junta, permanece junta.' : 'Families without a common faith narrative — each member has their own story with God, but no shared story. The twelve stones erected together forge collective identity. The family that narrates together, remains together.' },
          ].map((p2, i) => (
            <div key={i} style={{ background: `${p2.cor}0D`, border: `1px solid ${p2.cor}33`, borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: labelSz, fontWeight: 900, color: p2.cor, marginBottom: 6 }}>{p2.icon} {p2.titulo}</div>
              <div style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.78)', lineHeight: 1.65 }}>{p2.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18, borderRadius: 12, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '16px 20px' }}>
          <div style={{ fontSize: labelSz, fontWeight: 900, color: amber, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>
            ✝️ {pt ? 'Enquadramento Histórico-Redentivo para o Conselheiro' : 'Redemptive-Historical Frame for the Counselor'}
          </div>
          <p style={{ fontSize: bodySz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.80, margin: 0 }}>
            {pt
              ? 'As doze pedras tiradas do leito seco do Jordão apontam para a morte e ressurreição de Cristo. O Jordão é o lugar do juízo — e as pedras tiradas de dentro de sua corrente são a evidência do milagre soberano. O batismo cristão é a pedra memorial definitiva: "sabendo que nosso velho homem foi crucificado com ele... a fim de que não mais sirvamos ao pecado" (Rm 6:6). A pergunta das crianças — "que significam estas pedras?" — é o protótipo do catecismo familiar: a família que responde "Deus nos salvou através das águas" está pregando o Evangelho em forma narrativa. O conselheiro que trabalha com esta perícope tem em mãos o texto fundacional da educação cristã da família: memória deliberada dos atos redentivos de Deus como veículo da fé para as próximas gerações (Sl 78:4–7).'
              : 'The twelve stones taken from the dry Jordan riverbed point to Christ\'s death and resurrection. The Jordan is the place of judgment — and the stones taken from its current are evidence of the sovereign miracle. Christian baptism is the definitive memorial stone (Rom 6:6). The children\'s question — "what do these stones mean?" — is the prototype of family catechism: the family that answers "God saved us through the waters" is preaching the Gospel in narrative form. Psalm 78:4–7 grounds the mandate: deliberate memory of God\'s redemptive acts as the vehicle of faith for coming generations.'}
          </p>
        </div>
      </div>

      {/* SEÇÃO 1 — Pergunta dos Filhos */}
      {sectionCard(amber, amberL, amberB, '🪨',
        pt ? 'Seção 1 — "Que Significam Estas Pedras?" — A Pergunta que Forma a Identidade' : 'Section 1 — "What Do These Stones Mean?" — The Question that Forms Identity',
        pt ? 'Josué 4:6–7,21–24 — as pedras como catecismo familiar; "quando vossos filhos perguntarem"' : 'Joshua 4:6–7,21–24 — the stones as family catechism; "when your children ask"',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'A pedagogia das pedras: Deus projetou o memorial para provocar a pergunta das crianças — o ensino não começa com a resposta do pai, começa com a curiosidade do filho. O pai que não preparou resposta falhou na missão antes de ela começar.' : 'The pedagogy of the stones: God designed the memorial to provoke the children\'s question — teaching does not begin with the father\'s answer, it begins with the child\'s curiosity. The father who has no answer ready has failed the mission before it began.',
              pt ? 'Diagnóstico clínico: o conselheiro pergunta — "quando seus filhos olham para a história de vocês como casal e como família, que pedras eles veem? O que elas dizem a eles sobre Deus?" A ausência de pedras visíveis é um diagnóstico espiritual.' : 'Clinical diagnosis: the counselor asks — "when your children look at your story as a couple and family, what stones do they see? What do they tell them about God?" The absence of visible stones is a spiritual diagnosis.',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'A família que não narra os atos de Deus não está apenas perdendo história — está perdendo o veículo primário pelo qual a fé passa de uma geração para outra. As pedras memoriais são o catecismo que as crianças perguntam por si mesmas.'
               : 'The family that does not narrate God\'s acts is not merely losing history — it is losing the primary vehicle through which faith passes from one generation to the next. Memorial stones are the catechism children ask for themselves.',
            'Joel R. Beeke', amber, 7)}
          {quoteBox(
            pt ? 'A pergunta do filho — "que significa isso?" — é o momento pedagógico que Deus projetou na estrutura da criação e da aliança. O pai que não tem resposta não apenas perdeu uma oportunidade de ensino: perdeu a ocasião mais natural do discipulado familiar que existe.'
               : 'The child\'s question — "what does this mean?" — is the pedagogical moment God designed into the structure of creation and covenant. The father who has no answer has not merely missed a teaching opportunity: he has missed the most natural moment of family discipleship that exists.',
            'Voddie Baucham Jr.', green, 8)}
          {quoteBox(
            pt ? 'O papel do conselheiro é ajudar o pai/mãe a construir a narrativa: "Conte-me três momentos da história de vocês onde você viu claramente a mão de Deus." Esse exercício é o início do levantamento das pedras memoriais.'
               : 'The counselor\'s role is to help the father/mother build the narrative: "Tell me three moments in your story where you clearly saw God\'s hand." That exercise is the beginning of raising the memorial stones.',
            'Paul David Tripp', blue, 3)}
          <div style={{ background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: amber, marginBottom: 6 }}>✝️ {pt ? 'Perspectiva Histórico-Redentiva' : 'Redemptive-Historical Perspective'}</div>
            <p style={{ fontSize: smallSz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
              {pt
                ? 'A pergunta das crianças em Josué 4 é o eco da pergunta do filho em Êxodo 12:26 ("que significa este rito para vós?") e em Deuteronômio 6:20 ("que significam os testemunhos e os estatutos?"). Deus repetiu o padrão: a redenção é narrada em resposta à curiosidade dos filhos. Cristo cumpriu esse padrão na Ceia do Senhor — "fazei isto em memória de mim" (Lc 22:19) — instituindo a pedra memorial definitiva: a mesa onde cada geração de filhos pergunta "por que fazemos isto?" e os pais respondem com o Evangelho. O conselheiro que ajuda a família a praticar a Ceia com inteligência está erguendo pedras memoriais a cada celebração.'
                : 'The children\'s question in Joshua 4 echoes Exodus 12:26 and Deuteronomy 6:20. God repeated the pattern: redemption is narrated in response to children\'s curiosity. Christ fulfilled this pattern at the Lord\'s Supper — "do this in remembrance of me" (Luke 22:19) — instituting the definitive memorial stone: the table where each generation of children asks "why do we do this?" and parents answer with the Gospel.'}
            </p>
          </div>
          {questionsBox([
            pt ? '"Que três pedras memoriais — marcos onde você viu claramente Deus agir — você poderia mostrar para seus filhos hoje? Você já contou essas histórias para eles?"'
               : '"What three memorial stones — milestones where you clearly saw God act — could you show your children today? Have you ever told those stories to them?"',
            pt ? '"Se seus filhos olhassem para a história da sua família como casal, qual seria a primeira pergunta que fariam? Você tem a resposta pronta?"'
               : '"If your children looked at your story as a couple, what would be the first question they would ask? Do you have the answer ready?"',
            pt ? '"A Ceia do Senhor é a pedra memorial que Cristo ergueu. Como a sua família celebra e explica a Ceia para os filhos?"'
               : '"The Lord\'s Supper is the memorial stone Christ erected. How does your family celebrate and explain the Supper to your children?"',
          ], amber)}
        </>
      )}

      {/* SEÇÃO 2 — Memória como Remédio */}
      {sectionCard(green, greenL, greenB, '📿',
        pt ? 'Seção 2 — Memória Deliberada como Remédio para a Incredulidade' : 'Section 2 — Deliberate Memory as Remedy for Unbelief',
        pt ? 'Josué 4:7 — "estas pedras serão memorial perpétuo"; a memória como disciplina espiritual ativa' : 'Joshua 4:7 — "these stones shall be a memorial forever"; memory as an active spiritual discipline',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'A memória bíblica não é passiva — é disciplina ativa de revisitar os atos de Deus. A ingratidão e a incredulidade são filhos do esquecimento; a fé é filha da memória. O conselheiro diagnostica qual das duas está governando o coração do aconselhando.' : 'Biblical memory is not passive — it is the active discipline of revisiting God\'s acts. Ingratitude and unbelief are children of forgetting; faith is the child of memory. The counselor diagnoses which of the two is governing the counselee\'s heart.',
              pt ? 'Casais em crise frequentemente estão dominados pelo presente adverso e esqueceram os atos de Deus no passado. A terapia bíblica começa com a reconstrução da narrativa de gratidão: "me conte quando Deus foi fiel."' : 'Couples in crisis are often dominated by the adverse present and have forgotten God\'s acts in the past. Biblical therapy begins with rebuilding the gratitude narrative: "tell me when God was faithful."',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'O aconselhando que só fala do problema presente está, involuntariamente, cultuando o problema. O conselheiro que apenas escuta a queixa sem redirecionar para os atos de Deus na história do aconselhando está colaborando com a incredulidade.'
               : 'The counselee who only talks about the present problem is, involuntarily, worshiping the problem. The counselor who only listens to the complaint without redirecting to God\'s acts in the counselee\'s history is collaborating with unbelief.',
            'David Powlison', green, 1)}
          {quoteBox(
            pt ? 'A gratidão é a postura da alma que reconhece que o bem que recebeu não era merecido. O conselheiro que ajuda o aconselhando a construir um registro escrito dos atos de Deus — um "diário de pedras memoriais" — está prescrevendo a disciplina espiritual mais eficaz contra a depressão e a ansiedade.'
               : 'Gratitude is the posture of the soul that recognizes the good received was undeserved. The counselor who helps the counselee build a written record of God\'s acts — a "memorial stones journal" — is prescribing the most effective spiritual discipline against depression and anxiety.',
            'Jay E. Adams', amber, 2)}
          {quoteBox(
            pt ? 'A memória dos atos de Deus não é nostalgia religiosa — é a fundação da esperança futura. Quando o casal recorda juntos o que Deus já fez, está construindo o combustível da fé para o que Deus ainda fará.'
               : 'The memory of God\'s acts is not religious nostalgia — it is the foundation of future hope. When the couple recalls together what God has already done, they are building the fuel of faith for what God will yet do.',
            'Edward T. Welch', blue, 4)}
          <div style={{ background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: amber, marginBottom: 6 }}>✝️ {pt ? 'Perspectiva Histórico-Redentiva' : 'Redemptive-Historical Perspective'}</div>
            <p style={{ fontSize: smallSz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
              {pt
                ? 'O Salmo 78 é o paralelo direto de Josué 4: "contaremos à geração vindoura os louvores do SENHOR, o seu poder e as maravilhas que fez" (v.4). A razão teológica é redenção: "para que ponham em Deus a sua esperança" (v.7). O crente novotestamentário medita não sobre o Jordão de Israel, mas sobre a cruz de Cristo — o ato redentor definitivo que gerou todas as pedras memoriais possíveis. O conselheiro que ensina o casal a narrar a história redentiva de Cristo como a fundação da história deles está erguendo a Pedra angular sobre a qual todas as outras pedras memoriais se apoiam (1Pe 2:6–7).'
                : 'Psalm 78 is the direct parallel of Joshua 4: "we will tell the next generation the praiseworthy deeds of the LORD" (v.4). The theological reason is redemption: "so that they would put their trust in God" (v.7). The New Testament believer meditates not on Israel\'s Jordan but on Christ\'s cross — the definitive redemptive act that generated all possible memorial stones. Teaching the couple to narrate Christ\'s redemptive story as the foundation of their own story is erecting the cornerstone on which all other memorial stones rest (1 Pet 2:6–7).'}
            </p>
          </div>
          {questionsBox([
            pt ? '"Se você fosse escrever as três maiores obras de Deus na história de vocês como casal, quais seriam? Você já agradeceu a Deus por elas juntos?"'
               : '"If you were to write the three greatest works of God in your story as a couple, what would they be? Have you ever thanked God for them together?"',
            pt ? '"Quando você está em crise, você recorre à memória dos atos de Deus ou a memória da crise se apodera de você? Qual dos dois tem sido mais forte nos últimos meses?"'
               : '"When you are in crisis, do you turn to the memory of God\'s acts, or does the memory of crisis take over? Which of the two has been stronger in recent months?"',
            pt ? '"A cruz de Cristo é a pedra memorial máxima — o que Deus fez definitivamente por você. Como meditar na cruz juntos poderia mudar o clima emocional do lar de vocês?"'
               : '"The cross of Christ is the ultimate memorial stone — what God definitively did for you. How could meditating on the cross together change the emotional climate of your home?"',
          ], green)}
        </>
      )}

      {/* SEÇÃO 3 — Transmissão Geracional */}
      {sectionCard(blue, blueL, blueB, '🔗',
        pt ? 'Seção 3 — Transmissão Geracional da Fé: A Responsabilidade do Pai' : 'Section 3 — Generational Transmission of Faith: The Father\'s Responsibility',
        pt ? 'Josué 4:10–14,21–24 — Josué exaltado; a geração de pais formando a geração dos filhos' : 'Joshua 4:10–14,21–24 — Joshua exalted; the generation of parents forming the generation of children',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'A exaltação de Josué (v.14) diante de toda a geração de Israel tem propósito pedagógico: as crianças precisam ver líderes que Deus honra para aprenderem a honrar a Deus. A autoridade do pai/líder espiritual é instrumental na transmissão da fé.' : 'Joshua\'s exaltation (v.14) before all Israel has a pedagogical purpose: children need to see leaders whom God honors in order to learn to honor God. The authority of the father/spiritual leader is instrumental in faith transmission.',
              pt ? 'O texto de 5:1 registra o efeito externo: os reis pagãos ficaram sem coragem ao ouvir o que Deus fez. Famílias com memória espiritual viva exercem testemunho involuntário — a narrativa dos atos de Deus produz reverência nos que observam.' : 'The text of 5:1 records the external effect: the pagan kings lost heart upon hearing what God did. Families with a living spiritual memory exercise involuntary witness — the narrative of God\'s acts produces reverence in those who observe.',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'A fé não é transmitida automaticamente pelo sangue — ela é transmitida deliberadamente pela narrativa. O pai que assume a responsabilidade do culto doméstico não está apenas criando uma rotina religiosa; está sendo o sacerdote que levanta as pedras para que os filhos possam perguntar.'
               : 'Faith is not transmitted automatically through bloodline — it is transmitted deliberately through narrative. The father who takes responsibility for family worship is not merely creating a religious routine; he is being the priest who raises the stones so that the children can ask.',
            'Voddie Baucham Jr.', blue, 8)}
          {quoteBox(
            pt ? 'A ruptura geracional não começa quando os filhos adolescentes se afastam — começa quando os pais não levantaram as pedras memoriais nos primeiros anos. O conselheiro que trabalha com pais de adolescentes afastados da fé deve perguntar: "que pedras vocês ergueram quando eles eram pequenos?"'
               : 'Generational rupture does not begin when teenagers drift away — it begins when parents did not erect the memorial stones in the early years. The counselor working with parents of faith-drifting teenagers must ask: "what stones did you raise when they were small?"',
            'Joel R. Beeke', amber, 7)}
          {quoteBox(
            pt ? 'O culto familiar não é uma prática de piedade opcional — é o meio primário pelo qual Deus escolheu transmitir a fé entre as gerações. A família que abandona o culto doméstico está, sem perceber, assinando o contrato do esquecimento espiritual de seus filhos.'
               : 'Family worship is not an optional piety practice — it is the primary means by which God chose to transmit faith between generations. The family that abandons domestic worship is, without realizing it, signing the contract of its children\'s spiritual forgetting.',
            'Brian Croft & Jim Savastio', green, 9)}
          <div style={{ background: 'rgba(80,200,255,0.10)', border: '1px solid rgba(80,200,255,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: blue, marginBottom: 6 }}>{pt ? 'Prática Clínica Pastoral' : 'Clinical Pastoral Practice'}</div>
            <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.7, margin: 0 }}>
              {pt
                ? 'O conselheiro pode pedir ao pai/mãe para escrever, antes da próxima sessão, a "história das doze pedras" da família — doze atos de Deus que podem narrar para os filhos. Esse exercício é diagnóstico e terapêutico ao mesmo tempo.'
                : 'The counselor can ask the father/mother to write, before the next session, the "twelve stones story" of the family — twelve acts of God they can narrate to their children. This exercise is both diagnostic and therapeutic.'}
            </p>
          </div>
          <div style={{ background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: amber, marginBottom: 6 }}>✝️ {pt ? 'Perspectiva Histórico-Redentiva' : 'Redemptive-Historical Perspective'}</div>
            <p style={{ fontSize: smallSz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
              {pt
                ? 'Deuteronômio 6:4–9 (o Shemá) é o mandato da transmissão geracional — e é exatamente a estrutura que Josué 4 operacionaliza. Christ é o cumprimento do Shemá: "o maior mandamento é amar ao SENHOR teu Deus" (Mt 22:37) — e o pai que ama a Deus com todo o coração transmitirá essa paixão naturalmente, mas não sem intenção. O Grande Comissionamento (Mt 28:19–20) tem dimensão familiar: "ensinando-os a guardar tudo o que vos tenho mandado" é o pai erguendo pedras para que os filhos perguntem e recebam a resposta do Evangelho como herança.'
                : 'Deuteronomy 6:4–9 (the Shema) is the mandate of generational transmission — and it is exactly the structure Joshua 4 operationalizes. Christ is the fulfillment of the Shema (Matt 22:37). The Great Commission (Matt 28:19–20) has a family dimension: "teaching them to observe all that I have commanded you" is the father erecting stones so that children ask and receive the Gospel answer as their inheritance.'}
            </p>
          </div>
          {questionsBox([
            pt ? '"Qual é o culto familiar que vocês têm? Com que frequência? O que está impedindo de ser mais regular?"'
               : '"What family worship do you have? How often? What is preventing it from being more regular?"',
            pt ? '"Se seus filhos descrevessem hoje a fé de vocês como pais, o que eles diriam? Eles viram Deus sendo honrado em casa?"'
               : '"If your children described your faith as parents today, what would they say? Have they seen God being honored at home?"',
            pt ? '"O que você quer que seus filhos digam sobre Deus quando tiverem 30 anos? O que você está fazendo hoje para que isso aconteça?"'
               : '"What do you want your children to say about God when they are 30 years old? What are you doing today to make that happen?"',
          ], blue)}
        </>
      )}

      {/* SEÇÃO 4 — Gratidão e Identidade */}
      {sectionCard(purple, purpleL, purpleB, '🏆',
        pt ? 'Seção 4 — Gratidão, Identidade e o Testemunho Involuntário da Família (Jo 4:14; 5:1)' : 'Section 4 — Gratitude, Identity and the Involuntary Witness of the Family (Josh 4:14; 5:1)',
        pt ? 'Josué 4:14; 5:1 — Josué exaltado; o coração dos pagãos derreteu ao ouvir; a família como testemunho missional' : 'Joshua 4:14; 5:1 — Joshua exalted; pagans\' hearts melted upon hearing; the family as missional witness',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'A exaltação de Josué (4:14) diante de todo Israel cria identidade coletiva: o povo sabe quem é seu líder e quem é seu Deus. A família que narra os atos de Deus forma identidade nos filhos — "somos aqueles que Deus salvou."' : 'Joshua\'s exaltation (4:14) before all Israel creates collective identity: the people know who their leader is and who their God is. The family that narrates God\'s acts forms identity in the children — "we are those whom God saved."',
              pt ? '5:1 — o medo dos povos ao redor: a família com memória espiritual viva exerce testemunho sem planejar. A narrativa dos atos de Deus em casa vaza para fora — vizinhos, escola, trabalho percebem que há algo diferente.' : '5:1 — the fear of surrounding peoples: the family with living spiritual memory exercises witness without planning it. The narrative of God\'s acts at home leaks outward — neighbors, school, workplace notice that something is different.',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'A identidade do filho cristão não é construída primeiramente pela escola ou pela cultura — é construída pela narrativa familiar. O pai que narra os atos de Deus está dizendo ao filho: "você é filho de alguém que foi salvo, e esse Deus também é o seu Deus."'
               : 'The Christian child\'s identity is not built primarily by school or culture — it is built by family narrative. The father who narrates God\'s acts is telling the child: "you are the child of someone who was saved, and that God is your God too."',
            'Paul David Tripp', purple, 3)}
          {quoteBox(
            pt ? 'O casamento cristão que honra a Deus publicamente exerce missão sem estratégia missionária. Os vizinhos que perguntam "o que há de diferente em vocês?" estão fazendo a mesma pergunta das crianças: "que significam estas pedras?" O testemunho é inseparável da memória.'
               : 'The Christian marriage that honors God publicly exercises mission without a missionary strategy. The neighbors who ask "what is different about you?" are asking the same question as the children: "what do these stones mean?" Witness is inseparable from memory.',
            'David Powlison', green, 5)}
          {quoteBox(
            pt ? 'A gratidão expressa publicamente — no culto, na mesa, com os filhos — não é ostentação religiosa; é o cumprimento da vocação missional da família. A família grata é a melhor apologética que a Igreja tem.'
               : 'Gratitude expressed publicly — in worship, at the table, with children — is not religious ostentation; it is the fulfillment of the family\'s missional vocation. The grateful family is the best apologetics the Church has.',
            'Jay E. Adams', amber, 6)}
          <div style={{ background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: amber, marginBottom: 6 }}>✝️ {pt ? 'Perspectiva Histórico-Redentiva' : 'Redemptive-Historical Perspective'}</div>
            <p style={{ fontSize: smallSz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
              {pt
                ? 'A reação de 5:1 — os corações dos reis derreteram — é o eco de Êxodo 15:15–16 (cântico de Moisés) e aponta para Apocalipse 15:3 (cântico do Cordeiro). O testemunho dos atos redentivos de Deus tem efeito cosmológico: toda nação, tribo, povo e língua um dia proclamará que Cristo é Senhor (Fp 2:11). A família que narra os atos de Deus hoje está participando do cântico que a criação inteira cantará na consumação. O conselheiro que ajuda famílias a erguer pedras memoriais está construindo um lar que aponta para a Nova Jerusalém.'
                : 'The reaction of 5:1 — the kings\' hearts melted — echoes Exodus 15:15–16 (Moses\' song) and points to Revelation 15:3 (the Lamb\'s song). The witness of God\'s redemptive acts has cosmological effect: every nation, tribe, people and tongue will one day proclaim Christ is Lord (Phil 2:11). The family that narrates God\'s acts today is participating in the song all creation will sing at the consummation. The counselor building memorial-stone families is building homes that point to the New Jerusalem.'}
            </p>
          </div>
          {questionsBox([
            pt ? '"Quando alguém de fora observa sua família, o que vê? Há algo visível que levantaria a pergunta: que há de diferente nesta família?"'
               : '"When someone from outside observes your family, what do they see? Is there anything visible that would raise the question: what is different about this family?"',
            pt ? '"A identidade dos seus filhos está sendo formada pela narrativa de Deus ou pela narrativa da cultura? Quais vozes falam mais alto no seu lar?"'
               : '"Is your children\'s identity being formed by God\'s narrative or by the culture\'s narrative? Which voices speak loudest in your home?"',
            pt ? '"O que seria concreto para vocês erguerem uma pedra memorial esta semana — um ato deliberado de gratidão que os filhos verão e poderão perguntar sobre?"'
               : '"What would it look like for you to erect a memorial stone this week — a deliberate act of gratitude that children will see and be able to ask about?"',
          ], purple)}
        </>
      )}

      {/* SEÇÃO 5 — Autores */}
      <div style={{ borderRadius: 16, background: pinkL, border: `1.5px solid ${pinkB}`, padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: pink, marginBottom: 16 }}>
          📚 {pt ? 'Seção 5 — Autores e Obras de Referência' : 'Section 5 — Reference Authors and Works'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 12, marginBottom: 16 }}>
          {[
            { fn: 2,  name: 'Jay E. Adams',           works: 'Competent to Counsel (1970); Christian Living in the Home (1972); A Theology of Christian Counseling (1979)', desc: pt ? 'Pioneiro do aconselhamento noutético; responsabilidade pactual do pai; confrontação com a Palavra' : 'Pioneer of nouthetic counseling; covenantal responsibility of the father; confrontation with the Word', color: amber },
            { fn: 1,  name: 'David Powlison',         works: 'Seeing with New Eyes (2003); Speaking Truth in Love (2005)', desc: pt ? 'Diagnóstico do coração; idolatria da gratidão esquecida; testemunho e memória' : 'Heart diagnosis; idolatry of forgotten gratitude; testimony and memory', color: green },
            { fn: 3,  name: 'Paul David Tripp',       works: 'Instruments in the Redeemer\'s Hands (2002); What Did You Expect? (2010)', desc: pt ? 'Narrativa familiar; identidade construída pela história redentiva' : 'Family narrative; identity built by redemptive story', color: blue },
            { fn: 4,  name: 'Edward T. Welch',        works: 'Running Scared (2007); Side by Side (2015)', desc: pt ? 'Memória como antídoto para a ansiedade; gratidão ativa' : 'Memory as antidote to anxiety; active gratitude', color: purple },
            { fn: 7,  name: 'Joel R. Beeke',          works: 'Family Worship (2009); Parenting by God\'s Promises (2011)', desc: pt ? 'Culto doméstico; transmissão geracional como responsabilidade sacerdotal do pai' : 'Family worship; generational transmission as the father\'s priestly responsibility', color: amber },
            { fn: 8,  name: 'Voddie Baucham Jr.',     works: 'Family Driven Faith (2007); What He Must Be (2009)', desc: pt ? 'A família como unidade de discipulado; o pai como principal transmissor de fé' : 'The family as the discipleship unit; the father as the primary faith transmitter', color: pink },
            { fn: 9,  name: 'Brian Croft & Jim Savastio', works: 'The Pastor\'s Ministry (2015)', desc: pt ? 'Cuidado pastoral; o pastor como supervisor do culto familiar nas igrejas' : 'Pastoral care; the pastor as supervisor of family worship in churches', color: green },
          ].map((a, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', padding: '14px 16px' }}>
              <div style={{ fontSize: labelSz, fontWeight: 900, color: a.color, marginBottom: 4 }}>{a.name}{fn(a.fn)}</div>
              <div style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.50)', marginBottom: 6, fontStyle: 'italic' }}>{a.works}</div>
              <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{a.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '12px 16px', borderLeft: `3px solid ${pink}` }}>
          <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
            {pt
              ? 'Conselheiro bíblico reformado diante de Josué 4: não pergunte apenas "o que está errado na família?" — pergunte "que pedras memoriais vocês já ergueram? Quais ainda precisam ser erguidas?" O diagnóstico da ausência é tão importante quanto o diagnóstico da presença do pecado.'
              : 'Reformed biblical counselor before Joshua 4: do not only ask "what is wrong in the family?" — ask "what memorial stones have you already erected? Which ones still need to be raised?" The diagnosis of absence is as important as the diagnosis of the presence of sin.'}
          </p>
        </div>
      </div>

      {/* SEÇÃO 6 — Plano de Sessões */}
      <div style={{ borderRadius: 16, background: greenL, border: `1.5px solid ${greenB}`, padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: green, marginBottom: 16 }}>
          🗓️ {pt ? 'Seção 6 — Plano de 4 Sessões baseado em Josué 4' : 'Section 6 — 4-Session Plan based on Joshua 4'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              n: '1', ref: 'Josué 4:1–7', color: amber,
              title: pt ? 'As Pedras que Faltam' : 'The Missing Stones',
              desc: pt
                ? 'Diagnóstico: mapeamento das lacunas de memória espiritual da família. "Que três pedras memoriais você pode mostrar para seus filhos?" Âncora histórico-redentiva: a cruz é a pedra angular — todas as outras pedras se apoiam nela (1Pe 2:6–7). A família que não tem memória da cruz está edificando em areia. Powlison[1], Adams[2].'
                : 'Diagnosis: mapping the family\'s spiritual memory gaps. "What three memorial stones can you show your children?" Redemptive anchor: the cross is the cornerstone — all other stones rest on it (1 Pet 2:6–7). The family with no memory of the cross is building on sand. Powlison[1], Adams[2].',
            },
            {
              n: '2', ref: 'Josué 4:7; Sl 78:4–7', color: green,
              title: pt ? 'O Diário das Pedras Memoriais' : 'The Memorial Stones Journal',
              desc: pt
                ? 'Tarefa prática: escrever juntos as "doze pedras" — doze atos de Deus na história do casal/família. Avaliar na sessão. Âncora histórico-redentiva: Salmo 78 — "para que ponham em Deus a sua esperança" (v.7). A memória dos atos passados de Deus é o combustível da fé para os atos futuros. Welch[4], Beeke[7].'
                : 'Practical task: write together the "twelve stones" — twelve acts of God in the couple/family story. Evaluate in session. Redemptive anchor: Psalm 78 — "so they would put their trust in God" (v.7). Memory of God\'s past acts is the fuel of faith for future acts. Welch[4], Beeke[7].',
            },
            {
              n: '3', ref: 'Josué 4:10–14,21–24', color: blue,
              title: pt ? 'Iniciando o Culto Familiar' : 'Starting Family Worship',
              desc: pt
                ? 'Plano concreto de culto doméstico adaptado à fase da família. O pai como sacerdote que levanta pedras para que os filhos perguntem. Âncora histórico-redentiva: Deuteronômio 6:4–9 (Shemá) cumprido em Cristo — o pai que ama a Deus com todo o coração transmite essa paixão naturalmente, mas com intenção. Baucham[8], Croft[9].'
                : 'Concrete family worship plan adapted to the family\'s current phase. The father as priest who raises stones so children ask. Redemptive anchor: Deuteronomy 6:4–9 (Shema) fulfilled in Christ — the father who loves God with all his heart transmits that passion naturally, but with intention. Baucham[8], Croft[9].',
            },
            {
              n: '4', ref: 'Josué 4:14; 5:1', color: purple,
              title: pt ? 'Identidade e Testemunho' : 'Identity and Witness',
              desc: pt
                ? 'Avaliação: que identidade a família está formando nos filhos? Que testemunho a narrativa familiar está gerando externamente? Plano missional a partir de dentro para fora. Âncora histórico-redentiva: a família que narra os atos de Deus participa do cântico do Cordeiro (Ap 15:3) — a gratidão doméstica é ensaio escatológico. Tripp[3,10], Powlison[5].'
                : 'Evaluation: what identity is the family forming in children? What witness is the family narrative generating externally? Missional plan from inside out. Redemptive anchor: the family that narrates God\'s acts participates in the Lamb\'s song (Rev 15:3) — domestic gratitude is eschatological rehearsal. Tripp[3,10], Powlison[5].',
            },
          ].map((s) => (
            <div key={s.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: '#000' }}>{s.n}</div>
              <div>
                <div style={{ fontSize: titleSz, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 6 }}>{s.ref}</div>
                <div style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REFERÊNCIAS ABNT */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.10)', padding: '22px 24px', marginBottom: 8 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.50)', marginBottom: 16 }}>
          📎 {pt ? 'Referências Bibliográficas (ABNT)' : 'Bibliographic References (ABNT)'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {REFS.map((r) => (
            <div key={r.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, minWidth: 28, height: 22, borderRadius: 6, background: amberL, border: `1px solid ${amberB}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: smallSz, fontWeight: 900, color: amber }}>{r.n}</span>
              <p style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, margin: 0, fontFamily: 'monospace' }}>{r.abnt}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── Infográfico Gênesis 2 ────────────────────────────────────────────
function InfograficoGenesis2FamiliaSection({ pt }: { pt: boolean }) {
  const amber  = 'rgba(255,180,50,1)';
  const green  = 'rgba(52,211,153,1)';
  const blue   = 'rgba(80,200,255,1)';
  const purple = 'rgba(180,120,255,1)';

  const MOVES = [
    {
      num: 'I', sym: 'Gn 2:5–7',
      title: pt ? 'A Providência que Antecede o Limite' : 'The Providence that Precedes the Limit',
      sub: pt ? 'Ribeiro que rega antes de haver homem — Deus provê antes de pedir' : 'Stream that waters before any man — God provides before requesting',
      emoji: '💧',
      key: pt ? 'Yatsar (formar como oleiro, v.7) — o homem é obra de mãos divinas, não acidente. O mesmo Deus que rega o jardim sem que haja homem é o que sopra nishmat chayim: providência total antes de qualquer exigência.' : 'Yatsar (form as a potter, v.7) — man is the work of divine hands, not an accident. The same God who waters the garden before any man blows nishmat chayim: total providence before any demand.',
      app: pt ? 'Pais: antes de dar regras, deem presença e provisão. O padrão de Deus no jardim — providência primeiro, limite depois — é o modelo da autoridade parental amorosa.' : 'Parents: before giving rules, give presence and provision. God\'s pattern in the garden — providence first, limit after — is the model of loving parental authority.',
      cor: amber, corL: 'rgba(255,180,50,0.10)', corB: 'rgba(255,180,50,0.28)',
    },
    {
      num: 'II', sym: 'Gn 2:15',
      title: pt ? 'Avad e Shamar — Identidade antes de Autonomia' : 'Avad and Shamar — Identity before Autonomy',
      sub: pt ? '"Lavrar e guardar" — vocação que define antes de liberdade ser dada' : '"Till and keep" — vocation that defines before freedom is granted',
      emoji: '⚒️',
      key: pt ? 'Avad (servir/lavrar) + shamar (guardar/vigiar) estabelecem vocação antes de permissão. O jardim não é parque — é santuário de serviço. A família que ensina identidade ("quem você é") antes de autonomia ("o que você pode") está no padrão de Gênesis 2.' : 'Avad (serve/till) + shamar (keep/guard) establish vocation before permission. The garden is not a park — it is a sanctuary of service. The family that teaches identity ("who you are") before autonomy ("what you may do") follows the Genesis 2 pattern.',
      app: pt ? 'Casal: antes de perguntar ao filho "o que você quer ser?", ensinem "quem você é diante de Deus." Identidade sólida produz vocação sólida — o contrário gera crise existencial.' : 'Couple: before asking your child "what do you want to be?", teach "who you are before God." Solid identity produces solid vocation — the opposite generates existential crisis.',
      cor: green, corL: 'rgba(52,211,153,0.10)', corB: 'rgba(52,211,153,0.28)',
    },
    {
      num: 'III', sym: 'Gn 2:9,16–17',
      title: pt ? 'O Limite no Centro — Convite à Confiança' : 'The Limit at the Center — Invitation to Trust',
      sub: pt ? 'Árvore betok hagan — no meio do jardim; mot tamut — certamente morrerás' : 'Tree betok hagan — in the middle of the garden; mot tamut — you shall surely die',
      emoji: '🌳',
      key: pt ? 'Betok hagan (no centro) é posição teológica: o limite fica onde não pode ser ignorado, mas pode ser escolhido livremente. Da\'at tov vara\' (conhecimento do bem e do mal) é a prerrogativa de definir moralidade autonomamente — que pertence só a Deus. O limite respeita a agência moral da criatura.' : 'Betok hagan (at the center) is a theological position: the limit stands where it cannot be ignored, but can be freely chosen. Da\'at tov vara\' (knowledge of good and evil) is the prerogative of defining morality autonomously — which belongs to God alone. The limit respects the moral agency of the creature.',
      app: pt ? 'Pais: limites claros e amorosos não são opressão — são o maior presente que podem dar. Limite sem amor é tirania; amor sem limite é negligência. Gênesis 2 une os dois.' : 'Parents: clear and loving limits are not oppression — they are the greatest gift you can give. Limit without love is tyranny; love without limit is negligence. Genesis 2 unites both.',
      cor: blue, corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.28)',
    },
  ];

  const ACTIVITIES = [
    { n: '1', icon: '📖', text: pt ? 'Leiam Gn 2:15–17 juntos. Identifiquem no texto: onde está a provisão? Onde está o limite? O que veio primeiro?' : 'Read Gen 2:15–17 together. Identify in the text: where is the provision? Where is the limit? What came first?' },
    { n: '2', icon: '💬', text: pt ? 'Perguntem às crianças: "Por que um pai bom dá regras? O que mostra que ele nos ama — as provisões ou os limites?" Ouçam sem interromper.' : 'Ask children: "Why does a good father give rules? What shows he loves us — the provisions or the limits?" Listen without interrupting.' },
    { n: '3', icon: '🌱', text: pt ? 'Façam um "Mapa do Nosso Jardim": numa folha, desenhem a casa e escrevam as "árvores" (dons de Deus) e as "cercas" (regras que protegem). Discutam cada uma.' : 'Make a "Map of Our Garden": on paper, draw the home and write the "trees" (God\'s gifts) and "fences" (rules that protect). Discuss each one.' },
    { n: '4', icon: '✊', text: pt ? 'Pais compartilhem: "Qual regra dos seus pais você não entendia mas agora entende? O que você aprendeu com ela?" Mostrem que limites são sabedoria acumulada.' : 'Parents share: "Which rule from your parents didn\'t you understand but now do? What did you learn from it?" Show that limits are accumulated wisdom.' },
    { n: '5', icon: '🙏', text: pt ? 'Cada membro nomeia um limite que acha difícil de obedecer — regra de Deus ou dos pais. Orem juntos pedindo que Deus revele o amor por trás do limite.' : 'Each member names a limit they find hard to obey — a rule from God or parents. Pray together asking God to reveal the love behind the limit.' },
    { n: '6', icon: '📝', text: pt ? 'Escrevam Gn 2:16: "De toda árvore do jardim comerás livremente." Cole em lugar visível. Lembrança de que Deus provê 99% antes de restringir 1%.' : 'Write Gen 2:16: "You may freely eat of every tree of the garden." Post in a visible place. A reminder that God provides 99% before restricting 1%.' },
  ];

  const APPS_FAMILIA = [
    { role: pt ? 'Pais' : 'Parents', icon: '👨‍👩‍👧', text: pt ? 'Vocês são a primeira imagem de Deus Pai que seus filhos conhecerão. Revelem o Pai que provê antes de exigir — apresentem os dons antes de apresentar os limites.' : 'You are the first image of God the Father your children will know. Reveal the Father who provides before demanding — present gifts before limits.' },
    { role: pt ? 'Filhos' : 'Children', icon: '👦', text: pt ? 'A regra que mais te incomoda em casa pode ser exatamente a que mais te protege. Confia que seus pais, como Deus com Adão, conhecem o que é melhor para você.' : 'The rule that bothers you most at home may be exactly the one that protects you most. Trust that your parents, like God with Adam, know what is best for you.' },
    { role: pt ? 'Noivos' : 'Engaged', icon: '💍', text: pt ? 'Antes de casar, definam juntos os "limites amorosos" do lar: finanças, telas, amizades, tempo com Deus. Limites acordados antes são atos de amor, não de desconfiança.' : 'Before marrying, define together the "loving limits" of the home: finances, screens, friendships, time with God. Limits agreed beforehand are acts of love, not distrust.' },
    { role: pt ? 'Casal' : 'Couple', icon: '👫', text: pt ? 'Revisem as regras do lar juntos. Alguma precisa ser ajustada ou criada? Decidam juntos, apliquem juntos. O mandato de guardar o jardim é sempre dado ao casal como unidade.' : 'Review the home rules together. Does any need adjusting or creating? Decide together, apply together. The mandate to keep the garden is always given to the couple as a unit.' },
    { role: pt ? 'Avós' : 'Grandparents', icon: '👴', text: pt ? 'Compartilhem quais limites que vocês estabeleceram os protegeram — e quais, por falta deles, trouxeram dor. Sua experiência é a pedra memorial mais valiosa que podem oferecer.' : 'Share which limits you established that protected you — and which, by their absence, brought pain. Your experience is the most valuable memorial stone you can offer.' },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>

      {/* HERO */}
      <div style={{ borderRadius: 20, background: 'linear-gradient(135deg,rgba(255,180,50,0.13) 0%,rgba(80,200,255,0.09) 60%,rgba(52,211,153,0.07) 100%)', border: '1px solid rgba(255,180,50,0.30)', padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10, filter: 'drop-shadow(0 0 24px rgba(255,180,50,0.50))' }}>🌳🚧</div>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 8 }}>
          Gênesis 2:4b–17 · {pt ? 'Família — Dia 2' : 'Family — Day 2'}
        </div>
        <div style={{ fontSize: 'clamp(18px,3.2vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'O Jardim do Limite: Onde Deus Cuida, Há Cerca' : 'The Garden of the Limit: Where God Cares, There Is a Fence'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.4vw,17px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'Providência, Vocação e o Limite Amoroso como Padrão de Autoridade Parental' : 'Providence, Vocation and the Loving Limit as the Pattern of Parental Authority'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {[
            pt ? 'Providência Antecede' : 'Providence Precedes',
            pt ? 'Avad e Shamar' : 'Avad and Shamar',
            pt ? 'Limite Amoroso' : 'Loving Limit',
            pt ? 'Autoridade Parental' : 'Parental Authority',
          ].map(t => (
            <span key={t} style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: 'rgba(255,180,50,0.12)', border: '1px solid rgba(255,180,50,0.28)', color: 'rgba(255,180,50,0.92)' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* BIG IDEA */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(255,180,50,0.10),rgba(80,200,255,0.07))', border: '1.5px solid rgba(255,180,50,0.32)', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 8 }}>💡 {pt ? 'Big Idea · Para a Família' : 'Big Idea · For the Family'}</div>
        <p style={{ fontSize: 'clamp(18px,2.8vw,22px)', fontWeight: 800, color: '#fff', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'O Deus que planta o jardim, sopra vida e provê abundantemente também impõe um limite — porque o limite amoroso é a forma mais alta de cuidado paternal, e toda autoridade no lar deve seguir esse padrão.'
            : 'The God who plants the garden, breathes life and provides abundantly also imposes a limit — because the loving limit is the highest form of paternal care, and all authority in the home must follow this pattern.'}
        </p>
      </div>

      {/* PERGUNTA + DOUTRINA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,100,0.06)', border: '1px solid rgba(255,100,100,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 8 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: 0 }}>
            {pt ? '"Por que um Pai bom dá regras? O que os limites que Deus coloca na nossa vida revelam sobre o Seu amor pela nossa família?"' : '"Why does a good Father give rules? What do the limits God places in our lives reveal about His love for our family?"'}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(80,200,255,0.08)', border: '1px solid rgba(80,200,255,0.28)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(80,200,255,0.85)', marginBottom: 8 }}>📜 {pt ? 'Doutrina Central' : 'Central Doctrine'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: 0 }}>
            {pt ? 'O Deus que provê abundantemente impõe limites amorosos porque a criatura só floresce na confiança obediente ao Criador — e isso é o fundamento de toda autoridade parental legítima.' : 'The God who provides abundantly imposes loving limits because the creature only flourishes in obedient trust of the Creator — and this is the foundation of all legitimate parental authority.'}
          </p>
        </div>
      </div>

      {/* MOVIMENTOS */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
          📋 {pt ? 'Movimentos do Sermão Familiar' : 'Family Sermon Movements'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
          {MOVES.map(m => (
            <div key={m.num} style={{ borderRadius: 16, background: m.corL, border: `1.5px solid ${m.corB}`, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.cor}22`, border: `1.5px solid ${m.cor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(16px,2vw,18px)', fontWeight: 900, color: m.cor }}>{m.emoji}</div>
                <div>
                  <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 700, color: m.cor, letterSpacing: '0.12em' }}>{m.num} · {m.sym}</div>
                  <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>{m.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.60)', fontStyle: 'italic', marginBottom: 8 }}>{m.sub}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>{m.key}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: m.cor, lineHeight: 1.55, fontWeight: 600 }}>▸ {m.app}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EIXO REDENTOR */}
      <div style={{ borderRadius: 16, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '20px 24px', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 10 }}>
          ✝️ {pt ? 'Eixo Histórico-Redentivo' : 'Redemptive-Historical Axis'}
        </div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,230,180,0.90)', lineHeight: 1.80, margin: 0 }}>
          {pt
            ? 'O jardim do Éden com sua árvore proibida no centro aponta para outro jardim — Getsêmani — onde o segundo Adão disse "não a minha vontade, mas a Tua" (Lc 22:42). Cristo cumpriu dentro do limite da obediência filial o que Adão falhou em guardar. A madeira da maldição tornou-se a árvore da vida (Ap 22:2), e o acesso a ela é pela obediência perfeita de Cristo transferida aos Seus. Quando a família aprende a obedecer dentro dos limites de Deus, ela está praticando a gramática da aliança restaurada por Cristo.'
            : 'The Garden of Eden with its forbidden tree at the center points to another garden — Gethsemane — where the second Adam said "not my will, but yours" (Luke 22:42). Christ fulfilled within the limits of filial obedience what Adam failed to keep. The wood of the curse became the tree of life (Rev 22:2), and access to it is through Christ\'s perfect obedience imputed to His own. When the family learns to obey within God\'s limits, it is practicing the grammar of the covenant restored by Christ.'}
        </p>
      </div>

      {/* APLICAÇÕES POR PAPEL */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.70)', marginBottom: 18, textAlign: 'center' }}>
          🎯 {pt ? 'Aplicações por Papel na Família' : 'Applications by Family Role'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
          {APPS_FAMILIA.map(a => (
            <div key={a.role} style={{ borderRadius: 12, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.20)', padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', fontWeight: 800, color: 'rgba(255,180,50,0.95)', marginBottom: 6 }}>{a.icon} {a.role}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.60 }}>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DINÂMICA FAMILIAR */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(18px,3vw,26px)', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.70)', marginBottom: 18, textAlign: 'center' }}>
          🎲 {pt ? 'Dinâmica Familiar — 6 Atividades' : 'Family Activities — 6 Activities'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 10 }}>
          {ACTIVITIES.map(a => (
            <div key={a.n} style={{ borderRadius: 12, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.20)', padding: '12px 14px', display: 'flex', gap: 10 }}>
              <div style={{ fontSize: 'clamp(18px,2.4vw,22px)', lineHeight: 1.2 }}>{a.icon}</div>
              <div style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.60 }}><span style={{ fontWeight: 800, color: 'rgba(255,200,80,0.90)' }}>{a.n}. </span>{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AUTORES */}
      <div style={{ borderRadius: 16, background: 'rgba(80,200,255,0.06)', border: '1px solid rgba(80,200,255,0.20)', padding: '18px 22px', marginBottom: 28 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(80,200,255,0.80)', marginBottom: 14 }}>
          📚 {pt ? 'Autores Reformados' : 'Reformed Authors'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { name: 'J.C. Ryle', work: 'The Duties of Parents', text: pt ? '"Habituai vossos filhos a obedecer desde a mais tenra infância. A desobediência não corrigida na infância se torna rebeldia na adolescência e ruína na vida adulta."' : '"Train your children to obey from the earliest infancy. Disobedience unchecked in childhood becomes rebellion in adolescence and ruin in adult life."' },
            { name: 'Voddie Baucham Jr.', work: 'Family Driven Faith (2007)', text: pt ? '"O pai que não disciplina seu filho não está sendo amoroso — está sendo covarde. O amor verdadeiro faz o que é difícil porque se importa com o destino eterno da criança."' : '"The father who does not discipline his child is not being loving — he is being cowardly. True love does the hard thing because it cares about the child\'s eternal destiny."' },
            { name: 'Richard Baxter', work: 'A Christian Directory (1673)', text: pt ? '"Se você é amoroso mas sem limites, você ensina um falso deus. Se você tem limites mas sem amor, você ensina outro falso deus. O verdadeiro Pai une os dois — e isso é o que a criação revela."' : '"If you are loving but without limits, you teach a false god. If you have limits but no love, you teach another false god. The true Father unites both — and this is what creation reveals."' },
          ].map((a, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '12px 16px', borderLeft: `3px solid ${blue}` }}>
              <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 800, color: blue, marginBottom: 4 }}>{a.name} <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.40)', fontStyle: 'italic' }}>{a.work}</span></div>
              <p style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.70, margin: 0, fontStyle: 'italic' }}>{a.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CONCLUSÃO */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(255,180,50,0.10),rgba(80,200,255,0.07))', border: '1.5px solid rgba(255,180,50,0.28)', padding: '20px 24px' }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,180,50,0.85)', marginBottom: 10 }}>🏁 {pt ? 'Conclusão' : 'Conclusion'}</div>
        <p style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'O jardim não era prisão — era providência cercada de amor. O único limite no meio do jardim não era crueldade — era convite a confiar. Quando a família aprende a viver dentro dos limites de Deus com alegria — quando pais dão regras com amor e filhos obedecem com confiança — vocês estão vivendo a gramática do Novo Jardim, onde o segundo Adão já obedeceu por nós. Plante cercas amorosas. Confie nos limites do Pai. E viva.'
            : 'The garden was not a prison — it was providence fenced with love. The single limit at the center of the garden was not cruelty — it was an invitation to trust. When the family learns to live within God\'s limits with joy — when parents give rules with love and children obey with trust — they are living the grammar of the New Garden, where the second Adam already obeyed for us. Plant loving fences. Trust the Father\'s limits. And live.'}
        </p>
      </div>

    </div>
  );
}

// ─── Aconselhamento Bíblico Gênesis 2 ────────────────────────────────
function AconselhamentoBiblicoGenesis2FamiliaSection({ pt }: { pt: boolean }) {
  const amber  = 'rgba(255,180,50,1)';
  const amberL = 'rgba(255,180,50,0.10)';
  const amberB = 'rgba(255,180,50,0.28)';
  const green  = 'rgba(52,211,153,1)';
  const greenL = 'rgba(52,211,153,0.10)';
  const greenB = 'rgba(52,211,153,0.28)';
  const blue   = 'rgba(80,200,255,1)';
  const blueL  = 'rgba(80,200,255,0.10)';
  const blueB  = 'rgba(80,200,255,0.28)';
  const purple = 'rgba(180,120,255,1)';
  const purpleL= 'rgba(180,120,255,0.10)';
  const purpleB= 'rgba(180,120,255,0.28)';
  const pink   = 'rgba(255,120,160,1)';
  const pinkL  = 'rgba(255,120,160,0.10)';
  const pinkB  = 'rgba(255,120,160,0.28)';

  const titleSz = 'clamp(18px,2.8vw,22px)';
  const bodySz  = 'clamp(16px,2.4vw,19px)';
  const labelSz = 'clamp(14px,2vw,16px)';
  const smallSz = 'clamp(13px,1.7vw,15px)';

  const fn = (n: number) => (
    <sup style={{ fontSize: '0.70em', fontWeight: 900, color: amber, marginLeft: 2, verticalAlign: 'super', lineHeight: 0 }}>[{n}]</sup>
  );

  const sectionCard = (accent: string, accentL: string, accentB: string, emoji: string, heading: string, theme: string, children: React.ReactNode) => (
    <div style={{ borderRadius: 16, background: accentL, border: `1.5px solid ${accentB}`, padding: '22px 24px', marginBottom: 20 }}>
      <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: accent, marginBottom: 8 }}>
        {emoji} {heading}
      </div>
      <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.55)', marginBottom: 14, fontStyle: 'italic' }}>{theme}</div>
      {children}
    </div>
  );

  const quoteBox = (text: string, author: string, accent: string, fnNum: number) => (
    <div style={{ background: 'rgba(0,0,0,0.25)', borderLeft: `3px solid ${accent}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', marginBottom: 12 }}>
      <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, margin: '0 0 6px 0', fontStyle: 'italic' }}>"{text}"</p>
      <div style={{ fontSize: labelSz, color: accent, fontWeight: 700 }}>— {author}{fn(fnNum)}</div>
    </div>
  );

  const questionsBox = (questions: string[], accent: string) => (
    <div style={{ background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '14px 18px', marginTop: 14 }}>
      <div style={{ fontSize: labelSz, fontWeight: 900, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>
        {pt ? 'Perguntas para o Conselheiro' : 'Counselor Questions'}
      </div>
      <ol style={{ margin: 0, paddingLeft: 20 }}>
        {questions.map((q, i) => (
          <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 8 }}>{q}</li>
        ))}
      </ol>
    </div>
  );

  const REFS = [
    { n: 1,  abnt: 'POWLISON, David. Seeing with New Eyes: Counseling and the Human Condition through the Lens of Scripture. Phillipsburg: Presbyterian and Reformed, 2003.' },
    { n: 2,  abnt: 'ADAMS, Jay E. Competent to Counsel: Introduction to Nouthetic Counseling. Grand Rapids: Zondervan, 1970.' },
    { n: 3,  abnt: 'TRIPP, Paul David. Instruments in the Redeemer\'s Hands: People in Need of Change Helping People in Need of Change. Phillipsburg: Presbyterian and Reformed, 2002.' },
    { n: 4,  abnt: 'WELCH, Edward T. Running Scared: Fear, Worry, and the God of Rest. Greensboro: New Growth Press, 2007.' },
    { n: 5,  abnt: 'POWLISON, David. Speaking Truth in Love: Counsel in Community. Greensboro: New Growth Press, 2005.' },
    { n: 6,  abnt: 'ADAMS, Jay E. A Theology of Christian Counseling: More Than Redemption. Grand Rapids: Zondervan, 1979.' },
    { n: 7,  abnt: 'BEEKE, Joel R. Family Worship. Grand Rapids: Reformation Heritage Books, 2009.' },
    { n: 8,  abnt: 'BAUCHAM, Voddie, Jr. Family Driven Faith: Doing What It Takes to Raise Sons and Daughters Who Walk with God. Wheaton: Crossway, 2007.' },
    { n: 9,  abnt: 'CROFT, Brian; SAVASTIO, Jim. The Pastor\'s Ministry: Biblical Priorities for Faithful Shepherds. Grand Rapids: Zondervan, 2015.' },
    { n: 10, abnt: 'TRIPP, Paul David. What Did You Expect? Redeeming the Realities of Marriage. Wheaton: Crossway, 2010.' },
    { n: 11, abnt: 'LANE, Timothy S.; TRIPP, Paul David. How People Change. Greensboro: New Growth Press, 2008.' },
    { n: 12, abnt: 'WELCH, Edward T. Side by Side: Walking with Others in Wisdom and Love. Wheaton: Crossway, 2015.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* HERO */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(255,180,50,0.15),rgba(80,200,255,0.10))', border: `1.5px solid ${amberB}`, padding: '28px 28px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(28px,4vw,38px)', marginBottom: 10 }}>🌳🚧</div>
        <div style={{ fontSize: 'clamp(20px,3.2vw,26px)', fontWeight: 900, color: amber, marginBottom: 8, lineHeight: 1.3 }}>
          {pt ? 'Aconselhamento Bíblico · Gênesis 2:4b–17' : 'Biblical Counseling · Genesis 2:4b–17'}
        </div>
        <div style={{ fontSize: titleSz, fontWeight: 700, color: green, marginBottom: 14 }}>
          {pt ? 'Recursos para o Conselheiro de Casais e Famílias' : 'Resources for the Couples and Family Counselor'}
        </div>
        <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Este guia oferece estrutura clínico-pastoral para conselheiros bíblicos que trabalham com casais e famílias, a partir dos temas centrais de Gênesis 2:4b–17. As citações dos autores são identificadas por notas de rodapé numeradas; as referências ABNT completas constam ao final.'
            : 'This guide offers a clinical-pastoral framework for biblical counselors working with couples and families, drawn from the central themes of Genesis 2:4b–17. Author citations are identified by numbered footnotes; full ABNT references appear at the end.'}
        </p>
      </div>

      {/* TRIAGE */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.12)', padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>
          🎯 {pt ? 'Problemas que esta Perícope Endereça — Guia de Triagem para o Conselheiro' : 'Problems this Pericope Addresses — Counselor Triage Guide'}
        </div>
        <p style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.50)', lineHeight: 1.65, margin: '0 0 16px 0', fontStyle: 'italic' }}>
          {pt
            ? 'Gênesis 2:4b–17 é a perícope do limite amoroso: providência que antecede a exigência, identidade que precede a liberdade, e o limite no centro como convite à confiança. O conselheiro pode utilizá-la quando o aconselhando enfrenta qualquer um dos cenários abaixo:'
            : 'Genesis 2:4b–17 is the pericope of the loving limit: providence that precedes the demand, identity that precedes freedom, and the limit at the center as an invitation to trust. The counselor may use it when the counselee faces any of the scenarios below:'}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 10 }}>
          {[
            { icon: '🚫', cor: amber,  titulo: pt ? 'Rejeição de Limites — Autonomia como Ídolo'       : 'Rejection of Limits — Autonomy as Idol',
              desc: pt ? 'Filhos, adolescentes ou adultos que resistem a qualquer autoridade — parental, conjugal, eclesial. Gn 2:17 diagnostica que a pretensão ao "conhecimento do bem e do mal" é o pecado original: definir moralidade autonomamente é usurpar o lugar de Deus.' : 'Children, adolescents or adults who resist any authority — parental, marital, ecclesial. Gen 2:17 diagnoses that the claim to "knowledge of good and evil" is the original sin: defining morality autonomously is usurping God\'s place.' },
            { icon: '😰', cor: blue,   titulo: pt ? 'Autoridade Parental em Crise — Pais sem Limite'   : 'Parental Authority in Crisis — Parents without Limits',
              desc: pt ? 'Pais que não conseguem estabelecer ou manter limites por medo da rejeição dos filhos, por culpa, ou por confundir amor com ausência de fronteiras. Gn 2 ensina: limite sem amor é tirania; amor sem limite é negligência. O padrão divino une os dois.' : 'Parents who cannot establish or maintain limits for fear of children\'s rejection, guilt, or confusion of love with absence of boundaries. Gen 2 teaches: limit without love is tyranny; love without limit is negligence. The divine pattern unites both.' },
            { icon: '😶', cor: green,  titulo: pt ? 'Crise de Identidade — "Para que Existo?"'          : 'Identity Crisis — "Why Do I Exist?"',
              desc: pt ? 'Adolescentes e adultos que não sabem quem são fora de seus papéis ou conquistas. Avad e shamar (Gn 2:15) dão vocação antes de liberdade: a identidade como servo-guardião precede qualquer escolha. O conselheiro ancora: você é obra de mãos divinas (yatsar, v.7).' : 'Adolescents and adults who do not know who they are outside their roles or achievements. Avad and shamar (Gen 2:15) give vocation before freedom: the identity as servant-keeper precedes any choice. The counselor anchors: you are the work of divine hands (yatsar, v.7).' },
            { icon: '💔', cor: purple, titulo: pt ? 'Casamento sem Regras Compartilhadas — Limites Desalinhados' : 'Marriage without Shared Rules — Misaligned Limits',
              desc: pt ? 'Casais onde cada cônjuge tem seu próprio sistema de regras para filhos, finanças, telas e família extensa — produzindo conflito constante. O mandato de "guardar o jardim" (shamar) é dado ao casal como unidade; regras do lar devem ser decididas juntos.' : 'Couples where each spouse has their own rule system for children, finances, screens and extended family — producing constant conflict. The mandate to "keep the garden" (shamar) is given to the couple as a unit; home rules must be decided together.' },
            { icon: '😤', cor: pink,   titulo: pt ? 'Filho que Rejeita a Autoridade dos Pais'          : 'Child Rejecting Parental Authority',
              desc: pt ? 'Filhos que desafiam sistematicamente qualquer limite. A perícope oferece o enquadramento: os limites dos pais são imagem do limite amoroso de Deus. O conselheiro pode usar Gn 2:16–17 para mostrar que toda autoridade humana legítima é reflexo da autoridade do Criador.' : 'Children who systematically challenge any limit. The pericope provides the framework: parents\' limits are an image of God\'s loving limit. The counselor can use Gen 2:16–17 to show that all legitimate human authority is a reflection of the Creator\'s authority.' },
            { icon: '🧩', cor: amber,  titulo: pt ? 'Providência Negada — "Deus Não Cuida de Mim"'    : 'Providence Denied — "God Doesn\'t Care for Me"',
              desc: pt ? 'Pessoas em crise que não conseguem ver cuidado de Deus em suas vidas. Gn 2:5–6 — o ribeiro que rega antes de haver homem — e Gn 2:16 — "de toda árvore comerás livremente" antes de nomear a proibida — são o texto diagnóstico: Deus provê 99% antes de restringir 1%.' : 'People in crisis who cannot see God\'s care in their lives. Gen 2:5–6 — the stream that waters before any man — and Gen 2:16 — "you may freely eat of every tree" before naming the forbidden one — are the diagnostic text: God provides 99% before restricting 1%.' },
          ].map((p2, i) => (
            <div key={i} style={{ background: `${p2.cor}0D`, border: `1px solid ${p2.cor}33`, borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: labelSz, fontWeight: 900, color: p2.cor, marginBottom: 6 }}>{p2.icon} {p2.titulo}</div>
              <div style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.78)', lineHeight: 1.65 }}>{p2.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18, borderRadius: 12, background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.28)', padding: '16px 20px' }}>
          <div style={{ fontSize: labelSz, fontWeight: 900, color: amber, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>
            ✝️ {pt ? 'Enquadramento Histórico-Redentivo para o Conselheiro' : 'Redemptive-Historical Frame for the Counselor'}
          </div>
          <p style={{ fontSize: bodySz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.80, margin: 0 }}>
            {pt
              ? 'O jardim do Éden com sua árvore proibida no centro aponta para o jardim de Getsêmani, onde o segundo Adão disse "não a minha vontade, mas a Tua" (Lc 22:42). Cristo cumpriu o que Adão falhou: permaneceu dentro do limite da obediência filial perfeita até a morte (Fp 2:8). A madeira da maldição tornou-se a árvore da vida (Ap 22:2), e o acesso a ela é pela obediência de Cristo imputada. O conselheiro que apresenta o limite sem o cumprimento de Cristo está pedindo ao aconselhando que faça o que Adão não conseguiu — pela mesma força que Adão falhou. Somente o Evangelho — Cristo obedeceu em seu lugar — produz obediência verdadeira e duradoura dentro dos limites de Deus.'
              : 'The Garden of Eden with its forbidden tree at the center points to the garden of Gethsemane, where the second Adam said "not my will, but yours" (Luke 22:42). Christ fulfilled what Adam failed: he remained within the limits of perfect filial obedience unto death (Phil 2:8). The wood of the curse became the tree of life (Rev 22:2), and access to it is through Christ\'s imputed obedience. The counselor who presents the limit without Christ\'s fulfillment is asking the counselee to do what Adam could not — by the same strength Adam failed with. Only the Gospel — Christ obeyed in your place — produces true and lasting obedience within God\'s limits.'}
          </p>
        </div>
      </div>

      {/* SEÇÃO 1 — Providência */}
      {sectionCard(amber, amberL, amberB, '💧',
        pt ? 'Seção 1 — A Providência que Antecede: Deus Provê Antes de Pedir' : 'Section 1 — The Providence that Precedes: God Provides Before Asking',
        pt ? 'Gênesis 2:5–7,16 — ribeiro antes do homem; "de toda árvore comerás livremente" antes da proibição' : 'Genesis 2:5–7,16 — stream before man; "you may freely eat of every tree" before the prohibition',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'O padrão de Deus: provisão generosa antes de qualquer exigência. Gn 2:16 afirma liberdade total ("de toda árvore") antes de nomear a única exceção. A percepção distorcida de Deus — que Ele é principalmente o que proíbe — é o diagnóstico de muitos que chegam ao conselheiro com rejeição à autoridade ou à fé.' : 'God\'s pattern: generous provision before any demand. Gen 2:16 affirms total freedom ("of every tree") before naming the single exception. The distorted perception of God — that He is primarily what He prohibits — is the diagnosis of many who come to the counselor with rejection of authority or faith.',
              pt ? 'A autoridade parental que segue esse padrão — provisão e presença antes de regras — constrói confiança antes de exigir obediência. Pais que só dizem "não" sem estabelecer primeiro a abundância do "sim" criam filhos que entendem Deus como tirano, não como Pai.' : 'Parental authority that follows this pattern — provision and presence before rules — builds trust before demanding obedience. Parents who only say "no" without first establishing the abundance of "yes" create children who understand God as a tyrant, not a Father.',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'A primeira pergunta do conselheiro diante de uma família em conflito com limites não é "quais regras estão sendo quebradas?" — é "a provisão e a presença do amor foram estabelecidas antes das exigências?" O filho que não obedece frequentemente é o filho que não foi primeiro amado de forma visível.'
               : 'The counselor\'s first question before a family in conflict with limits is not "which rules are being broken?" — but "were provision and the presence of love established before the demands?" The disobedient child is often the child who was not first loved visibly.',
            'Paul David Tripp', amber, 3)}
          {quoteBox(
            pt ? 'O aconselhando que diz "Deus só me dá regras" tem uma visão distorcida de Deus que começa pela visão distorcida que teve de seus pais. O conselheiro recalibra: "de toda árvore comerás livremente" — Deus provê 99% antes de restringir 1%. Como isso muda sua visão dEle?'
               : 'The counselee who says "God only gives me rules" has a distorted view of God that begins with a distorted view of their parents. The counselor recalibrates: "you may freely eat of every tree" — God provides 99% before restricting 1%. How does this change your view of Him?',
            'David Powlison', green, 1)}
          {quoteBox(
            pt ? 'O padrão de Richard Baxter ainda vale: "Prove primeiro seu amor, depois apresente suas exigências." A criança que conhece o amor de seu pai obedece por afeto, não por medo. O conselheiro ensina pais a provar amor antes de exigir obediência — porque esse é o padrão que Deus mesmo revelou no Éden.'
               : 'Richard Baxter\'s pattern still holds: "First prove your love, then present your demands." The child who knows their father\'s love obeys from affection, not fear. The counselor teaches parents to prove love before demanding obedience — because that is the pattern God himself revealed in Eden.',
            'Jay E. Adams', blue, 6)}
          <div style={{ background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: amber, marginBottom: 6 }}>✝️ {pt ? 'Perspectiva Histórico-Redentiva' : 'Redemptive-Historical Perspective'}</div>
            <p style={{ fontSize: smallSz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
              {pt
                ? 'A sequência de Gênesis 2 — provisão abundante, depois limite — é o padrão de toda graça: Deus amou primeiro (1Jo 4:19), deu o Filho antes de qualquer mérito nosso (Rm 5:8). O Evangelho segue o padrão do jardim: "enquanto éramos ainda pecadores, Cristo morreu por nós" — provisão máxima antes de qualquer obediência. A família que vive esse padrão — dando presença e amor antes de exigir — está imitando a graça da criação e da redenção. O conselheiro que corrige pais ausentes, mas presentes apenas nas cobranças, está prescrevendo o padrão de Gênesis 2.'
                : 'The Genesis 2 sequence — abundant provision, then limit — is the pattern of all grace: God loved first (1 John 4:19), gave the Son before any merit (Rom 5:8). The Gospel follows the garden pattern: "while we were still sinners, Christ died for us" — maximum provision before any obedience. The family that lives this pattern — giving presence and love before demanding — is imitating the grace of creation and redemption.'}
            </p>
          </div>
          {questionsBox([
            pt ? '"Seus filhos experimentam primeiro a sua provisão generosa e presença amorosa — ou o primeiro sinal de sua presença é a cobrança e a regra? Como seu padrão reflete o padrão de Deus no jardim?"'
               : '"Do your children experience your generous provision and loving presence first — or is the first sign of your presence a demand or rule? How does your pattern reflect God\'s pattern in the garden?"',
            pt ? '"Quando você pensa em Deus, o que vem primeiro — o que Ele proíbe ou o que Ele provê? De onde veio essa percepção? Como Gênesis 2 a desafia?"'
               : '"When you think of God, what comes first — what He prohibits or what He provides? Where did that perception come from? How does Genesis 2 challenge it?"',
            pt ? '"Em que área do casamento ou da família você tem exigido obediência sem ter estabelecido provisão e amor primeiro?"'
               : '"In what area of your marriage or family have you demanded obedience without first establishing provision and love?"',
          ], amber)}
        </>
      )}

      {/* SEÇÃO 2 — Avad e Shamar */}
      {sectionCard(green, greenL, greenB, '⚒️',
        pt ? 'Seção 2 — Avad e Shamar: Identidade que Precede a Liberdade' : 'Section 2 — Avad and Shamar: Identity that Precedes Freedom',
        pt ? 'Gênesis 2:7,15 — yatsar (formado como obra de mãos divinas); avad e shamar (servir e guardar)' : 'Genesis 2:7,15 — yatsar (formed as work of divine hands); avad and shamar (serve and keep)',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'Yatsar (2:7) — vocabulário do oleiro: o homem é obra artesanal de Deus, não produto de acaso. Para o conselheiro, essa é a fundação da identidade: "você foi cuidadosamente formado." Avad e shamar (2:15) dão vocação antes de liberdade — o homem sabe o que é (servo-guardião) antes de saber o que pode fazer.' : 'Yatsar (2:7) — potter\'s vocabulary: man is God\'s artisan work, not a product of chance. For the counselor, this is identity\'s foundation: "you were carefully formed." Avad and shamar (2:15) give vocation before freedom — the man knows what he is (servant-keeper) before knowing what he may do.',
              pt ? 'A crise de identidade moderna nasce quando a autonomia precede a vocação: "o que você quer ser?" antes de "quem você é?" A família que ensina avad e shamar — você é servo-guardião de Deus — antes de ensinar autonomia produz filhos com ancoragem existencial que a cultura não pode oferecer.' : 'The modern identity crisis is born when autonomy precedes vocation: "what do you want to be?" before "who are you?" The family that teaches avad and shamar — you are God\'s servant-keeper — before teaching autonomy produces children with an existential anchor that culture cannot offer.',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'A maior pergunta que um conselheiro pode fazer a um adolescente em crise de identidade não é "o que você quer?" — é "de quem você é?" A resposta a essa pergunta — sou obra de mãos divinas, formado para servir e guardar — é a fundação que nenhuma terapia de autoestima pode construir.'
               : 'The greatest question a counselor can ask an adolescent in identity crisis is not "what do you want?" — but "to whom do you belong?" The answer to that question — I am the work of divine hands, formed to serve and keep — is the foundation that no self-esteem therapy can build.',
            'Edward T. Welch', green, 4)}
          {quoteBox(
            pt ? 'O maior presente que um pai pode dar a seu filho é uma identidade sólida: saber quem você é (criado por Deus), de quem você é (filho do Rei) e para que você é (glorificar a Deus e servir o mundo). Antes de "o que você vai ser quando crescer?" — "quem você já é diante de Deus?"'
               : 'The greatest gift a father can give his child is a solid identity: knowing who you are (created by God), whose you are (a child of the King) and what you are for (to glorify God and serve the world). Before "what will you be when you grow up?" — "who are you already before God?"',
            'Voddie Baucham Jr.', amber, 8)}
          {quoteBox(
            pt ? 'A crise conjugal de identidade — "não sei quem sou fora do meu papel de pai/mãe/cônjuge" — tem diagnóstico em Gênesis 2: avad e shamar definem o ser humano antes de qualquer papel social. O conselheiro ancora: sua identidade não é o que você faz — é o que Deus fez em você ao formá-lo.'
               : 'The marital identity crisis — "I don\'t know who I am outside my role as father/mother/spouse" — has its diagnosis in Genesis 2: avad and shamar define the human being before any social role. The counselor anchors: your identity is not what you do — it is what God did in you when He formed you.',
            'Paul David Tripp', blue, 3)}
          <div style={{ background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: amber, marginBottom: 6 }}>✝️ {pt ? 'Perspectiva Histórico-Redentiva' : 'Redemptive-Historical Perspective'}</div>
            <p style={{ fontSize: smallSz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
              {pt
                ? 'Cristo é o perfeito Avad (Servo, Is 52:13; 53:11) e Shamar (Guardião, Jo 17:12 — "daqueles que me deste, nenhum se perdeu"). Ele exerceu a vocação de servo-guardião que Adão abandonou — e o fez até a morte, "obediente até a morte de cruz" (Fp 2:8). Em Cristo, a identidade de servo-guardião é restaurada: "somos sua obra, criados em Cristo Jesus para as boas obras" (Ef 2:10). O conselheiro que ancora a identidade do aconselhando em Cristo está conectando avad e shamar à sua fonte cristológica — não lei, mas graça que produz serviço.'
                : 'Christ is the perfect Avad (Servant, Isa 52:13; 53:11) and Shamar (Keeper, John 17:12 — "of those you gave me, not one was lost"). He exercised the servant-keeper vocation that Adam abandoned — and did so unto death, "obedient to the point of death, even death on a cross" (Phil 2:8). In Christ, the servant-keeper identity is restored: "we are his workmanship, created in Christ Jesus for good works" (Eph 2:10).'}
            </p>
          </div>
          {questionsBox([
            pt ? '"Como você definiria sua identidade fora de seus papéis — sem ser pai/mãe, cônjuge ou profissional? O que resta quando você tira todas as funções?"'
               : '"How would you define your identity outside your roles — without being father/mother, spouse or professional? What remains when you remove all functions?"',
            pt ? '"Seus filhos sabem que são obras de mãos divinas — que foram cuidadosamente formados por Deus? Você já disse isso a eles explicitamente?"'
               : '"Do your children know they are the work of divine hands — that they were carefully formed by God? Have you ever said this to them explicitly?"',
            pt ? '"A crise de identidade do seu filho adolescente (ou sua crise) tem raiz em avad e shamar: ele/você sabe para que foi formado — para servir e guardar — ou ainda está procurando sentido nas conquistas e aprovações externas?"'
               : '"The identity crisis of your adolescent (or your crisis) is rooted in avad and shamar: does he/she/you know what you were formed for — to serve and keep — or are you still seeking meaning in external achievements and approval?"',
          ], green)}
        </>
      )}

      {/* SEÇÃO 3 — Limite no Centro */}
      {sectionCard(blue, blueL, blueB, '🌳',
        pt ? 'Seção 3 — O Limite que Define: A Árvore no Centro — Centro ◉' : 'Section 3 — The Limit that Defines: The Tree at the Center — Center ◉',
        pt ? 'Gênesis 2:9,16–17 — betok hagan (no centro do jardim); mot tamut; da\'at tov vara\'' : 'Genesis 2:9,16–17 — betok hagan (center of the garden); mot tamut; da\'at tov vara\'',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'Betok hagan (no centro) não é acidente topográfico — é posição teológica: o limite fica onde a criatura passa todo dia, podendo escolher livremente. Deus não escondeu a árvore; colocou-a no caminho. O limite é convite diário à confiança, não prisão.' : 'Betok hagan (at the center) is not a topographical accident — it is a theological position: the limit stands where the creature passes every day, able to choose freely. God did not hide the tree; He placed it on the path. The limit is a daily invitation to trust, not a prison.',
              pt ? 'Da\'at tov vara\' (conhecimento do bem e do mal) é a prerrogativa divina de definir moralidade. O pecado original é a pretensão à autonomia moral — "definir por si mesmo o que é bom e o que é mau." O conselheiro reconhece esse padrão em casamentos e famílias: quem está definindo o bem e o mal no seu lar — Deus ou o consenso familiar?' : 'Da\'at tov vara\' (knowledge of good and evil) is the divine prerogative to define morality. Original sin is the claim to moral autonomy — "defining for oneself what is good and evil." The counselor recognizes this pattern in marriages and families: who is defining good and evil in your home — God or family consensus?',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'Todo filho que recusa limites está, no fundo, cometendo o pecado de Gênesis 3 antes de ter comido o fruto: está pretendendo definir por si mesmo o que é bom e mau. O conselheiro não trata desobediência como problema de comportamento — trata como problema teológico: quem está no centro do jardim desta família?'
               : 'Every child who refuses limits is, at bottom, committing the sin of Genesis 3 before eating the fruit: claiming to define for themselves what is good and evil. The counselor does not treat disobedience as a behavior problem — but as a theological problem: who is at the center of this family\'s garden?',
            'Jay E. Adams', blue, 2)}
          {quoteBox(
            pt ? 'A resistência aos limites no casamento — "não vou aceitar que você me diga o que fazer" — tem o mesmo DNA teológico: a pretensão à autonomia moral. O conselheiro deve nomear isso com clareza e apontar para Cristo, que ao contrário de Adão, disse "não a minha vontade" no jardim de Getsêmani.'
               : 'Resistance to limits in marriage — "I won\'t accept you telling me what to do" — has the same theological DNA: the claim to moral autonomy. The counselor must name this clearly and point to Christ, who unlike Adam, said "not my will" in the garden of Gethsemane.',
            'David Powlison', green, 5)}
          {quoteBox(
            pt ? 'Ensinar uma criança a obedecer sem questionar é um dos maiores presentes que podemos dar-lhe. A criança que aprende a obedecer a seus pais está aprendendo a obedecer a Deus. O limite é a escola da confiança — e a confiança é a fundação da fé.'
               : 'Training a child to obey without questioning is one of the greatest gifts we can give them. The child who learns to obey their parents is learning to obey God. The limit is the school of trust — and trust is the foundation of faith.',
            'J.C. Ryle', amber, 11)}
          <div style={{ background: 'rgba(80,200,255,0.10)', border: '1px solid rgba(80,200,255,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: blue, marginBottom: 6 }}>{pt ? 'Prática Clínica Pastoral' : 'Clinical Pastoral Practice'}</div>
            <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.7, margin: 0 }}>
              {pt
                ? 'O conselheiro pode pedir ao casal que liste as regras atuais do lar e responda: "Cada regra tem uma razão amorosa por trás? Foi decidida junto ou por um só cônjuge? É aplicada de forma consistente?" Esse exercício revela o padrão de autoridade real do lar.'
                : 'The counselor can ask the couple to list the current home rules and answer: "Does each rule have a loving reason behind it? Was it decided together or by one spouse alone? Is it applied consistently?" This exercise reveals the actual authority pattern of the home.'}
            </p>
          </div>
          <div style={{ background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: amber, marginBottom: 6 }}>✝️ {pt ? 'Perspectiva Histórico-Redentiva' : 'Redemptive-Historical Perspective'}</div>
            <p style={{ fontSize: smallSz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
              {pt
                ? 'A árvore no centro do jardim aponta para a cruz no centro da história. Em Getsêmani, Cristo enfrentou a mesma escolha de Adão: obedecer ao limite do Pai ou tomar a autonomia. Cristo disse "não a minha vontade, mas a Tua" (Lc 22:42) — e nisso cumpriu o que Adão não cumpriu. A madeira da maldição (Dt 21:23; Gl 3:13) tornou-se a árvore da vida (Ap 22:2). O conselheiro que aponta para a cruz não está apenas mostrando um modelo de obediência — está mostrando o fundamento da obediência do aconselhando: Cristo obedeceu em seu lugar, e agora o Espírito Santo produz em nós a mesma disposição de dizer "não a minha vontade" (Rm 8:13–14).'
                : 'The tree at the center of the garden points to the cross at the center of history. In Gethsemane, Christ faced the same choice as Adam: obey the Father\'s limit or take autonomy. Christ said "not my will, but yours" (Luke 22:42) — and in doing so fulfilled what Adam failed. The wood of the curse (Deut 21:23; Gal 3:13) became the tree of life (Rev 22:2). The counselor pointing to the cross is not merely showing a model of obedience — they are showing the foundation: Christ obeyed in our place, and now the Holy Spirit produces in us the same disposition to say "not my will" (Rom 8:13–14).'}
            </p>
          </div>
          {questionsBox([
            pt ? '"Quem define o que é bom e mau no seu lar na prática — a Palavra de Deus, o consenso familiar, a cultura ou o cônjuge mais forte? Como Gênesis 2:17 desafia esse padrão?"'
               : '"Who defines what is good and evil in your home in practice — the Word of God, family consensus, culture or the stronger spouse? How does Genesis 2:17 challenge that pattern?"',
            pt ? '"Em que área da sua vida você está mais resistente aos limites de Deus? O que você está tentando tomar para si que pertence à prerrogativa dEle?"'
               : '"In what area of your life are you most resistant to God\'s limits? What are you trying to take for yourself that belongs to His prerogative?"',
            pt ? '"Cristo disse não a minha vontade no jardim de Getsêmani — e isso nos deu acesso à árvore da vida. Como a obediência de Cristo em seu lugar muda sua relação com os limites de Deus?"'
               : '"Christ said not my will in the garden of Gethsemane — and that gave us access to the tree of life. How does Christ\'s obedience in your place change your relationship with God\'s limits?"',
          ], blue)}
        </>
      )}

      {/* SEÇÃO 4 — Autoridade Parental */}
      {sectionCard(purple, purpleL, purpleB, '👨‍👩‍👧',
        pt ? 'Seção 4 — A Autoridade Parental como Imagem do Pai Criador' : 'Section 4 — Parental Authority as Image of the Creator Father',
        pt ? 'Síntese de Gênesis 2:4b–17 — o casal como unidade de shamar; pais como primeira imagem de Deus' : 'Genesis 2:4b–17 synthesis — the couple as a shamar unit; parents as first image of God',
        <>
          <ul style={{ margin: '0 0 14px 0', paddingLeft: 20 }}>
            {[
              pt ? 'Os pais são a primeira e mais poderosa imagem de Deus que os filhos conhecerão. Se os pais revelam um Deus que só proíbe, sem provisão e presença, os filhos desenvolverão uma teologia distorcida. Se revelam um Deus de pura permissividade, sem limites, produzirão a mesma distorção na direção oposta.' : 'Parents are the first and most powerful image of God that children will know. If parents reveal a God who only prohibits, without provision and presence, children will develop a distorted theology. If they reveal a God of pure permissiveness, without limits, they will produce the same distortion in the opposite direction.',
              pt ? 'O mandato de shamar (guardar) em Gênesis 2:15 é dado antes ao homem — mas em Gênesis 2 o casal ainda está sendo formado (o texto de 2:18–25 virá a seguir). A autoridade parental é exercida pelo casal como unidade; regras desalinhadas entre pai e mãe são o equivalente doméstico de um jardim sem shamar consistente.' : 'The mandate to shamar (keep) in Genesis 2:15 is first given to the man — but in Genesis 2 the couple is still being formed (the text of 2:18–25 follows). Parental authority is exercised by the couple as a unit; misaligned rules between father and mother are the domestic equivalent of a garden without consistent shamar.',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, marginBottom: 6 }}>{item}</li>
            ))}
          </ul>
          {quoteBox(
            pt ? 'Os pais devem ser para seus filhos a primeira e mais clara imagem de Deus que eles conhecerão. Se você é amoroso mas sem limites, você ensina um falso deus. Se você tem limites mas sem amor, você ensina outro falso deus. O verdadeiro Pai une os dois — e Gênesis 2 revela esse padrão.'
               : 'Parents must be for their children the first and clearest image of God they will know. If you are loving but without limits, you teach a false god. If you have limits but no love, you teach another false god. The true Father unites both — and Genesis 2 reveals this pattern.',
            'Richard Baxter', purple, 9)}
          {quoteBox(
            pt ? 'Quando o conselheiro pergunta a um adulto "como você imagina Deus?", ele está, na maioria dos casos, obtendo um retrato composto dos pais. A teologia natural de toda criança começa nos pais. O pai que ama e limita bem é o apologeta mais eficaz que a Igreja tem.'
               : 'When the counselor asks an adult "how do you picture God?", they are, in most cases, obtaining a composite portrait of the parents. Every child\'s natural theology begins with the parents. The father who loves well and limits well is the most effective apologist the Church has.',
            'David Powlison', green, 1)}
          {quoteBox(
            pt ? 'Pais que não disciplinam seus filhos não estão sendo amorosos — estão sendo covardes. O amor verdadeiro faz o difícil porque se importa com o destino eterno da criança, não apenas com seu conforto presente. Limite sem amor é tirania; mas amor sem limite é abandono disfarçado de gentileza.'
               : 'Parents who do not discipline their children are not being loving — they are being cowardly. True love does the hard thing because it cares about the child\'s eternal destiny, not merely their present comfort. Limit without love is tyranny; but love without limit is abandonment disguised as kindness.',
            'Voddie Baucham Jr.', amber, 8)}
          <div style={{ background: 'rgba(255,180,50,0.07)', border: '1px solid rgba(255,180,50,0.25)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: labelSz, fontWeight: 800, color: amber, marginBottom: 6 }}>✝️ {pt ? 'Perspectiva Histórico-Redentiva' : 'Redemptive-Historical Perspective'}</div>
            <p style={{ fontSize: smallSz, color: 'rgba(255,230,180,0.88)', lineHeight: 1.75, margin: 0 }}>
              {pt
                ? 'O Pai celestial revelado em Cristo une os dois atributos que Gênesis 2 exibe: provisão máxima ("tanto amou Deus o mundo que deu o Seu Filho Unigênito" — Jo 3:16) e limite absoluto que protege ("ninguém vem ao Pai senão por mim" — Jo 14:6). A autoridade parental que imita esse padrão não é arbitrária — é teológica. O conselheiro que ajuda pais a exercer autoridade com amor e consistência está ajudando-os a revelar o Deus de Gênesis 2 para seus filhos — o Pai que provê antes de proibir, e proíbe porque ama.'
                : 'The heavenly Father revealed in Christ unites both attributes Genesis 2 displays: maximum provision ("God so loved the world that he gave his only Son" — John 3:16) and absolute limit that protects ("no one comes to the Father except through me" — John 14:6). Parental authority that imitates this pattern is not arbitrary — it is theological. The counselor who helps parents exercise authority with love and consistency is helping them reveal the God of Genesis 2 to their children — the Father who provides before prohibiting, and prohibits because He loves.'}
            </p>
          </div>
          {questionsBox([
            pt ? '"Se seus filhos descrevessem você como imagem de Deus — que tipo de Deus você estaria revelando a eles? Providente e amoroso? Só restritivo? Ausente? Permissivo demais?"'
               : '"If your children described you as an image of God — what kind of God would you be revealing to them? Provident and loving? Only restrictive? Absent? Too permissive?"',
            pt ? '"Como casal, vocês apresentam uma frente unida nas regras do lar — ou os filhos percebem uma fissura e a exploram? O que vocês precisam alinhar antes da próxima sessão?"'
               : '"As a couple, do you present a united front in home rules — or do the children notice a crack and exploit it? What do you need to align before the next session?"',
            pt ? '"Gênesis 2 mostra um Pai que deu primeiro e depois limitou. Em sua vida, o que Deus já proveu abundantemente — e você tem reconhecido isso antes de se concentrar no que Ele ainda não deu?"'
               : '"Genesis 2 shows a Father who gave first and then limited. In your life, what has God already provided abundantly — and have you been recognizing that before focusing on what He has not yet given?"',
          ], purple)}
        </>
      )}

      {/* SEÇÃO 5 — Autores */}
      <div style={{ borderRadius: 16, background: pinkL, border: `1.5px solid ${pinkB}`, padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: pink, marginBottom: 16 }}>
          📚 {pt ? 'Seção 5 — Autores e Obras de Referência' : 'Section 5 — Reference Authors and Works'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 12, marginBottom: 16 }}>
          {[
            { fn: 2,  name: 'Jay E. Adams',           works: 'Competent to Counsel (1970); A Theology of Christian Counseling (1979)', desc: pt ? 'Autoridade como responsabilidade; limites como prescrição bíblica; disciplina que forma obediência' : 'Authority as responsibility; limits as biblical prescription; discipline that forms obedience', color: blue },
            { fn: 1,  name: 'David Powlison',         works: 'Seeing with New Eyes (2003); Speaking Truth in Love (2005)', desc: pt ? 'Diagnóstico teológico da autonomia; pais como imagem de Deus; teologia natural da criança' : 'Theological diagnosis of autonomy; parents as image of God; child\'s natural theology', color: green },
            { fn: 3,  name: 'Paul David Tripp',       works: 'Instruments in the Redeemer\'s Hands (2002); What Did You Expect? (2010)', desc: pt ? 'Provisão antes de exigência; padrão do jardim na autoridade parental' : 'Provision before demand; garden pattern in parental authority', color: amber },
            { fn: 4,  name: 'Edward T. Welch',        works: 'Running Scared (2007); Side by Side (2015)', desc: pt ? 'Avad e shamar como fundação da identidade; ancoragem existencial em yatsar' : 'Avad and shamar as identity foundation; existential anchoring in yatsar', color: purple },
            { fn: 7,  name: 'Joel R. Beeke',          works: 'Family Worship (2009); Parenting by God\'s Promises (2011)', desc: pt ? 'Culto familiar; autoridade parental como reflexo da soberania de Deus' : 'Family worship; parental authority as reflection of God\'s sovereignty', color: amber },
            { fn: 8,  name: 'Voddie Baucham Jr.',     works: 'Family Driven Faith (2007); Family Shepherds (2011)', desc: pt ? 'Identidade antes de vocação; disciplina corajosa como ato de amor eterno' : 'Identity before vocation; courageous discipline as an act of eternal love', color: pink },
            { fn: 9,  name: 'Richard Baxter',         works: 'A Christian Directory (1673)', desc: pt ? 'Provar amor antes de exigir obediência; o lar como primeira catequese teológica' : 'Prove love before demanding obedience; the home as the first theological catechesis', color: green },
          ].map((a, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', padding: '14px 16px' }}>
              <div style={{ fontSize: labelSz, fontWeight: 900, color: a.color, marginBottom: 4 }}>{a.name}{fn(a.fn)}</div>
              <div style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.50)', marginBottom: 6, fontStyle: 'italic' }}>{a.works}</div>
              <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{a.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '12px 16px', borderLeft: `3px solid ${pink}` }}>
          <p style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
            {pt
              ? 'Conselheiro bíblico reformado diante de Gênesis 2: não pergunte apenas "por que esse filho não obedece?" — pergunte "que imagem de Deus os pais têm revelado? Provisão veio antes do limite? Ou só o limite?" O diagnóstico correto muda completamente a intervenção.'
              : 'Reformed biblical counselor before Genesis 2: do not only ask "why won\'t this child obey?" — ask "what image of God have the parents been revealing? Did provision come before the limit? Or only the limit?" The correct diagnosis completely changes the intervention.'}
          </p>
        </div>
      </div>

      {/* SEÇÃO 6 — Plano */}
      <div style={{ borderRadius: 16, background: greenL, border: `1.5px solid ${greenB}`, padding: '22px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: green, marginBottom: 16 }}>
          🗓️ {pt ? 'Seção 6 — Plano de 4 Sessões baseado em Gênesis 2:4b–17' : 'Section 6 — 4-Session Plan based on Genesis 2:4b–17'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              n: '1', ref: 'Gênesis 2:5–7,16', color: amber,
              title: pt ? 'A Provisão que Antecede — Mapa do Jardim' : 'The Preceding Provision — Garden Map',
              desc: pt
                ? 'Diagnóstico: o aconselhando experimenta Deus principalmente como provedor ou como proibidor? Identificação da imagem de Deus recebida dos pais. Âncora histórico-redentiva: "de toda árvore comerás livremente" — Deus provê 99% antes de restringir 1%. "Enquanto éramos pecadores, Cristo morreu por nós" (Rm 5:8). Powlison[1], Adams[6].'
                : 'Diagnosis: does the counselee primarily experience God as provider or prohibitor? Identifying the image of God received from parents. Redemptive anchor: "you may freely eat of every tree" — God provides 99% before restricting 1%. "While we were still sinners, Christ died for us" (Rom 5:8). Powlison[1], Adams[6].',
            },
            {
              n: '2', ref: 'Gênesis 2:7,15', color: green,
              title: pt ? 'Identidade em Yatsar — Quem Você É' : 'Identity in Yatsar — Who You Are',
              desc: pt
                ? 'Trabalho de identidade: "você é obra de mãos divinas" (yatsar). Avad e shamar como vocação que precede liberdade. Âncora histórico-redentiva: Cristo o perfeito Avad e Shamar (Is 52:13; Jo 17:12) — em Cristo a identidade servo-guardião é restaurada (Ef 2:10). Welch[4], Tripp[3,11].'
                : 'Identity work: "you are the work of divine hands" (yatsar). Avad and shamar as vocation that precedes freedom. Redemptive anchor: Christ the perfect Avad and Shamar (Isa 52:13; John 17:12) — in Christ the servant-keeper identity is restored (Eph 2:10). Welch[4], Tripp[3,11].',
            },
            {
              n: '3', ref: 'Gênesis 2:9,16–17', color: blue,
              title: pt ? 'O Limite no Centro — Diagnóstico de Autonomia' : 'The Limit at the Center — Autonomy Diagnosis',
              desc: pt
                ? 'Identificar onde o aconselhando está pretendendo da\'at tov vara\' — definindo moralidade autonomamente. Revisão das regras do lar pelo casal. Âncora histórico-redentiva: Getsêmani — Cristo disse "não a minha vontade" onde Adão disse "a minha vontade". O Espírito produz essa mesma disposição (Rm 8:13–14). Adams[2], Powlison[5].'
                : 'Identify where the counselee is claiming da\'at tov vara\' — defining morality autonomously. Couple\'s review of home rules. Redemptive anchor: Gethsemane — Christ said "not my will" where Adam said "my will." The Spirit produces this same disposition (Rom 8:13–14). Adams[2], Powlison[5].',
            },
            {
              n: '4', ref: 'Gênesis 2:4b–17 síntese', color: purple,
              title: pt ? 'Autoridade Parental — Imagem do Pai Criador' : 'Parental Authority — Image of the Creator Father',
              desc: pt
                ? 'Síntese: que imagem de Deus a família está revelando? Plano de ajuste da autoridade parental unida: provisão, presença, limite, consistência. Âncora histórico-redentiva: o Pai celestial em Cristo — provisão máxima (Jo 3:16) e limite protetor (Jo 14:6). O lar que imita esse padrão revela o Deus de Gênesis 2 aos filhos. Beeke[7], Baucham[8], Baxter[9].'
                : 'Synthesis: what image of God is the family revealing? Plan to adjust united parental authority: provision, presence, limit, consistency. Redemptive anchor: the heavenly Father in Christ — maximum provision (John 3:16) and protective limit (John 14:6). The home that imitates this pattern reveals the God of Genesis 2 to children. Beeke[7], Baucham[8], Baxter[9].',
            },
          ].map((s) => (
            <div key={s.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: '#000' }}>{s.n}</div>
              <div>
                <div style={{ fontSize: titleSz, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: labelSz, color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 6 }}>{s.ref}</div>
                <div style={{ fontSize: bodySz, color: 'rgba(255,255,255,0.80)', lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REFERÊNCIAS ABNT */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.10)', padding: '22px 24px', marginBottom: 8 }}>
        <div style={{ fontSize: labelSz, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.50)', marginBottom: 16 }}>
          📎 {pt ? 'Referências Bibliográficas (ABNT)' : 'Bibliographic References (ABNT)'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {REFS.map((r) => (
            <div key={r.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, minWidth: 28, height: 22, borderRadius: 6, background: amberL, border: `1px solid ${amberB}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: smallSz, fontWeight: 900, color: amber }}>{r.n}</span>
              <p style={{ fontSize: smallSz, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, margin: 0, fontFamily: 'monospace' }}>{r.abnt}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── Esboços Page ────────────────────────────────────────────────────
// ─── Infográfico Família Card 1 ──────────────────────────────────────
function InfograficoFamiliaSection({ pt }: { pt: boolean }) {
  const MOVES = [
    {
      num: 'I', sym: 'A ↔ A\'', ref: 'Gn 1:1–5 / 1:14–25',
      title: pt ? 'A Palavra que Ordena' : 'The Word that Orders',
      sub: pt ? 'Deus Estabelece Estrutura para a Vida Familiar' : 'God Establishes Structure for Family Life',
      emoji: '🏗️',
      key: pt ? 'bara (criar) — sujeito exclusivo: Deus. Dias 1–3: domínios formados. Dias 4–6: preenchidos. Ordem precede vida — o arquiteto antes do habitante.' : 'bara (create) — exclusive subject: God. Days 1–3: domains formed. Days 4–6: filled. Order precedes life.',
      app: pt ? 'Pais: cultivem nos filhos o hábito de ver a ordem de Deus na natureza. Casal: você tem criado ordem e estrutura no lar? Ordem é ato de obediência criacional.' : 'Parents: teach children to see God\'s order in nature. Couple: are you creating structure in your home?',
      cor: 'rgba(80,200,255,1)', corL: 'rgba(80,200,255,0.10)', corB: 'rgba(80,200,255,0.28)',
    },
    {
      num: 'II', sym: 'B ↔ B\'', ref: 'Gn 1:26–28',
      title: pt ? 'A Palavra que Delega' : 'The Word that Delegates',
      sub: pt ? 'A Família como Vice-Regente de Deus' : 'The Family as God\'s Vice-Regent',
      emoji: '👑',
      key: pt ? 'tselem + demut dados ao casal como unidade. O mandato cultural (dominar, multiplicar, encher) é familiar, não individual. A família é a unidade primária do governo delegado de Deus.' : 'tselem + demut given to the couple as a unit. The cultural mandate is familial, not individual.',
      app: pt ? 'Pais: ensinem que cada filho é portador da imagem de Deus. Filhos: você não é acidente — Deus te fez para representar Ele no mundo.' : 'Parents: teach that each child bears God\'s image. Children: you were made to represent Him in the world.',
      cor: 'rgba(255,200,80,1)', corL: 'rgba(255,200,80,0.10)', corB: 'rgba(255,200,80,0.28)',
    },
    {
      num: 'III', sym: 'CENTRO ◉', ref: 'Gn 2:1–4a',
      title: pt ? 'A Palavra que Consagra' : 'The Word that Consecrates',
      sub: pt ? 'O Descanso como Telos da Família' : 'Rest as the Telos of the Family',
      emoji: '✨',
      key: pt ? 'qadash (santificar) lançado pela 1ª vez sobre o TEMPO — não sobre espaço ou objeto. O Dia do Senhor é o coração que bombeia vida à família-igreja.' : 'qadash (sanctify) first cast on TIME. The Lord\'s Day is the heart that pumps life into the family-church.',
      app: pt ? 'Pais: o Dia do Senhor não é opcional. Guardá-lo juntos é a disciplina semanal mais formadora. Casal: comprometam-se a guardar o Dia do Senhor sem exceções.' : 'Parents: the Lord\'s Day is not optional. Observing it together is the most formative weekly discipline.',
      cor: 'rgba(52,211,153,1)', corL: 'rgba(52,211,153,0.10)', corB: 'rgba(52,211,153,0.28)',
    },
  ];

  const ACTIVITIES = [
    { n: '1', icon: '📖', text: pt ? 'Leiam juntos Gn 1:1 e 2:1-3. Cada membro lê um versículo em voz alta.' : 'Read Genesis 1:1 and 2:1-3 aloud together. Each member reads a verse.' },
    { n: '2', icon: '💬', text: pt ? 'Perguntem às crianças: "Se você pudesse criar algo que não existe, o que seria?" Por que Deus criou tantas coisas diferentes?' : 'Ask children: "If you could create something that doesn\'t exist, what would it be?"' },
    { n: '3', icon: '🎨', text: pt ? 'Atividade: Faça uma "Tabela da Criação" em cartolina — dias 1 a 7 com desenhos. Cole na parede!' : 'Activity: Make a "Creation Table" on cardboard — days 1–7 with drawings. Hang it on the wall!' },
    { n: '4', icon: '🙏', text: pt ? 'Orem juntos agradecendo a Deus por ser o Criador perfeito e pedindo que a família reflita a Sua imagem no mundo.' : 'Pray together, thanking God for being the perfect Creator and asking that your family reflect His image.' },
  ];

  return (
    <div style={{ paddingBottom: 48 }}>

      {/* ── HERO ── */}
      <div style={{ borderRadius: 20, background: 'linear-gradient(135deg,rgba(52,211,153,0.13) 0%,rgba(80,200,255,0.08) 60%,rgba(255,200,80,0.08) 100%)', border: '1px solid rgba(52,211,153,0.32)', padding: 'clamp(24px,4vw,36px)', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(48px,8vw,72px)', lineHeight: 1, marginBottom: 10, filter: 'drop-shadow(0 0 24px rgba(52,211,153,0.45))' }}>🏡</div>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>
          Gênesis 1:1 – 2:4a · Perícope 01 · {pt ? 'Família — Dia 1' : 'Family — Day 1'}
        </div>
        <div style={{ fontSize: 'clamp(18px,3.2vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 8 }}>
          {pt ? 'Criados por Deus, para a Glória de Deus' : 'Created by God, for the Glory of God'}
        </div>
        <div style={{ fontSize: 'clamp(15px,2.4vw,17px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 16 }}>
          {pt ? 'O Propósito da Sua Família · Tema: A Família como Imagem do Criador' : 'Your Family\'s Purpose · Theme: The Family as Image of the Creator'}
        </div>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {[
            pt ? 'Imagem de Deus' : 'Image of God',
            pt ? 'Mandato Cultural' : 'Cultural Mandate',
            pt ? 'Dia do Senhor' : 'Lord\'s Day',
            pt ? 'Vice-Regência Familiar' : 'Family Vice-Regency',
          ].map(t => (
            <span key={t} style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 700, padding: '3px 12px', borderRadius: 99, background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)', color: 'rgba(52,211,153,0.90)' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── BIG IDEA ── */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(52,211,153,0.10),rgba(255,200,80,0.07))', border: '1.5px solid rgba(52,211,153,0.35)', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>💡 {pt ? 'Big Idea · Para a Família' : 'Big Idea · For the Family'}</div>
        <p style={{ fontSize: 'clamp(18px,2.8vw,22px)', fontWeight: 800, color: '#fff', lineHeight: 1.75, margin: 0 }}>
          {pt
            ? 'Deus criou o mundo com ordem e propósito, e cada família existe para refletir Sua glória administrando com fidelidade o que Ele criou.'
            : 'God created the world with order and purpose, and each family exists to reflect His glory by faithfully stewarding what He created.'}
        </p>
      </div>

      {/* ── PERGUNTA + DOUTRINA ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ borderRadius: 14, background: 'rgba(255,100,100,0.06)', border: '1px solid rgba(255,100,100,0.22)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,140,140,0.85)', marginBottom: 8 }}>❓ {pt ? 'Pergunta Central' : 'Central Question'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', color: 'rgba(255,210,210,0.90)', lineHeight: 1.70, fontStyle: 'italic', margin: 0 }}>
            {pt
              ? '"Se Deus planejou cada detalhe da criação com cuidado paternal, o que isso nos ensina sobre como Ele pensa e cuida da nossa família?"'
              : '"If God planned every detail of creation with fatherly care, what does that teach us about how He thinks about and cares for our family?"'}
          </p>
        </div>
        <div style={{ borderRadius: 14, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.28)', padding: '18px 20px' }}>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 8 }}>📜 {pt ? 'Doutrina Central' : 'Central Doctrine'}</div>
          <p style={{ fontSize: 'clamp(17px,2.6vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, margin: 0 }}>
            {pt
              ? 'Deus é o Criador soberano que delegou à família humana a mordomia do mundo e a consagrou ao descanso semanal como ensaio do repouso eterno em Cristo.'
              : 'God is the sovereign Creator who delegated to the human family the stewardship of the world and consecrated them to weekly rest as a rehearsal of eternal rest in Christ.'}
          </p>
        </div>
      </div>

      {/* ── 3 MOVIMENTOS ── */}
      <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: 14 }}>
        📐 {pt ? 'Movimentos do Sermão Familiar' : 'Family Sermon Movements'}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14, marginBottom: 28 }}>
        {MOVES.map((mv) => (
          <div key={mv.num} style={{ borderRadius: 16, background: mv.corL, border: `1px solid ${mv.corB}`, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', background: mv.corB, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>{mv.emoji}</span>
              <div>
                <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: mv.cor }}>
                  {pt ? 'Movimento' : 'Movement'} {mv.num} · {mv.sym}
                </div>
                <div style={{ fontSize: 'clamp(14px,2vw,16px)', color: 'rgba(255,255,255,0.55)' }}>{mv.ref}</div>
              </div>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: 'clamp(16px,2.1vw,18px)', fontWeight: 800, color: '#fff', lineHeight: 1.35, marginBottom: 4 }}>{mv.title}</div>
              <div style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: mv.cor.replace('1)', '0.75)'), fontStyle: 'italic', marginBottom: 12 }}>{mv.sub}</div>
              <div style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.30)', borderLeft: `3px solid ${mv.corB}`, marginBottom: 10 }}>
                <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: mv.cor, marginBottom: 4 }}>🔑 {pt ? 'Chave Exegética' : 'Exegetical Key'}</div>
                <div style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.60 }}>{mv.key}</div>
              </div>
              <div style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', borderLeft: `3px solid ${mv.cor.replace('1)', '0.40)')}` }}>
                <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: mv.cor, marginBottom: 4 }}>🏡 {pt ? 'Aplicação Familiar' : 'Family Application'}</div>
                <div style={{ fontSize: 'clamp(13px,1.6vw,15px)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.60, fontStyle: 'italic' }}>{mv.app}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── EIXO REDENTOR ── */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(18px,3vw,24px)', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: 14 }}>
          ✝️ {pt ? 'Eixo Redentor · Gênesis → Cristo' : 'Redemptive Axis · Genesis → Christ'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 10 }}>
          {[
            { at: pt ? 'Criação com ordem (Gn 1)' : 'Creation with order (Gen 1)',          nt: pt ? 'Nova criação em Cristo (Ap 21:1-5)' : 'New creation in Christ (Rev 21:1-5)',         cor: 'rgba(80,200,255,0.14)', emoji: '🌌' },
            { at: pt ? 'Imagem de Deus (Gn 1:26-27)' : 'Image of God (Gen 1:26-27)',        nt: pt ? 'Novo Adão restaura a imagem (Rm 5:17)' : 'New Adam restores the image (Rom 5:17)',    cor: 'rgba(255,200,80,0.14)', emoji: '👑' },
            { at: pt ? 'Descanso sabático (Gn 2:2-3)' : 'Sabbath rest (Gen 2:2-3)',         nt: pt ? '"Vinde a mim... darei descanso" (Mt 11:28)' : '"Come to me...I will give rest" (Mt 11:28)', cor: 'rgba(52,211,153,0.14)', emoji: '✨' },
          ].map((c, i) => (
            <div key={i} style={{ borderRadius: 12, background: c.cor, border: '1px solid rgba(255,255,255,0.07)', padding: '12px 14px' }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{c.emoji}</div>
              <div style={{ fontSize: 'clamp(14px,2vw,16px)', color: 'rgba(255,255,255,0.50)', marginBottom: 4 }}>AT: {c.at}</div>
              <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: '#fff', fontWeight: 700, lineHeight: 1.4 }}>NT: {c.nt}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── APLICAÇÕES POR PÚBLICO ── */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(18px,3vw,24px)', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: 14 }}>
          🛠️ {pt ? 'Aplicações por Público' : 'Application by Audience'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { pub: pt ? 'Pais' : 'Parents',     emoji: '👨‍👩‍👧', cor: 'rgba(52,211,153,0.20)', app: pt ? 'Esta semana, use um momento à mesa para perguntar: "O que na natureza nos mostra que Deus é grande?" Ouçam cada filho e orem de ação de graças.' : 'This week, at dinner ask: "What in nature shows us that God is great?" Listen to each child and give thanks.' },
            { pub: pt ? 'Filhos' : 'Children',  emoji: '👧',      cor: 'rgba(80,200,255,0.18)', app: pt ? 'Escolha uma coisa da criação que te parece incrível e pesquise como ela funciona. Depois agradeça a Deus por ter feito isso.' : 'Choose something in creation that amazes you and research how it works. Then thank God for making it.' },
            { pub: pt ? 'Casal' : 'Couple',      emoji: '💑',      cor: 'rgba(255,200,80,0.18)', app: pt ? 'Conversem sobre como vocês vão guardar o próximo Dia do Senhor. Planejem juntos o culto, o descanso e uma refeição em família — sem telas.' : 'Plan together how you will observe the next Lord\'s Day — worship, rest, a family meal without screens.' },
            { pub: pt ? 'Avós' : 'Grandparents', emoji: '👴',     cor: 'rgba(180,120,255,0.16)', app: pt ? 'Compartilhem com netos como o ritmo do Dia do Senhor moldou suas vidas. A memória da fidelidade edifica as gerações.' : 'Share with grandchildren how the rhythm of the Lord\'s Day shaped your lives. Faithful memory builds generations.' },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 14px', borderRadius: 10, background: a.cor, border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{a.emoji}</span>
              <div>
                <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.60)', marginBottom: 3 }}>{a.pub}</div>
                <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.60 }}>{a.app}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DINÂMICA FAMILIAR ── */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(18px,3vw,24px)', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: 14 }}>
          🎯 {pt ? 'Dinâmica Familiar · 4 Atividades' : 'Family Dynamic · 4 Activities'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 10 }}>
          {ACTIVITIES.map((a) => (
            <div key={a.n} style={{ borderRadius: 12, background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.18)', padding: '14px 16px', display: 'flex', gap: 12 }}>
              <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: 'rgba(52,211,153,0.18)', border: '1px solid rgba(52,211,153,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(13px,1.6vw,15px)', fontWeight: 900, color: 'rgba(52,211,153,0.90)' }}>{a.n}</div>
              <div>
                <div style={{ fontSize: 16, marginBottom: 4 }}>{a.icon}</div>
                <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,255,255,0.80)', lineHeight: 1.60 }}>{a.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── VOZES REFORMADAS ── */}
      <div style={{ borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(18px,3vw,24px)', marginBottom: 20 }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: 14 }}>
          📚 {pt ? 'Vozes Reformadas' : 'Reformed Voices'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { autor: 'Joel Beeke', obra: 'Parenting by God\'s Promises', cor: 'rgba(52,211,153,0.18)', quote: pt ? '"Os pais cristãos têm o privilégio e a responsabilidade de apontar seus filhos ao Criador em cada aspecto da vida."' : '"Christian parents have the privilege and responsibility of pointing their children to the Creator in every aspect of life."' },
            { autor: 'Herman Bavinck', obra: 'The Christian Family, 1912', cor: 'rgba(80,200,255,0.15)', quote: pt ? '"A família é a célula básica da humanidade, fundada no próprio ato criador de Deus. Onde a família vai bem, a sociedade vai bem."' : '"The family is the basic cell of humanity, founded on God\'s own creative act. Where the family thrives, society thrives."' },
            { autor: 'J.C. Ryle', obra: 'The Duties of Parents', cor: 'rgba(255,200,80,0.15)', quote: pt ? '"Habituai vossos filhos a pensar em Deus. Ensinai-os cedo que há um Deus que os fez, que os sustenta e a quem eles devem prestar contas."' : '"Accustom your children to think of God. Teach them early that there is a God who made them, sustains them, and to whom they must give account."' },
          ].map((v, i) => (
            <div key={i} style={{ padding: '12px 16px', borderRadius: 12, background: v.cor, border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, color: 'rgba(255,255,255,0.75)', marginBottom: 6 }}>{v.autor} · <em style={{ fontWeight: 400 }}>{v.obra}</em></div>
              <div style={{ fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(255,255,255,0.85)', fontStyle: 'italic', lineHeight: 1.65 }}>{v.quote}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONCLUSÃO ── */}
      <div style={{ borderRadius: 16, background: 'linear-gradient(135deg,rgba(52,211,153,0.13),rgba(80,200,255,0.08))', border: '1.5px solid rgba(52,211,153,0.35)', padding: 'clamp(18px,3vw,28px)' }}>
        <div style={{ fontSize: 'clamp(14px,2vw,16px)', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.85)', marginBottom: 12 }}>🏁 {pt ? 'Conclusão' : 'Conclusion'}</div>
        <p style={{ fontSize: 'clamp(14px,2vw,16px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, margin: '0 0 14px' }}>
          {pt
            ? 'A Palavra que disse "haja luz" não parou de falar. Ela ainda ordena, delega e consagra — e sua família existe dentro dessa Palavra. Você não escolheu sua família por acaso: Deus a planejou como o palco onde Sua glória será exibida.'
            : 'The Word that said "let there be light" has not stopped speaking. It still orders, delegates and consecrates — and your family exists within that Word.'}
        </p>
        <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.30)' }}>
          <p style={{ fontWeight: 800, color: '#fff', margin: 0, fontSize: 'clamp(14px,2vw,16px)', lineHeight: 1.65 }}>
            {pt
              ? '🙌 Viva como família à imagem do Deus que criou, com a alegria de quem sabe que o melhor ainda está por vir — na nova criação, onde o sábado será eterno.'
              : '🙌 Live as a family in the image of the God who created, with the joy of those who know the best is yet to come — in the new creation, where the sabbath will be eternal.'}
          </p>
        </div>
      </div>

    </div>
  );
}

export function EsbocosPage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'pt'|'en'>('pt');
  const pt = lang === 'pt';
  const [selectedBook, setSelectedBook] = useState<BibleBook>(BIBLE_BOOKS[0]);
  const [pericopes, setPericopes] = useState<Pericope[]>([]);
  const [loadingPericopes, setLoadingPericopes] = useState(false);
  const [selectedPericopeIdx, setSelectedPericopeIdx] = useState<number | null>(null);
  const [contentTab, setContentTab] = useState<'quiasma' | 'familia' | 'infografico' | 'aconselhamento'>('familia');
  const [bookDropOpen, setBookDropOpen] = useState(false);
  const [quiasmaDias, setQuiasmaDias] = useState<Set<number>>(new Set());

  useEffect(() => {
    setLoadingPericopes(true);
    setPericopes([]);
    setSelectedPericopeIdx(null);
    setQuiasmaDias(new Set());
    fetch(`${livroPath(selectedBook.slug, selectedBook.testamento)}/quiastico.txt`)
      .then(r => r.ok ? r.text() : '')
      .then(text => {
        const list: Pericope[] = [];
        const qSet = new Set<number>();
        for (const raw of text.split(/\r?\n/)) {
          const line = raw.trim();
          const m = line.match(/^\[(\d+)\]\s+(.+?)(?:\s+[—–-]\s+(.+))?$/);
          if (m) {
            const idx = parseInt(m[1], 10);
            list.push({ idx, titulo: m[2].trim(), ref: (m[3] ?? '').trim() });
            if (extractQuiasmaBloco(text, idx)) qSet.add(idx);
          }
        }
        setPericopes(list);
        setQuiasmaDias(qSet);
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
  const familiaConteudo = selectedDia ? gerarParaFamilia(selectedDia) : null;

  const cor = selectedBook.testamento === 'AT' ? C.atColor : C.ntColor;
  const corB = selectedBook.testamento === 'AT' ? 'rgba(255,200,80,0.35)' : 'rgba(80,200,255,0.35)';

  function selectBook(book: BibleBook) {
    setSelectedBook(book);
    setContentTab('familia');
    setTimeout(() => {
      const el = document.getElementById('familia-pericopes');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  function selectPericope(idx: number) {
    setSelectedPericopeIdx(idx);
    setContentTab('familia');
    setTimeout(() => {
      const el = document.getElementById('familia-content');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }
    }, 80);
  }

  function scrollToCards() {
    const el = document.getElementById('familia-cards');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  }

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
      <Navbar lang={lang} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(80px,10vw,100px) clamp(16px,4vw,32px) 60px' }}>

        {/* ── Voltar ao hub ── */}
        <div style={{ marginBottom: 28 }}>
          <button
            onClick={() => navigate('/familia')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.75)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            {pt ? '← Voltar' : '← Back'}
          </button>
        </div>

        {/* ── Hero section ── */}
        <div style={{ marginBottom: 44 }}>
          <div style={{
            fontSize: 'clamp(11px,1.5vw,13px)',
            fontWeight: 900,
            letterSpacing: '0.30em',
            textTransform: 'uppercase',
            background: 'linear-gradient(90deg, rgba(52,211,153,1) 0%, rgba(110,231,183,1) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 10,
          }}>
            {pt ? 'Homilética Familiar Expositiva' : 'Expository Family Homiletics'}
          </div>
          <div style={{
            fontSize: 'clamp(32px,6vw,56px)',
            fontWeight: 900,
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(52,211,153,0.90) 60%, rgba(110,231,183,0.75) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 14,
            letterSpacing: '-0.02em',
          }}>
            {pt ? 'Família' : 'Family'}
          </div>
          <div style={{
            fontSize: 'clamp(14px,2.2vw,17px)',
            color: C.muted,
            lineHeight: 1.7,
            maxWidth: 560,
          }}>
            {pt ? 'Esboços homiléticos expositivos organizados por perícope bíblica — pregando a Palavra de Deus no lar.' : 'Expository homiletical outlines organized by biblical pericope — preaching God\'s Word in the home.'}
          </div>
        </div>

        {/* ── Book selector + stats row ── */}
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'nowrap' }}>
          <div style={{ minWidth: 0 }}>
            <span style={{ fontSize: 'clamp(13px,2vw,18px)', fontWeight: 700, color: cor }}>{bookDays.length}</span>
            <span style={{ fontSize: 'clamp(12px,1.8vw,15px)', color: C.muted, marginLeft: 6 }}>{pt ? `esboços para ${selectedBook.nome}` : `outlines for ${selectedBook.nome}`}</span>
          </div>

          {/* Book dropdown */}
          <div style={{ position: 'relative', flexShrink: 0 }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setBookDropOpen(v => !v)}
              style={{
                all: 'unset', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 16px', borderRadius: 12,
                background: bookDropOpen ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${bookDropOpen ? C.greenB : 'rgba(255,255,255,0.10)'}`,
                boxShadow: bookDropOpen ? `0 0 20px rgba(52,211,153,0.12)` : 'none',
                transition: 'all 0.2s',
                minWidth: 180,
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: cor, flexShrink: 0, boxShadow: `0 0 6px ${cor}` }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: cor, flex: 1 }}>{selectedBook.nome}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: C.muted, marginRight: 2 }}>{selectedBook.testamento}</span>
              <ChevronDown size={14} color={C.muted} style={{ transition: 'transform 0.2s', transform: bookDropOpen ? 'rotate(180deg)' : 'none' }} />
            </button>

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
                    const groupCorB = isNT ? 'rgba(80,200,255,0.35)' : 'rgba(255,200,80,0.35)';
                    return (
                      <div key={g.label} style={{ marginBottom: gi < GRUPOS_ABBR.length - 1 ? 12 : 0 }}>
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
        <div style={{ height: 1, background: `linear-gradient(90deg, ${corB} 0%, transparent 70%)`, marginBottom: 32 }} />

        {/* ── Pericopes grid ── */}
        <AnimatePresence mode="wait">
          <motion.div key={selectedBook.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>

            <div id="familia-pericopes" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: cor }}>{selectedBook.nome}</span>
              {loadingPericopes && <span style={{ fontSize: 12, color: C.muted }}>{pt ? 'Carregando...' : 'Loading...'}</span>}
              {!loadingPericopes && pericopes.length > 0 && (
                <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{pericopes.length} {pt ? 'perícopes' : 'pericopes'}</span>
              )}
              {!loadingPericopes && pericopes.length === 0 && (
                <span style={{ fontSize: 12, color: C.muted }}>{pt ? 'Perícopes ainda não cadastradas' : 'Pericopes not yet registered'}</span>
              )}
            </div>

            {pericopes.length > 0 && (
              <div id="familia-cards" style={{ marginBottom: 36 }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                  gap: 16,
                }}>
                  {pericopes.map((p, cardIdx) => {
                    const diaForCard = bookDays[p.idx - 1] ?? null;
                    const conteudoCard = diaForCard ? gerarParaFamilia(diaForCard) : null;
                    return (
                      <PericopeCard
                        key={p.idx}
                        p={p}
                        cardIdx={cardIdx}
                        active={p.idx === selectedPericopeIdx}
                        conteudo={conteudoCard}
                        hasQuiasma={quiasmaDias.has(p.idx)}
                        hasInfografico={!!(diaForCard && (diaForCard.dia === 1 || diaForCard.dia === 2 || (diaForCard.dia >= 254 && diaForCard.dia <= 265)))}
                        hasAconselhamento={!!(diaForCard && (diaForCard.dia === 1 || diaForCard.dia === 2 || diaForCard.dia === 254 || diaForCard.dia === 255 || diaForCard.dia === 256 || diaForCard.dia === 257))}
                        onClick={() => selectPericope(p.idx)}
                        pt={pt}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Content area with tabs ── */}
            {selectedPericope && selectedDia && (
              <motion.div id="familia-content" key={selectedPericopeIdx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>

                {/* Botão voltar aos cards */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
                  <button
                    onClick={scrollToCards}
                    style={{
                      all: 'unset', cursor: 'pointer',
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '7px 16px', borderRadius: 20,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.14)',
                      fontSize: 'clamp(12px,1.6vw,14px)',
                      color: 'rgba(255,255,255,0.65)',
                      fontWeight: 600,
                      transition: 'background 0.15s, color 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.65)'; }}
                  >
                    ↑ {pt ? 'Ver todos os cards' : 'See all cards'}
                  </button>
                </div>

                {/* Tab bar */}
                <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: `1px solid ${C.border}`, paddingBottom: 0 }}>
                  {([
                    { key: 'familia', label: pt ? 'Esboço Familiar' : 'Family Outline' },
                    { key: 'quiasma', label: pt ? 'Estrutura Quiástica' : 'Chiastic Structure' },
                    ...((selectedDia?.dia === 1 || selectedDia?.dia === 2 || (selectedDia?.dia !== undefined && selectedDia.dia >= 254 && selectedDia.dia <= 265)) ? [{ key: 'infografico', label: pt ? '🖼 Infográfico' : '🖼 Infographic' }] : []),
                    ...((selectedDia?.dia === 1 || selectedDia?.dia === 2 || selectedDia?.dia === 254 || selectedDia?.dia === 255 || selectedDia?.dia === 256 || selectedDia?.dia === 257) ? [{ key: 'aconselhamento', label: pt ? '🧭 Aconselhamento' : '🧭 Counseling' }] : []),
                  ] as { key: 'quiasma' | 'familia' | 'infografico' | 'aconselhamento'; label: string }[]).map(tab => {
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
                          borderBottom: active ? `2px solid ${C.green}` : '2px solid transparent',
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
                  <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.18em', color: cor, textTransform: 'uppercase', marginBottom: 6 }}>
                    {pt ? 'Perícope' : 'Pericope'} {String(selectedPericope.idx).padStart(2, '0')}
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
                  {contentTab === 'infografico' ? (
                    <motion.div key="infografico" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.18 }}>
                      {selectedDia?.dia === 254 ? <InfograficoJosueFamiliaSection pt={pt} />
                        : selectedDia?.dia === 255 ? <InfograficoJosue255FamiliaSection pt={pt} />
                        : selectedDia?.dia === 256 ? <InfograficoJosue256FamiliaSection pt={pt} />
                        : selectedDia?.dia === 257 ? <InfograficoJosue257FamiliaSection pt={pt} />
                        : selectedDia?.dia === 258 ? <InfograficoJosue258FamiliaSection pt={pt} />
                        : selectedDia?.dia === 259 ? <InfograficoJosue259FamiliaSection pt={pt} />
                        : selectedDia?.dia === 260 ? <InfograficoJosue260FamiliaSection pt={pt} />
                        : selectedDia?.dia === 261 ? <InfograficoJosue261FamiliaSection pt={pt} />
                        : selectedDia?.dia === 262 ? <InfograficoJosue262FamiliaSection pt={pt} />
                        : selectedDia?.dia === 263 ? <InfograficoJosue263FamiliaSection pt={pt} />
                        : selectedDia?.dia === 264 ? <InfograficoJosue264FamiliaSection pt={pt} />
                        : selectedDia?.dia === 265 ? <InfograficoJosue265FamiliaSection pt={pt} />
                        : selectedDia?.dia === 2 ? <InfograficoGenesis2FamiliaSection pt={pt} />
                        : <InfograficoFamiliaSection pt={pt} />}
                    </motion.div>
                  ) : contentTab === 'aconselhamento' ? (
                    <motion.div key="aconselhamento" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.18 }}>
                      {selectedDia?.dia === 1
                        ? <AconselhamentoBiblicoGenesis1FamiliaSection pt={pt} />
                        : selectedDia?.dia === 2
                        ? <AconselhamentoBiblicoGenesis2FamiliaSection pt={pt} />
                        : selectedDia?.dia === 257
                        ? <AconselhamentoBiblicoJosue257FamiliaSection pt={pt} />
                        : selectedDia?.dia === 256
                        ? <AconselhamentoBiblicoJosue256FamiliaSection pt={pt} />
                        : selectedDia?.dia === 255
                        ? <AconselhamentoBiblicoJosue255FamiliaSection pt={pt} />
                        : <AconselhamentoBiblicoJosue254FamiliaSection pt={pt} />}
                    </motion.div>
                  ) : contentTab === 'quiasma' ? (
                    <motion.div key="quiasma" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.18 }}>
                      <QuiasmaSection d={selectedDia} pericopeIdx={selectedPericope.idx} pt={pt} />
                    </motion.div>
                  ) : (
                    <motion.div key="familia" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.18 }}>
                      {familiaConteudo ? (
                        <ParaFamiliaSection d={selectedDia} pericopeIdx={selectedPericope.idx} conteudo={familiaConteudo} pt={pt} />
                      ) : (
                        <div style={{ padding: 32, borderRadius: 16, border: '1px solid rgba(52,211,153,0.20)', background: 'rgba(12,40,28,0.6)', color: C.muted, fontSize: 13, textAlign: 'center' }}>
                          {pt ? 'Esboço familiar ainda não disponível para esta perícope. Em breve!' : 'Family outline not yet available for this pericope. Coming soon!'}
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
      <FlagToggle lang={lang} setLang={setLang} />

      {/* Floating back-to-cards button — visible on mobile when content is open */}
      <AnimatePresence>
        {selectedPericope && (
          <motion.button
            key="back-to-cards-fab"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToCards}
            style={{
              position: 'fixed',
              bottom: 24,
              right: 20,
              zIndex: 120,
              all: 'unset',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '10px 18px',
              borderRadius: 28,
              background: 'rgba(30,30,40,0.92)',
              border: '1px solid rgba(255,255,255,0.18)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.45)',
              fontSize: 'clamp(13px,1.8vw,15px)',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            aria-label={pt ? 'Voltar aos cards' : 'Back to cards'}
          >
            ↑ {pt ? 'Cards' : 'Cards'}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FamiliaHub;
