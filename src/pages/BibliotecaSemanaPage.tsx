import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, BookOpen, Star, Quote, Calendar,
  Flame, Globe, Layers, Compass, ArrowRight, Check,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ─── Componente de capa ──────────────────────────────────────────────────────
function CapaLivro({ src, alt, fallbackTexto, accent, className = '' }: {
  src: string; alt: string; fallbackTexto: string; accent: string; className?: string;
}) {
  const [erro, setErro] = useState(false);
  return (
    <div className={`aspect-[2/3] rounded-xl overflow-hidden border border-white/25 shadow-2xl ${className}`}>
      {!erro ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" onError={() => setErro(true)} />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-3 text-center"
          style={{ background: 'linear-gradient(160deg, #1a1000, #2a1800)' }}>
          <BookOpen className="w-7 h-7" style={{ color: accent }} />
          <span className="text-white/70 text-xs font-bold leading-tight">{fallbackTexto}</span>
        </div>
      )}
    </div>
  );
}

// ─── Dados dos livros ─────────────────────────────────────────────────────────
interface LivroData {
  id: string;
  titulo: string;
  tituloOriginal: string;
  autor: string;
  editora: string;
  anoPublicacao: string;
  edicaoPort: string;
  area: string;
  nivel: string;
  accentColor: string;
  capaEN: string;
  capaPT: string;
  fotoAutor: string;
  sinopse: string;
  categorias: string[];
  sobreAutor: string[];
  citacao: string;
  temas: {
    num: string; titulo: string; subtitulo: string; cor: string; icon: React.ElementType;
    texto: string; destaque: string;
  }[];
  porqueLeR: { titulo: string; texto: string; cor: string }[];
}

const LIVROS: LivroData[] = [
  {
    id: 'pensamento-da-reforma',
    titulo: 'O Pensamento da Reforma',
    tituloOriginal: 'Reformation Thought: An Introduction',
    autor: 'Alister E. McGrath',
    editora: 'Blackwell, Oxford',
    anoPublicacao: '1988 (1ª ed.)',
    edicaoPort: 'Cultura Cristã',
    area: 'História da Reforma',
    nivel: 'Introdutório · Acadêmico',
    accentColor: '#fbbf24',
    capaEN: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1387715290i/53952.jpg',
    capaPT: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1478795724l/32938787.jpg',
    fotoAutor: 'https://alistermcgrath.weebly.com/uploads/7/4/9/4/7494178/4753565.jpg',
    sinopse:
      'A introdução mais completa e acessível ao pensamento teológico da Reforma Protestante. McGrath conduz o leitor pelos grandes temas — justificação, Escritura, predestinação, sacramentos, ética social — sem sacrificar a profundidade pela clareza. Um mapa intelectual indispensável para quem quer compreender o que os reformadores realmente ensinaram.',
    categorias: ['Reforma Protestante', 'Teologia Histórica', 'Lutero', 'Calvino', 'Sola Scriptura', 'Justificação'],
    sobreAutor: [
      'Alister Edgar McGrath (nascido em 1953, Belfast) é um dos mais influentes teólogos evangélicos vivos. Doutor em biologia molecular por Oxford, ele fez uma conversão do ateísmo ao cristianismo durante seus estudos universitários — experiência que moldou sua abordagem apologética e intelectualmente rigorosa da fé.',
      'Professor de Apologética no Wycliffe Hall (Oxford) e depois no King\'s College London, McGrath passou décadas estudando a história da teologia reformada. É autor de mais de 50 livros, incluindo a monumental biografia de C.S. Lewis e uma trilogia científica sobre a relação entre ciência e fé cristã.',
      '"O Pensamento da Reforma" é considerada a introdução acadêmica padrão ao tema no mundo anglofônico. Há décadas é utilizada em seminários e faculdades de teologia em todo o mundo — traduzida para mais de dez idiomas.',
    ],
    citacao:
      '"A Reforma não foi apenas uma revolução religiosa — foi uma revolução intelectual que redefiniu o modo pelo qual a Europa Ocidental pensava sobre Deus, a humanidade e o mundo."',
    temas: [
      {
        num: '01', titulo: 'O que foi a Reforma?', subtitulo: 'Muito mais que uma ruptura religiosa',
        cor: '#fbbf24', icon: Flame,
        texto: 'McGrath começa recusando a caricatura: a Reforma não foi simplesmente "Lutero contra o Papa". Foi um movimento intelectual, espiritual e político complexo que varreu a Europa e redefiniu a relação entre fé, razão, escritura e autoridade. Compreender a Reforma é compreender o nascimento do mundo moderno.',
        destaque: '"A Reforma foi, antes de tudo, uma crise de autoridade — e uma resposta a essa crise."',
      },
      {
        num: '02', titulo: 'A Questão da Justificação', subtitulo: 'O coração teológico da Reforma',
        cor: '#f97316', icon: Star,
        texto: 'Nenhum tema é mais central para McGrath do que a doutrina da justificação. Ele demonstra como Lutero não inventou uma teologia — ele redescobriu uma: a graça soberana de Deus que declara justo o pecador, não por seus méritos, mas pela fé em Cristo. Esse é o artigo pelo qual a Igreja fica ou cai.',
        destaque: '"Justificação pela fé não é um dogma luterano — é um redescobrimento apostólico."',
      },
      {
        num: '03', titulo: 'Escritura e Tradição', subtitulo: 'O princípio Sola Scriptura em perspectiva',
        cor: '#a855f7', icon: BookOpen,
        texto: 'McGrath trata com precisão o que os reformadores realmente disseram sobre a Escritura. Sola Scriptura não era rejeição de toda tradição — era a afirmação de que a Escritura é a norma normans, a regra que rege todas as outras regras. A tradição tem peso, mas somente quando iluminada e confirmada pela Palavra.',
        destaque: '"Sola Scriptura não é nuda Scriptura — a tradição serve, não governa."',
      },
      {
        num: '04', titulo: 'Calvino e a Soberania Divina', subtitulo: 'Uma visão reformada do cosmos',
        cor: '#2dd4bf', icon: Globe,
        texto: 'O capítulo sobre Calvino é um dos mais iluminadores do livro. McGrath expõe como a teologia calvinista não é apenas uma coleção de doutrinas, mas uma visão integrada do cosmos sob a soberania de Deus — onde toda a realidade, da política à arte, é espaço de glorificação divina.',
        destaque: '"Para Calvino, todo território da existência humana é territórium Dei."',
      },
      {
        num: '05', titulo: 'A Reforma e o Mundo Moderno', subtitulo: 'Legado, tensões e perguntas abertas',
        cor: '#34d399', icon: Layers,
        texto: 'Na parte final, McGrath avalia o impacto duradouro da Reforma: a formação do capitalismo (Weber), o surgimento do individualismo religioso, as raízes do secularismo e os desafios que os herdeiros da Reforma enfrentam hoje. É uma história com consequências — muitas delas ainda não resolvidas.',
        destaque: '"A Reforma abriu portas que nenhum reformador conseguiu — nem quis — fechar."',
      },
    ],
    porqueLeR: [
      {
        titulo: 'O melhor ponto de entrada',
        texto: 'Há poucas obras que conseguem introduzir um período tão complexo com tamanha clareza. McGrath não escreve para iniciados — escreve para quem quer entender de verdade, sem atalhos que distorcem.',
        cor: '#fbbf24',
      },
      {
        titulo: 'Clareza sem Superficialidade',
        texto: 'Escrito para quem não é especialista, mas sem simplificar o que é complexo. McGrath trata as ideias com respeito — e o leitor, com confiança. Raro numa introdução acadêmica.',
        cor: '#f97316',
      },
      {
        titulo: 'Relevância Permanente',
        texto: 'Os debates que McGrath expõe — graça, livre-arbítrio, autoridade da Escritura, Sacramento — não são questões do século XVI. São as questões de toda Igreja que leva o Evangelho a sério.',
        cor: '#a855f7',
      },
    ],
  },
];

// ─── Card de seleção de livro ─────────────────────────────────────────────────
function CardSelecao({ livro, selecionado, onClick, index }: {
  livro: LivroData; selecionado: boolean; onClick: () => void; index: number;
}) {
  const [imgErro, setImgErro] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      onClick={onClick}
      className="relative w-full text-left group"
    >
      <div
        className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl border transition-all duration-200"
        style={{
          background: selecionado
            ? `linear-gradient(135deg, ${livro.accentColor}15 0%, ${livro.accentColor}08 100%)`
            : 'rgba(255,255,255,0.03)',
          borderColor: selecionado ? `${livro.accentColor}60` : 'rgba(255,255,255,0.08)',
          boxShadow: selecionado ? `0 0 20px ${livro.accentColor}18` : 'none',
        }}
      >
        {/* Miniatura da capa */}
        <div className="shrink-0 w-12 h-[72px] rounded-lg overflow-hidden border border-white/15 shadow-lg">
          {!imgErro ? (
            <img
              src={livro.capaPT}
              alt={livro.titulo}
              className="w-full h-full object-cover"
              onError={() => setImgErro(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: 'linear-gradient(160deg,#1a1000,#2a1800)' }}>
              <BookOpen className="w-4 h-4" style={{ color: livro.accentColor }} />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-black text-sm sm:text-base leading-tight truncate">
            {livro.titulo}
          </p>
          <p className="text-white/45 text-xs font-semibold mt-0.5 truncate">{livro.autor}</p>
        </div>

        {/* Indicador selecionado */}
        <div
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: selecionado ? livro.accentColor : 'rgba(255,255,255,0.06)',
            border: `2px solid ${selecionado ? livro.accentColor : 'rgba(255,255,255,0.12)'}`,
          }}
        >
          {selecionado && <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />}
        </div>
      </div>

      {/* Badge "Novo" */}
      {index === 0 && (
        <span
          className="absolute -top-2 -right-2 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ color: livro.accentColor, background: `${livro.accentColor}22`, border: `1px solid ${livro.accentColor}50` }}
        >
          Novo
        </span>
      )}
    </motion.button>
  );
}

// ─── Detalhe do livro selecionado ─────────────────────────────────────────────
function DetalheLivro({ livro }: { livro: LivroData }) {
  const [imgErroAutor, setImgErroAutor] = useState(false);
  const ACCENT = livro.accentColor;
  const ACCENT_DIM = ACCENT + '28';
  const ACCENT_BORDER = ACCENT + '50';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={livro.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35 }}
      >
        {/* Hero título */}
        <div className="mb-12">
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4">
            {livro.titulo.split(' ').slice(0, -1).join(' ')}<br />
            <span style={{ color: ACCENT }}>{livro.titulo.split(' ').slice(-1)}</span>
          </h2>
          <p className="text-white/70 text-xl sm:text-2xl font-semibold mb-2">{livro.tituloOriginal}</p>
          <p className="text-white/50 text-lg font-medium">{livro.autor} · {livro.editora} / {livro.edicaoPort}</p>
        </div>

        {/* Card capas + dados */}
        <div
          className="grid grid-cols-1 sm:grid-cols-[260px_1fr] gap-8 sm:gap-12 p-8 sm:p-12 rounded-3xl mb-12 border border-white/15"
          style={{ background: 'linear-gradient(135deg, #0f0c00 0%, #1a1200 50%, #0a0800 100%)' }}
        >
          {/* Capas */}
          <div className="flex flex-col items-center sm:items-start gap-6">
            <div className="relative">
              <div className="absolute -inset-6 rounded-2xl blur-3xl opacity-40" style={{ background: ACCENT }} />
              <div className="relative flex gap-4">
                <div className="flex flex-col items-center gap-2">
                  <CapaLivro src={livro.capaEN} alt={`${livro.titulo} — EN`} fallbackTexto={livro.tituloOriginal} accent={ACCENT} className="w-[110px] sm:w-[130px]" />
                  <span className="text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ color: ACCENT, background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}` }}>EN</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <CapaLivro src={livro.capaPT} alt={`${livro.titulo} — PT`} fallbackTexto={livro.titulo} accent={ACCENT} className="w-[110px] sm:w-[130px]" />
                  <span className="text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ color: '#34d399', background: '#34d39918', border: '1px solid #34d39940' }}>PT</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {[1,2,3,4,5].map(n => <Star key={n} className="w-5 h-5 fill-current" style={{ color: ACCENT }} />)}
            </div>
            <p className="text-sm font-black uppercase tracking-widest px-4 py-2 rounded-full"
              style={{ color: ACCENT, background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}` }}>
              Leitura Essencial
            </p>
          </div>

          {/* Dados */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] mb-5" style={{ color: ACCENT }}>Sobre o Livro</p>
              <p className="text-white/85 text-lg sm:text-xl leading-relaxed mb-8">{livro.sinopse}</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Autor', value: livro.autor },
                  { label: 'Editora orig.', value: livro.editora },
                  { label: 'Publicação', value: livro.anoPublicacao },
                  { label: 'Edição port.', value: livro.edicaoPort },
                  { label: 'Área', value: livro.area },
                  { label: 'Nível', value: livro.nivel },
                ].map(m => (
                  <div key={m.label}>
                    <span className="text-white/45 font-bold uppercase tracking-wider text-xs block mb-1">{m.label}</span>
                    <span className="text-white/90 font-bold text-base">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {livro.categorias.map(tag => (
                <span key={tag} className="text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full"
                  style={{ color: ACCENT, background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}` }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Sobre o Autor */}
        <div className="mb-12 p-8 sm:p-12 rounded-3xl border border-purple-400/20"
          style={{ background: 'linear-gradient(135deg, #0a0518 0%, #100a20 50%, #080412 100%)' }}>
          <p className="text-sm font-black uppercase tracking-[0.3em] mb-8" style={{ color: '#c084fc' }}>O Autor</p>
          <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-8 sm:gap-12">
            <div className="flex flex-col items-center sm:items-start gap-5">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full blur-2xl opacity-40" style={{ background: '#a78bfa' }} />
                <div className="relative w-[160px] h-[160px] rounded-full overflow-hidden border-2 border-purple-400/40 shadow-2xl">
                  {!imgErroAutor ? (
                    <img src={livro.fotoAutor} alt={livro.autor}
                      className="w-full h-full object-cover object-top"
                      onError={() => setImgErroAutor(true)} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(160deg,#1a0a2e,#2a1050)' }}>
                      <span className="text-5xl font-black text-white/40">AM</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white font-black text-lg">{livro.autor}</p>
                <p className="text-white/55 text-sm font-semibold mt-1">n. 1953 · Belfast, Irlanda</p>
                <p className="text-white/40 text-sm mt-0.5">Oxford · King's College London</p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {livro.sobreAutor.map((p, i) => (
                <p key={i} className="text-white/80 text-lg leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="h-px w-full mb-14" style={{ background: `linear-gradient(90deg,transparent,${ACCENT}50,transparent)` }} />

        {/* Temas */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-1.5 h-8 rounded-full" style={{ background: ACCENT, boxShadow: `0 0 14px ${ACCENT}90` }} />
            <h3 className="font-display font-black text-lg uppercase tracking-widest" style={{ color: ACCENT }}>Os Grandes Temas</h3>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,${ACCENT}50,transparent)` }} />
          </div>
          <div className="flex flex-col gap-5">
            {livro.temas.map((tema, i) => {
              const Icone = tema.icon;
              return (
                <motion.div key={tema.num}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="p-8 sm:p-9 rounded-2xl border hover:border-white/25 transition-colors duration-200"
                  style={{ background: `linear-gradient(135deg,${tema.cor}10 0%,rgba(255,255,255,0.03) 100%)`, borderColor: `${tema.cor}35` }}>
                  <div className="flex items-start gap-5 mb-5">
                    <div className="p-3.5 rounded-xl shrink-0 mt-0.5"
                      style={{ background: tema.cor + '25', border: `1px solid ${tema.cor}45` }}>
                      <Icone className="w-6 h-6" style={{ color: tema.cor }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-black uppercase tracking-widest px-3 py-1 rounded-full"
                          style={{ color: tema.cor, background: tema.cor + '22', border: `1px solid ${tema.cor}40` }}>{tema.num}</span>
                        <span className="text-white/50 text-sm font-semibold uppercase tracking-wider">{tema.subtitulo}</span>
                      </div>
                      <h4 className="text-white font-black text-xl sm:text-2xl leading-tight">{tema.titulo}</h4>
                    </div>
                  </div>
                  <p className="text-white/75 text-lg leading-relaxed mb-6 pl-16">{tema.texto}</p>
                  <div className="ml-16 pl-5 border-l-2 py-2" style={{ borderColor: tema.cor + '70' }}>
                    <p className="text-lg italic font-bold" style={{ color: tema.cor }}>{tema.destaque}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Citação */}
        <div className="mb-14 p-10 sm:p-14 rounded-3xl text-center border"
          style={{ background: `linear-gradient(135deg,${ACCENT}12 0%,transparent 60%)`, borderColor: `${ACCENT}45` }}>
          <Quote className="w-12 h-12 mx-auto mb-6" style={{ color: ACCENT, opacity: 0.7 }} />
          <blockquote className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-snug mb-6 max-w-3xl mx-auto">
            {livro.citacao}
          </blockquote>
          <cite className="text-white/60 text-lg font-semibold not-italic">
            {livro.autor} · {livro.titulo}
          </cite>
        </div>

        {/* Por que ler */}
        <div className="mb-14 p-8 sm:p-12 rounded-3xl border"
          style={{ background: `${ACCENT}08`, borderColor: `${ACCENT}35` }}>
          <div className="flex items-center gap-3 mb-8">
            <Compass className="w-7 h-7" style={{ color: ACCENT }} />
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">Por que ler este livro?</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {livro.porqueLeR.map((item, i) => (
              <div key={i} className="flex flex-col gap-4 p-7 rounded-2xl border"
                style={{ background: `${item.cor}10`, borderColor: `${item.cor}35` }}>
                <p className="font-black text-lg uppercase tracking-wide" style={{ color: item.cor }}>{item.titulo}</p>
                <p className="text-white/80 text-base leading-relaxed">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <Link to="/devocional/reforma"
            className="group flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black text-base uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: ACCENT, color: '#000', boxShadow: `0 0 40px ${ACCENT}50` }}>
            Ir para o Devocional Reforma
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link to="/biblioteca/resenhas"
            className="group flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black text-base uppercase tracking-widest border border-white/25 hover:border-white/50 text-white/70 hover:text-white transition-all duration-200">
            Ver todas as resenhas
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function BibliotecaSemanaPage() {
  const [livroSelecionado, setLivroSelecionado] = useState(LIVROS[0].id);
  const livro = LIVROS.find(l => l.id === livroSelecionado)!;

  return (
    <div className="min-h-screen relative">
      <Navbar />

      <section className="pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-10 text-sm font-black uppercase tracking-widest text-white/40">
            <Link to="/biblioteca" className="hover:text-amber-400 transition-colors">Biblioteca</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/60">Livro do Dia</span>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="flex flex-wrap items-center gap-3 mb-10">
            <span className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-full"
              style={{ color: '#fbbf24', background: '#fbbf2428', border: '1px solid #fbbf2450' }}>
              <Star className="w-4 h-4 fill-current" />
              Livro do Dia
            </span>
            <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50">
              <Calendar className="w-4 h-4" />
              Outubro 2026
            </span>
          </motion.div>

          {/* Seletor de livros */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mb-14 p-6 sm:p-8 rounded-3xl border border-white/10"
            style={{ background: 'rgba(255,255,255,0.025)' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-6 rounded-full bg-white/20" />
              <p className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Escolha o Livro</p>
            </div>
            <div className="flex flex-col gap-3">
              {LIVROS.map((l, i) => (
                <CardSelecao
                  key={l.id}
                  livro={l}
                  selecionado={livroSelecionado === l.id}
                  onClick={() => setLivroSelecionado(l.id)}
                  index={i}
                />
              ))}
            </div>
          </motion.div>

          {/* Detalhe do livro selecionado */}
          <DetalheLivro livro={livro} />

        </div>
      </section>

      <Footer />
    </div>
  );
}
