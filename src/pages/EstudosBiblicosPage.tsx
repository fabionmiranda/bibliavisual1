import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Clock, Users, BookOpen, Landmark, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BG = '#060d1f';
const GREEN = '#34d399';
const ORANGE = '#f97316';
const BLUE = '#60a5fa';

interface EstudoCard {
  id: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  cor: string;
  aulas: number;
  path: string;
  disponivel: boolean;
  sigla: string;
  periodo: string;
  temas: string[];
}

const ESTUDOS: EstudoCard[] = [
  {
    id: 'herois',
    titulo: 'Heróis da Fé na Bíblia',
    subtitulo: 'Série de Estudos Bíblicos',
    descricao: 'Estudos sobre personagens bíblicos — suas vidas, falhas, fé e o Deus que os chamou, sustentou e transformou. Baseado em Hebreus 11.',
    cor: ORANGE,
    aulas: 10,
    path: '/estudos/biblicos/herois-da-fe',
    disponivel: true,
    sigla: 'Hb 11',
    periodo: 'Antigo Testamento',
    temas: ['Fé', 'Personagens', 'Hebreus 11'],
  },
  {
    id: 'herois-igreja',
    titulo: 'Heróis da Fé na História da Igreja',
    subtitulo: 'Série de Estudos Históricos',
    descricao: 'Estudos sobre homens e mulheres que mudaram o curso da Igreja — mártires, reformadores, missionários e teólogos cujas vidas falam mais alto que qualquer doutrina.',
    cor: BLUE,
    aulas: 20,
    path: '/estudos/biblicos/herois-da-fe-na-historia',
    disponivel: true,
    sigla: 'Hist.',
    periodo: 'Da Igreja Primitiva aos dias atuais',
    temas: ['Mártires', 'Reformadores', 'Missionários'],
  },
];

const DIFERENCIAIS = [
  { Icone: BookOpen, t: 'Texto bíblico no centro', d: 'Cada lição parte das Escrituras' },
  { Icone: Landmark, t: 'Contexto histórico', d: 'Antigo e Novo Testamento, e a história da Igreja' },
  { Icone: Users, t: 'Para grupos e famílias', d: 'Linguagem didática e perguntas práticas' },
  { Icone: Sparkles, t: 'Visual e colorido', d: 'Quadros, destaques e linhas do tempo' },
];

export default function EstudosBiblicosPage() {
  const navigate = useNavigate();
  const nDisp = ESTUDOS.filter(e => e.disponivel).length;
  const totalAulas = ESTUDOS.reduce((s, e) => s + e.aulas, 0);

  return (
    <div className="min-h-screen flex flex-col sem-justificar" style={{ background: BG, color: '#e2e8f0' }}>
      <Navbar />

      {/* ── Hero ── */}
      <header className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1020 0%, #021a10 55%, #0a1020 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 50% 70% at 80% 20%, ${GREEN}1f 0%, transparent 70%)` }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: `linear-gradient(${GREEN} 1px, transparent 1px), linear-gradient(90deg, ${GREEN} 1px, transparent 1px)`, backgroundSize: '44px 44px' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-14">
          <button
            onClick={() => navigate('/biblioteca')}
            className="inline-flex items-center gap-2 text-base font-semibold mb-8 px-4 py-2 rounded-full transition-colors hover:bg-white/10"
            style={{ color: GREEN, border: `1px solid ${GREEN}40` }}
          >
            <ArrowLeft size={18} /> Biblioteca
          </button>

          <p className="text-sm sm:text-base font-black uppercase tracking-[0.25em] mb-3" style={{ color: GREEN }}>Séries de estudo</p>
          <h1 className="font-black text-white leading-tight mb-4" style={{ fontSize: 'clamp(34px, 5.5vw, 58px)' }}>Estudos Bíblicos</h1>
          <p className="text-lg sm:text-xl text-white/85 leading-relaxed max-w-3xl mb-8">
            Séries de estudos sobre personagens, livros e temas bíblicos — didáticos, coloridos e com contexto do Antigo e Novo Testamento.
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-xl text-base font-bold" style={{ background: `${GREEN}20`, color: GREEN, border: `1px solid ${GREEN}40` }}>
              {nDisp} {nDisp === 1 ? 'série disponível' : 'séries disponíveis'}
            </span>
            <span className="px-4 py-2 rounded-xl text-base font-bold text-white/85" style={{ background: '#ffffff0d', border: '1px solid #ffffff1a' }}>
              {totalAulas} aulas
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 flex flex-col gap-14">
        {/* ── Séries ── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ESTUDOS.map((e, i) => (
            <motion.article
              key={e.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onClick={() => e.disponivel && navigate(e.path)}
              className={`relative rounded-3xl overflow-hidden flex flex-col ${e.disponivel ? 'group cursor-pointer transition-transform hover:-translate-y-1' : ''}`}
              style={{
                background: `linear-gradient(150deg, ${e.cor}1a 0%, #0b1530 55%, #070f24 100%)`,
                border: `1.5px solid ${e.cor}55`,
                boxShadow: `0 10px 40px ${e.cor}14`,
              }}
            >
              <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${e.cor}, ${e.cor}40)` }} />
              <div className="p-6 sm:p-7 flex flex-col gap-5 flex-1">
                <div className="flex items-start gap-5">
                  <div
                    className="shrink-0 w-[84px] h-[84px] rounded-full flex items-center justify-center text-center font-black"
                    style={{ background: `radial-gradient(circle at 35% 30%, ${e.cor}45, ${e.cor}10 70%)`, border: `2px solid ${e.cor}90`, boxShadow: `0 0 0 6px ${e.cor}10, 0 0 32px ${e.cor}30`, color: e.cor, fontSize: 19 }}
                  >
                    {e.sigla}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-2" style={{ background: `${e.cor}22`, color: e.cor }}>
                      {e.disponivel ? 'Em andamento' : 'Em breve'}
                    </span>
                    <h2 className="text-2xl sm:text-[26px] font-black text-white leading-tight">{e.titulo}</h2>
                    <p className="text-base font-semibold mt-1" style={{ color: e.cor }}>{e.subtitulo}</p>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-white/80 leading-relaxed flex-1">{e.descricao}</p>

                <div className="flex flex-wrap gap-2 text-sm sm:text-base font-semibold text-white/80">
                  <span className="px-3 py-1 rounded-lg" style={{ background: '#ffffff0a' }}>🕰️ {e.periodo}</span>
                  {e.temas.map(t => (
                    <span key={t} className="px-3 py-1 rounded-lg" style={{ background: `${e.cor}14`, color: e.cor }}>{t}</span>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between" style={{ borderTop: `1px solid ${e.cor}25` }}>
                  <span className="inline-flex items-center gap-2 text-base font-semibold text-white/85">
                    <Clock size={17} style={{ color: e.cor }} /> {e.aulas} aulas
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-lg font-black" style={{ color: e.cor }}>
                    Estudar <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </section>

        {/* ── Diferenciais ── */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">Como são as séries</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {DIFERENCIAIS.map(({ Icone, t, d }) => (
              <li key={t} className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: `${GREEN}0a`, border: `1px solid ${GREEN}22` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${GREEN}20`, color: GREEN }}>
                  <Icone size={22} />
                </div>
                <p className="text-lg font-extrabold text-white leading-tight">{t}</p>
                <p className="text-base text-white/75 leading-snug">{d}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="p-6 rounded-2xl text-center" style={{ background: `${GREEN}0c`, border: `1px solid ${GREEN}30` }}>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed">
            <span style={{ color: GREEN }} className="font-bold">Novas séries</span> serão adicionadas progressivamente. Cada série traz contexto histórico, exegético e aplicação prática para a vida cristã.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
