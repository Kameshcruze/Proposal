import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface EvadingButtonProps {
  texts: string[];
  className?: string;
  onEvade?: () => void;
}

export const EvadingButton: React.FC<EvadingButtonProps> = ({ texts, className, onEvade }) => {
  const [clickCount, setClickCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const currentText = texts[Math.min(clickCount, texts.length - 1)];

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent default touch/click actions
    
    setClickCount((prev) => prev + 1);
    
    // Calculate random position within a safe range
    const range = 150; // max px to move
    const newX = (Math.random() - 0.5) * range * 2;
    const newY = (Math.random() - 0.5) * range * 2;
    
    setPosition({ x: newX, y: newY });
    
    if (onEvade) {
      onEvade();
    }
  };

  return (
    <motion.button
      animate={{ 
        x: position.x, 
        y: position.y,
        scale: Math.max(0.7, 1 - clickCount * 0.05), // Shrinks slightly
        rotate: clickCount > 0 ? (Math.random() - 0.5) * 20 : 0, // Random slight rotation
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleInteraction}
      onMouseEnter={handleInteraction}
      className={cn(
        "px-6 py-3 rounded-full font-medium text-white/80 bg-white/10 backdrop-blur-md border border-white/20 transition-colors shadow-lg whitespace-nowrap",
        className
      )}
    >
      {currentText}
    </motion.button>
  );
};
