import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ARTIGOS_TEOLOGIA } from '../data/teologia';
import ArtigoCard from '../components/teologia/ArtigoCard';

const BG = '#060d1f';

const artigosPublicados = ARTIGOS_TEOLOGIA.filter(a => a.status === 'publicado' && a.area !== 'artigos');

export default function TeologiaArtigosPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(88px,11vw,108px) clamp(16px,4vw,32px) 80px' }}>

        {/* Voltar */}
        <button
          onClick={() => navigate('/teologia')}
          style={{ all: 'unset', cursor: 'pointer', fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(160,80,255,0.80)', marginBottom: 40, display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          ← Teologia
        </button>

        {/* ── Hero ── */}
        <div style={{ marginBottom: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: 'rgba(160,80,255,0.12)', border: '1.5px solid rgba(160,80,255,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
            }}>📝</div>
            <div style={{ fontSize: 'clamp(10px,1.4vw,12px)', fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#B46FFF', opacity: 0.90 }}>
              Teologia · Artigos
            </div>
          </div>
          <h1 style={{
            fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900,
            lineHeight: 1.15, margin: '0 0 18px',
            background: `linear-gradient(135deg, #fff 0%, rgba(160,80,255,0.85) 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Artigos Publicados
          </h1>
          <p style={{
            fontSize: 'clamp(15px,2.2vw,18px)', color: 'rgba(220,200,255,0.65)',
            lineHeight: 1.75, maxWidth: 600, margin: 0,
          }}>
            Textos completos para leitura e aprofundamento nas grandes questões da fé cristã — escritos
            com rigor teológico e linguagem acessível.
          </p>

          <div style={{ marginTop: 28 }}>
            <span style={{ fontSize: 'clamp(22px,3.5vw,30px)', fontWeight: 900, color: '#B46FFF' }}>{artigosPublicados.length}</span>
            <span style={{ fontSize: 13, color: 'rgba(220,200,255,0.40)', marginLeft: 8 }}>artigo{artigosPublicados.length !== 1 ? 's' : ''} disponível{artigosPublicados.length !== 1 ? 'is' : ''}</span>
          </div>
        </div>

        {/* Divisor */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(160,80,255,0.40) 0%, transparent 70%)', marginBottom: 40 }} />

        {artigosPublicados.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 24px', color: 'rgba(255,255,255,0.35)', fontSize: 16 }}>
            Nenhum artigo publicado ainda. Em breve.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: 'clamp(16px,2.5vw,24px)' }}>
            {artigosPublicados.map(artigo => (
              <ArtigoCard key={artigo.id} artigo={artigo} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
