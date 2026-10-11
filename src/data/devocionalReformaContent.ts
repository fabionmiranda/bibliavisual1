export interface SecaoDia {
  tipo: 'contexto' | 'analise' | 'reflexao' | 'oracao' | 'leitura';
  titulo: string;
  paragrafos: string[];
  citacao?: string;
  citacaoAutor?: string;
}

export interface DiaDevoContent {
  dia: number;
  data: string;
  titulo: string;
  subtitulo: string;
  versiculo: string;
  versiculoRef: string;
  secoes: SecaoDia[];
  perguntas: string[];
  oracao: string;
  leituraComplementar: string;
}

const DIAS_CONTENT: Record<number, DiaDevoContent> = {
  7: {
    dia: 7,
    data: '7 de outubro de 2026',
    titulo: 'A Teologia de Lutero: Os Dois Reinos e os Sacramentos',
    subtitulo: 'Capítulo 3 — Parte 2',
    versiculo: 'Ide, portanto, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo.',
    versiculoRef: 'Mateus 28.19',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'Dois Temas que Dividiram a Reforma',
        paragrafos: [
          'Ontem exploramos as distinções centrais da teologia de Lutero: a Teologia da Cruz, a distinção Lei/Evangelho e a justificação pela fé. Hoje completamos o panorama com dois temas igualmente decisivos: a doutrina dos <span style="color:#fbbf24;font-weight:700;">Dois Reinos</span> — que explica como Lutero pensava a relação entre fé e vida pública — e a doutrina dos <span style="color:#c084fc;font-weight:700;">sacramentos</span>, que seria o <span style="color:#fb7185;font-weight:600;">ponto de ruptura entre Lutero e os outros reformadores</span>.',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'Os Dois Reinos: Deus Governa de Duas Formas',
        paragrafos: [
          'Lutero desenvolveu a doutrina dos <strong style="color:#fbbf24;">Dois Reinos</strong>: Deus governa o mundo por dois meios diferentes, com lógicas diferentes. No <span style="color:#34d399;font-weight:700;">reino espiritual</span> — a Igreja, a fé, a salvação — Deus governa pelo <span style="color:#34d399;font-weight:600;">Evangelho, pela graça, pela Palavra</span>. No <span style="color:#60a5fa;font-weight:700;">reino temporal</span> — o Estado, a família, a economia — Deus governa pela <span style="color:#60a5fa;font-weight:600;">razão, pela lei e, quando necessário, pela coerção</span>. Os dois reinos são distintos, mas <strong style="color:#fff;">ambos são de Deus</strong>.',
          'Isso tem consequências práticas enormes. O cristão vive simultaneamente nos dois reinos: como <span style="color:#34d399;font-weight:600;">crente</span>, vive sob o Evangelho; como <span style="color:#60a5fa;font-weight:600;">cidadão, pai, juiz ou soldado</span>, vive sob a lei temporal. <span style="background:rgba(251,191,36,0.12);border-left:3px solid #fbbf24;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,245,210,0.95);">As normas de um reino não se aplicam diretamente ao outro.</span> Um juiz que absolvesse todos os criminosos "por amor cristão" estaria confundindo os reinos — assim como um pregador que usasse o Estado para impor a fé.',
          'González observa o <span style="color:#fb7185;font-weight:700;">risco histórico</span> desta doutrina: ela foi usada para justificar o <span style="background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.30);border-radius:5px;padding:1px 7px;color:#fecdd3;font-weight:700;">quietismo político</span> — cristãos que se recusavam a resistir a governos injustos porque "o reino temporal não é assunto da Igreja." Lutero mesmo a usou para apoiar a brutal <span style="color:#fb7185;font-weight:600;">repressão da Revolta dos Camponeses em 1525</span>. A doutrina é válida; <em>os usos podem ser distorcidos.</em>',
        ],
        citacao: 'Os dois reinos são distintos, mas ambos são de Deus. A arte cristã está em viver fielmente em cada um sem confundir as lógicas de ambos.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'Sola Scriptura: A Palavra como Autoridade Final',
        paragrafos: [
          'Em Worms, Lutero declarou que sua consciência estava <span style="background:rgba(192,132,252,0.15);border:1px solid rgba(192,132,252,0.35);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;font-style:italic;">"presa à Palavra de Deus."</span> Essa afirmação resume o princípio que ficou conhecido como <strong style="color:#c084fc;">Sola Scriptura</strong>: a Escritura tem autoridade final sobre <span style="color:#fb7185;font-weight:600;">papas, concílios e tradição</span>.',
          'Mas é preciso entender o que Lutero quis dizer — e o que <em>não</em> quis. Ele não estava afirmando que cada cristão lê a Bíblia sozinho e chega às suas próprias conclusões sem qualquer mediação. Estava afirmando que, <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">quando a tradição eclesiástica contradiz a Escritura, a Escritura vence.</span>',
          'Para Lutero, <span style="color:#fbbf24;font-weight:700;">"Escritura"</span> era, antes de tudo, <strong style="color:#fff;">o que testifica de Cristo</strong>. O centro da Bíblia é o Evangelho de Jesus Cristo. Qualquer interpretação que afaste o leitor de Cristo — mesmo que autorizada por Roma — está errada. A Escritura não é um conjunto de proposições inerrantes; é <span style="color:#34d399;font-style:italic;">o meio pelo qual Cristo chega até o leitor.</span>',
        ],
        citacao: 'A Escritura não é um conjunto de proposições a defender. É o meio pelo qual Cristo chega até o leitor — e esse critério cristológico deve guiar toda interpretação.',
        citacaoAutor: 'Martinho Lutero',
      },
      {
        tipo: 'analise',
        titulo: 'Os Sacramentos: O Ponto de Ruptura com Zuínglio',
        paragrafos: [
          'Lutero manteve apenas <span style="color:#fbbf24;font-weight:700;">dois sacramentos</span> — <span style="color:#60a5fa;font-weight:600;">batismo</span> e <span style="color:#60a5fa;font-weight:600;">Ceia do Senhor</span> — rejeitando os cinco adicionais medievais. Para ele, os sacramentos são <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;font-style:italic;">"Palavra visível"</span> — a mesma graça proclamada no sermão, tornada presente e tangível em forma física.',
          'Na Ceia do Senhor, Lutero sustentou a <span style="color:#c084fc;font-weight:700;">presença real de Cristo</span> no pão e no vinho — não a <span style="color:#fb7185;font-weight:600;">transubstanciação</span> (a substância do pão se transforma), mas a <span style="color:#a78bfa;font-weight:700;">consubstanciação</span>: Cristo está <em>verdadeiramente presente junto com</em> o pão e o vinho. <span style="background:rgba(192,132,252,0.15);border:1px solid rgba(192,132,252,0.35);border-radius:5px;padding:2px 10px;color:#e9d5ff;font-weight:700;font-style:italic;">"Isto é meu corpo"</span> significa, para Lutero, exatamente o que diz.',
          '<strong style="color:#fff;">Zuínglio</strong>, em Zurique, discordava radicalmente: para ele, <span style="color:#34d399;font-style:italic;">"isto é meu corpo"</span> significa <span style="color:#34d399;font-style:italic;">"isto representa meu corpo."</span> A Ceia é <span style="color:#34d399;font-weight:600;">memorial</span>, não presença real. Em <span style="color:#60a5fa;font-weight:700;">1529</span>, no <span style="color:#f97316;font-weight:700;">Colóquio de Marburgo</span>, Lutero e Zuínglio tentaram chegar a acordo. <strong style="color:#fb7185;">Não conseguiram.</strong> <span style="background:rgba(251,113,133,0.12);border-left:3px solid #fb7185;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,220,225,0.95);">A Reforma Protestante nasceu dividida — e essa divisão persiste até hoje.</span>',
        ],
        citacao: 'A Reforma Protestante nasceu dividida. Lutero e Zuínglio concordavam no Evangelho e discordavam na Ceia — e essa tensão moldou o protestantismo para sempre.',
        citacaoAutor: 'Justo L. González',
      },
    ],
    perguntas: [
      'A doutrina dos Dois Reinos distingue a lógica do Evangelho da lógica da ordem política. Onde você vê cristãos confundindo os dois — aplicando a coerção do Estado onde deveria valer a graça, ou esperando do Estado o que só a Igreja pode fazer?',
      'Lutero disse que a Escritura é autoridade final não como coleção de proposições, mas como testemunho de Cristo. Como esse critério cristológico deveria guiar a sua leitura da Bíblia?',
      'A divisão entre Lutero e Zuínglio sobre a Ceia ocorreu dentro do mesmo movimento reformador. O que esse episódio diz sobre como comunidades que compartilham convicções centrais podem se dividir em questões secundárias? Como você navega esse tipo de tensão na sua própria comunidade de fé?',
    ],
    oracao: 'Senhor, obrigado por falar de duas formas ao mundo: pela lei que ordena a vida em comunidade, e pelo Evangelho que liberta a consciência. Guarda-nos de confundir as duas vozes — de transformar o Evangelho em coerção ou de esperar da lei temporal o que só a graça pode dar.\n\nQue a Tua Palavra seja sempre nossa ancoragem: não como código de proposições a defender, mas como testemunho vivo de Cristo que nos encontra onde estamos.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. Capítulo 3: "A Teologia de Martinho Lutero" (pp. 53–74). [Parte 2 — foco nos Dois Reinos, Sola Scriptura e sacramentos]',
  },
  6: {
    dia: 6,
    data: '6 de outubro de 2026',
    titulo: 'A Teologia de Lutero: Cruz, Lei e Evangelho',
    subtitulo: 'Capítulo 3 — Parte 1',
    versiculo: 'Mas longe esteja de mim gloriar-me, senão na cruz de nosso Senhor Jesus Cristo, pela qual o mundo está crucificado para mim, e eu para o mundo.',
    versiculoRef: 'Gálatas 6.14',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'Da Biografia à Teologia: Ideias Forjadas na Forja da Vida',
        paragrafos: [
          'Nos últimos dois dias, acompanhamos Lutero na sua peregrinação espiritual: do mosteiro ao púlpito, da angústia à descoberta, de Wittenberg a Worms. Hoje deixamos a biografia e entramos na <strong style="color:#fff;">teologia</strong>. Que ideias centrais Lutero desenvolveu a partir dessas experiências?',
          'González nos apresenta não um sistema abstrato, mas um conjunto de <span style="color:#fbbf24;font-weight:700;">distinções pastorais forjadas na forja da vida</span>. A teologia de Lutero não começa com axiomas filosóficos — começa com a pergunta que o atormentou por anos: <span style="background:rgba(192,132,252,0.15);border:1px solid rgba(192,132,252,0.35);border-radius:5px;padding:2px 10px;color:#e9d5ff;font-weight:700;font-style:italic;">como posso estar em paz com um Deus justo?</span>',
        ],
        citacao: 'A teologia de Lutero não começa com axiomas filosóficos. Começa com a pergunta que o atormentou por anos: como posso estar em paz com um Deus justo?',
      },
      {
        tipo: 'analise',
        titulo: 'Teologia da Glória vs. Teologia da Cruz',
        paragrafos: [
          'A distinção mais profunda de Lutero é, ao mesmo tempo, a mais contracultural: a diferença entre a <span style="color:#fb7185;font-weight:800;">teologia da glória</span> e a <span style="color:#34d399;font-weight:800;">teologia da cruz</span>.',
          'A <span style="color:#fb7185;font-weight:700;">teologia da glória</span> é o impulso natural da religião humana: buscar Deus onde esperamos encontrá-lo — no <span style="color:#fb7185;font-weight:600;">poder, na grandeza, no esplendor, no êxito</span>. É a teologia que associa a bênção divina com prosperidade e prestígio. É a teologia que faz o pecador perguntar: <span style="color:#fb7185;font-style:italic;">"o que preciso fazer para que Deus me aprove?"</span>',
          'A <span style="color:#34d399;font-weight:700;">teologia da cruz</span> vai na direção oposta. Ela insiste que <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">Deus se revela onde menos esperamos — na fraqueza, no sofrimento, no escândalo de um crucificado.</span> Deus não se esconde nos palácios dos poderosos; revela-se no madeiro de uma <span style="color:#f97316;font-weight:600;">execução romana</span>. Qualquer teologia que não passe pela cruz está, na verdade, <strong style="color:#fff;">evitando o Deus que se revelou em Cristo</strong>.',
          'Para Lutero, isso não é apenas doutrina. É <span style="color:#a78bfa;font-weight:700;">epistemologia</span>: a maneira como conhecemos a Deus determina tudo o que diremos sobre Ele. E a Escritura nos diz que Deus escolheu se revelar <em>onde os sábios não procuram</em>.',
        ],
        citacao: 'Qualquer teologia que não passe pela cruz está, na verdade, evitando o Deus que se revelou em Cristo.',
        citacaoAutor: 'Martinho Lutero',
      },
      {
        tipo: 'analise',
        titulo: 'Lei e Evangelho: A Distinção Fundamental',
        paragrafos: [
          'Talvez a contribuição mais prática de Lutero seja a distinção entre <span style="color:#fb7185;font-weight:800;">Lei</span> e <span style="color:#34d399;font-weight:800;">Evangelho</span> — e a insistência de que <span style="background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.30);border-radius:5px;padding:1px 7px;color:#fecdd3;font-weight:700;">confundi-los é o erro pastoral mais comum e mais destrutivo</span>.',
          'Lei e Evangelho <strong style="color:#fff;">não são o Antigo e o Novo Testamento.</strong> São dois modos simultâneos pelos quais Deus fala. A <span style="color:#fb7185;font-weight:700;">Lei</span> diz: <span style="color:#fb7185;font-style:italic;">"tu deves"</span> — e ao revelar o que devemos, revela também que não cumprimos. A Lei <span style="color:#fb7185;font-weight:600;">diagnostica o pecado; não o cura.</span> O <span style="color:#34d399;font-weight:700;">Evangelho</span> diz: <span style="color:#34d399;font-style:italic;">"tu és perdoado em Cristo"</span> — e ao revelar o perdão, liberta o crente da espiral de autoprovação que a Lei por si só intensifica.',
          'O erro da piedade medieval era tratar a Lei como se fosse Evangelho: dizer ao pecador angustiado <span style="color:#fb7185;font-style:italic;">"faça mais obras, ore mais, confesse mais"</span> quando ele precisava ouvir <span style="color:#34d399;font-style:italic;">"em Cristo, você é perdoado gratuitamente."</span> <span style="background:rgba(251,191,36,0.12);border-left:3px solid #fbbf24;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,245,210,0.95);">O remédio era transformado em veneno ao ser administrado no lugar errado.</span>',
        ],
        citacao: 'Toda boa pregação deve deixar a Lei fazer seu trabalho diagnóstico — e então proclamar o Evangelho como dom puro, sem condições.',
        citacaoAutor: 'Martinho Lutero',
      },
      {
        tipo: 'analise',
        titulo: 'Sola Fide: Justiça Imputada, Não Infundida',
        paragrafos: [
          'No centro de toda a teologia de Lutero está a doutrina da <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:900;font-style:italic;">justificação pela fé</span>. A tradição católica medieval ensinava que Deus justifica o pecador <span style="color:#a78bfa;font-weight:700;">infundindo</span> nele uma qualidade espiritual — a graça que torna o crente progressivamente mais justo. A justificação era um <span style="color:#fb7185;font-weight:600;">processo de transformação interior</span>.',
          'Lutero, ao ler Paulo, chegou a uma conclusão diferente: a justificação é uma <span style="color:#34d399;font-weight:700;">declaração forense</span> — um ato judicial pelo qual Deus <strong style="color:#fff;">declara</strong> o pecador justo em Cristo, <span style="color:#fbbf24;font-weight:700;">imputando</span> ao crente a justiça de Cristo. Não é que Deus nos <em>torna</em> justos antes de nos declarar justos; é que Deus nos <em>declara</em> justos <strong style="color:#34d399;">gratuitamente, por causa de Cristo, recebido pela fé</strong>.',
          'Essa distinção tem consequências pastorais enormes. Se a justificação depende de <span style="color:#fb7185;font-weight:600;">transformação progressiva</span>, o crente nunca sabe se já transformou o suficiente. Se a justificação é <span style="color:#34d399;font-weight:600;">declaração gratuita em Cristo</span>, a certeza da salvação descansa não no meu progresso moral, mas na <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">palavra de Deus sobre mim em Cristo.</span>',
        ],
        citacao: 'A certeza da salvação não repousa no meu progresso moral, mas na palavra de Deus sobre mim em Cristo.',
        citacaoAutor: 'Martinho Lutero',
      },
    ],
    perguntas: [
      'A teologia da glória busca Deus no poder e no êxito. Você reconhece esse impulso em si mesmo, na sua comunidade, na pregação que costuma ouvir? Onde você tende a "procurar Deus" primeiro?',
      'Lutero distingue Lei e Evangelho como dois modos da Palavra de Deus. Qual é o risco de uma pregação que só usa a Lei (condenação sem graça)? E de uma que só usa o Evangelho (graça sem diagnóstico do pecado)?',
      'A justificação pela fé significa que a certeza da salvação não repousa no meu progresso moral, mas na palavra de Deus. Como isso afeta sua vida espiritual prática — sua oração, seu relacionamento com Deus, sua resposta ao fracasso moral?',
    ],
    oracao: 'Senhor, perdoa-nos pela tendência de preferir uma teologia da glória — que busca o Teu rosto nos lugares confortáveis, que confunde prosperidade com bênção e sucesso com aprovação. Ensina-nos a encontrar-Te na cruz: no lugar do escândalo, da fraqueza, do fracasso que Tu redimes.\n\nE que a distinção entre Lei e Evangelho nos liberte da religiosidade ansiosa: que a Lei faça seu trabalho de nos mostrar quem somos, e o Evangelho faça o Seu — de nos dizer, em Cristo, quem somos diante de Ti.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. Capítulo 3: "A Teologia de Martinho Lutero" (pp. 53–74). [Parte 1 — foco na Teologia da Cruz, Lei/Evangelho e justificação pela fé]',
  },
  5: {
    dia: 5,
    data: '5 de outubro de 2026',
    titulo: 'Lutero: As 95 Teses e o Ponto sem Retorno',
    subtitulo: 'Capítulo 2 — Parte 2',
    versiculo: 'Porque não me envergonho do evangelho, pois é o poder de Deus para a salvação de todo aquele que crê.',
    versiculoRef: 'Romanos 1.16',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'A Descoberta da Torre: Quando Romanos 1.17 Mudou Tudo',
        paragrafos: [
          'Em <span style="color:#60a5fa;font-weight:700;">1515</span>, preparando aulas sobre a Epístola aos Romanos, Lutero tropeça num versículo que conhecia de cor — <span style="background:rgba(192,132,252,0.18);border:1px solid rgba(192,132,252,0.40);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:800;">Romanos 1.17</span>: <span style="color:#a78bfa;font-style:italic;">"a justiça de Deus é revelada no evangelho."</span> Durante anos, essa frase o aterrorizara. A <span style="color:#fb7185;font-weight:700;">"justiça de Deus"</span> era para ele o padrão impossível pelo qual seria julgado — e pelo qual, certamente, seria condenado.',
          'Mas agora, no silêncio do seu estudo em Wittenberg, algo muda. Ele relê Paulo com atenção renovada e começa a perceber: a <span style="color:#34d399;font-weight:700;">"justiça de Deus"</span> não é a exigência que condena. <strong style="color:#fff;">É o dom que liberta.</strong> Não é o padrão que Deus impõe; é a justiça que Deus <em>oferece</em> ao pecador que crê.',
          'Lutero descreveria depois esse momento como <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:700;font-style:italic;">sentir as portas do paraíso se abrindo</span>. A <strong style="color:#fbbf24;">"descoberta da torre"</strong> — chamada assim porque ocorreu no estudo da torre do convento — foi a semente de toda a teologia da Reforma.',
        ],
        citacao: 'A "justiça de Deus" não é a exigência que condena. É o dom que liberta — a justiça que Deus oferece ao pecador que crê.',
        citacaoAutor: 'Martinho Lutero',
      },
      {
        tipo: 'analise',
        titulo: 'As 95 Teses: Um Protesto Acadêmico que Escapou do Controle',
        paragrafos: [
          'Em <span style="color:#60a5fa;font-weight:700;">1517</span>, o frade dominicano <strong style="color:#fff;">João Tetzel</strong> percorria as regiões vizinhas a Wittenberg vendendo <span style="color:#f97316;font-weight:700;">indulgências</span> — documentos que prometiam redução da pena purgatória para o comprador e seus familiares já falecidos. O slogan corria de boca em boca: <span style="background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.30);border-radius:5px;padding:2px 10px;color:#fecdd3;font-weight:700;font-style:italic;">"Quando o dinheiro cai na caixa, a alma sobe ao paraíso."</span>',
          'Para Lutero, isso era teologicamente inadmissível. Havia descoberto que <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">a salvação é dom de Deus recebido pela fé — não mercadoria negociada por dinheiro.</span> Em <span style="color:#fbbf24;font-weight:700;">31 de outubro de 1517</span>, Lutero enviou ao arcebispo de Mainz uma carta protestando o abuso e anexou <span style="color:#c084fc;font-weight:800;">95 teses</span> para debate acadêmico. Segundo a tradição, também as afixou na porta da <span style="color:#f97316;font-weight:600;">Igreja do Castelo de Wittenberg</span>.',
          'Sua intenção era provocar um <span style="color:#a78bfa;font-weight:600;">debate teológico interno</span>. O que aconteceu foi outra coisa. Em semanas, as teses foram traduzidas do latim para o alemão e impressas em <strong style="color:#fff;">milhares de cópias</strong>. Em dois meses, circulavam por toda a Alemanha. Em dois anos, por toda a Europa. González sublinha: <span style="background:rgba(251,191,36,0.12);border-left:3px solid #fbbf24;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,245,210,0.95);">sem a imprensa de Gutenberg, as 95 Teses seriam uma nota de rodapé esquecida.</span> Com ela, tornaram-se o estopim de um incêndio que ninguém havia planejado acender.',
        ],
        citacao: 'Sem a imprensa de Gutenberg, as 95 Teses seriam uma nota de rodapé esquecida. Com ela, tornaram-se o estopim de um incêndio que ninguém havia planejado acender.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'Worms: Aqui Estou — Não Posso Fazer de Outra Forma',
        paragrafos: [
          'O processo contra Lutero se intensificou. Roma exigiu retratação. Lutero se recusou. Em <span style="color:#60a5fa;font-weight:700;">1521</span>, o imperador <strong style="color:#fff;">Carlos V</strong> — neto de Isabel de Castela, o homem mais poderoso da Europa — convocou Lutero à <span style="color:#f97316;font-weight:700;">Dieta de Worms</span> para responder por suas posições.',
          'Lutero se apresenta diante do imperador, dos príncipes e dos legados papais. A pergunta foi direta: <span style="color:#fb7185;font-style:italic;">você retrata o que escreveu?</span> Pediu um dia para pensar. No dia seguinte, respondeu: não posso me retratar a menos que seja refutado <span style="color:#34d399;font-weight:700;">pela Escritura ou pela razão evidente</span>. Seguir apenas a autoridade de papas e concílios era seguir instituições que já haviam se contradito entre si.',
          '<span style="background:rgba(192,132,252,0.15);border:1px solid rgba(192,132,252,0.35);border-radius:8px;padding:4px 14px;color:#e9d5ff;font-weight:800;font-style:italic;display:inline-block;margin:4px 0;">"Aqui estou; não posso fazer de outra forma. Que Deus me ajude. Amém."</span> Carlos V declarou Lutero <span style="color:#fb7185;font-weight:700;">fora da lei</span>. Mas o príncipe <strong style="color:#fff;">Frederico, o Sábio</strong>, havia preparado um plano de resgate — e Lutero foi levado ao <span style="color:#fbbf24;font-weight:700;">castelo de Wartburgo</span>, onde passaria quase um ano traduzindo o <span style="color:#34d399;font-weight:600;">Novo Testamento para o alemão</span>.',
        ],
        citacao: 'Minha consciência está presa à Palavra de Deus. Aqui estou; não posso fazer de outra forma. Que Deus me ajude. Amém.',
        citacaoAutor: 'Martinho Lutero — Dieta de Worms, 1521',
      },
      {
        tipo: 'analise',
        titulo: 'A Reforma que Ninguém Planejou',
        paragrafos: [
          'González insiste num ponto que costuma ser esquecido: <strong style="color:#fff;">Lutero não planejou a Reforma.</strong> Em cada etapa — as 95 Teses, o processo em Roma, a Dieta de Worms — ele estava respondendo a eventos que <span style="color:#fb7185;font-weight:600;">escapavam ao seu controle</span>. Não havia estratégia, não havia movimento organizado, não havia programa político.',
          'Havia um <span style="color:#fbbf24;font-style:italic;">monge angustiado</span> que havia descoberto o evangelho e não conseguia ficar quieto. E havia condições históricas — <span style="color:#60a5fa;font-weight:600;">a imprensa</span>, <span style="color:#60a5fa;font-weight:600;">o nacionalismo alemão</span>, <span style="color:#60a5fa;font-weight:600;">os interesses dos príncipes</span>, <span style="color:#60a5fa;font-weight:600;">as guerras que distraíam Carlos V</span> — que transformaram o protesto de um indivíduo num <strong style="color:#34d399;">movimento continental</strong>.',
          'Isso não diminui Lutero. Mas nos lembra de que <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">as grandes renovações na história da Igreja raramente saem de planejamento humano. Saem de fidelidade à Palavra em contextos que Deus prepara</span> — muitas vezes sem que os agentes percebam o que está acontecendo.',
        ],
        citacao: 'As grandes renovações na história da Igreja raramente saem de planejamento humano. Saem de fidelidade à Palavra em contextos que Deus prepara.',
        citacaoAutor: 'Justo L. González',
      },
    ],
    perguntas: [
      'A "descoberta da torre" de Lutero foi uma reviravolta na leitura de Romanos 1.17 — um versículo que ele conhecia, mas não compreendia. Você já viveu o momento em que uma passagem bíblica familiar ganhou um significado completamente novo? O que mudou?',
      'Lutero em Worms disse que não podia retratar-se porque sua consciência estava "presa à Palavra de Deus." Que papel a consciência informada pelas Escrituras deve ter em momentos de pressão institucional ou social?',
      'González mostra que a Reforma aconteceu porque Lutero foi fiel em condições que ele não controlava. Como você equilibra responsabilidade pessoal com a confiança de que Deus age na história independentemente dos nossos planos?',
    ],
    oracao: 'Senhor, obrigado pela história de Lutero — um homem que não planejou mudar o mundo, mas não conseguiu ficar calado diante do que Tu lhe revelaste. Dá-nos essa mesma fidelidade: consciências presas à Tua Palavra, coragem para sustentá-la diante de pressões que nos pedem silêncio.\n\nE ajuda-nos a confiar que, quando somos fiéis no que está ao nosso alcance, Tu cuidas do que está além dele.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. Capítulo 2: "Martinho Lutero: O Caminho para a Reforma" (pp. 29–52). [Parte 2 — foco na descoberta da torre, 95 Teses e Dieta de Worms]',
  },
  4: {
    dia: 4,
    data: '4 de outubro de 2026',
    titulo: 'Lutero: Da Tempestade ao Mosteiro',
    subtitulo: 'Capítulo 2 — Parte 1',
    versiculo: 'Porque o Senhor não rejeita para sempre; mas, ainda que aflija, também se compadece, segundo a multidão das suas misericórdias.',
    versiculoRef: 'Lamentações 3.31–32',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'Um Voto Feito no Relâmpago',
        paragrafos: [
          'Nos últimos três dias, conhecemos o cenário que antecede a Reforma: o ideal medieval do <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;font-style:italic;">Corpus Christianum</span>, a reforma clerical de Isabel de Castela e o trabalho de Cisneros. Agora chegamos ao homem cujo nome se tornou sinônimo de Reforma: <strong style="color:#fff;">Martinho Lutero</strong>.',
          'Mas González nos adverte desde o início: <span style="color:#fbbf24;font-weight:700;">Lutero não chegou à Reforma por planejamento estratégico.</span> Chegou por angústia. A história começa em <span style="color:#60a5fa;font-weight:700;">julho de 1505</span>, num campo aberto perto de <span style="color:#f97316;font-weight:600;">Erfurt</span>. Uma tempestade elétrica violenta apanha o jovem estudante de Direito. Convencido de que vai morrer e será julgado por Deus, ele clama: <span style="background:rgba(192,132,252,0.15);border:1px solid rgba(192,132,252,0.35);border-radius:5px;padding:2px 10px;color:#e9d5ff;font-weight:700;font-style:italic;">"Santa Ana, me salva — e serei monge!"</span>',
          'Ele sobreviveu. E, para desgosto de seu pai — que havia investido tudo para que o filho se tornasse <span style="color:#fb7185;font-weight:600;">advogado</span> —, <strong style="color:#34d399;">honrou o voto</strong>. Duas semanas depois, entrou no <span style="color:#f97316;font-weight:700;">mosteiro agostiniano de Erfurt</span>.',
        ],
        citacao: 'Lutero não chegou à Reforma por planejamento estratégico. Chegou por angústia — e Deus usou essa angústia para mudar o mundo.',
      },
      {
        tipo: 'analise',
        titulo: 'A Angústia que Nenhum Mosteiro Resolvia',
        paragrafos: [
          'Lutero se lançou na vida monástica com uma intensidade que <span style="color:#fb7185;font-weight:600;">assustava os próprios monges</span>. Jejuns prolongados, confissões intermináveis, vigílias noturnas, penitências severas. Não por hipocrisia — por <strong style="color:#fff;">desespero genuíno</strong>. Ele queria certeza: certeza de que seus pecados estavam perdoados, certeza de que Deus não o condenaria.',
          'Os teólogos medievais ensinavam que, depois do batismo, os pecados eram apagados pela <span style="color:#a78bfa;font-weight:600;">contrição, confissão e satisfação</span>. Lutero praticava tudo isso com escrúpulo absoluto — e <span style="color:#fb7185;font-weight:700;">continuava sem paz</span>. O problema não era a prática. Era a estrutura: um sistema que descansava sobre a <span style="background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.30);border-radius:5px;padding:1px 7px;color:#fecdd3;font-weight:700;">capacidade humana de produzir contrição suficiente</span>, satisfação suficiente, amor suficiente a Deus.',
          'Em alemão, Lutero chamava essa experiência de <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:900;font-style:italic;">Anfechung</span> — uma palavra quase intraduzível que combina <span style="color:#fb7185;font-weight:600;">angústia espiritual</span>, <span style="color:#fb7185;font-weight:600;">sensação de abandono divino</span> e <span style="color:#fb7185;font-weight:600;">medo existencial do julgamento</span>. Não era depressão clínica, embora tivesse traços disso. Era uma <span style="background:rgba(192,132,252,0.12);border-left:3px solid #a78bfa;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(230,220,255,0.95);">crise teológica vivida no corpo e na alma.</span>',
        ],
        citacao: 'O problema não era a prática de Lutero. Era a estrutura de um sistema que descansava inteiramente sobre a capacidade humana de ser suficiente diante de Deus.',
      },
      {
        tipo: 'analise',
        titulo: 'Staupitz: O Confessor que Mudou a Direção',
        paragrafos: [
          'O superior do mosteiro, <strong style="color:#fff;">Johann von Staupitz</strong>, era um homem sábio e compassivo. Ouviu Lutero por anos — confissões que se estendiam por horas, inquirindo cada pensamento, cada impulso, cada falha. Chegou um ponto em que Staupitz perdeu a paciência — <span style="color:#fbbf24;font-style:italic;">não com Lutero, mas com o ciclo que o aprisionava</span>.',
          'Sua resposta foi surpreendente: em vez de prescrever <span style="color:#fb7185;font-weight:600;">mais penitência</span>, mandou Lutero <span style="background:rgba(52,211,153,0.12);border:1px solid rgba(52,211,153,0.30);border-radius:5px;padding:1px 8px;color:#a7f3d0;font-weight:700;">ensinar Bíblia na recém-fundada Universidade de Wittenberg</span>.',
          'Era um gesto pastoral de rara inteligência: interromper a espiral de introspecção obrigando o angustiado a se voltar para algo <strong style="color:#34d399;">externo</strong> — o texto sagrado, os estudantes, a tarefa de explicar as Escrituras. <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">O remédio para a ansiedade espiritual não foi mais penitência; foi ocupação com a Palavra.</span> E foi preparando aulas sobre as Epístolas de Paulo que Lutero encontraria, alguns anos depois, aquilo que buscava há tanto tempo.',
        ],
        citacao: 'Staupitz não deu a Lutero mais técnicas espirituais. Deu-lhe uma tarefa: ensinar a Palavra. E isso mudou tudo.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'Roma: A Desilusão que Plantou uma Semente',
        paragrafos: [
          'Em <span style="color:#60a5fa;font-weight:700;">1510</span>, Lutero viajou a <span style="color:#f97316;font-weight:700;">Roma</span> em missão oficial da ordem agostiniana. Foi sua única visita à cidade santa. E foi uma experiência de <strong style="color:#fb7185;">desilusão profunda</strong>.',
          'Ele chegou com a devoção de um peregrino medieval: queria visitar as igrejas, venerar as relíquias, escalar de joelhos a <span style="color:#a78bfa;font-weight:600;">Scala Sancta</span> para ganhar as indulgências prometidas. Fez tudo isso — e ficou perturbado com o que viu. <span style="color:#fb7185;font-weight:600;">Sacerdotes celebrando missa em velocidade absurda.</span> <span style="color:#fb7185;font-weight:600;">Clérigos fazendo piadas sobre a eucaristia</span> durante a celebração. Uma cidade que deveria ser o centro da cristandade exibindo, na prática cotidiana de seu clero, um <span style="background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.30);border-radius:5px;padding:1px 7px;color:#fecdd3;font-weight:700;">cinismo que contrastava violentamente com a fé ingênua do peregrino alemão</span>.',
          'Lutero voltou à Alemanha diferente. Não era ainda um reformador. Mas algo havia se quebrado: <span style="background:rgba(251,191,36,0.12);border-left:3px solid #fbbf24;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,245,210,0.95);">a suposição de que Roma era, necessariamente, modelo de fé.</span> A semente da desilusão estava plantada.',
        ],
        citacao: 'Lutero voltou de Roma diferente. Não era ainda um reformador — mas a suposição de que Roma era modelo de fé havia se quebrado para sempre.',
      },
    ],
    perguntas: [
      'Lutero entrou no mosteiro em resposta a uma crise de medo e barganha com Deus. Você já viveu momentos em que sua fé era movida principalmente pelo medo? Como isso se compara a uma fé movida pela gratidão e confiança?',
      'Staupitz não deu a Lutero mais técnicas espirituais — deu-lhe uma tarefa: ensinar a Palavra. De que forma a ocupação com as Escrituras (estudar, ensinar, meditar) pode ser um remédio para a ansiedade espiritual?',
      'A visita de Lutero a Roma o desiludiu com a instituição, mas não com Cristo. Você já viveu uma desilusão com a Igreja? Como separar a fé em Cristo da decepção com instituições e pessoas?',
    ],
    oracao: 'Senhor, há em nós algo da angústia de Lutero — o desejo de certeza, o medo do julgamento, a sensação de que nunca somos suficientes. Obrigado por não nos deixares nessa espiral, mas nos conduzires — como conduziste Lutero — em direção à Tua Palavra, onde a justiça não é exigência que nos esmaga, mas dom que nos liberta.\n\nQue possamos, como Staupitz, ter sabedoria para desviar olhares angustiados da introspecção paralisante para a contemplação de Cristo.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. Capítulo 2: "Martinho Lutero: O Caminho para a Reforma" (pp. 29–52). [Parte 1 — foco na biografia espiritual até a chegada a Wittenberg]',
  },
  3: {
    dia: 3,
    data: '3 de outubro de 2026',
    titulo: 'Cisneros: O Reformador que Não Queria Ser Arcebispo',
    subtitulo: 'Capítulo 1 — Parte 2',
    versiculo: 'Não que sejamos suficientes em nós mesmos para pensar alguma coisa como se procedesse de nós; pelo contrário, a nossa suficiência vem de Deus.',
    versiculoRef: '2 Coríntios 3.5',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'O Homem que Precisou de uma Bula para Obedecer',
        paragrafos: [
          'Ontem vimos como Isabel de Castela usou o poder real de nomeação episcopal para reformar o clero espanhol de cima para baixo. Hoje nos detemos no homem que ela escolheu para conduzir essa reforma: <strong style="color:#fff;">Francisco Ximénez de Cisneros</strong>.',
          'Cisneros era <span style="color:#fbbf24;font-weight:700;">frade franciscano</span>, homem de oração e estudioso das Escrituras. Quando Isabel o designou <span style="color:#f97316;font-weight:700;">arcebispo de Toledo</span> — a mais poderosa e rica diocese da Espanha — ele <strong style="color:#fb7185;">se recusou a aceitar o cargo</strong>. Não por falsa modéstia, mas por convicção genuína: a vida de pobreza franciscana e retiro contemplativo era, para ele, incompatível com os palácios e o poder da arquidiocese.',
          'Foi necessária <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 7px;color:#fde68a;font-weight:700;">uma bula papal</span> ordenando-o a aceitar. Ele obedeceu. E então fez algo que ninguém esperava: tornou-se arcebispo <em>sem deixar de ser frade</em>. Chefiou a Igreja mais rica da Espanha vestindo o <span style="color:#a78bfa;font-weight:600;">hábito franciscano remendado</span>, dormindo em cela simples, recusando banquetes. O poder institucional que lhe confiaram foi colocado inteiramente a serviço da reforma que ele já buscava na obscuridade do convento.',
        ],
        citacao: 'O poder institucional que lhe confiaram foi colocado inteiramente a serviço da reforma que ele já buscava na obscuridade do convento.',
      },
      {
        tipo: 'analise',
        titulo: 'A Reforma dos Conventos: Pessoas Antes de Estruturas',
        paragrafos: [
          'A primeira missão de Cisneros foi reformar os próprios franciscanos. Ao longo de décadas, a ordem havia relaxado progressivamente: <span style="color:#fb7185;font-weight:600;">conventos ricos, votos de pobreza ignorados, disciplina comunitária dissolvida</span>. Cisneros visitou as casas franciscanas pessoalmente, exigiu o retorno à <strong style="color:#fff;">regra original de Francisco de Assis</strong>, e enfrentou <span style="color:#f97316;font-weight:700;">resistência violenta</span>.',
          'Há relatos de que alguns frades preferiram <span style="color:#fbbf24;font-style:italic;">emigrar para o norte da África</span> a se submeter à reforma. Outros ameaçaram o próprio arcebispo. <strong style="color:#34d399;">Cisneros não recuou.</strong> Compreendia algo que os reformadores posteriores aprenderiam com dificuldade: <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">nenhuma reforma institucional é possível sem reformar primeiro as pessoas que sustentam a instituição.</span>',
          'O mesmo princípio foi aplicado ao clero secular: <span style="color:#60a5fa;font-weight:600;">bispos ausentes</span> foram chamados às suas dioceses; <span style="color:#60a5fa;font-weight:600;">padres sem formação</span> foram enviados para estudar; <span style="color:#60a5fa;font-weight:600;">práticas abusivas</span> foram proibidas. A Igreja espanhola, sob Cisneros, passou por uma <strong style="color:#fff;">renovação clerical real</strong> — ainda que imperfeita e sempre incompleta.',
        ],
        citacao: 'Nenhuma reforma institucional é possível sem reformar primeiro as pessoas que sustentam a instituição.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'Ad Fontes: A Bíblia Poliglota Complutense',
        paragrafos: [
          'O projeto mais duradouro de Cisneros foi intelectual: a <strong style="color:#c084fc;">Bíblia Poliglota Complutense</strong>. <span style="color:#a78bfa;font-style:italic;">"Poliglota"</span> porque reunia o texto bíblico em quatro línguas — <span style="color:#fbbf24;font-weight:700;">hebraico, aramaico, grego e latim</span> — em colunas paralelas na mesma página. <span style="color:#a78bfa;font-style:italic;">"Complutense"</span> porque foi produzida na cidade de <strong style="color:#fff;">Alcalá de Henares</strong>, cujo nome em latim é <em>Complutum</em>.',
          'Cisneros financiou o projeto inteiramente, reuniu os melhores hebraístas e helenistas disponíveis, e supervisionou o trabalho por anos. A obra foi concluída em <span style="background:rgba(192,132,252,0.18);border:1px solid rgba(192,132,252,0.40);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:900;font-size:1.05em;">1517</span> — <span style="color:#fbbf24;font-weight:600;">o mesmo ano em que Lutero fixava suas 95 Teses em Wittenberg.</span>',
          'O impulso era o mesmo em ambos os casos: voltar às fontes, <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;font-style:italic;">ad fontes</span>. O humanismo renascentista havia ensinado uma geração inteira a desconfiar dos comentadores medievais e a buscar os textos originais. Para <span style="color:#f97316;font-weight:600;">Cisneros e Erasmo</span>, isso significava a Bíblia em hebraico e grego. Para <span style="color:#f97316;font-weight:600;">Lutero</span>, significava Paulo lido sem a mediação da escolástica. Reformadores católicos e protestantes beberam da <strong style="color:#34d399;">mesma fonte humanista</strong>. A divergência viria depois — e foi tão amarga <em>exatamente porque começou no mesmo lugar.</em>',
        ],
        citacao: 'A divergência entre católicos e protestantes foi tão amarga exatamente porque começou no mesmo lugar: o desejo de voltar às Escrituras em sua forma mais original.',
      },
      {
        tipo: 'analise',
        titulo: 'O Paradoxo que Cisneros Carregou',
        paragrafos: [
          'Há uma tensão irresolvida na figura de Cisneros que González não deixa escapar: ele foi simultaneamente <span style="color:#34d399;font-weight:700;">reformador</span> e <span style="color:#fb7185;font-weight:700;">inquisidor</span>. O mesmo homem que patrocinou a Poliglota Complutense e reformou os conventos também exerceu funções no aparato da <span style="background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.30);border-radius:5px;padding:1px 7px;color:#fecdd3;font-weight:700;">Inquisição espanhola</span> — o mecanismo que perseguia judeus convertidos suspeitos de judaizar e, mais tarde, protestantes espanhóis.',
          'González <strong style="color:#fff;">não resolve essa tensão.</strong> Ele a expõe, porque ela é histórica. O século XVI era assim: homens de fé genuína, espiritualidade real e inteligência aguda podiam ao mesmo tempo <span style="color:#34d399;font-weight:600;">produzir obras de renovação</span> e <span style="color:#fb7185;font-weight:600;">participar de sistemas de opressão</span>. Cisneros não é um herói sem manchas. É um <span style="color:#fbbf24;font-style:italic;">homem do seu tempo</span>, com todas as contradições que isso implica.',
          'Essa <span style="color:#a78bfa;font-weight:700;">honestidade historiográfica</span> nos protege da tentação <em>hagiográfica</em> — transformar reformadores em ícones impecáveis — e nos convida a um olhar mais humilde sobre nós mesmos: <span style="background:rgba(167,139,250,0.12);border-left:3px solid #a78bfa;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(230,220,255,0.95);">nossas próprias cegas culturais nos escapam da mesma forma que as de Cisneros lhe escaparam.</span>',
        ],
        citacao: 'Nossos próprios pontos cegos culturais nos escapam da mesma forma que os de Cisneros lhe escaparam. A humildade histórica começa quando paramos de julgar o passado sem nos perguntarmos o que o futuro julgará em nós.',
        citacaoAutor: 'Justo L. González',
      },
    ],
    perguntas: [
      'Cisneros se recusou a aceitar o cargo de arcebispo e precisou de uma ordem papal para obedecer. O que sua relutância — e sua posterior fidelidade — dizem sobre a diferença entre ambição religiosa e serviço genuíno? Você reconhece alguma dessas dinâmicas em si mesmo?',
      'O projeto ad fontes — voltar às fontes bíblicas em sua língua original — uniu humanistas católicos e protestantes antes de dividi-los. O que isso sugere sobre a importância do estudo sério das Escrituras como fundamento de renovação, independentemente da tradição confessional?',
      'González apresenta Cisneros como reformador e inquisidor ao mesmo tempo. Como você lida com a complexidade de figuras históricas que fizeram bem e mal? O que isso diz sobre como devemos avaliar líderes cristãos — passados e presentes?',
    ],
    oracao: 'Senhor, obrigado pelo exemplo de homens e mulheres que, mesmo relutantes, colocaram seus dons a serviço da renovação da Igreja. Guarda-nos da ambição disfarçada de vocação — e da recusa covarde disfarçada de humildade.\n\nQue o exemplo de Cisneros nos inspire a buscar as fontes: a Tua Palavra em sua profundidade, sem o filtro cômodo dos preconceitos herdados. E que a honestidade sobre suas contradições nos humilhe o suficiente para reconhecer as nossas próprias.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. Capítulo 1: "Isabel, a Católica" (pp. 11–28). [continuação do mesmo capítulo — foco em Cisneros e a Poliglota Complutense]',
  },
  2: {
    dia: 2,
    data: '2 de outubro de 2026',
    titulo: 'Isabel, a Católica: A Reforma Antes da Reforma',
    subtitulo: 'Capítulo 1 — Parte 1',
    versiculo: 'Mas Deus escolheu as coisas loucas do mundo para confundir as sábias; e Deus escolheu as coisas fracas do mundo para confundir as fortes.',
    versiculoRef: '1 Coríntios 1.27',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'Antes de Lutero, Houve Isabel',
        paragrafos: [
          'Quando falamos em Reforma, o nome que vem imediatamente à mente é <strong style="color:#fff;">Martinho Lutero</strong> — o monge alemão que, em <span style="background:rgba(192,132,252,0.18);border:1px solid rgba(192,132,252,0.40);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:900;">1517</span>, afixou suas <span style="color:#c084fc;font-weight:700;">95 Teses</span> na porta da Igreja do Castelo de Wittenberg. Mas Justo L. González nos desafia a recuar alguns anos. <strong style="color:#fbbf24;">Antes de Lutero, houve Isabel.</strong>',
          '<strong style="color:#fff;">Isabel de Castela</strong> — conhecida como <span style="color:#fbbf24;font-style:italic;">"a Católica"</span> — governou a Espanha na virada do século XV para o XVI. Ao lado de seu marido <span style="color:#f97316;font-weight:600;">Fernando de Aragão</span>, ela não apenas unificou politicamente a Espanha e patrocinou a viagem de Colombo (<span style="color:#60a5fa;font-weight:700;">1492</span>). Ela também empreendeu algo que a historiografia frequentemente ignora: uma <span style="color:#34d399;font-weight:700;">profunda reforma do clero espanhol</span>, décadas antes do protesto luterano.',
          'A questão central para Isabel era simples e urgente: <span style="background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.30);border-radius:5px;padding:1px 7px;color:#fecdd3;font-weight:700;">a Igreja espanhola estava corrompida</span>. Bispos acumulavam cargos e riquezas <span style="color:#fb7185;font-style:italic;">sem pisar em suas dioceses</span>. Conventos haviam perdido toda disciplina. O povo não tinha pastores; tinha <span style="color:#fb7185;font-weight:600;">administradores ausentes</span>. Algo precisava mudar.',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'A Alavanca do Poder: Quem Nomeia, Reforma',
        paragrafos: [
          'Isabel entendeu algo que reformadores posteriores aprenderiam a duras penas: <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">a chave da reforma institucional é o controle das nomeações.</span> Enquanto Roma nomeava bispos por <span style="color:#fb7185;font-weight:600;">critérios políticos e financeiros</span>, qualquer reforma seria superficial. Isabel negociou com o papado o chamado <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;">"direito de padroado"</span> — a prerrogativa real de indicar bispos para a Espanha.',
          'Com esse poder nas mãos, ela pôde nomear <span style="color:#34d399;font-weight:600;">homens de caráter</span>. O mais importante deles foi <strong style="color:#fff;">Francisco Ximénez de Cisneros</strong> — frade franciscano, humanista, homem de oração e disciplina rigorosa. Isabel o nomeou <span style="color:#f97316;font-weight:700;">arcebispo de Toledo</span>, a sé mais poderosa da Espanha.',
          'Há um episódio notável: <strong style="color:#fb7185;">Cisneros se recusou a aceitar o cargo.</strong> Para ele, a vida de pobreza e retiro contemplativo era incompatível com a grandeza episcopal. Foi necessário que Roma emitisse <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 7px;color:#fde68a;font-weight:700;">uma bula papal</span> ordenando-o a aceitar. Ele obedeceu — mas <em>nunca abandonou o hábito franciscano</em>, nem a simplicidade de vida, mesmo chefiando a Igreja mais rica da Espanha.',
        ],
        citacao: 'Esse paradoxo diz muito sobre a tensão que percorre todo este período: a reforma genuína de espírito lutando dentro de estruturas de poder institucional.',
      },
      {
        tipo: 'analise',
        titulo: 'Cisneros e a Poliglota Complutense',
        paragrafos: [
          'Cisneros não era apenas um administrador. Era um <span style="color:#a78bfa;font-weight:700;">humanista</span> que compreendia que a renovação da Igreja passava pela renovação do conhecimento bíblico. Seu projeto mais ambicioso foi a <strong style="color:#c084fc;">Bíblia Poliglota Complutense</strong> — uma edição da Bíblia com o texto original em <span style="color:#fbbf24;font-weight:700;">hebraico, aramaico, grego e latim</span>, impressa em colunas paralelas para facilitar a comparação e o estudo.',
          'Esse projeto, concluído em <span style="background:rgba(192,132,252,0.18);border:1px solid rgba(192,132,252,0.40);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:900;">1517</span> (o mesmo ano das 95 Teses), reuniu os melhores hebraístas e helenistas da Espanha. Era humanismo a serviço da teologia: voltar às fontes, <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;font-style:italic;">ad fontes</span>, para que a Igreja fosse reformada pela Palavra em sua forma mais fiel.',
          '<strong style="color:#fff;">Erasmo de Roterdã</strong>, o grande humanista da época, tinha um projeto semelhante — sua edição crítica do Novo Testamento grego, publicada em <span style="color:#60a5fa;font-weight:700;">1516</span>. Reformadores protestantes e católicos beberam da <strong style="color:#34d399;">mesma fonte humanista</strong>. A divergência viria depois — e foi mais amarga <em>exatamente porque começaram no mesmo lugar.</em>',
        ],
        citacao: 'Reformadores protestantes e católicos beberam da mesma fonte humanista. A divergência viria depois — e foi mais amarga exatamente porque começaram no mesmo lugar.',
      },
      {
        tipo: 'analise',
        titulo: 'O Nó Central de uma Teia Geopolítica',
        paragrafos: [
          'Isabel importa não apenas pela reforma que empreendeu, mas pela <span style="color:#f97316;font-weight:700;">teia política</span> que ela representa. Sua neta Joana teve um filho chamado <strong style="color:#fff;">Carlos</strong> — que se tornaria <span style="color:#fbbf24;font-weight:700;">Carlos I de Espanha e Carlos V</span>, imperador do Sacro Império Romano-Germânico. O mesmo homem que julgaria Lutero em <span style="color:#fb7185;font-weight:600;">Worms em 1521</span>.',
          'Sua filha <span style="color:#a78bfa;font-weight:700;">Catarina de Aragão</span> casou-se com <span style="color:#60a5fa;font-weight:700;">Henrique VIII da Inglaterra</span> — e o fracasso desse casamento desencadearia o <span style="color:#fb7185;font-weight:600;">cisma anglicano</span>. Seu neto <span style="color:#f97316;font-weight:700;">Felipe II</span> herdaria a hegemonia espanhola e tentaria <span style="color:#fb7185;font-weight:600;">suprimir a Reforma nos Países Baixos</span>.',
        ],
        citacao: 'Isabel não é um personagem isolado. Ela é o nó central de uma teia que conecta Lutero, Henrique VIII, Carlos V e Felipe II. Sem entender Isabel, não se entende o século XVI.',
        citacaoAutor: 'Justo L. González',
      },
    ],
    perguntas: [
      'Isabel reformou a Igreja sem romper com ela. Cisneros reformou como bispo sem abrir mão da espiritualidade de frade. Que tensão entre instituição e autenticidade espiritual você reconhece na sua própria vida de fé ou contexto eclesial?',
      'A chave da reforma de Isabel foi o controle das nomeações — quem ocupa os cargos de liderança determina a direção da instituição. Você concorda com essa leitura? Como isso se aplica às igrejas hoje?',
      'González começa pela Espanha, não pela Alemanha. O que essa inversão de perspectiva revela sobre os pontos cegos que temos ao contar a história da nossa própria fé?',
    ],
    oracao: 'Senhor, obrigado pela lembrança de que Tu ages na história muito antes de percebermos. Antes de Lutero, havia Isabel. Antes da ruptura, havia reforma. Antes do escândalo público, havia o trabalho silencioso de homens e mulheres que buscavam um clero fiel e uma Igreja renovada.\n\nEnsina-nos a ter paciência com os processos lentos da renovação. E dá-nos sabedoria para identificar as alavancas certas — os pontos onde uma mudança genuína pode começar.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. Capítulo 1: "Isabel, a Católica" (pp. 11–28).',
  },
  12: {
    dia: 12,
    data: '12 de outubro de 2026',
    titulo: 'A Reforma na Grã-Bretanha: Henrique, Cranmer e Knox',
    subtitulo: 'Capítulo 8',
    versiculo: 'É melhor refugiar-se no Senhor do que confiar no homem. É melhor refugiar-se no Senhor do que confiar em príncipes.',
    versiculoRef: 'Salmo 118.8–9',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'A Reforma Mais Desconfortável: Linhas Tortas, Escrita Reta',
        paragrafos: [
          'A Reforma britânica é uma das mais complexas — e também das mais <span style="color:#fb7185;font-weight:700;">desconfortáveis</span> para quem acredita que reformas eclesiásticas devem nascer de convicção espiritual. González nos apresenta uma Reforma <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:700;">iniciada por um rei que queria um divórcio</span>, consolidada por um arcebispo que morreu pela fé, quase destruída por uma rainha que amava Roma, e finalmente estabilizada por outra rainha que amava sobretudo o poder.',
          'É a história de como <span style="color:#34d399;font-weight:700;">Deus escreve reto por linhas tortas</span> — e de que o instrumento usado por Deus pode não ser o mais santo, mas o mais conveniente. O Salmo 118 seria a resposta antecipatória a essa história: <span style="color:#60a5fa;font-style:italic;font-weight:600;">não confie em príncipes</span> — nem mesmo nos que, por acidente ou conveniência, acabam servindo à causa do Evangelho.',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'Henrique VIII: A Reforma do Rei Sem Convicção',
        paragrafos: [
          'Henrique VIII havia recebido do papa o título de <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;font-style:italic;">"Defensor da Fé"</span> por ter escrito uma refutação de Lutero. Não era um reformador protestante. Era um rei que precisava de um filho varão para garantir a sucessão, e sua esposa, <span style="color:#a78bfa;font-weight:700;">Catarina de Aragão</span>, não havia conseguido dá-lo.',
          'Catarina era tia do imperador <span style="color:#60a5fa;font-weight:700;">Carlos V</span> — o mesmo que controlava o papa após o saque de Roma (1527). Roma não podia anular o casamento sem provocar Carlos V. Henrique ficou sem saída pelo caminho canônico.',
          'A solução foi legislativa: o <span style="color:#f97316;font-weight:700;">Ato de Supremacia de 1534</span> declarou o rei <span style="background:rgba(249,115,22,0.15);border:1px solid rgba(249,115,22,0.35);border-radius:5px;padding:1px 8px;color:#fed7aa;font-weight:800;font-style:italic;">"Cabeça Suprema da Igreja da Inglaterra."</span> Com um decreto do Parlamento, Henrique criou uma nova Igreja — <span style="color:#fb7185;font-weight:700;">não por teologia, mas por necessidade dinástica</span>. As abadias foram dissolvidas e seus bens confiscados para a coroa. González observa a ironia: Henrique continuou sendo essencialmente <span style="color:#fb7185;font-weight:600;">católico em teologia</span> — rejeitava a justificação pela fé, mantinha o celibato clerical e punia quem defendesse doutrinas luteranas. <span style="background:rgba(251,113,133,0.12);border-left:3px solid #fb7185;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,220,225,0.95);">Criou uma Igreja anglicana sem anglicanismo ainda.</span>',
        ],
        citacao: 'Henrique VIII criou uma Igreja anglicana sem anglicanismo. A ruptura com Roma foi política; a convicção teológica viria depois, por outros.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'Thomas More: O Humanista que Pagou o Preço',
        paragrafos: [
          'Entre os que se recusaram a jurar o Ato de Supremacia estava <strong style="color:#fff;">Thomas More</strong> — humanista do círculo de Erasmo, amigo pessoal de Henrique, ex-chanceler do reino. Quando sua filha Margaret o visitou na prisão e implorou que jurasse <span style="color:#fb7185;font-style:italic;">"como tantos homens ilustres fizeram,"</span> More respondeu: <span style="background:rgba(192,132,252,0.15);border:1px solid rgba(192,132,252,0.35);border-radius:5px;padding:2px 10px;color:#e9d5ff;font-weight:700;font-style:italic;">"Não me é dado carregar minha consciência às custas de outro."</span>',
          'Na execução, suas últimas palavras foram: <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;font-style:italic;">"Morro sendo servo do Rei, mas antes de tudo sou servo de Deus."</span>',
          'González vê nessa morte uma <span style="color:#fb7185;font-weight:700;">tragédia dupla</span>: um homem que dedicara a vida à renovação da Igreja <em>por dentro</em>, sem ruptura com Roma, executado pela nova Igreja de um rei que reformou por motivos pessoais. A reforma correta morreu pelas mãos de quem reformou pelos motivos errados. More foi canonizado em <span style="color:#a78bfa;font-weight:600;">1935</span>.',
        ],
        citacao: 'Morro sendo servo do Rei, mas antes de tudo sou servo de Deus.',
        citacaoAutor: 'Thomas More, na execução (1535)',
      },
      {
        tipo: 'analise',
        titulo: 'Cranmer e o Livro de Oração: A Reforma que Entrou nos Ossos',
        paragrafos: [
          'A reforma doutrinária genuína veio com <strong style="color:#fff;">Thomas Cranmer</strong>, arcebispo de Canterbury. Cranmer tinha convicções protestantes reais — influenciado por <span style="color:#2dd4bf;font-weight:700;">Zuínglio</span> e pelos reformadores de Estrasburgo — e as implementou gradualmente, aproveitando as janelas abertas pelos monarcas.',
          'Sua maior obra foi o <span style="background:rgba(96,165,250,0.15);border:1px solid rgba(96,165,250,0.35);border-radius:5px;padding:1px 8px;color:#bfdbfe;font-weight:800;font-style:italic;">Livro Comum de Oração</span> (Book of Common Prayer) de 1549, revisado em 1552. Esse livro colocou a liturgia em inglês nas mãos do povo, substituiu o latim incompreensível por prosa inglesa de extraordinária beleza, e incorporou uma teologia protestante clara nas orações e nos sacramentos. <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">A Reforma inglesa entrou nos ossos do povo pela liturgia, não pelos decretos.</span>',
          'Com a morte do jovem rei <span style="color:#60a5fa;font-weight:700;">Eduardo VI</span> em 1553, <span style="color:#fb7185;font-weight:700;">Maria Tudor</span> — fervorosamente católica — assumiu o trono e restaurou a obediência a Roma. Cerca de 300 protestantes foram executados, incluindo Cranmer. Na fogueira, Cranmer estendeu primeiro a <span style="background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.30);border-radius:5px;padding:1px 7px;color:#fecdd3;font-weight:700;">mão direita</span> — a mão com que havia assinado uma retratação de suas convicções sob pressão — dizendo que aquela mão indigna deveria ser queimada primeiro. <span style="color:#fbbf24;font-weight:700;">John Foxe</span> imortalizou esse e outros mártires no <em>Livro dos Mártires</em> (1563), que moldou a identidade protestante inglesa por gerações.',
        ],
        citacao: 'A Reforma inglesa entrou nos ossos do povo pela liturgia, não pelos decretos. Cranmer entendeu que o culto forma o coração mais profundamente do que qualquer tratado.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'Isabel I, Knox e as Duas Direções do Protestantismo Britânico',
        paragrafos: [
          'Com a morte de Maria Tudor em 1558, subiu ao trono <span style="color:#a78bfa;font-weight:700;">Isabel I</span> — filha de Ana Bolena. González é preciso: Isabel não era uma protestante convicta. Era uma <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:700;">pragmática genial</span> que entendia que a estabilidade do reino dependia de um compromisso que unisse católicos e protestantes moderados sob a coroa. O anglicanismo elizabetano foi deliberadamente <span style="color:#60a5fa;font-weight:700;">ambíguo</span>: protestante no dogma, episcopal na estrutura, litúrgico no culto. <span style="color:#fb7185;font-style:italic;font-weight:600;">A via media não foi escolha espiritual; foi estratégia de sobrevivência política.</span>',
          'A Reforma escocesa foi outra história. <strong style="color:#fff;">João Knox</strong> não foi a Wittenberg — foi a <span style="color:#34d399;font-weight:700;">Genebra</span>. Formado diretamente por Calvino, Knox retornou à Escócia com um programa radicalmente presbiteriano: <span style="color:#fbbf24;font-weight:600;">nenhum bispo</span>, governo pela assembleia de presbíteros, disciplina rigorosa, liturgia simples. A Reforma escocesa foi mais popular e mais calvinista do que a inglesa — <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">não foi imposta pelo rei, mas conquistada contra a rainha.</span> Criou o presbiterianismo que se espalharia pela Irlanda, Holanda e colônias americanas.',
        ],
        citacao: 'A Reforma escocesa foi conquistada contra a rainha, não imposta pelo rei. A diferença entre as duas reformas britânicas é a diferença entre fé e pragmatismo.',
        citacaoAutor: 'Justo L. González',
      },
    ],
    perguntas: [
      'A Reforma inglesa começou com motivos políticos, não espirituais. Deus usou um instrumento impuro para realizar mudanças duradouras. Como você pensa a providência de Deus operando por meio de pessoas e motivos mistos? Isso muda a forma como você avalia os resultados?',
      'Thomas Cranmer reformou a Igreja pela liturgia — pela oração e pelo culto comum, não apenas pelos tratados teológicos. Que papel a liturgia e o culto desempenham na formação espiritual da sua própria comunidade? O que você repete em culto está moldando seu coração?',
      'Cranmer havia assinado uma retratação de suas convicções sob pressão — e depois a reverteu na hora da morte. O que esse episódio diz sobre a fragilidade humana diante da perseguição, e sobre a possibilidade de recuperação da integridade?',
    ],
    oracao: 'Senhor, obrigado pelo testemunho de Cranmer e de More — dois homens do mesmo círculo intelectual, que tomaram caminhos opostos e ambos pagaram com a vida pela fidelidade à consciência. Que nos ensinemos a honrar a consciência acima do pragmatismo, mesmo quando o pragmatismo promete segurança.\n\nE que a liturgia que usamos em culto não seja apenas rotina, mas formação: palavras que, repetidas fielmente, vão moldando o coração para o Teu reino.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. Capítulo 8: "A Reforma na Grã-Bretanha" (pp. 179–214).',
  },
  11: {
    dia: 11,
    data: '11 de outubro de 2026',
    titulo: 'João Calvino: O Sistematizador da Reforma',
    subtitulo: 'Capítulo 7',
    versiculo: 'A mim, que sou o menor de todos os santos, me foi dada esta graça de anunciar entre os gentios as inescrutáveis riquezas de Cristo.',
    versiculoRef: 'Efésios 3.8',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'O Arquiteto: Uma Geração Depois',
        paragrafos: [
          'Acompanhamos até agora os dois primeiros grandes reformadores: <span style="color:#f97316;font-weight:700;">Lutero</span>, o profeta apaixonado que descobriu o Evangelho pela angústia, e <span style="color:#2dd4bf;font-weight:700;">Zuínglio</span>, o humanista que chegou às mesmas conclusões pelo estudo cuidadoso das Escrituras. Hoje González nos apresenta a terceira grande figura — e, em muitos sentidos, a <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:700;">mais influente na configuração duradoura do protestantismo</span>: <strong style="color:#fff;">João Calvino</strong>.',
          'Calvino nasceu na França em <span style="color:#60a5fa;font-weight:700;">1509</span> — uma geração depois de Lutero e Zuínglio. Quando a Reforma irrompia na Alemanha e na Suíça, ele ainda era criança. Quando se converteu ao protestantismo, por volta de <span style="color:#60a5fa;font-weight:600;">1533</span>, já havia os fundamentos a sistematizar. <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">Sua vocação não foi a de profeta; foi a de arquiteto.</span>',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'A Vocação Forçada: Farel e Genebra',
        paragrafos: [
          'Em <span style="color:#60a5fa;font-weight:700;">1536</span>, Calvino passava por Genebra em trânsito. Seu plano era ir a Estrasburgo e dedicar-se ao estudo em paz — era um <span style="color:#a78bfa;font-weight:700;">homem de gabinete, não de púlpito</span>. Guilherme Farel, que tentava reformar a cidade turbulenta de Genebra, soube de sua passagem e foi ao seu encontro.',
          'Calvino recusou o apelo de Farel. Então Farel — segundo o próprio relato de Calvino — <span style="background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.30);border-radius:5px;padding:1px 7px;color:#fecdd3;font-weight:700;font-style:italic;">"ameaçou-o com a maldição de Deus"</span> caso se recusasse a ficar e servir onde a necessidade era urgente. Calvino sentiu <span style="color:#fbbf24;font-style:italic;font-weight:600;">"como se Deus do alto houvesse estendido sua mão poderosa"</span> e capitulou.',
          'Ele nunca quis ser líder eclesiástico. A vocação lhe foi imposta. Essa tensão — o <span style="color:#fb7185;font-weight:700;">intelectual forçado para o centro da ação</span> — marcou toda a sua vida em Genebra, incluindo um período de exílio (<span style="color:#60a5fa;font-weight:700;">1538–1541</span>) quando o Conselho Municipal o expulsou por excesso de rigor. Quando foi chamado de volta, em 1541, teria dito: <span style="background:rgba(192,132,252,0.15);border:1px solid rgba(192,132,252,0.35);border-radius:5px;padding:2px 10px;color:#e9d5ff;font-weight:700;font-style:italic;">"Preferiria a morte a esta cruz."</span> E foi assim mesmo assim.',
        ],
        citacao: 'Calvino nunca quis ser líder eclesiástico. A vocação lhe foi imposta pelo apelo de Farel — e ele passou a vida em Genebra vivendo essa tensão entre o gabinete e o púlpito.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'As Institutas: Uma Obra em Crescimento',
        paragrafos: [
          'Em <span style="color:#60a5fa;font-weight:700;">1536</span>, Calvino publicou a primeira edição das <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;font-style:italic;">Institutas da Religião Cristã</span> — um manual compacto de seis capítulos, originalmente escrito para defender os protestantes franceses perseguidos. Ao longo de sua vida, o livro cresceu em cinco edições até chegar, em <span style="color:#60a5fa;font-weight:700;">1559</span>, a uma enciclopédia teológica de <span style="color:#fbbf24;font-weight:700;">80 capítulos</span>, considerada o maior monumento intelectual da Reforma.',
          'González observa que as Institutas não foram um sistema fechado imposto de cima; <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">cresceram em resposta às polêmicas, às necessidades pastorais e ao aprofundamento do próprio Calvino.</span> É teologia viva, não filosofia abstrata.',
          'O centro organizador das Institutas <span style="color:#fb7185;font-weight:700;">não é a predestinação</span> — como popularmente se pensa. É a <span style="color:#fbbf24;font-weight:800;">soberania de Deus</span>. Para Calvino, tudo começa com o reconhecimento de que Deus é Deus: absoluto, glorioso, incompreensível. A salvação, a ética, a Igreja, os sacramentos — <span style="color:#34d399;font-weight:600;">tudo deriva dessa convicção central</span>.',
        ],
        citacao: 'O centro das Institutas não é a predestinação, mas a soberania de Deus. Tudo em Calvino deriva do reconhecimento de que Deus é Deus.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'Predestinação, Santificação e Genebra como Laboratório',
        paragrafos: [
          'A <span style="color:#c084fc;font-weight:700;">predestinação dupla</span> de Calvino — a ideia de que Deus elegeu alguns para salvação e outros para perdição, por soberania e não por mérito previsto — é a doutrina que mais choques produziu. Mas González insiste num ponto frequentemente ignorado: para Calvino, a predestinação não gera <span style="color:#fb7185;font-weight:600;">passividade</span>, mas <span style="color:#34d399;font-weight:700;">intensa atividade</span>.',
          'O eleito não sabe com certeza absoluta que o é, mas <span style="background:rgba(52,211,153,0.12);border:1px solid rgba(52,211,153,0.30);border-radius:5px;padding:2px 10px;color:#a7f3d0;font-weight:800;">confirma sua eleição pela vida santa, pelo fruto visível da graça</span>. Daí o rigor moral que caracteriza o calvinismo: não porque obras salvam, mas porque o salvo inevitavelmente frutifica. <span style="color:#fbbf24;font-weight:700;">A santificação não é opcional — é evidência.</span>',
          'Por isso Calvino criou o <span style="color:#f97316;font-weight:700;">Consistório</span> em Genebra: um tribunal eclesiástico que aplicava disciplina moral à cidade. Frequentar cultos, viver com integridade, tratar os pobres com justiça — tudo isso era monitorado. Genebra tornou-se um <span style="background:rgba(251,191,36,0.12);border-left:3px solid #fbbf24;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,245,210,0.95);">laboratório da ideia de que o Evangelho transforma não apenas almas, mas cidades inteiras.</span>',
        ],
        citacao: 'Para Calvino, a santificação não é opcional — é evidência. O salvo inevitavelmente frutifica, e esse fruto é ao mesmo tempo dádiva e confirmação da eleição.',
        citacaoAutor: 'João Calvino',
      },
      {
        tipo: 'analise',
        titulo: 'Serveto: A Sombra no Legado de Calvino',
        paragrafos: [
          'Em <span style="color:#60a5fa;font-weight:700;">1553</span>, <strong style="color:#fff;">Miguel Serveto</strong> — teólogo espanhol que negava a Trindade e o batismo infantil — chegou a Genebra. Calvino, que havia trocado correspondência hostil com ele, ordenou sua prisão. Serveto foi julgado, condenado por heresia e <span style="color:#fb7185;font-weight:700;">queimado vivo</span>.',
          'Calvino aprovou a sentença, embora tenha pedido uma forma de morte mais misericordiosa (negada). González não minimiza o episódio: foi um <span style="background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.30);border-radius:5px;padding:1px 7px;color:#fecdd3;font-weight:700;">erro grave, incompatível com o princípio da liberdade de consciência</span> que a Reforma em outros momentos havia defendido. A execução de Serveto é o ponto mais sombrio do legado de Calvino — e um lembrete de que <span style="background:rgba(251,191,36,0.12);border-left:3px solid #fbbf24;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,245,210,0.95);">reformadores genuínos podem perpetuar as mesmas violências que combateram.</span>',
        ],
        citacao: 'Reformadores genuínos podem perpetuar as mesmas violências que combateram. O caso Serveto é o lembrete permanente de que nenhuma teologia nos protege automaticamente do erro moral.',
        citacaoAutor: 'Justo L. González',
      },
    ],
    perguntas: [
      'Calvino foi convocado para uma tarefa que não queria. Como você pensa a tensão entre vocação pessoal e chamado comunitário? Já foi "Farel-ado" — chamado por outros para algo que não escolheria por conta própria?',
      'O calvinismo enfatiza que a eleição se confirma pela vida santa e pela transformação moral. Qual é o risco de transformar isso em moralismo ansioso? Como a graça e a responsabilidade se equilibram na sua própria espiritualidade?',
      'Calvino aprovou a execução de Serveto. Como esse fato deve influenciar a maneira como lemos e avaliamos os grandes teólogos? É possível aprender com alguém sem minimizar seus erros sérios?',
    ],
    oracao: 'Senhor, obrigado pelo dom dos sistematizadores — daqueles que tomam a chama viva da descoberta e a organizam em luz duradoura. Que possamos receber a herança de Calvino com discernimento: a soberania de Deus como fundação inabalável, a santificação como vocação séria, e a disciplina como cuidado mútuo — sem o rigor que pune onde deveria curar.\n\nE que o caso de Serveto nos ensine humildade permanente: que nenhuma teologia, por mais sólida, nos protege automaticamente do erro moral.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. Capítulo 7: "João Calvino" (pp. 149–178).',
  },
  10: {
    dia: 10,
    data: '10 de outubro de 2026',
    titulo: 'O Movimento Anabatista: A Ala Esquerda da Reforma',
    subtitulo: 'Capítulo 6',
    versiculo: 'Mas o Senhor disse-lhe: Vai, porque este é para mim um vaso escolhido.',
    versiculoRef: 'Atos 9.15',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'O Terceiro Caminho — O Mais Perseguido',
        paragrafos: [
          'Nos últimos dias acompanhamos dois caminhos da Reforma: o <span style="color:#f97316;font-weight:700;">alemão de Lutero</span> e o <span style="color:#2dd4bf;font-weight:700;">suíço de Zuínglio</span>. Hoje González nos apresenta um terceiro caminho — o mais perseguido de todos. Os <strong style="color:#fff;">anabatistas</strong> não foram apenas mais um grupo de reformadores; foram a <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:700;">consequência lógica da Reforma levada até o fim</span>, e pagaram o preço mais alto por isso.',
          'O nome <span style="color:#fb7185;font-style:italic;font-weight:700;">"anabatistas"</span> — rebatizadores — foi dado por seus inimigos. Eles próprios recusavam o termo: para eles, o "batismo" recebido na infância <span style="color:#fb7185;font-weight:600;">não era batismo algum</span>, pois a fé é uma decisão pessoal, não um ato imposto a um bebê. Batizar adultos convertidos não era "rebatizar" — <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">era batizar pela primeira vez.</span>',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'Zurique, 21 de Janeiro de 1525: O Dia em que Tudo Começou',
        paragrafos: [
          'Em <span style="color:#60a5fa;font-weight:700;">21 de janeiro de 1525</span>, num círculo de estudo bíblico em Zurique, <strong style="color:#fff;">Conrado Grebel</strong> batizou <strong style="color:#fff;">Jorge Blaurock</strong> — não por imersão, mas por aspersão simples, pois o que importava não era a forma, mas a <span style="color:#34d399;font-weight:700;">fé pessoal que antecedia o ato</span>. Blaurock, em seguida, batizou os demais presentes.',
          'Aquele pequeno grupo sabia exatamente o que estava fazendo. O batismo de adultos era <span style="background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.30);border-radius:5px;padding:1px 7px;color:#fecdd3;font-weight:700;">crime punível com morte</span> tanto no direito eclesiástico quanto no civil. Eles foram os primeiros a saber que estavam assinando uma sentença.',
          'Menos de dois anos depois, <strong style="color:#fff;">Felix Manz</strong> — um dos presentes naquela noite — foi <span style="color:#fb7185;font-weight:700;">afogado no rio Limmat</span> por ordem do Conselho de Zurique. Uma ironia que González não deixa passar: parte do Conselho que aprovou a sentença incluía homens que <span style="color:#2dd4bf;font-weight:600;">Zuínglio havia convencido</span>. O reformador que combatia a autoridade de Roma <span style="background:rgba(251,113,133,0.12);border-left:3px solid #fb7185;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,220,225,0.95);">usava a autoridade civil para executar quem levava seus próprios princípios mais longe do que ele queria ir.</span>',
        ],
        citacao: 'O reformador que combatia a autoridade de Roma usava a autoridade civil para executar quem levava seus próprios princípios mais longe do que ele queria ir.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'A Lógica Anabatista: Onde a Reforma Chegou ao Fim',
        paragrafos: [
          'A grande questão que os anabatistas faziam a Lutero e Zuínglio era simples: se a Igreja deve ser governada pela Escritura, o que fazemos com o <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;font-style:italic;">Corpus Christianum</span> — a ideia de que toda a sociedade é cristã, incluindo bebês batizados à força, príncipes que usam a espada, juízes que condenam à morte?',
          'Para os anabatistas, <span style="color:#fb7185;font-weight:700;">Constantino</span> — o imperador romano que no século IV tornou o cristianismo religião do império — foi a <strong style="color:#fb7185;">grande tragédia da Igreja</strong>. A partir dele, "ser cristão" confundiu-se com "ser cidadão." A Igreja perdeu sua distinção do mundo. O resultado não foi a <span style="color:#34d399;font-weight:600;">cristianização do império</span>, mas a <span style="color:#fb7185;font-weight:700;">mundanização da Igreja</span>.',
          'A solução era radical: a Igreja deve ser uma <span style="background:rgba(52,211,153,0.12);border:1px solid rgba(52,211,153,0.30);border-radius:5px;padding:2px 10px;color:#a7f3d0;font-weight:800;">comunidade voluntária de crentes comprometidos</span>, separada do Estado, disciplinada internamente, disposta ao sofrimento. Nenhum bebê, nenhum coagido, nenhum nominal. Apenas <span style="color:#fbbf24;font-weight:700;">discípulos</span> — no sentido pleno do termo. Daí vinham suas posições mais controversas: <span style="color:#34d399;font-weight:600;">batismo de crentes</span>, <span style="color:#60a5fa;font-weight:600;">pacifismo radical</span>, <span style="color:#a78bfa;font-weight:600;">recusa do juramento</span> e <span style="color:#f97316;font-weight:600;">separação total Igreja-Estado</span>.',
        ],
        citacao: 'A Igreja deve ser uma comunidade voluntária de discípulos comprometidos — não um registro civil religioso onde se entra por nascer e sai por morrer.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'Münster (1534–1535): A Exceção que Manchou Toda a Tradição',
        paragrafos: [
          'González é cuidadoso em distinguir dois tipos de anabatismo. A <span style="color:#34d399;font-weight:700;">grande maioria era pacifista</span> — aceitava a perseguição como parte de seguir a Cristo. Mas havia uma minoria apocalíptica que, convencida de que o fim estava próximo, achava que o povo de Deus deveria estabelecer o reino à força.',
          'Em <span style="color:#60a5fa;font-weight:700;">1534</span>, um grupo de anabatistas revolucionários tomou a cidade de <span style="color:#f97316;font-weight:700;">Münster</span>, na Westfália, e proclamou uma <span style="background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.30);border-radius:5px;padding:1px 7px;color:#fecdd3;font-weight:700;">"Nova Jerusalém"</span> teocrática. Introduziram a poligamia, distribuíram os bens da cidade, executaram dissidentes. Em <span style="color:#60a5fa;font-weight:700;">1535</span>, as forças imperiais retomaram a cidade. Os líderes foram torturados e expostos em <span style="color:#fb7185;font-weight:600;">gaiolas de ferro</span> que ainda hoje pendem do campanário da Igreja de São Lâmberto.',
          'O episódio de Münster foi um presente aos inimigos dos anabatistas: católicos e protestantes usaram a imagem da "Nova Jerusalém" para <span style="background:rgba(251,191,36,0.12);border-left:3px solid #fbbf24;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,245,210,0.95);">desacreditar toda a tradição anabatista — incluindo os pacifistas que nunca empunharam uma espada.</span> É um padrão histórico que se repete: a exceção violenta mancha o todo e justifica a repressão dos inocentes.',
        ],
        citacao: 'A exceção violenta mancha o todo e justifica a repressão dos inocentes. Münster foi o argumento que os inimigos dos anabatistas usaram por séculos para perseguir os pacifistas.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'Menno Simmons e a Sobrevivência: Os Ancestrais dos Batistas',
        paragrafos: [
          'Após Münster, quem reconstruiu o anabatismo pacifista foi <strong style="color:#fff;">Menno Simmons</strong> — um ex-padre neerlandês que se tornou líder itinerante de comunidades dispersas. Seus seguidores tornaram-se os <span style="color:#a78bfa;font-weight:700;">menonitas</span>, que sobrevivem até hoje espalhados pelo mundo, especialmente na América do Norte e do Sul.',
          'González vê nos anabatistas os <span style="background:rgba(52,211,153,0.12);border:1px solid rgba(52,211,153,0.30);border-radius:5px;padding:2px 10px;color:#a7f3d0;font-weight:800;">ancestrais diretos</span> de grande parte do protestantismo moderno: <span style="color:#60a5fa;font-weight:600;">igrejas batistas</span>, <span style="color:#34d399;font-weight:600;">irmãos</span>, <span style="color:#fbbf24;font-weight:600;">pentecostais</span> e boa parte do evangelicalismo que insiste na <span style="color:#f97316;font-weight:700;">conversão pessoal</span>, na <span style="color:#f97316;font-weight:700;">separação Igreja-Estado</span> e na <span style="color:#f97316;font-weight:700;">disciplina comunitária</span>.',
          'A ironia profunda é que as igrejas que hoje constituem o protestantismo mais numeroso do mundo — especialmente no Brasil e na América Latina — carregam no seu DNA anabatista as mesmas convicções que <span style="background:rgba(251,113,133,0.12);border-left:3px solid #fb7185;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,220,225,0.95);">custaram a vida de Felix Manz no rio Limmat em 1527.</span>',
        ],
        citacao: 'As igrejas que insistem em conversão pessoal, separação Igreja-Estado e disciplina comunitária são herdeiras de homens que foram afogados por defender exatamente isso.',
        citacaoAutor: 'Justo L. González',
      },
    ],
    perguntas: [
      'Os anabatistas argumentavam que o Corpus Christianum — a ideia de que toda a sociedade é cristã — dilui a Igreja ao ponto de torná-la inútil. Você vê resquícios dessa confusão entre Igreja e sociedade na sua própria comunidade? Como você pensa a fronteira entre os dois?',
      'O pacifismo radical anabatista ainda é posição de muitas comunidades cristãs (menonitas, irmãos). Como você avalia esse testemunho? Há circunstâncias em que o uso da força é compatível com o Evangelho, ou os anabatistas estavam certos?',
      'Felix Manz foi executado com a aprovação do próprio movimento que o havia inspirado — o de Zuínglio. Como você pensa a tendência dos movimentos de reforma a perseguir aqueles que levam seus princípios mais longe do que os fundadores quiseram? Isso é traição ou sabedoria?',
    ],
    oracao: 'Senhor, que o testemunho dos anabatistas nos incomode onde precisamos ser incomodados: com a facilidade com que chamamos de "cristão" o que é apenas cultural, com a confusão entre pertencer à Igreja e viver como discípulo.\n\nGuarda-nos tanto do entusiasmo que substitui a Tua Palavra por visões próprias, como da covardia que usa a ordem civil para silenciar aqueles que levam a cruz mais longe do que queremos ir.\n\nE que sejamos comunidades de discípulos voluntários — não por coerção, mas por amor.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. Capítulo 6: "O Movimento Anabatista" (pp. 123–148).',
  },
  9: {
    dia: 9,
    data: '9 de outubro de 2026',
    titulo: 'Ulrico Zuínglio e a Reforma na Suíça',
    subtitulo: 'Capítulo 5',
    versiculo: 'Fazei, pois, seja o que for, em palavra ou em obra, fazei tudo em nome do Senhor Jesus, dando por ele graças a Deus Pai.',
    versiculoRef: 'Colossenses 3.17',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'Um Novo Mundo: As Cidades Republicanas da Suíça',
        paragrafos: [
          'Até agora, a Reforma que acompanhamos era <span style="color:#f97316;font-weight:700;">alemã</span> — moldada pela crise interior de Lutero, pela política do Sacro Império, pelos príncipes e pela teologia agostiniana. Hoje González nos leva para um mundo diferente: as <span style="background:rgba(96,165,250,0.15);border:1px solid rgba(96,165,250,0.35);border-radius:5px;padding:1px 8px;color:#bfdbfe;font-weight:700;">cidades republicanas da Confederação Suíça</span>, onde um reformador de temperamento completamente distinto chegou às mesmas conclusões reformadoras por um caminho radicalmente diferente.',
          '<strong style="color:#fff;">Ulrico Zuínglio</strong> nasceu em <span style="color:#60a5fa;font-weight:700;">1484</span>, apenas seis semanas depois de Lutero. Morreu em <span style="color:#fb7185;font-weight:700;">1531</span>, em campo de batalha, <span style="color:#fb7185;font-weight:600;">defendendo Zurique com espada na mão</span>. Sua vida e sua morte dizem algo sobre o tipo de Reforma que ele conduziu — e sobre como ela diferia profundamente da alemã.',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'O Caminho de Zuínglio: Humanismo, Não Angústia',
        paragrafos: [
          '<strong style="color:#fff;">Lutero</strong> chegou à Reforma pela <span style="color:#fb7185;font-weight:700;">angústia</span>: a pergunta que o torturava era <span style="color:#fb7185;font-style:italic;">"como posso estar em paz com um Deus justo?"</span> <strong style="color:#fff;">Zuínglio</strong> chegou pela <span style="color:#34d399;font-weight:700;">erudição</span>: o estudo humanista das Escrituras no original grego o levou a ver que as práticas medievais não tinham fundamento bíblico. Dois homens, um mesmo destino reformador — caminhos <span style="background:rgba(251,191,36,0.12);border-left:3px solid #fbbf24;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,245,210,0.95);">completamente opostos.</span>',
          'Zuínglio estudou com os melhores humanistas de sua época. Lia <span style="color:#a78bfa;font-weight:600;">Erasmo</span> com entusiasmo. Copiou à mão as cartas de Paulo em grego para melhor memorizá-las. Quando se tornou padre-principal da <span style="color:#f97316;font-weight:700;">Großmünster</span> (Grande Catedral) de Zurique em <span style="color:#60a5fa;font-weight:700;">1519</span>, anunciou que iria pregar o Novo Testamento do começo ao fim — <span style="color:#34d399;font-weight:600;">sem os acréscimos medievais, sem alegorias, sem a retórica escolástica</span>.',
          'A Reforma em Zurique <span style="background:rgba(52,211,153,0.12);border:1px solid rgba(52,211,153,0.30);border-radius:5px;padding:2px 10px;color:#a7f3d0;font-weight:800;">não começou com um manifesto dramático, mas com sermões sistemáticos da Escritura.</span> O povo foi reformado um capítulo de cada vez.',
        ],
        citacao: 'A Reforma em Zurique não começou com um manifesto dramático. Começou com sermões sistemáticos da Escritura — o povo foi reformado um capítulo de cada vez.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'A Reforma como Projeto Cívico: O Conselho Decide',
        paragrafos: [
          'Diferente da Reforma alemã, que dependia de <span style="color:#f97316;font-weight:700;">príncipes territoriais</span>, a Reforma suíça se deu nas <span style="color:#60a5fa;font-weight:700;">cidades</span> — e as cidades suíças eram governadas por <span style="color:#60a5fa;font-weight:600;">conselhos municipais</span>. Zuínglio compreendeu que reformar Zurique significava <strong style="color:#fff;">convencer o Conselho</strong>.',
          'Em <span style="color:#60a5fa;font-weight:700;">1523</span>, Zuínglio convocou uma <span style="color:#fbbf24;font-weight:700;">Disputa pública</span>: apresentou <span style="color:#c084fc;font-weight:800;">67 teses</span> afirmando que a Escritura era a única autoridade para a Igreja. O Conselho Municipal de Zurique compareceu para arbitrar o debate entre Zuínglio e o representante do bispo de Constança. Ao final, <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">o Conselho declarou Zuínglio o vencedor</span> — e com isso, assumiu o papel de autoridade reformadora da cidade.',
          'González observa a <span style="color:#fb7185;font-weight:700;">ambiguidade desse modelo</span>: ao fazer o Conselho civil árbitro de disputas teológicas, Zuínglio ganhou velocidade e eficácia, mas criou uma Reforma dependente do braço secular. <span style="background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.30);border-radius:5px;padding:1px 7px;color:#fecdd3;font-weight:700;">Quando o Conselho mudava de posição, a Reforma mudava também.</span>',
        ],
        citacao: 'Ao fazer o Conselho civil árbitro de disputas teológicas, Zuínglio ganhou eficácia — mas criou uma Reforma dependente do braço secular.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'Sola Scriptura Mais Radical: Apenas o que Está na Escritura',
        paragrafos: [
          'O princípio de Sola Scriptura de Zuínglio era <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;">mais radical</span> que o de Lutero. Para Lutero, a posição era: <span style="color:#f97316;font-weight:700;">"nada que contradiga as Escrituras"</span> — mantendo tradições e práticas que não fossem explicitamente proibidas pela Bíblia. Para Zuínglio, a posição era: <span style="color:#34d399;font-weight:700;">"apenas o que está nas Escrituras."</span>',
          'Isso produziu uma Reforma litúrgica mais severa: <span style="color:#fb7185;font-weight:600;">imagens removidas</span>, <span style="color:#fb7185;font-weight:600;">músicas instrumentais proibidas</span> (Zuínglio era músico talentoso, mas concluiu que a música instrumental não tinha base bíblica nas assembleias), <span style="color:#fb7185;font-weight:600;">culto drasticamente simplificado</span>. A Ceia era celebrada em silêncio, com pão e vinho circulando pelos fiéis sentados em bancos — o oposto do drama litúrgico medieval.',
          'González observa que a diferença entre Lutero e Zuínglio sobre o que é Sola Scriptura <span style="background:rgba(192,132,252,0.12);border-left:3px solid #a78bfa;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(230,220,255,0.95);">persiste em todas as tradições protestantes até hoje</span>: igrejas que mantêm o que a Bíblia não proíbe versus igrejas que só mantêm o que a Bíblia ordena explicitamente.',
        ],
        citacao: 'A diferença entre "nada que contradiga as Escrituras" e "apenas o que está nas Escrituras" pode parecer sutil — mas produziu dois mundos litúrgicos completamente distintos.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'Marburgo 1529: A Divisão que Persiste até Hoje',
        paragrafos: [
          'Em <span style="color:#60a5fa;font-weight:700;">1529</span>, <span style="color:#f97316;font-weight:700;">Felipe da Hesse</span> convocou Lutero e Zuínglio a <span style="color:#fbbf24;font-weight:700;">Marburgo</span> para tentar unir os reformadores diante da ameaça imperial. Os dois concordaram em <span style="color:#34d399;font-weight:800;">quatorze dos quinze artigos</span> discutidos. No décimo-quinto — a <span style="color:#c084fc;font-weight:700;">Ceia do Senhor</span> — não conseguiram avançar.',
          'Lutero acreditava na <span style="color:#fbbf24;font-weight:700;">presença real de Cristo</span> no pão e no vinho. Conta-se que escreveu <span style="background:rgba(192,132,252,0.15);border:1px solid rgba(192,132,252,0.35);border-radius:5px;padding:2px 10px;color:#e9d5ff;font-weight:800;font-style:italic;">"Hoc est corpus meum"</span> (Este é o meu corpo) na mesa com giz, recusando qualquer interpretação simbólica. Zuínglio argumentava que <span style="color:#34d399;font-style:italic;">"é"</span> significa <span style="color:#34d399;font-style:italic;">"significa"</span> — a presença de Cristo ressurreto não pode estar no pão pois seu corpo está à direita do Pai.',
          'Lutero encerrou o colóquio declarando: <span style="background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.30);border-radius:5px;padding:2px 10px;color:#fecdd3;font-weight:800;font-style:italic;">"Não somos do mesmo espírito."</span> A Reforma nasceu dividida — <span style="color:#f97316;font-weight:700;">luteranos</span> de um lado, <span style="color:#2dd4bf;font-weight:700;">reformados/zwinglianos</span> do outro. Essa divisão moldaria o protestantismo pelos séculos seguintes — e é a mesma que separa tradições evangélicas ainda hoje.',
        ],
        citacao: 'Dois homens que amavam a mesma Escritura, combatiam o mesmo papado e queriam reformar a mesma Igreja — e não conseguiram ficar juntos. A Reforma nasceu dividida.',
        citacaoAutor: 'Justo L. González',
      },
    ],
    perguntas: [
      'Zuínglio chegou à Reforma pelo humanismo e pelo estudo; Lutero, pela angústia espiritual. Os dois caminhos produziram teologias diferentes. Qual desses caminhos ressoa mais com a sua própria experiência de fé? Que diferenças isso faz na teologia que você abraça?',
      'A Reforma suíça dependia do Conselho civil para avançar. Quais são os riscos de uma reforma eclesiástica que depende de aprovação institucional externa — seja do Estado, da denominação, ou da liderança local?',
      'Em Marburgo, Lutero e Zuínglio concordaram em 14 de 15 artigos e ainda assim se separaram. O que esse episódio ensina sobre como comunidades de fé lidam com discordâncias em pontos que consideram centrais? Como distinguir o que é essencial do que é periférico?',
    ],
    oracao: 'Senhor, que a história de Marburgo nos ensine humildade: que dois homens que amavam a Tua Palavra e buscavam reformar a Igreja chegaram a conclusões opostas sobre a Tua mesa. Que esse fato nos preserve do orgulho de achar que temos a interpretação única e definitiva.\n\nE que, ao mesmo tempo, nos fortifique a não sacrificar a verdade à falsa paz. Dá-nos a sabedoria para saber quando ceder e quando permanecer, e a graça de fazê-lo com amor.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. Capítulo 5: "Ulrico Zuínglio e a Reforma na Suíça" (pp. 101–122).',
  },
  8: {
    dia: 8,
    data: '8 de outubro de 2026',
    titulo: 'Uma Década de Incertezas: Wartburgo e a Bíblia Alemã',
    subtitulo: 'Capítulo 4',
    versiculo: 'Toda a Escritura é divinamente inspirada e proveitosa para ensinar, para repreender, para corrigir, para instruir em justiça; para que o homem de Deus seja perfeito e perfeitamente instruído para toda boa obra.',
    versiculoRef: '2 Timóteo 3.16–17',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'A Reforma no Fio da Navalha: Providência e Geopolítica',
        paragrafos: [
          'Em <span style="color:#60a5fa;font-weight:700;">Worms</span>, Lutero se recusou a retratar-se. O <span style="color:#fb7185;font-weight:700;">Edito de Worms de 1521</span> o declarou herege e fora-da-lei: qualquer pessoa podia matá-lo sem punição legal. A Reforma, aparentemente, havia chegado ao fim antes de começar.',
          'Mas González nos mostra que a sobrevivência da Reforma foi, em grande medida, obra da <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:700;">providência operando através de circunstâncias políticas</span>. <strong style="color:#fff;">Carlos V</strong> estava em guerra com <span style="color:#f97316;font-weight:600;">Francisco I da França</span> e ameaçado pelos <span style="color:#f97316;font-weight:600;">turcos otomanos</span> no leste. Precisava da cooperação dos príncipes alemães. Não tinha como executar o Edito de Worms sem perder aliados indispensáveis.',
          'Foi nessa janela geopolítica que a Reforma sobreviveu — <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">não por força espiritual intrínseca, mas porque os inimigos estavam distraídos.</span> A providência divina raramente é espetacular. Com frequência, veste roupas de circunstância histórica.',
        ],
        citacao: 'A providência divina raramente é espetacular. Com frequência, veste roupas de circunstância histórica — uma guerra, um príncipe aliado, um inimigo distraído.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'O Castelo de Wartburgo: Cativeiro Transformado em Obra',
        paragrafos: [
          'Na estrada de volta de Worms, homens mascarados "sequestraram" Lutero — na verdade, por ordem de <strong style="color:#fff;">Frederico, o Sábio</strong>, eleitor da Saxônia, que queria protegê-lo sem aparecer publicamente como seu defensor. Lutero foi levado ao <span style="color:#fbbf24;font-weight:700;">Castelo de Wartburgo</span>, onde viveu disfarçado como <span style="color:#a78bfa;font-style:italic;font-weight:600;">"Cavaleiro Jorge"</span> — com barba e trajes laicos — por cerca de dez meses.',
          'A Europa inteira acreditou que Lutero estava morto. <span style="color:#fb7185;font-weight:600;">Erasmo lamentou sua morte.</span> <span style="color:#fb7185;font-weight:600;">Roma comemorou.</span> Enquanto isso, o "morto" trabalhava.',
          'Naquele castelo remoto, Lutero realizou o que González considera sua <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;">maior contribuição prática à Reforma</span>: traduziu o Novo Testamento para o alemão — em apenas <span style="color:#34d399;font-weight:800;">onze semanas</span>. A Bíblia inteira seria completada em <span style="color:#60a5fa;font-weight:700;">1534</span>. O "cativeiro" havia se tornado a obra mais duradoura da Reforma.',
        ],
        citacao: 'O cativeiro de Wartburgo foi a providência disfarçada de prisão. Lutero entrou escondido e saiu com a Bíblia em alemão nas mãos.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'A Bíblia Alemã: Uma Língua Forjada pela Palavra',
        paragrafos: [
          'A tradução de Lutero não foi apenas um projeto religioso. Ela <span style="background:rgba(52,211,153,0.12);border:1px solid rgba(52,211,153,0.30);border-radius:5px;padding:2px 10px;color:#a7f3d0;font-weight:800;">forjou a língua alemã moderna.</span> Lutero não traduziu para o alemão dos estudiosos, mas para o alemão do mercado, da cozinha, da rua. Como ele próprio disse, consultou <span style="color:#fbbf24;font-style:italic;">"a mãe de família, as crianças na rua, o homem comum no mercado"</span> para encontrar as palavras certas.',
          'O resultado foi uma obra literária que <span style="color:#34d399;font-weight:600;">unificou dialetos</span>, <span style="color:#34d399;font-weight:600;">estabeleceu normas gramaticais</span> e deu ao povo alemão uma <span style="color:#34d399;font-weight:600;">identidade linguística comum</span>. Para muitos dialetos regionais, a Bíblia de Lutero foi o primeiro texto escrito na sua língua cotidiana.',
          'González sublinha a consequência teológica profunda: ao colocar a Bíblia nas mãos do povo em linguagem acessível, Lutero tornou o <span style="background:rgba(192,132,252,0.15);border:1px solid rgba(192,132,252,0.35);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;">leigo intérprete legítimo das Escrituras</span>. O monopólio clerical da Palavra estava rompido — e isso <span style="color:#fb7185;font-weight:600;">nunca poderia ser desfeito.</span>',
        ],
        citacao: 'Ao colocar a Bíblia nas mãos do povo em linguagem acessível, Lutero tornou o leigo intérprete legítimo das Escrituras. O monopólio clerical da Palavra estava rompido para sempre.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'A Crise em Wittenberg: Os Perigos da Reforma sem Lutero',
        paragrafos: [
          'Durante o exílio de Lutero, seu colega <strong style="color:#fff;">Carlstadt</strong> (Andreas Bodenstein) radicalizou as reformas em Wittenberg: removeu imagens das igrejas, aboliu o celibato clerical e celebrou a Ceia em forma totalmente simplificada. Logo chegaram os chamados <span style="color:#fb7185;font-weight:700;">"Profetas de Zwickau"</span> — três leigos que alegavam receber revelação direta de Deus, <span style="color:#fb7185;font-weight:600;">dispensando a mediação das Escrituras</span>.',
          '<strong style="color:#fff;">Melanchthon</strong>, jovem demais e temperamentalmente moderado, não conseguiu controlar a situação. Wittenberg estava se fragmentando.',
          'Lutero voltou. Em <span style="color:#60a5fa;font-weight:700;">março de 1522</span>, sem a proteção de Frederico, <span style="color:#fbbf24;font-style:italic;">confiando apenas em Deus segundo suas próprias palavras</span>, Lutero chegou a Wittenberg e pregou <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;">oito sermões em oito dias consecutivos</span>. O resultado: Carlstadt foi marginalizado, os Profetas de Zwickau expulsos, e a reforma moderada restaurada. González identifica aqui um padrão: <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">toda reforma interna produz alianças e rupturas — o líder precisa discernir onde está o limite entre ímpeto reformador e radicalização destrutiva.</span>',
        ],
        citacao: 'Toda reforma interna produz alianças e rupturas. O líder precisa discernir onde está o limite entre o ímpeto reformador legítimo e a radicalização destrutiva.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'A Revolta dos Camponeses (1524–1525): O Teste Mais Difícil',
        paragrafos: [
          'A linguagem de <span style="color:#fbbf24;font-weight:700;">"liberdade cristã"</span> da Reforma alimentou expectativas sociais que Lutero nunca pretendera satisfazer. Em <span style="color:#60a5fa;font-weight:700;">1524</span>, os camponeses do sul da Alemanha se rebelaram, usando a retórica reformadora para exigir o fim da servidão e redistribuição de terras.',
          'A resposta de Lutero foi devastadora: ele escreveu <span style="background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.30);border-radius:5px;padding:1px 7px;color:#fecdd3;font-weight:700;font-style:italic;">"Contra as hordas assassinas e ladronas dos camponeses"</span>, instando os príncipes a esmagar a revolta com violência. <span style="color:#fb7185;font-weight:700;">Dezenas de milhares de camponeses foram mortos.</span>',
          'González <strong style="color:#fff;">não minimiza a dureza desta decisão</strong>. Lutero havia, em certo sentido, traído os mais pobres. Mas também demonstrou sua doutrina dos <span style="color:#a78bfa;font-weight:700;">Dois Reinos</span> em ação: a <span style="color:#60a5fa;font-weight:600;">justiça temporal pertence ao reino temporal</span>, não ao Evangelho. <span style="background:rgba(167,139,250,0.12);border-left:3px solid #a78bfa;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(230,220,255,0.95);">A liberdade cristã é espiritual, não política</span> — e essa distinção, para Lutero, era inegociável, mesmo quando custava vidas.',
        ],
        citacao: 'A liberdade cristã que Lutero proclamava era espiritual, não política. E essa distinção, mesmo quando custou vidas, ele considerou inegociável.',
        citacaoAutor: 'Justo L. González',
      },
    ],
    perguntas: [
      'Lutero transformou o "cativeiro" de Wartburgo em sua maior obra. Onde em sua vida você tem encontrado espaços de aparente inação — uma limitação, uma espera, um confinamento — que poderiam ser transformados em obras duradouras?',
      'A sobrevivência da Reforma dependeu de circunstâncias geopolíticas — Carlos V ocupado, príncipes protetores. Como você pensa a relação entre providência divina e fatores históricos contingentes? Onde você vê a mão de Deus atuando através do "acidental"?',
      'A resposta de Lutero à Revolta dos Camponeses chocou muitos de seus seguidores. A doutrina dos Dois Reinos pode legitimar o desengajamento cristão diante da injustiça social? Como você equilibra a distinção entre os reinos sem cair na indiferença?',
    ],
    oracao: 'Senhor, obrigado pela lição de Wartburgo: que os períodos de confinamento e silêncio podem ser os mais frutíferos, se os entregamos a Ti. Que nos ensinemos a transformar esperas em obras, limitações em dons.\n\nGuarda-nos também da ilusão de que a Reforma social virá apenas pela proclamação espiritual, e da ilusão oposta de que o Evangelho se reduz à transformação das estruturas. Que possamos viver a tensão entre os dois reinos com sabedoria, justiça e compaixão.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. Capítulo 4: "Uma Década de Incertezas" (pp. 75–100).',
  },
  1: {
    dia: 1,
    data: '1 de outubro de 2026',
    titulo: 'O Século XVI: Quando o Mundo Mudou de Vez',
    subtitulo: 'Introdução geral à obra — A Era dos Reformadores',
    versiculo: 'Eis que faço uma coisa nova; agora ela se manifesta; não a percebeis vós?',
    versiculoRef: 'Isaías 43.19',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'Contexto Histórico',
        paragrafos: [
          'O <span style="color:#fbbf24;font-weight:700;">século XVI</span> foi, talvez, o século mais transformador da história do cristianismo desde a era apostólica. Em menos de cem anos, a Igreja que havia dominado a Europa por <strong style="color:#fff;">mil anos</strong> se fragmentou de forma irreversível, nasceram dezenas de tradições cristãs distintas, e o mapa religioso do Ocidente foi <span style="color:#f97316;font-weight:600;">redesenhado para sempre</span>.',
          'Mas o historiador <strong style="color:#fff;">Justo L. González</strong> nos convida, logo de início, a ampliar o foco. O título do volume — <span style="color:#a78bfa;font-style:italic;">"A Era dos Reformadores"</span> — poderia sugerir que se trata apenas de Lutero, Calvino e Zuínglio. Não é assim. González escreve de um <span style="color:#34d399;font-weight:600;">ponto de vista latino-americano</span>, e isso muda a pergunta.',
          'Ele nos lembra: enquanto <span style="color:#f97316;font-weight:600;">Lutero pregava em Wittenberg</span>, <span style="color:#fb7185;font-weight:600;">Cortés desembarcava no México</span>. Enquanto <span style="color:#f97316;font-weight:600;">Calvino sistematizava a teologia reformada em Genebra</span>, <span style="color:#fb7185;font-weight:600;">Francisco Pizarro conquistava o Império Inca</span>. A Era dos Reformadores é simultaneamente a <strong style="color:#fff;">Era dos Conquistadores</strong>.',
        ],
        citacao: 'A Era dos Reformadores é simultaneamente a Era dos Conquistadores — dois eventos do mesmo século, moldados pelas mesmas forças políticas, com consequências igualmente duradouras para o cristianismo mundial.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'O Que Estava em Jogo',
        paragrafos: [
          'Para compreender a Reforma, é preciso entender o que existia antes dela: o ideal do <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;font-style:italic;">Corpus Christianum</span>. Durante séculos, a Europa cristã funcionava sob a premissa de que <strong style="color:#fff;">Igreja e sociedade eram a mesma coisa</strong>. Nascer significava ser batizado. Ser cidadão significava ser cristão. O papa era a cabeça espiritual de toda a cristandade, e os reis reinavam sob sua autoridade.',
          'Esse ideal nunca foi perfeito — estava cheio de <span style="color:#fb7185;font-weight:600;">tensões, corrupções e contradições</span>. Mas era o horizonte que organizava a vida de todos.',
          'A Reforma vai <strong style="color:#fb7185;">destruir esse horizonte</strong>. Não de uma vez, não por um plano deliberado — mas por uma série de eventos que, acumulados, tornam impossível restaurar a unidade perdida. Ao final do século XVI, a ideia de uma Europa cristã unificada sob Roma será, na prática, <span style="color:#fbbf24;font-style:italic;">história</span>.',
          'O <span style="color:#34d399;font-weight:700;">pluralismo religioso</span> que hoje consideramos natural — a coexistência de <span style="color:#60a5fa;font-weight:600;">católicos, luteranos, calvinistas, anglicanos, batistas</span> — não foi planejado. Foi uma <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">consequência não-intencional de homens e mulheres que queriam reformar a Igreja, não dividi-la.</span>',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'A Perspectiva de González',
        paragrafos: [
          'González escreve como <span style="color:#34d399;font-weight:700;">teólogo cubano-americano</span>, e essa perspectiva importa. A historiografia clássica da Reforma é <span style="color:#fb7185;font-weight:600;">germanocêntrica</span>: começa com Lutero em <span style="background:rgba(192,132,252,0.18);border:1px solid rgba(192,132,252,0.40);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:900;">1517</span> e trata a Espanha principalmente como inimiga da Reforma. <strong style="color:#fff;">González inverte a ordem.</strong>',
          'Para ele, a história começa com <span style="color:#fbbf24;font-weight:700;">Isabel de Castela</span> e o cardeal <span style="color:#fbbf24;font-weight:700;">Cisneros</span>, que ainda no final do século XV já haviam iniciado uma profunda reforma do clero espanhol — <span style="color:#f97316;font-style:italic;">antes de qualquer tese de Lutero</span>. A Espanha não é apenas o obstáculo à Reforma; é parte de sua <strong style="color:#fff;">pré-história</strong>.',
          'Além disso, González insiste que a <span style="color:#fb7185;font-weight:700;">conquista da América</span> é inseparável da Reforma Protestante como capítulo da história do cristianismo. Os dois eventos definiram o que seria o cristianismo nos séculos seguintes — um em direção ao <span style="color:#60a5fa;font-weight:600;">norte da Europa e ao mundo anglófono</span>; outro em direção à <span style="color:#34d399;font-weight:600;">América Latina e ao mundo ibérico</span>.',
        ],
        citacao: 'Entender a Reforma sem a Conquista é entender metade da história.',
        citacaoAutor: 'Justo L. González',
      },
    ],
    perguntas: [
      'Você costuma pensar na Reforma Protestante como um evento europeu distante, ou como algo que moldou diretamente a fé que você pratica? De que forma sua tradição cristã é herdeira do século XVI?',
      'A Reforma não foi planejada — foi consequência de homens e mulheres que queriam apenas corrigir erros. O que isso diz sobre como Deus age na história? Sobre como movimentos de renovação se desenvolvem?',
      'González lembra que a Era dos Reformadores é também a Era dos Conquistadores. Como essa perspectiva ampliada muda a maneira de você ler a história da Igreja?',
    ],
    oracao: 'Senhor, ao iniciarmos esta jornada pelo século XVI, pedimos sabedoria para olhar a história sem ingenuidade e sem cinismo. Ajuda-nos a ver Tua mão nos eventos que pareciam apenas políticos, nos conflitos que pareciam apenas humanos, nas rupturas que produziram consequências que ninguém previu.\n\nQue este estudo não seja apenas informação histórica, mas formação espiritual. Que ao conhecermos melhor de onde viemos, saibamos melhor para onde vamos.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. (Série "E até aos confins da Terra", vol. 6) — Introdução e Capítulo 14 (para visão panorâmica).',
  },
};

export default DIAS_CONTENT;
