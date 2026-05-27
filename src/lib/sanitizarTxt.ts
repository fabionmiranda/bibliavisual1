/**
 * Sanitiza texto lido de arquivos .txt do admin.
 * Corrige encoding corrompido, caracteres inválidos e artefatos comuns
 * antes de exibir qualquer conteúdo na biblioteca.
 */

// Mapa de sequências UTF-8 lidas como Latin-1/Windows-1252 → caractere correto
const LATIN1_MAP: [RegExp, string][] = [
  // Vogais acentuadas maiúsculas
  [/Ã€/g, 'À'], [/Ã/g, 'Á'],  [/Ã‚/g, 'Â'], [/Ãƒ/g, 'Ã'],
  [/Ã„/g, 'Ä'], [/Ã…/g, 'Å'], [/Ã†/g, 'Æ'], [/Ã‡/g, 'Ç'],
  [/Ãˆ/g, 'È'], [/Ã‰/g, 'É'], [/ÃŠ/g, 'Ê'], [/Ã‹/g, 'Ë'],
  [/ÃŒ/g, 'Ì'], [/Ã/g,  'Í'], [/ÃŽ/g, 'Î'], [/Ã/g,  'Ï'],
  [/Ã'/g, 'Ñ'], [/Ã'/g, 'Ò'], [/Ã"/g, 'Ó'], [/Ã"/g, 'Ô'],
  [/Ã•/g, 'Õ'], [/Ã–/g, 'Ö'], [/Ã˜/g, 'Ø'], [/Ã™/g, 'Ù'],
  [/Ãš/g, 'Ú'], [/Ã›/g, 'Û'], [/Ãœ/g, 'Ü'], [/Ãž/g, 'Þ'],
  // Vogais acentuadas minúsculas
  [/Ã /g, 'à'], [/Ã¡/g, 'á'], [/Ã¢/g, 'â'], [/Ã£/g, 'ã'],
  [/Ã¤/g, 'ä'], [/Ã¥/g, 'å'], [/Ã¦/g, 'æ'], [/Ã§/g, 'ç'],
  [/Ã¨/g, 'è'], [/Ã©/g, 'é'], [/Ãª/g, 'ê'], [/Ã«/g, 'ë'],
  [/Ã¬/g, 'ì'], [/Ã­/g, 'í'], [/Ã®/g, 'î'], [/Ã¯/g, 'ï'],
  [/Ã°/g, 'ð'], [/Ã±/g, 'ñ'], [/Ã²/g, 'ò'], [/Ã³/g, 'ó'],
  [/Ã´/g, 'ô'], [/Ãµ/g, 'õ'], [/Ã¶/g, 'ö'], [/Ã¸/g, 'ø'],
  [/Ã¹/g, 'ù'], [/Ãº/g, 'ú'], [/Ã»/g, 'û'], [/Ã¼/g, 'ü'],
  [/Ã½/g, 'ý'], [/Ã¾/g, 'þ'], [/Ã¿/g, 'ÿ'],
  // Pontuação e símbolos comuns
  [/â€"/g,  '—'],  // em dash
  [/â€"/g,  '–'],  // en dash
  [/â€˜/g,  '‘'], // ' left single quote
  [/â€™/g,  '’'], // ' right single quote / apóstrofo
  [/â€œ/g,  '“'], // " left double quote
  [/â€/g,   '”'], // " right double quote
  [/â€¢/g,  '•'],
  [/â€¦/g,  '…'],
  [/â†'/g,  '→'],
  [/Â·/g,   '·'],
  [/Â°/g,   '°'],
  [/Â©/g,   '©'],
  [/Â®/g,   '®'],
  [/Âª/g,   'ª'],
  [/Âº/g,   'º'],
  [/â„¢/g,  '™'],
  [/â€/g,   '"'],  // fallback para aspas residuais
  [/Â /g,   ' '],  // espaço não-quebrável corrompido → espaço normal
];

// Caracteres de controle inválidos (preserva \n \r \t)
const CTRL_RE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

// Caractere de substituição Unicode (resultado de encoding errado)
const REPLACEMENT_RE = /�/g;

// Espaços não-quebráveis e variantes → espaço normal
const NBSP_RE = /[ ­​‌‍⁠﻿]/g;

// BOM (Byte Order Mark) no início
const BOM_RE = /^﻿/;

export function sanitizarTxt(texto: string): string {
  let t = texto;

  // 1. Remove BOM
  t = t.replace(BOM_RE, '');

  // 2. Corrige encoding Latin-1/Windows-1252 mal interpretado
  for (const [re, sub] of LATIN1_MAP) {
    t = t.replace(re, sub);
  }

  // 3. Remove caracteres de controle inválidos
  t = t.replace(CTRL_RE, '');

  // 4. Remove caractere de substituição
  t = t.replace(REPLACEMENT_RE, '');

  // 5. Normaliza espaços especiais para espaço comum
  t = t.replace(NBSP_RE, ' ');

  // 6. Normaliza quebras de linha (CRLF → LF)
  t = t.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // 7. Remove espaços no fim de cada linha
  t = t.split('\n').map(l => l.trimEnd()).join('\n');

  // 8. Colapsa mais de 3 linhas em branco seguidas em 2
  t = t.replace(/\n{4,}/g, '\n\n\n');

  return t;
}
