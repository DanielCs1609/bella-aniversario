import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioSystem } from '../utils/audioSystem';
import { SecretSpot } from '../components/SecretsOverlay';
import { FiMail } from 'react-icons/fi';

export const LetterSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const typingTimerRef = useRef<any>(null);

  const fullText = `Querida Isabella,\n\nHoje celebramos o dia em que o mundo ganhou a sua luz. Escrever esta carta é tentar traduzir em palavras um sentimento que transborda a cada olhar, a cada sorriso e a cada abraço nosso.\n\nDesde que você entrou na minha vida, tudo se tornou mais colorido, mais leve e mais cheio de sentido. Você me inspira com sua força, me acalma com sua doçura e me faz amar o mundo simplesmente porque você existe nele.\n\nObrigado por ser minha melhor amiga, minha maior parceira de aventuras e o amor da minha vida. Que o seu novo ano seja repleto de sorrisos sinceros, sonhos realizados e paz.\n\nFeliz aniversário, meu amor. Eu te amo hoje, amanhã e em todas as vidas que virão.\n\nCom todo o meu amor,\nDaniel`;

  const handleOpenLetter = () => {
    setIsOpen(true);
    audioSystem.playLetterOpen();
    if ('vibrate' in navigator) {
      navigator.vibrate([60, 40, 60]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      let index = 0;
      setTypedText('');

      const typeChar = () => {
        if (index < fullText.length) {
          const char = fullText.charAt(index);
          setTypedText(prev => prev + char);
          
          // Play typewriter tick sound periodically for realism
          // Play on non-whitespace, but not too dense to prevent audio issues
          if (char !== ' ' && char !== '\n' && Math.random() > 0.3) {
            audioSystem.typewriterBeep();
          }

          index++;
          
          // Vary typing speed slightly for humanness
          let speed = 40;
          if (char === '.' || char === ',') speed = 450; // pause on punctuation
          if (char === '\n') speed = 600; // longer pause on paragraphs
          
          typingTimerRef.current = setTimeout(typeChar, speed);
        }
      };

      typingTimerRef.current = setTimeout(typeChar, 1000); // 1 sec delay after open
    }

    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, [isOpen]);

  return (
    <section className="relative w-full min-h-screen bg-dark-900 px-6 py-24 flex flex-col items-center justify-center overflow-hidden">
      {/* Hidden Secret Spot 15 */}
      <SecretSpot id={15} type="heart" className="top-12 right-12 text-sm" />

      <div className="z-10 text-center max-w-xl w-full flex flex-col items-center">
        {/* Header */}
        {!isOpen && (
          <div className="mb-12">
            <h2 className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold mb-3">
              Carta Intima
            </h2>
            <p className="font-playfair text-3xl md:text-5xl font-light text-white mb-6">
              Palavras do Coração
            </p>
            <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
              Um envelope selado carrega o que sinto em palavras. Toque no lacre para abrir.
            </p>
          </div>
        )}

        {/* Envelope Layout */}
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 90 }}
              transition={{ duration: 0.6 }}
              onClick={handleOpenLetter}
              className="w-72 h-48 rounded-2xl glass-panel-gold border-2 border-gold/30 hover:border-gold flex flex-col items-center justify-center cursor-pointer shadow-[0_0_35px_rgba(212,175,55,0.08)] relative z-20 group transition-all duration-500 active:scale-95"
            >
              <div className="absolute inset-2 border border-dashed border-gold/10 rounded-xl pointer-events-none" />
              
              <FiMail className="text-gold text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
              
              <span className="font-cinzel text-[10px] tracking-[0.2em] text-gold font-semibold uppercase">
                Abrir Envelope
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full max-w-lg rounded-2xl bg-[#fbf9f4] text-dark-900 border border-gold/40 shadow-2xl p-8 md:p-12 text-left relative overflow-hidden font-serif"
            >
              {/* Retro parchment paper grid texture overlays */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent pointer-events-none" />
              
              {/* Typewritten letter text */}
              <div className="text-xs md:text-sm text-gray-800 leading-relaxed font-sans whitespace-pre-wrap select-text select-none min-h-[350px]">
                {typedText}
                <span className="inline-block w-1.5 h-4 bg-gold ml-1 animate-pulse" />
              </div>

              {/* Envelope liner shadow */}
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gold/5 to-transparent pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};
export default LetterSection;
