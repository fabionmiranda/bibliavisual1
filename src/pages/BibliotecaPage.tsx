import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  BookMarked, Star, User, FileText, BookOpen, BookOpenText,
  Layers, Search, Mic2, Landmark, Handshake, Cross,
  ChevronRight, GraduationCap, Compass, Sparkles, Library, X, ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import VideoIntro from '../components/VideoIntro';
import Footer from '../components/Footer';
import { ARTIGOS_TEOLOGIA } from '../data/teologia';
import { LEITURAS_SCRUTON } from '../data/scrutonLeituras';
import { useLanguage } from '../contexts/LanguageContext';

const ARTIGOS_COUNT = ARTIGOS_TEOLOGIA.filter(a => a.area === 'artigos' && a.status === 'publicado').length;
const CAPS_GUIADOS = Object.keys(LEITURAS_SCRUTON).length;
const LIVROS_COUNT = 3;
const CAPAS = ['/livros/como-ser-um-conservador.jpg', '/livros/is-there-meaning.jpg', '/livros/os-batistas-e-a-biblia.jpg'];

type Grupo = 'estudar' | 'ler' | 'pesquisar';

interface Colecao {
  icon: LucideIcon;
  label: string;
  descricao: string;
  accent: string;
  path: string;
  badge?: string;
  grupo: Grupo;
}

/* ─── dados ────────────────────────────────────────────────────────────────── */

function getColecoes(pt: boolean): Colecao[] {
  return [
    {
      icon: BookOpen, grupo: 'estudar', accent: '#34d399', path: '/estudos/biblicos',
      label: pt ? 'Estudos Bíblicos' : 'Biblical Studies',
      descricao: pt
        ? 'Séries sobre personagens, livros e temas bíblicos, com contexto do Antigo e do Novo Testamento.'
        : 'Series on biblical characters, books and themes, with Old and New Testament context.',
      badge: pt ? 'Novo' : 'New',
    },
    {
      icon: GraduationCap, grupo: 'estudar', accent: '#f97316', path: '/discipulado/confessional',
      label: pt ? 'Estudos Confessionais' : 'Confessional Studies',
      descricao: pt
        ? 'Cadernos de discipulado: as grandes confissões de fé com perguntas, gabaritos e referências.'
        : 'Discipleship notebooks: the great confessions of faith with questions, answers and references.',
      badge: pt ? 'Em andamento' : 'In progress',
    },
    {
      icon: Compass, grupo: 'estudar', accent: '#10b981', path: '/biblioteca/leitura-guiada',
      label: pt ? 'Leitura Guiada' : 'Guided Reading',
      descricao: pt
        ? 'Livros lidos página por página e parágrafo por parágrafo, com perguntas e respostas.'
        : 'Books read page by page and paragraph by paragraph, with questions and answers.',
      badge: pt ? `${CAPS_GUIADOS} capítulos` : `${CAPS_GUIADOS} chapters`,
    },
    {
      icon: BookMarked, grupo: 'ler', accent: '#00d4ff', path: '/biblioteca/livros',
      label: pt ? 'Livros Recomendados' : 'Recommended Books',
      descricao: pt
        ? 'Seleção criteriosa de teologia, exposição bíblica, política e conservadorismo.'
        : 'A careful selection of theology, biblical exposition, politics and conservatism.',
      badge: pt ? `${LIVROS_COUNT} livros` : `${LIVROS_COUNT} books`,
    },
    {
      icon: Star, grupo: 'ler', accent: '#fbbf24', path: '/biblioteca/semana',
      label: pt ? 'Livro do Dia / Semana' : 'Book of the Day / Week',
      descricao: pt
        ? 'Uma recomendação diária ou semanal, com resenha e aplicação pastoral.'
        : 'A daily or weekly recommendation, with a review and pastoral application.',
      badge: pt ? 'Novo' : 'New',
    },
    {
      icon: BookOpenText, grupo: 'ler', accent: '#fb7185', path: '/biblioteca/resenhas',
      label: pt ? 'Resenhas' : 'Book Reviews',
      descricao: pt
        ? 'Análises detalhadas de obras importantes para o ministério e o estudo.'
        : 'Detailed analyses of important works for ministry and study.',
    },
    {
      icon: FileText, grupo: 'pesquisar', accent: '#a78bfa', path: '/biblioteca/artigos',
      label: pt ? 'Artigos Recomendados' : 'Recommended Articles',
      descricao: pt
        ? 'Artigos teológicos selecionados para aprofundar o estudo da Palavra.'
        : 'Selected theological articles to deepen study of the Word.',
      badge: pt ? `${ARTIGOS_COUNT} artigos` : `${ARTIGOS_COUNT} articles`,
    },
    {
      icon: User, grupo: 'pesquisar', accent: '#2dd4bf', path: '/biblioteca/autores',
      label: pt ? 'Autores-Teólogos' : 'Authors-Theologians',
      descricao: pt
        ? 'Perfis de teólogos, pregadores e escritores que moldaram a fé cristã.'
        : 'Profiles of theologians, preachers and writers who shaped Christian faith.',
    },
  ];
}

function getGrupos(pt: boolean): { id: Grupo; label: string; desc: string; cor: string }[] {
  return [
    { id: 'estudar', label: pt ? 'Estudar' : 'Study', desc: pt ? 'Séries e roteiros para estudar com método' : 'Series and roadmaps to study with method', cor: '#34d399' },
    { id: 'ler', label: pt ? 'Ler' : 'Read', desc: pt ? 'Livros escolhidos e resenhas' : 'Chosen books and reviews', cor: '#00d4ff' },
    { id: 'pesquisar', label: pt ? 'Pesquisar' : 'Research', desc: pt ? 'Artigos e grandes autores' : 'Articles and great authors', cor: '#a78bfa' },
  ];
}

function getAreas(pt: boolean) {
  return [
    { icon: BookOpen,  label: pt ? 'Teologia Bíblica'      : 'Biblical Theology',         path: '/biblioteca/area/teologia-biblica', accent: '#00d4ff' },
    { icon: Layers,    label: pt ? 'Teologia Sistemática'  : 'Systematic Theology',       path: '/biblioteca/area/sistematica',      accent: '#a78bfa' },
    { icon: Search,    label: pt ? 'Exegese e Hermenêutica': 'Exegesis and Hermeneutics', path: '/biblioteca/area/exegese',          accent: '#fbbf24' },
    { icon: Mic2,      label: pt ? 'Homilética e Pregação' : 'Homiletics and Preaching',  path: '/biblioteca/area/homiletica',       accent: '#fb7185' },
    { icon: Landmark,  label: pt ? 'História da Igreja'    : 'Church History',            path: '/biblioteca/area/historia',         accent: '#2dd4bf' },
    { icon: Handshake, label: pt ? 'Teologia do Pacto'     : 'Covenant Theology',         path: '/biblioteca/area/pacto',            accent: '#34d399' },
    { icon: Cross,     label: pt ? 'Teologia Reformada'    : 'Reformed Theology',         path: '/biblioteca/area/reformada',        accent: '#f472b6' },
  ];
}

const semAcento = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function Rotulo({ cor, children }: { cor: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-7">
      <div className="w-1.5 h-7 rounded-full" style={{ background: cor, boxShadow: `0 0 14px ${cor}90` }} />
      <h2 className="font-display font-black text-lg sm:text-xl uppercase tracking-[0.2em]" style={{ color: cor }}>{children}</h2>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${cor}40, transparent)` }} />
    </div>
  );
}

/* ─── página ───────────────────────────────────────────────────────────────── */

export default function BibliotecaPage() {
  const [lang] = useLanguage();
  const pt = lang === 'pt';
  const COLECOES = getColecoes(pt);
  const GRUPOS = getGrupos(pt);
  const AREAS = getAreas(pt);

  const [grupo, setGrupo] = useState<Grupo | 'todas'>('todas');
  const [busca, setBusca] = useState('');

  const filtradas = useMemo(() => {
    const q = semAcento(busca.trim());
    return COLECOES.filter(c =>
      (grupo === 'todas' || c.grupo === grupo) &&
      (!q || semAcento(c.label + ' ' + c.descricao).includes(q)),
    );
  }, [COLECOES, grupo, busca]);

  const areasFiltradas = useMemo(() => {
    const q = semAcento(busca.trim());
    return q ? AREAS.filter(a => semAcento(a.label).includes(q)) : AREAS;
  }, [AREAS, busca]);

  const stats = [
    { n: COLECOES.length, l: pt ? 'coleções' : 'collections', cor: '#00d4ff' },
    { n: LIVROS_COUNT, l: pt ? 'livros' : 'books', cor: '#fbbf24' },
    { n: ARTIGOS_COUNT, l: pt ? 'artigos' : 'articles', cor: '#a78bfa' },
    { n: AREAS.length, l: pt ? 'áreas' : 'areas', cor: '#fb7185' },
  ];

  return (
    <div className="min-h-screen relative">
      <Navbar lang={lang} />

      <section className="relative pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* brilhos de fundo */}
        <div className="pointer-events-none absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-[0.12] bg-cyan-400" />
        <div className="pointer-events-none absolute top-20 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-[0.10] bg-fuchsia-500" />
        <div className="pointer-events-none absolute top-[900px] left-1/3 w-[480px] h-[480px] rounded-full blur-3xl opacity-[0.08] bg-emerald-400" />

        <div className="relative max-w-7xl mx-auto [&_p]:[text-align:inherit] text-left">

          {/* ════ HERO ════ */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center mb-14">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="flex items-center gap-3 mb-5">
                <Library className="w-5 h-5 text-brand-blue" />
                <p className="text-[13px] font-black tracking-[0.35em] uppercase text-brand-blue">
                  {pt ? 'Recursos Teológicos' : 'Theological Resources'}
                </p>
              </div>
              <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[1.02] mb-5">
                <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-fuchsia-300 bg-clip-text text-transparent">
                  {pt ? 'Biblioteca' : 'Library'}
                </span>
              </h1>
              <p className="text-white/75 text-lg sm:text-xl max-w-xl leading-relaxed mb-8">
                {pt ? (
                  <>Livros, artigos, estudos e autores selecionados para <span className="text-cyan-300 font-semibold">aprofundar o estudo expositivo da Bíblia</span>, com roteiros que ensinam <span className="text-emerald-300 font-semibold">a ler bem</span>.</>
                ) : (
                  <>Books, articles, studies and authors selected to <span className="text-cyan-300 font-semibold">deepen expository Bible study</span>, with roadmaps that teach <span className="text-emerald-300 font-semibold">how to read well</span>.</>
                )}
              </p>

              {/* números */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.l}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className="rounded-2xl px-4 py-3 border bg-white/[0.03]"
                    style={{ borderColor: s.cor + '35' }}
                  >
                    <p className="font-display font-black text-3xl" style={{ color: s.cor }}>{s.n}</p>
                    <p className="text-[13px] font-bold uppercase tracking-widest text-white/55">{s.l}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="w-full">
              <div className="relative rounded-3xl p-2 bg-gradient-to-br from-cyan-400/25 via-white/5 to-fuchsia-400/25">
                <div className="rounded-[20px] overflow-hidden bg-slate-950">
                  <VideoIntro pt={pt} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* ════ ÚLTIMAS ATUALIZAÇÕES ════ */}
          <Rotulo cor="#fbbf24">{pt ? 'Últimas atualizações' : 'Latest updates'}</Rotulo>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-16">
            {/* Leitura guiada */}
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Link
                to="/biblioteca/leitura-guiada"
                className="group relative flex gap-5 sm:gap-6 h-full overflow-hidden rounded-3xl p-5 sm:p-7 border border-emerald-400/30 bg-gradient-to-br from-emerald-500/[0.14] via-slate-950/60 to-sky-500/[0.08] hover:border-emerald-300/60 transition-all"
              >
                <div className="pointer-events-none absolute -bottom-20 -right-16 w-64 h-64 rounded-full blur-3xl bg-emerald-400/20 group-hover:bg-emerald-400/30 transition-colors" />
                <img
                  src="/livros/como-ser-um-conservador.jpg"
                  alt=""
                  className="relative w-24 sm:w-32 shrink-0 self-start rounded-xl ring-1 ring-white/15 shadow-[0_18px_40px_rgba(0,0,0,0.6)] group-hover:-rotate-2 group-hover:-translate-y-1 transition-transform duration-500"
                  style={{ aspectRatio: '337/500', objectFit: 'cover' }}
                />
                <div className="relative flex flex-col min-w-0">
                  <span className="inline-flex self-start items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-black uppercase tracking-widest text-emerald-200 bg-emerald-400/15 border border-emerald-400/35 mb-3">
                    <Sparkles className="w-3 h-3" /> {pt ? 'Novo' : 'New'} · {pt ? 'Leitura Guiada' : 'Guided Reading'}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-[28px] text-white leading-tight mb-2">
                    {pt ? 'Como Ser um Conservador' : 'How to Be a Conservative'}
                  </h3>
                  <p className="text-white/75 text-[16px] sm:text-[17px] leading-relaxed mb-4">
                    {pt
                      ? <>Leia <strong className="text-emerald-300">Roger Scruton</strong> parágrafo por parágrafo, com resumo, pergunta e resposta em cada página.</>
                      : <>Read <strong className="text-emerald-300">Roger Scruton</strong> paragraph by paragraph, with a summary, question and answer on every page.</>}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-2">
                    {['Prefácio', 'Cap. 1', 'Cap. 2'].slice(0, CAPS_GUIADOS).map(c => (
                      <span key={c} className="px-2.5 py-1 rounded-lg text-[13px] font-bold text-white/85 bg-white/[0.07] border border-white/10">{c}</span>
                    ))}
                    <span className="ml-auto inline-flex items-center gap-1.5 text-[14px] font-black uppercase tracking-widest text-emerald-300 group-hover:gap-2.5 transition-all">
                      {pt ? 'Começar' : 'Start'} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Livros recomendados */}
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
              <Link
                to="/biblioteca/livros"
                className="group relative flex flex-col sm:flex-row gap-5 sm:gap-6 h-full overflow-hidden rounded-3xl p-5 sm:p-7 border border-cyan-400/30 bg-gradient-to-br from-cyan-500/[0.12] via-slate-950/60 to-violet-500/[0.10] hover:border-cyan-300/60 transition-all"
              >
                <div className="pointer-events-none absolute -bottom-20 -left-16 w-64 h-64 rounded-full blur-3xl bg-cyan-400/15 group-hover:bg-cyan-400/25 transition-colors" />
                {/* pilha de capas */}
                <div className="relative w-[170px] h-[150px] sm:h-auto shrink-0 self-center sm:self-stretch">
                  {CAPAS.map((c, i) => (
                    <img
                      key={c}
                      src={c}
                      alt=""
                      className="absolute top-1/2 w-[92px] rounded-lg ring-1 ring-white/15 shadow-[0_14px_30px_rgba(0,0,0,0.6)] transition-transform duration-500"
                      style={{
                        aspectRatio: '2/3', objectFit: 'cover',
                        left: `${i * 38}px`,
                        transform: `translateY(-50%) rotate(${(i - 1) * 7}deg)`,
                        zIndex: i === 1 ? 3 : 2 - i,
                      }}
                    />
                  ))}
                </div>
                <div className="relative flex flex-col min-w-0">
                  <span className="inline-flex self-start items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-black uppercase tracking-widest text-cyan-200 bg-cyan-400/15 border border-cyan-400/35 mb-3">
                    <BookMarked className="w-3 h-3" /> {pt ? 'Seleção curada' : 'Curated'}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-[28px] text-white leading-tight mb-2">
                    {pt ? 'Livros Recomendados' : 'Recommended Books'}
                  </h3>
                  <p className="text-white/75 text-[16px] sm:text-[17px] leading-relaxed mb-4">
                    {pt
                      ? <><strong className="text-violet-300">Teologia & Hermenêutica</strong> e <strong className="text-sky-300">Política & Conservadorismo</strong>: obras que formam pregadores e cristãos que pensam a vida pública.</>
                      : <><strong className="text-violet-300">Theology & Hermeneutics</strong> and <strong className="text-sky-300">Politics & Conservatism</strong>: works that shape preachers and Christians who think about public life.</>}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-[14px] font-black uppercase tracking-widest text-cyan-300 group-hover:gap-2.5 transition-all">
                    {pt ? 'Ver livros' : 'See books'} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* ════ COMO USAR ════ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {[
              { n: 1, cor: '#34d399', t: pt ? 'Escolha um caminho' : 'Choose a path', d: pt ? 'Estudar, Ler ou Pesquisar: use os filtros abaixo.' : 'Study, Read or Research: use the filters below.' },
              { n: 2, cor: '#00d4ff', t: pt ? 'Siga um roteiro' : 'Follow a roadmap', d: pt ? 'Estudos e leituras guiadas trazem resumo, perguntas e respostas.' : 'Studies and guided readings bring summaries, questions and answers.' },
              { n: 3, cor: '#f472b6', t: pt ? 'Aprofunde por área' : 'Go deeper by area', d: pt ? 'Do texto bíblico à teologia reformada, por área do saber.' : 'From the biblical text to reformed theology, by field.' },
            ].map(p => (
              <div key={p.n} className="relative overflow-hidden flex gap-4 rounded-2xl p-5 border border-white/10 bg-white/[0.025]">
                <span className="absolute -right-2 -bottom-6 font-display font-black text-8xl text-white/[0.04]">{p.n}</span>
                <span className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center font-display font-black text-slate-950" style={{ background: p.cor }}>{p.n}</span>
                <div>
                  <p className="font-display font-black text-white text-lg leading-tight mb-1">{p.t}</p>
                  <p className="text-white/65 text-[15px] leading-snug">{p.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ════ COLEÇÕES ════ */}
          <Rotulo cor="#00d4ff">{pt ? 'Coleções' : 'Collections'}</Rotulo>

          {/* filtros + busca */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-8">
            <div className="flex flex-wrap gap-2">
              {[{ id: 'todas' as const, label: pt ? 'Todas' : 'All', cor: '#e2e8f0' }, ...GRUPOS].map(g => {
                const on = grupo === g.id;
                const n = g.id === 'todas' ? COLECOES.length : COLECOES.filter(c => c.grupo === g.id).length;
                return (
                  <button
                    key={g.id}
                    onClick={() => setGrupo(g.id)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[14px] font-black uppercase tracking-widest border transition-all"
                    style={on
                      ? { background: g.cor, color: '#020617', borderColor: g.cor, boxShadow: `0 6px 20px ${g.cor}40` }
                      : { color: 'rgba(255,255,255,.75)', borderColor: g.cor + '40', background: g.cor + '0d' }}
                  >
                    {g.label}
                    <span className="text-[12px] px-1.5 rounded-full" style={{ background: on ? 'rgba(2,6,23,.15)' : 'rgba(255,255,255,.1)' }}>{n}</span>
                  </button>
                );
              })}
            </div>
            <div className="relative lg:ml-auto w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                value={busca}
                onChange={e => setBusca(e.target.value)}
                placeholder={pt ? 'Buscar coleção ou área…' : 'Search collection or area…'}
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white/[0.05] border border-white/15 focus:border-cyan-300/60 outline-none text-white text-[16px] placeholder:text-white/35 transition-colors"
              />
              {busca && (
                <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-white/50 hover:text-white" aria-label="Limpar">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {grupo !== 'todas' && (
            <p className="text-white/60 text-[16px] -mt-4 mb-6">{GRUPOS.find(g => g.id === grupo)?.desc}</p>
          )}

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
            <AnimatePresence mode="popLayout">
              {filtradas.map((item, i) => {
                const Icone = item.icon;
                const g = GRUPOS.find(x => x.id === item.grupo)!;
                return (
                  <motion.div
                    key={item.path}
                    layout
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      to={item.path}
                      className="group relative flex flex-col h-full min-h-[250px] overflow-hidden rounded-3xl p-6 border bg-slate-950/40 hover:-translate-y-1 transition-all duration-300"
                      style={{ borderColor: item.accent + '30', background: `linear-gradient(160deg, ${item.accent}17 0%, rgba(2,6,23,0.55) 55%)` }}
                    >
                      <div className="absolute inset-x-0 top-0 h-[3px] opacity-70 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }} />
                      <div className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity" style={{ background: item.accent + '55' }} />
                      <Icone className="absolute -bottom-6 -right-6 w-32 h-32 opacity-[0.05] group-hover:opacity-[0.09] group-hover:-rotate-6 transition-all duration-500" style={{ color: item.accent }} strokeWidth={1} />

                      <div className="relative flex items-start justify-between gap-3 mb-5">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform"
                          style={{ background: item.accent + '1f', border: `1px solid ${item.accent}45`, boxShadow: `0 0 24px ${item.accent}25` }}
                        >
                          <Icone className="w-6 h-6" style={{ color: item.accent }} strokeWidth={1.7} />
                        </div>
                        {item.badge && (
                          <span className="text-[12px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full whitespace-nowrap"
                            style={{ color: item.accent, background: item.accent + '18', border: `1px solid ${item.accent}38` }}>
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <p className="relative text-[12px] font-black uppercase tracking-[0.2em] mb-1" style={{ color: g.cor + 'cc' }}>{g.label}</p>
                      <h3 className="relative font-display font-black text-xl text-white leading-snug mb-2">{item.label}</h3>
                      <p className="relative text-white/70 text-[15px] sm:text-base leading-relaxed group-hover:text-white/85 transition-colors">{item.descricao}</p>

                      <span className="relative mt-auto pt-5 inline-flex items-center gap-1.5 text-[13px] font-black uppercase tracking-widest group-hover:gap-2.5 transition-all" style={{ color: item.accent }}>
                        {pt ? 'Explorar' : 'Explore'} <ChevronRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filtradas.length === 0 && (
            <div className="rounded-3xl border border-dashed border-white/15 p-10 text-center text-white/55 text-[16px] mb-6">
              {pt ? 'Nenhuma coleção encontrada para essa busca.' : 'No collection matches this search.'}
            </div>
          )}

          {/* ════ POR ÁREA ════ */}
          <div className="mt-16">
            <Rotulo cor="#fb7185">{pt ? 'Por área do saber' : 'By field'}</Rotulo>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4">
              {areasFiltradas.map((item, i) => {
                const Icone = item.icon;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.35 }}
                  >
                    <Link
                      to={item.path}
                      className="group relative flex flex-col items-center justify-center text-center gap-3 h-full min-h-[150px] overflow-hidden rounded-3xl p-4 border hover:-translate-y-1 transition-all duration-300"
                      style={{ borderColor: item.accent + '30', background: `radial-gradient(circle at 50% 0%, ${item.accent}22, rgba(2,6,23,0.4) 70%)` }}
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{ background: item.accent + '1f', border: `1px solid ${item.accent}50`, boxShadow: `0 0 28px ${item.accent}30` }}
                      >
                        <Icone className="w-7 h-7" style={{ color: item.accent }} strokeWidth={1.6} />
                      </div>
                      <span className="font-display font-black text-[15px] sm:text-base text-white/90 group-hover:text-white leading-tight">
                        {item.label}
                      </span>
                      <span className="absolute bottom-0 inset-x-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform origin-center" style={{ background: item.accent }} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
