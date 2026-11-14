// Formato dos dados de "leitura guiada" (resumo por página e parágrafo, com perguntas).

export interface ParagrafoGuiado {
  n: number;
  /** true quando é a continuação de um parágrafo iniciado na página anterior */
  cont: boolean;
  pags: string;
  titulo: string;
  /** número da página onde o parágrafo continua, se houver */
  continua: string | null;
  texto: string;
}

export interface PaginaGuiada {
  pagina: string;
  resumo: string;
  paragrafos: ParagrafoGuiado[];
  pergunta: string;
  respostaRef: string;
  resposta: string;
}

export interface NotaGuiada { id: string; ref: string; texto: string }

export interface LeituraGuiada {
  referencia: string;
  observacaoInicial: { titulo: string; texto: string } | null;
  passos: string[];
  observacoes: string[];
  totalParagrafos: number;
  paginas: PaginaGuiada[];
  notas: {
    paginas: string;
    resumo: string;
    tradutor: NotaGuiada[];
    tradutorPags: string;
    autor: NotaGuiada[];
    autorPags: string;
    pergunta: string;
    respostaRef: string;
    resposta: string | string[];
  };
  quadro: { pags: string; pars: string; tema: string }[];
  conceitos: string[] | null;
  final: { pergunta: string; sugestao: string[] };
}
