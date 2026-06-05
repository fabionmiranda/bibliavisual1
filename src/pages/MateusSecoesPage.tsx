import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Lock, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';

const SECOES = [
  { num: '01', ref: 'Mt 1:1–17',   titulo: 'A Genealogia de Jesus Cristo',           subtitulo: 'Genealogia · Quiasmo A·B¹·B²·B³·A′', enabled: true },
  { num: '02', ref: 'Mt 1:18–25',  titulo: 'O Nascimento de Jesus Cristo',            subtitulo: 'Narrativa · Anúncio angélico' },
  { num: '03', ref: 'Mt 2:1–12',   titulo: 'A Visita dos Magos',                      subtitulo: 'Narrativa · Epifania' },
  { num: '04', ref: 'Mt 2:13–23',  titulo: 'A Fuga para o Egito e o Retorno',         subtitulo: 'Narrativa · Cumprimento tipológico' },
  { num: '05', ref: 'Mt 3:1–12',   titulo: 'João Batista no Deserto',                 subtitulo: 'Narrativa profética · Proclamação' },
  { num: '06', ref: 'Mt 3:13–17',  titulo: 'O Batismo de Jesus',                      subtitulo: 'Narrativa · Voz do Pai e descida do Espírito' },
  { num: '07', ref: 'Mt 4:1–11',   titulo: 'A Tentação de Jesus no Deserto',          subtitulo: 'Narrativa · Conflito cristológico' },
  { num: '08', ref: 'Mt 4:12–25',  titulo: 'O Início do Ministério na Galileia',      subtitulo: 'Narrativa de abertura · Chamado dos primeiros discípulos' },
  { num: '09', ref: 'Mt 5:1–12',   titulo: 'As Bem-Aventuranças',                     subtitulo: 'Discurso · Reino e caráter do discípulo' },
  { num: '10', ref: 'Mt 5:13–48',  titulo: 'Sal, Luz e a Lei Cumprida',               subtitulo: 'Discurso · Antíteses ética do reino' },
  { num: '11', ref: 'Mt 6:1–34',   titulo: 'A Justiça Secreta e o Pai Nosso',         subtitulo: 'Discurso · Oração, jejum e coração' },
  { num: '12', ref: 'Mt 7:1–29',   titulo: 'O Julgamento, o Caminho e a Rocha',       subtitulo: 'Discurso · Conclusão do Sermão da Montanha' },
  { num: '13', ref: 'Mt 8:1–17',   titulo: 'Milagres de Cura — Primeira Série',       subtitulo: 'Narrativa · Leproso, servo e sogra de Pedro' },
  { num: '14', ref: 'Mt 8:18–9:8', titulo: 'Disciplina, Tempestade e Paralítico',     subtitulo: 'Narrativa · Autoridade sobre natureza e pecado' },
  { num: '15', ref: 'Mt 9:9–34',   titulo: 'Mateus Chamado e Controvérsias',          subtitulo: 'Narrativa de chamado · Jejum e milagres' },
  { num: '16', ref: 'Mt 9:35–10:42', titulo: 'O Envio dos Doze',                      subtitulo: 'Discurso missionário · Comissão e instruções' },
  { num: '17', ref: 'Mt 11:1–30',  titulo: 'João, as Cidades e o Descanso em Cristo', subtitulo: 'Narrativa e discurso · Revelação e convite' },
  { num: '18', ref: 'Mt 12:1–50',  titulo: 'Conflitos com os Fariseus',               subtitulo: 'Controvérsia · Sábado, Beelzebu e sinal' },
  { num: '19', ref: 'Mt 13:1–52',  titulo: 'As Parábolas do Reino',                   subtitulo: 'Discurso parabólico · Semeador ao tesouro' },
  { num: '20', ref: 'Mt 14:1–16:20', titulo: 'Multiplicações, Caminhada e Confissão', subtitulo: 'Narrativa · Revelação progressiva da identidade' },
  { num: '21', ref: 'Mt 16:21–20:34', titulo: 'O Caminho para Jerusalém',             subtitulo: 'Narrativa e discurso · Cruz, comunidade e serviço' },
  { num: '22', ref: 'Mt 21:1–23:39', titulo: 'A Entrada em Jerusalém e Conflitos',    subtitulo: 'Narrativa de conflito · Limpeza do templo e debates' },
  { num: '23', ref: 'Mt 24:1–25:46', titulo: 'O Discurso Escatológico',               subtitulo: 'Discurso · Destruição do templo e parousia' },
  { num: '24', ref: 'Mt 26:1–27:66', titulo: 'A Paixão de Jesus Cristo',              subtitulo: 'Narrativa de paixão · Última ceia ao sepultamento' },
  { num: '25', ref: 'Mt 28:1–20',  titulo: 'A Ressurreição e a Grande Comissão',      subtitulo: 'Narrativa de culminação · Enviados a todas as nações' },
];

export default function MateusSecoesPage() {
  return (
    <div className="min-h-screen bg-bg-deep">
      <Navbar />

      <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">

        {/* Back */}
        <Link
          to="/livros"
          className="inline-flex items-center gap-2 text-white/30 hover:text-white/70 text-xs font-bold uppercase tracking-widest mb-10 transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Livros
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-start gap-5">
            <div className="p-3 rounded-2xl border border-brand-blue/30 bg-brand-blue/[0.06] shrink-0">
              <BookOpen className="w-7 h-7 text-brand-blue" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-display text-[8px] tracking-[0.45em] text-brand-blue/60 uppercase mb-2">
                Novo Testamento · Evangelho
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-3">
                Mateus
              </h1>
              <p className="text-white/35 text-sm max-w-xl leading-relaxed">
                25 seções exegéticas com diagramas expositivos cada — estrutura literária, quiasmas e análise hermenêutica completa do Evangelho de Mateus.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <span className="px-3 py-1 rounded-full border border-brand-blue/20 bg-brand-blue/[0.05] text-brand-blue/70 text-[9px] font-display tracking-widest uppercase">
                  28 capítulos
                </span>
                <span className="px-3 py-1 rounded-full border border-white/[0.07] bg-white/[0.02] text-white/30 text-[9px] font-display tracking-widest uppercase">
                  25 seções
                </span>
                <span className="px-3 py-1 rounded-full border border-white/[0.07] bg-white/[0.02] text-white/30 text-[9px] font-display tracking-widest uppercase">
                  575 diagramas
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Divisor */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="font-display text-[8px] tracking-[0.4em] text-brand-blue/50 uppercase">
            Selecione uma Seção
          </span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>

        {/* Seções */}
        <div className="space-y-2">
          {SECOES.map((secao, i) => (
            <motion.div
              key={secao.num}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + i * 0.03, duration: 0.4 }}
            >
              {secao.enabled ? (
                <Link to="/ebook/mateus">
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    className="group flex items-center gap-4 px-5 py-4 rounded-2xl border border-brand-blue/30 bg-brand-blue/[0.04] hover:bg-brand-blue/[0.08] hover:border-brand-blue/60 transition-all duration-200 cursor-pointer shadow-[0_0_16px_rgba(0,212,255,0.06)] hover:shadow-[0_0_24px_rgba(0,212,255,0.12)]"
                  >
                    <span className="font-display text-brand-blue text-lg font-black min-w-[2.5rem] shrink-0">
                      {secao.num}
                    </span>
                    <div className="h-8 w-px bg-brand-blue/20 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display text-xs text-brand-blue/60 uppercase tracking-wider font-black">
                          {secao.ref}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue/50 text-[8px] font-display tracking-widest uppercase">
                          disponível
                        </span>
                      </div>
                      <p className="text-white font-bold text-sm mt-0.5 group-hover:text-brand-blue transition-colors duration-200">
                        {secao.titulo}
                      </p>
                      <p className="text-white/30 text-[10px] mt-0.5 font-mono tracking-wide">
                        {secao.subtitulo}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-white/20 text-xs font-display tracking-widest uppercase">diagramas</span>
                      <ChevronLeft className="w-3.5 h-3.5 text-brand-blue/50 rotate-180 group-hover:text-brand-blue transition-colors" />
                    </div>
                  </motion.div>
                </Link>
              ) : (
                <div className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-white/[0.05] bg-white/[0.015] cursor-not-allowed opacity-60">
                  <span className="font-display text-white/20 text-lg font-black min-w-[2.5rem] shrink-0">
                    {secao.num}
                  </span>
                  <div className="h-8 w-px bg-white/[0.06] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display text-xs text-white/25 uppercase tracking-wider font-black">
                        {secao.ref}
                      </span>
                    </div>
                    <p className="text-white/30 font-bold text-sm mt-0.5">{secao.titulo}</p>
                    <p className="text-white/15 text-[10px] mt-0.5 font-mono tracking-wide">{secao.subtitulo}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Lock className="w-3 h-3 text-white/15" />
                    <span className="text-white/15 text-xs font-display tracking-widest uppercase hidden sm:block">em breve</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center text-white/15 text-xs mt-12 tracking-widest uppercase"
        >
          Novas seções em breve · Κατὰ Μαθθαῖον
        </motion.p>

      </div>
    </div>
  );
}
