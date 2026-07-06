import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioSystem } from '../utils/audioSystem';
import { SecretSpot } from '../components/SecretsOverlay';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import FirstDateImg from '../assets/first_date.png';
import FirstTripImg from '../assets/first_trip.png';
import IsabellaPortrait from '../assets/isabella_portrait.png';

interface BookPage {
  id: number;
  date: string;
  title: string;
  text: string;
  image: string;
}

export const BookSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const pages: BookPage[] = [
    {
      id: 1,
      date: 'Capítulo I',
      title: 'O Primeiro Olhar',
      text: 'Não sei se foi a doçura do seu olhar ou o jeito calmo que você sorriu pra mim. Mas naquela noite, percebi que existia algo diferente em você, uma energia que me puxava e me fazia querer conhecer cada detalhe da sua mente.',
      image: IsabellaPortrait
    },
    {
      id: 2,
      date: 'Capítulo II',
      title: 'A Sintonia Silenciosa',
      text: 'O que mais me impressiona é a facilidade com que nos entendemos. Até nos silêncios, há conforto. A gente conversa com os olhos e divide risadas sem precisar dizer uma única palavra. É uma conexão de almas.',
      image: FirstDateImg
    },
    {
      id: 3,
      date: 'Capítulo III',
      title: 'Colecionando Sorrisos',
      text: 'Cada piada boba, cada viagem de carro cantando alto, cada momento simples no sofá. O amor não está nas grandes promessas, mas na beleza desses momentos comuns que se tornam extraordinários porque são vividos com você.',
      image: FirstTripImg
    },
    {
      id: 4,
      date: 'Capítulo IV',
      title: 'O Meu Porto Seguro',
      text: 'Obrigado por ser meu apoio nos dias difíceis e meu sorriso nos dias felizes. Você é a minha estabilidade, meu abraço que acalma a tempestade e a certeza de que tudo vai ficar bem no final. Eu te amo por quem você é.',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setIsFlipped(true);
      audioSystem.playPageFlip();
      if ('vibrate' in navigator) navigator.vibrate(25);
      
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipped(false);
      }, 400); // sync with animation half-point
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setIsFlipped(true);
      audioSystem.playPageFlip();
      if ('vibrate' in navigator) navigator.vibrate(25);
      
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipped(false);
      }, 400);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-dark-900 px-6 py-32 md:py-40 flex flex-col items-center justify-center overflow-hidden">
      {/* Hidden Secret Spot 10 */}
      <SecretSpot id={10} type="flower" className="bottom-12 left-12 text-sm" />

      <div className="z-10 text-center max-w-4xl w-full flex flex-col items-center">
        {/* Section Title */}
        <div className="mb-24">
          <h2 className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold mb-4">
            Nossas Memórias Escritas
          </h2>
          <p className="font-playfair text-3xl md:text-5xl font-light text-white">
            Livro de Histórias
          </p>
        </div>

        {/* Realistic Book Container */}
        <div className="relative w-full max-w-md md:max-w-2xl page-flip-container aspect-[3/4] md:aspect-[1.4/1] glass-panel-gold shadow-2xl p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 overflow-hidden">
          
          {/* Subtle central binder shading for book feeling */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-r from-black/45 via-gold/15 to-black/45 z-20" />

          {/* Page flip animation wrapper */}
          <div className="flex flex-col md:flex-row w-full h-full gap-6 md:gap-8 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, rotateY: isFlipped ? 90 : -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: isFlipped ? -90 : 90 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                className="w-full h-full flex flex-col md:flex-row gap-6 md:gap-8"
              >
                {/* Left side (Image) */}
                <div className="flex-1 rounded-xl overflow-hidden aspect-[4/3] md:aspect-auto border border-white/5 relative">
                  <img 
                    src={pages[currentPage].image} 
                    alt={pages[currentPage].title} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Right side (Text description) */}
                <div className="flex-1 flex flex-col justify-center text-left">
                  <span className="font-cinzel text-xs text-gold uppercase tracking-widest block mb-1">
                    {pages[currentPage].date}
                  </span>
                  
                  <h3 className="font-cinzel text-lg md:text-xl font-bold text-white mb-4">
                    {pages[currentPage].title}
                  </h3>

                  <p className="font-playfair text-sm md:text-base italic font-light text-gray-300 leading-relaxed md:leading-loose mb-6">
                    "{pages[currentPage].text}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Decorative page lines texture */}
          <div className="absolute right-2 top-0 bottom-0 w-[4px] bg-white/5" />
          <div className="absolute left-2 top-0 bottom-0 w-[4px] bg-white/5" />
        </div>

        {/* Book Navigation controls */}
        <div className="flex items-center gap-6 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`p-3.5 rounded-full border border-gold/30 text-gold transition-all duration-300 transform ${
              currentPage === 0 ? 'opacity-35 cursor-not-allowed' : 'hover:bg-gold/15 active:scale-90 cursor-pointer hover:border-gold shadow-[0_4px_12px_rgba(212,175,55,0.15)]'
            }`}
            title="Página Anterior"
          >
            <FiChevronLeft size={20} />
          </button>
          
          <span className="font-cinzel text-xs text-gray-400 tracking-widest">
            {currentPage + 1} / {pages.length}
          </span>
          
          <button
            onClick={handleNext}
            disabled={currentPage === pages.length - 1}
            className={`p-3.5 rounded-full border border-gold/30 text-gold transition-all duration-300 transform ${
              currentPage === pages.length - 1 ? 'opacity-35 cursor-not-allowed' : 'hover:bg-gold/15 active:scale-90 cursor-pointer hover:border-gold shadow-[0_4px_12px_rgba(212,175,55,0.15)]'
            }`}
            title="Próxima Página"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};
export default BookSection;
