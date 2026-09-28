export interface SecaoDia {
  tipo: 'contexto' | 'analise' | 'reflexao' | 'oracao' | 'leitura';
  titulo: string;
  paragrafos: string[];
  citacao?: string;
  citacaoAutor?: string;
}

export interface DiaDevoContent {
  dia: number;
  data: string;
  titulo: string;
  subtitulo: string;
  versiculo: string;
  versiculoRef: string;
  secoes: SecaoDia[];
  perguntas: string[];
  oracao: string;
  leituraComplementar: string;
}

const DIAS_CONTENT: Record<number, DiaDevoContent> = {
  2: {
    dia: 2,
    data: '2 de outubro de 2026',
    titulo: 'Isabel, a Católica: A Reforma Antes da Reforma',
    subtitulo: 'Capítulo 1 — Parte 1',
    versiculo: 'Mas Deus escolheu as coisas loucas do mundo para confundir as sábias; e Deus escolheu as coisas fracas do mundo para confundir as fortes.',
    versiculoRef: '1 Coríntios 1.27',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'Antes de Lutero, Houve Isabel',
        paragrafos: [
          'Quando falamos em Reforma, o nome que vem imediatamente à mente é Martinho Lutero — o monge alemão que, em 1517, afixou suas 95 Teses na porta da Igreja do Castelo de Wittenberg. Mas Justo L. González nos desafia a recuar alguns anos. Antes de Lutero, houve Isabel.',
          'Isabel de Castela — conhecida como "a Católica" — governou a Espanha na virada do século XV para o XVI. Ao lado de seu marido Fernando de Aragão, ela não apenas unificou politicamente a Espanha e patrocinou a viagem de Colombo (1492). Ela também empreendeu algo que a historiografia frequentemente ignora: uma profunda reforma do clero espanhol, décadas antes do protesto luterano.',
          'A questão central para Isabel era simples e urgente: a Igreja espanhola estava corrompida. Bispos acumulavam cargos e riquezas sem pisar em suas dioceses. Conventos haviam perdido toda disciplina. O povo não tinha pastores; tinha administradores ausentes. Algo precisava mudar.',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'A Alavanca do Poder: Quem Nomeia, Reforma',
        paragrafos: [
          'Isabel entendeu algo que reformadores posteriores aprenderiam a duras penas: a chave da reforma institucional é o controle das nomeações. Enquanto Roma nomeava bispos por critérios políticos e financeiros, qualquer reforma seria superficial. Isabel negociou com o papado o chamado "direito de padroado" — a prerrogativa real de indicar bispos para a Espanha.',
          'Com esse poder nas mãos, ela pôde nomear homens de caráter. O mais importante deles foi Francisco Ximénez de Cisneros — frade franciscano, humanista, homem de oração e disciplina rigorosa. Isabel o nomeou arcebispo de Toledo, a sé mais poderosa da Espanha.',
          'Há um episódio notável: Cisneros se recusou a aceitar o cargo. Para ele, a vida de pobreza e retiro contemplativo era incompatível com a grandeza episcopal. Foi necessário que Roma emitisse uma bula papal ordenando-o a aceitar. Ele obedeceu — mas nunca abandonou o hábito franciscano, nem a simplicidade de vida, mesmo chefiando a Igreja mais rica da Espanha.',
        ],
        citacao: 'Esse paradoxo diz muito sobre a tensão que percorre todo este período: a reforma genuína de espírito lutando dentro de estruturas de poder institucional.',
      },
      {
        tipo: 'analise',
        titulo: 'Cisneros e a Poliglota Complutense',
        paragrafos: [
          'Cisneros não era apenas um administrador. Era um humanista que compreendia que a renovação da Igreja passava pela renovação do conhecimento bíblico. Seu projeto mais ambicioso foi a Bíblia Poliglota Complutense — uma edição da Bíblia com o texto original em hebraico, aramaico, grego e latim, impressa em colunas paralelas para facilitar a comparação e o estudo.',
          'Esse projeto, concluído em 1517 (o mesmo ano das 95 Teses), reuniu os melhores hebraístas e helenistas da Espanha. Era humanismo a serviço da teologia: voltar às fontes, ad fontes, para que a Igreja fosse reformada pela Palavra em sua forma mais fiel.',
          'Erasmo de Roterdã, o grande humanista da época, tinha um projeto semelhante — sua edição crítica do Novo Testamento grego, publicada em 1516. Reformadores protestantes e católicos beberam da mesma fonte humanista. A divergência viria depois — e foi mais amarga exatamente porque começaram no mesmo lugar.',
        ],
        citacao: 'Reformadores protestantes e católicos beberam da mesma fonte humanista. A divergência viria depois — e foi mais amarga exatamente porque começaram no mesmo lugar.',
      },
      {
        tipo: 'analise',
        titulo: 'O Nó Central de uma Teia Geopolítica',
        paragrafos: [
          'Isabel importa não apenas pela reforma que empreendeu, mas pela teia política que ela representa. Sua neta Joana teve um filho chamado Carlos — que se tornaria Carlos I de Espanha e Carlos V, imperador do Sacro Império Romano-Germânico. O mesmo homem que julgaria Lutero em Worms em 1521.',
          'Sua filha Catarina de Aragão casou-se com Henrique VIII da Inglaterra — e o fracasso desse casamento desencadearia o cisma anglicano. Seu neto Felipe II herdaria a hegemonia espanhola e tentaria suprimir a Reforma nos Países Baixos.',
        ],
        citacao: 'Isabel não é um personagem isolado. Ela é o nó central de uma teia que conecta Lutero, Henrique VIII, Carlos V e Felipe II. Sem entender Isabel, não se entende o século XVI.',
        citacaoAutor: 'Justo L. González',
      },
    ],
    perguntas: [
      'Isabel reformou a Igreja sem romper com ela. Cisneros reformou como bispo sem abrir mão da espiritualidade de frade. Que tensão entre instituição e autenticidade espiritual você reconhece na sua própria vida de fé ou contexto eclesial?',
      'A chave da reforma de Isabel foi o controle das nomeações — quem ocupa os cargos de liderança determina a direção da instituição. Você concorda com essa leitura? Como isso se aplica às igrejas hoje?',
      'González começa pela Espanha, não pela Alemanha. O que essa inversão de perspectiva revela sobre os pontos cegos que temos ao contar a história da nossa própria fé?',
    ],
    oracao: 'Senhor, obrigado pela lembrança de que Tu ages na história muito antes de percebermos. Antes de Lutero, havia Isabel. Antes da ruptura, havia reforma. Antes do escândalo público, havia o trabalho silencioso de homens e mulheres que buscavam um clero fiel e uma Igreja renovada.\n\nEnsina-nos a ter paciência com os processos lentos da renovação. E dá-nos sabedoria para identificar as alavancas certas — os pontos onde uma mudança genuína pode começar.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. Capítulo 1: "Isabel, a Católica" (pp. 11–28).',
  },
  1: {
    dia: 1,
    data: '1 de outubro de 2026',
    titulo: 'O Século XVI: Quando o Mundo Mudou de Vez',
    subtitulo: 'Introdução geral à obra — A Era dos Reformadores',
    versiculo: 'Eis que faço uma coisa nova; agora ela se manifesta; não a percebeis vós?',
    versiculoRef: 'Isaías 43.19',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'Contexto Histórico',
        paragrafos: [
          'O século XVI foi, talvez, o século mais transformador da história do cristianismo desde a era apostólica. Em menos de cem anos, a Igreja que havia dominado a Europa por mil anos se fragmentou de forma irreversível, nasceram dezenas de tradições cristãs distintas, e o mapa religioso do Ocidente foi redesenhado para sempre.',
          'Mas o historiador Justo L. González nos convida, logo de início, a ampliar o foco. O título do volume — "A Era dos Reformadores" — poderia sugerir que se trata apenas de Lutero, Calvino e Zuínglio. Não é assim. González escreve de um ponto de vista latino-americano, e isso muda a pergunta.',
          'Ele nos lembra: enquanto Lutero pregava em Wittenberg, Cortés desembarcava no México. Enquanto Calvino sistematizava a teologia reformada em Genebra, Francisco Pizarro conquistava o Império Inca. A Era dos Reformadores é simultaneamente a Era dos Conquistadores.',
        ],
        citacao: 'A Era dos Reformadores é simultaneamente a Era dos Conquistadores — dois eventos do mesmo século, moldados pelas mesmas forças políticas, com consequências igualmente duradouras para o cristianismo mundial.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'O Que Estava em Jogo',
        paragrafos: [
          'Para compreender a Reforma, é preciso entender o que existia antes dela: o ideal do Corpus Christianum. Durante séculos, a Europa cristã funcionava sob a premissa de que Igreja e sociedade eram a mesma coisa. Nascer significava ser batizado. Ser cidadão significava ser cristão. O papa era a cabeça espiritual de toda a cristandade, e os reis reinavam sob sua autoridade.',
          'Esse ideal nunca foi perfeito — estava cheio de tensões, corrupções e contradições. Mas era o horizonte que organizava a vida de todos.',
          'A Reforma vai destruir esse horizonte. Não de uma vez, não por um plano deliberado — mas por uma série de eventos que, acumulados, tornam impossível restaurar a unidade perdida. Ao final do século XVI, a ideia de uma Europa cristã unificada sob Roma será, na prática, história.',
          'O pluralismo religioso que hoje consideramos natural — a coexistência de católicos, luteranos, calvinistas, anglicanos, batistas — não foi planejado. Foi uma consequência não-intencional de homens e mulheres que queriam reformar a Igreja, não dividi-la.',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'A Perspectiva de González',
        paragrafos: [
          'González escreve como teólogo cubano-americano, e essa perspectiva importa. A historiografia clássica da Reforma é germanocêntrica: começa com Lutero em 1517 e trata a Espanha principalmente como inimiga da Reforma. González inverte a ordem.',
          'Para ele, a história começa com Isabel de Castela e o cardeal Cisneros, que ainda no final do século XV já haviam iniciado uma profunda reforma do clero espanhol — antes de qualquer tese de Lutero. A Espanha não é apenas o obstáculo à Reforma; é parte de sua pré-história.',
          'Além disso, González insiste que a conquista da América é inseparável da Reforma Protestante como capítulo da história do cristianismo. Os dois eventos definiram o que seria o cristianismo nos séculos seguintes — um em direção ao norte da Europa e ao mundo anglófono; outro em direção à América Latina e ao mundo ibérico.',
        ],
        citacao: 'Entender a Reforma sem a Conquista é entender metade da história.',
        citacaoAutor: 'Justo L. González',
      },
    ],
    perguntas: [
      'Você costuma pensar na Reforma Protestante como um evento europeu distante, ou como algo que moldou diretamente a fé que você pratica? De que forma sua tradição cristã é herdeira do século XVI?',
      'A Reforma não foi planejada — foi consequência de homens e mulheres que queriam apenas corrigir erros. O que isso diz sobre como Deus age na história? Sobre como movimentos de renovação se desenvolvem?',
      'González lembra que a Era dos Reformadores é também a Era dos Conquistadores. Como essa perspectiva ampliada muda a maneira de você ler a história da Igreja?',
    ],
    oracao: 'Senhor, ao iniciarmos esta jornada pelo século XVI, pedimos sabedoria para olhar a história sem ingenuidade e sem cinismo. Ajuda-nos a ver Tua mão nos eventos que pareciam apenas políticos, nos conflitos que pareciam apenas humanos, nas rupturas que produziram consequências que ninguém previu.\n\nQue este estudo não seja apenas informação histórica, mas formação espiritual. Que ao conhecermos melhor de onde viemos, saibamos melhor para onde vamos.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. (Série "E até aos confins da Terra", vol. 6) — Introdução e Capítulo 14 (para visão panorâmica).',
  },
};

export default DIAS_CONTENT;
