import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { audioSystem } from '../utils/audioSystem';
import { SecretSpot } from '../components/SecretsOverlay';
import { FaHeart } from 'react-icons/fa';

interface LoveCard {
  id: number;
  frontTitle: string;
  backTitle: string;
  description: string;
}

export const LoveCardsSection: React.FC = () => {
  const cardsData: LoveCard[] = [
    {
      id: 1,
      frontTitle: 'Seu Sorriso',
      backTitle: 'Luz no Meu Caminho',
      description: 'O brilho verdadeiro que surge em seus olhos sempre que você sorri de verdade. Sua alegria é contagiante e clareia até os meus dias mais cinzentos.'
    },
    {
      id: 2,
      frontTitle: 'Sua Empatia',
      backTitle: 'Um Coração Raro',
      description: 'A forma atenciosa e genuína com que você se importa com as pessoas ao seu redor. Sua bondade é inspiradora e me faz querer ser alguém melhor.'
    },
    {
      id: 3,
      frontTitle: 'Sua Determinação',
      backTitle: 'Garra e Foco',
      description: 'A persistência inabalável com que você luta pelos seus objetivos. Ver você batalhando pelos seus sonhos me enche de admiração e orgulho.'
    },
    {
      id: 4,
      frontTitle: 'Sua Essência',
      backTitle: 'Autenticidade Pura',
      description: 'Sua personalidade marcante, seus valores e o fato de você ser 100% fiel a si mesma. Você é uma pessoa rara de se encontrar.'
    },
    {
      id: 5,
      frontTitle: 'Sua Mente',
      backTitle: 'Inteligência Fascínio',
      description: 'A forma inteligente e perspicaz como você enxerga o mundo, traz soluções e conversa sobre tudo. Eu poderia passar horas te ouvindo falar.'
    },
    {
      id: 6,
      frontTitle: 'Sua Leveza',
      backTitle: 'Energia Contagiante',
      description: 'A facilidade com que você espalha leveza por onde passa, transformando momentos comuns em memórias cheias de risos e carinho.'
    }
  ];

  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const handleCardClick = (id: number) => {
    setFlippedCards(prev => {
      const isFlipped = prev.includes(id);
      if (isFlipped) {
        return prev.filter(cardId => cardId !== id);
      } else {
        return [...prev, id];
      }
    });

    // Play tactile sound & haptic
    audioSystem.playChime();
    if ('vibrate' in navigator) {
      navigator.vibrate([30, 20]);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-dark-900 px-6 py-32 md:py-40 flex flex-col items-center justify-center overflow-hidden">
      {/* Hidden Secret Spot 12 */}
      <SecretSpot id={12} type="heart" className="top-16 left-1/3 text-lg" />

      <div className="z-10 text-center max-w-5xl w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold mb-4">
            Motivos para Celebrar
          </h2>
          <p className="font-playfair text-3xl md:text-5xl font-light text-white">
            O que Te Torna Única
          </p>
          <p className="text-xs text-gray-200 mt-4 max-w-sm mx-auto leading-relaxed">
            Toque nos cartões para revelar as virtudes especiais que celebramos em você hoje.
          </p>
        </motion.div>

        {/* 3D Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl"
        >
          {cardsData.map((card) => {
            const isFlipped = flippedCards.includes(card.id);

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`flip-card w-full h-56 cursor-pointer transform active:scale-95 transition-all duration-350 ${isFlipped ? 'flipped' : ''}`}
              >
                <div className="flip-card-inner relative w-full h-full duration-700">
                  
                  {/* Front Side */}
                  <div className="flip-card-front absolute inset-0 glass-panel p-6 flex flex-col items-center justify-center text-center shadow-lg hover:border-gold/30 transition-all duration-300">
                    <FaHeart className="text-gold/30 text-3xl mb-4 animate-pulse" />
                    <h3 className="font-cinzel text-sm font-bold tracking-wider text-gray-200">
                      {card.frontTitle}
                    </h3>
                    <span className="text-[9px] uppercase tracking-widest text-gold mt-4 opacity-75">
                      Toque para virar
                    </span>
                  </div>

                  {/* Back Side */}
                  <div className="flip-card-back absolute inset-0 glass-panel-gold p-6 flex flex-col items-center justify-center text-center shadow-xl overflow-hidden bg-dark-800">
                    {/* Small glowing overlay */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-gold/10 to-transparent pointer-events-none" />

                    <h3 className="font-cinzel text-xs font-semibold tracking-widest text-gold mb-3 uppercase">
                      {card.backTitle}
                    </h3>
                    <p className="font-playfair text-xs md:text-sm font-light text-gray-200 leading-relaxed md:leading-loose italic px-2">
                      "{card.description}"
                    </p>
                  </div>

                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};
export default LoveCardsSection;
