import type React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/* Layout das páginas de área de /teologia — visual futurista: núcleo luminoso,
   grade com varredura, cartões numerados com cantos de HUD e leituras PT/EN. */

export interface MateriaArea {
  nome: string;
  desc: string;
  icon: string;
  link?: string;
  /** Rótulo próprio (ex.: 'INTRODUÇÃO'); sem ele, a matéria é numerada como AULA NN. */
  rotulo?: string;
  refs?: { pt: string; en: string };
}

export interface PlanoCurso {
  ementa: string;
  ficha: { rotulo: string; valor: string }[];
  objetivoGeral: string;
  objetivosEspecificos: string[];
  andragogia: { t: string; d: string }[];
  metodologia: { icon: string; t: string; d: string }[];
  avaliacao: string[];
  referencial: { categoria: string; itens: string[] }[];
  legal?: { selo: string; resumo: string; leis: { lei: string; texto: string }[]; avisos: string[] };
  professor?: {
    nome: string;
    titulo: string;
    foto?: string;
    resumo: string;
    formacao: { grau: string; area: string; periodo: string }[];
    atuacao: string[];
    publicacoes: string[];
    contato: string;
  };
}

export interface AreaTeologia {
  titulo: string;
  descricao: string;
  icon: string;
  cor: string;
  materias: MateriaArea[];
  plano?: PlanoCurso;
}

function TituloBloco({ cor, n, children }: { cor: string; n: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: cor, padding: '3px 9px', borderRadius: 8, border: `1px solid ${cor}45`, background: `${cor}10` }}>{n}</span>
      <h3 style={{ margin: 0, fontSize: 'clamp(21px,2.3vw,26px)', fontWeight: 800, color: '#fff' }}>{children}</h3>
    </div>
  );
}

function PlanoDeCurso({ p, c }: { p: PlanoCurso; c: string }) {
  const painel: React.CSSProperties = { padding: 'clamp(20px,3vw,28px)', borderRadius: 18, background: 'linear-gradient(160deg, rgba(14,24,52,0.9), rgba(6,12,30,0.95))', border: `1px solid ${c}28` };
  const texto: React.CSSProperties = { margin: 0, fontSize: 'clamp(17px,1.8vw,19.5px)', color: 'rgba(225,235,255,0.88)', lineHeight: 1.7 };
  return (
    <section style={{ marginBottom: 'clamp(48px,7vw,72px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2vw,23px)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff' }}>Plano de Curso</span>
        <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${c}70, transparent)` }} />
      </div>

      {/* Ementa + ficha */}
      <div style={{ ...painel, marginBottom: 20, background: `linear-gradient(135deg, ${c}16, rgba(6,12,30,0.95) 60%)` }}>
        <TituloBloco cor={c} n="01">Ementa</TituloBloco>
        <p style={{ ...texto, fontSize: 'clamp(18px,2vw,21px)' }}>{p.ementa}</p>
        <div className="fluxo" style={{ '--min': '170px', '--gap': '12px', marginTop: 22 } as React.CSSProperties}>
          {p.ficha.map(f => (
            <div key={f.rotulo} style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: `1px solid ${c}22` }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: c, marginBottom: 4 }}>{f.rotulo}</div>
              <div style={{ fontSize: 'clamp(17px,1.8vw,19px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>{f.valor}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mosaico" style={{ '--min': '440px', '--gap': '20px' } as React.CSSProperties}>
        {/* Objetivos */}
        <div style={painel}>
          <TituloBloco cor={c} n="02">Objetivos</TituloBloco>
          <div style={{ padding: '12px 14px', borderRadius: 12, background: `${c}10`, borderLeft: `3px solid ${c}`, marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: c, marginBottom: 6 }}>Objetivo geral</div>
            <p style={texto}>{p.objetivoGeral}</p>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: c, marginBottom: 10 }}>Objetivos específicos (didáticos)</div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {p.objetivosEspecificos.map((o, i) => (
              <li key={i} style={{ display: 'flex', gap: 10 }}>
                <span style={{ flexShrink: 0, color: c, fontWeight: 900 }}>▸</span>
                <span style={texto}>{o}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Andragogia */}
        <div style={painel}>
          <TituloBloco cor={c} n="03">Princípios andragógicos</TituloBloco>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {p.andragogia.map(a => (
              <div key={a.t} style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: `1px solid ${c}1f` }}>
                <div style={{ fontSize: 'clamp(17px,1.8vw,19.5px)', fontWeight: 800, color: '#fff', marginBottom: 4 }}>{a.t}</div>
                <p style={{ ...texto, fontSize: 'clamp(16px,1.7vw,18.5px)' }}>{a.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Metodologia */}
        <div style={painel}>
        <TituloBloco cor={c} n="04">Metodologia</TituloBloco>
        <div className="fluxo" style={{ '--min': '240px', '--gap': '14px' } as React.CSSProperties}>
          {p.metodologia.map(m => (
            <div key={m.t} style={{ padding: '14px 16px', borderRadius: 14, background: `${c}0a`, border: `1px solid ${c}26` }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{m.icon}</div>
              <div style={{ fontSize: 'clamp(17px,1.8vw,19.5px)', fontWeight: 800, color: '#fff', marginBottom: 4 }}>{m.t}</div>
              <p style={{ ...texto, fontSize: 'clamp(16px,1.7vw,18.5px)' }}>{m.d}</p>
            </div>
          ))}
        </div>
        </div>

        {/* Avaliação */}
        <div style={painel}>
          <TituloBloco cor={c} n="05">Avaliação</TituloBloco>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {p.avaliacao.map((a, i) => (
              <li key={i} style={{ display: 'flex', gap: 10 }}>
                <span style={{ flexShrink: 0, color: c, fontWeight: 900 }}>✓</span>
                <span style={texto}>{a}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Referencial teórico */}
        <div style={painel}>
          <TituloBloco cor={c} n="06">Referencial teórico</TituloBloco>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {p.referencial.map(r => (
              <div key={r.categoria}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: c, marginBottom: 8 }}>{r.categoria}</div>
                <ul className="notranslate" translate="no" style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {r.itens.map(it => (
                    <li key={it} style={{ ...texto, fontSize: 'clamp(15.5px,1.6vw,17.5px)', paddingLeft: 12, borderLeft: `2px solid ${c}40` }}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

const BG = '#060d1f';

const CSS = `
  @keyframes ta-scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(260%); } }
  @keyframes ta-pulse { 0%,100% { opacity: .5; transform: scale(1) rotate(0deg); } 50% { opacity: 1; transform: scale(1.06) rotate(20deg); } }
  .ta-card { position: relative; transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
  .ta-card:hover { transform: translateY(-4px); box-shadow: 0 18px 50px rgba(0,0,0,.45), 0 0 0 1px var(--ta-c) !important; }
  .ta-corner { position: absolute; width: 14px; height: 14px; color: var(--ta-c); opacity: .7; transition: all .25s ease; pointer-events: none; }
  .ta-card:hover .ta-corner { width: 24px; height: 24px; opacity: 1; }
  @media (prefers-reduced-motion: reduce) { .ta-anim { animation: none !important; } }
`;

/* Blocos finais do plano (base legal e professor) — exibidos no fim da página. */
function PlanoFinal({ p, c }: { p: PlanoCurso; c: string }) {
  if (!p.legal && !p.professor) return null;
  const painel: React.CSSProperties = { padding: 'clamp(20px,3vw,28px)', borderRadius: 18, background: 'linear-gradient(160deg, rgba(14,24,52,0.9), rgba(6,12,30,0.95))', border: `1px solid ${c}28` };
  const texto: React.CSSProperties = { margin: 0, fontSize: 'clamp(17px,1.8vw,19.5px)', color: 'rgba(225,235,255,0.88)', lineHeight: 1.7 };
  return (
    <section style={{ marginTop: 'clamp(48px,7vw,72px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px,2vw,20px)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff' }}>Sobre o curso</span>
        <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${c}70, transparent)` }} />
      </div>
      {/* Natureza do curso e base legal */}
      {p.legal && (
        <div style={{ ...painel, background: `linear-gradient(135deg, rgba(52,211,153,0.10), rgba(6,12,30,0.95) 55%)`, border: '1px solid rgba(52,211,153,0.35)' }}>
          <TituloBloco cor="#34d399" n="07">Natureza do curso e base legal</TituloBloco>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, marginBottom: 14, fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#34d399', background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.4)' }}>
            ⚖️ {p.legal.selo}
          </div>
          <p style={{ ...texto, fontSize: 'clamp(17px,2vw,19px)', marginBottom: 20 }}>{p.legal.resumo}</p>
          <div className="fluxo" style={{ '--min': '320px', '--gap': '14px', marginBottom: 20 } as React.CSSProperties}>
            {p.legal.leis.map(l => (
              <div key={l.lei} style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(52,211,153,0.22)' }}>
                <div style={{ fontSize: 'clamp(16px,1.9vw,18px)', fontWeight: 800, color: '#fff', marginBottom: 6 }}>{l.lei}</div>
                <p style={{ ...texto, fontSize: 'clamp(15.5px,1.8vw,17px)' }}>{l.texto}</p>
              </div>
            ))}
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {p.legal.avisos.map((a, i) => (
              <li key={i} style={{ display: 'flex', gap: 10 }}>
                <span style={{ flexShrink: 0, color: '#34d399', fontWeight: 900 }}>•</span>
                <span style={texto}>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Professor do curso */}
      {p.professor && (
        <div style={{ ...painel, marginTop: 20, background: `linear-gradient(135deg, ${c}14, rgba(6,12,30,0.95) 55%)` }}>
          <TituloBloco cor={c} n={p.legal ? '08' : '07'}>Professor do curso</TituloBloco>
          <div style={{ display: 'flex', gap: 'clamp(18px,3vw,28px)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {p.professor.foto ? (
              <div style={{ position: 'relative', width: 'clamp(150px,18vw,210px)', aspectRatio: '3 / 4', flexShrink: 0, borderRadius: 22, padding: 3, background: `linear-gradient(160deg, ${c}, ${c}30 60%, ${c}90)`, boxShadow: `0 0 40px ${c}35, 0 18px 40px rgba(0,0,0,0.45)` }}>
                <img src={p.professor.foto} alt={p.professor.nome} decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 28%', borderRadius: 19, display: 'block' }} />
              </div>
            ) : (
              <div style={{ width: 'clamp(84px,11vw,110px)', aspectRatio: '1', flexShrink: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3.4vw,34px)', color: c, background: `radial-gradient(circle at 35% 30%, ${c}40, ${c}10 70%)`, border: `2px solid ${c}80`, boxShadow: `0 0 34px ${c}30` }}>
                {p.professor.nome.replace(/^Prof\.\s*Dr\.\s*/, '').split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('')}
              </div>
            )}
            <div style={{ flex: 1, minWidth: 'min(100%, 280px)' }}>
              <div style={{ fontSize: 'clamp(22px,2.8vw,28px)', fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>{p.professor.nome}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(14px,1.6vw,15px)', fontWeight: 700, letterSpacing: '0.08em', color: c, margin: '6px 0 14px' }}>{p.professor.titulo}</div>
              <p style={{ ...texto, fontSize: 'clamp(17px,2vw,19px)' }}>{p.professor.resumo}</p>
            </div>
          </div>

          <div className="fluxo" style={{ '--min': '340px', '--gap': '16px', marginTop: 24 } as React.CSSProperties}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: c, marginBottom: 12 }}>Formação acadêmica</div>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, borderLeft: `2px solid ${c}40`, paddingLeft: 16 }}>
                {p.professor.formacao.map(f => (
                  <li key={f.grau + f.area} style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: -23, top: 7, width: 12, height: 12, borderRadius: '50%', background: c, boxShadow: `0 0 10px ${c}` }} />
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: c, fontWeight: 700 }}>{f.periodo}</div>
                    <div style={{ fontSize: 'clamp(16.5px,1.9vw,18px)', fontWeight: 800, color: '#fff' }}>{f.grau}</div>
                    <div style={texto}>{f.area}</div>
                  </li>
                ))}
              </ol>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[['Atuação', p.professor.atuacao], ['Publicações recentes', p.professor.publicacoes]].map(([rot, itens]) => (
                <div key={rot as string}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: c, marginBottom: 10 }}>{rot as string}</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(itens as string[]).map(it => (
                      <li key={it} style={{ display: 'flex', gap: 10 }}>
                        <span style={{ flexShrink: 0, color: c, fontWeight: 900 }}>▸</span>
                        <span style={texto}>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <a href={`mailto:${p.professor.contato}`} style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 12, fontWeight: 800, fontSize: 'clamp(15px,1.8vw,16.5px)', color: '#0a0f1e', background: c, textDecoration: 'none' }}>
                ✉️ {p.professor.contato}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function TeologiaAreaLayout({ area }: { area: AreaTeologia }) {
  const navigate = useNavigate();
  const c = area.cor;
  const nRefs = area.materias.filter(m => m.refs).length;

  return (
    <div className="sem-justificar" style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
      <style>{CSS}</style>
      <Navbar />

      {/* ── Hero ── */}
      <header style={{ position: 'relative', overflow: 'hidden', borderBottom: `1px solid ${c}30`, background: `radial-gradient(ellipse 60% 80% at 78% 30%, ${c}26 0%, transparent 65%), linear-gradient(180deg, #050b1c 0%, ${BG} 100%)` }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.1, backgroundImage: `linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`, backgroundSize: '48px 48px', maskImage: 'linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)', WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div className="ta-anim" style={{ position: 'absolute', left: 0, right: 0, height: '40%', background: `linear-gradient(180deg, transparent, ${c}12, transparent)`, animation: 'ta-scan 7s linear infinite' }} />
        </div>

        <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: 'clamp(100px,12vw,124px) clamp(16px,4vw,40px) clamp(48px,6vw,72px)' }}>
          <button
            onClick={() => navigate('/teologia')}
            style={{ all: 'unset', cursor: 'pointer', fontSize: 17, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: c, marginBottom: 'clamp(28px,4vw,44px)', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 999, border: `1px solid ${c}45`, background: `${c}0d` }}
          >
            ← Teologia
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(24px,4vw,48px)', flexWrap: 'wrap' }}>
            {/* núcleo luminoso */}
            <div style={{ position: 'relative', width: 'clamp(104px,15vw,150px)', aspectRatio: '1', flexShrink: 0, margin: 14 }}>
              <div className="ta-anim" style={{ position: 'absolute', inset: -14, borderRadius: '50%', border: `1px dashed ${c}60`, animation: 'ta-pulse 6s ease-in-out infinite' }} />
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, ${c}55, ${c}12 70%)`, border: `2px solid ${c}90`, boxShadow: `0 0 50px ${c}45, inset 0 0 30px ${c}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(46px,7vw,68px)' }}>
                {area.icon}
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 'min(100%, 300px)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(14px,1.5vw,17px)', fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: c, marginBottom: 14 }}>
                Teologia · Área de Estudo
              </div>
              <h1 style={{ fontSize: 'clamp(36px,6vw,64px)', fontWeight: 900, lineHeight: 1.08, margin: '0 0 20px', letterSpacing: '-0.02em', background: `linear-gradient(100deg, #ffffff 35%, ${c} 100%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {area.titulo}
              </h1>
              <p style={{ fontSize: 'clamp(19px,2.1vw,23px)', color: 'rgba(225,235,255,0.90)', lineHeight: 1.75, margin: 0, maxWidth: 820 }}>
                {area.descricao}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 26 }}>
                {[`${area.materias.length} matérias`, ...(nRefs ? [`${nRefs * 2} leituras · PT + EN`] : []), 'Perspectiva reformada'].map(t => (
                  <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(15px,1.5vw,17px)', fontWeight: 700, padding: '7px 14px', borderRadius: 10, color: '#fff', background: `${c}14`, border: `1px solid ${c}40` }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,64px) clamp(16px,4vw,40px) 100px' }}>
        {area.plano && <PlanoDeCurso p={area.plano} c={c} />}

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2vw,23px)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff' }}>Matérias</span>
          <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${c}70, transparent)` }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 17, color: c }}>{String(area.materias.length).padStart(2, '0')}</span>
        </div>

        <div className="mosaico" style={{ '--min': '340px', '--gap': '22px' } as React.CSSProperties}>
          {area.materias.map((m, i) => {
            const isLink = !!m.link;
            const cardStyle = {
              '--ta-c': c,
              padding: 'clamp(22px,3vw,30px)', borderRadius: 18,
              background: `linear-gradient(160deg, ${c}16 0%, rgba(10,18,40,0.92) 45%, rgba(6,12,30,0.96) 100%)`,
              border: `1px solid ${isLink ? c + '60' : c + '30'}`,
              boxShadow: `0 10px 40px rgba(0,0,0,0.35), inset 0 1px 0 ${c}25`,
              display: 'flex', flexDirection: 'column', gap: 14,
              cursor: isLink ? 'pointer' : 'default',
              textAlign: 'left',
              boxSizing: 'border-box',
            } as React.CSSProperties;

            const inner = (
              <>
                <span className="ta-corner" style={{ top: 10, left: 10, borderTop: '2px solid', borderLeft: '2px solid', borderTopLeftRadius: 6 }} />
                <span className="ta-corner" style={{ bottom: 10, right: 10, borderBottom: '2px solid', borderRight: '2px solid', borderBottomRightRadius: 6 }} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: `radial-gradient(circle at 35% 30%, ${c}40, ${c}12)`, border: `1px solid ${c}60`, boxShadow: `0 0 22px ${c}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                    {m.icon}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, letterSpacing: '0.12em', color: c, padding: '4px 10px', borderRadius: 8, border: `1px solid ${c}40`, background: `${c}10` }}>
                    {m.rotulo ?? `AULA ${String(area.materias.slice(0, i).filter(x => !x.rotulo).length + 1).padStart(2, '0')}`}
                  </span>
                </div>

                <div style={{ fontSize: 'clamp(21px,2.2vw,25px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.25 }}>{m.nome}</div>
                <p style={{ margin: 0, fontSize: 'clamp(17px,1.8vw,19.5px)', color: 'rgba(225,235,255,0.86)', lineHeight: 1.7 }}>{m.desc}</p>

                {m.refs && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '14px 16px', borderRadius: 14, background: 'rgba(0,0,0,0.35)', border: `1px solid ${c}22` }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: c }}>Leituras recomendadas</div>
                    {([['PT', '🇧🇷', 'Português', m.refs.pt], ['EN', '🇺🇸', 'English', m.refs.en]] as const).map(([cod, flag, lingua, ref]) => (
                      <div key={cod} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span title={lingua} style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: '#fff', padding: '2px 7px', borderRadius: 6, background: `${c}22`, border: `1px solid ${c}45`, marginTop: 2 }}>
                          <span style={{ fontSize: 16 }}>{flag}</span>{cod}
                        </span>
                        <p className="notranslate" translate="no" style={{ margin: 0, fontSize: 'clamp(15.5px,1.6vw,17.5px)', color: 'rgba(235,240,255,0.90)', lineHeight: 1.6 }}>{ref}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ marginTop: 'auto', paddingTop: 4, display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: isLink ? c : 'rgba(255,255,255,0.72)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: isLink ? c : `${c}80`, boxShadow: isLink ? `0 0 10px ${c}` : 'none' }} />
                  {isLink ? 'Acessar aula →' : 'Em breve'}
                </div>
              </>
            );

            return isLink ? (
              <button key={i} className="ta-card" style={{ all: 'unset', ...cardStyle }} onClick={() => navigate(m.link!)}>{inner}</button>
            ) : (
              <div key={i} className="ta-card" style={cardStyle}>{inner}</div>
            );
          })}
        </div>

        <div style={{ marginTop: 56, padding: 'clamp(24px,3.5vw,36px)', borderRadius: 20, background: `linear-gradient(135deg, ${c}12, rgba(6,12,30,0.9))`, border: `1px solid ${c}35`, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, background: `${c}18`, border: `1px solid ${c}50`, boxShadow: `0 0 24px ${c}30` }}>⏳</div>
          <div style={{ flex: 1, minWidth: 'min(100%, 260px)' }}>
            <div style={{ fontSize: 'clamp(20px,2.2vw,24px)', fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>Conteúdo em desenvolvimento</div>
            <p style={{ margin: 0, fontSize: 'clamp(17px,1.8vw,19.5px)', color: 'rgba(225,235,255,0.82)', lineHeight: 1.7 }}>
              As matérias desta área estão sendo preparadas com cuidado. Novos conteúdos serão publicados progressivamente.
            </p>
          </div>
        </div>

        {area.plano && <PlanoFinal p={area.plano} c={c} />}
      </main>

      <Footer />
    </div>
  );
}
