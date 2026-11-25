import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import {
  type ConteudoDia, type EntradaPlano, type FaseConteudo, type FalaConteudo,
  MESES, amanhaDe, estacaoDe, leituraExtenso, linkLeitura, mesIndice, rotuloData, NOTA_CUIDADO,
} from '../../data/falaAlma';
import {
  C, SERIFA, SANS, DISPLAY, TITULO, botaoPrimario, botaoSecundario, rotuloCaixaAlta, useFs, useUsuario,
  TituloSecao, CampoTexto, LinkLeitura, SoLeitor, type Caderno,
} from './base';
import { Compartilhar } from './Compartilhar';

/* ─── Markdown simples: *itálico* e **negrito**; citação bíblica em dourado ──
   Uma citação é um *"trecho entre aspas"* seguido de referência — (v.3), (Jo 15.5) —
   ou anunciada com "diz:". Aspas em itálico sem isso (pensamentos, falas) ficam só em itálico. */
const RE_ITALICO = /(?<!\*)\*(?!\*)((?:\*\*[^*]+?\*\*|[^*])+?)(?<!\*)\*(?!\*)/g;
const RE_REF = /^(\s*)\(([^)]*\d[^)]*)\)/;

function Negrito({ texto }: { texto: string }) {
  return <>{texto.split(/(\*\*[^*]+?\*\*)/g).map((p, i) =>
    p.startsWith('**') && p.endsWith('**') && p.length > 4
      ? <strong key={i} style={{ fontWeight: 800 }}>{p.slice(2, -2)}</strong>
      : <span key={i}>{p}</span>)}</>;
}

export function Rico({ texto }: { texto: string }) {
  const nos: ReactNode[] = [];
  let resto = texto;
  let k = 0;
  RE_ITALICO.lastIndex = 0;
  let m: RegExpExecArray | null;
  let cursor = 0;
  while ((m = RE_ITALICO.exec(texto))) {
    const antes = texto.slice(cursor, m.index);
    const depois = texto.slice(m.index + m[0].length);
    const ref = depois.match(RE_REF);
    const citacao = m[1].trim().startsWith('"') && (!!ref || /diz:\s*$/.test(antes));
    nos.push(<Negrito key={k++} texto={antes} />);
    if (citacao) {
      nos.push(
        <span key={k++} className="fa-versiculo" style={{ color: C.dourado, fontFamily: SERIFA, fontSize: '1.1em', fontStyle: 'italic' }}>
          <Negrito texto={m[1]} />{ref ? <>{ref[1]}<span style={{ fontStyle: 'normal', fontFamily: SANS, fontSize: '0.82em', fontWeight: 700 }}>({ref[2]})</span></> : null}
        </span>,
      );
      cursor = m.index + m[0].length + (ref ? ref[0].length : 0);
      RE_ITALICO.lastIndex = cursor;
    } else {
      nos.push(<em key={k++}><Negrito texto={m[1]} /></em>);
      cursor = m.index + m[0].length;
    }
  }
  resto = texto.slice(cursor);
  nos.push(<Negrito key={k++} texto={resto} />);
  return <>{nos}</>;
}

/* ─── Leitura do dia devocional (seção 3.1) ──────────────────────────────── */
export function LeituraDia({ e, c, onIrPara }: { e: EntradaPlano; c: ConteudoDia; onIrPara: (data: string) => void }) {
  const fs = useFs();
  const u = useUsuario();
  const est = estacaoDe(e);
  const respostas = u.respostas[e.data] ?? {};
  const caderno: Caderno = { sentiu: '', pensou: '', deus_falou: '', ...(u.caderno[e.data] ?? {}) };
  const concluido = u.concluidosSet.has(e.data);
  const amanha = amanhaDe(e.data);
  const salvo = useAvisoSalvo([respostas, caderno]);

  return (
    <article>
      {/* 1. Topo */}
      <div style={{ textAlign: 'center' }}>
        <span style={{ display: 'inline-block', fontFamily: DISPLAY, fontSize: fs(12), fontWeight: 600, letterSpacing: '0.08em', color: C.ciano, background: C.cianoSuave, border: `1px solid ${C.bordaForte}`, padding: '8px 14px', borderRadius: 99 }}>
          📅 Dia {e.dia_do_ano} · {MESES[mesIndice(e.data)]} · {leituraExtenso(e.leitura!)}
        </span>
        <div style={{ fontSize: fs(15), color: C.textoSuave, marginTop: 10, lineHeight: 1.5 }}>
          {est.emoji} {est.nome} · {e.tema_mes} · <strong style={{ color: C.dourado, fontWeight: 700 }}>Semana {e.semana}: {e.nome_semana}</strong>
        </div>
      </div>

      {/* 2. Pergunta */}
      <div style={{ margin: '26px 0 22px', padding: '22px 20px 20px', borderRadius: 18, background: 'linear-gradient(135deg, rgba(212,175,55,0.16), rgba(212,175,55,0.04))', border: '1px solid rgba(212,175,55,0.42)' }}>
        <div style={{ ...rotuloCaixaAlta(C.dourado), marginBottom: 8 }}>❓ Pergunta</div>
        <p style={{ margin: 0, fontFamily: SERIFA, fontSize: fs(24), lineHeight: 1.4, color: C.texto, fontStyle: 'italic', fontWeight: 600 }}>{c.pergunta}</p>
      </div>

      {/* 3. Título e subtítulo */}
      <div style={{ textAlign: 'center', margin: '34px 0 26px' }}>
        <div aria-hidden style={{ fontSize: 52, lineHeight: 1, marginBottom: 10 }}>{c.emoji}</div>
        <h2 style={{ fontFamily: TITULO, fontSize: fs(34), lineHeight: 1.15, fontWeight: 900, letterSpacing: '-0.01em', margin: '0 0 12px', textWrap: 'balance' } as CSSProperties}>
          {c.titulo} <SoLeitor>{c.emoji}</SoLeitor>
        </h2>
        <p style={{ margin: '0 auto', maxWidth: 520, fontSize: fs(18), lineHeight: 1.5, color: C.textoSuave }}>{c.subtitulo}</p>
      </div>

      {/* 4. Frase do dia */}
      <blockquote style={{ position: 'relative', margin: '0 0 30px', padding: '28px 22px 22px', borderRadius: 18, textAlign: 'center', background: C.fundo2, border: '1px solid rgba(212,175,55,0.30)' }}>
        <span aria-hidden style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontFamily: SERIFA, fontSize: 56, lineHeight: 1, color: C.dourado, background: C.fundo, padding: '0 10px' }}>“</span>
        <div style={{ ...rotuloCaixaAlta(C.dourado), marginBottom: 10 }}>Frase do dia</div>
        <p style={{ margin: '0 auto', maxWidth: 560, textAlign: 'center', fontFamily: SERIFA, fontSize: fs(27), lineHeight: 1.35, color: C.dourado, textWrap: 'balance' } as CSSProperties}>{c.frase_do_dia}</p>
      </blockquote>

      {/* 5. Instrução + texto bíblico recolhível */}
      <TextoBiblico leitura={e.leitura!} texto={c.texto_biblico} />

      {/* 6. Diálogo pastoral em 8 fases */}
      <section style={{ marginTop: 40 }}>
        <TituloSecao icone="💬" titulo="Vamos conversar" />
        <p style={{ margin: '0 0 18px', fontSize: fs(16), lineHeight: 1.6, color: C.textoSuave }}>
          Leia devagar, como quem conversa. Em cada <strong style={{ color: C.ciano }}>⏸️</strong>, pare e responda com sinceridade. Suas respostas ficam salvas só neste aparelho.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {c.fases.map(f => (
            <CartaoFase key={f.numero} f={f} oracao={f.numero === 8 ? c.oracao : undefined}
              resposta={respostas[f.numero] ?? ''} onResposta={t => u.setResposta(e.data, f.numero, t)} />
          ))}
        </div>
      </section>

      {/* 7. Meu caderno */}
      <section style={{ marginTop: 40, padding: '20px 18px', borderRadius: 20, background: C.cartao, border: `1px solid ${C.borda}` }}>
        <TituloSecao icone="📓" titulo="Meu caderno" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {([['sentiu', '💭 O que eu senti hoje'], ['pensou', '🧠 O que eu pensei'], ['deus_falou', '📖 O que Deus me falou']] as const).map(([k, rot]) => (
            <label key={k} style={{ display: 'block' }}>
              <span style={{ display: 'block', fontSize: fs(16), fontWeight: 700, color: C.ciano, marginBottom: 6 }}>{rot}</span>
              <CampoTexto valor={caderno[k]} onMudar={t => u.setCaderno(e.data, k, t)} />
            </label>
          ))}
        </div>
        <div role="status" aria-live="polite" className="fa-sem-impressao" style={{ minHeight: 20, marginTop: 10, fontSize: 13, color: C.vida, opacity: salvo ? 1 : 0, transition: 'opacity .3s' }}>
          ✓ Salvo neste aparelho
        </div>
      </section>

      {/* 8. Mande para alguém */}
      <Compartilhar e={e} c={c} />

      {/* Concluir */}
      <BotaoConcluir concluido={concluido} onAlternar={() => u.alternarConcluido(e.data)} />

      {/* 9. Amanhã */}
      {amanha && <CartaoAmanha amanha={amanha} onIrPara={onIrPara} />}

      {/* 10. Nota de cuidado */}
      {c.nota_cuidado && <NotaCuidado />}

      <BotaoImprimir />
    </article>
  );
}

/* Mostra "✓ Salvo" por alguns instantes quando algo muda (ignora a primeira renderização). */
function useAvisoSalvo(deps: unknown[]) {
  const [salvo, setSalvo] = useState(false);
  const chave = JSON.stringify(deps);
  const primeira = useRef(true);
  useEffect(() => {
    if (primeira.current) { primeira.current = false; return; }
    setSalvo(true);
    const t = window.setTimeout(() => setSalvo(false), 1800);
    return () => window.clearTimeout(t);
  }, [chave]);
  return salvo;
}

export function NotaCuidado() {
  const fs = useFs();
  return (
    <aside role="note" style={{ marginTop: 24, padding: '16px 18px', borderRadius: 14, background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.40)', fontSize: fs(16), lineHeight: 1.6 }}>
      <strong>💛 Cuidado com a sua alma:</strong> {NOTA_CUIDADO}
    </aside>
  );
}

export function BotaoImprimir() {
  return (
    <div className="fa-sem-impressao" style={{ marginTop: 24, textAlign: 'center' }}>
      <button type="button" onClick={() => window.print()} style={botaoSecundario}>🖨️ Imprimir / salvar em PDF</button>
    </div>
  );
}

export function BotaoConcluir({ concluido, onAlternar, rotulo = 'Concluí a leitura de hoje ✓' }: { concluido: boolean; onAlternar: () => void; rotulo?: string }) {
  return (
    <div className="fa-sem-impressao" style={{ marginTop: 28, textAlign: 'center' }}>
      <button type="button" onClick={onAlternar} aria-pressed={concluido}
        style={concluido ? { ...botaoSecundario, color: C.vida, borderColor: 'rgba(74,222,128,0.5)', background: 'rgba(74,222,128,0.10)' } : botaoPrimario}>
        {concluido ? '✓ Dia concluído (toque para desmarcar)' : rotulo}
      </button>
    </div>
  );
}

export function CartaoAmanha({ amanha, onIrPara }: { amanha: NonNullable<ReturnType<typeof amanhaDe>>; onIrPara: (d: string) => void }) {
  const fs = useFs();
  return (
    <button type="button" onClick={() => onIrPara(amanha.data)} className="fa-amanha"
      style={{ display: 'block', width: '100%', textAlign: 'left', marginTop: 28, padding: 20, borderRadius: 20, cursor: 'pointer', fontFamily: SANS, color: C.texto, background: `linear-gradient(135deg, ${C.cartao2}, ${C.cartao})`, border: `1px solid ${C.bordaForte}` }}>
      <span style={{ display: 'block', ...rotuloCaixaAlta(C.ciano), marginBottom: 8 }}>Amanhã · {rotuloData(amanha.data)}</span>
      <span style={{ display: 'block', fontSize: fs(17), color: C.textoSuave }}>{amanha.leitura.startsWith('Sl') ? leituraExtenso(amanha.leitura) : amanha.leitura}</span>
      {amanha.titulo && <span style={{ display: 'block', fontFamily: TITULO, fontSize: fs(23), fontWeight: 700, lineHeight: 1.25, marginTop: 4 }}>{amanha.titulo}</span>}
      <span className="fa-sem-impressao" style={{ display: 'block', marginTop: 10, fontSize: 15, fontWeight: 700, color: C.ciano }}>Ver o próximo dia →</span>
    </button>
  );
}

/* ─── Texto bíblico: referência + link; texto só se inserido pelo editor ──── */
export function TextoBiblico({ leitura, texto }: { leitura: string; texto?: { v: number; t: string }[] }) {
  const fs = useFs();
  const [aberto, setAberto] = useState(false);
  return (
    <section style={{ borderRadius: 20, background: C.cartao, border: `1px solid ${C.borda}`, overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '18px 18px 16px' }}>
        <span aria-hidden style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, background: C.douradoSuave, border: '1px solid rgba(212,175,55,0.4)' }}>📖</span>
        <p style={{ margin: 0, fontSize: fs(17), lineHeight: 1.6 }}>
          Leia o <strong style={{ color: C.dourado }}>{leituraExtenso(leitura)}</strong> com calma, em voz baixa se puder. Depois leia uma segunda vez, prestando atenção nas imagens.
        </p>
      </div>
      <button type="button" className="fa-sem-impressao" onClick={() => setAberto(a => !a)} aria-expanded={aberto}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', minHeight: 50, padding: '0 18px', fontSize: 16, fontWeight: 700, fontFamily: SANS, cursor: 'pointer', color: C.ciano, background: 'rgba(0,229,255,0.06)', border: 'none', borderTop: `1px solid ${C.borda}` }}>
        <span>{aberto ? `Recolher o ${leituraExtenso(leitura)}` : `Abrir o ${leituraExtenso(leitura)}`}</span>
        <span aria-hidden style={{ transform: aberto ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▾</span>
      </button>
      <div className={aberto ? 'fa-surgir' : 'fa-recolhido'} style={{ padding: '6px 22px 22px', borderTop: `1px solid ${C.borda}`, background: C.fundo2 }}>
        {texto?.length ? (
          texto.map(v => (
            <p key={v.v} style={{ margin: '14px 0 0', fontFamily: SERIFA, fontSize: fs(21), lineHeight: 1.6 }}>
              <sup style={{ color: C.dourado, fontFamily: SANS, fontSize: '0.58em', fontWeight: 800, marginRight: 5 }}>{v.v}</sup>{v.t}
            </p>
          ))
        ) : (
          <div style={{ paddingTop: 16 }}>
            <p style={{ margin: '0 0 14px', fontSize: fs(16), lineHeight: 1.6, color: C.textoSuave }}>
              Abra a sua Bíblia no <strong style={{ color: C.texto }}>{leituraExtenso(leitura)}</strong> ou leia online:
            </p>
            <LinkLeitura href={linkLeitura(leitura)}>Ler o {leituraExtenso(leitura)} (ARA)</LinkLeitura>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Cartão de fase do diálogo ───────────────────────────────────────────── */
function CartaoFase({ f, oracao, resposta, onResposta }: { f: FaseConteudo; oracao?: string; resposta: string; onResposta: (t: string) => void }) {
  const fs = useFs();
  const respondida = !!resposta.trim();
  return (
    <div id={`fase-${f.numero}`} data-fase={f.numero} className="fa-cartao" style={{ position: 'relative', borderRadius: 20, background: C.cartao, border: `1px solid ${C.borda}`, overflow: 'hidden', scrollMarginTop: 150 }}>
      <span aria-hidden style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: f.numero === 8 ? C.dourado : C.ciano, opacity: 0.85 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px 14px 20px', background: 'linear-gradient(90deg, rgba(0,229,255,0.08), transparent)', borderBottom: `1px solid ${C.borda}` }}>
        <span aria-hidden style={{ position: 'relative', flexShrink: 0, width: 52, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, background: C.cianoSuave, border: '1px solid rgba(0,229,255,0.4)' }}>
          {f.emoji}
          <span style={{ position: 'absolute', bottom: -6, right: -6, width: 22, height: 22, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISPLAY, fontSize: 11, fontWeight: 800, color: C.fundo, background: C.ciano }}>{f.numero}</span>
        </span>
        <h4 style={{ margin: 0, minWidth: 0, lineHeight: 1.25 }}>
          <span style={{ display: 'block', fontFamily: DISPLAY, fontSize: fs(12), fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.ciano }}>{f.numero}. {f.emoji} {f.fase}:</span>
          <span style={{ display: 'block', fontFamily: TITULO, fontSize: fs(20), fontWeight: 800, color: C.texto, marginTop: 4 }}>{f.titulo}</span>
        </h4>
      </div>

      <div style={{ padding: '18px 18px 18px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {f.falas.map((fala, i) => <Fala key={i} fala={fala} />)}

        {f.lista && (
          <ol style={{ margin: '6px 0 0', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {f.lista.map((p, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 14, borderRadius: 14, background: C.cartao2, border: `1px solid ${C.borda}` }}>
                <span aria-hidden style={{ flexShrink: 0, width: 30, height: 30, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISPLAY, fontWeight: 800, color: C.fundo, background: C.ciano, fontSize: 13 }}>{i + 1}</span>
                <span style={{ fontSize: fs(17), lineHeight: 1.55 }}><SoLeitor>{`Passo ${i + 1}: `}</SoLeitor><Rico texto={p} /></span>
              </li>
            ))}
          </ol>
        )}

        {oracao && (
          <div style={{ marginTop: 4, padding: 20, borderRadius: 16, background: 'linear-gradient(135deg, rgba(212,175,55,0.14), rgba(212,175,55,0.04))', border: '1px solid rgba(212,175,55,0.35)' }}>
            <p style={{ margin: 0, fontFamily: SERIFA, fontSize: fs(22), lineHeight: 1.65, color: C.texto, fontStyle: 'italic' }}><Rico texto={oracao} /></p>
          </div>
        )}

        {f.pergunta_pausa && (
          <label style={{ display: 'block', marginTop: 8, padding: 16, borderRadius: 16, background: respondida ? 'rgba(74,222,128,0.06)' : 'rgba(0,229,255,0.06)', border: `1px dashed ${respondida ? 'rgba(74,222,128,0.5)' : 'rgba(0,229,255,0.45)'}`, transition: 'background .3s, border-color .3s' }}>
            <span style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: fs(17), fontWeight: 700, color: C.texto, marginBottom: 10, lineHeight: 1.45 }}>
              <span aria-hidden style={{ flexShrink: 0, fontSize: 20 }}>{respondida ? '✅' : '⏸️'}</span>
              <span style={{ fontStyle: 'italic' }}><SoLeitor>Pausa para responder: </SoLeitor>{f.pergunta_pausa}</span>
            </span>
            <CampoTexto valor={resposta} onMudar={onResposta} rotulo={f.pergunta_pausa} />
          </label>
        )}
      </div>
    </div>
  );
}

/* Duas vozes sem nomes: pastoral à esquerda; pessoa recuada, em itálico, com outro fundo; pausa centralizada. */
function Fala({ fala }: { fala: FalaConteudo }) {
  const fs = useFs();
  if (fala.voz === 'pausa') {
    return (
      <p style={{ margin: '2px 0', textAlign: 'center', fontSize: fs(15), fontStyle: 'italic', letterSpacing: '0.06em', color: C.textoFraco }}>
        ({fala.texto.replace(/[()]/g, '')})
      </p>
    );
  }
  const pessoa = fala.voz === 'pessoa';
  return (
    <p className={pessoa ? 'fa-fala-pessoa' : 'fa-fala-pastor'}
      style={{
        margin: 0, fontSize: fs(17), lineHeight: 1.65,
        marginLeft: pessoa ? 'clamp(28px, 12%, 72px)' : 0, marginRight: pessoa ? 0 : 'clamp(12px, 6%, 40px)',
        padding: '11px 15px', borderRadius: pessoa ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
        background: pessoa ? 'rgba(212,175,55,0.10)' : 'rgba(255,255,255,0.045)',
        border: `1px solid ${pessoa ? 'rgba(212,175,55,0.26)' : 'rgba(255,255,255,0.08)'}`,
        borderLeft: pessoa ? undefined : `3px solid ${C.bordaForte}`,
        fontStyle: pessoa ? 'italic' : 'normal', color: pessoa ? '#F5ECCF' : C.texto,
      }}>
      <SoLeitor>{pessoa ? 'Resposta: ' : 'Fala: '}</SoLeitor>
      <Rico texto={fala.texto} />
    </p>
  );
}
