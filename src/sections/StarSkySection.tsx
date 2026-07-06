import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioSystem } from '../utils/audioSystem';
import { SecretSpot } from '../components/SecretsOverlay';
import { FaStar } from 'react-icons/fa';

interface QualityStar {
  id: number;
  label: string;
  description: string;
  x: number; // percentage
  y: number; // percentage
}

export const StarSkySection: React.FC = () => {
  const [selectedStar, setSelectedStar] = useState<QualityStar | null>(null);

  const qualities: QualityStar[] = [
    {
      id: 1,
      label: 'Seu Sorriso',
      description: 'O som da sua risada é o meu som favorito, e ver você sorrindo ilumina até os dias mais nublados.',
      x: 35,
      y: 25
    },
    {
      id: 2,
      label: 'Sua Força',
      description: 'A determinação e garra com que você encara a vida me inspiram todos os dias a ser uma pessoa melhor.',
      x: 65,
      y: 20
    },
    {
      id: 3,
      label: 'Sua Inteligência',
      description: 'Amo como você resolve problemas, conversa sobre qualquer assunto e enxerga o mundo de forma tão rica.',
      x: 20,
      y: 45
    },
    {
      id: 4,
      label: 'Seu Coração',
      description: 'Sua bondade é imensa, sem limites. Você ama de forma sincera, pura e acolhedora.',
      x: 80,
      y: 40
    },
    {
      id: 5,
      label: 'Sua Essência',
      description: 'A pureza da sua alma e a energia linda que você irradia. Você é uma pessoa rara e o meu maior privilégio é poder dividir a vida com você.',
      x: 40,
      y: 70
    },
    {
      id: 6,
      label: 'Seu Jeito de Cuidar',
      description: 'A sua dedicação sincera, atenta e amorosa em ver todos ao seu redor bem e protegidos.',
      x: 60,
      y: 65
    }
  ];

  const handleStarClick = (star: QualityStar) => {
    setSelectedStar(star);
    audioSystem.playChime();
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-dark-900 px-6 py-32 md:py-40 flex flex-col items-center justify-center overflow-hidden">
      {/* Hidden Secret Spot 9 */}
      <SecretSpot id={9} type="star" className="top-12 left-1/4 text-sm" />

      <div className="z-10 text-center max-w-4xl w-full flex flex-col items-center">
        {/* Title */}
        <div className="mb-24">
          <h2 className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold mb-4">
            O Universo de Isabella
          </h2>
          <p className="font-playfair text-3xl md:text-5xl font-light text-white">
            Céu de Estrelas
          </p>
          <p className="text-xs text-gray-400 mt-4 max-w-sm mx-auto">
            Clique nas estrelas brilhantes para revelar as qualidades que me fazem te amar cada dia mais.
          </p>
        </div>

        {/* Constellation Canvas area */}
        <div className="relative w-full aspect-[4/3] max-w-2xl bg-black/40 rounded-3xl border border-white/5 shadow-2xl overflow-hidden min-h-[350px]">
          
          {/* SVG Constellation connector lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            {qualities.map((star, idx) => {
              const nextStar = qualities[(idx + 1) % qualities.length];
              return (
                <line
                  key={idx}
                  x1={`${star.x}%`}
                  y1={`${star.y}%`}
                  x2={`${nextStar.x}%`}
                  y2={`${nextStar.y}%`}
                  stroke="#d4af37"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              );
            })}
          </svg>

          {/* Interactive Stars */}
          {qualities.map((star) => {
            const isSelected = selectedStar?.id === star.id;

            return (
              <div
                key={star.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
                onClick={() => handleStarClick(star)}
              >
                {/* Glowing Concentric rings for active state */}
                {isSelected && (
                  <>
                    <span className="absolute -inset-4 rounded-full border border-gold/40 animate-ping opacity-75" />
                    <span className="absolute -inset-8 rounded-full border border-gold/10 animate-pulse" />
                  </>
                )}

                {/* The Star Element */}
                <motion.div
                  animate={{
                    scale: isSelected ? 1.6 : [1, 1.25, 1],
                    color: isSelected ? '#d4af37' : '#ffffff'
                  }}
                  transition={{
                    scale: isSelected 
                      ? { duration: 0.3 } 
                      : { duration: 3 + (star.id % 2), repeat: Infinity, ease: 'easeInOut' }
                  }}
                  className="text-white hover:text-gold text-lg md:text-xl drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] filter group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,1)] transition-all duration-300"
                >
                  <FaStar />
                </motion.div>

                {/* Floating Tooltip Label */}
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-6 text-[8px] md:text-[10px] font-cinzel text-gray-400 tracking-wider whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity">
                  {star.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Quality text presentation panel */}
        <div className="h-44 w-full max-w-xl mt-8">
          <AnimatePresence mode="wait">
            {selectedStar ? (
              <motion.div
                key={selectedStar.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="p-8 glass-panel-gold shadow-xl"
              >
                <h3 className="font-cinzel text-gold text-sm tracking-widest uppercase mb-3 font-semibold">
                  {selectedStar.label}
                </h3>
                <p className="font-playfair text-base md:text-lg italic text-gray-200 font-light leading-relaxed">
                  "{selectedStar.description}"
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                className="p-6 rounded-2xl border border-dashed border-white/10 flex items-center justify-center h-full"
              >
                <span className="font-cinzel text-xs text-gray-400 tracking-widest uppercase">
                  Selecione uma qualidade para acender a estrela
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};
export default StarSkySection;
