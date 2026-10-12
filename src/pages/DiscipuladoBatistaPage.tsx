import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BG = '#060d1f';
const GOLD = '#fbbf24';

const CAPITULOS = [
  { num: 1, titulo: 'Das Sagradas Escrituras', disponivel: true, path: '/discipulado/confessional/cap1' },
  { num: 2, titulo: 'De Deus e da Santa Trindade', disponivel: false, path: '' },
  { num: 3, titulo: 'Do Decreto de Deus', disponivel: false, path: '' },
  { num: 4, titulo: 'Da Criação', disponivel: false, path: '' },
  { num: 5, titulo: 'Da Providência', disponivel: false, path: '' },
  { num: 6, titulo: 'Da Queda do Homem, do Pecado e de seu Castigo', disponivel: false, path: '' },
  { num: 7, titulo: 'Do Pacto de Deus', disponivel: false, path: '' },
  { num: 8, titulo: 'De Cristo o Mediador', disponivel: false, path: '' },
  { num: 9, titulo: 'Do Livre-Arbítrio', disponivel: false, path: '' },
  { num: 10, titulo: 'Do Chamado Eficaz', disponivel: false, path: '' },
  { num: 11, titulo: 'Da Justificação', disponivel: false, path: '' },
  { num: 12, titulo: 'Da Adoção', disponivel: false, path: '' },
  { num: 13, titulo: 'Da Santificação', disponivel: false, path: '' },
  { num: 14, titulo: 'Da Fé Salvadora', disponivel: false, path: '' },
  { num: 15, titulo: 'Do Arrependimento para a Vida e a Salvação', disponivel: false, path: '' },
  { num: 16, titulo: 'Das Boas Obras', disponivel: false, path: '' },
  { num: 17, titulo: 'Da Perseverança dos Santos', disponivel: false, path: '' },
  { num: 18, titulo: 'Da Asseguração da Graça e da Salvação', disponivel: false, path: '' },
];

export default function DiscipuladoBatistaPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: BG, color: '#e2e8f0' }}>
      <Navbar />

      {/* hero */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1020 0%, #1c1200 60%, #0a1020 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ width: 3, height: 3, background: GOLD, top: `${10 + (i * 17) % 80}%`, left: `${(i * 13) % 100}%`, opacity: 0.2 }}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-14">
          <button
            onClick={() => navigate('/discipulado/confessional')}
            className="flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-80"
            style={{ color: `${GOLD}99` }}
          >
            ← Estudos Confessionais
          </button>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: `${GOLD}22`, color: GOLD }}>
              CFB 1689
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: '#ffffff10', color: '#ffffff60' }}>
              {CAPITULOS.filter(c => c.disponivel).length} de {CAPITULOS.length} capítulos disponíveis
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-3 text-white leading-tight">
            Confissão Batista de 1689
          </h1>
          <p className="text-white/75 text-lg max-w-2xl leading-relaxed">
            Discipulado Confessional Batista — estudo capítulo a capítulo da Confissão de Fé Batista de Londres de 1689, com perguntas, gabaritos e referências bibliográficas.
          </p>
        </div>
      </div>

      {/* capítulos */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPITULOS.map((cap, i) => (
            <motion.div
              key={cap.num}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              onClick={() => cap.disponivel && navigate(cap.path)}
              className="relative rounded-xl p-5 flex flex-col gap-3 group transition-all"
              style={{
                background: cap.disponivel ? `${GOLD}0c` : '#0b1530',
                border: `1px solid ${cap.disponivel ? GOLD + '35' : '#ffffff10'}`,
                cursor: cap.disponivel ? 'pointer' : 'default',
                opacity: cap.disponivel ? 1 : 0.55,
              }}
            >
              {cap.disponivel && (
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 0 1px ${GOLD}55` }}
                />
              )}
              <div className="flex items-center justify-between">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0"
                  style={{ background: cap.disponivel ? `${GOLD}25` : '#ffffff0a', color: cap.disponivel ? GOLD : '#ffffff30' }}
                >
                  {cap.num}
                </span>
                {cap.disponivel ? (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: `${GOLD}22`, color: GOLD }}>
                    Disponível
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium text-white/25" style={{ background: '#ffffff08' }}>
                    Em breve
                  </span>
                )}
              </div>
              <p className={`text-base font-semibold leading-snug ${cap.disponivel ? 'text-white' : 'text-white/40'}`}>
                {cap.titulo}
              </p>
              {cap.disponivel && (
                <motion.p
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-sm font-bold self-start"
                  style={{ color: GOLD }}
                >
                  Estudar →
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
