import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, BookOpen, Quote, ChevronRight, ExternalLink,
  GraduationCap, Flag, Lightbulb, Home, Landmark, Scale, Target,
  MessageSquare, AlertTriangle, CalendarDays, Sparkles, Hammer,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AZUL, AMAZON, R, PARTES, rotaCapitulo, type Capitulo } from '../data/scrutonConservador';

// ── Ficha técnica ─────────────────────────────────────────────────────────────
const FICHA = [
  { k: 'Título original', v: 'How to Be a Conservative (Bloomsbury, 2014)' },
  { k: 'Edição brasileira', v: 'Record, 2015' },
  { k: 'Tradução', v: 'Bruno Garschagen' },
  { k: 'Revisão técnica', v: 'Márcia Xavier de Brito' },
  { k: 'Estrutura', v: 'Prefácio + 13 capítulos' },
  { k: 'Gênero', v: 'Ensaio de filosofia política, com memória pessoal' },
];

// ── Autor ─────────────────────────────────────────────────────────────────────
const AUTOR = [
  {
    icon: GraduationCap,
    titulo: 'Formação',
    texto: '**Filósofo inglês**, filho de pai sindicalista e membro do Partido Trabalhista. Estudou em __Cambridge__ e lecionou no __Birkbeck College__, em Londres.',
  },
  {
    icon: Flag,
    titulo: 'Militância',
    texto: 'Fundou a revista __Salisbury Review__, dedicada ao pensamento conservador, e ==apoiou a rede clandestina de dissidentes== na Tchecoslováquia, Polônia e Hungria durante o regime comunista.',
  },
  {
    icon: Lightbulb,
    titulo: 'Virada intelectual',
    texto: '**Três experiências** moldaram sua defesa da sociedade civil: **Maio de 1968** em Paris, o estudo da **common law** inglesa e o contato com o **comunismo real** no Leste Europeu.',
  },
];

const VIRADA = [
  { ano: '1968', titulo: 'Maio de 68 em Paris', texto: 'Viu estudantes que desfrutavam da liberdade "burguesa" querendo ==destruí-la em nome de uma liberdade ilusória==.' },
  { ano: 'Common law', titulo: 'O direito inglês', texto: 'Descobriu um direito que **pertence ao povo**, ==construído de baixo para cima==.' },
  { ano: '1979', titulo: 'Seminário clandestino em Praga', texto: 'A polícia o empurrou escada abaixo. Encontrou ==intelectuais proibidos de trabalhar==, que sobreviviam como **fornalheiros**.' },
  { ano: '1985', titulo: 'Preso e expulso', texto: 'Foi detido e expulso da Tchecoslováquia por apoiar os dissidentes.' },
  { ano: 'Depois', titulo: 'Fora da universidade', texto: 'Após os ataques ligados ao **caso Honeyford**, deixou a academia e passou a viver de seus escritos.' },
];

// ── Estrutura ─────────────────────────────────────────────────────────────────
const MOVIMENTOS = [
  { caps: 'Caps. 1–2', titulo: 'Fundamentos', texto: 'A trajetória do autor e a base do argumento: **sociedade civil**, **tradição**, **lar** e **pertença**.', cor: '#38bdf8' },
  { caps: 'Caps. 3–10', titulo: '"A verdade em..."', texto: '**Oito ideologias** examinadas: o que cada uma tem de ==verdadeiro== e onde se ==perverte==.', cor: AZUL },
  { caps: 'Caps. 11–13', titulo: 'Aplicação e despedida', texto: '**Esferas de valor**, **questões práticas** e o modo de ==lidar com a perda==.', cor: '#818cf8' },
];

const IDEOLOGIAS = [
  { nome: 'Nacionalismo', verdade: 'Um "nós" territorial que permite discordar', perversao: 'Nação como religião' },
  { nome: 'Socialismo', verdade: 'Dependência mútua; dever de gratidão', perversao: 'Soma zero e ressentimento' },
  { nome: 'Capitalismo', verdade: 'Propriedade e troca livre', perversao: 'Custos jogados sobre terceiros' },
  { nome: 'Liberalismo', verdade: 'Liberdade e consentimento', perversao: 'Inflação de direitos' },
  { nome: 'Multiculturalismo', verdade: 'Cultura cívica que integra', perversao: 'Repúdio da própria cultura' },
  { nome: 'Ambientalismo', verdade: 'Externalizamos custos', perversao: 'Maniqueísmo e burocracia global' },
  { nome: 'Internacionalismo', verdade: 'Estados que firmam acordos', perversao: 'Governo "de lugar nenhum"' },
  { nome: 'Conservadorismo', verdade: 'A sociedade cresce de baixo', perversao: 'Vale-tudo sem disciplina' },
];

// ── Conceitos ─────────────────────────────────────────────────────────────────
const CONCEITOS = [
  { termo: 'Oikophilia', def: '**Amor ao lar**, às pessoas e à comunidade ao redor.', cor: '#38bdf8' },
  { termo: 'Primeira pessoa do plural', def: 'O **"nós"** que ==vem antes da política== e a torna possível.', cor: AZUL },
  { termo: 'Pequenos pelotões', def: 'Associações **locais e voluntárias** (expressão de __Burke__).', cor: '#818cf8' },
  { termo: 'Associação civil', def: 'Associação que é ==um fim em si==, não um meio (__Oakeshott__).', cor: '#a78bfa' },
  { termo: 'Soma zero', def: 'A ==falsa crença== de que o ganho de um é a perda de outro.', cor: '#f472b6' },
  { termo: 'Princípio feudal', def: 'A propriedade é um **direito** e também um **dever** (__Disraeli__).', cor: '#fbbf24' },
];

const OBJETIVOS = [
  'Mostrar que o conservadorismo é a ==resposta racional== à ameaça que pesa sobre os bens que herdamos.',
  'Reconhecer o que há de **verdadeiro** nas ideologias rivais e mostrar onde elas se **corrompem**.',
  'Defender a **sociedade civil**, a **nação** e as instituições que ==crescem de baixo para cima==.',
  'Afirmar ==valores que não têm preço==, e ensinar a **viver com a perda sem desespero**.',
];

const PERGUNTAS = [
  'Que **bem coletivo** você considera ==fácil de destruir e difícil de recriar==?',
  'Qual ideologia do método "a verdade em..." você acha mais difícil de separar entre **núcleo** e **casca**? Por quê?',
  'Que cuidados tomar ao aplicar ao **Brasil** um livro escrito para o ==mundo de língua inglesa==?',
];

const ROTEIRO = [
  { aula: '1', caps: 'Introdução', foco: 'Visão panorâmica da obra' },
  { aula: '2', caps: '1 e 2', foco: 'Fundamentos: tradição, lar e pertença' },
  { aula: '3', caps: '3 e 4', foco: 'Nação e socialismo' },
  { aula: '4', caps: '5 e 6', foco: 'Mercado e liberdade' },
  { aula: '5', caps: '7 e 8', foco: 'Cultura e ambiente' },
  { aula: '6', caps: '9 e 10', foco: 'Soberania e sociedade civil' },
  { aula: '7', caps: '11', foco: 'Esferas de valor' },
  { aula: '8', caps: '12 e 13', foco: 'Questões práticas, perda e síntese' },
];

// ── Componentes auxiliares ────────────────────────────────────────────────────
function SecaoTitulo({ kicker, titulo, icon: Icon }: { kicker: string; titulo: string; icon: typeof BookOpen }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: AZUL + '1f', border: `1px solid ${AZUL}40` }}>
        <Icon className="w-5 h-5" style={{ color: AZUL }} />
      </div>
      <div>
        <p className="text-[14px] font-black tracking-[0.3em] uppercase text-brand-blue">{kicker}</p>
        <h2 className="font-display font-black text-2xl sm:text-3xl text-white leading-tight">{titulo}</h2>
      </div>
      <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-white/15 to-transparent" />
    </div>
  );
}

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
};

function CapituloItem({ cap, cor }: { cap: Capitulo; cor: string }) {
  return (
    <Link
      to={rotaCapitulo(cap.n)}
      className="group relative overflow-hidden flex flex-col h-full rounded-2xl p-5 sm:p-6 border border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06] hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="absolute inset-x-0 top-0 h-[3px] opacity-60 group-hover:opacity-100 transition-opacity" style={{ background: cor }} />
      <div className="flex items-start gap-4 mb-3">
        <span
          className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center font-display font-black text-base"
          style={{ color: cor, background: cor + '1a', border: `1px solid ${cor}40` }}
        >
          {cap.n}
        </span>
        <div className="min-w-0 pt-0.5">
          <p className="text-[13px] font-black uppercase tracking-widest text-white/45">
            {cap.n === 'Pref.' ? 'Prefácio' : `Capítulo ${cap.n}`}
          </p>
          <h3 className="font-display font-black text-lg sm:text-xl text-white leading-snug">{cap.titulo}</h3>
        </div>
      </div>
      <p className="text-white/75 text-[17px] leading-relaxed line-clamp-3 mb-4"><R t={cap.ideia} cor={cor} /></p>
      <div className="mt-auto flex items-center justify-between gap-3">
        {cap.completo || cap.conteudo?.length ? (
          <span className="text-[13px] font-black uppercase tracking-widest text-emerald-300">Conteúdo completo</span>
        ) : (
          <span className="text-[13px] font-black uppercase tracking-widest text-white/40">Resumo · em breve completo</span>
        )}
        <span className="flex items-center gap-1.5 text-[14px] font-black uppercase tracking-widest transition-all group-hover:gap-2.5" style={{ color: cor }}>
          Abrir
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

// ── Página ────────────────────────────────────────────────────────────────────
export default function LivroComoSerConservadorPage() {
  const [ideologia, setIdeologia] = useState(0);
  const ideo = IDEOLOGIAS[ideologia];

  return (
    <div className="min-h-screen relative bg-bg-deep">
      <Navbar />

      {/* ════ HERO ════ */}
      <section className="relative pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="pointer-events-none absolute -top-40 right-0 w-[520px] h-[520px] rounded-full blur-3xl opacity-20" style={{ background: AZUL }} />
        <div className="max-w-6xl mx-auto relative">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center gap-2 mb-10 text-[14px] font-black uppercase tracking-widest"
          >
            <Link to="/biblioteca" className="text-white/50 hover:text-brand-blue transition-colors">Biblioteca</Link>
            <ChevronRight className="w-3 h-3 text-white/30" />
            <Link to="/biblioteca/livros" className="text-white/50 hover:text-brand-blue transition-colors">Livros</Link>
            <ChevronRight className="w-3 h-3 text-white/30" />
            <span className="text-white/75">Como Ser um Conservador</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-16 items-start">
            {/* Capa */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6 items-center lg:items-start"
            >
              <div className="relative w-full max-w-[240px] lg:max-w-full">
                <div className="absolute -inset-8 rounded-[40px] blur-3xl opacity-40" style={{ background: `radial-gradient(ellipse at 50% 40%, ${AZUL} 0%, #1e3a8a 45%, transparent 70%)` }} />
                <img
                  src="/livros/como-ser-um-conservador.jpg"
                  alt="Capa de Como Ser um Conservador, de Roger Scruton"
                  className="relative w-full rounded-2xl"
                  style={{ aspectRatio: '337/500', objectFit: 'cover', boxShadow: '0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(59,130,246,0.35)' }}
                />
              </div>

              <a
                href={AMAZON}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-[240px] lg:max-w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-black text-base uppercase tracking-widest text-white transition-all hover:brightness-110 hover:-translate-y-0.5"
                style={{ background: `linear-gradient(135deg, ${AZUL}, #1d4ed8)`, boxShadow: `0 10px 30px ${AZUL}40` }}
              >
                Ver na Amazon
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {['Conservadorismo', 'Filosofia Política', 'Sociedade Civil'].map(c => (
                  <span key={c} className="px-2.5 py-1 rounded-md text-[13px] font-black uppercase tracking-widest text-white/75 bg-white/[0.06] border border-white/10">{c}</span>
                ))}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <p className="flex items-center gap-2 text-[15px] font-black tracking-[0.35em] uppercase text-brand-blue mb-4">
                <Landmark className="w-4 h-4" />
                Política & Conservadorismo
              </p>
              <h1 className="font-display font-black text-4xl sm:text-6xl text-white leading-[1.05] mb-3">
                Como Ser um Conservador
              </h1>
              <p className="text-white/60 text-lg italic mb-5">How to Be a Conservative</p>
              <p className="text-lg sm:text-xl font-black uppercase tracking-wider mb-6" style={{ color: AZUL }}>
                Roger Scruton <span className="text-white/45 font-bold">(1944–2020)</span>
              </p>

              {/* Atalho para o mapa dos capítulos */}
              <a
                href="#mapa"
                onClick={e => {
                  e.preventDefault();
                  document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="group inline-flex items-center gap-3 mb-8 px-5 py-3 rounded-xl border font-black text-[15px] uppercase tracking-widest text-white transition-all hover:-translate-y-0.5"
                style={{ borderColor: AZUL + '60', background: AZUL + '1f' }}
              >
                <BookOpen className="w-5 h-5" style={{ color: AZUL }} />
                Ir direto para os capítulos
                <ChevronRight className="w-4 h-4 rotate-90 group-hover:translate-y-0.5 transition-transform" />
              </a>

              {/* Citação */}
              <div className="relative rounded-3xl p-6 sm:p-8 mb-8 border border-white/10 bg-gradient-to-br from-blue-950/60 to-slate-950/60 overflow-hidden">
                <Quote className="absolute top-4 right-4 w-16 h-16 text-white/[0.06]" />
                <p className="font-display text-2xl sm:text-3xl text-white leading-snug font-bold mb-3">
                  "As coisas admiráveis são facilmente destruídas, mas não são facilmente criadas."
                </p>
                <p className="text-[14px] font-black uppercase tracking-widest text-white/50">Prefácio</p>
              </div>

              {/* Ficha */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/10">
                {FICHA.map(f => (
                  <div key={f.k} className="bg-slate-950/90 p-4">
                    <p className="text-[13px] font-black uppercase tracking-widest text-white/45 mb-1">{f.k}</p>
                    <p className="text-white/90 text-[17px] sm:text-lg font-semibold leading-snug">{f.v}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto flex flex-col gap-24">

          {/* ════ AUTOR ════ */}
          <motion.section {...fade}>
            <SecaoTitulo kicker="O autor" titulo="Roger Scruton (1944–2020)" icon={GraduationCap} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {AUTOR.map(a => (
                <div key={a.titulo} className="rounded-2xl p-6 border border-white/10 bg-white/[0.03]">
                  <a.icon className="w-6 h-6 mb-4" style={{ color: AZUL }} />
                  <h3 className="font-display font-black text-lg text-white mb-2">{a.titulo}</h3>
                  <p className="text-white/75 text-[17px] sm:text-lg leading-relaxed"><R t={a.texto} /></p>
                </div>
              ))}
            </div>

            {/* Linha do tempo */}
            <div className="relative pl-6 sm:pl-8">
              <div className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/60 via-blue-500/30 to-transparent" />
              <div className="flex flex-col gap-6">
                {VIRADA.map(v => (
                  <div key={v.titulo} className="relative">
                    <span className="absolute -left-6 sm:-left-8 top-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 bg-bg-deep" style={{ borderColor: AZUL }} />
                    <p className="text-[14px] font-black uppercase tracking-widest mb-0.5" style={{ color: AZUL }}>{v.ano}</p>
                    <h4 className="font-display font-black text-white text-base sm:text-xl">{v.titulo}</h4>
                    <p className="text-white/70 text-[17px] sm:text-lg leading-relaxed max-w-2xl"><R t={v.texto} /></p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-2xl p-5 border border-amber-400/25 bg-amber-400/[0.06] flex gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-white/80 text-[17px] sm:text-lg leading-relaxed">
                <strong className="text-amber-300">"Primeira lei de Conquest":</strong> todo mundo é de direita nos assuntos que conhece. O pai de Scruton, socialista, era conservador naquilo que amava: a cidade de High Wycombe, a paisagem e a arquitetura antiga.
              </p>
            </div>
          </motion.section>

          {/* ════ TESE CENTRAL ════ */}
          <motion.section {...fade}>
            <SecaoTitulo kicker="O argumento" titulo="A tese central" icon={Target} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-3xl p-6 sm:p-8 border border-red-400/20 bg-gradient-to-br from-red-950/40 to-transparent">
                <Hammer className="w-7 h-7 text-red-400 mb-4" />
                <p className="text-[14px] font-black uppercase tracking-widest text-red-300 mb-2">Destruir</p>
                <p className="font-display font-black text-2xl sm:text-3xl text-white">Rápido, fácil e recreativo</p>
              </div>
              <div className="rounded-3xl p-6 sm:p-8 border border-emerald-400/20 bg-gradient-to-br from-emerald-950/40 to-transparent">
                <Home className="w-7 h-7 text-emerald-400 mb-4" />
                <p className="text-[14px] font-black uppercase tracking-widest text-emerald-300 mb-2">Criar</p>
                <p className="font-display font-black text-2xl sm:text-3xl text-white">Lento, árduo e maçante</p>
              </div>
            </div>
            <div className="mt-4 rounded-3xl p-6 sm:p-8 border border-white/10 bg-white/[0.03]">
              <p className="text-white/85 text-base sm:text-xl leading-relaxed mb-5">
                Isso vale sobretudo para os <strong className="text-white">bens coletivos</strong>, que dependem da cooperação de muitos. Por isso, o conservadorismo é apresentado como a resposta <strong style={{ color: AZUL }}>racional</strong> à ameaça que pesa sobre esses bens herdados.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Paz', 'Liberdade', 'Lei', 'Civilidade', 'Espírito público', 'Segurança da propriedade', 'Vida familiar'].map(b => (
                  <span key={b} className="px-3 py-1.5 rounded-full text-base font-bold text-white/85 bg-blue-500/10 border border-blue-400/25">{b}</span>
                ))}
              </div>
              <p className="text-white/70 text-[17px] sm:text-lg italic border-l-2 pl-4" style={{ borderColor: AZUL }}>
                A posição conservadora é "verdadeira, mas enfadonha"; a de seus oponentes é "excitante, mas falsa". (Prefácio)
              </p>
            </div>
          </motion.section>

          {/* ════ DOIS TIPOS ════ */}
          <motion.section {...fade}>
            <SecaoTitulo kicker="Distinção fundamental" titulo="Dois tipos de conservadorismo" icon={Scale} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-3xl p-6 sm:p-8 border border-violet-400/25 bg-gradient-to-br from-violet-950/50 to-transparent">
                <p className="text-[14px] font-black uppercase tracking-widest text-violet-300 mb-2">Metafísico</p>
                <h3 className="font-display font-black text-2xl text-white mb-3">A defesa do sagrado</h3>
                <p className="text-white/75 text-[17px] sm:text-lg leading-relaxed">Crença nas coisas sagradas e desejo de protegê-las da profanação. Está presente em todas as épocas e é retomado nos capítulos finais (11 e 13).</p>
              </div>
              <div className="rounded-3xl p-6 sm:p-8 border border-blue-400/25 bg-gradient-to-br from-blue-950/50 to-transparent">
                <p className="text-[14px] font-black uppercase tracking-widest text-blue-300 mb-2">Empírico</p>
                <h3 className="font-display font-black text-2xl text-white mb-3">A defesa do herdado</h3>
                <p className="text-white/75 text-[17px] sm:text-lg leading-relaxed">Fenômeno moderno: reação às grandes mudanças trazidas pela Reforma e pelo Iluminismo. É o tema da maior parte do livro.</p>
              </div>
            </div>
            <div className="mt-4 text-center rounded-3xl p-6 sm:p-8 border border-white/10 bg-white/[0.03]">
              <p className="font-display text-xl sm:text-2xl text-white font-bold leading-snug">
                "Não se trata do que perdemos, mas do que preservamos e de como o mantemos."
              </p>
              <p className="text-white/60 text-base mt-3">O argumento é afirmativo, não lamurioso: quem argumenta só em tom de lamentação entrega a iniciativa ao adversário.</p>
            </div>
          </motion.section>

          {/* ════ ESTRUTURA E MÉTODO ════ */}
          <motion.section {...fade}>
            <SecaoTitulo kicker="Como o livro se organiza" titulo="Estrutura e método" icon={BookOpen} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {MOVIMENTOS.map((m, i) => (
                <div key={m.titulo} className="relative rounded-2xl p-6 border border-white/10 bg-white/[0.03] overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1" style={{ background: m.cor }} />
                  <p className="font-display font-black text-5xl text-white/[0.07] absolute right-4 top-3">{i + 1}</p>
                  <p className="text-[14px] font-black uppercase tracking-widest mb-1" style={{ color: m.cor }}>{m.caps}</p>
                  <h3 className="font-display font-black text-xl text-white mb-2">{m.titulo}</h3>
                  <p className="text-white/70 text-[17px] sm:text-lg leading-relaxed"><R t={m.texto} cor={m.cor} /></p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-8">
              <h3 className="font-display font-black text-xl sm:text-2xl text-white mb-2">Núcleo verdadeiro, casca falsa</h3>
              <p className="text-white/70 text-[17px] sm:text-lg leading-relaxed mb-6 max-w-3xl">
                Os capítulos 3 a 10 têm sempre o mesmo título: "A verdade no...". Cada ideologia rival contém uma verdade, mas ela vira falsidade "quando o impulso religioso substitui o ímpeto político", isto é, quando a ideologia passa a prometer redenção, unidade absoluta e um inimigo a vencer. Toque numa ideologia:
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {IDEOLOGIAS.map((d, i) => (
                  <button
                    key={d.nome}
                    onClick={() => setIdeologia(i)}
                    className={`px-3.5 py-2 rounded-full text-[15px] font-black uppercase tracking-wider border transition-all ${
                      i === ideologia ? 'bg-white text-slate-950 border-white' : 'bg-white/[0.04] text-white/75 border-white/15 hover:border-white/35 hover:text-white'
                    }`}
                  >
                    {d.nome}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={ideo.nome}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="rounded-2xl p-6 border border-emerald-400/25 bg-emerald-500/[0.07]">
                    <p className="text-[14px] font-black uppercase tracking-widest text-emerald-300 mb-2">O que tem de verdadeiro</p>
                    <p className="font-display font-black text-xl sm:text-2xl text-white">{ideo.verdade}</p>
                  </div>
                  <div className="rounded-2xl p-6 border border-red-400/25 bg-red-500/[0.07]">
                    <p className="text-[14px] font-black uppercase tracking-widest text-red-300 mb-2">Onde se perverte</p>
                    <p className="font-display font-black text-xl sm:text-2xl text-white">{ideo.perversao}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              {ideo.nome === 'Conservadorismo' && (
                <p className="mt-4 text-white/60 text-base">Até o próprio conservadorismo tem sua perversão.</p>
              )}
            </div>
          </motion.section>

          {/* ════ CAPÍTULOS ════ */}
          <motion.section {...fade} id="mapa" className="scroll-mt-28">
            <SecaoTitulo kicker="Mapa do livro" titulo="Resumo dos capítulos" icon={BookOpen} />
            <div className="flex flex-col gap-10">
              {PARTES.map(p => (
                <div key={p.titulo}>
                  <p className="text-[15px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: p.cor }}>{p.titulo}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {p.caps.map(c => <CapituloItem key={c.n} cap={c} cor={p.cor} />)}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ════ CONCEITOS ════ */}
          <motion.section {...fade}>
            <SecaoTitulo kicker="Glossário" titulo="Conceitos essenciais" icon={Lightbulb} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CONCEITOS.map(c => (
                <div key={c.termo} className="rounded-2xl p-6 border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-colors">
                  <div className="w-8 h-1 rounded-full mb-4" style={{ background: c.cor }} />
                  <h3 className="font-display font-black text-lg text-white mb-2">{c.termo}</h3>
                  <p className="text-white/75 text-[17px] sm:text-lg leading-relaxed"><R t={c.def} cor={c.cor} /></p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ════ OBJETIVOS ════ */}
          <motion.section {...fade}>
            <SecaoTitulo kicker="Propósito" titulo="Objetivos principais da obra" icon={Target} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OBJETIVOS.map((o, i) => (
                <div key={i} className="flex gap-4 rounded-2xl p-6 border border-white/10 bg-white/[0.03]">
                  <span className="font-display font-black text-3xl leading-none" style={{ color: AZUL }}>{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-white/85 text-[17px] sm:text-lg leading-relaxed"><R t={o} /></p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-white/65 text-[17px] sm:text-lg leading-relaxed max-w-3xl">
              O tom é de afirmação: não é uma defesa nostálgica do passado, mas um argumento sobre o que vale a pena conservar e como.
            </p>
          </motion.section>

          {/* ════ LEITURA CRÍTICA ════ */}
          <motion.section {...fade}>
            <div className="rounded-3xl p-6 sm:p-8 border border-amber-400/25 bg-amber-400/[0.05] flex flex-col sm:flex-row gap-5">
              <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0" />
              <div>
                <h3 className="font-display font-black text-xl text-white mb-2">Para ler com discernimento</h3>
                <p className="text-white/80 text-[17px] sm:text-lg leading-relaxed">
                  Scruton escreve para o <strong className="text-amber-300">mundo de língua inglesa</strong> (common law, Reino Unido, Estados Unidos). Aplicar suas ideias ao Brasil é uma <mark className="px-1 rounded bg-amber-400/20 text-amber-200 font-semibold">extrapolação</mark>, e convém sinalizar isso. O autor também afirma que seu argumento <strong className="text-amber-300">não depende da fé cristã</strong>, embora reconheça a <strong className="text-amber-300">herança judaico-cristã</strong> da civilização ocidental.
                </p>
              </div>
            </div>
          </motion.section>

          {/* ════ DISCUSSÃO ════ */}
          <motion.section {...fade}>
            <SecaoTitulo kicker="Para refletir" titulo="Perguntas para discussão" icon={MessageSquare} />
            <div className="flex flex-col gap-3">
              {PERGUNTAS.map((p, i) => (
                <div key={i} className="flex gap-4 items-start rounded-2xl p-5 sm:p-6 border border-white/10 bg-white/[0.03]">
                  <span className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-black text-base text-white" style={{ background: AZUL }}>{i + 1}</span>
                  <p className="text-white/85 text-base sm:text-xl leading-relaxed pt-1"><R t={p} /></p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ════ ROTEIRO ════ */}
          <motion.section {...fade}>
            <SecaoTitulo kicker="Série de aulas" titulo="Roteiro de estudo" icon={CalendarDays} />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ROTEIRO.map(r => (
                <div key={r.aula} className={`rounded-2xl p-5 border ${r.aula === '1' ? 'border-blue-400/50 bg-blue-500/10' : 'border-white/10 bg-white/[0.03]'}`}>
                  <p className="text-[13px] font-black uppercase tracking-widest text-white/50 mb-1">Aula {r.aula}</p>
                  <p className="font-display font-black text-white text-lg leading-tight mb-1">{r.aula === '1' ? r.caps : `Caps. ${r.caps}`}</p>
                  <p className="text-white/65 text-base leading-snug">{r.foco}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-white/60 text-base">
              <strong className="text-white/80">Leitura para a aula 2:</strong> Prefácio e capítulos 1 e 2.
            </p>
          </motion.section>

          {/* Voltar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <Link
              to="/biblioteca/livros"
              className="inline-flex items-center gap-2 text-white/65 hover:text-white text-base font-black uppercase tracking-widest transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar para Livros
            </Link>
            <p className="text-white/40 text-sm">
              SCRUTON, Roger. Como ser um conservador. Trad. Bruno Garschagen. Rio de Janeiro: Record, 2015.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
