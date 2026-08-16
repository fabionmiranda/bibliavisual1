import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowLeft, BookOpen, Quote, ChevronRight,
  Star, Award, Search, MessageSquare,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CATEGORIAS = ['Hermenêutica', 'Filosofia da Linguagem', 'Teologia Bíblica'];

// ── Resumo traduzido em blocos didáticos ──────────────────────────────────────
const RESUMO_BLOCOS = [
  {
    titulo: 'A questão central',
    texto: 'Existe um significado na Bíblia, ou o significado é, antes, uma questão de quem está lendo ou de como alguém lê? A doutrina cristã tem algo a contribuir nos debates sobre interpretação, teoria literária e pós-modernidade? Estas são questões de importância crucial para os estudos bíblicos contemporâneos e para a teologia.',
    destaque: true,
  },
  {
    titulo: 'A crise hermenêutica pós-moderna',
    texto: 'Kevin Vanhoozer sustenta que a crise pós-moderna na hermenêutica — a "incredulidade diante do significado", um ceticismo profundo quanto à possibilidade de interpretação correta — é fundamentalmente uma crise teológica, provocada por uma visão inadequada de Deus e pelo anúncio da "morte de Deus".',
    destaque: false,
  },
  {
    titulo: 'Parte 1 — A desconstrução do sentido',
    texto: 'A Parte 1 examina as formas pelas quais a desconstrução e a crítica radical centrada no leitor "desfazem" os conceitos tradicionais de autor, texto e leitura. Vanhoozer se engaja criticamente com a obra de Derrida, Rorty e Fish, entre outros, e demonstra a influência prejudicial da "suspeita hermenêutica" pós-moderna sobre os estudos bíblicos.',
    destaque: false,
  },
  {
    titulo: 'Parte 2 — A defesa do significado',
    texto: 'Na Parte 2, Vanhoozer defende o conceito de autor e a possibilidade do conhecimento literário, recorrendo aos recursos da doutrina cristã e compreendendo o significado em termos de ação comunicativa. Ele argumenta que há um significado no texto, que ele pode ser conhecido com adequação relativa, e que os leitores têm a responsabilidade de fazê-lo, cultivando "virtudes interpretativas".',
    destaque: false,
  },
  {
    titulo: 'Teologia Trinitária e Atos de Fala',
    texto: 'Os capítulos seguintes constroem sobre a teologia trinitária e a filosofia dos atos de fala para tratar da metafísica, da metodologia e da ética da interpretação. Numa perspectiva cristã, o significado e a interpretação estão fundamentados na própria ação comunicativa de Deus na criação, no cânon e, de forma eminente, em Cristo.',
    destaque: false,
  },
  {
    titulo: 'Contribuições originais do livro',
    texto: 'Entre as contribuições de destaque da Parte 2 estão: uma nova concepção da intenção do autor e do sentido literal; a recuperação da distinção entre significado e significância nos termos de Palavra e Espírito; e a imagem do leitor como discípulo-mártir, cuja vocação é testemunhar algo além de si mesmo.',
    destaque: false,
  },
  {
    titulo: 'A proposta final — Uma hermenêutica agostiniana',
    texto: 'O resultado é um desafio maior às premissas centrais da erudição bíblica pós-moderna e uma proposta alternativa construtiva — uma hermenêutica agostiniana — que revigoriza a noção de autoridade bíblica e encontra uma nova prática exegética que reconhece tanto a situação do leitor quanto o sentido literal. O livro conduz o estudante a uma maior confiança na autoridade, clareza e relevância das Escrituras, e à expectativa bem fundamentada de compreender com precisão a mensagem da Bíblia.',
    destaque: true,
  },
];

// ── As 3 perguntas centrais ───────────────────────────────────────────────────
const PERGUNTAS = [
  {
    pergunta: 'O texto bíblico tem um significado objetivo?',
    resposta: 'Sim. Vanhoozer defende que o texto possui um significado determinado pela intenção do autor — e que ignorar isso não é apenas um erro intelectual, mas um ato moral.',
    icon: Search,
    cor: '#00d4ff',
  },
  {
    pergunta: 'O leitor cria o significado ou o recebe?',
    resposta: 'O livro refuta o pós-modernismo literário (Derrida, Fish) que entrega o significado ao leitor. O autor argumenta que essa postura é eticamente irresponsável diante do texto e de seu autor.',
    icon: MessageSquare,
    cor: '#a855f7',
  },
  {
    pergunta: 'Como ler a Bíblia de forma responsável?',
    resposta: 'Propõe uma hermenêutica fundamentada na ação comunicativa de Deus, onde o intérprete cultiva virtudes — humildade, atenção e amor — como ato de obediência a Deus e serviço à comunidade.',
    icon: BookOpen,
    cor: '#ff2d55',
  },
];

// ── Conceitos-chave ───────────────────────────────────────────────────────────
const CONCEITOS = [
  { termo: 'Ato de fala (speech act)', definicao: 'Cada passagem bíblica é um ato comunicativo com intenção, conteúdo e efeito — não apenas palavras no papel. Baseado em Austin e Searle.', nivel: 'Fundamental', cor: '#00d4ff' },
  { termo: 'Intenção autoral', definicao: 'O significado está ancorado na intenção do autor humano e divino. Desconsiderá-la é silenciar a voz do texto.', nivel: 'Central', cor: '#a855f7' },
  { termo: 'Ética da interpretação', definicao: 'Interpretar mal não é apenas um erro técnico — é um ato moral. Vanhoozer introduz o conceito de "virtude hermenêutica".', nivel: 'Original', cor: '#ff2d55' },
  { termo: 'Gênero literário', definicao: 'Cada gênero (narrativa, poesia, lei, epístola) impõe regras de leitura. Ignorar o gênero é distorcer o que o autor quis dizer.', nivel: 'Aplicado', cor: '#fbbf24' },
  { termo: 'Dupla autoria', definicao: 'A Bíblia tem autor humano e divino. Vanhoozer mostra como honrar os dois sem colapsar um no outro.', nivel: 'Teológico', cor: '#34d399' },
  { termo: 'Hermenêutica agostiniana', definicao: 'A interpretação acontece dentro da comunidade da fé que reconhece o cânon, fundamentada na ação comunicativa trinitária de Deus.', nivel: 'Proposta', cor: '#f472b6' },
];

// ── Para quem é ───────────────────────────────────────────────────────────────
const PARA_QUEM = [
  { icon: '🎓', perfil: 'Estudantes de teologia',      motivo: 'Base filosófica indispensável para qualquer curso sério de hermenêutica.' },
  { icon: '🎙️', perfil: 'Pregadores e pastores',       motivo: 'Fundamenta por que a exposição fiel importa — e o custo de expor mal.' },
  { icon: '📖', perfil: 'Leitores sérios da Bíblia',   motivo: 'Ajuda a entender por que certas leituras distorcem e outras libertam.' },
  { icon: '🤔', perfil: 'Quem enfrenta pós-modernismo',motivo: 'Resposta rigorosa e acessível ao relativismo literário contemporâneo.' },
];

function CapaLivro() {
  const [imgOk, setImgOk] = useState<boolean | null>(null);

  return (
    <div className="relative w-full select-none">

      {/* Glow roxo ao redor */}
      <div
        className="absolute -inset-8 rounded-[40px] blur-3xl opacity-50"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, #7c3aed 0%, #4c1d95 40%, transparent 70%)' }}
      />
      {/* Sombra de chão */}
      <div
        className="absolute bottom-[-24px] left-6 right-6 h-12 blur-2xl rounded-full"
        style={{ background: 'rgba(0,0,0,0.75)' }}
      />

      {/* Imagem real — esconde se falhar */}
      <img
        src="/livros/is-there-meaning.jpg"
        alt="Capa de Is There Meaning in This Text? — Kevin J. Vanhoozer"
        onLoad={() => setImgOk(true)}
        onError={() => setImgOk(false)}
        className="relative w-full rounded-2xl object-cover"
        style={{
          display: imgOk === false ? 'none' : 'block',
          aspectRatio: '2/3',
          boxShadow: '0 40px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(139,92,246,0.4)',
          filter: 'brightness(1.08) contrast(1.05) saturate(1.1)',
        }}
      />

      {/* Fallback CSS — só aparece se imagem falhar */}
      {imgOk === false && (
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{
            aspectRatio: '2/3',
            background: 'linear-gradient(160deg, #0a0018 0%, #12002a 30%, #08001a 60%, #020008 100%)',
            boxShadow: '0 32px_80px rgba(0,0,0,0.9)',
            border: '1px solid rgba(139,92,246,0.35)',
          }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-3" style={{ background: 'linear-gradient(180deg,#5b21b6,#7c3aed,#4c1d95)' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <BookOpen className="w-14 h-14 text-violet-400 opacity-60" strokeWidth={1} />
            <p className="text-white font-black text-lg leading-tight">Is There Meaning in This Text?</p>
            <p className="text-violet-300/60 text-sm font-bold">Kevin J. Vanhoozer</p>
            <p className="text-white/25 text-xs">Zondervan · 1998</p>
          </div>
        </div>
      )}

      {/* Reflexo de brilho no canto — sobre a imagem real */}
      {imgOk && (
        <div
          className="absolute top-0 left-0 right-0 h-1/3 rounded-t-2xl pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)' }}
        />
      )}
    </div>
  );
}

export default function LivroIsThereiningPage() {
  return (
    <div className="min-h-screen relative bg-bg-deep">
      <Navbar />

      {/* ════ HERO ════ */}
      <section className="pt-24 sm:pt-32 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-10 text-[11px] font-black uppercase tracking-widest"
          >
            <Link to="/biblioteca" className="text-white/40 hover:text-brand-blue transition-colors">Biblioteca</Link>
            <ChevronRight className="w-3 h-3 text-white/20" />
            <Link to="/biblioteca/livros" className="text-white/40 hover:text-brand-blue transition-colors">Livros</Link>
            <ChevronRight className="w-3 h-3 text-white/20" />
            <span className="text-white/60">Is There Meaning…</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-16 items-start">

            {/* ── Capa ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-7 items-center lg:items-start"
            >
              <div className="w-full max-w-[260px] lg:max-w-full">
                <CapaLivro />
              </div>

              {/* Estrelas */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-sm font-black text-amber-400/70 ml-2 uppercase tracking-widest">Clássico</span>
              </div>

              {/* Categorias */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIAS.map(c => (
                  <span key={c} className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-violet-300 border border-violet-500/40 bg-violet-500/15">
                    {c}
                  </span>
                ))}
              </div>

              {/* Ficha técnica */}
              <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 space-y-3">
                {[
                  { label: 'Autor',   valor: 'Kevin J. Vanhoozer' },
                  { label: 'Editora', valor: 'Zondervan' },
                  { label: 'Ano',     valor: '1998' },
                  { label: 'Páginas', valor: '496' },
                  { label: 'ISBN',    valor: '978-0310219156' },
                ].map(({ label, valor }) => (
                  <div key={label} className="flex items-baseline justify-between gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/35 shrink-0">{label}</span>
                    <span className="text-[12px] font-bold text-white/80 text-right">{valor}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Texto principal ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex flex-col gap-7"
            >
              <div>
                <p className="text-[11px] font-black tracking-[0.35em] uppercase text-violet-400 mb-4">
                  Livro Recomendado · Hermenêutica
                </p>
                <h1 className="font-display font-black text-4xl sm:text-5xl xl:text-6xl text-white leading-tight mb-3">
                  Is There Meaning<br className="hidden sm:block" /> in This Text?
                </h1>
                <p className="text-white/55 text-base sm:text-lg italic leading-relaxed">
                  The Bible, the Reader, and the Morality of Literary Knowledge
                </p>
              </div>

              {/* Introdução */}
              <div className="space-y-4 border-l-2 border-violet-500/30 pl-5">
                <p className="text-white/85 text-base sm:text-lg leading-relaxed font-medium">
                  Este é um dos livros mais importantes já escritos sobre hermenêutica bíblica.
                  Kevin Vanhoozer enfrenta de frente a grande crise da interpretação moderna:
                </p>
                <p className="text-white font-black text-lg sm:text-xl leading-snug">
                  "O texto tem um significado determinado — ou qualquer leitura é igualmente válida?"
                </p>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  Escrito em diálogo direto com filósofos como Derrida, Ricoeur e Stanley Fish,
                  o livro é simultaneamente acadêmico e pastoral — refuta o relativismo e propõe
                  uma alternativa teológica robusta baseada na teoria dos atos de fala e na ética da interpretação.
                </p>
              </div>

              {/* Citação de impacto */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="relative px-7 py-6 rounded-2xl border border-violet-500/25 bg-violet-500/[0.08]"
              >
                <Quote className="absolute top-5 left-5 w-6 h-6 text-violet-400 opacity-50" />
                <p className="text-white/90 text-base sm:text-lg italic leading-relaxed pl-5 font-medium">
                  "Interpretar é um ato moral. O intérprete que distorce o texto não apenas erra intelectualmente — ele falha eticamente com o autor, com o texto e com Deus."
                </p>
                <p className="text-violet-400 text-xs font-black uppercase tracking-widest mt-4 pl-5">
                  — Kevin J. Vanhoozer
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════ RESUMO TRADUZIDO ════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-1.5 h-8 rounded-full bg-brand-blue" style={{ boxShadow: '0 0 14px #00d4ff90' }} />
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-wide">
                Resumo do Livro
              </h2>
              <p className="text-white/40 text-sm mt-0.5">Tradução e síntese do conteúdo original</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {RESUMO_BLOCOS.map((bloco, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`p-7 rounded-2xl border transition-all duration-200 ${
                  bloco.destaque
                    ? 'border-violet-500/35 bg-violet-500/[0.08] lg:col-span-2'
                    : 'border-white/8 bg-white/[0.03] hover:bg-white/[0.05]'
                }`}
              >
                <h3 className={`font-black text-base sm:text-lg mb-3 ${bloco.destaque ? 'text-violet-300' : 'text-white/90'}`}>
                  {bloco.titulo}
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${bloco.destaque ? 'text-white/80' : 'text-white/60'}`}>
                  {bloco.texto}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divisor */}
      <div className="h-px max-w-6xl mx-auto px-4" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)' }} />

      {/* ════ 3 PERGUNTAS ════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-1.5 h-8 rounded-full" style={{ background: '#00d4ff', boxShadow: '0 0 14px #00d4ff90' }} />
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-wide">
                As 3 perguntas que o livro responde
              </h2>
              <p className="text-white/40 text-sm mt-0.5">Didaticamente, o livro gira em torno destas questões centrais</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PERGUNTAS.map((item, i) => {
              const Icone = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-5 p-7 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl shrink-0" style={{ background: item.cor + '18', border: `1px solid ${item.cor}35` }}>
                      <Icone className="w-5 h-5" style={{ color: item.cor }} strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest" style={{ color: item.cor }}>
                      Pergunta {i + 1}
                    </span>
                  </div>
                  <h3 className="text-white font-black text-base sm:text-lg leading-snug">
                    {item.pergunta}
                  </h3>
                  <p className="text-white/65 text-sm sm:text-base leading-relaxed">
                    {item.resposta}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════ CONCEITOS-CHAVE ════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-1.5 h-8 rounded-full" style={{ background: '#a855f7', boxShadow: '0 0 14px #a855f790' }} />
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-wide">
                6 conceitos que você vai aprender
              </h2>
              <p className="text-white/40 text-sm mt-0.5">Vocabulário essencial do livro</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONCEITOS.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col gap-4 p-6 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-white font-black text-sm sm:text-base leading-snug">{c.termo}</h3>
                  <span
                    className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0"
                    style={{ color: c.cor, background: c.cor + '18', border: `1px solid ${c.cor}35` }}
                  >
                    {c.nivel}
                  </span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{c.definicao}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ PARA QUEM É ════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-1.5 h-8 rounded-full bg-amber-400" style={{ boxShadow: '0 0 14px #fbbf2490' }} />
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-wide">
                Para quem é este livro?
              </h2>
              <p className="text-white/40 text-sm mt-0.5">Perfis que mais se beneficiam desta leitura</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PARA_QUEM.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-5 p-6 rounded-2xl border border-white/10 bg-white/[0.04]"
              >
                <span className="text-3xl shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <h3 className="text-white font-black text-base sm:text-lg mb-1.5">{item.perfil}</h3>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed">{item.motivo}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ CTA FINAL ════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-violet-500/25 px-8 py-14 sm:px-14 sm:py-16 text-center"
            style={{ background: 'linear-gradient(135deg, #1a0630 0%, #0d0520 50%, #050714 100%)' }}
          >
            <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 50% -10%, #a855f7 0%, transparent 65%)' }} />
            <div className="relative">
              <Award className="w-12 h-12 text-violet-400 mx-auto mb-6 opacity-80" strokeWidth={1} />
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-5 leading-tight">
                Um livro que muda a forma como você lê a Bíblia
              </h2>
              <p className="text-white/55 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                Após ler este livro, você nunca mais interpretará um texto da mesma forma —
                e entenderá por que a exposição fiel é um ato de amor e obediência a Deus.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/biblioteca/livros"
                  className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white/65 font-black text-xs uppercase tracking-widest hover:text-white hover:border-white/35 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Outros livros
                </Link>
                <Link
                  to="/metodo"
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-violet-500 text-white font-black text-xs uppercase tracking-widest hover:bg-violet-400 transition-all shadow-xl shadow-violet-500/30"
                >
                  Ver os diagramas exegéticos
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
