import React from 'react';
import { motion } from 'framer-motion';
import IsabellaPortrait from '../assets/isabella_portrait.png';
import { SecretSpot } from '../components/SecretsOverlay';

export const IntroSection: React.FC = () => {
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1.5, // Space out lines
        delayChildren: 0.3
      }
    }
  };

  const textLineVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: 'easeOut' as any }
    }
  };

  return (
    <section 
      id="intro"
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-dark-900 px-6 py-16 overflow-hidden"
    >
      {/* Hidden Secret Spot 3 */}
      <SecretSpot id={3} type="flower" className="bottom-20 right-10 text-lg" />

      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-center gap-12 z-10">
        
        {/* Animated Text Container */}
        <motion.div 
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex-1 text-center md:text-left space-y-8 max-w-lg"
        >
          <motion.p 
            variants={textLineVariants}
            className="font-playfair text-lg md:text-2xl text-gray-300 font-light leading-relaxed select-none"
          >
            Existem bilhões de pessoas no mundo...
          </motion.p>
          
          <motion.p 
            variants={textLineVariants}
            className="font-playfair text-lg md:text-2xl text-gray-300 font-light leading-relaxed select-none"
          >
            Mas apenas uma delas mudou completamente o rumo da minha história.
          </motion.p>
          
          <motion.p 
            variants={textLineVariants}
            className="font-cinzel text-2xl md:text-4xl text-gold font-bold tracking-widest select-none pt-4"
          >
            Você.
          </motion.p>
        </motion.div>

        {/* Portrait Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.8, delay: 4.0, ease: 'easeOut' }} // Reveal after text finished
          className="flex-1 flex justify-center items-center relative"
        >
          {/* Glass frame */}
          <div className="relative p-2 rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.08)] max-w-sm w-full overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="overflow-hidden rounded-xl"
            >
              <img 
                src={IsabellaPortrait} 
                alt="Isabella Portrait" 
                className="w-full h-auto object-cover aspect-[3/4]"
                loading="lazy"
              />
            </motion.div>
            
            {/* Soft gold border overlay */}
            <div className="absolute inset-0 border border-gold/10 rounded-2xl pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Decorative divider gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};
export default IntroSection;
