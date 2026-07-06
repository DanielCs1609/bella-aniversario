import React from 'react';
import { useSecrets } from '../context/SecretsContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { FaHeart, FaStar, FaSeedling, FaCloud } from 'react-icons/fa';

export const SecretsOverlay: React.FC = () => {
  const { activeMessage, closeMessage, collectedSecrets, totalSecretsCount, allCollectedUnlocked } = useSecrets();

  return (
    <AnimatePresence>
      {activeMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          {/* Overlay click to close */}
          <div className="absolute inset-0" onClick={closeMessage} />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md p-8 text-center rounded-2xl glass-panel-gold z-10 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={closeMessage}
              className="absolute top-4 right-4 text-gray-400 hover:text-gold transition-colors duration-200"
              aria-label="Fechar"
            >
              <FiX size={20} />
            </button>

            {/* Glowing Icon Header */}
            <div className="flex justify-center mb-6">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold shadow-[0_0_20px_rgba(212,175,55,0.2)] animate-pulse">
                <FaHeart className="text-2xl" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="font-cinzel text-xs uppercase tracking-[0.2em] text-gold mb-2">
              Lembrança Secreta Desbloqueada
            </h3>
            
            <p className="text-gray-400 text-xs mb-4">
              Segredos Encontrados: {collectedSecrets.length} de {totalSecretsCount}
            </p>

            {/* Divider Line */}
            <div className="h-[1px] w-20 bg-gradient-to-right from-transparent via-gold/50 to-transparent mx-auto mb-6" />

            {/* Message Body */}
            <p className="text-lg md:text-xl font-light text-gray-100 leading-relaxed font-playfair italic px-2">
              "{activeMessage}"
            </p>

            {/* Reward Notification if All are Unlocked */}
            {allCollectedUnlocked && collectedSecrets.length === totalSecretsCount && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-4 rounded-xl bg-gold/10 border border-gold/30 text-gold text-xs leading-relaxed"
              >
                ✨ Você desvendou todas as lembranças secretas! Seu amor por mim é a maior estrela que brilha na minha vida. Obrigado por encontrar cada pedacinho da nossa história. ✨
              </motion.div>
            )}

            {/* Confirm Button */}
            <button
              onClick={closeMessage}
              className="mt-8 px-6 py-2 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-dark-900 font-cinzel text-xs tracking-wider transition-all duration-300 transform active:scale-95"
            >
              Guardar no Coração
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Reusable component to render the hidden secret elements
interface SecretSpotProps {
  id: number;
  type: 'heart' | 'star' | 'flower' | 'butterfly';
  className?: string;
}

export const SecretSpot: React.FC<SecretSpotProps> = ({ id, type, className = '' }) => {
  const { collectSecret, collectedSecrets } = useSecrets();
  const isCollected = collectedSecrets.includes(id);

  const getIcon = () => {
    switch (type) {
      case 'heart': return <FaHeart />;
      case 'star': return <FaStar />;
      case 'flower': return <FaSeedling />;
      case 'butterfly': return <FaCloud />; // A cloud is used as placeholder butterfly
    }
  };

  return (
    <button
      onClick={() => collectSecret(id)}
      className={`absolute transition-all duration-500 cursor-pointer ${
        isCollected 
          ? 'text-gold opacity-90 scale-110 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]' 
          : 'text-gray-600/30 hover:text-gold/50 opacity-40 hover:opacity-100 hover:scale-125'
      } ${className}`}
      style={{ willChange: 'transform, opacity' }}
      title={isCollected ? "Segredo Revelado!" : "O que é isso escondido aqui?"}
    >
      <div className="animate-bounce" style={{ animationDuration: `${2.5 + (id % 3)}s` }}>
        {getIcon()}
      </div>
    </button>
  );
};
