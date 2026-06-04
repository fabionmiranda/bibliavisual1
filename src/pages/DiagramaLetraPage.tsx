import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { apiUrl } from '../lib/apiUrl';
import {
  ChevronRight, BookOpen, ArrowLeft, FileText, AlertCircle,
  Lightbulb, Quote, ShieldCheck,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BIBLE_DATA } from '../data/bibleData';
import { BOOK_CONFIG } from './LivroPage';
import { sanitizarTxt } from '../lib/sanitizarTxt';

// ─────────────────────────────────────────────
// PALETTE — one color per section (1-23)
// ─────────────────────────────────────────────
const CORES: Record<number, string> = {
  1:  '#00d4ff', 2:  '#22c55e', 3:  '#a855f7', 4:  '#f59e0b', 5:  '#06b6d4',
  6:  '#ec4899', 7:  '#f97316', 8:  '#8b5cf6', 9:  '#00d4ff', 10: '#10b981',
  11: '#ff2d55', 12: '#6366f1', 13: '#ef4444', 14: '#14b8a6', 15: '#eab308',
  16: '#84cc16', 17: '#06b6d4', 18: '#a78bfa', 19: '#fb923c', 20: '#34d399',
  21: '#818cf8', 22: '#f472b6', 23: '#c084fc',
};

// ─────────────────────────────────────────────
// PARSER
// ─────────────────────────────────────────────
interface Secao {
  num: number;
  titulo: string;
  linhas: string[];
  explicacao: string;
}
interface Documento {
  estudo: string;
  data: string;
  visao: string;
  objetivo: string;
  secoes: Secao[];
}

function parseDoc(raw: string): Documento {
  const linhas = raw.replace(/\r\n/g, '\n').split('\n');
  let estudo = '', data = '', visao = '', objetivo = '';
  const secoes: Secao[] = [];
  let cur: Secao | null = null;
  let expLines: string[] = [];
  let inExp = false;

  const push = () => {
    if (cur) { cur.explicacao = expLines.join(' ').trim(); secoes.push(cur); }
    cur = null; inExp = false; expLines = [];
  };

  for (const linha of linhas) {
    const t = linha.trim();
    if (t.startsWith('====') || t === 'BÍBLIA VISUAL EXPOSITIVA' || t === 'BIBLIA VISUAL EXPOSITIVA') continue;
    if (t.startsWith('ESTUDO:'))  { estudo  = t.slice(7).trim();  continue; }
    if (t.startsWith('DATA:'))    { data    = t.slice(5).trim();  continue; }
    if (t.startsWith('--- '))     continue;
    if (t.startsWith('VISÃO:') || t.startsWith('VISAO:'))     { visao    = t.slice(t.indexOf(':') + 1).trim(); continue; }
    if (t.startsWith('OBJETIVO:'))  { objetivo = t.slice(9).trim(); continue; }

    const sm = t.match(/^(\d+)\.\s+(.+)$/);
    if (sm) { push(); cur = { num: +sm[1], titulo: sm[2], linhas: [], explicacao: '' }; continue; }
    if (!cur) continue;

    if (t.startsWith('Explicação:') || t.startsWith('Explicacao:')
      || t.startsWith('Explicação Final:') || t.startsWith('Explicacao Final:')) {
      inExp = true; expLines = [t.slice(t.indexOf(':') + 1).trim()]; continue;
    }
    // Para inExp na linha em branco — permite que seções com Explicação no início
    // (como a 21 - Antropológico) ainda tenham conteúdo coletado após a explicação
    if (inExp) {
      if (t === '') { inExp = false; }
      else { expLines.push(t); }
      continue;
    }
    if (t === '') continue;
    cur.linhas.push(linha);
  }
  push();
  return { estudo, data, visao, objetivo, secoes };
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function temHeb(s: string) { return /[֐-׿]/.test(s); }

function profLetra(letra: string): number {
  const l = letra.replace(/['']/g, '');
  const m: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5 };
  return m[l] ?? 0;
}

function cor(num: number) { return CORES[num] ?? '#00d4ff'; }

// Chip de referência bíblica
function RefBadge({ texto, c }: { texto: string; c: string }) {
  return (
    <span className="inline-flex shrink-0 items-center px-2 py-0.5 rounded-md text-[10px] font-black font-mono tracking-wide border"
      style={{ color: c, borderColor: c + '40', background: c + '18' }}>
      {texto}
    </span>
  );
}

// Bloco de explicação
function Explicacao({ texto }: { texto: string }) {
  if (!texto) return null;
  return (
    <div className="mt-5 p-4 sm:p-5 rounded-xl border border-amber-500/25 bg-amber-500/8 flex gap-3">
      <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5" />
      <p className="text-amber-100/85 text-sm sm:text-base leading-relaxed">{texto}</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// QUIÁSTICO — diagrama visual
// ─────────────────────────────────────────────
function QuiasmoItem({ linha, c }: { linha: string; c: string }) {
  const m = linha.trim().match(/^\[([A-Z][''']?)\]\s*(.+?)\s*:\s*(.+)$/);
  if (!m) return <p className="text-white/60 text-sm">{linha.trim()}</p>;
  const [, letra, ref, conteudo] = m;
  const prof = profLetra(letra);
  const isPrima = letra.includes("'") || letra.includes("'");
  const isCenter = prof >= 3 || conteudo.toUpperCase().includes('CENTRO');
  const maxProf = 4;
  const indent = isCenter ? maxProf : prof;

  return (
    <div
      className="flex items-center gap-3 py-2 group"
      style={{ paddingLeft: `${indent * 1.5}rem`, paddingRight: isPrima ? 0 : `${indent * 0.5}rem` }}
    >
      {/* Linha guia */}
      {indent > 0 && (
        <div className="absolute left-0 top-0 bottom-0 w-px opacity-20" style={{ marginLeft: `${indent * 1.5 - 0.5}rem`, background: c }} />
      )}

      {/* Badge da letra */}
      {isCenter ? (
        <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 shadow-lg"
          style={{ background: c + '30', border: `2px solid ${c}80`, color: c, boxShadow: `0 0 16px ${c}40` }}>
          {letra}
        </span>
      ) : (
        <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
          style={{ background: c + '15', border: `1px solid ${c}40`, color: c }}>
          {letra}
        </span>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap">
          <RefBadge texto={ref} c={c} />
          <span className={`text-sm leading-snug ${isCenter ? 'font-bold' : 'text-white/75'}`}
            style={isCenter ? { color: c } : {}}>
            {conteudo}
          </span>
        </div>
        {isCenter && (
          <div className="mt-1 flex items-center gap-1">
            <div className="h-px flex-1 opacity-30" style={{ background: c }} />
            <span className="font-mono text-[9px] uppercase tracking-widest opacity-60" style={{ color: c }}>CENTRO</span>
            <div className="h-px flex-1 opacity-30" style={{ background: c }} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MORFOLÓGICO — cartões de palavras
// ─────────────────────────────────────────────
function PalavraCard({ linha, c }: { linha: string; c: string }) {
  const t = linha.trim();
  const refMatch = t.match(/\[([^\]]+)\]$/);
  const ref = refMatch ? refMatch[1] : '';
  const semRef = ref ? t.slice(0, t.lastIndexOf(`[${ref}]`)).trim() : t;
  const colonIdx = semRef.indexOf('):');
  if (colonIdx === -1) return <p className="text-base text-white/80">{t}</p>;
  const parteHeb = semRef.slice(0, colonIdx + 1);
  const def = semRef.slice(colonIdx + 2).trim();
  const parenIdx = parteHeb.indexOf(' (');
  const palavra = parenIdx !== -1 ? parteHeb.slice(0, parenIdx).trim() : parteHeb;
  const translit = parenIdx !== -1 ? parteHeb.slice(parenIdx + 2).replace(')', '').trim() : '';

  return (
    <div className="flex gap-4 p-4 sm:p-5 rounded-2xl border hover:bg-white/[0.04] transition-colors"
      style={{ borderColor: c + '30', background: c + '08' }}>
      {/* Palavra original — destaque máximo */}
      <div className="shrink-0 text-right flex flex-col items-end gap-1" style={{ minWidth: '90px' }}>
        <p style={{
          color: c,
          direction: 'rtl',
          fontFamily: "'Noto Serif Hebrew','SBL Hebrew','Frank Ruehl CLM',serif",
          fontSize: 'clamp(1.4rem, 4vw, 2rem)',
          fontWeight: 700,
          lineHeight: 1.3,
          textShadow: `0 0 20px ${c}70`,
        }}>{palavra}</p>
        {translit && (
          <span className="text-xs sm:text-sm italic font-medium" style={{ color: c, opacity: 0.7 }}>
            {translit}
          </span>
        )}
        {ref && <RefBadge texto={ref} c={c} />}
      </div>
      {/* Definição */}
      <div className="flex-1 min-w-0 flex items-center">
        <p className="text-base sm:text-lg text-white/90 leading-relaxed">{def}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TRINITÁRIO — cards PAI/FILHO/ESPÍRITO
// ─────────────────────────────────────────────
const TRINITY_CORES: Record<string, string> = {
  PAI: '#f59e0b', FILHO: '#ff2d55', ESPÍRITO: '#00d4ff', ESPIRITO: '#00d4ff',
};

function TrinityCardo({ linha }: { linha: string }) {
  const t = linha.trim();
  const m = t.match(/^(PAI|FILHO|ESP[ÍI]RITO)\s+→\s+(.+)$/i);
  if (!m) {
    // Continuation parens line
    if (t.startsWith('(') && t.endsWith(')')) {
      return <p className="text-white/40 text-xs italic pl-4 -mt-2 mb-2">{t.slice(1, -1)}</p>;
    }
    return <p className="text-white/60 text-sm">{t}</p>;
  }
  const [, pessoa, conteudo] = m;
  const c = TRINITY_CORES[pessoa.toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '')] ?? '#a855f7';
  const label = pessoa.charAt(0) + pessoa.slice(1).toLowerCase();
  return (
    <div className="p-4 rounded-xl border mb-3" style={{ borderColor: c + '30', background: c + '0C' }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="font-black text-xs uppercase tracking-widest" style={{ color: c }}>{label}</span>
        <div className="h-px flex-1" style={{ background: c + '30' }} />
      </div>
      <p className="text-white/80 text-sm leading-relaxed">{conteudo}</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// RENDERER GENÉRICO DE LINHAS
// ─────────────────────────────────────────────

// Texto bíblico em hebraico/grego — destacado, grande, nítido
function TextoOriginal({ texto, c }: { texto: string; c: string }) {
  const isHeb = /[֐-׿]/.test(texto);
  return (
    <p
      className="leading-loose font-bold py-1 px-2 rounded-lg"
      style={{
        color: c,
        fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
        direction: isHeb ? 'rtl' : 'ltr',
        fontFamily: "'Noto Serif Hebrew', 'SBL Hebrew', 'Ezra SIL', 'Frank Ruehl CLM', serif",
        textShadow: `0 0 18px ${c}70`,
        background: c + '10',
        border: `1px solid ${c}25`,
        letterSpacing: isHeb ? '0.04em' : '0.02em',
      }}
    >
      {texto}
    </p>
  );
}

function RenderLinha({ raw, c, numSec }: { raw: string; c: string; numSec: number }) {
  const t = raw.trim();
  if (!t) return null;

  // ── Seção 3: Quiástico ──
  if (numSec === 3 && /^\[[A-Z]['']?\]/.test(t)) {
    return <QuiasmoItem linha={raw} c={c} />;
  }

  // ── Seção 2: Morfológico (palavra hebraica/grega) ──
  if (numSec === 2 && temHeb(t)) {
    return <PalavraCard linha={raw} c={c} />;
  }

  // ── Seção 23: Trinitário ──
  if (numSec === 23 && /^(PAI|FILHO|ESP[ÍI]RITO)\s+→/i.test(t)) {
    return <TrinityCardo linha={raw} />;
  }
  if (numSec === 23 && t.startsWith('(') && t.endsWith(')')) {
    return <TrinityCardo linha={raw} />;
  }

  // ── [ref] Chave: val | Chave: val  (INTERLINEAR / SINTÁTICO com pipes) ──
  const brackPipeM = t.match(/^\[(.+?)\]\s+(.+\|.+)$/);
  if (brackPipeM) {
    const [, ref, resto] = brackPipeM;
    const partes = resto.split('|').map(s => s.trim()).filter(Boolean);
    return (
      <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.03] space-y-3 my-1">
        <RefBadge texto={ref} c={c} />
        {partes.map((p, i) => {
          const ci = p.indexOf(':');
          if (ci === -1) {
            return temHeb(p)
              ? <TextoOriginal key={i} texto={p} c={c} />
              : <p key={i} className="text-base sm:text-lg text-white/85 leading-relaxed">{p}</p>;
          }
          const chave = p.slice(0, ci).trim();
          const valor = p.slice(ci + 1).trim();
          return (
            <div key={i} className="flex gap-3 items-start border-t border-white/[0.05] pt-3 first:border-0 first:pt-0">
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider shrink-0 mt-0.5 w-28 sm:w-32"
                style={{ color: c }}>{chave}</span>
              {temHeb(valor)
                ? <TextoOriginal texto={valor} c={c} />
                : <span className="text-base sm:text-lg text-white/90 leading-relaxed flex-1">{valor}</span>
              }
            </div>
          );
        })}
      </div>
    );
  }

  // ── [ref] conteúdo  (padrão mais comum) ──
  const brackM = t.match(/^\[(.+?)\]\s+(.+)$/);
  if (brackM) {
    const [, ref, conteudo] = brackM;
    const ci = conteudo.indexOf(':');
    const temLabel = ci !== -1 && ci <= 40;
    return (
      <div className="flex gap-3 items-start py-3 border-b border-white/[0.05] last:border-0">
        <div className="shrink-0 mt-0.5"><RefBadge texto={ref} c={c} /></div>
        {temLabel ? (
          <div className="flex-1 min-w-0">
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider mr-2" style={{ color: c }}>
              {conteudo.slice(0, ci).trim()}
            </span>
            <span className="text-base sm:text-lg text-white/90 leading-relaxed">{conteudo.slice(ci + 1).trim()}</span>
          </div>
        ) : (
          <p className="text-base sm:text-lg text-white/90 flex-1 leading-relaxed">{conteudo}</p>
        )}
      </div>
    );
  }

  // ── Etapa N [ref]: conteúdo  (PROGRESSIVO) ──
  const etapaM = t.match(/^Etapa (\d+)\s+\[(.+?)\]:\s*(.+)$/);
  if (etapaM) {
    const [, n, ref, conteudo] = etapaM;
    return (
      <div className="flex gap-3 items-start py-3 border-b border-white/[0.05] last:border-0">
        <span className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black font-mono"
          style={{ background: c + '22', color: c, border: `1.5px solid ${c}50` }}>{n}</span>
        <div className="flex-1">
          <RefBadge texto={ref} c={c} />
          <p className="text-base sm:text-lg text-white/90 mt-1.5 leading-relaxed">{conteudo}</p>
        </div>
      </div>
    );
  }

  // ── PAI/FILHO/ESPÍRITO  (síntese, fora seção 23) ──
  const triniM = t.match(/^(PAI|FILHO|ESP[ÍI]RITO)\s+→\s+(.+)$/i);
  if (triniM) {
    const [, p, v] = triniM;
    const cc = TRINITY_CORES[p.toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '')] ?? c;
    return (
      <div className="flex gap-3 items-start py-2">
        <span className="text-xs font-black uppercase tracking-widest shrink-0 mt-1 w-20"
          style={{ color: cc }}>{p}</span>
        <span className="text-base sm:text-lg text-white/85 leading-relaxed flex-1">{v}</span>
      </div>
    );
  }

  // ── Numeral romano  I [ref]: (HOMILÉTICO) ──
  const romM = t.match(/^(I{1,3}V?|VI{0,3}|IV)\s+\[(.+?)\]:\s*(.+)$/);
  if (romM) {
    const [, num, ref, conteudo] = romM;
    return (
      <div className="flex gap-3 items-start py-3 border-b border-white/[0.05] last:border-0">
        <span className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-base font-black font-mono"
          style={{ background: c + '22', color: c, border: `1.5px solid ${c}50` }}>{num}</span>
        <div className="flex-1">
          <RefBadge texto={ref} c={c} />
          <p className="text-base sm:text-lg text-white/90 font-semibold mt-1.5 leading-relaxed">{conteudo}</p>
        </div>
      </div>
    );
  }

  // ── "→ texto" (seta / sub-item) ──
  if (t.startsWith('→') || t.startsWith('->')) {
    return (
      <div className="flex gap-2.5 pl-3 py-1.5">
        <span className="shrink-0 font-black text-lg leading-tight" style={{ color: c }}>→</span>
        <p className="text-base sm:text-lg text-white/80 leading-relaxed">{t.slice(1).trim()}</p>
      </div>
    );
  }

  // ── Bullet  - texto ──
  if (t.startsWith('- ')) {
    return (
      <div className="flex gap-3 pl-2 py-1">
        <span className="mt-[10px] w-2 h-2 rounded-full shrink-0" style={{ background: c }} />
        <p className="text-base sm:text-lg text-white/85 leading-relaxed">{t.slice(2)}</p>
      </div>
    );
  }

  // ── Texto indentado (≥2 espaços) ──
  const indent = (raw.match(/^(\s+)/)?.[1].length ?? 0);
  if (indent >= 2) {
    return <p className="pl-6 text-base sm:text-lg text-white/70 leading-relaxed italic">{t}</p>;
  }

  // ── "Key: value" genérico ──
  const kvM = t.match(/^([A-ZÁÉÍÓÚÃÕÇ][^:]{1,50}):\s+(.+)$/);
  if (kvM) {
    const [, chave, valor] = kvM;
    if (!chave.startsWith('Explicaç') && !chave.startsWith('Explicac')) {
      return (
        <div className="flex gap-3 items-start py-2.5 border-b border-white/[0.05] last:border-0">
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider shrink-0 whitespace-nowrap mt-0.5 min-w-[6rem]"
            style={{ color: c }}>{chave}</span>
          <p className="text-base sm:text-lg text-white/90 flex-1 leading-relaxed">{valor}</p>
        </div>
      );
    }
  }

  // ── Sub-cabeçalho (linha curta terminando em ":") ──
  if (t.endsWith(':') && t.length < 80 && !t.includes('[')) {
    return (
      <p className="text-sm sm:text-base font-black uppercase tracking-wider mt-6 mb-2 first:mt-0"
        style={{ color: c }}>{t.slice(0, -1)}</p>
    );
  }

  // ── Hebraico / grego solto ──
  if (temHeb(t)) {
    return <TextoOriginal texto={t} c={c} />;
  }

  // ── Fallback parágrafo ──
  return <p className="text-base sm:text-lg text-white/85 leading-relaxed py-0.5">{t}</p>;
}

// ─────────────────────────────────────────────
// ANTROPOLÓGICO — seção 21
// ─────────────────────────────────────────────
const DIM_CORES: Record<string, string> = {
  'Filosófico':  '#818cf8', 'Filosofico':  '#818cf8',
  'Psicológico': '#f472b6', 'Psicologico': '#f472b6',
  'Sociológico': '#34d399', 'Sociologico': '#34d399',
  'Teológico':   '#f59e0b', 'Teologico':   '#f59e0b',
  'Redentivo':   '#c084fc',
};

interface AntrBloco {
  ref: string;
  tema: string;
  dims: { cat: string; texto: string }[];
}

function parseAntropo(linhas: string[]): AntrBloco[] {
  const blocos: AntrBloco[] = [];
  let cur: AntrBloco | null = null;
  for (const linha of linhas) {
    const t = linha.trim();
    if (!t) continue;
    // Cabeçalho: "Lv 6:2b–3 — PECADO"
    const hm = t.match(/^(Lv\s+[\d:.–\-]+[a-z]?(?:–[\d]+[a-z]?)?)\s+[—\-]+\s+(.+)$/);
    if (hm) {
      if (cur) blocos.push(cur);
      cur = { ref: hm[1], tema: hm[2], dims: [] };
      continue;
    }
    // Dimensão: "Filosófico: → texto" ou "Filosófico: texto"
    const dm = t.match(/^([^:]{4,25}):\s+→?\s*(.+)$/);
    if (dm && cur && DIM_CORES[dm[1].trim()]) {
      cur.dims.push({ cat: dm[1].trim(), texto: dm[2].trim() });
      continue;
    }
  }
  if (cur) blocos.push(cur);
  return blocos;
}

function SecaoAntropologico({ sec }: { sec: Secao }) {
  const c = cor(sec.num); // #818cf8
  const blocos = parseAntropo(sec.linhas);
  const dimOrdem = ['Filosófico','Filosofico','Psicológico','Psicologico','Sociológico','Sociologico','Teológico','Teologico','Redentivo'];

  return (
    <div className="px-4 sm:px-5 py-5 space-y-4">
      {blocos.map((bloco, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: c + '30', background: `linear-gradient(135deg, ${c}08, transparent)` }}
        >
          {/* Cabeçalho do bloco */}
          <div className="flex items-center gap-3 px-4 py-3 border-b"
            style={{ borderColor: c + '25', background: c + '14' }}>
            <RefBadge texto={bloco.ref} c={c} />
            <span className="font-display font-black text-sm sm:text-base uppercase tracking-tight"
              style={{ color: c, textShadow: `0 0 12px ${c}50` }}>
              {bloco.tema}
            </span>
          </div>

          {/* Grid de dimensões */}
          <div className="divide-y divide-white/[0.05]">
            {bloco.dims
              .sort((a, b) => dimOrdem.indexOf(a.cat) - dimOrdem.indexOf(b.cat))
              .map((dim, j) => {
                const dc = DIM_CORES[dim.cat] ?? c;
                return (
                  <div key={j}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-white/[0.025] transition-colors group">
                    {/* Badge da categoria */}
                    <span
                      className="shrink-0 mt-0.5 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-black uppercase tracking-wide text-center leading-tight"
                      style={{
                        color: dc,
                        background: dc + '18',
                        border: `1px solid ${dc}35`,
                        minWidth: '6rem',
                      }}>
                      {dim.cat}
                    </span>
                    {/* Conteúdo */}
                    <p className="text-sm sm:text-base text-white/75 leading-relaxed flex-1
                      group-hover:text-white/90 transition-colors">
                      {dim.texto}
                    </p>
                  </div>
                );
              })}
          </div>
        </motion.div>
      ))}

      {/* Explicação intro (aparece ao final, como síntese) */}
      {sec.explicacao && (
        <div className="mt-2">
          <Explicacao texto={sec.explicacao} />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// BOTÃO FLUTUANTE — voltar ao grid de diagramas
// ─────────────────────────────────────────────
function BotaoVoltarNav({ cor: c }: { cor: string }) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const nav = document.getElementById('nav-diagramas');
    if (!nav) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisivel(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(nav);
    return () => obs.disconnect();
  }, []);

  const voltar = () => {
    document.getElementById('nav-diagramas')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.button
      onClick={voltar}
      initial={false}
      animate={visivel
        ? { opacity: 1, y: 0, pointerEvents: 'auto' }
        : { opacity: 0, y: 20, pointerEvents: 'none' }
      }
      transition={{ duration: 0.25 }}
      className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-50
        flex items-center gap-2.5 px-4 py-3 rounded-2xl
        font-mono font-black text-xs sm:text-sm uppercase tracking-wider
        shadow-2xl transition-transform active:scale-95"
      style={{
        background: `linear-gradient(135deg, ${c}28, ${c}14)`,
        border: `1.5px solid ${c}70`,
        color: c,
        boxShadow: `0 0 24px ${c}35, 0 8px 32px rgba(0,0,0,0.5)`,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Ícone de grid */}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="0" y="0" width="6" height="6" rx="1.5" fill={c} opacity="0.9"/>
        <rect x="8" y="0" width="6" height="6" rx="1.5" fill={c} opacity="0.9"/>
        <rect x="0" y="8" width="6" height="6" rx="1.5" fill={c} opacity="0.5"/>
        <rect x="8" y="8" width="6" height="6" rx="1.5" fill={c} opacity="0.5"/>
      </svg>
      Diagramas
    </motion.button>
  );
}

// ─────────────────────────────────────────────
// FORMATADOR WHATSAPP
// ─────────────────────────────────────────────
interface CtxWA { estudo: string; livro: string; secao: string; letra: string; referencia: string }

function formatarParaWA(sec: Secao, ctx: CtxWA): string {
  const num  = String(sec.num).padStart(2, '0');
  const perg = PERGUNTAS[sec.num] ?? '';
  const url  = typeof window !== 'undefined' ? window.location.href : '';
  const L: string[] = [];

  L.push('BIBLIA VISUAL EXPOSITIVA');
  L.push('');
  L.push(ctx.referencia ? `${ctx.livro} ${ctx.referencia}` : `Livro: ${ctx.livro}`);
  if (ctx.estudo) L.push(`Estudo: ${ctx.estudo}`);
  L.push(`Secao ${ctx.secao} - Divisao ${ctx.letra}`);
  L.push('');
  L.push(`DIAGRAMA ${num} - ${sec.titulo.toUpperCase()}`);
  L.push('');
  if (perg) {
    L.push('Pergunta central:');
    L.push(perg);
    L.push('');
  }
  L.push('CONTEUDO');
  L.push('');

  for (const linha of sec.linhas) {
    const t = linha.trim();
    if (!t) { L.push(''); continue; }

    const pipeM = t.match(/^\[(.+?)\]\s+(.+\|.+)$/);
    if (pipeM) {
      L.push(`[${pipeM[1]}]`);
      for (const parte of pipeM[2].split('|').map(s => s.trim()).filter(Boolean)) {
        const ci = parte.indexOf(':');
        if (ci !== -1) {
          L.push(`  ${parte.slice(0, ci).trim()}: ${parte.slice(ci + 1).trim()}`);
        } else {
          L.push(`  ${parte}`);
        }
      }
      continue;
    }

    const brackM = t.match(/^\[(.+?)\]\s+(.+)$/);
    if (brackM) {
      const ci = brackM[2].indexOf(':');
      if (ci !== -1 && ci <= 40) {
        L.push(`[${brackM[1]}] ${brackM[2].slice(0, ci).trim()}: ${brackM[2].slice(ci + 1).trim()}`);
      } else {
        L.push(`[${brackM[1]}] ${brackM[2]}`);
      }
      continue;
    }

    const etM = t.match(/^Etapa (\d+)\s+\[(.+?)\]:\s*(.+)$/);
    if (etM) {
      L.push(`Etapa ${etM[1]} [${etM[2]}]: ${etM[3]}`);
      continue;
    }

    const trM = t.match(/^(PAI|FILHO|ESP[ÍI]RITO)\s+[→>-]+\s+(.+)$/i);
    if (trM) {
      L.push(`${trM[1]}: ${trM[2]}`);
      continue;
    }

    const romM = t.match(/^(I{1,3}V?|VI{0,3}|IV)\s+\[(.+?)\]:\s*(.+)$/);
    if (romM) {
      L.push('');
      L.push(`${romM[1]} [${romM[2]}]: ${romM[3]}`);
      continue;
    }

    if (t.startsWith('→') || t.startsWith('->')) {
      L.push(`  - ${t.replace(/^[→>-]+\s*/, '')}`);
      continue;
    }

    if (t.startsWith('- ')) {
      L.push(`  - ${t.slice(2)}`);
      continue;
    }

    if (linha.match(/^\s{2,}/)) {
      L.push(`  ${t}`);
      continue;
    }

    const kvM = t.match(/^([A-ZÁÉÍÓÚÃÕÇ][^:]{1,40}):\s+(.+)$/);
    if (kvM && !kvM[1].startsWith('Explicaç') && !kvM[1].startsWith('Explicac')) {
      L.push(`${kvM[1]}: ${kvM[2]}`);
      continue;
    }

    L.push(t);
  }

  if (sec.explicacao) {
    L.push('');
    L.push('EXPLICACAO TEOLOGICA');
    L.push('');
    const palavras = sec.explicacao.split(' ');
    let bloco = '';
    for (const p of palavras) {
      if ((bloco + ' ' + p).length > 300) {
        L.push(bloco.trim());
        bloco = p;
      } else {
        bloco += ' ' + p;
      }
    }
    if (bloco.trim()) L.push(bloco.trim());
  }

  L.push('');
  if (url) {
    L.push('Acesse o conteudo completo:');
    L.push(url);
    L.push('');
  }
  L.push('Biblia Visual Expositiva');
  L.push(`${ctx.livro} - Secao ${ctx.secao} - Divisao ${ctx.letra}`);

  return L.join('\n');
}

function compartilharWA(sec: Secao, ctx: CtxWA) {
  const texto = formatarParaWA(sec, ctx);
  const url   = `https://wa.me/?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ─────────────────────────────────────────────
// DEVOCIONAL
// ─────────────────────────────────────────────
function formatarData(): string {
  const dias  = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
  const meses = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  const now   = new Date();
  return `${dias[now.getDay()]}, ${now.getDate()} de ${meses[now.getMonth()]} de ${now.getFullYear()}`;
}

// Divide um texto longo em pedacos curtos, garantindo quebra de linha real
function linhasWA(texto: string): string[] {
  if (!texto.trim()) return [];

  // 1. Remove caracteres fora do bloco latino (hebraico/grego)
  const limpo = texto.replace(/[^\x00-\xFF]/g, '').trim();
  if (!limpo) return [];

  // 2. Normaliza pipes como separadores de linha
  const comPipes = limpo.replace(/\s*\|\s*/g, '\n');

  // 3. Quebra em cada fim de sentenca (ponto/exclamacao/interrogacao seguido de espaco)
  const comSentencas = comPipes
    .replace(/\.\s+/g, '.\n')
    .replace(/!\s+/g, '!\n')
    .replace(/\?\s+/g, '?\n')
    .replace(/;\s+/g, ';\n');

  // 4. Divide nas quebras criadas acima
  const pedacos = comSentencas.split('\n').map(s => s.trim()).filter(s => s.length > 2);

  // 5. Para cada pedaco ainda longo, quebra por palavras em no maximo 75 chars
  const resultado: string[] = [];
  for (const pedaco of pedacos) {
    if (pedaco.length <= 75) {
      resultado.push(pedaco);
    } else {
      const palavras = pedaco.split(' ');
      let linha = '';
      for (const p of palavras) {
        const candidato = linha ? linha + ' ' + p : p;
        if (candidato.length > 75 && linha) {
          resultado.push(linha);
          linha = p;
        } else {
          linha = candidato;
        }
      }
      if (linha) resultado.push(linha);
    }
  }
  return resultado;
}

function gerarDevocional(sec: Secao, ctx: CtxWA): string {
  const data = formatarData();
  const perg = PERGUNTAS[sec.num] ?? '';
  const num  = String(sec.num).padStart(2, '0');

  // Cada item do array = uma linha no WhatsApp
  const L: string[] = [];

  // --- CABECALHO ---
  L.push(`${data} - Biblia Visual Expositiva`);
  L.push('');
  L.push(ctx.referencia ? `${ctx.livro} ${ctx.referencia}` : ctx.livro);
  L.push(`Secao ${ctx.secao} - Divisao ${ctx.letra}`);
  L.push(`Diagrama ${num} - ${sec.titulo}`);

  // --- PERGUNTA CENTRAL ---
  if (perg) {
    L.push('');
    L.push('Reflexao central:');
    L.push('');
    for (const linha of linhasWA(perg)) L.push(linha);
  }

  // --- REFLEXAO (explicacao) ---
  if (sec.explicacao) {
    L.push('');
    L.push('Reflexao:');
    L.push('');
    for (const linha of linhasWA(sec.explicacao)) L.push(linha);
  }

  // --- RODAPE ---
  L.push('');
  L.push('---');
  L.push('Biblia Visual Expositiva');
  L.push(ctx.referencia ? `${ctx.livro} ${ctx.referencia} - Divisao ${ctx.letra}` : `${ctx.livro} - Divisao ${ctx.letra}`);
  L.push('');
  L.push('Deseja receber os devocionais da Biblia Visual Expositiva?');
  L.push('Clique no link e faca parte do nosso CLUBE DA BIBLIA VISUAL EXPOSITIVA:');
  L.push('https://bibliavisual.fabionmiranda.com');

  return L.join('\n');
}

function abrirInfografico() {
  window.open('https://wa.me/5535997567535', '_blank', 'noopener,noreferrer');
}

function enviarDevocional(sec: Secao, ctx: CtxWA) {
  const texto = gerarDevocional(sec, ctx);
  window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank', 'noopener,noreferrer');
}

// ── Ícone WhatsApp inline ──
function IconeWA({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

// ─────────────────────────────────────────────
// CARD DE SEÇÃO
// ─────────────────────────────────────────────
function SecaoCard({ sec, idx, ctx }: { sec: Secao; idx: number; ctx: CtxWA }) {
  const c = cor(sec.num);
  return (
    <motion.div
      id={`sec-${sec.num}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: idx * 0.04 }}
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: c + '28', background: `linear-gradient(145deg, ${c}08, transparent)` }}
    >
      {/* Header da seção */}
      <div className="flex items-center gap-4 px-5 py-4 sm:py-5 border-b" style={{ borderColor: c + '28', background: c + '10' }}>
        <span className="font-mono font-black text-4xl sm:text-5xl leading-none shrink-0"
          style={{ color: c, textShadow: `0 0 28px ${c}70` }}>
          {String(sec.num).padStart(2, '0')}
        </span>
        <div className="flex-1 min-w-0">
          <h2 className="font-display font-black text-lg sm:text-xl md:text-2xl uppercase tracking-tight text-white leading-tight">
            {sec.titulo}
          </h2>
        </div>
      </div>

      {/* Conteúdo */}
      {sec.num === 21 ? (
        <SecaoAntropologico sec={sec} />
      ) : (
        <>
          <div className="px-5 py-5 space-y-1">
            {sec.linhas.map((l, i) => (
              <RenderLinha key={i} raw={l} c={c} numSec={sec.num} />
            ))}
          </div>

          {/* Explicação */}
          {sec.explicacao && (
            <div className="px-5 pb-5">
              <Explicacao texto={sec.explicacao} />
            </div>
          )}
        </>
      )}

      {/* Botões Infográfico e Devocional */}
      <div className="flex flex-wrap gap-2 px-5 py-4 border-t" style={{ borderColor: c + '20', background: c + '06' }}>
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={abrirInfografico}
          className="flex items-center gap-2 px-3 py-2 rounded-xl font-black text-xs uppercase tracking-wide transition-all duration-150"
          style={{ color: '#25d366', background: '#25d36614', border: '1.5px solid #25d36640' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#25d36628'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#25d36614'; }}
        >
          <IconeWA size={13} />
          Infográfico — {sec.titulo}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => enviarDevocional(sec, ctx)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl font-black text-xs uppercase tracking-wide transition-all duration-150"
          style={{ color: c, background: c + '14', border: `1.5px solid ${c}40` }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = c + '28'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = c + '14'; }}
        >
          <IconeWA size={13} />
          Devocional
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// PERGUNTAS por número de diagrama
// ─────────────────────────────────────────────
const PERGUNTAS: Record<number, string> = {
  1:  'O que o texto realmente diz em sua forma original?',
  2:  'Que tipo de palavras e formas revelam a precisão teológica?',
  3:  'Como o texto está estruturado e onde está o seu centro de ênfase?',
  4:  'Quem faz o quê no texto e como as ações estão organizadas?',
  5:  'Qual é o fluxo de significado e a lógica das ideias do texto?',
  6:  'Como o texto avança passo a passo até seu objetivo final?',
  7:  'Onde o texto aumenta o peso, a gravidade ou a exigência?',
  8:  'Em quais esferas (humana, social, divina) o texto se move?',
  9:  'Quem pode agir, como pode agir e quais são os limites diante de Deus?',
  10: 'Quais relações são rompidas, afetadas ou restauradas?',
  11: 'Como este texto aponta para ou se cumpre em Cristo?',
  12: 'Que doutrinas estão presentes e como se conectam ao todo da teologia bíblica?',
  13: 'Qual é o problema central do texto e como ele é resolvido?',
  14: 'O que o texto enfatiza por meio de repetição de ideias ou temas?',
  15: 'O que gera o quê dentro da lógica moral e teológica do texto?',
  16: 'Que erros, objeções ou visões distorcidas o texto corrige?',
  17: 'Que perguntas o próprio texto exige que façamos para compreendê-lo?',
  18: 'Como diferentes intérpretes entenderam cada parte do texto?',
  19: 'Como esse texto deve ser pregado de forma fiel e estruturada?',
  20: 'Como esse texto deve ser vivido concretamente na vida da igreja?',
  21: 'Como o texto descreve o ser humano em sua experiência existencial e como Deus resolve essa condição?',
  22: 'Como o texto orienta as relações familiares diante do erro, da responsabilidade e da restauração?',
  23: 'Como a ação de Deus neste texto é compreendida à luz do Pai, do Filho e do Espírito Santo?',
};

// ─────────────────────────────────────────────
// NAVEGAÇÃO — grid de cards didáticos
// ─────────────────────────────────────────────
function NavDiagramas({ secoes, ctx }: { secoes: Secao[]; ctx: CtxWA }) {
  const [ativo, setAtivo] = useState<number>(secoes[0]?.num ?? 1);

  const scrollTo = (num: number) => {
    setAtivo(num);
    document.getElementById(`sec-${num}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const secAtiva = secoes.find(s => s.num === ativo);

  return (
    <div id="nav-diagramas" className="mb-10 scroll-mt-24">

      {/* Cabeçalho */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-brand-blue/40 to-transparent" />
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-blue/25 bg-brand-blue/8">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
          <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-brand-blue">
            {secoes.length} Diagramas Didáticos
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-brand-blue/40 to-transparent" />
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {secoes.map((s, i) => {
          const c = cor(s.num);
          const isAtivo = ativo === s.num;
          const pergunta = PERGUNTAS[s.num] ?? '';
          const tituloShort = s.titulo.replace(/\(.*?\)/g, '').replace(/[–\-].*/, '').trim();

          return (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              whileHover={{ scale: 1.04, y: -3 }}
              className="relative rounded-2xl overflow-hidden"
              style={isAtivo ? {
                background: `linear-gradient(145deg, ${c}30, ${c}14)`,
                border: `2px solid ${c}`,
                boxShadow: `0 0 28px ${c}55, 0 6px 20px rgba(0,0,0,0.4)`,
              } : {
                background: `linear-gradient(145deg, ${c}12, ${c}06)`,
                border: `1.5px solid ${c}45`,
                boxShadow: `0 0 8px ${c}18`,
              }}
            >
              {/* Linha de brilho no topo */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-opacity duration-200"
                style={{
                  background: `linear-gradient(90deg,transparent,${c},transparent)`,
                  opacity: isAtivo ? 1 : 0.35,
                }} />

              {/* Botão principal (clica → scroll) */}
              <button
                onClick={() => scrollTo(s.num)}
                className="w-full flex flex-col gap-2.5 p-4 sm:p-5 text-left pb-3"
              >
                {/* Número + título */}
                <div className="flex items-baseline gap-2.5">
                  <span
                    className="font-mono font-black leading-none shrink-0"
                    style={{
                      fontSize: 'clamp(1.4rem, 3.5vw, 1.9rem)',
                      color: c,
                      textShadow: `0 0 18px ${c}${isAtivo ? 'CC' : '80'}`,
                    }}
                  >
                    {String(s.num).padStart(2, '0')}
                  </span>
                  <span
                    className="font-black uppercase leading-tight"
                    style={{
                      fontSize: 'clamp(0.65rem, 1.8vw, 0.85rem)',
                      letterSpacing: '0.07em',
                      color: isAtivo ? '#fff' : `${c}DD`,
                    }}
                  >
                    {tituloShort}
                  </span>
                </div>

                {/* Divisor */}
                <div className="h-px w-full"
                  style={{ background: `linear-gradient(90deg,${c}80,transparent)` }} />

                {/* Pergunta */}
                <p
                  className="leading-snug line-clamp-3"
                  style={{
                    fontSize: 'clamp(0.65rem, 1.6vw, 0.78rem)',
                    color: isAtivo ? 'rgba(255,255,255,0.90)' : `${c}CC`,
                    fontStyle: 'italic',
                  }}
                >
                  {pergunta}
                </p>
              </button>

              {/* Rodapé do card: dot + botão WhatsApp */}
              <div className="flex items-center justify-between px-4 pb-3">
                <span className="w-2 h-2 rounded-full transition-all duration-200"
                  style={{
                    background: c,
                    opacity: isAtivo ? 1 : 0.4,
                    boxShadow: isAtivo ? `0 0 8px ${c}` : 'none',
                  }}
                />
                <motion.button
                  whileTap={{ scale: 0.90 }}
                  onClick={(e) => { e.stopPropagation(); compartilharWA(s, ctx); }}
                  title="Compartilhar no WhatsApp"
                  className="flex items-center gap-1 px-2 py-1 rounded-lg font-black text-[10px] uppercase tracking-wide transition-all duration-150"
                  style={{
                    color: '#25d366',
                    background: '#25d36618',
                    border: '1px solid #25d36640',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = '#25d36630';
                    (e.currentTarget as HTMLElement).style.borderColor = '#25d36680';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = '#25d36618';
                    (e.currentTarget as HTMLElement).style.borderColor = '#25d36640';
                  }}
                >
                  <IconeWA size={12} />
                  <span>WA</span>
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Banner do diagrama ativo */}
      {secAtiva && (
        <motion.div
          key={ativo}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-5 p-4 sm:p-5 rounded-2xl border"
          style={{ borderColor: cor(ativo) + '50', background: cor(ativo) + '12' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono font-black text-base sm:text-lg"
              style={{ color: cor(ativo), textShadow: `0 0 14px ${cor(ativo)}80` }}>
              {String(ativo).padStart(2, '0')}
            </span>
            <div className="w-px h-5 bg-white/20" />
            <span className="font-display font-black text-base sm:text-xl uppercase tracking-tight text-white">
              {secAtiva.titulo}
            </span>
          </div>
          <p className="text-sm sm:text-base italic leading-relaxed"
            style={{ color: cor(ativo) + 'DD' }}>
            {PERGUNTAS[ativo]}
          </p>
        </motion.div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// SLUG HELPERS
// ─────────────────────────────────────────────
function slugToLetra(slug: string) { return slug.replace(/-prime/g, "'").toUpperCase(); }

// Converte referência bíblica em string de coordenadas (mesmo formato do AdminLivroPage)
function refParaCoordsStr(ref: string): string {
  const r = ref.replace(/[–—]/g, '-');
  const multi  = r.match(/(\d+):(\d+)-(\d+):(\d+)/);
  if (multi)  return `${multi[1]}_${multi[2]}-${multi[3]}_${multi[4]}`;
  const single = r.match(/(\d+):(\d+)-(\d+)/);
  if (single) return `${single[1]}_${single[2]}_${single[3]}`;
  const verse  = r.match(/(\d+):(\d+)/);
  if (verse)  return `${verse[1]}_${verse[2]}`;
  return '';
}

// Parseia estrutura.txt (mesmo formato de EstruturaDetalhePage)
function parsearItensEstrutura(texto: string): Array<{ num: string; ref: string; titulo: string }> {
  return texto
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0)
    .map(l => {
      const m1 = l.match(/^\[(\d+)\]\s*-\s*(.+?)\s*-\s*(.+)$/);
      if (m1) return { num: m1[1], ref: m1[2].trim(), titulo: m1[3].trim() };
      const m2 = l.match(/^\[(\d+)\]\s+(.+?)\s+[—–]\s+(.+)$/);
      if (m2) return { num: m2[1], ref: m2[2].trim(), titulo: m2[3].trim() };
      const m3 = l.match(/^\[(\d+)\]\s+(.+)$/);
      if (m3) return { num: m3[1], ref: '', titulo: m3[2].trim() };
      return { num: '', ref: '', titulo: l };
    });
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function DiagramaLetraPage() {
  const { livro: livroId = '', indice = '1', letra = '' } = useParams<{
    livro: string; indice: string; letra: string;
  }>();

  const livroData  = BIBLE_DATA.livros.find(l => l.id === livroId);
  const testamento = livroData?.testamento ?? 'AT';
  const cfg        = BOOK_CONFIG[livroId];
  const Icone      = cfg?.icon ?? BookOpen;
  const corHex     = testamento === 'AT' ? '#00d4ff' : '#ff2d55';
  const letraDisplay = slugToLetra(letra);

  const baseSecao     = `/${livroId}/estrutura/${indice}`;
  const baseEstrutura = `/${livroId}/estrutura`;

  const [estado, setEstado]   = useState<'loading' | 'ok' | 'empty' | 'error'>('loading');
  const [doc, setDoc]         = useState<Documento | null>(null);
  const [metaArq, setMetaArq] = useState('');
  const [secAtiva, setSecAtiva] = useState(1);

  // Track seção ativa no scroll
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    if (estado !== 'ok') return;
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length) {
          const ids = visible.map(e => parseInt(e.target.id.replace('sec-', '')));
          setSecAtiva(Math.min(...ids));
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    doc?.secoes.forEach(s => {
      const el = document.getElementById(`sec-${s.num}`);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [estado, doc]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setEstado('loading');
      try {
        // 1. Busca estrutura.txt para obter a referência da seção `indice`
        const rEst = await fetch(`/admin/${testamento}/${livroId}/estrutura.txt`);
        let coordsStr = '';
        let livroNome = livroId.charAt(0).toUpperCase() + livroId.slice(1);
        if (rEst.ok) {
          const itens = parsearItensEstrutura(await rEst.text());
          const item  = itens.find(it => it.num === String(parseInt(indice)).padStart(2, '0'))
            ?? itens[parseInt(indice) - 1];
          if (item?.ref) coordsStr = refParaCoordsStr(item.ref);
        }

        // 2. Lista arquivos de diagrama do livro
        const r1 = await fetch(`${apiUrl.diagramas}?testamento=${testamento}&livroId=${livroId}`);
        const j1 = await r1.json();
        const arquivos: string[] = j1.arquivos ?? [];

        // 3. Busca o arquivo: novo formato (sem letra) ou antigo (com letra no URL)
        const nomeEsperado = coordsStr ? `${livroNome}_${coordsStr}.txt` : null;
        let arquivo = nomeEsperado ? arquivos.find(f => f === nomeEsperado) : undefined;

        // Fallback: formato antigo Livro_Letra_Cap_VI[_VF].txt
        if (!arquivo && letraDisplay) {
          const prefixoAntigo = `${livroNome}_${letraDisplay}_`;
          // extrai cap da coordsStr (primeiros dígitos antes de _ ou -)
          const capMatch = coordsStr.match(/^(\d+)/);
          const cap = capMatch ? capMatch[1] : null;
          arquivo = arquivos.find(f => {
            if (!f.startsWith(prefixoAntigo)) return false;
            if (!cap) return true;
            const p = f.replace(/\.txt$/i, '').split('_');
            return p[2] === cap; // p[0]=Livro, p[1]=Letra, p[2]=Cap
          });
        }

        if (!arquivo || cancelled) { if (!cancelled) setEstado('empty'); return; }
        setMetaArq(arquivo);
        const r2 = await fetch(`/admin/${testamento}/${livroId}/${arquivo}`);
        if (!r2.ok) { if (!cancelled) setEstado('empty'); return; }
        const texto = sanitizarTxt(await r2.text());
        if (!texto.trim()) { if (!cancelled) setEstado('empty'); return; }
        const parsed = parseDoc(texto);
        if (!cancelled) { setDoc(parsed); setEstado('ok'); }
      } catch { if (!cancelled) setEstado('error'); }
    }
    load();
    return () => { cancelled = true; };
  }, [livroId, testamento, indice, letraDisplay]);

  const meta = (() => {
    if (!metaArq) return null;
    const p = metaArq.replace(/\.txt$/i, '').split('_');
    // Novo: Livro_Cap_VI[_VF]  →  p[1]=cap, p[2]=vi, p[3]=vf
    // Antigo: Livro_Letra_Cap_VI[_VF]  →  p[1]=letra, p[2]=cap, p[3]=vi, p[4]=vf
    const offset = p.length >= 5 || (p.length >= 4 && isNaN(Number(p[1]))) ? 1 : 0;
    if (p.length < 3 + offset) return null;
    return { cap: p[1 + offset], vi: p[2 + offset], vf: p[3 + offset] ?? '' };
  })();

  return (
    <div className="min-h-screen flex flex-col bg-bg-deep text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/50 mb-10 flex-wrap font-mono">
          <Link to="/biblioteca" className="hover:text-brand-blue transition-colors font-bold">Biblioteca</Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/20" />
          <Link to={baseEstrutura} className="hover:text-brand-blue transition-colors font-bold text-white/70">
            {livroData?.nome ?? livroId}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/20" />
          <Link to={baseSecao} className="hover:text-brand-blue transition-colors text-white/50">
            Seção {indice}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/20" />
          <span className="font-black" style={{ color: corHex }}>{letraDisplay}</span>
        </nav>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-5 mb-10"
        >
          {cfg && (
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${cfg.grad} border border-white/10 shadow-xl shrink-0`}>
              <Icone className="w-10 h-10 text-white/90" strokeWidth={1.2} />
            </div>
          )}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] font-black mb-1" style={{ color: corHex }}>
              {livroData?.nome ?? livroId} — Seção {indice}
              {meta && <span className="ml-2 opacity-50 normal-case tracking-normal"> · Cap.{meta.cap} v.{meta.vi}–{meta.vf}</span>}
            </p>
            <h1 className="font-display font-black text-5xl sm:text-7xl uppercase tracking-tighter leading-none"
              style={{ color: corHex, textShadow: `0 0 40px ${corHex}60` }}>
              {letraDisplay}
            </h1>
          </div>
        </motion.div>

        {/* Intro (visao + objetivo) */}
        {estado === 'ok' && doc && (doc.visao || doc.objetivo) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8 p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] space-y-3"
          >
            {doc.estudo && (
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">{doc.estudo}</p>
            )}
            {doc.visao && (
              <div className="flex gap-3 items-start">
                <Quote className="w-4 h-4 text-white/25 shrink-0 mt-0.5" />
                <p className="text-white/75 text-sm leading-relaxed italic">{doc.visao}</p>
              </div>
            )}
            {doc.objetivo && (
              <div className="flex gap-3 items-start">
                <Lightbulb className="w-4 h-4 text-amber-400/60 shrink-0 mt-0.5" />
                <p className="text-white/55 text-sm leading-relaxed">{doc.objetivo}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* States */}
        {estado === 'loading' && (
          <div className="flex flex-col items-center gap-4 py-24">
            <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: `${corHex}40`, borderTopColor: corHex }} />
            <p className="font-mono text-sm text-white/30 uppercase tracking-widest">Carregando…</p>
          </div>
        )}

        {estado === 'error' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="rounded-2xl border border-white/[0.06] p-12 text-center"
            style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.025),transparent)' }}>
            <div className="flex flex-col items-center gap-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: `${corHex}15`, border: `1px solid ${corHex}30` }}>
                <AlertCircle className="w-7 h-7" style={{ color: corHex }} />
              </div>
              <p className="font-display font-black text-xl uppercase tracking-tight text-white/70">
                Erro ao carregar
              </p>
              <p className="text-white/35 text-sm">Não foi possível carregar o diagrama.</p>
            </div>
          </motion.div>
        )}

        {estado === 'empty' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="rounded-2xl border-2 border-dashed border-white/10 p-12 text-center flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: `${corHex}15`, border: `1px solid ${corHex}30` }}>
              <FileText className="w-7 h-7" style={{ color: corHex }} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-display font-black text-xl uppercase tracking-tight text-white/70">
                Diagrama não disponível
              </p>
              <p className="text-white/40 text-sm max-w-xs leading-relaxed mx-auto">
                Nenhum arquivo foi encontrado para a divisão{' '}
                <span className="font-black" style={{ color: corHex }}>{letraDisplay}</span>.
              </p>
              <p className="text-white/30 text-sm max-w-xs leading-relaxed mx-auto">
                Para disponibilizar este conteúdo, faça o upload do arquivo na área administrativa.
              </p>
            </div>
            <Link
              to={`/admin/${testamento.toLowerCase()}/${livroId}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-bold transition-all"
              style={{ borderColor: `${corHex}40`, color: corHex, background: `${corHex}10` }}
            >
              <ShieldCheck className="w-4 h-4" />
              Ir para área Admin — Upload
            </Link>
          </motion.div>
        )}

        {/* Conteúdo principal */}
        {estado === 'ok' && doc && (
          <>
            {/* Grid de diagramas */}
            <NavDiagramas
              secoes={doc.secoes}
              ctx={{ estudo: doc.estudo, livro: livroData?.nome ?? livroId, secao: indice, letra: letraDisplay, referencia: meta ? (meta.vf ? `${parseInt(meta.cap)}:${parseInt(meta.vi)}-${parseInt(meta.vf)}` : `${parseInt(meta.cap)}:${parseInt(meta.vi)}`) : '' }}
            />

            {/* Seções */}
            <div className="mt-2 space-y-5">
              {doc.secoes.map((s, i) => (
                <SecaoCard key={s.num} sec={s} idx={i} ctx={{ estudo: doc.estudo, livro: livroData?.nome ?? livroId, secao: indice, letra: letraDisplay, referencia: meta ? (meta.vf ? `${parseInt(meta.cap)}:${parseInt(meta.vi)}-${parseInt(meta.vf)}` : `${parseInt(meta.cap)}:${parseInt(meta.vi)}`) : '' }} />
              ))}
            </div>

            {/* Footer do arquivo */}
            {metaArq && (
              <div className="mt-8 flex items-center gap-2 opacity-25">
                <FileText className="w-3 h-3" />
                <span className="font-mono text-[10px] tracking-widest">{metaArq}</span>
              </div>
            )}

            {/* Botão flutuante voltar ao grid */}
            <BotaoVoltarNav cor={corHex} />
          </>
        )}

        {/* Voltar */}
        <div className="mt-12">
          <Link to={baseSecao}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15
              text-sm font-black text-white hover:border-brand-blue hover:text-brand-blue
              transition-all duration-200 hover:scale-105 active:scale-95 font-mono uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Voltar para Seção {indice}
          </Link>
        </div>

      </main>
      <Footer />
    </div>
  );
}
