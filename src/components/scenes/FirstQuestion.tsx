import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { content } from '../../data/content';
import { EvadingButton } from '../ui/EvadingButton';

interface FirstQuestionProps {
  onYes: () => void;
}

export const FirstQuestion: React.FC<FirstQuestionProps> = ({ onYes }) => {
  const [yesScale, setYesScale] = useState(1);

  const handleEvade = () => {
    setYesScale((prev) => Math.min(prev + 0.1, 1.5));
  };

  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-brand-dark px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl"
      >
        <h2 className="text-4xl md:text-5xl font-serif text-brand-pink mb-12">
          {content.firstQuestion.question}
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[140px] relative">
          <motion.button
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale + 0.05 }}
            whileTap={{ scale: yesScale - 0.05 }}
            onClick={onYes}
            className="px-8 py-3 rounded-full font-sans font-medium bg-brand-burgundy text-white shadow-[0_0_20px_rgba(139,30,63,0.5)] border border-brand-pink/50 hover:bg-brand-burgundy/90 transition-colors z-10"
          >
            {content.firstQuestion.yes}
          </motion.button>

          <EvadingButton 
            texts={content.firstQuestion.no} 
            onEvade={handleEvade}
            className="font-sans z-10"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
