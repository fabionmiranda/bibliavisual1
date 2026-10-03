import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, BookOpen, MessageCircle, Heart, BookMarked } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DIAS_CONTENT from '../data/devocionalReformaContent';
import { TITULOS_DIAS, SEMANAS } from './DevocionalReformaPage';

const ACCENT_DEFAULT = 'rgba(217,119,6,1)';
const ACCENT_RGB_DEFAULT = '217,119,6';
const BG = '#05071a';

function getSemana(dia: number) {
  return SEMANAS.find(s => s.dias.includes(dia)) ?? SEMANAS[0];
}

const TIPO_CONFIG = {
  contexto: { label: 'Contexto Histórico', color: '#60a5fa', icon: BookOpen },
  analise:  { label: 'Análise',            color: '#f97316', icon: BookMarked },
  reflexao: { label: 'Reflexão',           color: '#a78bfa', icon: MessageCircle },
  oracao:   { label: 'Oração',             color: '#34d399', icon: Heart },
  leitura:  { label: 'Leitura',            color: '#fbbf24', icon: BookOpen },
};

/* ── shared text styles ─────────────────────────────────────────────────── */
const T = {
  body:   { fontSize: 'clamp(16px,2.1vw,18px)', color: 'rgba(228,232,255,0.93)', lineHeight: 2.0 } as React.CSSProperties,
  label:  { fontSize: 10, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase' as const },
  h2:     { margin: 0, fontSize: 'clamp(19px,2.8vw,24px)', fontWeight: 900, color: '#fff', lineHeight: 1.22 } as React.CSSProperties,
  quote:  { margin: 0, fontSize: 'clamp(16px,2.3vw,20px)', fontWeight: 700, color: '#fff', lineHeight: 1.70, fontStyle: 'italic' } as React.CSSProperties,
};

export default function DevocionalReformaDiaPage() {
  const { dia: diaParam } = useParams<{ dia: string }>();
  const navigate = useNavigate();
  const dia = Number((diaParam ?? '1').replace(/^dia-?/i, ''));
  const content = DIAS_CONTENT[dia];
  const semana = getSemana(dia);
  const accent = semana?.cor ?? ACCENT_DEFAULT;
  const accentRgb = semana?.corRgb ?? ACCENT_RGB_DEFAULT;

  if (!content) {
    return (
      <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.85)' }}>
        <Navbar />
        <div style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(100px,12vw,140px) 24px 80px', textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 24, opacity: 0.3 }}>⚡</div>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: '#fff', marginBottom: 14 }}>Em breve</h2>
          <p style={{ ...T.body, color: 'rgba(210,215,255,0.65)', marginBottom: 32, maxWidth: 420, margin: '0 auto 32px' }}>
            O conteúdo do Dia {dia} está sendo preparado e será publicado em breve.
          </p>
          <button
            onClick={() => navigate('/devocional/reforma')}
            style={{ background: 'none', cursor: 'pointer', border: `1px solid rgba(${accentRgb},0.30)`, borderRadius: 99, padding: '10px 24px', fontSize: 11, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = `rgba(${accentRgb},0.12)`; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
          >
            ← Voltar aos 31 Dias
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const prevDia = dia > 1 ? dia - 1 : null;
  const nextDia = dia < 31 ? dia + 1 : null;
  const nextHasContent = nextDia ? !!DIAS_CONTENT[nextDia] : false;

  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#e4e8ff' }}>
      <Navbar />

      <div style={{ maxWidth: 780, margin: '0 auto', padding: 'clamp(84px,10vw,106px) clamp(20px,4vw,36px) 120px' }}>

        {/* ── Breadcrumb ── */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 48, fontSize: 10, fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(200,205,255,0.38)' }}
        >
          <span onClick={() => navigate('/devocional')} style={{ cursor: 'pointer', transition: 'color 0.18s' }}
            onMouseEnter={e => (e.currentTarget.style.color = accent)}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,205,255,0.38)')}
          >Devocional</span>
          <span>›</span>
          <span onClick={() => navigate('/devocional/reforma', { state: { activeDia: dia } })} style={{ cursor: 'pointer', transition: 'color 0.18s' }}
            onMouseEnter={e => (e.currentTarget.style.color = accent)}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,205,255,0.38)')}
          >Reforma Protestante</span>
          <span>›</span>
          <span style={{ color: `rgba(${accentRgb},0.85)` }}>Dia {String(dia).padStart(2, '0')}</span>
        </motion.div>

        {/* ── Hero do dia ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative', borderRadius: 28, overflow: 'hidden',
            marginBottom: 52, padding: 'clamp(32px,5vw,52px)',
            background: `linear-gradient(135deg, #0e0600 0%, #080512 100%)`,
            border: `1.5px solid rgba(${accentRgb},0.28)`,
          }}
        >
          <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: accent, filter: 'blur(80px)', opacity: 0.14, pointerEvents: 'none' }} />

          <div style={{ position: 'relative' }}>
            {/* badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
              <span style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: accent, background: `rgba(${accentRgb},0.18)`, border: `1.5px solid rgba(${accentRgb},0.40)`, padding: '8px 18px', borderRadius: 99, boxShadow: `0 0 14px rgba(${accentRgb},0.25)` }}>
                Semana {semana?.num} · {TITULOS_DIAS[dia]?.ref}
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(230,230,255,0.80)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.16)', padding: '8px 18px', borderRadius: 99 }}>
                {content.data}
              </span>
            </div>

            <div style={{ fontSize: 'clamp(15px,2.2vw,20px)', fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase', color: accent, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 14, background: `rgba(${accentRgb},0.18)`, border: `2px solid rgba(${accentRgb},0.50)`, fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 900, color: accent, boxShadow: `0 0 18px rgba(${accentRgb},0.35)`, flexShrink: 0 }}>
                {String(dia).padStart(2, '0')}
              </span>
              <span>
                <span style={{ fontSize: 'clamp(13px,1.8vw,16px)', fontWeight: 900, letterSpacing: '0.26em', display: 'block', color: `rgba(${accentRgb},0.70)` }}>DIA</span>
                <span style={{ fontSize: 'clamp(11px,1.4vw,13px)', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(220,220,255,0.40)' }}>de 31 dias</span>
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(30px,5.5vw,52px)', fontWeight: 900, lineHeight: 1.08, margin: '0 0 14px',
              background: `linear-gradient(135deg, #fff 25%, rgba(${accentRgb},0.90) 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {content.titulo}
            </h1>
            <p style={{ fontSize: 17, color: `rgba(${accentRgb},0.88)`, fontWeight: 600, fontStyle: 'italic', margin: 0, lineHeight: 1.55 }}>
              {content.subtitulo}
            </p>
          </div>
        </motion.div>

        {/* ── Versículo do dia ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          style={{
            marginBottom: 56,
            borderRadius: 22,
            border: `1.5px solid rgba(${accentRgb},0.32)`,
            background: `rgba(${accentRgb},0.08)`,
            padding: 'clamp(26px,4vw,40px)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: -24, right: -24, width: 130, height: 130, borderRadius: '50%', background: accent, filter: 'blur(45px)', opacity: 0.12, pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ ...T.label, color: `rgba(${accentRgb},0.75)`, marginBottom: 18 }}>
              Versículo do Dia
            </div>
            <blockquote style={{
              margin: '0 0 16px',
              fontSize: 'clamp(20px,3vw,26px)',
              fontWeight: 700,
              lineHeight: 1.60,
              color: '#fff',
              fontStyle: 'italic',
              borderLeft: `4px solid ${accent}`,
              paddingLeft: 22,
            }}>
              "{content.versiculo}"
            </blockquote>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: `rgba(${accentRgb},0.85)`, letterSpacing: '0.10em' }}>
              {content.versiculoRef}
            </p>
          </div>
        </motion.div>

        {/* ── Seções de conteúdo ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
          {content.secoes.map((secao, i) => {
            const cfg = TIPO_CONFIG[secao.tipo] ?? TIPO_CONFIG.contexto;
            const IconComp = cfg.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + i * 0.10 }}
              >
                {/* section header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 13, background: cfg.color + '20', border: `1.5px solid ${cfg.color}38`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <IconComp size={18} color={cfg.color} strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ ...T.label, color: cfg.color, marginBottom: 4 }}>
                      {cfg.label}
                    </div>
                    <h2 style={T.h2}>{secao.titulo}</h2>
                  </div>
                </div>

                {/* paragraphs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {secao.paragrafos.map((p, pi) => (
                    <p key={pi} style={{ margin: 0, ...T.body }} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                </div>

                {/* pull quote */}
                {secao.citacao && (
                  <div style={{
                    marginTop: 32,
                    borderRadius: 18,
                    background: `linear-gradient(135deg, rgba(${accentRgb},0.09) 0%, rgba(${accentRgb},0.04) 100%)`,
                    border: `1px solid rgba(${accentRgb},0.25)`,
                    borderLeft: `5px solid ${accent}`,
                    padding: '24px 28px',
                  }}>
                    <p style={{ ...T.quote, marginBottom: secao.citacaoAutor ? 14 : 0 }}>
                      "{secao.citacao}"
                    </p>
                    {secao.citacaoAutor && (
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: `rgba(${accentRgb},0.80)`, letterSpacing: '0.10em' }}>
                        — {secao.citacaoAutor}
                      </p>
                    )}
                  </div>
                )}

                {/* divider */}
                {i < content.secoes.length - 1 && (
                  <div style={{ height: 1, background: `linear-gradient(90deg, transparent, rgba(${accentRgb},0.22), transparent)`, marginTop: 48 }} />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ── Para Refletir ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          style={{ marginTop: 64 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 30 }}>
            <div style={{ width: 42, height: 42, borderRadius: 13, background: 'rgba(167,139,250,0.16)', border: '1.5px solid rgba(167,139,250,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={18} color="#a78bfa" strokeWidth={2} />
            </div>
            <div>
              <div style={{ ...T.label, color: '#a78bfa', marginBottom: 4 }}>Reflexão Pessoal</div>
              <h2 style={T.h2}>Para Refletir</h2>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {content.perguntas.map((q, i) => (
              <div key={i} style={{
                display: 'flex', gap: 18, alignItems: 'flex-start',
                borderRadius: 18,
                background: 'rgba(167,139,250,0.07)',
                border: '1px solid rgba(167,139,250,0.20)',
                padding: '22px 24px',
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(167,139,250,0.20)', border: '1px solid rgba(167,139,250,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, color: '#c4b5fd', flexShrink: 0, marginTop: 2 }}>
                  {i + 1}
                </div>
                <p style={{ margin: 0, fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(225,228,255,0.90)', lineHeight: 1.90 }}>
                  {q}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Oração ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52 }}
          style={{
            marginTop: 56,
            borderRadius: 24,
            background: 'linear-gradient(135deg, rgba(52,211,153,0.09) 0%, rgba(52,211,153,0.04) 100%)',
            border: '1.5px solid rgba(52,211,153,0.25)',
            padding: 'clamp(28px,4vw,44px)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: '#34d399', filter: 'blur(60px)', opacity: 0.09, pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <div style={{ width: 42, height: 42, borderRadius: 13, background: 'rgba(52,211,153,0.18)', border: '1.5px solid rgba(52,211,153,0.32)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={18} color="#34d399" strokeWidth={2} />
              </div>
              <div>
                <div style={{ ...T.label, color: 'rgba(52,211,153,0.80)', marginBottom: 4 }}>Oração do Dia</div>
                <h2 style={{ ...T.h2, color: '#a7f3d0' }}>Oração</h2>
              </div>
            </div>
            {content.oracao.split('\n\n').map((p, i, arr) => (
              <p key={i} style={{ margin: i < arr.length - 1 ? '0 0 18px' : 0, ...T.body, color: 'rgba(220,250,240,0.90)', fontStyle: 'italic' }}>
                {p}
              </p>
            ))}
          </div>
        </motion.div>

        {/* ── Leitura Complementar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58 }}
          style={{
            marginTop: 44,
            borderRadius: 18,
            background: 'rgba(251,191,36,0.05)',
            border: '1px solid rgba(251,191,36,0.18)',
            padding: '22px 28px',
            display: 'flex', alignItems: 'flex-start', gap: 16,
          }}
        >
          <BookMarked size={20} color="rgba(251,191,36,0.80)" strokeWidth={2} style={{ flexShrink: 0, marginTop: 3 }} />
          <div>
            <div style={{ ...T.label, color: 'rgba(251,191,36,0.75)', marginBottom: 10 }}>
              Leitura Complementar
            </div>
            <p style={{ margin: 0, fontSize: 14, color: 'rgba(220,215,180,0.85)', lineHeight: 1.85 }}>
              {content.leituraComplementar}
            </p>
          </div>
        </motion.div>

        {/* ── Navegação prev / next ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.62 }}
          style={{ marginTop: 72, display: 'flex', gap: 14, justifyContent: 'space-between', flexWrap: 'wrap' }}
        >
          <button
            onClick={() => prevDia && navigate(`/devocional/reforma/dia-${String(prevDia).padStart(2, '0')}`)}
            disabled={!prevDia}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', cursor: prevDia ? 'pointer' : 'default', border: `1px solid rgba(${accentRgb},${prevDia ? '0.30' : '0.10'})`, borderRadius: 99, padding: '11px 22px', fontSize: 11, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: prevDia ? accent : `rgba(${accentRgb},0.25)`, opacity: prevDia ? 1 : 0.4, transition: 'all 0.2s' }}
            onMouseEnter={e => { if (prevDia) e.currentTarget.style.background = `rgba(${accentRgb},0.10)`; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
          >
            <ArrowLeft size={14} />
            Dia {prevDia ? String(prevDia).padStart(2, '0') : '—'}
          </button>

          <button
            onClick={() => navigate('/devocional/reforma', { state: { activeDia: dia } })}
            style={{ background: 'none', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 99, padding: '11px 22px', fontSize: 11, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(220,225,255,0.55)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.30)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(220,225,255,0.55)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
          >
            ☰ Todos os Dias
          </button>

          <button
            onClick={() => nextDia && navigate(`/devocional/reforma/dia-${String(nextDia).padStart(2, '0')}`)}
            disabled={!nextDia || !nextHasContent}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', cursor: (nextDia && nextHasContent) ? 'pointer' : 'default', border: `1px solid rgba(${accentRgb},${(nextDia && nextHasContent) ? '0.30' : '0.10'})`, borderRadius: 99, padding: '11px 22px', fontSize: 11, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: (nextDia && nextHasContent) ? accent : `rgba(${accentRgb},0.25)`, opacity: (nextDia && nextHasContent) ? 1 : 0.4, transition: 'all 0.2s' }}
            onMouseEnter={e => { if (nextDia && nextHasContent) e.currentTarget.style.background = `rgba(${accentRgb},0.10)`; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
          >
            {nextDia ? `Dia ${String(nextDia).padStart(2, '0')}` : '—'}
            <ArrowRight size={14} />
          </button>
        </motion.div>

      </div>
      <Footer />
    </div>
  );
}
