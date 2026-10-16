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
  13: {
    dia: 13,
    data: '13 de outubro de 2026',
    titulo: 'O Luteranismo após Lutero: Guerra, Derrota e Sobrevivência',
    subtitulo: 'Capítulo 9',
    versiculo: 'Porque nem a morte, nem a vida, nem os anjos, nem os principados, nem as potestades, nem o presente, nem o porvir, nem a altura, nem a profundidade, nem qualquer outra criatura nos poderá separar do amor de Deus, que está em Cristo Jesus nosso Senhor.',
    versiculoRef: 'Romanos 8.38–39',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'O Momento Heroico Acabou',
        paragrafos: [
          'Até aqui, acompanhamos a Reforma em seu <span style="color:#fbbf24;font-weight:700;">momento heroico</span>: Lutero diante de Worms, Calvino sistematizando as Institutas, Knox confrontando rainhas. Hoje González nos conduz a um capítulo mais <span style="color:#fb7185;font-weight:600;">sombrio</span> — e mais instrutivo: o que acontece com um movimento reformador quando seu fundador morre e os inimigos atacam?',
          'Lutero morreu em fevereiro de <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;">1546</span>. Poucos meses depois, Carlos V lançou a <span style="color:#fb7185;font-weight:700;">Guerra de Esmalcalda</span> — e a venceu. A pergunta que toda a Europa protestante se fazia era a mesma que toda geração perseguida se faz: <span style="background:rgba(192,132,252,0.15);border:1px solid rgba(192,132,252,0.35);border-radius:5px;padding:2px 10px;color:#e9d5ff;font-weight:700;font-style:italic;">sobreviveria a Reforma sem Lutero e sem vitória militar?</span>',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'A Liga de Esmalcalda e a Derrota de Mühlberg',
        paragrafos: [
          'Os príncipes protestantes alemães haviam formado a <span style="color:#fbbf24;font-weight:700;">Liga de Esmalcalda</span> em 1531 como aliança de defesa mútua. Por mais de uma década, Carlos V tolerou sua existência — precisava deles contra os <span style="color:#60a5fa;font-weight:600;">turcos</span> e contra <span style="color:#60a5fa;font-weight:600;">Francisco I da França</span>. Quando esses conflitos se resolveram, voltou sua atenção para a Alemanha.',
          'Na batalha de <span style="color:#fb7185;font-weight:700;">Mühlberg (1547)</span>, Carlos V derrotou os príncipes protestantes de forma esmagadora. <span style="color:#f97316;font-weight:600;">Felipe de Hesse</span> e <span style="color:#f97316;font-weight:600;">João Frederico da Saxônia</span> foram capturados. O movimento parecia decapitado.',
          'González aponta um detalhe revelador: a Liga já estava fragilizada antes da batalha. <span style="color:#fb7185;font-weight:700;">Maurício da Saxônia</span> — duque luterano — havia <span style="background:rgba(251,113,133,0.12);border-left:3px solid #fb7185;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,220,225,0.95);">traído a Liga em favor de Carlos V em troca de territórios.</span> A Reforma foi vendida por um de seus próprios — lição que toda geração da Igreja precisa aprender de novo.',
        ],
        citacao: 'O maior inimigo de um movimento muitas vezes não é o perseguidor externo, mas a traição que vem de dentro.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'O Interim de Augsburgo: O Limite do Poder Político',
        paragrafos: [
          'Com os príncipes capturados, Carlos V tentou impor uma solução: o <span style="color:#fbbf24;font-weight:700;">Interim de Augsburgo (1548)</span>. Era um compromisso: as regiões protestantes voltariam ao catolicismo, com apenas duas concessões — os clérigos poderiam se casar e os leigos receber a Ceia sob as <span style="color:#34d399;font-weight:600;">duas espécies (pão e vinho)</span>.',
          'A solução foi um fracasso em <strong style="color:#fff;">ambos os lados</strong>. Os católicos achavam que as concessões eram demais. Os protestantes, que eram de menos — <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">nenhuma das doutrinas centrais havia sido tocada: justificação pela fé, autoridade da Escritura, rejeição do purgatório.</span>',
          'O Interim revelou o que González chama de <span style="color:#c084fc;font-weight:700;">limite do poder político sobre a consciência</span>: Carlos V podia capturar príncipes, mas não podia capturar convicções. A Reforma havia entrado profundamente demais na alma do povo alemão para ser revertida por decreto. <span style="color:#fbbf24;font-style:italic;">Reis podem mudar fronteiras; não podem mudar fés.</span>',
        ],
        citacao: 'Carlos V podia capturar príncipes, mas não podia capturar convicções.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'A Reviravolta de Maurício e a Paz de Augsburgo',
        paragrafos: [
          'O mesmo Maurício da Saxônia que havia traído os protestantes voltou a trair — desta vez, <span style="color:#34d399;font-weight:700;">o imperador</span>. Em 1552, atacou Carlos V de surpresa, quase o capturando. O imperador, exausto de guerras, negociou.',
          'O resultado foi a <span style="color:#fbbf24;font-weight:800;">Paz de Augsburgo (1555)</span>: cada príncipe alemão poderia escolher entre luteranismo e catolicismo para o seu território. O princípio ficou conhecido pela fórmula latina <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;font-style:italic;">cuius regio, eius religio</span> — de quem o território, dessa a religião.',
          'González é preciso sobre o significado histórico: pela primeira vez na cristandade europeia, um acordo legal reconhecia que podia haver <span style="color:#34d399;font-weight:700;">mais de uma religião cristã</span>. Era o fim prático do ideal medieval de uma única Igreja unificada sob Roma. <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">O pluralismo religioso não nasceu da tolerância — nasceu da exaustão e do equilíbrio de forças.</span>',
          '<strong style="color:#fb7185;">Limitação importante:</strong> o <span style="color:#c084fc;font-weight:700;">calvinismo</span> não foi reconhecido pela Paz de Augsburgo — apenas o luteranismo. Os calvinistas teriam que encontrar outras formas de legitimidade, o que contribuiu para sua resistência mais radical ao poder estatal.',
        ],
        citacao: 'O pluralismo religioso não nasceu da tolerância — nasceu da exaustão e do equilíbrio de forças.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'Divisões Internas e a Fórmula de Concórdia',
        paragrafos: [
          'Com a ameaça externa momentaneamente resolvida, os luteranos voltaram-se para suas <span style="color:#fb7185;font-weight:700;">disputas internas</span>. O principal conflito foi entre os seguidores de <span style="color:#fbbf24;font-weight:700;">Melanchthon</span> — mais conciliatórios com o calvinismo e com os católicos — e os <span style="color:#f97316;font-weight:700;">"gnesioluteranos"</span> (luteranos genuínos), que acusavam Melanchthon de trair o legado de Lutero.',
          'As disputas envolviam questões centrais: qual o papel das obras na salvação? A vontade humana coopera de alguma forma com a graça? A presença de Cristo na Ceia é <span style="color:#c084fc;font-weight:600;">real</span> ou <span style="color:#60a5fa;font-weight:600;">espiritual</span>?',
          'A solução veio com a <span style="color:#34d399;font-weight:700;">Fórmula de Concórdia (1577)</span> — documento que estabeleceu as posições luteranas oficiais e criou a base do <strong style="color:#fff;">luteranismo confessional</strong> que persiste até hoje. A lição: movimentos precisam formular o que creem com precisão — não apenas para se defender de inimigos externos, mas para <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">preservar a herança contra a diluição interna.</span>',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'A Escandinávia: Reforma por Decreto',
        paragrafos: [
          'A expansão mais ordenada — e mais ambígua — do luteranismo ocorreu ao norte. <span style="color:#60a5fa;font-weight:700;">Gustavo Vasa</span>, rei da Suécia, adotou o luteranismo em 1527 — não primariamente por convicção teológica, mas porque <span style="color:#fb7185;font-weight:600;">precisava dos recursos das igrejas e dos mosteiros</span> para consolidar seu novo estado nacional.',
          'A Dinamarca, a Noruega e a Finlândia seguiram padrão semelhante: a Reforma foi imposta de cima para baixo pelos reis, sem os conflitos sangrentos da Alemanha. González observa o paradoxo: <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:700;">as reformas mais tranquilas foram as mais oportunistas.</span> <em>A profundidade da convicção não se mede pela facilidade da adoção.</em>',
        ],
        citacao: 'As reformas mais tranquilas foram as mais oportunistas. A profundidade da convicção não se mede pela facilidade da adoção.',
        citacaoAutor: 'Justo L. González',
      },
    ],
    perguntas: [
      'A Reforma sobreviveu à derrota militar porque já havia penetrado a consciência popular. O que isso diz sobre a diferença entre um movimento espiritual genuíno e um projeto político que depende de vitórias para sobreviver?',
      'O Interim de Augsburgo mostrou que o poder político tem limites sobre a consciência religiosa. Onde você percebe esse limite hoje — situações em que decretos ou pressões externas não conseguem tocar convicções mais profundas?',
      'A Paz de Augsburgo nasceu da exaustão, não da tolerância. O pluralismo religioso moderno tem raízes semelhantes? Como isso deve moldar nossa gratidão pela liberdade religiosa que temos?',
    ],
    oracao: 'Senhor, obrigado porque nenhuma derrota política pode extinguir o fogo que o Teu Espírito acende nas consciências. A Reforma sobreviveu à Guerra de Esmalcalda não pela força dos príncipes, mas porque havia entrado fundo demais na alma do povo para ser arrancada por decreto.\n\nQue esse mesmo fogo arda em nós — não a religiosidade que depende de condições favoráveis, mas a convicção que resiste quando as condições se invertem.\n\nE que aprendamos com as divisões internas do luteranismo: o maior inimigo de um movimento muitas vezes não é o perseguidor externo, mas a disputa interna que consume as energias que deveriam ser dirigidas ao mundo.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. Capítulo 9: "O Curso Posterior do Luteranismo" (pp. 215–240).',
  },
  14: {
    dia: 14,
    data: '14 de outubro de 2026',
    titulo: 'Fé e Resistência: A Reforma nos Países Baixos',
    subtitulo: 'Capítulo 10',
    versiculo: 'Sede firmes e corajosos. Não temais nem vos assusteis diante deles, porque o Senhor, vosso Deus, vai convosco; não vos abandonará nem vos desamparará.',
    versiculoRef: 'Deuteronômio 31.6',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'Um Teatro Diferente — e Igualmente Dramático',
        paragrafos: [
          'Se o capítulo anterior nos mostrou a Reforma lutando para sobreviver na Alemanha, este nos leva para um teatro diferente e igualmente dramático: <span style="color:#60a5fa;font-weight:700;">os Países Baixos</span>. Aqui a Reforma não apenas sobreviveu — ela se fundiu com a resistência de um povo inteiro e produziu a <span style="color:#34d399;font-weight:700;">primeira república protestante da Europa moderna</span>.',
          'González nos apresenta uma Reforma <span style="color:#fbbf24;font-weight:700;">inseparável da política</span>, onde a fé calvinista e a luta pela independência nacional se tornaram uma única chama. A pergunta que esse capítulo levanta é perturbadora e atual: <span style="background:rgba(192,132,252,0.15);border:1px solid rgba(192,132,252,0.35);border-radius:5px;padding:2px 10px;color:#e9d5ff;font-weight:700;font-style:italic;">quando fé e política se fundem, quem está a serviço de quem?</span>',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'As Dezessete Províncias e o Domínio de Felipe II',
        paragrafos: [
          'Os Países Baixos — o que hoje é a Holanda, a Bélgica e o Luxemburgo — eram uma das regiões mais <span style="color:#fbbf24;font-weight:700;">prósperas e comercialmente desenvolvidas</span> da Europa. Foram herdados por <span style="color:#60a5fa;font-weight:600;">Carlos V</span>, cujo filho <span style="color:#f97316;font-weight:700;">Felipe II</span> os recebeu como parte do enorme império espanhol.',
          'O problema era de temperamento e de política. Carlos V, nascido em Gante, compreendia a mentalidade flamenga. <span style="background:rgba(251,113,133,0.12);border-left:3px solid #fb7185;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,220,225,0.95);">Felipe II nunca visitou os Países Baixos depois de assumir o poder</span> — governava de Madrid uma região que não entendia e que não queria entender. Quando determinou a implantação da <span style="color:#fb7185;font-weight:700;">Inquisição espanhola</span> e a centralização do poder, a reação foi imediata e violenta.',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'Os Geuzen: O Insulto Transformado em Honra',
        paragrafos: [
          'Em 1566, um grupo de aristocratas flamengos apresentou uma petição pedindo o fim da Inquisição. Um conselheiro espanhol, vendo o grupo de nobres mal-vestidos, os chamou de <span style="color:#fb7185;font-weight:700;font-style:italic;">"mendigos"</span> (<em>geuzen</em>, em holandês). O insulto foi ouvido.',
          'Os nobres adotaram o nome com orgulho. Prenderam ao pescoço <span style="color:#fbbf24;font-weight:600;">bolsas de mendigos como medalhas de honra</span>, bradando: <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;font-style:italic;">"Somos mendigos de Deus e do rei!"</span>',
          'González observa o que acontece quando um povo oprimido se apodera do insulto dos opressores e o transforma em identidade: <span style="color:#34d399;font-weight:700;">nasce um movimento que não pode mais ser intimidado por palavras.</span> A revolta se intensificou. Igrejas foram saqueadas em uma onda de <span style="color:#c084fc;font-weight:600;">iconoclasmo</span>. Felipe II respondeu com o <span style="color:#fb7185;font-weight:700;">Duque de Alba</span>.',
        ],
        citacao: 'Quando um povo oprimido se apodera do insulto dos opressores e o transforma em identidade, nasce um movimento que não pode mais ser intimidado por palavras.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'O Duque de Alba e o Tribunal de Sangue',
        paragrafos: [
          'O Duque de Alba chegou com <span style="color:#fb7185;font-weight:700;">dez mil soldados</span> em 1567 e instalou o "Conselho de Tumultos" — imediatamente apelidado pelo povo de <span style="background:rgba(251,113,133,0.15);border:1px solid rgba(251,113,133,0.35);border-radius:5px;padding:1px 8px;color:#fecdd3;font-weight:800;font-style:italic;">Tribunal de Sangue</span>. Milhares foram executados — entre eles, os condes de <span style="color:#f97316;font-weight:600;">Egmont</span> e <span style="color:#f97316;font-weight:600;">Hoorn</span>, líderes católicos moderados que haviam simplesmente pedido clemência.',
          'O resultado foi o oposto do pretendido. <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">A repressão radical não eliminou a resistência — a radicalizou e a expandiu.</span> González formula o padrão que se repete na história: a Inquisição como geradora do contrário. A política que pretendia extirpar o protestantismo o vinculou definitivamente à <span style="color:#fbbf24;font-weight:700;">identidade nacional flamenga</span>.',
        ],
        citacao: 'A Inquisição que pretendia extirpar o protestantismo o vinculou definitivamente à identidade nacional flamenga.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'Guilherme de Orange e o Sítio de Leyde',
        paragrafos: [
          'A figura central da resistência foi <span style="color:#fbbf24;font-weight:700;">Guilherme de Orange</span>, chamado "O Taciturno" por seu cuidado extremo com as palavras. Originalmente católico, converteu-se ao calvinismo por entender que era a força capaz de manter unida a resistência sob perseguição.',
          'O episódio mais marcante foi o <span style="color:#60a5fa;font-weight:700;">Sítio de Leyde (1574)</span>. Os espanhóis sitiaram a cidade por meses. A fome chegou ao extremo. Quando enviados espanhóis propuseram a rendição, um habitante respondeu: <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:700;font-style:italic;">"Temos dois braços; se a fome chegar a tal ponto, comeremos um deles para continuar lutando com o outro."</span>',
          'Os holandeses abriram os <span style="color:#34d399;font-weight:700;">próprios diques</span> — inundando suas terras — para desorientar as tropas espanholas. Quando a cidade foi liberada, os habitantes pediam <span style="color:#fbbf24;font-style:italic;">pão e arenque, não glória.</span> Leyde tornou-se o símbolo da resistência alimentada pela fé calvinista: convicção de que Deus havia eleito aquele povo para resistir, e que o sofrimento tinha sentido dentro de uma <span style="color:#c084fc;font-weight:600;">providência maior</span>.',
        ],
        citacao: 'Os habitantes de Leyde pediam pão e arenque, não glória. A resistência genuína não busca reconhecimento — busca sobreviver para testemunhar.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'A República e a Tolerância Paradoxal',
        paragrafos: [
          'A <span style="color:#f97316;font-weight:700;">Guerra dos Oitenta Anos (1568–1648)</span> resultou finalmente na independência das províncias do norte como <span style="color:#34d399;font-weight:700;">República das Províncias Unidas</span> — a Holanda. Guilherme de Orange foi assassinado em 1584, mas o movimento sobreviveu ao seu líder.',
          'A República Holandesa tornou-se, paradoxalmente, o <span style="color:#fbbf24;font-weight:700;">primeiro estado europeu a praticar alguma tolerância religiosa</span>. Judeus perseguidos da Espanha e de Portugal, protestantes de toda espécie, até católicos moderados — todos encontraram refúgio em Amsterdã.',
          'González identifica o paradoxo com precisão: <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">a tolerância holandesa não nasceu de princípios filosóficos liberais, mas da necessidade prática de uma sociedade mercantil.</span> A virtude política nem sempre nasce da virtude moral — às vezes nasce do interesse iluminado. Isso não invalida o resultado, mas deve nos fazer perguntar: <span style="color:#fbbf24;font-style:italic;">em que se sustenta a liberdade religiosa que desfrutamos hoje?</span>',
        ],
        citacao: 'A virtude política nem sempre nasce da virtude moral — às vezes nasce do interesse iluminado.',
        citacaoAutor: 'Justo L. González',
      },
    ],
    perguntas: [
      'Os Geuzen transformaram o insulto "mendigos" em honra e identidade. Você já experimentou ser chamado de algo depreciativo por causa da fé ou de convicções? Como essa experiência moldou — ou poderia moldar — sua identidade?',
      'O calvinismo provou ser especialmente resiliente sob perseguição porque sua teologia da eleição e providência dava estrutura para o sofrimento. Que recursos teológicos você tem para dar sentido ao sofrimento? São suficientes para sustentar uma fé perseguida?',
      'A tolerância holandesa nasceu do interesse comercial, não da convicção moral. Você confia mais na tolerância baseada em princípios ou na tolerância baseada em interesse mútuo? Qual delas é mais durável?',
    ],
    oracao: 'Senhor, os habitantes de Leyde abriram os diques de suas próprias terras para resistir ao inimigo. Que aprendamos com esse gesto a disposição de sacrificar o que nos é mais precioso para defender o que é essencial.\n\nObrigado pelos que, sob perseguição extrema, não abandonaram a fé — mas a tornaram mais profunda. E que a história dos Países Baixos nos lembre: a repressão raramente extingue o que é genuíno; muitas vezes, só o fortalece.\n\nQue tenhamos fé suficiente para suportar o que vier, e sabedoria para distinguir quando o sofrimento tem propósito e quando simplesmente precisa ser aliviado.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. Capítulo 10: "A Reforma nos Países Baixos" (pp. 241–264).',
  },
  15: {
    dia: 15,
    data: '15 de outubro de 2026',
    titulo: 'O Protestantismo na França: Fé, Sangue e Pragmatismo',
    subtitulo: 'Capítulo 11',
    versiculo: 'Bendito seja o Senhor, que não nos entregou como presa a seus dentes. A nossa alma escapou como um pássaro do laço dos caçadores; o laço se quebrou, e nós escapamos.',
    versiculoRef: 'Salmo 124.6–7',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'O Mesmo Movimento, Um Desfecho Radicalmente Diferente',
        paragrafos: [
          'Ontem vimos a Reforma nos Países Baixos — onde fé e resistência nacional se fundiram e produziram, apesar de décadas de guerra, uma república próspera. Hoje González nos leva à França, onde a mesma combinação de <span style="color:#c084fc;font-weight:700;">calvinismo e política</span> terminou de forma radicalmente diferente: no <span style="color:#fb7185;font-weight:800;">maior massacre de protestantes da história europeia</span>.',
          'A história dos <span style="color:#fbbf24;font-weight:700;">huguenotes</span> é uma meditação sobre o que acontece quando uma minoria religiosa depende da proteção de patrocinadores políticos que podem, a qualquer momento, <span style="background:rgba(251,113,133,0.12);border-left:3px solid #fb7185;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,220,225,0.95);">mudar de lado.</span>',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'Os Huguenotes: Crescimento e Fragilidade Estrutural',
        paragrafos: [
          'O calvinismo chegou à França diretamente de <span style="color:#fbbf24;font-weight:700;">Genebra</span> — Calvino acompanhou os acontecimentos franceses com angústia, enviando pastores treinados e correspondência constante. O movimento cresceu rapidamente: nas décadas de 1550 e 1560, havia mais de <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;">1.200 congregações</span> huguenotes — cerca de <span style="color:#fbbf24;font-weight:700;">10% da população francesa</span>.',
          'A fragilidade, porém, era <span style="color:#fb7185;font-weight:700;">estrutural</span>: os huguenotes não controlavam o Estado. Dependiam da proteção de nobres simpáticos — especialmente a família <span style="color:#60a5fa;font-weight:600;">Bourbon</span> e o almirante <span style="color:#34d399;font-weight:700;">Gaspar de Coligny</span>, homem de integridade rara num século de oportunistas. Quando essa proteção fosse removida, o movimento estaria exposto.',
          'O rei <span style="color:#f97316;font-weight:600;">Francisco I</span> oscilou entre tolerância e perseguição conforme a conveniência diplomática — precisava dos protestantes alemães como aliados contra Carlos V, mas os temia dentro do próprio reino. <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">Essa ambiguidade criou décadas de incerteza mortal.</span>',
        ],
        citacao: 'A fé que depende de proteção política está sempre a um giro de política de distância do massacre.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'Catarina de Médici: A Religião como Peça no Tabuleiro',
        paragrafos: [
          'Com a morte precoce do rei Henrique II, o trono passou para filhos jovens e a rainha-mãe italiana, <span style="color:#c084fc;font-weight:700;">Catarina de Médici</span>, tornou-se regente de fato. González a retrata com precisão cirúrgica: Catarina <span style="color:#fb7185;font-weight:600;">não tinha convicções religiosas profundas</span>. Tinha um único objetivo — preservar o poder de seus filhos no trono francês.',
          'Para isso, ela usou huguenotes e católicos como <span style="background:rgba(192,132,252,0.15);border:1px solid rgba(192,132,252,0.35);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;font-style:italic;">peças de um tabuleiro</span>. Quando os huguenotes eram necessários para equilibrar o poder da família de Guisa, ela os protegia. Quando os católicos eram necessários para pressionar os huguenotes, ela os abandonava.',
          'A <span style="color:#fb7185;font-weight:700;">religião como instrumento de política</span> — não como objeto de convicção. Esse oportunismo calculado preparou o terreno para o maior erro de seu reinado.',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'A Noite de São Bartolomeu: 24 de Agosto de 1572',
        paragrafos: [
          'Para selar a paz entre as facções, Catarina organizou o casamento de <span style="color:#fbbf24;font-weight:700;">Henrique de Bourbon</span> — líder protestante — com <span style="color:#c084fc;font-weight:600;">Margarida de Valois</span>, filha católica da rainha. O casamento reuniu em Paris a <span style="color:#fbbf24;font-weight:600;">elite inteira do protestantismo francês</span>: pastores, nobres, militares, intelectuais. Parecia o início de uma era de coexistência.',
          'Dias antes, um atentado feriu o almirante <span style="color:#34d399;font-weight:700;">Coligny</span> sem matá-lo. Quando Coligny sobreviveu e começou a fazer perguntas, Catarina temeu que a investigação revelasse seu próprio envolvimento. A decisão foi escalada ao jovem rei Carlos IX: <span style="background:rgba(251,113,133,0.15);border:1px solid rgba(251,113,133,0.35);border-radius:5px;padding:1px 8px;color:#fecdd3;font-weight:800;">Coligny e os líderes huguenotes teriam que ser eliminados.</span>',
          'Na madrugada do dia <span style="color:#fb7185;font-weight:800;">24 de agosto</span>, os sinos da Igreja de São Germano tocaram — o sinal combinado. A guarda real invadiu as casas onde os huguenotes dormiam. Coligny foi assassinado e seu corpo jogado pela janela. O massacre se espalhou pela cidade e pelo interior da França.',
          'O saldo: <span style="background:rgba(251,113,133,0.15);border:1px solid rgba(251,113,133,0.35);border-radius:5px;padding:1px 8px;color:#fecdd3;font-weight:800;">aproximadamente 5.000 mortos em Paris; 20.000 em todo o país.</span> O papa mandou rezar um <em>Te Deum</em> em Roma. A rainha Isabel I da Inglaterra recebeu o embaixador francês vestida de luto.',
        ],
        citacao: 'O massacre de São Bartolomeu não foi um acidente — foi uma decisão. E decisões têm nomes.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: '"Paris Bem Vale uma Missa": Henrique IV e o Édito de Nantes',
        paragrafos: [
          'O próprio <span style="color:#fbbf24;font-weight:700;">Henrique de Bourbon</span>, noivo na fatídica semana, sobreviveu ao massacre ao se converter provisoriamente ao catolicismo. Após décadas de guerras religiosas que nenhum lado conseguia vencer, emergiu como o candidato mais viável ao trono da França.',
          'O problema: Paris e a maior parte da nobreza eram católicos. Henrique converteu-se ao catolicismo em 1593 — de forma que muitos consideraram cínica. A frase que lhe é atribuída resume o pragmatismo que seus críticos huguenotes nunca perdoaram: <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;font-style:italic;">"Paris bem vale uma missa."</span>',
          'Mas González pede uma avaliação mais nuançada. Em <span style="color:#34d399;font-weight:700;">1598</span>, Henrique promulgou o <span style="color:#34d399;font-weight:800;">Édito de Nantes</span> — o primeiro documento de tolerância religiosa da Europa moderna, concedendo aos huguenotes <span style="color:#34d399;font-weight:600;">liberdade de culto, acesso a cargos públicos e cidades de refúgio</span>. <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">A conversão pragmática de Henrique IV preservou uma geração inteira de protestantes franceses.</span> O édito durou 87 anos — revogado por Luís XIV em 1685.',
        ],
        citacao: 'Às vezes Deus usa pragmatistas para fazer o bem que os idealistas não conseguiram proteger.',
        citacaoAutor: 'Justo L. González',
      },
    ],
    perguntas: [
      'Os huguenotes dependiam da proteção de patrocinadores políticos — e quando essa proteção foi retirada, o massacre foi possível. Em que medida a fé da sua comunidade depende de condições políticas ou sociais favoráveis? O que sustentaria a comunidade se essas condições mudassem?',
      'Catarina de Médici usou a religião como instrumento de poder sem convicção pessoal. Como você identifica quando a religião está sendo instrumentalizada politicamente — seja por governantes, seja por líderes religiosos?',
      'A conversão de Henrique IV foi pragmática, mas produziu o Édito de Nantes. É possível separar a pureza dos motivos dos frutos concretos de uma decisão? Como julgar Henrique IV com justiça?',
    ],
    oracao: 'Senhor, diante do Massacre de São Bartolomeu, nossa oração é de lamento — pelo sangue derramado em Teu nome, pela traição planejada sob o pretexto de paz, pela cumplicidade de líderes religiosos que rezaram Te Deums enquanto os corpos ainda estavam quentes.\n\nQue esse episódio nunca se apague da memória da Igreja — não para alimentar ressentimento entre tradições, mas para nos lembrar do que somos capazes quando misturamos poder político com convicção religiosa sem freio de consciência.\n\nE que a história de Henrique IV nos ensine que às vezes Deus usa pragmatistas para fazer o bem que os idealistas não conseguiram proteger.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. Capítulo 11: "O Protestantismo na França" (pp. 265–288).',
  },
  16: {
    dia: 16,
    data: '16 de outubro de 2026',
    titulo: 'A Reforma Católica: Renovação, Disciplina e Mística',
    subtitulo: 'Capítulo 12',
    versiculo: 'Porque o Senhor disciplina aquele a quem ama, e castiga a todo filho que recebe.',
    versiculoRef: 'Hebreus 12.6',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'O Que Acontecia do Outro Lado',
        paragrafos: [
          'Ao longo destas duas semanas, acompanhamos a Reforma Protestante em seus múltiplos cenários: Alemanha, Suíça, Inglaterra, Países Baixos, França. Hoje González nos convida a fazer o que narrativas protestantes frequentemente omitem: <span style="color:#fbbf24;font-weight:700;">olhar para dentro da Igreja Católica</span> e perguntar o que acontecia lá.',
          'A resposta surpreende. A renovação dentro do catolicismo não foi apenas <span style="color:#fb7185;font-weight:600;">"Contra-Reforma"</span> — reação defensiva ao protestantismo. Foi um <span style="color:#34d399;font-weight:700;">movimento genuíno</span>, com raízes anteriores a Lutero, que produziu algumas das figuras espirituais mais extraordinárias do século XVI.',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'Antes de Lutero: As Raízes Espanholas',
        paragrafos: [
          'González retoma o fio do primeiro capítulo: a reforma iniciada por <span style="color:#fbbf24;font-weight:700;">Isabel, a Católica</span>, e o cardeal <span style="color:#fbbf24;font-weight:700;">Cisneros</span> na Espanha era <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;font-style:italic;">anterior às 95 Teses</span>. Cisneros havia reformado o clero espanhol, fundado a Universidade de Alcalá, financiado a <span style="color:#34d399;font-weight:600;">Bíblia Poliglota Complutense</span> e imposto padrões rigorosos de formação sacerdotal.',
          'O humanismo de <span style="color:#c084fc;font-weight:700;">Erasmo</span> — com seu apelo ao retorno às fontes, à reforma dos costumes clericais e à piedade interior genuína — circulava amplamente em círculos católicos. Havia um <span style="color:#fbbf24;font-weight:600;">apetite real por renovação</span> dentro da Igreja, antes que Lutero fornecesse uma alternativa externa.',
          'A pergunta que González implicitamente coloca: <span style="background:rgba(192,132,252,0.15);border:1px solid rgba(192,132,252,0.35);border-radius:5px;padding:2px 10px;color:#e9d5ff;font-weight:700;font-style:italic;">se Cisneros e Erasmo tivessem encontrado mais terreno fértil em Roma, a Reforma Protestante teria sido necessária?</span>',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'Inácio de Loyola: O Soldado Convertido',
        paragrafos: [
          'Em <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;">1521</span> — o mesmo ano da Dieta de Worms — um nobre vasco chamado <span style="color:#fbbf24;font-weight:700;">Inácio de Loyola</span> estava se recuperando de um ferimento de bala em Pamplona. Durante a longa convalescença, sem romances de cavalaria para ler, voltou-se para as únicas leituras disponíveis: vidas de santos e a vida de Cristo.',
          'Homem de temperamento <span style="color:#60a5fa;font-weight:600;">militar</span>, Loyola traduziu a espiritualidade em categorias de <span style="color:#60a5fa;font-weight:600;">disciplina, discernimento e missão</span>. Os <span style="color:#34d399;font-weight:700;font-style:italic;">Exercícios Espirituais</span> que desenvolveu — um método de quatro semanas de meditação, exame de consciência e disposição à vontade de Deus — tornaram-se um dos textos formativos mais influentes da história cristã.',
          'Em 1534, Loyola e um grupo de amigos — entre eles <span style="color:#f97316;font-weight:700;">Francisco Xavier</span> — fundaram a <span style="color:#fbbf24;font-weight:700;">Companhia de Jesus</span>. Em 1540, o papa Paulo III a aprovou oficialmente. Seu quarto voto especial era de <span style="background:rgba(96,165,250,0.12);border-left:3px solid #60a5fa;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,230,255,0.95);">obediência direta ao papa para missão: iriam onde quer que o papa os enviasse.</span>',
        ],
        citacao: 'Loyola não abandonou o soldado quando se converteu — aprendeu a combater com outras armas: disciplina, discernimento, missão.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'Os Jesuítas: Educação, Missão e Recuperação',
        paragrafos: [
          'A Companhia de Jesus tornou-se o instrumento mais eficaz da Reforma Católica em múltiplas frentes. González identifica três áreas de impacto:',
          '<span style="color:#fbbf24;font-weight:700;">Educação:</span> os jesuítas fundaram centenas de colégios e universidades. Sua pedagogia rigorosa — o <span style="color:#fbbf24;font-style:italic;">Ratio Studiorum</span> — formou gerações de católicos instruídos capazes de responder aos argumentos protestantes. Onde o protestantismo havia investido na <span style="color:#34d399;font-weight:600;">Bíblia em língua vernácula</span>, os jesuítas investiram em <span style="color:#fbbf24;font-weight:600;">escolas</span>.',
          '<span style="color:#60a5fa;font-weight:700;">Missão:</span> <span style="color:#f97316;font-weight:600;">Francisco Xavier</span> alcançou a Índia, o Japão e as portas da China. A Companhia de Jesus levou o catolicismo às Américas, à África e à Ásia com uma intensidade missionária sem paralelo. O mundo que a Reforma Protestante europeizou, os jesuítas catolicizaram.',
          '<span style="color:#c084fc;font-weight:700;">Recuperação de territórios:</span> na Europa Central — <span style="color:#c084fc;font-weight:600;">Polônia, Bavária, Áustria</span> — onde o protestantismo havia penetrado, os jesuítas trabalharam para reconquistar populações pela educação e pela pregação. Com considerável sucesso. A obediência inaciana era radical: o jesuíta ideal era disposto a obedecer "como cadáver nas mãos de quem o maneja" — <span style="background:rgba(251,113,133,0.12);border-left:3px solid #fb7185;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,220,225,0.95);">disciplina que podia gerar tanto santidade quanto abuso.</span>',
        ],
        citacao: 'Onde o protestantismo entregou a Bíblia ao povo, os jesuítas entregaram escolas. Ambas as apostas moldaram séculos.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'O Concílio de Trento: Reforma dos Costumes, Trincheira das Doutrinas',
        paragrafos: [
          'O <span style="color:#fbbf24;font-weight:700;">Concílio de Trento (1545–1563)</span> foi a resposta institucional mais importante da Igreja Católica à Reforma Protestante. González o caracteriza com uma imagem precisa: <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;font-style:italic;">reforma dos costumes com endurecimento das doutrinas.</span>',
          '<span style="color:#34d399;font-weight:700;">Por um lado</span>, Trento corrigiu abusos reais: a venda de indulgências foi regulamentada, a formação sacerdotal foi sistematizada com a criação obrigatória de <span style="color:#34d399;font-weight:600;">seminários</span> em cada diocese, o pluralismo de benefícios foi condenado.',
          '<span style="color:#fb7185;font-weight:700;">Por outro lado</span>, em cada ponto onde o protestantismo havia desafiado a doutrina, Trento endureceu a posição oposta. <span style="color:#fb7185;font-weight:600;">Sola Scriptura?</span> Trento definiu que a Escritura E a Tradição são igualmente fontes de autoridade. <span style="color:#fb7185;font-weight:600;">Justificação pela fé?</span> Trento afirmou que as obras cooperam na salvação. <span style="background:rgba(251,113,133,0.12);border-left:3px solid #fb7185;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,220,225,0.95);">Trento definiu o catolicismo moderno — e fechou a porta à reconciliação com o protestantismo por séculos.</span>',
        ],
        citacao: 'Trento foi a porta que se fechou. Definiu com precisão o que a Igreja Católica era — e o que ela não era disposta a negociar.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'Teresa de Ávila e João da Cruz: A Via Interior',
        paragrafos: [
          'Enquanto os jesuítas reformavam pela educação e Trento reformava pela doutrina, outro caminho de renovação florescia na Espanha: a <span style="color:#c084fc;font-weight:700;">mística</span>.',
          '<span style="color:#fbbf24;font-weight:700;">Teresa de Ávila</span> encontrou no convento uma vida religiosa mais próxima do clube social do que da disciplina espiritual. Depois de uma crise espiritual profunda, passou por uma conversão interior que a levou a reformar a ordem. Fundou os <span style="color:#fbbf24;font-weight:600;">Carmelitas Descalços</span> — retorno à pobreza, clausura rigorosa, oração contemplativa intensa.',
          '<span style="color:#60a5fa;font-weight:700;">João da Cruz</span>, seu colaborador mais próximo, foi o místico-poeta que descreveu em linguagem de extraordinária beleza a jornada da alma a Deus: a <span style="background:rgba(192,132,252,0.15);border:1px solid rgba(192,132,252,0.35);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:800;font-style:italic;">"Noite Escura da Alma"</span> — o esvaziamento de todo apoio sensível até a união pura com Deus.',
          'González identifica aqui um caminho que o protestantismo não desenvolveu da mesma forma: <span style="color:#c084fc;font-weight:600;">a renovação pela transformação interior, pelo silêncio e pela contemplação.</span> Teresa e João da Cruz responderam à crise espiritual do século XVI sem ruptura institucional — e deixaram uma herança que <span style="background:rgba(52,211,153,0.12);border-left:3px solid #34d399;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(200,255,235,0.95);">transcende fronteiras confessionais.</span>',
        ],
        citacao: 'Há formas de Deus que só se revelam quando os apoios humanos falham — e Teresa e João da Cruz aprenderam isso antes de ensinar.',
        citacaoAutor: 'Justo L. González',
      },
    ],
    perguntas: [
      'González insiste: a Reforma Católica foi genuína, não apenas reação. Isso desafia narrativas protestantes que tendem a ver o catolicismo do século XVI apenas como corrupção a ser superada. Como você pensa a renovação espiritual dentro de uma instituição que também cometia erros graves?',
      'Os jesuítas investiram em educação como forma de fortalecer a fé. Os protestantes investiram na Bíblia em língua vernácula. Quais são as apostas estratégicas que sua comunidade está fazendo para formar a geração seguinte?',
      'Teresa de Ávila e João da Cruz oferecem um caminho de renovação pela contemplação e pela "noite escura." Que espaço a contemplação ocupa na sua própria espiritualidade? O que você perderia se esse espaço fosse removido?',
    ],
    oracao: 'Senhor, obrigado por nos mostrar que o Teu Espírito não ficou preso em nenhuma tradição confessional — que Loyola e Teresa e João da Cruz foram Tuas testemunhas tão genuínas quanto Lutero e Calvino e Knox.\n\nQue a grandeza de uns não nos cegue para a grandeza dos outros. Que aprendamos a receber a herança ampla da Igreja sem apagar as diferenças reais — mas também sem transformar diferenças em muros que impedem reconhecermos uns nos outros os frutos do mesmo Espírito.\n\nE que a "noite escura" que Teresa e João descrevem não nos assuste, mas nos prepare: há formas de Deus que só se revelam quando os apoios humanos falham.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. Capítulo 12: "A Reforma Católica" (pp. 289–318).',
  },
  17: {
    dia: 17,
    data: '17 de outubro de 2026',
    titulo: 'O Protestantismo Espanhol: Fé em Surdina',
    subtitulo: 'Capítulo 13',
    versiculo: 'E não temais os que matam o corpo e não podem matar a alma; temei antes aquele que pode fazer perecer no inferno tanto a alma como o corpo.',
    versiculoRef: 'Mateus 10.28',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'O Capítulo que os Historiadores Passam em Silêncio',
        paragrafos: [
          'Ontem vimos a Reforma Católica: Loyola, Trento, Teresa de Ávila — renovação genuína dentro do catolicismo. Hoje González nos conduz a um capítulo que a maioria dos historiadores passa em silêncio: <span style="color:#fbbf24;font-weight:800;">existiu protestantismo espanhol?</span>',
          'A resposta é <span style="color:#34d399;font-weight:800;">sim</span> — e é um dos episódios mais dramáticos e menos conhecidos de todo o século XVI. Uma Reforma que floresceu na sombra, foi descoberta, e foi suprimida com uma eficiência brutal que impediu qualquer enraizamento duradouro.',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'O Solo Improvável: O Paradoxo Espanhol',
        paragrafos: [
          'À primeira vista, a Espanha era o último lugar onde se esperaria uma Reforma Protestante. Era o país de <span style="color:#c084fc;font-weight:700;">Cisneros</span> e da <span style="color:#fb7185;font-weight:700;">Inquisição</span>, de Carlos V e de Teresa de Ávila. Havia expulsado judeus em <span style="color:#fbbf24;font-weight:700;">1492</span> e muçulmanos em <span style="color:#fbbf24;font-weight:700;">1502</span>, e mantinha uma vigilância religiosa sem paralelo na Europa.',
          'No entanto, González identifica elementos que criaram brechas inesperadas. O <span style="color:#60a5fa;font-weight:700;">erasmismo</span> havia penetrado profundamente nas universidades espanholas durante o reinado de Carlos V. A corte imperial atraía humanistas de toda a Europa. Mercadores que comercializavam com Flandres e a Alemanha <span style="background:rgba(251,191,36,0.12);border-left:3px solid #fbbf24;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,245,210,0.95);">traziam junto livros proibidos.</span> Monges agostinianos — a mesma ordem de Lutero — liam os textos reformadores com interesse crescente.',
          'O paradoxo espanhol: <span style="background:rgba(52,211,153,0.12);border:1px solid rgba(52,211,153,0.30);border-radius:5px;padding:1px 8px;color:#a7f3d0;font-weight:700;">o país mais catolicizado da Europa produziu, em meados do século XVI, focos significativos de protestantismo</span> — justamente entre os mais instruídos e os mais piedosos.',
        ],
        citacao: 'A espiritualidade mais intensa da Espanha católica — monges genuinamente devotos — produziu os candidatos mais naturais à Reforma.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'Valladolid e Sevilha: Os Dois Focos',
        paragrafos: [
          'Os dois centros do protestantismo espanhol eram geograficamente distintos e socialmente diferentes.',
          'Em <span style="color:#fbbf24;font-weight:800;">Valladolid</span> — sede da corte real — o movimento penetrou entre nobres, funcionários imperiais e intelectuais próximos ao poder. O caso mais notório foi o de <span style="color:#60a5fa;font-weight:700;">Carlos de Seso</span>, gentil-homem italiano radicado na Espanha, que havia chegado à convicção da <span style="color:#34d399;font-weight:600;">justificação pela fé</span> depois de uma leitura atenta das cartas de Paulo. Ele converteu silenciosamente outras pessoas de seu círculo social.',
          'Em <span style="color:#c084fc;font-weight:800;">Sevilha</span> — a cidade mais cosmopolita da Espanha, porto do comércio com as Américas — o protestantismo penetrou por via diferente: <span style="color:#c084fc;font-weight:700;">monges</span>. No mosteiro de <span style="background:rgba(192,132,252,0.12);border:1px solid rgba(192,132,252,0.30);border-radius:5px;padding:1px 8px;color:#e9d5ff;font-weight:700;">San Isidoro del Campo</span>, um grupo de monges hieronimitas passou a estudar a Bíblia em grupos e a ler Lutero em edições contrabandeadas. Quando perceberam que a Inquisição estava fechando o cerco, a maioria fugiu para Genebra. <span style="background:rgba(251,113,133,0.12);border-left:3px solid #fb7185;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,220,225,0.95);">Aqueles que ficaram foram presos.</span>',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'A Inquisição em Ação: Os Autos de Fé de 1559',
        paragrafos: [
          'O reinado de <span style="color:#fb7185;font-weight:800;">Felipe II</span> marcou a ruptura decisiva. Ao contrário do pai Carlos V — que tinha interesses pan-europeus e às vezes tolerava ambiguidades — Felipe II era rigidamente espanhol e rigidamente católico. O protestantismo era para ele não apenas <span style="color:#fb7185;font-weight:700;">heresia</span>, mas <span style="color:#fb7185;font-weight:700;">traição nacional</span>.',
          'Os <span style="color:#fbbf24;font-weight:700;">autos de fé</span> de outubro de 1559, em Valladolid, foram espetáculos calculados de poder religioso: realizado na presença do próprio rei, o evento queimou vivos ou em efígie dezenas de protestantes espanhóis.',
          'Carlos de Seso, antes de morrer na fogueira, dirigiu ao rei uma frase que González cita com precisão perturbadora: <span style="background:rgba(251,113,133,0.15);border:1px solid rgba(251,113,133,0.35);border-radius:5px;padding:2px 10px;color:#fecdd3;font-weight:800;font-style:italic;">"Como pode Vossa Majestade permitir que me queimem?"</span> Felipe respondeu: <span style="color:#fb7185;font-weight:700;font-style:italic;">"Se meu próprio filho fosse herege, eu mesmo traria a lenha."</span>',
          'O endurecimento foi total. Qualquer resquício de <span style="color:#60a5fa;font-weight:600;">erasmismo</span> nas universidades foi eliminado. <span style="background:rgba(251,191,36,0.12);border-left:3px solid #fbbf24;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,245,210,0.95);">A fronteira intelectual da Espanha foi fechada.</span> O país que havia produzido os maiores humanistas da cristandade ibérica passou décadas em isolamento cultural crescente.',
        ],
        citacao: 'O endurecimento foi total. O preço da pureza religiosa foi pago com juros no desenvolvimento intelectual dos séculos seguintes.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'Casiodoro de Reina: A Bíblia Nascida no Exílio',
        paragrafos: [
          'Os monges de San Isidoro que escaparam para Genebra não ficaram calados. González conta a história de <span style="color:#34d399;font-weight:800;">Casiodoro de Reina</span> — um deles — que passou anos em exílio percorrendo a Europa (<span style="color:#60a5fa;font-weight:600;">Frankfurt, Londres, Antuérpia, Basileia</span>) perseguido pelos agentes inquisitoriais e pelos próprios calvinistas que duvidavam de sua ortodoxia.',
          'Em <span style="color:#fbbf24;font-weight:700;">1569</span>, Casiodoro de Reina publicou em Basileia a primeira tradução completa da Bíblia para o espanhol — a <span style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.35);border-radius:5px;padding:1px 8px;color:#fde68a;font-weight:800;font-style:italic;">"Bíblia do Urso,"</span> assim chamada pela marca tipográfica da editora. É ainda a base das traduções protestantes espanholas até hoje.',
          'González aponta o alcance histórico: <span style="background:rgba(52,211,153,0.12);border:1px solid rgba(52,211,153,0.30);border-radius:5px;padding:1px 8px;color:#a7f3d0;font-weight:700;">a Inquisição eliminou o protestantismo espanhol dentro da Espanha, mas produziu involuntariamente um presente duradouro para os protestantes de língua espanhola em todo o mundo</span> — uma Bíblia de qualidade literária excepcional, traduzida por um homem que a perseguição havia transformado em erudito.',
        ],
        citacao: 'A Palavra de Deus não fica acorrentada. Traduzida em fuga, impressa em exílio — ela sobreviveu às fogueiras.',
        citacaoAutor: 'Justo L. González',
      },
    ],
    perguntas: [
      'Os protestantes espanhóis eram, em sua maioria, pessoas de fé genuína e vida exemplar — não libertinos em busca de justificativa para o pecado. A Inquisição os queimou de qualquer forma. O que isso diz sobre os limites da pureza institucional como critério de verdade?',
      'Casiodoro de Reina foi perseguido tanto pela Inquisição quanto por calvinistas ortodoxos desconfiados. A perseguição veio de "ambos os lados." Como você se protege de transformar convicção em crueldade?',
      'O fechamento intelectual da Espanha no século XVI teve consequências duradouras. Em que medida comunidades religiosas hoje repetem esse padrão — fechando-se ao questionamento externo em nome da pureza interna? Qual é o custo a longo prazo?',
    ],
    oracao: 'Senhor, lembramos hoje daqueles que morreram na fogueira em Valladolid por terem lido as cartas de Paulo com atenção demais. Lembramos de Casiodoro de Reina, perseguido por décadas, traduzindo a Bíblia em exílio para um povo que não poderia lê-la em sua pátria.\n\nQue sua fé silenciada nos envergonhe quando exigimos que a fé seja fácil e bem-vista. Que sua disposição de pagar o preço máximo pela convicção nos faça humildes diante da nossa própria comodidade.\n\nE que a Bíblia que sobreviveu às fogueiras — traduzida em fuga, impressa em exílio — nos lembre de que a Palavra de Deus não fica acorrentada.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. Capítulo 13: "O Protestantismo Espanhol" (pp. 319–342).',
  },
  18: {
    dia: 18,
    data: '18 de outubro de 2026',
    titulo: 'O Significado da Reforma: Herança, Tensões e Perguntas Abertas',
    subtitulo: 'Capítulo 14 — Conclusão da Série',
    versiculo: 'Portanto, visto que estamos rodeados de tão grande nuvem de testemunhas, deixemos todo embaraço e o pecado que tão de perto nos rodeia, e corramos com perseverança a carreira que nos está proposta.',
    versiculoRef: 'Hebreus 12.1',
    secoes: [
      {
        tipo: 'contexto',
        titulo: 'O Capítulo das Perguntas Abertas',
        paragrafos: [
          'Ao longo destas três semanas, González nos conduziu pela Reforma como um guia que conhece o terreno sem perdê-la de vista. Hoje chegamos ao capítulo final — não o capítulo da resposta definitiva, mas o <span style="color:#a78bfa;font-weight:800;">capítulo das perguntas que a Reforma ainda faz a nós</span>.',
          'O século XVI transformou a cristandade ocidental de forma irreversível. Não apenas a teologia: transformou a <span style="color:#fbbf24;font-weight:700;">política</span>, a <span style="color:#60a5fa;font-weight:700;">linguagem</span>, a <span style="color:#34d399;font-weight:700;">educação</span>, a relação dos indivíduos com a autoridade e com o texto sagrado. Para entender o Ocidente moderno, é preciso entender a Reforma. Para entender a Igreja de hoje, é preciso entender o que foi <span style="color:#34d399;font-weight:700;">ganho</span> — e o que foi <span style="color:#fb7185;font-weight:700;">perdido</span> — naquele século de rupturas.',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'O Que a Reforma Ganhou',
        paragrafos: [
          'González é generoso na avaliação das conquistas. Há realizações que precisam ser nomeadas sem desconforto:',
          '<strong style="color:#fbbf24;">A Escritura em mãos do povo.</strong> Antes de Lutero, a Bíblia era um texto clerical — lida em latim por pessoas treinadas, mediada pela autoridade eclesiástica antes de chegar ao leigo. A Reforma colocou nas mãos de camponeses alemães, artesãos ingleses e mercadores suíços o texto sagrado em sua própria língua. Isso transformou a relação entre o cristão e Deus — <span style="background:rgba(251,191,36,0.12);border-left:3px solid #fbbf24;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,245,210,0.95);">de uma relação mediada por especialistas para uma relação direta com o testemunho apostólico.</span>',
          '<strong style="color:#34d399;">A justificação pela fé.</strong> A recuperação da doutrina paulina — que a aceitação diante de Deus é <span style="color:#34d399;font-weight:600;">graça recebida, não mérito acumulado</span> — libertou gerações de uma espiritualidade de ansiedade e contabilidade religiosa. A Reforma ofereceu <span style="background:rgba(52,211,153,0.12);border:1px solid rgba(52,211,153,0.30);border-radius:5px;padding:1px 8px;color:#a7f3d0;font-weight:700;">repouso.</span>',
          '<strong style="color:#60a5fa;">A vocação secular como sagrada.</strong> Lutero demoliu a hierarquia que colocava monges e padres acima de agricultores e sapateiros no mapa espiritual. A doutrina do <span style="color:#60a5fa;font-weight:700;">sacerdócio universal dos crentes</span> afirmou que o trabalho ordinário — se feito para a glória de Deus — tem a mesma dignidade que o serviço no altar. <span style="color:#fff;font-style:italic;">Uma revolução cultural de consequências imensas.</span>',
        ],
        citacao: 'A Reforma não precisou inventar a graça — ela a redescobriu. E redescobrir a graça sempre produz um novo começo.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'O Que a Reforma Perdeu',
        paragrafos: [
          'González é igualmente honesto sobre os custos. A Reforma não foi apenas libertação — foi também fragmentação.',
          '<strong style="color:#fb7185;">A unidade visível da Igreja.</strong> A cristandade medieval era disfuncional em muitos aspectos, mas partilhava uma estrutura comum que permitia a um monge italiano e a um bispo polonês reconhecerem-se como membros da mesma família. A Reforma quebrou esse quadro. Não apenas entre protestantes e católicos, mas entre os próprios protestantes: <span style="color:#fb7185;font-weight:600;">luteranos e zwinglianos discordaram sobre a Ceia</span>; luteranos e calvinistas sobre a predestinação; calvinistas e anabatistas sobre o batismo. <span style="background:rgba(251,113,133,0.12);border-left:3px solid #fb7185;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,220,225,0.95);">O princípio do exame pessoal das Escrituras, uma vez liberado, não parou na geração de Lutero.</span>',
          '<strong style="color:#a78bfa;">A riqueza da tradição contemplativa.</strong> As reformas que fecharam mosteiros eliminaram séculos de cultura acumulada: bibliotecas, tradições de oração, arquitetura, arte, redes de cuidado com os pobres. González observa que <span style="background:rgba(167,139,250,0.12);border:1px solid rgba(167,139,250,0.30);border-radius:5px;padding:1px 8px;color:#ede9fe;font-weight:700;">o protestantismo ganhou a pregação e perdeu o silêncio.</span> Ganhou a palavra proclamada e perdeu — em grande medida — a palavra meditada.',
          '<strong style="color:#fbbf24;">A catolicidade geográfica.</strong> A Reforma foi, em sua maioria, um fenômeno europeu do norte. O catolicismo levou o evangelho às Américas, à África e à Ásia via jesuítas e franciscanos antes que o protestantismo tivesse estrutura missionária equivalente.',
        ],
        citacao: 'O protestantismo ganhou a pregação e perdeu o silêncio. Ganhou a palavra proclamada e perdeu, em grande medida, a palavra meditada.',
        citacaoAutor: 'Justo L. González',
      },
      {
        tipo: 'analise',
        titulo: 'A Reforma e a Modernidade: Uma Relação Ambígua',
        paragrafos: [
          'Um debate historiográfico que González não evita: <span style="color:#fbbf24;font-weight:800;">a Reforma produziu a modernidade?</span>',
          'A resposta simples — "sim, Lutero abriu caminho para a liberdade individual e o iluminismo" — é sedutora mas imprecisa. Lutero nunca pretendeu fundar o individualismo moderno. Calvino nunca pretendeu fundar o capitalismo. <span style="background:rgba(251,191,36,0.12);border-left:3px solid #fbbf24;padding:2px 8px;border-radius:3px;font-weight:600;color:rgba(255,245,210,0.95);">Os reformadores eram homens do século XVI, não precursores do século XVIII.</span>',
          'O que González sustenta com mais precisão: a Reforma criou condições que tornaram possíveis desenvolvimentos que seus próprios fundadores não autorizariam — e provavelmente condenariam. O princípio de que cada crente pode examinar as Escrituras por si mesmo, uma vez generalizado, tornou-se o princípio de que <span style="color:#a78bfa;font-weight:600;font-style:italic;">cada indivíduo pode examinar qualquer autoridade por si mesmo.</span> Lutero não queria isso. Mas abriu a porta. <span style="color:#fff;">Isso não é acusação — é observação histórica sobre como as ideias excedem as intenções de seus autores.</span>',
        ],
      },
      {
        tipo: 'analise',
        titulo: 'As Perguntas que a Reforma Ainda Faz',
        paragrafos: [
          'González encerra sua narrativa não com uma conclusão triunfal, mas com perguntas que permanecem abertas cinco séculos depois:',
          '<strong style="color:#60a5fa;">Onde está a autoridade?</strong> A Reforma deslocou a autoridade do papa e dos concílios para a Escritura — mas <span style="color:#60a5fa;font-style:italic;">quem interpreta a Escritura?</span> Cada denominação, cada pastor, cada leitor? A proliferação de grupos protestantes ao longo dos séculos sugere que a pergunta sobre autoridade não foi resolvida pela Reforma, <span style="background:rgba(96,165,250,0.12);border:1px solid rgba(96,165,250,0.30);border-radius:5px;padding:1px 8px;color:#bfdbfe;font-weight:700;">apenas reformulada.</span>',
          '<strong style="color:#34d399;">Como convivem unidade e verdade?</strong> O diálogo católico-luterano produziu documentos notáveis, incluindo a <span style="color:#34d399;font-weight:700;">Declaração Conjunta sobre a Justificação (1999)</span>. Mas a unidade visível da Igreja permanece uma promessa não cumprida. Como buscar verdade sem sacrificar unidade? Como buscar unidade sem sacrificar verdade?',
          '<strong style="color:#c084fc;">O que é Reforma contínua?</strong> A fórmula protestante <span style="background:rgba(192,132,252,0.15);border:1px solid rgba(192,132,252,0.35);border-radius:5px;padding:2px 10px;color:#e9d5ff;font-weight:800;font-style:italic;">ecclesia semper reformanda</span> — a Igreja sempre precisa ser reformada — é uma confissão de humildade institucional. Mas como distinguir reforma genuína de mera adaptação à cultura? <span style="color:#c084fc;font-weight:600;">Como saber quando se está reformando o acessório e quando se está abandonando o essencial?</span>',
        ],
        citacao: 'Ecclesia semper reformanda. A Igreja sempre precisa ser reformada. Começa em nós.',
        citacaoAutor: 'Justo L. González',
      },
    ],
    perguntas: [
      'González aponta tanto conquistas quanto perdas da Reforma. Qual das perdas que ele identifica você sente mais pesadamente na sua própria tradição cristã? O que seria necessário para recuperar algo do que foi perdido sem abandonar o que foi ganho?',
      'A Reforma produziu consequências que seus fundadores não autorizariam. Isso deve tornar Lutero e Calvino responsáveis pelo individualismo religioso moderno? Como avaliamos uma figura histórica pelas consequências involuntárias de suas ideias?',
      'Ecclesia semper reformanda — a Igreja sempre em reforma. Que área da vida da sua comunidade mais precisa de reforma agora? O que está impedindo essa reforma? Quem seria hoje o "Lutero" que precisaria de coragem para nomeá-la?',
    ],
    oracao: 'Senhor, chegamos ao fim desta jornada pela Era dos Reformadores com mais perguntas do que respostas — e isso, percebemos, é o destino de quem estuda história com honestidade.\n\nObrigado por Lutero, Calvino, Zuínglio, Knox, Cranmer, Loyola, Teresa, João da Cruz, Casiodoro de Reina — figuras imperfeitas, todas elas, usadas para fazer avançar uma história maior do que qualquer uma delas compreendia.\n\nQue a nuvem de testemunhas que circunda a Igreja — dos reformadores do século XVI aos mártires de Valladolid — não nos deixe complacentes com o que somos, nem desesperados com o que ainda falta.\n\nEcclesia semper reformanda. A Igreja sempre precisa ser reformada. Começa em nós.\n\nAmém.',
    leituraComplementar: 'González, Justo L. A Era dos Reformadores. São Paulo: Vida Nova, 1995. Capítulo 14: "O Significado da Reforma" (pp. 343–368).',
  },
};

export default DIAS_CONTENT;
