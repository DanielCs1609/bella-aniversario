import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiZoomIn, FiZoomOut, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { SecretSpot } from '../components/SecretsOverlay';
import FirstDateImg from '../assets/galeria/first_date.png';
import FirstTripImg from '../assets/galeria/first_trip.png';
import IsabellaPortrait from '../assets/galeria/isabella_portrait.png';

interface PhotoItem {
  id: number;
  url: string;
  category: 'us' | 'you' | 'funny' | 'favorites' | 'family' | 'trips';
  title: string;
  subtitle: string;
}

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'us' | 'you' | 'funny' | 'favorites' | 'family' | 'trips'>('us');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState(1);

  // Curated premium, aesthetic, high-resolution photography mixed with our custom generated assets
  const photos: PhotoItem[] = [
    // Us
    {
      id: 1,
      url: FirstDateImg,
      category: 'us',
      title: 'Nosso Primeiro Dia',
      subtitle: 'Quando tudo começou a fazer sentido'
    },
    {
      id: 2,
      url: FirstTripImg,
      category: 'us',
      title: 'De Mãos Dadas',
      subtitle: 'Caminhando na mesma direção'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
      category: 'us',
      title: 'Abraço Quente',
      subtitle: 'Meu lugar favorito no mundo'
    },
    // You
    {
      id: 4,
      url: IsabellaPortrait,
      category: 'you',
      title: 'Minha Isabella',
      subtitle: 'A luz que guia meus passos'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
      category: 'you',
      title: 'Seu Sorriso',
      subtitle: 'Capaz de iluminar a noite mais escura'
    },
    // Funny
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      category: 'funny',
      title: 'Bobeiras Nossas',
      subtitle: 'Fazendo caretas para o tempo'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
      category: 'funny',
      title: 'A Risada Mais Sincera',
      subtitle: 'Capturada no momento perfeito'
    },
    // Favorites
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
      category: 'favorites',
      title: 'Olhar de Ouro',
      subtitle: 'A foto que eu nunca canso de olhar'
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      category: 'favorites',
      title: 'Sob a Luz Dourada',
      subtitle: 'Um entardecer inesquecível'
    },
    // Family
    {
      id: 10,
      url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
      category: 'family',
      title: 'Nossa Base',
      subtitle: 'Amor que transborda e se multiplica'
    },
    // Trips
    {
      id: 11,
      url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
      category: 'trips',
      title: 'Na Estrada',
      subtitle: 'Descobrindo novos horizontes ao seu lado'
    },
    {
      id: 12,
      url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
      category: 'trips',
      title: 'Pôr do Sol no Mar',
      subtitle: 'O mundo parou por alguns segundos'
    }
  ];

  const filteredPhotos = photos.filter(p => p.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setZoomScale(1);
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    setZoomScale(1);
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    setZoomScale(1);
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  };

  const categoriesList = [
    { id: 'us', label: 'Nós Dois' },
    { id: 'you', label: 'Você' },
    { id: 'funny', label: 'Engraçadas' },
    { id: 'favorites', label: 'Favoritas' },
    { id: 'family', label: 'Família' },
    { id: 'trips', label: 'Viagens' }
  ] as const;

  return (
    <section className="relative w-full min-h-screen bg-dark-900 px-6 py-32 md:py-40 overflow-hidden">
      {/* Hidden Secret Spot 7 */}
      <SecretSpot id={7} type="star" className="top-16 left-20 text-base" />

      {/* Hidden Secret Spot 11 */}
      <SecretSpot id={11} type="flower" className="bottom-20 right-20 text-base" />

      <div className="max-w-6xl mx-auto z-10 relative">
        {/* Title */}
        <div className="text-center mb-24">
          <h2 className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold mb-4">
            Homenagem Em Fotos
          </h2>
          <p className="font-playfair text-3xl md:text-5xl font-light text-white">
            O Seu Brilho em Cada Registro
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-2xl mx-auto">
          {categoriesList.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                if ('vibrate' in navigator) navigator.vibrate(15);
              }}
              className={`px-5 py-2.5 rounded-full font-cinzel text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer transform active:scale-95 border ${
                activeCategory === cat.id
                  ? 'bg-gold text-dark-900 font-bold border-gold shadow-[0_4px_15px_rgba(212,175,55,0.3)]'
                  : 'bg-white/5 text-gray-400 hover:text-white border-white/5 hover:border-gold/30 shadow-[0_4px_10px_rgba(0,0,0,0.15)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Mosaic Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[240px]"
        >
          {filteredPhotos.map((photo, index) => {
            // Generates simple pseudo-random spans to make a beautiful mosaic layout
            const isTall = index % 3 === 0;
            const isWide = index % 4 === 2;

            return (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6 }}
                onClick={() => openLightbox(index)}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 cursor-pointer shadow-xl ${
                  isTall ? 'md:row-span-2' : ''
                } ${isWide ? 'md:col-span-2' : ''}`}
              >
                {/* Image */}
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                {/* Text Details */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[9px] font-cinzel tracking-widest text-gold uppercase block mb-1">
                    {photo.subtitle}
                  </span>
                  <h3 className="font-playfair text-lg text-white font-medium">
                    {photo.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/98 backdrop-blur-xl flex items-center justify-center p-4 select-none">
            {/* Top Toolbar */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 text-white">
              {/* Close Button on the left */}
              <button
                onClick={closeLightbox}
                className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer text-white transition-all transform active:scale-95 flex items-center justify-center"
                title="Fechar"
              >
                <FiX size={20} />
              </button>

              {/* Counter in the center */}
              <span className="font-cinzel text-xs tracking-widest text-gray-400 absolute left-1/2 -translate-x-1/2">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </span>
              
              {/* Zoom buttons shifted left to avoid collision with AmbientMusicToggle */}
              <div className="flex gap-3 mr-14">
                <button
                  onClick={() => setZoomScale(s => Math.min(s + 0.5, 3))}
                  className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer text-white transition-all transform active:scale-95"
                  title="Aumentar Zoom"
                >
                  <FiZoomIn size={18} />
                </button>
                <button
                  onClick={() => setZoomScale(s => Math.max(s - 0.5, 1))}
                  className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer text-white transition-all transform active:scale-95"
                  title="Diminuir Zoom"
                >
                  <FiZoomOut size={18} />
                </button>
              </div>
            </div>

            {/* Left Button */}
            <button
              onClick={prevPhoto}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3.5 bg-white/5 hover:bg-white/15 text-white rounded-full z-10 transition-colors cursor-pointer hidden md:block"
            >
              <FiChevronLeft size={24} />
            </button>

            {/* Lightbox Content Container */}
            <div className="w-full h-full flex flex-col items-center justify-center relative">
              {/* Swipe/Drag gesture area */}
              <motion.div
                key={lightboxIndex}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -100) nextPhoto();
                  if (info.offset.x > 100) prevPhoto();
                }}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="relative flex items-center justify-center max-w-full max-h-[75vh]"
              >
                <motion.img
                  src={filteredPhotos[lightboxIndex].url}
                  alt={filteredPhotos[lightboxIndex].title}
                  style={{ scale: zoomScale }}
                  className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl transition-transform duration-250 cursor-grab active:cursor-grabbing"
                  loading="lazy"
                />
              </motion.div>

              {/* Title Overlay */}
              <div className="absolute bottom-8 text-center text-white px-6">
                <p className="text-[10px] font-cinzel tracking-widest text-gold uppercase mb-1">
                  {filteredPhotos[lightboxIndex].subtitle}
                </p>
                <h2 className="font-playfair text-xl md:text-2xl font-light">
                  {filteredPhotos[lightboxIndex].title}
                </h2>
              </div>
            </div>

            {/* Right Button */}
            <button
              onClick={nextPhoto}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3.5 bg-white/5 hover:bg-white/15 text-white rounded-full z-10 transition-colors cursor-pointer hidden md:block"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};
export default GallerySection;
