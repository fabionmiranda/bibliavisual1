import type { CSSProperties, ReactNode } from 'react';

/* Kit visual das aulas de Teologia Política.
   Marcadores de ênfase: **x** verdade central (dourado) · [[x]] texto bíblico (azul, itálico)
   !!x!! alerta (rosa) · ++x++ aplicação (verde). Sobrescritos ¹²³… viram links para #nota-N. */

export const BG = '#060d1f';
export const GOLD = '#fbbf24';
export const SKY = '#7dd3fc';
export const ROSE = '#fb7185';
export const GREEN = '#34d399';
export const BLUE = '#60a5fa';
export const PURPLE = '#c084fc';
export const RED = '#f87171';

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const supParaNum = (s: string) => Number([...s].map(ch => SUP.indexOf(ch)).join(''));

export function Rico({ t }: { t: string }) {
  const partes = t.split(/(\*\*.+?\*\*|\[\[.+?\]\]|!!.+?!!|\+\+.+?\+\+|[⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g).filter(Boolean);
  return (
    <>
      {partes.map((p, i) => {
        if (p.startsWith('**')) return <strong key={i} style={{ color: GOLD, fontWeight: 800 }}>{p.slice(2, -2)}</strong>;
        if (p.startsWith('[[')) return <em key={i} style={{ color: SKY, fontWeight: 600 }}>{p.slice(2, -2)}</em>;
        if (p.startsWith('!!')) return <strong key={i} style={{ color: ROSE, fontWeight: 800 }}>{p.slice(2, -2)}</strong>;
        if (p.startsWith('++')) return <strong key={i} style={{ color: GREEN, fontWeight: 800 }}>{p.slice(2, -2)}</strong>;
        if (/^[⁰¹²³⁴⁵⁶⁷⁸⁹]+$/.test(p)) {
          const n = supParaNum(p);
          return <a key={i} href={`#nota-${n}`} style={{ color: GOLD, fontWeight: 800, fontSize: '0.72em', verticalAlign: 'super', textDecoration: 'none', marginLeft: 1 }}>{n}</a>;
        }
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

export const txt: CSSProperties = { margin: 0, fontSize: 'clamp(17px,1.9vw,19.5px)', lineHeight: 1.8, color: 'rgba(230,238,255,0.92)' };

export function P({ children }: { children: string }) {
  return <p style={txt}><Rico t={children} /></p>;
}

export function Lista({ itens, cor, num }: { itens: string[]; cor: string; num?: boolean }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {itens.map((it, i) => (
        <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span style={{ flexShrink: 0, minWidth: num ? 28 : 12, height: num ? 28 : 'auto', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: num ? 2 : 0, fontWeight: 900, fontSize: num ? 15 : 18, color: num ? '#0a0f1e' : cor, background: num ? cor : 'transparent' }}>{num ? i + 1 : '▸'}</span>
          <span style={txt}><Rico t={it} /></span>
        </li>
      ))}
    </ul>
  );
}

export function Rotulo({ cor, children }: { cor: string; children: ReactNode }) {
  return <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(13px,1.5vw,15px)', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: cor, margin: '8px 0 12px' }}>{children}</div>;
}

export function Caixa({ cor, children, style }: { cor: string; children: ReactNode; style?: CSSProperties }) {
  return <div style={{ padding: 'clamp(16px,2.5vw,22px)', borderRadius: 16, background: `${cor}10`, border: `1px solid ${cor}35`, ...style }}>{children}</div>;
}

export function Versiculo({ cor, texto, refe }: { cor: string; texto: string; refe: string }) {
  return (
    <div style={{ padding: 'clamp(18px,3vw,26px)', borderRadius: 16, background: `linear-gradient(135deg, ${cor}1c, ${cor}06)`, borderLeft: `5px solid ${cor}` }}>
      <p style={{ margin: 0, fontFamily: 'var(--font-garamond)', fontStyle: 'italic', fontSize: 'clamp(22px,2.8vw,28px)', lineHeight: 1.55, color: '#fff' }}>“{texto}”</p>
      <div style={{ marginTop: 10, fontWeight: 800, fontSize: 'clamp(15px,1.7vw,17px)', color: cor }}>— {refe}</div>
    </div>
  );
}

export function Tabela({ cor, cab, linhas }: { cor: string; cab: string[]; linhas: string[][] }) {
  return (
    <div style={{ overflowX: 'auto', borderRadius: 14, border: `1px solid ${cor}35` }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
        <thead>
          <tr>{cab.map(h => <th key={h} style={{ textAlign: 'left', padding: '12px 14px', background: `${cor}22`, color: cor, fontSize: 'clamp(14px,1.6vw,16px)', fontWeight: 800, letterSpacing: '0.04em' }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {linhas.map((l, i) => (
            <tr key={i} style={{ background: i % 2 ? 'rgba(255,255,255,0.025)' : 'transparent' }}>
              {l.map((c, j) => <td key={j} style={{ padding: '12px 14px', borderTop: `1px solid ${cor}1f`, verticalAlign: 'top', fontSize: 'clamp(15.5px,1.7vw,17px)', lineHeight: 1.6, color: j === 0 ? '#fff' : 'rgba(230,238,255,0.9)', fontWeight: j === 0 ? 700 : 400 }}><Rico t={c} /></td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Secao({ id, num, cor, titulo, sub, children }: { id: string; num: string; cor: string; titulo: string; sub?: string; children: ReactNode }) {
  return (
    <section id={id} style={{ scrollMarginTop: 90, marginBottom: 'clamp(28px,4vw,40px)', borderRadius: 22, overflow: 'hidden', background: 'linear-gradient(170deg, rgba(14,24,52,0.92), rgba(6,12,30,0.96))', border: `1px solid ${cor}35`, boxShadow: `0 14px 50px rgba(0,0,0,0.35)` }}>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${cor}, ${cor}20)` }} />
      <div style={{ padding: 'clamp(22px,3.5vw,38px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: sub ? 6 : 22, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: '#0a0f1e', background: cor, padding: '4px 10px', borderRadius: 8 }}>{num}</span>
          <h2 style={{ margin: 0, fontSize: 'clamp(24px,3.2vw,34px)', fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>{titulo}</h2>
        </div>
        {sub && <p style={{ ...txt, color: cor, fontWeight: 700, marginBottom: 22 }}>{sub}</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>{children}</div>
      </div>
    </section>
  );
}

export function Caso({ n, titulo, children, provocar, fonte }: { n: number; titulo: string; children: ReactNode; provocar: string; fonte: string }) {
  return (
    <div style={{ borderRadius: 18, border: `1.5px dashed ${PURPLE}70`, background: `linear-gradient(135deg, ${PURPLE}14, rgba(6,12,30,0.6))`, padding: 'clamp(18px,3vw,26px)', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', color: '#0a0f1e', background: PURPLE, padding: '4px 10px', borderRadius: 8 }}>⚖️ CASO EM DEBATE {n}</span>
      </div>
      <h3 style={{ margin: 0, fontSize: 'clamp(20px,2.5vw,25px)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}><Rico t={titulo} /></h3>
      {children}
      <div style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(0,0,0,0.3)', borderLeft: `4px solid ${GOLD}` }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', color: GOLD, marginBottom: 6 }}>💬 PARA PROVOCAR</div>
        <p style={txt}><Rico t={provocar} /></p>
      </div>
      <div style={{ fontSize: 'clamp(13.5px,1.5vw,15px)', color: 'rgba(220,230,255,0.7)', fontStyle: 'italic' }}>Fonte: {fonte}</div>
    </div>
  );
}

