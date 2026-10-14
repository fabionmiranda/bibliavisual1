import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, ChevronRight, Lock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ACCENT = '#f97316';

interface Heroi {
  nome: string;
  referencia: string;
  descricao: string;
  versiculoChave: string;
  disponivel: boolean;
  ordem: number;
}

const HEROIS: Heroi[] = [
  {
    ordem: 1,
    nome: 'Abraão',
    referencia: 'Gênesis 12–25',
    descricao: 'O pai da fé — chamado a sair sem saber para onde ia, prometido um filho impossível, testado até o limite.',
    versiculoChave: 'Pela fé, Abraão obedeceu quando foi chamado a sair para um lugar que havia de receber por herança. (Hb 11.8)',
    disponivel: false,
  },
  {
    ordem: 2,
    nome: 'Moisés',
    referencia: 'Êxodo 1–Deuteronômio 34',
    descricao: 'Do palácio do faraó ao deserto — o homem mais manso da terra conduziu um povo impossível por quarenta anos.',
    versiculoChave: 'Pela fé, Moisés, já adulto, recusou ser chamado filho da filha do faraó. (Hb 11.24)',
    disponivel: false,
  },
  {
    ordem: 3,
    nome: 'Raabe',
    referencia: 'Josué 2; 6',
    descricao: 'Uma prostituta de Jericó que reconheceu o Deus de Israel antes que os próprios israelitas cruzassem o Jordão.',
    versiculoChave: 'Pela fé, Raabe, a meretriz, não pereceu com os que foram desobedientes. (Hb 11.31)',
    disponivel: false,
  },
  {
    ordem: 4,
    nome: 'Gideão',
    referencia: 'Juízes 6–8',
    descricao: 'O menor do menor clã — Deus o chamou de "homem valente" enquanto ele se escondia na prensa de vinho.',
    versiculoChave: 'O SENHOR está contigo, homem valente. (Jz 6.12)',
    disponivel: false,
  },
  {
    ordem: 5,
    nome: 'Rute',
    referencia: 'Rute 1–4',
    descricao: 'A moabita que escolheu o povo de Deus na hora em que todo incentivo apontava para o contrário.',
    versiculoChave: 'Para onde tu fordes, irei eu; onde tu pousares, pousarei eu. (Rt 1.16)',
    disponivel: false,
  },
  {
    ordem: 6,
    nome: 'Davi',
    referencia: '1 Samuel 16 – 1 Reis 2',
    descricao: 'O pastor-rei — homem segundo o coração de Deus, que caiu profundamente e se arrependeu ainda mais profundamente.',
    versiculoChave: 'Cria em mim, ó Deus, um coração puro e renova dentro de mim um espírito reto. (Sl 51.10)',
    disponivel: false,
  },
  {
    ordem: 7,
    nome: 'Elias',
    referencia: '1 Reis 17–19; 2 Reis 2',
    descricao: 'O profeta de fogo que venceu os profetas de Baal no Carmelo e colapsou de exaustão sob uma árvore no dia seguinte.',
    versiculoChave: 'Já basta, SENHOR! Toma a minha alma. (1 Rs 19.4)',
    disponivel: false,
  },
  {
    ordem: 8,
    nome: 'Ester',
    referencia: 'Ester 1–10',
    descricao: 'A rainha que arriscou a vida para salvar seu povo — "para tal momento como este."',
    versiculoChave: 'Quem sabe se para uma ocasião como esta chegaste ao reino? (Et 4.14)',
    disponivel: false,
  },
  {
    ordem: 9,
    nome: 'Jó',
    referencia: 'Jó 1–42',
    descricao: 'O homem que perdeu tudo e não recebeu explicações — mas encontrou Deus no turbilhão.',
    versiculoChave: 'Eu sei que o meu Redentor vive. (Jó 19.25)',
    disponivel: false,
  },
  {
    ordem: 10,
    nome: 'Daniel',
    referencia: 'Daniel 1–6',
    descricao: 'Fidelidade em terra estrangeira — da recusa da comida real ao coval dos leões, Daniel não negociou o essencial.',
    versiculoChave: 'O meu Deus enviou o seu anjo e fechou a boca dos leões. (Dn 6.22)',
    disponivel: false,
  },
];

export default function HeroisDaFePage() {
  return (
    <div className="min-h-screen relative">
      <Navbar />

      <section className="relative pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${ACCENT}0a 0%, transparent 68%)`, filter: 'blur(48px)' }} />

        <div className="max-w-5xl mx-auto">

          {/* back */}
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link to="/biblioteca"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-xs font-bold uppercase tracking-widest mb-10 transition-colors duration-200">
              <ArrowLeft className="w-3.5 h-3.5" />
              Biblioteca
            </Link>
          </motion.div>

          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="mb-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: ACCENT }} />
              <p className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color: ACCENT }}>
                Estudos Bíblicos
              </p>
            </div>
            <div className="flex items-center gap-5 mb-5">
              <div className="p-4 rounded-2xl shrink-0" style={{ background: `${ACCENT}18`, border: `1.5px solid ${ACCENT}38` }}>
                <Shield className="w-8 h-8" style={{ color: ACCENT }} strokeWidth={1.5} />
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1]">
                Heróis da Fé
              </h1>
            </div>
            <p className="text-white/45 text-base sm:text-lg max-w-2xl leading-relaxed mb-4">
              Uma série de estudos sobre personagens bíblicos — suas vidas, suas falhas, sua fé e o Deus que os chamou, sustentou e transformou.
            </p>
            <p className="text-sm font-semibold" style={{ color: `${ACCENT}99` }}>
              Baseado em Hebreus 11 — a galeria dos heróis da fé.
            </p>
          </motion.div>

          {/* banner em construção */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-6 mb-14 flex items-center gap-4"
            style={{ background: `${ACCENT}10`, border: `1.5px solid ${ACCENT}28` }}
          >
            <Lock className="w-5 h-5 shrink-0" style={{ color: ACCENT }} />
            <p className="text-white/60 text-sm leading-relaxed">
              Esta série está em produção. Os estudos serão liberados progressivamente — acompanhe as atualizações.
            </p>
          </motion.div>

          {/* grid de heróis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HEROIS.map((heroi, i) => (
              <motion.div
                key={heroi.ordem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.06 }}
              >
                <div
                  className="relative rounded-2xl overflow-hidden flex flex-col"
                  style={{
                    background: heroi.disponivel
                      ? 'linear-gradient(145deg,#1a0a00,#0d0600)'
                      : 'rgba(255,255,255,0.03)',
                    border: heroi.disponivel
                      ? `1.5px solid ${ACCENT}40`
                      : '1px solid rgba(255,255,255,0.07)',
                    opacity: heroi.disponivel ? 1 : 0.75,
                  }}
                >
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    {/* header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: `${ACCENT}88` }}>
                            #{heroi.ordem.toString().padStart(2, '0')}
                          </span>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">
                            {heroi.referencia}
                          </span>
                        </div>
                        <h3 className="text-white font-black text-xl leading-none">{heroi.nome}</h3>
                      </div>
                      {!heroi.disponivel && (
                        <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full shrink-0 mt-1"
                          style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
                          Em breve
                        </span>
                      )}
                    </div>

                    {/* descricao */}
                    <p className="text-white/50 text-xs leading-relaxed">{heroi.descricao}</p>

                    {/* versiculo */}
                    <p className="text-[11px] leading-relaxed font-medium italic border-l-2 pl-3"
                      style={{ color: `${ACCENT}80`, borderColor: `${ACCENT}40` }}>
                      {heroi.versiculoChave}
                    </p>

                    {/* cta */}
                    {heroi.disponivel ? (
                      <div className="flex items-center gap-1 mt-2 pt-3" style={{ borderTop: `1px solid ${ACCENT}20` }}>
                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: ACCENT }}>Estudar</span>
                        <ChevronRight className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 mt-2 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <Lock className="w-3 h-3 text-white/20" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Em produção</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
