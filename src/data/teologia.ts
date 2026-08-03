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
  // ── Artigo Publicado ───────────────────────────────────────────────
  {
    id: '14',
    slug: 'drama-da-doutrina',
    categoria: 'Introdução aos Estudos Teológicos',
    titulo: 'A Bíblia não é um manual. É um drama!',
    resumo: 'A teologia como participação em um drama divino — da proposta de Kevin Vanhoozer à redescoberta da Bíblia como grande narrativa redentora em que somos chamados a agir.',
    conteudo: `
<div style="margin-bottom:40px;padding:32px 28px;border-radius:18px;background:linear-gradient(135deg,rgba(0,212,255,0.07) 0%,rgba(100,60,255,0.07) 100%);border:1px solid rgba(0,212,255,0.18);text-align:center;">
  <div style="font-size:56px;margin-bottom:12px;line-height:1;">🎬</div>
  <div style="font-size:11px;font-weight:900;letter-spacing:0.30em;text-transform:uppercase;color:rgba(0,212,255,0.70);margin-bottom:10px;">Introdução aos Estudos Teológicos</div>
  <div style="font-size:clamp(22px,4vw,32px);font-weight:900;color:#fff;line-height:1.2;margin-bottom:14px;">A Bíblia não é um manual.<br/>É um drama!</div>
  <div style="font-size:14px;color:rgba(255,255,255,0.45);font-style:italic;">Kevin J. Vanhoozer · <em>The Drama of Doctrine</em></div>
</div>

<h2>Abertura: O Problema da Leitura Errada</h2>

<div style="margin:24px 0;padding:24px 24px 24px 20px;border-radius:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);display:flex;gap:20px;align-items:flex-start;">
  <div style="flex-shrink:0;width:48px;height:48px;border-radius:12px;background:rgba(255,80,80,0.12);border:1px solid rgba(255,80,80,0.30);display:flex;align-items:center;justify-content:center;font-size:22px;">📖</div>
  <div>
    <div style="font-size:12px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,80,80,0.80);margin-bottom:8px;">O equívoco comum</div>
    <p style="margin:0;font-size:15px;line-height:1.75;color:rgba(215,225,245,0.85);">Muitos cristãos abrem a Bíblia como quem abre um <strong>manual de instruções</strong> — em busca de regras, receitas e respostas prontas para cada situação da vida. A pergunta que guia essa leitura é: <em>"O que devo fazer?"</em></p>
  </div>
</div>

<p>O problema não é a busca por orientação. O problema é o gênero literário pressuposto. Um manual é estático, impessoal, finalizado. A Bíblia é viva, dramática, relacional — e nos convida a algo muito maior do que seguir instruções.</p>

<p>Foi justamente esse deslocamento que Kevin Vanhoozer identificou em seu monumental <em>The Drama of Doctrine</em> (2005). Sua tese central: a teologia cristã só pode ser entendida corretamente quando tratada como <strong>drama</strong> — não como dogma inerte, nem como experiência subjetiva, mas como <em>theodrama</em>: o grande ato divino de redenção no qual somos chamados a participar.</p>

<div style="margin:32px 0;padding:0 0 0 20px;border-left:4px solid rgba(0,212,255,0.60);background:rgba(0,212,255,0.04);border-radius:0 12px 12px 0;padding:16px 20px;">
  <p style="margin:0;font-size:16px;font-style:italic;color:rgba(0,212,255,0.90);line-height:1.75;">"A teologia é o script de um drama divino. A tarefa do teólogo é ajudar a Igreja a representar bem o seu papel."</p>
  <div style="margin-top:10px;font-size:12px;color:rgba(255,255,255,0.40);font-weight:700;">— Kevin J. Vanhoozer</div>
</div>

<h2>Ato I: A Estrutura do Drama</h2>

<p>Todo drama clássico tem elementos constitutivos. O <em>theodrama</em> bíblico também. Vanhoozer os identifica com precisão:</p>

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin:28px 0;">
  ${['Autor / Diretor', 'Script / Texto', 'Direção', 'Atores', 'Palco'].map((item, i) => {
    const icons = ['✍️', '📜', '🎭', '👥', '🌍'];
    const descs = [
      'Deus Triúno — Pai, Filho e Espírito Santo — que concebe, escreve e dirige o drama da redenção',
      'A Escritura Sagrada: o roteiro inspirado e infalível que define o enredo, os personagens e o desfecho',
      'O Espírito Santo que ilumina, aplica e capacita a Igreja a representar fielmente o script',
      'O Povo de Deus — a Igreja — chamado a encarnar na história o que o script prescreve',
      'A criação inteira: o cosmos como teatro da glória divina (Calvino: <em>theatrum gloriae Dei</em>)',
    ];
    return `<div style="padding:20px;border-radius:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);">
      <div style="font-size:24px;margin-bottom:10px;">${icons[i]}</div>
      <div style="font-size:11px;font-weight:900;letter-spacing:0.16em;text-transform:uppercase;color:rgba(0,212,255,0.75);margin-bottom:8px;">${item}</div>
      <p style="margin:0;font-size:13px;line-height:1.65;color:rgba(200,215,240,0.70);">${descs[i]}</p>
    </div>`;
  }).join('')}
</div>

<h2>Ato II: Os Cinco Atos da Grande Narrativa</h2>

<p>N. T. Wright — numa visão complementar à de Vanhoozer — propõe que a Bíblia é como uma peça de teatro em <strong>cinco atos</strong>. Não uma coleção de versículos soltos, mas uma narrativa coesa com começo, meio e fim:</p>

<div style="margin:28px 0;position:relative;">
  <div style="position:absolute;left:23px;top:0;bottom:0;width:2px;background:linear-gradient(180deg,rgba(0,212,255,0.50) 0%,rgba(100,60,255,0.50) 100%);border-radius:2px;"></div>
  ${[
    ['Criação', 'Gênesis 1–2', 'O Autor apresenta o cenário perfeito. Deus cria com sabedoria e amor. Homem e mulher, imagem de Deus, vivem em shalom.', '🌱'],
    ['Queda', 'Gênesis 3–11', 'O enredo é perturbado. A rebelião humana introduz morte, vergonha, conflito e separação. O drama ganha sua tensão central.', '🌑'],
    ['Israel', 'Gênesis 12 – Malaquias', 'Deus escolhe um povo como veículo de sua solução. A Lei, os profetas, o tabernáculo, os reis — tudo aponta para além de si mesmo.', '✡️'],
    ['Jesus', 'Evangelhos e Atos', 'O Clímax. O Autor entra no palco como personagem. Na encarnação, morte e ressurreição de Cristo, o conflito central é resolvido.', '✝️'],
    ['Igreja e Nova Criação', 'Epístolas – Apocalipse', 'O ato final ainda está sendo representado. A Igreja é o povo do Ato V — chamado a viver antecipando o desfecho já revelado.', '🌅'],
  ].map(([titulo, ref, desc, icon]) => `
    <div style="display:flex;gap:20px;margin-bottom:24px;padding-left:8px;">
      <div style="flex-shrink:0;width:32px;height:32px;border-radius:50%;background:rgba(0,212,255,0.15);border:2px solid rgba(0,212,255,0.40);display:flex;align-items:center;justify-content:center;font-size:14px;position:relative;z-index:1;">${icon}</div>
      <div style="padding:16px 20px;border-radius:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);flex:1;">
        <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:8px;flex-wrap:wrap;">
          <span style="font-size:13px;font-weight:900;color:#fff;">${titulo}</span>
          <span style="font-size:11px;font-weight:700;color:rgba(0,212,255,0.65);letter-spacing:0.08em;">${ref}</span>
        </div>
        <p style="margin:0;font-size:14px;line-height:1.7;color:rgba(200,215,240,0.70);">${desc}</p>
      </div>
    </div>
  `).join('')}
</div>

<h2>O Ponto Central: Por Que Isso Muda Tudo</h2>

<div style="margin:28px 0;padding:28px;border-radius:16px;background:linear-gradient(135deg,rgba(0,212,255,0.08) 0%,rgba(100,60,255,0.08) 100%);border:1px solid rgba(0,212,255,0.20);">
  <div style="font-size:13px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:rgba(0,212,255,0.80);margin-bottom:16px;">🎯 A virada hermenêutica</div>
  <p style="margin:0 0 16px;font-size:15px;line-height:1.8;color:rgba(215,225,245,0.90);">Quando você trata a Bíblia como manual, a pergunta é: <em>"Qual regra devo aplicar?"</em> Quando você a trata como drama, a pergunta muda para: <em>"Qual personagem devo ser? Como devo agir, fiel ao script, neste momento específico da história?"</em></p>
  <p style="margin:0;font-size:15px;line-height:1.8;color:rgba(215,225,245,0.90);">Essa diferença não é cosmética. Ela transforma a maneira como lemos a Escritura, como pregamos, como fazemos ética, como entendemos a missão da Igreja.</p>
</div>

<p>Vanhoozer chama essa competência de <strong>sabedoria canônica</strong> (<em>canonical wisdom</em>): a capacidade de ler o script bíblico com inteligência suficiente para improvisar criativamente em situações novas — não inventando um novo enredo, mas sendo fiel ao que foi revelado.</p>

<div style="margin:32px 0;display:grid;grid-template-columns:1fr 1fr;gap:16px;">
  <div style="padding:20px;border-radius:14px;background:rgba(255,80,80,0.06);border:1px solid rgba(255,80,80,0.20);">
    <div style="font-size:11px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,80,80,0.75);margin-bottom:12px;">❌ Leitura manual</div>
    ${['Busca regras e receitas', 'Versículos fora de contexto', 'Teologia como sistema estático', 'Fé como conformidade a normas', 'Leitor como consumidor passivo'].map(t => `<div style="font-size:13px;color:rgba(200,210,230,0.65);padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.05);">• ${t}</div>`).join('')}
  </div>
  <div style="padding:20px;border-radius:14px;background:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.20);">
    <div style="font-size:11px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:rgba(0,212,255,0.75);margin-bottom:12px;">✓ Leitura dramática</div>
    ${['Busca o enredo e o personagem', 'Narrativa em seu contexto canônico', 'Teologia como participação viva', 'Fé como improvisação fiel', 'Leitor como ator no palco de Deus'].map(t => `<div style="font-size:13px;color:rgba(200,210,230,0.65);padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.05);">• ${t}</div>`).join('')}
  </div>
</div>

<h2>Aplicação: A Igreja como Companhia Teatral</h2>

<p>Se a Bíblia é drama, a Igreja é a companhia teatral que o representa ao mundo. Não uma organização religiosa, não um clube de bem-estar espiritual — mas um grupo de atores treinados no script, capacitados pelo Diretor (o Espírito), para representar fielmente o enredo do Reino de Deus.</p>

<div style="margin:28px 0;padding:24px;border-radius:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);">
  <div style="font-size:12px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.40);margin-bottom:16px;">Implicações práticas</div>
  <div style="display:grid;gap:14px;">
    ${[
      ['🎓 Para o ensino', 'Aprender teologia não é memorizar doutrinas — é ser formado no script para agir com sabedoria no palco da vida.'],
      ['📢 Para a pregação', 'Pregar não é aplicar regras morais — é anunciar o que Deus fez em Cristo e convocar a audiência a entrar no drama.'],
      ['🌍 Para a missão', 'Evangelizar não é distribuir um manual — é convidar pessoas a ingressar na maior história já contada.'],
      ['🏠 Para a ética', 'Tomar decisões morais não é consultar um índice de regras — é perguntar: "O que um fiel ator do Ato V faria aqui?"'],
    ].map(([label, desc]) => `
      <div style="display:flex;gap:14px;align-items:flex-start;">
        <div style="font-size:18px;flex-shrink:0;margin-top:2px;">${label.split(' ')[0]}</div>
        <div>
          <div style="font-size:12px;font-weight:900;color:rgba(255,255,255,0.70);margin-bottom:4px;">${label.slice(3)}</div>
          <p style="margin:0;font-size:14px;line-height:1.65;color:rgba(200,215,240,0.65);">${desc}</p>
        </div>
      </div>
    `).join('')}
  </div>
</div>

<h2>Encerramento: Você Está no Palco</h2>

<div style="margin:32px 0;padding:32px 28px;border-radius:18px;background:linear-gradient(135deg,rgba(100,60,255,0.10) 0%,rgba(0,212,255,0.10) 100%);border:1px solid rgba(0,212,255,0.20);text-align:center;">
  <div style="font-size:36px;margin-bottom:16px;">🎭</div>
  <p style="font-size:clamp(16px,2.5vw,19px);font-weight:700;color:rgba(255,255,255,0.90);line-height:1.6;margin:0 0 20px;font-style:italic;">"A Escritura é o script do maior drama já concebido.<br/>Cristo é o Ato central. O Espírito é o Diretor.<br/>E você — você está no palco."</p>
  <div style="width:48px;height:2px;background:rgba(0,212,255,0.50);border-radius:2px;margin:0 auto 20px;"></div>
  <p style="font-size:14px;color:rgba(255,255,255,0.45);line-height:1.7;margin:0;">A próxima vez que você abrir sua Bíblia, não a abra como um manual.<br/>Abra-a como um ator que precisa conhecer o script para representar bem o papel que Deus lhe deu.</p>
</div>

<div style="margin-top:40px;padding:20px 24px;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);">
  <div style="font-size:10px;font-weight:900;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.30);margin-bottom:12px;">Para aprofundar</div>
  <div style="display:flex;flex-direction:column;gap:8px;">
    <div style="font-size:13px;color:rgba(200,215,240,0.60);">📗 <strong style="color:rgba(255,255,255,0.75);">Kevin J. Vanhoozer</strong> — <em>The Drama of Doctrine</em> (Westminster John Knox Press, 2005)</div>
    <div style="font-size:13px;color:rgba(200,215,240,0.60);">📘 <strong style="color:rgba(255,255,255,0.75);">N. T. Wright</strong> — <em>Scripture and the Authority of God</em> (HarperOne, 2011)</div>
    <div style="font-size:13px;color:rgba(200,215,240,0.60);">📙 <strong style="color:rgba(255,255,255,0.75);">Calvino</strong> — <em>Institutas da Religião Cristã</em>, I.6 (a criação como teatro da glória divina)</div>
  </div>
</div>
`,
    status: 'publicado',
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
