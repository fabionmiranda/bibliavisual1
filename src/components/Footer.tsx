import { MessageCircle, Mail, Globe, BookOpen, Share2, Gift, Library, Users, Languages, Cpu, Cross } from 'lucide-react';

// Apresentação do projeto missionário — primeira coisa vista ao clicar em "Contatos"
function MissaoProjeto({ pt }: { pt: boolean }) {
  const missao = pt ? [
    { icone: BookOpen,  t: 'Democratizar o conhecimento bíblico',      d: 'Estudo profundo e fiel às Escrituras ao alcance de todos.' },
    { icone: Library,   t: 'Recursos exegéticos gratuitos',            d: 'Diagramas, estudos, devocionais e materiais sem custo.' },
    { icone: Users,     t: 'Capacitar líderes, professores e famílias', d: 'Ferramentas para ensinar e viver a Palavra.' },
    { icone: Languages, t: 'A Palavra a povos e idiomas',              d: 'Levar a Escritura a diferentes culturas e línguas.' },
  ] : [
    { icone: BookOpen,  t: 'Democratize biblical knowledge',           d: 'Deep, faithful Bible study within everyone’s reach.' },
    { icone: Library,   t: 'Free exegetical resources',                d: 'Diagrams, studies, devotionals and materials at no cost.' },
    { icone: Users,     t: 'Equip leaders, teachers and families',     d: 'Tools to teach and live the Word.' },
    { icone: Languages, t: 'The Word to peoples and languages',        d: 'Bringing Scripture to different cultures and tongues.' },
  ];

  return (
    <section
      aria-labelledby="missao-titulo"
      className="relative overflow-hidden rounded-3xl border border-white/10 mb-20 px-5 py-10 sm:px-10 sm:py-14"
      style={{ background: 'linear-gradient(145deg, rgba(0,212,255,0.08) 0%, rgba(168,85,247,0.07) 50%, rgba(255,45,85,0.06) 100%)' }}
    >
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-blue/20 blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-brand-purple/20 blur-[90px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] text-emerald-300 bg-emerald-400/10 border border-emerald-400/30 mb-5">
          <Gift className="w-4 h-4" /> {pt ? '100% gratuito' : '100% free'}
        </span>
        <h3 id="missao-titulo" className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-5">
          {pt ? <>Um projeto <span className="text-brand-blue">missionário global</span></> : <>A <span className="text-brand-blue">global missionary</span> project</>}
        </h3>
        <p className="text-white/90 text-lg sm:text-xl leading-relaxed mb-5">
          {pt
            ? <>Uma iniciativa para levar <strong className="text-white">conhecimento bíblico profundo e fiel às Escrituras</strong> a pessoas, famílias, igrejas, pastores, líderes e estudantes da Palavra <strong className="text-white">em todo o mundo</strong>.</>
            : <>An initiative to bring <strong className="text-white">deep biblical knowledge, faithful to Scripture</strong>, to people, families, churches, pastors, leaders and students of the Word <strong className="text-white">around the world</strong>.</>}
        </p>
        <p className="inline-flex items-start sm:items-center gap-3 text-left text-white/80 text-base sm:text-lg leading-relaxed rounded-2xl px-4 py-3 bg-white/[0.04] border border-white/10">
          <Cpu className="w-5 h-5 shrink-0 mt-1 sm:mt-0 text-brand-purple" />
          <span>
            {pt
              ? <>Utilizamos <span className="text-brand-purple font-bold">tecnologia</span>, <span className="text-brand-purple font-bold">inteligência artificial</span> e <span className="text-brand-purple font-bold">diagramas visuais</span> para tornar a leitura, a interpretação e a aplicação da Bíblia mais acessíveis.</>
              : <>We use <span className="text-brand-purple font-bold">technology</span>, <span className="text-brand-purple font-bold">artificial intelligence</span> and <span className="text-brand-purple font-bold">visual diagrams</span> to make reading, interpreting and applying the Bible more accessible.</>}
          </span>
        </p>
      </div>

      {/* Nossa missão */}
      <div className="relative max-w-5xl mx-auto mt-10">
        <p className="text-center text-sm font-black uppercase tracking-[0.3em] text-brand-blue mb-5">📖 {pt ? 'Nossa missão' : 'Our mission'}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {missao.map((m, i) => {
            const Icone = m.icone;
            return (
              <div key={m.t} className="rounded-2xl p-5 bg-bg-deep/60 border border-white/10 hover:border-brand-blue/40 transition-colors text-left">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand-blue/10 border border-brand-blue/30">
                    <Icone className="w-5 h-5 text-brand-blue" />
                  </span>
                  <span className="text-2xl font-black text-white/20">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="text-white font-black text-lg leading-snug mb-1.5">{m.t}</p>
                <p className="text-white/70 text-sm leading-relaxed">{m.d}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 100% gratuito */}
      <div className="relative max-w-3xl mx-auto mt-10 rounded-2xl px-5 py-6 sm:px-8 text-center bg-emerald-400/[0.07] border border-emerald-400/25">
        <p className="font-display font-black text-xl sm:text-2xl text-white mb-2">
          🎁 {pt ? 'Plataforma e recursos' : 'Platform and resources'} <span className="text-emerald-300">{pt ? '100% GRATUITOS' : '100% FREE'}</span>
        </p>
        <p className="text-white/85 text-base sm:text-lg leading-relaxed">
          {pt
            ? 'Não queremos que barreiras financeiras impeçam o acesso ao conhecimento das Escrituras.'
            : 'We don’t want financial barriers to keep anyone from knowing the Scriptures.'}
        </p>
      </div>

      {/* Lema */}
      <div className="relative mt-10 flex flex-col items-center gap-3 text-center">
        <Cross className="w-7 h-7 text-brand-rose" />
        <p className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-wide">
          {pt ? 'Bíblia Visual Expositiva' : 'Visual Expository Bible'}
        </p>
        <p className="text-white/80 text-base sm:text-lg">
          {pt ? 'Tecnologia a serviço da missão.' : 'Technology in service of the mission.'}{' '}
          <span className="text-brand-blue font-bold">{pt ? 'A Palavra no centro.' : 'The Word at the center.'}</span>{' '}
          <span className="text-brand-rose font-bold">{pt ? 'Cristo como fundamento.' : 'Christ as the foundation.'}</span>
        </p>
      </div>
    </section>
  );
}

export default function Footer({ lang = 'pt' }: { lang?: 'pt' | 'en' }) {
  const pt = lang === 'pt';
  return (
    <footer id="footer" className="bg-bg-deep border-t border-white/5 pt-20 pb-10" style={{ paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MissaoProjeto pt={pt} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-bg-deep border border-brand-blue/30 rounded-xl relative">
                  <BookOpen className="w-8 h-8 text-brand-blue" />
                  <div className="absolute -bottom-1 -right-1 p-0.5 bg-bg-deep rounded-md">
                    <Share2 className="w-4 h-4 text-brand-rose" />
                  </div>
                </div>
                <span className="font-display font-black text-2xl tracking-tight text-white uppercase">
                  {pt ? 'BÍBLIA VISUAL' : 'VISUAL'} <span className="text-brand-blue">{pt ? 'EXPOSITIVA' : 'EXPOSITORY BIBLE'}</span>
                </span>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              {pt
                ? 'Uma nova era no estudo bíblico. Exegese visual, profunda e cristocêntrica para líderes, pastores e estudantes da Palavra.'
                : 'A new era in biblical study. Visual, deep, and Christocentric exegesis for leaders, pastors, and students of the Word.'}
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="font-display font-bold text-lg text-brand-purple">{pt ? 'CONTATO' : 'CONTACT'}</h4>
            <div className="space-y-4">
              <p className="text-white/80 font-medium">Prof. Dr. Fabio N. Miranda</p>
              <p className="text-white/80 text-sm">{pt ? 'Teologia e Tecnologias' : 'Theology & Technology'}</p>
              <div className="flex flex-col gap-3">
                <a href="https://wa.me/5535997567535" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 hover:text-brand-blue transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp: (35) 99756-7535</span>
                </a>
                <a href="mailto:contato@fabionmiranda.com" className="flex items-center gap-3 text-white/80 hover:text-brand-blue transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>contato@fabionmiranda.com</span>
                </a>
                <a href="https://bibliavisual.fabionmiranda.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 hover:text-brand-blue transition-colors">
                  <Globe className="w-5 h-5" />
                  <span>bibliavisual.fabionmiranda.com</span>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-display font-bold text-lg text-brand-rose">{pt ? 'MÉTODO' : 'METHOD'}</h4>
            <ul className="space-y-3 text-white/80">
              {pt ? <>
                <li>Mapa do Texto</li>
                <li>Análise Hebraica/Grega</li>
                <li>Perguntas Exegéticas</li>
                <li>Estrutura Sintática</li>
                <li>Aplicação Cristocêntrica</li>
                <li>Diagrama Integrado</li>
              </> : <>
                <li>Text Mapping</li>
                <li>Hebrew/Greek Analysis</li>
                <li>Exegetical Questions</li>
                <li>Syntactic Structure</li>
                <li>Christocentric Application</li>
                <li>Integrated Diagram</li>
              </>}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Biblia Visual Expositiva. {pt ? 'Todos os direitos reservados.' : 'All rights reserved.'}</p>
          <p className="mt-2 text-[10px] text-white/30 uppercase tracking-[0.2em] font-mono">{pt ? 'Versão' : 'Version'} 1.0.0</p>
        </div>
      </div>
    </footer>
  );
}
