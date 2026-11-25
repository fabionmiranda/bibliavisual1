/* ─── Conselheiro da Alma: datas móveis ───────────────────────────────────────────────
   Páscoa (algoritmo gregoriano anônimo / Meeus–Jones–Butcher), trilha da Semana Santa
   e as datas móveis brasileiras do Dia das Mães e do Dia dos Pais.
   Sem dependências: este arquivo é testado direto pelo Node (tests/falaAlmaDatas.test.mjs). */

export interface LeituraEspecial {
  /** chave estável, ex.: "semana-santa-sexta" */
  id: string;
  rotulo: string;
  leitura: string;
  ligacao: string;
  /** referência bíblica da ligação, quando houver */
  ref?: string;
}

/** Data da Páscoa no calendário gregoriano (mês 0–11). */
export function pascoa(ano: number): Date {
  const a = ano % 19;
  const b = Math.floor(ano / 100);
  const c = ano % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(ano, mes - 1, dia);
}

const SEMANA_SANTA: Omit<LeituraEspecial, 'id'>[] = [
  { rotulo: 'Domingo de Ramos', leitura: 'Sl 118', ligacao: '“Bendito o que vem em nome do Senhor”', ref: 'Sl 118.26' },
  { rotulo: 'Segunda-feira Santa', leitura: 'Sl 8', ligacao: 'O louvor das crianças no templo', ref: 'Mt 21.16' },
  { rotulo: 'Terça-feira Santa', leitura: 'Sl 41', ligacao: 'A traição', ref: 'Jo 13.18' },
  { rotulo: 'Quarta-feira Santa', leitura: 'Sl 69', ligacao: 'O zelo pela tua casa', ref: 'Jo 2.17' },
  { rotulo: 'Quinta-feira Santa', leitura: 'Sl 116', ligacao: 'O Hallel da Ceia' },
  { rotulo: 'Sexta-feira da Paixão', leitura: 'Sl 22', ligacao: '“Deus meu, Deus meu, por que me desamparaste?”', ref: 'Mt 27.46' },
  { rotulo: 'Sábado de Aleluia', leitura: 'Sl 88', ligacao: 'O silêncio do túmulo' },
  { rotulo: 'Domingo de Páscoa', leitura: 'Sl 16', ligacao: '“Não permitirás que o teu Santo veja corrupção”', ref: 'At 2.27' },
];
const IDS_SEMANA_SANTA = ['ramos', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'pascoa'];

function mesmoDia(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/** n-ésimo domingo de um mês (mês 0–11). */
export function nesimoDomingo(ano: number, mes: number, n: number): Date {
  const primeiro = new Date(ano, mes, 1);
  const deslocamento = (7 - primeiro.getDay()) % 7;
  return new Date(ano, mes, 1 + deslocamento + (n - 1) * 7);
}

/** Datas da Semana Santa do ano: de Domingo de Ramos (índice 0) até a Páscoa (índice 7). */
export function semanaSanta(ano: number): Date[] {
  const p = pascoa(ano);
  return Array.from({ length: 8 }, (_, i) => new Date(p.getFullYear(), p.getMonth(), p.getDate() - 7 + i));
}

/** Leituras especiais do dia (Semana Santa, Dia das Mães, Dia dos Pais). O plano normal nunca é deslocado. */
export function leiturasEspeciais(data: Date): LeituraEspecial[] {
  const ano = data.getFullYear();
  const lista: LeituraEspecial[] = [];
  semanaSanta(ano).forEach((d, i) => {
    if (mesmoDia(d, data)) lista.push({ id: `semana-santa-${IDS_SEMANA_SANTA[i]}`, ...SEMANA_SANTA[i] });
  });
  // Brasil: Dia das Mães = 2º domingo de maio; Dia dos Pais = 2º domingo de agosto
  if (mesmoDia(nesimoDomingo(ano, 4, 2), data)) {
    lista.push({ id: 'dia-das-maes', rotulo: 'Dia das Mães', leitura: 'Sl 127', ligacao: '“Herança do Senhor são os filhos”', ref: 'Sl 127.3' });
  }
  if (mesmoDia(nesimoDomingo(ano, 7, 2), data)) {
    lista.push({ id: 'dia-dos-pais', rotulo: 'Dia dos Pais', leitura: 'Sl 103.13', ligacao: 'A compaixão do Pai pelos filhos', ref: 'Sl 103.13' });
  }
  return lista;
}
