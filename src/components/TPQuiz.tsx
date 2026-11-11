import { useState } from 'react';
import { GREEN, RED, PURPLE, Rico } from './AulaKit';

/* Pergunta provocadora de múltipla escolha, exibida ao fim de cada infográfico.
   O aluno escolhe, recebe o retorno na hora e vê o gabarito comentado com a referência. */

export interface Pergunta { pergunta: string; opcoes: string[]; certa: number; gabarito: string; ref: string }

const CSS = `
.tq{margin-top:clamp(16px,2.6vw,22px);padding:clamp(16px,2.6vw,22px);border-radius:18px;background:linear-gradient(135deg,${PURPLE}1c,rgba(0,0,0,.32) 70%);border:1.5px dashed ${PURPLE}90}
.tq-selo{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-mono);font-size:12.5px;font-weight:700;letter-spacing:.14em;color:${PURPLE};margin-bottom:10px}
.tq-selo i{font-style:normal;width:8px;height:8px;border-radius:50%;background:${PURPLE};box-shadow:0 0 10px ${PURPLE};animation:tq-pisca 1.6s ease-in-out infinite}
.tq-p{margin:0 0 14px;font-size:clamp(17.5px,2vw,20px);font-weight:800;line-height:1.5;color:#fff}
.tq-ops{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:10px}
.tq-op{all:unset;box-sizing:border-box;cursor:pointer;display:flex;gap:12px;align-items:flex-start;padding:12px 14px;border-radius:12px;background:rgba(255,255,255,.04);border:1.5px solid rgba(255,255,255,.12);font-size:clamp(15px,1.65vw,16.5px);line-height:1.5;color:rgba(235,240,255,.92);transition:transform .15s,border-color .15s,background .15s}
.tq-op:hover:not([disabled]),.tq-op:focus-visible{transform:translateY(-2px);border-color:${PURPLE};background:${PURPLE}14}
.tq-op[disabled]{cursor:default}
.tq-op b{flex-shrink:0;width:26px;height:26px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:13px;color:#0a0f1e;background:rgba(255,255,255,.7)}
.tq-op.tq-certa{border-color:${GREEN};background:${GREEN}1c}
.tq-op.tq-certa b{background:${GREEN}}
.tq-op.tq-errada{border-color:${RED};background:${RED}1a}
.tq-op.tq-errada b{background:${RED}}
.tq-op.tq-apagada{opacity:.45}
.tq-ret{margin-top:14px;padding:14px 16px;border-radius:14px;background:rgba(0,0,0,.35);border-left:4px solid var(--r);animation:tq-sobe .35s ease}
.tq-ret-t{font-size:clamp(16px,1.8vw,18px);font-weight:900;color:var(--r);margin-bottom:6px}
.tq-ret-g{font-family:var(--font-mono);font-size:12.5px;font-weight:700;letter-spacing:.12em;color:${GREEN};margin:10px 0 4px}
.tq-ret p{margin:0;font-size:clamp(15px,1.65vw,16.5px);line-height:1.7;color:rgba(230,238,255,.9)}
.tq-ref{margin-top:10px;font-family:var(--font-mono);font-size:13px;font-weight:700;color:${PURPLE}}
.tq-de-novo{all:unset;cursor:pointer;margin-top:12px;display:inline-flex;gap:6px;font-size:14px;font-weight:800;color:${PURPLE};padding:6px 12px;border-radius:999px;border:1px solid ${PURPLE}60}
.tq-de-novo:hover{background:${PURPLE}1a}
@keyframes tq-pisca{0%,100%{opacity:.35}50%{opacity:1}}
@keyframes tq-sobe{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media(prefers-reduced-motion:reduce){.tq *{animation:none!important;transition:none!important}}
`;

export function EstilosQuiz() {
  return <style>{CSS}</style>;
}

export function Quiz({ q }: { q: Pergunta }) {
  const [resp, setResp] = useState<number | null>(null);
  const acertou = resp === q.certa;
  return (
    <div className="tq">
      <div className="tq-selo"><i />🤔 PARE E PENSE · ESCOLHA UMA RESPOSTA</div>
      <p className="tq-p"><Rico t={q.pergunta} /></p>
      <div className="tq-ops" role="group">
        {q.opcoes.map((o, i) => {
          let cls = 'tq-op';
          if (resp !== null) {
            if (i === q.certa) cls += ' tq-certa';
            else if (i === resp) cls += ' tq-errada';
            else cls += ' tq-apagada';
          }
          return (
            <button key={i} className={cls} disabled={resp !== null} onClick={() => setResp(i)} aria-pressed={resp === i}>
              <b>{String.fromCharCode(65 + i)}</b><span>{o}</span>
            </button>
          );
        })}
      </div>
      {resp !== null && (
        <div className="tq-ret" style={{ ['--r' as string]: acertou ? GREEN : RED }} aria-live="polite">
          <div className="tq-ret-t">{acertou ? '✓ Isso mesmo!' : `✕ Ainda não. A resposta é a letra ${String.fromCharCode(65 + q.certa)}.`}</div>
          <div className="tq-ret-g">✓ GABARITO COMENTADO</div>
          <p><Rico t={q.gabarito} /></p>
          <div className="tq-ref notranslate" translate="no">📚 {q.ref}</div>
          <button className="tq-de-novo" onClick={() => setResp(null)}>↺ Responder de novo</button>
        </div>
      )}
    </div>
  );
}
