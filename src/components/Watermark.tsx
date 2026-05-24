import React from 'react';
import { motion } from 'motion/react';

export default function Watermark() {
  return (
    <motion.div 
      initial={{ scale: 1 }}
      animate={{ scale: 1.1 }}
      transition={{ 
        duration: 40, 
        repeat: Infinity, 
        repeatType: "reverse", 
        ease: "linear" 
      }}
      className="fixed inset-0 pointer-events-none opacity-[0.07] grayscale -z-10"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    />
  );
}
