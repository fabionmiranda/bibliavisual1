import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  MESES, EMOJI_MES, PLANO, conteudoPublicado, dataDe, ehBissexto, entrada, estacaoDe, mesIndice,
  rotuloData, sequenciaDoAno, vizinho, leituraExtenso,
} from '../data/falaAlma';
import { leiturasEspeciais } from '../data/falaAlma/datasMoveis';
import { C, COR_TIPO, SANS, DISPLAY, TITULO, TITULO_DEC, useUsuario, ProvedorFalaAlma } from '../components/falaAlma/base';
import { LeituraDia } from '../components/falaAlma/LeituraDia';
import { BannerEspecial, DiaColheita, DiaEmPreparo, DiaSelah, DiaSelahBonus, LeituraEspecialView } from '../components/falaAlma/OutrosDias';
import { Calendario, MeuCaderno, Progresso, Sobre } from '../components/falaAlma/Telas';

type Aba = 'leitura' | 'calendario' | 'caderno' | 'progresso' | 'sobre';
const ABAS: { id: Aba; rotulo: string; icone: string }[] = [
  { id: 'leitura', rotulo: 'Hoje', icone: '📖' },
  { id: 'calendario', rotulo: 'Calendário', icone: '🗓️' },
  { id: 'caderno', rotulo: 'Caderno', icone: '📓' },
  { id: 'progresso', rotulo: 'Progresso', icone: '📈' },
  { id: 'sobre', rotulo: 'Sobre', icone: 'ℹ️' },
];

export default function DevocionalFalaAlmaPage() {
  return (
    <ProvedorFalaAlma>
      <PaginaFalaAlma />
    </ProvedorFalaAlma>
  );
}

function PaginaFalaAlma() {
  const { dia: slug } = useParams();
  const navigate = useNavigate();
  const u = useUsuario();
  const agora = new Date();
  const dataHoje = dataDe(agora);
  const bissexto = ehBissexto(agora.getFullYear());

  // "No meu ritmo": o próximo dia ainda não concluído, a partir do Dia 1
  const dataInicial = useMemo(() => {
    if (u.preferencias.ritmo === 'meu_ritmo') return sequenciaDoAno().find(e => !u.concluidosSet.has(e.data))?.data ?? dataHoje;
    return dataHoje;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [u.preferencias.ritmo]);

  const aba: Aba = (ABAS.some(a => a.id === slug) ? slug : 'leitura') as Aba;
  const data = slugParaData(slug) ?? dataInicial;
  const e = entrada(data) ?? entrada('01-01')!;

  const especiais = data === dataHoje ? leiturasEspeciais(agora) : [];
  const [mostrarEspecial, setMostrarEspecial] = useState(() => u.preferencias.trilha_semana_santa && especiais.some(x => x.id.startsWith('semana-santa')));
  useEffect(() => { window.scrollTo(0, 0); }, [data, aba]);

  const irPara = (d: string) => navigate(`/devocional/fala-alma/${d}`);
  const irAba = (a: Aba) => navigate(a === 'leitura' ? `/devocional/fala-alma/${data}` : `/devocional/fala-alma/${a}`);
  const conteudo = e.tipo === 'devocional' ? conteudoPublicado(e.data) : undefined;
  const progresso = useProgressoFases(aba === 'leitura' && conteudo ? conteudo.fases.length : 0, data);
  const est = estacaoDe(e);
  const fonte = u.preferencias.tamanho_fonte;
  const anterior = vizinho(data, -1);
  const proximo = vizinho(data, 1);

  return (
    <div className="fala-alma" style={{ minHeight: '100vh', background: C.fundo, color: C.texto, fontFamily: SANS }}>
      <style>{CSS_PAGINA}</style>
      <div className="fa-sem-impressao"><Navbar /></div>

      {/* Abertura da série */}
      <header className="fa-sem-impressao fa-hero">
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.ciano }}>
            {EMOJI_MES[mesIndice(e.data)]} {est.emoji} {est.nome} · {MESES[mesIndice(e.data)]}
          </div>
          <h1 style={{ fontFamily: TITULO_DEC, fontSize: 'clamp(34px, 8.5vw, 54px)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.05, margin: '12px 0 10px', color: C.texto }}>
            Conselheiro <span style={{ color: C.dourado }}>da Alma</span>
          </h1>
          <p style={{ margin: '0 auto', maxWidth: 460, fontFamily: TITULO, fontSize: 16, letterSpacing: '0.04em', lineHeight: 1.6, color: C.textoSuave }}>365 conversas nos Salmos para o coração cansado</p>
          {aba === 'leitura' && <FaixaSemana data={data} dataHoje={dataHoje} bissexto={bissexto} onIrPara={irPara} />}
        </div>
        <nav aria-label="Seções do devocional" style={{ maxWidth: 680, margin: '22px auto 0', padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${ABAS.length}, 1fr)`, gap: 4, padding: 4, borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.borda}` }}>
            {ABAS.map(a => (
              <button key={a.id} type="button" onClick={() => irAba(a.id)} aria-current={aba === a.id ? 'page' : undefined} className="fa-botao"
                style={{ minHeight: 48, borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: DISPLAY, fontSize: 10, letterSpacing: '0.06em', fontWeight: 700, color: aba === a.id ? C.fundo : C.texto, background: aba === a.id ? C.ciano : 'transparent' }}>
                <span aria-hidden style={{ display: 'block', fontSize: 17, lineHeight: 1.2 }}>{a.icone}</span>{a.rotulo}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Barra fixa da leitura: navegação ◀ ▶, fonte e progresso das 8 fases */}
      {aba === 'leitura' && (
        <div className="fa-sem-impressao fa-toolbar">
          <div style={{ maxWidth: 680, margin: '0 auto', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <div style={{ display: 'flex', gap: 6, minWidth: 0 }}>
              <BotaoBarra onClick={() => anterior && irPara(anterior)} desativado={!anterior} rotulo="Dia anterior">◀</BotaoBarra>
              <BotaoBarra onClick={() => irAba('calendario')} rotulo="Abrir o calendário">📅 {rotuloData(data)}</BotaoBarra>
              <BotaoBarra onClick={() => proximo && irPara(proximo)} desativado={!proximo} rotulo="Próximo dia">▶</BotaoBarra>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {data !== dataInicial && <BotaoBarra onClick={() => navigate('/devocional/fala-alma')} rotulo="Ir para hoje">Hoje</BotaoBarra>}
              <BotaoBarra onClick={() => u.setPreferencia('tamanho_fonte', Math.max(0.9, +(fonte - 0.1).toFixed(2)))} rotulo="Diminuir a letra">A−</BotaoBarra>
              <BotaoBarra onClick={() => u.setPreferencia('tamanho_fonte', Math.min(1.5, +(fonte + 0.1).toFixed(2)))} rotulo="Aumentar a letra">A+</BotaoBarra>
            </div>
          </div>
          {conteudo && (
            <div role="progressbar" aria-label="Progresso das 8 fases" aria-valuemin={0} aria-valuemax={8} aria-valuenow={progresso}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 3, padding: '0 16px 8px', maxWidth: 680, margin: '0 auto' }}>
              {conteudo.fases.map(f => (
                <button key={f.numero} type="button" title={`${f.numero}. ${f.fase}`} aria-label={`Ir para a fase ${f.numero}: ${f.fase}`}
                  onClick={() => document.getElementById(`fase-${f.numero}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  style={{ height: 6, padding: 0, border: 'none', borderRadius: 99, cursor: 'pointer', background: f.numero <= progresso ? `linear-gradient(90deg, ${C.ciano}, ${C.dourado})` : 'rgba(0,229,255,0.15)' }} />
              ))}
            </div>
          )}
        </div>
      )}

      <main style={{ maxWidth: 680, margin: '0 auto', padding: '24px 16px 72px' }}>
        {aba === 'leitura' && (
          <>
            <BannerEspecial especiais={especiais} mostrando={mostrarEspecial} onAlternar={setMostrarEspecial} />
            {mostrarEspecial && especiais[0] ? <LeituraEspecialView especial={especiais[0]} dataHoje={dataHoje} />
              : e.tipo === 'selah' ? <DiaSelah e={e} onIrPara={irPara} />
              : e.tipo === 'colheita' ? <DiaColheita e={e} onIrPara={irPara} />
              : e.tipo === 'selah_bonus' ? <DiaSelahBonus e={e} onIrPara={irPara} anoBissexto={bissexto} />
              : conteudo ? <LeituraDia key={e.data} e={e} c={conteudo} onIrPara={irPara} />
              : <DiaEmPreparo e={e} onIrPara={irPara} />}
          </>
        )}
        {aba === 'calendario' && <TituloAba titulo="Calendário anual" sub="4 estações, 12 meses, todos os 150 Salmos." ><Calendario dataAtual={data} dataHoje={dataHoje} onIrPara={irPara} /></TituloAba>}
        {aba === 'caderno' && <TituloAba titulo="Meu caderno" sub="Suas respostas e anotações ficam salvas só neste aparelho."><MeuCaderno onIrPara={irPara} /></TituloAba>}
        {aba === 'progresso' && <TituloAba titulo="Meu progresso" sub="Um dia de cada vez."><Progresso dataHoje={dataHoje} /></TituloAba>}
        {aba === 'sobre' && <TituloAba titulo="Sobre" sub="Como o devocional funciona."><Sobre /></TituloAba>}
      </main>

      <div className="fa-sem-impressao"><Footer /></div>
    </div>
  );
}

/** "11-24" → data; "328" (dia do ano, links antigos) → data; abas e lixo → null. */
function slugParaData(slug?: string): string | null {
  if (!slug) return null;
  if (/^\d{2}-\d{2}$/.test(slug) && entrada(slug)) return slug;
  if (/^\d{1,3}$/.test(slug)) return PLANO.find(e => e.dia_do_ano === Number(slug))?.data ?? null;
  return null;
}

function TituloAba({ titulo, sub, children }: { titulo: string; sub: string; children: ReactNode }) {
  return (
    <>
      <h2 className="fa-sem-impressao" style={{ fontFamily: TITULO, fontSize: 30, fontWeight: 900, margin: '4px 0 4px' }}>{titulo}</h2>
      <p className="fa-sem-impressao" style={{ margin: '0 0 20px', fontSize: 16, color: C.textoSuave }}>{sub}</p>
      {children}
    </>
  );
}

function BotaoBarra({ children, onClick, rotulo, desativado }: { children: ReactNode; onClick: () => void; rotulo: string; desativado?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={desativado} aria-label={rotulo} title={rotulo} className="fa-botao"
      style={{
        minHeight: 44, minWidth: 44, padding: '0 12px', borderRadius: 10, fontSize: 12, letterSpacing: '0.04em', fontWeight: 700, fontFamily: DISPLAY,
        color: desativado ? 'rgba(234,242,255,0.3)' : C.ciano, background: C.cianoSuave,
        border: `1px solid ${desativado ? 'rgba(255,255,255,0.1)' : 'rgba(0,229,255,0.35)'}`,
        cursor: desativado ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>{children}</button>
  );
}

/* Os dias do bloco atual (semana 1–4 ou colheita), com tipo, conclusão e "hoje". */
function FaixaSemana({ data, dataHoje, bissexto, onIrPara }: { data: string; dataHoje: string; bissexto: boolean; onIrPara: (d: string) => void }) {
  const u = useUsuario();
  const mes = mesIndice(data);
  const dia = Number(data.slice(3));
  const inicio = dia >= 29 ? 29 : Math.floor((dia - 1) / 7) * 7 + 1;
  const fim = dia >= 29 ? 31 : inicio + 6;
  const dias = PLANO.filter(x => mesIndice(x.data) === mes && Number(x.data.slice(3)) >= inicio && Number(x.data.slice(3)) <= fim && (x.tipo !== 'selah_bonus' || bissexto));
  const e = entrada(data)!;
  return (
    <div style={{ marginTop: 22 }}>
      <div style={{ fontFamily: TITULO, fontSize: 15, fontWeight: 700, color: C.textoSuave, marginBottom: 10 }}>
        {e.semana && e.semana <= 4 ? <><span style={{ color: C.dourado }}>Semana {e.semana}</span> · {e.nome_semana}</> : <span style={{ color: C.dourado }}>{e.nome_semana}</span>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${dias.length}, 1fr)`, gap: 6 }}>
        {dias.map(d => {
          const atual = d.data === data;
          const cor = COR_TIPO[d.tipo];
          return (
            <button key={d.data} type="button" onClick={() => onIrPara(d.data)} className="fa-botao" aria-current={atual ? 'date' : undefined}
              aria-label={`${rotuloData(d.data)}${d.leitura ? `, ${leituraExtenso(d.leitura)}` : `, ${d.tipo}`}${u.concluidosSet.has(d.data) ? ', concluído' : ''}`}
              style={{
                position: 'relative', padding: '8px 0 7px', borderRadius: 12, cursor: 'pointer', fontFamily: SANS,
                background: atual ? cor : 'rgba(15,32,56,0.9)', color: atual ? C.fundo : C.texto,
                border: `1px solid ${d.data === dataHoje && !atual ? C.dourado : `${cor}88`}`,
              }}>
              <span style={{ display: 'block', fontFamily: DISPLAY, fontSize: 16, fontWeight: 700, lineHeight: 1.2 }}>{Number(d.data.slice(3))}</span>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 700, opacity: 0.85 }}>{d.tipo === 'selah' || d.tipo === 'selah_bonus' ? '⏸️' : d.tipo === 'colheita' ? '🌾' : `Sl ${d.trechos[0][0]}`}</span>
              {u.concluidosSet.has(d.data) && <span aria-hidden style={{ position: 'absolute', top: -6, right: -4, width: 18, height: 18, borderRadius: 99, background: C.vida, color: C.fundo, fontSize: 11, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* Quantas fases já passaram pela metade de cima da tela. */
function useProgressoFases(total: number, chave: string) {
  const [lidas, setLidas] = useState(0);
  useEffect(() => {
    if (!total) { setLidas(0); return; }
    const medir = () => {
      const cartoes = Array.from(document.querySelectorAll<HTMLElement>('[data-fase]'));
      setLidas(cartoes.filter(c => c.getBoundingClientRect().top < window.innerHeight * 0.55).length);
    };
    medir();
    window.addEventListener('scroll', medir, { passive: true });
    window.addEventListener('resize', medir);
    return () => { window.removeEventListener('scroll', medir); window.removeEventListener('resize', medir); };
  }, [total, chave]);
  return lidas;
}


const CSS_PAGINA = `
.fala-alma .fa-hero {
  padding: 96px 0 20px;
  background:
    radial-gradient(ellipse at 15% 0%, rgba(0,229,255,0.16), transparent 55%),
    radial-gradient(ellipse at 90% 30%, rgba(212,175,55,0.12), transparent 50%),
    linear-gradient(180deg, #0D1E38 0%, ${C.fundo} 100%);
  border-bottom: 1px solid rgba(0,229,255,0.10);
}
@media (min-width: 1024px) { .fala-alma .fa-hero { padding-top: 112px; } }
.fala-alma .fa-toolbar {
  position: sticky; top: 64px; z-index: 40;
  background: rgba(10,22,40,0.9); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0,229,255,0.12);
}
@media (min-width: 1024px) { .fala-alma .fa-toolbar { top: 72px; } }
/* o site justifica todo <p>; aqui o parágrafo segue o alinhamento do bloco (frase do dia sempre centralizada) */
.fala-alma p { text-align: inherit; hyphens: manual; -webkit-hyphens: manual; }
.fala-alma .fa-recolhido { display: none; }
.fala-alma .fa-so-impressao { display: none; }
.fala-alma .fa-surgir { animation: faSurgir .28s ease-out; }
@keyframes faSurgir { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
.fala-alma .fa-botao { transition: transform .15s, filter .15s; }
.fala-alma .fa-botao:not(:disabled):hover { filter: brightness(1.15); }
.fala-alma .fa-botao:not(:disabled):active { transform: scale(0.96); }
.fala-alma .fa-amanha { transition: border-color .2s, transform .2s; }
.fala-alma .fa-amanha:hover { border-color: ${C.ciano} !important; transform: translateY(-2px); }
.fala-alma button:focus-visible, .fala-alma textarea:focus-visible, .fala-alma a:focus-visible, .fala-alma input:focus-visible { outline: 2px solid ${C.ciano}; outline-offset: 2px; }
.fala-alma textarea:focus, .fala-alma input:focus { border-color: ${C.ciano} !important; box-shadow: 0 0 0 3px rgba(0,229,255,0.15); }
.fala-alma textarea::placeholder, .fala-alma input::placeholder { color: rgba(214,226,246,0.55); }
@media (prefers-reduced-motion: reduce) { .fala-alma * { animation: none !important; transition: none !important; scroll-behavior: auto !important; } }
@media print {
  @page { margin: 16mm; }
  html, body { background: #fff !important; }
  .fala-alma { background: #fff !important; color: #111 !important; }
  .fala-alma * { color: #111 !important; background: transparent !important; box-shadow: none !important; text-shadow: none !important; }
  .fala-alma .fa-sem-impressao, .fala-alma button:not(.fa-amanha) { display: none !important; }
  .fala-alma .fa-so-impressao, .fala-alma .fa-recolhido { display: block !important; }
  .fala-alma main { padding-top: 0 !important; max-width: none !important; }
  .fala-alma .fa-cartao, .fala-alma section, .fala-alma blockquote, .fala-alma aside, .fala-alma .fa-amanha { border: 1px solid #bbb !important; break-inside: avoid; }
  .fala-alma .fa-fala-pessoa { border-left: 3px solid #999 !important; }
  .fala-alma textarea { border: 1px solid #999 !important; min-height: 4em; }
}
`;
