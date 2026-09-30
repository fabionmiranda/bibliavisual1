import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, BookOpen, Quote, ChevronRight,
  Star, Globe, Users, Crown, Library,
  Church, Sword, ScrollText, FlameKindling, Network,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ACCENT = '#fb7185';

// Cada seção tem cor própria
const SECOES = [
  {
    num: '01',
    titulo: 'O Estado da Igreja na Espanha de Isabel',
    subtitulo: 'A Igreja em estado deplorável',
    cor: '#fb7185',
    corBg: '#fb718510',
    icon: Church,
    paragrafo: 'Quando Isabel e Fernando herdaram as coroas de Castela e Aragão, encontraram uma Igreja em ruínas silenciosas. O alto clero havia se transformado numa aristocracia belicosa — bispos comandavam exércitos, intrigavam nas cortes e acumulavam riquezas, mais preocupados com seus interesses políticos do que com o cuidado espiritual de seus rebanhos.',
    detalhe: 'O baixo clero vivia no extremo oposto: na pobreza e na ignorância. Muitos sacerdotes mal sabiam rezar a missa em latim, sem sequer compreender o que pronunciavam. Nos mosteiros, as regras monásticas eram ignoradas por conveniência. Filhos bastardos de bispos circulavam pela nobreza com a naturalidade de quem nunca precisou esconder sua origem.',
    fraseDestaque: '"O arcebispo de Toledo era construtor de rainhas — não de igrejas."',
  },
  {
    num: '02',
    titulo: 'A Estratégia: Quem Nomeia, Reforma',
    subtitulo: 'O patronato como alavanca institucional',
    cor: '#f97316',
    corBg: '#f9731610',
    icon: Crown,
    paragrafo: 'A alavanca central da reforma de Isabel foi uma manobra institucional precisa: obter de Roma o direito de nomeação (patronato) — a prerrogativa real de indicar bispos e arcebispos para os territórios sob sua coroa. Uma vez com esse instrumento nas mãos, a rainha podia garantir que os cargos mais influentes da Igreja fossem ocupados por homens comprometidos com a renovação.',
    detalhe: 'Aqui se revela uma diferença essencial entre Isabel e Fernando. Para o rei aragonês, o controle das nomeações era questão de poder: bispos leais à coroa eram aliados políticos. Para Isabel, era questão de consciência: a Igreja precisava de pastores, não de guerreiros. Fernando nomeou seu filho bastardo de seis anos como arcebispo de Zaragoza.',
    fraseDestaque: '"Para Isabel, nomear era um ato de consciência — não de poder."',
  },
  {
    num: '03',
    titulo: 'Cisneros: O Paradoxo do Poder Austero',
    subtitulo: 'O arcebispo que dormia em cama de madeira',
    cor: '#a855f7',
    corBg: '#a855f710',
    icon: FlameKindling,
    paragrafo: 'O caso que melhor ilustra a visão de Isabel é o de Francisco Ximénez de Cisneros — frade franciscano de vida austera, conhecedor de hebraico e aramaico, o oposto do prelado aristocrático típico. Isabel o havia escolhido como seu confessor pessoal e, quando vagou a sede de Toledo, decidiu que ele era o homem certo para o cargo mais poderoso da Igreja espanhola.',
    detalhe: 'Cisneros recusou. A nomeação contrariava seu voto de pobreza franciscana. Isabel insistiu; ele resistiu. Foi necessária uma bula papal de Alexandre VI ordenando-o a aceitar. Tomou posse do arcebispado mais rico da Espanha, mas continuou dormindo em cama de madeira, usando hábito franciscano e guardando seus votos com a mesma austeridade de antes.',
    fraseDestaque: '"O homem mais poderoso da Igreja espanhola vivendo como o mais simples dos frades."',
  },
  {
    num: '04',
    titulo: 'A Poliglota Complutense',
    subtitulo: 'Humanismo a serviço da fé',
    cor: '#2dd4bf',
    corBg: '#2dd4bf10',
    icon: ScrollText,
    paragrafo: 'Cisneros não foi apenas um reformador disciplinar. Foi também um humanista que compreendia que a renovação da Igreja passava pela renovação da teologia — e que a renovação da teologia passava pelo retorno às fontes originais das Escrituras. Sob sua iniciativa e financiamento, foi produzida a Bíblia Poliglota Complutense.',
    detalhe: 'Uma edição monumental com quatro colunas paralelas — hebraico, aramaico (Targum), grego (Septuaginta) e latim (Vulgata) — lado a lado na mesma página. Antes de Lutero reivindicar a autoridade da Escritura contra as tradições medievais, Cisneros já financiava o estudo filológico do texto bíblico. Era uma Reforma sem Reforma: transformação profunda, sem fratura institucional.',
    fraseDestaque: '"A teologia precisa ser reformada a partir do que as Escrituras realmente dizem."',
  },
  {
    num: '05',
    titulo: 'A Inquisição: Além da Narrativa do Terror',
    subtitulo: 'Três dimensões de um mesmo projeto',
    cor: '#fbbf24',
    corBg: '#fbbf2410',
    icon: Sword,
    paragrafo: 'Nenhuma discussão sobre Isabel e Fernando estaria completa sem abordar a Inquisição Espanhola, estabelecida em 1478. González não a minimiza — mas se recusa à leitura unidimensional que a reduz a instrumento de terror puro. A Inquisição foi, simultaneamente, um projeto religioso, um instrumento político e uma medida repressiva real.',
    detalhe: 'A expulsão dos judeus em 1492 — que forçou cerca de 200.000 pessoas à escolha entre a conversão e o exílio — foi uma tragédia humana de primeira grandeza. González evita o anacronismo de julgar o século XVI com categorias do século XXI. Para Isabel, a Inquisição era compatível com a reforma da Igreja — porque ambas serviam, em sua visão, à mesma causa: uma Espanha cristã, una e renovada.',
    fraseDestaque: '"González recusa o maniqueísmo — e também o anacronismo."',
  },
  {
    num: '06',
    titulo: 'Isabel no Centro do Tabuleiro Europeu',
    subtitulo: 'O nó que conecta todos os reformadores',
    cor: '#34d399',
    corBg: '#34d39910',
    icon: Network,
    paragrafo: 'A última contribuição do capítulo é geopolítica: González traça a genealogia política de Isabel para mostrar que ela é o nó que conecta todos os grandes atores da Reforma Protestante. Sem Isabel, o cenário que tornaria possível — e que limitaria — a Reforma simplesmente não existe da forma como a conhecemos.',
    detalhe: 'Carlos V, o imperador que enfrentou Lutero na Dieta de Worms, era neto de Isabel. Catarina de Aragão, cuja separação de Henrique VIII gerou o cisma anglicano, era filha de Isabel. Felipe II, que enviou o Duque de Alba aos Países Baixos e lançou a Armada Invencível, era bisneto de Isabel. Lutero não era apenas um monge alemão em conflito com Roma — era um monge alemão em conflito com Roma num mundo governado pelos herdeiros de Castela.',
    fraseDestaque: '"Lutero pregava num mundo governado pelos netos de Isabel."',
  },
];

const LINHA_DO_TEMPO = [
  { ano: '1474', evento: 'Isabel I sobe ao trono de Castela', cor: '#fb7185', marco: false },
  { ano: '1478', evento: 'Estabelecimento da Inquisição Espanhola', cor: '#fbbf24', marco: false },
  { ano: '1492', evento: 'Expulsão dos judeus · Descoberta da América', cor: '#f97316', marco: true },
  { ano: '1495', evento: 'Cisneros nomeado Arcebispo de Toledo', cor: '#a855f7', marco: false },
  { ano: '1502', evento: 'Início da Bíblia Poliglota Complutense', cor: '#2dd4bf', marco: false },
  { ano: '1504', evento: 'Morte de Isabel I', cor: '#fb7185', marco: false },
  { ano: '1517', evento: 'Lutero afixa as 95 Teses em Wittenberg', cor: '#fbbf24', marco: true },
  { ano: '1522', evento: 'Publicação completa da Poliglota Complutense', cor: '#34d399', marco: false },
];

const CONCEITOS = [
  {
    termo: 'Patronato Real',
    definicao: 'Direito negociado com Roma para que a coroa indicasse bispos e arcebispos — a alavanca que tornava a reforma institucional possível.',
    nivel: 'Institucional',
    cor: '#fb7185',
  },
  {
    termo: 'Conversos',
    definicao: 'Judeus batizados suspeitos de praticar o judaísmo em segredo (cripto-judaísmo). O motor real da Inquisição espanhola.',
    nivel: 'Histórico',
    cor: '#f97316',
  },
  {
    termo: 'Poliglota Complutense',
    definicao: 'Bíblia com hebraico, aramaico, grego e latim em colunas paralelas — declaração metodológica antes de Lutero.',
    nivel: 'Cultural',
    cor: '#a855f7',
  },
  {
    termo: 'Reforma Sem Ruptura',
    definicao: 'Transformação profunda da estrutura eclesial mantendo a unidade com Roma — o que distingue a Espanha do protestantismo.',
    nivel: 'Conceitual',
    cor: '#2dd4bf',
  },
  {
    termo: 'Genealogia Geopolítica',
    definicao: 'Como Isabel conecta, via descendentes, todos os protagonistas da Reforma: Lutero, Henrique VIII, os Países Baixos.',
    nivel: 'Geopolítico',
    cor: '#34d399',
  },
  {
    termo: 'Hermenêutica do Ponto de Partida',
    definicao: 'A escolha de onde começar a história não é neutra — ela determina o que se enxerga. González começa pela Espanha deliberadamente.',
    nivel: 'Metodológico',
    cor: '#fbbf24',
  },
];

const PERGUNTAS = [
  {
    pergunta: 'O que é uma "Reforma antes da Reforma"?',
    resposta: 'A renovação eclesiástica espanhola sob Isabel e Cisneros foi tão profunda quanto qualquer reforma posterior — mas operou por dentro da estrutura, sem ruptura com Roma.',
    icon: BookOpen,
    cor: '#fb7185',
  },
  {
    pergunta: 'Por que o controle de nomeações é decisivo?',
    resposta: 'Reformas não dependem apenas de boas ideias — dependem de quem ocupa os cargos. Isabel entendeu isso antes de qualquer protestante.',
    icon: Crown,
    cor: '#f97316',
  },
  {
    pergunta: 'Qual é a relação entre humanismo e reforma?',
    resposta: 'A Poliglota Complutense mostra que o método filológico (retorno às fontes) foi veículo de reforma teológica na Espanha antes de ser veículo de ruptura na Alemanha.',
    icon: Globe,
    cor: '#a855f7',
  },
  {
    pergunta: 'Como a Inquisição se encaixa na narrativa da reforma?',
    resposta: 'González recusa o maniqueísmo: a Inquisição foi simultânea à reforma — não a contradizia aos olhos de Isabel. Compreender isso exige colocar-se no século XVI.',
    icon: Users,
    cor: '#2dd4bf',
  },
];

export default function ResenhaGonzalezEraReformadoresPage() {
  return (
    <div className="min-h-screen relative">
      <Navbar />

      <section className="pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-10 text-[10px] font-black uppercase tracking-widest text-white/50"
          >
            <Link to="/biblioteca" className="hover:text-brand-blue transition-colors">Biblioteca</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/biblioteca/resenhas" className="hover:text-brand-blue transition-colors">Resenhas</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/72">González · Cap. I</span>
          </motion.div>

          {/* ── HERO ─────────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl overflow-hidden mb-12"
            style={{ background: 'linear-gradient(135deg, #1a0010 0%, #180010 40%, #0d0818 100%)' }}
          >
            {/* foto de fundo — Isabel, a Católica */}
            <img
              src="https://commons.wikimedia.org/wiki/Special:FilePath/Isabel_la_Cat%C3%B3lica-2.jpg"
              alt="Isabel, a Católica"
              className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
              style={{ opacity: 0.13, filter: 'sepia(40%) contrast(0.9) brightness(0.7)', mixBlendMode: 'luminosity' }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            {/* glows decorativos */}
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20" style={{ background: '#fb7185' }} />
            <div className="absolute -bottom-20 -left-10 w-60 h-60 rounded-full blur-3xl opacity-10" style={{ background: '#a855f7' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 blur-3xl opacity-5" style={{ background: '#fb7185' }} />

            <div className="relative p-8 sm:p-12 border border-white/10 rounded-3xl">
              {/* badges */}
              <div className="flex flex-wrap items-center gap-3 mb-7">
                {/* DIA 01 destacado */}
                <div className="flex items-center gap-2 rounded-xl px-4 py-2"
                  style={{ background: '#fb7185', boxShadow: '0 0 24px #fb718566' }}>
                  <span style={{ fontSize: 18, fontWeight: 900, color: '#000', letterSpacing: '0.08em', lineHeight: 1 }}>DIA 01</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(0,0,0,0.55)', letterSpacing: '0.06em' }}>de 31</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{ color: '#fb7185', background: '#fb718518', border: '1px solid #fb718530' }}>
                  <Library className="w-2.5 h-2.5" />
                  Resenhas da Reforma Protestante
                </span>
                <span className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full text-amber-400/80 bg-amber-400/10 border border-amber-400/20">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  Resenha Didática
                </span>
              </div>

              {/* eyebrow */}
              <p className="text-[10px] font-black tracking-[0.4em] uppercase mb-3" style={{ color: ACCENT }}>
                História da Igreja · Reforma Protestante
              </p>

              {/* título principal */}
              <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-[1.05] mb-3">
                A Era dos<br />
                <span style={{ color: ACCENT }}>Reformadores</span>
              </h1>
              <p className="text-white/70 text-base sm:text-lg italic mb-8 max-w-xl leading-relaxed">
                Cap. I — Isabel, a Católica:<br />
                <span className="text-white/85 not-italic font-bold">A Reforma Antes da Reforma</span>
              </p>

              {/* metadados */}
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Autor', valor: 'Justo L. González' },
                  { label: 'Editora', valor: 'Vida Nova, 1995' },
                  { label: 'Referência', valor: 'Vol. 6 · p. 19–41' },
                ].map(m => (
                  <div key={m.label} className="px-4 py-2 rounded-xl border border-white/10 bg-white/5">
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/50 mb-0.5">{m.label}</p>
                    <p className="text-xs font-bold text-white/85">{m.valor}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── TESE CENTRAL ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="relative rounded-2xl p-7 sm:p-8 mb-14 border border-white/15 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #fb718510 0%, #a855f708 100%)' }}
          >
            <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ background: `linear-gradient(180deg, ${ACCENT}, #a855f7)` }} />
            <Quote className="absolute top-5 right-5 w-10 h-10 opacity-8" style={{ color: ACCENT }} />
            <p className="text-[9px] font-black tracking-[0.35em] uppercase mb-4" style={{ color: ACCENT }}>
              Tese Central do Capítulo
            </p>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed font-medium italic mb-4">
              "A Reforma do século XVI não emergiu do nada. Ela foi gestada num cenário em que a Espanha ocupava o centro do tabuleiro europeu — e para compreender esse cenário, é indispensável conhecer Isabel."
            </p>
            <p className="text-white/70 text-[10px] font-black uppercase tracking-widest">
              — González, Cap. I
            </p>
          </motion.div>

          {/* ── INTRODUÇÃO ───────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs" style={{ background: ACCENT + '20', color: ACCENT }}>
                00
              </div>
              <p className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                Introdução
              </p>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${ACCENT}30, transparent)` }} />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/3 p-6 sm:p-7">
              <h2 className="font-display font-black text-xl text-white mb-4">Por que começar pela Espanha?</h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                A história da Reforma Protestante costuma começar em <strong className="text-white/85">31 de outubro de 1517</strong>, quando Martinho Lutero afixou suas 95 Teses na porta da Igreja do Castelo de Wittenberg. É uma narrativa poderosa — e <em>parcial</em>.
              </p>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mt-4">
                Justo L. González, historiador cubano-americano, opta deliberadamente por um ponto de partida diferente: <strong className="text-white/85">Isabel I de Castela</strong>, rainha que reinou de 1474 até 1504, <em>treze anos antes</em> de Lutero sequer ouvir falar de João Tetzel. A escolha não é apenas cronológica — é <strong className="text-white/85">hermenêutica</strong>.
              </p>
            </div>
          </motion.div>

          {/* ── SEÇÕES ───────────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-8 mb-16">
            {SECOES.map((s, i) => {
              const Icone = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i }}
                >
                  {/* cabeçalho da seção */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
                      style={{ background: s.corBg, color: s.cor, border: `1px solid ${s.cor}25` }}
                    >
                      <Icone className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] font-black uppercase tracking-[0.3em]" style={{ color: s.cor + 'aa' }}>
                        Seção {s.num} · {s.subtitulo}
                      </p>
                      <h2 className="font-display font-black text-lg sm:text-xl text-white leading-tight truncate">
                        {s.titulo}
                      </h2>
                    </div>
                    <div className="hidden sm:flex font-black text-4xl opacity-10 flex-shrink-0" style={{ color: s.cor }}>
                      {s.num}
                    </div>
                  </div>

                  {/* corpo */}
                  <div
                    className="rounded-2xl p-6 sm:p-8 border"
                    style={{ background: s.corBg, borderColor: s.cor + '20' }}
                  >
                    <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-4">
                      {s.paragrafo}
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      {s.detalhe}
                    </p>

                    {/* frase em destaque */}
                    <div
                      className="flex items-start gap-3 rounded-xl p-4 border"
                      style={{ background: s.cor + '0d', borderColor: s.cor + '25' }}
                    >
                      <Quote className="w-4 h-4 mt-0.5 flex-shrink-0 opacity-60" style={{ color: s.cor }} />
                      <p className="text-sm font-semibold italic leading-relaxed" style={{ color: s.cor + 'cc' }}>
                        {s.fraseDestaque}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── LINHA DO TEMPO ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-7">
              <p className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                Linha do Tempo
              </p>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${ACCENT}30, transparent)` }} />
            </div>

            <div className="relative">
              {/* linha vertical */}
              <div className="absolute left-[44px] top-0 bottom-0 w-px bg-white/8" />

              <div className="flex flex-col gap-4">
                {LINHA_DO_TEMPO.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    {/* ano */}
                    <div
                      className="w-[88px] text-right flex-shrink-0 pt-0.5"
                    >
                      <span
                        className="text-[11px] font-black tabular-nums"
                        style={{ color: item.cor }}
                      >
                        {item.ano}
                      </span>
                    </div>

                    {/* marcador */}
                    <div className="relative flex-shrink-0 mt-1.5">
                      <div
                        className="w-3.5 h-3.5 rounded-full border-2 border-slate-900 relative z-10"
                        style={{ background: item.marco ? item.cor : item.cor + '60' }}
                      />
                      {item.marco && (
                        <div
                          className="absolute inset-0 rounded-full blur-sm opacity-60"
                          style={{ background: item.cor }}
                        />
                      )}
                    </div>

                    {/* evento */}
                    <div
                      className={`flex-1 rounded-xl px-4 py-2.5 border ${item.marco ? 'border-white/20' : 'border-white/6'}`}
                      style={{
                        background: item.marco ? item.cor + '10' : 'transparent',
                      }}
                    >
                      <p className={`text-sm leading-snug ${item.marco ? 'text-white/90 font-semibold' : 'text-white/65'}`}>
                        {item.evento}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── CONCEITOS-CHAVE ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-7">
              <p className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                Conceitos-Chave
              </p>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${ACCENT}30, transparent)` }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CONCEITOS.map((c, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 border flex flex-col gap-2"
                  style={{ background: c.cor + '0a', borderColor: c.cor + '25' }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-display font-black text-sm text-white leading-tight">{c.termo}</p>
                    <span
                      className="text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ color: c.cor, background: c.cor + '18', border: `1px solid ${c.cor}30` }}
                    >
                      {c.nivel}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed">{c.definicao}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── QUESTÕES INTERPRETATIVAS ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-7">
              <p className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                Questões Interpretativas
              </p>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${ACCENT}30, transparent)` }} />
            </div>

            <div className="flex flex-col gap-4">
              {PERGUNTAS.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/8 bg-white/2 p-5 flex gap-4 items-start"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: item.cor + '18', border: `1px solid ${item.cor}25` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.cor }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-bold mb-2 leading-snug">{item.pergunta}</p>
                    <p className="text-white/70 text-sm leading-relaxed">{item.resposta}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── CONCLUSÃO ────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative rounded-3xl overflow-hidden mb-12"
            style={{ background: 'linear-gradient(135deg, #1a0010 0%, #0d1820 100%)' }}
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-15" style={{ background: ACCENT }} />
            <div className="absolute -bottom-16 -left-8 w-40 h-40 rounded-full blur-3xl opacity-10" style={{ background: '#34d399' }} />

            <div className="relative border border-white/10 rounded-3xl p-8 sm:p-10">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase mb-4" style={{ color: ACCENT }}>
                Conclusão do Capítulo
              </p>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-6 leading-tight">
                A Reforma<br />
                <span style={{ color: ACCENT }}>Antes da Reforma</span>
              </h3>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-5">
                Ao começar a história da Reforma pela Espanha — e não pela Alemanha —, González recupera uma continuidade que a narrativa padrão apaga: os impulsos reformadores do século XVI têm raízes que <strong className="text-white/85">antecedem Lutero</strong>. A reforma de Isabel e Cisneros foi profunda, mas não produziu ruptura.
              </p>
              <p className="text-white/72 text-sm sm:text-base leading-relaxed mb-8">
                Quando Lutero surgiu, a Espanha já havia percorrido décadas de renovação eclesiástica interna — e foi exatamente isso que permitiu que a Reforma Católica respondesse ao protestantismo com tanta eficácia: ela já tinha <strong className="text-white/75">musculatura institucional</strong> para isso.
              </p>

              {/* lição final */}
              <div
                className="rounded-2xl p-5 border"
                style={{ background: ACCENT + '0d', borderColor: ACCENT + '25' }}
              >
                <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: ACCENT + '99' }}>
                  A lição que permanece
                </p>
                <p className="text-sm font-semibold text-white/80 leading-relaxed">
                  Reformas duradouras dependem de controle de nomeações, de retorno às fontes e de liderança que encarna aquilo que prega.{' '}
                  <span style={{ color: ACCENT }}>Cisneros dormia em cama de madeira como arcebispo. Esse detalhe não é marginal — é o coração do capítulo.</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── REFERÊNCIA ───────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="rounded-2xl border border-white/8 bg-white/2 p-5 mb-12"
          >
            <p className="text-[9px] font-black tracking-[0.3em] uppercase text-white/25 mb-2">
              Referência Bibliográfica
            </p>
            <p className="text-white/60 text-xs leading-relaxed">
              GONZÁLEZ, Justo L. <span className="italic">A Era dos Reformadores</span>. In:{' '}
              <span className="italic">E até aos confins da Terra: uma história ilustrada do Cristianismo</span>.
              Vol. 6. São Paulo: Vida Nova, 1995. Cap. I, p. 19–41.
            </p>
          </motion.div>

          {/* Voltar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/biblioteca/resenhas"
              className="inline-flex items-center gap-2 text-white/72 hover:text-white text-xs font-black uppercase tracking-widest transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar para Resenhas
            </Link>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
