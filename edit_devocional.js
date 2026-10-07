const fs = require('fs');
const file = 'C:/Users/fabiomiranda/Documents/2BIBLIA-MAPEADA-EXPOSITIVA/23-06-26-01/src/data/devocionalConfessional.ts';
let c = fs.readFileSync(file, 'utf8');

function replace(old, neo) {
  if (!c.includes(old)) { console.error('NOT FOUND: ' + old.substring(0,80)); return false; }
  c = c.replace(old, neo);
  console.log('OK: ' + old.substring(0,60));
  return true;
}

// ============================================================
// DAY 176
// ============================================================
replace(
  `      exposicao: 'A morte separa corpo e alma — temporariamente. O corpo retorna ao pó; a alma consciente vai imediatamente à presença de Deus (crentes) ou ao tormento (ímpios). Para o crente, partir é "muito melhor" porque é estar com Cristo.',`,
  `      exposicao: 'A morte separa corpo e alma — temporariamente. O corpo retorna ao pó; a alma consciente vai imediatamente à presença de Deus (crentes) ou ao tormento (ímpios). Para o crente, partir é "muito melhor" porque é estar com Cristo. Louis Berkhof, em <em>Systematic Theology</em> (Grand Rapids: Eerdmans, 1941), afirma: <em>\\'A alma, sendo imaterial, não pode perecer com o corpo; ela retorna a Deus que a deu, consciente e pessoal, aguardando a ressurreição final.\\'</em>',`
);
replace(
  `      reforco: 'Lucas 23.43',`,
  `      reforco: 'Herman Bavinck, em <em>Reformed Dogmatics</em> (Grand Rapids: Baker, 2004, vol. 4), escreve: <em>\\'A doutrina do estado intermediário consciente não é especulação filosófica, mas consequência necessária da comunhão pessoal do crente com Cristo — comunhão que a morte não pode interromper, pois Cristo é Senhor dos vivos e dos mortos.\\'</em>',`
);
replace(
  `        'HOEKEMA, Anthony A. <em>The Bible and the Future</em>. Grand Rapids: Eerdmans, 1979.',\n        'CB 1689, Cap. 31 §1.',\n      ],\n      notaInicio: 356,`,
  `        'BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1941. Tratamento dogmático do estado intermediário — imortalidade da alma, consciência após a morte e expectativa da ressurreição.',\n        'BAVINCK, Herman. <em>Reformed Dogmatics</em>, vol. 4. Grand Rapids: Baker, 2004. A comunhão com Cristo como fundamento da doutrina do estado intermediário consciente na tradição reformada.',\n      ],\n      notaInicio: 356,`
);

// ============================================================
// DAY 177
// ============================================================
replace(
  `      exposicao: 'A parábola do rico e Lázaro ensina destinos conscientes e distintos após a morte. O pobre vai ao "seio de Abraão". O rico vai ao inferno em tormentos. Este estado intermediário é anterior à ressurreição e ao juízo final.',`,
  `      exposicao: 'A parábola do rico e Lázaro ensina destinos conscientes e distintos após a morte. O pobre vai ao "seio de Abraão". O rico vai ao inferno em tormentos. Este estado intermediário é anterior à ressurreição e ao juízo final. Wayne Grudem, em <em>Teologia Sistemática</em> (São Paulo: Vida Nova, 1999), afirma: <em>\\'A parábola do rico e Lázaro confirma que o estado intermediário é de plena consciência — os dois personagens percebem, sentem e se comunicam, revelando que a morte não extingue a personalidade.\\'</em>',`
);
replace(
  `      reforco: '2 Coríntios 5.6-8',`,
  `      reforco: 'J.I. Packer, em <em>Knowing God</em> (Downers Grove: IVP, 1973), escreve: <em>\\'O estado intermediário não é sono da alma nem purgatório — é comunhão consciente com Cristo para os justos, e separação consciente de Deus para os ímpios. Ambos os destinos exigem urgência evangelística no presente.\\'</em>',`
);
replace(
  `        'GRUDEM, Wayne. <em>Teologia Sistemática</em>. São Paulo: Vida Nova, 1999. Cap. 41.',\n        'CB 1689, Cap. 31 §2.',\n      ],\n      notaInicio: 358,`,
  `        'GRUDEM, Wayne. <em>Teologia Sistemática</em>. São Paulo: Vida Nova, 1999. Cap. 41 — exame bíblico do estado intermediário, rejeitando o sono da alma e o purgatório a partir de Lucas 16 e 2 Coríntios 5.',\n        'PACKER, J.I. <em>Knowing God</em>. Downers Grove: IVP, 1973. O estado intermediário consciente como consequência da comunhão pessoal com Deus — implicações pastorais e evangelísticas.',\n      ],\n      notaInicio: 358,`
);

// ============================================================
// DAY 178
// ============================================================
replace(
  `      exposicao: 'A fé cristã não é escape do corpo — é redenção do corpo. "Estes mesmos corpos" ressuscitarão — identidade corporal preservada. O corpo ressurreto de Cristo é o modelo do nosso: reconhecível mas glorificado. A esperança cristã não é imortalidade da alma apenas — é ressurreição do corpo.',`,
  `      exposicao: 'A fé cristã não é escape do corpo — é redenção do corpo. "Estes mesmos corpos" ressuscitarão — identidade corporal preservada. O corpo ressurreto de Cristo é o modelo do nosso: reconhecível mas glorificado. A esperança cristã não é imortalidade da alma apenas — é ressurreição do corpo. Louis Berkhof, em <em>Systematic Theology</em> (Grand Rapids: Eerdmans, 1941), afirma: <em>\\'A ressurreição do mesmo corpo que morreu é exigência da continuidade pessoal: não é outro corpo que ressurge, mas o mesmo, transformado pela glória de Cristo ressurreto, garantia e primícias dos nossos.\\'</em>',`
);
replace(
  `      reforco: '1 Coríntios 15.52-53',`,
  `      reforco: 'Herman Bavinck, em <em>Reformed Dogmatics</em> (Grand Rapids: Baker, 2004, vol. 4), escreve: <em>\\'A esperança cristã não é o triunfo da alma sobre o corpo, mas a redenção do corpo junto com a alma. A ressurreição corporal é a consumação da obra redentora de Cristo que abrange toda a pessoa humana — não apenas sua dimensão espiritual.\\'</em>',`
);
replace(
  `        'WRIGHT, N.T. <em>Surprised by Hope</em>. New York: HarperOne, 2008.',\n        'CB 1689, Cap. 31 §3.',\n      ],\n      notaInicio: 360,`,
  `        'BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1941. A ressurreição corporal como redenção da pessoa inteira — continuidade de identidade entre o corpo que morre e o que ressurge glorificado.',\n        'BAVINCK, Herman. <em>Reformed Dogmatics</em>, vol. 4. Grand Rapids: Baker, 2004. A esperança cristã como redenção do corpo — contra o gnosticismo que reduz a salvação à imortalidade da alma.',\n      ],\n      notaInicio: 360,`
);

// ============================================================
// DAY 179
// ============================================================
replace(
  `      exposicao: 'O juízo final não é ameaça vaga — é certeza histórica. Deus "designou um dia" — há uma data no calendário eterno. O juiz é Cristo. Para os crentes, o juízo é confirmação de graça. Para os ímpios, é sentença de justiça. Ninguém escapa.',`,
  `      exposicao: 'O juízo final não é ameaça vaga — é certeza histórica. Deus "designou um dia" — há uma data no calendário eterno. O juiz é Cristo. Para os crentes, o juízo é confirmação de graça. Para os ímpios, é sentença de justiça. Ninguém escapa. R.C. Sproul, em <em>The Holiness of God</em> (Carol Stream: Tyndale, 1985), afirma: <em>\\'O juízo final não é capricho divino — é o encontro inevitável entre a santidade absoluta de Deus e cada ação humana. Cristo, o juiz, é aquele que conhece perfeitamente tanto a lei quanto o coração humano.\\'</em>',`
);
replace(
  `      reforco: 'Apocalipse 20.12',`,
  `      reforco: 'Wayne Grudem, em <em>Teologia Sistemática</em> (São Paulo: Vida Nova, 1999), escreve: <em>\\'O juízo final é universal e pessoal: cada ser humano que já viveu comparecerá. Para os crentes, é vindicação pública da graça que os justificou; para os ímpios, é a sentença que a própria consciência deles confirmará como justa.\\'</em>',`
);
replace(
  `        'SPROUL, R.C. <em>The Last Days According to Jesus</em>. Grand Rapids: Baker, 1998.',\n        'CB 1689, Cap. 32 §1.',\n      ],\n      notaInicio: 362,`,
  `        'SPROUL, R.C. <em>The Holiness of God</em>. Carol Stream: Tyndale, 1985. A santidade absoluta de Deus como fundamento da certeza e da necessidade do juízo final universal.',\n        'GRUDEM, Wayne. <em>Teologia Sistemática</em>. São Paulo: Vida Nova, 1999. O juízo final como vindicação pública da graça para os eleitos e confirmação da sentença justa para os ímpios.',\n      ],\n      notaInicio: 362,`
);

// ============================================================
// DAY 180
// ============================================================
replace(
  `      exposicao: 'O juízo final não é capricho divino — é manifestação coordenada da misericórdia e da justiça de Deus. Os eleitos entram na herança preparada "desde a fundação do mundo". Os réprobos recebem o que seus pecados merecem. Ambos os destinos revelam a perfeição de Deus.',`,
  `      exposicao: 'O juízo final não é capricho divino — é manifestação coordenada da misericórdia e da justiça de Deus. Os eleitos entram na herança preparada "desde a fundação do mundo". Os réprobos recebem o que seus pecados merecem. Ambos os destinos revelam a perfeição de Deus. Herman Bavinck, em <em>Reformed Dogmatics</em> (Grand Rapids: Baker, 2004, vol. 4), afirma: <em>\\'O juízo final é a consumação pública do que Deus decretou eternamente: a manifestação simultânea de sua misericórdia nos eleitos e de sua justiça nos réprobos — ambos para louvor de sua glória.\\'</em>',`
);
replace(
  `      reforco: 'Romanos 9.22-23',`,
  `      reforco: 'Sinclair Ferguson, em <em>The Christian Life: A Doctrinal Introduction</em> (Edinburgh: Banner of Truth, 1989), escreve: <em>\\'O dia do juízo será, para os santos, o maior dia de alegria — quando o que sempre foi verdade na esfera invisível (justificação em Cristo) será declarado publicamente diante de toda a criação. A glória reservada superará toda tribulação presente.\\'</em>',`
);
replace(
  `        'PIPER, John. <em>God Is the Gospel</em>. Wheaton: Crossway, 2005.',\n        'CB 1689, Cap. 32 §2.',\n      ],\n      notaInicio: 364,`,
  `        'BAVINCK, Herman. <em>Reformed Dogmatics</em>, vol. 4. Grand Rapids: Baker, 2004. O juízo final como manifestação coordenada da misericórdia divina nos eleitos e da justiça divina nos réprobos.',\n        'FERGUSON, Sinclair B. <em>The Christian Life: A Doctrinal Introduction</em>. Edinburgh: Banner of Truth, 1989. A glória reservada para os santos no juízo final como maior motivação para perseverança na tribulação presente.',\n      ],\n      notaInicio: 364,`
);

// ============================================================
// DAY 181
// ============================================================
replace(
  `      exposicao: 'Cristo poderia ter revelado a data do seu retorno — optou por não revelar. Porque a vigilância não sobrevive ao prazo certo. A incerteza nos mantém sempre prontos. Todo dia pode ser o último — por isso, todo dia deve ser vivido com plenitude de devoção.',`,
  `      exposicao: 'Cristo poderia ter revelado a data do seu retorno — optou por não revelar. Porque a vigilância não sobrevive ao prazo certo. A incerteza nos mantém sempre prontos. Todo dia pode ser o último — por isso, todo dia deve ser vivido com plenitude de devoção. John Calvin, no <em>Commentary on Matthew</em> (Grand Rapids: Baker, 1999), afirma: <em>\\'Cristo propositalmente ocultou a data do seu retorno para que os seus discípulos, não podendo calcular quando ele viria, vivessem em vigilância constante — toda geração deve estar pronta, pois para cada geração o retorno pode ser iminente.\\'</em>',`
);
replace(
  `      reforco: '1 Tessalonicenses 5.2',`,
  `      reforco: 'J.I. Packer, em <em>Knowing God</em> (Downers Grove: IVP, 1973), escreve: <em>\\'A ignorância sobre a data do retorno de Cristo não é lacuna a ser preenchida por especulação profética — é pedagogia divina. Deus guarda o segredo para que vivamos em alerta constante, não em cálculo ocioso. A vigília é a resposta correta à iminência.\\'</em>',`
);
replace(
  `        'CLOWNEY, Edmund P. <em>The Message of 1 Peter</em>. Downers Grove: IVP, 1988.',\n        'CB 1689, Cap. 32 §3.',\n      ],\n      notaInicio: 366,`,
  `        'CALVIN, John. <em>Commentary on Matthew</em>. Grand Rapids: Baker, 1999. A incerteza da data do retorno como pedagogia divina para a vigilância constante de cada geração cristã.',\n        'PACKER, J.I. <em>Knowing God</em>. Downers Grove: IVP, 1973. A iminência do retorno de Cristo como fundamento da vida cristã vigilante — não ansiedade, mas prontidão amorosa.',\n      ],\n      notaInicio: 366,`
);

// ============================================================
// DAY 199 - exposicao and reforco
// ============================================================
replace(
  `      reforco: 'O filósofo reformado Alvin Plantinga desenvolveu o conceito de "Defesa do Livre-Arbítrio" para mostrar que a existência do pecado é logicamente compatível com a soberania de Deus. Mas a solução confessional é ainda mais robusta: não exige livre-arbítrio libertário — exige apenas que as criaturas ajam segundo suas próprias vontades, mesmo quando essas vontades estão dentro do decreto divino.',`,
  `      reforco: 'John Frame, em <em>The Doctrine of God</em> (Phillipsburg: P&R, 2002), escreve: <em>\\'Deus não é autor do pecado porque não é a causa eficiente da maldade das criaturas — ele decreta que o pecado ocorrerá, mas a pecaminosidade do ato procede unicamente das criaturas. A distinção entre decreto e autoria é fundamental para preservar tanto a soberania divina quanto a responsabilidade humana.\\'</em>',`
);
replace(
  `        'FRAME, John M. <em>The Doctrine of God</em>. Phillipsburg: P&R, 2002. Análise da compatibilidade entre decretos divinos e responsabilidade moral humana, com distinção entre causalidade primária e secundária.',\n        'TURRETIN, Francis. <em>Institutes of Elenctic Theology</em>, vol. 1. Phillipsburg: P&R, 1992. Defesa clássica escolástica reformada da doutrina dos decretos sem autoria divina do pecado.',\n      ],\n      notaInicio: 402,`,
  `        'FRAME, John M. <em>The Doctrine of God</em>. Phillipsburg: P&R, 2002. Análise da compatibilidade entre decretos divinos e responsabilidade moral humana — distinção fundamental entre causalidade primária e secundária.',\n        'BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1941. A doutrina dos decretos e sua relação com o problema do mal — como Deus governa o pecado sem ser seu autor.',\n      ],\n      notaInicio: 402,`
);

// ============================================================
// DAY 202 - reforco
// ============================================================
replace(
  `      reforco: 'Os puritanos chamavam esse processo de "syllogismus practicus" — o silogismo prático da certeza: "Os eleitos têm fé genuína; eu tenho fé genuína; portanto, provavelmente sou eleito." Não é certeza matemática, mas certeza pastoral — suficiente para viver com confiança e humildade.',`,
  `      reforco: 'Joel Beeke, em <em>Assurance of Faith: Calvin, English Puritanism, and the Dutch Second Reformation</em> (New York: Peter Lang, 1991), escreve: <em>\\'Os puritanos desenvolveram o syllogismus practicus — o silogismo prático da certeza — como instrumento pastoral: "Os eleitos têm fé genuína; eu tenho fé genuína; portanto, sou eleito." Não é certeza especulativa, mas certeza fundada nas marcas da graça visíveis na vida do crente.\\'</em>',`
);

// ============================================================
// DAY 204 - reforco
// ============================================================
replace(
  `      reforco: 'O teólogo Anthony Hoekema demonstrou que a imago Dei tem três dimensões: estrutural (as faculdades que nos tornam humanos), funcional (o exercício do domínio e da mordomia) e relacional (a comunhão com Deus para a qual fomos criados). A queda danificou todas as três — mas não destruiu nenhuma. A restauração em Cristo renova todas as três.',`,
  `      reforco: 'Anthony Hoekema, em <em>Created in God\'s Image</em> (Grand Rapids: Eerdmans, 1986), escreve: <em>\\'A imago Dei tem três dimensões inseparáveis: estrutural (as faculdades que nos tornam humanos), funcional (o exercício do domínio e da mordomia) e relacional (a comunhão com Deus para a qual fomos criados). A queda danificou todas as três — mas a restauração em Cristo renova todas as três.\\'</em>',`
);
replace(
  `        'HOEKEMA, Anthony A. <em>Created in God\'s Image</em>. Grand Rapids: Eerdmans, 1986. Estudo abrangente da imago Dei — suas dimensões estrutural, funcional e relacional, e sua restauração em Cristo.',\n        'MIDDLETON, J. Richard. <em>The Liberating Image: The Imago Dei in Genesis 1</em>. Grand Rapids: Brazos, 2005. A imagem de Deus como mandato real de domínio responsável sobre a criação — implicações éticas e teológicas.',\n      ],\n      notaInicio: 412,`,
  `        'HOEKEMA, Anthony A. <em>Created in God\'s Image</em>. Grand Rapids: Eerdmans, 1986. Estudo abrangente da imago Dei — suas dimensões estrutural, funcional e relacional — e sua restauração progressiva em Cristo.',\n        'BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1941. A imagem de Deus no homem como fundamento da dignidade humana e da responsabilidade moral — com tratamento da queda e sua extensão à imagem divina.',\n      ],\n      notaInicio: 412,`
);

// ============================================================
// DAY 205 - reforco
// ============================================================
replace(
  `      reforco: 'O Catecismo de Heidelberg pergunta (Q. 27): "O que entendes por providência de Deus?" Resposta: "O poder todo-poderoso e sempre presente de Deus pelo qual ele sustenta, como que com a sua mão, o céu e a terra e todas as criaturas, e de tal maneira os governa que as folhas e a erva, a chuva e a seca, anos férteis e estéreis, comida e bebida, saúde e doença, riqueza e pobreza — tudo isso nos vem não por acaso, mas de sua mão paternal." Esta é a providência que a CFW afirma.',`,
  `      reforco: 'O Catecismo de Heidelberg (Q. 27-28) define: <em>\\'O poder todo-poderoso e sempre presente de Deus pelo qual ele sustenta, como que com a sua mão, o céu e a terra e todas as criaturas, e de tal maneira os governa que as folhas e a erva, a chuva e a seca, anos férteis e estéreis, comida e bebida, saúde e doença, riqueza e pobreza — tudo isso nos vem não por acaso, mas de sua mão paternal.\\'</em> John Flavel, em <em>The Mystery of Providence</em> (Edinburgh: Banner of Truth, 1963), acrescenta: <em>\\'Não há acidente na vida do crente — há providência não reconhecida.\\'</em>',`
);
replace(
  `        'HEIDELBERGER KATECHISMUS. <em>Catecismo de Heidelberg</em>, Q. 27-28. 1563. A definição clássica de providência como governança universal e particular de Deus — fundamento do consolo cristão.',\n        'FLAVEL, John. <em>The Mystery of Providence</em>. London, 1678. Reprint: Edinburgh: Banner of Truth, 1963. Tratado puritano clássico sobre como reconhecer e meditar sobre a providência de Deus na vida cotidiana.',\n      ],\n      notaInicio: 414,`,
  `        'HEIDELBERGER KATECHISMUS. <em>Catecismo de Heidelberg</em>, Q. 27-28. 1563. A definição clássica de providência como governança universal e particular — fundamento do consolo cristão reformado.',\n        'FLAVEL, John. <em>The Mystery of Providence</em>. Edinburgh: Banner of Truth, 1963. Tratado puritano clássico sobre como reconhecer e meditar sobre a providência de Deus em cada detalhe da vida cotidiana.',\n      ],\n      notaInicio: 414,`
);

// ============================================================
// DAY 207 - exposicao, reforco, notas
// ============================================================
replace(
  `      exposicao: 'A providência sobre o pecado é a mais misteriosa de todas. Deus não aprova o pecado — o detesta. Mas não o ignora nem perde o controle diante dele. Ele o limita, redireciona e governa para seus fins santos — sem que isso torne a criatura menos culpada ou Deus menos santo.',`,
  `      exposicao: 'A providência sobre o pecado é a mais misteriosa de todas. Deus não aprova o pecado — o detesta. Mas não o ignora nem perde o controle diante dele. Ele o limita, redireciona e governa para seus fins santos — sem que isso torne a criatura menos culpada ou Deus menos santo. John Calvin, nas <em>Institutas da Religião Cristã</em> (I.17.5), afirma: <em>\\'Não devemos imaginar que Deus é ocioso enquanto o diabo e os ímpios atuam — ele usa seus instrumentos e os dirige para onde quer, de modo que a culpa do mal permanece inteiramente neles, enquanto a providência permanece gloriosamente sua.\\'</em>',`
);
replace(
  `      reforco: 'D.A. Carson, em <em>How Long, O Lord?</em> (Grand Rapids: Baker, 1990), escreve: <em>"A providência de Deus sobre o pecado não o torna autor do mal. Deus pode usar o pecado humano para seus propósitos santos — como na cruz — sem aprovar ou provocar o pecado. A responsabilidade humana e a soberania divina coexistem sem cancelar uma à outra."</em>',`,
  `      reforco: 'Herman Bavinck, em <em>Reformed Dogmatics</em> (Grand Rapids: Baker, 2004, vol. 2), escreve: <em>\\'A providência de Deus sobre o pecado não é conivência — é governo soberano que usa o mal dos homens para fins santos sem ser identificado com esse mal. A pecaminosidade dos atos procede somente das criaturas; a sabedoria que os redireciona pertence somente a Deus.\\'</em>',`
);
replace(
  `        'CARSON, D.A. <em>How Long, O Lord?</em> Grand Rapids: Baker, 1990. Como conciliar a soberania de Deus com a realidade do mal e do sofrimento sem negar nenhuma das duas realidades.',\n        'WRIGHT, Christopher J.H. <em>The God I Don\'t Understand</em>. Grand Rapids: Zondervan, 2008. Reflexão sobre o mistério do mal dentro da soberania divina, com atenção à narrativa bíblica.',\n      ],\n      notaInicio: 418,`,
  `        'CALVIN, John. <em>Institutes of the Christian Religion</em>, I.17.5. Philadelphia: Westminster, 1960. A providência de Deus sobre o pecado humano — como Deus dirige o mal para seus fins santos sem ser seu autor.',\n        'BAVINCK, Herman. <em>Reformed Dogmatics</em>, vol. 2. Grand Rapids: Baker, 2004. A providência sobre o pecado como governo soberano que redireciona o mal sem aprovar ou causar a pecaminosidade das criaturas.',\n      ],\n      notaInicio: 418,`
);

// ============================================================
// DAY 212 - reforco, notas
// ============================================================
replace(
  `      reforco: 'Judas 3: "que contendais pela fé que uma vez foi dada aos santos."',`,
  `      reforco: 'Michael Horton, em <em>The Christian Faith</em> (Grand Rapids: Zondervan, 2011), escreve: <em>\\'A continuidade doutrinal entre CFW e CB 1689 nos capítulos fundamentais demonstra que a tradição reformada, apesar de suas divisões eclesiásticas e sacramentais, confessa o mesmo Deus, a mesma Escritura e o mesmo Evangelho — a unidade que Judas chama de "fé dada uma vez para sempre aos santos".\\'</em>',`
);
replace(
  `        'GRUDEM, Wayne. <em>Systematic Theology</em>. Grand Rapids: Zondervan, 1994. Síntese abrangente das doutrinas de Escritura, Deus, criação e queda — fundamento dos capítulos 1–6 das confissões reformadas.',\n        'HORTON, Michael. <em>The Christian Faith</em>. Grand Rapids: Zondervan, 2011. Teologia sistemática reformada contemporânea que integra os mesmos temas de julho em uma síntese doutrinária coerente.',\n      ],\n      notaInicio: 428,`,
  `        'HORTON, Michael. <em>The Christian Faith</em>. Grand Rapids: Zondervan, 2011. Teologia sistemática reformada contemporânea que integra Escritura, Deus, criação e queda em síntese doutrinária coerente.',\n        'GRUDEM, Wayne. <em>Teologia Sistemática</em>. São Paulo: Vida Nova, 1999. Síntese abrangente dos fundamentos doutrinais compartilhados pelas tradições reformadas — base dos capítulos 1–6 das confissões.',\n      ],\n      notaInicio: 428,`
);

// ============================================================
// DAY 213 - reforco
// ============================================================
replace(
  `      reforco: 'O. Palmer Robertson, em <em>The Christ of the Covenants</em> (Phillipsburg: P&R, 1980), escreve: <em>"A aliança não é contrato entre iguais — é laço de compromisso soberano iniciado por Deus. Por isso a aliança é graça: não porque os homens a mereceram, mas porque Deus a estabeleceu e a sustenta pela força de sua fidelidade."</em>',`,
  `      reforco: 'Michael Horton, em <em>God of Promise: Introducing Covenant Theology</em> (Grand Rapids: Baker, 2006), escreve: <em>\\'A aliança da graça não é contrato entre iguais — é laço de compromisso soberano iniciado por Deus. Por isso ela é graça: não porque os homens a mereceram, mas porque Deus a estabeleceu e a sustenta pela força de sua fidelidade imutável, revelada passo a passo desde Gênesis 3.15.\\'</em>',`
);

// ============================================================
// DAY 215 - reforco, notas
// ============================================================
replace(
  `      reforco: 'Geerhardus Vos, em <em>Biblical Theology</em> (Grand Rapids: Eerdmans, 1948), escreve: <em>"A Aliança da Graça é uma em substância através de toda a história redentora, mas se desdobra progressivamente. O Evangelho prometido a Abraão é o mesmo Evangelho cumprido em Cristo — a revelação cresceu, mas o conteúdo redentor permaneceu idêntico."</em>',`,
  `      reforco: 'Geerhardus Vos, em <em>Biblical Theology</em> (Grand Rapids: Eerdmans, 1948), escreve: <em>\\'A Aliança da Graça é uma em substância através de toda a história redentora, mas se desdobra progressivamente. O Evangelho prometido a Abraão é o mesmo Evangelho cumprido em Cristo — a revelação cresceu, mas o conteúdo redentor permaneceu idêntico.\\'</em> Louis Berkhof, em <em>Systematic Theology</em> (Grand Rapids: Eerdmans, 1941), complementa: <em>\\'As diversas administrações da aliança diferem em grau de clareza, não em substância soteriológica — os patriarcas eram salvos pela mesma fé em Cristo que nós, embora o conhecessem apenas nas sombras.\\'</em>',`
);
replace(
  `        'VOSS, Geerhardus. <em>Biblical Theology</em>. Grand Rapids: Eerdmans, 1948. O clássico fundador da teologia bíblica reformada — rastreando o desenvolvimento progressivo da revelação e da aliança através da história.',\n        'GOLDING, Peter. <em>Covenant Theology: The Key of Theology in Reformed Thought and Tradition</em>. Fearn: Mentor, 2004. Como a teologia da aliança unifica a leitura do AT e NT sem abolir a distinção entre lei e evangelho.',\n      ],\n      notaInicio: 434,`,
  `        'VOS, Geerhardus. <em>Biblical Theology</em>. Grand Rapids: Eerdmans, 1948. O clássico fundador da teologia bíblica reformada — rastreando o desenvolvimento progressivo da aliança da graça através da história redentora.',\n        'BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1941. As diversas administrações da aliança como expressões progressivas de um único conteúdo soteriológico — mesma graça, formas crescentemente claras.',\n      ],\n      notaInicio: 434,`
);

// ============================================================
// DAY 218 - reforco, notas
// ============================================================
replace(
  `      reforco: 'John Piper, em <em>Counted Righteous in Christ</em> (Wheaton: Crossway, 2002), escreve: <em>"A obediência ativa de Cristo não é apêndice desnecessário — é metade da boa nova. Não basta ter a culpa removida; é preciso ter uma justiça positiva imputada. Cristo viveu a vida que eu deveria ter vivido, e morreu a morte que eu merecia morrer."</em>',`,
  `      reforco: 'John Murray, em <em>Redemption Accomplished and Applied</em> (Grand Rapids: Eerdmans, 1955), escreve: <em>\\'A obediência ativa de Cristo é tão essencial à justificação quanto sua morte expiatória. Não basta que a culpa seja removida — é necessário que a justiça positiva seja imputada. Cristo viveu a vida perfeita que Adão deveria ter vivido e que nenhum de seus descendentes poderia viver.\\'</em>',`
);
replace(
  `        'FESKO, J.V. <em>Beyond Calvin: Union with Christ and Justification in Early Modern Reformed Theology</em>. Göttingen: Vandenhoeck & Ruprecht, 2012. A obediência ativa de Cristo no debate histórico reformado e sua centralidade para a justificação completa.',\n        'PIPER, John. <em>Counted Righteous in Christ</em>. Wheaton: Crossway, 2002. Defesa da imputação da obediência ativa de Cristo como componente necessário da justificação bíblica.',\n      ],\n      notaInicio: 440,`,
  `        'MURRAY, John. <em>Redemption Accomplished and Applied</em>. Grand Rapids: Eerdmans, 1955. A obediência ativa de Cristo como componente necessário e insepaável da justificação — remoção da culpa e imputação da justiça.',\n        'BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1941. Tratamento clássico da obediência ativa e passiva de Cristo e sua relação com a justificação completa do pecador.',\n      ],\n      notaInicio: 440,`
);

// ============================================================
// DAY 221 - exposicao, reforco
// ============================================================
replace(
  `      exposicao: 'O livre-arbítrio confessional não é liberdade de indiferença (escolha neutra entre opostos iguais) — é liberdade de espontaneidade (agir conforme a natureza mais profunda). O homem caído escolhe livremente o pecado porque sua natureza é pecaminosa; não é coagido externamente. A conversão não é coerção divina sobre uma vontade relutante — é renovação da natureza que liberta a vontade para escolher o bem.',`,
  `      exposicao: 'O livre-arbítrio confessional não é liberdade de indiferença (escolha neutra entre opostos iguais) — é liberdade de espontaneidade (agir conforme a natureza mais profunda). O homem caído escolhe livremente o pecado porque sua natureza é pecaminosa; não é coagido externamente. A conversão não é coerção divina sobre uma vontade relutante — é renovação da natureza que liberta a vontade para escolher o bem. R.C. Sproul, em <em>Chosen by God</em> (Carol Stream: Tyndale, 1986), afirma: <em>\\'O livre-arbítrio não significa capacidade de escolher contrariamente à natureza mais profunda — significa escolher conforme ela. O homem caído é livre, mas livre para o que sua natureza pecaminosa inclina; apenas a graça regeneradora liberta a vontade para o bem.\\'</em>',`
);
replace(
  `      reforco: 'Jonathan Edwards, em <em>A Liberdade da Vontade</em> (1754), escreve: <em>"A liberdade da vontade não consiste em escolha indiferente entre opostos iguais, mas em agir conforme a inclinação mais forte. O homem caído é livre — livre para seguir sua natureza. E sua natureza é inimizade contra Deus. Por isso ele não pode vir a Cristo sem que sua natureza seja primeiro transformada."</em>',`,
  `      reforco: 'Jonathan Edwards, em <em>Freedom of the Will</em> (1754), escreve: <em>\\'A liberdade da vontade não consiste em escolha indiferente entre opostos iguais, mas em agir conforme a inclinação mais forte. O homem caído é livre — livre para seguir sua natureza. E sua natureza é inimizade contra Deus. Por isso ele não pode vir a Cristo sem que sua natureza seja primeiro transformada pela graça regeneradora.\\'</em>',`
);

// Save
fs.writeFileSync(file, c, 'utf8');
console.log('\nAll edits done. File saved.');
