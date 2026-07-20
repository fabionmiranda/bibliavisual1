import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
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

export function NoivosHub() {
  const navigate = useNavigate();
  const onBack = () => navigate('/familia');
  const onAula = (num: number) => { if (num === 1) navigate('/familia/noivos/aula-inaugural'); };
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

function DiagramaRPM() {
  const W = 900, H = 500;
  const cx = W / 2, cy = H / 2 + 10;

  // Três nós em linha horizontal com arcos de conexão
  const nos = [
    { id: 'reino',      x: 160,    y: cy,      cor: GOLD,   icone: '👑', label: 'REINO' },
    { id: 'pacto',      x: cx,     y: cy - 60, cor: SPIRIT, icone: '📜', label: 'PACTO' },
    { id: 'mediadores', x: W - 160, y: cy,     cor: CULT,   icone: '🤝', label: 'MEDIADORES' },
  ];

  const arrows = [['arwRg',GOLD],['arwSp',SPIRIT],['arwCl',CULT],['arwW','rgba(255,255,255,0.45)']] as [string,string][];

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
          Diagrama Didático · Van Groningen
        </span>
      </div>
      <div style={{ textAlign: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 'clamp(17px,2.6vw,22px)', fontWeight: 900, color: 'rgba(255,255,255,0.90)' }}>
          Reino · Pacto · Mediadores
        </span>
      </div>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}>
          A estrutura pela qual Deus governa a história da redenção
        </span>
      </div>

      {/* SVG */}
      <div style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <radialGradient id="rBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,200,80,0.05)" />
              <stop offset="100%" stopColor="rgba(5,7,26,0)" />
            </radialGradient>
            <filter id="rGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="rSoft" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="18" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {arrows.map(([id,col]) => (
              <marker key={id} id={id} markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
                <path d="M0,0 L0,7 L9,3.5 z" fill={col} opacity="0.9"/>
              </marker>
            ))}
          </defs>

          <ellipse cx={cx} cy={cy} rx="430" ry="230" fill="url(#rBg)" />

          {/* ── Moldura HISTÓRIA DA REDENÇÃO ── */}
          <rect x="14" y="14" width={W-28} height={H-28} rx="24" fill="none" stroke={GOLD} strokeWidth="1.2" strokeDasharray="6 5" opacity="0.20"/>
          <text x={cx} y="11" textAnchor="middle" fill={GOLD} fontSize="11" fontWeight="900" letterSpacing="3.5" opacity="0.55">HISTÓRIA DA REDENÇÃO</text>
          <text x={cx} y={H-6} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9.5" letterSpacing="1.5" fontStyle="italic">Gênesis → Éxodo → Profetas → Cristo → Nova Criação</text>

          {/* ── Curva de cima: Reino governa Pacto ── */}
          <path d={`M ${nos[0].x} ${nos[0].y - 52} Q ${cx} ${cy - 180} ${nos[1].x} ${nos[1].y - 52}`}
            fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="7 4" opacity="0.45"
            markerEnd="url(#arwRg)" />
          <text x={cx} y={cy - 166} textAnchor="middle" fill={GOLD} fontSize="10.5" fontWeight="700" opacity="0.70" letterSpacing="1">governa por meio de</text>

          {/* ── Curva esq: Pacto estabelece Mediadores ── */}
          <path d={`M ${nos[1].x + 52} ${nos[1].y} Q ${cx + 140} ${cy - 20} ${nos[2].x} ${nos[2].y - 56}`}
            fill="none" stroke={SPIRIT} strokeWidth="2" strokeDasharray="7 4" opacity="0.45"
            markerEnd="url(#arwSp)" />
          <text x={cx + 100} y={cy - 55} textAnchor="middle" fill={SPIRIT} fontSize="10.5" fontWeight="700" opacity="0.70" letterSpacing="1">estabelece</text>

          {/* ── Curva dir: Mediadores refletem o Reino ── */}
          <path d={`M ${nos[2].x} ${nos[2].y + 56} Q ${cx} ${cy + 160} ${nos[0].x} ${nos[0].y + 56}`}
            fill="none" stroke={CULT} strokeWidth="2" strokeDasharray="7 4" opacity="0.45"
            markerEnd="url(#arwCl)" />
          <text x={cx} y={cy + 152} textAnchor="middle" fill={CULT} fontSize="10.5" fontWeight="700" opacity="0.70" letterSpacing="1">refletem e servem ao</text>

          {/* ── Cristo — elemento central ── */}
          <ellipse cx={cx} cy={cy + 18} rx="92" ry="46" fill="rgba(255,200,80,0.10)" stroke={GOLD} strokeWidth="1.8" filter="url(#rGlow)" />
          <text x={cx} y={cy + 6} textAnchor="middle" fontSize="22">✝</text>
          <text x={cx} y={cy + 24} textAnchor="middle" fill={GOLD} fontSize="12.5" fontWeight="900" letterSpacing="1">CRISTO</text>
          <text x={cx} y={cy + 40} textAnchor="middle" fill="rgba(255,200,80,0.55)" fontSize="9.5" fontStyle="italic">único Mediador · 1 Tm 2.5</text>

          {/* ── Linhas retas de Cristo para cada nó ── */}
          {nos.map((n, i) => {
            const dx = n.x - cx, dy = (n.y + (i===1?-18:18)) - (cy+18);
            const len = Math.sqrt(dx*dx+dy*dy);
            const off = i === 1 ? 56 : 64;
            return (
              <line key={n.id}
                x1={cx + dx/len*94} y1={cy+18 + dy/len*48}
                x2={n.x - dx/len*off} y2={(n.y+(i===1?-18:18)) - dy/len*off}
                stroke={n.cor} strokeWidth="1.5" opacity="0.35" strokeDasharray="4 4" />
            );
          })}

          {/* ── Nós ── */}
          {nos.map((n) => (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r="70" fill={n.cor} opacity="0.05" filter="url(#rSoft)"/>
              <circle cx={n.x} cy={n.y} r="56" fill={`${n.cor}14`} stroke={n.cor} strokeWidth="2" filter="url(#rGlow)"/>
              <circle cx={n.x} cy={n.y} r="40" fill={`${n.cor}08`} stroke={n.cor} strokeWidth="0.8" opacity="0.5"/>
              <text x={n.x} y={n.y - 14} textAnchor="middle" fontSize="24">{n.icone}</text>
              <text x={n.x} y={n.y + 8} textAnchor="middle" fill={n.cor} fontSize="13" fontWeight="900" letterSpacing="0.5">{n.label}</text>
              {/* Linhas de referência abaixo de cada círculo */}
              <text x={n.x} y={n.y + 74} textAnchor="middle" fill="rgba(255,255,255,0.40)" fontSize="9.5" fontStyle="italic">
                {n.id === 'reino' ? 'Sl 103.19' : n.id === 'pacto' ? 'Ml 2.14' : 'Gn 1.26-27'}
              </text>
            </g>
          ))}

          {/* Rótulo da linha inferior: "Casamento — agentes do Reino" */}
          <rect x={cx-120} y={cy + 162} width="240" height="22" rx="6" fill="rgba(5,7,26,0.8)" />
          <text x={cx} y={cy + 177} textAnchor="middle" fill={CULT} fontSize="10" fontWeight="700" letterSpacing="1" opacity="0.80">CASAMENTO — agentes do Reino no mundo</text>

          {/* Ref Van Groningen */}
          <text x={W-18} y={H-16} textAnchor="end" fill="rgba(255,255,255,0.20)" fontSize="9" fontStyle="italic">
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
                Van Groningen — Contribuição Teológica
              </div>
              <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', color: 'rgba(255,255,255,0.68)', lineHeight: 1.88, fontStyle: 'italic', whiteSpace: 'pre-line' }}>
                {d.vanGroningen}
              </div>
            </div>

            {/* Referências ABNT */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: d.cor, opacity: 0.70, marginBottom: 7 }}>
                Referências (ABNT)
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

function DiagramaMandatos() {
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
          Diagrama · Van Groningen
        </span>
      </div>
      <div style={{ textAlign: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 'clamp(17px,2.6vw,22px)', fontWeight: 900, color: 'rgba(255,255,255,0.90)', letterSpacing: '0.04em' }}>
          Reino · Pacto · Mediadores
        </span>
      </div>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}>
          Os três mandatos que estruturam o casamento e a família cristã
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
                Van Groningen — Contribuição Teológica
              </div>
              <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', color: 'rgba(255,255,255,0.68)', lineHeight: 1.85, fontStyle: 'italic' }}>
                {m.vanGroningen}
              </div>
            </div>

            {/* Referências ABNT */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: m.color, opacity: 0.70, marginBottom: 7 }}>
                Referências (ABNT)
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
  const onBack = () => navigate('/familia/noivos');
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.white }}>
      <Navbar />
      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(90px,11vw,110px) clamp(16px,4vw,32px) 100px' }}>

        {/* Voltar */}
        <div style={{ marginBottom: 32 }}>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,200,80,0.70)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            ← Aulas
          </button>
        </div>

        {/* Cabeçalho */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10, padding: '4px 12px', borderRadius: 7, background: GOLD_B, border: `1px solid ${GOLD_BD}` }}>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,200,80,0.75)' }}>Curso de Noivos · Material do Aluno</span>
          </div>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', marginBottom: 14 }}>
            Aula Inaugural · Encontro 1
          </div>
          <h1 style={{ fontSize: 'clamp(26px,4.8vw,46px)', fontWeight: 900, lineHeight: 1.12, margin: '0 0 10px', background: `linear-gradient(135deg,rgba(255,255,255,0.95) 0%,${GOLD} 58%,rgba(255,230,140,0.72) 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            A Aliança como Fundamento
          </h1>
          <p style={{ fontSize: 'clamp(13px,1.8vw,15px)', color: 'rgba(255,255,255,0.42)', lineHeight: 1.70, fontStyle: 'italic', margin: '0 0 20px' }}>
            O casamento de vocês começa antes de vocês
          </p>
        </motion.div>

        {/* ── Diagrama Van Groningen — Os 3 Mandatos ── */}
        <DiagramaMandatos />

        {/* ── Diagrama Didático — Reino · Pacto · Mediadores ── */}
        <DiagramaRPM />

        {/* Boas-vindas */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }} style={{ marginBottom: 32, padding: '18px 22px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)' }}>
          <Txt>Sejam bem-vindos! Este material acompanha o primeiro encontro do curso de noivos. Use-o durante a aula para acompanhar o ensino e anotar suas respostas, e leve-o para casa — vocês vão voltar a ele mais de uma vez ao longo do noivado.</Txt>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          {/* Duas palavras */}
          <Bloco titulo="Duas Palavras para Guardar: Mandato e Aliança" delay={0.10}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, marginBottom: 14 }}>
              <div style={{ padding: '14px 16px', borderRadius: 10, background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.22)' }}>
                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(52,211,153,1)', marginBottom: 8 }}>Aliança (Pacto)</div>
                <Verso ref="Gênesis 9.9" texto="Eis que eu estabeleço a minha aliança convosco e com a vossa descendência depois de vós." />
                <Txt>Aliança é o compromisso solene pelo qual Deus se liga ao Seu povo — com promessas e responsabilidades dos dois lados, mas sempre testemunhado e sustentado pelo próprio Deus. Não é um trato entre iguais: é Deus quem toma a iniciativa e garante o cumprimento. Foi assim com Noé, com Abraão, com Israel no Sinai, com Davi, e culmina na nova aliança selada por Jesus (Lucas 22.20).</Txt>
              </div>
              <div style={{ padding: '14px 16px', borderRadius: 10, background: 'rgba(180,120,255,0.08)', border: '1px solid rgba(180,120,255,0.22)' }}>
                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(180,120,255,1)', marginBottom: 8 }}>Mandato</div>
                <Verso ref="Gênesis 1.26-28" texto="Façamos o homem à nossa imagem... e domine... sede fecundos, multiplicai-vos, enchei a terra e sujeitai-a." />
                <Txt>Mandato é a missão que Deus dá ao ser humano, como imagem dEle, para cuidar e cultivar a criação. Segundo o teólogo Gerard Van Groningen, esse mandato se desdobra em três dimensões: Mandato Espiritual (a comunhão com Deus), Mandato Social (a família) e Mandato Cultural (o trabalho, a arte, a cidade).</Txt>
              </div>
            </div>
            <Txt>Segundo Van Groningen: Reino, Pacto e Mediadores formam uma só estrutura: Deus governa (Reino) por meio de alianças (Pacto), sempre através de agentes humanos representativos — de Adão a Abraão, Moisés e Davi — numa linha que a Bíblia conduz até Cristo, o único Mediador definitivo (1 Timóteo 2.5). Vocês, como casal, ocupam esse mesmo lugar de agentes — nunca de salvadores.</Txt>
          </Bloco>

          {/* Percurso */}
          <Bloco titulo="Nosso Percurso — 8 Encontros (Agosto a Dezembro)" delay={0.14}>
            <Txt style={{ marginBottom: 16 }}>Este é apenas o primeiro passo de uma caminhada de alguns meses. Os encontros presenciais marcam a abertura, um tema mais delicado e o encerramento do curso; os demais podem acontecer de forma híbrida. A coluna "Mandato" mostra onde cada tema se encaixa no diagrama — Espiritual, Social ou Cultural.</Txt>
            <div style={{ overflowX: 'auto', marginTop: 10 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'clamp(11px,1.5vw,13px)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,200,80,0.25)' }}>
                    {['Nº','Quando','Tema','Pergunta que guia','Mandato'].map(h => (
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
              O curso inteiro é o próprio diagrama sendo desdobrado, encontro após encontro.
            </div>
          </Bloco>

          {/* O que vamos aprender hoje */}
          <Bloco titulo="O que Vamos Aprender Hoje" delay={0.17}>
            <Txt>O diagrama que vocês viram na capa vai guiar todo o nosso curso. Hoje vamos entender quatro ideias simples, mas que mudam a forma de olhar para o casamento.</Txt>
          </Bloco>

          {/* I */}
          <Bloco titulo="Mandato Espiritual (I) — O Casamento Começa em Deus, Não em Vocês" delay={0.20}>
            <Verso ref="Gênesis 1.26" texto='Deus disse: "Façamos o homem à nossa imagem, conforme a nossa semelhança."' />
            <Txt>{`No topo do diagrama estão o Pai, o Filho e o Espírito. Antes de existir qualquer casal, já existia comunhão perfeita dentro do próprio Deus. Isso muda a forma de olhar para o casamento: ele não é um projeto que vocês vão inventar do zero — é um convite para refletir, em carne humana, uma comunhão que já existe eternamente. Vocês não precisam criar a intimidade e a fidelidade a partir de si mesmos; podem recebê-las de Deus e aprender a vivê-las, dia após dia.\n\nIsso aponta para Cristo e o Espírito: o Pai enviou o Filho para restaurar a comunhão que o pecado quebrou (João 1.14; Colossenses 1.19-20), e hoje o Espírito Santo habita no casal cristão, derramando o próprio amor de Deus em nossos corações (Romanos 5.5). A comunhão que vocês buscam no casamento só é plenamente possível porque Cristo já reconciliou o que estava separado.`}</Txt>
          </Bloco>

          {/* II */}
          <Bloco titulo="Mandato Espiritual (II) — O Casamento Está sob o Governo de Deus" delay={0.23}>
            <Verso ref="Salmo 103.19" texto="O Senhor estabeleceu nos céus o seu trono, e o seu reino domina sobre tudo." />
            <Txt>{`As linhas diagonais do diagrama, marcadas "Reino", envolvem toda a figura. Nada no casamento de vocês vai ficar fora do governo de Deus — nem as finanças, nem a intimidade, nem as brigas, nem a rotina do dia a dia. Isso não é uma ameaça; é uma proteção. Significa que vocês não vão precisar resolver tudo sozinhos, pelo próprio critério — há um Rei que já estabeleceu o padrão certo e que caminha com vocês em cada decisão.\n\nIsso aponta para Cristo e o Espírito: o Reino que envolve o casamento de vocês foi inaugurado por Jesus (Marcos 1.15) e é vivido, no dia a dia, pelo poder do Espírito Santo — "o Reino de Deus... é justiça, paz e alegria no Espírito Santo" (Romanos 14.17). Render-se ao governo de Deus é, na prática, render-se ao senhorio de Cristo, sustentado pelo Espírito.`}</Txt>
          </Bloco>

          {/* III */}
          <Bloco titulo="Mandato Espiritual (III) — O Casamento É Pacto, Não Contrato" delay={0.26}>
            <Verso ref="Malaquias 2.14" texto="Ela é tua companheira e a mulher da tua aliança." />
            <Verso ref="Gênesis 2.24" texto="Por isso deixará o homem pai e mãe e se unirá à sua mulher, e serão uma só carne." />
            <Txt>{`Um contrato pode ser desfeito quando uma das partes não cumpre sua parte. Um pacto bíblico é diferente: é uma promessa feita diante de Deus, que Ele mesmo testemunha e sustenta. Malaquias chama a esposa de "mulher da aliança" — não "parceira contratual". É isso que vocês estão prestes a viver: não um acordo que pode ser cancelado quando as coisas ficarem difíceis, mas um pacto diante de Deus, que Ele mesmo vai ajudar vocês a cumprir.\n\nIsso aponta para Cristo e o Espírito: nenhum casal cumpre perfeitamente sua parte no pacto — por isso Deus enviou Jesus como o Mediador de uma aliança melhor, que garante o que nós não conseguimos garantir sozinhos (Hebreus 8.6; 9.15). E é o Espírito Santo quem cumpre em nós a promessa antiga: "Porei dentro de vós o meu Espírito" (Ezequiel 36.26-27) — Ele nos capacita a viver fiéis à aliança que vocês vão fazer.`}</Txt>
          </Bloco>

          {/* IV */}
          <Bloco titulo="Mandato Social e Mandato Cultural — Chamados para uma Missão" delay={0.29}>
            <Verso ref="Gênesis 1.28" texto="Deus os abençoou e disse: sede fecundos, multiplicai-vos, enchei a terra e sujeitai-a." />
            <Txt>{`No centro do diagrama estão os "Mediadores (agentes)" — o próprio casal, e não Cristo, que é o único Mediador entre Deus e os homens (1 Timóteo 2.5). Da união de vocês nascem coisas: uma casa organizada (Mandato Social) e uma influência que chega ao trabalho, à cidade, à arte, à igreja (Mandato Cultural). O casamento cristão não existe só para fazer os dois felizes — embora a alegria seja parte real do plano de Deus. Ele existe para que, unidos, vocês representem a aliança de Deus no mundo: em casa, no trabalho, na vizinhança, na igreja.\n\nIsso aponta para Cristo e o Espírito: a missão de gerar fruto para o mundo — que começou em Gênesis como mandato cultural — é retomada e ampliada por Jesus na Grande Comissão: "fazei discípulos de todas as nações" (Mateus 28.18-20). E é o Espírito Santo quem dá poder para essa missão (Atos 1.8). O casamento de vocês participa, em pequena escala, da grande obra de Deus na história da redenção — do jardim do Éden até a nova criação.`}</Txt>
          </Bloco>

          {/* Para conversar */}
          <Bloco titulo="Para Conversar em Casal" delay={0.32}>
            <div style={{ marginBottom: 12, fontSize: 'clamp(12px,1.6vw,13.5px)', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>
              Reservem alguns minutos, só vocês dois, para conversar e escrever as respostas abaixo. Não existe resposta certa — o objetivo é começar a colocar em palavras o que vocês pensam e sentem sobre o casamento.
            </div>
            <Pergunta n={1} texto={'Até hoje, o que vocês vinham considerando como a “base” do nosso relacionamento? Como isso se compara com a ideia de que o casamento nasce da comunhão de Deus?'} />
            <Pergunta n={2} texto={'Existe alguma área da nossa vida que já tratamos como “assunto nosso”, fora do que a Palavra de Deus ensina? Qual?'} />
            <Pergunta n={3} texto="Se o nosso casamento vai ser uma aliança testemunhada por Deus, e não um contrato entre nós, o que isso muda na forma como vamos encarar os momentos difíceis?" />
            <Pergunta n={4} texto={'Que “fruto para fora” — família, trabalho, igreja, cidade — nós sonhamos em gerar juntos, além da nossa própria felicidade?'} />
            <Pergunta n={5} texto="Em qual dos quatro pontos de hoje mais precisamos lembrar que é Jesus quem cumpre por nós, e o Espírito Santo quem nos capacita — e não o nosso próprio esforço?" />
          </Bloco>

          {/* Nosso combinado */}
          <Bloco titulo="Nosso Combinado" delay={0.35}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <div style={{ fontSize: 'clamp(13px,1.7vw,14.5px)', color: 'rgba(255,255,255,0.70)', marginBottom: 6 }}>Vamos priorizar os encontros deste curso porque...</div>
                <div style={{ height: 36, borderBottom: '1px solid rgba(255,200,80,0.20)', borderRadius: 0 }} />
              </div>
              <div>
                <div style={{ fontSize: 'clamp(13px,1.7vw,14.5px)', color: 'rgba(255,255,255,0.70)', marginBottom: 6 }}>Uma pergunta que queremos levar para o próximo encontro é...</div>
                <div style={{ height: 36, borderBottom: '1px solid rgba(255,200,80,0.20)' }} />
              </div>
            </div>
          </Bloco>

          {/* Para guardar */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.38 }}
            style={{ borderRadius: 14, background: 'rgba(255,200,80,0.10)', border: `1.5px solid ${GOLD_BD}`, padding: '22px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>Para Guardar no Coração</div>
            <div style={{ fontSize: 'clamp(15px,2.2vw,18px)', fontWeight: 800, color: 'rgba(255,255,255,0.88)', lineHeight: 1.5, marginBottom: 10, fontStyle: 'italic' }}>
              "E o cordão de três dobras não se quebra tão depressa."
            </div>
            <div style={{ fontSize: 11, color: GOLD, fontWeight: 700, letterSpacing: '0.12em', marginBottom: 14 }}>Eclesiastes 4.12</div>
            <div style={{ fontSize: 'clamp(13px,1.7vw,14.5px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.80 }}>
              Que o casamento de vocês seja, desde já, um cordão de três dobras: você, seu noivo ou noiva, e Deus no centro, segurando tudo junto. Essa história não começa em vocês, nem termina em vocês. Ela começou no jardim do Éden, foi restaurada por Jesus na cruz, é sustentada hoje pelo Espírito Santo, e aponta para as bodas do Cordeiro (Apocalipse 19.7-9) — o casamento final entre Cristo e a Sua Igreja. O casamento de vocês é um pequeno reflexo dessa grande história.
            </div>
          </motion.div>

          {/* Referências */}
          <Bloco titulo="Referências" delay={0.41}>
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
  const onSelect = (id: string) => navigate(`/familia/${id}`);
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

// ─── Para Casados (placeholder) ──────────────────────────────────────
export function CasadosPage() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.white }}>
      <Navbar />
      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(90px,11vw,110px) clamp(16px,4vw,32px) 80px' }}>
        <div style={{ marginBottom: 32 }}>
          <button onClick={() => navigate('/familia')} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(80,200,255,0.70)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            ← Voltar
          </button>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', paddingTop: 60 }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🏡</div>
          <h1 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 900, color: 'rgba(80,200,255,1)', marginBottom: 16 }}>Para Casados</h1>
          <p style={{ fontSize: 'clamp(14px,2vw,17px)', color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
            Recursos homiléticos e devocionais para casais. Módulo em desenvolvimento — disponível em breve.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Esboços Page ────────────────────────────────────────────────────
export function EsbocosPage() {
  const navigate = useNavigate();
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

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.white }} onClick={() => setBookDropOpen(false)}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(80px,10vw,100px) clamp(16px,4vw,32px) 60px' }}>

        {/* ── Voltar ao hub ── */}
        <div style={{ marginBottom: 28 }}>
          <button
            onClick={() => navigate('/familia')}
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

export default FamiliaHub;
