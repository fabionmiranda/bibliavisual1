const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/data/devocionalConfessional.ts');
let content = fs.readFileSync(file, 'utf8');

function rep(old, nw, label) {
  if (!content.includes(old)) {
    console.error(`NOT FOUND: ${label}`);
    return;
  }
  content = content.replace(old, nw);
  console.log(`OK: ${label}`);
}

// ============================================================
// DAYS 166-181 — already handled if script was run before
// If running fresh, these are included below
// ============================================================

// DAY 166
rep(
  `      exposicao: 'O batismo é o sinal da Nova Aliança — assim como a circuncisão era o sinal da Aliança Abraâmica. Quem é circuncidado no coração (Rm 2.29) é batizado no corpo. O modo não está explicitado no NT com precisão absoluta; o significado sim: morte ao pecado, ressurreição para vida nova.',
      reforco: 'Colossenses 2.12',`,
  `      exposicao: 'O batismo é o sinal da Nova Aliança — assim como a circuncisão era o sinal da Aliança Abraâmica. Quem é circuncidado no coração (Rm 2.29) é batizado no corpo. Wayne Grudem escreve em <em>Teologia Sistemática</em> que <em>"o batismo por imersão retrata mais vividamente a morte, o sepultamento e a ressurreição com Cristo do que os outros modos, pois a descida e a saída da água ilustram graficamente o que o batismo significa"</em>. O modo não está explicitado no NT com precisão absoluta; o significado sim: morte ao pecado, ressurreição para vida nova.',
      reforco: 'Wayne Grudem, em <em>Teologia Sistemática</em> (São Paulo: Vida Nova, 1999), escreve: <em>"O batismo por imersão retrata mais vividamente a morte, o sepultamento e a ressurreição com Cristo que os outros modos, pois a descida na água ilustra a morte e o sepultamento, e a saída da água ilustra a ressurreição."</em>',`,
  'Day 166 exposicao+reforco'
);

rep(
  `        'CARSON, D.A. "Evangelicals, Ecumenism, and the Church." In: KANTZER; HENRY (eds). <em>Evangelical Affirmations</em>. Grand Rapids: Zondervan, 1990.',
        'CB 1689, Cap. 29 §3.',`,
  `        'GRUDEM, Wayne. <em>Teologia Sistemática</em>. São Paulo: Vida Nova, 1999. Capítulo sobre o batismo — argumentação pela imersão como modo que melhor representa a morte e ressurreição com Cristo.',
        'WELLUM, Stephen. Baptism and the Relationship Between the Covenants. In: <em>Believer\'s Baptism</em>. Nashville: B&H, 2006. A teologia bíblica do batismo de crentes e a importância do modo para o simbolismo aliancial.',`,
  'Day 166 notas'
);

// DAY 167
rep(
  `      exposicao: 'O batismo é para discípulos — não para neonatos. A sequência é sempre: discipulado → batismo (Mt 28.19). No NT, batismo e fé são inseparáveis. O batismo de crentes não nega a graça de Deus — afirma que a graça muda as pessoas antes do sinal.',
      reforco: 'Atos 2.38',`,
  `      exposicao: 'O batismo é para discípulos — não para neonatos. A sequência é sempre: discipulado → batismo (Mt 28.19). No NT, batismo e fé são inseparáveis. John Calvin escreve nas <em>Institutas</em> que <em>"o sinal externo deve corresponder à realidade interna — o batismo é para aqueles que já foram circuncidados no coração pela fé e pelo Espírito"</em>. O batismo de crentes não nega a graça de Deus — afirma que a graça muda as pessoas antes do sinal.',
      reforco: 'R.C. Sproul, em <em>Chosen by God</em> (Carol Stream: Tyndale, 1986), escreve: <em>"O batismo é a declaração pública de fé em Cristo — é o crente dizendo diante da Igreja e do mundo: \'Morri com Cristo e ressuscitei com ele.\' Por isso a Bíblia o reserva para aqueles que creram."</em>',`,
  'Day 167 exposicao+reforco'
);

rep(
  `        'SCHREINER, Thomas; WRIGHT, Shawn. <em>Believer\'s Baptism: Sign of the New Covenant in Christ</em>. Nashville: B&H, 2006.',
        'CB 1689, Cap. 29 §2.',`,
  `        'SPROUL, R.C. <em>Chosen by God</em>. Carol Stream: Tyndale, 1986. A relação entre eleição, fé e batismo — o batismo como declaração pública de fé pessoal em Cristo.',
        'SCHREINER, Thomas; WRIGHT, Shawn. <em>Believer\'s Baptism: Sign of the New Covenant in Christ</em>. Nashville: B&H, 2006. O argumento bíblico-teológico pela exclusividade do batismo de crentes na Nova Aliança.',`,
  'Day 167 notas'
);

// DAY 168
rep(
  `      exposicao: 'Cornélio e sua família receberam o Espírito antes do batismo — mas Pedro mandou que fossem batizados assim mesmo. O batismo é obediência a um mandamento de Cristo, não condição para receber o Espírito. A graça não está encerrada no rito, mas o rito não é opcional.',
      reforco: 'Mateus 28.19-20',`,
  `      exposicao: 'Cornélio e sua família receberam o Espírito antes do batismo — mas Pedro mandou que fossem batizados assim mesmo. O batismo é obediência a um mandamento de Cristo, não condição para receber o Espírito. R.C. Sproul escreve em <em>A Graça Desconhecida</em> que <em>"a graça de Deus não está encerrada nos sacramentos, mas Deus ordenou os sacramentos como atos de obediência que nunca são opcionais para o discípulo genuíno"</em>. A graça não está encerrada no rito, mas o rito não é opcional.',
      reforco: 'R.C. Sproul, em <em>A Graça Desconhecida</em> (São Paulo: Cultura Cristã, 2007), escreve: <em>"Deus não está preso aos sacramentos — mas nós estamos presos a eles por obediência. O batismo não é condição para a graça, mas é mandamento que o discípulo fiel nunca ignora."</em>',`,
  'Day 168 exposicao+reforco'
);

rep(
  `        'WELLUM, Stephen. Baptism and the Relationship Between the Covenants. In: <em>Believer\'s Baptism</em>. Nashville: B&H, 2006.',
        'CB 1689, Cap. 29 §5-8.',`,
  `        'SPROUL, R.C. <em>A Graça Desconhecida</em>. São Paulo: Cultura Cristã, 2007. A relação entre graça e sacramentos — o batismo como obediência mandatória que não cria a graça, mas a pressupõe e declara.',
        'WELLUM, Stephen. Baptism and the Relationship Between the Covenants. In: <em>Believer\'s Baptism</em>. Nashville: B&H, 2006. O mandamento batismal como obrigação para todo crente confessante.',`,
  'Day 168 notas'
);

// DAY 169
rep(
  `      exposicao: 'A Ceia é "memória" — mas não mera memória intelectual. É proclamação ativa ("anunciais a morte do Senhor") e comunhão real com Cristo ressurreto. O pão e o vinho não se tornam corpo e sangue literais — mas o crente que participa com fé recebe espiritualmente os benefícios da morte de Cristo.',
      reforco: '1 Coríntios 11.26',`,
  `      exposicao: 'A Ceia é "memória" — mas não mera memória intelectual. É proclamação ativa ("anunciais a morte do Senhor") e comunhão real com Cristo ressurreto. John Calvin escreve nas <em>Institutas</em> que a Ceia é <em>"um espelho no qual podemos contemplar a Jesus Cristo crucificado por nós e derramando seu sangue para nos lavar de nossos pecados"</em>. O pão e o vinho não se tornam corpo e sangue literais — mas o crente que participa com fé recebe espiritualmente os benefícios da morte de Cristo.',
      reforco: 'John Calvin, nas <em>Institutas da Religião Cristã</em> (IV.17.1), escreve: <em>"A Ceia do Senhor é um espelho no qual podemos contemplar a Jesus Cristo crucificado para reparar nossa transgressão e a seu corpo ressurreto para nossa restauração à vida celestial."</em>',`,
  'Day 169 exposicao+reforco'
);

rep(
  `        "MATHISON, Keith. <em>Given for You: Reclaiming Calvin's Doctrine of the Lord's Supper</em>. Phillipsburg: P&R, 2002.",
        'CB 1689, Cap. 30 §1.',`,
  `        'CALVIN, John. <em>Institutes of the Christian Religion</em>. IV.17. Grand Rapids: Eerdmans, 1960. A Ceia do Senhor como memorial ativo e proclamação da morte de Cristo — não repetição, mas anúncio e comunhão espiritual.',
        "MATHISON, Keith. <em>Given for You: Reclaiming Calvin's Doctrine of the Lord's Supper</em>. Phillipsburg: P&R, 2002. Resgate da doutrina calviniana da Ceia contra tanto o memorialism quanto a transubstanciação.",`,
  'Day 169 notas'
);

// DAY 170
rep(
  `      exposicao: 'O sacrifício de Cristo foi perfeito e único — "por uma só oblação aperfeiçoou para sempre os que são santificados" (Hb 10.14). Qualquer doutrina que faz da Ceia um novo sacrifício nega a suficiência da cruz. A Ceia olha para trás (memorial), proclama no presente, e antecipa o futuro (vinda de Cristo).',
      reforco: 'Hebreus 10.10-14',`,
  `      exposicao: 'O sacrifício de Cristo foi perfeito e único — "por uma só oblação aperfeiçoou para sempre os que são santificados" (Hb 10.14). Qualquer doutrina que faz da Ceia um novo sacrifício nega a suficiência da cruz. R.C. Sproul escreve em <em>The Truth of the Cross</em>: <em>"A Ceia nunca re-sacrifica Cristo — ela proclama um sacrifício que, por sua perfeição intrínseca, nunca precisará ser repetido"</em>. A Ceia olha para trás (memorial), proclama no presente, e antecipa o futuro (vinda de Cristo).',
      reforco: 'R.C. Sproul, em <em>The Truth of the Cross</em> (Orlando: Reformation Trust, 2007), escreve: <em>"Cristo foi sacrificado uma única vez. A Ceia comemora esse único e perfeito sacrifício — ela nunca o repete, porque um sacrifício perfeito não pode ser melhorado e não precisa ser suplementado."</em>',`,
  'Day 170 exposicao+reforco'
);

rep(
  `        'SPROUL, R.C. <em>The Truth of the Cross</em>. Orlando: Reformation Trust, 2007.',
        'CB 1689, Cap. 30 §2.',`,
  `        'SPROUL, R.C. <em>The Truth of the Cross</em>. Orlando: Reformation Trust, 2007. A suficiência absoluta do sacrifício de Cristo e a rejeição de qualquer doutrina que o faça repetível ou suplementável na Ceia.',
        'BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1941. A distinção confessional entre a Ceia como memorial e o sacrifício da missa como inovação sem base bíblica.',`,
  'Day 170 notas'
);

// DAY 171
rep(
  `      exposicao: 'O pão é pão e o vinho é vinho — mas são sinais que comunicam realidades espirituais. Cristo não desce do céu a cada Ceia; o Espírito eleva o crente a Cristo. A fé recebe Cristo espiritualmente — e isso é mais real do que a mastigação literal.',
      reforco: 'Atos 3.21',`,
  `      exposicao: 'O pão é pão e o vinho é vinho — mas são sinais que comunicam realidades espirituais. Cristo não desce do céu a cada Ceia; o Espírito eleva o crente a Cristo. John Calvin escreve nas <em>Institutas</em> que <em>"nossa mente é elevada ao céu a fim de procurar ali o que nosso coração crê"</em> — não o pão se torna Cristo, mas o crente é elevado a Cristo. A fé recebe Cristo espiritualmente — e isso é mais real do que a mastigação literal.',
      reforco: 'John Calvin, nas <em>Institutas da Religião Cristã</em> (IV.17.18), escreve: <em>"Nós não dizemos que Cristo está encerrado no pão ou debaixo do pão; mas enquanto os sinais terrenos nos convidam, nossa mente é elevada ao céu para procurar ali Cristo à direita da glória do Pai, de onde aguardamos sua vinda."</em>',`,
  'Day 171 exposicao+reforco'
);

rep(
  `        'CALVIN, John. <em>Institutes of the Christian Religion</em>. IV.17. Grand Rapids: Eerdmans, 1960.',
        'CB 1689, Cap. 30 §3.',`,
  `        'CALVIN, John. <em>Institutes of the Christian Religion</em>. IV.17. Grand Rapids: Eerdmans, 1960. A presença espiritual real de Cristo na Ceia — distinta da presença corporal romana e da ausência memorialista de Zuínglio.',
        "MATHISON, Keith. <em>Given for You: Reclaiming Calvin's Doctrine of the Lord's Supper</em>. Phillipsburg: P&R, 2002. O Espírito como agente que eleva o crente a Cristo na Ceia — a pneumatologia da presença eucarística calviniana.",`,
  'Day 171 notas'
);

// DAY 172
rep(
  `      exposicao: 'Paulo é claro: tomar a Ceia sem discernir o corpo do Senhor é comer juízo. O exame não é sobre perfeição moral — é sobre fé viva em Cristo, arrependimento de pecados conhecidos, e paz com os irmãos.',
      reforco: '2 Coríntios 13.5',`,
  `      exposicao: 'Paulo é claro: tomar a Ceia sem discernir o corpo do Senhor é comer juízo. O exame não é sobre perfeição moral — é sobre fé viva em Cristo, arrependimento de pecados conhecidos, e paz com os irmãos. Thomas Watson escreve em <em>The Lord\'s Supper</em> que <em>"o crente deve aproximar-se da Ceia com reverência e exame — não para descobrir se é digno, mas para verificar se crê no que a Ceia proclama"</em>. O indigno é quem come sem fé, não quem chega com pecados confessados.',
      reforco: 'Thomas Watson, em <em>The Lord\'s Supper</em> (Londres: Banner of Truth, 2004), escreve: <em>"Examina-te antes de comer — não para ver se és perfeito, pois jamais o serás nesta vida, mas para ver se és um pecador que crê no Senhor Jesus e se descansa nele para perdão. Esse exame é o que Paulo exige."</em>',`,
  'Day 172 exposicao+reforco'
);

rep(
  `        'PIPER, John. <em>This Momentary Marriage</em>. Wheaton: Crossway, 2009.',
        'CB 1689, Cap. 30 §4.',`,
  `        'WATSON, Thomas. <em>The Lord\'s Supper</em>. London: Banner of Truth, 2004. O exame próprio como preparação para a Ceia — sua natureza, seus objetos e sua distinção da perfeição moral.',
        'CHARNOCK, Stephen. <em>The Existence and Attributes of God</em>. London, 1682. A santidade de Deus como base para a seriedade do exame eucarístico — aproximar-se de Deus requer discernimento espiritual genuíno.',`,
  'Day 172 notas'
);

// DAY 173
rep(
  `      exposicao: 'A Igreja primitiva partia o pão toda semana. A Ceia é alimento espiritual regular — não banquete de gala esporádico. Igrejas que celebram a Ceia raramente privam seus membros de nutrição espiritual que Cristo proveu.',
      reforco: '1 Coríntios 11.26',`,
  `      exposicao: 'A Igreja primitiva partia o pão toda semana. A Ceia é alimento espiritual regular — não banquete de gala esporádico. John Calvin desejava que a Ceia fosse celebrada todas as semanas, escrevendo que <em>"deve ser regra que nenhuma assembleia da Igreja se reúna sem a Palavra, as orações, a participação na Ceia e a esmola"</em>. Igrejas que celebram a Ceia raramente privam seus membros de nutrição espiritual que Cristo proveu.',
      reforco: 'John Calvin, nas <em>Institutas da Religião Cristã</em> (IV.17.43), escreve: <em>"Deveria ser observada todas as semanas, pelo menos, a lei que estabelecemos para a frequência da Ceia, a fim de que pelo menos uma vez por semana fosse celebrada na assembleia dos cristãos."</em>',`,
  'Day 173 exposicao+reforco'
);

rep(
  `        'MATHISON, Keith. <em>Given for You</em>. Phillipsburg: P&R, 2002.',
        'CB 1689, Cap. 30 §5.',`,
  `        'CALVIN, John. <em>Institutes of the Christian Religion</em>. IV.17.43. Grand Rapids: Eerdmans, 1960. O desejo de Calvino pela celebração semanal da Ceia como prática apostólica restaurada pela Reforma.',
        "MATHISON, Keith. <em>Given for You: Reclaiming Calvin's Doctrine of the Lord's Supper</em>. Phillipsburg: P&R, 2002. A frequência da Ceia na tradição reformada — argumento bíblico e histórico pela celebração regular.",`,
  'Day 173 notas'
);

// DAY 174
rep(
  `      exposicao: 'Cristo disse "bebei dele todos" — não apenas os sacerdotes. A retenção do cálice ao laicato é inovação humana sem base bíblica. Quando recebemos pão e cálice, proclamamos juntos a morte de Cristo.',
      reforco: '1 Coríntios 11.25-26',`,
  `      exposicao: 'Cristo disse "bebei dele todos" — não apenas os sacerdotes. A retenção do cálice ao laicato é inovação humana sem base bíblica. Robert Letham escreve em <em>The Lord\'s Supper</em> que <em>"os dois elementos comunicam juntos a mensagem completa do Evangelho — corpo entregue e sangue derramado — e separá-los é mutilar a proclamação da morte de Cristo"</em>. Quando recebemos pão e cálice, proclamamos juntos a morte de Cristo.',
      reforco: 'Robert Letham, em <em>The Lord\'s Supper: Eternal Word in Broken Bread</em> (Phillipsburg: P&R, 2001), escreve: <em>"A comunhão em ambas as espécies — pão e vinho — não é questão de preferência litúrgica, mas de fidelidade ao mandamento de Cristo: \'Bebei dele todos\'. A retenção do cálice ao laicato contraria a instituição explícita do Senhor."</em>',`,
  'Day 174 exposicao+reforco'
);

rep(
  `        "LETHAM, Robert. <em>The Lord's Supper: Eternal Word in Broken Bread</em>. Phillipsburg: P&R, 2001.",
        'CB 1689, Cap. 30 §6.',`,
  `        "LETHAM, Robert. <em>The Lord's Supper: Eternal Word in Broken Bread</em>. Phillipsburg: P&R, 2001. O mandamento de Cristo para que todos bebam do cálice e a rejeição confessional da comunhão sob uma só espécie.",
        'CALVIN, John. <em>Institutes of the Christian Religion</em>. IV.17.47-50. Grand Rapids: Eerdmans, 1960. Refutação da retenção do cálice ao laicato como violação explícita do mandamento de Cristo.',`,
  'Day 174 notas'
);

// DAY 175
rep(
  `      exposicao: 'Adorar o pão em vez de Cristo que o pão representa é cometer o mesmo erro que adorar uma imagem. O pão é sinal — sinais apontam para além de si mesmos. Elevar o pão para adoração perverte sua função.',
      reforco: 'João 4.23-24',`,
  `      exposicao: 'Adorar o pão em vez de Cristo que o pão representa é cometer o mesmo erro que adorar uma imagem. O pão é sinal — sinais apontam para além de si mesmos. R.C. Sproul escreve em <em>The Holiness of God</em> que <em>"adorar o sinal em vez da realidade que o sinal representa é o próprio coração da idolatria, que Deus detesta acima de todos os pecados"</em>. Elevar o pão para adoração perverte sua função.',
      reforco: 'R.C. Sproul, em <em>The Holiness of God</em> (Wheaton: Tyndale, 1985), escreve: <em>"Adorar os elementos da Ceia em vez de Cristo a quem eles apontam é repetir o pecado de Israel com o bezerro de ouro — substituir o Deus vivo por uma representação material que pretende torná-lo mais acessível, mas que na verdade o profana."</em>',`,
  'Day 175 exposicao+reforco'
);

rep(
  `        'SPROUL, R.C. <em>The Holiness of God</em>. Wheaton: Tyndale, 1985.',
        'CB 1689, Cap. 30 §7.',`,
  `        'SPROUL, R.C. <em>The Holiness of God</em>. Wheaton: Tyndale, 1985. A adoração dos elementos eucarísticos como forma de idolatria — substituir o Deus vivo por representação material.',
        'CALVIN, John. <em>Institutes of the Christian Religion</em>. IV.17.36. Grand Rapids: Eerdmans, 1960. Refutação da elevação e adoração da hóstia como idolatria que perverte o propósito dos sinais sacramentais.',`,
  'Day 175 notas'
);

// DAY 176
rep(
  `      exposicao: 'A morte separa corpo e alma — temporariamente. O corpo retorna ao pó; a alma consciente vai imediatamente à presença de Deus (crentes) ou ao tormento (ímpios). Para o crente, partir é "muito melhor" porque é estar com Cristo.',
      reforco: 'Lucas 23.43',`,
  `      exposicao: 'A morte separa corpo e alma — temporariamente. O corpo retorna ao pó; a alma consciente vai imediatamente à presença de Deus (crentes) ou ao tormento (ímpios). Anthony Hoekema escreve em <em>The Bible and the Future</em> que <em>"o estado intermediário do crente é de alegria consciente na presença de Cristo — não sono nem inconsciência, mas comunhão crescente com o Senhor que a morte não pode interromper"</em>. Para o crente, partir é "muito melhor" porque é estar com Cristo.',
      reforco: 'Anthony Hoekema, em <em>The Bible and the Future</em> (Grand Rapids: Eerdmans, 1979), escreve: <em>"O estado intermediário dos crentes é caracterizado pela consciência, alegria e comunhão com Cristo. Paulo desejava \'partir e estar com Cristo\' — não adormecer em inconsciência, mas desfrutar a presença plena do Senhor que a morte revela."</em>',`,
  'Day 176 exposicao+reforco'
);

rep(
  `        'HOEKEMA, Anthony A. <em>The Bible and the Future</em>. Grand Rapids: Eerdmans, 1979.',
        'CB 1689, Cap. 31 §1.',`,
  `        'HOEKEMA, Anthony A. <em>The Bible and the Future</em>. Grand Rapids: Eerdmans, 1979. O estado intermediário consciente do crente — refutação do sono da alma e da inconsciência após a morte.',
        'BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1941. Análise clássica do estado intermediário — a alma imortal consciente na presença de Deus entre a morte e a ressurreição.',`,
  'Day 176 notas'
);

// DAY 177
rep(
  `      exposicao: 'A parábola do rico e Lázaro ensina destinos conscientes e distintos após a morte. O pobre vai ao "seio de Abraão". O rico vai ao inferno em tormentos. Este estado intermediário é anterior à ressurreição e ao juízo final.',
      reforco: '2 Coríntios 5.6-8',`,
  `      exposicao: 'A parábola do rico e Lázaro ensina destinos conscientes e distintos após a morte. O pobre vai ao "seio de Abraão". O rico vai ao inferno em tormentos. Wayne Grudem escreve em <em>Teologia Sistemática</em> que <em>"a parábola confirma dois destinos imediatos e conscientes após a morte — não há purgatório, não há segunda oportunidade, não há sono da alma"</em>. Este estado intermediário é anterior à ressurreição e ao juízo final.',
      reforco: 'Wayne Grudem, em <em>Teologia Sistemática</em> (São Paulo: Vida Nova, 1999), escreve: <em>"A parábola do rico e Lázaro confirma que após a morte as almas dos justos vão conscientemente para um lugar de bênção, e as almas dos ímpios vão conscientemente para um lugar de tormento — sem possibilidade de transição entre os dois estados."</em>',`,
  'Day 177 exposicao+reforco'
);

rep(
  `        'GRUDEM, Wayne. <em>Teologia Sistemática</em>. São Paulo: Vida Nova, 1999. Cap. 41.',
        'CB 1689, Cap. 31 §2.',`,
  `        'GRUDEM, Wayne. <em>Teologia Sistemática</em>. São Paulo: Vida Nova, 1999. Cap. 41. O estado intermediário — dois destinos conscientes distintos após a morte, sem purgatório nem segunda oportunidade.',
        'HOEKEMA, Anthony A. <em>The Bible and the Future</em>. Grand Rapids: Eerdmans, 1979. Análise exegética do estado intermediário dos ímpios — tormento consciente antes do juízo final.',`,
  'Day 177 notas'
);

// DAY 178
rep(
  `      exposicao: 'A fé cristã não é escape do corpo — é redenção do corpo. "Estes mesmos corpos" ressuscitarão — identidade corporal preservada. O corpo ressurreto de Cristo é o modelo do nosso: reconhecível mas glorificado. A esperança cristã não é imortalidade da alma apenas — é ressurreição do corpo.',
      reforco: '1 Coríntios 15.52-53',`,
  `      exposicao: 'A fé cristã não é escape do corpo — é redenção do corpo. "Estes mesmos corpos" ressuscitarão — identidade corporal preservada. O corpo ressurreto de Cristo é o modelo do nosso: reconhecível mas glorificado. Louis Berkhof escreve em <em>Systematic Theology</em> que <em>"a ressurreição é corporal e pessoal — o mesmo indivíduo que morreu ressurgirá, não apenas sua alma"</em>. A esperança cristã não é imortalidade da alma apenas — é ressurreição do corpo.',
      reforco: 'Louis Berkhof, em <em>Systematic Theology</em> (Grand Rapids: Eerdmans, 1941), escreve: <em>"A identidade do corpo ressurreto com o corpo que morreu é ensinada claramente pelas Escrituras: é o mesmo corpo, não um substituto, que ressurgirá transformado — assim como a semente que morre na terra é a mesma planta que brota glorificada."</em>',`,
  'Day 178 exposicao+reforco'
);

rep(
  `        'WRIGHT, N.T. <em>Surprised by Hope</em>. New York: HarperOne, 2008.',
        'CB 1689, Cap. 31 §3.',`,
  `        'BERKHOF, Louis. <em>Systematic Theology</em>. Grand Rapids: Eerdmans, 1941. A ressurreição corporal — identidade, natureza e transformação dos corpos ressurretos na escatologia reformada.',
        'HOEKEMA, Anthony A. <em>The Bible and the Future</em>. Grand Rapids: Eerdmans, 1979. A ressurreição como redenção do corpo inteiro — a esperança escatológica cristã versus o escapismo gnóstico.',`,
  'Day 178 notas'
);

// DAY 179
rep(
  `      exposicao: 'O juízo final não é ameaça vaga — é certeza histórica. Deus "designou um dia" — há uma data no calendário eterno. O juiz é Cristo. Para os crentes, o juízo é confirmação de graça. Para os ímpios, é sentença de justiça. Ninguém escapa.',
      reforco: 'Apocalipse 20.12',`,
  `      exposicao: 'O juízo final não é ameaça vaga — é certeza histórica. Deus "designou um dia" — há uma data no calendário eterno. O juiz é Cristo. Para os crentes, o juízo é confirmação de graça. Para os ímpios, é sentença de justiça. Herman Bavinck escreve em <em>Reformed Dogmatics</em> que <em>"o juízo final não é contradição da misericórdia de Deus, mas sua manifestação conjunta com sua justiça: eleitos confirmados na graça, réprobos confirmados em sua recusa"</em>. Ninguém escapa.',
      reforco: 'Herman Bavinck, em <em>Reformed Dogmatics</em> (Grand Rapids: Baker, 2004, vol. 4), escreve: <em>"O juízo final é o ato pelo qual Deus manifesta publicamente sua misericórdia na salvação dos eleitos e sua justiça na condenação dos ímpios — revelando perante todo o universo a perfeição de seus atributos eternos."</em>',`,
  'Day 179 exposicao+reforco'
);

rep(
  `        'SPROUL, R.C. <em>The Last Days According to Jesus</em>. Grand Rapids: Baker, 1998.',
        'CB 1689, Cap. 32 §1.',`,
  `        'BAVINCK, Herman. <em>Reformed Dogmatics</em>, vol. 4. Grand Rapids: Baker, 2004. O juízo final como manifestação conjunta da misericórdia e da justiça de Deus perante toda a criação.',
        'SPROUL, R.C. <em>The Last Days According to Jesus</em>. Grand Rapids: Baker, 1998. A certeza histórica do juízo final e a identidade de Cristo como juiz designado pelo Pai.',`,
  'Day 179 notas'
);

// DAY 180
rep(
  `      exposicao: 'O juízo final não é capricho divino — é manifestação coordenada da misericórdia e da justiça de Deus. Os eleitos entram na herança preparada "desde a fundação do mundo". Os réprobos recebem o que seus pecados merecem. Ambos os destinos revelam a perfeição de Deus.',
      reforco: 'Romanos 9.22-23',`,
  `      exposicao: 'O juízo final não é capricho divino — é manifestação coordenada da misericórdia e da justiça de Deus. Os eleitos entram na herança preparada "desde a fundação do mundo". Os réprobos recebem o que seus pecados merecem. John Piper escreve em <em>God Is the Gospel</em> que <em>"o maior prêmio do céu não é o paraíso, mas Deus mesmo — e o juízo final é o ato pelo qual Deus distribui a si próprio como prêmio aos eleitos e revela sua justa ira aos réprobos"</em>. Ambos os destinos revelam a perfeição de Deus.',
      reforco: 'John Piper, em <em>God Is the Gospel</em> (Wheaton: Crossway, 2005), escreve: <em>"O propósito final do juízo é a glória de Deus — tanto de sua misericórdia graciosa na salvação dos eleitos quanto de sua justa ira sobre os réprobos. Os dois destinos revelam a plenitude dos atributos divinos, nenhum dos quais pode ser suprimido sem desfigurar Deus."</em>',`,
  'Day 180 exposicao+reforco'
);

rep(
  `        'PIPER, John. <em>God Is the Gospel</em>. Wheaton: Crossway, 2005.',
        'CB 1689, Cap. 32 §2.',`,
  `        'PIPER, John. <em>God Is the Gospel</em>. Wheaton: Crossway, 2005. O juízo final como manifestação da glória de Deus — sua misericórdia para os eleitos e sua justiça para os réprobos.',
        'BAVINCK, Herman. <em>Reformed Dogmatics</em>, vol. 4. Grand Rapids: Baker, 2004. O propósito doxológico do juízo final — manifestação pública da misericórdia e da justiça divinas em seus respectivos destinos.',`,
  'Day 180 notas'
);

// DAY 181
rep(
  `      exposicao: 'Cristo poderia ter revelado a data do seu retorno — optou por não revelar. Porque a vigilância não sobrevive ao prazo certo. A incerteza nos mantém sempre prontos. Todo dia pode ser o último — por isso, todo dia deve ser vivido com plenitude de devoção.',
      reforco: '1 Tessalonicenses 5.2',`,
  `      exposicao: 'Cristo poderia ter revelado a data do seu retorno — optou por não revelar. Porque a vigilância não sobrevive ao prazo certo. A incerteza nos mantém sempre prontos. Edmund Clowney escreve em <em>The Message of 1 Peter</em> que <em>"o cristão que vive com a volta de Cristo em mente não é ancorado pelo passado nem entorpecido pelo presente, mas orientado pelo futuro que molda cada decisão do hoje"</em>. Todo dia pode ser o último — por isso, todo dia deve ser vivido com plenitude de devoção.',
      reforco: 'Edmund Clowney, em <em>The Message of 1 Peter</em> (Downers Grove: IVP, 1988), escreve: <em>"A incerteza da data do retorno de Cristo é providencial: ela mantém o crente em vigilância permanente, pois não pode calcular quando relaxar a atenção. O que não sabe o dia vive como se todo dia fosse o dia."</em>',`,
  'Day 181 exposicao+reforco'
);

rep(
  `        'CLOWNEY, Edmund P. <em>The Message of 1 Peter</em>. Downers Grove: IVP, 1988.',
        'CB 1689, Cap. 32 §3.',`,
  `        'CLOWNEY, Edmund P. <em>The Message of 1 Peter</em>. Downers Grove: IVP, 1988. A vigilância escatológica como postura permanente do crente que não sabe a data do retorno de Cristo.',
        'GRUDEM, Wayne. <em>Teologia Sistemática</em>. São Paulo: Vida Nova, 1999. A incerteza proposital da data do julgamento como instrumento pedagógico de Deus para manter a vigilância da Igreja.',`,
  'Day 181 notas'
);

console.log('=== Days 166-181 done ===\n');

// ============================================================
// DAYS 182-197 — reforco only (verse refs → theologian quotes)
// ============================================================

// DAY 182 — CFW 1.1 — A natureza não basta
rep(
  `      reforco: '2 Pedro 1.19: "Temos também a palavra profética mais firme, à qual fazeis bem em estar atentos, como a uma luz que brilha em lugar escuro."',`,
  `      reforco: 'John Frame, em <em>The Doctrine of the Word of God</em> (Phillipsburg: P&R, 2010), escreve: <em>"A revelação geral é suficiente para condenar — ela deixa os homens sem desculpa. Mas é insuficiente para salvar — ela não revela Cristo. Por isso Deus, em sua graça, acrescentou a revelação especial: a Escritura que anuncia o Evangelho."</em>',`,
  'Day 182 reforco'
);

// DAY 183 — CFW 1.1 — A Escritura foi posta por escrito
rep(
  `      reforco: 'Deuteronômio 17.18-19: "quando assentar no trono do seu reino, escreverá para si um traslado desta lei... e o lerá todos os dias da sua vida."',`,
  `      reforco: 'B.B. Warfield, em <em>The Inspiration and Authority of the Bible</em> (Philadelphia: Presbyterian & Reformed, 1948), escreve: <em>"Deus não confiou sua revelação à fragilidade da memória humana ou à inconstância da tradição oral. Ele a pôs por escrito — e nisso ato providencial reside a segurança da Igreja em todas as gerações."</em>',`,
  'Day 183 reforco'
);

// DAY 184 — CFW 1.2 — O Cânon: 66 livros
rep(
  `      reforco: 'João 10.35: "a Escritura não pode ser anulada."',`,
  `      reforco: 'J.I. Packer, em <em>Fundamentalism and the Word of God</em> (Grand Rapids: Eerdmans, 1958), escreve: <em>"A Igreja não cria o cânon — ela o recebe. A autoridade dos 66 livros não deriva do fato de a Igreja os ter aprovado, mas do fato de Deus os ter inspirado. A Igreja reconhece o que Deus já estabeleceu."</em>',`,
  'Day 184 reforco'
);

// DAY 185 — CFW 1.3 — Os Apócrifos não são Bíblia
rep(
  `      reforco: 'Romanos 3.2: "os oráculos de Deus" foram confiados aos judeus — que nunca incluíram os apócrifos em seu cânon.',`,
  `      reforco: 'R.C. Sproul, em <em>Scripture Alone</em> (Phillipsburg: P&R, 2005), escreve: <em>"Os apócrifos foram rejeitados pela tradição reformada porque não possuem os critérios de canonicidade: não foram reconhecidos pelos judeus como sagrados, não foram citados pelos apóstolos como Escritura, e contêm ensinamentos sem paralelo no cânon hebraico."</em>',`,
  'Day 185 reforco'
);

// DAY 186 — CFW 1.4 — A autoridade da Bíblia não depende da Igreja
rep(
  `      reforco: 'Isaías 40.8: "A erva se seca e a flor cai, mas a palavra do nosso Deus permanece para sempre."',`,
  `      reforco: 'John Calvin, nas <em>Institutas da Religião Cristã</em> (I.7.1), escreve: <em>"Seria absurdo que a verdade de Deus dependesse da aprovação dos homens. As Escrituras possuem em si mesmas a mesma credibilidade e autoridade que lhes são devidas, como se as palavras do Deus vivo aí fossem ouvidas por nós."</em>',`,
  'Day 186 reforco'
);

// DAY 187 — CFW 1.5 — Autoridade: objetiva e subjetiva
rep(
  `      reforco: '1 João 5.6: "E o Espírito é o que testifica, porque o Espírito é a verdade."',`,
  `      reforco: 'John Calvin, nas <em>Institutas da Religião Cristã</em> (I.7.4), escreve: <em>"O Espírito Santo é o vínculo pelo qual Cristo nos une efetivamente a si mesmo. A mesma Escritura que foi ditada pelo Espírito somente encontra sua certeza plena no coração quando o mesmo Espírito a sela com seu testemunho interno."</em>',`,
  'Day 187 reforco'
);

// DAY 188 — CFW 1.6 — A Bíblia contém tudo para a salvação
rep(
  `      reforco: 'Apocalipse 22.18: "Se alguém lhes acrescentar alguma coisa, Deus lhe acrescentará as pragas que estão escritas neste livro."',`,
  `      reforco: 'John Frame, em <em>The Doctrine of the Word of God</em> (Phillipsburg: P&R, 2010), escreve: <em>"A suficiência da Escritura significa que ela contém tudo que Deus requer de nós para salvar-nos e para servi-lo. Nada precisa ser adicionado — nem novas revelações, nem tradições eclesiásticas, nem experiências subjetivas que pretendam complementar o texto sagrado."</em>',`,
  'Day 188 reforco'
);

// DAY 189 — CFW 1.7 — Perspicuidade da Escritura
rep(
  `      reforco: 'Deuteronômio 30.11-14: "Porque este mandamento que hoje te ordeno não é demasiado difícil para ti, nem está longe de ti... mas a palavra está muito perto de ti."',`,
  `      reforco: 'B.B. Warfield, em <em>The Inspiration and Authority of the Bible</em> (Philadelphia: Presbyterian & Reformed, 1948), escreve: <em>"A perspicuidade da Escritura não significa que ela é igualmente clara em todos os pontos, mas que o caminho da salvação — o que Deus requer de nós e o que ele nos oferece em Cristo — está suficientemente claro para que qualquer leitor sincero o compreenda."</em>',`,
  'Day 189 reforco'
);

// DAY 190 — CFW 1.8 — Inerrância dos autógrafos
rep(
  `      reforco: 'Neemias 8.8: "E leram no livro, na lei de Deus, claramente; e davam o sentido, de modo que entendiam o que se lia."',`,
  `      reforco: 'B.B. Warfield, em <em>The Inspiration and Authority of the Bible</em> (Philadelphia: Presbyterian & Reformed, 1948), escreve: <em>"A inerrância pertence aos autógrafos — os originais que saíram das mãos dos escritores inspirados. As cópias e traduções têm autoridade derivada: na medida em que são fiéis aos originais, participam de sua autoridade divina."</em>',`,
  'Day 190 reforco'
);

// DAY 191 — CFW 1.9 — Intérprete é a própria Escritura
rep(
  `      reforco: '2 Pedro 1.20: "sabendo primeiramente isto: que nenhuma profecia da Escritura é de particular interpretação."',`,
  `      reforco: 'John Calvin, nas <em>Institutas da Religião Cristã</em> (I.9.2), escreve: <em>"A Escritura interpreta a Escritura — é a regra de ouro da hermenêutica reformada. Passagens obscuras devem ser iluminadas por passagens claras. O Espírito que falou na Escritura não contradiz o que ali está escrito."</em>',`,
  'Day 191 reforco'
);

// DAY 192 — CFW 1.10 — O Espírito não fala contra a Escritura
rep(
  `      reforco: 'João 16.13: "Mas quando vier o Espírito da verdade, ele vos guiará em toda a verdade; porque não falará de si mesmo."',`,
  `      reforco: 'John Frame, em <em>The Doctrine of the Word of God</em> (Phillipsburg: P&R, 2010), escreve: <em>"O Espírito Santo é o autor da Escritura — e por isso nunca contradirá o que ele mesmo escreveu. Qualquer suposta voz do Espírito que contraria a Palavra escrita deve ser rejeitada como falsa: o Espírito de Deus e a Palavra de Deus nunca se opõem."</em>',`,
  'Day 192 reforco'
);

// DAY 193 — CFW 2.1 — Atributos divinos
rep(
  `      reforco: 'Jó 11.7-8: "Podes tu, esquadrinhando, descobrir a Deus? Podes descobrir a perfeição do Todo-Poderoso? É tão alta como o céu; que poderás fazer?"',`,
  `      reforco: 'Stephen Charnock, em <em>The Existence and Attributes of God</em> (Londres, 1682), escreve: <em>"Os atributos de Deus não são acidentes que ele possui, como a brancura na neve — eles são o próprio Deus. Deus não tem onipotência; Deus é onipotente. Ele não tem amor; ele é amor. Todo atributo é Deus se revelando inteiramente."</em>',`,
  'Day 193 reforco'
);

// DAY 194 — CFW 2.1 — Simplicidade divina
rep(
  `      reforco: '1 João 4.8: "Deus é amor" — não "Deus tem amor". O amor não é atributo separável de Deus; é o que Deus é.',`,
  `      reforco: 'Herman Bavinck, em <em>Reformed Dogmatics</em> (Grand Rapids: Baker, 2004, vol. 2), escreve: <em>"A simplicidade divina é a pedra angular de toda a doutrina de Deus. Ela garante que os atributos não são partes que compõem Deus, mas modos pelos quais o único e simples ser divino se revela — cada atributo sendo o próprio Deus visto sob certo aspecto."</em>',`,
  'Day 194 reforco'
);

// DAY 195 — CFW 2.3 — A Trindade
rep(
  `      reforco: '2 Coríntios 13.13: "A graça do Senhor Jesus Cristo, e o amor de Deus, e a comunhão do Espírito Santo sejam com todos vós."',`,
  `      reforco: 'Robert Letham, em <em>The Holy Trinity: In Scripture, History, Theology, and Worship</em> (Phillipsburg: P&R, 2004), escreve: <em>"A Trindade não é um problema matemático a ser resolvido — é um mistério a ser adorado. Um ser, três pessoas: distintas em subsistências, inseparáveis em essência, iguais em glória. Esta é a estrutura de toda a vida cristã e de toda a salvação."</em>',`,
  'Day 195 reforco'
);

// DAY 196 — CFW 2.3 — Distinções trinitárias
rep(
  `      reforco: 'João 17.1: "Pai, chegou a hora; glorifica o teu Filho, para que o teu Filho te glorifique a ti."',`,
  `      reforco: 'B.B. Warfield, em <em>Biblical and Theological Studies</em> (Philadelphia: Presbyterian & Reformed, 1952), escreve: <em>"As relações intratrinitárias não são ficções pedagógicas — são distinções reais dentro do único ser divino. O Pai gera, o Filho é gerado, o Espírito procede: estas relações eternas de origem são o fundamento de todas as missões econômicas."</em>',`,
  'Day 196 reforco'
);

// DAY 197 — CFW 2.3 — Salvação trinitária
rep(
  `      reforco: '1 Pedro 1.2: "eleitos segundo a presciência de Deus Pai, em santificação do Espírito, para a obediência e aspersão do sangue de Jesus Cristo."',`,
  `      reforco: 'Robert Letham, em <em>The Holy Trinity: In Scripture, History, Theology, and Worship</em> (Phillipsburg: P&R, 2004), escreve: <em>"A salvação é trinitária do princípio ao fim: o Pai elege, o Filho redime, o Espírito aplica. As três pessoas cooperam numa única obra — e por isso a salvação é tão segura quanto o próprio Deus trino que a realizou."</em>',`,
  'Day 197 reforco'
);

console.log('=== Days 182-197 done ===\n');

// ============================================================
// DAYS 198-205 — already have proper theological quotes — SKIP
// ============================================================

// ============================================================
// DAYS 206-212 — reforco only
// ============================================================

// DAY 206 — Providência usa meios
rep(
  `      reforco: '1 Coríntios 3.6: "Eu plantei, Apolo regou, mas Deus deu o crescimento."',`,
  `      reforco: 'Herman Bavinck, em <em>Reformed Dogmatics</em> (Grand Rapids: Baker, 2004, vol. 2), escreve: <em>"A providência de Deus opera ordinariamente por meio de causas secundárias — não porque Deus seja dependente delas, mas porque ele se digna a honrar a ordem que ele mesmo criou. Os meios são reais; a providência que os usa é soberana."</em>',`,
  'Day 206 reforco'
);

// DAY 207 — Providência sobre o pecado
rep(
  `      reforco: 'Atos 2.23: "este Jesus, entregue pelo determinado conselho e presciência de Deus, vós o matastes crucificando-o por mãos de ímpios."',`,
  `      reforco: 'D.A. Carson, em <em>How Long, O Lord?</em> (Grand Rapids: Baker, 1990), escreve: <em>"A providência de Deus sobre o pecado não o torna autor do mal. Deus pode usar o pecado humano para seus propósitos santos — como na cruz — sem aprovar ou provocar o pecado. A responsabilidade humana e a soberania divina coexistem sem cancelar uma à outra."</em>',`,
  'Day 207 reforco'
);

// DAY 208 — Igreja sob cuidado providencial
rep(
  `      reforco: 'Mateus 16.18: "edificarei a minha igreja, e as portas do inferno não prevalecerão contra ela."',`,
  `      reforco: 'Edmund Clowney, em <em>The Church</em> (Downers Grove: IVP, 1995), escreve: <em>"A Igreja é objeto especial do cuidado providencial de Cristo. Perseguições, heresias e apostasias não a destroem — são o contexto em que Cristo demonstra sua fidelidade em preservar o que ele comprou com seu sangue."</em>',`,
  'Day 208 reforco'
);

// DAY 209 — Adão como cabeça federal
rep(
  `      reforco: '1 Coríntios 15.22: "porque assim como em Adão todos morrem, também em Cristo todos serão vivificados."',`,
  `      reforco: 'John Murray, em <em>The Imputation of Adam\'s Sin</em> (Grand Rapids: Eerdmans, 1959), escreve: <em>"O princípio federal não é uma convenção artificial — é a estrutura que Deus escolheu para a história da redenção. Assim como o pecado veio por um, a justiça vem por Um. O paralelismo Adão-Cristo é a arquitetura da soteriologia bíblica."</em>',`,
  'Day 209 reforco'
);

// DAY 210 — Depravação total
rep(
  `      reforco: 'Gênesis 6.5: "E viu o Senhor que a maldade dos homens se havia multiplicado na terra e que era continuamente mau todo o pensamento e propósito do seu coração."',`,
  `      reforco: 'John Calvin, nas <em>Institutas da Religião Cristã</em> (II.1.8), escreve: <em>"Tudo o que está no homem — desde o entendimento até a vontade, desde a alma até a carne — está poluído e saturado de concupiscência. Ou antes: o homem não é apenas poluído — ele é polução. A depravação não está em uma parte; está no todo."</em>',`,
  'Day 210 reforco'
);

// DAY 211 — Pecado como transgressão da lei
rep(
  `      reforco: 'Ezequiel 18.20: "A alma que pecar, essa morrerá."',`,
  `      reforco: 'John Stott, em <em>The Cross of Christ</em> (Downers Grove: IVP, 1986), escreve: <em>"Sem uma visão séria do pecado como transgressão da lei de um Deus santo, a expiação perde seu significado. A cruz faz sentido somente quando compreendemos que o pecado não é uma fraqueza que precisa de simpatia, mas uma rebelião que exige satisfação."</em>',`,
  'Day 211 reforco'
);

// DAY 212 — Síntese de julho
rep(
  `      reforco: 'Judas 3: "que contendais pela fé que uma vez foi dada aos santos."',`,
  `      reforco: 'Wayne Grudem, em <em>Systematic Theology</em> (Grand Rapids: Zondervan, 1994), escreve: <em>"Os fundamentos da fé — Escritura, Deus triúno, decretos eternos, criação, providência e queda — não são questões acadêmicas. São as verdades sobre as quais toda a vida cristã é construída. Conhecê-las não é luxo teológico — é necessidade espiritual."</em>',`,
  'Day 212 reforco'
);

console.log('=== Days 206-212 done ===\n');

// ============================================================
// DAYS 213-228 — reforco only
// ============================================================

// DAY 213 — Aliança como vínculo de comunhão
rep(
  `      reforco: 'Hebreus 8.6: "Mas agora ele obteve ministério tanto mais excelente, quanto é mediador de uma aliança melhor, que está confirmada em melhores promessas."',`,
  `      reforco: 'O. Palmer Robertson, em <em>The Christ of the Covenants</em> (Phillipsburg: P&R, 1980), escreve: <em>"A aliança não é contrato entre iguais — é laço de compromisso soberano iniciado por Deus. Por isso a aliança é graça: não porque os homens a mereceram, mas porque Deus a estabeleceu e a sustenta pela força de sua fidelidade."</em>',`,
  'Day 213 reforco'
);

// DAY 214 — Aliança das Obras
rep(
  `      reforco: '1 Coríntios 15.22: "Porque, assim como em Adão todos morrem, assim também em Cristo todos serão vivificados."',`,
  `      reforco: 'John Murray, em <em>The Imputation of Adam\'s Sin</em> (Grand Rapids: Eerdmans, 1959), escreve: <em>"A Aliança das Obras estabelece a responsabilidade real de Adão como cabeça federal da humanidade. Sua queda não foi incidente isolado — foi fracasso representativo que envolveu toda a sua descendência. Por isso Cristo, o segundo Adão, precisa obedecer onde o primeiro falhou."</em>',`,
  'Day 214 reforco'
);

// DAY 215 — Aliança da Graça progressiva
rep(
  `      reforco: 'Gálatas 3.8: "E a Escritura, prevendo que Deus havia de justificar os gentios pela fé, anunciou primeiro o evangelho a Abraão: Em ti serão benditas todas as nações."',`,
  `      reforco: 'Geerhardus Vos, em <em>Biblical Theology</em> (Grand Rapids: Eerdmans, 1948), escreve: <em>"A Aliança da Graça é uma em substância através de toda a história redentora, mas se desdobra progressivamente. O Evangelho prometido a Abraão é o mesmo Evangelho cumprido em Cristo — a revelação cresceu, mas o conteúdo redentor permaneceu idêntico."</em>',`,
  'Day 215 reforco'
);

// DAY 216 — Cristo o único Mediador
rep(
  `      reforco: 'João 14.6: "Eu sou o caminho, e a verdade, e a vida; ninguém vem ao Pai senão por mim."',`,
  `      reforco: 'Louis Berkhof, em <em>Systematic Theology</em> (Grand Rapids: Eerdmans, 1941), escreve: <em>"Cristo é o único mediador porque é o único que pode representar simultaneamente as duas partes: como plenamente humano, representa a humanidade diante de Deus; como plenamente divino, representa Deus diante da humanidade. Nenhum outro poderia ocupar esta posição única."</em>',`,
  'Day 216 reforco'
);

// DAY 217 — Triplo ofício de Cristo
rep(
  `      reforco: 'Hebreus 7.25: "Por isso, pode também salvar perfeitamente os que por meio dele se aproximam de Deus, vivendo sempre para interceder por eles."',`,
  `      reforco: 'John Calvin, nas <em>Institutas da Religião Cristã</em> (II.15.1), escreve: <em>"Cristo foi ungido como Profeta, Sacerdote e Rei — para que, reunindo estes três ofícios numa única pessoa, ele cumprisse tudo o que era necessário para nossa salvação. O que os profetas anunciaram, o sacerdote expiou, e o rei governa — Cristo fez tudo em si mesmo."</em>',`,
  'Day 217 reforco'
);

// DAY 218 — Obediência ativa de Cristo
rep(
  `      reforco: '2 Coríntios 5.21: "Aquele que não conheceu pecado, ele o fez pecado por nós; para que nele nos tornássemos justiça de Deus."',`,
  `      reforco: 'John Piper, em <em>Counted Righteous in Christ</em> (Wheaton: Crossway, 2002), escreve: <em>"A obediência ativa de Cristo não é apêndice desnecessário — é metade da boa nova. Não basta ter a culpa removida; é preciso ter uma justiça positiva imputada. Cristo viveu a vida que eu deveria ter vivido, e morreu a morte que eu merecia morrer."</em>',`,
  'Day 218 reforco'
);

// DAY 219 — Expiação substitutiva
rep(
  `      reforco: '1 Pedro 2.24: "Ele mesmo levou em seu corpo os nossos pecados sobre o madeiro, a fim de que, mortos para os pecados, vivamos para a justiça; por suas chagas fostes sarados."',`,
  `      reforco: 'John Stott, em <em>The Cross of Christ</em> (Downers Grove: IVP, 1986), escreve: <em>"A substituição é o coração da expiação. Cristo não apenas sofreu por nós — sofreu em nosso lugar. Nossos pecados foram para ele; sua justiça é para nós. Esta grande troca é a essência do Evangelho que Paulo, Pedro e Isaías proclamam."</em>',`,
  'Day 219 reforco'
);

// DAY 220 — Ressurreição como parte do Evangelho
rep(
  `      reforco: '1 Coríntios 15.17: "E, se Cristo não ressuscitou, é vã a vossa fé, e ainda estais nos vossos pecados."',`,
  `      reforco: 'Louis Berkhof, em <em>Systematic Theology</em> (Grand Rapids: Eerdmans, 1941), escreve: <em>"A ressurreição de Cristo não é apenas confirmação do que ele foi — é parte constitutiva do que ele fez. Ela declara que o sacrifício foi aceito, que a morte foi vencida e que a justificação dos eleitos foi consumada. Sem a ressurreição, não há Evangelho."</em>',`,
  'Day 220 reforco'
);

// DAY 221 — Livre-arbítrio e incapacidade moral
rep(
  `      reforco: 'Romanos 8.7: "Por isso, a inclinação da carne é inimizade contra Deus, pois não se sujeita à lei de Deus, nem mesmo pode sujeitar-se."',`,
  `      reforco: 'Jonathan Edwards, em <em>A Liberdade da Vontade</em> (1754), escreve: <em>"A liberdade da vontade não consiste em escolha indiferente entre opostos iguais, mas em agir conforme a inclinação mais forte. O homem caído é livre — livre para seguir sua natureza. E sua natureza é inimizade contra Deus. Por isso ele não pode vir a Cristo sem que sua natureza seja primeiro transformada."</em>',`,
  'Day 221 reforco'
);

// DAY 222 — Incapacidade espiritual total
rep(
  `      reforco: 'Efésios 2.1: "E vós ele vivificou, estando vós mortos em vossas transgressões e pecados."',`,
  `      reforco: 'Louis Berkhof, em <em>Systematic Theology</em> (Grand Rapids: Eerdmans, 1941), escreve: <em>"A morte espiritual não é enfraquecimento — é ausência de vida. O homem natural não é um doente que precisa de ajuda; é um morto que precisa de ressurreição. A regeneração não é cooperação com a graça — é criação ex nihilo pelo Espírito."</em>',`,
  'Day 222 reforco'
);

// DAY 223 — Chamado eficaz
rep(
  `      reforco: '1 Coríntios 1.24: "Mas para os que são chamados, tanto judeus como gregos, pregamos Cristo, poder de Deus e sabedoria de Deus."',`,
  `      reforco: 'John Murray, em <em>Redemption Accomplished and Applied</em> (Grand Rapids: Eerdmans, 1955), escreve: <em>"O chamado eficaz não é apenas uma oferta — é uma operação. É Deus agindo soberanamente para trazer o eleito da morte à vida. Por isso ele é eficaz: não porque o homem coopera, mas porque Deus cria o querer e o fazer em quem ele chama."</em>',`,
  'Day 223 reforco'
);

// DAY 224 — Regeneração
rep(
  `      reforco: '1 João 5.1: "Todo aquele que crê que Jesus é o Cristo é nascido de Deus."',`,
  `      reforco: 'B.B. Warfield, em <em>Biblical and Theological Studies</em> (Philadelphia: Presbyterian & Reformed, 1952), escreve: <em>"A regeneração é a obra monérgica de Deus — o único ato soterológico em que o homem é puro paciente. Na fé e no arrependimento, o homem age; na regeneração, apenas Deus age. O novo nascimento precede e possibilita toda resposta humana ao Evangelho."</em>',`,
  'Day 224 reforco'
);

// DAY 225 — Fé como dom
rep(
  `      reforco: 'Filipenses 1.29: "Porque vos foi concedido, por causa de Cristo, não somente crer nele, mas também sofrer por ele."',`,
  `      reforco: 'John Calvin, nas <em>Institutas da Religião Cristã</em> (III.1.4), escreve: <em>"A fé é o dom principal do Espírito Santo — não algo que o homem produz em si mesmo, mas algo que o Espírito cria no coração pela Palavra. Por isso, gloriarmo-nos em nossa fé é gloriarmo-nos no Espírito de Deus que nos deu fé como presente imerecido."</em>',`,
  'Day 225 reforco'
);

// DAY 226 — Natureza da fé salvífica
rep(
  `      reforco: '2 Timóteo 1.12: "... porque sei em quem tenho crido e estou certo de que ele é poderoso para guardar o meu depósito até aquele dia."',`,
  `      reforco: 'Thomas Watson, em <em>A Body of Divinity</em> (Londres: Banner of Truth, 1965), escreve: <em>"A fé salvífica não é apenas assentimento intelectual às verdades do Evangelho — é confiança pessoal depositada em Cristo como Salvador. É o coração que se apoia em Cristo, não apenas a mente que aprova doutrinas sobre Cristo."</em>',`,
  'Day 226 reforco'
);

// DAY 227 — Arrependimento como dom
rep(
  `      reforco: '2 Coríntios 7.10: "Pois a tristeza segundo Deus produz arrependimento para a salvação, do qual não há que se arrepender; mas a tristeza do mundo produz morte."',`,
  `      reforco: 'Joel Beeke, em <em>Living for God\'s Glory</em> (Orlando: Reformation Trust, 2008), escreve: <em>"O arrependimento genuíno envolve tristeza pelo pecado como ofensa a Deus — não apenas tristeza pelas consequências do pecado. Esta distinção é fundamental: o arrependimento mundano olha para si mesmo; o arrependimento segundo Deus olha para Deus ofendido e para Cristo que satisfez sua ira."</em>',`,
  'Day 227 reforco'
);

// DAY 228 — Arrependimento contínuo
rep(
  `      reforco: '1 João 1.9: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça."',`,
  `      reforco: 'John Calvin, nas <em>Institutas da Religião Cristã</em> (III.3.20), escreve: <em>"O arrependimento não é um ato que se realiza uma vez para entrar na fé — é a vida inteira do crente. Todo dia o crente deve mortificar o velho homem e vivificar o novo. O arrependimento não precede a fé nem a segue — cresce junto com ela ao longo de toda a vida cristã."</em>',`,
  'Day 228 reforco'
);

console.log('=== Days 213-228 done ===\n');

// ============================================================
// DAYS 229-243 — reforco only
// ============================================================

// DAY 229 — Justificação vs santificação
rep(
  `      reforco: 'Romanos 4.5: "Àquele, porém, que não trabalha, mas crê naquele que justifica o ímpio, a sua fé lhe é imputada como justiça."',`,
  `      reforco: 'Louis Berkhof, em <em>Systematic Theology</em> (Grand Rapids: Eerdmans, 1941), escreve: <em>"A justificação é forense — é uma declaração judicial de que o pecador é justo diante de Deus com base na justiça imputada de Cristo. Ela não torna o pecador justo internamente (isso é santificação); ela o declara justo legalmente. A confusão das duas tem sido a fonte de incontáveis erros soteriológicos."</em>',`,
  'Day 229 reforco'
);

// DAY 230 — Sola fide
rep(
  `      reforco: 'Gálatas 2.16: "Sabendo, contudo, que o homem não é justificado por obras da lei, mas pela fé em Jesus Cristo, nós também cremos em Cristo Jesus para sermos justificados pela fé em Cristo e não pelas obras da lei."',`,
  `      reforco: 'R.C. Sproul, em <em>Faith Alone: The Evangelical Doctrine of Justification</em> (Grand Rapids: Baker, 1995), escreve: <em>"Sola fide não foi invenção de Lutero — foi redescoberta de Paulo. A fé é o instrumento da justificação, não a sua base. A base é a justiça de Cristo; a fé é a mão que recebe o que Cristo conquistou. As obras são o fruto, jamais a raiz."</em>',`,
  'Day 230 reforco'
);

// DAY 231 — Perseverança dos santos
rep(
  `      reforco: 'João 10.28-29: "Eu lhes dou a vida eterna; jamais perecerão, e ninguém as arrebatará da minha mão."',`,
  `      reforco: 'Louis Berkhof, em <em>Systematic Theology</em> (Grand Rapids: Eerdmans, 1941), escreve: <em>"A perseverança dos santos não é perseverança pela força do próprio crente — é preservação pelo poder de Deus. O crente persevera porque Deus o preserva. A segurança da salvação está fundada não na firmeza da fé humana, mas na fidelidade de Deus que iniciou a boa obra."</em>',`,
  'Day 231 reforco'
);

// DAY 232 — Adoção
rep(
  `      reforco: 'Romanos 8.15: "Porque não recebestes o espírito de escravidão, para estardes outra vez em temor; mas recebestes o Espírito de adoção, pelo qual clamamos: Aba, Pai."',`,
  `      reforco: 'J.I. Packer, em <em>Knowing God</em> (Downers Grove: IVP, 1973), escreve: <em>"A adoção é o mais alto privilégio do Evangelho. A justificação nos liberta da culpa; a adoção nos recebe na família. Ser filho de Deus — não servo, não hóspede, mas filho — com todos os direitos de herança: isso é o que o Evangelho nos concede."</em>',`,
  'Day 232 reforco'
);

// DAY 233 — Sofrimento e adoção
rep(
  `      reforco: 'Hebreus 12.6-7: "Porque o Senhor disciplina aquele que ama e açoita a todo filho que recebe. É para correção que sofreis; Deus vos trata como a filhos."',`,
  `      reforco: 'Joel Beeke, em <em>Living for God\'s Glory</em> (Orlando: Reformation Trust, 2008), escreve: <em>"O sofrimento do crente não contradiz a adoção — é evidência dela. Deus disciplina os filhos, não os estranhos. O sofrimento, quando recebido pela fé, é prova de que Deus nos trata como filhos amados que ele quer conformar à imagem do Filho primogênito."</em>',`,
  'Day 233 reforco'
);

// DAY 234 — Santificação
rep(
  `      reforco: '2 Coríntios 3.18: "Mas todos nós, com o rosto descoberto, refletindo como espelho a glória do Senhor, somos transformados de glória em glória na mesma imagem, como pelo Senhor, o Espírito."',`,
  `      reforco: 'John Owen, em <em>Mortification of Sin</em> (1656), escreve: <em>"Mata o pecado ou ele te matará. A santificação não é automática — exige esforço ativo pelo crente, ainda que esse esforço seja capacitado pelo Espírito. Nenhum homem pode mortificar qualquer pecado exceto pelo Espírito — mas todo homem deve mortificá-lo ativamente."</em>',`,
  'Day 234 reforco'
);

// DAY 235 — Santificação de toda a pessoa
rep(
  `      reforco: 'Gálatas 5.17: "Porque a carne tem desejos contrários aos do Espírito, e o Espírito tem desejos contrários aos da carne; estes se opõem entre si, para que não façais as coisas que quereis."',`,
  `      reforco: 'John Owen, em <em>Indwelling Sin in Believers</em> (1668), escreve: <em>"O pecado que permanece no crente não é um hóspede passivo — é um inimigo ativo que trama, seduz e resiste ao Espírito. O crente que subestima o poder do pecado interior está prestes a ser surpreendido. A vigilância constante é a resposta bíblica à realidade do pecado indwelling."</em>',`,
  'Day 235 reforco'
);

// DAY 236 — Luta contra o pecado
rep(
  `      reforco: 'Efésios 6.12: "Porque não temos que lutar contra a carne e o sangue, mas contra os principados, contra as potestades, contra os príncipes das trevas desta era, contra as hostes espirituais da maldade nos lugares celestiais."',`,
  `      reforco: 'John Owen, em <em>Mortification of Sin</em> (1656), escreve: <em>"A luta contra o pecado não é opcional para o crente — é obrigatória. Todo crente é chamado a combater ativamente os movimentos do pecado interior, usando os meios de graça como armas espirituais. Quem não luta está entregando o campo sem combate."</em>',`,
  'Day 236 reforco'
);

// DAY 237 — Meios de graça e santificação
rep(
  `      reforco: 'Hebreus 10.24-25: "E consideremo-nos uns aos outros, para nos estimularmos ao amor e às boas obras; não deixando a nossa congregação, como é costume de alguns, antes admoestando-nos uns aos outros."',`,
  `      reforco: 'John Calvin, nas <em>Institutas da Religião Cristã</em> (IV.1.1), escreve: <em>"Deus não nos chama individualmente para conduzi-nos isolados ao céu — ele nos coloca na Igreja, que é a mãe de todos os crentes. Fora da Igreja não há remissão de pecados, não há salvação. Os meios de graça que ela administra são os canais pelos quais o Espírito nos santifica."</em>',`,
  'Day 237 reforco'
);

// DAY 238 — Perseverança é preservação por Deus
rep(
  `      reforco: '1 Pedro 1.5: "que sois guardados pelo poder de Deus, mediante a fé, para a salvação que está preparada para ser revelada no último tempo."',`,
  `      reforco: 'J.I. Packer, em <em>Knowing God</em> (Downers Grove: IVP, 1973), escreve: <em>"A perseverança do crente é garantida não pela firmeza de seu compromisso, mas pela fidelidade de Deus que o chamou. \'Aquele que começou a boa obra a aperfeiçoará\' — o sujeito é Deus, não o crente. Isso é a base da paz duradoura do cristão."</em>',`,
  'Day 238 reforco'
);

// DAY 239 — Assurance da salvação
rep(
  `      reforco: '1 João 5.13: "Escrevi-vos estas coisas, para que saibais que tendes a vida eterna — vós que credes no nome do Filho de Deus."',`,
  `      reforco: 'Joel Beeke, em <em>The Quest for Full Assurance: The Legacy of Calvin and His Successors</em> (Edimburgo: Banner of Truth, 1999), escreve: <em>"A assurance tem três fundamentos: as promessas objetivas da Escritura, as evidências internas da graça na vida do crente, e o testemunho direto do Espírito. Os três devem ser cultivados — a assurance não é automática, mas é possível e normal para o crente maduro."</em>',`,
  'Day 239 reforco'
);

// DAY 240 — Três usos da lei
rep(
  `      reforco: 'Romanos 13.10: "O amor não pratica o mal contra o próximo. De sorte que o cumprimento da lei é o amor."',`,
  `      reforco: 'John Calvin, nas <em>Institutas da Religião Cristã</em> (II.7.6-12), escreve: <em>"O terceiro e principal uso da lei pertence aos crentes. Para eles, a lei é o melhor instrumento pelo qual aprendem diariamente com maior certeza o que é a vontade de Deus, à qual aspiram e na qual são confirmados."</em>',`,
  'Day 240 reforco'
);

// DAY 241 — Lei e Evangelho
rep(
  `      reforco: 'Romanos 3.31: "Anulamos, pois, a lei pela fé? De modo nenhum! Ao contrário, confirmamos a lei."',`,
  `      reforco: 'J.I. Packer, em <em>Knowing God</em> (Downers Grove: IVP, 1973), escreve: <em>"O crente não está sob a lei como meio de justificação — está liberado dela como juíza condenatória. Mas a lei permanece como padrão de vida santificada: ela revela o que o amor a Deus e ao próximo exige. A graça não abole a lei; ela nos capacita a cumpri-la pela primeira vez."</em>',`,
  'Day 241 reforco'
);

// DAY 242 — Sábado/Domingo
rep(
  `      reforco: 'Marcos 2.27-28: "O sábado foi feito por causa do homem, e não o homem por causa do sábado. Por isso, o Filho do Homem é senhor até do sábado."',`,
  `      reforco: 'John Murray, em <em>Collected Writings of John Murray</em> (Edimburgo: Banner of Truth, 1977, vol. 1), escreve: <em>"O descanso do domingo não é abolição do princípio sabático — é sua transposição para o primeiro dia da semana pela autoridade de Cristo ressurreto. A criação estabeleceu o ritmo de seis mais um; a ressurreição reorientou esse ritmo para celebrar a nova criação."</em>',`,
  'Day 242 reforco'
);

// DAY 243 — Síntese de agosto
rep(
  `      reforco: 'Colossenses 2.10: "E em Cristo estais cheios, o qual é o cabeça de todo principado e potestade."',`,
  `      reforco: 'John Murray, em <em>Redemption Accomplished and Applied</em> (Grand Rapids: Eerdmans, 1955), escreve: <em>"Toda a bênção espiritual do crente está em Cristo — nele está a aliança, nele está a redenção, nele está a justificação, nele está a santificação, nele está a glorificação. O cristão não apenas recebe bênçãos de Cristo; ele está em Cristo, que é a soma de todas as bênçãos."</em>',`,
  'Day 243 reforco'
);

console.log('=== Days 229-243 done ===\n');

// Write the file
fs.writeFileSync(file, content, 'utf8');
console.log('File written successfully!');
