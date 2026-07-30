import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ARTIGOS_TEOLOGIA } from '../data/teologia';

const BG = '#060d1f';
const CYAN = '#00D4FF';

function renderMarkdown(md: string): string {
  return md
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^\*\*(.+?)\*\*$/gm, '<strong>$1</strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hbp])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '');
}

export default function TeologiaArtigoPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const artigo = ARTIGOS_TEOLOGIA.find(a => a.slug === slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!artigo) {
    return (
      <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
        <Navbar />
        <div style={{ maxWidth: 700, margin: '0 auto', padding: 'clamp(88px,11vw,108px) 24px 60px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>404</div>
          <div style={{ color: 'rgba(255,255,255,0.50)', marginBottom: 24 }}>Artigo não encontrado.</div>
          <button onClick={() => navigate('/teologia')} style={{ all: 'unset', cursor: 'pointer', color: CYAN, fontWeight: 700 }}>
            ← Voltar para Teologia
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
          <button onClick={() => navigate('/teologia')} style={{ all: 'unset', cursor: 'pointer', fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,212,255,0.70)', marginBottom: 36, display: 'block' }}>
            ← Voltar para Teologia
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

      <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(88px,11vw,108px) clamp(16px,4vw,32px) 80px' }}>

        {/* Voltar */}
        <button onClick={() => navigate('/teologia')} style={{ all: 'unset', cursor: 'pointer', fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,212,255,0.70)', marginBottom: 40, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          ← Voltar para Teologia
        </button>

        {/* Cabeçalho */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: CYAN, padding: '3px 10px', borderRadius: 6, background: 'rgba(0,212,255,0.10)', border: '1px solid rgba(0,212,255,0.30)' }}>
              {artigo.categoria}
            </span>
            {artigo.parte && (
              <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                {artigo.parte}
              </span>
            )}
          </div>
          <h1 style={{ fontSize: 'clamp(22px,4vw,34px)', fontWeight: 900, lineHeight: 1.2, margin: '0 0 16px', color: '#fff' }}>
            {artigo.titulo}
          </h1>
          <p style={{ fontSize: 'clamp(15px,2.2vw,17px)', color: 'rgba(255,255,255,0.50)', lineHeight: 1.7, margin: 0 }}>
            {artigo.resumo}
          </p>
        </div>

        {/* Divisor */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(0,212,255,0.30) 0%, transparent 70%)', marginBottom: 40 }} />

        {/* Conteúdo */}
        <div
          style={{ fontSize: 'clamp(15px,2.2vw,17px)', lineHeight: 1.85, color: 'rgba(215,225,245,0.90)' }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(artigo.conteudo) }}
        />

        <style>{`
          .artigo-body h1 { font-size: clamp(22px,3.5vw,30px); font-weight: 900; color: #fff; margin: 36px 0 16px; }
          .artigo-body h2 { font-size: clamp(18px,2.8vw,24px); font-weight: 800; color: rgba(255,255,255,0.90); margin: 28px 0 12px; }
          .artigo-body h3 { font-size: clamp(16px,2.4vw,20px); font-weight: 700; color: rgba(0,212,255,0.85); margin: 22px 0 10px; }
          .artigo-body p { margin: 0 0 18px; }
          .artigo-body blockquote { border-left: 4px solid rgba(0,212,255,0.60); padding: 12px 20px; margin: 20px 0; background: rgba(0,212,255,0.06); border-radius: 0 10px 10px 0; color: rgba(0,212,255,0.90); font-style: italic; }
          .artigo-body strong { color: rgba(255,255,255,0.96); font-weight: 800; }
        `}</style>
      </div>

      <Footer />
    </div>
  );
}
