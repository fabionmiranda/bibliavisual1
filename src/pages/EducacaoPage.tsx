import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  GraduationCap, BookOpen, Users, Church, School,
  ChevronRight, Layers, LayoutGrid, BookMarked, Heart,
  Star, Lightbulb, MessageSquare, Download
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const C = {
  blue:  '#00d4ff',
  rose:  '#ff3a6e',
  green: '#00e5a0',
  gold:  '#f5c842',
  deep:  '#050714',
  card:  'rgba(255,255,255,0.06)',
  border:'rgba(255,255,255,0.12)',
};

interface AudienceCard {
  icon: React.ReactNode;
  color: string;
  titulo: string;
  subtitulo: string;
  topicos: string[];
}

const AUDIENCIAS: AudienceCard[] = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    color: C.blue,
    titulo: 'Professores & Docentes',
    subtitulo: 'Escolas, faculdades e institutos bíblicos',
    topicos: [
      'Use os diagramas quiásticos como material visual em sala de aula',
      'Integre os mapas estruturais aos planos de aula expositivos',
      'Explore a arquitetura literária para ensinar hermenêutica',
      'Aplique a análise quiástica como ferramenta de interpretação textual',
      'Combine os diagramas com comentários exegéticos clássicos',
    ],
  },
  {
    icon: <Church className="w-6 h-6" />,
    color: C.rose,
    titulo: 'Pastores & Pregadores',
    subtitulo: 'Sermões expositivos e pregação bíblica',
    topicos: [
      'Visualize a estrutura do texto antes de construir o sermão',
      'Identifique o centro quiástico — o foco teológico principal da perícope',
      'Use os diagramas como slides ou quadros de referência na pregação',
      'Apresente a progressão narrativa e teológica do texto à congregação',
      'Planeje séries expositivas a partir da estrutura literária dos livros',
    ],
  },
  {
    icon: <Users className="w-6 h-6" />,
    color: C.green,
    titulo: 'Líderes de Ministério',
    subtitulo: 'Células, grupos de estudo e EBD',
    topicos: [
      'Conduza estudos bíblicos visuais e participativos com o grupo',
      'Use o devocional diário como ponto de partida para o encontro semanal',
      'Apresente o diagrama da perícope e pergunte: "Qual o centro deste texto?"',
      'Aplique a seção "Família" do devocional como reflexão em grupo',
      'Crie dinâmicas de descoberta a partir dos quiasmas apresentados',
    ],
  },
  {
    icon: <Star className="w-6 h-6" />,
    color: C.gold,
    titulo: 'Presbíteros & Diáconos',
    subtitulo: 'Liderança eclesiástica e discipulado',
    topicos: [
      'Aprofunde o conhecimento pessoal das Escrituras com os diagramas',
      'Use as estruturas quiásticas para preparar reuniões de liderança temáticas',
      'Oriente membros da igreja no uso do devocional visual diário',
      'Recomende o material para famílias em processo de discipulado',
      'Integre a leitura estrutural ao plano de formação dos líderes',
    ],
  },
  {
    icon: <School className="w-6 h-6" />,
    color: '#a78bfa',
    titulo: 'Seminários & Institutos',
    subtitulo: 'Formação teológica e acadêmica',
    topicos: [
      'Adote a plataforma como recurso complementar nas disciplinas de AT e NT',
      'Use os mapas literários em aulas de Introdução à Bíblia e Hermenêutica',
      'Promova seminários sobre estrutura quiástica e análise literária bíblica',
      'Incentive alunos a comparar os diagramas com o texto original hebraico/grego',
      'Desenvolva trabalhos acadêmicos a partir das estruturas apresentadas',
    ],
  },
  {
    icon: <Heart className="w-6 h-6" />,
    color: '#fb923c',
    titulo: 'Famílias & Devocionais',
    subtitulo: 'Culto familiar e formação espiritual dos filhos',
    topicos: [
      'Use o devocional diário como guia para o culto familiar vespertino',
      'Leia a perícope em voz alta e mostre o diagrama às crianças',
      'Aplique a seção "Filhos" do devocional em linguagem adequada à idade',
      'Construa hábitos de leitura bíblica estruturada desde a infância',
      'Conecte as histórias bíblicas à estrutura quiástica de forma lúdica',
    ],
  },
];

const COMO_USAR = [
  {
    num: '01',
    cor: C.blue,
    titulo: 'Explore a Biblioteca',
    desc: 'Navegue pelos 66 livros da Bíblia, acesse os diagramas quiásticos e as estruturas literárias completas de cada perícope.',
    link: '/biblioteca',
    label: 'Abrir Biblioteca',
  },
  {
    num: '02',
    cor: C.green,
    titulo: 'Devocional Diário',
    desc: 'Acompanhe o plano de leitura anual com perícopes estruturadas, aplicações para família e meditações expositivas.',
    link: '/devocional',
    label: 'Ver Devocional',
  },
  {
    num: '03',
    cor: C.rose,
    titulo: 'Diagramas & Método',
    desc: 'Entenda a metodologia por trás dos diagramas quiásticos e aprenda a utilizar as estruturas em ensino e pregação.',
    link: '/metodo',
    label: 'Ver Método',
  },
  {
    num: '04',
    cor: C.gold,
    titulo: 'Tutoriais em Vídeo',
    desc: 'Acesse tutoriais práticos sobre como navegar, interpretar e usar os recursos da plataforma em contextos educacionais.',
    link: '/tutoriais',
    label: 'Assistir Tutoriais',
  },
];

const PRINCIPIOS = [
  {
    icon: <Layers className="w-5 h-5" />,
    cor: C.blue,
    titulo: 'Quiasmos & Estrutura Literária',
    desc: 'Os textos bíblicos possuem uma arquitetura intencional. Os quiasmos revelam o coração teológico de cada passagem, transformando a compreensão do texto.',
  },
  {
    icon: <LayoutGrid className="w-5 h-5" />,
    cor: C.green,
    titulo: 'Visualização como Pedagogia',
    desc: 'O cérebro retém até 65% mais informação quando acompanhada de representação visual. Os diagramas tornam o ensino bíblico mais eficaz e memorável.',
  },
  {
    icon: <BookMarked className="w-5 h-5" />,
    cor: C.gold,
    titulo: 'Exegese Fiel ao Texto',
    desc: 'Todo diagrama parte do texto original. A estrutura não é imposta ao texto — ela é revelada por ele. Isso garante integridade hermenêutica e fidelidade exegética.',
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    cor: C.rose,
    titulo: 'Formação, não Informação',
    desc: 'O objetivo não é apenas transmitir dados bíblicos, mas formar discípulos que amam, entendem e vivem as Escrituras com profundidade.',
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    cor: '#a78bfa',
    titulo: 'Diálogo & Contexto',
    desc: 'Cada perícope é contextualizada em seu livro, testamento e cânone. O ensino sai do fragmento para a narrativa redentora completa.',
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    cor: '#fb923c',
    titulo: 'Acesso Universal',
    desc: 'Da criança ao doutor em teologia, os recursos da Bíblia Visual Expositiva são acessíveis, escaláveis e adaptáveis a qualquer contexto de ensino.',
  },
];

export default function EducacaoPage() {
  return (
    <div className="min-h-screen" style={{ background: C.deep, color: '#fff' }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-12"
            style={{ background: `radial-gradient(circle, ${C.blue}, transparent 70%)`, filter: 'blur(80px)' }} />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, ${C.rose}, transparent 70%)`, filter: 'blur(100px)' }} />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-7"
              style={{ borderColor: `${C.blue}55`, background: `${C.blue}12` }}>
              <GraduationCap className="w-4 h-4" style={{ color: C.blue }} />
              <span className="text-sm font-black uppercase tracking-widest" style={{ color: C.blue }}>
                Educação & Formação
              </span>
            </div>

            <h1 className="font-black uppercase leading-none mb-7"
              style={{ fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', letterSpacing: '-0.02em' }}>
              Bíblia Visual Expositiva<br />
              <span style={{ color: C.blue }}>no Ensino</span>{' '}
              <span style={{ color: C.rose }}>& na Igreja</span>
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', color: 'rgba(255,255,255,0.82)', maxWidth: 680, margin: '0 auto', lineHeight: 1.7 }}>
              Recursos, orientações e estratégias para docentes, pastores, líderes,
              seminários e instituições usarem os diagramas e materiais da plataforma
              com excelência no ensino e discipulado bíblico.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Princípios pedagógicos */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <p className="text-sm font-black uppercase tracking-widest mb-3" style={{ color: C.blue }}>
              Fundamentos
            </p>
            <h2 className="font-black uppercase" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}>
              Por que usar a Bíblia Visual Expositiva?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRINCIPIOS.map((p, i) => (
              <motion.div
                key={p.titulo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="rounded-2xl p-6 border flex flex-col gap-4"
                style={{ background: C.card, borderColor: C.border }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${p.cor}22`, color: p.cor, border: `1px solid ${p.cor}40` }}>
                  {p.icon}
                </div>
                <div>
                  <p className="font-bold text-base text-white mb-2">{p.titulo}</p>
                  <p className="leading-relaxed" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)' }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Como usar */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <p className="text-sm font-black uppercase tracking-widest mb-3" style={{ color: C.green }}>
              Começando
            </p>
            <h2 className="font-black uppercase" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}>
              Como utilizar os recursos
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COMO_USAR.map((item, i) => (
              <motion.div
                key={item.titulo}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="rounded-2xl p-6 border flex flex-col gap-4 group"
                style={{ background: C.card, borderColor: C.border }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-black leading-none" style={{ fontSize: '2.2rem', color: `${item.cor}55` }}>
                    {item.num}
                  </span>
                  <div className="w-px h-8" style={{ background: `${item.cor}40` }} />
                  <p className="font-black text-sm uppercase tracking-wide" style={{ color: item.cor }}>
                    {item.titulo}
                  </p>
                </div>
                <p className="leading-relaxed flex-1" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.78)' }}>
                  {item.desc}
                </p>
                <Link
                  to={item.link}
                  className="flex items-center gap-1.5 font-black uppercase tracking-widest transition-all group-hover:gap-2.5"
                  style={{ fontSize: '0.75rem', color: item.cor }}
                >
                  {item.label}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audiências */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <p className="text-sm font-black uppercase tracking-widest mb-3" style={{ color: C.rose }}>
              Orientações por Perfil
            </p>
            <h2 className="font-black uppercase mb-4" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}>
              Para quem é este material?
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.72)', maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
              Orientações específicas para cada tipo de educador, líder e contexto de uso.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {AUDIENCIAS.map((a, i) => (
              <motion.div
                key={a.titulo}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="rounded-2xl border overflow-hidden flex flex-col"
                style={{ background: C.card, borderColor: C.border }}
              >
                {/* Header */}
                <div className="px-6 py-5 border-b flex items-start gap-3"
                  style={{ borderColor: C.border, background: `${a.color}10` }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${a.color}22`, color: a.color, border: `1px solid ${a.color}40` }}>
                    {a.icon}
                  </div>
                  <div>
                    <p className="font-black text-base text-white leading-tight">{a.titulo}</p>
                    <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.62)' }}>{a.subtitulo}</p>
                  </div>
                </div>

                {/* Tópicos */}
                <ul className="px-6 py-5 flex flex-col gap-3 flex-1">
                  {a.topicos.map((t, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: a.color }} />
                      <span className="leading-relaxed" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.80)' }}>{t}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Boas Práticas */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border p-8 md:p-12"
            style={{ background: `linear-gradient(135deg, ${C.blue}0F 0%, ${C.rose}0F 100%)`, borderColor: `${C.blue}30` }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `${C.blue}22`, color: C.blue, border: `1px solid ${C.blue}40` }}>
                <Download className="w-5 h-5" />
              </div>
              <div>
                <p className="font-black text-white text-lg uppercase tracking-wide">Boas Práticas no Uso</p>
                <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.62)' }}>Para maximizar o impacto do ensino visual</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  titulo: 'Antes do Ensino',
                  items: [
                    'Leia a perícope no texto original ou em uma tradução literal',
                    'Visualize o diagrama quiástico completo da passagem',
                    'Identifique o centro quiástico e formule a ideia central do texto',
                    'Prepare perguntas de reflexão baseadas na estrutura do quiasma',
                  ],
                },
                {
                  titulo: 'Durante o Ensino',
                  items: [
                    'Apresente o diagrama projetado ou impresso para os alunos',
                    'Leia o texto em paralelo com a estrutura visual do diagrama',
                    'Explore os pares quiásticos: como A corresponde a A\', B a B\'',
                    'Conduza ao centro: "Qual a mensagem principal que o autor destaca?"',
                  ],
                },
                {
                  titulo: 'Após o Ensino',
                  items: [
                    'Encoraje os alunos a fazerem anotações no diagrama',
                    'Proponha memorização do versículo central do quiasma',
                    'Use as aplicações de família como tarefa para a semana',
                    'Crie um portfólio de perícopes estudadas ao longo do semestre',
                  ],
                },
                {
                  titulo: 'Em Contexto Eclesiástico',
                  items: [
                    'Distribua o diagrama como material de apoio ao sermão dominical',
                    'Crie um caderno de estudo anual baseado no plano devocional',
                    'Use os quiasmas em cultos de jovens e adolescentes como dinâmica',
                    'Integre a Bíblia Visual Expositiva ao programa de EBD da igreja',
                  ],
                },
              ].map((bloco, i) => (
                <div key={i}>
                  <p className="font-black text-sm uppercase tracking-widest mb-4"
                    style={{ color: i % 2 === 0 ? C.blue : C.green }}>
                    {bloco.titulo}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {bloco.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: i % 2 === 0 ? C.blue : C.green }} />
                        <span className="leading-relaxed" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.82)' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: C.gold }}>
              Pronto para começar?
            </p>
            <h2 className="font-black uppercase mb-5" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}>
              Explore os Recursos da Plataforma
            </h2>
            <p className="mb-10 leading-relaxed max-w-xl mx-auto"
              style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.75)' }}>
              Acesse a biblioteca completa com os 66 livros da Bíblia, os diagramas quiásticos,
              o devocional diário e os tutoriais de uso. Tudo disponível gratuitamente.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/biblioteca"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                style={{ background: C.blue, color: C.deep }}
              >
                Acessar Biblioteca
              </Link>
              <Link
                to="/devocional"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest border transition-all hover:scale-105 active:scale-95"
                style={{ borderColor: `${C.blue}55`, color: C.blue }}
              >
                Ver Devocional
              </Link>
              <a
                href="https://chat.whatsapp.com/HEIIFYAmLij62M0jRwwVhH"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest border transition-all hover:scale-105 active:scale-95"
                style={{ borderColor: `${C.green}55`, color: C.green }}
              >
                Entrar no Clube
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
