import { useMemo, useState, type CSSProperties } from 'react';
import {
  type EntradaPlano, ANCORA_DO_MES, MESES, amanhaDe, conteudoSelah, estacaoDe, leituraExtenso,
  linkLeitura, mesIndice, previaMes, rotuloData,
} from '../../data/falaAlma';
import type { LeituraEspecial } from '../../data/falaAlma/datasMoveis';
import { C, SERIFA, DISPLAY, TITULO, botaoPrimario, botaoSecundario, rotuloCaixaAlta, useFs, useUsuario, Cartao, CampoTexto, LinkLeitura, TituloSecao } from './base';
import { BotaoConcluir, BotaoImprimir, CartaoAmanha, TextoBiblico } from './LeituraDia';

function Topo({ e, rotulo }: { e: EntradaPlano; rotulo: string }) {
  const fs = useFs();
  const est = estacaoDe(e);
  return (
    <div style={{ textAlign: 'center', marginBottom: 24 }}>
      <span style={{ display: 'inline-block', fontFamily: DISPLAY, fontSize: fs(12), fontWeight: 600, letterSpacing: '0.08em', color: C.ciano, background: C.cianoSuave, border: `1px solid ${C.bordaForte}`, padding: '8px 14px', borderRadius: 99 }}>
        📅 {e.dia_do_ano ? `Dia ${e.dia_do_ano} · ` : ''}{MESES[mesIndice(e.data)]} · {rotulo}
      </span>
      <div style={{ fontSize: fs(15), color: C.textoSuave, marginTop: 10, lineHeight: 1.5 }}>
        {est.emoji} {est.nome} · {e.tema_mes}{e.semana ? <> · <strong style={{ color: C.dourado }}>Semana {e.semana}: {e.nome_semana}</strong></> : ''}
      </div>
    </div>
  );
}

const lista: CSSProperties = { margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10 };

/* ─── Selah (dias 7, 14, 21 e 28) ─────────────────────────────────────────── */
export function DiaSelah({ e, onIrPara }: { e: EntradaPlano; onIrPara: (d: string) => void }) {
  const fs = useFs();
  const u = useUsuario();
  const s = useMemo(() => conteudoSelah(e), [e]);
  const amanha = amanhaDe(e.data);
  const resumo = s.leituras
    .map(l => ({ l, r: Object.entries(u.respostas[l.data] ?? {}).filter(([, t]) => t.trim()) }))
    .filter(x => x.r.length);
  const respostasSelah = u.respostas[e.data] ?? {};

  return (
    <article>
      <Topo e={e} rotulo="⏸️ Selah" />
      <div style={{ textAlign: 'center', margin: '8px 0 26px' }}>
        <div aria-hidden style={{ fontSize: 48 }}>⏸️</div>
        <h2 style={{ fontFamily: TITULO, fontSize: fs(38), fontWeight: 700, margin: '6px 0 6px' }}>Selah</h2>
        <p style={{ margin: 0, fontSize: fs(17), color: C.textoSuave }}>Pausa da semana: pare, respire e deixe a Palavra assentar.</p>
      </div>

      <blockquote style={{ margin: '0 0 28px', padding: '24px 22px', borderRadius: 18, textAlign: 'center', background: C.fundo2, border: `1px solid rgba(167,139,250,0.40)` }}>
        <div style={{ ...rotuloCaixaAlta(C.selah), marginBottom: 10 }}>Frase da semana</div>
        <p style={{ margin: 0, textAlign: 'center', fontFamily: SERIFA, fontSize: fs(26), lineHeight: 1.35, color: C.dourado }}>“{s.frase}”</p>
      </blockquote>

      <Cartao>
        <TituloSecao icone="🪞" titulo="Revisão pessoal" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {s.revisao.map((q, i) => (
            <label key={i} style={{ display: 'block' }}>
              <span style={{ display: 'block', fontSize: fs(17), fontWeight: 700, marginBottom: 8, lineHeight: 1.45 }}>⏸️ {q}</span>
              <CampoTexto valor={respostasSelah[i + 1] ?? ''} onMudar={t => u.setResposta(e.data, i + 1, t)} rotulo={q} />
            </label>
          ))}
        </div>
      </Cartao>

      <Cartao style={{ marginTop: 20 }}>
        <TituloSecao icone="👥" titulo="Para conversar em grupo" />
        <ol style={{ ...lista, fontSize: fs(17), lineHeight: 1.55 }}>{s.grupo.map((q, i) => <li key={i}>{q}</li>)}</ol>
      </Cartao>

      <Cartao style={{ marginTop: 20 }}>
        <TituloSecao icone="🎵" titulo="Salmo para cantar" />
        <p style={{ margin: '0 0 14px', fontSize: fs(17) }}>Cante ou ouça uma versão do <strong style={{ color: C.dourado }}>{leituraExtenso(s.salmo)}</strong>.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <LinkLeitura href={linkLeitura(s.salmo)}>Ler o {leituraExtenso(s.salmo)}</LinkLeitura>
          <LinkLeitura href={s.link}>Buscar versão cantada</LinkLeitura>
        </div>
      </Cartao>

      <Cartao style={{ marginTop: 20 }}>
        <TituloSecao icone="📒" titulo="O que eu respondi nesta semana" />
        {resumo.length === 0
          ? <p style={{ margin: 0, fontSize: fs(16), color: C.textoSuave }}>Você ainda não escreveu respostas nos ⏸️ desta semana. Elas aparecem aqui, só para você.</p>
          : resumo.map(({ l, r }) => (
            <div key={l.data} style={{ marginBottom: 14 }}>
              <button type="button" onClick={() => onIrPara(l.data)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: C.ciano, fontWeight: 800, fontSize: fs(15) }}>
                {rotuloData(l.data)} · {leituraExtenso(l.leitura!)} →
              </button>
              {r.map(([fase, t]) => (
                <p key={fase} style={{ margin: '6px 0 0', fontSize: fs(16), lineHeight: 1.5, fontStyle: 'italic', color: '#F5ECCF' }}>
                  <span style={{ fontStyle: 'normal', color: C.textoFraco }}>Fase {fase}: </span>{t}
                </p>
              ))}
            </div>
          ))}
      </Cartao>

      <BotaoConcluir concluido={u.concluidosSet.has(e.data)} onAlternar={() => u.alternarConcluido(e.data)} rotulo="Concluí o Selah da semana ✓" />
      {amanha && <CartaoAmanha amanha={amanha} onIrPara={onIrPara} />}
      <BotaoImprimir />
    </article>
  );
}

/* ─── Selah bônus (29/02, só em ano bissexto) ─────────────────────────────── */
export function DiaSelahBonus({ e, onIrPara, anoBissexto }: { e: EntradaPlano; onIrPara: (d: string) => void; anoBissexto: boolean }) {
  const fs = useFs();
  const u = useUsuario();
  const amanha = amanhaDe(e.data);
  return (
    <article>
      <Topo e={e} rotulo={`⏸️ Selah bônus · ${leituraExtenso(e.leitura!)}`} />
      {!anoBissexto && (
        <p role="note" style={{ padding: '12px 16px', borderRadius: 12, background: C.cianoSuave, border: `1px solid ${C.bordaForte}`, fontSize: fs(15) }}>
          O 29 de fevereiro só existe em ano bissexto. Este Selah bônus aparece no calendário apenas nesses anos.
        </p>
      )}
      <div style={{ textAlign: 'center', margin: '8px 0 26px' }}>
        <div aria-hidden style={{ fontSize: 48 }}>🎁</div>
        <h2 style={{ fontFamily: TITULO, fontSize: fs(36), fontWeight: 700, margin: '6px 0 6px' }}>Um dia a mais para louvar</h2>
        <p style={{ margin: '0 auto', maxWidth: 480, fontSize: fs(17), color: C.textoSuave, lineHeight: 1.55 }}>
          O menor salmo da Bíblia chama todos os povos a louvar a Deus pela sua misericórdia e fidelidade. Use este dia extra para agradecer.
        </p>
      </div>
      <TextoBiblico leitura={e.leitura!} />
      <Cartao style={{ marginTop: 20 }}>
        <label style={{ display: 'block' }}>
          <span style={{ display: 'block', fontSize: fs(17), fontWeight: 700, marginBottom: 8 }}>⏸️ Escreva três motivos de gratidão pela fidelidade de Deus neste começo de ano.</span>
          <CampoTexto valor={u.respostas[e.data]?.[1] ?? ''} onMudar={t => u.setResposta(e.data, 1, t)} />
        </label>
      </Cartao>
      <BotaoConcluir concluido={u.concluidosSet.has(e.data)} onAlternar={() => u.alternarConcluido(e.data)} />
      {amanha && <CartaoAmanha amanha={amanha} onIrPara={onIrPara} />}
    </article>
  );
}

/* ─── Colheita (dias 29–31, exceto outubro e dezembro) ────────────────────── */
export function DiaColheita({ e, onIrPara }: { e: EntradaPlano; onIrPara: (d: string) => void }) {
  const fs = useFs();
  const u = useUsuario();
  const mes = mesIndice(e.data);
  const ancora = ANCORA_DO_MES[mes];
  const previa = previaMes(mes);
  const amanha = amanhaDe(e.data);
  const diaColheita = Number(e.data.slice(3)) - 28;

  return (
    <article>
      <Topo e={e} rotulo={`🌾 Colheita · dia ${diaColheita}`} />
      <div style={{ textAlign: 'center', margin: '8px 0 26px' }}>
        <div aria-hidden style={{ fontSize: 48 }}>🌾</div>
        <h2 style={{ fontFamily: TITULO, fontSize: fs(36), fontWeight: 700, margin: '6px 0 6px' }}>{e.nome_semana}</h2>
        <p style={{ margin: 0, fontSize: fs(17), color: C.textoSuave }}>Hora de recolher o que Deus plantou neste mês.</p>
      </div>

      {ancora && <Memorizar mes={mes} referencia={ancora} />}

      <Cartao style={{ marginTop: 20 }}>
        <TituloSecao icone="🌱" titulo="O que Deus me ensinou este mês" />
        <CampoTexto valor={u.colheita[mes] ?? ''} onMudar={t => u.setColheita(mes, t)} linhas={5} rotulo="O que Deus me ensinou este mês" />
      </Cartao>

      <Cartao style={{ marginTop: 20 }} cor={C.bordaForte}>
        <TituloSecao icone={previa.emoji} titulo={`Em ${previa.mes.toLowerCase()}: ${previa.tema}`} />
        <ol style={{ ...lista, fontSize: fs(17) }}>
          {previa.semanas.map((s, i) => <li key={i}><strong style={{ color: C.ciano }}>Semana {i + 1}:</strong> {s}</li>)}
        </ol>
      </Cartao>

      <BotaoConcluir concluido={u.concluidosSet.has(e.data)} onAlternar={() => u.alternarConcluido(e.data)} rotulo="Concluí a colheita de hoje ✓" />
      {amanha && <CartaoAmanha amanha={amanha} onIrPara={onIrPara} />}
      <BotaoImprimir />
    </article>
  );
}

/* Memorização: a pessoa copia o versículo da sua Bíblia; as palavras vão sumindo aos poucos. */
function Memorizar({ mes, referencia }: { mes: number; referencia: string }) {
  const fs = useFs();
  const u = useUsuario();
  const texto = u.ancoras[mes] ?? '';
  const [nivel, setNivel] = useState(0);
  const palavras = texto.trim() ? texto.trim().split(/\s+/) : [];
  const escondida = (i: number) => nivel > 0 && ((i * 7 + 3) % 5) < nivel;
  return (
    <Cartao cor="rgba(212,175,55,0.40)">
      <TituloSecao icone="💎" titulo="Versículo-âncora do mês" />
      <p style={{ margin: '0 0 12px', fontFamily: SERIFA, fontSize: fs(26), color: C.dourado }}>{leituraExtenso(referencia)}</p>
      <p style={{ margin: '0 0 12px', fontSize: fs(16), lineHeight: 1.55, color: C.textoSuave }}>
        Abra a sua Bíblia, copie o versículo aqui e depois treine: a cada nível, mais palavras ficam escondidas.
      </p>
      <div style={{ marginBottom: 12 }}><LinkLeitura href={linkLeitura(referencia)}>Abrir o {leituraExtenso(referencia)}</LinkLeitura></div>
      <CampoTexto valor={texto} onMudar={t => u.setAncora(mes, t)} rotulo={`Texto do ${leituraExtenso(referencia)}`} placeholder="Copie aqui o versículo da sua Bíblia..." />
      {palavras.length > 0 && (
        <>
          <p aria-live="polite" style={{ margin: '16px 0', padding: 16, borderRadius: 14, background: C.fundo2, fontFamily: SERIFA, fontSize: fs(22), lineHeight: 1.7 }}>
            {palavras.map((p, i) => (
              <span key={i}>
                {escondida(i)
                  ? <span aria-label="palavra escondida" style={{ display: 'inline-block', minWidth: `${Math.max(2, p.length) * 0.5}em`, borderBottom: `2px solid ${C.dourado}`, margin: '0 2px' }}>&nbsp;</span>
                  : p}{' '}
              </span>
            ))}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <button type="button" onClick={() => setNivel(n => Math.max(0, n - 1))} disabled={nivel === 0} style={{ ...botaoSecundario, opacity: nivel === 0 ? 0.5 : 1 }}>− Mostrar mais</button>
            <span style={{ fontFamily: DISPLAY, fontSize: 12, color: C.textoSuave }}>Nível {nivel} de 5</span>
            <button type="button" onClick={() => setNivel(n => Math.min(5, n + 1))} disabled={nivel === 5} style={{ ...botaoPrimario, opacity: nivel === 5 ? 0.5 : 1 }}>Esconder mais +</button>
          </div>
        </>
      )}
    </Cartao>
  );
}

/* ─── Dia devocional ainda sem conteúdo publicado ─────────────────────────── */
export function DiaEmPreparo({ e, onIrPara }: { e: EntradaPlano; onIrPara: (d: string) => void }) {
  const fs = useFs();
  const u = useUsuario();
  const amanha = amanhaDe(e.data);
  return (
    <article>
      <Topo e={e} rotulo={leituraExtenso(e.leitura!)} />
      <div style={{ padding: '30px 22px', borderRadius: 22, textAlign: 'center', background: `radial-gradient(ellipse at 50% 0%, ${C.cianoSuave}, transparent 70%), ${C.cartao}`, border: `1px dashed ${C.bordaForte}` }}>
        <div aria-hidden style={{ fontSize: 44 }}>🌱</div>
        <h2 style={{ fontFamily: TITULO, fontSize: fs(26), fontWeight: 700, margin: '10px 0 6px' }}>A conversa deste dia está sendo preparada</h2>
        <p style={{ margin: '0 auto 18px', maxWidth: 440, fontSize: fs(17), color: C.textoSuave, lineHeight: 1.6 }}>
          Enquanto isso, leia o <strong style={{ color: C.texto }}>{leituraExtenso(e.leitura!)}</strong> com calma e anote o que Deus falar com você.
        </p>
        <LinkLeitura href={linkLeitura(e.leitura!)}>Ler o {leituraExtenso(e.leitura!)} (ARA)</LinkLeitura>
      </div>
      <Cartao style={{ marginTop: 20 }}>
        <label style={{ display: 'block' }}>
          <span style={{ display: 'block', fontSize: fs(16), fontWeight: 700, color: C.ciano, marginBottom: 6 }}>📖 O que Deus me falou</span>
          <CampoTexto valor={u.caderno[e.data]?.deus_falou ?? ''} onMudar={t => u.setCaderno(e.data, 'deus_falou', t)} />
        </label>
      </Cartao>
      <BotaoConcluir concluido={u.concluidosSet.has(e.data)} onAlternar={() => u.alternarConcluido(e.data)} />
      {amanha && <CartaoAmanha amanha={amanha} onIrPara={onIrPara} />}
    </article>
  );
}

/* ─── Banner de leitura especial (Semana Santa, Dia das Mães, Dia dos Pais) ── */
export function BannerEspecial({ especiais, mostrando, onAlternar }: { especiais: LeituraEspecial[]; mostrando: boolean; onAlternar: (v: boolean) => void }) {
  const fs = useFs();
  if (!especiais.length) return null;
  const e = especiais[0];
  const semanaSanta = e.id.startsWith('semana-santa');
  return (
    <aside className="fa-sem-impressao" role="note" style={{ marginBottom: 24, padding: '16px 18px', borderRadius: 18, background: 'linear-gradient(135deg, rgba(167,139,250,0.18), rgba(212,175,55,0.10))', border: '1px solid rgba(167,139,250,0.45)' }}>
      <div style={{ ...rotuloCaixaAlta(C.selah), marginBottom: 6 }}>{semanaSanta ? '✝️ Semana Santa' : '💐 Data especial'}</div>
      <p style={{ margin: '0 0 12px', fontSize: fs(17), lineHeight: 1.5 }}>
        {semanaSanta ? 'Hoje há uma leitura especial da Semana Santa' : `Hoje é ${e.rotulo}`}: <strong style={{ color: C.dourado }}>{leituraExtenso(e.leitura)}</strong> · {e.ligacao}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <button type="button" onClick={() => onAlternar(!mostrando)} style={mostrando ? botaoSecundario : botaoPrimario}>
          {mostrando ? 'Voltar ao plano normal' : 'Ler a leitura especial'}
        </button>
      </div>
    </aside>
  );
}

export function LeituraEspecialView({ especial, dataHoje }: { especial: LeituraEspecial; dataHoje: string }) {
  const fs = useFs();
  const u = useUsuario();
  const chave = `especial-${especial.id}`;
  return (
    <article>
      <div style={{ textAlign: 'center', margin: '8px 0 26px' }}>
        <span style={{ ...rotuloCaixaAlta(C.selah) }}>{especial.id.startsWith('semana-santa') ? '✝️ Trilha da Semana Santa' : '💐 Leitura especial'} · {rotuloData(dataHoje)}</span>
        <h2 style={{ fontFamily: TITULO, fontSize: fs(36), fontWeight: 700, margin: '10px 0 6px' }}>{especial.rotulo}</h2>
        <p style={{ margin: '0 auto', maxWidth: 480, fontSize: fs(18), color: C.textoSuave, lineHeight: 1.5 }}>
          {especial.ligacao}{especial.ref ? ` (${especial.ref})` : ''}
        </p>
      </div>
      <TextoBiblico leitura={especial.leitura} />
      <Cartao style={{ marginTop: 20 }}>
        <label style={{ display: 'block' }}>
          <span style={{ display: 'block', fontSize: fs(17), fontWeight: 700, marginBottom: 8, lineHeight: 1.45 }}>⏸️ O que este salmo mostra sobre Jesus e sobre o que ele fez por você?</span>
          <CampoTexto valor={u.caderno[chave]?.deus_falou ?? ''} onMudar={t => u.setCaderno(chave, 'deus_falou', t)} />
        </label>
      </Cartao>
      <p style={{ marginTop: 16, fontSize: 14, color: C.textoFraco, textAlign: 'center' }}>O plano normal continua no mesmo lugar. Esta é uma leitura a mais.</p>
    </article>
  );
}

