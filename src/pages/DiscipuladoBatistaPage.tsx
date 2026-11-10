import ConfissaoIndice, { type CapituloConfissao } from '../components/ConfissaoIndice';

export const CAPITULOS: CapituloConfissao[] = [
  { num: 1, titulo: 'Das Sagradas Escrituras', disponivel: true, path: '/discipulado/confessional/cap1' },
  { num: 2, titulo: 'De Deus e da Santa Trindade', disponivel: true, path: '/discipulado/confessional/cap2' },
  { num: 3, titulo: 'Do Decreto de Deus', disponivel: true, path: '/discipulado/confessional/cap3' },
  { num: 4, titulo: 'Da Criação', disponivel: false, path: '' },
  { num: 5, titulo: 'Da Providência', disponivel: false, path: '' },
  { num: 6, titulo: 'Da Queda do Homem, do Pecado e de seu Castigo', disponivel: false, path: '' },
  { num: 7, titulo: 'Do Pacto de Deus', disponivel: false, path: '' },
  { num: 8, titulo: 'De Cristo o Mediador', disponivel: false, path: '' },
  { num: 9, titulo: 'Do Livre-Arbítrio', disponivel: false, path: '' },
  { num: 10, titulo: 'Do Chamado Eficaz', disponivel: false, path: '' },
  { num: 11, titulo: 'Da Justificação', disponivel: false, path: '' },
  { num: 12, titulo: 'Da Adoção', disponivel: false, path: '' },
  { num: 13, titulo: 'Da Santificação', disponivel: false, path: '' },
  { num: 14, titulo: 'Da Fé Salvadora', disponivel: false, path: '' },
  { num: 15, titulo: 'Do Arrependimento para a Vida e a Salvação', disponivel: false, path: '' },
  { num: 16, titulo: 'Das Boas Obras', disponivel: false, path: '' },
  { num: 17, titulo: 'Da Perseverança dos Santos', disponivel: false, path: '' },
  { num: 18, titulo: 'Da Asseguração da Graça e da Salvação', disponivel: false, path: '' },
];

export default function DiscipuladoBatistaPage() {
  return (
    <ConfissaoIndice
      c={{
        sigla: 'CFB',
        ano: '1689',
        titulo: 'Confissão Batista de 1689',
        subtitulo: 'Discipulado Confessional Batista',
        descricao: 'Estudo capítulo a capítulo da Confissão de Fé Batista de Londres de 1689 — com introdução histórica, texto confessional, perguntas para discussão, gabaritos e referências bibliográficas.',
        cor: '#fbbf24',
        heroBg: 'linear-gradient(135deg, #0a1020 0%, #1c1200 55%, #0a1020 100%)',
        ficha: [
          { rotulo: 'Publicação', valor: '1677 · reeditada em 1689' },
          { rotulo: 'Origem', valor: 'Londres, Inglaterra' },
          { rotulo: 'Base', valor: 'Westminster (1646) e Savoy (1658)' },
          { rotulo: 'Tradição', valor: 'Batista Particular Reformada' },
        ],
        grupos: [
          { titulo: 'As Escrituras e Deus', icone: '📜', de: 1, ate: 5 },
          { titulo: 'A Queda e o Pacto', icone: '🍎', de: 6, ate: 7 },
          { titulo: 'Cristo, o Mediador', icone: '✝️', de: 8, ate: 8 },
          { titulo: 'A Aplicação da Salvação', icone: '🕊️', de: 9, ate: 18 },
        ],
        capitulos: CAPITULOS,
      }}
    />
  );
}
