const CYAN = '#00D4FF';

export default function FiltroCategoria({
  categorias,
  ativa,
  onChange,
}: {
  categorias: readonly string[];
  ativa: string | null;
  onChange: (cat: string | null) => void;
}) {
  const todas = [null, ...categorias];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {todas.map(cat => {
        const active = cat === ativa;
        return (
          <button
            key={cat ?? '__todas'}
            onClick={() => onChange(cat)}
            style={{
              all: 'unset', cursor: 'pointer',
              padding: '6px 14px', borderRadius: 10,
              fontSize: 12, fontWeight: 700,
              letterSpacing: '0.04em',
              color: active ? '#060d1f' : 'rgba(255,255,255,0.60)',
              background: active ? CYAN : 'rgba(255,255,255,0.05)',
              border: `1px solid ${active ? CYAN : 'rgba(255,255,255,0.10)'}`,
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              if (!active) {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = 'rgba(0,212,255,0.10)';
                el.style.color = CYAN;
                el.style.borderColor = 'rgba(0,212,255,0.40)';
              }
            }}
            onMouseLeave={e => {
              if (!active) {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = 'rgba(255,255,255,0.05)';
                el.style.color = 'rgba(255,255,255,0.60)';
                el.style.borderColor = 'rgba(255,255,255,0.10)';
              }
            }}
          >
            {cat ?? 'Todas as categorias'}
          </button>
        );
      })}
    </div>
  );
}
