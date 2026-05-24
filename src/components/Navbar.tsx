import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Share2, Zap, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Diagramas', path: '/metodo' },
    { name: 'Tutoriais', path: '/tutoriais' },
    { name: 'Contato', path: '#footer' },
    { name: 'Admin', path: '/admin' },
  ];

  const clubeLink = { name: 'Clube', path: 'https://chat.whatsapp.com/HEIIFYAmLij62M0jRwwVhH' };
  const acessarLink = { name: 'Acessar', path: '/biblioteca' };

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    setIsOpen(false);
    
    // External links
    if (path.startsWith('http')) return;

    // Anchor links
    if (path.startsWith('#')) {
      e.preventDefault();
      const targetId = path.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (location.pathname !== '/') {
        navigate('/' + path);
      }
      return;
    }

    // Scroll top if same path
    if (path === location.pathname) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          <Link to="/" onClick={(e) => handleLinkClick(e, '/')} className="flex items-center gap-3 group shrink-0">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="absolute -inset-1.5 bg-brand-blue/40 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                animate={{ 
                  opacity: [0, 0.4, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative p-2.5 bg-bg-deep border border-brand-blue/30 rounded-xl group-hover:border-brand-blue/60 transition-all duration-300 shadow-2xl">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <BookOpen className="w-6 h-6 text-brand-blue group-hover:scale-110 transition-transform duration-500" />
                  </motion.div>
                  <motion.div 
                    className="absolute -bottom-1 -right-1 p-0.5 bg-bg-deep rounded-md"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Share2 className="w-3 h-3 text-brand-rose" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            <div className="flex flex-col">
              <div className="overflow-hidden">
                <motion.span 
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="font-display font-black text-lg md:text-xl tracking-tight text-white uppercase leading-none block"
                >
                  BÍBLIA VISUAL <span className="text-brand-blue">EXPOSITIVA</span>
                </motion.span>
              </div>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.5 }}
                className="text-[8px] text-white/70 font-bold tracking-[0.3em] uppercase mt-0.5 hidden sm:block"
              >
                Método Expositivo Visual
              </motion.span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2 lg:gap-8 flex-1 justify-end min-w-0">
            <div className="flex items-center gap-3 lg:gap-6 border-r border-white/10 pr-3 lg:pr-8 overflow-hidden">
              {navLinks.map((link) => {
                const isExternal = link.path.startsWith('http');
                const LinkComponent = isExternal ? 'a' : Link;
                const linkProps = isExternal 
                  ? { href: link.path, target: "_blank", rel: "noopener noreferrer" }
                  : { to: link.path };

                return (
                  <LinkComponent
                    key={link.name}
                    {...linkProps}
                    onClick={(e: any) => handleLinkClick(e, link.path)}
                    className={cn(
                      "text-[10px] lg:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer",
                      location.pathname === link.path ? "text-brand-blue" : "text-white/90 hover:text-brand-blue"
                    )}
                  >
                    {link.name}
                  </LinkComponent>
                );
              })}
            </div>
            
            <div className="flex items-center gap-2 lg:gap-4 shrink-0">
              <motion.div
                animate={{
                  opacity: [0.9, 1, 0.9],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="hidden xl:block"
              >
                <a
                  href={clubeLink.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border-2 border-brand-blue text-brand-blue font-black text-xs rounded-full hover:bg-brand-blue hover:text-bg-deep transition-all active:scale-95 tracking-tight uppercase whitespace-nowrap"
                >
                  Clube
                </a>
              </motion.div>

              <Link
                to={acessarLink.path}
                onClick={(e) => handleLinkClick(e, acessarLink.path)}
                className="px-4 lg:px-6 py-2 bg-brand-blue text-bg-deep font-black text-xs rounded-full hover:bg-white transition-all active:scale-95 tracking-tight uppercase whitespace-nowrap shadow-lg shadow-brand-blue/20"
              >
                Acessar
              </Link>

            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass border-t border-white/10 absolute top-20 left-0 right-0 p-6 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isExternal = link.path.startsWith('http');
                const LinkComponent = isExternal ? 'a' : Link;
                const linkProps = isExternal 
                  ? { href: link.path, target: "_blank", rel: "noopener noreferrer" }
                  : { to: link.path };

                return (
                  <LinkComponent
                    key={link.name}
                    {...linkProps}
                    onClick={(e: any) => handleLinkClick(e, link.path)}
                    className="text-xl font-bold text-white hover:text-brand-blue transition-colors border-b border-white/5 pb-2 ml-2"
                  >
                    {link.name}
                  </LinkComponent>
                );
              })}
            </div>
            
            <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
              <motion.div
                animate={{
                  opacity: [0.9, 1, 0.9],
                  scale: [1, 1.01, 1]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <a
                  href={clubeLink.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 border-2 border-brand-blue text-brand-blue font-black rounded-2xl text-center uppercase tracking-widest text-sm block"
                >
                  Unir-se ao Clube
                </a>
              </motion.div>

              <Link
                to={acessarLink.path}
                onClick={(e) => handleLinkClick(e, acessarLink.path)}
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
