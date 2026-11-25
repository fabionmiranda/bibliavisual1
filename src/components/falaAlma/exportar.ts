/* ─── Conselheiro da Alma: exportar o dia ─────────────────────────────────────────────
   • textoWhatsApp: resumo do dia formatado para o WhatsApp (*negrito*, _itálico_)
   • abrirPdf:      folha A4 elegante para imprimir ou salvar em PDF                */
import { type ConteudoDia, type EntradaPlano, estacaoDe, leituraExtenso, rotuloData, MESES, mesIndice } from '../../data/falaAlma';

/** Remove o Markdown simples (*itálico*, **negrito**). */
export const semMarkdown = (t: string) => t.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1');

/** As duas primeiras frases da oração (para resumos). */
function inicioOracao(oracao: string, frases = 2) {
  const partes = oracao.match(/[^.!?]+[.!?]+/g) ?? [oracao];
  const trecho = partes.slice(0, frases).join('').trim();
  return partes.length > frases ? `${trecho} …` : trecho;
}

/** Versículos citados nas falas: *"texto"* (ref). Referências "v.3" viram "Sl 137.3". */
export function versiculosDaFase(falas: { texto: string }[], leitura: string) {
  const cap = leitura.match(/Sl\s*(\d+)/)?.[1] ?? '';
  const lista: { texto: string; ref: string }[] = [];
  for (const f of falas) {
    const limpo = f.texto.replace(/\*\*([^*]+)\*\*/g, '$1');
    for (const m of limpo.matchAll(/\*"([^"]+)"\*\s*\(([^)]*\d[^)]*)\)/g)) {
      const ref = m[2].replace(/^v\.\s*/, `Sl ${cap}.`);
      lista.push({ texto: m[1], ref });
    }
  }
  return lista;
}

function cabecalho(e: EntradaPlano) {
  return `Dia ${e.dia_do_ano} · ${rotuloData(e.data)} · ${leituraExtenso(e.leitura ?? '')}`;
}

/* ─── WhatsApp ────────────────────────────────────────────────────────────── */
export function textoWhatsApp(e: EntradaPlano, c: ConteudoDia, url: string) {
  const est = estacaoDe(e);
  const passos = c.fases.find(f => f.lista)?.lista ?? [];
  const linhas = [
    `${c.emoji} *${c.titulo}*`,
    `📅 ${rotuloData(e.data)} · ${leituraExtenso(e.leitura ?? '')}`,
    `_${est.emoji} ${est.nome} · Semana ${e.semana}: ${e.nome_semana}_`,
    '',
    `❓ *Pergunta do dia:* ${c.pergunta}`,
    '',
    `💬 _"${c.frase_do_dia}"_`,
    '',
    '📖 *O caminho da conversa:*',
    ...c.fases.map(f => `${f.numero}. ${f.emoji} ${f.fase}: ${f.titulo}`),
  ];
  const versos = c.fases.flatMap(f => versiculosDaFase(f.falas, e.leitura ?? '')).filter(v => v.ref.startsWith('Sl')).slice(0, 2);
  if (versos.length) linhas.push('', '✨ *Para guardar no coração:*', ...versos.map(v => `"${v.texto}" (${v.ref})`));
  if (passos.length) linhas.push('', '✅ *Para praticar:*', ...passos.map(p => `• ${semMarkdown(p)}`));
  linhas.push('', `🙏 *Oração:* ${inicioOracao(c.oracao)}`);
  if (c.nota_cuidado) linhas.push('', '💛 Se a dor estiver pesada demais, procure seu pastor e um profissional de saúde.');
  linhas.push('', `Leia o ${leituraExtenso(e.leitura ?? '')} e faça a conversa completa:`, url, '', '_Conselheiro da Alma: 365 conversas nos Salmos para o coração cansado_');
  return linhas.join('\n');
}

export function abrirWhatsApp(texto: string) {
  window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
}

/* ─── PDF (folha A4 para imprimir ou salvar) ──────────────────────────────── */
const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const negrito = (t: string) => esc(t).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');

export function htmlPdf(e: EntradaPlano, c: ConteudoDia, url: string) {
  const est = estacaoDe(e);
  const passos = c.fases.find(f => f.lista)?.lista ?? [];
  const fases = c.fases.filter(f => f.numero <= 6).map(f => {
    const versos = versiculosDaFase(f.falas, e.leitura ?? '');
    return `
      <div class="fase">
        <div class="fase-cab"><span class="num">${f.numero}</span><span class="nome">${f.emoji} ${esc(f.fase)}</span><span class="tit">${esc(f.titulo)}</span></div>
        ${versos.map(v => `<p class="verso">“${esc(v.texto)}” <span>(${esc(v.ref)})</span></p>`).join('')}
        ${f.pergunta_pausa ? `<p class="pensar"><b>Para pensar:</b> ${esc(f.pergunta_pausa)}</p><div class="linha"></div>` : ''}
      </div>`;
  }).join('');

  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Conselheiro da Alma · ${esc(rotuloData(e.data))} · ${esc(leituraExtenso(e.leitura ?? ''))}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 14mm 14mm 16mm; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { margin: 0; font-family: 'Space Grotesk', system-ui, sans-serif; color: #14213D; background: #fff; font-size: 11.5pt; line-height: 1.5; }
  .folha { max-width: 760px; margin: 0 auto; padding: 24px 20px 40px; }
  .faixa { background: #0A1628; color: #EAF2FF; border-radius: 14px; padding: 18px 22px; display: flex; justify-content: space-between; align-items: center; gap: 12px; }
  .faixa .marca { font-family: 'Space Grotesk', sans-serif; font-size: 22pt; font-weight: 700; letter-spacing: -.02em; line-height: 1; } .faixa .marca i { color: #D4AF37; font-style: normal; }
  .faixa .info { text-align: right; font-family: 'Space Grotesk', sans-serif; letter-spacing: .04em; font-size: 8pt; color: #BFEFFF; line-height: 1.5; }
  .titulo { text-align: center; margin: 26px 0 6px; } .titulo .emo { font-size: 34pt; line-height: 1; }
  h1 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 24pt; line-height: 1.1; margin: 8px 0 4px; color: #0A1628; }
  .sub { color: #4A5874; margin: 0; }
  .pergunta { margin: 22px 0 0; padding: 14px 18px; border-left: 5px solid #D4AF37; background: #FBF6E6; border-radius: 0 12px 12px 0; }
  .pergunta b, .rot { display: block; font-family: 'Space Grotesk', sans-serif; font-size: 7.5pt; letter-spacing: .16em; text-transform: uppercase; color: #9A7B17; margin-bottom: 4px; }
  .pergunta p { margin: 0; font-family: 'Space Grotesk', sans-serif; font-style: italic; font-size: 15pt; line-height: 1.35; }
  .frase { margin: 22px 0; text-align: center; font-family: 'Space Grotesk', sans-serif; font-size: 19pt; color: #8A6D12; }
  .leitura { display: flex; gap: 12px; align-items: center; padding: 12px 16px; border: 1px solid #CFE9F2; border-radius: 12px; background: #F2FBFE; }
  h2 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15pt; color: #0A1628; margin: 26px 0 10px; padding-bottom: 6px; border-bottom: 2px solid #00B8D4; }
  .fase { padding: 10px 0 12px; border-bottom: 1px dashed #D5DCE8; break-inside: avoid; }
  .fase-cab { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
  .num { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 99px; background: #0A1628; color: #00E5FF; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 8.5pt; }
  .nome { font-family: 'Space Grotesk', sans-serif; font-size: 8.5pt; letter-spacing: .1em; text-transform: uppercase; font-weight: 700; color: #007C91; } .tit { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 12.5pt; }
  .verso { margin: 6px 0 0 30px; font-family: 'Space Grotesk', sans-serif; font-style: italic; font-size: 12.5pt; color: #7A5F0E; } .verso span { font-style: normal; font-family: 'Space Grotesk', sans-serif; font-size: 9pt; color: #6B7790; }
  .pensar { margin: 6px 0 0 30px; } .linha { margin: 10px 0 0 30px; border-bottom: 1px solid #C9D1DE; height: 18px; }
  ol.passos { margin: 0; padding-left: 0; list-style: none; counter-reset: p; } ol.passos li { counter-increment: p; position: relative; padding: 8px 0 8px 36px; border-bottom: 1px solid #EEF1F6; }
  ol.passos li::before { content: counter(p); position: absolute; left: 0; top: 8px; width: 24px; height: 24px; border-radius: 99px; background: #00E5FF; color: #0A1628; font-weight: 700; font-size: 10pt; display: flex; align-items: center; justify-content: center; }
  .oracao { padding: 16px 20px; border-radius: 12px; background: #0A1628; color: #F5ECCF; font-family: 'Space Grotesk', sans-serif; font-style: italic; font-size: 13.5pt; line-height: 1.55; break-inside: avoid; }
  .caderno div { margin-top: 10px; } .caderno b { color: #007C91; } .caderno .linha { margin-left: 0; }
  .cuidado { margin-top: 18px; padding: 12px 16px; border-radius: 10px; background: #FDEDED; border: 1px solid #F3B4B4; font-size: 10pt; }
  .rodape { margin-top: 26px; text-align: center; font-size: 9pt; color: #6B7790; }
  .acoes { position: sticky; top: 0; background: #fff; padding: 10px 0; text-align: center; border-bottom: 1px solid #eee; }
  .acoes button { font: inherit; font-weight: 700; padding: 10px 18px; border-radius: 10px; border: 0; background: #0A1628; color: #00E5FF; cursor: pointer; }
  @media print { .acoes { display: none; } .folha { padding: 0; } }
</style></head><body>
<div class="acoes"><button onclick="window.print()">🖨️ Salvar em PDF / imprimir</button></div>
<div class="folha">
  <div class="faixa">
    <div class="marca">Conselheiro <i>da Alma</i></div>
    <div class="info">${esc(cabecalho(e))}<br>${est.emoji} ${esc(est.nome)} · ${esc(MESES[mesIndice(e.data)])}: ${esc(e.tema_mes)}<br>Semana ${e.semana}: ${esc(e.nome_semana)}</div>
  </div>
  <div class="titulo"><div class="emo">${c.emoji}</div><h1>${esc(c.titulo)}</h1><p class="sub">${esc(c.subtitulo)}</p></div>
  <div class="pergunta"><b>❓ Pergunta do dia</b><p>${esc(c.pergunta)}</p></div>
  <div class="frase">“${esc(c.frase_do_dia)}”</div>
  <div class="leitura">📖 <span>Antes de tudo, leia o <b>${esc(leituraExtenso(e.leitura ?? ''))}</b> com calma, em voz baixa se puder. Depois leia de novo, prestando atenção nas imagens.</span></div>
  <h2>💬 O caminho da conversa</h2>
  ${fases}
  <h2>✅ Para praticar</h2>
  <ol class="passos">${passos.map(p => `<li>${negrito(p)}</li>`).join('')}</ol>
  <h2>🙏 Oração</h2>
  <div class="oracao">${negrito(c.oracao)}</div>
  <h2>📓 Meu caderno</h2>
  <div class="caderno">
    <div><b>O que eu senti hoje</b><div class="linha"></div><div class="linha"></div></div>
    <div><b>O que eu pensei</b><div class="linha"></div><div class="linha"></div></div>
    <div><b>O que Deus me falou</b><div class="linha"></div><div class="linha"></div></div>
  </div>
  ${c.nota_cuidado ? '<div class="cuidado">💛 Se você está passando por uma tristeza que não passa, pensamentos de morte ou uma dor que paralisa, procure seu pastor ou conselheiro e também um profissional de saúde.</div>' : ''}
  <div class="rodape">Conselheiro da Alma · 365 conversas nos Salmos para o coração cansado<br>${esc(url)}</div>
</div>
<script>
  window.addEventListener('load', function () {
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () { setTimeout(function () { window.print(); }, 300); });
  });
</script>
</body></html>`;
}

/** Abre a folha numa nova aba (com o diálogo de impressão/PDF). Devolve false se o navegador bloquear. */
export function abrirPdf(e: EntradaPlano, c: ConteudoDia, url: string) {
  const blob = new Blob([htmlPdf(e, c, url)], { type: 'text/html;charset=utf-8' });
  const href = URL.createObjectURL(blob);
  const janela = window.open(href, '_blank');
  window.setTimeout(() => URL.revokeObjectURL(href), 60_000);
  return !!janela;
}
