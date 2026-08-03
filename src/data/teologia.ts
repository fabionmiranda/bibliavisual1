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
<!-- HERO -->
<div style="margin-bottom:48px;padding:clamp(28px,5vw,48px) clamp(20px,4vw,40px);border-radius:20px;background:linear-gradient(135deg,rgba(0,212,255,0.10) 0%,rgba(100,60,255,0.12) 100%);border:1px solid rgba(0,212,255,0.28);text-align:center;">
  <div style="font-size:clamp(64px,10vw,88px);margin-bottom:16px;line-height:1;filter:drop-shadow(0 0 24px rgba(0,212,255,0.35));">🎬</div>
  <div style="font-size:clamp(11px,1.6vw,13px);font-weight:900;letter-spacing:0.32em;text-transform:uppercase;color:#00D4FF;margin-bottom:12px;">Introdução aos Estudos Teológicos</div>
  <div style="font-size:clamp(24px,4.5vw,38px);font-weight:900;color:#ffffff;line-height:1.2;margin-bottom:16px;">A Bíblia não é um manual.<br/>É um drama!</div>
  <div style="font-size:clamp(14px,2vw,17px);color:rgba(200,220,255,0.70);font-style:italic;">Kevin J. Vanhoozer · <em>The Drama of Doctrine</em> (2005)</div>
</div>

<!-- CAPA DO LIVRO -->
<div style="display:flex;flex-direction:column;align-items:center;margin:0 0 52px;">
  <div style="position:relative;display:inline-block;">
    <!-- Glow atrás da capa -->
    <div style="position:absolute;inset:-16px;border-radius:24px;background:radial-gradient(ellipse at center,rgba(0,212,255,0.22) 0%,rgba(100,60,255,0.14) 50%,transparent 80%);filter:blur(18px);z-index:0;pointer-events:none;"></div>
    <img
      src="https://covers.openlibrary.org/b/isbn/0664223273-L.jpg"
      alt="Capa do livro The Drama of Doctrine — Kevin J. Vanhoozer"
      onerror="this.onerror=null;this.src='https://www.wjkbooks.com/wp-content/uploads/productimages/0664223273.jpg';"
      style="position:relative;z-index:1;display:block;width:clamp(180px,30vw,260px);border-radius:10px;box-shadow:0 24px 64px rgba(0,0,0,0.70),0 4px 16px rgba(0,212,255,0.20);border:1px solid rgba(255,255,255,0.10);"
    />
  </div>
  <div style="margin-top:20px;text-align:center;">
    <div style="font-size:clamp(14px,1.9vw,16px);font-weight:800;color:#ffffff;margin-bottom:4px;">The Drama of Doctrine</div>
    <div style="font-size:clamp(13px,1.7vw,15px);color:rgba(200,220,255,0.65);margin-bottom:2px;">Kevin J. Vanhoozer</div>
    <div style="font-size:clamp(11px,1.5vw,13px);color:rgba(0,212,255,0.60);font-style:italic;letter-spacing:0.04em;">Westminster John Knox Press · 2005</div>
  </div>
</div>

<!-- SEÇÃO 1 -->
<h2>Abertura: O Problema da Leitura Errada</h2>

<div style="margin:28px 0 24px;padding:clamp(20px,3vw,28px);border-radius:16px;background:rgba(255,70,70,0.07);border:1px solid rgba(255,100,100,0.25);display:flex;gap:clamp(16px,3vw,24px);align-items:flex-start;">
  <div style="flex-shrink:0;font-size:clamp(40px,6vw,56px);line-height:1;filter:drop-shadow(0 0 12px rgba(255,100,100,0.40));">📖</div>
  <div>
    <div style="font-size:clamp(11px,1.5vw,13px);font-weight:900;letter-spacing:0.20em;text-transform:uppercase;color:#FF6B6B;margin-bottom:10px;">O equívoco comum</div>
    <p style="margin:0;font-size:clamp(16px,2.2vw,18px);line-height:1.80;color:#E8F0FF;">Muitos cristãos abrem a Bíblia como quem abre um <strong>manual de instruções</strong> — em busca de regras, receitas e respostas prontas para cada situação da vida. A pergunta que guia essa leitura é: <em>"O que devo fazer?"</em></p>
  </div>
</div>

<p>O problema não é a busca por orientação. O problema é o <strong>gênero literário pressuposto</strong>. Um manual é estático, impessoal, finalizado. A Bíblia é viva, dramática, relacional — e nos convida a algo muito maior do que seguir instruções.</p>

<p>Foi justamente esse deslocamento que Kevin Vanhoozer identificou em seu monumental <em>The Drama of Doctrine</em> (2005). Sua tese central: a teologia cristã só pode ser entendida corretamente quando tratada como <strong>drama</strong> — não como dogma inerte, nem como experiência subjetiva, mas como <em>theodrama</em>: o grande ato divino de redenção no qual somos chamados a participar.</p>

<blockquote>"A teologia é o script de um drama divino. A tarefa do teólogo é ajudar a Igreja a representar bem o seu papel."<br/><strong style="font-size:clamp(13px,1.8vw,15px);color:rgba(255,255,255,0.60);font-style:normal;">— Kevin J. Vanhoozer</strong></blockquote>

<!-- SEÇÃO 2 -->
<h2>Ato I: A Estrutura do Drama</h2>

<p>Todo drama clássico tem elementos constitutivos. O <em>theodrama</em> bíblico também. Vanhoozer os identifica com precisão:</p>

<div class="artigo-grid-auto" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(clamp(140px,22vw,180px),1fr));gap:clamp(12px,2vw,18px);margin:28px 0;">

  <div style="padding:clamp(18px,3vw,24px);border-radius:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.20);text-align:center;">
    <div style="font-size:clamp(38px,5.5vw,52px);margin-bottom:12px;line-height:1;filter:drop-shadow(0 0 10px rgba(0,212,255,0.30));">✍️</div>
    <div style="font-size:clamp(11px,1.5vw,13px);font-weight:900;letter-spacing:0.16em;text-transform:uppercase;color:#00D4FF;margin-bottom:10px;">Autor / Diretor</div>
    <p style="margin:0;font-size:clamp(14px,1.9vw,16px);line-height:1.65;color:#C8DCF5;">Deus Triúno — Pai, Filho e Espírito — que concebe, escreve e dirige o drama da redenção</p>
  </div>

  <div style="padding:clamp(18px,3vw,24px);border-radius:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.20);text-align:center;">
    <div style="font-size:clamp(38px,5.5vw,52px);margin-bottom:12px;line-height:1;filter:drop-shadow(0 0 10px rgba(255,220,80,0.30));">📜</div>
    <div style="font-size:clamp(11px,1.5vw,13px);font-weight:900;letter-spacing:0.16em;text-transform:uppercase;color:#00D4FF;margin-bottom:10px;">Script / Texto</div>
    <p style="margin:0;font-size:clamp(14px,1.9vw,16px);line-height:1.65;color:#C8DCF5;">A Escritura Sagrada: o roteiro inspirado e infalível que define o enredo, os personagens e o desfecho</p>
  </div>

  <div style="padding:clamp(18px,3vw,24px);border-radius:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.20);text-align:center;">
    <div style="font-size:clamp(38px,5.5vw,52px);margin-bottom:12px;line-height:1;filter:drop-shadow(0 0 10px rgba(160,100,255,0.30));">🎭</div>
    <div style="font-size:clamp(11px,1.5vw,13px);font-weight:900;letter-spacing:0.16em;text-transform:uppercase;color:#00D4FF;margin-bottom:10px;">Direção</div>
    <p style="margin:0;font-size:clamp(14px,1.9vw,16px);line-height:1.65;color:#C8DCF5;">O Espírito Santo que ilumina, aplica e capacita a Igreja a representar fielmente o script</p>
  </div>

  <div style="padding:clamp(18px,3vw,24px);border-radius:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.20);text-align:center;">
    <div style="font-size:clamp(38px,5.5vw,52px);margin-bottom:12px;line-height:1;filter:drop-shadow(0 0 10px rgba(80,200,120,0.30));">👥</div>
    <div style="font-size:clamp(11px,1.5vw,13px);font-weight:900;letter-spacing:0.16em;text-transform:uppercase;color:#00D4FF;margin-bottom:10px;">Atores</div>
    <p style="margin:0;font-size:clamp(14px,1.9vw,16px);line-height:1.65;color:#C8DCF5;">O Povo de Deus — a Igreja — chamado a encarnar na história o que o script prescreve</p>
  </div>

  <div style="padding:clamp(18px,3vw,24px);border-radius:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.20);text-align:center;">
    <div style="font-size:clamp(38px,5.5vw,52px);margin-bottom:12px;line-height:1;filter:drop-shadow(0 0 10px rgba(80,160,255,0.30));">🌍</div>
    <div style="font-size:clamp(11px,1.5vw,13px);font-weight:900;letter-spacing:0.16em;text-transform:uppercase;color:#00D4FF;margin-bottom:10px;">Palco</div>
    <p style="margin:0;font-size:clamp(14px,1.9vw,16px);line-height:1.65;color:#C8DCF5;">A criação inteira: o cosmos como teatro da glória divina (<em>theatrum gloriae Dei</em> — Calvino)</p>
  </div>

</div>

<!-- SEÇÃO 3 -->
<h2>Ato II: Os Cinco Atos da Grande Narrativa</h2>

<p>N. T. Wright — numa visão complementar à de Vanhoozer — propõe que a Bíblia é como uma peça de teatro em <strong>cinco atos</strong>. Não uma coleção de versículos soltos, mas uma narrativa coesa com começo, meio e fim:</p>

<div style="margin:32px 0;position:relative;padding-left:clamp(48px,7vw,60px);">
  <div style="position:absolute;left:clamp(20px,3vw,24px);top:0;bottom:0;width:3px;background:linear-gradient(180deg,rgba(0,212,255,0.80) 0%,rgba(120,60,255,0.80) 100%);border-radius:3px;"></div>

  <div style="margin-bottom:clamp(20px,3vw,28px);position:relative;">
    <div style="position:absolute;left:clamp(-40px,-5.5vw,-48px);top:4px;width:clamp(36px,5vw,44px);height:clamp(36px,5vw,44px);border-radius:50%;background:rgba(80,200,120,0.18);border:2px solid rgba(80,200,120,0.60);display:flex;align-items:center;justify-content:center;font-size:clamp(18px,2.8vw,24px);">🌱</div>
    <div style="padding:clamp(16px,2.5vw,22px);border-radius:14px;background:rgba(80,200,120,0.06);border:1px solid rgba(80,200,120,0.20);">
      <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:8px;flex-wrap:wrap;">
        <span style="font-size:clamp(15px,2.2vw,18px);font-weight:900;color:#ffffff;">Ato 1 — Criação</span>
        <span style="font-size:clamp(12px,1.6vw,14px);font-weight:700;color:#4EC880;letter-spacing:0.06em;">Gênesis 1–2</span>
      </div>
      <p style="margin:0;font-size:clamp(15px,2vw,17px);line-height:1.75;color:#D0E8D8;">O Autor apresenta o cenário perfeito. Deus cria com sabedoria e amor. Homem e mulher, imagem de Deus, vivem em <em>shalom</em> pleno.</p>
    </div>
  </div>

  <div style="margin-bottom:clamp(20px,3vw,28px);position:relative;">
    <div style="position:absolute;left:clamp(-40px,-5.5vw,-48px);top:4px;width:clamp(36px,5vw,44px);height:clamp(36px,5vw,44px);border-radius:50%;background:rgba(255,80,80,0.18);border:2px solid rgba(255,80,80,0.60);display:flex;align-items:center;justify-content:center;font-size:clamp(18px,2.8vw,24px);">🌑</div>
    <div style="padding:clamp(16px,2.5vw,22px);border-radius:14px;background:rgba(255,80,80,0.06);border:1px solid rgba(255,80,80,0.20);">
      <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:8px;flex-wrap:wrap;">
        <span style="font-size:clamp(15px,2.2vw,18px);font-weight:900;color:#ffffff;">Ato 2 — Queda</span>
        <span style="font-size:clamp(12px,1.6vw,14px);font-weight:700;color:#FF6B6B;letter-spacing:0.06em;">Gênesis 3–11</span>
      </div>
      <p style="margin:0;font-size:clamp(15px,2vw,17px);line-height:1.75;color:#F0D0D0;">O enredo é perturbado. A rebelião humana introduz morte, vergonha, conflito e separação. O drama ganha sua <strong>tensão central</strong>.</p>
    </div>
  </div>

  <div style="margin-bottom:clamp(20px,3vw,28px);position:relative;">
    <div style="position:absolute;left:clamp(-40px,-5.5vw,-48px);top:4px;width:clamp(36px,5vw,44px);height:clamp(36px,5vw,44px);border-radius:50%;background:rgba(255,200,60,0.18);border:2px solid rgba(255,200,60,0.60);display:flex;align-items:center;justify-content:center;font-size:clamp(18px,2.8vw,24px);">✡️</div>
    <div style="padding:clamp(16px,2.5vw,22px);border-radius:14px;background:rgba(255,200,60,0.06);border:1px solid rgba(255,200,60,0.20);">
      <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:8px;flex-wrap:wrap;">
        <span style="font-size:clamp(15px,2.2vw,18px);font-weight:900;color:#ffffff;">Ato 3 — Israel</span>
        <span style="font-size:clamp(12px,1.6vw,14px);font-weight:700;color:#FFC83C;letter-spacing:0.06em;">Gênesis 12 – Malaquias</span>
      </div>
      <p style="margin:0;font-size:clamp(15px,2vw,17px);line-height:1.75;color:#EEE0C0;">Deus escolhe um povo como veículo de sua solução. A Lei, os profetas, o tabernáculo, os reis — tudo aponta para <strong>além de si mesmo</strong>.</p>
    </div>
  </div>

  <div style="margin-bottom:clamp(20px,3vw,28px);position:relative;">
    <div style="position:absolute;left:clamp(-40px,-5.5vw,-48px);top:4px;width:clamp(36px,5vw,44px);height:clamp(36px,5vw,44px);border-radius:50%;background:rgba(0,212,255,0.20);border:2px solid rgba(0,212,255,0.70);display:flex;align-items:center;justify-content:center;font-size:clamp(18px,2.8vw,24px);">✝️</div>
    <div style="padding:clamp(16px,2.5vw,22px);border-radius:14px;background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.30);">
      <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:8px;flex-wrap:wrap;">
        <span style="font-size:clamp(15px,2.2vw,18px);font-weight:900;color:#ffffff;">Ato 4 — Jesus</span>
        <span style="font-size:clamp(12px,1.6vw,14px);font-weight:700;color:#00D4FF;letter-spacing:0.06em;">Evangelhos e Atos</span>
      </div>
      <p style="margin:0;font-size:clamp(15px,2vw,17px);line-height:1.75;color:#C8E8F8;"><strong>O Clímax.</strong> O Autor entra no palco como personagem. Na encarnação, morte e ressurreição de Cristo, o conflito central é resolvido de forma definitiva.</p>
    </div>
  </div>

  <div style="position:relative;">
    <div style="position:absolute;left:clamp(-40px,-5.5vw,-48px);top:4px;width:clamp(36px,5vw,44px);height:clamp(36px,5vw,44px);border-radius:50%;background:rgba(180,120,255,0.20);border:2px solid rgba(180,120,255,0.65);display:flex;align-items:center;justify-content:center;font-size:clamp(18px,2.8vw,24px);">🌅</div>
    <div style="padding:clamp(16px,2.5vw,22px);border-radius:14px;background:rgba(160,80,255,0.07);border:1px solid rgba(160,80,255,0.25);">
      <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:8px;flex-wrap:wrap;">
        <span style="font-size:clamp(15px,2.2vw,18px);font-weight:900;color:#ffffff;">Ato 5 — Igreja e Nova Criação</span>
        <span style="font-size:clamp(12px,1.6vw,14px);font-weight:700;color:#B46FFF;letter-spacing:0.06em;">Epístolas – Apocalipse</span>
      </div>
      <p style="margin:0;font-size:clamp(15px,2vw,17px);line-height:1.75;color:#DDD0F8;">O ato final ainda está sendo representado. A Igreja é o povo do Ato V — chamado a viver <strong>antecipando o desfecho já revelado</strong>.</p>
    </div>
  </div>
</div>

<!-- SEÇÃO 4 -->
<h2>O Ponto Central: Por Que Isso Muda Tudo</h2>

<div style="margin:28px 0;padding:clamp(22px,3.5vw,32px);border-radius:18px;background:linear-gradient(135deg,rgba(0,212,255,0.10) 0%,rgba(100,60,255,0.10) 100%);border:1px solid rgba(0,212,255,0.28);">
  <div style="font-size:clamp(12px,1.6vw,14px);font-weight:900;letter-spacing:0.20em;text-transform:uppercase;color:#00D4FF;margin-bottom:18px;">🎯 A virada hermenêutica</div>
  <p style="margin:0 0 18px;font-size:clamp(16px,2.2vw,18px);line-height:1.85;color:#E8F0FF;">Quando você trata a Bíblia como manual, a pergunta é: <em>"Qual regra devo aplicar?"</em> Quando você a trata como drama, a pergunta muda para: <em>"Qual personagem devo ser? Como devo agir, fiel ao script, neste momento específico da história?"</em></p>
  <p style="margin:0;font-size:clamp(16px,2.2vw,18px);line-height:1.85;color:#E8F0FF;">Essa diferença não é cosmética. Ela transforma a maneira como lemos a Escritura, como pregamos, como fazemos ética e como entendemos a missão da Igreja.</p>
</div>

<p>Vanhoozer chama essa competência de <strong>sabedoria canônica</strong> (<em>canonical wisdom</em>): a capacidade de ler o script bíblico com inteligência suficiente para improvisar criativamente em situações novas — não inventando um novo enredo, mas sendo fiel ao que foi revelado.</p>

<div class="artigo-grid-2" style="margin:32px 0;display:grid;grid-template-columns:1fr 1fr;gap:clamp(12px,2vw,20px);">
  <div style="padding:clamp(18px,3vw,24px);border-radius:16px;background:rgba(255,70,70,0.07);border:1px solid rgba(255,100,100,0.28);">
    <div style="font-size:clamp(11px,1.5vw,13px);font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:#FF6B6B;margin-bottom:14px;">❌ Leitura manual</div>
    <div style="font-size:clamp(14px,1.9vw,16px);color:#E0CCCC;padding:7px 0;border-bottom:1px solid rgba(255,100,100,0.12);">• Busca regras e receitas</div>
    <div style="font-size:clamp(14px,1.9vw,16px);color:#E0CCCC;padding:7px 0;border-bottom:1px solid rgba(255,100,100,0.12);">• Versículos fora de contexto</div>
    <div style="font-size:clamp(14px,1.9vw,16px);color:#E0CCCC;padding:7px 0;border-bottom:1px solid rgba(255,100,100,0.12);">• Teologia como sistema estático</div>
    <div style="font-size:clamp(14px,1.9vw,16px);color:#E0CCCC;padding:7px 0;border-bottom:1px solid rgba(255,100,100,0.12);">• Fé como conformidade a normas</div>
    <div style="font-size:clamp(14px,1.9vw,16px);color:#E0CCCC;padding:7px 0;">• Leitor como consumidor passivo</div>
  </div>
  <div style="padding:clamp(18px,3vw,24px);border-radius:16px;background:rgba(0,212,255,0.07);border:1px solid rgba(0,212,255,0.28);">
    <div style="font-size:clamp(11px,1.5vw,13px);font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:#00D4FF;margin-bottom:14px;">✓ Leitura dramática</div>
    <div style="font-size:clamp(14px,1.9vw,16px);color:#C8E8FF;padding:7px 0;border-bottom:1px solid rgba(0,212,255,0.12);">• Busca o enredo e o personagem</div>
    <div style="font-size:clamp(14px,1.9vw,16px);color:#C8E8FF;padding:7px 0;border-bottom:1px solid rgba(0,212,255,0.12);">• Narrativa em contexto canônico</div>
    <div style="font-size:clamp(14px,1.9vw,16px);color:#C8E8FF;padding:7px 0;border-bottom:1px solid rgba(0,212,255,0.12);">• Teologia como participação viva</div>
    <div style="font-size:clamp(14px,1.9vw,16px);color:#C8E8FF;padding:7px 0;border-bottom:1px solid rgba(0,212,255,0.12);">• Fé como improvisação fiel</div>
    <div style="font-size:clamp(14px,1.9vw,16px);color:#C8E8FF;padding:7px 0;">• Leitor como ator no palco de Deus</div>
  </div>
</div>

<!-- SEÇÃO 5 -->
<h2>Aplicação: A Igreja como Companhia Teatral</h2>

<p>Se a Bíblia é drama, a Igreja é a companhia teatral que o representa ao mundo. Não uma organização religiosa, não um clube de bem-estar espiritual — mas um grupo de <strong>atores treinados no script</strong>, capacitados pelo Diretor (o Espírito), para representar fielmente o enredo do Reino de Deus.</p>

<div style="margin:28px 0;display:grid;gap:clamp(14px,2vw,20px);">

  <div style="padding:clamp(18px,3vw,24px);border-radius:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.10);display:flex;gap:clamp(16px,2.5vw,20px);align-items:flex-start;">
    <div style="flex-shrink:0;font-size:clamp(32px,4.5vw,44px);line-height:1;filter:drop-shadow(0 0 8px rgba(255,220,80,0.35));">🎓</div>
    <div>
      <div style="font-size:clamp(13px,1.8vw,15px);font-weight:900;color:#ffffff;margin-bottom:6px;">Para o ensino</div>
      <p style="margin:0;font-size:clamp(15px,2vw,17px);line-height:1.75;color:#C8D8F0;">Aprender teologia não é memorizar doutrinas — é ser <strong>formado no script</strong> para agir com sabedoria no palco da vida.</p>
    </div>
  </div>

  <div style="padding:clamp(18px,3vw,24px);border-radius:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.10);display:flex;gap:clamp(16px,2.5vw,20px);align-items:flex-start;">
    <div style="flex-shrink:0;font-size:clamp(32px,4.5vw,44px);line-height:1;filter:drop-shadow(0 0 8px rgba(0,212,255,0.35));">📢</div>
    <div>
      <div style="font-size:clamp(13px,1.8vw,15px);font-weight:900;color:#ffffff;margin-bottom:6px;">Para a pregação</div>
      <p style="margin:0;font-size:clamp(15px,2vw,17px);line-height:1.75;color:#C8D8F0;">Pregar não é aplicar regras morais — é <strong>anunciar o que Deus fez em Cristo</strong> e convocar a audiência a entrar no drama.</p>
    </div>
  </div>

  <div style="padding:clamp(18px,3vw,24px);border-radius:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.10);display:flex;gap:clamp(16px,2.5vw,20px);align-items:flex-start;">
    <div style="flex-shrink:0;font-size:clamp(32px,4.5vw,44px);line-height:1;filter:drop-shadow(0 0 8px rgba(80,200,120,0.35));">🌍</div>
    <div>
      <div style="font-size:clamp(13px,1.8vw,15px);font-weight:900;color:#ffffff;margin-bottom:6px;">Para a missão</div>
      <p style="margin:0;font-size:clamp(15px,2vw,17px);line-height:1.75;color:#C8D8F0;">Evangelizar não é distribuir um manual — é <strong>convidar pessoas a ingressar</strong> na maior história já contada.</p>
    </div>
  </div>

  <div style="padding:clamp(18px,3vw,24px);border-radius:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.10);display:flex;gap:clamp(16px,2.5vw,20px);align-items:flex-start;">
    <div style="flex-shrink:0;font-size:clamp(32px,4.5vw,44px);line-height:1;filter:drop-shadow(0 0 8px rgba(180,120,255,0.35));">⚖️</div>
    <div>
      <div style="font-size:clamp(13px,1.8vw,15px);font-weight:900;color:#ffffff;margin-bottom:6px;">Para a ética</div>
      <p style="margin:0;font-size:clamp(15px,2vw,17px);line-height:1.75;color:#C8D8F0;">Tomar decisões morais não é consultar um índice de regras — é perguntar: <em>"O que um fiel ator do Ato V faria aqui?"</em></p>
    </div>
  </div>

</div>

<!-- ENCERRAMENTO -->
<h2>Encerramento: Você Está no Palco</h2>

<div style="margin:32px 0;padding:clamp(28px,4.5vw,44px) clamp(20px,4vw,36px);border-radius:20px;background:linear-gradient(135deg,rgba(100,60,255,0.14) 0%,rgba(0,212,255,0.14) 100%);border:1px solid rgba(0,212,255,0.30);text-align:center;">
  <div style="font-size:clamp(52px,8vw,72px);margin-bottom:18px;line-height:1;filter:drop-shadow(0 0 20px rgba(0,212,255,0.40));">🎭</div>
  <p style="font-size:clamp(17px,2.6vw,22px);font-weight:700;color:#ffffff;line-height:1.65;margin:0 0 22px;font-style:italic;">"A Escritura é o script do maior drama já concebido.<br/>Cristo é o Ato central. O Espírito é o Diretor.<br/>E você — <span style="color:#00D4FF;">você está no palco.</span>"</p>
  <div style="width:60px;height:3px;background:rgba(0,212,255,0.70);border-radius:3px;margin:0 auto 22px;"></div>
  <p style="font-size:clamp(15px,2vw,17px);color:rgba(200,220,255,0.80);line-height:1.80;margin:0;">A próxima vez que você abrir sua Bíblia, não a abra como um manual.<br/>Abra-a como um ator que precisa conhecer o script para <strong style="color:#ffffff;">representar bem o papel que Deus lhe deu.</strong></p>
</div>

<!-- REFERÊNCIAS -->
<div style="margin-top:44px;padding:clamp(20px,3vw,28px);border-radius:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.09);">
  <div style="font-size:clamp(11px,1.5vw,13px);font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(200,220,255,0.50);margin-bottom:16px;">Para aprofundar</div>
  <div style="display:flex;flex-direction:column;gap:clamp(10px,1.5vw,14px);">
    <div style="font-size:clamp(14px,1.9vw,16px);color:#C8D8F0;display:flex;gap:12px;align-items:baseline;"><span style="font-size:clamp(18px,2.5vw,22px);">📗</span><span><strong style="color:#ffffff;">Kevin J. Vanhoozer</strong> — <em>The Drama of Doctrine</em> (Westminster John Knox Press, 2005)</span></div>
    <div style="font-size:clamp(14px,1.9vw,16px);color:#C8D8F0;display:flex;gap:12px;align-items:baseline;"><span style="font-size:clamp(18px,2.5vw,22px);">📘</span><span><strong style="color:#ffffff;">N. T. Wright</strong> — <em>Scripture and the Authority of God</em> (HarperOne, 2011)</span></div>
    <div style="font-size:clamp(14px,1.9vw,16px);color:#C8D8F0;display:flex;gap:12px;align-items:baseline;"><span style="font-size:clamp(18px,2.5vw,22px);">📙</span><span><strong style="color:#ffffff;">João Calvino</strong> — <em>Institutas da Religião Cristã</em>, I.6 (a criação como teatro da glória divina)</span></div>
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
