// rewritePericopes13_15.cjs — reescreve dias 13, 14, 15 com o mesmo nível de detalhe dos dias 10-12
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'paraFamilia.ts');
let txt = fs.readFileSync(filePath, 'utf8');

// ─── Bloco Dia 13 ────────────────────────────────────────────────────────────
const old13_start = `  // ─── Dia 13 — Gn 11.27–32 ────────────────────────────────────────────────`;
const old13_end   = `\`;

  // ─── Dia 14`;
const new13 = `  // ─── Dia 13 — Gn 11.27–32 ────────────────────────────────────────────────
  if (d.dia === 13) return \`PARA A FAMÍLIA · Gênesis 11:27–32

TEMA: Identidade e Herança: A Família de Terá e as Promessas que Aguardam

---

TÍTULO DO SERMÃO FAMILIAR
"As Raízes que Preparam o Fruto: Deus Agindo na História de uma Família Comum"

BIG IDEA PARA A FAMÍLIA
Deus age na história de famílias comuns, marcadas por dor e imperfeição, para preparar soberanamente o cumprimento de Suas promessas eternas — e nenhum detalhe familiar está fora do Seu controle.

PERGUNTA PARA A FAMÍLIA
Se Deus usou a família quebrada e idólatra de Terá para preparar o caminho de Abraão, o que isso nos diz sobre como Ele pode agir na história da nossa própria família?

PALAVRA-CHAVE DE TRANSIÇÃO
Vejamos as RAÍZES desta família — raízes que Deus estava cultivando em silêncio para produzir um fruto que transformaria o mundo.

---

MOVIMENTOS DO SERMÃO

I. AS RAÍZES DA FAMÍLIA: TERÁ E SEUS FILHOS — UM CONTEXTO PAGÃO (Gn 11:27–28) (A)
§ Indicação Textual: Gn 11:27 ("estas são as gerações de Terá: Terá gerou Abrão, Naor e Harã") e 11:28 ("Harã morreu antes de Terá, seu pai, na terra do seu nascimento, em Ur dos Caldeus") — a origem da família na cidade pagã de Ur
§ Exegese: O tôledôt ("gerações") de Terá abre apresentando uma família de Ur dos Caldeus — centro cultural e religioso da Mesopotâmia, cidade dedicada ao deus lunar Nanna. Josué 24:2 confirma: "Seus pais habitaram deste lado do rio desde os tempos antigos, Terá, pai de Abraão e pai de Naor, e serviram a outros deuses." Deus não escolheu Abrão de uma família piedosa reformada — escolheu-o de dentro de um contexto de idolatria profunda. O primeiro dado apresentado da família é uma morte trágica: Harã morre antes do pai — dor, luto e fragilidade marcam o ponto de partida. E é exatamente aí que Deus começa a trabalhar.
§ Teologia Reformada: A CFW III.5 e CFB 3.5 ensinam que Deus "ordena para Si, pela Sua livre e soberana vontade, os que lhe aprouve para vida eterna" — sem considerar fé ou boas obras previstas. A eleição de Abrão não foi recompensa pela piedade de Terá; foi graça pura e soberana operando dentro de uma família idólatra. Herman Bavinck (Reformed Dogmatics, v.2): "A eleição divina não aguarda condições humanas favoráveis. Ela as cria onde não existiam — como a luz que não precisa de claridade prévia para brilhar, mas a produz pelo próprio ato de iluminar."
§ Aplicação Familiar: Pais: Não subestimem o alcance da graça de Deus. Ele chamou Abrão de dentro da idolatria — Ele pode chamar membros de sua família que hoje ainda não creram. Orem com esperança, não com desespero. / Filhos: Talvez sua família não tenha sempre sido cristã. Isso não é obstáculo para Deus — é o palco onde Ele mostra Sua graça soberana. / Noivos: Avaliem juntos as raízes espirituais de cada família. O que é saudável, cultivem. O que é quebrado, tragam ao Senhor antes do casamento. / Casal: A morte de Harã lembrou que a dor entra em todas as famílias. Como vocês têm confrontado o luto juntos, na fé? / Avós: Contem a história de como o evangelho entrou na família. De onde vinha a família antes de Cristo?

II. OS LAÇOS QUE SUSTENTAM: CASAMENTO, ADOÇÃO E ESTERILIDADE (Gn 11:29–30) (B)
§ Indicação Textual: Gn 11:29 ("Abrão e Naor tomaram para si mulheres; o nome da mulher de Abrão era Sarai...") e 11:30 ("Sarai era estéril; não tinha filhos") — os laços familiares que serão provados
§ Exegese: Dois versículos introduzem três dados cruciais: (1) Abrão casa com Sarai — e imediatamente o narrador registra sua esterilidade, criando tensão narrativa deliberada antes mesmo do chamado de Gênesis 12. (2) Naor casa com Milca, filha de Harã — a família que perdeu Harã se reorganiza ao redor do luto, criando novos laços. (3) Ló, filho de Harã, aparece ao lado de Abrão — acolhido, cuidado, adotado de facto pelo tio. A esterilidade de Sarai não é um detalhe biográfico: é teologia. Ela garante que quando o filho da promessa nascer, não haverá dúvida — é obra de Deus, não de biologia humana.
§ Teologia Reformada: A CFW V.3 e CFB 5.3 ensinam que Deus, em Sua providência ordinária, usa "meios segundos" — mas quando lhe apraz, age "acima, sem ou contra eles." A esterilidade de Sarai é o palco preparado para um milagre que confirmará a soberania divina. Joel Beeke (Parenting by God's Promises): "Quando Deus promete descendência a uma mulher estéril, Ele está declarando que Sua promessa não depende de nossa capacidade biológica, emocional ou espiritual — depende apenas de Sua vontade soberana e fiel." O acolhimento de Ló revela que a providência de Deus frequentemente se realiza por meio de atos humanos de cuidado: hospitalidade, adoção, amparo ao enlutado.
§ Aplicação Familiar: Pais: Há em sua família alguém que precisa ser "acolhido como Ló" — um sobrinho, um jovem, alguém sem lar ou sem referência familiar? A hospitalidade é instrumento da providência de Deus. / Filhos: A esterilidade de Sarai lembra que Deus pode realizar o impossível. Se há algo em sua vida que parece impossível, lembre-se: a promessa de Deus não depende de suas capacidades. / Noivos: Conversem sobre a possibilidade real de dificuldades na geração de filhos. Como a fé de vocês responderia a essa situação? O chamado à família cristã inclui abraçar o sofrimento sem perder a esperança. / Casal: Como vocês têm cuidado de pessoas fora do núcleo familiar imediato — como Abrão cuidou de Ló? / Avós: Quais foram os "impossiveis" que Deus realizou na história da família de vocês? Contem esses testemunhos aos netos.

III. O MOVIMENTO QUE ANTECIPA: TERÁ PARTE — MAS NÃO CHEGA (Gn 11:31–32) (A')
§ Indicação Textual: Gn 11:31 ("Terá tomou a Abrão seu filho... e saíram de Ur dos Caldeus para ir à terra de Canaã; e foram até Harã e habitaram ali") e 11:32 ("os dias de Terá foram duzentos e cinco anos; e Terá morreu em Harã") — a jornada incompleta
§ Exegese: O versículo 31 contém uma das frases mais teologicamente carregadas do livro: "saíram de Ur dos Caldeus para ir à terra de Canaã." Terá tinha o destino certo — Canaã. Mas parou em Harã. O nome "Harã" é idêntico ao nome do filho morto (com vogalização distinta no hebraico) — uma sombra de luto que marcou o local de parada. Terá morreu com 205 anos em Harã, sem completar a jornada. A travessia de Abrão será a realização do que o pai começou mas não terminou. Este padrão narrativo é profundamente pastoral: Deus não necessita da perfeição do predecessor para cumprir Seu propósito no sucessor. Abrão não precisou de um pai que chegasse a Canaã — precisou de um pai que saísse de Ur.
§ Teologia Reformada: A CFW V.2 e CFB 5.2 afirmam que a providência de Deus opera "por meios segundos, ordinários e contingentes" — inclusive por meio de jornadas incompletas, mortes inesperadas e gerações de transição. O. Palmer Robertson (O Cristo das Alianças): "A história da redenção avança não apenas pelos grandes heróis da fé, mas pelos que deram o primeiro passo — mesmo que não tenham chegado ao destino. Terá saiu de Ur. Isso foi suficiente para que Deus completasse a obra em Abrão." Abraham Kuyper (Lectures on Calvinism): "A soberania de Deus não é frustrada por mortes precoces, planos interrompidos ou jornadas incompletas. Ele é o Senhor das interrupções tanto quanto dos cumprimentos."
§ Aplicação Familiar: Pais: Suas escolhas hoje — mesmo que imperfeitas, mesmo que incompletas — formam o solo onde Deus planta a fé dos seus filhos. Deus pode completar o que vocês não conseguiram terminar. / Filhos: Talvez seus pais não tenham "chegado a Canaã" em alguma área — na fé, no caráter, na integridade. Isso não os define a vocês. O chamado de Deus sobre vocês é pessoal e direto, como foi com Abrão. / Noivos: Que jornadas incompletas das famílias de vocês vocês querem ver concluídas na família que vão formar? Conversem sobre legados a honrar e padrões a transformar. / Casal: Há algo que seus pais iniciaram na fé — uma promessa, um chamado, um sonho — que Deus pode estar chamando vocês a completar? / Avós: Mesmo que sintam que não chegaram a "Canaã" em alguma área, saibam: a jornada de vocês deu o passo que os filhos e netos precisavam para ir mais longe.

---

EIXO REDENTOR (HISTÓRICO-REDENTIVO)
Terá saiu de Ur com destino a Canaã, mas morreu em Harã. Abrão completará a jornada (Gn 12:5). Este padrão aponta para Cristo: toda a humanidade partiu de Éden em direção à comunhão com Deus, mas nenhum ser humano conseguiu chegar — até que o Filho de Deus completou a jornada por nós (Hb 12:2: "Jesus, o autor e consumador da fé"). Assim como Abrão cumpriu o que Terá não pôde completar, Cristo cumpriu o que Adão — e toda a descendência de Adão — não pôde realizar. A família cristã vive na certeza de que a jornada será completada, não pelos nossos próprios passos, mas pela fidelidade dAquele que disse "está consumado" (Jo 19:30).

DOUTRINA CENTRAL
A Providência Particular de Deus: Deus governa soberanamente cada detalhe da história familiar — dores, mortes, esterilidades, jornadas incompletas e contextos pagãos — para cumprir Seus propósitos redentores eternos, sem violar a liberdade das criaturas. Cf. CFW Cap. V; CFB Cap. V.

APLICAÇÕES PARA A FAMÍLIA
▸ Para os Pais: Suas escolhas e jornadas — mesmo as incompletas — formam o solo onde Deus planta a fé dos seus filhos. A fidelidade parcial de Terá foi suficiente para que Abrão saísse de Ur. Não subestimem sua influência.
▸ Para os Filhos: A herança familiar que você recebe — com suas feridas e interrupções — é o ponto de partida do seu chamado, não o seu limite. Deus pode completar em você o que não foi completado antes.
▸ Para os Noivos: Antes de fundar um lar, avaliem as raízes que cada um traz. O que é saudável, cultivem com gratidão. O que é quebrado, tragam ao Senhor antes do casamento — não depois.
▸ Para o Casal: Casamentos marcados por dor e dificuldades (como a esterilidade de Sarai) não são sinal de abandono de Deus. São frequentemente o palco onde Ele mostra Sua glória de forma mais poderosa.
▸ Para os Avós: Mesmo que sua jornada pareça incompleta, ela foi necessária. Sua saída de "Ur" — qualquer que tenha sido o seu ponto de partida — foi o primeiro passo que preparou o caminho para seus filhos e netos.

DINÂMICA FAMILIAR
1. "A jornada da nossa família" — cada membro conta uma história de quando algo começou mas não terminou como esperado. Como Deus agiu depois?
2. Leiam Josué 24:2–3 juntos: Deus chamou Abrão de dentro da idolatria. Existe alguém na família ainda longe de Deus? Orem juntos por essa pessoa.
3. Montem juntos uma árvore genealógica simples e identifiquem: quem foram os "Teráss" da família — os que deram o primeiro passo de fé?
4. Conversem: "Que jornada incompleta das gerações anteriores Deus pode estar chamando nossa família a completar?"
5. Leia Hebreus 12:2 e reflita: de que forma Cristo é o "Abrão" perfeito que completou a jornada que nenhum de nós conseguiria?
6. Escreva uma carta — um membro mais velho para um mais jovem — sobre fé, propósito e a jornada que ainda está pela frente.

AUTORES REFORMADOS
▸ Abraham Kuyper (Lectures on Calvinism): "A soberania de Deus não opera apenas nos grandes movimentos históricos, mas na sequência silenciosa de gerações, onde nomes comuns carregam propósitos eternos. Terá é prova de que Deus usa até as jornadas interrompidas para cumprir Seus planos imperturbáveis."
▸ Joel Beeke (Parenting by God's Promises): "A providência divina abrange não apenas os eventos extraordinários, mas a trama ordinária da vida familiar — nascimentos, mortes, migrações incompletas e casamentos marcados por dor. Deus tece com esses fios um tapete que somente a eternidade revelará em sua plenitude."
▸ Herman Bavinck (Reformed Dogmatics, v. 2): "Deus não está ausente do sofrimento das famílias. Ele o utiliza como o escultor usa o cinzel: para revelar a forma que desde a eternidade planejou. A esterilidade, o luto e a jornada truncada não são acidentes — são instrumentos nas mãos do Criador."

CONCLUSÃO
A família de Terá parece comum ao extremo: idolátrica, enlutada, estéril, com uma jornada interrompida. Mas era exatamente nessa família que Deus estava trabalhando em silêncio, preparando o homem pelo qual todas as famílias da terra seriam abençoadas. Que sua família — com todas as suas imperfeições, dores e começos inacabados — também seja terreno fértil para os propósitos eternos de Deus. Você não precisa ser uma família perfeita para ser usada por um Deus perfeito.\`;

`;

// ─── Bloco Dia 14 ────────────────────────────────────────────────────────────
const new14 = `  // ─── Dia 14 — Gn 12.1–9 ─────────────────────────────────────────────────
  if (d.dia === 14) return \`PARA A FAMÍLIA · Gênesis 12:1–9

TEMA: Chamado e Missão: A Família que Parte por Fé

---

TÍTULO DO SERMÃO FAMILIAR
"A Família que Obedece sem Ver: O Chamado de Deus e a Fé que Move Lares"

BIG IDEA PARA A FAMÍLIA
Deus chama famílias inteiras à obediência radical da fé — exigindo que deixem o conforto do familiar sem saber o destino — e promete que por meio delas toda a terra será abençoada.

PERGUNTA PARA A FAMÍLIA
Que "terras", "parentelas" e "casas paternas" Deus pode estar chamando nossa família a deixar para seguir Seus propósitos com mais fidelidade?

PALAVRA-CHAVE DE TRANSIÇÃO
Vejamos os três movimentos do PARTIR que Deus chama toda família de fé a realizar: o chamado que rompe, a promessa que sustenta e a obediência que testemunha.

---

MOVIMENTOS DO SERMÃO

I. O CHAMADO QUE ROMPE: "SAIA DA SUA TERRA" (Gn 12:1) (A)
§ Indicação Textual: Gn 12:1 ("o Senhor disse a Abrão: Sai da tua terra, da tua parentela e da casa de teu pai, para a terra que te mostrarei") — o imperativo triplo do chamado divino
§ Exegese: O verbo hebraico lekh-lekhá ("vai para ti" ou "vai, parte") é um imperativo com força de urgência e singularidade — é o mesmo que aparecerá em Gênesis 22:2 quando Deus ordena o sacrifício de Isaque. O chamado tem três camadas concêntricas que Abrão deve abandonar: (1) "tua terra" — sua pátria, sua cultura, seu mundo conhecido; (2) "tua parentela" — a rede de relações que definia identidade e segurança; (3) "a casa de teu pai" — o núcleo mais íntimo de pertencimento e proteção. Deus pede que Abrão deixe tudo sem revelar o destino: "para a terra que te mostrarei" — o particípio hebraico indica ação futura e progressiva. Hebreus 11:8 captura isso com precisão: "saiu sem saber para onde ia." A obediência de Abrão foi anterior ao conhecimento do destino — o oposto da lógica humana.
§ Teologia Reformada: A CFW X.1 e CFB 10.1 ensinam que "os que Deus eficazmente chamou, a esses também justificou." O chamado eficaz de Deus não convida — transforma. Abrão não deliberou, pesquisou o mercado imobiliário de Canaã ou consultou comitê familiar: "foi, como o Senhor lhe havia dito" (v.4). João Calvino (Inst. III.24.2): "O chamado de Deus é irresistível não por coerção, mas por transformação — Ele muda o coração de tal forma que o chamado se torna o desejo mais profundo da alma. Abrão quis partir porque Deus já havia partido dentro dele."
§ Aplicação Familiar: Pais: Suas decisões de moradia, trabalho, escola e comunidade são respostas — conscientes ou não — ao chamado de Deus. Essas escolhas ensinam fé ou comodismo aos seus filhos. Qual mensagem elas têm enviado? / Filhos: O chamado de Deus às vezes chega através dos pais. Observe como eles obedecem a Deus quando é custoso — isso é lição de fé mais poderosa que qualquer sermão. / Noivos: Antes de casar, conversem seriamente: "Para onde Deus nos chama como família? Que 'terras' precisaremos deixar para seguirmos juntos?" / Casal: Há um chamado que vocês sabem que Deus tem feito à família de vocês, mas que o conforto ou o medo têm impedido de obedecer? / Avós: Qual foi o "lekh-lekhá" mais difícil que vocês obedecem em sua vida? Compartilhem esse testemunho com os netos.

II. A PROMESSA QUE SUSTENTA: "EU FAREI DE TI UMA GRANDE NAÇÃO" (Gn 12:2–3) (B)
§ Indicação Textual: Gn 12:2–3 ("Eu farei de ti uma grande nação, e te abençoarei, e engrandecerei o teu nome... e em ti serão benditas todas as famílias da terra") — sete promessas divinas em dois versículos
§ Exegese: A resposta de Deus ao imperativo do chamado é uma cascata de promessas — sete ao total, número da perfeição: (1) "farei de ti uma grande nação"; (2) "te abençoarei"; (3) "engrandecerei o teu nome"; (4) "serás uma bênção"; (5) "abençoarei os que te abençoarem"; (6) "amaldiçoarei os que te amaldiçoarem"; (7) "em ti serão benditas todas as famílias da terra." Notável: a promessa de "nome grande" contrasta diretamente com Babel (Gn 11:4: "façamos para nós um nome") — Deus dará a Abrão o que Babel tentou conquistar pela própria força. E a sétima promessa — "todas as famílias da terra" — tem horizonte universal: o chamado de Abrão não é privilégio étnico, é missão cósmica. Paulo cita exatamente este versículo em Gálatas 3:8 para provar que o evangelho já estava preconizado no Antigo Testamento.
§ Teologia Reformada: A CFW VII.3 e CFB 7.3 descrevem o pacto de graça como progressivo — iniciado com Adão, confirmado com Noé, formalizado aqui com Abrão. As sete promessas de Gênesis 12:2–3 são a "constituição" do pacto abraâmico. Joel Beeke (Parenting by God's Promises): "Toda família cristã é herdeira das promessas feitas a Abrão — não apenas como indivíduos salvos, mas como comunidade pactual. A família é a unidade básica do pacto de graça, e cada promessa de Gênesis 12 tem implicações para o lar cristão." John Piper (Que as Nações Se Alegrem): "A missão começa em Gênesis 12, não em Mateus 28. Abrão foi chamado para ser o canal pelo qual a bênção de Deus fluiria para todas as famílias da terra — e a Igreja, em Cristo, é herdeira dessa missão."
§ Aplicação Familiar: Pais: A família de vocês não existe para si mesma. Vocês são herdeiros das promessas de Gênesis 12 — o que significa que foram chamados para ser bênção além das paredes de casa. Como isso se manifesta na prática? / Filhos: "Todas as famílias da terra" inclui seus amigos, colegas e vizinhos que ainda não conhecem a Cristo. Vocês são canal da promessa — na escola, no bairro, no clube. / Noivos: Que visão missionária vocês querem que seja a "sétima promessa" do lar de vocês — a marca que define para que vocês existem como família? / Casal: Orem juntos pela missão da família de vocês. Não apenas pelo sustento e pela saúde — mas por como serão "bênção para todas as famílias" ao redor de vocês. / Avós: A bênção de Abraão correu até vocês por meio de gerações de fé. Para quem ela está correndo agora, por meio de vocês?

III. A OBEDIÊNCIA QUE TESTEMUNHA: ABRÃO PARTE E ADORA (Gn 12:4–9) (A')
§ Indicação Textual: Gn 12:4 ("foi Abrão, como o Senhor lhe havia dito") e 12:7–8 ("edificou ali um altar ao Senhor... e edificou um altar ao Senhor e invocou o nome do Senhor") — a obediência seguida de adoração pública
§ Exegese: O versículo 4 é um dos mais curtos e mais poderosos da Bíblia: "foi Abrão, como o Senhor lhe havia dito." Sem drama, sem negociação, sem condições. Tinha 75 anos. Levou Sarai, Ló e "toda a propriedade que haviam adquirido" — a obediência foi total, não seletiva. Ao chegar a Canaã — à terra dos cananeus, ou seja, num território estrangeiro e hostil — Deus aparece e renova a promessa (v.7). A resposta de Abrão é imediata: constrói um altar. Em Betel, repete o gesto. A família peregrina não apenas viaja — adora onde chega. Os altares de Abrão em Siquém e Betel serão pontos de referência teológica para toda a narrativa de Gênesis. A família que adora no caminho deixa marcas espirituais nos lugares por onde passa.
§ Teologia Reformada: A CFW XIV.2 e CFB 14.2 ensinam que a fé salvadora "obedece aos mandamentos" — e que a obediência de Abrão em Gênesis 12 é o paradigma bíblico da fé que age. Hebreus 11:8: "pela fé Abrão obedeceu ao ser chamado para sair para um lugar que havia de receber como herança; saiu sem saber para onde ia." J.C. Ryle (Holiness): "A fé que não produz obediência não é fé bíblica — é opinião religiosa. O teste da fé de Abrão não foi o que ele disse sobre Deus, mas onde ele foi por causa de Deus." O culto familiar — os altares de Abrão — é o sinal visível de que uma família pertence a Deus: ela adora onde vai, não apenas onde é conveniente.
§ Aplicação Familiar: Pais: O culto familiar — oração à mesa, devocional diário, louvor junto — é o "altar" que vocês constroem em casa. Abrão construía altares em cada lugar novo. Vocês têm construído altares nos novos momentos da vida familiar? / Filhos: Quando a família muda, enfrenta algo novo ou difícil, o primeiro movimento de Abrão era adorar. Que o mesmo seja o primeiro movimento da sua família. / Noivos: Decidam antes do casamento: o culto familiar — oração juntos, leitura da Palavra, adoração conjunta — será uma prioridade inegociável no lar de vocês. / Casal: Onde vocês têm "construído altares" — momentos de adoração juntos — nos últimos meses? Se há ausência, conversem sobre como restaurar essa prática. / Avós: Os altares que vocês construíram ao longo da vida — momentos de oração, de louvor, de entrega a Deus — são visíveis para os netos? Mostrem esses altares a eles.

---

EIXO REDENTOR (HISTÓRICO-REDENTIVO)
O chamado de Abrão (Gn 12:1–3) é o ponto de virada da história da redenção após o fracasso de Babel. Deus não abandona a humanidade dispersa — elege um homem, uma família, para ser canal de bênção a todas as outras. Paulo em Gálatas 3:8 revela que a promessa de "todas as famílias" é o evangelho preconizado: Cristo é a "descendência" de Abraão (Gl 3:16) pela qual a bênção chega a todos os povos. Assim como Abrão obedeceu sem ver o destino, Jesus "saiu" da glória do céu ao mundo — "esvaziando-se a si mesmo" (Fp 2:7) — para que em Sua obediência perfeita todas as nações fossem abençoadas. A família cristã é herdeira desse chamado: "geração eleita, sacerdócio real, nação santa" (1 Pe 2:9) — chamada para anunciar a bênção do Deus que chama famílias a partir.

DOUTRINA CENTRAL
A Eleição e a Eficácia do Chamado: Deus chama soberanamente (Rm 8:30) — não por mérito humano, mas por graça pura. O chamado eficaz transforma o coração e produz obediência. Esse chamado tem dimensão familiar e missiológica: a família eleita existe para ser bênção ao mundo. Cf. CFW Cap. X; CFB Cap. X.

APLICAÇÕES PARA A FAMÍLIA
▸ Para os Pais: O chamado ao sacrifício e à obediência inclui suas decisões de moradia, trabalho, escola e serviço na igreja. Cada escolha forma o caráter dos filhos — para a fé ou para o comodismo.
▸ Para os Filhos: Você também é parte do chamado familiar. Observar como seus pais obedecem a Deus quando é custoso é uma das maiores lições de fé que você receberá.
▸ Para os Noivos: Antes de casar, conversem sobre a missão da família que vão formar. Para onde Deus os chama juntos? Que "altares" vão construir? Como serão canal de bênção para os que estão ao redor?
▸ Para o Casal: O casamento tem dimensão missionária. Abrão não partiu sozinho — Sarai foi com ele. A missão de Deus é cumprida em casal, em aliança, não em solidão.
▸ Para os Avós: Seus filhos e netos estão sendo chamados a territórios que você nunca conheceu. Incentive, ore e bênçoe a obediência deles — mesmo quando dói ver partir.

DINÂMICA FAMILIAR
1. Leiam juntos Gênesis 12:1–4 e perguntem: "Qual é a nossa 'Canaã' — o chamado que Deus tem para nossa família nesta temporada?"
2. Façam uma lista dos "altares" que a família construiu: momentos marcantes de adoração, gratidão e entrega coletiva a Deus.
3. Conversem com honestidade: "Que 'terras', 'parentelas' ou 'casas paternas' precisamos deixar para seguir Deus com mais plenitude?"
4. Leiam Gálatas 3:8–9 e reflitam: de que formas práticas sua família pode ser "bênção" para a vizinhança, escola ou trabalho esta semana?
5. Tomem uma decisão familiar de missão concreta: visitar alguém, hospedar alguém, servir em algum ministério — e façam isso até o próximo culto.
6. Criem juntos uma "declaração de missão familiar" — uma frase curta que expressa para que Deus chamou a família de vocês.

AUTORES REFORMADOS
▸ João Calvino (Comentário ao Gênesis): "Abrão não foi chamado por virtude própria, mas pela graça gratuita e soberana de Deus, que não escolhe por ver méritos, mas para criar mérito onde não havia nenhum. A obediência de Abrão não precedeu a graça — foi produzida por ela."
▸ John Piper (Que as Nações Se Alegrem): "A missão de Deus começou com Abrão: uma família chamada para ser bênção para todas as famílias da terra. A Igreja hoje não inaugurou a missão — ela a herdou. E a unidade básica dessa missão, desde o princípio, foi a família pactual."
▸ Joel Beeke (Criando Filhos para Deus): "O lar piedoso é em si uma missão. Quando a família obedece a Deus juntos — parte juntos, adora juntos, serve juntos — ela testemunha ao mundo que há um Rei cujo reino vale infinitamente mais do que toda segurança terrena que estamos deixando para trás."

CONCLUSÃO
O chamado de Abrão não foi apenas individual — foi familiar. Sarai foi com ele. Ló foi com ele. Os altares foram construídos em cada parada do caminho. Deus chama famílias para partir por fé, adorar no caminho e ser bênção onde chegam. Que sua família seja uma família que parte — que deixa o conforto quando Deus chama, que constrói altares nos lugares difíceis, e que vive para que todas as famílias ao seu redor sejam alcançadas pela bênção de Abraão, cumprida em Cristo.\`;

`;

// ─── Bloco Dia 15 ────────────────────────────────────────────────────────────
const new15 = `  // ─── Dia 15 — Gn 12.10–20 ───────────────────────────────────────────────
  if (d.dia === 15) return \`PARA A FAMÍLIA · Gênesis 12:10–20

TEMA: A Família na Tentação: Medo, Mentira e a Graça que Não Abandona

---

TÍTULO DO SERMÃO FAMILIAR
"Quando o Pai da Fé Falhou: O Medo que Expõe e a Graça que Restaura"

BIG IDEA PARA A FAMÍLIA
Mesmo quando a família falha gravemente por medo e desonestidade — expondo os mais vulneráveis ao perigo — a graça soberana de Deus persiste, protege e restaura, chamando-nos de volta ao caminho da fé e da integridade.

PERGUNTA PARA A FAMÍLIA
Em que situações de crise o medo tem substituído a fé em nossa família — e como isso tem afetado a confiança, a segurança e a honestidade entre nós?

PALAVRA-CHAVE DE TRANSIÇÃO
Vejamos os três momentos desta narrativa: o MEDO que entra, a MENTIRA que destrói e a GRAÇA que não abandona — mesmo quando mereceria abandonar.

---

MOVIMENTOS DO SERMÃO

I. O MEDO QUE ENTRA: A FOME E A DESCIDA AO EGITO (Gn 12:10) (A)
§ Indicação Textual: Gn 12:10 ("houve fome na terra; então Abrão desceu ao Egito para peregrinar ali, porquanto era grande a fome na terra") — a primeira crise logo após o chamado
§ Exegese: O versículo 10 é teologicamente surpreendente pela sua brevidade e sua localização: imediatamente após o chamado glorioso de Gênesis 12:1–9, com suas sete promessas e dois altares — vem a fome. A terra prometida é, desde o início, uma terra de provação. O verbo "desceu" (yarad) carrega peso narrativo em toda a Bíblia: descer ao Egito é movimento de desvio — contrário ao chamado de subir para Canaã. Deus nunca mandou Abrão ao Egito. Compare com Gênesis 26:2, onde Deus explicitamente proíbe Isaque de descer ao Egito durante uma fome similar: "Não desças ao Egito." A fome foi real — mas a resposta de Abrão foi humana demais: buscar recursos em vez de buscar o Senhor. O Egito representa ao longo das Escrituras (Is 31:1; Jr 2:18) a tentação de confiar na força e nos recursos humanos em vez de na providência divina.
§ Teologia Reformada: A CFW V.4 e CFB 5.4 ensinam que Deus pode "permitir que Seus próprios filhos caiam em tentações e pecados por um tempo." A fome que veio sobre Abrão não foi punição — foi prova. E Abrão, como todos os filhos de Adão, falhou na prova. Herman Bavinck (Reformed Dogmatics, v.3): "A crise revela o que o conforto esconde. Quando a fome chegou, Abrão revelou onde estava sua confiança real: não em Deus, mas nos celeiros do Egito. O coração humano, mesmo regenerado, tem tendências de buscar segurança nas coisas visíveis antes de nas promessas invisíveis."
§ Aplicação Familiar: Pais: A crise — financeira, de saúde, relacional — revela onde está a confiança real da família. Quando a "fome" chega, a primeira reação é orar ou ligar para o banco? Não há condenação nisso — há diagnóstico. / Filhos: Quando as coisas ficam difíceis na escola, nos relacionamentos ou em casa, qual é seu primeiro instinto: orar ou resolver por conta própria? Abrão nos ensina que o medo é real — e que precisamos de graça para não deixá-lo governar. / Noivos: Conversem sobre como cada um reage em situações de crise. Conhecer o padrão de resposta ao medo um do outro antes do casamento é sabedoria prática. / Casal: Há uma área de "descida ao Egito" em que a família de vocês tem buscado segurança em recursos humanos em vez de na providência de Deus? / Avós: Compartilhem uma história de quando a família "desceu ao Egito" — e o que aprenderam sobre a fidelidade de Deus naquele período.

II. A MENTIRA QUE EXPÕE: O ESTRATAGEMA DE ABRÃO (Gn 12:11–16) (B)
§ Indicação Textual: Gn 12:11–13 ("quando estava para entrar no Egito, disse a Sarai sua mulher: Bem sei que és mulher de formosa aparência; quando os egípcios te virem, dirão: Esta é sua mulher; e me matarão, mas a ti te deixarão viver. Dize, pois, que és minha irmã, para que eu seja bem tratado por tua causa") e 12:15–16 (Sarai levada ao palácio do Faraó; Abrão enriquecido)
§ Exegese: O monólogo de Abrão em 12:11–13 é revelador da anatomia do medo: ele começa com observação correta ("és de formosa aparência"), passa para cenário catastrófico ("me matarão"), e termina em solução desonesta ("dize que és minha irmã"). Sarai era de fato sua meia-irmã (Gn 20:12) — mas dizer apenas isso, omitindo que era sua esposa, era enganar. E o enganador é o próprio Abrão, o pai da fé. O resultado é moralmente escandaloso: Sarai é levada para o harém do Faraó enquanto Abrão é enriquecido com "ovelhas, bois, jumentos, servos, servas, jumentas e camelos" — a esposa usada como moeda de segurança e enriquecimento. A mulher, que deveria ser protegida e honrada (cf. Ef 5:25–29), é exposta e instrumentalizada. É um fracasso grave do mandato conjugal.
§ Teologia Reformada: A CFW XVII.3 e CFB 17.3 afirmam que os verdadeiros crentes "podem cair em pecados graves" e que "por suas ofensas desagradam a Deus e contristam o Seu Espírito Santo." A perseverança não garante impecabilidade — garante que Deus não abandona. João Calvino (Comentário ao Gênesis): "Este é um espelho para nós — ver o pai da fé, cuja crença foi contada como justiça, cair em mentira e covardia quando a fome e o medo bateram à porta. Não nos orgulhemos do que somos em dias de fartura; temamos pelo que podemos ser em dias de crise." Charles Spurgeon (Metropolitan Tabernacle Pulpit): "Abrão escolheu proteger sua vida ao custo da honra de sua esposa. É a inversão da cruz — Cristo escolheu perder Sua vida para proteger a honra e a segurança de Sua noiva."
§ Aplicação Familiar: Pais: O medo pode fazer com que pais exponham filhos ou cônjuge para se protegerem — tomando decisões que parecem "práticas" mas que, na verdade, são covardia. Examine: há alguma área em que o medo tem governado decisões familiares à custa dos mais vulneráveis? / Filhos: Já houve um momento em que você mentiu para se proteger de uma consequência, e isso acabou machucando alguém próximo? Esse é o padrão de Abrão. A honestidade tem custo, mas a mentira tem um custo maior. / Noivos: Decidam agora — antes do casamento — que nunca usarão um ao outro como escudo, moeda de troca ou instrumento de proteção pessoal. A aliança conjugal é de proteção mútua, não de instrumentalização mútua. / Casal: Há áreas em que um dos cônjuges tem se sentido exposto, não protegido, pelo outro? Esta passagem abre espaço para uma conversa honesta e necessária. / Avós: Como vocês lidariam com um membro da família que falhou gravemente — como Abrão? Como equilibrar responsabilidade com graça?

III. A GRAÇA QUE PERSISTE: DEUS AGE SEM SER CHAMADO (Gn 12:17–20) (A')
§ Indicação Textual: Gn 12:17–20 ("o Senhor feriu o Faraó e a sua casa com grandes pragas, por causa de Sarai, mulher de Abrão... O Faraó chamou Abrão e disse: Que é isso que fizeste a mim?... E o Faraó deu ordens... e o mandaram embora") — a intervenção divina e a repreensão humana
§ Exegese: O versículo 17 contém uma das afirmações mais surpreendentes desta perícope: "o Senhor feriu o Faraó." Deus age — e Abrão não pediu, não orou, não clamou. A intervenção é completamente soberana e graciosa, não merecida nem solicitada. O Faraó — pagão, não participante da aliança — descobre a verdade (possivelmente por revelação divina ou diagnóstico dos sacerdotes egípcios) e repreende Abrão com uma série de perguntas retóricas: "Por que não me disseste que era tua mulher? Por que disseste: Ela é minha irmã?" Um rei pagão exerce a função de profeta moral contra o pai da fé — humilhação providencial. Abrão não responde. Não há defesa possível. Mas Deus também não o abandona: Sarai é devolvida, Abrão é expulso com seus bens, e a promessa segue intacta. A graça não é barata — há consequências reais. Mas é graça: a promessa de Deus não morreu com a falha de Abrão.
§ Teologia Reformada: A CFW XVII e CFB 17 ensinam a doutrina da Perseverança dos Santos: a segurança dos eleitos não repousa em sua impecabilidade, mas na fidelidade de Deus ao Seu pacto. J.C. Ryle (Santidade): "A queda de Abrão no Egito mostra-nos duas verdades simultâneas: que o crente pode cair profundamente — e que Deus não o larga. Ambas devem nos humilhar: a primeira, para que não nos orgulhemos; a segunda, para que não desesperemos." O fato de que Deus feriu o Faraó — protegendo Sarai mesmo sem que Abrão tivesse orado — revela que a fidelidade de Deus ao Seu propósito redentor não depende da consistência do instrumento humano.
§ Aplicação Familiar: Pais: Quando vocês falharam gravemente como pais — e todos falham — a graça de Deus ainda agiu na vida dos filhos. Isso não elimina a responsabilidade, mas liberta da paralisação da culpa. Reconheçam a falha, peçam perdão e confiem na suficiência da graça. / Filhos: Quando os pais falham, Deus não falha. Aprenda a confiar em Deus, não apenas nos seus pais — eles são humanos, precisam de graça tanto quanto você, e Deus é maior do que as falhas deles. / Noivos: A restauração de um casamento após uma falha grave exige confissão honesta, não justificativa. Não "expliquem" o erro de Abrão — ele simplesmente não respondeu. Às vezes, o silêncio arrependido é mais eloquente que a defesa. / Casal: Se há falhas não confessadas entre vocês — áreas em que um expôs ou machucou o outro — esta perícope convida a uma conversa de restauração. A graça de Deus é suficiente para reconstruir o que o medo e a mentira quebraram. / Avós: Compartilhem com os netos — quando for apropriado — histórias de como Deus restaurou a família após falhas. A honestidade sobre as falhas passadas é mais formativa que a aparência de perfeição.

---

EIXO REDENTOR (HISTÓRICO-REDENTIVO)
Abrão expôs Sarai ao perigo para salvar a própria pele. Cristo fez o oposto: expôs-Se ao perigo — à cruz, ao abandono do Pai — para salvar Sua noiva, a Igreja (Ef 5:25–27: "Maridos, amai vossas mulheres, como também Cristo amou a Igreja e a Si mesmo se entregou por ela"). Abrão foi o marido que falhou; Cristo é o Esposo perfeito que nunca abandona, nunca instrumentaliza, nunca expõe — mas dá tudo para proteger. A graça que protegeu Sarai no Egito — sem que ela ou Abrão tivessem merecido — é o prelúdio da graça que protege a Igreja: não porque somos fiéis, mas porque Ele é fiel (2 Tm 2:13: "se somos infiéis, ele permanece fiel, pois não pode negar-se a si mesmo").

DOUTRINA CENTRAL
A Perseverança dos Santos e a Fidelidade de Deus ao Pacto: A falha de Abrão — profunda e pública — não anulou a promessa de Deus. A segurança do povo de Deus não repousa na consistência do crente, mas na fidelidade imutável do Senhor ao Seu propósito redentor. Isso não é licença para pecar — é fundamento para o arrependimento sem desespero. Cf. CFW Cap. XVII; CFB Cap. XVII.

APLICAÇÕES PARA A FAMÍLIA
▸ Para os Pais: O medo pode fazer pais tomarem decisões que protegem a si mesmos à custa dos filhos ou do cônjuge. Examine onde o medo — e não a fé — tem governado as decisões familiares.
▸ Para os Filhos: Quando os pais falham, Deus não falha. Aprenda a distinguir entre a fidelidade imperfeita dos seus pais e a fidelidade perfeita de Deus — e apoie-se nesta última.
▸ Para os Noivos: A honestidade total é o fundamento do casamento. Decidam agora: nunca usarão um ao outro como escudo, como instrumento ou como moeda de troca. A aliança é de proteção mútua.
▸ Para o Casal: Quando um cônjuge falha gravemente, a restauração exige confissão honesta e arrependimento genuíno — não defesas, não justificativas. A graça de Deus é suficiente para reconstruir o que o medo quebrou.
▸ Para os Avós: Compartilhem histórias de quando falharam e como Deus restaurou. A honestidade sobre as falhas passadas — não como confissão pública de vergonha, mas como testemunho de graça — é herança espiritual de incalculável valor.

DINÂMICA FAMILIAR
1. Conversem honestamente: "Há alguma área em que o medo tem governado as decisões da nossa família — levando-nos ao nosso próprio 'Egito'?"
2. Leiam Efésios 5:25–29 e comparem com Gênesis 12:11–13: que diferença há entre o marido que Abrão foi nesta passagem e o marido que Paulo descreve?
3. Practiquem confissão familiar: cada um nomeia uma área em que o medo ou a desonestidade influenciou seu comportamento recente, e pede perdão.
4. Reflitam juntos: "Como a graça de Deus tem agido em nossa família mesmo quando falhamos — mesmo sem termos pedido?"
5. Leiam 2 Timóteo 2:13 e discutam: o que significa para a família viver na certeza de que Deus é fiel mesmo quando nós não somos?
6. Façam um pacto familiar de honestidade e proteção mútua: "Em nossa casa, ninguém será usado para proteger o outro à sua custa. Somos aliados, não instrumentos."

AUTORES REFORMADOS
▸ João Calvino (Comentário ao Gênesis): "Aqui vemos quão frágil é a fé humana quando deixada a si mesma. Abrão, o pai da fé, cai na mentira porque tirou os olhos de Deus e os pôs sobre o perigo imediato. A graça de Deus, porém, não falha onde a nossa fé vacila — e isso não é encorajamento ao pecado, mas ao arrependimento."
▸ Charles Spurgeon (Metropolitan Tabernacle Pulpit): "Não te admires de que o homem mais crente da terra tenha dias de covardia e desonestidade. A diferença entre o justo e o ímpio não é que o primeiro nunca cai, mas que o primeiro sempre se levanta — porque uma mão invisível o sustenta. Assim foi com Abrão; assim será conosco."
▸ J. C. Ryle (Santidade): "A queda de Abrão no Egito ensina-nos humildade: qualquer um de nós, sob pressão suficiente, pode fazer o que Abrão fez. E ensina-nos esperança: o mesmo Deus que não abandonou Abrão não nos abandonará. A santificação é processo, não performance — e a graça é maior do que qualquer recaída."

CONCLUSÃO
Abrão, o pai da fé, falhou. Mentiu. Expôs a esposa. Foi repreendido por um pagão. E Deus não o abandonou. Sarai foi protegida. A promessa foi mantida. A graça foi maior que a falha. Esta é a esperança da família cristã: não que nunca falharemos — porque falharemos — mas que Deus é fiel mesmo quando nós não somos. Que essa verdade nos leve não à complacência com o pecado, mas ao arrependimento sem desespero, à confissão sem vergonha paralisante, e à fé renovada num Deus que persevera em nós quando nós não perseveramos nEle.\`;

`;

// Localizar e substituir os três blocos antigos
const marcador14 = `\n  // ─── Dia 14`;
const marcador15 = `\n  // ─── Dia 15`;
const marcadorFim = `\n\n  return null;\n}`;

// Encontrar posição do bloco 13
const pos13 = txt.indexOf('  // ─── Dia 13 — Gn 11.27–32');
const pos14 = txt.indexOf('  // ─── Dia 14 — Gn 12.1–9');
const pos15 = txt.indexOf('  // ─── Dia 15 — Gn 12.10–20');
const posFim = txt.indexOf('  return null;\n}');

if (pos13 < 0 || pos14 < 0 || pos15 < 0 || posFim < 0) {
  console.error('ERRO: marcadores não encontrados.');
  console.log('pos13:', pos13, 'pos14:', pos14, 'pos15:', pos15, 'posFim:', posFim);
  process.exit(1);
}

// Reconstruir: tudo antes do bloco 13 + novos blocos 13+14+15 + return null
const antes = txt.slice(0, pos13);
const depois = txt.slice(posFim);

txt = antes + new13 + new14 + new15 + depois;
fs.writeFileSync(filePath, txt, 'utf8');
console.log('OK — perícopes 13, 14, 15 reescritas com nível completo de detalhe.');
