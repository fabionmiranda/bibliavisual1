import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Layout,
  Languages,
  HelpCircle,
  Cross,
  ArrowRight,
  ChevronDown,
  Zap,
  Target,
  Flame,
  ShieldCheck,
  Compass,
  Activity,
  Award,
  Volume2,
  ArrowRightCircle,
  AlertTriangle,
  Repeat,
  ShieldAlert,
  MessageSquare,
  PenTool,
  Mic2,
  Heart,
  Users,
  Info,
  Download,
  FileDown
} from 'lucide-react';
import { EstudoCapitulo } from '../types/bible';
import { cn } from '../lib/utils';

interface ChapterStudyProps {
  estudo: EstudoCapitulo;
}

const parts = [
  { id: 'intro', title: 'Introdução', icon: Info, phrase: 'Visão geral e objetivos fundamentais', color: 'border-brand-blue/40 text-brand-blue bg-brand-blue/10 hover:bg-brand-blue/20' },
  { id: 'interlinear', title: 'Interlinear', icon: Languages, phrase: 'O que o texto realmente diz em sua forma original?', color: 'border-brand-purple/40 text-brand-purple bg-brand-purple/10 hover:bg-brand-purple/20' },
  { id: 'morfologico', title: 'Morfológico-Lexical', icon: Zap, phrase: 'Que tipo de palavras e formas revelam a precisão teológica?', color: 'border-brand-rose/40 text-brand-rose bg-brand-rose/10 hover:bg-brand-rose/20' },
  { id: 'quiastico', title: 'Quiástico', icon: Target, phrase: 'Como o texto está estruturado e seu centro de ênfase?', color: 'border-brand-blue/40 text-brand-blue bg-brand-blue/10 hover:bg-brand-blue/20' },
  { id: 'sintatico', title: 'Sintático', icon: Layout, phrase: 'Quem faz o quê no texto e como as ações estão organizadas?', color: 'border-brand-purple/40 text-brand-purple bg-brand-purple/10 hover:bg-brand-purple/20' },
  { id: 'semantico', title: 'Semântico', icon: Activity, phrase: 'Qual é o fluxo de significado e a lógica das ideias do texto?', color: 'border-brand-rose/40 text-brand-rose bg-brand-rose/10 hover:bg-brand-rose/20' },
  { id: 'progressivo', title: 'Progressivo', icon: ArrowRightCircle, phrase: 'Como o texto avança passo a passo até seu objetivo final?', color: 'border-brand-blue/40 text-brand-blue bg-brand-blue/10 hover:bg-brand-blue/20' },
  { id: 'intensificacao', title: 'Intensificação', icon: Flame, phrase: 'Onde o texto aumenta o peso, a gravidade ou a exigência?', color: 'border-brand-purple/40 text-brand-purple bg-brand-purple/10 hover:bg-brand-purple/20' },
  { id: 'espacial', title: 'Espacial', icon: Compass, phrase: 'Em quais esferas (humana, social, divina) o texto se move?', color: 'border-brand-rose/40 text-brand-rose bg-brand-rose/10 hover:bg-brand-rose/20' },
  { id: 'acesso', title: 'Acesso', icon: ShieldCheck, phrase: 'Quem pode agir, como agir e os limites diante de Deus?', color: 'border-brand-blue/40 text-brand-blue bg-brand-blue/10 hover:bg-brand-blue/20' },
  { id: 'relacional', title: 'Relacional', icon: Users, phrase: 'Quais relações são rompidas, afetadas ou restauradas?', color: 'border-brand-purple/40 text-brand-purple bg-brand-purple/10 hover:bg-brand-purple/20' },
  { id: 'cristologico', title: 'Cristológico', icon: Cross, phrase: 'Como este texto aponta para ou se cumpre em Cristo?', color: 'border-brand-rose/40 text-brand-rose bg-brand-rose/10 hover:bg-brand-rose/20' },
  { id: 'sistematico', title: 'Sistemático', icon: BookOpen, phrase: 'Que doutrinas estão presentes e como se conectam ao todo?', color: 'border-brand-blue/40 text-brand-blue bg-brand-blue/10 hover:bg-brand-blue/20' },
  { id: 'tensao', title: 'Tensão', icon: AlertTriangle, phrase: 'Qual é o problema central do texto e como ele é resolvido?', color: 'border-brand-purple/40 text-brand-purple bg-brand-purple/10 hover:bg-brand-purple/20' },
  { id: 'repeticao', title: 'Repetição', icon: Repeat, phrase: 'O que o texto enfatiza por meio de repetições?', color: 'border-brand-rose/40 text-brand-rose bg-brand-rose/10 hover:bg-brand-rose/20' },
  { id: 'causa-efeito', title: 'Causa e Efeito', icon: Zap, phrase: 'O que gera o quê dentro da lógica moral e teológica?', color: 'border-brand-blue/40 text-brand-blue bg-brand-blue/10 hover:bg-brand-blue/20' },
  { id: 'apologetico', title: 'Apologético', icon: ShieldAlert, phrase: 'Que erros, objeções ou visões distorcidas o texto corrige?', color: 'border-brand-purple/40 text-brand-purple bg-brand-purple/10 hover:bg-brand-purple/20' },
  { id: 'perguntas', title: 'Perguntas', icon: MessageSquare, phrase: 'Que perguntas o próprio texto exige que façamos?', color: 'border-brand-rose/40 text-brand-rose bg-brand-rose/10 hover:bg-brand-rose/20' },
  { id: 'autoral', title: 'Autoral', icon: PenTool, phrase: 'Como diferentes intérpretes entenderam cada parte?', color: 'border-brand-blue/40 text-brand-blue bg-brand-blue/10 hover:bg-brand-blue/20' },
  { id: 'homiletico', title: 'Homilético', icon: Mic2, phrase: 'Como esse texto deve ser pregado de forma fiel?', color: 'border-brand-purple/40 text-brand-purple bg-brand-purple/10 hover:bg-brand-purple/20' },
  { id: 'pastoral', title: 'Pastoral prático', icon: Heart, phrase: 'Como esse texto deve ser vivido na vida da igreja?', color: 'border-brand-rose/40 text-brand-rose bg-brand-rose/10 hover:bg-brand-rose/20' },
  { id: 'antropologico', title: 'Antropológico', icon: Award, phrase: 'Análise multinível da condição humana diante do texto', color: 'border-brand-blue/40 text-brand-blue bg-brand-blue/10 hover:bg-brand-blue/20' },
  { id: 'familiar', title: 'Familiar', icon: Users, phrase: 'A dinâmica da santidade e restauração no lar', color: 'border-brand-purple/40 text-brand-purple bg-brand-purple/10 hover:bg-brand-purple/20' },
  { id: 'trinitario', title: 'Trinitário', icon: ShieldCheck, phrase: 'A ação conjunta do Pai, Filho e Espírito Santo', color: 'border-brand-rose/40 text-brand-rose bg-brand-rose/10 hover:bg-brand-rose/20' },
];

export default function ChapterStudy({ estudo }: ChapterStudyProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activePart = searchParams.get('parte') || 'intro';
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const setActivePart = (id: string) => {
    setSearchParams({ parte: id });
    setIsMenuOpen(false);
  };

  const activePartData = parts.find(p => p.id === activePart) || parts[0];

  const downloadDiagramsAsTxt = () => {
    const d = estudo.diagramas20;
    if (!d) return;

    let text = `BÍBLIA VISUAL EXPOSITIVA\n`;
    text += `ESTUDO: ${estudo.referencia || 'Diagramas Elite'}\n`;
    text += `DATA: ${new Date().toLocaleDateString('pt-BR')}\n`;
    text += `==========================================\n\n`;

    // 0. Introdução
    if (d.introducao) {
      text += `--- INTRODUÇÃO ---\n`;
      text += `VISÃO: ${d.introducao.texto}\n`;
      text += `OBJETIVO: ${d.introducao.objetivo}\n\n`;
    }

    // 1. Interlinear
    text += `INTERLINEAR (BHS)\n`;
    d.interlinear.secoes.forEach(s => {
      text += `[${s.ref}] Hebraico: ${s.hebraico} | Transliteração: ${s.transliteracao} | Tradução: ${s.traducao}\n`;
    });
    text += `Explicação: ${d.interlinear.explicacao}\n\n`;

    // 2. Morfológico
    text += `MORFOLÓGICO-LEXICAL\n`;
    d.morfologicoLexical.termos.forEach(t => {
      text += `${t.termo} (${t.transliteracao}): ${t.significado} ${t.ref ? `[${t.ref}]` : ''}\n`;
    });
    text += `Explicação: ${d.morfologicoLexical.explicacao}\n\n`;

    // 3. Quiástico
    text += `QUIÁSTICO\n`;
    d.quiastico.blocos.forEach(b => {
      text += `[${b.label}] ${b.ref}: ${b.conteudo}\n`;
    });
    text += `Explicação: ${d.quiastico.explicacao}\n\n`;

    // 4. Sintático
    text += `SINTÁTICO\n`;
    d.sintatico.blocos.forEach(b => {
      text += `[${b.label}] ${b.ref}: Sujeito: ${b.sujeito} | Verbos: ${b.verbos}\n`;
    });
    text += `Explicação: ${d.sintatico.explicacao}\n\n`;

    // 5. Semântico
    text += `SEMÂNTICO\n`;
    d.semantico.fluxo.forEach(f => {
      text += `[${f.ref}] Ideia: ${f.ideia}\n`;
    });
    text += `Explicação: ${d.semantico.explicacao}\n\n`;

    // 6. Progressivo
    text += `PROGRESSIVO\n`;
    d.progressivo.etapas.forEach((e, i) => {
      text += `Etapa ${i + 1} [${e.ref}]: ${e.acao}\n`;
    });
    text += `Explicação: ${d.progressivo.explicacao}\n\n`;

    // 7. Intensificação
    text += `INTENSIFICAÇÃO\n`;
    d.intensificacao.niveis.forEach(n => {
      text += `[${n.ref}] Foco: ${n.foco}\n`;
    });
    text += `Explicação: ${d.intensificacao.explicacao}\n\n`;

    // 8. Espacial
    text += `8. ESPACIAL\n`;
    d.espacial.esferas.forEach(e => {
      text += `[${e.ref}] Esfera: ${e.esfera}\n`;
    });
    text += `Explicação: ${d.espacial.explicacao}\n\n`;

    // 9. Acesso
    text += `9. ACESSO\n`;
    d.acesso.permissoes.forEach(p => {
      text += `[${p.ref}] Permissão: ${p.acao}\n`;
    });
    text += `Explicação: ${d.acesso.explicacao}\n\n`;

    // 10. Relacional
    text += `10. RELACIONAL\n`;
    d.relacional.vinculos.forEach(v => {
      text += `[${v.ref}] Status: ${v.status}\n`;
    });
    text += `Explicação: ${d.relacional.explicacao}\n\n`;

    // 11. Cristológico
    text += `11. CRISTOLÓGICO\n`;
    d.cristologico.conexoes.forEach(c => {
      text += `[${c.ref}] Conexão: ${c.apontaPara}\n`;
    });
    text += `Explicação: ${d.cristologico.explicacao}\n\n`;

    // 12. Sistemático
    text += `12. SISTEMÁTICO\n`;
    d.sistematico.doutrinas.forEach(d_ => {
      text += `[${d_.ref}] Doutrina: ${d_.doutrina}\n`;
    });
    text += `Explicação: ${d.sistematico.explicacao}\n\n`;

    // 13. Tensão
    text += `13. TENSÃO\n`;
    d.tensao.movimento.forEach(m => {
      text += `[${m.ref}] Estado: ${m.estado}\n`;
    });
    text += `Explicação: ${d.tensao.explicacao}\n\n`;

    // 14. Repetição
    text += `14. REPETIÇÃO\n`;
    d.repeticao.padroes.forEach(p => {
      text += `[${p.ref}] Padrão: ${p.tema}\n`;
    });
    text += `Explicação: ${d.repeticao.explicacao}\n\n`;

    // 15. Causa e Efeito
    text += `15. CAUSA E EFEITO\n`;
    d.causaEfeito.logica.forEach(l => {
      text += `[${l.ref}] Ação: ${l.acao} -> Consequência: ${l.consequencia}\n`;
    });
    text += `Explicação: ${d.causaEfeito.explicacao}\n\n`;

    // 16. Apologético
    text += `16. APOLOGÉTICO\n`;
    d.apologetico.confrontos.forEach(c => {
      text += `[${c.ref}] Tema: ${c.tema} | Heresias/Combate: ${c.heresias.join(', ')}\n`;
    });
    text += `Explicação: ${d.apologetico.explicacao}\n\n`;

    // 17. Perguntas
    text += `17. PERGUNTAS AO TEXTO\n`;
    d.perguntas.secoes.forEach(s => {
      text += `${s.titulo} [${s.ref}]:\n`;
      s.perguntas.forEach(p => text += ` - ${p}\n`);
    });
    text += `Explicação: ${d.perguntas.explicacao}\n\n`;

    // 18. Autoral
    text += `18. AUTORAL\n`;
    d.autoral.contribuicoes.forEach(c => {
      text += `${c.titulo} [${c.label} - ${c.ref}]:\n`;
      c.autores.forEach(a => text += `  ${a.nome}: "${a.comentario}"\n`);
    });
    text += `Explicação: ${d.autoral.explicacao}\n\n`;

    // 19. Homilético
    text += `19. HOMILÉTICO\n`;
    text += `Tema Central: ${d.homiletico.temaCentral}\n`;
    d.homiletico.esboço.forEach(e => {
      text += `${e.label} [${e.ref}]: ${e.ponto}\n`;
    });
    text += `Explicação: ${d.homiletico.explicacao}\n\n`;

    // 20. Pastoral
    text += `20. PASTORAL PRÁTICO\n`;
    d.pastoralPratico.direcionamentos.forEach(d_ => {
      text += `${d_.titulo} [${d_.ref}]:\n`;
      text += `  Adultos: ${d_.adultos}\n`;
      text += `  Jovens: ${d_.jovens}\n`;
      text += `  Igreja: ${d_.igreja}\n`;
    });
    text += `\nExplicação Final: ${d.pastoralPratico.explicacao}\n\n`;

    // 21. Antropológico
    if (d.antropologico && d.antropologico.secoes.length > 0) {
      text += `21. ANTROPOLÓGICO\n`;
      d.antropologico.secoes.forEach(s => {
        text += `${s.ref} — ${s.titulo}\n`;
        s.analises.forEach(a => {
          text += `${a.nivel}: → ${a.conteudo}\n`;
        });
        text += `\n`;
      });
      text += `Explicação: ${d.antropologico.explicacao}\n\n`;
    }

    // 22. Familiar
    if (d.familiar && d.familiar.secoes.length > 0) {
      text += `22. FAMILIAR\n`;
      d.familiar.secoes.forEach(s => {
        text += `${s.ref}\n`;
        text += `Família: ${s.familia}\n`;
        text += `→ ${s.fluxo}\n\n`;
      });
      text += `Explicação: ${d.familiar.explicacao}\n\n`;
    }

    // 23. Trinitário
    if (d.trinitario && d.trinitario.secoes.length > 0) {
      text += `23. TRINITÁRIO\n`;
      d.trinitario.secoes.forEach(s => {
        text += `${s.ref}\n`;
        text += `${s.titulo.toUpperCase()} → ${s.fluxo}\n`;
        text += `(Pai: ${s.pai} | Filho: ${s.filho} | Espírito: ${s.espirito})\n\n`;
      });
      text += `Explicação: ${d.trinitario.explicacao}\n\n`;
    }

    text += `==========================================\n`;
    text += `BIBLIA VISUAL EXPOSITIVA\n`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // Create filename like Levitico1.txt
    const filename = (estudo.referencia || 'estudo').replace(/\s+/g, '') + '.txt';
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const playHebrewAudio = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'he-IL';
    utterance.rate = 0.7;
    const voices = window.speechSynthesis.getVoices();
    const hebrewVoice = voices.find(v => v.lang.includes('he-IL') || v.lang.includes('he'));
    if (hebrewVoice) utterance.voice = hebrewVoice;
    window.speechSynthesis.speak(utterance);
  };

  if (!estudo.diagramas20) return null;

  return (
    <div className="w-full space-y-12 pb-20">

      <div className="glass rounded-2xl md:rounded-[2.5rem] p-4 md:p-8 border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 md:h-1.5 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-rose shadow-[0_0_15px_rgba(0,212,255,0.3)]" />
        
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 md:gap-5">
              <div className={cn(
                "w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 ring-4 ring-white/5 bg-white/5",
                activePartData.color.split(' ')[1] // text color class
              )}>
                <activePartData.icon className="w-6 h-6 md:w-9 md:h-9" />
              </div>
              <div className="space-y-0.5 md:space-y-1">
                <h3 className={cn(
                  "text-xl sm:text-2xl md:text-3xl font-display font-black tracking-widest uppercase italic drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]",
                  activePartData.color.split(' ')[1]
                )}>
                  {activePartData.title}
                </h3>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={cn(
                        "w-1.5 h-1.5 md:w-2 md:h-2 rounded-full",
                        i < (parts.indexOf(activePartData) % 5 + 1)
                          ? cn(activePartData.color.split(' ')[1], "bg-current shadow-[0_0_8px_currentColor]")
                          : "bg-white/20"
                      )} />
                    ))}
                  </div>
                  <p className="text-[10px] md:text-sm text-white font-black uppercase tracking-[0.4em] drop-shadow-md">Módulo {Math.floor(parts.indexOf(activePartData) / 5) + 1}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
              <motion.a
                href={`https://wa.me/5535997567535?text=-%20Gostaria%20receber%20o%20inforgrafico%20completo%20do%20capitulo%20${encodeURIComponent(estudo.referencia || '')}%20-`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0, 212, 255, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-brand-blue border-2 border-white/40 rounded-xl text-[10px] md:text-xs font-black text-bg-deep uppercase tracking-widest hover:bg-white transition-all shadow-2xl"
              >
                <Download className="w-4 h-4 md:w-5 md:h-5" />
                BAIXAR INFOGRÁFICO
              </motion.a>

              <motion.button
                onClick={downloadDiagramsAsTxt}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 45, 85, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-brand-rose border-2 border-white/40 rounded-xl text-[10px] md:text-xs font-black text-white uppercase tracking-widest hover:bg-white hover:text-brand-rose transition-all shadow-2xl"
              >
                <FileDown className="w-4 h-4 md:w-5 md:h-5" />
                BAIXAR DIAGRAMAS
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {parts.map((part, index) => (
              <motion.button
                key={part.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActivePart(part.id)}
                className={cn(
                  "flex flex-col p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all text-left relative overflow-hidden group min-h-[90px] md:min-h-[120px]",
                  activePart === part.id 
                    ? cn(part.color.replace('/40', '/60').replace('/10', '/100'), "shadow-2xl ring-2 ring-white/30 text-white")
                    : cn(part.color, "border-white/10 hover:bg-opacity-30")
                )}
              >
                <div className="flex items-start justify-between mb-2 md:mb-3">
                  <div className={cn(
                    "w-7 h-7 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all shadow-lg",
                    activePart === part.id 
                      ? "bg-white/30 text-white" 
                      : "bg-white/10"
                  )}>
                    <part.icon className="w-3.5 h-3.5 md:w-5 md:h-5" />
                  </div>
                  <span className={cn(
                    "text-[7px] md:text-[10px] font-black tracking-widest transition-colors",
                    activePart === part.id ? "text-white" : "text-white group-hover:text-white"
                  )}>
                    {index === 0 ? 'INTRO' : String(index).padStart(2, '0')}
                  </span>
                </div>
                
                <div className="space-y-0.5 md:space-y-1">
                  <div className={cn(
                    "text-[10px] md:text-sm font-black tracking-tight truncate transition-colors",
                    activePart === part.id ? "text-white" : "brightness-125"
                  )}>
                    {part.title.split('. ').length > 1 ? part.title.split('. ')[1] : part.title}
                  </div>
                  <div className={cn(
                    "text-[7px] md:text-[10px] leading-tight transition-opacity line-clamp-2 italic font-bold",
                    activePart === part.id ? "text-white/90" : "text-white group-hover:text-white"
                  )}>
                    {part.phrase}
                  </div>
                </div>
                
                {/* Active Indicator & Glow */}
                {activePart === part.id ? (
                  <motion.div 
                    layoutId="activeGlow" 
                    className={cn(
                      "absolute inset-0 opacity-20 pointer-events-none",
                      part.color.split(' ')[2].replace('bg-', 'bg-') // Uses the bg color class
                    )} 
                  />
                ) : (
                  <div className={cn(
                    "absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-40 transition-opacity",
                    part.color.split(' ')[2]
                  )} />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePart}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {activePart === 'intro' && (
              <div className="glass p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-blue relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-16 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <Info className="w-32 h-32 md:w-64 md:h-64" />
                </div>
                <div className="space-y-6 md:space-y-8 relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="inline-flex items-center gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20">
                      <Zap className="w-3 h-3 md:w-4 md:h-4 text-brand-blue" />
                      <span className="text-[8px] md:text-[10px] font-black text-brand-blue uppercase tracking-widest">Metodologia M.A.P.E.A.D.A.</span>
                    </div>
                    {estudo.referencia && (
                      <div className="bg-brand-blue text-bg-deep px-4 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl border-2 md:border-4 border-white/20 shadow-xl shadow-brand-blue/30 w-fit">
                        <span className="text-xs md:text-sm font-black uppercase tracking-widest">REFERÊNCIA: {estudo.referencia}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-display font-black text-white leading-tight max-w-2xl drop-shadow-lg tracking-tighter italic">Introdução aos Diagramas</h3>
                  
                  <div className="space-y-6 text-white/90 text-sm md:text-lg leading-relaxed max-w-4xl">
                    <p className="font-bold text-white text-lg md:text-2xl italic border-l-4 md:border-l-8 border-brand-blue pl-4 md:pl-8 bg-brand-blue/5 py-4 md:py-6 rounded-r-2xl md:rounded-r-3xl">
                      Quando uma pessoa lê um texto bíblico sem método, ela normalmente enxerga apenas a superfície. Ela percebe “assuntos”, “mandamentos”, “doutrinas” ou “aplicações”, mas não percebe a arquitetura interna da revelação.
                    </p>
                    <p>
                      O problema é que a Escritura não foi dada como uma coleção de pensamentos soltos. Ela foi dada como texto. E texto tem forma, estrutura, progressão, relações internas, escolhas lexicais, ordem sintática, tensão teológica, centro retórico e finalidade espiritual.
                    </p>
                    <p>
                      Por isso, os diagramas não são enfeites acadêmicos. Eles são instrumentos de leitura. Cada diagrama responde a uma pergunta diferente sobre o texto. Um pergunta: “como o texto está organizado?” Outro pergunta: “quais palavras sustentam sua teologia?” Outro pergunta: “quem age em cada linha?” Outro pergunta: “como o texto se move do problema para a solução?” Outro pergunta: “como isso se cumpre em Cristo?” Outro pergunta: “como isso confronta erros doutrinários?” E assim por diante.
                    </p>
                    <p>
                      O grande valor do sistema é que ele impede dois extremos. O primeiro extremo é a leitura rasa, que só vê o assunto geral. O segundo extremo é a leitura fragmentada, que até observa detalhes, mas não consegue juntá-los. O conjunto dos diagramas forma uma leitura integral. Eles não competem entre si; eles se iluminam mutuamente.
                    </p>
                    
                    <div className="pt-8 space-y-4">
                      <h4 className="text-brand-blue font-black uppercase tracking-widest">Cada diagrama procura responder de forma didática e direta:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-[10px] md:text-sm font-bold text-white">
                        <li><span className="text-brand-blue font-black">Interlinear</span> → O que o texto realmente diz em sua forma original?</li>
                        <li><span className="text-brand-blue font-black">Morfológico-lexical</span> → Que tipo de palavras e formas revelam a precisão teológica?</li>
                        <li><span className="text-brand-blue font-black">Quiástico</span> → Como o texto está estruturado e onde está o seu centro de ênfase?</li>
                        <li><span className="text-brand-blue font-black">Sintático</span> → Quem faz o quê no texto e como as ações estão organizadas?</li>
                        <li><span className="text-brand-blue font-black">Semântico</span> → Qual é o fluxo de significado e a lógica das ideias do texto?</li>
                        <li><span className="text-brand-blue font-black">Progressivo</span> → Como o texto avança passo a passo até seu objetivo final?</li>
                        <li><span className="text-brand-blue font-black">Intensificação</span> → Onde o texto aumenta o peso, a gravidade ou a exigência?</li>
                        <li><span className="text-brand-blue font-black">Espacial</span> → Em quais esferas (humana, social, divina) o texto se move?</li>
                        <li><span className="text-brand-blue font-black">Acesso</span> → Quem pode agir, como pode agir e quais são os limites diante de Deus?</li>
                        <li><span className="text-brand-blue font-black">Relacional</span> → Quais relações são rompidas, afetadas ou restauradas?</li>
                        <li><span className="text-brand-blue font-black">Cristológico</span> → Como este texto aponta para ou se cumpre em Cristo?</li>
                        <li><span className="text-brand-blue font-black">Sistemático</span> → Que doutrinas estão presentes e como se conectam ao todo da teologia bíblica?</li>
                        <li><span className="text-brand-blue font-black">Tensão</span> → Qual é o problema central do texto e como ele é resolvido?</li>
                        <li><span className="text-brand-blue font-black">Repetição</span> → O que o texto enfatiza por meio de repetição de ideias ou temas?</li>
                        <li><span className="text-brand-blue font-black">Causa e efeito</span> → O que gera o quê dentro da lógica moral e teológica do texto?</li>
                        <li><span className="text-brand-blue font-black">Apologético</span> → Que erros, objeções ou visões distorcidas o texto corrige?</li>
                        <li><span className="text-brand-blue font-black">Perguntas ao texto</span> → Que perguntas o próprio texto exige que façamos para compreendê-lo?</li>
                        <li><span className="text-brand-blue font-black">Autoral</span> → Como diferentes intérpretes entenderam cada parte do texto?</li>
                        <li><span className="text-brand-blue font-black">Homilético</span> → Como esse texto deve ser pregado de forma fiel e estruturada?</li>
                        <li><span className="text-brand-blue font-black">Pastoral prático</span> → Como esse texto deve ser vivido concretamente na vida da igreja?</li>
                        <li><span className="text-brand-blue font-black">Antropológico-Psicológico</span> → Como o texto bíblico descreve o ser humano em sua experiência existencial e relacional, e como Deus interpreta e resolve essa condição ao longo da história redentiva?</li>
                        <li><span className="text-brand-blue font-black">Familiar</span> → Como o texto bíblico orienta a forma como as relações familiares devem lidar com o erro, a responsabilidade e a restauração?</li>
                        <li><span className="text-brand-blue font-black">Trinitário</span> → Como a ação de Deus neste texto pode ser compreendida à luz da revelação do Pai, da obra redentiva do Filho e da atuação do Espírito Santo?</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePart === 'interlinear' && (
              <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-purple relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <Languages className="w-32 h-32 md:w-48 h-48" />
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-4 text-brand-purple">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-brand-purple/10 flex items-center justify-center">
                      <Languages className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className="font-black uppercase tracking-[0.4em] text-xs md:text-sm">01. Interlinear (BHS)</h3>
                      <p className="text-white text-[10px] md:text-xs mt-1 font-bold">{activePartData?.phrase}</p>
                    </div>
                  </div>
                  <div className="bg-brand-purple/10 px-4 md:px-6 py-1.5 md:py-2 rounded-lg md:rounded-xl border border-brand-purple/30 w-fit">
                    <span className="text-[10px] md:text-xs font-black text-brand-purple uppercase tracking-widest">Base: Biblia Hebraica Stuttgartensia</span>
                  </div>
                </div>
                <div className="space-y-6 relative z-10">
                  {estudo.diagramas20.interlinear.secoes.map((s, i) => (
                    <div key={i} className="p-6 md:p-8 bg-white/[0.03] rounded-2xl md:rounded-[2.5rem] space-y-6 hover:bg-white/[0.06] transition-all border border-white/5 hover:border-brand-blue/30 group/item shadow-2xl">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <span className="text-[10px] md:text-sm font-black text-bg-deep uppercase tracking-widest bg-brand-blue px-4 md:px-8 py-2 md:py-2.5 rounded-lg md:rounded-xl shadow-xl shadow-brand-blue/20 border-2 border-white/10">VERSÍCULO {s.ref}</span>
                        <button 
                          onClick={() => playHebrewAudio(s.hebraico)}
                          className="flex items-center gap-2 md:gap-3 px-6 md:px-8 py-2.5 md:py-3 rounded-xl md:rounded-2xl bg-brand-rose text-white hover:bg-white hover:text-brand-rose transition-all text-[10px] md:text-xs font-black uppercase tracking-widest shadow-lg group/btn border-2 border-white/10"
                        >
                          <Volume2 className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/btn:scale-125 transition-transform" />
                          Pronúncia Hebraica
                        </button>
                      </div>
                      <div className="flex flex-col gap-6 md:gap-8 pb-4">
                        <div className="text-4xl sm:text-5xl md:text-6xl font-hebrew text-white text-right leading-relaxed drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] pr-2 md:pr-4" dir="rtl">
                          {s.hebraico}
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <div className="text-base md:text-xl text-brand-purple font-black italic font-mono tracking-widest bg-brand-purple/10 px-4 md:px-6 py-1 md:py-1.5 rounded-lg md:rounded-xl border border-brand-purple/20">{s.transliteracao}</div>
                          <div className="text-xl sm:text-2xl md:text-3xl text-white font-black leading-tight tracking-tight drop-shadow-md text-right max-w-2xl italic">"{s.traducao}"</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 md:p-10 bg-brand-blue/5 rounded-2xl md:rounded-[2.5rem] border-l-4 md:border-l-8 border-brand-blue relative z-10 shadow-inner">
                  <p className="text-white text-lg md:text-xl leading-relaxed font-bold italic opacity-90">
                    {estudo.diagramas20.interlinear.explicacao}
                  </p>
                </div>
              </div>
            )}

            {activePart === 'morfologico' && (
              <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-rose relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <Zap className="w-32 h-32 md:w-48 h-48" />
                </div>
                <div className="flex items-center justify-between text-brand-rose relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-rose/10 flex items-center justify-center">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold uppercase tracking-[0.3em] text-xs">2. Morfológico-Lexical</h3>
                      <p className="text-white text-[10px] md:text-xs mt-1 font-bold">{activePartData?.phrase}</p>
                    </div>
                  </div>
                  {estudo.diagramas20?.interlinear.secoes[0]?.ref && (
                    <span className="text-[10px] md:text-xs font-mono font-black bg-brand-rose/10 px-3 py-1 rounded-full border border-brand-rose/20">
                      Ref: {estudo.diagramas20.interlinear.secoes[0].ref.split(' ')[0]} {estudo.diagramas20.interlinear.secoes[0].ref.split(' ')[1]}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  {estudo.diagramas20.morfologicoLexical.termos.map((t, i) => (
                    <div key={i} className="p-4 md:p-6 bg-white/[0.05] rounded-2xl md:rounded-3xl flex justify-between items-center border border-white/10 hover:bg-white/[0.1] transition-all group/term shadow-lg">
                      <div className="flex items-center gap-4 md:gap-5">
                        <button 
                          onClick={() => playHebrewAudio(t.termo)}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-brand-rose text-white flex items-center justify-center hover:bg-white hover:text-brand-rose transition-all shadow-lg"
                        >
                          <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <div>
                          <div className="text-2xl md:text-3xl font-hebrew text-white drop-shadow-sm" dir="rtl">{t.termo}</div>
                          <div className="text-[10px] md:text-xs text-brand-rose font-black font-mono tracking-widest uppercase mt-1 bg-brand-rose/10 px-2 py-0.5 rounded-md">{t.transliteracao}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg md:text-xl font-black text-white mb-2 leading-tight">{t.significado}</div>
                        {t.ref && <div className="text-[10px] md:text-sm text-brand-rose font-black uppercase tracking-[0.2em] font-mono bg-brand-rose text-white px-3 md:px-4 py-1 md:py-1.5 rounded-lg md:rounded-xl border-2 border-white/10 shadow-lg shadow-brand-rose/20">REF: {t.ref}</div>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 md:p-6 bg-white/10 rounded-xl md:rounded-2xl border-l-4 border-brand-rose relative z-10 shadow-lg">
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {estudo.diagramas20.morfologicoLexical.explicacao}
                  </p>
                </div>
              </div>
            )}

            {activePart === 'quiastico' && (
              <div className="glass p-10 rounded-[2.5rem] space-y-10 border-t-4 border-brand-blue relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <Target className="w-48 h-48" />
                </div>
                <div className="flex items-center gap-4 text-brand-blue relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-[0.3em] text-xs">3. Estrutura Quiástica</h3>
                    <p className="text-white text-[10px] md:text-xs mt-1 font-bold">{activePartData?.phrase}</p>
                  </div>
                </div>
                <div className="space-y-3 relative z-10 max-w-2xl mx-auto">
                  {estudo.diagramas20.quiastico.blocos.map((b, i) => {
                    const totalSteps = estudo.diagramas20!.quiastico.blocos.length;
                    const middleIndex = Math.floor(totalSteps / 2);
                    const depth = Math.min(i, totalSteps - 1 - i);
                    
                    return (
                      <div 
                        key={i} 
                        className="flex items-center gap-3 md:gap-6 group/item" 
                        style={{ paddingLeft: `${depth * 0.5}rem` }}
                      >
                        <div className={cn(
                          "w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center font-black text-[10px] md:text-xs transition-all shadow-xl shrink-0",
                          depth === middleIndex
                            ? "bg-brand-rose text-white scale-110"
                            : "bg-white/20 text-white font-bold group-hover/item:bg-white/30"
                        )}>
                          {b.label}
                        </div>
                        <div className={cn(
                          "flex-1 p-3 md:p-5 rounded-xl md:rounded-2xl transition-all border shadow-lg relative overflow-hidden",
                          depth === middleIndex
                            ? "bg-brand-rose/20 border-brand-rose/50"
                            : "bg-white/[0.05] border-white/10 hover:bg-white/10"
                        )}>
                          <div className="flex justify-between items-center mb-2 md:mb-4">
                            <div className="text-[8px] md:text-sm text-white font-black uppercase tracking-widest bg-brand-rose px-3 md:px-5 py-1 md:py-2 rounded-lg md:rounded-xl border-2 border-white/20 shadow-lg shadow-brand-rose/30">REF: {b.ref}</div>
                            <div className="h-0.5 flex-1 bg-brand-rose/30 mx-2 md:mx-6" />
                          </div>
                          <div className={cn(
                            "text-sm sm:text-base md:text-lg font-black leading-relaxed text-white drop-shadow-md"
                          )}>{b.conteudo}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="p-6 bg-white/10 rounded-2xl border-l-4 border-brand-rose relative z-10 shadow-lg">
                  <p className="text-white text-base leading-relaxed font-medium">
                    {estudo.diagramas20.quiastico.explicacao}
                  </p>
                </div>
              </div>
            )}

            {activePart === 'sintatico' && (
              <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-purple relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <Layout className="w-32 h-32 md:w-48 h-48" />
                </div>
                <div className="flex items-center gap-4 text-brand-purple relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center">
                      <Layout className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold uppercase tracking-[0.3em] text-xs">4. Diagrama Sintático</h3>
                      <p className="text-white text-[10px] md:text-xs mt-1 font-bold">{activePartData?.phrase}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10">
                  {estudo.diagramas20?.sintatico.blocos.map((b, i) => (
                    <div key={i} className="p-4 md:p-6 bg-white/[0.05] rounded-2xl md:rounded-3xl space-y-4 border border-white/10 hover:border-brand-purple/50 transition-all group/card shadow-lg">
                      <div className="flex justify-between items-center">
                        <span className="px-4 md:px-6 py-1.5 md:py-2 bg-brand-purple text-white rounded-lg md:rounded-2xl text-xs md:text-base font-black uppercase tracking-widest shadow-xl shadow-brand-purple/30 border-2 border-white/10">REF: {b.ref}</span>
                        <span className="text-[10px] md:text-sm font-black text-white/70 uppercase tracking-widest bg-white/5 px-3 md:px-4 py-1 rounded-full">{b.label}</span>
                      </div>
                      <div className="space-y-3 md:space-y-4">
                        <div className="p-3 md:p-4 bg-white/10 rounded-xl border border-white/5">
                          <div className="text-[8px] md:text-[10px] text-brand-purple font-black uppercase tracking-widest mb-1">Sujeito</div>
                          <div className="text-sm md:text-base text-white font-bold">{b.sujeito}</div>
                        </div>
                        <div className="p-3 md:p-4 bg-brand-rose/20 rounded-xl border border-brand-rose/30">
                          <div className="text-[8px] md:text-[10px] text-brand-rose font-black uppercase tracking-widest mb-1">Verbos</div>
                          <div className="text-sm md:text-base text-white font-bold">{b.verbos}</div>
                        </div>
                        {b.destinatario && (
                          <div className="p-3 md:p-4 bg-brand-purple/10 rounded-xl border border-brand-purple/20">
                            <div className="text-[8px] md:text-[10px] text-brand-purple font-black uppercase tracking-widest mb-1">Destinatário</div>
                            <div className="text-sm md:text-base text-white font-bold">{b.destinatario}</div>
                          </div>
                        )}
                        {b.objeto && (
                          <div className="p-3 md:p-4 bg-brand-purple/10 rounded-xl border border-brand-purple/20">
                            <div className="text-[8px] md:text-[10px] text-brand-purple font-black uppercase tracking-widest mb-1">Objeto</div>
                            <div className="text-sm md:text-base text-white font-bold">{b.objeto}</div>
                          </div>
                        )}
                        {b.verboPassivo && (
                          <div className="p-3 md:p-4 bg-brand-rose/20 rounded-xl border border-brand-rose/30">
                            <div className="text-[8px] md:text-[10px] text-brand-rose font-black uppercase tracking-widest mb-1">Verbo Passivo</div>
                            <div className="text-sm md:text-base text-white font-bold">{b.verboPassivo}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 md:p-6 bg-white/10 rounded-xl md:rounded-2xl border-l-4 border-brand-purple relative z-10 shadow-lg">
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {estudo.diagramas20?.sintatico.explicacao}
                  </p>
                </div>
              </div>
            )}

            {activePart === 'semantico' && (
              <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-rose relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <Activity className="w-32 h-32 md:w-48 h-48" />
                </div>
                <div className="flex items-center gap-4 text-brand-rose relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-brand-rose/10 flex items-center justify-center">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold uppercase tracking-[0.3em] text-xs">5. Fluxo Semântico</h3>
                      <p className="text-white text-[10px] md:text-xs mt-1 font-bold">{activePartData?.phrase}</p>
                    </div>
                </div>
                <div className="space-y-4 md:space-y-6 relative z-10">
                  {estudo.diagramas20?.semantico.fluxo.map((f, i) => (
                    <div key={i} className="p-6 md:p-8 bg-white/[0.05] rounded-2xl md:rounded-[2.5rem] space-y-3 md:space-y-4 border border-white/10 hover:bg-white/[0.1] transition-all shadow-2xl group/item">
                      <div className="text-[10px] md:text-base text-white font-black uppercase tracking-widest bg-brand-rose w-fit px-4 md:px-6 py-1.5 md:py-2 rounded-xl border-2 border-white/20 mb-2 md:mb-4 shadow-xl shadow-brand-rose/30">REF: {f.ref}</div>
                      <div className="text-xl md:text-3xl text-white font-black leading-relaxed drop-shadow-lg">{f.ideia}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 md:p-6 bg-white/10 rounded-xl md:rounded-2xl border-l-4 border-brand-rose relative z-10 shadow-lg">
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {estudo.diagramas20?.semantico.explicacao}
                  </p>
                </div>
              </div>
            )}

            {activePart === 'progressivo' && (
              <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-blue relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <ArrowRightCircle className="w-32 h-32 md:w-48 h-48" />
                </div>
                <div className="flex items-center gap-4 text-brand-blue relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                      <ArrowRightCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold uppercase tracking-[0.3em] text-xs">6. Diagrama Progressivo</h3>
                      <p className="text-white text-[10px] md:text-xs mt-1 font-bold">{activePartData?.phrase}</p>
                    </div>
                </div>
                <div className="space-y-4 relative z-10">
                  {estudo.diagramas20?.progressivo.etapas.map((e, i) => (
                    <div key={i} className="flex items-center gap-3 md:gap-6 group/step">
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-brand-rose text-white flex items-center justify-center font-black text-base md:text-lg shadow-xl group-hover/step:bg-white transition-all shrink-0">
                        {i + 1}
                      </div>
                      <div className="flex-1 p-6 md:p-8 bg-white/[0.05] rounded-2xl md:rounded-[2.5rem] border border-white/10 group-hover/step:border-brand-rose/50 transition-all shadow-2xl">
                        <div className="text-[10px] md:text-base text-white font-black uppercase tracking-widest mb-3 md:mb-4 bg-brand-rose w-fit px-4 md:px-6 py-1.5 md:py-2 rounded-xl border-2 border-white/10 shadow-lg shadow-brand-rose/30">REF: {e.ref}</div>
                        <div className="text-white text-lg md:text-2xl font-black drop-shadow-lg">{e.acao}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 md:p-6 bg-white/10 rounded-xl md:rounded-2xl border-l-4 border-brand-rose relative z-10 shadow-lg">
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {estudo.diagramas20?.progressivo.explicacao}
                  </p>
                </div>
              </div>
            )}

            {activePart === 'intensificacao' && (
              <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-purple relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <Flame className="w-32 h-32 md:w-48 h-48" />
                </div>
                <div className="flex items-center gap-4 text-brand-purple relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center">
                    <Flame className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold uppercase tracking-[0.3em] text-xs">7. Intensificação</h3>
                </div>
                <div className="space-y-4 relative z-10">
                  {estudo.diagramas20?.intensificacao.niveis.map((n, i) => (
                    <div key={i} className="relative">
                      <div className="p-4 md:p-6 bg-white/[0.05] rounded-2xl md:rounded-3xl border border-white/10 hover:bg-brand-blue/10 transition-all group/level shadow-lg">
                        <div className="flex justify-between items-center mb-4 md:mb-6">
                          <span className="text-[10px] md:text-base text-white font-black uppercase tracking-widest bg-brand-blue px-4 md:px-6 py-1.5 md:py-2 rounded-xl border-2 border-white/20 shadow-xl shadow-brand-blue/30">REF: {n.ref}</span>
                          <div className="flex gap-1.5 md:gap-2">
                            {Array.from({ length: i + 1 }).map((_, j) => (
                              <div key={j} className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-brand-blue shadow-[0_0_10px_rgba(0,180,216,0.8)]" />
                            ))}
                          </div>
                        </div>
                        <div className="text-lg md:text-xl text-white font-black leading-tight drop-shadow-sm">{n.foco}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 md:p-6 bg-white/10 rounded-xl md:rounded-2xl border-l-4 border-brand-blue relative z-10 shadow-lg">
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {estudo.diagramas20?.intensificacao.explicacao}
                  </p>
                </div>
              </div>
            )}

            {activePart === 'espacial' && (
              <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-rose relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <Compass className="w-32 h-32 md:w-48 h-48" />
                </div>
                <div className="flex items-center gap-4 text-brand-rose relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-brand-rose/10 flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold uppercase tracking-[0.3em] text-xs">8. Diagrama Espacial</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10">
                  {estudo.diagramas20?.espacial.esferas.map((e, i) => (
                    <div key={i} className="p-6 md:p-8 bg-white/[0.05] rounded-2xl md:rounded-[2.5rem] border border-white/10 hover:border-brand-purple/50 bg-gradient-to-br from-white/[0.02] to-transparent transition-all text-center group/sphere shadow-xl">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-brand-purple text-bg-deep flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover/sphere:scale-110 transition-transform shadow-lg shadow-brand-purple/20">
                        <Compass className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <div className="text-[10px] md:text-base text-white font-black uppercase tracking-widest mb-4 md:mb-6 bg-brand-purple px-4 md:px-6 py-1.5 md:py-2 rounded-xl border-2 border-white/20 shadow-xl shadow-brand-purple/30 w-fit mx-auto">REF: {e.ref}</div>
                      <div className="text-xl md:text-3xl text-white font-black leading-tight drop-shadow-lg">{e.esfera}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 md:p-6 bg-white/10 rounded-xl md:rounded-2xl border-l-4 border-brand-purple relative z-10 shadow-lg">
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {estudo.diagramas20?.espacial.explicacao}
                  </p>
                </div>
              </div>
            )}

            {activePart === 'acesso' && (
              <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-blue relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <ShieldCheck className="w-32 h-32 md:w-48 h-48" />
                </div>
                <div className="flex items-center gap-4 text-brand-blue relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold uppercase tracking-[0.3em] text-xs">9. Diagrama de Acesso</h3>
                </div>
                <div className="space-y-4 relative z-10">
                  {estudo.diagramas20?.acesso.permissoes.map((p, i) => (
                    <div key={i} className="p-4 md:p-6 bg-white/[0.05] rounded-2xl md:rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center gap-4 md:gap-6 hover:bg-white/[0.1] transition-all shadow-lg group/acesso">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-brand-rose text-white flex items-center justify-center shrink-0 shadow-xl group-hover/acesso:scale-105 transition-transform border-2 md:border-4 border-white/10">
                        <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />
                      </div>
                      <div className="text-center sm:text-left">
                        <div className="text-[10px] md:text-base font-black text-white uppercase tracking-widest mb-2 md:mb-4 bg-brand-rose px-4 md:px-6 py-1.5 md:py-2 rounded-xl shadow-xl border-2 border-white/20 w-fit mx-auto sm:mx-0">REF: {p.ref}</div>
                        <div className="text-2xl md:text-4xl text-white font-black leading-tight drop-shadow-lg">{p.acao}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 md:p-6 bg-white/10 rounded-xl md:rounded-2xl border-l-4 border-brand-rose relative z-10 shadow-lg">
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {estudo.diagramas20?.acesso.explicacao}
                  </p>
                </div>
              </div>
            )}

            {activePart === 'relacional' && (
              <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-purple relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <Users className="w-32 h-32 md:w-48 h-48" />
                </div>
                <div className="flex items-center gap-4 text-brand-purple relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold uppercase tracking-[0.3em] text-xs">10. Diagrama Relacional</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
                  {estudo.diagramas20?.relacional.vinculos.map((v, i) => (
                    <div key={i} className="p-6 md:p-10 bg-white/[0.05] rounded-2xl md:rounded-[2.5rem] border border-white/10 text-center space-y-4 md:space-y-8 transition-all hover:bg-white/[0.08] shadow-2xl group/rel">
                      <div className="text-[10px] md:text-base text-bg-deep font-black uppercase tracking-widest bg-brand-purple w-fit mx-auto px-4 md:px-6 py-1.5 md:py-2 rounded-xl md:rounded-2xl shadow-xl border-2 border-white/10">ESTADO: {v.status.toUpperCase()}</div>
                      <div className="text-xl md:text-3xl text-white font-black drop-shadow-lg group-hover/rel:scale-105 transition-transform bg-white/5 py-3 md:py-4 rounded-2xl md:rounded-3xl border border-white/10">VERSOS: {v.ref}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 md:p-6 bg-white/10 rounded-xl md:rounded-2xl border-l-4 border-brand-purple relative z-10 shadow-lg">
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {estudo.diagramas20?.relacional.explicacao}
                  </p>
                </div>
              </div>
            )}

            {activePart === 'cristologico' && (
              <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-rose relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <Cross className="w-32 h-32 md:w-48 h-48" />
                </div>
                <div className="flex items-center gap-4 text-brand-rose relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-brand-rose/10 flex items-center justify-center">
                    <Cross className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold uppercase tracking-[0.3em] text-xs">11. Diagrama Cristológico</h3>
                </div>
                <div className="space-y-4 md:space-y-6 relative z-10">
                  {estudo.diagramas20?.cristologico.conexoes.map((c, i) => (
                    <div key={i} className="p-6 md:p-10 bg-gradient-to-br from-brand-rose/20 to-bg-deep rounded-2xl md:rounded-[2.5rem] border border-brand-rose/40 group/item shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity pointer-events-none">
                        <Cross className="w-24 h-24 md:w-32 md:h-32" />
                      </div>
                      <div className="flex justify-between items-start mb-4 md:mb-8">
                        <span className="text-[10px] md:text-base font-black text-white uppercase tracking-widest bg-brand-rose px-4 md:px-6 py-1.5 md:py-2.5 rounded-xl md:rounded-2xl border-2 border-white/20 shadow-xl shadow-brand-rose/40">REF: {c.ref}</span>
                        <Cross className="w-8 h-8 md:w-12 md:h-12 text-brand-rose shadow-[0_0_20px_rgba(255,45,85,0.6)]" />
                      </div>
                      <div className="text-xl md:text-4xl text-white font-black leading-tight tracking-tighter drop-shadow-lg">{c.apontaPara}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 md:p-6 bg-white/10 rounded-xl md:rounded-2xl border-l-4 border-brand-rose relative z-10 shadow-lg">
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {estudo.diagramas20?.cristologico.explicacao}
                  </p>
                </div>
              </div>
            )}

            {activePart === 'sistematico' && (
              <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-blue relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <BookOpen className="w-32 h-32 md:w-48 h-48" />
                </div>
                <div className="flex items-center gap-4 text-brand-blue relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold uppercase tracking-[0.3em] text-xs">12. Diagrama Sistemático</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
                  {estudo.diagramas20?.sistematico.doutrinas.map((d, i) => (
                    <div key={i} className="p-6 md:p-10 bg-white/[0.05] rounded-2xl md:rounded-[3rem] border border-white/10 space-y-4 md:space-y-8 hover:bg-white/[0.1] transition-all shadow-2xl group/doutrina">
                      <div className="text-[10px] md:text-base text-white font-black uppercase tracking-widest bg-brand-blue w-fit px-4 md:px-6 py-1.5 md:py-2 rounded-xl md:rounded-2xl shadow-xl border-2 border-white/10">REF: {d.ref}</div>
                      <div className="text-xl md:text-4xl text-white font-black leading-tight drop-shadow-lg">{d.doutrina}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 md:p-6 bg-white/10 rounded-xl md:rounded-2xl border-l-4 border-brand-blue relative z-10 shadow-lg">
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {estudo.diagramas20?.sistematico.explicacao}
                  </p>
                </div>
              </div>
            )}

            {activePart === 'tensao' && (
              <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-purple relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <AlertTriangle className="w-32 h-32 md:w-48 h-48" />
                </div>
                <div className="flex items-center gap-4 text-brand-purple relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold uppercase tracking-[0.3em] text-xs">13. Diagrama de Tensão</h3>
                </div>
                <div className="space-y-4 md:space-y-6 relative z-10">
                  {estudo.diagramas20?.tensao.movimento.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 md:gap-6 group/tension">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-brand-purple text-white flex items-center justify-center shadow-xl group-hover/tension:bg-white group-hover/tension:text-brand-purple transition-all scale-105 shrink-0">
                        <Activity className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <div className="flex-1 p-6 md:p-10 bg-white/[0.05] rounded-2xl md:rounded-[3rem] border border-white/10 group-hover/tension:border-brand-purple/50 transition-all shadow-2xl hover:bg-white/[0.08]">
                        <div className="text-[10px] md:text-base text-white font-black uppercase tracking-widest mb-2 md:mb-4 bg-brand-purple w-fit px-4 md:px-6 py-1.5 md:py-2 rounded-xl md:rounded-2xl shadow-xl border-2 border-white/20">REF: {m.ref}</div>
                        <div className="text-xl md:text-3xl text-white font-black drop-shadow-lg">{m.estado}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 md:p-6 bg-white/10 rounded-xl md:rounded-2xl border-l-4 border-brand-purple relative z-10 shadow-lg">
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {estudo.diagramas20?.tensao.explicacao}
                  </p>
                </div>
              </div>
            )}

            {activePart === 'repeticao' && (
              <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-rose relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <Repeat className="w-32 h-32 md:w-48 h-48" />
                </div>
                <div className="flex items-center gap-4 text-brand-rose relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-brand-rose/10 flex items-center justify-center">
                    <Repeat className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold uppercase tracking-[0.3em] text-xs">14. Diagrama de Repetição</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10">
                  {estudo.diagramas20?.repeticao.padroes.map((p, i) => (
                    <div key={i} className="p-8 md:p-12 bg-white/[0.05] rounded-[2rem] md:rounded-[4rem] border border-white/10 hover:border-brand-rose/50 transition-all group/pattern shadow-2xl flex flex-col items-center text-center">
                       <Repeat className="w-10 h-10 md:w-16 md:h-16 text-brand-rose mb-6 md:mb-8 opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_15px_rgba(255,45,85,0.5)]" />
                      <div className="text-[10px] md:text-base text-white font-black uppercase tracking-widest mb-4 md:mb-6 bg-brand-rose px-4 md:px-8 py-1.5 md:py-3 rounded-xl md:rounded-2xl shadow-2xl shadow-brand-rose/40 border-2 border-white/20 ring-2 md:ring-4 ring-brand-rose/20">REF: {p.ref}</div>
                      <div className="text-xl md:text-4xl text-white font-black leading-tight drop-shadow-lg">{p.tema}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 md:p-6 bg-white/10 rounded-xl md:rounded-2xl border-l-4 border-brand-rose relative z-10 shadow-lg">
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {estudo.diagramas20?.repeticao.explicacao}
                  </p>
                </div>
              </div>
            )}

            {activePart === 'causa-efeito' && (
              <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-blue relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <Zap className="w-32 h-32 md:w-48 h-48" />
                </div>
                <div className="flex items-center gap-4 text-brand-blue relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold uppercase tracking-[0.3em] text-xs">15. Causa e Efeito</h3>
                </div>
                <div className="space-y-4 md:space-y-6 relative z-10">
                  {estudo.diagramas20?.causaEfeito.logica.map((l, i) => (
                    <div key={i} className="flex flex-col md:flex-row items-center gap-4 md:gap-6 group/logic shadow-lg p-2 rounded-[2rem]">
                      <div className="w-full flex-1 p-6 md:p-8 bg-white/[0.05] rounded-2xl md:rounded-3xl border border-white/10 text-center relative overflow-hidden">
                        <div className="text-[10px] md:text-sm font-black text-white uppercase tracking-widest bg-brand-blue px-3 md:px-4 py-1.5 rounded-xl border border-white/10 shadow-lg mb-3 md:mb-4 mx-auto w-fit">REF: {l.ref}</div>
                        <div className="text-lg md:text-xl text-white font-bold leading-tight">{l.acao}</div>
                      </div>
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-blue/20 border border-brand-blue flex items-center justify-center -my-2 md:-my-0 md:-mx-3 relative z-10 shadow-[0_0_15px_rgba(0,180,216,0.4)] shrink-0">
                        <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-brand-blue group-hover/logic:scale-125 transition-transform rotate-90 md:rotate-0" />
                      </div>
                      <div className="w-full flex-1 p-6 md:p-8 bg-brand-blue text-bg-deep rounded-2xl md:rounded-3xl border border-brand-blue/20 text-center relative overflow-hidden shadow-2xl">
                        <div className="text-[10px] text-bg-deep/50 font-black uppercase mb-2 md:mb-3 tracking-widest">Efeito</div>
                        <div className="text-lg md:text-xl font-black leading-tight">{l.consequencia}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 md:p-6 bg-white/10 rounded-xl md:rounded-2xl border-l-4 border-brand-blue relative z-10 shadow-lg">
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {estudo.diagramas20?.causaEfeito.explicacao}
                  </p>
                </div>
              </div>
            )}

            {activePart === 'apologetico' && (
              <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-purple relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <ShieldAlert className="w-32 h-32 md:w-48 h-48" />
                </div>
                <div className="flex items-center gap-4 text-brand-purple relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold uppercase tracking-[0.3em] text-xs">16. Diagrama Apologético</h3>
                </div>
                <div className="space-y-4 md:space-y-6 relative z-10">
                  {estudo.diagramas20?.apologetico.confrontos.map((c, i) => (
                    <div key={i} className="p-6 md:p-10 bg-white/[0.05] rounded-2xl md:rounded-[2.5rem] border border-white/10 space-y-4 md:space-y-6 shadow-xl">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b-2 border-white/10 pb-4 md:pb-6 mb-2 md:mb-4 gap-4">
                        <h4 className="text-xl md:text-3xl font-black text-white tracking-tight drop-shadow-lg">{c.tema}</h4>
                        <span className="text-[10px] md:text-base text-white font-mono font-black bg-brand-purple px-4 md:px-6 py-1.5 md:py-3 rounded-xl md:rounded-2xl shadow-xl shadow-brand-purple/40 border-2 border-white/20 w-fit">REF: {c.ref}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {c.heresias.map((h, hi) => (
                          <div key={hi} className="px-3 md:px-5 py-1.5 md:py-2.5 bg-red-500/80 text-white rounded-lg md:rounded-xl text-[10px] md:text-sm font-black border border-red-400/50 shadow-lg">
                            {h}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 md:p-6 bg-white/10 rounded-xl md:rounded-2xl border-l-4 border-brand-purple relative z-10 shadow-lg">
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {estudo.diagramas20?.apologetico.explicacao}
                  </p>
                </div>
              </div>
            )}

            {activePart === 'perguntas' && (
              <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-rose relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <MessageSquare className="w-32 h-32 md:w-48 h-48" />
                </div>
                <div className="flex items-center gap-4 text-brand-rose relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-brand-rose/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold uppercase tracking-[0.3em] text-xs">17. Perguntas ao Texto</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
                  {estudo.diagramas20?.perguntas.secoes.map((s, i) => (
                    <div key={i} className="p-6 md:p-8 bg-white/[0.05] rounded-2xl md:rounded-[2rem] border border-white/10 space-y-4 md:space-y-6 shadow-xl hover:bg-white/[0.08] transition-all">
                      <div className="flex justify-between items-start mb-2 md:mb-4 gap-2">
                        <div className="text-[10px] md:text-sm font-black text-brand-rose uppercase tracking-[0.2em] bg-brand-rose text-white w-fit px-4 md:px-6 py-1.5 md:py-2 rounded-xl border-2 border-white/20 shadow-lg shadow-brand-rose/20">{s.titulo.toUpperCase()}</div>
                        {s.ref && <span className="text-[8px] md:text-xs font-black text-bg-deep bg-white px-2 md:px-3 py-0.5 md:py-1 rounded-lg md:rounded-xl shadow-lg shrink-0">REF: {s.ref}</span>}
                      </div>
                      <div className="space-y-3 md:space-y-4">
                        {s.perguntas.map((p, pi) => (
                          <div key={pi} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl border border-white/5 hover:border-brand-rose/30 transition-all">
                            <HelpCircle className="w-4 h-4 md:w-5 md:h-5 text-brand-rose shrink-0 mt-0.5" />
                            <p className="text-sm md:text-base text-white font-medium leading-relaxed">{p}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 md:p-6 bg-white/10 rounded-xl md:rounded-2xl border-l-4 border-brand-rose relative z-10 shadow-lg">
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {estudo.diagramas20?.perguntas.explicacao}
                  </p>
                </div>
              </div>
            )}

            {activePart === 'autoral' && (
              <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-blue relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <PenTool className="w-32 h-32 md:w-48 h-48" />
                </div>
                <div className="flex items-center gap-4 text-brand-blue relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                    <PenTool className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold uppercase tracking-[0.3em] text-xs">18. Diagrama Autoral</h3>
                </div>
                <div className="space-y-6 md:space-y-8 relative z-10">
                  {estudo.diagramas20?.autoral.contribuicoes.map((c, i) => (
                    <div key={i} className="p-6 md:p-10 bg-white/[0.05] rounded-2xl md:rounded-[2.5rem] border border-white/10 space-y-6 md:space-y-8 shadow-2xl">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-white/10 p-4 md:p-6 rounded-2xl md:rounded-[2rem] border border-white/10 shadow-xl gap-4">
                        <div className="flex flex-col gap-1 md:gap-2">
                          <h4 className="text-xl md:text-3xl font-black text-white tracking-tight drop-shadow-lg">{c.titulo}</h4>
                          {c.ref && <span className="text-[10px] md:text-sm font-black text-white uppercase tracking-widest bg-brand-blue px-3 md:px-4 py-1 rounded-lg md:rounded-xl shadow-lg w-fit">REF: {c.ref}</span>}
                        </div>
                        <span className="px-3 md:px-4 py-1 md:py-1.5 bg-brand-blue text-white rounded-lg md:rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest shadow-lg shadow-brand-blue/30 w-fit">{c.label}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {c.autores.map((a, ai) => (
                          <div key={ai} className="p-4 md:p-6 bg-white/5 rounded-2xl md:rounded-3xl border-l-4 md:border-l-8 border-brand-blue shadow-lg hover:bg-white/10 transition-all">
                            <div className="text-[10px] md:text-sm font-black text-white uppercase mb-2 bg-brand-blue/30 w-fit px-3 py-0.5 rounded-full">{a.nome}</div>
                            <p className="text-sm md:text-base text-white font-medium leading-relaxed italic">"{a.comentario}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 md:p-6 bg-white/10 rounded-xl md:rounded-2xl border-l-4 border-brand-blue relative z-10 shadow-lg">
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {estudo.diagramas20?.autoral.explicacao}
                  </p>
                </div>
              </div>
            )}

            {activePart === 'homiletico' && (
              <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-purple relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <Mic2 className="w-32 h-32 md:w-48 h-48" />
                </div>
                <div className="flex items-center gap-4 text-brand-purple relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center">
                    <Mic2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold uppercase tracking-[0.3em] text-xs">19. Diagrama Homilético</h3>
                </div>
                <div className="space-y-6 md:space-y-8 relative z-10">
                  <div className="p-6 md:p-12 bg-white/5 rounded-2xl md:rounded-[3rem] border border-white/10 text-center shadow-2xl relative overflow-hidden group/tema">
                    <div className="absolute inset-0 bg-brand-purple/5 opacity-0 group-hover/tema:opacity-100 transition-opacity" />
                    <div className="text-[10px] md:text-xs text-brand-purple font-black uppercase tracking-[0.5em] mb-2 md:mb-4 relative z-10">Tema Central</div>
                    <h4 className="text-xl md:text-4xl font-display font-black text-white leading-tight drop-shadow-lg relative z-10 italic">"{estudo.diagramas20?.homiletico.temaCentral}"</h4>
                  </div>
                  <div className="space-y-4 md:space-y-6">
                    {estudo.diagramas20?.homiletico.esboço.map((e, i) => (
                      <div key={i} className="flex flex-col md:flex-row items-center gap-4 md:gap-8 group/outline">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-brand-purple text-white flex items-center justify-center font-black text-lg md:text-xl shadow-xl group-hover/outline:bg-white group-hover/outline:text-brand-purple transition-all shrink-0">
                          {e.label}
                        </div>
                        <div className="flex-1 w-full p-6 md:p-10 bg-white/[0.05] rounded-2xl md:rounded-[2.5rem] border border-white/10 group-hover/outline:border-brand-purple/50 transition-all shadow-2xl hover:bg-white/[0.08]">
                          <div className="text-[10px] md:text-sm font-black text-white bg-brand-purple px-4 md:px-5 py-1.5 md:py-2 rounded-lg md:rounded-xl mb-3 md:mb-4 w-fit shadow-xl border-2 border-white/20">REF: {e.ref}</div>
                          <p className="text-lg md:text-2xl text-white font-black leading-tight drop-shadow-lg">{e.ponto}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 md:p-6 bg-white/10 rounded-xl md:rounded-2xl border-l-4 border-brand-purple relative z-10 shadow-lg">
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {estudo.diagramas20?.homiletico.explicacao}
                  </p>
                </div>
              </div>
            )}

            {activePart === 'pastoral' && (
              <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-10 border-t-4 border-brand-rose relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                  <Heart className="w-32 h-32 md:w-48 h-48" />
                </div>
                <div className="flex items-center gap-4 text-brand-rose relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-brand-rose/10 flex items-center justify-center">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold uppercase tracking-[0.3em] text-xs">20. Pastoral Prático</h3>
                </div>
                <div className="space-y-6 md:space-y-8 relative z-10">
                  {estudo.diagramas20?.pastoralPratico.direcionamentos.map((d, i) => (
                    <div key={i} className="p-6 md:p-10 bg-white/[0.05] rounded-2xl md:rounded-[3.5rem] border border-white/10 space-y-6 md:space-y-10 shadow-2xl hover:bg-white/[0.08] transition-all">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div className="text-[10px] md:text-base font-black text-white uppercase tracking-widest bg-brand-rose px-4 md:px-8 py-1.5 md:py-3 rounded-xl md:rounded-2xl border-2 border-white/20 shadow-2xl shadow-brand-rose/40 w-fit">{d.titulo.toUpperCase()}</div>
                        {d.ref && <span className="text-[10px] md:text-xs font-black text-bg-deep bg-white px-3 md:px-4 py-1 rounded-lg md:rounded-xl shadow-xl border border-white/20 w-fit">REF: {d.ref}</span>}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <div className="p-4 md:p-6 bg-white/[0.03] rounded-xl md:rounded-3xl border border-white/5 hover:bg-brand-rose/5 transition-all">
                          <div className="text-[10px] md:text-xs text-brand-rose font-black mb-1 md:mb-2 uppercase tracking-widest">Adultos</div>
                          <p className="text-sm md:text-base text-white font-medium leading-relaxed">{d.adultos}</p>
                        </div>
                        <div className="p-4 md:p-6 bg-white/[0.03] rounded-xl md:rounded-3xl border border-white/5 hover:bg-brand-rose/5 transition-all">
                          <div className="text-[10px] md:text-xs text-brand-rose font-black mb-1 md:mb-2 uppercase tracking-widest">Jovens</div>
                          <p className="text-sm md:text-base text-white font-medium leading-relaxed">{d.jovens}</p>
                        </div>
                        <div className="p-4 md:p-6 bg-white/[0.03] rounded-xl md:rounded-3xl border border-white/5 hover:bg-brand-rose/5 transition-all">
                          <div className="text-[10px] md:text-xs text-brand-rose font-black mb-1 md:mb-2 uppercase tracking-widest">Igreja</div>
                          <p className="text-sm md:text-base text-white font-medium leading-relaxed">{d.igreja}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 md:p-6 bg-white/10 rounded-xl md:rounded-2xl border-l-4 border-brand-rose relative z-10 shadow-lg">
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {estudo.diagramas20?.pastoralPratico.explicacao}
                  </p>
                </div>
              </div>
            )}

            {![ 'intro', 'interlinear', 'morfologico', 'quiastico', 'sintatico', 'semantico', 'progressivo', 'intensificacao', 'espacial', 'acesso', 'relacional', 'cristologico', 'sistematico', 'tensao', 'repeticao', 'causa-efeito', 'apologetico', 'perguntas', 'autoral', 'homiletico', 'pastoral', 'antropologico', 'familiar', 'trinitario' ].includes(activePart) && (
               <div className="glass p-10 rounded-[2.5rem] space-y-10 border-t-4 border-white/10 relative overflow-hidden group">
                 <div className="flex items-center gap-4 text-white/70 relative z-10">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                     <activePartData.icon className="w-5 h-5" />
                   </div>
                   <h3 className="font-bold uppercase tracking-[0.3em] text-xs">{activePartData.title}</h3>
                 </div>
                 <div className="p-12 text-center space-y-4 relative z-10">
                    <activePartData.icon className="w-16 h-16 text-white/5 mx-auto mb-6" />
                    <h4 className="text-xl font-display font-bold text-white/70">Conteúdo em Processamento</h4>
                    <p className="text-white/60 max-w-md mx-auto">Este diagrama está sendo otimizado para a nova interface elegante.</p>
                 </div>
               </div>
            )}

            {activePart === 'antropologico' && estudo.diagramas20?.antropologico && (
              <section className="space-y-6 md:space-y-12 pb-10">
                <div className="flex items-center gap-4 md:gap-6 px-2">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-[2rem] bg-brand-blue/20 flex items-center justify-center text-brand-blue shadow-2xl shadow-brand-blue/20 shrink-0">
                    <Award className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <span className="text-brand-blue font-black text-[8px] md:text-[10px] uppercase tracking-[0.4em]">Diagrama Premium</span>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">Antropológico</h2>
                  </div>
                </div>

                <div className="space-y-8 md:space-y-12 relative z-10">
                  {estudo.diagramas20.antropologico.secoes.map((s, i) => (
                    <div key={i} className="glass p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border-t-4 border-brand-blue space-y-6 md:space-y-8 relative overflow-hidden group/card shadow-2xl">
                      <div className="absolute top-0 right-0 p-8 md:p-16 opacity-[0.02] pointer-events-none group-hover/card:opacity-[0.05] transition-opacity">
                         <Award className="w-32 h-32 md:w-48 md:h-48" />
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                        <span className="text-[10px] md:text-sm font-black text-bg-deep uppercase tracking-widest bg-brand-blue px-4 md:px-8 py-2 md:py-2.5 rounded-lg md:rounded-xl shadow-xl shadow-brand-blue/20 border-2 border-white/10">REF: {s.ref}</span>
                        <div className="h-px flex-1 bg-white/10 hidden sm:block mx-4 md:mx-6" />
                        <h4 className="text-xl md:text-2xl font-display font-black text-white italic uppercase tracking-tighter">{s.titulo}</h4>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10">
                        {s.analises.map((a, idx) => (
                          <div key={idx} className="p-4 md:p-6 bg-white/[0.03] rounded-xl md:rounded-2xl border border-white/10 hover:bg-white/[0.08] transition-all hover:border-brand-blue/30 group/item">
                            <div className="text-[8px] md:text-[10px] text-brand-blue font-black uppercase tracking-widest mb-1 md:mb-2">{a.nivel}</div>
                            <div className="text-sm md:text-base text-white/90 font-medium leading-relaxed italic">{a.conteudo}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {estudo.diagramas20.antropologico.explicacao && (
                  <div className="p-6 md:p-10 bg-brand-blue/5 rounded-2xl md:rounded-[2.5rem] border-l-4 md:border-l-8 border-brand-blue relative z-10 shadow-inner">
                    <p className="text-white text-lg md:text-xl leading-relaxed font-bold italic opacity-90">
                      {estudo.diagramas20.antropologico.explicacao}
                    </p>
                  </div>
                )}
              </section>
            )}

            {activePart === 'familiar' && estudo.diagramas20?.familiar && (
              <section className="space-y-6 md:space-y-12 pb-10">
                <div className="flex items-center gap-4 md:gap-6 px-2">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-[2rem] bg-brand-purple/20 flex items-center justify-center text-brand-purple shadow-2xl shadow-brand-purple/20 shrink-0">
                    <Users className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <span className="text-brand-purple font-black text-[8px] md:text-[10px] uppercase tracking-[0.4em]">Diagrama Premium</span>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">Familiar</h2>
                  </div>
                </div>

                <div className="space-y-8 md:space-y-12 relative z-10">
                  {estudo.diagramas20.familiar.secoes.map((s, i) => (
                    <div key={i} className="glass p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border-t-4 border-brand-purple space-y-6 md:space-y-8 relative overflow-hidden group/card shadow-2xl">
                      <div className="absolute top-0 right-0 p-8 md:p-16 opacity-[0.02] pointer-events-none group-hover/card:opacity-[0.05] transition-opacity">
                         <Users className="w-32 h-32 md:w-48 md:h-48" />
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                        <span className="text-[10px] md:text-sm font-black text-white uppercase tracking-widest bg-brand-purple px-4 md:px-8 py-2 md:py-2.5 rounded-lg md:rounded-xl shadow-xl shadow-brand-purple/20 border-2 border-white/10">REF: {s.ref}</span>
                        <div className="h-px flex-1 bg-white/10 hidden sm:block mx-4 md:mx-6" />
                        <h4 className="text-xl md:text-2xl font-display font-black text-white italic uppercase tracking-tighter">Dinâmica no Lar</h4>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10">
                        <div className="p-4 md:p-6 bg-white/[0.03] rounded-xl md:rounded-2xl border border-white/10 hover:bg-white/[0.08] transition-all hover:border-brand-purple/30 group/item">
                          <div className="text-[8px] md:text-[10px] text-brand-purple font-black uppercase tracking-widest mb-1 md:mb-2">Família</div>
                          <div className="text-sm md:text-base text-white/90 font-medium leading-relaxed">{s.familia}</div>
                        </div>
                        <div className="p-4 md:p-6 bg-brand-purple/10 rounded-xl md:rounded-2xl border border-brand-purple/20 hover:bg-brand-purple/20 transition-all group/item shadow-inner">
                          <div className="text-[8px] md:text-[10px] text-brand-purple font-black uppercase tracking-widest mb-1 md:mb-2 text-right">Ação / Fluxo</div>
                          <div className="text-sm md:text-base text-white font-black leading-relaxed text-right">→ {s.fluxo}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {estudo.diagramas20.familiar.explicacao && (
                  <div className="p-6 md:p-10 bg-brand-purple/5 rounded-2xl md:rounded-[2.5rem] border-l-4 md:border-l-8 border-brand-purple relative z-10 shadow-inner">
                    <p className="text-white text-lg md:text-xl leading-relaxed font-bold italic opacity-90">
                      {estudo.diagramas20.familiar.explicacao}
                    </p>
                  </div>
                )}
              </section>
            )}

            {activePart === 'trinitario' && estudo.diagramas20?.trinitario && (
              <section className="space-y-6 md:space-y-12 pb-10">
                <div className="flex items-center gap-4 md:gap-6 px-2">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-[2rem] bg-brand-rose/20 flex items-center justify-center text-brand-rose shadow-2xl shadow-brand-rose/20 shrink-0">
                    <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <span className="text-brand-rose font-black text-[8px] md:text-[10px] uppercase tracking-[0.4em]">Diagrama Premium</span>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">Trinitário</h2>
                  </div>
                </div>

                <div className="space-y-8 md:space-y-12 relative z-10">
                  {estudo.diagramas20.trinitario.secoes.map((s, i) => (
                    <div key={i} className="glass p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border-t-4 border-brand-rose space-y-6 md:space-y-8 relative overflow-hidden group/card shadow-2xl">
                      <div className="absolute top-0 right-0 p-8 md:p-16 opacity-[0.02] pointer-events-none group-hover/card:opacity-[0.05] transition-opacity">
                         <ShieldCheck className="w-32 h-32 md:w-48 md:h-48" />
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                        <span className="text-[10px] md:text-sm font-black text-white uppercase tracking-widest bg-brand-rose px-4 md:px-8 py-2 md:py-2.5 rounded-lg md:rounded-xl shadow-xl shadow-brand-rose/20 border-2 border-white/10">REF: {s.ref}</span>
                        <div className="h-px flex-1 bg-white/10 hidden sm:block mx-4 md:mx-6" />
                        <h4 className="text-xl md:text-2xl font-display font-black text-white italic uppercase tracking-tighter">{s.titulo}</h4>
                      </div>
                      
                      <div className="p-4 md:p-6 bg-brand-rose/10 rounded-xl md:rounded-2xl border border-brand-rose/30 mb-4 text-center">
                         <div className="text-lg md:text-2xl text-white font-black leading-relaxed">→ {s.fluxo}</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
                        <div className="p-4 md:p-6 bg-white/[0.03] rounded-xl md:rounded-2xl border border-white/10 hover:bg-white/[0.08] transition-all hover:border-brand-rose/30 group/item text-center">
                          <div className="text-[8px] md:text-[10px] text-brand-rose font-black uppercase tracking-widest mb-1 md:mb-2">O Pai</div>
                          <div className="text-sm md:text-base text-white/90 font-medium leading-relaxed italic">{s.pai}</div>
                        </div>
                        <div className="p-4 md:p-6 bg-white/[0.03] rounded-xl md:rounded-2xl border border-white/10 hover:bg-white/[0.08] transition-all hover:border-brand-rose/30 group/item text-center">
                          <div className="text-[8px] md:text-[10px] text-brand-rose font-black uppercase tracking-widest mb-1 md:mb-2">O Filho</div>
                          <div className="text-sm md:text-base text-white/90 font-medium leading-relaxed italic">{s.filho}</div>
                        </div>
                        <div className="p-4 md:p-6 bg-white/[0.03] rounded-xl md:rounded-2xl border border-white/10 hover:bg-white/[0.08] transition-all hover:border-brand-rose/30 group/item text-center">
                          <div className="text-[8px] md:text-[10px] text-brand-rose font-black uppercase tracking-widest mb-1 md:mb-2">O Espírito</div>
                          <div className="text-sm md:text-base text-white/90 font-medium leading-relaxed italic">{s.espirito}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {estudo.diagramas20.trinitario.explicacao && (
                  <div className="p-6 md:p-10 bg-brand-rose/5 rounded-2xl md:rounded-[2.5rem] border-l-4 md:border-l-8 border-brand-rose relative z-10 shadow-inner">
                    <p className="text-white text-lg md:text-xl leading-relaxed font-bold italic opacity-90">
                      {estudo.diagramas20.trinitario.explicacao}
                    </p>
                  </div>
                )}
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CLUBE DA BÍBLIA VISUAL CTA - AFTER CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 md:mt-24 pt-16 md:pt-24 border-t border-white/10"
      >
        <div className="glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border-2 border-brand-rose/20 bg-brand-rose/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 md:p-16 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
            <Zap className="w-32 h-32 md:w-64 md:h-64 text-brand-rose" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-brand-rose/10 rounded-2xl md:rounded-3xl flex items-center justify-center shrink-0 border border-brand-rose/30 shadow-2xl">
              <Zap className="w-10 h-10 md:w-12 md:h-12 text-brand-rose" />
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl md:text-4xl font-display font-black text-white uppercase tracking-tighter leading-tight">
                QUER IR AINDA <span className="text-brand-rose">MAIS PROFUNDO</span>?
              </h3>
              <p className="text-white/80 text-base md:text-xl font-medium max-w-2xl">
                Faça parte gratuitamente do nosso <span className="font-bold text-white">Clube da Bíblia Visual</span> e receba ensinos semanais, materiais exclusivos e cresça na compreensão das Escrituras.
              </p>
              <div className="pt-2">
                <a 
                  href="https://chat.whatsapp.com/HEIIFYAmLij62M0jRwwVhH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 px-8 md:px-12 py-4 md:py-5 bg-brand-rose text-white text-base md:text-lg font-black rounded-full hover:bg-white hover:text-brand-rose transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,45,85,0.4)]"
                >
                  ENTRAR NO CLUBE GRATUITAMENTE <ArrowRight className="w-5 h-5 md:w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
