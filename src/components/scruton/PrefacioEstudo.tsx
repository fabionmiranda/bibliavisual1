import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Globe2, Scale, Users, Sparkles, Landmark, ShieldCheck, Trees, GraduationCap, Vote,
  Hammer, Home, Quote, ArrowDown, Lightbulb, MessageCircleQuestion, ChevronDown,
  Feather, Crown, UserRound, Brain, Link2, Target, BookMarked,
} from 'lucide-react';
import { R, BASE_SCRUTON } from '../../data/scrutonConservador';

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45 },
};

function Bloco({ num, titulo, cor, children }: { num: string; titulo: string; cor: string; children: React.ReactNode }) {
  return (
    <motion.section {...fade} className="relative">
      <div className="flex items-center gap-3 mb-5">
        <span
          className="px-2.5 py-1 rounded-lg font-display font-black text-[15px]"
          style={{ color: cor, background: cor + '1a', border: `1px solid ${cor}45` }}
        >
          {num}
        </span>
        <h3 className="font-display font-black text-2xl sm:text-[28px] text-white leading-tight">{titulo}</h3>
      </div>
      {children}
    </motion.section>
  );
}

function Lista({ itens, cor }: { itens: string[]; cor: string }) {
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

function Titulo({ kicker, titulo, icon: Icon, cor }: { kicker: string; titulo: string; icon: typeof Globe2; cor: string }) {
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

// ── Dados ─────────────────────────────────────────────────────────────────────
const FUNCOES = [
  { letra: 'a', texto: 'Define **para quem** está escrevendo', det: 'o mundo de língua inglesa' },
  { letra: 'b', texto: 'Distingue **dois tipos** de conservadorismo', det: 'metafísico e empírico' },
  { letra: 'c', texto: 'Lista os **bens** a preservar', det: 'as "coisas admiráveis"' },
  { letra: 'd', texto: 'Apresenta a **tese central**', det: 'destruir é fácil, criar é difícil' },
  { letra: 'e', texto: 'Anuncia o **tom** da obra', det: 'afirmação, não lamento' },
];

const BENS = [
  { icon: UserRound, texto: 'A oportunidade de **viver a vida como desejamos**' },
  { icon: Scale, texto: 'A segurança de uma **lei imparcial**, que resolve queixas e repara danos' },
  { icon: Trees, texto: 'A proteção do **meio ambiente** como recurso compartilhado, que não pode ser destruído pelo capricho de interesses poderosos' },
  { icon: GraduationCap, texto: 'Uma **cultura aberta e questionadora**, que moldou escolas e universidades' },
  { icon: Vote, texto: 'Os **procedimentos democráticos** que nos permitem eleger representantes e aprovar nossas leis' },
];

const CONCEITOS = [
  { termo: 'Common law', def: 'Direito de tradição inglesa, construído a partir de **casos e precedentes**; pano de fundo de todo o livro.', cor: '#38bdf8' },
  { termo: 'Habeas corpus', def: 'Símbolo de um governo que ==serve ao cidadão, e não o domina==.', cor: '#3b82f6' },
  { termo: 'Pequenos pelotões', def: 'Associações **voluntárias locais**, base da sociedade civil (__Burke__).', cor: '#818cf8' },
  { termo: 'Conservadorismo metafísico', def: 'Defesa do **sagrado** contra a profanação.', cor: '#a78bfa' },
  { termo: 'Conservadorismo empírico', def: 'Defesa moderna dos **bens herdados** diante das mudanças da Reforma e do Iluminismo.', cor: '#60a5fa' },
  { termo: 'Bens coletivos', def: 'Bens que ==só existem pela cooperação==: paz, lei, liberdade, civilidade, espírito público.', cor: '#34d399' },
  { termo: 'Assimetria criação/destruição', def: 'Destruir é **rápido e fácil**; criar é **lento e difícil**.', cor: '#f472b6' },
];

const FRASES = [
  { f: 'As coisas admiráveis são facilmente destruídas, mas não são facilmente criadas.', cor: '#3b82f6' },
  { f: 'O trabalho de destruição é "rápido, fácil e recreativo"; o labor da criação é "lento, árduo e maçante".', cor: '#f472b6' },
  { f: 'A posição conservadora é "verdadeira, mas enfadonha"; a de seus oponentes, "excitante, mas falsa".', cor: '#fbbf24' },
  { f: 'Não se trata do que perdemos, mas do que preservamos e de como o mantemos.', cor: '#34d399' },
];

const QUESTOES = [
  { q: 'Por que Scruton dirige o livro principalmente ao mundo de língua inglesa?', r: 'Porque é ali que partidos e movimentos se chamam "conservadores" e onde vigora a herança do **common law**: justiça construída de baixo para cima, democracia parlamentar, caridade privada e **pequenos pelotões**. É esse modo de vida que o livro pressupõe.' },
  { q: 'O que o habeas corpus simboliza na relação entre governo e cidadão?', r: 'Simboliza um governo que é ==servo, e não senhor, do cidadão==: quem prende um súdito precisa libertá-lo ou levá-lo a julgamento.' },
  { q: 'Qual a diferença entre conservadorismo metafísico e empírico?', r: 'O **metafísico** defende o sagrado contra a profanação e existe em todas as épocas. O **empírico** é moderno: reage às mudanças da Reforma e do Iluminismo, defendendo os bens herdados. É o tema da maior parte do livro.' },
  { q: 'Cite três "coisas admiráveis" que, segundo o autor, estão sob ameaça.', r: 'Por exemplo: a **lei imparcial**, o **meio ambiente** como recurso compartilhado e os **procedimentos democráticos**. Também: a liberdade de viver como desejamos e uma cultura aberta e questionadora.' },
  { q: 'Explique a tese de que destruir é fácil e criar é difícil. Por que ela vale especialmente para os bens coletivos?', r: 'Destruir é "rápido, fácil e recreativo"; criar é "lento, árduo e maçante". Os **bens coletivos** dependem da ==cooperação de muitos==: ninguém os obtém sozinho, mas qualquer um pode ajudar a destruí-los.' },
  { q: 'Por que o conservador está em desvantagem na opinião pública?', r: 'Porque sua posição é "**verdadeira, mas enfadonha**", enquanto a dos oponentes é "**excitante, mas falsa**". A promessa de mudança atrai mais que a tarefa paciente de conservar.' },
  { q: 'Por que Scruton rejeita o tom de lamentação?', r: 'Porque o lamento entrega a iniciativa ao adversário. O luto às vezes é necessário, mas o argumento deve ser afirmativo: ==não o que perdemos, mas o que preservamos e como o mantemos==.' },
];

// ── Componente ────────────────────────────────────────────────────────────────
export default function PrefacioEstudo({ cor }: { cor: string }) {
  const [aberta, setAberta] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-20 mt-4 [&_p]:[text-align:inherit] text-left">

      {/* ═══ EM UMA FRASE ═══ */}
      <motion.section {...fade}>
        <div
          className="relative overflow-hidden rounded-3xl p-7 sm:p-10 border"
          style={{ borderColor: cor + '55', background: `linear-gradient(135deg, ${cor}26, rgba(15,23,42,0.6) 60%)` }}
        >
          <Quote className="absolute -top-2 right-4 w-28 h-28 text-white/[0.05]" />
          <p className="flex items-center gap-2 text-[14px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: cor }}>
            <Target className="w-4 h-4" /> O prefácio em uma frase
          </p>
          <p className="relative font-display text-2xl sm:text-[32px] text-white font-bold leading-snug">
            O conservadorismo nasce da consciência de que <span className="text-amber-300">as coisas admiráveis são fáceis de destruir e difíceis de criar</span>; por isso, a tarefa é <span style={{ color: cor }}>preservar o que herdamos</span>, e o argumento deve ser <span className="text-emerald-300">afirmativo, não lamentoso</span>.
          </p>
          <p className="mt-5 text-white/55 text-[15px] leading-relaxed">
            <strong className="text-white/75">Referência:</strong> SCRUTON, Roger. <em>Como ser um conservador</em>. Trad. Bruno Garschagen; rev. técnica Márcia Xavier de Brito. Rio de Janeiro: Record, 2015. Prefácio (assinado em <strong className="text-white/75">Malmesbury, janeiro de 2014</strong>).
          </p>
        </div>
      </motion.section>

      {/* ═══ PARA QUE SERVE ═══ */}
      <motion.section {...fade}>
        <Titulo kicker="A porta de entrada" titulo="Para que serve o prefácio" icon={BookMarked} cor={cor} />
        <p className="text-white/75 text-[17px] sm:text-lg leading-relaxed mb-6 max-w-3xl">
          O prefácio é curto, mas funciona como a <R t="==porta de entrada== do livro. Nele Scruton faz **cinco movimentos**:" cor={cor} />
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FUNCOES.map((f, i) => (
            <div key={f.letra} className="relative rounded-2xl p-5 border border-white/10 bg-white/[0.03] text-left">
              <span className="font-display font-black text-3xl" style={{ color: cor, opacity: 0.35 + i * 0.13 }}>{f.letra})</span>
              <p className="mt-2 text-white/90 text-[18px] leading-snug text-left"><R t={f.texto} cor={cor} /></p>
              <p className="mt-1 text-white/55 text-[16px] text-left">({f.det})</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ═══ RESUMO POR PARTES ═══ */}
      <div>
        <Titulo kicker="Passo a passo" titulo="Resumo por partes" icon={Feather} cor={cor} />
        <div className="flex flex-col gap-16">

          {/* 3.1 */}
          <Bloco num="3.1" titulo="O conservadorismo e o mundo de língua inglesa" cor="#38bdf8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
              <Lista cor="#38bdf8" itens={[
                'O **temperamento conservador** existe em todas as sociedades humanas. Mas é sobretudo nos ==países de língua inglesa== que partidos e movimentos se chamam "conservadores".',
                'Isso revela uma diferença entre os lugares que herdaram a tradição inglesa do **common law** e os que receberam outro legado.',
                '__Grã-Bretanha__ e __Estados Unidos__ entraram na modernidade conscientes de uma **história comum** e permaneceram juntos na defesa de sua civilização (Aliança Atlântica).',
                'Na época de __Thatcher__ e __Reagan__, o que os unia foi resumido em uma palavra: **liberdade**. Mas ==a palavra exige contexto==: como a liberdade é exercida, limitada e definida?',
              ]} />
              <div className="rounded-3xl p-6 border border-sky-400/30 bg-sky-500/[0.08] text-center">
                <Globe2 className="w-8 h-8 mx-auto text-sky-300 mb-2" />
                <p className="font-display font-black text-3xl sm:text-4xl text-white mb-3 break-normal">LIBERDADE</p>
                <p className="text-white/70 text-[15px] mb-3">Mas a palavra exige contexto:</p>
                <div className="flex flex-col gap-2">
                  {['Como é exercida?', 'Como é limitada?', 'Como é definida?'].map(q => (
                    <span key={q} className="px-3 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-white/90 text-[16px] font-semibold">{q}</span>
                  ))}
                </div>
              </div>
            </div>
          </Bloco>

          {/* 3.2 */}
          <Bloco num="3.2" titulo="O exemplo do habeas corpus" cor="#3b82f6">
            <Lista cor="#3b82f6" itens={[
              'Scruton cita um livro americano dedicado ao **habeas corpus**: ordem medieval, emitida em nome do rei, que obrigava quem prendesse um súdito a ==libertá-lo ou levá-lo a julgamento==.',
              'Esse mandado faz do governo o **servo**, e não o **senhor**, do cidadão.',
              'Ele expressa uma relação singular entre governantes e governados, nascida do **common law**. Essa relação é parte do que os conservadores preservam ==em nome da liberdade==.',
            ]} />
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-center">
              <div className="rounded-2xl p-5 border border-red-400/30 bg-red-500/[0.07] text-center opacity-80">
                <Crown className="w-7 h-7 mx-auto text-red-300 mb-2" />
                <p className="text-[13px] font-black uppercase tracking-widest text-red-300">Não é</p>
                <p className="font-display font-black text-2xl text-white line-through decoration-red-400/70">Senhor</p>
                <p className="text-white/55 text-[15px]">governo que domina</p>
              </div>
              <p className="text-center font-display font-black text-white/40 text-lg">vs</p>
              <div className="rounded-2xl p-5 border border-emerald-400/35 bg-emerald-500/[0.09] text-center">
                <ShieldCheck className="w-7 h-7 mx-auto text-emerald-300 mb-2" />
                <p className="text-[13px] font-black uppercase tracking-widest text-emerald-300">É</p>
                <p className="font-display font-black text-2xl text-white">Servo</p>
                <p className="text-white/55 text-[15px]">governo que serve ao cidadão</p>
              </div>
            </div>
          </Bloco>

          {/* 3.3 */}
          <Bloco num="3.3" titulo="O público pressuposto" cor="#818cf8">
            <p className="text-white/85 text-[17px] sm:text-lg leading-relaxed mb-5">
              <R cor="#818cf8" t="**Por isso** o livro se dirige primeiro ao **mundo anglófono**: leitores para quem são ==normais==:" />
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Justiça do common law', 'Democracia parlamentar', 'Caridade privada', 'Espírito público', '"Pequenos pelotões" de voluntários'].map(t => (
                <span key={t} className="px-3.5 py-2 rounded-full text-[16px] font-semibold text-white/90 bg-indigo-500/15 border border-indigo-400/30">{t}</span>
              ))}
            </div>
            <div className="rounded-2xl p-5 border border-amber-400/25 bg-amber-400/[0.06]">
              <p className="text-white/85 text-[17px] sm:text-lg leading-relaxed">
                <R t="São leitores que **ainda não se acostumaram** à autoridade ==de cima para baixo== do Estado de bem-estar, nem às **burocracias transnacionais** que tentam engoli-lo." cor="#fbbf24" />
              </p>
            </div>
          </Bloco>

          {/* 3.4 */}
          <Bloco num="3.4" titulo="Dois tipos de conservadorismo" cor="#a78bfa">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-3xl p-6 sm:p-7 border border-violet-400/30 bg-gradient-to-br from-violet-950/60 to-transparent">
                <Sparkles className="w-7 h-7 text-violet-300 mb-3" />
                <p className="text-[14px] font-black uppercase tracking-widest text-violet-300">Metafísico</p>
                <h4 className="font-display font-black text-2xl text-white mb-4">A defesa do sagrado</h4>
                <Lista cor="#a78bfa" itens={[
                  'Crença nas **coisas sagradas** e desejo de defendê-las da ==profanação==.',
                  'Existe em **todas as épocas** e sempre influenciará as relações humanas.',
                  'Será retomado nos **capítulos finais** do livro.',
                ]} />
              </div>
              <div className="rounded-3xl p-6 sm:p-7 border border-blue-400/30 bg-gradient-to-br from-blue-950/60 to-transparent">
                <Landmark className="w-7 h-7 text-blue-300 mb-3" />
                <p className="text-[14px] font-black uppercase tracking-widest text-blue-300">Empírico</p>
                <h4 className="font-display font-black text-2xl text-white mb-4">A defesa do herdado</h4>
                <Lista cor="#60a5fa" itens={[
                  'Fenômeno **especificamente moderno**.',
                  'Reação às vastas mudanças trazidas pela ==Reforma== e pelo ==Iluminismo==.',
                  'É o tema da **maior parte do livro** (questões "práticas e terrenas").',
                ]} />
              </div>
            </div>
          </Bloco>

          {/* 3.5 */}
          <Bloco num="3.5" titulo="O que o conservador quer preservar" cor="#34d399">
            <p className="text-white/80 text-[17px] sm:text-lg leading-relaxed mb-5">
              <R cor="#34d399" t="Scruton lista **coisas admiráveis** que herdamos ==coletivamente==:" />
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {BENS.map((b, i) => (
                <div key={i} className="flex gap-4 rounded-2xl p-5 border border-emerald-400/20 bg-emerald-500/[0.05]">
                  <b.icon className="w-6 h-6 text-emerald-300 shrink-0 mt-0.5" />
                  <p className="text-white/85 text-[17px] leading-snug text-left"><R t={b.texto} cor="#6ee7b7" /></p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-col sm:flex-row items-stretch gap-3">
              <div className="flex-1 rounded-2xl p-5 border border-red-400/30 bg-red-500/[0.07]">
                <p className="text-[13px] font-black uppercase tracking-widest text-red-300 mb-1">O problema</p>
                <p className="text-white/90 text-[17px] sm:text-lg">Todas parecem garantidas, mas <strong className="text-red-300">todas estão sob ameaça</strong>.</p>
              </div>
              <div className="flex-1 rounded-2xl p-5 border border-emerald-400/35 bg-emerald-500/[0.09]">
                <p className="text-[13px] font-black uppercase tracking-widest text-emerald-300 mb-1">A resposta</p>
                <p className="text-white/90 text-[17px] sm:text-lg">O conservadorismo é a <strong className="text-emerald-300">resposta racional</strong>. Seria irracional adotar qualquer outra.</p>
              </div>
            </div>
          </Bloco>

          {/* 3.6 */}
          <Bloco num="3.6" titulo="A tese central" cor="#3b82f6">
            <blockquote className="rounded-3xl p-6 sm:p-8 border-l-4 bg-white/[0.04] mb-6" style={{ borderColor: '#3b82f6' }}>
              <p className="font-display text-xl sm:text-2xl text-white leading-snug font-bold">
                "O conservadorismo advém de um sentimento que toda pessoa madura compartilha com facilidade: a consciência de que <span className="text-amber-300">as coisas admiráveis são facilmente destruídas, mas não são facilmente criadas</span>."
              </p>
            </blockquote>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="rounded-2xl p-6 border border-red-400/25 bg-gradient-to-br from-red-950/50 to-transparent">
                <Hammer className="w-7 h-7 text-red-400 mb-3" />
                <p className="text-[13px] font-black uppercase tracking-widest text-red-300">Destruição</p>
                <p className="font-display font-black text-2xl text-white">Rápida, fácil e recreativa</p>
              </div>
              <div className="rounded-2xl p-6 border border-emerald-400/25 bg-gradient-to-br from-emerald-950/50 to-transparent">
                <Home className="w-7 h-7 text-emerald-400 mb-3" />
                <p className="text-[13px] font-black uppercase tracking-widest text-emerald-300">Criação</p>
                <p className="font-display font-black text-2xl text-white">Lenta, árdua e maçante</p>
              </div>
            </div>
            <p className="text-white/85 text-[17px] sm:text-lg leading-relaxed mb-4">
              <R t="Isso vale sobretudo para os **bens coletivos**. Eles dependem da ==cooperação==: ninguém os obtém sozinho. Esta é uma **lição do século XX**." />
            </p>
            <div className="flex flex-wrap gap-2">
              {['Paz', 'Liberdade', 'Lei', 'Civilidade', 'Espírito público', 'Segurança da propriedade', 'Vida familiar'].map(b => (
                <span key={b} className="px-3.5 py-2 rounded-full text-[16px] font-semibold text-white/90 bg-blue-500/12 border border-blue-400/30">{b}</span>
              ))}
            </div>
          </Bloco>

          {/* 3.7 */}
          <Bloco num="3.7" titulo="A desvantagem do conservador" cor="#fbbf24">
            <p className="text-white/85 text-[17px] sm:text-lg leading-relaxed mb-5">
              <R cor="#fbbf24" t="**Por isso** o conservador ==perde na opinião pública==: sua posição é verdadeira, mas enfadonha; a dos oponentes, excitante, mas falsa." />
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl p-6 border border-white/15 bg-white/[0.04]">
                <p className="text-[13px] font-black uppercase tracking-widest text-white/55 mb-2">Posição conservadora</p>
                <p className="font-display font-black text-2xl text-white">
                  <span className="text-emerald-300">verdadeira</span>, mas <span className="text-white/50">enfadonha</span>
                </p>
              </div>
              <div className="rounded-2xl p-6 border border-white/15 bg-white/[0.04]">
                <p className="text-[13px] font-black uppercase tracking-widest text-white/55 mb-2">Posição dos oponentes</p>
                <p className="font-display font-black text-2xl text-white">
                  <span className="text-amber-300">excitante</span>, mas <span className="text-red-300">falsa</span>
                </p>
              </div>
            </div>
            <Lista cor="#fbbf24" itens={[
              'Diante dessa desvantagem, muitos conservadores argumentam em tom de **lamentação** (como nas __Lamentações de Jeremias__).',
              'Scruton reconhece que o luto às vezes é necessário: sem o ==trabalho do luto== (__Freud__), o coração não passa do que perdeu para o que virá.',
              'Mas o argumento conservador **não precisa ser elegíaco**.',
            ]} />
            <div className="mt-6 rounded-3xl p-6 sm:p-8 border border-emerald-400/35 bg-gradient-to-br from-emerald-500/15 to-transparent">
              <p className="text-[13px] font-black uppercase tracking-widest text-emerald-300 mb-2">O argumento principal do livro</p>
              <p className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">
                "Não se trata do que <span className="text-white/45 line-through decoration-white/30">perdemos</span>, mas do que <span className="text-emerald-300">preservamos</span> e de como o <span className="text-emerald-300">mantemos</span>."
              </p>
            </div>
          </Bloco>

          {/* 3.8 */}
          <Bloco num="3.8" titulo="O fechamento" cor="#f472b6">
            <Lista cor="#f472b6" itens={[
              'O livro termina com uma nota pessoal: ==uma despedida proibindo o pranto==, alusão ao poema de __John Donne__ "A Valediction: Forbidding Mourning" (ver capítulo 13).',
              'Agradecimentos a leitores críticos e à esposa, __Sophie__, a quem dedica o livro junto com os filhos.',
            ]} />
          </Bloco>
        </div>
      </div>

      {/* ═══ ESQUEMA VISUAL ═══ */}
      <motion.section {...fade}>
        <Titulo kicker="Visão do todo" titulo="Esquema visual" icon={Brain} cor={cor} />
        <div className="rounded-3xl p-5 sm:p-8 border border-white/10 bg-white/[0.02] flex flex-col items-center gap-2">
          {[
            { t: 'Mundo anglófono', s: 'common law, habeas corpus', c: '#38bdf8' },
            { t: 'Bens herdados', s: 'liberdade, lei, ambiente, cultura, democracia', c: '#34d399' },
            { t: 'Ameaça', s: 'são fáceis de destruir e difíceis de criar', c: '#f87171' },
            { t: 'Resposta racional: conservadorismo', s: '', c: '#3b82f6' },
          ].map((e, i) => (
            <div key={i} className="w-full flex flex-col items-center gap-2">
              {i > 0 && <ArrowDown className="w-5 h-5 text-white/35" />}
              <div className="w-full max-w-md rounded-2xl px-5 py-4 text-center border" style={{ borderColor: e.c + '55', background: e.c + '14' }}>
                <p className="font-display font-black text-lg sm:text-xl text-white">{e.t}</p>
                {e.s && <p className="text-[15px] text-white/65">{e.s}</p>}
              </div>
            </div>
          ))}
          <div className="w-full max-w-md grid grid-cols-2 gap-3 mt-2">
            <div className="rounded-2xl px-4 py-3 text-center border border-violet-400/40 bg-violet-500/10">
              <p className="font-black text-white text-[16px]">Metafísico</p>
              <p className="text-[14px] text-violet-200/80">o sagrado</p>
            </div>
            <div className="rounded-2xl px-4 py-3 text-center border border-blue-400/40 bg-blue-500/10">
              <p className="font-black text-white text-[16px]">Empírico</p>
              <p className="text-[14px] text-blue-200/80">a herança moderna</p>
            </div>
          </div>
          <ArrowDown className="w-5 h-5 text-white/35" />
          <div className="w-full max-w-md rounded-2xl px-5 py-4 text-center border border-emerald-400/50 bg-emerald-500/15">
            <p className="text-[13px] font-black uppercase tracking-widest text-emerald-300">Tom</p>
            <p className="font-display font-black text-lg text-white">Afirmar o que preservamos, não lamentar o que perdemos</p>
          </div>
        </div>
      </motion.section>

      {/* ═══ CONCEITOS ═══ */}
      <motion.section {...fade}>
        <Titulo kicker="Glossário" titulo="Conceitos-chave" icon={Lightbulb} cor={cor} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONCEITOS.map(c => (
            <div key={c.termo} className="rounded-2xl p-6 border border-white/10 bg-white/[0.03]">
              <div className="w-8 h-1 rounded-full mb-4" style={{ background: c.cor }} />
              <h4 className="font-display font-black text-xl text-white mb-2">{c.termo}</h4>
              <p className="text-white/80 text-[17px] leading-relaxed"><R t={c.def} cor={c.cor} /></p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ═══ FRASES ═══ */}
      <motion.section {...fade}>
        <Titulo kicker="Para guardar" titulo="Frases para memorizar" icon={Quote} cor={cor} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FRASES.map((f, i) => (
            <div key={i} className="relative rounded-3xl p-6 sm:p-7 border bg-white/[0.03]" style={{ borderColor: f.cor + '45' }}>
              <Quote className="w-7 h-7 mb-3" style={{ color: f.cor }} />
              <p className="font-display text-xl text-white font-bold leading-snug">{f.f}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ═══ QUESTÕES DE REVISÃO ═══ */}
      <motion.section {...fade}>
        <Titulo kicker="Teste seu entendimento" titulo="Questões de revisão" icon={MessageCircleQuestion} cor={cor} />
        <p className="text-white/60 text-[16px] mb-5">Pense na resposta e depois toque para ver uma sugestão.</p>
        <div className="flex flex-col gap-3">
          {QUESTOES.map((q, i) => {
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
      </motion.section>

      {/* ═══ PARA REFLETIR ═══ */}
      <motion.section {...fade}>
        <Titulo kicker="Aplicação" titulo="Para refletir" icon={Users} cor={cor} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            'Pense em uma **instituição, costume ou lugar** da sua cidade que levou gerações para ser construído e poderia ser ==destruído rapidamente==.',
            'O **Brasil não herdou o common law**. Que consequências isso pode ter ao aplicarmos o argumento de Scruton ao ==nosso contexto==?',
            'É possível **defender uma tradição** sem cair na ==nostalgia==?',
          ].map((t, i) => (
            <div key={i} className="rounded-2xl p-6 border border-amber-400/25 bg-amber-400/[0.05]">
              <span className="font-display font-black text-3xl text-amber-300/60">?</span>
              <p className="mt-2 text-white/85 text-[17px] leading-relaxed"><R t={t} cor="#fcd34d" /></p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ═══ LIGAÇÕES ═══ */}
      <motion.section {...fade}>
        <Titulo kicker="Conexões" titulo="Ligações com outros capítulos" icon={Link2} cor={cor} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { to: 'capitulo-2', rot: 'Capítulo 2', t: 'Aprofunda a ideia de **sociedade civil**, **tradição** e "pequenos pelotões".' },
            { to: 'capitulo-11', rot: 'Capítulo 11', t: 'Retoma o conservadorismo **metafísico**: o sagrado e as esferas de valor.' },
            { to: 'capitulo-13', rot: 'Capítulo 13', t: 'Retoma a **beleza** e a **perda**: a despedida que proíbe o pranto.' },
          ].map(l => (
            <Link
              key={l.to}
              to={`${BASE_SCRUTON}/${l.to}`}
              className="group rounded-2xl p-6 border border-white/10 bg-white/[0.03] hover:border-white/30 hover:-translate-y-0.5 transition-all"
            >
              <p className="text-[14px] font-black uppercase tracking-widest mb-2" style={{ color: cor }}>{l.rot} →</p>
              <p className="text-white/85 text-[17px] leading-relaxed"><R t={l.t} cor={cor} /></p>
            </Link>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
