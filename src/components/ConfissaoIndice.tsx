import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, BookOpen, Clock, HelpCircle, CheckCircle2, Library, ScrollText, Lock } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

/* Página-índice de uma confissão de fé (Batista 1689, Westminster…):
   hero com selo e progresso, ficha histórica, formato do estudo e capítulos agrupados por tema. */

export interface CapituloConfissao {
  num: number;
  titulo: string;
  disponivel: boolean;
  path: string;
}

export interface GrupoCapitulos {
  titulo: string;
  icone: string;
  de: number;
  ate: number;
}

export interface ConfissaoInfo {
  sigla: string;
  ano: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  cor: string;
  heroBg: string;
  ficha: { rotulo: string; valor: string }[];
  grupos: GrupoCapitulos[];
  capitulos: CapituloConfissao[];
}

const BG = '#060d1f';

const FORMATO = [
  { Icone: ScrollText, t: 'Introdução histórica', d: 'O contexto em que o capítulo foi escrito' },
  { Icone: BookOpen, t: 'Texto confessional', d: 'Parágrafo a parágrafo, com as provas bíblicas' },
  { Icone: HelpCircle, t: 'Perguntas', d: 'Para discussão em grupo ou estudo pessoal' },
  { Icone: CheckCircle2, t: 'Gabarito', d: 'Respostas fundamentadas nas Escrituras' },
  { Icone: Library, t: 'Referências', d: 'Bibliografia em ABNT para aprofundar' },
];

export default function ConfissaoIndice({ c }: { c: ConfissaoInfo }) {
  const navigate = useNavigate();
  const disponiveis = c.capitulos.filter(x => x.disponivel);
  const pct = Math.round((disponiveis.length / c.capitulos.length) * 100);
  const proximo = disponiveis[0];

  return (
    <div className="min-h-screen flex flex-col sem-justificar" style={{ background: BG, color: '#e2e8f0' }}>
      <Navbar />

      {/* ── Hero ── */}
      <header className="relative overflow-hidden" style={{ background: c.heroBg }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 55% 70% at 85% 30%, ${c.cor}22 0%, transparent 70%)` }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: `linear-gradient(${c.cor} 1px, transparent 1px), linear-gradient(90deg, ${c.cor} 1px, transparent 1px)`, backgroundSize: '44px 44px' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-14">
          <button
            onClick={() => navigate('/discipulado/confessional')}
            className="inline-flex items-center gap-2 text-base font-semibold mb-8 px-4 py-2 rounded-full transition-colors hover:bg-white/10"
            style={{ color: c.cor, border: `1px solid ${c.cor}40` }}
          >
            <ArrowLeft size={18} /> Estudos Confessionais
          </button>

          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
            {/* Selo */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="shrink-0 self-start md:self-center rounded-full flex flex-col items-center justify-center text-center"
              style={{
                width: 'clamp(130px, 22vw, 180px)', aspectRatio: '1',
                background: `radial-gradient(circle at 35% 30%, ${c.cor}40, ${c.cor}10 70%)`,
                border: `2px solid ${c.cor}80`,
                boxShadow: `0 0 0 8px ${c.cor}12, 0 0 60px ${c.cor}30`,
              }}
            >
              <span className="font-black tracking-widest" style={{ color: c.cor, fontSize: 'clamp(22px, 3.6vw, 30px)' }}>{c.sigla}</span>
              <span className="font-bold text-white/80 mt-1" style={{ fontSize: 'clamp(16px, 2.4vw, 20px)' }}>{c.ano}</span>
            </motion.div>

            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-black uppercase tracking-[0.25em] mb-3" style={{ color: c.cor }}>{c.subtitulo}</p>
              <h1 className="font-black text-white leading-tight mb-4" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>{c.titulo}</h1>
              <p className="text-lg sm:text-xl text-white/85 leading-relaxed max-w-3xl mb-7">{c.descricao}</p>

              {/* Progresso */}
              <div className="max-w-xl">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-base font-bold text-white/90">
                    <span style={{ color: c.cor }}>{disponiveis.length}</span> de {c.capitulos.length} capítulos disponíveis
                  </span>
                  <span className="text-base font-black" style={{ color: c.cor }}>{pct}%</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#ffffff14' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.3 }} className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${c.cor}99, ${c.cor})` }} />
                </div>
              </div>

              {proximo && (
                <button
                  onClick={() => navigate(proximo.path)}
                  className="mt-7 inline-flex items-center gap-3 px-6 py-3.5 rounded-xl text-lg font-black transition-transform hover:scale-[1.03]"
                  style={{ background: c.cor, color: '#0a0f1e', boxShadow: `0 8px 30px ${c.cor}40` }}
                >
                  Começar pelo Capítulo {proximo.num} <ArrowRight size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 flex flex-col gap-12">
        {/* ── Ficha histórica ── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {c.ficha.map(f => (
            <div key={f.rotulo} className="rounded-2xl p-4 sm:p-5" style={{ background: '#0b1530', border: `1px solid ${c.cor}25` }}>
              <p className="text-xs sm:text-sm font-black uppercase tracking-widest mb-1.5" style={{ color: `${c.cor}cc` }}>{f.rotulo}</p>
              <p className="text-base sm:text-lg font-bold text-white leading-snug">{f.valor}</p>
            </div>
          ))}
        </section>

        {/* ── Formato de cada estudo ── */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Como cada capítulo é estudado</h2>
          <p className="text-lg text-white/70 mb-6">Todas as lições seguem o mesmo roteiro, para estudo pessoal, em família ou em pequenos grupos.</p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {FORMATO.map(({ Icone, t, d }, i) => (
              <li key={t} className="rounded-2xl p-4 flex lg:flex-col gap-3" style={{ background: `${c.cor}0a`, border: `1px solid ${c.cor}22` }}>
                <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center relative" style={{ background: `${c.cor}20`, color: c.cor }}>
                  <Icone size={22} />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-black flex items-center justify-center" style={{ background: c.cor, color: '#0a0f1e' }}>{i + 1}</span>
                </div>
                <div>
                  <p className="text-base sm:text-lg font-extrabold text-white leading-tight">{t}</p>
                  <p className="text-sm sm:text-base text-white/70 leading-snug mt-1">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Capítulos por tema ── */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">Capítulos</h2>
          <div className="flex flex-col gap-10">
            {c.grupos.map(g => {
              const caps = c.capitulos.filter(x => x.num >= g.de && x.num <= g.ate);
              const prontos = caps.filter(x => x.disponivel).length;
              return (
                <div key={g.titulo}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{g.icone}</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">{g.titulo}</h3>
                    <span className="text-sm sm:text-base font-semibold text-white/55">
                      Cap. {g.de === g.ate ? g.de : `${g.de}–${g.ate}`}{prontos > 0 && <> · <span style={{ color: c.cor }}>{prontos} disponíve{prontos === 1 ? 'l' : 'is'}</span></>}
                    </span>
                    <div className="flex-1 h-px" style={{ background: `${c.cor}25` }} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {caps.map((cap, i) =>
                      cap.disponivel ? (
                        <motion.button
                          key={cap.num}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => navigate(cap.path)}
                          className="group text-left rounded-2xl p-5 flex flex-col gap-3 transition-all hover:-translate-y-1"
                          style={{ background: `linear-gradient(145deg, ${c.cor}1c, ${c.cor}08)`, border: `1.5px solid ${c.cor}55`, boxShadow: `0 6px 24px ${c.cor}12` }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black" style={{ background: c.cor, color: '#0a0f1e' }}>{cap.num}</span>
                            <span className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: `${c.cor}25`, color: c.cor }}>Disponível</span>
                          </div>
                          <p className="text-lg sm:text-xl font-extrabold text-white leading-snug">{cap.titulo}</p>
                          <span className="inline-flex items-center gap-2 text-base font-black mt-auto" style={{ color: c.cor }}>
                            Estudar capítulo <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                          </span>
                        </motion.button>
                      ) : (
                        <div key={cap.num} className="rounded-2xl px-4 py-3.5 flex items-center gap-3" style={{ background: '#0b1530', border: '1px solid #ffffff12' }}>
                          <span className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-base font-black" style={{ background: '#ffffff0d', color: '#ffffffa0' }}>{cap.num}</span>
                          <p className="flex-1 text-base sm:text-lg font-semibold text-white/75 leading-snug">{cap.titulo}</p>
                          <span className="shrink-0 inline-flex items-center gap-1 text-sm font-semibold text-white/50" title="Em breve">
                            <Clock size={15} /> <span className="hidden sm:inline">Em breve</span>
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <p className="flex items-center justify-center gap-2 text-base text-white/60 text-center">
          <Lock size={16} /> Os capítulos marcados como “em breve” serão liberados progressivamente.
        </p>
      </main>

      <Footer />
    </div>
  );
}
