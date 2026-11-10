import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TeologiaAreaLayout, { type AreaTeologia, type PlanoCurso } from '../components/TeologiaAreaLayout';

const BG = '#060d1f';

type AreaInfo = AreaTeologia;

/* ─── Plano de curso: Teologia Política ─────────────────────────────────── */
const PLANO_POLITICA: PlanoCurso = {
  ementa: 'Estudo bíblico, histórico e confessional da relação entre o Reino de Deus e as autoridades civis. Fundamentos escriturísticos do governo civil; Agostinho e as duas cidades; a doutrina reformada do magistrado nas confissões (Escocesa, Belga, Helvética II, Heidelberg, Westminster e Batista de 1689); dois reinos e soberania das esferas; direito de resistência; liberdade religiosa e de consciência; justiça e bem comum; a vocação pública do cristão numa sociedade plural.',
  ficha: [
    { rotulo: 'Carga horária', valor: '12 aulas · 90 min cada (18 h)' },
    { rotulo: 'Formato', valor: 'Presencial, on-line ou híbrido' },
    { rotulo: 'Público', valor: 'Líderes, seminaristas, professores e membros adultos' },
    { rotulo: 'Pré-requisito', valor: 'Noções de teologia sistemática' },
    { rotulo: 'Natureza', valor: 'Curso livre · certificado de conclusão' },
  ],
  objetivoGeral: 'Capacitar o aluno a compreender e articular, a partir das Escrituras e da tradição confessional reformada, uma visão cristã da autoridade civil e da vida pública, vivendo com fidelidade a Cristo como cidadão do Reino e da cidade terrena.',
  objetivosEspecificos: [
    'Identificar e interpretar os principais textos bíblicos sobre o governo civil (Gn 9; Rm 13; 1Pe 2; Ap 13).',
    'Descrever o desenvolvimento histórico do pensamento político cristão, de Agostinho à Reforma e ao neocalvinismo.',
    'Comparar o que as confissões reformadas ensinam sobre o magistrado civil, a Igreja e a liberdade de consciência.',
    'Distinguir os modelos dos dois reinos e da soberania das esferas, avaliando pontos fortes e limites de cada um.',
    'Analisar à luz da Escritura questões públicas atuais (justiça, liberdade religiosa, limites do Estado).',
    'Formular um posicionamento cristão público que evite tanto o isolamento quanto a idolatria da política.',
  ],
  andragogia: [
    { t: 'Necessidade de saber', d: 'Cada aula parte de uma pergunta real — “por que isso importa para minha fé e minha cidade?” — antes de apresentar o conteúdo.' },
    { t: 'Autonomia do aprendiz', d: 'O adulto é corresponsável pelo próprio estudo: leituras prévias, escolha de casos e roteiro de pesquisa pessoal.' },
    { t: 'Experiência como recurso', d: 'A vivência do aluno como cidadão, eleitor, profissional e membro de igreja é ponto de partida para a reflexão bíblica.' },
    { t: 'Orientação para problemas', d: 'Os conteúdos são organizados em torno de dilemas concretos, não apenas de tópicos abstratos.' },
    { t: 'Motivação interna', d: 'O alvo é a formação do caráter e a obediência a Cristo — não apenas a informação ou a opinião política.' },
  ],
  metodologia: [
    { icon: '🎤', t: 'Aula expositiva dialogada', d: 'Exposição do texto bíblico e do tema, com perguntas abertas durante a aula.' },
    { icon: '📜', t: 'Leitura de fontes primárias', d: 'Leitura comentada das Escrituras, das confissões e de trechos de Agostinho, Calvino, Rutherford e Kuyper.' },
    { icon: '🧩', t: 'Estudo de caso', d: 'Situações reais (liberdade religiosa, leis, eleições) analisadas em grupo à luz da Escritura.' },
    { icon: '🗣️', t: 'Debate e seminário', d: 'Grupos defendem posições (dois reinos × soberania das esferas) com argumentação bíblica.' },
    { icon: '🗺️', t: 'Mapa conceitual', d: 'Síntese visual de cada aula, ligando texto bíblico, confissão e aplicação.' },
    { icon: '🙏', t: 'Aplicação devocional', d: 'Cada encontro termina com oração pelas autoridades (1Tm 2.1-2) e um compromisso prático.' },
  ],
  avaliacao: [
    'Participação nos debates e estudos de caso (contínua e formativa).',
    'Fichamento de uma fonte primária (confissão ou texto clássico).',
    'Quadro comparativo das confissões reformadas sobre o magistrado civil.',
    'Trabalho final: ensaio breve (3–5 páginas) com uma questão pública analisada biblicamente.',
    'Autoavaliação: o que mudou na minha forma de ver a política e a Igreja?',
  ],
  referencial: [
    { categoria: 'Fontes bíblicas e confessionais', itens: [
      'BÍBLIA. Português. Bíblia Sagrada: Almeida Revista e Atualizada. 2. ed. Barueri: Sociedade Bíblica do Brasil, 1993.',
      'BEEKE, Joel R.; FERGUSON, Sinclair B. (org.). Harmonia das confissões reformadas. São Paulo: Cultura Cristã, 2006.',
      'A CONFISSÃO de Fé de Westminster. São Paulo: Cultura Cristã, 2017.',
    ] },
    { categoria: 'Referencial teológico', itens: [
      'AGOSTINHO. A Cidade de Deus. Petrópolis: Vozes, 2012. 2 v.',
      'CALVINO, João. A instituição da religião cristã. São Paulo: Editora UNESP, 2009. t. 2, livro IV, cap. 20.',
      'KUYPER, Abraham. Calvinismo. São Paulo: Cultura Cristã, 2002.',
      'VANDRUNEN, David. Politics after Christendom: political theology in a fractured world. Grand Rapids: Zondervan Academic, 2020.',
    ] },
    { categoria: 'Referencial pedagógico e andragógico', itens: [
      'KNOWLES, Malcolm S.; HOLTON III, Elwood F.; SWANSON, Richard A. The adult learner: the definitive classic in adult education and human resource development. 8. ed. New York: Routledge, 2015.',
      'PAZMIÑO, Robert W. Temas fundamentais da educação cristã. São Paulo: Cultura Cristã, 2008.',
      'VELLA, Jane. Learning to listen, learning to teach: the power of dialogue in educating adults. 2. ed. San Francisco: Jossey-Bass, 2002.',
    ] },
    { categoria: 'Base legal', itens: [
      'BRASIL. [Constituição (1988)]. Constituição da República Federativa do Brasil. Brasília, DF: Presidência da República, 1988. Art. 5º, VI e IX; art. 205; art. 206, II e III.',
      'BRASIL. Lei nº 9.394, de 20 de dezembro de 1996. Estabelece as diretrizes e bases da educação nacional. Diário Oficial da União, Brasília, DF, 23 dez. 1996. Art. 1º.',
      'BRASIL. Decreto nº 5.154, de 23 de julho de 2004. Regulamenta o § 2º do art. 36 e os arts. 39 a 41 da Lei nº 9.394/1996. Diário Oficial da União, Brasília, DF, 26 jul. 2004. Art. 3º.',
    ] },
  ],
  legal: {
    selo: 'Curso livre · educação não formal',
    resumo: 'Este é um curso livre de formação teológica, oferecido como educação não formal. Cursos livres não dependem de autorização, credenciamento ou reconhecimento do Ministério da Educação (MEC), porque a legislação educacional brasileira regula apenas a educação escolar formal e garante a liberdade de ensinar, aprender e divulgar o pensamento.',
    leis: [
      { lei: 'Constituição Federal, art. 5º, VI e IX', texto: 'Garante a liberdade de consciência e de crença e a livre expressão da atividade intelectual, científica e de comunicação, independentemente de censura ou licença.' },
      { lei: 'Constituição Federal, arts. 205 e 206, II e III', texto: 'A educação é dever do Estado e da família, promovida com a colaboração da sociedade; o ensino se baseia na liberdade de aprender, ensinar, pesquisar e divulgar o pensamento e no pluralismo de ideias.' },
      { lei: 'Lei nº 9.394/1996 (LDB), art. 1º', texto: 'A educação abrange processos formativos que ocorrem também nas organizações da sociedade civil e nas manifestações culturais; a LDB disciplina a educação escolar (§ 1º). Cursos livres ficam fora dessa regulação.' },
      { lei: 'Decreto nº 5.154/2004, art. 3º', texto: 'Prevê cursos de formação inicial e continuada (capacitação, aperfeiçoamento, especialização e atualização) — base normativa usualmente invocada para a oferta de cursos livres no Brasil.' },
    ],
    avisos: [
      'Ao final, o aluno recebe certificado de conclusão de curso livre, com a carga horária cursada.',
      'O certificado não equivale a diploma de graduação ou pós-graduação, nem confere grau acadêmico.',
      'A carga horária pode ser aproveitada como atividade complementar ou formação continuada, a critério de cada instituição.',
      'Texto de caráter informativo; não substitui orientação jurídica.',
    ],
  },
  professor: {
    nome: 'Prof. Dr. Fabio Neves de Miranda',
    titulo: 'Doutor em Teologia Reformada · Teologia e Tecnologias',
    foto: '/fotos/foto1.jpg',
    resumo: 'Professor universitário há mais de 30 anos nas áreas de Teologia e Tecnologias. Idealizador da Bíblia Visual Expositiva, une exegese, teologia reformada e recursos visuais para tornar o estudo das Escrituras acessível a pastores, líderes, professores e famílias.',
    formacao: [
      { periodo: '2026–2028', grau: 'PhD (em curso)', area: 'Teologia Contemporânea' },
      { periodo: '2022–2026', grau: 'Doutorado', area: 'Teologia Reformada' },
      { periodo: '2012–2014', grau: 'Mestrado', area: 'Educação e Tecnologias' },
      { periodo: '2001–2006', grau: 'Bacharelado', area: 'Teologia Reformada' },
    ],
    atuacao: [
      'Docência universitária em Teologia e Tecnologias.',
      'Autor e coordenador da plataforma Bíblia Visual Expositiva.',
      'Discipulado confessional, pregação expositiva e educação cristã.',
    ],
    publicacoes: [
      'MIRANDA, Fabio Neves de. A racionalidade da interpretação bíblica em Kevin J. Vanhoozer: linguagem, cânon e conhecimento de Deus. Artefactum, v. 25, n. 8, 2026.',
    ],
    contato: 'contato@fabionmiranda.com',
  },
};

const AREAS_INFO: Record<string, AreaInfo> = {
  reformada: {
    titulo: 'Teologia Reformada',
    descricao: 'Os fundamentos da tradição reformada — soberania de Deus, graça soberana, as solas da Reforma e os grandes teólogos que moldaram a fé protestante.',
    icon: '⛪',
    cor: '#00D4FF',
    materias: [
      { nome: 'As Cinco Solas', desc: 'Sola Scriptura, Sola Fide, Sola Gratia, Solus Christus, Soli Deo Gloria', icon: '✋' },
      { nome: 'Soberania de Deus', desc: 'A absoluta supremacia divina sobre a criação, providência e salvação', icon: '👑' },
      { nome: 'A Doutrina da Graça', desc: 'Os pontos do Calvinismo — TULIP — e sua base bíblica e histórica', icon: '🌊' },
      { nome: 'Calvino e os Reformadores', desc: 'Vida, obra e teologia de João Calvino, Lutero, Zuínglio e Bucer', icon: '📚' },
      { nome: 'A Escolástica Reformada', desc: 'Turretin, Owen, Bavinck — o desenvolvimento da ortodoxia reformada', icon: '🏛️' },
      { nome: 'Confissionalismo Reformado', desc: 'A importância das confissões como padrão de ensino eclesiástico', icon: '📜' },
    ],
  },
  sistematica: {
    titulo: 'Teologia Sistemática',
    descricao: 'O estudo ordenado das doutrinas cristãs — de Deus, da criação, do homem, de Cristo, da salvação, da Igreja e das últimas coisas.',
    icon: '📐',
    cor: '#a78bfa',
    materias: [
      { nome: 'Teologia Própria', desc: 'A doutrina de Deus: Trindade, atributos, decretos e nomes divinos', icon: '✨' },
      { nome: 'Cristologia', desc: 'A pessoa e obra de Jesus Cristo — encarnação, expiação e ressurreição', icon: '✝️' },
      { nome: 'Pneumatologia', desc: 'A pessoa e obra do Espírito Santo na criação, revelação e salvação', icon: '🕊️' },
      { nome: 'Soteriologia', desc: 'A doutrina da salvação — eleição, chamada, regeneração, justificação, santificação e glorificação', icon: '⚓' },
      { nome: 'Eclesiologia', desc: 'A natureza, governo, sacramentos e missão da Igreja', icon: '🏛️' },
      { nome: 'Escatologia', desc: 'As últimas coisas — morte, ressurreição, julgamento e nova criação', icon: '🌅' },
      { nome: 'Credos e Confissões', desc: 'Credo Apostólico, Niceno, Calcedônia, Westminster, Heidelberg e Cânones de Dort como padrões doutrinários da fé cristã', icon: '📜', link: '/teologia/credos' },
    ],
  },
  biblica: {
    titulo: 'Teologia Bíblica',
    descricao: 'O desenvolvimento progressivo da revelação divina ao longo das Escrituras — da promessa ao cumprimento.',
    icon: '📖',
    cor: '#34d399',
    materias: [
      { nome: 'Historia Redemptionis', desc: 'A história da redenção como estrutura interpretativa das Escrituras', icon: '🗺️' },
      { nome: 'Tipologia Bíblica', desc: 'Pessoas, eventos e instituições do AT como tipos do NT', icon: '🔗' },
      { nome: 'Profecia e Cumprimento', desc: 'Como o AT aponta para Cristo e a nova aliança', icon: '🎯' },
      { nome: 'Teologia do Antigo Testamento', desc: 'Os grandes temas teológicos do AT — aliança, lei, sacrifício, reino', icon: '✡️' },
      { nome: 'Teologia do Novo Testamento', desc: 'Os grandes temas do NT — Reino de Deus, cristologia, Igreja, escatologia', icon: '✝️' },
      { nome: 'Canon e Autoridade', desc: 'A formação e canonicidade das Escrituras do AT e NT', icon: '📋' },
    ],
  },
  exegetica: {
    titulo: 'Teologia Exegética',
    descricao: 'Métodos e princípios de interpretação das Escrituras — hermenêutica, análise gramatical-histórica e línguas bíblicas.',
    icon: '🔍',
    cor: '#f472b6',
    materias: [
      { nome: 'Hermenêutica Bíblica', desc: 'Princípios e métodos de interpretação da Escritura', icon: '🔑' },
      { nome: 'Grego Bíblico', desc: 'Introdução ao grego koinê do Novo Testamento', icon: '🇬🇷' },
      { nome: 'Hebraico Bíblico', desc: 'Introdução ao hebraico do Antigo Testamento', icon: '✡️' },
      { nome: 'Análise Gramatical-Histórica', desc: 'O método histórico-gramatical de interpretação textual', icon: '📝' },
      { nome: 'Crítica Textual', desc: 'Manuscritos, variantes e a transmissão do texto bíblico', icon: '🔬' },
      { nome: 'Exegese Aplicada', desc: 'Da análise do texto à pregação e ensino fiel', icon: '🎙️' },
    ],
  },
  historica: {
    titulo: 'Teologia Histórica',
    descricao: 'A trajetória do pensamento cristão através dos séculos — da era apostólica à modernidade.',
    icon: '🏛️',
    cor: '#fb923c',
    materias: [
      { nome: 'Era Apostólica e Patrística', desc: 'Os Padres da Igreja — Inácio, Ireneu, Tertuliano, Agostinho', icon: '📜' },
      { nome: 'Os Grandes Concílios', desc: 'Niceia, Constantinopla, Éfeso, Calcedônia — as decisões que moldaram a fé', icon: '⛩️' },
      { nome: 'Teologia Medieval', desc: 'Anselmo, Tomás de Aquino e a síntese escolástica', icon: '🏰' },
      { nome: 'A Reforma Protestante', desc: 'Lutero, Calvino e a ruptura com Roma — causas e consequências', icon: '⚡' },
      { nome: 'Ortodoxia e Pietismo', desc: 'A escolástica reformada e o movimento pietista (séc. XVII–XVIII)', icon: '📚' },
      { nome: 'Modernidade e Reação', desc: 'Iluminismo, liberalismo teológico e a resposta conservadora', icon: '🌊' },
      { nome: 'Credos e Confissões', desc: 'Credo Apostólico, Niceno, Calcedônia, Westminster, Heidelberg e Cânones de Dort — os grandes documentos doutrinários que a Igreja forjou ao longo dos séculos', icon: '📜', link: '/teologia/credos' },
    ],
  },
  pastoral: {
    titulo: 'Teologia Pastoral-Prática',
    descricao: 'A teologia no serviço da Igreja — pregação, aconselhamento, liderança, educação cristã e cuidado das almas.',
    icon: '🌿',
    cor: '#4ade80',
    materias: [
      { nome: 'Educação Cristã para Igrejas', desc: 'Como a igreja local ensina, discipula e forma as gerações — da catequese à escola dominical, do jovem ao adulto', icon: '📚', link: '/teologia/pastoral/educacao-crista' },
      { nome: 'Homilética', desc: 'A arte e ciência da pregação expositiva e cristocêntrica', icon: '🎙️', link: '/teologia/pastoral/homiletica' },
      { nome: 'Aconselhamento Bíblico', desc: 'O cuidado pastoral das almas à luz das Escrituras', icon: '🤝' },
      { nome: 'Liderança Pastoral', desc: 'O ofício do pastor-pregador — vocação, caráter e ministério', icon: '👨‍🏫' },
      { nome: 'Liturgia e Culto', desc: 'A adoração regulada pela Escritura — princípio regulador do culto', icon: '🕊️' },
      { nome: 'Sacramentos', desc: 'Batismo e Ceia do Senhor — natureza, modo e significado', icon: '🍞' },
      { nome: 'Evangelização em Cidades', desc: 'Fundamentos bíblicos e estratégias para o anúncio do Evangelho no contexto urbano — apologética, proclamação e evangelismo relacional', icon: '📢' },
      { nome: 'Missões Urbanas', desc: 'Teologia e prática da missão nas grandes cidades — pluralidade cultural, plantio de igrejas em centros metropolitanos e alcance de grupos vulneráveis', icon: '🏙️' },
      { nome: 'Disciplina Eclesiástica', desc: 'A disciplina como ato de amor e preservação da Igreja', icon: '⚖️' },
    ],
  },
  pacto: {
    titulo: 'Teologia do Pacto',
    descricao: 'A estrutura pactual da revelação bíblica — chave hermenêutica para compreender as Escrituras do Éden à Nova Criação.',
    icon: '🤝',
    cor: '#38bdf8',
    materias: [
      { nome: 'O Pacto das Obras', desc: 'Adão como cabeça federal da humanidade no jardim do Éden', icon: '🌿' },
      { nome: 'O Pacto da Redenção', desc: 'O acordo eterno entre Pai, Filho e Espírito para a salvação dos eleitos', icon: '✨' },
      { nome: 'O Pacto da Graça', desc: 'A aliança de misericórdia desde a protoevangelha (Gn 3:15)', icon: '🌊' },
      { nome: 'Pactos do Antigo Testamento', desc: 'Noé, Abraão, Moisés, Davi — unidade e distinção', icon: '📋' },
      { nome: 'A Nova Aliança', desc: 'O cumprimento em Cristo de todas as promessas pactuais', icon: '✝️' },
      { nome: 'Lei e Evangelho', desc: 'A relação entre a lei mosaica e o evangelho da graça', icon: '⚖️' },
    ],
  },
  contemporanea: {
    titulo: 'Teologia Contemporânea',
    descricao: 'Os grandes movimentos teológicos dos séculos XX e XXI e o diálogo da fé com a cultura atual.',
    icon: '🌐',
    cor: '#c084fc',
    materias: [
      { nome: 'Karl Barth e a Neo-Ortodoxia', desc: 'A reação à teologia liberal e a centralidade de Cristo na revelação', icon: '📚' },
      { nome: 'Pós-liberalismo', desc: 'Lindbeck, Hauerwas e a teologia narrativa pós-liberal', icon: '📖' },
      { nome: 'Teologia da Libertação', desc: 'Contexto, proposta e avaliação crítica reformada', icon: '✊' },
      { nome: 'Teologia do Processo', desc: 'Whitehead, Hartshorne — a metafísica processual e seus limites', icon: '⚙️' },
      { nome: 'Abertura Divina (Open Theism)', desc: 'A negação da presciência divina e a resposta reformada', icon: '🚪' },
      { nome: 'Fé e Pós-Modernidade', desc: 'O desafio pós-moderno e a apologética cristã contemporânea', icon: '🌐' },
    ],
  },
  missional: {
    titulo: 'Teologia Missional',
    descricao: 'A missão como atributo do próprio Deus — Missio Dei, encarnação, plantio de igrejas e a Igreja no mundo.',
    icon: '🌍',
    cor: '#86efac',
    materias: [
      { nome: 'Missio Dei', desc: 'A missão como iniciativa e propriedade de Deus — não apenas da Igreja', icon: '✨' },
      { nome: 'Teologia da Encarnação', desc: 'A encarnação como modelo de presença e engajamento cultural', icon: '🌱' },
      { nome: 'Evangelização e Apologética', desc: 'O testemunho verbal do evangelho e a defesa racional da fé', icon: '🎙️' },
      { nome: 'Plantio de Igrejas', desc: 'Princípios bíblicos e estratégias para o estabelecimento de igrejas', icon: '🏗️' },
      { nome: 'Teologia das Religiões', desc: 'Exclusivismo, inclusivismo, pluralismo — e a singularidade de Cristo', icon: '🌐' },
      { nome: 'Contextualização', desc: 'Como comunicar o evangelho sem comprometer sua essência', icon: '🔄' },
    ],
  },
  educacional: {
    titulo: 'Teologia Educacional',
    descricao: 'A fé cristã como fundamento de toda educação — cosmovisão bíblica, formação integral da pessoa, família, escola e cultura. Toda educação é teológica: a questão não é se Deus será o centro do ensino, mas qual deus ocupará esse lugar.',
    icon: '🏫',
    cor: '#f9a8d4',
    materias: [
      { nome: 'Cosmovisão Cristã', desc: 'A visão de mundo bíblica como fundamento de toda reflexão educacional — criação, queda, redenção e restauração', icon: '🌍' },
      { nome: 'Paideia Cristã', desc: 'A tradição clássica cristã de formação integral — mente, coração e virtude à luz das Escrituras', icon: '📚' },
      { nome: 'Família como Escola Primária', desc: 'O papel insubstituível dos pais como primeiros educadores na fé reformada', icon: '🏠' },
      { nome: 'Educação Clássica e Trivium', desc: 'Gramática, Lógica e Retórica como método de formação do pensamento cristão', icon: '🎓' },
      { nome: 'Teologia e Cultura', desc: 'Como a fé transforma a arte, a ciência, a filosofia e todas as esferas da vida humana', icon: '🎨' },
      { nome: 'Apologética na Educação', desc: 'Defender e articular a fé cristã no diálogo com o pensamento secular contemporâneo', icon: '🛡️' },
    ],
  },
  digital: {
    titulo: 'Teologia Digital',
    descricao: 'Como a fé cristã interpreta e responde ao mundo digital — inteligência artificial, ética tecnológica, humanidade, imagem de Deus e cultura digital. A pergunta não é apenas "o que a tecnologia pode fazer?" mas "o que ela faz com o ser humano?"',
    icon: '💻',
    cor: '#67e8f9',
    materias: [
      { nome: 'Imago Dei e Inteligência Artificial', desc: 'O que significa ser humano feito à imagem de Deus diante de máquinas que simulam inteligência e criatividade', icon: '🤖' },
      { nome: 'Ética Digital e Redes Sociais', desc: 'Verdade, identidade, comunidade e virtude no ambiente das plataformas digitais', icon: '📱' },
      { nome: 'Transhumanismo', desc: 'A ideologia do aprimoramento humano ilimitado e a resposta da antropologia cristã', icon: '🧬' },
      { nome: 'Privacidade e Vigilância', desc: 'Dignidade humana, poder e controle na era dos dados — uma reflexão à luz da criação e da queda', icon: '🔐' },
      { nome: 'Tecnologia e Adoração', desc: 'Como o uso das tecnologias no culto afeta a espiritualidade, a comunidade e a experiência de Deus', icon: '⛪' },
      { nome: 'Ministério e Mundo Digital', desc: 'Evangelismo, discipulado e presença da Igreja no ambiente online — possibilidades e limites', icon: '🌐' },
    ],
  },
  politica: {
    titulo: 'Teologia Política',
    descricao: 'A relação entre o Reino de Deus e os reinos deste mundo. Como o cristão deve se relacionar com o Estado, a lei e a vida pública? A pergunta não é se a fé tem implicações públicas, mas quais são — e até onde vai a autoridade de cada esfera diante do senhorio de Cristo.',
    icon: '⚖️',
    cor: '#fbbf24',
    plano: PLANO_POLITICA,
    materias: [
      { nome: 'Fundamentos Bíblicos da Autoridade Civil', desc: 'Gn 9.6, Rm 13.1-7, 1Pe 2.13-17 e Ap 13 — o Estado como ministro de Deus e seus limites', icon: '📜', refs: { pt: 'GRUDEM, Wayne. Política segundo a Bíblia: princípios que todo cristão deve conhecer. São Paulo: Vida Nova, 2014.', en: 'VANDRUNEN, David. Politics after Christendom: political theology in a fractured world. Grand Rapids: Zondervan Academic, 2020.' } },
      { nome: 'Igreja e Estado', desc: 'Jurisdições distintas sob o mesmo Senhor: o que pertence a César e o que pertence a Deus (Mt 22.21)', icon: '🏛️', refs: { pt: 'KUYPER, Abraham. Calvinismo. São Paulo: Cultura Cristã, 2002. (Palestra 3: Calvinismo e política).', en: 'KUYPER, Abraham. Our program: a Christian political manifesto. Bellingham: Lexham Press, 2015.' } },
      { nome: 'Agostinho e as Duas Cidades', desc: 'A Cidade de Deus e a cidade terrena — peregrinos que buscam a paz da cidade em que vivem (Jr 29.7)', icon: '🏙️', refs: { pt: 'AGOSTINHO. A Cidade de Deus. Petrópolis: Vozes, 2012. 2 v.', en: 'SMITH, James K. A. Awaiting the King: reforming public theology. Grand Rapids: Baker Academic, 2017.' } },
      { nome: 'Os Dois Reinos e a Reforma', desc: 'Lutero, Calvino (Institutas IV.20) e a doutrina reformada do magistrado civil (CFW XXIII; CFB 1689 XXIV)', icon: '⛪', refs: { pt: 'CALVINO, João. A instituição da religião cristã. São Paulo: Editora UNESP, 2009. t. 2, livro IV, cap. 20.', en: 'VANDRUNEN, David. Living in God’s two kingdoms: a biblical vision for Christianity and culture. Wheaton: Crossway, 2010.' } },
      { nome: 'As Confissões Continentais e o Magistrado', desc: 'Confissão Escocesa (1560) cap. 24, Confissão Belga (1561) art. 36, Segunda Confissão Helvética (1566) cap. 30 e Catecismo de Heidelberg P. 104: o governo civil instituído por Deus para restringir o mal, promover a justiça e proteger a Igreja — e o dever cristão de honrar, obedecer e orar pelas autoridades, salvo contra a Palavra de Deus (At 5.29)', icon: '🗺️', refs: { pt: 'BEEKE, Joel R.; FERGUSON, Sinclair B. (org.). Harmonia das confissões reformadas. São Paulo: Cultura Cristã, 2006.', en: 'DENNISON JR., James T. (ed.). Reformed confessions of the 16th and 17th centuries in English translation. Grand Rapids: Reformation Heritage Books, 2008–2014. 4 v.' } },
      { nome: 'Westminster: o Magistrado Civil e os Sínodos', desc: 'CFW XXIII (o magistrado ordenado por Deus para a glória dele e o bem público; a revisão americana de 1788 retira do Estado o poder sobre a Igreja), XX.4 (liberdade cristã e poder legítimo), XXXI (sínodos tratam só de assuntos eclesiásticos) e o 5º mandamento no Catecismo Maior P. 123–133', icon: '📖', refs: { pt: 'HODGE, A. A. Confissão de Fé de Westminster comentada. São Paulo: Os Puritanos, 1999.', en: 'VAN DIXHOORN, Chad. Confessing the faith: a reader’s guide to the Westminster Confession of Faith. Edinburgh: Banner of Truth, 2014.' } },
      { nome: 'A Confissão Batista de 1689 e a Liberdade da Igreja', desc: 'CFB 1689 XXIV (o magistrado como ministro de Deus para o bem, sem jurisdição sobre a Igreja), XXI (Deus é o único Senhor da consciência) e XXVI (Cristo, único Cabeça da Igreja): como os batistas particulares reescreveram Westminster e Savoy na direção da liberdade religiosa', icon: '📘', refs: { pt: 'WALDRON, Samuel E. Uma exposição moderna da Confissão de Fé Batista de 1689. São José dos Campos: Fiel, 2014. cap. 24.', en: 'WALDRON, Samuel E. A modern exposition of the 1689 Baptist Confession of Faith. 5. ed. Darlington: Evangelical Press, 2016. ch. 24.' } },
      { nome: 'Soberania das Esferas', desc: 'Abraham Kuyper e o neocalvinismo — família, Igreja, Estado e sociedade, cada um sob a autoridade direta de Cristo', icon: '🌐', refs: { pt: 'DOOYEWEERD, Herman. No crepúsculo do pensamento ocidental. São Paulo: Hagnos, 2010.', en: 'KUYPER, Abraham. Sphere sovereignty. In: BRATT, James D. (ed.). Abraham Kuyper: a centennial reader. Grand Rapids: Eerdmans, 1998. p. 461-490.' } },
      { nome: 'Lex, Rex e o Direito de Resistência', desc: 'Samuel Rutherford, a tradição constitucional e os limites do poder dos governantes', icon: '👑', refs: { pt: 'FERREIRA, Franklin. Contra a idolatria do Estado: o papel do cristão na política. São Paulo: Vida Nova, 2016.', en: 'RUTHERFORD, Samuel. Lex, Rex, or the law and the prince. London: John Field, 1644.' } },
      { nome: 'Liberdade Religiosa e de Consciência', desc: 'Os batistas, Roger Williams e a defesa da liberdade de consciência (CFB 1689 XXI; CFW XX)', icon: '🕊️', refs: { pt: 'WALDRON, Samuel E. Uma exposição moderna da Confissão de Fé Batista de 1689. São José dos Campos: Fiel, 2014. cap. 21.', en: 'BYRD, James P. The challenges of Roger Williams: religious liberty, violent persecution, and the Bible. Macon: Mercer University Press, 2002.' } },
      { nome: 'Justiça, Lei e Bem Comum', desc: 'A lei natural, a lei moral de Deus e a busca da justiça pública numa sociedade plural', icon: '⚖️', refs: { pt: 'KELLER, Timothy. Justiça generosa: a graça de Deus e a justiça social. São Paulo: Vida Nova, 2013.', en: 'WOLTERSTORFF, Nicholas. Justice: rights and wrongs. Princeton: Princeton University Press, 2008.' } },
      { nome: 'O Cristão na Esfera Pública', desc: 'Voto, engajamento cívico, oração pelas autoridades (1Tm 2.1-2) e testemunho profético sem idolatrar a política', icon: '🗳️', refs: { pt: 'SCHAEFFER, Francis A. Como viveremos? São Paulo: Cultura Cristã, 2003.', en: 'MOUW, Richard J. Uncommon decency: Christian civility in an uncivil world. Downers Grove: InterVarsity Press, 1992.' } },
    ],
  },
};

export default function TeologiaAreaPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const area = AREAS_INFO[slug];

  if (!area) {
    return (
      <div style={{ minHeight: '100vh', background: BG, color: '#fff' }}>
        <Navbar />
        <div style={{ maxWidth: 700, margin: '0 auto', padding: 'clamp(88px,11vw,108px) 24px 60px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>404</div>
          <div style={{ color: 'rgba(255,255,255,0.50)', marginBottom: 24 }}>Área não encontrada.</div>
          <button onClick={() => navigate('/teologia')} style={{ all: 'unset', cursor: 'pointer', color: '#00D4FF', fontWeight: 700 }}>
            ← Voltar para Teologia
          </button>
        </div>
      </div>
    );
  }

  return <TeologiaAreaLayout area={area} />;
}
