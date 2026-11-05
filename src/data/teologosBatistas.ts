import type { LucideIcon } from 'lucide-react';
import { BookOpen, Droplets, Heart, Landmark, PenLine, RefreshCw, Scale, ScrollText, Sprout } from 'lucide-react';

// Teólogos de "Os Batistas e a Bíblia" (Bush & Nettles) com página própria.
// Rota: /biblioteca/livros/os-batistas-e-a-biblia/<slug>
// Nos textos: **trecho** = negrito branco; ==trecho== = destaque colorido.

export type EixoTeologo = { num: string; icone: LucideIcon; cor: string; titulo: string; texto: string; destaque: string };
export type MarcoTeologo = { ano: string; titulo: string; texto: string };
export type PerguntaGrupo = { p: string; leitura: string; r: string };
export type BlocoGrupo = { bloco: string; cor: string; perguntas: PerguntaGrupo[] };
export type ObraTeologo = { ano: string; titulo: string; nota: string };
export type ReferenciaABNT = { autor: string; titulo: string; resto: string };

export type TeologoBatista = {
  slug: string;
  num: number;
  cap: string;
  grupo: string;
  nome: string;
  nomeCurto: string;
  datas: string;
  foto?: string;
  fotoNota?: string;
  subtitulo: string;
  intro: string;
  citacao: string;
  eixosSub: string;
  eixos: EixoTeologo[];
  linhaSub: string;
  linha: MarcoTeologo[];
  licoes: { t: string; d: string }[];
  grupoPerguntas: BlocoGrupo[];
  obras: ObraTeologo[];
  referencias: ReferenciaABNT[];
};

export const TEOLOGOS_BATISTAS: TeologoBatista[] = [
  {
    slug: 'john-smyth',
    num: 1,
    cap: 'Cap. 1',
    grupo: 'Batistas Gerais · séc. XVII',
    nome: 'John Smyth',
    nomeCurto: 'Smyth',
    datas: 'c. 1570–1612',
    foto: 'https://commons.wikimedia.org/wiki/Special:FilePath/John-Smyth.png',
    fotoNota: 'Imagem ilustrativa — não se conhece retrato autenticado de Smyth.',
    subtitulo: 'O primeiro batista inglês e a Escritura como regra para reconstruir a igreja',
    intro: 'Pastor ==puritano==, depois ==separatista==, John Smyth liderou em **1609**, no exílio em **Amsterdã**, a ==primeira igreja batista de fala inglesa==. Bush e Nettles abrem Os Batistas e a Bíblia com ele porque, desde o primeiro dia, a identidade batista nasceu de uma pergunta bíblica: **o que o Novo Testamento realmente ensina sobre a igreja e o batismo?**',
    citacao: 'Para Smyth, a Escritura — nos textos originais que Deus inspirou — era plenamente confiável e suficiente para dizer à igreja como crer, adorar e se organizar.',
    eixosSub: 'Quatro eixos para entender sua relação com a Escritura',
    eixos: [
      {
        num: '01', icone: BookOpen, cor: '#f97316',
        titulo: 'A Escritura como única regra para a igreja',
        texto: 'Smyth herdou dos puritanos a convicção de que ==a Bíblia é a única regra de fé e prática==. Mas foi além deles: se a Escritura é suficiente, então também **a forma da igreja** — membros, culto, oficiais e sacramentos — deve ser ==reconstruída a partir do Novo Testamento==, e não da tradição. Cada passo da sua trajetória (separatismo, batismo de crentes, igreja por aliança) nasceu da tentativa de **obedecer ao texto bíblico de modo consequente**.',
        destaque: 'Se a Bíblia é suficiente, a igreja deve ser reconstruída por ela — e não pela tradição.',
      },
      {
        num: '02', icone: ScrollText, cor: '#fbbf24',
        titulo: 'Os originais inspirados e o culto “espiritual”',
        texto: 'Em **The Differences of the Churches of the Separation** (1608), Smyth sustentou que ==inspirados são os textos originais em hebraico e grego==; as traduções são obra humana, úteis e boas, mas **derivadas**. Por isso defendia que, no ato do culto, não se lesse de um livro — nem mesmo de uma tradução da Bíblia: o pregador deveria ter estudado antes e falar ==“de coração”==, se possível a partir dos originais. A posição é estranha para nós, mas revela algo central: Smyth tinha uma **reverência extrema pela Palavra de Deus tal como Deus a deu**.',
        destaque: 'Inspirado é o texto que Deus deu; a tradução serve a ele, mas não o substitui.',
      },
      {
        num: '03', icone: Droplets, cor: '#2dd4bf',
        titulo: 'Do texto ao batismo de crentes',
        texto: 'Lendo o Novo Testamento, Smyth concluiu que ==o batismo pertence aos que se arrependem e creem==, e que a igreja é formada por **crentes batizados unidos em aliança**. Em **The Character of the Beast** (1609), argumentou que o batismo infantil não tinha base nas Escrituras. Coerente com isso, em 1609 ==batizou a si mesmo e depois os demais== — um gesto polêmico, que ele mesmo depois questionou, mas que mostra **até onde ia sua disposição de seguir o texto**.',
        destaque: 'O batismo de crentes não nasceu de uma tradição, mas da leitura do Novo Testamento.',
      },
      {
        num: '04', icone: RefreshCw, cor: '#a78bfa',
        titulo: 'Disposto a mudar — e o risco do subjetivismo',
        texto: 'Seus adversários o acusavam de **inconstância**: puritano, separatista, batista, quase menonita. Smyth respondia que ==mudar diante de uma luz melhor da Escritura é dever do cristão==. No fim da vida, porém, sob influência menonita, seus escritos (**Propositions and Conclusions**, 1612) passaram a enfatizar a obra interior do Espírito no “novo homem” de um modo que **relativizava os meios exteriores** — chegando a dizer que o regenerado está “acima” da lei e das Escrituras, embora nada possa fazer contra elas. É a tensão que Bush e Nettles apontam: ==a Escritura como autoridade final precisa ser guardada tanto contra a tradição quanto contra a experiência==.',
        destaque: 'Mudar pela Escritura é virtude; colocar a experiência acima dela é perigo.',
      },
    ],
    linhaSub: 'De Cambridge a Amsterdã',
    linha: [
      { ano: 'c. 1570', titulo: 'Nascimento na Inglaterra', texto: 'Nasce no norte da Inglaterra, na região de Lincolnshire/Nottinghamshire.' },
      { ano: '1590s', titulo: 'Cambridge e o puritanismo', texto: 'Estuda e é fellow do **Christ’s College, em Cambridge**, onde tem como tutor o separatista ==Francis Johnson== e respira o ambiente ==puritano==.' },
      { ano: '1600–1602', titulo: 'Pregador em Lincoln', texto: 'Ordenado na **Igreja da Inglaterra**, serve como ==pregador da cidade de Lincoln==, até ser afastado do cargo.' },
      { ano: 'c. 1606', titulo: 'Separatista em Gainsborough', texto: '**Rompe com a Igreja oficial** e lidera uma ==congregação separatista em Gainsborough==, ao lado de **Thomas Helwys**.' },
      { ano: '1608', titulo: 'Exílio em Amsterdã', texto: 'Perseguida, a congregação ==foge para a Holanda==. Smyth publica **The Differences of the Churches of the Separation**.' },
      { ano: '1609', titulo: 'A primeira igreja batista inglesa', texto: 'Convencido pelo **Novo Testamento** de que ==o batismo é para crentes==, batiza a si mesmo e depois os membros — nasce a **primeira igreja batista de fala inglesa**.' },
      { ano: '1610–1612', titulo: 'Aproximação dos menonitas', texto: 'Passa a ==duvidar da validade do seu autobatismo== e busca unir-se aos **menonitas Waterlander**. Helwys e outros se separam dele e ==voltam à Inglaterra== (1612).' },
      { ano: '1612', titulo: 'Morte em Amsterdã', texto: 'Morre de tuberculose. Seu último escrito, a **Retratação**, ==pede perdão pela aspereza== com que tratou outros cristãos.' },
    ],
    licoes: [
      { t: 'Levar a Bíblia a sério tem consequências', d: 'Para Smyth, crer na ==suficiência da Escritura== significava **deixá-la reformar a vida da igreja** — mesmo quando isso custou exílio e perseguição.' },
      { t: 'Os originais importam', d: 'Sua reverência pelo **hebraico e pelo grego** lembra que ==a autoridade está no texto que Deus inspirou== — e que o estudo cuidadoso do texto é parte da fidelidade.' },
      { t: 'Escritura acima da experiência', d: 'O fim da sua trajetória alerta: ==a obra do Espírito nunca nos coloca acima da Palavra== que **o próprio Espírito inspirou**.' },
    ],
    grupoPerguntas: [
      {
        bloco: 'Para começar', cor: '#fbbf24',
        perguntas: [
          {
            p: 'Se a sua igreja tivesse que se organizar apenas com o Novo Testamento em mãos, o que você manteria e o que mudaria?',
            leitura: 'At 17.11',
            r: 'Não há uma resposta única — o objetivo é perceber que ==Smyth fez exatamente essa pergunta==. Nem tudo o que herdamos da tradição é errado, mas **a Escritura julga a tradição, e não o contrário**. Como os bereanos, somos chamados a examinar tudo "nas Escrituras" para ver se as coisas são de fato assim.',
          },
        ],
      },
      {
        bloco: 'Smyth e a Bíblia', cor: '#f97316',
        perguntas: [
          {
            p: 'Smyth dizia que só os originais em hebraico e grego são inspirados. O que isso significa para a Bíblia que lemos em português?',
            leitura: '2Tm 3.16; Ne 8.8',
            r: 'A fé histórica dos batistas — por exemplo, a **Confissão de Fé de Londres de 1689 (cap. 1, §8)** — afirma que ==os originais foram inspirados por Deus== e, ao mesmo tempo, que a Escritura deve ser **traduzida para a língua de cada povo**, para que todos possam ler e adorar. Smyth acertou ao honrar os originais; a Confissão foi mais equilibrada ao valorizar as traduções fiéis, que ==comunicam verdadeiramente a Palavra de Deus==.',
          },
          {
            p: 'Leiam Atos 2.38-41 e 8.35-38. Por que textos como esses levaram Smyth a defender o batismo de crentes?',
            leitura: 'At 2.38-41; 8.35-38',
            r: 'Nos dois textos a ordem é a mesma: ==ouvir a Palavra, crer/arrepender-se e então ser batizado==. "Os que aceitaram a sua palavra foram batizados"; o eunuco é batizado depois de crer em Jesus. Smyth concluiu que **o batismo é o sinal público de quem já se tornou discípulo**, e que a igreja é formada por crentes batizados.',
          },
          {
            p: 'Smyth batizou a si mesmo. O que podemos aprender com esse gesto — tanto o acerto quanto o problema?',
            leitura: 'Mt 28.19; Ef 4.4-6',
            r: '**O acerto:** a coragem de obedecer ao que entendia do texto, mesmo a um alto custo. **O problema:** no Novo Testamento o batismo é ==recebido de outro, dentro da comunidade de fé== ("batizando-os"), e não um ato solitário. O próprio Smyth depois duvidou do seu autobatismo. A lição: ==zelo pela Escritura precisa andar junto com humildade e com a igreja==.',
          },
          {
            p: 'Smyth mudou de posição várias vezes. Quando mudar de opinião é fidelidade, e quando é instabilidade?',
            leitura: 'At 17.11; Ef 4.14',
            r: 'Mudar é ==fidelidade quando a Escritura foi melhor compreendida==, com estudo, oração e diálogo com a igreja — como os bereanos. É **instabilidade** quando somos "levados por todo vento de doutrina": por novidade, por pressão ou por experiências pessoais. A pergunta-chave é: **o que me fez mudar foi o texto bíblico ou outra coisa?**',
          },
          {
            p: 'No fim da vida, Smyth chegou a falar do regenerado como estando "acima" da lei e das Escrituras. Por que é perigoso colocar a experiência espiritual acima da Bíblia?',
            leitura: 'Is 8.20; 2Tm 3.16-17; 2Pe 1.20-21',
            r: 'Porque ==o Espírito Santo é o autor da Escritura e nunca contradiz o que inspirou==. Quando a experiência se torna a regra, cada um passa a ter a sua própria "palavra", e a igreja perde o critério comum para discernir a verdade. **Experiências são reais, mas são julgadas pela Bíblia** — "à lei e ao testemunho!".',
          },
        ],
      },
      {
        bloco: 'Para a vida e a igreja', cor: '#2dd4bf',
        perguntas: [
          {
            p: 'Smyth morreu pedindo perdão pela aspereza com que tratou outros cristãos. Como podemos defender a verdade sem perder o amor?',
            leitura: 'Ef 4.15; 1Pe 3.15-16',
            r: 'A Bíblia nos manda ==seguir a verdade em amor== e defender a fé "com mansidão e temor". Convicção firme não exige palavras duras. **Discordar de um irmão não é deixar de amá-lo** — e reconhecer os próprios excessos, como Smyth fez no fim, também é obediência.',
          },
          {
            p: 'Que passo concreto o nosso grupo pode dar esta semana para deixar a Escritura governar mais a nossa vida e a nossa igreja?',
            leitura: 'Tg 1.22',
            r: 'Algumas sugestões: ==ler juntos um livro do Novo Testamento== durante o mês; **escolher uma prática da igreja ou da família e examiná-la à luz de um texto bíblico**; orar uns pelos outros para sermos "praticantes da Palavra, e não somente ouvintes".',
          },
        ],
      },
    ],
    obras: [
      { ano: '1603', titulo: 'The Bright Morning Starre', nota: 'Exposição do Salmo 22, ainda no período anglicano-puritano.' },
      { ano: '1605', titulo: 'A Paterne of True Prayer', nota: 'Exposição da Oração do Senhor.' },
      { ano: '1607', titulo: 'Principles and Inferences concerning the Visible Church', nota: 'A igreja visível como comunhão de santos unidos por aliança.' },
      { ano: '1608', titulo: 'The Differences of the Churches of the Separation', nota: 'Os originais inspirados, as traduções e o culto “espiritual”.' },
      { ano: '1609', titulo: 'The Character of the Beast', nota: 'Defesa do batismo de crentes contra o batismo infantil.' },
      { ano: '1612', titulo: 'Propositions and Conclusions', nota: 'Confissão final, já próxima dos menonitas.' },
      { ano: '1612', titulo: 'The Retractation of his Errours', nota: 'Últimas palavras: pede perdão pela aspereza das polêmicas.' },
    ],
    referencias: [
      { autor: 'BUSH, L. Russ; NETTLES, Tom J.', titulo: 'Os Batistas e a Bíblia', resto: 'Ortodoxia Batista. Cap. 1. (Original: Baptists and the Bible. Ed. rev. Nashville: Broadman & Holman, 1999).' },
      { autor: 'COGGINS, James R.', titulo: "John Smyth's Congregation: English Separatism, Mennonite Influence, and the Elect Nation", resto: 'Waterloo, Ontario: Herald Press, 1991.' },
      { autor: 'McBETH, H. Leon.', titulo: 'The Baptist Heritage: Four Centuries of Baptist Witness', resto: 'Nashville: Broadman Press, 1987.' },
      { autor: 'WHITLEY, W. T. (ed.).', titulo: 'The Works of John Smyth', resto: 'Cambridge: Cambridge University Press, 1915. 2 v.' },
    ],
  },
  {
    slug: 'thomas-helwys',
    num: 2,
    cap: 'Cap. 1',
    grupo: 'Batistas Gerais · séc. XVII',
    nome: 'Thomas Helwys',
    nomeCurto: 'Helwys',
    datas: 'c. 1575–c. 1616',
    fotoNota: 'Não se conhece retrato de Helwys. Na imagem, sua dedicatória manuscrita ao rei Jaime I (1612): “o rei é um homem mortal, e não Deus”.',
    subtitulo: 'A Escritura como “única direção” e a primeira defesa batista da liberdade de consciência',
    intro: 'Advogado de formação e membro da pequena nobreza inglesa, Thomas Helwys esteve ao lado de Smyth no exílio — e foi quem ==trouxe os batistas de volta à Inglaterra==. Em **1612**, em **Spitalfields**, perto de Londres, fundou a ==primeira igreja batista em solo inglês== e publicou o primeiro livro em inglês a defender **liberdade religiosa plena para todos**. Morreu na prisão por essa convicção.',
    citacao: 'Para Helwys, as Escrituras eram “a nossa única direção em todas as coisas” — e é delas que nasce a convicção de que só Deus é Senhor da consciência.',
    eixosSub: 'Quatro eixos para entender sua relação com a Escritura',
    eixos: [
      {
        num: '01', icone: BookOpen, cor: '#f97316',
        titulo: 'A Escritura, “única direção em todas as coisas”',
        texto: 'A **Declaração de Fé de 1611**, redigida sob a liderança de Helwys, é considerada a ==primeira confissão de fé batista inglesa==. No artigo 23, afirma que as Escrituras do Antigo e do Novo Testamento foram escritas para nossa instrução (2Tm 3.16), que devemos examiná-las porque **testificam de Cristo** (Jo 5.39), e que devem ser usadas com toda reverência, pois contêm ==a santa Palavra de Deus, nossa única direção em todas as coisas==.',
        destaque: 'A Bíblia não é uma direção entre outras — é a única direção em todas as coisas.',
      },
      {
        num: '02', icone: ScrollText, cor: '#fbbf24',
        titulo: 'A Palavra acima da “sucessão”',
        texto: 'Em 1610, Smyth passou a duvidar do autobatismo e quis unir-se aos menonitas, que tinham uma linha histórica de igrejas. Helwys **rompeu com o amigo**: para ele, a igreja verdadeira ==não depende de uma sucessão histórica, mas da Palavra de Deus==. Onde há crentes que se reúnem e obedecem ao que Cristo ordenou nas Escrituras, ali o Senhor pode restaurar a sua igreja. Helwys também se afastou dos menonitas em outros pontos, como a ideia de que Cristo não teria recebido a carne de Maria — e o fez **com base no texto bíblico**.',
        destaque: 'A igreja não é legitimada por uma corrente de homens, mas pela fidelidade à Palavra.',
      },
      {
        num: '03', icone: Scale, cor: '#2dd4bf',
        titulo: 'A Bíblia e a liberdade de consciência',
        texto: 'Em **A Short Declaration of the Mistery of Iniquity** (1612), Helwys defendeu que o poder do rei é legítimo nas coisas civis, mas que ==Deus é o único Senhor da consciência==. No exemplar que enviou ao rei Jaime I, escreveu que **o rei é um homem mortal, e não Deus**, e por isso não tem poder sobre as almas imortais dos súditos. Chegou a dizer que, sejam hereges, turcos, judeus ou quem for, ==não cabe ao poder terreno puni-los== por sua fé. Não era relativismo: era a convicção bíblica de que **a fé só pode ser gerada pela Palavra e pelo Espírito, nunca pela espada**.',
        destaque: 'O rei governa os corpos e os bens; sobre a alma, só Deus é Rei.',
      },
      {
        num: '04', icone: Landmark, cor: '#a78bfa',
        titulo: 'Fidelidade que custa a liberdade',
        texto: 'Helwys passou a entender que ==fugir da perseguição não era o caminho para os que deviam testemunhar== na própria terra. Em 1612 voltou com um pequeno grupo à Inglaterra, sabendo do risco. Pouco depois foi **preso na prisão de Newgate**, e por volta de 1616 já havia morrido — provavelmente no cárcere. Sua esposa, **Joan**, também já tinha sido presa por causa da fé. Para Helwys, ==obedecer à Escritura valia mais do que a própria segurança==.',
        destaque: 'Crer na autoridade da Bíblia levou Helwys de volta para casa — e para a prisão.',
      },
    ],
    linhaSub: 'De Nottinghamshire a Newgate',
    linha: [
      { ano: 'c. 1575', titulo: 'Nascimento em Broxtowe', texto: 'Nasce em uma família da **pequena nobreza** de Nottinghamshire, em Broxtowe Hall.' },
      { ano: '1593', titulo: 'Estudos de Direito', texto: 'Ingressa no **Gray’s Inn**, em Londres, uma das escolas de ==formação jurídica== da Inglaterra.' },
      { ano: '1595', titulo: 'Casamento com Joan', texto: 'Casa-se com **Joan Ashmore**. Mais tarde, Broxtowe Hall se torna ==abrigo para pregadores puritanos e separatistas==.' },
      { ano: 'c. 1606', titulo: 'Com Smyth em Gainsborough', texto: 'Une-se à **congregação separatista** liderada por John Smyth e se torna um dos seus ==líderes leigos mais importantes==.' },
      { ano: '1608', titulo: 'Exílio em Amsterdã', texto: 'Ajuda a ==organizar e financiar a fuga== da congregação para a Holanda. Joan, que ficara na Inglaterra, é **presa por causa da fé**.' },
      { ano: '1609', titulo: 'O batismo de crentes', texto: 'É batizado na nova igreja de Amsterdã — a **primeira igreja batista de fala inglesa**.' },
      { ano: '1610', titulo: 'Ruptura com Smyth', texto: 'Recusa a união com os menonitas: ==a igreja depende da Palavra, e não de uma sucessão histórica==.' },
      { ano: '1611', titulo: 'A Declaração de Fé', texto: 'Publica a **Declaração de Fé** em 27 artigos — ==a primeira confissão batista inglesa==.' },
      { ano: '1612', titulo: 'Volta à Inglaterra', texto: 'Publica **The Mistery of Iniquity**, envia um exemplar ao rei e funda em **Spitalfields** a ==primeira igreja batista em solo inglês==.' },
      { ano: 'c. 1613–1616', titulo: 'Prisão e morte', texto: 'É **preso em Newgate** e, por volta de 1616, ==já havia morrido==, provavelmente na prisão.' },
    ],
    licoes: [
      { t: 'A Palavra basta para a igreja', d: 'A igreja não precisa de uma corrente histórica para ser verdadeira: ==precisa ser fiel à Escritura==, que é **a nossa única direção em todas as coisas**.' },
      { t: 'Liberdade que nasce da Bíblia', d: 'A defesa da liberdade religiosa não veio de indiferença: veio da convicção de que ==só Deus é Senhor da consciência== e de que **a fé nasce pela Palavra, não pela força**.' },
      { t: 'Fidelidade tem preço', d: 'Helwys trocou o conforto da nobreza e a segurança do exílio pela prisão. ==Crer na autoridade da Bíblia é também estar disposto a pagar por ela==.' },
    ],
    grupoPerguntas: [
      {
        bloco: 'Para começar', cor: '#fbbf24',
        perguntas: [
          {
            p: 'Helwys voltou à Inglaterra sabendo que poderia ser preso. O que você estaria disposto a perder para obedecer à Palavra de Deus?',
            leitura: 'Mt 10.32-39',
            r: 'O objetivo não é medir quem é mais corajoso, mas perceber que ==seguir a Cristo sempre tem um custo==. Jesus disse que quem ama pai, mãe ou a própria vida mais do que a ele não é digno dele. Para muitos de nós, o custo hoje é menor — tempo, reputação, conforto —, mas **a pergunta de Helwys continua a mesma: a Palavra vale mais do que a minha segurança?**',
          },
        ],
      },
      {
        bloco: 'Helwys e a Bíblia', cor: '#f97316',
        perguntas: [
          {
            p: 'A Declaração de 1611 chama as Escrituras de “nossa única direção em todas as coisas”. Em que áreas da vida temos buscado outras direções?',
            leitura: 'Sl 119.105; 2Tm 3.16-17',
            r: 'Respostas comuns: finanças, decisões de trabalho, namoro e casamento, criação de filhos, uso do tempo. Nessas áreas costumamos seguir ==a opinião da maioria, especialistas ou sentimentos==. A Bíblia não responde a todos os detalhes, mas dá **princípios para todas as áreas** e nos torna "aptos para toda boa obra". A pergunta é: **consultamos a Escritura antes, ou só depois que já decidimos?**',
          },
          {
            p: 'Helwys ensinava que a igreja não depende de uma “sucessão” histórica, mas da Palavra. Por que isso é importante?',
            leitura: 'Ef 2.20; Gl 1.8-9',
            r: 'Porque ==o fundamento da igreja são os apóstolos e profetas — isto é, a Palavra que eles transmitiram—, tendo Cristo como pedra angular==. Uma igreja com história longa pode abandonar o evangelho; uma igreja jovem pode ser fiel. Paulo chega a dizer que, se até um anjo pregasse outro evangelho, seria anátema. **O que torna uma igreja verdadeira é a fidelidade ao evangelho, não a idade da instituição**.',
          },
          {
            p: 'Helwys escreveu ao rei que ele era “um homem mortal, e não Deus”, sem poder sobre as almas. Que textos sustentam que só Deus é Senhor da consciência?',
            leitura: 'Mt 22.21; At 5.29; Jo 18.36',
            r: 'Jesus distingue o que é de César e o que é de Deus; os apóstolos declararam que ==importa antes obedecer a Deus do que aos homens==; e Cristo afirmou que o seu reino **não é deste mundo**, por isso não avança pela espada. O Estado tem autoridade legítima nas coisas civis (Rm 13), mas ==não tem autoridade para impor ou proibir a fé==.',
          },
          {
            p: 'Helwys defendeu a liberdade até de quem ele considerava em erro — católicos, judeus, muçulmanos. Isso significa que todas as crenças são iguais?',
            leitura: 'Rm 14.10-12; 2Co 10.3-5',
            r: '**Não.** Helwys estava convicto de que muitos estavam em erro grave. Sua defesa era de ==liberdade civil, não de relativismo==: cada um prestará contas a Deus, e as armas da igreja são **espirituais** — a Palavra, a oração, a persuasão —, nunca a força do Estado. Defender a liberdade do outro é também ==confiar que a verdade de Deus não precisa da espada para vencer==.',
          },
          {
            p: 'Helwys rompeu com Smyth, seu amigo e pastor, por uma questão doutrinária. Quando uma divergência justifica uma separação?',
            leitura: 'Gl 2.11-14; Rm 16.17-18',
            r: 'Nem toda divergência justifica separação: há muitas questões em que podemos discordar e continuar juntos (Rm 14). Mas quando ==o evangelho ou a autoridade da Escritura estão em jogo==, como Paulo diante de Pedro em Antioquia, a fidelidade pode exigir uma posição clara. Mesmo assim, **a separação deve ser o último recurso, feita com dor, sem desprezo e com oração pelo outro**.',
          },
        ],
      },
      {
        bloco: 'Para a vida e a igreja', cor: '#2dd4bf',
        perguntas: [
          {
            p: 'Como a igreja pode defender hoje a liberdade religiosa de todos, inclusive de quem discorda de nós?',
            leitura: '1Tm 2.1-2; Mt 7.12',
            r: 'Algumas formas: ==orar pelas autoridades==, para que haja uma vida tranquila e livre para o evangelho; **não pedir privilégios para nós que negaríamos aos outros** (a "regra de ouro"); denunciar com respeito quando qualquer grupo é perseguido por sua fé; e lembrar a ==igreja perseguida no mundo==.',
          },
          {
            p: 'Que passo concreto o nosso grupo pode dar esta semana, lembrando de Helwys e de Joan, que foram presos por causa da fé?',
            leitura: 'Hb 13.3',
            r: 'Sugestões: ==orar juntos pelos cristãos presos e perseguidos hoje== (há organizações que publicam pedidos de oração); **escolher uma decisão da semana para submeter conscientemente à Escritura**; e agradecer a Deus pela liberdade que temos de nos reunir e ler a Bíblia.',
          },
        ],
      },
    ],
    obras: [
      { ano: '1611', titulo: 'A Declaration of Faith of English People Remaining at Amsterdam in Holland', nota: 'Confissão em 27 artigos — a primeira confissão batista inglesa.' },
      { ano: '1611', titulo: 'A Short and Plaine Proofe… that Gods Decree is not the Cause of anye Mans Sinne or Condemnation', nota: 'Contra a ideia de que o decreto de Deus seja causa do pecado do homem.' },
      { ano: '1611', titulo: 'An Advertisement or Admonition unto the Congregations which Men Call the New Fryesers', nota: 'Advertência aos menonitas sobre sucessão, a carne de Cristo e outros pontos.' },
      { ano: '1612', titulo: 'A Short Declaration of the Mistery of Iniquity', nota: 'O primeiro livro em inglês a defender liberdade religiosa plena para todos.' },
    ],
    referencias: [
      { autor: 'BUSH, L. Russ; NETTLES, Tom J.', titulo: 'Os Batistas e a Bíblia', resto: 'Ortodoxia Batista. Cap. 1. (Original: Baptists and the Bible. Ed. rev. Nashville: Broadman & Holman, 1999).' },
      { autor: 'EARLY, Joe, Jr. (ed.).', titulo: 'The Life and Writings of Thomas Helwys', resto: 'Macon: Mercer University Press, 2009. (Early English Baptist Texts).' },
      { autor: 'HELWYS, Thomas.', titulo: 'A Short Declaration of the Mystery of Iniquity (1611/1612)', resto: 'Ed. Richard Groves. Macon: Mercer University Press, 1998. (Classics of Religious Liberty, 1).' },
      { autor: 'LUMPKIN, William L.', titulo: 'Baptist Confessions of Faith', resto: 'Ed. rev. Valley Forge: Judson Press, 1969.' },
      { autor: 'McBETH, H. Leon.', titulo: 'The Baptist Heritage: Four Centuries of Baptist Witness', resto: 'Nashville: Broadman Press, 1987.' },
    ],
  },
  {
    slug: 'john-murton',
    num: 3,
    cap: 'Cap. 1',
    grupo: 'Batistas Gerais · séc. XVII',
    nome: 'John Murton',
    nomeCurto: 'Murton',
    datas: 'c. 1585–c. 1626',
    fotoNota: 'Não se conhece retrato de Murton. Na imagem, o Gainsborough Old Hall, onde se reunia a congregação separatista de que ele fazia parte.',
    subtitulo: 'O artesão que, da prisão, defendeu pela Escritura a liberdade de consciência',
    intro: 'Peleteiro de **Gainsborough**, sem formação universitária, John Murton fez parte da congregação de Smyth e Helwys desde o início, seguiu-os no exílio e ==voltou com Helwys à Inglaterra em 1612==. Depois da prisão e morte de Helwys, ==assumiu a liderança da pequena igreja de Spitalfields==. Preso em **Newgate**, escreveu alguns dos primeiros apelos batistas pela **liberdade de consciência** — todos construídos a partir da Bíblia.',
    citacao: 'Para Murton, quem interpreta a Escritura não é o rei nem o bispo, mas o próprio Deus falando nela — e por isso ninguém pode ser forçado na fé pela espada.',
    eixosSub: 'Quatro eixos para entender sua relação com a Escritura',
    eixos: [
      {
        num: '01', icone: BookOpen, cor: '#f97316',
        titulo: 'A Escritura, e não o rei, é quem interpreta a Escritura',
        texto: 'Em **A Most Humble Supplication** (1620), dirigida ao rei Jaime I e ao Parlamento, Murton argumentou que ==o verdadeiro intérprete da Escritura é o Espírito de Deus falando na própria Escritura==, e não bispos, concílios ou reis. Se a autoridade final é a Palavra, **nenhum poder humano pode impor uma interpretação à consciência** — cada crente deve examinar as Escrituras e responder a Deus.',
        destaque: 'Nem o trono nem o púlpito estão acima da Palavra: a Escritura se explica pela Escritura.',
      },
      {
        num: '02', icone: Sprout, cor: '#fbbf24',
        titulo: 'O joio e o trigo: a Bíblia contra a perseguição',
        texto: 'Em **Objections Answered** (1615) — obra atribuída a Murton —, a defesa da liberdade religiosa é feita em forma de diálogo e ==apoiada na lei de Deus==. Um dos textos centrais é a **parábola do joio e do trigo** (Mt 13.24-30): o Senhor mandou deixar crescer juntos até a colheita, e ==o juízo pertence a ele, não ao magistrado==. O reino de Cristo avança pela Palavra e pelo Espírito, não pela espada.',
        destaque: 'Arrancar o joio à força é tirar das mãos de Cristo um juízo que é só dele.',
      },
      {
        num: '03', icone: Heart, cor: '#2dd4bf',
        titulo: 'A Escritura e a graça oferecida a todos',
        texto: 'Como os demais **batistas gerais**, Murton leu textos como ==“Deus quer que todos os homens sejam salvos”== (1Tm 2.4) e “Deus amou o mundo” (Jo 3.16) como ensino de que Cristo morreu por todos. Em **A Description of what God hath Predestinated concerning Man** (1620), argumentou contra a ideia de que Deus seja autor do pecado. Mais tarde, os **batistas particulares** (calvinistas) discordariam — mas ==os dois grupos discutiram a partir do mesmo princípio: a Bíblia decide==.',
        destaque: 'A divergência entre os batistas era sobre o que a Bíblia diz — nunca sobre se a Bíblia decide.',
      },
      {
        num: '04', icone: PenLine, cor: '#a78bfa',
        titulo: 'Escrever a verdade de dentro da prisão',
        texto: 'Murton passou anos preso por sua fé. Segundo Roger Williams, um prisioneiro de **Newgate** — tradicionalmente identificado com Murton — chegou a ==escrever com leite nos papéis que tampavam as garrafas de leite==; os amigos aqueciam o papel ao fogo para ler o texto e copiá-lo. A cena resume sua vida: ==sem cátedra, sem liberdade e sem recursos, ele continuou a anunciar o que a Escritura ensinava==.',
        destaque: 'Prenderam o pregador, mas não conseguiram prender a Palavra (2Tm 2.9).',
      },
    ],
    linhaSub: 'De Gainsborough a Newgate',
    linha: [
      { ano: 'c. 1585', titulo: 'Nascimento', texto: 'Nasce no norte da Inglaterra, provavelmente na região de **Gainsborough**, onde trabalha como ==peleteiro== (curtidor e comerciante de peles).' },
      { ano: 'c. 1606', titulo: 'A congregação de Gainsborough', texto: 'Une-se à **congregação separatista** de John Smyth, que se reúne no Gainsborough Old Hall.' },
      { ano: '1608', titulo: 'Casamento e exílio', texto: 'Casa-se com **Jane** e parte com a congregação ==para Amsterdã==, fugindo da perseguição.' },
      { ano: '1609', titulo: 'Batismo de crentes', texto: 'É batizado na nova igreja de Amsterdã — a **primeira igreja batista de fala inglesa**.' },
      { ano: '1610', titulo: 'Ao lado de Helwys', texto: 'Na ruptura com Smyth, fica com **Thomas Helwys**: ==a igreja depende da Palavra, e não de uma sucessão histórica==.' },
      { ano: '1612', titulo: 'Volta à Inglaterra', texto: 'Retorna com Helwys e ajuda a formar a ==primeira igreja batista em solo inglês==, em **Spitalfields**.' },
      { ano: 'c. 1613–1616', titulo: 'Prisão e liderança', texto: 'É **preso em Newgate**; com a morte de Helwys, ==torna-se o líder da igreja==.' },
      { ano: '1615', titulo: 'Objections Answered', texto: 'Publica-se o diálogo ==em defesa da liberdade de consciência==, atribuído a ele.' },
      { ano: '1620', titulo: 'Apelo ao rei e ao Parlamento', texto: 'Publica **A Most Humble Supplication**: ==ninguém deve ser perseguido por sua religião==.' },
      { ano: 'c. 1626', titulo: 'Morte', texto: 'Morre por volta de 1626. A pequena comunidade que liderou ==continua a testemunhar== na Inglaterra.' },
    ],
    licoes: [
      { t: 'A Bíblia não é propriedade de uma elite', d: 'Um artesão sem diploma ==lia, defendia e ensinava a Escritura== — e a lia de modo responsável. **A Palavra de Deus é para todo o povo de Deus.**' },
      { t: 'A Palavra interpreta a Palavra', d: 'Nem rei, nem bispo, nem tradição têm a última palavra: ==a Escritura é explicada pela própria Escritura==, sob a luz do Espírito.' },
      { t: 'A verdade não fica presa', d: 'Mesmo na prisão, Murton continuou escrevendo. ==Fidelidade à Escritura não depende de circunstâncias favoráveis==.' },
    ],
    grupoPerguntas: [
      {
        bloco: 'Para começar', cor: '#fbbf24',
        perguntas: [
          {
            p: 'Murton era um artesão, sem formação teológica, e mesmo assim se tornou pastor e escritor. Quem foi alguém “simples” que marcou a sua fé pela forma como amava a Bíblia?',
            leitura: 'At 4.13',
            r: 'Deixe cada um contar sua história. O objetivo é perceber que ==Deus usa pessoas comuns que conhecem e amam a sua Palavra==. Os líderes de Jerusalém se admiraram de Pedro e João, “homens iletrados e incultos”, e reconheceram que **tinham estado com Jesus**.',
          },
        ],
      },
      {
        bloco: 'Murton e a Bíblia', cor: '#f97316',
        perguntas: [
          {
            p: 'Murton dizia que quem interpreta a Escritura não é o rei nem o bispo, mas o próprio Deus falando nela. O que significa “a Escritura interpreta a Escritura”?',
            leitura: 'At 17.11; 2Pe 1.20-21',
            r: 'Significa que ==os textos mais claros iluminam os mais difíceis==, e que nenhuma autoridade humana pode impor um sentido contrário ao que a Bíblia diz. Isso **não dispensa mestres e pastores** (Ef 4.11), mas os coloca debaixo da Palavra: eles explicam, e o povo, como os bereanos, ==confere nas Escrituras==.',
          },
          {
            p: 'Leiam Mateus 13.24-30. Por que a parábola do joio e do trigo foi tão importante para os primeiros batistas na defesa da liberdade religiosa?',
            leitura: 'Mt 13.24-30, 36-43',
            r: 'Porque o Senhor manda ==deixar crescer juntos até a colheita== e reserva a separação final para si e para os seus anjos. Os batistas concluíram que **não cabe ao Estado arrancar à força quem tem outra fé** — o juízo final pertence a Cristo. A igreja disciplina os seus membros (Mt 18), mas ==não usa a espada do magistrado para converter ninguém==.',
          },
          {
            p: 'Batistas gerais (como Murton) e particulares discordaram sobre a extensão da obra de Cristo. Como discordar de irmãos sobre doutrinas importantes sem abandonar a autoridade da Bíblia?',
            leitura: 'Rm 14.1-5; 2Tm 2.24-25',
            r: 'O caminho é ==discutir a partir do texto, e não de preferências==: abrir a Bíblia, ouvir os argumentos do outro com honestidade e **tratar o irmão com mansidão**. Algumas questões exigem convicção firme; outras admitem diferença entre crentes fiéis. O que não pode mudar é que ==a Escritura é o tribunal final para todos==.',
          },
          {
            p: 'Murton escreveu da prisão, até com leite em pedaços de papel. O que essa história nos ensina sobre o valor que damos à Palavra hoje?',
            leitura: '2Tm 2.8-9; Sl 119.72',
            r: 'Temos Bíblias em todos os formatos e ==muitas vezes as lemos pouco==. Para Murton, anunciar a Palavra valia o risco e o esforço. Paulo, preso, dizia que **“a palavra de Deus não está algemada”**. A pergunta é pessoal: ==a Palavra é para mim “melhor do que milhares de ouro e prata”?==',
          },
          {
            p: 'Murton defendia a liberdade até de quem pensava diferente dele. Isso o tornava indiferente à verdade?',
            leitura: '2Co 10.3-5; 1Pe 3.15',
            r: '**Não.** Murton tinha convicções firmes e as defendia com vigor. Mas entendia que ==as armas do cristão são espirituais==: argumentos, Escritura, oração e testemunho. **Liberdade de consciência não é relativismo**; é a confiança de que ==a verdade de Deus vence pela persuasão, e não pela força==.',
          },
        ],
      },
      {
        bloco: 'Para a vida e a igreja', cor: '#2dd4bf',
        perguntas: [
          {
            p: 'Como a nossa igreja pode ajudar cada membro — não só os líderes — a ler e entender a Bíblia por si mesmo?',
            leitura: 'Ne 8.8; Cl 3.16',
            r: 'Sugestões: ==grupos de leitura bíblica==, planos de leitura em família, **ensinar métodos simples de estudo** (observar, interpretar, aplicar), incentivar perguntas nas aulas e pregações que ==mostram no texto de onde vem cada ponto==.',
          },
          {
            p: 'Que passo concreto o nosso grupo pode dar esta semana inspirado em Murton?',
            leitura: 'Hb 13.3; Tg 1.22',
            r: 'Sugestões: ==ler juntos um capítulo da Bíblia por dia== durante a semana; **escrever um versículo à mão** e entregá-lo a alguém que esteja passando por dificuldade; e orar pelos ==cristãos presos por sua fé hoje==.',
          },
        ],
      },
    ],
    obras: [
      { ano: '1615', titulo: 'Objections Answered by Way of Dialogue', nota: 'Diálogo em defesa da liberdade de consciência, atribuído a Murton (às vezes também a Helwys).' },
      { ano: '1620', titulo: 'A Description of what God hath Predestinated concerning Man', nota: 'A posição dos batistas gerais sobre predestinação e graça.' },
      { ano: '1620', titulo: 'A Most Humble Supplication of Many of the King’s Majesty’s Loyal Subjects', nota: 'Apelo ao rei e ao Parlamento: ninguém deve ser perseguido por sua religião.' },
    ],
    referencias: [
      { autor: 'BUSH, L. Russ; NETTLES, Tom J.', titulo: 'Os Batistas e a Bíblia', resto: 'Ortodoxia Batista. Cap. 1. (Original: Baptists and the Bible. Ed. rev. Nashville: Broadman & Holman, 1999).' },
      { autor: 'McBETH, H. Leon.', titulo: 'The Baptist Heritage: Four Centuries of Baptist Witness', resto: 'Nashville: Broadman Press, 1987.' },
      { autor: 'UNDERHILL, Edward Bean (ed.).', titulo: 'Tracts on Liberty of Conscience and Persecution, 1614–1661', resto: 'London: Hanserd Knollys Society, 1846.' },
      { autor: 'WRIGHT, Stephen.', titulo: 'The Early English Baptists, 1603–1649', resto: 'Woodbridge: Boydell Press, 2006.' },
    ],
  },
  {
    slug: 'thomas-grantham',
    num: 4,
    cap: 'Cap. 1',
    grupo: 'Batistas Gerais · séc. XVII',
    nome: 'Thomas Grantham',
    nomeCurto: 'Grantham',
    datas: '1634–1692',
    fotoNota: 'Gravura antiga que representa Grantham em uma discussão pública.',
    subtitulo: 'O teólogo dos batistas gerais que defendeu a Escritura escrita contra a “luz interior”',
    intro: 'Filho de uma família simples de **Lincolnshire**, alfaiate e lavrador, Thomas Grantham tornou-se ==o principal teólogo dos batistas gerais== no século XVII. Em **1660** entregou ao rei Carlos II a confissão de fé dos batistas gerais; foi preso várias vezes; e escreveu a grande síntese **Christianismus Primitivus** (1678). Diante dos **quakers**, que colocavam a “luz interior” acima da Bíblia, ele insistiu: ==o Espírito fala pela Escritura escrita, e é por ela que toda experiência deve ser provada==.',
    citacao: 'Para Grantham, a Escritura escrita é a regra perfeita da fé e da vida: nenhuma “luz interior”, tradição ou concílio pode acrescentar-lhe algo ou corrigi-la.',
    eixosSub: 'Quatro eixos para entender sua relação com a Escritura',
    eixos: [
      {
        num: '01', icone: BookOpen, cor: '#f97316',
        titulo: 'A Palavra escrita acima da “luz interior”',
        texto: 'Os **quakers** ensinavam que a ==luz interior de Cristo em cada pessoa== era a autoridade última, e que a Bíblia era apenas um testemunho secundário. Grantham respondeu em debates públicos e por escrito: ==o mesmo Espírito que inspirou as Escrituras não fala contra elas==. Por isso, **toda pretensa revelação deve ser examinada pela Palavra escrita** (Is 8.20; 1Jo 4.1).',
        destaque: 'O Espírito não concorre com a Escritura: ele fala por meio dela.',
      },
      {
        num: '02', icone: ScrollText, cor: '#fbbf24',
        titulo: 'A Escritura como regra suficiente e clara',
        texto: 'Em **Christianismus Primitivus**, Grantham afirma que as Escrituras do Antigo e do Novo Testamento são ==a regra perfeita da fé e da prática==. Elas são **suficientes**: não precisam do acréscimo da tradição romana; e são **claras** naquilo que é necessário à salvação, de modo que ==o crente comum pode lê-las e compreendê-las==. Os pontos difíceis são explicados pelos textos mais claros.',
        destaque: 'Tudo o que é necessário para a salvação está dito com clareza na Bíblia.',
      },
      {
        num: '03', icone: Landmark, cor: '#2dd4bf',
        titulo: 'A igreja organizada segundo o Novo Testamento',
        texto: 'Grantham queria uma igreja como a ==“religião cristã antiga”== — daí o título **Christianismus Primitivus**. Com os batistas gerais, via em **Hebreus 6.1-2** os ==“seis princípios”== do cristianismo (arrependimento, fé, batismo, imposição de mãos, ressurreição e juízo eterno). Também defendia o ofício de **mensageiro**, que supervisionava várias igrejas — ele mesmo foi um. ==Para ele, a forma da igreja deveria vir do texto bíblico, e não do costume==.',
        destaque: 'A pergunta de Grantham era sempre: “O que a igreja do Novo Testamento fazia?”',
      },
      {
        num: '04', icone: Scale, cor: '#a78bfa',
        titulo: 'Confessar a fé diante do rei e da prisão',
        texto: 'Em **1660**, Grantham entregou a **Carlos II** a ==Breve Confissão ou Declaração de Fé== (a “Confissão Padrão” dos batistas gerais), pedindo liberdade para crer segundo a Escritura. Pouco depois, foi **preso em Lincoln** e escreveu **The Prisoner against the Prelate**. ==Confessar a fé, para ele, era dizer publicamente o que a Bíblia ensina — mesmo quando isso custava a liberdade==.',
        destaque: 'Uma confissão de fé não substitui a Bíblia: ela declara, diante de todos, o que a Bíblia ensina.',
      },
    ],
    linhaSub: 'De Lincolnshire a Norwich',
    linha: [
      { ano: '1634', titulo: 'Nascimento', texto: 'Nasce em **Halton Holegate**, Lincolnshire, numa família de lavradores. Trabalha como ==alfaiate e agricultor==.' },
      { ano: 'c. 1653', titulo: 'Batismo de crente', texto: 'Ainda jovem, é **batizado** e se une aos ==batistas gerais== de Lincolnshire.' },
      { ano: 'c. 1656', titulo: 'Pastor', texto: 'Torna-se **pastor** de uma pequena congregação batista geral na região.' },
      { ano: '1660', titulo: 'Diante do rei', texto: 'Entrega a Carlos II a ==Breve Confissão ou Declaração de Fé== dos batistas gerais.' },
      { ano: '1662–1663', titulo: 'Prisão em Lincoln', texto: 'É **preso** por sua fé e escreve ==The Prisoner against the Prelate==.' },
      { ano: '1666', titulo: 'Mensageiro', texto: 'É ordenado **mensageiro**, supervisionando e visitando ==várias igrejas batistas gerais==.' },
      { ano: '1678', titulo: 'Christianismus Primitivus', texto: 'Publica sua grande obra, ==a mais completa exposição da teologia dos batistas gerais== no século XVII.' },
      { ano: 'c. 1686', titulo: 'Norwich', texto: 'Muda-se para **Norwich**, onde reúne uma congregação e ==debate publicamente com quakers e anglicanos==.' },
      { ano: '1692', titulo: 'Morte', texto: 'Morre em Norwich. O vigário anglicano **John Connould**, de quem se tornara amigo apesar das divergências, ==o sepulta em sua igreja, St. Stephen==.' },
    ],
    licoes: [
      { t: 'Experiência se prova pela Palavra', d: 'Sentimentos e “revelações” não são o padrão final. ==O Espírito que inspirou a Bíblia nunca a contradiz==. **Toda experiência deve ser examinada pela Escritura.**' },
      { t: 'A igreja nasce do texto', d: 'Grantham perguntava: ==“o que fazia a igreja do Novo Testamento?”==. A forma, o culto e a liderança da igreja devem vir **da Bíblia, e não do costume**.' },
      { t: 'Firmeza com amizade', d: 'Ele debateu com vigor, mas ==um adversário teológico tornou-se seu amigo== e o sepultou. **Convicção bíblica não exige hostilidade pessoal.**' },
    ],
    grupoPerguntas: [
      {
        bloco: 'Para começar', cor: '#fbbf24',
        perguntas: [
          {
            p: 'Você já ouviu alguém dizer “Deus me disse...” para justificar algo que a Bíblia não ensina? Como você reagiu?',
            leitura: '1Jo 4.1',
            r: 'Deixe o grupo compartilhar. O objetivo é perceber que esse problema não é novo: ==Grantham enfrentou exatamente essa questão no século XVII==. João manda **provar os espíritos**, e o critério é a verdade revelada sobre Cristo.',
          },
        ],
      },
      {
        bloco: 'Grantham e a Bíblia', cor: '#f97316',
        perguntas: [
          {
            p: 'Os quakers colocavam a “luz interior” acima da Bíblia. Por que Grantham insistia que o Espírito fala por meio da Escritura escrita?',
            leitura: 'Is 8.20; 2Tm 3.16-17; 2Pe 1.19-21',
            r: 'Porque ==a Escritura é obra do próprio Espírito==: “homens falaram da parte de Deus, movidos pelo Espírito Santo”. Se o Espírito inspirou a Palavra, **ele não vai contradizê-la depois**. Uma “luz” que leva para longe da Escritura ==não é luz== (Is 8.20).',
          },
          {
            p: 'Grantham ensinava que a Bíblia é clara naquilo que é necessário para a salvação. O que isso significa para quem não é pastor nem teólogo?',
            leitura: 'Sl 19.7; Sl 119.130; 2Tm 3.15',
            r: 'Significa que ==qualquer crente pode ler a Bíblia e encontrar nela o caminho da salvação==. Nem tudo é igualmente fácil (2Pe 3.16), mas **o essencial é claro**: quem é Deus, o pecado, Cristo, a fé e o arrependimento. Timóteo conhecia as Escrituras ==“desde a infância”==.',
          },
          {
            p: 'Leiam Hebreus 6.1-2. Grantham via ali os “seis princípios” do cristianismo. O que esses fundamentos nos ensinam sobre o que é essencial na fé?',
            leitura: 'Hb 6.1-2',
            r: 'O texto lista ==arrependimento, fé, batismos, imposição de mãos, ressurreição e juízo eterno==. Podemos divergir sobre detalhes (como a imposição de mãos), mas **a lição é que a fé tem fundamentos claros**, que todo crente deve conhecer — e o autor de Hebreus convida a ==avançar para a maturidade== a partir deles.',
          },
          {
            p: 'Grantham entregou ao rei uma confissão de fé. Qual é a relação entre uma confissão de fé e a Bíblia?',
            leitura: 'Rm 10.9-10; 1Pe 3.15',
            r: 'Uma confissão ==resume e declara publicamente o que a igreja entende que a Bíblia ensina==. Ela **não está acima da Escritura** e pode ser corrigida por ela. Mas é útil: ensina, une a igreja e mostra a quem está de fora ==no que cremos e por quê==.',
          },
          {
            p: 'Um vigário anglicano, que discordava de Grantham, tornou-se seu amigo e o sepultou. O que essa história nos ensina sobre debates teológicos?',
            leitura: 'Rm 12.18; Ef 4.15',
            r: 'Que é possível ==defender a verdade com firmeza e ainda amar quem pensa diferente==. Paulo pede que **sigamos a verdade em amor**. Debates sérios não precisam destruir relacionamentos — e ==a forma como discordamos também é testemunho==.',
          },
        ],
      },
      {
        bloco: 'Para a vida e a igreja', cor: '#2dd4bf',
        perguntas: [
          {
            p: 'Como a nossa igreja pode ajudar os membros a avaliar pregações, livros, vídeos e “revelações” pela Escritura?',
            leitura: 'At 17.11; 1Ts 5.20-21',
            r: 'Sugestões: ==incentivar a conferir os textos na Bíblia aberta==, ensinar perguntas simples (“de onde vem isso no texto?”), **estudar juntos a confissão de fé da igreja** com as passagens que a sustentam e ==valorizar a pregação que expõe o texto==.',
          },
          {
            p: 'Que passo concreto o nosso grupo pode dar esta semana inspirado em Grantham?',
            leitura: 'Tg 1.22; Cl 3.16',
            r: 'Sugestões: ==ler Hebreus 6 e 2Timóteo 3 durante a semana==; **escrever em uma frase o que cremos sobre a Bíblia** com um versículo que sustente; e ==orar por alguém de quem discordamos==, buscando tratá-lo com amor.',
          },
        ],
      },
    ],
    obras: [
      { ano: '1662', titulo: 'The Prisoner against the Prelate', nota: 'Escrito na prisão de Lincoln, em defesa da fé e da liberdade de consciência.' },
      { ano: '1678', titulo: 'Christianismus Primitivus, or the Ancient Christian Religion', nota: 'Sua obra principal: exposição completa da fé e da ordem da igreja segundo os batistas gerais.' },
      { ano: '1687', titulo: 'St. Paul’s Catechism', nota: 'Catecismo para ensinar os fundamentos da fé a partir de Hebreus 6.1-2.' },
      { ano: '1691', titulo: 'A Dialogue between the Baptist and the Presbyterian', nota: 'Defesa do batismo de crentes a partir da Escritura.' },
    ],
    referencias: [
      { autor: 'BUSH, L. Russ; NETTLES, Tom J.', titulo: 'Os Batistas e a Bíblia', resto: 'Ortodoxia Batista. Cap. 1. (Original: Baptists and the Bible. Ed. rev. Nashville: Broadman & Holman, 1999).' },
      { autor: 'BASS, Clint C.', titulo: 'Thomas Grantham (1633–1692) and General Baptist Theology', resto: 'Oxford: Regent’s Park College, 2013. (Centre for Baptist History and Heritage Studies).' },
      { autor: 'GRANTHAM, Thomas.', titulo: 'Christianismus Primitivus, or the Ancient Christian Religion', resto: 'London: Francis Smith, 1678.' },
      { autor: 'LUMPKIN, William L.', titulo: 'Baptist Confessions of Faith', resto: 'Ed. rev. Valley Forge: Judson Press, 1969.' },
      { autor: 'McBETH, H. Leon.', titulo: 'The Baptist Heritage: Four Centuries of Baptist Witness', resto: 'Nashville: Broadman Press, 1987.' },
    ],
  },
  {
    slug: 'roger-williams',
    num: 5,
    cap: 'Cap. 4',
    grupo: 'Batistas na América · séc. XVII',
    nome: 'Roger Williams',
    nomeCurto: 'Williams',
    datas: 'c. 1603–1683',
    fotoNota: 'Não se conhece retrato autêntico de Williams. Na imagem, a estátua esculpida por Franklin Simmons.',
    subtitulo: 'O fundador de Rhode Island que leu a Bíblia como defesa da liberdade de consciência',
    intro: 'Formado em **Cambridge**, pastor puritano e exímio conhecedor das línguas, Roger Williams chegou à Nova Inglaterra em **1631**. Por ensinar que ==o magistrado civil não tem autoridade sobre a consciência==, foi **banido de Massachusetts** e, em 1636, fundou **Providence**, refúgio para os perseguidos por sua fé. Em **1639**, ajudou a formar ==a primeira igreja batista da América==. Toda a sua defesa da liberdade foi ==construída a partir da leitura das Escrituras==.',
    citacao: 'Para Williams, Israel era um tipo da igreja de Cristo, e não um modelo para os Estados: por isso nenhuma nação pode usar a espada para impor a fé.',
    eixosSub: 'Quatro eixos para entender sua relação com a Escritura',
    eixos: [
      {
        num: '01', icone: BookOpen, cor: '#fb923c',
        titulo: 'Israel como tipo: a chave de sua leitura bíblica',
        texto: 'Os puritanos de Massachusetts usavam o **Israel do Antigo Testamento** como modelo para o governo civil: se os reis de Israel puniam a idolatria, os magistrados cristãos também deveriam punir a heresia. Williams respondeu com a ==leitura tipológica==: Israel foi uma nação única, ==um tipo que se cumpre em Cristo e em sua igreja==, e não em algum Estado. **A espada de Israel se tornou, no Novo Testamento, a espada do Espírito** (Ef 6.17).',
        destaque: 'Nenhuma nação é o novo Israel: o povo de Deus agora é a igreja de Cristo, reunida pela Palavra.',
      },
      {
        num: '02', icone: Sprout, cor: '#fbbf24',
        titulo: 'O jardim e o deserto',
        texto: 'Williams usou uma imagem bíblica marcante: a igreja é ==o jardim de Deus== (Ct 4.12), e o mundo é o deserto. Quando a igreja se misturou ao poder do Estado, abriu-se uma brecha ==na “cerca ou muro de separação” entre o jardim e o deserto==, e o mundo invadiu a igreja. Para proteger **a pureza da igreja**, era preciso manter essa separação.',
        destaque: 'A separação entre igreja e Estado nasceu para proteger a igreja, e não para expulsar Deus da vida pública.',
      },
      {
        num: '03', icone: Scale, cor: '#2dd4bf',
        titulo: 'A Bíblia contra a perseguição',
        texto: 'Em **The Bloudy Tenent of Persecution** (1644), Williams discute longamente com o pastor John Cotton. Ele apela à **parábola do joio e do trigo** (Mt 13.24-30) e ao exemplo de Cristo, que ==não converteu ninguém pela força==. Perseguir por causa da consciência, dizia ele, é ==uma doutrina sangrenta, contrária ao Evangelho==. A conversão é obra do Espírito por meio da Palavra.',
        destaque: 'Uma consciência forçada não é uma consciência convertida.',
      },
      {
        num: '04', icone: Heart, cor: '#a78bfa',
        titulo: 'Uma busca inquieta pela igreja do Novo Testamento',
        texto: 'Em **1639**, Williams foi batizado por Ezequiel Holliman e batizou outros, formando ==a primeira igreja batista da América==, em Providence. Poucos meses depois, deixou a igreja: passou a duvidar de que alguém tivesse autoridade para restaurar as ordenanças sem uma nova comissão apostólica, e viveu como um **“buscador”** (**Seeker**). Sua história mostra ==alguém que levava a Bíblia tão a sério que não aceitava nada abaixo do padrão apostólico== — mas também os riscos de uma busca sem comunidade.',
        destaque: 'Williams nunca deixou de buscar a igreja da Bíblia — mesmo quando não conseguiu encontrá-la.',
      },
    ],
    linhaSub: 'De Londres a Providence',
    linha: [
      { ano: 'c. 1603', titulo: 'Nascimento', texto: 'Nasce em **Londres**, filho de um comerciante. Ainda jovem, chama a atenção do jurista **Edward Coke**.' },
      { ano: '1627', titulo: 'Cambridge', texto: 'Forma-se no **Pembroke College**, em Cambridge, com domínio de ==latim, grego e hebraico==.' },
      { ano: '1631', titulo: 'Nova Inglaterra', texto: 'Chega a **Boston** e recusa servir numa igreja que não havia se separado da Igreja da Inglaterra.' },
      { ano: '1635', titulo: 'Banimento', texto: 'O tribunal de Massachusetts o **bane** por suas ideias sobre a ==liberdade de consciência==.' },
      { ano: '1636', titulo: 'Providence', texto: 'Acolhido pelos **narragansetts**, compra terras deles e funda ==Providence, refúgio para os perseguidos==.' },
      { ano: '1639', titulo: 'Primeira igreja batista da América', texto: 'É **batizado** com outros crentes e forma ==a primeira igreja batista do continente==; meses depois, deixa a igreja.' },
      { ano: '1643', titulo: 'A língua dos nativos', texto: 'Publica **A Key into the Language of America**, fruto do ==convívio respeitoso com os povos nativos==.' },
      { ano: '1644', titulo: 'Carta e “Bloudy Tenent”', texto: 'Obtém em Londres uma carta para a colônia e publica ==The Bloudy Tenent of Persecution==.' },
      { ano: '1663', titulo: 'Carta real', texto: 'Rhode Island recebe uma carta real que garante ==plena liberdade religiosa== — algo inédito na época.' },
      { ano: '1683', titulo: 'Morte', texto: 'Morre em **Providence**, depois de décadas servindo a colônia que ajudou a fundar.' },
    ],
    licoes: [
      { t: 'Ler a Bíblia como um todo', d: 'Williams mostrou que ==o Antigo Testamento deve ser lido à luz de Cristo==. **Aplicar textos sem considerar o seu lugar na história da redenção** gera erros graves.' },
      { t: 'A fé não se impõe pela força', d: 'O Evangelho avança ==pela Palavra e pelo Espírito==, nunca pela coerção. **A igreja convence; não obriga.**' },
      { t: 'Buscar a igreja bíblica em comunidade', d: 'O zelo de Williams pela pureza era admirável, mas ==ninguém deve buscar a igreja ideal sozinho==. **O padrão apostólico se vive juntos.**' },
    ],
    grupoPerguntas: [
      {
        bloco: 'Para começar', cor: '#fbbf24',
        perguntas: [
          {
            p: 'Você já foi pressionado a fazer algo contra a sua consciência? Como se sentiu?',
            leitura: 'At 5.29',
            r: 'Deixe o grupo compartilhar. O objetivo é perceber ==o valor da consciência diante de Deus==. Os apóstolos responderam ao Sinédrio: **“Importa antes obedecer a Deus que aos homens.”**',
          },
        ],
      },
      {
        bloco: 'Williams e a Bíblia', cor: '#fb923c',
        perguntas: [
          {
            p: 'Os puritanos usavam o Israel do Antigo Testamento como modelo para o governo civil. Por que Williams discordava?',
            leitura: '1Pe 2.9-10; Gl 6.16',
            r: 'Porque ==Israel era uma nação única na história da salvação==, um tipo que se cumpre em Cristo. Pedro aplica à **igreja** os títulos de Israel (“raça eleita, sacerdócio real, nação santa”), e não a um país. Por isso, ==nenhum Estado pode reivindicar o papel de Israel== e punir pecados contra a primeira tábua da lei.',
          },
          {
            p: 'O que significa ler o Antigo Testamento “tipologicamente”? Deem exemplos.',
            leitura: 'Hb 10.1; 1Co 10.1-11',
            r: 'Significa reconhecer que ==pessoas, eventos e instituições do Antigo Testamento apontam para Cristo==. O cordeiro pascal aponta para a cruz; o templo, para Cristo e sua igreja; a terra prometida, para a herança eterna. **A lei tinha “a sombra dos bens futuros”**. Essa leitura ==não anula o Antigo Testamento==, mas o lê na direção que o próprio Novo Testamento indica.',
          },
          {
            p: 'Williams falava de um “muro de separação” entre o jardim (a igreja) e o deserto (o mundo). Hoje, quando se fala em “separação entre igreja e Estado”, o sentido é o mesmo?',
            leitura: 'Jo 18.36; 2Co 6.14-18',
            r: 'Nem sempre. Para Williams, ==o muro protegia a igreja da interferência do Estado e do mundo==. Hoje, a expressão às vezes é usada para **excluir a fé da vida pública** — algo que ele não defendia. Jesus disse: ==“O meu reino não é deste mundo”== — mas os cristãos continuam chamados a ser sal e luz na sociedade.',
          },
          {
            p: 'Williams aprendeu a língua dos narragansetts e os tratava com respeito. O que isso nos ensina sobre missão e testemunho?',
            leitura: '1Co 9.19-23; At 17.26-27',
            r: 'Que ==amar o próximo inclui conhecer sua língua e cultura== e tratá-lo com justiça. Williams comprou as terras em vez de tomá-las e **escreveu um livro para ajudar outros a se comunicar com os nativos**. Paulo se fez ==“tudo para com todos”== para ganhar alguns.',
          },
          {
            p: 'Williams deixou a igreja que ajudou a fundar porque achava que ninguém tinha autoridade para restaurar as ordenanças. O que podemos aprender com isso?',
            leitura: 'Mt 28.18-20; Hb 10.24-25',
            r: 'A Grande Comissão foi dada ==“até a consumação dos séculos”==: a igreja continua autorizada a fazer discípulos e batizar pela Palavra de Cristo, sem precisar de nova comissão apostólica. O zelo de Williams pela Bíblia era sério, mas **a busca da igreja perfeita pode levar ao isolamento**. Hebreus exorta: ==“não deixemos de congregar-nos”==.',
          },
        ],
      },
      {
        bloco: 'Para a vida e a igreja', cor: '#2dd4bf',
        perguntas: [
          {
            p: 'Como a nossa igreja pode defender a liberdade religiosa de todos — inclusive de quem crê diferente de nós?',
            leitura: 'Mt 7.12; 1Tm 2.1-2',
            r: 'Sugestões: ==orar pelas autoridades== e pelos cristãos perseguidos; **apoiar a liberdade de culto também para outros grupos**, pela regra de ouro; e ==anunciar o Evangelho com convicção e respeito==, sem buscar privilégios do Estado.',
          },
          {
            p: 'Que passo concreto o nosso grupo pode dar esta semana inspirado em Williams?',
            leitura: 'Lc 24.27; Tg 1.22',
            r: 'Sugestões: ==ler um texto do Antigo Testamento e perguntar como ele aponta para Cristo==; **orar por um povo ou grupo étnico ainda não alcançado**; e conversar com alguém de outra fé ==com respeito e clareza sobre o Evangelho==.',
          },
        ],
      },
    ],
    obras: [
      { ano: '1643', titulo: 'A Key into the Language of America', nota: 'Guia da língua e dos costumes dos narragansetts, com reflexões espirituais.' },
      { ano: '1644', titulo: 'Mr. Cotton’s Letter Lately Printed, Examined and Answered', nota: 'Onde aparece a imagem da “cerca ou muro de separação” entre o jardim e o deserto.' },
      { ano: '1644', titulo: 'The Bloudy Tenent of Persecution, for Cause of Conscience', nota: 'Sua obra mais famosa: defesa bíblica da liberdade de consciência.' },
      { ano: '1652', titulo: 'The Bloody Tenent Yet More Bloody', nota: 'Resposta à réplica de John Cotton.' },
    ],
    referencias: [
      { autor: 'BUSH, L. Russ; NETTLES, Tom J.', titulo: 'Os Batistas e a Bíblia', resto: 'Ortodoxia Batista. Cap. 4. (Original: Baptists and the Bible. Ed. rev. Nashville: Broadman & Holman, 1999).' },
      { autor: 'BARRY, John M.', titulo: 'Roger Williams and the Creation of the American Soul: Church, State, and the Birth of Liberty', resto: 'New York: Viking, 2012.' },
      { autor: 'GAUSTAD, Edwin S.', titulo: 'Liberty of Conscience: Roger Williams in America', resto: 'Grand Rapids: Eerdmans, 1991.' },
      { autor: 'MORGAN, Edmund S.', titulo: 'Roger Williams: The Church and the State', resto: 'New York: Harcourt, Brace & World, 1967.' },
      { autor: 'WILLIAMS, Roger.', titulo: 'The Bloudy Tenent of Persecution, for Cause of Conscience', resto: 'Ed. Richard Groves. Macon: Mercer University Press, 2001. (Classics of Religious Liberty, 2).' },
    ],
  },
];

// ── Links sincronizados ──────────────────────────────────────────────────────
// Fonte única dos links para as páginas dos teólogos. Usada em
// /biblioteca/livros/os-batistas-e-a-biblia e /biblioteca/autores/batistas-presbiterianos:
// ao incluir um teólogo em TEOLOGOS_BATISTAS, os cards das duas páginas passam a abrir o perfil.
export const ROTA_TEOLOGOS_BATISTAS = '/biblioteca/livros/os-batistas-e-a-biblia';

// Nomes escritos de forma diferente nas duas páginas → nome usado em TEOLOGOS_BATISTAS
const APELIDOS: Record<string, string> = {
  'walterrauschenbusch': 'W. Rauschenbusch',
  'williamnewtonclarke': 'W. N. Clarke',
  'harryemersonfosdick': 'H. E. Fosdick',
  'jamesjosiahreeve': 'J. J. Reeve',
  'charleshaddonspurgeon': 'C. H. Spurgeon',
};

const chave = (nome: string) =>
  nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z]/g, '');

export function linkTeologoBatista(nome: string): string | null {
  const alvo = chave(APELIDOS[chave(nome)] ?? nome);
  const t = TEOLOGOS_BATISTAS.find(x => chave(x.nome) === alvo);
  return t ? `${ROTA_TEOLOGOS_BATISTAS}/${t.slug}` : null;
}
