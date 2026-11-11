import type { ReactNode } from 'react';
import { GOLD, SKY, ROSE, GREEN, BLUE, PURPLE, RED } from './AulaKit';
import { Quiz, EstilosQuiz, type Pergunta } from './TPQuiz';
import { QI } from './TPPerguntas';

/* Teologia Política · Aula Introdutória — infográficos didáticos.
   Tudo é HTML/CSS ou SVG com viewBox: escala e reorganiza em qualquer tela. */

const CSS = `
.tg-fig{margin:0;border-radius:20px;padding:clamp(18px,3vw,30px);background:linear-gradient(160deg,rgba(255,255,255,0.035),rgba(6,12,30,0.7));border:1px solid var(--c);position:relative;overflow:hidden}
.tg-fig::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.06;background-image:linear-gradient(var(--c) 1px,transparent 1px),linear-gradient(90deg,var(--c) 1px,transparent 1px);background-size:32px 32px}
.tg-fig>*{position:relative}
.tg-cab{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 14px;margin-bottom:clamp(16px,2.6vw,24px)}
.tg-selo{font-family:var(--font-mono);font-size:13px;font-weight:700;letter-spacing:.14em;color:#0a0f1e;background:var(--c);padding:3px 9px;border-radius:7px}
.tg-tit{font-size:clamp(19px,2.3vw,23px);font-weight:900;color:#fff;line-height:1.25}
.tg-leg{margin-top:clamp(14px,2.4vw,20px);font-size:clamp(15.5px,1.7vw,17px);line-height:1.65;color:rgba(230,238,255,.85)}
.tg-leg b{color:var(--c)}
.tg-svg{display:block;width:100%;height:auto;max-width:var(--mx,100%);margin:0 auto}
.tg-svg text{font-family:inherit}

/* eras */
.tg-eras{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;position:relative}
.tg-eras::before{content:"";position:absolute;left:4%;right:4%;top:15px;height:3px;border-radius:3px;background:linear-gradient(90deg,${SKY},${PURPLE},${GOLD},${GREEN},${ROSE})}
.tg-era{display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px}
.tg-era-pt{width:32px;height:32px;border-radius:50%;background:#060d1f;border:3px solid var(--e);box-shadow:0 0 16px var(--e);flex-shrink:0}
.tg-era-n{font-family:var(--font-mono);font-size:12.5px;font-weight:700;letter-spacing:.1em;color:var(--e)}
.tg-era-s{font-size:13.5px;color:rgba(230,238,255,.7)}
.tg-era-box{width:100%;display:flex;flex-direction:column;gap:6px;padding:10px;border-radius:12px;background:rgba(0,0,0,.28);border-top:3px solid var(--e)}
.tg-era-box span{font-size:clamp(15px,1.6vw,16.5px);font-weight:800;color:#fff;line-height:1.3}
.tg-era-box small{display:block;font-weight:600;font-size:13px;color:rgba(230,238,255,.65)}
@media(max-width:820px){
  .tg-eras{grid-template-columns:1fr;gap:0;padding-left:46px}
  .tg-eras::before{left:15px;right:auto;top:6px;bottom:6px;width:3px;height:auto;background:linear-gradient(180deg,${SKY},${PURPLE},${GOLD},${GREEN},${ROSE})}
  .tg-era{align-items:flex-start;text-align:left;position:relative;padding-bottom:18px}
  .tg-era-pt{position:absolute;left:-46px;top:0}
  .tg-era-box{flex-direction:row;flex-wrap:wrap;gap:6px 14px}
}

/* setas (fluxo em etapas) */
.tg-setas{display:flex;align-items:stretch;gap:0}
.tg-etapa{flex:1 1 0;min-width:0;display:flex;flex-direction:column;gap:6px;padding:14px 14px 16px;border-radius:14px;background:linear-gradient(170deg,color-mix(in srgb,var(--e) 18%,transparent),rgba(0,0,0,.3));border:1px solid color-mix(in srgb,var(--e) 45%,transparent)}
.tg-etapa-i{font-size:28px;line-height:1}
.tg-etapa-r{font-family:var(--font-mono);font-size:12.5px;font-weight:700;letter-spacing:.12em;color:var(--e)}
.tg-etapa-t{font-size:clamp(16.5px,1.8vw,18.5px);font-weight:900;color:#fff;line-height:1.25}
.tg-etapa-d{font-size:clamp(14.5px,1.55vw,15.5px);line-height:1.55;color:rgba(230,238,255,.8)}
.tg-seta{flex:0 0 auto;display:flex;align-items:center;justify-content:center;width:30px;font-size:22px;font-weight:900;color:rgba(255,255,255,.55)}
@media(max-width:760px){
  .tg-setas{flex-direction:column}
  .tg-seta{width:auto;height:30px;transform:rotate(90deg)}
}

/* arquetípica × ectípica */
.tg-arq{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:clamp(10px,2vw,20px)}
.tg-orbe{aspect-ratio:1;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:12%;gap:6px;margin:0 auto}
.tg-orbe b{font-size:clamp(17px,2vw,21px);font-weight:900;color:#fff;line-height:1.2}
.tg-orbe span{font-size:clamp(13.5px,1.45vw,15px);line-height:1.45;color:rgba(230,238,255,.85)}
.tg-orbe i{font-family:var(--font-garamond);font-size:clamp(15px,1.6vw,17px);color:var(--e)}
.tg-ponte{display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;max-width:170px}
.tg-ponte-seta{font-size:34px;color:${GOLD};line-height:1}
.tg-ponte b{font-size:15px;font-weight:900;color:${GOLD};letter-spacing:.06em}
.tg-ponte span{font-size:13.5px;color:rgba(230,238,255,.75);line-height:1.4}
@media(max-width:700px){
  .tg-arq{grid-template-columns:1fr}
  .tg-ponte{max-width:none;margin:0 auto}
  .tg-ponte-seta{transform:rotate(90deg)}
}

/* althusius */
.tg-althu{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:clamp(16px,3vw,32px);align-items:center}
.tg-althu-leg{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}
.tg-althu-leg li{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;background:rgba(0,0,0,.28);border-left:4px solid var(--e);font-size:clamp(14.5px,1.55vw,15.5px);color:rgba(230,238,255,.8)}
.tg-althu-leg li>span{flex-shrink:0;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:700;color:#0a0f1e;background:var(--e)}
.tg-althu-leg b{display:block;font-size:clamp(16px,1.7vw,17.5px);color:#fff}
@media(max-width:760px){.tg-althu{grid-template-columns:1fr}}

/* encontro teologia + política */
.tg-conf{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1.2fr) auto minmax(0,1fr);align-items:center;gap:clamp(8px,1.6vw,14px)}
.tg-conf-fonte,.tg-conf-centro{display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px;border-radius:20px;padding:clamp(16px,2.4vw,22px) clamp(12px,1.8vw,18px)}
.tg-conf-fonte{background:radial-gradient(circle at 50% 0%,color-mix(in srgb,var(--e) 26%,transparent),rgba(0,0,0,.3) 75%);border:1.5px solid var(--e)}
.tg-conf-fonte i{font-family:var(--font-garamond);font-size:clamp(18px,2vw,21px);color:var(--e)}
.tg-conf-fonte b{font-size:clamp(20px,2.3vw,24px);font-weight:900;color:var(--e)}
.tg-conf-fonte span,.tg-conf-centro span{font-size:clamp(15px,1.6vw,16.5px);line-height:1.55;color:rgba(230,238,255,.88)}
.tg-conf-fonte small{font-size:14px;line-height:1.45;color:rgba(230,238,255,.7)}
.tg-conf-fonte em{color:#fff}
.tg-conf-i{font-size:34px;line-height:1.1}
.tg-conf-centro{padding:clamp(20px,3vw,30px) clamp(14px,2vw,22px);background:radial-gradient(circle at 50% 30%,${GOLD}40,rgba(0,0,0,.35) 80%);border:2px solid ${GOLD};box-shadow:0 0 40px ${GOLD}35}
.tg-conf-centro b{font-size:clamp(22px,2.6vw,27px);font-weight:900;color:#fff}
.tg-conf-centro strong{color:${GOLD}}
.tg-conf-seta{font-size:30px;font-weight:900;line-height:1}
.tg-conf-b{transform:scaleX(-1)}
@media(max-width:820px){
  .tg-conf{grid-template-columns:1fr}
  .tg-conf-seta{justify-self:center}
  .tg-conf-a{transform:rotate(90deg)}
  .tg-conf-b{transform:rotate(-90deg)}
}

/* referências ABNT */
.tg-refs{margin-top:clamp(14px,2.4vw,20px);padding-top:14px;border-top:1px dashed color-mix(in srgb,var(--c) 45%,transparent)}
.tg-refs-t{font-family:var(--font-mono);font-size:12.5px;font-weight:700;letter-spacing:.14em;color:var(--c);margin-bottom:8px}
.tg-refs ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}
.tg-refs li{position:relative;padding-left:16px;font-size:clamp(13.5px,1.45vw,14.5px);line-height:1.6;color:rgba(230,238,255,.78)}
.tg-refs li b{color:#fff;font-weight:800}
.tg-refs li::before{content:"▸";position:absolute;left:0;color:var(--c)}

/* esferas de Kuyper */
.tg-trono{max-width:420px;margin:0 auto;text-align:center;padding:14px 18px;border-radius:16px;background:linear-gradient(135deg,${GOLD}30,rgba(0,0,0,.35));border:2px solid ${GOLD};box-shadow:0 0 32px ${GOLD}35}
.tg-trono b{display:block;font-size:clamp(19px,2.3vw,23px);font-weight:900;color:#fff}
.tg-trono span{font-size:14.5px;color:rgba(255,240,200,.85)}
.tg-ramos{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin-top:34px;position:relative}
.tg-ramos::before{content:"";position:absolute;left:10%;right:10%;top:-18px;height:2px;background:${GOLD}80}
.tg-trono-liga{width:2px;height:16px;background:${GOLD}80;margin:0 auto}
.tg-esfera{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px;padding:14px 10px;border-radius:999px 999px 18px 18px;background:radial-gradient(circle at 50% 22%,color-mix(in srgb,var(--e) 30%,transparent),rgba(0,0,0,.3) 70%);border:1.5px solid var(--e)}
.tg-esfera::before{content:"";position:absolute;top:-18px;left:50%;width:2px;height:18px;background:${GOLD}80}
.tg-esfera-i{font-size:30px;line-height:1.1}
.tg-esfera b{font-size:clamp(16px,1.7vw,17.5px);font-weight:900;color:#fff}
.tg-esfera span{font-size:13.5px;line-height:1.45;color:rgba(230,238,255,.78)}
.tg-esfera.tg-estado{box-shadow:0 0 0 3px ${BLUE}40,0 0 24px ${BLUE}50}
@media(max-width:820px){
  .tg-ramos{grid-template-columns:repeat(auto-fit,minmax(150px,1fr));margin-top:16px}
  .tg-ramos::before,.tg-esfera::before{display:none}
  .tg-esfera{border-radius:18px}
}

/* varrão × reforma */
.tg-vetores{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:16px}
.tg-vetor{display:flex;flex-direction:column;align-items:center;gap:8px;padding:18px 14px;border-radius:16px;background:rgba(0,0,0,.28);border:1.5px solid var(--e)}
.tg-vetor-cab{font-family:var(--font-mono);font-size:12.5px;font-weight:700;letter-spacing:.12em;color:var(--e);text-align:center}
.tg-no{width:100%;max-width:300px;text-align:center;padding:12px 14px;border-radius:12px;font-weight:900;font-size:clamp(16.5px,1.8vw,18px);color:#fff;background:color-mix(in srgb,var(--n) 22%,transparent);border:1px solid var(--n)}
.tg-no small{display:block;font-weight:600;font-size:13.5px;color:rgba(230,238,255,.75);margin-top:2px}
.tg-flecha{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:800;color:var(--e)}
.tg-flecha i{font-style:normal;font-size:26px;line-height:1}
.tg-veredito{text-align:center;font-size:14.5px;line-height:1.5;color:rgba(230,238,255,.85);margin-top:4px}

/* espectro */
.tg-barra{height:16px;border-radius:999px;background:linear-gradient(90deg,${ROSE},${GOLD} 50%,${PURPLE});position:relative;margin:28px 6px 18px}
.tg-barra::after{content:"⚖️";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;background:#060d1f;border:3px solid ${GOLD};box-shadow:0 0 22px ${GOLD}}
.tg-polos{display:grid;grid-template-columns:1fr 1.15fr 1fr;gap:14px}
.tg-polo{padding:14px;border-radius:14px;background:rgba(0,0,0,.28);border-top:3px solid var(--e);display:flex;flex-direction:column;gap:6px}
.tg-polo-r{font-family:var(--font-mono);font-size:12.5px;font-weight:700;letter-spacing:.12em;color:var(--e)}
.tg-polo b{font-size:clamp(17px,1.9vw,19px);font-weight:900;color:#fff}
.tg-polo span{font-size:clamp(14.5px,1.55vw,15.5px);line-height:1.55;color:rgba(230,238,255,.8)}
.tg-polo.tg-meio{background:linear-gradient(170deg,${GOLD}22,rgba(0,0,0,.3));border:1.5px solid ${GOLD};border-top-width:3px}
@media(max-width:760px){.tg-polos{grid-template-columns:1fr}.tg-polo.tg-meio{order:-1}}

/* linha do tempo do mapa */
.tg-tempo{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:10px;position:relative}
.tg-tempo::before{content:"";position:absolute;left:5%;right:5%;top:58px;height:3px;background:linear-gradient(90deg,${PURPLE},${GOLD})}
.tg-marco{display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px}
.tg-marco-ano{font-family:var(--font-mono);font-size:13px;font-weight:700;color:var(--e);height:38px;display:flex;align-items:flex-end}
.tg-marco-pt{width:22px;height:22px;border-radius:50%;background:var(--e);border:4px solid #060d1f;box-shadow:0 0 0 2px var(--e)}
.tg-marco b{font-size:clamp(15px,1.5vw,16.5px);font-weight:900;color:#fff;line-height:1.2}
.tg-marco span{font-size:13.5px;line-height:1.4;color:rgba(230,238,255,.75)}
@media(max-width:900px){
  .tg-tempo{grid-template-columns:1fr;gap:0;padding-left:44px}
  .tg-tempo::before{left:13px;right:auto;top:8px;bottom:8px;width:3px;height:auto;background:linear-gradient(180deg,${PURPLE},${GOLD})}
  .tg-marco{position:relative;align-items:flex-start;text-align:left;gap:2px;padding-bottom:16px}
  .tg-marco-ano{height:auto}
  .tg-marco-pt{position:absolute;left:-42px;top:2px}
}

/* tensão Rm 13 × Ap 13 */
.tg-tensao{display:grid;grid-template-columns:1fr minmax(0,1.3fr) 1fr;gap:14px;align-items:center}
.tg-tensao-polo{text-align:center;padding:16px 12px;border-radius:16px;background:color-mix(in srgb,var(--e) 16%,rgba(0,0,0,.3));border:1.5px solid var(--e)}
.tg-tensao-polo div{font-size:34px;line-height:1.1}
.tg-tensao-polo b{display:block;font-size:clamp(18px,2vw,21px);font-weight:900;color:var(--e)}
.tg-tensao-polo span{font-size:14.5px;line-height:1.5;color:rgba(230,238,255,.85)}
.tg-tensao-meio{display:flex;flex-direction:column;gap:10px}
.tg-tensao-barra{height:12px;border-radius:999px;background:linear-gradient(90deg,${GREEN},${GOLD},${RED})}
.tg-tensao-meio p{margin:0;text-align:center;font-size:clamp(14.5px,1.6vw,16px);line-height:1.55;color:rgba(230,238,255,.88)}
@media(max-width:760px){.tg-tensao{grid-template-columns:1fr}.tg-tensao-barra{height:10px}}
`;

/* Referências ABNT de cada infográfico */
const AGOSTINHO = 'AGOSTINHO. **A Cidade de Deus**. Petrópolis: Vozes, 2012.';
const ANSELMO = 'ANSELMO DE CANTUÁRIA. **Proslógio**. In: SANTO ANSELMO; ABELARDO. São Paulo: Abril Cultural, 1973. (Os Pensadores).';
const TOMAS = 'TOMÁS DE AQUINO. **Suma Teológica**. São Paulo: Loyola, 2001-2006. 9 v.';
const CALVINO = 'CALVINO, João. **A instituição da religião cristã**. São Paulo: Editora UNESP, 2008-2009. 2 t.';
const JUNIUS = 'JUNIUS, Franciscus. **A Treatise on True Theology**. Grand Rapids: Reformation Heritage Books, 2014.';
const AMES = 'AMES, William. **The Marrow of Theology**. Grand Rapids: Baker Books, 1997.';
const TURRETIN = 'TURRETIN, François. **Compêndio de teologia apologética**. São Paulo: Cultura Cristã, 2011. v. 1.';
const MASTRICHT = 'MASTRICHT, Petrus van. **Theoretical-Practical Theology**. Grand Rapids: Reformation Heritage Books, 2018. v. 1.';
const BAVINCK = 'BAVINCK, Herman. **Dogmática reformada**. São Paulo: Cultura Cristã, 2012. v. 1.';
const MULLER = 'MULLER, Richard A. **Post-Reformation Reformed Dogmatics**. 2. ed. Grand Rapids: Baker Academic, 2003. v. 1.';
const ARISTOTELES = 'ARISTÓTELES. **Política**. Brasília: Editora UnB, 1985.';
const ALTHUSIUS = 'ALTHUSIUS, Johannes. **Politica**: an abridged translation of Politics Methodically Set Forth. Indianapolis: Liberty Fund, 1995.';
const KUYPER = 'KUYPER, Abraham. **Calvinismo**. São Paulo: Cultura Cristã, 2002.';
const KUYPER_ESF = 'KUYPER, Abraham. Sphere Sovereignty. In: BRATT, James D. (org.). **Abraham Kuyper**: a centennial reader. Grand Rapids: Eerdmans, 1998. p. 461-490.';
const RUTHERFORD = 'RUTHERFORD, Samuel. **Lex, Rex, or The Law and the Prince**. Harrisonburg: Sprinkle Publications, 1982.';
const SCHMITT = 'SCHMITT, Carl. **Teologia política**. Belo Horizonte: Del Rey, 2006.';
const VANDRUNEN = 'VANDRUNEN, David. **Politics after Christendom**: political theology in a fractured world. Grand Rapids: Zondervan Academic, 2020.';
const GRUDEM = 'GRUDEM, Wayne. **Política segundo a Bíblia**. São Paulo: Vida Nova, 2014.';
const BIBLIA = 'BÍBLIA. Português. **Bíblia Sagrada**: Almeida Revista e Atualizada. 2. ed. Barueri: Sociedade Bíblica do Brasil, 1993.';

const R: Record<string, string[]> = {
  eras: [AGOSTINHO, ANSELMO, TOMAS, CALVINO, JUNIUS, AMES, TURRETIN, MASTRICHT, BAVINCK],
  arq: [JUNIUS, TURRETIN, MULLER],
  anat: [ANSELMO, TOMAS, AMES, MASTRICHT, TURRETIN, BAVINCK, BIBLIA],
  drama: [BIBLIA, CALVINO, VANDRUNEN],
  althu: [ALTHUSIUS, ARISTOTELES],
  kuyper: [KUYPER, KUYPER_ESF],
  venn: [TOMAS, BAVINCK, ARISTOTELES, VANDRUNEN],
  varrao: [AGOSTINHO, SCHMITT, VANDRUNEN],
  espectro: [CALVINO, KUYPER, VANDRUNEN, BIBLIA],
  tempo: [AGOSTINHO, TOMAS, CALVINO, ALTHUSIUS, RUTHERFORD, KUYPER, VANDRUNEN],
  tensao: [BIBLIA, CALVINO, GRUDEM, VANDRUNEN],
};

export function EstilosGraficos() {
  return <><style>{CSS}</style><EstilosQuiz /></>;
}

export function Figura({ cor, titulo, legenda, refs, quiz, children }: { cor: string; titulo: string; legenda?: ReactNode; refs: string[]; quiz?: Pergunta; children: ReactNode }) {
  return (
    <figure className="tg-fig" style={{ ['--c' as string]: cor, borderColor: `${cor}45` }}>
      <div className="tg-cab">
        <span className="tg-selo">◆ INFOGRÁFICO</span>
        <span className="tg-tit">{titulo}</span>
      </div>
      {children}
      {legenda && <figcaption className="tg-leg">{legenda}</figcaption>}
      <div className="tg-refs">
        <div className="tg-refs-t">📚 REFERÊNCIAS (ABNT) PARA CONSULTA</div>
        <ul className="notranslate" translate="no">
          {refs.map(r => <li key={r}>{r.split('**').map((x, i) => i % 2 ? <b key={i}>{x}</b> : x)}</li>)}
        </ul>
      </div>
      {quiz && <Quiz q={quiz} />}
    </figure>
  );
}

export const v = (cor: string) => ({ ['--e' as string]: cor });

/* ─── 01 · Teologia ─────────────────────────────────────────── */

export function ErasDaTeologia() {
  const eras: [string, string, string, [string, string][]][] = [
    ['PATRÍSTICA', 'séc. IV–V', SKY, [['Agostinho', '354–430']]],
    ['ESCOLÁSTICA', 'séc. XI–XIII', PURPLE, [['Anselmo', '1033–1109'], ['Tomás de Aquino', '1225–1274']]],
    ['REFORMA', 'séc. XVI', GOLD, [['João Calvino', '1509–1564']]],
    ['ORTODOXIA REFORMADA', 'séc. XVI–XVIII', GREEN, [['F. Junius', '1545–1602'], ['W. Ames', '1576–1633'], ['F. Turretin', '1623–1687'], ['P. van Mastricht', '1630–1706']]],
    ['NEOCALVINISMO', 'séc. XIX–XX', ROSE, [['Herman Bavinck', '1854–1921']]],
  ];
  return (
    <Figura cor={SKY} titulo="Quinze séculos de uma mesma pergunta" refs={R.eras} quiz={QI.eras}
      legenda={<>Da <b>patrística</b> ao <b>neocalvinismo</b>, a definição de teologia amadurece, mas o eixo permanece: falar de Deus <b>a partir do que Deus revelou</b>.</>}>
      <div className="tg-eras">
        {eras.map(([n, s, cor, nomes]) => (
          <div key={n} className="tg-era" style={v(cor)}>
            <div className="tg-era-pt" />
            <div><div className="tg-era-n">{n}</div><div className="tg-era-s">{s}</div></div>
            <div className="tg-era-box">
              {nomes.map(([nm, a]) => <span key={nm}>{nm}<small>{a}</small></span>)}
            </div>
          </div>
        ))}
      </div>
    </Figura>
  );
}

export function ArquetipicaEctipica() {
  return (
    <Figura cor={GREEN} titulo="Teologia arquetípica × ectípica (Junius)" refs={R.arq} quiz={QI.arq}
      legenda={<>Deus se conhece <b>infinitamente</b>; nós o conhecemos <b>verdadeiramente, mas na medida da criatura</b>. A ponte entre os dois é a <b>revelação</b>, e por isso a teologia é sempre humilde e dependente da Escritura.</>}>
      <div className="tg-arq">
        <div className="tg-orbe" style={{ ...v(GOLD), width: 'min(100%,270px)', background: `radial-gradient(circle, ${GOLD}55, ${GOLD}12 62%, transparent 72%)`, border: `2px solid ${GOLD}`, boxShadow: `0 0 50px ${GOLD}40` }}>
          <i>theologia archetypa</i>
          <b>Arquetípica</b>
          <span>Deus conhece a si mesmo: infinita, perfeita, incomunicável</span>
        </div>
        <div className="tg-ponte">
          <div className="tg-ponte-seta">➜</div>
          <b>REVELAÇÃO</b>
          <span>Deus se acomoda e fala na Escritura</span>
        </div>
        <div className="tg-orbe" style={{ ...v(SKY), width: 'min(80%,210px)', background: `radial-gradient(circle, ${SKY}40, ${SKY}10 62%, transparent 72%)`, border: `2px dashed ${SKY}` }}>
          <i>theologia ectypa</i>
          <b>Ectípica</b>
          <span>A nossa teologia: verdadeira, mas finita e recebida</span>
        </div>
      </div>
    </Figura>
  );
}

export function Setas({ etapas }: { etapas: [string, string, string, string, string][] }) {
  return (
    <div className="tg-setas">
      {etapas.map(([i, r, t, d, cor], k) => (
        <div key={t} style={{ display: 'contents' }}>
          {k > 0 && <div className="tg-seta">➜</div>}
          <div className="tg-etapa" style={v(cor)}>
            <div className="tg-etapa-i">{i}</div>
            <div className="tg-etapa-r">{r}</div>
            <div className="tg-etapa-t">{t}</div>
            <div className="tg-etapa-d">{d}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AnatomiaDaTeologia() {
  return (
    <Figura cor={SKY} titulo="Anatomia da teologia: de onde vem, como trabalha, para onde vai" refs={R.anat} quiz={QI.anat}
      legenda={<>Lida da esquerda para a direita, a teologia é <b>recebida</b> (princípios), <b>trabalhada</b> (fé que busca compreender) e <b>vivida</b> (fim prático), até chegar à <b>glória de Deus</b>.</>}>
      <Setas etapas={[
        ['👑', 'PRINCÍPIO DO SER', 'Deus', 'Fonte de toda verdade (principium essendi)', GOLD],
        ['📖', 'PRINCÍPIO DO CONHECER', 'Escritura', 'Única regra infalível (principium cognoscendi)', SKY],
        ['🧠', 'MÉTODO', 'Fé que busca compreender', 'A razão serve à fé (Anselmo, Tomás)', PURPLE],
        ['🌱', 'FIM PRÓXIMO', 'Viver para Deus em Cristo', 'Saber prático (Ames, Mastricht)', GREEN],
        ['✨', 'FIM ÚLTIMO', 'Glória de Deus', 'Soli Deo gloria (Rm 11.36)', ROSE],
      ]} />
    </Figura>
  );
}

/* ─── 02 · Política ─────────────────────────────────────────── */

export function HistoriaDaPolitica() {
  return (
    <Figura cor={BLUE} titulo="A política no drama bíblico" refs={R.drama} quiz={QI.drama}
      legenda={<>A vida em comum nasce da <b>criação</b>; a espada entra por causa da <b>queda</b>; e tudo é relativizado pelo <b>senhorio de Cristo</b>, que limita todo poder humano até a consumação.</>}>
      <Setas etapas={[
        ['🌳', 'CRIAÇÃO · Gn 1–2', 'Seres sociais', 'Família, trabalho e domínio: a vida em comum é boa', GREEN],
        ['⚡', 'QUEDA · Gn 3–9', 'A espada contém o mal', 'Após o dilúvio, Deus institui a justiça civil (Gn 9.6)', RED],
        ['✝️', 'REDENÇÃO · Mt 28.18', 'Cristo é Senhor', 'Todo poder é delegado, limitado e responsável', GOLD],
        ['👑', 'CONSUMAÇÃO · Ap 21', 'A cidade de Deus', 'Só então justiça e paz serão plenas', PURPLE],
      ]} />
    </Figura>
  );
}

export function ConsociacaoAlthusius() {
  const aneis: [string, string, string][] = [
    ['República / Reino', 'consociação universal', BLUE],
    ['Província', 'união de cidades', PURPLE],
    ['Cidade', 'união de corporações', SKY],
    ['Corporação', 'colégios e ofícios', GREEN],
    ['Família', 'a célula da sociedade', GOLD],
  ];
  const RAIOS = [230, 186, 142, 98, 54];
  return (
    <Figura cor={GREEN} titulo="A sociedade como aliança de alianças (Althusius)" refs={R.althu} quiz={QI.althu}
      legenda={<>Para Althusius, a sociedade cresce <b>de baixo para cima</b>: cada associação maior é formada por pactos entre as menores, que <b>conservam sua própria vida</b>. É a matriz do federalismo e da subsidiariedade.</>}>
      <div className="tg-althu">
        <svg className="tg-svg" viewBox="0 0 480 480" style={{ ['--mx' as string]: '440px' }} role="img" aria-label="Círculos concêntricos: família, corporação, cidade, província e república">
          {aneis.map(([, , cor], i) => (
            <circle key={i} cx={240} cy={240} r={RAIOS[i]} fill={`${cor}${i === 4 ? '40' : '14'}`} stroke={cor} strokeWidth={2} strokeDasharray={i === 0 ? '0' : '6 5'} />
          ))}
          {aneis.map(([n], i) => (
            <text key={n} x={240} y={i === 4 ? 248 : 240 - RAIOS[i] + 30} textAnchor="middle" fill="#fff" fontSize={i === 4 ? 22 : 20} fontWeight={900}>{n}</text>
          ))}
        </svg>
        <ol className="tg-althu-leg">
          {[...aneis].reverse().map(([n, d, cor], i) => (
            <li key={n} style={v(cor)}><span>{i + 1}</span><div><b>{n}</b>{d}</div></li>
          ))}
        </ol>
      </div>
    </Figura>
  );
}

export function EsferasKuyper() {
  const esferas: [string, string, string, string][] = [
    ['👨‍👩‍👧', 'Família', 'educa e sustenta', GOLD],
    ['⛪', 'Igreja', 'Palavra, sacramentos e disciplina', PURPLE],
    ['🏛️', 'Estado', 'justiça pública: protege e coordena', BLUE],
    ['🎓', 'Escola e ciência', 'busca da verdade', SKY],
    ['⚒️', 'Trabalho e economia', 'cultivo da criação', GREEN],
  ];
  return (
    <Figura cor={ROSE} titulo="Soberania das esferas (Kuyper)" refs={R.kuyper} quiz={QI.kuyper}
      legenda={<>Cada esfera <b>responde diretamente a Deus</b>, não ao Estado. O Estado tem uma tarefa própria, a de <b>proteger as fronteiras</b> entre as esferas e defender os fracos, mas <b>não pode absorvê-las</b>. Quando o faz, nasce o totalitarismo.</>}>
      <div className="tg-trono">
        <b>👑 Deus soberano</b>
        <span>“Não há um centímetro quadrado…” · toda autoridade vem dele</span>
      </div>
      <div className="tg-trono-liga" />
      <div className="tg-ramos">
        {esferas.map(([i, n, d, cor]) => (
          <div key={n} className={'tg-esfera' + (n === 'Estado' ? ' tg-estado' : '')} style={v(cor)}>
            <div className="tg-esfera-i">{i}</div>
            <b>{n}</b>
            <span>{d}</span>
          </div>
        ))}
      </div>
    </Figura>
  );
}

/* ─── 03 · Teologia política ────────────────────────────────── */

export function EncontroTeologiaPolitica() {
  return (
    <Figura cor={GOLD} titulo="Onde a teologia encontra a política" refs={R.venn} quiz={QI.venn}
      legenda={<>A teologia política não é uma terceira disciplina solta: é o <b>ponto de encontro</b> em que a doutrina de Deus ilumina a vida comum da cidade.</>}>
      <div className="tg-conf">
        <div className="tg-conf-fonte" style={v(SKY)}>
          <div className="tg-conf-i">📖</div>
          <i>θεός + λόγος</i>
          <b>Teologia</b>
          <span>Deus e todas as coisas em relação a Ele, segundo a revelação</span>
          <small>Pergunta: <em>quem é Deus e o que Ele requer?</em></small>
        </div>
        <div className="tg-conf-seta tg-conf-a" style={{ color: SKY }}>➜</div>
        <div className="tg-conf-centro">
          <div className="tg-conf-i">⚖️</div>
          <b>Teologia política</b>
          <span>a origem, o fim, os limites e a prática da autoridade civil <strong>sob o senhorio de Cristo</strong></span>
        </div>
        <div className="tg-conf-seta tg-conf-b" style={{ color: BLUE }}>➜</div>
        <div className="tg-conf-fonte" style={v(BLUE)}>
          <div className="tg-conf-i">🏛️</div>
          <i>πόλις</i>
          <b>Política</b>
          <span>a vida comum da cidade, a justiça e o bem comum</span>
          <small>Pergunta: <em>como devemos viver juntos?</em></small>
        </div>
      </div>
    </Figura>
  );
}

export function VarraoReforma() {
  return (
    <Figura cor={GOLD} titulo="O vetor invertido: Varrão × Reforma" refs={R.varrao} quiz={QI.varrao}
      legenda={<>A direção da seta decide tudo. Na <b>teologia civil</b>, a religião é ferramenta do poder; na <b>teologia política reformada</b>, o poder é que presta contas a Deus.</>}>
      <div className="tg-vetores">
        <div className="tg-vetor" style={v(ROSE)}>
          <div className="tg-vetor-cab">✕ TEOLOGIA CIVIL · VARRÃO</div>
          <div className="tg-no" style={{ ['--n' as string]: BLUE }}>🏛️ A cidade<small>o poder e seus interesses</small></div>
          <div className="tg-flecha"><i>⬆</i> serve a</div>
          <div className="tg-no" style={{ ['--n' as string]: ROSE }}>🗿 O culto e os deuses<small>religião como cimento social</small></div>
          <div className="tg-veredito">A cidade define os deuses. <b style={{ color: ROSE }}>Idolatria do Estado.</b></div>
        </div>
        <div className="tg-vetor" style={v(GOLD)}>
          <div className="tg-vetor-cab">✓ TEOLOGIA POLÍTICA REFORMADA</div>
          <div className="tg-no" style={{ ['--n' as string]: GOLD }}>📖 A Palavra de Deus<small>o senhorio de Cristo</small></div>
          <div className="tg-flecha"><i>⬇</i> julga e orienta</div>
          <div className="tg-no" style={{ ['--n' as string]: BLUE }}>🏛️ A cidade<small>autoridade real, mas limitada</small></div>
          <div className="tg-veredito">Deus define os limites da cidade. <b style={{ color: GOLD }}>Poder sob a lei de Deus.</b></div>
        </div>
      </div>
    </Figura>
  );
}

export function EspectroTeologiaPolitica() {
  return (
    <Figura cor={GOLD} titulo="Entre dois desvios" refs={R.espectro} quiz={QI.espectro}
      legenda={<>A teologia política reformada mantém a <b>distinção sem separação</b>: igreja e Estado não se confundem, mas nenhum dos dois está fora do senhorio de Cristo.</>}>
      <div className="tg-barra" />
      <div className="tg-polos">
        <div className="tg-polo" style={v(ROSE)}>
          <div className="tg-polo-r">◀ FUSÃO</div>
          <b>A fé capturada pelo poder</b>
          <span>Teocracia, teologia civil e ideologia partidária: igreja e Estado se confundem e a espada passa a servir à fé (ou a fé à espada).</span>
        </div>
        <div className="tg-polo tg-meio" style={v(GOLD)}>
          <div className="tg-polo-r">⚖️ EQUILÍBRIO</div>
          <b>Distinção sem separação</b>
          <span>Dois governos (espiritual e civil), ambos sob Deus. O cristão busca a paz da cidade (Jr 29.7) e ora pelas autoridades (1Tm 2.1-2) sem idolatrá-las.</span>
        </div>
        <div className="tg-polo" style={v(PURPLE)}>
          <div className="tg-polo-r">SEPARAÇÃO ▶</div>
          <b>A fé exilada da cidade</b>
          <span>Fuga do mundo e privatização da fé: Cristo seria Senhor da alma, mas não da vida pública.</span>
        </div>
      </div>
    </Figura>
  );
}

/* ─── 04 · Mapa ─────────────────────────────────────────────── */

export function LinhaDoTempoTradicao() {
  const marcos: [string, string, string, string][] = [
    ['354–430', 'Agostinho', 'Duas cidades', SKY],
    ['1225–1274', 'Tomás de Aquino', 'Lei natural', BLUE],
    ['1509–1564', 'Calvino', 'Duplo governo', GOLD],
    ['1563–1638', 'Althusius', 'Consociação', GREEN],
    ['1600–1661', 'Rutherford', 'Lex, Rex', RED],
    ['1837–1920', 'Kuyper', 'Esferas', ROSE],
    ['séc. XXI', 'VanDrunen', 'Dois reinos', PURPLE],
  ];
  return (
    <Figura cor={PURPLE} titulo="A linha do tempo do curso" refs={R.tempo} quiz={QI.tempo}
      legenda={<>Sete vozes, dezesseis séculos e uma convicção comum: <b>a autoridade civil é real, mas limitada</b>, porque só Deus é soberano.</>}>
      <div className="tg-tempo">
        {marcos.map(([a, n, t, cor]) => (
          <div key={n} className="tg-marco" style={v(cor)}>
            <div className="tg-marco-ano">{a}</div>
            <div className="tg-marco-pt" />
            <b>{n}</b>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </Figura>
  );
}

/* ─── Próxima aula ──────────────────────────────────────────── */

export function TensaoRmAp() {
  return (
    <Figura cor={RED} titulo="O mesmo poder, dois retratos" refs={R.tensao} quiz={QI.tensao}
      legenda={<>O Estado é <b>ministro</b> enquanto pune o mal e louva o bem dentro dos limites dados por Deus; torna-se <b>besta</b> quando reivindica adoração e persegue os santos. A Aula 01 mostra onde passa essa fronteira.</>}>
      <div className="tg-tensao">
        <div className="tg-tensao-polo" style={v(GREEN)}>
          <div>🛡️</div>
          <b>Ministro de Deus</b>
          <span>Romanos 13.4: serve à justiça, pune o mal</span>
        </div>
        <div className="tg-tensao-meio">
          <p style={{ textAlign: 'left', color: GREEN }}>◀ serve dentro dos limites</p>
          <div className="tg-tensao-barra" />
          <p style={{ textAlign: 'right', color: RED }}>reivindica o que é de Deus ▶</p>
        </div>
        <div className="tg-tensao-polo" style={v(RED)}>
          <div>🐉</div>
          <b>Besta</b>
          <span>Apocalipse 13: exige culto, persegue a igreja</span>
        </div>
      </div>
    </Figura>
  );
}
