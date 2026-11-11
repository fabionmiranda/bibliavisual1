import type { Pergunta } from './TPQuiz';

/* Perguntas provocadoras que fecham cada infográfico das aulas de Teologia Política.
   Marcadores do Rico: **x** dourado, [[x]] texto bíblico, !!x!! alerta, ++x++ aplicação. */

/* ─── Aula Introdutória ─────────────────────────────────────── */

export const QI: Record<string, Pergunta> = {
  eras: {
    pergunta: 'Se a definição de teologia “amadureceu” ao longo de quinze séculos, isso significa que **a verdade sobre Deus mudou**?',
    opcoes: [
      'Sim: cada época cria a sua própria teologia.',
      'Não: a revelação é a mesma; o que amadurece é a compreensão e a formulação da igreja.',
      'Só a teologia medieval estava certa; o resto é desvio.',
      'A Reforma rompeu totalmente com tudo o que veio antes.',
    ],
    certa: 1,
    gabarito: 'Bavinck define a dogmática como o conhecimento que **Deus revelou à igreja** — o objeto não muda, mas a igreja cresce em entendê-lo ([[Jd 3; Ef 4.13]]). Por isso Calvino cita Agostinho centenas de vezes: !!a Reforma não inventou uma fé nova!!, mas purificou a antiga pela Escritura. ++Estudar a história da teologia é ouvir a igreja de todos os tempos.++',
    ref: '(BAVINCK, 2012, v. 1, Introdução; CALVINO, 2008, livro I, cap. 1)',
  },
  arq: {
    pergunta: 'Se a nossa teologia é apenas “ectípica”, **podemos ter certeza de alguma coisa sobre Deus**?',
    opcoes: [
      'Não: tudo o que dizemos de Deus é opinião humana.',
      'Sim: é conhecimento verdadeiro, embora não exaustivo, porque o próprio Deus o revelou.',
      'Sim: conhecemos a Deus tão bem quanto Ele se conhece.',
      'Só pela razão natural, sem a Escritura.',
    ],
    certa: 1,
    gabarito: 'Junius distingue o conhecimento que Deus tem de si (arquetípico) do que Ele nos comunica (ectípico). O segundo é **finito, mas verdadeiro**, porque Deus fala a verdade ao se acomodar a nós: [["as coisas reveladas nos pertencem"]] ([[Dt 29.29]]). !!O ceticismo e o orgulho erram juntos!!: um nega que saibamos algo; o outro pensa que sabemos tudo.',
    ref: '(JUNIUS, 2014, teses 4-7; MULLER, 2003, v. 1)',
  },
  anat: {
    pergunta: 'Um pregador diz: “Doutrina não importa; o que importa é a vida.” À luz de Ames e Turretin, **ele está certo**?',
    opcoes: [
      'Sim: a teologia é apenas prática.',
      'Não: a teologia é teórica e prática; a vida para Deus nasce da verdade revelada.',
      'Sim: a razão atrapalha a fé.',
      'Não: a teologia é apenas teórica e não tem nada a ver com a vida.',
    ],
    certa: 1,
    gabarito: 'Turretin ensina que a teologia é **mista: teórica e prática** ao mesmo tempo. Ames diz que ela é “doutrina de viver para Deus”, mas é **doutrina**: a vida é o fim, e a verdade é o caminho ([[Jo 17.17; Rm 12.2]]). !!Separar vida e doutrina gera moralismo sem Evangelho!!, assim como doutrina sem vida gera ortodoxia morta.',
    ref: '(TURRETIN, 2011, tópico I, questão 7; AMES, 1997, livro I, cap. 1)',
  },
  drama: {
    pergunta: 'Se não tivesse havido a queda, **existiria política**?',
    opcoes: [
      'Não: o governo é apenas um castigo pelo pecado.',
      'Sim: a vida em comum e a ordem social pertencem à criação; a espada coercitiva é que entra por causa do pecado.',
      'Sim, com polícia, prisões e exércitos iguais aos de hoje.',
      'Ninguém sabe: a Bíblia não trata disso.',
    ],
    certa: 1,
    gabarito: 'Tomás distingue o **governo diretivo**, que existiria até no estado de inocência (ordenar muitos ao bem comum), do **governo coercitivo**, que só se torna necessário depois da queda. Calvino afirma que o governo civil serve para que vivamos em justiça e paz “enquanto vivemos entre os homens”. ++A política nasce boa; a espada é remédio contra o pecado++ ([[Gn 1.28; 9.6]]).',
    ref: '(TOMÁS DE AQUINO, 2001, I, q. 96, a. 4; CALVINO, 2009, livro IV, cap. 20, seção 2)',
  },
  althu: {
    pergunta: 'Num modelo althusiano, **quem deve responder primeiro** pela educação de uma criança?',
    opcoes: [
      'O governo federal.',
      'A família, e as associações maiores apoiam apenas no que ela não consegue fazer.',
      'Organismos internacionais.',
      'Sempre o município.',
    ],
    certa: 1,
    gabarito: 'Para Althusius, a sociedade é uma **aliança de alianças** que cresce de baixo para cima: a associação maior não absorve a menor, mas a **protege e completa**. Esse princípio, mais tarde chamado de subsidiariedade, coloca a família na base ([[Dt 6.6-7; Ef 6.4]]). !!Quando o Estado substitui a família, inverte a ordem da criação.!!',
    ref: '(ALTHUSIUS, 1995, caps. 1-4)',
  },
  kuyper: {
    pergunta: 'Um governo decide definir por lei **o conteúdo das pregações** nas igrejas. Pela soberania das esferas…',
    opcoes: [
      'Pode, porque o Estado é soberano sobre tudo.',
      'Pode, desde que a maioria aprove.',
      'Não pode: a igreja responde diretamente a Cristo; o Estado só protege as fronteiras entre as esferas.',
      'Pode, se for em nome do bem comum.',
    ],
    certa: 2,
    gabarito: 'Kuyper ensina que **só Deus é soberano** e que cada esfera recebe dele uma autoridade própria. O Estado tem a tarefa de **proteger as fronteiras** e defender os fracos, mas !!não pode entrar na esfera da igreja!! — e nem a maioria nem o “bem comum” mudam isso. ++Cristo é o único Cabeça da igreja++ ([[Ef 1.22; Cl 1.18]]).',
    ref: '(KUYPER, 2002, terceira palestra; KUYPER, 1998)',
  },
  venn: {
    pergunta: 'Qual destas frases é **teologia política** (e não apenas teologia ou apenas política)?',
    opcoes: [
      '“Deus é trino.”',
      '“A alíquota do imposto deve ser de 12%.”',
      '“Como Deus ordena o magistrado à justiça, o Estado não pode exigir culto.”',
      '“Meu partido é o mais cristão.”',
    ],
    certa: 2,
    gabarito: 'A primeira é teologia; a segunda, uma decisão prudencial de política; a quarta, !!propaganda partidária!!. Só a terceira **parte de uma verdade sobre Deus** (Ele ordena o magistrado) e **tira dela uma conclusão sobre a cidade** (o limite do Estado) — é o encontro das duas áreas ([[Rm 13.4; Ap 13.4]]).',
    ref: '(VANDRUNEN, 2020, Introdução; TOMÁS DE AQUINO, 2001, I, q. 1, a. 7)',
  },
  varrao: {
    pergunta: 'Um governo financia igrejas **em troca de apoio eleitoral**. Isso se parece mais com…',
    opcoes: [
      'Teologia política reformada.',
      'A teologia civil de Varrão: a religião a serviço do poder.',
      'Liberdade religiosa.',
      'Separação saudável entre igreja e Estado.',
    ],
    certa: 1,
    gabarito: 'Na teologia civil, **a cidade usa os deuses** para manter a coesão e o poder; Agostinho a condena por isso. Quando a igreja aceita ser cabo eleitoral em troca de favores, !!faz o papel da “besta da terra”!!, que fala a favor do poder ([[Ap 13.11-12]]). ++A igreja serve à cidade quando permanece livre para julgá-la pela Palavra.++',
    ref: '(AGOSTINHO, 2012, livro VI, cap. 5; SCHMITT, 2006, cap. 3)',
  },
  espectro: {
    pergunta: 'Um cristão afirma: “Fé é assunto privado e não se mistura com política.” **Em que ponto do espectro ele está?**',
    opcoes: [
      'Na fusão: a fé capturada pelo poder.',
      'Na separação: a fé exilada da cidade.',
      'No equilíbrio: distinção sem separação.',
      'Fora do espectro.',
    ],
    certa: 1,
    gabarito: 'Ele separou o que deveria apenas distinguir. A Escritura manda **buscar a paz da cidade** e **orar pelas autoridades** ([[Jr 29.7; 1Tm 2.1-2]]); Calvino chama a magistratura de vocação santa. !!A privatização da fé entrega a vida pública a outros senhores.!! ++Distinguir igreja e Estado não é tirar Cristo da praça.++',
    ref: '(CALVINO, 2009, livro IV, cap. 20, seção 4; KUYPER, 2002, terceira palestra)',
  },
  tempo: {
    pergunta: 'O que une Agostinho, Calvino, Rutherford, Kuyper e VanDrunen, **apesar das diferenças**?',
    opcoes: [
      'Todos defendiam a monarquia.',
      'Todos defendiam a teocracia.',
      'A autoridade civil é real, mas limitada, porque só Deus é soberano.',
      'Todos eram contra o Estado.',
    ],
    certa: 2,
    gabarito: 'Os cinco divergem em muitos pontos (dois reinos, esferas, forma de governo), mas concordam que **o poder civil vem de Deus e está sob Deus**. Rutherford resume no título: a lei está acima do rei. !!Nenhum governante é dono da cidade!!; todos prestarão contas ([[Sl 2.10-12]]).',
    ref: '(RUTHERFORD, 1982; KUYPER, 2002, terceira palestra; VANDRUNEN, 2020)',
  },
  tensao: {
    pergunta: 'Um governo cobra impostos altos e é ineficiente. **Isso o torna a “besta” de Ap 13?**',
    opcoes: [
      'Sim: todo governo ruim é a besta.',
      'Não necessariamente: a besta exige culto e persegue os santos; um governo injusto continua sendo autoridade, a ser honrada e criticada.',
      'Sim, e o cristão deve parar de pagar impostos.',
      'Não: nenhum governo pode se tornar besta.',
    ],
    certa: 1,
    gabarito: 'Paulo manda pagar tributo até a Roma de Nero ([[Rm 13.6-7]]). Calvino ensina que até governantes injustos devem ser honrados, **enquanto não mandarem contra Deus**. A marca da besta não é a ineficiência, mas !!a reivindicação de adoração e a perseguição!! ([[Ap 13.4, 7]]). ++Critique com firmeza, ore e use os meios legais — sem banalizar a categoria bíblica.++',
    ref: '(CALVINO, 2009, livro IV, cap. 20, seções 25-32)',
  },
};

/* ─── Aula 01 ───────────────────────────────────────────────── */

export const QA: Record<string, Pergunta> = {
  erros: {
    pergunta: 'Um pregador usa Rm 13 para dizer que **criticar o presidente é pecado**. Que erro ele comete?',
    opcoes: [
      'Anarquismo.',
      'Estatismo: lê Rm 13 sem Ap 13 e sem At 5.29.',
      'Nenhum: essa é a leitura canônica.',
      'Quietismo.',
    ],
    certa: 1,
    gabarito: 'Rm 13 manda **honrar e sujeitar-se**, não silenciar. Os profetas confrontaram reis ([[2Sm 12.7; Mc 6.18]]) e Paulo apelou aos seus direitos ([[At 25.11]]). Calvino termina as Institutas lembrando que !!a obediência aos governantes nunca pode afastar da obediência a Deus!!. ++Crítica respeitosa é compatível com honra.++',
    ref: '(CALVINO, 2009, livro IV, cap. 20, seção 32; CULLMANN, 1956)',
  },
  mapa: {
    pergunta: 'Se tivéssemos **apenas Gn 9.6**, o que ficaria faltando saber sobre o Estado?',
    opcoes: [
      'Que ele vem de Deus.',
      'Que ele usa a espada.',
      'Seus limites: até onde vai e quando se corrompe.',
      'Que ele deve proteger a vida.',
    ],
    certa: 2,
    gabarito: 'Gn 9.6 mostra a **origem** (Deus delega) e o **meio** (a espada para proteger a imagem de Deus). Rm 13 e 1Pe 2 detalham a função e a postura cristã, mas é Ap 13 que mostra !!o Estado que ultrapassa o mandato!!. Cullmann chama Rm 13 e Ap 13 de **duas faces do mesmo Estado**. ++Por isso lemos o cânon inteiro.++',
    ref: '(CULLMANN, 1956; VANDRUNEN, 2020)',
  },
  vinganca: {
    pergunta: 'Por que Gn 9.6 fundamenta a pena **na imagem de Deus** e não na “utilidade social”?',
    opcoes: [
      'Porque a utilidade social não existe.',
      'Porque a dignidade da vítima, criada à imagem de Deus, exige justiça — e isso também limita a pena.',
      'Porque Deus quer vingança pessoal.',
      'Porque toda pena deve ser a de morte.',
    ],
    certa: 1,
    gabarito: 'Se a pena dependesse só da utilidade, o Estado poderia punir inocentes “para dar exemplo” ou exagerar no castigo. Fundada na **imago Dei**, a justiça protege a vítima e **mede a pena pelo crime** ([[Êx 21.23-25]]). !!O mesmo fundamento que autoriza a espada também a freia.!!',
    ref: '(KLINE, 2000; VANDRUNEN, 2020)',
  },
  aliancas: {
    pergunta: 'Um prefeito **não cristão** é autoridade legítima?',
    opcoes: [
      'Não: só cristãos governam legitimamente.',
      'Sim: o governo civil vem da aliança comum com Noé, feita com toda a humanidade.',
      'Só se tiver sido eleito por cristãos.',
      'Só se aplicar a lei mosaica.',
    ],
    certa: 1,
    gabarito: 'O pacto noaico foi firmado com **“todo ser vivente”** ([[Gn 9.9-10]]), não só com o povo de Deus. Por isso a legitimidade do magistrado **não depende da sua fé**, mas de servir à justiça. Paulo e Pedro mandaram honrar imperadores pagãos ([[Rm 13.1; 1Pe 2.17]]). ++O cristão pode reconhecer e servir governos não cristãos sem trair a fé.++',
    ref: '(VANDRUNEN, 2010a; KUYPER, 2016, v. 1; CALVINO, 2009, livro IV, cap. 20, seção 25)',
  },
  espada: {
    pergunta: 'Uma igreja pode pedir ao Estado que **prenda quem prega doutrina falsa**?',
    opcoes: [
      'Sim: a espada deve defender a verdade.',
      'Não: a igreja corrige pela Palavra e pela disciplina; a espada serve à justiça civil, não à doutrina.',
      'Sim, desde que a heresia seja grave.',
      'Depende do partido que estiver no poder.',
    ],
    certa: 1,
    gabarito: 'Em Rm 12.19 a igreja **renuncia à vingança**; em 13.4 a espada fica com o Estado, para o mal civil. A CFB 1689 confessa que **só Deus é Senhor da consciência** (21.2). !!Westminster 1646 ainda dava ao magistrado o dever de suprimir heresias!! — e a tradição reformada americana revisou esse ponto em 1788. ++A verdade se defende com a Palavra, não com a polícia++ ([[2Co 10.4]]).',
    ref: '(CONFISSÃO de Fé Batista de 1689, cap. 21.2; VANDRUNEN, 2010b)',
  },
  magistrado: {
    pergunta: 'Paulo escreveu Rm 13 **sob Nero**. Isso significa que Nero era um bom governante?',
    opcoes: [
      'Sim: Paulo o elogia.',
      'Não: Paulo define o ofício pela função; toda autoridade é ordenada por Deus, mas é julgada pela finalidade que Deus lhe deu.',
      'Paulo não sabia quem governava Roma.',
      'Rm 13 vale apenas para governos cristãos.',
    ],
    certa: 1,
    gabarito: 'Calvino observa que Paulo descreve **o verdadeiro ofício** do magistrado, e que !!o tirano que o perverte não pode reivindicar para si o elogio do apóstolo!!. O texto manda sujeição mesmo a governos imperfeitos, mas a definição funcional (**punir o mal, louvar o bem**) dá o critério para julgá-los.',
    ref: '(CALVINO, 2001, comentário a Rm 13.1-4; CALVINO, 2009, livro IV, cap. 20, seções 25-29)',
  },
  lealdades: {
    pergunta: 'Num culto, um político é chamado de **“ungido de Deus” e “nossa única esperança”**. Que verbo de 1Pe 2.17 foi violado?',
    opcoes: [
      'Honrar.',
      'Amar.',
      'Temer: a reverência última foi transferida a um homem.',
      'Nenhum.',
    ],
    certa: 2,
    gabarito: 'Pedro manda **honrar** o rei — a mesma honra devida a todos —, mas reserva o **temor** a Deus. Chamar um político de esperança única é !!dar a um homem o que é de Deus!! e flerta com a lógica de Ap 13. ++Ore pelos governantes e honre-os, mas espere somente em Cristo++ ([[Sl 146.3; 1Tm 2.1-2]]).',
    ref: '(VANDRUNEN, 2010a; 1Pe 2.17)',
  },
  escalada: {
    pergunta: 'Em que degrau o cristão passa a ter **o dever de desobedecer**?',
    opcoes: [
      'Já no primeiro imposto alto.',
      'Quando o Estado ordena o que Deus proíbe ou proíbe o que Deus ordena, sobretudo quando exige culto.',
      'Nunca: a submissão é absoluta.',
      'Sempre que discordar politicamente.',
    ],
    certa: 1,
    gabarito: 'Os apóstolos desobedeceram só quando foram proibidos de pregar ([[At 4.19; 5.29]]); os amigos de Daniel, quando mandados adorar a estátua ([[Dn 3.18]]). Discordância política não basta: a linha é **a ordem contrária a Deus**. Calvino lembra que até os reis estão sujeitos a Deus. !!A desobediência é exceção, não estratégia.!!',
    ref: '(CALVINO, 2009, livro IV, cap. 20, seção 32; BEALE, 1999)',
  },
  moeda: {
    pergunta: 'Na lógica de Mc 12.17, **o que NÃO pode ser dado a César**?',
    opcoes: [
      'Os impostos.',
      'O respeito ao cargo.',
      'A consciência e o culto.',
      'A obediência às leis de trânsito.',
    ],
    certa: 2,
    gabarito: 'A moeda traz a imagem de César e volta a César; **o homem traz a imagem de Deus** e pertence a Deus ([[Gn 1.27]]). Tertuliano tira daí o limite: o Estado pode receber tributo e obediência civil, mas !!não a consciência nem a adoração!!.',
    ref: '(TERTULIANO, 1987, cap. 15)',
  },
  teses: {
    pergunta: 'Um governo tenta **santificar a população por lei**, punindo pecados que não causam dano a ninguém. Que tese ele contraria?',
    opcoes: [
      'A da origem.',
      'A da finalidade: o Estado faz justiça pública; não salva nem santifica.',
      'A do dever cristão.',
      'Nenhuma.',
    ],
    certa: 1,
    gabarito: 'A finalidade do magistrado é **punir o mal e louvar o bem** na esfera pública ([[Rm 13.3-4; 1Pe 2.14]]). Santificar é obra do Espírito pela Palavra ([[Jo 17.17]]). !!Quando o Estado tenta salvar, confunde os reinos e invade a consciência.!!',
    ref: '(CONFISSÃO de Fé Batista de 1689, caps. 21 e 24; KUYPER, 2002, terceira palestra)',
  },
  confissoes: {
    pergunta: 'Por que os batistas de 1689 **retiraram do magistrado** o dever de suprimir heresias?',
    opcoes: [
      'Por indiferença à verdade.',
      'Porque só Deus é Senhor da consciência e a espada não alcança o coração; muitos deles haviam sido perseguidos.',
      'Porque o Parlamento obrigou.',
      'Porque achavam que não existiam heresias.',
    ],
    certa: 1,
    gabarito: 'Os batistas particulares **amavam a ortodoxia**: a CFB 1689 segue Westminster quase palavra por palavra. A diferença está em quem a defende: **a igreja, pela Palavra**, e não o Estado, pela espada (21.2; 24). Eles conheciam a prisão por causa da fé. ++Liberdade religiosa não é relativismo, é reconhecer a jurisdição de Cristo sobre a consciência.++',
    ref: '(CONFISSÃO de Fé Batista de 1689, caps. 21.2 e 24; CONFISSÃO de Fé de Westminster, cap. 23.3)',
  },
  mapaErros: {
    pergunta: '“Precisamos eleger um presidente cristão que **vai salvar o Brasil**.” Qual erro está nessa frase?',
    opcoes: [
      'Quietismo.',
      'Messianismo político.',
      'Anarquismo.',
      'Nenhum: é a leitura canônica.',
    ],
    certa: 1,
    gabarito: 'Votar com consciência cristã é legítimo; o problema está em **“salvar”**. Goudzwaard mostra que as ideologias funcionam como !!ídolos que prometem salvação pela política!!. O Estado pode fazer justiça aproximada, mas ++só Cristo salva++ ([[At 4.12; Sl 146.3]]).',
    ref: '(GOUDZWAARD, 1984; GRUDEM, 2014, cap. 1)',
  },
};
