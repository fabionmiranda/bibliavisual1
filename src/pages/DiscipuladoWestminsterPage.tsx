import ConfissaoIndice, { type CapituloConfissao } from '../components/ConfissaoIndice';

export const CAPITULOS: CapituloConfissao[] = [
  { num: 1, titulo: 'Da Escritura Sagrada', disponivel: true, path: '/discipulado/confessional/westminster/cap1' },
  { num: 2, titulo: 'De Deus e da Santíssima Trindade', disponivel: true, path: '/discipulado/confessional/westminster/cap2' },
  { num: 3, titulo: 'Dos Eternos Decretos de Deus', disponivel: false, path: '' },
  { num: 4, titulo: 'Da Criação', disponivel: false, path: '' },
  { num: 5, titulo: 'Da Providência', disponivel: false, path: '' },
  { num: 6, titulo: 'Da Queda do Homem, do Pecado e do seu Castigo', disponivel: false, path: '' },
  { num: 7, titulo: 'Do Pacto de Deus com o Homem', disponivel: false, path: '' },
  { num: 8, titulo: 'De Cristo, o Mediador', disponivel: false, path: '' },
  { num: 9, titulo: 'Do Livre-Arbítrio', disponivel: false, path: '' },
  { num: 10, titulo: 'Da Vocação Eficaz', disponivel: false, path: '' },
  { num: 11, titulo: 'Da Justificação', disponivel: false, path: '' },
  { num: 12, titulo: 'Da Adoção', disponivel: false, path: '' },
  { num: 13, titulo: 'Da Santificação', disponivel: false, path: '' },
  { num: 14, titulo: 'Da Fé Salvadora', disponivel: false, path: '' },
  { num: 15, titulo: 'Do Arrependimento para a Vida', disponivel: false, path: '' },
  { num: 16, titulo: 'Das Boas Obras', disponivel: false, path: '' },
  { num: 17, titulo: 'Da Perseverança dos Santos', disponivel: false, path: '' },
  { num: 18, titulo: 'Da Certeza da Graça e da Salvação', disponivel: false, path: '' },
  { num: 19, titulo: 'Da Lei de Deus', disponivel: false, path: '' },
  { num: 20, titulo: 'Da Liberdade Cristã e da Liberdade de Consciência', disponivel: false, path: '' },
  { num: 21, titulo: 'Do Culto Religioso e do Domingo', disponivel: false, path: '' },
  { num: 22, titulo: 'Dos Juramentos Legais e dos Votos', disponivel: false, path: '' },
  { num: 23, titulo: 'Do Magistrado Civil', disponivel: false, path: '' },
  { num: 24, titulo: 'Do Matrimônio e do Divórcio', disponivel: false, path: '' },
  { num: 25, titulo: 'Da Igreja', disponivel: false, path: '' },
  { num: 26, titulo: 'Da Comunhão dos Santos', disponivel: false, path: '' },
  { num: 27, titulo: 'Dos Sacramentos', disponivel: false, path: '' },
  { num: 28, titulo: 'Do Batismo', disponivel: false, path: '' },
  { num: 29, titulo: 'Da Ceia do Senhor', disponivel: false, path: '' },
  { num: 30, titulo: 'Das Censuras Eclesiásticas', disponivel: false, path: '' },
  { num: 31, titulo: 'Dos Sínodos e Concílios', disponivel: false, path: '' },
  { num: 32, titulo: 'Do Estado do Homem depois da Morte e da Ressurreição dos Mortos', disponivel: false, path: '' },
  { num: 33, titulo: 'Do Juízo Final', disponivel: false, path: '' },
];

export default function DiscipuladoWestminsterPage() {
  return (
    <ConfissaoIndice
      c={{
        sigla: 'CFW',
        ano: '1646',
        titulo: 'Confissão de Fé de Westminster',
        subtitulo: 'Discipulado Confessional Reformado',
        descricao: 'Estudo capítulo a capítulo da Confissão de Fé de Westminster (1646), o símbolo de fé presbiteriano — com introdução histórica, texto confessional, perguntas, gabaritos e referências bibliográficas.',
        cor: '#60a5fa',
        heroBg: 'linear-gradient(135deg, #0a1020 0%, #001a33 55%, #0a1020 100%)',
        ficha: [
          { rotulo: 'Concluída', valor: '1646 · Assembleia de 1643–1653' },
          { rotulo: 'Origem', valor: 'Abadia de Westminster, Londres' },
          { rotulo: 'Autoria', valor: 'Assembleia de Westminster' },
          { rotulo: 'Tradição', valor: 'Presbiteriana Reformada' },
        ],
        grupos: [
          { titulo: 'As Escrituras e Deus', icone: '📜', de: 1, ate: 5 },
          { titulo: 'A Queda e o Pacto', icone: '🍎', de: 6, ate: 7 },
          { titulo: 'Cristo, o Mediador', icone: '✝️', de: 8, ate: 8 },
          { titulo: 'A Aplicação da Salvação', icone: '🕊️', de: 9, ate: 18 },
          { titulo: 'A Vida Cristã no Mundo', icone: '⚖️', de: 19, ate: 24 },
          { titulo: 'A Igreja e os Sacramentos', icone: '⛪', de: 25, ate: 31 },
          { titulo: 'As Últimas Coisas', icone: '🌅', de: 32, ate: 33 },
        ],
        capitulos: CAPITULOS,
      }}
    />
  );
}
