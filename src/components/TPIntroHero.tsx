import type { ReactNode } from 'react';
import { GOLD, SKY, BLUE, GREEN } from './AulaKit';

/* Teologia Política · abertura animada das aulas.
   Emblema SVG (órbitas convergindo na balança) + equação em três passos. */

const CSS = `
.th{position:relative;overflow:hidden;border-bottom:1px solid ${GOLD}30;background:radial-gradient(ellipse 55% 70% at 78% 40%,${GOLD}26,transparent 65%),radial-gradient(ellipse 40% 60% at 10% 90%,${SKY}14,transparent 70%),linear-gradient(180deg,#040917,#060d1f)}
.th-grade{position:absolute;inset:0;pointer-events:none;opacity:.07;background-image:linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse 80% 80% at 60% 40%,#000,transparent)}
.th-in{position:relative;max-width:1180px;margin:0 auto;padding:clamp(100px,12vw,124px) clamp(16px,4vw,40px) clamp(36px,5vw,56px)}
.th-topo{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:clamp(20px,4vw,48px);align-items:center}
.th-voltar{all:unset;cursor:pointer;font-size:15px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:${GOLD};display:inline-flex;gap:8px;padding:8px 16px;border-radius:999px;border:1px solid ${GOLD}45;background:${GOLD}0d;margin-bottom:28px;transition:background .2s}
.th-voltar:hover{background:${GOLD}22}
.th-tags{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:18px}
.th-tag{font-family:var(--font-mono);font-size:13.5px;font-weight:700;letter-spacing:.12em;padding:6px 12px;border-radius:8px;color:${GOLD};background:${GOLD}14;border:1px solid ${GOLD}45}
.th-sobre{font-family:var(--font-cinzel);font-size:clamp(15px,1.6vw,17px);letter-spacing:.32em;color:${GOLD}cc;margin-bottom:10px}
.th h1{margin:0 0 16px;font-family:var(--font-cinzel);font-weight:800;font-size:clamp(36px,6vw,66px);line-height:1.05;letter-spacing:-.01em;background:linear-gradient(100deg,#fff 30%,${GOLD} 60%,#fff 90%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:th-brilho 7s ease-in-out infinite}
.th-sub{margin:0 0 24px;font-size:clamp(19px,2.3vw,23px);line-height:1.6;color:rgba(235,240,255,.9);max-width:620px}
.th-sub b{font-weight:800}
.th-cit{margin:0;padding:14px 18px;border-left:3px solid ${GOLD};border-radius:0 14px 14px 0;background:linear-gradient(90deg,${GOLD}14,transparent);font-family:var(--font-garamond);font-style:italic;font-size:clamp(19px,2.2vw,23px);line-height:1.5;color:#fff;max-width:620px}
.th-cit-ref{display:block;margin-top:4px;font-family:var(--font-mono);font-style:normal;font-size:13px;letter-spacing:.1em;color:${GOLD}}

.th-emb{position:relative;width:min(100%,460px);margin:0 auto;aspect-ratio:1}
.th-emb svg{width:100%;height:100%;overflow:visible}
.th-gira{transform-origin:250px 250px;animation:th-gira 60s linear infinite}
.th-gira-r{transform-origin:250px 250px;animation:th-gira 38s linear infinite reverse}
.th-orb{transform-origin:250px 250px;animation:th-gira 24s linear infinite}
.th-orb-c{transform-box:fill-box;transform-origin:center;animation:th-gira 24s linear infinite reverse}
.th-pulso{transform-origin:250px 250px;animation:th-pulso 3.2s ease-in-out infinite}
.th-feixe{stroke-dasharray:6 10;animation:th-flui 1.6s linear infinite}

.th-eq{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1.25fr);align-items:stretch;gap:clamp(8px,1.4vw,14px);margin-top:clamp(28px,4vw,44px)}
.th-termo{all:unset;cursor:pointer;box-sizing:border-box;position:relative;overflow:hidden;display:flex;flex-direction:column;gap:4px;padding:clamp(14px,2vw,20px);border-radius:18px;background:linear-gradient(160deg,color-mix(in srgb,var(--e) 18%,transparent),rgba(6,12,30,.85) 70%);border:1px solid color-mix(in srgb,var(--e) 50%,transparent);opacity:0;animation:th-sobe .7s ease forwards;transition:transform .25s,box-shadow .25s}
.th-termo:hover,.th-termo:focus-visible{transform:translateY(-4px);box-shadow:0 14px 36px color-mix(in srgb,var(--e) 30%,transparent)}
.th-termo::after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 35%,rgba(255,255,255,.09) 50%,transparent 65%);transform:translateX(-100%);animation:th-varre 5s ease-in-out infinite;animation-delay:inherit}
.th-n{font-family:var(--font-mono);font-size:12.5px;font-weight:700;letter-spacing:.14em;color:var(--e)}
.th-gr{font-family:var(--font-garamond);font-size:clamp(22px,2.6vw,28px);color:var(--e);line-height:1.15}
.th-pt{font-size:clamp(18px,2vw,21px);font-weight:900;color:#fff}
.th-ds{font-size:clamp(14.5px,1.5vw,15.5px);line-height:1.5;color:rgba(230,238,255,.8)}
.th-ir{margin-top:auto;padding-top:6px;font-size:13.5px;font-weight:800;color:var(--e)}
.th-op{display:flex;align-items:center;justify-content:center;font-size:clamp(26px,3vw,34px);font-weight:900;color:rgba(255,255,255,.55);opacity:0;animation:th-sobe .7s ease forwards}
.th-eq-grade{grid-template-columns:repeat(4,minmax(0,1fr))}
.th-termo.th-final{border-width:2px;border-color:${GOLD};box-shadow:0 0 36px ${GOLD}30}

@keyframes th-gira{to{transform:rotate(360deg)}}
@keyframes th-pulso{0%,100%{transform:scale(1);opacity:.55}50%{transform:scale(1.12);opacity:1}}
@keyframes th-flui{to{stroke-dashoffset:-32}}
@keyframes th-sobe{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes th-brilho{0%,100%{background-position:100% 0}50%{background-position:0 0}}
@keyframes th-varre{0%,60%{transform:translateX(-100%)}100%{transform:translateX(100%)}}

@media(max-width:900px){
  .th-topo{grid-template-columns:1fr}
  .th-emb{width:min(100%,360px);margin-top:8px}
  .th-eq{grid-template-columns:1fr}
  .th-eq-grade{grid-template-columns:repeat(2,minmax(0,1fr))}
  .th-op{transform:none;height:26px}
}
@media(max-width:560px){.th-eq-grade{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){
  .th *, .th *::after{animation:none!important;opacity:1!important}
}
`;

export interface NoOrbita { icone: string; rotulo: string; cor: string }
export interface CardHero { n: string; tipo: string; gr: string; pt: string; ds: string; cor: string; id: string; final?: boolean }

function Emblema({ anel, nos, centro }: { anel: string; nos: NoOrbita[]; centro: string }) {
  const R = 160;
  return (
    <div className="th-emb" aria-hidden="true">
      <svg viewBox="0 0 500 500">
        <defs>
          <radialGradient id="th-nucleo" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#fff3c4" />
            <stop offset="45%" stopColor={GOLD} />
            <stop offset="100%" stopColor="#7a5200" />
          </radialGradient>
          <radialGradient id="th-aura">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.55" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </radialGradient>
          <path id="th-circ" d="M250,250 m-212,0 a212,212 0 1,1 424,0 a212,212 0 1,1 -424,0" />
        </defs>

        {/* anel com o vocabulário da aula */}
        <g className="th-gira">
          <circle cx="250" cy="250" r="232" fill="none" stroke={`${GOLD}40`} strokeWidth="1" />
          <text fill={`${GOLD}bb`} fontSize="15.5" fontWeight="700" letterSpacing="3.2" style={{ fontFamily: 'var(--font-mono)' }}>
            <textPath href="#th-circ" textLength="1328" lengthAdjust="spacing">{anel}</textPath>
          </text>
        </g>

        {/* anel tracejado em sentido contrário */}
        <g className="th-gira-r">
          <circle cx="250" cy="250" r="186" fill="none" stroke={`${SKY}45`} strokeWidth="1.5" strokeDasharray="2 9" />
          {[0, 90, 180, 270].map(g => (
            <circle key={g} cx={250 + 186 * Math.cos((g * Math.PI) / 180)} cy={250 + 186 * Math.sin((g * Math.PI) / 180)} r="4" fill={SKY} />
          ))}
        </g>

        {/* aura e núcleo */}
        <circle className="th-pulso" cx="250" cy="250" r="110" fill="url(#th-aura)" />
        <circle cx="250" cy="250" r="58" fill="url(#th-nucleo)" stroke="#fff6" strokeWidth="2" />
        <text x="250" y="266" textAnchor="middle" fontSize="46">{centro}</text>

        {/* órbitas: cada nó envia um feixe ao centro */}
        <g className="th-orb">
          {nos.map((no, i) => {
            const ang = Math.PI + (i * 2 * Math.PI) / nos.length;
            const c = Math.cos(ang), s2 = Math.sin(ang);
            return (
              <g key={no.rotulo}>
                <path className="th-feixe" d={`M${250 + (R - 40) * c},${250 + (R - 40) * s2} L${250 + 62 * c},${250 + 62 * s2}`} stroke={no.cor} strokeWidth="2.5" fill="none" />
                <g transform={`translate(${250 + R * c} ${250 + R * s2})`}>
                  <g className="th-orb-c">
                    <circle r="40" fill="#0a1630" stroke={no.cor} strokeWidth="2.5" />
                    <text y="-4" textAnchor="middle" fontSize="22">{no.icone}</text>
                    <text y="20" textAnchor="middle" fontSize="12" fontWeight="800" fill={no.cor}>{no.rotulo}</text>
                  </g>
                </g>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export function HeroAula({ onVoltar, tags, titulo, children, anel, nos, centro = '⚖️', cards, ops, dica }: {
  onVoltar: () => void; tags: string[]; titulo: string; children: ReactNode;
  anel: string; nos: NoOrbita[]; centro?: string; cards: CardHero[]; ops?: string[]; dica: string;
}) {
  const ir = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <header className="th">
      <style>{CSS}</style>
      <div className="th-grade" />
      <div className="th-in">
        <div className="th-topo">
          <div>
            <button className="th-voltar" onClick={onVoltar}>← Teologia Política</button>
            <div className="th-tags">
              {tags.map(t => <span key={t} className="th-tag">{t}</span>)}
            </div>
            <div className="th-sobre">CURSO DE TEOLOGIA POLÍTICA</div>
            <h1>{titulo}</h1>
            {children}
          </div>
          <Emblema anel={anel} nos={nos} centro={centro} />
        </div>

        <div className={ops ? 'th-eq' : 'th-eq th-eq-grade'}>
          {cards.map((c, i) => (
            <div key={c.n} style={{ display: 'contents' }}>
              {ops && i > 0 && <div className="th-op" style={{ animationDelay: `${0.2 + i * 0.25}s` }}>{ops[i - 1]}</div>}
              <button className={'th-termo' + (c.final ? ' th-final' : '')} onClick={() => ir(c.id)}
                style={{ ['--e' as string]: c.cor, animationDelay: `${0.1 + i * 0.2}s` }}>
                <span className="th-n">{c.n} · {c.tipo}</span>
                <span className="th-gr">{c.gr}</span>
                <span className="th-pt">{c.pt}</span>
                <span className="th-ds">{c.ds}</span>
                <span className="th-ir">Ir para a seção ↓</span>
              </button>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center', fontSize: 14.5, color: 'rgba(230,238,255,.65)', textAlign: 'center' }}>
          <span style={{ flexShrink: 0, width: 8, height: 8, borderRadius: '50%', background: GREEN, boxShadow: `0 0 10px ${GREEN}` }} />
          {dica}
        </div>
      </div>
    </header>
  );
}

export default function HeroIntro({ onVoltar }: { onVoltar: () => void }) {
  return (
    <HeroAula onVoltar={onVoltar} tags={['AULA INTRODUTÓRIA', 'CONCEITOS', '90 MIN']} titulo="O que é Teologia Política?"
      anel="THEOS · LOGOS · POLIS · IUSTITIA · BONUM COMMUNE · SOLI DEO GLORIA · "
      nos={[{ icone: '📖', rotulo: 'TEOLOGIA', cor: SKY }, { icone: '🏛️', rotulo: 'POLÍTICA', cor: BLUE }]}
      ops={['+', '=']} dica="Toque em um conceito para ir direto à seção"
      cards={[
        { n: '01', tipo: 'CONCEITO', gr: 'θεός + λόγος', pt: 'Teologia', ds: 'O discurso sobre Deus e todas as coisas em relação a Ele', cor: SKY, id: 'teologia' },
        { n: '02', tipo: 'CONCEITO', gr: 'πόλις', pt: 'Política', ds: 'A arte de ordenar a vida comum para a justiça e o bem comum', cor: BLUE, id: 'politica' },
        { n: '03', tipo: 'SÍNTESE', gr: '⚖️', pt: 'Teologia Política', ds: 'A cidade dos homens pensada à luz da Palavra, sob o senhorio de Cristo', cor: GOLD, id: 'teologia-politica', final: true },
      ]}>
      <p className="th-sub">
        Teologia, política e teologia política: definições à luz dos grandes teólogos <b style={{ color: GOLD }}>reformados</b> e <b style={{ color: SKY }}>escolásticos</b>.
      </p>
      <blockquote className="th-cit">
        “Procurai a paz da cidade… e orai por ela ao Senhor; porque na sua paz vós tereis paz.”
        <span className="th-cit-ref">JEREMIAS 29.7</span>
      </blockquote>
    </HeroAula>
  );
}
