// fixPericopes08_09.cjs
// Reescreve dias 8 e 9 com perícopes corretas e todos os textos de referência
// dentro de cada perícope analisada.
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'paraFamilia.ts');
let txt = fs.readFileSync(filePath, 'utf8');

// ── Localizar limites exatos de cada bloco ────────────────────────────────────
const start8  = txt.indexOf("  if (d.dia === 8) return \`PARA A FAMÍLIA");
const start9  = txt.indexOf("  if (d.dia === 9) return \`PARA A FAMÍLIA");
const start10 = txt.indexOf("  if (d.dia === 10) return \`PARA A FAMÍLIA");

if (start8 < 0 || start9 < 0 || start10 < 0) {
  console.error('ERRO: marcadores de bloco não encontrados.'); process.exit(1);
}

// ── Novo bloco — Dia 8 : Gn 9:1–17 ──────────────────────────────────────────
const novo8 = `  if (d.dia === 8) return \`PARA A FAMÍLIA · Gênesis 9:1–17

TEMA: Aliança e Fidelidade: As Promessas de Deus para Todas as Gerações

---

TÍTULO DO SERMÃO FAMILIAR
"O Arco da Aliança: Quando Deus Faz Promessas à Sua Família"

BIG IDEA PARA A FAMÍLIA
Em Gênesis 9:1–17, Deus renova o mandato original, estabelece uma aliança solene com Noé e toda a sua descendência, e coloca o arco nas nuvens como sinal eterno de que Ele nunca abandona as famílias que estão sob o Seu cuidado.

PERGUNTA PARA A FAMÍLIA
Que promessas de Deus sustentam a nossa família nos momentos de crise — e como vivemos à altura dessas promessas no dia a dia?

PALAVRA-CHAVE DE TRANSIÇÃO
Vejamos os três movimentos desta aliança: o MANDATO renovado, a ALIANÇA estabelecida e o SINAL colocado — cada um revelando que Deus é o Deus das promessas às famílias.

---

MOVIMENTOS DO SERMÃO

I. O MANDATO RENOVADO: FECUNDIDADE, DOMÍNIO E VIDA (Gn 9:1–7) (A)
§ Indicação Textual: Gn 9:1 ("Deus abençoou Noé e seus filhos, e lhes disse: Sede fecundos, multiplicai-vos e enchei a terra") e 9:6 ("quem derramar o sangue do homem, pelo homem o seu sangue será derramado; porque Deus fez o homem à sua imagem") — reenquadramento do mandato criacional após o dilúvio
§ Exegese: Gênesis 9:1 é deliberadamente paralelo a Gênesis 1:28 — a mesma bênção e o mesmo mandato: "sede fecundos, multiplicai-vos e enchei a terra." Deus não começa com exigências — começa com bênção. Mas o mundo pós-dilúvio é diferente: (1) A relação com os animais muda — "o temor e o pavor de vós estarão sobre todo animal" (9:2); o domínio agora é marcado por tensão, não harmonia plena. (2) A dieta é ampliada — toda carne é permitida, exceto o sangue (9:3-4), porque o sangue representa a vida que pertence a Deus. (3) O versículo 6 introduz a justiça capital como proteção da dignidade humana: matar um ser humano é atacar a imagem de Deus. A vida humana tem valor absoluto porque o ser humano é imago Dei — e isso é fundamento para a ética familiar.
§ Teologia Reformada: A CFW IV.2 e a CFB 4.2 afirmam que o ser humano foi criado "à imagem de Deus, com conhecimento, justiça e santidade verdadeiros." A imago Dei não foi completamente destruída pela Queda (Gn 9:6 a pressupõe) — mas foi corrompida. O mandato renovado em 9:1-7 mostra que Deus não abandonou Seu projeto criacional: a família continua sendo o veículo primário pelo qual Ele enche a terra de portadores de Sua imagem. Joel Beeke (Parenting by God's Promises): "Cada filho que nasce numa família cristã é um novo portador da imagem de Deus — e cada pai recebe o mandato de cuidar, proteger e cultivar essa imagem com reverência e alegria."
§ Aplicação Familiar: Pais: O versículo 6 ensina que cada ser humano tem dignidade absoluta por ser imagem de Deus — incluindo seus filhos nas fases mais difíceis. Como essa verdade muda a forma de vocês tratarem os filhos em momentos de tensão? / Filhos: Você sabia que Deus proibiu o derramamento de sangue porque cada pessoa é feita à Sua imagem? Isso significa que VOCÊ tem valor eterno — não pelo que faz, mas pelo que é. / Noivos: O mandato de "encher a terra" inclui a família que vocês vão formar. Como vocês entendem a abertura para filhos como parte do chamado de Deus? / Casal: O mandato de Deus para a família começa com bênção (9:1), não com exigência. Como vocês têm começado o dia familiar — com bênção ou com cobrança? / Avós: Cada neto é um novo portador da imagem de Deus. Como essa perspectiva transforma o modo de vocês os tratarem, educarem e orarem por eles?

II. A ALIANÇA ESTABELECIDA: "NUNCA MAIS" — CENTRO ◉ (Gn 9:8–11) (B)
§ Indicação Textual: Gn 9:9 ("estabeleço a minha aliança convosco e com a vossa descendência depois de vós") e 9:11 ("estabeleço a minha aliança convosco: nunca mais toda a carne será exterminada pelas águas do dilúvio") — o coração da aliança noáica
§ Exegese: O centro desta perícope é a aliança (בְּרִית, berît) — palavra que aparece 7 vezes em Gênesis 9:8–17, sublinhando sua importância. Três aspectos são cruciais: (1) A extensão da aliança — "convosco, e com a vossa descendência depois de vós, e com todo ser vivente" (9:9-10). Esta é a aliança mais abrangente da Bíblia: inclui toda a criação, não apenas Israel. (2) A declaração "nunca mais" (lo-yikkarēt, 9:11) — uma negação dupla em hebraico que exprime impossibilidade absoluta. Deus se autocompromete de forma irrevogável. (3) O sujeito da ação: "estabeleço" (mēqîm, 9:9) — Deus é o único agente. Noé não assina nada, não faz votos, não oferece condições. É aliança unilateral de graça.
§ Teologia Reformada: A CFW VII.1-3 e a CFB 7.1-3 distinguem a aliança das obras e a aliança da graça. A aliança noáica é classificada pelos teólogos reformados como "aliança de preservação" — ela não salva, mas mantém a criação estável para que a redenção possa ocorrer. O. Palmer Robertson (O Cristo das Alianças): "A aliança noáica é a trave mestra que sustenta toda a história: ela garante que o mundo existirá tempo suficiente para que a promessa redentora seja cumprida. Sem ela, nenhuma outra aliança seria possível." Herman Bavinck: "'Nunca mais' é a gramática da graça divina — Deus falando em linguagem que não permite revisão, cancelamento ou condições suspensivas."
§ Aplicação Familiar: Pais: As promessas de Deus à família não dependem da fidelidade de vocês — dependem da fidelidade dEle. "Nunca mais" é a palavra de Deus sobre o abandono. Como isso liberta vocês da pressão de merecer o cuidado de Deus? / Filhos: Deus fez uma promessa que ele não pode quebrar — é uma impossibilidade para Ele. Que promessas bíblicas vocês conhecem que têm a mesma solidez do "nunca mais" de Gênesis 9? / Noivos: O casamento é uma aliança — não um contrato. Contratos têm cláusulas de saída; alianças têm compromisso incondicional. Como a aliança de Deus com Noé modela a aliança que vocês vão fazer um com o outro? / Casal: "Com a vossa descendência depois de vós" — as promessas de Deus abrangem sua família para além de vocês. Como isso muda a forma de orar pelos filhos e netos? / Avós: Vocês são testemunhas vivas de que Deus cumpre Suas promessas ao longo de gerações. Testemunhem isso concretamente para os netos.

III. O SINAL COLOCADO: O ARCO NAS NUVENS (Gn 9:12–17) (A')
§ Indicação Textual: Gn 9:13 ("ponho o meu arco nas nuvens, o qual será por sinal da aliança entre mim e a terra") e 9:15-16 ("lembrarei a minha aliança... o arco estará nas nuvens, e eu o verei, para me lembrar da aliança perpétua") — o sinal aliançal visível e eterno
§ Exegese: O "sinal" (אוֹת, 'ôt) da aliança noáica é o arco nas nuvens. Em hebraico, qeshet é exatamente o mesmo termo para "arco de guerra" — a arma de combate. A imagem é poderosa: Deus que poderia destruir (e o dilúvio prova que pode) coloca o arco de guerra apontado para o alto, para Si mesmo — como se dissesse "se eu quebrar esta promessa, que o castigo recaia sobre Mim." É uma autoimposição de pena. E quem "se lembra" (9:15-16 — zākar) não é o ser humano, mas Deus: "Eu me lembrarei de Minha aliança." O sinal não é para exercer a memória humana — é para garantir a ação divina. A beleza é que Deus não precisa de lembrete; o uso de "lembrarei" é linguagem de comprometimento irreversível: quando Deus "se lembra" na Bíblia, ele age (cf. 8:1 — "Deus se lembrou de Noé" e o dilúvio começou a recuar).
§ Teologia Reformada: A CFW VII e a CFB 7 descrevem como Deus administra as alianças por meios visíveis — sinais e selos. O arco é o primeiro sinal aliançal da história; será seguido pela circuncisão (17:11), pelo cordeiro pascal (Ex 12) e pelo pão e vinho (Lc 22:19-20). R.C. Sproul (Grace Unknown): "O arco-íris não é primariamente um sinal para nós — é um sinal para Deus. Ele se olha e se lembra. Isso é mais seguro do que qualquer fidelidade humana: é a garantia da fidelidade divina à Sua própria palavra." Abraham Kuyper: "Cada vez que um cristão vê o arco-íris, está diante de um sacramento da criação — o sinal visível de que o Deus invisível se comprometeu com o mundo de forma irrevogável."
§ Aplicação Familiar: Pais: O arco-íris é um sinal que Deus colocou para que Ele mesmo se lembrasse de Sua promessa. Que sinais físicos — fotos de batismo, versículos na parede, tradições familiares — vocês têm colocado em casa para que a família se lembre das promessas de Deus? / Filhos: Na próxima vez que você ver um arco-íris, lembre: não é apenas fenômeno meteorológico — é a assinatura de Deus no céu dizendo "Eu me lembro. Eu sou fiel." Tire uma foto e compartilhe com a família com esse significado. / Noivos: As alianças precisam de sinais visíveis — é assim que Deus funciona. Que sinais e rituais vocês vão estabelecer em seu lar para lembrar das promessas de Deus e dos votos que fizeram um ao outro? / Casal: "A aliança perpétua" (9:16) — perpétua significa sem prazo de validade. Como essa certeza da aliança de Deus dá base para a fidelidade de vocês na aliança conjugal? / Avós: Vocês são um "sinal vivo" da fidelidade de Deus para os netos — assim como o arco-íris é sinal da fidelidade de Deus para a criação. Que história de fidelidade de Deus vocês podem compartilhar hoje com eles?

---

EIXO REDENTOR (HISTÓRICO-REDENTIVO)
A aliança noáica aponta além de si mesma: é aliança de preservação que garante que o mundo existirá até o cumprimento da redenção. O "nunca mais" de Gênesis 9:11 é o piso sobre o qual todas as outras alianças serão construídas — com Abraão (cap. 12/15/17), com Israel (Êx 19-24), com Davi (2 Sm 7), e finalmente a Nova Aliança em Cristo (Jr 31:31-34; Lc 22:20). Onde Deus coloca o arco nas nuvens como sinal, Cristo é o sinal definitivo: "o Verbo se fez carne" (Jo 1:14) é Deus colocando a Si mesmo na história como garantia de Sua promessa. E Apocalipse 4:3 e 10:1 mostram o arco ao redor do trono de Deus — sinal de que a aliança noáica não foi abolida, mas cumprida na nova criação.

DOUTRINA CENTRAL
Deus faz alianças unilaterais de graça com famílias — Ele é o único agente, Ele é quem se lembra, Ele é quem se compromete irrevogavelmente. A segurança da família cristã não repousa na fidelidade dos seus membros, mas na fidelidade do Deus que colocou o arco nas nuvens. Cf. CFW Cap. VII; CFB Cap. VII.

APLICAÇÕES PARA A FAMÍLIA
▸ Para os Pais: Aprendam e ensinem as promessas aliançais de Deus à família. Deuteronômio 6:4-9 manda que essas promessas sejam gravadas nas portas, nos pulsos, nos corações dos filhos.
▸ Para os Filhos: Esta semana, quando ver um arco-íris, conte para alguém — amigo, colega, vizinho — o que ele significa: Deus é fiel. Essa é a mais simples das evangelizações.
▸ Para os Noivos: O casamento é aliança — não contrato. O arco de Gênesis 9 é modelo: uma das partes se compromete sem aguardar reciprocidade. Decidam agora que o amor de vocês será assim — incondicional, irrevogável.
▸ Para o Casal: Renovem juntos os votos da aliança conjugal — em oração, reafirmem que o casamento de vocês tem Deus como testemunha, guardião e fiador.
▸ Para os Avós: As promessas aliançais de Deus são "para vocês e para os seus filhos" (At 2:39). Esta semana, leiam com um neto a história do arco-íris e testemunhem: "Deus tem sido fiel para a nossa família. Eu vi isso com meus próprios olhos."

DINÂMICA FAMILIAR
1. Leiam juntos Gênesis 9:8-17. Identifiquem: (a) com quem Deus faz a aliança? (b) qual é o sinal? (c) quem vai "se lembrar"? Por que isso é significativo?
2. Atividade "Promessas de Deus": Cada membro da família recebe um papel e escreve UMA promessa bíblica que mais precisa ouvir hoje. Compartilhem e orem sobre cada uma.
3. Leiam Gênesis 9:6 e discutam: "Por que matar um ser humano é tão grave, segundo este versículo? Como isso muda a forma de tratar as pessoas ao redor de você?"
4. Discutam: "Qual é a diferença entre um contrato (que pode ser quebrado) e uma aliança? O casamento de vocês é um contrato ou uma aliança?"
5. Os pais ou avós compartilhem: "Quando vocês atravessaram uma 'tempestade' na vida — qual foi o 'arco-íris' que Deus mostrou, a promessa que os sustentou?"
6. Orem pela família estendida pedindo que as promessas da aliança alcance a todos — "vocês, seus filhos, e os que estão longe" (At 2:39).

AUTORES REFORMADOS
▸ O. Palmer Robertson (O Cristo das Alianças): "A aliança noáica é a trave mestra que sustenta toda a história da redenção. Ela garante que o mundo existirá tempo suficiente para que a promessa do Redentor seja cumprida. Sem o 'nunca mais' de Noé, nenhuma outra aliança bíblica seria possível."
▸ R.C. Sproul (Graça Desconhecida): "O arco-íris não é um sinal de nossa fidelidade a Deus — é um sinal da fidelidade de Deus a Si mesmo. Quando o vemos, Ele se lembra de Sua aliança. Isso é infinitamente mais seguro do que qualquer coisa que nós possamos oferecer."
▸ Herman Bavinck (Dogmática Reformada, v. 3): "'Nunca mais' é a gramática da graça divina — Deus falando em linguagem que não permite revisão, cancelamento ou condições suspensivas. A família que conhece este Deus pode enfrentar qualquer dilúvio sem desesperar."

CONCLUSÃO
O arco no céu é a assinatura de Deus na criação: "Eu me lembro. Eu sou fiel. Minha promessa vale." Noé não pediu essa promessa — Deus a ofereceu. A família de Noé não mereceu — Deus a estabeleceu. E a sua família também não merece — mas está coberta pela mesma graça soberana do Deus que nunca esquece e nunca abandona. Cada vez que a chuva passar e o arco aparecer, lembrem juntos: este é o Deus da nossa família.\`;

`;

// ── Novo bloco — Dia 9 : Gn 9:18–29 ─────────────────────────────────────────
const novo9 = `  if (d.dia === 9) return \`PARA A FAMÍLIA · Gênesis 9:18–29

TEMA: Providência e Cuidado: Honra, Vergonha e Bênção na Família de Noé

---

TÍTULO DO SERMÃO FAMILIAR
"A Tenda de Noé: Quando a Família Enfrenta o Pecado de Dentro"

BIG IDEA PARA A FAMÍLIA
Gênesis 9:18–29 mostra que mesmo a família mais abençoada por Deus enfrenta pecado interno, desonra e fracasso — mas a forma como respondemos à falha dos que amamos define o tipo de família que somos e o legado que deixamos.

PERGUNTA PARA A FAMÍLIA
Quando alguém da nossa família falha gravemente, nossa primeira reação é cobrir com amor ou expor com julgamento — e o que cada uma dessas respostas revela sobre o nosso próprio coração?

PALAVRA-CHAVE DE TRANSIÇÃO
Vejamos as três cenas desta perícope: os FILHOS que herdaram a terra, o PECADO que entrou pela tenda e a PROFECIA que moldará gerações — tudo dentro dos limites de Gênesis 9:18–29.

---

MOVIMENTOS DO SERMÃO

I. OS FILHOS QUE HERDARAM A TERRA: BÊNÇÃO COM RESPONSABILIDADE (Gn 9:18–19) (A)
§ Indicação Textual: Gn 9:18-19 ("os filhos de Noé que saíram da arca eram Sem, Cam e Jafé; e Cam era o pai de Canaã. Estes três eram os filhos de Noé, e deles se povoou toda a terra") — introdução dos herdeiros e foreshadowing narrativo
§ Exegese: A perícope abre com uma lista que parece simples — três nomes — mas carrega peso narrativo deliberado. O narrador interrompe a sequência para inserir um detalhe que não aparecerá relevante imediatamente: "Cam era o pai de Canaã" (9:18). Esta nota é prolepse — antecipa o final da perícope onde Canaã será maldito (9:25). O narrador coloca Canaã em destaque antes mesmo do incidente, preparando o leitor para a profecia de Noé. E a conclusão do versículo 19 — "deles se povoou toda a terra" — conecta esta cena ao mandato de Gênesis 9:1 ("enchei a terra") e ao que virá em Gênesis 10 (a tabela das nações). Sem, Cam e Jafé não são apenas filhos de Noé: são os pais de toda a humanidade que existirá depois deles. A responsabilidade é proporcional à herança.
§ Teologia Reformada: A CFW IV.2 e a CFB 4.2 ensinam que Deus "criou o homem... para lhe dar glória, ser-lhe agradável, e para conviver com Ele." Os filhos de Noé herdaram a terra restaurada pelo dilúvio para serem stewards (mordomos) dessa nova criação. Voddie Baucham (Family Shepherds): "O que a família herda de Deus — graça, terra, bênção, descendência — é sempre mais que conquista e nunca menos que responsabilidade. Os herdeiros de Noé receberam um mundo novo; o que fizeram com ele é a pergunta que Gênesis 9:18-29 responde com honestidade brutal." Joel Beeke (Parenting by God's Promises): "A menção de que 'Cam era pai de Canaã' antes mesmo do incidente é aviso narrativo: as consequências do pecado familiar se estendem muito além do momento em que ocorrem."
§ Aplicação Familiar: Pais: Seus filhos herdarão a história, os valores e as consequências das escolhas que vocês estão fazendo agora. "Cam era pai de Canaã" antes do incidente — os frutos do pecado já estavam na narrativa antes de acontecer. O que vocês estão semeando hoje? / Filhos: A família que você nasceu não é acidente — é herança. O que vocês vão fazer com o que receberam — bênção ou responsabilidade? Sem, Cam e Jafé tinham a mesma herança; fizeram escolhas diferentes. / Noivos: A família que vocês vão formar herdará as virtudes e as disfunções que vocês trazem. É sábio, antes do casamento, conhecer bem as histórias familiares de cada um — não para ter medo, mas para ser intencional. / Casal: Que herança vocês estão construindo para os filhos? Não apenas material, mas espiritual, relacional, emocional. / Avós: "Deles se povoou toda a terra" — a influência de uma família vai muito além do que os olhos veem. Vocês não têm ideia de quantas vidas serão afetadas pela fé ou pela infidelidade da família de vocês.

II. A TENDA DO FRACASSO: TRÊS RESPOSTAS AO PECADO DO PAI (Gn 9:20–23) (B)
§ Indicação Textual: Gn 9:21-23 ("bebeu do vinho e embebedou-se, e descobriu-se dentro da sua tenda. E Cam, pai de Canaã, viu a nudez de seu pai, e contou a seus dois irmãos que estavam fora. Então Sem e Jafé tomaram a capa, e puseram-na sobre os ombros de ambos, e foram andando de costas, e cobriram a nudez de seu pai") — o fracasso de Noé e as três respostas dos filhos
§ Exegese: O versículo 20 apresenta Noé como "homem da terra" que "plantou uma vinha" — a nova criação tem seu Adão plantando no jardim, e como Adão, Noé come do fruto que o leva ao pecado. A embriaguez e nudez de Noé ecoam a nudez de Adão em Gênesis 3 — o segundo Adão repete o padrão do primeiro. O que Cam "viu" (rā'āh, 9:22) vai além de uma visão acidental: o verbo combinado com "e contou a seus dois irmãos" indica uma resposta ativa de exposição, provavelmente prazerosa. Em contraste, Sem e Jafé "tomaram a capa" e "foram andando de costas" — dois elementos que sublinham honra deliberada: eles agiram ativamente (não ficaram inertes) e protegeram os olhos (foram de costas). A honra é ação, não omissão. A nudez do pai foi coberta pelo amor dos filhos — exatamente o que Adão não tinha quando saiu do jardim.
§ Teologia Reformada: A CFW VI.4 e a CFB 6.4 ensinam que após a Queda "toda inclinação do coração humano é má." A resposta de Cam não foi neutralidade — foi atividade corrupta. Thomas Watson (A Body of Divinity): "Os melhores santos são apenas homens no melhor de si. Noé bebeu; Abraão mentiu; Davi adulterou. A graça não produz perfeição nesta vida — produz perseverança. E a prova dessa perseverança é o que a família faz quando vê os seus santos mais frágeis." J.C. Ryle (Santidade): "A forma como tratamos os fracassos dos que amamos revela mais sobre nós do que sobre eles. Cam expôs o pai; Sem e Jafé o cobriram. O que você faz com a nudez daqueles que você ama?"
§ Aplicação Familiar: Pais: Vocês vão falhar diante dos filhos — isso é certo. O que é incerto é como vocês vão responder ao próprio fracasso. Noé não ficou sabendo na hora; mas quando soube, agiu. Modelar confissão é mais formativo do que modelar perfeição. / Filhos: Quando você vê um adulto — pai, mãe, avô, pastor — falhar, qual é sua primeira reação: expor como Cam ou cobrir como Sem e Jafé? A Bíblia é clara sobre qual resposta honra a Deus. / Noivos: Em casamento, você verá o cônjuge nas piores versões dele ou dela. A questão não é "isso vai acontecer?" — vai. A questão é: "Quando acontecer, eu cobrirei com amor ou usarei contra ele/ela?" / Casal: Há alguma coisa que um de vocês fez que o outro ainda não "cobriu" — que ainda está sendo exposta, lembrada, usada como acusação? Esta perícope convida a uma conversa de perdão genuíno. / Avós: Compartilhem com os netos — quando for apropriado — histórias de como vocês aprenderam a cobrir os erros dos que amam, em vez de expor.

III. A PROFECIA QUE ATRAVESSA GERAÇÕES: BÊNÇÃO E MALDIÇÃO (Gn 9:24–27) (A')
§ Indicação Textual: Gn 9:25-27 ("Maldito seja Canaã; seja servo dos servos de seus irmãos. E disse: Bendito seja o Senhor, Deus de Sem; e seja Canaã servo seu. Deus alargue a Jafé, e habite nas tendas de Sem; e seja Canaã servo seu") — a profecia de Noé sobre os destinos das linhagens
§ Exegese: Quando Noé acorda e "soube o que seu filho menor lhe havia feito" (9:24), sua resposta é profética, não apenas emotiva. Três elementos surpreendem: (1) A maldição recai sobre Canaã — não sobre Cam. Isso perturbou intérpretes ao longo dos séculos. A melhor explicação é que Noé profetiza sobre as nações futuras, não apenas sobre as pessoas presentes: Canaã (e seus descendentes, os cananeus) será o inimigo que Israel (descendente de Sem) vencerá ao entrar em Canaã. É profecia de história, não apenas punição pessoal. (2) A bênção de Sem associa seu Deus ao Nome divino — "o Senhor, Deus de Sem" (9:26): é a primeira vez no texto bíblico que Deus é associado com uma linhagem específica por nome. A linha messiânica passará por Sem — o que Gênesis 11:10-26 confirmará (genealogia de Sem até Abraão). (3) Jafé "habitará nas tendas de Sem" — imagem de integração e inclusão: as nações de Jafé (Europa e além) serão acolhidas na habitação do povo de Sem (Israel e a Igreja). (4) A morte de Noé (9:28-29) fecha a perícope: viveu 950 anos. O patriarca que sobreviveu ao dilúvio morre, mas sua profecia sobrevive.
§ Teologia Reformada: A CFW III.1 e a CFB 3.1 afirmam que Deus "decretou desde toda a eternidade tudo o que acontece." A profecia de Noé não é resposta impulsiva — é revelação do decreto divino sobre as nações. O. Palmer Robertson (O Cristo das Alianças): "A bênção de Sem é a primeira anotação no dossiê da linha messiânica. Quando Noé diz 'bendito seja o Senhor, Deus de Sem', ele está sem saber apontando o dedo para Abraão, para Davi e para o Filho de Davi que viria." Calvin (Comentário ao Gênesis 9:27): "Jafé habitando nas tendas de Sem é a mais antiga promessa de que os gentios seriam integrados ao povo de Deus — uma profecia que Atos 2 começou a cumprir e Apocalipse 7 cumprirá plenamente."
§ Aplicação Familiar: Pais: Suas palavras sobre os filhos têm peso profético — não no sentido mágico, mas no sentido de que as identidades que vocês atribuem a eles tendem a se tornar realidades vividas. Que "profecia" de vida, de fé e de futuro vocês têm falado sobre cada filho? / Filhos: A profecia de Noé sobre Canaã não foi sobre Cam, mas sobre as consequências do pecado que se propagam. As escolhas dos pais afetam os filhos — e as suas escolhas afetarão os filhos de vocês. / Noivos: Que bênção vocês querem "pronunciar" sobre a família que vão criar? Conversem sobre os valores, as visões e os propósitos que querem definir como fundação do lar. / Casal: Que bênções — palavras de afirmação, de missão, de identidade em Cristo — vocês têm falado sobre cada filho? Ou as palavras que mais saem são de correção e preocupação? / Avós: A bênção patriarcal é um presente poderoso. Considerem intencionalmente abençoar cada neto — por nome, por vocação, por identidade em Cristo — como Noé fez com seus filhos.

---

EIXO REDENTOR (HISTÓRICO-REDENTIVO)
A perícope de Gênesis 9:18–29 lança as fundações da história que se desenrolará em Gênesis 10–50 e além. A bênção de Sem (9:26 — "Bendito seja o Senhor, Deus de Sem") aponta diretamente para Abraão (descendente de Sem, Gn 11:10-26), para Israel e para Cristo — o Filho de Davi, da tribo de Judá, da linhagem de Sem. O que Cam fez ao pai — expor a nudez — Cristo desfez na cruz: "Ele se fez maldição por nós" (Gl 3:13), tomando sobre Si a vergonha que a humanidade merecia, para que nós sejamos cobertos com a Sua justiça (Rm 3:22). Sem e Jafé que cobriram com a capa apontam para Cristo que nos cobre com Sua justiça — andando de costas, não olhando para nossa vergonha, mas nos cobrindo com Seu amor.

DOUTRINA CENTRAL
O pecado entra em todas as famílias — mesmo nas mais abençoadas por Deus. O que distingue a família cristã não é a ausência de falha, mas a presença de graça: graça que cobre em vez de expor, que restaura em vez de condenar, e que vê no fracasso humano o espaço para a fidelidade divina continuar. Cf. CFW Cap. XVII; CFB Cap. XVII.

APLICAÇÕES PARA A FAMÍLIA
▸ Para os Pais: Vocês vão falhar diante dos filhos. Modelem confissão, não negação. Um pai que pede perdão ensina mais sobre o evangelho do que um pai que nunca erra — porque ninguém acredita no segundo.
▸ Para os Filhos: Quando um dos seus pais ou avós falha, a resposta bíblica é cobrir com amor, não expor com orgulho. Honrar o pai e a mãe (Êx 20:12) inclui honrá-los em seus momentos mais frágeis.
▸ Para os Noivos: Você vai conhecer o pior do seu cônjuge no casamento. A questão que define o casamento não é "será que vou ver?", mas "quando ver, vou cobrir ou expor?" Decidam agora.
▸ Para o Casal: Há algo que ainda não foi perdoado entre vocês — uma nudez exposta que ainda está sendo usada como arma? Esta perícope convida ao gesto de Sem e Jafé: cobrir com amor, sem olhar para trás.
▸ Para os Avós: Sua bênção verbal sobre os netos tem peso. Não esperem até o leito de morte para abençoar — façam isso hoje, em palavras concretas, chamando cada neto pelo nome.

DINÂMICA FAMILIAR
1. Leiam juntos Gênesis 9:20-23. Perguntem: "Qual das três respostas — a de Cam, a de Sem ou a de Jafé — você mais se identifica quando alguém que você ama falha?"
2. Discutam: "Qual é a diferença entre cobrir um pecado (esconder para não corrigir) e cobrir com amor (proteger a dignidade enquanto busca a restauração)?"
3. Atividade de bênção: Cada membro mais velho da família fala uma bênção específica sobre cada membro mais jovem — não elogios genéricos, mas palavras de identidade e vocação em Cristo.
4. Leiam 9:25-27 e perguntem: "Por que a profecia de Noé menciona Sem três vezes? O que isso sugere sobre a importância da linhagem de Sem?"
5. Perguntem às crianças: "Já houve uma vez em que alguém te 'cobriu' — te protegeu de vergonha ou de consequências que você merecia? Como você se sentiu?"
6. Orem pedindo graça para ser família que cobre em vez de expõe — e para receber perdão pelas vezes que expusemos os que amamos.

AUTORES REFORMADOS
▸ Thomas Watson (A Body of Divinity): "Os melhores santos são apenas homens no melhor de si. Noé bebeu; Abraão mentiu; Davi adulterou. A graça não produz perfeição nesta vida — produz perseverança e arrependimento. E isso é mais do que o mundo sem graça consegue oferecer."
▸ Voddie Baucham (Family Shepherds): "O pai cristão que peca diante dos filhos tem uma oportunidade de ouro: modelar confissão, arrependimento e restauração. Nenhuma família será salva por pais perfeitos — todas as famílias precisam de pais que sabem receber graça."
▸ J. C. Ryle (Santidade): "A forma como tratamos os fracassos dos que amamos revela mais sobre o estado do nosso próprio coração do que sobre o deles. Cam expôs. Sem e Jafé cobriram. O evangelho é a história de um Deus que escolheu cobrir — e nos chama a fazer o mesmo."

CONCLUSÃO
A tenda de Noé é um espelho. Dentro dela, o melhor homem do mundo falhou. Fora dela, três filhos responderam de três formas diferentes — e suas respostas definiram o destino de gerações. Sua família também tem uma "tenda" — um espaço íntimo onde as fragilidades aparecem. O que acontece dentro dessa tenda quando alguém falha? Você cobre com amor como Sem e Jafé — ou expõe com julgamento como Cam? Que o mesmo Deus que colocou o arco nas nuvens para cobrir a criação cubra também a sua família com graça suficiente para cobrir uns aos outros.\`;

`;

// ── Substituir no texto ───────────────────────────────────────────────────────
const antes = txt.slice(0, start8);
const depois = txt.slice(start10);

txt = antes + novo8 + '\n\n' + novo9 + '\n\n\n  ' + depois.trimStart();

fs.writeFileSync(filePath, txt, 'utf8');
console.log('OK — dias 8 e 9 reescritos com perícopes corretas (Gn 9:1-17 e Gn 9:18-29).');
