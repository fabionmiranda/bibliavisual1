import { useMemo, useState, type ReactNode } from 'react';
import {
  type EntradaPlano, ESTACOES, EMOJI_MES, MESES, PLANO, datasPublicadas, ehBissexto, entrada, leituraExtenso,
  mesIndice, rotuloData, salmosPercorridos, sequenciaDoAno,
} from '../../data/falaAlma';
import { C, COR_TIPO, SERIFA, SANS, DISPLAY, TITULO, botaoSecundario, rotuloCaixaAlta, useFs, useUsuario, Cartao, TituloSecao } from './base';

const NOME_TIPO = { devocional: 'Devocional', selah: 'Selah', colheita: 'Colheita', selah_bonus: 'Selah bônus' } as const;

/* ─── Calendário anual: 4 estações → 12 meses → semanas ───────────────────── */
export function Calendario({ dataAtual, dataHoje, onIrPara }: { dataAtual: string; dataHoje: string; onIrPara: (d: string) => void }) {
  const u = useUsuario();
  const fs = useFs();
  const publicados = useMemo(() => datasPublicadas(), []);
  const bissexto = ehBissexto(new Date().getFullYear());
  const [mesAberto, setMesAberto] = useState(mesIndice(dataAtual));

  return (
    <div>
      <Legenda />
      {ESTACOES.map(est => (
        <section key={est.nome} style={{ marginTop: 26 }}>
          <h3 style={{ margin: '0 0 4px', fontFamily: TITULO, fontSize: fs(24), fontWeight: 700 }}>{est.emoji} {est.nome}</h3>
          <p style={{ margin: '0 0 12px', fontSize: fs(15), color: C.textoSuave, fontStyle: 'italic' }}>{est.pergunta}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {est.meses.map(m => {
              const dias = PLANO.filter(e => mesIndice(e.data) === m && (e.tipo !== 'selah_bonus' || bissexto));
              const aberto = mesAberto === m;
              const feitos = dias.filter(d => u.concluidosSet.has(d.data)).length;
              return (
                <div key={m} style={{ borderRadius: 16, background: C.cartao, border: `1px solid ${aberto ? C.bordaForte : C.borda}`, overflow: 'hidden' }}>
                  <button type="button" onClick={() => setMesAberto(aberto ? -1 : m)} aria-expanded={aberto}
                    style={{ display: 'flex', width: '100%', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer', color: C.texto, fontFamily: SANS, textAlign: 'left' }}>
                    <span aria-hidden style={{ fontSize: 24 }}>{EMOJI_MES[m]}</span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: 'block', fontFamily: TITULO, fontSize: fs(19), fontWeight: 700 }}>{MESES[m]}</span>
                      <span style={{ display: 'block', fontSize: fs(14), color: C.textoSuave }}>{dias[0].tema_mes}</span>
                    </span>
                    <span style={{ fontFamily: DISPLAY, fontSize: 12, fontWeight: 700, color: feitos ? C.vida : C.textoFraco }}>{feitos}/{dias.length}</span>
                    <span aria-hidden style={{ color: C.ciano, transform: aberto ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▾</span>
                  </button>
                  {aberto && <SemanasDoMes dias={dias} dataAtual={dataAtual} dataHoje={dataHoje} publicados={publicados} onIrPara={onIrPara} />}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function Legenda() {
  const item = (cor: string, nome: string) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 12, height: 12, borderRadius: 4, background: `${cor}33`, border: `1px solid ${cor}` }} />{nome}
    </span>
  );
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', fontSize: 14, color: C.textoSuave }}>
      {item(COR_TIPO.devocional, 'Devocional')}
      {item(COR_TIPO.selah, 'Selah')}
      {item(COR_TIPO.colheita, 'Colheita')}
      <span><span style={{ color: C.vida }}>✓</span> concluído</span>
      <span><span style={{ color: C.dourado }}>▢</span> hoje</span>
    </div>
  );
}

function SemanasDoMes({ dias, dataAtual, dataHoje, publicados, onIrPara }: {
  dias: EntradaPlano[]; dataAtual: string; dataHoje: string; publicados: Set<string>; onIrPara: (d: string) => void;
}) {
  const u = useUsuario();
  const grupos: { titulo: string; dias: EntradaPlano[] }[] = [];
  for (const d of dias) {
    const titulo = d.semana && d.semana <= 4 ? `Semana ${d.semana} · ${d.nome_semana}` : d.nome_semana;
    const g = grupos.find(x => x.titulo === titulo);
    if (g) g.dias.push(d); else grupos.push({ titulo, dias: [d] });
  }
  return (
    <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {grupos.map(g => (
        <div key={g.titulo}>
          <div style={{ fontFamily: TITULO, fontSize: 15, fontWeight: 700, color: C.dourado, marginBottom: 8 }}>{g.titulo}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(76px, 1fr))', gap: 6 }}>
            {g.dias.map(d => {
              const cor = COR_TIPO[d.tipo];
              const atual = d.data === dataAtual;
              const feito = u.concluidosSet.has(d.data);
              const semConteudo = d.tipo === 'devocional' && !publicados.has(d.data);
              return (
                <button key={d.data} type="button" onClick={() => onIrPara(d.data)} className="fa-botao"
                  aria-current={atual ? 'date' : undefined}
                  aria-label={`${rotuloData(d.data)}, ${NOME_TIPO[d.tipo]}${d.leitura ? `, ${leituraExtenso(d.leitura)}` : ''}${feito ? ', concluído' : ''}`}
                  style={{
                    position: 'relative', padding: '8px 4px', borderRadius: 10, cursor: 'pointer', fontFamily: SANS, textAlign: 'center',
                    color: atual ? C.fundo : C.texto, background: atual ? cor : `${cor}${semConteudo ? '10' : '22'}`,
                    border: `1px solid ${d.data === dataHoje ? C.dourado : `${cor}${semConteudo ? '44' : '88'}`}`,
                  }}>
                  <span style={{ display: 'block', fontFamily: DISPLAY, fontSize: 15, fontWeight: 700 }}>{Number(d.data.slice(3))}</span>
                  <span style={{ display: 'block', fontSize: 11, fontWeight: 700, opacity: 0.9, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {d.tipo === 'selah' ? '⏸️ Selah' : d.tipo === 'colheita' ? '🌾' : d.leitura}
                  </span>
                  {feito && <span aria-hidden style={{ position: 'absolute', top: -6, right: -4, width: 18, height: 18, borderRadius: 99, background: C.vida, color: C.fundo, fontSize: 11, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Meu caderno: histórico, busca e exportação em PDF ───────────────────── */
export function MeuCaderno({ onIrPara }: { onIrPara: (d: string) => void }) {
  const u = useUsuario();
  const fs = useFs();
  const [busca, setBusca] = useState('');
  const registros = useMemo(() => {
    const datas = new Set([...Object.keys(u.respostas), ...Object.keys(u.caderno)].filter(d => entrada(d)));
    return [...datas].sort().map(d => {
      const e = entrada(d)!;
      const respostas = Object.entries(u.respostas[d] ?? {}).filter(([, t]) => t.trim());
      const cad = u.caderno[d];
      const notas = cad ? ([['O que eu senti', cad.sentiu], ['O que eu pensei', cad.pensou], ['O que Deus me falou', cad.deus_falou]] as const).filter(([, t]) => t?.trim()) : [];
      return { e, respostas, notas };
    }).filter(r => r.respostas.length || r.notas.length);
  }, [u.respostas, u.caderno]);

  const termo = busca.trim().toLowerCase().replace(/^(salmo|sl)\s*/, '');
  const filtrados = termo
    ? registros.filter(({ e }) => e.mes.toLowerCase().includes(termo) || (e.leitura ?? '').toLowerCase().replace(/^sl\s*/, '').startsWith(termo) || e.nome_semana.toLowerCase().includes(termo))
    : registros;

  return (
    <div>
      <div className="fa-sem-impressao" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
        <input type="search" value={busca} onChange={ev => setBusca(ev.target.value)} placeholder="Buscar por salmo (ex.: 23) ou mês" aria-label="Buscar no caderno por salmo ou mês"
          style={{ flex: '1 1 220px', minHeight: 46, padding: '0 14px', borderRadius: 12, fontSize: 16, fontFamily: SANS, color: C.texto, background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(0,229,255,0.3)' }} />
        <button type="button" onClick={() => window.print()} style={botaoSecundario}>🖨️ Exportar em PDF</button>
      </div>
      <h2 className="fa-so-impressao" style={{ fontFamily: TITULO }}>Conselheiro da Alma · Meu caderno</h2>
      {filtrados.length === 0 ? (
        <Cartao><p style={{ margin: 0, fontSize: fs(17), color: C.textoSuave }}>{registros.length ? 'Nada encontrado para essa busca.' : 'Seu caderno ainda está vazio. As respostas dos ⏸️ e as anotações de cada dia aparecem aqui.'}</p></Cartao>
      ) : filtrados.map(({ e, respostas, notas }) => (
        <Cartao key={e.data} style={{ marginBottom: 14 }}>
          <button type="button" onClick={() => onIrPara(e.data)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', color: C.ciano, fontFamily: SANS, fontSize: fs(16), fontWeight: 800 }}>
            {rotuloData(e.data)} · {e.leitura ? leituraExtenso(e.leitura) : e.nome_semana} →
          </button>
          {respostas.map(([fase, t]) => (
            <p key={fase} style={{ margin: '10px 0 0', fontSize: fs(16), lineHeight: 1.55 }}>
              <span style={{ color: C.textoFraco }}>⏸️ {e.tipo === 'devocional' ? `Fase ${fase}` : `Pergunta ${fase}`}: </span>
              <span style={{ fontStyle: 'italic', color: '#F5ECCF' }}>{t}</span>
            </p>
          ))}
          {notas.map(([rot, t]) => (
            <p key={rot} style={{ margin: '10px 0 0', fontSize: fs(16), lineHeight: 1.55 }}>
              <span style={{ color: C.ciano, fontWeight: 700 }}>{rot}: </span>{t}
            </p>
          ))}
        </Cartao>
      ))}
    </div>
  );
}

/* ─── Progresso ───────────────────────────────────────────────────────────── */
export function Progresso({ dataHoje }: { dataHoje: string }) {
  const u = useUsuario();
  const fs = useFs();
  const seq = sequenciaDoAno();
  const concluidos = seq.filter(e => u.concluidosSet.has(e.data));
  // sequência atual: dias seguidos concluídos, terminando hoje (ou ontem, se hoje ainda não foi feito)
  let i = seq.findIndex(e => e.data === dataHoje);
  if (i >= 0 && !u.concluidosSet.has(seq[i].data)) i -= 1;
  let streak = 0;
  while (i >= 0 && u.concluidosSet.has(seq[i].data)) { streak++; i--; }
  const salmos = salmosPercorridos(u.concluidos);
  const pct = Math.round((concluidos.length / seq.length) * 100);

  const Numero = ({ valor, rotulo, cor }: { valor: string | number; rotulo: string; cor: string }) => (
    <div style={{ padding: '18px 16px', borderRadius: 18, background: C.cartao, border: `1px solid ${C.borda}`, textAlign: 'center' }}>
      <div style={{ fontFamily: DISPLAY, fontSize: fs(36), fontWeight: 700, lineHeight: 1, color: cor }}>{valor}</div>
      <div style={{ marginTop: 6, fontSize: fs(14), color: C.textoSuave }}>{rotulo}</div>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 12 }}>
        <Numero valor={concluidos.length} rotulo={`dias concluídos de ${seq.length}`} cor={C.ciano} />
        <Numero valor={`${streak} 🔥`} rotulo={streak === 1 ? 'dia seguido' : 'dias seguidos'} cor={C.dourado} />
        <Numero valor={salmos} rotulo="de 150 Salmos percorridos" cor={C.vida} />
      </div>
      <Cartao style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs(15), marginBottom: 8 }}>
          <strong style={{ fontFamily: TITULO }}>Progresso do ano</strong><span style={{ fontFamily: DISPLAY, color: C.ciano, fontWeight: 700 }}>{pct}%</span>
        </div>
        <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso do ano" style={{ height: 12, borderRadius: 99, background: 'rgba(0,229,255,0.10)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${C.ciano}, ${C.dourado})` }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4, marginTop: 14 }}>
          {MESES.map((m, idx) => {
            const doMes = seq.filter(e => mesIndice(e.data) === idx);
            const feitos = doMes.filter(e => u.concluidosSet.has(e.data)).length;
            const f = feitos / doMes.length;
            return (
              <div key={m} title={`${m}: ${feitos}/${doMes.length}`} style={{ textAlign: 'center' }}>
                <div style={{ height: 48, borderRadius: 6, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: `${f * 100}%`, background: C.ciano, opacity: 0.85 }} />
                </div>
                <div style={{ fontSize: 11, color: C.textoFraco, marginTop: 4 }}>{m.slice(0, 1)}</div>
              </div>
            );
          })}
        </div>
      </Cartao>
    </div>
  );
}

/* ─── Sobre + preferências ────────────────────────────────────────────────── */
export function Sobre() {
  const u = useUsuario();
  const fs = useFs();
  const p = u.preferencias;
  const Opcao = ({ ativo, onClick, children }: { ativo: boolean; onClick: () => void; children: ReactNode }) => (
    <button type="button" onClick={onClick} aria-pressed={ativo}
      style={{ ...botaoSecundario, flex: '1 1 200px', color: ativo ? C.fundo : C.ciano, background: ativo ? C.ciano : C.cianoSuave }}>{children}</button>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Cartao>
        <TituloSecao icone="🌳" titulo="Sobre o Conselheiro da Alma" />
        <p style={{ margin: '0 0 12px', fontSize: fs(17), lineHeight: 1.65 }}>
          <strong>365 conversas nos Salmos para o coração cansado.</strong> Todos os 150 Salmos em um ano, de 1º de janeiro a 31 de dezembro, em qualquer ano.
          Cada dia é uma conversa pastoral de aconselhamento bíblico redentivo: sentimento → pensamento → coração → resposta de Deus → Cristo → passo prático → oração.
        </p>
        <p style={{ margin: 0, padding: '12px 14px', borderRadius: 12, fontSize: fs(16), lineHeight: 1.6, background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.35)' }}>
          Este devocional não substitui o aconselhamento pessoal. Se você está passando por uma tristeza que não passa, procure seu pastor ou conselheiro e um profissional de saúde.
        </p>
      </Cartao>

      <Cartao>
        <TituloSecao icone="🗓️" titulo="As quatro estações" />
        {ESTACOES.map(e => (
          <p key={e.nome} style={{ margin: '0 0 8px', fontSize: fs(16) }}>
            <strong>{e.emoji} {e.nome}</strong> <span style={{ color: C.textoSuave }}>({e.meses.map(m => MESES[m].slice(0, 3)).join('–')}) · {e.pergunta}</span>
          </p>
        ))}
        <p style={{ margin: '12px 0 0', fontSize: fs(15), color: C.textoSuave, lineHeight: 1.6 }}>
          Cada mês tem 4 semanas de 6 leituras, um <strong style={{ color: C.selah }}>Selah</strong> nos dias 7, 14, 21 e 28 e uma <strong style={{ color: C.colheita }}>Colheita</strong> nos dias 29 a 31. Em outubro o Salmo 119 termina no Dia da Reforma (31/10) e, em dezembro, o Salmo 150 fecha o ano em 31/12.
        </p>
      </Cartao>

      <Cartao>
        <TituloSecao icone="⚙️" titulo="Preferências" />
        <div style={{ ...rotuloCaixaAlta(C.ciano), marginBottom: 8 }}>Como seguir o plano</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
          <Opcao ativo={p.ritmo === 'calendario'} onClick={() => u.setPreferencia('ritmo', 'calendario')}>📅 Pela data de hoje</Opcao>
          <Opcao ativo={p.ritmo === 'meu_ritmo'} onClick={() => u.setPreferencia('ritmo', 'meu_ritmo')}>🚶 No meu ritmo</Opcao>
        </div>
        <p style={{ margin: '0 0 18px', fontSize: fs(14), color: C.textoSuave, lineHeight: 1.5 }}>
          "No meu ritmo" abre o próximo dia que você ainda não concluiu, começando pelo Dia 1, independente da data.
        </p>
        <div style={{ ...rotuloCaixaAlta(C.ciano), marginBottom: 8 }}>Semana Santa</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <Opcao ativo={!p.trilha_semana_santa} onClick={() => u.setPreferencia('trilha_semana_santa', false)}>Mostrar o plano normal</Opcao>
          <Opcao ativo={p.trilha_semana_santa} onClick={() => u.setPreferencia('trilha_semana_santa', true)}>Abrir a trilha da Semana Santa</Opcao>
        </div>
        <p style={{ margin: '8px 0 0', fontSize: fs(14), color: C.textoSuave }}>Nos dias da Semana Santa, um aviso sempre deixa você escolher entre a trilha e o plano normal.</p>
      </Cartao>
    </div>
  );
}

