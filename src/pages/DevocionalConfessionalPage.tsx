import { useState } from 'react';
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
  const [introFechada, setIntroFechada] = useState(false);

  const diaHoje = diaDoAno();
  const devocionalHoje = DEVOCIONAL_CONFESSIONAL.find(d => d.dia === diaHoje) ?? null;

  const mesInfo = MESES_CONFESSIONAL.find(m => m.mes === mesSel)!;
  const dias = diasDoMes(mesSel);

  return (
    <div style={{ minHeight: '100vh', background: BG, color: 'rgba(255,255,255,0.92)' }}>
      <Navbar />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(88px,11vw,108px) clamp(16px,4vw,32px) 100px' }}>

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
            365 Dias de Teologia Histórica
          </h1>
          <p style={{ fontSize: 'clamp(14px,1.9vw,16px)', color: 'rgba(210,205,255,0.78)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>
            Confissão Batista de 1689 e Confissão de Fé de Westminster — aplicadas ao cotidiano cristão.
          </p>
        </motion.div>

        {/* Devocional do Dia */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.75)', marginBottom: 14, textAlign: 'center' }}>
            📅 Devocional de Hoje · {dataFormatada()}
          </div>

          {devocionalHoje ? (
            <div
              onClick={() => setDiaSel(devocionalHoje)}
              style={{
                cursor: 'pointer',
                borderRadius: 22,
                background: 'linear-gradient(135deg, rgba(167,139,250,0.12) 0%, rgba(0,212,255,0.06) 100%)',
                border: '1.5px solid rgba(167,139,250,0.45)',
                padding: 'clamp(22px,4vw,36px)',
                display: 'flex', flexDirection: 'column', gap: 14,
                boxShadow: '0 0 40px rgba(167,139,250,0.10)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            >
              {/* Badge + dia */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 9, fontWeight: 900, letterSpacing: '0.20em', textTransform: 'uppercase',
                  color: BADGE_CONF[devocionalHoje.confissao].cor,
                  padding: '3px 12px', borderRadius: 99,
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${BADGE_CONF[devocionalHoje.confissao].cor}50`,
                }}>
                  {BADGE_CONF[devocionalHoje.confissao].label}
                </span>
                <span style={{ fontSize: 12, color: 'rgba(210,205,255,0.72)', fontWeight: 700 }}>
                  Dia {devocionalHoje.dia} · {devocionalHoje.data}
                </span>
                <span style={{
                  marginLeft: 'auto', fontSize: 9, fontWeight: 900, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: 'rgba(167,139,250,0.80)',
                  background: 'rgba(167,139,250,0.10)', border: '1px solid rgba(167,139,250,0.25)',
                  padding: '3px 10px', borderRadius: 99,
                }}>
                  ✦ Hoje
                </span>
              </div>

              {/* Capítulo */}
              <div style={{ fontSize: 11, color: 'rgba(167,139,250,0.75)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {devocionalHoje.capitulo}
              </div>

              {/* Tema */}
              <h2 style={{
                fontSize: 'clamp(20px,3.5vw,30px)', fontWeight: 900, lineHeight: 1.18, margin: 0,
                background: 'linear-gradient(120deg, #fff 0%, rgba(167,139,250,1) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {devocionalHoje.tema}
              </h2>

              {/* Versículo */}
              <div style={{ fontSize: 14, color: COR, fontWeight: 700 }}>
                {devocionalHoje.versiculo}
              </div>

              {/* Prévia */}
              <p style={{
                fontSize: 'clamp(14px,1.8vw,15px)', color: 'rgba(230,225,255,0.82)', lineHeight: 1.75, margin: 0,
                display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {devocionalHoje.reflexao}
              </p>

              {/* CTA */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 900, color: COR, letterSpacing: '0.06em' }}>
                  Abrir devocional de hoje →
                </span>
              </div>
            </div>
          ) : (
            <div style={{
              borderRadius: 22,
              background: 'rgba(167,139,250,0.04)',
              border: '1.5px solid rgba(167,139,250,0.18)',
              padding: 'clamp(20px,4vw,32px)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔜</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'rgba(210,205,255,0.78)' }}>
                O devocional do dia {diaHoje} ainda será publicado
              </div>
              <div style={{ fontSize: 13, color: 'rgba(210,205,255,0.55)', marginTop: 6 }}>
                Explore os dias já disponíveis abaixo
              </div>
            </div>
          )}
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
              onClick={() => setMesSel(m.mes)}
              style={{
                background: mesSel === m.mes ? COR_BG : 'transparent',
                border: `1.5px solid ${mesSel === m.mes ? COR_BORDA_H : 'rgba(167,139,250,0.15)'}`,
                borderRadius: 99,
                padding: '6px 16px',
                fontSize: 12,
                fontWeight: 700,
                color: mesSel === m.mes ? COR : 'rgba(200,200,255,0.45)',
                cursor: 'pointer',
                transition: 'all 0.18s',
                letterSpacing: '0.04em',
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
            background: COR_BG,
            border: `1px solid ${COR_BORDA}`,
            borderRadius: 16,
            padding: 'clamp(16px,3vw,24px)',
            marginBottom: 32,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.80)', marginBottom: 6 }}>
            Tema de {mesInfo.nome}
          </div>
          <div style={{ fontSize: 'clamp(14px,1.9vw,16px)', color: 'rgba(220,215,255,0.80)', fontWeight: 600 }}>
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
              return (
                <motion.div
                  key={d.dia}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setDiaSel(d)}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    cursor: 'pointer',
                    borderRadius: 18,
                    background: COR_BG,
                    border: `1.5px solid ${COR_BORDA}`,
                    padding: 'clamp(16px,3vw,24px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    transition: 'border-color 0.18s',
                  }}
                  onHoverStart={() => {}}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 900, color: 'rgba(167,139,250,0.80)', letterSpacing: '0.08em' }}>
                      Dia {d.dia} · {d.data}
                    </span>
                    <span style={{
                      fontSize: 9, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: badge.cor, padding: '2px 8px', borderRadius: 99,
                      background: 'rgba(255,255,255,0.04)', border: `1px solid ${badge.cor}40`,
                      flexShrink: 0,
                    }}>{badge.label}</span>
                  </div>
                  <div style={{ fontSize: 'clamp(14px,1.9vw,16px)', fontWeight: 800, color: '#fff', lineHeight: 1.25 }}>
                    {d.tema}
                  </div>
                  <div style={{ fontSize: 12, color: COR, fontWeight: 700, opacity: 0.75 }}>
                    {d.versiculo}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(220,215,255,0.78)', lineHeight: 1.60, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {d.reflexao}
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 900, color: COR, letterSpacing: '0.06em' }}>
                      Ler devocional →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {diaSel && <DiaModal dia={diaSel} onClose={() => setDiaSel(null)} />}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
