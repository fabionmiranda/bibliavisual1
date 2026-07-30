export type ArtigoTeologia = {
  id: string;
  slug: string;
  categoria: string;
  titulo: string;
  parte?: string;
  resumo: string;
  conteudo: string;
  status: 'publicado' | 'rascunho';
};

export const ARTIGOS_TEOLOGIA: ArtigoTeologia[] = [
  // ── Introdução aos Estudos Teológicos ──────────────────────────────
  {
    id: '01',
    slug: 'conhecendo-a-area',
    categoria: 'Introdução aos Estudos Teológicos',
    titulo: 'Conhecendo a Área',
    resumo: 'Uma visão panorâmica do campo teológico: suas subdisciplinas, métodos e relevância para a vida cristã e a missão da Igreja.',
    conteudo: `# Conhecendo a Área\n\n**Categoria:** Introdução aos Estudos Teológicos\n\n> Conteúdo em redação. Este artigo abordará: uma visão panorâmica do campo teológico — suas subdisciplinas (teologia bíblica, sistemática, histórica e prática), seus métodos e sua relevância para a vida cristã e a missão da Igreja.`,
    status: 'rascunho',
  },

  // ── Natureza e Finalidade da Teologia ──────────────────────────────
  {
    id: '02',
    slug: 'natureza-finalidade-teologia-parte-1',
    categoria: 'Natureza e Finalidade da Teologia',
    titulo: 'O Que é Teologia? Natureza, Objeto e Finalidade da Disciplina',
    parte: 'Parte I',
    resumo: 'Definição rigorosa de teologia como ciência: seu objeto formal (Deus e tudo em relação a Deus), sua natureza epistemológica e sua finalidade última.',
    conteudo: `# O Que é Teologia? Natureza, Objeto e Finalidade da Disciplina\n\n**Categoria:** Natureza e Finalidade da Teologia · Parte I\n\n> Conteúdo em redação. Este artigo abordará: a definição rigorosa de teologia como disciplina científica — seu objeto formal (Deus e tudo o que existe em relação a Deus), sua natureza epistemológica, seu método e sua finalidade última: o conhecimento de Deus para a glória de Deus.`,
    status: 'rascunho',
  },
  {
    id: '03',
    slug: 'natureza-finalidade-teologia-parte-2',
    categoria: 'Natureza e Finalidade da Teologia',
    titulo: 'Natureza e Finalidade da Teologia',
    parte: 'Parte II',
    resumo: 'Aprofundamento das subdivisões internas da teologia e da relação entre fé e razão no trabalho teológico.',
    conteudo: `# Natureza e Finalidade da Teologia\n\n**Categoria:** Natureza e Finalidade da Teologia · Parte II\n\n> Conteúdo em redação. Este artigo abordará: as subdivisões internas da teologia (bíblica, sistemática, histórica, prática) e a relação entre fé e razão no trabalho teológico — como a razão serve à fé sem substituí-la.`,
    status: 'rascunho',
  },
  {
    id: '04',
    slug: 'natureza-finalidade-teologia-parte-3',
    categoria: 'Natureza e Finalidade da Teologia',
    titulo: 'Natureza e Finalidade da Teologia',
    parte: 'Parte III',
    resumo: 'A teologia como vocação eclesial: sua função formativa na pregação, no ensino e na vida devocional da comunidade de fé.',
    conteudo: `# Natureza e Finalidade da Teologia\n\n**Categoria:** Natureza e Finalidade da Teologia · Parte III\n\n> Conteúdo em redação. Este artigo abordará: a teologia como vocação eclesial — sua função formativa na pregação, no ensino e na vida devocional da comunidade cristã, e por que toda a Igreja (não apenas acadêmicos) é chamada ao rigor teológico.`,
    status: 'rascunho',
  },
  {
    id: '05',
    slug: 'natureza-finalidade-teologia-parte-4',
    categoria: 'Natureza e Finalidade da Teologia',
    titulo: 'Natureza e Finalidade da Teologia',
    parte: 'Parte IV',
    resumo: 'Teologia e espiritualidade: a integração entre o conhecimento intelectual de Deus e a experiência vivida da fé na tradição reformada.',
    conteudo: `# Natureza e Finalidade da Teologia\n\n**Categoria:** Natureza e Finalidade da Teologia · Parte IV\n\n> Conteúdo em redação. Este artigo abordará: a integração entre teologia e espiritualidade na tradição reformada — por que o conhecimento rigoroso de Deus não é oposto à devoção, mas seu fundamento; e como a teologia serve ao culto e à oração.`,
    status: 'rascunho',
  },

  // ── Epistemologia Teológica ─────────────────────────────────────────
  {
    id: '06',
    slug: 'epistemologia-teologica-parte-1',
    categoria: 'Epistemologia Teológica',
    titulo: 'O Conhecimento de Deus e os Fundamentos da Epistemologia Teológica',
    parte: 'Parte I',
    resumo: 'Como é possível conhecer a Deus? Os fundamentos epistemológicos do conhecimento teológico — revelação geral, revelação especial e os limites do conhecimento humano sobre o divino.',
    conteudo: `# O Conhecimento de Deus e os Fundamentos da Epistemologia Teológica\n\n**Categoria:** Epistemologia Teológica · Parte I\n\n> Conteúdo em redação. Este artigo abordará: os fundamentos epistemológicos do conhecimento teológico — como é possível conhecer a Deus, a distinção entre revelação geral e especial, e os limites inerentes ao conhecimento humano sobre o divino. Base: teologia reformada clássica (Calvino, Bavinck).`,
    status: 'rascunho',
  },
  {
    id: '07',
    slug: 'epistemologia-teologica-parte-2',
    categoria: 'Epistemologia Teológica',
    titulo: 'Epistemologia Teológica',
    parte: 'Parte II',
    resumo: 'A questão da objetividade teológica: critérios de verificação, autoridade da Escritura como norma normans e o papel da tradição no processo de conhecimento.',
    conteudo: `# Epistemologia Teológica\n\n**Categoria:** Epistemologia Teológica · Parte II\n\n> Conteúdo em redação. Este artigo abordará: a objetividade do conhecimento teológico — critérios de verificação, a autoridade da Escritura como norma normans non normata, e o papel da tradição confessional no processo de conhecimento teológico.`,
    status: 'rascunho',
  },
  {
    id: '08',
    slug: 'epistemologia-teologica-parte-3',
    categoria: 'Epistemologia Teológica',
    titulo: 'Epistemologia Teológica',
    parte: 'Parte III',
    resumo: 'Fé e entendimento (fides quaerens intellectum): a articulação agostiniana e anselmiana entre crer e compreender como programa da teologia cristã.',
    conteudo: `# Epistemologia Teológica\n\n**Categoria:** Epistemologia Teológica · Parte III\n\n> Conteúdo em redação. Este artigo abordará: a articulação clássica entre fé e entendimento (fides quaerens intellectum) em Agostinho e Anselmo, e sua recepção na tradição reformada — por que cremos para entender, e não entendemos para crer.`,
    status: 'rascunho',
  },

  // ── História da Razão Teológica ─────────────────────────────────────
  {
    id: '09',
    slug: 'nascimento-razao-teologica-parte-1',
    categoria: 'História da Razão Teológica',
    titulo: 'O Nascimento da Razão Teológica',
    parte: 'Parte I',
    resumo: 'As origens do pensamento teológico sistemático: do Novo Testamento aos Padres Apostólicos e à formação da tradição patrística como exercício racional da fé.',
    conteudo: `# O Nascimento da Razão Teológica\n\n**Categoria:** História da Razão Teológica · Parte I\n\n> Conteúdo em redação. Este artigo abordará: as origens do pensamento teológico sistemático — do Novo Testamento aos Padres Apostólicos e ao período patrístico, mostrando como a fé cristã primitiva se articulou racionalmente em diálogo com a filosofia grega e os desafios heréticos.`,
    status: 'rascunho',
  },
  {
    id: '10',
    slug: 'nascimento-razao-teologica-parte-2',
    categoria: 'História da Razão Teológica',
    titulo: 'O Nascimento da Razão Teológica',
    parte: 'Parte II',
    resumo: 'A teologia escolástica medieval: Anselmo, Tomás de Aquino e a síntese entre razão aristotélica e fé cristã no contexto das Universidades.',
    conteudo: `# O Nascimento da Razão Teológica\n\n**Categoria:** História da Razão Teológica · Parte II\n\n> Conteúdo em redação. Este artigo abordará: a teologia escolástica medieval — Anselmo de Cantuária, Pedro Lombardo, Tomás de Aquino e a grande síntese entre razão aristotélica e fé cristã no contexto das primeiras Universidades europeias.`,
    status: 'rascunho',
  },
  {
    id: '11',
    slug: 'nascimento-razao-teologica-parte-3',
    categoria: 'História da Razão Teológica',
    titulo: 'O Nascimento da Razão Teológica',
    parte: 'Parte III',
    resumo: 'A Reforma Protestante e a reconfiguração da razão teológica: Lutero, Calvino e a escolástica reformada como recuperação do método rigoroso sob a sola Scriptura.',
    conteudo: `# O Nascimento da Razão Teológica\n\n**Categoria:** História da Razão Teológica · Parte III\n\n> Conteúdo em redação. Este artigo abordará: a Reforma Protestante e a reconfiguração da razão teológica — Lutero, Calvino, Melanchthon e o desenvolvimento da escolástica reformada nos séculos XVI e XVII como recuperação do rigor metodológico sob o princípio da sola Scriptura.`,
    status: 'rascunho',
  },

  // ── Revelação e Autoridade Bíblica ──────────────────────────────────
  {
    id: '12',
    slug: 'revelacao-escritura-autoridade-parte-1',
    categoria: 'Revelação e Autoridade Bíblica',
    titulo: 'Revelação, Escritura e Autoridade Teológica',
    parte: 'Parte I',
    resumo: 'O conceito de revelação divina: revelação geral e especial, a inspiração verbal da Escritura e a doutrina da inerrância na tradição reformada.',
    conteudo: `# Revelação, Escritura e Autoridade Teológica\n\n**Categoria:** Revelação e Autoridade Bíblica · Parte I\n\n> Conteúdo em redação. Este artigo abordará: o conceito de revelação divina na tradição reformada — a distinção entre revelação geral (criação, consciência) e especial (Escritura, Cristo), a doutrina da inspiração verbal e a inerrância bíblica como fundamento da autoridade teológica.`,
    status: 'rascunho',
  },
  {
    id: '13',
    slug: 'revelacao-escritura-autoridade-parte-2',
    categoria: 'Revelação e Autoridade Bíblica',
    titulo: 'Revelação, Escritura e Autoridade Teológica',
    parte: 'Parte II',
    resumo: 'Cânon, hermenêutica e autoridade: como a Igreja reconheceu o cânon bíblico e os princípios que governam a interpretação legítima da Escritura.',
    conteudo: `# Revelação, Escritura e Autoridade Teológica\n\n**Categoria:** Revelação e Autoridade Bíblica · Parte II\n\n> Conteúdo em redação. Este artigo abordará: a formação do cânon bíblico, os critérios de canonicidade, e os princípios hermenêuticos que governam a interpretação legítima da Escritura — analogia fidei, contexto histórico-gramatical e o papel do Espírito Santo na iluminação do leitor.`,
    status: 'rascunho',
  },
];

export const CATEGORIAS_TEOLOGIA = [
  'Introdução aos Estudos Teológicos',
  'Natureza e Finalidade da Teologia',
  'Epistemologia Teológica',
  'História da Razão Teológica',
  'Revelação e Autoridade Bíblica',
] as const;
