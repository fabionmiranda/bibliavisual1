import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Languages, Zap, Target, Layout, Activity, ArrowRightCircle,
  Flame, Compass, ShieldCheck, Users, Cross, BookOpen,
  AlertTriangle, Repeat, ShieldAlert, MessageSquare, PenTool,
  Mic2, Heart, Award, ChevronRight, X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import { BIBLE_DATA } from '../data/bibleData';
import { BOOK_CONFIG } from './LivroPage';
import type { EstudoCapitulo } from '../types/bible';

// ─── Definição dos 20 diagramas ──────────────────────────────────────────────
interface DiagramaDef {
  id: keyof NonNullable<EstudoCapitulo['diagramas20']>;
  titulo: string;
  subtitulo: string;
  icon: LucideIcon;
  cor: string;         // classe Tailwind p/ a cor principal
  numero: number;
}

const DIAGRAMAS: DiagramaDef[] = [
  { numero: 1,  id: 'interlinear',       titulo: 'Interlinear',          subtitulo: 'O texto original palavra por palavra',              icon: Languages,        cor: 'brand-blue'   },
  { numero: 2,  id: 'morfologicoLexical',titulo: 'Morfológico-Lexical',  subtitulo: 'Formas, raízes e campos semânticos',                icon: Zap,              cor: 'brand-purple' },
  { numero: 3,  id: 'quiastico',         titulo: 'Quiástico',            subtitulo: 'Estrutura espelhada e centro de ênfase',            icon: Target,           cor: 'brand-rose'   },
  { numero: 4,  id: 'sintatico',         titulo: 'Sintático',            subtitulo: 'Sujeito, verbo e objeto no texto',                  icon: Layout,           cor: 'brand-blue'   },
  { numero: 5,  id: 'semantico',         titulo: 'Semântico',            subtitulo: 'Fluxo de significado e lógica das ideias',          icon: Activity,         cor: 'brand-purple' },
  { numero: 6,  id: 'progressivo',       titulo: 'Progressivo',          subtitulo: 'Avanço passo a passo até o objetivo',               icon: ArrowRightCircle, cor: 'brand-rose'   },
  { numero: 7,  id: 'intensificacao',    titulo: 'Intensificação',       subtitulo: 'Escalada de peso, gravidade e exigência',           icon: Flame,            cor: 'brand-blue'   },
  { numero: 8,  id: 'espacial',          titulo: 'Espacial',             subtitulo: 'Esferas humana, social e divina',                   icon: Compass,          cor: 'brand-purple' },
  { numero: 9,  id: 'acesso',            titulo: 'Acesso',               subtitulo: 'Quem pode agir e os limites diante de Deus',        icon: ShieldCheck,      cor: 'brand-rose'   },
  { numero: 10, id: 'relacional',        titulo: 'Relacional',           subtitulo: 'Relações rompidas, afetadas ou restauradas',        icon: Users,            cor: 'brand-blue'   },
  { numero: 11, id: 'cristologico',      titulo: 'Cristológico',         subtitulo: 'Como o texto aponta ou se cumpre em Cristo',        icon: Cross,            cor: 'brand-purple' },
  { numero: 12, id: 'sistematico',       titulo: 'Sistemático',          subtitulo: 'Doutrinas presentes e sua conexão',                 icon: BookOpen,         cor: 'brand-rose'   },
  { numero: 13, id: 'tensao',            titulo: 'Tensão',               subtitulo: 'O problema central e sua resolução',                icon: AlertTriangle,    cor: 'brand-blue'   },
  { numero: 14, id: 'repeticao',         titulo: 'Repetição',            subtitulo: 'Ênfases reveladas por repetições',                  icon: Repeat,           cor: 'brand-purple' },
  { numero: 15, id: 'causaEfeito',       titulo: 'Causa e Efeito',       subtitulo: 'Lógica moral e teológica do texto',                 icon: Zap,              cor: 'brand-rose'   },
  { numero: 16, id: 'apologetico',       titulo: 'Apologético',          subtitulo: 'Erros e visões distorcidas que o texto corrige',    icon: ShieldAlert,      cor: 'brand-blue'   },
  { numero: 17, id: 'perguntas',         titulo: 'Perguntas',            subtitulo: 'Perguntas que o texto exige que façamos',           icon: MessageSquare,    cor: 'brand-purple' },
  { numero: 18, id: 'autoral',           titulo: 'Autoral',              subtitulo: 'Como intérpretes entenderam cada parte',            icon: PenTool,          cor: 'brand-rose'   },
  { numero: 19, id: 'homiletico',        titulo: 'Homilético',           subtitulo: 'Como pregar este texto com fidelidade',             icon: Mic2,             cor: 'brand-blue'   },
  { numero: 20, id: 'pastoralPratico',   titulo: 'Pastoral Prático',     subtitulo: 'Como viver este texto na vida da igreja',           icon: Heart,            cor: 'brand-purple' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function temDados(estudo: EstudoCapitulo, id: DiagramaDef['id']): boolean {
  const d = estudo.diagramas20?.[id];
  if (!d) return false;
  return Object.values(d as Record<string, unknown>).some(v =>
    Array.isArray(v) ? v.length > 0 : typeof v === 'string' ? v.trim().length > 0 : false
  );
}

// ─── Renderizadores de conteúdo por diagrama ─────────────────────────────────
function renderInterlinear(estudo: EstudoCapitulo) {
  const d = estudo.diagramas20?.interlinear;
  if (!d) return null;
  return (
    <div className="space-y-6">
      {d.secoes.map((s, i) => (
        <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 space-y-3">
          <p className="text-xs font-black uppercase tracking-widest text-brand-blue">{s.ref}</p>
          <p className="text-2xl sm:text-3xl font-bold text-white leading-relaxed">{s.hebraico}</p>
          <p className="text-sm sm:text-base text-white/50 italic">{s.transliteracao}</p>
          <p className="text-base sm:text-lg text-white/80 font-medium">{s.traducao}</p>
        </div>
      ))}
      {d.explicacao && (
        <p className="text-white/50 text-sm sm:text-base italic border-l-2 border-brand-blue/30 pl-4">{d.explicacao}</p>
      )}
    </div>
  );
}

// Renderizador genérico para diagramas com lista simples
function renderLista(items: { ref: string; [key: string]: string }[], campoValor: string, cor: string) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <span className={`text-xs font-black uppercase tracking-widest text-${cor} shrink-0 mt-0.5 w-20`}>{item.ref}</span>
          <p className="text-white/80 text-sm sm:text-base">{item[campoValor] ?? Object.values(item).find((v, idx) => idx > 0 && typeof v === 'string') as string}</p>
        </div>
      ))}
    </div>
  );
}

function renderConteudo(estudo: EstudoCapitulo, id: DiagramaDef['id'], cor: string) {
  const d = estudo.diagramas20 as Record<string, unknown>;
  if (!d) return null;

  switch (id) {
    case 'interlinear':       return renderInterlinear(estudo);
    case 'morfologicoLexical': {
      const items = (d.morfologicoLexical as any)?.termos ?? [];
      return (
        <div className="space-y-3">
          {items.map((t: any, i: number) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-lg font-bold text-white">{t.termo}</span>
                {t.transliteracao && <span className="text-sm text-white/40 italic">{t.transliteracao}</span>}
                {t.ref && <span className={`text-xs font-black uppercase tracking-widest text-${cor}`}>{t.ref}</span>}
              </div>
              <p className="text-white/70 text-sm sm:text-base">{t.significado}</p>
            </div>
          ))}
        </div>
      );
    }
    case 'quiastico': return renderLista((d.quiastico as any)?.blocos ?? [], 'conteudo', cor);
    case 'sintatico': {
      const blocos = (d.sintatico as any)?.blocos ?? [];
      return (
        <div className="space-y-3">
          {blocos.map((b: any, i: number) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1">
              <span className={`text-xs font-black uppercase tracking-widest text-${cor}`}>{b.ref}</span>
              <p className="text-white/80 text-sm"><span className="text-white/40 mr-2">Sujeito:</span>{b.sujeito}</p>
              <p className="text-white/80 text-sm"><span className="text-white/40 mr-2">Verbos:</span>{b.verbos}</p>
              {b.objeto && <p className="text-white/80 text-sm"><span className="text-white/40 mr-2">Objeto:</span>{b.objeto}</p>}
            </div>
          ))}
        </div>
      );
    }
    case 'semantico':      return renderLista((d.semantico as any)?.fluxo ?? [], 'ideia', cor);
    case 'progressivo':    return renderLista((d.progressivo as any)?.etapas ?? [], 'acao', cor);
    case 'intensificacao': return renderLista((d.intensificacao as any)?.niveis ?? [], 'foco', cor);
    case 'espacial':       return renderLista((d.espacial as any)?.esferas ?? [], 'esfera', cor);
    case 'acesso':         return renderLista((d.acesso as any)?.permissoes ?? [], 'acao', cor);
    case 'relacional':     return renderLista((d.relacional as any)?.vinculos ?? [], 'status', cor);
    case 'cristologico':   return renderLista((d.cristologico as any)?.conexoes ?? [], 'apontaPara', cor);
    case 'sistematico':    return renderLista((d.sistematico as any)?.doutrinas ?? [], 'doutrina', cor);
    case 'tensao':         return renderLista((d.tensao as any)?.movimento ?? [], 'estado', cor);
    case 'repeticao':      return renderLista((d.repeticao as any)?.padroes ?? [], 'tema', cor);
    case 'causaEfeito': {
      const items = (d.causaEfeito as any)?.logica ?? [];
      return (
        <div className="space-y-3">
          {items.map((it: any, i: number) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1">
              <span className={`text-xs font-black uppercase tracking-widest text-${cor}`}>{it.ref}</span>
              <p className="text-white/80 text-sm"><span className="text-white/40 mr-2">Ação:</span>{it.acao}</p>
              {it.consequencia && <p className="text-white/80 text-sm"><span className="text-white/40 mr-2">→</span>{it.consequencia}</p>}
            </div>
          ))}
        </div>
      );
    }
    case 'apologetico': {
      const items = (d.apologetico as any)?.confrontos ?? [];
      return (
        <div className="space-y-3">
          {items.map((it: any, i: number) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1">
              <span className={`text-xs font-black uppercase tracking-widest text-${cor}`}>{it.ref}</span>
              <p className="text-white/80 text-sm font-medium">{it.tema}</p>
              {it.heresias?.length > 0 && <p className="text-white/50 text-xs">{it.heresias.join(' · ')}</p>}
            </div>
          ))}
        </div>
      );
    }
    case 'perguntas': {
      const secoes = (d.perguntas as any)?.secoes ?? [];
      return (
        <div className="space-y-5">
          {secoes.map((s: any, i: number) => (
            <div key={i} className="space-y-2">
              <p className={`text-sm font-black uppercase tracking-widest text-${cor}`}>{s.ref} — {s.titulo}</p>
              {s.perguntas?.map((q: string, j: number) => (
                <p key={j} className="text-white/70 text-sm sm:text-base pl-4 border-l border-white/10">{q}</p>
              ))}
            </div>
          ))}
        </div>
      );
    }
    case 'autoral': {
      const contrib = (d.autoral as any)?.contribuicoes ?? [];
      return (
        <div className="space-y-5">
          {contrib.map((c: any, i: number) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
              <p className={`text-sm font-black uppercase tracking-widest text-${cor}`}>{c.label} — {c.titulo}</p>
              {c.autores?.map((a: any, j: number) => (
                <p key={j} className="text-white/70 text-sm pl-4 border-l border-white/10"><span className="text-white/40 mr-2">{a.nome}:</span>{a.comentario}</p>
              ))}
            </div>
          ))}
        </div>
      );
    }
    case 'homiletico': {
      const h = (d.homiletico as any) ?? {};
      return (
        <div className="space-y-4">
          {h.temaCentral && <p className={`text-lg sm:text-xl font-bold text-${cor}`}>{h.temaCentral}</p>}
          {(h.esboço ?? []).map((e: any, i: number) => (
            <div key={i} className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <span className={`text-sm font-black text-${cor} shrink-0`}>{e.label}</span>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{e.ref}</p>
                <p className="text-white/80 text-sm sm:text-base">{e.ponto}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
    case 'pastoralPratico': {
      const items = (d.pastoralPratico as any)?.direcionamentos ?? [];
      return (
        <div className="space-y-5">
          {items.map((it: any, i: number) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
              <p className={`text-sm font-black uppercase tracking-widest text-${cor}`}>{it.ref} — {it.titulo}</p>
              {it.adultos && <p className="text-white/70 text-sm"><span className="text-white/40 mr-2">Adultos:</span>{it.adultos}</p>}
              {it.jovens  && <p className="text-white/70 text-sm"><span className="text-white/40 mr-2">Jovens:</span>{it.jovens}</p>}
              {it.igreja  && <p className="text-white/70 text-sm"><span className="text-white/40 mr-2">Igreja:</span>{it.igreja}</p>}
            </div>
          ))}
        </div>
      );
    }
    default: return <p className="text-white/40">Conteúdo não disponível.</p>;
  }
}

// ─── Componente principal ─────────────────────────────────────────────────────
interface Props { testamento: 'AT' | 'NT' }

export default function DiagramasPage({ testamento }: Props) {
  const { livro: livroId = '' } = useParams<{ livro: string }>();
  const livroData  = BIBLE_DATA.livros.find(l => l.id === livroId);
  const cfg        = BOOK_CONFIG[livroId];
  const Icone      = cfg?.icon ?? BookOpen;
  const storageKey = `estudo_${livroId}`;

  const [aberto, setAberto] = useState<DiagramaDef['id'] | null>(null);

  // Carrega estudo do localStorage
  let estudo: EstudoCapitulo | null = null;
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) estudo = JSON.parse(raw) as EstudoCapitulo;
  } catch { /* ignore */ }

  if (!estudo) {
    return (
      <div className="min-h-screen flex flex-col bg-bg-deep text-white">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center gap-6 px-4 text-center pt-24 pb-16">
          <BookOpen className="w-20 h-20 text-white/10" />
          <p className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tighter text-white/30">
            {livroData?.nome ?? livroId}
          </p>
          <p className="text-white/30 text-base sm:text-lg max-w-sm">
            Estudo ainda não disponível.
          </p>
          <Link to="/biblioteca" className="text-sm text-brand-blue/60 hover:text-brand-blue transition-colors mt-2">
            ← Voltar à Biblioteca
          </Link>
        </main>
      </div>
    );
  }

  const disponíveis = DIAGRAMAS.filter(d => temDados(estudo!, d.id));
  const naoDisponiveis = DIAGRAMAS.filter(d => !temDados(estudo!, d.id));

  return (
    <div className="min-h-screen flex flex-col bg-bg-deep text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-10">
          <Link to="/biblioteca" className="hover:text-brand-blue transition-colors">Biblioteca</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white/70">Diagramas</span>
        </nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-5 mb-14"
        >
          {cfg && (
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${cfg.grad} border border-white/10 shadow-xl shrink-0`}>
              <Icone className="w-10 h-10 text-white/90" strokeWidth={1.2} />
            </div>
          )}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-brand-blue font-bold mb-1">
              {disponíveis.length} diagrama{disponíveis.length !== 1 ? 's' : ''} disponíve{disponíveis.length !== 1 ? 'is' : 'l'}
            </p>
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tighter">
              {livroData?.nome ?? livroId}
            </h1>
          </div>
        </motion.div>

        {/* Grade de botões — diagramas disponíveis */}
        {disponíveis.length > 0 && (
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-white/30 font-bold mb-6">Diagramas disponíveis</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {disponíveis.map((d, i) => (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => setAberto(aberto === d.id ? null : d.id)}
                    className={`w-full text-left rounded-2xl border transition-all duration-200 p-5 sm:p-6 group
                      ${aberto === d.id
                        ? `border-${d.cor}/50 bg-${d.cor}/10`
                        : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                      }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl bg-${d.cor}/10 group-hover:bg-${d.cor}/20 transition-colors`}>
                          <d.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${d.cor}`} strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className={`text-[10px] font-black uppercase tracking-widest text-${d.cor} mb-0.5`}>
                            Diagrama {d.numero}
                          </p>
                          <p className="text-white font-bold text-base sm:text-lg leading-tight">{d.titulo}</p>
                        </div>
                      </div>
                      <div className={`shrink-0 mt-1 transition-transform duration-200 ${aberto === d.id ? 'rotate-45' : ''}`}>
                        {aberto === d.id
                          ? <X className="w-4 h-4 text-white/40" />
                          : <ChevronRight className={`w-4 h-4 text-${d.cor}/60`} />
                        }
                      </div>
                    </div>
                    <p className="text-white/40 text-xs sm:text-sm mt-3 leading-relaxed">{d.subtitulo}</p>
                  </button>

                  {/* Conteúdo expandido */}
                  <AnimatePresence>
                    {aberto === d.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className={`mt-2 rounded-2xl border border-${d.cor}/20 bg-${d.cor}/5 p-5 sm:p-6`}>
                          {renderConteudo(estudo!, d.id, d.cor)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Diagramas não disponíveis — aparência desativada */}
        {naoDisponiveis.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/20 font-bold mb-6">
              Não encontrados no arquivo ({naoDisponiveis.length})
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {naoDisponiveis.map(d => (
                <div
                  key={d.id}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 opacity-40"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <d.icon className="w-4 h-4 text-white/30" strokeWidth={1.5} />
                    <p className="text-white/40 font-bold text-sm">{d.titulo}</p>
                  </div>
                  <p className="text-[10px] text-white/20 uppercase tracking-widest">Diagrama {d.numero}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
