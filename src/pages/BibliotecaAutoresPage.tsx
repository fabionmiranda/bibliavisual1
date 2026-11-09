import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, User, BookOpen, ArrowRight, Search, X, Layers, Clock, Filter } from 'lucide-react';
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
const FOTO_RUTHERFORD  = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Samuel_Rutherford_St._Andrews.jpg';
const FOTO_TURRETIN  = 'https://commons.wikimedia.org/wiki/Special:FilePath/Francis_Turretin.jpg';
const FOTO_WEBSTER   = 'https://www.st-andrews.ac.uk/assets/university/schools/school-of-divinity/images/news/john-webster.jpg';
const FOTO_BAVINCK    = 'https://commons.wikimedia.org/wiki/Special:FilePath/HermanBavinckBig.jpg';
const FOTO_PLANTINGA  = 'https://commons.wikimedia.org/wiki/Special:FilePath/Alvin_Plantinga.jpg';
const FOTO_NEWMAN     = 'https://commons.wikimedia.org/wiki/Special:FilePath/John_Henry_Newman_by_Sir_John_Everett_Millais,_1st_Bt.jpg';

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
    slug: 'newman',
    nome: 'John Henry Newman',
    datas: '1801–1890',
    area: 'Teologia Histórica',
    subtitulo: 'O Desenvolvimento da Doutrina e o Problema da Identidade',
    descricao:
      'Líder do Movimento de Oxford, convertido ao catolicismo romano em 1845 e feito cardeal em 1879. Em seu Ensaio sobre o Desenvolvimento da Doutrina Cristã perguntou como a doutrina pode mudar de vocabulário sem deixar de ser a mesma — e propôs sete notas para distinguir desenvolvimento autêntico de corrupção. A tradição reformada acolhe a pergunta, mas responde com a Escritura como norma normans.',
    destaque: '"Aqui embaixo, viver é mudar, e ser perfeito é ter mudado muitas vezes." — Essay on Development, 1845',
    tags: ['Desenvolvimento Doutrinário', 'Movimento de Oxford', 'Tradição', 'Norma Normans', 'Século XIX'],
    accentColor: '#f43f5e',
    gradHero: 'linear-gradient(135deg, #1a0510 0%, #10040a 50%, #080206 100%)',
    gradOrb1: '#f43f5e',
    gradOrb2: '#fbbf24',
    foto: FOTO_NEWMAN,
    IconFigura: ({ color }: { color: string }) => (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* semente → árvore */}
        <ellipse cx="14" cy="50" rx="5" ry="6" stroke={color} strokeWidth="1.6" fill={color + '18'} />
        <path d="M24 52 L40 52" stroke={color} strokeWidth="1.4" strokeOpacity="0.5" strokeDasharray="2 2" />
        <polygon points="40,52 36,49.5 36,54.5" fill={color} opacity="0.6" />
        <line x1="50" y1="56" x2="50" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="24" r="11" stroke={color} strokeWidth="1.8" fill={color + '14'} />
        <circle cx="42" cy="30" r="6" stroke={color} strokeWidth="1.4" fill={color + '10'} />
        <circle cx="58" cy="30" r="5" stroke={color} strokeWidth="1.4" fill={color + '10'} />
        <line x1="14" y1="8" x2="14" y2="18" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
        <line x1="10" y1="12" x2="18" y2="12" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
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

type Autor = (typeof AUTORES)[number];

// Coleções (estudos comparativos) ficam separadas dos perfis individuais
const COLECOES = new Set(['batistas-presbiterianos', 'reformadores']);

// Anos de vida para a linha do tempo e para a ordem cronológica (null = vivo)
const ANOS: Record<string, [number, number | null]> = {
  rutherford: [1600, 1661],
  gillespie: [1613, 1648],
  turretin: [1623, 1687],
  mastricht: [1630, 1706],
  newman: [1801, 1890],
  bavinck: [1854, 1921],
  plantinga: [1932, null],
  webster: [1955, 2016],
};

const ERAS = [
  { id: 'todos',     label: 'Todos',              desc: 'Todos os perfis e coleções' },
  { id: 'colecoes',  label: 'Coleções',           desc: 'Estudos comparativos com vários autores' },
  { id: 'xvii',      label: 'Séc. XVII',          desc: 'Ortodoxia reformada e Westminster' },
  { id: 'xix',       label: 'Séc. XIX',           desc: 'Movimento de Oxford e neocalvinismo' },
  { id: 'xx',        label: 'Séc. XX–XXI',        desc: 'Teologia e filosofia contemporâneas' },
] as const;
type Era = (typeof ERAS)[number]['id'];

function eraDe(a: Autor): Exclude<Era, 'todos'> {
  if (COLECOES.has(a.slug)) return 'colecoes';
  const ini = ANOS[a.slug]?.[0] ?? 1600;
  return ini < 1750 ? 'xvii' : ini < 1900 ? 'xix' : 'xx';
}
const ROTULO_ERA: Record<Exclude<Era, 'todos'>, string> = {
  colecoes: 'Coleção', xvii: 'Século XVII', xix: 'Século XIX', xx: 'Séc. XX–XXI',
};

// Normaliza para busca: minúsculas e sem acentos
const normalizar = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const INDICE_BUSCA = new Map(AUTORES.map(a => [
  a.slug,
  normalizar([a.nome, a.datas, a.area, a.subtitulo, a.descricao, a.destaque, ...a.tags].join(' ')),
]));

const PERFIS = AUTORES.filter(a => !COLECOES.has(a.slug))
  .sort((a, b) => (ANOS[a.slug]?.[0] ?? 0) - (ANOS[b.slug]?.[0] ?? 0));
const COLS = AUTORES.filter(a => COLECOES.has(a.slug));

const ANO_ATUAL = new Date().getFullYear();
const T_INI = 1590, T_FIM = 2030;
const pct = (ano: number) => ((ano - T_INI) / (T_FIM - T_INI)) * 100;

function irPara(slug: string) {
  document.getElementById(`autor-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ─── Linha do tempo: cada autor como uma barra de vida ───────────────────────
function LinhaDoTempo({ visiveis }: { visiveis: Set<string> }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-4 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
        <h2 className="text-white font-black text-base sm:text-lg">Quatro séculos em uma linha</h2>
        <span className="text-[11px] text-white/45">Toque em um nome para ir ao perfil</span>
      </div>
      <p className="text-white/55 text-xs sm:text-sm mb-5 leading-relaxed">
        Cada barra mostra o tempo de vida do autor. Veja quem foi contemporâneo de quem — e os grandes intervalos entre as tradições.
      </p>

      <div className="relative">
        {/* grade dos séculos */}
        <div className="absolute inset-0 ml-0 sm:ml-[140px] pointer-events-none">
          {[1600, 1700, 1800, 1900, 2000].map(s => (
            <div key={s} className="absolute top-0 bottom-6 border-l border-dashed border-white/10" style={{ left: `${pct(s)}%` }}>
              <span className="absolute -bottom-6 -translate-x-1/2 text-[10px] font-bold text-white/35 tabular-nums">{s}</span>
            </div>
          ))}
        </div>

        <ul className="relative flex flex-col gap-2 pb-7">
          {PERFIS.map(a => {
            const [ini, fim] = ANOS[a.slug];
            const ate = fim ?? ANO_ATUAL;
            const ativo = visiveis.has(a.slug);
            return (
              <li key={a.slug} className="sm:flex sm:items-center">
                <button type="button" onClick={() => irPara(a.slug)} disabled={!ativo}
                  className="text-left sm:w-[140px] sm:shrink-0 sm:pr-3 text-[11px] sm:text-xs font-bold truncate transition-colors disabled:cursor-default"
                  style={{ color: ativo ? a.accentColor : 'rgba(255,255,255,0.25)' }}>
                  {a.nome}
                </button>
                <div className="relative h-6 sm:flex-1">
                  <button type="button" onClick={() => irPara(a.slug)} disabled={!ativo}
                    aria-label={`${a.nome}, ${ini} a ${fim ?? 'hoje'}`}
                    title={`${a.nome} · ${ini}–${fim ?? 'hoje'}`}
                    className="absolute top-1 h-4 rounded-full transition-all hover:brightness-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:cursor-default"
                    style={{
                      left: `${pct(ini)}%`, width: `${Math.max(pct(ate) - pct(ini), 1.5)}%`,
                      background: ativo ? `linear-gradient(90deg, ${a.accentColor}cc, ${a.accentColor}66)` : 'rgba(255,255,255,0.08)',
                      boxShadow: ativo ? `0 0 14px ${a.accentColor}40` : 'none',
                    }} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// ─── Card de perfil individual ───────────────────────────────────────────────
function CardPerfil({ a }: { a: Autor }) {
  const era = eraDe(a);
  return (
    <Link
      to={`/biblioteca/autores/${a.slug}`}
      id={`autor-${a.slug}`}
      className="group h-full flex flex-col rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 transition-all duration-300 scroll-mt-40"
      style={{ background: a.gradHero, outlineColor: a.accentColor }}
    >
      {/* retrato */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
          {a.foto ? (
            <FotoComFallback src={a.foto} alt={`Retrato de ${a.nome}`} accentColor={a.accentColor} IconFigura={a.IconFigura} />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-12"><a.IconFigura color={a.accentColor} /></div>
          )}
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(6,6,26,0.95) 0%, rgba(6,6,26,0.35) 45%, transparent 75%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-25 group-hover:opacity-40 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse at top right, ${a.gradOrb1} 0%, transparent 60%)` }} />

        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md"
          style={{ color: '#fff', background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.15)' }}>
          {ROTULO_ERA[era]}
        </span>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-xs font-black tabular-nums mb-1" style={{ color: a.accentColor }}>{a.datas}</p>
          <h3 className="text-white font-black text-2xl leading-tight">{a.nome}</h3>
        </div>
      </div>

      {/* conteúdo */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 gap-4">
        <div className="flex items-start gap-2">
          <span className="shrink-0 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ color: a.accentColor, background: a.accentColor + '18', border: `1px solid ${a.accentColor}33` }}>
            <User className="w-3 h-3" />
            {a.area}
          </span>
        </div>

        <p className="text-sm font-bold leading-snug" style={{ color: a.accentColor + 'dd' }}>{a.subtitulo}</p>

        <p className="text-white/70 text-sm leading-relaxed line-clamp-4">{a.descricao}</p>

        <blockquote className="rounded-xl border-l-[3px] px-4 py-3 text-[13px] italic leading-relaxed"
          style={{ borderColor: a.accentColor, background: a.accentColor + '0f', color: 'rgba(255,255,255,0.80)' }}>
          <span className="line-clamp-3">{a.destaque}</span>
        </blockquote>

        <div className="mt-auto pt-4 border-t border-white/[0.07] flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {a.tags.slice(0, 3).map(t => (
              <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-semibold text-white/55 bg-white/[0.05]">{t}</span>
            ))}
          </div>
          <span className="shrink-0 inline-flex items-center gap-1.5 text-xs font-black transition-all duration-200 group-hover:gap-2.5"
            style={{ color: a.accentColor }}>
            Ver perfil <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Card de coleção (estudo com vários autores) ─────────────────────────────
function CardColecao({ a }: { a: Autor }) {
  return (
    <Link
      to={`/biblioteca/autores/${a.slug}`}
      id={`autor-${a.slug}`}
      className="group h-full flex flex-col sm:flex-row gap-5 rounded-3xl p-5 sm:p-6 border border-white/10 hover:border-white/25 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 transition-all duration-300 scroll-mt-40"
      style={{ background: a.gradHero, outlineColor: a.accentColor }}
    >
      <div className="shrink-0 w-20 h-20 rounded-2xl p-3 transition-transform duration-500 group-hover:scale-105"
        style={{ background: a.accentColor + '14', border: `1px solid ${a.accentColor}33` }}>
        <a.IconFigura color={a.accentColor} />
      </div>
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ color: a.accentColor, background: a.accentColor + '18', border: `1px solid ${a.accentColor}33` }}>
            {a.area}
          </span>
          <span className="text-[11px] font-bold text-white/45 tabular-nums">{a.datas}</span>
        </div>
        <h3 className="text-white font-black text-lg sm:text-xl leading-tight mb-1">{a.nome}</h3>
        <p className="text-xs font-bold mb-2" style={{ color: a.accentColor + 'cc' }}>{a.subtitulo}</p>
        <p className="text-white/65 text-sm leading-relaxed line-clamp-3 mb-4">{a.descricao}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-black transition-all duration-200 group-hover:gap-2.5"
          style={{ color: a.accentColor }}>
          Abrir coleção <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

function TituloSecao({ icone: Icone, titulo, desc, total }: {
  icone: typeof Layers; titulo: string; desc: string; total: number;
}) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-[#2dd4bf]/10 border border-[#2dd4bf]/25">
        <Icone className="w-4 h-4 text-[#2dd4bf]" />
      </div>
      <div>
        <h2 className="text-white font-black text-lg sm:text-xl leading-tight">
          {titulo} <span className="text-white/35 font-bold text-sm tabular-nums">({total})</span>
        </h2>
        <p className="text-white/50 text-xs sm:text-sm mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

export default function BibliotecaAutoresPage() {
  const [busca, setBusca] = React.useState('');
  const [era, setEra] = React.useState<Era>('todos');
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Atalho "/" foca a busca
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const alvo = e.target as HTMLElement;
      if (e.key === '/' && alvo.tagName !== 'INPUT' && alvo.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const termos = normalizar(busca).split(/\s+/).filter(Boolean);
  const passa = (a: Autor) =>
    (era === 'todos' || eraDe(a) === era) &&
    termos.every(t => INDICE_BUSCA.get(a.slug)!.includes(t));

  const perfis = PERFIS.filter(passa);
  const colecoes = COLS.filter(passa);
  const total = perfis.length + colecoes.length;
  const visiveis = new Set(perfis.map(a => a.slug));
  const filtrando = busca !== '' || era !== 'todos';
  const contagem = (id: Era) => id === 'todos' ? AUTORES.length : AUTORES.filter(a => eraDe(a) === id).length;
  const limpar = () => { setBusca(''); setEra('todos'); };

  return (
    <div className="min-h-screen relative">
      <Navbar />

      <section className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumb */}
          <motion.nav aria-label="Trilha" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-8 text-[11px] font-black uppercase tracking-widest text-white/35">
            <Link to="/biblioteca" className="hover:text-[#2dd4bf] transition-colors">Biblioteca</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/75">Autores</span>
          </motion.nav>

          {/* Header */}
          <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10 grid lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <p className="text-[11px] font-black tracking-[0.3em] uppercase text-[#2dd4bf] mb-3">Perfis Teológicos</p>
              <h1 className="font-black text-4xl sm:text-5xl text-white leading-[1.05] mb-4">
                Autores
                <span className="block text-xl sm:text-2xl font-bold text-white/55 mt-2">Teólogos · Pastores · Pregadores · Escritores</span>
              </h1>
              <p className="text-white/65 text-base sm:text-lg max-w-2xl leading-relaxed">
                Vidas, métodos e contribuições de quem moldou a fé cristã. Cada perfil explica as ideias centrais do autor com diagramas, citações e notas para aprofundar.
              </p>
            </div>
            <dl className="grid grid-cols-3 gap-3 lg:w-[360px]">
              {[
                { n: PERFIS.length, l: 'Perfis' },
                { n: COLS.length, l: 'Coleções' },
                { n: '4', l: 'Séculos' },
              ].map(s => (
                <div key={s.l} className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4 text-center">
                  <dt className="sr-only">{s.l}</dt>
                  <dd className="text-2xl sm:text-3xl font-black text-white tabular-nums">{s.n}</dd>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/45 mt-1">{s.l}</p>
                </div>
              ))}
            </dl>
          </motion.header>

          {/* Como usar */}
          <motion.ol initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="grid sm:grid-cols-3 gap-3 mb-10">
            {[
              { icone: Clock, t: 'Situe no tempo', d: 'Use a linha do tempo para ver a época de cada autor.' },
              { icone: Filter, t: 'Filtre ou busque', d: 'Escolha um século ou procure por tema, obra ou tag.' },
              { icone: BookOpen, t: 'Estude o perfil', d: 'Cada página traz eixos do pensamento, obras e notas.' },
            ].map((p, i) => (
              <li key={p.t} className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
                <span className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-[#06061a] bg-[#2dd4bf]">{i + 1}</span>
                <div>
                  <p className="text-white font-bold text-sm flex items-center gap-1.5"><p.icone className="w-3.5 h-3.5 text-[#2dd4bf]" />{p.t}</p>
                  <p className="text-white/55 text-xs leading-relaxed mt-0.5">{p.d}</p>
                </div>
              </li>
            ))}
          </motion.ol>

          {/* Linha do tempo */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10">
            <LinhaDoTempo visiveis={visiveis} />
          </motion.div>

          {/* Busca + filtros (a barra de busca fica fixa ao rolar) */}
          <div className="sticky top-20 z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-2 mb-3">
            <div className="relative rounded-2xl border border-white/12 bg-[#06061a]/90 backdrop-blur-md shadow-lg shadow-black/30 focus-within:border-[#2dd4bf]/60 transition-colors">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              <input
                ref={inputRef}
                type="search"
                value={busca}
                onChange={e => setBusca(e.target.value)}
                onKeyDown={e => { if (e.key === 'Escape') setBusca(''); }}
                placeholder="Buscar autor, tema, obra ou tag…"
                aria-label="Buscar autores"
                className="w-full bg-transparent pl-11 pr-14 py-3.5 text-base text-white placeholder:text-white/35 outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                {busca ? (
                  <button type="button" onClick={() => { setBusca(''); inputRef.current?.focus(); }}
                    aria-label="Limpar busca" className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-block px-2 py-0.5 rounded-md border border-white/15 text-[10px] font-black text-white/40">/</kbd>
                )}
              </div>
            </div>
          </div>

          <div role="tablist" aria-label="Filtrar por época"
            className="flex gap-2 overflow-x-auto pb-2 mb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {ERAS.map(e => {
              const ativo = era === e.id;
              return (
                <button key={e.id} type="button" role="tab" aria-selected={ativo} title={e.desc}
                  onClick={() => setEra(e.id)}
                  className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                    ativo ? 'bg-[#2dd4bf] text-[#06061a] border-[#2dd4bf]' : 'text-white/65 border-white/12 hover:border-white/30 hover:text-white'
                  }`}>
                  {e.label}
                  <span className={`tabular-nums text-[10px] px-1.5 rounded-full ${ativo ? 'bg-black/15' : 'bg-white/10'}`}>{contagem(e.id)}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-3 mb-8 min-h-[24px]" aria-live="polite">
            <p className="text-xs font-semibold text-white/45">
              {filtrando
                ? <>{total} {total === 1 ? 'resultado' : 'resultados'}{busca && <> para “<span className="text-white/75">{busca}</span>”</>}</>
                : <>Ordenados cronologicamente, do mais antigo ao mais recente.</>}
            </p>
            {filtrando && (
              <button type="button" onClick={limpar}
                className="text-xs font-black text-[#2dd4bf] hover:text-white transition-colors">
                Limpar filtros
              </button>
            )}
          </div>

          {total === 0 && (
            <div className="rounded-3xl border border-dashed border-white/12 p-10 text-center">
              <p className="text-white/70 text-sm mb-3">Nenhum autor encontrado{busca && <> para “{busca}”</>}.</p>
              <button type="button" onClick={limpar}
                className="text-xs font-black uppercase tracking-widest text-[#2dd4bf] hover:text-white transition-colors">
                Limpar filtros
              </button>
            </div>
          )}

          {/* Perfis individuais */}
          {perfis.length > 0 && (
            <section className="mb-14">
              <TituloSecao icone={User} titulo="Perfis de autores" desc="Um autor por página: vida, método e contribuições." total={perfis.length} />
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                {perfis.map((a, i) => (
                  <motion.div key={a.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }} transition={{ delay: (i % 3) * 0.06 }}>
                    <CardPerfil a={a} />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Coleções */}
          {colecoes.length > 0 && (
            <section className="mb-6">
              <TituloSecao icone={Layers} titulo="Coleções e estudos comparativos" desc="Vários autores lado a lado, organizados por tradição e época." total={colecoes.length} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                {colecoes.map(a => (
                  <motion.div key={a.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}>
                    <CardColecao a={a} />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Voltar */}
          <div className="mt-12">
            <Link to="/biblioteca" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs font-black uppercase tracking-widest transition-colors">
              ← Voltar para a Biblioteca
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
