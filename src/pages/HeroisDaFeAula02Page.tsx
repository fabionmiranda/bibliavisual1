import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ChevronDown, ChevronRight, BookOpen,
  MapPin, Tent, Star, Cross, Compass, MessageSquare,
  CheckCircle, Calendar, Flame,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AMBER  = '#f59e0b';
const BLUE   = '#60a5fa';
const GREEN  = '#34d399';
const ROSE   = '#fb7185';
const PURPLE = '#c084fc';
const TEAL   = '#2dd4bf';
const WHITE  = '#f1f5f9';
const ORANGE = '#f97316';

// ─── tipos ─────────────────────────────────────────────────────────────────
interface Pergunta { tipo: string; cor: string; pergunta: string; resposta: string; }
interface Movimento {
  id: string; numero: number; titulo: string; subtitulo: string;
  tempo: string; cor: string; icon: React.ElementType;
  quadro: string[]; corpo: React.ReactNode; perguntas: Pergunta[];
}

// ─── helpers ────────────────────────────────────────────────────────────────
function Badge({ label, cor }: { label: string; cor: string }) {
  return (
    <span className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
      style={{ background: cor + '20', color: cor, border: `1px solid ${cor}40` }}>
      {label}
    </span>
  );
}

function TipoTag({ tipo, cor }: { tipo: string; cor: string }) {
  return (
    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded"
      style={{ background: cor + '25', color: cor }}>
      {tipo}
    </span>
  );
}

function PerguntaCard({ p, delay }: { p: Pergunta; delay: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="rounded-xl overflow-hidden" style={{ border: `1px solid ${p.cor}28`, background: p.cor + '07' }}>
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-start gap-3 p-4 text-left">
        <TipoTag tipo={p.tipo} cor={p.cor} />
        <p className="flex-1 text-white/80 text-sm sm:text-base leading-relaxed font-medium">{p.pergunta}</p>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 mt-0.5">
          <ChevronDown className="w-4 h-4" style={{ color: p.cor + '88' }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="px-4 pb-4 pt-1" style={{ borderTop: `1px solid ${p.cor}18` }}>
              <p className="text-white/65 text-sm sm:text-base leading-relaxed">{p.resposta}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── tabelas "De Abraão a Cristo" ────────────────────────────────────────────
function TabelaRedenção({
  titulo, cor, linhas,
}: {
  titulo: string; cor: string;
  linhas: { col1: string; col2: string; col3: string }[];
}) {
  const heads = ['Em Abraão', 'Na história de Israel', 'Em Cristo e na Igreja'];
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cor}30` }}>
      <div className="px-4 py-3 flex items-center gap-2" style={{ background: cor + '18' }}>
        <Star className="w-3.5 h-3.5 shrink-0" style={{ color: cor }} />
        <p className="text-xs font-black uppercase tracking-widest" style={{ color: cor }}>{titulo}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ background: cor + '0d' }}>
              {heads.map(h => (
                <th key={h} className="text-left px-3 py-2.5 text-[10px] font-black uppercase tracking-widest"
                  style={{ color: cor + '99' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {linhas.map((l, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${cor}15`, background: i % 2 === 0 ? 'transparent' : cor + '05' }}>
                <td className="px-3 py-3 text-sm text-white/75 leading-relaxed">{l.col1}</td>
                <td className="px-3 py-3 text-sm text-white/75 leading-relaxed">{l.col2}</td>
                <td className="px-3 py-3 text-sm text-white/75 leading-relaxed">{l.col3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── conteúdo dos movimentos ─────────────────────────────────────────────────
const MOVIMENTOS: Movimento[] = [
  {
    id: 'm1', numero: 1, cor: AMBER, icon: BookOpen,
    titulo: 'A fé obedece à palavra que chama',
    subtitulo: 'Aprendemos que a fé ouve e obedece antes de entender',
    tempo: '12–19 min',
    quadro: ['OUVIR', 'OBEDECER'],
    corpo: (
      <div className="flex flex-col gap-5">
        <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${AMBER}30` }}>
          <div className="px-4 py-3" style={{ background: AMBER + '18' }}>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: AMBER }}>Hb 11.8a · Gn 12.1–4</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: AMBER + '0d' }}>
                  {['Hebreus diz', 'Gênesis mostra', 'O que aprendemos'].map(h => (
                    <th key={h} className="text-left px-3 py-2.5 text-[10px] font-black uppercase tracking-widest"
                      style={{ color: AMBER + '99' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { hb: '"Pela fé, Abraão, quando chamado, obedeceu" (Hb 11.8)', gn: '"Sai da tua terra, da tua parentela e da casa de teu pai" (Gn 12.1)', aq: 'Deus pediu que ele deixasse tudo o que lhe dava segurança: terra, família e herança.' },
                  { hb: '—', gn: 'Deus fez três promessas: terra, descendência e bênção para "todas as famílias da terra" (Gn 12.2–3)', aq: 'A ordem veio acompanhada de promessas. Deus nunca chama para o vazio.' },
                  { hb: '—', gn: '"Partiu, pois, Abrão, como lho ordenara o SENHOR" (Gn 12.4)', aq: 'A resposta foi simples e direta: ele foi, aos 75 anos.' },
                ].map((r, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${AMBER}15`, background: i % 2 === 0 ? 'transparent' : AMBER + '05' }}>
                    <td className="px-3 py-3 text-sm text-white/75 leading-relaxed italic">{r.hb}</td>
                    <td className="px-3 py-3 text-sm text-white/75 leading-relaxed italic">{r.gn}</td>
                    <td className="px-3 py-3 text-sm text-white/80 leading-relaxed font-medium">{r.aq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl p-4" style={{ background: AMBER + '0d', borderLeft: `4px solid ${AMBER}60` }}>
          <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: AMBER }}>Destaque do texto</p>
          <p className="text-white/75 text-sm sm:text-base leading-relaxed">
            Em Hb 11.8, o particípio <strong className="text-white/90">"chamado"</strong> está no presente: literalmente,{' '}
            <em>"sendo chamado, obedeceu"</em>. A obediência veio enquanto o chamado ainda soava, sem demora.{' '}
            <strong className="text-white/90">A fé não negocia o prazo da obediência.</strong>
          </p>
        </div>

        <TabelaRedenção
          titulo="De Abraão a Cristo: o chamado que faz deixar tudo"
          cor={BLUE}
          linhas={[
            { col1: 'Deus chama Abraão para fora de Ur e de Babel (Gn 12.1)', col2: 'Deus chama Israel para fora do Egito para ser o seu povo (Êx 19.4–6)', col3: 'Jesus chama: "Vinde após mim", e os discípulos "deixaram imediatamente as redes" (Mt 4.19–20)' },
            { col1: 'A obediência é resposta a uma promessa', col2: 'A lei é dada a um povo já resgatado (Êx 20.2)', col3: 'Em Cristo, Deus chama "das trevas para a sua maravilhosa luz" (1Pe 2.9)' },
            { col1: '"Em ti serão benditas todas as famílias da terra" (Gn 12.3)', col2: 'Israel deveria ser "reino de sacerdotes" para as nações (Êx 19.6)', col3: 'O evangelho alcança as nações para "a obediência por fé" (Rm 1.5)' },
          ]}
        />

        <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs font-black uppercase tracking-widest mb-2 text-white/40">Explique à turma</p>
          <p className="text-white/65 text-sm sm:text-base leading-relaxed">
            O chamado de Abraão é o primeiro passo de um padrão que atravessa a Bíblia: Deus chama, resgata e só então ordena.{' '}
            A obediência nunca é o preço do chamado, sempre é a resposta a ele. O mesmo acontece conosco: Cristo nos chama pela graça, e a fé nos põe a segui-lo.
          </p>
        </div>
      </div>
    ),
    perguntas: [
      { tipo: 'Texto', cor: AMBER, pergunta: 'O que exatamente Deus mandou Abraão deixar?', resposta: 'A sua terra, a sua parentela e a casa de seu pai (Gn 12.1). Ou seja: o lugar, a família e a herança — tudo o que dava identidade e segurança a um homem daquela época.' },
      { tipo: 'Texto', cor: AMBER, pergunta: 'A ordem de Deus veio sozinha?', resposta: 'Não. Veio com promessas: grande nação, bênção, nome engrandecido e bênção para todas as famílias da terra (Gn 12.2–3). Deus sustenta a obediência com promessas.' },
      { tipo: 'Interpretação', cor: BLUE, pergunta: 'Por que Hebreus diz "quando chamado, obedeceu", e não o contrário?', resposta: 'Porque o chamado de Deus vem primeiro, e a obediência é a resposta. Abraão foi justificado pela fé (Gn 15.6; Rm 4.3), e essa fé "operava juntamente com as suas obras" (Tg 2.22). Não obedecemos para ser chamados; obedecemos porque fomos chamados.' },
      { tipo: 'Cristo', cor: GREEN, pergunta: 'Que paralelo há entre Abraão e os discípulos de Jesus?', resposta: 'Os discípulos "deixaram imediatamente as redes" (Mt 4.20) e, "deixando tudo, o seguiram" (Lc 5.11). Quando Pedro disse "deixamos tudo", Jesus prometeu "muitas vezes mais" e a vida eterna (Mt 19.27–29), assim como Deus fez promessas a Abraão.' },
      { tipo: 'Prática', cor: ROSE, pergunta: 'Existe uma ordem clara da Palavra que você tem adiado? Como Abraão responderia?', resposta: 'Abraão "partiu [...] como lho ordenara o SENHOR" (Gn 12.4). O salmista diz: "Apresso-me, não me detenho em guardar os teus mandamentos" (Sl 119.60). Obediência adiada é desobediência; devemos ser "praticantes da palavra e não somente ouvintes" (Tg 1.22).' },
    ],
  },
  {
    id: 'm2', numero: 2, cor: TEAL, icon: Compass,
    titulo: 'A fé obedece sem ver o caminho',
    subtitulo: 'Aprendemos que a fé confia em quem guia, mesmo sem conhecer o caminho',
    tempo: '19–25 min',
    quadro: ['CONFIAR', 'PARTIR'],
    corpo: (
      <div className="flex flex-col gap-5">
        <div className="rounded-xl p-4" style={{ background: TEAL + '0d', border: `1px solid ${TEAL}28` }}>
          <p className="text-base sm:text-lg font-black text-white leading-relaxed">
            "E partiu <span style={{ color: TEAL }}>sem saber</span> aonde ia" (Hb 11.8)
          </p>
          <p className="text-white/60 text-sm mt-2">Deus disse apenas: "a terra que te mostrarei" (Gn 12.1). Abraão só soube o destino quando já estava a caminho (Gn 12.7).</p>
        </div>

        {/* Mapa da viagem */}
        <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${TEAL}30` }}>
          <div className="px-4 py-3 flex items-center gap-2" style={{ background: TEAL + '18' }}>
            <MapPin className="w-3.5 h-3.5" style={{ color: TEAL }} />
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: TEAL }}>A viagem de Abraão</p>
          </div>
          <div className="flex flex-col">
            {[
              { lugar: 'Ur dos Caldeus', ref: 'Gn 11.31; At 7.2', desc: 'O Deus da glória aparece e chama' },
              { lugar: 'Harã', ref: 'Gn 11.31–12.4', desc: 'Parada da família; morte de Terá; Abrão parte com 75 anos' },
              { lugar: 'Siquém, carvalho de Moré', ref: 'Gn 12.6–7', desc: 'Deus promete a terra; Abrão levanta um altar' },
              { lugar: 'Entre Betel e Ai', ref: 'Gn 12.8', desc: 'Arma a tenda, levanta outro altar e invoca o nome do SENHOR' },
              { lugar: 'Neguebe', ref: 'Gn 12.9', desc: 'Continua caminhando para o sul' },
            ].map((e, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3" style={{ borderTop: i > 0 ? `1px solid ${TEAL}15` : undefined }}>
                <div className="flex flex-col items-center shrink-0 mt-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: TEAL }} />
                  {i < 4 && <div className="w-px flex-1 mt-1" style={{ background: TEAL + '40', minHeight: 16 }} />}
                </div>
                <div>
                  <p className="font-black text-white text-sm">{e.lugar}</p>
                  <p className="text-xs font-bold mb-0.5" style={{ color: TEAL + '88' }}>{e.ref}</p>
                  <p className="text-white/60 text-xs sm:text-sm">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <TabelaRedenção
          titulo="De Abraão a Cristo: a terra, o caminho e a herança"
          cor={TEAL}
          linhas={[
            { col1: 'Recebe a promessa de uma terra que ainda não vê (Gn 12.1, 7)', col2: 'Israel entra em Canaã, mas não encontra o descanso definitivo (Hb 4.8–9)', col3: 'Abraão é chamado "herdeiro do mundo" (Rm 4.13); os mansos "herdarão a terra" (Mt 5.5)' },
            { col1: 'Caminha guiado só pela palavra de Deus', col2: 'Israel é guiado pela nuvem e pela coluna de fogo no deserto (Êx 13.21)', col3: 'Jesus diz: "Eu sou o caminho" (Jo 14.6)' },
            { col1: 'Não sabe o destino, mas conhece quem o guia', col2: 'A terra prometida era uma figura de algo maior', col3: 'A herança final são os novos céus e a nova terra (2Pe 3.13; Ap 21.1)' },
          ]}
        />

        <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-white/65 text-sm sm:text-base leading-relaxed">
            A promessa da terra começa pequena (Canaã) e cresce ao longo da Bíblia até alcançar o mundo inteiro renovado. Abraão não sabia o caminho, mas o caminho tinha nome: <strong className="text-white/90">Cristo</strong>.
            A Palavra é <em>"lâmpada para os meus pés"</em> (Sl 119.105): ilumina o próximo passo, não necessariamente o caminho inteiro.
          </p>
        </div>
      </div>
    ),
    perguntas: [
      { tipo: 'Texto', cor: TEAL, pergunta: 'O que Abraão sabia e o que não sabia quando saiu?', resposta: 'Não sabia "aonde ia" (Hb 11.8). Sabia quem o chamava e o que ele havia prometido (Gn 12.1–3). O destino só foi revelado depois, em Siquém: "Darei à tua descendência esta terra" (Gn 12.7).' },
      { tipo: 'Texto', cor: TEAL, pergunta: 'O que Abraão fazia em cada lugar onde parava?', resposta: 'Levantava um altar ao SENHOR e invocava o seu nome (Gn 12.7–8). A adoração marcou cada etapa do caminho.' },
      { tipo: 'Cristo', cor: GREEN, pergunta: 'Como a promessa da terra cresce ao longo da Bíblia?', resposta: 'Começa com Canaã (Gn 12.7). Josué não deu ao povo o descanso definitivo (Hb 4.8–9). Paulo chama Abraão de "herdeiro do mundo" (Rm 4.13), Jesus diz que os mansos "herdarão a terra" (Mt 5.5), e a herança final são os novos céus e a nova terra (2Pe 3.13).' },
      { tipo: 'Prática', cor: ROSE, pergunta: 'Que decisões você está adiando porque quer ver o caminho inteiro antes de obedecer?', resposta: '"Confia no SENHOR de todo o teu coração e não te estribes no teu próprio entendimento [...] e ele endireitará as tuas veredas" (Pv 3.5–6). Planejamos dizendo "se o Senhor quiser" (Tg 4.13–15).' },
      { tipo: 'Prática', cor: ROSE, pergunta: 'Como a adoração deve acompanhar as nossas decisões?', resposta: 'Como Abraão levantava altares no caminho (Gn 12.7–8), levamos tudo a Deus em oração (Fp 4.6) e fazemos tudo "em nome do Senhor Jesus" (Cl 3.17). Decisão sem oração é caminhar sem altar.' },
    ],
  },
  {
    id: 'm3', numero: 3, cor: PURPLE, icon: Tent,
    titulo: 'A fé obedece como peregrina',
    subtitulo: 'Aprendemos que a fé vive em tendas, adora em altares e espera a cidade de Deus',
    tempo: '25–31 min',
    quadro: ['PEREGRINAR', 'ESPERAR'],
    corpo: (
      <div className="flex flex-col gap-5">
        <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${PURPLE}30` }}>
          <div className="px-4 py-3" style={{ background: PURPLE + '18' }}>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: PURPLE }}>Hb 11.9–10</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: PURPLE + '0d' }}>
                  {['Hebreus diz', 'O que significa', 'O que aprendemos'].map(h => (
                    <th key={h} className="text-left px-3 py-2.5 text-[10px] font-black uppercase tracking-widest"
                      style={{ color: PURPLE + '99' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { hb: '"Peregrinou na terra da promessa como em terra alheia" (v. 9)', sig: 'Abraão chegou à terra prometida, mas nunca foi dono dela. A única terra que comprou foi uma sepultura (Gn 23).', aq: 'A fé recebe a promessa antes de possuí-la.' },
                  { hb: '"Habitando em tendas com Isaque e Jacó" (v. 9)', sig: 'Tendas são moradas provisórias. Três gerações viveram assim.', aq: 'A fé não se instala neste mundo como se ele fosse definitivo.' },
                  { hb: '"Aguardava a cidade que tem fundamentos, da qual Deus é o arquiteto e edificador" (v. 10)', sig: 'Tendas não têm fundamentos; a cidade de Deus tem. Abraão olhava além de Canaã.', aq: 'A fé obedece hoje porque espera o que Deus prometeu para sempre.' },
                ].map((r, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${PURPLE}15`, background: i % 2 === 0 ? 'transparent' : PURPLE + '05' }}>
                    <td className="px-3 py-3 text-sm text-white/75 italic leading-relaxed">{r.hb}</td>
                    <td className="px-3 py-3 text-sm text-white/65 leading-relaxed">{r.sig}</td>
                    <td className="px-3 py-3 text-sm text-white/80 font-medium leading-relaxed">{r.aq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl p-4" style={{ background: PURPLE + '10', border: `1px solid ${PURPLE}30` }}>
            <div className="flex items-center gap-2 mb-2">
              <Tent className="w-4 h-4" style={{ color: PURPLE }} />
              <p className="font-black text-sm" style={{ color: PURPLE }}>A Tenda</p>
            </div>
            <p className="text-white/65 text-sm leading-relaxed">Mostra que Abraão não pertencia àquele lugar. Provisório, transitório, peregrino.</p>
          </div>
          <div className="rounded-xl p-4" style={{ background: AMBER + '10', border: `1px solid ${AMBER}30` }}>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4" style={{ color: AMBER }} />
              <p className="font-black text-sm" style={{ color: AMBER }}>O Altar</p>
            </div>
            <p className="text-white/65 text-sm leading-relaxed">Mostra a quem ele pertencia. Onde havia tenda, havia altar: adoração em cada etapa.</p>
          </div>
        </div>

        <TabelaRedenção
          titulo="De Abraão a Cristo: da tenda à cidade de Deus"
          cor={PURPLE}
          linhas={[
            { col1: 'Mora em tendas (Hb 11.9)', col2: 'Deus habita no meio do povo no tabernáculo, uma tenda (Êx 25.8–9)', col3: '"O Verbo se fez carne e habitou entre nós", literalmente "armou a sua tenda" (Jo 1.14)' },
            { col1: 'Levanta altares e oferece sacrifícios (Gn 12.7–8)', col2: 'O sistema de sacrifícios no tabernáculo e no templo (Lv 1–7)', col3: 'Cristo se ofereceu "uma vez por todas" (Hb 10.10); não precisamos mais de altares' },
            { col1: 'Espera a cidade cujo arquiteto é Deus (Hb 11.10), em contraste com Babel (Gn 11.4)', col2: 'Davi conquista Jerusalém, a cidade do grande Rei (2Sm 5.7; Sl 48.2), mas ela também cai', col3: '"Tendes chegado ao monte Sião e à cidade do Deus vivo, a Jerusalém celestial" (Hb 12.22)' },
            { col1: 'Vive como estrangeiro e peregrino (Hb 11.13)', col2: 'Israel vai para o exílio e aprende a esperar a restauração', col3: '"Não temos aqui cidade permanente, mas buscamos a que há de vir" (Hb 13.14)' },
          ]}
        />
      </div>
    ),
    perguntas: [
      { tipo: 'Texto', cor: PURPLE, pergunta: 'Abraão chegou a ser dono da terra prometida?', resposta: 'Não. Viveu nela "como em terra alheia" (Hb 11.9). Deus "nem sequer o espaço de um pé" lhe deu como herança naquele tempo (At 7.5). A única terra que comprou foi uma sepultura (Gn 23).' },
      { tipo: 'Interpretação', cor: BLUE, pergunta: 'Por que Abraão conseguia viver em tendas sem desanimar?', resposta: 'Porque "aguardava a cidade que tem fundamentos" (Hb 11.10). Os patriarcas buscavam "uma pátria superior, isto é, celestial", e por isso "Deus não se envergonha deles" (Hb 11.16).' },
      { tipo: 'Cristo', cor: GREEN, pergunta: 'Que ligação há entre a tenda de Abraão, o tabernáculo e Jesus?', resposta: 'Deus mandou fazer um tabernáculo para habitar no meio do povo (Êx 25.8). Em Cristo, "o Verbo se fez carne e habitou entre nós" (Jo 1.14). No fim, "eis o tabernáculo de Deus com os homens" (Ap 21.3).' },
      { tipo: 'Prática', cor: ROSE, pergunta: 'Que sinais mostram que estamos nos "instalando" neste mundo como se ele fosse definitivo?', resposta: 'Ansiedade com bens, medo de perder o conforto, pouca generosidade. Somos "peregrinos e forasteiros" (1Pe 2.11), devemos pensar "nas coisas lá do alto" (Cl 3.1–2).' },
      { tipo: 'Prática', cor: ROSE, pergunta: 'Como o "altar ao lado da tenda" se aplica à nossa família hoje?', resposta: 'Abraão vivia em tendas "com Isaque e Jacó" (Hb 11.9) e foi escolhido para ordenar "a seus filhos e a sua casa" que guardassem o caminho do SENHOR (Gn 18.19). Hoje isso é o culto doméstico (Dt 6.6–7).' },
    ],
  },
];

// ─── seção de intermezzo: o filho que falha ──────────────────────────────────
function IntermezzoFalha() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      className="rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${ROSE}35`, background: ROSE + '07' }}>
      <div className="flex items-center gap-3 px-5 py-4" style={{ background: ROSE + '15' }}>
        <Cross className="w-4 h-4 shrink-0" style={{ color: ROSE }} strokeWidth={1.5} />
        <div>
          <p className="text-xs font-black uppercase tracking-widest" style={{ color: ROSE + '99' }}>31–35 min</p>
          <h3 className="font-black text-white text-lg leading-tight">O filho que falha e o Filho que obedece</h3>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-4">
        <p className="text-white/65 text-sm sm:text-base leading-relaxed">
          Logo depois de obedecer, Abraão enfrentou a fome, desceu ao Egito e, com medo,{' '}
          <strong className="text-white/85">mentiu dizendo que Sarai era sua irmã</strong>.{' '}
          Foi Deus quem interveio para proteger a promessa.
        </p>

        <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${ROSE}28` }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: ROSE + '0d' }}>
                  {['Em Abraão', 'Na história de Israel', 'Em Cristo'].map(h => (
                    <th key={h} className="text-left px-3 py-2.5 text-[10px] font-black uppercase tracking-widest"
                      style={{ color: ROSE + '88' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { a: 'Desce ao Egito e falha por medo (Gn 12.10–20)', b: 'Israel, o "filho" de Deus (Êx 4.22), é tirado do Egito, mas murmura e desobedece no deserto', c: '"Do Egito chamei o meu Filho" (Mt 2.15; Os 11.1): Jesus refaz o caminho de Israel' },
                  { a: 'Sua obediência é real, mas imperfeita', b: 'No deserto, Israel cai diante da fome, da prova e da idolatria', c: 'No deserto, Jesus vence as mesmas tentações, respondendo com Deuteronômio (Mt 4.1–11)' },
                  { a: 'Deus protege a promessa apesar da falha', b: 'Os profetas prometem um novo coração e o Espírito (Jr 31.33; Ez 36.27)', c: 'Cristo cumpre toda a justiça (Mt 3.15) e envia o Espírito que nos faz obedecer' },
                ].map((r, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${ROSE}15`, background: i % 2 === 0 ? 'transparent' : ROSE + '05' }}>
                    <td className="px-3 py-3 text-sm text-white/70 leading-relaxed">{r.a}</td>
                    <td className="px-3 py-3 text-sm text-white/70 leading-relaxed">{r.b}</td>
                    <td className="px-3 py-3 text-sm text-white/80 font-medium leading-relaxed">{r.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl p-4" style={{ background: GREEN + '0d', borderLeft: `4px solid ${GREEN}60` }}>
          <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: GREEN }}>O que aprendemos</p>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            A obediência de Abraão foi real, mas não perfeita. O medo o fez tropeçar. Israel repetiu a mesma história: chamado, resgatado, mas desobediente.
            A Bíblia inteira espera um Filho que obedeça de verdade. Esse Filho é Jesus: <strong className="text-white/90">"Este é o meu Filho amado, em quem me comprazo"</strong> (Mt 3.17).
            Abraão não foi justificado pela obediência, mas pela fé (Gn 15.6). A obediência é fruto e evidência da fé verdadeira.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MovimentoSection ────────────────────────────────────────────────────────
function MovimentoSection({ mov, isOpen, onToggle }: {
  mov: Movimento; isOpen: boolean; onToggle: () => void;
}) {
  const Icon = mov.icon;
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${mov.cor}30`, background: mov.cor + '06' }}>
      <button onClick={onToggle} className="w-full flex items-center gap-4 p-5 sm:p-6 text-left group">
        <div className="p-3 rounded-xl shrink-0" style={{ background: mov.cor + '20', border: `1px solid ${mov.cor}35` }}>
          <Icon className="w-5 h-5" style={{ color: mov.cor }} strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: mov.cor + '88' }}>
              Movimento {mov.numero} · {mov.tempo}
            </span>
          </div>
          <h3 className="text-white font-black text-xl sm:text-2xl leading-tight">{mov.titulo}</h3>
          <p className="text-white/55 text-base mt-0.5">{mov.subtitulo}</p>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
          <ChevronDown className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
            <div className="px-5 sm:px-6 pb-6 flex flex-col gap-5">
              <div className="h-px w-full" style={{ background: mov.cor + '20' }} />

              {/* quadro */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-black uppercase tracking-widest text-white/30 mr-1">No quadro:</span>
                {mov.quadro.map(q => <Badge key={q} label={q} cor={mov.cor} />)}
              </div>

              {/* conteúdo */}
              {mov.corpo}

              {/* perguntas */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-4 h-4" style={{ color: mov.cor }} strokeWidth={1.5} />
                  <p className="text-xs font-black uppercase tracking-widest" style={{ color: mov.cor + '99' }}>Perguntas para a turma</p>
                </div>
                <div className="flex flex-col gap-2">
                  {mov.perguntas.map((p, i) => (
                    <PerguntaCard key={i} p={p} delay={i * 0.04} />
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

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function HeroisDaFeAula02Page() {
  const [openMov, setOpenMov] = useState<string | null>('m1');
  const toggle = (id: string) => setOpenMov(prev => prev === id ? null : id);

  return (
    <div className="min-h-screen relative">
      <Navbar />

      <section className="relative pt-28 sm:pt-36 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${AMBER}07 0%, transparent 65%)`, filter: 'blur(60px)' }} />

        <div className="max-w-4xl mx-auto">

          {/* breadcrumb */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 mb-10 flex-wrap">
            <Link to="/estudos/biblicos" className="flex items-center gap-1.5 text-white/35 hover:text-white/70 text-sm font-bold uppercase tracking-widest transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              Estudos Bíblicos
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/20" />
            <Link to="/estudos/biblicos/herois-da-fe" className="text-white/35 hover:text-white/70 text-sm font-bold uppercase tracking-widest transition-colors">
              Heróis da Fé
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/20" />
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: AMBER + 'cc' }}>Abraão · Aula 02</span>
          </motion.div>

          {/* HERO */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: AMBER }} />
              <p className="text-xs font-black tracking-[0.35em] uppercase" style={{ color: AMBER }}>
                Heróis da Fé · Aula 02
              </p>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.1] mb-4">
              Abraão —<br />
              <span style={{ color: AMBER }}>A Fé que Obedece</span>
            </h1>
            <p className="text-white/55 text-lg sm:text-xl leading-relaxed max-w-2xl">
              Hebreus 11.8–10 · Uma leitura histórico-redentiva: de Babel a Abraão, de Abraão a Cristo,{' '}
              de Cristo até nós. A fé verdadeira obedece antes de ver o resultado.
            </p>
          </motion.div>

          {/* METADADOS */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {[
              { label: 'Texto-base',    valor: 'Hebreus 11.8–10',     cor: AMBER  },
              { label: 'Tema',          valor: 'A fé que obedece',     cor: TEAL   },
              { label: 'Professor',     valor: 'Fabio Miranda',        cor: BLUE   },
              { label: 'Duração',       valor: '50 minutos',           cor: PURPLE },
            ].map(item => (
              <div key={item.label} className="rounded-xl p-4" style={{ background: item.cor + '0a', border: `1px solid ${item.cor}25` }}>
                <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: item.cor + '99' }}>{item.label}</p>
                <p className="text-white font-bold text-sm sm:text-base">{item.valor}</p>
              </div>
            ))}
          </motion.div>

          {/* VERSÍCULO */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="rounded-2xl p-6 sm:p-8 mb-10 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${AMBER}12 0%, transparent 60%)`, border: `1.5px solid ${AMBER}35` }}>
            <div className="absolute top-0 right-0 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${AMBER}10 0%, transparent 65%)`, transform: 'translate(30%,-30%)' }} />
            <p className="text-xs font-black uppercase tracking-widest mb-4 relative z-10" style={{ color: AMBER + '88' }}>Versículo para Memorizar</p>
            <blockquote className="text-xl sm:text-2xl font-black text-white leading-relaxed mb-3 relative z-10"
              style={{ borderLeft: `3px solid ${AMBER}`, paddingLeft: 20 }}>
              "Pela fé, Abraão, quando chamado, <span style={{ color: AMBER }}>obedeceu</span>, a fim de ir para um lugar que devia receber por herança;
              e partiu <span style={{ color: AMBER }}>sem saber aonde ia</span>."
            </blockquote>
            <p className="text-sm font-black uppercase tracking-widest relative z-10" style={{ color: AMBER + '88' }}>Hebreus 11.8</p>
          </motion.div>

          {/* CONTEXTO HISTÓRICO-REDENTIVO */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-2xl p-6 mb-10"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-3 mb-5">
              <BookOpen className="w-5 h-5" style={{ color: BLUE }} strokeWidth={1.5} />
              <h2 className="font-black text-white text-xl">Contexto Histórico-Redentivo</h2>
              <span className="text-xs font-bold text-white/30">6–12 min</span>
            </div>

            <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-5">
              A Bíblia não é uma coleção de exemplos soltos, mas uma única história que avança de promessa em promessa até Cristo (Lc 24.27, 44).
              O fio desta aula é a <strong className="text-white/85">obediência</strong>:
            </p>

            <div className="rounded-xl overflow-hidden mb-5" style={{ border: `1px solid ${BLUE}28` }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: BLUE + '10' }}>
                      {['Etapa', 'Texto', 'A obediência nesta etapa'].map(h => (
                        <th key={h} className="text-left px-3 py-3 text-[10px] font-black uppercase tracking-widest"
                          style={{ color: BLUE + '88' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { etapa: 'Éden',        texto: 'Gn 2.16–17; 3.6',     desc: 'Adão recebe uma ordem clara e desobedece. A morte entra no mundo.' },
                      { etapa: 'A promessa',  texto: 'Gn 3.15',              desc: 'Deus promete um Descendente da mulher que vencerá a serpente.' },
                      { etapa: 'Babel',       texto: 'Gn 11.1–9',            desc: 'A humanidade se une para fazer "célebre o nosso nome" e construir sua própria cidade.' },
                      { etapa: 'Abraão',      texto: 'Gn 12.1–4; Hb 11.8',  desc: 'Deus chama um homem para fora de Babel. "Quando chamado, obedeceu."' },
                      { etapa: 'Israel',      texto: 'Êx 4.22; 19.5',        desc: 'Israel, o "filho" de Deus, recebe a lei e é chamado a obedecer, mas falha repetidamente.' },
                      { etapa: 'Os profetas', texto: 'Jr 31.33; Ez 36.27',   desc: 'Deus promete um novo coração e o seu Espírito para produzir obediência.' },
                      { etapa: 'Cristo',      texto: 'Rm 5.19; Fp 2.8; Hb 5.8', desc: 'O Filho obedece perfeitamente, "até à morte e morte de cruz".' },
                      { etapa: 'A Igreja',    texto: 'Rm 1.5; Gl 3.29',      desc: 'As nações entram na família de Abraão pela "obediência por fé".' },
                      { etapa: 'Consumação',  texto: 'Hb 11.10; Ap 21.2–3', desc: 'A cidade que Abraão esperava desce do céu: Deus habita com o seu povo.' },
                    ].map((r, i) => {
                      const colors = [AMBER, GREEN, ROSE, BLUE, PURPLE, TEAL, GREEN, AMBER, WHITE];
                      const cor = colors[i % colors.length];
                      return (
                        <tr key={i} style={{ borderTop: `1px solid rgba(255,255,255,0.05)`, background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                          <td className="px-3 py-3 font-black text-sm whitespace-nowrap" style={{ color: cor }}>{r.etapa}</td>
                          <td className="px-3 py-3 text-xs font-bold text-white/40 whitespace-nowrap">{r.texto}</td>
                          <td className="px-3 py-3 text-sm text-white/65 leading-relaxed">{r.desc}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl p-4" style={{ background: ORANGE + '0d', borderLeft: `4px solid ${ORANGE}60` }}>
                <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: ORANGE }}>Ponto-chave</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Gênesis 12 é a resposta de Deus a Gênesis 3–11. Depois da queda, de Caim, do dilúvio e de Babel, Deus não abandona o mundo:{' '}
                  ele chama um homem para, por meio dele, abençoar <strong className="text-white/90">"todas as famílias da terra"</strong> (Gn 12.3).
                  Paulo chama essa promessa de <em>evangelho anunciado de antemão</em> (Gl 3.8).
                </p>
              </div>
              <div className="rounded-xl p-4" style={{ background: PURPLE + '0d', borderLeft: `4px solid ${PURPLE}60` }}>
                <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: PURPLE }}>Contraste de Cidades</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Em Babel, os homens construíram a sua cidade para chegar ao céu. Abraão, ao contrário,{' '}
                  <strong className="text-white/90">"aguardava a cidade que tem fundamentos, da qual Deus é o arquiteto e edificador"</strong> (Hb 11.10).
                </p>
              </div>
            </div>
          </motion.div>

          {/* 3 MOVIMENTOS */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mb-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-6 rounded-full" style={{ background: AMBER, boxShadow: `0 0 10px ${AMBER}80` }} />
              <h2 className="font-display font-black text-sm uppercase tracking-widest" style={{ color: AMBER }}>Os 3 Movimentos da Aula</h2>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,${AMBER}30,transparent)` }} />
            </div>
            <p className="text-white/50 text-sm sm:text-base mb-6">
              Clique em cada movimento para expandir. Dentro, veja as tabelas históricas e as{' '}
              <span style={{ color: AMBER }} className="font-semibold">perguntas para a turma</span> — clique para revelar as respostas.
            </p>
          </motion.div>

          <div className="flex flex-col gap-3 mb-10">
            {MOVIMENTOS.map((m, i) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.27 + i * 0.07 }}>
                <MovimentoSection mov={m} isOpen={openMov === m.id} onToggle={() => toggle(m.id)} />
              </motion.div>
            ))}
          </div>

          {/* INTERMEZZO: o filho que falha */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mb-10">
            <IntermezzoFalha />
          </motion.div>

          {/* CONCLUSÃO */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="rounded-2xl p-7 sm:p-10 mb-10 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0d0d1a 0%, #101020 100%)', border: `2px solid ${WHITE}20` }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${AMBER}06, transparent)` }} />
            <div className="relative z-10">
              <p className="text-xs font-black uppercase tracking-widest mb-3 text-white/40">Conclusão · 35–39 min</p>
              <h2 className="font-black text-2xl sm:text-3xl text-white mb-5 leading-tight">
                De Abraão a Cristo,<br /><span style={{ color: AMBER }}>de Cristo a nós</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  { titulo: 'Cristo é o Descendente', cor: BLUE, texto: '"Não diz: E aos descendentes, como se falando de muitos, porém como de um só: E ao teu descendente, que é Cristo" (Gl 3.16). Jesus disse: "Abraão, vosso pai, alegrou-se por ver o meu dia" (Jo 8.56).' },
                  { titulo: 'Cristo é o Obediente', cor: GREEN, texto: 'Adão desobedeceu, Israel desobedeceu, Abraão tropeçou. Cristo obedeceu perfeitamente: "por meio da obediência de um só, muitos se tornarão justos" (Rm 5.19).' },
                  { titulo: 'Cristo saiu mais longe', cor: ROSE, texto: 'Abraão deixou Ur; o Filho deixou a glória do céu, "tornando-se obediente até à morte e morte de cruz" (Fp 2.7–8).' },
                  { titulo: 'A bênção chegou às nações', cor: PURPLE, texto: '"Se sois de Cristo, também sois descendentes de Abraão e herdeiros segundo a promessa" (Gl 3.29). A Igreja é a família prometida a Abraão.' },
                ].map(item => (
                  <div key={item.titulo} className="rounded-xl p-4" style={{ background: item.cor + '0d', border: `1px solid ${item.cor}28` }}>
                    <p className="font-black text-sm mb-2" style={{ color: item.cor }}>{item.titulo}</p>
                    <p className="text-white/65 text-sm leading-relaxed">{item.texto}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-5 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.18)' }}>
                <p className="text-white/80 text-lg sm:text-xl font-black leading-relaxed">
                  "Abraão obedeceu e apontou para Cristo.{' '}
                  <span style={{ color: AMBER }}>Cristo obedeceu e nos salvou.</span>{' '}
                  Agora, unidos a Cristo pela fé, somos filhos de Abraão chamados a obedecer."
                </p>
              </div>
            </div>
          </motion.div>

          {/* REVISÃO FINAL */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mb-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-1 h-6 rounded-full" style={{ background: TEAL, boxShadow: `0 0 10px ${TEAL}80` }} />
              <h2 className="font-display font-black text-sm uppercase tracking-widest" style={{ color: TEAL }}>Revisão Final</h2>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,${TEAL}30,transparent)` }} />
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { kw: ['OUVIR', 'OBEDECER'], cor: AMBER, texto: 'Deus chama pela graça, e a fé responde sem demora. De Abraão aos discípulos, até nós.' },
                { kw: ['CONFIAR', 'PARTIR'],  cor: TEAL,  texto: 'A fé segue a voz de Deus sem ver o caminho, porque o Caminho é Cristo.' },
                { kw: ['PEREGRINAR', 'ESPERAR'], cor: PURPLE, texto: 'A fé vive em tendas e espera a cidade de Deus, que desce do céu.' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.57 + i * 0.07 }}
                  className="flex items-start gap-4 rounded-xl p-4"
                  style={{ background: item.cor + '08', border: `1px solid ${item.cor}22` }}>
                  <div className="flex flex-wrap gap-1.5 shrink-0">
                    {item.kw.map(k => <Badge key={k} label={k} cor={item.cor} />)}
                  </div>
                  <p className="text-white/65 text-sm sm:text-base leading-relaxed">{item.texto}</p>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.78 }}
                className="flex items-center gap-4 rounded-xl p-4"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.15)' }}>
                <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.25)' }}>
                  <Cross className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                  E no centro de toda a história: <strong className="text-white">Cristo</strong>, o Filho obediente, em quem a promessa a Abraão se cumpre e por quem somos feitos filhos de Abraão.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* ATIVIDADE */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62 }}
            className="rounded-2xl p-6 sm:p-8 mb-10"
            style={{ background: BLUE + '08', border: `1.5px solid ${BLUE}30` }}>
            <div className="flex items-center gap-3 mb-5">
              <CheckCircle className="w-5 h-5" style={{ color: BLUE }} strokeWidth={1.5} />
              <h2 className="font-black text-white text-xl">Atividade · Pense, Converse, Compartilhe</h2>
              <span className="text-xs font-bold text-white/30">41–46 min</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {[
                { num: '1', fase: 'Pense', tempo: '1 min', cor: AMBER, desc: 'Cada aluno responde sozinho: "Qual é uma ordem clara de Deus, na Palavra, que eu tenho adiado obedecer?"' },
                { num: '2', fase: 'Converse', tempo: '2 min', cor: TEAL, desc: 'Em dupla, completam a frase: "Como Abraão, Deus me chama a ___. O que me prende é ___. Por causa da obediência de Cristo por mim, nesta semana vou obedecer ___."' },
                { num: '3', fase: 'Compartilhe', tempo: '2 min', cor: GREEN, desc: 'Três ou quatro duplas leem a frase para a turma, se quiserem.' },
              ].map(f => (
                <div key={f.num} className="rounded-xl p-4" style={{ background: f.cor + '0d', border: `1px solid ${f.cor}28` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                      style={{ background: f.cor + '25', color: f.cor }}>{f.num}</div>
                    <span className="font-black text-sm" style={{ color: f.cor }}>{f.fase}</span>
                    <span className="text-xs text-white/30 ml-auto">{f.tempo}</span>
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-4" style={{ background: ROSE + '0d', border: `1px solid ${ROSE}28` }}>
              <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: ROSE }}>Reforce sempre</p>
              <p className="text-white/65 text-sm leading-relaxed">
                Não obedecemos para ser aceitos; obedecemos porque fomos aceitos em Cristo.
                Incentive respostas concretas, ligadas a ordens claras das Escrituras.
              </p>
            </div>
          </motion.div>

          {/* ESTUDO DA SEMANA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68 }} className="mb-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-1 h-6 rounded-full" style={{ background: GREEN, boxShadow: `0 0 10px ${GREEN}80` }} />
              <h2 className="font-display font-black text-sm uppercase tracking-widest" style={{ color: GREEN }}>Estudo da Semana</h2>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,${GREEN}30,transparent)` }} />
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                      {['Dia', 'Leitura', 'Tema', 'Pergunta'].map(h => (
                        <th key={h} className="text-left px-4 py-4 text-sm font-black uppercase tracking-widest text-white/50">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { dia: 'Segunda', leitura: 'Gn 11.1–9; 12.1–3', tema: 'Babel e o chamado', pergunta: 'Que diferença há entre o "nome" que Babel buscou e o "nome" que Deus deu a Abrão?', cor: AMBER },
                      { dia: 'Terça', leitura: 'Gn 12.4–9; Jo 1.14', tema: 'Tendas, altares e o Verbo', pergunta: 'Como a tenda de Abraão aponta para Jesus, que "habitou entre nós"?', cor: TEAL },
                      { dia: 'Quarta', leitura: 'Gn 12.10–20; Mt 4.1–11', tema: 'O filho que falha e o Filho que vence', pergunta: 'Onde Abrão falhou, e como Jesus venceu a prova?', cor: ROSE },
                      { dia: 'Quinta', leitura: 'Gn 15.1–6; Rm 4.13–25', tema: 'A fé que justifica', pergunta: 'Por que Abrão foi declarado justo, e o que isso tem a ver comigo?', cor: BLUE },
                      { dia: 'Sexta', leitura: 'Hb 5.7–9; Fp 2.5–11', tema: 'O Filho obediente', pergunta: 'O que a obediência de Jesus me ensina sobre a minha obediência?', cor: GREEN },
                      { dia: 'Sábado', leitura: 'Hb 11.8–16; Ap 21.1–4', tema: 'A cidade de Deus', pergunta: 'Como a cidade que Abraão esperava me ajuda a viver hoje como peregrino?', cor: PURPLE },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                        <td className="px-4 py-3.5 font-black text-sm whitespace-nowrap" style={{ color: row.cor }}>{row.dia}</td>
                        <td className="px-4 py-3.5 text-xs font-bold text-white/50 whitespace-nowrap">{row.leitura}</td>
                        <td className="px-4 py-3.5 text-sm text-white/75 font-medium">{row.tema}</td>
                        <td className="px-4 py-3.5 text-sm text-white/55 leading-relaxed">{row.pergunta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: BookOpen, cor: AMBER, texto: 'Memorizar Hebreus 11.8' },
                { icon: CheckCircle, cor: GREEN, texto: 'Obedecer na prática ao que escreveu na atividade em dupla' },
                { icon: Calendar, cor: BLUE, texto: 'Orar todos os dias pela sua dupla' },
              ].map((d, i) => {
                const Icon = d.icon;
                return (
                  <div key={i} className="flex items-center gap-3 rounded-xl p-4" style={{ background: d.cor + '0a', border: `1px solid ${d.cor}25` }}>
                    <Icon className="w-4 h-4 shrink-0" style={{ color: d.cor }} strokeWidth={1.5} />
                    <p className="text-white/70 text-sm font-medium">{d.texto}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* PERGUNTA DE ABERTURA */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
            className="rounded-2xl p-6 sm:p-8 text-center"
            style={{ background: AMBER + '0c', border: `1.5px solid ${AMBER}28` }}>
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: AMBER + '88' }}>Pergunta de Abertura</p>
            <p className="text-white font-black text-xl sm:text-2xl lg:text-3xl leading-relaxed mb-4">
              "Você já precisou tomar uma decisão importante sem saber como ela ia terminar?<br />
              <span style={{ color: AMBER }}>Um emprego, uma mudança, um casamento?</span>"
            </p>
            <p className="text-white/50 text-base sm:text-lg">
              Abraão não recebeu um mapa. Recebeu uma voz — e <em>"partiu sem saber aonde ia"</em> (Hb 11.8).
            </p>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
