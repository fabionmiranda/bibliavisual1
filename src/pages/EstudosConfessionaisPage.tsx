import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Clock, BookOpen, HelpCircle, CheckCircle2, Library } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CAPITULOS as CAPS_BATISTA } from './DiscipuladoBatistaPage';
import { CAPITULOS as CAPS_WESTMINSTER } from './DiscipuladoWestminsterPage';

const BG = '#060d1f';
const ORANGE = '#f97316';
const GOLD = '#fbbf24';
const BLUE = '#60a5fa';
const PURPLE = '#c084fc';
const GREEN = '#34d399';

interface EstudoCard {
  id: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  cor: string;
  ano: string;
  origem: string;
  unidade: string;
  total: number;
  prontos: number;
  path: string;
  disponivel: boolean;
  sigla: string;
}

const prontos = (caps: { disponivel: boolean }[]) => caps.filter(c => c.disponivel).length;

const ESTUDOS: EstudoCard[] = [
  {
    id: 'batista',
    titulo: 'Confissão Batista de 1689',
    subtitulo: 'Discipulado Confessional Batista',
    descricao: 'Estudo sistemático da Confissão de Fé Batista de Londres de 1689, capítulo a capítulo, com perguntas para discussão, gabaritos e referências bibliográficas.',
    cor: GOLD,
    ano: '1689',
    origem: 'Londres',
    unidade: 'capítulos',
    total: CAPS_BATISTA.length,
    prontos: prontos(CAPS_BATISTA),
    path: '/discipulado/confessional/batista',
    disponivel: true,
    sigla: 'CFB',
  },
  {
    id: 'westminster',
    titulo: 'Confissão de Westminster',
    subtitulo: 'Discipulado Confessional Reformado',
    descricao: 'Estudo da Confissão de Fé de Westminster (1646), o mais completo símbolo da tradição reformada, com seus 33 capítulos de doutrina sistemática.',
    cor: BLUE,
    ano: '1646',
    origem: 'Londres',
    unidade: 'capítulos',
    total: CAPS_WESTMINSTER.length,
    prontos: prontos(CAPS_WESTMINSTER),
    path: '/discipulado/confessional/westminster',
    disponivel: true,
    sigla: 'CFW',
  },
  {
    id: 'heidelberg',
    titulo: 'Catecismo de Heidelberg',
    subtitulo: 'Discipulado Catequético Reformado',
    descricao: 'Estudo do Catecismo de Heidelberg (1563), com suas 129 perguntas e respostas organizadas em 52 domingos — a mais amada confissão reformada continental.',
    cor: PURPLE,
    ano: '1563',
    origem: 'Heidelberg',
    unidade: 'domingos',
    total: 52,
    prontos: 0,
    path: '/discipulado/confessional/heidelberg',
    disponivel: false,
    sigla: 'CH',
  },
  {
    id: 'belgica',
    titulo: 'Confissão Belga',
    subtitulo: 'Discipulado Confessional Reformado',
    descricao: 'Estudo da Confissão Belga (1561) de Guido de Brés, uma das três Formas de Unidade reformadas, com seus 37 artigos de fé.',
    cor: GREEN,
    ano: '1561',
    origem: 'Países Baixos',
    unidade: 'artigos',
    total: 37,
    prontos: 0,
    path: '/discipulado/confessional/belgica',
    disponivel: false,
    sigla: 'CB',
  },
];

const LINHA_DO_TEMPO = [...ESTUDOS].sort((a, b) => Number(a.ano) - Number(b.ano));

const FORMATO = [
  { Icone: BookOpen, t: 'Texto e história' },
  { Icone: HelpCircle, t: 'Perguntas' },
  { Icone: CheckCircle2, t: 'Gabarito bíblico' },
  { Icone: Library, t: 'Referências ABNT' },
];

function Selo({ e, size = 84 }: { e: EstudoCard; size?: number }) {
  return (
    <div
      className="shrink-0 rounded-full flex flex-col items-center justify-center"
      style={{
        width: size, height: size,
        background: `radial-gradient(circle at 35% 30%, ${e.cor}45, ${e.cor}10 70%)`,
        border: `2px solid ${e.cor}${e.disponivel ? '90' : '45'}`,
        boxShadow: e.disponivel ? `0 0 0 6px ${e.cor}10, 0 0 32px ${e.cor}30` : 'none',
      }}
    >
      <span className="font-black tracking-wider leading-none" style={{ color: e.cor, fontSize: size * 0.24 }}>{e.sigla}</span>
      <span className="font-bold text-white/80 leading-none mt-1" style={{ fontSize: size * 0.18 }}>{e.ano}</span>
    </div>
  );
}

export default function EstudosConfessionaisPage() {
  const navigate = useNavigate();
  const nDisp = ESTUDOS.filter(e => e.disponivel).length;
  const nBreve = ESTUDOS.length - nDisp;

  return (
    <div className="min-h-screen flex flex-col sem-justificar" style={{ background: BG, color: '#e2e8f0' }}>
      <Navbar />

      {/* ── Hero ── */}
      <header className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1020 0%, #160e02 55%, #0a1020 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 70% at 80% 20%, ${ORANGE}20 0%, transparent 70%)` }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: `linear-gradient(${ORANGE} 1px, transparent 1px), linear-gradient(90deg, ${ORANGE} 1px, transparent 1px)`, backgroundSize: '44px 44px' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-14">
          <button
            onClick={() => navigate('/biblioteca')}
            className="inline-flex items-center gap-2 text-base font-semibold mb-8 px-4 py-2 rounded-full transition-colors hover:bg-white/10"
            style={{ color: ORANGE, border: `1px solid ${ORANGE}40` }}
          >
            <ArrowLeft size={18} /> Biblioteca
          </button>

          <p className="text-sm sm:text-base font-black uppercase tracking-[0.25em] mb-3" style={{ color: ORANGE }}>Discipulado Confessional</p>
          <h1 className="font-black text-white leading-tight mb-4" style={{ fontSize: 'clamp(34px, 5.5vw, 58px)' }}>Estudos Confessionais</h1>
          <p className="text-lg sm:text-xl text-white/85 leading-relaxed max-w-3xl mb-8">
            Cadernos de estudo sistemático das grandes confissões de fé da tradição reformada e batista — com perguntas para discussão, gabaritos e referências.
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-xl text-base font-bold" style={{ background: `${ORANGE}20`, color: ORANGE, border: `1px solid ${ORANGE}40` }}>
              {nDisp} disponíve{nDisp === 1 ? 'l' : 'is'}
            </span>
            <span className="px-4 py-2 rounded-xl text-base font-bold text-white/80" style={{ background: '#ffffff0d', border: '1px solid #ffffff1a' }}>
              {nBreve} em breve
            </span>
            {FORMATO.map(({ Icone, t }) => (
              <span key={t} className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-base font-semibold text-white/80" style={{ background: '#ffffff08', border: '1px solid #ffffff14' }}>
                <Icone size={17} style={{ color: ORANGE }} /> {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 flex flex-col gap-14">
        {/* ── Cards ── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ESTUDOS.map((e, i) => {
            const pct = Math.round((e.prontos / e.total) * 100);
            return (
              <motion.article
                key={e.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onClick={() => e.disponivel && navigate(e.path)}
                className={`relative rounded-3xl overflow-hidden flex flex-col ${e.disponivel ? 'group cursor-pointer transition-transform hover:-translate-y-1' : ''}`}
                style={{
                  background: e.disponivel ? `linear-gradient(150deg, ${e.cor}1a 0%, #0b1530 55%, #070f24 100%)` : '#0a1328',
                  border: `1.5px solid ${e.disponivel ? e.cor + '55' : '#ffffff14'}`,
                  boxShadow: e.disponivel ? `0 10px 40px ${e.cor}14` : 'none',
                }}
              >
                <div className="h-1.5 w-full" style={{ background: e.disponivel ? `linear-gradient(90deg, ${e.cor}, ${e.cor}40)` : '#ffffff10' }} />
                <div className="p-6 sm:p-7 flex flex-col gap-5 flex-1">
                  <div className="flex items-start gap-5">
                    <Selo e={e} />
                    <div className="min-w-0 flex-1">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-2"
                        style={e.disponivel ? { background: `${e.cor}22`, color: e.cor } : { background: '#ffffff10', color: '#ffffffaa' }}
                      >
                        {e.disponivel ? 'Em andamento' : 'Em breve'}
                      </span>
                      <h2 className="text-2xl sm:text-[26px] font-black text-white leading-tight">{e.titulo}</h2>
                      <p className="text-base font-semibold mt-1" style={{ color: e.cor }}>{e.subtitulo}</p>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg text-white/80 leading-relaxed flex-1">{e.descricao}</p>

                  <div className="flex flex-wrap gap-2 text-sm sm:text-base font-semibold text-white/75">
                    <span className="px-3 py-1 rounded-lg" style={{ background: '#ffffff0a' }}>📅 {e.ano}</span>
                    <span className="px-3 py-1 rounded-lg" style={{ background: '#ffffff0a' }}>📍 {e.origem}</span>
                    <span className="px-3 py-1 rounded-lg" style={{ background: '#ffffff0a' }}>📖 {e.total} {e.unidade}</span>
                  </div>

                  <div className="pt-4" style={{ borderTop: `1px solid ${e.disponivel ? e.cor + '25' : '#ffffff10'}` }}>
                    {e.disponivel ? (
                      <>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-base font-semibold text-white/85">
                            <span className="font-black" style={{ color: e.cor }}>{e.prontos}</span> de {e.total} {e.unidade} prontos
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-lg font-black" style={{ color: e.cor }}>
                            Estudar <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ background: '#ffffff12' }}>
                          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.4 + i * 0.1 }} className="h-full rounded-full" style={{ background: e.cor }} />
                        </div>
                      </>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-base font-semibold text-white/60">
                        <Clock size={17} /> Em preparação
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </section>

        {/* ── Linha do tempo ── */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Linha do tempo das confissões</h2>
          <p className="text-lg text-white/70 mb-8">Um século de fé confessada — da Reforma continental aos batistas ingleses.</p>
          <div className="relative">
            <div className="hidden md:block absolute left-0 right-0 top-[42px] h-0.5" style={{ background: 'linear-gradient(90deg, #34d39960, #c084fc60, #60a5fa60, #fbbf2460)' }} />
            <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {LINHA_DO_TEMPO.map(e => (
                <li
                  key={e.id}
                  className={`relative flex md:flex-col items-center md:text-center gap-4 ${e.disponivel ? 'cursor-pointer' : ''}`}
                  onClick={() => e.disponivel && navigate(e.path)}
                >
                  <Selo e={e} size={84} />
                  <div>
                    <p className="text-lg font-extrabold text-white leading-tight">{e.titulo}</p>
                    <p className="text-base text-white/65">{e.origem} · {e.ano}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Nota ── */}
        <div className="p-6 rounded-2xl text-center" style={{ background: `${ORANGE}0c`, border: `1px solid ${ORANGE}30` }}>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed">
            <span style={{ color: ORANGE }} className="font-bold">Novos estudos</span> serão adicionados progressivamente. Cada série segue o mesmo formato: introdução histórica, texto confessional, perguntas para discussão, gabarito e referências bibliográficas.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
