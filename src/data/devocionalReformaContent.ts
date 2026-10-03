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
