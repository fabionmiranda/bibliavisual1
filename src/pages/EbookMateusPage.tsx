import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const AUTOR_EBOOK = 'Prof. Dr. Fabio Miranda — Teologia e Tecnologias';

/* ═══════════════════════════════════════════════════
   CORES DO PRODUTO — BÍBLIA VISUAL EXPOSITIVA
═══════════════════════════════════════════════════ */
const C = {
  bg:       '#080810',
  bgCard:   'rgba(255,255,255,0.04)',
  bgCardHd: 'rgba(0,212,255,0.07)',
  bgBox:    'rgba(0,212,255,0.08)',
  blue:     '#00e8ff',
  purple:   '#9b4fff',
  rose:     '#ff2d55',
  border:   'rgba(255,255,255,0.12)',
  borderB:  'rgba(0,232,255,0.45)',
  white:    '#ffffff',
  w80:      'rgba(255,255,255,0.96)',
  w65:      'rgba(255,255,255,0.90)',
  w45:      'rgba(255,255,255,0.76)',
  w30:      'rgba(255,255,255,0.60)',
  w15:      'rgba(255,255,255,0.45)',
};

/* ══ Fontes ══ */
const F = {
  display: '"Orbitron", sans-serif',
  sans:    '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
  mono:    '"JetBrains Mono", monospace',
  greek:   '"Noto Serif Hebrew", serif',
};

/* ══ Wrappers de layout ══ */
const col: React.CSSProperties = { maxWidth: 860, margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2rem)' };

/* ─────────────────────────────────────
   PRIMITIVOS VISUAIS
───────────────────────────────────── */
function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:16, margin:'3.5rem 0 2rem' }}>
      <div style={{ flex:1, height:1, background:`linear-gradient(to right, transparent, ${C.borderB})` }} />
      <span style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.35em', color:C.blue, textTransform:'uppercase', textShadow:`0 0 12px ${C.blue}` }}>{label}</span>
      <div style={{ flex:1, height:1, background:`linear-gradient(to left, transparent, ${C.borderB})` }} />
    </div>
  );
}

function ExplanationBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      marginTop:'1.5rem',
      borderRadius:10,
      border:`1px solid ${C.borderB}`,
      background:C.bgBox,
      padding:'1.25rem 1.5rem',
    }}>
      <p style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.35em', color:`${C.blue}ee`, textTransform:'uppercase', marginBottom:10 }}>
        Explicação
      </p>
      <p style={{ fontFamily:F.sans, fontSize:'clamp(15px,2.2vw,17px)', color:C.w65, lineHeight:1.85, textAlign:'justify' }}>{children}</p>
    </div>
  );
}

function DiagramIntro({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ margin:'0 0 1.25rem', padding:'0.9rem 1.25rem', borderRadius:10, background:'rgba(255,255,255,0.025)', borderLeft:`3px solid ${C.blue}`, borderTop:`1px solid rgba(255,255,255,0.06)`, borderRight:`1px solid rgba(255,255,255,0.06)`, borderBottom:`1px solid rgba(255,255,255,0.06)` }}>
      <p style={{ fontFamily:F.display, fontSize:'clamp(9px,1.3vw,10px)', letterSpacing:'0.35em', color:C.blue, textTransform:'uppercase', marginBottom:7, textShadow:`0 0 8px ${C.blue}` }}>O que é este diagrama</p>
      <p style={{ fontFamily:F.sans, fontSize:'clamp(14px,1.9vw,16px)', color:C.w45, lineHeight:1.8, textAlign:'justify' }}>{children}</p>
    </div>
  );
}

function DiagramCard({ num, title, intro, children }: { num:string; title:string; intro:string; children:React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity:0, y:18 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-50px' }}
      transition={{ duration:0.5 }}
      style={{ borderRadius:14, border:`1px solid ${C.border}`, background:C.bgCard, overflow:'hidden', marginBottom:'1.75rem' }}
    >
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:12, padding:'0.9rem clamp(1rem,3vw,1.5rem)', background:C.bgCardHd, borderBottom:`1px solid ${C.border}` }}>
        <span style={{ fontFamily:F.display, color:C.blue, fontSize:'clamp(18px,3vw,22px)', fontWeight:900, minWidth:40, textShadow:`0 0 16px ${C.blue}` }}>{num}</span>
        <div style={{ width:1, height:22, background:C.border }} />
        <span style={{ fontFamily:F.display, fontSize:'clamp(12px,1.8vw,14px)', letterSpacing:'0.28em', color:C.white, textTransform:'uppercase' }}>{title}</span>
      </div>
      <div style={{ padding:'clamp(1rem,3vw,1.5rem)' }}>
        <DiagramIntro>{intro}</DiagramIntro>
        {children}
      </div>
    </motion.div>
  );
}

function Row({ label, content, sub, greek=false }: { label?:string; content:React.ReactNode; sub?:string; greek?:boolean }) {
  return (
    <div style={{ marginBottom:'1rem' }}>
      {(label || sub) && (
        <div style={{ fontFamily:sub ? F.mono : F.display, fontSize: sub ? 14 : 13, letterSpacing: sub ? '0.05em' : '0.3em', color: sub ? `${C.blue}ee` : `${C.blue}dd`, textTransform:'uppercase', marginBottom:5 }}>
          {sub ?? label}
        </div>
      )}
      <div style={{ fontFamily: greek ? F.greek : F.sans, fontSize: greek ? 19 : 17, color:C.w65, lineHeight:1.8, textAlign:'justify' }}>{content}</div>
    </div>
  );
}

function ChiasmLine({ letra, versiculo, conteudo, indent=0, isCenter=false }: {
  letra:string; versiculo:string; conteudo:string; indent?:number; isCenter?:boolean
}) {
  return (
    <div style={{
      display:'flex', alignItems:'flex-start', gap:12,
      padding:'0.8rem 1rem', borderRadius:8,
      marginLeft: indent * 14, marginBottom:6,
      background: isCenter ? `${C.blue}0d` : 'rgba(255,255,255,0.015)',
      border:`1px solid ${isCenter ? C.blue+'30' : 'rgba(255,255,255,0.04)'}`,
    }}>
      <span style={{ fontFamily:F.display, fontSize:'clamp(14px,2vw,16px)', fontWeight:900, color: isCenter ? C.blue : `${C.blue}bb`, minWidth:42, paddingTop:2, textShadow: isCenter ? `0 0 14px ${C.blue}` : undefined }}>{letra}</span>
      <span style={{ fontFamily:F.mono, fontSize:'clamp(12px,1.8vw,14px)', color:C.w30, minWidth:82, paddingTop:4, whiteSpace:'nowrap' }}>{versiculo}</span>
      <span style={{ fontFamily:F.sans, fontSize:'clamp(15px,2.2vw,17px)', color:C.w65, lineHeight:1.7, textAlign:'justify' }}>{conteudo}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   CONTEÚDO DOS 23 DIAGRAMAS
═══════════════════════════════════════════════════ */
const DIAGRAMAS = [
  { num:'01', title:'Interlinear',
    intro: 'O Diagrama Interlinear coloca o texto grego original lado a lado com sua tradução palavra por palavra. Cada termo é traduzido literalmente, preservando a ordem e a morfologia do original, o que revela nuances de sentido que as traduções modernas frequentemente condensam ou reorganizam.',
    body: () => (
    <>
      <Row label="Mt 1:1 — Grego" greek content="Βίβλος γενέσεως Ἰησοῦ Χριστοῦ υἱοῦ Δαυὶδ υἱοῦ Ἀβραάμ" />
      <Row label="Transliteração" content="Biblos geneseōs Iēsou Christou huiou David huiou Abraam" />
      <Row label="Interlinear" content="Livro · de-genealogia · de-Jesus · Cristo · filho · de-Davi · filho · de-Abraão" />
      <Row label="Mt 1:16 — Grego" greek content="ἐγεννήθη Ἰησοῦς ὁ λεγόμενος Χριστός" />
      <Row label="Interlinear v.16" content="foi-gerado · Jesus · o · chamado · Cristo" />
      <ExplanationBox>A voz passiva ἐγεννήθη (v.16) contrasta com os 39 ἐγέννησεν anteriores. Onde todos os antepassados "geraram", aqui Jesus simplesmente "foi gerado" — agente indefinido, apontando para a ação do Espírito (Mt 1:18).</ExplanationBox>
    </>
  )},
  { num:'02', title:'Morfológico-Lexical',
    intro: 'O Diagrama Morfológico-Lexical analisa cada palavra-chave do texto quanto à sua forma gramatical (morfologia) e seu significado de dicionário (léxico). Identifica caso, número, gênero, tempo verbal e raiz semântica — as ferramentas que o próprio autor usou para construir o argumento.',
    body: () => (
    <>
      <Row sub="βίβλος" content="substantivo feminino · nominativo singular · livro, registro escrito" />
      <Row sub="γενέσεως" content="substantivo feminino · genitivo singular · de γένεσις — origem, geração, genealogia" />
      <Row sub="Ἰησοῦ" content="nome próprio · genitivo singular · hebraico יֵשׁוּעַ (Yeshua) — 'YHWH salva'" />
      <Row sub="Χριστοῦ" content="adjetivo-título · genitivo singular · do hebraico מָשִׁיחַ — Ungido" />
      <Row sub="ἐγέννησεν" content="verbo · aoristo indicativo ativo 3ª sg. · gennáō — gerar, procriar (× 39 nos vv.2–15)" />
      <Row sub="ἐγεννήθη" content="verbo · aoristo indicativo PASSIVO 3ª sg. · gennáō — foi gerado (ruptura única em v.16)" />
      <ExplanationBox>A análise morfológica revela que toda a genealogia gira em torno de dois verbos cognatos: a forma ativa ἐγέννησεν (39×) e a passiva ἐγεννήθη (1×). O contraste morfológico único no versículo 16 é o argumento central do texto.</ExplanationBox>
    </>
  )},
  { num:'03', title:'Quiástico',
    intro: 'O Diagrama Quiástico mapeia a estrutura espelhada do texto, na qual os elementos se correspondem em ordem inversa (A–B–C–B′–A′). O quiasma era um recurso literário amplamente usado na escrita hebraica e grega para destacar o centro da composição, onde o clímax teológico geralmente se encontra.',
    body: () => (
    <>
      <div style={{ background:'rgba(255,255,255,0.02)', border:`1px solid rgba(0,232,255,0.14)`, borderRadius:14, padding:'1.5rem', marginBottom:20 }}>
        <div style={{ textAlign:'center', marginBottom:22 }}>
          <p style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.4em', color:C.blue, textTransform:'uppercase', marginBottom:6, textShadow:`0 0 12px ${C.blue}` }}>Estrutura Quiástica · Mt 1:1–17</p>
          <p style={{ fontFamily:F.sans, fontStyle:'italic', fontSize:'clamp(14px,2vw,16px)', color:C.w30 }}>A – B¹ – B² – B³ – A′</p>
        </div>
        <div style={{ position:'relative', paddingLeft:18 }}>
          <div style={{ position:'absolute', left:5, top:26, bottom:26, width:1, background:`linear-gradient(to bottom, ${C.blue}aa, ${C.blue}15, ${C.blue}aa)` }} />
          <ChiasmLine letra="A"  versiculo="Mt 1:1"     conteudo="Jesus Cristo, filho de Davi, filho de Abraão — título que resume toda a genealogia" />
          <ChiasmLine letra="B¹" versiculo="Mt 1:2–6a"  conteudo="Da promessa à monarquia: Abraão até Davi, catorze gerações" indent={1} />
          <ChiasmLine letra="B²" versiculo="Mt 1:6b–11" conteudo="Da monarquia ao exílio: Davi até a deportação para Babilônia, catorze gerações" indent={1} />
          <ChiasmLine letra="B³" versiculo="Mt 1:12–16" conteudo="Do exílio ao cumprimento: da deportação até Jesus — ruptura passiva ἐγεννήθη" indent={2} isCenter />
          <ChiasmLine letra="A′" versiculo="Mt 1:17"    conteudo="Abraão → Davi → Exílio → Cristo: três eras, catorze gerações cada" />
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:14, marginTop:20, paddingTop:16, borderTop:`1px solid rgba(0,232,255,0.1)` }}>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:12, height:12, borderRadius:2, background:`${C.blue}15`, border:`1px solid ${C.borderB}` }} />
            <span style={{ fontFamily:F.display, fontSize:'clamp(10px,1.6vw,12px)', letterSpacing:'0.2em', color:C.w30, textTransform:'uppercase' }}>Centro do quiasma</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:14, height:1, background:`${C.blue}aa` }} />
            <span style={{ fontFamily:F.display, fontSize:'clamp(10px,1.6vw,12px)', letterSpacing:'0.2em', color:C.w30, textTransform:'uppercase' }}>Linha de inclusão</span>
          </div>
          <div style={{ marginLeft:'auto' }}>
            <span style={{ fontFamily:F.display, fontSize:'clamp(10px,1.6vw,12px)', letterSpacing:'0.15em', color:C.blue, textTransform:'uppercase' }}>A/A′ delimita e interpreta toda a estrutura</span>
          </div>
        </div>
      </div>
      <ExplanationBox>A estrutura quiástica situa o centro da perícope em B³, exatamente onde a ruptura passiva de v.16 ocorre. O clímax narrativo e teológico coincidem com o centro estrutural — marca de composição deliberada.</ExplanationBox>
    </>
  )},
  { num:'04', title:'Sintático',
    intro: 'O Diagrama Sintático desmonta as orações do texto, identificando sujeito, verbo, objeto direto, predicados e cláusulas subordinadas. Visualizar a estrutura sintática revela como o autor organizou suas ideias e qual elemento recebe ênfase gramatical dentro de cada período.',
    body: () => (
    <>
      <Row label="Oração nominal · v.1" content="Βίβλος γενέσεως [Ἰησοῦ Χριστοῦ] — sujeito implícito; cadeia de genitivos de especificação" />
      <Row label="Cláusulas ativas · vv.2–15" content="Padrão repetitivo: N₁ ἐγέννησεν N₂ — sujeito + verbo + objeto direto (39×)" />
      <Row label="Interpolações · vv.3.5.6" content="ἐκ + genitivo feminino marca as quatro mães; aposto que quebra o padrão masculino" />
      <Row label="Cláusula passiva · v.16" content="Ἰησοῦς ἐγεννήθη ἐξ αὐτῆς — sujeito + passivo + preposição; agente suprimido" />
      <Row label="Declaração · v.17" content="Πᾶσαι αἱ γενεαί + numeral + ἕως — declaração retrospectiva e sintética" />
      <ExplanationBox>Sintaticamente, a genealogia é uma máquina de repetição com duas interrupções programadas: as quatro mulheres (ἐκ + fem.) e a passiva de v.16. Ambas as interrupções são sintáticas antes de serem teológicas.</ExplanationBox>
    </>
  )},
  { num:'05', title:'Semântico',
    intro: 'O Diagrama Semântico agrupa as palavras do texto em campos de significado relacionados — promessa, crise, identidade, cumprimento — e mostra como esses campos interagem. A análise semântica revela o universo conceitual do autor e as ideias que ele repete, contrasta ou desenvolve ao longo da perícope.',
    body: () => (
    <>
      <Row label="Campo central" content="Identidade messiânica: Cristo, filho de Davi, filho de Abraão — três designações que se sobrepõem" />
      <Row label="Campo da promessa" content="Abraão (Gn 12:3; 22:18) + Davi (2Sm 7:12–16) — dois vetores de expectativa" />
      <Row label="Campo da ruptura" content="Tamar, Raabe, Rute, mulher de Urias — marginalidade, estrangeiria, irregularidade" />
      <Row label="Campo do exílio" content="Deportação para Babilônia (v.11.12.17) — ponto semântico de máxima crise" />
      <Row label="Campo da conclusão" content="ἐγεννήθη + Χριστός — convergência: a história e sua interrupção" />
      <ExplanationBox>O campo semântico de Mt 1:1–17 move-se da promessa (v.1) através da fidelidade histórica (vv.2–16) até a declaração de cumprimento (v.17). A inclusão das quatro mulheres cria uma subcorrente: o Messias vem através da margem, do estrangeiro, do escândalo.</ExplanationBox>
    </>
  )},
  { num:'06', title:'Progressivo',
    intro: 'O Diagrama Progressivo traça o desenvolvimento do texto etapa por etapa, mostrando como o argumento avança do início ao fim da perícope. Cada estágio prepara o seguinte, e o diagrama torna visível a lógica narrativa ou argumentativa que o autor construiu em sequência.',
    body: () => (
    <>
      {[
        ['Etapa 1 · Mt 1:1','Título: declaração de identidade — Jesus Cristo é quem é antes de qualquer narrativa'],
        ['Etapa 2 · Mt 1:2–6','Era Abraâmica: a promessa toma forma genealógica — de Abraão a Davi, 14 gerações de graça e imperfeição'],
        ['Etapa 3 · Mt 1:7–11','Era Davídica: a promessa atravessa a monarquia — a linhagem sobrevive apesar do pecado dos reis e do exílio'],
        ['Etapa 4 · Mt 1:12–16','Era do Silêncio: do exílio a José, nomes obscuros sustentam a linhagem por gerações sem profecia'],
        ['Etapa 5 · Mt 1:16','Ruptura: "da qual nasceu Jesus, chamado Cristo" — passiva que aponta para além da história'],
        ['Etapa 6 · Mt 1:17','Conclusão: três grupos de 14 gerações convergindo no Cristo'],
      ].map(([l,c]) => <Row key={l} label={l} content={c} />)}
      <ExplanationBox>A progressão é da promessa à consumação. O exílio babilônico — que poderia parecer o fim — é apenas o marcador do segundo terço. A providência de Deus não é interrompida pela tragédia histórica; ela é conduzida através dela.</ExplanationBox>
    </>
  )},
  { num:'07', title:'Intensificação',
    intro: 'O Diagrama de Intensificação mapeia a curva emocional e dramática do texto — onde a tensão cresce, onde atinge o clímax e onde se resolve. Identificar esses movimentos ajuda o pregador e o leitor a perceber o ritmo que o próprio autor imprimiu à narrativa ou ao discurso.',
    body: () => (
    <>
      {[
        ['Mt 1:1','Intensidade máxima inicial: em um versículo, toda a teologia messiânica do AT comprimida'],
        ['Mt 1:7–11','Tensão moral crescente: a deportação (v.11) representa a crise mais severa — a promessa parece em risco máximo'],
        ['Mt 1:12–16','Tensão pelo silêncio: nomes desconhecidos em era sem profecia; intensidade máxima pelo esquecimento aparente'],
        ['Mt 1:16','Clímax narrativo: a ruptura ἐγεννήθη vs. ἐγέννησεν é o ponto de maior intensidade'],
        ['Mt 1:17','Resolução pela simetria: a intensidade se resolve não em drama, mas em declaração aritmética'],
      ].map(([s,c]) => <Row key={s} sub={s} content={c} />)}
      <ExplanationBox>A intensificação segue curva que começa no alto (v.1), desce pela monotonia genealógica (vv.2–15), alcança o clímax na ruptura sintática de 1:16 e se resolve na declaração providencial de 1:17.</ExplanationBox>
    </>
  )},
  { num:'08', title:'Espacial',
    intro: 'O Diagrama Espacial localiza geograficamente os eventos e personagens da perícope, mostrando como o espaço físico e simbólico funciona no texto. Onde o autor situa cada elemento — e o que deixa sem localização — revela intenções teológicas e narrativas que a leitura linear facilmente ignora.',
    body: () => (
    <>
      {[
        ['Mt 1:1','Esfera da identidade revelada: sem espaço geográfico — declaração que paira sobre toda a narrativa'],
        ['Mt 1:2–6','Espaço dos patriarcas: Canaã, Egito, o deserto; inclui Raabe (Jericó), Rute (Moabe) — o horizonte se abre para fora de Israel'],
        ['Mt 1:7–11','Espaço da monarquia davídica: Jerusalém, o templo; ao fundo, a sombra da Babilônia avançando'],
        ['Mt 1:12–16','Espaço do exílio e retorno: Babilônia, depois Judeia anônima; gerações pós-exílicas sob impérios estrangeiros'],
        ['Mt 1:17','Esfera meta-histórica: o versículo descreve a estrutura do tempo, não do espaço'],
      ].map(([s,c]) => <Row key={s} sub={s} content={c} />)}
      <ExplanationBox>O movimento espacial é paradoxal: começa em toda parte (v.1), percorre terras concretas (vv.2–16) e retorna à análise estrutural (v.17). A inclusão de mulheres de Moabe e Canaã sinaliza que a genealogia do Messias já traversa fronteiras antes que o mandato missionário final (Mt 28:19) as declare abertas.</ExplanationBox>
    </>
  )},
  { num:'09', title:'Acesso',
    intro: 'O Diagrama de Acesso pergunta: para quem este texto fala e quem ele inclui ou exclui? Analisa quais grupos, identidades e histórias o autor coloca no texto e como isso define o alcance da mensagem. É uma lente missiológica e inclusiva que revela a amplitude intencional do Evangelho.',
    body: () => (
    <>
      <Row label="Acesso para Israel" content="Mt 1:1 'filho de Davi' — resposta à expectativa messiânica judaica; todo israelita que conhecia 2Sm 7 reconhecia o código" />
      <Row label="Acesso para as nações" content="Mt 1:1 'filho de Abraão' — 'em ti serão benditas todas as famílias da terra' (Gn 12:3)" />
      <Row label="Acesso ampliado" content="Mt 1:3.5.6 — Tamar, Raabe, Rute, mulher de Urias: a genealogia inclui o excluído, o estrangeiro, o moralmente comprometido" />
      <Row label="Restrição ao padrão" content="Mt 1:16 passiva — o acesso ao Messias não é produzido pela cadeia genealógica; salvação não é por herança biológica" />
      <ExplanationBox>Mt 1:1–17 constrói uma teologia do acesso radicalmente inclusiva. E em 1:16 declara: nenhum desses acessos produz o Messias — ele nasce por outro caminho.</ExplanationBox>
    </>
  )},
  { num:'10', title:'Relacional',
    intro: 'O Diagrama Relacional mapeia as conexões entre os personagens do texto — quem se relaciona com quem, em que tipo de vínculo e com que implicações. Aplicado a Jesus, revela a rede de relações que o Evangelho constrói entre o Messias, Deus, Israel, as nações e os indivíduos na perícope.',
    body: () => (
    <>
      <Row label="Jesus e Deus" content="Jesus é o Cristo, o Ungido do SENHOR — relação de eleição divina declarada antes de qualquer outra" />
      <Row label="Jesus e Abraão" content="Pertencimento e cumprimento da promessa — a aliança abraâmica encontra seu herdeiro definitivo" />
      <Row label="Jesus e Davi" content="Herança do trono — a promessa davídica (2Sm 7:12–16) é genealogicamente cumprida; Jesus pertence à linhagem real" />
      <Row label="Jesus e as quatro mulheres" content="Solidariedade com a margem — Tamar, Raabe, Rute e a mulher de Urias são ancestrais do Messias" />
      <Row label="Jesus e José/Maria" content="José é 'o marido de Maria' — papel de reconhecimento legal, não de paternidade biológica; adoção davídica por aliança" />
      <ExplanationBox>A teia relacional é extraordinariamente rica. Jesus está em relação com Deus (Ungido), com Abraão (cumprimento), com Davi (herança do trono), com estrangeiras e irregulares (solidariedade) e com toda a história humana (ponto de chegada de 42 gerações).</ExplanationBox>
    </>
  )},
  { num:'11', title:'Cristológico',
    intro: 'O Diagrama Cristológico concentra o olhar em Jesus: quem ele é, o que os títulos dizem sobre sua natureza e missão, e como a perícope contribui para a teologia do Messias. É o diagrama que responde à pergunta central de todo o Evangelho: "Quem é este homem?"',
    body: () => (
    <>
      {[
        ["Mt 1:1 — 'Jesus Cristo'","Χριστός = Mashiach; a tríplice unção do AT (reis, sacerdotes, profetas) converge; Jesus é o ungido por excelência"],
        ["Mt 1:1 — 'filho de Davi'","A aliança davídica (2Sm 7:12–16) prometia trono eterno; Jesus cumpre pela ressurreição e exaltação (Rm 1:3–4; At 2:29–36)"],
        ["Mt 1:1 — 'filho de Abraão'","Gl 3:16 interpreta 'descendência de Abraão' como referindo-se a Cristo; a bênção de todas as nações se cumpre em Jesus"],
        ["Mt 1:3.5.6 — mulheres","Prefiguram a inclusão que Cristo realizará — estrangeiras, irregulares, vítimas são antepassadas do Redentor (Hb 2:14–17)"],
        ["Mt 1:16 — passiva","A voz passiva ἐγεννήθη aponta para a concepção virginal; Jesus é o novo Adão — gerado pelo Espírito (1Co 15:45–49)"],
      ].map(([s,c]) => <Row key={s} sub={s} content={c} />)}
      <ExplanationBox>Mt 1:1–17 é uma cristologia condensada em genealogia. Cada elemento — título, linhagem, mulheres incluídas, ruptura passiva, simetria aritmética — aponta para a identidade única de Jesus: plenamente humano, plenamente messiânico, e categoricamente diferente de todos os seus antepassados.</ExplanationBox>
    </>
  )},
  { num:'12', title:'Sistemático',
    intro: 'O Diagrama Sistemático conecta o texto às grandes categorias da teologia cristã: revelação, cristologia, soteriologia, escatologia, providência, graça. Mostra como um único trecho das Escrituras toca múltiplos temas doutrinários ao mesmo tempo, enriquecendo o estudo com perspectiva teológica ampla.',
    body: () => (
    <>
      {[
        ['Revelação','Mt 1:1 — Mateus abre com título que invoca a autoridade da Escritura; ressonância com Gênesis = nova criação'],
        ['Cristologia','Mt 1:1 — A identidade de Jesus como humano (nome) e Ungido (título) é declarada antes de qualquer narrativa'],
        ['Escatologia / Reino','Mt 1:1 — "Filho de Davi" fundamenta a teologia do reino de Deus proclamado em todo o Evangelho'],
        ['Missão / Soteriologia','Mt 1:1 — "Filho de Abraão" funda a universalidade da salvação e antecipa Mt 28:19'],
        ['Graça','Mt 1:3.5.6 — A inclusão de Tamar, Raabe, Rute ensina que a graça opera através da irregularidade humana'],
        ['Providência','Mt 1:17 — Três eras simétricas demonstram que o Messias veio na plenitude do tempo (Gl 4:4)'],
      ].map(([l,c]) => <Row key={l} label={l} content={c} />)}
      <ExplanationBox>Em 17 versículos, Mt 1:1–17 toca seis categorias da teologia sistemática. A genealogia demonstra simultaneamente a humanidade de Jesus, a fidelidade de Deus, a universalidade da salvação e a soberania providencial sobre a história.</ExplanationBox>
    </>
  )},
  { num:'13', title:'Tensão Narrativa',
    intro: 'O Diagrama de Tensão Narrativa identifica os conflitos, perguntas e problemas que o texto instala intencionalmente — e como os resolve (ou deixa em aberto). Todo texto bem escrito cria tensão para conduzir o leitor; reconhecê-la é o primeiro passo para pregar ou ensinar com o mesmo poder dramático do original.',
    body: () => (
    <>
      {[
        ['Mt 1:1','Tensão inaugural: "Jesus Cristo" cria tensão imediata para o leitor judeu — este homem é o Messias?'],
        ['Mt 1:3.5.6','Tensão moral: adultério, prostituição, estrangeiria; a promessa parece contaminar-se pelo pecado humano na própria linhagem'],
        ['Mt 1:7–11','Tensão histórica: a deportação para a Babilônia (v.11) é o nadir — o momento em que a promessa parece extinta'],
        ['Mt 1:12–16','Tensão pelo silêncio: nomes obscuros em era sem profecia; o leitor não sabe se a promessa sobreviverá ao anonimato'],
        ['Mt 1:17','Resolução estrutural: a tensão histórica se resolve pela simetria — mas a tensão cristológica (como nasceu?) permanece aberta'],
      ].map(([s,c]) => <Row key={s} sub={s} content={c} />)}
      <ExplanationBox>Mt 1:1–17 instala pelo menos cinco tensões: identidade, moral, histórica, silêncio e concepção. Mateus deixa tensões propositalmente abertas para o restante do Evangelho.</ExplanationBox>
    </>
  )},
  { num:'14', title:'Repetição',
    intro: 'O Diagrama de Repetição identifica palavras, expressões e estruturas que se repetem no texto e analisa por quê. A repetição no mundo bíblico não é acidente nem limitação do autor — é o principal recurso retórico para marcar ênfase, criar ritmo e conduzir o leitor ao núcleo da mensagem.',
    body: () => (
    <>
      <Row sub="ἐγέννησεν × 39" content="Mt 1:2–15: verbo 'gerou' repetido 39 vezes — cria ritmo e expectativa que torna a ruptura de 1:16 tanto mais impactante" />
      <Row sub="Abraão·Davi·Cristo × 2" content="Mt 1:1 e 1:17: os três nomes-chave repetem-se formando a inclusão quiástica A/A′ que delimita e interpreta toda a genealogia" />
      <Row sub="δεκατέσσαρες × 3" content="Mt 1:17: 'quatorze gerações' repetido três vezes — declaração tripla de providência divina" />
      <Row sub="ἐκ (de) × 4" content="Mt 1:3.5.5.6: preposição usada para identificar as quatro mães — repetição que destaca intencionalmente as mulheres na cadeia" />
      <ExplanationBox>A repetição opera em múltiplos níveis: o ἐγέννησεν rítmico cria a expectativa que a ruptura de 1:16 satisfaz; a inclusão A/A′ ensina a chave interpretativa; e a tripla repetição de "quatorze" em 1:17 substitui qualquer argumento verbal — a simetria fala por si mesma.</ExplanationBox>
    </>
  )},
  { num:'15', title:'Causa e Efeito',
    intro: 'O Diagrama de Causa e Efeito rastreia as relações de consequência no texto: o que produz o quê, o que leva a quê. Em textos bíblicos, essa análise revela como Deus age na história através de eventos humanos, promessas cumpridas e crises redimidas — a lógica providencial por trás da narrativa.',
    body: () => (
    <>
      <Row label="Promessa abraâmica" content="Deus promete bênção para todas as nações (Gn 12:3) → dois milênios depois, o herdeiro chega como Jesus Cristo, filho de Abraão" />
      <Row label="Aliança davídica" content="Deus promete descendência com trono eterno (2Sm 7:12–16) → mil anos depois, o herdeiro do trono é identificado como Jesus, filho de Davi" />
      <Row label="Pecado e crise" content="Pecado humano (adultério, deportação) ameaça a promessa → a graça opera precisamente através das crises — elas são elos, não obstáculos" />
      <Row label="Ruptura de 1:16" content="A cadeia chega ao fim de modo que ela não poderia produzir → Jesus nasce de Maria pelo Espírito, inaugurando o que a genealogia prenunciava" />
      <ExplanationBox>Mt 1:1–17 demonstra que Deus conduz a história através de causas e efeitos que os agentes humanos não compreendem enquanto os vivem. O adultério de Davi, o exílio babilônico, o anonimato das gerações pós-exílicas — todos são elos de uma cadeia causal que Deus usa para cumprir o que prometeu.</ExplanationBox>
    </>
  )},
  { num:'16', title:'Apologético',
    intro: 'O Diagrama Apologético identifica as afirmações do texto que respondem a erros teológicos, objeções doutrinárias ou heresias históricas. Todo texto bíblico afirma algo — e ao afirmar, implicitamente nega o contrário. Esse diagrama torna explícito o que o texto defende e o que ele refuta.',
    body: () => (
    <>
      {[
        { tag:'Docetismo',       tema:'Contra a negação da humanidade de Jesus',      texto:'Jesus tem genealogia, ancestrais, história — a encarnação é real; qualquer teologia que nega sua carne plena é refutada pelo próprio início do Evangelho.' },
        { tag:'Adocionismo',     tema:'Contra a identidade messiânica adquirida',     texto:'Desde o v.1 Jesus já é "Jesus Cristo" — a identidade messiânica é constitutiva, não adquirida no batismo ou na ressurreição.' },
        { tag:'Antissemitismo',  tema:'Contra a dissociação de Jesus do judaísmo',    texto:'Jesus é profundamente enraizado na história de Israel; sem Davi e Abraão, o título messiânico perde seu conteúdo.' },
        { tag:'Exclusivismo',    tema:'Contra a pureza étnica como critério',         texto:'Raabe (cananeia), Rute (moabita), mulher de Urias são antepassadas do Messias; a pureza étnica não é critério na genealogia divina.' },
        { tag:'Materialismo',    tema:'Contra o acaso histórico',                     texto:'A simetria de 3 × 14 gerações demonstra que a história tem ordem, direção e propósito.' },
      ].map(({ tag, tema, texto }) => (
        <div key={tag} style={{ borderRadius:8, border:`1px solid rgba(255,255,255,0.05)`, background:'rgba(255,255,255,0.015)', padding:'0.9rem 1.1rem', marginBottom:8, display:'flex', gap:12, alignItems:'flex-start' }}>
          <span style={{ fontFamily:F.display, fontSize:'clamp(10px,1.6vw,12px)', letterSpacing:'0.25em', color:C.rose, background:'rgba(255,45,85,0.1)', border:'1px solid rgba(255,45,85,0.25)', borderRadius:50, padding:'2px 8px', whiteSpace:'nowrap', marginTop:2 }}>{tag}</span>
          <div>
            <p style={{ fontFamily:F.sans, color:C.w65, fontSize:'clamp(13px,1.9vw,15px)', fontWeight:600, marginBottom:4 }}>{tema}</p>
            <p style={{ fontFamily:F.sans, color:C.w45, fontSize:'clamp(14px,2vw,16px)', lineHeight:1.75, textAlign:'justify' }}>{texto}</p>
          </div>
        </div>
      ))}
    </>
  )},
  { num:'17', title:'Perguntas ao Texto',
    intro: 'O Diagrama de Perguntas ao Texto lista as questões que um bom leitor deve fazer antes, durante e depois de ler a perícope. Fazer as perguntas certas é metade da interpretação: elas abrem o texto em vez de o fechar, mantêm o leitor em diálogo com o autor e revelam onde a exegese ainda tem trabalho a fazer.',
    body: () => (
    <>
      {[
        { grupo:'A abertura — Mt 1:1', perguntas:['Por que Mateus começa com "Livro da genealogia" em vez de uma narrativa direta?','O que a ressonância com Gênesis (γένεσις) sugere sobre a intenção do evangelista?','Por que "filho de Davi" vem antes de "filho de Abraão", se Abraão é historicamente anterior?'] },
        { grupo:'As quatro mulheres — Mt 1:3.5.6', perguntas:['Por que Mateus inclui Tamar, Raabe, Rute e a mulher de Urias, mas não Sara, Rebeca ou Lia?','O que une essas quatro mulheres? (irregularidade, estrangeiria, marginalidade)','Como sua presença prepara a narrativa do nascimento virginal de Maria?'] },
        { grupo:'A deportação como marco — Mt 1:11–12', perguntas:['Por que o exílio babilônico é o segundo divisor histórico da genealogia?','O que significa que a promessa messiânica sobreviveu ao pior momento da história de Israel?'] },
        { grupo:'A ruptura de 1:16', perguntas:['Por que o versículo 16 rompe o padrão estabelecido por 39 repetições de "gerou"?','O que a voz passiva ἐγεννήθη e o pronome feminino ἐξ ἧς comunicam sobre a concepção de Jesus?','Como José participa da genealogia davídica de Jesus sem ser seu pai biológico?'] },
      ].map(({ grupo, perguntas }) => (
        <div key={grupo} style={{ borderRadius:8, border:`1px solid rgba(255,255,255,0.05)`, background:'rgba(255,255,255,0.015)', padding:'1rem 1.1rem', marginBottom:8 }}>
          <p style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.3em', color:`${C.blue}dd`, textTransform:'uppercase', marginBottom:8 }}>{grupo}</p>
          <ul style={{ margin:0, padding:0, listStyle:'none' }}>
            {perguntas.map((p,i) => (
              <li key={i} style={{ display:'flex', gap:10, marginBottom:7, fontFamily:F.sans, fontSize:'clamp(14px,2vw,16px)', color:C.w65, lineHeight:1.75, textAlign:'justify' }}>
                <span style={{ color:`${C.blue}aa`, marginTop:3, flexShrink:0 }}>›</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )},
  { num:'18', title:'Autoral — Scholarship',
    intro: 'O Diagrama Autoral coloca o texto em diálogo com os grandes comentaristas bíblicos — Davies & Allison, R.T. France, Donald Hagner, John Nolland e outros. Não para substituir a leitura direta, mas para mostrar como estudiosos rigorosos interpretaram os mesmos versículos, confirmando ou enriquecendo as observações exegéticas.',
    body: () => (
    <>
      {[
        { ref:'Davies & Allison · ICC', autor:'sobre Mt 1:1', citacao:'"A expressão βίβλος γενέσεως ressoa com a fraseologia da LXX em Gênesis 2:4 e 5:1. Mateus apresenta Jesus como o início de uma nova criação — não uma reparação do antigo, mas um novo começo."' },
        { ref:'R.T. France · NICNT', autor:'sobre Mt 1:1b–1c', citacao:'"A combinação \'filho de Davi, filho de Abraão\' concentra em duas expressões toda a expectativa messiânica do Antigo Testamento: a promessa régia (davídica) e a promessa universal (abraâmica). Mateus coloca seu programa teológico inteiro no primeiro versículo."' },
        { ref:'Donald A. Hagner · WBC', autor:'sobre Mt 1:16', citacao:'"A mudança da voz ativa para a passiva em 1:16 é a virada decisiva da genealogia. Após 39 repetições de ἐγέννησεν, a passiva ἐγεννήθη interrompe o padrão de forma deliberada, sinalizando que a geração do Messias é de uma ordem diferente de todas as que a precederam."' },
        { ref:'John Nolland · NIGTC', autor:'sobre Mt 1:17', citacao:'"O esquema de 3 × 14 gerações pode evocar o valor numérico do nome David em hebraico (ד=4, ו=6, ד=4; total=14), reforçando a identidade davídica de Jesus. Mais importante, a simetria revela que a história é ordenada por Deus em direção ao Messias."' },
      ].map(({ ref, autor, citacao }) => (
        <div key={ref} style={{ borderRadius:8, border:`1px solid rgba(255,255,255,0.05)`, background:'rgba(255,255,255,0.015)', padding:'1rem 1.1rem', marginBottom:8 }}>
          <p style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.25em', color:C.w30, textTransform:'uppercase', marginBottom:4 }}>{ref}</p>
          <p style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', color:C.w45, marginBottom:8 }}>{autor}</p>
          <p style={{ fontFamily:F.sans, color:C.w65, fontSize:'clamp(15px,2.2vw,17px)', lineHeight:1.85, fontStyle:'italic', textAlign:'justify' }}>{citacao}</p>
        </div>
      ))}
      <ExplanationBox>O diálogo com Davies-Allison, France, Hagner e Nolland confirma que as interpretações propostas têm sólido fundamento na scholarship. O consenso é claro: Mt 1:1–17 é texto teológico de alta densidade, e cada elemento é deliberado e significativo.</ExplanationBox>
    </>
  )},
  { num:'19', title:'Homilético',
    intro: 'O Diagrama Homilético transforma a exegese em pregação: define o tema central da perícope, propõe um título, divide o texto em movimentos lógicos e sugere pontos de aplicação. É a ponte entre o que o texto diz e o que o pregador ou professor comunicará à congregação ou à sala de aula.',
    body: () => (
    <>
      <div style={{ borderRadius:8, border:`1px solid rgba(0,212,255,0.18)`, background:'rgba(0,212,255,0.04)', padding:'1.1rem', marginBottom:12 }}>
        <p style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.3em', color:`${C.blue}dd`, textTransform:'uppercase', marginBottom:8 }}>Tema Central</p>
        <p style={{ fontFamily:F.sans, color:C.w65, lineHeight:1.85, fontSize:'clamp(15px,2.2vw,17px)', textAlign:'justify' }}>Como Deus conduz a história através de promessas, crises, silêncios e irregularidades humanas até o único ponto para o qual ela sempre caminhava?</p>
      </div>
      <div style={{ borderRadius:8, border:`1px solid rgba(0,212,255,0.15)`, background:'rgba(0,212,255,0.03)', padding:'0.85rem 1.1rem', marginBottom:16 }}>
        <span style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.25em', color:C.blue, textTransform:'uppercase', marginRight:8 }}>Título</span>
        <span style={{ fontFamily:F.sans, color:C.w65, fontSize:'clamp(15px,2.2vw,17px)' }}>Quarenta e duas gerações até o Messias: a genealogia que conta a história que você precisava ouvir</span>
      </div>
      {[
        { romano:'I · Mt 1:1',      titulo:'O fim está no começo',              ponto:'Toda a perícope existe para justificar este versículo; o Messias já está identificado antes que qualquer geração seja listada',                    app:'A fé não começa com nossa busca — começa com uma identidade já declarada por Deus' },
        { romano:'II · Mt 1:2–6',   titulo:'A promessa atravessa a imperfeição', ponto:'Deus não espera linhagens limpas; ele trabalha através das histórias complicadas das pessoas reais',                                              app:'Sua história, com todas as suas irregularidades, não está fora do alcance da graça' },
        { romano:'III · Mt 1:7–12', titulo:'A promessa atravessa a tragédia',   ponto:'Deus inclui as deportações na sua estrutura de 14 gerações; a crise não cancela a promessa',                                                     app:'O que parece o fim da sua história pode ser apenas a transição para o próximo capítulo' },
        { romano:'IV · Mt 1:12–16', titulo:'A promessa atravessa o anonimato',  ponto:'As gerações obscuras mantiveram a linhagem viva; a fidelidade cotidiana das pessoas que ninguém conhece faz parte do plano',                    app:'A fidelidade silenciosa da sua vida tem peso na genealogia espiritual que você transmite' },
      ].map(({ romano, titulo, ponto, app }) => (
        <div key={romano} style={{ borderRadius:8, border:`1px solid rgba(255,255,255,0.05)`, background:'rgba(255,255,255,0.015)', padding:'1rem 1.1rem', marginBottom:8 }}>
          <p style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.3em', color:`${C.blue}cc`, textTransform:'uppercase', marginBottom:4 }}>{romano}</p>
          <p style={{ fontFamily:F.sans, color:C.white, fontSize:'clamp(14px,2vw,16px)', fontWeight:700, marginBottom:4 }}>{titulo}</p>
          <p style={{ fontFamily:F.sans, color:C.w65, fontSize:'clamp(14px,2vw,16px)', lineHeight:1.75, marginBottom:4, textAlign:'justify' }}>{ponto}</p>
          <p style={{ fontFamily:F.sans, color:C.blue, fontSize:'clamp(13px,1.9vw,15px)', fontStyle:'italic', borderLeft:`2px solid rgba(0,212,255,0.25)`, paddingLeft:12 }}>{app}</p>
        </div>
      ))}
    </>
  )},
  { num:'20', title:'Pastoral Prático',
    intro: 'O Diagrama Pastoral Prático aplica o texto a contextos concretos de cuidado e formação: adultos, jovens, famílias em crise, pessoas que se sentem excluídas. Enquanto o diagrama homilético foca na mensagem pública, este foca no acompanhamento pessoal — o que o pastor ou líder diz ao lado do indivíduo.',
    body: () => (
    <>
      {[
        { ref:'Mt 1:1 — Identidade declarada', heading:'A identidade antes da história',           aud:[{tag:'Adultos',texto:'Em uma cultura que exige que cada pessoa construa sua identidade, o texto afirma que a identidade de Jesus foi declarada por Deus antes de qualquer feito'},{tag:'Jovens',texto:'Combate a crença de que você precisa se provar para ser aceito'}] },
        { ref:'Mt 1:3.5.6 — As quatro mulheres', heading:'A graça que opera através da irregularidade', aud:[{tag:'Adultos',texto:'Histórias complicadas não disqualificam da linhagem da graça'},{tag:'Jovens',texto:'Quem se sente excluído por sua história encontra aqui antepassadas do Messias'}] },
        { ref:'Mt 1:12–16 — Gerações obscuras', heading:'A fidelidade nas gerações sem nome',     aud:[{tag:'Adultos',texto:'A fidelidade cotidiana das gerações do pós-exílio manteve a linhagem viva; sua fidelidade obscura importa'},{tag:'Jovens',texto:'Não é necessário ser famoso para importar no plano de Deus'}] },
      ].map(({ ref, heading, aud }) => (
        <div key={ref} style={{ borderRadius:8, border:`1px solid rgba(255,255,255,0.05)`, background:'rgba(255,255,255,0.015)', padding:'1rem 1.1rem', marginBottom:8 }}>
          <p style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.3em', color:`${C.blue}cc`, textTransform:'uppercase', marginBottom:4 }}>{ref}</p>
          <p style={{ fontFamily:F.sans, color:C.white, fontSize:'clamp(14px,2vw,16px)', fontWeight:700, marginBottom:8 }}>{heading}</p>
          {aud.map(({ tag, texto }) => (
            <div key={tag} style={{ display:'flex', gap:10, marginBottom:7, alignItems:'flex-start' }}>
              <span style={{ fontFamily:F.display, fontSize:'clamp(10px,1.6vw,12px)', letterSpacing:'0.2em', color:C.w30, background:'rgba(255,255,255,0.04)', border:`1px solid rgba(255,255,255,0.07)`, borderRadius:50, padding:'2px 7px', whiteSpace:'nowrap', marginTop:2 }}>{tag}</span>
              <p style={{ fontFamily:F.sans, color:C.w65, fontSize:'clamp(14px,2vw,16px)', lineHeight:1.75, textAlign:'justify' }}>{texto}</p>
            </div>
          ))}
        </div>
      ))}
      <ExplanationBox>Mt 1:1–17 é texto pastoral de alta densidade. Ele fala a quem se sente excluído pela história, a quem sente que a crise destruiu tudo, a quem serve sem visibilidade e a quem precisa de sentido numa história caótica.</ExplanationBox>
    </>
  )},
  { num:'21', title:'Antropológico',
    intro: 'O Diagrama Antropológico pergunta o que o texto revela sobre o ser humano: sua identidade, sua dignidade, sua capacidade de queda e de redenção. Cruza dimensões filosófica, psicológica e sociológica com a teologia do texto, mostrando como a Bíblia oferece uma visão de humanidade mais rica do que qualquer disciplina isolada.',
    body: () => (
    <>
      {[
        { secao:'Mt 1:1 — Identidade', rows:[{dim:'Filosófico',texto:'Quem define a identidade humana — o indivíduo, a cultura ou Deus?'},{dim:'Psicológico',texto:'Jesus tem nome e título declarados por Deus antes de qualquer feito; identidade revelada, não conquistada'},{dim:'Teológico',texto:'Christos: o ungido; toda a função sacerdotal, profética e régia converge neste título'}] },
        { secao:'Mt 1:3.5.6 — Marginalidade e Graça', rows:[{dim:'Sociológico',texto:'Estrangeiras (Raabe, Rute), vítima (mulher de Urias), marginal (Tamar) integradas à linhagem messiânica'},{dim:'Teológico',texto:'A eleição não é por pureza moral ou étnica; Deus age através de quem o mundo exclui'}] },
        { secao:'Mt 1:16–17 — Ruptura e Estrutura', rows:[{dim:'Filosófico',texto:'A história pode produzir seu próprio redentor, ou precisa de um agente externo?'},{dim:'Teológico',texto:'A passiva ἐγεννήθη declara que Jesus não é produto da genealogia — ele é a intervenção de Deus na história'}] },
      ].map(({ secao, rows }) => (
        <div key={secao} style={{ borderRadius:8, border:`1px solid rgba(255,255,255,0.05)`, background:'rgba(255,255,255,0.015)', padding:'1rem 1.1rem', marginBottom:8 }}>
          <p style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.3em', color:`${C.blue}cc`, textTransform:'uppercase', marginBottom:8 }}>{secao}</p>
          {rows.map(({ dim, texto }) => (
            <div key={dim} style={{ display:'flex', gap:12, marginBottom:7 }}>
              <span style={{ fontFamily:F.sans, color:C.w30, fontSize:'clamp(11px,1.7vw,13px)', fontWeight:700, minWidth:90, paddingTop:1 }}>{dim}</span>
              <span style={{ fontFamily:F.sans, color:C.w65, fontSize:'clamp(14px,2vw,16px)', lineHeight:1.75, textAlign:'justify' }}>{texto}</span>
            </div>
          ))}
        </div>
      ))}
    </>
  )},
  { num:'22', title:'Familiar',
    intro: 'O Diagrama Familiar aplica o texto ao contexto de casamento, família, paternidade e transmissão de fé entre gerações. A Bíblia foi escrita para ser lida em comunidade e em lar; este diagrama recupera essa dimensão, mostrando como cada perícope fala à vida concreta das famílias.',
    body: () => (
    <>
      {[
        { ref:'Mt 1:3.5.6', heading:'Tamar, Raabe, Rute, Bate-Seba', pontos:['As quatro mulheres têm histórias que nenhuma família escolheria destacar — adultério, prostituição, viuvez estrangeira. Mateus as inclui deliberadamente.','O texto ensina às famílias que a graça de Deus não exige histórias limpas — ela opera através das histórias reais, inclusive as dolorosas e complicadas.'] },
        { ref:'Mt 1:11–12', heading:'Gerações que transmitiram a fé no exílio', pontos:['As gerações entre a deportação e o retorno (c. 586–538 a.C.) mantiveram a linhagem viva sem terra, sem templo, sem reis.','Famílias que preservam a fé no exílio fazem parte do plano — são elos insubstituíveis da genealogia espiritual.'] },
        { ref:'Mt 1:16', heading:'Paternidade por aliança', pontos:['José não é pai biológico de Jesus, mas assume a paternidade davídica por decisão e aliança — modelo de paternidade como cobertura e responsabilidade.','Famílias que incluem filhos por adoção encontram aqui um modelo: José, o pai por aliança do Filho de Deus.'] },
      ].map(({ ref, heading, pontos }) => (
        <div key={ref} style={{ borderRadius:8, border:`1px solid rgba(255,255,255,0.05)`, background:'rgba(255,255,255,0.015)', padding:'1rem 1.1rem', marginBottom:8 }}>
          <p style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.3em', color:`${C.blue}cc`, textTransform:'uppercase', marginBottom:4 }}>{ref}</p>
          <p style={{ fontFamily:F.sans, color:C.white, fontSize:'clamp(14px,2vw,16px)', fontWeight:700, marginBottom:8 }}>{heading}</p>
          {pontos.map((p,i) => <p key={i} style={{ fontFamily:F.sans, color:C.w65, fontSize:'clamp(14px,2vw,16px)', lineHeight:1.8, marginBottom:5, textAlign:'justify' }}>{p}</p>)}
        </div>
      ))}
    </>
  )},
  { num:'23', title:'Trinitário',
    intro: 'O Diagrama Trinitário pergunta como Pai, Filho e Espírito Santo aparecem — explícita ou implicitamente — na perícope. Mesmo em textos onde apenas uma pessoa da Trindade é mencionada, o diagrama revela as conexões implícitas com as outras duas, enriquecendo a leitura com a profundidade da teologia cristã clássica.',
    body: () => (
    <>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(180px,100%), 1fr))', gap:10, marginBottom:14 }}>
        {[
          { label:'Pai',     ref:'Mt 1:1',     color:C.blue,   border:`${C.blue}88`,    bg:`${C.blue}0a`,    texto:'O Legislador da aliança e Autor da história — promessas a Abraão (Gn 12:3) e a Davi (2Sm 7:13); a genealogia é o registro de sua fidelidade ao longo de dois milênios' },
          { label:'Filho',   ref:'Mt 1:2–16',  color:C.w65,    border:`rgba(255,255,255,0.12)`, bg:`rgba(255,255,255,0.025)`, texto:'O herdeiro que assume a genealogia — o Filho eterno entra na história como descendente de Abraão e herdeiro de Davi, cumprindo as promessas do Pai com suas crises e silêncios incluídos' },
          { label:'Espírito',ref:'Mt 1:16',    color:C.purple, border:`${C.purple}30`,  bg:`${C.purple}06`,  texto:'O Agente da ruptura — a passiva ἐγεννήθη aponta para a concepção pelo Espírito Santo; o mesmo Espírito da criação (Gn 1:2) age para inaugurar a nova criação em Jesus' },
        ].map(({ label, ref, color, border, bg, texto }) => (
          <div key={label} style={{ border:`1px solid ${border}`, borderRadius:10, background:bg, padding:'1.1rem', textAlign:'center' }}>
            <span style={{ color, fontSize:'clamp(15px,2.4vw,18px)' }}>✦</span>
            <p style={{ fontFamily:F.display, fontSize:10, letterSpacing:'0.3em', color, textTransform:'uppercase', margin:'7px 0 3px' }}>{label}</p>
            <p style={{ fontFamily:F.mono, fontSize:'clamp(11px,1.7vw,13px)', color:C.w30, marginBottom:10 }}>{ref}</p>
            <p style={{ fontFamily:F.sans, color:C.w65, fontSize:'clamp(12px,1.8vw,14px)', lineHeight:1.75, textAlign:'justify' }}>{texto}</p>
          </div>
        ))}
      </div>
      <ExplanationBox>Em Mt 1:1–17, a Trindade está presente em forma de prefiguração e implicação estrutural. O versículo 16 é o ponto de encontro das três pessoas: o Pai que ordena, o Filho que chega, o Espírito que torna possível o impossível.</ExplanationBox>
    </>
  )},
];

/* ═══════════════════════════════════════════════════
   PÁGINA PRINCIPAL
═══════════════════════════════════════════════════ */
export default function EbookMateusPage() {
  return (
    <div style={{ background:C.bg, minHeight:'100vh', color:C.white }}>

      {/* ── Botão voltar flutuante ── */}
      <Link
        to="/livraria"
        style={{
          position:'fixed', top:18, left:18, zIndex:100,
          display:'flex', alignItems:'center', gap:6,
          padding:'7px 16px',
          background:'rgba(10,10,10,0.92)',
          border:`1px solid rgba(0,212,255,0.25)`,
          borderRadius:50,
          color:'rgba(255,255,255,0.55)',
          fontSize:'clamp(10px,1.5vw,11px)',
          fontFamily:F.display,
          letterSpacing:'0.2em',
          textDecoration:'none',
          backdropFilter:'blur(14px)',
        }}
      >
        <ChevronLeft size={13} />
        Seções
      </Link>

      {/* ══════════════════════════
          CAPA
      ══════════════════════════ */}
      <section style={{
        minHeight:'100vh',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        textAlign:'center', padding:'clamp(80px,12vh,120px) clamp(1rem,4vw,2rem) 80px',
        background:`radial-gradient(ellipse at 50% 35%, rgba(0,212,255,0.07) 0%, transparent 65%)`,
        position:'relative', overflow:'hidden',
      }}>
        {/* Linhas de canto */}
        {[{t:32,l:32,bt:true,bl:true},{t:32,r:32,bt:true,br:true},{b:32,l:32,bb:true,bl:true},{b:32,r:32,bb:true,br:true}].map((p,i) => (
          <div key={i} style={{
            position:'absolute', width:72, height:72,
            top:p.t, bottom:p.b, left:p.l, right:p.r,
            borderTop:    p.bt ? `1px solid rgba(0,212,255,0.2)` : undefined,
            borderBottom: p.bb ? `1px solid rgba(0,212,255,0.2)` : undefined,
            borderLeft:   p.bl ? `1px solid rgba(0,212,255,0.2)` : undefined,
            borderRight:  p.br ? `1px solid rgba(0,212,255,0.2)` : undefined,
          }} />
        ))}

        <motion.div initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, ease:'easeOut' }} style={{ maxWidth:640 }}>
          <p style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.45em', color:`${C.blue}dd`, textTransform:'uppercase', marginBottom:28 }}>
            Bíblia Visual Expositiva · Novo Testamento
          </p>

          {/* Ornamento */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, marginBottom:8 }}>
            <div style={{ height:1, width:60, background:`linear-gradient(to right, transparent, ${C.blue}40)` }} />
            <span style={{ color:C.blue, fontSize:'clamp(14px,2vw,16px)', filter:`drop-shadow(0 0 8px ${C.blue})` }}>✦</span>
            <div style={{ height:1, width:60, background:`linear-gradient(to left, transparent, ${C.blue}40)` }} />
          </div>

          {/* Subtítulo grego */}
          <p style={{ fontFamily:'"Cinzel Decorative", serif', fontSize:'clamp(13px,2.5vw,17px)', color:`${C.blue}ee`, letterSpacing:'0.25em', margin:'16px 0 8px' }}>
            Κατὰ Μαθθαῖον
          </p>

          {/* Título principal */}
          <h1 style={{ fontFamily:F.display, fontSize:'clamp(44px,9vw,88px)', fontWeight:900, letterSpacing:'0.08em', lineHeight:1, color:C.white, margin:'0 0 4px', textShadow:`0 0 80px ${C.blue}15` }}>
            MATEUS
          </h1>

          {/* Divisa */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, margin:'10px 0 26px' }}>
            <div style={{ height:1, flex:1, maxWidth:100, background:`linear-gradient(to right, transparent, ${C.borderB})` }} />
            <span style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.35em', color:`${C.blue}cc`, textTransform:'uppercase' }}>Evangelho</span>
            <div style={{ height:1, flex:1, maxWidth:100, background:`linear-gradient(to left, transparent, ${C.borderB})` }} />
          </div>

          {/* Badge perícope */}
          <div style={{ display:'inline-flex', flexDirection:'column', alignItems:'center', gap:5, border:`1px solid ${C.borderB}`, background:`rgba(0,212,255,0.04)`, borderRadius:10, padding:'16px 32px', marginBottom:40 }}>
            <span style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.4em', color:`${C.blue}dd`, textTransform:'uppercase' }}>Perícope Atual</span>
            <span style={{ fontFamily:F.sans, fontSize:'clamp(18px,3vw,22px)', fontWeight:700, color:C.white }}>Mateus 1:1–17</span>
            <span style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.25em', color:C.w30, textTransform:'uppercase' }}>A Genealogia de Jesus Cristo</span>
          </div>

          {/* Badges info */}
          <div style={{ display:'flex', justifyContent:'center', gap:32 }}>
            {[['28','Capítulos'],['25','Seções'],['Diagramas','por perícope']].map(([n,l]) => (
              <div key={l} style={{ textAlign:'center' }}>
                <p style={{ fontFamily:F.display, fontSize: n==='Diagramas' ? 14 : 26, fontWeight:900, color:C.blue, lineHeight:1, filter:`drop-shadow(0 0 12px ${C.blue}aa)` }}>{n}</p>
                <p style={{ fontFamily:F.display, fontSize:'clamp(10px,1.6vw,12px)', letterSpacing:'0.25em', color:C.w30, textTransform:'uppercase', marginTop:5 }}>{l}</p>
              </div>
            ))}
          </div>

          {/* Autor */}
          <p style={{ fontFamily:'"Cinzel", serif', fontSize:'clamp(10px,1.5vw,11px)', letterSpacing:'0.15em', color:`${C.blue}dd`, marginTop:24 }}>
            {AUTOR_EBOOK}
          </p>
        </motion.div>
      </section>

      {/* ══════════════════════════
          SUMÁRIO
      ══════════════════════════ */}
      <section style={{ padding:'clamp(44px,8vw,80px) 0', borderTop:`1px solid rgba(0,212,255,0.08)` }}>
        <div style={col}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
            <p style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.45em', color:`${C.blue}dd`, textTransform:'uppercase', textAlign:'center', marginBottom:8 }}>Sumário</p>
            <h2 style={{ fontFamily:F.display, fontSize:'clamp(22px,4vw,36px)', fontWeight:900, color:C.white, textAlign:'center', textTransform:'uppercase', marginBottom:36 }}>25 Perícopes</h2>

            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24 }}>
              <div style={{ flex:1, height:1, background:`linear-gradient(to right, transparent, ${C.borderB})` }} />
              <span style={{ fontFamily:F.mono, fontSize:'clamp(9px,1.4vw,10px)', color:C.w15 }}>Evangelho de Mateus</span>
              <div style={{ flex:1, height:1, background:`linear-gradient(to left, transparent, ${C.borderB})` }} />
            </div>

            {[
              ['01','Mt 1:1–17',    'A Genealogia de Jesus Cristo',              true],
              ['02','Mt 1:18–25',   'O Nascimento de Jesus Cristo'],
              ['03','Mt 2:1–12',    'A Visita dos Magos'],
              ['04','Mt 2:13–23',   'A Fuga para o Egito e o Retorno'],
              ['05','Mt 3:1–12',    'João Batista no Deserto'],
              ['06','Mt 3:13–17',   'O Batismo de Jesus'],
              ['07','Mt 4:1–11',    'A Tentação de Jesus no Deserto'],
              ['08','Mt 4:12–25',   'O Início do Ministério na Galileia'],
              ['09','Mt 5:1–12',    'As Bem-Aventuranças'],
              ['10','Mt 5:13–48',   'Sal, Luz e a Lei Cumprida'],
              ['11','Mt 6:1–34',    'A Justiça Secreta e o Pai Nosso'],
              ['12','Mt 7:1–29',    'O Julgamento, o Caminho e a Rocha'],
              ['13','Mt 8:1–17',    'Milagres de Cura — Primeira Série'],
              ['14','Mt 8:18–9:8',  'Disciplina, Tempestade e Paralítico'],
              ['15','Mt 9:9–34',    'Mateus Chamado e Controvérsias'],
              ['16','Mt 9:35–10:42','O Envio dos Doze'],
              ['17','Mt 11:1–30',   'João, as Cidades e o Descanso em Cristo'],
              ['18','Mt 12:1–50',   'Conflitos com os Fariseus'],
              ['19','Mt 13:1–52',   'As Parábolas do Reino'],
              ['20','Mt 14:1–16:20','Multiplicações, Caminhada e Confissão'],
              ['21','Mt 16:21–20:34','O Caminho para Jerusalém'],
              ['22','Mt 21:1–23:39','A Entrada em Jerusalém e Conflitos'],
              ['23','Mt 24:1–25:46','O Discurso Escatológico'],
              ['24','Mt 26:1–27:66','A Paixão de Jesus Cristo'],
              ['25','Mt 28:1–20',   'A Ressurreição e a Grande Comissão'],
            ].map(([num,ref,titulo,ativo]) => (
              <div key={num as string} style={{
                display:'flex', alignItems:'center', gap:8, flexWrap:'wrap',
                padding:'8px 12px', borderRadius:7, marginBottom:3,
                background: ativo ? 'rgba(0,212,255,0.05)' : 'transparent',
                border:`1px solid ${ativo ? C.borderB : 'transparent'}`,
                opacity: ativo ? 1 : 0.32,
              }}>
                <span style={{ fontFamily:F.display, fontSize:'clamp(10px,1.5vw,11px)', color: ativo ? C.blue : C.w30, minWidth:24, fontWeight: ativo ? 900 : 400, flexShrink:0 }}>{num}</span>
                <span style={{ fontFamily:F.sans, fontSize:'clamp(13px,3vw,16px)', color: ativo ? C.w80 : C.w45, flex:1, minWidth:120 }}>{titulo as string}</span>
                <span style={{ fontFamily:F.mono, fontSize:'clamp(9px,1.4vw,10px)', color: ativo ? `${C.blue}dd` : C.w15, whiteSpace:'nowrap', flexShrink:0 }}>{ref as string}</span>
                {ativo && <span style={{ fontFamily:F.display, fontSize:'clamp(10px,1.6vw,12px)', letterSpacing:'0.2em', color:C.blue, background:`${C.blue}18`, border:`1px solid ${C.borderB}`, borderRadius:50, padding:'1px 8px', whiteSpace:'nowrap' }}>liberado</span>}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════
          INTRODUÇÃO
      ══════════════════════════ */}
      <section style={{ padding:'clamp(44px,8vw,80px) 0', borderTop:`1px solid rgba(255,255,255,0.04)`, background:'rgba(255,255,255,0.012)' }}>
        <div style={col}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
            <p style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.45em', color:`${C.blue}dd`, textTransform:'uppercase', textAlign:'center', marginBottom:8 }}>Introdução</p>
            <h2 style={{ fontFamily:F.display, fontSize:'clamp(20px,3.5vw,32px)', fontWeight:900, color:C.white, textAlign:'center', textTransform:'uppercase', marginBottom:36 }}>A Bíblia Visual Expositiva</h2>

            <p style={{ fontFamily:'"Cinzel", serif', fontSize:'clamp(10px,1.6vw,12px)', letterSpacing:'0.15em', color:`${C.blue}dd`, marginBottom:18 }}>{AUTOR_EBOOK}</p>
            <p style={{ fontFamily:F.sans, fontSize:'clamp(15px,2.4vw,18px)', color:C.w65, lineHeight:1.9, marginBottom:20, textAlign:'justify' }}>
              A Bíblia Visual Expositiva aplica a cada perícope das Escrituras um conjunto sistemático diagramas exegéticos. Cada diagrama opera como uma lente interpretativa distinta, revelando dimensões do texto que a leitura linear sozinha não alcança.
            </p>
            <p style={{ fontFamily:F.sans, fontSize:'clamp(15px,2.4vw,18px)', color:C.w65, lineHeight:1.9, marginBottom:40, textAlign:'justify' }}>
              O objetivo não é substituir a meditação pessoal da Escritura, mas aprofundá-la: oferecer ao leitor as ferramentas que os melhores comentários e as melhores universidades de teologia disponibilizam — organizadas de forma visual, acessível e progressiva.
            </p>

            <p style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.4em', color:`${C.blue}dd`, textTransform:'uppercase', marginBottom:16 }}>O que os diagramas didáticos respondem? </p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(260px, 100%), 1fr))', gap:8 }}>
              {[
                ['01','Interlinear',        'O que diz o texto no grego original, palavra por palavra?'],
                ['02','Morfológico',        'Qual é a forma gramatical exata de cada palavra-chave?'],
                ['03','Quiástico',          'Qual é a estrutura simétrica do texto e onde está seu centro?'],
                ['04','Sintático',          'Como as orações se conectam e qual é o padrão gramatical?'],
                ['05','Semântico',          'Quais campos de sentido o texto ativa e como interagem?'],
                ['06','Progressivo',        'Quais são as etapas do argumento do início ao fim?'],
                ['07','Intensificação',     'Onde está o ponto de maior tensão ou clímax do texto?'],
                ['08','Espacial',           'Quais lugares geográficos o texto menciona e o que significam?'],
                ['09','Acesso',             'A quem o texto abre espaço e a quem ele restringe?'],
                ['10','Relacional',         'Quais relacionamentos o texto revela ou pressupõe?'],
                ['11','Cristológico',       'O que o texto diz sobre a pessoa e obra de Jesus Cristo?'],
                ['12','Sistemático',        'Que doutrinas da teologia sistemática o texto aborda?'],
                ['13','Tensão',             'Que conflitos ou contradições o texto cria ou resolve?'],
                ['14','Repetição',          'Quais palavras, estruturas ou ideias se repetem e por quê?'],
                ['15','Causa e Efeito',     'Que relações de causa e consequência o texto estabelece?'],
                ['16','Apologético',        'Que heresias ou erros teológicos o texto confronta?'],
                ['17','Perguntas',          'Que perguntas o texto levanta e deixa em aberto?'],
                ['18','Autoral',            'O que os comentaristas reconhecidos dizem sobre este texto?'],
                ['19','Homilético',         'Como estruturar uma pregação a partir desta perícope?'],
                ['20','Pastoral',           'Como o texto fala a adultos, jovens e à comunidade de fé?'],
                ['21','Antropológico',      'O que o texto revela sobre a condição e dignidade humana?'],
                ['22','Familiar',           'Que luz o texto projeta sobre casamento, família e geração?'],
                ['23','Trinitário',         'Como Pai, Filho e Espírito Santo aparecem neste texto?'],
              ].map(([num,nome,pergunta]) => (
                <div key={num} style={{ padding:'10px 13px', borderRadius:8, border:`1px solid rgba(0,212,255,0.12)`, background:'rgba(0,212,255,0.03)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5 }}>
                    <span style={{ fontFamily:F.display, fontSize:'clamp(10px,1.5vw,11px)', color:C.blue, fontWeight:900, minWidth:22 }}>{num}</span>
                    <span style={{ fontFamily:F.display, fontSize:10, letterSpacing:'0.15em', color:C.white, textTransform:'uppercase' }}>{nome}</span>
                  </div>
                  <p style={{ fontFamily:F.sans, fontSize:'clamp(11px,1.7vw,13px)', color:C.w45, lineHeight:1.6, marginLeft:30, textAlign:'justify' }}>{pergunta}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════
          DIVISOR CAP. 1
      ══════════════════════════ */}
      <section style={{
        minHeight:'40vh',
        display:'flex', alignItems:'center', justifyContent:'center',
        textAlign:'center', padding:'clamp(44px,8vw,80px) clamp(1rem,4vw,2rem)',
        background:`linear-gradient(180deg, ${C.bg} 0%, rgba(0,212,255,0.04) 50%, ${C.bg} 100%)`,
        borderTop:`1px solid ${C.borderB}`, borderBottom:`1px solid ${C.borderB}`,
      }}>
        <motion.div initial={{ opacity:0, scale:0.97 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
          <p style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.5em', color:`${C.blue}cc`, textTransform:'uppercase', marginBottom:18 }}>Capítulo 1 · Perícope 01</p>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, marginBottom:10 }}>
            <div style={{ height:1, width:80, background:`linear-gradient(to right, transparent, ${C.borderB})` }} />
            <span style={{ color:C.blue, fontSize:20, filter:`drop-shadow(0 0 10px ${C.blue})` }}>✦</span>
            <div style={{ height:1, width:80, background:`linear-gradient(to left, transparent, ${C.borderB})` }} />
          </div>
          <h2 style={{ fontFamily:F.display, fontSize:'clamp(22px,5vw,44px)', fontWeight:900, color:C.white, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>
            Mateus 1:1–17
          </h2>
          <p style={{ fontFamily:F.display, fontSize:'clamp(10px,2vw,14px)', letterSpacing:'0.3em', color:`${C.blue}ee`, textTransform:'uppercase', marginBottom:22 }}>
            A Genealogia de Jesus Cristo
          </p>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, marginBottom:28 }}>
            <div style={{ height:1, width:80, background:`linear-gradient(to right, transparent, ${C.borderB})` }} />
            <span style={{ color:C.blue, fontSize:'clamp(10px,1.5vw,12px)' }}>✦</span>
            <div style={{ height:1, width:80, background:`linear-gradient(to left, transparent, ${C.borderB})` }} />
          </div>
          <p style={{ fontFamily:F.sans, fontStyle:'italic', fontSize:'clamp(16px,2.5vw,19px)', color:C.w45, maxWidth:520, margin:'0 auto 32px' }}>
            "Livro da genealogia de Jesus Cristo, filho de Davi, filho de Abraão."
          </p>
          <p style={{ fontFamily:F.mono, fontSize:10, letterSpacing:'0.3em', color:`${C.blue}aa`, textTransform:'uppercase', marginBottom:32 }}>Mateus 1:1</p>
          <div style={{ display:'flex', justifyContent:'center', gap:20, flexWrap:'wrap' }}>
            {[['Forma literária','Genealogia · Narrativa'],['Estrutura','Quiasmo A·B¹·B²·B³·A′'],['Diagramas','Análise completa']].map(([l,v]) => (
              <div key={l} style={{ textAlign:'center', padding:'12px 20px', border:`1px solid ${C.borderB}`, borderRadius:8, background:'rgba(0,212,255,0.04)' }}>
                <p style={{ fontFamily:F.display, fontSize:'clamp(10px,1.6vw,12px)', letterSpacing:'0.35em', color:C.blue, textTransform:'uppercase', marginBottom:4 }}>{l}</p>
                <p style={{ fontFamily:F.sans, fontSize:'clamp(13px,1.9vw,15px)', color:C.w65 }}>{v}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════
          23 DIAGRAMAS
      ══════════════════════════ */}
      <section style={{ padding:'20px 0 80px' }}>
        <div style={col}>
          <SectionDivider label="Diagramas Expositivos" />
          <p style={{ fontFamily:F.sans, fontStyle:'italic', fontSize:'clamp(15px,2.4vw,18px)', color:C.w30, textAlign:'center', marginBottom:40, lineHeight:1.8 }}>
            Cada diagrama aplica uma lente hermenêutica distinta à perícope de Mateus 1:1–17,<br/>
            revelando dimensões do texto que a leitura linear sozinha não alcança.
          </p>
          {DIAGRAMAS.map(d => (
            <DiagramCard key={d.num} num={d.num} title={d.title} intro={d.intro}>
              {d.body()}
            </DiagramCard>
          ))}
        </div>
      </section>

      {/* ══════════════════════════
          RODAPÉ
      ══════════════════════════ */}
      <footer style={{ borderTop:`1px solid rgba(0,212,255,0.12)`, padding:'60px 2rem', textAlign:'center', background:'rgba(255,255,255,0.01)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, marginBottom:12 }}>
          <div style={{ height:1, width:80, background:`linear-gradient(to right, transparent, ${C.borderB})` }} />
          <span style={{ color:C.blue, fontSize:'clamp(14px,2vw,16px)', filter:`drop-shadow(0 0 8px ${C.blue})` }}>✦</span>
          <div style={{ height:1, width:80, background:`linear-gradient(to left, transparent, ${C.borderB})` }} />
        </div>
        <p style={{ fontFamily:F.display, fontSize:'clamp(10px,1.5vw,11px)', letterSpacing:'0.4em', color:`${C.blue}dd`, textTransform:'uppercase', marginBottom:5 }}>Bíblia Visual Expositiva</p>
        <p style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.3em', color:C.w15, textTransform:'uppercase', marginBottom:6 }}>Evangelho de Mateus · Seção 01 de 25</p>
        <p style={{ fontFamily:'"Cinzel", serif', fontStyle:'italic', fontSize:'clamp(13px,1.9vw,15px)', color:C.w30, marginBottom:16 }}>Κατὰ Μαθθαῖον</p>
        <p style={{ fontFamily:'"Cinzel", serif', fontSize:'clamp(10px,1.6vw,12px)', letterSpacing:'0.15em', color:`${C.blue}dd`, marginBottom:24 }}>
          {AUTOR_EBOOK}
        </p>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, marginBottom:24 }}>
          <div style={{ height:1, flex:1, maxWidth:160, background:`linear-gradient(to right, transparent, ${C.borderB})` }} />
          <div style={{ height:1, flex:1, maxWidth:160, background:`linear-gradient(to left, transparent, ${C.borderB})` }} />
        </div>
        <Link
          to="/livraria"
          style={{ fontFamily:F.display, fontSize:'clamp(11px,1.7vw,13px)', letterSpacing:'0.35em', color:`${C.blue}cc`, textDecoration:'none', textTransform:'uppercase', border:`1px solid ${C.borderB}`, padding:'9px 22px', borderRadius:50, display:'inline-block' }}
        >
          ← Voltar às Seções
        </Link>
      </footer>

    </div>
  );
}
