import React, { useState, useEffect } from 'react';
import { audioSystem } from '../utils/audioSystem';
import { motion } from 'framer-motion';
import { FiVolumeX } from 'react-icons/fi';

export const AmbientMusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Keep checking the playback state
    const checkInterval = setInterval(() => {
      setIsPlaying(audioSystem.getIsPlaying());
    }, 500);

    return () => clearInterval(checkInterval);
  }, []);

  const handleToggle = () => {
    const nextState = audioSystem.toggleMusic();
    setIsPlaying(nextState);
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      onClick={handleToggle}
      className="fixed top-4 right-4 z-40 flex items-center justify-center w-11 h-11 rounded-full glass-panel-gold border border-gold/30 text-gold hover:text-white transition-colors shadow-[0_0_15px_rgba(212,175,55,0.15)] active:scale-95 cursor-pointer"
      title={isPlaying ? "Pausar música" : "Tocar música de fundo"}
    >
      {isPlaying ? (
        <div className="flex items-end gap-[2px] h-3.5">
          {/* Bouncing audio wave bars */}
          <span className="w-[3px] bg-gold rounded-full animate-bounce" style={{ animationDuration: '0.6s', animationDelay: '0.1s' }} />
          <span className="w-[3px] bg-gold rounded-full animate-bounce h-5" style={{ animationDuration: '0.8s', animationDelay: '0.3s' }} />
          <span className="w-[3px] bg-gold rounded-full animate-bounce" style={{ animationDuration: '0.5s', animationDelay: '0s' }} />
          <span className="w-[3px] bg-gold rounded-full animate-bounce" style={{ animationDuration: '0.7s', animationDelay: '0.2s' }} />
        </div>
      ) : (
        <FiVolumeX size={18} className="text-gray-400" />
      )}
    </motion.button>
  );
};
export default AmbientMusicToggle;
