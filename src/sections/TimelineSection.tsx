import React from 'react';
import { motion } from 'framer-motion';
import { SecretSpot } from '../components/SecretsOverlay';
import FirstDateImg from '../assets/first_date.png';
import FirstTripImg from '../assets/first_trip.png';
import IsabellaPortrait from '../assets/isabella_portrait.png';

interface TimelineMoment {
  id: number;
  date: string;
  title: string;
  description: string;
  image?: string;
  gradient?: string;
}

export const TimelineSection: React.FC = () => {
  const moments: TimelineMoment[] = [
    {
      id: 1,
      date: 'A Essência',
      title: 'A Luz que Você Irradia',
      description: 'Desde que chegou ao mundo, você trouxe consigo uma doçura e uma energia única. É impossível passar por você e não ser tocado pela sua luz e pelo seu carisma natural.',
      gradient: 'from-blue-900/40 to-indigo-900/40'
    },
    {
      id: 2,
      date: 'A Determinação',
      title: 'Sua Força Admirável',
      description: 'Uma das coisas que mais me dão orgulho é ver a mulher forte, independente e focada que você se tornou. Você encara qualquer desafio de cabeça erguida e corre atrás dos seus sonhos com uma garra inspiradora.',
      image: FirstDateImg
    },
    {
      id: 3,
      date: 'A Empatia',
      title: 'Um Coração Puro',
      description: 'A sua generosidade e a forma atenta como você cuida de quem ama são raras. Você coloca amor e dedicação em cada pequeno detalhe, tornando a vida de todos ao seu redor mais leve e feliz.',
      gradient: 'from-amber-900/40 to-yellow-950/40'
    },
    {
      id: 4,
      date: 'A Alegria',
      title: 'O Seu Sorriso Lindo',
      description: 'O som da sua risada é capaz de mudar o meu dia inteiro. O seu bom humor espontâneo e o seu jeito alegre de levar a vida são contagiantes e fazem qualquer momento parecer mágico.',
      image: IsabellaPortrait
    },
    {
      id: 5,
      date: 'O Novo Ciclo',
      title: 'Celebrando Você',
      description: 'Hoje iniciamos um novo capítulo da sua história. Desejo que seu novo ano seja espetacular, cheio de conquistas, saúde e paz. E que eu possa estar sempre ao seu lado celebrando e apoiando cada passo seu.',
      image: FirstTripImg
    }
  ];

  return (
    <section className="relative w-full bg-dark-900 px-6 py-32 md:py-40 overflow-hidden">
      {/* Hidden Secret Spot 5 */}
      <SecretSpot id={5} type="butterfly" className="top-10 right-16 text-lg" />
      {/* Hidden Secret Spot 6 */}
      <SecretSpot id={6} type="flower" className="bottom-24 left-6 text-sm" />

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold mb-4">
            Sua Jornada de Brilho
          </h2>
          <p className="font-playfair text-3xl md:text-5xl font-light text-white">
            Os Seus Capítulos Mais Lindos
          </p>
        </div>

        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-32 bottom-8 w-[2px] -translate-x-[1px] bg-gradient-to-b from-blue-600 via-gold to-transparent shadow-[0_0_12px_rgba(212,175,55,0.5)]" />

        {/* Moments List */}
        <div className="space-y-12 md:space-y-16">
          {moments.map((moment, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={moment.id}
                className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full"
              >
                {/* Timeline Dot Indicator */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-dark-900 border-2 border-gold -translate-x-[7px] z-10 shadow-[0_0_8px_rgba(212,175,55,0.8)] animate-pulse" />

                {/* Spacer or Content depending on desktop grid */}
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:order-1' : 'md:order-2 md:text-left'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30, y: 30, filter: 'blur(5px)' }}
                    whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 15, duration: 1.2 }}
                    className="p-6 md:p-8 glass-panel-gold shadow-xl relative overflow-hidden"
                  >
                    {/* Glowing highlight */}
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-gold via-blue-500 to-transparent" />

                    <span className="font-cinzel text-xs font-semibold tracking-wider text-gold block mb-2">
                      {moment.date}
                    </span>
                    
                    <h3 className="font-cinzel text-lg md:text-xl font-bold text-white mb-4">
                      {moment.title}
                    </h3>
                    
                    <p className="text-gray-300 font-light text-sm leading-relaxed mb-6">
                      {moment.description}
                    </p>

                    {/* Card Image or Gradient Box */}
                    {moment.image ? (
                      <div className="overflow-hidden rounded-2xl aspect-video border border-white/5 relative">
                        <img 
                          src={moment.image} 
                          alt={moment.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
                      </div>
                    ) : (
                      <div className={`w-full aspect-video rounded-2xl bg-gradient-to-br ${moment.gradient} border border-white/5 flex items-center justify-center`}>
                        <span className="font-cinzel text-xs uppercase tracking-widest text-gold/60">
                          Memória Guardada
                        </span>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Empty spacer for alignment on desktop */}
                <div className={`hidden md:block w-[45%] ${isEven ? 'order-2' : 'order-1'}`} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};
export default TimelineSection;
