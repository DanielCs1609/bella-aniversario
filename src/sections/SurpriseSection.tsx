import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactPlayer from 'react-player';
import confetti from 'canvas-confetti';
import { audioSystem } from '../utils/audioSystem';
import { FiGift, FiX } from 'react-icons/fi';

const Player = ReactPlayer as any;

export const SurpriseSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // High quality sample MP4 representing the personal boyfriend message
  const SURPRISE_VIDEO_URL = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';

  const handleStartSurprise = () => {
    setIsPlaying(true);
    audioSystem.playVideoSound();
    audioSystem.stopMusic(); // mute ambient loops during major video
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsCompleted(true);
    audioSystem.playChime();

    // Fire fireworks/confetti celebration bursts!
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Confetti burst from random spots
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleClosePlayer = () => {
    setIsPlaying(false);
    audioSystem.playClick();
  };

  return (
    <section className="relative w-full min-h-screen bg-dark-900 px-6 py-32 md:py-40 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Animated stars background flare */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent pointer-events-none" />

      <div className="z-10 text-center max-w-xl">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-8 flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center text-3xl border border-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.15)] animate-bounce">
                <FiGift />
              </div>

              <div className="space-y-3">
                <h3 className="font-cinzel text-xs uppercase tracking-[0.2em] text-gold font-bold">
                  Uma Última Lembrança
                </h3>
                <p className="font-playfair text-xl md:text-2xl text-white font-light">
                  Ainda existe uma última surpresa...
                </p>
              </div>

              <button
                onClick={handleStartSurprise}
                className="btn-premium"
              >
                <span className="relative flex items-center gap-2">
                  Abrir Surpresa
                </span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="ended"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0 }}
              className="space-y-6 flex flex-col items-center"
            >
              <div className="text-4xl animate-pulse">🌟✨💖</div>
              
              <h2 className="font-cinzel text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold to-white tracking-widest uppercase drop-shadow-[0_2px_15px_rgba(212,175,55,0.2)]">
                Parabéns!
              </h2>
              
              <p className="font-playfair text-lg md:text-xl text-gray-200 italic font-light leading-relaxed">
                "Que a nossa estrada continue cheia de brilho, risos e muito amor. Que o seu novo ciclo seja iluminado e que possamos comemorar este dia juntos por toda a vida."
              </p>

              <div className="h-[1px] w-20 bg-gold/40 mx-auto my-4" />

              <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-gold font-bold leading-loose">
                Com todo o meu amor,<br />
                Daniel.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Full-screen Video Player Modal */}
      <AnimatePresence>
        {isPlaying && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black p-4 select-none">
            <div className="absolute inset-0" onClick={handleClosePlayer} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl aspect-video rounded-3xl border border-gold/30 overflow-hidden bg-dark-900 z-10 shadow-2xl"
            >
              <button
                onClick={handleClosePlayer}
                className="absolute top-4 left-4 text-white hover:text-gold bg-black/60 p-2.5 rounded-full z-20 cursor-pointer transition-all active:scale-95"
                aria-label="Fechar"
              >
                <FiX size={20} />
              </button>

              <Player
                url={SURPRISE_VIDEO_URL}
                playing
                controls
                width="100%"
                height="100%"
                onEnded={handleVideoEnded}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default SurpriseSection;
