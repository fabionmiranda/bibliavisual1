const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/devocionalConfessional.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove as chamadas do array principal
content = content.replace(/\s+\.\.\.gerarDiasAgosto_A\(\),\s*\.\.\.gerarDiasAgosto_B\(\),\s*\.\.\.gerarDiasAgosto_C\(\),\s*\.\.\.gerarDiasAgosto_D\(\),/g, '');

// 2. Remove tudo a partir da interface DiaAgosto (fim de julho)
const cutMarker = '\n// ============================================================================\n// Helper para dias de agosto';
const cutIdx = content.indexOf(cutMarker);
if (cutIdx !== -1) {
  content = content.slice(0, cutIdx) + '\n';
  console.log('Agosto removido a partir do marcador de interface DiaAgosto');
} else {
  console.log('Marcador nao encontrado — tentando por funcao');
  const cutMarker2 = '\ninterface DiaAgosto';
  const cutIdx2 = content.indexOf(cutMarker2);
  if (cutIdx2 !== -1) {
    content = content.slice(0, cutIdx2) + '\n';
    console.log('Agosto removido a partir de interface DiaAgosto');
  } else {
    const cutMarker3 = '\nfunction gerarDiasAgosto_A';
    const cutIdx3 = content.indexOf(cutMarker3);
    if (cutIdx3 !== -1) {
      content = content.slice(0, cutIdx3) + '\n';
      console.log('Agosto removido a partir de gerarDiasAgosto_A');
    } else {
      console.error('Nenhum marcador encontrado!');
      process.exit(1);
    }
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Linhas finais:', content.split('\n').length);
