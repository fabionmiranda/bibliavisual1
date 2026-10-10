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

const FOTO_MASTRICHT = 'https://commons.wikimedia.org/wiki/Special:FilePath/Petrus_van_Mastricht.jpg';

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

          {/* ══ PRÉ-REFORMA & REFORMA ══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 rounded-3xl border border-white/10 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #0d0800 60%, #0a0a1a 100%)' }}
          >
            {/* cabeçalho da seção */}
            <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-white/08 flex items-center gap-4">
              <div className="w-1 h-8 rounded-full shrink-0" style={{ background: 'linear-gradient(180deg,#fbbf24,#f97316)' }} />
              <div>
                <p className="text-[10px] font-black tracking-[0.30em] uppercase text-amber-400/70 mb-0.5">Mapa Histórico</p>
                <h2 className="font-display font-black text-xl sm:text-2xl text-white leading-tight">
                  Pré-Reforma &amp; Reforma — Teólogos em Destaque
                </h2>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-6 space-y-6">

              {/* Pré-Reforma */}
              <div>
                <p className="text-[10px] font-black tracking-widest uppercase mb-3" style={{ color: '#a78bfa' }}>
                  Pré-Reforma · séc. XV – início XVI
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { nome: 'Isabel de Castela', datas: '1451–1504', nota: 'Reforma clerical espanhola · Cap. 1 (González)', link: '/devocional/reforma/2' },
                    { nome: 'Cardeal Cisneros', datas: '1436–1517', nota: 'Bíblia Poliglota Complutense · Cap. 1–2 (González)', link: '/devocional/reforma/3' },
                  ].map(t => (
                    <Link key={t.nome} to={t.link}
                      className="group flex flex-col gap-0.5 px-4 py-2.5 rounded-xl border border-purple-500/20 bg-purple-500/08 hover:border-purple-400/40 hover:bg-purple-500/15 transition-all duration-200">
                      <span className="font-black text-sm text-white group-hover:text-purple-200 transition-colors">{t.nome}</span>
                      <span className="text-[10px] font-bold text-white/40">{t.datas}</span>
                      <span className="text-[10px] text-purple-300/60 leading-tight">{t.nota}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Reforma Magisterial */}
              <div>
                <p className="text-[10px] font-black tracking-widest uppercase mb-3" style={{ color: '#60a5fa' }}>
                  Reforma Magisterial · 1517–1564
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { nome: 'Martinho Lutero', datas: '1483–1546', nota: 'Reforma alemã · Caps. 2–4 (González)', link: '/devocional/reforma/4' },
                    { nome: 'Ulrico Zuínglio', datas: '1484–1531', nota: 'Reforma suíça · Cap. 5 (González)', link: '/devocional/reforma/9' },
                    { nome: 'William Perkins', datas: '1558–1602', nota: 'Puritanismo inglês · par de Smyth', link: '/biblioteca/autores/batistas-presbiterianos' },
                    { nome: 'William Ames', datas: '1576–1633', nota: 'Puritanismo federal · par de Helwys', link: '/biblioteca/autores/batistas-presbiterianos' },
                  ].map(t => (
                    <Link key={t.nome} to={t.link}
                      className="group flex flex-col gap-0.5 px-4 py-2.5 rounded-xl border border-blue-500/20 bg-blue-500/08 hover:border-blue-400/40 hover:bg-blue-500/15 transition-all duration-200">
                      <span className="font-black text-sm text-white group-hover:text-blue-200 transition-colors">{t.nome}</span>
                      <span className="text-[10px] font-bold text-white/40">{t.datas}</span>
                      <span className="text-[10px] text-blue-300/60 leading-tight">{t.nota}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Reforma Radical */}
              <div>
                <p className="text-[10px] font-black tracking-widest uppercase mb-3" style={{ color: '#34d399' }}>
                  Reforma Radical (Anabatistas) · 1525–
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { nome: 'Conrado Grebel', datas: 'c.1498–1526', nota: 'Batismo de crentes · Zurique 1525 · Cap. 6 (González)', link: '/devocional/reforma/10' },
                    { nome: 'Felix Manz', datas: 'c.1498–1527', nota: 'Primeiro mártir anabatista · Cap. 6 (González)', link: '/devocional/reforma/10' },
                    { nome: 'Menno Simmons', datas: '1496–1561', nota: 'Reconstruiu o anabatismo pacifista · menonitas', link: '/devocional/reforma/10' },
                    { nome: 'John Smyth', datas: 'c.1570–1612', nota: '1ª Igreja batista (1609) · Cap. 1 (Bush & Nettles)', link: '/biblioteca/autores/batistas-presbiterianos' },
                    { nome: 'Thomas Helwys', datas: 'c.1575–c.1616', nota: '1ª Igreja batista inglesa (1612) · Cap. 1', link: '/biblioteca/autores/batistas-presbiterianos' },
                    { nome: 'John Murton', datas: '?–c.1626', nota: 'Liberdade de consciência · Cap. 1', link: '/biblioteca/autores/batistas-presbiterianos' },
                  ].map(t => (
                    <Link key={t.nome} to={t.link}
                      className="group flex flex-col gap-0.5 px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/08 hover:border-emerald-400/40 hover:bg-emerald-500/15 transition-all duration-200">
                      <span className="font-black text-sm text-white group-hover:text-emerald-200 transition-colors">{t.nome}</span>
                      <span className="text-[10px] font-bold text-white/40">{t.datas}</span>
                      <span className="text-[10px] text-emerald-300/60 leading-tight">{t.nota}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Ortodoxia Pós-Reforma / Westminster */}
              <div>
                <p className="text-[10px] font-black tracking-widest uppercase mb-3" style={{ color: '#f97316' }}>
                  Ortodoxia Pós-Reforma &amp; Westminster · 1600–1700
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { nome: 'Samuel Rutherford', datas: '1600–1661', nota: 'Westminster Assembly · par de Grantham', link: '/biblioteca/autores/batistas-presbiterianos' },
                    { nome: 'George Gillespie', datas: '1613–1648', nota: 'Westminster Assembly · par de Roger Williams', link: '/biblioteca/autores/batistas-presbiterianos' },
                    { nome: 'John Owen', datas: '1616–1683', nota: 'Divine Original of Scripture (1659) · par de Bunyan', link: '/biblioteca/autores/batistas-presbiterianos' },
                    { nome: 'John Bunyan', datas: '1628–1688', nota: 'O Peregrino (1678) · Cap. 4 (Bush & Nettles)', link: '/biblioteca/autores/batistas-presbiterianos' },
                    { nome: 'Thomas Grantham', datas: '1634–1692', nota: 'Christianismus Primitivus (1678) · Cap. 1', link: '/biblioteca/autores/batistas-presbiterianos' },
                    { nome: 'Francis Turretin', datas: '1623–1687', nota: 'Institutio Theologiae Elencticae · par de Keach', link: '/biblioteca/autores/batistas-presbiterianos' },
                    { nome: 'Petrus van Mastricht', datas: '1630–1706', nota: 'Theoretico-Practica Theologia · Ortodoxia Reformada', link: '/biblioteca/autores/mastricht' },
                    { nome: 'Benjamin Keach', datas: '1640–1704', nota: 'Confissão de 1689 · Cap. 4 (Bush & Nettles)', link: '/biblioteca/autores/batistas-presbiterianos' },
                  ].map(t => (
                    <Link key={t.nome} to={t.link}
                      className="group flex flex-col gap-0.5 px-4 py-2.5 rounded-xl border border-orange-500/20 bg-orange-500/08 hover:border-orange-400/40 hover:bg-orange-500/15 transition-all duration-200">
                      <span className="font-black text-sm text-white group-hover:text-orange-200 transition-colors">{t.nome}</span>
                      <span className="text-[10px] font-bold text-white/40">{t.datas}</span>
                      <span className="text-[10px] text-orange-300/60 leading-tight">{t.nota}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* nota de rodapé */}
              <p className="text-white/30 text-[11px] leading-relaxed border-t border-white/06 pt-4">
                Os teólogos acima aparecem nos <Link to="/devocional/reforma" className="underline hover:text-white/60 transition-colors">Devocionais da Reforma</Link> (González, <em>A Era dos Reformadores</em>) e na <Link to="/biblioteca/autores/batistas-presbiterianos" className="underline hover:text-white/60 transition-colors">tabela comparativa Batistas & Presbiterianos</Link>. Clique em qualquer nome para acessar o conteúdo correspondente.
              </p>
            </div>
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
                        <img
                          src={a.foto}
                          alt={`Retrato de ${a.nome}`}
                          className="w-full h-full object-cover object-top block"
                          style={{ minHeight: 220, filter: 'sepia(12%) contrast(1.06) brightness(0.90)' }}
                          onError={e => { (e.currentTarget as HTMLImageElement).parentElement!.style.display = 'none'; }}
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
