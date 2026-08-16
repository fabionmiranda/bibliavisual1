export type ArtigoTeologia = {
  id: string;
  slug: string;
  categoria: string;
  titulo: string;
  parte?: string;
  resumo: string;
  conteudo: string;
  status: 'publicado' | 'rascunho';
  area?: 'artigos';
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
  // ── Artigo Publicado — Vanhoozer Hermenêutica ──────────────────────
  {
    id: '15',
    slug: 'quem-decide-o-significado-da-biblia',
    categoria: 'Hermenêutica e Epistemologia Teológica',
    titulo: 'Quem Decide o Que a Bíblia Significa?',
    parte: 'A Crise da Interpretação e a Resposta de Vanhoozer',
    resumo: 'Se o autor morreu, Deus também morreu. A crise hermenêutica do século XX é uma crise teológica — e Vanhoozer propõe a saída mais consistente: o significado bíblico ancorado no ato comunicativo do autor, regulado pela unidade do cânon como discurso divino.',
    status: 'publicado',
    area: 'artigos',
    conteudo: `
<!-- HERO -->
<div style="margin-bottom:52px;padding:clamp(32px,5vw,52px) clamp(20px,4vw,44px);border-radius:20px;background:linear-gradient(135deg,rgba(0,212,255,0.10) 0%,rgba(120,40,255,0.14) 100%);border:1px solid rgba(0,212,255,0.25);text-align:center;">
  <div style="font-size:clamp(64px,10vw,96px);margin-bottom:16px;line-height:1;filter:drop-shadow(0 0 28px rgba(0,212,255,0.40));">📖</div>
  <div style="font-size:clamp(11px,1.5vw,12px);font-weight:900;letter-spacing:0.34em;text-transform:uppercase;color:#00D4FF;margin-bottom:14px;opacity:0.85;">Hermenêutica · Epistemologia Teológica</div>
  <div style="font-size:clamp(26px,5vw,44px);font-weight:900;color:#ffffff;line-height:1.15;margin-bottom:14px;">Quem Decide o Que<br/>a Bíblia Significa?</div>
  <div style="font-size:clamp(14px,2vw,18px);color:rgba(200,220,255,0.65);font-style:italic;line-height:1.6;">A Crise da Interpretação e a Resposta de Kevin J. Vanhoozer</div>
  <div style="margin-top:20px;display:inline-flex;gap:10px;flex-wrap:wrap;justify-content:center;">
    <span style="font-size:11px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:rgba(0,212,255,0.80);background:rgba(0,212,255,0.10);border:1px solid rgba(0,212,255,0.25);padding:4px 14px;border-radius:99px;">Vanhoozer</span>
    <span style="font-size:11px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:rgba(200,160,255,0.80);background:rgba(160,80,255,0.10);border:1px solid rgba(160,80,255,0.25);padding:4px 14px;border-radius:99px;">Thiselton</span>
    <span style="font-size:11px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,180,100,0.80);background:rgba(255,140,60,0.10);border:1px solid rgba(255,140,60,0.25);padding:4px 14px;border-radius:99px;">Ricoeur</span>
    <span style="font-size:11px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:rgba(100,255,160,0.80);background:rgba(60,200,100,0.10);border:1px solid rgba(60,200,100,0.25);padding:4px 14px;border-radius:99px;">Webster</span>
  </div>
</div>

<!-- RESUMO EXECUTIVO -->
<blockquote>
Se o significado bíblico não pode ser ancorado em nada além do jogo infinito dos signos ou da vontade interpretativa do leitor, a própria noção de revelação — de que Deus comunica algo determinado através de autores humanos — perde sua base e torna-se inconsistente.
</blockquote>

<!-- ════════════════════════════════════════════════════ -->
<h2>⚠️ 1. O Problema: a Morte do Autor é a Morte de Deus</h2>

<p>A hermenêutica contemporânea vive, desde meados do século XX, uma crise de confiança quanto à possibilidade de fixar o significado de um texto. O chamado <strong>giro linguístico</strong> deslocou o eixo da reflexão filosófica da consciência para a linguagem — e a crítica pós-estruturalista levou esse deslocamento às últimas consequências.<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">¹</sup></p>

<p>Jacques Derrida questionou a possibilidade de qualquer centro estável de significação. Roland Barthes declarou "a morte do autor". Michel Foucault transformou o autor em mera "função discursiva". O resultado: <strong>sem o autor como âncora, o significado passa a ser aquilo que o leitor, ou a comunidade de leitores, decide fazer dele.<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">²</sup></strong></p>

<!-- CITAÇÃO ORIGINAL — BARTHES -->
<div style="margin:32px 0;border-radius:14px;background:rgba(255,80,80,0.06);border:1px solid rgba(255,100,100,0.22);overflow:hidden;">
  <div style="padding:10px 20px;background:rgba(255,80,80,0.10);border-bottom:1px solid rgba(255,100,100,0.18);display:flex;align-items:center;gap:10px;">
    <span style="font-size:18px;">📄</span>
    <span style="font-size:10px;font-weight:900;letter-spacing:0.26em;text-transform:uppercase;color:rgba(255,130,130,0.90);">Texto Original · Inglês</span>
    <span style="margin-left:auto;font-size:10px;color:rgba(255,130,130,0.55);font-weight:700;">Roland Barthes · "The Death of the Author" (1967)</span>
  </div>
  <div style="padding:clamp(16px,3vw,24px);">
    <p style="font-size:clamp(15px,2vw,17px);color:rgba(255,210,210,0.92);font-style:italic;line-height:1.85;margin:0 0 12px;">"To give a text an Author is to impose a limit on that text, to furnish it with a final signified, to close the writing. Such a conception suits criticism very well, the latter then allotting itself the important task of discovering the Author... beneath the work: when the Author has been found, the text is 'explained' — victory to the critic."</p>
    <p style="font-size:13px;color:rgba(255,160,160,0.60);margin:0;font-weight:700;letter-spacing:0.04em;">— BARTHES, Roland. "The Death of the Author." In: <em>Image, Music, Text.</em> Transl. Stephen Heath. New York: Hill and Wang, 1977. p. 147.</p>
  </div>
</div>

<p>Esse deslocamento não é apenas literário — é <em>teologicamente decisivo</em>. Vanhoozer trata a "morte do autor" não como constatação filosófica neutra, mas como um "slogan ideológico"<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">³</sup> intimamente ligado à morte de Deus: ambas dependem da mesma crítica ao sujeito estável. Se não há sujeito capaz de fixar sentido por um ato comunicativo intencional, também não há Deus capaz de comunicar, por meio das Escrituras, conhecimento determinado de si mesmo.<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">⁴</sup></p>

<!-- CITAÇÃO ORIGINAL — VANHOOZER sobre Barthes/morte do autor -->
<div style="margin:32px 0;border-radius:14px;background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.20);overflow:hidden;">
  <div style="padding:10px 20px;background:rgba(0,212,255,0.08);border-bottom:1px solid rgba(0,212,255,0.15);display:flex;align-items:center;gap:10px;">
    <span style="font-size:18px;">🔬</span>
    <span style="font-size:10px;font-weight:900;letter-spacing:0.26em;text-transform:uppercase;color:rgba(0,212,255,0.90);">Texto Original · Inglês</span>
    <span style="margin-left:auto;font-size:10px;color:rgba(0,212,255,0.55);font-weight:700;">Vanhoozer · <em>Is There a Meaning in This Text?</em> p. 48</span>
  </div>
  <div style="padding:clamp(16px,3vw,24px);">
    <p style="font-size:clamp(15px,2vw,17px);color:rgba(200,235,255,0.92);font-style:italic;line-height:1.85;margin:0 0 12px;">"The 'death of the author' is more than a literary slogan; it is an ideological manifesto... If the author is dead, the text is an orphan and interpretation becomes an exercise in literary adoption — readers take texts home and make them their own. The theological consequences are severe: if God is an author — indeed, if God is the author of authors — then the death of the author is the death of God."</p>
    <p style="font-size:13px;color:rgba(0,212,255,0.55);margin:0;font-weight:700;letter-spacing:0.04em;">— VANHOOZER, Kevin J. <em>Is There a Meaning in This Text? The Bible, the Reader, and the Morality of Literary Knowledge.</em> Grand Rapids: Zondervan, 1998. p. 48.</p>
  </div>
</div>

<!-- BOX: As 3 posições em conflito -->
<div style="margin:36px 0;border-radius:16px;border:1px solid rgba(255,255,255,0.10);overflow:hidden;">
  <div style="padding:14px 24px;background:rgba(0,212,255,0.08);border-bottom:1px solid rgba(0,212,255,0.15);display:flex;align-items:center;gap:10px;">
    <span style="font-size:18px;">⚖️</span>
    <div style="font-size:11px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:#00D4FF;">As Três Posições em Conflito</div>
  </div>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;">
    <div style="display:flex;gap:14px;align-items:flex-start;">
      <div style="min-width:32px;height:32px;border-radius:8px;background:rgba(0,212,255,0.15);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:#00D4FF;flex-shrink:0;">1</div>
      <div><strong style="color:#fff;">Autoritarismo autoral (Hirsch)</strong><br/><span style="color:rgba(220,232,255,0.75);font-size:15px;">O significado é fixado exclusivamente pela intenção psicológica do autor — tarefa arqueológica de recuperar o que se passou na mente de Paulo ou Moisés.</span></div>
    </div>
    <div style="display:flex;gap:14px;align-items:flex-start;">
      <div style="min-width:32px;height:32px;border-radius:8px;background:rgba(200,100,255,0.15);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:#C87EFF;flex-shrink:0;">2</div>
      <div><strong style="color:#fff;">Relativismo do leitor (Fish)</strong><br/><span style="color:rgba(220,232,255,0.75);font-size:15px;">Os leitores "não respondem ao significado textual — eles o constroem". A Escritura não oferece resistência ao intérprete: não há erro de leitura possível.<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">⁵</sup></span></div>
    </div>
    <div style="display:flex;gap:14px;align-items:flex-start;">
      <div style="min-width:32px;height:32px;border-radius:8px;background:rgba(255,160,60,0.15);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:#FFA040;flex-shrink:0;">3</div>
      <div><strong style="color:#fff;">Captura comunitária (Lindbeck)</strong><br/><span style="color:rgba(220,232,255,0.75);font-size:15px;">"A doutrina não dirige a comunidade, mas é dirigida por ela." A Escritura vira espelho das convicções eclesiais — incapaz de corrigir a própria comunidade que a lê.<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">⁶</sup></span></div>
    </div>
  </div>
</div>

<p>É precisamente para escapar dessas três consequências — o positivismo arqueológico, o relativismo da recepção e a captura eclesial do texto — que Vanhoozer propõe sua <strong>quarta via</strong>.</p>

<!-- ════════════════════════════════════════════════════ -->
<h2>🔑 2. A Solução de Vanhoozer: Atos de Fala e Cânon</h2>

<h3>2.1 A Teoria dos Atos de Fala Aplicada à Escritura</h3>

<p>Vanhoozer apropria-se da filosofia da linguagem ordinária de Austin e Searle: falar não é apenas emitir sons com sentido — é realizar uma <em>ação</em> ao falar. Todo ato comunicativo tem três dimensões:</p>

<!-- GRID ATOS DE FALA -->
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,220px),1fr));gap:16px;margin:24px 0 32px;" class="artigo-grid-auto">
  <div style="padding:20px;border-radius:14px;background:rgba(0,212,255,0.07);border:1px solid rgba(0,212,255,0.20);">
    <div style="font-size:22px;margin-bottom:8px;">🗣️</div>
    <div style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:#00D4FF;margin-bottom:8px;">Locucionário</div>
    <div style="font-size:15px;color:rgba(220,232,255,0.85);line-height:1.6;">O ato de <strong style="color:#fff;">proferir palavras</strong> com sentido — o que é dito.</div>
  </div>
  <div style="padding:20px;border-radius:14px;background:rgba(100,255,160,0.07);border:1px solid rgba(60,200,100,0.20);">
    <div style="font-size:22px;margin-bottom:8px;">✅</div>
    <div style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:#4ade80;margin-bottom:8px;">Ilocucionário — o significado</div>
    <div style="font-size:15px;color:rgba(220,232,255,0.85);line-height:1.6;"><strong style="color:#fff;">O que fazemos ao dizer:</strong> afirmar, prometer, advertir, narrar. Aqui está o significado — intrínseco ao ato.</div>
  </div>
  <div style="padding:20px;border-radius:14px;background:rgba(255,160,60,0.07);border:1px solid rgba(255,140,60,0.20);">
    <div style="font-size:22px;margin-bottom:8px;">🎯</div>
    <div style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:#fb923c;margin-bottom:8px;">Perlocucionário</div>
    <div style="font-size:15px;color:rgba(220,232,255,0.85);line-height:1.6;">O <strong style="color:#fff;">efeito produzido</strong> no ouvinte — não intrínseco ao ato, por isso varia de leitor para leitor.</div>
  </div>
</div>

<!-- CITAÇÃO ORIGINAL — VANHOOZER sobre ilocução -->
<div style="margin:8px 0 36px;border-radius:14px;background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.20);overflow:hidden;">
  <div style="padding:10px 20px;background:rgba(0,212,255,0.08);border-bottom:1px solid rgba(0,212,255,0.15);display:flex;align-items:center;gap:10px;">
    <span style="font-size:18px;">🔬</span>
    <span style="font-size:10px;font-weight:900;letter-spacing:0.26em;text-transform:uppercase;color:rgba(0,212,255,0.90);">Texto Original · Inglês</span>
    <span style="margin-left:auto;font-size:10px;color:rgba(0,212,255,0.55);font-weight:700;">Vanhoozer · <em>Is There a Meaning in This Text?</em> p. 209</span>
  </div>
  <div style="padding:clamp(16px,3vw,24px);">
    <p style="font-size:clamp(15px,2vw,17px);color:rgba(200,235,255,0.92);font-style:italic;line-height:1.85;margin:0 0 12px;">"Meaning is a matter of what authors do with words — specifically, illocutionary acts. The text's meaning is not hidden behind the words, nor projected onto them by the reader, but is enacted through them. To understand a text is to grasp what the author was doing in writing it — the kind of act being performed."</p>
    <p style="font-size:13px;color:rgba(0,212,255,0.55);margin:0;font-weight:700;letter-spacing:0.04em;">— VANHOOZER, Kevin J. <em>Is There a Meaning in This Text?</em> Grand Rapids: Zondervan, 1998. p. 209.</p>
  </div>
</div>

<p>A chave da proposta vanhooziana é esta: o significado está na dimensão <strong>ilocucionária</strong> — aquilo que o autor <em>faz</em> ao escrever. A intenção não é "estado mental oculto" inacessível, mas a <em>direcionalidade comunicativa do próprio texto</em>.<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">⁷</sup> Como resultado, o significado é estável — mesmo quando os efeitos da leitura variam — porque está ancorado no ato, não na psicologia do autor.<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">⁸</sup></p>

<p>Aplicada à Escritura: os autores bíblicos são agentes comunicativos genuínos, mesmo sob inspiração divina. Deus não anula a agência humana — <em>a usa</em>. As palavras (locuções) são de Deus e os atos de fala (ilocuções) são, em última instância, de Deus também.<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">⁹</sup> O Evangelho de João, por exemplo, narra (ilocução) para que o leitor creia (perlocução, Jo 20.31) — e isso não compromete, mas revela a intencionalidade comunicativa de Deus.<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">¹⁰</sup></p>

<h3>2.2 O Cânon como Discurso Autoral Divino</h3>

<p>Em <em>The Drama of Doctrine</em>, essa hermenêutica dos atos de fala se amplia numa <strong>hermenêutica canônica</strong>. Vanhoozer distingue dois modos de "performance" interpretativa:</p>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0 32px;" class="artigo-grid-2">
  <div style="padding:22px;border-radius:14px;background:rgba(255,80,80,0.07);border:1px solid rgba(255,80,80,0.22);">
    <div style="font-size:22px;margin-bottom:10px;">❌</div>
    <div style="font-size:10px;font-weight:900;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,120,120,0.90);margin-bottom:10px;">Performance II — leitores como autores</div>
    <p style="font-size:15px;color:rgba(220,232,255,0.80);line-height:1.65;margin:0;">A comunidade <em>autora e dirige</em> o sentido do texto. Posição de Lindbeck e Fish: os leitores constroem o significado — as performances são menos interpretações do que criações.</p>
  </div>
  <div style="padding:22px;border-radius:14px;background:rgba(60,200,100,0.07);border:1px solid rgba(60,200,100,0.22);">
    <div style="font-size:22px;margin-bottom:10px;">✅</div>
    <div style="font-size:10px;font-weight:900;letter-spacing:0.22em;text-transform:uppercase;color:#4ade80;margin-bottom:10px;">Performance I — leitores como atores</div>
    <p style="font-size:15px;color:rgba(220,232,255,0.80);line-height:1.65;margin:0;">O sentido é determinado pelo <em>discurso autoral canônico</em>. A comunidade <strong>responde e encena</strong> — não autora — a palavra e a vontade de outro.</p>
  </div>
</div>

<!-- CITAÇÃO ORIGINAL — VANHOOZER sobre cânon como roteiro -->
<div style="margin:8px 0 36px;border-radius:14px;background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.20);overflow:hidden;">
  <div style="padding:10px 20px;background:rgba(0,212,255,0.08);border-bottom:1px solid rgba(0,212,255,0.15);display:flex;align-items:center;gap:10px;">
    <span style="font-size:18px;">🎭</span>
    <span style="font-size:10px;font-weight:900;letter-spacing:0.26em;text-transform:uppercase;color:rgba(0,212,255,0.90);">Texto Original · Inglês</span>
    <span style="margin-left:auto;font-size:10px;color:rgba(0,212,255,0.55);font-weight:700;">Vanhoozer · <em>The Drama of Doctrine</em> p. 115</span>
  </div>
  <div style="padding:clamp(16px,3vw,24px);">
    <p style="font-size:clamp(15px,2vw,17px);color:rgba(200,235,255,0.92);font-style:italic;line-height:1.85;margin:0 0 12px;">"Scripture is the script for the theodrama... The canon provides an authoritative account of the divine action and the divinely authorized norms for human response. What makes the Bible canonical is, first and foremost, what God does with the text: Scripture is the Spirit's means of communicating Christ's lordship."</p>
    <p style="font-size:13px;color:rgba(0,212,255,0.55);margin:0;font-weight:700;letter-spacing:0.04em;">— VANHOOZER, Kevin J. <em>The Drama of Doctrine: A Canonical-Linguistic Approach to Christian Theology.</em> Louisville: Westminster John Knox Press, 2005. p. 115.</p>
  </div>
</div>

<p>O cânon funciona como <strong>"roteiro autorizador"</strong> (authoritative script)<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">¹¹</sup> do drama da redenção. A Escritura tem matéria e energia porque é o veículo da Palavra e do Espírito. O que constitui a Bíblia como cânon é, antes de mais nada, o uso que Deus faz do texto — expressão do senhorio de Jesus Cristo por meio do Espírito Santo.<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">¹²</sup></p>

<!-- ════════════════════════════════════════════════════ -->
<h2>🔭 3. Os Interlocutores: Onde Cada Um Acerta e Onde Falha</h2>

<!-- CITAÇÃO ORIGINAL — FISH sobre comunidades interpretativas -->
<div style="margin:20px 0 32px;border-radius:14px;background:rgba(200,100,255,0.05);border:1px solid rgba(160,80,255,0.20);overflow:hidden;">
  <div style="padding:10px 20px;background:rgba(160,80,255,0.08);border-bottom:1px solid rgba(160,80,255,0.15);display:flex;align-items:center;gap:10px;">
    <span style="font-size:18px;">📄</span>
    <span style="font-size:10px;font-weight:900;letter-spacing:0.26em;text-transform:uppercase;color:rgba(200,140,255,0.90);">Texto Original · Inglês</span>
    <span style="margin-left:auto;font-size:10px;color:rgba(160,80,255,0.60);font-weight:700;">Stanley Fish · <em>Is There a Text in This Class?</em> p. 3</span>
  </div>
  <div style="padding:clamp(16px,3vw,24px);">
    <p style="font-size:clamp(15px,2vw,17px);color:rgba(225,210,255,0.92);font-style:italic;line-height:1.85;margin:0 0 12px;">"Readers do not decode poems; they make them... Interpretation is not the art of construing but the art of constructing. Interpreters do not decode meaning; they create it... There is no such thing as a text that is not already the product of an interpretation."</p>
    <p style="font-size:13px;color:rgba(160,80,255,0.60);margin:0;font-weight:700;letter-spacing:0.04em;">— FISH, Stanley. <em>Is There a Text in This Class? The Authority of Interpretive Communities.</em> Cambridge: Harvard University Press, 1980. p. 3.</p>
  </div>
</div>

<!-- TABELA COMPARATIVA -->
<div style="margin:8px 0 40px;overflow-x:auto;">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
    <span style="font-size:20px;">📊</span>
    <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(0,212,255,0.70);">Quadro Comparativo — Quatro Abordagens</span>
  </div>
  <table style="width:100%;border-collapse:collapse;font-size:clamp(13px,1.8vw,15px);">
    <thead>
      <tr style="border-bottom:2px solid rgba(0,212,255,0.25);">
        <th style="text-align:left;padding:12px 16px;color:#00D4FF;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:900;">Autor</th>
        <th style="text-align:left;padding:12px 16px;color:#00D4FF;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:900;">Âncora do Sentido</th>
        <th style="text-align:left;padding:12px 16px;color:#00D4FF;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:900;">Contribuição</th>
        <th style="text-align:left;padding:12px 16px;color:#00D4FF;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:900;">Limite</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid rgba(255,255,255,0.07);">
        <td style="padding:14px 16px;color:#fff;font-weight:900;">Vanhoozer</td>
        <td style="padding:14px 16px;color:rgba(220,232,255,0.85);">Ato ilocucionário do autor + cânon</td>
        <td style="padding:14px 16px;color:rgba(220,232,255,0.75);">Estabiliza o sentido sem psicologismo; ancora teologicamente no cânon</td>
        <td style="padding:14px 16px;color:rgba(220,232,255,0.55);">Relação entre unidade canônica e pluralidade histórica dos atos de fala permanece subdeterminada</td>
      </tr>
      <tr style="border-bottom:1px solid rgba(255,255,255,0.07);background:rgba(255,255,255,0.015);">
        <td style="padding:14px 16px;color:#fff;font-weight:900;">Thiselton</td>
        <td style="padding:14px 16px;color:rgba(220,232,255,0.85);">Fusão de horizontes (texto + leitor)</td>
        <td style="padding:14px 16px;color:rgba(220,232,255,0.75);">Reconhece que toda leitura é situada; o Espírito opera pelos processos normais da compreensão</td>
        <td style="padding:14px 16px;color:rgba(220,232,255,0.55);">Não distingue com precisão fusão legítima de projeção subjetiva ilegítima</td>
      </tr>
      <tr style="border-bottom:1px solid rgba(255,255,255,0.07);">
        <td style="padding:14px 16px;color:#fff;font-weight:900;">Ricoeur</td>
        <td style="padding:14px 16px;color:rgba(220,232,255,0.85);">Autonomia semântica do texto</td>
        <td style="padding:14px 16px;color:rgba(220,232,255,0.75);">Abre espaço para leituras tipológicas e figurais além da intenção original; o texto "excede" o autor</td>
        <td style="padding:14px 16px;color:rgba(220,232,255,0.55);">Sem fundamento específico para impedir a multiplicação infinita de leituras igualmente legítimas</td>
      </tr>
      <tr>
        <td style="padding:14px 16px;color:#fff;font-weight:900;">Webster</td>
        <td style="padding:14px 16px;color:rgba(220,232,255,0.85);">Razão teológica audiente (ratio audiens)</td>
        <td style="padding:14px 16px;color:rgba(220,232,255,0.75);">Subordina a hermenêutica à doutrina de Deus desde o início; a leitura é evento soteriológico</td>
        <td style="padding:14px 16px;color:rgba(220,232,255,0.55);">Risco de circularidade: pressupõe a doutrina de Deus que a Escritura deveria fundamentar</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- CITAÇÃO ORIGINAL — RICOEUR sobre excedente de sentido -->
<div style="margin:8px 0 36px;border-radius:14px;background:rgba(255,160,60,0.05);border:1px solid rgba(255,140,60,0.20);overflow:hidden;">
  <div style="padding:10px 20px;background:rgba(255,140,60,0.08);border-bottom:1px solid rgba(255,140,60,0.15);display:flex;align-items:center;gap:10px;">
    <span style="font-size:18px;">📄</span>
    <span style="font-size:10px;font-weight:900;letter-spacing:0.26em;text-transform:uppercase;color:rgba(255,180,100,0.90);">Texto Original · Inglês</span>
    <span style="margin-left:auto;font-size:10px;color:rgba(255,140,60,0.60);font-weight:700;">Paul Ricoeur · <em>Interpretation Theory</em> p. 29–30</span>
  </div>
  <div style="padding:clamp(16px,3vw,24px);">
    <p style="font-size:clamp(15px,2vw,17px);color:rgba(255,230,200,0.92);font-style:italic;line-height:1.85;margin:0 0 12px;">"A text's career escapes the finite horizon lived by its author. What the text says now matters more than what the author meant to say... The text's meaning and the author's meaning overlap only partially. This is why understanding at depth requires something other than divining the original intention."</p>
    <p style="font-size:13px;color:rgba(255,140,60,0.55);margin:0;font-weight:700;letter-spacing:0.04em;">— RICOEUR, Paul. <em>Interpretation Theory: Discourse and the Surplus of Meaning.</em> Fort Worth: Texas Christian University Press, 1976. pp. 29–30.</p>
  </div>
</div>

<!-- ════════════════════════════════════════════════════ -->
<h2>🧮 4. O Argumento Central: Por Que Vanhoozer É a Resposta Mais Consistente</h2>

<p>O argumento de Vanhoozer pode ser reconstruído formalmente em quatro premissas:</p>

<div style="margin:28px 0;border-radius:16px;background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.09);padding:clamp(20px,4vw,32px);">
  <div style="display:flex;flex-direction:column;gap:14px;">
    <div style="display:flex;gap:12px;">
      <span style="font-size:11px;font-weight:900;color:#00D4FF;min-width:32px;padding-top:2px;">P1</span>
      <span style="font-size:clamp(15px,2vw,17px);color:rgba(220,232,255,0.85);line-height:1.65;">Todo ato de fala possui uma dimensão ilocucionária — aquilo que o falante <em>faz</em> ao dizer algo — distinta do mero proferir palavras e do efeito produzido no ouvinte.</span>
    </div>
    <div style="display:flex;gap:12px;">
      <span style="font-size:11px;font-weight:900;color:#00D4FF;min-width:32px;padding-top:2px;">P2</span>
      <span style="font-size:clamp(15px,2vw,17px);color:rgba(220,232,255,0.85);line-height:1.65;">Os autores bíblicos realizam atos de fala genuínos, mesmo sob inspiração divina — a inspiração se serve da agência comunicativa humana, de modo que os atos ilocucionários são, em última instância, de Deus.</span>
    </div>
    <div style="display:flex;gap:12px;">
      <span style="font-size:11px;font-weight:900;color:#00D4FF;min-width:32px;padding-top:2px;">P3</span>
      <span style="font-size:clamp(15px,2vw,17px);color:rgba(220,232,255,0.85);line-height:1.65;">Reconhecer o ato ilocucionário do autor é condição necessária para identificar o significado do texto — somente a dimensão ilocucionária refere-se a algo intrínseco ao ato.</span>
    </div>
    <div style="display:flex;gap:12px;">
      <span style="font-size:11px;font-weight:900;color:#00D4FF;min-width:32px;padding-top:2px;">P4</span>
      <span style="font-size:clamp(15px,2vw,17px);color:rgba(220,232,255,0.85);line-height:1.65;">O cânon, como discurso autoral divino unificado, fornece o contexto regulador dentro do qual os atos ilocucionários humanos devem ser lidos teologicamente.</span>
    </div>
    <div style="height:1px;background:rgba(0,212,255,0.20);margin:4px 0;"></div>
    <div style="display:flex;gap:12px;align-items:flex-start;">
      <span style="font-size:16px;font-weight:900;color:#4ade80;min-width:32px;padding-top:1px;">∴</span>
      <span style="font-size:clamp(15px,2vw,17px);color:#fff;line-height:1.65;font-weight:700;">O significado bíblico está ancorado no ato comunicativo do autor — humano e divino — regulado pela unidade canônica, e não na recepção autônoma do leitor ou nas convenções da comunidade interpretativa.</span>
    </div>
  </div>
</div>

<!-- CITAÇÃO ORIGINAL — VANHOOZER sobre o argumento do cânon -->
<div style="margin:8px 0 36px;border-radius:14px;background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.20);overflow:hidden;">
  <div style="padding:10px 20px;background:rgba(0,212,255,0.08);border-bottom:1px solid rgba(0,212,255,0.15);display:flex;align-items:center;gap:10px;">
    <span style="font-size:18px;">🔬</span>
    <span style="font-size:10px;font-weight:900;letter-spacing:0.26em;text-transform:uppercase;color:rgba(0,212,255,0.90);">Texto Original · Inglês</span>
    <span style="margin-left:auto;font-size:10px;color:rgba(0,212,255,0.55);font-weight:700;">Vanhoozer · <em>Is There a Meaning in This Text?</em> p. 265</span>
  </div>
  <div style="padding:clamp(16px,3vw,24px);">
    <p style="font-size:clamp(15px,2vw,17px);color:rgba(200,235,255,0.92);font-style:italic;line-height:1.85;margin:0 0 12px;">"If interpretive communities create meaning, then there is no shared world between communities, only the worlds they create. But Christianity makes a universal claim — that in the life, death, and resurrection of Jesus Christ, something happened that matters for all people everywhere. Biblical interpretation must be anchored in something more than the will of the community if it is to maintain this claim."</p>
    <p style="font-size:13px;color:rgba(0,212,255,0.55);margin:0;font-weight:700;letter-spacing:0.04em;">— VANHOOZER, Kevin J. <em>Is There a Meaning in This Text?</em> Grand Rapids: Zondervan, 1998. p. 265.</p>
  </div>
</div>

<p>A <strong>consequência teológica</strong> é direta: a comunidade interpretativa (a Igreja) não é autora do sentido bíblico — ela é sua <em>destinatária e performer</em>.<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">¹³</sup> Ela responde e encena um roteiro que não escreveu: o "teatro do evangelho".</p>

<!-- ════════════════════════════════════════════════════ -->
<h2>🏛️ 5. O Corretivo de Webster: Quando a Filosofia Não é Suficiente</h2>

<!-- CITAÇÃO ORIGINAL — WEBSTER -->
<div style="margin:20px 0 32px;border-radius:14px;background:rgba(100,255,160,0.04);border:1px solid rgba(60,200,100,0.20);overflow:hidden;">
  <div style="padding:10px 20px;background:rgba(60,200,100,0.08);border-bottom:1px solid rgba(60,200,100,0.15);display:flex;align-items:center;gap:10px;">
    <span style="font-size:18px;">📄</span>
    <span style="font-size:10px;font-weight:900;letter-spacing:0.26em;text-transform:uppercase;color:rgba(100,220,140,0.90);">Texto Original · Inglês</span>
    <span style="margin-left:auto;font-size:10px;color:rgba(60,200,100,0.60);font-weight:700;">Webster · <em>The Domain of the Word</em> p. 6</span>
  </div>
  <div style="padding:clamp(16px,3vw,24px);">
    <p style="font-size:clamp(15px,2vw,17px);color:rgba(210,255,230,0.92);font-style:italic;line-height:1.85;margin:0 0 12px;">"Scripture is part of the doctrine of God before it is part of hermeneutics or literary theory... It belongs to an account of what God is and does, and that account both defines what Scripture is and specifies the scope and character of rational human engagement with Scripture — engagement which is, at its core, repentance and faith."</p>
    <p style="font-size:13px;color:rgba(60,200,100,0.55);margin:0;font-weight:700;letter-spacing:0.04em;">— WEBSTER, John. <em>The Domain of the Word: Scripture and Theological Reason.</em> London: T&T Clark, 2012. p. 6.</p>
  </div>
</div>

<p>A limitação de Vanhoozer está numa tensão interna: sua unidade canônica precisa de fundamento dogmático mais explícito do que recursos literários e comunicativos conseguem oferecer. É aqui que Webster entra como corretivo necessário.</p>

<p>Webster insiste: a teologia fala do que o texto é e do que o texto faz <em>antes</em> de falar do que nós fazemos com o texto.<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">¹⁴</sup> A Escritura pertence à doutrina de Deus — não à esfera da hermenêutica geral.<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">¹⁵</sup> A razão teológica é <em>ratio audiens</em>: razão ouvinte, que não começa com suas próprias determinações, mas com a interpelação da Palavra divina.<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">¹⁶</sup></p>

<p>Em outras palavras: a unidade do cânon é dada pelo fato de que Cristo, como <em>auctor primarius</em> e como <em>res</em>, unifica o cânon a partir de si mesmo — não por propriedades textuais imanentes.<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">¹⁷</sup> Isso oferece a Vanhoozer o fundamento dogmático explícito — a cristologia e a doutrina da revelação — que justifica teologicamente por que o cânon pode ser lido como discurso unificado.</p>

<!-- CITAÇÃO ORIGINAL — THISELTON sobre fusão de horizontes -->
<div style="margin:32px 0;border-radius:14px;background:rgba(255,200,100,0.04);border:1px solid rgba(255,200,80,0.20);overflow:hidden;">
  <div style="padding:10px 20px;background:rgba(255,200,80,0.07);border-bottom:1px solid rgba(255,200,80,0.14);display:flex;align-items:center;gap:10px;">
    <span style="font-size:18px;">📄</span>
    <span style="font-size:10px;font-weight:900;letter-spacing:0.26em;text-transform:uppercase;color:rgba(255,220,120,0.90);">Texto Original · Inglês</span>
    <span style="margin-left:auto;font-size:10px;color:rgba(255,200,80,0.60);font-weight:700;">Thiselton · <em>The Two Horizons</em> p. 103</span>
  </div>
  <div style="padding:clamp(16px,3vw,24px);">
    <p style="font-size:clamp(15px,2vw,17px);color:rgba(255,245,210,0.92);font-style:italic;line-height:1.85;margin:0 0 12px;">"The Holy Spirit operates through the ordinary processes of human understanding, and not independently of them, nor in contradiction to them... The interpreter's own horizon is not to be dissolved into that of the text, nor the text's horizon into the interpreter's, but both are enlarged and brought together in genuine understanding."</p>
    <p style="font-size:13px;color:rgba(255,200,80,0.55);margin:0;font-weight:700;letter-spacing:0.04em;">— THISELTON, Anthony C. <em>The Two Horizons: New Testament Hermeneutics and Philosophical Description.</em> Grand Rapids: Eerdmans, 1980. p. 103.</p>
  </div>
</div>

<!-- ════════════════════════════════════════════════════ -->
<h2>🔺 6. A Síntese: Não é Uma Escolha Entre Autor, Texto e Leitor</h2>

<p>A pesquisa de Vanhoozer reformula o problema original: a questão não é escolher entre autor, leitor e comunidade — mas determinar a <strong>ordem de subordinação teológica</strong> entre essas três instâncias.</p>

<!-- PIRÂMIDE DE ORDEM -->
<div style="margin:32px 0 40px;padding:28px;border-radius:16px;background:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.18);text-align:center;">
  <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:20px;">
    <span style="font-size:18px;">🔺</span>
    <span style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:#00D4FF;">Ordem de Subordinação Teológica</span>
  </div>
  <div style="display:flex;flex-direction:column;gap:10px;align-items:center;">
    <div style="padding:10px 28px;border-radius:10px;background:rgba(0,212,255,0.15);border:1px solid rgba(0,212,255,0.35);font-size:clamp(14px,2vw,16px);font-weight:900;color:#fff;">🕊️ Deus — auctor primarius do cânon (Webster)</div>
    <div style="font-size:18px;color:rgba(0,212,255,0.50);">↓</div>
    <div style="padding:10px 28px;border-radius:10px;background:rgba(100,200,255,0.10);border:1px solid rgba(100,200,255,0.25);font-size:clamp(14px,2vw,16px);font-weight:900;color:#fff;">✍️ Autores humanos — agentes ilocucionários no cânon (Vanhoozer)</div>
    <div style="font-size:18px;color:rgba(0,212,255,0.50);">↓</div>
    <div style="padding:10px 28px;border-radius:10px;background:rgba(200,180,255,0.08);border:1px solid rgba(200,180,255,0.20);font-size:clamp(14px,2vw,16px);font-weight:900;color:#fff;">📜 Texto com autonomia semântica e excedente de sentido (Ricoeur)</div>
    <div style="font-size:18px;color:rgba(0,212,255,0.50);">↓</div>
    <div style="padding:10px 28px;border-radius:10px;background:rgba(255,200,100,0.07);border:1px solid rgba(255,200,100,0.18);font-size:clamp(14px,2vw,16px);font-weight:900;color:#fff;">👁️ Leitor situado historicamente, em fusão de horizontes (Thiselton)</div>
  </div>
</div>

<p>O "excedente de sentido" de Ricoeur<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">¹⁸</sup> descreve adequadamente a experiência da leitura tipológica e figural na tradição cristã. A "fusão de horizontes" de Thiselton descreve corretamente que toda leitura é situada<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">¹⁹</sup> — e que o Espírito opera por meio dos processos normais da compreensão humana.<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">²⁰</sup> Mas ambos os fenômenos devem ser lidos, teologicamente, como possibilidades <em>abertas pelo próprio ato comunicativo divino-humano do cânon</em> — não como princípios hermenêuticos autônomos.</p>

<!-- ════════════════════════════════════════════════════ -->
<h2>⛪ 7. O Que Isso Significa para a Igreja Hoje</h2>

<!-- BOX ALERTA PASTORAL -->
<div style="margin:24px 0 32px;border-radius:14px;background:rgba(255,100,60,0.06);border:1px solid rgba(255,100,60,0.22);padding:clamp(18px,3vw,28px);display:flex;gap:16px;align-items:flex-start;">
  <div style="font-size:28px;flex-shrink:0;line-height:1;padding-top:2px;">⚠️</div>
  <div>
    <div style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(255,140,100,0.85);margin-bottom:10px;">Diagnóstico Pastoral</div>
    <p style="font-size:clamp(15px,2vw,17px);color:rgba(255,230,220,0.88);line-height:1.80;margin:0;">A crise hermenêutica que Vanhoozer diagnostica não é apenas acadêmica. Ela se manifesta toda vez que uma comunidade decide que a Bíblia significa o que a cultura já diz — toda vez que o "texto" é convocado para confirmar o que o leitor já quer ouvir, e toda vez que a autoridade da Escritura é subordinada ao consenso comunitário.</p>
  </div>
</div>

<p>A resposta de Vanhoozer é simultaneamente filosófica e pastoral: <strong>a Igreja não escreve o roteiro — ela o encena.</strong><sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">²¹</sup> O cânon precede a comunidade, governa a comunidade, e julga a comunidade. A leitura obediente da Escritura não é uma entre muitas possibilidades interpretativas — é o único modo de a Igreja ser Igreja.</p>

<!-- CITAÇÃO ORIGINAL FINAL — VANHOOZER sobre obediência e liberdade -->
<div style="margin:28px 0 40px;border-radius:14px;background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.20);overflow:hidden;">
  <div style="padding:10px 20px;background:rgba(0,212,255,0.08);border-bottom:1px solid rgba(0,212,255,0.15);display:flex;align-items:center;gap:10px;">
    <span style="font-size:18px;">✝️</span>
    <span style="font-size:10px;font-weight:900;letter-spacing:0.26em;text-transform:uppercase;color:rgba(0,212,255,0.90);">Texto Original · Inglês</span>
    <span style="margin-left:auto;font-size:10px;color:rgba(0,212,255,0.55);font-weight:700;">Vanhoozer · <em>The Drama of Doctrine</em> p. 454</span>
  </div>
  <div style="padding:clamp(16px,3vw,24px);">
    <p style="font-size:clamp(15px,2vw,17px);color:rgba(200,235,255,0.92);font-style:italic;line-height:1.85;margin:0 0 12px;">"Obedience and freedom are not necessarily contradictory... Obedience means understanding oneself in relation to another. The church's freedom lies not in autonomy from the canon but in its ability to perform the Scriptures faithfully — to embody the wisdom of God for the sake of the world."</p>
    <p style="font-size:13px;color:rgba(0,212,255,0.55);margin:0;font-weight:700;letter-spacing:0.04em;">— VANHOOZER, Kevin J. <em>The Drama of Doctrine.</em> Louisville: Westminster John Knox Press, 2005. p. 454.</p>
  </div>
</div>

<!-- ════════════════════════════════════════════════════ -->
<!-- NOTAS DE RODAPÉ -->
<h2>🗒️ Notas</h2>

<div style="margin-top:8px;padding:clamp(18px,3vw,26px);border-radius:14px;background:rgba(0,212,255,0.03);border:1px solid rgba(0,212,255,0.12);">
  <div style="display:flex;flex-direction:column;gap:8px;">
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">¹</sup> VANHOOZER, Kevin J. <em>Is There a Meaning in This Text?</em> Grand Rapids: Zondervan, 1998. p. 45.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">²</sup> VANHOOZER. <em>Is There a Meaning in This Text?</em>, 1998. p. 27.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">³</sup> VANHOOZER. <em>Is There a Meaning in This Text?</em>, 1998. p. 53.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">⁴</sup> VANHOOZER. <em>Is There a Meaning in This Text?</em>, 1998. p. 51.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">⁵</sup> VANHOOZER. <em>Is There a Meaning in This Text?</em>, 1998. p. 261. Fish: "readers do not respond to meanings, they create them."</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">⁶</sup> VANHOOZER. <em>The Drama of Doctrine</em>. Louisville: Westminster John Knox Press, 2005. p. 177.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">⁷</sup> VANHOOZER. <em>Is There a Meaning in This Text?</em>, 1998. p. 185.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">⁸</sup> VANHOOZER. <em>Is There a Meaning in This Text?</em>, 1998. p. 183. Ver também BRIGGS, Richard S. <em>Words in Action: Speech Act Theory and Biblical Interpretation.</em> Edinburgh: T&T Clark, 2004. p. 10.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">⁹</sup> VANHOOZER. <em>The Drama of Doctrine</em>, 2005. p. 169.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">¹⁰</sup> VANHOOZER. <em>Is There a Meaning in This Text?</em>, 1998. p. 223.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">¹¹</sup> VANHOOZER. <em>The Drama of Doctrine</em>, 2005. p. 67.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">¹²</sup> VANHOOZER. <em>The Drama of Doctrine</em>, 2005. p. 97.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">¹³</sup> VANHOOZER. <em>Is There a Meaning in This Text?</em>, 1998. p. 231. Ver também BLUE, Scott A. Meaning, Intention, and Application. <em>Trinity Journal</em>, v. 23, n. 2, 2002. p. 161-184.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">¹⁴</sup> WEBSTER, John. <em>The Domain of the Word: Scripture and Theological Reason.</em> London: T&T Clark, 2012. p. 3.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">¹⁵</sup> WEBSTER. <em>The Domain of the Word</em>, 2012. p. 4.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">¹⁶</sup> WEBSTER. <em>The Domain of the Word</em>, 2012. p. 6.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">¹⁷</sup> WEBSTER. <em>The Domain of the Word</em>, 2012. p. 141.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">¹⁸</sup> RICOEUR, Paul. <em>Interpretation Theory: Discourse and the Surplus of Meaning.</em> Fort Worth: Texas Christian University Press, 1976. p. 30; 65.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">¹⁹</sup> THISELTON, Anthony C. <em>The Two Horizons.</em> Grand Rapids: Eerdmans, 1980. p. 11.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">²⁰</sup> THISELTON. <em>The Two Horizons</em>, 1980. p. 309. Ver também p. 319: "The Holy Spirit operates through the ordinary processes of human understanding."</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">²¹</sup> VANHOOZER. <em>The Drama of Doctrine</em>, 2005. p. 402.</p>
  </div>
</div>

<!-- ════════════════════════════════════════════════════ -->
<!-- REFERÊNCIAS -->
<h2>📚 Referências Bibliográficas</h2>

<div style="margin-top:8px;padding:clamp(20px,3.5vw,28px);border-radius:14px;background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.08);">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:18px;">
    <span style="font-size:16px;">📗</span>
    <div style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(0,212,255,0.70);">Fontes Primárias</div>
  </div>
  <div style="display:flex;flex-direction:column;gap:10px;">
    <p style="margin:0;font-size:15px;color:rgba(220,232,255,0.80);line-height:1.65;"><strong style="color:#fff;">VANHOOZER, Kevin J.</strong> <em>Is There a Meaning in This Text? The Bible, the Reader, and the Morality of Literary Knowledge.</em> Grand Rapids: Zondervan, 1998.</p>
    <p style="margin:0;font-size:15px;color:rgba(220,232,255,0.80);line-height:1.65;"><strong style="color:#fff;">VANHOOZER, Kevin J.</strong> <em>The Drama of Doctrine: A Canonical-Linguistic Approach to Christian Theology.</em> Louisville: Westminster John Knox Press, 2005.</p>
    <p style="margin:0;font-size:15px;color:rgba(220,232,255,0.80);line-height:1.65;"><strong style="color:#fff;">THISELTON, Anthony C.</strong> <em>The Two Horizons: New Testament Hermeneutics and Philosophical Description.</em> Grand Rapids: Eerdmans; Exeter: Paternoster, 1980.</p>
    <p style="margin:0;font-size:15px;color:rgba(220,232,255,0.80);line-height:1.65;"><strong style="color:#fff;">RICOEUR, Paul.</strong> <em>Interpretation Theory: Discourse and the Surplus of Meaning.</em> Fort Worth: Texas Christian University Press, 1976.</p>
    <p style="margin:0;font-size:15px;color:rgba(220,232,255,0.80);line-height:1.65;"><strong style="color:#fff;">WEBSTER, John.</strong> <em>The Domain of the Word: Scripture and Theological Reason.</em> London: T&T Clark, 2012.</p>
    <p style="margin:0;font-size:15px;color:rgba(220,232,255,0.80);line-height:1.65;"><strong style="color:#fff;">BARTHES, Roland.</strong> "The Death of the Author." In: <em>Image, Music, Text.</em> Transl. Stephen Heath. New York: Hill and Wang, 1977.</p>
    <p style="margin:0;font-size:15px;color:rgba(220,232,255,0.80);line-height:1.65;"><strong style="color:#fff;">FISH, Stanley.</strong> <em>Is There a Text in This Class? The Authority of Interpretive Communities.</em> Cambridge: Harvard University Press, 1980.</p>
  </div>
  <div style="display:flex;align-items:center;gap:8px;margin:24px 0 16px;">
    <span style="font-size:16px;">📘</span>
    <div style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(0,212,255,0.70);">Fontes Secundárias</div>
  </div>
  <div style="display:flex;flex-direction:column;gap:10px;">
    <p style="margin:0;font-size:15px;color:rgba(220,232,255,0.80);line-height:1.65;"><strong style="color:#fff;">BLUE, Scott A.</strong> Meaning, Intention, and Application: Speech Act Theory in the Hermeneutics of Francis Watson and Kevin J. Vanhoozer. <em>Trinity Journal</em>, v. 23, n. 2, p. 161-184, 2002.</p>
    <p style="margin:0;font-size:15px;color:rgba(220,232,255,0.80);line-height:1.65;"><strong style="color:#fff;">BRIGGS, Richard S.</strong> <em>Words in Action: Speech Act Theory and Biblical Interpretation.</em> Edinburgh; New York: T&T Clark, 2004.</p>
    <p style="margin:0;font-size:15px;color:rgba(220,232,255,0.80);line-height:1.65;"><strong style="color:#fff;">CHILDS, Brevard S.</strong> <em>Introduction to the Old Testament as Scripture.</em> Philadelphia: Fortress Press, 1979.</p>
    <p style="margin:0;font-size:15px;color:rgba(220,232,255,0.80);line-height:1.65;"><strong style="color:#fff;">WARNKE, Georgia.</strong> <em>Gadamer: Hermeneutics, Tradition and Reason.</em> Stanford: Stanford University Press, 1987.</p>
  </div>
</div>
`,
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
<h2>🎭 Abertura: O Problema da Leitura Errada</h2>

<div style="margin:28px 0 24px;padding:clamp(20px,3vw,28px);border-radius:16px;background:rgba(255,70,70,0.07);border:1px solid rgba(255,100,100,0.25);display:flex;gap:clamp(16px,3vw,24px);align-items:flex-start;">
  <div style="flex-shrink:0;font-size:clamp(40px,6vw,56px);line-height:1;filter:drop-shadow(0 0 12px rgba(255,100,100,0.40));">📖</div>
  <div>
    <div style="font-size:clamp(11px,1.5vw,13px);font-weight:900;letter-spacing:0.20em;text-transform:uppercase;color:#FF6B6B;margin-bottom:10px;">O equívoco comum</div>
    <p style="margin:0;font-size:clamp(16px,2.2vw,18px);line-height:1.80;color:#E8F0FF;">Muitos cristãos abrem a Bíblia como quem abre um <strong>manual de instruções</strong> — em busca de regras, receitas e respostas prontas para cada situação da vida. A pergunta que guia essa leitura é: <em>"O que devo fazer?"</em></p>
  </div>
</div>

<p>O problema não é a busca por orientação. O problema é o <strong>gênero literário pressuposto</strong>. Um manual é estático, impessoal, finalizado. A Bíblia é viva, dramática, relacional — e nos convida a algo muito maior do que seguir instruções.</p>

<p>Foi justamente esse deslocamento que Kevin Vanhoozer identificou em seu monumental <em>The Drama of Doctrine</em> (2005). Sua tese central: a teologia cristã só pode ser entendida corretamente quando tratada como <strong>drama</strong> — não como dogma inerte, nem como experiência subjetiva, mas como <em>theodrama</em>: o grande ato divino de redenção no qual somos chamados a participar.<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">¹</sup></p>

<!-- CITAÇÃO ORIGINAL — VANHOOZER sobre theodrama -->
<div style="margin:28px 0;border-radius:14px;background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.20);overflow:hidden;">
  <div style="padding:10px 20px;background:rgba(0,212,255,0.08);border-bottom:1px solid rgba(0,212,255,0.15);display:flex;align-items:center;gap:10px;">
    <span style="font-size:18px;">🎬</span>
    <span style="font-size:10px;font-weight:900;letter-spacing:0.26em;text-transform:uppercase;color:rgba(0,212,255,0.90);">Texto Original · Inglês</span>
    <span style="margin-left:auto;font-size:10px;color:rgba(0,212,255,0.55);font-weight:700;">Vanhoozer · <em>The Drama of Doctrine</em> p. 114</span>
  </div>
  <div style="padding:clamp(16px,3vw,24px);">
    <p style="font-size:clamp(15px,2vw,17px);color:rgba(200,235,255,0.92);font-style:italic;line-height:1.85;margin:0 0 12px;">"The drama of doctrine... is about participating in the ongoing story of what God has done, is doing, and will do in Christ through the Spirit for the sake of the world. Doctrine is neither abstract proposition nor mere personal experience; it is the church's understanding of its role in the theodrama — the story of God's dealings with the world."</p>
    <p style="font-size:13px;color:rgba(0,212,255,0.55);margin:0;font-weight:700;letter-spacing:0.04em;">— VANHOOZER, Kevin J. <em>The Drama of Doctrine: A Canonical-Linguistic Approach to Christian Theology.</em> Louisville: Westminster John Knox Press, 2005. p. 114.</p>
  </div>
</div>

<blockquote>"A teologia é o script de um drama divino. A tarefa do teólogo é ajudar a Igreja a representar bem o seu papel."<br/><strong style="font-size:clamp(13px,1.8vw,15px);color:rgba(255,255,255,0.60);font-style:normal;">— Kevin J. Vanhoozer</strong></blockquote>

<!-- SEÇÃO 2 -->
<h2>🏗️ Ato I: A Estrutura do Drama</h2>

<p>Todo drama clássico tem elementos constitutivos. O <em>theodrama</em> bíblico também. Vanhoozer os identifica com precisão:<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">²</sup></p>

<div class="artigo-grid-auto" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(clamp(140px,22vw,180px),1fr));gap:clamp(12px,2vw,18px);margin:28px 0;">

  <div style="padding:clamp(18px,3vw,24px);border-radius:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.20);text-align:center;">
    <div style="font-size:clamp(38px,5.5vw,52px);margin-bottom:12px;line-height:1;filter:drop-shadow(0 0 10px rgba(0,212,255,0.30));">✍️</div>
    <div style="font-size:clamp(11px,1.5vw,13px);font-weight:900;letter-spacing:0.16em;text-transform:uppercase;color:#00D4FF;margin-bottom:10px;">Autor / Diretor</div>
    <p style="margin:0;font-size:clamp(14px,1.9vw,16px);line-height:1.65;color:#C8DCF5;">Deus Triúno — Pai, Filho e Espírito — que concebe, escreve e dirige o drama da redenção</p>
  </div>

  <div style="padding:clamp(18px,3vw,24px);border-radius:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.20);text-align:center;">
    <div style="font-size:clamp(38px,5.5vw,52px);margin-bottom:12px;line-height:1;filter:drop-shadow(0 0 10px rgba(255,220,80,0.30));">📜</div>
    <div style="font-size:clamp(11px,1.5vw,13px);font-weight:900;letter-spacing:0.16em;text-transform:uppercase;color:#00D4FF;margin-bottom:10px;">Script / Texto</div>
    <p style="margin:0;font-size:clamp(14px,1.9vw,16px);line-height:1.65;color:#C8DCF5;">A Escritura Sagrada: o roteiro inspirado e infalível que define o enredo, os personagens e o desfecho<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">³</sup></p>
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
    <p style="margin:0;font-size:clamp(14px,1.9vw,16px);line-height:1.65;color:#C8DCF5;">A criação inteira: o cosmos como teatro da glória divina (<em>theatrum gloriae Dei</em> — Calvino)<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">⁴</sup></p>
  </div>

</div>

<!-- CITAÇÃO ORIGINAL — VANHOOZER sobre o script canônico -->
<div style="margin:28px 0;border-radius:14px;background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.20);overflow:hidden;">
  <div style="padding:10px 20px;background:rgba(0,212,255,0.08);border-bottom:1px solid rgba(0,212,255,0.15);display:flex;align-items:center;gap:10px;">
    <span style="font-size:18px;">📜</span>
    <span style="font-size:10px;font-weight:900;letter-spacing:0.26em;text-transform:uppercase;color:rgba(0,212,255,0.90);">Texto Original · Inglês</span>
    <span style="margin-left:auto;font-size:10px;color:rgba(0,212,255,0.55);font-weight:700;">Vanhoozer · <em>The Drama of Doctrine</em> p. 115</span>
  </div>
  <div style="padding:clamp(16px,3vw,24px);">
    <p style="font-size:clamp(15px,2vw,17px);color:rgba(200,235,255,0.92);font-style:italic;line-height:1.85;margin:0 0 12px;">"Scripture is the script for the theodrama. The canon — the rule of faith — is an authoritative account of the divine action and the divinely authorized norms for human response... The Spirit makes the Scriptures into a living word: not a dead letter, but a living voice that speaks to, and in, every new situation."</p>
    <p style="font-size:13px;color:rgba(0,212,255,0.55);margin:0;font-weight:700;letter-spacing:0.04em;">— VANHOOZER, Kevin J. <em>The Drama of Doctrine.</em> Louisville: Westminster John Knox Press, 2005. p. 115.</p>
  </div>
</div>

<!-- SEÇÃO 3 -->
<h2>📜 Ato II: Os Cinco Atos da Grande Narrativa</h2>

<p>N. T. Wright — numa visão complementar à de Vanhoozer — propõe que a Bíblia é como uma peça de teatro em <strong>cinco atos</strong>.<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">⁵</sup> Não uma coleção de versículos soltos, mas uma narrativa coesa com começo, meio e fim:</p>

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
<h2>🎯 O Ponto Central: Por Que Isso Muda Tudo</h2>

<div style="margin:28px 0;padding:clamp(22px,3.5vw,32px);border-radius:18px;background:linear-gradient(135deg,rgba(0,212,255,0.10) 0%,rgba(100,60,255,0.10) 100%);border:1px solid rgba(0,212,255,0.28);">
  <div style="font-size:clamp(12px,1.6vw,14px);font-weight:900;letter-spacing:0.20em;text-transform:uppercase;color:#00D4FF;margin-bottom:18px;">🎯 A virada hermenêutica</div>
  <p style="margin:0 0 18px;font-size:clamp(16px,2.2vw,18px);line-height:1.85;color:#E8F0FF;">Quando você trata a Bíblia como manual, a pergunta é: <em>"Qual regra devo aplicar?"</em> Quando você a trata como drama, a pergunta muda para: <em>"Qual personagem devo ser? Como devo agir, fiel ao script, neste momento específico da história?"</em></p>
  <p style="margin:0;font-size:clamp(16px,2.2vw,18px);line-height:1.85;color:#E8F0FF;">Essa diferença não é cosmética. Ela transforma a maneira como lemos a Escritura, como pregamos, como fazemos ética e como entendemos a missão da Igreja.</p>
</div>

<p>Vanhoozer chama essa competência de <strong>sabedoria canônica</strong> (<em>canonical wisdom</em>):<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">⁶</sup> a capacidade de ler o script bíblico com inteligência suficiente para improvisar criativamente em situações novas — não inventando um novo enredo, mas sendo fiel ao que foi revelado.</p>

<!-- CITAÇÃO ORIGINAL — VANHOOZER sobre canonical wisdom -->
<div style="margin:28px 0;border-radius:14px;background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.20);overflow:hidden;">
  <div style="padding:10px 20px;background:rgba(0,212,255,0.08);border-bottom:1px solid rgba(0,212,255,0.15);display:flex;align-items:center;gap:10px;">
    <span style="font-size:18px;">🔬</span>
    <span style="font-size:10px;font-weight:900;letter-spacing:0.26em;text-transform:uppercase;color:rgba(0,212,255,0.90);">Texto Original · Inglês</span>
    <span style="margin-left:auto;font-size:10px;color:rgba(0,212,255,0.55);font-weight:700;">Vanhoozer · <em>The Drama of Doctrine</em> p. 67</span>
  </div>
  <div style="padding:clamp(16px,3vw,24px);">
    <p style="font-size:clamp(15px,2vw,17px);color:rgba(200,235,255,0.92);font-style:italic;line-height:1.85;margin:0 0 12px;">"Canonical wisdom — the kind of knowledge that enables persons to participate fittingly in the theodrama — is a form of practical wisdom... It is the ability to improvise in ways that are not arbitrary or eccentric but fitting, that is, in keeping with what has preceded and what we know of the ending."</p>
    <p style="font-size:13px;color:rgba(0,212,255,0.55);margin:0;font-weight:700;letter-spacing:0.04em;">— VANHOOZER, Kevin J. <em>The Drama of Doctrine.</em> Louisville: Westminster John Knox Press, 2005. p. 67.</p>
  </div>
</div>

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
<h2>⛪ Aplicação: A Igreja como Companhia Teatral</h2>

<p>Se a Bíblia é drama, a Igreja é a companhia teatral que o representa ao mundo. Não uma organização religiosa, não um clube de bem-estar espiritual — mas um grupo de <strong>atores treinados no script</strong>,<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">⁷</sup> capacitados pelo Diretor (o Espírito), para representar fielmente o enredo do Reino de Deus.</p>

<!-- CITAÇÃO ORIGINAL — VANHOOZER sobre a Igreja como atores -->
<div style="margin:28px 0;border-radius:14px;background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.20);overflow:hidden;">
  <div style="padding:10px 20px;background:rgba(0,212,255,0.08);border-bottom:1px solid rgba(0,212,255,0.15);display:flex;align-items:center;gap:10px;">
    <span style="font-size:18px;">🎭</span>
    <span style="font-size:10px;font-weight:900;letter-spacing:0.26em;text-transform:uppercase;color:rgba(0,212,255,0.90);">Texto Original · Inglês</span>
    <span style="margin-left:auto;font-size:10px;color:rgba(0,212,255,0.55);font-weight:700;">Vanhoozer · <em>The Drama of Doctrine</em> p. 97</span>
  </div>
  <div style="padding:clamp(16px,3vw,24px);">
    <p style="font-size:clamp(15px,2vw,17px);color:rgba(200,235,255,0.92);font-style:italic;line-height:1.85;margin:0 0 12px;">"The church is a community of the Spirit commissioned to continue the drama of redemption... The church does not author its script; it receives it. Its task is not creativity but fidelity — not to write a new story, but to perform the old one with fresh understanding and new embodiment in ever-changing contexts."</p>
    <p style="font-size:13px;color:rgba(0,212,255,0.55);margin:0;font-weight:700;letter-spacing:0.04em;">— VANHOOZER, Kevin J. <em>The Drama of Doctrine.</em> Louisville: Westminster John Knox Press, 2005. p. 97.</p>
  </div>
</div>

<div style="margin:28px 0;display:grid;gap:clamp(14px,2vw,20px);">

  <div style="padding:clamp(18px,3vw,24px);border-radius:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.10);display:flex;gap:clamp(16px,2.5vw,20px);align-items:flex-start;">
    <div style="flex-shrink:0;font-size:clamp(32px,4.5vw,44px);line-height:1;filter:drop-shadow(0 0 8px rgba(255,220,80,0.35));">🎓</div>
    <div>
      <div style="font-size:clamp(13px,1.8vw,15px);font-weight:900;color:#ffffff;margin-bottom:6px;">Para o ensino</div>
      <p style="margin:0;font-size:clamp(15px,2vw,17px);line-height:1.75;color:#C8D8F0;">Aprender teologia não é memorizar doutrinas — é ser <strong>formado no script</strong> para agir com sabedoria no palco da vida.<sup style="font-size:10px;color:#00D4FF;font-weight:900;margin-left:2px;">⁸</sup></p>
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
<h2>✨ Encerramento: Você Está no Palco</h2>

<div style="margin:32px 0;padding:clamp(28px,4.5vw,44px) clamp(20px,4vw,36px);border-radius:20px;background:linear-gradient(135deg,rgba(100,60,255,0.14) 0%,rgba(0,212,255,0.14) 100%);border:1px solid rgba(0,212,255,0.30);text-align:center;">
  <div style="font-size:clamp(52px,8vw,72px);margin-bottom:18px;line-height:1;filter:drop-shadow(0 0 20px rgba(0,212,255,0.40));">🎭</div>
  <p style="font-size:clamp(17px,2.6vw,22px);font-weight:700;color:#ffffff;line-height:1.65;margin:0 0 22px;font-style:italic;">"A Escritura é o script do maior drama já concebido.<br/>Cristo é o Ato central. O Espírito é o Diretor.<br/>E você — <span style="color:#00D4FF;">você está no palco.</span>"</p>
  <div style="width:60px;height:3px;background:rgba(0,212,255,0.70);border-radius:3px;margin:0 auto 22px;"></div>
  <p style="font-size:clamp(15px,2vw,17px);color:rgba(200,220,255,0.80);line-height:1.80;margin:0;">A próxima vez que você abrir sua Bíblia, não a abra como um manual.<br/>Abra-a como um ator que precisa conhecer o script para <strong style="color:#ffffff;">representar bem o papel que Deus lhe deu.</strong></p>
</div>

<!-- CITAÇÃO ORIGINAL — VANHOOZER sobre obediência e improvisação -->
<div style="margin:32px 0;border-radius:14px;background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.20);overflow:hidden;">
  <div style="padding:10px 20px;background:rgba(0,212,255,0.08);border-bottom:1px solid rgba(0,212,255,0.15);display:flex;align-items:center;gap:10px;">
    <span style="font-size:18px;">✝️</span>
    <span style="font-size:10px;font-weight:900;letter-spacing:0.26em;text-transform:uppercase;color:rgba(0,212,255,0.90);">Texto Original · Inglês</span>
    <span style="margin-left:auto;font-size:10px;color:rgba(0,212,255,0.55);font-weight:700;">Vanhoozer · <em>The Drama of Doctrine</em> p. 402</span>
  </div>
  <div style="padding:clamp(16px,3vw,24px);">
    <p style="font-size:clamp(15px,2vw,17px);color:rgba(200,235,255,0.92);font-style:italic;line-height:1.85;margin:0 0 12px;">"The church's vocation is to be a theater of the gospel: a community that enacts the word and embodies the way of Jesus Christ in the power of the Spirit... To improvise is not to play without a script, but to play the script in a new key — faithfully, imaginatively, fittingly."</p>
    <p style="font-size:13px;color:rgba(0,212,255,0.55);margin:0;font-weight:700;letter-spacing:0.04em;">— VANHOOZER, Kevin J. <em>The Drama of Doctrine.</em> Louisville: Westminster John Knox Press, 2005. p. 402.</p>
  </div>
</div>

<!-- CITAÇÃO ORIGINAL — N. T. WRIGHT sobre os cinco atos -->
<div style="margin:32px 0;border-radius:14px;background:rgba(255,200,80,0.04);border:1px solid rgba(255,200,80,0.20);overflow:hidden;">
  <div style="padding:10px 20px;background:rgba(255,200,80,0.07);border-bottom:1px solid rgba(255,200,80,0.14);display:flex;align-items:center;gap:10px;">
    <span style="font-size:18px;">📄</span>
    <span style="font-size:10px;font-weight:900;letter-spacing:0.26em;text-transform:uppercase;color:rgba(255,220,120,0.90);">Texto Original · Inglês</span>
    <span style="margin-left:auto;font-size:10px;color:rgba(255,200,80,0.60);font-weight:700;">N. T. Wright · <em>Scripture and the Authority of God</em> p. 122</span>
  </div>
  <div style="padding:clamp(16px,3vw,24px);">
    <p style="font-size:clamp(15px,2vw,17px);color:rgba(255,245,210,0.92);font-style:italic;line-height:1.85;margin:0 0 12px;">"The story is told as a five-act play... The church is called to improvise the fifth act, in the light of what has gone before... This is not an invitation to chaos or relativism. The church's improvisation must be in keeping with the narrative, characters, and resolution already revealed in the first four acts."</p>
    <p style="font-size:13px;color:rgba(255,200,80,0.55);margin:0;font-weight:700;letter-spacing:0.04em;">— WRIGHT, N. T. <em>Scripture and the Authority of God: How to Read the Bible Today.</em> New York: HarperOne, 2011. p. 122.</p>
  </div>
</div>

<!-- NOTAS DE RODAPÉ -->
<h2>🗒️ Notas</h2>

<div style="margin-top:8px;padding:clamp(18px,3vw,26px);border-radius:14px;background:rgba(0,212,255,0.03);border:1px solid rgba(0,212,255,0.12);">
  <div style="display:flex;flex-direction:column;gap:8px;">
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">¹</sup> VANHOOZER, Kevin J. <em>The Drama of Doctrine: A Canonical-Linguistic Approach to Christian Theology.</em> Louisville: Westminster John Knox Press, 2005. p. 114.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">²</sup> VANHOOZER. <em>The Drama of Doctrine</em>, 2005. p. 169. Vanhoozer identifica Deus Triúno como o "autor" do theodrama: Pai como diretor, Filho como protagonista, Espírito como diretor de cena.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">³</sup> VANHOOZER. <em>The Drama of Doctrine</em>, 2005. p. 115: "Scripture is the script for the theodrama... an authoritative account of the divine action and the divinely authorized norms for human response."</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">⁴</sup> CALVINO, João. <em>Institutas da Religião Cristã.</em> I.14.20: o mundo como "teatro da glória divina" (<em>theatrum gloriae Dei</em>). Ver também VANHOOZER. <em>The Drama of Doctrine</em>, 2005. p. 67.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">⁵</sup> WRIGHT, N. T. <em>Scripture and the Authority of God: How to Read the Bible Today.</em> New York: HarperOne, 2011. p. 116–122. A proposta dos cinco atos foi originalmente apresentada em: WRIGHT, N. T. <em>The New Testament and the People of God.</em> Minneapolis: Fortress Press, 1992. p. 140–143.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">⁶</sup> VANHOOZER. <em>The Drama of Doctrine</em>, 2005. p. 67: "canonical wisdom... a form of practical wisdom... the ability to improvise in ways that are fitting, in keeping with what has preceded and what we know of the ending."</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">⁷</sup> VANHOOZER. <em>The Drama of Doctrine</em>, 2005. p. 97. A distinção entre "Performance I" (fidelidade ao script) e "Performance II" (a comunidade como autora do sentido) é estrutural no argumento de Vanhoozer.</p>
    <p style="margin:0;font-size:13px;color:rgba(200,220,255,0.65);line-height:1.70;"><sup style="color:#00D4FF;font-weight:900;font-size:11px;">⁸</sup> VANHOOZER. <em>The Drama of Doctrine</em>, 2005. p. 402. Para Vanhoozer, formação teológica é formação para a "performance fiel" — não mera transmissão de informação, mas habituação ao script.</p>
  </div>
</div>

<!-- REFERÊNCIAS -->
<h2>📚 Referências Bibliográficas</h2>

<div style="margin-top:8px;padding:clamp(20px,3vw,28px);border-radius:14px;background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.08);">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:18px;">
    <span style="font-size:16px;">📗</span>
    <div style="font-size:10px;font-weight:900;letter-spacing:0.24em;text-transform:uppercase;color:rgba(0,212,255,0.70);">Obras Principais</div>
  </div>
  <div style="display:flex;flex-direction:column;gap:10px;">
    <p style="margin:0;font-size:15px;color:rgba(220,232,255,0.80);line-height:1.65;"><strong style="color:#fff;">VANHOOZER, Kevin J.</strong> <em>The Drama of Doctrine: A Canonical-Linguistic Approach to Christian Theology.</em> Louisville: Westminster John Knox Press, 2005.</p>
    <p style="margin:0;font-size:15px;color:rgba(220,232,255,0.80);line-height:1.65;"><strong style="color:#fff;">VANHOOZER, Kevin J.</strong> <em>Is There a Meaning in This Text? The Bible, the Reader, and the Morality of Literary Knowledge.</em> Grand Rapids: Zondervan, 1998.</p>
    <p style="margin:0;font-size:15px;color:rgba(220,232,255,0.80);line-height:1.65;"><strong style="color:#fff;">WRIGHT, N. T.</strong> <em>Scripture and the Authority of God: How to Read the Bible Today.</em> New York: HarperOne, 2011.</p>
    <p style="margin:0;font-size:15px;color:rgba(220,232,255,0.80);line-height:1.65;"><strong style="color:#fff;">WRIGHT, N. T.</strong> <em>The New Testament and the People of God.</em> Minneapolis: Fortress Press, 1992.</p>
    <p style="margin:0;font-size:15px;color:rgba(220,232,255,0.80);line-height:1.65;"><strong style="color:#fff;">CALVINO, João.</strong> <em>Institutas da Religião Cristã.</em> São Paulo: UNESP / Cultura Cristã, 2008. Livro I, cap. 14.</p>
    <p style="margin:0;font-size:15px;color:rgba(220,232,255,0.80);line-height:1.65;"><strong style="color:#fff;">WEBSTER, John.</strong> <em>The Domain of the Word: Scripture and Theological Reason.</em> London: T&T Clark, 2012.</p>
  </div>
</div>
`,
    status: 'publicado',
    area: 'artigos',
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
