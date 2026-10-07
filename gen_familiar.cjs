const fs = require('fs');
const path = require('path');

const outPath = path.join(__dirname, 'src/data/devocionalFamiliar.ts');

// Helper to make a devocional day
const dev = (dia, semana, estacao, leitura, subtema, tema, pg, rt, pger, rh, rm, cp, oa, rf) => ({
  dia, semana, estacao, leitura, subtema, tema, tipo: 'devocional',
  perguntaGancho: pg, reflexaoTexto: rt, perguntaGeradora: pger,
  reflexaoHomem: rh, reflexaoMulher: rm,
  ...(rf ? { reflexaoFilhos: rf } : {}),
  compromissoPratico: cp, oracaoAlianca: oa
});

const mesa = (dia, semana, estacao, tema, lc) => ({
  dia, semana, estacao, leitura: 'Revisao da semana', subtema: tema,
  tema, tipo: 'mesa-alianca',
  ...(lc ? { leituraComplementar: lc } : {})
});

const aplic = (dia, semana, estacao, subtema, tema, rt, oa) => ({
  dia, semana, estacao, leitura: subtema, subtema, tema, tipo: 'aplicacao',
  reflexaoTexto: rt, oracaoAlianca: oa
});

const days = [
  // SEMANA 1 - Rich content
  dev(1,1,'I — O Noivo se revela','Mateus 1; Mateus 2',
    'Deus entra em familias reais e imperfeitas para cumprir sua promessa',
    'Deus age em familias imperfeitas',
    'Quando voce olha para a genealogia de Jesus — cheia de nomes inesperados, historias de fracasso e redencao — como isso muda sua perspectiva sobre a propria familia que voce esta construindo?',
    'Mateus abre o Evangelho com uma genealogia deliberadamente imperfeita: Tamar, Raabe, Rute, a mulher de Urias — todas incluidas na linhagem do Messias. Deus nao escolhe familias idealizadas para cumprir seus propositos; ele entra em familias reais, com historias complicadas, e as usa para sua gloria. A fuga para o Egito e a obediencia de Jose nos lembram que proteger o lar exige coragem para agir mesmo sem entender tudo. O lar cristao nao e um santuario perfeito, mas um lugar onde a graca de Deus se manifesta no meio das imperfeicoes.',
    'Qual historia dificil ou imperfeicao na historia das suas familias precisa ser ressignificada a luz da soberania de Deus que age atraves do que parece quebrado?',
    'Como Jose, voce e chamado a proteger e guiar mesmo quando o caminho nao esta claro — qual decisao corajosa voce precisa tomar hoje em favor do lar que esta construindo?',
    'Maria acolheu uma missao que nao entendia completamente e confiou — em qual area da vida a dois voce ainda precisa soltar o controle e confiar no plano de Deus?',
    'Esta semana, compartilhem juntos uma historia onde Deus agiu de forma inesperada em suas familias — e orem juntos de gratidao por essa fidelidade.',
    'Senhor, obrigado por entrar na imperfeicao das nossas historias familiares e nao desistir de nos. Que nosso lar seja um lugar onde a tua graca se torna visivel, onde a obediencia e a resposta ao teu chamado, e onde a protecao mutua reflita o cuidado que tens sobre os teus. Amen.',
    'A fuga para o Egito mostra que Deus protege os vulneraveis — como a historia da sua familia pode mostrar aos seus filhos que Deus esta presente mesmo nos momentos dificeis?'
  ),
  dev(2,1,'I — O Noivo se revela','Mateus 3',
    'Identificacao humilde antes de qualquer conquista pessoal',
    'Humildade como base do amor',
    'Antes de Jesus iniciar seu ministerio publico, ele se humilhou no batismo — o que isso diz sobre a ordem certa das coisas em um relacionamento comprometido com Deus?',
    'Jesus, o Filho eterno de Deus, aguarda em fila junto com pecadores para ser batizado por Joao. Ele nao exige privilegio por quem e; ele se identifica com a humanidade que veio salvar. No relacionamento conjugal, a humildade nao e fraqueza — e a escolha de nao usar o proprio status, as proprias conquistas ou as proprias razoes como arma contra o outro. Amar exige essa disposicao de descer, de se colocar no lugar do outro, de nao insistir no proprio direito a ser reconhecido primeiro.',
    'Em qual situacao especifica do relacionamento voce tende a exigir reconhecimento antes de servir — e o que precisaria mudar para que a humildade venha primeiro?',
    'Um homem seguro em Deus nao precisa provar seu valor ao conjuge — de que forma voce tem usado conquistas ou argumentos para manter uma posicao ao inves de se abaixar em servico?',
    'A humildade que Jesus demonstra nao e passividade, mas escolha ativa — em qual area do relacionamento voce tem confundido humildade com silencio sobre o que realmente precisa?',
    'Hoje cada um escreve uma frase de reconhecimento genuino pelo outro — algo que admira no conjuge e raramente diz em voz alta. Compartilhem antes de dormir.',
    'Pai, que a humildade de Jesus no batismo seja o modelo do nosso amor. Guarda-nos da arrogancia que destroi e do silencio que divide. Ensina-nos a nos identificarmos um com o sofrimento do outro, a descer do lugar de razao e a servir primeiro. Amen.'
  ),
  dev(3,1,'I — O Noivo se revela','Mateus 4',
    'Resistir a tentacao e contar o custo de seguir a Cristo juntos',
    'Resistir juntos a tentacao',
    'As tres tentacoes de Jesus no deserto atacaram sua identidade, sua confianca em Deus e sua ambicao — qual dessas areas e o ponto mais vulneravel do relacionamento de voces?',
    'Jesus enfrenta a tentacao com a Palavra de Deus e nao com forca de vontade propria. As tentacoes no deserto nao sao ataques aleatorios; elas miram exatamente nos pontos onde a identidade e o chamado podem ser distorcidos. No casamento, as tentacoes tambem sao personalizadas: o desgaste financeiro que sugere que Deus nao prove, o cansaco que diz que vale a pena ceder a amargura, o sucesso que convida a comparacao com outros casais. Resistir juntos significa conhecer a Palavra de Deus suficientemente bem para responder com ela quando a pressao chega.',
    'Que tentacao especifica o casal enfrenta agora — e qual texto biblico voces podem usar juntos como resposta concreta a ela?',
    'Voce tem liderado o lar como alguem que sabe quem e em Cristo — ou tem tomado decisoes a partir do medo, da escassez ou da comparacao com o que outros casais tem?',
    'Em quais momentos de fraqueza do relacionamento voce recorre a Palavra de Deus, e em quais momentos prefere resolver sozinha — e o que essa diferenca diz sobre onde esta sua confianca?',
    'Identifiquem juntos uma tentacao real que estao enfrentando como casal e escolham juntos um versiculo para memorizar esta semana como resposta a ela.',
    'Senhor Jesus, que resististe a tentacao com a Palavra viva, ensina-nos a fazer o mesmo. Que a tua Palavra seja nossa defesa quando o desgaste, o medo e a comparacao nos atacam. Que resistamos juntos, nao por forca propria, mas pela tua graca que e suficiente. Amen.'
  ),
  dev(4,1,'I — O Noivo se revela','Mateus 5',
    'Carater e pureza como fundamento da vida conjugal',
    'Carater como alicerce do casamento',
    'As bem-aventurancas descrevem um tipo de pessoa que o mundo considera tolo — manso, misericordioso, pobre de espirito. Qual dessas qualidades e mais desafiadora de viver dentro do proprio lar?',
    'O Sermao do Monte comeca com as bem-aventurancas, que sao o retrato do carater daquele que pertence ao Reino de Deus. Jesus nao esta descrevendo conquistas religiosas externas, mas a textura interior de uma pessoa transformada pela graca. No casamento, o carater e o alicerce invisivel que sustenta tudo — e o que permanece quando a paixao inicial passa, quando os filhos chegam, quando o dinheiro falta. A pureza que Jesus menciona no versiculo 8 nao e apenas sexual; e a integridade entre o que se professa e o que se vive dentro das quatro paredes de casa.',
    'Qual aspecto do Sermao do Monte voce pratica facilmente com estranhos mas esquece de praticar com o conjuge — e por que essa contradicao existe?',
    'Ser puro de coracao significa que sua fidelidade ao conjuge comeca no olhar e no pensamento — em qual area voce precisa colocar barreiras concretas para proteger a integridade da alianca?',
    'As bem-aventurancas falam de misericordia e de fazer a paz — de que forma voce tem exercitado essas qualidades nos momentos de tensao com seu conjuge?',
    'Cada um escolhe uma bem-aventuranca que quer cultivar no relacionamento esta semana e diz ao conjuge qual e e por que. Revisitem ao fim da semana.',
    'Senhor, que o nosso lar seja construido sobre o carater que tu valorizas, nao sobre a aparencia que o mundo admira. Molda em nos a mansidao, a pureza e a misericordia que sustentam um amor que dura. Amen.',
    'Filhos observam o carater dos pais antes de ouvir suas palavras — que virtude das bem-aventurancas seus filhos mais precisam ver em voces esta semana?'
  ),
  dev(5,1,'I — O Noivo se revela','Mateus 6',
    'Prioridades espirituais acima da ansiedade do lar',
    'Buscar primeiro o Reino juntos',
    'Jesus diz \"nao andeis ansiosos\" ao longo deste capitulo — qual das preocupacoes do lar de voces mais tem consumido energia que deveria ir para o Reino?',
    'Mateus 6 e um capitulo sobre prioridades: nao fazer o bem para ser visto, nao orar para parecer piedoso, nao acumular tesouros que a ferrugem corroi, nao servir a dois senhores ao mesmo tempo. Jesus oferece o padrao da oracao — o Pai Nosso — como a estrutura de um coracao que coloca Deus no centro antes de listar as necessidades. A ansiedade que paralisa casais frequentemente nasce de uma inversao de prioridades: o que se come, o que se veste, a conta que nao fecha. Jesus nao ignora essas realidades; ele as reposiciona dentro de uma confianca maior.',
    'O casal ja parou para perguntar juntos: \"Estamos buscando primeiro o Reino — ou primeiro a estabilidade, o conforto e a aprovacao das pessoas ao nosso redor?\"',
    'Como provedor, voce tem carregado a ansiedade financeira do lar sozinho ao inves de leva-la a Deus e compartilha-la com honestidade com o conjuge?',
    'A ansiedade sobre o futuro muitas vezes nasce da sensacao de falta de controle — de que forma voce pode trazer essa ansiedade para a oracao em vez de deixa-la criar distancia no relacionamento?',
    'Esta semana, orem juntos o Pai Nosso em voz alta todas as manhas — como exercicio de reposicionamento das prioridades antes do dia comecar.',
    'Pai celestial, que o teu Reino seja de fato nossa primeira busca. Livra-nos da ansiedade que nos consome e nos divide. Que confiemos em tua provisao o suficiente para viver com leveza e generosidade. Que o nosso lar seja um testemunho de que e possivel buscar primeiro a ti. Amen.'
  ),
  dev(6,1,'I — O Noivo se revela','Mateus 7',
    'Construir o relacionamento sobre um fundamento que resiste a tempestade',
    'A rocha que sustenta o lar',
    'Jesus fecha o Sermao do Monte com a imagem de duas casas — uma sobre a rocha, outra sobre a areia. Sobre qual fundamento voces tem construido o relacionamento nos ultimos meses?',
    'A diferenca entre o edificador sensato e o insensato nao e a ausencia de tempestade — ambas as casas enfrentam a chuva, o rio e os ventos. A diferenca e o que esta embaixo. Jesus deixa claro que ouvir suas palavras sem pratica-las e construir sobre areia: pode parecer solido por um tempo, mas desmorona quando a pressao aumenta. Para um casal, as tempestades sao inevitaveis — perdas, doencas, filhos, pressoes financeiras, conflitos. O que determina a sobrevivencia nao e a intensidade da crise, mas a profundidade do fundamento.',
    'Identifiquem juntos uma area do relacionamento que ainda esta sendo construida sobre areia — onde voces sabem o que e certo mas ainda nao tem praticado com consistencia.',
    'Um lar sobre a rocha exige que o homem tome a iniciativa de praticar o que ouve, nao apenas de saber teologicamente o que e certo — onde voce tem substituido o conhecimento pela pratica real?',
    'A mulher sabia edifica o lar — de que forma voce tem contribuido ativamente para que o relacionamento esteja sobre um fundamento solido?',
    'Identifiquem juntos tres praticas concretas que querem estabelecer como fundamento do lar: uma espiritual, uma relacional e uma pratica.',
    'Senhor Jesus, que a tua Palavra seja a rocha sobre a qual construimos cada comodo desta alianca. Quando as tempestades chegarem — e chegarao — que encontremos em ti nao apenas consolo, mas fundamento que nao cede. Edifica-nos como construtores que nao apenas ouvem mas praticam. Amen.'
  ),
  mesa(7,1,'I — O Noivo se revela','Mesa da Alianca — Semana 1','Genesis 2.18-25 — a origem da alianca conjugal'),

  // SEMANA 2
  dev(8,2,'I — O Noivo se revela','Mateus 8','Confianca em meio as provacoes e enfermidades da familia','Fe diante das provacoes do lar',
    'O centuriao confiou em Jesus sem precisar que ele estivesse presente fisicamente — como e a confianca de voces quando a presenca de Deus parece distante?',
    'Jesus cura com uma palavra e demonstra autoridade sobre tudo o que ameaca o lar. A fe que sustenta um casal em tempos dificeis nao e a ausencia de duvida, mas a decisao de continuar confiando mesmo sem ver.',
    'Qual provacao atual no lar esta testando a confianca de voces em Deus — e o que impede de traze-la juntos a Jesus hoje?',
    'Voce tem agido como o centuriao — levando ao Senhor as necessidades do lar — ou tem tentado resolver tudo pela propria forca?',
    'A sogra de Pedro foi curada e imediatamente comecou a servir — de que forma a cura que Deus tem feito em voce se traduz em servico ao conjuge e ao lar?',
    'Orem juntos hoje pela necessidade mais urgente do lar, com a confianca simples de quem cre que Jesus tem autoridade sobre ela.',
    'Senhor, que a nossa fe seja firme mesmo quando nao entendemos o caminho. Que confiemos em tua autoridade sobre tudo o que nos pressiona. Amen.'
  ),
  dev(9,2,'I — O Noivo se revela','Mateus 9; Mateus 10','Compaixao que renova relacionamentos desgastados / O custo de seguir a Cristo dentro da propria casa','Compaixao e custo do discipulado',
    'Jesus chamou Mateus sem hesitacao. Ha alguem no seu lar por quem voce tem sentido mais julgamento do que compaixao?',
    'A compaixao de Jesus alcanca os que outros evitam. Esse mesmo olhar transforma relacionamentos desgastados dentro de casa. Seguir a Cristo custa, inclusive dentro do proprio lar, mas o fruto e um amor que nao desiste.',
    'Como o chamado de seguir a Cristo esta impactando as prioridades praticas de voces — e o casal ja conversou honestamente sobre esse custo?',
    'Voce tem olhado para o conjuge com os olhos de Jesus — que ve alem do comportamento e enxerga a necessidade — ou com olhos criticos que apenas avaliam o desempenho?',
    'O discipulado exige que algumas coisas sejam deixadas para tras — ha algo que voce precisa soltar para servir melhor ao conjuge e ao lar?',
    'Facam um gesto concreto de compaixao um pelo outro hoje — algo que o outro precisa e nao pediu.',
    'Jesus, que tua compaixao flua atraves de nos um para o outro. Que o custo do discipulado nos una em vez de nos dividir. Amen.'
  ),
  dev(10,2,'I — O Noivo se revela','Mateus 11','Descanso para o casal cansado e sobrecarregado','Descanso em Cristo',
    'Jesus convida os cansados a irem a ele — mas muitos casais estao tao ocupados que nem tem tempo de sentir o cansaco. Qual dos dois esta mais sobrecarregado agora?',
    'O convite de Jesus e direcionado a pessoas reais com peso real. O jugo que ele oferece nao e a ausencia de responsabilidade, mas a companhia de alguem que divide a carga. O casal que aprende a descansar junto encontra renovacao que o ativismo espiritual nunca oferece.',
    'O que no ritmo atual do lar de voces esta impedindo o descanso real — e o que precisaria mudar?',
    'Voce tem sido para o conjuge um parceiro que alivia o peso — ou mais uma fonte de demandas e cobranças?',
    'Descansar em Cristo e uma decisao espiritual — em qual area da vida voce precisa parar de tentar resolver tudo e confiar?',
    'Reservem pelo menos 30 minutos hoje para descansar juntos sem agenda — sem celular, sem lista de tarefas, apenas presenca.',
    'Senhor, que o teu descanso seja real em nos. Alivia o peso que carregamos e ensina-nos a caminhar no teu ritmo. Amen.'
  ),
  dev(11,2,'I — O Noivo se revela','Mateus 12','Quem realmente compoe a familia segundo a vontade de Deus','A familia segundo Deus',
    'Quando Jesus reposiciona a lealdade familiar, ele nao desvaloriza os lacos naturais — mas diz que os lacos espirituais tem primazia. O que isso significa para o lar de voces?',
    'A comunidade de fe contextualiza a familia natural dentro de uma lealdade maior. O lar cristao e chamado a ser um lugar onde a vontade de Deus e praticada, transformando o casal em familia no sentido mais pleno.',
    'Ha expectativas familiares — de parentes, cultura ou tradicao — que estao competindo com o chamado de Deus sobre o lar de voces?',
    'Como lider do lar, voce tem ajudado a definir a identidade da familia pelo chamado de Deus — ou tem deixado pressoes externas moldarem os valores de casa?',
    'Voce tem nutrido a espiritualidade do lar com a mesma energia que dedica as expectativas da familia extensa?',
    'Conversem sobre um valor que querem que seja marca da familia de voces — nao herdado, mas escolhido juntos diante de Deus.',
    'Pai, que a nossa familia seja definida pela tua vontade, nao pelas expectativas ao redor. Amen.'
  ),
  dev(12,2,'I — O Noivo se revela','Mateus 13','O que plantamos hoje no lar determina o que colheremos','Semear no lar com paciencia',
    'A parabola do semeador mostra diferentes tipos de solo — qual tipo descreve melhor como o conjuge recebe a Palavra de Deus nos momentos de crise?',
    'O plantio e a colheita sao separados por tempo — nenhum agricultor colhe no mesmo dia em que semeia. O casal que semeia paciencia, oracao e presenca nos anos iniciais esta preparando o solo para uma colheita que talvez so apareca anos depois.',
    'O que voces tem semeado no lar nos ultimos meses — e qual tipo de colheita isso vai produzir se o padrao continuar?',
    'Voce tem semeado palavras de afirmacao e presenca consistente — ou tem esperado que a colheita chegue sem o trabalho da semeadura diaria?',
    'Qual semente de fe, esperanca ou amor voce pode plantar hoje no coracao do conjuge?',
    'Cada um diz ao outro uma semente que quer semear no relacionamento esta semana.',
    'Senhor, que sejamos semeadores fieis no lar que construimos. Da-nos paciencia para esperar a colheita sem desistir. Amen.'
  ),
  dev(13,2,'I — O Noivo se revela','Mateus 14','Prover para a familia mesmo em meio a escassez','Provisao em meio a escassez',
    'Com cinco paes e dois peixes, Jesus alimentou uma multidao — o que voces tem entregado a Deus que parece insuficiente para as necessidades do lar?',
    'O milagre da multiplicacao comeca com a entrega daquilo que parecia pouco demais. Deus nao espera abundancia para agir; ele usa a escassez consagrada. O casal que aprende a trazer o pouco que tem e oferece-lo a Deus descobre uma provisao que excede os calculos.',
    'Em qual area de escassez — financeira, emocional, espiritual — voces precisam juntos entregar a Jesus e confiar na multiplicacao?',
    'Pedro afundou quando tirou os olhos de Jesus — em qual momento de pressao voce mais tende a focar no problema ao inves de no Senhor?',
    'Como voce tem respondido as temporadas de escassez no lar — com confianca ou com ansiedade que pressiona o conjuge?',
    'Identifiquem uma area de escassez real e orem especificamente sobre ela, entregando a Deus o que parece pouco.',
    'Senhor que multiplicaste os paes, multiplica tambem o que temos e oferecemos. Amen.'
  ),
  mesa(14,2,'I — O Noivo se revela','Mesa da Alianca — Semana 2'),

  // SEMANA 3
  dev(15,3,'I — O Noivo se revela','Mateus 15','Fe perseverante em favor de quem amamos','Fe perseverante pelo outro',
    'A mulher cananeia nao desistiu mesmo diante do silencio de Jesus — como voces tem respondido quando a resposta de Deus tarda para uma necessidade do lar?',
    'A persistencia dessa mae e notavel: ela ama o suficiente para nao desistir diante do silencio e da aparente recusa. Interceder persistentemente pelo conjuge e pelos filhos e um dos atos mais profundos de amor que um casal pode praticar.',
    'Por qual necessidade do conjuge ou do lar voce precisa orar com mais persistencia — e o que tem impedido essa persistencia?',
    'Voce tem intercedido pelo conjuge com a mesma persistencia da mulher cananeia — ou desiste quando nao ve resultado imediato?',
    'Que batalha espiritual voce esta travando em favor do lar que exige fe persistente mesmo sem resposta visivel ainda?',
    'Comprometam-se mutuamente a orar diariamente por um aspecto especifico do desenvolvimento espiritual um do outro.',
    'Senhor, que a nossa fe persista mesmo no silencio. Que amemos o suficiente para nao desistir de interceder. Amen.'
  ),
  dev(16,3,'I — O Noivo se revela','Mateus 16','Identidade de Cristo como rocha que sustenta o lar','A pedra angular do lar',
    'Jesus pergunta \"quem dizeis vos que eu sou?\" — essa mesma pergunta define o fundamento do casamento cristao. O que Cristo significa concretamente para a vida a dois de voces?',
    'A confissao de Pedro e o fundamento sobre o qual tudo mais e construido. O lar que tem essa confissao como centro vivo nao e amecado pelas portas do inferno. Cristo nao e apenas o tema dos devocionais; e a pedra angular que segura tudo.',
    'O que no cotidiano do lar mostra que Cristo e o centro — e o que revela que outras prioridades tomaram seu lugar?',
    'Negar-se a si mesmo e tomar a cruz e o chamado de todo seguidor — como isso se traduz em lideranca servil dentro do seu lar?',
    'A confissao de quem Jesus e muda tudo sobre como voce enxerga o relacionamento — o que mudaria no lar se voce vivesse essa confissao mais plenamente?',
    'Declarem juntos em voz alta quem Jesus e para voces — nao apenas teologicamente, mas pessoalmente.',
    'Senhor Jesus, que tu sejas realmente a pedra angular do nosso lar, nao apenas a figura decorativa da nossa religiosidade. Amen.'
  ),
  dev(17,3,'I — O Noivo se revela','Mateus 17; Mateus 18','Fe pequena que move grandes provacoes familiares / Perdao como habito diario do casamento','Fe pequena e perdao diario',
    'Jesus diz que fe do tamanho de um grao de mostarda move montanhas — e depois diz que devemos perdoar setenta vezes sete. O que a fe e o perdao tem em comum no casamento?',
    'O perdao de 70x7 nao e uma hiperbole numerica; e a declaracao de que o perdao no casamento nao tem um limite calculavel. Fe e perdao exigem humildade e dependencia constante de Deus.',
    'Qual ofensa do conjuge voce tem dificuldade de perdoar genuinamente — nao apenas verbalmente, mas de coracao?',
    'Voce tem pedido perdao com a mesma disposicao com que exige ser perdoado — ou ha um padrao assimetrico nessa area?',
    'O perdao nao significa que o que aconteceu nao importou; significa escolher nao deixar isso definir o relacionamento. Em qual area voce precisa tomar essa decisao?',
    'Se ha algo por perdoar pendente entre voces, este e o dia de dize-lo em voz alta e orarem juntos sobre isso.',
    'Senhor, que o perdao seja habito diario do nosso lar, nao excecao dificil. Amen.'
  ),
  dev(18,3,'I — O Noivo se revela','Mateus 19','Ensino direto de Jesus sobre permanencia e fidelidade conjugal','O que Deus uniu',
    'Jesus diz que o homem deixara pai e mae e se unira a mulher. Ha vinculos que voces ainda nao deixaram que competem com a unidade do casal?',
    'O ensino de Jesus sobre o casamento e radical: o que Deus uniu nao deve ser separado pelo homem. Ele reconduz os fariseus ao principio original de Deus. A permanencia conjugal nao e uma regra religiosa; e a expressao de um amor que reflete a fidelidade de Deus.',
    'O que concretamente voces tem feito para cultivar a permanencia do relacionamento — alem de simplesmente nao se separarem?',
    'Deixar pai e mae e unir-se a esposa e uma acao e uma prioridade — em quais situacoes voce ainda escolhe outras lealdades antes da sua esposa?',
    'A unidade conjugal exige que a mulher seja a companheira mais proxima do esposo — voce tem cultivado essa proximidade ou deixado crescer distancia?',
    'Renovem verbalmente o compromisso de permanencia — nao nos votos formais, mas em palavras simples e honestas de hoje.',
    'Senhor que uniu o primeiro casal, sustenta o que uniu em nos. Amen.'
  ),
  dev(19,3,'I — O Noivo se revela','Mateus 20','Graca e servico mutuo, nao comparacao de meritos','Servir sem comparar',
    'Os trabalhadores que entraram cedo ficaram com raiva dos que chegaram tarde. Voce ja ficou ressentido por sentir que serve mais que o conjuge sem o devido reconhecimento?',
    'A parabola e o pedido de Salome revelam dois padroes que destroem relacionamentos: comparacao de merito e busca de posicao. Jesus inverte a logica: o maior e o servo de todos. A contabilidade de quem fez mais e veneno lento.',
    'Voce tem servido ao conjuge com alegria ou com a expectativa de que o servico seja reconhecido e retribuido proporcionalmente?',
    'Voce exerce lideranca no lar como servico genuino ou como posicao a ser mantida?',
    'Em quais areas do lar voce ainda guarda uma contagem interna de quanto faz versus quanto o conjuge faz?',
    'Hoje, facam algo pelo conjuge sem expectativa de reconhecimento — e nao digam que fizeram.',
    'Senhor, livra-nos da comparacao que envenena o amor. Que sirvamos um ao outro como tu nos serviste. Amen.'
  ),
  dev(20,3,'I — O Noivo se revela','Mateus 21','Zelo e frutificacao real da fe dentro de casa','Zelo e fruto real em casa',
    'Jesus amaldicoou a figueira que tinha folhas mas nenhum fruto — que aspecto da vida espiritual do lar parece frondoso por fora mas tem pouco fruto real por dentro?',
    'A purificacao do templo mostra Jesus que se indigna com a diferenca entre aparencia religiosa e realidade espiritual. O lar cristao pode ter todos os simbolos externos de fe sem o fruto concreto de amor, paciencia e servico.',
    'O que indicaria externamente a um observador que o lar de voces e genuinamente cristao — alem das decoracoes e dos habitos religiosos visiveis?',
    'Ha alguma area onde voce tem aparencia de lideranca espiritual sem a substancia do servico diario e do amor sacrificial?',
    'Que fruto do Espirito esta crescendo genuinamente em voce — e como isso aparece no relacionamento?',
    'Identifiquem juntos um fruto espiritual concreto que querem cultivar no lar nos proximos 30 dias.',
    'Senhor, que o nosso lar produza fruto real, nao apenas folhagem religiosa. Amen.'
  ),
  mesa(21,3,'I — O Noivo se revela','Mesa da Alianca — Semana 3'),

  // SEMANA 4
  dev(22,4,'I — O Noivo se revela','Mateus 22','Amar a Deus e ao conjuge como resumo de toda a Lei','O maior mandamento no lar',
    'Jesus resume toda a Lei em amor a Deus e amor ao proximo — quem e o proximo mais imediato de um conjuge senao o proprio conjuge?',
    'Amar a Deus com toda a forca e ao proximo como a si mesmo nao e primeiro uma lista de comportamentos, mas uma orientacao do coracao. O amor conjugal que nasce desse fundamento nao e apenas sentimento, mas compromisso enraizado na natureza do proprio Deus.',
    'O que muda na forma como voce trata o conjuge quando voce o ve como o \"proximo\" mais imediato a quem deve amor?',
    'Voce tem amado sua esposa com a mesma intensidade com que professa amar a Deus — ou sua devocao a Deus e mais visivel que seu amor por ela?',
    'Em quais momentos dificeis do relacionamento voce mais precisa lembrar que amar o conjuge e parte do amar a Deus?',
    'Digam um ao outro especificamente como o conjuge os ajudou a amar mais a Deus esta semana.',
    'Senhor, que o amor que temos por ti transborde para o amor que temos um pelo outro. Amen.'
  ),
  dev(23,4,'I — O Noivo se revela','Mateus 23','Alerta contra hipocrisia religiosa dentro do proprio lar','Autenticidade contra hipocrisia',
    'Jesus denuncia lideres que ensinam mas nao praticam — ha algo que voces ensinam com palavras no lar mas contradizem com o comportamento diario?',
    'A hipocrisia que Jesus denuncia nao e a do pecador confesso, mas a de quem mantem aparencia de santidade enquanto por dentro esta cheio de inconsistencia. O lar cristao precisa de autenticidade mais do que de perfeicao.',
    'Em qual area especifica ha uma distancia entre o que voces professam como valores e o que realmente acontece no cotidiano do lar?',
    'Voce tem sido o mesmo dentro de casa que fora dela — ou ha uma persona de espiritualidade publica que nao corresponde ao marido real?',
    'A autenticidade no lar comeca pela disposicao de ser vista como voce realmente e — em qual aspecto voce tem escondido luta ou fraqueza do conjuge?',
    'Compartilhem com honestidade uma area de inconsistencia pessoal — e orem um pelo outro sem julgamento.',
    'Senhor, guarda-nos da hipocrisia e da aparencia religiosa. Que o nosso lar seja lugar de autenticidade e graca. Amen.'
  ),
  dev(24,4,'I — O Noivo se revela','Mateus 24','Viver alerta e fiel em tempos de incerteza','Vigilancia fiel juntos',
    'Em tempos de incerteza — geopolitica, economica, familiar — o que fundamenta a paz do lar de voces?',
    'Jesus nao instrui seus discipulos a ter medo dos sinais dos tempos, mas a permanecerem fieis e vigilantes. O casal vigilante nao e o que esta ansioso, mas o que esta atento — as necessidades do conjuge, ao estado espiritual do lar.',
    'A incerteza do tempo em que vivemos aproxima ou afasta o casal — e o que poderia mudar para que as crises fortalecessem o vinculo?',
    'Voce tem sido fonte de estabilidade e esperanca para o conjuge em tempos dificeis — ou a ansiedade dele aumenta quando voce esta presente?',
    'Como a perspectiva escatologica muda a forma como voce enfrenta as incertezas praticas do dia a dia?',
    'Conversem sobre um medo concreto que cada um tem sobre o futuro e orem especificamente sobre ele.',
    'Senhor, que a tua soberania sobre os tempos nos de paz que o mundo nao pode dar. Que sejamos fieis enquanto esperamos. Amen.'
  ),
  dev(25,4,'I — O Noivo se revela','Mateus 25; Mateus 26','Fidelidade pratica enquanto se espera o Noivo / Entrega e obediencia do casal sob pressao extrema','Fidelidade na espera',
    'As dez virgens estavam todas esperando, mas metade nao estava preparada — como o casal pode cultivar prontidao espiritual no dia a dia sem ser consumido pelo imediatismo?',
    'Mateus 25 e 26 formam um contraste poderoso: a sabedoria de quem se prepara e a ternura de quem unge com o que tem. No Getsemani, Jesus oferece o modelo ultimo de obediencia sob pressao. Fidelidade nao e apenas sobreviver a espera, mas investir com o que se tem enquanto se espera.',
    'O que o casal esta investindo agora — em fe, amor, servico — que tera valor eterno quando o Senhor vier?',
    'Voce ja teve momentos de querer que o calice passasse — e escolheu a obediencia mesmo assim. Como isso formou o seu carater?',
    'Ha gestos de amor ao conjuge que voce tem inibido por medo de parecer excessivo — e que precisariam ser dados?',
    'Facam juntos um gesto de amor generoso e aparentemente desproporcional um pelo outro.',
    'Senhor, que sejamos fieis na espera e corajosos na entrega. Amen.'
  ),
  dev(26,4,'I — O Noivo se revela','Mateus 27','O preco do amor sacrificial','Amor que doa tudo',
    'A cruz e o ponto maximo do amor de Deus — o que a disposicao de Cristo de morrer pelo amado diz ao casal sobre a natureza do amor aliancado?',
    'No amor que Deus tem pela humanidade, ele nao calculou o custo antes de dar o filho. O amor conjugal cristao tem na cruz seu modelo definitivo: nao e amor que espera retorno garantido, mas que escolhe o bem do outro mesmo quando custa.',
    'Em qual area do relacionamento voce ainda esta calculando o custo antes de se entregar plenamente?',
    'Efesios 5 chama o marido a amar como Cristo amou — como a cruz redefine o que significa amar sua esposa de forma sacrificial?',
    'O amor sacrificial nao e apenas suportar, mas se entregar ativamente — de que forma voce pode amar o conjuge de forma mais generosa e intencional?',
    'Hoje, cada um faz algo que custa pessoalmente mas beneficia o conjuge — sem esperar reciprocidade.',
    'Jesus, que deste tudo por nos, ensina-nos a amar com a mesma generosidade. Amen.'
  ),
  dev(27,4,'I — O Noivo se revela','Mateus 28','Esperanca viva e missao compartilhada para o novo lar','Ressurreicao e missao juntos',
    'A ressurreicao de Jesus e a declaracao de que a morte nao tem a ultima palavra. Como essa esperanca viva afeta a forma como voces encaram os \"fins\" no relacionamento?',
    'A Grande Comissao e dada a uma comunidade. O casal cristao e uma unidade missionaria: a forma como amam dentro de casa testemunha ao mundo de fora. A ressurreicao garante que o amor que parece morrer pode ressurgir.',
    'Como o lar de voces esta cumprindo alguma dimensao da Grande Comissao — dentro da familia, no bairro, no trabalho?',
    'A promessa de que Jesus esta com voces ate o fim dos seculos e a base da coragem missionaria — como voce pode liderar o lar para fora de si mesmo?',
    'Voce enxerga o lar como missao ou apenas como espaco privado? O que mudaria se voce visse a familia como agente do Reino?',
    'Conversem sobre uma forma concreta de o lar de voces servir alguem de fora nesta semana.',
    'Senhor ressuscitado, que a tua vitoria sobre a morte seja esperanca viva no nosso lar. Envia-nos juntos para o mundo. Amen.'
  ),
  mesa(28,4,'I — O Noivo se revela','Mesa da Alianca — Semana 4'),
];

let header = `export interface DiaFamiliar {
  dia: number;
  semana: number;
  estacao: string;
  leitura: string;
  subtema: string;
  tema: string;
  tipo: 'devocional' | 'mesa-alianca' | 'aplicacao';
  perguntaGancho?: string;
  reflexaoTexto?: string;
  perguntaGeradora?: string;
  reflexaoHomem?: string;
  reflexaoMulher?: string;
  reflexaoFilhos?: string;
  compromissoPratico?: string;
  oracaoAlianca?: string;
  leituraComplementar?: string;
}

export const DEVOCIONAL_FAMILIAR: DiaFamiliar[] = [
`;

let content = '';
for (const d of days) {
  content += '  ' + JSON.stringify(d) + ',\n';
}

fs.writeFileSync(outPath, header + content);
console.log('Written days 1-28, file size:', fs.statSync(outPath).size);
