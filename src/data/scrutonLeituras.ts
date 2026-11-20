// Leituras guiadas (parágrafo por parágrafo) disponíveis para "Como Ser um Conservador".
// Para adicionar um capítulo: gere o arquivo de dados a partir do .txt e registre aqui.
import type { LeituraGuiada } from './leituraGuiadaTipos';
import { BASE_SCRUTON } from './scrutonConservador';
import { PREFACIO_PARAGRAFOS } from './scrutonPrefacioParagrafos';
import { CAP01_PARAGRAFOS } from './scrutonCap01Paragrafos';
import { CAP02_PARAGRAFOS } from './scrutonCap02Paragrafos';
import { CAP03_PARAGRAFOS } from './scrutonCap03Paragrafos';
import { CAP04_PARAGRAFOS } from './scrutonCap04Paragrafos';
import { CAP05_PARAGRAFOS } from './scrutonCap05Paragrafos';
import { CAP06_PARAGRAFOS } from './scrutonCap06Paragrafos';
import { CAP07_PARAGRAFOS } from './scrutonCap07Paragrafos';
import { CAP08_PARAGRAFOS } from './scrutonCap08Paragrafos';
import { CAP09_PARAGRAFOS } from './scrutonCap09Paragrafos';
import { CAP10_PARAGRAFOS } from './scrutonCap10Paragrafos';

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
  'capitulo-4': { dados: CAP04_PARAGRAFOS, store: 'scruton-cap04-paragrafos' },
  'capitulo-5': { dados: CAP05_PARAGRAFOS, store: 'scruton-cap05-paragrafos' },
  'capitulo-6': { dados: CAP06_PARAGRAFOS, store: 'scruton-cap06-paragrafos' },
  'capitulo-7': { dados: CAP07_PARAGRAFOS, store: 'scruton-cap07-paragrafos' },
  'capitulo-8': { dados: CAP08_PARAGRAFOS, store: 'scruton-cap08-paragrafos' },
  'capitulo-9': { dados: CAP09_PARAGRAFOS, store: 'scruton-cap09-paragrafos' },
  'capitulo-10': { dados: CAP10_PARAGRAFOS, store: 'scruton-cap10-paragrafos' },
};

export const rotaLeitura = (slug: string) => `${BASE_SCRUTON}/${slug}/paragrafos`;
