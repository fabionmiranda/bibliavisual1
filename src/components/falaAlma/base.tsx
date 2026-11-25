import { createContext, useCallback, useContext, useMemo, useState, type CSSProperties, type ReactNode } from 'react';

/* ─── Identidade BíbliaVisual ─────────────────────────────────────────────── */
export const C = {
  fundo: '#0A1628',
  fundo2: '#0C1B31',
  cartao: '#0F2038',
  cartao2: '#14294A',
  borda: 'rgba(0,229,255,0.16)',
  bordaForte: 'rgba(0,229,255,0.38)',
  ciano: '#00E5FF',
  cianoSuave: 'rgba(0,229,255,0.10)',
  dourado: '#D4AF37',
  douradoSuave: 'rgba(212,175,55,0.12)',
  texto: '#EAF2FF',
  textoSuave: 'rgba(214,226,246,0.86)',
  textoFraco: 'rgba(214,226,246,0.68)',
  vida: '#4ADE80',
  selah: '#A78BFA',
  colheita: '#F59E0B',
};
/* Mesma fonte do Devocional Familiar: a fonte base do site (Space Grotesk), nítida em qualquer tela. */
export const SERIFA = "'Space Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif";
export const SANS = "'Space Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif";
/** Rótulos, números, abas e datas */
export const DISPLAY = SERIFA;
/** Títulos */
export const TITULO = SERIFA;
export const TITULO_DEC = SERIFA;

export const COR_TIPO = { devocional: C.ciano, selah: C.selah, colheita: C.colheita, selah_bonus: C.selah } as const;

/* ─── localStorage com try/catch ──────────────────────────────────────────── */
export function lerLocal<T>(chave: string, padrao: T): T {
  try {
    const v = localStorage.getItem(chave);
    return v ? (JSON.parse(v) as T) : padrao;
  } catch { return padrao; }
}
export function gravarLocal(chave: string, valor: unknown) {
  try { localStorage.setItem(chave, JSON.stringify(valor)); } catch { /* armazenamento indisponível */ }
}

/* ─── Dados do usuário (seção 4.3): locais, por data "MM-DD" ──────────────── */
export type Caderno = { sentiu: string; pensou: string; deus_falou: string };
export type Preferencias = { tamanho_fonte: number; trilha_semana_santa: boolean; ritmo: 'calendario' | 'meu_ritmo' };

interface DadosUsuario {
  respostas: Record<string, Record<number, string>>;
  caderno: Record<string, Caderno>;
  concluidos: string[];
  ancoras: Record<number, string>;
  colheita: Record<number, string>;
  preferencias: Preferencias;
}

const PREF_PADRAO: Preferencias = { tamanho_fonte: 1, trilha_semana_santa: false, ritmo: 'calendario' };

function carregar(): DadosUsuario {
  return {
    respostas: lerLocal('falaAlma:respostas', {}),
    caderno: lerLocal('falaAlma:caderno', {}),
    concluidos: lerLocal('falaAlma:concluidos', []),
    ancoras: lerLocal('falaAlma:ancoras', {}),
    colheita: lerLocal('falaAlma:colheita', {}),
    preferencias: { ...PREF_PADRAO, ...lerLocal('falaAlma:preferencias', {}) },
  };
}

function useDadosUsuarioInterno() {
  const [dados, setDados] = useState<DadosUsuario>(carregar);
  const atualizar = useCallback(<K extends keyof DadosUsuario>(chave: K, fn: (v: DadosUsuario[K]) => DadosUsuario[K]) => {
    setDados(d => {
      const novo = fn(d[chave]);
      gravarLocal(`falaAlma:${chave}`, novo);
      return { ...d, [chave]: novo };
    });
  }, []);

  return useMemo(() => ({
    ...dados,
    concluidosSet: new Set(dados.concluidos),
    setResposta: (data: string, fase: number, texto: string) =>
      atualizar('respostas', r => ({ ...r, [data]: { ...(r[data] ?? {}), [fase]: texto } })),
    setCaderno: (data: string, campo: keyof Caderno, texto: string) =>
      atualizar('caderno', c => ({ ...c, [data]: { sentiu: '', pensou: '', deus_falou: '', ...(c[data] ?? {}), [campo]: texto } })),
    alternarConcluido: (data: string) =>
      atualizar('concluidos', l => (l.includes(data) ? l.filter(d => d !== data) : [...l, data].sort())),
    setAncora: (mes: number, texto: string) => atualizar('ancoras', a => ({ ...a, [mes]: texto })),
    setColheita: (mes: number, texto: string) => atualizar('colheita', a => ({ ...a, [mes]: texto })),
    setPreferencia: <K extends keyof Preferencias>(k: K, v: Preferencias[K]) => atualizar('preferencias', p => ({ ...p, [k]: v })),
  }), [dados, atualizar]);
}

export type DadosUsuarioApi = ReturnType<typeof useDadosUsuarioInterno>;
const Ctx = createContext<DadosUsuarioApi | null>(null);

export function ProvedorFalaAlma({ children }: { children: ReactNode }) {
  const api = useDadosUsuarioInterno();
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
export function useUsuario() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useUsuario fora do ProvedorFalaAlma');
  return v;
}
/** Escala de fonte (A+/A−) aplicada a um tamanho em px. */
export function useFs() {
  const { preferencias } = useUsuario();
  return (px: number) => Math.round(px * preferencias.tamanho_fonte);
}

/* ─── Peças visuais comuns ────────────────────────────────────────────────── */
export const botaoPrimario: CSSProperties = {
  minHeight: 50, padding: '0 22px', borderRadius: 14, fontSize: 16, fontWeight: 800, fontFamily: SANS, cursor: 'pointer',
  color: C.fundo, background: C.ciano, border: `1px solid ${C.ciano}`, boxShadow: '0 8px 24px rgba(0,229,255,0.18)',
};
export const botaoSecundario: CSSProperties = {
  minHeight: 46, padding: '0 20px', borderRadius: 14, fontSize: 16, fontWeight: 700, fontFamily: SANS, cursor: 'pointer',
  color: C.ciano, background: C.cianoSuave, border: '1px solid rgba(0,229,255,0.40)',
};
export const rotuloCaixaAlta = (cor: string): CSSProperties => ({
  fontFamily: DISPLAY, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: cor,
});

export function TituloSecao({ icone, titulo }: { icone: string; titulo: string }) {
  return (
    <h3 style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: TITULO, fontSize: 24, fontWeight: 900, letterSpacing: '-0.01em', margin: '0 0 14px', color: C.texto }}>
      <span aria-hidden style={{ fontSize: 24 }}>{icone}</span>{titulo}
      <span aria-hidden style={{ flex: 1, height: 1, marginLeft: 6, background: `linear-gradient(90deg, ${C.bordaForte}, transparent)` }} />
    </h3>
  );
}

export function Cartao({ children, style, cor = C.borda }: { children: ReactNode; style?: CSSProperties; cor?: string }) {
  return <section style={{ padding: '20px 18px', borderRadius: 20, background: C.cartao, border: `1px solid ${cor}`, ...style }}>{children}</section>;
}

export function CampoTexto({ valor, onMudar, linhas = 3, rotulo, placeholder = 'Escreva aqui, com suas palavras...' }: {
  valor: string; onMudar: (t: string) => void; linhas?: number; rotulo?: string; placeholder?: string;
}) {
  const fs = useFs();
  return (
    <textarea
      value={valor} onChange={e => onMudar(e.target.value)} rows={linhas} placeholder={placeholder} aria-label={rotulo}
      style={{
        width: '100%', boxSizing: 'border-box', resize: 'vertical', padding: '12px 14px', borderRadius: 12,
        fontSize: fs(17), lineHeight: 1.55, fontFamily: SANS, color: C.texto,
        background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(0,229,255,0.28)', outline: 'none',
      }}
    />
  );
}

export function LinkLeitura({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ ...botaoSecundario, display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
      {children} <span aria-hidden>↗</span>
    </a>
  );
}

/** Esconde visualmente, mas mantém para leitores de tela. */
export function SoLeitor({ children }: { children: ReactNode }) {
  return <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>{children}</span>;
}
