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
      icon: <FiTrendingUp />,
      title: 'Sucesso e Conquistas',
      description: 'Que este novo ciclo traga o reconhecimento que você tanto merece. Que os seus planos decolam, seus projetos profissionais cresçam e você alcance tudo o que a sua inteligência brilhante merece.'
    },
    {
      id: 2,
      icon: <FiCompass />,
      title: 'Viagens e Descobertas',
      description: 'Que você conheça lugares novos incríveis, sinta a brisa de mares distantes e viva aventuras inesquecíveis, enchendo sua galeria com fotos espetaculares.'
    },
    {
      id: 3,
      icon: <FiHome />,
      title: 'Lar e Aconchego',
      description: 'Desejo que o seu cantinho seja sempre um porto seguro de calmaria, repleto de risadas, cheiro de café fresco e a paz de um refúgio acolhedor.'
    },
    {
      id: 4,
      icon: <FiSmile />,
      title: 'Sorrisos e Leveza',
      description: 'Que nunca falte motivo para você dar aquela sua gargalhada contagiante. Que sua rotina seja cheia de momentos alegres e piadas bobas que fazem tudo valer a pena.'
    },
    {
      id: 5,
      icon: <FiUsers />,
      title: 'Apoio e Parceria',
      description: 'Que você se sinta sempre protegida, amada e com a certeza absoluta de que, em cada vitória ou momento de dúvida, eu estarei aqui para te apoiar e te aplaudir de pé.'
    }
  ];

  return (
    <section className="relative w-full bg-dark-900 px-6 py-32 md:py-40 overflow-hidden">
      {/* Hidden Secret Spot 13 */}
      <SecretSpot id={13} type="star" className="top-10 left-12 text-base" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold mb-4">
            Seus Próximos Capítulos
          </h2>
          <p className="font-playfair text-3xl md:text-5xl font-light text-white">
            Caminhos para o Novo Ciclo
          </p>
          <p className="text-xs text-gray-400 mt-4 max-w-sm mx-auto">
            Role para acender os desejos e conquistas que te esperam neste seu novo ano de vida.
          </p>
        </div>

        {/* The Central Path Line */}
        <div className="absolute left-6 md:left-1/2 top-48 bottom-12 w-[2px] -translate-x-[1px] bg-gradient-to-b from-gold via-blue-500/50 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.4)] border-dashed border-gold/20" />

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
                    initial={{ opacity: 0, y: 30, scale: 0.95, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ type: 'spring', stiffness: 50, damping: 14, duration: 1.2 }}
                    className="p-6 glass-panel-gold shadow-xl relative overflow-hidden"
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};
export default FutureSection;
