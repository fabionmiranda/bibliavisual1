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
    resposta: 'A afirmação "há um só Deus vivo e verdadeiro" rejeita três erros ao mesmo tempo: o politeísmo (muitos deuses), o ateísmo (nenhum Deus) e a idolatria (deuses "mortos" e falsos, feitos por mãos humanas). "Vivo" contrasta o Deus da Bíblia com os ídolos que "têm boca e não falam" (Sl 115.4–8); "verdadeiro" afirma que somente ele corresponde à realidade de Deus (Jr 10.10; Jo 17.3; 1Ts 1.9). O monoteísmo bíblico não é uma conclusão filosófica: é a confissão central de Israel no Shemá (Dt 6.4), reafirmada por Jesus (Mc 12.29) e pelos apóstolos (1Co 8.4–6).¹',
    notas: [1],
  },
  {
    num: '1.2',
    resposta: 'Dizer que Deus é "infinito em seu ser e perfeições" significa que ele não tem limites de nenhum tipo: nem de espaço (imensidade, onipresença), nem de tempo (eternidade), nem de conhecimento, poder ou bondade. Tudo o que Deus é, ele é sem medida. Por isso nenhuma criatura pode contê-lo (1Rs 8.27) e nenhuma mente pode compreendê-lo exaustivamente — daí a palavra "incompreensível" no mesmo parágrafo. Isso não significa que Deus seja desconhecido, mas que o conhecemos verdadeiramente, porém nunca totalmente (Rm 11.33).²',
    notas: [2],
  },
  {
    num: '1.3',
    resposta: 'Deus é "espírito puríssimo" (Jo 4.24): não é composto de matéria, não tem corpo, não ocupa espaço e não pode ser visto com olhos físicos (1Tm 1.17; 6.16). Por isso a Bíblia proíbe representá-lo por imagens (Dt 4.15–19; Êx 20.4). Quando a Escritura fala dos "olhos", das "mãos" ou do "braço" de Deus, usa linguagem figurada (antropomorfismos) para descrever suas ações de modo que possamos entender. A encarnação não contradiz isso: o Filho assumiu uma natureza humana real, mas a natureza divina continua sendo espírito.³',
    notas: [3],
  },
  {
    num: '1.4',
    resposta: '"Sem paixões" (impassibilidade) não quer dizer que Deus seja frio ou indiferente. Quer dizer que Deus não é afetado, alterado ou dominado por nada fora de si mesmo, como acontece conosco quando somos tomados por emoções que mudam nosso estado. O amor, a ira e a compaixão de Deus são perfeições estáveis do seu ser, não oscilações de humor provocadas pelas criaturas. Quando a Bíblia diz que Deus "se arrependeu" ou "se irou", descreve, em linguagem humana, a mudança na relação de Deus com as criaturas — que mudaram —, e não uma mudança no próprio Deus (Nm 23.19; Ml 3.6).⁴',
    notas: [4],
  },
  {
    num: '1.5',
    resposta: 'Imutabilidade é a perfeição pela qual Deus não muda em seu ser, em seus atributos, em seus propósitos nem em suas promessas (Ml 3.6; Tg 1.17; Hb 6.17–18). Ela é o fundamento da segurança do crente: se Deus pudesse mudar, suas promessas poderiam falhar. Malaquias liga as duas coisas: "Eu, o SENHOR, não mudo; por isso, vós, ó filhos de Jacó, não sois consumidos". A fidelidade de Deus às suas alianças repousa sobre a imutabilidade do seu ser.⁵',
    notas: [5],
  },
  {
    num: '1.6',
    resposta: 'Significa que Deus age livremente, sem ser obrigado por nada fora de si mesmo, e que todas as suas obras têm um objetivo último: a manifestação da sua própria glória (Ef 1.11; Pv 16.4; Rm 11.36). Isso não é egoísmo, como seria numa criatura, porque Deus é o bem supremo: a coisa mais justa e amorosa que ele pode fazer é revelar a si mesmo, que é a fonte de toda felicidade. O Breve Catecismo aplica isso a nós: "o fim principal do homem é glorificar a Deus e gozá-lo para sempre".⁶',
    notas: [6],
  },
  {
    num: '1.7',
    resposta: 'Resposta pessoal. Pontos para refletir: na oração, falo com Deus como alguém infinitamente maior que eu, ou como um "parceiro" que precisa de mim? Diante do sofrimento, descanso no fato de que Deus é imutável e livre, ou tento "convencê-lo" como se ele dependesse das minhas emoções? No culto, há reverência? Uma visão pequena de Deus produz uma fé frágil; uma visão bíblica de Deus produz adoração, humildade e confiança.',
  },
];

const NOTAS_RODAPE = [
  { num: 1, ref: 'BAVINCK, Herman. Dogmática Reformada. São Paulo: Cultura Cristã, 2012. v. 2. (A unidade de Deus).' },
  { num: 2, ref: 'CHARNOCK, Stephen. The Existence and Attributes of God. Grand Rapids: Baker Books, 1996. v. 1. (Discursos sobre a infinitude e a eternidade de Deus).' },
  { num: 3, ref: 'BERKHOF, Louis. Teologia Sistemática. Campinas: Luz para o Caminho, 2010. (A espiritualidade de Deus).' },
  { num: 4, ref: 'DOLEZAL, James E. All That Is in God. Grand Rapids: Reformation Heritage Books, 2017. (Impassibilidade e imutabilidade).' },
  { num: 5, ref: 'PINK, Arthur W. Os atributos de Deus. São Paulo: Cultura Cristã, 2001. (A imutabilidade de Deus).' },
  { num: 6, ref: 'VAN DIXHOORN, Chad. Confessing the Faith: A Reader\'s Guide to the Westminster Confession of Faith. Edinburgh: Banner of Truth, 2014. Comentário a II.1.' },
];

const CONF_TEXT_P1 = [
  {
    para: '§1a',
    titulo: 'Um só Deus, vivo e verdadeiro',
    texto: (<p className="italic">
      Há <strong style={{ color: BLUE }}>um só Deus vivo e verdadeiro</strong>, o qual é <strong style={{ color: BLUE }}>infinito em seu ser e perfeições</strong>, um <strong style={{ color: BLUE }}>espírito puríssimo</strong>, <span style={{ color: BLUE, fontWeight: 600 }}>invisível</span>, <span style={{ color: ROSE, fontWeight: 600 }}>sem corpo, membros ou paixões</span>;
    </p>),
  },
  {
    para: '§1b',
    titulo: 'As perfeições do seu ser',
    texto: (<p className="italic">
      é <strong style={{ color: BLUE }}>imutável, imenso, eterno, incompreensível, onipotente</strong>, <span style={{ color: BLUE, fontWeight: 600 }}>sapientíssimo, santíssimo</span>, <strong style={{ color: BLUE }}>absolutamente livre e absoluto</strong>;
    </p>),
  },
  {
    para: '§1c',
    titulo: 'Tudo segundo o conselho da sua vontade',
    texto: (<p className="italic">
      fazendo <strong style={{ color: BLUE }}>tudo segundo o conselho da sua própria vontade</strong>, que é <span style={{ color: BLUE, fontWeight: 600 }}>reta e imutável</span>, e <strong style={{ color: BLUE }}>para a sua própria glória</strong>;
    </p>),
  },
];

const CONF_TEXT_P2 = [
  {
    para: '§1d',
    titulo: 'Amor e justiça',
    texto: (<p className="italic">
      é <strong style={{ color: GREEN }}>cheio de amor</strong>, é <strong style={{ color: GREEN }}>gracioso, misericordioso, longânimo</strong>, muito bondoso e verdadeiro, <span style={{ color: GREEN, fontWeight: 600 }}>galardoador dos que o buscam</span> e, contudo, <span style={{ color: ROSE, fontWeight: 600 }}>justíssimo e terrível em seus juízos</span>, pois <span style={{ color: ROSE, fontWeight: 600 }}>odeia todo o pecado</span>; de modo algum terá por inocente o culpado.
    </p>),
  },
  {
    para: '§2a',
    titulo: 'Todo-suficiente em si mesmo',
    texto: (<p className="italic">
      Deus tem <strong style={{ color: GREEN }}>em si mesmo, e de si mesmo, toda a vida, glória, bondade e bem-aventurança</strong>; ele é <strong style={{ color: GREEN }}>todo-suficiente em si e para si</strong>, pois <span style={{ color: ROSE, fontWeight: 600 }}>não precisa das criaturas que trouxe à existência</span>, não deriva delas glória alguma, mas <strong style={{ color: GREEN }}>somente manifesta a sua glória nelas, por elas, para elas e sobre elas</strong>.
    </p>),
  },
  {
    para: '§2b',
    titulo: 'Origem de todo o ser e Senhor soberano',
    texto: (<p className="italic">
      Ele é a <strong style={{ color: GREEN }}>única origem de todo o ser</strong>; <span style={{ color: GREEN, fontWeight: 600 }}>dele, por ele e para ele são todas as coisas</span>, e sobre elas tem ele <strong style={{ color: GREEN }}>soberano domínio</strong> para fazer com elas, para elas e sobre elas tudo quanto quiser.
    </p>),
  },
  {
    para: '§2c',
    titulo: 'Conhecimento infinito e santidade',
    texto: (<p className="italic">
      Todas as coisas estão <strong style={{ color: GREEN }}>patentes e manifestas diante dele</strong>; o seu saber é <strong style={{ color: GREEN }}>infinito, infalível e independente da criatura</strong>, de sorte que <span style={{ color: GREEN, fontWeight: 600 }}>para ele nada é contingente ou incerto</span>. Ele é <strong style={{ color: GREEN }}>santíssimo</strong> em todos os seus conselhos, em todas as suas obras e em todos os seus preceitos.
    </p>),
  },
  {
    para: '§2d',
    titulo: 'Digno de todo culto',
    texto: (<p className="italic">
      Da parte dos anjos e dos homens e de qualquer outra criatura <strong style={{ color: GREEN }}>lhe são devidos todo o culto, todo o serviço e obediência</strong> que ele há por bem requerer deles.
    </p>),
  },
];

const CONF_TEXT_P3 = [
  {
    para: '§3a',
    titulo: 'Três Pessoas, uma só substância',
    texto: (<p className="italic">
      Na <strong style={{ color: GOLD }}>unidade da Divindade</strong> há <strong style={{ color: GOLD }}>três Pessoas</strong> de <span style={{ color: GOLD, fontWeight: 600 }}>uma mesma substância, poder e eternidade</span> — <strong style={{ color: GOLD }}>Deus o Pai, Deus o Filho e Deus o Espírito Santo</strong>.
    </p>),
  },
  {
    para: '§3b',
    titulo: 'As relações eternas',
    texto: (<p className="italic">
      <strong style={{ color: GOLD }}>O Pai não é de ninguém</strong> — não é nem gerado, nem procedente; <strong style={{ color: GOLD }}>o Filho é eternamente gerado do Pai</strong>; <strong style={{ color: GOLD }}>o Espírito Santo é eternamente procedente do Pai e do Filho</strong>.
    </p>),
  },
];

const ENCONTRO1 = {
  titulo: 'Parte 1',
  subtitulo: 'O Deus único, vivo e verdadeiro — o seu ser (§1a–c)',
  cor: BLUE,
  versiculo: 'Ouve, Israel, o SENHOR, nosso Deus, é o único SENHOR.',
  ref_versiculo: 'Deuteronômio 6.4',
  aplicacao: (<>
    <p>A. W. Tozer escreveu que <em>"o que vem à nossa mente quando pensamos em Deus é a coisa mais importante a nosso respeito"</em>. O §1 corrige o <strong style={{ color: BLUE }}>Deus pequeno</strong> da religiosidade popular — um Deus que precisa de nós, que muda de ideia conforme as circunstâncias e que existe para atender nossos desejos. O Deus de Westminster é <strong style={{ color: BLUE }}>infinito, imutável, absolutamente livre</strong>, e faz tudo <strong style={{ color: BLUE }}>para a sua própria glória</strong>.</p>
    <p>Isso deve moldar a nossa <strong style={{ color: BLUE }}>adoração</strong>: reverência, temor e alegria diante de um Deus incompreensível (Hb 12.28–29). Deve moldar a nossa <strong style={{ color: BLUE }}>oração</strong>: não oramos para mudar o Deus imutável, mas porque ele mesmo ordenou a oração como meio para cumprir os seus propósitos. E deve moldar o nosso <strong style={{ color: BLUE }}>sofrimento</strong>: o Deus que não muda é o mesmo que prometeu nunca nos abandonar (Hb 13.5–8).</p>
    <p>Na prática: memorize a <strong style={{ color: BLUE }}>pergunta 4 do Breve Catecismo</strong> e use-a na oração diária, adorando a Deus atributo por atributo: <em>"Senhor, tu és espírito, infinito, eterno e imutável…"</em>.</p>
  </>),
  textos: ['Dt 6.4', 'Jr 10.10', '1Ts 1.9', 'Jo 4.24', '1Tm 1.17', 'Ml 3.6', '1Rs 8.27', 'Ef 1.11'],
  introducao: (<>
    <p>Depois de estabelecer <strong style={{ color: BLUE }}>como conhecemos</strong> (Cap. I — a Escritura), Westminster passa a <strong style={{ color: BLUE }}>quem conhecemos</strong>: Deus. O Capítulo II é curto — apenas três parágrafos —, mas é um dos textos mais densos de toda a Confissão. Cada palavra é uma <strong style={{ color: BLUE }}>perfeição divina</strong> extraída da Escritura.</p>
    <p>O §1 começa pela <strong style={{ color: BLUE }}>unidade</strong>: há <strong style={{ color: BLUE }}>um só Deus vivo e verdadeiro</strong> (Dt 6.4; 1Ts 1.9), em contraste com os ídolos. Em seguida descreve o seu <strong style={{ color: BLUE }}>ser</strong>: <strong style={{ color: BLUE }}>infinito</strong>, <strong style={{ color: BLUE }}>espírito puríssimo</strong> (Jo 4.24), <span style={{ color: ROSE, fontWeight: 600 }}>sem corpo, membros ou paixões</span> — ou seja, Deus não é uma criatura ampliada; ele é de outra ordem.</p>
    <p>A lista continua: <strong style={{ color: BLUE }}>imutável, imenso, eterno, incompreensível, onipotente, sapientíssimo, santíssimo, absolutamente livre e absoluto</strong>. E conclui com o propósito de tudo: Deus age <strong style={{ color: BLUE }}>segundo o conselho da sua própria vontade</strong> (Ef 1.11) e <strong style={{ color: BLUE }}>para a sua própria glória</strong> (Pv 16.4; Rm 11.36).</p>
  </>),
  perguntas: [
    { num: '1.1', texto: 'O que significa confessar que há "um só Deus vivo e verdadeiro"? Que erros essa afirmação rejeita?', recurso: { label: 'A existência de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-existencia-de-deus/' } },
    { num: '1.2', texto: 'O que significa dizer que Deus é "infinito em seu ser e perfeições"? Como isso se relaciona com a palavra "incompreensível"?', recurso: { label: 'A infinitude de Deus — Monergismo', url: 'https://www.monergismo.com/textos/atributos_deus/infinitude_deus.htm' } },
    { num: '1.3', texto: 'Deus é "espírito puríssimo, invisível, sem corpo, membros". Como entender, então, os textos que falam das "mãos" ou dos "olhos" de Deus?', recurso: { label: 'A natureza espiritual de Deus — Monergismo', url: 'https://monergismo.com/os-atributos-de-deus-a-w-pink/' } },
    { num: '1.4', texto: 'O que a Confissão quer dizer com "sem paixões"? Isso significa que Deus não ama nem se ira?' },
    { num: '1.5', texto: 'O que é a imutabilidade de Deus? Por que ela é importante para a segurança do crente (Ml 3.6)?', recurso: { label: 'A imutabilidade de Deus — Monergismo', url: 'https://monergismo.com/os-atributos-de-deus-a-w-pink/' } },
    { num: '1.6', texto: 'O que significa que Deus faz "tudo segundo o conselho da sua própria vontade" e "para a sua própria glória"? Isso é egoísmo?', recurso: { label: 'A soberania de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-soberania-de-deus/' } },
    { num: '1.7', texto: 'A sua visão de Deus é grande ou pequena? Como os atributos do §1 deveriam mudar sua oração e sua adoração?' },
  ],
  glossario: [
    { termo: 'Monoteísmo', def: 'A confissão de que existe um só Deus verdadeiro (Dt 6.4). O cristianismo é monoteísta: a Trindade não são três deuses, mas um só Deus em três Pessoas.' },
    { termo: 'Incompreensibilidade', def: 'Deus pode ser conhecido verdadeiramente, mas nunca de modo exaustivo. A mente finita não pode abarcar o ser infinito (Rm 11.33).' },
    { termo: 'Impassibilidade', def: '"Sem paixões": Deus não é alterado nem dominado por nada fora de si. Seus afetos (amor, ira) são perfeições estáveis, não oscilações de humor.' },
    { termo: 'Antropomorfismo', def: 'Linguagem que descreve Deus com termos humanos ("mão", "olhos", "arrependeu-se"), para que possamos compreender suas ações.' },
  ],
};

const ENCONTRO2 = {
  titulo: 'Parte 2',
  subtitulo: 'O caráter de Deus e a sua autossuficiência (§1d–2)',
  cor: GREEN,
  versiculo: 'Nem é servido por mãos humanas, como se de alguma coisa precisasse; pois ele mesmo é quem a todos dá vida, respiração e tudo mais.',
  ref_versiculo: 'Atos 17.25',
  aplicacao: (<>
    <p>O §1d nos protege de dois desvios. Um Deus só de <strong style={{ color: GREEN }}>amor</strong>, sem justiça, não leva o pecado a sério e torna a cruz desnecessária. Um Deus só de <span style={{ color: ROSE, fontWeight: 600 }}>justiça</span>, sem amor, nos deixa sem esperança. Na cruz, os dois se encontram: <strong style={{ color: GREEN }}>Deus é justo e justificador</strong> daquele que crê em Jesus (Rm 3.26).</p>
    <p>A <strong style={{ color: GREEN }}>autossuficiência de Deus</strong> (§2) muda a maneira como servimos. Deus <strong style={{ color: GREEN }}>não precisa</strong> do nosso culto, do nosso dinheiro ou do nosso trabalho (At 17.25). Isso nos liberta: não servimos para suprir uma carência de Deus, mas por <strong style={{ color: GREEN }}>gratidão e alegria</strong>. E nos humilha: o ministério nunca é um favor que fazemos a Deus.</p>
    <p>A <strong style={{ color: GREEN }}>onisciência</strong> e o <strong style={{ color: GREEN }}>domínio soberano</strong> trazem consolo: para Deus, <strong style={{ color: GREEN }}>nada é contingente ou incerto</strong>. O que nos surpreende não o surpreende. Por isso podemos lançar sobre ele toda a nossa ansiedade (1Pe 5.7).</p>
  </>),
  textos: ['Ex 34.6–7', 'Hb 11.6', 'Na 1.2–3', 'At 17.24–25', 'Rm 11.33–36', 'Hb 4.13', 'Is 6.3', 'Ap 4.11'],
  introducao: (<>
    <p>O final do §1 apresenta o <strong style={{ color: GREEN }}>caráter moral de Deus</strong> com palavras tiradas quase literalmente de <strong style={{ color: GREEN }}>Êxodo 34.6–7</strong>, quando o próprio Deus proclamou o seu nome a Moisés: <strong style={{ color: GREEN }}>amoroso, gracioso, misericordioso, longânimo</strong> — e, ao mesmo tempo, <span style={{ color: ROSE, fontWeight: 600 }}>justíssimo e terrível em seus juízos</span>, que <span style={{ color: ROSE, fontWeight: 600 }}>de modo algum terá por inocente o culpado</span>. Amor e justiça não competem em Deus: são perfeições do mesmo ser.</p>
    <p>O §2 trata da <strong style={{ color: GREEN }}>asseidade</strong> (do latim <em>a se</em>, "de si mesmo"): Deus tem vida, glória e felicidade <strong style={{ color: GREEN }}>em si mesmo</strong>. Ele <span style={{ color: ROSE, fontWeight: 600 }}>não precisa das criaturas</span>; criou o mundo não por carência, mas para <strong style={{ color: GREEN }}>manifestar</strong> a sua glória. Dele, por ele e para ele são todas as coisas (Rm 11.36).</p>
    <p>O parágrafo afirma ainda o <strong style={{ color: GREEN }}>domínio soberano</strong> de Deus sobre tudo, o seu <strong style={{ color: GREEN }}>conhecimento infinito e independente</strong> — para ele <strong style={{ color: GREEN }}>nada é contingente ou incerto</strong> (Hb 4.13) — e conclui com a consequência prática: a ele são devidos <strong style={{ color: GREEN }}>todo culto, serviço e obediência</strong> (Ap 4.11).</p>
  </>),
  perguntas: [
    { num: '2.1', texto: 'Compare o final do §1 com Êxodo 34.6–7. Como amor e justiça se harmonizam no caráter de Deus? Onde isso se vê com mais clareza?', recurso: { label: 'A santidade de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-santidade-de-deus/' } },
    { num: '2.2', texto: 'O que é a asseidade (autossuficiência) de Deus? O que significa dizer que ele "não precisa das criaturas" (At 17.25)?', recurso: { label: 'A aseidade de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-aseidade-de-deus/' } },
    { num: '2.3', texto: 'Se Deus não precisa de nada, por que criou o mundo? O que significa que ele "manifesta a sua glória nelas, por elas, para elas e sobre elas"?' },
    { num: '2.4', texto: 'O que significa que Deus tem "soberano domínio" para fazer com as criaturas "tudo quanto quiser"? Isso torna Deus arbitrário?', recurso: { label: 'A onipotência de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-onipotencia-de-deus/' } },
    { num: '2.5', texto: 'O que quer dizer que o saber de Deus é "independente da criatura" e que "para ele nada é contingente ou incerto"?', recurso: { label: 'A onisciência de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-onisciencia-de-deus/' } },
    { num: '2.6', texto: 'Qual a diferença entre atributos incomunicáveis e comunicáveis? Classifique os atributos citados nos §1–2.', recurso: { label: 'Os atributos de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/os-atributos-de-deus/' } },
    { num: '2.7', texto: 'Como a autossuficiência de Deus deveria mudar a maneira como servimos na igreja?', recurso: { label: 'Teologia da prosperidade — Ligonier PT', url: 'https://pt.ligonier.org/artigos/o-evangelho-da-prosperidade/' } },
  ],
  glossario: [
    { termo: 'Asseidade', def: 'Do latim a se ("de si mesmo"): Deus existe por si mesmo, tem vida em si mesmo e não depende de nada fora dele (Jo 5.26; At 17.25).' },
    { termo: 'Atributos Incomunicáveis', def: 'Perfeições que pertencem somente a Deus e não têm paralelo nas criaturas: asseidade, imutabilidade, infinitude, eternidade, imensidade.' },
    { termo: 'Atributos Comunicáveis', def: 'Perfeições que Deus reflete, em medida finita, nas criaturas feitas à sua imagem: bondade, amor, sabedoria, justiça, santidade, verdade.' },
    { termo: 'Contingente', def: 'Aquilo que poderia ou não acontecer, incerto. Para nós muitas coisas são contingentes; para Deus, nada é incerto (Hb 4.13).' },
  ],
};

const ENCONTRO3 = {
  titulo: 'Parte 3',
  subtitulo: 'A Santíssima Trindade — um só Deus em três Pessoas (§3)',
  cor: GOLD,
  versiculo: 'A graça do Senhor Jesus Cristo, e o amor de Deus, e a comunhão do Espírito Santo sejam com todos vós.',
  ref_versiculo: '2 Coríntios 13.13',
  aplicacao: (<>
    <p>A Trindade não é um enigma para especialistas: é <strong style={{ color: GOLD }}>o coração do evangelho</strong>. O <strong style={{ color: GOLD }}>Pai</strong> nos escolheu, o <strong style={{ color: GOLD }}>Filho</strong> nos redimiu, o <strong style={{ color: GOLD }}>Espírito</strong> nos aplica a salvação (Ef 1.3–14; 1Pe 1.2). Sem a Trindade não há Mediador que seja Deus, nem Espírito que nos regenere.</p>
    <p>A Trindade também molda a nossa <strong style={{ color: GOLD }}>vida cristã</strong>. Fomos <strong style={{ color: GOLD }}>batizados em um só nome</strong> — do Pai, do Filho e do Espírito Santo (Mt 28.19). Oramos <strong style={{ color: GOLD }}>ao Pai, por meio do Filho, no Espírito</strong> (Ef 2.18). E a comunhão da igreja reflete a comunhão eterna de amor entre as Pessoas divinas (Jo 17.21–23).</p>
    <p>Na prática: ao orar, tome consciência de <strong style={{ color: GOLD }}>com quem você fala</strong>. Agradeça ao Pai pela eleição, ao Filho pela cruz, ao Espírito pela nova vida. E cante com entendimento os hinos e doxologias trinitárias: <em>"Glória ao Pai, ao Filho e ao Santo Espírito"</em>.</p>
  </>),
  textos: ['Mt 28.19', '2Co 13.13', 'Mt 3.16–17', 'Jo 1.1–3', 'Jo 1.14', 'Jo 15.26', 'Gl 4.6', '1Pe 1.2'],
  introducao: (<>
    <p>O §3 é a confissão mais característica da fé cristã: <strong style={{ color: GOLD }}>na unidade da Divindade há três Pessoas</strong> — <strong style={{ color: GOLD }}>Pai, Filho e Espírito Santo</strong> — de <span style={{ color: GOLD, fontWeight: 600 }}>uma mesma substância, poder e eternidade</span>. Não são três deuses (<span style={{ color: ROSE, fontWeight: 600 }}>triteísmo</span>), nem três máscaras de uma só pessoa (<span style={{ color: ROSE, fontWeight: 600 }}>modalismo</span>), nem um Deus verdadeiro acompanhado de duas criaturas superiores (<span style={{ color: ROSE, fontWeight: 600 }}>arianismo</span>).</p>
    <p>A Escritura mostra as três Pessoas juntas no <strong style={{ color: GOLD }}>batismo de Jesus</strong> (Mt 3.16–17), na <strong style={{ color: GOLD }}>fórmula batismal</strong> (Mt 28.19 — um só "nome") e na <strong style={{ color: GOLD }}>bênção apostólica</strong> (2Co 13.13). Ao mesmo tempo, afirma que o Filho é Deus (Jo 1.1) e que o Espírito é Deus (At 5.3–4).</p>
    <p>A Confissão termina descrevendo as <strong style={{ color: GOLD }}>relações eternas</strong> que distinguem as Pessoas: o <strong style={{ color: GOLD }}>Pai não é de ninguém</strong>; o <strong style={{ color: GOLD }}>Filho é eternamente gerado</strong> do Pai; o <strong style={{ color: GOLD }}>Espírito procede eternamente do Pai e do Filho</strong> (Jo 15.26; Gl 4.6) — seguindo o Credo Niceno-Constantinopolitano na forma ocidental (<em>Filioque</em>).</p>
  </>),
  perguntas: [
    { num: '3.1', texto: 'Como explicar a Trindade em uma frase, sem cair em heresia? O que significa "uma mesma substância, poder e eternidade"?', recurso: { label: 'A doutrina da Trindade — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-doutrina-da-trindade/' } },
    { num: '3.2', texto: 'Quais textos do Novo Testamento mostram as três Pessoas juntas? Por que Mt 28.19 fala em "nome" (singular)?', recurso: { label: 'A Trindade no Novo Testamento — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-trindade/' } },
    { num: '3.3', texto: 'O que significam "geração eterna" do Filho e "processão eterna" do Espírito? Por que "eterna"?', recurso: { label: 'Relações eternas na Trindade — Monergismo', url: 'https://monergismo.com/a-doutrina-da-trindade-rc-sproul/' } },
    { num: '3.4', texto: 'O que é a cláusula Filioque ("e do Filho")? Que textos bíblicos a sustentam?' },
    { num: '3.5', texto: 'Identifique as principais heresias trinitárias (arianismo, modalismo, triteísmo). Qual delas aparece hoje com mais frequência?', recurso: { label: 'Heresias trinitárias — Monergismo', url: 'https://www.monergismo.com/textos/teologia_sistematica/trindade_berkhof.htm' } },
    { num: '3.6', texto: 'Se as três Pessoas têm "o mesmo poder e eternidade", como entender textos em que o Filho se submete ao Pai (Jo 14.28; 1Co 15.28)?', recurso: { label: 'Subordinação e Trindade — Ligonier PT', url: 'https://pt.ligonier.org/artigos/o-filho-eterno/' } },
    { num: '3.7', texto: 'Como a Trindade se manifesta na obra da salvação (Ef 1.3–14; 1Pe 1.2)?', recurso: { label: 'A Trindade e a salvação — Ligonier PT', url: 'https://pt.ligonier.org/artigos/trindade-salvacao/' } },
    { num: '3.8', texto: 'Que diferença prática a Trindade faz na oração, no culto e na comunhão da igreja?', recurso: { label: 'A unidade trinitária — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-trindade/' } },
  ],
  glossario: [
    { termo: 'Trindade', def: 'Um só Deus em três Pessoas distintas — Pai, Filho e Espírito Santo —, iguais em substância, poder e eternidade.' },
    { termo: 'Substância (essência)', def: 'Aquilo que Deus é. As três Pessoas possuem a mesma e única essência divina — o homoousios de Niceia (325).' },
    { termo: 'Geração Eterna', def: 'A relação eterna pela qual o Filho procede do Pai como Filho. Não tem começo: nunca houve um "tempo" em que o Filho não existisse.' },
    { termo: 'Filioque', def: '"E do Filho": a afirmação ocidental de que o Espírito procede do Pai e do Filho (Jo 15.26; 16.7; Gl 4.6), mantida pela Reforma.' },
  ],
};

const REFERENCIAS = [
  { autores: 'ASSEMBLEIA DE WESTMINSTER', titulo: 'Confissão de Fé de Westminster', local: 'Londres', ano: '1646' },
  { autores: 'BAVINCK, Herman', titulo: 'Dogmática Reformada', local: 'São Paulo: Cultura Cristã', ano: '2012', vol: 'v. 2' },
  { autores: 'BERKHOF, Louis', titulo: 'Teologia Sistemática', local: 'Campinas: Luz para o Caminho', ano: '2010' },
  { autores: 'BÍBLIA SAGRADA', titulo: 'Almeida Revista e Atualizada', local: 'Barueri: Sociedade Bíblica do Brasil', ano: '2009' },
  { autores: 'CHARNOCK, Stephen', titulo: 'The Existence and Attributes of God', local: 'Grand Rapids: Baker Books', ano: '1996', vol: 'v. 1' },
  { autores: 'DOLEZAL, James E.', titulo: 'All That Is in God', local: 'Grand Rapids: Reformation Heritage Books', ano: '2017' },
  { autores: 'LETHAM, Robert', titulo: 'The Holy Trinity: In Scripture, History, Theology, and Worship', local: 'Phillipsburg: P&R Publishing', ano: '2004' },
  { autores: 'PINK, Arthur W.', titulo: 'Os atributos de Deus', local: 'São Paulo: Cultura Cristã', ano: '2001' },
  { autores: 'SHAW, Robert', titulo: 'An Exposition of the Westminster Confession of Faith', local: 'Fearn: Christian Focus', ano: '1998' },
  { autores: 'VAN DIXHOORN, Chad', titulo: 'Confessing the Faith: A Reader\'s Guide to the Westminster Confession of Faith', local: 'Edinburgh: Banner of Truth', ano: '2014' },
];

/* ─── sub-components ────────────────────────────────────────────────────── */

const CATECISMO_P4 = [
  { palavra: 'espírito', cor: BLUE },
  { palavra: 'infinito', cor: BLUE },
  { palavra: 'eterno', cor: BLUE },
  { palavra: 'imutável', cor: BLUE },
];
const CATECISMO_P4_EM = ['ser', 'sabedoria', 'poder', 'santidade', 'justiça', 'bondade', 'verdade'];

function BreveCatecismoP4() {
  return (
    <div className="rounded-xl p-5" style={{ background: `${BLUE}0c`, border: `1px solid ${BLUE}30` }}>
      <p className="text-xs font-extrabold uppercase tracking-widest mb-2" style={{ color: `${BLUE}aa` }}>Breve Catecismo de Westminster · Pergunta 4</p>
      <p className="text-white font-bold text-base md:text-lg mb-1">Que é Deus?</p>
      <p className="text-white/90 text-base md:text-lg leading-relaxed italic">
        Deus é espírito, infinito, eterno e imutável em seu ser, sabedoria, poder, santidade, justiça, bondade e verdade.
      </p>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-3 sm:gap-5 items-start">
        <div className="flex flex-wrap sm:flex-col gap-2">
          {CATECISMO_P4.map(c => (
            <span key={c.palavra} className="px-3 py-1.5 rounded-lg text-sm font-extrabold text-center" style={{ background: `${c.cor}22`, color: c.cor, border: `1px solid ${c.cor}40` }}>
              {c.palavra}
            </span>
          ))}
        </div>
        <div>
          <p className="text-sm text-white/70 leading-relaxed mb-3">
            Os quatro primeiros termos qualificam <strong style={{ color: BLUE }}>cada uma</strong> das sete perfeições seguintes. Deus não é apenas sábio: é <em>infinita, eterna e imutavelmente</em> sábio.
          </p>
          <div className="flex flex-wrap gap-2">
            {CATECISMO_P4_EM.map(p => (
              <span key={p} className="px-3 py-1 rounded-full text-sm font-semibold" style={{ background: `${GREEN}14`, color: GREEN, border: `1px solid ${GREEN}35` }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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

function ConfTexto({ items, cor }: { items: typeof CONF_TEXT_P1; cor: string }) {
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

function TableAtributos({ cor }: { cor: string }) {
  const rows = [
    { incomunicavel: 'Aseidade (existência por si)', comunicavel: 'Bondade (compartilhada em medida finita)' },
    { incomunicavel: 'Imutabilidade (não muda)', comunicavel: 'Amor (participado pelas criaturas)' },
    { incomunicavel: 'Infinitude (sem limites)', comunicavel: 'Sabedoria (dada pela revelação)' },
    { incomunicavel: 'Eternidade (sem início/fim)', comunicavel: 'Justiça (refletida na lei moral)' },
    { incomunicavel: 'Onipresença (em todo lugar)', comunicavel: 'Santidade (imitada pela graça)' },
    { incomunicavel: 'Onipotência (todo-poderoso)', comunicavel: 'Misericórdia (expressa na redenção)' },
    { incomunicavel: 'Onisciência (conhece tudo)', comunicavel: 'Veracidade (praticada pelos fiéis)' },
  ];
  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-base rounded-xl overflow-hidden" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: `${cor}22` }}>
            <th className="px-4 py-3 text-left font-extrabold" style={{ color: cor }}>Atributos Incomunicáveis (exclusivos de Deus)</th>
            <th className="px-4 py-3 text-left font-extrabold" style={{ color: cor }}>Atributos Comunicáveis (compartilhados em medida finita)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? `${cor}09` : `${cor}04`, borderTop: `1px solid ${cor}18` }}>
              <td className="px-4 py-3 text-white/95 font-medium">{r.incomunicavel}</td>
              <td className="px-4 py-3 text-white/75">{r.comunicavel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableErrosTrinitarios({ cor }: { cor: string }) {
  const rows = [
    { heresia: 'Arianismo (Ário, séc. IV)', erro: 'O Filho foi criado pelo Pai — não é Deus por essência', condenacao: 'Niceia (325 d.C.) — homoousios' },
    { heresia: 'Modalismo (Sabélio, séc. III)', erro: 'Pai, Filho e Espírito são 3 modos de um único Deus sem distinção pessoal', condenacao: 'Concílios do séc. III' },
    { heresia: 'Triteísmo', erro: 'Três deuses distintos com essências separadas', condenacao: 'Contraria toda a Escritura — Dt 6.4' },
    { heresia: 'Subordinacionismo', erro: 'O Filho é ontologicamente inferior ao Pai em essência ou poder', condenacao: 'Niceia (325) e Constantinopla (381)' },
    { heresia: '"Jesus Only" (Pentecostalismo Unitário)', erro: 'Modalismo moderno — só Jesus é Deus, Pai e Espírito são nomes de Jesus', condenacao: 'Viola Mt 28.19 e toda a teologia bíblica' },
  ];
  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-sm rounded-xl overflow-hidden" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: `${cor}22` }}>
            <th className="px-3 py-3 text-left font-extrabold" style={{ color: cor }}>Heresia</th>
            <th className="px-3 py-3 text-left font-extrabold" style={{ color: cor }}>Erro central</th>
            <th className="px-3 py-3 text-left font-extrabold" style={{ color: cor }}>Condenação</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? `${cor}09` : `${cor}04`, borderTop: `1px solid ${cor}18` }}>
              <td className="px-3 py-3 text-white/95 font-semibold">{r.heresia}</td>
              <td className="px-3 py-3 text-white/75">{r.erro}</td>
              <td className="px-3 py-3" style={{ color: `${cor}99` }}>{r.condenacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── main encontro section ─────────────────────────────────────────────── */

function EncontroSection({ enc, textos, confTexto, mostrarTabelaAtributos, mostrarTabelaErros, extra }: {
  enc: typeof ENCONTRO1;
  textos?: string[];
  confTexto?: typeof CONF_TEXT_P1;
  mostrarTabelaAtributos?: boolean;
  mostrarTabelaErros?: boolean;
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

        {/* tabelas */}
        {mostrarTabelaAtributos && (
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest mb-3" style={{ color: cor }}>Atributos Incomunicáveis × Comunicáveis</h3>
            <TableAtributos cor={cor} />
          </div>
        )}

        {mostrarTabelaErros && (
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest mb-3" style={{ color: cor }}>Heresias Trinitárias</h3>
            <TableErrosTrinitarios cor={cor} />
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
    resposta: 'O final do §1 reproduz quase literalmente a autorrevelação de Deus em Êx 34.6–7: "SENHOR, SENHOR Deus compassivo, clemente e longânimo… que ao culpado não tem por inocente". Na mesma proclamação, Deus se revela misericordioso e justo. Os dois atributos não competem, porque Deus é simples: ele não é "parte amor e parte justiça", é inteiramente ambos. A harmonia aparece com mais clareza na cruz: Deus pune o pecado no Substituto e perdoa o pecador, sendo "justo e justificador daquele que tem fé em Jesus" (Rm 3.26).¹',
    notas: [1],
  },
  {
    num: '2.2',
    resposta: 'Asseidade (do latim a se, "de si mesmo") é a perfeição pela qual Deus existe por si mesmo e tem em si mesmo "toda a vida, glória, bondade e bem-aventurança". Ele não recebe a existência de nada, nem depende de nada para ser feliz ou glorioso. Jesus afirma que o Pai "tem vida em si mesmo" (Jo 5.26), e Paulo, em Atenas, diz que Deus não é servido por mãos humanas "como se de alguma coisa precisasse" (At 17.25). As criaturas são dependentes por natureza; só Deus é independente.²',
    notas: [2],
  },
  {
    num: '2.3',
    resposta: 'Deus não criou o mundo por carência, solidão ou necessidade — a comunhão perfeita entre o Pai, o Filho e o Espírito já existia desde a eternidade (Jo 17.5, 24). Ele criou livremente, para manifestar e comunicar a sua glória. A Confissão diz que Deus "não deriva delas glória alguma", isto é, as criaturas não acrescentam nada à glória que Deus já possui, "mas somente manifesta a sua glória nelas, por elas, para elas e sobre elas". A criação é como um espelho que reflete a glória de Deus, não uma fonte que lhe acrescenta algo (Sl 19.1; Ap 4.11).³',
    notas: [3],
  },
  {
    num: '2.4',
    resposta: 'Significa que Deus é o Senhor absoluto de tudo o que criou: por ser a origem de todo o ser ("dele, por ele e para ele são todas as coisas", Rm 11.36), tem pleno direito de dispor das criaturas (Dn 4.35; Sl 115.3). Mas isso não torna Deus arbitrário, porque a sua vontade nunca está separada da sua natureza: ele é "santíssimo em todos os seus conselhos", e a sua vontade é "reta" (§1). Deus faz tudo o que quer, e tudo o que ele quer é sábio, justo e bom.⁴',
    notas: [4],
  },
  {
    num: '2.5',
    resposta: 'O conhecimento de Deus é "independente da criatura" porque Deus não aprende observando o mundo: ele conhece todas as coisas conhecendo a si mesmo e o seu próprio decreto. Por isso, para Deus "nada é contingente ou incerto" — nem as ações livres dos homens (At 2.23; Is 46.9–10). Isso rejeita o "teísmo aberto", segundo o qual Deus não conheceria o futuro. Coisas que para nós parecem acaso (Pv 16.33) estão perfeitamente conhecidas e governadas por Deus (Hb 4.13).⁵',
    notas: [5],
  },
  {
    num: '2.6',
    resposta: 'Atributos incomunicáveis são os que pertencem somente a Deus e não têm paralelo nas criaturas; comunicáveis são os que Deus reflete, em medida finita, no ser humano feito à sua imagem. Nos §1–2: incomunicáveis — infinito, imutável, imenso, eterno, incompreensível, onipotente, absoluto, todo-suficiente (asseidade), único origem de todo ser. Comunicáveis — sapientíssimo, santíssimo, amor, graça, misericórdia, longanimidade, bondade, verdade, justiça. Observação: a distinção é didática; em Deus todos os atributos são infinitos, inclusive os comunicáveis. Nós somos bons; Deus é infinitamente bom.⁶',
    notas: [6],
  },
  {
    num: '2.7',
    resposta: 'Se Deus é todo-suficiente, então o serviço cristão nunca é um favor a Deus nem um modo de "comprar" bênçãos — o que desmonta a lógica da teologia da prosperidade ("dê para receber"). Servimos por gratidão, porque Deus primeiro nos deu tudo (At 17.25; Rm 11.35–36). Isso liberta o servo do orgulho (Deus não depende dele) e do desespero (a obra não depende dele). A pergunta muda de "o que Deus ganha comigo?" para "como posso manifestar a glória daquele que me deu tudo?".⁷',
    notas: [7],
  },
];

const NOTAS_RODAPE_ENC2 = [
  { num: 1, ref: 'BAVINCK, Herman. Dogmática Reformada. São Paulo: Cultura Cristã, 2012. v. 2. (Os atributos morais de Deus).' },
  { num: 2, ref: 'DOLEZAL, James E. All That Is in God. Grand Rapids: Reformation Heritage Books, 2017. (Asseidade e simplicidade divina).' },
  { num: 3, ref: 'SHAW, Robert. An Exposition of the Westminster Confession of Faith. Fearn: Christian Focus, 1998. Comentário a II.2.' },
  { num: 4, ref: 'PINK, Arthur W. Os atributos de Deus. São Paulo: Cultura Cristã, 2001. (A soberania de Deus).' },
  { num: 5, ref: 'CHARNOCK, Stephen. The Existence and Attributes of God. Grand Rapids: Baker Books, 1996. v. 1. (O conhecimento de Deus).' },
  { num: 6, ref: 'BERKHOF, Louis. Teologia Sistemática. Campinas: Luz para o Caminho, 2010. (Classificação dos atributos de Deus).' },
  { num: 7, ref: 'VAN DIXHOORN, Chad. Confessing the Faith. Edinburgh: Banner of Truth, 2014. Comentário a II.2.' },
];

const GABARITO_ENC3: { num: string; resposta: string; notas?: number[] }[] = [
  {
    num: '3.1',
    resposta: 'Uma formulação segura: "Há um só Deus, que existe eternamente em três Pessoas distintas — Pai, Filho e Espírito Santo —, e cada Pessoa é plenamente Deus". "Uma mesma substância" significa que as três Pessoas não compartilham partes de Deus, nem são três exemplares da mesma espécie: cada uma possui toda a única essência divina (o homoousios de Niceia). "Mesmo poder e eternidade" significa que nenhuma é mais forte, mais antiga ou mais divina que a outra. O que distingue as Pessoas não é a essência, mas as relações eternas entre elas.¹',
    notas: [1],
  },
  {
    num: '3.2',
    resposta: 'Textos principais: o batismo de Jesus (Mt 3.16–17 — o Filho é batizado, o Espírito desce, o Pai fala do céu); a Grande Comissão (Mt 28.19); a bênção apostólica (2Co 13.13); a obra da salvação (Ef 1.3–14; 1Pe 1.2; Tt 3.4–6). Em Mt 28.19 Jesus diz "em nome" (singular) "do Pai, e do Filho, e do Espírito Santo": um só nome, isto é, um só Deus, e três Pessoas distintas, cada uma com o artigo definido. É a forma mais compacta da doutrina da Trindade no NT.²',
    notas: [2],
  },
  {
    num: '3.3',
    resposta: 'Geração eterna é a relação pela qual o Filho procede do Pai como Filho; processão eterna é a relação pela qual o Espírito procede do Pai e do Filho como Espírito. São "eternas" porque não descrevem eventos no tempo, nem a origem do ser divino do Filho e do Espírito (que é a mesma essência do Pai), mas relações pessoais sem começo. Nunca houve um momento em que o Pai existisse sem o Filho ou sem o Espírito. Essas relações são o que distingue as Pessoas: o Pai é Pai porque gera; o Filho é Filho porque é gerado; o Espírito é Espírito porque procede (Jo 1.14, 18; 15.26).³',
    notas: [3],
  },
  {
    num: '3.4',
    resposta: 'Filioque ("e do Filho") é a expressão acrescentada no Ocidente (Concílio de Toledo, 589) ao Credo Niceno-Constantinopolitano, afirmando que o Espírito procede "do Pai e do Filho". A Igreja Oriental rejeitou o acréscimo, o que contribuiu para o Grande Cisma de 1054. Westminster mantém a posição ocidental. Base bíblica: o Espírito é chamado "Espírito de Cristo" e "Espírito do Filho" (Rm 8.9; Gl 4.6); é enviado tanto pelo Pai (Jo 14.26) quanto pelo Filho (Jo 15.26; 16.7). A missão temporal do Espírito reflete as suas relações eternas.⁴',
    notas: [4],
  },
  {
    num: '3.5',
    resposta: 'Arianismo: o Filho seria a primeira e mais elevada criatura, não Deus eterno — condenado em Niceia (325); hoje reaparece nas Testemunhas de Jeová. Modalismo (sabelianismo): o único Deus se manifestaria em três "modos" sucessivos (Pai, depois Filho, depois Espírito) — hoje presente no pentecostalismo unicista ("só Jesus") e em ilustrações populares como "água, gelo e vapor". Triteísmo: três deuses separados. O modalismo é provavelmente o erro mais frequente entre evangélicos, muitas vezes de modo inconsciente, em ilustrações e orações.⁵',
    notas: [5],
  },
  {
    num: '3.6',
    resposta: 'Esses textos devem ser lidos em duas chaves. (1) Natureza humana: o Filho encarnado, como homem, é menor que o Pai (Jo 14.28 — "o Pai é maior do que eu"). (2) Economia da salvação: na obra da redenção, o Filho assume voluntariamente o papel de Mediador enviado pelo Pai, e ao final entrega o Reino ao Pai (1Co 15.24–28). Nenhum dos textos ensina que o Filho seja inferior em essência, poder ou glória — o que contradiria Jo 1.1, Jo 10.30 e Fp 2.6. A Confissão protege isso ao afirmar "uma mesma substância, poder e eternidade".⁶',
    notas: [6],
  },
  {
    num: '3.7',
    resposta: 'As obras de Deus "para fora" (ad extra) são indivisas — as três Pessoas agem juntas —, mas cada Pessoa age segundo o seu modo próprio. Em Ef 1.3–14: o Pai nos escolheu e predestinou (v. 3–6); o Filho nos redimiu pelo seu sangue (v. 7–12); o Espírito nos selou como garantia da herança (v. 13–14). Em 1Pe 1.2: "eleitos segundo a presciência de Deus Pai, em santificação do Espírito, para a obediência e a aspersão do sangue de Jesus Cristo". A salvação é trinitária do começo ao fim, e cada bloco de Efésios termina com "para louvor da sua glória".⁷',
    notas: [7],
  },
  {
    num: '3.8',
    resposta: 'Na oração: oramos ao Pai, por meio do Filho, no Espírito (Ef 2.18) — a Trindade dá forma ao acesso que temos a Deus. No culto: cantamos e confessamos ao Deus trino; a bênção apostólica (2Co 13.13) é trinitária. Na comunhão: a unidade da igreja reflete a unidade do Pai e do Filho (Jo 17.21–23), uma unidade que não apaga as diferenças pessoais, assim como as Pessoas são distintas sem divisão. A Trindade mostra que o amor existe em Deus desde a eternidade — "Deus é amor" (1Jo 4.8) só faz pleno sentido se há, em Deus, quem ama e quem é amado.⁸',
    notas: [8],
  },
];

const NOTAS_RODAPE_ENC3 = [
  { num: 1, ref: 'LETHAM, Robert. The Holy Trinity: In Scripture, History, Theology, and Worship. Phillipsburg: P&R Publishing, 2004. (Niceia e o homoousios).' },
  { num: 2, ref: 'BAVINCK, Herman. Dogmática Reformada. São Paulo: Cultura Cristã, 2012. v. 2. (A Trindade na revelação do Novo Testamento).' },
  { num: 3, ref: 'BERKHOF, Louis. Teologia Sistemática. Campinas: Luz para o Caminho, 2010. (A geração eterna do Filho e a processão do Espírito).' },
  { num: 4, ref: 'LETHAM, Robert. The Holy Trinity. Phillipsburg: P&R Publishing, 2004. (A controvérsia do Filioque).' },
  { num: 5, ref: 'BERKHOF, Louis. Teologia Sistemática. Campinas: Luz para o Caminho, 2010. (A doutrina da Trindade na história).' },
  { num: 6, ref: 'SHAW, Robert. An Exposition of the Westminster Confession of Faith. Fearn: Christian Focus, 1998. Comentário a II.3.' },
  { num: 7, ref: 'VAN DIXHOORN, Chad. Confessing the Faith. Edinburgh: Banner of Truth, 2014. Comentário a II.3.' },
  { num: 8, ref: 'LETHAM, Robert. The Holy Trinity. Phillipsburg: P&R Publishing, 2004. (A Trindade, o culto e a oração).' },
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

function ChapterNav({ onPrev, compact }: { onPrev: () => void; compact?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-2 ${compact ? 'py-2 px-2' : 'py-4 px-0'}`}>
      <button
        onClick={onPrev}
        className="flex items-center gap-1.5 rounded-xl px-3 py-2 transition-all hover:scale-105 min-w-0"
        style={{ background: `${BLUE}0a`, border: `1px solid ${BLUE}20` }}
      >
        <motion.span animate={{ x: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ color: BLUE }} className="text-base shrink-0">←</motion.span>
        <div className="text-left min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider leading-none truncate" style={{ color: `${BLUE}70` }}>Anterior</p>
          <p className="text-xs text-white/55 mt-0.5 truncate">Cap. I</p>
        </div>
      </button>

      {/* chapter dots — show fewer on mobile */}
      <div className="flex items-center gap-1 overflow-hidden">
        {Array.from({ length: 33 }, (_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all ${i > 9 ? 'hidden md:block' : ''}`}
            style={{ width: i === 1 ? 16 : 5, height: 5, background: i <= 1 ? BLUE : `${BLUE}28`, flexShrink: 0 }}
          />
        ))}
      </div>

      <div
        className="flex items-center gap-1.5 rounded-xl px-3 py-2 min-w-0 opacity-50 cursor-default"
        style={{ background: '#ffffff06', border: '1px solid #ffffff12' }}
        title="Capítulo III em preparação"
      >
        <div className="text-right min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider leading-none truncate text-white/50">Cap. III</p>
          <p className="text-xs text-white/40 mt-0.5 truncate">Em breve</p>
        </div>
        <span className="text-base shrink-0 text-white/40">→</span>
      </div>
    </div>
  );
}

/* ─── page ──────────────────────────────────────────────────────────────── */

export default function DiscipuladoWestminsterCap2Page() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<1 | 2 | 3>(1);
  const goIndex = () => navigate('/discipulado/confessional/westminster');
  const goBack = () => navigate('/discipulado/confessional/westminster/cap1');

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
            onClick={goIndex}
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
              Capítulo II
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: '#ffffff10', color: '#ffffff70' }}>
              3 Partes
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black mb-3 text-white leading-tight">
            De Deus e da Santíssima Trindade
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
            const subLabels = ['O ser de Deus', 'Caráter §1d–2', 'A Trindade §3'];
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
        <ChapterNav onPrev={goBack} compact />
      </div>

      {/* content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-3 md:px-4 py-6 md:py-10">

        <AnimatePresence mode="wait">
          {tab === 1 && (
            <motion.div key="enc1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <EncontroSection
                enc={ENCONTRO1}
                textos={ENCONTRO1.textos}
                confTexto={CONF_TEXT_P1}
                extra={{ titulo: 'Resumo para memorizar', conteudo: <BreveCatecismoP4 /> }}
              />
              <GabaritoSection
                cor={BLUE}
                titulo="Gabarito — Parte 1"
                aviso="As respostas abaixo são orientadoras, não exaustivas. A pergunta 1.7 admite resposta pessoal."
                itens={GABARITO_ENC1}
                notas={NOTAS_RODAPE}
                perguntas={ENCONTRO1.perguntas}
              />
            </motion.div>
          )}

          {tab === 2 && (
            <motion.div key="enc2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <EncontroSection enc={ENCONTRO2} textos={ENCONTRO2.textos} confTexto={CONF_TEXT_P2} mostrarTabelaAtributos />
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
              <EncontroSection enc={ENCONTRO3} textos={ENCONTRO3.textos} confTexto={CONF_TEXT_P3} mostrarTabelaErros />
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
          <ChapterNav onPrev={goBack} />
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}
