import { motion } from 'motion/react';
import { useEffect } from 'react';
import { 
  ArrowRight, ChevronRight, Zap, Layout, Languages, Target, Activity, 
  ArrowRightCircle, Flame, Compass, ShieldCheck, Users, Cross, BookOpen, 
  AlertTriangle, Repeat, ShieldAlert, MessageSquare, PenTool, Mic2, 
  Heart, Award, Shield, UserCheck, Home as HomeIcon, Share2
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { cn } from '../lib/utils';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen relative">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-10 overflow-hidden">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="relative shrink-0"
              >
                <div className="absolute -inset-2 bg-brand-blue/20 blur-xl rounded-full" />
                <div className="relative p-3 md:p-5 bg-bg-deep/50 border border-brand-blue/20 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl backdrop-blur-sm">
                  <BookOpen className="w-8 h-8 md:w-16 md:h-16 text-brand-blue" />
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-1 -right-1 p-1 md:p-2 bg-bg-deep border border-brand-rose/30 rounded-lg md:rounded-xl shadow-lg"
                  >
                    <Share2 className="w-3 h-3 md:w-6 md:h-6 text-brand-rose" />
                  </motion.div>
                </div>
              </motion.div>

              <h1 className="font-display text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[1] text-center md:text-left">
                <motion.span 
                  className="bg-gradient-to-r from-brand-blue via-brand-purple via-brand-rose to-brand-blue bg-[length:200%_auto] bg-clip-text text-transparent uppercase inline-block pb-4"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: 1,
                    backgroundPosition: ["0% center", "200% center"],
                    textShadow: [
                      "0 0 0px rgba(0,212,255,0)",
                      "0 0 35px rgba(0,212,255,0.3)",
                      "0 0 0px rgba(0,212,255,0)"
                    ]
                  }}
                  transition={{ 
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" },
                    textShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 1 }
                  }}
                >
                  BÍBLIA VISUAL <br className="hidden md:block" /> EXPOSITIVA
                </motion.span>
              </h1>
            </div>
            <p className="text-xl md:text-3xl text-white max-w-5xl mx-auto mb-14 font-display font-medium leading-tight">
              O futuro da leitura, interpretação e aplicação da Palavra de Deus sob a ação poderosa do Espírito Santo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/biblioteca"
                className="inline-flex items-center gap-3 px-10 py-5 bg-brand-blue text-white text-lg font-black rounded-full
                  hover:bg-white hover:text-brand-blue transition-all hover:scale-105 active:scale-95
                  shadow-[0_0_40px_rgba(59,130,246,0.4)]"
              >
                ACESSAR <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                O PROBLEMA DA <span className="text-brand-rose text-shadow-rose">LEITURA LINEAR</span>
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
                As pessoas leem a Bíblia, mas muitas vezes não enxergam sua estrutura, seu fluxo e seu centro. A leitura superficial ignora a arquitetura divina do texto.
              </p>
              <div className="p-6 glass rounded-2xl border-l-4 border-brand-rose shadow-[0_0_15px_rgba(255,45,85,0.1)]">
                <p className="italic text-white/80">
                  "Sem estrutura, a interpretação torna-se subjetiva. Com estrutura, a revelação torna-se clara."
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video glass rounded-3xl overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-rose/20 to-transparent" />
              <div className="text-center p-8">
                <Zap className="w-16 h-16 text-brand-rose mx-auto mb-4 animate-bounce drop-shadow-[0_0_10px_rgba(255,45,85,0.5)]" />
                <p className="font-display font-bold text-xl">FALTA DE PROFUNDIDADE</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 relative aspect-video glass rounded-3xl overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-transparent" />
              <div className="text-center p-8">
                <Layout className="w-16 h-16 text-brand-blue mx-auto mb-4 animate-pulse" />
                <p className="font-display font-bold text-xl">VISÃO ESTRUTURAL</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                A SOLUÇÃO: <span className="text-brand-blue">DIAGRAMAS</span>
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                Com o sistema dos Diagramas, você enxerga o texto como Deus organizou. Nossa plataforma transforma versículos em estruturas lógicas que revelam o fluxo do pensamento bíblico.
              </p>
              <Link to="/metodo" className="inline-flex items-center gap-2 text-brand-blue font-bold hover:underline">
                Conheça os Diagramas <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          {/* 20 Diagrams Resume Section */}
          <div className="mt-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 uppercase tracking-tighter">
                OS <span className="text-brand-purple">DIAGRAMAS</span> DE EXEGESE
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Uma metodologia científica e teológica que esgota o texto através de perspectivas únicas.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {[
                { n: "01", t: "Interlinear", d: "Texto Original", icon: Languages },
                { n: "02", t: "Morfológico", d: "Gramática", icon: Zap },
                { n: "03", t: "Quiástico", d: "Simetria", icon: Target },
                { n: "04", t: "Sintático", d: "Estrutura", icon: Layout },
                { n: "05", t: "Semântico", d: "Significado", icon: Activity },
                { n: "06", t: "Progressivo", d: "Fluxo", icon: ArrowRightCircle },
                { n: "07", t: "Intensificação", d: "Clímax", icon: Flame },
                { n: "08", t: "Espacial", d: "Dimensões", icon: Compass },
                { n: "09", t: "Acesso", d: "Autoridade", icon: ShieldCheck },
                { n: "10", t: "Relacional", d: "Vínculos", icon: Users },
                { n: "11", t: "Cristológico", d: "Foco em Cristo", icon: Cross },
                { n: "12", t: "Sistemático", d: "Doutrina", icon: BookOpen },
                { n: "13", t: "Tensão", d: "Resolução", icon: AlertTriangle },
                { n: "14", t: "Repetição", d: "Ênfase", icon: Repeat },
                { n: "15", t: "Causa/Efeito", d: "Lógica", icon: Zap },
                { n: "16", t: "Apologético", d: "Defesa", icon: ShieldAlert },
                { n: "17", t: "Perguntas", d: "Investigação", icon: MessageSquare },
                { n: "18", t: "Autoral", d: "Comentários", icon: PenTool },
                { n: "19", t: "Homilético", d: "Pregação", icon: Mic2 },
                { n: "20", t: "Pastoral", d: "Vida Prática", icon: Heart },
                { n: "21", t: "Psicológico", d: "Existência", icon: UserCheck },
                { n: "22", t: "Familiar", d: "Família", icon: HomeIcon },
                { n: "23", t: "Trinitário", d: "Trindade", icon: Shield },
              ].map((d, i) => {
                const colors = ['brand-blue', 'brand-purple', 'brand-rose'];
                const color = colors[i % colors.length];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className={cn(
                      "glass p-4 md:p-6 rounded-[1.2rem] md:rounded-[1.5rem] border border-white/30 hover:scale-105 bg-white/10 transition-all text-center group cursor-default shadow-2xl flex flex-col items-center",
                      i % 3 === 0 ? "hover:border-brand-blue" : i % 3 === 1 ? "hover:border-brand-purple" : "hover:border-brand-rose"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                      i % 3 === 0 ? "bg-brand-blue/10 text-brand-blue" : i % 3 === 1 ? "bg-brand-purple/10 text-brand-purple" : "bg-brand-rose/10 text-brand-rose"
                    )}>
                      <d.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    
                    <h4 className={cn(
                      "text-xs md:text-sm font-black text-white transition-all leading-tight uppercase tracking-tight drop-shadow-md",
                      i % 3 === 0 ? "group-hover:text-brand-blue" : i % 3 === 1 ? "group-hover:text-brand-purple" : "group-hover:text-brand-rose"
                    )}>{d.t}</h4>
                    <p className="mt-1 text-[8px] md:text-[10px] font-bold text-white/70 group-hover:text-white transition-colors uppercase tracking-[0.1em]">{d.d}</p>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/metodo" className="inline-flex items-center gap-2 px-8 py-3 glass rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
                Ver Detalhes dos Diagramas <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section - The Transformational Power */}
      <section className="py-24 relative overflow-hidden" id="impacto">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-rose/5 -z-10 blur-[120px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-black mb-6 uppercase tracking-tighter"
            >
              A TRANSFORMAÇÃO NA SUA <span className="text-brand-rose">CAMINHADA COM CRISTO</span>
            </motion.h2>
            <p className="text-white/80 text-xl max-w-3xl mx-auto font-light">
              Os diagramas não são apenas desenhos; são lentes que corrigem sua visão espiritual para que você deixe de ler superficialmente e comece a contemplar a glória de Deus em cada versículo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Clareza Absoluta",
                desc: "Saia da confusão mental e entenda exatamente o fluxo lógico do pensamento divino em cada linha do texto sagrado.",
                icon: Zap,
                color: "brand-blue"
              },
              {
                title: "Foco Cristocêntrico",
                desc: "Treine seus olhos para enxergar como cada palavra, estrutura e padrão aponta diretamente para a glória e o sacrifício de Jesus.",
                icon: Layout,
                color: "brand-purple"
              },
              {
                title: "Raízes Teológicas",
                desc: "Desenvolva uma mente bíblica sólida, fundamentada na estrutura real da Palavra, tornando-se imune a distorções e ventos de doutrina.",
                icon: ArrowRight,
                color: "brand-rose"
              },
              {
                title: "Oração Estruturada",
                desc: "Transforme seu tempo com Deus ao orar baseado na arquitetura real do texto, gerando uma comunhão profunda e bíblica.",
                icon: ChevronRight,
                color: "brand-blue"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-[2.5rem] border border-white/10 hover:border-brand-rose/30 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-${item.color}/10 flex items-center justify-center text-${item.color} mb-8 group-hover:scale-110 transition-transform shadow-xl shadow-${item.color}/5`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4 uppercase tracking-tighter">{item.title}</h3>
                <p className="text-white/80 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different Section */}

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-12 rounded-[40px] border-brand-purple/20 shadow-[0_0_50px_rgba(123,47,247,0.1)]"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
              POR QUE ESTE MÉTODO É DIFERENTE?
            </h2>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/90 italic">
              "Não é devocional. Não é opinião. É estrutura, revelação e <span className="text-brand-purple font-bold">Cristo no centro</span>."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Clube Section */}
      <section className="py-24 relative overflow-hidden" id="clube">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-rose/10 blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-16 rounded-[2rem] md:rounded-[4rem] border-2 border-brand-rose/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-brand-rose/5 group-hover:bg-brand-rose/10 transition-colors" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-rose/10 rounded-full border border-brand-rose/20 w-fit">
                  <Zap className="w-4 h-4 text-brand-rose" />
                  <span className="text-[10px] font-black text-brand-rose uppercase tracking-[0.2em]">Oportunidade Gratuita</span>
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-display font-black text-white leading-tight uppercase tracking-tighter">
                    FAÇA PARTE DO <span className="text-brand-rose">CLUBE DA BÍBLIA VISUAL</span>
                  </h2>
                  <p className="text-xl text-white font-medium leading-relaxed">
                    Um espaço exclusivo onde você estará sempre aprendendo sobre a Bíblia Visual, enriquecendo seu conhecimento e crescendo com uma comunidade que busca a profundidade das Escrituras.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a 
                    href="https://chat.whatsapp.com/HEIIFYAmLij62M0jRwwVhH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-4 px-10 py-5 bg-brand-rose text-white text-lg font-black rounded-full hover:bg-white hover:text-brand-rose transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,45,85,0.4)]"
                  >
                    ENTRAR GRATUITAMENTE <ChevronRight className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 pt-12">
                    <div className="h-40 glass rounded-3xl border border-white/10 flex items-center justify-center">
                      <Layout className="w-12 h-12 text-white/5 opacity-50" />
                    </div>
                    <div className="h-40 glass rounded-3xl border border-white/10 flex items-center justify-center">
                      <Zap className="w-12 h-12 text-white/5 opacity-50" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-40 glass rounded-3xl border border-white/10 flex items-center justify-center">
                      <ArrowRight className="w-12 h-12 text-white/5 opacity-50" />
                    </div>
                    <div className="h-40 glass rounded-3xl border border-white/10 flex items-center justify-center">
                      <ChevronRight className="w-12 h-12 text-white/5 opacity-50" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-blue/5 -z-10" />
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-12">
            PRONTO PARA <span className="text-brand-blue">MERGULHAR</span>?
          </h2>
        </div>
      </section>

      {/* Visual Showcase Section */}
      <section className="py-32 relative overflow-hidden bg-white/[0.01]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 rounded-full border border-brand-blue/20 mb-6"
            >
              <Layout className="w-4 h-4 text-brand-blue" />
              <span className="text-[10px] font-black text-brand-blue uppercase tracking-[0.2em]">Estética do Futuro</span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-display font-black mb-6 uppercase tracking-tighter">
              A ARQUITETURA <span className="text-brand-blue">DA REVELAÇÃO</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto font-medium">
              Não são apenas estudos, são representações visuais da estrutura eterna da Palavra de Deus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Simetria Quiástica",
                type: "Estrutura Literária",
                color: "brand-blue",
                delay: 0.1
              },
              {
                title: "Conexão Trinitária",
                type: "Revelação Teológica",
                color: "brand-purple",
                delay: 0.2
              },
              {
                title: "Fluxo Expositivo",
                type: "Lógica Homilética",
                color: "brand-rose",
                delay: 0.3
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay, duration: 0.8 }}
                className="glass rounded-[2rem] p-8 border border-white/5 hover:border-white/10 transition-all flex flex-col items-center group relative overflow-hidden"
              >
                {/* Futuristic Diagram Background Visualization */}
                <div className="w-full aspect-square relative mb-8 flex items-center justify-center">
                  <div className={`absolute inset-0 bg-${item.color}/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                  
                  {/* Abstract Diagram Representation */}
                  <svg width="200" height="200" viewBox="0 0 200 200" className="relative z-10">
                    <defs>
                      <linearGradient id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" className={`stop-${item.color}`} style={{ stopColor: i === 0 ? '#00d4ff' : i === 1 ? '#a855f7' : '#ff2d55' }} />
                        <stop offset="100%" stopColor="transparent" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    
                    {i === 0 && ( // Chiasm
                      <motion.g animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }}>
                        {/* Recursive lines */}
                        <path d="M40,40 L160,40 L100,100 L160,160 L40,160 L100,100 Z" stroke={`url(#grad-${i})`} strokeWidth="1" fill="none" />
                        <circle cx="100" cy="100" r="4" fill="#00d4ff" className="animate-pulse" />
                        <circle cx="40" cy="40" r="2" fill="white" fillOpacity="0.3" />
                        <circle cx="160" cy="40" r="2" fill="white" fillOpacity="0.3" />
                        <circle cx="160" cy="160" r="2" fill="white" fillOpacity="0.3" />
                        <circle cx="40" cy="160" r="2" fill="white" fillOpacity="0.3" />
                      </motion.g>
                    )}
                    
                    {i === 1 && ( // Trinity Node
                      <motion.g animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
                        <path d="M100,40 L160,140 L40,140 Z" stroke={`url(#grad-${i})`} strokeWidth="1" fill="none" />
                        <circle cx="100" cy="100" r="50" stroke="white" strokeOpacity="0.05" fill="none" strokeDasharray="4 4" />
                        <circle cx="100" cy="40" r="6" fill="#a855f7" className="shadow-2xl shadow-brand-purple" />
                        <circle cx="160" cy="140" r="6" fill="#a855f7" />
                        <circle cx="40" cy="140" r="6" fill="#a855f7" />
                        <line x1="100" y1="40" x2="100" y2="100" stroke="white" strokeOpacity="0.1" />
                        <line x1="160" y1="140" x2="100" y2="100" stroke="white" strokeOpacity="0.1" />
                        <line x1="40" y1="140" x2="100" y2="100" stroke="white" strokeOpacity="0.1" />
                      </motion.g>
                    )}
                    
                    {i === 2 && ( // Flow
                      <motion.g>
                        {[20, 60, 100, 140, 180].map((y, idx) => (
                          <motion.rect 
                            key={idx}
                            x="40" y={y-10} width={120 - idx * 15} height="4" rx="2"
                            fill={`url(#grad-${i})`}
                            initial={{ width: 0 }}
                            whileInView={{ width: 120 - idx * 15 }}
                            transition={{ delay: 0.5 + idx * 0.1, duration: 1 }}
                          />
                        ))}
                        <line x1="40" y1="10" x2="40" y2="190" stroke="white" strokeOpacity="0.1" strokeDasharray="2 2" />
                        <motion.circle 
                          animate={{ y: [0, 180, 0] }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                          cx="40" cy="10" r="3" fill="#ff2d55" 
                        />
                      </motion.g>
                    )}
                  </svg>
                </div>

                <div className="text-center">
                  <span className="text-[10px] font-mono text-white/60 uppercase tracking-[0.3em] block mb-2">{item.type}</span>
                  <h3 className="text-xl font-display font-black text-white uppercase tracking-tight group-hover:text-white transition-colors">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 glass p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-bg-deep bg-brand-blue/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-[10px] font-black text-brand-blue">D{i}</span>
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-sm">Biblioteca em Expansão</p>
                <p className="text-white/70 text-xs mt-1">Novos diagramas adicionados mensalmente.</p>
              </div>
            </div>
            <Link to="/metodo" className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full text-xs font-black uppercase tracking-widest transition-all">
              Ver Metodologia Completa
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
