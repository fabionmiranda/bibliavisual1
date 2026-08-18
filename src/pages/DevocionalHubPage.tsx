import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BG = '#05071a';

const SECOES = [
  {
    icon: '🔁',
    titulo: 'Devocional Espelhado',
    subtitulo: 'Leitura bíblica progressiva',
    descricao: 'Percorra as Escrituras do Gênesis ao Apocalipse dia a dia — com estrutura quiástica, transliteração hebraica e reflexão expositiva.',
    cor: 'rgba(0,212,255,1)',
    corBg: 'rgba(0,212,255,0.07)',
    corBorda: 'rgba(0,212,255,0.20)',
    corBordaH: 'rgba(0,212,255,0.45)',
    path: '/devocional/espelhado',
    badge: 'Bíblia Completa',
  },
  {
    icon: '📜',
    titulo: 'Devocional Confessional',
    subtitulo: 'na Era Digital',
    descricao: '365 devocionais anuais percorrendo a Confissão Batista de 1689 e a Confissão de Fé de Westminster — teologia histórica aplicada ao cotidiano.',
    cor: 'rgba(167,139,250,1)',
    corBg: 'rgba(167,139,250,0.07)',
    corBorda: 'rgba(167,139,250,0.20)',
    corBordaH: 'rgba(167,139,250,0.45)',
    path: '/devocional/confessional',
    badge: '365 Dias',
  },
];

export default function DevocionalHubPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
      <Navbar />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(88px,11vw,108px) clamp(16px,4vw,32px) 100px' }}>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 56, textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(48px,8vw,72px)', marginBottom: 16, lineHeight: 1 }}>🕊️</div>
          <div style={{ fontSize: 'clamp(10px,1.4vw,12px)', fontWeight: 900, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.85)', marginBottom: 14 }}>
            Devocionais
          </div>
          <h1 style={{
            fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, lineHeight: 1.12,
            margin: '0 0 16px',
            background: 'linear-gradient(135deg, #fff 0%, rgba(167,139,250,1) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Escolha seu Devocional
          </h1>
          <p style={{ fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(200,200,255,0.60)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>
            Dois caminhos de formação espiritual — um expositivo e progressivo, outro confessional e sistemático.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 24 }}>
          {SECOES.map((s, i) => (
            <motion.div
              key={s.path}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.10 }}
              onClick={() => navigate(s.path)}
              whileHover={{ scale: 1.015 }}
              style={{
                cursor: 'pointer',
                borderRadius: 22,
                background: s.corBg,
                border: `1.5px solid ${s.corBorda}`,
                padding: 'clamp(28px,5vw,44px)',
                transition: 'border-color 0.22s, background 0.22s',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
              onHoverStart={e => {
                const el = (e.target as HTMLElement).closest('[data-hub-card]') as HTMLElement;
                if (el) { el.style.borderColor = s.corBordaH; }
              }}
            >
              <div data-hub-card="">
                {/* Badge */}
                <div style={{ marginBottom: 4 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: s.cor, padding: '3px 12px', borderRadius: 99,
                    background: s.corBg, border: `1px solid ${s.corBorda}`,
                  }}>
                    {s.badge}
                  </span>
                </div>

                {/* Ícone + Título */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, margin: '14px 0 0' }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: 16, flexShrink: 0,
                    background: s.corBg, border: `1.5px solid ${s.corBorda}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28,
                  }}>
                    {s.icon}
                  </div>
                  <div>
                    <h2 style={{ fontSize: 'clamp(20px,2.8vw,26px)', fontWeight: 900, color: '#fff', margin: '0 0 4px', lineHeight: 1.2 }}>
                      {s.titulo}
                    </h2>
                    <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 700, color: s.cor, opacity: 0.85 }}>
                      {s.subtitulo}
                    </div>
                  </div>
                </div>

                {/* Descrição */}
                <p style={{ fontSize: 'clamp(14px,1.9vw,16px)', color: 'rgba(220,215,255,0.70)', lineHeight: 1.75, margin: '16px 0 0' }}>
                  {s.descricao}
                </p>

                {/* CTA */}
                <div style={{ marginTop: 20 }}>
                  <span style={{ fontSize: 13, fontWeight: 900, color: s.cor, letterSpacing: '0.08em' }}>
                    Acessar →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <Footer />
    </div>
  );
}
