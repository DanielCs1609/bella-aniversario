import React from 'react';
import { motion } from 'framer-motion';
import { SecretSpot } from '../components/SecretsOverlay';
import { FiCompass, FiHome, FiTrendingUp, FiSmile, FiUsers } from 'react-icons/fi';

interface FutureMilestone {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FutureSection: React.FC = () => {
  const milestones: FutureMilestone[] = [
    {
      id: 1,
      icon: <FiCompass />,
      title: 'Nossa Próxima Viagem',
      description: 'Explorar novas cidades, desbravar praias desertas, provar temperos exóticos e ver o sol se pôr em horizontes distantes, de mãos dadas.'
    },
    {
      id: 2,
      icon: <FiHome />,
      title: 'A Nossa Casa',
      description: 'Um refúgio com a nossa cara, decorado com risadas, repleto de plantas na janela, cheiro de café passado e a paz de sabermos que pertencemos um ao outro.'
    },
    {
      id: 3,
      icon: <FiTrendingUp />,
      title: 'Crescimento Mútuo',
      description: 'Apoiar os projetos profissionais um do outro, comemorando cada conquista e servindo de alicerce seguro nas horas de dúvida.'
    },
    {
      id: 4,
      icon: <FiSmile />,
      title: 'Coleção Infinita de Memórias',
      description: 'Envelhecer dividindo piadas, tirando fotos engraçadas e descobrindo que o amor se renova em cada abraço apertado de bom dia.'
    },
    {
      id: 5,
      icon: <FiUsers />,
      title: 'Nossa Própria Família',
      description: 'Criar uma história de cumplicidade que se estende ao longo das décadas, com a certeza de que nossa base é inabalável e regada de carinho.'
    }
  ];

  return (
    <section className="relative w-full bg-dark-900 px-6 py-24 overflow-hidden">
      {/* Hidden Secret Spot 13 */}
      <SecretSpot id={13} type="star" className="top-10 left-12 text-base" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold mb-3">
            O Amanhã Juntos
          </h2>
          <p className="font-playfair text-3xl md:text-5xl font-light text-white">
            Nossa Estrada do Futuro
          </p>
          <p className="text-xs text-gray-400 mt-4 max-w-sm mx-auto">
            Role para acender os caminhos dos sonhos que vamos realizar lado a lado.
          </p>
        </div>

        {/* The Central Path Line */}
        <div className="absolute left-6 md:left-1/2 top-48 bottom-12 w-[2px] -translate-x-[1px] bg-gradient-to-b from-gold via-blue-500/50 to-transparent shadow-[0_0_15px_rgba(212,175,55,0.2)] border-dashed border-gold/20" />

        {/* Milestone Steps */}
        <div className="space-y-24">
          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={item.id}
                className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full"
              >
                {/* Node Ring */}
                <div className="absolute left-6 md:left-1/2 w-6 h-6 rounded-full bg-dark-900 border-2 border-gold -translate-x-[11px] z-10 flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                </div>

                {/* Content Block */}
                <div className={`w-full md:w-[44%] pl-16 md:pl-0 ${isEven ? 'md:order-1' : 'md:order-2 md:text-left'}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="p-6 rounded-2xl glass-panel-gold border border-gold/15 shadow-xl relative overflow-hidden"
                  >
                    {/* Background flare */}
                    <div className="absolute -top-10 -left-10 w-24 h-24 bg-gold/5 blur-xl pointer-events-none" />

                    {/* Icon header */}
                    <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center text-lg mb-4 border border-gold/20 shadow-inner">
                      {item.icon}
                    </div>

                    <h3 className="font-cinzel text-sm font-bold text-white mb-2 tracking-wide">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-300 font-light text-xs md:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                {/* Spacer for desktop alignment */}
                <div className={`hidden md:block w-[44%] ${isEven ? 'order-2' : 'order-1'}`} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};
export default FutureSection;
