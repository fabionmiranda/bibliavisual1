import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Layout, 
  Languages, 
  HelpCircle, 
  ListChecks, 
  Cross, 
  ArrowRight, 
  Zap,
  Target,
  Flame,
  ShieldCheck,
  Award,
  Cpu,
  Activity,
  Compass,
  Users,
  Scale,
  AlertTriangle,
  Repeat,
  ArrowRightCircle,
  ShieldAlert,
  MessageSquare,
  PenTool,
  Mic2,
  Heart,
  ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const steps = [
  {
    id: 1,
    title: "Interlinear",
    icon: Languages,
    color: "brand-blue",
    description: "O que o texto realmente diz em sua forma original? O primeiro contato consciente e disciplinado com o texto bíblico.",
    details: ["Hebraico/Grego", "Transliteração", "Tradução Literal"]
  },
  {
    id: 2,
    title: "Morfológico-lexical",
    icon: Zap,
    color: "brand-purple",
    description: "Que tipo de palavras e formas revelam a precisão teológica do texto? Análise profunda de tempos verbais e campos semânticos.",
    details: ["Tempos Verbais", "Campos de Significado", "Precisão Teológica"]
  },
  {
    id: 3,
    title: "Quiástico",
    icon: Target,
    color: "brand-rose",
    description: "Como o texto está estruturado e onde está o seu centro de ênfase? Revela a arquitetura interna em forma de simetria.",
    details: ["Simetria Literária", "Eixo Central", "Foco da Mensagem"]
  },
  {
    id: 4,
    title: "Sintático",
    icon: Layout,
    color: "brand-blue",
    description: "Quem faz o quê no texto e como as ações estão organizadas? Analisa a organização das frases e a relação entre elementos.",
    details: ["Sujeito e Verbo", "Distribuição de Ações", "Lógica Operacional"]
  },
  {
    id: 5,
    title: "Semântico",
    icon: Activity,
    color: "brand-purple",
    description: "Qual é o fluxo de significado e a lógica das ideias do texto? Organiza as ideias e mostra como elas se desenvolvem.",
    details: ["Fluxo de Significado", "Conexão de Conceitos", "Unidade Coerente"]
  },
  {
    id: 6,
    title: "Progressivo",
    icon: ArrowRightCircle,
    color: "brand-rose",
    description: "Como o texto avança passo a passo até seu objetivo final? Enfatiza os degraus da passagem em direção a uma conclusão.",
    details: ["Desenvolvimento", "Avanço do Argumento", "Conclusão Inevitável"]
  },
  {
    id: 7,
    title: "Intensificação",
    icon: Flame,
    color: "brand-blue",
    description: "Onde o texto aumenta o peso, a gravidade ou a exigência? Observa como o texto ganha força e clímax teológico.",
    details: ["Aumento de Gravidade", "Clímax Teológico", "Peso das Afirmações"]
  },
  {
    id: 8,
    title: "Espacial",
    icon: Compass,
    color: "brand-purple",
    description: "Em quais esferas (humana, social, divina) o texto se move? Analisa o texto em termos de dimensões de atuação.",
    details: ["Esfera Divina", "Esfera Social", "Esfera Jurídica"]
  },
  {
    id: 9,
    title: "Acesso",
    icon: ShieldCheck,
    color: "brand-rose",
    description: "Quem pode agir, como pode agir e quais são os limites diante de Deus? Investiga a estrutura de autoridade e mediação.",
    details: ["Limites e Permissões", "Mediação Sacerdotal", "Acesso ao Divino"]
  },
  {
    id: 10,
    title: "Relacional",
    icon: Users,
    color: "brand-blue",
    description: "Quais relações são rompidas, afetadas ou restauradas? Mapeia os vínculos feridos e restaurados no texto.",
    details: ["Vínculos com o Próximo", "Vínculos com Deus", "Restauração Relacional"]
  },
  {
    id: 11,
    title: "Cristológico",
    icon: Cross,
    color: "brand-purple",
    description: "Como este texto aponta para ou se cumpre em Cristo? Conecta o texto à pessoa e obra de Jesus.",
    details: ["Tipologia", "Cumprimento", "História da Redenção"]
  },
  {
    id: 12,
    title: "Sistemático",
    icon: BookOpen,
    color: "brand-rose",
    description: "Que doutrinas estão presentes neste texto e como elas se conectam? Organiza o texto dentro das grandes categorias da teologia.",
    details: ["Doutrina de Deus", "Antropologia", "Soteriologia"]
  },
  {
    id: 13,
    title: "Tensão",
    icon: AlertTriangle,
    color: "brand-blue",
    description: "Qual é o problema central do texto e como ele é resolvido? Identifica o conflito e acompanha o caminho até a solução.",
    details: ["Conflito Central", "Resolução", "Dinâmica do Texto"]
  },
  {
    id: 14,
    title: "Repetição",
    icon: Repeat,
    color: "brand-purple",
    description: "O que o texto enfatiza por meio de repetição de ideias ou temas? Identifica padrões recorrentes como ferramenta de ênfase.",
    details: ["Padrões Recorrentes", "Sublinhado Teológico", "Ênfase Temática"]
  },
  {
    id: 15,
    title: "Causa e efeito",
    icon: Zap,
    color: "brand-rose",
    description: "O que gera o quê dentro da lógica moral e teológica do texto? Observa como ações produzem consequências.",
    details: ["Lógica Moral", "Consequências", "Ordem Estabelecida"]
  },
  {
    id: 16,
    title: "Apologético",
    icon: ShieldAlert,
    color: "brand-blue",
    description: "Que erros, objeções ou visões distorcidas o texto corrige? Analisa o texto à luz de possíveis distorções.",
    details: ["Defesa da Fé", "Correção de Heresias", "Segurança Teológica"]
  },
  {
    id: 17,
    title: "Perguntas ao texto",
    icon: MessageSquare,
    color: "brand-purple",
    description: "Que perguntas o próprio texto exige que façamos? Transforma a leitura em um campo de investigação guiada.",
    details: ["Investigação Reverente", "Observação Ativa", "Maturidade Hermenêutica"]
  },
  {
    id: 18,
    title: "Autoral",
    icon: PenTool,
    color: "brand-rose",
    description: "Como diferentes intérpretes entenderam cada parte do texto? Diálogo com comentaristas e exegetas reconhecidos.",
    details: ["Tradição Exegética", "Diálogo Histórico", "Múltiplas Camadas"]
  },
  {
    id: 19,
    title: "Homilético",
    icon: Mic2,
    color: "brand-blue",
    description: "Como esse texto deve ser pregado de forma fiel e estruturada? Organiza o texto para proclamação fiel.",
    details: ["Esboço de Pregação", "Mensagem Central", "Transformação em Sermão"]
  },
  {
    id: 20,
    title: "Pastoral prático",
    icon: Heart,
    color: "brand-purple",
    description: "Como esse texto deve ser vivido concretamente na vida da igreja? Traduz a passagem em vida prática.",
    details: ["Transformação Concreta", "Vida Comunitária", "Aplicação Geracional"]
  },
  {
    id: 21,
    title: "Antropológico-Psicológico",
    icon: Activity,
    color: "brand-rose",
    description: "Como o texto bíblico descreve o ser humano em sua experiência existencial e relacional, e como Deus interpreta e resolve essa condição ao longo da história redentiva?",
    details: ["Experiência Existencial", "Conflitos Internos", "Relação com o Criador"]
  },
  {
    id: 22,
    title: "Familiar",
    icon: Users,
    color: "brand-blue",
    description: "Como o texto bíblico orienta a forma como as relações familiares devem lidar com o erro, a responsabilidade e a restauração?",
    details: ["Relações Familiares", "Responsabilidade", "Restauração na Casa"]
  },
  {
    id: 23,
    title: "Trinitário",
    icon: ShieldCheck,
    color: "brand-purple",
    description: "Como a ação de Deus neste texto pode ser compreendida à luz da revelação do Pai, da obra redentiva do Filho e da atuação do Espírito Santo?",
    details: ["Revelação do Pai", "Obra do Filho", "Atuação do Espírito"]
  }
];

export default function Method() {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center space-y-8 mb-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-bold uppercase tracking-widest"
            >
              <Cpu className="w-4 h-4" />
              OS DIAGRAMAS DE EXEGESE
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-none uppercase"
            >
              OS <span className="text-brand-purple">DIAGRAMAS</span> DE EXEGESE
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto text-white/90 text-xl leading-relaxed font-medium"
            >
              Uma metodologia científica e teológica que esgota o texto através de perspectivas únicas.
            </motion.p>
          </div>

          {/* Steps Technical Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-brand-blue via-brand-purple to-brand-rose rounded-3xl opacity-0 group-hover:opacity-20 transition duration-500 blur" />                <div className="relative h-full glass p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all flex flex-col gap-6">
                  {/* Step Header */}
                  <div className="flex justify-between items-start">
                    <div className={`w-12 h-12 rounded-2xl bg-${step.color}/20 flex items-center justify-center text-${step.color} shadow-[0_0_20px_rgba(var(--${step.color}),0.1)]`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-[10px] text-white/60 tracking-widest uppercase">
                      Diagrama
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-display font-bold text-white tracking-tight group-hover:text-brand-blue transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed line-clamp-3">
                      {step.description}
                    </p>
                  </div>

                  {/* Technical Details */}
                  <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {step.details.map((detail, i) => (
                        <span key={i} className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-mono uppercase tracking-wider text-white/90 border border-white/20">
                          {detail}
                        </span>
                      ))}
                    </div>
                    
                    {/* HUD element */}
                    <div className="flex justify-between items-center opacity-20 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-1">
                        {[1, 2, 3].map(i => (
                          <div key={i} className={`h-1 w-4 rounded-full bg-${step.color}`} />
                        ))}
                      </div>
                      <div className="text-[10px] font-mono text-white/90">SCAN_COMPLETE</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>


          {/* Final CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-48 glass p-16 rounded-[4rem] text-center space-y-10 border border-white/10 bg-gradient-to-br from-brand-blue/5 via-transparent to-brand-rose/5"
          >
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-6xl font-display font-black text-white">
                TRANSFORME SUA <span className="text-brand-blue">VISÃO</span>
              </h2>
              <p className="text-white/80 text-xl leading-relaxed">
                O sistema dos diagramas não é apenas uma técnica, é uma nova forma de enxergar a glória de Deus nas Escrituras.
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-4">

              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
