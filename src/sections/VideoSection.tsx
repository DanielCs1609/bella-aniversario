import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioSystem } from '../utils/audioSystem';
import { SecretSpot } from '../components/SecretsOverlay';
import { FiPlay, FiCheckCircle, FiX } from 'react-icons/fi';

import RebecaVideo from '../assets/videos/RebecaAmiga.mov';

import CapaAnaAvó from '../assets/fotosCapa/capaAnaAvó.jpg';
import CapaAnaClara from '../assets/fotosCapa/capaAnaClara.jpg';
import CapaAnaJulia from '../assets/fotosCapa/capaAnaJulia.jpg';
import CapaAngelo from '../assets/fotosCapa/capaAngelo.jpg';
import CapaCriancas from '../assets/fotosCapa/capaCrianças.jpg';
import CapaDaniel from '../assets/fotosCapa/capaDaniel.jpg';
import CapaJuliaViana from '../assets/fotosCapa/capaJuliaViana.png';
import CapaMaria from '../assets/fotosCapa/capaMaria.jpg';
import CapaPatricia from '../assets/fotosCapa/capaPatricia.jpg';
import CapaRebeca from '../assets/fotosCapa/capaRebeca.jpg';

interface VideoMessage {
  id: number;
  name: string;
  relation: string;
  quote: string;
  photoUrl: string;
  videoUrl: string;
}

export const VideoSection: React.FC = () => {
  const videoMessages: VideoMessage[] = [
    {
      id: 1,
      name: 'Júlia Viana',
      relation: 'Amiga',
      quote: 'Menina que traz alegria onde está.',
      photoUrl: CapaJuliaViana,
      videoUrl: 'https://youtu.be/bdDhSnm0k8U'
    },
    {
      id: 2,
      name: 'Ana Clara',
      relation: 'Amiga',
      quote: 'Parabéns, Bella! Que seu dia seja tão lindo e especial quanto você é.',
      photoUrl: CapaAnaClara,
      videoUrl: 'https://youtu.be/XMPMU5HGsK0'
    },
    {
      id: 3,
      name: 'Rebeca',
      relation: 'Amiga',
      quote: 'Muitas felicidade, muitos anos de vida.',
      photoUrl: CapaRebeca,
      videoUrl: RebecaVideo
    },
    {
      id: 4,
      name: 'Maria Fernanda',
      relation: 'Irmã',
      quote: 'Ele tem grandes projetos para sua vida.',
      photoUrl: CapaMaria,
      videoUrl: 'https://youtu.be/q1jbuyFguCU'
    },
    {
      id: 5,
      name: 'Ana Júlia',
      relation: 'Irmã',
      quote: 'É uma honra ser sua irmã.',
      photoUrl: CapaAnaJulia,
      videoUrl: 'https://youtu.be/-cHmseLZX_8'
    },
    {
      id: 6,
      name: 'Gabriel',
      relation: 'Irmão',
      quote: 'Você deu orgulho pra família toda.',
      photoUrl: '',
      videoUrl: 'https://youtu.be/CBe7HDBz8Ng'
    },
    {
      id: 7,
      name: 'Angélica, Alice & Aline',
      relation: 'Irmãs',
      quote: 'Jesus cuida de vocês.',
      photoUrl: CapaCriancas,
      videoUrl: 'https://youtu.be/4wNRxs51ibQ'
    },
    {
      id: 8,
      name: 'Ana (Avó)',
      relation: 'Avó',
      quote: 'Você é a minha menina linda, doce que tá no meu coração.',
      photoUrl: CapaAnaAvó,
      videoUrl: 'https://youtu.be/I_O9q7r6CGM'
    },
    {
      id: 9,
      name: 'Ângelo',
      relation: 'Pai',
      quote: 'Você vai ser uma mulher muito vitoriosa.',
      photoUrl: CapaAngelo,
      videoUrl: 'https://youtu.be/yrYCjc8l5rc'
    },
    {
      id: 10,
      name: 'Patrícia',
      relation: 'Mãe',
      quote: 'Que seu caminho seja sempre iluminado de amor e paz. Eu te amo muito, minha filha!',
      photoUrl: CapaPatricia,
      videoUrl: 'https://youtu.be/jzHxtvc2Y48'
    },
    {
      id: 11,
      name: 'Daniel',
      relation: 'Namorado',
      quote: 'Você conseguiu fazer uma coisa simples ficar cada vez mais importante e especial',
      photoUrl: CapaDaniel,
      videoUrl: 'https://youtu.be/RYjAU2e_Fq8'
    }
  ];

  const [activeVideo, setActiveVideo] = useState<VideoMessage | null>(null);
  const [watchedVideos, setWatchedVideos] = useState<number[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const handlePlayVideo = (msg: VideoMessage) => {
    setActiveVideo(msg);
    audioSystem.stopMusic(); // Stop background music when playing a video
    audioSystem.playVideoSound();
    if ('vibrate' in navigator) {
      navigator.vibrate(40);
    }
  };

  const handleVideoEnded = () => {
    if (!activeVideo) return;
    
    // Add current video to watched list if not already there
    const updatedWatched = [...watchedVideos];
    if (!updatedWatched.includes(activeVideo.id)) {
      updatedWatched.push(activeVideo.id);
      setWatchedVideos(updatedWatched);
    }

    // Play soft chime
    audioSystem.playChime();

    // Check if all are watched
    if (updatedWatched.length === videoMessages.length) {
      setShowCelebration(true);
      setActiveVideo(null);
      audioSystem.playMusic(); // Resume background music on completion
      return;
    }

    // Move to next video automatically
    const currentIndex = videoMessages.findIndex(v => v.id === activeVideo.id);
    const nextIndex = (currentIndex + 1) % videoMessages.length;
    
    // Smooth delay before playing next video
    setTimeout(() => {
      setActiveVideo(videoMessages[nextIndex]);
      audioSystem.playVideoSound();
    }, 1500);
  };

  const handleClosePlayer = () => {
    setActiveVideo(null);
    audioSystem.playClick();
    audioSystem.playMusic(); // Resume background music when closing player
  };

  const handleCloseCelebration = () => {
    setShowCelebration(false);
    audioSystem.playClick();
    audioSystem.playMusic(); // Resume background music when closing celebration
    setTimeout(() => {
      document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  return (
    <section className="relative w-full min-h-screen bg-dark-900 px-6 py-32 md:py-40 flex flex-col items-center justify-center overflow-hidden">
      {/* Hidden Secret Spot 14 */}
      <SecretSpot id={14} type="flower" className="bottom-16 right-20 text-sm" />

      {/* Hidden Secret Spot 13 */}
      <SecretSpot id={13} type="heart" className="top-20 left-20 text-sm" />

      <div className="z-10 text-center max-w-5xl w-full flex flex-col items-center">
        {/* Header */}
        <div className="mb-24">
          <h2 className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold mb-4">
            Amor Compartilhado
          </h2>
          <p className="font-playfair text-3xl md:text-5xl font-light text-white">
            Mensagens Para Você
          </p>
          <p className="text-xs text-gray-400 mt-4 max-w-sm mx-auto">
            Pessoas especiais que quiseram deixar um pedaço do carinho delas gravado para o seu dia.
          </p>
        </div>

        {/* Video Cards Centered Grid */}
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
            {videoMessages.map((msg) => {
              const isWatched = watchedVideos.includes(msg.id);

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative glass-panel p-5 flex flex-col justify-between items-center text-center shadow-lg hover:border-gold/30 transition-all duration-300 transform active:scale-[0.98] group"
                >
                  {/* Watched Badge */}
                  {isWatched && (
                    <span className="absolute top-3 right-3 text-gold text-sm" title="Visto">
                      <FiCheckCircle />
                    </span>
                  )}

                  {/* Portrait Circle */}
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold/30 mb-4 group-hover:border-gold group-hover:scale-105 transition-all duration-300 flex items-center justify-center bg-gradient-to-br from-gold/20 to-gold/5">
                    {msg.photoUrl ? (
                      <img src={msg.photoUrl} alt={msg.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-cinzel text-2xl font-bold text-gold select-none">
                        {msg.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 mb-6">
                    <h3 className="font-cinzel text-xs font-bold text-white tracking-wider">
                      {msg.name}
                    </h3>
                    <span className="text-[9px] uppercase tracking-widest text-gold font-medium">
                      {msg.relation}
                    </span>
                    <p className="text-gray-400 font-light text-xs italic leading-relaxed pt-3">
                      "{msg.quote}"
                    </p>
                  </div>

                  {/* Watch Button */}
                  <button
                    onClick={() => handlePlayVideo(msg)}
                    className="px-6 py-2.5 rounded-full bg-gold/10 border border-gold/30 text-gold hover:bg-gold hover:text-dark-900 font-cinzel text-[10px] tracking-widest uppercase transition-all duration-300 transform active:scale-95 flex items-center gap-1.5 cursor-pointer hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
                  >
                    <FiPlay />
                    Assistir
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="absolute inset-0" onClick={handleClosePlayer} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl aspect-video rounded-2xl border border-gold/30 overflow-hidden bg-dark-900 z-10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={handleClosePlayer}
                className="absolute top-4 left-4 text-white hover:text-gold bg-black/50 p-2 rounded-full z-20 cursor-pointer transition-colors"
                aria-label="Fechar"
              >
                <FiX size={20} />
              </button>

              {/* Progress and Sender Info Overlay */}
              <div className="absolute top-4 left-14 bg-black/50 px-3 py-1.5 rounded-full z-20 text-[10px] font-cinzel tracking-wider text-white">
                Mensagem {videoMessages.findIndex(v => v.id === activeVideo.id) + 1} de {videoMessages.length} - {activeVideo.name}
              </div>

              {/* Native HTML5 Video Player or YouTube Embed */}
              {activeVideo.videoUrl.includes('youtu.be') || activeVideo.videoUrl.includes('youtube.com') ? (
                <iframe
                  src={`https://www.youtube.com/embed/${
                    activeVideo.videoUrl.includes('youtu.be/') 
                      ? activeVideo.videoUrl.split('youtu.be/')[1].split('?')[0] 
                      : activeVideo.videoUrl.split('v=')[1].split('&')[0]
                  }?autoplay=1&rel=0`}
                  title={activeVideo.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <video
                  src={activeVideo.videoUrl}
                  autoPlay
                  controls
                  className="w-full h-full object-contain"
                  onEnded={handleVideoEnded}
                />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Completion Overlay Notification */}
      <AnimatePresence>
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="absolute inset-0" onClick={handleCloseCelebration} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm p-8 glass-panel-gold text-center z-10 shadow-2xl"
            >
              <div className="text-4xl text-gold mb-4 animate-bounce">💖</div>
              <h3 className="font-cinzel text-sm font-bold tracking-widest text-gold uppercase mb-3">
                Coração Aquecido
              </h3>
              <p className="font-playfair text-base italic text-gray-200 leading-relaxed font-light mb-6">
                "Você assistiu a todas as mensagens enviadas pelas pessoas que te amam. Que o amor de todos nós te proteja e te traga um aniversário inesquecível!"
              </p>
              <button
                onClick={handleCloseCelebration}
                className="btn-premium"
              >
                Concluir Memórias
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};
export default VideoSection;
