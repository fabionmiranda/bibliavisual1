// Livreto evangelístico: "O Evangelho de Jesus Cristo" — Paul Washer.
// Editora Defesa do Evangelho, São Paulo, 2016, 2ª edição.
//
// Marcações de ênfase aceitas nos parágrafos (ver componente Enfase):
//   **texto**  → dourado (ideia-chave)
//   ==texto==  → marca-texto âmbar (frase central)
//   !!texto!!  → rosa/vermelho (o problema: pecado, culpa, corrupção)
//   ++texto++  → verde (a salvação: perdão, reconciliação, vida)
//   ~~texto~~  → azul (a pessoa de Cristo)
//   __texto__  → violeta (termo a definir)

export const LIVRETO_WASHER = {
  slug: 'o-evangelho-de-jesus-cristo',
  titulo: 'O Evangelho de Jesus Cristo',
  autor: 'Paul Washer',
  editora: 'Editora Defesa do Evangelho',
  cidade: 'São Paulo',
  ano: 2016,
  edicao: '2ª edição',
  capa: '/livros/o-evangelho-de-jesus-cristo.jpg',
  /** link do vídeo de animação no YouTube (qualquer formato: watch, youtu.be, shorts, embed). Vazio = "em breve". */
  video: 'https://youtu.be/nvDeZAZuo9E',
};

export const ROTA_LIVRETO_WASHER = `/biblioteca/livretos/${LIVRETO_WASHER.slug}`;

export interface ParagrafoLivreto {
  rotulo: string;
  cor: string;
  texto: string;
}

export interface ParteLivreto {
  id: string;
  n: string;
  titulo: string;
  legenda?: string;
  subLegenda?: string;
  paragrafos: ParagrafoLivreto[];
  notas?: string[];
}

export const PARTES_WASHER: ParteLivreto[] = [
  {
    id: 'introducao',
    n: 'Intro',
    titulo: 'Introdução',
    legenda: 'O homem não precisa de uma nova ideia. Precisa de uma Boa Notícia que venha de fora dele.',
    subLegenda: 'Nenhuma escola, partido ou terapia alcança a culpa e a corrupção do coração humano. Só Cristo alcança.',
    paragrafos: [
      {
        rotulo: 'A mensagem central',
        cor: '#fbbf24',
        texto:
          'A ==mensagem central do Cristianismo é o Evangelho de Jesus Cristo==. A palavra __evangelho__ significa **“boas novas”**. O Cristianismo oferece ==as melhores notícias de todos os tempos!== De fato, ele oferece **a única solução** para nossas crises mais urgentes. Nenhum **programa educacional**, **partido político** ou **terapia psicológica** é capaz de lidar com ==o problema mais profundo da raça humana==. Embora a sabedoria humana tenha nos dado muitos benefícios temporários, a história também revelou o quão !!falidos!! estamos para enfrentar a !!profunda culpa!! e a !!penetrante corrupção!! sob as quais se angustia o nosso mundo.',
      },
      {
        rotulo: 'A vinda de Cristo',
        cor: '#38bdf8',
        texto:
          'O Evangelho anuncia as boas novas ==da vinda de Jesus Cristo==. Há aproximadamente **dois mil anos**, durante o auge do **Império Romano**, ~~Deus enviou o Seu Filho~~ na história humana a fim de ++salvar pessoas de todas as nações++ de seus !!pecados e misérias!!. Cristo foi ~~concebido pelo Espírito de Deus~~ no ventre de uma **virgem** e nasceu Jesus de Nazaré, ==o Deus-homem==.',
      },
      {
        rotulo: 'A cruz e a ressurreição',
        cor: '#34d399',
        texto:
          'Jesus veio para ==carregar os pecados== dos homens e mulheres caídos e para ~~oferecer Sua vida como um sacrifício em nosso lugar~~. A Sua morte **satisfez as exigências da justiça de Deus** contra os pecadores e tornou possível que ==um Deus justo os perdoasse==. A Sua **ressurreição**, após três dias, testificou que Ele é ~~o Filho de Deus~~ e que Deus aceitou a Sua morte como ==completo pagamento por nosso pecado==. Agora, todas as pessoas podem ser ++totalmente perdoadas++, ++reconciliadas com Deus++ e ++receber a vida eterna++ através da **fé na pessoa e na obra de Jesus Cristo**. Por meio dessa grande obra de salvação ==Deus nos revelou quem Ele é==.¹',
      },
    ],
    notas: ['Quero agradecer, antes de prosseguir, a Paul M. Smalley, por sua oportuna assistência editorial neste livreto.'],
  },
];

