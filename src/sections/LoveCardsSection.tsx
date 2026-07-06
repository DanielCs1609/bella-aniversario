import React, { useState } from 'react';
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
      backTitle: 'A Luz da Minha Vida',
      description: 'A forma pura como seus olhos acompanham seu sorriso sempre que você está verdadeiramente feliz. É contagiante e acalma minha alma.'
    },
    {
      id: 2,
      frontTitle: 'Sua Empatia',
      backTitle: 'Um Coração Gigante',
      description: 'O jeito atencioso e amoroso com que você cuida e se preocupa com as pessoas ao seu redor. Sua bondade é inspiradora.'
    },
    {
      id: 3,
      frontTitle: 'Sua Garra',
      backTitle: 'Determinação e Força',
      description: 'A persistência com que você luta pelos seus objetivos. Ver você batalhando pelos seus sonhos me dá orgulho e força.'
    },
    {
      id: 4,
      frontTitle: 'Seu Abraço',
      backTitle: 'O Meu Porto Seguro',
      description: 'Aquele encaixe perfeito onde toda a pressa e ansiedade do mundo exterior simplesmente desaparecem por completo.'
    },
    {
      id: 5,
      frontTitle: 'Sua Inteligência',
      backTitle: 'Brilho Intelectual',
      description: 'A forma fascinante como você enxerga o mundo, traz soluções e conversa sobre tudo. Eu poderia te ouvir falar por horas.'
    },
    {
      id: 6,
      frontTitle: 'Sua Leveza',
      backTitle: 'Nossa Cumplicidade',
      description: 'O fato de podermos ser 100% nós mesmos, rindo de piadas bobas e transformando qualquer tarde comum em um grande momento.'
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
    <section className="relative w-full min-h-screen bg-dark-900 px-6 py-24 flex flex-col items-center justify-center overflow-hidden">
      {/* Hidden Secret Spot 12 */}
      <SecretSpot id={12} type="heart" className="top-16 left-1/3 text-lg" />

      <div className="z-10 text-center max-w-5xl w-full flex flex-col items-center">
        {/* Header */}
        <div className="mb-16">
          <h2 className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold mb-3">
            Razões de Amor
          </h2>
          <p className="font-playfair text-3xl md:text-5xl font-light text-white">
            O que Eu Amo em Você
          </p>
          <p className="text-xs text-gray-400 mt-4 max-w-sm mx-auto">
            Toque nos cartões de veludo para virá-los e revelar o que sinto em meu peito.
          </p>
        </div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {cardsData.map((card) => {
            const isFlipped = flippedCards.includes(card.id);

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`flip-card w-full h-56 cursor-pointer ${isFlipped ? 'flipped' : ''}`}
              >
                <div className="flip-card-inner relative w-full h-full duration-700">
                  
                  {/* Front Side */}
                  <div className="flip-card-front absolute inset-0 rounded-2xl glass-panel border border-white/10 p-6 flex flex-col items-center justify-center text-center shadow-lg hover:border-gold/30 transition-all duration-300">
                    <FaHeart className="text-gold/30 text-3xl mb-4 animate-pulse" />
                    <h3 className="font-cinzel text-sm font-bold tracking-wider text-gray-200">
                      {card.frontTitle}
                    </h3>
                    <span className="text-[9px] uppercase tracking-widest text-gold mt-4 opacity-75">
                      Toque para virar
                    </span>
                  </div>

                  {/* Back Side */}
                  <div className="flip-card-back absolute inset-0 rounded-2xl glass-panel-gold border border-gold/30 p-6 flex flex-col items-center justify-center text-center shadow-xl overflow-hidden bg-dark-800">
                    {/* Small glowing overlay */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-gold/10 to-transparent pointer-events-none" />

                    <h3 className="font-cinzel text-xs font-semibold tracking-widest text-gold mb-3 uppercase">
                      {card.backTitle}
                    </h3>
                    <p className="font-playfair text-xs md:text-sm font-light text-gray-200 leading-relaxed italic px-2">
                      "{card.description}"
                    </p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};
export default LoveCardsSection;
