import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ARTIGOS_TEOLOGIA } from '../data/teologia';

const BG = '#060d1f';
const COR = '#a78bfa';

export default function ArtigoPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const artigo = ARTIGOS_TEOLOGIA.find(a => a.slug === slug && a.area === 'artigos');

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!artigo) {
    return (
      <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
        <Navbar />
        <div style={{ maxWidth: 700, margin: '0 auto', padding: 'clamp(88px,11vw,108px) 24px 60px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>404</div>
          <div style={{ color: 'rgba(255,255,255,0.50)', marginBottom: 24 }}>Artigo não encontrado.</div>
          <button onClick={() => navigate('/artigos')} style={{ all: 'unset', cursor: 'pointer', color: COR, fontWeight: 700 }}>
            ← Voltar para Artigos
          </button>
        </div>
      </div>
    );
  }

  if (artigo.status === 'rascunho') {
    return (
      <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
        <Navbar />
        <div style={{ maxWidth: 700, margin: '0 auto', padding: 'clamp(88px,11vw,108px) 24px 60px' }}>
          <button onClick={() => navigate('/artigos')} style={{ all: 'unset', cursor: 'pointer', fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: `${COR}b0`, marginBottom: 36, display: 'block' }}>
            ← Voltar para Artigos
          </button>
          <div style={{ borderRadius: 16, padding: '40px 32px', border: '1px solid rgba(255,200,80,0.20)', background: 'rgba(255,200,80,0.05)', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,200,80,0.75)', marginBottom: 16 }}>Em preparação</div>
            <div style={{ fontSize: 'clamp(20px,3.5vw,26px)', fontWeight: 800, color: 'rgba(255,255,255,0.80)', lineHeight: 1.3, marginBottom: 12 }}>{artigo.titulo}</div>
            {artigo.parte && <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.40)', marginBottom: 20 }}>{artigo.parte}</div>}
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{artigo.resumo}</div>
            <div style={{ marginTop: 28, fontSize: 13, color: 'rgba(255,200,80,0.55)' }}>Este artigo está em redação e será publicado em breve.</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
      <Navbar />

      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(88px,11vw,108px) clamp(16px,4vw,36px) 100px' }}>

        {/* Voltar */}
        <button onClick={() => navigate('/artigos')} style={{ all: 'unset', cursor: 'pointer', fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: `${COR}b0`, marginBottom: 40, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          ← Voltar para Artigos
        </button>

        {/* Cabeçalho */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: COR, padding: '3px 10px', borderRadius: 6, background: `${COR}18`, border: `1px solid ${COR}40` }}>
              {artigo.categoria}
            </span>
            {artigo.parte && (
              <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                {artigo.parte}
              </span>
            )}
          </div>
          <h1 style={{ fontSize: 'clamp(26px,4.5vw,40px)', fontWeight: 900, lineHeight: 1.18, margin: '0 0 18px', color: '#fff' }}>
            {artigo.titulo}
          </h1>
          <p style={{ fontSize: 'clamp(17px,2.4vw,20px)', color: 'rgba(200,210,255,0.80)', lineHeight: 1.75, margin: 0 }}>
            {artigo.resumo}
          </p>
        </div>

        {/* Divisor */}
        <div style={{ height: 1, background: `linear-gradient(90deg, ${COR}50 0%, transparent 70%)`, marginBottom: 40 }} />

        {/* Conteúdo */}
        <div
          className="artigo-body"
          dangerouslySetInnerHTML={{ __html: artigo.conteudo }}
        />

        <style>{`
          .artigo-body { font-size: clamp(17px,2.4vw,19px); }
          .artigo-body h1 { font-size: clamp(26px,4.5vw,36px); font-weight: 900; color: #ffffff; margin: 44px 0 18px; line-height: 1.2; }
          .artigo-body h2 { font-size: clamp(21px,3.2vw,28px); font-weight: 900; color: #ffffff; margin: 40px 0 16px; line-height: 1.25; border-bottom: 1px solid ${COR}30; padding-bottom: 10px; }
          .artigo-body h3 { font-size: clamp(18px,2.6vw,22px); font-weight: 800; color: ${COR}; margin: 28px 0 12px; line-height: 1.3; }
          .artigo-body p { font-size: clamp(17px,2.4vw,19px); line-height: 1.90; color: rgba(230,238,255,0.95); margin: 0 0 22px; }
          .artigo-body blockquote { border-left: 5px solid ${COR}cc; padding: 18px 24px; margin: 28px 0; background: ${COR}10; border-radius: 0 14px 14px 0; color: ${COR}; font-style: italic; font-size: clamp(16px,2.2vw,18px); line-height: 1.8; }
          .artigo-body strong { color: #ffffff; font-weight: 900; }
          .artigo-body em { color: ${COR}; font-style: italic; }
          .artigo-body ul, .artigo-body ol { font-size: clamp(16px,2.2vw,18px); line-height: 1.85; color: rgba(230,238,255,0.92); padding-left: 24px; margin: 0 0 20px; }
          .artigo-body li { margin-bottom: 8px; }
          .artigo-body .artigo-icon { font-size: clamp(36px,5vw,52px); }
          .artigo-body .artigo-label { font-size: clamp(11px,1.5vw,13px); }
          .artigo-body .artigo-card-title { font-size: clamp(14px,1.8vw,16px); }
          .artigo-body .artigo-card-body { font-size: clamp(14px,1.8vw,16px); line-height: 1.70; color: rgba(220,232,255,0.82); }
          @media (max-width: 600px) {
            .artigo-body h2 { font-size: 22px; }
            .artigo-body h3 { font-size: 19px; }
            .artigo-body p { font-size: 17px; }
            .artigo-body .artigo-grid-2 { grid-template-columns: 1fr !important; }
            .artigo-body .artigo-grid-auto { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>
      </div>

      <Footer />
    </div>
  );
}
