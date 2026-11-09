import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BG = '#060d1f';
const GOLD = '#fbbf24';
const GREEN = '#34d399';
const BLUE = '#60a5fa';
const ROSE = '#fb7185';
const PURPLE = '#c084fc';

/* ─── data ─────────────────────────────────────────────────────────────── */

const GABARITO_ENC1: { num: string; resposta: string; notas?: number[] }[] = [
  {
    num: '1.1',
    resposta: 'A Bíblia é a Palavra de Deus, mas toda comunidade que a lê inevitavelmente articula o que entende dela. A confissão torna essa articulação explícita, pública e verificável — e, portanto, corrigível pela própria Escritura. Sem uma confissão formulada, a doutrina de uma igreja fica implícita, dependente de pessoas, e cada geração recomeça do zero, exposta a erros que a Igreja já enfrentou e refutou. A confissão não concorre com a Bíblia: ela registra, de forma resumida e ordenada, aquilo que a Igreja reconhece que a Bíblia ensina.¹',
    notas: [1],
  },
  {
    num: '1.2',
    resposta: '"Norma normans" (norma que normatiza) é a Escritura: autoridade absoluta, originária e final, porque procede de Deus. "Norma normata" (norma normatizada) é a confissão: autoridade real, porém derivada e subordinada — vale enquanto e na medida em que concorda com a Escritura. A própria Confissão de Westminster afirma isso no I.10 (o juiz supremo é o Espírito falando na Escritura) e no XXXI.4 (sínodos e concílios podem errar e não devem ser tomados como regra de fé). A confissão obedece à Bíblia; nunca o contrário.²',
    notas: [2],
  },
  {
    num: '1.3',
    resposta: 'A Assembleia foi convocada pelo Parlamento Longo da Inglaterra em 1643, em plena Guerra Civil entre o Parlamento e o rei Carlos I. O objetivo era reformar a Igreja da Inglaterra "segundo a Palavra de Deus e o exemplo das igrejas mais bem reformadas". Com a Solemn League and Covenant (1643), o Parlamento aliou-se à Escócia, que enviou comissários — entre eles Samuel Rutherford, George Gillespie, Alexander Henderson e Robert Baillie. Participaram cerca de 120 teólogos ingleses e 30 assessores leigos, reunidos sobretudo na Jerusalem Chamber da Abadia de Westminster, entre 1643 e 1649 (mais de mil sessões).³',
    notas: [3],
  },
  {
    num: '1.4',
    resposta: 'Os "Padrões de Westminster" são o conjunto de documentos produzidos pela Assembleia: (1) a Confissão de Fé (1646; com textos-prova em 1647) — a exposição doutrinária sistemática; (2) o Catecismo Maior (1647) — instrução detalhada, voltada sobretudo para pregadores e mestres; (3) o Breve Catecismo (1647) — 107 perguntas para o ensino de crianças e novos convertidos; (4) a Forma de Governo Presbiteriano (1645) e (5) o Diretório de Culto Público (1645). Juntos, cobrem doutrina, ensino, governo e culto. No Brasil, a Igreja Presbiteriana adota a Confissão e os dois Catecismos como seus Símbolos de Fé.⁴',
    notas: [4],
  },
  {
    num: '1.5',
    resposta: 'Porque a Escritura é o princípio do conhecimento teológico (principium cognoscendi). Tudo o que a Confissão dirá sobre Deus, o pecado, Cristo e a salvação só tem autoridade se a fonte desse conhecimento estiver estabelecida antes. Por isso, Westminster responde primeiro "como sabemos?" e só depois "o que cremos?". Os teólogos reformados distinguiam Deus como principium essendi (o fundamento do ser) e a Escritura como principium cognoscendi (o fundamento do conhecer). A ordem é uma declaração de método: nenhuma doutrina posterior pode ultrapassar o que a Escritura ensina.⁵',
    notas: [5],
  },
  {
    num: '1.6',
    resposta: 'Judas escreve a cristãos ameaçados por falsos mestres infiltrados (Jd 4). A "fé que uma vez por todas foi entregue aos santos" (τῇ ἅπαξ παραδοθείσῃ τοῖς ἁγίοις πίστει) é o conteúdo objetivo do evangelho, transmitido de modo definitivo e completo — o "depósito" que Paulo manda guardar (παραθήκη, 2Tm 1.14). O ἅπαξ ("uma vez por todas") exclui acréscimos posteriores. É exatamente o que Westminster afirma em I.1 ("tendo cessado aqueles antigos modos de revelar") e I.6 ("nada se acrescentará em tempo algum").⁶',
    notas: [6],
  },
  {
    num: '1.7',
    resposta: 'Westminster é a "mãe" de uma família de confissões. Os congregacionais ingleses a adaptaram na Declaração de Savoy (1658), alterando sobretudo o governo eclesiástico. Os Batistas Particulares, por sua vez, tomaram Westminster e Savoy como base da Segunda Confissão de Londres (1677, reafirmada em 1689), modificando o batismo (somente de crentes), a eclesiologia (igrejas locais autônomas) e o papel do magistrado. No Capítulo I, os batistas mantiveram quase todo o texto de Westminster, mas acrescentaram uma frase de abertura: "A Escritura Sagrada é a única regra suficiente, certa e infalível de todo conhecimento salvador, fé e obediência". Westminster, Savoy e 1689 compartilham, portanto, a mesma doutrina da Escritura.⁷',
    notas: [7],
  },
  {
    num: '1.8',
    resposta: 'Resposta pessoal e congregacional — não há gabarito fechado. Pontos para refletir: sua igreja adota formalmente os Padrões de Westminster (para admissão de membros, ordenação de oficiais, ensino)? Os membros conhecem ao menos o Breve Catecismo? A pregação e a escola dominical dialogam com a Confissão? Quando surge uma controvérsia doutrinária, a Confissão é consultada? A Confissão está viva na igreja ou guardada numa estante?',
  },
];

const NOTAS_RODAPE = [
  { num: 1, ref: 'TRUEMAN, Carl R. The Creedal Imperative. Wheaton: Crossway, 2012. cap. 2–3.' },
  { num: 2, ref: 'MULLER, Richard A. Dictionary of Latin and Greek Theological Terms. 2. ed. Grand Rapids: Baker Academic, 2017. Verbetes: norma normans; norma normata.' },
  { num: 3, ref: 'LETHAM, Robert. The Westminster Assembly: Reading Its Theology in Historical Context. Phillipsburg: P&R, 2009. cap. 1–2.' },
  { num: 4, ref: 'VAN DIXHOORN, Chad. Confessing the Faith: A Reader\'s Guide to the Westminster Confession of Faith. Edinburgh: Banner of Truth, 2014. Introdução.' },
  { num: 5, ref: 'MULLER, Richard A. Post-Reformation Reformed Dogmatics. 2. ed. Grand Rapids: Baker Academic, 2003. v. 2: Holy Scripture — The Cognitive Foundation of Theology.' },
  { num: 6, ref: 'BAVINCK, Herman. Dogmática Reformada. São Paulo: Cultura Cristã, 2012. v. 1, parte sobre a Escritura.' },
  { num: 7, ref: 'WALDRON, Samuel E. Uma exposição moderna da Confissão de Fé Batista de 1689. São Paulo: Fiel, 2014. Introdução e cap. 1.' },
];

const GLOSSARIO_GERAL = [
  { termo: 'Assembleia de Westminster', def: 'Sínodo de teólogos convocado pelo Parlamento inglês (1643–1649) para reformar a Igreja da Inglaterra; produziu a Confissão de Fé, os Catecismos Maior e Breve, a Forma de Governo e o Diretório de Culto.' },
  { termo: 'Padrões de Westminster', def: 'O conjunto dos documentos da Assembleia. No Brasil, a Igreja Presbiteriana adota a Confissão e os dois Catecismos como seus Símbolos de Fé.' },
  { termo: 'Norma normans', def: 'A "norma que normatiza" — a Escritura Sagrada, autoridade absoluta e final sobre toda doutrina e prática.' },
  { termo: 'Norma normata', def: 'A "norma normatizada" — confissões e catecismos, com autoridade subordinada e derivada, sempre sujeita à Escritura.' },
];

const CONF_TEXT_1_5 = [
  {
    para: '§1',
    titulo: 'A necessidade da Escritura',
    texto: (<p className="italic">
      Ainda que <strong style={{ color: GREEN }}>a luz da natureza e as obras da criação e da providência</strong> de tal modo manifestem a bondade, a sabedoria e o poder de Deus, que os homens ficam <strong style={{ color: GREEN }}>inescusáveis</strong>, contudo <span style={{ color: ROSE, fontWeight: 600 }}>não são suficientes para dar aquele conhecimento de Deus e da sua vontade necessário para a salvação</span>; por isso foi o Senhor servido, em diversos tempos e de diferentes modos, <strong style={{ color: GREEN }}>revelar-se e declarar à sua Igreja aquela sua vontade</strong>; e depois, para melhor preservação e propagação da verdade, para o mais seguro estabelecimento e conforto da Igreja contra a corrupção da carne e a malícia de Satanás e do mundo, foi igualmente servido <strong style={{ color: GREEN }}>fazê-la escrever toda</strong>. Isto torna <strong style={{ color: GREEN }}>indispensável a Escritura Sagrada</strong>, <span style={{ color: ROSE, fontWeight: 600 }}>tendo cessado aqueles antigos modos de revelar Deus a sua vontade ao seu povo</span>.
    </p>),
  },
  {
    para: '§2',
    titulo: 'O cânon: os 66 livros',
    texto: (<p className="italic">
      Sob o nome de <strong style={{ color: GREEN }}>Escritura Sagrada, ou Palavra de Deus escrita</strong>, incluem-se agora todos os livros do Antigo e do Novo Testamento. Do Antigo Testamento: Gênesis, Êxodo, Levítico, Números, Deuteronômio, Josué, Juízes, Rute, 1 Samuel, 2 Samuel, 1 Reis, 2 Reis, 1 Crônicas, 2 Crônicas, Esdras, Neemias, Ester, Jó, Salmos, Provérbios, Eclesiastes, Cântico dos Cânticos, Isaías, Jeremias, Lamentações, Ezequiel, Daniel, Oseias, Joel, Amós, Obadias, Jonas, Miqueias, Naum, Habacuque, Sofonias, Ageu, Zacarias, Malaquias. Do Novo Testamento: Mateus, Marcos, Lucas, João, Atos, Romanos, 1 Coríntios, 2 Coríntios, Gálatas, Efésios, Filipenses, Colossenses, 1 Tessalonicenses, 2 Tessalonicenses, 1 Timóteo, 2 Timóteo, Tito, Filemom, Hebreus, Tiago, 1 Pedro, 2 Pedro, 1 João, 2 João, 3 João, Judas, Apocalipse. Todos esses livros foram <strong style={{ color: GREEN }}>dados por inspiração de Deus</strong> para serem <strong style={{ color: GREEN }}>a regra de fé e de prática</strong>.
    </p>),
  },
  {
    para: '§3',
    titulo: 'Os apócrifos',
    texto: (<p className="italic">
      Os livros geralmente chamados <strong style={{ color: GREEN }}>Apócrifos</strong>, <span style={{ color: ROSE, fontWeight: 600 }}>não sendo de inspiração divina, não fazem parte do cânon da Escritura</span>; não são, portanto, de autoridade na Igreja de Deus, nem de modo algum podem ser aprovados ou empregados <strong style={{ color: GREEN }}>senão como escritos humanos</strong>.
    </p>),
  },
  {
    para: '§4',
    titulo: 'A fonte da autoridade',
    texto: (<p className="italic">
      A autoridade da Escritura Sagrada, razão pela qual deve ser <strong style={{ color: GREEN }}>crida e obedecida</strong>, <span style={{ color: ROSE, fontWeight: 600 }}>não depende do testemunho de qualquer homem ou igreja</span>, mas depende <strong style={{ color: GREEN }}>somente de Deus (a mesma verdade), que é o seu autor</strong>; tem, portanto, de ser recebida, <strong style={{ color: GREEN }}>porque é a Palavra de Deus</strong>.
    </p>),
  },
  {
    para: '§5',
    titulo: 'Evidências e o testemunho do Espírito',
    texto: (<p className="italic">
      Pelo <strong style={{ color: GREEN }}>testemunho da Igreja</strong> podemos ser movidos e incitados a um alto e reverente apreço da Escritura Sagrada; a suprema excelência do seu conteúdo, a eficácia da sua doutrina, a majestade do seu estilo, a harmonia de todas as suas partes, o escopo do seu todo (que é dar a Deus toda a glória), a plena revelação que faz do único meio de salvar-se o homem, as suas muitas outras excelências incomparáveis e completa perfeição, são <strong style={{ color: GREEN }}>argumentos pelos quais abundantemente se evidencia ser ela a Palavra de Deus</strong>; contudo, a nossa <strong style={{ color: GREEN }}>plena persuasão e certeza</strong> da sua infalível verdade e divina autoridade provém <span style={{ color: ROSE, fontWeight: 600 }}>da operação interna do Espírito Santo</span>, que <strong style={{ color: GREEN }}>pela Palavra e com a Palavra testifica em nossos corações</strong>.
    </p>),
  },
];

const CONF_TEXT_6_10 = [
  {
    para: '§6',
    titulo: 'Suficiência, iluminação e circunstâncias',
    texto: (<p className="italic">
      <strong style={{ color: GOLD }}>Todo o conselho de Deus</strong> concernente a todas as coisas necessárias para a glória dele e para a salvação, fé e vida do homem, ou é <strong style={{ color: GOLD }}>expressamente declarado na Escritura</strong> ou pode ser <span style={{ color: GOLD, fontWeight: 600 }}>lógica e claramente deduzido dela</span>. <span style={{ color: ROSE, fontWeight: 600 }}>À Escritura nada se acrescentará em tempo algum, nem por novas revelações do Espírito, nem por tradições dos homens</span>; reconhecemos, entretanto, ser necessária a <strong style={{ color: GOLD }}>íntima iluminação do Espírito de Deus</strong> para a salvadora compreensão das coisas reveladas na Palavra, e que há algumas <span style={{ color: GOLD, fontWeight: 600 }}>circunstâncias, quanto ao culto de Deus e ao governo da Igreja</span>, comuns às ações e sociedades humanas, as quais têm de ser ordenadas <strong style={{ color: GOLD }}>pela luz da natureza e pela prudência cristã, segundo as regras gerais da Palavra</strong>, que sempre devem ser observadas.
    </p>),
  },
  {
    para: '§7',
    titulo: 'A clareza da Escritura',
    texto: (<p className="italic">
      Na Escritura <span style={{ color: ROSE, fontWeight: 600 }}>não são todas as coisas igualmente claras em si, nem do mesmo modo evidentes a todos</span>; contudo, as coisas que precisam ser <strong style={{ color: GOLD }}>obedecidas, cridas e observadas para a salvação</strong>, em um ou outro passo da Escritura são tão claramente expostas e explicadas, que <span style={{ color: GOLD, fontWeight: 600 }}>não só os doutos, mas ainda os indoutos</span>, no <strong style={{ color: GOLD }}>devido uso dos meios ordinários</strong>, podem alcançar uma suficiente compreensão delas.
    </p>),
  },
  {
    para: '§8',
    titulo: 'Os originais e as traduções',
    texto: (<p className="italic">
      O Antigo Testamento em <strong style={{ color: GOLD }}>hebraico</strong> (língua vernácula do antigo povo de Deus) e o Novo Testamento em <strong style={{ color: GOLD }}>grego</strong> (a língua mais geralmente conhecida entre as nações no tempo em que ele foi escrito), sendo <strong style={{ color: GOLD }}>inspirados imediatamente por Deus</strong> e pelo seu <span style={{ color: GOLD, fontWeight: 600 }}>singular cuidado e providência conservados puros em todos os séculos</span>, são por isso <strong style={{ color: GOLD }}>autênticos</strong>, e assim em todas as controvérsias religiosas a Igreja deve apelar para eles como para um supremo tribunal; mas, não sendo essas línguas conhecidas por todo o povo de Deus, que tem direito e interesse nas Escrituras e que deve no temor de Deus lê-las e estudá-las, esses livros <strong style={{ color: GOLD }}>têm de ser traduzidos nas línguas vulgares de todas as nações</strong> aonde chegarem, a fim de que a Palavra de Deus, permanecendo nelas abundantemente, <strong style={{ color: GOLD }}>adorem a Deus de modo aceitável</strong> e possuam a esperança pela paciência e conforto das Escrituras.
    </p>),
  },
  {
    para: '§9',
    titulo: 'A Escritura interpreta a Escritura',
    texto: (<p className="italic">
      <strong style={{ color: GOLD }}>A regra infalível de interpretação da Escritura é a mesma Escritura</strong>; portanto, quando houver questão sobre o verdadeiro e pleno sentido de qualquer texto da Escritura (<span style={{ color: GOLD, fontWeight: 600 }}>sentido que não é múltiplo, mas único</span>), esse texto pode ser estudado e compreendido <strong style={{ color: GOLD }}>por outros textos que falem mais claramente</strong>.
    </p>),
  },
  {
    para: '§10',
    titulo: 'O Juiz Supremo',
    texto: (<p className="italic">
      <strong style={{ color: GOLD }}>O Juiz Supremo</strong>, pelo qual todas as controvérsias religiosas têm de ser determinadas e por quem serão examinados todos os <span style={{ color: ROSE, fontWeight: 600 }}>decretos de concílios, todas as opiniões dos antigos escritores, todas as doutrinas de homens e opiniões particulares</span>, o Juiz Supremo em cuja sentença nos devemos firmar, não pode ser outro senão <strong style={{ color: GOLD }}>o Espírito Santo falando na Escritura</strong>.
    </p>),
  },
];

const FAMILIA_WESTMINSTER = [
  { doc: 'Confissão de Westminster', ano: '1646', trad: 'Presbiteriana', cor: BLUE, governo: 'Presbíteros reunidos em concílios (presbitérios, sínodos)', batismo: 'Crentes e seus filhos', cap1: 'Texto-base do capítulo' },
  { doc: 'Declaração de Savoy', ano: '1658', trad: 'Congregacional', cor: PURPLE, governo: 'Igrejas locais autônomas', batismo: 'Crentes e seus filhos', cap1: 'Praticamente idêntico a Westminster' },
  { doc: 'Confissão Batista de Londres', ano: '1677/1689', trad: 'Batista Particular', cor: GOLD, governo: 'Igrejas locais autônomas', batismo: 'Somente crentes, por imersão', cap1: 'Acrescenta a frase de abertura: "única regra suficiente, certa e infalível"' },
];

const ENCONTRO1 = {
  titulo: 'Parte 1',
  subtitulo: 'Por que a Igreja confessa sua fé? A Assembleia de Westminster',
  cor: BLUE,
  versiculo: 'Mantém o padrão das sãs palavras que de mim ouviste com fé e com o amor que está em Cristo Jesus.',
  ref_versiculo: '2 Timóteo 1.13',
  aplicacao: (<>
    <p>Os teólogos de Westminster trabalharam <strong style={{ color: BLUE }}>em meio a uma guerra civil</strong> — e ainda assim dedicaram seis anos a definir com precisão aquilo que a Igreja crê. Eles sabiam que <strong style={{ color: BLUE }}>tempos de crise exigem clareza doutrinária</strong>, não menos. A pergunta para nós é: em um tempo de confusão teológica, a sua igreja sabe dizer, com clareza, o que crê?</p>
    <p>Na prática: <strong style={{ color: BLUE }}>use os Padrões de Westminster como ferramentas de discipulado</strong>. O Breve Catecismo pode ser memorizado em família (comece pela pergunta 1: <em>"Qual é o fim principal do homem? — Glorificar a Deus e gozá-lo para sempre"</em>). A Confissão pode orientar classes de novos membros e a preparação de oficiais. O Catecismo Maior é um excelente roteiro para o estudo pessoal das doutrinas.</p>
    <p>E lembre-se: a Confissão é <strong style={{ color: BLUE }}>norma normata</strong>. Ela nos ensina a <strong style={{ color: BLUE }}>voltar sempre à Bíblia</strong>, e não a substituí-la. O melhor uso da Confissão é aquele que nos leva a abrir as Escrituras e conferir seus textos-prova, como os bereanos fizeram com o ensino de Paulo (At 17.11).</p>
  </>),
  textos: ['2Tm 1.13–14', 'Jd 3', 'At 17.11', 'Rm 10.9–10', '1Tm 3.15'],
  introducao: (<>
    <p>A fé cristã sempre foi uma <strong style={{ color: BLUE }}>fé confessada</strong>. Paulo manda Timóteo <strong style={{ color: BLUE }}>"manter o padrão das sãs palavras"</strong> (2Tm 1.13), Judas manda <strong style={{ color: BLUE }}>"batalhar pela fé entregue aos santos"</strong> (Jd 3), e a Igreja é chamada <strong style={{ color: BLUE }}>"coluna e baluarte da verdade"</strong> (1Tm 3.15). <span style={{ color: BLUE, fontWeight: 700 }}>Confessar a fé não é opção devocional — é chamado da Igreja.</span></p>
    <p>A <strong style={{ color: BLUE }}>Confissão de Fé de Westminster</strong> nasceu em <span style={{ color: ROSE, fontWeight: 600 }}>meio à Guerra Civil inglesa</span>. Em 1643, o Parlamento convocou uma assembleia de teólogos para reformar a Igreja da Inglaterra <em>"segundo a Palavra de Deus e o exemplo das igrejas mais bem reformadas"</em>. Pela <strong style={{ color: BLUE }}>Solemn League and Covenant</strong>, a Escócia enviou comissários — entre eles <strong style={{ color: GOLD }}>Samuel Rutherford</strong> e <strong style={{ color: GOLD }}>George Gillespie</strong>. Reunidos na Jerusalem Chamber da Abadia de Westminster, produziram a Confissão (1646), os <strong style={{ color: BLUE }}>Catecismos Maior e Breve</strong> (1647), a Forma de Governo e o Diretório de Culto.</p>
    <p>O resultado é considerado o <strong style={{ color: BLUE }}>símbolo de fé mais completo e preciso da Reforma</strong>. Adotada pela Igreja da Escócia em 1647, a Confissão tornou-se o padrão do <strong style={{ color: BLUE }}>presbiterianismo mundial</strong> — inclusive da Igreja Presbiteriana do Brasil — e serviu de base para a Declaração de Savoy (1658) e a Confissão Batista de Londres (1677/1689). E ela começa por uma escolha significativa: <span style={{ color: BLUE, fontWeight: 700 }}>antes de falar de Deus, fala da Escritura</span>.</p>
  </>),
  perguntas: [
    { num: '1.1', texto: 'Por que a Igreja precisa de confissões de fé, se já tem a Bíblia?', recurso: { label: 'Por que somos confessionais — Ligonier PT', url: 'https://pt.ligonier.org/artigos/porque-somos-confessionais/' } },
    { num: '1.2', texto: 'O que significa dizer que a Escritura é "norma normans" e a confissão é "norma normata"?', recurso: { label: 'A relevância dos credos e confissões — Monergismo', url: 'https://monergismo.com/a-relevancia-dos-credos-e-confissoes-heber-carlos-de-campos/' } },
    { num: '1.3', texto: 'Em que contexto histórico e político foi convocada a Assembleia de Westminster (1643)? Quem participou dela?' },
    { num: '1.4', texto: 'O que são os "Padrões de Westminster"? Qual a função de cada documento produzido pela Assembleia?' },
    { num: '1.5', texto: 'Por que a Confissão de Westminster começa pela doutrina da Escritura, e não pela doutrina de Deus?', recurso: { label: 'Sola Scriptura — Ligonier PT', url: 'https://pt.ligonier.org/artigos/sola-scriptura/' } },
    { num: '1.6', texto: 'Em Judas 3, o que significa "a fé que uma vez por todas foi entregue aos santos"? Como isso se relaciona com a Confissão?', recurso: { label: 'Por que batalhar pela fé — Ligonier PT', url: 'https://pt.ligonier.org/artigos/por-que-devemos-batalhar-pela-fe/' } },
    { num: '1.7', texto: 'Que relação existe entre Westminster (1646), a Declaração de Savoy (1658) e a Confissão Batista de Londres (1677/1689)?', recurso: { label: 'Confissão Batista de Londres 1689 — Ligonier PT', url: 'https://pt.ligonier.org/recursos/credos-e-confiss%C3%B5es/a-confissao-de-fe-batista-de-londres-de-1689/' } },
    { num: '1.8', texto: 'Como sua igreja local usa (ou poderia usar) os Padrões de Westminster hoje?' },
  ],
  glossario: GLOSSARIO_GERAL,
};

const ENCONTRO2 = {
  titulo: 'Parte 2',
  subtitulo: 'A necessidade, o cânon e a autoridade da Escritura (§1–5)',
  cor: GREEN,
  versiculo: 'Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção, para a educação na justiça.',
  ref_versiculo: '2 Timóteo 3.16',
  aplicacao: (<>
    <p>Se a revelação natural <strong style={{ color: GREEN }}>não basta para salvar</strong> (§1), então <strong style={{ color: GREEN }}>a missão da Igreja depende da Palavra</strong>. Ninguém é salvo apenas contemplando o céu estrelado; é preciso ouvir o evangelho (Rm 10.14–17). Isso dá urgência à pregação, à tradução da Bíblia e às missões: o mundo precisa da Escritura.</p>
    <p>Se Deus <strong style={{ color: GREEN }}>"fez escrever toda"</strong> a sua vontade e <strong style={{ color: GREEN }}>cessaram os antigos modos de revelação</strong> (§1), então não devemos buscar a voz de Deus em impressões, sonhos ou "palavras" que concorram com a Bíblia. <strong style={{ color: GREEN }}>Quer ouvir Deus falar? Abra a Escritura.</strong> Ela é a voz de Deus para o seu povo hoje.</p>
    <p>Por fim, o §5 consola o crente simples: a certeza de que a Bíblia é Palavra de Deus <strong style={{ color: GREEN }}>não depende de vencer todos os debates acadêmicos</strong>. As evidências são abundantes e úteis, mas a certeza plena vem do <strong style={{ color: GREEN }}>Espírito Santo, que testifica pela Palavra e com a Palavra</strong> em nossos corações. Leia a Bíblia orando para que o mesmo Espírito que a inspirou a ilumine para você.</p>
  </>),
  textos: ['Sl 19.1–3', 'Rm 1.19–20', 'Hb 1.1–2', 'Pv 22.19–21', '2Tm 3.16–17', '2Pe 1.19–21', '1Ts 2.13', '1Jo 2.20'],
  introducao: (<>
    <p>O §1 começa com uma pergunta essencial: <strong style={{ color: GREEN }}>por que precisamos de uma Bíblia?</strong> A resposta parte do que Deus já mostra a todos pela <strong style={{ color: GREEN }}>"luz da natureza e as obras da criação e da providência"</strong> (Sl 19.1–3; Rm 1.19–20). Essa <strong style={{ color: GREEN }}>revelação geral</strong> é real — e torna os homens inescusáveis —, mas <span style={{ color: ROSE, fontWeight: 600 }}>não revela o caminho da salvação</span>.</p>
    <p>Por isso Deus falou <em>"muitas vezes e de muitas maneiras"</em> (Hb 1.1) e depois fez registrar por escrito <strong style={{ color: GREEN }}>toda</strong> a sua vontade — para <strong style={{ color: GREEN }}>preservar</strong> a verdade, <strong style={{ color: GREEN }}>propagá-la</strong> e <strong style={{ color: GREEN }}>proteger a Igreja</strong> contra a corrupção da carne e a malícia de Satanás. Westminster conclui: <span style={{ color: ROSE, fontWeight: 600 }}>os antigos modos de revelação cessaram</span>; agora temos a <strong style={{ color: GREEN }}>Palavra de Deus escrita</strong>.</p>
    <p>Os §2–3 definem o <strong style={{ color: GREEN }}>cânon</strong> (os 66 livros) e excluem os apócrifos. Os §4–5 tratam da <strong style={{ color: GREEN }}>autoridade</strong>: ela <span style={{ color: ROSE, fontWeight: 600 }}>não vem da Igreja nem de qualquer homem</span>, mas <strong style={{ color: GREEN }}>somente de Deus, seu autor</strong>. A Igreja pode nos levar a estimar a Bíblia; as evidências podem nos mostrar sua excelência; <span style={{ color: GREEN, fontWeight: 600 }}>mas a plena certeza vem do Espírito Santo</span>.</p>
  </>),
  perguntas: [
    { num: '2.1', texto: 'Segundo o §1, o que a "luz da natureza" consegue revelar e o que ela não consegue? Qual a diferença entre revelação geral e revelação especial?', recurso: { label: 'A autorrevelação de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-autorrevelacao-de-deus/' } },
    { num: '2.2', texto: 'Por que Deus quis "fazer escrever toda" a sua vontade? Que razões o §1 apresenta?' },
    { num: '2.3', texto: 'O que significa a frase "tendo cessado aqueles antigos modos de revelar Deus a sua vontade ao seu povo" (§1)? Que implicações ela tem hoje?', recurso: { label: 'Sola Scriptura — Alderi Matos — Monergismo', url: 'https://www.monergismo.com/textos/cinco_solas/solascriptura_alderi.htm' } },
    { num: '2.4', texto: 'O que significa dizer que a Escritura foi "dada por inspiração de Deus" (§2; 2Tm 3.16)?', recurso: { label: 'Inspirada por Deus — Monergismo', url: 'https://monergismo.com/inspirada-por-deus/' } },
    { num: '2.5', texto: 'Por que os apócrifos não fazem parte do cânon (§3)? Como eles podem ser usados?', recurso: { label: 'Apócrifos: Analisando as Evidências — Monergismo', url: 'https://www.monergismo.com/textos/bibliologia/apocrifos_analisando_geisler.htm' } },
    { num: '2.6', texto: 'Segundo o §4, de onde vem a autoridade da Escritura? Por que ela não pode depender da Igreja?', recurso: { label: 'A Bíblia — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-biblia/' } },
    { num: '2.7', texto: 'O §5 lista várias evidências de que a Bíblia é Palavra de Deus. Por que, mesmo assim, a plena certeza vem do testemunho interno do Espírito Santo?', recurso: { label: 'Doutrina Reformada da Autoridade das Escrituras — Monergismo', url: 'https://www.monergismo.com/textos/bibliologia/autoridade_anglada.htm' } },
  ],
  glossario: [
    { termo: 'Luz da Natureza', def: 'O conhecimento de Deus disponível a todos pela criação, pela providência e pela consciência. Torna o homem inescusável (Rm 1.20), mas não revela o evangelho.' },
    { termo: 'Inspiração', def: 'A ação do Espírito Santo sobre os autores bíblicos, de modo que o que escreveram é, de fato, a Palavra de Deus — θεόπνευστος, "soprada por Deus" (2Tm 3.16).' },
    { termo: 'Cânon', def: 'A lista dos livros inspirados — 39 do AT e 27 do NT. A Igreja não criou o cânon: reconheceu os livros que Deus inspirou.' },
    { termo: 'Testemunho Interno do Espírito', def: 'Testimonium Spiritus Sancti internum — a obra do Espírito que, pela Palavra e com a Palavra, dá ao crente plena certeza de que a Escritura é Palavra de Deus.' },
  ],
};

const ENCONTRO3 = {
  titulo: 'Parte 3',
  subtitulo: 'A suficiência, a clareza e a supremacia da Escritura (§6–10)',
  cor: GOLD,
  versiculo: 'A revelação das tuas palavras esclarece e dá entendimento aos simples.',
  ref_versiculo: 'Salmo 119.130',
  aplicacao: (<>
    <p>A <strong style={{ color: GOLD }}>suficiência</strong> (§6) liberta a consciência do crente. Se a Escritura contém <strong style={{ color: GOLD }}>todo o conselho de Deus</strong>, nenhum líder, tradição ou "nova revelação" pode impor ao crente uma obrigação espiritual que Deus não impôs. Diante de qualquer exigência religiosa, a pergunta é sempre: <em>onde a Escritura ensina isso — expressamente ou por boa e necessária consequência?</em></p>
    <p>O §6 também traz equilíbrio: há <strong style={{ color: GOLD }}>circunstâncias</strong> do culto e do governo da Igreja (horário, local, duração, organização) que a Bíblia não detalha e que devem ser decididas <strong style={{ color: GOLD }}>pela luz da natureza e pela prudência cristã</strong>, segundo as regras gerais da Palavra (1Co 14.40). Isso evita dois erros: o de inventar elementos de culto e o de transformar preferências de organização em questão de consciência.</p>
    <p>A <strong style={{ color: GOLD }}>clareza</strong> (§7) e a ordem de <strong style={{ color: GOLD }}>traduzir a Bíblia</strong> (§8) devolvem a Escritura ao povo. Leia a Bíblia por inteiro, com regularidade, usando os <strong style={{ color: GOLD }}>meios ordinários</strong>: pregação, leitura, oração, estudo em comunidade. E quando surgir uma dúvida, aplique o §9 — <strong style={{ color: GOLD }}>deixe a Escritura interpretar a Escritura</strong> — e o §10 — submeta tudo, inclusive sua própria opinião, <strong style={{ color: GOLD }}>ao Espírito Santo falando na Escritura</strong>.</p>
  </>),
  textos: ['Gl 1.8–9', '2Tm 3.15–17', 'Mt 22.29–32', '1Co 2.9–12', '1Co 14.40', 'Sl 119.130', 'Is 8.20', 'At 15.15–16'],
  introducao: (<>
    <p>O §6 afirma a <strong style={{ color: GOLD }}>suficiência</strong> da Escritura: tudo o que é necessário para a glória de Deus e para a salvação, fé e vida do homem está <strong style={{ color: GOLD }}>expressamente declarado</strong> nela ou pode ser <strong style={{ color: GOLD }}>deduzido dela por boa e necessária consequência</strong>. O próprio Jesus usou esse método ao provar a ressurreição a partir de Êxodo 3.6 (Mt 22.29–32). <span style={{ color: ROSE, fontWeight: 600 }}>Nada se acrescenta à Escritura — nem por novas revelações, nem por tradições humanas.</span></p>
    <p>Mas o mesmo parágrafo faz duas ressalvas importantes: (1) é necessária a <strong style={{ color: GOLD }}>iluminação do Espírito</strong> para a compreensão salvadora da Palavra (1Co 2.9–12); (2) existem <strong style={{ color: GOLD }}>circunstâncias</strong> do culto e do governo da Igreja que se decidem pela <strong style={{ color: GOLD }}>prudência cristã</strong>, segundo as regras gerais da Palavra. Daí a distinção clássica entre <strong style={{ color: GOLD }}>elementos</strong> do culto (que Deus ordena) e <strong style={{ color: GOLD }}>circunstâncias</strong> (que a Igreja organiza).</p>
    <p>Os §7–8 garantem que a Bíblia é <strong style={{ color: GOLD }}>clara</strong> no que é necessário à salvação e deve ser <strong style={{ color: GOLD }}>traduzida</strong> para todos os povos. O §9 dá a regra de ouro da interpretação: <strong style={{ color: GOLD }}>a Escritura interpreta a Escritura</strong>. E o §10 encerra o capítulo com a declaração mais solene: <strong style={{ color: GOLD }}>o Juiz Supremo é o Espírito Santo falando na Escritura</strong> — <span style={{ color: ROSE, fontWeight: 600 }}>não o papa, não os concílios, não os pais da Igreja, não a experiência pessoal</span>.</p>
  </>),
  perguntas: [
    { num: '3.1', texto: 'O que significa "boa e necessária consequência" (§6)? Como Jesus usa esse método em Mateus 22.29–32?', recurso: { label: 'O que significa Sola Scriptura — Ligonier PT', url: 'https://pt.ligonier.org/artigos/o-que-significa-sola-scriptura/' } },
    { num: '3.2', texto: 'Qual a diferença entre a inspiração da Escritura e a "íntima iluminação do Espírito" mencionada no §6?', recurso: { label: 'O Espírito Santo na Interpretação Bíblica — Monergismo', url: 'https://www.monergismo.com/textos/hermeneuticas/interpretacao_moises.htm' } },
    { num: '3.3', texto: 'O que são as "circunstâncias" do culto e do governo da Igreja (§6)? Como isso se relaciona com o princípio regulador do culto?', recurso: { label: 'O princípio regulador do culto — Ligonier PT', url: 'https://pt.ligonier.org/artigos/o-que-e-o-principio-regulador-do-culto/' } },
    { num: '3.4', texto: 'O que Gálatas 1.8–9 acrescenta à doutrina da suficiência? Por que Paulo usa uma linguagem tão forte?' },
    { num: '3.5', texto: 'A clareza da Escritura (§7) significa que toda a Bíblia é igualmente fácil de entender? O que exatamente o parágrafo afirma?', recurso: { label: 'Teologia e a vida cotidiana (perspicuidade) — Ligonier PT', url: 'https://pt.ligonier.org/artigos/teologia-vida-cotidiana/' } },
    { num: '3.6', texto: 'Segundo o §8, por que as controvérsias devem ser resolvidas pelos textos originais? E por que, ao mesmo tempo, a Bíblia deve ser traduzida?', recurso: { label: 'História da Tradução da Bíblia em Português — Monergismo', url: 'https://www.monergismo.com/textos/bibliologia/historia_bibliaportugues.htm' } },
    { num: '3.7', texto: '"A Escritura interpreta a Escritura" (§9). Por que o parágrafo afirma que o sentido de um texto "não é múltiplo, mas único"? Aplique o princípio a um texto difícil.', recurso: { label: 'Hermenêutica Reformada — Monergismo', url: 'https://www.monergismo.com/textos/hermeneuticas/hermeneutica_anglada.htm' } },
    { num: '3.8', texto: 'Quem é o "Juiz Supremo" segundo o §10? Que autoridades humanas ficam subordinadas a ele?', recurso: { label: 'Sola Scriptura — Ligonier PT', url: 'https://pt.ligonier.org/artigos/sola-scriptura/' } },
  ],
  glossario: [
    { termo: 'Suficiência', def: 'A Escritura contém tudo o que é necessário para a glória de Deus e para a salvação, fé e vida do homem — expressamente ou por boa e necessária consequência.' },
    { termo: 'Boa e Necessária Consequência', def: 'Conclusão que decorre de forma lógica e inevitável do que a Escritura afirma. Tem a mesma autoridade que o ensino explícito (ex.: a doutrina da Trindade).' },
    { termo: 'Iluminação', def: 'A obra do Espírito que abre o entendimento do crente para compreender e receber a Palavra. Não acrescenta conteúdo novo à Escritura — distinta da inspiração e da revelação.' },
    { termo: 'Elementos × Circunstâncias', def: 'Elementos são as partes do culto que Deus ordena (pregação, oração, cântico, sacramentos). Circunstâncias são aspectos práticos (horário, local, duração) decididos pela prudência cristã.' },
  ],
};

const REFERENCIAS = [
  { autores: 'ASSEMBLEIA DE WESTMINSTER', titulo: 'Confissão de Fé de Westminster', local: 'Londres', ano: '1646' },
  { autores: 'BAVINCK, Herman', titulo: 'Dogmática Reformada', local: 'São Paulo: Cultura Cristã', ano: '2012', vol: 'vol. 1' },
  { autores: 'BÍBLIA SAGRADA', titulo: 'Almeida Revista e Atualizada', local: 'Barueri: Sociedade Bíblica do Brasil', ano: '2009' },
  { autores: 'CALVINO, João', titulo: 'Institutas da Religião Cristã', local: 'São Paulo: UNESP', ano: '2008' },
  { autores: 'LETHAM, Robert', titulo: 'The Westminster Assembly: Reading Its Theology in Historical Context', local: 'Phillipsburg: P&R', ano: '2009' },
  { autores: 'SHAW, Robert', titulo: 'An Exposition of the Westminster Confession of Faith', local: 'Fearn: Christian Focus', ano: '1998' },
  { autores: 'VAN DIXHOORN, Chad', titulo: 'Confessing the Faith: A Reader\'s Guide to the Westminster Confession of Faith', local: 'Edinburgh: Banner of Truth', ano: '2014' },
  { autores: 'WARFIELD, Benjamin B', titulo: 'The Westminster Assembly and Its Work', local: 'New York: Oxford University Press', ano: '1931' },
];

/* ─── sub-components ────────────────────────────────────────────────────── */

function FamiliaWestminster() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {FAMILIA_WESTMINSTER.map((f, i) => (
        <motion.div
          key={f.doc}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="rounded-xl p-4 flex flex-col gap-3"
          style={{ background: `${f.cor}0c`, border: `1px solid ${f.cor}30`, borderTop: `3px solid ${f.cor}` }}
        >
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: f.cor }}>{f.ano} · {f.trad}</p>
            <p className="text-white font-extrabold text-base leading-snug mt-1">{f.doc}</p>
          </div>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-wider text-white/45">Governo</dt>
              <dd className="text-white/85 leading-snug">{f.governo}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-wider text-white/45">Batismo</dt>
              <dd className="text-white/85 leading-snug">{f.batismo}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-wider text-white/45">Capítulo I</dt>
              <dd className="leading-snug font-medium" style={{ color: f.cor }}>{f.cap1}</dd>
            </div>
          </dl>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── sub-components ────────────────────────────────────────────────────── */

function VersiculoBox({ texto, ref: r, cor }: { texto: string; ref: string; cor: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-xl p-5 mb-6"
      style={{ background: `${cor}12`, border: `1px solid ${cor}35`, borderLeft: `4px solid ${cor}` }}
    >
      <p className="text-base md:text-lg leading-relaxed italic font-medium" style={{ color: cor }}>"{texto}"</p>
      <p className="mt-2 text-sm md:text-base font-semibold" style={{ color: `${cor}cc` }}>— {r}</p>
    </motion.div>
  );
}

function ConfTexto({ items, cor }: { items: typeof CONF_TEXT_1_5; cor: string }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      {items.map(item => (
        <motion.div key={item.para} layout className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cor}25` }}>
          <button
            onClick={() => setOpen(open === item.para ? null : item.para)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
            style={{ background: open === item.para ? `${cor}18` : `${cor}08` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${cor}25`, color: cor }}>{item.para}</span>
              <span className="font-bold text-white text-base">{item.titulo}</span>
            </div>
            <motion.span animate={{ rotate: open === item.para ? 180 : 0 }} className="text-lg" style={{ color: cor }}>▾</motion.span>
          </button>
          <AnimatePresence>
            {open === item.para && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-5 pb-5"
              >
                <div className="text-white/90 leading-relaxed text-sm md:text-base pt-4 border-t" style={{ borderColor: `${cor}20` }}>{item.texto}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

function PerguntasGrid({ perguntas, cor }: { perguntas: { num: string; texto: string; recurso?: { label: string; url: string } }[]; cor: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {perguntas.map((p, i) => (
        <motion.div
          key={p.num}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="rounded-xl p-4 flex flex-col gap-3"
          style={{ background: `${cor}0a`, border: `1px solid ${cor}22` }}
        >
          <div className="flex items-start gap-3">
            <span className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold" style={{ background: `${cor}28`, color: cor }}>{p.num}</span>
            <p className="text-white/95 text-sm md:text-base leading-relaxed font-medium">{p.texto}</p>
          </div>
          {p.recurso && (
            <div className="flex flex-col gap-1.5 mt-1">
              <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest opacity-50" style={{ color: cor }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                Quer ajuda para responder?
              </span>
              <a
                href={p.recurso.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 self-start rounded-lg px-3 py-1.5 text-xs font-semibold transition-all hover:scale-[1.03] hover:opacity-90"
                style={{ background: `${cor}14`, color: cor, border: `1px solid ${cor}30` }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                {p.recurso.label}
              </a>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function GlossarioCards({ items, cor }: { items: { termo: string; def: string }[]; cor: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map(g => (
        <div key={g.termo} className="rounded-xl p-4" style={{ background: `${cor}0c`, border: `1px solid ${cor}28` }}>
          <p className="font-extrabold text-base mb-2" style={{ color: cor }}>{g.termo}</p>
          <p className="text-white/90 text-base leading-relaxed">{g.def}</p>
        </div>
      ))}
    </div>
  );
}

function AplicacaoBox({ conteudo, cor }: { conteudo: React.ReactNode; cor: string }) {
  return (
    <div className="rounded-xl overflow-hidden mt-4" style={{ border: `1px solid ${cor}35` }}>
      <div className="flex items-center gap-2 px-5 py-3" style={{ background: `${cor}18`, borderBottom: `1px solid ${cor}25` }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: cor, flexShrink: 0 }}>
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
        <p className="text-sm font-extrabold uppercase tracking-widest" style={{ color: cor }}>Aplicação para a vida e a Igreja</p>
      </div>
      <div className="px-5 py-5 space-y-4 text-sm md:text-base leading-relaxed text-white/90" style={{ background: `${cor}07` }}>
        {conteudo}
      </div>
    </div>
  );
}

/* livros com apenas 1 capítulo — a referência "Jd 3" significa Jd 1.3 */
const SINGLE_CHAP = ['ob', 'fm', '2jo', '3jo', 'jd'];

function refToUrl(ref: string): string {
  const base = 'https://www.bibliaonline.com.br/ara';
  const norm = ref.trim().replace(/[–—]/g, '-');
  const sp = norm.lastIndexOf(' ');
  if (sp === -1) return base;
  const book = norm.slice(0, sp).toLowerCase().replace(/\s/g, '');
  const cv = norm.slice(sp + 1);
  if (cv.includes('.')) {
    const [chap, verseRange] = cv.split('.');
    const verseNum = verseRange.split('-')[0];
    return `${base}/${book}/${chap}/${verseNum}`;
  }
  if (SINGLE_CHAP.includes(book)) {
    return `${base}/${book}/1/${cv.split('-')[0]}`;
  }
  return `${base}/${book}/${cv}/1`;
}

function TextosProva({ items, cor }: { items: string[]; cor: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(t => (
        <a
          key={t}
          href={refToUrl(t)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all hover:scale-105 hover:opacity-90"
          style={{ background: `${cor}18`, color: cor, border: `1px solid ${cor}40` }}
          title={`Ler ${t} — Bíblia Online ARA`}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          {t}
        </a>
      ))}
    </div>
  );
}

function TableElementosCircunstancias({ cor }: { cor: string }) {
  const rows = [
    { elemento: 'Pregação da Palavra', circ: 'Hora do culto, duração da pregação' },
    { elemento: 'Oração', circ: 'Quem ora, em que ordem' },
    { elemento: 'Canto de salmos e hinos', circ: 'Estilo musical, instrumentos' },
    { elemento: 'Sacramento do Batismo', circ: 'Momento no culto, uso de pia batismal' },
    { elemento: 'Ceia do Senhor', circ: 'Tipo de pão, frequência' },
    { elemento: 'Leitura pública da Escritura', circ: 'Plano de leitura, tradução usada' },
  ];
  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-base rounded-xl overflow-hidden" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: `${cor}22` }}>
            <th className="px-4 py-3 text-left font-extrabold" style={{ color: cor }}>Elementos (prescritos pela Escritura)</th>
            <th className="px-4 py-3 text-left font-extrabold" style={{ color: cor }}>Circunstâncias (discrição humana)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? `${cor}09` : `${cor}04`, borderTop: `1px solid ${cor}18` }}>
              <td className="px-4 py-3 text-white/95 font-medium">{r.elemento}</td>
              <td className="px-4 py-3 text-white/75">{r.circ}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── main encontro section ─────────────────────────────────────────────── */

function EncontroSection({ enc, textos, confTexto, mostrarTabela, extra }: {
  enc: typeof ENCONTRO1;
  textos?: string[];
  confTexto?: typeof CONF_TEXT_1_5;
  mostrarTabela?: boolean;
  extra?: { titulo: string; conteudo: React.ReactNode };
}) {
  const cor = enc.cor;
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl overflow-hidden mb-8"
      style={{ background: '#0b1530', border: `1px solid ${cor}30` }}
    >
      {/* header */}
      <div className="px-4 md:px-6 pt-5 pb-4" style={{ borderBottom: `1px solid ${cor}22` }}>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: `${cor}22`, color: cor }}>{enc.titulo}</span>
        </div>
        <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">{enc.subtitulo}</h2>
        <p className="mt-2 text-base font-medium" style={{ color: `${cor}cc` }}>"{enc.versiculo}" — {enc.ref_versiculo}</p>
      </div>

      <div className="p-4 md:p-6 space-y-7">

        {/* introducao */}
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: cor }}>Introdução</h3>
          <div className="space-y-4 text-white/90 leading-relaxed text-sm md:text-base">{enc.introducao}</div>
        </div>

        {/* textos-prova */}
        {textos && (
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: cor }}>Textos-Prova</h3>
            <TextosProva items={textos} cor={cor} />
          </div>
        )}

        {/* bloco extra */}
        {extra && (
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: cor }}>{extra.titulo}</h3>
            {extra.conteudo}
          </div>
        )}

        {/* texto confessional */}
        {confTexto && (
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: cor }}>Texto Confessional</h3>
            <ConfTexto items={confTexto} cor={cor} />
          </div>
        )}

        {/* tabela elementos */}
        {mostrarTabela && (
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest mb-3" style={{ color: cor }}>Elementos × Circunstâncias do Culto</h3>
            <TableElementosCircunstancias cor={cor} />
          </div>
        )}

        {/* perguntas */}
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: cor }}>Perguntas para Discussão</h3>
          <PerguntasGrid perguntas={enc.perguntas} cor={cor} />
        </div>

        {/* glossario */}
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: cor }}>Glossário</h3>
          <GlossarioCards items={enc.glossario} cor={cor} />
        </div>

        {/* aplicacao */}
        <AplicacaoBox conteudo={enc.aplicacao} cor={cor} />

      </div>
    </motion.section>
  );
}

const GABARITO_ENC2: { num: string; resposta: string; notas?: number[] }[] = [
  {
    num: '2.1',
    resposta: 'A "luz da natureza e as obras da criação e da providência" revelam a bondade, a sabedoria e o poder de Deus (Sl 19.1–3; Rm 1.19–20) — o suficiente para tornar os homens inescusáveis. Mas não revelam "aquele conhecimento de Deus e da sua vontade necessário para a salvação": a criação mostra que Deus existe e é poderoso, mas não mostra como o pecador pode ser reconciliado com ele. Essa é a diferença entre revelação geral (a todos, pela criação e pela consciência) e revelação especial (ao povo de Deus, pela Palavra, culminando em Cristo, Hb 1.1–2).¹',
    notas: [1],
  },
  {
    num: '2.2',
    resposta: 'O §1 dá três razões para Deus ter feito registrar por escrito a sua vontade: (1) a melhor preservação da verdade — a tradição oral se corrompe com o tempo, o texto escrito permanece; (2) a melhor propagação da verdade — o texto pode ser copiado, traduzido e levado a todas as nações; (3) o mais seguro estabelecimento e conforto da Igreja contra a corrupção da carne e a malícia de Satanás e do mundo — a Igreja tem um padrão fixo e objetivo para resistir ao erro. Provérbios 22.19–21 e Lucas 1.3–4 mostram esse mesmo propósito: escrever para dar certeza.²',
    notas: [2],
  },
  {
    num: '2.3',
    resposta: 'A frase afirma que os modos pelos quais Deus revelou sua vontade no passado — visões, sonhos, profetas, a palavra direta dos apóstolos — cessaram como meios de revelação normativa para a Igreja, porque essa revelação foi inteiramente registrada na Escritura e encerrada com a vinda de Cristo, a palavra final de Deus (Hb 1.1–2). Implicação: hoje, a vontade de Deus para a fé e a vida não deve ser buscada em novas revelações, mas na Escritura. Isso não nega que Deus continue agindo providencialmente; nega que haja novas revelações com autoridade igual ou complementar à Bíblia.³',
    notas: [3],
  },
  {
    num: '2.4',
    resposta: 'Significa que a Escritura procede de Deus. Em 2Tm 3.16, Paulo usa θεόπνευστος ("soprada por Deus"): o que é inspirado é o próprio texto, não apenas os escritores. O Espírito Santo conduziu os autores humanos — com seus estilos, vocabulários e circunstâncias — de modo que o que escreveram é verdadeiramente a Palavra de Deus (2Pe 1.21). Por isso o §2 conclui que os 66 livros são "a regra de fé e de prática": se Deus é o autor, a Escritura tem a autoridade do próprio Deus.⁴',
    notas: [4],
  },
  {
    num: '2.5',
    resposta: 'Porque "não são de inspiração divina". Razões históricas e teológicas: (1) nunca fizeram parte do cânon hebraico recebido pelos judeus, a quem foram "confiados os oráculos de Deus" (Rm 3.2); (2) Jesus e os apóstolos não os citam como Escritura; (3) contêm erros históricos e ensinos estranhos à Escritura canônica (como orações pelos mortos, 2Mc 12.43–45). O §3 não os despreza: eles podem ser lidos e usados como escritos humanos — úteis para conhecer a história do período intertestamentário —, mas não têm autoridade na Igreja.⁵',
    notas: [5],
  },
  {
    num: '2.6',
    resposta: 'Segundo o §4, a autoridade da Escritura depende "somente de Deus (a mesma verdade), que é o seu autor". Ela não pode depender da Igreja porque a Igreja é criada pela Palavra, e não a Palavra pela Igreja (Ef 2.20 — a Igreja é edificada sobre o fundamento dos apóstolos e profetas). Se a autoridade da Bíblia dependesse da Igreja, a Igreja estaria acima da Bíblia — exatamente a posição romana que a Reforma rejeitou. Calvino observa que a Escritura se autentica a si mesma (autopistos), como a luz se distingue das trevas.⁶',
    notas: [6],
  },
  {
    num: '2.7',
    resposta: 'O §5 distingue dois níveis. As evidências — o testemunho da Igreja, a excelência do conteúdo, a eficácia da doutrina, a majestade do estilo, a harmonia das partes, o propósito de dar glória a Deus — são reais e "abundantemente" mostram que a Bíblia é Palavra de Deus. Mas o coração humano, por causa do pecado, resiste a elas (1Co 2.14). A "plena persuasão e certeza" exige que o próprio Espírito que inspirou a Escritura testifique, "pela Palavra e com a Palavra", no coração do leitor (1Jo 2.20, 27). O Espírito não traz uma informação nova ao lado da Bíblia; ele nos faz reconhecer a voz de Deus na própria Bíblia.⁷',
    notas: [7],
  },
];

const NOTAS_RODAPE_ENC2 = [
  { num: 1, ref: 'BAVINCK, Herman. Dogmática Reformada. São Paulo: Cultura Cristã, 2012. v. 1. (Revelação geral e especial).' },
  { num: 2, ref: 'SHAW, Robert. An Exposition of the Westminster Confession of Faith. Fearn: Christian Focus, 1998. Comentário a I.1.' },
  { num: 3, ref: 'VAN DIXHOORN, Chad. Confessing the Faith. Edinburgh: Banner of Truth, 2014. Comentário a I.1.' },
  { num: 4, ref: 'WARFIELD, Benjamin B. The Westminster Assembly and Its Work. New York: Oxford University Press, 1931. Cap. "The Westminster Doctrine of Holy Scripture".' },
  { num: 5, ref: 'BRUCE, F. F. O Cânon das Escrituras. São Paulo: Hagnos, 2011. (Os apócrifos e o cânon hebraico).' },
  { num: 6, ref: 'CALVINO, João. Institutas da Religião Cristã. São Paulo: UNESP, 2008. I.7.1–2. (A Escritura não recebe autoridade da Igreja).' },
  { num: 7, ref: 'CALVINO, João. Institutas da Religião Cristã. São Paulo: UNESP, 2008. I.7.4–5; I.8. (Testimonium Spiritus Sancti internum e as evidências da Escritura).' },
];

const GABARITO_ENC3: { num: string; resposta: string; notas?: number[] }[] = [
  {
    num: '3.1',
    resposta: '"Boa e necessária consequência" é a conclusão que decorre de forma lógica e inevitável daquilo que a Escritura afirma. Westminster ensina que o que é assim deduzido tem a mesma autoridade do que é dito explicitamente. Jesus usa esse método em Mt 22.29–32: os saduceus negavam a ressurreição; Jesus cita Êx 3.6 ("Eu sou o Deus de Abraão...") e conclui que Deus "não é Deus de mortos, mas de vivos". O texto não diz literalmente "haverá ressurreição", mas a conclusão é necessária. Doutrinas como a Trindade e o batismo de crianças (na leitura presbiteriana) são sustentadas dessa forma.¹',
    notas: [1],
  },
  {
    num: '3.2',
    resposta: 'A inspiração foi a obra única do Espírito sobre os autores bíblicos, produzindo um texto que é Palavra de Deus — obra concluída. A iluminação é a obra contínua do Espírito sobre os leitores, abrindo o entendimento para compreender e receber de modo salvador o que já está revelado (1Co 2.9–12; Ef 1.17–18). A iluminação não acrescenta conteúdo novo à Escritura — por isso não contradiz a suficiência. Ela explica por que duas pessoas podem ler o mesmo texto e só uma crer: a diferença não está no texto, mas na obra do Espírito.²',
    notas: [2],
  },
  {
    num: '3.3',
    resposta: 'As circunstâncias são aspectos práticos "comuns às ações e sociedades humanas" — horário e local do culto, duração, ordem das partes, organização de reuniões — que a Escritura não detalha e que devem ser decididos "pela luz da natureza e pela prudência cristã, segundo as regras gerais da Palavra" (como "tudo seja feito com decência e ordem", 1Co 14.40). O princípio regulador do culto (CFW XXI.1) afirma que os elementos do culto — o que se faz para adorar a Deus — devem ser ordenados por Deus. O §6 completa o quadro: a Igreja não pode inventar elementos, mas tem liberdade (e responsabilidade) para organizar as circunstâncias.³',
    notas: [3],
  },
  {
    num: '3.4',
    resposta: 'Gálatas 1.8–9 mostra que o evangelho entregue pelos apóstolos é final e não pode ser alterado nem mesmo por um anjo do céu — quem pregar outro evangelho é ἀνάθεμα (maldito). Paulo repete a maldição para enfatizar que não há exceção. Isso sustenta a afirmação do §6 de que "à Escritura nada se acrescentará em tempo algum, nem por novas revelações do Espírito, nem por tradições dos homens". A linguagem forte mostra que alterar o evangelho não é uma simples diferença de opinião: está em jogo a salvação.⁴',
    notas: [4],
  },
  {
    num: '3.5',
    resposta: 'Não. O §7 reconhece honestamente que "não são todas as coisas igualmente claras em si, nem do mesmo modo evidentes a todos" (cf. 2Pe 3.16). O que ele afirma é que as coisas "necessárias para a salvação" estão tão claramente expostas em algum lugar da Escritura que "não só os doutos, mas ainda os indoutos", usando os "meios ordinários" (leitura, pregação, oração, estudo), podem entendê-las suficientemente. A clareza não dispensa esforço nem mestres; dispensa um magistério infalível como condição para entender o caminho da salvação.⁵',
    notas: [5],
  },
  {
    num: '3.6',
    resposta: 'Os textos hebraico e grego são os que foram "inspirados imediatamente por Deus" e, pela providência, "conservados puros"; por isso são "autênticos" e funcionam como "supremo tribunal" nas controvérsias — nenhuma tradução (nem a Vulgata latina, declarada autêntica por Trento) pode ocupar esse lugar. Ao mesmo tempo, todo o povo de Deus "tem direito e interesse nas Escrituras" e deve lê-las; por isso elas precisam ser traduzidas nas línguas de todas as nações, para que a Palavra habite ricamente em todos (Cl 3.16) e o povo adore a Deus de modo aceitável.⁶',
    notas: [6],
  },
  {
    num: '3.7',
    resposta: 'O sentido "não é múltiplo, mas único" rejeita a interpretação medieval em quatro sentidos (literal, alegórico, moral e anagógico), que permitia extrair do texto significados arbitrários. Cada texto tem um sentido verdadeiro, determinado pela intenção de Deus expressa nas palavras — o que não exclui aplicações variadas nem o cumprimento tipológico. Aplicação: Tiago 2.24 ("o homem é justificado pelas obras") deve ser lido à luz de textos mais claros sobre a justificação, como Rm 3.28 e Gl 2.16. Tiago trata da fé verdadeira que se demonstra pelas obras; Paulo, da base da justificação diante de Deus. Os textos se harmonizam.⁷',
    notas: [7],
  },
  {
    num: '3.8',
    resposta: 'O Juiz Supremo é "o Espírito Santo falando na Escritura". Ficam subordinados a ele: os decretos dos concílios (que podem errar, CFW XXXI.4), as opiniões dos escritores antigos (os pais da Igreja), as doutrinas dos homens (incluindo as nossas e as dos nossos mestres) e os "espíritos particulares" (supostas revelações pessoais). A fórmula une Espírito e Palavra: ela rejeita tanto a autoridade final da Igreja (Roma) quanto o apelo a um Espírito separado da Escritura (os "entusiastas"). Note que a própria Confissão está entre as "doutrinas de homens" sujeitas a esse Juiz.⁸',
    notas: [8],
  },
];

const NOTAS_RODAPE_ENC3 = [
  { num: 1, ref: 'VAN DIXHOORN, Chad. Confessing the Faith. Edinburgh: Banner of Truth, 2014. Comentário a I.6.' },
  { num: 2, ref: 'SHAW, Robert. An Exposition of the Westminster Confession of Faith. Fearn: Christian Focus, 1998. Comentário a I.6.' },
  { num: 3, ref: 'LETHAM, Robert. The Westminster Assembly. Phillipsburg: P&R, 2009. (O culto e o princípio regulador).' },
  { num: 4, ref: 'SCHREINER, Thomas R. Galatians. Grand Rapids: Zondervan, 2010. (Comentário a Gl 1.8–9).' },
  { num: 5, ref: 'GRUDEM, Wayne. Teologia Sistemática. São Paulo: Vida Nova, 1999. (A clareza da Escritura).' },
  { num: 6, ref: 'MULLER, Richard A. Post-Reformation Reformed Dogmatics. 2. ed. Grand Rapids: Baker Academic, 2003. v. 2. (Texto original, autenticidade e traduções).' },
  { num: 7, ref: 'BERKHOF, Louis. Princípios de Interpretação Bíblica. São Paulo: Cultura Cristã, 2007. (Analogia da Escritura e sentido único).' },
  { num: 8, ref: 'WARFIELD, Benjamin B. The Westminster Assembly and Its Work. New York: Oxford University Press, 1931. Cap. "The Westminster Doctrine of Holy Scripture".' },
];

/* ─── gabarito ──────────────────────────────────────────────────────────── */

type GabaritoItem = { num: string; resposta: string; notas?: number[] };
type NotaRodape = { num: number; ref: string };

function GabaritoSection({
  cor, titulo, aviso, itens, notas, perguntas,
}: {
  cor: string;
  titulo: string;
  aviso: string;
  itens: GabaritoItem[];
  notas: NotaRodape[];
  perguntas: { num: string; texto: string; recurso?: { label: string; url: string } }[];
}) {
  const [open, setOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl overflow-hidden mt-6"
      style={{ border: `1px solid ${cor}30` }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-left transition-all"
        style={{ background: open ? `${cor}14` : `${cor}08` }}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">📋</span>
          <div>
            <p className="font-extrabold text-white text-base">{titulo}</p>
            <p className="text-sm mt-0.5 font-medium" style={{ color: `${cor}aa` }}>Respostas orientadoras</p>
          </div>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} style={{ color: cor }} className="text-lg">▾</motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 space-y-3">
              <p className="text-sm italic mb-5" style={{ color: `${cor}88` }}>{aviso}</p>

              {itens.map(item => (
                <motion.div key={item.num} layout className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cor}20` }}>
                  <button
                    onClick={() => setOpenItem(openItem === item.num ? null : item.num)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left"
                    style={{ background: openItem === item.num ? `${cor}14` : `${cor}07` }}
                  >
                    <span className="text-sm font-extrabold px-2.5 py-1 rounded-full mr-3 shrink-0" style={{ background: `${cor}28`, color: cor }}>
                      {item.num}
                    </span>
                    <span className="flex-1 text-white/95 text-sm md:text-base font-medium truncate pr-3">
                      {perguntas.find(p => p.num === item.num)?.texto}
                    </span>
                    <motion.span animate={{ rotate: openItem === item.num ? 180 : 0 }} style={{ color: `${cor}80` }} className="text-sm shrink-0">▾</motion.span>
                  </button>

                  <AnimatePresence>
                    {openItem === item.num && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-4"
                      >
                        <p
                          className="text-white/92 text-sm md:text-base leading-relaxed pt-4"
                          style={{ borderTop: `1px solid ${cor}18` }}
                          dangerouslySetInnerHTML={{
                            __html: item.resposta.replace(
                              /([¹²³⁴⁵⁶⁷⁸⁹⁰]+)/g,
                              `<span style="color:${cor};font-weight:700">$1</span>`
                            ),
                          }}
                        />
                        {item.notas && (
                          <div className="mt-3 pt-3 space-y-1" style={{ borderTop: `1px solid ${cor}12` }}>
                            {item.notas.map(n => {
                              const nota = notas.find(r => r.num === n);
                              return nota ? (
                                <p key={n} className="text-sm leading-relaxed" style={{ color: `${cor}99` }}>
                                  <sup style={{ color: cor }} className="font-bold mr-1">{n}</sup>
                                  {nota.ref}
                                </p>
                              ) : null;
                            })}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <div className="mt-4 pt-4 rounded-xl px-4 py-3" style={{ background: `${cor}07`, border: `1px solid ${cor}15` }}>
                <p className="text-sm font-extrabold uppercase tracking-widest mb-3" style={{ color: `${cor}99` }}>Notas de rodapé</p>
                <ol className="space-y-2 list-none">
                  {notas.map(n => (
                    <li key={n.num} className="text-sm leading-relaxed" style={{ color: '#ffffff80' }}>
                      <sup style={{ color: cor }} className="font-bold mr-1">{n.num}</sup>
                      {n.ref}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── chapter nav bar ───────────────────────────────────────────────────── */

function ChapterNav({ onPrev, onNext, compact }: { onPrev: () => void; onNext: () => void; compact?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-2 ${compact ? 'py-2 px-2' : 'py-4 px-0'}`}>
      <button
        onClick={onPrev}
        className="flex items-center gap-1.5 rounded-xl px-3 py-2 transition-all hover:scale-105 min-w-0"
        style={{ background: `${BLUE}0a`, border: `1px solid ${BLUE}20` }}
      >
        <motion.span animate={{ x: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ color: BLUE }} className="text-base shrink-0">←</motion.span>
        <div className="text-left min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider leading-none truncate" style={{ color: `${BLUE}70` }}>Voltar</p>
          <p className="text-xs text-white/55 mt-0.5 truncate">Capítulos</p>
        </div>
      </button>

      {/* chapter dots — show fewer on mobile */}
      <div className="flex items-center gap-1 overflow-hidden">
        {Array.from({ length: 33 }, (_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all ${i > 9 ? 'hidden md:block' : ''}`}
            style={{ width: i === 0 ? 16 : 5, height: 5, background: i === 0 ? BLUE : `${BLUE}28`, flexShrink: 0 }}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        className="flex items-center gap-1.5 rounded-xl px-3 py-2 transition-all hover:scale-105 min-w-0"
        style={{ background: `${BLUE}0a`, border: `1px solid ${BLUE}20` }}
      >
        <div className="text-right min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider leading-none truncate" style={{ color: `${BLUE}70` }}>Próximo</p>
          <p className="text-xs text-white/55 mt-0.5 truncate">Cap. II</p>
        </div>
        <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ color: BLUE }} className="text-base shrink-0">→</motion.span>
      </button>
    </div>
  );
}

/* ─── page ──────────────────────────────────────────────────────────────── */

export default function DiscipuladoWestminsterCap1Page() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<1 | 2 | 3>(1);
  const goBack = () => navigate('/discipulado/confessional/westminster');
  const goNext = () => navigate('/discipulado/confessional/westminster/cap2');

  return (
    <div className="min-h-screen flex flex-col" style={{ background: BG, color: '#e2e8f0' }}>
      <Navbar />

      {/* hero */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0c2340 60%, #0a1628 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ width: 3, height: 3, background: BLUE, top: `${10 + (i * 17) % 80}%`, left: `${(i * 13) % 100}%`, opacity: 0.25 }}
              animate={{ opacity: [0.15, 0.45, 0.15] }}
              transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-80"
            style={{ color: `${BLUE}99` }}
          >
            ← Confissão de Fé de Westminster
          </button>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: `${BLUE}22`, color: BLUE }}>
              Confissão de Westminster · 1646
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: '#ffffff10', color: '#ffffff70' }}>
              Capítulo I
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: '#ffffff10', color: '#ffffff70' }}>
              3 Partes
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black mb-3 text-white leading-tight">
            Da Escritura Sagrada
          </h1>
          <p className="text-white/80 text-base md:text-xl max-w-2xl leading-relaxed font-medium">
            Discipulado Confessional Reformado — Caderno do Aluno · Partes 1 a 3
          </p>

          <div className="mt-6 p-5 rounded-xl" style={{ background: `${BLUE}10`, border: `1px solid ${BLUE}30` }}>
            <p className="text-base text-white/85 leading-relaxed">
              <span style={{ color: BLUE }} className="font-bold">Como usar este material:</span> Leia a introdução, os textos-prova, os textos confessionais e o glossário — depois procure responder cada pergunta por conta própria. Caso tenha dúvidas, acesse a <span style={{ color: GREEN }} className="font-semibold">ajuda</span> disponível em cada pergunta. Ao final, além da aplicação, confira o <span style={{ color: GOLD }} className="font-semibold">gabarito</span> com as respostas orientadoras e as <span style={{ color: GOLD }} className="font-semibold">referências bibliográficas</span> para consulta posterior.
            </p>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="sticky top-0 z-20 px-3 py-3" style={{ background: '#080f22', borderBottom: '1px solid #ffffff12' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-2">
          {([1, 2, 3] as const).map(n => {
            const shortLabels = ['Parte 1', 'Parte 2', 'Parte 3'];
            const subLabels = ['A Assembleia', 'Autoridade §1–5', 'Suficiência §6–10'];
            const cors = [BLUE, GREEN, GOLD];
            const isActive = tab === n;
            return (
              <button
                key={n}
                onClick={() => setTab(n)}
                className="flex flex-col items-center justify-center gap-0.5 px-2 py-2.5 rounded-xl transition-all text-center"
                style={{
                  background: isActive ? `${cors[n - 1]}22` : '#ffffff08',
                  color: isActive ? cors[n - 1] : '#ffffff45',
                  border: `1px solid ${isActive ? cors[n - 1] + '55' : '#ffffff10'}`,
                }}
              >
                <span className="text-sm font-extrabold leading-none">{shortLabels[n - 1]}</span>
                <span className="text-[10px] leading-none mt-0.5 hidden sm:block" style={{ opacity: 0.7 }}>{subLabels[n - 1]}</span>
                {isActive && <span className="w-4 h-0.5 rounded-full mt-1" style={{ background: cors[n - 1] }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* top nav */}
      <div className="max-w-4xl mx-auto w-full px-4" style={{ borderBottom: '1px solid #ffffff08' }}>
        <ChapterNav onPrev={goBack} onNext={goNext} compact />
      </div>

      {/* content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-3 md:px-4 py-6 md:py-10">

        <AnimatePresence mode="wait">
          {tab === 1 && (
            <motion.div key="enc1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <EncontroSection
                enc={ENCONTRO1}
                textos={ENCONTRO1.textos}
                extra={{ titulo: 'A família de Westminster', conteudo: <FamiliaWestminster /> }}
              />
              <GabaritoSection
                cor={BLUE}
                titulo="Gabarito — Parte 1"
                aviso="As respostas abaixo são orientadoras, não exaustivas. A pergunta 1.8 admite apenas resposta pessoal."
                itens={GABARITO_ENC1}
                notas={NOTAS_RODAPE}
                perguntas={ENCONTRO1.perguntas}
              />
            </motion.div>
          )}

          {tab === 2 && (
            <motion.div key="enc2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <EncontroSection enc={ENCONTRO2} textos={ENCONTRO2.textos} confTexto={CONF_TEXT_1_5} />
              <GabaritoSection
                cor={GREEN}
                titulo="Gabarito — Parte 2"
                aviso="As respostas abaixo são orientadoras, não exaustivas."
                itens={GABARITO_ENC2}
                notas={NOTAS_RODAPE_ENC2}
                perguntas={ENCONTRO2.perguntas}
              />
            </motion.div>
          )}

          {tab === 3 && (
            <motion.div key="enc3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <EncontroSection enc={ENCONTRO3} textos={ENCONTRO3.textos} confTexto={CONF_TEXT_6_10} mostrarTabela />
              <GabaritoSection
                cor={GOLD}
                titulo="Gabarito — Parte 3"
                aviso="As respostas abaixo são orientadoras, não exaustivas."
                itens={GABARITO_ENC3}
                notas={NOTAS_RODAPE_ENC3}
                perguntas={ENCONTRO3.perguntas}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* references */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 rounded-2xl p-6"
          style={{ background: '#0b1530', border: '1px solid #ffffff12' }}
        >
          <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#ffffff50' }}>Referências Bibliográficas</h3>
          <ul className="space-y-2">
            {REFERENCIAS.map((r, i) => (
              <li key={i} className="text-white/55 text-sm leading-relaxed">
                <span className="text-white/80 font-semibold">{r.autores}.</span>{' '}
                <span className="italic">{r.titulo}</span>.{' '}
                {r.local}. {r.ano}.{r.vol ? ` ${r.vol}.` : ''}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* chapter navigation bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-2xl px-2"
          style={{ background: '#0b1530', border: '1px solid #ffffff0a' }}
        >
          <ChapterNav onPrev={goBack} onNext={goNext} />
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}
