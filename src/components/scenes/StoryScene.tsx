import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { content } from '../../data/content';
import { EvadingButton } from '../ui/EvadingButton';
import confetti from 'canvas-confetti';

interface StorySceneProps {
  onAccepted: () => void;
}

export const StoryScene: React.FC<StorySceneProps> = ({ onAccepted }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  return (
    <div ref={containerRef} className="bg-brand-dark min-h-screen text-white overflow-hidden pb-40">
      <TimelineSection />
      <GallerySection />
      <ReasonsSection />
      <LoveMeterSection />
      <SecretLetterSection />
      <CountdownSection />
      <FinalProposalSection onAccepted={onAccepted} />
    </div>
  );
};

const TimelineSection = () => {
  return (
    <div className="flex flex-col items-center">
      {content.timeline.map((item, index) => (
        <TimelineItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
};

const TimelineItem: React.FC<{ item: any, index: number }> = ({ item, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity }}
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-20"
    >
      <motion.div 
        style={{ y }}
        className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-12"
      >
        <div className={`w-full md:w-1/2 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/5] md:aspect-square">
            <img src={item.image} alt="Memory" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
          </div>
        </div>
        <div className={`w-full md:w-1/2 text-center md:text-left ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
          <h3 className="text-4xl md:text-6xl font-serif text-brand-pink mb-6 leading-tight">
            {item.quote}
          </h3>
          {item.subQuote && (
            <p className="text-2xl md:text-3xl text-white/70 font-sans font-light">
              {item.subQuote}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const GallerySection = () => {
  return (
    <div className="py-32 px-6 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-serif text-center text-brand-rosegold mb-20"
      >
        Beautiful Moments
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {content.gallery.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            whileHover={{ scale: 1.05, rotate: (index % 2 === 0 ? 2 : -2) }}
            className="bg-white p-4 pb-12 rounded-sm shadow-xl relative"
          >
            <div className="aspect-square overflow-hidden mb-4 rounded-sm">
              <img src={item.image} alt={item.caption} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <p className="text-center font-handwriting text-2xl text-black/80 absolute bottom-3 w-full left-0">
              {item.caption}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ReasonsSection = () => {
  return (
    <div className="py-32 px-6 flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-5xl md:text-7xl font-serif text-brand-pink mb-16 text-center">
        Why I Love You
      </h2>
      <div className="flex flex-wrap justify-center gap-6 max-w-4xl">
        {content.reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring" }}
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255,214,232,0.5)" }}
            className="px-6 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl text-xl md:text-2xl font-medium text-brand-pink cursor-pointer"
          >
            {reason}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const LoveMeterSection = () => {
  const [fill, setFill] = useState(0);

  const handleInteract = () => {
    if (fill < 1000) {
      const newFill = fill + 100;
      setFill(newFill);
      if (newFill >= 1000) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFD6E8', '#C98B8B', '#FFFFFF']
        });
      }
    }
  };

  return (
    <div className="py-32 px-6 flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-4xl md:text-5xl font-serif text-white mb-12 text-center">
        {content.meter.title}
      </h2>
      <div 
        className="relative w-64 h-64 flex items-center justify-center cursor-pointer group"
        onClick={handleInteract}
      >
        <motion.div 
          className="absolute inset-0 border-4 border-brand-pink/30 rounded-full"
        />
        <motion.div 
          className="absolute bottom-0 w-full bg-gradient-to-t from-brand-burgundy to-brand-pink rounded-full origin-bottom opacity-50"
          animate={{ height: `${Math.min(fill / 10, 100)}%` }}
          transition={{ type: "spring", bounce: 0.5 }}
        />
        <div className="z-10 text-5xl font-bold text-white group-hover:scale-110 transition-transform select-none">
          {fill}%
        </div>
      </div>
      <p className="mt-8 text-white/50 animate-pulse text-sm">
        {fill < 1000 ? "(Tap to fill)" : "Overflowing! ❤️"}
      </p>
    </div>
  );
};

const SecretLetterSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-32 px-6 flex flex-col items-center justify-center min-h-[60vh]">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer w-64 h-48 bg-gradient-to-br from-brand-rosegold to-brand-burgundy rounded-lg shadow-2xl flex items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-full border-t-[96px] border-l-[128px] border-r-[128px] border-b-[0px] border-t-brand-pink/20 border-l-transparent border-r-transparent border-b-transparent z-10" />
            <span className="text-white font-serif z-20 group-hover:scale-110 transition-transform">
              Open Me
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="max-w-2xl w-full bg-[#fdfbf7] text-brand-dark p-12 md:p-16 rounded-sm shadow-2xl relative"
          >
            <div className="absolute top-4 bottom-4 left-8 border-l border-brand-rosegold/30" />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 2 }}
              className="text-2xl md:text-4xl font-handwriting leading-relaxed pl-8"
            >
              {content.letter.text}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CountdownSection = () => {
  return (
    <div className="py-32 px-6 flex flex-col items-center justify-center min-h-[40vh]">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="text-3xl md:text-5xl font-serif text-brand-lavender text-center"
      >
        {content.countdown.text}
      </motion.h2>
    </div>
  );
};

const FinalProposalSection: React.FC<{ onAccepted: () => void }> = ({ onAccepted }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-6 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-burgundy/20 via-brand-dark to-brand-dark pointer-events-none" />
      
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ type: "spring", duration: 2, bounce: 0.5 }}
        viewport={{ once: true, margin: "-200px" }}
        className="mb-12"
      >
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-brand-gold flex items-center justify-center shadow-[0_0_50px_rgba(244,197,66,0.3)] animate-pulse">
           <span className="text-6xl md:text-8xl">💍</span>
        </div>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        viewport={{ once: true }}
        className="text-6xl md:text-8xl font-serif text-white mb-16 max-w-4xl leading-tight text-shadow-lg shadow-brand-pink/50"
      >
        {content.proposal.heading}
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-center justify-center gap-8 relative min-h-[160px] w-full max-w-md"
      >
        <button
          onClick={onAccepted}
          className="px-10 py-4 rounded-full font-sans font-medium bg-brand-gold text-brand-dark shadow-[0_0_30px_rgba(244,197,66,0.6)] hover:bg-white hover:scale-110 transition-all text-xl z-10"
        >
          {content.proposal.yes}
        </button>

        <EvadingButton 
          texts={content.proposal.no}
          className="font-sans z-10 text-white/50 border-white/10 bg-transparent shadow-none"
        />
      </motion.div>
    </div>
  );
};
