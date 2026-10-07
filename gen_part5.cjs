// Days 274-365 (Estacao IV, Semanas 40-52)
const fs = require('fs');
const path = require('path');
const outPath = path.join(__dirname, 'src/data/devocionalFamiliar.ts');

const dev = (dia, semana, estacao, leitura, subtema, tema, pg, rt, pger, rh, rm, cp, oa, rf) => {
  const o = { dia, semana, estacao, leitura, subtema, tema, tipo: 'devocional',
    perguntaGancho: pg, reflexaoTexto: rt, perguntaGeradora: pger,
    reflexaoHomem: rh, reflexaoMulher: rm, compromissoPratico: cp, oracaoAlianca: oa };
  if (rf) o.reflexaoFilhos = rf;
  return o;
};
const mesa = (dia, semana, estacao, tema, lc) => {
  const o = { dia, semana, estacao, leitura: 'Revisao da semana', subtema: tema, tema, tipo: 'mesa-alianca' };
  if (lc) o.leituraComplementar = lc;
  return o;
};
const aplic = (dia, semana, estacao, subtema, tema, rt, oa) =>
  ({ dia, semana, estacao, leitura: subtema, subtema, tema, tipo: 'aplicacao', reflexaoTexto: rt, oracaoAlianca: oa });

const days = [
  // SEMANA 40 — Tiago
  aplic(274,40,'IV — Fidelidade ate as nupcas','Dia de silencio','Dia de silencio — deixar amadurecer',
    'Inicio da estacao IV com silencio. Passem um tempo contemplando a jornada percorrida — 274 dias de devocional. O que Deus tem feito? O que ainda esta em processo? Escrevam uma palavra que resume esta temporada.',
    'Senhor, que o que fizeste ate aqui nos prepare para o que esta por vir. Amen.'
  ),
  dev(275,40,'IV — Fidelidade ate as nupcas','Tiago 1','Crescer atraves das provacoes e dificuldades do casal','Provas que produzem ouro',
    'Tende por sumo gozo quando cairdes em diversas tentacoes — como o lar tem encontrado gozo genuino no meio das provas?',
    'Tiago 1 e um chamado a perspectiva madura: as provas produzem perseveranca, e a perseveranca produz carater completo. O lar que enfrenta a prova com esse olhar nao apenas sobrevive — emerge mais robusto.',
    'Qual prova atual o lar esta enfrentando — e o que ela esta produzindo: perseveranca ou ressentimento?',
    'Voce tem buscado a sabedoria de Deus para a prova atual — pedindo com fe, sem vacilar, como Tiago instrui?',
    'Como o lar pode desenvolver a perspectiva de ver as provas como oportunidades de completude — nao como interrupcoes indesejadas?',
    'Orem juntos sobre uma prova atual pedindo a sabedoria que Deus da generosamente a todos que pedem.',
    'Senhor, que as provas do lar produzam a perseveranca que nos completa. Que encontremos em ti a sabedoria para navegar. Amen.'
  ),
  aplic(276,40,'IV — Fidelidade ate as nupcas','Dia de pausa','Dia de pausa — aprofundar sem pressa',
    'Pausa avaliativa: onde o lar esta agora em comparacao com o inicio do ano devocional? Leiam juntos o devocional do Dia 6 — a rocha que sustenta o lar — e conversem: o que construimos sobre a rocha? O que ainda precisa ser ajustado?',
    'Senhor, que a pausa seja oportunidade de ajuste e gratidao. Amen.'
  ),
  dev(277,40,'IV — Fidelidade ate as nupcas','Tiago 2','Fe que se prova em atos concretos de amor no lar','Fe sem obras e morta',
    'A fe sem obras e morta — o que isso significa para a espiritualidade do lar que diz crer mas cujos atos cotidianos contradizem o que professa?',
    'Tiago nao contradiz Paulo — ele complementa. A fe que salva produce obras; a fe sem obras nao e fe real. O lar que professa amor a Deus mas nao tem obras de amor ao conjuge e ao proximo esta numa contradicao que Tiago nomeia sem diplomacia.',
    'Quais obras de amor ao conjuge e ao proximo o lar tem produzido como evidencia da fe que professa?',
    'Ha uma necessidade concreta ao redor do lar que voces sabem mas que ainda nao atenderam — e que Tiago chamaria de fe morta?',
    'Como o lar pode criar uma cultura de obras de fe — concreta, regular, verificavel — que evidencie a fe que professa?',
    'Identifiquem uma obra de amor ao conjuge e uma ao proximo para esta semana — e executem-nas.',
    'Senhor, que a nossa fe seja viva, demonstrada em obras de amor. Que o que cremos aparea no que fazemos. Amen.'
  ),
  aplic(278,40,'IV — Fidelidade ate as nupcas','Dia de aplicacao','Dia de aplicacao — gesto concreto no lar',
    'Fe sem obras e morta — entao hoje a obra: sirvam alguem especifico com uma necessidade pratica. Nao o familiar facil, mas alguem que demanda mais. Facam juntos se possivel.',
    'Senhor, que a fe seja pratica. Que o amor saia do lar para fora dele. Amen.'
  ),
  dev(279,40,'IV — Fidelidade ate as nupcas','Tiago 3','Cuidado com as palavras ditas dentro de casa','A lingua dentro do lar',
    'A lingua e um fogo — um mundo de iniquidade. Nenhum ser humano pode dominar a lingua. Como o lar tem manejado o poder destruidor e construidor das palavras?',
    'Tiago 3 usa imagens vividas: leme, freio, fogo. A lingua e pequena e poderosa — pode abençoar e amaldicoar. O lar onde as palavras edificam cria uma atmosfera de seguranca; o lar onde as palavras ferem cria um ambiente de guardas levantadas.',
    'Que padrao de comunicacao do lar precisa mais urgentemente da disciplina que Tiago descreve?',
    'Ha palavras que voce regularmente diz ao conjuge que ferem — e que voce sabe que deveriam ser substituidas por palavras que edificam?',
    'Como o lar pode criar mais consciencia sobre o uso das palavras — sem tornar isso num jogo de policia de linguagem?',
    'Por 7 dias, antes de responder ao conjuge em um momento de tensao, faca uma pausa de 3 segundos. Compartilhem o resultado no fim da semana.',
    'Senhor, domina a nossa lingua. Que as palavras do lar edificem e nao destruam. Amen.'
  ),
  mesa(280,40,'IV — Fidelidade ate as nupcas','Mesa da Alianca — Semana 40'),

  // SEMANA 41
  dev(281,41,'IV — Fidelidade ate as nupcas','Tiago 4','A raiz da briga conjugal e o caminho da humildade','Por que brigamos?',
    'De onde vem as guerras e contendas entre voces? Das vossas concupiscencias — Tiago diagnostica com precisao. O que esta na raiz dos conflitos mais frequentes no lar de voces?',
    'Tiago 4 e um diagnostico dos conflitos: eles vem de desejos que guerreiam dentro de cada pessoa. Nao e o conjuge o inimigo — e o proprio ego que quer o que nao pode ter. O lar que identifica a raiz dos conflitos trata o problema real, nao os sintomas.',
    'Qual desejo nao satisfeito — de controle, de aprovacao, de conforto, de reconhecimento — esta na raiz dos conflitos mais frequentes do lar?',
    'Quando voce briga com o conjuge, voce costuma identificar a raiz do proprio desejo frustrado — ou fica no nivel do comportamento do outro?',
    'Como a humildade diante de Deus — que Tiago associa com a graca recebida — pode ser o caminho de desescalada nos conflitos do lar?',
    'Na proxima briga, parem e perguntem juntos: qual desejo de cada um esta por tras disso? Escutem sem defender.',
    'Senhor, que identifiquemos a raiz dos nossos conflitos. Que a humildade seja o caminho de graca. Amen.'
  ),
  aplic(282,41,'IV — Fidelidade ate as nupcas','Dia de dialogo','Dia de dialogo — ponto em aberto',
    'Conversem sobre um padrao de conflito que se repete no lar — nao o conflito em si, mas o padrao. Quem começa? O que dispara? Como termina? O que cada um sente durante? Escutem com curiosidade, nao com defesa.',
    'Senhor, que o dialogo honesto sobre os padroes liberte o lar dos ciclos que se repetem. Amen.'
  ),
  dev(283,41,'IV — Fidelidade ate as nupcas','Tiago 5','Oracao e cuidado mutuo diante das dificuldades da familia','Orar uns pelos outros',
    'A oracao do justo muito pode em seus efeitos — o lar de voces tem exercitado o poder da oracao intercessora uns pelos outros?',
    'Tiago 5 conecta confissao de pecados, oracao intercessora e cura. A intercessao mutua no lar — orar pelos medos, pelas lutas e pelas necessidades do conjuge — e um dos atos de amor mais poderosos que um casal pode praticar.',
    'Com que frequencia e especificidade voce ora pelo conjuge — pelas areas de luta que conhece, pelos medos que ele compartilhou?',
    'Ha algo que o conjuge tem passado que voce deveria interceder mas nao tem orado — por falta de tempo ou de priorizacao?',
    'Como a confissao mutua — \"confessai uns aos outros os vossos pecados\" — pode aprofundar a intimidade e a intercessao no lar?',
    'Hoje, cada um confessa uma area de luta ao conjuge — e o conjuge ora especificamente sobre ela.',
    'Senhor, que a oracao intercessora seja pratica real do nosso lar. Que confiemos ao Senhor o que carregamos. Amen.'
  ),
  aplic(284,41,'IV — Fidelidade ate as nupcas','Dia de oracao','Dia de oracao — interceder um pelo outro',
    'Orem hoje com a especificidade de Tiago 5 — confessando e intercedendo. Cada um compartilha uma area de fraqueza ou luta e o conjuge ora sobre ela. Depois invertem. Mantanham esse tempo sagrado e nao o interrompam com solucoes.',
    'Senhor, que a oracao mutua seja cura e intimidade. Amen.'
  ),
  dev(285,41,'IV — Fidelidade ate as nupcas','1 Pedro 1','Identidade herdada sustentando a santidade da vida a dois','Identidade que sustenta a santidade',
    'Sede santos porque eu sou santo — a identidade herdada como filhos de Deus e o fundamento da santidade pratica. Como a identidade do lar sustenta o chamado a santidade?',
    'Primeiro Pedro abre com uma doxologia de identidade: nascidos de novo para uma esperanca viva, herdeiros de uma herança incorruptivel. E sobre esse fundamento que Pedro constroi a etica pratica. A santidade nao e esforco moral — e coerencia com quem se e.',
    'Como a identidade como filhos de Deus — herdeiros de uma heranca incorruptivel — sustenta a motivacao para a santidade no cotidiano do lar?',
    'Ha areas do lar onde a santidade tem sido mais esforco do que coerencia de identidade — e o que isso revela?',
    'Como o lar pode relembrar a identidade herdada de forma que sustente a santidade nas areas de luta?',
    'Declarar juntos a identidade: filhos de Deus, herdeiros, nascidos de novo — e orem pedindo coerencia com essa identidade.',
    'Senhor, que a nossa identidade em ti seja o fundamento da nossa santidade. Que a heranca que nos deste motive o chamado que fizeste. Amen.'
  ),
  aplic(286,41,'IV — Fidelidade ate as nupcas','Dia de silencio','Dia de silencio — deixar amadurecer',
    'Silencio de santidade: neste dia, evitem linguagem critica, reclamacoes ou comparacoes — sobre o conjuge, sobre outros, sobre circunstancias. Cada vez que um padrao desses aparecer, substituam por gratidao ou silencio. Avaliem ao final.',
    'Senhor, que o silencio de santidade revele o quanto ainda precisamos crescer — e quanto tu ja trabalhaste em nos. Amen.'
  ),
  mesa(287,41,'IV — Fidelidade ate as nupcas','Mesa da Alianca — Semana 41'),

  // SEMANA 42
  dev(288,42,'IV — Fidelidade ate as nupcas','1 Pedro 2','Proposito comum como casa espiritual construida juntos','Casa espiritual erguida juntos',
    'Vos mesmos, como pedras vivas, sois edificados para ser casa espiritual — como o lar de voces e uma pedra viva na casa espiritual da Igreja?',
    'Primeiro Pedro 2 descreve os crentes como pedras vivas — cada um contribuindo para a construcao da casa espiritual. O lar cristao nao e um fim em si mesmo; e uma unidade dentro de uma construcao maior. A contribuicao do lar para a Igreja e parte do seu proposito.',
    'Como o lar de voces tem contribuido para a construcao da casa espiritual — para a Igreja local e para o Reino?',
    'Voce se ve como pedra viva — contribuinte ativo — ou como observador passivo da obra que outros constroem?',
    'Qual contribuicao especifica o lar pode oferecer a Igreja local nesta temporada?',
    'Conversem sobre a contribuicao do lar para a Igreja e comprometam-se a uma acao especifica de participacao.',
    'Senhor, que o nosso lar seja pedra viva na tua casa espiritual. Que contribuamos para o que constroies. Amen.'
  ),
  aplic(289,42,'IV — Fidelidade ate as nupcas','Dia de pausa','Dia de pausa — aprofundar sem pressa',
    'Pausa de servico: usem este dia para visitar ou contatar alguem que o lar sabe que esta isolado ou precisando de atencao. A pausa e ativa — descanso do ritmo normal, mas investimento em relacao.',
    'Senhor, que a nossa pausa seja bencao para alguem. Amen.'
  ),
  dev(290,42,'IV — Fidelidade ate as nupcas','1 Pedro 3','Um dos textos-chave do NT sobre papeis de esposos e esposas','Papeis que honram a Deus',
    'Igualmente vos, maridos, vivei com elas com conhecimento — e esposas, que se adornem com o incorruptivel adorno de espirito manso e quieto. Como esses chamados moldam o relacionamento de voces?',
    'Primeiro Pedro 3 aborda papeis com sensibilidade ao contexto e clareza de principio. O marido chamado a conhecimento da esposa — a entender, nao apenas a liderar. A esposa chamada a um adorno interior que e incorruptivel. Ambos chamados a ser herdeiros juntos da graca da vida.',
    'O marido: voces vivem juntos com conhecimento real da esposa — suas necessidades, medos, sonhos — ou a lideranca e mais de posicao do que de compreensao?',
    'A esposa: o adorno interior de espirito manso e quieto nao e silencio ou passividade — e a paz interior que nao depende de circunstancias. Como voce tem cultivado esse adorno?',
    'Como o chamado de serem herdeiros juntos da graca da vida reposiciona qualquer hierarquia no lar?',
    'Leiam juntos 1 Pedro 3.1-9 e conversem sobre o que cada um esta sendo chamado a crescer.',
    'Senhor, que honremos os papeis que descreveste — nao como regras mas como expressao de amor. Que sejamos herdeiros juntos da graca da vida. Amen.'
  ),
  dev(291,42,'IV — Fidelidade ate as nupcas','1 Pedro 4','Usar os dons a servico do lar e da igreja','Dons a servico de todos',
    'Conforme cada um recebeu um dom, administrai-o uns aos outros como bons despenseiros da multiforme graca de Deus — como o lar administra os dons recebidos?',
    'A administracao dos dons em 1 Pedro 4 e para servico mutuo — nao para acumulacao pessoal. O lar que usa os dons de cada membro — do conjuge, dos filhos — de forma intencional e generosa e um lar com uma cultura de servico.',
    'Quais dons de cada um do casal estao sendo usados para servico — no lar, na Igreja, na comunidade?',
    'Ha algum dom que voce tem guardado para si — por medo, por falta de oportunidade ou por negligencia — que poderia ser oferecido?',
    'Como o lar pode ser mais intencional na administracao dos dons — de cada membro — para o servico mutuo e externo?',
    'Cada um nomeia um dom do outro que quer ver mais usado — e oferece apoio concreto para que isso aconteca.',
    'Senhor, que sejamos bons despenseiros dos dons que nos deste. Que o lar sirva com o que tem. Amen.'
  ),
  aplic(292,42,'IV — Fidelidade ate as nupcas','Dia de aplicacao','Dia de aplicacao — gesto concreto no lar',
    'Use o dom principal do conjuge para servir alguem hoje — se ele cozinha bem, cozinhe para alguem. Se ela escreve, escreva um encorajamento. Se voce organiza, organize algo para o lar. Use o dom como servico.',
    'Senhor, que os dons sejam usados, nao entesourados. Amen.'
  ),
  dev(293,42,'IV — Fidelidade ate as nupcas','1 Pedro 5','Lideranca servil e humildade mutua dentro de casa','Liderar servindo em casa',
    'Sede todos sujeitos uns aos outros, e sede revestidos de humildade — a sujeicao mutua e o padrao. Como o lar pratica humildade mutua de forma equilibrada?',
    'Primeiro Pedro 5 pede sujeicao mutua — nao apenas de um lado ao outro. A humildade nao e hierarquia; e postura de coracao que cada um traz. O lider que e tambem submisso em humildade e o modelo mais completo.',
    'Como a humildade mutua — de ambos os lados — se manifesta nas decisoes e na comunicacao cotidiana do lar?',
    'Ha uma assimetria na humildade do lar — um dos dois claramente mais humilde e o outro mais rigido?',
    'Como o lar pode cultivar sujeicao mutua de forma pratica — nao como fraqueza, mas como virtude?',
    'Cada um nomeia uma area onde precisa ser mais humilde no lar — e pede ao conjuge que o ajude a crescer nessa area.',
    'Senhor, que revistamos humildade mutua. Que a lideranca no lar seja servil e a sujeicao seja voluntaria. Amen.'
  ),
  mesa(294,42,'IV — Fidelidade ate as nupcas','Mesa da Alianca — Semana 42'),

  // SEMANA 43
  aplic(295,43,'IV — Fidelidade ate as nupcas','Dia de dialogo','Dia de dialogo — ponto em aberto',
    'Conversem sobre um valor que querem que os filhos — ou as geracoes futuras — herdeem do lar de voces. Nao e sobre legado externo, mas sobre carater transmitido. Que pessoa voces querem que o lar produza?',
    'Senhor, que o legado do nosso lar seja de carater e fe. Amen.'
  ),
  dev(296,43,'IV — Fidelidade ate as nupcas','2 Pedro 1','Carater crescente como evidencia de fe genuina no casal','Crescimento de carater visivel',
    'Acrescentai a vossa fe, a virtude; e a virtude o conhecimento; e ao conhecimento a temperanca — a fe genuina produz uma cadeia de crescimento de carater. Como o lar avanca nessa progressao?',
    'Pedro descreve uma cadeia de crescimento que comeca na fe e termina no amor. Nao e uma lista de conquistas — e uma progressao orgânica. O lar que avanca nessa cadeia tem a certeza da propria eleicao como resultado.',
    'Em qual elo da cadeia de 2 Pedro 1 — fe, virtude, conhecimento, temperanca, perseveranca, piedade, amabilidade, amor — o lar mais precisa crescer?',
    'Ha evidencias claras de crescimento de carater no lar nos ultimos meses — que podem ser identificadas e celebradas?',
    'Como o lar pode criar condicoes praticas para que a progressao de carater avance — de forma intencional e verificavel?',
    'Cada um identifica onde esta na cadeia de 2 Pedro 1 e o que precisa para avan<car ao proximo elo.',
    'Senhor, que a fe genuina produza carater crescente no lar. Que avancemos na progressao que descreveste. Amen.'
  ),
  aplic(297,43,'IV — Fidelidade ate as nupcas','Dia de oracao','Dia de oracao — interceder um pelo outro',
    'Orem especificamente pela progressao de carater um do outro — usando a lista de 2 Pedro 1 como guia. Orem por virtude, conhecimento, temperanca, perseveranca, piedade, amabilidade e amor — de forma especifica para cada um.',
    'Senhor, que a nossa intercedo seja especifica e fe. Que o carater do conjuge cresça atraves da nossa oracao. Amen.'
  ),
  dev(298,43,'IV — Fidelidade ate as nupcas','2 Pedro 2','Discernimento contra ensinos que corrompem o lar','Discernir o que corrompe',
    'Houve tambem falsos profetas entre o povo, como entre voces havera falsos mestres — como o lar identifica e resiste a ensinos que corrompem?',
    'Pedro e claro: os falsos mestres sao pessoas reais com mensagens atraentes — prometem liberdade mas trazem escravidao. O lar que nao tem discernimento e vulneravel a versoes de fe que agradam ao ego mas nao transformam.',
    'Ha algum ensinamento — de pregadores, de livros, de influenciadores — que o lar tem absorvido sem suficiente discernimento?',
    'Como voce avalia o que entra no lar em termos de ensinamento espiritual — com que criterios?',
    'Qual pratica de discernimento o lar poderia estabelecer para avaliar os ensinos que consome?',
    'Conversem sobre um ensino popular que merece ser avaliado criticamente com a Escritura como criterio.',
    'Senhor, guarda o lar dos falsos mestres. Que a tua Palavra seja o criterio de todo ensino que recebemos. Amen.'
  ),
  aplic(299,43,'IV — Fidelidade ate as nupcas','Dia de silencio','Dia de silencio — deixar amadurecer',
    'Silencio de discernimento: passem este dia sem redes sociais e sem conteudo de entretenimento. Leiam apenas a Escritura — um salmo, uma carta. Ao final, compartilhem o que a Palavra disse sem o ruido do mundo.',
    'Senhor, que o silencio da tua Palavra seja mais alto do que o barulho do mundo. Amen.'
  ),
  dev(300,43,'IV — Fidelidade ate as nupcas','2 Pedro 3','Viver com o fim — e a promessa final — em vista','Viver a luz do fim',
    'Esperamos novos ceus e nova terra, nos quais habita a justica — como essa promessa muda o que o lar valoriza e busca hoje?',
    'Pedro descreve o fim de tudo com a perspectiva de que o que e eterno permanece. Essa perspectiva nao desvaloriza o presente — ela reposiciona o que vale a pena investir. O lar que vive com o fim em vista faz escolhas diferentes.',
    'Quais prioridades atuais do lar pareceriam pequenas demais ou erradas a luz dos novos ceus e nova terra?',
    'Como a promessa de uma nova criacao onde habita a justica muda a motivacao do lar para buscar justica e santidade agora?',
    'O que o lar estaria investindo de forma diferente se levasse completamente a serio a perspectiva escatologica de 2 Pedro 3?',
    'Conversem sobre uma decisao do lar que mudaria a luz do fim — e considerem mudar.',
    'Senhor, que a promessa dos novos ceus e nova terra reposicione o que o lar busca. Que vivamos a luz do fim. Amen.'
  ),
  mesa(301,43,'IV — Fidelidade ate as nupcas','Mesa da Alianca — Semana 43'),

  // SEMANA 44
  dev(302,44,'IV — Fidelidade ate as nupcas','1 Joao 1','Confissao honesta como habito saudavel do casamento','Caminhar na luz juntos',
    'Se andarmos na luz como ele esta na luz, temos comunhao uns com os outros — como a transparencia mutua cria comunhao real no lar de voces?',
    'Primeiro Joao 1 conecta andar na luz com ter comunhao uns com os outros. A transparencia — nao a perfeicao — cria comunhao genuina. O lar que pratica confissao honesta e tem comunhao real e mais saudavel do que o que mantem aparencias.',
    'Ha areas do lar onde a falta de transparencia tem impedido a comunhao genuina?',
    'Voce tem praticado confissao honesta — com Deus e com o conjuge — de forma regular e sem esperar crises?',
    'Como a confissao regular pode se tornar um habito saudavel do lar — nao algo dramatico, mas uma pratica de manutencao espiritual?',
    'Comprometam-se a uma confissao simples e breve ao conjuge semanalmente — nao de falhas enormes, mas da realidade do coracao.',
    'Senhor, que andemos na luz juntos. Que a confissao honesta seja o que nos da comunhao real. Amen.'
  ),
  aplic(303,44,'IV — Fidelidade ate as nupcas','Dia de pausa','Dia de pausa — aprofundar sem pressa',
    'Pausa de comunhao: escolham uma atividade que ambos gostam — uma refeicao especial, um passeio, um jogo — sem agenda espiritual formal. A comunhao e parte da espiritualidade. Descansem juntos.',
    'Senhor, que o prazer de estar junto seja tambem adoracao. Amen.'
  ),
  dev(304,44,'IV — Fidelidade ate as nupcas','1 Joao 2','Prioridades que nao competem com o amor a Deus dentro de casa','Nao amar o mundo',
    'Nao ameis o mundo, nem o que esta no mundo — o amor ao Pai e o amor ao mundo sao incompativeis. Quais aspectos do mundo o lar de voces tem amado de formas que competem com o amor a Deus?',
    'O mundo que Joao menciona nao e a criacao — e o sistema de valores que se organiza sem referencia a Deus. O lar que ama o mundo — sua aprovacao, seu conforto, suas prioridades — gradualmente perde o amor ao Pai.',
    'Quais valores do mundo — sucesso, aprovacao, conforto, aparencia — tem competido com as prioridades do Reino no lar de voces?',
    'Ha formas de consumo — de entretenimento, de informacao, de cultura — que tem moldado os valores do lar de forma que contradiz o amor ao Pai?',
    'Como o lar pode criar filtros praticos para o que entra — que protejam o amor ao Pai como prioridade?',
    'Identifiquem um elemento de cultura que o lar consome que precisa ser avaliado critica — e decidam juntos como responder.',
    'Senhor, que o nosso amor ao Pai seja maior do que o amor ao mundo. Que as prioridades do lar reflitam o que tu valorizas. Amen.'
  ),
  aplic(305,44,'IV — Fidelidade ate as nupcas','Dia de aplicacao','Dia de aplicacao — gesto concreto no lar',
    'Hoje, substitua uma hora de conteudo digital por algo que nutre o lar — leitura juntos, conversa sem tela, tempo em natureza, musica ao vivo. Avalie como o lar se sente depois dessa substituicao.',
    'Senhor, que encontremos riqueza nas coisas simples que tu criaste. Amen.'
  ),
  dev(306,44,'IV — Fidelidade ate as nupcas','1 Joao 3','Amor que se prova em gestos concretos, nao so palavras','Amor em acao',
    'Nao amemos de palavra nem de lingua, mas em obras e em verdade — o que o lar de voces faz que prova o amor que professa?',
    'O amor que Joao descreve em 1 Joao 3 e verificavel: dar ao irmao necessitado e prova de que o amor de Deus habita em nos. O lar que ama em obras tem uma corda a menos de teoria espiritual e uma corda a mais de realidade vivida.',
    'Quais sao as obras de amor que o lar tem produzido regularmente — que evidenciam que o amor nao e apenas palavra?',
    'Ha alguem com necessidade concreta ao redor do lar que voces sabem mas que tem ignorado — por ocupacao ou por conforto?',
    'Como o lar pode estabelecer uma pratica regular de amor em obras — dentro e fora de si mesmo?',
    'Identifiquem uma necessidade concreta ao redor do lar e atendam-na esta semana.',
    'Senhor, que o nosso amor seja provado em obras. Que nao falemos apenas com palavras mas com acoes verdadeiras. Amen.'
  ),
  aplic(307,44,'IV — Fidelidade ate as nupcas','Dia de dialogo','Dia de dialogo — ponto em aberto',
    'Qual aspecto do lar de voces voces estao mais satisfeitos com o crescimento no ultimo ano — e qual aspecto ainda esta claramente em construcao? Conversem sem pressao de solucoes. Apenas reconheca e celebre.',
    'Senhor, que reconhequemos o que cresceu e continuemos no que ainda precisa crescer. Amen.'
  ),
  mesa(308,44,'IV — Fidelidade ate as nupcas','Mesa da Alianca — Semana 44'),

  // SEMANA 45
  dev(309,45,'IV — Fidelidade ate as nupcas','1 Joao 4','O amor de Deus como base de seguranca para o amor conjugal','Deus e amor — base do lar',
    'Deus e amor, e quem permanece no amor permanece em Deus — como o amor de Deus e a base da seguranca do amor de voces?',
    'Primeiro Joao 4 e o capitulo mais teologico sobre o amor: Deus nao apenas ama — ele e amor. E o amor que vemos em Cristo e o padrao e a fonte do amor humano. O lar que apreende isso nao ama por obrigacao mas por transbordamento.',
    'Como a certeza do amor de Deus — que lanca fora o medo — opera concretamente no amor que voces se dam?',
    'Ha medos de rejeicao ou de perda que ainda contaminam a forma como voces amam um ao outro?',
    'Como o amor perfeito que lanca fora o medo pode ser invocado nos momentos em que o medo de ser rejeitado impede a entrega?',
    'Orem juntos declarando o amor de Deus sobre cada um — e pedindo que o medo seja lancado fora.',
    'Senhor que es amor, que o teu amor seja a base e a fonte do nosso. Que o medo seja lancado fora pela certeza de ser amado. Amen.'
  ),
  aplic(310,45,'IV — Fidelidade ate as nupcas','Dia de oracao','Dia de oracao — interceder um pelo outro',
    'Orem sobre os medos um do outro — de rejeicao, de fracasso, de abandono, de nao ser suficiente. Declarem o amor de Deus sobre esses medos especificos. Orem com ternura e com fe.',
    'Senhor, que o teu amor perfeito lance fora todo medo que habita no nosso lar. Amen.'
  ),
  dev(311,45,'IV — Fidelidade ate as nupcas','1 Joao 5','Certeza que estabiliza o lar em meio as provacoes','Certeza que estabiliza',
    'Este e o amor de Deus: que guardemos os seus mandamentos. E os seus mandamentos nao sao pesados — como a certeza do amor de Deus torna a obediencia leve e o lar estavel?',
    'Primeiro Joao 5 termina com tres certezas: cremos no Filho, temos vida eterna, sabemos que o que pedimos ele ouve. Essas certezas nao sao arrogancia — sao o fundamento da estabilidade do lar em meio a qualquer prova.',
    'Quais certezas da fe voces tem — e como elas estabilizam o lar nos momentos de prova?',
    'Ha alguma area de incerteza espiritual que tem desestabilizado o lar — e que precisaria ser confrontada com as certezas de 1 Joao 5?',
    'Como a certeza de que Deus ouve as oracoes muda a forma como o lar ora nas situacoes dificeis?',
    'Declarem juntos as tres certezas de 1 Joao 5 como declaracao de fe — e orem sobre uma necessidade do lar com essa confianca.',
    'Senhor, que as certezas da fe sejam a estabilidade do lar. Que o que sabemos sobre ti seja mais forte do que o que nao entendemos. Amen.'
  ),
  aplic(312,45,'IV — Fidelidade ate as nupcas','Dia de silencio','Dia de silencio — deixar amadurecer',
    'Silencio de certeza: passem este dia relendo 1 Joao 5 individualmente e escrevendo as certezas que mais os estabilizam. Depois compartilhem — nao o que ainda duvidam, mas o que sabem de forma irremovivel.',
    'Senhor, que o que sabemos sobre ti seja maior do que o que ainda nos escapa. Amen.'
  ),
  dev(313,45,'IV — Fidelidade ate as nupcas','2 Joao 1','Verdade e amor sempre juntos, nunca um sem o outro em casa','Verdade e amor inseparaveis',
    'Aqueles que conheceram a verdade amam por causa da verdade que permanece em nos — como a verdade e o amor sao inseparaveis no lar de voces?',
    'A carta de 2 Joao e breve mas profunda: andar na verdade e amar dentro da verdade — as duas coisas juntas. O lar que tem amor sem verdade pode ser conivente; o que tem verdade sem amor pode ser duro. A combinacao e o padrao.',
    'Ha uma area onde o lar tem colocado amor contra verdade — priorizando um para evitar o desconforto do outro?',
    'Como o lar pode praticar verdade em amor — dizendo o que e verdade com o calor do amor que nao quer machucar mas que nao pode mentir?',
    'Qual verdade dificil precisaria ser dita no lar — e como poderia ser dita com amor real?',
    'Conversem sobre como equilibrar verdade e amor em uma situacao especifica que o lar enfrenta.',
    'Senhor, que a verdade e o amor caminhem juntos no lar. Que nao sacrifiquemos um pelo outro. Amen.'
  ),
  dev(314,45,'IV — Fidelidade ate as nupcas','3 Joao 1','Hospitalidade genuina versus orgulho de posicao dentro do lar','Hospitalidade sem orgulho',
    'Gayo e elogiado pela hospitalidade; Diotrefes e repreendido pelo orgulho de posicao. Como o lar de voces equilibra essas duas tendencias?',
    'Terceiro Joao e um retratto de dois homens: Gayo, que abre a casa; Diotrefes, que quer a posicao. Hospitalidade genuina e o oposto do orgulho que quer controle. O lar hospedeiro serve sem agenda.',
    'O lar de voces pratica hospitalidade genuina — abre a casa sem calcular o que recebe em troca?',
    'Ha uma tendencia de Diotrefes no lar — de controlar quem entra, de fazer do lar um espaco de posicao ao inves de servico?',
    'Como o lar pode praticar hospitalidade mais generosa — com mais abertura e menos calculos de reciprocidade?',
    'Planejem uma refeicao ou encontro com alguem que raramente seria convidado — pelo lar de Gayo, nao pelo circulo de Diotrefes.',
    'Senhor, que sejamos como Gayo — hospitaleiros sem orgulho. Que o lar seja aberto sem agenda. Amen.'
  ),
  mesa(315,45,'IV — Fidelidade ate as nupcas','Mesa da Alianca — Semana 45'),

  // SEMANA 46
  aplic(316,46,'IV — Fidelidade ate as nupcas','Dia de pausa','Dia de pausa — aprofundar sem pressa',
    'Pausa de gratidao: cada um escreve uma carta curta ao conjuge — nao para resolver problemas, mas para expressar gratidao pela jornada de fe compartilhada. Leiam um para o outro antes de dormir.',
    'Senhor, que a gratidao seja mais frequente que a queixa no nosso lar. Amen.'
  ),
  dev(317,46,'IV — Fidelidade ate as nupcas','Judas 1','Vigilancia doutrinaria sem perder a ternura dentro de casa','Velar sem perder a ternura',
    'Contendeis pela fe que uma vez foi dada aos santos — e tambem tende misericordia para com os que duvidam. Como o lar combina firmeza e ternura?',
    'Judas chama a contender pela fe — mas tambem a ter misericordia, salvar, manter uns aos outros no amor de Deus. A vigilancia doutrinaria sem ternura se torna dureza; a ternura sem vigilancia se torna conivencia. O lar precisa das duas.',
    'Qual das duas tendencias — dureza doutrinaria ou permissividade por amor — e mais natural no lar de voces?',
    'Como voce tem combinado firmeza sobre verdades essenciais com misericordia genuina para com o conjuge que vacila?',
    'Qual area do lar precisa de mais vigilancia doutrinaria — e qual precisa de mais ternura?',
    'Conversem sobre uma area onde precisam ser mais firmes e uma onde precisam ser mais tenros — e comprometam-se a ambas.',
    'Senhor, que velemos pela fe sem perder a ternura. Que a firmeza e o amor caminhem juntos. Amen.'
  ),
  aplic(318,46,'IV — Fidelidade ate as nupcas','Dia de aplicacao','Dia de aplicacao — gesto concreto no lar',
    'Um gesto de ternura hoje: nao servico pratico, mas afeto verbal ou fisico. Um abraco demorado, uma palavra de cuidado genuino, uma expressao de amor nao relacionada a performance. Apenas ternura.',
    'Senhor, que a ternura seja tao natural quanto o servico no nosso lar. Amen.'
  ),
  dev(319,46,'IV — Fidelidade ate as nupcas','Apocalipse 1','Cristo reinando sobre todas as circunstancias do lar','Cristo reina sobre o lar',
    'Ele e o Alfa e o Omega, o primeiro e o ultimo — como a soberania absoluta de Cristo sobre a historia inteira muda o que o lar teme e o que o lar espera?',
    'Apocalipse abre com uma visao esmagadora de Cristo soberano: olhos como chama de fogo, voz como voz de muitas aguas, mor e viveu. O lar que tem essa visao de Cristo nao e governado pelo medo das circunstancias.',
    'Qual aspecto da soberania de Cristo em Apocalipse 1 mais fala a uma area de temor no lar de voces?',
    'A visao que Joao teve de Cristo mudou completamente sua perspectiva — como o lar pode renovar sua visao de Cristo?',
    'Como o fato de Cristo ser o primeiro e o ultimo — o que controla o inicio e o fim — da paz para as incertezas atuais do lar?',
    'Leiam juntos Apocalipse 1.17-18 e declarem juntos: \"Nao temamos, pois ele viveu, e esta vivo para sempre.\"',
    'Senhor Alfa e Omega, que a tua soberania sobre tudo seja a paz do nosso lar. Que nao temamos o que tu controlas. Amen.'
  ),
  aplic(320,46,'IV — Fidelidade ate as nupcas','Dia de dialogo','Dia de dialogo — ponto em aberto',
    'Conversem sobre um temor que cada um tem — sobre o futuro, sobre o relacionamento, sobre os filhos. Nao para resolver, mas para nomear e orar. O que nao pode ser dito precisa ser dito para poder ser entregue.',
    'Senhor, que o que tememos possa ser nomeado e entregue a ti. Amen.'
  ),
  dev(321,46,'IV — Fidelidade ate as nupcas','Apocalipse 2','O primeiro amor guardado ou perdido dentro do relacionamento','Guardar o primeiro amor',
    'Tens abandonado o teu primeiro amor — essas palavras para Efeso poderiam ser ditas ao lar de voces?',
    'A Igreja de Efeso tinha obras, perseveranca e doutrina — mas havia perdido o primeiro amor. O casamento que funciona mas perdeu a paixao inicial e o calor original esta no mesmo territorio. Primeiro amor nao e apenas sentimento; e prioridade e deleite no outro.',
    'Ha sinais de que o lar de voces perdeu algo do primeiro amor — do deleite, da prioridade, da busca ativa um pelo outro?',
    'O que o casal fazia no inicio do relacionamento — que expressava deleite e prioridade — que gradualmente parou de fazer?',
    'Como o lar pode guardar e renovar o primeiro amor de forma pratica e intencional?',
    'Cada um identifica uma coisa que fazia no inicio do relacionamento e que quer retomar — e comprometem-se a retoma-la esta semana.',
    'Senhor, que guardemos o primeiro amor. Que o deleite um no outro nao cedapara a routine. Amen.'
  ),
  mesa(322,46,'IV — Fidelidade ate as nupcas','Mesa da Alianca — Semana 46'),

  // SEMANA 47
  aplic(323,47,'IV — Fidelidade ate as nupcas','Dia de oracao','Dia de oracao — interceder um pelo outro',
    'Orem um pelo fervor espiritual do outro — pelo avivamento interior que nao deixa o primeiro amor esfriar. Orem tambem pelas Igrejas ao redor que parecem perder o fervor.',
    'Senhor, que o fervor seja renovado no nosso lar e na Igreja. Amen.'
  ),
  dev(324,47,'IV — Fidelidade ate as nupcas','Apocalipse 3','Fervor espiritual do casal contra a mediocridade confortavel','Nem frio nem quente',
    'Porque es morno e nao quente nem frio, estou a ponto de te vomitar da minha boca — como o lar de voces avalia o seu fervor espiritual atual?',
    'A Igreja de Laodiceia era rica, confortavel e espiritualmente morna — talvez a mais perigosa de todas as sete porque nao percebia seu proprio estado. O conforto material frequentemente esfria o fervor espiritual. O lar precisa verificar regularmente a temperatura.',
    'Em que termometro espiritual voces se colocam — frios, mornos, ou quentes — e por que?',
    'Ha areas onde o conforto do lar — material, relacional, espiritual — tem produzido a mornidao que Cristo condena?',
    'O que seria necessario para que o lar saia da mornidao e volte ao fervor — concretamente?',
    'Avaliem juntos a temperatura espiritual do lar e identifiquem uma acao que poderia elevar o fervor.',
    'Senhor, que o nosso lar nao seja morno. Que o fervor espiritual seja cultivado e nao deixado esfriar pelo conforto. Amen.'
  ),
  dev(325,47,'IV — Fidelidade ate as nupcas','Apocalipse 4','Adoracao como centro que reordena toda a vida a dois','Adoracao que reordena tudo',
    'Santo, Santo, Santo e o Senhor Deus Todo-Poderoso — a adoracao celestial em Apocalipse 4 e o centro que reordena tudo. Como a adoracao esta no centro do lar de voces?',
    'A cena de adoracao em Apocalipse 4 e total: os vinte e quatro ancioes lançam suas coroas diante do trono. Nada e guardado. O lar que tem adoracao genuina no centro e um lar que constantemente relanca as proprias coroas — os proprios status e realizacoes — diante de Deus.',
    'Como a adoracao — genuina, total, sem guardar as coroas — e praticada no lar de voces?',
    'Ha coroas que o lar ainda guarda — status, realizacoes, direitos — que precisariam ser lancadas diante do trono?',
    'Como o lar pode cultivar uma cultura de adoracao que vá além dos momentos formais para o cotidiano?',
    'Dediquem 10 minutos a adoracao genuina juntos — musica, silencio, declaracoes — sem pedir nada, apenas honrando.',
    'Senhor Santo, que a adoracao seja o centro que reordena o nosso lar. Que lancemos as coroas diante de ti. Amen.'
  ),
  aplic(326,47,'IV — Fidelidade ate as nupcas','Dia de silencio','Dia de silencio — deixar amadurecer',
    'Silencio de adoracao: sem palavras, sem lista, sem agenda. Apenas a presenca de Deus. Coloquem musica de adoracao instrumental e fiquem em silencio por 20 minutos. Depois, cada um compartilha uma palavra que resume o que experimentou.',
    'Senhor, que o silencio seja adoracao. Amen.'
  ),
  dev(327,47,'IV — Fidelidade ate as nupcas','Apocalipse 5','So Cristo e digno de dar sentido a historia do casal','O Cordeiro digno',
    'Digno e o Cordeiro que foi morto de receber o poder, a riqueza, a sabedoria, a forca, a honra, a gloria e o louvor — como a dignidade de Cristo e o que da sentido a historia do lar de voces?',
    'O Cordeiro que abriu o livro era o unico digno — nao um anjo, nao um homem, apenas o Cordeiro. O casamento cristao recebe seu sentido mais profundo nao de si mesmo, mas de Cristo. O lar que entende isso nao esta em concorrencia com outros casais; esta em submissao a um proposito maior.',
    'Como a soberania do Cordeiro sobre a historia ilumina o proposito do lar de voces — dentro de uma narrativa maior?',
    'O lar de voces entende seu proprio casamento como parte de uma historia que Deus esta contando — ou vive isolado como proposito em si mesmo?',
    'Como o fato de que so Cristo e digno liberta o lar de ter que provar seu valor ou competir com outros casais?',
    'Leiam juntos Apocalipse 5.9-12 e lourem o Cordeiro juntos — como declaracao de que ele e o centro da historia do lar.',
    'Senhor Cordeiro digno, que sejas o centro de sentido da nossa historia conjugal. Que o lar exista para a tua gloria. Amen.'
  ),
  aplic(328,47,'IV — Fidelidade ate as nupcas','Dia de pausa','Dia de pausa — aprofundar sem pressa',
    'Pausa de adoracao corporativa: se possivel, participem de um culto especial, uma conferencia ou uma reuniao de adoracao esta semana. O lar que adora em comunidade tem sua adoracao aprofundada pela adoracao de outros.',
    'Senhor, que a adoracao corporativa nos una com a nuvem de testemunhas que te louva. Amen.'
  ),
  mesa(329,47,'IV — Fidelidade ate as nupcas','Mesa da Alianca — Semana 47'),

  // SEMANA 48
  dev(330,48,'IV — Fidelidade ate as nupcas','Apocalipse 6','Deus soberano mesmo em meio ao caos e a incerteza do lar','Deus soberano no caos',
    'Os selos de Apocalipse 6 revelam cavaleiros e julgamento — e ainda assim a cena ocorre diante do trono. Como a soberania de Deus sobre o caos ilumina os momentos de caos no lar de voces?',
    'O caos de Apocalipse 6 nao e desordenado — os selos sao abertos pelo Cordeiro, que esta no controle. O lar que entende que mesmo o caos esta sob a soberania de Cristo tem uma estabilidade que o lar sem essa teologia nao pode ter.',
    'Qual situacao de caos — interno ou externo — o lar esta enfrentando que mais precisa da perspectiva da soberania de Cristo?',
    'Como voce comunica a soberania de Deus ao conjuge nos momentos de caos — de forma crivel e nao clichê?',
    'Como a imagem do Cordeiro abrindo os selos pode ser memoria de fe quando o lar enfrenta situacoes que parecem fora de controle?',
    'Orem juntos sobre uma situacao caotica do lar — declarando que o Cordeiro esta no controle.',
    'Senhor soberano, que o teu controle sobre o caos seja a nossa paz. Que nenhuma desordem exceda a tua soberania. Amen.'
  ),
  aplic(331,48,'IV — Fidelidade ate as nupcas','Dia de aplicacao','Dia de aplicacao — gesto concreto no lar',
    'Que gesto de ordem e cuidado pratico o lar pode fazer hoje — que mostre que o amor organiza e nao apenas sente? Organize um espaco do lar que tem causado tensao. Um pequeno ato de ordem como expressao de cuidado.',
    'Senhor, que o amor produza ordem e cuidado no cotidiano. Amen.'
  ),
  dev(332,48,'IV — Fidelidade ate as nupcas','Apocalipse 7','Pertencimento seguro em meio a multidao de vozes do mundo','Selados em meio ao caos',
    'Vi uma grande multidao que ninguem podia numerar, de todas as nacoes, tribos, povos e linguas — como a certeza de pertencer ao povo de Deus estabiliza o lar em meio a confusao de identidades do mundo?',
    'Os selados de Apocalipse 7 sao identificados e seguros — em meio a tribulacao. A identidade como povo de Deus e mais estavel do que qualquer identidade cultural, politica ou social. O lar que sabe disso nao e perturbado pelas vozes que disputam sua lealdade.',
    'Como a identidade como parte do povo de Deus selado estabiliza o lar diante das multiplas identidades que o mundo oferece?',
    'Ha vozes ao redor que tem desafiado a identidade primaria do lar como povo de Deus — e como voces tem respondido?',
    'Como o lar pode reforcar regularmente a identidade primaria — filhos de Deus, selados pelo Espirito — de forma que ela seja mais forte do que as identidades secundarias?',
    'Declarar juntos: \"Somos do povo de Deus, selados pelo Espirito\" — como afirmacao de identidade e oracao.',
    'Senhor, que nossa identidade como teu povo seja mais forte do que todas as outras identidades. Que o selo do Espirito seja seguranca em meio ao caos. Amen.'
  ),
  aplic(333,48,'IV — Fidelidade ate as nupcas','Dia de dialogo','Dia de dialogo — ponto em aberto',
    'Qual voz externa — de cultura, de redes, de familia, de trabalho — tem mais influenciado o lar de forma que voces precisariam reavaliar? Conversem sobre isso com honestidade e sem julgamento mutuo.',
    'Senhor, que a tua voz seja a mais alta no nosso lar. Amen.'
  ),
  dev(334,48,'IV — Fidelidade ate as nupcas','Apocalipse 8','Reverencia diante do julgamento e da santidade de Deus','Silencio diante da santidade',
    'Fez-se silencio no ceu por quase meia hora — como o lar pratica reverencia genuina diante da santidade e do julgamento de Deus?',
    'O silencio do ceu diante do setimo selo e um dos momentos mais poderosos de toda a Biblia. A santidade de Deus exige silencio — nao porque Deus seja intimidador, mas porque ele e real de uma forma que exige respeito.',
    'O lar de voces pratica reverencia genuina — momentos de silencio diante da santidade de Deus — ou a espiritualidade e toda de palavras e atividade?',
    'Como a reverencia diante do julgamento de Deus muda a forma como o lar trata o pecado — com seriedade, nao com permissividade?',
    'Qual pratica o lar poderia criar para cultivar momentos de silencio reverente diante de Deus?',
    'Passem 5 minutos em silencio completo — sem oracao formal, sem musica — apenas presenca diante de Deus.',
    'Senhor Santo, que a nossa reverencia seja real. Que o silencio diante de ti seja adoracao genuina. Amen.'
  ),
  aplic(335,48,'IV — Fidelidade ate as nupcas','Dia de oracao','Dia de oracao — interceder um pelo outro',
    'Orem hoje em silencio — sem palavras — por 10 minutos. Depois orem em voz alta por uma necessidade especifica do conjuge. A combinacao de silencio reverente e oracao especifica e poderosa.',
    'Senhor, que o silencio e as palavras sejam igualmente oracao. Amen.'
  ),
  mesa(336,48,'IV — Fidelidade ate as nupcas','Mesa da Alianca — Semana 48'),

  // SEMANA 49
  dev(337,49,'IV — Fidelidade ate as nupcas','Apocalipse 9','A seriedade do pecado nao arrependido dentro de casa','Seriedade do pecado nao resolvido',
    'E os outros homens que nao foram mortos por estas pragas nao se arrependeram — a dureza que resiste ao arrependimento e um dos temas mais assustadores de Apocalipse. Ha algo no lar onde a dureza tem resistido ao arrependimento?',
    'Os julgamentos de Apocalipse 9 sao projetados para produzir arrependimento — e nao produzem. A dureza do coracao humano e aterradora. O lar que permite que padroes de pecado persistam sem arrependimento esta nesse territorio.',
    'Ha algum padrao persistente no lar — de comunicacao, de relacionamento, de habito — que tem resistido ao arrependimento e a mudanca?',
    'Voce tem sido rapido para se arrepender quando fere o conjuge — ou a dureza tem retardado o processo?',
    'Como o lar pode criar uma cultura onde o arrependimento e rapido, facil e genuino — sem esperar que a situacao exploda?',
    'Se ha algo que resistiu ao arrependimento, hoje e o dia de se arrepender — em voz alta, diante do conjuge e de Deus.',
    'Senhor, guarda-nos da dureza que resiste ao arrependimento. Que o nosso coracao seja rapido para se humilhar. Amen.'
  ),
  dev(338,49,'IV — Fidelidade ate as nupcas','Apocalipse 10','A Palavra que e doce e amarga, mas sempre necessaria ao lar','Palavra doce e amarga',
    'Era doce na minha boca como mel, mas quando o comi, o meu estomago ficou amargo — como a Palavra de Deus tem sido doce e amarga no lar de voces?',
    'A experiencia de Joao com o livro pequeno e uma imagem da propria Palavra de Deus: doce de conhecer, amarga de viver. O evangelho e gracioso para o pecador — e exigente para o discipulo. O lar que conhece apenas a doçura sem a amargura da exigencia esta com um evangelho incompleto.',
    'Em quais areas da vida do lar a Palavra de Deus tem sido amarga — exigente, desafiadora, reordenadora?',
    'Voce tem fugido da amargura da Palavra — das exigencias do evangelho — ou tem a recebido mesmo quando e dificil de engolir?',
    'Como o lar pode criar uma relacao mais honesta com a Palavra — que inclua receber tanto o consolo quanto o desafio?',
    'Identifiquem uma passagem da Escritura que e amarga para o lar — que exige algo dificil — e orem sobre ela.',
    'Senhor, que recebamos tua Palavra completa — doce e amarga. Que nao fiquemos com a metade que agrada. Amen.'
  ),
  aplic(339,49,'IV — Fidelidade ate as nupcas','Dia de silencio','Dia de silencio — deixar amadurecer',
    'Silencio de recepcao: leiam uma passagem dificil da Escritura — uma que exige algo que voces ainda nao fizeram. Fiquem com ela em silencio. Nao expliquem, nao contextualizem. Apenas deixem a Palavra ser amarga onde precisa ser.',
    'Senhor, que recebamos tua Palavra mesmo quando ela e amarga. Amen.'
  ),
  dev(340,49,'IV — Fidelidade ate as nupcas','Apocalipse 11','Testemunho fiel do casal mesmo sob oposicao externa','Testemunho fiel sob oposicao',
    'As duas testemunhas profetizaram por mil duzentos e sessenta dias — fidelidade ao longo do tempo, mesmo sob oposicao. Como o lar tem sido testemunho fiel ao longo do tempo?',
    'As duas testemunhas de Apocalipse 11 sao mais poderosas juntas do que separadas. O casal cristao que testemunha junto — com consistencia e ao longo do tempo, mesmo sob oposicao — e uma testemunha da fidelidade de Deus.',
    'O testemunho do lar de voces tem sido consistente ao longo do tempo — nao apenas nos momentos faceis?',
    'Ha alguma oposicao externa ao testemunho do lar que tem enfraquecido a fidelidade de voces?',
    'Como o lar pode ser testemunha mais consistente — ao longo do tempo, sem depender de momentos heroicos?',
    'Conversem sobre como o lar quer ser lembrado em termos de testemunho — daqui a 10, 20 anos.',
    'Senhor, que sejamos testemunhas fieis ao longo do tempo. Que a oposicao nao cale o nosso testemunho. Amen.'
  ),
  aplic(341,49,'IV — Fidelidade ate as nupcas','Dia de pausa','Dia de pausa — aprofundar sem pressa',
    'Pausa de perspectiva: sentem juntos com um mapa ou lista das coisas que o lar conquistou espiritualmente neste ano. O que foi plantado? O que cresceu? O que ainda esta em semente? Celebrem o que ja e real.',
    'Senhor, que o que fizeste seja reconhecido e celebrado. Amen.'
  ),
  dev(342,49,'IV — Fidelidade ate as nupcas','Apocalipse 12','A batalha espiritual por tras da historia de toda familia','A batalha pelo lar',
    'Houve uma guerra no ceu — e o dragao persegue a mulher e seu filho. Como o lar de voces entende a batalha espiritual que esta por tras de cada familia crista?',
    'Apocalipse 12 revela que por tras das historias de familias ha uma batalha espiritual real. O dragao que perseguiu a mulher do capitulo 12 e o mesmo que ataca cada familia crista. Entender isso nao e paranoia — e realismo espiritual que leva a oracao seria.',
    'Como o lar tem levado a serio a batalha espiritual que ocorre por tras das circunstancias visíveis do relacionamento?',
    'Voce e proativo em guerra espiritual — em armadura e oracao — ou so percebe a batalha quando ja esta perdendo no campo visievel?',
    'Como o lar pode ser mais vigilante e mais armado — de forma pratica, nao apenas teorica?',
    'Orem juntos usando a linguagem da batalha espiritual — colocando a armadura de Efesios 6 e declarando a vitoria do Cordeiro.',
    'Senhor, que o lar seja vigilante na batalha espiritual. Que armados da tua armadura nao cedamos ao inimigo. Amen.'
  ),
  mesa(343,49,'IV — Fidelidade ate as nupcas','Mesa da Alianca — Semana 49'),

  // SEMANA 50
  aplic(344,50,'IV — Fidelidade ate as nupcas','Dia de aplicacao','Dia de aplicacao — gesto concreto no lar',
    'Um gesto de fidelidade: faca algo que o conjuge pediu ha tempo mas que voce adiou. A fidelidade nas coisas pequenas e o alicerce da confianca nas grandes. Fazer o que foi prometido, sem lembrete.',
    'Senhor, que a fidelidade nas coisas pequenas construa confianca duradoura. Amen.'
  ),
  dev(345,50,'IV — Fidelidade ate as nupcas','Apocalipse 13','Discernimento contra falsificacoes religiosas e culturais','Discernir o falso',
    'A besta imita o Cordeiro — tem chifres como cordeiro mas fala como dragao. Como o lar cultiva discernimento contra imitacoes do verdadeiro que parecem atraentes?',
    'A besta de Apocalipse 13 e perigosa exatamente porque imita o Cordeiro. As falsificacoes mais perigosas sao as que mais se parecem com o original. O lar que nao tem discernimento e seduzido pelo que parece cristao mas nao e.',
    'Quais imitacoes religiosas ou culturais do genuino tem entrado no lar de voces de forma sutil?',
    'Como o lar cultiva discernimento suficiente para reconhecer o falso mesmo quando parece verdadeiro?',
    'Qual pratica de discernimento — comparacao com a Escritura, accountability comunitaria, oracoes de discernimento — o lar poderia fortalecer?',
    'Conversem sobre uma imitacao especifica que o lar reconhece — e como responderam ou vao responder a ela.',
    'Senhor, guarda o lar das imitacoes do verdadeiro. Que o discernimento do Espirito proteja o que cremos. Amen.'
  ),
  aplic(346,50,'IV — Fidelidade ate as nupcas','Dia de dialogo','Dia de dialogo — ponto em aberto',
    'Conversem sobre o que ainda esta por fazer no lar — promessas pendentes, valores ainda nao vividos, padroes que precisam de resolucao. Com calma e honestidade, identifiquem os dois ou tres principais. Nao para resolver agora, mas para nomear.',
    'Senhor, que o que nomeamos seja encaminhado com sabedoria. Amen.'
  ),
  dev(347,50,'IV — Fidelidade ate as nupcas','Apocalipse 14','Pertencer ao povo fiel, nao ao sistema que se corrompe','Pertencer ao Cordeiro',
    'Estes sao os que seguem o Cordeiro por onde quer que ele va — a lealdade ao Cordeiro acima de qualquer outro sistema. Como o lar demonstra essa lealdade primaria?',
    'Os 144.000 em Apocalipse 14 sao os que seguem o Cordeiro — sua lealdade nao e dividida. O lar que pertence ao Cordeiro nao e definido pelo sistema cultural, economico ou politico ao redor; e definido pelo Cordeiro que segue.',
    'Ha um sistema — cultural, economico, politico, religioso — que o lar tem seguido com lealdade que compete com a lealdade ao Cordeiro?',
    'O lar demonstra pertencimento ao Cordeiro de forma que outros possam ver — nao por ostentacao, mas por coerencia de vida?',
    'Como o lar pode afirmar e viver a lealdade ao Cordeiro de forma mais clara e menos ambigua?',
    'Declarem juntos: \"Pertencemos ao Cordeiro\" — e conversem sobre o que isso muda concretamente.',
    'Senhor Cordeiro, que pertencamos a ti de forma inequivoca. Que nenhum outro sistema defina o nosso lar. Amen.'
  ),
  dev(348,50,'IV — Fidelidade ate as nupcas','Apocalipse 15','A justica de Deus plenamente revelada no fim da historia','A justica de Deus revelada',
    'Grandes e maravilhosas sao as tuas obras, Senhor Deus Todo-Poderoso; justos e verdadeiros sao os teus caminhos — como a certeza da justica final de Deus muda a forma como o lar trata as injusticas presentes?',
    'O cantico de Moises e do Cordeiro em Apocalipse 15 e um hinario de justica — louvor pela justia de Deus que sera plenamente revelada. O lar que canta esse hino no presente — mesmo diante de injusticas — tem uma perspectiva que transforma.',
    'Quais injusticas o lar tem sofrido que sao mais dificeis de colocar sob a perspectiva da justica final de Deus?',
    'Como a certeza de que a justica de Deus sera plenamente revelada liberta o lar de buscar vinganca ou de guardar amargura?',
    'Como o louvor antecipado pela justica de Deus pode mudar a postura do lar diante das injusticas atuais?',
    'Orem juntos com o hino de Apocalipse 15.3-4 — louvor antecipado pela justica que Deus trara.',
    'Senhor justo, que confiemos na tua justica final. Que o louvor antecipado liberte o lar da amargura presente. Amen.'
  ),
  aplic(349,50,'IV — Fidelidade ate as nupcas','Dia de oracao','Dia de oracao — interceder um pelo outro',
    'Orem pela justica ao redor do lar — pessoas que sofrem injustica, situacoes sem resolucao, dores que o lar conhece. A intercedo pela justica e uma das oracoes mais poderosas que um lar crista pode fazer.',
    'Senhor justo, que a nossa intercedo alcance onde a injustica persiste. Amen.'
  ),
  mesa(350,50,'IV — Fidelidade ate as nupcas','Mesa da Alianca — Semana 50'),

  // SEMANA 51
  dev(351,51,'IV — Fidelidade ate as nupcas','Apocalipse 16','A seriedade final do julgamento de Deus','O julgamento que vem',
    'Eis que venho como ladrao — como a certeza do julgamento vindouro muda as escolhas do lar de voces hoje?',
    'Os copos da ira em Apocalipse 16 sao o julgamento acumulado que chega. Para o lar cristao, esse texto nao e terror — e urgencia. A seriedade do julgamento de Deus sobre o pecado e o fundamento da seriedade com que o lar trata o arrependimento e a santidade.',
    'Como a certeza do julgamento vindouro — e da urgencia do presente — muda o que o lar prioriza?',
    'Ha padroes de pecado no lar que estao sendo tratados sem suficiente seriedade — que o texto de Apocalipse 16 chamaria de urgencia?',
    'Como o lar pode viver com a urgencia de quem sabe que o julgamento e real — sem cair em ansiedade, mas com seriedade e clareza?',
    'Conversem sobre uma area que a seriedade do julgamento de Deus chama o lar a tratar com mais urgencia.',
    'Senhor que julgara tudo, que a seriedade do teu julgamento produza seriedade com o pecado e urgencia na santidade. Amen.'
  ),
  aplic(352,51,'IV — Fidelidade ate as nupcas','Dia de silencio','Dia de silencio — deixar amadurecer',
    'Silencio de urgencia: passem este dia com a pergunta: se soubessemos que Cristo voltaria em 30 dias, o que mudaria no lar? Nao como ansiedade, mas como clarificador de prioridades. Escrevam separadamente e depois compartilhem.',
    'Senhor, que a tua vinda iminente seja clarificadora das nossas prioridades. Amen.'
  ),
  dev(353,51,'IV — Fidelidade ate as nupcas','Apocalipse 17','Advertencia contra a seducao de sistemas e valores falsos','Seducao do mundo',
    'A prostituta da Grande Babilonia seduz com riqueza e poder — como o lar resiste a seducao do sistema que o mundo oferece?',
    'Babilonia em Apocalipse 17 representa um sistema sedutor — que parece glorioso mas e corruptivel. A seducao e a caracteristica principal: nao e violenta, e atraente. O lar que nao percebe a seducao e o mais vulneravel a ela.',
    'Quais aspectos do sistema sedutor do mundo — sucesso material, aprovacao social, conforto — tem atraido o lar de voces?',
    'Ha um padrao de consumo ou de ambicao no lar que ecoa Babilonia mais do que o Reino de Deus?',
    'Como o lar pode criar resistencia contra a seducao — nao por isolamento, mas por clareza de identidade e valores?',
    'Conversem sobre um aspecto do \"sistema Babilonia\" que o lar reconhece como sedutor — e renovem juntos a lealdade ao Cordeiro.',
    'Senhor, que percebamos a seducao antes de sermos seduzidos. Que a lealdade ao Cordeiro seja mais forte que o apelo de Babilonia. Amen.'
  ),
  aplic(354,51,'IV — Fidelidade ate as nupcas','Dia de pausa','Dia de pausa — aprofundar sem pressa',
    'Pausa de limpeza: faca uma limpeza de conteudo — aplicativos, seguidores, assinaturas, habitos de consumo — que o lar sabe que contribui para a seducao de Babilonia. Limpeza pratica como ato espiritual.',
    'Senhor, que a limpeza do consumo seja expressao de lealdade a ti. Amen.'
  ),
  dev(355,51,'IV — Fidelidade ate as nupcas','Apocalipse 18','Nao se apegar ao que esta condenado a cair','Sair de Babilonia',
    'Sai dela, povo meu — o chamado a separacao de Babilonia e urgente. O que no lar de voces esta excessivamente apegado ao que esta condenado a cair?',
    'O chamado de Apocalipse 18 e radical: sair antes que Babilonia caia. Nao e isolamento do mundo — e nao compartilhar dos pecados do sistema que sera julgado. O lar que identifica seus apegos ao sistema Babilonia e pode solta-los tem uma liberdade especial.',
    'Quais apegos do lar — materiais, relacionais, de estilo de vida — estao mais alinhados com Babilonia do que com o Reino?',
    'O lar esta suficientemente desapegado do que e temporal para poder se mover rapidamente quando Deus chamar?',
    'Que passo concreto de desapego o lar pode dar — não por ascetismo, mas por lealdade ao que nao cai?',
    'Identifiquem um apego especifico que querem soltar — e orem sobre ele pedindo liberdade.',
    'Senhor, que saiamos de Babilonia antes que ela caia. Que o nosso apego seja ao que nao cai, nao ao que e temporario. Amen.'
  ),
  aplic(356,51,'IV — Fidelidade ate as nupcas','Dia de aplicacao','Dia de aplicacao — gesto concreto no lar',
    'Um gesto de desapego: doe algo de valor — dinheiro, tempo, um objeto — que o lar tem guardado. Nao o que sobra, mas algo que custa soltar. O desapego pratico enfraquece o apego espiritual ao temporario.',
    'Senhor, que o desapego seja expressao de liberdade e de confianca em ti. Amen.'
  ),
  mesa(357,51,'IV — Fidelidade ate as nupcas','Mesa da Alianca — Semana 51'),

  // SEMANA 52 — FINAL
  dev(358,52,'IV — Fidelidade ate as nupcas','Apocalipse 19','As nupcas do Cordeiro: o destino de toda alianca conjugal crista','As bodas do Cordeiro',
    'Chegaram as nupcas do Cordeiro, e a sua esposa se preparou — o casamento humano e icone profético das nupcas eternas. Como essa realidade final muda a forma como o casal ve o proprio casamento?',
    'Apocalipse 19 revela o destino de toda alianca conjugal crista: as bodas do Cordeiro, onde a noiva — a Igreja — finalmente se une ao Noivo — Cristo — para sempre. O casamento humano e dado por Deus como antecipacao dessa realidade. Viver o casamento com essa perspectiva muda tudo.',
    'Como a certeza das nupcas do Cordeiro muda a forma como voces enxergam o proprio casamento — como imagem de algo eterno, nao apenas como arranjo humano?',
    'O lar de voces tem se preparado como a noiva se prepara — com expectativa, adoracao e pureza?',
    'Como a perspectiva de que o melhor ainda vem — as nupcas eternas — sustenta a fidelidade nas temporadas de dificuldade?',
    'Leiam juntos Apocalipse 19.6-9 e orem um pelo outro com a perspectiva das nupcas eternas.',
    'Senhor Noivo, que o nosso casamento seja icone fiel das tuas nupcas. Que vivamos com a expectativa e a pureza da noiva que se prepara. Amen.'
  ),
  dev(359,52,'IV — Fidelidade ate as nupcas','Apocalipse 20','A justica definitiva de Deus sobre toda a historia','O livro da vida',
    'Vi os mortos, grandes e pequenos, em pe diante do trono — o julgamento final e universal. Como a realidade do livro da vida molda a forma como o lar vive o presente?',
    'O julgamento final de Apocalipse 20 e uma cena de justica absoluta e transparencia total. Os livros sao abertos — tudo registrado. O lar que vive com consciencia dessa transparencia final e mais honesto e mais cuidadoso com o que faz no escuro.',
    'O lar de voces vive com a consciencia de que ha registros — de que o que e feito em secreto e conhecido por Deus?',
    'Como a certeza do julgamento final produz urgencia para o evangelismo e para o investimento no eterno?',
    'O nome de cada um de voces esta no livro da vida — como essa certeza muda a forma como vivem o presente?',
    'Orem juntos pela certeza da salvacao e pela urgencia do evangelismo — luz da realidade do livro da vida.',
    'Senhor do julgamento final, que vivamos com transparencia e urgencia. Que os nossos nomes no livro da vida nos mova a agir com fidelidade. Amen.'
  ),
  aplic(360,52,'IV — Fidelidade ate as nupcas','Dia de dialogo','Dia de dialogo — ponto em aberto',
    'Conversa final sobre a jornada de 365 dias: o que mais cresceu no lar? O que mais surpreendeu? O que voces querem que seja diferente no proximo ano? Nao e avaliacao — e gratidao e visao.',
    'Senhor, que a conversa sobre a jornada nos prepare para o proximo capitulo. Amen.'
  ),
  dev(361,52,'IV — Fidelidade ate as nupcas','Apocalipse 21','O lar eterno sem lagrimas e sem separacao','O lar eterno',
    'Enxugara Deus toda lagrima de seus olhos; a morte nao existira mais, nao havera luto, nem pranto, nem dor — como essa promessa fala ao lar e a todas as suas dores?',
    'Apocalipse 21 e a pagina final da historia — o lar eterno de Deus com a humanidade. Nenhuma dor do casamento, nenhuma perda sofrida, nenhuma lagrima chorada fica sem resposta aqui. O lar eterno e o destino para o qual todo lar fiel aponta.',
    'Qual dor especifica do lar — que ainda nao foi curada completamente — mais precisa de ser colocada sob a luz de Apocalipse 21?',
    'Como a promessa do lar eterno sem separacao sustenta a fidelidade do casal nas temporadas em que o casamento e dificil?',
    'Que aspecto do lar eterno voces mais anseiam — e como isso reposiciona as dores e as bençoes do lar presente?',
    'Leiam juntos Apocalipse 21.1-5 e orem sobre uma dor do lar que precisa de cura — com a esperanca do lar eterno.',
    'Senhor, que a promessa do lar eterno sustente o nosso lar presente. Que nenhuma lagrima seja em vao e nenhuma separacao seja definitiva. Amen.'
  ),
  aplic(362,52,'IV — Fidelidade ate as nupcas','Dia de oracao','Dia de oracao — interceder um pelo outro',
    'Orem pela vitoria do amor sobre tudo o que tentou dividir o lar neste ano. Orem pela renovacao do amor — do primeiro amor — para a temporada que comeca. Orem com gratidao e com expectativa.',
    'Senhor, que o amor vença. Que o proximo capitulo seja melhor do que o anterior. Amen.'
  ),
  dev(363,52,'IV — Fidelidade ate as nupcas','Apocalipse 22','Esperanca viva sustentando cada dia de espera do casal','Ven, Senhor Jesus',
    'Ven, Senhor Jesus — essas tres palavras sao o credo final do crente. Como a esperanca do retorno de Cristo sustenta o lar na espera?',
    'O ultimo capitulo da Biblia termina com um convite e com um clamor: o Espirito e a noiva dizem \"Vem!\" e Joao diz \"Ven, Senhor Jesus.\" O lar que termina o ano — e cada dia — com esse clamor esta posicionado na perspectiva certa.',
    'O lar de voces vive com a expectativa genuina do retorno de Cristo — de forma que muda o que prioriza e como ama?',
    'O clamor \"Ven, Senhor Jesus\" e ao mesmo tempo oracao, esperanca e missao — como o lar vive as tres dimensoes?',
    'Como o lar pode cultivar a expectativa do retorno de Cristo de forma que seja formativa — e nao apenas doctrinal?',
    'Terminem o devocional de hoje com as ultimas palavras da Biblia: leiam juntos Apocalipse 22.20-21.',
    'Ven, Senhor Jesus. Que a nossa esperanca no teu retorno sustente cada dia do lar que construimos para a tua gloria. A graca do Senhor Jesus seja com todos nos. Amen.'
  ),
  mesa(364,52,'IV — Fidelidade ate as nupcas','Mesa da Alianca — Semana 52','Apocalipse 19.6-9 — o destino da alianca: as nupcas do Cordeiro'),
  aplic(365,52,'IV — Fidelidade ate as nupcas','Vigilia de Consagracao da Alianca','Vigilia de Consagracao — Renovacao dos votos',
    'Chegamos ao dia 365 — um ano de leitura expositiva do Novo Testamento inteiro. Usem este dia para uma Vigilia de Consagracao: retomem os votos do casamento, ou faca votos pela primeira vez se for casal namorando. Leiam juntos o que Deus fez neste ano. Celebrem com uma refeicao especial. Orem renovando o compromisso um com o outro e diante de Deus. Este nao e o fim — e o inicio do proximo capitulo da alianca.',
    'Senhor, que a alianca que consagramos hoje seja mais forte do que no inicio. Que os proximos 365 dias sejam ainda mais fieis, mais profundos e mais plenos de ti. Amen.'
  ),
];

let content = '';
for (const d of days) {
  content += '  ' + JSON.stringify(d) + ',\n';
}

content += '];\n';

fs.appendFileSync(outPath, content);
console.log('Part 5 done, days 274-365, file size:', fs.statSync(outPath).size);
