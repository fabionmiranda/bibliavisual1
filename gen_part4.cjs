// Days 183-273 (Estacao III, Semanas 27-39)
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
  // SEMANA 27 — Efesios
  aplic(183,27,'III — A vida domestica da alianca','Dia de pausa','Dia de pausa — aprofundar sem pressa',
    'Pausa e nao paralisia. Usem este dia para reler um devocional da semana que ficou incompleto, conversar sobre algo que surgiu mas nao foi aprofundado, ou simplesmente estar presentes um para o outro sem agenda espiritual formal.',
    'Senhor, que o descanso seja tambem pratica espiritual. Que a pausa nos prepare para o proximo passo. Amen.'
  ),
  dev(184,27,'III — A vida domestica da alianca','Efesios 1','Identidade segura em Cristo antes de qualquer conquista do casal','Identidade segura em Cristo',
    'Bento seja o Deus que nos abenoou com toda a bencao espiritual nos lugares celestiais em Cristo — como essa identidade ja completa muda a forma como voces buscam coisas no relacionamento?',
    'Efesios 1 e um capitulo de identidade: eleitos, adotados, redimidos, selados. Tudo isso ja e — antes de qualquer conquista. O lar que opera a partir dessa identidade segura nao precisa provar valor nem conquistar aprovacao.',
    'Qual aspecto da sua identidade em Cristo voce ainda nao internalizou suficientemente para que ela mude a forma como se comporta no lar?',
    'Voce lidera e ama o conjuge a partir de uma identidade segura — ou a partir da necessidade de provar algo?',
    'Como a seguranca da identidade em Cristo liberta a forma como voce ama — sem condicoes, sem medo de rejeicao?',
    'Leiam juntos Efesios 1.3-14 e declarem sobre si mesmos a identidade que Paulo descreve.',
    'Senhor, que saibamos quem somos em ti antes de buscarmos qualquer outra coisa. Que a identidade segura em Cristo seja o chao do lar. Amen.'
  ),
  dev(185,27,'III — A vida domestica da alianca','Efesios 2','Reconciliacao como fundamento da nova familia em Cristo','Reconciliados para formar familia',
    'Pelo sangue de Cristo os que estavam longe foram aproximados — como a reconciliacao com Deus e o fundamento de toda outra reconciliacao no lar?',
    'Efesios 2 e o capitulo da nova humanidade: judeus e gentios unidos em Cristo, nao por esforco proprio mas pela obra da cruz. O lar cristao e uma pequena imagem dessa nova humanidade — dois origens diferentes, unidos por Cristo.',
    'Como a obra de reconciliacao de Cristo fundamenta a disposicao de voces de se reconciliar um com o outro nos momentos de ruptura?',
    'Voce tem tratado as diferencas de origem — familiar, cultural, de temperamento — como barreiras ou como riqueza da nova humanidade que Cristo criou?',
    'Como a paz que Cristo fez entre os extremos pode ser o modelo da paz que o lar de voces cultiva internamente?',
    'Orem juntos agradecendo pela reconciliacao que Cristo operou — e pedindo que ela se manifeste na unidade do lar.',
    'Senhor que reconciliastes os que estavam longe, que a tua obra de reconciliacao seja o modelo e o poder da nossa. Amen.'
  ),
  aplic(186,27,'III — A vida domestica da alianca','Dia de aplicacao','Dia de aplicacao — gesto concreto no lar',
    'Escolham juntos um gesto concreto de amor que sera feito hoje — algo pratico que beneficia o outro e o lar. Nao precisa ser grandioso: lavar a louça sem que ninguem pedisse, deixar uma nota escrita, fazer a tarefa que o outro odia.',
    'Senhor, que o amor seja concreto no nosso lar. Que as palavras sejam acompanhadas de gestos. Amen.'
  ),
  dev(187,27,'III — A vida domestica da alianca','Efesios 3','Profundidade espiritual interior sustentando a vida do lar','Profundidade interior sustenta o lar',
    'Para que sejais arraigados e fundamentados em amor, e possais compreender com todos os santos a largura, comprimento, altura e profundidade do amor de Cristo — como o lar esta sendo arraigado nesse amor?',
    'A oracao de Paulo em Efesios 3 pede profundidade espiritual — nao sucesso, nao conforto, mas raizes profundas no amor de Cristo. O lar superficialmente enraizado tomba com vento fraco; o lar profundamente arraigado suporta tempestades maiores.',
    'Em qual dimensao — largura, comprimento, altura ou profundidade — o amor de Cristo no lar de voces precisa ser mais conhecido e experimentado?',
    'Voce tem investido em profundidade espiritual interior — leitura, meditacao, oracao — de forma que alimenta o lar?',
    'Como a profundidade espiritual de cada um se traduz em riqueza para o outro e para o lar?',
    'Orem juntos a oracao de Paulo de Efesios 3.14-19 — como oracao pessoal e como oracao pelo conjuge.',
    'Senhor, que sejamos arraigados no teu amor. Que a profundidade interior sustente o que o lar constroi externamente. Amen.'
  ),
  aplic(188,27,'III — A vida domestica da alianca','Dia de dialogo','Dia de dialogo — ponto em aberto',
    'Ha algo que ficou sem conversa na semana — uma decisao pendente, uma tensao nao resolvida, um sentimento nao expresso? Use este dia para sentar um com o outro sem tela e sem pressa e falar sobre o que ficou em aberto.',
    'Senhor, que o dialogo seja pratica regular do lar. Que nao deixemos o nao dito acumular. Amen.'
  ),
  mesa(189,27,'III — A vida domestica da alianca','Mesa da Alianca — Semana 27'),

  // SEMANA 28
  dev(190,28,'III — A vida domestica da alianca','Efesios 4','Verdade em amor como base da comunicacao conjugal','Verdade dita em amor',
    'Seguindo a verdade em amor, cresceremos em tudo naquele que e a cabeca, Cristo — como a unidade verdade+amor define a comunicacao do lar de voces?',
    'Efesios 4 e um capitulo de etica pratica da nova vida: unidade, dons, maturidade e comunicacao. A verdade sem amor e dureza; o amor sem verdade e cumplicidade com o mal. O lar que aprende a dizer a verdade em amor cresce para Cristo.',
    'Qual e a tendencia do lar — verdade sem amor, amor sem verdade, ou o equilibrio que Paulo descreve?',
    'Ha algo verdadeiro que voce precisa dizer ao conjuge mas tem evitado por falta de amor na entrega — ou por medo da reacao?',
    'Como voce pode praticar a comunicacao de verdade em amor — com honestidade genuina e cuidado real — na proxima situacao dificil?',
    'Cada um pratica dizer uma verdade ao conjuge de forma amorosa — algo positivo ou construtivo que ainda nao foi dito.',
    'Senhor, que a verdade e o amor caminhem juntos no nosso lar. Que o que dizemos edifique, mesmo quando e dificil. Amen.'
  ),
  dev(191,28,'III — A vida domestica da alianca','Efesios 5','O texto central do NT sobre casamento e Cristo/igreja','Efesios 5 — O modelo definitivo',
    'Efesios 5.22-33 e o texto mais discutido sobre o casamento no NT — o que mais te desafia nele?',
    'Efesios 5 apresenta o casamento como metafora da relacao entre Cristo e a Igreja — o que significa que o casamento de voces e uma prova publica de como Cristo ama a Igreja e de como a Igreja responde. A submissao e o amor sacrificial sao complementos, nao opostos.',
    'Como a imagem de Cristo amando a Igreja — dando-se completamente por ela — define o que e lideranca sacrificial no lar de voces?',
    'Como marido: voce tem amado a esposa com o amor sacrificial de Cristo — que nao pede nada em troca, mas se da completamente?',
    'Como esposa: a submissao que Paulo descreve — como a Igreja responde a Cristo que a ama — e diferente da obediencia mecanica. Como voce tem vivido essa postura de resposta confiante?',
    'Leiam juntos Efesios 5.25-33 e conversem sobre o que cada um esta sendo chamado a mudar.',
    'Senhor, que o nosso casamento seja imagem fiel da relacao de Cristo com a Igreja. Que o amor e a resposta confiante sejam genuinos. Amen.'
  ),
  aplic(192,28,'III — A vida domestica da alianca','Dia de oracao','Dia de oracao — interceder um pelo outro',
    'Dediquem 15-20 minutos para orar especificamente um pelo outro — nao pelas necessidades do lar, mas pela pessoa do conjuge: sua fe, seu crescimento, suas lutas interiores, seus sonhos. Orem em voz alta se possivel.',
    'Senhor, que a intercedo mutua seja pratica regular do nosso lar. Que nos conhecamos o suficiente para orar com especificidade. Amen.'
  ),
  dev(193,28,'III — A vida domestica da alianca','Efesios 6','Educacao dos filhos e protecao espiritual do lar','Armadura e educacao dos filhos',
    'Crieis vossos filhos na disciplina e na admonicao do Senhor — como o lar esta investindo na formacao espiritual dos filhos?',
    'Efesios 6 move do lar para a guerra espiritual — e ambos estao conectados. A educacao dos filhos e espiritual antes de ser academica ou disciplinar. A armadura de Deus e para o lar tanto quanto para o individuo.',
    'O lar esta sendo proativo na educacao espiritual dos filhos — nao apenas deixando isso para a escola biblica — ou reagindo quando problemas aparecem?',
    'Como voce tem exercido a responsabilidade da admonicao do Senhor — ensinando a fe com palavras e vida?',
    'Quais elementos da armadura de Deus o lar mais precisa vestir agora como protecao espiritual?',
    'Conversem sobre um aspecto da formacao espiritual dos filhos que precisa ser mais intencional.',
    'Senhor, que o lar seja lugar de formacao espiritual. Que vestamos a armadura e eduquemos na tua admonicao. Amen.',
    'Efesios 6 fala diretamente sobre a educacao dos filhos — como voce esta cumprindo a responsabilidade de admoesta-los no Senhor de forma pratica e diaria?'
  ),
  dev(194,28,'III — A vida domestica da alianca','Filipenses 1','Alegria genuina mesmo em circunstancias dificeis do casal','Alegria nas circunstancias dificeis',
    'Paulo escreveu Filipenses de dentro de uma prisao — e o livro e cheio de alegria. Como o lar de voces encontra alegria genuina nas circunstancias dificeis?',
    'A alegria de Paulo nao e otimismo ingenuo — e paz fundamentada em Cristo que transcende as circunstancias. O lar que tem essa alegria nao depende de tudo estar bem para estar bem.',
    'Qual circunstancia dificil do lar de voces tem roubado a alegria — e o que seria necessario para ter alegria genuina dentro dela?',
    'Voce tem sido fonte de alegria genuina para o conjuge — ou tende a trazer o peso das circunstancias para o relacionamento?',
    'Como a oracao de Paulo em Filipenses 1 — cheio de gratidao mesmo na prisao — pode modelar a postura do lar?',
    'Identifiquem tres razoes de gratidao concretas diante da situacao atual do lar e orem sobre elas.',
    'Senhor, que a alegria que Paulo tinha na prisao seja tambem a nossa nas dificuldades do lar. Que a tua paz transcenda as circunstancias. Amen.'
  ),
  aplic(195,28,'III — A vida domestica da alianca','Dia de silencio','Dia de silencio — deixar amadurecer',
    'Alguns pensamentos e experiencias precisam de silencio para amadurecer. Hoje, cada um passa 15 minutos em silencio — sem oracao formal, sem Biblia, sem agenda — apenas presenca diante de Deus. Depois, compartilhem brevemente o que emerged.',
    'Senhor, que o silencio seja habitado por tua presenca. Que o que precisa amadurecer amadureca no silencio. Amen.'
  ),
  mesa(196,28,'III — A vida domestica da alianca','Mesa da Alianca — Semana 28'),

  // SEMANA 29
  dev(197,29,'III — A vida domestica da alianca','Filipenses 2','Humildade mutua como caminho de real unidade conjugal','Mente de Cristo no casamento',
    'Nada façais por contencao ou por gloria vã — como a descricao da mente de Cristo em Filipenses 2 desafia o ego no relacionamento de voces?',
    'O kenosis de Cristo — esvaziar-se, tomar forma de servo, humilhar-se — e o modelo maximo de humildade. Paulo coloca esse modelo como padrao para as relacoes entre crentes. No casamento, essa humildade e o antidoto para competicao, orgulho e centralismo.',
    'Em qual area do relacionamento a contencao ou a gloria vã — o desejo de ganhar ou de ser visto como certo — aparece com mais frequencia?',
    'Como a auto-esvaziamento de Cristo — vir em forma de servo — pode ser o modelo concreto para a forma como voce exerce lideranca ou contribui no lar?',
    'O que mudaria na dinamica do lar se ambos pusessem o outro acima de si mesmo — de forma genuina e consistente?',
    'Escolham uma area esta semana onde cada um vai deliberadamente colocar o interesse do outro acima do proprio.',
    'Senhor de mente de servo, que o esvaziamento de Cristo seja o modelo do nosso relacionamento. Que a humildade nao seja fraqueza mas amor. Amen.'
  ),
  aplic(198,29,'III — A vida domestica da alianca','Dia de pausa','Dia de pausa — aprofundar sem pressa',
    'Usem este dia para reler ou aprofundar um texto que ficou superficialmente tratado esta semana. Nao ha obrigacao de producao espiritual — apenas espaco para que a Palavra alcance o que ficou na superficie.',
    'Senhor, que a pausa aprofunde o que a pressa torna superficial. Amen.'
  ),
  dev(199,29,'III — A vida domestica da alianca','Filipenses 3','Reordenar prioridades pelo que realmente importa','Reordenar prioridades juntos',
    'O que era para mim ganho, isso considerei perda por causa de Cristo — quais ganhos o lar de voces teria que reordenar para ganhar mais de Cristo?',
    'Paulo faz uma lista das suas credenciais e as declara como perda — nao porque sejam ruins, mas porque Cristo e mais. O lar que passa periodicamente por esse exercicio de reordenamento descobre que muitas das coisas que persegue podem ser soltas por algo maior.',
    'Ha algo que o lar busca — status, conforto, aprovacao, seguranca material — que poderia estar competindo com buscar mais de Cristo?',
    'Voce tem perseguido o conhecimento de Cristo com a intensidade que Paulo descreve — ou a fe e um elemento entre muitos de uma vida ocupada?',
    'Como o lar pode reordenar suas prioridades de forma pratica nesta temporada — o que seria necessario soltar para ganhar mais?',
    'Façam juntos uma lista das cinco prioridades atuais do lar e avaliem se estao alinhadas com o que Paulo chama de ganho.',
    'Senhor, que o que conta para nos seja o que conta para ti. Que reordenemos as prioridades com coragem. Amen.'
  ),
  dev(200,29,'III — A vida domestica da alianca','Filipenses 4','Contentamento que nao depende das circunstancias do lar','Contentamento real',
    'Aprendi a estar contente em qualquer estado em que me encontre — o contentamento e aprendizado, nao temperamento. O lar de voces esta aprendendo contentamento?',
    'O contentamento de Paulo e adquirido — ele aprendeu. Nao e passividade diante de problemas; e paz que transcende as circunstancias. O lar que aprende contentamento nao e mais controlado pelas circunstancias — nem pelas boas nem pelas ruins.',
    'Qual circunstancia do lar mais tem controlado o estado emocional de voces — e como o contentamento de Paulo falaria a ela?',
    'Voce tem ensinado contentamento ao conjuge pelo exemplo — ou tende a reagir emocionalmente ao que muda?',
    'Como o contentamento como pratica espiritual pode ser cultivado no lar — de forma intencional e gradual?',
    'Orem juntos pela paz de Deus que excede todo entendimento — sobre uma situacao especifica do lar.',
    'Senhor, que aprendamos contentamento. Que a tua paz guarde os nossos coracoes e mentes. Amen.'
  ),
  aplic(201,29,'III — A vida domestica da alianca','Dia de aplicacao','Dia de aplicacao — gesto concreto no lar',
    'Identifiquem uma tarefa do lar que costuma gerar tensao — e resolvam-na juntos com alegria. Ou faca sozinho a tarefa que normalmente seria do outro. O gesto concreto de servico falha menos do que as palavras.',
    'Senhor, que o amor seja visivel em gestos simples. Que sirvamos com alegria no ordinario do lar. Amen.'
  ),
  dev(202,29,'III — A vida domestica da alianca','Colossenses 1','Cristo no centro, nao apenas na periferia da vida a dois','Cristo no centro do lar',
    'Ele e antes de todas as coisas e em Ele todas as coisas subsistem — como a centralidade de Cristo sustenta a vida do lar de voces?',
    'Colossenses 1 e um hinario da supremacia de Cristo — sobre tudo, inclusive sobre a familia. O lar que tem Cristo no centro nao e o que fala muito de Jesus; e o que organiza tudo em funcao dele.',
    'O que indica que Cristo esta no centro do lar de voces — nas decisoes, no uso do tempo, nas relacoes?',
    'Ha areas do lar onde Cristo e ornamento periferico ao inves de centro organizador — e qual seria o sinal dessa diferenca?',
    'Como o lar pode tornar a supremacia de Cristo mais pratica e menos teorica na rotina semanal?',
    'Identifiquem uma area do lar onde Cristo precisa ser mais central e conversem sobre como implementar isso.',
    'Senhor supremo, que seja tu o centro do nosso lar. Que todas as coisas do lar subsistam em ti e para ti. Amen.'
  ),
  mesa(203,29,'III — A vida domestica da alianca','Mesa da Alianca — Semana 29'),

  // SEMANA 30
  dev(204,30,'III — A vida domestica da alianca','Colossenses 2','Discernimento contra ideias que minam a fe dentro de casa','Discernir o que mina a fé',
    'Vede que ninguem vos faça presa sua por meio de filosofias e de vãs sutilezas — quais ideias culturais tem infiltrado o lar de voces de forma sutil?',
    'Paulo alerta contra um sincretismo sofisticado — elementos filosoficos misturados ao evangelho que diluem o poder de Cristo. O lar do seculo 21 enfrenta versoes modernas disso: psicologia popular, espiritualidade de autoajuda, ideologia cultural.',
    'Ha alguma ideia que o lar tem absorvido — de livros, redes, cultura — que contradiz ou diluí a centralidade de Cristo?',
    'Como voce filtra o que entra no lar — em termos de influencias intelectuais e espirituais?',
    'Qual pratica de discernimento o lar pode adotar para avaliar as ideias que chegam atraves da cultura?',
    'Conversem sobre uma ideia cultural que merece ser avaliada criticamente a luz da Escritura.',
    'Senhor, guarda o nosso lar das filosofias que diluem a tua centralidade. Que a solidez em Cristo seja o nosso criterio. Amen.'
  ),
  aplic(205,30,'III — A vida domestica da alianca','Dia de dialogo','Dia de dialogo — ponto em aberto',
    'Escolham um tema que tem ficado em suspenso no relacionamento — uma decisao, uma tensao, uma esperança — e reservem 30 minutos para conversar sobre ele com escuta genuina e sem defesa prematura.',
    'Senhor, que o dialogo seja instrumento de unidade. Que o que fica em suspenso seja abordado com coragem. Amen.'
  ),
  dev(206,30,'III — A vida domestica da alianca','Colossenses 3','Vestir compaixao, mansidao e perdao na convivencia diaria','Vestir o carater novo em casa',
    'Revesti-vos de entranhas de misericordia, de benignidade, humildade, mansidao, longanimidade — como essas virtudes descrevem o que o lar de voces veste no cotidiano?',
    'Colossenses 3 e o capitulo do codigo domestico de Paulo: revestir o carater novo, as relacoes conjugais, a educacao dos filhos. O amor que Paolo coloca acima de tudo como o vinculo da perfeicao e a armadura que une tudo o mais.',
    'Quais das virtudes de Colossenses 3 o lar de voces ja veste bem — e quais ainda precisam ser colocadas com mais intencionalidade?',
    'Como voce tem vestido concretamente compaixao, mansidao e perdao no cotidiano — nao apenas nos momentos de crise?',
    'Qual virtude desta lista o conjuge mais precisaria ver voce vestindo esta semana?',
    'Cada um escolhe uma virtude de Colossenses 3 para vestir intencionalmente nos proximos 7 dias.',
    'Senhor, vesti-nos das virtudes que descreveste. Que o carater de Cristo seja o que o lar exibe no cotidiano. Amen.'
  ),
  dev(207,30,'III — A vida domestica da alianca','Colossenses 4','Testemunho consistente diante de quem observa o casal','Testemunho que outros veem',
    'Procedei com sabedoria para com os de fora, aproveitando bem o tempo. A tua palavra seja sempre com graca, temperada com sal — como o lar de voces e percebido por quem esta de fora?',
    'A instrucao de Paulo em Colossenses 4 e sobre o testemunho externo — como o lar interage com os de fora. A graca temperada com sal nao e insulsa nem agressiva; e genuina, saborosa, oportuna.',
    'Como o lar de voces e percebido pelos que estao ao redor — em termos de amor, unidade e testemunho?',
    'Voce tem aproveitado bem o tempo — as oportunidades de testemunho que aparecem no cotidiano — ou as deixa passar sem perceber?',
    'Qual aspecto do testemunho externo do lar poderia ser fortalecido — na comunicacao, na hospitalidade, no envolvimento com a comunidade?',
    'Identifiquem uma oportunidade de testemunho que o lar tem evitado e comprometam-se a abraca-la.',
    'Senhor, que o nosso lar seja atrativo para quem esta de fora. Que a graca com sal seja o tom da nossa comunicacao. Amen.'
  ),
  aplic(208,30,'III — A vida domestica da alianca','Dia de oracao','Dia de oracao — interceder um pelo outro',
    'Orem hoje especificamente pelos filhos ou pelos mais jovens da familia — ou por um casal de amigos que voces sabem que esta passando por dificuldade. A intercedo pelo outro fortalece o proprio relacionamento.',
    'Senhor, que a nossa oracao va alem de nos mesmos. Que o lar seja central de intercedo. Amen.'
  ),
  dev(209,30,'III — A vida domestica da alianca','1 Tessalonicenses 1','Fe, amor e esperanca como obra viva de um casal jovem','Fe, amor e esperanca em acao',
    'A tua obra da fe, trabalho do amor e paciencia da esperanca — como esses tres elementos estao vivos no lar de voces?',
    'Paulo descreve a Igreja de Tessalonica a partir de tres marcas: fe que age, amor que trabalha, esperanca que persevera. Essas tres marcas descrevem um lar saudavel tanto quanto uma Igreja saudavel.',
    'Qual das tres — fe, amor, esperanca — esta mais fraca no lar de voces agora, e o que poderia fortalece-la?',
    'A fe de voces como casal e visivel o suficiente para ser testemunho — como os tessalonicenses eram testemunho para Macedonia e Acaia?',
    'Como a esperanca futura — sabendo que Cristo vira — sustenta a paciencia do lar nas dificuldades presentes?',
    'Avaliem juntos o estado de fe, amor e esperanca no lar — com honestidade e com plano de acao.',
    'Senhor, que fe, amor e esperanca sejam marcas vivas do nosso lar. Que o que professamos seja obra visivel. Amen.'
  ),
  mesa(210,30,'III — A vida domestica da alianca','Mesa da Alianca — Semana 30'),

  // SEMANA 31
  aplic(211,31,'III — A vida domestica da alianca','Dia de silencio','Dia de silencio — deixar amadurecer',
    'Hoje e um dia de desaceleracao intencional. Evitem telas por pelo menos uma hora. Sentem em silencio juntos — podem ler separados, podem dar uma caminhada juntos sem falar sobre agenda. Deixem o silencio fazer seu trabalho.',
    'Senhor, que o silencio nao seja vazio mas habitado por ti. Amen.'
  ),
  dev(212,31,'III — A vida domestica da alianca','1 Tessalonicenses 2','Equilibrio entre ternura e firmeza no cuidado mutuo','Ternura e firmeza juntas',
    'Fomos tao carinhosos para convosco como uma mae que cria seus proprios filhos — mas tambem como pai — como o lar combina ternura e firmeza no cuidado mutuo?',
    'Paulo usa duas imagens: a mae carinhosa e o pai que exorta. O cuidado completo combina as duas — ternura que acolhe e firmeza que fortalece. O lar que tem so ternura pode se tornar conivente; o que tem so firmeza pode se tornar duro.',
    'Qual das duas voce mais tende a expressar — ternura ou firmeza — e como o desequilibrio tem afetado o lar?',
    'Ha momentos em que o conjuge precisa de ternura e voce oferece exortacao — ou o contrario?',
    'Como o lar pode cultivar a combinacao saudavel das duas para cuidar bem um do outro?',
    'Compartilhem com o conjuge quando precisam mais de ternura e quando precisam mais de firmeza — de forma especifica.',
    'Senhor, que saibamos quando ser tenros e quando ser firmes. Que o cuidado seja completo. Amen.'
  ),
  dev(213,31,'III — A vida domestica da alianca','1 Tessalonicenses 3','Pedir a Deus que o amor do casal creca e transborde','Amor que cresce e transborda',
    'O Senhor vos faca crescer e abundar em amor uns para com os outros e para com todos — como voces oram por crescimento de amor entre si?',
    'A oracao de Paulo pelos tessalonicenses inclui um pedido especifico: que o amor cresça e transborde. O amor conjugal que nao cresce tende a estabilizar e depois diminuir. O lar que ora por crescimento de amor esta investindo no que sustenta tudo.',
    'Voces oram especificamente pelo crescimento do amor entre si — ou a oracao e mais centrada em necessidades e circunstancias?',
    'Em qual area o amor de voces como casal precisa crescer e se aprofundar?',
    'Como o amor que transborda — que vai alem do lar para os de fora — esta presente na vida de voces?',
    'Orem juntos pela oracao de 1 Tessalonicenses 3.12 — de forma especifica e pessoal.',
    'Senhor, que o nosso amor cresca e transborde. Que nao fique contido entre nos mas alcance os que estao ao redor. Amen.'
  ),
  aplic(214,31,'III — A vida domestica da alianca','Dia de pausa','Dia de pausa — aprofundar sem pressa',
    'Pausa nao e preguica — e sabedoria. Revisitem um dos devocionais mais significativos das ultimas semanas. Conversem sobre o que ficou — o que mudou, o que ainda esta em processo, o que precisa de mais atencao.',
    'Senhor, que a pausa seja produtiva para a alma. Amen.'
  ),
  dev(215,31,'III — A vida domestica da alianca','1 Tessalonicenses 4','Pureza do corpo e consolo diante da perda em familia','Pureza e consolo na perda',
    'Esta e a vontade de Deus: a vossa santificacao — e no mesmo capitulo o consolo sobre os que dorrmiram. Santidade e esperanca caminham juntas. Como o lar mantem ambas?',
    'Primeiro Tessalonicenses 4 combina dois temas essenciais: pureza sexual e esperanca na ressurreicao. Ambos dizem que o corpo importa — no presente e no futuro. O lar que leva a serio ambos tem uma visao integral da vida.',
    'Como a pureza no presente e a esperanca no futuro se conectam na visao de vida do lar de voces?',
    'Ha alguma perda — de uma pessoa, de um sonho — que o lar ainda nao processou completamente com a esperança da ressurreicao?',
    'Como a pureza sexual pode ser cultivada de forma pratica e preventiva no lar — nao apenas como resposta a crises?',
    'Orem juntos por pureza e por esperanca — as duas faces do amor que Paulo une em 1 Tessalonicenses 4.',
    'Senhor, que a pureza do corpo e a esperanca da ressurreicao sejam valores vivos no lar. Que honremos o corpo no presente e confiemos no futuro. Amen.'
  ),
  dev(216,31,'III — A vida domestica da alianca','1 Tessalonicenses 5','Carater pratico — paciencia, alegria, oracao — para a convivencia diaria','Carater pratico na convivencia',
    'Regozijai-vos sempre, orai sem cessar, em tudo dai gracas — como essas tres praticas se traduzem no cotidiano do lar?',
    'O final de 1 Tessalonicenses e uma lista de praticas concretas de carater — nao extraordinarias, mas diarias. O lar que internaliza essas praticas nao precisa de grandes momentos espirituais para ser saudavel.',
    'Qual das tres — rejoijar, orar, agradecer — e mais dificil de praticar no cotidiano do lar de voces?',
    'Como voce pode tornar alegria, oracao e gratidao praticas diarias que moldam a atmosfera do lar?',
    'Ha algo especifico que tem roubado a alegria ou a gratidao do lar — e que precisaria ser enderecado?',
    'Comprometam-se a um ritmo diario simples: uma expressao de alegria, uma oracao breve, um agradecimento especifico.',
    'Senhor, que alegria, oracao e gratidao sejam o ritmo diario do nosso lar. Amen.'
  ),
  mesa(217,31,'III — A vida domestica da alianca','Mesa da Alianca — Semana 31'),

  // SEMANA 32
  aplic(218,32,'III — A vida domestica da alianca','Dia de aplicacao','Dia de aplicacao — gesto concreto no lar',
    'Identifiquem algo no lar que ficou pendente — uma conversa, uma tarefa, um gesto de cuidado — e resolvam hoje. A obediencia pequena prepara para a grande.',
    'Senhor, que o pequeno seja feito com a mesma seriedade que o grande. Amen.'
  ),
  dev(219,32,'III — A vida domestica da alianca','2 Tessalonicenses 1','Fe firme do casal mesmo sob pressao externa','Fe firme sob pressao',
    'A vossa fe vai crescendo muito, e o amor de cada um de voces para com os outros vai se multiplicando — a fe e o amor crescem mesmo sob perseguicao. Como o lar de voces responde a pressao?',
    'A Igreja de Tessalonica crescia em fe e amor mesmo sob perseguicao — e Paulo louva isso. A pressao externa pode fortalecer ou enfraquecer o lar. O lar que se une sob pressao descobre um vinculo que o conforto nunca revelaria.',
    'A pressao externa que o lar enfrenta — de trabalho, cultura, familia, financas — tem aproximado ou afastado voces?',
    'Como voce pode ser para o conjuge a presenca que sustenta a fe em vez de adicionar pressao quando as circunstancias sao dificeis?',
    'Ha uma pressao atual que o lar poderia usar como oportunidade de aprofundar a unidade ao inves de deixar que a divida?',
    'Orem juntos sobre a pressao externa atual — pedindo que fortaleça em vez de dividir.',
    'Senhor, que a pressao externa nos una em vez de nos dividir. Que a fe e o amor cresçam mesmo nas dificuldades. Amen.'
  ),
  aplic(220,32,'III — A vida domestica da alianca','Dia de dialogo','Dia de dialogo — ponto em aberto',
    'Ha uma expectativa nao expressa entre voces — algo que cada um assume mas nunca nomeou? Usem este dia para colocar em palavras o que ficou nao dito. Comece com: \"Eu esperaria que...\" ou \"Eu assumia que...\"',
    'Senhor, que o nao dito seja nomeado com graca. Que o dialogo traga clareza onde ha confusao. Amen.'
  ),
  dev(221,32,'III — A vida domestica da alianca','2 Tessalonicenses 2','Discernimento contra alarmismo e engano dentro de casa','Discernir contra o alarme falso',
    'Paulo adverte: nao vos perturbeis tao facilmente — nem por palavras, nem por cartas. O lar de voces tem sido perturbado por alarmismo — noticias, profecias, medos culturais?',
    'O alarmismo e uma ferramenta eficaz do inimigo: produz ansiedade, paralisa a acao e distorce a percepcao da realidade. Paulo instruí firmeza e clareza de ensino como antidotos. O lar que se ancora na Palavra e menos vulneravel ao alarme falso.',
    'Ha fontes de informacao ou de espiritualidade que tem gerado ansiedade e perturbacao no lar — e que mereceriam ser avaliadas critica?',
    'Como voce tem filtrado o que consome — noticias, redes, influencias espirituais — de forma que proteja a paz do lar?',
    'Qual ensinamento firme da Escritura seria o melhor antidoto para o alarmismo que o lar enfrenta?',
    'Conversem sobre uma fonte de perturbacao que o lar tem absorvido — e decidam juntos como responder a ela.',
    'Senhor, guarda o lar do alarmismo e do engano. Que a firmeza no teu ensinamento seja a nossa paz. Amen.'
  ),
  dev(222,32,'III — A vida domestica da alianca','2 Tessalonicenses 3','Responsabilidade e ordem pratica na rotina do lar','Ordem pratica no lar',
    'Se alguem nao quiser trabalhar, tampoco coma — Paulo toca em responsabilidade pratica. Como o lar de voces distribui e assume responsabilidades com integridade?',
    'A instrucao de Paulo sobre trabalho e ordem pratica revela que a espiritualidade se manifesta na responsabilidade cotidiana. O lar onde cada um assume sua parte com integridade — sem depender do outro em excesso ou sem terceirizar responsabilidades — tem uma saude pratica que fundamenta a saude espiritual.',
    'Ha areas do lar onde a responsabilidade esta mal distribuida — alguem fazendo demais enquanto outro faz de menos?',
    'Voce tem assumido com integridade as responsabilidades do lar que sao suas — sem procrastinar ou transferir para o conjuge?',
    'Como o lar pode criar sistemas simples de responsabilidade compartilhada que funcionem com menos tensao?',
    'Revisem juntos a distribuicao de responsabilidades do lar e ajustem o que estiver desequilibrado.',
    'Senhor, que a responsabilidade pratica seja expressao de integridade. Que cada um assuma o que e seu com alegria. Amen.'
  ),
  aplic(223,32,'III — A vida domestica da alianca','Dia de oracao','Dia de oracao — interceder um pelo outro',
    'Orem hoje pela familia de origem de cada um — pais, irmaos, avos, primos. O lar cristao e um ponto de bencao que irradia para as familias ao redor. Orem com especificidade e com amor genuino.',
    'Senhor, que o nosso lar seja bencao para as familias de origem. Que a nossa oracao os alcance. Amen.'
  ),
  mesa(224,32,'III — A vida domestica da alianca','Mesa da Alianca — Semana 32'),

  // SEMANA 33
  dev(225,33,'III — A vida domestica da alianca','1 Timoteo 1','Guardar a sa doutrina como heranca para dentro de casa','Heranca doutrinaria do lar',
    'Paulo exorta Timoteo a guardar a boa deposit — a sa doutrina. O lar de voces e deliberado em guardar e transmitir a doutrina crista?',
    'A sa doutrina nao e apenas para os lideres da Igreja — e a heranca que o lar passa para a geracao seguinte. O lar que nao e deliberado sobre o que cre acaba sendo moldado pelo ambiente cultural.',
    'Qual doutrina crista o lar de voces mais precisa aprofundar e comunicar de forma clara — especialmente para as geracoes mais jovens?',
    'Como voce tem investido no conhecimento doutrinario do lar — de forma que construa solidez e nao apenas sentimento?',
    'Ha uma crenca basica do evangelho que o lar assumiu mas que nunca articulou claramente em palavras?',
    'Conversem sobre uma doutrina especifica que querem aprofundar como lar nesta temporada.',
    'Senhor, que sejamos guardas da sa doutrina. Que o lar transmita a heranca da fe com clareza e fidelidade. Amen.'
  ),
  dev(226,33,'III — A vida domestica da alianca','1 Timoteo 2','Ordem e reverencia no culto refletidas tambem no lar','Reverencia que começa em casa',
    'Paulo fala sobre a forma como a Igreja se reune — com ordem, com reverencia, com foco. Como o lar pratica a reverencia no culto familiar?',
    'A reverencia que Paulo descreve para o culto comunitario começa no lar. O culto familiar que e informal a ponto de ser bagunçado perde algo; o que e rigido a ponto de ser sem vida perde outro. O equilibrio — genuino e reverente — e uma pratica que se forma ao longo do tempo.',
    'Como e o culto familiar de voces — em termos de frequencia, qualidade e atmosfera?',
    'Ha um nivel de informalidade no lar que tem impedido a reverencia genuina nas praticas espirituais?',
    'Como o lar pode cultivar reverencia genuina — nao religiosidade rígida — nas suas praticas espirituais?',
    'Estabelecam ou reformem o padrao do culto familiar — com mais regularidade, reverencia e participacao de todos.',
    'Senhor, que a reverencia que descreveste para a Igreja comece no nosso lar. Que o culto familiar seja genuino e adorador. Amen.'
  ),
  aplic(227,33,'III — A vida domestica da alianca','Dia de silencio','Dia de silencio — deixar amadurecer',
    'Silencio ativo: sem agenda, sem producao, sem consumo de conteudo. Fiquem juntos ou separados neste silencio por pelo menos 20 minutos. Depois, sentem juntos por 5 minutos e partilhem apenas uma palavra ou frase do que o silencio trouxe.',
    'Senhor, que o silencio seja escola. Que o que emergir seja teu. Amen.'
  ),
  dev(228,33,'III — A vida domestica da alianca','1 Timoteo 3','Carater integro como pre-requisito tambem da lideranca domestica','Carater como lideranca real',
    'O episkopos deve ser irreprensivel, marido de uma so mulher, moderado, prudente, honesto, hospitaleiro — como esses qualificativos descrevem a lideranca esperada no lar?',
    'Os qualificativos para lideres da Igreja em 1 Timoteo 3 sao fundamentalmente qualificativos de carater domestico — \"bem administre sua propria casa\". O lar e a escola da lideranca, nao o lugar onde a lideranca fica em pausa.',
    'Como o carater que Paulo descreve para lideres eclesiasticos se aplica ao modo como voce lidera e vive no proprio lar?',
    'Ha algum qualificativo da lista de 1 Timoteo 3 que e claramente visivel no seu lar — e algum que claramente falta?',
    'Como o lar pode ser o lugar onde o carater de lideranca e cultivado — nao apenas exercido?',
    'Cada um identifica um qualificativo de 1 Timoteo 3 que quer cultivar e comunica ao conjuge.',
    'Senhor, que o carater que exiges dos lideres da Igreja seja o carater que cultivamos no lar. Que o lar seja escola de lideranca crista. Amen.'
  ),
  aplic(229,33,'III — A vida domestica da alianca','Dia de pausa','Dia de pausa — aprofundar sem pressa',
    'Pausa para revisao da metade do ano devocional. Leiam juntos as respostas de um devocional importante dos primeiros 180 dias. O que mudou? O que ainda esta em processo? O que foi esquecido mas precisa de atencao?',
    'Senhor, que o que plantamos germine. Amen.'
  ),
  dev(230,33,'III — A vida domestica da alianca','1 Timoteo 4','O exemplo de vida do casal como pregacao silenciosa','Vida que prega sem palavras',
    'Sê exemplo dos crentes, em palavra, em trato, em amor, em espirito, em fe, em pureza — como o lar de voces e um exemplo para quem observa?',
    'A instrucao de Paulo a Timoteo sobre ser exemplo nao e para lideres extraordinarios — e para qualquer fiel que tem pessoas ao redor que observam. O lar cristao que vive o que professa prega sem precisar de plataforma.',
    'O que as pessoas que convivem com o lar de voces — filhos, vizinhos, amigos — aprendem sobre o que e ser cristao pelo que veem no cotidiano?',
    'Ha uma distancia entre o que o lar professa e o que demonstra na pratica — que precisaria ser enderecada?',
    'Como o lar pode ser mais deliberado em viver de forma que seja exemplo — nao por performance, mas por genuinidade?',
    'Identifiquem uma area onde o lar quer ser mais consistente como exemplo para quem esta ao redor.',
    'Senhor, que a nossa vida prega mais do que as nossas palavras. Que o lar seja exemplo genuino de fe vivida. Amen.'
  ),
  mesa(231,33,'III — A vida domestica da alianca','Mesa da Alianca — Semana 33'),

  // SEMANA 34
  dev(232,34,'III — A vida domestica da alianca','1 Timoteo 5','Honra aos mais velhos da familia estendida','Honrar os mais velhos',
    'Honra as viuvas que sao verdadeiramente viuvas — Paulo fala de responsabilidade pratica com os mais velhos. Como o lar de voces cuida dos mais velhos da familia?',
    'O ensino de Paulo sobre os mais velhos em 1 Timoteo 5 e pratico e teologico: cuidar da familia imediata e responsabilidade de cada um. O lar que negligencia os mais velhos da propria familia perde algo da cultura de honra que a Escritura valoriza.',
    'Como o lar de voces esta cumprindo a responsabilidade de honrar e cuidar dos mais velhos da familia — pais, avos?',
    'Ha uma pessoa mais velha da familia que precisa de mais atencao ou cuidado que o lar tem negligenciado?',
    'Como o lar pode criar uma cultura de honra aos mais velhos que seja visivel para as geracoes mais jovens?',
    'Identifiquem uma acao especifica de honra a um mais velho da familia para fazer esta semana.',
    'Senhor, que o lar honre os mais velhos com a seriedade que tua Palavra exige. Amen.'
  ),
  aplic(233,34,'III — A vida domestica da alianca','Dia de aplicacao','Dia de aplicacao — gesto concreto no lar',
    'Faca algo pelo conjuge que voce sabe que ele nao vai pedir mas que precisaria: organizacao de algo que incomoda, um gesto de atencao, uma palavra escrita, um telefonema ao familiar dele que voce nao liga. O gesto inesperado diz muito.',
    'Senhor, que o amor seja surpreendente como o teu. Amen.'
  ),
  dev(234,34,'III — A vida domestica da alianca','1 Timoteo 6','Financas geridas com contentamento, nao com ganancia','Financas e contentamento',
    'A piedade com contentamento e um grande ganho — como o lar de voces gerencia as financas a partir de contentamento genuino?',
    'Paulo alerta contra a ganancia que e raiz de todos os males. O contentamento que ele descreve nao e pobreza forcada — e paz com o que Deus tem dado, combinada com fidelidade na gestao do que e confiado.',
    'Ha areas das financas do lar onde a ganancia — querer mais do que se tem, comparar com outros — tem contaminado a gestao?',
    'O lar de voces tem uma visao clara e compartilhada sobre financas — ou e uma area de tensao por falta de comunicacao ou de alinhamento?',
    'Como o contentamento pode ser praticado de forma concreta nas proximas decisoes financeiras do lar?',
    'Conversem sobre o estado atual das financas do lar com honestidade — e identifiquem uma area de ajuste.',
    'Senhor, que o lar gerencie as financas com contentamento e sabedoria. Que a ganancia nao seja a raiz de nossas decisoes. Amen.'
  ),
  dev(235,34,'III — A vida domestica da alianca','2 Timoteo 1','Coragem para viver a fe abertamente dentro de casa','Coragem para viver a fe',
    'Deus nao nos deu espirito de covardia, mas de poder, de amor e de sao juizo — em qual area do lar voces precisam mais coragem espiritual?',
    'Paulo escreve a Timoteo de uma segunda prisao — com a morte proximo. E ele exorta a coragem. A coragem espiritual no lar nao e para momentos heroicos; e para o cotidiano: orar em voz alta, falar sobre fe naturalmente, manter convicoes sob pressao.',
    'Ha alguma convicao espiritual que o lar tem vivido em privado mas nao tem coragem de viver abertamente?',
    'Voce tem sido corajoso em viver a fe no lar com a mesma integridade com que a vive em outros contextos?',
    'Como o espirito de poder, amor e sao juizo — nao de covardia — pode ser expresso de forma concreta no lar esta semana?',
    'Orem juntos por coragem espiritual — para algo especifico que o lar tem evitado por medo.',
    'Senhor, que o espirito de poder, amor e sao juizo seja o espirito do nosso lar. Amen.'
  ),
  aplic(236,34,'III — A vida domestica da alianca','Dia de dialogo','Dia de dialogo — ponto em aberto',
    'Usem este dia para uma conversa sobre o futuro — nao planejamento pratico, mas sonhos compartilhados: onde voces querem estar em 5 anos como casal e familia? Que tipo de lar querem ter? Que legado querem construir?',
    'Senhor, que o futuro que souhamos seja o futuro que constroies conosco. Amen.'
  ),
  dev(237,34,'III — A vida domestica da alianca','2 Timoteo 2','Disciplina e fidelidade em meio as dificuldades do lar','Disciplina e fidelidade',
    'O soldado que briga nao se envolve com os negocios da vida — como o foco e a disciplina espiritual do lar tem sido protegidos das distrações do cotidiano?',
    'Paulo usa tres imagens: o soldado, o atleta e o agricultor — todas falam de disciplina, foco e perseveranca. O lar que aplica essa etica ao crescimento espiritual nao depende de inspiracao para avan<car; depende de disciplina.',
    'Qual disciplina espiritual o lar mais precisa cultivar — em termos de consistencia e foco?',
    'Ha distrações que tem competido com o investimento espiritual do lar e que precisariam ser reduzidas?',
    'Como o lar pode criar ritmos de disciplina espiritual que funcionem mesmo nas temporadas dificeis?',
    'Comprometam-se a um ritmo de disciplina espiritual para os proximos 30 dias — especifico, simples, verificavel.',
    'Senhor, que sejamos soldados, atletas e agricultores na fe — disciplinados e fieis. Amen.'
  ),
  mesa(238,34,'III — A vida domestica da alianca','Mesa da Alianca — Semana 34'),

  // SEMANA 35
  aplic(239,35,'III — A vida domestica da alianca','Dia de oracao','Dia de oracao — interceder um pelo outro',
    'Orem hoje pela Igreja local de voces — pelos lideres, pelas familias que voces conhecem que estao em dificuldade, pelas criancas e adolescentes da comunidade. O lar que intercede pela Igreja e parte da saude da Igreja.',
    'Senhor, que o nosso lar seja parte da saude da Igreja. Que a nossa intercedo contribua. Amen.'
  ),
  dev(240,35,'III — A vida domestica da alianca','2 Timoteo 3','A Palavra como ancora do casal em tempos de confusao moral','A Biblia como ancora',
    'Toda a Escritura e divinamente inspirada e util para ensinar, para repreender, para corrigir, para instruir em justica — como a Biblia tem sido ancora pratica do lar de voces?',
    'Paulo descreve o fim dos tempos com padroes que soam contemporaneos: amantes do dinheiro, orgulhosos, sem amor natural, sem freio. O antidoto que ele oferece e a Escritura — nao a filosofia, nao a psicologia, nao a cultura. O lar que tem a Biblia como ancora real e nao apenas decorativa e o lar mais estavel.',
    'A Escritura tem sido ancora pratica do lar — moldando decisoes, comunicacao, valores — ou e um elemento decorativo da espiritualidade de voces?',
    'Em qual area de confusao moral ou pratica o lar mais precisa da ancora da Escritura agora?',
    'Como o lar pode aumentar a presenca pratica da Palavra — nao apenas na leitura, mas na aplicacao cotidiana?',
    'Identifiquem uma situacao atual do lar e apliquem a ela uma passagem especifica da Escritura — nao genericamente, mas com precisao.',
    'Senhor, que tua Palavra seja ancora real do nosso lar. Que nao apenas a leiamos mas a vivamos. Amen.'
  ),
  dev(241,35,'III — A vida domestica da alianca','2 Timoteo 4','Fidelidade ate o fim como alvo comum do casamento','Combate ja quase vencido',
    'Combati o bom combate, acabei a corrida, guardei a fe — essas palavras de Paulo sao as que o casal quer poder dizer ao fim. O que precisa acontecer no lar para que isso seja verdade?',
    'O testamento de Paulo em 2 Timoteo 4 e um retrato de uma vida bem vivida ate o fim. Nao perfeita — com abandono e dificuldade no caminho. Mas fiel na essencia: o combate bom, a fe guardada. O casal que tem esse alvo compartilhado tem um horizonte que organiza o presente.',
    'Se voces olharem para o fim do casamento — o que querem que possa ser dito sobre como amaram e viveram?',
    'Que mudancas concretas no presente o alvo de \"guardar a fe ate o fim\" exige do lar de voces?',
    'Como o conhecimento do fim — que o Senhor vira — muda a forma como voces investem no lar hoje?',
    'Escrevam juntos ou verbalizem como querem que o casamento seja descrito no fim — e deixem esse texto visivel.',
    'Senhor, que ao fim possamos dizer: combatemos o bom combate, guardamos a fe, acabamos a corrida juntos. Amen.'
  ),
  aplic(242,35,'III — A vida domestica da alianca','Dia de silencio','Dia de silencio — deixar amadurecer',
    'Hoje, cada um passa tempo a soles com o diario ou com um papel em branco — escrevendo sobre o que Deus tem feito no lar nos ultimos meses. Nao e analise, e reconhecimento. Depois, compartilhem um paragrafo um com o outro.',
    'Senhor, que reconhecamos o que tens feito com gratidao. Amen.'
  ),
  dev(243,35,'III — A vida domestica da alianca','Tito 1','Integridade de carater acima da eloquencia de discurso','Carater acima de eloquencia',
    'O presbitero deve ser irreprensivel como administrador de Deus — Paulo coloca carater acima de habilidade. Como o lar prioriza formacao de carater sobre desempenho e aparencia?',
    'Os qualificativos de Tito 1 para lideres sao todos de carater — nao de competencia. O lar que investe na formacao de carater — de cada conjuge e dos filhos — esta construindo algo que dura. A eloquencia sem carater cede; o carater sem eloquencia persiste.',
    'O lar de voces esta mais investido em formacao de carater ou em desempenho e aparencia — nas criancas e nos adultos?',
    'Ha uma area de carater — integridade, honestidade, mansidao, temperanca — que o lar precisa cultivar de forma mais intencional?',
    'Como o lar pode criar condicoes praticas de formacao de carater — habitos, ritmos, conversas — que sejam consistentes?',
    'Cada um identifica uma area de carater em que quer crescer e pede ao conjuge para ajuda-lo a crescer nela.',
    'Senhor, que o carater seja mais valorizado no lar do que a eloquencia. Que sejamos integros antes de sermos impressionantes. Amen.'
  ),
  dev(244,35,'III — A vida domestica da alianca','Tito 2','Cada fase da vida do casal tem seu chamado especifico','Chamado para cada fase',
    'Os homens mais velhos, as mulheres mais velhas, os jovens — Paulo da instrucao para cada fase. Como o lar entende o chamado especifico da fase em que esta?',
    'Tito 2 e uma teologia da formacao ao longo das fases da vida. Cada fase tem sabedoria propria para oferecer e vulnerabilidades proprias para guardar. O lar que entende sua fase atual — com seus desafios e possibilidades especificos — vive com mais intencionalidade.',
    'Em qual fase do casamento voces estao — e o que o chamado especifico dessa fase implica em termos de prioridades?',
    'Ha algo que e tipico de fases anteriores que voces ainda estao tentando manter — e que poderia ser soltado para abracar a fase atual?',
    'Como o lar pode buscar a sabedoria de casais em fases mais avancadas — e oferecer o que tem para casais em fases anteriores?',
    'Conversem sobre o chamado especifico da fase atual do casamento de voces — com honestidade e com gratidao.',
    'Senhor, que abracemos com inteireza a fase em que estamos. Que cada etapa seja vivida com o chamado que e seu. Amen.'
  ),
  mesa(245,35,'III — A vida domestica da alianca','Mesa da Alianca — Semana 35'),

  // SEMANA 36
  aplic(246,36,'III — A vida domestica da alianca','Dia de pausa','Dia de pausa — aprofundar sem pressa',
    'Pausa contemplativa: usem este dia para ler algo juntos — um psalm, um trecho de um livro espiritual, um devocional antigo. Leiam em voz alta alternadamente e depois fiquem em silencio por 5 minutos. Compartilhem uma palavra ou imagem.',
    'Senhor, que a leitura que fazemos juntos nos una em ti. Amen.'
  ),
  dev(247,36,'III — A vida domestica da alianca','Tito 3','Viver de forma que adorne a doutrina diante dos outros','Vida que adorna a doutrina',
    'Para que adornem a doutrina de Deus nosso Salvador em tudo — como a vida do lar de voces adorna ou mancha a doutrina que professa?',
    'Adornar a doutrina e um conceito belissimo: a vida bem vivida faz a doutrina parecer atraente para quem observa. O lar que vive de acordo com o que cre e uma propaganda involuntaria do evangelho.',
    'Qual aspecto da vida do lar de voces mais adora a doutrina — e qual mais a contradiz?',
    'Ha alguem proximo ao lar que ja comentou algo sobre como voces vivem — positivo ou negativo — que seja relevante aqui?',
    'Como o lar pode alinhar mais deliberadamente a vida pratica com a doutrina que professa?',
    'Identifiquem juntos uma area onde o alinhamento entre fe e vida precisaria melhorar — e comprometam-se a uma acao especifica.',
    'Senhor, que a nossa vida adorne a doutrina que cremos. Que o evangelho seja atraente atraves do nosso lar. Amen.'
  ),
  aplic(248,36,'III — A vida domestica da alianca','Dia de aplicacao','Dia de aplicacao — gesto concreto no lar',
    'Um gesto de servico externo hoje: o lar serve alguem de fora — vizinho, colega, parente — de forma pratica e sem expectativa de retorno. Cozinhar e levar, oferecer ajuda, uma mensagem de cuidado genuina.',
    'Senhor, que o lar seja bencao para fora de si mesmo. Amen.'
  ),
  dev(249,36,'III — A vida domestica da alianca','Filemon 1','Reconciliacao e novo status em Cristo, mesmo em relacoes quebradas','Irmao acima de tudo',
    'Paulo devolve Onesimo a Filemon — nao mais como escravo, mas como irmao amado. Como o evangelho muda o status das relacoes quebradas no lar de voces?',
    'A carta a Filemon e o texto mais pessoal e diplomatico do NT: Paulo intercede por um fugitivo e pede a Filemon que o receba como irmao. O evangelho reposiciona o status: nao mais escravo, mas irmao. Isso vale para relacoes quebradas dentro e fora do lar.',
    'Ha alguma relacao quebrada — com um familiar, com um amigo, com alguem do passado — que o evangelho esta chamando o lar a reconciliar?',
    'Como o modelo de Paulo — intercessor pela reconciliacao, nao julgador do que aconteceu — pode ser o papel de cada um de voces em relacoes rompidas ao redor?',
    'O evangelho cria novos status: o ex-inimigo se torna irmao. Isso tem sido real em alguma relacao que o lar experimentou?',
    'Identifiquem uma relacao quebrada ao redor do lar e orem pela reconciliacao — ou pelo primeiro passo em direcao a ela.',
    'Senhor, que o evangelho reposicione as relacoes quebradas ao redor do nosso lar. Amen.'
  ),
  dev(250,36,'III — A vida domestica da alianca','Hebreus 1','Cristo no centro de toda a revelacao e de toda decisao do lar','Cristo acima de tudo',
    'Deus, tendo antigamente falado muitas vezes e de muitas maneiras aos pais pelos profetas, nestes ultimos dias nos falou pelo Filho — como Cristo e o interprete de toda a Escritura e de toda decisao do lar?',
    'Hebreus 1 abre com a supremacia de Cristo sobre toda revelacao anterior. Tudo o que Deus disse antes aponta para Cristo; tudo o que vem depois o interpreta. O lar que le toda a vida atraves de Cristo tem uma hermeneutica de vida que e coerente e poderosa.',
    'Como Cristo e o criterio das decisoes do lar — nao apenas das religiosas, mas das praticas, financeiras e relacionais?',
    'Voce tem lido a Escritura atraves de Cristo — ou le o AT sem ver como ele aponta para Jesus?',
    'Qual decisao atual do lar mais precisa ser filtrada atraves da pergunta: o que Cristo revela sobre isso?',
    'Orem juntos pedindo sabedoria crista para uma decisao especifica — com Christ no centro da deliberacao.',
    'Senhor Cristo, que sejas o centro de toda a nossa interpretacao da vida. Que cada decisao do lar passe pelo filtro de ti. Amen.'
  ),
  aplic(251,36,'III — A vida domestica da alianca','Dia de dialogo','Dia de dialogo — ponto em aberto',
    'Qual expectativa do relacionamento voces nunca verbalizaram diretamente? Use este dia para fazer isso: \"Eu esperava que no nosso casamento...\" Escutem sem interromper. Agradecam pela honestidade.',
    'Senhor, que o dialogo honesto nos aprofunde. Que o que ficou nao dito possa ser dito com seguranca. Amen.'
  ),
  mesa(252,36,'III — A vida domestica da alianca','Mesa da Alianca — Semana 36'),

  // SEMANA 37
  dev(253,37,'III — A vida domestica da alianca','Hebreus 2','A solidariedade de Cristo com as fraquezas do casal','Cristo solidario com nossas fraquezas',
    'Pois como Ele mesmo foi tentado e sofreu, pode socorrer os que sao tentados — como a solidariedade de Cristo com a fraqueza humana muda a forma como o lar enfrenta suas lutas?',
    'Cristo nao e um Sumo Sacerdote distante — ele experimentou a fraqueza, a tentacao e o sofrimento. Essa solidariedade e o fundamento da confianca do lar para se aproximar com ousadia ao trono da graca.',
    'Como a solidariedade de Cristo com a fraqueza humana muda a forma como o lar se aproxima de Deus — com ousadia ou com vergonha?',
    'Ha uma fraqueza especifica do lar — um padrao, uma luta — que precisaria ser levada com mais ousadia ao trono da graca?',
    'Como a solidariedade de Cristo com a fraqueza do conjuge pode modelar a forma como voce responde a fraqueza do outro?',
    'Orem juntos com ousadia sobre uma fraqueza real — sem encobrir, mas com a confianca de quem sabe que Cristo compreende.',
    'Senhor que experimentaste a nossa fraqueza, que a nossa solidariedade com o conjuge reflita a tua connosco. Amen.'
  ),
  dev(254,37,'III — A vida domestica da alianca','Hebreus 3','Perseverar com o coracao macio, nao endurecido pelo habito','Coracao macio pelo habito',
    'Hoje, se ouvirdes a sua voz, nao endurequeis o vosso coracao — o endurecimento e um processo gradual. O lar de voces tem mantido o coracao macio diante da voz de Deus?',
    'O endurecimento em Hebreus 3 nao acontece de uma vez — e o resultado da desobediencia repetida, da negligencia acumulada, do habito de ignorar o que Deus diz. O lar que verifica regularmente o estado do proprio coracao e um lar que resiste ao endurecimento.',
    'Ha alguma area onde o coracao do lar ou de um dos conjuges tem ficado mais duro — menos sensievel a voz de Deus?',
    'Qual pratica regular o lar tem — ou precisa criar — para manter o coracao macio diante de Deus?',
    'Como voce pode identificar e nomear quando o proprio coracao esta endurecendo — antes que o endurecimento seja profundo?',
    'Cada um faz uma verificacao honesta do estado do proprio coracao — e compartilha com o conjuge o que encontra.',
    'Senhor, que os nossos coracoes permaneçam macios diante da tua voz. Guarda-nos do endurecimento gradual. Amen.'
  ),
  aplic(255,37,'III — A vida domestica da alianca','Dia de oracao','Dia de oracao — interceder um pelo outro',
    'Orem especificamente pelo estado espiritual do coracao de cada um — pedindo a Deus que mantenha os coracoes macios e receptivos. E orem por um amigo ou familiar cujo coracao parece endurecido.',
    'Senhor, que os coracoes ao nosso redor sejam amolecidos por ti. Amen.'
  ),
  dev(256,37,'III — A vida domestica da alianca','Hebreus 4','Descanso verdadeiro e exame sincero do coracao conjugal','Descanso e exame sincero',
    'A Palavra de Deus e viva e eficaz, mais afiada do que qualquer espada de dois gumes — como a Palavra tem examinado o coracao do lar de voces?',
    'Hebreus 4 combina o convite ao descanso sabático com a potencia cirurgica da Palavra de Deus. O descanso e profundo quando a Palavra tem feito seu trabalho — examinando o que ninguem mais alcanca: pensamentos e intencoes do coracao.',
    'Quando a Palavra de Deus examinou seu coracao recentemente — o que revelou sobre voce que ninguem mais poderia ver?',
    'Ha intencoes ou pensamentos que o coracao guarda mas que a Palavra esta chamando a luz?',
    'Como o lar pode praticar o descanso sabático genuino — descansando da producao e deixando a Palavra trabalhar?',
    'Leiam juntos Hebreus 4.12-16 e fiquem em silencio por 5 minutos. Compartilhem o que a Palavra examinoe.',
    'Senhor, que tua Palavra examine os nossos coracoes. Que o descanso verdadeiro venha depois do exame honesto. Amen.'
  ),
  dev(257,37,'III — A vida domestica da alianca','Hebreus 5','Aprender obediencia atraves do sofrimento compartilhado','Aprender pela dor juntos',
    'Ainda que fosse Filho, aprendeu a obediencia pelas coisas que sofreu — como o sofrimento compartilhado tem ensinado o lar de voces?',
    'Jesus aprendeu obediencia pelo sofrimento — isso nao e falha no sistema; e o design. O casal que sofre junto — com honestidade, sem fingir que esta bem — descobre uma intimidade que o conforto nunca revela.',
    'Qual sofrimento compartilhado o lar tem enfrentado — e o que ele tem ensinado sobre obediencia e confianca?',
    'Ha um sofrimento atual que o lar tem carregado individualmente ao inves de compartilhar — por vergonha ou por independencia?',
    'Como o lar pode criar um ambiente onde o sofrimento e compartilhado — em vez de ocultado ou processado isoladamente?',
    'Compartilhem uma area de dor atual que cada um esta carregando — e orem sobre ela juntos.',
    'Senhor, que aprendamos obediencia pela dor, como Jesus. Que o sofrimento compartilhado aprofunde a unidade do lar. Amen.'
  ),
  aplic(258,37,'III — A vida domestica da alianca','Dia de silencio','Dia de silencio — deixar amadurecer',
    'Silencio de cura: dediquem este dia a perguntar a Deus — sem agenda, sem lista — o que ele esta tentando dizer ao lar que tem ficado abafado pelo barulho. Escrevam em um papel: \"O que tu queres que eu escute?\" Fiquem quietos por 15 minutos.',
    'Senhor, que escutemos o que tens querido dizer. Amen.'
  ),
  mesa(259,37,'III — A vida domestica da alianca','Mesa da Alianca — Semana 37'),

  // SEMANA 38
  dev(260,38,'III — A vida domestica da alianca','Hebreus 6','Esperanca firme como ancora em meio a incerteza do lar','Esperanca como ancora',
    'Temos esta esperanca como ancora da alma, segura e firme — em qual incerteza atual do lar a esperanca tem sido a ancora?',
    'A ancora de Hebreus 6 nao esta na agua — esta alem do veu, na propria presenca de Deus. O lar que tem essa ancora nao e controlado pelas ondas das circunstancias; tem estabilidade que transcende o presente.',
    'Qual incerteza atual do lar mais esta testando a firmeza da esperanca de voces?',
    'A esperanca do lar esta ancorada em promessas imutaveis de Deus — ou em planos humanos que podem mudar?',
    'Como a imutabilidade de Deus e seu propósito firme podem ser relembrados hoje como fundamento da esperanca?',
    'Leiam juntos Hebreus 6.17-19 e declarem juntos a ancora que tem sobre a incerteza atual do lar.',
    'Senhor, que a nossa esperanca esteja ancorada em ti, alem do veu. Que as ondas das circunstancias nao nos controlem. Amen.'
  ),
  aplic(261,38,'III — A vida domestica da alianca','Dia de pausa','Dia de pausa — aprofundar sem pressa',
    'Usem este dia de pausa para reler uma das Cartas mais curtas do periodo — Filemon, 2 Joao, 3 Joao, Judas. Leiam em voz alta juntos e conversem sobre uma aplicacao especifica para o lar.',
    'Senhor, que mesmo o que parece pequeno traga grandes percepcoes. Amen.'
  ),
  dev(262,38,'III — A vida domestica da alianca','Hebreus 7','A mediacao superior e permanente de Cristo sobre a alianca','Cristo como mediador eterno',
    'Ele pode salvar completamente os que se aproximam de Deus por ele, vivendo sempre para interceder por eles — como a intercedo permanente de Cristo sobre o lar muda a forma como voces oram?',
    'A mediacao de Cristo em Hebreus 7 e eterna e perfeita — ele sempre vive para interceder. O lar que sabe disso ora com mais confianca: nao depende da propria eloquencia ou da consistencia espiritual para ser ouvido.',
    'Como a certeza de que Cristo sempre intercede por voces muda a forma como o lar ora — especialmente nas temporadas de fraqueza espiritual?',
    'Ha momentos em que o lar nao ora porque parece insuficiente — e que a intercedo de Cristo deveria curar?',
    'Como voces podem orar com mais ousadia — apoiados na mediacao de Cristo — por necessidades especificas do lar?',
    'Orem juntos com a confianca de quem sabe que Cristo esta intercedendo por voces mesmo agora.',
    'Senhor Jesus, mediador eterno, que a tua intercedo pelo nosso lar seja nossa coragem para nos aproximarmos. Amen.'
  ),
  dev(263,38,'III — A vida domestica da alianca','Hebreus 8','Promessas melhores sustentando o compromisso do casamento','Promessas melhores',
    'A alianca que Cristo estabelece e melhor porque e sustentada por melhores promessas — como as promessas de Deus sustentam o compromisso conjugal de voces?',
    'A nova aliança de Hebreus 8 e superior porque Deus escreveu a lei no coracao — nao em tabuas de pedra. O casamento que depende de regras e compromissos externos apenas e fragil; o que tem a lei no coracao e sustentado de dentro.',
    'O compromisso conjugal de voces esta mais sustentado por promessas externas — os votos — ou por transformacao interior — a lei no coracao?',
    'Quais promessas de Deus o lar tem reclamado nos momentos em que os compromissos ficam dificeis de manter?',
    'Como as melhores promessas da nova aliança — de que Deus nos conhece e transforma — sustentam o amor conjugal nos momentos de secura?',
    'Identifiquem juntos tres promessas de Deus que sustentam o casamento de voces — e declarem essas promessas em oracao.',
    'Senhor da nova alianca, que as tuas promessas melhores sustentem o nosso compromisso. Que a lei do amor esteja no nosso coracao. Amen.'
  ),
  aplic(264,38,'III — A vida domestica da alianca','Dia de aplicacao','Dia de aplicacao — gesto concreto no lar',
    'Faca uma lista de tres coisas pelo qual o lar e grato nesta semana. Compartilhem a lista um com o outro e depois colem em algum lugar visivel do lar por uma semana como lembrete de gratidao.',
    'Senhor, que a gratidao seja decoracao permanente do nosso lar. Amen.'
  ),
  dev(265,38,'III — A vida domestica da alianca','Hebreus 9','Purificacao real do coracao, nao apenas ritual externa','Purificacao real do coracao',
    'Quanto mais o sangue de Cristo nao purificara a nossa consciencia das obras mortas? — como a purificacao interior opera de forma diferente da religiosidade externa?',
    'Hebreus 9 mostra que os rituais externos do AT purificavam exteriormente — mas Cristo purifica a consciencia, o interior. O lar que experimenta essa purificacao interior nao precisa manter aparencias; e transformado de dentro.',
    'Ha areas da consciencia — culpa nao resolvida, vergonha antiga — que o lar precisa trazer ao sangue de Cristo para purificacao real?',
    'Voce tem dependido de praticas externas de espiritualidade para se sentir puro — ou experimenta a purificacao interior que so Cristo oferece?',
    'Como o lar pode criar espaco para que a culpa e a vergonha sejam trazidas regularmente ao sangue de Cristo — sem acumula-las?',
    'Se ha culpa ou vergonha acumulada, orem juntos declarando a purificacao que Cristo oferece.',
    'Senhor, que o teu sangue purifique nossas consciencias de obras mortas. Que o lar caminhe na pureza que tu ofereces. Amen.'
  ),
  mesa(266,38,'III — A vida domestica da alianca','Mesa da Alianca — Semana 38'),

  // SEMANA 39
  dev(267,39,'III — A vida domestica da alianca','Hebreus 10','Perseveranca em comunidade, nunca isolamento do casal','Perseverar em comunidade',
    'Nao abandonemos a nossa congregacao — como o lar de voces esta conectado a comunidade que sustenta a perseveranca?',
    'Hebreus 10.25 e uma instrucao sobre a necessidade de comunidade para perseveranca. O lar isolado — sem amizades profundas, sem comunidade de fe, sem accountability — e vulneravel de formas que nao percebe enquanto tudo esta bem.',
    'Como o lar de voces esta conectado a uma comunidade que conhece e sustenta a perseveranca de voces?',
    'Ha um isolamento crescendo no lar — de amizades, de comunidade, de accountability — que precisaria ser revertido?',
    'Como o lar pode se conectar mais profundamente com uma comunidade de fe — alem da presenca dominical?',
    'Identifiquem um casal ou pessoa de confianca com quem querem se aprofundar nesta temporada.',
    'Senhor, que o lar nao persevere sozinho. Que a comunidade seja o lugar de sustentacao e encorajamento. Amen.'
  ),
  aplic(268,39,'III — A vida domestica da alianca','Dia de dialogo','Dia de dialogo — ponto em aberto',
    'Qual decisao importante o lar precisa tomar nos proximos meses — e ainda nao foi suficientemente discutida? Usem este dia para abordar essa decisao com calma, sem pressao de resolucao imediata, mas com avanco real na conversa.',
    'Senhor, que o dialogo gere clareza. Que o lar decida bem. Amen.'
  ),
  dev(269,39,'III — A vida domestica da alianca','Hebreus 11','Exemplos de perseveranca na fe para inspirar o casal','Nuvem de testemunhas',
    'Tendo em redor de nos tao grande nuvem de testemunhas — como a historia dos fieis de Hebreus 11 inspira e sustenta a fe do lar de voces?',
    'Hebreus 11 e uma galeria de fe — pessoas que viveram e morreram sem ver as promessas cumpridas, mas crendo nelas. O lar que conhece essas historias tem companhia invisivel mas real na corrida da fe.',
    'Qual personagem de Hebreus 11 mais ressoa com a situacao atual do lar de voces — e por que?',
    'Ha fies na historia da propria familia de voces que sao parte da nuvem de testemunhas — cujo exemplo sustenta o lar?',
    'Como o conhecimento das historias dos fieis do passado pode fortalecer a perseveranca do lar nas dificuldades presentes?',
    'Leiam juntos Hebreus 11 e cada um aponta o personagem que mais ressoa — e conta por que.',
    'Senhor, obrigado pela nuvem de testemunhas que nos acompanha. Que as suas historias fortaleçam a nossa perseveranca. Amen.'
  ),
  aplic(270,39,'III — A vida domestica da alianca','Dia de oracao','Dia de oracao — interceder um pelo outro',
    'Orem hoje pela perseverança um do outro — pela saude espiritual do conjuge, pelas areas de luta que conhecem, pelos sonhos que precisam de fortalecimento. Orem com especificidade e com fe da nuvem de testemunhas por tras.',
    'Senhor, que a nossa intercedo pelo outro seja parte do que nos sustenta na corrida. Amen.'
  ),
  dev(271,39,'III — A vida domestica da alianca','Hebreus 12','Disciplina do Pai como sinal de amor, nao de rejeicao','Disciplina como amor',
    'Aquele que o Senhor ama, disciplina — como a disciplina de Deus tem sido recebida no lar de voces: como amor ou como rejeicao?',
    'A disciplina de Hebreus 12 nao e punitiva mas formativa — e o sinal de que Deus nos trata como filhos, nao como estranhos. O lar que aprende a receber a disciplina de Deus sem rejeicao descobre um caminho de paz e justica.',
    'Ha uma area onde o lar tem resistido a disciplina de Deus — interpretando como abandono ao inves de cuidado?',
    'Como a disciplina que voce exerce com o conjuge — chamados de atencao, limites, expectativas — pode refletir o modelo de Deus: formativo e amoroso, nao punitivo e rejeitador?',
    'Qual fruto de paz e justica a disciplina de Deus tem produzido no lar — e que pode ser celebrado?',
    'Orem juntos agradecendo pela disciplina de Deus — mesmo pelas areas que doeram — como sinal de paternidade.',
    'Senhor, que recebamos tua disciplina como amor. Que produzamos o fruto de paz que ela quer trazer. Amen.'
  ),
  dev(272,39,'III — A vida domestica da alianca','Hebreus 13','Honroso seja entre todos o matrimonio — texto direto sobre fidelidade conjugal','Honroso seja o matrimonio',
    'Honroso seja o matrimonio entre todos e o leito conjugal imaculado — como o lar de voces honra o matrimonio de forma pratica e visivel?',
    'Hebreus 13.4 e uma das declaracoes mais diretas da Escritura sobre a honra devida ao casamento. Honrar o matrimonio e mais do que manter a fidelidade sexual — e tratar o conjuge como alguem de alto valor, como a alianca como algo sagrado.',
    'Como o lar honra o matrimonio de forma visivel — em palavras, em gestos, em prioridades?',
    'Ha formas sutis em que o matrimonio tem sido desonrado — pequenos descuidos, negligencias, palavras que rebaixam?',
    'Como o lar pode elevar o nivel de honra ao matrimonio esta semana — de forma concreta e verificavel?',
    'Digam um ao outro: \"Eu honro voce e honro o nosso matrimonio\" — e depois cada um nomeie uma forma concreta de como isso vai aparecer.',
    'Senhor, que honremos o matrimonio como tu honrastes. Que o leito conjugal seja imaculado e o amor seja publicamente honroso. Amen.'
  ),
  mesa(273,39,'III — A vida domestica da alianca','Mesa da Alianca — Semana 39','Efesios 5.21-33 — o significado evangelico do casamento'),
];

let content = '';
for (const d of days) {
  content += '  ' + JSON.stringify(d) + ',\n';
}

fs.appendFileSync(outPath, content);
console.log('Part 4 done, days 183-273, file size:', fs.statSync(outPath).size);
