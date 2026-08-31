import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { DEVOCIONAL_FAMILIAR, DiaFamiliar } from '../data/devocionalFamiliar';

const COR = 'rgba(251,113,133,1)';
const COR_BG = 'rgba(251,113,133,0.07)';
const COR_BORDA = 'rgba(251,113,133,0.20)';
const BG = '#05071a';

const SEMANAS = [
  { semana: 1,  titulo: 'Semana 1 — Mateus',        tema: 'O lar fundado sobre a rocha' },
  { semana: 2,  titulo: 'Semana 2 — Mateus',        tema: 'Fé que sustenta a casa na escassez' },
  { semana: 3,  titulo: 'Semana 3 — Mateus',        tema: 'Perdão sem limite, casamento sem ruptura' },
  { semana: 4,  titulo: 'Semana 4 — Mateus',        tema: 'Convidados para as bodas do Rei' },
  { semana: 5,  titulo: 'Semana 5 — Marcos',        tema: 'Uma semente que cresce dentro de casa' },
  { semana: 6,  titulo: 'Semana 6 — Marcos',        tema: 'Já não são dois, mas um só corpo' },
  { semana: 7,  titulo: 'Semana 7 — Marcos / Lucas',tema: 'Deus visita casais que se sentem pequenos demais' },
  { semana: 8,  titulo: 'Semana 8 — Lucas',         tema: 'Compaixão que restaura relações quebradas' },
  { semana: 9,  titulo: 'Semana 9 — Lucas',         tema: 'A alegria de um filho que volta para casa' },
  { semana: 10, titulo: 'Semana 10 — Lucas',        tema: 'O Rei entra na cidade' },
  { semana: 11, titulo: 'Semana 11 — Lucas / João', tema: 'A Ressurreição e o Verbo encarnado' },
  { semana: 12, titulo: 'Semana 12 — João',         tema: 'O Bom Pastor e o Pão da Vida' },
  { semana: 13, titulo: 'Semana 13 — João',         tema: 'A Hora Gloriosa — serviço e paz' },
  { semana: 14, titulo: 'Semana 14 — João',         tema: 'Permanecer na videira' },
  { semana: 15, titulo: 'Semana 15 — João / Atos',  tema: 'O Espírito transforma a casa' },
  { semana: 16, titulo: 'Semana 16 — Atos',         tema: 'Testemunho fiel sob pressão' },
  { semana: 17, titulo: 'Semana 17 — Atos',         tema: 'Graça sem fronteiras' },
  { semana: 18, titulo: 'Semana 18 — Atos',         tema: 'Espírito que abre portas' },
  { semana: 19, titulo: 'Semana 19 — Atos',         tema: 'Paulo preso, mas a Palavra livre' },
  { semana: 20, titulo: 'Semana 20 — Romanos',      tema: 'Justificados pela fé' },
  { semana: 21, titulo: 'Semana 21 — Romanos',      tema: 'Mortos para o pecado, vivos para Deus' },
  { semana: 22, titulo: 'Semana 22 — Romanos',      tema: 'A vida da aliança no corpo de Cristo' },
  { semana: 23, titulo: 'Semana 23 — 1 Coríntios',  tema: 'Fraqueza, fundação e o corpo como templo' },
  { semana: 24, titulo: 'Semana 24 — 1 Coríntios',  tema: 'O amor que edifica o lar' },
  { semana: 25, titulo: 'Semana 25 — 1 Coríntios',  tema: 'O amor nunca falha' },
  { semana: 26, titulo: 'Semana 26 — 2 Coríntios',  tema: 'Consolação e aliança renovada' },
  { semana: 27, titulo: 'Semana 27 — 2 Cor / Gl',   tema: 'Generosidade e poder na fraqueza' },
  { semana: 28, titulo: 'Semana 28 — Gálatas',       tema: 'Fruto do Espírito e liberdade para amar' },
  { semana: 29, titulo: 'Semana 29 — Efésios',       tema: 'O lar edificado em Cristo' },
  { semana: 30, titulo: 'Semana 30 — Filipenses',    tema: 'Alegria e contentamento' },
  { semana: 31, titulo: 'Semana 31 — Colossenses',   tema: 'Cristo, cabeça de tudo' },
  { semana: 32, titulo: 'Semana 32 — Tessalonicenses', tema: 'Esperança da vinda e fidelidade no trabalho' },
  { semana: 33, titulo: 'Semana 33 — 1-2 Timóteo',  tema: 'O bom depósito e a aliança fiel' },
  { semana: 34, titulo: 'Semana 34 — 2Tm / Tito',   tema: 'Sofrer como bom soldado' },
  { semana: 35, titulo: 'Semana 35 — Hebreus',       tema: 'O sumo sacerdote fiel' },
  { semana: 36, titulo: 'Semana 36 — Hebreus',       tema: 'A fé que age' },
  { semana: 37, titulo: 'Semana 37 — Tiago / 1Pe',   tema: 'Fé que age e amor que persevera' },
  { semana: 38, titulo: 'Semana 38 — 1Pe / 2Pe / 1Jo', tema: 'Amor que persevera até o fim' },
  { semana: 39, titulo: 'Semana 39 — Jd / Ap 1-7',    tema: 'As cartas finais e o início da visão' },
  { semana: 40, titulo: 'Semana 40 — Ap 8-14',         tema: 'No meio da tribulação' },
  { semana: 41, titulo: 'Semana 41 — Ap 15-19',        tema: 'A queda de Babilônia e as núpcias' },
  { semana: 42, titulo: 'Semana 42 — Ap 20-22',        tema: 'Todas as coisas novas' },
  { semana: 43, titulo: 'Semana 43 — Fechamento',      tema: 'Renovação da aliança' },
];

const ESTACOES = ['I — O Noivo se revela', 'II — A Noiva é formada', 'III — A vida doméstica da aliança', 'IV — Fidelidade até as núpcias', 'Fechamento'];

const MESES_CURTOS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const MESES_LONGOS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

function diaParaDataCurta(dia: number): string {
  const d = new Date(2026, 0, dia);
  return `${d.getDate()} ${MESES_CURTOS[d.getMonth()]}`;
}

function diaParaDataCompleta(dia: number): string {
  const d = new Date(2026, 0, dia);
  return `${d.getDate()} de ${MESES_LONGOS[d.getMonth()]} de 2026`;
}

function badgeTipo(tipo: DiaFamiliar['tipo']) {
  if (tipo === 'mesa-alianca') return { label: 'Mesa da Aliança', color: 'rgba(251,191,36,1)', bg: 'rgba(251,191,36,0.12)' };
  if (tipo === 'aplicacao') return { label: 'Dia de Aplicação', color: 'rgba(134,239,172,1)', bg: 'rgba(134,239,172,0.10)' };
  return { label: 'Devocional', color: COR, bg: COR_BG };
}

function CardDia({ d, expanded, onToggle }: { d: DiaFamiliar; expanded: boolean; onToggle: () => void }) {
  const badge = badgeTipo(d.tipo);

  return (
    <motion.div
      id={`dia-${d.dia}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      style={{
        borderRadius: 20,
        border: `1.5px solid ${expanded ? COR : COR_BORDA}`,
        background: expanded ? 'rgba(251,113,133,0.05)' : BG,
        overflow: 'hidden',
        scrollMarginTop: 96,
        transition: 'border-color 0.22s, background 0.22s',
      }}
    >
      {/* Header clicável */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 'clamp(18px,3vw,28px)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 16,
          textAlign: 'left',
        }}
      >
        {/* Número do dia */}
        <div style={{
          minWidth: 48, height: 48, borderRadius: 12, flexShrink: 0,
          background: COR_BG, border: `1.5px solid ${COR_BORDA}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, fontWeight: 900, color: COR,
        }}>
          {d.dia}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
            <span style={{
              fontSize: 10, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: badge.color, padding: '2px 10px', borderRadius: 99, background: badge.bg,
            }}>
              {badge.label}
            </span>
            <span style={{ fontSize: 11, color: 'rgba(200,200,255,0.45)', fontWeight: 600 }}>
              Semana {d.semana}
            </span>
            <span style={{ fontSize: 11, color: 'rgba(251,113,133,0.55)', fontWeight: 600 }}>
              · {diaParaDataCompleta(d.dia)}
            </span>
          </div>
          <div style={{ fontSize: 'clamp(15px,2.2vw,18px)', fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: 4 }}>
            {d.tema}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(200,200,255,0.50)', fontWeight: 500 }}>
            {d.leitura}
          </div>
        </div>

        <div style={{ fontSize: 18, color: expanded ? COR : 'rgba(200,200,255,0.35)', flexShrink: 0, marginTop: 12, transition: 'transform 0.22s, color 0.22s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          ▼
        </div>
      </button>

      {/* Conteúdo expandido */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: 'clamp(16px,3vw,28px)', paddingTop: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ height: 1, background: COR_BORDA }} />

              {/* Subtema */}
              <p style={{ fontSize: 13, color: 'rgba(251,113,133,0.75)', fontStyle: 'italic', lineHeight: 1.65, margin: 0 }}>
                {d.subtema}
              </p>

              {/* Pergunta-gancho */}
              {d.perguntaGancho && (
                <div style={{ borderRadius: 14, background: 'rgba(251,113,133,0.08)', border: `1px solid rgba(251,113,133,0.18)`, padding: '18px 22px' }}>
                  <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: COR, marginBottom: 10 }}>Pergunta-gancho</div>
                  <p style={{ margin: 0, fontSize: 17, color: 'rgba(255,255,255,0.90)', lineHeight: 1.75, fontStyle: 'italic' }}>
                    {d.perguntaGancho}
                  </p>
                </div>
              )}

              {/* Reflexão do texto */}
              {d.reflexaoTexto && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(200,200,255,0.55)', marginBottom: 12 }}>Reflexão do Texto</div>
                  <p style={{ margin: 0, fontSize: 17, color: 'rgba(220,215,255,0.85)', lineHeight: 1.9 }}>
                    {d.reflexaoTexto}
                  </p>
                </div>
              )}

              {/* Pergunta geradora */}
              {d.perguntaGeradora && (
                <div style={{ borderLeft: `3px solid ${COR_BORDA}`, paddingLeft: 18 }}>
                  <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(200,200,255,0.45)', marginBottom: 10 }}>Pergunta Geradora</div>
                  <p style={{ margin: 0, fontSize: 17, color: 'rgba(220,215,255,0.85)', lineHeight: 1.8, fontStyle: 'italic' }}>
                    {d.perguntaGeradora}
                  </p>
                </div>
              )}

              {/* Reflexões por pessoa */}
              {(d.reflexaoHomem || d.reflexaoMulher) && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 14 }}>
                  {d.reflexaoHomem && (
                    <div style={{ borderRadius: 12, background: 'rgba(96,165,250,0.07)', border: '1px solid rgba(96,165,250,0.18)', padding: '16px 18px' }}>
                      <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(96,165,250,0.85)', marginBottom: 10 }}>Reflexão — Homem</div>
                      <p style={{ margin: 0, fontSize: 16, color: 'rgba(220,215,255,0.82)', lineHeight: 1.8 }}>{d.reflexaoHomem}</p>
                    </div>
                  )}
                  {d.reflexaoMulher && (
                    <div style={{ borderRadius: 12, background: 'rgba(251,113,133,0.07)', border: `1px solid ${COR_BORDA}`, padding: '16px 18px' }}>
                      <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: COR, marginBottom: 10 }}>Reflexão — Mulher</div>
                      <p style={{ margin: 0, fontSize: 16, color: 'rgba(220,215,255,0.82)', lineHeight: 1.8 }}>{d.reflexaoMulher}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Reflexão filhos */}
              {d.reflexaoFilhos && (
                <div style={{ borderRadius: 12, background: 'rgba(167,139,250,0.07)', border: '1px solid rgba(167,139,250,0.18)', padding: '16px 18px' }}>
                  <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.85)', marginBottom: 10 }}>Reflexão — Filhos</div>
                  <p style={{ margin: 0, fontSize: 16, color: 'rgba(220,215,255,0.82)', lineHeight: 1.8 }}>{d.reflexaoFilhos}</p>
                </div>
              )}

              {/* Leitura complementar (mesa da aliança) */}
              {d.leituraComplementar && (
                <div style={{ borderRadius: 12, background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.20)', padding: '16px 18px' }}>
                  <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(251,191,36,0.9)', marginBottom: 10 }}>Leitura Complementar</div>
                  <p style={{ margin: 0, fontSize: 16, color: 'rgba(220,215,255,0.83)', lineHeight: 1.8 }}>{d.leituraComplementar}</p>
                </div>
              )}

              {/* Compromisso prático */}
              {d.compromissoPratico && (
                <div style={{ borderRadius: 14, background: 'rgba(134,239,172,0.06)', border: '1px solid rgba(134,239,172,0.18)', padding: '18px 22px' }}>
                  <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(134,239,172,0.85)', marginBottom: 12 }}>Compromisso Prático da Semana</div>
                  <p style={{ margin: 0, fontSize: 16, color: 'rgba(220,215,255,0.83)', lineHeight: 1.85 }}>{d.compromissoPratico}</p>
                </div>
              )}

              {/* Oração de aliança */}
              {d.oracaoAlianca && (
                <div style={{ borderRadius: 14, background: 'rgba(251,113,133,0.05)', border: `1px solid ${COR_BORDA}`, padding: '20px 22px' }}>
                  <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: COR, marginBottom: 12 }}>Oração de Aliança</div>
                  <p style={{ margin: 0, fontSize: 16, color: 'rgba(220,215,255,0.83)', lineHeight: 1.95, fontStyle: 'italic' }}>
                    {d.oracaoAlianca}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function diaDeHoje(): number {
  const inicio = new Date(2026, 0, 1);
  const hoje = new Date();
  const diff = Math.floor((hoje.getTime() - inicio.getTime()) / 86400000) + 1;
  return Math.max(1, Math.min(diff, DEVOCIONAL_FAMILIAR.length));
}

export default function DevocionalFamiliarPage() {
  const [expandedDia, setExpandedDia] = useState<number | null>(null);
  const [calAberto, setCalAberto] = useState(true);
  const diaHoje = diaDeHoje();
  const diaAtual = DEVOCIONAL_FAMILIAR.find(d => d.dia === diaHoje) ?? DEVOCIONAL_FAMILIAR[0];

  function scrollToDia(dia: number) {
    setExpandedDia(dia);
    setTimeout(() => {
      const el = document.getElementById(`dia-${dia}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  const semanasDisponiveisSet = new Set(DEVOCIONAL_FAMILIAR.map(d => d.semana));
  const diasPorSemana = (sem: number) => DEVOCIONAL_FAMILIAR.filter(d => d.semana === sem);

  return (
    <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
      <Navbar />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(88px,11vw,108px) clamp(16px,4vw,32px) 100px' }}>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(48px,8vw,68px)', marginBottom: 14, lineHeight: 1 }}>💑</div>
          <div style={{ fontSize: 'clamp(10px,1.4vw,11px)', fontWeight: 900, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(251,113,133,0.80)', marginBottom: 12 }}>
            Devocional Familiar Expositivo
          </div>
          <h1 style={{
            fontSize: 'clamp(26px,4.5vw,44px)', fontWeight: 900, lineHeight: 1.14, margin: '0 0 14px',
            background: 'linear-gradient(135deg, #fff 0%, rgba(251,113,133,1) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Para namorados, noivos e casados
          </h1>
          <p style={{ fontSize: 'clamp(14px,1.9vw,16px)', color: 'rgba(200,200,255,0.60)', lineHeight: 1.8, maxWidth: 540, margin: '0 auto 24px' }}>
            365 dias pelo Novo Testamento inteiro — expositivo, em ordem, sem pular textos. Quatro Estações da Aliança, do nascimento ao destino eterno do casamento cristão.
          </p>
          {/* Badges de estação */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {['Estação I', 'Estação II', 'Estação III', 'Estação IV'].map((e, i) => (
              <span key={i} style={{ fontSize: 11, fontWeight: 700, color: COR, padding: '4px 14px', borderRadius: 99, background: COR_BG, border: `1px solid ${COR_BORDA}` }}>
                {e}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Card do dia atual */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase', color: COR, marginBottom: 14, textAlign: 'center' }}>
            📖 Devocional de Hoje
          </div>
          <button
            onClick={() => scrollToDia(diaAtual.dia)}
            style={{
              width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left',
            }}
          >
            <motion.div
              whileHover={{ borderColor: COR, background: 'rgba(251,113,133,0.09)' }}
              transition={{ duration: 0.22 }}
              style={{
                borderRadius: 20, border: `1.5px solid rgba(251,113,133,0.38)`,
                background: 'rgba(251,113,133,0.05)', padding: 'clamp(20px,3vw,30px)',
                display: 'flex', alignItems: 'center', gap: 18,
              }}
            >
              {/* Número */}
              <div style={{
                minWidth: 64, height: 64, borderRadius: 16, flexShrink: 0,
                background: 'rgba(251,113,133,0.14)', border: `1.5px solid rgba(251,113,133,0.35)`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 10, fontWeight: 900, color: COR, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Dia</span>
                <span style={{ fontSize: 22, fontWeight: 900, color: COR, lineHeight: 1.1 }}>{diaAtual.dia}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                  {(() => { const b = badgeTipo(diaAtual.tipo); return (
                    <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: b.color, padding: '2px 10px', borderRadius: 99, background: b.bg }}>{b.label}</span>
                  ); })()}
                  <span style={{ fontSize: 11, color: 'rgba(251,113,133,0.60)', fontWeight: 600 }}>
                    {diaParaDataCompleta(diaAtual.dia)}
                  </span>
                </div>
                <div style={{ fontSize: 'clamp(16px,2.4vw,20px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 4 }}>
                  {diaAtual.tema}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(200,200,255,0.55)', fontWeight: 500 }}>{diaAtual.leitura}</div>
              </div>
              <div style={{ fontSize: 20, color: COR, flexShrink: 0, opacity: 0.7 }}>→</div>
            </motion.div>
          </button>
        </motion.div>

        {/* Como usar */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ borderRadius: 18, background: COR_BG, border: `1px solid ${COR_BORDA}`, padding: 'clamp(18px,3vw,28px)', marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: COR, marginBottom: 12 }}>Como usar</div>
          <p style={{ margin: 0, fontSize: 14, color: 'rgba(220,215,255,0.75)', lineHeight: 1.85 }}>
            Os dias não têm data fixa — comece no Dia 1 quando quiser e siga a sequência. Cada semana tem 6 dias de leitura expositiva (Segunda a Sábado), com um subtema que aponta a leitura do dia diretamente para casal, noivos e família, e um domingo de revisão (<strong style={{ color: 'rgba(251,191,36,0.9)' }}>Mesa da Aliança</strong>), sem leitura nova. Nas Estações III e IV aparecem <strong style={{ color: 'rgba(134,239,172,0.85)' }}>Dias de Aplicação</strong> — sem capítulo novo, dedicados a aprofundar o que já foi lido, no ritmo mais pausado que a vida doméstica pede.
          </p>
        </motion.div>

        {/* Calendário de navegação */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ marginBottom: 48 }}>
          <button
            onClick={() => setCalAberto(v => !v)}
            style={{
              width: '100%', background: 'none', border: `1.5px solid ${COR_BORDA}`, borderRadius: 14,
              cursor: 'pointer', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 900, color: COR, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              📅 Calendário · 2026 (Dias 1–{DEVOCIONAL_FAMILIAR.length})
            </span>
            <span style={{ fontSize: 16, color: COR, transition: 'transform 0.22s', transform: calAberto ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
          </button>

          <AnimatePresence>
            {calAberto && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {SEMANAS.filter(s => semanasDisponiveisSet.has(s.semana)).map(sw => {
                    const dias = diasPorSemana(sw.semana);
                    return (
                      <div key={sw.semana} style={{ borderRadius: 14, border: `1px solid ${COR_BORDA}`, overflow: 'hidden' }}>
                        {/* Cabeçalho da semana */}
                        <div style={{ padding: '12px 18px', background: COR_BG, borderBottom: `1px solid ${COR_BORDA}` }}>
                          <div style={{ fontSize: 12, fontWeight: 900, color: COR, marginBottom: 2 }}>{sw.titulo}</div>
                          <div style={{ fontSize: 13, color: 'rgba(220,215,255,0.65)', fontStyle: 'italic' }}>{sw.tema}</div>
                        </div>
                        {/* Dias da semana */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 148px), 1fr))' }}>
                          {dias.map((d, i) => {
                            const badge = badgeTipo(d.tipo);
                            return (
                              <button
                                key={d.dia}
                                onClick={() => scrollToDia(d.dia)}
                                style={{
                                  background: 'none', border: 'none',
                                  borderRight: i < dias.length - 1 ? `1px solid ${COR_BORDA}` : 'none',
                                  borderBottom: 0,
                                  cursor: 'pointer',
                                  padding: '12px 14px',
                                  display: 'flex', flexDirection: 'column', gap: 3, textAlign: 'left',
                                  transition: 'background 0.18s',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = COR_BG)}
                                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                              >
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                                  <span style={{ fontSize: 16, fontWeight: 900, color: badge.color }}>
                                    {d.dia}
                                  </span>
                                  <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(251,113,133,0.55)' }}>
                                    {diaParaDataCurta(d.dia)}
                                  </span>
                                </div>
                                <span style={{ fontSize: 11, color: '#fff', fontWeight: 700, lineHeight: 1.35 }}>
                                  {d.tema.length > 28 ? d.tema.slice(0, 28) + '…' : d.tema}
                                </span>
                                <span style={{ fontSize: 10, color: 'rgba(200,200,255,0.40)', lineHeight: 1.3, fontWeight: 500 }}>
                                  {d.leitura.length > 18 ? d.leitura.slice(0, 18) + '…' : d.leitura}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Estação I — título */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
            <div style={{ flex: 1, height: 1, background: COR_BORDA }} />
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(251,113,133,0.70)', whiteSpace: 'nowrap' }}>
              Estação I — O Noivo se revela
            </span>
            <div style={{ flex: 1, height: 1, background: COR_BORDA }} />
          </div>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(200,200,255,0.45)', textAlign: 'center', fontStyle: 'italic' }}>
            Mateus · Marcos · Lucas · João — Os Evangelhos
          </p>
        </motion.div>

        {/* Lista de dias */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {DEVOCIONAL_FAMILIAR.map(d => (
            <CardDia
              key={d.dia}
              d={d}
              expanded={expandedDia === d.dia}
              onToggle={() => setExpandedDia(prev => prev === d.dia ? null : d.dia)}
            />
          ))}
        </div>

        {/* Aviso — próximos meses em breve */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginTop: 48, borderRadius: 16, border: `1px dashed ${COR_BORDA}`, padding: '24px 28px', textAlign: 'center' }}
        >
          <div style={{ fontSize: 28, marginBottom: 12 }}>📖</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(220,215,255,0.70)', marginBottom: 8 }}>
            Março em diante — em breve
          </div>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(200,200,255,0.45)', lineHeight: 1.75 }}>
            Os dias 60 a 365 — Lucas, João, Atos, Epístolas e Apocalipse — serão publicados em sequência. Continue o ritmo com os 59 dias de janeiro e fevereiro.
          </p>
        </motion.div>

      </div>

      <Footer />
    </div>
  );
}
