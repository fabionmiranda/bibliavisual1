import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ARTIGOS_TEOLOGIA, CATEGORIAS_TEOLOGIA } from '../data/teologia';
import CategoriaSection from '../components/teologia/CategoriaSection';
import FiltroCategoria from '../components/teologia/FiltroCategoria';

const BG = '#060d1f';
const CYAN = '#00D4FF';

export default function TeologiaPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null);

  const artigosFiltrados = useMemo(() => {
    if (!categoriaAtiva) return ARTIGOS_TEOLOGIA;
    return ARTIGOS_TEOLOGIA.filter(a => a.categoria === categoriaAtiva);
  }, [categoriaAtiva]);

  const categoriasVisiveis = categoriaAtiva
    ? [categoriaAtiva]
    : [...CATEGORIAS_TEOLOGIA];

  return (
    <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(88px,11vw,108px) clamp(16px,4vw,32px) 80px' }}>

        {/* ── Hero ── */}
        <div style={{ marginBottom: 52 }}>
          <div style={{
            fontSize: 'clamp(10px,1.4vw,12px)', fontWeight: 900,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: CYAN, marginBottom: 12, opacity: 0.85,
          }}>
            Biblioteca Teológica
          </div>
          <h1 style={{
            fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900,
            lineHeight: 1.15, margin: '0 0 18px',
            background: `linear-gradient(135deg, #fff 0%, rgba(0,212,255,0.85) 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Teologia
          </h1>
          <p style={{
            fontSize: 'clamp(15px,2.2vw,18px)', color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7, maxWidth: 640, margin: 0,
          }}>
            Artigos de formação teológica sistemática — da natureza da disciplina à epistemologia,
            história e fundamentos da autoridade bíblica.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 28, marginTop: 28, flexWrap: 'wrap' }}>
            {[
              { n: ARTIGOS_TEOLOGIA.length, label: 'artigos' },
              { n: CATEGORIAS_TEOLOGIA.length, label: 'categorias' },
              { n: ARTIGOS_TEOLOGIA.filter(a => a.status === 'publicado').length, label: 'publicados' },
            ].map(s => (
              <div key={s.label}>
                <span style={{ fontSize: 'clamp(22px,3.5vw,30px)', fontWeight: 900, color: CYAN }}>{s.n}</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.40)', marginLeft: 6 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divisor */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(0,212,255,0.35) 0%, transparent 70%)', marginBottom: 32 }} />

        {/* ── Filtro ── */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 12 }}>
            Filtrar por categoria
          </div>
          <FiltroCategoria
            categorias={CATEGORIAS_TEOLOGIA}
            ativa={categoriaAtiva}
            onChange={setCategoriaAtiva}
          />
        </div>

        {/* ── Conteúdo por categoria ── */}
        {categoriasVisiveis.map(cat => (
          <CategoriaSection
            key={cat}
            categoria={cat}
            artigos={artigosFiltrados.filter(a => a.categoria === cat)}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}
