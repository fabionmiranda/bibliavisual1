import { motion } from 'motion/react';
import { BookOpen, Languages, Layout, Cross, HelpCircle, ListChecks, Volume2 } from 'lucide-react';
import { PerguntaExegetica } from '../types/bible';

interface DiagramBlockProps {
  titulo: string;
  hebraico?: string;
  transliteracao?: string;
  traducao?: string;
  diagrama: string;
  estrutura?: string;
  aplicacao: string;
  textoChave?: string;
  resumoEstrutural?: string;
  integracaoOriginal?: string;
  fluxoVisual?: string;
  resumoVisual?: string;
  fraseFinal?: string;
  perguntasExegeticas?: PerguntaExegetica[];
  estruturaHomiletica?: string[];
}

export default function DiagramBlock({
  titulo,
  hebraico,
  transliteracao,
  traducao,
  diagrama,
  estrutura,
  aplicacao,
  textoChave,
  resumoEstrutural,
  integracaoOriginal,
  fluxoVisual,
  resumoVisual,
  fraseFinal,
  perguntasExegeticas,
  estruturaHomiletica
}: DiagramBlockProps) {
  const playHebrewAudio = (text: string) => {
    // Cancel any ongoing speech to avoid queuing
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'he-IL';
    utterance.rate = 0.7; // Slightly slower for better educational clarity
    
    // Attempt to find a specific Hebrew voice if available
    const voices = window.speechSynthesis.getVoices();
    const hebrewVoice = voices.find(v => v.lang.includes('he-IL') || v.lang.includes('he'));
    if (hebrewVoice) {
      utterance.voice = hebrewVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full space-y-12"
    >
      {/* Header */}
      <div className="border-l-4 border-brand-blue pl-6 py-2">
        <h3 className="text-3xl font-display font-bold tracking-tight text-white">
          {titulo}
        </h3>
      </div>

      {/* Texto Chave Section */}
      {textoChave && (
        <div className="glass rounded-3xl p-8 border-l-4 border-brand-blue">
          <div className="flex items-center gap-3 text-brand-blue mb-6">
            <BookOpen className="w-6 h-6" />
            <h4 className="font-display font-bold uppercase tracking-wider text-sm">Texto-Chave do Bloco</h4>
          </div>
          <pre className="font-mono text-sm text-white/80 whitespace-pre-wrap leading-relaxed">
            {textoChave.trim()}
          </pre>
        </div>
      )}

      {/* Resumo Estrutural Section */}
      {resumoEstrutural && (
        <div className="glass rounded-3xl p-8">
          <div className="flex items-center gap-3 text-brand-purple mb-6">
            <Layout className="w-6 h-6" />
            <h4 className="font-display font-bold uppercase tracking-wider text-sm">1. Texto Bíblico (Resumo Estrutural)</h4>
          </div>
          <pre className="font-mono text-sm text-white/90 whitespace-pre-wrap leading-loose">
            {resumoEstrutural.trim()}
          </pre>
        </div>
      )}

      {/* Syntactic Structure (Diagrama) */}
      <div className="glass rounded-3xl p-8 space-y-6">
        <div className="flex items-center gap-3 text-brand-blue mb-4">
          <Layout className="w-6 h-6" />
          <h4 className="font-display font-bold uppercase tracking-wider text-sm">2. Estrutura Sintática do Bloco</h4>
        </div>
        
        <div className="bg-bg-deep/50 rounded-2xl p-6 border border-white/5 font-mono text-sm leading-loose overflow-x-auto">
          <pre className="text-brand-blue/90 whitespace-pre-wrap">
            {diagrama.trim()}
          </pre>
        </div>
        
        {estrutura && (
          <div className="flex items-center gap-2 text-xs font-bold text-white/70 uppercase tracking-widest">
            <span>Tipo:</span>
            <span className="text-brand-blue">{estrutura}</span>
          </div>
        )}
      </div>

      {/* Integração Original Section */}
      {integracaoOriginal && (
        <div className="glass rounded-3xl p-8">
          <div className="flex items-center gap-3 text-brand-rose mb-6">
            <Languages className="w-6 h-6" />
            <h4 className="font-display font-bold uppercase tracking-wider text-sm">3. Integração Hebraico + Significado</h4>
          </div>
          <pre className="font-mono text-sm text-white/80 whitespace-pre-wrap leading-relaxed">
            {integracaoOriginal.trim()}
          </pre>
        </div>
      )}

      {/* Original Analysis (Optional) */}
      {(hebraico || transliteracao || traducao) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3 text-brand-blue mb-4">
              <Languages className="w-6 h-6" />
              <h4 className="font-display font-bold uppercase tracking-wider text-sm">Análise Original</h4>
            </div>
            
            <div className="space-y-4">
              {hebraico && (
                <div className="flex flex-col items-end gap-2">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => playHebrewAudio(hebraico)}
                    className="p-2 rounded-xl bg-brand-blue/10 text-brand-blue hover:bg-brand-blue hover:text-bg-deep transition-all flex items-center gap-2 text-xs font-bold shadow-sm hover:shadow-brand-blue/20"
                  >
                    <Volume2 className="w-4 h-4" />
                    Ouvir Pronúncia
                  </motion.button>
                  <div className="text-right w-full">
                    <p className="text-3xl font-serif leading-relaxed text-brand-blue/90" dir="rtl">
                      {hebraico}
                    </p>
                  </div>
                </div>
              )}
              {transliteracao && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-sm text-white/70 italic mb-1">Transliteração:</p>
                  <p className="text-[#d8b4fe] font-medium italic">{transliteracao}</p>
                </div>
              )}
              {traducao && (
                <div className="p-4 bg-brand-blue/5 rounded-xl border border-brand-blue/10">
                  <p className="text-sm text-brand-blue/50 font-bold uppercase mb-1">Tradução:</p>
                  <p className="text-white leading-relaxed">{traducao}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Exegetical Questions Section */}
      {perguntasExegeticas && perguntasExegeticas.length > 0 && (
        <div className="glass rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-3 text-brand-blue mb-4">
            <HelpCircle className="w-6 h-6" />
            <h4 className="font-display font-bold uppercase tracking-wider text-sm">4. Perguntas Exegéticas no Texto</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {perguntasExegeticas.map((p, i) => (
              <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                <p className="text-brand-blue font-bold text-sm uppercase tracking-wider">{p.termo}</p>
                <p className="text-white font-medium italic">"{p.pergunta}"</p>
                <p className="text-white/80 text-sm leading-relaxed">{p.resposta}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fluxo Visual Section */}
      {fluxoVisual && (
        <div className="glass rounded-3xl p-8">
          <div className="flex items-center gap-3 text-brand-purple mb-6">
            <Layout className="w-6 h-6" />
            <h4 className="font-display font-bold uppercase tracking-wider text-sm">5. Fluxo Visual do Bloco</h4>
          </div>
          <pre className="font-mono text-sm text-white/90 whitespace-pre-wrap leading-relaxed text-center">
            {fluxoVisual.trim()}
          </pre>
        </div>
      )}

      {/* Homiletical Structure Section */}
      {estruturaHomiletica && estruturaHomiletica.length > 0 && (
        <div className="glass rounded-3xl p-8 space-y-6 bg-gradient-to-br from-brand-purple/5 to-transparent">
          <div className="flex items-center gap-3 text-brand-purple mb-4">
            <ListChecks className="w-6 h-6" />
            <h4 className="font-display font-bold uppercase tracking-wider text-sm">6. Divisão Homilética (Derivada do Texto)</h4>
          </div>
          <div className="space-y-4">
            {estruturaHomiletica.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-bg-deep/40 rounded-xl border border-white/5">
                <div className="w-6 h-6 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-white/80 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resumo Visual Final Section */}
      {resumoVisual && (
        <div className="glass rounded-3xl p-8 border-brand-rose/20">
          <div className="flex items-center gap-3 text-brand-rose mb-6">
            <Layout className="w-6 h-6" />
            <h4 className="font-display font-bold uppercase tracking-wider text-sm">7. Resumo Visual Final</h4>
          </div>
          <pre className="font-mono text-sm text-white/80 whitespace-pre-wrap leading-relaxed">
            {resumoVisual.trim()}
          </pre>
        </div>
      )}

      {/* Frase Homiletica Final Section */}
      {fraseFinal && (
        <div className="glass rounded-3xl p-8 bg-brand-blue/5 border-brand-blue/20">
          <div className="flex items-center gap-3 text-brand-blue mb-4">
            <Cross className="w-6 h-6" />
            <h4 className="font-display font-bold uppercase tracking-wider text-sm">8. Frase Homilética Final</h4>
          </div>
          <p className="text-xl font-display font-bold text-white italic leading-relaxed">
            "{fraseFinal}"
          </p>
        </div>
      )}

      {/* Application Section */}
      <div className="glass rounded-3xl p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <Cross className="w-32 h-32 text-brand-rose" />
        </div>
        
        <div className="flex items-center gap-3 text-brand-rose mb-6">
          <Cross className="w-6 h-6" />
          <h4 className="font-display font-bold uppercase tracking-wider text-sm">Aplicação Cristocêntrica</h4>
        </div>
        
        <p className="text-lg text-white/80 leading-relaxed relative z-10">
          {aplicacao}
        </p>
      </div>
    </motion.div>
  );
}
