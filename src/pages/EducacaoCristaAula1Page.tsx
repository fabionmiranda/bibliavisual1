import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Play, ArrowLeft, ArrowRight, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { downloadTxt } from '../utils/downloadAula';

const COR = '#4ade80';

const TOPICOS_AULA = [
  'O elemento religioso na prática educativa entre os judeus, gregos e romanos',
  'Na Idade Média',
  'Na Era Moderna',
  'Na Era Contemporânea',
];

const PERCURSO_HISTORICO = [
  {
    num: 1,
    icon: '✡️',
    titulo: 'O Elemento Religioso entre Judeus, Gregos e Romanos',
    blocos: [
      {
        subtitulo: 'A Educação Hebraica — A Educação que Começou com Deus',
        versos: 'Dt 6.4–9; Pv 1.7; 9.10',
        texto: 'Seria um erro tentar estudar a educação cristã sem antes considerar a educação religiosa que a precedeu — a educação dos hebreus do Antigo Testamento. Todas as grandes ideias associadas ao AT (revelação, profecia, sacrifício, ritos, presença e poder de Deus) estão relacionadas com o sistema educacional dos israelitas, o povo escolhido por Deus. Como afirmou o educador cristão Eavey: "Uma história da educação verdadeiramente cristã indica, através dos tempos, o desenvolvimento da educação que começou com Deus, continuou a centralizar-se em Deus e agora se propaga sob a direção de Deus." Entre os judeus, a educação era inseparável da religião — o Shemá era o seu fundamento. O temor ao Senhor era o princípio e o fim de todo aprendizado.',
        nota: 'GILES, Thomas Ranson. História da Educação. São Paulo: EPU, 1987, p. 44. | EAVEY, Charles B. History of Christian Education. Chicago: Moody Press, 1964.',
      },
      {
        subtitulo: 'O Ensino na Família — A Primeira Escola',
        versos: 'Ex 12.26,27; Dt 4.9,10; 6.4–7; 11.18,19',
        texto: 'Desde a mais remota antiguidade, a família tem sido a instituição educacional por excelência. O plano fundamental de Deus sempre foi que a educação do seu povo começasse no lar. No Israel antigo, os pais executavam a maior parte do treinamento — não havia salas de aula ou currículo estruturado. Muito do aprendizado ocorria à noite, quando os pais reuniam os filhos ao redor e contavam histórias e experiências do passado. Contar as histórias era o principal método didático (Ex 12.26; 13.8,14; Dt 6.20,21; Js 4.6,21).',
        nota: 'PACKER, J. I.; TENNEY, Merrill C.; WHITE JR., William. Vida Cotidiana nos Tempos Bíblicos. São Paulo: Editora Vida, 1986, p. 79.',
      },
      {
        subtitulo: 'Responsabilidade Paterna e Materna',
        versos: 'Dt 11.19; 32.46; 4.9; Pv 1.8–9; 6.20; Pv 9.10',
        texto: 'A educação religiosa dos filhos era responsabilidade dos pais (Dt 11.19; 32.46), sem exceções para aqueles que se julgavam ocupados demais. Mesmo após a maioridade, a responsabilidade não cessava — os avós tinham parte na educação dos netos (Dt 4.9). A principal preocupação era que os filhos viessem a conhecer o Deus vivo: em hebraico, "conhecer" (יָדַע) significa estar intimamente envolvido com uma pessoa. As mães desempenhavam papel decisivo até os cinco anos de vida, moldando o futuro dos filhos e das filhas — ensinando habilidades práticas e transmitindo a fé pela vida cotidiana.',
        nota: 'PACKER, J. I. Op. Cit., pp. 79–81.',
      },
      {
        subtitulo: 'A Educação Grega e Romana',
        versos: '',
        texto: 'Na Grécia antiga, a educação (paideia) buscava a formação integral do cidadão livre — corpo, mente e virtude. Sócrates ensinava pelo diálogo (maiêutica); Platão defendia uma educação voltada ao conhecimento do Bem supremo; Aristóteles articulava razão, hábito e virtude como pilares da formação humana. Em Roma, a educação era eminentemente prática e cívica: formar o cidadão fiel à res publica. Quintiliano sistematizou a retórica como arte educativa. Progressivamente, o contato com o pensamento grego e com o cristianismo transformou os ideais romanos de formação humana — preparando o terreno para a síntese cristã que viria.',
        nota: 'JAEGER, Werner. Paideia: a formação do homem grego. São Paulo: Martins Fontes, 2003. | PRICE, J. M. A Pedagogia de Jesus. Rio de Janeiro: JUERP, 1986.',
      },
    ],
    referencias: [
      'GILES, Thomas Ranson. História da Educação. São Paulo: EPU, 1987.',
      'PACKER, J. I.; TENNEY, Merrill C.; WHITE JR., William. Vida Cotidiana nos Tempos Bíblicos. São Paulo: Editora Vida, 1986.',
      'EAVEY, Charles B. History of Christian Education. Chicago: Moody Press, 1964.',
      'JAEGER, Werner. Paideia: a formação do homem grego. São Paulo: Martins Fontes, 2003.',
      'PRICE, J. M. A Pedagogia de Jesus. Rio de Janeiro: JUERP, 1986.',
    ],
  },
  {
    num: 2,
    icon: '🏰',
    titulo: 'Na Idade Média',
    paragrafos: [
      'A Idade Média (séculos V–XV) foi marcada pela centralidade da Igreja na vida educacional. O monaquismo foi o grande guardião do saber — mosteiros e catedrais tornaram-se centros de cópia, preservação e transmissão do conhecimento. Figuras como Bento de Núrsia e Cassiodoro organizaram comunidades onde oração e estudo caminhavam juntos (ora et labora).',
      'As escolas catedralícias e, posteriormente, as primeiras universidades (Bologna, Paris, Oxford) surgiram sob o patrocínio da Igreja. A escolástica, com Anselmo de Cantuária e Tomás de Aquino, buscou harmonizar fé e razão: "fides quaerens intellectum" — a fé em busca de compreensão. O currículo das universidades medievais organizava-se no Trivium (gramática, retórica, lógica) e Quadrivium (aritmética, geometria, música, astronomia).',
      'A educação medieval, embora limitada em acesso, tinha uma coerência teológica clara: todo saber era teologia aplicada, e a formação intelectual servia à contemplação de Deus.',
    ],
    referencias: [
      'GILES, Thomas Ranson. História da Educação. São Paulo: EPU, 1987.',
      'LUZURIAGA, Lorenzo. História da Educação e da Pedagogia. São Paulo: Editora Nacional, 1990.',
      'GILSON, Étienne. A filosofia na Idade Média. São Paulo: Martins Fontes, 2001.',
    ],
  },
  {
    num: 3,
    icon: '🔭',
    titulo: 'Na Era Moderna',
    paragrafos: [
      'A Era Moderna (séculos XVI–XVIII) trouxe rupturas decisivas. A Reforma Protestante (1517) democratizou o acesso ao saber: Lutero insistia na alfabetização universal para que cada crente pudesse ler a Bíblia. Calvino fundou a Academia de Genebra (1559), modelo de ensino integrado à teologia reformada. O lema sola Scriptura transformou-se num imperativo educacional.',
      'Jan Amós Comenius (1592–1670), bisavô da didática moderna, propôs em sua Didactica Magna ensinar "tudo a todos" — uma visão radicalmente cristã e democrática da educação, fundamentada na crença de que todo ser humano é criado à imagem de Deus e, portanto, capaz e digno de aprender.',
      'O Iluminismo (séc. XVIII), porém, deslocou o centro da educação de Deus para a razão autônoma. Rousseau, Locke e Kant moldaram uma pedagogia que via no homem natural e racional o fundamento do progresso. A educação foi progressivamente secularizada e estatalizada — separando-se do seu fundamento teológico.',
    ],
    referencias: [
      'COMENIUS, Jan Amos. Didactica Magna. Lisboa: Fundação Calouste Gulbenkian, 2006.',
      'GREGORY, John Milton. As Sete Leis do Ensino. Rio de Janeiro: JUERP, 1997.',
      'GILES, Thomas Ranson. História da Educação. São Paulo: EPU, 1987.',
      'MORAIS, Erberth Bernardo de. Cosmovisão Cristã e Educação: Uma Introdução à Pedagogia Reformada. Brasília: Monergismo, 2018.',
    ],
  },
  {
    num: 4,
    icon: '💻',
    titulo: 'Na Era Contemporânea',
    paragrafos: [
      'O século XX trouxe a massificação da educação e, com ela, novas tensões. O pragmatismo de John Dewey influenciou profundamente a pedagogia ocidental: aprender fazendo, centrado no aluno, orientado para a vida social. Paulo Freire, no Brasil, propôs a "pedagogia do oprimido" — uma educação como prática de libertação, consciência crítica e transformação social.',
      'No campo cristão, a educação reformada respondeu com vigor. Herman Bavinck, Abraham Kuyper e, mais recentemente, James K. A. Smith insistiram que toda educação é formação de desejos e que o currículo nunca é neutro — sempre forma para uma visão de mundo. A educação cristã é, portanto, uma questão de liturgia: quais práticas formam o coração dos estudantes?',
      'Na era digital (séculos XX–XXI), novas plataformas, algoritmos e inteligência artificial desafiam a identidade humana, a atenção e a comunidade. A educação cristã contemporânea enfrenta o desafio de ser fiel às Escrituras enquanto dialoga com uma cultura radicalmente transformada pela tecnologia. O princípio reformado continua: toda educação deve partir de Deus, centralizar-se em Deus e propagar-se sob a direção de Deus.',
    ],
    referencias: [
      'SMITH, James K. A. Desiring the Kingdom: Worship, Worldview, and Cultural Formation. Grand Rapids: Baker Academic, 2009.',
      'PAZMIÑO, Robert W. Elementos Básicos do Ensino para Cristãos. São Paulo: Cultura Cristã, 2006.',
      'FERREIRA, Franklin. A Fé que Transforma a Cultura: Cosmovisão Cristã e Educação Integral. São Paulo: Vida Nova, 2015.',
      'SCHUURMAN, Derek C. Shaping a Digital World: Faith, Culture and Computer Technology. Downers Grove: IVP Academic, 2013.',
    ],
  },
];

const SECOES_INTRO = [
  {
    titulo: 'O Homem como Ser Histórico',
    texto: 'Ao estudarmos a influência da educação cristã na formação do ser humano, faz-se necessário reconhecer que o homem é um ser histórico. E ao longo de sua história, muitos fatores foram influenciando sua formação.',
  },
  {
    titulo: 'Educação como Processo Vital',
    texto: 'A educação como um processo vital de desenvolvimento e formação da personalidade não se confunde com a mera adaptação do indivíduo ao meio. É atividade criadora e abrange o homem em todos os seus aspectos. Começa na família, continua na escola e se prolonga por toda a existência humana.',
  },
  {
    titulo: 'O que é Educação?',
    texto: 'Educação é o processo pelo qual uma pessoa ou grupos de pessoas adquirem conhecimentos gerais, científicos, artísticos, técnicos ou especializados, com o objetivo de desenvolver sua capacidade ou aptidões. Além de conhecimentos, a pessoa adquire também, pela educação, certos hábitos e atitudes. Pode ser recebida em estabelecimentos de ensino especialmente organizados para esse fim — como escolas elementares, colégios, conservatórios musicais, universidades — ou através da experiência cotidiana, por intermédio dos contatos pessoais, leitura de jornais, revistas, livros, apreciação de pinturas, esculturas, filmes, peças musicais e de teatro, viagens e conferências.',
  },
  {
    titulo: 'O Objetivo Primordial da Educação',
    texto: 'O objetivo primordial da educação é dotar o homem de instrumentos culturais capazes de impulsionar as transformações materiais e espirituais exigidas pela dinâmica da sociedade. A educação aumenta o poder do homem sobre a natureza e, ao mesmo tempo, busca conformá-lo aos objetivos de progresso e equilíbrio social da coletividade a que pertence.',
  },
];

const REFERENCIAS = [
  {
    autor: 'GILES, Thomas Ranson',
    titulo: 'História da Educação',
    local: 'São Paulo: EPU, 1987',
    resumo: 'Panorama histórico da educação ocidental desde a Antiguidade até a modernidade — referência central para situar a educação cristã no tempo.',
  },
  {
    autor: 'PACKER, J. I.; TENNEY, Merrill C.; WHITE JR., William',
    titulo: 'Vida Cotidiana nos Tempos Bíblicos',
    local: 'São Paulo: Editora Vida, 1986',
    resumo: 'Descreve com riqueza de detalhes como era a vida familiar, educacional e religiosa no contexto do Antigo e Novo Testamento.',
  },
  {
    autor: 'EAVEY, Charles B.',
    titulo: 'History of Christian Education',
    local: 'Chicago: Moody Press, 1964',
    resumo: 'Clássico da historiografia da educação cristã — traça a linha de uma educação que começou com Deus e continua sob Sua direção.',
  },
];

function gerarTxtAula1(): string {
  const sep = '='.repeat(80);
  const sep2 = '-'.repeat(80);
  let txt = `${sep}\n  AULA 1 — INTRODUÇÃO À EDUCAÇÃO CRISTÃ: UMA VISÃO PANORÂMICA\n  Curso: Didática Cristã — Educação Cristã para Igrejas\n${sep}\n\n`;

  txt += `TÓPICOS DESTA AULA\n${sep2}\n`;
  TOPICOS_AULA.forEach((t, i) => { txt += `  ${i + 1}. ${t}\n`; });

  txt += `\n${sep}\nINTRODUÇÃO\n${sep}\n\n`;
  SECOES_INTRO.forEach(s => {
    txt += `${s.titulo.toUpperCase()}\n${'-'.repeat(s.titulo.length)}\n${s.texto}\n\n`;
  });

  txt += `${sep}\nPERCURSO HISTÓRICO\n${sep}\n\n`;
  PERCURSO_HISTORICO.forEach(item => {
    txt += `TÓPICO ${item.num} — ${item.titulo.toUpperCase()}\n${sep2}\n\n`;
    if ((item as any).blocos) {
      (item as any).blocos.forEach((b: any) => {
        txt += `[ ${b.subtitulo} ]\n`;
        if (b.versos) txt += `Referências: ${b.versos}\n\n`;
        txt += `${b.texto}\n\nNota: ${b.nota}\n\n---\n\n`;
      });
    } else {
      (item as any).paragrafos.forEach((p: string) => { txt += `${p}\n\n`; });
    }
    txt += `Referências:\n`;
    item.referencias.forEach(r => { txt += `  ${r}\n`; });
    txt += `\n${sep}\n\n`;
  });

  txt += `REFERÊNCIAS GERAIS DESTA AULA\n${sep2}\n`;
  REFERENCIAS.forEach((ref, i) => {
    txt += `${i + 1}. ${ref.autor}. ${ref.titulo}. ${ref.local}.\n   ${ref.resumo}\n\n`;
  });
  txt += sep;
  return txt;
}

export default function EducacaoCristaAula1Page() {
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
          <span style={{ color: COR }}>Aula 1</span>
        </motion.div>

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 20 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '6px 16px', borderRadius: 99,
            background: `${COR}15`, border: `1px solid ${COR}35`,
          }}>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: COR }}>
              Aula 1 · Educação Cristã para Igrejas
            </span>
          </div>
        </motion.div>

        {/* Botão Download */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => downloadTxt('aula1-introducao-educacao-crista.txt', gerarTxtAula1())}
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
            Introdução à Educação Cristã
          </h1>
          <h2 style={{ fontSize: 'clamp(15px,2vw,20px)', fontWeight: 400, color: `${COR}cc`, margin: '0 0 6px', fontStyle: 'italic' }}>
            Uma Visão Panorâmica
          </h2>
        </motion.div>

        {/* Divisor */}
        <div style={{ height: 1, background: `linear-gradient(90deg,${COR}40,transparent)`, margin: '32px 0 40px' }} />

        {/* ── Índice desta aula ── */}
        <div style={{
          padding: 'clamp(16px,3.5vw,24px) clamp(14px,3.5vw,28px)', borderRadius: 16,
          background: `${COR}08`, border: `1px solid ${COR}20`,
          marginBottom: 44,
        }}>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: COR, marginBottom: 16 }}>
            Percurso Histórico desta Aula
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

        {/* ── Seções introdutórias ── */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 24 }}>
            Introdução
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {SECOES_INTRO.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                style={{
                  padding: 'clamp(18px,4vw,28px) clamp(16px,4vw,28px)', borderRadius: 16,
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

        {/* ── Percurso Histórico Expandido ── */}
        <div style={{ marginBottom: 56 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32,
            paddingBottom: 14, borderBottom: `1px solid ${COR}25`,
          }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.28em', textTransform: 'uppercase', color: COR, marginBottom: 4 }}>
                Panorama Histórico
              </div>
              <h2 style={{ margin: 0, fontSize: 'clamp(20px,3.5vw,28px)', fontWeight: 900, color: '#fff' }}>
                A Educação ao Longo da História
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {PERCURSO_HISTORICO.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                style={{
                  borderRadius: 18,
                  border: `1px solid rgba(255,255,255,0.10)`,
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
                    {item.icon}
                  </span>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 900, color: `${COR}99`, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 3 }}>
                      Tópico {item.num}
                    </div>
                    <h3 style={{ margin: 0, fontSize: 'clamp(16px,2.5vw,20px)', fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>
                      {item.titulo}
                    </h3>
                  </div>
                </div>

                {/* Conteúdo — blocos detalhados (tópico 1) ou parágrafos simples */}
                <div style={{ padding: 'clamp(20px,4vw,28px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {(item as any).blocos
                    ? (item as any).blocos.map((b: any, j: number) => (
                        <div key={j} style={{
                          padding: 'clamp(16px,3vw,22px)',
                          borderRadius: 14,
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderLeft: `3px solid ${COR}50`,
                        }}>
                          <h4 style={{ margin: '0 0 8px', fontSize: 'clamp(15px,2vw,17px)', fontWeight: 900, color: '#fff' }}>
                            {b.subtitulo}
                          </h4>
                          {b.versos && (
                            <div style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6,
                              fontSize: 10, fontWeight: 900, color: `${COR}AA`,
                              background: `${COR}10`, border: `1px solid ${COR}28`,
                              borderRadius: 6, padding: '3px 10px', marginBottom: 12,
                              letterSpacing: '0.06em',
                            }}>
                              📖 {b.versos}
                            </div>
                          )}
                          <p style={{ margin: '0 0 10px', fontSize: 'clamp(16px,2.2vw,18px)', color: 'rgba(230,242,255,0.90)', lineHeight: 1.85 }}>
                            {b.texto}
                          </p>
                          <p style={{ margin: 0, fontSize: 13, color: 'rgba(220,235,255,0.65)', fontStyle: 'italic', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 10 }}>
                            {b.nota}
                          </p>
                        </div>
                      ))
                    : (item as any).paragrafos.map((p: string, j: number) => (
                        <p key={j} style={{ margin: 0, fontSize: 'clamp(16px,2.2vw,18px)', color: 'rgba(230,242,255,0.90)', lineHeight: 1.90 }}>
                          {p}
                        </p>
                      ))
                  }

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
                      {item.referencias.map((r, k) => (
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

        {/* ── Referências desta Aula ── */}
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
                transition={{ delay: i * 0.06 }}
                style={{
                  display: 'flex', alignItems: 'baseline', gap: 12,
                  padding: 'clamp(12px,2.5vw,18px) clamp(12px,2.5vw,18px)', borderRadius: 12,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 900, color: `${COR}80`, minWidth: 18, flexShrink: 0, paddingTop: 1 }}>
                  {i + 1}.
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <p style={{ margin: 0, fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(230,242,255,0.92)', lineHeight: 1.65 }}>
                    <span style={{ fontWeight: 900, color: 'rgba(255,255,255,0.90)' }}>{ref.autor}.</span>{' '}
                    <span style={{ fontStyle: 'italic' }}>{ref.titulo}.</span>{' '}
                    {ref.local}.
                  </p>
                  <p style={{ margin: 0, fontSize: 14, color: 'rgba(220,235,255,0.72)', lineHeight: 1.6, fontStyle: 'italic' }}>
                    {ref.resumo}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Player YouTube ── */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ height: 1, background: `linear-gradient(90deg,${COR}40,transparent)`, marginBottom: 40 }} />
          <div style={{
            fontSize: 10, fontWeight: 900, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
            marginBottom: 16,
          }}>
            Vídeo da Aula
          </div>
          <div style={{
            borderRadius: 20, overflow: 'hidden',
            border: `1px solid ${COR}25`,
            background: '#000',
            boxShadow: `0 0 60px ${COR}12`,
            position: 'relative',
            paddingTop: '56.25%',
          }}>
            <iframe
              src="https://www.youtube.com/embed?listType=search&list=introdu%C3%A7%C3%A3o+educa%C3%A7%C3%A3o+crist%C3%A3+hist%C3%B3ria+israel+igreja"
              title="Aula 1 – Introdução à Educação Cristã"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            />
          </div>
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
            <a
              href="https://www.youtube.com/results?search_query=introdução+educação+cristã+história+israel+igreja"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: `${COR}70`, textDecoration: 'none' }}
            >
              <Play className="w-3 h-3" />
              Buscar vídeos no YouTube
            </a>
          </div>
        </div>

        {/* ── Navegação ── */}
        <div style={{
          paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        }}>
          <Link
            to="/teologia/pastoral/educacao-crista"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 12, fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '0.2em', color: 'rgba(220,235,255,0.65)',
              textDecoration: 'none',
            }}
            className="hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Curso
          </Link>

          <Link
            to="/teologia/pastoral/educacao-crista/aula-2"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 12, fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '0.2em', color: COR, textDecoration: 'none',
            }}
            className="hover:opacity-80 transition-opacity"
          >
            Próxima Aula
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      <Footer />
    </div>
  );
}
