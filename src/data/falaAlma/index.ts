/* ─── Devocional "Conselheiro da Alma: 365 conversas nos Salmos para o coração cansado" ───
   Plano: ./plano-anual-salmos.json (fonte oficial; a distribuição dos salmos não é recalculada).
   Conteúdo dos dias: ./conteudo.ts (só o que estiver com status "publicado" aparece para o usuário).
   O plano é indexado pela data "MM-DD", em qualquer ano. O 29/02 é um Selah bônus que só aparece em ano bissexto. */
import PLANO_JSON from './plano-anual-salmos.json';
import { CONTEUDO_FALA_ALMA, SELAH_FALA_ALMA } from './conteudo';

export type TipoDia = 'devocional' | 'selah' | 'colheita' | 'selah_bonus';
export type Estacao = 'Plantar' | 'Atravessar o vale' | 'Do vale ao trono' | 'Voltar para casa';

export interface EntradaPlano {
  data: string;                  // "MM-DD"
  dia_do_ano: number | null;     // 1–365; null no 29/02
  mes: string;
  tema_mes: string;
  estacao: Estacao;
  tipo: TipoDia;
  semana: number | null;         // 1–4; 5 nos dias 29–31 de outubro e dezembro; null em colheita/bônus
  nome_semana: string;
  leitura: string | null;        // "Sl 2.1-6"
  trechos: [number, number, number][];
}

/* Conteúdo do dia (seção 4.2 da especificação). Texto com Markdown simples: *itálico* e **negrito**. */
export type VozFala = 'pastoral' | 'pessoa' | 'pausa';
export interface FalaConteudo { voz: VozFala; texto: string }
export interface FaseConteudo {
  numero: number;
  emoji: string;
  fase: string;
  titulo: string;
  falas: FalaConteudo[];
  /** fase 7: passos numerados */
  lista: string[] | null;
  /** fases 1 a 6: pergunta do ⏸️ */
  pergunta_pausa: string | null;
}
export interface ConteudoDia {
  data: string;
  status: 'rascunho' | 'revisado' | 'publicado';
  pergunta: string;
  titulo: string;
  emoji: string;
  subtitulo: string;
  frase_do_dia: string;
  fases: FaseConteudo[];
  oracao: string;
  amanha: { leitura: string; titulo: string } | null;
  nota_cuidado: boolean;
  versiculo_ancora: string | null;
  /** texto bíblico inserido pelo editor (só com tradução licenciada); vazio = só referência + link */
  texto_biblico?: { v: number; t: string }[];
  /** campos opcionais para dias Selah */
  selah?: { frase_semana?: string; revisao?: string[]; grupo?: string[]; salmo_cantar?: string; link_cantar?: string };
}

export const PLANO: EntradaPlano[] = PLANO_JSON as EntradaPlano[];
const POR_DATA = new Map(PLANO.map(e => [e.data, e]));

export const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export const ESTACOES: { nome: Estacao; emoji: string; pergunta: string; meses: number[] }[] = [
  { nome: 'Plantar', emoji: '🌱', pergunta: 'Onde estou firmado?', meses: [0, 1, 2] },
  { nome: 'Atravessar o vale', emoji: '🌧️', pergunta: 'O que fazer com a dor?', meses: [3, 4, 5] },
  { nome: 'Do vale ao trono', emoji: '👑', pergunta: 'Quem governa a minha história?', meses: [6, 7, 8] },
  { nome: 'Voltar para casa', emoji: '🏠', pergunta: 'Para onde estou indo?', meses: [9, 10, 11] },
];
export const EMOJI_MES = ['🌱', '🐑', '🕊️', '🌧️', '💔', '🪞', '🌑', '👑', '🔗', '📜', '⛰️', '🎺'];

export function estacaoDe(e: EntradaPlano) {
  return ESTACOES.find(s => s.nome === e.estacao)!;
}

/* ─── Datas ───────────────────────────────────────────────────────────────── */
export const ehBissexto = (ano: number) => (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;
export const dataDe = (d: Date) => `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const mesIndice = (data: string) => Number(data.slice(0, 2)) - 1;
export const diaDoMes = (data: string) => Number(data.slice(3));
export const rotuloData = (data: string) => `${diaDoMes(data)} de ${MESES[mesIndice(data)].toLowerCase()}`;

export function entrada(data: string): EntradaPlano | undefined {
  return POR_DATA.get(data);
}

/** Sequência do ano do aparelho: o 29/02 só entra em ano bissexto. */
export function sequenciaDoAno(ano = new Date().getFullYear()): EntradaPlano[] {
  return ehBissexto(ano) ? PLANO : PLANO.filter(e => e.tipo !== 'selah_bonus');
}

export function vizinho(data: string, passo: 1 | -1, ano = new Date().getFullYear()): string | null {
  const seq = sequenciaDoAno(ano);
  const i = seq.findIndex(e => e.data === data);
  if (i < 0) return passo === 1 ? '03-01' : '02-28';   // 29/02 fora de ano bissexto
  return seq[i + passo]?.data ?? null;
}

/** "Sl 2.1-6" → "Salmo 2.1-6" */
export const leituraExtenso = (leitura: string) => leitura.replace(/^Sl\s*/, 'Salmo ');

/** Link para ler na Bíblia Online (ARA) — o texto bíblico não é embutido sem licença. */
export function linkLeitura(leitura: string) {
  const m = leitura.match(/Sl\s*(\d+)(?:\.(\d+))?/);
  if (!m) return 'https://www.bibliaonline.com.br/ara/sl/1';
  return `https://www.bibliaonline.com.br/ara/sl/${m[1]}${m[2] ? `/${m[2]}` : ''}`;
}

/* ─── Conteúdo publicado ──────────────────────────────────────────────────── */
const PUBLICADOS = new Map(CONTEUDO_FALA_ALMA.filter(c => c.status === 'publicado').map(c => [c.data, c]));
export function conteudoPublicado(data: string): ConteudoDia | undefined {
  return PUBLICADOS.get(data);
}
export const datasPublicadas = () => new Set(PUBLICADOS.keys());

/** Próxima leitura e título para o bloco "Amanhã". */
export function amanhaDe(data: string): { data: string; leitura: string; titulo?: string } | null {
  const prox = vizinho(data, 1);
  if (!prox) return null;
  const e = entrada(prox)!;
  const c = conteudoPublicado(data);
  if (c?.amanha && e.leitura === c.amanha.leitura) return { data: prox, leitura: c.amanha.leitura, titulo: c.amanha.titulo };
  const pub = conteudoPublicado(prox);
  const leitura = e.tipo === 'selah' ? `⏸️ Selah · ${e.nome_semana}` : e.tipo === 'colheita' ? `🌾 ${e.nome_semana}` : e.leitura ?? '';
  return { data: prox, leitura, titulo: pub ? `${pub.titulo} ${pub.emoji}` : undefined };
}

/** Datas da mesma semana (devocionais), para o resumo do Selah. */
export function datasDaSemana(e: EntradaPlano): EntradaPlano[] {
  return PLANO.filter(x => x.mes === e.mes && x.semana === e.semana && x.tipo === 'devocional');
}

/* ─── Selah e Colheita ────────────────────────────────────────────────────── */
export function conteudoSelah(e: EntradaPlano) {
  const extra = SELAH_FALA_ALMA[e.data] ?? conteudoPublicado(e.data)?.selah ?? {};
  const semana = datasDaSemana(e);
  const frase = extra.frase_semana
    ?? semana.map(x => conteudoPublicado(x.data)?.frase_do_dia).find(Boolean)
    ?? 'Selah: pare, respire e deixe a Palavra assentar.';
  const primeiroSalmo = semana[0]?.trechos[0]?.[0];
  const salmo = extra.salmo_cantar ?? (e.leitura ?? (primeiroSalmo ? `Sl ${primeiroSalmo}` : 'Sl 23'));
  return {
    frase,
    revisao: extra.revisao ?? [
      `Qual leitura da semana "${e.nome_semana}" mais falou com você — e por quê?`,
      'Que mudança concreta você começou a viver nestes dias? O que ainda precisa começar?',
    ],
    grupo: extra.grupo ?? [
      'Leiam juntos, em voz alta, um trecho da semana. Que palavra ou imagem chamou a atenção de cada um?',
      'Em que situação desta semana vocês precisaram do que estes salmos ensinam?',
      'Como podemos orar uns pelos outros a partir do que lemos?',
    ],
    salmo,
    link: extra.link_cantar ?? `https://www.youtube.com/results?search_query=${encodeURIComponent(`${leituraExtenso(salmo)} cantado louvor`)}`,
    leituras: semana,
  };
}

/** Versículo-âncora de cada mês com colheita (a pessoa copia o texto da sua própria Bíblia). */
export const ANCORA_DO_MES: Record<number, string> = {
  0: 'Sl 1.2', 2: 'Sl 32.1', 3: 'Sl 42.11', 4: 'Sl 62.1', 5: 'Sl 73.26', 6: 'Sl 84.10', 7: 'Sl 90.12', 8: 'Sl 115.1', 10: 'Sl 121.2',
};

export function previaMes(mes: number) {
  const prox = (mes + 1) % 12;
  const doMes = PLANO.filter(e => mesIndice(e.data) === prox && e.semana && e.semana <= 4 && e.tipo === 'devocional');
  const semanas = [1, 2, 3, 4].map(n => doMes.find(e => e.semana === n)?.nome_semana ?? '');
  const ex = PLANO.find(e => mesIndice(e.data) === prox)!;
  return { mes: MESES[prox], tema: ex.tema_mes, emoji: EMOJI_MES[prox], semanas };
}

/** Salmos distintos percorridos num conjunto de datas. */
export function salmosPercorridos(datas: Iterable<string>) {
  const s = new Set<number>();
  for (const d of datas) entrada(d)?.trechos.forEach(t => s.add(t[0]));
  return s.size;
}

export const NOTA_CUIDADO = 'Se você está passando por uma tristeza que não passa, pensamentos de morte ou uma dor que paralisa, procure seu pastor ou conselheiro e também um profissional de saúde.';
