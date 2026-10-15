import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
  badge?: string;
  capitulos: number;
  path: string;
  disponivel: boolean;
  bg: string;
  sigla: string;
}

const ESTUDOS: EstudoCard[] = [
  {
    id: 'herois',
    titulo: 'Heróis da Fé',
    subtitulo: 'Série de Estudos Bíblicos',
    descricao: 'Estudos sobre personagens bíblicos — suas vidas, falhas, fé e o Deus que os chamou, sustentou e transformou. Baseado em Hebreus 11.',
    cor: ORANGE,
    badge: 'Em breve',
    capitulos: 10,
    path: '/estudos/herois-da-fe',
    disponivel: false,
    bg: 'linear-gradient(145deg, #1a0a00 0%, #120700 50%, #090604 100%)',
    sigla: 'Hb 11',
  },
  {
    id: 'batista',
    titulo: 'Confissão Batista de 1689',
    subtitulo: 'Discipulado Confessional Batista',
    descricao: 'Estudo sistemático da Confissão de Fé Batista de Londres de 1689, capítulo a capítulo, com perguntas para discussão, gabaritos e referências bibliográficas.',
    cor: GOLD,
    badge: 'Em andamento',
    capitulos: 18,
    path: '/discipulado/confessional/batista',
    disponivel: true,
    bg: 'linear-gradient(145deg, #1c1200 0%, #120d00 50%, #080600 100%)',
    sigla: 'CFB 1689',
  },
  {
    id: 'westminster',
    titulo: 'Confissão de Westminster',
    subtitulo: 'Discipulado Confessional Reformado',
    descricao: 'Estudo da Confissão de Fé de Westminster (1646), o mais completo símbolo da tradição reformada, com seus 33 capítulos de doutrina sistemática.',
    cor: BLUE,
    badge: 'Em breve',
    capitulos: 33,
    path: '/discipulado/confessional/westminster',
    disponivel: false,
    bg: 'linear-gradient(145deg, #001220 0%, #000d18 50%, #000608 100%)',
    sigla: 'CFW 1646',
  },
  {
    id: 'heidelberg',
    titulo: 'Catecismo de Heidelberg',
    subtitulo: 'Discipulado Catequético Reformado',
    descricao: 'Estudo do Catecismo de Heidelberg (1563), com suas 129 perguntas e respostas organizadas em 52 domingos — a mais amada confissão reformada continental.',
    cor: PURPLE,
    badge: 'Em breve',
    capitulos: 52,
    path: '/discipulado/confessional/heidelberg',
    disponivel: false,
    bg: 'linear-gradient(145deg, #120020 0%, #0d0018 50%, #060008 100%)',
    sigla: 'CH 1563',
  },
  {
    id: 'belgica',
    titulo: 'Confissão Belga',
    subtitulo: 'Discipulado Confessional Reformado',
    descricao: 'Estudo da Confissão Belga (1561) de Guido de Brés, uma das três Formas de Unidade reformadas, com seus 37 artigos de fé.',
    cor: GREEN,
    badge: 'Em breve',
    capitulos: 37,
    path: '/discipulado/confessional/belgica',
    disponivel: false,
    bg: 'linear-gradient(145deg, #001a0d 0%, #001208 50%, #000804 100%)',
    sigla: 'CB 1561',
  },
];

function SvgCross() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, opacity: 0.04 }}>
      {Array.from({ length: 4 }, (_, r) => Array.from({ length: 4 }, (_, c) => (
        <g key={`${r}-${c}`} transform={`translate(${c * 15 + 7},${r * 15 + 7})`}>
          <rect x="-0.5" y="-3" width="1" height="6" rx="0.5" fill="white" />
          <rect x="-3" y="-0.5" width="6" height="1" rx="0.5" fill="white" />
        </g>
      )))}
    </svg>
  );
}

export default function EstudosConfessionaisPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: BG, color: '#e2e8f0' }}>
      <Navbar />

      {/* hero */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1020 0%, #110d00 60%, #0a1020 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ width: 3, height: 3, background: ORANGE, top: `${10 + (i * 19) % 80}%`, left: `${(i * 14) % 100}%`, opacity: 0.2 }}
              animate={{ opacity: [0.1, 0.35, 0.1] }}
              transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-14">
          <button
            onClick={() => navigate('/biblioteca')}
            className="flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-80"
            style={{ color: `${ORANGE}99` }}
          >
            ← Voltar para Biblioteca
          </button>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: `${ORANGE}22`, color: ORANGE }}>
              Discipulado Confessional
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: '#ffffff10', color: '#ffffff70' }}>
              {ESTUDOS.filter(e => e.disponivel).length} disponível · {ESTUDOS.filter(e => !e.disponivel).length} em breve
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-3 text-white leading-tight">
            Estudos Bíblicos e Confessionais
          </h1>
          <p className="text-white/75 text-lg max-w-2xl leading-relaxed">
            Cadernos de estudo sistemático das grandes confissões de fé da tradição reformada e batista — com perguntas para discussão, gabaritos e referências.
          </p>
        </div>
      </div>

      {/* cards grid */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ESTUDOS.map((estudo, i) => (
            <motion.div
              key={estudo.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onClick={() => estudo.disponivel && navigate(estudo.path)}
              className="relative rounded-2xl overflow-hidden group"
              style={{
                background: estudo.bg,
                border: `1px solid ${estudo.cor}30`,
                cursor: estudo.disponivel ? 'pointer' : 'default',
                opacity: estudo.disponivel ? 1 : 0.7,
              }}
            >
              {/* pattern */}
              <SvgCross />

              {/* radial glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 60% 50% at 80% 20%, ${estudo.cor}18 0%, transparent 70%)` }}
              />

              {/* hover border */}
              {estudo.disponivel && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 0 1px ${estudo.cor}55` }}
                />
              )}

              <div className="relative z-10 p-6 flex flex-col gap-4 h-full">
                {/* header */}
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="px-3 py-1.5 rounded-lg text-sm font-extrabold tracking-widest"
                    style={{ background: `${estudo.cor}20`, color: estudo.cor, border: `1px solid ${estudo.cor}35` }}
                  >
                    {estudo.sigla}
                  </div>
                  {estudo.badge && (
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                      style={{
                        background: estudo.disponivel ? `${estudo.cor}22` : '#ffffff10',
                        color: estudo.disponivel ? estudo.cor : '#ffffff50',
                        border: `1px solid ${estudo.disponivel ? estudo.cor + '40' : '#ffffff18'}`,
                      }}
                    >
                      {estudo.badge}
                    </span>
                  )}
                </div>

                {/* title */}
                <div>
                  <h2 className="text-xl font-extrabold text-white leading-tight mb-1">{estudo.titulo}</h2>
                  <p className="text-sm font-medium" style={{ color: `${estudo.cor}bb` }}>{estudo.subtitulo}</p>
                </div>

                {/* description */}
                <p className="text-white/75 text-base leading-relaxed flex-1">{estudo.descricao}</p>

                {/* footer */}
                <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${estudo.cor}20` }}>
                  <span className="text-sm font-medium" style={{ color: `${estudo.cor}80` }}>
                    {estudo.capitulos} {estudo.id === 'heidelberg' ? 'domingos' : 'capítulos'}
                  </span>
                  {estudo.disponivel ? (
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-base font-bold flex items-center gap-1"
                      style={{ color: estudo.cor }}
                    >
                      Estudar →
                    </motion.span>
                  ) : (
                    <span className="text-sm font-medium text-white/30">Em breve</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* nota */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 p-5 rounded-xl text-center"
          style={{ background: `${ORANGE}08`, border: `1px solid ${ORANGE}20` }}
        >
          <p className="text-white/60 text-base">
            <span style={{ color: ORANGE }} className="font-semibold">Novos estudos</span> serão adicionados progressivamente. Cada série segue o mesmo formato: introdução histórica, texto confessional, perguntas para discussão, gabarito e referências bibliográficas.
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
