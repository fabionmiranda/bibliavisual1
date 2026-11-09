import type { DiaFamiliar } from '../devocionalFamiliar';
import { SEMANA_40 } from './semana40';
import { SEMANA_41 } from './semana41';
import { SEMANA_42 } from './semana42';
import { SEMANA_43 } from './semana43';
import { SEMANA_44 } from './semana44';
import { SEMANA_45 } from './semana45';
import { SEMANA_46 } from './semana46';
import { SEMANA_47 } from './semana47';
import { SEMANA_48 } from './semana48';
import { SEMANA_49 } from './semana49';
import { SEMANA_50 } from './semana50';
import { SEMANA_51 } from './semana51';
import { SEMANA_52 } from './semana52';

export type ExtrasDia = Pick<DiaFamiliar, 'conversaATres' | 'leituraAutor'>;

// Conversa a Três, gabarito e autor recomendado de cada dia da Estação IV
export const EXTRAS_ESTACAO_IV: Record<number, ExtrasDia> = {
  ...SEMANA_40, ...SEMANA_41, ...SEMANA_42, ...SEMANA_43, ...SEMANA_44, ...SEMANA_45, ...SEMANA_46,
  ...SEMANA_47, ...SEMANA_48, ...SEMANA_49, ...SEMANA_50, ...SEMANA_51, ...SEMANA_52,
};
