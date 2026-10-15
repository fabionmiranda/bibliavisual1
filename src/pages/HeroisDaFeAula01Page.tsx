import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Shield, ArrowLeft, BookOpen, ChevronDown, ChevronRight,
  Star, Flame, Users, Eye, Award, Cross,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* ─── cores ──────────────────────────────────────────────────────────────── */
const ORANGE = '#f97316';
const GOLD   = '#fbbf24';
const BLUE   = '#60a5fa';
const GREEN  = '#34d399';
const ROSE   = '#fb7185';
const PURPLE = '#c084fc';
const WHITE  = '#f1f5f9';

/* ─── dados ──────────────────────────────────────────────────────────────── */
interface Heroi {
  nome: string;
  versiculo: string;
  pelafe: string;
  atRef: string;
  keyword: string;
  cor: string;
}

interface Galeria {
  id: string;
  numero: number;
  titulo: string;
  tempo: string;
  licao: string;
  cor: string;
  icon: React.ElementType;
  quadro: string[];
  herois: Heroi[];
  destaque?: string;
}

const GALERIAS: Galeria[] = [
  {
    id: 'diluvia',
    numero: 1,
    titulo: 'Antes do Dilúvio',
    tempo: '9–15 min',
    licao: 'A fé adora, anda com Deus e obedece',
    cor: GOLD,
    icon: Flame,
    quadro: ['ADORAR', 'ANDAR', 'OBEDECER'],
    herois: [
      { nome: 'Abel',   versiculo: 'Hb 11.4',   pelafe: 'Ofereceu a Deus "mais excelente sacrifício" que Caim; "depois de morto, ainda fala"', atRef: 'Gn 4.1–10',   keyword: 'ADORAR',   cor: GOLD },
      { nome: 'Enoque', versiculo: 'Hb 11.5–6', pelafe: 'Andou com Deus, "agradou a Deus" e foi trasladado sem ver a morte',                  atRef: 'Gn 5.21–24', keyword: 'ANDAR',    cor: GOLD },
      { nome: 'Noé',    versiculo: 'Hb 11.7',   pelafe: 'Temeu a Deus e construiu a arca por "acontecimentos que ainda não se viam"',          atRef: 'Gn 6–9',     keyword: 'OBEDECER', cor: GOLD },
    ],
  },
  {
    id: 'patriarcas',
    numero: 2,
    titulo: 'Os Patriarcas',
    tempo: '15–25 min',
    licao: 'A fé espera nas promessas e as passa adiante',
    cor: BLUE,
    icon: Star,
    quadro: ['SAIR', 'CONFIAR', 'ENTREGAR', 'ESPERAR', 'TRANSMITIR'],
    destaque: 'Os vv. 13–16 revelam o que os patriarcas têm em comum: "todos estes morreram na fé, sem ter obtido as promessas". Viveram como "estrangeiros e peregrinos", buscando "uma pátria superior, isto é, celestial". E por isso "Deus não se envergonha deles, de ser chamado o seu Deus" (v. 16).',
    herois: [
      { nome: 'Abraão',       versiculo: 'Hb 11.8–10',  pelafe: 'Saiu "sem saber aonde ia" e morou em tendas, esperando a cidade de Deus',                              atRef: 'Gn 12.1–9',      keyword: 'SAIR',       cor: BLUE },
      { nome: 'Sara',         versiculo: 'Hb 11.11–12', pelafe: 'Recebeu poder para ser mãe na velhice, "pois teve por fiel aquele que lhe havia feito a promessa"',    atRef: 'Gn 18.9–15; 21.1–7', keyword: 'CONFIAR', cor: BLUE },
      { nome: 'Abraão (2x)',  versiculo: 'Hb 11.17–19', pelafe: 'Ofereceu Isaque, crendo que Deus podia ressuscitá-lo',                                                 atRef: 'Gn 22.1–19',     keyword: 'ENTREGAR',   cor: BLUE },
      { nome: 'Isaque',       versiculo: 'Hb 11.20',    pelafe: 'Abençoou Jacó e Esaú "acerca de coisas que ainda estavam para vir"',                                   atRef: 'Gn 27',          keyword: 'TRANSMITIR', cor: BLUE },
      { nome: 'Jacó',         versiculo: 'Hb 11.21',    pelafe: 'Quase morrendo, abençoou os filhos de José e adorou',                                                  atRef: 'Gn 48',          keyword: 'TRANSMITIR', cor: BLUE },
      { nome: 'José',         versiculo: 'Hb 11.22',    pelafe: 'No fim da vida, profetizou o êxodo e deu ordens sobre seus ossos',                                     atRef: 'Gn 50.24–26',    keyword: 'TRANSMITIR', cor: BLUE },
    ],
  },
  {
    id: 'exodo',
    numero: 3,
    titulo: 'Êxodo e Conquista',
    tempo: '25–32 min',
    licao: 'A fé escolhe Deus acima do medo, do conforto e do passado',
    cor: GREEN,
    icon: Shield,
    quadro: ['CORAGEM', 'ESCOLHA', 'COMUNHÃO', 'GRAÇA'],
    destaque: 'Os vv. 29 e 30 não citam um indivíduo, mas o povo inteiro. A fé também é coletiva: uma igreja inteira pode crer e obedecer junta.',
    herois: [
      { nome: 'Pais de Moisés',    versiculo: 'Hb 11.23',    pelafe: 'Esconderam o bebê por três meses, sem temer o decreto do rei',                                   atRef: 'Êx 2.1–10',      keyword: 'CORAGEM',   cor: GREEN },
      { nome: 'Moisés',            versiculo: 'Hb 11.24–28', pelafe: 'Recusou ser filho da filha de Faraó, preferiu "o opróbrio de Cristo", deixou o Egito e celebrou a Páscoa', atRef: 'Êx 2.11–15; 12–14', keyword: 'ESCOLHA', cor: GREEN },
      { nome: 'O povo de Israel',  versiculo: 'Hb 11.29–30', pelafe: 'Atravessou o mar Vermelho "como por terra seca" e rodeou Jericó por sete dias, e os muros caíram', atRef: 'Êx 14.21–31; Js 6.1–21', keyword: 'COMUNHÃO', cor: GREEN },
      { nome: 'Raabe',             versiculo: 'Hb 11.31',    pelafe: 'Acolheu os espias e "não foi destruída com os desobedientes"',                                    atRef: 'Js 2; 6.22–25',  keyword: 'GRAÇA',     cor: GREEN },
    ],
  },
  {
    id: 'juizes',
    numero: 4,
    titulo: 'Juízes, Reis e Profetas',
    tempo: '32–38 min',
    licao: 'Deus usa pessoas fracas e falhas que confiam nele',
    cor: ROSE,
    icon: Users,
    quadro: ['FRAQUEZA NAS MÃOS DE DEUS'],
    destaque: 'Quase todos os nomes do v. 32 têm falhas sérias registradas: Gideão pediu sinais por medo, Baraque não quis ir sem Débora, Sansão viveu de forma imprudente, Jefté fez um voto precipitado e Davi pecou gravemente. A lista confirma que o critério de Deus é a fé, não a perfeição.',
    herois: [
      { nome: 'Gideão',      versiculo: 'Hb 11.32', pelafe: 'Venceu os midianitas com 300 homens',                          atRef: 'Jz 6–8',      keyword: 'FRAQUEZA', cor: ROSE },
      { nome: 'Baraque',     versiculo: 'Hb 11.32', pelafe: 'Com Débora, derrotou o exército de Sísera',                    atRef: 'Jz 4–5',      keyword: 'FRAQUEZA', cor: ROSE },
      { nome: 'Sansão',      versiculo: 'Hb 11.32', pelafe: 'Libertou Israel dos filisteus pela força que Deus lhe deu',    atRef: 'Jz 13–16',    keyword: 'FRAQUEZA', cor: ROSE },
      { nome: 'Jefté',       versiculo: 'Hb 11.32', pelafe: 'Rejeitado pelos irmãos, livrou Israel dos amonitas',           atRef: 'Jz 11–12',    keyword: 'FRAQUEZA', cor: ROSE },
      { nome: 'Davi',        versiculo: 'Hb 11.32', pelafe: 'O pastor que venceu Golias e recebeu a promessa de um trono eterno', atRef: '1Sm 16–2Sm 24', keyword: 'FRAQUEZA', cor: ROSE },
      { nome: 'Samuel',      versiculo: 'Hb 11.32', pelafe: 'O último juiz e profeta que ungiu os primeiros reis',          atRef: '1Sm 1–16',    keyword: 'FRAQUEZA', cor: ROSE },
      { nome: 'Os profetas', versiculo: 'Hb 11.32', pelafe: 'Falaram a palavra de Deus ao povo, muitas vezes sob perseguição', atRef: '1Rs 17–Ml 4', keyword: 'PERSEVERAR', cor: ROSE },
    ],
  },
  {
    id: 'anonimos',
    numero: 5,
    titulo: 'Os Anônimos',
    tempo: '38–43 min',
    licao: 'A fé persevera, vencendo ou sofrendo',
    cor: PURPLE,
    icon: Eye,
    quadro: ['PERSEVERAR'],
    destaque: 'A fé nem sempre traz livramento visível. Uns fecharam a boca de leões; outros morreram. Os dois grupos têm o mesmo testemunho de Deus (v. 39), e deles se diz que "o mundo não era digno" (v. 38). A fé persevera, porque espera "superior ressurreição" (v. 35).',
    herois: [
      { nome: '"Fecharam a boca de leões"',            versiculo: 'v. 33', pelafe: 'Daniel (Dn 6)',                                                   atRef: 'Dn 6',         keyword: 'PERSEVERAR', cor: PURPLE },
      { nome: '"Extinguiram a violência do fogo"',     versiculo: 'v. 34', pelafe: 'Sadraque, Mesaque e Abede-Nego (Dn 3)',                           atRef: 'Dn 3',         keyword: 'PERSEVERAR', cor: PURPLE },
      { nome: '"Escaparam ao fio da espada"',          versiculo: 'v. 34', pelafe: 'Elias e Eliseu (1Rs 19; 2Rs 6)',                                  atRef: '1Rs 19; 2Rs 6', keyword: 'PERSEVERAR', cor: PURPLE },
      { nome: '"Mulheres receberam seus mortos"',      versiculo: 'v. 35', pelafe: 'A viúva de Sarepta e a sunamita (1Rs 17.17–24; 2Rs 4.18–37)',    atRef: '1Rs 17; 2Rs 4', keyword: 'PERSEVERAR', cor: PURPLE },
      { nome: '"Foram torturados, não aceito resgate"',versiculo: 'v. 35', pelafe: 'Tradição judaica dos mártires do período entre os testamentos',   atRef: 'Hb 11.35',     keyword: 'PERSEVERAR', cor: PURPLE },
      { nome: '"Foram apedrejados"',                   versiculo: 'v. 37', pelafe: 'Zacarias, filho de Joiada (2Cr 24.20–21)',                        atRef: '2Cr 24.20–21', keyword: 'PERSEVERAR', cor: PURPLE },
      { nome: '"Foram serrados pelo meio"',            versiculo: 'v. 37', pelafe: 'Isaías, segundo a tradição judaica',                              atRef: 'Trad. judaica', keyword: 'PERSEVERAR', cor: PURPLE },
    ],
  },
];

const CINCO_LICOES = [
  { num: 1, titulo: 'Antes do dilúvio',        licao: 'A fé adora, anda com Deus e obedece.',                            cor: GOLD },
  { num: 2, titulo: 'Os patriarcas',           licao: 'A fé espera nas promessas e as passa adiante.',                   cor: BLUE },
  { num: 3, titulo: 'Êxodo e conquista',       licao: 'A fé escolhe Deus acima do medo, do conforto e do passado.',     cor: GREEN },
  { num: 4, titulo: 'Juízes, reis e profetas', licao: 'Deus usa pessoas fracas e falhas que confiam nele.',              cor: ROSE },
  { num: 5, titulo: 'Os anônimos',             licao: 'A fé persevera, vencendo ou sofrendo.',                          cor: PURPLE },
];

/* ─── componentes auxiliares ─────────────────────────────────────────────── */

function KeywordBadge({ word, cor }: { word: string; cor: string }) {
  return (
    <span
      className="inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
      style={{ background: cor + '20', color: cor, border: `1px solid ${cor}40` }}
    >
      {word}
    </span>
  );
}

function HeroiCard({ heroi, delay }: { heroi: Heroi; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="rounded-xl p-4 flex flex-col gap-2"
      style={{ background: heroi.cor + '0a', border: `1px solid ${heroi.cor}25` }}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-white font-black text-sm leading-tight">{heroi.nome}</h4>
        <span className="text-[10px] font-bold shrink-0" style={{ color: heroi.cor + 'aa' }}>{heroi.versiculo}</span>
      </div>
      <p className="text-white/55 text-xs leading-relaxed italic">"{heroi.pelafe}"</p>
      <div className="flex items-center justify-between pt-1.5" style={{ borderTop: `1px solid ${heroi.cor}15` }}>
        <span className="text-[10px] text-white/30 font-medium">{heroi.atRef}</span>
        <KeywordBadge word={heroi.keyword} cor={heroi.cor} />
      </div>
    </motion.div>
  );
}

function GaleriaSection({ galeria, isOpen, onToggle }: {
  galeria: Galeria;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = galeria.icon;
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: `1.5px solid ${galeria.cor}30`, background: `${galeria.cor}06` }}
    >
      {/* header clicável */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 sm:p-6 text-left group"
      >
        <div className="p-2.5 rounded-xl shrink-0" style={{ background: galeria.cor + '20', border: `1px solid ${galeria.cor}35` }}>
          <Icon className="w-5 h-5" style={{ color: galeria.cor }} strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: galeria.cor + '88' }}>
              Galeria {galeria.numero} · {galeria.tempo}
            </span>
          </div>
          <h3 className="text-white font-black text-base sm:text-lg leading-tight">{galeria.titulo}</h3>
          <p className="text-white/45 text-xs mt-0.5">{galeria.licao}</p>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
          <ChevronDown className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-6 flex flex-col gap-4">
              {/* divisor */}
              <div className="h-px w-full" style={{ background: `${galeria.cor}20` }} />

              {/* cards dos heróis */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {galeria.herois.map((h, i) => (
                  <HeroiCard key={h.nome} heroi={h} delay={i * 0.05} />
                ))}
              </div>

              {/* destaque */}
              {galeria.destaque && (
                <div
                  className="rounded-xl p-4 text-xs leading-relaxed"
                  style={{ background: galeria.cor + '10', borderLeft: `3px solid ${galeria.cor}60`, color: 'rgba(255,255,255,0.65)' }}
                >
                  <span className="font-black uppercase text-[9px] tracking-widest block mb-1.5" style={{ color: galeria.cor }}>
                    Destaque
                  </span>
                  {galeria.destaque}
                </div>
              )}

              {/* o que aprendemos */}
              <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-white/40">No quadro</p>
                <div className="flex flex-wrap gap-2">
                  {galeria.quadro.map(q => (
                    <KeywordBadge key={q} word={q} cor={galeria.cor} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── página ─────────────────────────────────────────────────────────────── */

export default function HeroisDaFeAula01Page() {
  const [openGaleria, setOpenGaleria] = useState<string | null>('diluvia');

  const toggle = (id: string) => setOpenGaleria(prev => prev === id ? null : id);

  return (
    <div className="min-h-screen relative">
      <Navbar />

      <section className="relative pt-28 sm:pt-36 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${ORANGE}08 0%, transparent 68%)`, filter: 'blur(56px)' }} />

        <div className="max-w-4xl mx-auto">

          {/* breadcrumb */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 mb-10">
            <Link to="/discipulado/confessional" className="flex items-center gap-1.5 text-white/35 hover:text-white/70 text-xs font-bold uppercase tracking-widest transition-colors">
              <ArrowLeft className="w-3 h-3" />
              Estudos Confessionais
            </Link>
            <ChevronRight className="w-3 h-3 text-white/20" />
            <Link to="/discipulado/confessional/herois-da-fe" className="text-white/35 hover:text-white/70 text-xs font-bold uppercase tracking-widest transition-colors">
              Heróis da Fé
            </Link>
            <ChevronRight className="w-3 h-3 text-white/20" />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: ORANGE + 'cc' }}>Aula 01</span>
          </motion.div>

          {/* ── HERO ─────────────────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: ORANGE }} />
              <p className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color: ORANGE }}>
                Heróis da Fé · Aula 01
              </p>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.1] mb-3">
              O Que Aprendemos<br />
              <span style={{ color: ORANGE }}>com os Heróis da Fé</span>
            </h1>
            <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-2xl">
              Panorama de Hebreus 11 — aula de abertura da série. O objetivo não é aprofundar cada herói, mas mostrar o que aprendemos com <strong className="text-white/80">todos</strong> os que aparecem, para que tenhamos o mapa completo antes dos estudos individuais.
            </p>
          </motion.div>

          {/* ── DADOS DA AULA ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10"
          >
            {[
              { label: 'Texto-base',          valor: 'Hebreus 10.35–12.2',               cor: BLUE },
              { label: 'Tema',                valor: 'O que aprendemos com os heróis da fé', cor: ORANGE },
              { label: 'Professor',           valor: 'Fabio Miranda',                     cor: GREEN },
              { label: 'Heróis nomeados',     valor: '16 + 4 grupos anônimos',            cor: ROSE },
            ].map(item => (
              <div key={item.label} className="rounded-xl p-4 flex items-start gap-3"
                style={{ background: item.cor + '0a', border: `1px solid ${item.cor}25` }}>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: item.cor + '99' }}>{item.label}</p>
                  <p className="text-white font-bold text-sm">{item.valor}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── VERSÍCULO PARA MEMORIZAR ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl p-6 sm:p-8 mb-10 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${GOLD}12 0%, transparent 60%)`, border: `1.5px solid ${GOLD}30` }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${GOLD}12 0%, transparent 65%)`, transform: 'translate(30%,-30%)' }} />
            <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: GOLD + '88' }}>
              Versículo para Memorizar
            </p>
            <blockquote className="text-xl sm:text-2xl font-black text-white leading-relaxed mb-3"
              style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 20 }}>
              "Ora, a fé é a <span style={{ color: GOLD }}>certeza</span> de coisas que se esperam, a{' '}
              <span style={{ color: GOLD }}>convicção</span> de fatos que se não veem."
            </blockquote>
            <p className="text-sm font-black uppercase tracking-widest" style={{ color: GOLD + '99' }}>Hebreus 11.1</p>
          </motion.div>

          {/* ── CONTEXTO E DEFINIÇÃO DE FÉ ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="rounded-2xl p-6 mb-10"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <BookOpen className="w-5 h-5" style={{ color: BLUE }} strokeWidth={1.5} />
              <h2 className="font-black text-white text-lg">Contexto e Definição de Fé</h2>
              <span className="text-[10px] font-bold text-white/30">4–9 min</span>
            </div>

            <div className="flex flex-col gap-4">
              {/* por que foi escrito */}
              <div className="rounded-xl p-4" style={{ background: BLUE + '0a', border: `1px solid ${BLUE}25` }}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: BLUE + '99' }}>
                  Por que o capítulo foi escrito — Hb 10.35–39
                </p>
                <p className="text-white/65 text-sm leading-relaxed">
                  Os leitores eram cristãos <strong className="text-white/85">perseguidos e cansados</strong>, tentados a abandonar Cristo. O autor os encoraja: "nós, porém, não somos dos que retrocedem para a perdição; somos, entretanto, da fé" (10.39). O capítulo 11 mostra quem são <em>"os da fé"</em>.
                </p>
              </div>

              {/* o que é fé */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { ref: 'v. 1', texto: 'A fé olha para o futuro prometido e para o invisível — "certeza" e "convicção".' },
                  { ref: 'v. 2', texto: '"Pela fé, os antigos obtiveram bom testemunho." É Deus quem dá o testemunho sobre eles.' },
                  { ref: 'v. 6', texto: '"Sem fé é impossível agradar a Deus." Quem se aproxima precisa crer que Ele existe e recompensa.' },
                ].map(item => (
                  <div key={item.ref} className="rounded-xl p-3.5" style={{ background: GOLD + '08', border: `1px solid ${GOLD}20` }}>
                    <p className="font-black text-sm mb-1" style={{ color: GOLD }}>{item.ref}</p>
                    <p className="text-white/55 text-xs leading-relaxed">{item.texto}</p>
                  </div>
                ))}
              </div>

              {/* aviso importante */}
              <div className="rounded-xl p-4 flex gap-3" style={{ background: ROSE + '0d', border: `1px solid ${ROSE}28` }}>
                <span className="text-lg shrink-0">⚠️</span>
                <div>
                  <p className="font-black text-sm mb-1" style={{ color: ROSE }}>Aviso importante</p>
                  <p className="text-white/60 text-xs leading-relaxed">
                    Esses heróis não eram perfeitos. Vamos ver mentirosos, medrosos, um assassino arrependido, uma prostituta e um adúltero arrependido na lista. <strong className="text-white/80">Eles não estão ali por serem bons, mas porque confiaram num Deus fiel.</strong>
                  </p>
                </div>
              </div>

              {/* "pela fé" */}
              <div className="rounded-xl p-4 text-center" style={{ background: ORANGE + '0a', border: `1px solid ${ORANGE}25` }}>
                <p className="text-sm text-white/50 leading-relaxed">
                  A expressão <span className="font-black text-lg" style={{ color: ORANGE }}>"Pela fé"</span> abre quase todos os parágrafos do capítulo —{' '}
                  <strong className="text-white/80">18 vezes na ARA.</strong>
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── 5 GALERIAS ───────────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }} className="mb-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-6 rounded-full" style={{ background: ORANGE, boxShadow: `0 0 10px ${ORANGE}80` }} />
              <h2 className="font-display font-black text-sm uppercase tracking-widest" style={{ color: ORANGE }}>
                As 5 Galerias da Fé
              </h2>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,${ORANGE}30,transparent)` }} />
            </div>
          </motion.div>

          <div className="flex flex-col gap-3 mb-14">
            {GALERIAS.map((g, i) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 + i * 0.06 }}
              >
                <GaleriaSection
                  galeria={g}
                  isOpen={openGaleria === g.id}
                  onToggle={() => toggle(g.id)}
                />
              </motion.div>
            ))}
          </div>

          {/* ── CONCLUSÃO: JESUS ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl p-7 sm:p-10 mb-14 relative overflow-hidden text-center"
            style={{ background: 'linear-gradient(135deg, #0d0d1a 0%, #101020 100%)', border: `2px solid ${WHITE}20` }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${WHITE}06, transparent)` }} />
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <Cross className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-3 text-white/40">Conclusão · 43–48 min</p>
              <h2 className="font-black text-2xl sm:text-3xl text-white mb-4 leading-tight">
                O maior herói<br /><span className="text-white/50">não está na lista</span>
              </h2>
              <p className="text-white/55 text-sm leading-relaxed max-w-xl mx-auto mb-6">
                "Todos estes não obtiveram, contudo, a concretização da promessa" (11.39). Morreram esperando. Agora eles são <strong className="text-white/75">"tão grande nuvem de testemunhas"</strong> (12.1) — e o olhar final vai para:
              </p>
              <div className="inline-block rounded-2xl px-8 py-5" style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.18)' }}>
                <p className="text-2xl sm:text-3xl font-black text-white mb-1">Jesus</p>
                <p className="text-xs text-white/45 font-bold uppercase tracking-widest">O Autor e Consumador da Fé</p>
                <p className="text-xs mt-1.5" style={{ color: WHITE + '60' }}>Hebreus 12.2</p>
              </div>
              <p className="mt-6 text-white/40 text-sm italic max-w-lg mx-auto">
                "Tudo o que aprendemos com eles, Jesus viveu de modo perfeito. Eles apontam para Ele."
              </p>
            </div>
          </motion.div>

          {/* ── 5 GRANDES LIÇÕES ─────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mb-14">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-6 rounded-full" style={{ background: GOLD, boxShadow: `0 0 10px ${GOLD}80` }} />
              <h2 className="font-display font-black text-sm uppercase tracking-widest" style={{ color: GOLD }}>
                As 5 Grandes Lições da Galeria
              </h2>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,${GOLD}30,transparent)` }} />
            </div>

            <div className="flex flex-col gap-3">
              {CINCO_LICOES.map((l, i) => (
                <motion.div
                  key={l.num}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.57 + i * 0.07 }}
                  className="flex items-start gap-4 rounded-xl p-4"
                  style={{ background: l.cor + '08', border: `1px solid ${l.cor}22` }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-black text-sm"
                    style={{ background: l.cor + '20', border: `1px solid ${l.cor}40`, color: l.cor }}>
                    {l.num}
                  </div>
                  <div>
                    <p className="font-black text-white text-sm mb-0.5">{l.titulo}</p>
                    <p className="text-white/55 text-sm">{l.licao}</p>
                  </div>
                </motion.div>
              ))}

              {/* e acima de todas */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.92 }}
                className="flex items-start gap-4 rounded-xl p-4"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.15)' }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.25)' }}>
                  <Award className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-black text-white text-sm mb-0.5">E acima de todas</p>
                  <p className="text-white/70 text-sm">Os heróis apontam para <strong className="text-white">Jesus</strong> (Hb 12.2).</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── REVISÃO FINAL COMPLETA ────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-6 rounded-full" style={{ background: PURPLE, boxShadow: `0 0 10px ${PURPLE}80` }} />
              <h2 className="font-display font-black text-sm uppercase tracking-widest" style={{ color: PURPLE }}>
                Revisão Final — Todos os Heróis
              </h2>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,${PURPLE}30,transparent)` }} />
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white/40">Herói</th>
                      <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white/40">Texto</th>
                      <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white/40 hidden sm:table-cell">O que aprendemos</th>
                      <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white/40">Palavra</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { nome: 'Abel',              texto: 'Hb 11.4',       licao: 'A fé adora a Deus do jeito que Ele aceita',                           kw: 'ADORAR',        cor: GOLD   },
                      { nome: 'Enoque',            texto: 'Hb 11.5–6',     licao: 'A fé anda com Deus todos os dias e lhe agrada',                       kw: 'ANDAR',         cor: GOLD   },
                      { nome: 'Noé',               texto: 'Hb 11.7',       licao: 'A fé obedece mesmo quando ninguém mais entende',                      kw: 'OBEDECER',      cor: GOLD   },
                      { nome: 'Abraão',            texto: 'Hb 11.8–10',    licao: 'A fé sai sem conhecer o caminho, porque conhece quem guia',           kw: 'SAIR',          cor: BLUE   },
                      { nome: 'Sara',              texto: 'Hb 11.11–12',   licao: 'A fé conta com a fidelidade de Deus diante do impossível',            kw: 'CONFIAR',       cor: BLUE   },
                      { nome: 'Os patriarcas',     texto: 'Hb 11.13–16',   licao: 'A fé vive como peregrina, esperando a pátria celestial',              kw: 'ESPERAR',       cor: BLUE   },
                      { nome: 'Abraão (2x)',       texto: 'Hb 11.17–19',   licao: 'A fé entrega a Deus o que mais ama, crendo que Ele ressuscita mortos', kw: 'ENTREGAR',     cor: BLUE   },
                      { nome: 'Isaque',            texto: 'Hb 11.20',      licao: 'A fé abençoa olhando para o futuro que Deus prometeu',                kw: 'TRANSMITIR',    cor: BLUE   },
                      { nome: 'Jacó',              texto: 'Hb 11.21',      licao: 'A fé adora até o fim e abençoa a próxima geração',                   kw: 'TRANSMITIR',    cor: BLUE   },
                      { nome: 'José',              texto: 'Hb 11.22',      licao: 'A fé confia na promessa mesmo diante da morte',                       kw: 'TRANSMITIR',    cor: BLUE   },
                      { nome: 'Pais de Moisés',   texto: 'Hb 11.23',      licao: 'A fé vence o medo das autoridades humanas',                           kw: 'CORAGEM',       cor: GREEN  },
                      { nome: 'Moisés',            texto: 'Hb 11.24–28',   licao: 'A fé escolhe Cristo acima do conforto, do prestígio e da riqueza',   kw: 'ESCOLHA',       cor: GREEN  },
                      { nome: 'O povo de Israel', texto: 'Hb 11.29–30',   licao: 'A fé caminha e obedece junto, como povo de Deus',                     kw: 'COMUNHÃO',      cor: GREEN  },
                      { nome: 'Raabe',             texto: 'Hb 11.31',      licao: 'A graça de Deus alcança até quem estava longe',                       kw: 'GRAÇA',         cor: GREEN  },
                      { nome: 'Gideão',            texto: 'Hb 11.32',      licao: 'Deus fortalece o medroso que confia nele',                            kw: 'FRAQUEZA',      cor: ROSE   },
                      { nome: 'Baraque',           texto: 'Hb 11.32',      licao: 'Deus dá vitória ao que obedece, mesmo hesitante',                     kw: 'FRAQUEZA',      cor: ROSE   },
                      { nome: 'Sansão',            texto: 'Hb 11.32',      licao: 'Deus ouve até o falho que, no fim, clama a Ele',                      kw: 'FRAQUEZA',      cor: ROSE   },
                      { nome: 'Jefté',             texto: 'Hb 11.32',      licao: 'Deus usa o rejeitado pelos homens',                                   kw: 'FRAQUEZA',      cor: ROSE   },
                      { nome: 'Davi',              texto: 'Hb 11.32',      licao: 'A fé enfrenta gigantes e se arrepende do pecado',                     kw: 'FRAQUEZA',      cor: ROSE   },
                      { nome: 'Samuel',            texto: 'Hb 11.32',      licao: 'A fé ouve a palavra de Deus e a serve com fidelidade',                kw: 'FRAQUEZA',      cor: ROSE   },
                      { nome: 'Os profetas',       texto: 'Hb 11.32',      licao: 'A fé fala a verdade de Deus mesmo sob perseguição',                   kw: 'PERSEVERAR',    cor: PURPLE },
                      { nome: 'Anônimos (vitória)',texto: 'Hb 11.33–35a',  licao: 'Deus pode dar livramento visível',                                    kw: 'PERSEVERAR',    cor: PURPLE },
                      { nome: 'Anônimos (sofrimento)', texto: 'Hb 11.35b–38', licao: 'A fé continua fiel mesmo sem livramento, esperando a ressurreição', kw: 'PERSEVERAR', cor: PURPLE },
                      { nome: 'Jesus',             texto: 'Hb 12.2',       licao: 'Todos os heróis apontam para Ele, o Autor e Consumador da fé',        kw: 'OLHAR P/ JESUS', cor: WHITE },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                        <td className="px-4 py-3 font-bold text-white/80 text-sm whitespace-nowrap">{row.nome}</td>
                        <td className="px-4 py-3 text-xs font-medium whitespace-nowrap" style={{ color: row.cor + 'aa' }}>{row.texto}</td>
                        <td className="px-4 py-3 text-xs text-white/45 hidden sm:table-cell leading-relaxed">{row.licao}</td>
                        <td className="px-4 py-3">
                          <KeywordBadge word={row.kw} cor={row.cor} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* ── PERGUNTA DE REFLEXÃO ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-2xl p-6 sm:p-8 text-center"
            style={{ background: ORANGE + '0c', border: `1.5px solid ${ORANGE}28` }}
          >
            <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: ORANGE + '88' }}>
              Pergunta de Abertura
            </p>
            <p className="text-white font-black text-lg sm:text-xl leading-relaxed mb-3">
              "Se você tivesse que montar um mural com as pessoas que mais marcaram a sua fé, quem estaria nele?"
            </p>
            <p className="text-white/40 text-sm">
              Hebreus 11 é o mural de Deus — homens e mulheres de quase dois mil anos de história.
            </p>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
