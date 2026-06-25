import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { content } from '../../data/content';
import confetti from 'canvas-confetti';

interface CelebrationSceneProps {
  onReplay: () => void;
}

export const CelebrationScene: React.FC<CelebrationSceneProps> = ({ onReplay }) => {
  useEffect(() => {
    // Launch fireworks
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FFD6E8', '#F4C542', '#FFFFFF', '#C98B8B']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FFD6E8', '#F4C542', '#FFFFFF', '#C98B8B']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-brand-dark px-6 text-center z-50 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-screen" />
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5, type: "spring" }}
        className="relative z-10 max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-serif text-brand-gold mb-8 leading-tight">
          {content.celebration.message}
        </h1>
        
        <p className="text-2xl md:text-4xl font-sans text-white/80 font-light mb-16">
          {content.ending.message}
        </p>

        <button
          onClick={onReplay}
          className="px-8 py-3 rounded-full text-white/50 border border-white/20 hover:bg-white/10 transition-colors"
        >
          Replay Our Story
        </button>
      </motion.div>

      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-brand-pink/30"
            style={{
              left: Math.random() * 100 + '%',
              fontSize: Math.random() * 20 + 10 + 'px'
            }}
            initial={{ top: '110%' }}
            animate={{ top: '-10%', rotate: Math.random() * 360 }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
