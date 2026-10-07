const fs = require('fs');
let content = fs.readFileSync('src/data/devocionalConfessional.ts', 'utf8');

function rep(old, nw, label) {
  if (!content.includes(old)) { console.error('NOT FOUND: ' + label); return; }
  content = content.replace(old, nw);
  console.log('OK: ' + label);
}

// DAY 166
rep(
  `      exposicao: 'João Batizava onde havia "muita água" — porque precisava de água suficiente para imersão. O termo grego baptizō significa mergulhar, imergir. A imersão representa melhor a morte, sepultura e ressurreição de Cristo descrita em Rm 6.3-4. O modo não é indiferente — ele comunica teologia.',
      reforco: 'Colossenses 2.12',`,
  `      exposicao: 'João Batizava onde havia "muita água" — porque precisava de água suficiente para imersão. O termo grego baptizō significa mergulhar, imergir. A imersão representa melhor a morte, sepultura e ressurreição de Cristo descrita em Rm 6.3-4. Wayne Grudem escreve em <em>Teologia Sistemática</em> que <em>"o batismo por imersão retrata mais vividamente a morte, o sepultamento e a ressurreição com Cristo do que os outros modos, pois a descida na água ilustra a morte e o sepultamento, e a saída da água ilustra a ressurreição"</em>. O modo não é indiferente — ele comunica teologia.',
      reforco: 'Wayne Grudem, em <em>Teologia Sistemática</em> (São Paulo: Vida Nova, 1999), escreve: <em>"O batismo por imersão retrata mais vividamente a morte, o sepultamento e a ressurreição com Cristo que os outros modos, pois a descida na água ilustra a morte e o sepultamento, e a saída da água ilustra a ressurreição."</em>',`,
  'Day 166 reforco'
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
  `      exposicao: 'Paulo declara: "um só batismo." O batismo é marca permanente de pertença a Cristo — não precisa ser renovado quando a fé vacila ou quando mudamos de Igreja. Aqueles que foram batizados como crentes professantes em outra Igreja evangélica não precisam ser rebatizados. O batismo é de Cristo, não da denominação.',
      reforco: 'Hebreus 9.26-28',`,
  `      exposicao: 'Paulo declara: "um só batismo." O batismo é marca permanente de pertença a Cristo — não precisa ser renovado quando a fé vacila ou quando mudamos de Igreja. R.C. Sproul escreve em <em>Chosen by God</em> que <em>"o batismo é a declaração pública de fé em Cristo — é o crente dizendo diante da Igreja e do mundo que morreu com Cristo e ressuscitou com ele"</em>. Aqueles que foram batizados como crentes professantes em outra Igreja evangélica não precisam ser rebatizados. O batismo é de Cristo, não da denominação.',
      reforco: 'R.C. Sproul, em <em>Chosen by God</em> (Carol Stream: Tyndale, 1986), escreve: <em>"O batismo é a declaração pública de fé em Cristo — é o crente dizendo diante da Igreja e do mundo que morreu com Cristo e ressuscitou com ele. Por isso a Bíblia o reserva para aqueles que creram, e não precisa ser repetido."</em>',`,
  'Day 167 reforco'
);

rep(
  `        'LUTHER, Martin. <em>Catecismo Maior</em>. São Paulo: Concórdia, 2000. Sobre o Batismo.',
        'CB 1689, Cap. 29 §4.',`,
  `        'SPROUL, R.C. <em>Chosen by God</em>. Carol Stream: Tyndale, 1986. A relação entre eleição, fé e batismo — o batismo como declaração pública de fé pessoal em Cristo, administrado uma única vez.',
        'SCHREINER, Thomas; WRIGHT, Shawn. <em>Believer\'s Baptism: Sign of the New Covenant in Christ</em>. Nashville: B&H, 2006. O argumento bíblico-teológico pela exclusividade do batismo de crentes e sua unicidade.',`,
  'Day 167 notas'
);

fs.writeFileSync('src/data/devocionalConfessional.ts', content, 'utf8');
console.log('Done!');
