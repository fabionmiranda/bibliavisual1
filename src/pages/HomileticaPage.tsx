import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const COR = '#4ade80';

const AULAS = [
  {
    num: 1,
    titulo: 'Fundamentos da homilética',
    descricao: 'O que é homilética, sua história e seu lugar na teologia pastoral. A pregação como ato de Deus por meio do pregador.',
  },
  {
    num: 2,
    titulo: 'A interpretação do texto bíblico',
    descricao: 'Princípios de hermenêutica aplicados à pregação: exegese gramatical-histórica, contexto e intenção do autor.',
  },
  {
    num: 3,
    titulo: 'Requisitos para a pregação eficiente e a estrutura do sermão',
    descricao: 'O que é necessário no pregador e no sermão: caráter, preparo, clareza e organização lógica das ideias.',
  },
  {
    num: 4,
    titulo: 'Partes constitutivas: título e texto',
    descricao: 'Como escolher o texto e formular um título que seja fiel, claro e que capture o tema central da mensagem.',
  },
  {
    num: 5,
    titulo: 'Partes constitutivas: introdução, proposição e argumentação',
    descricao: 'A introdução que desperta a atenção, a proposição que declara a grande ideia e os argumentos que sustentam a mensagem.',
  },
  {
    num: 6,
    titulo: 'Partes constitutivas: transições, ilustrações, aplicação e conclusão',
    descricao: 'Como ligar as partes do sermão com transições eficazes, ilustrar com clareza e conduzir à aplicação prática e à conclusão.',
  },
  {
    num: 7,
    titulo: 'O sermão temático e o sermão textual',
    descricao: 'Diferenças e usos dos dois estilos: o sermão que parte de um tema e o que expõe um texto específico das Escrituras.',
  },
  {
    num: 8,
    titulo: 'O sermão expositivo — parte 1',
    descricao: 'Fundamentos do sermão expositivo: definição, vantagens e a responsabilidade de expor fielmente o sentido do texto.',
  },
  {
    num: 9,
    titulo: 'O sermão expositivo — parte 2',
    descricao: 'Desenvolvimento prático do sermão expositivo: da exegese ao esboço, dos pontos principais à aplicação congregacional.',
  },
  {
    num: 10,
    titulo: 'A centralidade de Cristo na pregação',
    descricao: 'Como toda a Escritura aponta para Cristo e como o pregador deve conduzir cada mensagem à pessoa e obra do Salvador.',
  },
  {
    num: 11,
    titulo: 'Técnicas de comunicação — parte 1',
    descricao: 'Voz, postura, contato visual, linguagem corporal e a arte de comunicar com clareza e convicção no púlpito.',
  },
  {
    num: 12,
    titulo: 'Técnicas de comunicação — parte 2',
    descricao: 'Dicção, ritmo, pausas, emoção e uso de recursos visuais — comunicação que serve a mensagem sem substituí-la.',
  },
];

export default function HomileticaPage() {
  return (
    <div className="min-h-screen" style={{ background: '#060d1f', color: 'rgba(255,255,255,0.92)' }}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(88px,11vw,108px) clamp(16px,4vw,36px) 100px' }}>

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 mb-10 text-[11px] font-black uppercase tracking-widest"
          style={{ color: 'rgba(255,255,255,0.30)' }}
        >
          <Link to="/teologia" style={{ color: 'inherit' }} className="hover:text-white transition-colors">Teologia</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/teologia/area/pastoral" style={{ color: 'inherit' }} className="hover:text-white transition-colors">Pastoral-Prática</Link>
          <ChevronRight className="w-3 h-3" />
          <span style={{ color: COR }}>Homilética</span>
        </motion.div>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 52 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '6px 16px', borderRadius: 99,
            background: `${COR}15`, border: `1px solid ${COR}35`,
            marginBottom: 20,
          }}>
            <span style={{ fontSize: 18 }}>🎙️</span>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: COR }}>
              Curso · Teologia Pastoral-Prática
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(28px,5vw,50px)', fontWeight: 900, lineHeight: 1.1,
            margin: '0 0 16px', color: '#ffffff',
          }}>
            Homilética<br />
            <span style={{ color: COR }}>A Arte de Pregar</span>
          </h1>

          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(200,218,255,0.65)', lineHeight: 1.75, maxWidth: 640, margin: 0 }}>
            A arte e ciência da pregação expositiva e cristocêntrica — do texto bíblico ao púlpito,
            da exegese à aplicação, da estrutura do sermão às técnicas de comunicação.
          </p>
        </motion.div>

        {/* Divisor */}
        <div style={{ height: 1, background: `linear-gradient(90deg,${COR}40,transparent)`, marginBottom: 48 }} />

        {/* Aulas */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)', marginBottom: 28 }}>
            Aulas do Curso — {AULAS.length} aulas
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {AULAS.map((aula, i) => (
              <motion.div
                key={aula.num}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'clamp(40px,6vw,56px) 1fr auto',
                    alignItems: 'center',
                    gap: 'clamp(12px,2.5vw,20px)',
                    padding: 'clamp(18px,2.5vw,24px)',
                    borderRadius: 16,
                    background: `${COR}08`,
                    border: `1px solid ${COR}22`,
                    transition: 'all 0.20s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = `${COR}14`;
                    el.style.border = `1px solid ${COR}50`;
                    el.style.transform = 'translateX(4px)';
                    el.style.boxShadow = `0 8px 32px ${COR}15`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = `${COR}08`;
                    el.style.border = `1px solid ${COR}22`;
                    el.style.transform = 'translateX(0)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  {/* Número */}
                  <div style={{
                    width: '100%', aspectRatio: '1',
                    borderRadius: 12,
                    background: `${COR}18`, border: `1.5px solid ${COR}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 'clamp(14px,2.2vw,18px)', fontWeight: 900, color: COR,
                    flexShrink: 0,
                  }}>
                    {aula.num}
                  </div>

                  {/* Título + descrição */}
                  <div>
                    <div style={{ fontSize: 'clamp(13px,1.8vw,16px)', fontWeight: 900, color: '#ffffff', lineHeight: 1.3, marginBottom: 6 }}>
                      {aula.titulo}
                    </div>
                    <p style={{ margin: 0, fontSize: 'clamp(12px,1.5vw,13px)', color: 'rgba(200,218,255,0.55)', lineHeight: 1.6 }}>
                      {aula.descricao}
                    </p>
                  </div>

                  {/* Badge em breve */}
                  <div style={{
                    flexShrink: 0,
                    display: 'flex', alignItems: 'center', gap: 5,
                    padding: '5px 10px', borderRadius: 8,
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)',
                    fontSize: 9, fontWeight: 900, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)',
                    whiteSpace: 'nowrap',
                  }}>
                    <Clock size={11} />
                    Em breve
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
