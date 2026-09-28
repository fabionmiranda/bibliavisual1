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

export default function DevocionalReformaDiaPage() {
  const { dia: diaParam } = useParams<{ dia: string }>();
  const navigate = useNavigate();
  const dia = Number(diaParam ?? '1');
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
          <h2 style={{ fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 12 }}>Em breve</h2>
          <p style={{ fontSize: 15, color: 'rgba(200,200,255,0.50)', lineHeight: 1.8, marginBottom: 32 }}>
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
    <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
      <Navbar />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(84px,10vw,106px) clamp(16px,4vw,32px) 120px' }}>

        {/* ── Breadcrumb ── */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 48, fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(200,200,255,0.28)' }}
        >
          <span onClick={() => navigate('/devocional')} style={{ cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.color = accent)}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,200,255,0.28)')}
          >Devocional</span>
          <span>›</span>
          <span onClick={() => navigate('/devocional/reforma')} style={{ cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.color = accent)}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,200,255,0.28)')}
          >Reforma Protestante</span>
          <span>›</span>
          <span style={{ color: `rgba(${accentRgb},0.75)` }}>Dia {String(dia).padStart(2, '0')}</span>
        </motion.div>

        {/* ── Hero do dia ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative', borderRadius: 28, overflow: 'hidden',
            marginBottom: 56, padding: 'clamp(32px,5vw,52px)',
            background: `linear-gradient(135deg, #0d0500 0%, #080510 100%)`,
            border: `1.5px solid rgba(${accentRgb},0.25)`,
          }}
        >
          <div style={{ position: 'absolute', top: -50, right: -50, width: 240, height: 240, borderRadius: '50%', background: accent, filter: 'blur(70px)', opacity: 0.13, pointerEvents: 'none' }} />

          <div style={{ position: 'relative' }}>
            {/* semana badge + data */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
              <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: accent, background: `rgba(${accentRgb},0.12)`, border: `1px solid rgba(${accentRgb},0.25)`, padding: '5px 14px', borderRadius: 99 }}>
                Semana {semana?.num} · {TITULOS_DIAS[dia]?.ref}
              </span>
              <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(200,200,255,0.40)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '5px 14px', borderRadius: 99 }}>
                {content.data}
              </span>
            </div>

            {/* DIA número grande */}
            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.38em', textTransform: 'uppercase', color: `rgba(${accentRgb},0.55)`, marginBottom: 10 }}>
              Dia {String(dia).padStart(2, '0')} de 31
            </div>

            <h1 style={{
              fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 10px',
              background: `linear-gradient(135deg, #fff 30%, rgba(${accentRgb},0.85) 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {content.titulo}
            </h1>
            <p style={{ fontSize: 16, color: `rgba(${accentRgb},0.72)`, fontWeight: 600, fontStyle: 'italic', margin: 0 }}>
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
            marginBottom: 52,
            borderRadius: 20,
            border: `1.5px solid rgba(${accentRgb},0.28)`,
            background: `rgba(${accentRgb},0.07)`,
            padding: 'clamp(24px,4vw,36px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: accent, filter: 'blur(40px)', opacity: 0.10, pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${accentRgb},0.60)`, marginBottom: 16 }}>
              Versículo do Dia
            </div>
            <blockquote style={{
              margin: 0,
              fontSize: 'clamp(18px,2.8vw,24px)',
              fontWeight: 700,
              lineHeight: 1.55,
              color: '#fff',
              fontStyle: 'italic',
              borderLeft: `3px solid ${accent}`,
              paddingLeft: 20,
              marginBottom: 14,
            }}>
              "{content.versiculo}"
            </blockquote>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: `rgba(${accentRgb},0.70)`, letterSpacing: '0.08em' }}>
              {content.versiculoRef}
            </p>
          </div>
        </motion.div>

        {/* ── Seções de conteúdo ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: cfg.color + '18', border: `1px solid ${cfg.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <IconComp size={16} color={cfg.color} strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: cfg.color + 'aa', marginBottom: 2 }}>
                      {cfg.label}
                    </div>
                    <h2 style={{ margin: 0, fontSize: 'clamp(17px,2.6vw,22px)', fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>
                      {secao.titulo}
                    </h2>
                  </div>
                </div>

                {/* paragraphs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {secao.paragrafos.map((p, pi) => (
                    <p key={pi} style={{ margin: 0, fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(210,215,255,0.78)', lineHeight: 1.9 }}>
                      {p}
                    </p>
                  ))}
                </div>

                {/* pull quote */}
                {secao.citacao && (
                  <div style={{
                    marginTop: 28,
                    borderRadius: 16,
                    background: `linear-gradient(135deg, rgba(${accentRgb},0.07) 0%, rgba(${accentRgb},0.03) 100%)`,
                    border: `1px solid rgba(${accentRgb},0.22)`,
                    borderLeft: `4px solid ${accent}`,
                    padding: '20px 24px',
                  }}>
                    <p style={{ margin: 0, fontSize: 'clamp(15px,2.2vw,18px)', fontWeight: 700, color: 'rgba(255,255,255,0.90)', lineHeight: 1.65, fontStyle: 'italic', marginBottom: secao.citacaoAutor ? 12 : 0 }}>
                      "{secao.citacao}"
                    </p>
                    {secao.citacaoAutor && (
                      <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: `rgba(${accentRgb},0.65)`, letterSpacing: '0.08em' }}>
                        — {secao.citacaoAutor}
                      </p>
                    )}
                  </div>
                )}

                {/* divider */}
                {i < content.secoes.length - 1 && (
                  <div style={{ height: 1, background: `linear-gradient(90deg, transparent, rgba(${accentRgb},0.18), transparent)`, marginTop: 40 }} />
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
          style={{ marginTop: 56 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#a78bfa18', border: '1px solid #a78bfa28', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={16} color="#a78bfa" strokeWidth={2} />
            </div>
            <div>
              <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#a78bfaaa', marginBottom: 2 }}>Reflexão</div>
              <h2 style={{ margin: 0, fontSize: 'clamp(17px,2.6vw,22px)', fontWeight: 900, color: '#fff' }}>Para Refletir</h2>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {content.perguntas.map((q, i) => (
              <div key={i} style={{
                display: 'flex', gap: 16, alignItems: 'flex-start',
                borderRadius: 16,
                background: 'rgba(167,139,250,0.05)',
                border: '1px solid rgba(167,139,250,0.14)',
                padding: '18px 20px',
              }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(167,139,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: '#a78bfa', flexShrink: 0, marginTop: 1 }}>
                  {i + 1}
                </div>
                <p style={{ margin: 0, fontSize: 'clamp(14px,1.9vw,16px)', color: 'rgba(210,215,255,0.80)', lineHeight: 1.80 }}>
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
            marginTop: 52,
            borderRadius: 22,
            background: 'linear-gradient(135deg, rgba(52,211,153,0.07) 0%, rgba(52,211,153,0.03) 100%)',
            border: '1px solid rgba(52,211,153,0.20)',
            padding: 'clamp(26px,4vw,40px)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: '#34d399', filter: 'blur(50px)', opacity: 0.07, pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(52,211,153,0.14)', border: '1px solid rgba(52,211,153,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={15} color="#34d399" strokeWidth={2} />
              </div>
              <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.30em', textTransform: 'uppercase', color: 'rgba(52,211,153,0.70)' }}>
                Oração
              </div>
            </div>
            {content.oracao.split('\n\n').map((p, i) => (
              <p key={i} style={{ margin: i < content.oracao.split('\n\n').length - 1 ? '0 0 16px' : 0, fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(210,215,255,0.78)', lineHeight: 1.90, fontStyle: 'italic' }}>
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
            marginTop: 40,
            borderRadius: 16,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '20px 24px',
            display: 'flex', alignItems: 'flex-start', gap: 14,
          }}
        >
          <BookMarked size={18} color="rgba(251,191,36,0.65)" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(251,191,36,0.55)', marginBottom: 8 }}>
              Leitura Complementar
            </div>
            <p style={{ margin: 0, fontSize: 13, color: 'rgba(200,200,255,0.55)', lineHeight: 1.75 }}>
              {content.leituraComplementar}
            </p>
          </div>
        </motion.div>

        {/* ── Navegação prev / next ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.62 }}
          style={{
            marginTop: 64,
            display: 'flex', gap: 14, justifyContent: 'space-between', flexWrap: 'wrap',
          }}
        >
          {/* prev */}
          <button
            onClick={() => prevDia && navigate(`/devocional/reforma/dia-${String(prevDia).padStart(2, '0')}`)}
            disabled={!prevDia}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'none', cursor: prevDia ? 'pointer' : 'default',
              border: `1px solid rgba(${accentRgb},${prevDia ? '0.25' : '0.10'})`,
              borderRadius: 99, padding: '10px 20px',
              fontSize: 11, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: prevDia ? accent : `rgba(${accentRgb},0.25)`,
              opacity: prevDia ? 1 : 0.5,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (prevDia) e.currentTarget.style.background = `rgba(${accentRgb},0.10)`; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
          >
            <ArrowLeft size={14} />
            Dia {prevDia ? String(prevDia).padStart(2, '0') : '—'}
          </button>

          {/* back to list */}
          <button
            onClick={() => navigate('/devocional/reforma')}
            style={{
              background: 'none', cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 99, padding: '10px 20px',
              fontSize: 11, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.40)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.40)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; }}
          >
            ☰ Todos os Dias
          </button>

          {/* next */}
          <button
            onClick={() => nextDia && navigate(`/devocional/reforma/dia-${String(nextDia).padStart(2, '0')}`)}
            disabled={!nextDia || !nextHasContent}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'none', cursor: (nextDia && nextHasContent) ? 'pointer' : 'default',
              border: `1px solid rgba(${accentRgb},${(nextDia && nextHasContent) ? '0.25' : '0.10'})`,
              borderRadius: 99, padding: '10px 20px',
              fontSize: 11, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: (nextDia && nextHasContent) ? accent : `rgba(${accentRgb},0.25)`,
              opacity: (nextDia && nextHasContent) ? 1 : 0.5,
              transition: 'all 0.2s',
            }}
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
