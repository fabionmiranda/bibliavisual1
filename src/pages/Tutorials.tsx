import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Languages, Zap, Target, Layout, Activity, ArrowRightCircle, Flame, 
  Compass, ShieldCheck, Users, Cross, BookOpen, AlertTriangle, Repeat, 
  ShieldAlert, MessageSquare, PenTool, Mic2, Heart, Award, Shield,
  ChevronRight, Book, HelpCircle, History, UserCheck, Search, Cpu, Youtube
} from 'lucide-react';
import { cn } from '../lib/utils';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface TutorialSection {
  id: string;
  title: string;
  icon: any;
  color: string;
  question: string;
  content: string;
  purpose: string;
  youtubeUrl?: string;
}

const tutorials: TutorialSection[] = [
  {
    id: 'interlinear',
    title: 'Interlinear',
    icon: Languages,
    color: 'brand-blue',
    question: 'O que o texto realmente diz?',
    purpose: 'Formar um leitor atento e desacelerar a leitura para enxergar detalhes gramaticais e estruturais.',
    content: 'O diagrama interlinear representa o primeiro contato consciente e disciplinado com o texto bíblico. Antes de qualquer tentativa de explicação ou aplicação, é necessário olhar para o texto em sua forma mais básica. Ele expõe o texto em sua estrutura original, permitindo observar a ordem das palavras, a sequência das ideias e as relações mais imediatas entre os elementos.',
    youtubeUrl: 'https://youtu.be/example1'
  },
  {
    id: 'morfologico',
    title: 'Morfológico-Lexical',
    icon: Zap,
    color: 'brand-rose',
    question: 'O que exatamente cada palavra significa e como sua forma influencia o sentido?',
    purpose: 'Evitar a generalização e mostrar que cada termo deve ser entendido dentro de seu contexto linguístico e teológico.',
    content: 'Se o interlinear apresenta as palavras, o diagrama morfológico-lexical as aprofunda. Ele parte do princípio de que a teologia bíblica não está apenas nas ideias gerais, mas nas próprias palavras escolhidas. A análise morfológica observa tempo verbal, modo e voz, enquanto a análise lexical investiga o campo de significado.',
    youtubeUrl: 'https://youtu.be/example2'
  },
  {
    id: 'quiastico',
    title: 'Quiástico',
    icon: Target,
    color: 'brand-purple',
    question: 'Como o texto está organizado e onde está o seu centro de ênfase?',
    purpose: 'Revelar a arquitetura interna em forma de espelho (paralelismos) e o centro de gravidade teológica.',
    content: 'O diagrama quiástico revela a estrutura interna do texto em forma de simetria. Diferente da leitura linear, ele mostra que muitos textos bíblicos são organizados em forma de espelho. O ponto central do quiasmo frequentemente contém a ideia principal da passagem.',
    youtubeUrl: 'https://youtu.be/example3'
  },
  {
    id: 'sintatico',
    title: 'Sintático',
    icon: Layout,
    color: 'brand-blue',
    question: 'Quem faz o quê no texto?',
    purpose: 'Revelar a lógica operacional do texto e a distribuição de papéis (quem age e quem recebe a ação).',
    content: 'O diagrama sintático analisa a organização das frases e a relação entre seus elementos. Ele observa quem é o sujeito, qual é o verbo, quem recebe a ação e como essas ações se encadeiam. Isso é fundamental porque a teologia bíblica está profundamente ligada à ação.',
    youtubeUrl: 'https://youtu.be/example4'
  },
  {
    id: 'semantico',
    title: 'Semântico',
    icon: Activity,
    color: 'brand-rose',
    question: 'Qual é o fluxo de significado e a lógica das ideias?',
    purpose: 'Identificar como cada parte contribui para o todo e como os conceitos se conectam logicamente.',
    content: 'O diagrama semântico observa o fluxo de significado do texto. Ele organiza as ideias e mostra como elas se desenvolvem ao longo da passagem, unindo ética, culto, relações humanas e Deus em uma unidade coerente.',
    youtubeUrl: 'https://youtu.be/semantico'
  },
  {
    id: 'progressivo',
    title: 'Progressivo',
    icon: ArrowRightCircle,
    color: 'brand-purple',
    question: 'Como o texto avança até alcançar seu objetivo?',
    purpose: 'Revelar o movimento interno e dinâmico, garantindo que ninguma etapa seja ignorada na interpretação.',
    content: 'O diagrama progressivo analisa o caminho que o texto percorre. Ele mostra como uma ideia leva à outra e como o argumento se constrói em "degraus" pedagógicos e teológicos até a conclusão.',
    youtubeUrl: 'https://youtu.be/progressivo'
  },
  {
    id: 'intensificacao',
    title: 'Intensificação',
    icon: Flame,
    color: 'brand-blue',
    question: 'Onde o texto aumenta sua intensidade?',
    purpose: 'Identificar onde o texto ganha peso, gravidade ou exigência moral/teológica.',
    content: 'O diagrama de intensificação observa como o texto aumenta gradualmente sua força. A Escritura frequentemente constrói argumentos de maneira crescente, conduzindo o leitor a um ponto de maior peso, revelando que a solução divina só é apreciada quando o problema é aprofundado.',
    youtubeUrl: 'https://youtu.be/intensificacao'
  },
  {
    id: 'espacial',
    title: 'Espacial',
    icon: Compass,
    color: 'brand-rose',
    question: 'Em quais dimensões (divina, social, jurídica) o texto se move?',
    purpose: 'Revelar o ambiente teológico e mostrar que a Bíblia une o espiritual ao prático em uma única realidade.',
    content: 'O diagrama espacial analisa o texto em termos de esferas de atuação. Ele observa o trânsito entre o divino e o humano, mostrando que o pecado e a redenção atravessam todas as dimensões da existência.',
    youtubeUrl: 'https://youtu.be/espacial'
  },
  {
    id: 'acesso',
    title: 'Acesso',
    icon: ShieldCheck,
    color: 'brand-purple',
    question: 'Quem pode agir, quando e de que forma?',
    purpose: 'Mostrar a estrutura de autoridade, mediação e os limites necessários para se aproximar de Deus.',
    content: 'O diagrama de acesso investiga quem pode agir no texto e sob quais condições. Ele revela que o acesso ao divino não é irrestrito, mas regulado por mediação (sacerdotal) e responsabilidade humana.',
    youtubeUrl: 'https://youtu.be/acesso'
  },
  {
    id: 'relacional',
    title: 'Relacional',
    icon: Users,
    color: 'brand-blue',
    question: 'Quais relações estão sendo afetadas?',
    purpose: 'Mapear vínculos feridos ou restaurados, combatendo a leitura individualista da Bíblia.',
    content: 'O diagrama relacional observa as conexões entre os personagens. Identifica como o pecado produz rupturas horizontais (próximo) e verticais (Deus), e como a restauração atua em ambos os níveis.',
    youtubeUrl: 'https://youtu.be/relacional'
  },
  {
    id: 'cristologico',
    title: 'Cristológico',
    icon: Cross,
    color: 'brand-rose',
    question: 'Como este texto aponta para Cristo?',
    purpose: 'Integrar o texto à história da redenção, reconhecendo Cristo como o centro de toda a Escritura.',
    content: 'O diagrama cristológico conecta o texto à pessoa e obra de Jesus. Ele não impõe Cristo ao texto, mas observa como promessas, tipos e exigências encontram seu cumprimento pleno e orgânico nEle.',
    youtubeUrl: 'https://youtu.be/example5'
  },
  {
    id: 'sistematico',
    title: 'Sistemático',
    icon: BookOpen,
    color: 'brand-purple',
    question: 'Quais doutrinas este texto revela?',
    purpose: 'Organizar a perícope dentro das grandes categorias da teologia cristã (Deus, Homem, Pecado, Salvação).',
    content: 'O diagrama teológico-sistemático organiza o texto para que ele alimente a formulação doutrinária. Isso evita uma exegese sem doutrina e garante que a teologia permaneça ancorada no texto bíblico.',
    youtubeUrl: 'https://youtu.be/sistematico'
  },
  {
    id: 'tensao',
    title: 'Tensão',
    icon: AlertTriangle,
    color: 'brand-blue',
    question: 'Qual tensão o texto resolve?',
    purpose: 'Identificar o problema central (conflito) e acompanhar o caminho dramático até a solução divina.',
    content: 'O diagrama de tensão identifica o conflito central que precisa ser resolvido. A Escritura apresenta tensões (como culpa vs perdão) que conduzem à revelação de uma verdade maior.',
    youtubeUrl: 'https://youtu.be/tensao'
  },
  {
    id: 'repeticao',
    title: 'Repetição',
    icon: Repeat,
    color: 'brand-rose',
    question: 'O que o texto enfatiza por meio de recorrências?',
    purpose: 'Identificar padrões que funcionam como "sublinhados teológicos" intencionais do autor.',
    content: 'O diagrama de repetição identifica termos, ações ou ideias recorrentes. Na Bíblia, a repetição é a principal ferramenta de ênfase para fixar temas centrais na memória do leitor.',
    youtubeUrl: 'https://youtu.be/repeticao'
  },
  {
    id: 'causa-efeito',
    title: 'Causa e Efeito',
    icon: Zap,
    color: 'brand-purple',
    question: 'O que gera o quê dentro da lógica moral?',
    purpose: 'Mostrar que a realidade moral bíblica não é arbitrária e que ações produzem consequências ordenadas.',
    content: 'Esse diagrama observa a lógica moral do texto. Ele demonstra como o pecado produz culpa, como a culpa exige reparação e como a expiação conduz ao perdão pleno.',
    youtubeUrl: 'https://youtu.be/causa-efeito'
  },
  {
    id: 'apologetico',
    title: 'Apologético',
    icon: ShieldAlert,
    color: 'brand-blue',
    question: 'Que erros, distorções ou heresias esse texto confronta e corrige?',
    purpose: 'Defender a integridade do texto e equipar a igreja para discernir erros filosóficos ou doutrinários.',
    content: 'O diagrama apologético analisa o texto à luz de possíveis objeções e distorções. Ele demonstra a coerência da Escritura contra o relativismo, o legalismo, o antinomianismo e outras heresias.',
    youtubeUrl: 'https://youtu.be/apologetico'
  },
  {
    id: 'perguntas',
    title: 'Perguntas ao Texto',
    icon: MessageSquare,
    color: 'brand-rose',
    question: 'Que perguntas o próprio texto exige que façamos?',
    purpose: 'Transformar a leitura passiva em investigação ativa, garantindo uma observação exaustiva de cada verso.',
    content: 'O diagrama de perguntas transforma o texto em um campo de investigação reverente. Ele utiliza perguntas estruturadas para desbloquear significados que passariam despercebidos em leituras rápidas.',
    youtubeUrl: 'https://youtu.be/perguntas'
  },
  {
    id: 'autoral',
    title: 'Autoral',
    icon: PenTool,
    color: 'brand-purple',
    question: 'Como diferentes intérpretes compreenderam cada parte?',
    purpose: 'Integrar a leitura individual ao diálogo histórico com a tradição exegética e comentaristas.',
    content: 'O diagrama autoral organiza a interpretação a partir do diálogo com a igreja ao longo da história. Ele reúne perspectivas de diferentes autores para enriquecer e dar segurança à interpretação local.',
    youtubeUrl: 'https://youtu.be/autoral'
  },
  {
    id: 'homiletico',
    title: 'Homilético',
    icon: Mic2,
    color: 'brand-blue',
    question: 'Como esse texto deve ser pregado?',
    purpose: 'Organizar as descobertas exegéticas em uma estrutura clara para proclamação fiel e transformadora.',
    content: 'O diagrama homilético organiza o texto para o púlpito. Ele não inventa uma mensagem, mas estrutura a verdade bíblica de forma a conduzir o ouvinte pelo mesmo caminho de redenção do texto.',
    youtubeUrl: 'https://youtu.be/homiletico'
  },
  {
    id: 'pastoral',
    title: 'Pastoral Prático',
    icon: Heart,
    color: 'brand-rose',
    question: 'Como esse texto deve ser vivido?',
    purpose: 'Traduzir a teologia profunda em aplicações concretas para crianças, jovens, adultos e a igreja local.',
    content: 'O diagrama pastoral prático leva o texto à vida real. Ele transforma conceitos em atitudes, combatendo o moralismo e o arrependimento superficial com responsabilidade baseada na graça.',
    youtubeUrl: 'https://youtu.be/pastoral'
  },
  {
    id: 'antropologico',
    title: 'Antropológico',
    icon: Award,
    color: 'brand-purple',
    question: 'Como o texto descreve o ser humano em sua experiência existencial?',
    purpose: 'Analisar o homem sob a ótica bíblica (filosófica, psicológica, sociológica) sem reduzi-lo a sistemas humanos.',
    content: 'O diagrama antropológico integrado analisa o ser humano conforme a revelação. Ele observa conflitos internos e existenciais, mas sempre sob o diagnóstico divino e sua solução redentiva na história.',
    youtubeUrl: 'https://youtu.be/antropologico'
  },
  {
    id: 'familiar',
    title: 'Familiar',
    icon: Users,
    color: 'brand-blue',
    question: 'Como o texto orienta lidar com erro e restauração no lar?',
    purpose: 'Observar a dinâmica das relações próximas e como a autoridade de Deus regula a convivência diária.',
    content: 'O diagrama familiar observa como o texto bíblico revela a dinâmica das relações no lar. Ele traduz a teologia para o ambiente relacional, ensinando como o perdão e a responsabilidade operam entre pais e filhos.',
    youtubeUrl: 'https://youtu.be/familiar'
  },
  {
    id: 'trinitario',
    title: 'Trinitário',
    icon: Shield,
    color: 'brand-rose',
    question: 'Como a ação de Deus se manifesta em Pai, Filho e Espírito Santo?',
    purpose: 'Identificar a obra conjunta da Trindade: o Pai que revela, o Filho que cumpre e o Espírito que aplica.',
    content: 'A dimensão trinitária identifica a ação coordenada das três pessoas da Trindade no texto. Ela mostra o Pai como fonte de autoridade, o Filho como mediador redentor e o Espírito como agente de transformação íntima.',
    youtubeUrl: 'https://youtu.be/trinitario'
  }
];

export default function Tutorials() {
  const [selected, setSelected] = useState<TutorialSection | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bg-deep relative selection:bg-brand-blue selection:text-bg-deep overflow-x-hidden">
      <Navbar />
      
      <div className="pt-32 pb-32 relative">
        {/* Background decor */}
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-brand-blue/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 rounded-full border border-brand-blue/20 mb-6"
          >
            <Book className="w-4 h-4 text-brand-blue" />
            <span className="text-[10px] font-black text-brand-blue uppercase tracking-[0.2em]">Guia de Implementação</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter mb-6"
          >
            TUTORIAIS DO <span className="text-brand-blue">MÉTODO</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 max-w-2xl mx-auto text-lg"
          >
            Aprenda a arquitetura interna da revelação. Clique em cada diagrama para entender sua visão teológica, a pergunta que ele responde e seu objetivo prático.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((t, idx) => (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelected(t)}
              className={cn(
                "group relative text-left glass p-6 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all active:scale-[0.98]",
                selected?.id === t.id && "ring-2 ring-brand-blue border-transparent"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                  `bg-${t.color}/10 text-${t.color}`
                )}>
                  <t.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-black text-white uppercase tracking-tight text-lg mb-1 group-hover:text-brand-blue transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-white/70 text-xs font-bold leading-relaxed line-clamp-2">
                    {t.question}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detail View / Modal */}
        <AnimatePresence>
          {selected && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelected(null)}
                className="fixed inset-0 bg-bg-deep/80 backdrop-blur-md z-[100]"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[700px] max-h-[80vh] overflow-y-auto glass border border-white/10 p-8 md:p-12 rounded-[3rem] z-[101] selection:bg-brand-blue selection:text-bg-deep"
              >
                <button 
                  onClick={() => setSelected(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 rotate-90 text-white/40" />
                </button>

                <div className="flex items-center gap-6 mb-8">
                  <div className={cn(
                    "w-16 h-16 rounded-3xl flex items-center justify-center",
                    `bg-${selected.color}/10 text-${selected.color}`
                  )}>
                    <selected.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-brand-blue uppercase tracking-[0.3em] block mb-1">Diagrama Tutorial</span>
                    <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter">{selected.title}</h2>
                  </div>
                </div>

                <div className="space-y-8">
                  <section>
                    <div className="flex items-center gap-2 mb-3 text-brand-blue">
                      <HelpCircle className="w-4 h-4" />
                      <h4 className="text-[10px] font-black uppercase tracking-widest">Pergunta Fundamental</h4>
                    </div>
                    <p className="text-xl md:text-2xl font-medium text-white leading-tight">
                      "{selected.question}"
                    </p>
                  </section>

                  {selected.youtubeUrl && (
                    <section>
                      <a 
                        href={selected.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-red-600/10 border border-red-600/30 rounded-2xl hover:bg-red-600/20 transition-all group/yt"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white scale-90 group-hover/yt:scale-100 transition-transform">
                            <Youtube className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Aula Disponível</p>
                            <p className="text-sm font-bold text-white uppercase tracking-tight">Assistir no YouTube</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-red-500 group-hover/yt:translate-x-1 transition-transform" />
                      </a>
                    </section>
                  )}

                  <section className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="flex items-center gap-2 mb-3 text-white/60">
                      <Search className="w-4 h-4" />
                      <h4 className="text-[10px] font-black uppercase tracking-widest">Visão Geral</h4>
                    </div>
                    <p className="text-white/90 leading-relaxed">
                      {selected.content}
                    </p>
                  </section>

                  <section>
                    <div className="flex items-center gap-2 mb-3 text-brand-purple">
                      <Target className="w-4 h-4" />
                      <h4 className="text-[10px] font-black uppercase tracking-widest">Objetivo Prático</h4>
                    </div>
                    <p className="text-white/80 leading-relaxed font-medium">
                      {selected.purpose}
                    </p>
                  </section>

                  <div className="pt-8 border-t border-white/5 flex justify-center">
                    <button 
                      onClick={() => setSelected(null)}
                      className="px-10 py-3 bg-brand-blue text-bg-deep font-black text-xs uppercase tracking-widest rounded-full hover:bg-white transition-all active:scale-95 shadow-xl shadow-brand-blue/20"
                    >
                      Entendi o Diagrama
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <section className="mt-32 text-center">
          <div className="glass p-12 rounded-[3.5rem] border border-white/5 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight mb-6">
              A ARQUITETURA DA <span className="text-brand-blue">REVELAÇÃO</span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-8 font-medium italic">
              "Os diagramas não são enfeites acadêmicos. Eles são instrumentos de leitura. O grande valor do sistema é que ele impede a leitura rasa e a leitura fragmentada, formando uma visão integral das Escrituras."
            </p>
            <div className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest text-brand-blue">
              <Cpu className="w-4 h-4" />
              <span>Sistema Integrado de Exegese</span>
            </div>
          </div>
        </section>
      </div>
    </div>

    <Footer />
  </div>
);
}
