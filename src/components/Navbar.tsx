import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Share2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home',      path: '/' },
    { name: 'Diagramas', path: '/metodo' },
    { name: 'Tutoriais', path: '/tutoriais' },
    { name: 'Biblioteca', path: '/biblioteca' },
    { name: 'Admin',     path: '/admin' },
  ];

  const close = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">

          {/* Logo */}
          <Link to="/" onClick={close} className="flex items-center gap-3 group shrink-0">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute -inset-1.5 bg-brand-blue/40 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                animate={{ opacity: [0, 0.4, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative p-2.5 bg-bg-deep border border-brand-blue/30 rounded-xl group-hover:border-brand-blue/60 transition-all duration-300 shadow-2xl">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <BookOpen className="w-6 h-6 text-brand-blue" strokeWidth={1.5} />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-1 -right-1 p-0.5 bg-bg-deep rounded-md"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Share2 className="w-3 h-3 text-brand-rose" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg md:text-xl tracking-tight text-white uppercase leading-none">
                BIBLIA VISUAL <span className="text-brand-blue">EXPOSITIVA</span>
              </span>
              <span className="text-[8px] text-white/40 font-bold tracking-[0.3em] uppercase mt-0.5 hidden sm:block">
                Metodo Expositivo Visual
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
            <div className="flex items-center gap-4 lg:gap-6 border-r border-white/10 pr-6 lg:pr-8">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    'text-xs lg:text-sm font-bold transition-colors whitespace-nowrap',
                    location.pathname === link.path
                      ? 'text-brand-blue'
                      : 'text-white/80 hover:text-brand-blue'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <motion.a
                href="https://chat.whatsapp.com/HEIIFYAmLij62M0jRwwVhH"
                target="_blank"
                rel="noopener noreferrer"
                animate={{ opacity: [0.9, 1, 0.9], scale: [1, 1.02, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden xl:block px-4 py-2 border-2 border-brand-blue text-brand-blue font-black text-xs rounded-full hover:bg-brand-blue hover:text-bg-deep transition-all active:scale-95 tracking-tight uppercase whitespace-nowrap"
              >
                Clube
              </motion.a>

              <Link
                to="/biblioteca"
                className="px-4 lg:px-6 py-2 bg-brand-blue text-bg-deep font-black text-xs rounded-full hover:bg-white transition-all active:scale-95 tracking-tight uppercase whitespace-nowrap shadow-lg shadow-brand-blue/20"
              >
                Acessar
              </Link>
            </div>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-white" onClick={() => setIsOpen(v => !v)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass border-t border-white/10 absolute top-20 left-0 right-0 p-6 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={close}
                  className={cn(
                    'text-xl font-bold transition-colors border-b border-white/5 pb-2 ml-2',
                    location.pathname === link.path
                      ? 'text-brand-blue'
                      : 'text-white hover:text-brand-blue'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
              <a
                href="https://chat.whatsapp.com/HEIIFYAmLij62M0jRwwVhH"
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="w-full py-4 border-2 border-brand-blue text-brand-blue font-black rounded-2xl text-center uppercase tracking-widest text-sm block"
              >
                Unir-se ao Clube
              </a>

              <Link
                to="/biblioteca"
                onClick={close}
                className="w-full py-4 bg-brand-blue text-bg-deep font-black rounded-2xl text-center uppercase tracking-widest text-sm block"
              >
                Acessar
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
