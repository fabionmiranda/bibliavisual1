import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Cpu, BookOpen, GraduationCap, ArrowRight,
  Languages, Target, Layout, Activity,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PREVIEW_DIAGRAMAS = [
  { label: 'Interlinear',        color: '#00d4ff' },
  { label: 'Quiástico',          color: '#ff2d55' },
  { label: 'Sintático',          color: '#00d4ff' },
  { label: 'Semântico',          color: '#a855f7' },
  { label: 'Cristológico',       color: '#a855f7' },
  { label: 'Progressivo',        color: '#ff2d55' },
  { label: 'Homilético',         color: '#00d4ff' },
  { label: 'Pastoral prático',   color: '#a855f7' },
];

const CARDS = [
  {
    id: 'o-que-sao',
    label: 'O que são os Diagramas?',
    descricao:
      'Conheça os 23 diagramas de exegese — uma metodologia científica e teológica que esgota o texto bíblico através de perspectivas únicas.',
    cta: 'Conhecer o método',
    path: '/metodo',
    accentColor: '#a855f7',
    gradFrom: 'from-violet-950 via-purple-950',
    icon: Cpu,
    preview: (
      <div className="grid grid-cols-2 gap-1.5 mt-6">
        {PREVIEW_DIAGRAMAS.map(d => (
          <div
            key={d.label}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08]"
          >
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: d.color }} />
            <span className="text-[9px] font-bold text-white/60 truncate">{d.label}</span>
          </div>
        ))}
        <div className="col-span-2 flex items-center justify-center px-2.5 py-1.5 rounded-lg border border-dashed border-white/10">
          <span className="text-[9px] font-bold text-white/25">+ 15 outros diagramas</span>
        </div>
      </div>
    ),
  },
  {
    id: 'veja-diagramas',
    label: 'Veja os Diagramas',
    descricao:
      'Acesse toda a biblioteca de livros bíblicos mapeados com os diagramas exegéticos — do Gênesis ao Apocalipse.',
    cta: 'Abrir biblioteca',
    path: '/diagramas',
    accentColor: '#00d4ff',
    gradFrom: 'from-blue-950 via-cyan-950',
    icon: BookOpen,
    preview: (
      <div className="mt-6 space-y-2">
        {[
          { nome: 'Antigo Testamento', qtd: '39 livros', cor: '#00d4ff' },
          { nome: 'Novo Testamento',   qtd: '27 livros', cor: '#ff2d55' },
        ].map(t => (
          <div
            key={t.nome}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08]"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: t.cor }} />
              <span className="text-xs font-bold text-white/70">{t.nome}</span>
            </div>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ color: t.cor, background: t.cor + '18' }}>
              {t.qtd}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-center gap-1.5 pt-1 opacity-40">
          {[Languages, Target, Layout, Activity].map((Ic, i) => (
            <Ic key={i} className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
          ))}
          <span className="text-[9px] font-bold text-white ml-0.5">23 perspectivas</span>
        </div>
      </div>
    ),
  },
  {
    id: 'tutoriais',
    label: 'Tutoriais',
    descricao:
      'Aprenda como interpretar e usar cada tipo de diagrama — passo a passo, de forma didática e acessível.',
    cta: 'Ver tutoriais',
    path: '/tutoriais',
    accentColor: '#ff2d55',
    gradFrom: 'from-rose-950 via-pink-950',
    icon: GraduationCap,
    preview: (
      <div className="mt-6 space-y-2">
        {[
          'Como ler um diagrama quiástico',
          'Entendendo o diagrama interlinear',
          'Usando o diagrama homilético',
          'Diagrama cristológico na prática',
        ].map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08]"
          >
            <span
              className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0 text-[9px] font-black"
              style={{ background: '#ff2d5520', color: '#ff2d55', border: '1px solid #ff2d5530' }}
            >
              {i + 1}
            </span>
            <span className="text-[10px] font-bold text-white/60 leading-snug">{t}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export default function AcessarPage() {
  return (
    <div className="min-h-screen relative">
      <Navbar />

      <section className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14 sm:mb-18"
          >
            <p className="text-[10px] font-black tracking-[0.35em] uppercase text-brand-blue mb-3">
              Por onde começar?
            </p>
            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4">
              Acesse a Plataforma
            </h1>
            <p className="text-white/40 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
              Escolha como deseja entrar — conheça o método, explore os diagramas
              ou aprenda com os tutoriais.
            </p>
          </motion.div>

          {/* 3 Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            {CARDS.map((card, i) => {
              const Icone = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.45 }}
                >
                  <Link
                    to={card.path}
                    className={`group flex flex-col h-full p-7 sm:p-8 rounded-3xl bg-gradient-to-br ${card.gradFrom} to-slate-950 border border-white/10 hover:border-white/25 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] transition-all duration-300`}
                  >
                    {/* Ícone */}
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shrink-0"
                      style={{ background: card.accentColor + '18', border: `1px solid ${card.accentColor}35` }}
                    >
                      <Icone className="w-6 h-6" style={{ color: card.accentColor }} strokeWidth={1.5} />
                    </div>

                    {/* Texto */}
                    <h2 className="font-display font-black text-xl sm:text-2xl text-white leading-tight mb-3">
                      {card.label}
                    </h2>
                    <p className="text-white/45 text-sm leading-relaxed">
                      {card.descricao}
                    </p>

                    {/* Preview interno */}
                    {card.preview}

                    {/* CTA */}
                    <div
                      className="flex items-center gap-2 mt-7 font-black text-xs uppercase tracking-widest transition-all duration-200 group-hover:gap-3"
                      style={{ color: card.accentColor }}
                    >
                      {card.cta}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
