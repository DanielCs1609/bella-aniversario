import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioSystem } from '../utils/audioSystem';
import { SecretSpot } from '../components/SecretsOverlay';
import { FiFolder, FiImage, FiMessageSquare, FiMic, FiGift, FiSmile, FiHeart, FiX } from 'react-icons/fi';
import FirstDateImg from '../assets/first_date.png';

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
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleOpenChest = () => {
    setIsOpen(!isOpen);
    audioSystem.playLetterOpen();
    if ('vibrate' in navigator) {
      navigator.vibrate([80, 50, 80]);
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
    setIsPlayingAudio(false);
    audioSystem.playClick();
  };

  const handlePlayProceduralAudio = () => {
    setIsPlayingAudio(true);
    audioSystem.playChime(); // plays arpeggio
    setTimeout(() => {
      audioSystem.playChime();
    }, 800);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2000);
  };

  const memories: MemoryItem[] = [
    {
      id: 1,
      type: 'photo',
      label: 'Primeira Foto',
      icon: <FiImage />,
      title: 'Primeira Foto Juntos',
      details: (
        <div className="space-y-4 text-center">
          <div className="rounded-xl overflow-hidden aspect-video border border-white/10 max-w-sm mx-auto">
            <img src={FirstDateImg} alt="Primeira Foto" className="w-full h-full object-cover" />
          </div>
          <p className="text-gray-300 text-sm font-light mt-4">
            "Aquele sorrisinho tímido de quem já sabia, lá no fundo, que estava do lado da pessoa certa para toda a vida."
          </p>
        </div>
      )
    },
    {
      id: 2,
      type: 'chat',
      label: 'Primeira Conversa',
      icon: <FiMessageSquare />,
      title: 'A Primeira Mensagem',
      details: (
        <div className="space-y-4 max-w-xs mx-auto">
          <div className="flex flex-col gap-3 text-xs md:text-sm font-sans">
            <div className="bg-white/5 border border-white/10 text-gray-300 p-3 rounded-2xl rounded-tl-none self-start max-w-[85%] text-left">
              Oi Isabella! Tudo bem? Vi que você gosta de fotografia...
            </div>
            <div className="bg-gold/20 border border-gold/30 text-white p-3 rounded-2xl rounded-tr-none self-end max-w-[85%] text-left">
              Oii! Tudo sim e com você? Ahh, eu amo tirar fotos de paisagens, como você descobriu? haha 🙈
            </div>
            <div className="bg-white/5 border border-white/10 text-gray-300 p-3 rounded-2xl rounded-tl-none self-start max-w-[85%] text-left">
              Chute de sorte! E parece que eu acertei em cheio... 😊
            </div>
          </div>
          <p className="text-gray-400 text-xs italic mt-6 text-center">
            Enviada em 12 de Outubro de 2022 às 19:42.
          </p>
        </div>
      )
    },
    {
      id: 3,
      type: 'audio',
      label: 'Primeiro Áudio',
      icon: <FiMic />,
      title: 'Primeiro Áudio no WhatsApp',
      details: (
        <div className="text-center py-6 space-y-6">
          <p className="text-gray-300 text-sm font-light">
            "Sua voz tímida pela primeira vez saindo da tela do celular..."
          </p>
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={handlePlayProceduralAudio}
              className={`w-14 h-14 rounded-full flex items-center justify-center text-white ${
                isPlayingAudio ? 'bg-gold animate-pulse shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-white/10 hover:bg-gold/30'
              } transition-all duration-300 cursor-pointer`}
            >
              <FiMic className="text-xl" />
            </button>
            <div className="flex gap-[3px] h-6 items-center">
              {[...Array(12)].map((_, i) => (
                <span
                  key={i}
                  className={`w-[3px] bg-gold rounded-full transition-all duration-300 ${
                    isPlayingAudio ? 'h-6 animate-pulse' : 'h-2'
                  }`}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.4s'
                  }}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-400">
            {isPlayingAudio ? "Reproduzindo áudio de 0:08..." : "Clique para ouvir a lembrança"}
          </p>
        </div>
      )
    },
    {
      id: 4,
      type: 'gift',
      label: 'Primeiro Presente',
      icon: <FiGift />,
      title: 'A Primeira Lembrancinha',
      details: (
        <div className="text-center py-4 space-y-4">
          <div className="text-4xl text-gold mb-2">🎁</div>
          <p className="text-white font-cinzel text-sm">O Pingente de Estrela</p>
          <p className="text-gray-300 text-sm font-light max-w-xs mx-auto">
            "Para que você sempre lembre que a sua luz é única no mundo inteiro. Queria te dar algo que combinasse com o brilho dos seus olhos."
          </p>
        </div>
      )
    },
    {
      id: 5,
      type: 'sticker',
      label: 'Primeira Figurinha',
      icon: <FiSmile />,
      title: 'Figurinha de WhatsApp Marcante',
      details: (
        <div className="text-center py-6 space-y-4">
          <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-4xl mx-auto shadow-inner animate-bounce">
            🐱❤️
          </div>
          <p className="text-white font-cinzel text-xs tracking-wider uppercase pt-2">Gatinho Mandando Coração</p>
          <p className="text-gray-400 text-xs italic max-w-xs mx-auto">
            A figurinha que virou nossa marca registrada sempre que nos despedíamos à noite.
          </p>
        </div>
      )
    },
    {
      id: 6,
      type: 'love',
      label: 'Primeiro Eu Te Amo',
      icon: <FiHeart />,
      title: 'O Primeiro "Eu Te Amo"',
      details: (
        <div className="text-center py-4 space-y-6">
          <p className="font-playfair text-xl md:text-2xl text-gold italic">
            "Eu te amo."
          </p>
          <p className="text-gray-300 text-sm font-light max-w-xs mx-auto leading-relaxed">
            Dito sussurrado, na calçada embaixo do poste de luz, sob um céu completamente estrelado. O segundo exato em que o tempo parou e as batidas de nossos corações se sincronizaram.
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
            Guardado a Sete Chaves
          </h2>
          <p className="font-playfair text-3xl md:text-5xl font-light text-white">
            Cápsula do Tempo
          </p>
          <p className="text-xs text-gray-400 mt-4 max-w-sm mx-auto">
            Toque no baú de vidro para abrir as nossas maiores recordações escondidas.
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
            className="w-48 h-48 flex flex-col items-center justify-center glass-panel-gold shadow-[0_0_50px_rgba(212,175,55,0.15)] cursor-pointer relative z-25 hover:shadow-[0_0_60px_rgba(212,175,55,0.35)] transition-all duration-500"
          >
            {/* Holographic lines inside chest */}
            <div className="absolute inset-2 border border-dashed border-gold/10 rounded-2xl pointer-events-none" />

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              className="text-gold text-5xl mb-3 drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]"
            >
              <FiFolder />
            </motion.div>
            
            <span className="font-cinzel text-[10px] tracking-[0.25em] text-gold font-semibold uppercase">
              {isOpen ? 'Fechar Baú' : 'Abrir Baú'}
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
