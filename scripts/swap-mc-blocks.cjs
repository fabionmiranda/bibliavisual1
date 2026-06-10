// Swaps return values between gerarReflexao Mc block and gerarOracao Mc block
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'DevocionalPage.tsx');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Find all Mc guard lines and their return lines in both blocks
// gerarReflexao Mc block: lines ~1974-2217
// gerarOracao Mc block: lines ~3534-3777

// Strategy: collect {lineIndex, returnValue} for each block, then swap

function findMcBlocks(lines) {
  const blocks = [];
  let inBlock = false;
  let blockStart = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("// MARCOS [1]–[81]")) {
      if (inBlock) {
        // second block
        blocks.push({ start: i, entries: [] });
      } else {
        inBlock = true;
        blocks.push({ start: i, entries: [] });
      }
    }
  }
  return blocks;
}

// Find each Mc guard line + its return line index
function collectEntries(lines, blockStart, blockEnd) {
  const entries = [];
  for (let i = blockStart; i < blockEnd; i++) {
    if (lines[i].includes("d.livroAbrev === 'Mc'") && lines[i].includes('if (')) {
      // next line should be the return
      entries.push({ guardLine: i, returnLine: i + 1 });
    }
  }
  return entries;
}

// Find the two MARCOS block boundaries
let block1Start = -1, block1End = -1;
let block2Start = -1, block2End = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("// MARCOS [1]–[81]")) {
    if (block1Start === -1) block1Start = i;
    else block2Start = i;
  }
  if (block1Start !== -1 && block1End === -1 && i > block1Start && lines[i].includes("// Atos dos Apóstolos")) {
    block1End = i;
  }
  if (block2Start !== -1 && block2End === -1 && i > block2Start && lines[i].startsWith('  return (')) {
    block2End = i;
  }
}

console.log(`Block1: lines ${block1Start+1}-${block1End+1}`);
console.log(`Block2: lines ${block2Start+1}-${block2End+1}`);

const entries1 = collectEntries(lines, block1Start, block1End);
const entries2 = collectEntries(lines, block2Start, block2End);

console.log(`Entries in block1: ${entries1.length}`);
console.log(`Entries in block2: ${entries2.length}`);

if (entries1.length !== entries2.length) {
  console.error('MISMATCH in entry count!');
  process.exit(1);
}

// Swap return lines
const newLines = [...lines];
for (let i = 0; i < entries1.length; i++) {
  const r1 = entries1[i].returnLine;
  const r2 = entries2[i].returnLine;
  const tmp = newLines[r1];
  newLines[r1] = newLines[r2];
  newLines[r2] = tmp;
}

fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
console.log('Done! Return values swapped between the two Mc blocks.');
