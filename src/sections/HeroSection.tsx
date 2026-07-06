import React from 'react';
import { motion } from 'framer-motion';
import { audioSystem } from '../utils/audioSystem';
import { FiChevronDown } from 'react-icons/fi';
import { SecretSpot } from '../components/SecretsOverlay';

interface HeroSectionProps {
  onStart: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStart }) => {
  const handleStart = () => {
    // Unlock audio context and play music
    audioSystem.playMusic();
    audioSystem.playChime();
    
    if ('vibrate' in navigator) {
      navigator.vibrate(60);
    }
    
    // Call the parent scroll function
    onStart();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1] as any, // premium easeOut
      },
    },
  };

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-transparent px-6 overflow-hidden">
      {/* Scattered Secret Spot 1 (A hidden star in the upper left) */}
      <SecretSpot id={1} type="star" className="top-12 left-10 text-xl" />
      {/* Scattered Secret Spot 2 (A hidden heart in the upper right) */}
      <SecretSpot id={2} type="heart" className="top-24 right-16 text-lg" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10 max-w-2xl"
      >
        <motion.p
          variants={itemVariants}
          className="font-cinzel text-xs md:text-sm uppercase tracking-[0.25em] text-gray-400 mb-4"
        >
          Feliz Aniversário
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-cinzel text-5xl md:text-8xl font-black tracking-[0.2em] md:tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gold drop-shadow-[0_0_30px_rgba(212,175,55,0.25)] mb-8 select-none"
        >
          ISABELLA
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="font-playfair text-lg md:text-2xl font-light italic text-gray-300 mb-16 select-none"
        >
          Um presente digital preparado com todo o meu amor para celebrar a sua vida e o seu dia especial.
        </motion.p>

        <motion.div variants={itemVariants} className="flex justify-center">
          <button
            onClick={handleStart}
            className="btn-premium"
          >
            <span className="relative flex items-center gap-2">
              Começar Experiência
              <FiChevronDown className="text-sm group-hover:translate-y-1 transition-transform duration-300" />
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Decorative premium bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};
export default HeroSection;
