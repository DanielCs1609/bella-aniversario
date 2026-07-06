import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

export const FinalSection: React.FC = () => {
  const textContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 3.5, // Slow, deliberate transition
        delayChildren: 0.5
      }
    }
  };

  const textItem = {
    hidden: { opacity: 0, y: 15, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.8, ease: 'easeOut' as any }
    }
  };

  return (
    <section className="relative w-full h-screen bg-black flex flex-col items-center justify-center px-6 overflow-hidden">
      <motion.div
        variants={textContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="text-center z-10 max-w-xl space-y-12"
      >
        <motion.p 
          variants={textItem} 
          className="font-playfair text-xl md:text-3xl font-light text-gray-200 select-none leading-relaxed italic"
        >
          Obrigado por existir.
        </motion.p>
        
        <motion.p 
          variants={textItem} 
          className="font-playfair text-xl md:text-3xl font-light text-gray-200 select-none leading-relaxed italic"
        >
          Obrigado por fazer parte da minha história.
        </motion.p>
        
        <motion.p 
          variants={textItem} 
          className="font-playfair text-xl md:text-3xl font-light text-gray-200 select-none leading-relaxed italic"
        >
          Obrigado por ser exatamente quem você é.
        </motion.p>

        {/* Pulsing Glowing Heart */}
        <motion.div 
          variants={textItem}
          className="flex flex-col items-center justify-center pt-8 space-y-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              filter: ['drop-shadow(0 0 10px #d4af37)', 'drop-shadow(0 0 25px #d4af37)', 'drop-shadow(0 0 10px #d4af37)']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="text-gold text-5xl md:text-6xl"
          >
            <FaHeart />
          </motion.div>

          <div className="space-y-4">
            <h3 className="font-cinzel text-3xl md:text-5xl font-black tracking-widest text-white uppercase select-none">
              Feliz Aniversário.
            </h3>
            <p className="font-cinzel text-sm md:text-lg tracking-[0.3em] text-gold uppercase select-none font-bold">
              Eu te amo.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
export default FinalSection;
