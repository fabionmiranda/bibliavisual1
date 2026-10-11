import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Flame } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type Era = 'pre-reforma' | 'reforma-magisterial' | 'reforma-radical' | 'pos-reforma';

interface Reformador {
  nome: string;
  datas: string;
  era: Era;
  eraLabel: string;
  resumo: string;
  obraChave: string;
  contribuicao: string;
  foto: string | null;
}

const ERA_COLORS: Record<Era, { accent: string; bg: string; border: string; label: string }> = {
  'pre-reforma':          { accent: '#a78bfa', bg: '#a78bfa12', border: '#a78bfa30', label: 'Pré-Reforma' },
  'reforma-magisterial':  { accent: '#60a5fa', bg: '#60a5fa12', border: '#60a5fa30', label: 'Reforma Magisterial' },
  'reforma-radical':      { accent: '#34d399', bg: '#34d39912', border: '#34d39930', label: 'Reforma Radical' },
  'pos-reforma':          { accent: '#fbbf24', bg: '#fbbf2412', border: '#fbbf2430', label: 'Pós-Reforma & Puritanismo' },
};

const REFORMADORES: Reformador[] = [
  {
    nome: 'Francisco Ximénez de Cisneros',
    datas: '1436–1517',
    era: 'pre-reforma',
    eraLabel: 'Pré-Reforma',
    resumo: 'Cardeal espanhol e confessor da rainha Isabel, Cisneros foi o grande reformador eclesiástico antes da Reforma protestante. Fundou a Universidade de Alcalá (1508) e patrocinou a monumental Bíblia Poliglota Complutense — primeiro texto crítico paralelo do Antigo e Novo Testamento em hebraico, aramaico, grego e latim.',
    obraChave: 'Bíblia Poliglota Complutense (1514–1517)',
    contribuicao: 'Reforma clerical pré-tridentina; exegese bíblica humanista; educação teológica espanhola',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Cardenal_Cisneros.jpg/400px-Cardenal_Cisneros.jpg',
  },
  {
    nome: 'Isabel de Castela',
    datas: '1451–1504',
    era: 'pre-reforma',
    eraLabel: 'Pré-Reforma',
    resumo: 'Rainha de Castela e Aragão, Isabel patrocinou a reforma moral do clero espanhol décadas antes de Lutero. Apoiou Cisneros como inquisidor-geral reformador e financiou a evangelização das Américas. González a apresenta como figura central que preparou o terreno devocional para o protestantismo ibérico.',
    obraChave: 'Testamento real (1504) — defesa da fé e reforma clerical',
    contribuicao: 'Reforma clerical; missões; patronato real da Igreja',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Isabella_I_of_Castile.jpg/400px-Isabella_I_of_Castile.jpg',
  },
  {
    nome: 'Martinho Lutero',
    datas: '1483–1546',
    era: 'reforma-magisterial',
    eraLabel: 'Reforma Magisterial',
    resumo: 'Monge agostiniano e professor de Wittenberg, Lutero deflagrou a Reforma com as 95 Teses (1517) e desenvolveu a doutrina da justificação pela fé somente. Traduziu a Bíblia para o alemão vernáculo (1522/1534), padronizando a língua e tornando as Escrituras acessíveis ao povo. Sua teologia da cruz e dos dois reinos moldou o luteranismo e todo o protestantismo subsequente.',
    obraChave: 'Catecismo Maior (1529); Sobre a Liberdade Cristã (1520)',
    contribuicao: 'Sola fide; Sola Scriptura; tradução bíblica alemã; teologia da cruz',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Lucas_Cranach_the_Elder-Martin_Luther_%281528%29.jpg/400px-Lucas_Cranach_the_Elder-Martin_Luther_%281528%29.jpg',
  },
  {
    nome: 'Ulrico Zuínglio',
    datas: '1484–1531',
    era: 'reforma-magisterial',
    eraLabel: 'Reforma Magisterial',
    resumo: 'Pastor em Zurique, Zuínglio iniciou uma Reforma independente da de Lutero, com ênfase ainda maior na soberania das Escrituras sobre toda tradição. Aboliu imagens, a missa e o órgão, propondo uma adoração regida exclusivamente pela Bíblia. Discordou de Lutero sobre a Ceia em Marburgo (1529) e morreu em batalha defendendo a cidade reformada.',
    obraChave: 'Os 67 Artigos (1523); Sobre a Providência Divina (1530)',
    contribuicao: 'Princípio regulativo do culto; Reforma cívica suíça; Sola Scriptura radical',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Ulrich_Zwingli_by_Hans_Asper%2C_1531.jpg/400px-Ulrich_Zwingli_by_Hans_Asper%2C_1531.jpg',
  },
  {
    nome: 'Menno Simmons',
    datas: '1496–1561',
    era: 'reforma-radical',
    eraLabel: 'Reforma Radical',
    resumo: 'Ex-padre neerlandês convertido ao anabatismo após a debacle de Münster, Menno reconstruiu o movimento sobre bases pacifistas e eclesiológicas sólidas. Itinerou pela Europa do norte como pastor de comunidades dispersas e perseguidas. Seus seguidores tornaram-se os menonitas — tradição viva até hoje na América do Norte e do Sul.',
    obraChave: 'O Fundamento da Doutrina Cristã (1539)',
    contribuicao: 'Pacifismo cristão; ecclesiologia de crentes; sobrevivência do anabatismo',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Menno_Simons.jpg/400px-Menno_Simons.jpg',
  },
  {
    nome: 'Conrado Grebel',
    datas: 'c.1498–1526',
    era: 'reforma-radical',
    eraLabel: 'Reforma Radical',
    resumo: 'Líder do círculo bíblico de Zurique que, em 21 de janeiro de 1525, realizou o primeiro batismo de crentes adultos da história moderna, dando início ao movimento anabatista. Estudante humanista que radicalizou as premissas de Zuínglio ao insistir que somente crentes professantes podem ser batizados. Morreu de peste aos 28 anos.',
    obraChave: 'Cartas a Thomas Müntzer (1524)',
    contribuicao: 'Batismo de crentes; separação Igreja-Estado; início do anabatismo',
    foto: null,
  },
  {
    nome: 'Felix Manz',
    datas: 'c.1498–1527',
    era: 'reforma-radical',
    eraLabel: 'Reforma Radical',
    resumo: 'Presente no batismo de 1525, Manz foi o primeiro mártir protestante executado por outros protestantes. O Conselho de Zurique — influenciado por Zuínglio — o afogou no rio Limmat por praticar o batismo de adultos. Sua morte symboliza a ironia trágica de uma Reforma que perseguiu quem levou seus próprios princípios mais longe.',
    obraChave: 'Petição de Defesa (1524)',
    contribuicao: 'Martírio; batismo de crentes; testemunho da separação Igreja-Estado',
    foto: null,
  },
  {
    nome: 'João Calvino',
    datas: '1509–1564',
    era: 'reforma-magisterial',
    eraLabel: 'Reforma Magisterial',
    resumo: 'O sistematizador da Reforma, Calvino organizou a teologia reformada em sua Instituição da Religião Cristã (1536/1559) — obra que ainda hoje é referência central. Em Genebra, construiu um modelo de cidade reformada com disciplina eclesiástica, escola bíblica e pregação expositiva. Sua ênfase na soberania de Deus, predestinação e pacto moldou o presbiterianismo e o puritanismo.',
    obraChave: 'Instituição da Religião Cristã (1536/1559); Comentários Bíblicos',
    contribuicao: 'Teologia sistemática reformada; disciplina eclesiástica; pregação expositiva',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/John_Calvin_by_Holbein.jpg/400px-John_Calvin_by_Holbein.jpg',
  },
  {
    nome: 'João Knox',
    datas: '1514–1572',
    era: 'reforma-magisterial',
    eraLabel: 'Reforma Magisterial',
    resumo: 'Reformador escocês treinado em Genebra sob Calvino, Knox introduziu o presbiterianismo na Escócia contra a resistência da rainha Maria Stuart. Fundou a Igreja Presbiteriana Escocesa e redigiu a Confissão Escocesa (1560). Sua teologia do pacto e da resistência à tirania influenciou profundamente o pensamento político reformado.',
    obraChave: 'Confissão Escocesa (1560); História da Reforma na Escócia',
    contribuicao: 'Presbiterianismo escocês; teologia do pacto; resistência cristã à tirania',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/John_Knox_by_Hondius.jpg/400px-John_Knox_by_Hondius.jpg',
  },
  {
    nome: 'John Smyth',
    datas: 'c.1570–1612',
    era: 'reforma-radical',
    eraLabel: 'Reforma Radical',
    resumo: 'Pastor anglicano separatista que, em exílio na Holanda, fundou a primeira congregação batista (1609) ao batizar a si mesmo e depois aos membros da comunidade. Influenciado pelo anabatismo menonita, Smyth defendeu a liberdade de consciência e o batismo de crentes. Morreu em negociações para se unir aos menonitas, e sua congregação retornou à Inglaterra sob Thomas Helwys.',
    obraChave: 'The Character of the Beast (1609)',
    contribuicao: 'Fundação do movimento batista; batismo de crentes; liberdade de consciência',
    foto: null,
  },
  {
    nome: 'Thomas Helwys',
    datas: 'c.1575–c.1616',
    era: 'reforma-radical',
    eraLabel: 'Reforma Radical',
    resumo: 'Sócio de Smyth que trouxe a primeira congregação batista de volta à Inglaterra (1612), fundando em Spitalfields, Londres, a primeira Igreja Batista em solo inglês. Escreveu o primeiro livro em inglês a defender a liberdade religiosa plena para todos — incluindo papistas e muçulmanos. Morreu na prisão por essa posição.',
    obraChave: 'A Short Declaration of the Mystery of Iniquity (1612)',
    contribuicao: 'Primeira Igreja Batista inglesa; liberdade religiosa universal; separação Igreja-Estado',
    foto: null,
  },
  {
    nome: 'William Perkins',
    datas: '1558–1602',
    era: 'pos-reforma',
    eraLabel: 'Puritanismo',
    resumo: 'Teólogo de Cambridge e pai do puritanismo inglês, Perkins desenvolveu uma teologia pastoral sistemática que uniu a doutrina reformada da predestinação com uma prática devocional rigorosa. Suas obras sobre a consciência, a pregação e a casuística moral formaram gerações de puritanos e influenciaram diretamente John Smyth.',
    obraChave: 'A Golden Chain (1591); The Art of Prophesying (1592)',
    contribuicao: 'Puritanismo inglês; teologia pastoral prática; pregação reformada',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/William_Perkins_theologian.jpg/400px-William_Perkins_theologian.jpg',
  },
  {
    nome: 'William Ames',
    datas: '1576–1633',
    era: 'pos-reforma',
    eraLabel: 'Puritanismo',
    resumo: 'Discípulo de Perkins, Ames foi o principal sistematizador da teologia puritana federal (do pacto). Exilado na Holanda, influenciou tanto o puritanismo inglês quanto os separatistas que virariam os peregrinos do Mayflower. Sua Medulla Theologiae foi o manual teológico padrão de Harvard nos primeiros anos da colônia.',
    obraChave: 'Medulla Theologiae (1627); De Conscientia (1630)',
    contribuicao: 'Teologia federal; puritanismo holandês e americano; ética da consciência',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/WilliamAmes.jpg/400px-WilliamAmes.jpg',
  },
  {
    nome: 'Roger Williams',
    datas: 'c.1603–1683',
    era: 'pos-reforma',
    eraLabel: 'Puritanismo/Batista',
    resumo: 'Puritano que radicalizou a separação Igreja-Estado até ser expulso de Massachusetts, Williams fundou Providence (Rhode Island) como o primeiro experimento de liberdade religiosa plena no Novo Mundo. Tornou-se brevemente batista em 1639 antes de abandonar qualquer denominação por crer que a Igreja verdadeira ainda não havia sido restaurada.',
    obraChave: 'The Bloudy Tenent of Persecution (1644)',
    contribuicao: 'Liberdade religiosa; separação Igreja-Estado; fundação de Rhode Island',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Roger_Williams_%281603-1683%29.jpg/400px-Roger_Williams_%281603-1683%29.jpg',
  },
  {
    nome: 'Samuel Rutherford',
    datas: '1600–1661',
    era: 'pos-reforma',
    eraLabel: 'Westminster',
    resumo: 'Delegado escocês à Assembleia de Westminster e um dos principais arquitetos da teologia do pacto presbiteriana. Suas Cartas — devocionais cheios de afeto cristocêntrico — tornaram-se clássicos da espiritualidade reformada. Sua obra política Lex Rex (1644) foi condenada e queimada na Restauração.',
    obraChave: 'Lex Rex (1644); Cartas de Samuel Rutherford',
    contribuicao: 'Teologia do pacto; espiritualidade reformada; teoria da resistência ao tirano',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Samuel_Rutherford.jpg/400px-Samuel_Rutherford.jpg',
  },
  {
    nome: 'George Gillespie',
    datas: '1613–1648',
    era: 'pos-reforma',
    eraLabel: 'Westminster',
    resumo: 'O mais jovem e brilhante delegado da Assembleia de Westminster, Gillespie foi o principal defensor escocês do presbiterianismo contra o erastianismo (controle estatal da Igreja). Morreu aos 35 anos, mas deixou obra decisiva sobre o governo eclesiástico e o princípio regulativo do culto.',
    obraChave: 'Aaron\'s Rod Blossoming (1646)',
    contribuicao: 'Governo presbiteriano; princípio regulativo do culto; Confissão de Westminster',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/George_Gillespie.jpg/400px-George_Gillespie.jpg',
  },
  {
    nome: 'John Owen',
    datas: '1616–1683',
    era: 'pos-reforma',
    eraLabel: 'Puritanismo',
    resumo: 'O maior teólogo puritano inglês — vice-chanceler de Oxford e capelão de Cromwell — Owen produziu obras monumentais sobre o Espírito Santo, a morte de Cristo e a mortificação do pecado. Tornou-se congregacionalista-batista e defendeu a inerrância das Escrituras num período de ataques racionalistas.',
    obraChave: 'The Death of Death in the Death of Christ (1647); Communing with God (1657)',
    contribuicao: 'Expiação definida; doutrina do Espírito Santo; mortificação do pecado',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/John_Owen_by_John_Greenhill.jpg/400px-John_Owen_by_John_Greenhill.jpg',
  },
  {
    nome: 'John Bunyan',
    datas: '1628–1688',
    era: 'pos-reforma',
    eraLabel: 'Puritanismo/Batista',
    resumo: 'Pregador batista de Bedford que passou doze anos na prisão por pregar sem licença. Na prisão escreveu O Peregrino (1678) — a alegoria cristã mais lida da história depois da Bíblia — e sua autobiografia espiritual Graça Abundante. Sua teologia é calvinsita-batista, com ênfase na conversão, na luta interior e na graça soberana.',
    obraChave: 'O Peregrino (1678); Graça Abundante para o Maior dos Pecadores (1666)',
    contribuicao: 'Literatura cristã popular; teologia da graça; batismo de crentes',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/John_Bunyan_by_Thomas_Sadler_1684.jpg/400px-John_Bunyan_by_Thomas_Sadler_1684.jpg',
  },
  {
    nome: 'Francis Turretin',
    datas: '1623–1687',
    era: 'pos-reforma',
    eraLabel: 'Ortodoxia Reformada',
    resumo: 'Pastor e professor em Genebra, Turretin foi o maior sistematizador da escolástica reformada pós-Calvino. Sua Institutio Theologiae Elencticae respondeu ponto a ponto às objeções católicas, socinianas e arminianas. Foi o manual teológico do Princeton Theological Seminary no século XIX, influenciando Charles Hodge e B.B. Warfield.',
    obraChave: 'Institutio Theologiae Elencticae (3 vols., 1679–1685)',
    contribuicao: 'Escolástica reformada; apologética confessional; inerrância bíblica',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Francis_Turretin.jpg/400px-Francis_Turretin.jpg',
  },
  {
    nome: 'Thomas Grantham',
    datas: '1634–1692',
    era: 'pos-reforma',
    eraLabel: 'Batista Geral',
    resumo: 'Principal teólogo dos Batistas Gerais ingleses (arminiano-batistas), Grantham sistematizou a teologia batista que enfatizava a expiação universal, o batismo de crentes por imersão e a liberdade da consciência. Seu Christianismus Primitivus é o primeiro sistema teológico batista completo escrito em inglês.',
    obraChave: 'Christianismus Primitivus (1678)',
    contribuicao: 'Teologia batista geral; expiação universal; liberdade de consciência',
    foto: null,
  },
];

const ERAS_ORDEM: Era[] = ['pre-reforma', 'reforma-magisterial', 'reforma-radical', 'pos-reforma'];

export default function BibliotecaAutoresReformadoresPage() {
  return (
    <div className="min-h-screen relative">
      <Navbar />

      <section className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-10 text-[10px] font-black uppercase tracking-widest text-white/30"
          >
            <Link to="/biblioteca" className="hover:text-brand-blue transition-colors">Biblioteca</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/biblioteca/autores" className="hover:text-brand-blue transition-colors">Autores</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/75">Reformadores</span>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <Flame className="w-6 h-6" style={{ color: '#fbbf24' }} />
              </div>
              <p className="text-[10px] font-black tracking-[0.35em] uppercase text-amber-400">
                Ordem Cronológica · 1436–1692
              </p>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight mb-4">
              Os Reformadores
            </h1>
            <p className="text-white/65 text-sm sm:text-lg max-w-2xl leading-relaxed">
              Da Pré-Reforma espanhola até os primeiros batistas ingleses — 20 figuras que redefiniram a cristandade ocidental.
            </p>
          </motion.div>

          {/* Legenda de eras */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {ERAS_ORDEM.map(era => {
              const c = ERA_COLORS[era];
              return (
                <span key={era} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest"
                  style={{ color: c.accent, background: c.bg, border: `1px solid ${c.border}` }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: c.accent }} />
                  {c.label}
                </span>
              );
            })}
          </motion.div>

          {/* Cards por era */}
          {ERAS_ORDEM.map((era, eraIdx) => {
            const grupo = REFORMADORES.filter(r => r.era === era);
            const c = ERA_COLORS[era];
            return (
              <div key={era} className="mb-16">
                {/* cabeçalho da era */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: eraIdx * 0.05 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="w-1 h-7 rounded-full shrink-0" style={{ background: c.accent }} />
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white">{c.label}</h2>
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${c.accent}40, transparent)` }} />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {grupo.map((r, i) => (
                    <motion.div
                      key={r.nome}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="group rounded-2xl border overflow-hidden flex flex-col hover:border-opacity-60 hover:shadow-2xl hover:scale-[1.012] transition-all duration-300"
                      style={{ background: 'linear-gradient(135deg, #0d0d0d 0%, #080808 100%)', borderColor: c.border }}
                    >
                      {/* painel de foto */}
                      <div className="relative overflow-hidden" style={{ minHeight: 200 }}>
                        {/* glow accent no topo */}
                        <div className="absolute inset-0 z-10 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                          style={{ background: `radial-gradient(ellipse at top center, ${c.accent} 0%, transparent 60%)` }} />
                        {/* gradiente para fundir foto com conteúdo abaixo */}
                        <div className="absolute inset-0 z-10 pointer-events-none"
                          style={{ background: `linear-gradient(to bottom, transparent 30%, #0d0d0d 100%), linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 50%)` }} />

                        {r.foto ? (
                          <img
                            src={r.foto}
                            alt={`Retrato de ${r.nome}`}
                            className="w-full object-cover object-top block transition-transform duration-700 group-hover:scale-105"
                            style={{ height: 200, filter: 'sepia(18%) contrast(1.05) brightness(0.82)' }}
                            onError={e => {
                              const el = e.currentTarget;
                              el.style.display = 'none';
                              const ph = el.parentElement?.querySelector('.foto-placeholder') as HTMLElement | null;
                              if (ph) ph.style.display = 'flex';
                            }}
                          />
                        ) : null}

                        {/* placeholder monograma */}
                        <div
                          className={`foto-placeholder w-full items-center justify-center${r.foto ? ' hidden' : ' flex'}`}
                          style={{ height: 200, background: `radial-gradient(ellipse at center, ${c.accent}18 0%, transparent 70%)` }}
                        >
                          <span className="font-display font-black text-6xl opacity-20" style={{ color: c.accent }}>
                            {r.nome.split(' ').map(w => w[0]).slice(0, 2).join('')}
                          </span>
                        </div>

                        {/* badge datas + era flutuante sobre a foto */}
                        <div className="absolute bottom-3 left-0 right-0 z-20 flex items-end justify-between px-4">
                          <span className="px-2.5 py-1 rounded-full font-black text-[9px] tracking-widest backdrop-blur-sm"
                            style={{ color: c.accent, background: 'rgba(0,0,0,0.60)', border: `1px solid ${c.accent}40` }}>
                            {r.eraLabel}
                          </span>
                          <span className="px-2.5 py-1 rounded-full font-black text-[9px] tracking-widest backdrop-blur-sm text-white/80"
                            style={{ background: 'rgba(0,0,0,0.60)', border: '1px solid rgba(255,255,255,0.12)' }}>
                            {r.datas}
                          </span>
                        </div>
                      </div>

                      {/* corpo */}
                      <div className="px-5 pt-4 pb-5 flex flex-col gap-3 flex-1">
                        <h3 className="font-display font-black text-lg sm:text-xl text-white leading-tight">
                          {r.nome}
                        </h3>
                        <p className="text-white/72 text-sm leading-relaxed">
                          {r.resumo}
                        </p>

                        <div className="space-y-2 mt-auto pt-2">
                          <div className="rounded-xl px-4 py-2.5" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                            <p className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color: c.accent }}>
                              Obra-chave
                            </p>
                            <p className="text-white/85 text-xs font-bold italic leading-snug">{r.obraChave}</p>
                          </div>
                          <div className="px-1 pt-1">
                            <p className="text-[9px] font-black uppercase tracking-widest mb-1 text-white/30">
                              Contribuições
                            </p>
                            <p className="text-white/50 text-[11px] leading-relaxed">{r.contribuicao}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* ══ LINHA DO TEMPO VISUAL ══ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            {/* cabeçalho */}
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1 h-8 rounded-full shrink-0" style={{ background: 'linear-gradient(180deg,#fbbf24,#f97316)' }} />
              <div>
                <p className="text-[10px] font-black tracking-[0.35em] uppercase text-amber-400/70 mb-0.5">Mapa Cronológico</p>
                <h2 className="font-display font-black text-xl sm:text-2xl text-white">1436 — 1692 · Dois Séculos de Reforma</h2>
              </div>
            </div>

            {/* trilha central */}
            <div className="relative">
              {/* linha vertical central */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden sm:block"
                style={{ background: 'linear-gradient(to bottom, transparent 0%, #fbbf2440 8%, #fbbf2440 92%, transparent 100%)' }} />

              {/* linha mobile (esquerda) */}
              <div className="absolute left-5 top-0 bottom-0 w-px sm:hidden"
                style={{ background: 'linear-gradient(to bottom, transparent 0%, #fbbf2440 8%, #fbbf2440 92%, transparent 100%)' }} />

              <div className="flex flex-col gap-0">
                {REFORMADORES.map((r, i) => {
                  const c = ERA_COLORS[r.era];
                  const isLeft = i % 2 === 0;
                  return (
                    <motion.div
                      key={r.nome}
                      initial={{ opacity: 0, x: isLeft ? -28 : 28 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ delay: i * 0.04, duration: 0.4 }}
                      className="relative flex items-center sm:justify-center"
                    >
                      {/* Desktop: layout alternado */}
                      <div className={`hidden sm:flex w-full items-center gap-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>

                        {/* card lado */}
                        <motion.div
                          whileHover={{ scale: 1.02, x: isLeft ? -4 : 4 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                          className="w-[calc(50%-28px)] rounded-2xl border px-4 py-3 cursor-default"
                          style={{ background: c.bg, borderColor: c.border }}
                        >
                          <div className={`flex items-start gap-3 ${isLeft ? 'flex-row' : 'flex-row-reverse text-right'}`}>
                            <div className={`flex-1 ${!isLeft ? 'text-right' : ''}`}>
                              <p className="font-black text-sm text-white leading-tight">{r.nome}</p>
                              <p className="text-[10px] font-bold mt-0.5" style={{ color: c.accent }}>{r.eraLabel} · {r.datas}</p>
                              <p className="text-white/55 text-[11px] leading-relaxed mt-1.5 line-clamp-2">{r.resumo.split('.')[0]}.</p>
                            </div>
                          </div>
                        </motion.div>

                        {/* spacer + nó */}
                        <div className="w-14 flex justify-center items-center shrink-0 py-3 relative z-10">
                          {/* glow de fundo pulsante */}
                          <motion.div
                            animate={{ scale: [1, 1.8, 1], opacity: [0.35, 0, 0.35] }}
                            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.18 }}
                            className="absolute w-7 h-7 rounded-full"
                            style={{ background: c.accent }}
                          />
                          {/* nó principal */}
                          <motion.div
                            animate={{ boxShadow: [`0 0 0px ${c.accent}00`, `0 0 10px ${c.accent}80`, `0 0 0px ${c.accent}00`] }}
                            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.18 }}
                            className="relative w-4 h-4 rounded-full border-2 z-10 flex items-center justify-center"
                            style={{ background: '#0d0d0d', borderColor: c.accent }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.accent }} />
                          </motion.div>
                        </div>

                        {/* espaço vazio no outro lado */}
                        <div className="w-[calc(50%-28px)]" />
                      </div>

                      {/* Mobile: layout linear com trilha à esquerda */}
                      <div className="flex sm:hidden items-start gap-4 pl-2 py-2 w-full">
                        {/* nó */}
                        <div className="relative flex flex-col items-center shrink-0 mt-1" style={{ width: 24 }}>
                          <motion.div
                            animate={{ scale: [1, 1.7, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.18 }}
                            className="absolute w-5 h-5 rounded-full top-0"
                            style={{ background: c.accent }}
                          />
                          <motion.div
                            animate={{ boxShadow: [`0 0 0px ${c.accent}00`, `0 0 8px ${c.accent}80`, `0 0 0px ${c.accent}00`] }}
                            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.18 }}
                            className="relative w-3.5 h-3.5 rounded-full border-2 z-10 flex items-center justify-center"
                            style={{ background: '#0d0d0d', borderColor: c.accent }}
                          >
                            <span className="w-1 h-1 rounded-full" style={{ background: c.accent }} />
                          </motion.div>
                        </div>

                        {/* conteúdo */}
                        <div className="flex-1 rounded-xl border px-3 py-2.5" style={{ background: c.bg, borderColor: c.border }}>
                          <p className="font-black text-sm text-white leading-tight">{r.nome}</p>
                          <p className="text-[10px] font-bold mt-0.5" style={{ color: c.accent }}>{r.eraLabel} · {r.datas}</p>
                          <p className="text-white/55 text-[11px] leading-relaxed mt-1 line-clamp-2">{r.resumo.split('.')[0]}.</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* legenda de eras na base */}
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {ERAS_ORDEM.map(era => {
                const c = ERA_COLORS[era];
                const count = REFORMADORES.filter(r => r.era === era).length;
                return (
                  <div key={era} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest"
                    style={{ color: c.accent, background: c.bg, border: `1px solid ${c.border}` }}>
                    <motion.span
                      animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: c.accent }}
                    />
                    {c.label}
                    <span className="opacity-60">· {count}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Voltar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <Link to="/biblioteca/autores" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs font-black uppercase tracking-widest transition-colors">
              ← Voltar para Autores
            </Link>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
