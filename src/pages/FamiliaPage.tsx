import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
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
function QuiasmaSection({ d, pericopeIdx }: { d: DiaDevocional; pericopeIdx: number }) {
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
          <div style={{ fontSize: 15, fontWeight: 900, color: cor, letterSpacing: '0.20em', textTransform: 'uppercase' }}>Estrutura Quiástica</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{d.livro} — Perícope {pericopeIdx}</div>
        </div>
      </div>
      <div style={{ background: 'rgba(5,7,26,0.85)', padding: '16px 14px' }}>
        {entries.map((entry, idx) => {
          if (entry.kind === 'spacer') return <div key={idx} style={{ height: 4 }} />;
          if (entry.kind === 'title') return (
            <div key={idx} style={{ fontSize: 'clamp(16px,2.8vw,20px)', fontWeight: 800, color: cor, lineHeight: 1.4, marginBottom: 12, marginTop: 4 }}>
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
              <div style={{ flexShrink: 0, minWidth: 'clamp(30px,4.5vw,38px)', textAlign: 'center', background: isCenter ? pal.bg : pal.bg.replace(/[\d.]+\)$/, '0.10)'), border: `1px solid ${isCenter ? pal.border : pal.border.replace(/[\d.]+\)$/, '0.35)')}`, borderRadius: 7, padding: 'clamp(5px,0.8vw,7px) clamp(6px,1vw,10px)', fontSize: 'clamp(15px,2.6vw,18px)', fontWeight: 900, color: pal.label, lineHeight: 1.3, boxShadow: isCenter ? `0 0 12px ${pal.bg}` : undefined, letterSpacing: '0.04em', alignSelf: 'flex-start' }}>
                {badgeLetter}
              </div>
              <div style={{ flex: 1, minWidth: 0, fontSize: 'clamp(15px,2.6vw,17px)', lineHeight: 1.65, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                {refPart && <span style={{ color: pal.label, opacity: 0.75, fontWeight: 600, fontSize: 'clamp(13px,2vw,14px)', marginRight: 6, whiteSpace: 'nowrap' }}>{refPart}</span>}
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
function ParaFamiliaSection({ d, pericopeIdx, conteudo }: { d: DiaDevocional; pericopeIdx: number; conteudo: string }) {
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

  const pv = 'clamp(14px,3.5vw,20px)';
  const ph = 'clamp(16px,4vw,24px)';
  const tagStyle = (cor: string): React.CSSProperties => ({ fontSize: 11, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: cor, marginBottom: 8 });
  const MOV_CORES = ['rgba(52,211,153,1)','rgba(80,200,255,1)','rgba(180,120,255,1)','rgba(255,200,80,1)','rgba(255,140,80,1)','rgba(255,100,160,1)'];

  void d; void pericopeIdx;

  if (isNovoFormato) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Cabeçalho */}
        <div style={{ borderRadius: 16, padding: `${pv} ${ph}`, background: 'linear-gradient(135deg, rgba(12,40,28,0.97) 0%, rgba(10,32,28,0.97) 100%)', border: '1px solid rgba(52,211,153,0.30)', boxShadow: '0 8px 32px rgba(0,0,0,0.45)' }}>
          <div style={tagStyle('rgba(52,211,153,0.55)')}>Para a Família · Homilética Familiar Expositiva</div>
          {nTitulo && <div style={{ fontSize: 'clamp(20px,3.8vw,28px)', fontWeight: 900, lineHeight: 1.25, background: 'linear-gradient(135deg, rgba(167,243,208,1) 0%, rgba(110,231,183,1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 16 }}>{nTitulo}</div>}
          {nBigIdeia && <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)', marginBottom: 12 }}>
            <div style={tagStyle('rgba(52,211,153,0.60)')}>Big Idea</div>
            <div style={{ fontSize: 'clamp(17px,3vw,21px)', color: 'rgba(167,243,208,0.97)', fontWeight: 700, fontStyle: 'italic', lineHeight: 1.5 }}>"{nBigIdeia}"</div>
          </div>}
          {nPergunta && <div style={{ padding: '12px 16px', borderRadius: 10, background: 'linear-gradient(135deg, rgba(52,211,153,0.08) 0%, rgba(16,185,129,0.06) 100%)', border: '1px solid rgba(52,211,153,0.25)', borderLeft: '4px solid rgba(52,211,153,0.80)', marginBottom: 12 }}>
            <div style={tagStyle('rgba(110,231,183,0.65)')}>Pergunta de Transição</div>
            <div style={{ fontSize: 'clamp(15px,2.6vw,18px)', color: 'rgba(167,243,208,0.95)', fontWeight: 600, fontStyle: 'italic', lineHeight: 1.6 }}>{nPergunta}</div>
          </div>}
          {nPalavraChave && (() => {
            // Detecta palavra(s) em CAPS (3+ letras) e destaca
            const parts = nPalavraChave.split(/\b([A-ZÁÉÍÓÚÀÃÕÂÊÎÔÛÇ]{3,})\b/);
            return (
              <div style={{ fontSize: 'clamp(14px,2.4vw,16px)', color: 'rgba(167,243,208,0.82)', lineHeight: 1.75, fontStyle: 'italic', padding: '10px 14px', borderRadius: 10, background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.18)' }}>
                {parts.map((part, pi) => {
                  if (pi % 2 === 1) return (
                    <span key={pi} style={{ fontStyle: 'normal', fontWeight: 900, letterSpacing: '0.10em', fontSize: 'clamp(15px,2.7vw,19px)', color: 'rgba(52,211,153,1)', background: 'rgba(52,211,153,0.14)', border: '1px solid rgba(52,211,153,0.40)', borderRadius: 6, padding: '1px 8px', margin: '0 3px', display: 'inline-block', lineHeight: 1.4 }}>{part}</span>
                  );
                  return <span key={pi}>{part}</span>;
                })}
              </div>
            );
          })()}
        </div>

        {/* Movimentos */}
        {nMovimentos.length > 0 && <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={tagStyle('rgba(110,231,183,0.60)')}>Movimentos do Sermão</div>
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
                    { label: 'Aplicação Familiar', text: mv.aplicacao, cor: 'rgba(52,211,153,0.90)' },
                  ].filter(f => f.text).map((f, fi) => (
                    <div key={fi} style={{ marginBottom: fi < 3 ? 12 : 0 }}>
                      <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: f.cor, marginBottom: 4 }}>{f.label}</div>
                      <div style={{ fontSize: 'clamp(14px,2.4vw,16px)', color: fi === 3 ? 'rgba(110,231,183,0.95)' : 'rgba(215,225,245,0.90)', lineHeight: 1.7, fontStyle: fi === 3 ? 'italic' : 'normal' }}>{f.text}</div>
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

        {/* Aplicações */}
        {nAplicacoes.length > 0 && <div style={{ borderRadius: 12, padding: '14px 20px', background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.22)' }}>
          <div style={tagStyle('rgba(52,211,153,0.75)')}>Aplicações para a Família</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {nAplicacoes.map((ap, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, fontSize: 11, fontWeight: 900, color: 'rgba(52,211,153,0.80)', paddingTop: 2, minWidth: 100 }}>{ap.label}</div>
                <div style={{ fontSize: 'clamp(14px,2.4vw,16px)', color: 'rgba(167,243,208,0.92)', lineHeight: 1.7 }}>{ap.texto}</div>
              </div>
            ))}
          </div>
        </div>}

        {/* Dinâmica Familiar */}
        {nDinamica && <div style={{ borderRadius: 12, padding: '16px 20px', background: 'linear-gradient(135deg, rgba(52,211,153,0.10) 0%, rgba(16,185,129,0.06) 100%)', border: '2px solid rgba(52,211,153,0.35)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, rgba(52,211,153,1) 0%, rgba(16,185,129,0.5) 70%, transparent 100%)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={tagStyle('rgba(52,211,153,0.85)')}>Dinâmica Familiar</div>
          </div>
          <div style={{ fontSize: 'clamp(14px,2.4vw,16px)', color: 'rgba(167,243,208,0.95)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{nDinamica}</div>
        </div>}

        {/* Autores Reformados */}
        {nAutores.length > 0 && <div style={{ borderRadius: 12, padding: '16px 20px', background: 'rgba(180,120,255,0.06)', border: '1px solid rgba(180,120,255,0.22)' }}>
          <div style={tagStyle('rgba(200,160,255,0.75)')}>Autores Reformados</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {nAutores.map((a, i) => (
              <div key={i} style={{ borderLeft: '3px solid rgba(52,211,153,0.60)', paddingLeft: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(200,160,255,0.90)', marginBottom: 4 }}>
                  {a.autor}
                  {a.obra && <span style={{ fontWeight: 500, color: 'rgba(200,160,255,0.55)', marginLeft: 6 }}>· {a.obra}</span>}
                </div>
                <div style={{ fontSize: 'clamp(14px,2.4vw,15px)', color: 'rgba(215,225,245,0.88)', lineHeight: 1.75, fontStyle: 'italic' }}>
                  "{a.citacao}"
                </div>
              </div>
            ))}
          </div>
        </div>}

        {/* Conclusão */}
        {nConclusao && <div style={{ borderRadius: 12, padding: '16px 20px', background: 'linear-gradient(135deg, rgba(52,211,153,0.08) 0%, rgba(16,185,129,0.05) 100%)', border: '1px solid rgba(52,211,153,0.22)' }}>
          <div style={tagStyle('rgba(110,231,183,0.75)')}>Conclusão</div>
          <div style={{ fontSize: 'clamp(14px,2.4vw,16px)', color: 'rgba(167,243,208,0.92)', lineHeight: 1.85 }}>{nConclusao}</div>
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
  onClick,
}: {
  p: Pericope;
  cardIdx: number;
  active: boolean;
  conteudo: string | null;
  onClick: () => void;
}) {
  const accentColor = THEME_COLORS[cardIdx % THEME_COLORS.length];
  const accentAlpha = (a: number) => accentColor.replace('1)', `${a})`);
  const tema = extractTema(conteudo);
  const hasTema = tema.length > 0;

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
        {/* TEMA — most prominent */}
        {hasTema ? (
          <div style={{
            fontSize: 'clamp(15px,2.6vw,18px)',
            fontWeight: 800,
            color: accentColor,
            lineHeight: 1.35,
            marginBottom: 10,
            paddingRight: 72,
          }}>
            {tema}
          </div>
        ) : (
          <div style={{
            fontSize: 'clamp(13px,2.2vw,15px)',
            fontWeight: 600,
            color: C.muted,
            lineHeight: 1.4,
            marginBottom: 10,
            fontStyle: 'italic',
            paddingRight: 72,
          }}>
            Em breve...
          </div>
        )}

        {/* Pericope title */}
        <div style={{
          fontSize: 12,
          fontWeight: 700,
          color: accentAlpha(0.80),
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: 5,
          lineHeight: 1.4,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {p.titulo}
        </div>

        {/* Reference */}
        {p.ref && (
          <div style={{
            fontSize: 11,
            color: C.muted,
            fontWeight: 500,
            letterSpacing: '0.04em',
          }}>
            {p.ref}
          </div>
        )}

        {/* Active indicator dot */}
        {active && (
          <div style={{
            marginTop: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <div style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: accentColor,
              boxShadow: `0 0 10px ${accentColor}`,
            }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: accentAlpha(0.75), letterSpacing: '0.10em', textTransform: 'uppercase' }}>Selecionada</span>
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
    subtitulo: 'Aliança Conjugal: Deixar, Unir e Ser Uma Só Carne',
    desc: 'O que significa "deixar pai e mãe"? A ruptura necessária, a nova unidade e a integralidade do vínculo conjugal — corpo, alma e espírito.',
    refs: 'Gn 2:24 · Mc 10:6–9 · Ml 2:14',
    available: false,
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

function AulaCard({ aula, cor, onOpen }: { aula: typeof AULAS_NOIVOS[0]; cor: string; onOpen: () => void }) {
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
          Em breve
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
          Abrir aula →
        </div>
      )}
    </motion.div>
  );
}

function NoivosHub({ onBack, onAula }: { onBack: () => void; onAula: (num: number) => void }) {
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.white }}>
      <Navbar />
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: 'clamp(90px,11vw,110px) clamp(16px,4vw,32px) 80px' }}>

        {/* Voltar */}
        <div style={{ marginBottom: 32 }}>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,200,80,0.70)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            ← Voltar
          </button>
        </div>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: 44 }}>
          <div style={{ fontSize: 'clamp(10px,1.4vw,12px)', fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', marginBottom: 12, background: `linear-gradient(90deg,${GOLD},rgba(255,230,140,1))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Curso Pré-Matrimonial Reformado
          </div>
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 16px', background: `linear-gradient(135deg,rgba(255,255,255,0.95) 0%,${GOLD} 60%,rgba(255,230,140,0.75) 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Preparatório para Noivos
          </h1>
          <p style={{ fontSize: 'clamp(13px,1.8vw,16px)', color: 'rgba(255,255,255,0.50)', maxWidth: 620, lineHeight: 1.75 }}>
            Oito aulas expositivas com fundamento nas Escrituras, na Confissão de Fé de Westminster e nos autores reformados — para construir o casamento sobre a Rocha.
          </p>
        </motion.div>

        {/* Grid de aulas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 18 }}>
          {AULAS_NOIVOS.map(aula => (
            <AulaCard key={aula.num} aula={aula} cor={GOLD} onOpen={() => onAula(aula.num)} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Aula Inaugural — conteúdo ───────────────────────────────────────
function AulaInaugural({ onBack }: { onBack: () => void }) {
  const sections = [
    {
      label: 'Texto Base',
      content: 'Gênesis 2:18–25 · Efésios 5:22–33 · Confissão de Fé de Westminster, Cap. XXIV',
      color: GOLD,
    },
    {
      label: 'Big Idea',
      content: 'O casamento não é invenção humana nem contrato social — é instituição divina, aliança sagrada e parábola viva da relação de Cristo com a Igreja.',
      color: GOLD,
    },
    {
      label: 'I. O Problema da Solidão e o Diagnóstico de Deus (Gn 2:18)',
      content: 'Deus declara: "Não é bom que o homem esteja só." Esta é a única coisa na criação que Deus qualifica de "não boa" antes da queda — não um defeito do homem, mas um desígnio do Criador. A solidão relacional é a condição que prepara a revelação do casamento. Deus não diz "resolva sua solidão" — Ele diz "Eu proverei." Lição para noivos: o casamento não nasce da nossa necessidade, mas da provisão soberana de Deus.',
      color: GOLD,
    },
    {
      label: 'II. O Design da Complementaridade (Gn 2:19–23)',
      content: 'Adão nomeia os animais e nenhum é "semelhante a ele" — a busca revela a especificidade do que falta. Eva não é idêntica a Adão nem inferior: é "carne da sua carne" — mesma essência, forma distinta. A complementaridade bíblica não é hierarquia de valor, mas diferença de função a serviço da unidade. Herman Bavinck: "O homem e a mulher são iguais em dignidade, distintos em vocação — e essa distinção é glória, não limitação."',
      color: GOLD,
    },
    {
      label: 'III. A Estrutura da Aliança: Deixar, Unir, Uma Só Carne — CENTRO ◉ (Gn 2:24)',
      content: '"Por isso, o homem deixará pai e mãe, se unirá à sua mulher, e serão uma só carne." Três verbos — três realidades aliançosas:\n\n▸ DEIXAR — ruptura de dependências anteriores. Não abandono, mas reordenação de lealdades. O lar de origem cede lugar ao novo lar.\n▸ UNIR — adesão voluntária, permanente e exclusiva. O hebraico dabaq ("colar-se") sugere intimidade inquebrável.\n▸ UMA SÓ CARNE — integração total: física, emocional, espiritual, social. O casamento é o único relacionamento humano que aspira à completude da união.\n\nCFW XXIV.1: "O casamento é uma instituição ordenada por Deus, para a glória d\'Ele e o bem mútuo dos cônjuges."',
      color: GOLD,
    },
    {
      label: 'IV. O Casamento como Parábola Redentor (Ef 5:22–33)',
      content: 'Paulo revela o mistério: o casamento não é apenas instituição social — é ícone da relação de Cristo com a Igreja. O marido ama como Cristo amou: sacrificialmente, purificando, sem exigir. A esposa responde como a Igreja responde a Cristo: com confiança, não com medo. Joel Beeke (Reformed Preaching): "O casamento cristão é evangelismo silencioso — o mundo que não ouve sermões pode ver Cristo e a Igreja no casal que vive o Evangelho em casa."',
      color: GOLD,
    },
    {
      label: 'Teologia Reformada',
      content: '▸ CFW XXIV.2: "O casamento foi ordenado para a ajuda mútua de marido e mulher, para a multiplicação da raça humana com uma prole legítima e para a Igreja com uma semente santa, e para prevenir a impureza."\n▸ Herman Bavinck (A Ética Reformada): "O casamento é a mais íntima das comunidades humanas — imagem da comunhão trinitária de amor."\n▸ John Calvin (Inst. II.8.41): "O casamento é santo e honroso porque foi ordenado por Deus — não como concessão à fraqueza, mas como vocação à santidade."\n▸ J.C. Ryle (Santidade): "Não há santificação maior do que a que acontece no lar. É lá que o caráter real é revelado e moldado."\n▸ Voddie Baucham (O Que Ele Deve Ser): "O casamento cristão é a unidade fundamental da civilização e da missão — quando o lar perece, a Igreja e a sociedade perecem."',
      color: GOLD,
    },
    {
      label: 'Aplicações para os Noivos',
      content: '▸ Examinem juntos: o que vocês ainda precisam "deixar" — dependências emocionais, financeiras ou de lealdade — antes do altar?\n▸ Conversem sobre o que "unir-se" significa concretamente na rotina: decisões, finanças, amizades, família de origem.\n▸ Como a parábola de Cristo e a Igreja moldará os papéis de cada um dentro do casamento de vocês?\n▸ Orem juntos agora: "Senhor, que nosso casamento seja um testemunho do Teu amor pelo Teu povo."',
      color: GOLD,
    },
    {
      label: 'Para Reflexão e Discussão',
      content: '1. Qual é a diferença entre um contrato e uma aliança? Como isso muda a forma de encarar os momentos difíceis do casamento?\n2. O que Gênesis 2:24 implica sobre a relação com as famílias de origem após o casamento?\n3. Como o modelo de Cristo em Efésios 5 desafia o modelo cultural dominante de casamento?\n4. Que expectativas vocês trazem para o casamento que podem precisar ser revisadas à luz das Escrituras?\n5. Quais disciplinas espirituais vocês comprometem cultivar juntos desde o primeiro dia?',
      color: GOLD,
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.white }}>
      <Navbar />
      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(90px,11vw,110px) clamp(16px,4vw,32px) 80px' }}>

        {/* Voltar */}
        <div style={{ marginBottom: 32 }}>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,200,80,0.70)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            ← Aulas
          </button>
        </div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: 44 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16, padding: '5px 14px', borderRadius: 8, background: GOLD_B, border: `1px solid ${GOLD_BD}` }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: GOLD, fontVariantNumeric: 'tabular-nums' }}>01</span>
            <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,200,80,0.70)' }}>Aula Inaugural</span>
          </div>
          <h1 style={{ fontSize: 'clamp(24px,4.5vw,42px)', fontWeight: 900, lineHeight: 1.15, margin: '0 0 16px', background: `linear-gradient(135deg,rgba(255,255,255,0.95) 0%,${GOLD} 60%,rgba(255,230,140,0.75) 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            O que é o Casamento?<br />A Perspectiva Bíblica e Reformada
          </h1>
          <p style={{ fontSize: 'clamp(13px,1.8vw,15px)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.75 }}>
            Curso Preparatório para Noivos · Perspectiva Cristã Reformada
          </p>
        </motion.div>

        {/* Seções */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.08 + i * 0.06 }}
              style={{ borderRadius: 14, background: 'rgba(255,200,80,0.06)', border: `1px solid rgba(255,200,80,0.18)`, padding: '20px 22px', borderLeft: `3px solid ${GOLD}` }}
            >
              <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', color: 'rgba(255,255,255,0.80)', lineHeight: 1.80, whiteSpace: 'pre-line' }}>
                {s.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
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

function FamiliaHub({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.white }}>
      <Navbar />
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
            Recursos para a Família Cristã
          </div>
          <h1 style={{
            fontSize: 'clamp(30px,5.5vw,52px)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 18px',
            background: 'linear-gradient(135deg,rgba(255,255,255,0.95) 0%,rgba(52,211,153,0.88) 55%,rgba(110,231,183,0.72) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Família
          </h1>
          <p style={{ fontSize: 'clamp(14px,2vw,17px)', color: 'rgba(255,255,255,0.52)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            Escolha o recurso que deseja acessar. Novos módulos serão disponibilizados em breve.
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
                  Em breve
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
                  Acessar →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────
export default function FamiliaPage() {
  const [view, setView] = useState<'hub' | 'esbocos' | 'noivos' | 'aula-inaugural'>('hub');
  const [selectedBook, setSelectedBook] = useState<BibleBook>(BIBLE_BOOKS[0]);
  const [pericopes, setPericopes] = useState<Pericope[]>([]);
  const [loadingPericopes, setLoadingPericopes] = useState(false);
  const [selectedPericopeIdx, setSelectedPericopeIdx] = useState<number | null>(null);
  const [contentTab, setContentTab] = useState<'quiasma' | 'familia'>('familia');
  const [bookDropOpen, setBookDropOpen] = useState(false);

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
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  const GRUPOS_ABBR = [
    { label: 'Pentateuco',  t: 'AT', slugs: ['genesis','exodo','levitico','numeros','deuteronomio'] },
    { label: 'Históricos',  t: 'AT', slugs: ['josue','juizes','rute','1samuel','2samuel','1reis','2reis','1cronicas','2cronicas','esdras','neemias','ester'] },
    { label: 'Poéticos',    t: 'AT', slugs: ['jo','salmos','proverbios','eclesiastes','canticos'] },
    { label: 'Proféticos',  t: 'AT', slugs: ['isaias','jeremias','lamentacoes','ezequiel','daniel','oseias','joel','amos','obadias','jonas','miqueias','naum','habacuque','sofonias','ageu','zacarias','malaquias'] },
    { label: 'Evangelhos',  t: 'NT', slugs: ['mateus','marcos','lucas','joao'] },
    { label: 'Epístolas',   t: 'NT', slugs: ['atos','romanos','1corintios','2corintios','galatas','efesios','filipenses','colossenses','1tessalonicenses','2tessalonicenses','1timoteo','2timoteo','tito','filemom','hebreus','tiago','1pedro','2pedro','1joao','2joao','3joao','judas','apocalipse'] },
  ] as const;

  if (view === 'hub') return <FamiliaHub onSelect={(id) => {
    if (id === 'esbocos') setView('esbocos');
    if (id === 'noivos') setView('noivos');
  }} />;
  if (view === 'noivos') return <NoivosHub onBack={() => setView('hub')} onAula={(num) => { if (num === 1) setView('aula-inaugural'); }} />;
  if (view === 'aula-inaugural') return <AulaInaugural onBack={() => setView('noivos')} />;

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.white }} onClick={() => setBookDropOpen(false)}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(80px,10vw,100px) clamp(16px,4vw,32px) 60px' }}>

        {/* ── Voltar ao hub ── */}
        <div style={{ marginBottom: 28 }}>
          <button
            onClick={() => setView('hub')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.75)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            ← Voltar
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
            Homilética Familiar Expositiva
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
            Família
          </div>
          <div style={{
            fontSize: 'clamp(14px,2.2vw,17px)',
            color: C.muted,
            lineHeight: 1.7,
            maxWidth: 560,
          }}>
            Esboços homiléticos expositivos organizados por perícope bíblica — pregando a Palavra de Deus no lar.
          </div>
        </div>

        {/* ── Book selector + stats row ── */}
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'nowrap' }}>
          <div style={{ minWidth: 0 }}>
            <span style={{ fontSize: 'clamp(13px,2vw,18px)', fontWeight: 700, color: cor }}>{bookDays.length}</span>
            <span style={{ fontSize: 'clamp(12px,1.8vw,15px)', color: C.muted, marginLeft: 6 }}>esboços para {selectedBook.nome}</span>
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
              {loadingPericopes && <span style={{ fontSize: 12, color: C.muted }}>Carregando...</span>}
              {!loadingPericopes && pericopes.length > 0 && (
                <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{pericopes.length} perícopes</span>
              )}
              {!loadingPericopes && pericopes.length === 0 && (
                <span style={{ fontSize: 12, color: C.muted }}>Perícopes ainda não cadastradas</span>
              )}
            </div>

            {pericopes.length > 0 && (
              <div style={{ marginBottom: 36 }}>
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
                        onClick={() => selectPericope(p.idx)}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Content area with tabs ── */}
            {selectedPericope && selectedDia && (
              <motion.div id="familia-content" key={selectedPericopeIdx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>

                {/* Tab bar */}
                <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: `1px solid ${C.border}`, paddingBottom: 0 }}>
                  {([
                    { key: 'familia', label: 'Esboço Familiar' },
                    { key: 'quiasma', label: 'Estrutura Quiástica' },
                  ] as { key: 'quiasma' | 'familia'; label: string }[]).map(tab => {
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
                    <motion.div key="familia" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.18 }}>
                      {familiaConteudo ? (
                        <ParaFamiliaSection d={selectedDia} pericopeIdx={selectedPericope.idx} conteudo={familiaConteudo} />
                      ) : (
                        <div style={{ padding: 32, borderRadius: 16, border: '1px solid rgba(52,211,153,0.20)', background: 'rgba(12,40,28,0.6)', color: C.muted, fontSize: 13, textAlign: 'center' }}>
                          Esboço familiar ainda não disponível para esta perícope. Em breve!
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
