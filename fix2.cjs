const fs = require('fs');
let content = fs.readFileSync('src/data/devocionalConfessional.ts', 'utf8');

function rep(old, nw, label) {
  if (!content.includes(old)) { console.error('NOT FOUND: ' + label); return; }
  content = content.replace(old, nw);
  console.log('OK: ' + label);
}

// DAY 166 — different exposicao than expected
rep(
  `      exposicao: 'João Batizava onde havia "muita água" — porque precisava de água suficiente para imersão. O termo grego baptizō significa mergulhar, imergir. A imersão representa melhor a morte, sepultura e ressurreição de Cristo descrita em Rm 6.3-4. O modo não é indiferente — ele comunica teologia.',
      reforco: 'Colossenses 2.12',`,
  `      exposicao: 'João Batizava onde havia "muita água" — porque precisava de água suficiente para imersão. O termo grego baptizō significa mergulhar, imergir. A imersão representa melhor a morte, sepultura e ressurreição de Cristo descrita em Rm 6.3-4. Wayne Grudem escreve em <em>Teologia Sistemática</em> que <em>"o batismo por imersão retrata mais vividamente a morte, o sepultamento e a ressurreição com Cristo do que os outros modos, pois a descida na água ilustra a morte e o sepultamento, e a saída da água ilustra a ressurreição"</em>. O modo não é indiferente — ele comunica teologia.',
      reforco: 'Wayne Grudem, em <em>Teologia Sistemática</em> (São Paulo: Vida Nova, 1999), escreve: <em>"O batismo por imersão retrata mais vividamente a morte, o sepultamento e a ressurreição com Cristo que os outros modos, pois a descida na água ilustra a morte e o sepultamento, e a saída da água ilustra a ressurreição."</em>',`,
  'Day 166 exposicao+reforco'
);

// DAY 167 — different exposicao than expected
rep(
  `      exposicao: 'Paulo declara: "um só batismo." O batismo é marca permanente de pertença a Cristo — não precisa ser renovado quando a fé vacila ou quando mudamos de Igreja. Aqueles que foram batizados como crentes professantes em outra Igreja evangélica não precisam ser rebatizados. O batismo é de Cristo, não da denominação.',
      reforco: 'Hebreus 9.26-28',`,
  `      exposicao: 'Paulo declara: "um só batismo." O batismo é marca permanente de pertença a Cristo — não precisa ser renovado quando a fé vacila ou quando mudamos de Igreja. R.C. Sproul escreve em <em>Chosen by God</em> que <em>"o batismo é a declaração pública de fé em Cristo — é o crente dizendo diante da Igreja e do mundo que morreu com Cristo e ressuscitou com ele"</em>. Aqueles que foram batizados como crentes professantes em outra Igreja evangélica não precisam ser rebatizados. O batismo é de Cristo, não da denominação.',
      reforco: 'R.C. Sproul, em <em>Chosen by God</em> (Carol Stream: Tyndale, 1986), escreve: <em>"O batismo é a declaração pública de fé em Cristo — é o crente dizendo diante da Igreja e do mundo que morreu com Cristo e ressuscitou com ele. Por isso a Bíblia o reserva para aqueles que creram, e não precisa ser repetido."</em>',`,
  'Day 167 exposicao+reforco'
);

// DAY 166 notas - check what's currently there
// DAY 167 notas - check what's currently there

// DAY 189
rep(
  `      reforco: 'Deuteronômio 30.11-14: "Porque este mandamento que hoje te ordeno não é demasiado difícil para ti, nem está longe de ti... mas a palavra está mui perto de ti."',`,
  `      reforco: 'B.B. Warfield, em <em>The Inspiration and Authority of the Bible</em> (Philadelphia: Presbyterian & Reformed, 1948), escreve: <em>"A perspicuidade da Escritura não significa que ela é igualmente clara em todos os pontos, mas que o caminho da salvação — o que Deus requer de nós e o que ele nos oferece em Cristo — está suficientemente claro para que qualquer leitor sincero o compreenda."</em>',`,
  'Day 189 reforco'
);

// DAY 210
rep(
  `      reforco: 'Gênesis 6.5: "E viu o Senhor que a maldade dos homens se havia multiplicado na terra e que era continuamente mau todo o pensamento e propósito do coração deles."',`,
  `      reforco: 'John Calvin, nas <em>Institutas da Religião Cristã</em> (II.1.8), escreve: <em>"Tudo o que está no homem — desde o entendimento até a vontade, desde a alma até a carne — está poluído e saturado de concupiscência. Ou antes: o homem não é apenas poluído — ele é polução. A depravação não está em uma parte; está no todo."</em>',`,
  'Day 210 reforco'
);

// DAY 219
rep(
  `      reforco: '1 Pedro 2.24: "Ele mesmo levou em seu corpo os nossos pecados sobre o madeiro, a fim de que, mortos para os pecados, vivamos para a justiça; por suas feridas fostes sarados."',`,
  `      reforco: 'John Stott, em <em>The Cross of Christ</em> (Downers Grove: IVP, 1986), escreve: <em>"A substituição é o coração da expiação. Cristo não apenas sofreu por nós — sofreu em nosso lugar. Nossos pecados foram para ele; sua justiça é para nós. Esta grande troca é a essência do Evangelho que Paulo, Pedro e Isaías proclamam."</em>',`,
  'Day 219 reforco'
);

// DAY 230
rep(
  `      reforco: 'Gálatas 2.16: "Sabendo, contudo, que o homem não é justificado por obras da lei, mas pela fé em Jesus Cristo, nós também cremos em Cristo Jesus, para sermos justificados pela fé em Cristo e não pelas obras da lei."',`,
  `      reforco: 'R.C. Sproul, em <em>Faith Alone: The Evangelical Doctrine of Justification</em> (Grand Rapids: Baker, 1995), escreve: <em>"Sola fide não foi invenção de Lutero — foi redescoberta de Paulo. A fé é o instrumento da justificação, não a sua base. A base é a justiça de Cristo; a fé é a mão que recebe o que Cristo conquistou. As obras são o fruto, jamais a raiz."</em>',`,
  'Day 230 reforco'
);

// DAY 233
rep(
  `      reforco: 'Hebreus 12.6-7: "Porque o Senhor disciplina aquele que ama e açoita a todo filho que recebe. É para correção que sofreis; Deus vos trata como filhos."',`,
  `      reforco: 'Joel Beeke, em <em>Living for God\'s Glory</em> (Orlando: Reformation Trust, 2008), escreve: <em>"O sofrimento do crente não contradiz a adoção — é evidência dela. Deus disciplina os filhos, não os estranhos. O sofrimento, quando recebido pela fé, é prova de que Deus nos trata como filhos amados que ele quer conformar à imagem do Filho primogênito."</em>',`,
  'Day 233 reforco'
);

// DAY 234
rep(
  `      reforco: '2 Coríntios 3.18: "Mas todos nós, com o rosto descoberto, refletindo como espelho a glória do Senhor, somos transformados de glória em glória na mesma imagem, como pelo Senhor Espírito."',`,
  `      reforco: 'John Owen, em <em>Mortification of Sin</em> (1656), escreve: <em>"Mata o pecado ou ele te matará. A santificação não é automática — exige esforço ativo pelo crente, ainda que esse esforço seja capacitado pelo Espírito. Nenhum homem pode mortificar qualquer pecado exceto pelo Espírito — mas todo homem deve mortificá-lo ativamente."</em>',`,
  'Day 234 reforco'
);

// DAY 235
rep(
  `      reforco: 'Gálatas 5.17: "Porque a carne tem desejos contrários aos do Espírito, e o Espírito tem desejos contrários aos da carne; estes se opõem entre si, para que não façais o que quereis."',`,
  `      reforco: 'John Owen, em <em>Indwelling Sin in Believers</em> (1668), escreve: <em>"O pecado que permanece no crente não é um hóspede passivo — é um inimigo ativo que trama, seduz e resiste ao Espírito. O crente que subestima o poder do pecado interior está prestes a ser surpreendido. A vigilância constante é a resposta bíblica à realidade do pecado indwelling."</em>',`,
  'Day 235 reforco'
);

// DAY 236
rep(
  `      reforco: 'Efésios 6.12: "Porque não temos que lutar contra a carne e o sangue, mas contra os principados, contra as potestades, contra os príncipes das trevas desta geração, contra as hostes espirituais da maldade nos lugares celestiais."',`,
  `      reforco: 'John Owen, em <em>Mortification of Sin</em> (1656), escreve: <em>"A luta contra o pecado não é opcional para o crente — é obrigatória. Todo crente é chamado a combater ativamente os movimentos do pecado interior, usando os meios de graça como armas espirituais. Quem não luta está entregando o campo sem combate."</em>',`,
  'Day 236 reforco'
);

// DAY 237
rep(
  `      reforco: 'Hebreus 10.24-25: "E consideremo-nos uns aos outros, para nos estimularmos ao amor e às boas obras; não deixando a nossa congregação, como é costume de alguns."',`,
  `      reforco: 'John Calvin, nas <em>Institutas da Religião Cristã</em> (IV.1.1), escreve: <em>"Deus não nos chama individualmente para conduzi-nos isolados ao céu — ele nos coloca na Igreja, que é a mãe de todos os crentes. Fora da Igreja não há remissão de pecados, não há salvação. Os meios de graça que ela administra são os canais pelos quais o Espírito nos santifica."</em>',`,
  'Day 237 reforco'
);

fs.writeFileSync('src/data/devocionalConfessional.ts', content, 'utf8');
console.log('Done!');
