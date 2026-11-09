import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { DEVOCIONAL_FAMILIAR, DiaFamiliar } from '../data/devocionalFamiliar';

// ─── Cores ────────────────────────────────────────────────────────────────────
const BG = '#05071a';
const ROSA  = 'rgba(251,113,133,1)';
const ROSA_BG   = 'rgba(251,113,133,0.07)';
const ROSA_BORDA = 'rgba(251,113,133,0.22)';

const ESTACAO_CONFIG = [
  {
    key: 'Primavera da Aliança',
    label: 'Primavera da Aliança',
    icon: '🌱',
    num: 'I',
    cor: 'rgba(134,239,172,1)',
    corRgb: '134,239,172',
    semanas: [1, 13],
    descricao: 'Mateus · Marcos · Lucas · João — Os Evangelhos',
    subtitulo: 'O Noivo se revela',
  },
  {
    key: 'Verão da Aliança',
    label: 'Verão da Aliança',
    icon: '☀️',
    num: 'II',
    cor: 'rgba(251,191,36,1)',
    corRgb: '251,191,36',
    semanas: [14, 26],
    descricao: 'João · Atos · Romanos — O Espírito e a Missão',
    subtitulo: 'A Noiva é formada',
  },
  {
    key: 'Outono da Aliança',
    label: 'Outono da Aliança',
    icon: '🍂',
    num: 'III',
    cor: 'rgba(251,146,60,1)',
    corRgb: '251,146,60',
    semanas: [27, 39],
    descricao: 'Romanos · Coríntios · Gálatas · Efésios · Filipenses · Colossenses · Tessalonicenses · Timóteo',
    subtitulo: 'A vida doméstica da aliança',
  },
  {
    key: 'Inverno da Aliança',
    label: 'Inverno da Aliança',
    icon: '❄️',
    num: 'IV',
    cor: 'rgba(167,139,250,1)',
    corRgb: '167,139,250',
    semanas: [40, 52],
    descricao: 'Timóteo · Tito · Hebreus · Tiago · Pedro · João · Judas · Apocalipse',
    subtitulo: 'Fidelidade até as núpcias',
  },
];

// ─── Semanas ──────────────────────────────────────────────────────────────────
const SEMANAS = [
  { semana: 1,  titulo: 'Semana 1',  livros: 'Mateus 1–5',        tema: 'O Rei prometido chega — fundamentos do Reino' },
  { semana: 2,  titulo: 'Semana 2',  livros: 'Mateus 6–10',       tema: 'O Sermão do Monte e a missão' },
  { semana: 3,  titulo: 'Semana 3',  livros: 'Mateus 11–15',      tema: 'Parábolas do Reino e fé em crise' },
  { semana: 4,  titulo: 'Semana 4',  livros: 'Mateus 16–20',      tema: 'Identidade, transfiguração e serviço' },
  { semana: 5,  titulo: 'Semana 5',  livros: 'Mateus 21–25',      tema: 'Jerusalém: conflito, julgamento e vigilância' },
  { semana: 6,  titulo: 'Semana 6',  livros: 'Mateus 26–28 / Mc 1–2', tema: 'Paixão, ressurreição e novo começo' },
  { semana: 7,  titulo: 'Semana 7',  livros: 'Marcos 3–7',        tema: 'O evangelho de ação — urgência e poder' },
  { semana: 8,  titulo: 'Semana 8',  livros: 'Marcos 8–12',       tema: 'Confissão, serviço e controvérsia' },
  { semana: 9,  titulo: 'Semana 9',  livros: 'Marcos 13–16 / Lc 1', tema: 'Escatologia e o anúncio da salvação' },
  { semana: 10, titulo: 'Semana 10', livros: 'Lucas 2–6',         tema: 'O Salvador nasce e inaugura o Reino' },
  { semana: 11, titulo: 'Semana 11', livros: 'Lucas 7–11',        tema: 'Fé, oração e compaixão' },
  { semana: 12, titulo: 'Semana 12', livros: 'Lucas 12–16',       tema: 'Riqueza, perdão e o coração do pai' },
  { semana: 13, titulo: 'Semana 13', livros: 'Lucas 17–21',       tema: 'Gratidão, humildade e fim dos tempos' },
  { semana: 14, titulo: 'Semana 14', livros: 'Lucas 22–24 / Jo 1–2', tema: 'Paixão, ressurreição e o Verbo encarnado' },
  { semana: 15, titulo: 'Semana 15', livros: 'João 3–7',          tema: 'Novo nascimento, água viva e pão da vida' },
  { semana: 16, titulo: 'Semana 16', livros: 'João 8–12',         tema: 'Luz do mundo, bom pastor e ressurreição' },
  { semana: 17, titulo: 'Semana 17', livros: 'João 13–17',        tema: 'Amor, permanência e oração sacerdotal' },
  { semana: 18, titulo: 'Semana 18', livros: 'João 18–21 / At 1', tema: 'Paixão, ressurreição e ascensão' },
  { semana: 19, titulo: 'Semana 19', livros: 'Atos 2–6',          tema: 'Pentecostes e o crescimento da Igreja' },
  { semana: 20, titulo: 'Semana 20', livros: 'Atos 7–11',         tema: 'Martírio, dispersão e fronteiras rompidas' },
  { semana: 21, titulo: 'Semana 21', livros: 'Atos 12–16',        tema: 'Missão, concílio e a visão da Macedônia' },
  { semana: 22, titulo: 'Semana 22', livros: 'Atos 17–21',        tema: 'Atenas, Corinto e os últimos passos de Paulo' },
  { semana: 23, titulo: 'Semana 23', livros: 'Atos 22–26',        tema: 'Paulo preso, mas a Palavra livre' },
  { semana: 24, titulo: 'Semana 24', livros: 'Atos 27–28 / Rm 1–3', tema: 'Naufrágio, Roma e o evangelho da justiça' },
  { semana: 25, titulo: 'Semana 25', livros: 'Romanos 4–8',       tema: 'Fé de Abraão e vida no Espírito' },
  { semana: 26, titulo: 'Semana 26', livros: 'Romanos 9–13',      tema: 'Soberania, misericórdia e amor prático' },
  { semana: 27, titulo: 'Semana 27', livros: 'Romanos 14–16 / 1Co 1–2', tema: 'Unidade e a sabedoria da cruz' },
  { semana: 28, titulo: 'Semana 28', livros: '1 Coríntios 3–7',   tema: 'Fundação, pureza e o casamento em Cristo' },
  { semana: 29, titulo: 'Semana 29', livros: '1 Coríntios 8–12',  tema: 'Liberdade, ceia e dons do Espírito' },
  { semana: 30, titulo: 'Semana 30', livros: '1Co 13–16 / 2Co 1', tema: 'O amor, a ressurreição e o consolo' },
  { semana: 31, titulo: 'Semana 31', livros: '2 Coríntios 2–6',   tema: 'Vasos de barro e nova criação' },
  { semana: 32, titulo: 'Semana 32', livros: '2 Coríntios 7–11',  tema: 'Generosidade e poder na fraqueza' },
  { semana: 33, titulo: 'Semana 33', livros: '2Co 12–13 / Gl 1–3', tema: 'Fraqueza gloriosa e o único evangelho' },
  { semana: 34, titulo: 'Semana 34', livros: 'Gálatas 4–6 / Ef 1–2', tema: 'Filhos, não escravos — salvos pela graça' },
  { semana: 35, titulo: 'Semana 35', livros: 'Efésios 3–6 / Fl 1', tema: 'O lar aliançado e a armadura de Deus' },
  { semana: 36, titulo: 'Semana 36', livros: 'Fl 2–4 / Cl 1–2',   tema: 'Humildade, paz e a supremacia de Cristo' },
  { semana: 37, titulo: 'Semana 37', livros: 'Cl 3–4 / 1Ts 1–3',  tema: 'Nova vida e a Igreja que ressoa o evangelho' },
  { semana: 38, titulo: 'Semana 38', livros: '1Ts 4–5 / 2Ts 1–3', tema: 'Santidade, vinda do Senhor e trabalho fiel' },
  { semana: 39, titulo: 'Semana 39', livros: '1 Timóteo 1–5',     tema: 'Sã doutrina e cuidado pastoral' },
  { semana: 40, titulo: 'Semana 40', livros: '1Tm 6 / 2Tm 1–4',   tema: 'Contentamento e o bom combate da fé' },
  { semana: 41, titulo: 'Semana 41', livros: 'Tt 1–3 / Fm / Hb 1', tema: 'Graça que ensina e o Filho superior' },
  { semana: 42, titulo: 'Semana 42', livros: 'Hebreus 2–6',       tema: 'O sumo sacerdote compassivo e o repouso' },
  { semana: 43, titulo: 'Semana 43', livros: 'Hebreus 7–11',      tema: 'O pacto eterno e os heróis da fé' },
  { semana: 44, titulo: 'Semana 44', livros: 'Hb 12–13 / Tg 1–3', tema: 'A corrida da fé e a fé que age' },
  { semana: 45, titulo: 'Semana 45', livros: 'Tg 4–5 / 1Pe 1–3',  tema: 'Humildade e a esperança viva' },
  { semana: 46, titulo: 'Semana 46', livros: '1Pe 4–5 / 2Pe 1–3', tema: 'Sofrimento, glória e o dia do Senhor' },
  { semana: 47, titulo: 'Semana 47', livros: '1 João 1–5',        tema: 'Luz, amor e vitória pela fé' },
  { semana: 48, titulo: 'Semana 48', livros: '2Jo / 3Jo / Jd / Ap 1–2', tema: 'Fidelidade e as cartas às igrejas' },
  { semana: 49, titulo: 'Semana 49', livros: 'Apocalipse 3–7',    tema: 'O trono, o Cordeiro e a multidão' },
  { semana: 50, titulo: 'Semana 50', livros: 'Apocalipse 8–12',   tema: 'As trombetas e a guerra cósmica' },
  { semana: 51, titulo: 'Semana 51', livros: 'Apocalipse 13–17',  tema: 'A besta e a queda de Babilônia' },
  { semana: 52, titulo: 'Semana 52', livros: 'Apocalipse 18–22',  tema: 'A vitória final e a cidade eterna' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const MESES_CURTOS = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
const MESES_LONGOS = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];

function diaParaDataCurta(dia: number) {
  const d = new Date(2026, 0, dia);
  return `${d.getDate()} ${MESES_CURTOS[d.getMonth()]}`;
}
function diaParaDataCompleta(dia: number) {
  const d = new Date(2026, 0, dia);
  return `${d.getDate()} de ${MESES_LONGOS[d.getMonth()]} de 2026`;
}
function diaDeHoje(): number {
  const diff = Math.floor((Date.now() - new Date(2026, 0, 1).getTime()) / 86400000) + 1;
  return Math.max(1, Math.min(diff, DEVOCIONAL_FAMILIAR.length));
}
function badgeTipo(tipo: DiaFamiliar['tipo']) {
  if (tipo === 'mesa-alianca') return { label: 'Mesa da Aliança', cor: 'rgba(251,191,36,1)', bg: 'rgba(251,191,36,0.12)' };
  if (tipo === 'aplicacao')    return { label: 'Aplicação',        cor: 'rgba(134,239,172,1)', bg: 'rgba(134,239,172,0.10)' };
  return                              { label: 'Devocional',       cor: ROSA, bg: ROSA_BG };
}
function estacaoDeHoje(dia: number) {
  const semana = Math.ceil(dia / 7);
  if (semana <= 13) return 'Primavera da Aliança';
  if (semana <= 26) return 'Verão da Aliança';
  if (semana <= 39) return 'Outono da Aliança';
  return 'Inverno da Aliança';
}

// ─── Conteúdo expandido de um dia ────────────────────────────────────────────
// ─── Animações por dia (YouTube) ──────────────────────────────────────────────
// Aceita: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID, youtube.com/embed/ID ou só o ID.
// O vídeo aparece como botão "Assistir no YouTube" ao lado do texto bíblico.
// Dia com '' → mostra "Vídeo em breve" nesse lugar; basta colar o link depois.
const VIDEOS_FAMILIAR: Record<number, string> = {
  // Semana 40
  274: '', // 1 Timóteo 6
  275: '', // 2 Timóteo 1
  276: '', // 2 Timóteo 2
  277: '', // 2 Timóteo 3
  278: '', // 2 Timóteo 4
  279: '', // Aplicação da Semana 40
  280: '', // Mesa da Aliança — Semana 40
  // Semana 41
  281: '', // Tito 1
  282: '', // Tito 2
  283: '', // Tito 3
  284: '', // Filemom
  285: '', // Hebreus 1
  286: '', // Aplicação da Semana 41
  287: '', // Mesa da Aliança — Semana 41
  // Semana 42
  288: '', // Hebreus 2
  289: '', // Hebreus 3
  290: '', // Hebreus 4
  291: '', // Hebreus 5
  292: '', // Hebreus 6
  293: '', // Aplicação da Semana 42
  294: '', // Mesa da Aliança — Semana 42
  // Semana 43
  295: '', // Hebreus 7
  296: '', // Hebreus 8
  297: '', // Hebreus 9
  298: '', // Hebreus 10
  299: '', // Hebreus 11
  300: '', // Aplicação da Semana 43 — Hebreus 7–11
  301: '', // Mesa da Aliança — Semana 43
  // Semana 44
  302: 'https://www.youtube.com/watch?v=QWdIpjZaK4I', // Hebreus 12
  303: '', // Hebreus 13
  304: '', // Tiago 1
  305: '', // Tiago 2
  306: '', // Tiago 3
  307: '', // Aplicação da Semana 44
  308: '', // Mesa da Aliança — Semana 44
  // Semana 45
  309: '', // Tiago 4
  310: '', // Tiago 5
  311: '', // 1 Pedro 1
  312: '', // 1 Pedro 2
  313: 'https://www.youtube.com/watch?v=0j1ZobUmcIE', // 1 Pedro 3
  314: '', // Aplicação da Semana 45
  315: '', // Mesa da Aliança — Semana 45
  // Semana 46
  316: '', // 1 Pedro 4
  317: '', // 1 Pedro 5
  318: '', // 2 Pedro 1
  319: '', // 2 Pedro 2
  320: '', // 2 Pedro 3
  321: '', // Aplicação da Semana 46
  322: '', // Mesa da Aliança — Semana 46
  // Semana 47
  323: '', // 1 João 1
  324: '', // 1 João 2
  325: '', // 1 João 3
  326: '', // 1 João 4
  327: '', // 1 João 5
  328: '', // Aplicação da Semana 47
  329: '', // Mesa da Aliança — Semana 47
  // Semana 48
  330: '', // 2 João
  331: '', // 3 João
  332: '', // Judas
  333: '', // Apocalipse 1
  334: '', // Apocalipse 2
  335: '', // Aplicação da Semana 48
  336: '', // Mesa da Aliança — Semana 48
  // Semana 49
  337: '', // Apocalipse 3
  338: '', // Apocalipse 4
  339: '', // Apocalipse 5
  340: '', // Apocalipse 6
  341: '', // Apocalipse 7
  342: '', // Aplicação da Semana 49
  343: '', // Mesa da Aliança — Semana 49
  // Semana 50
  344: '', // Apocalipse 8
  345: '', // Apocalipse 9
  346: '', // Apocalipse 10
  347: '', // Apocalipse 11
  348: '', // Apocalipse 12
  349: '', // Aplicação da Semana 50
  350: '', // Mesa da Aliança — Semana 50
  // Semana 51
  351: '', // Apocalipse 13
  352: '', // Apocalipse 14
  353: '', // Apocalipse 15
  354: '', // Apocalipse 16
  355: '', // Apocalipse 17
  356: '', // Aplicação da Semana 51
  357: '', // Mesa da Aliança — Semana 51
  // Semana 52
  358: '', // Apocalipse 18
  359: '', // Apocalipse 19
  360: '', // Apocalipse 20
  361: '', // Apocalipse 21
  362: '', // Apocalipse 22
  363: '', // Aplicação da Semana 52
  364: '', // Mesa da Aliança — Semana 52
  365: '', // Apocalipse 22
};

function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/);
  if (m) return m[1];
  return /^[\w-]{11}$/.test(url.trim()) ? url.trim() : null;
}

/* ─── texto com destaques ──────────────────────────────────────────────
   Marcadores usados nos textos do devocional:
   **texto**  verdade central      (dourado)
   [[texto]]  citação bíblica      (azul-céu)
   !!texto!!  alerta / pecado      (rosa)
   ++texto++  aplicação prática    (verde)
   \n\n       quebra de parágrafo                                          */

const DESTAQUES = {
  '**': { cor: 'rgba(251,191,36,1)',  bg: 'rgba(251,191,36,0.12)',  label: 'Verdade central' },
  '[[': { cor: 'rgba(125,211,252,1)', bg: 'rgba(125,211,252,0.10)', label: 'Texto bíblico' },
  '!!': { cor: 'rgba(251,113,133,1)', bg: 'rgba(251,113,133,0.10)', label: 'Alerta' },
  '++': { cor: 'rgba(134,239,172,1)', bg: 'rgba(134,239,172,0.10)', label: 'Aplicação prática' },
} as const;

const RE_DESTAQUE = /(\*\*[^*]+\*\*|\[\[[^\]]+\]\]|!![^!]+!!|\+\+[^+]+\+\+)/;

function temDestaques(d: DiaFamiliar) {
  return [d.perguntaGancho, d.reflexaoTexto, d.perguntaGeradora, d.reflexaoHomem, d.reflexaoMulher,
    d.reflexaoFilhos, d.compromissoPratico, d.oracaoAlianca, d.leituraComplementar]
    .some(t => !!t && RE_DESTAQUE.test(t));
}

function TextoRico({ texto }: { texto: string }) {
  const paragrafos = texto.split('\n\n');
  return (
    <>
      {paragrafos.map((par, pi) => (
        <span key={pi} style={paragrafos.length > 1 ? { display: 'block', marginTop: pi ? 14 : 0 } : undefined}>
          {par.split(RE_DESTAQUE).map((parte, i) => {
            const chave = parte.slice(0, 2) as keyof typeof DESTAQUES;
            if (i % 2 === 1 && DESTAQUES[chave]) {
              const est = DESTAQUES[chave];
              return (
                <mark
                  key={i}
                  style={{
                    background: est.bg, color: est.cor, fontWeight: 700,
                    padding: '1px 3px', borderRadius: 4,
                    boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone',
                    fontStyle: chave === '[[' ? 'italic' : 'inherit',
                  }}
                >
                  {parte.slice(2, -2)}
                </mark>
              );
            }
            return <span key={i}>{parte}</span>;
          })}
        </span>
      ))}
    </>
  );
}

function LegendaDestaques() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <span style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(215,215,255,0.88)', marginRight: 4 }}>
        Legenda
      </span>
      {Object.values(DESTAQUES).map(e => (
        <span key={e.label} style={{ fontSize: 14, fontWeight: 700, color: e.cor, background: e.bg, padding: '3px 10px', borderRadius: 99, border: `1px solid ${e.cor.replace('1)', '0.30)')}` }}>
          {e.label}
        </span>
      ))}
    </div>
  );
}

/* "1Pe 3.8-9" → https://www.bibliaonline.com.br/ara/1pe/3/8
   livros de um só capítulo: "Fm 15-19" → .../fm/1/15 */
function refParaUrl(ref: string) {
  const [livro, cv] = ref.split(' ');
  const [cap, vers] = cv.includes('.') ? cv.split('.') : ['1', cv];
  const minusculo = livro.toLowerCase();
  // "Êx" → "ex"; "Jó" é exceção, pois "jo" é João na Bíblia Online
  const slug = minusculo === 'jó' ? 'job' : minusculo.normalize('NFD').replace(/[̀-ͯ]/g, '');
  return `https://www.bibliaonline.com.br/ara/${slug}/${cap}/${vers.split('-')[0]}`;
}

function TextoBiblicoLink({ t }: { t: NonNullable<DiaFamiliar['textoBiblico']> }) {
  return (
    <a
      href={t.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 14, textDecoration: 'none',
        background: 'linear-gradient(135deg, rgba(125,211,252,0.12), rgba(125,211,252,0.04))',
        border: '1px solid rgba(125,211,252,0.35)',
      }}
    >
      <span style={{ fontSize: 22, lineHeight: 1 }}>📜</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 12, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(125,211,252,0.85)', marginBottom: 3 }}>
          Leia primeiro o texto bíblico
        </span>
        <span style={{ display: 'block', fontSize: 18, fontWeight: 800, color: '#fff' }}>
          {t.referencia} <span style={{ fontSize: 14, fontWeight: 700, color: 'rgba(125,211,252,0.9)', marginLeft: 6, padding: '2px 8px', borderRadius: 99, background: 'rgba(125,211,252,0.14)' }}>{t.versao}</span>
        </span>
      </span>
      <span style={{ fontSize: 15, fontWeight: 800, color: 'rgba(125,211,252,1)', whiteSpace: 'nowrap' }}>Abrir ↗</span>
    </a>
  );
}

/* Atalho para o vídeo do dia no YouTube, ao lado do link do texto bíblico.
   Dia com '' em VIDEOS_FAMILIAR mostra "Vídeo em breve"; dia ausente não mostra nada. */
function VideoYoutubeLink({ d }: { d: DiaFamiliar }) {
  const url = VIDEOS_FAMILIAR[d.dia];
  if (url === undefined) return null;
  const id = url ? youtubeId(url) : null;
  const VERMELHO = 'rgba(248,113,113,1)';
  const conteudo = (
    <>
      <span style={{ width: 34, height: 24, borderRadius: 7, background: id ? '#ff0033' : 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ width: 0, height: 0, marginLeft: 2, borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: `10px solid ${id ? '#fff' : 'rgba(255,255,255,0.45)'}` }} />
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 12, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: id ? VERMELHO : 'rgba(215,215,255,0.75)', marginBottom: 3 }}>
          Vídeo do dia
        </span>
        <span style={{ display: 'block', fontSize: 18, fontWeight: 800, color: id ? '#fff' : 'rgba(230,228,255,0.80)' }}>
          {id ? 'Assistir no YouTube' : 'Vídeo em breve'}
        </span>
      </span>
      {id && <span style={{ fontSize: 15, fontWeight: 800, color: VERMELHO, whiteSpace: 'nowrap' }}>Abrir ↗</span>}
    </>
  );
  const estilo = {
    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 14, textDecoration: 'none',
    background: id ? 'linear-gradient(135deg, rgba(248,113,113,0.14), rgba(248,113,113,0.04))' : 'rgba(255,255,255,0.04)',
    border: `1px ${id ? 'solid' : 'dashed'} ${id ? 'rgba(248,113,113,0.40)' : 'rgba(255,255,255,0.18)'}`,
  } as const;
  return id
    ? <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" style={estilo} title={`Assistir a animação de ${d.leitura} no YouTube`}>{conteudo}</a>
    : <div style={estilo} title="O link do vídeo será publicado em breve">{conteudo}</div>;
}

const COR_CONVERSA = 'rgba(251,146,60,1)';

function ConversaATres({ itens, corTexto, fs }: { itens: NonNullable<DiaFamiliar['conversaATres']>; corTexto: string; fs: number }) {
  const [aberto, setAberto] = useState<number | null>(null);
  return (
    <>
      <div style={{ borderRadius: 14, background: 'rgba(251,146,60,0.07)', border: '1px solid rgba(251,146,60,0.28)', padding: '18px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: COR_CONVERSA, marginBottom: 6 }}>
          👨‍👩‍👧 Conversa a Três
        </div>
        <p style={{ margin: '0 0 14px', fontSize: 15, color: 'rgba(230,228,255,0.92)' }}>
          Pai, mãe e filhos — respondam juntos, cada um com suas palavras.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {itens.map((it, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: COR_CONVERSA, background: 'rgba(251,146,60,0.18)' }}>
                {i + 1}
              </span>
              <p style={{ margin: 0, fontSize: fs, color: corTexto, lineHeight: 1.8, textAlign: 'left' }}>
                <TextoRico texto={it.pergunta} />
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderRadius: 14, border: '1px solid rgba(251,146,60,0.22)', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', background: 'rgba(251,146,60,0.06)' }}>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: COR_CONVERSA }}>
            📋 Gabarito da Conversa
          </div>
          <p style={{ margin: '4px 0 0', fontSize: 15, color: 'rgba(230,228,255,0.92)' }}>
            Conversem primeiro — depois abram a resposta bíblica.
          </p>
        </div>
        {itens.map((it, i) => (
          <div key={i} style={{ borderTop: '1px solid rgba(251,146,60,0.15)' }}>
            <button
              onClick={() => setAberto(aberto === i ? null : i)}
              aria-expanded={aberto === i}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', background: aberto === i ? 'rgba(251,146,60,0.10)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
            >
              <span style={{ fontSize: 15, fontWeight: 900, color: COR_CONVERSA }}>Resposta {i + 1}</span>
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: 15, color: COR_CONVERSA, transform: aberto === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▾</span>
            </button>
            {aberto === i && (
              <div style={{ padding: '4px 20px 18px' }}>
                <p style={{ margin: 0, fontSize: fs, color: corTexto, lineHeight: 1.85, textAlign: 'left' }}>
                  <TextoRico texto={it.resposta} />
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                  {it.textos.map(t => (
                    <a key={t} href={refParaUrl(t)} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 14, fontWeight: 700, color: 'rgba(125,211,252,1)', background: 'rgba(125,211,252,0.10)', border: '1px solid rgba(125,211,252,0.30)', padding: '3px 10px', borderRadius: 99, textDecoration: 'none' }}>
                      {t} ↗
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function ConteudoDia({ d, cor }: { d: DiaFamiliar; cor: string }) {
  const borda = cor.replace('1)', '0.22)');
  const fundo = cor.replace('1)', '0.07)');
  const rico = temDestaques(d);
  // texto do devocional em alto contraste e tamanho confortável em todas as semanas
  const corTexto = 'rgba(244,242,255,0.97)';
  const fs15 = 17;
  const fs16 = 18;
  const alinhamento = 'left' as const;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 4 }}>

      {(d.textoBiblico || VIDEOS_FAMILIAR[d.dia] !== undefined) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 12 }}>
          {d.textoBiblico && <TextoBiblicoLink t={d.textoBiblico} />}
          <VideoYoutubeLink d={d} />
        </div>
      )}

      {rico && <LegendaDestaques />}

      {/* Subtema */}
      {d.subtema && (
        <p style={{ margin: 0, fontSize: 16, color: cor.replace('1)', '0.95)'), fontStyle: 'italic', lineHeight: 1.65 }}>
          {d.subtema}
        </p>
      )}

      {/* Pergunta-gancho */}
      {d.perguntaGancho && (
        <div style={{ borderRadius: 14, background: fundo, border: `1px solid ${borda}`, padding: '18px 20px' }}>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: cor, marginBottom: 10 }}>
            Pergunta-gancho
          </div>
          <p style={{ margin: 0, fontSize: fs16, color: corTexto, textAlign: alinhamento, lineHeight: 1.78, fontStyle: 'italic' }}>
            "<TextoRico texto={d.perguntaGancho} />"
          </p>
        </div>
      )}


      {/* Reflexão */}
      {d.reflexaoTexto && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(215,215,255,0.88)', marginBottom: 12 }}>
            Reflexão do Texto
          </div>
          <p style={{ margin: 0, fontSize: fs16, color: corTexto, textAlign: alinhamento, lineHeight: 1.95 }}>
            <TextoRico texto={d.reflexaoTexto} />
          </p>
        </div>
      )}

      {/* Pergunta geradora */}
      {d.perguntaGeradora && (
        <div style={{ borderLeft: `3px solid ${borda}`, paddingLeft: 18 }}>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(215,215,255,0.88)', marginBottom: 10 }}>
            Pergunta Geradora
          </div>
          <p style={{ margin: 0, fontSize: fs16, color: corTexto, textAlign: alinhamento, lineHeight: 1.82, fontStyle: 'italic' }}>
            <TextoRico texto={d.perguntaGeradora} />
          </p>
        </div>
      )}

      {/* Reflexões homem / mulher */}
      {(d.reflexaoHomem || d.reflexaoMulher) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 12 }}>
          {d.reflexaoHomem && (
            <div style={{ borderRadius: 12, background: 'rgba(96,165,250,0.07)', border: '1px solid rgba(96,165,250,0.18)', padding: '16px 18px' }}>
              <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(96,165,250,0.90)', marginBottom: 10 }}>
                Para o Homem
              </div>
              <p style={{ margin: 0, fontSize: fs15, color: corTexto, textAlign: alinhamento, lineHeight: 1.80 }}><TextoRico texto={d.reflexaoHomem} /></p>
            </div>
          )}
          {d.reflexaoMulher && (
            <div style={{ borderRadius: 12, background: ROSA_BG, border: `1px solid ${ROSA_BORDA}`, padding: '16px 18px' }}>
              <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: ROSA, marginBottom: 10 }}>
                Para a Mulher
              </div>
              <p style={{ margin: 0, fontSize: fs15, color: corTexto, textAlign: alinhamento, lineHeight: 1.80 }}><TextoRico texto={d.reflexaoMulher} /></p>
            </div>
          )}
        </div>
      )}

      {/* Filhos */}
      {d.reflexaoFilhos && (
        <div style={{ borderRadius: 12, background: 'rgba(167,139,250,0.07)', border: '1px solid rgba(167,139,250,0.18)', padding: '16px 18px' }}>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.90)', marginBottom: 10 }}>
            Para os Filhos
          </div>
          <p style={{ margin: 0, fontSize: fs15, color: corTexto, textAlign: alinhamento, lineHeight: 1.80 }}><TextoRico texto={d.reflexaoFilhos} /></p>
        </div>
      )}

      {/* Conversa a três + gabarito */}
      {d.conversaATres && <ConversaATres itens={d.conversaATres} corTexto={corTexto} fs={fs15} />}

      {/* Leitura complementar */}
      {d.leituraComplementar && (
        <div style={{ borderRadius: 12, background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.20)', padding: '14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 18 }}>📖</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(251,191,36,0.90)', marginBottom: 4 }}>Leitura Complementar</div>
              <p style={{ margin: 0, fontSize: fs15, color: corTexto, textAlign: alinhamento }}><TextoRico texto={d.leituraComplementar} /></p>
            </div>
          </div>
          {d.leituraAutor && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(251,191,36,0.18)' }}>
              <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(251,191,36,0.75)', marginBottom: 8 }}>
                ✍️ Para aprofundar — autor recomendado
              </div>
              <p style={{ margin: 0, fontSize: fs15, fontWeight: 800, color: '#fff' }}>{d.leituraAutor.autor}</p>
              <p style={{ margin: '2px 0 0', fontSize: 16, fontStyle: 'italic', color: 'rgba(251,191,36,0.95)' }}>
                {d.leituraAutor.obra}
                {d.leituraAutor.abnt && <sup style={{ fontStyle: 'normal', fontWeight: 800, marginLeft: 2 }}>1</sup>}
              </p>
              <p style={{ margin: '2px 0 10px', fontSize: 14, color: 'rgba(230,228,255,0.92)' }}>{d.leituraAutor.referencia}</p>
              <p style={{ margin: 0, fontSize: fs15, color: corTexto, lineHeight: 1.8, textAlign: 'left' }}>
                <TextoRico texto={d.leituraAutor.comentario} />
              </p>
              {d.leituraAutor.abnt && (
                <p style={{ margin: '14px 0 0', paddingTop: 10, borderTop: '1px solid rgba(251,191,36,0.15)', fontSize: 14, lineHeight: 1.6, color: 'rgba(230,228,255,0.85)', textAlign: 'left' }}>
                  <sup style={{ fontWeight: 800, color: 'rgba(251,191,36,0.95)', marginRight: 4 }}>1</sup>
                  {d.leituraAutor.abnt.autores} <strong style={{ color: '#fff' }}>{d.leituraAutor.abnt.titulo}</strong>{d.leituraAutor.abnt.complemento}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Compromisso */}
      {d.compromissoPratico && (
        <div style={{ borderRadius: 14, background: 'rgba(134,239,172,0.06)', border: '1px solid rgba(134,239,172,0.18)', padding: '18px 20px' }}>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(134,239,172,0.88)', marginBottom: 12 }}>
            ✅ Compromisso Prático
          </div>
          <p style={{ margin: 0, fontSize: fs15, color: corTexto, textAlign: alinhamento, lineHeight: 1.85 }}><TextoRico texto={d.compromissoPratico} /></p>
        </div>
      )}

      {/* Oração */}
      {d.oracaoAlianca && (
        <div style={{ borderRadius: 14, background: fundo, border: `1px solid ${borda}`, padding: '20px 20px' }}>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: cor, marginBottom: 14 }}>
            🙏 Oração de Aliança
          </div>
          <p style={{ margin: 0, fontSize: fs15, color: corTexto, textAlign: alinhamento, lineHeight: 2.0, fontStyle: 'italic' }}>
            <TextoRico texto={d.oracaoAlianca} />
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Card Hero do Dia ─────────────────────────────────────────────────────────
function CardHojeDia({ d, onScrollTo }: { d: DiaFamiliar; onScrollTo: () => void }) {
  const [aberto, setAberto] = useState(false);
  const badge = badgeTipo(d.tipo);
  const progresso = Math.round((d.dia / 365) * 100);
  const estConf = ESTACAO_CONFIG.find(e => e.key === d.estacao) ?? ESTACAO_CONFIG[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderRadius: 24,
        border: `1.5px solid rgba(${estConf.corRgb},0.35)`,
        background: `linear-gradient(145deg, rgba(${estConf.corRgb},0.06) 0%, rgba(251,113,133,0.04) 100%)`,
        overflow: 'hidden',
        marginBottom: 36,
      }}
    >
      {/* Linha superior colorida */}
      <div style={{ height: 3, background: `linear-gradient(90deg, rgba(${estConf.corRgb},0.9), rgba(251,113,133,0.7))` }} />

      {/* Topo: info + botão */}
      <div style={{ padding: 'clamp(20px,3vw,28px)', display: 'flex', alignItems: 'flex-start', gap: 18 }}>

        {/* Ícone do dia */}
        <div style={{
          minWidth: 72, height: 72, borderRadius: 18, flexShrink: 0,
          background: `rgba(${estConf.corRgb},0.12)`,
          border: `1.5px solid rgba(${estConf.corRgb},0.30)`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1,
        }}>
          <span style={{ fontSize: 12, fontWeight: 900, color: estConf.cor, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Dia</span>
          <span style={{ fontSize: 26, fontWeight: 900, color: estConf.cor, lineHeight: 1 }}>{d.dia}</span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: badge.cor, padding: '3px 12px', borderRadius: 99, background: badge.bg }}>
              {badge.label}
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: estConf.cor.replace('1)', '0.80)'), padding: '2px 10px', borderRadius: 99, background: `rgba(${estConf.corRgb},0.10)` }}>
              {estConf.icon} {estConf.label}
            </span>
          </div>

          {/* Data */}
          <div style={{ fontSize: 13, color: 'rgba(215,215,255,0.88)', fontWeight: 600, marginBottom: 6 }}>
            {diaParaDataCompleta(d.dia)} · Semana {d.semana}
          </div>

          {/* Tema */}
          <h2 style={{ margin: '0 0 4px', fontSize: 'clamp(19px,3vw,24px)', fontWeight: 900, color: '#fff', lineHeight: 1.25 }}>
            {d.tema}
          </h2>
          <div style={{ fontSize: 15, color: 'rgba(215,215,255,0.88)', fontWeight: 600 }}>
            {d.leitura}
          </div>
        </div>
      </div>

      {/* Barra de progresso */}
      <div style={{ padding: '0 clamp(20px,3vw,28px) 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(215,215,255,0.88)', letterSpacing: '0.1em' }}>
            Progresso anual
          </span>
          <span style={{ fontSize: 13, fontWeight: 900, color: estConf.cor }}>
            {progresso}% · Dia {d.dia} de 365
          </span>
        </div>
        <div style={{ height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progresso}%` }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{ height: '100%', borderRadius: 99, background: `linear-gradient(90deg, rgba(${estConf.corRgb},0.9), rgba(251,113,133,0.8))` }}
          />
        </div>
      </div>

      {/* Botões */}
      <div style={{ padding: '0 clamp(20px,3vw,28px) clamp(20px,3vw,26px)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button
          onClick={() => setAberto(v => !v)}
          style={{
            flex: 1, minWidth: 160,
            padding: '12px 20px', borderRadius: 12, cursor: 'pointer', fontWeight: 800, fontSize: 16,
            border: `1.5px solid rgba(${estConf.corRgb},0.40)`,
            background: aberto ? `rgba(${estConf.corRgb},0.14)` : 'transparent',
            color: estConf.cor,
            transition: 'all 0.2s',
          }}
        >
          {aberto ? '▲ Fechar devocional' : '▼ Abrir devocional de hoje'}
        </button>
        <button
          onClick={onScrollTo}
          style={{
            padding: '12px 20px', borderRadius: 12, cursor: 'pointer', fontWeight: 800, fontSize: 16,
            background: 'none', border: `1px solid rgba(200,200,255,0.15)`,
            color: 'rgba(215,215,255,0.88)',
            transition: 'all 0.2s',
          }}
        >
          Ver no calendário →
        </button>
      </div>

      {/* Conteúdo expandido */}
      <AnimatePresence>
        {aberto && (
          <motion.div
            key="hoje-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: 'clamp(20px,3vw,28px)', paddingTop: 0 }}>
              <div style={{ height: 1, background: `rgba(${estConf.corRgb},0.15)`, marginBottom: 24 }} />
              <ConteudoDia d={d} cor={estConf.cor} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Card mini de um dia (dentro da semana) ───────────────────────────────────
function CardDiaMini({
  d, cor, corRgb, isHoje, expanded, onToggle,
}: {
  d: DiaFamiliar;
  cor: string; corRgb: string;
  isHoje: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  const badge = badgeTipo(d.tipo);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expanded && ref.current) {
      setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
    }
  }, [expanded]);

  return (
    <div
      id={`dia-${d.dia}`}
      ref={ref}
      style={{
        borderRadius: 16,
        border: `1.5px solid ${expanded ? cor : (isHoje ? `rgba(${corRgb},0.40)` : 'rgba(255,255,255,0.07)')}`,
        background: expanded ? `rgba(${corRgb},0.06)` : (isHoje ? `rgba(${corRgb},0.04)` : 'transparent'),
        scrollMarginTop: 80,
        transition: 'border-color 0.2s, background 0.2s',
        overflow: 'hidden',
      }}
    >
      {/* Header clicável */}
      <button
        onClick={onToggle}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: 'clamp(14px,2vw,18px)',
          display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
        }}
      >
        {/* Número */}
        <div style={{
          minWidth: 44, height: 44, borderRadius: 11, flexShrink: 0,
          background: `rgba(${corRgb},0.10)`,
          border: `1.5px solid rgba(${corRgb},${isHoje ? '0.45' : '0.20'})`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 17, fontWeight: 900, color: cor, lineHeight: 1 }}>{d.dia}</span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Badges linha */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 5 }}>
            {isHoje && (
              <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: cor, padding: '2px 8px', borderRadius: 99, background: `rgba(${corRgb},0.14)`, border: `1px solid rgba(${corRgb},0.35)` }}>
                Hoje
              </span>
            )}
            <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: badge.cor, padding: '2px 8px', borderRadius: 99, background: badge.bg }}>
              {badge.label}
            </span>
            <span style={{ fontSize: 12, color: 'rgba(215,215,255,0.88)', fontWeight: 600 }}>
              {diaParaDataCurta(d.dia)}
            </span>
          </div>
          <div style={{ fontSize: 'clamp(16px,2.2vw,18px)', fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: 2 }}>
            {d.tema}
          </div>
          <div style={{ fontSize: 14, color: 'rgba(215,215,255,0.88)', fontWeight: 500 }}>
            {d.leitura}
          </div>
        </div>

        <div style={{
          fontSize: 16, color: expanded ? cor : 'rgba(200,200,255,0.75)',
          flexShrink: 0, transition: 'transform 0.22s, color 0.22s',
          transform: expanded ? 'rotate(180deg)' : 'none',
        }}>
          ▼
        </div>
      </button>

      {/* Conteúdo expandido */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key={`dia-content-${d.dia}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: 'clamp(16px,2.5vw,22px)', paddingTop: 0 }}>
              <div style={{ height: 1, background: `rgba(${corRgb},0.15)`, marginBottom: 20 }} />
              <ConteudoDia d={d} cor={cor} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Bloco de Semana ──────────────────────────────────────────────────────────
function BlocoSemana({
  sw, cor, corRgb, diaHoje, expandedDia, setExpandedDia, defaultAberta,
}: {
  sw: typeof SEMANAS[0];
  cor: string; corRgb: string;
  diaHoje: number;
  expandedDia: number | null;
  setExpandedDia: (d: number | null) => void;
  defaultAberta: boolean;
}) {
  const [aberta, setAberta] = useState(defaultAberta);
  const dias = DEVOCIONAL_FAMILIAR.filter(d => d.semana === sw.semana);
  const temHoje = dias.some(d => d.dia === diaHoje);
  const diaInicio = dias[0]?.dia;
  const diaFim = dias[dias.length - 1]?.dia;

  return (
    <div style={{
      borderRadius: 18,
      border: `1px solid ${temHoje ? `rgba(${corRgb},0.35)` : 'rgba(255,255,255,0.07)'}`,
      background: temHoje ? `rgba(${corRgb},0.03)` : 'transparent',
      overflow: 'hidden',
    }}>
      {/* Cabeçalho da semana */}
      <button
        onClick={() => setAberta(v => !v)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: 'clamp(14px,2vw,20px)',
          display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
        }}
      >
        {/* Número da semana */}
        <div style={{
          minWidth: 40, height: 40, borderRadius: 10, flexShrink: 0,
          background: `rgba(${corRgb},0.12)`,
          border: `1px solid rgba(${corRgb},0.25)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, fontWeight: 900, color: cor,
        }}>
          {sw.semana}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: cor }}>{sw.livros}</span>
            {temHoje && (
              <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase', color: cor, padding: '2px 8px', borderRadius: 99, background: `rgba(${corRgb},0.14)` }}>
                Esta semana
              </span>
            )}
            {diaInicio && diaFim && (
              <span style={{ fontSize: 12, color: 'rgba(215,215,255,0.88)', fontWeight: 600 }}>
                {diaParaDataCurta(diaInicio)} – {diaParaDataCurta(diaFim)}
              </span>
            )}
          </div>
          <div style={{ fontSize: 15, color: 'rgba(215,215,255,0.88)', fontStyle: 'italic', lineHeight: 1.4 }}>
            {sw.tema}
          </div>
        </div>

        <div style={{
          fontSize: 15, color: aberta ? cor : 'rgba(200,200,255,0.75)',
          flexShrink: 0, transition: 'transform 0.22s, color 0.22s',
          transform: aberta ? 'rotate(180deg)' : 'none',
        }}>
          ▼
        </div>
      </button>

      {/* Dias */}
      <AnimatePresence>
        {aberta && (
          <motion.div
            key={`semana-${sw.semana}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: 'clamp(12px,2vw,16px)', paddingTop: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ height: 1, background: `rgba(${corRgb},0.12)`, marginBottom: 4 }} />
              {dias.map(dia => (
                <CardDiaMini
                  key={dia.dia}
                  d={dia}
                  cor={cor}
                  corRgb={corRgb}
                  isHoje={dia.dia === diaHoje}
                  expanded={expandedDia === dia.dia}
                  onToggle={() => setExpandedDia(expandedDia === dia.dia ? null : dia.dia)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Painel de Estação ────────────────────────────────────────────────────────
function PainelEstacao({
  cfg, diaHoje, expandedDia, setExpandedDia,
}: {
  cfg: typeof ESTACAO_CONFIG[0];
  diaHoje: number;
  expandedDia: number | null;
  setExpandedDia: (d: number | null) => void;
}) {
  const semanasEst = SEMANAS.filter(s => s.semana >= cfg.semanas[0] && s.semana <= cfg.semanas[1]);
  const estacaoHoje = estacaoDeHoje(diaHoje);
  const semanaHoje = DEVOCIONAL_FAMILIAR.find(d => d.dia === diaHoje)?.semana ?? 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      {/* Cabeçalho da estação */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <span style={{ fontSize: 24 }}>{cfg.icon}</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: cfg.cor.replace('1)', '0.95)'), marginBottom: 2 }}>
              Estação {cfg.num}
            </div>
            <div style={{ fontSize: 'clamp(16px,2.5vw,20px)', fontWeight: 900, color: '#fff' }}>
              {cfg.label}
            </div>
          </div>
        </div>
        <p style={{ margin: 0, fontSize: 15, color: 'rgba(215,215,255,0.88)', lineHeight: 1.6 }}>
          <em>{cfg.subtitulo}</em> · {cfg.descricao}
        </p>
      </div>

      {/* Semanas */}
      {semanasEst.map(sw => (
        <BlocoSemana
          key={sw.semana}
          sw={sw}
          cor={cfg.cor}
          corRgb={cfg.corRgb}
          diaHoje={diaHoje}
          expandedDia={expandedDia}
          setExpandedDia={setExpandedDia}
          defaultAberta={estacaoHoje === cfg.key && sw.semana === semanaHoje}
        />
      ))}
    </motion.div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function DevocionalFamiliarPage() {
  const diaHoje = diaDeHoje();
  const diaAtual = DEVOCIONAL_FAMILIAR.find(d => d.dia === diaHoje) ?? DEVOCIONAL_FAMILIAR[0];
  const estacaoHojeKey = estacaoDeHoje(diaHoje);
  const estacaoHojeIdx = ESTACAO_CONFIG.findIndex(e => e.key === estacaoHojeKey);
  const [abaAtiva, setAbaAtiva] = useState(estacaoHojeIdx >= 0 ? estacaoHojeIdx : 0);
  const [expandedDia, setExpandedDia] = useState<number | null>(null);

  function scrollToDia(dia: number) {
    setExpandedDia(dia);
    const estCfg = ESTACAO_CONFIG.find(e => {
      const semana = DEVOCIONAL_FAMILIAR.find(d => d.dia === dia)?.semana ?? 1;
      return semana >= e.semanas[0] && semana <= e.semanas[1];
    });
    if (estCfg) setAbaAtiva(ESTACAO_CONFIG.indexOf(estCfg));
    setTimeout(() => {
      const el = document.getElementById(`dia-${dia}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 160);
  }

  const cfgAtiva = ESTACAO_CONFIG[abaAtiva];

  return (
    <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
      <Navbar />

      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(80px,10vw,104px) clamp(16px,4vw,32px) 100px' }}>

        {/* ── Hero compacto ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <div style={{ fontSize: 'clamp(42px,7vw,60px)', marginBottom: 12, lineHeight: 1 }}>💑</div>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.36em', textTransform: 'uppercase', color: ROSA.replace('1)', '0.95)'), marginBottom: 10 }}>
            Devocional Familiar Expositivo
          </div>
          <h1 style={{
            fontSize: 'clamp(22px,4vw,38px)', fontWeight: 900, lineHeight: 1.15, margin: '0 0 14px',
            background: 'linear-gradient(135deg,#fff 0%,rgba(251,113,133,1) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            365 dias pelo Novo Testamento
          </h1>
          <p style={{ fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(215,215,255,0.88)', lineHeight: 1.8, maxWidth: 500, margin: '0 auto 20px' }}>
            Mateus 1 (1 jan) até Apocalipse 22 (31 dez) — expositivo, em ordem, sem pular textos.
            Quatro Estações da Aliança para namorados, noivos e casados.
          </p>
          {/* Pílulas das estações */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {ESTACAO_CONFIG.map(e => (
              <span key={e.key} style={{ fontSize: 13, fontWeight: 700, color: e.cor, padding: '4px 14px', borderRadius: 99, background: `rgba(${e.corRgb},0.10)`, border: `1px solid rgba(${e.corRgb},0.25)` }}>
                {e.icon} {e.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Card do Dia ── */}
        <CardHojeDia d={diaAtual} onScrollTo={() => scrollToDia(diaAtual.dia)} />

        {/* ── Como usar ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ borderRadius: 16, background: ROSA_BG, border: `1px solid ${ROSA_BORDA}`, padding: 'clamp(16px,2.5vw,22px)', marginBottom: 40 }}
        >
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: ROSA, marginBottom: 10 }}>
            📋 Como usar
          </div>
          <p style={{ margin: 0, fontSize: 15, color: 'rgba(230,228,255,0.92)', lineHeight: 1.85 }}>
            Os dias não têm data fixa — comece no Dia 1 quando quiser e siga a sequência. Cada semana tem <strong style={{ color: '#fff' }}>5 dias de leitura expositiva</strong>, 1 <strong style={{ color: 'rgba(134,239,172,0.85)' }}>Dia de Aplicação</strong> (sem capítulo novo, aprofundamento do que foi lido) e 1 <strong style={{ color: 'rgba(251,191,36,0.90)' }}>Mesa da Aliança</strong> (encontro semanal de revisão e oração). Clique em qualquer semana ou dia para expandir o conteúdo completo.
          </p>
        </motion.div>

        {/* ── Abas das Estações ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>

          {/* Tabs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 6,
            marginBottom: 24,
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 16,
            padding: 6,
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
            {ESTACAO_CONFIG.map((e, i) => {
              const ativa = abaAtiva === i;
              return (
                <button
                  key={e.key}
                  onClick={() => setAbaAtiva(i)}
                  style={{
                    background: ativa ? `rgba(${e.corRgb},0.14)` : 'transparent',
                    border: ativa ? `1.5px solid rgba(${e.corRgb},0.40)` : '1.5px solid transparent',
                    borderRadius: 11, cursor: 'pointer', padding: 'clamp(8px,1.5vw,12px) 8px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    transition: 'all 0.22s',
                  }}
                >
                  <span style={{ fontSize: 'clamp(16px,2.5vw,22px)' }}>{e.icon}</span>
                  <span style={{ fontSize: 'clamp(11px,1.4vw,13px)', fontWeight: 900, color: ativa ? e.cor : 'rgba(215,215,255,0.88)', textAlign: 'center', lineHeight: 1.3, letterSpacing: '0.03em' }}>
                    Est. {e.num}
                  </span>
                  <span style={{ fontSize: 'clamp(10px,1.2vw,12px)', color: ativa ? e.cor.replace('1)', '0.92)') : 'rgba(200,200,255,0.75)', textAlign: 'center', lineHeight: 1.3, display: 'block', fontWeight: 600 }}>
                    Sem. {e.semanas[0]}–{e.semanas[1]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Painel ativo */}
          <AnimatePresence mode="wait">
            <PainelEstacao
              key={cfgAtiva.key}
              cfg={cfgAtiva}
              diaHoje={diaHoje}
              expandedDia={expandedDia}
              setExpandedDia={setExpandedDia}
            />
          </AnimatePresence>

        </motion.div>

      </div>

      <Footer />
    </div>
  );
}
