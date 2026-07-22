import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SecretSpot } from '../components/SecretsOverlay';

export const CounterSection: React.FC = () => {
  // =========================================================================
  // COLOQUE A DATA DE NASCIMENTO DA ISABELLA ABAIXO (Formato: AAAA-MM-DDTHH:MM:SS)
  // Exemplo: 15 de Outubro de 2002, às 08:30 -> '2002-10-15T08:30:00'
  // =========================================================================
  const START_DATE = new Date('2007-07-24T00:00:00').getTime();

  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = Date.now() - START_DATE;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.15,
        duration: 0.8,
        ease: 'easeOut' as any
      }
    })
  };

  const timeUnits = [
    { label: 'Dias', value: timeElapsed.days },
    { label: 'Horas', value: timeElapsed.hours },
    { label: 'Minutos', value: timeElapsed.minutes },
    { label: 'Segundos', value: timeElapsed.seconds }
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-dark-900 px-6 py-32 md:py-40 overflow-hidden">
      {/* Hidden Secret Spot 4 */}
      <SecretSpot id={4} type="star" className="top-1/4 left-12 text-base" />

      {/* Hidden Secret Spot 10 */}
      <SecretSpot id={10} type="heart" className="bottom-10 right-12 text-base" />

      <div className="z-10 text-center max-w-3xl w-full">
        {/* Title block */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold mb-4"
        >
          Celebrando a Sua Existência
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="font-playfair text-3xl md:text-5xl font-light text-white mb-6"
        >
          O mundo é mais iluminado há...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.4 }}
          className="text-xs md:text-sm text-gray-200 leading-relaxed font-light max-w-md mx-auto mb-20 md:mb-24"
        >
          Sua presença traz cor, sentido e alegria infinita para a minha vida. Cada segundo seu na Terra é um motivo de festa.
        </motion.p>

        {/* Counter cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-6 md:p-8 glass-panel-gold shadow-[0_0_30px_rgba(212,175,55,0.1)] relative overflow-hidden"
            >
              {/* Soft gold gradient background flare */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none" />

              {/* Number display with gold gradient */}
              <span className="font-cinzel text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-[#fdf7e7] to-[#e6c173] tracking-tight mb-2 tabular-nums">
                {String(unit.value).padStart(2, '0')}
              </span>
              
              {/* Unit label */}
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold font-medium">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};
export default CounterSection;
