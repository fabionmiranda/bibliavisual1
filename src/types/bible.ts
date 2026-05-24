export interface PerguntaExegetica {
  termo: string;
  pergunta: string;
  resposta: string;
}

export interface InterlinearWord {
  hebraico: string;
  transliteracao: string;
  traducao: string;
  label?: string;
}

export interface VersoDetalhado {
  numero: number;
  interlinear: InterlinearWord[];
  explicacao: string;
  diagramaSintatico: string;
}

export interface BlocoQuiasmo {
  label: string;
  ref: string;
  conteudo: string;
  perguntas?: PerguntaExegetica[];
}

export interface Pericope {
  id: string;
  label: string;
  ref: string;
  tema: string;
  descricao: string;
}

export interface EstudoCapitulo {
  pericopes?: Pericope[];
  fundamento: {
    objetivo: string;
    fluxoTeologico: string;
    proposito: string;
  };
  versos: VersoDetalhado[];
  quiasmo: {
    blocos: BlocoQuiasmo[];
    explicacao: string;
  };
  centroTeologico: {
    versiculos: string;
    explicacao: string;
    verbosRepetidos: string[];
    mensagemCentral: string;
    sintese: string[];
  };
  diagramas: {
    sintaticoBlocos: string;
    semantico: string;
    integrado: string;
  };
  eixoCristologico: {
    problema: string;
    limitacao: string;
    perguntaCentral: string;
    cristo: {
      cumpre: string;
      substitui: string;
      aperfecoia: string;
      consuma: string;
    };
  };
  aplicacoes: {
    vidaEspiritual: string;
    santidade: string;
    igreja: string;
    adoracao: string;
  };
  homiletica: {
    titulo: string;
    palavraChave: string;
    perguntaCentral: string;
    pontos: string[];
  };
  conclusao: {
    sintese: string;
    fraseFinal: string;
  };
  referencia?: string;
  // New 20 Diagram structure support
  diagramas20?: {
    introducao?: {
      texto: string;
      objetivo: string;
    };
    interlinear: {
      descricao: string;
      secoes: { ref: string; hebraico: string; transliteracao: string; traducao: string; label?: string }[];
      explicacao: string;
    };
    morfologicoLexical: {
      descricao: string;
      termos: { termo: string; transliteracao: string; significado: string; campo: string; ref?: string }[];
      explicacao: string;
    };
    quiastico: {
      descricao: string;
      blocos: { label: string; ref: string; conteudo: string }[];
      explicacao: string;
    };
    sintatico: {
      descricao: string;
      blocos: { label: string; ref: string; sujeito: string; verbos: string; destinatario?: string; objeto?: string; verboPassivo?: string }[];
      explicacao: string;
    };
    semantico: {
      descricao: string;
      fluxo: { ref: string; ideia: string }[];
      explicacao: string;
    };
    progressivo: {
      descricao: string;
      etapas: { ref: string; acao: string }[];
      explicacao: string;
    };
    intensificacao: {
      descricao: string;
      niveis: { ref: string; foco: string }[];
      explicacao: string;
    };
    espacial: {
      descricao: string;
      esferas: { ref: string; esfera: string }[];
      explicacao: string;
    };
    acesso: {
      descricao: string;
      permissoes: { ref: string; acao: string }[];
      explicacao: string;
    };
    relacional: {
      descricao: string;
      vinculos: { ref: string; status: string }[];
      explicacao: string;
    };
    cristologico: {
      descricao: string;
      conexoes: { ref: string; apontaPara: string }[];
      explicacao: string;
    };
    sistematico: {
      descricao: string;
      doutrinas: { ref: string; doutrina: string }[];
      explicacao: string;
    };
    tensao: {
      descricao: string;
      movimento: { ref: string; estado: string }[];
      explicacao: string;
    };
    repeticao: {
      descricao: string;
      padroes: { ref: string; tema: string }[];
      explicacao: string;
    };
    causaEfeito: {
      descricao: string;
      logica: { ref: string; acao: string; consequencia?: string }[];
      explicacao: string;
    };
    apologetico: {
      descricao: string;
      confrontos: { ref: string; tema: string; heresias: string[] }[];
      explicacao: string;
    };
    perguntas: {
      descricao: string;
      secoes: { ref: string; titulo: string; perguntas: string[] }[];
      explicacao: string;
    };
    autoral: {
      descricao: string;
      contribuicoes: { label: string; ref: string; titulo: string; autores: { nome: string; comentario: string }[] }[];
      explicacao: string;
    };
    homiletico: {
      descricao: string;
      temaCentral: string;
      esboço: { label: string; ref: string; ponto: string }[];
      explicacao: string;
    };
    pastoralPratico: {
      descricao: string;
      direcionamentos: { ref: string; titulo: string; adultos: string; jovens: string; igreja: string }[];
      explicacao: string;
    };
    antropologico?: {
      descricao: string;
      secoes: {
        ref: string;
        titulo: string;
        analises: {
          nivel: string;
          conteudo: string;
        }[];
      }[];
      explicacao: string;
    };
    familiar?: {
      descricao: string;
      secoes: {
        ref: string;
        familia: string;
        fluxo: string;
      }[];
      explicacao: string;
    };
    trinitario?: {
      descricao: string;
      secoes: {
        ref: string;
        titulo: string;
        fluxo: string;
        pai: string;
        filho: string;
        espirito: string;
      }[];
      explicacao: string;
    };
  };
}

export interface Verse {
  verso: number;
  texto: string;
  diagrama?: string;
}

export interface Capitulo {
  numero: number;
  versos: Verse[];
  estudo?: EstudoCapitulo;
}

export interface Livro {
  id: string;
  nome: string;
  testamento: 'AT' | 'NT';
  capitulos: Capitulo[];
}

export interface BibleData {
  livros: Livro[];
}
