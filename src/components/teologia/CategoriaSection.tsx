import type { ArtigoTeologia } from '../../data/teologia';
import ArtigoCard from './ArtigoCard';

const CYAN = '#00D4FF';

export default function CategoriaSection({
  categoria,
  artigos,
}: {
  categoria: string;
  artigos: ArtigoTeologia[];
}) {
  if (artigos.length === 0) return null;

  return (
    <section style={{ marginBottom: 52 }}>
      {/* Categoria header */}
      <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 4, height: 28, borderRadius: 3, background: CYAN, flexShrink: 0 }} />
        <h2 style={{
          fontSize: 'clamp(16px,2.8vw,20px)', fontWeight: 900,
          color: 'rgba(255,255,255,0.95)', lineHeight: 1.2, margin: 0,
          letterSpacing: '0.02em',
        }}>
          {categoria}
        </h2>
        <span style={{
          fontSize: 11, fontWeight: 700, color: 'rgba(0,212,255,0.55)',
          marginLeft: 'auto', flexShrink: 0,
        }}>
          {artigos.length} {artigos.length === 1 ? 'artigo' : 'artigos'}
        </span>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
        gap: 14,
      }}>
        {artigos.map(a => <ArtigoCard key={a.id} artigo={a} />)}
      </div>
    </section>
  );
}
