import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, ChevronRight, Lock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ACCENT = '#60a5fa';

interface Heroi {
  ordem: number;
  nome: string;
  anos: string;
  periodo: string;
  descricao: string;
  frase: string;
  disponivel: boolean;
}

const HEROIS: Heroi[] = [
  {
    ordem: 1,
    nome: 'Jerônimo Savonarola',
    anos: '1452–1498',
    periodo: 'Pré-Reforma · Itália',
    descricao: 'O frade dominicano que ousou confrontar o papa e a corrupção de Florença — pregou arrependimento quando todo mundo preferia silêncio.',
    frase: 'Não temo a morte; temo a covardia diante de Deus.',
    disponivel: false,
  },
  {
    ordem: 2,
    nome: 'Martinho Lutero',
    anos: '1483–1546',
    periodo: 'Reforma Protestante · Alemanha',
    descricao: 'O monge que pregou 95 teses numa porta e sacudiu a cristandade — sua consciência era cativa à Palavra de Deus, não a Roma.',
    frase: 'Aqui estou; não posso fazer diferente. Que Deus me ajude.',
    disponivel: false,
  },
  {
    ordem: 3,
    nome: 'João Bunyan',
    anos: '1628–1688',
    periodo: 'Puritanismo · Inglaterra',
    descricao: 'O latoeiro que pregou sem licença, passou doze anos na prisão e escreveu a alegoria cristã mais lida depois da Bíblia.',
    frase: 'Li na face do homem que ele era peregrino.',
    disponivel: false,
  },
  {
    ordem: 4,
    nome: 'Jônatas Edwards',
    anos: '1703–1758',
    periodo: 'Primeiro Grande Avivamento · América do Norte',
    descricao: 'Filósofo e pregador do avivamento — seu sermão "Pecadores nas Mãos de um Deus Irado" gerou o Primeiro Grande Avivamento na Nova Inglaterra.',
    frase: 'Deus é o objeto mais alto de felicidade do homem.',
    disponivel: false,
  },
  {
    ordem: 5,
    nome: 'João Wesley',
    anos: '1703–1791',
    periodo: 'Metodismo · Inglaterra',
    descricao: 'Cavalgou mais de 400.000 km pregando ao ar livre, fundou o metodismo e transformou a Inglaterra numa época em que a maioria dormia.',
    frase: 'O mundo é a minha paróquia.',
    disponivel: false,
  },
  {
    ordem: 6,
    nome: 'Jorge Whitefield',
    anos: '1714–1770',
    periodo: 'Avivamento · Inglaterra e América',
    descricao: 'O pregador que fazia chorar Benjamin Franklin — pregou ao ar livre para multidões de 30.000 pessoas antes de microfone existir.',
    frase: 'Senhor Jesus, sou cansado no Teu serviço, mas não do Teu serviço.',
    disponivel: false,
  },
  {
    ordem: 7,
    nome: 'Davi Brainerd',
    anos: '1718–1747',
    periodo: 'Missões · América do Norte',
    descricao: 'Missionário entre indígenas americanos, morreu aos 29 anos de tuberculose — seu diário moldou gerações de missionários, incluindo William Carey.',
    frase: 'Não tenho desejo senão o de viver para Deus e ser consumido no Seu serviço.',
    disponivel: false,
  },
  {
    ordem: 8,
    nome: 'Guilherme Carey',
    anos: '1761–1834',
    periodo: 'Era Moderna das Missões · Índia',
    descricao: 'O sapateiro que se tornou missionário na Índia e fundou o movimento moderno de missões estrangeiras — "espere grandes coisas de Deus."',
    frase: 'Espere grandes coisas de Deus. Empreenda grandes coisas para Deus.',
    disponivel: false,
  },
  {
    ordem: 9,
    nome: 'Christmas Evans',
    anos: '1766–1838',
    periodo: 'Avivamento · País de Gales',
    descricao: 'O pregador de um olho só que transformou o País de Gales com pregação visionária e ardor espiritual sem paralelo em sua geração.',
    frase: 'Preguei com toda a força da minha alma e Deus esteve presente.',
    disponivel: false,
  },
  {
    ordem: 10,
    nome: 'Henrique Martyn',
    anos: '1781–1812',
    periodo: 'Missões · Índia e Pérsia',
    descricao: 'Traduziu o Novo Testamento para o urdu, persa e judeo-persa antes de morrer aos 31 anos — sua vida foi uma chama que ardeu inteira.',
    frase: 'Agora deixa-me arder pelo Teu serviço.',
    disponivel: false,
  },
  {
    ordem: 11,
    nome: 'Adoniram Judson',
    anos: '1788–1850',
    periodo: 'Missões · Birmânia',
    descricao: 'Passou seis anos sem uma única conversão, sobreviveu a prisões, perdeu esposa e filhos — e plantou uma Igreja que dura até hoje na Birmânia.',
    frase: 'O futuro é tão brilhante como as promessas de Deus.',
    disponivel: false,
  },
  {
    ordem: 12,
    nome: 'Carlos Finney',
    anos: '1792–1875',
    periodo: 'Segundo Grande Avivamento · América',
    descricao: 'O advogado convertido que pregou o segundo grande avivamento americano — cidades inteiras paravam quando ele pregava.',
    frase: 'Uma alma que não ora é uma alma morta.',
    disponivel: false,
  },
  {
    ordem: 13,
    nome: 'Jorge Müller',
    anos: '1805–1898',
    periodo: 'Fé e Oração · Inglaterra',
    descricao: 'Cuidou de mais de 10.000 órfãos sem pedir dinheiro a ninguém — apenas orando. Sua vida foi uma demonstração pública da fidelidade de Deus.',
    frase: 'Não me importa com a aprovação ou desaprovação dos homens. Tenho somente um Senhor.',
    disponivel: false,
  },
  {
    ordem: 14,
    nome: 'Davi Livingstone',
    anos: '1813–1873',
    periodo: 'Missões · África',
    descricao: 'Explorou o interior da África por décadas — médico, abolicionista e missionário que morreu ajoelhado em oração na selva africana.',
    frase: 'Não posso parar. Meu alvo é a África.',
    disponivel: false,
  },
  {
    ordem: 15,
    nome: 'João Paton',
    anos: '1824–1907',
    periodo: 'Missões · Ilhas do Pacífico',
    descricao: 'Foi para as ilhas Nouvelles-Hébrides onde missionários foram mortos e comidos — enterrou esposa e filho recém-nascido sozinho e ficou.',
    frase: 'Se eu morrer servindo ao Senhor Jesus, é uma morte gloriosa.',
    disponivel: false,
  },
  {
    ordem: 16,
    nome: 'Hudson Taylor',
    anos: '1832–1905',
    periodo: 'Missões · China',
    descricao: 'Fundou a Missão Interior da China e alcançou o interior do país como nenhum ocidental antes — viveu e vestiu-se como chinês para alcançar o povo.',
    frase: 'Deus escolheu os fracos para envergonhar os fortes.',
    disponivel: false,
  },
  {
    ordem: 17,
    nome: 'Carlos Spurgeon',
    anos: '1834–1892',
    periodo: 'Pregação · Inglaterra',
    descricao: 'O Príncipe dos Pregadores — pregou para mais de 10 milhões de pessoas ao longo da vida, sofreu depressão severa e nunca parou de pregar.',
    frase: 'Se você quer ver milagres, ore. Se quer ver mais milagres, ore mais.',
    disponivel: false,
  },
  {
    ordem: 18,
    nome: 'Pastor Hsi',
    anos: '1836–1896',
    periodo: 'Missões · China',
    descricao: 'Ex-viciado em ópio convertido por Hudson Taylor — tornou-se o mais influente evangelista chinês do século XIX, libertando centenas do vício.',
    frase: 'Jesus Cristo me libertou do ópio. Ele pode libertar a todos.',
    disponivel: false,
  },
  {
    ordem: 19,
    nome: 'Dwight L. Moody',
    anos: '1837–1899',
    periodo: 'Evangelismo · América e Inglaterra',
    descricao: 'Sapateiro sem educação formal que se tornou o maior evangelista do século XIX — pregou para mais de 100 milhões de pessoas no mundo pré-rádio.',
    frase: 'O mundo ainda não viu o que Deus pode fazer com um homem completamente consagrado a Ele.',
    disponivel: false,
  },
  {
    ordem: 20,
    nome: 'Jônatas Goforth',
    anos: '1859–1936',
    periodo: 'Avivamento · China e Coreia',
    descricao: 'Missionário canadense que foi instrumento do avivamento na China e na Manchúria — sobreviveu ao levante Boxer e continuou pregando.',
    frase: 'Pela minha parte, estou convicto de que o preço do avivamento é arrependimento.',
    disponivel: false,
  },
];

const PERIODOS: Record<string, string> = {
  'Pré-Reforma': '#c084fc',
  'Reforma Protestante': '#fbbf24',
  'Puritanismo': '#60a5fa',
  'Primeiro Grande Avivamento': '#f97316',
  'Metodismo': '#34d399',
  'Avivamento': '#f97316',
  'Era Moderna das Missões': '#34d399',
  'Missões': '#34d399',
  'Segundo Grande Avivamento': '#f97316',
  'Fé e Oração': '#a78bfa',
  'Pregação': '#fbbf24',
  'Evangelismo': '#f97316',
};

function getPeriodoCor(periodo: string): string {
  for (const key of Object.keys(PERIODOS)) {
    if (periodo.startsWith(key)) return PERIODOS[key];
  }
  return ACCENT;
}

export default function HeroisDaFeHistoriaPage() {
  return (
    <div className="min-h-screen relative">
      <Navbar />

      <section className="relative pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${ACCENT}0a 0%, transparent 68%)`, filter: 'blur(48px)' }} />

        <div className="max-w-5xl mx-auto">

          {/* back */}
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link to="/estudos/biblicos"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-xs font-bold uppercase tracking-widest mb-10 transition-colors duration-200">
              <ArrowLeft className="w-3.5 h-3.5" />
              Estudos Bíblicos
            </Link>
          </motion.div>

          {/* Hero header */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="mb-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: ACCENT }} />
              <p className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                Estudos Históricos
              </p>
            </div>
            <div className="flex items-center gap-5 mb-5">
              <div className="p-4 rounded-2xl shrink-0" style={{ background: `${ACCENT}18`, border: `1.5px solid ${ACCENT}38` }}>
                <BookOpen className="w-8 h-8" style={{ color: ACCENT }} strokeWidth={1.5} />
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1]">
                Heróis da Fé na História da Igreja
              </h1>
            </div>
            <p className="text-white/45 text-base sm:text-lg max-w-2xl leading-relaxed mb-4">
              Homens e mulheres que mudaram o curso da Igreja — mártires, reformadores, missionários e pregadores cujas vidas falam mais alto que qualquer doutrina.
            </p>
            <p className="text-sm font-semibold" style={{ color: `${ACCENT}99` }}>
              20 heróis · Do século XV ao XX · Ordem cronológica
            </p>
          </motion.div>

          {/* banner em construção */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="rounded-2xl p-5 mb-10 flex items-center gap-4"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <Lock className="w-4 h-4 shrink-0 text-white/25" />
            <p className="text-white/40 text-sm leading-relaxed">
              Os estudos serão liberados progressivamente — um herói por vez, com contexto histórico, teológico e aplicação para a vida cristã de hoje.
            </p>
          </motion.div>

          {/* grid de heróis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HEROIS.map((heroi, i) => {
              const periCor = getPeriodoCor(heroi.periodo);
              return (
                <motion.div
                  key={heroi.ordem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.04 }}
                >
                  <div
                    className="relative rounded-2xl overflow-hidden flex flex-col"
                    style={{
                      background: heroi.disponivel
                        ? 'linear-gradient(145deg,#001220,#000d18)'
                        : 'rgba(255,255,255,0.03)',
                      border: heroi.disponivel
                        ? `1.5px solid ${ACCENT}40`
                        : '1px solid rgba(255,255,255,0.07)',
                      opacity: heroi.disponivel ? 1 : 0.8,
                    }}
                  >
                    {/* top accent bar */}
                    <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${periCor}55, transparent)` }} />

                    <div className="p-5 flex flex-col gap-3 flex-1">
                      {/* header */}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: `${ACCENT}80` }}>
                              #{heroi.ordem.toString().padStart(2, '0')}
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: `${periCor}90` }}>
                              {heroi.anos}
                            </span>
                          </div>
                          <h3 className="text-white font-black text-xl leading-none">{heroi.nome}</h3>
                        </div>
                        {!heroi.disponivel && (
                          <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full shrink-0 mt-1"
                            style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
                            Em breve
                          </span>
                        )}
                      </div>

                      {/* periodo */}
                      <span
                        className="self-start text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                        style={{ color: periCor, background: `${periCor}18`, border: `1px solid ${periCor}30` }}
                      >
                        {heroi.periodo}
                      </span>

                      {/* descricao */}
                      <p className="text-white/50 text-xs leading-relaxed">{heroi.descricao}</p>

                      {/* frase */}
                      <p className="text-[11px] leading-relaxed font-medium italic border-l-2 pl-3"
                        style={{ color: `${periCor}80`, borderColor: `${periCor}40` }}>
                        "{heroi.frase}"
                      </p>

                      {/* cta */}
                      {heroi.disponivel ? (
                        <div className="flex items-center gap-1 mt-2 pt-3" style={{ borderTop: `1px solid ${ACCENT}20` }}>
                          <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: ACCENT }}>Estudar</span>
                          <ChevronRight className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 mt-2 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                          <Lock className="w-3 h-3 text-white/20" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Em produção</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
