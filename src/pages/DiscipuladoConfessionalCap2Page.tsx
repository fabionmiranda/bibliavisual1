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
    resposta: 'O monoteísmo bíblico afirma que existe apenas um Deus, único em essência, eterno, autossuficiente e criador de tudo. O politeísmo grego e romano postulava múltiplos deuses com naturezas limitadas e sujeitos a paixões humanas. O deísmo iluminista admite um único Deus criador, mas o afasta da criação após o ato criativo — negando providência, revelação e oração. O CFB §1 distingue-se dos três ao afirmar um Deus único, pessoal, providente e revelado.¹',
    notas: [1],
  },
  {
    num: '1.2',
    resposta: 'Deuteronômio 6.4 — "Ouve, ó Israel: o SENHOR nosso Deus é o único SENHOR" — é o Shemá, a confissão central do judaísmo. A palavra hebraica אֶחָד (echad) indica unidade, não meramente singularidade numérica. Paulo cita 1Co 8.4–6 para dizer que "nenhum ídolo existe no mundo" e que "há um só Deus, o Pai". Ambos os textos estabelecem que a unicidade divina é exclusiva e exige fidelidade absoluta — não há outros deuses com quem Deus compartilhe honra ou poder.²',
    notas: [2],
  },
  {
    num: '1.3',
    resposta: '"Espírito" (Jo 4.24) significa que Deus não possui corpo, partes físicas ou paixões humanas. Implicações: (1) Deus não pode ser representado por imagens materiais — o que proíbe ídolos; (2) Deus não está localizado em nenhum espaço — é onipresente; (3) Deus não sofre mudanças físicas nem é afetado por necessidades corporais. A impassibilidade não significa que Deus é indiferente, mas que não é controlado por emoções reativas como os deuses pagãos.³',
    notas: [3],
  },
  {
    num: '1.4',
    resposta: 'Deus é infinito em ser porque não possui limites — nem temporais (eternidade), nem espaciais (onipresença), nem de poder (onipotência), nem de conhecimento (onisciência). A criação, ao contrário, é finita em todos esses aspectos. A infinitude divina implica: (1) Deus nunca começou nem terminará; (2) Deus não pode ser contido em nenhum espaço; (3) Deus nunca aprende nem esquece; (4) Deus nunca se esgota. Isso o torna absolutamente distinto de tudo que existe.⁴',
    notas: [4],
  },
  {
    num: '1.5',
    resposta: 'Aseidade (do latim a se, "de si mesmo") é a doutrina de que Deus existe por si próprio e não depende de nada externo para existir, agir ou ser quem é. Isso distingue radicalmente o Deus bíblico de todos os outros seres: tudo que existe depende de outra coisa para existir (ex. criaturas dependem de Deus), mas Deus não depende de nada. Êxodo 3.14 ("EU SOU O QUE SOU") é a expressão bíblica desta doutrina — Deus é o ser autoexistente e necessário.⁵',
    notas: [5],
  },
  {
    num: '1.6',
    resposta: 'A soberania absoluta de Deus significa que ele faz tudo "segundo o conselho de sua vontade" (Ef 1.11) — nada pode frustrar seus propósitos. Na prática pastoral: (1) o sofrimento não é acidente fora do controle divino; (2) a oração não tenta convencer um Deus relutante, mas se alinha ao que Deus já determinou; (3) a evangelização pode ser feita com confiança, pois Deus salva. O temor ao SENHOR (Pr 1.7) nasce de reconhecer que diante dessa soberania toda resistência humana é fútil e toda adoração é devida.⁶',
    notas: [6],
  },
  {
    num: '1.7',
    resposta: 'Resposta pessoal e congregacional. Os elementos a considerar: a congregação adora um Deus realmente único e soberano, ou um Deus moldado às preferências culturais? Nosso culto distingue o Criador das criaturas? A pregação apresenta Deus como ele se revela — ou como queremos que ele seja? A doutrina da unicidade e soberania divina é a base de toda adoração genuína: só se adora o que é infinitamente grande e absolutamente distinto de nós.',
  },
];

const NOTAS_RODAPE: { num: number; ref: string }[] = [
  { num: 1, ref: 'BAVINCK, Herman. Dogmática Reformada. São Paulo: Cultura Cristã, 2012. v. 2, p. 145–150.' },
  { num: 2, ref: 'WALDRON, Samuel E. Uma exposição moderna da Confissão de Fé Batista de 1689. São Paulo: Fiel, 2014. p. 45–52.' },
  { num: 3, ref: 'MULLER, Richard A. Post-Reformation Reformed Dogmatics. Grand Rapids: Baker Academic, 2003. v. 3, p. 310–315.' },
  { num: 4, ref: 'FRAME, John M. The Doctrine of God. Phillipsburg: P&R Publishing, 2002. p. 601–610.' },
  { num: 5, ref: 'DOLEZAL, James E. All That Is in God: Evangelical Theology and the Challenge of Classical Christian Theism. Grand Rapids: Reformation Heritage Books, 2017. p. 40–56.' },
  { num: 6, ref: 'PINK, Arthur W. Os atributos de Deus. São Paulo: Cultura Cristã, 2001. p. 27–35.' },
];

const GABARITO_ENC2: { num: string; resposta: string; notas?: number[] }[] = [
  {
    num: '2.1',
    resposta: 'A santidade de Deus (Is 6.3) é seu atributo fundamental — sua absoluta separação do pecado e sua perfeição moral infinita. O trisságio ("Santo, Santo, Santo") expressa superlativo absoluto em hebraico, significando que a santidade de Deus é incomparável. Isso implica que Deus não pode tolerar o mal (Hc 1.13), que todo pecado é ofensa direta contra sua natureza, e que a redenção é necessária para que pecadores possam se aproximar dele.¹',
    notas: [1],
  },
  {
    num: '2.2',
    resposta: 'Os atributos comunicáveis são aqueles que Deus compartilha, em medida finita, com as criaturas — amor, bondade, sabedoria, justiça. Os incomunicáveis são exclusivamente divinos — onipotência, onisciência, onipresença, eternidade, aseidade. A distinção é pedagógica: ajuda a entender Deus por analogia sem identificá-lo com as criaturas. O perigo de ignorar os atributos incomunicáveis é reduzir Deus a um ser humano amplificado.²',
    notas: [2],
  },
  {
    num: '2.3',
    resposta: 'A imutabilidade (Ml 3.6; Tg 1.17) significa que Deus não muda em ser, perfeição, propósitos ou caráter. Isso não significa que Deus seja impassível no sentido de indiferente — ele age em resposta à oração — mas que suas ações não alteram o que ele é. Na prática: as promessas de Deus são confiáveis porque ele não muda; seu amor não esfria; sua santidade não negocia. "O mesmo ontem, hoje e sempre" é fundamento da esperança cristã.³',
    notas: [3],
  },
  {
    num: '2.4',
    resposta: 'O CFB §2 afirma que Deus é "gloriosamente onipotente" — pode fazer tudo o que é consistente com sua natureza perfeita. Isso exclui o que é logicamente impossível (fazer um círculo quadrado) ou o que contradiz sua natureza (mentir, pecar). Salmo 115.3 diz "nosso Deus está nos céus; faz tudo o que lhe apraz" — o prazer de Deus está sempre em perfeito acordo com sua santidade e amor. Não há voluntarismo arbitrário em Deus.⁴',
    notas: [4],
  },
  {
    num: '2.5',
    resposta: 'Deus ser "a fonte de todo ser" (§2) significa que tudo que existe deriva sua existência de Deus — a criação é ex nihilo (do nada). Isso distingue o Deus bíblico do panteísmo (Deus é tudo) e do panenteísmo (Deus precisa do mundo para existir plenamente). A dependência ontológica da criação em relação a Deus implica que a criação não é divina, mas tampuco é autônoma — é permanentemente sustentada pelo poder de Deus (Hb 1.3).⁵',
    notas: [5],
  },
  {
    num: '2.6',
    resposta: 'A onisciência (Rm 11.33–36; Hb 4.13) significa que Deus conhece tudo — passado, presente, futuro, reais e possíveis, externos e internos. Isso inclui os pensamentos antes de serem pensados (Sl 139.4). Para o cristão: (1) nada pode ser escondido de Deus — confissão honesta; (2) Deus conhece o sofrimento antes de pedirmos — oração confiante; (3) Deus não é surpreendido — providência soberana. O abismo de sua sabedoria (Rm 11.33) excede toda investigação humana.⁶',
    notas: [6],
  },
  {
    num: '2.7',
    resposta: 'A suficiência de Deus (aseidade) tem implicação direta para a adoração: ele não precisa de nada que lhe possamos dar (At 17.25). A adoração não supre uma necessidade de Deus; ela reconhece o que Deus já é. Isso purifica os motivos: adoramos não para manipular Deus a agir em nosso favor, mas porque ele merece toda honra por si mesmo. A teologia da prosperidade viola este princípio ao transformar a adoração em transação: "dou para receber".',
  },
];

const NOTAS_RODAPE_ENC2: { num: number; ref: string }[] = [
  { num: 1, ref: 'BAVINCK, Herman. Dogmática Reformada. São Paulo: Cultura Cristã, 2012. v. 2, p. 215–220.' },
  { num: 2, ref: 'BERKHOF, Louis. Teologia Sistemática. Campinas: Luz para o Caminho, 2010. p. 48–62.' },
  { num: 3, ref: 'CHARNOCK, Stephen. The Existence and Attributes of God. Grand Rapids: Baker Books, 1996. v. 1, p. 309–350.' },
  { num: 4, ref: 'WALDRON, Samuel E. Uma exposição moderna da Confissão de Fé Batista de 1689. São Paulo: Fiel, 2014. p. 55–60.' },
  { num: 5, ref: 'DOLEZAL, James E. All That Is in God. Grand Rapids: Reformation Heritage Books, 2017. p. 88–100.' },
  { num: 6, ref: 'PINK, Arthur W. Os atributos de Deus. São Paulo: Cultura Cristã, 2001. p. 57–67.' },
];

const GABARITO_ENC3: { num: string; resposta: string; notas?: number[] }[] = [
  {
    num: '3.1',
    resposta: 'A Trindade é o ensino de que o único Deus existe eternamente em três Pessoas distintas — Pai, Filho e Espírito Santo — que compartilham a mesma e única essência divina (homoousios). Isso difere do triteísmo (três deuses distintos) e do modalismo (um Deus que se manifesta em três modos diferentes em épocas distintas). A CFB §3 afirma explicitamente que as três Pessoas são "da mesma substância, poder e eternidade".¹',
    notas: [1],
  },
  {
    num: '3.2',
    resposta: 'Mateus 28.19 é o texto trinitário mais explícito do Novo Testamento. Jesus ordena o batismo "em nome" (singular — εἰς τὸ ὄνομα) do Pai, do Filho e do Espírito Santo. O singular "nome" indica unidade de essência; a enumeração das três Pessoas indica distinção real. Este texto está na base da fórmula batismal cristã desde os primeiros séculos e demonstra que a distinção trinitária não é especulação filosófica posterior — está na boca do próprio Jesus.²',
    notas: [2],
  },
  {
    num: '3.3',
    resposta: 'O Filho é "eternamente gerado do Pai" (geração eterna) — o que significa que a relação Pai-Filho não começou na encarnação, mas é eterna e imutável. Não é geração biológica (que implicaria tempo e subordinação ontológica), mas uma relação intratrinitária eterna. O Espírito Santo "procede do Pai e do Filho" (filioque, no credo ocidental) — uma processão também eterna e distinta da geração. Ambas as relações são internas à essência divina e não implicam hierarquia ontológica.³',
    notas: [3],
  },
  {
    num: '3.4',
    resposta: 'A subordinação econômica refere-se à ordem das ações trinitárias na história da salvação — o Filho obedece ao Pai (Jo 6.38), o Espírito glorifica o Filho (Jo 16.14). É uma subordinação funcional e temporal, própria da economia da redenção. A subordinação ontológica (heresia subordinacionista) afirmaria que o Filho é de essência inferior ao Pai — negada pelo Concílio de Niceia (325 d.C.) com o homoousios. O Arianismo é o exemplo clássico de confusão entre os dois tipos.⁴',
    notas: [4],
  },
  {
    num: '3.5',
    resposta: 'O Arianismo (séc. IV) afirmava que o Filho foi criado pelo Pai — "houve um tempo em que ele não era" (Ário). O Concílio de Niceia (325 d.C.) respondeu com homoousios ("da mesma substância") — o Filho é consubstancial ao Pai, não uma criatura. O modalismo (Sabélio) afirmava que Pai, Filho e Espírito são apenas três modos de manifestação de um único Deus sem distinção pessoal real. Ambas as heresias persistem: o Arianismo nas Testemunhas de Jeová; o modalismo em grupos "Jesus Only".⁵',
    notas: [5],
  },
  {
    num: '3.6',
    resposta: '2 Coríntios 13.14 é a bênção apostólica paulina que invoca "a graça do Senhor Jesus Cristo, o amor de Deus e a comunhão do Espírito Santo". A estrutura é trinitária: cada Pessoa é mencionada separadamente com um atributo específico, pressupondo distinção real entre elas; ao mesmo tempo, a bênção é uma — pressupondo unidade. Este texto mostra que a Trindade não é teoria abstrata, mas a estrutura da experiência cristã de salvação.⁶',
    notas: [6],
  },
  {
    num: '3.7',
    resposta: 'A pericórese (do grego περιχώρησις, "interpenetração") é o conceito teológico que descreve a mútua habitação das três Pessoas divinas umas nas outras. João 14.10–11 é o texto-base: "Eu estou no Pai e o Pai está em mim." As Pessoas não são separadas como três entidades independentes — habitam umas nas outras em perfeita unidade de vida e ação. Isso explica como há uma única vontade divina mesmo com três Pessoas distintas.⁷',
    notas: [7],
  },
  {
    num: '3.8',
    resposta: 'Resposta pessoal e congregacional. Elementos a considerar: o batismo da nossa congregação usa a fórmula trinitária (Mt 28.19)? A oração é endereçada com consciência das Pessoas? A pregação distingue as obras do Pai (criação, eleição), do Filho (redenção) e do Espírito (regeneração, santificação)? A doxologia é trinitária? A Trindade não é dogma de teólogo — é a estrutura de toda experiência cristã autêntica.',
  },
];

const NOTAS_RODAPE_ENC3: { num: number; ref: string }[] = [
  { num: 1, ref: 'LETHAM, Robert. The Holy Trinity: In Scripture, History, Theology, and Worship. Phillipsburg: P&R Publishing, 2004. p. 1–15.' },
  { num: 2, ref: 'WALDRON, Samuel E. Uma exposição moderna da Confissão de Fé Batista de 1689. São Paulo: Fiel, 2014. p. 62–68.' },
  { num: 3, ref: 'BERKHOF, Louis. Teologia Sistemática. Campinas: Luz para o Caminho, 2010. p. 87–92.' },
  { num: 4, ref: 'GRUDEM, Wayne. Teologia Sistemática. São Paulo: Vida Nova, 2010. p. 250–265.' },
  { num: 5, ref: 'KELLY, J.N.D. Early Christian Creeds. 3. ed. London: Longman, 1972. p. 205–262.' },
  { num: 6, ref: 'BAVINCK, Herman. Dogmática Reformada. São Paulo: Cultura Cristã, 2012. v. 2, p. 295–305.' },
  { num: 7, ref: 'MULLER, Richard A. Dictionary of Latin and Greek Theological Terms. 2. ed. Grand Rapids: Baker Academic, 2017. p. 228. Verbete: perichoresis.' },
];

/* ─── confessional texts ──────────────────────────────────────────────── */

const CONF_TEXT_P1 = [
  {
    para: '§1a',
    titulo: 'Existe apenas um Deus vivo e verdadeiro',
    texto: (<p className="italic">
      O Senhor nosso Deus é o <strong style={{ color: GOLD }}>único Deus vivo e verdadeiro</strong>; sua subsistência está nele mesmo e por ele mesmo; ele é <strong style={{ color: GOLD }}>infinito em ser e perfeição</strong>. Sua essência não pode ser compreendida por nenhuma outra criatura a não ser por ele mesmo. É <strong style={{ color: GOLD }}>um Espírito puríssimo</strong>, invisível, <span style={{ color: ROSE, fontWeight: 600 }}>sem corpo, partes ou paixões</span>, imutável, imenso, eterno, incompreensível, onipotente, onisciente.
    </p>),
  },
  {
    para: '§1b',
    titulo: 'Santíssimo, soberano e livre',
    texto: (<p className="italic">
      É <strong style={{ color: GOLD }}>santíssimo</strong>, absolutamente livre, atuando conforme o conselho de sua própria <strong style={{ color: GOLD }}>vontade imutável e justíssima</strong>, para sua própria glória. É <strong style={{ color: GOLD }}>amoroso, gracioso, misericordioso, longânime</strong>, abundante em bondade e verdade, <span style={{ color: GOLD, fontWeight: 600 }}>perdoando a iniquidade, a transgressão e o pecado</span>; é também o <span style={{ color: ROSE, fontWeight: 600 }}>galardonador dos que diligentemente o buscam</span>; e ao mesmo tempo é <span style={{ color: ROSE, fontWeight: 600 }}>muito justo e terrível em seus juízos</span>, odiando todo o pecado, e que de maneira nenhuma inocentará o culpado.
    </p>),
  },
  {
    para: '§1c',
    titulo: 'Fonte de todo bem',
    texto: (<p className="italic">
      Deus tem em si mesmo e por si mesmo toda a <strong style={{ color: GOLD }}>vida, glória, bondade e bem-aventurança</strong>. Ele é <strong style={{ color: GOLD }}>todo-suficiente em si mesmo</strong>, e absolutamente <span style={{ color: ROSE, fontWeight: 600 }}>não necessita de nenhuma criatura</span> que ele criou, e não tira glória delas; pelo contrário, manifesta sua própria glória nelas, por elas, para elas e sobre elas. É a <strong style={{ color: GOLD }}>única fonte de todo ser</strong>, de quem, por quem e para quem são todas as coisas; e sobre todos tem <strong style={{ color: GOLD }}>soberania absoluta</strong>, para fazer por elas o que lhe agrada. Diante de seus olhos tudo é <span style={{ color: GOLD, fontWeight: 600 }}>aberto e manifesto</span>; seu conhecimento é infinito, infalível e independente da criatura.
    </p>),
  },
];

const CONF_TEXT_P2 = [
  {
    para: '§1d',
    titulo: 'Santíssimo em toda vontade',
    texto: (<p className="italic">
      É <strong style={{ color: GREEN }}>santíssimo em toda a sua vontade</strong>, em todos os seus conselhos e em todas as suas obras. A Ele são devidos, de anjos e homens, e de toda criatura, qualquer culto, serviço ou obediência que lhe aprouver exigir. Em sua visão é sempre <strong style={{ color: GREEN }}>santíssimo e maravilhoso</strong>.
    </p>),
  },
  {
    para: '§2a',
    titulo: 'Deus tem em si mesmo toda a perfeição',
    texto: (<p className="italic">
      Deus, tendo toda a vida, glória, bondade e bem-aventurança em si mesmo e por si mesmo, é <strong style={{ color: GREEN }}>gloriosamente onipotente</strong>, soberano acima de todo ser criado, agindo sobre todas as suas criaturas como lhe apraz. Diante de seus olhos tudo é <strong style={{ color: GREEN }}>aberto e manifesto</strong>; seu conhecimento é infinito, infalível e independente da criatura, de modo que <span style={{ color: ROSE, fontWeight: 600 }}>para ele nada é contingente ou incerto</span>. É <strong style={{ color: GREEN }}>santíssimo em toda a sua vontade</strong>.
    </p>),
  },
  {
    para: '§2b',
    titulo: 'Mais do que suficiente em si mesmo',
    texto: (<p className="italic">
      Deus não necessita de nenhuma criatura que criou, nem retira glória alguma delas; pelo contrário, manifesta sua própria glória nelas, por elas, para elas e sobre elas. Ele é a <strong style={{ color: GREEN }}>única fonte de todo ser</strong>, de quem, por quem e para quem são todas as coisas; e sobre todas tem soberania absoluta para fazer <strong style={{ color: GREEN }}>como lhe apraz</strong>. <span style={{ color: ROSE, fontWeight: 600 }}>Sua glória não pode ser aumentada nem diminuída</span> por nenhuma criatura.
    </p>),
  },
  {
    para: '§2c',
    titulo: 'Onipotente e digno de toda adoração',
    texto: (<p className="italic">
      Deus é <strong style={{ color: GREEN }}>digno do mais alto amor</strong>, temor e serviço, de todo anjo e ser humano, e de toda criatura. Todas as suas obras revelam seus atributos para que as criaturas <strong style={{ color: GREEN }}>o adorem, o amem e o sirvam</strong> com todo o ser. Sua <span style={{ color: GREEN, fontWeight: 600 }}>onipotência</span>, sua <span style={{ color: GREEN, fontWeight: 600 }}>onisciência</span> e sua <span style={{ color: GREEN, fontWeight: 600 }}>onipresença</span> garantem que nenhum propósito seu jamais será frustrado.
    </p>),
  },
];

const CONF_TEXT_P3 = [
  {
    para: '§3a',
    titulo: 'Um só Deus, três Pessoas',
    texto: (<p className="italic">
      Nessa divina e infinita essência, há <strong style={{ color: BLUE }}>três subsistências</strong>, o Pai, o Verbo (ou Filho) e o Espírito Santo, da mesma substância, poder e eternidade, cada um tendo a <strong style={{ color: BLUE }}>toda a essência divina</strong>, e ao mesmo tempo sendo <strong style={{ color: BLUE }}>distintos em seus atributos pessoais</strong>; o Pai não é gerado nem procede, o Filho é <span style={{ color: BLUE, fontWeight: 600 }}>eternamente gerado do Pai</span>, o Espírito Santo <span style={{ color: BLUE, fontWeight: 600 }}>eternamente procede do Pai e do Filho</span>.
    </p>),
  },
  {
    para: '§3b',
    titulo: 'Todas as três Pessoas são o mesmo Deus',
    texto: (<p className="italic">
      As três Pessoas são <strong style={{ color: BLUE }}>uma só essência</strong>, igual em poder e glória, embora distintas em Pessoas. Esta Trindade Santa é o <strong style={{ color: BLUE }}>único Deus vivo e verdadeiro</strong> revelado nas Escrituras. Não há três deuses, <span style={{ color: ROSE, fontWeight: 600 }}>nem um Deus sem distinção pessoal</span>: há <strong style={{ color: BLUE }}>um Deus em três Pessoas</strong> — insondável e adorável.
    </p>),
  },
  {
    para: '§3c',
    titulo: 'As obras ad extra são indivisas',
    texto: (<p className="italic">
      As obras de Deus para fora (ad extra) pertencem <strong style={{ color: BLUE }}>às três Pessoas conjuntamente</strong>, embora na ordem da revelação sejam atribuídas especialmente a cada uma: a criação ao Pai, a redenção ao Filho, a santificação ao <strong style={{ color: BLUE }}>Espírito Santo</strong>. Esta doutrina da <span style={{ color: BLUE, fontWeight: 600 }}>Trindade econômica</span> não divide a essência de Deus, mas revela como as três Pessoas agem juntas na história da salvação.
    </p>),
  },
  {
    para: '§3d',
    titulo: 'Fundamento de toda a teologia cristã',
    texto: (<p className="italic">
      A doutrina da Trindade é <strong style={{ color: BLUE }}>fundamento de toda a teologia cristã</strong> e de toda a experiência cristã. Sem ela, a encarnação é impossível, a redenção é incompleta e a oração perde seu destinatário trinitário. <strong style={{ color: BLUE }}>Confessamos com a Igreja de todos os séculos</strong>: <span style={{ color: BLUE, fontWeight: 600 }}>glória ao Pai, ao Filho e ao Espírito Santo, como era no princípio, é agora e será para sempre</span>.
    </p>),
  },
];

/* ─── encontros ──────────────────────────────────────────────────────── */

const ENCONTRO1 = {
  titulo: 'Parte 1',
  subtitulo: 'O Deus único — essência e existência',
  cor: GOLD,
  versiculo: 'Ouve, ó Israel: o SENHOR nosso Deus é o único SENHOR.',
  ref_versiculo: 'Deuteronômio 6.4',
  aplicacao: (<>
    <p>A unicidade e a soberania de Deus são o fundamento de toda ética cristã. Se há <strong style={{ color: GOLD }}>um só Deus</strong>, então toda outra lealdade — dinheiro, nação, ideologia, família — é relativa e subordinada a ele. Na prática congregacional: reveja se sua pregação apresenta Deus como ele se revela — infinito, imutável, onipotente — ou como uma versão ampliada dos nossos próprios desejos. <strong style={{ color: GOLD }}>Um Deus domesticado não pode ser adorado</strong>; pode apenas ser usado.</p>
    <p>A aseidade de Deus (§1c) liberta a adoração de qualquer instrumentalização. Deus não precisa de nossas ofertas, músicas ou esforços para existir ou ser glorioso. Isso significa que <strong style={{ color: GOLD }}>a adoração é puro reconhecimento</strong> — não um serviço prestado a um Deus necessitado. Quanto mais clara a aseidade, mais genuína a adoração. Ensine sua congregação a distinguir: adoramos porque Deus merece, não porque queremos algo em troca.</p>
    <p>A imutabilidade de Deus é <strong style={{ color: GOLD }}>âncora para o sofrimento</strong>. Quando a vida muda — perda, doença, incerteza — o Deus imutável permanece idêntico a si mesmo. Malaquias 3.6 ("Porque eu, o SENHOR, não mudo") não é informação filosófica; é o fundamento da esperança do povo de Deus em tribulação. Ensine os membros da congregação a citar este versículo no momento da crise — não como magia, mas como ancoragem na natureza real de Deus.</p>
  </>),
  textos: ['Dt 6.4', '1Co 8.4–6', 'Jr 10.10', 'Is 44.6', 'Ex 3.14', 'At 17.24–25'],
  introducao: (<>
    <p>O Capítulo 2 da CFB responde à pergunta mais fundamental da teologia: <strong style={{ color: GOLD }}>"Quem é Deus?"</strong> Não "o que Deus faz", nem "o que Deus quer de mim" — mas quem ele é em si mesmo. Sem essa pergunta respondida corretamente, tudo o mais na teologia cristã estará edificado sobre areia.</p>
    <p>A confissão começa com a <strong style={{ color: GOLD }}>unicidade</strong> de Deus (Dt 6.4; 1Co 8.4–6): existe apenas um Deus, e ele é radicalmente distinto de tudo que existe. Não é apenas "o maior dos seres" — é o único ser que existe <em>a se</em>, por si mesmo, sem depender de nada. <span style={{ color: GOLD, fontWeight: 700 }}>Esta aseidade é o que torna Deus Deus</span> — e faz de todo outro ser uma criatura dependente.</p>
    <p>O §1 desdobra os atributos incomunicáveis: Deus é <strong style={{ color: GOLD }}>infinito em ser</strong>, eterno, imutável, onipotente, onisciente, onipresente. E os comunicáveis: <strong style={{ color: GOLD }}>amoroso, gracioso, misericordioso</strong>, mas também <span style={{ color: ROSE, fontWeight: 600 }}>justo e terrível em seus juízos</span>. Ambos os lados pertencem ao mesmo Deus — e qualquer teologia que enfatize apenas um lado produz um ídolo.</p>
  </>),
  perguntas: [
    { num: '1.1', texto: 'O que distingue o monoteísmo bíblico do politeísmo e do deísmo?', recurso: { label: 'Os atributos de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/os-atributos-de-deus/' } },
    { num: '1.2', texto: 'Como Deuteronômio 6.4 e 1Co 8.4–6 fundamentam a unicidade de Deus? O que o Shemá exige de Israel?', recurso: { label: 'A existência de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-existencia-de-deus/' } },
    { num: '1.3', texto: 'O que significa dizer que Deus é "Espírito" (Jo 4.24)? Que implicações isso tem para o culto e para a criação de imagens?', recurso: { label: 'A natureza espiritual de Deus — Monergismo', url: 'https://monergismo.com/os-atributos-de-deus-a-w-pink/' } },
    { num: '1.4', texto: 'O que significa Deus ser "infinito em ser"? Como isso o distingue de toda criatura?', recurso: { label: 'A infinitude de Deus — Monergismo', url: 'https://www.monergismo.com/textos/atributos_deus/infinitude_deus.htm' } },
    { num: '1.5', texto: 'O que é a "aseidade" de Deus? Como Êxodo 3.14 expressa essa doutrina?', recurso: { label: 'A aseidade de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-aseidade-de-deus/' } },
    { num: '1.6', texto: 'Como a soberania absoluta de Deus afeta a prática da oração e o entendimento do sofrimento?', recurso: { label: 'A soberania de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-soberania-de-deus/' } },
    { num: '1.7', texto: 'Como a teologia dos atributos de Deus deve moldar o culto da sua congregação? Qual atributo tem sido mais esquecido?' },
  ],
  glossario: [
    { termo: 'Aseidade', def: 'Do latim a se ("de si mesmo") — a doutrina de que Deus existe por si próprio, sem depender de nada externo. Êxodo 3.14 é sua expressão bíblica clássica.' },
    { termo: 'Imutabilidade', def: 'O atributo pelo qual Deus não muda em essência, caráter, propósitos ou perfeição (Ml 3.6; Tg 1.17). Fundamento da confiabilidade das promessas divinas.' },
    { termo: 'Infinitude', def: 'A ausência de quaisquer limites em Deus — nem temporais (eternidade), nem espaciais (onipresença), nem de poder (onipotência), nem de conhecimento (onisciência).' },
    { termo: 'Onisciência', def: 'O conhecimento perfeito e completo de Deus sobre tudo — passado, presente, futuro, reais e possíveis. Nada existe fora de seu conhecimento (Hb 4.13; Sl 139).' },
    { termo: 'Impassibilidade', def: 'A doutrina de que Deus não é controlado por emoções reativas externas como os deuses pagãos. Não significa indiferença, mas perfeição emocional não manipulável pelas criaturas.' },
  ],
};

const ENCONTRO2 = {
  titulo: 'Parte 2',
  subtitulo: 'O caráter de Deus — atributos e perfeições',
  cor: GREEN,
  versiculo: 'Santo, santo, santo é o SENHOR dos Exércitos; toda a terra está cheia da sua glória.',
  ref_versiculo: 'Isaías 6.3',
  aplicacao: (<>
    <p>A santidade de Deus (§1d) não é apenas separação do pecado — é a <strong style={{ color: GREEN }}>suma de todas as perfeições divinas</strong>. Quando a Igreja perde o senso da santidade de Deus, perde também o senso do pecado, a necessidade da expiação e a seriedade da redenção. A aplicação pastoral imediata: <strong style={{ color: GREEN }}>a pregação deve recuperar a tremendum da presença de Deus</strong>. Isaías 6 é o modelo — o encontro com a santidade produz consciência de indignidade, seguido de purificação e missão.</p>
    <p>A distinção entre atributos comunicáveis e incomunicáveis tem implicação ética direta. Porque Deus é <strong style={{ color: GREEN }}>amor</strong> (comunicável), somos chamados a amar. Porque Deus é <strong style={{ color: GREEN }}>justo</strong> (comunicável), somos chamados a fazer justiça. Mas porque Deus é <strong style={{ color: GREEN }}>onipotente e onisciente</strong> (incomunicáveis), somos chamados à humildade — não somos Deus, não sabemos tudo, não controlamos tudo. A idolatria moderna frequentemente consiste em apropriar os atributos incomunicáveis para o eu.</p>
    <p>A suficiência de Deus (§2b-c) é o antídoto para a <strong style={{ color: GREEN }}>teologia da prosperidade</strong>. Se Deus não precisa de nós e não retira glória das criaturas no sentido de necessidade, então a adoração não é negócio. Ensine sua congregação que Deus não "precisa" de dízimos, nem de "declarações de fé", nem de entusiasmo emocional para agir. Ele age conforme sua própria vontade — e a nossa tarefa é <strong style={{ color: GREEN }}>alinhar-nos à sua vontade revelada</strong>, não manipulá-la.</p>
  </>),
  textos: ['Is 6.3', 'Sl 115.3', 'Ml 3.6', 'Tg 1.17', 'Rm 11.33–36', 'Hb 4.13', 'At 17.25'],
  introducao: (<>
    <p>Se a Parte 1 respondeu "Quem é Deus em ser", esta Parte responde: <strong style={{ color: GREEN }}>"Como é Deus em caráter?"</strong> O CFB §1 apresenta uma lista notável de atributos divinos — não um catálogo filosófico, mas o retrato de <strong style={{ color: GREEN }}>uma Pessoa com caráter infinito e perfeito</strong>.</p>
    <p>O §2 elabora com ênfase na <strong style={{ color: GREEN }}>suficiência de Deus</strong>: ele tem toda vida, glória e bem-aventurança <em>em si mesmo</em>. Isso significa que a criação não acrescentou nada a Deus — ele era completamente glorioso antes que o mundo existisse. <span style={{ color: ROSE, fontWeight: 600 }}>A criação não foi uma necessidade de Deus, mas um ato livre de sua bondade</span>. Isso coloca a adoração em sua perspectiva correta: não suprimos uma necessidade de Deus — reconhecemos o que ele já é.</p>
    <p>A tabela de atributos abaixo organiza o que o §1–2 ensina, distinguindo atributos <strong style={{ color: GREEN }}>incomunicáveis</strong> (exclusivamente divinos) de <strong style={{ color: GREEN }}>comunicáveis</strong> (compartilhados em medida finita com as criaturas):</p>
  </>),
  perguntas: [
    { num: '2.1', texto: 'O que significa dizer que Deus é "santíssimo"? Como Isaías 6.3 aprofunda essa doutrina?', recurso: { label: 'A santidade de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-santidade-de-deus/' } },
    { num: '2.2', texto: 'Qual a diferença entre atributos comunicáveis e incomunicáveis de Deus? Dê dois exemplos de cada.', recurso: { label: 'Os atributos de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/os-atributos-de-deus/' } },
    { num: '2.3', texto: 'O que significa a imutabilidade de Deus (Ml 3.6; Tg 1.17)? Como isso afeta nossa compreensão das promessas bíblicas?', recurso: { label: 'A imutabilidade de Deus — Monergismo', url: 'https://monergismo.com/os-atributos-de-deus-a-w-pink/' } },
    { num: '2.4', texto: 'O CFB diz que Deus é "gloriosamente onipotente". O que isso significa? Existe algo que Deus não pode fazer?', recurso: { label: 'A onipotência de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-onipotencia-de-deus/' } },
    { num: '2.5', texto: 'O que significa dizer que Deus é "a única fonte de todo ser" (§2)? Como isso distingue o Deus bíblico do panteísmo?', recurso: { label: 'A teologia própria de Deus — Monergismo', url: 'https://www.monergismo.com/textos/atributos_deus/atributos_deus_berkhof.htm' } },
    { num: '2.6', texto: 'Como a onisciência de Deus (Rm 11.33–36; Hb 4.13) deveria afetar a prática da oração e da confissão de pecados?', recurso: { label: 'A onisciência de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-onisciencia-de-deus/' } },
    { num: '2.7', texto: 'O CFB diz que Deus "não necessita de nenhuma criatura" (§2). Como essa doutrina refuta a teologia da prosperidade?', recurso: { label: 'Teologia da prosperidade — Ligonier PT', url: 'https://pt.ligonier.org/artigos/o-evangelho-da-prosperidade/' } },
  ],
  glossario: [
    { termo: 'Santidade', def: 'O atributo central de Deus — sua absoluta separação do pecado e sua perfeição moral infinita (Is 6.3). Trisságio expressa superlativo em hebraico: "santíssimo".' },
    { termo: 'Atributos Comunicáveis', def: 'Qualidades divinas que Deus compartilha, em medida finita, com as criaturas — amor, bondade, sabedoria, justiça, misericórdia.' },
    { termo: 'Atributos Incomunicáveis', def: 'Qualidades exclusivamente divinas, que nenhuma criatura pode possuir — aseidade, imutabilidade, eternidade, onipresença, onipotência, onisciência.' },
    { termo: 'Suficiência', def: 'O atributo pelo qual Deus possui toda vida, glória e bem-aventurança em si mesmo (§2), sem depender das criaturas para existir ou ser glorioso.' },
    { termo: 'Impassibilidade', def: 'Deus não é afetado por emoções reativas externas como os deuses pagãos. Não é indiferente, mas imperturbável em sua perfeição emocional e moral.' },
  ],
};

const ENCONTRO3 = {
  titulo: 'Parte 3',
  subtitulo: 'A Santa Trindade — três Pessoas, um só Deus',
  cor: BLUE,
  versiculo: 'Ide, portanto, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo.',
  ref_versiculo: 'Mateus 28.19',
  aplicacao: (<>
    <p>A Trindade não é dogma abstrato — é a <strong style={{ color: BLUE }}>estrutura de toda a experiência cristã</strong>. Somos eleitos pelo Pai (Ef 1.4), redimidos pelo Filho (1Pe 1.18–19), regenerados e santificados pelo Espírito (Tt 3.5). Quando a congregação ora, adora e serve, ela se move dentro de uma <strong style={{ color: BLUE }}>realidade trinitária</strong>. A pergunta pastoral: nosso ensino e liturgia refletem conscientemente essa estrutura, ou a Trindade é apenas uma doutrina que afirmamos no papel?</p>
    <p>O batismo trinitário (Mt 28.19) tem implicação eclesiológica direta: <strong style={{ color: BLUE }}>batizar em nome do Pai, do Filho e do Espírito Santo</strong> é incorporar alguém ao povo do único Deus trino. Isso significa que qualquer batismo em nome de apenas uma Pessoa é teologicamente deficiente — e a prática dos grupos "Jesus Only" representa uma ruptura com a fé apostólica. O batismo é o rito de entrada na comunidade do Deus trinitário.</p>
    <p>A pericórese trinitária — a mútua habitação das Pessoas — tem implicação para a <strong style={{ color: BLUE }}>comunhão eclesial</strong>. João 17.21 usa a unidade trinitária como modelo para a unidade da Igreja: "como tu, Pai, estás em mim e eu em ti, que eles também estejam em nós". A unidade da Igreja não é unanimidade superficial, mas <strong style={{ color: BLUE }}>comunhão profunda de vida</strong>, modelada na comunhão das Pessoas divinas. Isso julga tanto o individualismo quanto o coletivismo eclesial.</p>
  </>),
  textos: ['Mt 28.19', '2Co 13.14', 'Jo 14.10–11', '1Pe 1.2', 'Ef 1.3–14', 'Jo 16.13–14'],
  introducao: (<>
    <p>O §3 da CFB é o ponto mais alto do Capítulo 2: a revelação de que o único Deus existe eternamente como <strong style={{ color: BLUE }}>três Pessoas distintas</strong> — Pai, Filho e Espírito Santo. Este é o mistério mais profundo da fé cristã, negado por todas as outras religiões monoteístas e deformado por todas as heresias cristológicas antigas e modernas.</p>
    <p>A confissão é cuidadosa: as três Pessoas são <strong style={{ color: BLUE }}>"da mesma substância, poder e eternidade"</strong> (homoousios — Concílio de Niceia, 325 d.C.). O Pai não é gerado nem procede; o Filho é <span style={{ color: BLUE, fontWeight: 600 }}>eternamente gerado</span>; o Espírito <span style={{ color: BLUE, fontWeight: 600 }}>eternamente procede</span>. Essas relações de origem distinguem as Pessoas sem dividir a essência — <span style={{ color: ROSE, fontWeight: 600 }}>não há três deuses, nem um Deus sem distinção pessoal</span>.</p>
    <p>A evidência bíblica é ampla: Mateus 28.19 (batismo trinitário), 2Co 13.14 (bênção apostólica trinitária), Jo 14.10–11 (pericórese), 1Pe 1.2 (eleição trinitária), Ef 1.3–14 (plano de salvação trinitário). A Trindade <strong style={{ color: BLUE }}>não é especulação filosófica</strong> — é a estrutura da revelação bíblica inteira.</p>
  </>),
  perguntas: [
    { num: '3.1', texto: 'Defina a doutrina da Trindade. Em que ela difere do triteísmo e do modalismo?', recurso: { label: 'A doutrina da Trindade — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-doutrina-da-trindade/' } },
    { num: '3.2', texto: 'Como Mateus 28.19 fundamenta a doutrina da Trindade? O que o singular "nome" indica?', recurso: { label: 'A Trindade no Novo Testamento — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-trindade/' } },
    { num: '3.3', texto: 'O que significa dizer que o Filho é "eternamente gerado" e o Espírito "eternamente procede"? O que distingue essas relações?', recurso: { label: 'Relações eternas na Trindade — Monergismo', url: 'https://monergismo.com/a-doutrina-da-trindade-rc-sproul/' } },
    { num: '3.4', texto: 'Qual a diferença entre subordinação econômica e subordinação ontológica? Por que essa distinção importa?', recurso: { label: 'Subordinação e Trindade — Ligonier PT', url: 'https://pt.ligonier.org/artigos/o-filho-eterno/' } },
    { num: '3.5', texto: 'Explique o Arianismo e o Modalismo. Por que ambos foram condenados como heresias? Onde esses erros reaparecem hoje?', recurso: { label: 'Heresias trinitárias — Monergismo', url: 'https://www.monergismo.com/textos/teologia_sistematica/trindade_berkhof.htm' } },
    { num: '3.6', texto: 'Como 2Co 13.14 revela a estrutura trinitária da salvação cristã?', recurso: { label: 'A Trindade e a salvação — Ligonier PT', url: 'https://pt.ligonier.org/artigos/trindade-salvacao/' } },
    { num: '3.7', texto: 'O que é a "pericórese" trinitária? Como João 14.10–11 a fundamenta? Que implicação isso tem para a unidade da Igreja (Jo 17.21)?', recurso: { label: 'A unidade trinitária — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-trindade/' } },
    { num: '3.8', texto: 'Como a doutrina da Trindade deve moldar a liturgia, o batismo e a oração da sua congregação?' },
  ],
  glossario: [
    { termo: 'Trindade', def: 'O único Deus existe eternamente em três Pessoas distintas — Pai, Filho e Espírito Santo — da mesma substância, poder e eternidade. Um Deus, três Pessoas.' },
    { termo: 'Homoousios', def: 'Termo grego ("da mesma substância") usado no Concílio de Niceia (325 d.C.) para afirmar que o Filho é consubstancial ao Pai, refutando o Arianismo.' },
    { termo: 'Geração Eterna', def: 'A relação intratrinitária pela qual o Filho deriva eternamente sua existência pessoal do Pai — não no tempo, mas de forma eterna e imutável.' },
    { termo: 'Processão', def: 'A relação intratrinitária pela qual o Espírito Santo procede eternamente do Pai (e do Filho, no credo ocidental — filioque), distinto da geração do Filho.' },
    { termo: 'Pericórese', def: 'Do grego "interpenetração mútua" — as três Pessoas divinas habitam umas nas outras em perfeita unidade de vida, sem confusão nem separação (Jo 14.10–11).' },
    { termo: 'Subordinação Econômica', def: 'A ordem funcional das Pessoas na história da salvação — o Filho obedece ao Pai, o Espírito glorifica o Filho — distinta de qualquer inferioridade ontológica.' },
  ],
};

const REFERENCIAS = [
  { autores: 'BAVINCK, Herman', titulo: 'Dogmática Reformada', local: 'São Paulo: Cultura Cristã', ano: '2012', vol: 'v. 2' },
  { autores: 'BERKHOF, Louis', titulo: 'Teologia Sistemática', local: 'Campinas: Luz para o Caminho', ano: '2010' },
  { autores: 'CHARNOCK, Stephen', titulo: 'The Existence and Attributes of God', local: 'Grand Rapids: Baker Books', ano: '1996', vol: 'v. 1' },
  { autores: 'CONFISSÃO DE FÉ BATISTA DE LONDRES DE 1689', titulo: 'Tradução e notas de Pro Nobis', local: 'São Paulo: Pro Nobis', ano: '2025' },
  { autores: 'DOLEZAL, James E.', titulo: 'All That Is in God', local: 'Grand Rapids: Reformation Heritage Books', ano: '2017' },
  { autores: 'GRUDEM, Wayne', titulo: 'Teologia Sistemática', local: 'São Paulo: Vida Nova', ano: '2010' },
  { autores: 'LETHAM, Robert', titulo: 'The Holy Trinity: In Scripture, History, Theology, and Worship', local: 'Phillipsburg: P&R Publishing', ano: '2004' },
  { autores: 'PINK, Arthur W.', titulo: 'Os atributos de Deus', local: 'São Paulo: Cultura Cristã', ano: '2001' },
  { autores: 'WALDRON, Samuel E.', titulo: 'Uma Exposição Moderna da Confissão de Fé Batista de 1689', local: 'São Paulo: Fiel', ano: '2014' },
];

/* ─── sub-components ────────────────────────────────────────────────────── */

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

/* ─── encontro section ───────────────────────────────────────────────── */

function EncontroSection({ enc, textos, confTexto, mostrarTabelaAtributos, mostrarTabelaErros }: {
  enc: typeof ENCONTRO1;
  textos?: string[];
  confTexto?: typeof CONF_TEXT_P1;
  mostrarTabelaAtributos?: boolean;
  mostrarTabelaErros?: boolean;
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
      <div className="px-4 md:px-6 pt-5 pb-4" style={{ borderBottom: `1px solid ${cor}22` }}>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: `${cor}22`, color: cor }}>{enc.titulo}</span>
        </div>
        <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">{enc.subtitulo}</h2>
        <p className="mt-2 text-base font-medium" style={{ color: `${cor}cc` }}>"{enc.versiculo}" — {enc.ref_versiculo}</p>
      </div>

      <div className="p-4 md:p-6 space-y-7">
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: cor }}>Introdução</h3>
          <div className="space-y-4 text-white/90 leading-relaxed text-sm md:text-base">{enc.introducao}</div>
        </div>

        {textos && (
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: cor }}>Textos-Prova</h3>
            <TextosProva items={textos} cor={cor} />
          </div>
        )}

        {confTexto && (
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: cor }}>Texto Confessional</h3>
            <ConfTexto items={confTexto} cor={cor} />
          </div>
        )}

        {mostrarTabelaAtributos && (
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest mb-3" style={{ color: cor }}>Incomunicáveis × Comunicáveis</h3>
            <TableAtributos cor={cor} />
          </div>
        )}

        {mostrarTabelaErros && (
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest mb-3" style={{ color: cor }}>Principais Heresias Trinitárias</h3>
            <TableErrosTrinitarios cor={cor} />
          </div>
        )}

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: cor }}>Perguntas para Discussão</h3>
          <PerguntasGrid perguntas={enc.perguntas} cor={cor} />
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: cor }}>Glossário</h3>
          <GlossarioCards items={enc.glossario} cor={cor} />
        </div>

        <AplicacaoBox conteudo={enc.aplicacao} cor={cor} />
      </div>
    </motion.section>
  );
}

/* ─── gabarito section ───────────────────────────────────────────────── */

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

/* ─── chapter nav ────────────────────────────────────────────────────── */

function ChapterNav({ onPrev, onNext, compact }: { onPrev: () => void; onNext: () => void; compact?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-2 ${compact ? 'py-2 px-2' : 'py-4 px-0'}`}>
      <button
        onClick={onPrev}
        className="flex items-center gap-1.5 rounded-xl px-3 py-2 transition-all hover:scale-105 min-w-0"
        style={{ background: `${GOLD}0a`, border: `1px solid ${GOLD}20` }}
      >
        <motion.span animate={{ x: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ color: GOLD }} className="text-base shrink-0">←</motion.span>
        <div className="text-left min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider leading-none truncate" style={{ color: `${GOLD}70` }}>Anterior</p>
          <p className="text-xs text-white/55 mt-0.5 truncate hidden xs:block">Cap. I</p>
        </div>
      </button>

      <div className="flex items-center gap-1 overflow-hidden">
        {Array.from({ length: 18 }, (_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all ${i > 9 ? 'hidden sm:block' : ''}`}
            style={{ width: i === 1 ? 16 : 5, height: 5, background: i === 1 ? GOLD : `${GOLD}28`, flexShrink: 0 }}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        className="flex items-center gap-1.5 rounded-xl px-3 py-2 transition-all hover:scale-105 min-w-0"
        style={{ background: `${GOLD}0a`, border: `1px solid ${GOLD}20` }}
      >
        <div className="text-right min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider leading-none truncate" style={{ color: `${GOLD}70` }}>Próximo</p>
          <p className="text-xs text-white/55 mt-0.5 truncate hidden xs:block">Cap. III</p>
        </div>
        <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ color: GOLD }} className="text-base shrink-0">→</motion.span>
      </button>
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────────────────── */

export default function DiscipuladoConfessionalCap2Page() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<1 | 2 | 3>(1);
  const goBack = () => navigate('/discipulado/confessional/cap1');
  const goNext = () => navigate('/discipulado/confessional/cap3');

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

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <button
            onClick={() => navigate('/discipulado/confessional/batista')}
            className="flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-80"
            style={{ color: `${GOLD}99` }}
          >
            ← Confissão Batista de 1689
          </button>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: `${GOLD}22`, color: GOLD }}>
              Confissão Batista de 1689
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: '#ffffff10', color: '#ffffff70' }}>
              Capítulo II
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: '#ffffff10', color: '#ffffff70' }}>
              3 Partes
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black mb-3 text-white leading-tight">
            De Deus e da Santa Trindade
          </h1>
          <p className="text-white/80 text-base md:text-xl max-w-2xl leading-relaxed font-medium">
            Discipulado Confessional — Caderno do Aluno · Partes 1 a 3
          </p>

          <div className="mt-6 p-5 rounded-xl" style={{ background: `${GOLD}10`, border: `1px solid ${GOLD}30` }}>
            <p className="text-base text-white/85 leading-relaxed">
              <span style={{ color: GOLD }} className="font-bold">Como usar este material:</span> Leia a introdução, os textos-prova, os textos confessionais e o glossário — depois procure responder cada pergunta por conta própria. Caso tenha dúvidas, acesse a <span style={{ color: GREEN }} className="font-semibold">ajuda</span> disponível em cada pergunta. Ao final, além da aplicação, confira o <span style={{ color: BLUE }} className="font-semibold">gabarito</span> com as respostas orientadoras e as <span style={{ color: BLUE }} className="font-semibold">referências bibliográficas</span> para consulta posterior.
            </p>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="sticky top-0 z-20 px-3 py-3" style={{ background: '#080f22', borderBottom: '1px solid #ffffff12' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-2">
          {([1, 2, 3] as const).map(n => {
            const shortLabels = ['Parte 1', 'Parte 2', 'Parte 3'];
            const subLabels = ['O Deus único', 'Caráter de Deus', 'A Trindade'];
            const cors = [GOLD, GREEN, BLUE];
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
              <EncontroSection enc={ENCONTRO1} textos={ENCONTRO1.textos} confTexto={CONF_TEXT_P1} />
              <GabaritoSection
                cor={GOLD}
                titulo="Gabarito — Parte 1"
                aviso="As respostas abaixo são orientadoras, não exaustivas. A pergunta 1.7 admite apenas resposta pessoal."
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
                aviso="As respostas abaixo são orientadoras, não exaustivas. A pergunta 2.7 admite discussão ampla."
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
                cor={BLUE}
                titulo="Gabarito — Parte 3"
                aviso="As respostas abaixo são orientadoras, não exaustivas. A pergunta 3.8 admite apenas resposta congregacional."
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
