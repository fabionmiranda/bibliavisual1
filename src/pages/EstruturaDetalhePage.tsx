import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, BookOpen, Loader2, AlertCircle, ArrowLeft, ArrowRight, Download } from 'lucide-react';
import { toJpeg } from 'html-to-image';
import Navbar from '../components/Navbar';
import { sanitizarTxt } from '../lib/sanitizarTxt';
import Footer from '../components/Footer';
import { BIBLE_DATA } from '../data/bibleData';
import { BOOK_CONFIG } from './LivroPage';

interface Item {
  num: string;
  ref: string;
  titulo: string;
}

interface BlocoQuiasmo {
  num: number;
  cabecalho: string;
  linhas: string[];
  resumo: string[];
}

interface LinhaQuiasmo {
  tipo: 'simbolo' | 'descricao';
  nivel: number;
  letra?: string;
  ref?: string;
  descricoes: string[];
}

function parsearItens(texto: string): Item[] {
  return texto
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0)
    .map(l => {
      // Formato 1: [01] - ref - titulo
      const m1 = l.match(/^\[(\d+)\]\s*-\s*(.+?)\s*-\s*(.+)$/);
      if (m1) return { num: m1[1], ref: m1[2].trim(), titulo: m1[3].trim() };
      // Formato 2: [01] ref — titulo  (travessão — ou –)
      const m2 = l.match(/^\[(\d+)\]\s+(.+?)\s+[—–]\s+(.+)$/);
      if (m2) return { num: m2[1], ref: m2[2].trim(), titulo: m2[3].trim() };
      // Formato 3: [01] titulo
      const m3 = l.match(/^\[(\d+)\]\s+(.+)$/);
      if (m3) return { num: m3[1], ref: '', titulo: m3[2].trim() };
      return { num: '', ref: '', titulo: l };
    });
}

const RESUMO_RE = /^[A-Z][''‘’]?\s*:/;

function parsearQuiasmos(texto: string): BlocoQuiasmo[] {
  return texto
    .split(/={10,}/)
    .map(b => b.trim())
    .filter(b => b.length > 0)
    .map(b => {
      const linhas = b.split('\n').map(l => l.trimEnd());
      const ci = linhas.findIndex(l => /^\[(\d+)\]/.test(l.trim()));
      if (ci === -1) return null;
      const cab = linhas[ci].trim();
      const num = parseInt(cab.match(/^\[(\d+)\]/)![1], 10);
      const corpo = linhas.slice(ci + 1);
      // Separa linhas de resumo (ex: "A: Apóstolos.") das linhas do diagrama
      const estrutura: string[] = [];
      const resumo: string[] = [];
      for (const l of corpo) {
        const t = l.trim();
        if (RESUMO_RE.test(t)) resumo.push(t);
        else estrutura.push(l);
      }
      return { num, cabecalho: cab, linhas: estrutura, resumo };
    })
    .filter((b): b is BlocoQuiasmo => b !== null && b.num > 0);
}

function ehSimboloQuiasmo(texto: string): boolean {
  const partes = texto.split(' ');
  if (partes.length < 2) return /^[A-Z].{0,3}$/.test(texto);
  return /^[A-Z].{0,3}$/.test(partes[0]) && partes.slice(1).join(' ').startsWith('(');
}

function extrairSimboloRef(texto: string): { letra: string; ref: string } {
  const idx = texto.indexOf(' (');
  if (idx === -1) return { letra: texto.trim(), ref: '' };
  return {
    letra: texto.slice(0, idx).trim(),
    ref: texto.slice(idx).replace(/[()]/g, '').trim(),
  };
}

function agruparLinhas(linhas: string[]): LinhaQuiasmo[] {
  const resultado: LinhaQuiasmo[] = [];
  let atual: LinhaQuiasmo | null = null;
  for (const linha of linhas) {
    const recuo = linha.match(/^(\s+)/)?.[1].length ?? 0;
    const texto = linha.trim();
    if (!texto) continue;
    const nivel = Math.floor(recuo / 4);
    if (ehSimboloQuiasmo(texto)) {
      if (atual) resultado.push(atual);
      const { letra, ref } = extrairSimboloRef(texto);
      atual = { tipo: 'simbolo', nivel, letra, ref, descricoes: [] };
    } else if (atual) {
      atual.descricoes.push(texto);
    }
  }
  if (atual) resultado.push(atual);
  return resultado;
}

const NIVEL_CORES = ['#60a5fa', '#a78bfa', '#34d399', '#fbbf24', '#f472b6', '#38bdf8'];

// ─── helpers devocional visual ────────────────────────────────────────────────
function dataAtual(): string {
  const dias  = ['Domingo','Segunda-feira','Terca-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'];
  const meses = ['janeiro','fevereiro','marco','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  const now   = new Date();
  return `${dias[now.getDay()]}, ${now.getDate()} de ${meses[now.getMonth()]} de ${now.getFullYear()}`;
}

function linhasTextoWA(texto: string): string[] {
  if (!texto.trim()) return [];
  return texto
    .replace(/\.\s+/g, '.\n').replace(/!\s+/g, '!\n').replace(/\?\s+/g, '?\n')
    .split('\n').map(s => s.trim()).filter(s => s.length > 2);
}

function gerarTextoDevocionalQuiasma(quiasmo: BlocoQuiasmo, item: Item, livro: string): string {
  const data = dataAtual();
  const refWA = item.ref.toLowerCase().startsWith(livro.toLowerCase()) ? item.ref : `${livro} ${item.ref}`;
  const L: string[] = [];
  L.push(`${data} - Biblia Visual Expositiva`);
  L.push('');
  L.push(refWA);
  L.push(item.titulo);
  L.push('');
  L.push('Devocional do Quiasma Espelhado:');
  L.push('');
  if (quiasmo.resumo.length > 0) {
    L.push('Estrutura da passagem:');
    L.push('');
    for (const r of quiasmo.resumo) L.push(r);
    L.push('');
  }
  L.push('Reflexao pratica:');
  L.push('');
  for (const l of linhasTextoWA(
    `A estrutura quiastica espelhada de ${refWA} revela a sabedoria de Deus ao organizar Sua Palavra. ` +
    `O centro desta passagem e o ponto de maior enfase teologica. ` +
    `Medite em cada elemento e permita que a Palavra transforme sua caminhada com Cristo.`
  )) L.push(l);
  L.push('');
  L.push('---');
  L.push('Biblia Visual Expositiva');
  L.push('');
  L.push('Deseja receber os devocionais da Biblia Visual Expositiva?');
  L.push('Clique no link e faca parte do nosso CLUBE DA BIBLIA VISUAL EXPOSITIVA:');
  L.push('https://bibliavisual.fabionmiranda.com');
  return L.join('\n');
}

// ─── Card exportável off-screen — vertical Instagram 1080px (capturado como JPG)
function ExportCard({
  exportRef, quiasmo, item, livro, cor,
}: {
  exportRef: React.RefObject<HTMLDivElement>;
  quiasmo: BlocoQuiasmo;
  item: Item;
  livro: string;
  cor: string;
}) {
  const data   = dataAtual();
  const grupos = agruparLinhas(quiasmo.linhas);
  const COR2   = '#a855f7';
  const FF     = 'system-ui,-apple-system,Segoe UI,sans-serif';
  const FM     = 'ui-monospace,SFMono-Regular,Menlo,monospace';
  const W      = 1080;
  const PAD    = 80;
  // evita duplicar o nome do livro quando item.ref já o contém (ex: "Atos 21:1-5")
  const refDisplay = item.ref.toLowerCase().startsWith(livro.toLowerCase())
    ? item.ref
    : `${livro} ${item.ref}`;

  // SVG connections — igual ao DiagramaQuiasmo mas no ExportCard
  const diagContainerRef = useRef<HTMLDivElement>(null);
  const badgeExportRefs  = useRef<(HTMLDivElement | null)[]>([]);
  badgeExportRefs.current = [];
  const [conexoesExport, setConexoesExport] = useState<ConexaoSVG[]>([]);

  useEffect(() => {
    const container = diagContainerRef.current;
    if (!container) return;
    const calc = () => {
      const rect = container.getBoundingClientRect();
      const mapa: Record<string, number[]> = {};
      grupos.forEach((g, i) => {
        const base = baseLetra(g.letra ?? '');
        if (!base) return;
        if (!mapa[base]) mapa[base] = [];
        mapa[base].push(i);
      });
      const novas: ConexaoSVG[] = [];
      Object.values(mapa).forEach(indices => {
        if (indices.length < 2) return;
        for (let k = 0; k < Math.floor(indices.length / 2); k++) {
          const ia = indices[k];
          const ib = indices[indices.length - 1 - k];
          const elA = badgeExportRefs.current[ia];
          const elB = badgeExportRefs.current[ib];
          if (!elA || !elB) return;
          const rA = elA.getBoundingClientRect();
          const rB = elB.getBoundingClientRect();
          const x  = rA.left - rect.left + rA.width / 2;
          const y1 = rA.bottom - rect.top + 6;
          const y2 = rB.top - rect.top - 6;
          if (y2 <= y1) return;
          novas.push({ cor: NIVEL_CORES[Math.min(grupos[ia].nivel, 5)], x, y1, y2 });
        }
      });
      setConexoesExport(novas);
    };
    const t = setTimeout(calc, 120);
    return () => clearTimeout(t);
  }, [grupos]);

  return (
    /* Borda gradiente via padding trick */
    <div style={{
      position: 'fixed', left: '-9999px', top: 0,
      width: W + 'px', boxSizing: 'border-box' as const,
      padding: '3px', borderRadius: '36px',
      background: `linear-gradient(150deg, ${cor} 0%, ${COR2} 50%, ${cor} 100%)`,
      boxShadow: `0 0 120px ${cor}35, 0 0 60px ${COR2}25, inset 0 0 0 1px ${cor}20`,
    }}>
      {/* Card interno */}
      <div ref={exportRef} style={{
        width: '100%', boxSizing: 'border-box' as const,
        minHeight: '1350px',
        borderRadius: '33px',
        background: 'linear-gradient(170deg,#06080e 0%,#0a0d1c 40%,#08060f 75%,#060810 100%)',
        padding: `${PAD}px`,
        fontFamily: FF, color: '#fff',
        overflow: 'hidden', position: 'relative' as const,
        display: 'flex', flexDirection: 'column' as const,
      }}>

        {/* Glows decorativos */}
        <div style={{ position: 'absolute', top: '-120px', left: '-120px', width: '500px', height: '500px', borderRadius: '50%', background: `radial-gradient(circle, ${cor}16 0%, transparent 65%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '35%', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: `radial-gradient(circle, ${COR2}12 0%, transparent 65%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '30%', width: '380px', height: '380px', borderRadius: '50%', background: `radial-gradient(circle, ${cor}10 0%, transparent 65%)`, pointerEvents: 'none' }} />

        {/* Linhas decorativas de canto (circuit-like) */}
        <div style={{ position: 'absolute', top: PAD + 'px', right: PAD + 'px', width: '80px', height: '80px', borderTop: `2px solid ${cor}40`, borderRight: `2px solid ${cor}40`, borderRadius: '0 16px 0 0', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: PAD + 'px', left: PAD + 'px', width: '80px', height: '80px', borderBottom: `2px solid ${COR2}35`, borderLeft: `2px solid ${COR2}35`, borderRadius: '0 0 0 16px', pointerEvents: 'none' }} />

        {/* ── LOGOTIPO ─────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '20px', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `linear-gradient(135deg, ${cor}30, ${COR2}20)`,
              border: `2px solid ${cor}60`,
              boxShadow: `0 0 32px ${cor}40, inset 0 0 16px ${cor}10`,
            }}>
              <span style={{ fontSize: '34px', color: cor, fontFamily: FM, fontWeight: 900, lineHeight: 1 }}>◈</span>
            </div>
            <div>
              <div style={{ fontFamily: FM, fontSize: '20px', fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase' as const, color: '#fff', lineHeight: 1 }}>
                Biblia Visual
              </div>
              <div style={{ fontFamily: FM, fontSize: '15px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: cor, marginTop: '6px' }}>
                Expositiva
              </div>
            </div>
          </div>

          {/* Data */}
          <div style={{ textAlign: 'right' as const }}>
            <div style={{ fontFamily: FM, fontSize: '13px', color: 'rgba(255,255,255,0.32)', letterSpacing: '0.14em', textTransform: 'uppercase' as const, lineHeight: 1.6 }}>
              {data}
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '8px',
              padding: '7px 18px', borderRadius: '999px',
              border: `1.5px solid ${cor}40`, background: `${cor}12`,
              fontFamily: FM, fontSize: '13px', fontWeight: 900,
              color: cor, letterSpacing: '0.18em', textTransform: 'uppercase' as const,
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: cor, display: 'inline-block', boxShadow: `0 0 8px ${cor}` }} />
              {livro}
            </div>
          </div>
        </div>

        {/* Linha divisória luminosa */}
        <div style={{ height: '2px', marginBottom: '52px', background: `linear-gradient(90deg, transparent, ${cor}80, ${COR2}55, transparent)` }} />

        {/* ── REFERÊNCIA + TÍTULO ──────────────────────────────────── */}
        {item.ref && (
          <div style={{
            fontFamily: FM, fontSize: '28px', fontWeight: 900,
            color: cor, marginBottom: '14px', letterSpacing: '0.1em',
            textShadow: `0 0 40px ${cor}70`,
          }}>
            {refDisplay}
          </div>
        )}
        <div style={{
          fontSize: '52px', fontWeight: 900, color: '#fff',
          textTransform: 'uppercase' as const, letterSpacing: '-0.03em',
          lineHeight: 1.05, marginBottom: '44px',
        }}>
          {item.titulo}
        </div>

        {/* ── BADGE ────────────────────────────────────────────────── */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '14px',
          padding: '10px 24px', borderRadius: '999px',
          border: `2px solid ${cor}50`, background: `${cor}14`,
          fontFamily: FM, fontSize: '13px', fontWeight: 900,
          color: cor, textTransform: 'uppercase' as const,
          letterSpacing: '0.3em', marginBottom: '20px',
          boxShadow: `0 0 24px ${cor}22`,
          alignSelf: 'flex-start' as const,
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: cor, display: 'inline-block', boxShadow: `0 0 10px ${cor}` }} />
          Estrutura Quiastica Espelhada
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: cor, display: 'inline-block', boxShadow: `0 0 10px ${cor}` }} />
        </div>

        <div style={{ fontFamily: FM, fontSize: '15px', color: 'rgba(255,255,255,0.40)', letterSpacing: '0.1em', marginBottom: '32px', fontWeight: 700 }}>
          {quiasmo.cabecalho}
        </div>

        {/* ── DIAGRAMA ─────────────────────────────────────────────── */}
        <div style={{
          borderRadius: '22px',
          border: '1.5px solid rgba(255,255,255,0.08)',
          background: 'linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))',
          padding: '36px 40px',
          marginBottom: '36px',
          flex: 1,
          position: 'relative',
        }}>
          {/* SVG de conexão entre letras espelhadas */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
            {conexoesExport.map((c, i) => (
              <g key={i}>
                {/* Linha tracejada */}
                <line
                  x1={c.x} y1={c.y1} x2={c.x} y2={c.y2}
                  stroke={c.cor} strokeWidth={2.5} strokeDasharray="7 5"
                  strokeOpacity={0.55}
                  style={{ filter: `drop-shadow(0 0 5px ${c.cor})` }}
                />
                {/* Dot superior */}
                <circle cx={c.x} cy={c.y1} r={4} fill={c.cor} fillOpacity={0.8}
                  style={{ filter: `drop-shadow(0 0 4px ${c.cor})` }} />
                {/* Dot inferior */}
                <circle cx={c.x} cy={c.y2} r={4} fill={c.cor} fillOpacity={0.8}
                  style={{ filter: `drop-shadow(0 0 4px ${c.cor})` }} />
              </g>
            ))}
          </svg>

          {/* Linhas do diagrama */}
          <div ref={diagContainerRef} style={{ position: 'relative', zIndex: 1 }}>
            {grupos.map((g, i) => {
              const c     = NIVEL_CORES[Math.min(g.nivel, 5)];
              const ind   = g.nivel * 44;
              const prime = temPrime(g.letra ?? '');
              return (
                <div key={i} style={{ paddingLeft: ind + 'px' }}>
                  <div style={{
                    display: 'flex', alignItems: 'flex-start', gap: '22px',
                    padding: '18px 0',
                    borderBottom: i < grupos.length - 1 ? '1px solid rgba(255,255,255,0.055)' : 'none',
                  }}>
                    {/* Badge letra */}
                    <div
                      ref={el => { badgeExportRefs.current[i] = el; }}
                      style={{
                        width: '62px', height: '62px', borderRadius: '16px', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: FM, fontWeight: 900, fontSize: '24px',
                        color: c,
                        border: `2px solid ${c}${prime ? 'AA' : '70'}`,
                        background: `${c}${prime ? '30' : '1C'}`,
                        boxShadow: prime ? `0 0 18px ${c}55` : `0 0 8px ${c}20`,
                      }}>
                      {g.letra}
                    </div>
                    {/* Texto */}
                    <div style={{ flex: 1, paddingTop: '4px' }}>
                      {g.ref && (
                        <div style={{ fontFamily: FM, fontSize: '17px', fontWeight: 900, color: c, marginBottom: '6px', letterSpacing: '0.08em' }}>
                          {g.ref}
                        </div>
                      )}
                      {g.descricoes.map((d, j) => (
                        <div key={j} style={{ fontSize: '20px', color: 'rgba(241,245,249,0.90)', lineHeight: 1.55 }}>
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RESUMO ───────────────────────────────────────────────── */}
        {quiasmo.resumo.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '12px', marginBottom: '44px' }}>
            {quiasmo.resumo.map((linha, i) => {
              const c = NIVEL_CORES[i % NIVEL_CORES.length];
              const m = linha.match(/^([A-Z]['''']?)\s*:\s*(.+)$/);
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 20px', borderRadius: '14px',
                  border: `1.5px solid ${c}45`, background: `${c}12`,
                }}>
                  {m && (
                    <span style={{
                      fontFamily: FM, fontWeight: 900, fontSize: '15px', color: c,
                      background: `${c}22`, border: `1.5px solid ${c}55`,
                      borderRadius: '8px', width: '36px', height: '36px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 0 10px ${c}35`,
                    }}>{m[1]}</span>
                  )}
                  <span style={{ fontSize: '17px', color: 'rgba(255,255,255,0.82)', fontWeight: 500 }}>
                    {m ? m[2] : linha}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* ── RODAPÉ ───────────────────────────────────────────────── */}
        <div>
          <div style={{ height: '1.5px', marginBottom: '28px', background: `linear-gradient(90deg, ${cor}70, ${COR2}50, transparent)` }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '22px', color: cor, fontFamily: FM, fontWeight: 900, textShadow: `0 0 12px ${cor}` }}>◈</span>
              <div>
                <div style={{ fontFamily: FM, fontSize: '14px', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.60)' }}>
                  Biblia Visual
                </div>
                <div style={{ fontFamily: FM, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: cor, fontWeight: 700 }}>
                  Expositiva
                </div>
              </div>
            </div>

            {/* URL pill futurista */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 24px', borderRadius: '999px',
              border: `1.5px solid ${cor}45`,
              background: `linear-gradient(90deg, ${cor}12, ${COR2}0C)`,
              boxShadow: `0 0 28px ${cor}20`,
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: cor, display: 'inline-block', boxShadow: `0 0 10px ${cor}` }} />
              <span style={{ fontFamily: FM, fontSize: '16px', fontWeight: 700, color: cor, letterSpacing: '0.04em' }}>
                bibliavisual.fabionmiranda.com
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

function temPrime(letra: string) {
  return letra.includes("'") || letra.charCodeAt(1) === 0x2019 || letra.charCodeAt(1) === 0x2018;
}

function baseLetra(letra: string) {
  return letra.replace(/[^A-Z0-9]/g, '');
}

function slugLetra(letra: string): string {
  // A -> a, A' -> a-prime, B1 -> b1
  return letra
    .toLowerCase()
    .replace(/'/g, '-prime')
    .replace(/[^a-z0-9-]/g, '');
}

interface ConexaoSVG { cor: string; x: number; y1: number; y2: number }

function DiagramaQuiasmo({ linhas, resumo, basePath, key: _ }: { linhas: string[]; resumo: string[]; basePath: string; key?: number }) {
  const grupos = agruparLinhas(linhas);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [conexoes, setConexoes] = useState<ConexaoSVG[]>([]);

  badgeRefs.current = [];

  const calcular = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const mapa: Record<string, number[]> = {};
    grupos.forEach((g, i) => {
      const base = baseLetra(g.letra ?? '');
      if (!base) return;
      if (!mapa[base]) mapa[base] = [];
      mapa[base].push(i);
    });
    const novas: ConexaoSVG[] = [];
    Object.values(mapa).forEach(indices => {
      if (indices.length < 2) return;
      for (let k = 0; k < Math.floor(indices.length / 2); k++) {
        const ia = indices[k];
        const ib = indices[indices.length - 1 - k];
        const elA = badgeRefs.current[ia];
        const elB = badgeRefs.current[ib];
        if (!elA || !elB) return;
        const rA = elA.getBoundingClientRect();
        const rB = elB.getBoundingClientRect();
        const x  = rA.left - rect.left + rA.width / 2;
        const y1 = rA.bottom - rect.top + 4;
        const y2 = rB.top - rect.top - 4;
        if (y2 <= y1) return;
        novas.push({ cor: NIVEL_CORES[Math.min(grupos[ia].nivel, 5)], x, y1, y2 });
      }
    });
    setConexoes(novas);
  }, [grupos]);

  useEffect(() => {
    const t = setTimeout(calcular, 80);
    window.addEventListener('resize', calcular);
    return () => { clearTimeout(t); window.removeEventListener('resize', calcular); };
  }, [calcular]);

  return (
    <div ref={containerRef} className="relative">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <style>{`
            @keyframes qpulse { 0%,100%{opacity:.2} 50%{opacity:.8} }
          `}</style>
        </defs>
        {conexoes.map((c, i) => (
          <line key={i} x1={c.x} y1={c.y1} x2={c.x} y2={c.y2}
            stroke={c.cor} strokeWidth={2} strokeDasharray="5 4"
            style={{
              filter: `drop-shadow(0 0 4px ${c.cor})`,
              animation: `qpulse ${2.2 + i * 0.25}s ease-in-out infinite`,
            }}
          />
        ))}
      </svg>

      <div className="relative" style={{ zIndex: 1 }}>
        {grupos.map((g, i) => {
          const cor = NIVEL_CORES[Math.min(g.nivel, 5)];
          const indent = g.nivel * 40;
          const espelho = temPrime(g.letra ?? '');
          const href = `${basePath}/${slugLetra(g.letra ?? String(i))}`;
          return (
            <div
              key={i}
              onClick={() => navigate(href)}
              className="group flex items-start gap-4 sm:gap-5 py-4 border-b border-white/[0.06] last:border-0
                cursor-pointer rounded-xl transition-all duration-200
                hover:bg-white/[0.03] hover:border-white/10 -mx-3 px-3"
              style={{ paddingLeft: indent + 12 }}
            >
              <div
                ref={el => { badgeRefs.current[i] = el; }}
                className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center
                  font-mono font-black text-base sm:text-lg border transition-all duration-200
                  group-hover:scale-110"
                style={{
                  color: cor,
                  borderColor: cor + (espelho ? '90' : '60'),
                  background: cor + (espelho ? '28' : '15'),
                  boxShadow: espelho ? `0 0 12px ${cor}44` : 'none',
                }}
              >
                {g.letra}
              </div>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-6 min-w-0 py-1">
                {g.ref && (
                  <span className="shrink-0 font-mono text-sm sm:text-base font-black whitespace-nowrap"
                    style={{ color: cor }}>
                    {g.ref}
                  </span>
                )}
                <div className="flex flex-col gap-1 flex-1">
                  {g.descricoes.map((d, j) => (
                    <span key={j}
                      className={`text-base sm:text-lg leading-snug ${d.startsWith('"') ? 'italic' : ''}`}
                      style={{ color: '#f1f5f9ee' }}>
                      {d}
                    </span>
                  ))}
                </div>
                <span
                  className="shrink-0 self-center text-xs sm:text-sm font-black uppercase tracking-wider
                    font-mono whitespace-nowrap px-3 py-1.5 rounded-lg border transition-all duration-200
                    group-hover:scale-105"
                  style={{
                    color: cor,
                    borderColor: cor + '50',
                    background: cor + '12',
                    boxShadow: `0 0 10px ${cor}20`,
                  }}
                >
                  Ver Diagramas →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {resumo.length > 0 && (
        <div className="mt-8 pt-6 border-t border-white/[0.08]">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/35 font-black mb-4">
            Resumo dos Elementos
          </p>
          <div className="flex flex-wrap gap-3">
            {resumo.map((linha, i) => {
              const col = NIVEL_CORES[i % NIVEL_CORES.length];
              const match = linha.match(/^([A-Z]['''']?)\s*:\s*(.+)$/);
              const sigla = match ? match[1] : '';
              const texto = match ? match[2] : linha;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border"
                  style={{
                    borderColor: col + '40',
                    background: col + '10',
                  }}
                >
                  {sigla && (
                    <span
                      className="font-mono font-black text-sm shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border"
                      style={{ color: col, borderColor: col + '55', background: col + '20', boxShadow: `0 0 8px ${col}30` }}
                    >
                      {sigla}
                    </span>
                  )}
                  <span className="text-sm text-white/80 font-medium leading-snug">{texto}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function EstruturaDetalhePage() {
  const { livro: livroId = '', indice = '1' } = useParams<{ livro: string; indice: string }>();
  const idx = parseInt(indice, 10); // 1-based

  const livroData  = BIBLE_DATA.livros.find(l => l.id === livroId);
  const testamento = livroData?.testamento ?? 'AT';
  const cfg        = BOOK_CONFIG[livroId];
  const Icone      = cfg?.icon ?? BookOpen;
  const corHex     = testamento === 'AT' ? '#60a5fa' : '#fb7185';
  const urlEstrutura = `/admin/${testamento}/${livroId}/estrutura.txt`;
  const urlQuiasmo   = `/admin/${testamento}/${livroId}/quiastico.txt`;
  const base         = `/${livroId}/estrutura`;

  const exportRef = useRef<HTMLDivElement>(null);
  const [gerando, setGerando] = useState(false);

  type Estado = 'carregando' | 'ok' | 'erro';
  const [estado,   setEstado]   = useState<Estado>('carregando');
  const [itens,    setItens]    = useState<Item[]>([]);
  const [quiasmos, setQuiasmos] = useState<BlocoQuiasmo[]>([]);

  useEffect(() => {
    setEstado('carregando');
    Promise.all([
      fetch(urlEstrutura).then(r => r.ok ? r.text() : Promise.reject()),
      fetch(urlQuiasmo).then(r => r.ok ? r.text() : ''),
    ])
      .then(([rawEst, rawQ]) => {
        const txtEst = sanitizarTxt(rawEst);
        const txtQ   = rawQ ? sanitizarTxt(rawQ) : '';
        setItens(parsearItens(txtEst));
        if (txtQ) setQuiasmos(parsearQuiasmos(txtQ));
        setEstado('ok');
      })
      .catch(() => setEstado('erro'));
  }, [urlEstrutura, urlQuiasmo]);

  useEffect(() => { window.scrollTo(0, 0); }, [idx]);

  const item    = itens[idx - 1] ?? null; // idx is 1-based, array is 0-based
  const total   = itens.length;
  const numSec  = item?.num ? parseInt(item.num, 10) : idx;
  const quiasmo = quiasmos.find(q => q.num === numSec) ?? null;

  const podePrev  = idx > 1;
  const podeProx  = total > 0 && idx < total;

  async function gerarDevocionaVisual() {
    if (!exportRef.current || !quiasmo || !item) return;
    setGerando(true);
    try {
      // render twice — first pass warms fonts/SVG, second is the real capture
      await toJpeg(exportRef.current, { quality: 0.96, pixelRatio: 2 });
      const dataUrl = await toJpeg(exportRef.current, { quality: 0.96, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `devocional-${livroId}-secao-${idx}.jpg`;
      link.href = dataUrl;
      link.click();
      const texto = gerarTextoDevocionalQuiasma(quiasmo, item, livroData?.nome ?? livroId);
      setTimeout(() => window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank', 'noopener,noreferrer'), 600);
    } catch (e) { console.error(e); }
    finally { setGerando(false); }
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-deep text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/60 mb-12 flex-wrap font-mono">
          <Link to="/biblioteca" className="hover:text-brand-blue transition-colors font-bold">Biblioteca</Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          <Link to={base} className="hover:text-brand-blue transition-colors font-bold text-white/80">
            {livroData?.nome ?? livroId}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          <span className="text-brand-blue/80">{item?.ref ?? `Secao ${idx}`}</span>
        </nav>

        {estado === 'carregando' && (
          <div className="flex items-center justify-center py-40">
            <Loader2 className="w-7 h-7 animate-spin text-white/20" />
          </div>
        )}

        {estado === 'erro' && (
          <div className="flex flex-col items-center gap-4 py-40 text-center">
            <AlertCircle className="w-10 h-10 text-white/40" />
            <p className="text-white/70 font-bold font-mono">Nao foi possivel carregar o conteudo.</p>
            <Link to={base} className="text-sm text-brand-blue hover:text-white transition-colors font-bold">Voltar</Link>
          </div>
        )}

        {estado === 'ok' && item && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

            {/* Cabecalho */}
            <div className="flex items-start sm:items-center justify-between gap-4 mb-10 flex-wrap">
              <div className="flex items-center gap-4">
                {cfg && (
                  <div className={`p-3.5 rounded-xl bg-gradient-to-br ${cfg.grad} border border-white/10 shadow-xl shrink-0`}>
                    <Icone className="w-8 h-8 text-white/90" strokeWidth={1.2} />
                  </div>
                )}
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-brand-blue font-black mb-0.5">
                    {livroData?.nome ?? livroId}
                  </p>
                  <p className="font-mono text-sm font-bold text-white/80">
                    Secao {String(idx).padStart(2, '0')} de {String(total).padStart(2, '0')}
                  </p>
                </div>
              </div>

              {/* Botao Devocional Visual para Download */}
              {quiasmo && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={gerarDevocionaVisual}
                  disabled={gerando}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl font-black uppercase tracking-wider text-xs sm:text-sm
                    transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed
                    whitespace-nowrap shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${corHex}20, ${corHex}0C)`,
                    border: `1.5px solid ${corHex}55`,
                    color: corHex,
                    boxShadow: `0 0 22px ${corHex}22`,
                  }}
                >
                  {gerando
                    ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    : <Download className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />}
                  {gerando ? 'Gerando...' : 'Devocional Visual'}
                </motion.button>
              )}
            </div>

            {item.ref && (
              <p className="font-mono text-base sm:text-lg font-bold mb-3 tracking-wide" style={{ color: corHex }}>{item.ref}</p>
            )}

            <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter leading-none text-white mb-12">
              {item.titulo}
            </h1>

            {/* Quiasmo */}
            {quiasmo ? (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border"
                    style={{ color: corHex, borderColor: corHex + '40', background: corHex + '12' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: corHex }} />
                    Estrutura Quiastica Espelhada
                  </div>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                <p className="font-mono text-xs sm:text-sm text-white/70 mb-8 tracking-wide font-bold">{quiasmo.cabecalho}</p>

                <div className="rounded-2xl border border-white/[0.08] p-6 sm:p-10 overflow-x-auto"
                  style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))' }}>
                  <DiagramaQuiasmo key={numSec} linhas={quiasmo.linhas} resumo={quiasmo.resumo} basePath={`${base}/${idx}`} />
                </div>
              </motion.div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
                <p className="text-white/50 text-sm uppercase tracking-widest font-bold font-mono">Quiasma Espelhado nao disponivel</p>
              </div>
            )}

            {/* ExportCard off-screen */}
            {quiasmo && item && (
              <ExportCard exportRef={exportRef} quiasmo={quiasmo} item={item} livro={livroData?.nome ?? livroId} cor={corHex} />
            )}

            {/* Navegacao */}
            <div className="flex items-center justify-between mt-16 gap-3">

              {podePrev ? (
                <Link to={`${base}/${idx - 1}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30
                    text-sm font-black text-white hover:border-brand-blue hover:text-brand-blue
                    transition-all duration-200 hover:scale-105 active:scale-95 font-mono uppercase tracking-wider">
                  <ArrowLeft className="w-4 h-4" /> Anterior
                </Link>
              ) : (
                <span className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10
                  text-sm font-black text-white/25 cursor-not-allowed select-none font-mono uppercase tracking-wider">
                  <ArrowLeft className="w-4 h-4" /> Anterior
                </span>
              )}

              <Link to={base}
                className="px-6 py-3 rounded-xl border border-brand-blue/40 text-xs uppercase
                  tracking-widest font-black text-brand-blue hover:bg-brand-blue/10 hover:border-brand-blue
                  transition-all duration-200 hover:scale-105 active:scale-95 font-mono">
                Ver todas
              </Link>

              {podeProx ? (
                <Link to={`${base}/${idx + 1}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30
                    text-sm font-black text-white hover:border-brand-blue hover:text-brand-blue
                    transition-all duration-200 hover:scale-105 active:scale-95 font-mono uppercase tracking-wider">
                  Proxima <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10
                  text-sm font-black text-white/25 cursor-not-allowed select-none font-mono uppercase tracking-wider">
                  Proxima <ArrowRight className="w-4 h-4" />
                </span>
              )}

            </div>

          </motion.div>
        )}

      </main>
      <Footer />
    </div>
  );
}
