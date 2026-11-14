import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, ChevronRight, BookOpen, ExternalLink, Landmark, ScrollText, Library } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type Secao = 'teologia' | 'politica';

interface Livro {
  slug: string;
  secao: Secao;
  titulo: string;
  subtitulo: string;
  autor: string;
  ano: string;
  editora: string;
  capa: string;
  categorias: string[];
  sinopse: string;
  destaque?: boolean;
  accentColor: string;
  /** rota interna com estudo completo */
  rota?: string;
  /** link externo (loja) quando ainda não há página interna */
  externo?: string;
}

const LIVROS: Livro[] = [
  {
    slug: 'is-there-meaning',
    secao: 'teologia',
    titulo: 'Is There Meaning in This Text?',
    subtitulo: 'The Bible, the Reader, and the Morality of Literary Knowledge',
    autor: 'Kevin J. Vanhoozer',
    ano: '1998',
    editora: 'Zondervan',
    capa: '/livros/is-there-meaning.jpg',
    categorias: ['Hermenêutica', 'Filosofia da Linguagem'],
    sinopse:
      'Um dos livros mais importantes sobre hermenêutica bíblica. Vanhoozer responde à crise interpretativa pós-moderna com rigor filosófico e profundidade teológica, defendendo que o texto tem um significado real, determinado pelo autor, e que interpretá-lo bem é um ato moral.',
    destaque: true,
    accentColor: '#a855f7',
    rota: '/biblioteca/livros/is-there-meaning',
  },
  {
    slug: 'os-batistas-e-a-biblia',
    secao: 'teologia',
    titulo: 'Os Batistas e a Bíblia',
    subtitulo: 'Capítulos, Teólogos e Obras: 4 séculos de história batista',
    autor: 'L. Russ Bush & Tom J. Nettles',
    ano: 'ed. brasileira',
    editora: 'Ortodoxia Batista',
    capa: '/livros/os-batistas-e-a-biblia.jpg',
    categorias: ['História Batista', 'Bibliologia'],
    sinopse:
      'Uma obra monumental que percorre quatro séculos em 19 capítulos e 36 teólogos, de John Smyth (1609) a Ralph Elliott (anos 1960), mostrando que a fidelidade à Escritura inspirada, infalível e autoridade final sempre foi o fundamento e o campo de batalha da identidade batista.',
    destaque: true,
    accentColor: '#f97316',
    rota: '/biblioteca/livros/os-batistas-e-a-biblia',
  },
  {
    slug: 'como-ser-um-conservador',
    secao: 'politica',
    titulo: 'Como Ser um Conservador',
    subtitulo: 'How to Be a Conservative',
    autor: 'Roger Scruton',
    ano: '2015',
    editora: 'Record',
    capa: '/livros/como-ser-um-conservador.jpg',
    categorias: ['Conservadorismo', 'Filosofia Política'],
    sinopse:
      'O filósofo inglês Roger Scruton apresenta o conservadorismo não como ideologia, mas como a defesa daquilo que amamos e herdamos: família, comunidade, instituições, religião e cultura. Em diálogo com o liberalismo, o socialismo e o multiculturalismo, mostra o que vale a pena preservar e por quê.',
    destaque: true,
    accentColor: '#3b82f6',
    rota: '/biblioteca/livros/como-ser-um-conservador',
  },
];

const SECOES: { id: Secao; titulo: string; descricao: string; icon: typeof BookOpen; cor: string }[] = [
  {
    id: 'teologia',
    titulo: 'Teologia & Hermenêutica',
    descricao: 'Obras que formam o intérprete e o pregador fiel às Escrituras.',
    icon: ScrollText,
    cor: '#a855f7',
  },
  {
    id: 'politica',
    titulo: 'Política & Conservadorismo',
    descricao: 'Pensamento político, ordem social e a tradição conservadora à luz da fé.',
    icon: Landmark,
    cor: '#3b82f6',
  },
];

type Filtro = 'todos' | Secao;

function Capa({ livro }: { livro: Livro }) {
  return (
    <div className="relative w-[120px] sm:w-[140px] shrink-0">
      <div
        className="absolute -inset-3 rounded-2xl blur-2xl opacity-25 group-hover:opacity-50 transition-opacity duration-500"
        style={{ background: livro.accentColor }}
      />
      <img
        src={livro.capa}
        alt={`Capa de ${livro.titulo}`}
        loading="lazy"
        className="relative w-full rounded-lg shadow-[0_18px_40px_rgba(0,0,0,0.65)] ring-1 ring-white/15 group-hover:-translate-y-1 group-hover:-rotate-1 transition-transform duration-500"
        style={{ aspectRatio: '2/3', objectFit: 'cover' }}
        onError={e => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling?.classList.remove('hidden');
        }}
      />
      <div
        className="hidden relative w-full rounded-lg ring-1 ring-white/15 bg-white/5 flex flex-col items-center justify-center p-3 gap-2"
        style={{ aspectRatio: '2/3' }}
      >
        <BookOpen className="w-8 h-8 text-white/50" strokeWidth={1} />
        <span className="text-white/60 text-xs text-center font-bold">{livro.titulo}</span>
      </div>
    </div>
  );
}

function CardLivro({ livro, i }: { livro: Livro; i: number }) {
  const conteudo = (
    <>
      {/* faixa de cor no topo */}
      <div
        className="absolute inset-x-0 top-0 h-[3px] opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${livro.accentColor}, transparent)` }}
      />
      {/* brilho de fundo */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-[0.12] group-hover:opacity-25 transition-opacity duration-500"
        style={{ background: livro.accentColor }}
      />

      <div className="relative flex gap-5 sm:gap-6">
        <Capa livro={livro} />

        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {livro.destaque && (
              <span
                className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ color: livro.accentColor, background: livro.accentColor + '1f', border: `1px solid ${livro.accentColor}40` }}
              >
                <Star className="w-2.5 h-2.5 fill-current" />
                Destaque
              </span>
            )}
            <span className="text-[11px] font-black uppercase tracking-widest text-white/55">{livro.ano}</span>
          </div>

          <h3 className="font-display font-black text-xl sm:text-2xl text-white leading-tight mb-1">
            {livro.titulo}
          </h3>
          <p className="text-white/70 text-sm italic mb-2 line-clamp-2">{livro.subtitulo}</p>
          <p className="text-[13px] font-bold uppercase tracking-wider mb-3" style={{ color: livro.accentColor }}>
            {livro.autor}
            <span className="text-white/50"> · {livro.editora}</span>
          </p>
          <p className="hidden sm:block text-white/80 text-[15px] leading-relaxed line-clamp-4">{livro.sinopse}</p>
        </div>
      </div>

      <p className="sm:hidden relative mt-4 text-white/80 text-[15px] leading-relaxed line-clamp-5">{livro.sinopse}</p>

      <div className="relative mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {livro.categorias.map(c => (
            <span
              key={c}
              className="px-2 py-0.5 rounded-md text-[11px] font-black uppercase tracking-widest text-white/75 bg-white/[0.06] border border-white/10"
            >
              {c}
            </span>
          ))}
        </div>
        <span
          className="flex items-center gap-1.5 text-[13px] font-black uppercase tracking-widest transition-all duration-200 group-hover:gap-2.5"
          style={{ color: livro.accentColor }}
        >
          {livro.rota ? (
            <>
              Ver estudo
              <ChevronRight className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              Ver na Amazon
              <ExternalLink className="w-3.5 h-3.5" />
            </>
          )}
        </span>
      </div>
    </>
  );

  const cls =
    'group relative overflow-hidden flex flex-col h-full p-5 sm:p-6 rounded-3xl bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-white/25 hover:bg-white/[0.05] hover:shadow-2xl transition-all duration-300';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ delay: i * 0.06 }}
      className="h-full"
    >
      {livro.rota ? (
        <Link to={livro.rota} className={cls}>
          {conteudo}
        </Link>
      ) : (
        <a href={livro.externo} target="_blank" rel="noopener noreferrer" className={cls}>
          {conteudo}
        </a>
      )}
    </motion.div>
  );
}

export default function BibliotecaLivrosPage() {
  const [filtro, setFiltro] = useState<Filtro>('todos');

  const filtros: { id: Filtro; label: string; count: number }[] = [
    { id: 'todos', label: 'Todos', count: LIVROS.length },
    ...SECOES.map(s => ({ id: s.id as Filtro, label: s.titulo, count: LIVROS.filter(l => l.secao === s.id).length })),
  ];

  const secoesVisiveis = SECOES.filter(s => filtro === 'todos' || filtro === s.id);

  return (
    <div className="min-h-screen relative">
      <Navbar />

      <section className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-10 text-[13px] font-black uppercase tracking-widest text-white/60"
          >
            <Link to="/biblioteca" className="hover:text-brand-blue transition-colors">Biblioteca</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80">Livros Recomendados</span>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-950/80 to-black/60 p-6 sm:p-10 mb-10"
          >
            <div className="pointer-events-none absolute -top-32 -right-20 w-80 h-80 rounded-full bg-brand-blue/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 w-72 h-72 rounded-full bg-violet-600/15 blur-3xl" />

            <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <p className="flex items-center gap-2 text-[13px] font-black tracking-[0.35em] uppercase text-brand-blue mb-3">
                  <Library className="w-4 h-4" />
                  Seleção Curada
                </p>
                <h1 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight mb-3">
                  Livros Recomendados
                </h1>
                <p className="text-white/70 text-base sm:text-lg max-w-xl leading-relaxed">
                  Obras selecionadas que moldam pregadores, teólogos e estudiosos sérios da Palavra, e cristãos que pensam a vida pública.
                </p>
              </div>

              <div className="flex gap-3 sm:gap-4">
                {[
                  { n: LIVROS.length, l: 'Livros' },
                  { n: SECOES.length, l: 'Áreas' },
                ].map(s => (
                  <div key={s.l} className="px-5 py-3 rounded-2xl bg-white/[0.05] border border-white/10 text-center">
                    <div className="font-display font-black text-3xl text-white">{s.n}</div>
                    <div className="text-[11px] font-black uppercase tracking-widest text-white/55">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2 mb-12">
            {filtros.map(f => {
              const ativo = filtro === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFiltro(f.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-black uppercase tracking-widest border transition-all ${
                    ativo
                      ? 'bg-white text-slate-950 border-white'
                      : 'bg-white/[0.04] text-white/75 border-white/15 hover:border-white/35 hover:text-white'
                  }`}
                >
                  {f.label}
                  <span className={`text-[11px] px-1.5 rounded-full ${ativo ? 'bg-slate-950/10' : 'bg-white/10'}`}>{f.count}</span>
                </button>
              );
            })}
          </div>

          {/* Seções */}
          <div className="flex flex-col gap-16">
            <AnimatePresence mode="popLayout">
              {secoesVisiveis.map(secao => {
                const livros = LIVROS.filter(l => l.secao === secao.id);
                const Icon = secao.icon;
                return (
                  <motion.section
                    key={secao.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: secao.cor + '1f', border: `1px solid ${secao.cor}40` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: secao.cor }} />
                      </div>
                      <div className="min-w-0">
                        <h2 className="font-display font-black text-xl sm:text-2xl text-white leading-tight">{secao.titulo}</h2>
                        <p className="text-white/60 text-sm sm:text-base">{secao.descricao}</p>
                      </div>
                      <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-white/15 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      {livros.map((livro, i) => (
                        <CardLivro key={livro.slug} livro={livro} i={i} />
                      ))}
                    </div>
                  </motion.section>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Voltar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-14"
          >
            <Link
              to="/biblioteca"
              className="inline-flex items-center gap-2 text-white/65 hover:text-white text-sm font-black uppercase tracking-widest transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar para a Biblioteca
            </Link>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
