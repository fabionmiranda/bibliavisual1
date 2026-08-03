import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ARTIGOS_TEOLOGIA, CATEGORIAS_TEOLOGIA } from '../data/teologia';

const BG = '#060d1f';
const CYAN = '#00D4FF';

const totalAulas = ARTIGOS_TEOLOGIA.length;
const totalArtigos = ARTIGOS_TEOLOGIA.filter(a => a.status === 'publicado').length;
const totalCategorias = CATEGORIAS_TEOLOGIA.length;

export default function TeologiaPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
      <Navbar />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(88px,11vw,108px) clamp(16px,4vw,32px) 100px' }}>

        {/* ── Hero ── */}
        <div style={{ marginBottom: 56, textAlign: 'center' }}>
          <div style={{
            fontSize: 'clamp(10px,1.4vw,12px)', fontWeight: 900,
            letterSpacing: '0.36em', textTransform: 'uppercase',
            color: CYAN, marginBottom: 14, opacity: 0.85,
          }}>
            Biblioteca Teológica
          </div>
          <h1 style={{
            fontSize: 'clamp(32px,6vw,56px)', fontWeight: 900,
            lineHeight: 1.12, margin: '0 0 20px',
            background: `linear-gradient(135deg, #fff 0%, rgba(0,212,255,0.85) 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Teologia
          </h1>
          <p style={{
            fontSize: 'clamp(16px,2.4vw,19px)', color: 'rgba(200,220,255,0.70)',
            lineHeight: 1.75, maxWidth: 580, margin: '0 auto',
          }}>
            Formação teológica sistemática — da natureza da disciplina à epistemologia,
            história e fundamentos da autoridade bíblica.
          </p>
        </div>

        {/* Divisor */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.40) 50%, transparent 100%)', marginBottom: 56 }} />

        {/* ── Cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(20px,3vw,32px)',
        }}>

          {/* Card Aulas */}
          <button
            onClick={() => navigate('/teologia/aulas')}
            style={{
              all: 'unset', cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              borderRadius: 22,
              background: 'linear-gradient(145deg, rgba(0,212,255,0.08) 0%, rgba(0,100,180,0.10) 100%)',
              border: '1.5px solid rgba(0,212,255,0.25)',
              padding: 'clamp(28px,4vw,40px)',
              transition: 'all 0.25s ease',
              position: 'relative', overflow: 'hidden',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.border = '1.5px solid rgba(0,212,255,0.60)';
              el.style.background = 'linear-gradient(145deg, rgba(0,212,255,0.13) 0%, rgba(0,100,180,0.15) 100%)';
              el.style.transform = 'translateY(-3px)';
              el.style.boxShadow = '0 16px 48px rgba(0,212,255,0.14)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.border = '1.5px solid rgba(0,212,255,0.25)';
              el.style.background = 'linear-gradient(145deg, rgba(0,212,255,0.08) 0%, rgba(0,100,180,0.10) 100%)';
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = 'none';
            }}
          >
            {/* Glow decorativo */}
            <div style={{
              position: 'absolute', top: -40, right: -40,
              width: 160, height: 160, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Ícone */}
            <div style={{
              width: 'clamp(60px,8vw,76px)', height: 'clamp(60px,8vw,76px)',
              borderRadius: 18, marginBottom: 24,
              background: 'rgba(0,212,255,0.12)',
              border: '1.5px solid rgba(0,212,255,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 'clamp(28px,4vw,36px)',
              filter: 'drop-shadow(0 0 12px rgba(0,212,255,0.30))',
            }}>
              🎓
            </div>

            {/* Título */}
            <div style={{
              fontSize: 'clamp(22px,3.5vw,30px)', fontWeight: 900,
              color: '#ffffff', marginBottom: 10, lineHeight: 1.2,
            }}>
              Aulas
            </div>

            {/* Descrição */}
            <p style={{
              fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(200,220,255,0.70)',
              lineHeight: 1.75, margin: '0 0 28px', flex: 1,
            }}>
              Formação teológica progressiva organizada por categorias — da introdução à epistemologia,
              história e fundamentos da fé cristã.
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 20, marginBottom: 28, flexWrap: 'wrap' }}>
              {[
                { n: totalAulas, label: 'módulos' },
                { n: totalCategorias, label: 'categorias' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 'clamp(20px,3vw,26px)', fontWeight: 900, color: CYAN, lineHeight: 1 }}>{s.n}</span>
                  <span style={{ fontSize: 11, color: 'rgba(200,220,255,0.50)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em' }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 'clamp(11px,1.5vw,13px)', fontWeight: 900,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: CYAN,
            }}>
              Acessar aulas <span style={{ fontSize: 16 }}>→</span>
            </div>
          </button>

          {/* Card Artigos */}
          <button
            onClick={() => navigate('/teologia/artigos')}
            style={{
              all: 'unset', cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              borderRadius: 22,
              background: 'linear-gradient(145deg, rgba(160,80,255,0.08) 0%, rgba(80,20,160,0.10) 100%)',
              border: '1.5px solid rgba(160,80,255,0.25)',
              padding: 'clamp(28px,4vw,40px)',
              transition: 'all 0.25s ease',
              position: 'relative', overflow: 'hidden',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.border = '1.5px solid rgba(160,80,255,0.60)';
              el.style.background = 'linear-gradient(145deg, rgba(160,80,255,0.13) 0%, rgba(80,20,160,0.15) 100%)';
              el.style.transform = 'translateY(-3px)';
              el.style.boxShadow = '0 16px 48px rgba(160,80,255,0.14)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.border = '1.5px solid rgba(160,80,255,0.25)';
              el.style.background = 'linear-gradient(145deg, rgba(160,80,255,0.08) 0%, rgba(80,20,160,0.10) 100%)';
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = 'none';
            }}
          >
            {/* Glow decorativo */}
            <div style={{
              position: 'absolute', top: -40, right: -40,
              width: 160, height: 160, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(160,80,255,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Ícone */}
            <div style={{
              width: 'clamp(60px,8vw,76px)', height: 'clamp(60px,8vw,76px)',
              borderRadius: 18, marginBottom: 24,
              background: 'rgba(160,80,255,0.12)',
              border: '1.5px solid rgba(160,80,255,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 'clamp(28px,4vw,36px)',
              filter: 'drop-shadow(0 0 12px rgba(160,80,255,0.30))',
            }}>
              📝
            </div>

            {/* Título */}
            <div style={{
              fontSize: 'clamp(22px,3.5vw,30px)', fontWeight: 900,
              color: '#ffffff', marginBottom: 10, lineHeight: 1.2,
            }}>
              Artigos
            </div>

            {/* Descrição */}
            <p style={{
              fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(220,200,255,0.70)',
              lineHeight: 1.75, margin: '0 0 28px', flex: 1,
            }}>
              Artigos teológicos publicados — textos completos para leitura, estudo e aprofundamento
              nas grandes questões da fé cristã.
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 20, marginBottom: 28, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 'clamp(20px,3vw,26px)', fontWeight: 900, color: '#B46FFF', lineHeight: 1 }}>{totalArtigos}</span>
                <span style={{ fontSize: 11, color: 'rgba(220,200,255,0.50)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em' }}>publicados</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 'clamp(20px,3vw,26px)', fontWeight: 900, color: '#B46FFF', lineHeight: 1 }}>{totalAulas - totalArtigos}</span>
                <span style={{ fontSize: 11, color: 'rgba(220,200,255,0.50)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em' }}>em breve</span>
              </div>
            </div>

            {/* CTA */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 'clamp(11px,1.5vw,13px)', fontWeight: 900,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#B46FFF',
            }}>
              Ler artigos <span style={{ fontSize: 16 }}>→</span>
            </div>
          </button>

        </div>
      </div>

      <Footer />
    </div>
  );
}
