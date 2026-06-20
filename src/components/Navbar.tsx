import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Share2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToFooter = () => {
    setIsOpen(false);
    const doScroll = () => {
      const el = document.getElementById('footer');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(doScroll, 350);
    } else {
      doScroll();
    }
  };

  const close = () => setIsOpen(false);

  const isActive = (path: string) => location.pathname === path;
  const isLibrariaActive = ['/livraria', '/ebook/mateus'].some(p => location.pathname.startsWith(p));

  const linkCls = (active: boolean) => cn(
    'relative text-[10px] xl:text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 group px-2 py-1.5 xl:px-2.5',
    active ? 'text-brand-blue' : 'text-white/70 hover:text-white'
  );

  const underline = (active: boolean, color = 'bg-brand-blue') =>
    active
      ? `absolute -bottom-0.5 left-0 right-0 h-px ${color} rounded-full`
      : `absolute -bottom-0.5 left-0 right-0 h-px ${color} rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left`;

  // Nav links ordered and grouped
  const mainLinks = [
    { name: 'Home',       path: '/' },
    { name: 'Diagramas', path: '/metodo' },
    { name: 'Tutoriais', path: '/tutoriais' },
    { name: 'Devocional',path: '/devocional' },
    { name: 'Educação',  path: '/educacao' },
    { name: 'Livraria',  path: '/livraria', activeOverride: isLibrariaActive },
  ];

  const mobileLinks = [
    ...mainLinks.map((l, i) => ({ ...l, delay: i * 0.05 })),
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08]"
      style={{ backdropFilter: 'blur(20px)', background: 'rgba(5,7,20,0.90)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px] lg:h-20">

          {/* Logo */}
          <Link to="/" onClick={close} className="flex items-center gap-2.5 group shrink-0">
            <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <motion.div
                className="absolute -inset-1.5 bg-brand-blue/40 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                animate={{ opacity: [0, 0.4, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative p-2 bg-bg-deep border border-brand-blue/30 rounded-xl group-hover:border-brand-blue/60 transition-all duration-300 shadow-2xl">
                <div className="relative">
                  <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                    <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-brand-blue" strokeWidth={1.5} />
                  </motion.div>
                  <motion.div className="absolute -bottom-1 -right-1 p-0.5 bg-bg-deep rounded-md" animate={{ y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                    <Share2 className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-brand-rose" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-display font-black text-sm lg:text-base xl:text-lg tracking-tight text-white uppercase leading-none">
                BIBLIA VISUAL <span className="text-brand-blue">EXPOSITIVA</span>
              </span>
              <span className="text-[7px] lg:text-[8px] text-white/35 font-bold tracking-[0.3em] uppercase mt-0.5 hidden sm:block">
                O Futuro da Exposição Bíblica Visual
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0 lg:gap-0.5">

            {/* Main links */}
            {mainLinks.map(link => {
              const active = link.activeOverride ?? isActive(link.path);
              return (
                <Link key={link.name} to={link.path} className={linkCls(active)}>
                  {link.name}
                  <span className={underline(active)} />
                </Link>
              );
            })}

            {/* Separator */}
            <div className="w-px h-4 bg-white/10 mx-1 lg:mx-1.5 shrink-0" />

            {/* Contatos */}
            <button
              onClick={scrollToFooter}
              className="relative text-[10px] xl:text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 group text-white/70 hover:text-white px-2 py-1.5 xl:px-2.5"
            >
              Contatos
              <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-brand-blue rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
            </button>

            {/* Admin — subtle */}
            <Link
              to="/admin"
              className={cn(
                'relative text-[9px] xl:text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 group px-2 py-1.5',
                isActive('/admin') ? 'text-brand-rose' : 'text-white/25 hover:text-white/50'
              )}
            >
              Admin
              <span className={underline(isActive('/admin'), 'bg-brand-rose')} />
            </Link>

            <div className="w-px h-4 bg-white/10 mx-1 lg:mx-1.5 shrink-0" />

            {/* Clube */}
            <motion.a
              href="https://chat.whatsapp.com/HEIIFYAmLij62M0jRwwVhH"
              target="_blank" rel="noopener noreferrer"
              animate={{ opacity: [0.85, 1, 0.85], scale: [1, 1.02, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden xl:flex items-center px-3 py-1.5 border border-brand-blue/50 text-brand-blue font-black text-[9px] rounded-full hover:bg-brand-blue/10 transition-all active:scale-95 tracking-widest uppercase whitespace-nowrap"
            >
              Clube
            </motion.a>

            {/* Acessar */}
            <Link
              to="/biblioteca"
              className="flex items-center px-3.5 py-1.5 xl:px-4 xl:py-2 bg-brand-blue text-bg-deep font-black text-[9px] xl:text-[10px] rounded-full hover:bg-white transition-all active:scale-95 tracking-widest uppercase whitespace-nowrap shadow-lg shadow-brand-blue/25 ml-1"
            >
              Acessar
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-xl border border-white/10 text-white hover:border-brand-blue/50 transition-all"
            onClick={() => setIsOpen(v => !v)}
            aria-label="Menu"
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

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-[68px] left-0 right-0 border-t border-white/[0.08]"
            style={{ background: 'rgba(5,7,20,0.97)', backdropFilter: 'blur(24px)' }}
          >
            <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-1.5">

              {/* Main links — 2-col grid */}
              <div className="grid grid-cols-2 gap-1.5">
                {mobileLinks.map(link => {
                  const active = (link as any).activeOverride ?? isActive(link.path);
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: link.delay }}
                    >
                      <Link
                        to={link.path} onClick={close}
                        className={cn(
                          'flex items-center justify-between w-full px-3.5 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all duration-200',
                          active
                            ? 'text-brand-blue bg-brand-blue/10 border border-brand-blue/25'
                            : 'text-white/75 hover:text-white hover:bg-white/[0.04] border border-transparent'
                        )}
                      >
                        {link.name}
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Contatos + Admin */}
              <div className="grid grid-cols-2 gap-1.5 mt-1">
                <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.30 }}>
                  <button
                    onClick={scrollToFooter}
                    className="flex items-center w-full px-3.5 py-3 rounded-xl font-black uppercase tracking-widest text-xs text-white/75 hover:text-white hover:bg-white/[0.04] border border-transparent transition-all duration-200"
                  >
                    Contatos
                  </button>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                  <Link
                    to="/admin" onClick={close}
                    className={cn(
                      'flex items-center justify-between w-full px-3.5 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all duration-200',
                      isActive('/admin')
                        ? 'text-brand-rose bg-brand-rose/10 border border-brand-rose/25'
                        : 'text-white/30 hover:text-white/60 hover:bg-white/[0.03] border border-transparent'
                    )}
                  >
                    Admin
                    {isActive('/admin') && <span className="w-1.5 h-1.5 rounded-full bg-brand-rose shrink-0" />}
                  </Link>
                </motion.div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-2.5 mt-3 pt-4 border-t border-white/[0.07]">
                <a
                  href="https://chat.whatsapp.com/HEIIFYAmLij62M0jRwwVhH"
                  target="_blank" rel="noopener noreferrer"
                  onClick={close}
                  className="w-full py-3 border border-brand-blue/40 text-brand-blue font-black rounded-2xl text-center uppercase tracking-widest text-xs"
                >
                  Unir-se ao Clube
                </a>
                <Link
                  to="/biblioteca" onClick={close}
                  className="w-full py-3 bg-brand-blue text-bg-deep font-black rounded-2xl text-center uppercase tracking-widest text-xs shadow-lg shadow-brand-blue/20"
                >
                  Acessar
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
