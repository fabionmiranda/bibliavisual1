import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { type ConteudoDia, type EntradaPlano, leituraExtenso } from '../../data/falaAlma';
import { C, SERIFA, SANS, rotuloCaixaAlta, useFs } from './base';
import { abrirPdf, abrirWhatsApp, textoWhatsApp } from './exportar';

/* ─── Mande para alguém: WhatsApp e PDF ──────────────────────────────────── */
export function Compartilhar({ e, c }: { e: EntradaPlano; c: ConteudoDia }) {
  const fs = useFs();
  const [aviso, setAviso] = useState('');
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const avisar = (t: string) => {
    setAviso(t);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAviso(''), 5000);
  };
  const url = () => window.location.href;
  const leitura = leituraExtenso(e.leitura ?? '');

  const whatsapp = () => abrirWhatsApp(textoWhatsApp(e, c, url()));

  const pdf = () => {
    if (!abrirPdf(e, c, url())) avisar('O navegador bloqueou a nova aba. Permita pop-ups para este site e tente de novo.');
    else avisar('A folha abriu numa nova aba. Escolha "Salvar como PDF" para guardar ou enviar.');
  };

  return (
    <section className="fa-sem-impressao" aria-labelledby="mande-titulo"
      style={{ marginTop: 32, padding: '24px 18px 18px', borderRadius: 20, textAlign: 'center', background: `radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.14), transparent 70%), ${C.cartao}`, border: '1px solid rgba(212,175,55,0.38)' }}>
      <div id="mande-titulo" style={{ ...rotuloCaixaAlta(C.dourado), marginBottom: 10 }}>💌 Mande para alguém</div>
      <p style={{ margin: '0 auto 6px', maxWidth: 480, textAlign: 'center', fontFamily: SERIFA, fontSize: fs(23), lineHeight: 1.4, color: C.texto }}>“{c.frase_do_dia}”</p>
      <p style={{ margin: '0 auto 18px', fontSize: fs(15), color: C.textoSuave }}>{leitura} · Quem você conhece que precisa ouvir isso hoje?</p>

      <button type="button" onClick={whatsapp} className="fa-botao"
        style={{ ...base, width: '100%', minHeight: 54, color: '#fff', background: '#1FAF57', border: '1px solid #25D366', fontSize: 17, boxShadow: '0 8px 24px rgba(37,211,102,0.22)' }}>
        <IconeWhatsApp /> Enviar resumo pelo WhatsApp
      </button>

      <button type="button" onClick={pdf} className="fa-botao" aria-label="PDF: folha de estudo para imprimir ou enviar"
        style={{ ...base, width: '100%', minHeight: 54, marginTop: 10, fontSize: 17, color: C.ciano, background: C.cianoSuave, border: '1px solid rgba(0,229,255,0.40)' }}>
        <span aria-hidden style={{ fontSize: 22 }}>📄</span> Gerar PDF do devocional
      </button>

      <div role="status" aria-live="polite" style={{ minHeight: 22, marginTop: 12, fontSize: 14, color: C.textoSuave }}>{aviso}</div>
    </section>
  );
}

const base: CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '0 16px', borderRadius: 14,
  fontWeight: 800, fontFamily: SANS, cursor: 'pointer',
};

function IconeWhatsApp() {
  return (
    <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}
