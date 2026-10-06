import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowLeft, BookOpen, Quote, ChevronRight,
  Star, Award, Users, BookMarked,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ACCENT   = '#f97316';
const ACCENT_BG = '#f9731618';
const ACCENT_BORDER = '#f9731635';

const CATEGORIAS = ['História Batista', 'Bibliologia', 'Teologia Sistemática'];

// ── Resumo por partes ────────────────────────────────────────────────────────
const RESUMO_BLOCOS = [
  {
    titulo: 'A tese central',
    texto: 'Desde a origem, os batistas sustentaram a Escritura como inspirada, infalível e autoridade final — e esse foi seu ponto de unidade. Bush e Nettles percorrem quatro séculos em 19 capítulos e 3 partes: consenso, crise e confissão.',
    destaque: true,
  },
  {
    titulo: 'Primeira Parte — "No princípio, Deus…" (Gênesis 1.1)',
    texto: 'A herança batista do séc. XVII a meados do XIX. Apesar da diversidade teológica, há consenso sobre a autoridade e a veracidade da Escritura. Cada capítulo tem como título um texto bíblico em ordem canônica — a analogia das águas da criação (Gn 1) alude ao batismo por imersão.',
    destaque: false,
  },
  {
    titulo: 'Segunda Parte — "Um novo rei… que não conhecera a José" (Êxodo 1.8)',
    texto: 'As mudanças filosóficas do séc. XIX trazem novas controvérsias. Os batistas se dividem entre a fidelidade à Escritura e a acomodação à crítica histórica — da "controvérsia do declínio" de Spurgeon à crise no Southern Seminary com Crawford Toy.',
    destaque: false,
  },
  {
    titulo: 'Terceira Parte — "Quem dizeis que eu sou?" (Marcos 8.29)',
    texto: 'Mais que descrição histórica: os autores tiram conclusões e fazem propostas a partir das confissões e da história recente. A unidade batista depende da fidelidade à Palavra — padrão pelo qual toda opinião religiosa deve ser testada.',
    destaque: false,
  },
  {
    titulo: 'Método: a Bíblia como moldura',
    texto: 'Cada um dos 19 capítulos usa um versículo bíblico como epígrafe e moldura temática — do Gênesis ao Apocalipse. Esse método integra teologia bíblica e história da teologia de forma inseparável.',
    destaque: false,
  },
  {
    titulo: 'A conclusão dos autores',
    texto: 'Deus é a autoridade soberana e a fonte de toda verdade. Os batistas que permaneceram fiéis à Escritura floresceram; os que cederam à crítica liberal perderam o fundamento da mensagem. A história prova a tese: a unidade batista é bíblica ou não é.',
    destaque: true,
  },
];

// ── As 3 partes ──────────────────────────────────────────────────────────────
const PARTES = [
  {
    numero: 'Parte 1',
    titulo: 'A Herança (séc. XVII – meados XIX)',
    versículo: '"No princípio, Deus…" (Gn 1.1)',
    descricao: '8 capítulos. De John Smyth (1609) a William Carey e Adoniram Judson. Consenso sobre a Escritura apesar da diversidade. Confissão de Londres 1689 e sua chegada à América.',
    teologos: 'Smyth, Helwys, Grantham, Gill, Fuller, Carey, Judson, Leland, Dagg',
    cor: '#f97316',
  },
  {
    numero: 'Parte 2',
    titulo: 'A Crise (fim XIX – início XX)',
    versículo: '"Um novo rei… que não conhecera a José" (Êx 1.8)',
    descricao: '8 capítulos. A alta crítica alemã chega às faculdades batistas. Spurgeon vs. Clifford. O caso Toy no Southern. Modernismo vs. Fundamentalismo.',
    teologos: 'Spurgeon, Clifford, Boyce, Manly Jr., Broadus, Toy, Strong, Mullins, Robertson',
    cor: '#ef4444',
  },
  {
    numero: 'Parte 3',
    titulo: 'A Confissão (séc. XX – XXI)',
    versículo: '"Quem dizeis que eu sou?" (Mc 8.29)',
    descricao: '3 capítulos. Análise das confissões batistas americanas. O ressurgimento conservador dos batistas do Sul. Conclusão teológica sobre autoridade e unidade.',
    teologos: 'Carroll, Conner, Elliott e o ressurgimento conservador',
    cor: '#22c55e',
  },
];

// ── 36 teólogos na ordem do livro ────────────────────────────────────────────
const TEOLOGOS: { num: number; cap: string; nome: string; datas: string; papel: string; cor: string }[] = [
  // Cap. 1 — Batistas Gerais, séc. XVII
  { num:  1, cap: 'Cap. 1', nome: 'John Smyth',         datas: 'c.1570–1612',    papel: 'Fundou a 1ª igreja batista inglesa em Amsterdã (1609). Via a Escritura como plenamente confiável nos originais.',          cor: '#f97316' },
  { num:  2, cap: 'Cap. 1', nome: 'Thomas Helwys',      datas: 'c.1575–c.1616',  papel: 'Fundou a 1ª igreja batista em solo inglês (1612). Defensor da liberdade religiosa; morreu na prisão.',                    cor: '#f97316' },
  { num:  3, cap: 'Cap. 1', nome: 'John Murton',        datas: '?–c.1626',       papel: 'Sucessor de Helwys; defendeu a liberdade de consciência diante do Estado.',                                                cor: '#f97316' },
  { num:  4, cap: 'Cap. 1', nome: 'Thomas Grantham',    datas: '1634–1692',      papel: 'Principal teólogo dos batistas gerais. Combateu os quakers em favor da Escritura escrita.',                                cor: '#f97316' },
  // Cap. 4 — Grande nuvem de testemunhas
  { num:  5, cap: 'Cap. 4', nome: 'Roger Williams',     datas: 'c.1603–1683',    papel: 'Fundou Rhode Island e a 1ª igreja batista da América (Providence, 1638–39). Defendeu a separação Igreja–Estado.',          cor: '#fb923c' },
  { num:  6, cap: 'Cap. 4', nome: 'Isaac Backus',       datas: '1724–1806',      papel: 'Pastor na Nova Inglaterra, historiador e defensor da liberdade religiosa.',                                                 cor: '#fb923c' },
  { num:  7, cap: 'Cap. 4', nome: 'John Bunyan',        datas: '1628–1688',      papel: 'Pregador leigo preso por pregar. Sua obra é saturada de Escritura. Autor de O Peregrino (1678).',                          cor: '#fb923c' },
  { num:  8, cap: 'Cap. 4', nome: 'Benjamin Keach',     datas: '1640–1704',      papel: 'Signatário da Confissão de 1689. Introduziu o canto de hinos nas igrejas batistas inglesas.',                              cor: '#fb923c' },
  // Cap. 5 — Séc. XVIII inglês
  { num:  9, cap: 'Cap. 5', nome: 'John Gill',          datas: '1697–1771',      papel: 'O mais prolífico da denominação. Pastor em Londres na igreja que depois seria de Spurgeon.',                               cor: '#fbbf24' },
  { num: 10, cap: 'Cap. 5', nome: 'Andrew Fuller',      datas: '1754–1815',      papel: 'Uniu calvinismo e oferta universal do evangelho. Cofundador da Sociedade Missionária Batista (1792).',                     cor: '#fbbf24' },
  { num: 11, cap: 'Cap. 5', nome: 'Dan Taylor',         datas: '1738–1816',      papel: 'Batista geral. Fundou a New Connexion (1770) contra a deriva unitarista.',                                                 cor: '#fbbf24' },
  // Cap. 6 — Missões
  { num: 12, cap: 'Cap. 6', nome: 'William Carey',      datas: '1761–1834',      papel: '"Pai das missões modernas". Na Índia (Serampore), traduziu a Bíblia para dezenas de línguas.',                             cor: '#fbbf24' },
  { num: 13, cap: 'Cap. 6', nome: 'Adoniram Judson',    datas: '1788–1850',      papel: 'Missionário na Birmânia; tornou-se batista durante a viagem. Traduziu a Bíblia para o birmanês (1834).',                   cor: '#fbbf24' },
  // Cap. 7 — Divisão Norte/Sul
  { num: 14, cap: 'Cap. 7', nome: 'John Leland',        datas: '1754–1841',      papel: 'Pregador na Virgínia. Influenciou a liberdade religiosa na Constituição americana.',                                       cor: '#fbbf24' },
  { num: 15, cap: 'Cap. 7', nome: 'Richard Furman',     datas: '1755–1825',      papel: 'Primeiro presidente da Convenção Trienal (1814). Pastor em Charleston.',                                                   cor: '#fbbf24' },
  { num: 16, cap: 'Cap. 7', nome: 'Francis Wayland',    datas: '1796–1865',      papel: 'Presidente da Brown University. Moralista do Norte e opositor da escravidão.',                                             cor: '#fbbf24' },
  { num: 17, cap: 'Cap. 7', nome: 'John L. Dagg',       datas: '1794–1884',      papel: 'Autor da 1ª teologia sistemática batista americana: Manual of Theology (1857).',                                           cor: '#fbbf24' },
  // Cap. 9 — Fundação do Southern Seminary
  { num: 18, cap: 'Cap. 9', nome: 'J. P. Boyce',        datas: '1827–1888',      papel: 'Fundador e 1º presidente do Southern Seminary (1859). Afirmava a Escritura sem erro.',                                    cor: '#ef4444' },
  { num: 19, cap: 'Cap. 9', nome: 'Basil Manly Jr.',    datas: '1825–1892',      papel: 'Redigiu o Abstract of Principles (1858), confissão fundadora do Southern.',                                                cor: '#ef4444' },
  { num: 20, cap: 'Cap. 9', nome: 'J. R. Graves',       datas: '1820–1893',      papel: 'Líder do landmarkismo. Defendeu a fundação do Southern na convenção de 1849.',                                             cor: '#ef4444' },
  // Cap. 10 — Crise Toy
  { num: 21, cap: 'Cap. 10', nome: 'John A. Broadus',   datas: '1827–1895',      papel: 'Professor do Southern alinhado a Boyce e Manly. Lamentou a perda de Toy como Davi lamentou Absalão.',                     cor: '#ef4444' },
  { num: 22, cap: 'Cap. 10', nome: 'Crawford H. Toy',   datas: '1836–1919',      papel: 'Adotou a alta crítica alemã; desligado do Southern em 1879. Tipo do "declínio" liberal.',                                 cor: '#ef4444' },
  // Cap. 11 — Controvérsia do Declínio (Inglaterra)
  { num: 23, cap: 'Cap. 11', nome: 'C. H. Spurgeon',    datas: '1834–1892',      papel: 'Metropolitan Tabernacle. Denunciou o abandono da Escritura e deixou a Baptist Union em 1887.',                            cor: '#ef4444' },
  { num: 24, cap: 'Cap. 11', nome: 'John Clifford',     datas: '1836–1923',      papel: '1º presidente da Aliança Batista Mundial (1905). Buscou conciliar alta crítica com piedade.',                             cor: '#ef4444' },
  // Cap. 12 — Batistas do Norte (EUA)
  { num: 25, cap: 'Cap. 12', nome: 'A. H. Strong',      datas: '1836–1921',      papel: 'Presidente do Rochester Seminary. Firme nas doutrinas básicas, mas influenciado pelo evolucionismo.',                     cor: '#a78bfa' },
  { num: 26, cap: 'Cap. 12', nome: 'Alvah Hovey',       datas: '1820–1903',      papel: 'Presidente da Newton Institution; talvez o maior teólogo bíblico do Norte em sua época.',                                 cor: '#a78bfa' },
  // Cap. 13 — Southern no início do séc. XX
  { num: 27, cap: 'Cap. 13', nome: 'E. Y. Mullins',     datas: '1860–1928',      papel: 'Presidente do Southern. Afirmou a Escritura, mas enfatizou a experiência e a "alma competente".',                         cor: '#a78bfa' },
  { num: 28, cap: 'Cap. 13', nome: 'A. T. Robertson',   datas: '1863–1934',      papel: 'Grande erudito do grego do NT. Submetia toda sua erudição à autoridade da Escritura.',                                    cor: '#a78bfa' },
  // Cap. 14 — Southwestern Seminary
  { num: 29, cap: 'Cap. 14', nome: 'B. H. Carroll',     datas: '1843–1914',      papel: 'Fundador do Southwestern Seminary (1908). Não separava verdade teológica, científica e histórica.',                       cor: '#22c55e' },
  { num: 30, cap: 'Cap. 14', nome: 'W. T. Conner',      datas: '1877–1952',      papel: 'Principal teólogo do Southwestern. Afirmava a inspiração, mas via "inerrância" como desnecessário.',                      cor: '#22c55e' },
  // Cap. 15 — Modernismo vs. Fundamentalismo
  { num: 31, cap: 'Cap. 15', nome: 'W. Rauschenbusch',  datas: '1861–1918',      papel: 'Principal nome do evangelho social. Teologia centrada na transformação social, não na Escritura.',                        cor: '#60a5fa' },
  { num: 32, cap: 'Cap. 15', nome: 'Shailer Mathews',   datas: '1863–1941',      papel: 'Decano da Divinity School de Chicago e porta-voz do modernismo teológico.',                                               cor: '#60a5fa' },
  { num: 33, cap: 'Cap. 15', nome: 'W. N. Clarke',      datas: '1841–1912',      papel: 'Autor da 1ª sistemática liberal americana. Via a Bíblia como registro de experiência religiosa.',                         cor: '#60a5fa' },
  { num: 34, cap: 'Cap. 15', nome: 'H. E. Fosdick',     datas: '1878–1969',      papel: 'Símbolo da controvérsia modernista. Sermão "Shall the Fundamentalists Win?" (1922).',                                     cor: '#60a5fa' },
  { num: 35, cap: 'Cap. 15', nome: 'J. J. Reeve',       datas: 'séc. XIX–XX',    papel: 'Professor do Southwestern que abandonou a alta crítica. Contraponto conservador no Cap. 15.',                             cor: '#22c55e' },
  // Cap. 16 — Séc. XX
  { num: 36, cap: 'Cap. 16', nome: 'Ralph Elliott',     datas: 'séc. XX',        papel: 'Professor do Midwestern Seminary. Seu livro crítico sobre Gênesis levou à demissão em 1962.',                             cor: '#60a5fa' },
];

// ── Conceitos-chave ──────────────────────────────────────────────────────────
const CONCEITOS = [
  { termo: 'Inerrância', definicao: 'Os batistas históricos afirmavam que os originais da Escritura eram isentos de erro — teológico, histórico e científico. Esse é o ponto de unidade que Bush e Nettles rastreiam ao longo dos quatro séculos.', nivel: 'Central', cor: '#f97316' },
  { termo: 'Alta Crítica', definicao: 'Método alemão do séc. XIX que tratava a Bíblia como qualquer documento humano, questionando autoria, data e historicidade. A Parte 2 mostra como ele penetrou nas instituições batistas.', nivel: 'Ameaça', cor: '#ef4444' },
  { termo: 'Confissão de 1689', definicao: 'A Segunda Confissão de Londres (Batistas Particulares) tornou explícita a Escritura como única fonte autoritativa. Levada à América pela Associação de Filadélfia, moldou os batistas do Sul.', nivel: 'Fundamento', cor: '#fbbf24' },
  { termo: 'Ressurgimento Conservador', definicao: 'Movimento dos batistas do Sul nas décadas de 1970–2000 para restaurar a inerrância bíblica nas suas universidades e seminários. A Parte 3 analisa seu fundamento confessional.', nivel: 'Restauração', cor: '#22c55e' },
  { termo: 'Landmarkismo', definicao: 'Movimento liderado por J. R. Graves que enfatizou a sucessão apostólica batista e a exclusividade das igrejas locais. Influente na formação do Southern Seminary.', nivel: 'Histórico', cor: '#a78bfa' },
  { termo: 'Fé e Mensagem Batista', definicao: 'Confissão da Convenção Batista do Sul, revisada em 1925, 1963 e 2000. O livro analisa cada versão e mostra a trajetória do debate sobre a Escritura.', nivel: 'Confessional', cor: '#60a5fa' },
];

// ── Para quem é ──────────────────────────────────────────────────────────────
const PARA_QUEM = [
  { icon: '⛪', perfil: 'Pastores e líderes batistas', motivo: 'Entender de onde vieram os princípios que sustentam o ministério — e por que abandoná-los tem custo histórico.' },
  { icon: '🎓', perfil: 'Estudantes de história eclesiástica', motivo: 'A obra mais completa sobre a doutrina bíblica dos batistas nos últimos quatro séculos.' },
  { icon: '📖', perfil: 'Defensores da inerrância', motivo: 'Argumentação histórica sólida de que a inerrância não é um "fundamentalismo recente", mas a posição original dos batistas.' },
  { icon: '🏛️', perfil: 'Interessados no ressurgimento conservador', motivo: 'Contexto histórico profundo para entender a batalha pela Bíblia nos batistas do Sul no séc. XX.' },
];

function CapaLivro() {
  const [imgOk, setImgOk] = useState<boolean | null>(null);

  return (
    <div className="relative w-full select-none">
      <div
        className="absolute -inset-8 rounded-[40px] blur-3xl opacity-50"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, #9a3412 0%, #431407 40%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-24px] left-6 right-6 h-12 blur-2xl rounded-full"
        style={{ background: 'rgba(0,0,0,0.75)' }}
      />

      <img
        src="/livros/os-batistas-e-a-biblia.jpg"
        alt="Capa de Os Batistas e a Bíblia — L. Russ Bush & Tom J. Nettles"
        onLoad={() => setImgOk(true)}
        onError={() => setImgOk(false)}
        className="relative w-full rounded-2xl object-cover"
        style={{
          display: imgOk === false ? 'none' : 'block',
          aspectRatio: '2/3',
          boxShadow: '0 40px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(249,115,22,0.4)',
          filter: 'brightness(1.08) contrast(1.05) saturate(1.1)',
        }}
      />

      {imgOk === false && (
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{
            aspectRatio: '2/3',
            background: 'linear-gradient(160deg, #1a0800 0%, #2d0e00 30%, #120600 60%, #050200 100%)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.9)',
            border: '1px solid rgba(249,115,22,0.35)',
          }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-3" style={{ background: 'linear-gradient(180deg,#c2410c,#ea580c,#9a3412)' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <BookMarked className="w-14 h-14 opacity-60" style={{ color: ACCENT }} strokeWidth={1} />
            <p className="text-white font-black text-lg leading-tight">Os Batistas e a Bíblia</p>
            <p className="text-sm font-bold" style={{ color: '#fdba74' }}>Bush & Nettles</p>
            <p className="text-white/25 text-xs">Ortodoxia Batista</p>
          </div>
        </div>
      )}

      {imgOk && (
        <div
          className="absolute top-0 left-0 right-0 h-1/3 rounded-t-2xl pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)' }}
        />
      )}
    </div>
  );
}

export default function LivroBatistasBibliaPage() {
  return (
    <div className="min-h-screen relative bg-bg-deep">
      <Navbar />

      {/* ════ HERO ════ */}
      <section className="pt-24 sm:pt-32 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-10 text-[11px] font-black uppercase tracking-widest"
          >
            <Link to="/biblioteca" className="text-white/40 hover:text-orange-400 transition-colors">Biblioteca</Link>
            <ChevronRight className="w-3 h-3 text-white/20" />
            <Link to="/biblioteca/livros" className="text-white/40 hover:text-orange-400 transition-colors">Livros</Link>
            <ChevronRight className="w-3 h-3 text-white/20" />
            <span className="text-white/60">Os Batistas e a Bíblia</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-16 items-start">

            {/* ── Capa ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-7 items-center lg:items-start"
            >
              <div className="w-full max-w-[260px] lg:max-w-full">
                <CapaLivro />
              </div>

              {/* Estrelas */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-sm font-black text-amber-400/70 ml-2 uppercase tracking-widest">Clássico</span>
              </div>

              {/* Categorias */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIAS.map(c => (
                  <span
                    key={c}
                    className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider"
                    style={{ color: ACCENT, border: `1px solid ${ACCENT_BORDER}`, background: ACCENT_BG }}
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Ficha técnica */}
              <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 space-y-3">
                {[
                  { label: 'Autores',  valor: 'L. Russ Bush & Tom J. Nettles' },
                  { label: 'Editora',  valor: 'Ortodoxia Batista' },
                  { label: 'Capítulos', valor: '19 capítulos · 3 partes' },
                  { label: 'Teólogos', valor: '36 (de 1609 aos anos 1960)' },
                  { label: 'Período',  valor: '4 séculos de história batista' },
                ].map(({ label, valor }) => (
                  <div key={label} className="flex items-baseline justify-between gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/35 shrink-0">{label}</span>
                    <span className="text-[12px] font-bold text-white/80 text-right">{valor}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Texto principal ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex flex-col gap-7"
            >
              <div>
                <p className="text-[11px] font-black tracking-[0.35em] uppercase mb-4" style={{ color: ACCENT }}>
                  Livro Recomendado · História Batista
                </p>
                <h1 className="font-display font-black text-4xl sm:text-5xl xl:text-6xl text-white leading-tight mb-3">
                  Os Batistas<br className="hidden sm:block" /> e a Bíblia
                </h1>
                <p className="text-white/55 text-base sm:text-lg italic leading-relaxed">
                  L. Russ Bush & Tom J. Nettles
                </p>
              </div>

              {/* Introdução */}
              <div className="space-y-4 border-l-2 pl-5" style={{ borderColor: `${ACCENT}50` }}>
                <p className="text-white/85 text-base sm:text-lg leading-relaxed font-medium">
                  Uma obra monumental que percorre quatro séculos de história batista para provar uma tese simples e poderosa:
                </p>
                <p className="text-white font-black text-lg sm:text-xl leading-snug">
                  "A fidelidade à Escritura como inspirada, infalível e autoridade final sempre foi o fundamento da identidade batista."
                </p>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  Em 19 capítulos distribuídos em 3 partes, Bush e Nettles apresentam 36 teólogos batistas — de John Smyth em 1609 a Ralph Elliott nos anos 1960 — mostrando que o consenso histórico sobre a Escritura foi tanto a força da denominação quanto o campo de batalha de sua maior crise.
                </p>
              </div>

              {/* Citação de impacto */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="relative px-7 py-6 rounded-2xl border"
                style={{ borderColor: `${ACCENT}25`, background: `${ACCENT}08` }}
              >
                <Quote className="absolute top-5 left-5 w-6 h-6 opacity-50" style={{ color: ACCENT }} />
                <p className="text-white/90 text-base sm:text-lg italic leading-relaxed pl-5 font-medium">
                  "O que a Escritura diz, Deus diz. Essa foi a convicção que uniu batistas de tradições diferentes ao longo de quatro séculos — e quando ela foi abandonada, as consequências foram devastadoras."
                </p>
                <p className="text-xs font-black uppercase tracking-widest mt-4 pl-5" style={{ color: ACCENT }}>
                  — Bush & Nettles
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════ AS 3 PARTES ════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-1.5 h-8 rounded-full" style={{ background: ACCENT, boxShadow: `0 0 14px ${ACCENT}90` }} />
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-wide">
                As 3 partes do livro
              </h2>
              <p className="text-white/40 text-sm mt-0.5">19 capítulos · da origem à crise e à confissão</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PARTES.map((parte, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-4 p-7 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition-all duration-200"
              >
                <div>
                  <span
                    className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ color: parte.cor, background: parte.cor + '18', border: `1px solid ${parte.cor}35` }}
                  >
                    {parte.numero}
                  </span>
                </div>
                <h3 className="text-white font-black text-base sm:text-lg leading-snug">{parte.titulo}</h3>
                <p className="text-xs italic font-semibold" style={{ color: parte.cor + 'cc' }}>{parte.versículo}</p>
                <p className="text-white/60 text-sm leading-relaxed">{parte.descricao}</p>
                <div className="mt-auto pt-3 border-t border-white/08">
                  <p className="text-white/35 text-[11px] leading-relaxed">{parte.teologos}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ RESUMO DETALHADO ════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-1.5 h-8 rounded-full" style={{ background: '#60a5fa', boxShadow: '0 0 14px #60a5fa90' }} />
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-wide">
                Resumo do Livro
              </h2>
              <p className="text-white/40 text-sm mt-0.5">Síntese e análise do conteúdo</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {RESUMO_BLOCOS.map((bloco, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`p-7 rounded-2xl border transition-all duration-200 ${
                  bloco.destaque
                    ? 'lg:col-span-2'
                    : 'border-white/8 bg-white/[0.03] hover:bg-white/[0.05]'
                }`}
                style={bloco.destaque ? {
                  borderColor: `${ACCENT}35`,
                  background: `${ACCENT}08`,
                } : {}}
              >
                <h3 className={`font-black text-base sm:text-lg mb-3 ${bloco.destaque ? '' : 'text-white/90'}`}
                  style={bloco.destaque ? { color: '#fdba74' } : {}}>
                  {bloco.titulo}
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${bloco.destaque ? 'text-white/80' : 'text-white/60'}`}>
                  {bloco.texto}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divisor */}
      <div className="h-px max-w-6xl mx-auto px-4" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)' }} />

      {/* ════ 36 TEÓLOGOS — SELEÇÃO ════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-1.5 h-8 rounded-full" style={{ background: '#fbbf24', boxShadow: '0 0 14px #fbbf2490' }} />
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-wide">
                Os teólogos do livro
              </h2>
              <p className="text-white/40 text-sm mt-0.5">36 nomes · de John Smyth (1609) a Ralph Elliott (anos 1960)</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEOLOGOS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.03, 0.6) }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-200"
              >
                {/* Número */}
                <div
                  className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black"
                  style={{ background: t.cor + '18', border: `1px solid ${t.cor}40`, color: t.cor }}
                >
                  {String(t.num).padStart(2, '0')}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-white font-black text-sm leading-snug">{t.nome}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-white/35 text-[10px] font-bold">{t.datas}</span>
                    <span
                      className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded"
                      style={{ color: t.cor + 'cc', background: t.cor + '12' }}
                    >
                      {t.cap}
                    </span>
                  </div>
                  <p className="text-white/55 text-xs leading-relaxed">{t.papel}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Nota sobre os 36 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 flex items-center gap-3 px-5 py-4 rounded-xl border border-white/08 bg-white/[0.02]"
          >
            <Users className="w-4 h-4 text-white/25 shrink-0" />
            <p className="text-white/35 text-xs leading-relaxed">
              O livro apresenta 36 teólogos ao total, organizados nos capítulos 1, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14 e 15.
              Os capítulos 2, 3, 8, 16, 17, 18 e 19 analisam confissões, movimentos e períodos, sem focar em indivíduos específicos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════ CONCEITOS-CHAVE ════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-1.5 h-8 rounded-full" style={{ background: '#a78bfa', boxShadow: '0 0 14px #a78bfa90' }} />
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-wide">
                6 conceitos que você vai aprender
              </h2>
              <p className="text-white/40 text-sm mt-0.5">Vocabulário essencial do livro</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONCEITOS.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col gap-4 p-6 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-white font-black text-sm sm:text-base leading-snug">{c.termo}</h3>
                  <span
                    className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0"
                    style={{ color: c.cor, background: c.cor + '18', border: `1px solid ${c.cor}35` }}
                  >
                    {c.nivel}
                  </span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{c.definicao}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ PARA QUEM É ════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-1.5 h-8 rounded-full bg-amber-400" style={{ boxShadow: '0 0 14px #fbbf2490' }} />
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-wide">
                Para quem é este livro?
              </h2>
              <p className="text-white/40 text-sm mt-0.5">Perfis que mais se beneficiam desta leitura</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PARA_QUEM.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-5 p-6 rounded-2xl border border-white/10 bg-white/[0.04]"
              >
                <span className="text-3xl shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <h3 className="text-white font-black text-base sm:text-lg mb-1.5">{item.perfil}</h3>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed">{item.motivo}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ CTA FINAL ════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border px-8 py-14 sm:px-14 sm:py-16 text-center"
            style={{
              borderColor: `${ACCENT}25`,
              background: 'linear-gradient(135deg, #1c0800 0%, #0d0400 50%, #050100 100%)',
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{ background: `radial-gradient(ellipse at 50% -10%, ${ACCENT} 0%, transparent 65%)` }}
            />
            <div className="relative">
              <Award className="w-12 h-12 mx-auto mb-6 opacity-80" style={{ color: ACCENT }} strokeWidth={1} />
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-5 leading-tight">
                Quatro séculos de fidelidade — e as consequências de abandoná-la
              </h2>
              <p className="text-white/55 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                Após ler este livro, você entenderá por que a inerrância bíblica não é um debate recente —
                e por que os batistas que a abandonaram pagaram um preço histórico irreversível.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/biblioteca/livros"
                  className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white/65 font-black text-xs uppercase tracking-widest hover:text-white hover:border-white/35 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Outros livros
                </Link>
                <Link
                  to="/biblioteca"
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-black text-xs uppercase tracking-widest transition-all shadow-xl"
                  style={{ background: ACCENT, boxShadow: `0 8px 32px ${ACCENT}40` }}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Explorar a Biblioteca
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
