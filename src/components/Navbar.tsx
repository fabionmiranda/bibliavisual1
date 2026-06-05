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

  const navLinks = [
    { name: 'Home',      path: '/' },
    { name: 'Diagramas', path: '/metodo' },
    { name: 'Tutoriais', path: '/tutoriais' },
  ];

  const close = () => setIsOpen(false);

  const linkClass = (path: string) => cn(
    'relative text-xs lg:text-sm font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 group',
    location.pathname === path
      ? 'text-brand-blue'
      : 'text-white/70 hover:text-white'
  );

  const activeLine = (path: string) =>
    location.pathname === path
      ? 'absolute -bottom-1 left-0 right-0 h-px bg-brand-blue rounded-full'
      : 'absolute -bottom-1 left-0 right-0 h-px bg-brand-blue rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left';

  const isLibrariaActive = ['/livraria', '/ebook/mateus'].some(p => location.pathname.startsWith(p));


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/[0.08]"
      style={{ backdropFilter: 'blur(20px)', background: 'rgba(5,7,20,0.85)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" onClick={close} className="flex items-center gap-3 group shrink-0">
            <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <motion.div
                className="absolute -inset-1.5 bg-brand-blue/40 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                animate={{ opacity: [0, 0.4, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative p-2.5 bg-bg-deep border border-brand-blue/30 rounded-xl group-hover:border-brand-blue/60 transition-all duration-300 shadow-2xl">
                <div className="relative">
                  <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                    <BookOpen className="w-6 h-6 text-brand-blue" strokeWidth={1.5} />
                  </motion.div>
                  <motion.div className="absolute -bottom-1 -right-1 p-0.5 bg-bg-deep rounded-md" animate={{ y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                    <Share2 className="w-3 h-3 text-brand-rose" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-display font-black text-base md:text-lg tracking-tight text-white uppercase leading-none">
                BIBLIA VISUAL <span className="text-brand-blue">EXPOSITIVA</span>
              </span>
              <span className="text-[8px] text-white/35 font-bold tracking-[0.3em] uppercase mt-0.5 hidden sm:block">
                O Futuro da Exposição Bíblica Visual
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">

            {navLinks.map(link => (
              <Link key={link.name} to={link.path} className={linkClass(link.path)} style={{ padding: '0.4rem 0.75rem' }}>
                {link.name}
                <span className={activeLine(link.path)} />
              </Link>
            ))}

            {/* Livraria */}
            <Link to="/livraria" className={cn('relative text-xs lg:text-sm font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 group', isLibrariaActive ? 'text-brand-blue' : 'text-white/70 hover:text-white')} style={{ padding: '0.4rem 0.75rem' }}>
              Livraria
              <span className={activeLine('/livraria')} />
            </Link>

            {/* Contatos */}
            <button
              onClick={scrollToFooter}
              className="relative text-xs lg:text-sm font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 group text-white/70 hover:text-white"
              style={{ padding: '0.4rem 0.75rem' }}
            >
              Contatos
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-brand-blue rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
            </button>

            {/* Admin */}
            <Link
              to="/admin"
              className={cn(
                'relative text-xs lg:text-sm font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 group',
                location.pathname === '/admin' ? 'text-brand-rose' : 'text-white/40 hover:text-white/70'
              )}
              style={{ padding: '0.4rem 0.75rem' }}
            >
              Admin
              <span className={cn('absolute -bottom-1 left-0 right-0 h-px rounded-full', location.pathname === '/admin' ? 'bg-brand-rose' : 'bg-brand-rose scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left')} />
            </Link>

            <div className="w-px h-5 bg-white/10 mx-2" />

            {/* Clube */}
            <motion.a
              href="https://chat.whatsapp.com/HEIIFYAmLij62M0jRwwVhH"
              target="_blank" rel="noopener noreferrer"
              animate={{ opacity: [0.85, 1, 0.85], scale: [1, 1.02, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden xl:flex items-center px-4 py-2 border border-brand-blue/50 text-brand-blue font-black text-xs rounded-full hover:bg-brand-blue/10 transition-all active:scale-95 tracking-widest uppercase whitespace-nowrap"
            >
              Clube
            </motion.a>

            {/* Acessar */}
            <Link
              to="/biblioteca"
              className="flex items-center px-5 py-2 bg-brand-blue text-bg-deep font-black text-xs rounded-full hover:bg-white transition-all active:scale-95 tracking-widest uppercase whitespace-nowrap shadow-lg shadow-brand-blue/25"
            >
              Acessar
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-xl border border-white/10 text-white hover:border-brand-blue/50 transition-all"
            onClick={() => setIsOpen(v => !v)}
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
            className="md:hidden absolute top-20 left-0 right-0 border-t border-white/[0.08]"
            style={{ background: 'rgba(5,7,20,0.97)', backdropFilter: 'blur(24px)' }}
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">

              {navLinks.map((link, i) => (
                <motion.div key={link.name} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <Link
                    to={link.path} onClick={close}
                    className={cn(
                      'flex items-center justify-between w-full px-4 py-3.5 rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-200',
                      location.pathname === link.path
                        ? 'text-brand-blue bg-brand-blue/10 border border-brand-blue/25'
                        : 'text-white/75 hover:text-white hover:bg-white/[0.04] border border-transparent'
                    )}
                  >
                    {link.name}
                    {location.pathname === link.path && <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />}
                  </Link>
                </motion.div>
              ))}

              {/* Livraria mobile */}
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}>
                <Link
                  to="/livraria" onClick={close}
                  className={cn(
                    'flex items-center justify-between w-full px-4 py-3.5 rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-200',
                    isLibrariaActive
                      ? 'text-brand-blue bg-brand-blue/10 border border-brand-blue/25'
                      : 'text-white/75 hover:text-white hover:bg-white/[0.04] border border-transparent'
                  )}
                >
                  Livraria
                  {isLibrariaActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />}
                </Link>
              </motion.div>

              {/* Contatos */}
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }}>
                <button onClick={scrollToFooter} className="flex items-center w-full px-4 py-3.5 rounded-xl font-black uppercase tracking-widest text-sm text-white/75 hover:text-white hover:bg-white/[0.04] border border-transparent transition-all duration-200">
                  Contatos
                </button>
              </motion.div>

              {/* Admin */}
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.24 }}>
                <Link to="/admin" onClick={close} className={cn('flex items-center justify-between w-full px-4 py-3.5 rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-200', location.pathname === '/admin' ? 'text-brand-rose bg-brand-rose/10 border border-brand-rose/25' : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03] border border-transparent')}>
                  Admin
                  {location.pathname === '/admin' && <span className="w-1.5 h-1.5 rounded-full bg-brand-rose" />}
                </Link>
              </motion.div>

              {/* Ações */}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/[0.07]">
                <a href="https://chat.whatsapp.com/HEIIFYAmLij62M0jRwwVhH" target="_blank" rel="noopener noreferrer" onClick={close} className="w-full py-3.5 border border-brand-blue/40 text-brand-blue font-black rounded-2xl text-center uppercase tracking-widest text-sm">
                  Unir-se ao Clube
                </a>
                <Link to="/biblioteca" onClick={close} className="w-full py-3.5 bg-brand-blue text-bg-deep font-black rounded-2xl text-center uppercase tracking-widest text-sm shadow-lg shadow-brand-blue/20">
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
