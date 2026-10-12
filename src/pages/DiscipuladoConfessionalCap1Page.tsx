import { useState } from 'react';
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
const ORANGE = '#f97316';

/* ─── data ─────────────────────────────────────────────────────────────── */

const GABARITO_ENC1: { num: string; resposta: string; notas?: number[] }[] = [
  {
    num: '1.1',
    resposta: 'A Bíblia é a Palavra de Deus, mas sozinha ela exige interpretação. Toda comunidade que lê a Escritura inevitavelmente articula o que crê — a confissão torna essa articulação explícita, pública e responsável. Sem uma confissão formulada, cada geração recomeça do zero e fica vulnerável a desvios que o debate teológico já resolveu. A confissão não substitui a Bíblia; ela registra o que a Igreja entendeu dela, subordinada à Escritura como norma normata.¹',
    notas: [1],
  },
  {
    num: '1.2',
    resposta: '"Norma normans" (norma que normatiza) é a Escritura: sua autoridade é absoluta, originária e inderrogável, pois vem diretamente de Deus. "Norma normata" (norma normatizada) é a confissão: ela possui autoridade derivada, válida somente enquanto concordar com a Escritura e sujeita a correção por ela. Portanto, a confissão obedece à Bíblia; a Bíblia não obedece à confissão. Se houver conflito, a Escritura sempre prevalece.²',
    notas: [2],
  },
  {
    num: '1.3',
    resposta: 'A distinção é soteriológica, não eclesiológica. Os Batistas Gerais (General Baptists, c. 1612) seguiam Jacob Arminius e sustentavam que Cristo morreu por todos os seres humanos — expiação geral ou universal. Os Batistas Particulares (Particular Baptists, c. 1638) seguiam a soterologia calvinista e defendiam que Cristo morreu de modo eficaz e definitivo pelos eleitos — expiação particular ou definida. Ambos concordavam no batismo de crentes por imersão; divergiam na extensão da expiação.³',
    notas: [3],
  },
  {
    num: '1.4',
    resposta: 'As igrejas batistas de 1677 modelaram sua confissão sobre a de Westminster por três razões: (1) demonstrar que sua fé era ortodoxa e bíblica, refutando acusações de heresia dirigidas aos dissidentes; (2) mostrar concordância substancial com as igrejas reformadas e presbiterianas da Inglaterra, diferenciando-se apenas nos pontos de batismo e ecclesiologia; (3) beneficiar-se da precisão doutrinária de um documento já testado e amplamente reconhecido, adaptando-o onde necessário.⁴',
    notas: [4],
  },
  {
    num: '1.5',
    resposta: 'Judas escreve a cristãos que estão sendo infiltrados por falsos mestres (Jd 4). A expressão "fé que uma vez por todas foi entregue aos santos" (τῇ ἅπαξ παραδοθείσῃ τοῖς ἁγίοις πίστει) indica que o conteúdo da fé cristã foi transmitido de modo definitivo, completo e irrepetível — o que se chama technicamente de "depósito da fé" (παραθήκη, 2Tm 1.14). O ἅπαξ ("uma vez por todas") exclui revelações adicionais que pretendam alterar ou suplementar esse depósito.⁵',
    notas: [5],
  },
  {
    num: '1.6',
    resposta: 'A confissão funciona como guardrail doutrinário em pelo menos três frentes: (1) disciplina interna — define os limites do ensino aceitável na comunidade e oferece base para tratar desvios; (2) continuidade geracional — transmite o entendimento maduro da Escritura de uma geração para a seguinte, evitando que cada época repita os mesmos erros; (3) comunhão ecumênica — permite que igrejas distintas reconheçam umas às outras como igualmente comprometidas com a fé ortodoxa, sem depender apenas de acordos pessoais.⁶',
    notas: [6],
  },
  {
    num: '1.7',
    resposta: 'Uma Igreja que nunca formalizou sua doutrina está sujeita a: (a) personalismo pastoral — a teologia torna-se o que o pastor atual crê, sem freios institucionais; (b) deriva silenciosa — sem parâmetro escrito, pequenos desvios se acumulam imperceptivelmente ao longo de décadas; (c) divisão fácil — na ausência de um padrão comum, qualquer divergência torna-se irresolvível porque não há critério objetivo de apelação; (d) vulnerabilidade ao sectarismo — movimentos heterodoxos infiltram-se com mais facilidade quando não há doutrina explícita que sirva de contraste.⁷',
    notas: [7],
  },
  {
    num: '1.8',
    resposta: 'Resposta pessoal e congregacional — não há gabarito fechado. Os elementos a considerar: sua congregação usa alguma confissão formalmente (como norma de admissão de membros, ordenação ou ensino)? Ela é usada apenas simbolicamente, ou efetivamente orienta o ensino e a prática? Os membros a conhecem? O uso real é coerente com o que a confissão afirma? Este é o momento para auto-avaliação honesta: a confissão é norma viva ou documento decorativo?',
  },
];

const NOTAS_RODAPE = [
  { num: 1, ref: 'WALDRON, Samuel E. Uma exposição moderna da Confissão de Fé Batista de 1689. São Paulo: Fiel, 2014. p. 15–18.' },
  { num: 2, ref: 'MULLER, Richard A. Dictionary of Latin and Greek Theological Terms. 2. ed. Grand Rapids: Baker Academic, 2017. p. 214–215. Verbetes: norma normans; norma normata.' },
  { num: 3, ref: 'BEBBINGTON, David W. Baptists Through the Centuries: A History of a Global People. Waco: Baylor University Press, 2010. p. 22–27.' },
  { num: 4, ref: 'CONFISSÃO DE FÉ BATISTA DE LONDRES DE 1689. Tradução e notas de Pro Nobis. São Paulo: Pro Nobis, 2025. Prefácio histórico, p. 7–12.' },
  { num: 5, ref: 'MOUNCE, William D. Mounce\'s Complete Expository Dictionary of Old and New Testament Words. Grand Rapids: Zondervan, 2006. p. 283. Verbete: ἅπαξ.' },
  { num: 6, ref: 'BAVINCK, Herman. Dogmática Reformada. São Paulo: Cultura Cristã, 2012. v. 1, p. 56–62.' },
  { num: 7, ref: 'TRUEMAN, Carl R. The Creedal Imperative. Wheaton: Crossway, 2012. p. 47–72.' },
];

const GLOSSARIO_GERAL = [
  { termo: 'Confissão de Fé', def: 'Documento eclesiástico que articula sistematicamente as doutrinas centrais de uma tradição cristã, servindo como padrão subordinado de ensino e comunhão.' },
  { termo: 'Batistas Particulares', def: 'Batistas do século XVII que abraçaram a soterologia calvinista ("expiação particular"), distinguindo-se dos Batistas Gerais que defendiam expiação universal.' },
  { termo: 'Norma normans', def: 'A "norma que normatiza" — a Escritura Sagrada, autoridade absoluta e final sobre toda doutrina e prática.' },
  { termo: 'Norma normata', def: 'A "norma normatizada" — confissões e credos, que têm autoridade subordinada derivada e sujeita à Escritura.' },
];

const CONF_TEXT_1_5 = [
  {
    para: '§1',
    titulo: 'O que a Escritura é',
    texto: (<p className="italic">
      As Escrituras Sagradas são os livros do Antigo e do Novo Testamento, <strong style={{ color: GREEN }}>dados por inspiração de Deus</strong>, e são <strong style={{ color: GREEN }}>a regra de fé e vida</strong>. Os livros do Antigo Testamento são: Gênesis, Êxodo, Levítico, Números, Deuteronômio, Josué, Juízes, Rute, 1 Samuel, 2 Samuel, 1 Reis, 2 Reis, 1 Crônicas, 2 Crônicas, Esdras, Neemias, Ester, Jó, Salmos, Provérbios, Eclesiastes, Cantares, Isaías, Jeremias, Lamentações, Ezequiel, Daniel, Oseias, Joel, Amós, Obadias, Jonas, Miqueias, Naum, Habacuque, Sofonias, Ageu, Zacarias, Malaquias. Os do Novo Testamento: Mateus, Marcos, Lucas, João, Atos, Romanos, 1 Coríntios, 2 Coríntios, Gálatas, Efésios, Filipenses, Colossenses, 1 Tessalonicenses, 2 Tessalonicenses, 1 Timóteo, 2 Timóteo, Tito, Filemom, Hebreus, Tiago, 1 Pedro, 2 Pedro, 1 João, 2 João, 3 João, Judas e Apocalipse. Todos esses livros são dados por <strong style={{ color: GREEN }}>inspiração divina</strong>, e são a regra de fé e vida.
    </p>),
  },
  {
    para: '§2',
    titulo: 'Os apócrifos',
    texto: (<p className="italic">
      Os livros comumente chamados de <strong style={{ color: GREEN }}>apócrifos</strong>, <span style={{ color: ROSE, fontWeight: 600 }}>não sendo de inspiração divina, não fazem parte do cânon</span> ou regra das Escrituras, e portanto <span style={{ color: ROSE, fontWeight: 600 }}>não têm autoridade sobre a Igreja de Deus</span>, podendo ser usados <strong style={{ color: GREEN }}>somente como escritos humanos</strong>.
    </p>),
  },
  {
    para: '§3',
    titulo: 'A autoridade da Escritura',
    texto: (<p className="italic">
      A autoridade das Sagradas Escrituras, em razão da qual elas devem ser cridas, <span style={{ color: ROSE, fontWeight: 600 }}>não depende do testemunho de nenhum homem ou Igreja</span>, mas <strong style={{ color: GREEN }}>somente de Deus, seu Autor, que é a própria Verdade</strong>; portanto, devem ser recebidas porque são <strong style={{ color: GREEN }}>a Palavra de Deus</strong>.
    </p>),
  },
  {
    para: '§4',
    titulo: 'O testemunho interno do Espírito',
    texto: (<p className="italic">
      A majestade e a pureza do estilo, o consenso de todas as partes, o alcance do todo (que é dar toda a glória a Deus), a plena manifestação do único caminho de salvação do homem, e muitas outras excelências incomparáveis e toda a perfeição que nelas se encontra, constituem <strong style={{ color: GREEN }}>abundantes evidências</strong> de que são a Palavra de Deus; entretanto, o pleno reconhecimento e a certeza de que a Bíblia é a infalível Palavra de Deus e que possui autoridade divina, provêm <span style={{ color: ROSE, fontWeight: 600 }}>somente</span> da <strong style={{ color: GREEN }}>obra interior do Espírito Santo</strong> que, com a Palavra e pela Palavra, <strong style={{ color: GREEN }}>dá testemunho em nossos corações</strong>.
    </p>),
  },
  {
    para: '§5',
    titulo: 'O cânon e a Igreja',
    texto: (<p className="italic">
      Pode-se apontar como <span style={{ color: GREEN, fontWeight: 600 }}>razão adequada</span> para nosso reconhecimento e respeito para com as Sagradas Escrituras: o <strong style={{ color: GREEN }}>testemunho da Igreja de Deus</strong>. Mas a <strong style={{ color: GREEN }}>autoridade absoluta e infalível</strong> pela qual cremos e obedecemos à Escritura repousa inteiramente sobre o fato de que ela é <strong style={{ color: GREEN }}>a Palavra de Deus</strong> — <span style={{ color: ROSE, fontWeight: 600 }}>não sobre o testemunho humano da Igreja</span>.
    </p>),
  },
];

const CONF_TEXT_6_10 = [
  {
    para: '§6',
    titulo: 'A suficiência da Escritura',
    texto: (<p className="italic">
      <strong style={{ color: BLUE }}>O conselho completo de Deus</strong> acerca de tudo necessário para sua própria glória, para a salvação, a fé e a vida do homem, está <strong style={{ color: BLUE }}>expressamente declarado na Escritura</strong> ou dela pode ser deduzido por <span style={{ color: BLUE, fontWeight: 600 }}>boa e necessária consequência</span>. <span style={{ color: ROSE, fontWeight: 600 }}>Nada deve ser acrescentado à Escritura em nenhum tempo</span> — nem por novas revelações do Espírito, nem por tradições dos homens.
    </p>),
  },
  {
    para: '§7',
    titulo: 'A clareza da Escritura',
    texto: (<p className="italic">
      Nem todas as coisas contidas na Escritura são igualmente claras em si mesmas ou igualmente claras para todos. Entretanto, as coisas que precisam ser <strong style={{ color: BLUE }}>conhecidas, cridas e obedecidas para salvação</strong> são tão claramente expostas e explicadas em algum lugar da Escritura, que <span style={{ color: BLUE, fontWeight: 600 }}>não somente os eruditos, mas também os iletrados</span>, podem alcançar um <strong style={{ color: BLUE }}>entendimento suficiente</strong> delas pelo <span style={{ color: BLUE, fontWeight: 600 }}>uso regular dos meios</span>.
    </p>),
  },
  {
    para: '§8',
    titulo: 'A Escritura em língua vernácula',
    texto: (<p className="italic">
      O Antigo Testamento em hebraico e o Novo Testamento em grego, sendo <strong style={{ color: BLUE }}>imediatamente inspirados por Deus</strong> e, por sua <span style={{ color: BLUE, fontWeight: 600 }}>singular providência e cuidado, preservados puros em todos os tempos</span>, são, portanto, <strong style={{ color: BLUE }}>autênticos</strong>. Em todas as controvérsias religiosas, a Igreja deve fazer apelo à Escritura no original. Visto que nem todos têm acesso às <span style={{ color: BLUE, fontWeight: 600 }}>línguas originais</span>, têm elas o direito de ter as Escrituras traduzidas para a <strong style={{ color: BLUE }}>língua do povo de cada nação</strong>, a fim de que, com a Palavra de Deus habitando ricamente em todos, possam <strong style={{ color: BLUE }}>adorar a Deus de maneira aceitável</strong> e ter esperança por meio da paciência e da consolação das Escrituras.
    </p>),
  },
  {
    para: '§9',
    titulo: 'A Escritura interpreta a Escritura',
    texto: (<p className="italic">
      <strong style={{ color: BLUE }}>A regra infalível de interpretação da Escritura é a própria Escritura</strong>; portanto, quando há uma questão acerca do verdadeiro e pleno sentido de qualquer lugar das Escrituras (<span style={{ color: BLUE, fontWeight: 600 }}>o qual não é múltiplo, mas um só</span>), deve-se investigar e conhecer pelos <strong style={{ color: BLUE }}>outros lugares que tratam do mesmo assunto com mais clareza</strong>.
    </p>),
  },
  {
    para: '§10',
    titulo: 'O juiz supremo das controvérsias',
    texto: (<p className="italic">
      <strong style={{ color: BLUE }}>O juiz supremo</strong> pelo qual devem ser decididas todas as controvérsias religiosas, pelo qual devem ser examinados todos os <span style={{ color: ROSE, fontWeight: 600 }}>decretos de concílios, as opiniões de escritores antigos, as doutrinas dos homens e as revelações particulares</span>, e por cujo veredicto devemos nos render, é <strong style={{ color: BLUE }}>somente o Espírito Santo falando na Escritura</strong>.
    </p>),
  },
];

const ENCONTRO1 = {
  titulo: 'Encontro 1',
  subtitulo: 'Por que a Igreja confessa sua fé?',
  cor: GOLD,
  versiculo: 'Guardou o bom depósito por meio do Espírito Santo que habita em nós.',
  ref_versiculo: '2 Timóteo 1.14',
  memorizar: { texto: 'Amados, embora eu estivesse com muita diligência para vos escrever acerca da nossa comum salvação, foi-me necessário escrever-vos exortando-vos a batalhar ferrenhamente pela fé que uma vez por todas foi entregue aos santos.', ref: 'Judas 3' },
  textos: ['2Tm 2.2', 'Jd 3', 'At 17.11', '1Tm 3.16', 'Rm 10.9–10'],
  introducao: (<>
    <p>O Novo Testamento não conhece uma fé que não possa ser enunciada. Paulo exorta Timóteo a <strong style={{ color: GOLD }}>"guardar o bom depósito"</strong> (2Tm 1.14), Judas a <strong style={{ color: GOLD }}>"batalhar pela fé entregue aos santos"</strong> (Jd 3), os beréianos a examinar as Escrituras diariamente (At 17.11). <span style={{ color: GOLD, fontWeight: 700 }}>Confessar a fé não é opção devocional — é obrigação eclesial.</span></p>
    <p>A <strong style={{ color: GOLD }}>Confissão de Fé Batista de 1677/1689</strong> nasceu nesse contexto: igrejas batistas particulares na Inglaterra, <span style={{ color: ROSE, fontWeight: 600 }}>sob perseguição</span>, precisavam demonstrar que sua fé era <strong style={{ color: GOLD }}>ortodoxa e bíblica</strong>. Ao modelar sua confissão sobre a de <strong style={{ color: GOLD }}>Westminster (1646)</strong>, declararam continuidade com a grande tradição reformada — distinguindo-se apenas na <span style={{ color: GOLD + 'bb', fontWeight: 600 }}>eclesiologia e nos sacramentos</span>.</p>
  </>),
  perguntas: [
    { num: '1.1', texto: 'Por que a Igreja precisa de confissões de fé, se já tem a Bíblia?', recurso: { label: 'Por que somos confessionais — Ligonier PT', url: 'https://pt.ligonier.org/artigos/porque-somos-confessionais/' } },
    { num: '1.2', texto: 'O que significa dizer que a Escritura é "norma normans" e a confissão é "norma normata"?', recurso: { label: 'A relevância dos credos e confissões — Monergismo', url: 'https://monergismo.com/a-relevancia-dos-credos-e-confissoes-heber-carlos-de-campos/' } },
    { num: '1.3', texto: 'Qual a diferença entre um "Batista Geral" e um "Batista Particular" no século XVII?', recurso: { label: 'Confissões de Fé na História Batista — Monergismo', url: 'https://www.monergismo.com/textos/credos/confissao_fe_historia_batista.htm' } },
    { num: '1.4', texto: 'Por que as igrejas batistas de 1677 modelaram sua confissão sobre a de Westminster?', recurso: { label: 'Confissão Batista de Londres 1689 — Ligonier PT', url: 'https://pt.ligonier.org/recursos/credos-e-confiss%C3%B5es/a-confissao-de-fe-batista-de-londres-de-1689/' } },
    { num: '1.5', texto: 'Em Judas 3, o que significa "a fé que uma vez por todas foi entregue aos santos"?', recurso: { label: 'Por que batalhar pela fé — Ligonier PT', url: 'https://pt.ligonier.org/artigos/por-que-devemos-batalhar-pela-fe/' } },
    { num: '1.6', texto: 'Como a confissão protege a Igreja de desvios doutrinários ao longo das gerações?', recurso: { label: 'Sola Scriptura — Ligonier PT', url: 'https://pt.ligonier.org/artigos/sola-scriptura/' } },
    { num: '1.7', texto: 'Que perigo existe em uma Igreja que nunca formulou sua doutrina explicitamente?', recurso: { label: 'Sola Scriptura — Alderi Matos — Monergismo', url: 'https://www.monergismo.com/textos/cinco_solas/solascriptura_alderi.htm' } },
    { num: '1.8', texto: 'Como sua congregação local recebe e usa uma confissão de fé hoje?' },
  ],
  glossario: GLOSSARIO_GERAL,
};

const ENCONTRO2 = {
  titulo: 'Encontro 2',
  subtitulo: 'A necessidade e a autoridade da Escritura (§1–5)',
  cor: GREEN,
  versiculo: 'Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção, para a instrução na justiça.',
  ref_versiculo: '2 Timóteo 3.16–17',
  memorizar: { texto: 'Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção, para a instrução na justiça, para que o homem de Deus seja perfeito e perfeitamente instruído para toda boa obra.', ref: '2 Timóteo 3.16–17' },
  textos: ['Sl 19.1–3', 'Rm 1.19–21', 'Hb 1.1–2', '2Tm 3.15–17', '2Pe 1.19–21', '1Ts 2.13', '1Co 2.10–14'],
  introducao: (<>
    <p>A pergunta que o §1 responde não é "qual versão usar" — é <strong style={{ color: GREEN }}>"por que precisamos de uma Escritura?"</strong> A resposta começa com o que Deus já revelou pela criação (Sl 19.1–3; Rm 1.19–21) — e com o que essa <strong style={{ color: GREEN }}>revelação geral</strong> não pode fazer: <span style={{ color: ROSE, fontWeight: 600 }}>salvar</span>. A revelação geral diz que Deus existe e é grande; <span style={{ color: ROSE, fontWeight: 600 }}>não diz como ser reconciliado com ele</span>.</p>
    <p>Por isso Deus falou <em>"muitas vezes e de muitas maneiras"</em> pelos profetas, e <em>"nestes últimos dias"</em> pelo Filho (Hb 1.1–2). Essa fala foi <strong style={{ color: GREEN }}>inspirada</strong> — Deus soprou (<strong style={{ color: GREEN }}>θεόπνευστος</strong>, 2Tm 3.16) seu Espírito nos hagiógrafos, para que escrevessem não palavras humanas, mas <strong style={{ color: GREEN }}>a Palavra de Deus</strong> (2Pe 1.21; 1Ts 2.13).</p>
    <p>Os parágrafos §3–§5 tratam da <strong style={{ color: GREEN }}>autoridade</strong>: ela <span style={{ color: ROSE, fontWeight: 600 }}>não vem do papa, não vem de concílio, não vem de tradição</span>. <strong style={{ color: GREEN }}>Vem de Deus</strong> — e o Espírito Santo nos convence disso interiormente. <span style={{ color: GREEN, fontWeight: 600 }}>A Igreja pode atestar; não pode conferir.</span></p>
  </>),
  perguntas: [
    { num: '2.1', texto: 'Qual a diferença entre revelação geral e revelação especial? Dê exemplos bíblicos.', recurso: { label: 'A autorrevelação de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-autorrevelacao-de-deus/' } },
    { num: '2.2', texto: 'O que significa "inspiração verbal plenária"? Como §1 e 2Tm 3.16 sustentam essa doutrina?', recurso: { label: 'Inspirada por Deus — Monergismo', url: 'https://monergismo.com/inspirada-por-deus/' } },
    { num: '2.3', texto: 'Por que os apócrifos foram excluídos do cânon pela Confissão (§2)?', recurso: { label: 'Apócrifos: Analisando as Evidências — Monergismo', url: 'https://www.monergismo.com/textos/bibliologia/apocrifos_analisando_geisler.htm' } },
    { num: '2.4', texto: 'Segundo §3, de onde vem a autoridade da Escritura? Por que não pode vir da Igreja?', recurso: { label: 'A Bíblia — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-biblia/' } },
    { num: '2.5', texto: 'O que é o "testemunho interno do Espírito Santo" mencionado em §4? Como ele se relaciona com evidências racionais?', recurso: { label: 'Doutrina Reformada da Autoridade das Escrituras — Monergismo', url: 'https://www.monergismo.com/textos/bibliologia/autoridade_anglada.htm' } },
    { num: '2.6', texto: 'Leia 1Co 2.10–14. Como o homem natural recebe a Escritura? O que é necessário para que ela seja entendida como Palavra de Deus?', recurso: { label: 'O Espírito Santo na Interpretação Bíblica — Monergismo', url: 'https://www.monergismo.com/textos/hermeneuticas/interpretacao_moises.htm' } },
    { num: '2.7', texto: 'Por que §5 afirma que o testemunho da Igreja é "razão adequada" mas não "autoridade infalível"?', recurso: { label: 'O que significa Sola Scriptura — Ligonier PT', url: 'https://pt.ligonier.org/artigos/o-que-significa-sola-scriptura/' } },
  ],
  glossario: [
    { termo: 'Revelação Geral', def: 'A revelação de Deus a toda a humanidade por meio da criação, da consciência e da história — suficiente para inexcusabilidade (Rm 1.20), insuficiente para salvação.' },
    { termo: 'Inspiração', def: 'A operação do Espírito Santo nos hagiógrafos de modo que as Escrituras, escritas por homens, sejam genuinamente a Palavra de Deus — sem erros em tudo o que afirmam.' },
    { termo: 'Cânon', def: 'Lista oficial dos livros reconhecidos como inspirados — 39 (AT) + 27 (NT) = 66. A Igreja não criou o cânon; reconheceu o que Deus havia inspirado.' },
    { termo: 'Testemunho Interno do Espírito', def: 'Testimonium Spiritus Sancti internum — a obra subjetiva do Espírito convencendo o crente, no ato da leitura, de que a Escritura é realmente a Palavra de Deus.' },
  ],
};

const ENCONTRO3 = {
  titulo: 'Encontro 3',
  subtitulo: 'A suficiência, a clareza e a supremacia da Escritura (§6–10)',
  cor: BLUE,
  versiculo: 'A exposição das tuas palavras dá luz e dá entendimento aos simples.',
  ref_versiculo: 'Salmo 119.130',
  memorizar: { texto: 'A exposição das tuas palavras dá luz e dá entendimento aos simples.', ref: 'Salmo 119.130' },
  textos: ['Gl 1.8–9', '2Tm 3.17', 'Sl 119.130', 'At 15.13–18'],
  introducao: (<>
    <p>§6 é o parágrafo mais prático do capítulo: a Escritura contém <strong style={{ color: BLUE }}>"o conselho completo de Deus"</strong> para tudo necessário. Isso tem consequências duplas. <strong style={{ color: BLUE }}>Positiva:</strong> a Escritura é <strong style={{ color: BLUE }}>suficiente</strong> — não precisa ser completada por revelação posterior nem por tradição eclesiástica. <span style={{ color: ROSE, fontWeight: 600 }}>Negativa:</span> o que não está na Escritura (expresso ou por dedução necessária) <span style={{ color: ROSE, fontWeight: 600 }}>não pode ser imposto como artigo de fé</span>.</p>
    <p>O <strong style={{ color: BLUE }}>princípio regulador do culto</strong> (§6, último parágrafo) decorre diretamente disso: se a Escritura é suficiente, então tudo que Deus quer no culto já está nela. <span style={{ color: ROSE, fontWeight: 600 }}>Acrescentar elementos inventados por homens é infração à suficiência</span> — é o que Paulo chama de <em>"ordenamentos e ensinamentos humanos"</em> (Cl 2.22).</p>
    <p>§7 garante que a suficiência não produz elitismo: as verdades necessárias para a salvação são <strong style={{ color: BLUE }}>claras o suficiente para que qualquer pessoa possa compreendê-las</strong>. §9 dá a regra hermenêutica: <strong style={{ color: BLUE }}>a Escritura interpreta a Escritura</strong>. §10 encerra o capítulo com a declaração mais polemicamente reformada: <strong style={{ color: BLUE }}>o juiz supremo é o Espírito falando na Escritura</strong> — <span style={{ color: ROSE, fontWeight: 600 }}>não o papa, não o concílio, não o pastor</span>.</p>
  </>),
  perguntas: [
    { num: '3.1', texto: 'O que significa afirmar que a Escritura contém "o conselho completo de Deus" (§6)? Que implicações isso tem para as tradições e revelações pós-bíblicas?', recurso: { label: 'O que significa Sola Scriptura — Ligonier PT', url: 'https://pt.ligonier.org/artigos/o-que-significa-sola-scriptura/' } },
    { num: '3.2', texto: 'Qual é o "princípio regulador do culto" e como ele deriva da suficiência da Escritura?', recurso: { label: 'O princípio regulador do culto — Ligonier PT', url: 'https://pt.ligonier.org/artigos/o-que-e-o-principio-regulador-do-culto/' } },
    { num: '3.3', texto: 'O que Gálatas 1.8–9 acrescenta à doutrina da suficiência? Por que Paulo usa linguagem tão forte?', recurso: { label: 'Sola Scriptura — Alderi Matos — Monergismo', url: 'https://www.monergismo.com/textos/cinco_solas/solascriptura_alderi.htm' } },
    { num: '3.4', texto: 'A perspicuidade (§7) afirma que toda a Bíblia é igualmente clara? O que exatamente ela afirma?', recurso: { label: 'Teologia e a vida cotidiana (perspicuidade) — Ligonier PT', url: 'https://pt.ligonier.org/artigos/teologia-vida-cotidiana/' } },
    { num: '3.5', texto: 'Como §8 justifica a tradução da Bíblia para as línguas do povo? Que princípio teológico está em jogo?', recurso: { label: 'História da Tradução da Bíblia em Português — Monergismo', url: 'https://www.monergismo.com/textos/bibliologia/historia_bibliaportugues.htm' } },
    { num: '3.6', texto: '"A Escritura interpreta a Escritura" (§9). Aplique esse princípio a um texto difícil da Bíblia.', recurso: { label: 'Hermenêutica Reformada — Monergismo', url: 'https://www.monergismo.com/textos/hermeneuticas/hermeneutica_anglada.htm' } },
    { num: '3.7', texto: 'Por que §10 é controverso para católicos romanos e para carismáticos? O que cada grupo diria contra ele?', recurso: { label: 'Sola Scriptura — Ligonier PT', url: 'https://pt.ligonier.org/artigos/sola-scriptura/' } },
    { num: '3.8', texto: 'Como os três princípios — suficiência, clareza, supremacia — se relacionam entre si? São independentes ou derivados um do outro?', recurso: { label: 'A Autoridade Bíblica — Monergismo', url: 'https://www.monergismo.com/textos/bibliologia/autoridade_biblica.htm' } },
  ],
  glossario: [
    { termo: 'Suficiência', def: 'A doutrina de que a Escritura contém tudo que é necessário para a fé e a prática cristã. Nada pode ser adicionado como artigo obrigatório de fé.' },
    { termo: 'Perspicuidade', def: 'A clareza da Escritura nas coisas essenciais à salvação, de modo que qualquer pessoa alfabetizada possa entender o caminho da salvação.' },
    { termo: 'Analogia da Fé', def: 'O princípio hermenêutico de que passagens obscuras devem ser interpretadas à luz das claras, e que a Escritura forma um todo coerente e não contraditório.' },
    { termo: 'Princípio Regulador', def: 'A regra de que somente o que Deus ordena na Escritura deve ser parte do culto — distinto do princípio normativo (o que a Escritura não proíbe é permitido).' },
  ],
};

const REFERENCIAS = [
  { autores: 'BATISTAS PARTICULARES DE LONDRES', titulo: 'Confissão de Fé Batista de Londres (1677)', local: 'Londres', ano: '1677' },
  { autores: 'BAVINCK, Herman', titulo: 'Dogmática Reformada', local: 'São Paulo: Cultura Cristã', ano: '2012', vol: 'vol. 1' },
  { autores: 'BÍBLIA SAGRADA', titulo: 'Almeida Revista e Atualizada', local: 'Barueri: Sociedade Bíblica do Brasil', ano: '2009' },
  { autores: 'CONFISSÃO DE FÉ BATISTA DE LONDRES DE 1689', titulo: 'Tradução e notas de Pro Nobis', local: 'São Paulo: Pro Nobis', ano: '2025' },
  { autores: 'WALDRON, Samuel', titulo: 'Uma Exposição Moderna da Confissão de Fé Batista de 1689', local: 'São Paulo: Fiel', ano: '2014' },
];

/* ─── sub-components ────────────────────────────────────────────────────── */

function VersiculoBox({ texto, ref: r, cor }: { texto: string; ref: string; cor: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-xl p-5 mb-6"
      style={{ background: `${cor}12`, border: `1px solid ${cor}35`, borderLeft: `4px solid ${cor}` }}
    >
      <p className="text-lg leading-relaxed italic font-medium" style={{ color: cor }}>"{texto}"</p>
      <p className="mt-2 text-base font-semibold" style={{ color: `${cor}cc` }}>— {r}</p>
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
                <div className="text-white/90 leading-relaxed text-base pt-4 border-t" style={{ borderColor: `${cor}20` }}>{item.texto}</div>
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
            <p className="text-white/95 text-base leading-relaxed font-medium">{p.texto}</p>
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map(g => (
        <div key={g.termo} className="rounded-xl p-4" style={{ background: `${cor}0c`, border: `1px solid ${cor}28` }}>
          <p className="font-extrabold text-base mb-2" style={{ color: cor }}>{g.termo}</p>
          <p className="text-white/90 text-base leading-relaxed">{g.def}</p>
        </div>
      ))}
    </div>
  );
}

function MemorizarBox({ texto, ref: r, cor }: { texto: string; ref: string; cor: string }) {
  return (
    <div className="rounded-xl p-5 mt-4" style={{ background: `${cor}10`, border: `2px dashed ${cor}40` }}>
      <p className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: cor }}>✦ Versículo para memorizar</p>
      <p className="text-white/95 leading-relaxed italic text-lg font-medium">"{texto}"</p>
      <p className="mt-3 font-bold text-base" style={{ color: cor }}>— {r}</p>
    </div>
  );
}

function TextosProva({ items, cor }: { items: string[]; cor: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(t => (
        <a
          key={t}
          href={`https://www.biblegateway.com/passage/?search=${encodeURIComponent(t)}&version=ARA`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all hover:scale-105 hover:opacity-90"
          style={{ background: `${cor}18`, color: cor, border: `1px solid ${cor}40` }}
          title={`Abrir ${t} na Bíblia online (ARA)`}
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
    { elemento: 'Batismo', circ: 'Qual piscina, quando no culto' },
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

function EncontroSection({ enc, textos, confTexto, mostrarTabela }: {
  enc: typeof ENCONTRO1;
  textos?: string[];
  confTexto?: typeof CONF_TEXT_1_5;
  mostrarTabela?: boolean;
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
      <div className="px-6 pt-6 pb-4" style={{ borderBottom: `1px solid ${cor}22` }}>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: `${cor}22`, color: cor }}>{enc.titulo}</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">{enc.subtitulo}</h2>
        <p className="mt-2 text-base font-medium" style={{ color: `${cor}cc` }}>"{enc.versiculo}" — {enc.ref_versiculo}</p>
      </div>

      <div className="p-6 space-y-8">

        {/* introducao */}
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: cor }}>Introdução</h3>
          <div className="space-y-4 text-white/90 leading-relaxed text-base">{enc.introducao}</div>
        </div>

        {/* textos-prova */}
        {textos && (
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: cor }}>Textos-Prova</h3>
            <TextosProva items={textos} cor={cor} />
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

        {/* memorizar */}
        <MemorizarBox texto={enc.memorizar.texto} ref={enc.memorizar.ref} cor={cor} />

      </div>
    </motion.section>
  );
}

const GABARITO_ENC2: { num: string; resposta: string; notas?: number[] }[] = [
  {
    num: '2.1',
    resposta: 'Revelação geral é o conhecimento de Deus disponível a toda a humanidade por meio da criação (Sl 19.1–3), da consciência moral e da história. É suficiente para tornar os humanos inexcusáveis diante de Deus (Rm 1.20), mas insuficiente para revelar o caminho da salvação. Revelação especial é a comunicação direta e particular de Deus — por meio dos profetas, das Escrituras e supremamente em Jesus Cristo (Hb 1.1–2) — que torna conhecido o evangelho e a redenção.¹',
    notas: [1],
  },
  {
    num: '2.2',
    resposta: '"Inspiração verbal plenária" significa que o Espírito Santo superintendeu os hagiógrafos de modo que cada palavra (verbal) e todo o escopo da Escritura (plenária) sejam divinamente inspirados, sem erro no que afirmam. O §1 da Confissão afirma que todos os livros foram "dados por inspiração divina" e são "regra de fé e vida". 2Tm 3.16 usa θεόπνευστος (theopneustos) — literalmente "soprado por Deus" —, indicando que o produto (o texto) é de origem divina, não apenas os autores.²',
    notas: [2],
  },
  {
    num: '2.3',
    resposta: 'Os apócrifos (Tobias, Judite, 1–2 Macabeus, Sabedoria, Sirácides, Baruque) foram excluídos porque: (1) nunca foram reconhecidos pelos judeus como parte do cânon hebraico; (2) o próprio Jesus e os apóstolos nunca os citam como Escritura; (3) possuem inconsistências históricas e doutrinas não encontradas nas Escrituras canônicas (ex.: orações pelos mortos); (4) a Igreja primitiva oriental e a tradição reformada seguiram o cânon hebraico. O §2 afirma que os apócrifos "não sendo de inspiração divina, não fazem parte do cânon".³',
    notas: [3],
  },
  {
    num: '2.4',
    resposta: 'Segundo §3, a autoridade da Escritura vem "somente de Deus, seu Autor, que é a própria Verdade". Ela não pode vir da Igreja porque isso inverteria a relação: a Igreja é criada pela Palavra, não a Palavra pela Igreja. Se a Igreja conferisse autoridade à Escritura, ela seria superior à Bíblia — o que implicaria que suas decisões adicionais teriam igual ou maior peso. A Reforma corrigiu esse erro romano ao afirmar que a Igreja apenas reconhece (não cria) a autoridade da Escritura.⁴',
    notas: [4],
  },
  {
    num: '2.5',
    resposta: 'O testimonium Spiritus Sancti internum (testemunho interno do Espírito Santo) é a obra subjetiva do Espírito que convence o crente, no ato da leitura, de que a Escritura é genuinamente a Palavra de Deus. Ele não contradiz as evidências racionais (beleza literária, coerência interna, cumprimento profético, impacto histórico) — mencionadas no §4 como "abundantes evidências" —, mas vai além delas: produz uma certeza plena que nenhum argumento racional sozinho consegue gerar, pois o homem natural não recebe as coisas do Espírito de Deus (1Co 2.14).⁵',
    notas: [5],
  },
  {
    num: '2.6',
    resposta: '1Co 2.10–14 ensina que as verdades espirituais são escrutadas pelo Espírito e reveladas aos que o possuem. O "homem natural" (ψυχικὸς ἄνθρωπος) não as recebe porque lhe parecem loucura — ele não tem o instrumental hermenêutico necessário. Portanto, para que a Escritura seja entendida como Palavra de Deus é necessário que o Espírito Santo opere internamente no leitor, iluminando o entendimento e inclinando a vontade para receber a Palavra com fé. Isso não elimina o uso da razão, mas a situa em sua devida ordem: instrumentalmente subordinada à iluminação do Espírito.⁶',
    notas: [6],
  },
  {
    num: '2.7',
    resposta: 'O §5 distingue dois planos: o histórico-apologético e o teológico-normativo. Historicamente, o testemunho da Igreja — sua preservação, uso litúrgico e canon estabelecido — é "razão adequada" para dar crédito à Escritura; não é irracional crer com base nesse testemunho. Porém teologicamente, essa razão não é "autoridade infalível": a Igreja pode errar, e seu testemunho é humano. A autoridade infalível repousa inteiramente sobre o fato de a Escritura ser a Palavra do Deus infalível — o que o Espírito confirma internamente ao crente.⁷',
    notas: [7],
  },
];

const NOTAS_RODAPE_ENC2 = [
  { num: 1, ref: 'BAVINCK, Herman. Dogmática Reformada. São Paulo: Cultura Cristã, 2012. v. 1, p. 303–340. (Revelação geral e especial).' },
  { num: 2, ref: 'GRUDEM, Wayne. Teologia Sistemática. São Paulo: Vida Nova, 1999. p. 73–86. (Inspiração verbal plenária e inerrância).' },
  { num: 3, ref: 'BRUCE, F. F. O Cânon das Escrituras. São Paulo: Hagnos, 2011. p. 68–93. (Os apócrifos e o cânon hebraico).' },
  { num: 4, ref: 'CALVINO, João. Institutas da Religião Cristã. São Paulo: UNESP/Cultura Cristã, 2008. I.7.1–4. (A Escritura se autentifica; a Igreja não lhe confere autoridade).' },
  { num: 5, ref: 'CALVINO, João. Institutas da Religião Cristã. São Paulo: UNESP/Cultura Cristã, 2008. I.7.4–5. (Testimonium Spiritus Sancti internum).' },
  { num: 6, ref: 'FEE, Gordon D. The First Epistle to the Corinthians. Grand Rapids: Eerdmans, 1987. p. 103–115. (Comentário a 1Co 2.10–14).' },
  { num: 7, ref: 'WALDRON, Samuel E. Uma exposição moderna da Confissão de Fé Batista de 1689. São Paulo: Fiel, 2014. p. 25–30. (Autoridade da Escritura e testemunho da Igreja).' },
];

const GABARITO_ENC3: { num: string; resposta: string; notas?: number[] }[] = [
  {
    num: '3.1',
    resposta: 'Afirmar que a Escritura contém "o conselho completo de Deus" (§6, At 20.27) significa que tudo necessário para a salvação, para a fé e para a prática cristã está nela — expressamente declarado ou deduzido por boa e necessária consequência. As implicações são duplas: (1) nenhuma tradição eclesiástica, decreto conciliar ou revelação pós-apostólica pode ser imposto como artigo de fé se não tiver base escriturística; (2) nenhum novo "evangelho" — mesmo anunciado por um anjo (Gl 1.8) — pode suplementar o que foi entregue.¹',
    notas: [1],
  },
  {
    num: '3.2',
    resposta: 'O princípio regulador do culto (Regulative Principle of Worship) afirma que somente o que Deus ordenou na Escritura deve compor o culto público. Deriva diretamente da suficiência: se a Escritura é suficiente para ensinar toda boa obra (2Tm 3.17), então o que Deus quer no culto já foi revelado — acrescentar elementos humanos não prescritos é presumir que a Escritura é insuficiente. Difere do princípio normativo (usado por luteranos e anglicanos), que permite o que a Escritura não proíbe.²',
    notas: [2],
  },
  {
    num: '3.3',
    resposta: 'Gálatas 1.8–9 acrescenta a dimensão da irreversibilidade da suficiência: mesmo que um anjo do céu pregasse um evangelho diferente, deveria ser anátema (ἀνάθεμα). Paulo repete a maldição duas vezes para enfatizar: não há exceção nem por autoridade angelical. Isso implica que o evangelho entregue aos apóstolos é normativo e final — não está aberto a revisões. A linguagem forte revela que desvios do evangelho revelado não são meras diferenças de ênfase, mas apostasia em potencial.³',
    notas: [3],
  },
  {
    num: '3.4',
    resposta: 'A perspicuidade (§7) não afirma que toda a Bíblia é igualmente clara em todos os sentidos. Ela afirma especificamente que "as coisas que precisam ser conhecidas, cridas e obedecidas para salvação" são suficientemente claras para que qualquer pessoa — erudita ou iletrada — possa compreendê-las "pelo uso regular dos meios". Passagens difíceis existem (2Pe 3.16); a doutrina da perspicuidade não as nega — garante apenas que o caminho da salvação é acessível sem necessidade de magistério infalível ou esoterismo teológico.⁴',
    notas: [4],
  },
  {
    num: '3.5',
    resposta: 'O §8 justifica a tradução da Bíblia para as línguas vernáculas com base em dois princípios: (1) a Escritura é para todo o povo de Deus — "nem todos têm acesso às línguas originais" e "têm o direito de ter as Escrituras traduzidas"; (2) o objetivo é que "a Palavra de Deus habite ricamente em todos" (Cl 3.16). O princípio teológico subjacente é a suficiência da Escritura aliada à clareza: se a Bíblia é suficientemente clara para a salvação, ela precisa estar acessível em forma inteligível — o que exige tradução.⁵',
    notas: [5],
  },
  {
    num: '3.6',
    resposta: '"A Escritura interpreta a Escritura" (analogia fidei, §9) significa que o sentido correto de uma passagem difícil deve ser buscado em outras passagens mais claras que tratem do mesmo assunto. Aplicação prática: ao interpretar Romanos 9 (eleição), busca-se luz em João 6.37–44, Efésios 1.4–5, 2Timóteo 1.9; ao interpretar Tiago 2.24 ("o homem é justificado pelas obras"), busca-se harmonia com Romanos 3.28 — Tiago fala de evidência externa de fé viva, Paulo de base forense da justificação. O método evita provar doutrinas por textos isolados.⁶',
    notas: [6],
  },
  {
    num: '3.7',
    resposta: 'Para católicos romanos, §10 é controverso porque nega ao papa e aos concílios o papel de intérprete infalível da Escritura — o que a Igreja Católica afirma desde Trento (1546) e o Vaticano I (1870). Para carismáticos que enfatizam "revelação profética", §10 é controverso porque subordina toda revelação particular ao veredicto da Escritura — o que limita a autoridade de "palavras proféticas" modernas. Em ambos os casos, o ponto é o mesmo: o Espírito fala na Escritura, não além dela, não por autoridade institucional.⁷',
    notas: [7],
  },
  {
    num: '3.8',
    resposta: 'Os três princípios são logicamente interdependentes, não independentes. A suficiência (§6) afirma que a Escritura já contém tudo necessário — o que pressupõe que ela pode ser entendida (perspicuidade, §7). A perspicuidade afirma que a Escritura é clara o suficiente para ser lida diretamente — o que pressupõe que ela é a fonte final de autoridade, sem necessidade de magistério humano intermediário (supremacia, §10). A supremacia (§10) afirma que o Espírito fala na Escritura — o que pressupõe que a Escritura é suficiente e inteligível. Retirar um princípio desfaz os outros.⁸',
    notas: [8],
  },
];

const NOTAS_RODAPE_ENC3 = [
  { num: 1, ref: 'WALDRON, Samuel E. Uma exposição moderna da Confissão de Fé Batista de 1689. São Paulo: Fiel, 2014. p. 31–36. (Suficiência e o conselho completo de Deus).' },
  { num: 2, ref: 'CHAPELL, Bryan. Christ-Centered Worship: Letting the Gospel Shape Our Practice. Grand Rapids: Baker Academic, 2009. p. 83–101. (Princípio regulador do culto).' },
  { num: 3, ref: 'SCHREINER, Thomas R. Galatians. Grand Rapids: Zondervan, 2010. p. 82–89. (Comentário a Gl 1.8–9 e a irrevogabilidade do evangelho).' },
  { num: 4, ref: 'GRUDEM, Wayne. Teologia Sistemática. São Paulo: Vida Nova, 1999. p. 107–113. (A clareza da Escritura / perspicuidade).' },
  { num: 5, ref: 'BRUCE, F. F. A Bíblia e o Mundo Antigo. São Paulo: Vida, 2004. p. 156–172. (Tradução e acessibilidade das Escrituras).' },
  { num: 6, ref: 'BERKHOF, Louis. Princípios de Interpretação Bíblica. São Paulo: Cultura Cristã, 2007. p. 163–172. (Analogia da fé e regra hermenêutica).' },
  { num: 7, ref: 'SPROUL, R. C. Sola Scriptura: The Protestant Position on the Bible. Orlando: Reformation Trust, 2019. p. 43–68. (Escritura vs. magistério e revelação contínua).' },
  { num: 8, ref: 'BAVINCK, Herman. Dogmática Reformada. São Paulo: Cultura Cristã, 2012. v. 1, p. 549–570. (Suficiência, clareza e autoridade da Escritura como sistema coerente).' },
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
                    <span className="flex-1 text-white/95 text-base font-medium truncate pr-3">
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
                          className="text-white/92 text-base leading-relaxed pt-4"
                          style={{ borderTop: `1px solid ${cor}18` }}
                          dangerouslySetInnerHTML={{
                            __html: item.notas
                              ? item.notas.reduce(
                                  (html, n) => html.replace(
                                    new RegExp(`${n}(?=\\b)`),
                                    `<sup style="color:${cor};font-weight:700">${n}</sup>`
                                  ),
                                  item.resposta
                                )
                              : item.resposta,
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
    <div className={`flex items-center justify-between gap-3 ${compact ? 'py-3 px-4' : 'py-4 px-0'}`}>
      <button
        onClick={onPrev}
        className="group flex items-center gap-2 rounded-xl px-4 py-2 transition-all hover:scale-105"
        style={{ background: `${GOLD}0a`, border: `1px solid ${GOLD}20` }}
      >
        <motion.span
          animate={{ x: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ color: GOLD }}
          className="text-base"
        >←</motion.span>
        <div className="text-left hidden sm:block">
          <p className="text-xs font-bold uppercase tracking-wider leading-none" style={{ color: `${GOLD}70` }}>Anterior</p>
          <p className="text-xs text-white/60 mt-0.5">Credos e Confissões</p>
        </div>
        <span className="text-xs text-white/50 sm:hidden">Anterior</span>
      </button>

      {/* chapter dots */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: 18 }, (_, i) => (
          <div
            key={i}
            className="rounded-full transition-all"
            style={{
              width: i === 0 ? 20 : 6,
              height: 6,
              background: i === 0 ? GOLD : `${GOLD}28`,
            }}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        className="group flex items-center gap-2 rounded-xl px-4 py-2 transition-all hover:scale-105"
        style={{ background: `${GOLD}0a`, border: `1px solid ${GOLD}20` }}
      >
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold uppercase tracking-wider leading-none" style={{ color: `${GOLD}70` }}>Próximo</p>
          <p className="text-xs text-white/60 mt-0.5">Cap. II — Deus e a Trindade</p>
        </div>
        <span className="text-xs text-white/50 sm:hidden">Próximo</span>
        <motion.span
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ color: GOLD }}
          className="text-base"
        >→</motion.span>
      </button>
    </div>
  );
}

/* ─── page ──────────────────────────────────────────────────────────────── */

export default function DiscipuladoConfessionalCap1Page() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<1 | 2 | 3>(1);
  const goBack = () => navigate('/teologia/credos');
  const goNext = () => navigate('/discipulado/confessional/cap2');

  return (
    <div className="min-h-screen flex flex-col" style={{ background: BG, color: '#e2e8f0' }}>
      <Navbar />

      {/* hero */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f1e3a 60%, #0a1628 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ width: 3, height: 3, background: GOLD, top: `${10 + (i * 17) % 80}%`, left: `${(i * 13) % 100}%`, opacity: 0.25 }}
              animate={{ opacity: [0.15, 0.45, 0.15] }}
              transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-14">
          <button
            onClick={() => navigate('/teologia/credos')}
            className="flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-80"
            style={{ color: `${GOLD}99` }}
          >
            ← Voltar para Credos e Confissões
          </button>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: `${GOLD}22`, color: GOLD }}>
              Confissão Batista de 1689
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: '#ffffff10', color: '#ffffff70' }}>
              Capítulo I
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: '#ffffff10', color: '#ffffff70' }}>
              3 Encontros
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black mb-3 text-white leading-tight">
            Das Sagradas Escrituras
          </h1>
          <p className="text-white/80 text-xl max-w-2xl leading-relaxed font-medium">
            Discipulado Confessional — Caderno do Aluno · Encontros 1 a 3
          </p>

          <div className="mt-6 p-5 rounded-xl" style={{ background: `${GOLD}10`, border: `1px solid ${GOLD}30` }}>
            <p className="text-base text-white/85 leading-relaxed">
              <span style={{ color: GOLD }} className="font-bold">Como usar este material:</span> Leia a introdução, os textos-prova, os textos confessionais e o glossário — depois procure responder cada pergunta por conta própria. Caso tenha dúvidas, acesse a <span style={{ color: GREEN }} className="font-semibold">ajuda</span> disponível em cada pergunta. Ao final, confira o <span style={{ color: BLUE }} className="font-semibold">gabarito</span> com as respostas orientadoras e as <span style={{ color: BLUE }} className="font-semibold">referências bibliográficas</span> para consulta posterior.
            </p>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="sticky top-0 z-20 px-4 py-3" style={{ background: '#080f22', borderBottom: '1px solid #ffffff12' }}>
        <div className="max-w-4xl mx-auto flex gap-2 overflow-x-auto">
          {([1, 2, 3] as const).map(n => {
            const labels = ['Encontro 1 — Por que confessar?', 'Encontro 2 — Autoridade (§1–5)', 'Encontro 3 — Suficiência (§6–10)'];
            const cors = [GOLD, GREEN, BLUE];
            const isActive = tab === n;
            return (
              <button
                key={n}
                onClick={() => setTab(n)}
                className="shrink-0 px-4 py-2.5 rounded-xl text-base font-semibold transition-all"
                style={{
                  background: isActive ? `${cors[n - 1]}20` : 'transparent',
                  color: isActive ? cors[n - 1] : '#ffffff50',
                  border: `1px solid ${isActive ? cors[n - 1] + '50' : 'transparent'}`,
                }}
              >
                {labels[n - 1]}
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
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">

        <AnimatePresence mode="wait">
          {tab === 1 && (
            <motion.div key="enc1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <VersiculoBox texto={ENCONTRO1.versiculo} ref={ENCONTRO1.ref_versiculo} cor={GOLD} />
              <EncontroSection enc={ENCONTRO1} textos={ENCONTRO1.textos} />
              <GabaritoSection
                cor={GOLD}
                titulo="Gabarito — Encontro 1"
                aviso="As respostas abaixo são orientadoras, não exaustivas. A pergunta 1.8 admite apenas resposta pessoal."
                itens={GABARITO_ENC1}
                notas={NOTAS_RODAPE}
                perguntas={ENCONTRO1.perguntas}
              />
            </motion.div>
          )}

          {tab === 2 && (
            <motion.div key="enc2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <VersiculoBox texto={ENCONTRO2.versiculo} ref={ENCONTRO2.ref_versiculo} cor={GREEN} />
              <EncontroSection enc={ENCONTRO2} textos={ENCONTRO2.textos} confTexto={CONF_TEXT_1_5} />
              <GabaritoSection
                cor={GREEN}
                titulo="Gabarito — Encontro 2"
                aviso="As respostas abaixo são orientadoras, não exaustivas."
                itens={GABARITO_ENC2}
                notas={NOTAS_RODAPE_ENC2}
                perguntas={ENCONTRO2.perguntas}
              />
            </motion.div>
          )}

          {tab === 3 && (
            <motion.div key="enc3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <VersiculoBox texto={ENCONTRO3.versiculo} ref={ENCONTRO3.ref_versiculo} cor={BLUE} />
              <EncontroSection enc={ENCONTRO3} textos={ENCONTRO3.textos} confTexto={CONF_TEXT_6_10} mostrarTabela />
              <GabaritoSection
                cor={BLUE}
                titulo="Gabarito — Encontro 3"
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
