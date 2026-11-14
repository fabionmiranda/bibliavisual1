// Leituras guiadas (parágrafo por parágrafo) disponíveis para "Como Ser um Conservador".
// Para adicionar um capítulo: gere o arquivo de dados a partir do .txt e registre aqui.
import type { LeituraGuiada } from './leituraGuiadaTipos';
import { BASE_SCRUTON } from './scrutonConservador';
import { PREFACIO_PARAGRAFOS } from './scrutonPrefacioParagrafos';
import { CAP01_PARAGRAFOS } from './scrutonCap01Paragrafos';
import { CAP02_PARAGRAFOS } from './scrutonCap02Paragrafos';
import { CAP03_PARAGRAFOS } from './scrutonCap03Paragrafos';
import { CAP05_PARAGRAFOS } from './scrutonCap05Paragrafos';

export interface LeituraRegistrada {
  dados: LeituraGuiada;
  /** chave do progresso salvo no navegador */
  store: string;
}

export const LEITURAS_SCRUTON: Record<string, LeituraRegistrada> = {
  prefacio: { dados: PREFACIO_PARAGRAFOS, store: 'scruton-prefacio-paragrafos' },
  'capitulo-1': { dados: CAP01_PARAGRAFOS, store: 'scruton-cap01-paragrafos' },
  'capitulo-2': { dados: CAP02_PARAGRAFOS, store: 'scruton-cap02-paragrafos' },
  'capitulo-3': { dados: CAP03_PARAGRAFOS, store: 'scruton-cap03-paragrafos' },
  'capitulo-5': { dados: CAP05_PARAGRAFOS, store: 'scruton-cap05-paragrafos' },
};

export const rotaLeitura = (slug: string) => `${BASE_SCRUTON}/${slug}/paragrafos`;
