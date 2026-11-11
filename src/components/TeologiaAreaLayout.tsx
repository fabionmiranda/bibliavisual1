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

const BG = '#060d1f';

/* ─── Trilha: cada bloco é uma etapa numerada (círculo + linha + cartão) ─── */
const TXT: React.CSSProperties = { margin: 0, fontSize: 'clamp(17px,1.8vw,19.5px)', color: 'rgba(225,235,255,0.88)', lineHeight: 1.7 };
const MONO = (c: string): React.CSSProperties => ({ fontFamily: 'var(--font-mono)', fontSize: 14.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: c, marginBottom: 10 });

function CabecalhoSecao({ c, titulo, total }: { c: string; titulo: string; total?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2vw,23px)', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff' }}>{titulo}</span>
      <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${c}70, transparent)` }} />
      {total !== undefined && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 17, color: c }}>{String(total).padStart(2, '0')}</span>}
    </div>
  );
}

function Passo({ c, marca, rotulo, titulo, acesa = true, ultimo, lateral, larguraLateral = 400, children, onClick, status }: {
  c: string; marca: string; rotulo: string; titulo: string; acesa?: boolean; ultimo?: boolean;
  lateral?: React.ReactNode; larguraLateral?: number; children?: React.ReactNode; onClick?: () => void; status?: React.ReactNode;
}) {
  const numerica = /^\d+$/.test(marca);
  return (
    <li className="ta-passo">
      <div className="ta-marco" aria-hidden>
        <div style={{ width: 'clamp(58px,6vw,72px)', aspectRatio: '1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: acesa ? `radial-gradient(circle at 35% 30%, ${c}, ${c}aa)` : `radial-gradient(circle at 35% 30%, ${c}35, ${c}10)`, border: `2px solid ${acesa ? c : c + '70'}`, boxShadow: acesa ? `0 0 28px ${c}70` : `0 0 16px ${c}25`, color: acesa ? '#0a0f1e' : c }}>
          {numerica
            ? <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(20px,2.4vw,26px)', lineHeight: 1 }}>{marca}</span>
            : <span style={{ fontSize: 'clamp(24px,2.8vw,30px)', lineHeight: 1 }}>{marca}</span>}
        </div>
        {!ultimo && <span style={{ flex: 1, width: 2, minHeight: 24, background: `linear-gradient(180deg, ${c}80, ${c}15)` }} />}
      </div>

      <div
        className={`ta-card ta-aula${lateral ? '' : ' ta-aula-1'}${onClick ? ' ta-link' : ''}`}
        role={onClick ? 'link' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={onClick ? e => { if (e.key === 'Enter') onClick(); } : undefined}
        style={{ ['--ta-c' as string]: c, ['--ta-lat' as string]: `${larguraLateral}px`, background: `linear-gradient(120deg, ${c}${acesa ? '1c' : '10'} 0%, rgba(10,18,40,0.94) 40%, rgba(6,12,30,0.97) 100%)`, border: `1px solid ${acesa ? c + '60' : c + '2e'}` } as React.CSSProperties}
      >
        <span className="ta-corner" style={{ top: 10, left: 10, borderTop: '2px solid', borderLeft: '2px solid', borderTopLeftRadius: 6 }} />
        <span className="ta-corner" style={{ bottom: 10, right: 10, borderBottom: '2px solid', borderRight: '2px solid', borderBottomRightRadius: 6 }} />

        <div className="ta-aula-texto" style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, letterSpacing: '0.14em', color: c, padding: '3px 10px', borderRadius: 8, border: `1px solid ${c}45`, background: `${c}12` }}>{rotulo}</span>
            {status && <span style={{ marginLeft: 'auto' }}>{status}</span>}
          </div>
          <h3 style={{ margin: '0 0 14px', fontSize: 'clamp(22px,2.4vw,27px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.25 }}>{titulo}</h3>
          {children}
        </div>

        {lateral && <div className="ta-aula-refs" style={{ background: 'rgba(0,0,0,0.32)', border: `1px solid ${c}22` }}>{lateral}</div>}
      </div>
    </li>
  );
}

function Itens({ c, itens, marca = '▸' }: { c: string; itens: string[]; marca?: string }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {itens.map((o, i) => (
        <li key={i} style={{ display: 'flex', gap: 10 }}>
          <span style={{ flexShrink: 0, color: c, fontWeight: 900 }}>{marca}</span>
          <span style={TXT}>{o}</span>
        </li>
      ))}
    </ul>
  );
}

function Mini({ c, t, d, icon }: { c: string; t: string; d: string; icon?: string }) {
  return (
    <div style={{ padding: '14px 16px', borderRadius: 14, background: `${c}0a`, border: `1px solid ${c}26` }}>
      {icon && <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>}
      <div style={{ fontSize: 'clamp(17px,1.8vw,19px)', fontWeight: 800, color: '#fff', marginBottom: 4 }}>{t}</div>
      <p style={{ ...TXT, fontSize: 'clamp(16px,1.7vw,18px)' }}>{d}</p>
    </div>
  );
}

function PlanoDeCurso({ p, c }: { p: PlanoCurso; c: string }) {
  return (
    <section style={{ marginBottom: 'clamp(48px,7vw,72px)' }}>
      <CabecalhoSecao c={c} titulo="Plano de Curso" />
      <ol className="ta-trilha">
        <Passo c={c} marca="01" rotulo="EMENTA" titulo="Do que trata o curso" larguraLateral={360}
          lateral={<>
            <div style={MONO(c)}>Ficha do curso</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {p.ficha.map(f => (
                <div key={f.rotulo} style={{ paddingLeft: 12, borderLeft: `2px solid ${c}55` }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: c }}>{f.rotulo}</div>
                  <div style={{ fontSize: 'clamp(16px,1.7vw,17.5px)', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>{f.valor}</div>
                </div>
              ))}
            </div>
          </>}>
          <p style={{ ...TXT, fontSize: 'clamp(18px,2vw,20.5px)' }}>{p.ementa}</p>
        </Passo>

        <Passo c={c} marca="02" rotulo="OBJETIVOS" titulo="O que o aluno vai alcançar">
          <div style={{ padding: '14px 18px', borderRadius: 14, background: `${c}12`, borderLeft: `4px solid ${c}`, marginBottom: 18 }}>
            <div style={MONO(c)}>Objetivo geral</div>
            <p style={{ ...TXT, color: '#fff', fontSize: 'clamp(18px,2vw,20px)' }}>{p.objetivoGeral}</p>
          </div>
          <div style={MONO(c)}>Objetivos específicos (didáticos)</div>
          <div className="fluxo" style={{ '--min': '320px', '--gap': '10px 24px' } as React.CSSProperties}>
            {p.objetivosEspecificos.map((o, i) => (
              <div key={i} style={{ display: 'flex', gap: 10 }}>
                <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14, color: '#0a0f1e', background: c, marginTop: 3 }}>{i + 1}</span>
                <span style={TXT}>{o}</span>
              </div>
            ))}
          </div>
        </Passo>

        <Passo c={c} marca="03" rotulo="ANDRAGOGIA" titulo="Princípios andragógicos">
          <div className="fluxo" style={{ '--min': '260px', '--gap': '12px' } as React.CSSProperties}>
            {p.andragogia.map(a => <Mini key={a.t} c={c} t={a.t} d={a.d} />)}
          </div>
        </Passo>

        <Passo c={c} marca="04" rotulo="METODOLOGIA" titulo="Como as aulas acontecem">
          <div className="fluxo" style={{ '--min': '240px', '--gap': '12px' } as React.CSSProperties}>
            {p.metodologia.map(m => <Mini key={m.t} c={c} t={m.t} d={m.d} icon={m.icon} />)}
          </div>
        </Passo>

        <Passo c={c} marca="05" rotulo="AVALIAÇÃO" titulo="Como o aprendizado é avaliado">
          <Itens c={c} itens={p.avaliacao} marca="✓" />
        </Passo>

        <Passo c={c} marca="06" rotulo="REFERENCIAL TEÓRICO" titulo="Fontes do curso" ultimo>
          <div className="fluxo" style={{ '--min': '300px', '--gap': '16px' } as React.CSSProperties}>
            {p.referencial.map(r => (
              <div key={r.categoria} style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(0,0,0,0.28)', border: `1px solid ${c}22` }}>
                <div style={MONO(c)}>{r.categoria}</div>
                <ul className="notranslate" translate="no" style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {r.itens.map(it => (
                    <li key={it} style={{ ...TXT, fontSize: 'clamp(15px,1.6vw,16.5px)', lineHeight: 1.6, paddingLeft: 12, borderLeft: `2px solid ${c}40` }}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Passo>
      </ol>
    </section>
  );
}

const CSS = `
  @keyframes ta-scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(260%); } }
  @keyframes ta-pulse { 0%,100% { opacity: .5; transform: scale(1) rotate(0deg); } 50% { opacity: 1; transform: scale(1.06) rotate(20deg); } }
  .ta-card { position: relative; transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
  .ta-card:hover { transform: translateY(-4px); box-shadow: 0 18px 50px rgba(0,0,0,.45), 0 0 0 1px var(--ta-c) !important; }
  .ta-corner { position: absolute; width: 14px; height: 14px; color: var(--ta-c); opacity: .7; transition: all .25s ease; pointer-events: none; }
  .ta-card:hover .ta-corner { width: 24px; height: 24px; opacity: 1; }
  @media (prefers-reduced-motion: reduce) { .ta-anim { animation: none !important; } }
  .ta-trilha { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
  .ta-passo { display: grid; grid-template-columns: clamp(58px,6vw,72px) 1fr; column-gap: clamp(14px,2.2vw,26px); }
  .ta-marco { display: flex; flex-direction: column; align-items: center; gap: 0; }
  .ta-aula { display: grid; grid-template-columns: minmax(0, 1fr) minmax(260px, var(--ta-lat, 400px)); gap: clamp(16px,2.4vw,28px); align-items: start; padding: clamp(20px,2.8vw,28px); border-radius: 18px; margin-bottom: clamp(16px,2vw,22px); box-shadow: 0 10px 36px rgba(0,0,0,0.32); box-sizing: border-box; }
  .ta-aula.ta-link { cursor: pointer; }
  .ta-aula.ta-aula-1 { grid-template-columns: minmax(0, 1fr); }
  .ta-aula-refs { padding: 14px 16px; border-radius: 14px; }
  @media (max-width: 900px) { .ta-aula { grid-template-columns: 1fr; } }
  @media (max-width: 560px) {
    .ta-passo { grid-template-columns: 1fr; }
    .ta-marco { display: none; }
  }
`;

/* Blocos finais do plano (base legal e professor) — exibidos no fim da página, na mesma trilha. */
function PlanoFinal({ p, c }: { p: PlanoCurso; c: string }) {
  if (!p.legal && !p.professor) return null;
  const VERDE = '#34d399';
  return (
    <section style={{ marginTop: 'clamp(48px,7vw,72px)' }}>
      <CabecalhoSecao c={c} titulo="Sobre o curso" />
      <ol className="ta-trilha">
        {p.legal && (
          <Passo c={VERDE} marca="07" rotulo="NATUREZA E BASE LEGAL" titulo={p.legal.selo} ultimo={!p.professor} larguraLateral={420}
            lateral={<>
              <div style={MONO(VERDE)}>⚖️ Base legal</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {p.legal.leis.map(l => (
                  <div key={l.lei} style={{ paddingLeft: 12, borderLeft: `2px solid ${VERDE}55` }}>
                    <div style={{ fontSize: 'clamp(16px,1.7vw,17.5px)', fontWeight: 800, color: '#fff', marginBottom: 2 }}>{l.lei}</div>
                    <p style={{ ...TXT, fontSize: 'clamp(15px,1.6vw,16.5px)', lineHeight: 1.6 }}>{l.texto}</p>
                  </div>
                ))}
              </div>
            </>}>
            <p style={{ ...TXT, fontSize: 'clamp(18px,2vw,20px)', marginBottom: 18 }}>{p.legal.resumo}</p>
            <Itens c={VERDE} itens={p.legal.avisos} marca="•" />
          </Passo>
        )}

        {p.professor && (
          <Passo c={c} marca={p.legal ? '08' : '07'} rotulo="PROFESSOR DO CURSO" titulo={p.professor.nome} ultimo larguraLateral={300}
            lateral={<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              {p.professor.foto ? (
                <div style={{ width: '100%', maxWidth: 240, aspectRatio: '3 / 4', borderRadius: 20, padding: 3, background: `linear-gradient(160deg, ${c}, ${c}30 60%, ${c}90)`, boxShadow: `0 0 36px ${c}35` }}>
                  <img src={p.professor.foto} alt={p.professor.nome} decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 28%', borderRadius: 17, display: 'block' }} />
                </div>
              ) : (
                <div style={{ width: 110, aspectRatio: '1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 34, color: c, background: `radial-gradient(circle at 35% 30%, ${c}40, ${c}10 70%)`, border: `2px solid ${c}80` }}>
                  {p.professor.nome.replace(/^Prof\.\s*Dr\.\s*/, '').split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('')}
                </div>
              )}
              <a href={`mailto:${p.professor.contato}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 12, fontWeight: 800, fontSize: 'clamp(14.5px,1.6vw,16px)', color: '#0a0f1e', background: c, textDecoration: 'none', maxWidth: '100%', overflowWrap: 'anywhere' }}>
                ✉️ {p.professor.contato}
              </a>
            </div>}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(14px,1.6vw,15.5px)', fontWeight: 700, letterSpacing: '0.08em', color: c, marginBottom: 12 }}>{p.professor.titulo}</div>
            <p style={{ ...TXT, fontSize: 'clamp(18px,2vw,20px)', marginBottom: 20 }}>{p.professor.resumo}</p>
            <div className="fluxo" style={{ '--min': '280px', '--gap': '16px' } as React.CSSProperties}>
              <div>
                <div style={MONO(c)}>Formação acadêmica</div>
                <ol style={{ margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, borderLeft: `2px solid ${c}40`, paddingLeft: 16 }}>
                  {p.professor.formacao.map(f => (
                    <li key={f.grau + f.area} style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: -23, top: 7, width: 12, height: 12, borderRadius: '50%', background: c, boxShadow: `0 0 10px ${c}` }} />
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: c, fontWeight: 700 }}>{f.periodo}</div>
                      <div style={{ fontSize: 'clamp(16.5px,1.9vw,18px)', fontWeight: 800, color: '#fff' }}>{f.grau}</div>
                      <div style={TXT}>{f.area}</div>
                    </li>
                  ))}
                </ol>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div><div style={MONO(c)}>Atuação</div><Itens c={c} itens={p.professor.atuacao} /></div>
                <div><div style={MONO(c)}>Publicações recentes</div><Itens c={c} itens={p.professor.publicacoes} /></div>
              </div>
            </div>
          </Passo>
        )}
      </ol>
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

        <CabecalhoSecao c={c} titulo="Matérias" total={area.materias.length} />
        <ol className="ta-trilha">
          {area.materias.map((m, i) => {
            const isLink = !!m.link;
            const numero = m.rotulo ? null : String(area.materias.slice(0, i).filter(x => !x.rotulo).length + 1).padStart(2, '0');
            return (
              <Passo key={i} c={c} marca={numero ?? m.icon} rotulo={m.rotulo ?? `AULA ${numero}  ${m.icon}`} titulo={m.nome}
                acesa={isLink} ultimo={i === area.materias.length - 1}
                onClick={isLink ? () => navigate(m.link!) : undefined}
                status={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999, color: isLink ? '#0a0f1e' : 'rgba(255,255,255,0.75)', background: isLink ? c : 'rgba(255,255,255,0.06)', border: isLink ? 'none' : '1px solid rgba(255,255,255,0.14)' }}>{isLink ? 'Disponível · acessar →' : '⏳ Em breve'}</span>}
                lateral={m.refs && <>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 13.5, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: c, marginBottom: 4 }}>Leituras recomendadas</div>
                  {([['PT', '🇧🇷', 'Português', m.refs.pt], ['EN', '🇺🇸', 'English', m.refs.en]] as const).map(([cod, flag, lingua, ref]) => (
                    <div key={cod} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 10 }}>
                      <span title={lingua} style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: 13.5, fontWeight: 700, color: '#fff', padding: '2px 7px', borderRadius: 6, background: `${c}22`, border: `1px solid ${c}45`, marginTop: 2 }}>
                        <span style={{ fontSize: 14 }}>{flag}</span>{cod}
                      </span>
                      <p className="notranslate" translate="no" style={{ margin: 0, fontSize: 'clamp(14.5px,1.5vw,16px)', color: 'rgba(235,240,255,0.88)', lineHeight: 1.55 }}>{ref}</p>
                    </div>
                  ))}
                </>}>
                <p style={{ ...TXT, fontSize: 'clamp(16.5px,1.8vw,18.5px)' }}>{m.desc}</p>
              </Passo>
            );
          })}
        </ol>

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
