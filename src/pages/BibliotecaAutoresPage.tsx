import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, User, BookOpen, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function IconMastricht({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      {/* livro aberto */}
      <rect x="8" y="20" width="22" height="28" rx="3" stroke={color} strokeWidth="2" fill={color + '10'} />
      <rect x="34" y="20" width="22" height="28" rx="3" stroke={color} strokeWidth="2" fill={color + '10'} />
      <line x1="32" y1="20" x2="32" y2="48" stroke={color} strokeWidth="2" />
      {/* linhas de texto */}
      {[26, 31, 36, 41].map(y => (
        <line key={y} x1="13" y1={y} x2="26" y2={y} stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      ))}
      {[26, 31, 36, 41].map(y => (
        <line key={y + 100} x1="38" y1={y} x2="51" y2={y} stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      ))}
      {/* cruz topo */}
      <line x1="32" y1="8" x2="32" y2="16" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="11" x2="36" y2="11" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function FotoComFallback({ src, alt, accentColor, IconFigura }: {
  src: string; alt: string; accentColor: string;
  IconFigura: ({ color }: { color: string }) => React.ReactElement;
}) {
  const [erro, setErro] = React.useState(false);
  if (erro) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ minHeight: 220 }}>
        <IconFigura color={accentColor} />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover object-top block"
      style={{ minHeight: 220, filter: 'sepia(12%) contrast(1.06) brightness(0.90)' }}
      onError={() => setErro(true)}
    />
  );
}

const FOTO_MASTRICHT  = 'https://commons.wikimedia.org/wiki/Special:FilePath/Petrus_van_Mastricht.jpg';
const FOTO_GILLESPIE   = 'https://commons.wikimedia.org/wiki/Special:FilePath/George_Gillespie.jpg';
const FOTO_RUTHERFORD  = 'https://commons.wikimedia.org/wiki/Special:FilePath/Samuel_Rutherford_(minister).jpg';
const FOTO_TURRETIN  = 'https://commons.wikimedia.org/wiki/Special:FilePath/Francis_Turretin.jpg';
const FOTO_WEBSTER   = 'https://www.st-andrews.ac.uk/assets/university/schools/school-of-divinity/images/news/john-webster.jpg';
const FOTO_BAVINCK    = 'https://commons.wikimedia.org/wiki/Special:FilePath/HermanBavinckBig.jpg';
const FOTO_PLANTINGA  = 'https://commons.wikimedia.org/wiki/Special:FilePath/Alvin_Plantinga.jpg';

const AUTORES = [
  {
    slug: 'batistas-presbiterianos',
    nome: 'Batistas & Presbiterianos: Quatro Séculos em Paralelo',
    datas: 'Séc. XVII – XX',
    area: 'Tabela Comparativa',
    subtitulo: 'Os Batistas e a Bíblia — Bush & Nettles',
    descricao:
      '36 teólogos batistas do livro Os Batistas e a Bíblia (Bush & Nettles) postos ao lado de contemporâneos presbiterianos/reformados — mesma linha ou contraponto — em torno da questão central: a autoridade e a inerrância das Escrituras. 6 pares obrigatórios, tabela em ABNT.',
    destaque: '"A inerrância não é um fundamentalismo recente — é a posição original dos batistas em quatro séculos de história." — Bush & Nettles',
    tags: ['História Batista', 'Presbiteriana', 'Inerrância', 'Tabela Comparativa', 'ABNT'],
    accentColor: '#f97316',
    gradHero: 'linear-gradient(135deg, #1a0800 0%, #0d0400 50%, #050100 100%)',
    gradOrb1: '#f97316',
    gradOrb2: '#fbbf24',
    foto: null,
    IconFigura: ({ color }: { color: string }) => (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <rect x="6" y="14" width="20" height="28" rx="2" stroke={color} strokeWidth="1.8" fill={color + '12'} />
        <rect x="28" y="14" width="8" height="28" rx="1" stroke={color} strokeWidth="1.2" fill={color + '08'} strokeDasharray="3 2" />
        <rect x="38" y="14" width="20" height="28" rx="2" stroke="#60a5fa" strokeWidth="1.8" fill={'#60a5fa12'} />
        {[20,26,32,36].map(y => <line key={y} x1="10" y1={y} x2="22" y2={y} stroke={color} strokeWidth="1.2" strokeOpacity="0.5" />)}
        {[20,26,32,36].map(y => <line key={y+50} x1="42" y1={y} x2="54" y2={y} stroke="#60a5fa" strokeWidth="1.2" strokeOpacity="0.5" />)}
        <line x1="32" y1="8" x2="32" y2="12" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <line x1="29" y1="10" x2="35" y2="10" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <text x="32" y="48" textAnchor="middle" fontSize="5" fill="#fbbf24" fontWeight="bold">vs</text>
      </svg>
    ),
  },
  {
    slug: 'reformadores',
    nome: 'Os Reformadores',
    datas: '1436–1692',
    area: 'História da Reforma',
    subtitulo: 'Pré-Reforma · Reforma · Pós-Reforma',
    descricao:
      '20 reformadores em ordem cronológica — da Pré-Reforma espanhola até os primeiros batistas ingleses. Cisneros, Lutero, Calvino, Zuínglio, os anabatistas de Zurique, os puritanos de Westminster e os pioneiros batistas: vidas, obras e contribuições teológicas.',
    destaque: '"Aqui estou. Não posso agir de outra forma. Que Deus me ajude." — Martinho Lutero, Dieta de Worms (1521)',
    tags: ['Lutero', 'Calvino', 'Anabatistas', 'Puritanos', 'Batistas', 'Reforma'],
    accentColor: '#fbbf24',
    gradHero: 'linear-gradient(135deg, #120900 0%, #0d0500 50%, #080300 100%)',
    gradOrb1: '#fbbf24',
    gradOrb2: '#f97316',
    foto: null,
    IconFigura: ({ color }: { color: string }) => (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* chama */}
        <path d="M32 52 C20 44 16 34 22 24 C24 30 28 32 28 32 C26 22 30 14 32 10 C34 14 38 22 36 32 C36 32 40 30 42 24 C48 34 44 44 32 52Z"
          stroke={color} strokeWidth="1.8" fill={color + '18'} strokeLinejoin="round" />
        {/* base */}
        <rect x="24" y="52" width="16" height="4" rx="2" stroke={color} strokeWidth="1.5" fill={color + '20'} />
        {/* brilho interno */}
        <path d="M32 46 C26 40 25 34 28 28 C29 32 31 34 31 34 C30 29 32 24 32 22 C32 24 34 29 33 34 C33 34 35 32 36 28 C39 34 38 40 32 46Z"
          fill={color + '35'} />
      </svg>
    ),
  },
  {
    slug: 'turretin',
    nome: 'Francis Turretin',
    datas: '1623–1687',
    area: 'Ortodoxia Reformada',
    subtitulo: 'A Teologia Elênctica',
    descricao:
      'Teólogo genebrino e figura central da Escolástica Reformada do século XVII. Professor na Academia de Genebra, Turretin sistematizou a fé reformada em formato de Questões Disputadas (Quaestiones Disputatae), confrontando o catolicismo tridentino, o arminianismo, o socinianismo e o cartesianismo com método rigoroso e precisão doutrinária.',
    destaque: '"A teologia é um sistema doutrinal controverso, racionalmente ordenado e biblicamente fundado." — Institutio Theologiae Elencticae',
    tags: ['Ortodoxia Reformada', 'Escolástica', 'Teologia Sistemática', 'Século XVII', 'Genebra'],
    accentColor: '#818cf8',
    gradHero: 'linear-gradient(135deg, #0a0520 0%, #06061a 50%, #080416 100%)',
    gradOrb1: '#818cf8',
    gradOrb2: '#f59e0b',
    foto: FOTO_TURRETIN,
    IconFigura: ({ color }: { color: string }) => (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <rect x="8" y="16" width="20" height="30" rx="2.5" stroke={color} strokeWidth="1.8" fill={color + '12'} />
        <rect x="36" y="16" width="20" height="30" rx="2.5" stroke={color} strokeWidth="1.8" fill={color + '12'} />
        <line x1="32" y1="16" x2="32" y2="46" stroke={color} strokeWidth="2" />
        {[22, 27, 32, 38, 43].map(y => (
          <line key={y} x1="12" y1={y} x2="24" y2={y} stroke={color} strokeWidth="1.3" strokeOpacity="0.5" />
        ))}
        {[22, 27, 32, 38, 43].map(y => (
          <line key={y + 50} x1="40" y1={y} x2="52" y2={y} stroke={color} strokeWidth="1.3" strokeOpacity="0.5" />
        ))}
        <text x="32" y="10" textAnchor="middle" fontSize="8" fill={color} fontWeight="900">Q?</text>
        <line x1="32" y1="48" x2="32" y2="56" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="52" x2="36" y2="52" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <polygon points="32,48 29.5,52 34.5,52" fill={color} opacity="0.8" />
      </svg>
    ),
  },
  {
    slug: 'webster',
    nome: 'John Webster',
    datas: '1955–2016',
    area: 'Teologia Reformada',
    subtitulo: 'Teocentrismo Radical e a Escritura Santificada',
    descricao:
      'Teólogo sistemático anglicano e reformado, professor em Oxford, Aberdeen e St Andrews. Webster resgatou o teocentrismo na dogmática contemporânea ao inserir a bibliologia dentro da doutrina de Deus — invertendo a ordem moderna que começa pelo texto e pelo leitor.',
    destaque: '"A teologia é a disciplina de pensar depois de Deus — de seguir o movimento do seu ser, de sua obra e de seu falar." — Holy Scripture, 2003',
    tags: ['Teologia Reformada', 'Bibliologia', 'Teocentrismo', 'Século XX–XXI', 'Anglicano'],
    accentColor: '#34d399',
    gradHero: 'linear-gradient(135deg, #001a0e 0%, #00100a 50%, #04100c 100%)',
    gradOrb1: '#34d399',
    gradOrb2: '#60a5fa',
    foto: FOTO_WEBSTER,
    IconFigura: ({ color }: { color: string }) => (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <circle cx="32" cy="22" r="9" stroke={color} strokeWidth="1.8" fill={color + '15'} />
        <text x="32" y="26" textAnchor="middle" fontSize="9" fill={color} fontWeight="900">T</text>
        {[0,60,120,180,240,300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 32 + 12 * Math.cos(rad); const y1 = 22 + 12 * Math.sin(rad);
          const x2 = 32 + 19 * Math.cos(rad); const y2 = 22 + 19 * Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.4" strokeOpacity="0.55" strokeLinecap="round" />;
        })}
        <rect x="12" y="44" width="18" height="12" rx="2" stroke={color} strokeWidth="1.6" fill={color + '12'} />
        <rect x="34" y="44" width="18" height="12" rx="2" stroke={color} strokeWidth="1.6" fill={color + '12'} />
        <line x1="32" y1="44" x2="32" y2="56" stroke={color} strokeWidth="1.8" />
        <line x1="32" y1="38" x2="32" y2="42" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <polygon points="32,44 29.5,40 34.5,40" fill={color} opacity="0.8" />
      </svg>
    ),
  },
  {
    slug: 'plantinga',
    nome: 'Alvin Plantinga',
    datas: '1932 –',
    area: 'Epistemologia Reformada',
    subtitulo: 'A Garantia Epistêmica — Crença em Deus como Propriamente Básica',
    descricao:
      'O principal formulador da Epistemologia Reformada. Professor em Notre Dame, Plantinga desconstruiu a acusação iluminista de que a fé seria irracional, demonstrando que a crença em Deus é propriamente básica, garantida pelo Sensus Divinitatis e pela ação do Espírito Santo — e formulou a Defesa do Livre-Arbítrio contra o problema do mal.',
    destaque: '"A crença em Deus não precisa ser inferida de argumentos para ser racional — ela pode ser propriamente básica, assim como a crença no mundo externo." — Warranted Christian Belief',
    tags: ['Epistemologia Reformada', 'Filosofia Analítica', 'Warrant', 'Notre Dame', 'Século XX–XXI'],
    accentColor: '#38bdf8',
    gradHero: 'linear-gradient(135deg, #030e1c 0%, #020d1a 50%, #030f1e 100%)',
    gradOrb1: '#38bdf8',
    gradOrb2: '#a78bfa',
    foto: FOTO_PLANTINGA,
    IconFigura: ({ color }: { color: string }) => (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <circle cx="32" cy="26" r="10" stroke={color} strokeWidth="1.8" fill={color + '15'} />
        <text x="32" y="30" textAnchor="middle" fontSize="10" fill={color} fontWeight="900">?</text>
        <path d="M18 50 C18 40 26 36 32 36 C38 36 46 40 46 50" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <line x1="8" y1="18" x2="14" y2="22" stroke={color} strokeWidth="1.4" strokeOpacity="0.5" strokeLinecap="round" />
        <line x1="56" y1="18" x2="50" y2="22" stroke={color} strokeWidth="1.4" strokeOpacity="0.5" strokeLinecap="round" />
        <line x1="8" y1="30" x2="14" y2="29" stroke={color} strokeWidth="1.4" strokeOpacity="0.5" strokeLinecap="round" />
        <line x1="56" y1="30" x2="50" y2="29" stroke={color} strokeWidth="1.4" strokeOpacity="0.5" strokeLinecap="round" />
        <circle cx="32" cy="56" r="2.5" stroke={color} strokeWidth="1.4" fill={color + '30'} />
        <line x1="32" y1="50" x2="32" y2="53" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'bavinck',
    nome: 'Herman Bavinck',
    datas: '1854–1921',
    area: 'Neocalvinismo Holandês',
    subtitulo: 'A Dogmática Orgânica — Graça que Restaura a Natureza',
    descricao:
      'Um dos maiores teólogos dogmáticos do protestantismo, figura central do neocalvinismo holandês ao lado de Kuyper. Sua Dogmática Reformada (4 vols.) realiza uma síntese monumental entre ortodoxia reformada e modernidade — demonstrando que a graça não destrói a natureza, mas a restaura.',
    destaque: '"A graça não destrói a natureza — ela a restaura. A redenção recapitula e cura a criação, não a substitui." — Gereformeerde Dogmatiek',
    tags: ['Neocalvinismo', 'Dogmática', 'Modernidade', 'Holanda', 'Século XIX–XX'],
    accentColor: '#fb923c',
    gradHero: 'linear-gradient(135deg, #1a0800 0%, #0d0800 50%, #100a04 100%)',
    gradOrb1: '#fb923c',
    gradOrb2: '#34d399',
    foto: FOTO_BAVINCK,
    IconFigura: ({ color }: { color: string }) => (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <circle cx="32" cy="18" r="7" stroke={color} strokeWidth="1.8" fill={color + '15'} />
        <path d="M32 26 C20 30 16 40 20 52 L44 52 C48 40 44 30 32 26Z" stroke={color} strokeWidth="1.6" fill={color + '10'} strokeLinejoin="round" />
        <line x1="32" y1="32" x2="32" y2="46" stroke={color} strokeWidth="1.4" strokeOpacity="0.5" />
        <line x1="24" y1="38" x2="40" y2="38" stroke={color} strokeWidth="1.4" strokeOpacity="0.5" />
        <circle cx="32" cy="44" r="2.5" stroke={color} strokeWidth="1.4" fill={color + '30'} />
      </svg>
    ),
  },
  {
    slug: 'rutherford',
    nome: 'Samuel Rutherford',
    datas: '1600–1661',
    area: 'Escolástica Reformada',
    subtitulo: 'Arquitetura do Conhecimento, A Razão Serva e Lex, Rex',
    descricao:
      'Teólogo presbiteriano escocês, pastor de profunda piedade e delegado na Assembleia de Westminster. Autor do revolucionário Lex, Rex (1644) — que colocou a lei de Deus acima do monarca — e da Disputatio Scholastica de Divina Providentia. Construiu uma arquitetura do conhecimento teológico em que a Escritura é a fundação, a razão é serva, e nenhum rei está acima da lei de Deus. O livro foi queimado publicamente em 1660.',
    destaque: '"A verdade para com Cristo não pode ser traição a César." — Lex, Rex, 1644',
    tags: ['Westminster', 'Lex Rex', 'Escolástica', 'Providência', 'Filosofia Política'],
    accentColor: '#f97316',
    gradHero: 'linear-gradient(135deg, #1a0800 0%, #0d0400 50%, #080200 100%)',
    gradOrb1: '#f97316',
    gradOrb2: '#fbbf24',
    foto: FOTO_RUTHERFORD,
    IconFigura: ({ color }: { color: string }) => (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* coroa — lei acima do rei */}
        <path d="M12 38 L12 28 L20 34 L32 20 L44 34 L52 28 L52 38 Z" stroke={color} strokeWidth="1.8" fill={color + '14'} strokeLinejoin="round" />
        <rect x="12" y="38" width="40" height="8" rx="2" stroke={color} strokeWidth="1.6" fill={color + '10'} />
        {/* livro aberto abaixo */}
        <rect x="16" y="48" width="14" height="10" rx="1.5" stroke={color} strokeWidth="1.4" fill={color + '08'} />
        <rect x="34" y="48" width="14" height="10" rx="1.5" stroke={color} strokeWidth="1.4" fill={color + '08'} />
        <line x1="32" y1="48" x2="32" y2="58" stroke={color} strokeWidth="1.4" />
        {/* seta lei > rei */}
        <line x1="32" y1="8" x2="32" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
        <polygon points="32,8 29,14 35,14" fill={color} opacity="0.6" />
      </svg>
    ),
  },
  {
    slug: 'gillespie',
    nome: 'George Gillespie',
    datas: '1613–1648',
    area: 'Eclesiologia Reformada',
    subtitulo: 'Princípio Regulador, Liberdade de Consciência e Arquitetura da Verdade',
    descricao:
      'Teólogo presbiteriano escocês e figura proeminente da Assembleia de Westminster. Aos 24 anos escreveu contra a imposição de ritos anglicanos, formulando o Princípio Regulador do Culto. Em Aaron\'s Rod Blossoming defendeu o poder espiritual autônomo da Igreja contra o erastianismo. Morreu aos 35 anos, mas sua influência sobre a eclesiologia presbiteriana e a doutrina da boa e necessária consequência foi permanente.',
    destaque: '"A antiguidade deve ser examinada, não simplesmente obedecida." — A Dispute Against the English Popish Ceremonies, 1637',
    tags: ['Westminster', 'Eclesiologia', 'Princípio Regulador', 'Consciência', 'Século XVII'],
    accentColor: '#a78bfa',
    gradHero: 'linear-gradient(135deg, #0d0520 0%, #06061a 50%, #090418 100%)',
    gradOrb1: '#a78bfa',
    gradOrb2: '#f59e0b',
    foto: FOTO_GILLESPIE,
    IconFigura: ({ color }: { color: string }) => (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Igreja / frontão */}
        <path d="M12 48 L12 30 L32 16 L52 30 L52 48 Z" stroke={color} strokeWidth="1.8" fill={color + '10'} strokeLinejoin="round" />
        {/* cruz no topo */}
        <line x1="32" y1="8" x2="32" y2="16" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="28" y1="11" x2="36" y2="11" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        {/* porta */}
        <rect x="26" y="36" width="12" height="12" rx="6" stroke={color} strokeWidth="1.6" fill={color + '18'} />
        {/* chave / Palavra */}
        <circle cx="44" cy="26" r="4" stroke={color} strokeWidth="1.4" fill="none" strokeOpacity="0.6" />
        <line x1="48" y1="26" x2="54" y2="26" stroke={color} strokeWidth="1.4" strokeOpacity="0.6" strokeLinecap="round" />
        <line x1="52" y1="24" x2="52" y2="28" stroke={color} strokeWidth="1.2" strokeOpacity="0.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'mastricht',
    nome: 'Petrus van Mastricht',
    datas: '1630–1706',
    area: 'Ortodoxia Reformada',
    subtitulo: 'A Teologia Teórico-Prática',
    descricao:
      'Representante central da escolástica reformada pós-Reforma, Mastricht uniu precisão doutrinária e piedade prática em sua monumental Theoretico-Practica Theologia — uma obra que Jonathan Edwards considerou a maior de seu tempo.',
    destaque: '"Teologia é a doutrina de viver para Deus por meio de Cristo."',
    tags: ['Ortodoxia Reformada', 'Escolástica', 'Teologia Prática', 'Século XVII'],
    accentColor: '#2dd4bf',
    gradHero: 'linear-gradient(135deg, #001a18 0%, #00100e 50%, #05071a 100%)',
    gradOrb1: '#2dd4bf',
    gradOrb2: '#0ea5e9',
    foto: FOTO_MASTRICHT,
    IconFigura: IconMastricht,
  },
];

export default function BibliotecaAutoresPage() {
  return (
    <div className="min-h-screen relative">
      <Navbar />

      <section className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-10 text-[10px] font-black uppercase tracking-widest text-white/30"
          >
            <Link to="/biblioteca" className="hover:text-brand-blue transition-colors">Biblioteca</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/75">Autores-Teologos-Pastores-Pregadores-Escritores</span>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <p className="text-[10px] font-black tracking-[0.35em] uppercase text-[#2dd4bf] mb-3">
              Perfis Teológicos
            </p>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight mb-3">
              Autores-Teologos-Pastores-Pregadores-Escritores
            </h1>
            <p className="text-white/65 text-sm sm:text-base max-w-lg leading-relaxed">
              Perfis de teólogos, pregadores e escritores que moldaram a fé cristã — suas vidas, métodos e contribuições para a história da Igreja.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="flex flex-col gap-6">
            {AUTORES.map((a, i) => (
              <motion.div
                key={a.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
              >
                <Link
                  to={`/biblioteca/autores/${a.slug}`}
                  className="group block rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 hover:shadow-2xl hover:scale-[1.007] active:scale-[0.998] transition-all duration-300"
                  style={{ background: a.gradHero }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr]">

                    {/* Painel visual esquerdo — foto */}
                    <div
                      className="relative overflow-hidden min-h-[220px] sm:min-h-0"
                      style={{ borderRight: '1px solid rgba(255,255,255,0.07)', width: 'clamp(160px,22vw,220px)', flexShrink: 0 }}
                    >
                      {/* overlay gradiente para fundir com o fundo */}
                      <div className="absolute inset-0 z-10 pointer-events-none" style={{
                        background: `linear-gradient(to right, transparent 60%, rgba(0,16,14,0.70) 100%), linear-gradient(to top, rgba(0,16,14,0.75) 0%, transparent 40%)`,
                      }} />
                      {/* glow accent no topo */}
                      <div className="absolute inset-0 z-10 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                        style={{ background: `radial-gradient(ellipse at top center, ${a.gradOrb1} 0%, transparent 65%)` }} />

                      {a.foto ? (
                        <FotoComFallback
                          src={a.foto}
                          alt={`Retrato de ${a.nome}`}
                          accentColor={a.accentColor}
                          IconFigura={a.IconFigura}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ minHeight: 220 }}>
                          <a.IconFigura color={a.accentColor} />
                        </div>
                      )}

                      {/* badge datas sobre a foto */}
                      <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center">
                        <div className="px-3 py-1.5 rounded-full font-black text-[10px] tracking-widest backdrop-blur-sm"
                          style={{ color: a.accentColor, background: 'rgba(0,0,0,0.55)', border: `1px solid ${a.accentColor}40` }}>
                          {a.datas}
                        </div>
                      </div>
                    </div>

                    {/* Conteúdo direito */}
                    <div className="flex flex-col justify-between p-6 sm:p-8 gap-4">
                      <div>
                        {/* badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                            style={{ color: a.accentColor, background: a.accentColor + '15', border: `1px solid ${a.accentColor}28` }}>
                            <User className="w-2.5 h-2.5" />
                            {a.area}
                          </span>
                        </div>

                        {/* nome */}
                        <p className="text-[10px] font-black tracking-[0.28em] uppercase mb-1"
                          style={{ color: a.accentColor + 'aa' }}>{a.subtitulo}</p>
                        <h2 className="font-display font-black text-xl sm:text-2xl text-white leading-tight mb-3">
                          {a.nome}
                        </h2>

                        {/* descrição */}
                        <p className="text-white/72 text-sm leading-relaxed mb-4 line-clamp-3">
                          {a.descricao}
                        </p>

                        {/* destaque */}
                        <div className="rounded-xl border-l-4 px-4 py-3"
                          style={{ borderColor: a.accentColor, background: a.accentColor + '0d' }}>
                          <p className="text-sm font-bold italic leading-relaxed" style={{ color: a.accentColor + 'cc' }}>
                            {a.destaque}
                          </p>
                        </div>
                      </div>

                      {/* tags + CTA */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/6">
                        <div className="flex flex-wrap gap-1.5">
                          {a.tags.map(t => (
                            <span key={t} className="px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-white/55 border border-white/8">
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-all duration-200 group-hover:gap-3"
                          style={{ color: a.accentColor }}>
                          <BookOpen className="w-3.5 h-3.5" strokeWidth={2} />
                          Ver perfil
                          <ExternalLink className="w-3 h-3 -translate-x-1 group-hover:translate-x-0 transition-transform duration-200" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Voltar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-12">
            <Link to="/biblioteca" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs font-black uppercase tracking-widest transition-colors">
              ← Voltar para a Biblioteca
            </Link>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
