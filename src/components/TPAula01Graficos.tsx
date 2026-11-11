import { GOLD, SKY, ROSE, GREEN, BLUE, PURPLE, RED } from './AulaKit';
import { Figura, Setas, v } from './TPIntroGraficos';
import { QA } from './TPPerguntas';

/* Teologia Política · Aula 01 — infográficos didáticos.
   Usa a moldura e as classes .tg-* de TPIntroGraficos (EstilosGraficos precisa estar na página). */

/* Referências ABNT (títulos entre ** saem em negrito) */
const BIBLIA = 'BÍBLIA. Português. **Bíblia Sagrada**: Almeida Revista e Atualizada. 2. ed. Barueri: Sociedade Bíblica do Brasil, 1993.';
const CALVINO = 'CALVINO, João. **A instituição da religião cristã**. São Paulo: Editora UNESP, 2009. t. 2.';
const CALVINO_ROM = 'CALVINO, João. **Romanos**. 2. ed. São Paulo: Parakletos, 2001. (Série Comentários Bíblicos).';
const KLINE = 'KLINE, Meredith G. **Kingdom Prologue**: Genesis foundations for a covenantal worldview. Overland Park: Two Age Press, 2000.';
const KUYPER_GC = 'KUYPER, Abraham. **Common Grace**: God’s gifts for a fallen world. Bellingham: Lexham Press, 2016. v. 1.';
const KUYPER = 'KUYPER, Abraham. **Calvinismo**. São Paulo: Cultura Cristã, 2002.';
const VD_2010A = 'VANDRUNEN, David. **Living in God’s Two Kingdoms**: a biblical vision for Christianity and culture. Wheaton: Crossway, 2010.';
const VD_2010B = 'VANDRUNEN, David. **Natural Law and the Two Kingdoms**: a study in the development of Reformed social thought. Grand Rapids: Eerdmans, 2010.';
const VD_2020 = 'VANDRUNEN, David. **Politics after Christendom**: political theology in a fractured world. Grand Rapids: Zondervan Academic, 2020.';
const RUTHERFORD = 'RUTHERFORD, Samuel. **Lex, Rex, or the Law and the Prince**. London: John Field, 1644.';
const BEALE = 'BEALE, G. K. **The Book of Revelation**: a commentary on the Greek text. Grand Rapids: Eerdmans, 1999. (New International Greek Testament Commentary).';
const CULLMANN = 'CULLMANN, Oscar. **The State in the New Testament**. New York: Scribner, 1956.';
const TERTULIANO = 'TERTULIANO. **De idololatria**: critical text, translation and commentary. Edição de J. H. Waszink e J. C. M. van Winden. Leiden: Brill, 1987.';
const CFW = 'CONFISSÃO de Fé de Westminster. São Paulo: Cultura Cristã, 2017.';
const CFB = 'CONFISSÃO de Fé Batista de 1689. São José dos Campos: Fiel, 2012.';
const SAVOY = 'DECLARAÇÃO de Savoy (1658). In: SCHAFF, Philip (org.). **The Creeds of Christendom**. 6. ed. Grand Rapids: Baker, 1983. v. 3.';
const GRUDEM = 'GRUDEM, Wayne. **Política segundo a Bíblia**: princípios que todo cristão deve conhecer. São Paulo: Vida Nova, 2014.';
const GOUDZWAARD = 'GOUDZWAARD, Bob. **Idols of Our Time**. Downers Grove: InterVarsity Press, 1984.';

const CSS = `
.a1-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:16px}
.a1-col{display:flex;flex-direction:column;border-radius:18px;overflow:hidden;background:rgba(0,0,0,.28);border:1.5px solid var(--e)}
.a1-col-cab{display:flex;align-items:center;gap:12px;padding:14px 16px;background:linear-gradient(135deg,color-mix(in srgb,var(--e) 30%,transparent),transparent)}
.a1-col-cab span{font-size:32px;line-height:1}
.a1-col-cab b{display:block;font-size:clamp(18px,2vw,21px);font-weight:900;color:#fff}
.a1-col-cab small{font-family:var(--font-mono);font-size:12.5px;font-weight:700;letter-spacing:.1em;color:var(--e)}
.a1-lin{display:grid;grid-template-columns:118px 1fr;gap:10px;padding:10px 16px;border-top:1px solid rgba(255,255,255,.07);font-size:clamp(14.5px,1.55vw,15.5px);line-height:1.5;color:rgba(230,238,255,.88)}
.a1-lin i{font-style:normal;font-family:var(--font-mono);font-size:12.5px;font-weight:700;letter-spacing:.08em;color:var(--e);padding-top:2px}
@media(max-width:420px){.a1-lin{grid-template-columns:1fr;gap:2px}}

.a1-limite{margin-top:14px;display:flex;align-items:center;gap:14px;padding:14px 18px;border-radius:14px;background:repeating-linear-gradient(135deg,${RED}20 0 12px,${RED}0c 12px 24px);border:2px dashed ${RED}}
.a1-limite span{font-size:30px;line-height:1}
.a1-limite div{font-size:clamp(15px,1.65vw,16.5px);line-height:1.55;color:#fff}
.a1-limite b{color:${RED}}

.a1-pir{display:flex;flex-direction:column;align-items:center;gap:10px}
.a1-deg{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 20px;border-radius:14px;background:linear-gradient(90deg,color-mix(in srgb,var(--e) 30%,transparent),color-mix(in srgb,var(--e) 10%,transparent));border:1.5px solid var(--e);opacity:0;animation:a1-sobe .6s ease forwards}
.a1-deg b{font-family:var(--font-mono);font-size:clamp(14px,1.6vw,16px);letter-spacing:.14em;color:var(--e)}
.a1-deg span{font-size:clamp(16.5px,1.9vw,19px);font-weight:900;color:#fff;text-align:right}
.a1-deg small{display:block;font-size:13.5px;font-weight:600;color:rgba(230,238,255,.75)}
.a1-quiasmo{margin-top:16px;display:flex;flex-wrap:wrap;justify-content:center;gap:8px;font-family:var(--font-mono);font-size:13.5px;font-weight:700}
.a1-quiasmo span{padding:6px 10px;border-radius:8px;background:rgba(0,0,0,.3);border:1px solid var(--e);color:var(--e)}
@media(max-width:600px){.a1-deg{width:100%!important}}

.a1-escada{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;align-items:end;position:relative}
.a1-degrau{display:flex;flex-direction:column;justify-content:flex-end;gap:6px;padding:14px 12px;border-radius:14px 14px 6px 6px;background:linear-gradient(180deg,color-mix(in srgb,var(--e) 35%,transparent),rgba(0,0,0,.35));border:1.5px solid var(--e);opacity:0;animation:a1-sobe .6s ease forwards}
.a1-degrau i{font-style:normal;font-size:26px;line-height:1}
.a1-degrau b{font-size:clamp(15px,1.6vw,17px);font-weight:900;color:#fff;line-height:1.25}
.a1-degrau span{font-size:13.5px;line-height:1.45;color:rgba(230,238,255,.82)}
.a1-degrau small{font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--e)}
.a1-eixo{display:flex;justify-content:space-between;margin-top:10px;font-family:var(--font-mono);font-size:12.5px;font-weight:700;letter-spacing:.1em}
@media(max-width:760px){
  .a1-escada{grid-template-columns:1fr}
  .a1-degrau{height:auto!important;border-radius:14px}
}

.a1-moedas{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:18px}
.a1-moeda-box{display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;padding:18px;border-radius:18px;background:rgba(0,0,0,.25);border:1px solid color-mix(in srgb,var(--e) 45%,transparent)}
.a1-moeda{width:150px;aspect-ratio:1;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;border:4px double var(--e);box-shadow:inset 0 0 24px rgba(0,0,0,.5),0 0 28px color-mix(in srgb,var(--e) 40%,transparent);animation:a1-gira 9s ease-in-out infinite}
.a1-moeda span{font-size:46px;line-height:1}
.a1-moeda b{font-family:var(--font-cinzel);font-size:14px;letter-spacing:.12em;color:#1b1200}
.a1-moeda-box p{margin:0;font-size:clamp(15px,1.6vw,16.5px);line-height:1.55;color:rgba(230,238,255,.88)}
.a1-moeda-box strong{font-size:clamp(18px,2vw,20px);color:var(--e)}

.a1-erros{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-areas:". teo mes" "ana cen est" ". qui .";gap:12px;position:relative}
.a1-erro{align-self:center;padding:14px;border-radius:14px;background:rgba(0,0,0,.3);border:1.5px solid ${ROSE}80;display:flex;flex-direction:column;gap:4px}
.a1-erro b{font-size:clamp(16px,1.8vw,18px);font-weight:900;color:${ROSE}}
.a1-erro span{font-size:14px;line-height:1.5;color:rgba(230,238,255,.82)}
.a1-erro small{font-family:var(--font-mono);font-size:12px;font-weight:700;color:${SKY}}
.a1-centro{grid-area:cen;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:6px;padding:18px;border-radius:50%;aspect-ratio:1;max-width:240px;justify-self:center;background:radial-gradient(circle,${GOLD}45,rgba(0,0,0,.3) 70%);border:2px solid ${GOLD};box-shadow:0 0 36px ${GOLD}40}
.a1-centro b{font-size:clamp(16px,1.8vw,19px);font-weight:900;color:#fff;line-height:1.2}
.a1-centro span{font-size:13.5px;color:rgba(255,240,200,.9)}
.a1-eixos{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 18px;margin-top:12px;font-family:var(--font-mono);font-size:12.5px;font-weight:700;letter-spacing:.06em;color:rgba(230,238,255,.6)}
@media(max-width:760px){
  .a1-erros{grid-template-columns:1fr;grid-template-areas:"cen" "teo" "mes" "ana" "est" "qui"}
  .a1-eixos{display:none}
  .a1-centro{border-radius:20px;aspect-ratio:auto;max-width:none;width:100%;box-sizing:border-box}
}

@keyframes a1-sobe{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes a1-gira{0%,100%{transform:perspective(500px) rotateY(-22deg)}50%{transform:perspective(500px) rotateY(22deg)}}
@media(prefers-reduced-motion:reduce){.a1-deg,.a1-degrau,.a1-moeda{animation:none!important;opacity:1!important}}
`;

export function EstilosAula01() {
  return <style>{CSS}</style>;
}

/* ─── 01 · Introdução ───────────────────────────────────────── */

export function MapaCanonico() {
  return (
    <Figura cor={SKY} titulo="Quatro textos, uma doutrina do governo civil" quiz={QA.mapa} refs={[BIBLIA, CALVINO, CULLMANN, VD_2020]}
      legenda={<>Cada texto responde a uma pergunta diferente: <b>de onde vem</b> o Estado, <b>para que serve</b>, <b>como o cristão se relaciona</b> com ele e <b>onde ele termina</b>. Só lidos juntos formam a doutrina completa.</>}>
      <Setas etapas={[
        ['🌈', 'ORIGEM · Gn 9.6', 'O pacto noaico', 'Deus delega a espada ao homem para proteger a imagem de Deus', GREEN],
        ['🏛️', 'FUNÇÃO · Rm 13.1-7', 'Ministro de Deus', 'Punir o mal e louvar o bem, com a espada', BLUE],
        ['🧭', 'MOTIVAÇÃO · 1Pe 2.13-17', 'Por causa do Senhor', 'Peregrinos que honram o rei e temem só a Deus', PURPLE],
        ['🐉', 'LIMITE · Ap 13', 'Quando vira besta', 'O poder que exige culto perde a sua legitimidade', RED],
      ]} />
    </Figura>
  );
}

export function DoisErrosSimetricos() {
  return (
    <Figura cor={ROSE} titulo="Dois erros simétricos e a leitura canônica" quiz={QA.erros} refs={[CALVINO, CULLMANN, GRUDEM]}
      legenda={<>Quem lê só metade do cânon cai num dos extremos. A leitura reformada mantém a <b>tensão bíblica</b>: o Estado é ordenado por Deus <b>e</b> pode se corromper.</>}>
      <div className="tg-barra" style={{ background: `linear-gradient(90deg, ${BLUE}, ${GOLD} 50%, ${RED})` }} />
      <div className="tg-polos">
        <div className="tg-polo" style={v(BLUE)}>
          <div className="tg-polo-r">◀ RM 13 SEM AP 13</div>
          <b>Estatismo</b>
          <span>Submissão acrítica: toda ordem do governante seria vontade de Deus.</span>
        </div>
        <div className="tg-polo tg-meio" style={v(GOLD)}>
          <div className="tg-polo-r">⚖️ LEITURA CANÔNICA</div>
          <b>Rm 13 + Ap 13</b>
          <span>Autoridade real, mas derivada, delimitada e julgável pela Palavra que a institui.</span>
        </div>
        <div className="tg-polo" style={v(RED)}>
          <div className="tg-polo-r">AP 13 SEM RM 13 ▶</div>
          <b>Anarquismo</b>
          <span>Desconfiança total: todo governo seria demoníaco e a ordem civil não teria valor.</span>
        </div>
      </div>
    </Figura>
  );
}

/* ─── 02 · Gn 9.6 ───────────────────────────────────────────── */

export function DaVingancaAJustica() {
  return (
    <Figura cor={GREEN} titulo="Da vingança privada à justiça pública" quiz={QA.vinganca} refs={[BIBLIA, KLINE, VD_2020]}
      legenda={<>Antes do dilúvio, a violência cresce sem freio (Lameque quer vingança “setenta vezes sete”). Em Gn 9.6, Deus institui um <b>agente humano autorizado</b> e uma <b>pena proporcional</b>, fundada na imagem de Deus.</>}>
      <Setas etapas={[
        ['🩸', 'GN 4.15, 23-24', 'Vingança privada', 'Caim e Lameque: a retribuição escala sem medida', RED],
        ['🌈', 'GN 9.6', 'Justiça pública', '“Pelo homem”: Deus delega a espada por causa da imago Dei', GREEN],
        ['⚖️', 'ÊX 21.23-25', 'Proporcionalidade', 'A lex talionis limita a pena tanto quanto a autoriza', GOLD],
        ['🏛️', 'RM 13.4', 'O magistrado', 'Ministro de Deus que executa a ira contra o mal', BLUE],
      ]} />
    </Figura>
  );
}

function Coluna({ cor, icone, titulo, sub, linhas }: { cor: string; icone: string; titulo: string; sub: string; linhas: [string, string][] }) {
  return (
    <div className="a1-col" style={v(cor)}>
      <div className="a1-col-cab"><span>{icone}</span><div><small>{sub}</small><b>{titulo}</b></div></div>
      {linhas.map(([r, t]) => <div key={r} className="a1-lin"><i>{r}</i><span>{t}</span></div>)}
    </div>
  );
}

export function DuasAliancas() {
  return (
    <Figura cor={GREEN} titulo="Aliança comum × aliança da graça" quiz={QA.aliancas} refs={[KLINE, KUYPER_GC, VD_2010A, VD_2010B]}
      legenda={<>O Estado nasce da <b>aliança comum</b> com Noé, não da aliança redentora. Por isso sua autoridade vale para crentes e descrentes, <b>preserva sem salvar</b> e pertence apenas a esta era.</>}>
      <div className="a1-cols">
        <Coluna cor={GREEN} icone="🌈" sub="GN 8.20–9.17" titulo="Aliança com Noé (comum)" linhas={[
          ['PARTES', 'Toda a humanidade e “todo ser vivente” (Gn 9.9-10)'],
          ['FINALIDADE', 'Preservar a vida e a ordem da história'],
          ['DURAÇÃO', '“Enquanto durar a terra” (Gn 8.22)'],
          ['INSTITUIÇÃO', 'Família e governo civil'],
          ['INSTRUMENTO', 'A espada: justiça proporcional'],
        ]} />
        <Coluna cor={GOLD} icone="✝️" sub="GN 12 → HB 8" titulo="Aliança da graça (redentora)" linhas={[
          ['PARTES', 'O povo de Deus, em Cristo'],
          ['FINALIDADE', 'Salvar, santificar e glorificar'],
          ['DURAÇÃO', 'Eterna: chega ao novo céu e à nova terra'],
          ['INSTITUIÇÃO', 'A igreja'],
          ['INSTRUMENTO', 'A Palavra, os sacramentos e a disciplina'],
        ]} />
      </div>
    </Figura>
  );
}

/* ─── 03 · Rm 13 ────────────────────────────────────────────── */

export function AnatomiaDoMagistrado() {
  return (
    <Figura cor={BLUE} titulo="Anatomia do magistrado em Romanos 13" quiz={QA.magistrado} refs={[BIBLIA, CALVINO_ROM, CALVINO, RUTHERFORD]}
      legenda={<>Paulo define o magistrado <b>pela função</b>. A mesma definição que funda a autoridade também a <b>delimita</b>: quem deixa de servir à justiça perde o elogio do apóstolo.</>}>
      <Setas etapas={[
        ['👑', 'FONTE · v. 1', 'Ordenado por Deus', 'tetagmenai: autoridade derivada, não própria', GOLD],
        ['🤝', 'OFÍCIO · v. 4', 'Diakonos theou', 'Ministro de Deus “para o teu bem”', BLUE],
        ['🎯', 'FINALIDADE · vv. 3-4', 'Justiça pública', 'Terror para o mal, louvor para o bem', GREEN],
        ['⚔️', 'MEIO · v. 4', 'Machaira', 'A espada: coerção legítima e proporcional', RED],
        ['📜', 'DEVER · vv. 5-7', 'Sujeição por consciência', 'Tributo, respeito e honra a quem são devidos', PURPLE],
      ]} />
      <div className="a1-limite">
        <span>🛑</span>
        <div><b>Linha de limite (At 5.29):</b> se o magistrado ordena o que Deus proíbe, “importa obedecer a Deus antes que aos homens”. A lei está acima do rei (Rutherford).</div>
      </div>
    </Figura>
  );
}

export function EspadaEPalavra() {
  return (
    <Figura cor={BLUE} titulo="Rm 12.19 → 13.4: a igreja renuncia à espada; o Estado a empunha" quiz={QA.espada} refs={[CALVINO, VD_2010B, CFB]}
      legenda={<>Os dois governos de Calvino: o <b>espiritual</b> reina na consciência pela Palavra; o <b>civil</b> regula a justiça exterior pela espada. Distintos, não opostos.</>}>
      <div className="a1-cols">
        <Coluna cor={PURPLE} icone="⛪" sub="RM 12.17-21" titulo="A igreja" linhas={[
          ['DIANTE DO MAL', '“Não vos vingueis… dai lugar à ira”'],
          ['INSTRUMENTO', 'Palavra, sacramentos e disciplina'],
          ['ALCANCE', 'A consciência e o coração'],
          ['FIM', 'Arrependimento e salvação'],
        ]} />
        <Coluna cor={BLUE} icone="🏛️" sub="RM 13.1-7" titulo="O Estado" linhas={[
          ['DIANTE DO MAL', '“Vingador para executar a ira”'],
          ['INSTRUMENTO', 'A espada (machaira)'],
          ['ALCANCE', 'A conduta exterior e pública'],
          ['FIM', 'Justiça e paz civil'],
        ]} />
      </div>
    </Figura>
  );
}

/* ─── 04 · 1Pe 2 ────────────────────────────────────────────── */

export function HierarquiaDeLealdades() {
  const graus: [string, string, string, string, string][] = [
    ['TEMER', 'Deus', 'reverência última, só a Ele', SKY, '46%'],
    ['AMAR', 'os irmãos', 'a família da fé', PURPLE, '70%'],
    ['HONRAR', 'todos e o rei', 'respeito ao ofício e à pessoa', GOLD, '100%'],
  ];
  return (
    <Figura cor={PURPLE} titulo="1Pe 2.17: a ordem das lealdades" quiz={QA.lealdades} refs={[BIBLIA, VD_2010A, CALVINO]}
      legenda={<>O rei recebe a <b>mesma honra devida a todo ser humano</b>; o <b>temor</b> fica reservado a Deus. Por isso o cristão honra as autoridades, mas nunca lhes presta culto.</>}>
      <div className="a1-pir">
        {graus.map(([verbo, alvo, d, cor, w], i) => (
          <div key={verbo} className="a1-deg" style={{ ...v(cor), width: w, animationDelay: `${i * 0.15}s` }}>
            <b>{verbo}</b>
            <span>{alvo}<small>{d}</small></span>
          </div>
        ))}
      </div>
      <div className="a1-quiasmo">
        <span style={v(GOLD)}>A · honrai a todos</span>
        <span style={v(PURPLE)}>B · amai os irmãos</span>
        <span style={v(SKY)}>B′ · temei a Deus</span>
        <span style={v(GOLD)}>A′ · honrai o rei</span>
      </div>
    </Figura>
  );
}

/* ─── 05 · Ap 13 ────────────────────────────────────────────── */

export function EscaladaDaBesta() {
  const passos: [string, string, string, string, string, string][] = [
    ['🛡️', 'Ministro de Deus', 'Pune o mal e louva o bem', 'Rm 13.4', GREEN, '150px'],
    ['📈', 'Excede a competência', 'Invade esferas que não são suas', 'Mc 12.17', GOLD, '180px'],
    ['📣', 'Exige lealdade absoluta', 'Propaganda e religião civil', 'Ap 13.11-15', '#fb923c', '210px'],
    ['🔖', 'Controla a vida', 'Ninguém compra nem vende sem a marca', 'Ap 13.16-17', ROSE, '240px'],
    ['🐉', 'Exige culto', 'Blasfema e persegue os santos', 'Ap 13.4-8', RED, '270px'],
  ];
  return (
    <Figura cor={RED} titulo="De diakonos a besta: a escalada do poder" quiz={QA.escalada} refs={[BEALE, CULLMANN, CALVINO, BIBLIA]}
      legenda={<>Não são duas instituições, mas <b>a mesma instituição em duas condições</b>. A cada degrau o Estado reivindica mais do que Deus lhe deu, até exigir <b>o que só a Deus pertence</b>.</>}>
      <div className="a1-escada">
        {passos.map(([i, t, d, r, cor, h], k) => (
          <div key={t} className="a1-degrau" style={{ ...v(cor), height: h, animationDelay: `${k * 0.12}s` }}>
            <i>{i}</i>
            <b>{t}</b>
            <span>{d}</span>
            <small>{r}</small>
          </div>
        ))}
      </div>
      <div className="a1-eixo">
        <span style={{ color: GREEN }}>◀ AUTORIDADE LEGÍTIMA</span>
        <span style={{ color: RED }}>PODER ABSOLUTIZADO ▶</span>
      </div>
    </Figura>
  );
}

export function MoedaEImagem() {
  return (
    <Figura cor={GOLD} titulo="A moeda e a imagem (Mc 12.17)" quiz={QA.moeda} refs={[TERTULIANO, BIBLIA, CALVINO]}
      legenda={<>Tertuliano resume: <b>a César, a moeda que traz a imagem de César; a Deus, o homem que traz a imagem de Deus</b>. Quando o Estado exige o homem inteiro, ultrapassa o seu limite.</>}>
      <div className="a1-moedas">
        <div className="a1-moeda-box" style={v(GOLD)}>
          <div className="a1-moeda" style={{ background: `radial-gradient(circle at 35% 30%, #fff3c4, ${GOLD} 55%, #8a5d00)` }}>
            <span>👑</span><b>TI · CAESAR</b>
          </div>
          <strong>“Dai a César…”</strong>
          <p>Tributo, respeito e obediência civil: o que traz a marca do Estado.</p>
        </div>
        <div className="a1-moeda-box" style={v(SKY)}>
          <div className="a1-moeda" style={{ background: `radial-gradient(circle at 35% 30%, #e0f6ff, ${SKY} 55%, #1e5f86)`, animationDelay: '4.5s' }}>
            <span>🧑</span><b>IMAGO DEI</b>
          </div>
          <strong>“…e a Deus o que é de Deus”</strong>
          <p>Culto, consciência e a vida inteira: o que traz a imagem de Deus (Gn 1.27).</p>
        </div>
      </div>
    </Figura>
  );
}

/* ─── 06 · Síntese ──────────────────────────────────────────── */

export function RodaDasTeses() {
  const teses: [string, string, string][] = [
    ['Origem', 'Gn 9.6', GREEN], ['Finalidade', 'Rm 13.3-4', BLUE], ['Meio', 'Rm 13.4', RED],
    ['Limites', 'At 5.29', ROSE], ['Dever', '1Pe 2.17', PURPLE],
  ];
  return (
    <Figura cor={GOLD} titulo="As cinco teses em um só diagrama" quiz={QA.teses} refs={[CALVINO, CFW, CFB, KUYPER]}
      legenda={<>As cinco teses giram em torno de um centro: o governo civil é <b>ordenança de Deus para a justiça</b>. Tirar qualquer uma delas desequilibra o conjunto.</>}>
      <svg className="tg-svg" viewBox="22 4 476 446" style={{ ['--mx' as string]: '560px' }} role="img" aria-label="Cinco teses ao redor do governo civil">
        <polygon points={teses.map((_, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5; return `${260 + 170 * Math.cos(a)},${240 + 170 * Math.sin(a)}`; }).join(' ')}
          fill={`${GOLD}0c`} stroke={`${GOLD}60`} strokeWidth="2" strokeDasharray="6 6" />
        {teses.map(([t, r, cor], i) => {
          const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
          const x = 260 + 170 * Math.cos(a), y = 240 + 170 * Math.sin(a);
          return (
            <g key={t}>
              <line x1={260} y1={240} x2={x} y2={y} stroke={cor} strokeWidth="2" opacity="0.6" />
              <circle cx={x} cy={y} r="56" fill="#0a1630" stroke={cor} strokeWidth="3" />
              <text x={x} y={y - 16} textAnchor="middle" fill={cor} fontSize="21" fontWeight="900">{i + 1}</text>
              <text x={x} y={y + 7} textAnchor="middle" fill="#fff" fontSize="19" fontWeight="900">{t}</text>
              <text x={x} y={y + 29} textAnchor="middle" fill="rgba(230,238,255,0.8)" fontSize="15.5">{r}</text>
            </g>
          );
        })}
        <circle cx="260" cy="240" r="72" fill={`${GOLD}30`} stroke={GOLD} strokeWidth="3" />
        <text x="260" y="232" textAnchor="middle" fontSize="30">⚖️</text>
        <text x="260" y="260" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="900">GOVERNO</text>
        <text x="260" y="278" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="900">CIVIL</text>
      </svg>
    </Figura>
  );
}

export function TrilhaConfessional() {
  return (
    <Figura cor={SKY} titulo="O magistrado e a heresia: três confissões, três passos" quiz={QA.confissoes} refs={[CFW, SAVOY, CFB]}
      legenda={<>Em quarenta anos, a tradição puritana e batista foi retirando do magistrado o poder sobre a religião, até a CFB 1689 confessar que <b>só Deus é Senhor da consciência</b> (21.2).</>}>
      <Setas etapas={[
        ['📘', 'WESTMINSTER · 1646', 'Cap. 23.3', 'O magistrado deve suprimir heresias e blasfêmias', BLUE],
        ['📗', 'SAVOY · 1658', 'Cap. 24.3', 'Os congregacionais suavizam o dever e protegem os que divergem', PURPLE],
        ['📕', 'CFB · 1689', 'Caps. 21.2 e 24', 'O dever é omitido: a espada serve à justiça civil, não à doutrina', GREEN],
      ]} />
    </Figura>
  );
}

/* ─── 07 · Diálogo ──────────────────────────────────────────── */

export function MapaDosErros() {
  const erros: [string, string, string, string][] = [
    ['teo', 'Teocracia ou clericalismo', 'A espada usada para fins religiosos', 'Esquece: Rm 12.19; CFB 21.2'],
    ['mes', 'Messianismo político', 'Salvação esperada de partido ou líder', 'Esquece: 1Pe 2.17; Ap 13.11'],
    ['ana', 'Anarquismo', 'Todo Estado visto como besta', 'Esquece: Gn 9.6; Rm 13.1'],
    ['est', 'Estatismo', 'Rm 13 lido como carta branca', 'Esquece: Ap 13; At 5.29'],
    ['qui', 'Quietismo', 'Retirada da vida pública', 'Esquece: Jr 29.7; 1Tm 2.1-2'],
  ];
  return (
    <Figura cor={ROSE} titulo="O mapa dos cinco erros" quiz={QA.mapaErros} refs={[GRUDEM, VD_2020, GOUDZWAARD, KUYPER]}
      legenda={<>Cada erro nasce de <b>esquecer um texto</b>. No centro, a leitura canônica mantém todos os textos juntos: o Estado é honrado, limitado e julgado pela Palavra.</>}>
      <div className="a1-erros">
        <div className="a1-centro">
          <span style={{ fontSize: 30 }}>⚖️</span>
          <b>Leitura canônica</b>
          <span>Gn 9 + Rm 13 + 1Pe 2 + Ap 13</span>
        </div>
        {erros.map(([area, t, d, e]) => (
          <div key={area} className="a1-erro" style={{ gridArea: area }}>
            <b>✕ {t}</b>
            <span>{d}</span>
            <small>{e}</small>
          </div>
        ))}
      </div>
      <div className="a1-eixos">
        <span>↑ fusão de igreja e poder</span>
        <span>← desprezo pelo Estado</span>
        <span>absolutização do Estado →</span>
        <span>↓ ausência da igreja</span>
      </div>
    </Figura>
  );
}
