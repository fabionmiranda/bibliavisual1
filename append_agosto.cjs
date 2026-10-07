const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/devocionalConfessional.ts');
let content = fs.readFileSync(filePath, 'utf8');

const agosto = `
function gerarDiasAgosto_A(): DiaConfessional[] {
  const dias: Omit<DiaConfessional, 'reflexoes'>[] = [
    {
      dia: 213,
      data: '01/08',
      titulo: 'A Aliança da Graça — CFW Cap. 7 §1',
      subtitulo: 'Deus desce ao homem caído',
      pericope: 'Gênesis 3.15; Hebreus 8.6',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 7 §1',
      cfwRef: 'CFW Cap. 7 §1',
      confissaoTexto: 'A distância entre Deus e a criatura é tão grande que, embora as criaturas racionais lhe devam obediência como seu Criador, elas jamais poderiam ter qualquer fruto ou recompensa de Deus, exceto por alguma condescendência voluntária da parte de Deus — o que lhe agradou expressar por meio de aliança.',
      notaInicio: 430,
      notas: [
        'ROBERTSON, O. Palmer. <em>The Christ of the Covenants</em>. Phillipsburg: P&R, 1980. Obra clássica sobre a teologia das alianças — a distância Criador-criatura e a necessidade de condescendência divina.',
      ],
    },
    {
      dia: 214,
      data: '02/08',
      titulo: 'A Aliança das Obras — CFW Cap. 7 §2',
      subtitulo: 'O primeiro Adão e a promessa condicional',
      pericope: 'Oséias 6.7; Romanos 5.12-14',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 7 §2',
      cfwRef: 'CFW Cap. 7 §2',
      confissaoTexto: 'A primeira aliança feita com o homem foi a aliança das obras, na qual a vida foi prometida a Adão e, nele, à sua posteridade, sob a condição de obediência perfeita e pessoal.',
      notaInicio: 432,
      notas: [
        'MEREDITH, G. I. <em>The Covenant of Works</em>. In: HORTON, Michael (ed.). <em>The Westminster Confession into the 21st Century</em>. Vol. 2. Ross-shire: Mentor, 2004.',
      ],
    },
    {
      dia: 215,
      data: '03/08',
      titulo: 'A Aliança da Graça — CFW Cap. 7 §3',
      subtitulo: 'Cristo, o segundo Adão',
      pericope: 'Gênesis 3.15; 1 Coríntios 15.22',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 7 §3',
      cfwRef: 'CFW Cap. 7 §3',
      confissaoTexto: 'O homem, tendo caído pela transgressão, Deus se agradou de fazer uma segunda aliança, comumente chamada de aliança da graça; na qual ele oferece gratuitamente vida e salvação por Jesus Cristo a pecadores, requerendo deles fé nele para que sejam salvos.',
      notaInicio: 434,
      notas: [
        'HORTON, Michael. <em>God of Promise: Introducing Covenant Theology</em>. Grand Rapids: Baker, 2006. Introdução acessível à teologia das alianças reformada.',
      ],
    },
    {
      dia: 216,
      data: '04/08',
      titulo: 'Uma só aliança, dois testamentos — CFW Cap. 7 §5-6',
      subtitulo: 'A continuidade da aliança da graça',
      pericope: 'Gálatas 3.7-9; Hebreus 13.8',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 7 §5-6',
      cfwRef: 'CFW Cap. 7 §5-6',
      confissaoTexto: 'Esta aliança foi administrada de maneira diferente no tempo da lei e no tempo do evangelho; sob a lei era administrada por promessas, profecias, sacrifícios, circuncisão, o cordeiro pascal e outros tipos e ordenanças. Sob o evangelho, quando Cristo, a substância, foi exibido, as ordenanças em que esta aliança é dispensada são a pregação da Palavra e a administração dos sacramentos do Batismo e da Ceia do Senhor.',
      notaInicio: 436,
      notas: [
        'VERN S. POYTHRESS. <em>The Shadow of Christ in the Law of Moses</em>. Phillipsburg: P&R, 1991. Como os tipos e sombras do AT apontam para Cristo, substância da aliança da graça.',
      ],
    },
    {
      dia: 217,
      data: '05/08',
      titulo: 'Cristo Mediador — CFW Cap. 8 §1',
      subtitulo: 'Quem é aquele que Deus escolheu?',
      pericope: 'João 1.1-14; Colossenses 1.19-20',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 8 §1',
      cfwRef: 'CFW Cap. 8 §1',
      confissaoTexto: 'Aprouve a Deus, em seu eterno propósito, escolher e ordenar o Senhor Jesus, seu Filho unigênito, para ser o Mediador entre Deus e o homem — o Profeta, Sacerdote e Rei; cabeça e Salvador de sua Igreja; herdeiro de todas as coisas e Juiz do mundo.',
      notaInicio: 438,
      notas: [
        'BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1938. O triple munus Christi — Profeta, Sacerdote e Rei — e seu papel como Mediador.',
      ],
    },
    {
      dia: 218,
      data: '06/08',
      titulo: 'As duas naturezas de Cristo — CFW Cap. 8 §2',
      subtitulo: 'Verdadeiramente Deus e verdadeiramente homem',
      pericope: 'João 1.14; Filipenses 2.6-8',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 8 §2',
      cfwRef: 'CFW Cap. 8 §2',
      confissaoTexto: 'O Filho de Deus, a segunda pessoa da Trindade, sendo verdadeiro e eterno Deus, da mesma substância e igual ao Pai, quando a plenitude do tempo chegou, tomou sobre si a natureza humana, com todas as suas propriedades essenciais e enfermidades comuns, contudo sem pecado; sendo concebido pelo poder do Espírito Santo no ventre da virgem Maria, da substância dela.',
      notaInicio: 440,
      notas: [
        'MACLEOD, Donald. <em>The Person of Christ</em>. Downers Grove: IVP, 1998. As duas naturezas de Cristo segundo a cristologia de Calcedônia e a Confissão de Westminster.',
      ],
    },
    {
      dia: 219,
      data: '07/08',
      titulo: 'A unidade da pessoa de Cristo — CFW Cap. 8 §2b',
      subtitulo: 'Duas naturezas, uma só pessoa',
      pericope: 'Romanos 9.5; 1 Timóteo 2.5',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 8 §2 (cont.)',
      cfwRef: 'CFW Cap. 8 §2',
      confissaoTexto: 'Assim, as duas naturezas inteiras, perfeitas e distintas — a divindade e a humanidade — foram inseparável e sem confusão unidas em uma pessoa, sem conversão, composição ou mistura. Esta pessoa é verdadeiro Deus e verdadeiro homem, mas um Cristo, o único Mediador entre Deus e o homem.',
      notaInicio: 442,
      notas: [
        'WELLUM, Stephen. <em>God the Son Incarnate</em>. Wheaton: Crossway, 2016. Defesa contemporânea da cristologia calcedoniana com aplicações pastorais e apologéticas.',
      ],
    },
    {
      dia: 220,
      data: '08/08',
      titulo: 'A santificação do Espírito — CFW Cap. 8 §3a',
      subtitulo: 'Cristo, ungido e equipado para sua missão',
      pericope: 'Lucas 4.18; João 3.34',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 8 §3',
      cfwRef: 'CFW Cap. 8 §3',
      confissaoTexto: 'O Senhor Jesus, em sua natureza humana assim unida à divina, foi santificado e ungido com o Espírito Santo acima de toda medida; tendo em si todos os tesouros da sabedoria e do conhecimento; tendo agradado ao Pai que nele habitasse toda a plenitude — para que, sendo santo, inofensivo, imaculado e cheio de graça e verdade, fosse totalmente apto para executar o ofício de Mediador e Fiador.',
      notaInicio: 444,
      notas: [
        'SINCLAIR, Ferguson. <em>The Holy Spirit</em>. Downers Grove: IVP, 1996. O papel do Espírito Santo na vida e ministério de Cristo, e a unção para o ofício de Mediador.',
      ],
    },
  ];
  return dias.map(bloco);
}

function gerarDiasAgosto_B(): DiaConfessional[] {
  const dias: Omit<DiaConfessional, 'reflexoes'>[] = [
    {
      dia: 221,
      data: '09/08',
      titulo: 'A obediência ativa de Cristo — CFW Cap. 8 §4',
      subtitulo: 'Jesus fez o que Adão não fez',
      pericope: 'Mateus 3.15; Romanos 5.19',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 8 §4',
      cfwRef: 'CFW Cap. 8 §4',
      confissaoTexto: 'Este ofício o Senhor Jesus tomou sobre si muitíssimo voluntariamente; para que, a fim de executá-lo, fosse feito sob a lei e a cumprisse perfeitamente; e padeceu os mais angustiantes tormentos em sua alma, e os mais dolorosos sofrimentos em seu corpo; foi crucificado e morreu, foi sepultado e permaneceu sob o poder da morte — contudo sem ver corrupção.',
      notaInicio: 446,
      notas: [
        'FESKO, J. V. <em>Beyond Calvin: Union with Christ and Justification in Early Modern Reformed Theology</em>. Göttingen: Vandenhoeck & Ruprecht, 2012. A obediência ativa e passiva de Cristo e seu papel na justificação.',
      ],
    },
    {
      dia: 222,
      data: '10/08',
      titulo: 'Ressurreição e ascensão — CFW Cap. 8 §4b',
      subtitulo: 'Cristo exaltado à destra do Pai',
      pericope: 'Atos 2.24; Efésios 1.20-23',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 8 §4 (cont.)',
      cfwRef: 'CFW Cap. 8 §4',
      confissaoTexto: 'No terceiro dia ele ressuscitou dos mortos com o mesmo corpo com que sofreu; com o mesmo corpo também subiu ao céu e aí se assenta à destra de seu Pai, intercedendo; e voltará para julgar homens e anjos no fim do mundo.',
      notaInicio: 448,
      notas: [
        'LETHAM, Robert. <em>The Work of Christ</em>. Downers Grove: IVP, 1993. A sequência profética de humilhação e exaltação de Cristo na teologia reformada.',
      ],
    },
    {
      dia: 223,
      data: '11/08',
      titulo: 'Cristo compra a salvação — CFW Cap. 8 §5',
      subtitulo: 'O que a obediência de Cristo conquistou',
      pericope: 'Colossenses 1.13-14; Gálatas 3.13',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 8 §5',
      cfwRef: 'CFW Cap. 8 §5',
      confissaoTexto: 'O Senhor Jesus, por sua perfeita obediência e sacrifício de si mesmo, que ele ofereceu a Deus uma vez por todas mediante o Espírito eterno, satisfez plenamente à justiça do Pai, e comprou não somente reconciliação, mas uma herança eterna no reino dos céus para todos os que o Pai lhe havia dado.',
      notaInicio: 450,
      notas: [
        'OWEN, John. <em>The Death of Death in the Death of Christ</em>. London, 1647. Defesa clássica da expiação definida — Cristo compra salvação real para os que o Pai lhe deu.',
      ],
    },
    {
      dia: 224,
      data: '12/08',
      titulo: 'A intercessão de Cristo — CFW Cap. 8 §6',
      subtitulo: 'Nosso sumo sacerdote no céu',
      pericope: 'Hebreus 7.25; 1 João 2.1',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 8 §6',
      cfwRef: 'CFW Cap. 8 §6',
      confissaoTexto: 'Embora a obra de redenção não tenha sido por Cristo efetivamente realizada antes de sua encarnação, todavia a virtude, eficácia e benefícios dela foram comunicados aos eleitos em todas as eras sucessivas desde o princípio do mundo.',
      notaInicio: 452,
      notas: [
        'WELLUM, Stephen; GENTRY, Peter. <em>Kingdom through Covenant</em>. Wheaton: Crossway, 2012. A eficácia retroativa da obra de Cristo aplicada aos santos do AT.',
      ],
    },
    {
      dia: 225,
      data: '13/08',
      titulo: 'As duas naturezas na obra redentora — CFW Cap. 8 §7',
      subtitulo: 'O que só o Deus-homem pode fazer',
      pericope: 'Atos 20.28; Hebreus 9.14',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 8 §7',
      cfwRef: 'CFW Cap. 8 §7',
      confissaoTexto: 'Cristo, na obra de mediação, age segundo ambas as naturezas — por cada natureza fazendo o que é próprio da outra; contudo, devido à unidade da pessoa, o que é próprio de uma natureza é algumas vezes atribuído na Escritura à pessoa denominada pela outra natureza.',
      notaInicio: 454,
      notas: [
        'TURRETIN, Francis. <em>Institutes of Elenctic Theology</em>. Vol. 2. Phillipsburg: P&R, 1994. A communicatio idiomatum e a operação das duas naturezas na obra de Cristo.',
      ],
    },
    {
      dia: 226,
      data: '14/08',
      titulo: 'Cristo garante aos eleitos — CFW Cap. 8 §8',
      subtitulo: 'Aplicação certa da redenção conquistada',
      pericope: 'João 6.37-39; João 17.6',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 8 §8',
      cfwRef: 'CFW Cap. 8 §8',
      confissaoTexto: 'A todos aqueles para quem Cristo comprou a redenção, ele certamente e eficazmente a aplica e comunica; intercedendo por eles e revelando-lhes, na Palavra e mediante a Palavra, os mistérios da salvação; persuadindo-os eficazmente a crer e a obedecer pelo seu Espírito.',
      notaInicio: 456,
      notas: [
        'MURRAY, John. <em>Redemption Accomplished and Applied</em>. Grand Rapids: Eerdmans, 1955. A distinção e conexão entre redenção conquistada e redenção aplicada — obra clássica da teologia reformada.',
      ],
    },
    {
      dia: 227,
      data: '15/08',
      titulo: 'O livre-arbítrio — CFW Cap. 9 §1',
      subtitulo: 'A vontade humana e suas faculdades',
      pericope: 'Mateus 17.12; Tiago 1.14',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 9 §1',
      cfwRef: 'CFW Cap. 9 §1',
      confissaoTexto: 'Deus dotou a vontade do homem de uma liberdade natural, que não é forçada nem determinada por qualquer necessidade absoluta da natureza, a fazer o bem ou o mal.',
      notaInicio: 458,
      notas: [
        'COMPATIBILISM: FRAME, John. <em>The Doctrine of God</em>. Phillipsburg: P&R, 2002. A soberania divina e a responsabilidade humana são compatíveis — a vontade humana age livremente segundo sua natureza.',
      ],
    },
    {
      dia: 228,
      data: '16/08',
      titulo: 'O livre-arbítrio antes da queda — CFW Cap. 9 §2',
      subtitulo: 'Adão pôde e escolheu mal',
      pericope: 'Eclesiastes 7.29; Gênesis 3.6',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 9 §2',
      cfwRef: 'CFW Cap. 9 §2',
      confissaoTexto: 'O homem, em seu estado de inocência, tinha liberdade e poder para querer e fazer o que era bom e agradável a Deus; mas era mutável, de modo que poderia cair desse estado.',
      notaInicio: 460,
      notas: [
        'BLOCHER, Henri. <em>In the Beginning</em>. Downers Grove: IVP, 1984. A bondade original de Adão, sua capacidade de obedecer e a liberdade real que tornou a queda uma tragédia genuína.',
      ],
    },
  ];
  return dias.map(bloco);
}

function gerarDiasAgosto_C(): DiaConfessional[] {
  const dias: Omit<DiaConfessional, 'reflexoes'>[] = [
    {
      dia: 229,
      data: '17/08',
      titulo: 'A escravidão do pecado — CFW Cap. 9 §3',
      subtitulo: 'O homem caído não pode se converter',
      pericope: 'João 6.44; Romanos 8.7-8',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 9 §3',
      cfwRef: 'CFW Cap. 9 §3',
      confissaoTexto: 'O homem, pela sua queda em estado de pecado, perdeu toda a capacidade de querer qualquer bem espiritual que acompanha a salvação; de modo que um homem natural, estando inteiramente avesso ao bem e morto em pecado, não é capaz, por sua própria força, de se converter ou de se preparar para a conversão.',
      notaInicio: 462,
      notas: [
        'LUTHER, Martin. <em>De Servo Arbitrio</em> (Sobre o Livre-Arbítrio). 1525. Resposta clássica a Erasmo — a incapacidade do homem caído para o bem espiritual e a necessidade da graça eficaz.',
      ],
    },
    {
      dia: 230,
      data: '18/08',
      titulo: 'Liberdade plena na glorificação — CFW Cap. 9 §4-5',
      subtitulo: 'A progressão da vontade em quatro estados',
      pericope: 'Efésios 4.13; Hebreus 12.23',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 9 §4-5',
      cfwRef: 'CFW Cap. 9 §4-5',
      confissaoTexto: 'Quando Deus converte um pecador e o translada para o estado de graça, ele o liberta de sua servidão natural ao pecado, e, pela sua graça somente, o habilita a querer livremente e fazer o que é espiritualmente bom. O homem glorificado é feito perfeitamente e imutavelmente livre para o bem somente.',
      notaInicio: 464,
      notas: [
        'AUGUSTINE. <em>Enchiridion on Faith, Hope, and Love</em>. Os quatro estados clássicos da vontade humana: posse peccare / non posse non peccare / posse non peccare / non posse peccare.',
      ],
    },
    {
      dia: 231,
      data: '19/08',
      titulo: 'Vocação eficaz — CFW Cap. 10 §1',
      subtitulo: 'Deus chama e garante a resposta',
      pericope: 'Romanos 8.30; 1 Coríntios 1.9',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 10 §1',
      cfwRef: 'CFW Cap. 10 §1',
      confissaoTexto: 'A todos os que Deus predestinou para a vida, e somente a esses, no tempo que lhe aprouve, ele se agradou de chamar eficazmente por sua Palavra e Espírito — tirando-os da cegueira e da dureza do coração naturais, iluminando sua mente espiritual e salutar para compreender as coisas de Deus.',
      notaInicio: 466,
      notas: [
        'SPROUL, R. C. <em>Chosen by God</em>. Wheaton: Tyndale, 1986. A eleição e a vocação eficaz — como a graça irresistível opera sem violar a vontade humana.',
      ],
    },
    {
      dia: 232,
      data: '20/08',
      titulo: 'Renovação da vontade — CFW Cap. 10 §1b',
      subtitulo: 'A regeneração precede a fé',
      pericope: 'João 3.3-8; Ezequiel 36.26',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 10 §1 (cont.)',
      cfwRef: 'CFW Cap. 10 §1',
      confissaoTexto: 'Deus renova suas vontades por seu poder todo-eficaz, determinando-os ao que é bom, e eficazmente os atrai para Jesus Cristo: contudo de tal modo que vêm mui livremente, sendo tornados dispostos pelo favor de sua graça.',
      notaInicio: 468,
      notas: [
        'BAVINCK, Herman. <em>Reformed Dogmatics</em>. Vol. 4. Grand Rapids: Baker, 2008. A regeneração como ato soberano que renova a vontade sem coerção — liberdade e graça eficaz.',
      ],
    },
    {
      dia: 233,
      data: '21/08',
      titulo: 'Somente os eleitos são eficazmente chamados — CFW Cap. 10 §2',
      subtitulo: 'A vocação geral e a vocação especial',
      pericope: 'Mateus 22.14; 2 Tessalonicenses 2.13-14',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 10 §2',
      cfwRef: 'CFW Cap. 10 §2',
      confissaoTexto: 'Esta vocação eficaz é da livre e especial graça somente de Deus, não de qualquer coisa prevista no homem; sendo realizada completamente no tempo devido.',
      notaInicio: 470,
      notas: [
        'CALVIN, John. <em>Institutes of the Christian Religion</em>. III.24. A distinção entre vocação geral (universal) e vocação especial (eficaz) aplicada somente aos eleitos.',
      ],
    },
    {
      dia: 234,
      data: '22/08',
      titulo: 'Infantes eleitos — CFW Cap. 10 §3',
      subtitulo: 'A graça além dos meios ordinários',
      pericope: 'Lucas 18.15-16; Romanos 8.9',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 10 §3',
      cfwRef: 'CFW Cap. 10 §3',
      confissaoTexto: 'Crianças eleitas que morrem na infância são regeneradas e salvas por Cristo por meio do Espírito, que opera quando, onde e como ele quer. O mesmo vale para todas as outras pessoas eleitas que são incapazes de ser externamente chamadas pelo ministério da Palavra.',
      notaInicio: 472,
      notas: [
        'SHAW, Robert. <em>An Exposition of the Westminster Confession of Faith</em>. Edição clássica sobre CFW 10.3 — salvação de infantes eleitos e a soberania do Espírito nos meios.',
      ],
    },
    {
      dia: 235,
      data: '23/08',
      titulo: 'Justificação — CFW Cap. 11 §1',
      subtitulo: 'O artigo pelo qual a Igreja fica ou cai',
      pericope: 'Romanos 3.24-26; Romanos 4.5',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 11 §1',
      cfwRef: 'CFW Cap. 11 §1',
      confissaoTexto: 'Aos que Deus eficazmente chama, ele também justifica gratuitamente, não infundindo justiça neles, mas perdoando seus pecados e reputando e aceitando suas pessoas como justas; não por qualquer coisa operada neles ou feita por eles, mas somente por causa de Cristo; não pela imputação de fé em si mesma, mas pela imputação da obediência e satisfação de Cristo.',
      notaInicio: 474,
      notas: [
        'BUCHANAN, James. <em>The Doctrine of Justification</em>. 1867. Estudo histórico e exegético definitivo sobre a justificação pela fé — imputação, não infusão.',
      ],
    },
    {
      dia: 236,
      data: '24/08',
      titulo: 'Fé instrumental na justificação — CFW Cap. 11 §2',
      subtitulo: 'A fé recebe, não merece',
      pericope: 'Romanos 5.17-19; Efésios 2.8-9',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 11 §2',
      cfwRef: 'CFW Cap. 11 §2',
      confissaoTexto: 'A fé, assim recebendo e repousando em Cristo e em sua justiça, é o único instrumento da justificação; todavia não está sozinha na pessoa justificada, mas é sempre acompanhada de todas as outras graças salvíficas e não é uma fé morta, mas que opera pelo amor.',
      notaInicio: 476,
      notas: [
        'FESKO, J. V. <em>Justification: Understanding the Classic Reformed Doctrine</em>. Phillipsburg: P&R, 2008. A fé como instrumento receptor na justificação — distinção de causa eficiente, meritória e instrumental.',
      ],
    },
  ];
  return dias.map(bloco);
}

function gerarDiasAgosto_D(): DiaConfessional[] {
  const dias: Omit<DiaConfessional, 'reflexoes'>[] = [
    {
      dia: 237,
      data: '25/08',
      titulo: 'Cristo satisfez pela nossa justificação — CFW Cap. 11 §3',
      subtitulo: 'A justiça de Cristo é nossa',
      pericope: 'Romanos 5.8-10; 2 Coríntios 5.21',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 11 §3',
      cfwRef: 'CFW Cap. 11 §3',
      confissaoTexto: 'Cristo, pela sua obediência e morte, satisfez plenamente todas as demandas da lei por parte de todos os que são assim justificados e fez a devida, real e plena satisfação à justiça do Pai pela parte deles; contudo, visto que ele foi dado pelo Pai por eles e a sua obediência e satisfação aceitas em lugar deles, e ambos livremente, não por causa de qualquer coisa neles.',
      notaInicio: 478,
      notas: [
        'ANSELM. <em>Cur Deus Homo</em>. A satisfação vicária — por que somente o Deus-homem podia satisfazer a justiça divina e justificar o pecador.',
      ],
    },
    {
      dia: 238,
      data: '26/08',
      titulo: 'Justificação eterna e temporal — CFW Cap. 11 §4',
      subtitulo: 'Deus decretou justificar; o crente é declarado justo no tempo',
      pericope: 'Gálatas 2.16; Romanos 8.30',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 11 §4',
      cfwRef: 'CFW Cap. 11 §4',
      confissaoTexto: 'Deus, da eternidade, decretou justificar todos os eleitos; e Cristo, na plenitude do tempo, morreu por seus pecados e ressuscitou para sua justificação; contudo eles não são pessoalmente justificados até que o Espírito Santo, no tempo devido, aplique efetivamente a eles Cristo.',
      notaInicio: 480,
      notas: [
        'GAFFIN, Richard. <em>Resurrection and Redemption</em>. Phillipsburg: P&R, 1987. A justificação na perspectiva da história da redenção — decreto eterno e aplicação histórica.',
      ],
    },
    {
      dia: 239,
      data: '27/08',
      titulo: 'Justificação e perdão contínuo — CFW Cap. 11 §5',
      subtitulo: 'O crente justificado ainda peca — e ainda é perdoado',
      pericope: '1 João 1.9; Lucas 22.32',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 11 §5',
      cfwRef: 'CFW Cap. 11 §5',
      confissaoTexto: 'Deus continua a perdoar os pecados daqueles que são justificados; e, embora nunca possam cair do estado de justificação, eles podem cair sob o desprazer paternal de Deus e não ter a luz de seu rosto restaurada a eles, até que se humilhem, confessem seus pecados, peçam perdão e renovem sua fé e arrependimento.',
      notaInicio: 482,
      notas: [
        'BEEKE, Joel R. <em>Assurance of Faith</em>. New York: Peter Lang, 1991. A permanência da justificação e a possibilidade de perda de gozo e assurance — distinção crucial para a vida cristã.',
      ],
    },
    {
      dia: 240,
      data: '28/08',
      titulo: 'A adoção — CFW Cap. 12',
      subtitulo: 'De escravos a filhos',
      pericope: 'João 1.12-13; Romanos 8.14-17',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 12',
      cfwRef: 'CFW Cap. 12',
      confissaoTexto: 'A todos os que são justificados, Deus se agradou de conceder, na e por seu Filho Jesus Cristo, participar da graça da adoção; pela qual são tomados no número e gozam das liberdades e privilégios dos filhos de Deus; têm seu nome escrito neles; recebem o Espírito de adoção; têm acesso ao trono da graça com ousadia; e são habilitados a clamar: Aba, Pai.',
      notaInicio: 484,
      notas: [
        'PACKER, J. I. <em>Knowing God</em>. London: Hodder & Stoughton, 1973. Cap. 19-20: A adoção como o relacionamento mais rico e profundo que o Evangelho oferece — mais que justificação, é filiação.',
      ],
    },
    {
      dia: 241,
      data: '29/08',
      titulo: 'Santificação — CFW Cap. 13 §1',
      subtitulo: 'A transformação real do crente',
      pericope: '1 Tessalonicenses 5.23; 2 Coríntios 7.1',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 13 §1',
      cfwRef: 'CFW Cap. 13 §1',
      confissaoTexto: 'Os que são eficazmente chamados e regenerados, tendo um novo coração e um novo espírito criados neles, são adicionalmente santificados, real e pessoalmente, mediante a virtude da morte e ressurreição de Cristo, por sua Palavra e Espírito habitando neles.',
      notaInicio: 486,
      notas: [
        'OWEN, John. <em>Of the Mortification of Sin in Believers</em>. 1656. Obra clássica sobre a santificação — a mortificação do pecado pelo Espírito é a essência do crescimento cristão.',
      ],
    },
    {
      dia: 242,
      data: '30/08',
      titulo: 'Conflito interior e progresso — CFW Cap. 13 §2-3',
      subtitulo: 'A carne contra o Espírito — e a vitória progressiva',
      pericope: 'Romanos 7.22-25; Gálatas 5.17',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 13 §2-3',
      cfwRef: 'CFW Cap. 13 §2-3',
      confissaoTexto: 'Esta santificação é em toda a pessoa, embora imperfeita nesta vida, restando ainda alguns resquícios de corrupção em toda parte; daí surgindo um conflito contínuo e irreconciliável — a carne contra o Espírito, e o Espírito contra a carne. Contudo, a parte regenerada supera; e assim os santos crescem em graça, aperfeiçoando a santidade no temor de Deus.',
      notaInicio: 488,
      notas: [
        'RYLE, J. C. <em>Holiness</em>. 1879. O conflito interior como sinal de vida espiritual — o crente não está além da guerra, mas nela e vencendo progressivamente.',
      ],
    },
    {
      dia: 243,
      data: '31/08',
      titulo: 'Revisão de agosto — CFW Cap. 7–13',
      subtitulo: 'Das alianças à santificação: o arco da aplicação da redenção',
      pericope: 'Romanos 8.28-30',
      confissaoTitulo: 'Confissão de Fé de Westminster — Cap. 7–13 (Revisão)',
      cfwRef: 'CFW Cap. 7–13',
      confissaoTexto: 'A cadeia dourada de Romanos 8.30: predestinados → chamados → justificados → glorificados. Agosto percorreu o arco da aplicação da redenção: aliança da graça (cap. 7), Cristo mediador (cap. 8), livre-arbítrio e incapacidade (cap. 9), vocação eficaz (cap. 10), justificação (cap. 11), adoção (cap. 12), santificação (cap. 13).',
      notaInicio: 490,
      notas: [
        'MURRAY, John. <em>Redemption Accomplished and Applied</em>. Grand Rapids: Eerdmans, 1955. A sequência de aplicação da redenção que estrutura os capítulos 7–13 da CFW.',
        'HORTON, Michael. <em>The Christian Faith</em>. Grand Rapids: Zondervan, 2011. Síntese sistemática dos mesmos temas — aliança, mediação, vocação, justificação e santificação.',
      ],
      aplicacao: 'Releia Romanos 8.28-30 e trace a cadeia dourada. Identifique em qual ponto da jornada você está hoje — chamado? justificado? sendo santificado? Ore agradecendo por cada elo da corrente.',
      digital: 'Compartilhe com um amigo a doutrina de agosto que mais o impactou. Escreva uma mensagem explicando em suas próprias palavras o que aprendeu sobre como Deus salva pecadores.',
      familia: 'Façam juntos uma revisão de agosto: alianças, Cristo, vocação, justificação, adoção, santificação. Perguntem uns aos outros: "O que mais nos alegrou neste mês?" Ora com gratidão.',
      filhos: 'Pergunte às crianças: "Como Deus nos salva?" Guie-as: Deus nos chama (vocação), nos declara justos (justificação), nos faz filhos (adoção), e nos torna mais parecidos com Jesus (santificação).',
      homens: 'O homem que completou agosto compreende o arco completo da salvação — de antes da criação (aliança da graça) até a glorificação. Essa teologia deve fundamentar sua pregação, discipulado e liderança familiar.',
      mulheres: 'A mulher que percorreu agosto com atenção foi formada nas doutrinas que transformam a vida: não apenas que Deus salva, mas como e por quê — aliança, mediação, vocação, justificação, adoção, santificação.',
      igreja: 'A Igreja que ensina CFW Cap. 7–13 forma crentes que sabem o que creem e por quê creem — capazes de explicar a salvação com profundidade, alegria e humildade.',
      oracao: 'Pai soberano, obrigado por agosto — por cada doutrina que revelastes, por cada verdade que consolidastes, por cada aplicação que transformastes em prática. Que setembro nos leve mais fundo na fé que uma vez foi dada aos santos. Amém.',
      reflexao: 'Agosto percorreu o coração da soterologia reformada: aliança da graça, Cristo mediador, livre-arbítrio e incapacidade, vocação eficaz, justificação, adoção e santificação. Nenhum elo desta corrente é acidental — cada doutrina sustenta a próxima. Setembro aprofundará o que agosto fundou.',
    },
  ];
  return dias.map(bloco);
}
`;

content = content + agosto;
fs.writeFileSync(filePath, content, 'utf8');
console.log('Agosto functions appended successfully!');
console.log('New file length:', content.split('\n').length, 'lines');
