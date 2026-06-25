import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../../data/content';
import { Heart } from 'lucide-react';

interface OpeningScreenProps {
  onNext: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onNext }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000); // Wait 3 seconds before showing button
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-brand-dark px-6 text-center overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      {/* Tiny glowing particles background (simple CSS based) */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/30"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="text-4xl md:text-5xl font-serif text-brand-pink/90 max-w-2xl leading-relaxed"
      >
        {content.opening.text}
      </motion.h1>

      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            onClick={onNext}
            className="mt-12 group relative px-8 py-4 rounded-full bg-gradient-to-r from-brand-rosegold/40 to-brand-burgundy/40 backdrop-blur-sm border border-brand-pink/30 hover:border-brand-pink/60 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center gap-3 text-lg font-medium tracking-wide text-brand-pink">
              <Heart className="w-5 h-5 text-brand-pink fill-brand-pink animate-pulse" />
              {content.opening.button.replace('💖 ', '')}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
