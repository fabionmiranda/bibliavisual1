import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap, BookOpen, Users, Church,
  ChevronRight, ChevronDown, Lightbulb, MessageSquare,
  BookMarked, Layers, Star, Brain, Target, Zap, BookCheck,
  Sparkles, Library,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FlagToggle from '../components/FlagToggle';

// ─── Design tokens ──────────────────────────────────────────────
const C = {
  bg:     '#050714',
  card:   'rgba(255,255,255,0.04)',
  cardH:  'rgba(255,255,255,0.07)',
  border: 'rgba(255,255,255,0.09)',
  blue:   'rgba(0,212,255,1)',
  blueL:  'rgba(0,212,255,0.12)',
  blueB:  'rgba(0,212,255,0.30)',
  green:  'rgba(0,229,160,1)',
  greenL: 'rgba(0,229,160,0.10)',
  gold:   'rgba(245,200,66,1)',
  goldL:  'rgba(245,200,66,0.10)',
  rose:   'rgba(255,58,110,1)',
  roseL:  'rgba(255,58,110,0.10)',
  purple: 'rgba(167,139,250,1)',
  purpleL:'rgba(167,139,250,0.10)',
  white:  'rgba(255,255,255,0.92)',
  muted:  'rgba(255,255,255,0.45)',
  atColor:'rgba(255,180,50,1)',
};

// ─── Helpers ────────────────────────────────────────────────────
function livroPath(slug: string, testamento: 'AT' | 'NT') {
  return `/admin/${testamento}/${slug}`;
}

interface Pericope { idx: number; titulo: string; ref: string; }

function parsePericopes(text: string): Pericope[] {
  const list: Pericope[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    const m = line.match(/^\[(\d+)\]\s+(.+?)(?:\s+[—–-]\s+(.+))?$/);
    if (m) list.push({ idx: parseInt(m[1], 10), titulo: m[2].trim(), ref: (m[3] ?? '').trim() });
  }
  return list;
}

// ─── Data ───────────────────────────────────────────────────────

/* ── SVG icons for each educator ─────────────────────────────── */
const IconGregory = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="4" y="6" width="28" height="24" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none"/>
    <line x1="9" y1="12" x2="27" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="9" y1="16" x2="27" y2="16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="9" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <text x="18" y="29" textAnchor="middle" fontSize="7" fontWeight="900" fill="currentColor" fontFamily="serif">VII</text>
  </svg>
);
const IconGaebelein = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="13" stroke="currentColor" strokeWidth="1.6" fill="none"/>
    <line x1="18" y1="5" x2="18" y2="31" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="5" y1="18" x2="31" y2="18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M12 11 L18 5 L24 11" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="18" cy="18" r="3" fill="currentColor" opacity="0.7"/>
  </svg>
);
const IconLeBar = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="1.6" fill="none"/>
    <circle cx="24" cy="10" r="4" stroke="currentColor" strokeWidth="1.6" fill="none"/>
    <path d="M6 28 C6 22 10 19 12 19 C14 19 16 20 18 20 C20 20 22 19 24 19 C26 19 30 22 30 28" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
    <path d="M15 14 L18 17 L21 14" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconSmith = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M18 28 C18 28 7 21 7 14 C7 10.1 10.1 7 14 7 C16 7 17.6 8 18 9 C18.4 8 20 7 22 7 C25.9 7 29 10.1 29 14 C29 21 18 28 18 28Z" stroke="currentColor" strokeWidth="1.7" fill="none"/>
    <path d="M13 18 L13 24 M18 15 L18 24 M23 18 L23 24" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6"/>
  </svg>
);
const IconBavinck = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <line x1="18" y1="30" x2="18" y2="8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M18 8 C18 8 10 13 10 19" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    <path d="M18 8 C18 8 26 13 26 19" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    <path d="M18 14 C18 14 12 18 12 22" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7"/>
    <path d="M18 14 C18 14 24 18 24 22" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7"/>
    <circle cx="18" cy="7" r="2.5" fill="currentColor" opacity="0.8"/>
  </svg>
);
const IconWolterstorff = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M18 8 C14 8 8 11 8 16 C8 23 18 29 18 29 C18 29 28 23 28 16 C28 11 22 8 18 8Z" stroke="currentColor" strokeWidth="1.6" fill="none"/>
    <path d="M13 16 L16 19 L23 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconLopes = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="6" y="7" width="24" height="22" rx="2" stroke="currentColor" strokeWidth="1.7" fill="none"/>
    <line x1="18" y1="7" x2="18" y2="29" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M6 14 L18 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
    <path d="M18 14 L30 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
    <path d="M6 20 L18 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    <path d="M18 20 L30 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    <circle cx="18" cy="4" r="2" fill="currentColor"/>
    <line x1="18" y1="6" x2="18" y2="7" stroke="currentColor" strokeWidth="1.4"/>
  </svg>
);

const AUTORES_EDUCACAO = [
  {
    cor: C.blue,
    nome: 'John Milton Gregory',
    obra: 'The Seven Laws of Teaching (1884)',
    pais: '🇺🇸 EUA',
    periodo: '1822–1898',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/John_Milton_Gregory.jpg/320px-John_Milton_Gregory.jpg',
    icone: <IconGregory />,
    iconeLabel: '7 Leis',
    citacao: '"O professor é aquele que desperta no aluno a mesma paixão que arde em si mesmo pelo conhecimento."',
    descricao: 'Clássico absoluto da educação cristã reformada. Gregory estabelece leis imutáveis do ensino — excitar o interesse, provocar o pensamento, ligar o novo ao conhecido. Base para o método expositivo-socrático aplicado à Bíblia.',
    metodos: ['Despertar intelectual', 'Aprendizado por descoberta', 'Ensino dialogado'],
    abnt: [
      'GREGORY, John Milton. The Seven Laws of Teaching. Boston: Pilgrim Press, 1884.',
      'GREGORY, John Milton. The Seven Laws of Teaching. Rev. ed. Grand Rapids: Baker Book House, 1954.',
    ],
  },
  {
    cor: C.gold,
    nome: 'Frank E. Gaebelein',
    obra: 'The Pattern of God\'s Truth (1954)',
    pais: '🇺🇸 EUA',
    periodo: '1905–1983',
    foto: null,
    icone: <IconGaebelein />,
    iconeLabel: 'Verdade Integrada',
    citacao: '"Toda a verdade é a verdade de Deus. A integração entre fé e aprendizagem não é opcional — é o próprio coração da educação cristã."',
    descricao: 'Gaebelein articula que o currículo cristão integra todas as disciplinas sob a soberania de Deus. A análise literária da Bíblia é, para ele, a mais alta forma de educação integrada.',
    metodos: ['Integração fé-aprendizagem', 'Currículo bíblio-centrado', 'Educação integral'],
    abnt: [
      'GAEBELEIN, Frank E. The Pattern of God\'s Truth: Problems of Integration in Christian Education. New York: Oxford University Press, 1954.',
      'GAEBELEIN, Frank E. The Christian, the Arts, and Truth: Regaining the Vision of Greatness. Portland: Multnomah Press, 1985.',
    ],
  },
  {
    cor: C.green,
    nome: 'Lois E. LeBar',
    obra: 'Education That Is Christian (1958)',
    pais: '🇺🇸 EUA',
    periodo: '1907–1994',
    foto: null,
    icone: <IconLeBar />,
    iconeLabel: 'Relação & Transformação',
    citacao: '"O objetivo da educação cristã é relacionamento — com Deus e com as pessoas. Informação sem transformação não é educação bíblica."',
    descricao: 'LeBar revolucionou o ensino bíblico ao propor método indutivo centrado no aluno. Seu modelo — observação → interpretação → aplicação — é fundação do estudo bíblico ativo e participativo.',
    metodos: ['Método indutivo', 'Ensino centrado no aluno', 'Transformação relacional'],
    abnt: [
      'LEBAR, Lois E. Education That Is Christian. Old Tappan: Fleming H. Revell, 1958.',
      'LEBAR, Lois E. Focus on People in Church Education. Old Tappan: Fleming H. Revell, 1968.',
    ],
  },
  {
    cor: C.purple,
    nome: 'James K. A. Smith',
    obra: 'Desiring the Kingdom (2009)',
    pais: '🇨🇦 Canadá',
    periodo: '1970–',
    foto: null,
    icone: <IconSmith />,
    iconeLabel: 'Liturgia Formativa',
    citacao: '"Somos primariamente seres de desejo, não de cognição. Educar é formar os amores — não apenas encher cabeças com verdades corretas."',
    descricao: 'Smith (Calvin University) propõe uma pedagogia das práticas formativas. O culto, a liturgia e os rituais de aprendizagem formam o caráter antes que a mente compreenda. O ensino bíblico deve ser prática corporal e comunitária.',
    metodos: ['Pedagogia das práticas', 'Liturgias formativas', 'Formação do desejo'],
    abnt: [
      'SMITH, James K. A. Desiring the Kingdom: Worship, Worldview, and Cultural Formation. Grand Rapids: Baker Academic, 2009. (Cultural Liturgies, v. 1).',
      'SMITH, James K. A. Imagining the Kingdom: How Worship Works. Grand Rapids: Baker Academic, 2013. (Cultural Liturgies, v. 2).',
      'SMITH, James K. A. You Are What You Love: The Spiritual Power of Habit. Grand Rapids: Brazos Press, 2016.',
    ],
  },
  {
    cor: C.rose,
    nome: 'Herman Bavinck',
    obra: 'Pedagogia Cristã (Christelijke Paedagogiek, 1904)',
    pais: '🇳🇱 Holanda',
    periodo: '1854–1921',
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Hbavinck.jpg/320px-Hbavinck.jpg',
    icone: <IconBavinck />,
    iconeLabel: 'Imago Dei',
    citacao: '"A educação cristã não é um departamento da vida — é a própria vida cristã ensinada às gerações que seguem."',
    descricao: 'O grande teólogo reformado holandês fundamentou a pedagogia na doutrina da imago Dei. Educar é restaurar a imagem de Deus no ser humano. A Bíblia não é livro didático — é a narrativa de uma redenção que o aluno deve habitar.',
    metodos: ['Imago Dei como base', 'Narrativa redentora', 'Tradição teológica reformada'],
    abnt: [
      'BAVINCK, Herman. Christelijke Paedagogiek. Kampen: J. H. Kok, 1904.',
      'BAVINCK, Herman. Essays on Religion, Science, and Society. Ed. John Bolt. Grand Rapids: Baker Academic, 2008.',
      'BAVINCK, Herman. Reformed Dogmatics. Ed. John Bolt. Trad. John Vriend. Grand Rapids: Baker Academic, 2003-2008. 4 v.',
    ],
  },
  {
    cor: C.blue,
    nome: 'Nicholas Wolterstorff',
    obra: 'Educating for Shalom (2004)',
    pais: '🇺🇸 EUA / Yale',
    periodo: '1932–',
    foto: null,
    icone: <IconWolterstorff />,
    iconeLabel: 'Shalom & Justiça',
    citacao: '"O objetivo da educação cristã é shalom — o florescimento de toda a criação. Educar para a justiça é inseparável de educar para a fé."',
    descricao: 'Wolterstorff (Yale) expandiu a visão educacional reformada para incluir shalom social. Educar para viver na aliança inclui análise crítica, compaixão e responsabilidade diante das Escrituras.',
    metodos: ['Educação para shalom', 'Análise crítica', 'Ética da aliança'],
    abnt: [
      'WOLTERSTORFF, Nicholas. Educating for Shalom: Essays on Christian Higher Education. Ed. Clarence W. Joldersma; Gloria Goris Stronks. Grand Rapids: Eerdmans, 2004.',
      'WOLTERSTORFF, Nicholas. Reason Within the Bounds of Religion. 2. ed. Grand Rapids: Eerdmans, 1984.',
      'WOLTERSTORFF, Nicholas. Until Justice and Peace Embrace. Grand Rapids: Eerdmans, 1983.',
    ],
  },
  {
    cor: C.gold,
    nome: 'Augustus Nicodemus Lopes',
    obra: 'A Bíblia e Sua Interpretação (2004)',
    pais: '🇧🇷 Brasil',
    periodo: '1955–',
    foto: null,
    icone: <IconLopes />,
    iconeLabel: 'Exegese Expositiva',
    citacao: '"O pregador fiel ao texto é aquele que deixa a estrutura do texto moldar a estrutura do seu sermão."',
    descricao: 'Teólogo e educador reformado brasileiro. Lopes fundamenta o ensino bíblico na exegese gramatical-histórica e na pregação expositiva. Sua metodologia une rigor acadêmico e aplicação pastoral no contexto lusófono.',
    metodos: ['Exegese gramatical-histórica', 'Pregação expositiva', 'Hermenêutica reformada'],
    abnt: [
      'LOPES, Augustus Nicodemus. A Bíblia e Sua Interpretação. São Paulo: Editora Cultura Cristã, 2004.',
      'LOPES, Augustus Nicodemus. O Que É Hermenêutica? São Paulo: Editora Cultura Cristã, 2011.',
      'LOPES, Augustus Nicodemus. Como Pregar a Bíblia com Fidelidade. São Paulo: Editora Cultura Cristã, 2017.',
    ],
  },
];

interface Metodologia {
  icon: React.ReactNode;
  cor: string;
  titulo: string;
  subtitulo: string;
  desc: string;
  aplicacao: string;
  abnt: string[];
  publico?: 'homens' | 'mulheres' | 'jovens';
}

const METODOLOGIAS_ATIVAS: Metodologia[] = [
  // ── Metodologias Gerais ──────────────────────────────────────
  {
    icon: <MessageSquare className="w-5 h-5" />,
    cor: C.blue,
    titulo: 'Método Socrático',
    subtitulo: 'Perguntas que geram descoberta',
    desc: 'Em vez de transmitir respostas, o educador formula perguntas progressivas que conduzem o aluno à descoberta do texto. Aplicado à Bíblia: "Qual é o centro desta estrutura? O que o autor destaca ao repetir este elemento?"',
    aplicacao: 'Ideal para grupos de estudo, EBD e culto familiar — cria envolvimento ativo e memorização profunda.',
    abnt: [
      'GREGORY, John Milton. The Seven Laws of Teaching. Boston: Pilgrim Press, 1884.',
      'LEBAR, Lois E. Education That Is Christian. Old Tappan: Fleming H. Revell, 1958.',
    ],
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    cor: C.green,
    titulo: 'Estudo Bíblico Indutivo',
    subtitulo: 'Observar → Interpretar → Aplicar',
    desc: 'Método desenvolvido por Howard Hendricks e popularizado pela Navigators/BSF. O aluno parte do texto bruto — observa o que diz, interpreta o que significa, aplica o que transforma. A estrutura quiástica é ferramenta poderosa na fase de observação.',
    aplicacao: 'Excelente para pequenos grupos, células e estudos pessoais — o diagrama quiástico fornece o mapa visual para a fase de observação.',
    abnt: [
      'HENDRICKS, Howard G.; HENDRICKS, William D. Living by the Book: The Art and Science of Reading the Bible. Chicago: Moody Publishers, 1991.',
      'LEBAR, Lois E. Education That Is Christian. Old Tappan: Fleming H. Revell, 1958.',
    ],
  },
  {
    icon: <Layers className="w-5 h-5" />,
    cor: C.gold,
    titulo: 'Análise Quiástica como Metodologia Ativa',
    subtitulo: 'A estrutura do texto como objeto de aprendizagem',
    desc: 'O aluno não apenas lê o diagrama — ele o reconstrói. Distribuir os versículos de uma perícope sem a estrutura e pedir que o grupo identifique os pares quiásticos é metodologia ativa de alto engajamento cognitivo e excelente exercício hermenêutico.',
    aplicacao: 'Para seminários, células avançadas e aulas de hermenêutica — transforma o texto em problema a ser solucionado colaborativamente.',
    abnt: [
      'LUND, Nils Wilhelm. Chiasmus in the New Testament. Chapel Hill: University of North Carolina Press, 1942.',
      'WELCH, John W. (ed.). Chiasmus in Antiquity: Structures, Analyses, Exegesis. Hildesheim: Gerstenberg, 1981.',
    ],
  },
  {
    icon: <Users className="w-5 h-5" />,
    cor: C.purple,
    titulo: 'Aprendizagem Baseada em Projetos (PBL)',
    subtitulo: 'Projetos bíblicos colaborativos',
    desc: 'Grupos recebem a missão de mapear um livro bíblico: dividir em perícopes, identificar estruturas paralelas, formular a Big Idea de cada unidade. O processo de descoberta colaborativa supera qualquer exposição passiva.',
    aplicacao: 'Para institutos bíblicos, seminários e classes avançadas de EBD — forma pensadores bíblicos, não apenas receptores de informação.',
    abnt: [
      'KILPATRICK, William H. The Project Method. Teachers College Record, New York, v. 19, n. 4, p. 319-335, 1918.',
      'SMITH, James K. A. Desiring the Kingdom: Worship, Worldview, and Cultural Formation. Grand Rapids: Baker Academic, 2009.',
    ],
  },
  {
    icon: <Brain className="w-5 h-5" />,
    cor: C.rose,
    titulo: 'Pedagogia Narrativa Bíblica',
    subtitulo: 'Habitar a história da redenção',
    desc: 'A Bíblia é narrativa de redenção — não manual de proposições. Smith e Bavinck propõem que o ensino bíblico mergulhe o aluno dentro da história: ele não aprende sobre Josué — ele entra no dilema de atravessar o Jordão e descobre que Deus está à frente.',
    aplicacao: 'Para todas as idades — especialmente crianças e adolescentes. O infográfico quiástico funciona como mapa narrativo da perícope.',
    abnt: [
      'SMITH, James K. A. Imagining the Kingdom: How Worship Works. Grand Rapids: Baker Academic, 2013.',
      'BAVINCK, Herman. Christelijke Paedagogiek. Kampen: Kok, 1904.',
      'WRIGHT, Nicholas T. The New Testament and the People of God. Minneapolis: Fortress Press, 1992.',
    ],
  },
  {
    icon: <Target className="w-5 h-5" />,
    cor: C.green,
    titulo: 'Sala Invertida Bíblica (Flipped Classroom)',
    subtitulo: 'O conteúdo em casa, a profundidade em grupo',
    desc: 'O aluno lê a perícope e visualiza o diagrama quiástico antes do encontro. O tempo em grupo é dedicado exclusivamente à discussão socrática, aplicação pastoral e oração. A plataforma fornece os recursos para a preparação individual.',
    aplicacao: 'Para células, EBD e grupos de discipulado — maximiza o tempo presencial para o que nenhuma tela faz: encontro, oração e aplicação comunitária.',
    abnt: [
      'BERGMANN, Jonathan; SAMS, Aaron. Flip Your Classroom: Reach Every Student in Every Class Every Day. Washington: ISTE/ASCD, 2012.',
    ],
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    cor: C.purple,
    titulo: 'Andragogia Teológica Reformada',
    subtitulo: 'Princípios do ensino de adultos aplicados à Palavra',
    desc: 'Malcolm Knowles demonstrou que adultos aprendem quando veem relevância imediata, partem de experiência própria e autodirecionam o processo. Adaptado ao contexto reformado: o adulto é chamado à maturidade em Cristo (Ef 4:13) e aprende a Escritura como agente — não como receptor passivo.',
    aplicacao: 'Para grupos de adultos, células, EBD avançada e formação de líderes — design de encontros onde o adulto descobre, questiona e aplica com autonomia orientada.',
    abnt: [
      'KNOWLES, Malcolm S. The Modern Practice of Adult Education: Andragogy Versus Pedagogy. New York: Association Press, 1970.',
      'PAZMINO, Robert W. Foundational Issues in Christian Education. 3. ed. Grand Rapids: Baker Academic, 2008.',
    ],
  },
  {
    icon: <Star className="w-5 h-5" />,
    cor: C.rose,
    titulo: 'Aprendizagem Transformativa Bíblica',
    subtitulo: 'Crise de perspectiva como porta da renovação',
    desc: 'Jack Mezirow identificou que adultos aprendem profundamente quando uma "crise desorientadora" desafia seus pressupostos. Na pedagogia reformada: o texto bíblico é disruptivo por natureza — confronta cosmovisões, derruba ídolos e renova a mente (Rm 12:2).',
    aplicacao: 'Para retiros, conferências e discipulado intensivo — criar espaço seguro onde a Palavra confronta e o Espírito transforma pressupostos profundos.',
    abnt: [
      'MEZIROW, Jack. Transformative Dimensions of Adult Learning. San Francisco: Jossey-Bass, 1991.',
      'SHAW, Perry. Transforming Theological Education: A Practical Handbook for Integrative Learning. Carlisle: Langham Global Library, 2014.',
    ],
  },
  {
    icon: <Users className="w-5 h-5" />,
    cor: C.blue,
    titulo: 'Comunidade de Prática da Aliança',
    subtitulo: 'Aprender juntos como povo do pacto',
    desc: 'Etienne Wenger demonstrou que o aprendizado mais profundo ocorre em comunidades de prática — grupos que compartilham missão, linguagem e fazer comuns. Na teologia reformada: a Igreja é comunidade de prática covenantal onde a Palavra é interpretada, pregada, cantada e vivida coletivamente.',
    aplicacao: 'Para igrejas locais, seminários e institutos bíblicos — construir comunidades onde o estudo bíblico é prática contínua, não evento ocasional.',
    abnt: [
      'WENGER, Etienne. Communities of Practice: Learning, Meaning, and Identity. Cambridge: Cambridge University Press, 1998.',
      'BANKS, Robert. Paul\'s Idea of Community. Rev. ed. Peabody: Hendrickson Publishers, 1994.',
    ],
  },
  {
    icon: <BookMarked className="w-5 h-5" />,
    cor: C.gold,
    titulo: 'Tutoria Expositiva (Modelo Timóteo)',
    subtitulo: 'Paulo formou Timóteo — não em sala de aula',
    desc: 'A andragogia bíblica mais antiga: o modelo Paulo-Timóteo (2Tm 2:2). O tutor transmite não apenas conteúdo, mas método, caráter e cosmovisão. Grupos de tutoria onde o experiente conduz o mais novo pelo texto, pela exegese e pela aplicação pastoral ao longo de meses.',
    aplicacao: 'Para formação de pastores, líderes e professores bíblicos — tutoria intencional com perícopes, sermões e avaliação reflexiva conjunta.',
    abnt: [
      'HENDRICKS, Howard G.; HENDRICKS, William D. As Iron Sharpens Iron: Building Character in a Mentoring Relationship. Chicago: Moody Press, 1995.',
      'WARD, Ted. Servants, Leaders and Tyrants. In: FERRIS, Robert (ed.). Establishing Ministry Training. Pasadena: William Carey Library, 1995.',
    ],
  },
  {
    icon: <Zap className="w-5 h-5" />,
    cor: C.green,
    titulo: 'Micro-aprendizagem Bíblica (Microlearning)',
    subtitulo: 'Unidades curtas de alto impacto formativo',
    desc: 'Neurociência cognitiva demonstra que aprendizagens em fragmentos curtos e espaçados superam longas exposições contínuas (curva do esquecimento de Ebbinghaus). Aplicado ao ensino bíblico: uma perícope por semana, um versículo memorizado, um diagrama quiástico meditado diariamente.',
    aplicacao: 'Para devocionais diários, planos de leitura e EBD semanal — o devocional quiástico desta plataforma é, por design, uma metodologia de micro-aprendizagem bíblica.',
    abnt: [
      'EBBINGHAUS, Hermann. Über das Gedächtnis: Untersuchungen zur experimentellen Psychologie. Leipzig: Duncker & Humblot, 1885.',
      'MILLAR, Gary; CAMPBELL, Phil. Saving Eutychus: How to Preach God\'s Word and Keep People Awake. Kingsford: Matthias Media, 2013.',
    ],
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    cor: C.purple,
    titulo: 'Aprendizagem Experiencial Reformada (Ciclo de Kolb)',
    subtitulo: 'Experiência → Reflexão → Conceito → Ação',
    desc: 'Adultos aprendem em ciclo: experiência concreta → reflexão → conceptualização abstrata → experimentação ativa. Na pedagogia reformada: a perícope é vivida (oração), refletida (exegese), conceptualizada (Big Idea teológica) e experimentada na missão e família. Teoria e prática inseparáveis.',
    aplicacao: 'Para seminários práticos, internatos ministeriais e formação de líderes — cada unidade bíblica percorre o ciclo completo antes de avançar.',
    abnt: [
      'KOLB, David A. Experiential Learning: Experience as the Source of Learning and Development. Englewood Cliffs: Prentice Hall, 1984.',
      'PAZMINO, Robert W. Foundational Issues in Christian Education. 3. ed. Grand Rapids: Baker Academic, 2008.',
    ],
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    cor: C.rose,
    titulo: 'Seminário Socrático Reformado',
    subtitulo: 'Diálogo estruturado em torno do texto sagrado',
    desc: 'O Seminário Socrático estrutura um diálogo aberto em torno de um texto desafiador. Na versão reformada: a perícope é o "grande texto" — o facilitador faz apenas perguntas abertas, os participantes dialogam entre si, e o texto arbitra o debate. O Espírito Santo é o verdadeiro mestre (Jo 14:26).',
    aplicacao: 'Para grupos avançados, seminários, células de liderança e classes bíblicas universitárias — desenvolve argumentação exegética e escuta ativa entre pares.',
    abnt: [
      'GREAT BOOKS FOUNDATION. An Introduction to Shared Inquiry. 4. ed. Chicago: Great Books Foundation, 1999.',
      'POYTHRESS, Vern S. God-Centered Biblical Interpretation. Phillipsburg: P&R Publishing, 1999.',
    ],
  },
  {
    icon: <Brain className="w-5 h-5" />,
    cor: C.blue,
    titulo: 'Orientação Formativa Bíblica (OFB)',
    subtitulo: 'Perguntas abertas que ativam a autodescoberta espiritual',
    desc: 'Metodologia educacional que usa perguntas abertas e reflexivas para ativar a autodescoberta do discípulo diante da Escritura. Não é aconselhamento diretivo — é o acompanhamento formativo em que o discípulo descobre, por si mesmo e guiado pelo Espírito, o que Deus já está fazendo em sua vida à luz da Palavra.',
    aplicacao: 'Para pastores de discipulado, tutores e líderes de células — substituir monólogos devocionais por encontros formativos onde o discípulo fala 70% do tempo e o Espírito age.',
    abnt: [
      'COLLINS, Gary R. Christian Coaching: Helping Others Turn Potential into Reality. 2. ed. Colorado Springs: NavPress, 2009.',
      'WEBB, Keith E. The COACH Model for Christian Leaders. Rev. ed. Bellevue: Active Results LLC, 2012.',
    ],
  },
  {
    icon: <Target className="w-5 h-5" />,
    cor: C.gold,
    titulo: 'Design Instrucional Teológico (DIT)',
    subtitulo: 'Planejamento intencional de cada unidade de ensino',
    desc: 'O Design Instrucional aplicado à educação teológica: cada unidade bíblica começa com objetivos claros de conhecimento (cabeça), afeição (coração) e prática (mãos). A taxonomia de Bloom revisada gradua perguntas — do recordar ao avaliar — garantindo que o ensino forme, não apenas informe.',
    aplicacao: 'Para professores de seminário, institutos bíblicos e EBD — planejar cada aula com objetivos tripartidos e avaliação formativa ao final de cada unidade.',
    abnt: [
      'BLOOM, Benjamin S. et al. Taxonomy of Educational Objectives: The Classification of Educational Goals. New York: Longmans Green, 1956.',
      'FERRIS, Robert W. Renewal in Theological Education: Strategies for Change. Wheaton: Billy Graham Center, 1990.',
      'SHAW, Perry. Transforming Theological Education. Carlisle: Langham Global Library, 2014.',
    ],
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    cor: C.green,
    titulo: 'Heutagogia Cristã',
    subtitulo: 'Aprendizagem autodeterminada orientada pela Palavra',
    desc: 'Evolução da andragogia: o aprendiz não apenas se autodirige — ele define suas próprias questões teológicas, constrói seu percurso formativo e avalia seu crescimento à luz das Escrituras. Na perspectiva reformada: corresponde à maturidade do crente que examina as Escrituras por si mesmo (At 17:11), guiado pelo Espírito.',
    aplicacao: 'Para líderes maduros, pastores em formação contínua e pesquisadores de teologia — estimular autonomia hermenêutica responsável dentro da comunidade interpretativa da Igreja.',
    abnt: [
      'HASE, Stewart; KENYON, Chris. From Andragogy to Heutagogy. ultiBASE, Melbourne, dez. 2000. Disponível em: <http://ultibase.rmit.edu.au/Articles/dec00/hase2.htm>. Acesso em: 2024.',
      'PAZMINO, Robert W. Foundational Issues in Christian Education. 3. ed. Grand Rapids: Baker Academic, 2008.',
    ],
  },
  // ── Para Homens Cristãos ──────────────────────────────────────
  {
    icon: <BookMarked className="w-5 h-5" />,
    cor: C.blue,
    titulo: 'Círculos de Ferro — Mentoria Masculina Reformada',
    subtitulo: 'Pv 27:17 — o ferro aguça o ferro',
    desc: 'Grupos exclusivos de homens cristãos onde a Palavra é o centro e a prestação de contas é o método. Cada encontro parte de uma perícope, inclui exame pessoal (como estou vivendo este texto?), desafio mútuo e oração intercedida. Forma homens na cabeça (teologia), no coração (caráter) e nas mãos (liderança no lar e na Igreja).',
    aplicacao: 'Para grupos de homens em igrejas locais, ministérios masculinos e células de liderança — encontros quinzenais com perícope definida, perguntas de prestação de contas e compromisso de aplicação até o próximo encontro.',
    abnt: [
      'HENDRICKS, Howard G.; HENDRICKS, William D. As Iron Sharpens Iron: Building Character in a Mentoring Relationship. Chicago: Moody Press, 1995.',
      'MORLEY, Patrick. The Man in the Mirror: Solving the 24 Problems Men Face. Grand Rapids: Zondervan, 1997.',
      'WEBER, Stu. Tender Warrior: Every Man\'s Purpose, Every Woman\'s Dream, Every Child\'s Hope. Sisters: Multnomah, 1993.',
    ],
    publico: 'homens',
  },
  {
    icon: <Star className="w-5 h-5" />,
    cor: C.purple,
    titulo: 'Andragogia da Liderança Masculina Cristã',
    subtitulo: 'Formar homens que lideram pelo servo-sacrifício',
    desc: 'Metodologia educacional que parte da vocação bíblica do homem como profeta (ensina a família na Palavra), sacerdote (intercede e cuida) e rei (serve com autoridade responsável — Ef 5:25-27). Cada módulo usa estudo expositivo de perícope + estudo de caso de liderança bíblica + diálogo andragógico sobre desafios reais do homem cristão contemporâneo.',
    aplicacao: 'Para institutos de formação masculina, seminários e programas de discipulado de homens — cursos trimestrais com perícopes do AT e NT sobre liderança, aliança e vocação masculina.',
    abnt: [
      'WARE, Bruce A. Father, Son, and Holy Spirit: Relationships, Roles, and Relevance. Wheaton: Crossway Books, 2005.',
      'KÖSTENBERGER, Andreas J.; JONES, David W. God, Marriage, and Family: Rebuilding the Biblical Foundation. 2. ed. Wheaton: Crossway, 2010.',
      'KNOWLES, Malcolm S. The Modern Practice of Adult Education: Andragogy Versus Pedagogy. New York: Association Press, 1970.',
    ],
    publico: 'homens',
  },
  // ── Para Mulheres Cristãs ─────────────────────────────────────
  {
    icon: <Users className="w-5 h-5" />,
    cor: C.rose,
    titulo: 'Método Tito 2 — Mentoria Feminina Intergeracional',
    subtitulo: 'Mulheres mais velhas ensinando as mais jovens (Tt 2:3-5)',
    desc: 'Metodologia andragógica fundamentada no mandato de Tito 2:3-5: mulheres experientes ensinam as mais novas através de relacionamento contínuo, não de sala de aula formal. O conteúdo é teológico-prático: estudo bíblico expositivo combinado com formação no papel de esposa, mãe e discípula. Saber e ser são inseparáveis.',
    aplicacao: 'Para ministérios femininos em igrejas locais — grupos de 3 a 5 mulheres com encontros semanais, perícope do devocional como ponto de partida e mentora que modela, não apenas ensina.',
    abnt: [
      'HUNT, Susan. Spiritual Mothering: The Titus 2 Model for Women Mentoring Women. Wheaton: Crossway Books, 1992.',
      'FITZPATRICK, Elyse M.; CORNISH, Carol. Women Helping Women: A Biblical Guide to the Major Issues Women Face. Eugene: Harvest House, 1997.',
      'SCHREINER, Thomas R.; KÖSTENBERGER, Andreas J. (eds.). Women in the Church: An Interpretation and Application of 1 Timothy 2:9-15. 3. ed. Wheaton: Crossway, 2016.',
    ],
    publico: 'mulheres',
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    cor: C.gold,
    titulo: 'Círculos de Sabedoria Feminina Reformada',
    subtitulo: 'Comunidades de aprendizagem teológica entre mulheres',
    desc: 'Grupos de estudo bíblico expositivo conduzidos por mulheres, com metodologia andragógica que respeita a experiência de cada participante e usa o texto como árbitro de todo debate. Parte do princípio de que mulheres cristãs são discípulas plenas — chamadas a amar a Deus de toda a mente (Mc 12:30). Teologia rigorosa em linguagem acessível.',
    aplicacao: 'Para ministérios femininos, grupos de mães, estudantes universitárias cristãs e professoras de EBD — estudo expositivo de livros inteiros da Bíblia com aplicação específica à vocação feminina reformada.',
    abnt: [
      'KÖSTENBERGER, Margaret E. Jesus and the Feminists: Who Do They Say That He Is? Wheaton: Crossway, 2008.',
      'JAMES, Sharon. God\'s Design for Women: Biblical Womanhood for Today. Darlington: Evangelical Press, 2007.',
      'WENGER, Etienne. Communities of Practice: Learning, Meaning, and Identity. Cambridge: Cambridge University Press, 1998.',
    ],
    publico: 'mulheres',
  },
  // ── Para Jovens Cristãos ──────────────────────────────────────
  {
    icon: <Zap className="w-5 h-5" />,
    cor: C.green,
    titulo: 'Gamificação Bíblica Reformada',
    subtitulo: 'Engajamento lúdico com profundidade teológica',
    desc: 'Elementos de design de jogos (desafios, conquistas, progressão, equipes, narrativa) aplicados ao ensino bíblico para jovens. Não trivializa — profundifica: o jovem compete para memorizar perícopes, resolver enigmas hermenêuticos, identificar estruturas quiásticas e apresentar aplicações criativas. A motivação intrínseca substitui a passividade.',
    aplicacao: 'Para ministérios de jovens, EBD adolescente e acampamentos cristãos — gincanas bíblicas por perícopes, quiz quiástico, desafios de memorização com pontuação e apresentação de sermões de 2 minutos.',
    abnt: [
      'KAPP, Karl M. The Gamification of Learning and Instruction: Game-Based Methods and Strategies for Training and Education. San Francisco: Pfeiffer, 2012.',
      'FIELDS, Doug. Your First Two Years in Youth Ministry. Grand Rapids: Zondervan, 2002.',
      'SMITH, James K. A. Desiring the Kingdom: Worship, Worldview, and Cultural Formation. Grand Rapids: Baker Academic, 2009.',
    ],
    publico: 'jovens',
  },
  {
    icon: <Brain className="w-5 h-5" />,
    cor: C.purple,
    titulo: 'Aprendizagem Colaborativa por Pares (Peer Learning) Juvenil',
    subtitulo: 'Jovens ensinando jovens com base na Palavra',
    desc: 'Metodologia em que jovens cristãos preparam e ensinam uma perícope para seus pares — com supervisão pastoral. Vygotsky demonstrou que ensinar é a forma mais profunda de aprender ("zona de desenvolvimento proximal"). No contexto reformado: o jovem que ensina Josué 1 ao seu grupo aprende Josué 1 de maneira que nenhuma palestra produz.',
    aplicacao: 'Para grupos de jovens e ministérios universitários — "Pregue para seus pares": cada jovem prepara 5 minutos de exposição de uma perícope, recebe feedback do grupo e do pastor. Forma pregadores desde cedo.',
    abnt: [
      'VYGOTSKY, Lev S. Mind in Society: The Development of Higher Psychological Processes. Cambridge: Harvard University Press, 1978.',
      'TOPPING, Keith J. The Effectiveness of Peer Tutoring in Further and Higher Education. Higher Education, Dordrecht, v. 32, n. 3, p. 321-345, 1996.',
      'RAHN, Dave; STROTHER, Terry. Contagious Faith: Empowering Student Leadership in Youth Evangelism. Loveland: Group Publishing, 2006.',
    ],
    publico: 'jovens',
  },
  {
    icon: <Target className="w-5 h-5" />,
    cor: C.rose,
    titulo: 'Aprendizagem Baseada em Problemas Bíblicos (ABP Juvenil)',
    subtitulo: 'O texto como problema real a ser solucionado',
    desc: 'Jovens recebem uma "situação-problema" extraída da perícope: "Deus disse a Josué para ser corajoso. O que isso significa para um jovem cristão numa universidade secular hoje?" O grupo pesquisa o texto, a estrutura quiástica e a história redentora para construir uma resposta fundamentada — não uma opinião, mas uma convicção bíblica.',
    aplicacao: 'Para grupos de jovens, ministérios universitários e acampamentos — sessões de 90 minutos com situação-problema distribuída, pesquisa em duplas no texto, debate socrático e aplicação pessoal escrita.',
    abnt: [
      'BARROWS, Howard S. Problem-Based Learning: An Approach to Medical Education. New York: Springer, 1980.',
      'DEAN, Kenda Creasy. Almost Christian: What the Faith of Our Teenagers Is Telling the American Church. New York: Oxford University Press, 2010.',
      'SMITH, James K. A. Desiring the Kingdom: Worship, Worldview, and Cultural Formation. Grand Rapids: Baker Academic, 2009.',
    ],
    publico: 'jovens',
  },
];

// Bible books data (only Joshua available, rest "Em breve")
interface BibleBook { nome: string; abrev: string; testamento: 'AT' | 'NT'; slug: string; grupo: string; disponivel: boolean; }

const BIBLE_BOOKS: BibleBook[] = [
  { nome: 'Gênesis',       abrev: 'Gn',  testamento: 'AT', slug: 'genesis',       grupo: 'Pentateuco',  disponivel: false },
  { nome: 'Êxodo',         abrev: 'Êx',  testamento: 'AT', slug: 'exodo',         grupo: 'Pentateuco',  disponivel: false },
  { nome: 'Levítico',      abrev: 'Lv',  testamento: 'AT', slug: 'levitico',      grupo: 'Pentateuco',  disponivel: false },
  { nome: 'Números',       abrev: 'Nm',  testamento: 'AT', slug: 'numeros',       grupo: 'Pentateuco',  disponivel: false },
  { nome: 'Deuteronômio',  abrev: 'Dt',  testamento: 'AT', slug: 'deuteronomio',  grupo: 'Pentateuco',  disponivel: false },
  { nome: 'Josué',         abrev: 'Js',  testamento: 'AT', slug: 'josue',         grupo: 'Históricos',  disponivel: true  },
  { nome: 'Juízes',        abrev: 'Jz',  testamento: 'AT', slug: 'juizes',        grupo: 'Históricos',  disponivel: false },
  { nome: 'Rute',          abrev: 'Rt',  testamento: 'AT', slug: 'rute',          grupo: 'Históricos',  disponivel: false },
  { nome: '1 Samuel',      abrev: '1Sm', testamento: 'AT', slug: '1samuel',       grupo: 'Históricos',  disponivel: false },
  { nome: '2 Samuel',      abrev: '2Sm', testamento: 'AT', slug: '2samuel',       grupo: 'Históricos',  disponivel: false },
  { nome: '1 Reis',        abrev: '1Rs', testamento: 'AT', slug: '1reis',         grupo: 'Históricos',  disponivel: false },
  { nome: '2 Reis',        abrev: '2Rs', testamento: 'AT', slug: '2reis',         grupo: 'Históricos',  disponivel: false },
  { nome: '1 Crônicas',    abrev: '1Cr', testamento: 'AT', slug: '1cronicas',     grupo: 'Históricos',  disponivel: false },
  { nome: '2 Crônicas',    abrev: '2Cr', testamento: 'AT', slug: '2cronicas',     grupo: 'Históricos',  disponivel: false },
  { nome: 'Esdras',        abrev: 'Ed',  testamento: 'AT', slug: 'esdras',        grupo: 'Históricos',  disponivel: false },
  { nome: 'Neemias',       abrev: 'Ne',  testamento: 'AT', slug: 'neemias',       grupo: 'Históricos',  disponivel: false },
  { nome: 'Ester',         abrev: 'Et',  testamento: 'AT', slug: 'ester',         grupo: 'Históricos',  disponivel: false },
  { nome: 'Jó',            abrev: 'Jó',  testamento: 'AT', slug: 'jo',            grupo: 'Poéticos',    disponivel: false },
  { nome: 'Salmos',        abrev: 'Sl',  testamento: 'AT', slug: 'salmos',        grupo: 'Poéticos',    disponivel: false },
  { nome: 'Provérbios',    abrev: 'Pv',  testamento: 'AT', slug: 'proverbios',    grupo: 'Poéticos',    disponivel: false },
  { nome: 'Eclesiastes',   abrev: 'Ec',  testamento: 'AT', slug: 'eclesiastes',   grupo: 'Poéticos',    disponivel: false },
  { nome: 'Cânticos',      abrev: 'Ct',  testamento: 'AT', slug: 'canticos',      grupo: 'Poéticos',    disponivel: false },
  { nome: 'Isaías',        abrev: 'Is',  testamento: 'AT', slug: 'isaias',        grupo: 'Proféticos',  disponivel: false },
  { nome: 'Jeremias',      abrev: 'Jr',  testamento: 'AT', slug: 'jeremias',      grupo: 'Proféticos',  disponivel: false },
  { nome: 'Lamentações',   abrev: 'Lm',  testamento: 'AT', slug: 'lamentacoes',   grupo: 'Proféticos',  disponivel: false },
  { nome: 'Ezequiel',      abrev: 'Ez',  testamento: 'AT', slug: 'ezequiel',      grupo: 'Proféticos',  disponivel: false },
  { nome: 'Daniel',        abrev: 'Dn',  testamento: 'AT', slug: 'daniel',        grupo: 'Proféticos',  disponivel: false },
  { nome: 'Oseias',        abrev: 'Os',  testamento: 'AT', slug: 'oseias',        grupo: 'Proféticos',  disponivel: false },
  { nome: 'Joel',          abrev: 'Jl',  testamento: 'AT', slug: 'joel',          grupo: 'Proféticos',  disponivel: false },
  { nome: 'Amós',          abrev: 'Am',  testamento: 'AT', slug: 'amos',          grupo: 'Proféticos',  disponivel: false },
  { nome: 'Obadias',       abrev: 'Ob',  testamento: 'AT', slug: 'obadias',       grupo: 'Proféticos',  disponivel: false },
  { nome: 'Jonas',         abrev: 'Jn',  testamento: 'AT', slug: 'jonas',         grupo: 'Proféticos',  disponivel: false },
  { nome: 'Miquéias',      abrev: 'Mq',  testamento: 'AT', slug: 'miqueias',      grupo: 'Proféticos',  disponivel: false },
  { nome: 'Naum',          abrev: 'Na',  testamento: 'AT', slug: 'naum',          grupo: 'Proféticos',  disponivel: false },
  { nome: 'Habacuque',     abrev: 'Hc',  testamento: 'AT', slug: 'habacuque',     grupo: 'Proféticos',  disponivel: false },
  { nome: 'Sofonias',      abrev: 'Sf',  testamento: 'AT', slug: 'sofonias',      grupo: 'Proféticos',  disponivel: false },
  { nome: 'Ageu',          abrev: 'Ag',  testamento: 'AT', slug: 'ageu',          grupo: 'Proféticos',  disponivel: false },
  { nome: 'Zacarias',      abrev: 'Zc',  testamento: 'AT', slug: 'zacarias',      grupo: 'Proféticos',  disponivel: false },
  { nome: 'Malaquias',     abrev: 'Ml',  testamento: 'AT', slug: 'malaquias',     grupo: 'Proféticos',  disponivel: false },
  { nome: 'Mateus',        abrev: 'Mt',  testamento: 'NT', slug: 'mateus',        grupo: 'Evangelhos',  disponivel: false },
  { nome: 'Marcos',        abrev: 'Mc',  testamento: 'NT', slug: 'marcos',        grupo: 'Evangelhos',  disponivel: false },
  { nome: 'Lucas',         abrev: 'Lc',  testamento: 'NT', slug: 'lucas',         grupo: 'Evangelhos',  disponivel: false },
  { nome: 'João',          abrev: 'Jo',  testamento: 'NT', slug: 'joao',          grupo: 'Evangelhos',  disponivel: false },
  { nome: 'Atos',          abrev: 'At',  testamento: 'NT', slug: 'atos',          grupo: 'Epistolas',   disponivel: false },
  { nome: 'Romanos',       abrev: 'Rm',  testamento: 'NT', slug: 'romanos',       grupo: 'Epistolas',   disponivel: false },
  { nome: '1 Coríntios',   abrev: '1Co', testamento: 'NT', slug: '1corintios',    grupo: 'Epistolas',   disponivel: false },
  { nome: '2 Coríntios',   abrev: '2Co', testamento: 'NT', slug: '2corintios',    grupo: 'Epistolas',   disponivel: false },
  { nome: 'Gálatas',       abrev: 'Gl',  testamento: 'NT', slug: 'galatas',       grupo: 'Epistolas',   disponivel: false },
  { nome: 'Efésios',       abrev: 'Ef',  testamento: 'NT', slug: 'efesios',       grupo: 'Epistolas',   disponivel: false },
  { nome: 'Filipenses',    abrev: 'Fp',  testamento: 'NT', slug: 'filipenses',    grupo: 'Epistolas',   disponivel: false },
  { nome: 'Colossenses',   abrev: 'Cl',  testamento: 'NT', slug: 'colossenses',   grupo: 'Epistolas',   disponivel: false },
  { nome: '1 Tessalonicenses', abrev: '1Ts', testamento: 'NT', slug: '1tessalonicenses', grupo: 'Epistolas', disponivel: false },
  { nome: '2 Tessalonicenses', abrev: '2Ts', testamento: 'NT', slug: '2tessalonicenses', grupo: 'Epistolas', disponivel: false },
  { nome: '1 Timóteo',     abrev: '1Tm', testamento: 'NT', slug: '1timoteo',      grupo: 'Epistolas',   disponivel: false },
  { nome: '2 Timóteo',     abrev: '2Tm', testamento: 'NT', slug: '2timoteo',      grupo: 'Epistolas',   disponivel: false },
  { nome: 'Tito',          abrev: 'Tt',  testamento: 'NT', slug: 'tito',          grupo: 'Epistolas',   disponivel: false },
  { nome: 'Filemom',       abrev: 'Fm',  testamento: 'NT', slug: 'filemom',       grupo: 'Epistolas',   disponivel: false },
  { nome: 'Hebreus',       abrev: 'Hb',  testamento: 'NT', slug: 'hebreus',       grupo: 'Epistolas',   disponivel: false },
  { nome: 'Tiago',         abrev: 'Tg',  testamento: 'NT', slug: 'tiago',         grupo: 'Epistolas',   disponivel: false },
  { nome: '1 Pedro',       abrev: '1Pe', testamento: 'NT', slug: '1pedro',        grupo: 'Epistolas',   disponivel: false },
  { nome: '2 Pedro',       abrev: '2Pe', testamento: 'NT', slug: '2pedro',        grupo: 'Epistolas',   disponivel: false },
  { nome: '1 João',        abrev: '1Jo', testamento: 'NT', slug: '1joao',         grupo: 'Epistolas',   disponivel: false },
  { nome: '2 João',        abrev: '2Jo', testamento: 'NT', slug: '2joao',         grupo: 'Epistolas',   disponivel: false },
  { nome: '3 João',        abrev: '3Jo', testamento: 'NT', slug: '3joao',         grupo: 'Epistolas',   disponivel: false },
  { nome: 'Judas',         abrev: 'Jd',  testamento: 'NT', slug: 'judas',         grupo: 'Epistolas',   disponivel: false },
  { nome: 'Apocalipse',    abrev: 'Ap',  testamento: 'NT', slug: 'apocalipse',    grupo: 'Epistolas',   disponivel: false },
];

const GRUPOS = ['Pentateuco', 'Históricos', 'Poéticos', 'Proféticos', 'Evangelhos', 'Epistolas'] as const;

// ─── Joshua Pericopes Component ─────────────────────────────────
// ─── Sub-Navigation ─────────────────────────────────────────────
const SUB_NAV_ITEMS = [
  {
    id: 'autores',
    icon: <GraduationCap size={16} />,
    label: { pt: 'Educadores Reformados', en: 'Reformed Educators' },
    cor: 'rgba(0,212,255,1)',
    corL: 'rgba(0,212,255,0.12)',
  },
  {
    id: 'metodologias',
    icon: <Sparkles size={16} />,
    label: { pt: 'Metodologias Ativas', en: 'Active Learning' },
    cor: 'rgba(0,229,160,1)',
    corL: 'rgba(0,229,160,0.12)',
  },
  {
    id: 'livros',
    icon: <Library size={16} />,
    label: { pt: 'Livros da Bíblia', en: 'Bible Books' },
    cor: 'rgba(245,200,66,1)',
    corL: 'rgba(245,200,66,0.12)',
  },
] as const;

function EducacaoSubNav({ pt }: { pt: boolean }) {
  const [active, setActive] = useState<string>('autores');
  const [visible, setVisible] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* show subnav after scrolling past hero (~300px) */
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 220);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* track active section via IntersectionObserver */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SUB_NAV_ITEMS.forEach(item => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(item.id); },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  /* slide the indicator under the active button */
  useEffect(() => {
    const idx = SUB_NAV_ITEMS.findIndex(i => i.id === active);
    const btn = btnRefs.current[idx];
    const nav = navRef.current;
    if (!btn || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndicatorStyle({ left: btnRect.left - navRect.left, width: btnRect.width });
  }, [active]);

  function scrollTo(id: string) {
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          style={{
            position: 'fixed',
            top: 'clamp(60px,10vw,80px)',
            left: 0, right: 0,
            zIndex: 40,
            display: 'flex',
            justifyContent: 'center',
            padding: '0 clamp(12px,4vw,24px)',
            pointerEvents: 'none',
          }}
        >
          <div
            ref={navRef}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              position: 'relative',
              padding: '5px 6px',
              borderRadius: 99,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              background: 'rgba(5,7,20,0.88)',
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset',
              maxWidth: '100%',
              overflowX: 'auto',
              scrollbarWidth: 'none',
            }}
          >
            {/* Sliding pill indicator */}
            <motion.div
              animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              style={{
                position: 'absolute',
                top: 5, height: 'calc(100% - 10px)',
                borderRadius: 99,
                background: (() => {
                  const item = SUB_NAV_ITEMS.find(i => i.id === active);
                  return item ? `${item.cor.replace('1)', '0.14)')}` : 'rgba(255,255,255,0.06)';
                })(),
                border: (() => {
                  const item = SUB_NAV_ITEMS.find(i => i.id === active);
                  return item ? `1px solid ${item.cor.replace('1)', '0.35)')}` : '1px solid rgba(255,255,255,0.08)';
                })(),
                boxShadow: (() => {
                  const item = SUB_NAV_ITEMS.find(i => i.id === active);
                  return item ? `0 0 18px ${item.cor.replace('1)', '0.20)')}` : 'none';
                })(),
                pointerEvents: 'none',
              }}
            />

            {/* Buttons */}
            {SUB_NAV_ITEMS.map((item, i) => {
              const isActive = active === item.id;
              return (
                <motion.button
                  key={item.id}
                  ref={el => { btnRefs.current[i] = el; }}
                  onClick={() => scrollTo(item.id)}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    padding: 'clamp(8px,1.5vw,10px) clamp(12px,2.5vw,18px)',
                    borderRadius: 99,
                    zIndex: 1,
                    transition: 'color 0.25s',
                    color: isActive ? item.cor : 'rgba(255,255,255,0.45)',
                    whiteSpace: 'nowrap',
                    fontSize: 'clamp(10px,1.5vw,12px)',
                    fontWeight: 900,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  <motion.span
                    animate={{ scale: isActive ? 1.1 : 1, rotate: isActive ? 5 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
                  >
                    {item.icon}
                  </motion.span>
                  <span style={{ display: 'block' }}>
                    {pt ? item.label.pt : item.label.en}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="subnav-dot"
                      style={{
                        width: 5, height: 5, borderRadius: '50%',
                        background: item.cor, flexShrink: 0,
                        boxShadow: `0 0 8px ${item.cor}`,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Metodologias Grid Component ────────────────────────────────
const GRUPOS_MET = [
  { key: undefined  as string | undefined, label: { pt: 'Metodologias Gerais',    en: 'General Methodologies'   }, cor: C.blue,   icon: '⚡' },
  { key: 'homens',                         label: { pt: 'Para Homens Cristãos',   en: 'For Christian Men'       }, cor: C.blue,   icon: '⚔️' },
  { key: 'mulheres',                       label: { pt: 'Para Mulheres Cristãs',  en: 'For Christian Women'     }, cor: C.rose,   icon: '🌹' },
  { key: 'jovens',                         label: { pt: 'Para Jovens Cristãos',   en: 'For Christian Youth'     }, cor: C.green,  icon: '🔥' },
] as const;

function MetodologiasGrid({ pt }: { pt: boolean }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const toggle = (key: string) => setOpenKey(prev => prev === key ? null : key);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
      {GRUPOS_MET.map(grupo => {
        const list = METODOLOGIAS_ATIVAS.filter(m => m.publico === grupo.key);
        if (!list.length) return null;
        return (
          <div key={String(grupo.key)}>

            {/* ── Group header ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `linear-gradient(135deg, ${grupo.cor}25, ${grupo.cor}0A)`,
                border: `1.5px solid ${grupo.cor}50`, fontSize: 18,
                boxShadow: `0 0 18px ${grupo.cor}20`,
              }}>
                {grupo.icon}
              </div>
              <div>
                <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 900, color: grupo.cor, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {pt ? grupo.label.pt : grupo.label.en}
                </div>
                <div style={{ fontSize: 10.5, color: C.muted, marginTop: 2, letterSpacing: '0.05em' }}>
                  {list.length} {pt ? 'metodologias disponíveis' : 'methodologies available'}
                </div>
              </div>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${grupo.cor}50, transparent)` }} />
              <div style={{
                padding: '3px 10px', borderRadius: 99,
                background: `${grupo.cor}12`, border: `1px solid ${grupo.cor}30`,
                fontSize: 10, fontWeight: 900, color: grupo.cor, letterSpacing: '0.1em',
              }}>
                {list.length}
              </div>
            </div>

            {/* ── Cards grid ── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(260px, 28vw, 340px), 1fr))',
              gap: 14,
            }}>
              {list.map((m, i) => {
                const cardKey = `${String(grupo.key)}-${i}`;
                const isOpen = openKey === cardKey;
                const isHovered = hoveredKey === cardKey;

                return (
                  <motion.div
                    key={m.titulo}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.38, layout: { duration: 0.3 } }}
                    onHoverStart={() => setHoveredKey(cardKey)}
                    onHoverEnd={() => setHoveredKey(null)}
                    style={{
                      borderRadius: 18, overflow: 'hidden', cursor: 'pointer',
                      background: isOpen
                        ? `linear-gradient(145deg, ${m.cor}12 0%, rgba(5,7,20,0.95) 100%)`
                        : isHovered
                          ? `rgba(255,255,255,0.05)`
                          : `rgba(255,255,255,0.03)`,
                      border: `1px solid ${isOpen ? m.cor + '55' : isHovered ? m.cor + '30' : 'rgba(255,255,255,0.07)'}`,
                      boxShadow: isOpen
                        ? `0 16px 48px ${m.cor}18, 0 0 0 1px ${m.cor}12`
                        : isHovered
                          ? `0 6px 24px ${m.cor}10`
                          : 'none',
                      transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s',
                    }}
                    onClick={() => toggle(cardKey)}
                  >
                    {/* Top accent bar */}
                    <motion.div
                      animate={{ scaleX: isOpen || isHovered ? 1 : 0, opacity: isOpen ? 1 : isHovered ? 0.5 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        height: 2,
                        background: `linear-gradient(90deg, ${m.cor}, ${m.cor}40, transparent)`,
                        transformOrigin: 'left',
                      }}
                    />

                    {/* Card header — always visible */}
                    <div style={{ padding: '18px 18px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
                        {/* Icon */}
                        <motion.div
                          animate={{
                            scale: isOpen ? 1.12 : isHovered ? 1.06 : 1,
                            rotate: isOpen ? 6 : 0,
                            boxShadow: isOpen ? `0 0 20px ${m.cor}40` : 'none',
                          }}
                          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                          style={{
                            width: 44, height: 44, borderRadius: 13, flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: isOpen
                              ? `linear-gradient(135deg, ${m.cor}35, ${m.cor}10)`
                              : `${m.cor}15`,
                            border: `1.5px solid ${isOpen ? m.cor + '70' : m.cor + '35'}`,
                            color: m.cor,
                            transition: 'background 0.3s, border-color 0.3s',
                          }}
                        >
                          {m.icon}
                        </motion.div>

                        {/* Expand button */}
                        <div style={{ flex: 1 }} />
                        <motion.div
                          animate={{
                            rotate: isOpen ? 45 : 0,
                            background: isOpen ? `${m.cor}22` : 'rgba(255,255,255,0.04)',
                            borderColor: isOpen ? `${m.cor}55` : 'rgba(255,255,255,0.08)',
                          }}
                          transition={{ duration: 0.22 }}
                          style={{
                            width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          <ChevronRight size={13} color={isOpen ? m.cor : C.muted} />
                        </motion.div>
                      </div>

                      {/* Title */}
                      <div style={{
                        fontSize: 'clamp(12.5px,1.6vw,14px)', fontWeight: 900,
                        color: isOpen ? C.white : 'rgba(255,255,255,0.88)',
                        lineHeight: 1.28, marginBottom: 5,
                        transition: 'color 0.2s',
                      }}>
                        {m.titulo}
                      </div>
                      <div style={{
                        fontSize: 11, fontWeight: 700,
                        color: isOpen || isHovered ? m.cor : C.muted,
                        lineHeight: 1.3, transition: 'color 0.25s',
                      }}>
                        {m.subtitulo}
                      </div>
                    </div>

                    {/* Expandable body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ padding: '0 18px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div style={{ height: 1, background: `linear-gradient(90deg, ${m.cor}50, transparent)` }} />

                            {/* Description */}
                            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.72, margin: 0 }}>
                              {m.desc}
                            </p>

                            {/* Aplicação */}
                            <div style={{
                              padding: '11px 14px', borderRadius: 11,
                              background: `${m.cor}0E`, borderLeft: `3px solid ${m.cor}`,
                              display: 'flex', gap: 10, alignItems: 'flex-start',
                            }}>
                              <Target size={12} color={m.cor} style={{ flexShrink: 0, marginTop: 2 }} />
                              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.80)', lineHeight: 1.65, margin: 0 }}>
                                <span style={{ fontWeight: 900, color: m.cor }}>{pt ? 'Aplicação: ' : 'Application: '}</span>
                                {m.aplicacao}
                              </p>
                            </div>

                            {/* ABNT */}
                            <div style={{
                              padding: '11px 14px', borderRadius: 11,
                              background: 'rgba(255,255,255,0.025)',
                              border: '1px solid rgba(255,255,255,0.06)',
                              display: 'flex', flexDirection: 'column', gap: 7,
                            }}>
                              <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted }}>
                                {pt ? 'Referências — ABNT' : 'References — ABNT'}
                              </div>
                              {m.abnt.map((ref, ri) => (
                                <p key={ri} style={{
                                  fontSize: 10, color: 'rgba(255,255,255,0.38)', lineHeight: 1.58,
                                  margin: 0, fontStyle: 'italic',
                                  paddingLeft: 10, borderLeft: `1px solid ${m.cor}30`,
                                }}>
                                  {ref}
                                </p>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Bottom glow bar */}
                    <motion.div
                      animate={{ scaleX: isOpen ? 1 : 0, opacity: isOpen ? 0.8 : 0 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        height: 2,
                        background: `linear-gradient(90deg, transparent, ${m.cor}, transparent)`,
                        transformOrigin: 'center',
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function JosuePericopesSection({ pt }: { pt: boolean }) {
  const [pericopes, setPericopes] = useState<Pericope[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${livroPath('josue', 'AT')}/quiastico.txt`)
      .then(r => r.ok ? r.text() : '')
      .then(text => {
        const list = parsePericopes(text);
        setPericopes(list);
        if (list.length > 0) setSelected(list[0].idx);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const selectedP = pericopes.find(p => p.idx === selected) ?? null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `${C.atColor}20`, border: `1px solid ${C.atColor}50`,
        }}>
          <BookOpen size={20} color={C.atColor} />
        </div>
        <div>
          <div style={{ fontSize: 'clamp(16px,2.4vw,22px)', fontWeight: 900, color: C.white, letterSpacing: '-0.01em' }}>
            {pt ? 'Josué — Perícopes Quiásticas' : 'Joshua — Chiastic Pericopes'}
          </div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>
            {pt
              ? `${pericopes.length} perícopes com estrutura literária quiástica identificada`
              : `${pericopes.length} pericopes with identified chiastic literary structure`}
          </div>
        </div>
      </div>

      {loading && (
        <div style={{ color: C.muted, fontSize: 13, textAlign: 'center', padding: '32px 0' }}>
          {pt ? 'Carregando perícopes...' : 'Loading pericopes...'}
        </div>
      )}

      {!loading && pericopes.length === 0 && (
        <div style={{ color: C.muted, fontSize: 13, textAlign: 'center', padding: '32px 0' }}>
          {pt ? 'Nenhuma perícope encontrada.' : 'No pericopes found.'}
        </div>
      )}

      {!loading && pericopes.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {pericopes.map((p, i) => {
            const active = p.idx === selected;
            return (
              <motion.button
                key={p.idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setSelected(p.idx)}
                style={{
                  all: 'unset', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 18px', borderRadius: 14,
                  background: active ? `${C.atColor}12` : C.card,
                  border: `1px solid ${active ? C.atColor + '55' : 'rgba(255,255,255,0.08)'}`,
                  transition: 'all 0.2s',
                  textAlign: 'left',
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  background: active ? `${C.atColor}25` : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${active ? C.atColor + '60' : 'rgba(255,255,255,0.09)'}`,
                  fontSize: 11, fontWeight: 900, color: active ? C.atColor : C.muted,
                }}>
                  {p.idx}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 'clamp(12px,1.6vw,14px)', fontWeight: 800, color: active ? C.white : 'rgba(255,255,255,0.78)', lineHeight: 1.3 }}>
                    {p.titulo}
                  </div>
                  {p.ref && (
                    <div style={{ fontSize: 11, color: active ? C.atColor : C.muted, marginTop: 3, fontWeight: 600 }}>
                      {p.ref}
                    </div>
                  )}
                </div>
                {active && (
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.atColor, flexShrink: 0 }} />
                )}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Educational note */}
      {selectedP && (
        <motion.div
          key={selectedP.idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '18px 20px', borderRadius: 14,
            background: `linear-gradient(135deg, ${C.atColor}0A 0%, rgba(80,200,255,0.06) 100%)`,
            border: `1px solid ${C.atColor}30`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Zap size={14} color={C.atColor} />
            <span style={{ fontSize: 11, fontWeight: 900, color: C.atColor, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              {pt ? 'Sugestão Pedagógica' : 'Teaching Suggestion'}
            </span>
          </div>
          <p style={{ fontSize: 'clamp(12px,1.4vw,13.5px)', color: 'rgba(255,255,255,0.80)', lineHeight: 1.65, margin: 0 }}>
            {pt
              ? `Use a perícope "${selectedP.titulo}" (${selectedP.ref}) em sala de aula: distribua os versículos sem o diagrama quiástico e desafie os alunos a identificar os pares paralelos. Em seguida, apresente a estrutura completa e discuta: qual o versículo central e por que o autor o destacou?`
              : `Use the pericope "${selectedP.titulo}" (${selectedP.ref}) in class: distribute the verses without the chiastic diagram and challenge students to identify parallel pairs. Then present the full structure and discuss: which verse is central and why did the author highlight it?`}
          </p>
          <div style={{ marginTop: 12 }}>
            <Link
              to="/pregacao"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 12, fontWeight: 900, color: C.atColor,
                textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase',
              }}
            >
              {pt ? 'Ver no menu Pregação' : 'View in Preaching menu'}
              <ChevronRight size={14} />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Bible Books Grid ────────────────────────────────────────────
function BibleBooksGrid({ pt, onSelectJosue }: { pt: boolean; onSelectJosue: () => void }) {
  const [filtroTestamento, setFiltroTestamento] = useState<'TODOS' | 'AT' | 'NT'>('TODOS');

  const grupos = GRUPOS.filter(g => {
    if (filtroTestamento === 'AT') return ['Pentateuco', 'Históricos', 'Poéticos', 'Proféticos'].includes(g);
    if (filtroTestamento === 'NT') return ['Evangelhos', 'Epistolas'].includes(g);
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['TODOS', 'AT', 'NT'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFiltroTestamento(f)}
            style={{
              all: 'unset', cursor: 'pointer',
              padding: '7px 18px', borderRadius: 20,
              fontSize: 11, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: filtroTestamento === f ? C.blue : C.card,
              color: filtroTestamento === f ? '#050714' : C.muted,
              border: `1px solid ${filtroTestamento === f ? C.blue : 'rgba(255,255,255,0.10)'}`,
              transition: 'all 0.18s',
            }}
          >
            {f === 'TODOS' ? (pt ? 'Todos' : 'All') : f === 'AT' ? (pt ? 'Antigo Testamento' : 'Old Testament') : (pt ? 'Novo Testamento' : 'New Testament')}
          </button>
        ))}
      </div>

      {/* Groups */}
      {grupos.map(grupo => {
        const livros = BIBLE_BOOKS.filter(b => b.grupo === grupo);
        if (!livros.length) return null;
        const testamento = livros[0].testamento;
        const cor = testamento === 'AT' ? C.atColor : C.blue;
        return (
          <div key={grupo}>
            <div style={{ fontSize: 11, fontWeight: 900, color: cor, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 12, paddingLeft: 2 }}>
              {grupo}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))', gap: 8 }}>
              {livros.map(livro => {
                const isJosue = livro.slug === 'josue';
                return (
                  <motion.button
                    key={livro.slug}
                    whileHover={isJosue ? { scale: 1.04 } : {}}
                    whileTap={isJosue ? { scale: 0.97 } : {}}
                    onClick={isJosue ? onSelectJosue : undefined}
                    style={{
                      all: 'unset',
                      cursor: isJosue ? 'pointer' : 'default',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      gap: 4, padding: '12px 8px', borderRadius: 12,
                      background: isJosue ? `${C.atColor}14` : C.card,
                      border: `1px solid ${isJosue ? C.atColor + '55' : 'rgba(255,255,255,0.07)'}`,
                      opacity: isJosue ? 1 : 0.5,
                      transition: 'all 0.2s',
                      boxShadow: isJosue ? `0 0 18px ${C.atColor}18` : 'none',
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 900, color: isJosue ? C.atColor : C.muted }}>
                      {livro.abrev}
                    </span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: isJosue ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.30)', textAlign: 'center', lineHeight: 1.2, letterSpacing: '0.04em' }}>
                      {livro.nome}
                    </span>
                    {isJosue && (
                      <span style={{ fontSize: 8, fontWeight: 900, color: C.atColor, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 2 }}>
                        {pt ? 'ATIVO' : 'ACTIVE'}
                      </span>
                    )}
                    {!isJosue && (
                      <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.20)', letterSpacing: '0.1em' }}>
                        {pt ? 'em breve' : 'soon'}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────
export default function EducacaoPage() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const pt = lang === 'pt';
  const [showJosue, setShowJosue] = useState(false);
  const [autorExpandido, setAutorExpandido] = useState<number | null>(null);

  function handleSelectJosue() {
    setShowJosue(true);
    setTimeout(() => {
      const el = document.getElementById('educacao-josue');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  }

  /* ── shared layout helpers ── */
  const W = { maxWidth: 860, margin: '0 auto', width: '100%' } as const;
  const Wfull = { maxWidth: 1000, margin: '0 auto', width: '100%' } as const;

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.white, overflowX: 'hidden' }}>
      <Navbar lang={lang} onToggleLang={() => setLang(l => l === 'pt' ? 'en' : 'pt')} />
      <EducacaoSubNav pt={pt} />

      {/* ── outer shell — safe padding, centered ── */}
      <div style={{
        width: '100%',
        padding: 'clamp(80px,12vw,108px) clamp(14px,5vw,40px) 80px',
        boxSizing: 'border-box',
      }}>

        {/* FlagToggle */}
        <div style={{ ...Wfull, display: 'flex', justifyContent: 'flex-end', marginBottom: 28 }}>
          <FlagToggle lang={lang} onToggle={() => setLang(l => l === 'pt' ? 'en' : 'pt')} />
        </div>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ ...W, marginBottom: 80, textAlign: 'center' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 18px', borderRadius: 20,
            background: `${C.green}14`, border: `1px solid ${C.green}40`, marginBottom: 20,
          }}>
            <GraduationCap size={15} color={C.green} />
            <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.green }}>
              {pt ? 'Educação Cristã Reformada' : 'Reformed Christian Education'}
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.9rem,5vw,3.4rem)', fontWeight: 900, lineHeight: 1.1,
            letterSpacing: '-0.025em', textTransform: 'uppercase', marginBottom: 22,
          }}>
            {pt ? (
              <>
                Como Ensinar os Livros<br />
                <span style={{ color: C.blue }}>da Bíblia</span>{' '}
                <span style={{ color: C.gold }}>com Profundidade</span>
              </>
            ) : (
              <>
                How to Teach Bible Books<br />
                <span style={{ color: C.blue }}>with Depth</span>{' '}
                <span style={{ color: C.gold }}>& Method</span>
              </>
            )}
          </h1>

          <p style={{ fontSize: 'clamp(0.95rem,1.8vw,1.1rem)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: 36, maxWidth: 620, margin: '0 auto 36px' }}>
            {pt
              ? 'Metodologias educacionais cristãs reformadas integradas a estratégias ativas de aprendizagem para o ensino dos livros da Bíblia — da célula ao seminário, da família à escola dominical.'
              : 'Reformed Christian educational methodologies integrated with active learning strategies for teaching Bible books — from cell group to seminary, from family to Sunday school.'}
          </p>

          {/* stat strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {[
              { value: '7',  label: pt ? 'Educadores' : 'Educators',     cor: C.blue  },
              { value: '21', label: pt ? 'Metodologias' : 'Methodologies', cor: C.green },
              { value: '66', label: pt ? 'Livros' : 'Books',              cor: C.gold  },
            ].map(stat => (
              <div key={stat.label} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '14px 24px', borderRadius: 16,
                background: `${stat.cor}0C`, border: `1px solid ${stat.cor}30`,
                minWidth: 90,
              }}>
                <span style={{ fontSize: 'clamp(1.5rem,4vw,2rem)', fontWeight: 900, color: stat.cor, lineHeight: 1 }}>
                  {stat.value}
                </span>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.50)', letterSpacing: '0.16em', textTransform: 'uppercase', marginTop: 5 }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Educadores Reformados ─────────────────────────────── */}
        <section id="autores" style={{ ...Wfull, marginBottom: 88 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 36, textAlign: 'center' }}
          >
            <div style={{ fontSize: 11, fontWeight: 900, color: C.blue, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 10 }}>
              {pt ? 'Autores & Pensadores' : 'Authors & Thinkers'}
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.015em', marginBottom: 12 }}>
              {pt ? 'Grandes Educadores da Tradição Cristã Reformada' : 'Great Educators of the Reformed Christian Tradition'}
            </h2>
            <p style={{ fontSize: 'clamp(0.88rem,1.5vw,1rem)', color: 'rgba(255,255,255,0.65)', maxWidth: 580, margin: '0 auto', lineHeight: 1.70 }}>
              {pt
                ? 'Da Holanda do século XIX às universidades norte-americanas do século XXI — pensadores que fundamentaram a educação cristã em bases teológicas sólidas e metodologias de excelência.'
                : 'From 19th-century Holland to 21st-century American universities — thinkers who grounded Christian education in solid theological foundations and methods of excellence.'}
            </p>
          </motion.div>

          {/* ── grid de cards de autores ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(260px, 30vw, 320px), 1fr))',
            gap: 16,
          }}>
            {AUTORES_EDUCACAO.map((autor, i) => {
              const isOpen = autorExpandido === i;
              return (
                <motion.div
                  key={autor.nome}
                  layout
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, layout: { duration: 0.3 } }}
                  style={{
                    borderRadius: 20, overflow: 'hidden',
                    background: isOpen
                      ? `linear-gradient(145deg, ${autor.cor}14 0%, rgba(255,255,255,0.03) 100%)`
                      : 'rgba(255,255,255,0.035)',
                    border: `1px solid ${isOpen ? autor.cor + '55' : 'rgba(255,255,255,0.08)'}`,
                    boxShadow: isOpen ? `0 12px 40px ${autor.cor}18, 0 0 0 1px ${autor.cor}15` : 'none',
                    transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
                    cursor: 'pointer',
                  }}
                  onClick={() => setAutorExpandido(isOpen ? null : i)}
                >
                  {/* Card top — always visible */}
                  <div style={{ padding: '22px 22px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
                      {/* Avatar with photo + icon badge */}
                      <motion.div
                        animate={{ scale: isOpen ? 1.08 : 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                        style={{ position: 'relative', flexShrink: 0 }}
                      >
                        {/* Photo or initials fallback */}
                        {autor.foto ? (
                          <div style={{ position: 'relative', width: 64, height: 64 }}>
                            <img
                              src={autor.foto}
                              alt={autor.nome}
                              onError={(e) => {
                                const t = e.currentTarget;
                                t.style.display = 'none';
                                const fb = t.nextElementSibling as HTMLElement;
                                if (fb) fb.style.display = 'flex';
                              }}
                              style={{
                                width: 64, height: 64, borderRadius: 16, objectFit: 'cover',
                                border: `2px solid ${autor.cor}70`,
                                boxShadow: isOpen ? `0 0 24px ${autor.cor}40` : `0 2px 8px rgba(0,0,0,0.5)`,
                                display: 'block',
                                transition: 'box-shadow 0.3s',
                                filter: 'grayscale(20%) contrast(1.05)',
                              }}
                            />
                            {/* Fallback initials (hidden while img loads) */}
                            <div style={{
                              display: 'none', width: 64, height: 64, borderRadius: 16,
                              alignItems: 'center', justifyContent: 'center',
                              background: `linear-gradient(135deg, ${autor.cor}35, ${autor.cor}12)`,
                              border: `2px solid ${autor.cor}60`,
                              fontSize: 20, fontWeight: 900, color: autor.cor,
                              position: 'absolute', top: 0, left: 0,
                            }}>
                              {autor.nome.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
                            </div>
                          </div>
                        ) : (
                          <div style={{
                            width: 64, height: 64, borderRadius: 16,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: `linear-gradient(135deg, ${autor.cor}35, ${autor.cor}12)`,
                            border: `2px solid ${autor.cor}60`,
                            fontSize: 20, fontWeight: 900, color: autor.cor,
                            boxShadow: isOpen ? `0 0 24px ${autor.cor}35` : 'none',
                            transition: 'box-shadow 0.3s',
                          }}>
                            {autor.nome.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
                          </div>
                        )}
                        {/* SVG icon badge */}
                        {autor.icone && (
                          <motion.div
                            animate={{ scale: isOpen ? 1.1 : 1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            title={autor.iconeLabel}
                            style={{
                              position: 'absolute', bottom: -6, right: -8,
                              width: 26, height: 26, borderRadius: 8,
                              background: `linear-gradient(135deg, ${autor.cor}40, ${autor.cor}18)`,
                              border: `1.5px solid ${autor.cor}70`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              boxShadow: `0 2px 8px ${autor.cor}30`,
                              backdropFilter: 'blur(8px)',
                            }}
                          >
                            {autor.icone}
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Expand indicator */}
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0, background: isOpen ? `${autor.cor}25` : 'rgba(255,255,255,0.05)' }}
                        transition={{ duration: 0.2 }}
                        style={{
                          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          border: `1px solid ${isOpen ? autor.cor + '50' : 'rgba(255,255,255,0.09)'}`,
                        }}
                      >
                        <ChevronRight size={14} color={isOpen ? autor.cor : C.muted} />
                      </motion.div>
                    </div>

                    {/* Name & country */}
                    <div style={{ marginBottom: 6 }}>
                      <div style={{ fontSize: 'clamp(13px,1.7vw,15px)', fontWeight: 900, color: C.white, lineHeight: 1.2 }}>
                        {autor.nome}
                      </div>
                      <div style={{ fontSize: 10, color: C.muted, marginTop: 3, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <span>{autor.pais}</span>
                        {autor.periodo && <span style={{ color: `${autor.cor}90` }}>· {autor.periodo}</span>}
                      </div>
                    </div>

                    {/* Work */}
                    <div style={{
                      fontSize: 11, fontWeight: 700, color: autor.cor,
                      lineHeight: 1.35, opacity: 0.9,
                    }}>
                      {autor.obra}
                    </div>

                    {/* Method tags — always visible */}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
                      {autor.metodos.map((m: string) => (
                        <span key={m} style={{
                          padding: '3px 10px', borderRadius: 99,
                          background: `${autor.cor}12`, border: `1px solid ${autor.cor}30`,
                          fontSize: 10, fontWeight: 700, color: autor.cor,
                          letterSpacing: '0.06em',
                        }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expandable detail */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '0 22px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                          <div style={{ height: 1, background: `linear-gradient(90deg, ${autor.cor}50, transparent)` }} />
                          {/* Quote */}
                          <div style={{
                            padding: '12px 14px', borderRadius: 12,
                            background: `${autor.cor}0D`, borderLeft: `3px solid ${autor.cor}`,
                          }}>
                            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.88)', fontStyle: 'italic', lineHeight: 1.68, margin: 0 }}>
                              {autor.citacao}
                            </p>
                          </div>
                          {/* Description */}
                          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.70)', lineHeight: 1.72, margin: 0 }}>
                            {autor.descricao}
                          </p>

                          {/* ABNT References */}
                          <div style={{
                            padding: '11px 14px', borderRadius: 11,
                            background: 'rgba(255,255,255,0.025)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            display: 'flex', flexDirection: 'column', gap: 7,
                          }}>
                            <div style={{
                              fontSize: 9, fontWeight: 900, letterSpacing: '0.2em',
                              textTransform: 'uppercase', color: C.muted, marginBottom: 2,
                            }}>
                              Referências — ABNT
                            </div>
                            {autor.abnt.map((ref: string, ri: number) => (
                              <p key={ri} style={{
                                fontSize: 10, color: 'rgba(255,255,255,0.38)',
                                lineHeight: 1.60, margin: 0, fontStyle: 'italic',
                                paddingLeft: 10,
                                borderLeft: `1px solid ${autor.cor}40`,
                              }}>
                                {ref}
                              </p>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom glow bar */}
                  <motion.div
                    animate={{ scaleX: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
                    style={{
                      height: 3,
                      background: `linear-gradient(90deg, transparent, ${autor.cor}, transparent)`,
                      transformOrigin: 'center',
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Metodologias Ativas ───────────────────────────────── */}
        <section id="metodologias" style={{ ...Wfull, marginBottom: 88 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 36, textAlign: 'center' }}
          >
            <div style={{ fontSize: 11, fontWeight: 900, color: C.green, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 10 }}>
              {pt ? 'Estratégias de Ensino' : 'Teaching Strategies'}
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.015em', marginBottom: 12 }}>
              {pt ? 'Metodologias Ativas para o Ensino Bíblico' : 'Active Learning Methodologies for Biblical Teaching'}
            </h2>
            <p style={{ fontSize: 'clamp(0.88rem,1.5vw,1rem)', color: 'rgba(255,255,255,0.65)', maxWidth: 580, margin: '0 auto', lineHeight: 1.70 }}>
              {pt
                ? 'O ensino passivo gera ouvintes; o ensino ativo gera discípulos. Estratégias comprovadas que transformam a exposição bíblica em experiência de descoberta e formação.'
                : 'Passive teaching produces listeners; active teaching produces disciples. Proven strategies that transform biblical exposition into an experience of discovery and formation.'}
            </p>
          </motion.div>

          <MetodologiasGrid pt={pt} />
        </section>

        {/* ── Livros da Bíblia ──────────────────────────────────── */}
        <section id="livros" style={{ ...Wfull, marginBottom: 64 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 36, textAlign: 'center' }}
          >
            <div style={{ fontSize: 11, fontWeight: 900, color: C.gold, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 10 }}>
              {pt ? 'Livros da Bíblia' : 'Bible Books'}
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.015em', marginBottom: 12 }}>
              {pt ? 'Escolha um Livro para Estudar' : 'Choose a Book to Study'}
            </h2>
            <p style={{ fontSize: 'clamp(0.88rem,1.5vw,1rem)', color: 'rgba(255,255,255,0.65)', maxWidth: 520, margin: '0 auto', lineHeight: 1.70 }}>
              {pt
                ? 'Josué já está disponível com estrutura quiástica completa por perícopes. Os demais livros serão adicionados progressivamente.'
                : 'Joshua is already available with complete chiastic structure by pericopes. Other books will be added progressively.'}
            </p>
          </motion.div>

          <BibleBooksGrid pt={pt} onSelectJosue={handleSelectJosue} />
        </section>

        {/* ── Josué Perícopes ───────────────────────────────────── */}
        <AnimatePresence>
          {showJosue && (
            <motion.section
              id="educacao-josue"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              style={{
                ...Wfull, marginBottom: 72,
                padding: 'clamp(20px,4vw,30px) clamp(16px,4vw,28px)',
                borderRadius: 20,
                background: `linear-gradient(135deg, ${C.atColor}08 0%, rgba(255,255,255,0.02) 100%)`,
                border: `1px solid ${C.atColor}30`,
              }}
            >
              <JosuePericopesSection pt={pt} />
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── CTA Final ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            ...W,
            padding: 'clamp(28px,5vw,44px) clamp(18px,5vw,40px)',
            borderRadius: 22, textAlign: 'center',
            background: `linear-gradient(135deg, ${C.blue}0D 0%, ${C.green}09 100%)`,
            border: `1px solid ${C.blue}30`,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 900, color: C.blue, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>
            {pt ? 'Pronto para começar?' : 'Ready to start?'}
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem,2.8vw,1.9rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.015em', marginBottom: 14 }}>
            {pt ? 'Explore os Recursos da Plataforma' : 'Explore Platform Resources'}
          </h2>
          <p style={{ fontSize: 'clamp(0.88rem,1.5vw,1rem)', color: 'rgba(255,255,255,0.68)', maxWidth: 460, margin: '0 auto 28px', lineHeight: 1.68 }}>
            {pt
              ? 'Biblioteca, devocional diário, esboços homiléticos e infográficos — todos integrados às metodologias apresentadas nesta página.'
              : 'Library, daily devotional, homiletic outlines and infographics — all integrated with the methodologies presented on this page.'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            {[
              { label: pt ? 'Biblioteca' : 'Library',   to: '/biblioteca', cor: C.blue  },
              { label: pt ? 'Devocional' : 'Devotional', to: '/devocional', cor: C.green },
              { label: pt ? 'Pregação'  : 'Preaching',  to: '/pregacao',   cor: C.gold  },
              { label: pt ? 'Família'   : 'Family',     to: '/familia',    cor: C.rose  },
            ].map(item => (
              <Link
                key={item.label}
                to={item.to}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '11px 22px', borderRadius: 22, textDecoration: 'none',
                  background: `${item.cor}15`, border: `1px solid ${item.cor}45`,
                  fontSize: 12, fontWeight: 900, color: item.cor,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  transition: 'all 0.18s',
                }}
              >
                {item.label}
                <ChevronRight size={13} />
              </Link>
            ))}
          </div>
        </motion.div>

      </div>

      <Footer />
    </div>
  );
}
