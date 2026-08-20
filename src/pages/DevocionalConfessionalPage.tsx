import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { DEVOCIONAL_CONFESSIONAL, MESES_CONFESSIONAL, diasDoMes, type DiaConfessional } from '../data/devocionalConfessional';

function diaDoAno(): number {
  const hoje = new Date();
  const inicio = new Date(hoje.getFullYear(), 0, 0);
  const diff = hoje.getTime() - inicio.getTime();
  return Math.floor(diff / 86400000);
}

function dataFormatada(): string {
  return new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
}

const BG = '#05071a';
const COR = 'rgba(167,139,250,1)';
const COR_BG = 'rgba(167,139,250,0.07)';
const COR_BORDA = 'rgba(167,139,250,0.20)';
const COR_BORDA_H = 'rgba(167,139,250,0.45)';

const NOTAS_INTRO = [
  { n: '1', ref: 'REINKE, Tony. 12 Ways Your Phone Is Changing You. Wheaton: Crossway, 2017.' },
  { n: '2', ref: 'SONG, Felicia Wu. Restless Devices: Recovering Personhood, Presence, and Place in the Digital Age. Downers Grove: IVP Academic, 2021.' },
  { n: '3', ref: 'NOBLE, Alan. Disruptive Witness: Speaking Truth in a Distracted Age. Grand Rapids: Brazos Press, 2018.' },
  { n: '4', ref: 'LETHAM, Robert. The Westminster Assembly: Reading Its Theology in Historical Context. Phillipsburg: P&R Publishing, 2009.' },
  { n: '5', ref: 'RENIHAN, James M. Edification and Beauty. Milton Keynes: Paternoster, 2004.' },
  { n: '6', ref: 'REINKE, Tony. 12 Ways Your Phone Is Changing You. Wheaton: Crossway, 2017.' },
  { n: '7', ref: 'DYER, John. From the Garden to the City: The Redeeming and Corrupting Power of Technology. Grand Rapids: Kregel, 2011.' },
];

function sup(n: string) {
  return <sup style={{ fontSize: 10, color: COR, fontWeight: 900, marginLeft: 1 }}>{n}</sup>;
}

function Introducao({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'rgba(167,139,250,0.04)',
        border: `1.5px solid ${COR_BORDA_H}`,
        borderRadius: 22,
        padding: 'clamp(24px,4vw,48px)',
        marginBottom: 44,
      }}
    >
      {/* Botão topo */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <button
          onClick={onClose}
          style={{
            background: 'linear-gradient(135deg, rgba(167,139,250,0.18) 0%, rgba(167,139,250,0.08) 100%)',
            border: `2px solid ${COR_BORDA_H}`,
            borderRadius: 99,
            padding: '12px 36px',
            color: COR,
            fontSize: 14,
            fontWeight: 900,
            cursor: 'pointer',
            letterSpacing: '0.10em',
            animation: 'pulse-btn 2.2s ease-in-out infinite',
            boxShadow: '0 0 0 0 rgba(167,139,250,0.45)',
          }}
        >
          Ir para os Devocionais →
        </button>
      </div>

      {/* Título */}
      <div style={{ marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.80)', marginBottom: 12 }}>
          Introdução
        </div>
        <h2 style={{
          fontSize: 'clamp(18px,3vw,26px)', fontWeight: 900, color: '#fff', lineHeight: 1.25, margin: 0,
        }}>
          Por que ler confissões de fé durante um ano inteiro
          <span style={{ display: 'block', color: COR, marginTop: 6, fontSize: 'clamp(14px,2vw,18px)', fontWeight: 700 }}>
            — e por que isso importa na era digital
          </span>
        </h2>
      </div>

      {/* Corpo */}
      <div style={{ fontSize: 'clamp(15px,1.9vw,16px)', color: 'rgba(220,215,255,0.80)', lineHeight: 1.85 }}>
        <p>
          Vivemos numa época que desconfia de credos e, ao mesmo tempo, é moldada por algoritmos que formam nossas convicções sem que percebamos{sup('¹')}. Toda igreja — mesmo a que rejeita formalmente qualquer confissão escrita — opera com algum resumo implícito daquilo que crê; hoje, esse resumo é cada vez mais formado por feeds de redes sociais do que por catecismo deliberado{sup('²')}. A vantagem de uma confissão histórica é tornar esse resumo explícito, testado por séculos, e submetido à Escritura — funcionando, na era da informação fragmentada, como uma espécie de <em>"arquitetura mental"</em> estável em meio ao excesso de estímulos{sup('³')}.
        </p>

        {/* Bloco Westminster */}
        <div style={{
          margin: '28px 0',
          borderRadius: 16,
          background: 'rgba(167,139,250,0.06)',
          border: '1px solid rgba(167,139,250,0.18)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '10px 20px', background: 'rgba(167,139,250,0.08)', borderBottom: '1px solid rgba(167,139,250,0.12)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 16 }}>🏛️</span>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.85)' }}>O mundo que produziu a Confissão de Westminster</span>
          </div>
          <div style={{ padding: 'clamp(16px,3vw,24px)' }}>
            <p style={{ margin: 0, fontSize: 'clamp(14px,1.8vw,15px)', color: 'rgba(230,225,255,0.88)', lineHeight: 1.80 }}>
              Convocada pelo Parlamento Longo em 1643, em meio à Guerra Civil Inglesa, a Assembleia de Westminster reuniu cerca de 121 teólogos e comissários escoceses, produzindo entre 1643 e 1648 a Confissão de Fé, os Catecismos e o Diretório de Culto Público{sup('⁴')}.
            </p>
          </div>
        </div>

        {/* Bloco Batista */}
        <div style={{
          margin: '28px 0',
          borderRadius: 16,
          background: 'rgba(0,212,255,0.04)',
          border: '1px solid rgba(0,212,255,0.16)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '10px 20px', background: 'rgba(0,212,255,0.06)', borderBottom: '1px solid rgba(0,212,255,0.10)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 16 }}>📜</span>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(0,212,255,0.85)' }}>O mundo que produziu a Confissão Batista de Londres</span>
          </div>
          <div style={{ padding: 'clamp(16px,3vw,24px)' }}>
            <p style={{ margin: 0, fontSize: 'clamp(14px,1.8vw,15px)', color: 'rgba(230,225,255,0.88)', lineHeight: 1.80 }}>
              Sob perseguição legal decorrente do Ato de Uniformidade de 1662, os batistas particulares de Londres redigiram, em 1677, uma confissão publicada anonimamente, assinada publicamente apenas em 1689, após o Toleration Act{sup('⁵')}.
            </p>
          </div>
        </div>

        <p>
          Reinke observa que o smartphone não é neutro: ele forma hábitos de atenção, desejo e identidade com uma intensidade que nenhuma geração anterior enfrentou{sup('⁶')}. Dyer lembra que toda tecnologia <em>"carrega valores embutidos"</em> e nunca é mero instrumento passivo{sup('⁷')}. Se as confissões de Westminster e Londres foram escritas para formar consciência e prática num mundo de guerra e perseguição, cabe perguntar, a cada dia deste devocional: como esta mesma doutrina resiste — ou corrige — os hábitos digitais que hoje moldam silenciosamente nossa alma? Por isso, cada dia trará, além do texto confessional, da prova bíblica e da exposição, uma seção de <strong style={{ color: COR }}>Aplicação na era digital</strong>.
        </p>
      </div>

      {/* Notas */}
      <div style={{
        marginTop: 32,
        borderTop: '1px solid rgba(167,139,250,0.12)',
        paddingTop: 20,
      }}>
        <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.75)', marginBottom: 12 }}>
          🗒️ Notas
        </div>
        <ol style={{ margin: 0, padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {NOTAS_INTRO.map(n => (
            <li key={n.n} style={{ fontSize: 12, color: 'rgba(210,205,255,0.72)', lineHeight: 1.65 }}>
              {n.ref}
            </li>
          ))}
        </ol>
      </div>

      {/* Botão fechar / ir para devocionais */}
      <div style={{ marginTop: 28, textAlign: 'center' }}>
        <button
          onClick={onClose}
          style={{
            background: COR_BG,
            border: `1.5px solid ${COR_BORDA_H}`,
            borderRadius: 99,
            padding: '10px 28px',
            color: COR,
            fontSize: 13,
            fontWeight: 900,
            cursor: 'pointer',
            letterSpacing: '0.08em',
          }}
        >
          Ir para os Devocionais →
        </button>
      </div>
    </motion.div>
  );
}

const BADGE_CONF: Record<string, { label: string; cor: string }> = {
  'Batista 1689': { label: 'Batista 1689', cor: 'rgba(0,212,255,1)' },
  'Westminster':  { label: 'Westminster',  cor: 'rgba(167,139,250,1)' },
  'Ambas':        { label: 'Batista + Westminster', cor: 'rgba(251,191,36,1)' },
};

function DiaModal({ dia, onClose }: { dia: DiaConfessional; onClose: () => void }) {
  const badge = BADGE_CONF[dia.confissao];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(12px,3vw,32px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0b0d24',
          border: `1.5px solid ${COR_BORDA_H}`,
          borderRadius: 24,
          maxWidth: 640,
          width: '100%',
          maxHeight: '88vh',
          overflowY: 'auto',
          padding: 'clamp(24px,4vw,44px)',
          position: 'relative',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 18, right: 20,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 22, color: 'rgba(255,255,255,0.35)', lineHeight: 1,
          }}
        >✕</button>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: badge.cor, padding: '3px 12px', borderRadius: 99,
              background: 'rgba(255,255,255,0.05)', border: `1px solid ${badge.cor}40`,
            }}>{badge.label}</span>
            <span style={{ fontSize: 12, color: 'rgba(210,205,255,0.72)', fontWeight: 700 }}>
              Dia {dia.dia} · {dia.data}
            </span>
          </div>
          <div style={{ fontSize: 11, color: 'rgba(167,139,250,0.65)', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 8 }}>
            {dia.capitulo}
          </div>
          <h2 style={{ fontSize: 'clamp(20px,3vw,26px)', fontWeight: 900, color: '#fff', margin: '0 0 6px', lineHeight: 1.2 }}>
            {dia.tema}
          </h2>
          <div style={{ fontSize: 13, color: COR, fontWeight: 700, opacity: 0.80 }}>{dia.versiculo}</div>
        </div>

        {/* Conteúdo principal */}
        {dia.conteudoHtml ? (
          <div dangerouslySetInnerHTML={{ __html: dia.conteudoHtml }} />
        ) : (
          <>
            {/* Reflexão */}
            <section style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.80)', marginBottom: 10 }}>
                📖 Reflexão
              </div>
              <p style={{ fontSize: 'clamp(15px,2vw,16px)', color: 'rgba(220,215,255,0.82)', lineHeight: 1.80, margin: 0 }}>
                {dia.reflexao}
              </p>
            </section>

            {/* Aplicação */}
            <section style={{
              marginBottom: 20,
              background: COR_BG,
              border: `1px solid ${COR_BORDA}`,
              borderRadius: 14,
              padding: 'clamp(14px,2.5vw,20px)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: COR, marginBottom: 8 }}>
                ✅ Aplicação Prática
              </div>
              <p style={{ fontSize: 'clamp(14px,1.9vw,15px)', color: 'rgba(220,215,255,0.80)', lineHeight: 1.70, margin: 0 }}>
                {dia.aplicacao}
              </p>
            </section>

            {/* Oração */}
            <section style={{
              background: 'rgba(167,139,250,0.05)',
              border: '1px solid rgba(167,139,250,0.15)',
              borderRadius: 14,
              padding: 'clamp(14px,2.5vw,20px)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.80)', marginBottom: 8 }}>
                🙏 Oração
              </div>
              <p style={{ fontSize: 'clamp(14px,1.9vw,15px)', color: 'rgba(220,215,255,0.75)', lineHeight: 1.70, margin: 0, fontStyle: 'italic' }}>
                {dia.oracao}
              </p>
            </section>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function DevocionalConfessionalPage() {
  const navigate = useNavigate();
  const mesAtual = new Date().getMonth() + 1;
  const [mesSel, setMesSel] = useState(mesAtual);
  const [diaSel, setDiaSel] = useState<DiaConfessional | null>(null);
  const [diaExpandido, setDiaExpandido] = useState<DiaConfessional | null>(null);
  const [introFechada, setIntroFechada] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const expandidoRef = useRef<HTMLDivElement>(null);

  const diaHoje = diaDoAno();
  const devocionalHoje = DEVOCIONAL_CONFESSIONAL.find(d => d.dia === diaHoje) ?? null;

  const mesInfo = MESES_CONFESSIONAL.find(m => m.mes === mesSel)!;
  const dias = diasDoMes(mesSel);

  return (
    <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
      <Navbar />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(88px,11vw,108px) clamp(16px,4vw,32px) calc(80px + env(safe-area-inset-bottom))' }}>

        {/* Back */}
        <button
          onClick={() => navigate('/devocional')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(167,139,250,0.65)', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', marginBottom: 32, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          ← Devocionais
        </button>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(40px,7vw,64px)', marginBottom: 12, lineHeight: 1 }}>📜</div>
          <div style={{ fontSize: 'clamp(10px,1.4vw,12px)', fontWeight: 900, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.85)', marginBottom: 12 }}>
            Devocional Confessional na Era Digital
          </div>
          <h1 style={{
            fontSize: 'clamp(24px,4.5vw,42px)', fontWeight: 900, lineHeight: 1.12,
            margin: '0 0 14px',
            background: 'linear-gradient(135deg, #fff 0%, rgba(167,139,250,1) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            365 Dias de Confessionalidade Bíblica para sua vida
          </h1>
          <p style={{ fontSize: 'clamp(14px,1.9vw,16px)', color: 'rgba(210,205,255,0.78)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>
            Confissão Batista de 1689 e Confissão de Fé de Westminster — aplicadas ao cotidiano cristão.
          </p>
        </motion.div>

        {/* Introdução */}
        <AnimatePresence>
          {!introFechada && <Introducao onClose={() => setIntroFechada(true)} />}
        </AnimatePresence>

        {/* Seletor de Meses */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32, justifyContent: 'center',
        }}>
          {MESES_CONFESSIONAL.map(m => (
            <button
              key={m.mes}
              onClick={() => { setMesSel(m.mes); setDiaExpandido(null); }}
              style={{
                background: mesSel === m.mes
                  ? 'linear-gradient(135deg,rgba(167,139,250,0.22) 0%,rgba(167,139,250,0.10) 100%)'
                  : 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${mesSel === m.mes ? 'rgba(167,139,250,0.70)' : 'rgba(167,139,250,0.22)'}`,
                borderRadius: 99,
                padding: '7px 18px',
                fontSize: 13,
                fontWeight: 700,
                color: mesSel === m.mes ? '#d4baff' : '#a89ec8',
                cursor: 'pointer',
                transition: 'all 0.18s',
                letterSpacing: '0.05em',
                boxShadow: mesSel === m.mes ? '0 0 12px rgba(167,139,250,0.18)' : 'none',
              }}
            >
              {m.nome}
            </button>
          ))}
        </div>

        {/* Tema do Mês */}
        <motion.div
          key={mesSel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(167,139,250,0.07)',
            border: '1px solid rgba(167,139,250,0.30)',
            borderRadius: 16,
            padding: 'clamp(16px,3vw,28px)',
            marginBottom: 32,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#d4baff', marginBottom: 8 }}>
            Tema de {mesInfo.nome}
          </div>
          {'artigos' in mesInfo && (
            <div style={{
              display: 'inline-block',
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
              color: '#c0a8f8',
              background: 'rgba(167,139,250,0.14)',
              border: '1px solid rgba(167,139,250,0.35)',
              borderRadius: 99,
              padding: '4px 16px',
              marginBottom: 14,
            }}>
              {(mesInfo as any).artigos}
            </div>
          )}
          <div style={{ fontSize: 'clamp(14px,1.9vw,16px)', color: '#e8e4ff', fontWeight: 500, lineHeight: 1.72 }}>
            {mesInfo.temaGeral}
          </div>
        </motion.div>

        {/* Cards dos Dias */}
        {dias.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(200,200,255,0.35)' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🔜</div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Em breve — devocionais de {mesInfo.nome} serão adicionados</div>
          </div>
        ) : (
          <motion.div
            ref={gridRef}
            key={mesSel + '-dias'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: 16,
            }}
          >
            {dias.map((d, i) => {
              const badge = BADGE_CONF[d.confissao];
              const isJaneiro = mesSel >= 1 && mesSel <= 8;
              const isExpandido = diaExpandido?.dia === d.dia;
              return (
                <motion.div
                  key={d.dia}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => {
                    if (isJaneiro) {
                      setDiaExpandido(isExpandido ? null : d);
                      if (!isExpandido) {
                        setTimeout(() => expandidoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
                      }
                    } else {
                      setDiaSel(d);
                    }
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    cursor: 'pointer',
                    borderRadius: 18,
                    background: isExpandido ? 'rgba(167,139,250,0.12)' : COR_BG,
                    border: `1.5px solid ${isExpandido ? COR_BORDA_H : COR_BORDA}`,
                    padding: 'clamp(14px,3vw,24px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    transition: 'border-color 0.18s, background 0.18s',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#c0a8f8', letterSpacing: '0.06em' }}>
                      Dia {d.dia} · {d.data}
                    </span>
                    <span style={{
                      fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: badge.cor, padding: '2px 9px', borderRadius: 99,
                      background: 'rgba(255,255,255,0.06)', border: `1px solid ${badge.cor}60`,
                      flexShrink: 0, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{d.capitulo.split(' — ')[0]}</span>
                  </div>
                  <div style={{ fontSize: 'clamp(15px,2vw,17px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.28 }}>
                    {d.tema}
                  </div>
                  <div style={{ fontSize: 13, color: '#b8a4f0', fontWeight: 700 }}>
                    {d.versiculo}
                  </div>
                  <div style={{ fontSize: 14, color: '#cdc8e8', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {d.reflexao}
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: '#d4baff', letterSpacing: '0.06em' }}>
                      {isJaneiro ? (isExpandido ? '↑ Fechar' : 'Ler devocional ↓') : 'Ler devocional →'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Conteúdo expandido inline — apenas janeiro */}
        <AnimatePresence>
          {diaExpandido && mesSel >= 1 && mesSel <= 8 && (
            <motion.div
              ref={expandidoRef}
              key={'expandido-' + diaExpandido.dia}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              style={{
                marginTop: 40,
                borderRadius: 22,
                background: '#0b0d24',
                border: `1.5px solid ${COR_BORDA_H}`,
                padding: 'clamp(24px,4vw,44px)',
                position: 'relative',
              }}
            >
              {/* Botão voltar topo */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                <button
                  onClick={() => {
                    setDiaExpandido(null);
                    setTimeout(() => gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
                  }}
                  style={{
                    background: COR_BG, border: `1.5px solid ${COR_BORDA_H}`, borderRadius: 99,
                    padding: '8px 20px', color: COR, fontSize: 12, fontWeight: 900, cursor: 'pointer', letterSpacing: '0.06em',
                  }}
                >
                  ↑ Voltar aos dias
                </button>
                <span style={{ fontSize: 12, color: 'rgba(210,205,255,0.55)', fontWeight: 700 }}>
                  Dia {diaExpandido.dia} · {diaExpandido.data}
                </span>
              </div>

              {/* Header */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: BADGE_CONF[diaExpandido.confissao].cor, padding: '3px 12px', borderRadius: 99,
                    background: 'rgba(255,255,255,0.05)', border: `1px solid ${BADGE_CONF[diaExpandido.confissao].cor}40`,
                  }}>{diaExpandido.capitulo.split(' — ')[0]}</span>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(167,139,250,0.65)', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 8 }}>
                  {diaExpandido.capitulo}
                </div>
                <h2 style={{ fontSize: 'clamp(20px,3vw,26px)', fontWeight: 900, color: '#fff', margin: '0 0 6px', lineHeight: 1.2 }}>
                  {diaExpandido.tema}
                </h2>
                <div style={{ fontSize: 13, color: COR, fontWeight: 700, opacity: 0.80 }}>{diaExpandido.versiculo}</div>
              </div>

              {/* Conteúdo */}
              {diaExpandido.conteudoHtml ? (
                <div dangerouslySetInnerHTML={{ __html: diaExpandido.conteudoHtml }} />
              ) : (
                <>
                  <section style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.80)', marginBottom: 10 }}>📖 Reflexão</div>
                    <p style={{ fontSize: 'clamp(15px,2vw,16px)', color: 'rgba(220,215,255,0.82)', lineHeight: 1.80, margin: 0 }}>{diaExpandido.reflexao}</p>
                  </section>
                  <section style={{ marginBottom: 20, background: COR_BG, border: `1px solid ${COR_BORDA}`, borderRadius: 14, padding: 'clamp(14px,2.5vw,20px)' }}>
                    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: COR, marginBottom: 8 }}>✅ Aplicação</div>
                    <p style={{ fontSize: 'clamp(14px,1.9vw,15px)', color: 'rgba(220,215,255,0.80)', lineHeight: 1.70, margin: 0 }}>{diaExpandido.aplicacao}</p>
                  </section>
                  <section style={{ background: 'rgba(167,139,250,0.05)', border: `1px solid ${COR_BORDA}`, borderRadius: 14, padding: 'clamp(14px,2.5vw,20px)' }}>
                    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: COR, marginBottom: 8 }}>🙏 Oração</div>
                    <p style={{ fontSize: 'clamp(14px,1.9vw,15px)', color: 'rgba(220,215,255,0.82)', lineHeight: 1.75, margin: 0, fontStyle: 'italic' }}>{diaExpandido.oracao}</p>
                  </section>
                </>
              )}

              {/* Botão voltar rodapé */}
              <div style={{ marginTop: 32, textAlign: 'center' }}>
                <button
                  onClick={() => {
                    setDiaExpandido(null);
                    setTimeout(() => gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
                  }}
                  style={{
                    background: COR_BG, border: `1.5px solid ${COR_BORDA_H}`, borderRadius: 99,
                    padding: '10px 28px', color: COR, fontSize: 13, fontWeight: 900, cursor: 'pointer', letterSpacing: '0.08em',
                  }}
                >
                  ↑ Voltar aos dias
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Widget fixo — Devocional de Hoje (canto superior direito, apenas desktop) */}
      {devocionalHoje && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 28 }}
          className="widget-hoje"
          style={{
            position: 'fixed',
            top: 80,
            right: 24,
            width: 252,
            zIndex: 90,
            cursor: 'pointer',
            borderRadius: 18,
            background: 'linear-gradient(155deg, rgba(12,10,30,0.97) 0%, rgba(18,12,40,0.97) 100%)',
            border: '1.5px solid rgba(167,139,250,0.45)',
            padding: '16px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            boxShadow: '0 8px 40px rgba(0,0,0,0.55), 0 0 28px rgba(167,139,250,0.12)',
            backdropFilter: 'blur(16px)',
            transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.18s',
          }}
          onClick={() => setDiaSel(devocionalHoje)}
          onHoverStart={e => {
            const el = (e.target as HTMLElement).closest('.widget-hoje') as HTMLElement;
            if (el) {
              el.style.borderColor = 'rgba(167,139,250,0.75)';
              el.style.boxShadow = '0 8px 48px rgba(0,0,0,0.60), 0 0 40px rgba(167,139,250,0.20)';
              el.style.transform = 'translateY(-2px)';
            }
          }}
          onHoverEnd={e => {
            const el = (e.target as HTMLElement).closest('.widget-hoje') as HTMLElement;
            if (el) {
              el.style.borderColor = 'rgba(167,139,250,0.45)';
              el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.55), 0 0 28px rgba(167,139,250,0.12)';
              el.style.transform = 'translateY(0)';
            }
          }}
        >
          {/* Header: pulse + label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: 'rgba(167,139,250,1)',
              flexShrink: 0,
              animation: 'pulse-hoje 2s ease-in-out infinite',
            }} />
            <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.80)', flex: 1 }}>
              Devocional de Hoje
            </span>
            <span style={{
              fontSize: 8, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(167,139,250,0.70)',
              background: 'rgba(167,139,250,0.10)', border: '1px solid rgba(167,139,250,0.22)',
              padding: '2px 7px', borderRadius: 99,
            }}>
              {devocionalHoje.data}
            </span>
          </div>

          {/* Badge confissão */}
          <span style={{
            alignSelf: 'flex-start',
            fontSize: 8, fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: BADGE_CONF[devocionalHoje.confissao].cor,
            padding: '2px 9px', borderRadius: 99,
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${BADGE_CONF[devocionalHoje.confissao].cor}45`,
          }}>
            {BADGE_CONF[devocionalHoje.confissao].label} · {devocionalHoje.capitulo}
          </span>

          {/* Tema */}
          <div style={{ fontSize: 13, fontWeight: 900, lineHeight: 1.25, color: '#fff' }}>
            {devocionalHoje.tema}
          </div>

          {/* Versículo */}
          <div style={{ fontSize: 10, color: COR, fontWeight: 700, opacity: 0.88 }}>
            {devocionalHoje.versiculo}
          </div>

          {/* CTA */}
          <div style={{
            paddingTop: 10, borderTop: '1px solid rgba(167,139,250,0.16)',
            fontSize: 11, fontWeight: 900, color: COR, letterSpacing: '0.06em',
          }}>
            Abrir devocional →
          </div>
        </motion.div>
      )}

      <style>{`
        @keyframes pulse-hoje {
          0%, 100% { box-shadow: 0 0 0 3px rgba(167,139,250,0.28); }
          50% { box-shadow: 0 0 0 6px rgba(167,139,250,0.08); }
        }
        @keyframes pulse-btn {
          0%, 100% { box-shadow: 0 0 0 0 rgba(167,139,250,0.45), 0 4px 24px rgba(167,139,250,0.18); }
          50% { box-shadow: 0 0 0 10px rgba(167,139,250,0.00), 0 4px 32px rgba(167,139,250,0.32); }
        }
        @media (max-width: 900px) {
          .widget-hoje { display: none !important; }
        }
      `}</style>

      <AnimatePresence>
        {diaSel && <DiaModal dia={diaSel} onClose={() => setDiaSel(null)} />}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
