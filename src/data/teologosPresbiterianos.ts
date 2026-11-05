import { BookOpen, Compass, Megaphone, Scale } from 'lucide-react';
import type { TeologoBatista } from './teologosBatistas';

// Teólogos presbiterianos / reformados da página /biblioteca/autores/batistas-presbiterianos
// com perfil próprio. Mesmo formato (e mesma página) dos teólogos batistas.
// Rota: /biblioteca/autores/batistas-presbiterianos/<slug>
// Nos textos: **trecho** = negrito branco; ==trecho== = destaque colorido.

export const ROTA_TEOLOGOS_PRESBITERIANOS = '/biblioteca/autores/batistas-presbiterianos';

export const TEOLOGOS_PRESBITERIANOS: TeologoBatista[] = [
  {
    slug: 'william-perkins',
    num: 1,
    cap: 'Par do Cap. 1',
    grupo: 'Puritanos ingleses · séc. XVI',
    nome: 'William Perkins',
    nomeCurto: 'Perkins',
    datas: '1558–1602',
    foto: 'https://commons.wikimedia.org/wiki/Special:FilePath/British_-_William_Perkins_-_Google_Art_Project.jpg',
    subtitulo: 'O “pai do puritanismo” que ensinou a Inglaterra a ler, pregar e viver a Escritura',
    intro: 'Jovem de vida desregrada em **Cambridge**, William Perkins foi ==convertido pela graça de Deus== e se tornou o pregador mais influente da Inglaterra elisabetana. Da igreja de **Great St. Andrew’s** e do **Christ’s College**, formou uma geração de pastores e escreveu obras lidas em toda a Europa. Para ele, ==a Escritura é a Palavra de Deus, a única regra da fé e da vida==, e todo o trabalho do pastor é **expô-la com clareza e aplicá-la à consciência**.',
    citacao: 'Pregar um só Cristo, por Cristo, para o louvor de Cristo — assim Perkins resumia a tarefa de quem recebe a Escritura para anunciá-la.',
    eixosSub: 'Quatro eixos para entender sua relação com a Escritura',
    eixos: [
      {
        num: '01', icone: BookOpen, cor: '#3b82f6',
        titulo: 'A Escritura como única regra da fé e da vida',
        texto: 'Perkins ensinava que a Bíblia é ==a Palavra de Deus escrita, inspirada e suficiente==. Em **A Reformed Catholike** (1597), comparou ponto por ponto a fé reformada com a de Roma e mostrou que ==a tradição, os concílios e o papa não podem estar acima da Escritura==. A igreja não dá autoridade à Bíblia: **reconhece a autoridade que a Bíblia já tem**.',
        destaque: 'A igreja é testemunha da Escritura, não sua juíza.',
      },
      {
        num: '02', icone: Compass, cor: '#fbbf24',
        titulo: 'A Escritura interpretada pela Escritura',
        texto: 'Em **The Arte of Prophecying** (1592), o primeiro grande manual inglês de pregação, Perkins ensina a interpretar a Bíblia com três ferramentas: ==a analogia da fé== (o conjunto do ensino bíblico), ==as circunstâncias do texto== (contexto, autor, propósito) e ==a comparação de passagens==. O sentido do texto é **um só, o sentido natural**, e é a própria Escritura que o esclarece.',
        destaque: 'O melhor comentário da Bíblia é a própria Bíblia.',
      },
      {
        num: '03', icone: Megaphone, cor: '#2dd4bf',
        titulo: 'Pregar o texto: ler, explicar, ensinar e aplicar',
        texto: 'Perkins resumiu a pregação em quatro passos: ==ler o texto com clareza==, **dar o seu sentido** pela própria Escritura, ==extrair as doutrinas== que ele ensina e **aplicá-las à vida** dos ouvintes, com linguagem simples. Recusou a pregação cheia de citações eruditas e enfeites: ==o pregador deve esconder a sua erudição e mostrar Cristo==. Esse modelo formou gerações de puritanos.',
        destaque: 'Pregar um só Cristo, por Cristo, para o louvor de Cristo.',
      },
      {
        num: '04', icone: Scale, cor: '#a78bfa',
        titulo: 'A Escritura para a consciência e a vida diária',
        texto: 'Perkins é chamado de ==pai da “teologia de casos de consciência”==. Em obras como **A Case of Conscience** (1592) e **The Whole Treatise of the Cases of Conscience** (1606), ele usa a Bíblia para responder a perguntas práticas: **como ter certeza da salvação? como lidar com a tentação? como viver no trabalho e na família?** Para ele, ==a teologia é a ciência de viver bem para sempre==.',
        destaque: 'A Bíblia não foi dada só para ser explicada, mas para ser vivida.',
      },
    ],
    linhaSub: 'De Warwickshire a Cambridge',
    linha: [
      { ano: '1558', titulo: 'Nascimento', texto: 'Nasce em **Marston Jabbett**, Warwickshire, no ano em que ==Elizabeth I sobe ao trono==.' },
      { ano: '1577', titulo: 'Cambridge', texto: 'Entra no **Christ’s College**, em Cambridge. Na juventude, tem fama de ==beberrão e dado à astrologia==.' },
      { ano: 'c. 1581', titulo: 'Conversão', texto: 'Segundo um relato antigo, ouve uma mãe ameaçar o filho: “vou entregá-lo ao **bêbado Perkins**”. Envergonhado, ==volta-se para Deus e para a Escritura==.' },
      { ano: '1584', titulo: 'Fellow e pregador', texto: 'Torna-se **fellow** do Christ’s College e pregador em ==Great St. Andrew’s==, onde serve até a morte. Também prega aos **presos** da cadeia de Cambridge.' },
      { ano: '1590–1591', titulo: 'A Golden Chaine', texto: 'Publica a **Armilla Aurea** (latim, 1590) e a versão inglesa, ==um mapa da salvação segundo a Escritura==.' },
      { ano: '1592', titulo: 'The Arte of Prophecying', texto: 'Publica em latim o seu ==manual de interpretação e pregação==, traduzido para o inglês em 1607.' },
      { ano: '1595', titulo: 'Casamento', texto: 'Casa-se com **Timothye Cradock** e deixa o cargo de fellow, mas ==continua pregando em Great St. Andrew’s==.' },
      { ano: '1597', titulo: 'A Reformed Catholike', texto: 'Mostra que ==a fé reformada é a fé “católica” antiga==, fiel à Escritura, e não uma novidade.' },
      { ano: '1602', titulo: 'Morte', texto: 'Morre aos **44 anos**. Suas obras continuam a formar pastores ==na Inglaterra, na Holanda e na Nova Inglaterra==.' },
    ],
    licoes: [
      { t: 'A Escritura forma pregadores', d: 'Perkins mostrou que a boa pregação ==nasce de um texto bem lido e bem explicado==. **Quem prega deve primeiro ser aluno da Bíblia.**' },
      { t: 'A Bíblia fala à consciência', d: 'A teologia não é só para a sala de aula: ==a Escritura responde às dúvidas e lutas reais== do coração e do dia a dia.' },
      { t: 'Clareza é um ato de amor', d: 'Perkins ==escondia a erudição para mostrar Cristo==. **Falar a Palavra de forma simples** é servir quem ouve.' },
    ],
    grupoPerguntas: [
      {
        bloco: 'Para começar', cor: '#fbbf24',
        perguntas: [
          {
            p: 'Perkins era conhecido como “o bêbado Perkins” antes de se converter. Que diferença a Palavra de Deus já fez na sua história?',
            leitura: '1Co 6.9-11',
            r: 'Deixe o grupo compartilhar. O objetivo é lembrar que ==ninguém está longe demais da graça==. Paulo lista pecados graves e conclui: **“Tais fostes alguns de vós; mas fostes lavados”**. Deus fez de um jovem dissoluto ==um dos maiores pregadores da Inglaterra==.',
          },
        ],
      },
      {
        bloco: 'Perkins e a Bíblia', cor: '#3b82f6',
        perguntas: [
          {
            p: 'Perkins dizia que a igreja não dá autoridade à Bíblia, apenas a reconhece. Qual é a diferença?',
            leitura: '2Tm 3.16-17; 1Ts 2.13',
            r: 'Se a igreja desse autoridade à Bíblia, ==a igreja estaria acima dela== e poderia mudá-la. Mas a Escritura é **“inspirada por Deus”**: sua autoridade vem de Deus. Os tessalonicenses receberam a pregação ==“não como palavra de homens, mas como Palavra de Deus”==. A igreja reconhece, guarda e obedece.',
          },
          {
            p: 'Uma das regras de Perkins era interpretar a Escritura pela própria Escritura. Escolham um texto difícil e vejam como outros textos o esclarecem.',
            leitura: 'Tg 2.24 com Rm 3.28 e Gl 5.6',
            r: 'Tiago parece contradizer Paulo, mas lendo os dois ==percebemos que falam de coisas diferentes==: Paulo trata de **como somos justificados diante de Deus** (pela fé); Tiago mostra que ==a fé verdadeira se prova pelas obras==. Gálatas 5.6 une os dois: **“a fé que atua pelo amor”**.',
          },
          {
            p: 'Os quatro passos da pregação de Perkins são: ler, explicar, ensinar a doutrina e aplicar. Por que a aplicação é tão importante?',
            leitura: 'Ne 8.8; Tg 1.22-25',
            r: 'Porque ==a Palavra foi dada para transformar a vida==, não apenas para informar. Em Neemias, os levitas **liam, explicavam o sentido** e o povo entendia — e reagia com choro e alegria. Tiago adverte que ouvir sem praticar é ==olhar no espelho e esquecer o próprio rosto==.',
          },
          {
            p: 'Perkins dizia que o pregador deve “esconder a erudição” para mostrar Cristo. Isso significa que estudo não importa?',
            leitura: '1Co 2.1-5; 2Tm 2.15',
            r: '**Não.** Perkins era muito erudito e exigia estudo sério (2Tm 2.15). O ponto é que ==o estudo serve à clareza, e não à vaidade==. Paulo, homem culto, decidiu ==“nada saber senão Jesus Cristo, e este crucificado”==, para que a fé dos ouvintes se apoiasse no poder de Deus.',
          },
          {
            p: 'Perkins escreveu sobre “casos de consciência”, como ter certeza da salvação. O que a Bíblia diz a quem duvida?',
            leitura: '1Jo 5.13; 2Pe 1.10',
            r: 'João escreveu ==“para que saibais que tendes a vida eterna”==. A certeza **vem das promessas de Deus em Cristo**, e é confirmada pelos frutos de uma vida transformada (2Pe 1.5-10). Perkins ensinava a ==olhar primeiro para Cristo, e não para os próprios sentimentos==.',
          },
        ],
      },
      {
        bloco: 'Para a vida e a igreja', cor: '#2dd4bf',
        perguntas: [
          {
            p: 'Perkins pregava também aos presos da cadeia de Cambridge. Quem, perto de nós, precisa ouvir a Palavra com simplicidade e amor?',
            leitura: 'Mt 25.36; Hb 13.3',
            r: 'Sugestões: ==presídios, hospitais, asilos==, pessoas em situação de rua, vizinhos afastados da igreja. O grupo pode **identificar um lugar e planejar uma visita**, levando a Palavra ==de forma clara e acolhedora==.',
          },
          {
            p: 'Que passo concreto o nosso grupo pode dar esta semana inspirado em Perkins?',
            leitura: 'Sl 119.105; Cl 3.16',
            r: 'Sugestões: ==praticar os quatro passos== com um texto curto (ler, explicar, extrair a verdade, aplicar); **compartilhar com alguém uma aplicação concreta** do que leu; e orar pelos ==pregadores e professores da igreja==.',
          },
        ],
      },
    ],
    obras: [
      { ano: '1590', titulo: 'The Foundation of Christian Religion', nota: 'Catecismo simples para ensinar os fundamentos da fé ao povo.' },
      { ano: '1591', titulo: 'A Golden Chaine', nota: 'Exposição da ordem da salvação, com o famoso diagrama das causas da salvação e da condenação.' },
      { ano: '1592', titulo: 'The Arte of Prophecying', nota: 'Manual de interpretação bíblica e de pregação (em latim; tradução inglesa em 1607).' },
      { ano: '1592', titulo: 'A Case of Conscience', nota: 'Como alguém pode saber se é filho de Deus — aplicação pastoral de 1 João.' },
      { ano: '1597', titulo: 'A Reformed Catholike', nota: 'Comparação entre a fé reformada e a Igreja de Roma à luz da Escritura.' },
    ],
    referencias: [
      { autor: 'BEEKE, Joel R.; PEDERSON, Randall J.', titulo: 'Paixão pela pureza: conheça os puritanos', resto: 'São Paulo: PES, 2010.' },
      { autor: 'BEEKE, Joel R.; JONES, Mark.', titulo: 'Teologia puritana: doutrina para a vida', resto: 'São Paulo: Vida Nova, 2016.' },
      { autor: 'PERKINS, William.', titulo: 'A arte de profetizar', resto: 'Trad. bras. São Paulo: Editora Cultura Cristã. (Original: The Arte of Prophecying, 1607).' },
      { autor: 'PERKINS, William.', titulo: 'The Works of William Perkins', resto: 'Ed. Joel R. Beeke e Derek W. H. Thomas. Grand Rapids: Reformation Heritage Books, 2014–2020. 10 v.' },
      { autor: 'PATTERSON, W. B.', titulo: 'William Perkins and the Making of a Protestant England', resto: 'Oxford: Oxford University Press, 2014.' },
    ],
  },
];

const chave = (nome: string) =>
  nome.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]/g, '');

// Link do perfil, ou null se o teólogo ainda não tem página
export function linkTeologoPresbiteriano(nome: string): string | null {
  const t = TEOLOGOS_PRESBITERIANOS.find(x => chave(x.nome) === chave(nome));
  return t ? `${ROTA_TEOLOGOS_PRESBITERIANOS}/${t.slug}` : null;
}
