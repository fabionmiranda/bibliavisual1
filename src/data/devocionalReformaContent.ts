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
