import { useState, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroIntro from '../components/TPIntroHero';
import { EstilosGraficos, ErasDaTeologia, ArquetipicaEctipica, AnatomiaDaTeologia, HistoriaDaPolitica, ConsociacaoAlthusius, EsferasKuyper, EncontroTeologiaPolitica, VarraoReforma, EspectroTeologiaPolitica, LinhaDoTempoTradicao, TensaoRmAp } from '../components/TPIntroGraficos';
import { BG, GOLD, SKY, ROSE, GREEN, BLUE, PURPLE, RED, txt, Rico, P, Lista, Rotulo, Caixa, Versiculo, Tabela, Secao } from '../components/AulaKit';

/* Teologia Política · Aula Introdutória — O que é teologia, o que é política
   e o que é teologia política, segundo teólogos reformados e escolásticos. */

interface Definicao { autor: string; obra: string; epoca: string; frase: string; comentario: string; nota: number; cor: string }

const DEF_TEOLOGIA: Definicao[] = [
  { autor: 'Agostinho de Hipona', epoca: '354–430', obra: 'A Cidade de Deus, VIII.1', cor: SKY, nota: 2,
    frase: 'Teologia é “razão ou discurso acerca da divindade” (de divinitate ratio sive sermo).',
    comentario: 'Agostinho fixa o sentido etimológico — **theos + logos** — e o liga à verdadeira religião: não basta falar de Deus; é preciso falar **do Deus verdadeiro**.' },
  { autor: 'Anselmo de Cantuária', epoca: '1033–1109', obra: 'Proslógio, proêmio', cor: PURPLE, nota: 3,
    frase: 'Fides quaerens intellectum — “a fé que busca compreender”.',
    comentario: 'A teologia **não começa na dúvida**, mas na fé; a razão serve para compreender aquilo que já se crê pela revelação.' },
  { autor: 'Tomás de Aquino', epoca: '1225–1274', obra: 'Suma Teológica, I, q. 1, a. 2 e 7', cor: BLUE, nota: 4,
    frase: 'A sacra doctrina é ciência que procede de princípios conhecidos pela luz de uma ciência superior: a de Deus e dos bem-aventurados.',
    comentario: 'Para Tomás, **Deus é o sujeito** da teologia, e tudo o que ela trata é considerado “sob a razão de Deus” — seja Deus mesmo, seja as criaturas em relação a Ele.' },
  { autor: 'João Calvino', epoca: '1509–1564', obra: 'Institutas, I.1.1', cor: GOLD, nota: 5,
    frase: 'Quase toda a soma da nossa sabedoria consiste em duas partes: o conhecimento de Deus e o conhecimento de nós mesmos.',
    comentario: 'Calvino não oferece uma definição técnica, mas o **eixo** da teologia reformada: conhecer a Deus pela Escritura transforma o modo como o homem se conhece e vive.' },
  { autor: 'Franciscus Junius', epoca: '1545–1602', obra: 'De vera theologia (1594)', cor: GREEN, nota: 6,
    frase: 'Há uma teologia arquetípica — o conhecimento que Deus tem de si mesmo — e uma teologia ectípica — o conhecimento que Deus comunica às criaturas.',
    comentario: 'A distinção (já esboçada por Duns Escoto em theologia in se × theologia nostra) protege a humildade: nossa teologia é **verdadeira, mas finita, recebida e acomodada** pela revelação.' },
  { autor: 'William Ames', epoca: '1576–1633', obra: 'Medulla Theologica, I.1.1', cor: ROSE, nota: 7,
    frase: 'Theologia est doctrina Deo vivendi — “teologia é a doutrina de viver para Deus”.',
    comentario: 'O puritano define a teologia como **saber prático**: ela não termina no intelecto, mas na vida inteira vivida diante de Deus.' },
  { autor: 'Francis Turretin', epoca: '1623–1687', obra: 'Compêndio de Teologia Apologética, I.1 e I.7', cor: SKY, nota: 8,
    frase: 'A teologia é um sistema de doutrina sobre Deus e as coisas divinas, extraído da Palavra de Deus; é ao mesmo tempo teórica e prática.',
    comentario: 'O escolástico reformado de Genebra fixa o **princípio**: a Escritura é o único princípio cognitivo da teologia, e seu fim é a glória de Deus e a salvação do homem.' },
  { autor: 'Petrus van Mastricht', epoca: '1630–1706', obra: 'Teologia Teorético-Prática, I.1', cor: PURPLE, nota: 9,
    frase: 'Teologia é “a doutrina de viver para Deus por meio de Cristo”.',
    comentario: 'Mastricht amplia Ames com o centro cristológico: só se vive para Deus **em Cristo**. Cada doutrina, para ele, termina em exegese, dogma, elenctica e prática.' },
  { autor: 'Herman Bavinck', epoca: '1854–1921', obra: 'Dogmática Reformada, v. 1', cor: GOLD, nota: 10,
    frase: 'A dogmática é o conhecimento que Deus revelou em sua Palavra à igreja acerca de si mesmo e de todas as criaturas, enquanto se relacionam com Ele.',
    comentario: 'Bavinck sintetiza a tradição: a teologia é **conhecimento revelado, eclesial e abrangente** — fala de Deus e de tudo o mais em relação a Deus.' },
];

const DEF_POLITICA: Definicao[] = [
  { autor: 'Aristóteles', epoca: '384–322 a.C.', obra: 'Política, I.2 (1253a)', cor: SKY, nota: 11,
    frase: 'O homem é por natureza um animal político (zōon politikon); a pólis nasce para a vida e existe para o bem viver.',
    comentario: 'A política é a esfera em que a comunidade busca **o bem comum**. Os escolásticos herdaram esse vocabulário e o batizaram à luz da criação.' },
  { autor: 'Agostinho de Hipona', epoca: '354–430', obra: 'A Cidade de Deus, XIX.24', cor: PURPLE, nota: 12,
    frase: 'Um povo é “uma multidão de seres racionais unida pelo acordo comum acerca das coisas que ama”.',
    comentario: 'Agostinho desloca a definição da justiça para os **amores**: toda comunidade política é revelada por aquilo que ama — e só a Cidade de Deus ama corretamente.' },
  { autor: 'Tomás de Aquino', epoca: '1225–1274', obra: 'Suma Teológica, I-II, q. 90, a. 4', cor: BLUE, nota: 13,
    frase: 'A lei é “uma ordenação da razão para o bem comum, promulgada por quem tem o cuidado da comunidade”.',
    comentario: 'Política, para Tomás, é o governo **segundo a lei e para o bem comum**; o governante não é dono da comunidade, mas seu cuidador.' },
  { autor: 'João Calvino', epoca: '1509–1564', obra: 'Institutas, IV.20.2-4', cor: GOLD, nota: 14,
    frase: 'O governo civil serve para que, enquanto vivemos entre os homens, a justiça, a paz e a ordem pública sejam preservadas; a magistratura é vocação santa, a mais honrosa de todas.',
    comentario: 'Calvino eleva a política a **vocação diante de Deus** — e, por isso mesmo, a submete à Palavra de Deus.' },
  { autor: 'Johannes Althusius', epoca: '1563–1638', obra: 'Politica methodice digesta, I.1 (1603)', cor: GREEN, nota: 15,
    frase: 'A política é “a arte de associar os homens para estabelecer, cultivar e conservar entre si a vida social”.',
    comentario: 'O jurista reformado vê a sociedade como uma rede de **associações pactuais** (família, corporação, cidade, província, reino) — a matriz do federalismo moderno.' },
  { autor: 'Abraham Kuyper', epoca: '1837–1920', obra: 'Calvinismo, palestra 3', cor: ROSE, nota: 16,
    frase: 'A soberania pertence somente a Deus; o Estado recebe dele uma soberania limitada à sua esfera, ao lado da família, da igreja e da sociedade.',
    comentario: 'Pela **soberania das esferas**, o Estado protege e coordena, mas não absorve as demais instituições — um freio contra o totalitarismo.' },
];

const MAPA: string[][] = [
  ['Agostinho', 'Duas cidades, dois amores', 'A cidade terrena usa a paz civil; a Cidade de Deus peregrina nela sem nela pôr a esperança'],
  ['Tomás de Aquino', 'Lei natural e bem comum', 'A ordem política é natural, ordenada pela razão ao bem comum e aperfeiçoada pela graça'],
  ['Calvino', 'Duplo governo (duplex regimen)', 'Governo espiritual na consciência e governo civil na justiça exterior: distintos, não opostos'],
  ['Althusius', 'Consociação pactual', 'A sociedade como aliança de associações; a soberania reside no povo associado sob Deus'],
  ['Rutherford', 'Lex, Rex', 'A lei está acima do rei; o governante é limitado e responsável diante de Deus e do povo'],
  ['Kuyper', 'Soberania das esferas', 'Cada esfera da vida responde diretamente a Deus; o Estado não pode absorver as demais'],
  ['VanDrunen', 'Dois reinos e pacto noaico', 'O Estado pertence ao reino comum, fundado em Gn 9; a igreja ao reino redentor'],
];

const NOTAS = [
  'Teologia: do grego θεός (theos, “Deus”) + λόγος (logos, “palavra, discurso, razão”). Política: de πόλις (polis, “cidade”) e πολιτική (politikē, a arte da vida comum da cidade).',
  'AGOSTINHO. A Cidade de Deus. Petrópolis: Vozes, 2012. livro VIII, cap. 1.',
  'ANSELMO DE CANTUÁRIA. Proslógio. In: SANTO ANSELMO; ABELARDO. São Paulo: Abril Cultural, 1973. (Os Pensadores). Proêmio e cap. 1.',
  'TOMÁS DE AQUINO. Suma Teológica. São Paulo: Loyola, 2001. v. 1, I, q. 1, a. 2 e a. 7.',
  'CALVINO, João. A instituição da religião cristã. São Paulo: Editora UNESP, 2008. t. 1, livro I, cap. 1, seção 1.',
  'JUNIUS, Franciscus. A Treatise on True Theology. Grand Rapids: Reformation Heritage Books, 2014. Teses 4–7. Cf. a distinção escotista entre theologia in se e theologia nostra.',
  'AMES, William. The Marrow of Theology. Grand Rapids: Baker Books, 1997. livro I, cap. 1, §1.',
  'TURRETIN, François. Compêndio de teologia apologética. São Paulo: Cultura Cristã, 2011. v. 1, tópico I, questões 1 e 7.',
  'MASTRICHT, Petrus van. Theoretical-Practical Theology. Grand Rapids: Reformation Heritage Books, 2018. v. 1, livro I, cap. 1.',
  'BAVINCK, Herman. Dogmática reformada. São Paulo: Cultura Cristã, 2012. v. 1, Introdução.',
  'ARISTÓTELES. Política. Brasília: Editora UnB, 1985. livro I, cap. 2, 1253a.',
  'AGOSTINHO, 2012, livro XIX, cap. 24.',
  'TOMÁS DE AQUINO. Suma Teológica. São Paulo: Loyola, 2005. v. 4, I-II, q. 90, a. 4.',
  'CALVINO, João. A instituição da religião cristã. São Paulo: Editora UNESP, 2009. t. 2, livro IV, cap. 20, seções 2-4.',
  'ALTHUSIUS, Johannes. Politica: an abridged translation of Politics Methodically Set Forth. Indianapolis: Liberty Fund, 1995. cap. 1.',
  'KUYPER, Abraham. Calvinismo. São Paulo: Cultura Cristã, 2002. terceira palestra, “Calvinismo e política”.',
  'AGOSTINHO, 2012, livro VI, cap. 5. Agostinho preserva a theologia tripartita de Marco Terêncio Varrão — mítica, física e civil — e critica a teologia civil por subordinar o culto aos interesses da cidade.',
  'SCHMITT, Carl. Teologia política. Belo Horizonte: Del Rey, 2006. cap. 3. Schmitt não é reformado; é citado aqui pela fórmula que tornou o termo corrente no século XX.',
  'VANDRUNEN, David. Politics after Christendom: political theology in a fractured world. Grand Rapids: Zondervan Academic, 2020. Introdução e cap. 1.',
];

function CardDefinicao({ d }: { d: Definicao }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 'clamp(18px,2.8vw,24px)', borderRadius: 18, background: `linear-gradient(155deg, ${d.cor}16, rgba(6,12,30,0.85) 60%)`, border: `1px solid ${d.cor}40` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 'clamp(19px,2.2vw,22px)', fontWeight: 900, color: '#fff' }}>{d.autor}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: d.cor }}>{d.epoca}</span>
      </div>
      <p style={{ margin: 0, fontFamily: 'var(--font-garamond)', fontStyle: 'italic', fontSize: 'clamp(20px,2.4vw,24px)', lineHeight: 1.5, color: '#fff', paddingLeft: 14, borderLeft: `3px solid ${d.cor}` }}>
        {d.frase}<a href={`#nota-${d.nota}`} style={{ color: d.cor, fontStyle: 'normal', fontWeight: 800, fontSize: '0.65em', verticalAlign: 'super', textDecoration: 'none', marginLeft: 2 }}>{d.nota}</a>
      </p>
      <p style={{ ...txt, fontSize: 'clamp(16.5px,1.8vw,18px)' }}><Rico t={d.comentario} /></p>
      <div style={{ marginTop: 'auto', fontFamily: 'var(--font-mono)', fontSize: 13.5, fontWeight: 700, letterSpacing: '0.04em', color: `${d.cor}` }}>📖 {d.obra}</div>
    </div>
  );
}

function Grade({ itens }: { itens: Definicao[] }) {
  return (
    <div className="mosaico" style={{ '--min': '330px', '--gap': '16px' } as CSSProperties}>
      {itens.map(d => <CardDefinicao key={d.autor + d.obra} d={d} />)}
    </div>
  );
}

const REFLEXAO: { q: string; r: string[]; refs: string }[] = [
  {
    q: 'Ames define teologia como “doutrina de viver para Deus”. **Que diferença isso faz** para a maneira como você vota, debate e se informa?',
    r: [
      'Para Ames, a teologia **não termina no intelecto, mas na vontade e na vida**: theologia est doctrina Deo vivendi (AMES, 1997, I.1.1-3). Turretin confirma que ela é ao mesmo tempo teórica e prática (TURRETIN, 2011, I.7), e Mastricht acrescenta que se vive para Deus **“por meio de Cristo”** (MASTRICHT, 2018, I.1).',
      'Logo, votar, debater e informar-se **não são atos neutros**, mas parte do culto da vida inteira ([[1Co 10.31; Cl 3.17]]). **Votar:** com a consciência formada pela Escritura, e não pela tribo política. **Debater:** seguindo a verdade em amor, com mansidão e temor ([[Ef 4.15; 1Pe 3.15-16]]). **Informar-se:** o nono mandamento proíbe espalhar ou aceitar falso testemunho ([[Êx 20.16]]), o que inclui notícias falsas e meias-verdades.',
      '!!Alerta:!! “viver para Deus” não transforma a política em pragmatismo religioso nem em garantia de que meu candidato é “o de Deus”. ++Aplicação:++ antes de compartilhar, votar ou discutir, pergunte: “isso é verdadeiro, justo e feito para a glória de Deus?”',
    ],
    refs: 'AMES, 1997; TURRETIN, 2011; MASTRICHT, 2018.',
  },
  {
    q: 'Agostinho diz que um povo se define pelo que **ama**. O que os debates políticos brasileiros revelam sobre nossos amores?',
    r: [
      'Agostinho define o povo como uma multidão “unida pelo acordo comum acerca das coisas que ama” (AGOSTINHO, 2012, XIX.24). Por isso, a pergunta política decisiva é **o que amamos e em que ordem**: a virtude é a **ordem do amor** (ordo amoris) (AGOSTINHO, 2012, XV.22), e as duas cidades nascem de dois amores, o amor de si até o desprezo de Deus e o amor de Deus até o desprezo de si (AGOSTINHO, 2012, XIV.28).',
      'Respostas possíveis: os debates revelam amores **desordenados**, como a segurança, a prosperidade e a identidade de grupo colocadas acima da justiça e da verdade. Revelam também o **ressentimento**, que ama mais vencer o adversário do que buscar o bem comum, e o **messianismo político**, que deposita no líder a esperança que pertence a Cristo. Kuyper lembra que nenhuma esfera, nem o Estado, pode ser absolutizada (KUYPER, 2002, palestra 3).',
      '++Aplicação:++ o exame começa em nós: “onde está o vosso tesouro, aí estará também o vosso coração” ([[Mt 6.21]]). O cristão ama a cidade terrena e busca sua paz ([[Jr 29.7]]), mas !!não põe nela a sua esperança!!.',
    ],
    refs: 'AGOSTINHO, 2012; KUYPER, 2002.',
  },
  {
    q: 'Qual a diferença entre **teologia política** e **teologia civil** (Varrão)? Dê um exemplo atual de cada uma.',
    r: [
      '**Teologia civil** é a religião definida pela cidade e posta a serviço dela: Varrão a descrevia como o culto que os cidadãos e os sacerdotes devem conhecer e praticar por utilidade pública (AGOSTINHO, 2012, VI.5). Agostinho a critica porque ali **a cidade determina os deuses**. **Teologia política**, na tradição reformada, faz o inverso: **a Palavra de Deus julga a cidade** e define os limites do poder (VANDRUNEN, 2020, introdução).',
      '**Exemplo de teologia civil:** usar a fé como cimento identitário ou eleitoral, com o púlpito transformado em palanque, versículos usados como slogan de campanha ou o Estado definindo o que a igreja pode ou não pregar. O conceito moderno de “religião civil” vem de Rousseau (Contrato social, IV.8).',
      '**Exemplo de teologia política:** uma igreja que ensina [[Rm 13]] e [[At 5.29]] lado a lado, ora pelas autoridades ([[1Tm 2.1-2]]) e defende a liberdade religiosa **de todos**, inclusive dos que discordam dela. Schmitt mostra que até o Estado moderno secular carrega conceitos teológicos (SCHMITT, 2006, cap. 3): a questão não é se haverá teologia na política, mas !!qual teologia!!.',
    ],
    refs: 'AGOSTINHO, 2012; SCHMITT, 2006; VANDRUNEN, 2020.',
  },
  {
    q: 'Por que a definição do curso fala em autoridade “**sob o senhorio de Cristo**”, e não apenas “segundo valores cristãos”?',
    r: [
      '**“Valores cristãos”** podem ser separados de Cristo e usados por qualquer projeto de poder: tornam-se moralismo, ideologia ou teologia civil. **“Senhorio de Cristo”** é pessoal e objetivo: “toda a autoridade me foi dada no céu e na terra” ([[Mt 28.18]]; cf. [[Ef 1.20-22; Fp 2.9-11]]). Nenhum governante é autônomo; todos prestarão contas ao Rei.',
      'Calvino ensina que a obediência aos magistrados **nunca pode nos afastar da obediência a Deus**, a quem os próprios reis estão sujeitos (CALVINO, 2009, IV.20.32; [[At 5.29]]). Kuyper resume: “não há um centímetro quadrado em todo o domínio da existência humana sobre o qual Cristo não clame: É meu!” (KUYPER, 1998, p. 488).',
      '!!Nuance:!! reformados divergem sobre **como** Cristo governa o Estado. Os neocalvinistas (Kuyper) falam de seu senhorio sobre todas as esferas; os defensores dos dois reinos (VANDRUNEN, 2020) distinguem o governo de Cristo sobre o reino comum, como Criador e sustentador pelo pacto noaico ([[Gn 9]]), do seu governo redentor sobre a igreja. ++Ambos concordam:++ o poder civil é **real, delegado e limitado**, e não é dono das consciências.',
    ],
    refs: 'CALVINO, 2009; KUYPER, 1998; VANDRUNEN, 2020.',
  },
];

const REFS_GABARITO = [
  'AGOSTINHO. **A Cidade de Deus**. Petrópolis: Vozes, 2012.',
  'AMES, William. **The Marrow of Theology**. Grand Rapids: Baker Books, 1997.',
  'CALVINO, João. **A instituição da religião cristã**. São Paulo: Editora UNESP, 2009. t. 2.',
  'KUYPER, Abraham. **Calvinismo**. São Paulo: Cultura Cristã, 2002.',
  'KUYPER, Abraham. Sphere Sovereignty. In: BRATT, James D. (org.). **Abraham Kuyper**: a centennial reader. Grand Rapids: Eerdmans, 1998. p. 461-490.',
  'MASTRICHT, Petrus van. **Theoretical-Practical Theology**. Grand Rapids: Reformation Heritage Books, 2018. v. 1.',
  'ROUSSEAU, Jean-Jacques. **Do contrato social**. São Paulo: Abril Cultural, 1973. (Os Pensadores).',
  'SCHMITT, Carl. **Teologia política**. Belo Horizonte: Del Rey, 2006.',
  'TURRETIN, François. **Compêndio de teologia apologética**. São Paulo: Cultura Cristã, 2011. v. 1.',
  'VANDRUNEN, David. **Politics after Christendom**: political theology in a fractured world. Grand Rapids: Zondervan Academic, 2020.',
];

const INDICE: [string, string, string][] = [
  ['objetivos', 'Objetivos', GOLD],
  ['teologia', 'O que é teologia', SKY],
  ['politica', 'O que é política', BLUE],
  ['teologia-politica', 'O que é teologia política', GOLD],
  ['mapa', 'Mapa da tradição', PURPLE],
  ['reflexao', 'Para refletir + gabarito', GREEN],
  ['proxima', 'Próxima aula', RED],
  ['notas', 'Notas', 'rgba(255,255,255,0.7)'],
];

export default function TeologiaPoliticaIntroPage() {
  const navigate = useNavigate();
  const [aberta, setAberta] = useState<number | null>(null);

  return (
    <div className="sem-justificar" style={{ minHeight: '100vh', background: BG, color: '#fff' }}>
      <Navbar />
      <EstilosGraficos />

      <HeroIntro onVoltar={() => navigate('/teologia/area/politica')} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(28px,5vw,48px) clamp(16px,4vw,40px) 80px' }}>
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {INDICE.map(([id, rot, cor]) => (
            <a key={id} href={`#${id}`} style={{ textDecoration: 'none', fontSize: 'clamp(14px,1.6vw,15.5px)', fontWeight: 700, padding: '8px 14px', borderRadius: 999, color: '#fff', background: 'rgba(255,255,255,0.04)', border: `1px solid ${cor}55` }}>
              <span style={{ color: cor }}>●</span> {rot}
            </a>
          ))}
        </nav>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 36, fontSize: 'clamp(14px,1.6vw,15.5px)', color: 'rgba(230,238,255,0.8)' }}>
          <span>Legenda:</span>
          <strong style={{ color: GOLD }}>verdade central</strong>
          <em style={{ color: SKY, fontWeight: 600 }}>texto bíblico</em>
          <strong style={{ color: ROSE }}>alerta</strong>
          <strong style={{ color: GREEN }}>aplicação</strong>
        </div>

        {/* Objetivos */}
        <Secao id="objetivos" num="00" cor={GOLD} titulo="Por que começar pelas definições?">
          <P>{'Antes de abrir Romanos 13, precisamos saber **do que estamos falando**. Palavras como “teologia”, “política” e “teologia política” são usadas hoje de modo vago — e !!quem não define os termos acaba refém de quem os define!!. Esta aula estabelece o vocabulário do curso.¹'}</P>
          <Rotulo cor={GOLD}>Ao final, o aluno deverá ser capaz de</Rotulo>
          <Lista cor={GOLD} num itens={[
            'Definir **teologia** a partir de Agostinho, Tomás de Aquino e da ortodoxia reformada (Junius, Ames, Turretin, Mastricht, Bavinck).',
            'Definir **política** a partir de Aristóteles, Agostinho, Tomás, Calvino, Althusius e Kuyper.',
            'Formular uma **definição reformada de teologia política** e distingui-la da teocracia e da ideologia partidária.',
            'Situar as principais **tradições** que serão estudadas ao longo do curso.',
          ]} />
          <Versiculo cor={GOLD} texto="Porque dele, e por meio dele, e para ele são todas as coisas. A ele, pois, a glória eternamente." refe="Romanos 11.36" />
        </Secao>

        {/* Teologia */}
        <Secao id="teologia" num="01" cor={SKY} titulo="O que é teologia?" sub="Theos + logos: o discurso sobre Deus que nasce da revelação e termina na vida">
          <P>{'Etimologicamente, teologia é **discurso sobre Deus** (θεός + λόγος). Mas a tradição cristã logo percebeu que não se trata de qualquer discurso: é o conhecimento que **Deus mesmo revelou**, recebido pela fé, ordenado pela razão e voltado para a vida.'}</P>
          <ErasDaTeologia />
          <Grade itens={DEF_TEOLOGIA} />
          <ArquetipicaEctipica />
          <AnatomiaDaTeologia />
          <Caixa cor={SKY}>
            <Rotulo cor={SKY}>🧭 Síntese: o que a tradição concorda sobre a teologia</Rotulo>
            <Lista cor={SKY} itens={[
              '**Princípio:** Deus é o princípio do ser; a **Escritura** é o princípio do conhecer (Turretin, Bavinck).',
              '**Natureza:** conhecimento **verdadeiro, mas ectípico** — recebido e acomodado à criatura (Junius).',
              '**Fim:** ++viver para Deus por meio de Cristo++, para a glória de Deus (Ames, Mastricht).',
              '**Abrangência:** fala de Deus e de **todas as coisas em relação a Deus** (Tomás, Bavinck) — inclusive a cidade e o Estado.',
            ]} />
          </Caixa>
        </Secao>

        {/* Política */}
        <Secao id="politica" num="02" cor={BLUE} titulo="O que é política?" sub="Pólis: a arte da vida comum, ordenada à justiça e ao bem comum">
          <P>{'“Política” vem de **pólis**, a cidade. No uso clássico, não significa disputa partidária, mas **a arte de ordenar a vida comum** em vista do bem. A tradição cristã acolheu esse conceito e o reinterpretou à luz da criação, da queda e do senhorio de Deus.'}</P>
          <HistoriaDaPolitica />
          <Grade itens={DEF_POLITICA} />
          <ConsociacaoAlthusius />
          <EsferasKuyper />
          <Caixa cor={BLUE}>
            <Rotulo cor={BLUE}>🧭 Síntese: política em perspectiva cristã</Rotulo>
            <Lista cor={BLUE} itens={[
              'O ser humano é **social por criação**: a vida em comum não é invenção do pecado (Aristóteles, Tomás, Althusius).',
              'Depois da queda, a política precisa também **conter o mal** pela espada (Calvino, Kuyper).',
              'Toda comunidade política é movida por **amores**; a pergunta decisiva é o que ela ama (Agostinho).',
              '!!O Estado não é a sociedade inteira!!: família, igreja e associações têm esferas próprias (Althusius, Kuyper).',
            ]} />
          </Caixa>
        </Secao>

        {/* Teologia política */}
        <Secao id="teologia-politica" num="03" cor={GOLD} titulo="O que é teologia política?" sub="Pensar a cidade dos homens à luz da Palavra de Deus">
          <P>{'A expressão é antiga. **Marco Terêncio Varrão** (séc. I a.C.) dividia a teologia em mítica, física e **civil** — a religião oficial da cidade. Agostinho preservou essa divisão e a !!criticou duramente!!: a “teologia civil” punha os deuses a serviço da pólis.¹⁷ No século XX, **Carl Schmitt** tornou o termo corrente ao afirmar que os conceitos modernos do Estado são conceitos teológicos secularizados.¹⁸'}</P>
          <P>{'A tradição reformada inverte o vetor de Varrão: **não é a teologia a serviço da cidade, mas a cidade julgada pela Palavra de Deus**. Teologia política, nesse sentido, é parte da teologia — e não um ramo da ciência política com verniz religioso.¹⁹'}</P>
          <EncontroTeologiaPolitica />
          <VarraoReforma />
          <div style={{ padding: 'clamp(20px,3.5vw,32px)', borderRadius: 20, background: `linear-gradient(135deg, ${GOLD}22, rgba(6,12,30,0.9))`, border: `2px solid ${GOLD}70`, boxShadow: `0 0 40px ${GOLD}20` }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, letterSpacing: '0.14em', color: GOLD, marginBottom: 10 }}>✦ DEFINIÇÃO DE TRABALHO DO CURSO</div>
            <p style={{ margin: 0, fontFamily: 'var(--font-garamond)', fontSize: 'clamp(22px,2.9vw,30px)', lineHeight: 1.5, color: '#fff' }}>
              Teologia política é a reflexão teológica que, a partir das <span style={{ color: SKY }}>Escrituras</span> e da <span style={{ color: GOLD }}>tradição confessional</span>, investiga a origem, a finalidade, os limites e a prática da autoridade civil e da vida pública, sob o <span style={{ color: GREEN }}>senhorio de Cristo</span>.
            </p>
          </div>
          <Rotulo cor={GOLD}>Três tarefas da teologia política</Rotulo>
          <div className="fluxo" style={{ '--min': '260px', '--gap': '14px' } as CSSProperties}>
            <Caixa cor={SKY}><div style={{ fontSize: 26 }}>🔎</div><P>{'**Descritiva:** compreender o que a Escritura e a tradição ensinam sobre o governo civil.'}</P></Caixa>
            <Caixa cor={ROSE}><div style={{ fontSize: 26 }}>⚖️</div><P>{'**Crítica:** julgar as ideologias e os poderes que reivindicam o que pertence a Deus ([[Ap 13]]).'}</P></Caixa>
            <Caixa cor={GREEN}><div style={{ fontSize: 26 }}>🏗️</div><P>{'**Construtiva:** orientar a vida pública do cristão e da igreja ([[Jr 29.7; 1Tm 2.1-2]]).'}</P></Caixa>
          </div>
          <EspectroTeologiaPolitica />
          <Rotulo cor={ROSE}>O que teologia política NÃO é</Rotulo>
          <div className="fluxo" style={{ '--min': '280px', '--gap': '12px' } as CSSProperties}>
            {[
              ['Teocracia', 'Não é usar a espada do Estado para impor a fé ou governar a igreja.'],
              ['Ideologia partidária', 'Não é revestir de versículos um programa de partido, de direita ou de esquerda.'],
              ['Teologia civil', 'Não é religião a serviço do poder — o erro de Varrão e da “besta da terra”.'],
              ['Fuga do mundo', 'Não é indiferença à cidade: o cristão busca a paz da cidade onde vive.'],
            ].map(([t, d]) => (
              <Caixa key={t} cor={ROSE}>
                <div style={{ fontSize: 'clamp(18px,2vw,20px)', fontWeight: 900, color: ROSE, marginBottom: 6 }}>✕ {t}</div>
                <P>{d}</P>
              </Caixa>
            ))}
          </div>
        </Secao>

        {/* Mapa */}
        <Secao id="mapa" num="04" cor={PURPLE} titulo="Mapa da tradição" sub="As vozes que acompanharão o curso">
          <LinhaDoTempoTradicao />
          <Tabela cor={PURPLE} cab={['Pensador', 'Ideia-chave', 'Síntese']} linhas={MAPA} />
          <P>{'Note a linha de continuidade: de Agostinho a Kuyper, **a autoridade civil é real, mas limitada**, porque !!só Deus é soberano!!. As diferenças estão em como se descreve a relação entre a igreja, o Estado e as demais esferas — tema das próximas aulas.'}</P>
        </Secao>

        {/* Reflexão */}
        <Secao id="reflexao" num="05" cor={GREEN} titulo="Para refletir" sub="Toque em cada questão para ver a sugestão de gabarito, fundamentada nas referências teóricas">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {REFLEXAO.map(({ q, r, refs }, i) => (
              <div key={i} style={{ borderRadius: 16, border: `1px solid ${GREEN}35`, overflow: 'hidden', background: aberta === i ? `${GREEN}0c` : 'rgba(0,0,0,0.2)' }}>
                <button onClick={() => setAberta(aberta === i ? null : i)} aria-expanded={aberta === i} style={{ all: 'unset', cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'flex-start', width: '100%', boxSizing: 'border-box', padding: 'clamp(14px,2.5vw,20px)' }}>
                  <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 17, color: '#0a0f1e', background: GREEN }}>{i + 1}</span>
                  <span style={{ flex: 1, fontSize: 'clamp(17.5px,2vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.5 }}><Rico t={q} /></span>
                  <span style={{ flexShrink: 0, color: GREEN, fontSize: 20, transform: aberta === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▾</span>
                </button>
                {aberta === i && (
                  <div style={{ padding: '0 clamp(14px,2.5vw,20px) clamp(16px,2.5vw,22px)', marginLeft: 'clamp(0px,5vw,50px)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '14px 16px', borderRadius: 12, background: 'rgba(0,0,0,0.3)', borderLeft: `4px solid ${GREEN}` }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', color: GREEN }}>✓ SUGESTÃO DE GABARITO</div>
                      {r.map((par, k) => <P key={k}>{par}</P>)}
                      <div className="notranslate" translate="no" style={{ fontFamily: 'var(--font-mono)', fontSize: 13.5, fontWeight: 700, color: `${GREEN}` }}>📚 Base: {refs}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <P>{'!!Para o professor:!! valorize respostas que **citem as fontes** da aula, distingam teologia política de teologia civil e evitem tanto a fusão quanto a separação entre fé e vida pública.'}</P>
          <div style={{ padding: 'clamp(14px,2.4vw,20px)', borderRadius: 14, background: 'rgba(0,0,0,0.25)', border: `1px dashed ${GREEN}55` }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, fontWeight: 700, letterSpacing: '0.14em', color: GREEN, marginBottom: 8 }}>📚 REFERÊNCIAS DO GABARITO (ABNT)</div>
            <ul className="notranslate" translate="no" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {REFS_GABARITO.map(ref => (
                <li key={ref} style={{ position: 'relative', paddingLeft: 16, fontSize: 'clamp(13.5px,1.45vw,14.5px)', lineHeight: 1.6, color: 'rgba(230,238,255,0.78)' }}>
                  <span style={{ position: 'absolute', left: 0, color: GREEN }}>▸</span>
                  {ref.split('**').map((x, k) => k % 2 ? <b key={k} style={{ color: '#fff' }}>{x}</b> : x)}
                </li>
              ))}
            </ul>
          </div>
        </Secao>

        {/* Próxima aula */}
        <section id="proxima" style={{ scrollMarginTop: 90, marginBottom: 40, borderRadius: 22, overflow: 'hidden', border: `1.5px solid ${RED}55`, background: `linear-gradient(135deg, ${GREEN}14, rgba(6,12,30,0.92) 45%, ${RED}14)` }}>
          <div style={{ padding: 'clamp(22px,3.5vw,38px)', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, letterSpacing: '0.14em', color: GOLD }}>➜ NA PRÓXIMA AULA · AULA 01</div>
            <h2 style={{ margin: 0, fontSize: 'clamp(26px,3.6vw,38px)', fontWeight: 900, lineHeight: 1.15 }}>Fundamentos Bíblicos da Autoridade Civil</h2>
            <P>{'Com as definições em mãos, iremos **direto às Escrituras**. Quatro textos formarão a base bíblica de todo o curso:'}</P>
            <div className="fluxo" style={{ '--min': '220px', '--gap': '12px' } as CSSProperties}>
              {[['Gn 9.6', 'O pacto noaico e a espada', GREEN], ['Rm 13.1-7', 'O magistrado como ministro de Deus', BLUE], ['1Pe 2.13-17', 'Submissão por causa do Senhor', PURPLE], ['Ap 13', 'Quando o Estado se torna besta', RED]].map(([r, t, cor]) => (
                <div key={r} style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(0,0,0,0.3)', borderTop: `3px solid ${cor}` }}>
                  <div style={{ fontWeight: 900, fontSize: 'clamp(19px,2.2vw,22px)', color: cor }}>{r}</div>
                  <div style={{ fontSize: 'clamp(16px,1.8vw,17.5px)', color: '#fff', marginTop: 4 }}>{t}</div>
                </div>
              ))}
            </div>
            <TensaoRmAp />
            <Caixa cor={SKY}>
              <p style={{ ...txt, fontSize: 'clamp(19px,2.2vw,22px)', color: '#fff', fontWeight: 700 }}>❓ Pergunta-guia: como o mesmo Estado pode ser chamado <span style={{ color: GREEN }}>“ministro de Deus”</span> (Rm 13) e <span style={{ color: RED }}>“besta”</span> (Ap 13)?</p>
            </Caixa>
            <P>{'++Leitura prévia:++ Grudem, Política segundo a Bíblia, caps. 1–3; VanDrunen, Politics after Christendom, caps. 1–2.'}</P>
            <button onClick={() => navigate('/teologia/politica/aula-01')} style={{ all: 'unset', cursor: 'pointer', alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 24px', borderRadius: 14, fontWeight: 900, fontSize: 'clamp(16px,1.9vw,18px)', color: '#0a0f1e', background: GOLD, boxShadow: `0 10px 30px ${GOLD}40` }}>
              Ir para a Aula 01 →
            </button>
          </div>
        </section>

        {/* Notas */}
        <section id="notas" style={{ scrollMarginTop: 90, padding: 'clamp(22px,3.5vw,34px)', borderRadius: 22, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ margin: '0 0 18px', fontSize: 'clamp(22px,2.8vw,28px)', fontWeight: 900 }}>Notas e referências</h2>
          <ol className="notranslate" translate="no" style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {NOTAS.map((n, i) => (
              <li key={i} id={`nota-${i + 1}`} style={{ display: 'flex', gap: 12, scrollMarginTop: 100 }}>
                <span style={{ flexShrink: 0, minWidth: 30, fontWeight: 900, color: GOLD, fontSize: 'clamp(15px,1.7vw,16.5px)' }}>{i + 1}.</span>
                <span style={{ fontSize: 'clamp(15px,1.7vw,16.5px)', lineHeight: 1.65, color: 'rgba(230,238,255,0.86)' }}>{n}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <Footer />
    </div>
  );
}
