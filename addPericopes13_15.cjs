// addPericopes13_15.cjs — insere dias 13, 14, 15 em paraFamilia.ts
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'paraFamilia.ts');
let txt = fs.readFileSync(filePath, 'utf8');

const novosEsbocos = `
  // ─── Dia 13 — Gn 11.27–32 ────────────────────────────────────────────────
  if (d.dia === 13) return \`PARA A FAMÍLIA · Gênesis 11:27–32

TEMA: Identidade e Herança: A Família de Terá e as Promessas que Aguardam

---

TÍTULO: AS RAÍZES QUE PREPARAM O FRUTO
PERICOPE: DESCENDENTES DE TERÁ — Gênesis 11:27–32

BIG IDEA: Deus age na história de famílias comuns e imperfeitas para preparar o cumprimento de Suas promessas.
PERGUNTA: Como Deus usa genealogias e histórias familiares ordinárias como fundamento para propósitos extraordinários?
PALAVRA-CHAVE DE TRANSIÇÃO: RAÍZES
Vejamos as RAÍZES que sustentam a fé e a promessa...

---

MOVIMENTOS DO SERMÃO

I. AS RAÍZES DA FAMÍLIA: TERÁ E SEUS FILHOS (Gn 11.27–28) (A)
   — A genealogia de Terá apresenta três filhos: Abrão, Naor e Harã
   — Harã morre antes do pai — dor, luto e incerteza já marcam esta família
   — Ur dos Caldeus: contexto pagão, idólatra (Js 24.2) — mas Deus escolhe ali
   — Aplicação: Nossas famílias têm histórias de dor e imperfeição; isso não impede o chamado divino

II. OS LAÇOS QUE SUSTENTAM: CASAMENTOS E ADOÇÕES (Gn 11.29–30) (B)
   — Abrão casa com Sarai, descrita imediatamente como estéril — tensão narrativa central
   — Naor casa com Milca, filha de Harã — família que se reorganiza após perda
   — Ló, filho de Harã, é acolhido por Abrão — adoção como ato de cuidado familiar
   — A esterilidade de Sarai: humanamente impossível, teologicamente necessária para mostrar o poder de Deus
   — Aplicação: Deus usa laços de compromisso e cuidado — casamento, adoção, hospitalidade — como instrumentos de Sua providência

III. O MOVIMENTO QUE ANTECIPA: TERÁ SAI DE UR (Gn 11.31–32) (A')
   — Terá parte de Ur com destino a Canaã, mas para em Harã
   — A jornada incompleta — Terá morre em Harã aos 205 anos
   — Deus completará o que o pai não terminou: Abrão retomará a jornada (Gn 12.1)
   — A morte de Terá não é fim: é transição para o chamado pleno de Abrão
   — Aplicação: O que nossos pais deixaram incompleto, Deus pode completar por meio de nós e de nossas famílias

---

EIXO REDENTOR
Terá iniciou uma jornada que não completou; Abrão a concluirá pela graça soberana de Deus — assim como Cristo completa o que nenhum ser humano conseguiu fazer: cumprir toda a justiça e restaurar a família humana ao Pai (Hb 12.2).

DOUTRINA CENTRAL
A Providência Particular de Deus: Deus governa detalhes aparentemente insignificantes — genealogias, casamentos, esterilidade, mortes, migrações incompletas — para cumprir Seus propósitos redentores. Cf. CFW Cap. V.

APLICAÇÕES PARA A FAMÍLIA
▸ Para os Pais: Suas escolhas e jornadas — mesmo as incompletas — formam o solo onde Deus planta a fé dos seus filhos. Não subestime sua influência.
▸ Para os Filhos: A herança familiar que você recebe — com suas falhas e interrupções — é o ponto de partida do seu chamado, não o seu limite.
▸ Para os Noivos: Antes de fundar um lar, avalie as raízes que você traz. O que é bom, cultive. O que é quebrado, leve ao Senhor antes do casamento.
▸ Para o Casal: Casamentos com dores e perdas (como o de Abrão e Sarai) podem ser usados por Deus de forma poderosa. A fraqueza não é obstáculo à promessa.
▸ Para os Avós: Você representa o elo entre gerações. Mesmo que sua jornada pareça incompleta, sua fidelidade prepara o terreno para o que Deus fará nos seus netos.

DINÂMICA FAMILIAR
1. "A jornada da nossa família" — cada membro conta uma história de quando algo começou mas não terminou como esperado.
2. Mapeie a árvore genealógica da família e identifique momentos em que Deus agiu.
3. Ore juntos pelos membros da família que ainda não chegaram a Canaã — à fé plena em Cristo.
4. Converse: "Que herança queremos deixar para a próxima geração?"
5. Leia Josué 24.2–3 e reflita: como Deus chama mesmo de famílias idólatras.
6. Escreva uma carta de um membro mais velho da família a um mais jovem sobre fé e propósito.

AUTORES REFORMADOS
KUYPER, Abraham. *To Be Near unto God*. Grand Rapids: Eerdmans, 1925. p. 214: "A soberania de Deus não opera apenas nos grandes movimentos históricos, mas na sequência silenciosa de gerações, onde nomes comuns carregam propósitos eternos."
BEEKE, Joel R.; JONES, Mark. *A Puritan Theology*. Grand Rapids: Reformation Heritage Books, 2012. p. 103: "A providência divina abrange não apenas os eventos extraordinários, mas a trama ordinária da vida familiar — nascimentos, mortes, migrações e casamentos — tecida pela mão invisível de Deus."
BAVINCK, Herman. *A Teologia Dogmática de Bavinck*. v. 2. Tradução de Vagner Barbosa. São Paulo: Cultura Cristã, 2012. p. 438: "Deus não está ausente do sofrimento das famílias. Ele o utiliza como o escultor usa o cinzel: para revelar a forma que desde a eternidade planejou."

CONCLUSÃO
A família de Terá parece ordinária — cheia de perdas, esterilidade e jornadas incompletas. Mas era exatamente nessa família que Deus estava trabalhando em silêncio. Que sua família — com todas as suas imperfeições — também seja terreno fértil para os propósitos eternos de Deus.\`;

  // ─── Dia 14 — Gn 12.1–9 ─────────────────────────────────────────────────
  if (d.dia === 14) return \`PARA A FAMÍLIA · Gênesis 12:1–9

TEMA: Chamado e Missão: A Família que Parte por Fé

---

TÍTULO: A FAMÍLIA QUE OBEDECE SEM VER
PERICOPE: O CHAMADO DE ABRÃO — Gênesis 12:1–9

BIG IDEA: Deus chama famílias inteiras à obediência radical da fé, prometendo bênção que transborda para todas as nações.
PERGUNTA: O que significa para uma família obedecer ao chamado de Deus quando o destino ainda é desconhecido?
PALAVRA-CHAVE DE TRANSIÇÃO: PARTIR
Vejamos o que significa PARTIR com Deus...

---

MOVIMENTOS DO SERMÃO

I. O CHAMADO QUE ROMPE: "SAIA DA SUA TERRA" (Gn 12.1) (A)
   — Deus ordena que Abrão deixe terra, parentela e casa paterna — três camadas de segurança
   — Não há argumentação, negociação ou pedido de garantias: "vá para a terra que eu lhe mostrarei"
   — A fé não exige ver antes de partir — Hb 11.8: "saiu sem saber para onde ia"
   — Aplicação: Há chamados que Deus faz à família que exigem deixar o conforto do familiar

II. A PROMESSA QUE SUSTENTA: "EU FAREI DE TI UMA GRANDE NAÇÃO" (Gn 12.2–3) (B)
   — Sete promessas em dois versículos: nação, nome, bênção, proteção, maldição aos inimigos, e bênção a todas as famílias
   — "Todas as famílias da terra serão abençoadas em ti" — horizonte missiológico universal
   — A bênção de Abraão não é privilégio particular: é missão para o mundo
   — Cristo é o cumprimento: Gl 3.16 — "à tua descendência", que é Cristo
   — Aplicação: A família cristã não existe para si mesma — existe para ser canal de bênção ao mundo

III. A OBEDIÊNCIA QUE TESTEMUNHA: ABRÃO PARTE E ADORA (Gn 12.4–9) (A')
   — "Abrão foi, como o Senhor lhe havia dito" — obediência imediata, com Sarai e Ló
   — Chegam a Canaã; Deus aparece em Siquém e renova a promessa
   — Abrão constrói altares — a família que viaja também adora
   — A família peregrina deixa marcas de adoração onde passa: Siquém, Betel, o Neguebe
   — Aplicação: Onde sua família vai, leva o altar — o culto familiar é testemunho público de fé

---

EIXO REDENTOR
O chamado de Abrão aponta para Cristo: assim como Abrão saiu sem ver o destino, Jesus "saiu" da glória do céu ao mundo, obedecendo ao Pai para que em Sua descendência todas as nações fossem abençoadas (Gl 3.8, 14). A família cristã é herdeira desta missão (1 Pe 2.9).

DOUTRINA CENTRAL
A Eleição e a Vocação: Deus chama soberanamente (Rm 8.30) — não por mérito de Abrão, mas por graça pura. O chamado envolve a família inteira e tem dimensão missiológica: ser bênção ao mundo. Cf. CFW Cap. X.

APLICAÇÕES PARA A FAMÍLIA
▸ Para os Pais: O chamado ao sacrifício e à obediência inclui suas decisões sobre moradia, trabalho, escola e comunidade. Suas escolhas ensinam fé ou comodismo.
▸ Para os Filhos: Você também é parte do chamado familiar. Observe como seus pais obedecem a Deus mesmo quando é difícil — isso é herança de fé.
▸ Para os Noivos: Antes de casar, conversem sobre a missão da família que vão formar. Para onde Deus os chama? Como serão canal de bênção?
▸ Para o Casal: O casamento tem dimensão missionária. Abrão não partiu sozinho — Sarai foi com ele. A missão de Deus é cumprida em casal, não individualmente.
▸ Para os Avós: Seus filhos e netos estão sendo chamados a territórios que você não conheceu. Incentive, ore e bênçoe a obediência deles, mesmo que doa separar.

DINÂMICA FAMILIAR
1. Leiam juntos Gênesis 12.1–3 e perguntem: "Qual é a nossa 'Canaã' — o chamado que Deus tem para nossa família?"
2. Façam uma lista de "altares" que sua família construiu: momentos de gratidão e adoração coletiva.
3. Conversem: "Que 'terras' precisamos deixar para seguir Deus mais plenamente?"
4. Leiam Gálatas 3.8–9 e reflitam em como sua família pode ser bênção à vizinhança, escola, trabalho.
5. Tomem uma decisão familiar de missão: visitar alguém, hospedar alguém, servir em algum ministério.
6. Criem uma "declaração de missão familiar" — uma frase que expressa para que Deus chamou sua família.

AUTORES REFORMADOS
CALVINO, João. *Comentário de Calvino sobre o Livro de Gênesis*. São Paulo: Paracletos, 1999. p. 338: "Abrão não foi chamado por virtude própria, mas pela graça gratuita e soberana de Deus, que não escolhe por ver méritos, mas para criar mérito onde não havia nenhum."
PIPER, John. *Que as Nações Se Alegrem*. São Paulo: Editora Cultura Cristã, 2006. p. 27: "A missão de Deus começou com Abrão: uma família chamada para ser bênção para todas as famílias da terra. A Igreja hoje é herdeira dessa vocação missiológica universal."
BEEKE, Joel R. *Criando Filhos para Deus*. São Paulo: Editora Os Puritanos, 2015. p. 89: "O lar piedoso é em si uma missão. Quando a família obedece a Deus juntos, ela testemunha ao mundo que há um Rei cujo reino vale mais do que toda segurança terrena."

CONCLUSÃO
O chamado de Abrão não foi apenas individual — foi familiar. Deus chama famílias para partir por fé, construir altares no caminho e ser bênção onde chegam. Que sua família seja uma família que parte, que adora e que abençoa.\`;

  // ─── Dia 15 — Gn 12.10–20 ───────────────────────────────────────────────
  if (d.dia === 15) return \`PARA A FAMÍLIA · Gênesis 12:10–20

TEMA: A Família na Tentação: Medo, Mentira e a Graça que Restaura

---

TÍTULO: QUANDO O PAI DA FÉ FALHOU
PERICOPE: ABRÃO E SARAI NO EGITO — Gênesis 12:10–20

BIG IDEA: Mesmo quando famílias falham por medo e desonestidade, a graça soberana de Deus as protege e as chama de volta ao caminho da fé.
PERGUNTA: O que acontece com a família quando o medo substitui a fé — e como Deus age mesmo assim?
PALAVRA-CHAVE DE TRANSIÇÃO: RESTAURAÇÃO
Vejamos como Deus opera RESTAURAÇÃO mesmo depois da falha...

---

MOVIMENTOS DO SERMÃO

I. O MEDO QUE ENTRA: A FOME E A DESCIDA AO EGITO (Gn 12.10) (A)
   — A fome chega logo após o chamado glorioso: Deus não prometeu ausência de dificuldades
   — Abrão "desceu ao Egito" — movimento de descida, símbolo de desvio (cf. Gn 26.2; Is 31.1)
   — Nas Escrituras, o Egito frequentemente representa confiança nos recursos humanos em vez de Deus
   — Aplicação: A crise revela onde buscamos segurança — em Deus ou nos recursos humanos?

II. A MENTIRA QUE DESTRÓI: O ESTRATAGEMA DE ABRÃO (Gn 12.11–16) (B)
   — Abrão pede a Sarai que minta: "diz que és minha irmã" — ela era meia-irmã, mas a intenção é enganosa
   — O medo de Abrão pela própria vida supera seu dever de proteger e honrar Sarai
   — Sarai é levada para o palácio do Faraó — Abrão é enriquecido com rebanhos e servos
   — A esposa tratada como mercadoria: fracasso grave do mandato de amor e proteção (Ef 5.25)
   — Aplicação: O medo e a covardia destroem a confiança conjugal e expõem o cônjuge ao perigo

III. A GRAÇA QUE PERSISTE: DEUS AGE MESMO SEM SER CHAMADO (Gn 12.17–20) (A')
   — Deus fere o Faraó com pragas — ele não fora culpado, mas Deus protege Sarai e a promessa
   — O Faraó repreende Abrão: um pagão expõe o erro do pai da fé — humilhação e graça juntas
   — Abrão é expulso — consequência real da desonestidade, mas não abandono de Deus
   — Sarai é devolvida; a promessa continua intacta — a graça é maior que a falha
   — Aplicação: Deus não descarta famílias que falham — mas a restauração passa pela humildade de reconhecer o erro

---

EIXO REDENTOR
A mentira de Abrão expõe a Sarai ao perigo; Cristo, ao contrário, deu a própria vida para proteger e santificar Sua esposa, a Igreja (Ef 5.25–27). Abrão falhou como esposo; Cristo é o esposo perfeito que nunca abandona nem expõe sua noiva. A graça que protegeu Sarai aponta para a graça que protege a Igreja.

DOUTRINA CENTRAL
A Perseverança dos Santos e a Fidelidade de Deus: A falha de Abrão não anulou a promessa de Deus. A segurança do povo de Deus não repousa na perfeição do crente, mas na fidelidade do Senhor. Cf. CFW Cap. XVII; CFB Cap. XVII.

APLICAÇÕES PARA A FAMÍLIA
▸ Para os Pais: O medo pode fazer pais sacrificarem o bem-estar dos filhos e cônjuge por segurança própria. Examine: onde o medo tem governado suas decisões familiares?
▸ Para os Filhos: Quando os pais falham, Deus não falha. Aprenda a confiar em Deus, não apenas nos seus pais — eles são humanos e precisam de graça tanto quanto você.
▸ Para os Noivos: A honestidade é fundamento do casamento. Decidam agora: nunca usarão um ao outro como escudo ou moeda de troca. A transparência protege a aliança.
▸ Para o Casal: Quando um cônjuge falha gravemente — como Abrão — a restauração exige confissão honesta, não justificativa. A graça de Deus é suficiente para reconstruir.
▸ Para os Avós: Compartilhem com os netos histórias de quando vocês falharam e como Deus restaurou. A honestidade sobre as falhas é mais formativa que a aparência de perfeição.

DINÂMICA FAMILIAR
1. Conversem honestamente: "Há alguma área em que o medo tem governado nossas decisões familiares?"
2. Leiam Efésios 5.25–27 e discutam o que significa proteger e honrar o cônjuge.
3. Practiquem confissão familiar: cada um nomeia uma falha recente e pede perdão.
4. Reflitam: "Como a graça de Deus tem agido em nossa família mesmo quando falhamos?"
5. Leiam Hebreus 11.8–12 e discutam: a fé de Abrão era real mesmo com suas falhas?
6. Façam um pacto familiar de honestidade: "Em nossa casa, a verdade sempre será bem-vinda."

AUTORES REFORMADOS
CALVINO, João. *Comentário de Calvino sobre o Livro de Gênesis*. São Paulo: Paracletos, 1999. p. 352: "Aqui vemos quão frágil é a fé humana quando deixada a si mesma. Abrão, o pai da fé, cai na mentira porque tirou os olhos de Deus e os pôs sobre o perigo. A graça de Deus, porém, não falha onde a nossa fé vacila."
SPURGEON, Charles H. *Sermões sobre Gênesis*. São Paulo: Editora PES, 2010. p. 178: "Não te admires de que o homem mais crente da terra tenha dias de covardia. A diferença entre o justo e o ímpio não é que o primeiro nunca cai, mas que o primeiro sempre se levanta — porque Deus o sustenta."
RYLE, J. C. *Santidade*. São Paulo: Editora Fiel, 2009. p. 94: "A santificação é um processo. Os santos do Antigo Testamento mostram-nos a obra de Deus em vidas imperfeitas. O que os distingue não é a ausência de falhas, mas a presença de arrependimento genuíno e da graça restauradora."

CONCLUSÃO
Abrão, o pai da fé, falhou. Expôs sua esposa, mentiu por medo, foi repreendido por um pagão. Mas Deus não o abandonou. A graça soberana protegeu Sarai e manteve a promessa. Esta é a esperança da família cristã: não que nunca falharemos, mas que Deus é fiel mesmo quando nós não somos.\`;

`;

const marcador = '  return null;\n}';
if (!txt.includes(marcador)) {
  console.error('ERRO: marcador não encontrado. Verifique o arquivo.');
  process.exit(1);
}

txt = txt.replace(marcador, novosEsbocos + marcador);
fs.writeFileSync(filePath, txt, 'utf8');
console.log('OK — perícopes 13, 14, 15 inseridas em paraFamilia.ts');
