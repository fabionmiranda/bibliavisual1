import { MessageCircle, Mail, Globe, BookOpen, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-bg-deep border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  BÍBLIA VISUAL <span className="text-brand-blue">EXPOSITIVA</span>
                </span>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              Uma nova era no estudo bíblico. Exegese visual, profunda e cristocêntrica para líderes, pastores e estudantes da Palavra.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="font-display font-bold text-lg text-brand-purple">CONTATO</h4>
            <div className="space-y-4">
              <p className="text-white/80 font-medium">Prof. Dr. Fabio N. Miranda</p>
              <p className="text-white/80 text-sm">Teologia e Tecnologias</p>
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
            <h4 className="font-display font-bold text-lg text-brand-rose">MÉTODO</h4>
            <ul className="space-y-3 text-white/80">
              <li>Mapa do Texto</li>
              <li>Análise Hebraica/Grega</li>
              <li>Perguntas Exegéticas</li>
              <li>Estrutura Sintática</li>
              <li>Aplicação Cristocêntrica</li>
              <li>Diagrama Integrado</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Biblia Visual Expositiva. Todos os direitos reservados.</p>
          <p className="mt-2 text-[10px] text-white/30 uppercase tracking-[0.2em] font-mono">Versão 1.0.0</p>
        </div>
      </div>
    </footer>
  );
}
