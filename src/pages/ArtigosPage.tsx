import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ARTIGOS_TEOLOGIA } from '../data/teologia';

const BG = '#060d1f';
const COR = '#a78bfa';

const artigos = ARTIGOS_TEOLOGIA.filter(a => a.area === 'artigos' && a.status === 'publicado');

export default function ArtigosPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(88px,11vw,108px) clamp(16px,4vw,32px) 100px' }}>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: `${COR}18`, border: `1.5px solid ${COR}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
            }}>✍️</div>
            <div style={{ fontSize: 'clamp(10px,1.4vw,12px)', fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: COR }}>
              Artigos · Teologia &amp; Hermenêutica
            </div>
          </div>
          <h1 style={{
            fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900,
            lineHeight: 1.12, margin: '0 0 18px',
            background: `linear-gradient(135deg, #fff 0%, ${COR} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Artigos
          </h1>
          <p style={{ fontSize: 'clamp(15px,2.2vw,18px)', color: 'rgba(220,200,255,0.65)', lineHeight: 1.75, maxWidth: 620, margin: 0 }}>
            Textos de aprofundamento nas grandes questões da fé cristã — escritos com rigor teológico
            e linguagem acessível para pastores, professores e estudantes.
          </p>
          <div style={{ marginTop: 24 }}>
            <span style={{ fontSize: 'clamp(22px,3.5vw,30px)', fontWeight: 900, color: COR }}>{artigos.length}</span>
            <span style={{ fontSize: 13, color: 'rgba(220,200,255,0.40)', marginLeft: 8 }}>
              artigo{artigos.length !== 1 ? 's' : ''} publicado{artigos.length !== 1 ? 's' : ''}
            </span>
          </div>
        </motion.div>

        {/* Divisor */}
        <div style={{ height: 1, background: `linear-gradient(90deg, ${COR}45 0%, transparent 70%)`, marginBottom: 44 }} />

        {/* Grid de artigos */}
        {artigos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 24px', color: 'rgba(255,255,255,0.30)', fontSize: 16 }}>
            Nenhum artigo publicado ainda. Em breve.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {artigos.map((artigo, i) => (
              <motion.div
                key={artigo.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={`/artigos/${artigo.slug}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div style={{
                    padding: 'clamp(24px,4vw,36px)',
                    borderRadius: 20,
                    background: 'rgba(255,255,255,0.025)',
                    border: `1px solid rgba(167,139,250,0.18)`,
                    transition: 'all 0.22s',
                    cursor: 'pointer',
                  }}
                    onMouseOver={e => {
                      (e.currentTarget as HTMLDivElement).style.background = 'rgba(167,139,250,0.06)';
                      (e.currentTarget as HTMLDivElement).style.borderColor = `${COR}40`;
                    }}
                    onMouseOut={e => {
                      (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.025)';
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(167,139,250,0.18)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Badges */}
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                          <span style={{
                            fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase',
                            color: COR, padding: '3px 10px', borderRadius: 6,
                            background: `${COR}12`, border: `1px solid ${COR}28`,
                          }}>
                            {artigo.categoria}
                          </span>
                          {artigo.parte && (
                            <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.40)', letterSpacing: '0.14em', textTransform: 'uppercase', paddingTop: 3 }}>
                              {artigo.parte}
                            </span>
                          )}
                        </div>

                        {/* Título */}
                        <h2 style={{
                          fontSize: 'clamp(20px,3vw,28px)', fontWeight: 900,
                          color: '#fff', lineHeight: 1.2, margin: '0 0 12px',
                        }}>
                          {artigo.titulo}
                        </h2>

                        {/* Resumo */}
                        <p style={{
                          fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(220,210,255,0.70)',
                          lineHeight: 1.75, margin: 0, maxWidth: 700,
                        }}>
                          {artigo.resumo}
                        </p>
                      </div>

                      {/* Seta */}
                      <div style={{
                        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                        background: `${COR}12`, border: `1px solid ${COR}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                        <ArrowRight style={{ width: 18, height: 18, color: COR }} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Voltar para Teologia */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ marginTop: 60, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <button
            onClick={() => navigate('/teologia')}
            style={{
              all: 'unset', cursor: 'pointer',
              fontSize: 11, fontWeight: 900, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(167,139,250,0.55)',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}
            onMouseOver={e => (e.currentTarget.style.color = COR)}
            onMouseOut={e => (e.currentTarget.style.color = 'rgba(167,139,250,0.55)')}
          >
            ← Voltar para Teologia
          </button>
        </motion.div>

      </div>

      <Footer />
    </div>
  );
}
