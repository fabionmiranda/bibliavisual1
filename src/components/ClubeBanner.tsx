import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

const CLUBE_URL = 'https://chat.whatsapp.com/HEIIFYAmLij62M0jRwwVhH';

export default function ClubeBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-brand-blue/30 px-6 sm:px-10 py-8 sm:py-10"
      style={{
        background: 'linear-gradient(135deg, rgba(0,212,255,0.07) 0%, rgba(123,47,247,0.05) 60%, rgba(0,0,0,0) 100%)',
        boxShadow: '0 0 60px rgba(0,212,255,0.06)',
      }}
    >
      {/* Glow de fundo decorativo */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.08), transparent 70%)' }} />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(123,47,247,0.08), transparent 70%)' }} />

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">

        {/* Icone */}
        <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: 'rgba(0,212,255,0.12)',
            border: '1px solid rgba(0,212,255,0.35)',
            boxShadow: '0 0 20px rgba(0,212,255,0.15)',
          }}>
          <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-brand-blue" strokeWidth={1.5} />
        </div>

        {/* Texto */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="font-display font-black text-lg sm:text-xl uppercase tracking-tight text-white leading-none">
              Clube da Biblia Visual
            </h3>
            <span className="font-mono text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{
                color: '#00d4ff',
                background: 'rgba(0,212,255,0.12)',
                border: '1px solid rgba(0,212,255,0.3)',
              }}>
              Gratuito
            </span>
          </div>
          <p className="text-white/65 text-sm sm:text-base leading-relaxed max-w-xl">
            Faca parte do clube e receba atualizacoes semanais, novos diagramas e ensinos profundos diretamente no seu WhatsApp.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0"
              style={{ boxShadow: '0 0 6px #00d4ff' }} />
            <span className="font-mono text-xs font-bold text-white/40 uppercase tracking-widest">
              Antigo e Novo Testamento
            </span>
          </div>
        </div>

        {/* Botao */}
        <a
          href={CLUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl
            font-black text-sm sm:text-base uppercase tracking-wider
            text-bg-deep bg-brand-blue hover:bg-white
            transition-all duration-200 hover:scale-105 active:scale-95
            shadow-lg"
          style={{ boxShadow: '0 0 24px rgba(0,212,255,0.35)' }}
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
          Entrar no Grupo
        </a>

      </div>
    </motion.div>
  );
}
