import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Play, ArrowLeft, ArrowRight, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { downloadTxt } from '../utils/downloadAula';

const COR = '#4ade80';

const TOPICOS_AULA = [
  'Cristo Anunciado — Paulo como pregador, apóstolo e mestre',
  'Cristo Revelado — A Educação Cristã e os mistérios de Deus',
  'Jesus Mestre — A natureza única de Jesus como professor',
  'Jesus Exemplo — Objetivos, métodos e a transformação de vidas',
];

const SECOES_INTRO = [
  {
    titulo: 'O Ensino no Coração do Ministério',
    texto: 'Paulo descreve a si mesmo como "um pregador, apóstolo e mestre" do evangelho (2 Tm 1.11). Seu ministério era proclamar e ensinar as Boas Novas. Claramente, o ensino era um aspecto central de toda a sua estratégia ministerial — não um elemento secundário, mas o coração da missão.',
  },
  {
    titulo: 'O Imperativo Bíblico do Ensino',
    texto: 'Esta visão geral demonstra que o ensino não é opcional na igreja; antes, é um imperativo bíblico para ser obedecido. A forma do ensino pode variar — escolas dominicais, grupos de discipulado, plataformas digitais —, mas que a igreja ensine é algo não negociável. As Escrituras ordenam que a igreja eduque seu povo para a maturidade espiritual.',
  },
];

const BLOCOS_PRINCIPAIS = [
  {
    num: 1,
    icon: '📢',
    titulo: 'Cristo Anunciado',
    subtitulo: 'Paulo: Pregador, Apóstolo e Mestre',
    versos: 'Cl 1.25–2.15; 2 Tm 1.11; 1 Co 9.22',
    paragrafos: [
      'Colossenses 1.25–2.15 fornece um importante vislumbre dentro da estratégia de ministério do apóstolo. No contexto de explicar como ele trabalhou a favor da igreja, Paulo explica que seu ministério era sofrimento (v. 24), proclamação (vs. 25–29) e intercessão (2.1–5). Paulo era um servo da igreja porque foi, primeiro de tudo, um mordomo de Deus. O único modo que alguém pode efetivamente servir a igreja é primeiro ser comprometido com o Pai.',
      'O conteúdo da proclamação de Paulo era o mistério da totalidade da Palavra — o glorioso mistério que havia estado escondido, mas agora fora revelado. "É Cristo em vós, a esperança da glória" (Cl 1.27). O mistério é a chave da vida espiritual: a experiência subjetiva interior do Cristo habitando em todo o seu povo, judeus e gentios da mesma forma.',
      'A mensagem de Paulo era Cristo, e seu método era admoestação e ensino com toda sabedoria — para que tudo pudesse ser apresentado completo em Cristo. O ensino era requerido porque os mistérios de Cristo não são facilmente entendidos e requerem instrução e explicação. O apóstolo precisava de sabedoria tanto para entender a mensagem quanto para fazê-la relevante aos ouvintes — tornando-se "todas as coisas para todos os homens para que por todos os meios possíveis pudesse salvar alguns" (1 Co 9.22).',
    ],
    referencias: [
      'DOWNS, Perry G. Ensinando para o crescimento espiritual. São Paulo: Shedd Publicações, 2007.',
      'PRICE, J. M. A Pedagogia de Jesus. Rio de Janeiro: JUERP, 1986.',
      'PAZMIÑO, Robert W. Elementos Básicos do Ensino para Cristãos. São Paulo: Cultura Cristã, 2006.',
    ],
  },
  {
    num: 2,
    icon: '✨',
    titulo: 'Cristo Revelado',
    subtitulo: 'A Educação Cristã e os Mistérios de Deus',
    versos: 'Cl 1.29; 1 Tm 3.2; 2 Tm 2.2',
    paragrafos: [
      'Uma Educação Cristã eficaz deve enfocar os mistérios de Deus. Por muito tempo, muita da igreja perdeu este enfoque em seus programas educacionais — substituindo a profundidade teológica por conteúdos voltados apenas às necessidades imediatas. Como resultado, a fé ficou fraca e as vidas vulneráveis à heresia e à decadência moral, pois não há um centro de verdade.',
      'Educadores cristãos eficazes proclamam os mistérios de Deus com toda sabedoria, esclarecendo a relevância da verdade bíblica para a vida. Os mistérios de Deus não são irrelevantes — eles são, de fato, o único meio da vida fazer sentido. Paulo relacionava teologia e experiência de vida, mostrando como uma pessoa deveria viver em resposta à verdade. Esta tarefa é a mesma para o educador cristão moderno.',
      'Uma Educação Cristã competente requer visão teológica e entendimento das pessoas tanto psicologicamente como culturalmente. O educador não tem o luxo de somente estudar o texto — ele deve também estudar as pessoas. Mas o melhor da percepção humana não produzirá, por si mesma, pessoas retas. O poder de Deus deve estar trabalhando para trazer a maturidade espiritual. Uma Educação Cristã produtiva é sempre uma parceria entre Deus e o educador.',
      'Assim como Paulo trabalhou para estabelecer igrejas, o desenvolvimento da liderança era essencial. Paulo listou critérios para aqueles que conduziriam as igrejas, sendo crítico que fossem "aptos para ensinar" (1 Tm 3.2). Paulo ensinou Timóteo, que em troca deveria "transmitir a homens fiéis e também idôneos para instruir a outros" (2 Tm 2.2). A Igreja deveria progredir através da evangelização e da educação — estes temas gêmeos são o coração do ministério da igreja.',
    ],
    referencias: [
      'DOWNS, Perry G. Ensinando para o crescimento espiritual. São Paulo: Shedd Publicações, 2007.',
      'MARRA, Cláudio A. B. A Igreja Discipuladora. São Paulo: Cultura Cristã, 2007.',
      'GANGEL, Kenneth O.; HENDRICKS, Howard G. The Christian Educator\'s Handbook on Teaching. Wheaton: Victor Books, 1988.',
    ],
  },
  {
    num: 3,
    icon: '✝️',
    titulo: 'Jesus Mestre',
    subtitulo: 'A Natureza Única de Jesus como Professor',
    versos: 'Fp 2.7; Mt 17.20; 1 Jo 2.6',
    paragrafos: [
      'Jesus continua sendo o principal exemplo de um professor eficaz. Suas influências são sentidas como uma força hoje assim como foram há dois mil anos atrás. Sua capacidade de tocar as vidas com seus ensinamentos e ajudar pessoas a ver e entender as coisas espirituais serve como um ideal para os professores cristãos. Os métodos e ensinamentos de Jesus eram culturalmente apropriados para seu contexto, mas continuam sendo instrutivos para nós no nosso contexto.',
      'Jesus tinha duas naturezas: a humana e a divina. Esta união hipostática resultou na existência da natureza sui generis de Jesus — em uma classe por si mesma. Nenhum outro humano possuiu as forças e a percepção que ele possuía. Contudo, este problema foi de alguma forma resolvido pela kenosis — o esvaziamento de si mesmo descrito em Filipenses 2.7. Talvez, ao "fazer-se nada", Jesus tenha limitado suas prerrogativas divinas, deixando-se dependente do Pai do mesmo modo que nós somos dependentes — sugerindo que suas limitações, enquanto na terra, foram semelhantes às nossas.',
      'Procurar por princípios em lugar de padrões cronológicos é uma atitude mais fiel ao modo como os evangelhos foram registrados. Os evangelhos foram escritos como declarações teológicas sobre Cristo e são melhor compreendidos lidos independentemente, procurando a mensagem interna em cada um. Assim, podemos pegar a informação que cada escritor fornece e usá-la para entender os princípios principais que parecem guiar nosso Senhor como professor.',
    ],
    referencias: [
      'DOWNS, Perry G. Ensinando para o crescimento espiritual. São Paulo: Shedd Publicações, 2007.',
      'WILSON, Carl. Com Cristo na Escola do Discipulado. São Paulo: Sepal, 1990.',
      'GREGORY, John Milton. As Sete Leis do Ensino. Rio de Janeiro: JUERP, 1997.',
      'PRICE, J. M. A Pedagogia de Jesus. Rio de Janeiro: JUERP, 1986.',
    ],
  },
  {
    num: 4,
    icon: '🎯',
    titulo: 'Jesus Exemplo',
    subtitulo: 'Objetivos, Métodos e a Transformação de Vidas',
    versos: 'Jo 10.10–11; At 1.1; 1 Jo 2.6',
    paragrafos: [
      'A Escritura nos ensina que Jesus serve como exemplo para nós. Devemos andar "como Jesus andou" (1 Jo 2.6), vivendo nossas vidas de acordo com os princípios que o guiaram. Lucas nos diz que ele registrou "tudo o que Jesus começou a fazer e ensinar" (At 1.1) — o fazer e o ensinar, indissociáveis. Um estudo de Jesus como professor deve considerar tanto o que ele ensinou quanto como ele ensinou.',
      'Qual era o objetivo de Jesus como professor? Jesus disse: "Eu vim para que tenham vida e vida em abundância" (Jo 10.10). Seu objetivo não era acumular um corpo de doutrinas sistematizadas, nem sistematizar a teologia — seu objetivo era mudar a qualidade de vida de seus alunos, colocando-os num patamar mais alto de obediência a Deus e de santidade. O propósito de Jesus era influenciar as experiências de seus alunos para que suas vidas fossem diferentes — que experimentassem a Deus como Pai e vivessem na realidade deste relacionamento.',
      'Alguns professores confundem meios com fins. Ensinar a Bíblia é um método; mudar vidas é o objetivo. Jesus não era obcecado com o "cumprimento do conteúdo" — ele podia gastar tempo ouvindo seus alunos e interagindo com eles porque sua agenda era a vida deles. Nós não podemos mudar vidas — mas o conteúdo da Escritura ensinado no poder do Espírito Santo muda vidas. A Educação Cristã é melhor entendida como uma parceria educacional com Deus: nós ensinamos fazendo o melhor que pudermos; o Espírito Santo usa nossos esforços para tocar os corações e conduzir os alunos à maturidade. Maturidade, bem entendida, significa uma vida mudada.',
    ],
    referencias: [
      'DOWNS, Perry G. Ensinando para o crescimento espiritual. São Paulo: Shedd Publicações, 2007.',
      'PAZMIÑO, Robert W. Foundational Issues in Christian Education. Grand Rapids: Baker Academic, 2008.',
      'LEBAR, Lois E. Education That Is Christian. Colorado Springs: Chariot Victor, 1995.',
      'SMITH, James K. A. Desiring the Kingdom: Worship, Worldview, and Cultural Formation. Grand Rapids: Baker Academic, 2009.',
    ],
  },
];

const REFERENCIAS = [
  {
    autor: 'DOWNS, Perry G.',
    titulo: 'Ensinando para o crescimento espiritual',
    local: 'São Paulo: Shedd Publicações, 2007',
    resumo: 'Fonte principal desta aula — análise bíblica e teológica do ensino cristão a partir de Paulo e Jesus, com ênfase na transformação de vidas.',
  },
  {
    autor: 'WILSON, Carl',
    titulo: 'Com Cristo na Escola do Discipulado',
    local: 'São Paulo: Sepal, 1990',
    resumo: 'Propõe um modelo de discipulado baseado nos métodos de Jesus com os Doze, discutido criticamente no texto.',
  },
  {
    autor: 'PRICE, J. M.',
    titulo: 'A Pedagogia de Jesus',
    local: 'Rio de Janeiro: JUERP, 1986',
    resumo: 'Clássico sobre os métodos de ensino de Jesus — narrativa, diálogo, parábola e exemplo — e sua aplicação na prática docente cristã.',
  },
  {
    autor: 'PAZMIÑO, Robert W.',
    titulo: 'Elementos Básicos do Ensino para Cristãos',
    local: 'São Paulo: Cultura Cristã, 2006',
    resumo: 'Fundamentos teológicos e pedagógicos do ensino cristão: currículo, métodos, contexto e avaliação.',
  },
  {
    autor: 'GREGORY, John Milton',
    titulo: 'As Sete Leis do Ensino',
    local: 'Rio de Janeiro: JUERP, 1997',
    resumo: 'Sistematiza sete princípios universais para um ensino eficaz, amplamente usados em seminários e cursos de formação docente cristã.',
  },
  {
    autor: 'GANGEL, Kenneth O.; HENDRICKS, Howard G.',
    titulo: 'The Christian Educator\'s Handbook on Teaching',
    local: 'Wheaton: Victor Books, 1988',
    resumo: 'Manual abrangente para educadores cristãos: teoria do aprendizado, métodos de ensino e planejamento curricular.',
  },
  {
    autor: 'MARRA, Cláudio A. B.',
    titulo: 'A Igreja Discipuladora',
    local: 'São Paulo: Cultura Cristã, 2007',
    resumo: 'Defende que o discipulado é a missão central da igreja local, propondo um modelo bíblico e sistemático de formação.',
  },
];

function gerarTxtAula2(): string {
  const sep = '='.repeat(80);
  const sep2 = '-'.repeat(80);
  let txt = `${sep}\n  AULA 2 — O ENSINO CONFORME JESUS CRISTO\n  Curso: Didática Cristã — Educação Cristã para Igrejas\n${sep}\n\n`;

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

export default function EducacaoCristaAula2Page() {
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
          <span style={{ color: COR }}>Aula 2</span>
        </motion.div>

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 20 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '6px 16px', borderRadius: 99,
            background: `${COR}15`, border: `1px solid ${COR}35`,
          }}>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: COR }}>
              Aula 2 · Educação Cristã para Igrejas
            </span>
          </div>
        </motion.div>

        {/* Botão Download */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => downloadTxt('aula2-ensino-conforme-jesus-cristo.txt', gerarTxtAula2())}
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
            O Ensino conforme Jesus Cristo
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
                Jesus Cristo — O Mestre por Excelência
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
              src="https://www.youtube.com/embed?listType=search&list=ensino+conforme+jesus+cristo+did%C3%A1tica+crist%C3%A3"
              title="Aula 2 – Didática Cristã: O Ensino conforme Jesus Cristo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            />
          </div>
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
            <a
              href="https://www.youtube.com/results?search_query=ensino+conforme+jesus+cristo+didatica+crista"
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
            to="/teologia/pastoral/educacao-crista/aula-1"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 12, fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '0.2em', color: 'rgba(220,235,255,0.50)',
              textDecoration: 'none',
            }}
            className="hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Aula 1
          </Link>

          <Link
            to="/teologia/pastoral/educacao-crista/aula-3"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 12, fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '0.2em', color: COR, textDecoration: 'none',
            }}
            className="hover:opacity-80 transition-opacity"
          >
            Aula 3
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      <Footer />
    </div>
  );
}
