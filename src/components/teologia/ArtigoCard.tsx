import { useNavigate } from 'react-router-dom';
import type { ArtigoTeologia } from '../../data/teologia';

const CYAN = '#00D4FF';

export default function ArtigoCard({ artigo }: { artigo: ArtigoTeologia }) {
  const navigate = useNavigate();
  const publicado = artigo.status === 'publicado';

  function handleClick() {
    if (publicado) navigate(`/teologia/${artigo.slug}`);
  }

  return (
    <div
      onClick={handleClick}
      style={{
        borderRadius: 16,
        border: `1px solid ${publicado ? 'rgba(0,212,255,0.22)' : 'rgba(255,255,255,0.07)'}`,
        background: publicado
          ? 'linear-gradient(145deg, rgba(0,212,255,0.06) 0%, rgba(5,7,26,0.96) 100%)'
          : 'rgba(5,7,26,0.85)',
        cursor: publicado ? 'pointer' : 'default',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        overflow: 'hidden',
        position: 'relative',
      }}
      onMouseEnter={e => {
        if (publicado) {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,212,255,0.55)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 28px rgba(0,212,255,0.12)';
        }
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = publicado
          ? 'rgba(0,212,255,0.22)' : 'rgba(255,255,255,0.07)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 3,
        background: publicado
          ? `linear-gradient(90deg, ${CYAN} 0%, rgba(0,212,255,0.3) 70%, transparent 100%)`
          : 'linear-gradient(90deg, rgba(255,255,255,0.12) 0%, transparent 100%)',
      }} />

      <div style={{ padding: '16px 20px 20px' }}>
        {/* Badge row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{
            fontSize: 9, fontWeight: 900, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: CYAN,
            padding: '3px 8px', borderRadius: 5,
            background: 'rgba(0,212,255,0.10)', border: '1px solid rgba(0,212,255,0.30)',
          }}>
            Artigo{artigo.parte ? ` · ${artigo.parte}` : ''}
          </span>
          {!publicado && (
            <span style={{
              fontSize: 9, fontWeight: 900, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(255,200,80,0.80)',
              padding: '3px 8px', borderRadius: 5,
              background: 'rgba(255,200,80,0.08)', border: '1px solid rgba(255,200,80,0.25)',
            }}>
              Em breve
            </span>
          )}
        </div>

        {/* Título */}
        <div style={{
          fontSize: 'clamp(15px,2.4vw,17px)', fontWeight: 800,
          color: publicado ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.40)',
          lineHeight: 1.4, marginBottom: 8,
        }}>
          {artigo.titulo}
        </div>

        {/* Resumo */}
        <div style={{
          fontSize: 'clamp(13px,2vw,14px)',
          color: publicado ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.25)',
          lineHeight: 1.65,
        }}>
          {artigo.resumo}
        </div>

        {/* Ler artigo link */}
        {publicado && (
          <div style={{
            marginTop: 14, fontSize: 11, fontWeight: 900,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: CYAN, opacity: 0.80,
          }}>
            Ler artigo →
          </div>
        )}
      </div>
    </div>
  );
}
