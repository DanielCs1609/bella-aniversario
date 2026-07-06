import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioSystem } from '../utils/audioSystem';
import { SecretSpot } from '../components/SecretsOverlay';
import { FiGift, FiSmile, FiHeart, FiX, FiStar, FiCompass, FiLock, FiUnlock } from 'react-icons/fi';


interface MemoryItem {
  id: number;
  type: 'photo' | 'chat' | 'audio' | 'gift' | 'sticker' | 'love';
  label: string;
  icon: React.ReactNode;
  title: string;
  details: React.ReactNode;
}

export const TimeCapsuleSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);


  const handleOpenChest = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    audioSystem.playLetterOpen();
    if ('vibrate' in navigator) {
      navigator.vibrate([80, 50, 80]);
    }
    // If we are closing the chest, auto scroll to next section: starsky
    if (!nextState) {
      setTimeout(() => {
        document.getElementById('starsky')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  const handleOpenMemory = (memory: MemoryItem) => {
    setActiveMemory(memory);
    audioSystem.playVideoSound();
    if ('vibrate' in navigator) {
      navigator.vibrate(40);
    }
  };

  const closeMemoryModal = () => {
    setActiveMemory(null);
    audioSystem.playClick();
  };



  const memories: MemoryItem[] = [
    {
      id: 1,
      type: 'love',
      label: 'Amor',
      icon: <FiHeart />,
      title: 'Desejo de Amor',
      details: (
        <div className="text-center py-4 space-y-4">
          <div className="text-4xl text-gold mb-2">❤️</div>
          <p className="text-white font-cinzel text-sm font-semibold uppercase tracking-wider">Alegria Compartilhada</p>
          <p className="text-gray-300 text-sm font-light max-w-xs mx-auto leading-relaxed">
            "Meu maior desejo é que você receba de volta todo o amor, carinho e cuidado que distribui. Que você se sinta sempre valorizada, querida e saiba que meu coração é e sempre será o seu lugar seguro."
          </p>
        </div>
      )
    },
    {
      id: 2,
      type: 'photo',
      label: 'Sucesso',
      icon: <FiStar />,
      title: 'Desejo de Sucesso',
      details: (
        <div className="text-center py-4 space-y-4">
          <div className="text-4xl text-gold mb-2">⭐</div>
          <p className="text-white font-cinzel text-sm font-semibold uppercase tracking-wider">Conquistas e Brilho</p>
          <p className="text-gray-300 text-sm font-light max-w-xs mx-auto leading-relaxed">
            "Que este novo ano abra portas incríveis na sua caminhada. Desejo que sua inteligência brilhante te leve a lugares altos, que você realize cada projeto profissional ou pessoal e que celebre muitas vitórias."
          </p>
        </div>
      )
    },
    {
      id: 3,
      type: 'gift',
      label: 'Paz',
      icon: <FiGift />,
      title: 'Desejo de Paz e Saúde',
      details: (
        <div className="text-center py-4 space-y-4">
          <div className="text-4xl text-gold mb-2">🕊️</div>
          <p className="text-white font-cinzel text-sm font-semibold uppercase tracking-wider">Serenidade e Equilíbrio</p>
          <p className="text-gray-300 text-sm font-light max-w-xs mx-auto leading-relaxed">
            "Desejo dias tranquilos, noites de sono reparador e uma saúde de ferro. Que a paz acompanhe cada decisão sua e que você sempre encontre tempo para respirar fundo e sorrir com leveza."
          </p>
        </div>
      )
    },
    {
      id: 4,
      type: 'chat',
      label: 'Aventuras',
      icon: <FiCompass />,
      title: 'Desejo de Aventuras',
      details: (
        <div className="text-center py-4 space-y-4">
          <div className="text-4xl text-gold mb-2">🧭</div>
          <p className="text-white font-cinzel text-sm font-semibold uppercase tracking-wider">Novos Horizontes</p>
          <p className="text-gray-300 text-sm font-light max-w-xs mx-auto leading-relaxed">
            "Que você colecione carimbos no passaporte, conheça cenários deslumbrantes e viva histórias fantásticas. Que o mundo se revele lindo para você e que eu possa registrar cada sorriso seu nessas viagens."
          </p>
        </div>
      )
    },
    {
      id: 5,
      type: 'sticker',
      label: 'Felicidade',
      icon: <FiSmile />,
      title: 'Desejo de Felicidade',
      details: (
        <div className="text-center py-4 space-y-4">
          <div className="text-4xl text-gold mb-2">✨</div>
          <p className="text-white font-cinzel text-sm font-semibold uppercase tracking-wider">Alegria Pura e Simples</p>
          <p className="text-gray-300 text-sm font-light max-w-xs mx-auto leading-relaxed">
            "Que nunca falte motivo para você dar aquela sua gargalhada gostosa que ilumina a minha vida. Desejo felicidade nos pequenos detalhes do dia a dia, fazendo tudo valer a pena."
          </p>
        </div>
      )
    }
  ];

  return (
    <section className="relative w-full min-h-screen bg-dark-900 px-6 py-32 md:py-40 flex flex-col items-center justify-center overflow-hidden">
      {/* Hidden Secret Spot 8 */}
      <SecretSpot id={8} type="flower" className="top-1/4 right-20 text-base" />

      <div className="z-10 text-center max-w-4xl w-full flex flex-col items-center justify-center">
        {/* Title */}
        <div className="mb-24">
          <h2 className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold mb-4">
            Desejos de Aniversário
          </h2>
          <p className="font-playfair text-3xl md:text-5xl font-light text-white">
            Baú de Desejos
          </p>
          <p className="text-xs text-gray-400 mt-4 max-w-sm mx-auto">
            Abra o baú para liberar 5 desejos especiais que guardei no coração para o seu novo ciclo.
          </p>
        </div>

        {/* The Capsule Box Container */}
        <div className="relative w-72 h-72 flex items-center justify-center">
          
          {/* Glowing pedestal backing */}
          <div className="absolute inset-0 rounded-full bg-gold/5 blur-3xl" />

          {/* Chest Interactive Graphic */}
          <motion.div
            onClick={handleOpenChest}
            animate={{
              y: [0, -6, 0],
              scale: isOpen ? 1.05 : 1.0
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: 0.4 }
            }}
            className="w-44 h-44 rounded-full flex flex-col items-center justify-center glass-panel-gold border border-gold/30 shadow-[0_0_35px_rgba(212,175,55,0.2)] hover:scale-105 active:scale-95 transition-all duration-300 relative z-25 hover:shadow-[0_0_50px_rgba(212,175,55,0.4)]"
          >
            {/* Holographic lines inside chest */}
            <div className="absolute inset-2 border border-dashed border-gold/10 rounded-full pointer-events-none" />

            <motion.div
              animate={{ rotate: isOpen ? [0, -10, 10, 0] : 0 }}
              transition={{ duration: 0.5 }}
              className="text-gold text-4xl mb-3 drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]"
            >
              {isOpen ? <FiUnlock /> : <FiLock />}
            </motion.div>
            
            <span className="font-cinzel text-[10px] tracking-[0.25em] text-gold font-semibold uppercase">
              {isOpen ? 'Fechar' : 'Abrir'}
            </span>
          </motion.div>

          {/* Opened items orbiting / surrounding the chest */}
          <AnimatePresence>
            {isOpen && (
              <>
                {memories.map((memory, index) => {
                  // Coordinate positions to orbit the chest in a neat circular flower layout
                  const angle = (index * 2 * Math.PI) / memories.length;
                  const radius = 150; // offset radius
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <motion.button
                      key={memory.id}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{ opacity: 1, scale: 1, x, y }}
                      exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      transition={{ type: 'spring', delay: index * 0.1, stiffness: 120 }}
                      onClick={() => handleOpenMemory(memory)}
                      className="absolute w-14 h-14 rounded-full glass-panel-gold text-gold hover:text-white flex items-center justify-center text-xl z-20 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
                      title={memory.label}
                    >
                      {memory.icon}
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-cinzel text-gray-400 tracking-wider">
                        {memory.label}
                      </span>
                    </motion.button>
                  );
                })}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Memory Detail Modal Pop-up */}
      <AnimatePresence>
        {activeMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="absolute inset-0" onClick={closeMemoryModal} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-md p-8 glass-panel-gold text-center z-10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={closeMemoryModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gold transition-colors duration-250 cursor-pointer"
              >
                <FiX size={20} />
              </button>

              <div className="flex justify-center text-gold text-2xl mb-4">
                {activeMemory.icon}
              </div>

              <h3 className="font-cinzel text-xs uppercase tracking-[0.2em] text-gold mb-6">
                {activeMemory.title}
              </h3>

              {activeMemory.details}

              <button
                onClick={closeMemoryModal}
                className="btn-premium mt-8"
              >
                Fechar Recordação
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};
export default TimeCapsuleSection;
