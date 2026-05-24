import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Download, Info, Flame, Shield, Droplets, Users, Heart, Scale, Target, FileDown, Image as ImageIcon, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';
import { Livro } from '../types/bible';

const chiasmDataLeviticus = [
  { 
    id: 'A', 
    title: 'Sacrifícios e Celebrações', 
    chapters: 'Lv 1–7', 
    description: 'Como o pecado é tratado. Tipos de ofertas e instruções para a adoração.', 
    color: 'brand-rose',
    icon: Flame,
  },
  { 
    id: 'B', 
    title: 'O Papel do Sacerdócio', 
    chapters: 'Lv 8–10', 
    description: 'Instituição e consagração do sacerdócio. Mediação entre Deus e o povo.', 
    color: 'brand-blue',
    icon: Users,
  },
  { 
    id: 'C', 
    title: 'Pureza Ritual', 
    chapters: 'Lv 11–15', 
    description: 'Regras de pureza para se aproximar de Deus. Quem pode participar da vida religiosa.', 
    color: 'brand-purple',
    icon: Droplets,
  },
  { 
    id: 'D', 
    title: 'O Dia da Expiação', 
    subtitle: 'Yom Kippur',
    chapters: 'Lv 16', 
    description: 'Purificação total do povo e do santuário diante de Deus. O centro absoluto do livro.', 
    color: 'brand-rose',
    icon: Target,
    center: true
  },
  { 
    id: "C'", 
    title: 'Pureza Moral', 
    chapters: 'Lv 17–20', 
    description: 'Santidade na vida prática. Ética, justiça e relacionamento com o próximo.', 
    color: 'brand-purple',
    icon: Scale,
  },
  { 
    id: "B'", 
    title: 'Santidade Sacerdotal', 
    chapters: 'Lv 21–22', 
    description: 'Exigências de santidade para os mediadores. Pureza e fidelidade do sacerdócio.', 
    color: 'brand-blue',
    icon: Shield,
  },
  { 
    id: "A'", 
    title: 'Vida em Comunhão', 
    chapters: 'Lv 23–27', 
    description: 'Restauração da comunhão com Deus. Festas e celebrações que marcam a vida do povo.', 
    color: 'brand-rose',
    icon: Heart,
  },
];

const bookStructures: Record<string, any[]> = {
  'genesis': [
    { id: '1', title: 'A Criação e a Queda', chapters: 'Gn 1–11', description: 'As origens do universo, da humanidade e a entrada do pecado no mundo.', color: 'brand-blue', icon: BookOpen },
    { id: '2', title: 'Os Patriarcas: Abraão e Isaque', chapters: 'Gn 12–26', description: 'A aliança de Deus com Abraão e a fundação da nation de Israel.', color: 'brand-purple', icon: Users, center: true },
    { id: '3', title: 'Jacó e José no Egito', chapters: 'Gn 27–50', description: 'A providência divina preservando a família da aliança através de José.', color: 'brand-rose', icon: Heart }
  ],
  'exodo': [
    { id: '1', title: 'Libertação do Egito', chapters: 'Ex 1–18', description: 'Deus levanta Moisés e demonstra Sua glória sobre os deuses egípcios.', color: 'brand-blue', icon: Flame },
    { id: '2', title: 'A Lei no Sinai', chapters: 'Ex 19–24', description: 'A entrega dos dez mandamentos e o estabelecimento da aliança.', color: 'brand-purple', icon: Scale, center: true },
    { id: '3', title: 'O Tabernáculo', chapters: 'Ex 25–40', description: 'A habitação de Deus no meio do Seu povo resgatado.', color: 'brand-rose', icon: Shield }
  ],
  'mateus': [
    { id: '1', title: 'O Rei Chegou', chapters: 'Mt 1–4', description: 'Nascimento, genealogia e o início do ministério do Messias.', color: 'brand-blue', icon: Target },
    { id: '2', title: 'O Sermão do Monte', chapters: 'Mt 5–7', description: 'O manifesto do Reino e a ética de Cristo.', color: 'brand-purple', icon: Heart, center: true },
    { id: '3', title: 'Paixão e Ressurreição', chapters: 'Mt 26–28', description: 'A vitória final de Cristo sobre a morte e a Grande Comissão.', color: 'brand-rose', icon: Heart }
  ],
  'salmos': [
    { id: '1', title: 'O Justo e o Perverso', chapters: 'Sl 1–2', description: 'A base da sabedoria e a soberania do Messias sobre as nações.', color: 'brand-blue', icon: Scale },
    { id: '2', title: 'Louvor e Lamento', chapters: 'Sl 3–149', description: 'A expressão máxima da alma humana diante de toda circunstância da vida.', color: 'brand-purple', icon: Users, center: true },
    { id: '3', title: 'O Aleluia Final', chapters: 'Sl 150', description: 'A conclusão de toda a existência: a adoração eterna ao Criador.', color: 'brand-rose', icon: Flame }
  ],
  'joao': [
    { id: '1', title: 'O Verbo se fez Carne', chapters: 'Jo 1–12', description: 'O ministério público de Jesus e os sete sinais que revelam Sua divindade.', color: 'brand-blue', icon: BookOpen },
    { id: '2', title: 'O Discurso da Despedida', chapters: 'Jo 13–17', description: 'Intimidade de Jesus com Seus discípulos antes da crucificação.', color: 'brand-purple', icon: Heart, center: true },
    { id: '3', title: 'Vida e Glória', chapters: 'Jo 18–21', description: 'A cruz como vitória e a restauração da esperança através da ressurreição.', color: 'brand-rose', icon: Target }
  ],
  'apocalipse': [
    { id: '1', title: 'Cristo nas Igrejas', chapters: 'Ap 1–3', description: 'A revelação de Jesus glorificado e as cartas às sete igrejas da Ásia.', color: 'brand-blue', icon: Shield },
    { id: '2', title: 'A Soberania de Deus', chapters: 'Ap 4–20', description: 'O desenrolar do julgamento e a vitória do Cordeiro sobre o mal.', color: 'brand-purple', icon: Flame, center: true },
    { id: '3', title: 'Novos Céus e Nova Terra', chapters: 'Ap 21–22', description: 'A consumação de todas as coisas e a habitação eterna de Deus com o homem.', color: 'brand-rose', icon: Heart }
  ]
};

interface BookInfographicProps {
  livro: Livro;
  isDownloadView?: boolean;
}

export default function BookInfographic({ livro, isDownloadView = false }: BookInfographicProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const downloadAsImage = async () => {
    if (hasStaticImage) {
      const link = document.createElement('a');
      link.download = `infografico-${livro.id}.jpg`;
      link.href = `/infograficos/${livro.id}.jpg`;
      link.click();
      return;
    }

    if (!containerRef.current) return;
    try {
      const { toJpeg } = await import('html-to-image');
      const dataUrl = await toJpeg(containerRef.current, { 
        quality: 1, 
        backgroundColor: '#020617',
        pixelRatio: 2
      });
      const link = document.createElement('a');
      link.download = `infografico-${livro.id}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Erro ao gerar imagem:', err);
    }
  };

  const isLevitico = livro.id === 'levitico';
  const customStructure = bookStructures[livro.id];
  
  const displayData = isLevitico ? chiasmDataLeviticus : (customStructure || [
    { id: 'A', title: 'Estrutura Inicial', chapters: `Cap 1-${Math.floor(livro.capitulos.length / 3)}`, description: 'Contexto histórico e os fundamentos da mensagem deste livro.', color: 'brand-blue', icon: BookOpen },
    { id: 'B', title: 'Foco Central', chapters: `Cap ${Math.floor(livro.capitulos.length / 3) + 1}-${Math.floor(2 * livro.capitulos.length / 3)}`, description: 'O ponto de virada e a revelação central do pensamento divino.', color: 'brand-purple', icon: Target, center: true },
    { id: 'C', title: 'Conclusão Teológica', chapters: `Cap ${Math.floor(2 * livro.capitulos.length / 3) + 1}-${livro.capitulos.length}`, description: 'Resolução das tensões e aplicação para a vida eterna.', color: 'brand-rose', icon: Heart }
  ]);

  const [hasStaticImage, setHasStaticImage] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => setHasStaticImage(true);
    img.onerror = () => setHasStaticImage(false);
    img.src = `/infograficos/${livro.id}.jpg`;
  }, [livro.id]);

  if (!isDownloadView) {
    return (
      <div className="flex items-center gap-4">
        <motion.a
          href="https://wa.me/5535997567535?text=-%20Gostaria%20receber%20o%20inforgrafico%20completo%20-"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0.9 }}
          animate={{ 
            opacity: [0.8, 1, 0.8],
            scale: [0.97, 1.03, 0.97],
            borderColor: [
              "rgba(0, 212, 255, 0.3)",
              "rgba(0, 212, 255, 0.8)",
              "rgba(0, 212, 255, 0.3)"
            ],
            boxShadow: [
              "0 0 10px rgba(0, 212, 255, 0.1)",
              "0 0 25px rgba(0, 212, 255, 0.4)",
              "0 0 10px rgba(0, 212, 255, 0.1)"
            ]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="flex items-center gap-3 px-6 py-3 bg-brand-blue/20 border-2 border-brand-blue/50 rounded-2xl text-white text-[12px] font-black uppercase tracking-[0.25em] hover:bg-brand-blue hover:text-bg-deep transition-colors shadow-2xl relative z-20"
        >
          <Download className="w-5 h-5" />
          baixar infografico
        </motion.a>
        
        {/* Hidden Container for Background Capture - This allows background generation without switching screens */}
        {!hasStaticImage && (
          <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none">
            <div ref={containerRef} className="w-[1200px] bg-slate-950 p-20 rounded-[3rem] border border-white/10 overflow-hidden">
               <div className="text-center space-y-6 mb-16">
                <div className="w-20 h-20 bg-brand-blue/10 rounded-3xl flex items-center justify-center mx-auto border border-brand-blue/20">
                  <BookOpen className="w-10 h-10 text-brand-blue" />
                </div>
                <h1 className="text-5xl font-display font-bold text-white tracking-widest uppercase mb-2">
                  Mapeamento <span className="text-brand-blue">{livro.nome}</span>
                </h1>
                <p className="text-xl text-white/40 font-light tracking-widest uppercase">Estrutura Visual Expositiva</p>
              </div>

              <div className="grid grid-cols-1 gap-12">
                {isLevitico ? (
                  <div className="grid grid-cols-2 gap-16">
                    <div className="space-y-8">
                      {displayData.slice(0, 3).map((item: any) => (
                        <InfographicCard key={item.id} item={item} />
                      ))}
                    </div>
                    <div className="space-y-8 flex flex-col-reverse justify-end">
                      {displayData.slice(4).map((item: any) => (
                        <InfographicCard key={item.id} item={item} isReverse />
                      ))}
                    </div>
                    <div className="col-span-2 flex justify-center py-10">
                      <InfographicCard item={displayData.find((d: any) => d.center)} isCenter />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-12 max-w-4xl mx-auto">
                    {displayData.map((item: any) => (
                      <InfographicCard key={item.id} item={item} isCenter={item.center} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex justify-center mb-8">
        <motion.a
          href="https://wa.me/5535997567535?text=-%20Gostaria%20receber%20o%20inforgrafico%20completo%20-"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-8 py-4 bg-brand-blue text-bg-deep font-black rounded-full shadow-[0_0_30px_rgba(0,212,255,0.4)]"
        >
          <Download className="w-6 h-6" />
          CLIQUE PARA RECEBER NO WHATSAPP
        </motion.a>
      </div>

      {hasStaticImage ? (
        <div className="max-w-5xl mx-auto rounded-2xl md:rounded-[3rem] overflow-hidden shadow-3xl border border-white/10 glass p-2 md:p-4">
          <img 
            src={`/infograficos/${livro.id}.jpg`} 
            alt={`Infográfico de ${livro.nome}`}
            className="w-full h-auto rounded-xl md:rounded-[2.5rem]"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <div className="overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div ref={containerRef} className="w-[1000px] lg:w-[1200px] bg-slate-950 p-10 md:p-20 rounded-3xl md:rounded-[3rem] border border-white/10 shadow-3xl mx-auto overflow-hidden shrink-0">
            <div className="text-center space-y-4 md:space-y-6 mb-12 md:mb-16">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-blue/10 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto border border-brand-blue/20">
                <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-brand-blue" />
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-widest uppercase mb-2">
                Mapeamento <span className="text-brand-blue">{livro.nome}</span>
              </h1>
              <p className="text-base md:text-xl text-white/40 font-light tracking-widest uppercase">Estrutura Visual Expositiva</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:gap-12">
              {isLevitico ? (
                <div className="grid grid-cols-2 gap-8 md:gap-16">
                  <div className="space-y-6 md:space-y-8">
                    {displayData.slice(0, 3).map((item: any) => (
                      <InfographicCard key={item.id} item={item} />
                    ))}
                  </div>
                  <div className="space-y-6 md:space-y-8 flex flex-col-reverse justify-end">
                    {displayData.slice(4).map((item: any) => (
                      <InfographicCard key={item.id} item={item} isReverse />
                    ))}
                  </div>
                  <div className="col-span-2 flex justify-center py-6 md:py-10">
                    <InfographicCard item={displayData.find((d: any) => d.center)} isCenter />
                  </div>
                </div>
              ) : (
                <div className="space-y-8 md:space-y-12 max-w-4xl mx-auto">
                  {displayData.map((item: any) => (
                    <InfographicCard key={item.id} item={item} isCenter={item.center} />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-12 md:mt-20 pt-8 md:pt-10 border-t border-white/5 text-center">
              <p className="text-[8px] md:text-[10px] text-white/20 uppercase font-black tracking-[0.5em] md:tracking-[1em]">Material Exclusivo - Biblia Visual Expositiva</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfographicCard({ item, isReverse = false, isCenter = false }: any) {
  if (!item) return null;
  const Icon = item.icon || BookOpen;

  if (isCenter) {
    return (
      <div className="w-full p-1 rounded-2xl md:rounded-[3rem] bg-gradient-to-br from-brand-rose via-brand-purple to-brand-blue">
        <div className="bg-slate-900 rounded-[1.4rem] md:rounded-[2.9rem] p-6 md:p-12 text-center space-y-4 md:space-y-6">
          <span className="text-2xl md:text-4xl font-black text-brand-rose">{item.id}</span>
          <h3 className="text-xl md:text-4xl font-display font-bold text-white uppercase tracking-tight">{item.title}</h3>
          <div className="text-lg md:text-2xl font-mono font-bold text-white/80">{item.chapters}</div>
          <p className="text-sm md:text-xl text-white/70 leading-relaxed font-medium">{item.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "p-4 md:p-8 glass rounded-2xl md:rounded-[2.5rem] border border-white/20 flex flex-col md:flex-row gap-4 md:gap-8 items-center",
      isReverse ? "md:flex-row-reverse text-center md:text-right" : "text-center md:text-left"
    )}>
      <div className={cn(
        "w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 border-2",
        item.color === 'brand-rose' ? "bg-brand-rose/20 border-brand-rose/30 text-white" :
        item.color === 'brand-blue' ? "bg-brand-blue/20 border-brand-blue/30 text-white" :
        "bg-brand-purple/20 border-brand-purple/30 text-white"
      )}>
        <Icon className="w-6 h-6 md:w-8 md:h-8 shadow-sm" />
      </div>
      <div className="space-y-1 md:space-y-2">
        <div className={cn("flex items-center gap-3 md:gap-4 justify-center", isReverse ? "md:flex-row-reverse" : "md:flex-row")}>
          <span className="text-[10px] md:text-sm font-black text-white/40 uppercase tracking-widest">{item.id}</span>
          <span className="text-[10px] md:text-sm font-mono text-white/60 font-bold">{item.chapters}</span>
        </div>
        <h3 className="text-lg md:text-2xl font-black text-white tracking-tight uppercase italic">{item.title}</h3>
        <p className="text-sm md:text-lg text-white/80 leading-relaxed font-medium">{item.description}</p>
      </div>
    </div>
  );
}
