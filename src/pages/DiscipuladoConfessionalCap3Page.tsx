import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BG = '#060d1f';
const GOLD = '#fbbf24';
const GREEN = '#34d399';
const BLUE = '#60a5fa';
const ROSE = '#fb7185';
const PURPLE = '#c084fc';

/* ─── gabaritos ─────────────────────────────────────────────────────────── */

const GABARITO_ENC1: { num: string; resposta: string; notas?: number[] }[] = [
  {
    num: '1.1',
    resposta: 'O decreto de Deus é seu propósito eterno e soberano pelo qual, antes da fundação do mundo, ele determinou tudo o que aconteceria. Não é uma resposta aos eventos futuros, mas sua causa primeira. O CFB §1 fundamenta isso em Efésios 1.11 ("segundo o propósito daquele que faz todas as coisas conforme o conselho de sua vontade") e Isaías 46.10 ("o meu conselho subsistirá"). Isso distingue o Deus bíblico de divindades que reagem à história — ele a governa.¹',
    notas: [1],
  },
  {
    num: '1.2',
    resposta: 'O decreto é único e eterno: Deus não tomou mil decisões separadas, mas um único propósito abrangente em eternidade. É imutável: não pode ser frustrado por nenhuma criatura. É absolutamente soberano: abrange tudo — grandes e pequenos eventos (Ef 1.11; Dn 4.35). Ao mesmo tempo, o decreto não torna Deus autor do pecado (§2) nem elimina a responsabilidade humana — pois Deus ordena tanto os fins quanto os meios, inclusive a liberdade das criaturas.²',
    notas: [2],
  },
  {
    num: '1.3',
    resposta: 'O supralapsarismo sustenta que o decreto de eleição é logicamente anterior ao decreto de criação e queda — Deus decretou eleger e reprovar antes de decretar criar ou permitir a queda. O infralapsarismo sustenta que o decreto de eleição pressupõe logicamente a queda — Deus elege pecadores caídos. O CFB não resolve a controvérsia, mas apresenta um quadro infralapsariano ao falar de eleição "em Cristo" de criaturas caídas. Ambas as posições afirmam a soberania absoluta do decreto.³',
    notas: [3],
  },
  {
    num: '1.4',
    resposta: 'Daniel 4.35 ("faz o que quer no exército do céu e entre os habitantes da terra; não há quem possa deter sua mão") apresenta Deus como soberano absoluto sobre anjos, nações e indivíduos. Isaías 46.10 ("declaro o fim desde o princípio") mostra que a soberania divina inclui o conhecimento perfeito e o controle de todos os eventos históricos. Efésios 1.11 aplica isso à salvação. Juntos, esses textos excluem qualquer acaso ou contingência fora do controle divino.⁴',
    notas: [4],
  },
  {
    num: '1.5',
    resposta: 'O §2 afirma que nada acontece por acidente ou fortuna — "contingente" para Deus não significa incerto ou não controlado, mas apenas que os eventos ocorrem por causas secundárias reais (não diretamente por Deus). O acaso como causa real é excluído porque Deus conhece e governa tudo. Provérbios 16.33 ilustra isso: "o sorteio é lançado no colo, mas toda a sua decisão vem do SENHOR." O que parece aleatório para as criaturas está dentro do decreto divino.⁵',
    notas: [5],
  },
  {
    num: '1.6',
    resposta: 'O decreto eterno é fundamento da missão porque garante que a evangelização não pode fracassar em seu propósito último. Deus não envia seus servos a uma missão cujo resultado é incerto — os eleitos ouvirão, responderão e serão salvos (Jo 10.16; At 13.48). Isso não elimina o esforço missionário — antes o fundamenta. O decreto inclui os meios (pregação, testemunho) tanto quanto os fins (conversão). A missão não depende da habilidade do missionário, mas da soberania do Deus que decretou salvar seu povo.⁶',
    notas: [6],
  },
  {
    num: '1.7',
    resposta: 'Resposta pessoal e congregacional. Elementos a avaliar: a congregação ora com confiança de que Deus governa a história, ou com ansiedade de quem não tem certeza do resultado? A pregação proclama a soberania divina com alegria pastoral ou a esconde por medo de controvérsia? O decreto de Deus não é ameaça à liberdade humana — é a garantia de que a história tem um Senhor e a redenção tem um fundamento eterno.',
  },
];

const NOTAS_RODAPE: { num: number; ref: string }[] = [
  { num: 1, ref: 'WALDRON, Samuel E. Uma exposição moderna da Confissão de Fé Batista de 1689. São Paulo: Fiel, 2014. p. 71–78.' },
  { num: 2, ref: 'BAVINCK, Herman. Dogmática Reformada. São Paulo: Cultura Cristã, 2012. v. 2, p. 363–370.' },
  { num: 3, ref: 'MULLER, Richard A. Christ and the Decree. Grand Rapids: Baker Academic, 2008. p. 1–28.' },
  { num: 4, ref: 'PINK, Arthur W. A soberania de Deus. São Paulo: Cultura Cristã, 2007. p. 15–30.' },
  { num: 5, ref: 'BERKHOF, Louis. Teologia Sistemática. Campinas: Luz para o Caminho, 2010. p. 100–108.' },
  { num: 6, ref: 'PIPER, John. Let the Nations Be Glad. 3. ed. Grand Rapids: Baker Academic, 2010. p. 39–66.' },
];

const GABARITO_ENC2: { num: string; resposta: string; notas?: number[] }[] = [
  {
    num: '2.1',
    resposta: 'Predestinação, no sentido amplo, é o decreto divino que determina o destino eterno de todas as criaturas racionais. No sentido estrito, refere-se especificamente ao decreto sobre os seres humanos — eleição para salvação e reprovação para condenação. O CFB §3 usa "predestinar" de forma positiva para a eleição, e §4–5 trata da reprobação. A distinção é necessária porque eleição e reprovação não são simétricas — a eleição é ativa (Deus eficazmente salva), a reprobação é passiva (Deus passa sobre os demais e permite que a consequência do pecado siga seu curso).¹',
    notas: [1],
  },
  {
    num: '2.2',
    resposta: 'Romanos 9.11–13 trata do exemplo de Jacó e Esaú: antes de nascerem, "sem terem feito nada de bom ou de mau", Deus escolheu Jacó e rejeitou Esaú. Paulo usa isso para demonstrar que a eleição não se baseia em obras previstas ("para que o propósito segundo a eleição de Deus permanecesse"). O argumento paulino é deliberado: se a eleição dependesse de fé prevista, ela seria humana, não divina — e a glória seria dividida. A eleição segundo propósito (Rm 8.28) é o fundamento da segurança do crente.²',
    notas: [2],
  },
  {
    num: '2.3',
    resposta: 'Eleição condicional é a posição arminiana: Deus elegeu aqueles cuja fé futura previu. Eleição incondicional é a posição reformada: Deus elegeu sem base em qualquer qualidade ou ação prevista nas criaturas — apenas segundo sua livre graça e propósito soberano. O CFB §3 afirma explicitamente a eleição incondicional: os eleitos foram "escolhidos em Cristo para a vida eterna" sem que qualquer condição nos eleitos motivasse a escolha. O fundamento da eleição está em Deus, não no eleito.³',
    notas: [3],
  },
  {
    num: '2.4',
    resposta: 'O CFB §3 afirma que a eleição inclui também os anjos — "incluindo tanto anjos quanto homens". Isso é bíblico: 1 Timóteo 5.21 fala de "anjos eleitos". A doutrina implica que nem todos os anjos foram confirmados na bondade por mérito próprio, mas que aqueles que permanecem santos o fazem por eleição divina — contraparte da queda dos anjos que não foram eleitos. Isso estende a soberania do decreto a toda criatura racional, não apenas aos humanos.⁴',
    notas: [4],
  },
  {
    num: '2.5',
    resposta: 'Reprobação (§5) é o decreto pelo qual Deus, por sua soberania, passa sobre aqueles não eleitos para salvação — deixando-os nas consequências do próprio pecado — e os ordena para desonra e ira, para a manifestação de sua justiça. A dificuldade pastoral é apresentar isso sem fazer Deus autor do pecado. A resposta do CFB: Deus não causa o pecado dos réprobos — eles pecam por suas próprias naturezas corrompidas. Deus apenas não estende a graça eficaz que impediria o resultado natural do pecado.⁵',
    notas: [5],
  },
  {
    num: '2.6',
    resposta: '"Em Cristo" (§3 — Ef 1.4: "nos escolheu nele antes da fundação do mundo") indica que Cristo não é apenas o executor da eleição, mas seu fundamento mediador. Os eleitos são eleitos como membros do corpo de Cristo — não individualmente, fora de Cristo. Isso tem implicações: (1) a segurança dos eleitos está em Cristo, não em si mesmos; (2) a eleição é inseparável da união com Cristo; (3) fora de Cristo não há eleição — os que rejeitam Cristo rejeitam o único mediador pelo qual os eleitos são salvos.⁶',
    notas: [6],
  },
  {
    num: '2.7',
    resposta: 'Resposta pessoal e congregacional. A doutrina da eleição deveria produzir: (1) humildade — nenhum eleito se salvou por mérito; (2) gratidão — a salvação é dom imerecido; (3) segurança — o que Deus elegeu, ele completa (Fp 1.6); (4) fervor evangelístico — os eleitos precisam ouvir o evangelho para serem salvos. A eleição não é obstáculo à missão — é sua fundação. Se alguém usa a eleição para justificar preguiça missionária, compreendeu mal a doutrina.',
  },
];

const NOTAS_RODAPE_ENC2: { num: number; ref: string }[] = [
  { num: 1, ref: 'BERKHOF, Louis. Teologia Sistemática. Campinas: Luz para o Caminho, 2010. p. 109–122.' },
  { num: 2, ref: 'SCHREINER, Thomas R.; WARE, Bruce A. (eds.). Still Sovereign. Grand Rapids: Baker Books, 2000. p. 103–136.' },
  { num: 3, ref: 'WALDRON, Samuel E. Uma exposição moderna da Confissão de Fé Batista de 1689. São Paulo: Fiel, 2014. p. 80–87.' },
  { num: 4, ref: 'BAVINCK, Herman. Dogmática Reformada. São Paulo: Cultura Cristã, 2012. v. 2, p. 400–405.' },
  { num: 5, ref: 'SPROUL, R.C. Chosen by God. Carol Stream: Tyndale House, 1986. p. 141–161.' },
  { num: 6, ref: 'MULLER, Richard A. Christ and the Decree. Grand Rapids: Baker Academic, 2008. p. 155–185.' },
];

const GABARITO_ENC3: { num: string; resposta: string; notas?: number[] }[] = [
  {
    num: '3.1',
    resposta: 'Deus não é autor do pecado porque o decreto não opera como causa eficiente do mal. O §6 afirma que Deus ordena os meios junto com os fins — e os meios incluem a liberdade real das criaturas. A queda de Adão e os pecados individuais ocorrem por causas segundas reais (vontade corrompida das criaturas), não por coerção divina direta. Atos 2.23 é o texto paradigmático: Cristo foi "entregue segundo o determinado desígnio e presciência de Deus" — mas foram "mãos de homens perversos" que o crucificaram. O decreto divino e a responsabilidade humana coexistem sem redução de uma à outra.¹',
    notas: [1],
  },
  {
    num: '3.2',
    resposta: 'Causas primárias e secundárias: Deus é a causa primária de tudo que existe e acontece — ele sustenta, governa e ordena todos os eventos. As criaturas são causas secundárias reais — elas agem com genuína agência, liberdade e responsabilidade. A distinção preserva: (1) a soberania total de Deus sobre a história; (2) a responsabilidade moral real das criaturas; (3) a realidade do mal como genuinamente culpável. Sem essa distinção, ou Deus não governa tudo, ou as criaturas não são responsáveis — ambas as alternativas contradizem a Escritura.²',
    notas: [2],
  },
  {
    num: '3.3',
    resposta: 'O §7 trata dos meios como parte integral do decreto. Os eleitos serão salvos pelos meios que Deus ordenou: pregação do evangelho, fé, arrependimento, uso dos sacramentos, comunhão eclesial. Isso implica que desprezar os meios ordinários é contradizer o decreto divino, não confiar nele. A soberania de Deus não justifica quietismo nem antinomismo — o decreto inclui a obediência dos eleitos como parte do caminho ordenado. Filipenses 2.12–13 expressa perfeitamente essa tensão: "trabalhai... pois é Deus quem opera".³',
    notas: [3],
  },
  {
    num: '3.4',
    resposta: 'Determinismo fatalista (ou estoicismo) sustenta que todos os eventos ocorrem por uma cadeia necessária impessoal — o resultado é o mesmo independentemente das ações humanas. O decreto bíblico é pessoal (Deus delibera e ama), inclui meios reais (as ações humanas importam como causas segundas), e é orientado para fins específicos (a glória de Deus e o bem dos eleitos). No fatalismo, a oração, o trabalho e o arrependimento são inúteis. No decreto bíblico, são meios ordenados por Deus para produzir os fins que ele decretou.⁴',
    notas: [4],
  },
  {
    num: '3.5',
    resposta: 'O §8 diz que a doutrina do decreto deve ser tratada "com especial prudência e cuidado", para que quem tem a certeza da eleição pessoal a perceba pelos efeitos do chamado eficaz — não por especulação sobre os segredos de Deus. A eleição não é investigada diretamente nos decretos eternos, mas indiretamente, pelos frutos: fé, arrependimento, santificação, perseverança (2Pe 1.10). A pastoral saudável usa a eleição como base de segurança para quem crê, não como instrumento para amedrontar ou paralisar.⁵',
    notas: [5],
  },
  {
    num: '3.6',
    resposta: 'Romanos 8.29–30 apresenta a "corrente dourada" da salvação: os que Deus "predestinou, a esses também chamou; e os que chamou, a esses também justificou; e os que justificou, a esses também glorificou." A cadeia é ininterrupta — do decreto eterno (presciência e predestinação) à consumação (glorificação). Cada elo garante o seguinte. A glorificação está no passado gramatical (ἐδόξασεν — aoristo), porque do ponto de vista do decreto eterno, é tão certo quanto se já tivesse ocorrido.⁶',
    notas: [6],
  },
  {
    num: '3.7',
    resposta: 'Atos 2.23 é o texto mais poderoso sobre a coexistência do decreto divino e da responsabilidade humana: a morte de Jesus foi "segundo o determinado desígnio e presciência de Deus" (decreto soberano) — e ao mesmo tempo executada por "mãos de homens perversos" (culpa moral real). Nenhum dos dois lados é reduzido ao outro. Isso mostra que o decreto de Deus não exonera a responsabilidade humana — a pressupõe. Os que crucificaram Jesus são julgados por um ato que simultaneamente cumpriu o eterno propósito de Deus.⁷',
    notas: [7],
  },
  {
    num: '3.8',
    resposta: 'Resposta pessoal e congregacional. A doutrina do decreto deveria produzir: na prática pessoal — confiança radical de que nada escapa ao controle de Deus; na prática congregacional — pregação da soberania divina sem eliminação da responsabilidade humana; na missão — certeza de que o evangelho produzirá os frutos que Deus decretou. O perigo a evitar é dois extremos: fatalismo passivo ("já está determinado, não preciso fazer nada") ou humanismo ansioso ("tudo depende de mim").',
  },
];

const NOTAS_RODAPE_ENC3: { num: number; ref: string }[] = [
  { num: 1, ref: 'CARSON, D.A. Divine Sovereignty and Human Responsibility. Eugene: Wipf and Stock, 2002. p. 200–215.' },
  { num: 2, ref: 'BAVINCK, Herman. Dogmática Reformada. São Paulo: Cultura Cristã, 2012. v. 2, p. 610–618.' },
  { num: 3, ref: 'WALDRON, Samuel E. Uma exposição moderna da Confissão de Fé Batista de 1689. São Paulo: Fiel, 2014. p. 90–95.' },
  { num: 4, ref: 'BERKHOF, Louis. Teologia Sistemática. Campinas: Luz para o Caminho, 2010. p. 177–185.' },
  { num: 5, ref: 'SPROUL, R.C. Chosen by God. Carol Stream: Tyndale House, 1986. p. 163–178.' },
  { num: 6, ref: 'MOUNCE, William D. Romans. Nashville: Thomas Nelson, 2008. p. 182–190. (Word Biblical Commentary)' },
  { num: 7, ref: 'CARSON, D.A. Divine Sovereignty and Human Responsibility. Eugene: Wipf and Stock, 2002. p. 1–20.' },
];

/* ─── confessional texts ──────────────────────────────────────────────── */

const CONF_TEXT_P1 = [
  {
    para: '§1',
    titulo: 'O decreto eterno e soberano de Deus',
    texto: (<p className="italic">
      Deus, desde a eternidade, por meio do <strong style={{ color: GOLD }}>conselho mais sábio e santo de sua própria vontade</strong>, ordenou livremente e imutavelmente tudo o que acontece. Contudo, de tal forma que Deus <span style={{ color: ROSE, fontWeight: 600 }}>não é autor do pecado</span>, nem é feita violência à vontade das criaturas, nem a <strong style={{ color: GOLD }}>liberdade ou contingência das causas segundas</strong> é abolida, mas antes estabelecida.
    </p>),
  },
  {
    para: '§2',
    titulo: 'Onisciência divina: não há acidente',
    texto: (<p className="italic">
      Embora Deus conheça tudo o que pode ocorrer sob todas as condições possíveis, <span style={{ color: ROSE, fontWeight: 600 }}>ele não decretou nada porque o previu como futuro</span>, ou porque aconteceria sob tais condições. Seu conhecimento do futuro não é a causa do decreto, mas o decreto é a causa de seu conhecimento. <strong style={{ color: GOLD }}>Tudo o que acontece é por ele determinado</strong> conforme o conselho eterno de sua vontade soberana.
    </p>),
  },
];

const CONF_TEXT_P2 = [
  {
    para: '§3',
    titulo: 'A eleição dos anjos e dos homens',
    texto: (<p className="italic">
      Por decreto de Deus, para a manifestação de sua glória, <strong style={{ color: GREEN }}>alguns homens e anjos são predestinados à vida eterna</strong>, e outros são destinados à morte eterna. Esses anjos e homens assim predestinados são <strong style={{ color: GREEN }}>particularmente e imutavelmente designados</strong>; e seu número é tão certo e definido que <span style={{ color: ROSE, fontWeight: 600 }}>não pode ser aumentado nem diminuído</span>.
    </p>),
  },
  {
    para: '§4',
    titulo: 'A eleição dos homens — em Cristo',
    texto: (<p className="italic">
      Os homens que são predestinados à vida, Deus, antes da fundação do mundo, segundo o seu eterno e imutável propósito e o conselho e beneplacito secreto de sua vontade, os <strong style={{ color: GREEN }}>escolheu em Cristo para a glória eterna</strong>, unicamente <strong style={{ color: GREEN }}>segundo sua livre graça e amor</strong>, <span style={{ color: ROSE, fontWeight: 600 }}>sem qualquer previsão de fé ou boas obras</span>, ou perseverança em qualquer uma delas, ou qualquer outra coisa na criatura como condição ou causa que o movesse a isso.
    </p>),
  },
  {
    para: '§5',
    titulo: 'A reprovação dos demais',
    texto: (<p className="italic">
      Quanto aos demais homens, foi do agrado de Deus, <strong style={{ color: GREEN }}>segundo o conselho insondável de sua própria vontade</strong>, pelo qual ele estende ou retém a misericórdia como lhe apraz, para a glória de seu poder soberano sobre suas criaturas, <span style={{ color: ROSE, fontWeight: 600 }}>passá-los e ordená-los à desonra e à ira</span> por seus pecados, para louvor de sua gloriosa justiça.
    </p>),
  },
];

const CONF_TEXT_P3 = [
  {
    para: '§6',
    titulo: 'Os meios ordenados com os fins',
    texto: (<p className="italic">
      Assim como Deus designou os eleitos para a glória, <strong style={{ color: BLUE }}>também predeterminou todos os meios para isso</strong>. Por isso, os que são eleitos, tendo caído em Adão, são redimidos por Cristo, eficazmente chamados à fé em Cristo pelo seu Espírito que opera em tempo oportuno; são justificados, adotados, santificados, e <strong style={{ color: BLUE }}>guardados por seu poder pela fé para a salvação</strong>. Nenhum dos eleitos é salvo sem os meios que Deus ordenou.
    </p>),
  },
  {
    para: '§7',
    titulo: 'A doutrina tratada com sabedoria',
    texto: (<p className="italic">
      A doutrina do <strong style={{ color: BLUE }}>alto mistério da predestinação</strong> deve ser tratada com especial prudência e cuidado, a fim de que os homens que dão atenção à vontade de Deus revelada em sua Palavra, <span style={{ color: ROSE, fontWeight: 600 }}>prestando obediência a ela</span>, possam, pelo efeito do seu chamado eficaz, <strong style={{ color: BLUE }}>ter a certeza de sua eleição eterna</strong>. Assim, essa doutrina produzirá louvor, reverência e admiração a Deus, além de <strong style={{ color: BLUE }}>humildade, diligência e abundante consolação</strong> a todos os que sinceramente obedecem ao evangelho.
    </p>),
  },
  {
    para: '§8',
    titulo: 'Soberania e responsabilidade — não contradição',
    texto: (<p className="italic">
      O decreto não torna Deus o autor do pecado porque ele opera por meio de <strong style={{ color: BLUE }}>causas segundas reais</strong> — a vontade livre das criaturas, as circunstâncias naturais, as decisões humanas genuínas. <span style={{ color: ROSE, fontWeight: 600 }}>A responsabilidade da criatura não é anulada pelo decreto</span>; ao contrário, é <strong style={{ color: BLUE }}>pressuposta por ele</strong>. Soberania divina e responsabilidade humana coexistem como duas verdades escriturísticas que não precisam ser sacrificadas uma à outra.
    </p>),
  },
];

/* ─── encontros ──────────────────────────────────────────────────────── */

const ENCONTRO1 = {
  titulo: 'Parte 1',
  subtitulo: 'O decreto eterno de Deus',
  cor: GOLD,
  versiculo: 'Todas as coisas procedem dele, e por ele e para ele são. A ele seja a glória para sempre.',
  ref_versiculo: 'Romanos 11.36',
  aplicacao: (<>
    <p>A doutrina do decreto eterno é <strong style={{ color: GOLD }}>âncora da esperança cristã no sofrimento</strong>. Quando a providência parece cruel — doença, perda, injustiça — o crente que sabe que "todas as coisas procedem dele" (Rm 11.36) pode descansar sem precisar compreender cada detalhe. O decreto não é fatalismo — é a confiança de que um Pai sábio e bom governa tudo, inclusive o que dói.</p>
    <p>Na prática pastoral: <strong style={{ color: GOLD }}>a pregação deve apresentar a soberania de Deus como consolo, não como ameaça</strong>. Muitas congregações evitam o tema por medo de controvérsia ou por parecer frio. Mas é exatamente a soberania que torna possível confiar radicalmente. Ensine a orar com a consciência de que Deus governa — e que a oração é um dos meios que ele ordenou para produzir o que decretou.</p>
    <p>O decreto não elimina o senso de urgência moral. <strong style={{ color: GOLD }}>Tudo o que Deus decretou inclui os meios</strong> — inclusive a decisão ética de cada crente. Isso significa que a pregação do decreto deve sempre ser acompanhada de chamado à obediência, ao arrependimento e à responsabilidade. Soberania sem responsabilidade é fatalismo; responsabilidade sem soberania é ansiedade. O CFB mantém os dois.</p>
  </>),
  textos: ['Ef 1.11', 'Is 46.10', 'Dn 4.35', 'Rm 11.36', 'Pv 19.21', 'Pv 16.33'],
  introducao: (<>
    <p>Nenhuma doutrina da teologia reformada é mais abrangente e mais desafiadora do que o decreto eterno de Deus. O Capítulo 3 da CFB afirma que Deus, "desde a eternidade", <strong style={{ color: GOLD }}>ordenou livremente e imutavelmente tudo o que acontece</strong> — sem exceção. Não há acidente no universo. Não há evento fora do propósito divino.</p>
    <p>Esta é uma afirmação audaciosa. O §1 antecipa a objeção mais óbvia: se Deus ordenou tudo, <span style={{ color: ROSE, fontWeight: 600 }}>é autor do pecado?</span> A resposta da confissão é duplamente negativa: Deus não é autor do pecado, e a liberdade e responsabilidade das criaturas não são abolidas. O decreto opera por <strong style={{ color: GOLD }}>causas segundas reais</strong> — a liberdade humana não é ilusão, mas é real dentro do plano soberano de Deus.</p>
    <p>O §2 acrescenta uma distinção crucial: Deus <span style={{ color: ROSE, fontWeight: 600 }}>não decretou porque previu</span> — previu porque decretou. A presciência divina não é a base do decreto; o decreto é a base da presciência. Isso distingue o Deus bíblico de uma divindade que simplesmente "conhece o futuro" — o Deus da Bíblia <strong style={{ color: GOLD }}>determina o futuro</strong>, de acordo com o conselho eterno de sua vontade soberana.</p>
  </>),
  perguntas: [
    { num: '1.1', texto: 'O que é o "decreto eterno" de Deus segundo o CFB §1? Como ele se distingue de um Deus que apenas prevê o futuro?', recurso: { label: 'A soberania de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-soberania-de-deus/' } },
    { num: '1.2', texto: 'Quais são as características do decreto segundo o §1–2? É único? Imutável? Abrangente?', recurso: { label: 'O decreto de Deus — Monergismo', url: 'https://www.monergismo.com/textos/teologia_sistematica/decretos_berkhof.htm' } },
    { num: '1.3', texto: 'Qual a diferença entre supralapsarismo e infralapsarismo? O CFB assume uma posição?', recurso: { label: 'Supra e Infralapsarismo — Monergismo', url: 'https://monergismo.com/predestinacao-e-supralapsarismo/' } },
    { num: '1.4', texto: 'Como Dn 4.35, Is 46.10 e Ef 1.11 fundamentam a doutrina do decreto? O que cada texto acrescenta?', recurso: { label: 'A soberania de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-soberania-de-deus/' } },
    { num: '1.5', texto: 'O §2 diz que nada acontece por "acidente ou fortuna". Como isso se relaciona com Pv 16.33?', recurso: { label: 'Providência e acaso — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-providencia-de-deus/' } },
    { num: '1.6', texto: 'Como a doutrina do decreto eterno fundamenta a missão e a evangelização, em vez de contradizê-la?', recurso: { label: 'Soberania de Deus e evangelismo — Monergismo', url: 'https://monergismo.com/a-soberania-de-deus-e-a-evangelizacao/' } },
    { num: '1.7', texto: 'Como o decreto eterno de Deus deveria afetar a vida de oração e a resposta ao sofrimento da sua congregação?' },
  ],
  glossario: [
    { termo: 'Decreto Eterno', def: 'O propósito único, eterno e imutável de Deus pelo qual, antes da criação, ele ordenou tudo o que aconteceria — fins e meios — para sua própria glória.' },
    { termo: 'Presciência', def: 'O conhecimento perfeito de Deus sobre todos os eventos futuros. No CFB §2, não é a base do decreto, mas sua consequência — Deus sabe porque decretou.' },
    { termo: 'Causas Segundas', def: 'As criaturas e forças naturais que Deus usa como meios reais para produzir os efeitos que decretou. Reais, não ilusórias — mas sempre sob o governo soberano de Deus.' },
    { termo: 'Supralapsarismo', def: 'Posição que coloca o decreto de eleição logicamente antes do decreto de criação e queda — Deus decretou eleger/reprovar antes de decretar criar.' },
    { termo: 'Infralapsarismo', def: 'Posição que coloca o decreto de eleição logicamente após o decreto de criação e queda — Deus elege pecadores caídos. Posição mais comum na tradição reformada.' },
  ],
};

const ENCONTRO2 = {
  titulo: 'Parte 2',
  subtitulo: 'Eleição e reprovação — o decreto soteriológico',
  cor: GREEN,
  versiculo: 'Até mesmo antes de os gêmeos nascerem ou de terem feito algo de bom ou de mau — para que o propósito de Deus segundo a eleição permanecesse.',
  ref_versiculo: 'Romanos 9.11',
  aplicacao: (<>
    <p>A eleição incondicional é, ao mesmo tempo, a doutrina mais humilhante e a mais libertadora da teologia cristã. Humilhante porque <strong style={{ color: GREEN }}>nenhum eleito chegou a Deus por mérito</strong> — foi escolhido antes de existir. Libertadora porque a segurança da salvação não descansa sobre nossa inconsistente fé ou obras, mas sobre o <strong style={{ color: GREEN }}>propósito eterno e imutável de Deus</strong>.</p>
    <p>A reprovação é a parte mais difícil. Pastoralmente, o CFB §5 insiste que os réprobos são condenados <strong style={{ color: GREEN }}>por seus pecados</strong> — não por decreto arbitrário. A reprovação não é a causa do pecado dos réprobos; é a decisão de Deus de não estender a graça eficaz que os converteria. Isso preserve tanto a justiça de Deus quanto a culpa real dos réprobos. Nunca use a reprovação para esfriar o chamado evangelístico — o evangelho é proclamado a todos; quem são os eleitos não sabemos antes da resposta.⁠</p>
    <p>Na prática da assurance (certeza da salvação): o §8 instrui que a certeza da eleição é alcançada pelos <strong style={{ color: GREEN }}>efeitos do chamado eficaz</strong> — fé, arrependimento, amor a Deus e ao próximo, perseverança. Não tente descobrir se é eleito investigando os decretos secretos de Deus. Descubra pelos frutos do Espírito em sua vida (2Pe 1.10). A eleição é um fundamento para repousar, não um enigma para resolver.</p>
  </>),
  textos: ['Rm 9.11–13', 'Ef 1.4–5', '1Tm 5.21', 'At 13.48', 'Jo 15.16', '2Ts 2.13'],
  introducao: (<>
    <p>O §3–5 da CFB trata do aspecto mais específico e mais controverso do decreto: a <strong style={{ color: GREEN }}>predestinação</strong> — o decreto pelo qual Deus determina o destino eterno de anjos e homens. A confissão distingue claramente dois decretos: <strong style={{ color: GREEN }}>eleição</strong> (predestinação à vida) e <strong style={{ color: GREEN }}>reprovação</strong> (destinação à morte, §5).</p>
    <p>O §4 é a formulação clássica da eleição incondicional: os eleitos foram "escolhidos em Cristo" <span style={{ color: ROSE, fontWeight: 600 }}>sem qualquer previsão de fé ou boas obras</span> como condição. Isso é o coração do calvinismo — a eleição não é divina porque Deus viu de antemão quem creria; é divina porque <strong style={{ color: GREEN }}>Deus decretou quem creria</strong>. Paulo explica isso com o exemplo de Jacó e Esaú (Rm 9.11): a escolha foi feita "antes de terem feito nada de bom ou de mau".</p>
    <p>O §5 aborda a reprovação com sobriedade. Deus "passa sobre" os demais — não os coage ao pecado, mas <span style={{ color: ROSE, fontWeight: 600 }}>não estende a eles a graça eficaz</span> que seria necessária para salvá-los. A condenação dos réprobos é pelas suas iniquidades reais — o decreto divino apenas não interfere para impedi-la.</p>
  </>),
  perguntas: [
    { num: '2.1', texto: 'O que é "predestinação"? Como o CFB distingue eleição de reprovação em §3–5?', recurso: { label: 'Predestinação — Ligonier PT', url: 'https://pt.ligonier.org/artigos/o-que-e-a-predestinacao/' } },
    { num: '2.2', texto: 'Como Romanos 9.11–13 (Jacó e Esaú) demonstra a eleição incondicional? Qual é o argumento de Paulo?', recurso: { label: 'Romanos 9 e a eleição — Monergismo', url: 'https://monergismo.com/romanos-9-e-a-eleicao-divina/' } },
    { num: '2.3', texto: 'Qual a diferença entre eleição condicional (arminianismo) e incondicional (calvinismo)? Onde o CFB se posiciona?', recurso: { label: 'Eleição condicional ou incondicional — Ligonier PT', url: 'https://pt.ligonier.org/artigos/eleicao-incondicional/' } },
    { num: '2.4', texto: 'O §3 menciona a eleição de anjos. O que isso implica? Que texto bíblico fundamenta isso?', recurso: { label: 'Os anjos eleitos — Monergismo', url: 'https://www.monergismo.com/textos/teologia_sistematica/angelologia_berkhof.htm' } },
    { num: '2.5', texto: 'O que é reprovação segundo o §5? Em que sentido Deus não é o autor do pecado dos réprobos?', recurso: { label: 'A reprovação — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-doutrina-da-reprovacao/' } },
    { num: '2.6', texto: 'O que significa que os eleitos foram escolhidos "em Cristo" (§4; Ef 1.4)? Que papel Cristo desempenha na eleição?', recurso: { label: 'Eleitos em Cristo — Monergismo', url: 'https://monergismo.com/eleicao-em-cristo/' } },
    { num: '2.7', texto: 'Como a doutrina da eleição deveria produzir humildade, gratidão, segurança e fervor evangelístico — em vez de orgulho ou passividade?' },
  ],
  glossario: [
    { termo: 'Predestinação', def: 'O decreto divino pelo qual Deus determina o destino eterno de anjos e homens — eleição para vida e reprovação para morte. Inclui tanto fins quanto meios.' },
    { termo: 'Eleição Incondicional', def: 'A doutrina de que Deus escolheu os eleitos sem qualquer fundamento neles — não por fé ou obras previstas, mas somente segundo sua livre graça (§4; Rm 9.11).' },
    { termo: 'Reprovação', def: 'O decreto pelo qual Deus passa sobre os não-eleitos e os ordena, por seus pecados, para desonra e ira — manifestando sua justiça. Deus não causa seu pecado.' },
    { termo: 'Assurance (Certeza)', def: 'A confiança do eleito de que é salvo, alcançada pelos efeitos do chamado eficaz — fé, arrependimento, santificação — não por especulação sobre os decretos secretos.' },
    { termo: 'TULIP', def: 'Acróstico inglês das Cinco Doutrinas da Graça: Depravação Total, Eleição Incondicional, Expiação Limitada, Graça Irresistível, Perseverança dos Santos.' },
  ],
};

const ENCONTRO3 = {
  titulo: 'Parte 3',
  subtitulo: 'Meios, liberdade e responsabilidade',
  cor: BLUE,
  versiculo: 'Trabalhai pela vossa salvação com temor e tremor; porque Deus é quem opera em vós tanto o querer como o efetuar.',
  ref_versiculo: 'Filipenses 2.12–13',
  aplicacao: (<>
    <p>A compatibilidade entre soberania divina e responsabilidade humana (§6–8) tem implicação direta para o cuidado pastoral. O conselheiro que abandona a soberania de Deus para "preservar a liberdade humana" deixa seu aconselhando sem fundamento. O conselheiro que usa a soberania para justificar passividade ("está nas mãos de Deus, não preciso fazer nada") viola o §6. O modelo bíblico é <strong style={{ color: BLUE }}>Filipenses 2.12–13</strong>: trabalhe com seriedade — porque Deus opera. Os dois movem juntos.</p>
    <p>A instrução do §7 sobre "prudência e cuidado" no ensino da predestinação é sabedoria pastoral inestimável. A doutrina não deve ser ensinada de modo a paralisar ou amedrontar os que sinceramente buscam a Deus. A certeza da eleição vem pelo <strong style={{ color: BLUE }}>chamado eficaz verificado em frutos</strong> — fé genuína, arrependimento real, amor transformado. Ensine a doutrina com esse enquadramento: a predestinação é consolação para quem crê, não enigma para especular.</p>
    <p>Atos 2.23 — o texto paradigmático da coexistência — deveria estar na memória de todo pastor. <strong style={{ color: BLUE }}>O maior crime da história</strong> (a crucificação do Filho de Deus) foi simultaneamente cumprimento do decreto eterno e ato culpável de homens perversos. Se nesses extremos soberania e responsabilidade coexistem, coexistem em toda situação. Isso transforma a ética: cada decisão humana é <strong style={{ color: BLUE }}>genuinamente real e genuinamente responsável</strong> — mesmo dentro do decreto soberano de Deus.</p>
  </>),
  textos: ['Fp 2.12–13', 'At 2.23', 'Rm 8.29–30', '2Pe 1.10', 'Jo 10.16', 'At 13.48'],
  introducao: (<>
    <p>Os §6–8 resolvem (ou ao menos articulam) a tensão mais urgente do Capítulo 3: se tudo está decretado, <span style={{ color: ROSE, fontWeight: 600 }}>qual o lugar dos meios, da liberdade e da responsabilidade?</span> A resposta do CFB é clara: o decreto inclui <strong style={{ color: BLUE }}>os meios com os fins</strong>. Os eleitos não chegam à glória por aclamação divina que ignora o processo — chegam pela fé, pelo arrependimento, pela santificação, pela perseverança. Tudo isso está dentro do decreto.</p>
    <p>O §7 aplica sabedoria pastoral: a doutrina da predestinação não deve ser usada para paralisar ou amedrontar, mas para <strong style={{ color: BLUE }}>produzir consolação, humildade e diligência</strong>. A certeza da eleição é buscada não na especulação sobre os decretos eternos, mas nos efeitos do chamado eficaz — fé real, arrependimento real, amor real. <span style={{ color: ROSE, fontWeight: 600 }}>2 Pedro 1.10 é a instrução prática</span>: "esforçai-vos ainda mais para tornar firme a vossa vocação e eleição".</p>
    <p>O §8 (implícito na formulação do §1) fecha com a mais difícil questão: <strong style={{ color: BLUE }}>como Deus não é autor do pecado?</strong> A resposta clássica: o decreto opera por causas segundas. Deus não coage as criaturas ao pecado — elas pecam por suas naturezas corrompidas. Atos 2.23 é o texto paradigmático: o maior ato de injustiça da história foi simultaneamente <strong style={{ color: BLUE }}>o decreto eterno de Deus</strong> e <span style={{ color: ROSE, fontWeight: 600 }}>a culpa real de homens perversos</span>.</p>
  </>),
  perguntas: [
    { num: '3.1', texto: 'Como o §1 garante que Deus não é autor do pecado, mesmo tendo decretado tudo? Qual o papel das causas segundas?', recurso: { label: 'Deus e o problema do mal — Ligonier PT', url: 'https://pt.ligonier.org/artigos/deus-e-o-problema-do-mal/' } },
    { num: '3.2', texto: 'O que são "causas primárias" e "causas segundas"? Como essa distinção preserva ao mesmo tempo a soberania divina e a responsabilidade humana?', recurso: { label: 'Providência e causas segundas — Monergismo', url: 'https://www.monergismo.com/textos/teologia_sistematica/providencia_berkhof.htm' } },
    { num: '3.3', texto: 'O §6 diz que Deus "também predeterminou todos os meios". Como isso afeta a importância da pregação, da oração e dos sacramentos?', recurso: { label: 'Os meios de graça — Ligonier PT', url: 'https://pt.ligonier.org/artigos/meios-de-graca/' } },
    { num: '3.4', texto: 'Qual a diferença entre o decreto bíblico e o determinismo fatalista estoico? Por que a oração não é inútil dentro do decreto?', recurso: { label: 'A providência de Deus — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-providencia-de-deus/' } },
    { num: '3.5', texto: 'O §7 diz que a certeza da eleição vem pelo "chamado eficaz". O que isso significa na prática? Como 2Pe 1.10 aplica isso?', recurso: { label: 'A certeza da salvação — Ligonier PT', url: 'https://pt.ligonier.org/artigos/a-certeza-da-salvacao/' } },
    { num: '3.6', texto: 'Explique a "corrente dourada" de Rm 8.29–30. Por que a glorificação está no passado gramatical?', recurso: { label: 'Romanos 8 e a segurança — Monergismo', url: 'https://monergismo.com/seguranca-eterna-romanos-8-29-30/' } },
    { num: '3.7', texto: 'Como Atos 2.23 demonstra a coexistência de decreto divino e responsabilidade humana? O que esse texto exclui?', recurso: { label: 'Soberania e responsabilidade — Ligonier PT', url: 'https://pt.ligonier.org/artigos/soberania-divina-responsabilidade-humana/' } },
    { num: '3.8', texto: 'Como o equilíbrio entre soberania e responsabilidade deveria moldar a pregação, o aconselhamento pastoral e a evangelização da sua congregação?' },
  ],
  glossario: [
    { termo: 'Compatibilismo', def: 'A posição filosófica e teológica de que a soberania divina (determinismo providencial) é compatível com a liberdade e responsabilidade reais das criaturas.' },
    { termo: 'Chamado Eficaz', def: 'A obra do Espírito Santo que, por meio do evangelho, produz eficazmente fé e arrependimento nos eleitos — garantindo que ouçam, creiam e sejam salvos.' },
    { termo: 'Decreto Condicionado', def: 'Posição arminiana: Deus decreta condicionado à fé prevista. O CFB rejeita isso no §4 — a eleição é incondicional.' },
    { termo: 'Perseverança', def: 'A doutrina de que todos os eleitos serão guardados pela graça de Deus até a glorificação final — fundamento da segurança eterna (Fp 1.6; Jo 10.28–29).' },
    { termo: 'Antinomismo', def: 'O erro de concluir que, se tudo está decretado, a obediência moral é desnecessária. O §6 refuta isso: o decreto inclui os meios, inclusive a obediência dos eleitos.' },
    { termo: 'Quietismo', def: 'O erro de concluir que, se Deus governa tudo, o esforço humano é inútil. O §6 e Fp 2.12–13 refutam isso: "trabalhai... porque Deus opera".' },
  ],
};

const REFERENCIAS = [
  { autores: 'BAVINCK, Herman', titulo: 'Dogmática Reformada', local: 'São Paulo: Cultura Cristã', ano: '2012', vol: 'v. 2' },
  { autores: 'BERKHOF, Louis', titulo: 'Teologia Sistemática', local: 'Campinas: Luz para o Caminho', ano: '2010' },
  { autores: 'CARSON, D.A.', titulo: 'Divine Sovereignty and Human Responsibility', local: 'Eugene: Wipf and Stock', ano: '2002' },
  { autores: 'CONFISSÃO DE FÉ BATISTA DE LONDRES DE 1689', titulo: 'Tradução e notas de Pro Nobis', local: 'São Paulo: Pro Nobis', ano: '2025' },
  { autores: 'MULLER, Richard A.', titulo: 'Christ and the Decree', local: 'Grand Rapids: Baker Academic', ano: '2008' },
  { autores: 'PINK, Arthur W.', titulo: 'A soberania de Deus', local: 'São Paulo: Cultura Cristã', ano: '2007' },
  { autores: 'PIPER, John', titulo: 'Let the Nations Be Glad', local: 'Grand Rapids: Baker Academic', ano: '2010', vol: '3. ed.' },
  { autores: 'SCHREINER, Thomas R.; WARE, Bruce A. (eds.)', titulo: 'Still Sovereign', local: 'Grand Rapids: Baker Books', ano: '2000' },
  { autores: 'SPROUL, R.C.', titulo: 'Chosen by God', local: 'Carol Stream: Tyndale House', ano: '1986' },
  { autores: 'WALDRON, Samuel E.', titulo: 'Uma Exposição Moderna da Confissão de Fé Batista de 1689', local: 'São Paulo: Fiel', ano: '2014' },
];

/* ─── sub-components ────────────────────────────────────────────────────── */

function ConfTexto({ items, cor }: { items: typeof CONF_TEXT_P1; cor: string }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      {items.map(item => (
        <motion.div key={item.para} layout className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cor}25` }}>
          <button
            onClick={() => setOpen(open === item.para ? null : item.para)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
            style={{ background: open === item.para ? `${cor}18` : `${cor}08` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${cor}25`, color: cor }}>{item.para}</span>
              <span className="font-bold text-white text-base">{item.titulo}</span>
            </div>
            <motion.span animate={{ rotate: open === item.para ? 180 : 0 }} className="text-lg" style={{ color: cor }}>▾</motion.span>
          </button>
          <AnimatePresence>
            {open === item.para && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-5 pb-5"
              >
                <div className="text-white/90 leading-relaxed text-sm md:text-base pt-4 border-t" style={{ borderColor: `${cor}20` }}>{item.texto}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

function PerguntasGrid({ perguntas, cor }: { perguntas: { num: string; texto: string; recurso?: { label: string; url: string } }[]; cor: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {perguntas.map((p, i) => (
        <motion.div
          key={p.num}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="rounded-xl p-4 flex flex-col gap-3"
          style={{ background: `${cor}0a`, border: `1px solid ${cor}22` }}
        >
          <div className="flex items-start gap-3">
            <span className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold" style={{ background: `${cor}28`, color: cor }}>{p.num}</span>
            <p className="text-white/95 text-sm md:text-base leading-relaxed font-medium">{p.texto}</p>
          </div>
          {p.recurso && (
            <div className="flex flex-col gap-1.5 mt-1">
              <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest opacity-50" style={{ color: cor }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                Quer ajuda para responder?
              </span>
              <a
                href={p.recurso.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 self-start rounded-lg px-3 py-1.5 text-xs font-semibold transition-all hover:scale-[1.03] hover:opacity-90"
                style={{ background: `${cor}14`, color: cor, border: `1px solid ${cor}30` }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                {p.recurso.label}
              </a>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function GlossarioCards({ items, cor }: { items: { termo: string; def: string }[]; cor: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map(g => (
        <div key={g.termo} className="rounded-xl p-4" style={{ background: `${cor}0c`, border: `1px solid ${cor}28` }}>
          <p className="font-extrabold text-base mb-2" style={{ color: cor }}>{g.termo}</p>
          <p className="text-white/90 text-base leading-relaxed">{g.def}</p>
        </div>
      ))}
    </div>
  );
}

function AplicacaoBox({ conteudo, cor }: { conteudo: React.ReactNode; cor: string }) {
  return (
    <div className="rounded-xl overflow-hidden mt-4" style={{ border: `1px solid ${cor}35` }}>
      <div className="flex items-center gap-2 px-5 py-3" style={{ background: `${cor}18`, borderBottom: `1px solid ${cor}25` }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: cor, flexShrink: 0 }}>
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
        <p className="text-sm font-extrabold uppercase tracking-widest" style={{ color: cor }}>Aplicação para a vida e a Igreja</p>
      </div>
      <div className="px-5 py-5 space-y-4 text-sm md:text-base leading-relaxed text-white/90" style={{ background: `${cor}07` }}>
        {conteudo}
      </div>
    </div>
  );
}

const SINGLE_CHAP = ['ob', 'fm', '2jo', '3jo', 'jd'];

function refToUrl(ref: string): string {
  const base = 'https://www.bibliaonline.com.br/ara';
  const norm = ref.trim().replace(/[–—]/g, '-');
  const sp = norm.lastIndexOf(' ');
  if (sp === -1) return base;
  const book = norm.slice(0, sp).toLowerCase().replace(/\s/g, '');
  const cv = norm.slice(sp + 1);
  if (cv.includes('.')) {
    const [chap, verseRange] = cv.split('.');
    const verseNum = verseRange.split('-')[0];
    return `${base}/${book}/${chap}/${verseNum}`;
  }
  if (SINGLE_CHAP.includes(book)) {
    return `${base}/${book}/1/${cv.split('-')[0]}`;
  }
  return `${base}/${book}/${cv}/1`;
}

function TextosProva({ items, cor }: { items: string[]; cor: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(t => (
        <a
          key={t}
          href={refToUrl(t)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all hover:scale-105 hover:opacity-90"
          style={{ background: `${cor}18`, color: cor, border: `1px solid ${cor}40` }}
          title={`Ler ${t} — Bíblia Online ARA`}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          {t}
        </a>
      ))}
    </div>
  );
}

function TableDecretoVsFatalismo({ cor }: { cor: string }) {
  const rows = [
    { aspecto: 'Natureza', decreto: 'Pessoal — propósito de um Deus que ama', fatalismo: 'Impessoal — cadeia necessária de causas' },
    { aspecto: 'Meios', decreto: 'Inclui causas segundas reais (ações humanas)', fatalismo: 'Indiferente aos meios — resultado fixo de qualquer forma' },
    { aspecto: 'Oração', decreto: 'Meio ordenado por Deus para produzir efeitos', fatalismo: 'Inútil — nada muda o destino' },
    { aspecto: 'Responsabilidade', decreto: 'Preservada — criaturas são genuinamente culpáveis', fatalismo: 'Anulada — tudo era inevitável' },
    { aspecto: 'Esperança', decreto: 'Fundada na promessa pessoal de Deus', fatalismo: 'Ausente — tudo já está fixado sem amor' },
    { aspecto: 'Texto bíblico', decreto: 'At 2.23; Rm 8.28; Fp 2.12–13', fatalismo: 'Sem fundamento bíblico' },
  ];
  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-sm rounded-xl overflow-hidden" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: `${cor}22` }}>
            <th className="px-3 py-3 text-left font-extrabold" style={{ color: cor }}>Aspecto</th>
            <th className="px-3 py-3 text-left font-extrabold" style={{ color: cor }}>Decreto Bíblico</th>
            <th className="px-3 py-3 text-left font-extrabold" style={{ color: ROSE }}>Determinismo Fatalista</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? `${cor}09` : `${cor}04`, borderTop: `1px solid ${cor}18` }}>
              <td className="px-3 py-3 text-white/95 font-semibold">{r.aspecto}</td>
              <td className="px-3 py-3 text-white/80">{r.decreto}</td>
              <td className="px-3 py-3" style={{ color: `${ROSE}99` }}>{r.fatalismo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── encontro section ───────────────────────────────────────────────── */

function EncontroSection({ enc, textos, confTexto, mostrarTabela }: {
  enc: typeof ENCONTRO1;
  textos?: string[];
  confTexto?: typeof CONF_TEXT_P1;
  mostrarTabela?: boolean;
}) {
  const cor = enc.cor;
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl overflow-hidden mb-8"
      style={{ background: '#0b1530', border: `1px solid ${cor}30` }}
    >
      <div className="px-4 md:px-6 pt-5 pb-4" style={{ borderBottom: `1px solid ${cor}22` }}>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: `${cor}22`, color: cor }}>{enc.titulo}</span>
        </div>
        <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">{enc.subtitulo}</h2>
        <p className="mt-2 text-base font-medium" style={{ color: `${cor}cc` }}>"{enc.versiculo}" — {enc.ref_versiculo}</p>
      </div>

      <div className="p-4 md:p-6 space-y-7">
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: cor }}>Introdução</h3>
          <div className="space-y-4 text-white/90 leading-relaxed text-sm md:text-base">{enc.introducao}</div>
        </div>

        {textos && (
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: cor }}>Textos-Prova</h3>
            <TextosProva items={textos} cor={cor} />
          </div>
        )}

        {confTexto && (
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: cor }}>Texto Confessional</h3>
            <ConfTexto items={confTexto} cor={cor} />
          </div>
        )}

        {mostrarTabela && (
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest mb-3" style={{ color: cor }}>Decreto Bíblico × Determinismo Fatalista</h3>
            <TableDecretoVsFatalismo cor={cor} />
          </div>
        )}

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: cor }}>Perguntas para Discussão</h3>
          <PerguntasGrid perguntas={enc.perguntas} cor={cor} />
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-widest mb-4" style={{ color: cor }}>Glossário</h3>
          <GlossarioCards items={enc.glossario} cor={cor} />
        </div>

        <AplicacaoBox conteudo={enc.aplicacao} cor={cor} />
      </div>
    </motion.section>
  );
}

/* ─── gabarito section ───────────────────────────────────────────────── */

type GabaritoItem = { num: string; resposta: string; notas?: number[] };
type NotaRodape = { num: number; ref: string };

function GabaritoSection({
  cor, titulo, aviso, itens, notas, perguntas,
}: {
  cor: string;
  titulo: string;
  aviso: string;
  itens: GabaritoItem[];
  notas: NotaRodape[];
  perguntas: { num: string; texto: string; recurso?: { label: string; url: string } }[];
}) {
  const [open, setOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl overflow-hidden mt-6"
      style={{ border: `1px solid ${cor}30` }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-left transition-all"
        style={{ background: open ? `${cor}14` : `${cor}08` }}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">📋</span>
          <div>
            <p className="font-extrabold text-white text-base">{titulo}</p>
            <p className="text-sm mt-0.5 font-medium" style={{ color: `${cor}aa` }}>Respostas orientadoras</p>
          </div>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} style={{ color: cor }} className="text-lg">▾</motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 space-y-3">
              <p className="text-sm italic mb-5" style={{ color: `${cor}88` }}>{aviso}</p>

              {itens.map(item => (
                <motion.div key={item.num} layout className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cor}20` }}>
                  <button
                    onClick={() => setOpenItem(openItem === item.num ? null : item.num)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left"
                    style={{ background: openItem === item.num ? `${cor}14` : `${cor}07` }}
                  >
                    <span className="text-sm font-extrabold px-2.5 py-1 rounded-full mr-3 shrink-0" style={{ background: `${cor}28`, color: cor }}>
                      {item.num}
                    </span>
                    <span className="flex-1 text-white/95 text-sm md:text-base font-medium truncate pr-3">
                      {perguntas.find(p => p.num === item.num)?.texto}
                    </span>
                    <motion.span animate={{ rotate: openItem === item.num ? 180 : 0 }} style={{ color: `${cor}80` }} className="text-sm shrink-0">▾</motion.span>
                  </button>

                  <AnimatePresence>
                    {openItem === item.num && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-4"
                      >
                        <p
                          className="text-white/92 text-sm md:text-base leading-relaxed pt-4"
                          style={{ borderTop: `1px solid ${cor}18` }}
                          dangerouslySetInnerHTML={{
                            __html: item.notas
                              ? item.notas.reduce(
                                  (html, n) => html.replace(
                                    new RegExp(`${n}(?=\\b)`),
                                    `<sup style="color:${cor};font-weight:700">${n}</sup>`
                                  ),
                                  item.resposta
                                )
                              : item.resposta,
                          }}
                        />
                        {item.notas && (
                          <div className="mt-3 pt-3 space-y-1" style={{ borderTop: `1px solid ${cor}12` }}>
                            {item.notas.map(n => {
                              const nota = notas.find(r => r.num === n);
                              return nota ? (
                                <p key={n} className="text-sm leading-relaxed" style={{ color: `${cor}99` }}>
                                  <sup style={{ color: cor }} className="font-bold mr-1">{n}</sup>
                                  {nota.ref}
                                </p>
                              ) : null;
                            })}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <div className="mt-4 pt-4 rounded-xl px-4 py-3" style={{ background: `${cor}07`, border: `1px solid ${cor}15` }}>
                <p className="text-sm font-extrabold uppercase tracking-widest mb-3" style={{ color: `${cor}99` }}>Notas de rodapé</p>
                <ol className="space-y-2 list-none">
                  {notas.map(n => (
                    <li key={n.num} className="text-sm leading-relaxed" style={{ color: '#ffffff80' }}>
                      <sup style={{ color: cor }} className="font-bold mr-1">{n.num}</sup>
                      {n.ref}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── chapter nav ────────────────────────────────────────────────────── */

function ChapterNav({ onPrev, onNext, compact }: { onPrev: () => void; onNext: () => void; compact?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-2 ${compact ? 'py-2 px-2' : 'py-4 px-0'}`}>
      <button
        onClick={onPrev}
        className="flex items-center gap-1.5 rounded-xl px-3 py-2 transition-all hover:scale-105 min-w-0"
        style={{ background: `${GOLD}0a`, border: `1px solid ${GOLD}20` }}
      >
        <motion.span animate={{ x: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ color: GOLD }} className="text-base shrink-0">←</motion.span>
        <div className="text-left min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider leading-none truncate" style={{ color: `${GOLD}70` }}>Anterior</p>
          <p className="text-xs text-white/55 mt-0.5 truncate hidden xs:block">Cap. II</p>
        </div>
      </button>

      <div className="flex items-center gap-1 overflow-hidden">
        {Array.from({ length: 18 }, (_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all ${i > 9 ? 'hidden sm:block' : ''}`}
            style={{ width: i === 2 ? 16 : 5, height: 5, background: i === 2 ? GOLD : `${GOLD}28`, flexShrink: 0 }}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        className="flex items-center gap-1.5 rounded-xl px-3 py-2 transition-all hover:scale-105 min-w-0"
        style={{ background: `${GOLD}0a`, border: `1px solid ${GOLD}20` }}
      >
        <div className="text-right min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider leading-none truncate" style={{ color: `${GOLD}70` }}>Próximo</p>
          <p className="text-xs text-white/55 mt-0.5 truncate hidden xs:block">Cap. IV</p>
        </div>
        <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ color: GOLD }} className="text-base shrink-0">→</motion.span>
      </button>
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────────────────── */

export default function DiscipuladoConfessionalCap3Page() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<1 | 2 | 3>(1);
  const goBack = () => navigate('/discipulado/confessional/cap2');
  const goNext = () => navigate('/discipulado/confessional/cap4');

  return (
    <div className="min-h-screen flex flex-col" style={{ background: BG, color: '#e2e8f0' }}>
      <Navbar />

      {/* hero */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f1e3a 60%, #0a1628 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ width: 3, height: 3, background: GOLD, top: `${10 + (i * 17) % 80}%`, left: `${(i * 13) % 100}%`, opacity: 0.25 }}
              animate={{ opacity: [0.15, 0.45, 0.15] }}
              transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <button
            onClick={() => navigate('/discipulado/confessional/batista')}
            className="flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-80"
            style={{ color: `${GOLD}99` }}
          >
            ← Confissão Batista de 1689
          </button>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: `${GOLD}22`, color: GOLD }}>
              Confissão Batista de 1689
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: '#ffffff10', color: '#ffffff70' }}>
              Capítulo III
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: '#ffffff10', color: '#ffffff70' }}>
              3 Partes
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black mb-3 text-white leading-tight">
            Do Decreto de Deus
          </h1>
          <p className="text-white/80 text-base md:text-xl max-w-2xl leading-relaxed font-medium">
            Discipulado Confessional — Caderno do Aluno · Partes 1 a 3
          </p>

          <div className="mt-6 p-5 rounded-xl" style={{ background: `${GOLD}10`, border: `1px solid ${GOLD}30` }}>
            <p className="text-base text-white/85 leading-relaxed">
              <span style={{ color: GOLD }} className="font-bold">Como usar este material:</span> Leia a introdução, os textos-prova, os textos confessionais e o glossário — depois procure responder cada pergunta por conta própria. Caso tenha dúvidas, acesse a <span style={{ color: GREEN }} className="font-semibold">ajuda</span> disponível em cada pergunta. Ao final, além da aplicação, confira o <span style={{ color: BLUE }} className="font-semibold">gabarito</span> com as respostas orientadoras e as <span style={{ color: BLUE }} className="font-semibold">referências bibliográficas</span> para consulta posterior.
            </p>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="sticky top-0 z-20 px-3 py-3" style={{ background: '#080f22', borderBottom: '1px solid #ffffff12' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-2">
          {([1, 2, 3] as const).map(n => {
            const shortLabels = ['Parte 1', 'Parte 2', 'Parte 3'];
            const subLabels = ['O decreto eterno', 'Eleição e reprovação', 'Meios e liberdade'];
            const cors = [GOLD, GREEN, BLUE];
            const isActive = tab === n;
            return (
              <button
                key={n}
                onClick={() => setTab(n)}
                className="flex flex-col items-center justify-center gap-0.5 px-2 py-2.5 rounded-xl transition-all text-center"
                style={{
                  background: isActive ? `${cors[n - 1]}22` : '#ffffff08',
                  color: isActive ? cors[n - 1] : '#ffffff45',
                  border: `1px solid ${isActive ? cors[n - 1] + '55' : '#ffffff10'}`,
                }}
              >
                <span className="text-sm font-extrabold leading-none">{shortLabels[n - 1]}</span>
                <span className="text-[10px] leading-none mt-0.5 hidden sm:block" style={{ opacity: 0.7 }}>{subLabels[n - 1]}</span>
                {isActive && <span className="w-4 h-0.5 rounded-full mt-1" style={{ background: cors[n - 1] }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* top nav */}
      <div className="max-w-4xl mx-auto w-full px-4" style={{ borderBottom: '1px solid #ffffff08' }}>
        <ChapterNav onPrev={goBack} onNext={goNext} compact />
      </div>

      {/* content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-3 md:px-4 py-6 md:py-10">
        <AnimatePresence mode="wait">
          {tab === 1 && (
            <motion.div key="enc1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <EncontroSection enc={ENCONTRO1} textos={ENCONTRO1.textos} confTexto={CONF_TEXT_P1} />
              <GabaritoSection
                cor={GOLD}
                titulo="Gabarito — Parte 1"
                aviso="As respostas abaixo são orientadoras, não exaustivas. A pergunta 1.7 admite apenas resposta pessoal."
                itens={GABARITO_ENC1}
                notas={NOTAS_RODAPE}
                perguntas={ENCONTRO1.perguntas}
              />
            </motion.div>
          )}

          {tab === 2 && (
            <motion.div key="enc2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <EncontroSection enc={ENCONTRO2} textos={ENCONTRO2.textos} confTexto={CONF_TEXT_P2} />
              <GabaritoSection
                cor={GREEN}
                titulo="Gabarito — Parte 2"
                aviso="As respostas abaixo são orientadoras, não exaustivas. A pergunta 2.7 admite resposta congregacional."
                itens={GABARITO_ENC2}
                notas={NOTAS_RODAPE_ENC2}
                perguntas={ENCONTRO2.perguntas}
              />
            </motion.div>
          )}

          {tab === 3 && (
            <motion.div key="enc3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <EncontroSection enc={ENCONTRO3} textos={ENCONTRO3.textos} confTexto={CONF_TEXT_P3} mostrarTabela />
              <GabaritoSection
                cor={BLUE}
                titulo="Gabarito — Parte 3"
                aviso="As respostas abaixo são orientadoras, não exaustivas. A pergunta 3.8 admite resposta congregacional."
                itens={GABARITO_ENC3}
                notas={NOTAS_RODAPE_ENC3}
                perguntas={ENCONTRO3.perguntas}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* references */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 rounded-2xl p-6"
          style={{ background: '#0b1530', border: '1px solid #ffffff12' }}
        >
          <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#ffffff50' }}>Referências Bibliográficas</h3>
          <ul className="space-y-2">
            {REFERENCIAS.map((r, i) => (
              <li key={i} className="text-white/55 text-sm leading-relaxed">
                <span className="text-white/80 font-semibold">{r.autores}.</span>{' '}
                <span className="italic">{r.titulo}</span>.{' '}
                {r.local}. {r.ano}.{r.vol ? ` ${r.vol}.` : ''}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* chapter navigation bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-2xl px-2"
          style={{ background: '#0b1530', border: '1px solid #ffffff0a' }}
        >
          <ChapterNav onPrev={goBack} onNext={goNext} />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
