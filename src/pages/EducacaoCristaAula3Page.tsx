import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Play, ArrowLeft, ArrowRight, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { downloadTxt } from '../utils/downloadAula';

const COR = '#fb923c';

const TOPICOS_AULA = [
  'A Educação Noutética — O que é e de onde vem',
  'Consciência do pecado — Jesus e Zaqueu; Jesus e a mulher surpreendida em adultério',
  'Confronto do pecado — Jesus e os líderes religiosos; o sábado e a misericórdia',
  'Implicações práticas para o educador cristão contemporâneo',
];

const SECOES_INTRO = [
  {
    titulo: 'O que é Educação Noutética?',
    texto: 'O termo "noutético" deriva do grego nouthetéo (νουθετέω), que significa advertir, exortar, corrigir com instrução intencional. A educação noutética, sistematizada na tradição reformada pelo conselheiro Jay Adams, parte do princípio de que a Escritura é suficiente para confrontar o pecado e orientar a transformação de vida. Jesus é o supremo modelo desse tipo de educação: ele conhecia o coração humano (Jo 2.25) e respondia às pessoas de acordo com a condição espiritual de cada uma.',
  },
  {
    titulo: 'Duas Dimensões do Ensino de Jesus',
    texto: 'Nesta aula estudaremos duas formas complementares pelas quais Jesus educar noutéticamente. A primeira desperta no pecador a consciência de sua própria realidade — mostrando que há esperança, que há identidade além do pecado. A segunda confronta o pecador diretamente com o erro, especialmente quando a hipocrisia religiosa ameaça destruir pessoas vulneráveis. Juntas, essas dimensões revelam um educador que ama com graça e com verdade (Jo 1.17).',
  },
];

const BLOCOS_PRINCIPAIS = [
  {
    num: 1,
    icon: '🕊️',
    titulo: 'Consciência do Pecado',
    subtitulo: 'Jesus desperta a consciência sem condenar a pessoa',
    versos: 'Lc 19.1–10; Jo 8.3–11; Jo 1.17',
    paragrafos: [
      'Jesus respondia diferentemente a pessoas diferentes. A alguns, era gentil e complacente; a outros, duro e juiz. O que motivava essa distinção? O encontro com Zaqueu (Lc 19.1–10) é revelador: enquanto a multidão o via como "pecador", Jesus o viu como "filho de Abraão" (v. 9). A afirmação pública de Jesus foi uma força pedagógica poderosa — Zaqueu respondeu com arrependimento real, tão profundo que "mesmo a sua carteira foi afetada": prometeu devolver quatro vezes o que havia roubado.',
      'A perícope da mulher apanhada em adultério (Jo 8.3–11), embora debatida textualmente, revela o mesmo padrão. Os líderes religiosos usavam a mulher como instrumento político para armar uma armadilha para Jesus. Ele se abaixou, escreveu no chão — e virou a acusação contra os acusadores: "Aquele que não tiver pecado, atire a primeira pedra." Ao ficar só com a mulher, Jesus lhe ofereceu perdão e um novo caminho: "Vai, e não peques mais." Sem condenação, mas com confronto redentor.',
      'Jesus não parecia ofendido com os pecadores. Tanto Zaqueu quanto a mulher estavam dolorosamente cientes de sua pecaminosidade. Jesus ofereceu-lhes perdão no meio da dor — enquanto os líderes religiosos pediam condenação, ele oferecia redenção, mediante uma consciência que levaria ao arrependimento genuíno. A lei veio por Moisés; a graça e a verdade vieram por Jesus Cristo (Jo 1.17).',
    ],
    referencias: [
      'DOWNS, Perry G. Ensinando para o crescimento espiritual. São Paulo: Shedd Publicações, 2007.',
      'ADAMS, Jay E. Aconselhamento Noutético. São Paulo: Cultura Cristã, 2001.',
      'TASKER, R. V. G. O Evangelho segundo São João. Grand Rapids: Eerdmans, 1960.',
      'CARSON, D. A. O Evangelho segundo João. Grand Rapids: Eerdmans, 1991.',
    ],
  },
  {
    num: 2,
    icon: '⚖️',
    titulo: 'Confronto do Pecado',
    subtitulo: 'Jesus confronta a hipocrisia religiosa com coragem profética',
    versos: 'Jo 4.1–26; Mc 2.1–3.6; Mt 11.19; Mt 23',
    paragrafos: [
      'Jesus era "amigo de pecadores" (Mt 11.19): coletores de impostos e prostitutas vinham a ele livremente. Mas com os líderes religiosos, o conflito era constante. O evangelho de Marcos registra a degeneração progressiva desse relacionamento. Marcos 2.1–12 narra a cura do paralítico: todos se alegraram exceto os mestres da lei, para quem as tradições eram mais importantes do que o sofrimento humano — e mais importantes do que os próprios milagres.',
      'O ponto máximo do confronto está nos episódios do sábado. Em Marcos 3.1–6, Jesus trouxe o homem da mão ressequida diante da congregação e perguntou: "É lícito nos sábados fazer o bem ou fazer o mal? Salvar a vida ou tirá-la?" (v. 4). Era um confronto de valores, não de tradições. Marcos registra que Jesus "olhou para eles indignado e condoído com a dureza dos seus corações" (v. 5). Após a cura, os fariseus saíram para tramar como o matariam.',
      'As palavras mais duras de Jesus estão em Mateus 23, dirigidas aos líderes religiosos. Ele não rejeitou sua autoridade representativa da Lei (vv. 2–3), mas condenou seu estilo de vida: estavam mais preocupados em manter tradições do que em ministrar a pessoas em sofrimento. Jesus ensinava com autoridade porque amava com consistência — ele mesmo comia com os excluídos, se deixava ver com eles. A educação cristã autêntica é um refúgio para os surrados pela religiosidade opressora, não mais um peso sobre eles.',
    ],
    referencias: [
      'DOWNS, Perry G. Ensinando para o crescimento espiritual. São Paulo: Shedd Publicações, 2007.',
      'ADAMS, Jay E. A Competência para Aconselhar. São Paulo: Fiel, 1977.',
      'PRICE, J. M. A Pedagogia de Jesus. Rio de Janeiro: JUERP, 1986.',
      'PAZMIÑO, Robert W. Elementos Básicos do Ensino para Cristãos. São Paulo: Cultura Cristã, 2006.',
    ],
  },
  {
    num: 3,
    icon: '🎓',
    titulo: 'Implicações Práticas',
    subtitulo: 'O que a educação noutética exige do educador cristão hoje',
    versos: 'Mt 23.2–3; 1 Ts 5.14; Cl 1.28; 2 Tm 3.16–17',
    paragrafos: [
      'Paulo sintetiza a tarefa do educador cristão em Colossenses 1.28: "A ele proclamamos, advertindo (nouthetountes) a todo homem e ensinando a todo homem em toda a sabedoria, para que apresentemos todo homem perfeito em Cristo." A advertência noutética não é opcional — é parte da proclamação cristã. Ela pressupõe que o educador conhece o aluno, conhece a Escritura e tem coragem de amar com verdade.',
      'Em 1 Tessalonicenses 5.14, Paulo instrui: "Admoestai (nouthetéite) os indisciplinados, animai os pusilânimes, dai apoio aos fracos, sede pacientes para com todos." A educação noutética não é uma abordagem única: ela se adapta à condição do aluno. Ao indisciplinado: confronto. Ao tímido: encorajamento. Ao fraco: suporte. Essa sabedoria pedagógica é o reflexo direto do modo como Jesus respondia diferentemente a pessoas diferentes.',
      'Nós, educadores cristãos contemporâneos, nunca devemos rejeitar as pessoas por serem pecadoras. Antes, devemos aprender a amá-las como Jesus o fez. Os programas educacionais da igreja devem ser um refúgio para quem foi surrado pelos estabelecimentos religiosos. A educação que é verdadeiramente cristã traz perdão e redenção — não condenação e lei. Amar pecadores e relacionar-se com eles pode ser arriscado, mas ser obediente a Cristo e viver a retidão requer amar o próximo como a si mesmo.',
    ],
    referencias: [
      'ADAMS, Jay E. Aconselhamento Noutético. São Paulo: Cultura Cristã, 2001.',
      'DOWNS, Perry G. Ensinando para o crescimento espiritual. São Paulo: Shedd Publicações, 2007.',
      'GANGEL, Kenneth O.; HENDRICKS, Howard G. The Christian Educator\'s Handbook on Teaching. Wheaton: Victor Books, 1988.',
      'LEBAR, Lois E. Education That Is Christian. Colorado Springs: Chariot Victor, 1995.',
    ],
  },
];

const REFERENCIAS = [
  {
    autor: 'DOWNS, Perry G.',
    titulo: 'Ensinando para o crescimento espiritual',
    local: 'São Paulo: Shedd Publicações, 2007',
    resumo: 'Fonte principal desta aula — análise bíblica e teológica do ensino de Jesus, com ênfase nos padrões noutéticos de consciência e confronto.',
  },
  {
    autor: 'ADAMS, Jay E.',
    titulo: 'Aconselhamento Noutético',
    local: 'São Paulo: Cultura Cristã, 2001',
    resumo: 'Obra fundante do movimento noutético reformado, que propõe a suficiência das Escrituras como base para toda educação e aconselhamento cristão.',
  },
  {
    autor: 'ADAMS, Jay E.',
    titulo: 'A Competência para Aconselhar',
    local: 'São Paulo: Fiel, 1977',
    resumo: 'Introdução prática ao método noutético: como confrontar o pecado com compaixão, usando a Palavra como instrumento de transformação.',
  },
  {
    autor: 'PRICE, J. M.',
    titulo: 'A Pedagogia de Jesus',
    local: 'Rio de Janeiro: JUERP, 1986',
    resumo: 'Clássico sobre os métodos de ensino de Jesus — narrativa, diálogo, parábola e relação pessoal — aplicados à prática docente cristã.',
  },
  {
    autor: 'PAZMIÑO, Robert W.',
    titulo: 'Elementos Básicos do Ensino para Cristãos',
    local: 'São Paulo: Cultura Cristã, 2006',
    resumo: 'Fundamentos teológicos e pedagógicos do ensino cristão: currículo, métodos, contexto e avaliação à luz da Escritura.',
  },
  {
    autor: 'GANGEL, Kenneth O.; HENDRICKS, Howard G.',
    titulo: 'The Christian Educator\'s Handbook on Teaching',
    local: 'Wheaton: Victor Books, 1988',
    resumo: 'Manual abrangente para educadores cristãos: teoria do aprendizado, métodos de ensino e planejamento curricular.',
  },
  {
    autor: 'LEBAR, Lois E.',
    titulo: 'Education That Is Christian',
    local: 'Colorado Springs: Chariot Victor, 1995',
    resumo: 'Propõe uma filosofia de educação cristã centrada em Cristo como conteúdo e método, integrando fé e aprendizado de forma holística.',
  },
  {
    autor: 'TASKER, R. V. G.',
    titulo: 'O Evangelho segundo São João',
    local: 'Grand Rapids: Eerdmans, 1960',
    resumo: 'Comentário exegético do Evangelho de João, referência para a perícope da mulher apanhada em adultério (Jo 8.3–11).',
  },
  {
    autor: 'CARSON, D. A.',
    titulo: 'O Evangelho segundo João',
    local: 'Grand Rapids: Eerdmans, 1991',
    resumo: 'Comentário exegético e teológico aprofundado do Evangelho de João, incluindo discussão textual sobre Jo 8.1–11.',
  },
];

function gerarTxtAula3(): string {
  const sep = '='.repeat(80);
  const sep2 = '-'.repeat(80);
  let txt = `${sep}\n  AULA 3 — EDUCAÇÃO NOUTÉTICA: CONSCIÊNCIA E CONFRONTO DO PECADO\n  Curso: Didática Cristã — Educação Cristã para Igrejas\n${sep}\n\n`;

  txt += `TÓPICOS DESTA AULA\n${sep2}\n`;
  TOPICOS_AULA.forEach((t, i) => { txt += `  ${i + 1}. ${t}\n`; });

  txt += `\n${sep}\nINTRODUÇÃO\n${sep}\n\n`;
  SECOES_INTRO.forEach(s => {
    txt += `${s.titulo.toUpperCase()}\n${'-'.repeat(s.titulo.length)}\n${s.texto}\n\n`;
  });

  txt += `${sep}\nCONTEÚDO DA AULA\n${sep}\n\n`;
  BLOCOS_PRINCIPAIS.forEach(bloco => {
    txt += `TÓPICO ${bloco.num} — ${bloco.titulo.toUpperCase()}\n${bloco.subtitulo}\nReferências bíblicas: ${bloco.versos}\n${sep2}\n\n`;
    bloco.paragrafos.forEach(p => { txt += `${p}\n\n`; });
    txt += `Referências:\n`;
    bloco.referencias.forEach(r => { txt += `  ${r}\n`; });
    txt += `\n${sep}\n\n`;
  });

  txt += `REFERÊNCIAS GERAIS DESTA AULA\n${sep2}\n`;
  REFERENCIAS.forEach((ref, i) => {
    txt += `${i + 1}. ${ref.autor}. ${ref.titulo}. ${ref.local}.\n   ${ref.resumo}\n\n`;
  });
  txt += sep;
  return txt;
}

export default function EducacaoCristaAula3Page() {
  return (
    <div className="min-h-screen" style={{ background: '#060d1f', color: 'rgba(255,255,255,0.92)' }}>
      <Navbar />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(88px,11vw,108px) clamp(16px,4vw,36px) 100px' }}>

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 mb-10 text-[11px] font-black uppercase tracking-widest flex-wrap"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          <Link to="/teologia" style={{ color: 'inherit' }} className="hover:text-white transition-colors">Teologia</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/teologia/area/pastoral" style={{ color: 'inherit' }} className="hover:text-white transition-colors">Pastoral-Prática</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/teologia/pastoral/educacao-crista" style={{ color: 'inherit' }} className="hover:text-white transition-colors">Educação Cristã</Link>
          <ChevronRight className="w-3 h-3" />
          <span style={{ color: COR }}>Aula 3</span>
        </motion.div>

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 20 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '6px 16px', borderRadius: 99,
            background: `${COR}15`, border: `1px solid ${COR}35`,
          }}>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: COR }}>
              Aula 3 · Educação Cristã para Igrejas
            </span>
          </div>
        </motion.div>

        {/* Botão Download */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => downloadTxt('aula3-educacao-noutetica.txt', gerarTxtAula3())}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '8px 18px', borderRadius: 10,
              background: `${COR}12`, border: `1px solid ${COR}35`,
              color: COR, fontSize: 11, fontWeight: 900,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.18s',
            }}
            onMouseOver={e => (e.currentTarget.style.background = `${COR}22`)}
            onMouseOut={e => (e.currentTarget.style.background = `${COR}12`)}
          >
            <Download className="w-3.5 h-3.5" />
            Baixar Aula (.txt)
          </button>
        </motion.div>

        {/* Título */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.05 } }} style={{ marginBottom: 12 }}>
          <h1 style={{ fontSize: 'clamp(26px,5vw,44px)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 10px', color: '#fff' }}>
            Didática Cristã
          </h1>
          <h2 style={{ fontSize: 'clamp(15px,2vw,20px)', fontWeight: 400, color: `${COR}cc`, margin: 0, fontStyle: 'italic' }}>
            Educação Noutética — Consciência e Confronto do Pecado
          </h2>
        </motion.div>

        {/* Divisor */}
        <div style={{ height: 1, background: `linear-gradient(90deg,${COR}40,transparent)`, margin: '32px 0 40px' }} />

        {/* Índice */}
        <div style={{
          padding: 'clamp(16px,3.5vw,24px) clamp(14px,3.5vw,28px)', borderRadius: 16,
          background: `${COR}08`, border: `1px solid ${COR}20`,
          marginBottom: 44,
        }}>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: COR, marginBottom: 16 }}>
            Tópicos desta Aula
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {TOPICOS_AULA.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{
                  minWidth: 22, height: 22, borderRadius: 6, flexShrink: 0,
                  background: `${COR}20`, border: `1px solid ${COR}35`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 900, color: COR,
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(230,242,255,0.92)', lineHeight: 1.55 }}>
                  {t}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Introdução */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 24 }}>
            Introdução
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {SECOES_INTRO.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                style={{
                  padding: 'clamp(18px,4vw,26px) clamp(16px,4vw,28px)', borderRadius: 16,
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderLeft: `3px solid ${COR}50`,
                }}
              >
                <h3 style={{ margin: '0 0 12px', fontSize: 'clamp(17px,2.4vw,20px)', fontWeight: 900, color: '#fff' }}>
                  {s.titulo}
                </h3>
                <p style={{ margin: 0, fontSize: 'clamp(16px,2.2vw,18px)', color: 'rgba(230,242,255,0.90)', lineHeight: 1.85 }}>
                  {s.texto}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Blocos principais */}
        <div style={{ marginBottom: 56 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32,
            paddingBottom: 14, borderBottom: `1px solid ${COR}25`,
          }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: COR, marginBottom: 4 }}>
                Conteúdo da Aula
              </div>
              <h2 style={{ margin: 0, fontSize: 'clamp(20px,3.5vw,28px)', fontWeight: 900, color: '#fff' }}>
                Jesus como Mestre Noutético
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {BLOCOS_PRINCIPAIS.map((bloco, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                style={{
                  borderRadius: 18,
                  border: '1px solid rgba(255,255,255,0.10)',
                  overflow: 'hidden',
                }}
              >
                {/* Cabeçalho */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: 'clamp(16px,3vw,22px) clamp(16px,4vw,28px)',
                  background: `${COR}0C`,
                  borderBottom: `1px solid ${COR}20`,
                }}>
                  <span style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: `${COR}20`, border: `1px solid ${COR}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20,
                  }}>
                    {bloco.icon}
                  </span>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 900, color: `${COR}99`, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 3 }}>
                      Tópico {bloco.num} · {bloco.titulo}
                    </div>
                    <h3 style={{ margin: 0, fontSize: 'clamp(16px,2.5vw,20px)', fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>
                      {bloco.subtitulo}
                    </h3>
                  </div>
                </div>

                {/* Corpo */}
                <div style={{ padding: 'clamp(20px,4vw,28px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* Versículos */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
                    fontSize: 11, fontWeight: 900, color: `${COR}AA`,
                    background: `${COR}10`, border: `1px solid ${COR}28`,
                    borderRadius: 6, padding: '4px 12px', letterSpacing: '0.06em',
                  }}>
                    📖 {bloco.versos}
                  </div>

                  {/* Parágrafos */}
                  {bloco.paragrafos.map((p, j) => (
                    <p key={j} style={{ margin: 0, fontSize: 'clamp(16px,2.2vw,18px)', color: 'rgba(230,242,255,0.90)', lineHeight: 1.90 }}>
                      {p}
                    </p>
                  ))}

                  {/* Referências ABNT */}
                  <div style={{
                    marginTop: 4, padding: 'clamp(14px,3vw,18px)',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.22em', textTransform: 'uppercase', color: `${COR}90`, marginBottom: 10 }}>
                      Referências
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {bloco.referencias.map((r, k) => (
                        <p key={k} style={{ margin: 0, fontSize: 14, color: 'rgba(220,235,255,0.70)', lineHeight: 1.65, fontStyle: 'italic' }}>
                          {r}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Referências gerais */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, paddingBottom: 12, borderBottom: `1px solid ${COR}20` }}>
            <BookOpen className="w-4 h-4" style={{ color: COR }} />
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
              Referências desta Aula — {REFERENCIAS.length} obras
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {REFERENCIAS.map((ref, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                style={{
                  display: 'flex', alignItems: 'baseline', gap: 12,
                  padding: 'clamp(12px,2.5vw,16px) clamp(12px,2.5vw,18px)', borderRadius: 12,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 900, color: `${COR}80`, minWidth: 18, flexShrink: 0, paddingTop: 1 }}>
                  {i + 1}.
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <p style={{ margin: 0, fontSize: 'clamp(15px,2vw,16px)', color: 'rgba(230,242,255,0.92)', lineHeight: 1.65 }}>
                    <span style={{ fontWeight: 900, color: 'rgba(255,255,255,0.95)' }}>{ref.autor}</span>{' '}
                    <span style={{ fontStyle: 'italic' }}>{ref.titulo}.</span>{' '}
                    {ref.local}.
                  </p>
                  <p style={{ margin: 0, fontSize: 14, color: 'rgba(220,235,255,0.65)', lineHeight: 1.6, fontStyle: 'italic' }}>
                    {ref.resumo}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Player YouTube */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ height: 1, background: `linear-gradient(90deg,${COR}40,transparent)`, marginBottom: 40 }} />
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>
            Vídeo da Aula
          </div>
          <div style={{
            borderRadius: 20, overflow: 'hidden',
            border: `1px solid ${COR}25`, background: '#000',
            boxShadow: `0 0 60px ${COR}12`,
            position: 'relative', paddingTop: '56.25%',
          }}>
            <iframe
              src="https://www.youtube.com/embed?listType=search&list=educa%C3%A7%C3%A3o+nout%C3%A9tica+jesus+pecado+consci%C3%AAncia+confronto"
              title="Aula 3 – Didática Cristã: Educação Noutética"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            />
          </div>
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
            <a
              href="https://www.youtube.com/results?search_query=educacao+noutetica+jesus+consciencia+confronto+pecado"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: `${COR}70`, textDecoration: 'none' }}
            >
              <Play className="w-3 h-3" />
              Buscar vídeos no YouTube
            </a>
          </div>
        </div>

        {/* Navegação */}
        <div style={{
          paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        }}>
          <Link
            to="/teologia/pastoral/educacao-crista/aula-2"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 12, fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '0.2em', color: 'rgba(220,235,255,0.50)',
              textDecoration: 'none',
            }}
            className="hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Aula 2
          </Link>

          <Link
            to="/teologia/pastoral/educacao-crista"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 12, fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '0.2em', color: COR, textDecoration: 'none',
            }}
            className="hover:opacity-80 transition-opacity"
          >
            Ver todas as Aulas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      <Footer />
    </div>
  );
}
