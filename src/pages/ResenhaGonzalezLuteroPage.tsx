import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, BookOpen, Quote, ChevronRight,
  Star, Globe, Users, Library,
  Zap, BookMarked, Hammer, Shield, Brain,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ACCENT = '#f97316';

const SECOES = [
  {
    num: '01',
    titulo: 'O Homem e Seu Temperamento',
    subtitulo: 'Contradições produtivas de um reformador',
    cor: '#f97316',
    corBg: '#f9731610',
    icon: Brain,
    paragrafo: 'Antes de narrar os eventos, González traça o retrato do reformador. Lutero era um homem de contradições produtivas: profundamente sincero e frequentemente vulgar nas expressões; capaz de grande ternura pastoral e de ataques virulentos contra os adversários; dotado de uma convicção tão inabalável que o levou a enfrentar papas e imperadores, mas também à rigidez que mais tarde lamentaria.',
    detalhe: 'Três traços definem seu temperamento. A intensidade emocional — Lutero vivia a fé com seriedade que beira o abismo; sua infância marcada pela severidade paterna moldou sua imagem de um Deus-Juiz severo. O poder da linguagem — tanto em latim quanto em alemão, era magistral; essa habilidade transformaria uma disputa teológica em movimento de massas. E a convicção inabalável — uma vez persuadido de que Deus queria um caminho, Lutero o seguia "até as últimas consequências, sem olhar para trás".',
    fraseDestaque: '"Essa convicção o fez firme em Worms — e também o fez errar onde não devia."',
  },
  {
    num: '02',
    titulo: 'A Crise: Um Monge que Não Encontrava Paz',
    subtitulo: 'A tempestade, o voto e o Anfechung',
    cor: '#a855f7',
    corBg: '#a855f710',
    icon: Zap,
    paragrafo: 'Em julho de 1505, o jovem Martinho — 21 anos, estudante de direito, inquieto por vontade própria — foi surpreendido por uma violenta tempestade elétrica perto de Erfurt. Convicto de que morreria e seria julgado, gritou: "Santa Ana, me salva e serei monge!" O voto foi cumprido. O episódio é a janela para o universo mental do século XV: a religiosidade medieval operava por medo, obrigação e barganha. Deus era o Juiz; os santos eram intermediários; os votos eram contratos.',
    detalhe: 'No mosteiro, Lutero empenhou-se com toda a seriedade de seu temperamento — novato exemplar, ordenado sacerdote, doutor em teologia em 1512. Mas havia um colapso interior. O Anfechung — angústia espiritual sem tradução precisa — era o terror de estar diante de um Deus justo sem poder oferecer nada à altura. O problema estava no sistema, não no penitente: a piedade medieval oferecia um caminho de obras que prometia mais do que cumpria. Lutero chegou a confessar a seu diretor que não amava a Deus. Que o odiava.',
    fraseDestaque: '"O problema não era falta de empenho — era excesso de consciência."',
  },
  {
    num: '03',
    titulo: 'A Descoberta: A Torre de Wittenberg',
    subtitulo: 'Romanos 1:17 e a porta do paraíso',
    cor: '#2dd4bf',
    corBg: '#2dd4bf10',
    icon: BookMarked,
    paragrafo: 'O confessor de Lutero, João von Staupitz, tomou uma medida surpreendente: em vez de multiplicar exercícios espirituais, mandou Lutero para fora de si mesmo — determinou que ele se preparasse para ensinar as Escrituras em Wittenberg. Foi uma intervenção pastoral de rara sabedoria. A espiral de introspecção ansiosa foi interrompida pela exigência de estudar e ensinar o texto sagrado.',
    detalhe: 'Por volta de 1515, preparando aulas sobre Romanos, Lutero deparou-se com a frase que havia sido seu tormento: "A justiça de Deus é revelada no Evangelho" (Rm 1:17). Durante anos aquela frase o esmagava. Mas relendo Agostinho e o contexto, chegou a uma leitura que invertia tudo: a "justiça de Deus" não é a exigência que Deus faz de nós — é a justiça que Deus concede a nós em Cristo. A fé não é uma obra a realizar, mas a abertura de mãos para receber o que Deus oferece gratuitamente. Lutero descreveu a experiência como sentir que as portas do paraíso se abriam.',
    fraseDestaque: '"A justiça de Deus não é uma régua que condena — é um dom que liberta."',
  },
  {
    num: '04',
    titulo: 'O Estopim: As Indulgências e a Imprensa',
    subtitulo: 'Tetzel, as 95 Teses e Gutenberg',
    cor: '#fbbf24',
    corBg: '#fbbf2410',
    icon: Hammer,
    paragrafo: 'A descoberta da justificação pela fé criou em Lutero uma sensibilidade aguçada para tudo o que a contradizia. Em 1517 apareceu o alvo perfeito: João Tetzel, dominicano vendendo indulgências para financiar a construção da Basílica de São Pedro e as dívidas do arcebispo Alberto de Mainz. A pregação de Tetzel era crua: "Quando a moeda na caixa cair, a alma do purgatório sairá." Para quem havia descoberto que a graça é gratuita, aquilo era a negação do Evangelho em forma comercial.',
    detalhe: 'Em 31 de outubro de 1517, Lutero enviou ao arcebispo Alberto uma carta com 95 teses para debate — um procedimento acadêmico normal na época. A intenção era uma disputa teológica interna, não uma declaração de guerra à Igreja. O que Lutero não calculou foi o efeito da imprensa de Gutenberg. As 95 Teses foram copiadas, impressas e distribuídas por toda a Alemanha em semanas. Sem a prensa tipográfica, seriam a carta de um monge obscuro. Com ela, tornaram-se o estopim de uma revolução.',
    fraseDestaque: '"A Reforma não foi inevitável — foi possibilitada por uma convergência de condições que Lutero não criou, mas soube habitar."',
  },
  {
    num: '05',
    titulo: 'Worms: O Ponto sem Retorno',
    subtitulo: '"Aqui estou. Não posso fazer de outra forma."',
    cor: '#fb7185',
    corBg: '#fb718510',
    icon: Shield,
    paragrafo: 'Entre 1517 e 1521, Lutero foi forçado a radicalizar suas posições a cada novo confronto. No debate de Leipzig (1519), o teólogo João Eck o acuou a defender posições de Jan Hus — o reformador tcheco queimado como herege um século antes. Em 1520, Lutero publicou três tratados que atacavam os pilares do sistema eclesiástico medieval. O papa Leão X respondeu com uma bula ameaçando a excomunhão. Lutero queimou a bula em público.',
    detalhe: 'Citado à Dieta de Worms, Lutero foi confrontado com uma pergunta simples: retrata-se ou não? Diante do imperador Carlos V, pediu um dia para refletir. No dia seguinte, respondeu: "A menos que seja convencido pelo testemunho das Escrituras ou por razões evidentes — estou vinculado pelas Escrituras e minha consciência está cativa à Palavra de Deus. Não posso nem quero retratar-me em nada, pois agir contra a consciência não é seguro nem honesto. Aqui estou. Não posso fazer de outra forma." Frederico, o Sábio, "sequestrou" Lutero para o castelo de Wartburgo. Dez meses depois, Lutero saiu com o Novo Testamento traduzido para o alemão.',
    fraseDestaque: '"Aqui estou. Não posso fazer de outra forma. Que Deus me ajude."',
  },
  {
    num: '06',
    titulo: 'Por Que Lutero e Não Outros?',
    subtitulo: 'Estrutura e agência na história',
    cor: '#34d399',
    corBg: '#34d39910',
    icon: Globe,
    paragrafo: 'González levanta uma questão que frequentemente passa despercebida: por que Lutero e não outro? Havia reformadores antes dele — Wyclif, Huss, Savonarola — que protestaram e foram silenciados. A resposta é dupla. De um lado, as circunstâncias estruturais: a imprensa amplificou o protesto; o nationalismo alemão o abraçou; Carlos V estava envolvido em guerras com Francisco I e com os turcos otomanos e não podia esmagar o movimento quando ainda era frágil; Frederico, o Sábio, protegia Lutero.',
    detalhe: 'De outro lado, a agência pessoal: Lutero estava disposto a ir até o fim. A mesma profundidade de convicção que o havia atormentado no monastério — aquela incapacidade de fazer as pazes com uma consciência que exigia mais do que recebia — foi a mesma que o manteve firme em Worms. A Reforma aconteceu porque Lutero chegou no momento certo e porque não recuou. Nenhuma das duas condições, sozinha, seria suficiente.',
    fraseDestaque: '"A Reforma aconteceu porque Lutero chegou no momento certo — e porque não recuou."',
  },
];

const LINHA_DO_TEMPO = [
  { ano: '1483', evento: 'Nascimento de Martinho Lutero em Eisleben', cor: '#f97316', marco: false },
  { ano: '1501', evento: 'Inicia estudos de direito em Erfurt', cor: '#f97316', marco: false },
  { ano: '1505', evento: 'Tempestade de Erfurt — entra no mosteiro agostinho', cor: '#a855f7', marco: true },
  { ano: '1512', evento: 'Doutorado em teologia · Professor em Wittenberg', cor: '#2dd4bf', marco: false },
  { ano: '1515', evento: 'Descoberta de Rm 1:17 — "porta do paraíso"', cor: '#2dd4bf', marco: true },
  { ano: '1517', evento: '95 Teses enviadas ao arcebispo Alberto (31 out.)', cor: '#fbbf24', marco: true },
  { ano: '1519', evento: 'Debate de Leipzig — defende posições de Jan Hus', cor: '#fb7185', marco: false },
  { ano: '1520', evento: 'Queima a bula papal · Três tratados fundamentais', cor: '#fb7185', marco: false },
  { ano: '1521', evento: 'Dieta de Worms · "Aqui estou" · Castelo de Wartburgo', cor: '#fb7185', marco: true },
  { ano: '1522', evento: 'NT traduzido para o alemão publicado', cor: '#34d399', marco: false },
];

const CONCEITOS = [
  {
    termo: 'Anfechung',
    definicao: 'Angústia espiritual profunda — o terror de estar diante de um Deus justo sem poder oferecer nada à altura. O estado que definiu a crise de Lutero no mosteiro.',
    nivel: 'Existencial',
    cor: '#a855f7',
  },
  {
    termo: 'Justificação pela Fé',
    definicao: 'A "justiça de Deus" não é a exigência que nos condena, mas o dom que nos liberta. A fé é abertura de mãos para receber o que Deus oferece gratuitamente em Cristo.',
    nivel: 'Central',
    cor: '#2dd4bf',
  },
  {
    termo: 'Sola Scriptura',
    definicao: 'Só a Escritura tem autoridade final — não papas, não concílios. Princípio que Lutero assumiu progressivamente, forçado pelos debates de Leipzig e Worms.',
    nivel: 'Reformado',
    cor: '#fbbf24',
  },
  {
    termo: 'Indulgências',
    definicao: 'Remissão da pena temporal dos pecados mediante pagamento. O alvo das 95 Teses — para Lutero, a negação do Evangelho gratuito em forma comercial.',
    nivel: 'Histórico',
    cor: '#f97316',
  },
  {
    termo: 'A Imprensa como Fator',
    definicao: 'A prensa tipográfica de Gutenberg transformou uma disputa acadêmica local em revolução europeia. González é preciso: a Reforma foi possibilitada, não apenas protagonizada.',
    nivel: 'Estrutural',
    cor: '#fb7185',
  },
  {
    termo: 'Consciência Cativa',
    definicao: '"Minha consciência está cativa à Palavra de Deus." A categoria que Lutero usa em Worms — consciência não como subjetividade individual, mas como obediência à Escritura.',
    nivel: 'Ético',
    cor: '#34d399',
  },
];

const PERGUNTAS = [
  {
    pergunta: 'Lutero planejou a Reforma?',
    resposta: 'Não. Queria salvar sua alma. Esperava um debate acadêmico interno. A Reforma foi o produto de uma convergência que ele não criou — mas que soube habitar com coragem.',
    icon: BookOpen,
    cor: '#f97316',
  },
  {
    pergunta: 'O que era o Anfechung e por que importa?',
    resposta: 'Era a angústia de perceber que o sistema medieval de penitência era insuficiente para a profundidade do pecado. A crise de Lutero foi, na prática, a crise do sistema — não apenas a crise de um homem.',
    icon: Brain,
    cor: '#a855f7',
  },
  {
    pergunta: 'Como a descoberta de Rm 1:17 mudou tudo?',
    resposta: 'Lutero inverteu o sentido: a "justiça de Deus" deixou de ser ameaça e tornou-se promessa. Não é o que Deus exige — é o que Deus dá. Toda a teologia reformada parte desse pivô.',
    icon: BookMarked,
    cor: '#2dd4bf',
  },
  {
    pergunta: 'Por que Worms foi o ponto sem retorno?',
    resposta: 'Porque Lutero recusou retratar-se diante do poder mais alto da cristandade ocidental. Após Worms, não havia como recuar sem negar o próprio princípio da consciência cativa à Escritura.',
    icon: Shield,
    cor: '#fb7185',
  },
];

export default function ResenhaGonzalezLuteroPage() {
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
            <span className="text-white/72">González · Cap. II</span>
          </motion.div>

          {/* ── HERO ─────────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl overflow-hidden mb-12"
            style={{ background: 'linear-gradient(135deg, #140800 0%, #100c00 40%, #0d0818 100%)' }}
          >
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20" style={{ background: '#f97316' }} />
            <div className="absolute -bottom-16 -left-10 w-60 h-60 rounded-full blur-3xl opacity-10" style={{ background: '#a855f7' }} />
            <div className="absolute top-1/3 right-1/3 w-40 h-40 rounded-full blur-3xl opacity-8" style={{ background: '#fbbf24' }} />

            <div className="relative p-8 sm:p-12 border border-white/10 rounded-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-7">
                {/* DIA 02 destacado */}
                <div className="flex items-center gap-2 rounded-xl px-4 py-2"
                  style={{ background: ACCENT, boxShadow: `0 0 24px ${ACCENT}66` }}>
                  <span style={{ fontSize: 18, fontWeight: 900, color: '#000', letterSpacing: '0.08em', lineHeight: 1 }}>DIA 02</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(0,0,0,0.55)', letterSpacing: '0.06em' }}>de 31</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{ color: ACCENT, background: ACCENT + '18', border: `1px solid ${ACCENT}30` }}>
                  <Library className="w-2.5 h-2.5" />
                  Resenhas da Reforma Protestante
                </span>
                <span className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full text-amber-400/80 bg-amber-400/10 border border-amber-400/20">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  Resenha Didática
                </span>
              </div>

              <p className="text-[10px] font-black tracking-[0.4em] uppercase mb-3" style={{ color: ACCENT }}>
                História da Igreja · Reforma Protestante
              </p>

              <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-[1.05] mb-3">
                Martinho<br />
                <span style={{ color: ACCENT }}>Lutero</span>
              </h1>
              <p className="text-white/68 text-base sm:text-lg italic mb-8 max-w-xl leading-relaxed">
                Cap. II — A Peregrinação que<br />
                <span className="text-white/85 not-italic font-bold">Mudou o Mundo</span>
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Autor', valor: 'Justo L. González' },
                  { label: 'Editora', valor: 'Vida Nova, 1995' },
                  { label: 'Referência', valor: 'Vol. 6 · p. 43–63' },
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
            style={{ background: 'linear-gradient(135deg, #f9731610 0%, #a855f708 100%)' }}
          >
            <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ background: `linear-gradient(180deg, ${ACCENT}, #a855f7)` }} />
            <Quote className="absolute top-5 right-5 w-10 h-10 opacity-8" style={{ color: ACCENT }} />
            <p className="text-[9px] font-black tracking-[0.35em] uppercase mb-4" style={{ color: ACCENT }}>
              Tese Central do Capítulo
            </p>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed font-medium italic mb-4">
              "O homem que partiu a Igreja cristã ocidental ao meio nunca teve essa intenção. Quando entrou no mosteiro em 1505, queria apenas salvar sua alma. A Reforma foi o produto de uma crise existencial profunda, de uma descoberta teológica libertadora e de uma convergência histórica que ninguém planejou."
            </p>
            <p className="text-white/55 text-[10px] font-black uppercase tracking-widest">
              — González, Cap. II
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
              <h2 className="font-display font-black text-xl text-white mb-4">Um Homem Que Não Planejou a Reforma</h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
                Há uma ironia no coração da história de Martinho Lutero: o homem que partiu a Igreja cristã ocidental ao meio <strong className="text-white/85">nunca teve essa intenção</strong>. Quando entrou no mosteiro agostinho de Erfurt em julho de 1505, queria apenas salvar sua alma. Quando pregou contra as indulgências em 1517, esperava um debate acadêmico interno. Quando se recusou a se retratar em Worms em 1521, estava convicto de que servia ao próprio Deus — não de que fundava uma nova tradição cristã.
              </p>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                González nos apresenta Lutero não como o herói providencial da hagiografia protestante, nem como o rebelde impulsivo da polêmica católica, mas como algo mais humano e mais interessante: <strong className="text-white/85">um homem em crise existencial profunda</strong>, que chegou no momento certo e teve a coragem de não recuar.
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
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: s.corBg, color: s.cor, border: `1px solid ${s.cor}25` }}
                    >
                      <Icone className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] font-black uppercase tracking-[0.3em]" style={{ color: s.cor + 'aa' }}>
                        Seção {s.num} · {s.subtitulo}
                      </p>
                      <h2 className="font-display font-black text-lg sm:text-xl text-white leading-tight">
                        {s.titulo}
                      </h2>
                    </div>
                    <div className="hidden sm:flex font-black text-4xl opacity-10 flex-shrink-0" style={{ color: s.cor }}>
                      {s.num}
                    </div>
                  </div>

                  <div
                    className="rounded-2xl p-6 sm:p-8 border"
                    style={{ background: s.corBg, borderColor: s.cor + '20' }}
                  >
                    <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-4">
                      {s.paragrafo}
                    </p>
                    <p className="text-white/68 text-sm leading-relaxed mb-6">
                      {s.detalhe}
                    </p>
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
              <div className="absolute left-[44px] top-0 bottom-0 w-px bg-white/8" />
              <div className="flex flex-col gap-4">
                {LINHA_DO_TEMPO.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-[88px] text-right flex-shrink-0 pt-0.5">
                      <span className="text-[11px] font-black tabular-nums" style={{ color: item.cor }}>
                        {item.ano}
                      </span>
                    </div>
                    <div className="relative flex-shrink-0 mt-1.5">
                      <div
                        className="w-3.5 h-3.5 rounded-full border-2 border-slate-900 relative z-10"
                        style={{ background: item.marco ? item.cor : item.cor + '60' }}
                      />
                      {item.marco && (
                        <div className="absolute inset-0 rounded-full blur-sm opacity-60" style={{ background: item.cor }} />
                      )}
                    </div>
                    <div
                      className={`flex-1 rounded-xl px-4 py-2.5 border ${item.marco ? 'border-white/20' : 'border-white/6'}`}
                      style={{ background: item.marco ? item.cor + '10' : 'transparent' }}
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
                  <p className="text-white/68 text-xs leading-relaxed">{c.definicao}</p>
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
                    <p className="text-white/68 text-sm leading-relaxed">{item.resposta}</p>
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
            style={{ background: 'linear-gradient(135deg, #140800 0%, #0d1820 100%)' }}
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-15" style={{ background: ACCENT }} />
            <div className="absolute -bottom-16 -left-8 w-40 h-40 rounded-full blur-3xl opacity-10" style={{ background: '#a855f7' }} />

            <div className="relative border border-white/10 rounded-3xl p-8 sm:p-10">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase mb-4" style={{ color: ACCENT }}>
                Conclusão do Capítulo
              </p>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-6 leading-tight">
                A Crise que<br />
                <span style={{ color: ACCENT }}>Gerou uma Época</span>
              </h3>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-5">
                As grandes transformações históricas raramente são planejadas por aqueles que as protagonizam. Lutero queria salvar sua alma. O confessor que o mandou estudar Bíblia queria interromper uma espiral de ansiedade. A imprensa foi inventada para fins comerciais. O nationalismo alemão existia antes de Lutero. E de tudo isso emergiu a <strong className="text-white/85">Reforma Protestante</strong>.
              </p>
              <p className="text-white/72 text-sm sm:text-base leading-relaxed mb-8">
                Há uma lição teológica aqui que o próprio Lutero teria reconhecido: Deus age, frequentemente, através do caminho que menos esperamos — num monge em crise, numa tempestade de verão, numa frase de uma carta antiga escrita por Paulo.
              </p>

              <div
                className="rounded-2xl p-5 border"
                style={{ background: ACCENT + '0d', borderColor: ACCENT + '25' }}
              >
                <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: ACCENT + '99' }}>
                  A lição que permanece
                </p>
                <p className="text-sm font-semibold text-white/90 leading-relaxed">
                  A teologia de Lutero tem força pastoral que os sistemas construídos em câmara fria raramente atingem:{' '}
                  <span style={{ color: ACCENT }}>ela nasceu de uma ferida real, e por isso sabe falar às feridas reais.</span>
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
              Vol. 6. São Paulo: Vida Nova, 1995. Cap. II, p. 43–63.
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
              className="inline-flex items-center gap-2 text-white/55 hover:text-white text-xs font-black uppercase tracking-widest transition-colors"
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
