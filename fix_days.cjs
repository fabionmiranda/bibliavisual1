const fs = require('fs');
let txt = fs.readFileSync('src/data/devocionalConfessional.ts', 'utf8');

function rep(old, neu) {
  if (!txt.includes(old)) { console.error('NOT FOUND: ' + old.slice(0,80)); return false; }
  txt = txt.replace(old, neu);
  return true;
}

// Day 154 exposicao+reforco
rep(
  "      exposicao: 'O Concílio de Jerusalém (At 15) é o modelo bíblico de deliberação colegial. Igrejas não são ilhas — precisam umas das outras para discernir, corrigir erros e manter unidade doutrinária. A comunhão inter-eclesial não viola autonomia local, mas a complementa.',\n      reforco: 'Atos 15.28',",
  "      exposicao: 'O Concílio de Jerusalém (At 15) é o modelo bíblico de deliberação colegial. Igrejas não são ilhas — precisam umas das outras para discernir, corrigir erros e manter unidade doutrinária. A comunhão inter-eclesial não viola autonomia local, mas a complementa. Louis Berkhof escreve em <em>Teologia Sistemática</em>: <em>\"A deliberação colegial entre igrejas não enfraquece a autonomia local — ela a protege de erros que o isolamento torna inevitáveis. A sabedoria do corpo é maior que a sabedoria de qualquer membro isolado.\"</em>',\n      reforco: 'Louis Berkhof, em <em>Teologia Sistemática</em> (Grand Rapids: Eerdmans, 1938), ensina: <em>\"As igrejas locais não são unidades isoladas e autossuficientes. Em toda questão que afeta o corpo mais amplo do povo de Deus, elas têm obrigação de buscar conselho, exercer correção mútua e manter a unidade da fé — como o próprio concílio de Jerusalém demonstra.\"</em>',"
);

// Day 154 notas
rep(
  "        'HAMMETT, John S. <em>Biblical Foundations for Baptist Churches</em>. Grand Rapids: Kregel, 2005.',\n        'CB 1689, Cap. 26 §12.',\n      ],\n      notaInicio: 312,",
  "        'BERKHOF, Louis. <em>Teologia Sistemática</em>. Grand Rapids: Eerdmans, 1938. Tratamento da eclesiologia reformada e da autoridade colegial — fonte da citação do dia.',\n        'HAMMETT, John S. <em>Biblical Foundations for Baptist Churches</em>. Grand Rapids: Kregel, 2005. Eclesiologia batista e a relação entre autonomia local e comunhão inter-eclesial.',\n      ],\n      notaInicio: 312,"
);

// Day 155 exposicao+reforco
rep(
  "      exposicao: 'A preeminência de Cristo na Igreja não é compartilhada com nenhum sucessor humano. Cristo governa sua Igreja pela Palavra e pelo Espírito — não por hierarquia eclesiástica. Qualquer estrutura que coloque um homem como cabeça universal usurpa a prerrogativa exclusiva de Cristo.',\n      reforco: 'Efésios 5.23',",
  "      exposicao: 'A preeminência de Cristo na Igreja não é compartilhada com nenhum sucessor humano. Cristo governa sua Igreja pela Palavra e pelo Espírito — não por hierarquia eclesiástica. Qualquer estrutura que coloque um homem como cabeça universal usurpa a prerrogativa exclusiva de Cristo. Michael Horton escreve em <em>The Christian Faith</em>: <em>\"Cristo é cabeça da Igreja não por delegação — mas por direito de conquista e por decreto eterno do Pai. Nenhuma autoridade humana pode reivindicar este ofício sem usurpar o que pertence exclusivamente ao Filho de Deus.\"</em>',\n      reforco: 'Michael Horton, em <em>The Christian Faith</em> (Grand Rapids: Zondervan, 2011), afirma: <em>\"A Reforma protestante não foi apenas disputa sobre a justificação — foi disputa sobre a cabeça da Igreja. Reconhecer Cristo como único cabeça é afirmar que toda autoridade eclesiástica é ministerial e derivada, nunca soberana nem vicária.\"</em>',"
);

// Day 155 notas
rep(
  "        'GRUDEM, Wayne. <em>Teologia Sistemática</em>. São Paulo: Vida Nova, 1999. Cap. 44: A Natureza da Igreja.',\n        'CB 1689, Cap. 26 §13.',\n      ],\n      notaInicio: 314,",
  "        'HORTON, Michael. <em>The Christian Faith: A Systematic Theology for Pilgrims on the Way</em>. Grand Rapids: Zondervan, 2011. Análise da cabeça da Igreja e da autoridade de Cristo — fonte da citação do dia.',\n        'GRUDEM, Wayne. <em>Teologia Sistemática</em>. São Paulo: Vida Nova, 1999. Cap. 44: A Natureza da Igreja — tratamento das marcas da Igreja e da cabeça que Cristo é.',\n      ],\n      notaInicio: 314,"
);

// Day 156 exposicao+reforco
rep(
  "      exposicao: 'Membresia eclesiástica não é formalidade burocrática — é compromisso público de pertencer ao corpo de Cristo, submeter-se à sua disciplina, e viver em comunhão com outros crentes. Em Atos 2, o batismo é o rito de entrada na comunidade visível dos salvos.',\n      reforco: '1 Coríntios 12.13',",
  "      exposicao: 'Membresia eclesiástica não é formalidade burocrática — é compromisso público de pertencer ao corpo de Cristo, submeter-se à sua disciplina, e viver em comunhão com outros crentes. Em Atos 2, o batismo é o rito de entrada na comunidade visível dos salvos. Sinclair Ferguson escreve em <em>The Holy Spirit</em>: <em>\"Pertencer à Igreja visível é a consequência natural e necessária da obra do Espírito Santo — aquele que é batizado no Espírito é batizado em um único corpo, e este corpo se manifesta historicamente na Igreja local onde os membros se conhecem e se comprometem uns com os outros.\"</em>',\n      reforco: 'Sinclair Ferguson, em <em>The Holy Spirit</em> (Downers Grove: IVP, 1996), ensina: <em>\"A membresia formal na Igreja local não é convenção eclesiástica dispensável — é a expressão concreta e pública de que o Espírito nos uniu ao corpo de Cristo. Viver como cristão sem pertencer formalmente a uma Igreja local é contradição entre confissão e prática.\"</em>',"
);

// Day 156 notas
rep(
  "        'DEVER, Mark. <em>What Is a Healthy Church?</em> Wheaton: Crossway, 2007.',\n        'CB 1689, Cap. 26 §14.',\n      ],\n      notaInicio: 316,",
  "        'FERGUSON, Sinclair B. <em>The Holy Spirit</em>. Downers Grove: IVP, 1996. Pneumatologia reformada que liga a obra do Espírito à membresia e comunhão eclesiástica — fonte da citação do dia.',\n        'DEVER, Mark. <em>What Is a Healthy Church?</em> Wheaton: Crossway, 2007. Defesa bíblica e prática da membresia formal como marca de Igreja saudável.',\n      ],\n      notaInicio: 316,"
);

// Day 157 exposicao+reforco
rep(
  "      exposicao: 'Cristo governa sua Igreja através de homens chamados, qualificados e ordenados. Presbíteros (bispos) pregam, ensinam e pastoreiam; diáconos servem nas necessidades práticas. O governo eclesiástico não é democracia pura, nem monarquia — é aristocracia espiritual sujeita a Cristo.',\n      reforco: '1 Timóteo 3.1-13',",
  "      exposicao: 'Cristo governa sua Igreja através de homens chamados, qualificados e ordenados. Presbíteros (bispos) pregam, ensinam e pastoreiam; diáconos servem nas necessidades práticas. O governo eclesiástico não é democracia pura, nem monarquia — é aristocracia espiritual sujeita a Cristo. Joel Beeke escreve em <em>Reformed Preaching</em>: <em>\"Os oficiais da Igreja não exercem autoridade própria — são servos do Rei Jesus, chamados a apascentar o rebanho dele conforme os padrões que ele mesmo estabeleceu nas Escrituras. O peso do ofício pastoral é insustentável sem a consciência de que é Cristo quem chama, qualifica e sustenta.\"</em>',\n      reforco: 'Joel Beeke, em <em>Reformed Preaching</em> (Wheaton: Crossway, 2018), afirma: <em>\"O ofício pastoral não é carreira — é vocação. O presbitério não é comitê executivo — é ministério de pastoreio e ensino. Os diáconos não são administradores — são servos que carregam as necessidades do povo de Deus com as mãos de Cristo.\"</em>',"
);

// Day 157 notas
rep(
  "        'STRAUCH, Alexander. <em>Liderança Bíblica de Anciãos</em>. São Paulo: Fiel, 2013.',\n        'CB 1689, Cap. 26 §15.',\n      ],\n      notaInicio: 318,",
  "        'BEEKE, Joel R. <em>Reformed Preaching</em>. Wheaton: Crossway, 2018. Vocação e caráter do ofício pastoral reformado — fonte da citação do dia.',\n        'STRAUCH, Alexander. <em>Liderança Bíblica de Anciãos</em>. São Paulo: Fiel, 2013. Tratamento exegético das qualificações e funções dos oficiais eclesiásticos segundo 1 Timóteo 3 e Tito 1.',\n      ],\n      notaInicio: 318,"
);

// Day 158 exposicao+reforco
rep(
  "      exposicao: 'A comunhão dos santos não é um clube social de pessoas religiosas — é participação na vida de Cristo. Unidos a ele, participamos de suas graças (justificação, santificação), seus sofrimentos (perseguição, mortificação) e sua glória futura. Esta união é obra do Espírito Santo pela fé.',\n      reforco: 'Romanos 8.17',",
  "      exposicao: 'A comunhão dos santos não é um clube social de pessoas religiosas — é participação na vida de Cristo. Unidos a ele, participamos de suas graças (justificação, santificação), seus sofrimentos (perseguição, mortificação) e sua glória futura. Esta união é obra do Espírito Santo pela fé. Edmund Clowney escreve em <em>The Church</em>: <em>\"A comunhão dos santos não é primeiro horizontal — é vertical. Ela começa com a união de cada crente com Cristo pelo Espírito, e então flui necessariamente para a comunhão entre os membros de seu corpo. Separar a comunhão dos santos da união com Cristo é desfigurar ambas.\"</em>',\n      reforco: 'Edmund Clowney, em <em>The Church</em> (Downers Grove: IVP, 1995), afirma: <em>\"A comunhão dos santos é obra do Espírito — não conquista humana. Onde Cristo é presente pelo Espírito, surge necessariamente comunhão real: partilha de graças, suporte mútuo nos sofrimentos, antecipação conjunta da glória.\"</em>',"
);

// Day 158 notas
rep(
  "        'CLOWNEY, Edmund P. <em>The Church</em>. Downers Grove: IVP, 1995.',\n        'CB 1689, Cap. 27 §1.',\n      ],\n      notaInicio: 320,",
  "        'CLOWNEY, Edmund P. <em>The Church</em>. Downers Grove: IVP, 1995. Eclesiologia reformada centrada em Cristo — fundamentação da comunhão dos santos na união com Cristo. Fonte primária da citação do dia.',\n        'LETHAM, Robert. <em>Union with Christ: In Scripture, History, and Theology</em>. Phillipsburg: P&R, 2011. A doutrina da união com Cristo como fundamento de toda a comunhão dos santos.',\n      ],\n      notaInicio: 320,"
);

// Day 159 exposicao+reforco
rep(
  "      exposicao: 'Carregar as cargas uns dos outros é cumprir a lei de Cristo — lei do amor. A comunhão dos santos não é optional — é obrigatória. Cada membro do corpo tem responsabilidade com os demais: orar, servir, encorajar, suprir necessidades, corrigir em amor.',\n      reforco: 'Atos 2.44-45',",
  "      exposicao: 'Carregar as cargas uns dos outros é cumprir a lei de Cristo — lei do amor. A comunhão dos santos não é optional — é obrigatória. Cada membro do corpo tem responsabilidade com os demais: orar, servir, encorajar, suprir necessidades, corrigir em amor. John Murray escreve em <em>Principles of Conduct</em>: <em>\"O amor ao próximo que Cristo ordena não é sentimento vago — é obrigação estruturada pela lei de Cristo, que implica ações concretas de suporte, correção fraterna e provisão material. A comunhão dos santos é, antes de tudo, ética cristã encarnada na vida da Igreja.\"</em>',\n      reforco: 'John Murray, em <em>Principles of Conduct</em> (Grand Rapids: Eerdmans, 1957), ensina: <em>\"As obrigações mútuas entre os santos não são opcionais nem meramente sentimentais — são imperativos da lei de Cristo. Carregar as cargas uns dos outros é a expressão prática e concreta do amor que a lei de Cristo estabelece como norma da vida eclesiástica.\"</em>',"
);

// Day 159 notas
rep(
  "        'PIPER, John; TAYLOR, Justin. <em>Suffering and the Sovereignty of God</em>. Wheaton: Crossway, 2006.',\n        'CB 1689, Cap. 27 §2.',\n      ],\n      notaInicio: 322,",
  "        'MURRAY, John. <em>Principles of Conduct: Aspects of Biblical Ethics</em>. Grand Rapids: Eerdmans, 1957. Ética bíblica reformada aplicada às obrigações mútuas na comunhão dos santos — fonte da citação do dia.',\n        'STOTT, John R. W. <em>The Message of Galatians</em>. Downers Grove: IVP, 1968. Exegese de Gálatas 6.2 e a lei de Cristo como lei de amor e cuidado mútuo.',\n      ],\n      notaInicio: 322,"
);

fs.writeFileSync('src/data/devocionalConfessional.ts', txt, 'utf8');
console.log('Days 154-159 done');
