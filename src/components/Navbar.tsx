import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Share2, Menu, X, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const CLUBE_URL = 'https://chat.whatsapp.com/HEIIFYAmLij62M0jRwwVhH';

// Layout responsivo:
//  • < lg (até 1023px): logo + botão de menu (gaveta)
//  • lg  (1024–1279px): só o ícone da logo + links + Contatos/Admin/Diagramas
//  • xl  (≥ 1280px):    logo completa + links + Contatos/Admin/Diagramas
//  • 2xl (≥ 1536px):    barra mais larga, com o botão Clube
export default function Navbar({
  lang = 'pt',
  onToggleLang,
}: {
  lang?: 'pt' | 'en';
  onToggleLang?: () => void;
}) {
  const pt = lang === 'pt';
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const close = () => setIsOpen(false);

  // Fecha o menu ao trocar de página
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  // Gaveta aberta: trava a rolagem da página e fecha com Esc
  useEffect(() => {
    if (!isOpen) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const scrollToFooter = () => {
    setIsOpen(false);
    const doScroll = () => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(doScroll, 350);
    } else {
      doScroll();
    }
  };

  // Ativo também nas subpáginas (ex.: /devocional/espelhado → Devocional)
  const isActive = (paths: string[]) => paths.some(p => location.pathname === p || location.pathname.startsWith(p + '/'));

  const mainLinks = [
    { name: pt ? 'Devocional' : 'Devotional', path: '/devocional', match: ['/devocional'] },
    { name: pt ? 'Pregação' : 'Preaching',    path: '/pregacao',   match: ['/pregacao'] },
    { name: pt ? 'Família' : 'Family',        path: '/familia',    match: ['/familia'] },
    { name: pt ? 'Educação' : 'Education',    path: '/educacao',   match: ['/educacao'] },
    { name: pt ? 'Teologia' : 'Theology',     path: '/teologia',   match: ['/teologia'] },
    { name: pt ? 'Biblioteca' : 'Library',    path: '/biblioteca', match: ['/biblioteca'] },
    { name: pt ? 'Livraria' : 'Bookstore',    path: '/livraria',   match: ['/livraria', '/ebook/mateus'] },
  ];

  const desktopLink = (active: boolean) => cn(
    'relative font-black uppercase whitespace-nowrap antialiased transition-colors duration-200 group py-2',
    'text-[11px] tracking-[0.08em] px-2 xl:px-2.5',
    active ? 'text-brand-blue' : 'text-white/90 hover:text-brand-blue'
  );

  const underline = (active: boolean) => cn(
    'absolute bottom-0 left-2 right-2 xl:left-2.5 xl:right-2.5 h-[2px] bg-brand-blue rounded-full transition-transform duration-200 origin-left',
    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
  );

  const adminAtivo = isActive(['/admin']);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08]"
      style={{
        backdropFilter: 'blur(20px)',
        background: 'rgba(5,7,20,0.96)',
        paddingTop: 'env(safe-area-inset-top)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 lg:h-[72px]">

          {/* Logo */}
          <Link to="/" onClick={close} className="flex items-center gap-2.5 group shrink-0 min-w-0" aria-label={pt ? 'Bíblia Visual Expositiva — início' : 'Visual Expository Bible — home'}>
            <motion.div className="relative shrink-0" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <motion.div
                className="absolute -inset-1.5 bg-brand-blue/40 blur-md rounded-xl"
                animate={{ opacity: [0, 0.4, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative p-2 bg-bg-deep border border-brand-blue/30 rounded-xl group-hover:border-brand-blue/60 transition-colors duration-300 shadow-2xl">
                <div className="relative">
                  <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                    <BookOpen className="w-5 h-5 xl:w-6 xl:h-6 text-brand-blue" strokeWidth={1.5} />
                  </motion.div>
                  <motion.div className="absolute -bottom-1 -right-1 p-0.5 bg-bg-deep rounded-md" animate={{ y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                    <Share2 className="w-2.5 h-2.5 xl:w-3 xl:h-3 text-brand-rose" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            {/* Nome: visível no celular/tablet (há espaço) e no desktop largo; oculto em lg para caber o menu */}
            <div className="flex flex-col min-w-0 lg:hidden xl:flex">
              <span className="font-display font-black text-[13px] sm:text-sm tracking-tight text-white uppercase leading-none truncate">
                {pt
                  ? <>BÍBLIA VISUAL <span className="text-brand-blue">EXPOSITIVA</span></>
                  : <>VISUAL <span className="text-brand-blue">EXPOSITORY BIBLE</span></>}
              </span>
              <span className="hidden sm:block xl:hidden text-[8px] text-white/60 font-bold tracking-[0.2em] uppercase mt-1 truncate">
                {pt ? 'O Futuro da Exposição Bíblica Visual' : 'The Future of Visual Bible Exposition'}
              </span>
            </div>
          </Link>

          {/* Desktop (≥ 1024px) */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center">
              {mainLinks.map(link => {
                const active = isActive(link.match);
                return (
                  <Link key={link.path} to={link.path} className={desktopLink(active)} aria-current={active ? 'page' : undefined}>
                    {link.name}
                    <span className={underline(active)} />
                  </Link>
                );
              })}
            </div>

            <div className="w-px h-5 bg-white/10 mx-2 xl:mx-3 shrink-0" />

            <button onClick={scrollToFooter} className={desktopLink(false)}>
              {pt ? 'Contatos' : 'Contact'}
              <span className={underline(false)} />
            </button>

            <Link
              to="/admin"
              title="Admin"
              aria-label="Admin"
              className={cn(
                'p-2 rounded-lg transition-colors',
                adminAtivo ? 'text-brand-rose' : 'text-white/55 hover:text-white'
              )}
            >
              <Lock className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-2 ml-2 xl:ml-3">
              <motion.a
                href={CLUBE_URL}
                target="_blank" rel="noopener noreferrer"
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden 2xl:inline-flex items-center px-3.5 py-2 border border-brand-blue/50 text-brand-blue font-black text-[10px] rounded-full hover:bg-brand-blue/10 transition-colors tracking-widest uppercase whitespace-nowrap"
              >
                {pt ? 'Clube' : 'Club'}
              </motion.a>
              <Link
                to="/acessar"
                className="inline-flex items-center px-4 py-2 bg-brand-blue text-bg-deep font-black text-[11px] rounded-full hover:bg-white transition-colors active:scale-95 tracking-widest uppercase whitespace-nowrap shadow-lg shadow-brand-blue/25"
              >
                {pt ? 'Diagramas' : 'Diagrams'}
              </Link>
            </div>
          </div>

          {/* Celular/tablet: atalho Diagramas + botão do menu */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <Link
              to="/acessar"
              className="hidden sm:inline-flex items-center px-3.5 py-2 bg-brand-blue text-bg-deep font-black text-[10px] rounded-full tracking-widest uppercase whitespace-nowrap"
            >
              {pt ? 'Diagramas' : 'Diagrams'}
            </Link>
            <button
              className="p-2.5 rounded-xl border border-white/10 text-white hover:border-brand-blue/50 transition-colors"
              onClick={() => setIsOpen(v => !v)}
              aria-label={isOpen ? (pt ? 'Fechar menu' : 'Close menu') : (pt ? 'Abrir menu' : 'Open menu')}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Gaveta (< 1024px) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 right-0 border-t border-white/[0.08]"
            style={{
              background: 'rgba(5,7,20,0.98)',
              backdropFilter: 'blur(24px)',
              maxHeight: 'calc(100dvh - 64px - env(safe-area-inset-top))',
              overflowY: 'auto',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-5 flex flex-col gap-4">

              {/* Seções */}
              <div>
                <p className="px-1 mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/55">
                  {pt ? 'Seções' : 'Sections'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {mainLinks.map((link, i) => {
                    const active = isActive(link.match);
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.035 }}
                        className={i === mainLinks.length - 1 && mainLinks.length % 2 === 1 ? 'col-span-2' : undefined}
                      >
                        <Link
                          to={link.path} onClick={close}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'flex items-center justify-between w-full px-4 py-3.5 rounded-xl font-black uppercase tracking-widest text-xs transition-colors border',
                            active
                              ? 'text-brand-blue bg-brand-blue/10 border-brand-blue/30'
                              : 'text-white bg-white/[0.05] border-white/[0.12] hover:text-brand-blue hover:border-brand-blue/30'
                          )}
                        >
                          {link.name}
                          {active && <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Ações principais */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 border-t border-white/[0.07]">
                <Link
                  to="/acessar" onClick={close}
                  className="w-full py-3.5 bg-brand-blue text-bg-deep font-black rounded-2xl text-center uppercase tracking-widest text-xs shadow-lg shadow-brand-blue/20"
                >
                  {pt ? 'Diagramas' : 'Diagrams'}
                </Link>
                <a
                  href={CLUBE_URL}
                  target="_blank" rel="noopener noreferrer"
                  onClick={close}
                  className="w-full py-3.5 border border-brand-blue/40 text-brand-blue font-black rounded-2xl text-center uppercase tracking-widest text-xs"
                >
                  {pt ? 'Unir-se ao Clube' : 'Join the Club'}
                </a>
              </div>

              {/* Rodapé da gaveta */}
              <div className="flex items-center justify-between gap-3 px-1">
                <button
                  onClick={scrollToFooter}
                  className="py-2 font-black uppercase tracking-widest text-[11px] text-white/85 hover:text-white transition-colors"
                >
                  {pt ? 'Contatos' : 'Contact'}
                </button>
                {onToggleLang && (
                  <button
                    onClick={onToggleLang}
                    className="py-2 font-black uppercase tracking-widest text-[11px] text-white/85 hover:text-white transition-colors"
                  >
                    {pt ? 'English' : 'Português'}
                  </button>
                )}
                <Link
                  to="/admin" onClick={close}
                  className={cn(
                    'inline-flex items-center gap-1.5 py-2 font-black uppercase tracking-widest text-[11px] transition-colors',
                    adminAtivo ? 'text-brand-rose' : 'text-white/55 hover:text-white'
                  )}
                >
                  <Lock className="w-3 h-3" /> Admin
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
