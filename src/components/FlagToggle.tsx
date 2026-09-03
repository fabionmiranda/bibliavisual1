export default function FlagToggle({
  lang,
  setLang,
}: {
  lang: 'pt' | 'en';
  setLang: (l: 'pt' | 'en') => void;
}) {
  return (
    <div
      className="fixed z-50 flex items-center gap-2"
      style={{
        bottom: 'calc(1.25rem + env(safe-area-inset-bottom))',
        left: 'max(1rem, env(safe-area-inset-left))',
        background: 'rgba(10,14,26,0.78)',
        border: '1.5px solid rgba(0,212,255,0.28)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        borderRadius: '999px',
        padding: '7px 12px',
      }}
    >
      <button
        onClick={() => setLang('pt')}
        title="Português"
        className="flex items-center justify-center"
        style={{
          opacity: lang === 'pt' ? 1 : 0.38,
          transform: lang === 'pt' ? 'scale(1.18)' : 'scale(1)',
          transition: 'opacity 0.2s, transform 0.2s',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          padding: 0,
          lineHeight: 0,
          minWidth: '44px',
          minHeight: '44px',
        }}
      >
        <img
          src="https://flagcdn.com/br.svg"
          alt="Português"
          style={{ width: '32px', height: '22px', borderRadius: '4px', objectFit: 'cover', display: 'block', boxShadow: lang === 'pt' ? '0 0 8px rgba(0,212,255,0.5)' : 'none' }}
        />
      </button>
      <button
        onClick={() => setLang('en')}
        title="English"
        className="flex items-center justify-center"
        style={{
          opacity: lang === 'en' ? 1 : 0.38,
          transform: lang === 'en' ? 'scale(1.18)' : 'scale(1)',
          transition: 'opacity 0.2s, transform 0.2s',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          padding: 0,
          lineHeight: 0,
          minWidth: '44px',
          minHeight: '44px',
        }}
      >
        <img
          src="https://flagcdn.com/us.svg"
          alt="English"
          style={{ width: '32px', height: '22px', borderRadius: '4px', objectFit: 'cover', display: 'block', boxShadow: lang === 'en' ? '0 0 8px rgba(0,212,255,0.5)' : 'none' }}
        />
      </button>
    </div>
  );
}
