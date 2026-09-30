import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DIAS_CONTENT from '../data/devocionalReformaContent';

const ACCENT = 'rgba(217,119,6,1)';
const ACCENT_RGB = '217,119,6';
const BG = '#05071a';

// Semanas seguindo os capítulos de González — A Era dos Reformadores
export const SEMANAS = [
  {
    num: 1,
    titulo: 'Contexto, Isabel e a Teologia de Lutero',
    subtitulo: 'Introdução · Cap. 1 · Cap. 2 · Cap. 3 (pts. 1–2)',
    cor: 'rgba(217,119,6,1)',
    corRgb: '217,119,6',
    dias: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    num: 2,
    titulo: 'Wittenberg, Zuínglio e os Anabatistas',
    subtitulo: 'Cap. 3 (pt. 3) · Cap. 4 · Cap. 5 · Cap. 6',
    cor: 'rgba(220,38,38,1)',
    corRgb: '220,38,38',
    dias: [8, 9, 10, 11, 12, 13, 14],
  },
  {
    num: 3,
    titulo: 'Calvino, Inglaterra e a Política da Reforma',
    subtitulo: 'Cap. 7 · Cap. 8 · Cap. 9 (pt. 1)',
    cor: 'rgba(234,88,12,1)',
    corRgb: '234,88,12',
    dias: [15, 16, 17, 18, 19, 20, 21],
  },
  {
    num: 4,
    titulo: 'Europa em Chamas: Países Baixos, França e Roma',
    subtitulo: 'Cap. 9 (pt. 2) · Cap. 10 · Cap. 11 · Cap. 12',
    cor: 'rgba(202,138,4,1)',
    corRgb: '202,138,4',
    dias: [22, 23, 24, 25, 26, 27, 28],
  },
  {
    num: 5,
    titulo: 'Espanha e a Síntese Final',
    subtitulo: 'Cap. 13 · Cap. 14 — Síntese',
    cor: 'rgba(124,58,237,1)',
    corRgb: '124,58,237',
    dias: [29, 30, 31],
  },
];

// 31 dias conforme cronograma — A Era dos Reformadores (Outubro 2026)
export const TITULOS_DIAS: Record<number, { titulo: string; ref: string }> = {
  1:  { titulo: 'O Século XVI e o Cenário que Tornou a Reforma Necessária',         ref: 'Introdução · Contexto Geral' },
  2:  { titulo: 'Isabel, a Católica: A Reforma Antes da Reforma',                   ref: 'Cap. 1 — Parte 1' },
  3:  { titulo: 'Cisneros e a Poliglota Complutense',                               ref: 'Cap. 1 — Parte 2' },
  4:  { titulo: 'Lutero: A Angústia que Gerou uma Teologia',                        ref: 'Cap. 2 — Parte 1' },
  5:  { titulo: 'As 95 Teses e a Dieta de Worms',                                   ref: 'Cap. 2 — Parte 2' },
  6:  { titulo: 'Teologia da Cruz vs. Teologia da Glória',                          ref: 'Cap. 3 — Parte 1' },
  7:  { titulo: 'Lei e Evangelho; Sola Fide',                                       ref: 'Cap. 3 — Parte 2' },
  8:  { titulo: 'Reflexão: O Que a Reforma Significa para a Vida',                  ref: 'Cap. 3 — Parte 3' },
  9:  { titulo: 'Wartburgo: A Bíblia em Alemão',                                    ref: 'Cap. 4 — Parte 1' },
  10: { titulo: 'Os Radicais de Wittenberg',                                        ref: 'Cap. 4 — Parte 2' },
  11: { titulo: 'Zuínglio: Humanismo e Reforma em Zurique',                         ref: 'Cap. 5 — Parte 1' },
  12: { titulo: 'Colóquio de Marburgo: A Grande Divisão',                           ref: 'Cap. 5 — Parte 2' },
  13: { titulo: 'Anabatistas: A Igreja dos Regenerados',                            ref: 'Cap. 6 — Parte 1' },
  14: { titulo: 'Batismo como Questão de Fé e Consciência',                         ref: 'Cap. 6 — Parte 2' },
  15: { titulo: 'Calvino: As Institutas da Religião Cristã',                        ref: 'Cap. 7 — Parte 1' },
  16: { titulo: 'Predestinação, Santidade e a Cidade de Genebra',                   ref: 'Cap. 7 — Parte 2' },
  17: { titulo: 'Reflexão: Calvino e a Soberania de Deus',                          ref: 'Cap. 7 — Parte 3' },
  18: { titulo: 'Henrique VIII e a Reforma Inglesa',                                ref: 'Cap. 8 — Parte 1' },
  19: { titulo: 'Cranmer, o Livro de Oração Comum e Tomás More',                   ref: 'Cap. 8 — Parte 2' },
  20: { titulo: 'Knox e a Reforma na Escócia',                                      ref: 'Cap. 8 — Parte 3' },
  21: { titulo: 'Guerra de Esmalcalda: Fé e Poder Político',                        ref: 'Cap. 9 — Parte 1' },
  22: { titulo: 'Luteranismo na Escandinávia e a Paz Religiosa de Augsburgo',       ref: 'Cap. 9 — Parte 2' },
  23: { titulo: 'Os Países Baixos: Reforma, Resistência e Liberdade',               ref: 'Cap. 10 — Parte 1' },
  24: { titulo: 'Guilherme de Orange e a Independência dos Países Baixos',          ref: 'Cap. 10 — Parte 2' },
  25: { titulo: 'Huguenotes: O Protestantismo Francês sob Perseguição',             ref: 'Cap. 11 — Parte 1' },
  26: { titulo: 'Massacre de São Bartolomeu: Sangue e Fé',                          ref: 'Cap. 11 — Parte 2' },
  27: { titulo: 'Reforma Católica: A Resposta de Roma ao Protestantismo',           ref: 'Cap. 12 — Parte 1' },
  28: { titulo: 'Teresa de Ávila, os Jesuítas e o Concílio de Trento',             ref: 'Cap. 12 — Parte 2' },
  29: { titulo: 'O Paradoxo Espanhol: A Inquisição como Reforma mais Eficaz',      ref: 'Cap. 13 — Parte 1' },
  30: { titulo: 'Casiodoro de Reina: A Bíblia em Espanhol',                        ref: 'Cap. 13 — Parte 2' },
  31: { titulo: 'Uma Era em Convulsão: Fim da Cristandade Medieval e Início do Mundo Moderno', ref: 'Cap. 14 — Síntese Final' },
};

// ─── Day card with hover ──────────────────────────────────────────────────────
function DayCard({ dia, semana, si, di }: {
  dia: number;
  semana: typeof SEMANAS[0];
  si: number;
  di: number;
}) {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const hasContent = !!DIAS_CONTENT[dia];

  const borderOpacity   = hasContent ? (hover ? 0.90 : 0.65) : (hover ? 0.32 : 0.16);
  const bgOpacity       = hasContent ? (hover ? 0.22 : 0.14) : (hover ? 0.07 : 0.04);

  return (
    <motion.div
      key={dia}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: si * 0.06 + di * 0.035 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      onClick={() => hasContent && navigate(`/devocional/reforma/dia-${String(dia).padStart(2, '0')}`)}
      style={{
        borderRadius: 16,
        border: `${hasContent ? '2px' : '1.5px'} solid rgba(${semana.corRgb},${borderOpacity})`,
        background: `rgba(${semana.corRgb},${bgOpacity})`,
        padding: '18px 16px',
        display: 'flex', flexDirection: 'column', gap: 8,
        cursor: hasContent ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 160,
        boxSizing: 'border-box',
        transition: 'border-color 0.22s, background 0.22s, transform 0.22s, box-shadow 0.22s',
        transform: (hover && hasContent) ? 'scale(1.03)' : 'scale(1)',
        boxShadow: hasContent
          ? hover
            ? `0 0 36px rgba(${semana.corRgb},0.40), 0 0 12px rgba(${semana.corRgb},0.22), inset 0 0 24px rgba(${semana.corRgb},0.06)`
            : `0 0 22px rgba(${semana.corRgb},0.26), inset 0 0 16px rgba(${semana.corRgb},0.04)`
          : 'none',
      }}
    >
      {/* top bar — sempre visível nos dias com conteúdo */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: hasContent ? 3 : 2,
        background: hasContent
          ? `linear-gradient(90deg, rgba(${semana.corRgb},0.4), ${semana.cor}, rgba(${semana.corRgb},0.4))`
          : `linear-gradient(90deg, transparent, ${semana.cor}, transparent)`,
        opacity: hasContent ? 1 : (hover ? 1 : 0),
        transition: 'opacity 0.3s',
      }} />

      {/* glow interno nos dias com conteúdo */}
      {hasContent && (
        <div style={{
          position: 'absolute', top: -20, right: -20, width: 100, height: 100,
          borderRadius: '50%', background: semana.cor,
          filter: 'blur(35px)', opacity: hover ? 0.20 : 0.10,
          pointerEvents: 'none', transition: 'opacity 0.3s',
        }} />
      )}

      {/* DIA label */}
      {hasContent ? (
        <div style={{
          display: 'inline-flex', alignItems: 'baseline', gap: 5,
          fontSize: 15, fontWeight: 900, letterSpacing: '0.10em',
          color: semana.cor,
        }}>
          Dia {String(dia).padStart(2, '0')}
          <span style={{ fontSize: 11, fontWeight: 700, color: `rgba(${semana.corRgb},0.65)`, letterSpacing: '0.06em' }}>
            de 31
          </span>
        </div>
      ) : (
        <div style={{ fontSize: 13, fontWeight: 900, color: `rgba(${semana.corRgb},0.55)`, letterSpacing: '0.14em' }}>
          DIA {String(dia).padStart(2, '0')}
        </div>
      )}

      {/* ref — só mostra se não tem "Parte" ou se não tem conteúdo */}
      <div style={{
        fontSize: 10, fontWeight: 700,
        color: hasContent ? `rgba(${semana.corRgb},0.75)` : `rgba(${semana.corRgb},0.42)`,
        letterSpacing: '0.10em', textTransform: 'uppercase', lineHeight: 1.3,
      }}>
        {TITULOS_DIAS[dia].ref.replace(/ — Parte \d+/g, '').replace(/ · Parte \d+/g, '')}
      </div>

      {/* title — main focus */}
      <div style={{
        fontSize: hasContent ? 15 : 14,
        fontWeight: hasContent ? 800 : 600,
        color: hasContent ? (hover ? '#fff' : 'rgba(255,255,255,0.95)') : (hover ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.45)'),
        lineHeight: 1.5, flex: 1,
        transition: 'color 0.22s',
      }}>
        {TITULOS_DIAS[dia].titulo}
      </div>

      {/* status badge */}
      {hasContent ? (
        <div style={{
          marginTop: 6,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 9, fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase',
          color: semana.cor,
          background: `rgba(${semana.corRgb},0.14)`,
          border: `1px solid rgba(${semana.corRgb},0.30)`,
          borderRadius: 99, padding: '4px 10px',
          alignSelf: 'flex-start',
        }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: semana.cor }} />
          Ler devocional →
        </div>
      ) : (
        <div style={{
          marginTop: 6,
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontSize: 8, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: `rgba(${semana.corRgb},0.35)`,
        }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: `rgba(${semana.corRgb},0.22)` }} />
          Em breve
        </div>
      )}

      {/* decorative background number */}
      <div style={{
        position: 'absolute', bottom: -14, right: 6,
        fontSize: 80, fontWeight: 900, lineHeight: 1,
        color: semana.cor, opacity: 0.07,
        userSelect: 'none', pointerEvents: 'none',
      }}>
        {dia}
      </div>
    </motion.div>
  );
}

export default function DevocionalReformaPage() {
  const navigate = useNavigate();

  // week color dots for progress indicator
  const semanasCores = SEMANAS.map(s => ({ cor: s.cor, corRgb: s.corRgb, num: s.num }));

  return (
    <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
      <Navbar />

      <div style={{ maxWidth: 980, margin: '0 auto', padding: 'clamp(84px,10vw,106px) clamp(16px,4vw,40px) 120px' }}>

        {/* ── Breadcrumb ── */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 48, fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(200,200,255,0.28)' }}
        >
          <span
            onClick={() => navigate('/devocional')}
            style={{ cursor: 'pointer', transition: 'color 0.18s' }}
            onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,200,255,0.28)')}
          >
            Devocional
          </span>
          <span>›</span>
          <span style={{ color: 'rgba(217,119,6,0.75)' }}>Reforma Protestante</span>
        </motion.div>

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative', borderRadius: 28, overflow: 'hidden',
            marginBottom: 64, padding: 'clamp(36px,5vw,56px)',
            background: 'linear-gradient(135deg, #1a0800 0%, #120a00 50%, #05071a 100%)',
            border: `1.5px solid rgba(${ACCENT_RGB},0.22)`,
          }}
        >
          {/* glows */}
          <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: ACCENT, filter: 'blur(80px)', opacity: 0.12, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -20, width: 180, height: 180, borderRadius: '50%', background: 'rgba(220,38,38,1)', filter: 'blur(60px)', opacity: 0.08, pointerEvents: 'none' }} />

          <div style={{ position: 'relative' }}>
            {/* badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: ACCENT, background: `rgba(${ACCENT_RGB},0.12)`, border: `1px solid rgba(${ACCENT_RGB},0.25)`, padding: '5px 14px', borderRadius: 99 }}>
                Série · 31 Dias
              </span>
              <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(251,191,36,0.85)', background: 'rgba(251,191,36,0.10)', border: '1px solid rgba(251,191,36,0.20)', padding: '5px 14px', borderRadius: 99 }}>
                Em Construção
              </span>
            </div>

            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.38em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 14 }}>
              Devocional Histórico
            </div>

            <h1 style={{
              fontSize: 'clamp(36px,6vw,64px)', fontWeight: 900, lineHeight: 1.06, margin: '0 0 10px',
              background: `linear-gradient(135deg, #fff 30%, rgba(${ACCENT_RGB},0.9) 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Devocional da<br />Reforma Protestante
            </h1>
            <p style={{ fontSize: 20, color: `rgba(${ACCENT_RGB},0.80)`, fontWeight: 700, margin: '0 0 20px', fontStyle: 'italic' }}>
              31 dias como você nunca viu antes
            </p>
            <p style={{ fontSize: 'clamp(15px,1.9vw,17px)', color: 'rgba(200,200,255,0.60)', lineHeight: 1.9, maxWidth: 580, margin: '0 0 32px' }}>
              Trinta e um dias percorrendo os homens, os momentos e as doutrinas que partiram a história da Igreja ao meio — da crise de Lutero no mosteiro à Dieta de Worms, dos cinco solas ao legado que ainda molda o mundo.
            </p>

            {/* ── 5-week progress indicator ── */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(200,200,255,0.32)', marginBottom: 10 }}>
                5 Semanas
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                {semanasCores.map((s) => (
                  <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      height: 6, width: s.num === 5 ? 24 : 36,
                      borderRadius: 99,
                      background: s.cor,
                      opacity: 0.75,
                    }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: `rgba(${s.corRgb},0.65)`, letterSpacing: '0.08em' }}>
                      S{s.num}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Semanas ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
          {SEMANAS.map((semana, si) => (
            <motion.div
              key={semana.num}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: si * 0.09 }}
            >
              {/* ── Week banner header ── */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 0,
                marginBottom: 22,
                borderRadius: 16,
                overflow: 'hidden',
                border: `1px solid rgba(${semana.corRgb},0.22)`,
                background: `rgba(${semana.corRgb},0.06)`,
              }}>
                {/* colored number box */}
                <div style={{
                  width: 72, minHeight: 72,
                  background: `rgba(${semana.corRgb},0.15)`,
                  borderRight: `1px solid rgba(${semana.corRgb},0.22)`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  gap: 2,
                  padding: '12px 0',
                }}>
                  <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: `rgba(${semana.corRgb},0.65)` }}>
                    SEM.
                  </div>
                  <div style={{ fontSize: 40, fontWeight: 900, lineHeight: 1, color: semana.cor }}>
                    {semana.num}
                  </div>
                </div>

                {/* week title + subtitulo */}
                <div style={{ padding: '14px 20px', flex: 1 }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', lineHeight: 1.22, marginBottom: 5 }}>
                    {semana.titulo}
                  </div>
                  <div style={{ fontSize: 12, color: `rgba(${semana.corRgb},0.65)`, fontWeight: 700, letterSpacing: '0.04em' }}>
                    {semana.subtitulo}
                  </div>
                </div>

                {/* day count pill */}
                <div style={{
                  marginRight: 16, flexShrink: 0,
                  fontSize: 11, fontWeight: 900, letterSpacing: '0.14em',
                  color: `rgba(${semana.corRgb},0.65)`,
                  background: `rgba(${semana.corRgb},0.10)`,
                  border: `1px solid rgba(${semana.corRgb},0.22)`,
                  padding: '6px 14px', borderRadius: 99,
                  textTransform: 'uppercase',
                }}>
                  {semana.dias.length} dias
                </div>
              </div>

              {/* ── Day cards grid ── */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
                gap: 14,
              }}>
                {semana.dias.map((dia, di) => (
                  <DayCard key={dia} dia={dia} semana={semana} si={si} di={di} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Nota de construção ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: 72,
            borderRadius: 20,
            border: `1px solid rgba(${ACCENT_RGB},0.18)`,
            background: `rgba(${ACCENT_RGB},0.05)`,
            padding: 'clamp(24px,3.5vw,36px)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 16 }}>⚡</div>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: `rgba(${ACCENT_RGB},0.65)`, marginBottom: 10 }}>
            Série em Construção
          </div>
          <p style={{ fontSize: 15, color: 'rgba(200,200,255,0.55)', lineHeight: 1.85, maxWidth: 480, margin: '0 auto 20px' }}>
            Os 31 dias estão sendo produzidos. O conteúdo de cada dia será publicado progressivamente — volte em breve para acompanhar.
          </p>
          <button
            onClick={() => navigate('/devocional')}
            style={{
              background: 'none', cursor: 'pointer',
              border: `1px solid rgba(${ACCENT_RGB},0.30)`,
              borderRadius: 99, padding: '10px 24px',
              fontSize: 11, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: ACCENT, transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `rgba(${ACCENT_RGB},0.12)`; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
          >
            ← Voltar para os Devocionais
          </button>
        </motion.div>

      </div>

      <Footer />
    </div>
  );
}
