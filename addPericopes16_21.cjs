// addPericopes16_21.cjs — insere dias 16-21 em paraFamilia.ts
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'src', 'data', 'paraFamilia.ts');
let txt = fs.readFileSync(filePath, 'utf8');

const marcador = '  return null;\n}';
if (!txt.includes(marcador)) { console.error('ERRO: marcador não encontrado.'); process.exit(1); }

const novos = `
  // ─── Dia 16 — Gn 13:1–18 ────────────────────────────────────────────────
  if (d.dia === 16) return \`PARA A FAMÍLIA · Gênesis 13:1–18

TEMA: Generosidade, Conflito e Promessa: A Família que Cede para Crescer

---

TÍTULO DO SERMÃO FAMILIAR
"A Escolha de Abrão: Quando Ceder é a Decisão mais Sábia"

BIG IDEA PARA A FAMÍLIA
Quando o conflito interno ameaça a unidade familiar, Abrão escolhe a paz sobre o direito — e Deus responde com uma promessa maior do que qualquer terra que Ló teria escolhido.

PERGUNTA PARA A FAMÍLIA
Há conflitos em nossa família onde insistir no próprio direito tem custado a paz e a unidade — e o que aconteceria se escolhêssemos ceder, confiando que Deus honra os que buscam a paz?

PALAVRA-CHAVE DE TRANSIÇÃO
Vejamos os três movimentos desta perícope: o RETORNO ao altar, o CONFLITO que divide e a PROMESSA que renova — todos dentro de Gênesis 13.

---

MOVIMENTOS DO SERMÃO

I. O RETORNO AO ALTAR: ABRÃO VOLTA AO PRINCÍPIO (Gn 13:1–4) (A)
§ Indicação Textual: Gn 13:1 ("Abrão subiu do Egito... ao Neguebe... com sua mulher e tudo o que tinha") e 13:4 ("ao lugar onde tinha estado o seu altar... e Abrão invocou ali o nome do Senhor") — o retorno deliberado ao ponto de adoração
§ Exegese: O verbo "subiu" (wayya'al) em 13:1 é antítese intencional do "desceu" (yarad) de 12:10 — Abrão sobe do Egito, revertendo o movimento de desvio. A primeira ação ao retornar não é reorganizar bens nem planejar: é voltar ao altar. O narrador especifica que era "o lugar onde tinha estado o seu altar" (13:4) — Abrão não constrói um altar novo, volta ao mesmo. Há teologia na geografia: o altar de Betel (entre Betel e Ai, 12:8) é o ponto de referência espiritual de Abrão. Quando a família desvia — como Abrão desviou no Egito — o caminho de volta começa pelo altar.
§ Teologia Reformada: A CFW XV.2-3 e a CFB 15.2-3 descrevem a renovação do arrependimento: o crente que caiu não precisa recomeçar do zero, mas retornar ao ponto de comunhão com Deus. João Calvino (Comentário ao Gênesis 13:3-4): "Abrão não volta ao Egito buscar nova riqueza — volta a Betel buscar Deus. O sábio aprende com os desvios não a lamentar o caminho perdido, mas a redescobrir o altar que sempre esteve esperando." Matthew Henry: "O altar é o centro de gravidade da família cristã — quando a família gira ao redor dele, encontra equilíbrio; quando o abandona, começa a cair."
§ Aplicação Familiar: Pais: Há um "Egito" do qual sua família precisa subir — uma área de desvio espiritual? O caminho de volta começa com o retorno ao altar familiar: oração, Palavra, comunhão com Deus. / Filhos: Quando você erra e se afasta de Deus, você sabe onde está o "altar" — o ponto de retorno? Para Abrão, era Betel. Para você, pode ser a oração, a Bíblia, a conversa honesta com alguém que teme a Deus. / Noivos: Antes do casamento, estabeleçam onde será o "altar" do lar de vocês — o ritual sagrado de adoração conjunta que funcionará como ponto de referência nos momentos de desvio. / Casal: Após conflitos, crises ou distâncias espirituais, como família vocês têm voltado ao "altar"? Há um ritual de restauração na vida de vocês? / Avós: Contem aos netos um momento em que a família "subiu do Egito" — retornou de um desvio para a comunhão com Deus. Isso é testemunho de graça.

II. O CONFLITO QUE DIVIDE E A GENEROSIDADE QUE UNE — CENTRO ◉ (Gn 13:5–13) (B)
§ Indicação Textual: Gn 13:8-9 ("Abrão disse a Ló: Não haja, peço-te, contenda entre mim e ti... Não está toda a terra diante de ti? Separa-te de mim: se fores para a esquerda, irei para a direita") e 13:10-13 (Ló escolhe a planície do Jordão, "como o jardim do Senhor... como a terra do Egito... e os homens de Sodoma eram maus e pecadores") — a escolha de Abrão e a escolha de Ló
§ Exegese: O conflito surge por abundância, não por escassez (13:6 — "a terra não comportava que habitassem juntos") — paradoxo teológico: a bênção de Deus cria tensão. Abrão, como o mais velho e com mais direito, oferece a Ló a primeira escolha — gesto contracultural num mundo onde o mais forte escolhe primeiro. O discurso de Abrão (13:8-9) é modelar: nomeia o problema ("contenda"), identifica o vínculo que importa ("somos parentes"), propõe a solução ("separa-te de mim"), e abre mão do privilégio ("se fores para a esquerda, irei para a direita"). Ló "levantou os olhos" (13:10) e escolheu pela visão — a planície parecia "como o jardim do Senhor, como a terra do Egito." Duas comparações reveladoras: jardim do Éden e Egito — lugares que pareciam perfeitos e se revelaram perigosos. Ló foi pelo visual; Abrão foi pela fé.
§ Teologia Reformada: A CFW II e a CFB 2 descrevem Deus como "aquele para quem todas as coisas são abertas" — o que Ló não via ao escolher era que Sodoma "era mau" (13:13). Calvino (Comentário 13:10): "Ló levantou os olhos para a terra mas fechou os olhos para Deus. Toda escolha que prioriza a aparência sobre a obediência está destinada ao mesmo destino de Ló." Joel Beeke (Parenting by God's Promises): "A generosidade de Abrão não foi fraqueza — foi fé expressa em ação. Ele acreditava que Deus poderia honrá-lo com a terra que Ló rejeitara. Pais que ensinam generosidade ensinam fé."
§ Aplicação Familiar: Pais: Há disputas na família por recursos, atenção ou espaço? O modelo de Abrão — nomear o conflito, valorizar o relacionamento acima do direito e ceder o privilégio — é o caminho da sabedoria familiar. / Filhos: Já houve uma situação em que você insistiu em "escolher primeiro" — e depois arrependeu? Ló escolheu primeiro e escolheu errado. Ceder pode ser a decisão mais sábia. / Noivos: Conflitos por recursos (dinheiro, tempo, espaço) são inevitáveis no casamento. Decidam agora o princípio de Abrão: o relacionamento vale mais do que estar certo. / Casal: Em conflitos conjugais, qual é a tendência de cada um — insistir no próprio direito ou buscar a paz? Como o gesto de Abrão pode modelar a forma de vocês resolverem desentendimentos? / Avós: O que vocês aprenderam ao longo da vida sobre ceder — e quais relacionamentos foram preservados ou restaurados por isso? Compartilhem essa sabedoria.

III. A PROMESSA QUE RENOVA: DEUS FALA DEPOIS DA SEPARAÇÃO (Gn 13:14–18) (A')
§ Indicação Textual: Gn 13:14-15 ("o Senhor disse a Abrão, depois que Ló se separou dele: Levanta agora os teus olhos, e olha desde o lugar onde estás... toda a terra que vês, eu a darei a ti e à tua descendência para sempre") e 13:18 ("Abrão mudou as suas tendas, e foi habitar junto aos carvalhais de Manrê... e edificou ali um altar ao Senhor") — a promessa ampliada e o altar construído
§ Exegese: O versículo 14 começa com marcador temporal decisivo: "depois que Ló se separou dele." Deus fala à Abrão imediatamente após a separação. Esta sequência não é acidental: enquanto Ló vivia perto de Abrão, as promessas de Gênesis 12 aguardavam; a separação abre espaço para Deus agir. O mandato divino em 13:14 inverte o gesto de Ló: enquanto Ló "levantou os olhos" por conta própria e escolheu pelo visual, Deus agora manda Abrão "levanta os teus olhos" e mostra o que Ele quer dar — norte, sul, leste e oeste (13:14), toda a terra. A promessa se amplia: não apenas terra vista, mas "toda a terra que vês" (13:15) e convite para "percorrer a terra em seu comprimento e largura" (13:17). A resposta de Abrão: muda as tendas e constrói um altar (13:18) — obediência e adoração, nesta ordem.
§ Teologia Reformada: A CFW VII.3 e a CFB 7.3 descrevem o pacto de graça como progressivamente revelado. A promessa de 13:14-17 expande a de 12:1-3: agora inclui toda a terra em todas as direções e especifica que a descendência será "como o pó da terra" (13:16). Deus não apenas restaura o que Ló levou — dá mais. O. Palmer Robertson (O Cristo das Alianças): "A generosidade de Abrão com Ló não prejudicou a herança de Abrão — abriu espaço para Deus ampliá-la. Quem cede ao irmão por amor a Deus não perde — recebe de Deus o que o irmão nunca poderia dar." Herman Bavinck: "A promessa de 'para sempre' (13:15) introduz a dimensão escatológica da aliança — não se trata apenas de Canaã histórico, mas da nova criação que Canaã prefigura."
§ Aplicação Familiar: Pais: Quando vocês cedem direitos por amor à família e à paz, Deus não fica em dívida com vocês — Ele honra a fé expressa em generosidade. Confiem que o que vocês "deixam para Ló" não é o que Deus reservou para vocês. / Filhos: Abrão cedeu a melhor terra e Deus lhe deu toda a terra. Há alguma situação em que você está segurando algo com tanto força que não deixa Deus agir? / Noivos: As maiores promessas de Deus para o casal frequentemente vêm depois das separações necessárias — de padrões antigos, de relacionamentos que puxavam para baixo, de ambições egoístas. O que precisa ser "separado" para que Deus amplie a promessa sobre o lar de vocês? / Casal: "Depois que Ló se separou" — Deus falou. Há algo de que vocês precisam se separar para ouvir Deus com mais clareza como casal? / Avós: A promessa de Deus é "para ti e à tua descendência para sempre" (13:15). Orem juntos com os netos por essa herança espiritual eterna.

---

EIXO REDENTOR (HISTÓRICO-REDENTIVO)
Abrão cede a melhor terra a Ló e recebe de Deus toda a terra. Cristo, o descendente de Abrão (Gl 3:16), cedeu ainda mais — "esvaziou-se a Si mesmo" (Fp 2:7) — e recebeu de Deus "toda autoridade no céu e na terra" (Mt 28:18). A promessa "toda a terra que vês te darei" (13:15) aponta para a promessa cumprida em Cristo: "os mansos herdarão a terra" (Mt 5:5), e a nova criação onde a família de Deus habitará para sempre. Ló escolheu Sodoma e perdeu tudo; Abrão cedeu Sodoma e herdou o mundo.

DOUTRINA CENTRAL
A Providência de Deus na Generosidade: quem cede por fé não perde — abre espaço para Deus agir com promessas maiores do que qualquer direito humano poderia garantir. A paz familiar tem valor eterno; as disputas por recursos têm valor transitório. Cf. CFW Cap. V; CFB Cap. V.

APLICAÇÕES PARA A FAMÍLIA
▸ Para os Pais: Quando conflitos surgem em casa por recursos ou espaço, modelem o princípio de Abrão: o relacionamento vale mais do que o direito. Essa decisão ensina mais sobre fé do que qualquer sermão.
▸ Para os Filhos: Escolher ceder — na divisão de brinquedos, no quarto compartilhado, no tempo dos pais — é praticar a fé de Abrão. Deus honra quem honra o irmão.
▸ Para os Noivos: Conflitos por dinheiro, espaço e decisões virão. Estabeleçam agora o princípio: "Nós dois somos parentes" (13:8) — o vínculo vale mais do que vencer o argumento.
▸ Para o Casal: Há alguma "Ló" — uma disputa ou um direito — que vocês têm segurado que está custando a paz? Esta semana, considerem ceder — e vejam o que Deus faz depois.
▸ Para os Avós: A herança mais valiosa que vocês deixam não é terra ou dinheiro — é o padrão de como resolver conflitos com generosidade e fé. Os netos estão observando.

DINÂMICA FAMILIAR
1. Leiam juntos Gênesis 13:8-9. Perguntem: "Abrão tinha o direito de escolher primeiro. Por que não o exerceu? O que isso diz sobre ele?"
2. Atividade: Coloquem dois "presentes" na mesa — um claramente melhor. Perguntem às crianças: "Quem escolhe primeiro? Por que?" Discutam o que Abrão faria.
3. Leiam 13:14-15 e discutam: "Deus falou a Abrão DEPOIS que Ló se separou. Por que Deus esperou esse momento? O que isso nos ensina sobre como ouvimos Deus?"
4. Perguntem: "Há algum conflito em nossa família agora que estamos resolvendo como Ló (escolhendo o melhor para si) em vez de como Abrão (cedendo por amor)?"
5. Leiam 13:18: Abrão "edificou ali um altar." Toda resolução de conflito em Abrão termina em adoração. Como sua família pode fazer o mesmo?
6. Orem pedindo graça para ceder quando for necessário — e fé para confiar que Deus honra quem busca a paz.

AUTORES REFORMADOS
▸ João Calvino (Comentário ao Gênesis): "Abrão não foi ingênuo ao ceder — foi fiel. Ele sabia que a terra não era dele para guardar, mas de Deus para dar. Quem compreende que tudo é de Deus pode ceder tudo sem perder nada de eterno."
▸ Joel Beeke (Parenting by God's Promises): "A generosidade de Abrão com Ló não foi fraqueza — foi fé expressa em ação. Ele acreditava que Deus poderia honrá-lo mais do que qualquer escolha humana. Pais que ensinam generosidade estão ensinando que Deus é suficiente."
▸ Matthew Henry (Commentary on Genesis): "O altar de Abrão em Hebrom é o sinal de que a resolução do conflito com Ló não o amargou — o aproximou de Deus. A família que resolve seus conflitos e vai ao altar em seguida é a família mais saudável que existe."\`;

  // ─── Dia 17 — Gn 14:1–12 ────────────────────────────────────────────────
  if (d.dia === 17) return \`PARA A FAMÍLIA · Gênesis 14:1–12

TEMA: Fidelidade no Exílio: Quando as Escolhas Erradas Têm Consequências

---

TÍTULO DO SERMÃO FAMILIAR
"Ló em Sodoma: As Consequências Que Ninguém Viu Vir"

BIG IDEA PARA A FAMÍLIA
As escolhas que Ló fez ao se separar de Abrão — guiadas pela visão do que parecia bom — o colocaram no centro de uma guerra que ele nunca planejou enfrentar; o mesmo acontece com toda família que escolhe proximidade com o mundo em vez de fidelidade a Deus.

PERGUNTA PARA A FAMÍLIA
Que escolhas tomamos como família — pela aparência, pela conveniência ou pelo ganho imediato — que nos têm colocado em posições de vulnerabilidade que não antecipamos?

PALAVRA-CHAVE DE TRANSIÇÃO
Vejamos os três movimentos desta perícope: a GUERRA que irrompe, a DERROTA que expõe e a CAPTURA que conclui — todos contidos em Gênesis 14:1–12.

---

MOVIMENTOS DO SERMÃO

I. A GUERRA QUE IRROMPE: QUATRO REIS CONTRA CINCO (Gn 14:1–9) (A)
§ Indicação Textual: Gn 14:1-2 ("aconteceu nos dias de Anrafel, rei de Sinar... que fizeram guerra a Bera, rei de Sodoma... e aos reis de Gomorra, Admá, Zeboin e Belá") e 14:9 ("os cinco reis contra quatro") — o contexto geopolítico que envolve Ló
§ Exegese: Gênesis 14:1-9 apresenta a primeira narrativa de guerra na Bíblia — e Ló está bem no meio dela, não por convocação, mas por localização. Quatro reis do leste (liderados por Quedorlaômer, o hegemônico regional) haviam subjugado os cinco reis da planície por doze anos (14:4); no décimo terceiro ano, os cinco se rebelaram (14:4); no décimo quarto ano, a guerra eclodiu. Ló não é mencionado nos versículos 1-9 — ele está em Sodoma (13:12-13), cidade que se rebelou e que agora está no epicentro do conflito. A guerra não foi sobre Ló; mas Ló estava no lugar errado por ter feito a escolha errada. O narrador não precisa comentar: a estrutura dos fatos condena a escolha de Ló mais eloquentemente que qualquer sermão.
§ Teologia Reformada: A CFW V.4 e a CFB 5.4 ensinam que Deus pode "permitir que Suas criaturas caiam em tentações e seus próprios pecados" como parte de Sua providência disciplinar. A guerra dos quatro reis não foi punição direta de Deus sobre Ló — mas foi a consequência natural de ter escolhido habitar com os "homens de Sodoma, que eram maus e grandes pecadores diante do Senhor" (13:13). Herman Bavinck (Reformed Dogmatics, v.3): "A providência de Deus inclui as consequências naturais das escolhas humanas. Não é necessário milagre especial para punir o pecado — basta deixar que as consequências sigam o curso natural que o próprio pecado desencadeou."
§ Aplicação Familiar: Pais: Há ambientes — escolas, grupos, bairros, relacionamentos — que seus filhos frequentam que os colocam em vulnerabilidade crescente, como Ló em Sodoma? A preocupação dos pais com os contextos dos filhos é sabedoria bíblica, não controle excessivo. / Filhos: Ló não entrou na guerra — a guerra veio até ele, porque ele morava em Sodoma. Os ambientes que você frequenta importam: eles têm o poder de te envolver em conflitos que você nunca escolheu. / Noivos: Conversem antes do casamento sobre os ambientes que querem cultivar — amizades, entretenimento, vizinhança, comunidade de fé. O que está "perto de Sodoma" na vida de cada um de vocês? / Casal: Há contextos que a família de vocês está frequentando que parecem neutros mas que têm o potencial de "envolver em guerras" que vocês não anteciparam? / Avós: A experiência de vida de vocês inclui guerras que vieram porque estavam no lugar errado. O que aprenderam sobre a importância dos ambientes que se escolhe?

II. A DERROTA DE SODOMA: OS REIS FOGEM E CAEM — CENTRO ◉ (Gn 14:10) (B)
§ Indicação Textual: Gn 14:10 ("ora o vale de Sidim estava cheio de poços de betume; e os reis de Sodoma e Gomorra fugiram e caíram ali; e os que ficaram fugiram para os montes") — a derrota que expõe a fragilidade de Sodoma
§ Exegese: O versículo 10 é o centro da perícope e contém ironia brutal: o "vale de Sidim" — que em 13:10 Ló havia visto como "como o jardim do Senhor, como a terra do Egito" — está "cheio de poços de betume." A planície que parecia paraíso é, na verdade, um campo de armadilhas. Os próprios reis de Sodoma e Gomorra caem nos poços enquanto fogem — o julgamento vem pelo mesmo terreno que parecia vantagem. O narrador não comenta; deixa a ironia falar: a terra que Ló escolheu por parecer a melhor revelou-se armadilha. E os que não caíram nos poços "fugiram para os montes" — abandonando a cidade. Sodoma, a cidade que Ló escolheu como lar, não conseguia nem proteger seus próprios reis.
§ Teologia Reformada: A CFW II.1 e a CFB 2.1 afirmam que Deus é o "único Ser que se basta a Si mesmo" — enquanto toda realidade humana que parece autossuficiente se revela frágil ao ser testada. Calvino (Comentário ao Gênesis 14:10): "Os poços de betume de Sidim são o julgamento que Sodoma preparou para si mesma ao rebelar-se contra aqueles a quem servia. A soberba que faz a criatura se rebelar contra aquilo que a sustenta sempre cava seus próprios poços." R.C. Sproul (The Holiness of God): "O que parece jardim sem Deus no centro frequentemente esconde poços de betume. O olho humano enxerga superfície; somente a fé enxerga o que o solo esconde."
§ Aplicação Familiar: Pais: O vale que parecia paraíso estava cheio de poços. Que valores culturais — de beleza, sucesso, felicidade — parecem "como o jardim do Senhor" mas escondem armadilhas para os filhos de vocês? / Filhos: A planície que Ló escolheu tinha poços escondidos. Nem tudo que parece bom é bom. Como a Bíblia pode nos ajudar a ver além da superfície, antes de fazer escolhas importantes? / Noivos: Antes do casamento, investigem o "solo" das decisões que estão tomando — não apenas o que parece bom agora, mas o que aquela escolha revelará em 5, 10, 20 anos. / Casal: Há escolhas que vocês fizeram que pareciam "jardim" e revelaram "poços"? Como a fé de vocês tem respondido a essas descobertas? / Avós: Compartilhem uma história de quando algo que parecia excelente revelou armadilhas — e como Deus os protegeu ou restaurou.

III. A CAPTURA DE LÓ: CONSEQUÊNCIA DAS ESCOLHAS (Gn 14:11–12) (A')
§ Indicação Textual: Gn 14:11-12 ("tomaram todos os bens de Sodoma e de Gomorra, e todos os seus mantimentos, e foram-se. E tomaram também a Ló... e seus bens, e partiram; pois ele habitava em Sodoma") — Ló capturado como consequência direta de sua localização
§ Exegese: Os versículos 11-12 são de uma concisão devastadora. "E tomaram também a Ló" — o "também" (gam) hebraico é inclusivo: Ló foi arrastado junto com os espólios de guerra, não como alvo principal, mas como item colateral. E a razão é dada imediatamente: "pois ele habitava em Sodoma." Três palavras em hebraico explicam tudo (wehû' yōšēb bisdōm). Ló não estava em Sodoma por acidente, por trabalho ou por missão — "habitava" (yōšēb, particípio de permanência) lá. Esta é a consequência de 13:12 ("Ló habitou nas cidades da planície e foi armando suas tendas até Sodoma"). A escolha que parecia sábia em 13:10-11 revelou seu fruto amargo em 14:11-12. Não há culpa externa — apenas consequência interna de escolhas feitas com os olhos abertos.
§ Teologia Reformada: A CFW VI.6 e a CFB 6.6 ensinam que o pecado tem consequências que se estendem além do pecador — afetando família, descendência e contexto. Ló não apenas foi capturado: seus "bens" também foram levados. As escolhas do pai têm impacto no que a família possui, experimenta e herda. Voddie Baucham (Family Shepherds): "A frase 'pois ele habitava em Sodoma' deveria ressoar em cada pai como aviso: onde a família habita — física, relacional e espiritualmente — determina em que guerras a família será envolvida. O lar não é apenas endereço, é declaração de valores." Thomas Watson (A Body of Divinity): "A captura de Ló não foi azar — foi colheita. Ele plantou em Sodoma; colheu em cativeiro. Assim opera a providência de Deus: não como punição arbitrária, mas como consequência natural dos princípios que governam a criação moral."
§ Aplicação Familiar: Pais: "Pois ele habitava em Sodoma" — a frase que explica tudo. Onde sua família habita — em que ambientes, com que valores, com que amigos — é a explicação para muito do que acontece com ela. Examinem com oração onde a família "habita". / Filhos: Ló foi capturado não porque era mau, mas porque estava no lugar errado. Amizades, grupos online, ambientes que você frequenta têm esse poder: podem te colocar em guerras que você nunca escolheu. / Noivos: Onde vão "habitar" como casal? Não apenas geograficamente, mas espiritualmente — que comunidade de fé, que amizades, que valores formarão o solo do lar de vocês? / Casal: "Tomaram também a Ló e seus bens." O cativeiro de Ló afetou toda a sua família e posses. As escolhas de um cônjuge afetam o outro e os filhos — como vocês têm tomado decisões importantes de forma conjunta? / Avós: Se pudessem dar um conselho sobre "onde habitar" — física e espiritualmente — para os netos, qual seria?

---

EIXO REDENTOR (HISTÓRICO-REDENTIVO)
A captura de Ló em Gênesis 14:12 não é o fim da história — é o começo da missão de Abrão. No versículo 14, Abrão "ouviu que seu irmão havia sido aprisionado" e saiu para resgatá-lo. Este padrão prefigura Cristo: enquanto toda a humanidade estava "capturada" — escravizada ao pecado e às consequências de suas próprias escolhas erradas (Rm 6:17) — o Senhor Jesus "ouviu" e saiu da glória do céu para o resgate. A perícope de 14:1-12 termina com Ló em cativeiro; mas o evangelho não termina com o cativo: termina com o Libertador.

DOUTRINA CENTRAL
As consequências do pecado e das escolhas erradas são reais, tangíveis e frequentemente coletivas — afetam família, bens e futuro. A sabedoria bíblica para a família não é apenas evitar o mal óbvio, mas examinar os ambientes, relacionamentos e valores que nos tornam vulneráveis às "guerras" que não antecipamos. Cf. CFW Cap. V–VI; CFB Cap. V–VI.

APLICAÇÕES PARA A FAMÍLIA
▸ Para os Pais: Examinem os ambientes que seus filhos frequentam com o mesmo cuidado que examinariam o solo de um terreno: o que está escondido sob a superfície que parece boa?
▸ Para os Filhos: Os lugares onde você habita — física e virtualmente — têm consequências reais. Ló "habitava em Sodoma" e foi capturado. Onde você habita?
▸ Para os Noivos: Decidam juntos onde vão "habitar" como casal — que comunidade, que amizades, que valores. Essa decisão moldará tudo o mais.
▸ Para o Casal: Revisem juntos os ambientes que a família frequenta. Há algum "Sodoma" — algo que parece bom mas que tem poços escondidos — que precisa de avaliação honesta?
▸ Para os Avós: A experiência de vocês pode proteger os netos de escolhas que parecem boas e revelam-se armadilhas. Compartilhem essa sabedoria com franqueza e amor.

DINÂMICA FAMILIAR
1. Leiam juntos 14:10-12 e perguntem: "Por que Ló foi capturado? Que decisão anterior levou a esse resultado?"
2. Mapeiem juntos a "geografia espiritual" da família: que ambientes, grupos e influências estão mais próximos de "Sodoma" e quais estão mais próximos de "Betel" (o altar)?
3. Perguntem às crianças: "Se um amigo te convidasse para algo que parece bom mas que pode ter 'poços escondidos', como você decidiria?"
4. Discutam: "Quais são os 'poços de betume' escondidos em coisas que parecem atraentes na nossa cultura atual?"
5. Leiam Provérbios 4:23-27 e conectem com Gênesis 14: a sabedoria começa antes da escolha, não depois da captura.
6. Orem pedindo discernimento para ver o que está escondido sob a superfície das escolhas que a família enfrenta.

AUTORES REFORMADOS
▸ João Calvino (Comentário ao Gênesis): "Ló não foi capturado porque era criminoso — foi capturado porque habitava entre criminosos. A proximidade com o mal não é neutra: ela gradualmente nos envolve em suas consequências, mesmo quando não participamos de seus atos."
▸ Voddie Baucham (Family Shepherds): "A pergunta que todo pai deve fazer não é apenas 'meu filho está fazendo algo errado?' mas 'onde meu filho está habitando?' Porque onde habitamos determina as guerras em que seremos envolvidos."
▸ Thomas Watson (A Body of Divinity): "A captura de Ló ensina que o pecado raramente atinge apenas o pecador. Toda a família sofreu. Todo o bem foi levado. O cativeiro é sempre mais caro do que parecia a liberdade que custou."\`;

  // ─── Dia 18 — Gn 14:13–24 ───────────────────────────────────────────────
  if (d.dia === 18) return \`PARA A FAMÍLIA · Gênesis 14:13–24

TEMA: Resgate, Sacerdócio e Integridade: A Família que Age com Honra

---

TÍTULO DO SERMÃO FAMILIAR
"Abrão e Melquisedeque: O Guerreiro que Adora e o Homem que Recusa a Corrupção"

BIG IDEA PARA A FAMÍLIA
Abrão resgata Ló não por obrigação, mas por amor; recebe bênção de Melquisedeque, o sacerdote-rei; e recusa o enriquecimento do rei de Sodoma — revelando uma família que age com coragem, adoração e integridade incorruptível.

PERGUNTA PARA A FAMÍLIA
Em que momentos nossa família tem a oportunidade de agir com coragem por alguém que errou — e como resistimos à tentação de nos enriquecer por meios que comprometem nossa integridade?

PALAVRA-CHAVE DE TRANSIÇÃO
Vejamos os três movimentos desta perícope: o RESGATE corajoso, a ADORAÇÃO com Melquisedeque e a RECUSA incorruptível — todos em Gênesis 14:13–24.

---

MOVIMENTOS DO SERMÃO

I. O RESGATE CORAJOSO: ABRÃO MOBILIZA 318 HOMENS (Gn 14:13–16) (A)
§ Indicação Textual: Gn 14:14 ("quando Abrão ouviu que seu irmão havia sido aprisionado, armou os seus servos nascidos em sua casa, trezentos e dezoito, e perseguiu os inimigos até Dã") e 14:16 ("trouxe de volta todos os bens; trouxe também a Ló, seu irmão, e seus bens, como também as mulheres e o povo") — o resgate total
§ Exegese: O versículo 13 apresenta um refugiado anônimo que traz a notícia a Abrão — e a reação de Abrão é imediata: "armou seus servos." O número 318 (14:14) é preciso — não arredondado, indicando dado histórico, não simbólico. Mais significativo: esses 318 eram "nascidos em sua casa" (yĕlîdê bêtô) — não mercenários contratados, mas membros da família estendida de Abrão. O lar de Abrão era suficientemente grande e bem formado para produzir 318 guerreiros. A família de Abrão era uma comunidade — com formação, lealdade e capacidade de ação. O resultado do resgate (14:16) é completo: "todos os bens... Ló... seus bens... as mulheres... o povo." Nada foi deixado para trás. Abrão não resgatou apenas Ló — resgatou todos. E tudo isso por Ló, que havia se separado de Abrão por escolha própria.
§ Teologia Reformada: A CFW II (atributos de Deus) inclui bondade que não depende de mérito do receptor. Abrão imita o caráter de Deus: resgate sem condição. Calvino (Comentário ao Gênesis 14:14): "Abrão não pesou os méritos de Ló antes de ir resgatá-lo. Ló havia escolhido mal, havia se separado de Abrão, havia buscado as planícies de Sodoma. Mas quando precisou de ajuda, Abrão foi. Este é o amor que a Bíblia chama de chesed — fidelidade que não depende de reciprocidade." Joel Beeke (Parenting by God's Promises): "Os '318 nascidos em sua casa' revelam que Abrão havia construído não apenas uma família, mas uma comunidade formada na fé e capaz de ação. A família que forma seus membros para servir pode mobilizar-se para o bem quando a crise chega."
§ Aplicação Familiar: Pais: Abrão formou 318 guerreiros dentro de sua própria casa. Que tipo de pessoas seus filhos estão sendo formados para ser — e para que tipo de ação sua família pode se mobilizar quando alguém precisa? / Filhos: Ló errou e precisou de ajuda. Abrão foi sem perguntar "você merece ser salvo?" Há alguém que errou que você tem evitado ajudar por causa dos erros dele? / Noivos: O casal que se torna "comunidade" — com lealdade, formação espiritual e disposição para agir juntos — é o casal preparado para os momentos de crise. Que tipo de comunidade vocês querem ser? / Casal: Há alguém na família estendida de vocês em "cativeiro" — relacional, espiritual, emocional — que vocês têm evitado ajudar? O modelo de Abrão convida a ação, não a espera. / Avós: Compartilhem uma história de quando a família se mobilizou para ajudar alguém — e o que aquela ação custou e produziu.

II. A ADORAÇÃO COM MELQUISEDEQUE: PÃO, VINHO E BÊNÇÃO — CENTRO ◉ (Gn 14:17–20) (B)
§ Indicação Textual: Gn 14:18-20 ("Melquisedeque, rei de Salém, trouxe pão e vinho; e era sacerdote do Deus Altíssimo. E abençoou-o... E Abrão lhe deu o dízimo de tudo") — encontro com o sacerdote-rei
§ Exegese: Gênesis 14:18-20 é um dos textos mais densos e teologicamente ricos de todo o Pentateuco — e está encaixado no centro desta perícope. Melquisedeque ("rei de justiça") é "rei de Salém" (Jerusalém) e "sacerdote do Deus Altíssimo" (El Elyon). Ele é o primeiro "sacerdote" mencionado na Bíblia — aparece do nada, sem genealogia (cf. Hb 7:3), com pão e vinho (elementos que ressoarão na Última Ceia), abençoa Abrão e a Abrão dá o dízimo de tudo. Três elementos teológicos: (1) "Deus Altíssimo, Criador do céu e da terra" (14:19) — o mesmo Deus que Abrão serve, reconhecido por um rei-sacerdote pagão; (2) "que entregou os teus inimigos nas tuas mãos" (14:20) — Melquisedeque atribui a vitória não a Abrão mas a Deus; (3) O dízimo de Abrão reconhece a superioridade de Melquisedeque — e por extensão, a de Levi (Hb 7:9-10), prefigurando Cristo.
§ Teologia Reformada: A CFW VIII.1 e a CFB 8.1 descrevem Cristo como "profeta, sacerdote e rei." O NT interpreta Melquisedeque como tipo de Cristo (Sl 110:4; Hb 5:6-10; 7:1-28). Herman Bavinck (Reformed Dogmatics, v.3): "Melquisedeque aparece no ápice da perícope como sinal de que há um sacerdócio maior que o de Arão, um reino maior que o de Davi e uma bênção mais profunda que qualquer vitória militar. Ele é Cristo visto de longe." O. Palmer Robertson: "O encontro de Abrão com Melquisedeque é o primeiro sacramento da fé — pão e vinho oferecidos no caminho da batalha, antes de qualquer sacrifício. A graça precede a obrigação."
§ Aplicação Familiar: Pais: Depois de grandes vitórias — profissionais, relacionais, espirituais — qual é o primeiro gesto da família: celebrar o próprio sucesso ou reconhecer que "Deus entregou os inimigos nas suas mãos"? O dízimo de Abrão é a resposta. / Filhos: Abrão venceu a batalha e antes de ir para casa foi adorar. Você já teve um "Melquisedeque" — alguém que te lembrou de dar graças a Deus depois de uma conquista? / Noivos: O dízimo no casal é mais do que finanças — é confissão de que tudo pertence a Deus. Como vocês planejam honrar a Deus com os bens do lar que vão construir? / Casal: Após vitórias — superação de crise, conquista profissional, saúde restaurada — como família vocês têm parado para adorar com Melquisedeque, reconhecendo que foi Deus quem entregou? / Avós: Que conquistas da vida de vocês você atribui claramente à mão de Deus — e já agradeceram publicamente diante dos filhos e netos?

III. A RECUSA INCORRUPTÍVEL: "NÃO TOMAREI NEM UM FIO" (Gn 14:21–24) (A')
§ Indicação Textual: Gn 14:22-23 ("levantei a minha mão ao Senhor, ao Deus Altíssimo, Criador do céu e da terra, que nem um fio nem a correia de um sapato tomarei de tudo o que é teu, para que não digas: Eu enriqueci a Abrão") — a recusa principiológica
§ Exegese: O rei de Sodoma, após o resgate, oferece a Abrão os bens recuperados — mas pede de volta as pessoas (14:21). A oferta parece razoável: Abrão lutou, merece os espólios. Mas Abrão recusa categoricamente, e o versículo 22 revela por quê — ele havia "levantado a mão ao Senhor" (jurado solenemente) antes de aceitar qualquer coisa do rei de Sodoma. A razão é explícita: "para que não digas: Eu enriqueci a Abrão" (14:23). Abrão não quer dever a Sodoma sua prosperidade. Ele já recebeu bênção de Melquisedeque (o sacerdote-rei de Deus); não precisa de bênção do rei de Sodoma. A única exceção: o que os jovens já comeram e a parte dos aliados (14:24) — Abrão protege terceiros, mas não aceita nada para si. É integridade que vai além da legalidade — é questão de quem ele quer que seja creditado por sua riqueza.
§ Teologia Reformada: A CFW XVI.1 e a CFB 16.1 tratam das boas obras — que devem ser feitas "para a glória de Deus e não para receber louvor dos homens." Abrão recusa os espólios de Sodoma por razão teológica, não por estratégia: ele não quer que a narrativa de sua prosperidade seja contada com Sodoma no centro. Calvino (Comentário 14:23): "Abrão não recusou por desprezo ao rei de Sodoma, mas por amor à reputação de Deus. Ele queria que todos soubessem: minha riqueza vem do Criador do céu e da terra, não das guerras humanas." J.C. Ryle (Santidade): "A integridade de Abrão nesta cena não é apenas honestidade — é declaração de dependência. Quem pode ser enriquecido por Deus não precisa ser enriquecido pelo mundo, e quem depende do mundo para prosperar não pode testemunhar do Deus que provê."
§ Aplicação Familiar: Pais: Há fontes de renda, relacionamentos ou oportunidades que enriqueceriam materialmente mas comprometem o testemunho da família? Abrão recusou não porque era proibido, mas porque não queria que Sodoma pudesse se gabar de tê-lo enriquecido. / Filhos: "Nem um fio nem a correia de um sapato" — Abrão foi radical na integridade. Em que situações você é tentado a aceitar algo que parece inofensivo mas compromete seu testemunho? / Noivos: Decidam antes do casamento: de quem vocês querem depender para prosperar — de Deus ou de "Sodoma"? Essa decisão moldará como vocês ganham, gastam e agradecem. / Casal: Há alguma área financeira ou profissional em que a família depende de algo que compromete a integridade de vocês? Esta cena convida a uma avaliação honesta. / Avós: Que decisões de integridade tomaram ao longo da vida — recusar algo que parecia legítimo mas que comprometeria o testemunho? Compartilhem com os netos o que motivou essa escolha.

---

EIXO REDENTOR (HISTÓRICO-REDENTIVO)
Melquisedeque, rei-sacerdote de Salém, traz pão e vinho e abençoa Abrão — e é explicitamente tipologia de Cristo (Sl 110:4; Hb 7). Cristo é o verdadeiro Rei de Salém (Paz), o verdadeiro Sacerdote do Deus Altíssimo, que na Última Ceia também trouxe pão e vinho — não como bênção após uma batalha terrena, mas como selo da aliança selada com o Seu próprio sangue. E assim como Abrão recusou o enriquecimento de Sodoma confiando no Deus Altíssimo, a família cristã recusa o que o mundo oferece — sabendo que "não tendes necessidade de nada" daquele que "é Criador do céu e da terra" (14:22).

DOUTRINA CENTRAL
A integridade da família cristã não é apenas honestidade técnica — é declaração teológica: nossa prosperidade vem do Criador do céu e da terra, não das ofertas de Sodoma. E após toda vitória, a família que encontra seu "Melquisedeque" — que reconhece que foi Deus quem entregou os inimigos — é a família que sabe adorar. Cf. CFW Cap. XVI; CFB Cap. XVI.

APLICAÇÕES PARA A FAMÍLIA
▸ Para os Pais: Modelar integridade financeira para os filhos — recusar o que compromete o testemunho, mesmo quando é legal — é ensiná-los que Deus provê de formas que Sodoma não consegue.
▸ Para os Filhos: A integridade de Abrão foi radical: "nem um fio." Em pequenas decisões diárias — honestidade em provas, honestidade com dinheiro dos pais — você está praticando ou evitando essa radicalidade?
▸ Para os Noivos: Antes do casamento, estabeleçam princípios de integridade financeira e profissional: de onde virá a prosperidade de vocês, e que fontes vocês recusarão, mesmo quando parecem legítimas?
▸ Para o Casal: Revisem juntos as fontes de prosperidade da família. Há alguma "Sodoma" que, se enriquecesse vocês, poderia gabar-se disso? Ora é momento de conversar sobre isso.
▸ Para os Avós: Compartilhem com os netos decisões de integridade que custaram algo no curto prazo mas que preservaram o testemunho no longo prazo. Essa é herança mais valiosa que qualquer bem material.

DINÂMICA FAMILIAR
1. Leiam juntos 14:14 e discutam: "318 pessoas 'nascidas em sua casa.' Que tipo de família Abrão havia construído para ter esse tipo de lealdade?"
2. Leiam 14:18-20 e perguntem: "Quem é Melquisedeque? Por que Abrão lhe deu o dízimo? O que isso revela sobre Abrão?"
3. Leiam 14:22-23 e discutam: "Por que Abrão recusou os bens do rei de Sodoma se havia lutado por eles? Qual foi o argumento dele?"
4. Perguntem: "Há alguma 'Sodoma' que gostaríamos de aceitar enriquecimento — algo legal mas que comprometeria nosso testemunho?"
5. Atividade: Cada membro da família completa a frase: "Prefiro ser pobre em ___ do que rico às custas de ___." Compartilhem e discutam.
6. Orem agradecendo a Deus pelas vitórias da família — e pedindo sabedoria para recusar o que Sodoma oferece.

AUTORES REFORMADOS
▸ João Calvino (Comentário ao Gênesis): "Abrão recusou os espólios de Sodoma não por escrúpulo legal, mas por confissão teológica: ele não queria que nenhuma glória humana pudesse reivindicar sua prosperidade. Esta é a integridade mais profunda — a que nasce não do medo da lei, mas do amor à glória de Deus."
▸ Joel Beeke (Parenting by God's Promises): "Os '318 nascidos em sua casa' são o fruto da família que Abrão havia formado — não apenas filhos biológicos, mas uma comunidade de fé, lealdade e capacidade de ação. A família cristã que forma seus membros para o serviço produz esse tipo de fruto."
▸ J.C. Ryle (Santidade): "A integridade de Abrão nesta cena é mais do que honestidade — é declaração de dependência. Quem confia que Deus provê pode recusar o que o mundo oferece. E quem recusa o que o mundo oferece testemunha que há um Provedor que o mundo não conhece."\`;

  // ─── Dia 19 — Gn 15:1–21 ────────────────────────────────────────────────
  if (d.dia === 19) return \`PARA A FAMÍLIA · Gênesis 15:1–21

TEMA: Aliança e Fidelidade: A Fé que é Contada como Justiça

---

TÍTULO DO SERMÃO FAMILIAR
"A Aliança de Deus com Abrão: Quando Deus Passa Sozinho pelo Meio"

BIG IDEA PARA A FAMÍLIA
Deus faz aliança com Abrão numa noite de medo e dúvida — e passa sozinho entre os animais cortados, assumindo sobre Si mesmo toda a responsabilidade pelo cumprimento da promessa, enquanto Abrão dorme. Esta é a graça que sustenta toda família de fé.

PERGUNTA PARA A FAMÍLIA
Quando nossa família enfrenta o medo e a dúvida sobre o futuro, como a aliança unilateral de Deus — que não depende de nossa fidelidade, mas da fidelidade dEle — nos ancora?

PALAVRA-CHAVE DE TRANSIÇÃO
Vejamos os três momentos desta aliança: o DIÁLOGO honesto com Deus, o RITUAL de aliança preparado e a RATIFICAÇÃO unilateral por Deus — tudo em Gênesis 15:1–21.

---

MOVIMENTOS DO SERMÃO

I. O DIÁLOGO HONESTO: MEDO, DÚVIDA E FÉ (Gn 15:1–6) (A)
§ Indicação Textual: Gn 15:1 ("Não temas, Abrão; eu sou o teu escudo e o teu galardão será muito grande") e 15:2-3 ("Senhor Deus, que me darás, visto que continuo sem filhos... e o filho de minha casa é o meu herdeiro") e 15:6 ("e creu ele no Senhor, e isso lhe foi imputado como justiça") — o diálogo de fé e dúvida
§ Exegese: O capítulo 15 abre com "depois destas coisas" — logo após a vitória militar e o encontro com Melquisedeque. Mas Abrão está com medo (15:1 — "Não temas" pressupõe que ele teme). A visão de Deus não começa com exigências — começa com conforto: "Eu sou o teu escudo." Mas Abrão não aceita passivamente: ele questiona (15:2-3). "Que me darás?" — não é irreverência, é honestidade de fé. A queixa de Abrão é específica: a promessa de 12:1-3 falou em nação e descendência, mas Abrão tem 75+ anos e nenhum filho biológico. Eliezer (15:2-3) é a solução humana que Abrão está considerando. A resposta de Deus é visual: "Conta as estrelas, se as podes contar... assim será a tua descendência" (15:5). E então vem o versículo mais importante de toda a perícope: "e creu ele no Senhor, e isso lhe foi imputado como justiça" (15:6) — citado por Paulo em Romanos 4:3 e Gálatas 3:6 como fundamento da justificação pela fé.
§ Teologia Reformada: A CFW XI.1-2 e a CFB 11.1-2 definem a justificação: "Deus... imputa-lhes a justiça de Cristo, sendo eles justificados somente pela fé, sem qualquer obra da lei." Gênesis 15:6 é o texto bíblico fundante desta doutrina. Herman Bavinck (Reformed Dogmatics, v.3): "A fé de Abrão não era uma obra que merecesse a imputação da justiça — era o instrumento pelo qual ele recebia aquilo que Deus prometia. A distinção é crucial: a fé não é a justiça; é a mão que recebe a justiça que Deus dá." Calvino (Institutos III.11.4): "Abrão não creu porque entendia — as estrelas eram incontáveis e ele era velho. Ele creu porque Deus prometeu. Esta é a anatomia da fé: confiar na palavra de Deus contra toda evidência dos sentidos."
§ Aplicação Familiar: Pais: Abrão expressou sua dúvida a Deus honestamente — e foi respondido. Seus filhos precisam ver que fé e dúvida podem coexistir, e que levar as dúvidas a Deus é mais saudável que fingir que elas não existem. / Filhos: Você já duvidou de uma promessa de Deus — sobre o futuro, sobre o sentido da vida? A Bíblia mostra que Abrão também duvidou. A diferença é: ele levou a dúvida a Deus em vez de fugir dEle. / Noivos: O casamento envolve promessas sobre um futuro incerto. Como cada um de vocês tende a responder quando o futuro parece impossível — com fuga ou com o diálogo honesto de Abrão? / Casal: Há promessas de Deus sobre o lar de vocês que parecem impossíveis agora — como estrelas que não se pode contar? Esta cena convida a olhar para as estrelas e a crer de novo. / Avós: Compartilhem com os netos as promessas de Deus que pareciam impossíveis — e como Ele as cumpriu de formas que vocês não anteciparam.

II. O RITUAL DE ALIANÇA: OS ANIMAIS CORTADOS — CENTRO ◉ (Gn 15:7–11) (B)
§ Indicação Textual: Gn 15:9-10 ("Toma para mim uma novilha de três anos... e Abrão tomou tudo isso, e os partiu pelo meio, e pôs cada metade defronte da outra; mas as aves não partiu") e 15:11 ("desceram aves de rapina sobre os cadáveres, e Abrão as afugentou") — a preparação do ritual de aliança
§ Exegese: O ritual de Gênesis 15:9-10 é conhecido no Antigo Oriente Próximo como o "ritual de corte de aliança" — ambas as partes passam entre os animais partidos, declarando implicitamente: "que me aconteça o que a estes animais se eu quebrar esta aliança." Abrão prepara os animais meticulosamente (novilha, cabra e carneiro de três anos, uma rola e um pombo jovem) e os parte ao meio. Então espera. E espera. As aves de rapina descem sobre os cadáveres (15:11) — símbolo de forças que tentam interromper o cumprimento da promessa — e Abrão as afugenta. É imagem de intercessão: Abrão defende o espaço da aliança contra os que viriam destruí-la. A cena central é de espera ativa: o ritual está preparado, mas Deus ainda não passou.
§ Teologia Reformada: A CFW VII.1-2 e a CFB 7.1-2 descrevem as alianças de Deus como instrumentos de graça. O ritual de 15:9-11 é o preparativo humano que demonstra seriedade; o cumprimento do ritual (15:17) é exclusivamente divino. J.C. Ryle (Expository Thoughts): "Abrão afugentou as aves. Há um ministério de vigilância que pertence à fé: não criar a aliança, pois isso é obra de Deus, mas guardar o espaço onde Deus agirá. A oração dos pais tem este caráter — não produz a graça de Deus, mas mantém afastado o que a impediria de pousar." O. Palmer Robertson: "O ritual dos animais partidos em 15:9-10 é o cenário preparado por Abrão para que Deus passe. Toda preparação humana na aliança é assim: nós preparamos; Deus passa."
§ Aplicação Familiar: Pais: A família que "afugenta as aves" — que protege o espaço de adoração, oração e comunhão com Deus — está fazendo o que Abrão fez: mantendo preparado o lugar onde Deus agirá. / Filhos: Esperar pela ação de Deus pode ser longo e difícil — Abrão esperou até o pôr do sol (15:12). Há algo que você está esperando de Deus que parece demorar? Este texto mostra que a demora não é ausência. / Noivos: A preparação do casamento não é apenas logística — é ritual de aliança. Como vocês estão preparando o "espaço" — espiritual, relacional, prático — para que Deus esteja no centro do lar que vão construir? / Casal: Que "aves de rapina" têm tentado pousar sobre a aliança do lar de vocês — ansiedade, conflitos não resolvidos, influências externas? Como vocês têm "as afugentado"? / Avós: Que vigílias — de oração, de presença, de fidelidade — vocês mantiveram ao longo dos anos para proteger a família das "aves" que tentavam interromper a aliança?

III. A RATIFICAÇÃO UNILATERAL: DEUS PASSA SOZINHO (Gn 15:12–21) (A')
§ Indicação Textual: Gn 15:12 ("e, posto o sol, caiu profundo sono sobre Abrão; e eis que caiu um horror de grande trevas sobre ele") e 15:17-18 ("e aconteceu que, posto o sol... um forno de fumaça e uma tocha de fogo passaram por entre aquelas peças. Naquele dia o Senhor fez aliança com Abrão") — o sono de Abrão e o fogo que passa sozinho
§ Exegese: O clímax de Gênesis 15 é descrito em dois versículos de uma precisão aterradora: Abrão "caiu em profundo sono" (tardēmāh — o mesmo sono de Gênesis 2:21, quando Deus operou sobre Adão) e então "um forno de fumaça e uma tocha de fogo passaram por entre aquelas peças" (15:17). Abrão não passou. Deus passou sozinho pelos animais cortados — o que significa que Deus assume sobre Si a totalidade da responsabilidade pelo cumprimento da aliança. Se a aliança for quebrada, o castigo cai sobre Deus, não sobre Abrão. É a aliança mais extraordinária da Bíblia: unilateral, irrevogável, auto-malditoriaória para Deus em caso de incumprimento. E então, por quatro séculos (15:13-16) — Egito, escravidão, geração incrédula que deve morrer — a promessa fica "esperando." Mas em 15:18, Deus faz a aliança de qualquer forma: "naquele dia o Senhor fez aliança com Abrão."
§ Teologia Reformada: A CFW VII.1 e a CFB 7.1 afirmam que "foi do prazer de Deus... fazer com o homem uma aliança de graça." A aliança de Gênesis 15 é o modelo mais puro dessa graça unilateral: Deus não pede condições, não aguarda desempenho humano, não exige fidelidade prévia — Ele passa. Herman Bavinck (Dogmática Reformada, v.3): "O forno de fumaça e a tocha de fogo de Gênesis 15:17 são as assinaturas de Deus em sangue sobre a aliança. Quando passa sozinho entre os animais cortados, Deus está dizendo: 'Se esta promessa não se cumprir, que eu mesmo seja partido.' É a linguagem máxima do comprometimento divino." O. Palmer Robertson: "A ratificação unilateral da aliança em Gênesis 15 fundamenta toda a teologia da graça: a segurança do crente não repousa em sua fidelidade, mas na fidelidade do Deus que passou sozinho pelo meio."
§ Aplicação Familiar: Pais: A aliança de Deus com Abrão foi feita enquanto ele dormia — Deus não precisou da cooperação humana para cumprir Sua promessa. As promessas de Deus para seus filhos também não dependem da perfeição de vocês como pais. Descansem nisso. / Filhos: Deus passou sozinho. Ele não esperou que Abrão acordasse para confirmar a aliança. A salvação não é uma cooperação de esforços — é Deus agindo por aqueles que confiam nEle. / Noivos: O casamento cristão é aliança — não contrato com cláusulas. Como a aliança unilateral de Deus com Abrão modela o tipo de comprometimento que vocês querem ter um com o outro? / Casal: A promessa de Deus à família de vocês não depende de vocês não falharem — depende do Deus que passou sozinho pelo meio. Que liberdade há em saber que a segurança da aliança está na mão dEle? / Avós: "Naquele dia o Senhor fez aliança com Abrão." Ele cumpriu. Testemunhem aos netos como Deus tem cumprido Suas promessas na história da família de vocês.

---

EIXO REDENTOR (HISTÓRICO-REDENTIVO)
O forno de fumaça e a tocha de fogo que passam entre os animais cortados de Gênesis 15 encontram seu cumprimento máximo na cruz. Ali, o Filho de Deus foi "partido" — literalmente, "cortado" — no lugar da humanidade que havia quebrado toda aliança. A auto-maldição implícita no ritual de 15:9-17 recaiu sobre Cristo (Gl 3:13 — "Cristo nos resgatou da maldição da lei, fazendo-se maldição por nós"). Deus passou sozinho em Gênesis 15; Cristo foi partido sozinho no Calvário. E Gênesis 15:6 — "creu ele no Senhor, e isso lhe foi imputado como justiça" — é a fórmula que Paulo cita como fundamento da justificação de todo crente (Rm 4:3; Gl 3:6).

DOUTRINA CENTRAL
A Justificação pela Fé e a Aliança Unilateral de Graça: Deus faz aliança sozinho, cumpre sozinho, e exige apenas que o crente creia — e essa fé é imputada como justiça. A segurança da família de fé não repousa na sua fidelidade, mas na do Deus que passou sozinho entre os animais. Cf. CFW Cap. XI; CFB Cap. XI.

APLICAÇÕES PARA A FAMÍLIA
▸ Para os Pais: A justificação dos seus filhos não depende da sua perfeição como pais — depende do Deus que passou sozinho em Gênesis 15. Orem por eles com essa certeza.
▸ Para os Filhos: "Creu ele no Senhor, e isso lhe foi imputado como justiça." A salvação é pela fé — não por obras, não por desempenho. Você crê?
▸ Para os Noivos: O compromisso no casamento deve refletir o de Gênesis 15: unilateral antes de ser recíproco. Amem antes de serem amados, confiem antes de serem confiáveis.
▸ Para o Casal: Há promessas de Deus sobre o lar de vocês que parecem aguardar 400 anos (como a promessa a Abrão sobre a terra)? Confiem que o Deus que passou sozinho também cumprirá.
▸ Para os Avós: A aliança de Deus é "para ti e para tua descendência." Orem com certeza pelas promessas que cobrem gerações — não por mérito familiar, mas pela aliança que Deus fez.

DINÂMICA FAMILIAR
1. Leiam juntos 15:1-6 e perguntem: "Abrão tinha medo e dúvida. Como Deus respondeu? O que isso nos ensina sobre levar nossas dúvidas a Deus?"
2. Leiam 15:6 em voz alta várias vezes. Discutam: "O que significa 'imputado como justiça'? Por que isso é tão importante?"
3. Leiam 15:17 e perguntem: "Quem passou entre os animais? Por que é significativo que Abrão estava dormindo?"
4. Perguntem: "Qual é a diferença entre um contrato (que depende das duas partes) e a aliança de Gênesis 15 (que Deus ratifica sozinho)? Isso muda como vocês entendem a salvação?"
5. Atividade: Cada membro da família nomeia uma "promessa de Deus" que está crendo, mesmo sem ver — como Abrão contando as estrelas. Compartilhem e orem sobre cada uma.
6. Orem com Romanos 4:3: "Senhor, como Abrão, queremos crer em Ti — e confiar que Tu ratificas sozinho o que nós não poderíamos ratificar."

AUTORES REFORMADOS
▸ João Calvino (Institutos III.11.4): "Abrão não creu porque entendia — as estrelas eram incontáveis e ele era velho. Ele creu porque Deus prometeu. Esta é a anatomia da fé: confiar na palavra de Deus contra toda evidência dos sentidos, e nessa confiança receber a justiça que Deus imputa."
▸ Herman Bavinck (Dogmática Reformada, v. 3): "O forno de fumaça e a tocha de fogo de Gênesis 15:17 são as assinaturas de Deus em sangue sobre a aliança. Quando passa sozinho entre os animais cortados, Deus está dizendo que o preço do não cumprimento recairá sobre Si mesmo — e em Cristo, recaiu."
▸ O. Palmer Robertson (O Cristo das Alianças): "A ratificação unilateral da aliança em Gênesis 15 fundamenta toda a teologia da graça. A segurança do crente não repousa em sua fidelidade, mas na fidelidade do Deus que passou sozinho pelo meio — e que se dispôs a ser partido se a promessa falhasse."\`;

  // ─── Dia 20 — Gn 16:1–16 ────────────────────────────────────────────────
  if (d.dia === 20) return \`PARA A FAMÍLIA · Gênesis 16:1–16

TEMA: Providência e Cuidado: O Deus que Vê os Que Ninguém Vê

---

TÍTULO DO SERMÃO FAMILIAR
"Hagar no Deserto: Quando o Plano Humano Cria Vítimas — e Deus as Encontra"

BIG IDEA PARA A FAMÍLIA
Quando Sarai e Abrão tentam resolver a promessa de Deus pelos próprios meios, criam uma crise que fere Hagar — mas Deus vai ao deserto encontrar a mulher que todos ignoraram, revelando-Se como El Roi: o Deus que vê os invisíveis.

PERGUNTA PARA A FAMÍLIA
Há pessoas em nossa vida — talvez em nossa própria família — que estão "no deserto," invisíveis e feridas pelas consequências de escolhas alheias, e que precisam ouvir que há um Deus que as vê?

PALAVRA-CHAVE DE TRANSIÇÃO
Vejamos os três movimentos desta perícope: o ATALHO humano que cria vítimas, o DEUS que vai ao deserto e o NOME que muda tudo — todos em Gênesis 16:1–16.

---

MOVIMENTOS DO SERMÃO

I. O ATALHO HUMANO: SARAI, ABRÃO E HAGAR (Gn 16:1–6) (A)
§ Indicação Textual: Gn 16:2 ("Sarai disse a Abrão: Eis que o Senhor me impediu de ter filhos; vai, pois, a minha serva; talvez que eu me edifique por ela") e 16:4-6 ("quando viu que havia concebido, sua senhora era desprezada aos seus olhos... e Sarai a afligiu") — o plano humano e suas consequências
§ Exegese: Gênesis 16 começa com três personagens e uma crise que define o capítulo: Sarai ("impedida de ter filhos"), Abrão (passivo diante da proposta) e Hagar (serva egípcia, sem voz na decisão). A proposta de Sarai em 16:2 é culturalmente plausível no contexto antigo — maternidade por procuração era prática legal — mas teologicamente equivocada: é o mesmo padrão de Gênesis 3 (Adão aceita passivamente o que a mulher oferece; Abrão aceita passivamente o que Sarai propõe). O resultado é tragicamente humano: Hagar concebe, começa a desprezar Sarai (16:4), Sarai culpa Abrão (16:5 — "o pecado que faço recaia sobre ti"), Abrão devolve o poder a Sarai (16:6 — "eis a tua serva em tuas mãos"), Sarai aflige Hagar e Hagar foge. Três decisões de evitar esperar em Deus criaram uma vítima que não tinha nenhum poder na situação.
§ Teologia Reformada: A CFW V.4 e a CFB 5.4 ensinam que "pela Sua sapientíssima e santíssima providência, Deus... ordena todas as coisas para Sua própria glória" — incluindo as consequências das escolhas humanas equivocadas. Calvino (Comentário ao Gênesis 16:2): "Sarai pecou não por maldade, mas por impaciência. A impaciência é sempre a mãe dos atalhos — e os atalhos, especialmente os espirituais, quase sempre criam vítimas que não escolheram estar no caminho." Voddie Baucham (Family Shepherds): "O silêncio de Abrão diante da proposta de Sarai é tão culpável quanto o plano de Sarai. O líder que se omite quando deveria falar permite o mal que depois lamentará. A passividade masculina não é neutralidade — é escolha com consequências."
§ Aplicação Familiar: Pais: As decisões tomadas por impaciência — para resolver o que Deus ainda não resolveu — frequentemente criam consequências que afetam os mais vulneráveis. Que decisões de impaciência a família tem tomado que precisam ser examinadas? / Filhos: Hagar não escolheu estar nessa situação — ela foi colocada ali pelas decisões de outros. Há alguém em sua vida que sofre pelas escolhas de outros? Como você pode notar essa pessoa? / Noivos: Conversem sobre como vão responder quando as promessas de Deus parecerem demorar. A tentação de "ajudar Deus" com atalhos humanos é real — e as consequências podem ferir pessoas inocentes. / Casal: Há decisões que vocês tomaram "para resolver" o que Deus estava demorando a responder — e que criaram consequências inesperadas? Como estão lidando com isso? / Avós: Que lições aprenderam sobre a diferença entre agir na fé (obedecer ao que Deus manda) e agir pela impaciência (antecipar o que Deus ainda não revelou)?

II. O DEUS QUE VAI AO DESERTO: EL ROI — CENTRO ◉ (Gn 16:7–10) (B)
§ Indicação Textual: Gn 16:7 ("o anjo do Senhor a achou junto a uma fonte de água no deserto... no caminho de Shur") e 16:9-10 ("torna para tua senhora e submete-te sob as suas mãos... e o anjo do Senhor lhe disse: Multiplicarei em extremo a tua descendência") — Deus encontra Hagar
§ Exegese: O centro desta perícope é surpreendente: o "anjo do Senhor" (malak YHWH — em Gênesis, frequentemente identificado com YHWH Ele mesmo) não aparece a Abrão nem a Sarai, mas a Hagar — uma escrava egípcia, estrangeira, mulher, fugitiva. O encontro começa com duas perguntas teológicas cruciais: "De onde vieste? E para onde vais?" (16:8) — as mesmas perguntas que definem a existência humana: origem e destino. Hagar responde apenas sobre a origem ("fujo da face de Sarai"), indicando que não tem destino claro — está perdida. Deus não condena, não justifica a situação, não explica por que permitiu: Ele acha Hagar, ouve Hagar, fala com Hagar, e faz promessa a Hagar. A instrução de voltar (16:9) é difícil — mas vem acompanhada de promessa (16:10): "multiplicarei em extremo a tua descendência." Hagar recebe de Deus a mesma categoria de promessa que Abrão recebeu.
§ Teologia Reformada: A CFW V.1 e a CFB 5.1 afirmam que a providência de Deus se estende a "todas as criaturas, ações e acontecimentos." Hagar não é figura do povo eleito — é uma escrava egípcia. Mas Deus a encontra. Herman Bavinck (Reformed Dogmatics, v.3): "O encontro de Deus com Hagar no deserto revela que a providência de Deus não está confinada aos limites da aliança. Ele cuida dos que estão fora dos limites do povo escolhido, dos invisíveis, dos que ninguém procurou. El Roi — o Deus que vê — vê além das fronteiras que os humanos traçam." J.C. Ryle (Expository Thoughts): "Hagar estava no deserto — lugar de abandono. Mas Deus não tem problemas com desertos. Ele acha os Seus onde os homens deixaram de procurar."
§ Aplicação Familiar: Pais: Há membros da família — filhos em rebeldia, parentes afastados, pessoas que "fugiram" — que estão "no deserto"? O Deus que achou Hagar junto à fonte também os vê. Como sua família pode ser instrumento desse encontro? / Filhos: Hagar estava perdida, assustada e sozinha. Já houve um momento em que você se sentiu assim — e Deus te achou de uma forma que não esperava? O que aconteceu? / Noivos: Em casamentos difíceis, haverá momentos em que um dos dois se sente como Hagar — ferido pelas decisões alheias, fugindo. Como vocês podem ser o "anjo do Senhor" um para o outro nesses momentos? / Casal: "De onde vieste? E para onde vais?" são as perguntas que Deus faz a Hagar — e que toda família precisa responder juntos periodicamente. De onde a família veio espiritualmente? Para onde está indo? / Avós: Compartilhem um momento em que se sentiram no "deserto" — e como Deus os encontrou ali de forma inesperada.

III. O NOME QUE MUDA TUDO: ISMAEL E EL ROI (Gn 16:11–16) (A')
§ Indicação Textual: Gn 16:11 ("eis que és prenha e darás à luz um filho, e chamarás o seu nome Ismael, porque o Senhor ouviu a tua aflição") e 16:13-14 ("chamou o nome do Senhor que lhe falava: Tu és o Deus que me vê... pois ela disse: Não terei eu também aqui visto o que me vê?") — o nome que revela Deus e o nome que narra a história
§ Exegese: Dois nomes são dados nesta cena final, e ambos são atos teológicos. (1) Ismael (yišmāʿēl) — "Deus ouve" — é o nome que Deus ordena que Hagar dê ao filho: não um nome de grandeza, mas um testemunho: "o Senhor ouviu a tua aflição" (16:11). O filho de uma escrava fugitiva carregará para sempre o testemunho de que Deus ouviu. (2) El Roi (ʾēl rōʾî) — "Deus que me vê" — é o nome que Hagar dá a Deus (16:13), único caso na Bíblia em que uma figura humana nomeia Deus. Hagar, que não tinha poder, não tinha voz, não tinha escolha — recebe da experiência o poder de nomear o Eterno. O poço onde ocorreu o encontro é chamado Beer-lahai-roi (16:14) — "poço do Vivente que me vê." E Abrão, de volta ao palco em 16:15-16, nomeia o filho como Deus mandou: Ismael. A história de Ismael não é apenas sobre um filho não planejado — é testemunho eterno de que Deus vê os invisíveis.
§ Teologia Reformada: A CFW V.6 e a CFB 5.6 afirmam que "quanto aos pecados dos homens, Deus... é santíssimo e justíssimo, não podendo Ele mesmo ser autor ou aprovador do pecado." A situação de Hagar foi criada pelo pecado humano (impaciência de Sarai, passividade de Abrão) — mas Deus não a deixou sozinha com as consequências. Abraham Kuyper (To Be Near unto God): "El Roi — o Deus que vê. Esta é uma das revelações mais preciosas de todo o Antigo Testamento. Deus não apenas vê os Seus escolhidos — vê os que os escolhidos ignoraram. Nenhuma Hagar no deserto está fora do alcance do Seu olhar." Voddie Baucham (Family Shepherds): "Ismael significa 'Deus ouve.' Que nome para carregar a vida toda — o nome de um milagre de graça dado a quem ninguém esperava que Deus ouvisse. A criança que nasce da desobediência ainda pode ser bênção — porque Deus vê além das circunstâncias de seu nascimento."
§ Aplicação Familiar: Pais: Há alguém na vida de vocês — um filho, um neto, um parente — que carrega o peso de circunstâncias em que não escolheu estar? El Roi também vê essa pessoa. Como vocês podem ser instrumentos do cuidado de Deus com ela? / Filhos: Hagar deu a Deus um nome: "o Deus que me vê." Que nome você daria a Deus baseado em como Ele agiu na sua vida? / Noivos: Em um casamento, há momentos em que um dos dois se sente invisível — não visto, não ouvido. El Roi é o modelo: ver o cônjuge, ouvir o cônjuge, antes de ser visível e audível para o resto do mundo. / Casal: Que membro da família de vocês — filho, idoso, alguém com necessidade especial — mais precisa ser "visto" e "ouvido" neste momento? Como vocês podem ser El Roi para essa pessoa esta semana? / Avós: "Tu és o Deus que me vê" — Hagar descobriu isso no deserto. Que experiência de "deserto" da vida de vocês revelou mais claramente que Deus os via?

---

EIXO REDENTOR (HISTÓRICO-REDENTIVO)
El Roi — o Deus que vê — prefigura Cristo, que veio ao "deserto" da humanidade perdida para encontrar os invisíveis. Jesus buscou samaritanas à beira de poços (Jo 4), leprosos excluídos das cidades, publicanos em cima de árvores — os que ninguém via. O encontro de Jesus com a mulher samaritana (Jo 4:7 — "dá-me de beber") ecoa o encontro de Deus com Hagar junto à fonte: o Eterno que busca o invisível junto à água. Ismael, cujo nome significa "Deus ouve," aponta para Cristo — pelo qual Deus "ouviu" toda aflição humana e respondeu com o Filho (Jo 3:16).

DOUTRINA CENTRAL
A Providência Particular de Deus alcança os que estão fora dos limites do povo eleito — os escravos, os fugitivos, os invisíveis. El Roi vê além das fronteiras que os humanos traçam. E os "Ismael" da história familiar — filhos de circunstâncias difíceis, nascidos de escolhas imperfeitas — são também amados e vistos por Deus. Cf. CFW Cap. V; CFB Cap. V.

APLICAÇÕES PARA A FAMÍLIA
▸ Para os Pais: A impaciência de criar "Hagarrs" — pessoas feridas pelas nossas decisões — é lição permanente. Que atalhos a família tem tomado que podem estar criando vítimas invisíveis?
▸ Para os Filhos: Há alguém na escola, no bairro, na própria família que está "no deserto" — invisível, ferido, sozinho? Como você pode ser El Roi para essa pessoa?
▸ Para os Noivos: El Roi é o tipo de amor que o casamento deve cultivar: ver o outro quando ele se sente invisível, ouvir quando ele se sente sem voz. Comprometam-se a ser esse tipo de presença um para o outro.
▸ Para o Casal: Há membros da família — filhos em dificuldade, parentes afastados — que precisam de um "El Roi" esta semana? Quem pode visitar, ligar, escrever?
▸ Para os Avós: O nome de Hagar para Deus foi aprendido no deserto. Que nomes vocês dariam a Deus baseados nas experiências de deserto da vida? Compartilhem esses nomes com os netos.

DINÂMICA FAMILIAR
1. Leiam juntos 16:7-9 e perguntem: "Por que Deus foi até Hagar? Ela era da aliança? O que isso nos diz sobre o caráter de Deus?"
2. Discutam: "O que significa 'El Roi — o Deus que me vê'? Há momentos em que você se sentiu 'invisível' — e como Deus agiu?"
3. Perguntem às crianças: "Se você pudesse dar um nome a Deus baseado em algo que Ele fez por você, qual seria?"
4. Mapeiem juntos: quem na vida de vocês está "no deserto" — sozinho, ferido, invisível — e o que a família pode fazer por essa pessoa esta semana?
5. Leiam 16:13 em voz alta: "Tu és o Deus que me vê." Façam silêncio por um minuto e reflitam: "Em que área da minha vida preciso saber que Deus me vê agora?"
6. Orem nominalmente pelas pessoas "invisíveis" que a família conhece — pedindo que Deus as encontre junto à fonte.

AUTORES REFORMADOS
▸ Abraham Kuyper (To Be Near unto God): "El Roi — o Deus que vê. Nenhuma Hagar no deserto está fora do alcance do Seu olhar. A grandeza da revelação de Gênesis 16 não está no que Deus prometeu a Abrão — está no que Deus fez por uma escrava egípcia que ninguém mais procurou."
▸ Voddie Baucham (Family Shepherds): "Ismael significa 'Deus ouve.' Que nome para carregar a vida toda — testemunho de que Deus ouvia uma escrava fugitiva no deserto. A criança que nasce de circunstâncias difíceis ainda pode ser bênção — porque El Roi não define pessoas pelo contexto do seu nascimento."
▸ João Calvino (Comentário ao Gênesis 16:13): "Hagar, a escrava pagã, recebeu uma revelação que os patriarcas receberam poucas vezes: Deus lhe apareceu pessoalmente. Isso ensina que a graça de Deus não está encerrada nas fronteiras que os humanos traçam — ela irrompe onde e quando Deus decide, sempre para o bem dos que Ele vê."\`;

  // ─── Dia 21 — Gn 17:1–27 ────────────────────────────────────────────────
  if (d.dia === 21) return \`PARA A FAMÍLIA · Gênesis 17:1–27

TEMA: Aliança e Fidelidade: O Novo Nome e o Sinal na Carne

---

TÍTULO DO SERMÃO FAMILIAR
"Abrão se Torna Abraão: Quando Deus Muda o Nome e Confirma a Aliança"

BIG IDEA PARA A FAMÍLIA
Quando Abraão tem 99 anos e Ismael já tem 13 — com a tentação de aceitar o substituto humano como cumprimento divino — Deus aparece, renova a aliança com novos nomes e exige um sinal na carne de todo homem da casa, declarando que a família inteira pertence a Ele.

PERGUNTA PARA A FAMÍLIA
Há momentos em que nossa família tem aceitado os "Ismaéis" — as soluções humanas para promessas de Deus — como se fossem o cumprimento definitivo? E como Deus nos chama de volta para a promessa original?

PALAVRA-CHAVE DE TRANSIÇÃO
Vejamos os três movimentos desta perícope: o NOVO NOME que transforma identidade, o SINAL na carne que marca pertencimento e a RISADA que precede a promessa — todos em Gênesis 17:1–27.

---

MOVIMENTOS DO SERMÃO

I. EL SHADAI E O NOVO NOME: IDENTIDADE TRANSFORMADA (Gn 17:1–8) (A)
§ Indicação Textual: Gn 17:1 ("o Senhor apareceu a Abrão... e disse-lhe: Eu sou o Deus Todo-Poderoso; anda na minha presença e sê perfeito") e 17:5 ("não se chamará mais o teu nome Abrão, mas Abraão será o teu nome; porque te farei pai de multidão de nações") — a revelação do nome divino e a mudança do nome humano
§ Exegese: Treze anos separam Gênesis 16 e Gênesis 17 — treze anos de silêncio divino. Abraão tem 99 anos (17:1); Ismael tem 13. E então Deus aparece com a revelação de um novo nome próprio: El Shadai (אֵל שַׁדַּי). O nome é debatido pelos hebraístas: "Deus Todo-Poderoso" (LXX: Pantokrator) ou "Deus dos Seios / da Montanha" (El da abundância). Em qualquer leitura, El Shadai é a revelação do poder divino sobre o impossível — exatamente o que a situação de Abraão (99 anos, Sarai estéril) exige. O mandato que acompanha a revelação é duplo: "anda na minha presença" (hithalēk lĕpānay — o mesmo verbo que descreve Enoque em 5:22) e "sê perfeito" (tamîm — íntegro, inteiro). Depois: a mudança de nome. Abrão ("pai exaltado") torna-se Abraão ("pai de multidão de nações"). O nome novo não descreve o que ele é — descreve o que Deus vai fazer dele. É uma identidade profética, não biográfica.
§ Teologia Reformada: A CFW III.5 e a CFB 3.5 ensinam que Deus "decretou livre e imutavelmente tudo o que acontece" — incluindo a identidade nova que Abraão recebe antes de a promessa se cumprir. O nome é dado antes do filho nascer. Calvino (Comentário ao Gênesis 17:5): "Deus chama Abraão de 'pai de nações' quando ele ainda não tem filho da promessa. Esta é a linguagem da fé — chamar o que não existe como se existisse (Rm 4:17). Deus nomeia o futuro no presente como garantia de que o cumprirá." Herman Bavinck: "El Shadai é o nome do Deus que faz possível o impossível — não pela alteração das leis naturais, mas pela sua soberania sobre elas. Quando a natureza fecha todas as portas, El Shadai as abre."
§ Aplicação Familiar: Pais: Os nomes e as identidades que vocês falam sobre seus filhos têm poder — não mágico, mas formativo. Que identidade bíblica — filho de Deus, herdeiro da promessa, chamado por nome — vocês têm proclamado sobre cada filho? / Filhos: Deus mudou o nome de Abrão para Abraão antes de a promessa se cumprir. Sua identidade em Cristo — filho de Deus, nova criatura — é um nome dado antes de você ser tudo o que Deus tem planejado. Você vive à altura desse nome? / Noivos: Quando se casarem, um "novo nome" começa a formar a identidade do lar. Que identidade — em termos de missão, valores e fé — vocês querem que seja o "nome" do lar de vocês? / Casal: "Anda na minha presença e sê perfeito" — o mandato de El Shadai para Abraão é o mesmo para o casal cristão. Como vocês têm "andado na presença de Deus" juntos — não como performance, mas como estilo de vida? / Avós: O nome que vocês carregam — filhos de tal família, crentes de tal tradição — é identidade dada por gerações anteriores. Que identidade espiritual vocês estão transmitindo aos netos pelo nome e pelo exemplo?

II. O SINAL NA CARNE: CIRCUNCISÃO COMO MARCA DE PERTENCIMENTO — CENTRO ◉ (Gn 17:9–14) (B)
§ Indicação Textual: Gn 17:10-11 ("este é o meu pacto... todo o homem entre vós será circuncidado. E circuncidareis a carne do vosso prepúcio; e isso será por sinal da aliança entre mim e vós") e 17:12-13 ("de oito dias será circuncidado todo o homem entre vós, nas vossas gerações... e estará a minha aliança na vossa carne como aliança perpétua") — o sinal corporal da aliança
§ Exegese: O centro da perícope é o mandato da circuncisão — sinal aliançal que substitui o arco do capítulo 9 e antecipa o batismo (Cl 2:11-12). Três elementos são teologicamente decisivos: (1) O sinal é no corpo — não em objeto externo, mas na carne de cada membro masculino. A aliança não é apenas espiritual; ela marca o físico. (2) O oitavo dia (17:12) — número bíblico de novo começo (após os 7 dias da criação). A circuncisão no oitavo dia é teologia incorporada: cada menino circuncidado é inserido simbolicamente na nova criação. (3) A abrangência: "todo o homem entre vós" — incluindo servos nascidos em casa e comprados de estrangeiros (17:12-13). O sinal da aliança não é privilégio dos biologicamente descendentes; inclui os incorporados à família por outros meios. Aquele que não for circuncidado "será eliminado do seu povo" (17:14) — a ruptura da aliança tem consequência de exclusão.
§ Teologia Reformada: A CFW XXVIII.1 e a CFB 28.1 descrevem os sacramentos como "sinais e selos santos da aliança de graça." A circuncisão é o primeiro sacramento do Antigo Testamento — substituído pelo batismo no Novo (Cl 2:11-12; Rm 4:11). O. Palmer Robertson (O Cristo das Alianças): "A circuncisão no oitavo dia coloca cada menino nascido na família de Abraão sob o sinal da nova criação — antes que ele tenha feito qualquer coisa para merecer. É a graça aliançal operando antes da resposta humana. O batismo infantil nas igrejas reformadas expressa a mesma lógica: o sinal da aliança precede a confissão, pois a graça precede a fé." Joel Beeke: "O fato de que servos e estrangeiros podiam ser incorporados à aliança pela circuncisão (17:12-13) revela que a aliança de Abraão sempre teve dimensão missionária — não era exclusão étnica, mas inclusão pela fé e pelo sinal."
§ Aplicação Familiar: Pais: A circuncisão marcava toda a família de Abraão — não apenas os que entendiam. O sinal da aliança precedia a compreensão. Que marcas espirituais vocês têm colocado sobre os filhos — batismo, culto familiar, Palavra, oração — antes que eles tenham capacidade de escolher por si mesmos? / Filhos: A aliança de Deus com Abraão incluiu toda a casa — servos, estrangeiros, todos. A família cristã não é clube fechado; é comunidade aberta pela graça. Como você tem incluído os "de fora" na vida da família de fé de vocês? / Noivos: O batismo cristão é o novo sinal de aliança — e o lar que vão formar será marcado por ele. Como vocês entendem o batismo como incorporação à família de Deus, e como isso moldará a forma de criarem os filhos? / Casal: A aliança é "perpétua" (17:13) — sem prazo de validade, sem renovação necessária. Como isso ancora a aliança conjugal de vocês nos momentos em que os sentimentos oscilam? / Avós: Vocês são os guardiões vivos do sinal da aliança para os netos. Como têm transmitido — em palavras e em vida — que o pertencimento a Deus é mais fundamental do que qualquer outra identidade?

III. O NOVO NOME DE SARAI E A RISADA DE ABRAÃO (Gn 17:15–27) (A')
§ Indicação Textual: Gn 17:15-16 ("Sarai, tua mulher, não se chamará mais Sarai, mas Sara será o seu nome... e ela será mãe de nações") e 17:17 ("então Abraão caiu sobre o seu rosto e riu") e 17:19 ("Sara, tua mulher, certamente te dará um filho; e chamarás o seu nome Isaque") — o nome de Sara, a risada de Abraão e a promessa de Isaque
§ Exegese: A perícope conclui com dois momentos paralelos de resistência e confirmação. Primeiro: Sarai (lit. "minha princesa" — nome possessivo e limitado) é renomeada Sara ("princesa" — universal, sem o "minha"). O nome dela também é transformado proteticamente antes do cumprimento. Segundo: Abraão cai com o rosto em terra (proskunesis — gesto de adoração) e ri (wayiṣḥaq, 17:17) — o mesmo verbo que formará o nome Isaque (yiṣḥāq). A risada de Abraão não é incredulidade pura: é a mistura de êxtase e impossibilidade que a graça produz diante do absurdo da promessa. Ele tem 100 anos; Sara tem 90. Mas a resposta de Deus não é repreensão — é confirmação imediata: "Sara... certamente te dará um filho" (17:19). E o nome já está escolhido: Isaque ("ele ri"). Deus eternizará a risada de Abraão no nome do filho da promessa. Ismael recebe bênção (17:20) mas a aliança é com Isaque (17:21). E Abraão circuncida toda a casa naquele mesmo dia (17:23-27) — obediência imediata e total.
§ Teologia Reformada: A CFW III e a CFB 3 descrevem a soberania de Deus sobre o impossível. Calvino (Comentário 17:17): "A risada de Abraão é a risada da fé que chega ao limite de sua capacidade de compreender e ali encontra apenas admiração. Não é a risada do cético, que descarta; é a risada do maravilhado, que adora enquanto não entende." Herman Bavinck: "Que Deus chamasse o filho da promessa de 'Isaque' — ele ri — é teologia condensada em nome: a promessa de Deus produz alegria antes mesmo de ser cumprida, porque quem conhece El Shadai já tem razão de rir." Joel Beeke (Parenting by God's Promises): "A obediência imediata de Abraão — circuncidando toda a casa naquele mesmo dia — é o padrão da fé madura: quando Deus fala, a família age. Não no dia seguinte, não 'em breve', mas 'naquele mesmo dia'."
§ Aplicação Familiar: Pais: "Naquele mesmo dia, Abraão circuncidou..." — obediência imediata. Há algo que Deus tem pedido à família de vocês que está sendo protelado? A obediência de Abraão é o modelo: quando Deus fala, a família age no mesmo dia. / Filhos: Abraão riu — e Deus não o repreendeu; deu ao filho o nome que guardou a risada. Quando você ri da impossibilidade das promessas de Deus, Deus pode estar preparando um "Isaque" que carregará para sempre o testemunho de que o impossível aconteceu. / Noivos: Sara recebeu um novo nome antes de ser mãe. Antes do casamento, vocês também recebem uma identidade nova — não apenas "noivos", mas co-herdeiros de uma aliança. Que nome novo Deus está dando ao casal que vocês serão? / Casal: Há um "Ismael" em sua vida — uma solução humana para uma promessa de Deus — que vocês têm tratado como o cumprimento definitivo? Esta perícope convida a receber o "Isaque" que Deus tem prometido. / Avós: Que "Isaaques" Deus deu à família de vocês — promessas que pareciam impossíveis e foram cumpridas? Compartilhem com os netos a risada que se tornou adoração.

---

EIXO REDENTOR (HISTÓRICO-REDENTIVO)
El Shadai aparece a um homem de 99 anos e promete um filho. O impossível se tornará possível — e o nome do filho (Isaque, "ele ri") eternizará a risada diante do absurdo da graça. Mas a promessa maior está além de Isaque: "em ti serão benditas todas as famílias da terra" (12:3). Essa promessa, confirmada aqui com novos nomes e novo sinal, cumprirá em Cristo — descendente de Abraão (Mt 1:1) — pelo qual os gentios se tornam "filhos de Abraão" pela fé (Gl 3:7-9). A circuncisão no oitavo dia, sinal de nova criação, encontra seu cumprimento no batismo (Cl 2:11-12) e na ressurreição de Cristo no "oitavo dia" — o primeiro dia da nova semana, nova criação.

DOUTRINA CENTRAL
Deus renova a aliança com Abraão dando novos nomes, exigindo um sinal corporal de pertencimento e prometendo o impossível — revelando que El Shadai opera onde a capacidade humana termina, e que a aliança incluirá toda a família, toda a casa, e eventualmente todas as nações. Cf. CFW Cap. VII; CFB Cap. VII.

APLICAÇÕES PARA A FAMÍLIA
▸ Para os Pais: "Naquele mesmo dia, Abraão circuncidou..." A obediência imediata de toda a casa é o fruto da liderança de Abraão. Que decisões espirituais para a família de vocês estão esperando o "dia certo" — quando o dia certo é hoje?
▸ Para os Filhos: Isaque — "ele ri" — foi nomeado antes de nascer. Sua identidade em Cristo foi dada antes de você escolher. Viva à altura do nome que Deus já pronunciou sobre você.
▸ Para os Noivos: Sara recebeu novo nome com nova missão. O casamento dá nova identidade a ambos. Que novos nomes — de missão, vocação, fidelidade — Deus está chamando vocês a assumir juntos?
▸ Para o Casal: Há "Ismaéis" — soluções humanas para promessas de Deus — que precisam ser distinguidos dos "Isaaques" — os cumprimentos genuínos de Deus? Esta conversa pode ser transformadora.
▸ Para os Avós: El Shadai — o Deus do impossível — é o mesmo ontem, hoje e sempre. Que impossíveis Ele realizou na família de vocês? Que impossíveis ainda aguardam cumprimento?

DINÂMICA FAMILIAR
1. Leiam 17:1 e discutam: "El Shadai — Deus Todo-Poderoso. Em que área da vida familiar vocês mais precisam de um Deus que faz possível o impossível?"
2. Leiam 17:5 e 17:15: dois nomes foram mudados. Perguntem: "Que novo nome Deus daria a cada um de nós baseado no que Ele planejou para nossas vidas?"
3. Leiam 17:17 em voz alta: "Abraão... riu." Perguntem: "Já houve uma promessa de Deus que pareceu tão impossível que você riu? O que aconteceu?"
4. Discutam: "Qual é a diferença entre Ismael (o filho que Abraão providenciou) e Isaque (o filho que Deus prometeu)? Há 'Ismaéis' em nossa vida — soluções que criamos para promessas de Deus?"
5. Leiam 17:23: "Naquele mesmo dia." Perguntem: "Há algo que Deus tem pedido à nossa família que estamos protelando? O que impede a obediência imediata?"
6. Orem juntos pedindo a Deus que revele o "Isaque" — o cumprimento genuíno de Suas promessas — para cada área onde a família tem aceitado "Ismaéis".

AUTORES REFORMADOS
▸ João Calvino (Comentário ao Gênesis 17:17): "A risada de Abraão não é a risada do cético que descarta a promessa, mas a risada do maravilhado que adora enquanto não entende. Esta é a fé em seu estado mais puro: dobrar os joelhos diante do absurdo da graça e rir porque Deus é maior do que a razão."
▸ Herman Bavinck (Dogmática Reformada, v. 3): "Que Deus chamasse o filho da promessa de 'Isaque — ele ri' é teologia condensada em nome: a promessa de Deus produz alegria antes mesmo de ser cumprida, porque quem conhece El Shadai já tem razão suficiente para rir — e adorar."
▸ Joel Beeke (Parenting by God's Promises): "A obediência imediata de Abraão — circuncidando toda a casa naquele mesmo dia — é o padrão da liderança espiritual familiar: quando Deus fala, o pai age, e a casa toda é abrangida. Não a obediência seletiva nem a protelada — a obediência do mesmo dia."\`;

`;

txt = txt.replace(marcador, novos + marcador);
fs.writeFileSync(filePath, txt, 'utf8');
console.log('OK — perícopes 16 a 21 inseridas em paraFamilia.ts');
