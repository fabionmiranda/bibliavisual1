const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'paraFamilia.ts');
let txt = fs.readFileSync(filePath, 'utf8');

const fixes = [

  // DIA 5 — Gn 4:1-26 — remove referência a Gn 1:28 no § Exegese
  [
    'o mesmo verbo de Gn 1:28 (dominar sobre a criação)',
    'o mesmo verbo do mandato criacional (dominar)'
  ],

  // DIA 10 — Gn 10:1-32 — remove Gn 12:3 no § Aplicação (movimento I)
  [
    'mostre que Deus ama "todas as famílias da terra" (Gn 12:3)',
    'mostre que Deus ama todas as famílias da terra'
  ],

  // DIA 10 — Gn 10:1-32 — remove Gn 9:21 no § Aplicação (movimento II)
  [
    'Noé não era perfeito (Gn 9:21) mas era fiel',
    'Noé não era perfeito mas era fiel'
  ],

  // DIA 11 — Gn 11:1-9 — remove referência a Gn 1:26 no § Exegese
  [
    'E o "Vinde, desçamos" (plural — eco da Trindade de Gn 1:26)',
    'E o "Vinde, desçamos" (plural — eco trinitário do plural divino)'
  ],

  // DIA 14 — Gn 12:1-9 — remove referência a Gn 11:4 no § Exegese
  [
    'contrasta diretamente com Babel (Gn 11:4: "façamos para nós um nome")',
    'contrasta diretamente com o projeto de Babel — onde os homens buscavam fazer grande o próprio nome pela própria força'
  ],

  // DIA 15 — Gn 12:10-20 — remove referência a Gn 20:12 no § Exegese
  [
    'Sarai era de fato sua meia-irmã (Gn 20:12)',
    'Sarai era de fato sua meia-irmã'
  ],

  // DIA 15 — remove também Ef 5:25-29 que está fora de contexto de perícope
  // (não é Gênesis, mas para evitar citações bíblicas fora da perícope como referência de movimento)
  // deixar — é § Exegese que pode citar NT para teologia

  // DIA 29 — Gn 21:9-21 — remove Gn 16:2 no § Exegese do movimento I
  [
    'consequência direta da decisão de Sarai de dar Hagar a Abraão (Gn 16:2)',
    'consequência direta da decisão tomada por Sarai em Gênesis 16 de dar Hagar a Abraão'
  ],

  // DIA 29 — Gn 21:9-21 — remove Gn 16:13 no § Teologia do movimento II
  [
    'o Deus que vê (El Roi, Gn 16:13) ainda via',
    'o Deus que vê (El Roi — nome que Hagar lhe dera no deserto anterior) ainda via'
  ],

];

let count = 0;
for (const [from, to] of fixes) {
  if (txt.includes(from)) {
    txt = txt.replace(from, to);
    console.log('✓ corrigido: ' + from.slice(0, 60) + '...');
    count++;
  } else {
    console.warn('✗ NÃO ENCONTRADO: ' + from.slice(0, 60));
  }
}

fs.writeFileSync(filePath, txt, 'utf8');
console.log('\nTotal: ' + count + ' correções aplicadas.');
