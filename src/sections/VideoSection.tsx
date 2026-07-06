import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactPlayer from 'react-player';
import { audioSystem } from '../utils/audioSystem';
import { SecretSpot } from '../components/SecretsOverlay';
import { FiPlay, FiCheckCircle, FiX } from 'react-icons/fi';

const Player = ReactPlayer as any;

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
      name: 'Maria (Mãe)',
      relation: 'Mãe',
      quote: 'Você é a minha maior felicidade, minha menina de ouro. Te amo daqui até a eternidade!',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      // High reliability fast loading sample video
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    {
      id: 2,
      name: 'Mariana',
      relation: 'Melhor Amiga',
      quote: 'Parabéns para a dona das minhas melhores risadas! Que o seu ano seja tão lindo quanto sua alma.',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
    },
    {
      id: 3,
      name: 'Lucas (Irmão)',
      relation: 'Irmão',
      quote: 'Orgulho demais de te ver crescer e realizar seus planos. Conte comigo pra tudo, sempre.',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
    },
    {
      id: 4,
      name: 'Roberto (Pai)',
      relation: 'Pai',
      quote: 'Minha filha amada, que Deus abençoe seu caminho. Estarei sempre aqui batendo palmas para você.',
      photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
    }
  ];

  const [activeVideo, setActiveVideo] = useState<VideoMessage | null>(null);
  const [watchedVideos, setWatchedVideos] = useState<number[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const handlePlayVideo = (msg: VideoMessage) => {
    setActiveVideo(msg);
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
  };

  return (
    <section className="relative w-full min-h-screen bg-dark-900 px-6 py-24 flex flex-col items-center justify-center overflow-hidden">
      {/* Hidden Secret Spot 14 */}
      <SecretSpot id={14} type="flower" className="bottom-16 right-20 text-sm" />

      <div className="z-10 text-center max-w-5xl w-full flex flex-col items-center">
        {/* Header */}
        <div className="mb-16">
          <h2 className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold mb-3">
            Amor Compartilhado
          </h2>
          <p className="font-playfair text-3xl md:text-5xl font-light text-white">
            Mensagens Para Você
          </p>
          <p className="text-xs text-gray-400 mt-4 max-w-sm mx-auto">
            Pessoas especiais que quiseram deixar um pedaço do carinho delas gravado para o seu dia.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
          {videoMessages.map((msg) => {
            const isWatched = watchedVideos.includes(msg.id);

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl glass-panel border border-white/10 p-5 flex flex-col justify-between items-center text-center shadow-lg hover:border-gold/30 transition-all duration-300 group"
              >
                {/* Watched Badge */}
                {isWatched && (
                  <span className="absolute top-3 right-3 text-gold text-sm" title="Visto">
                    <FiCheckCircle />
                  </span>
                )}

                {/* Portrait Circle */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold/30 mb-4 group-hover:border-gold transition-colors duration-300">
                  <img src={msg.photoUrl} alt={msg.name} className="w-full h-full object-cover" />
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
                  className="px-5 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold hover:bg-gold hover:text-dark-900 font-cinzel text-[10px] tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <FiPlay />
                  Assistir
                </button>
              </motion.div>
            );
          })}
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
              className="relative w-full max-w-2xl aspect-video rounded-2xl border border-gold/20 overflow-hidden bg-dark-900 z-10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={handleClosePlayer}
                className="absolute top-4 right-4 text-white hover:text-gold bg-black/50 p-2 rounded-full z-20 cursor-pointer transition-colors"
              >
                <FiX size={20} />
              </button>

              {/* Progress and Sender Info Overlay */}
              <div className="absolute top-4 left-4 bg-black/50 px-3 py-1.5 rounded-full z-20 text-[10px] font-cinzel tracking-wider text-white">
                Mensagem {videoMessages.findIndex(v => v.id === activeVideo.id) + 1} de {videoMessages.length} - {activeVideo.name}
              </div>

              {/* React Player integration */}
              <Player
                url={activeVideo.videoUrl}
                playing
                controls
                width="100%"
                height="100%"
                onEnded={handleVideoEnded}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Completion Overlay Notification */}
      <AnimatePresence>
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="absolute inset-0" onClick={() => setShowCelebration(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm p-8 rounded-2xl glass-panel-gold text-center z-10 shadow-2xl"
            >
              <div className="text-4xl text-gold mb-4 animate-bounce">💖</div>
              <h3 className="font-cinzel text-sm font-bold tracking-widest text-gold uppercase mb-3">
                Coração Aquecido
              </h3>
              <p className="font-playfair text-base italic text-gray-200 leading-relaxed font-light mb-6">
                "Você assistiu a todas as mensagens enviadas pelas pessoas que te amam. Que o amor de todos nós te proteja e te traga um aniversário inesquecível!"
              </p>
              <button
                onClick={() => {
                  setShowCelebration(false);
                  audioSystem.playClick();
                }}
                className="px-6 py-2 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-dark-900 font-cinzel text-xs tracking-wider transition-all duration-300"
              >
                Concluir Memórias
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};
export default VideoSection;
