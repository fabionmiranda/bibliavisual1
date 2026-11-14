// Peças visuais compartilhadas pelos estudos dos capítulos de "Como Ser um Conservador".
import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronDown, Quote, type LucideIcon } from 'lucide-react';
import { R, BASE_SCRUTON } from '../../data/scrutonConservador';

export const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45 },
};

/** Título de seção grande com ícone. */
export function Titulo({ kicker, titulo, icon: Icon, cor }: { kicker: string; titulo: string; icon: LucideIcon; cor: string }) {
  return (
    <div className="flex items-center gap-4 mb-7">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: cor + '1f', border: `1px solid ${cor}45` }}>
        <Icon className="w-6 h-6" style={{ color: cor }} />
      </div>
      <div>
        <p className="text-[14px] font-black tracking-[0.3em] uppercase" style={{ color: cor }}>{kicker}</p>
        <h2 className="font-display font-black text-2xl sm:text-3xl text-white leading-tight">{titulo}</h2>
      </div>
      <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-white/15 to-transparent" />
    </div>
  );
}

/** Lista com marcadores coloridos; itens aceitam as ênfases de R. */
export function Lista({ itens, cor }: { itens: string[]; cor: string }) {
  return (
    <ul className="flex flex-col gap-3">
      {itens.map((t, i) => (
        <li key={i} className="flex gap-3 text-white/85 text-[17px] sm:text-lg leading-relaxed">
          <span className="mt-2.5 w-2 h-2 rounded-full shrink-0" style={{ background: cor }} />
          <span><R t={t} cor={cor} /></span>
        </li>
      ))}
    </ul>
  );
}

/** Dois quadros lado a lado: o que se rejeita x o que se afirma. */
export function Contraste({ a, b }: { a: { rot: string; t: string }; b: { rot: string; t: string } }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="rounded-2xl p-5 border border-red-400/30 bg-red-500/[0.07]">
        <p className="text-[13px] font-black uppercase tracking-widest text-red-300 mb-1">{a.rot}</p>
        <p className="font-display font-black text-xl text-white leading-snug">{a.t}</p>
      </div>
      <div className="rounded-2xl p-5 border border-emerald-400/35 bg-emerald-500/[0.09]">
        <p className="text-[13px] font-black uppercase tracking-widest text-emerald-300 mb-1">{b.rot}</p>
        <p className="font-display font-black text-xl text-white leading-snug">{b.t}</p>
      </div>
    </div>
  );
}

/** Citação em destaque. */
export function Citacao({ children, cor, fonte }: { children: ReactNode; cor: string; fonte?: string }) {
  return (
    <blockquote className="rounded-2xl p-5 sm:p-6 border-l-4 bg-white/[0.04]" style={{ borderColor: cor }}>
      <p className="font-display text-lg sm:text-xl text-white leading-snug font-bold">{children}</p>
      {fonte && <p className="mt-2 text-[14px] font-black uppercase tracking-widest text-white/50">{fonte}</p>}
    </blockquote>
  );
}

export function EmUmaFrase({ cor, children, referencia }: { cor: string; children: ReactNode; referencia: ReactNode }) {
  return (
    <motion.section {...fade}>
      <div
        className="relative overflow-hidden rounded-3xl p-7 sm:p-10 border"
        style={{ borderColor: cor + '55', background: `linear-gradient(135deg, ${cor}26, rgba(15,23,42,0.6) 60%)` }}
      >
        <Quote className="absolute -top-2 right-4 w-28 h-28 text-white/[0.05]" />
        <p className="text-[14px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: cor }}>Em uma frase</p>
        <p className="relative font-display text-2xl sm:text-[30px] text-white font-bold leading-snug">{children}</p>
        <p className="mt-5 text-white/55 text-[15px] leading-relaxed">{referencia}</p>
      </div>
    </motion.section>
  );
}

export function Conceitos({ itens }: { itens: { termo: string; def: string; cor: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {itens.map(c => (
        <div key={c.termo} className="rounded-2xl p-6 border border-white/10 bg-white/[0.03]">
          <div className="w-8 h-1 rounded-full mb-4" style={{ background: c.cor }} />
          <h4 className="font-display font-black text-xl text-white mb-2">{c.termo}</h4>
          <p className="text-white/80 text-[17px] leading-relaxed"><R t={c.def} cor={c.cor} /></p>
        </div>
      ))}
    </div>
  );
}

export function Frases({ itens }: { itens: { f: string; fonte?: string; cor: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {itens.map((f, i) => (
        <div key={i} className="rounded-3xl p-6 sm:p-7 border bg-white/[0.03]" style={{ borderColor: f.cor + '45' }}>
          <Quote className="w-7 h-7 mb-3" style={{ color: f.cor }} />
          <p className="font-display text-xl text-white font-bold leading-snug">{f.f}</p>
          {f.fonte && <p className="mt-2 text-[14px] font-black uppercase tracking-widest text-white/50">{f.fonte}</p>}
        </div>
      ))}
    </div>
  );
}

export function Questoes({ itens, cor }: { itens: { q: string; r: string }[]; cor: string }) {
  const [aberta, setAberta] = useState<number | null>(null);
  return (
    <>
      <p className="text-white/60 text-[16px] mb-5">Pense na resposta e depois toque para ver uma sugestão.</p>
      <div className="flex flex-col gap-3">
        {itens.map((q, i) => {
          const on = aberta === i;
          return (
            <div key={i} className={`rounded-2xl border transition-colors ${on ? 'border-white/25 bg-white/[0.05]' : 'border-white/10 bg-white/[0.025] hover:border-white/20'}`}>
              <button onClick={() => setAberta(on ? null : i)} className="w-full flex items-start gap-4 p-5 text-left">
                <span className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-black text-[15px] text-white" style={{ background: cor }}>{i + 1}</span>
                <span className="flex-1 text-white/90 text-[17px] sm:text-lg leading-relaxed pt-0.5">{q.q}</span>
                <ChevronDown className={`w-5 h-5 mt-1.5 text-white/50 shrink-0 transition-transform ${on ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-5 pb-5 sm:pl-[72px]">
                      <div className="rounded-xl p-4 border border-emerald-400/25 bg-emerald-500/[0.06]">
                        <p className="text-[13px] font-black uppercase tracking-widest text-emerald-300 mb-1">Sugestão de resposta</p>
                        <p className="text-white/85 text-[17px] leading-relaxed"><R t={q.r} cor="#6ee7b7" /></p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </>
  );
}

export function Refletir({ itens }: { itens: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {itens.map((t, i) => (
        <div key={i} className="rounded-2xl p-6 border border-amber-400/25 bg-amber-400/[0.05]">
          <span className="font-display font-black text-3xl text-amber-300/60">?</span>
          <p className="mt-2 text-white/85 text-[17px] leading-relaxed"><R t={t} cor="#fcd34d" /></p>
        </div>
      ))}
    </div>
  );
}

export function Ligacoes({ itens, cor }: { itens: { to: string; rot: string; t: string }[]; cor: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {itens.map(l => (
        <Link
          key={l.rot}
          to={`${BASE_SCRUTON}/${l.to}`}
          className="group rounded-2xl p-6 border border-white/10 bg-white/[0.03] hover:border-white/30 hover:-translate-y-0.5 transition-all"
        >
          <p className="text-[14px] font-black uppercase tracking-widest mb-2" style={{ color: cor }}>{l.rot} →</p>
          <p className="text-white/85 text-[17px] leading-relaxed"><R t={l.t} cor={cor} /></p>
        </Link>
      ))}
    </div>
  );
}
