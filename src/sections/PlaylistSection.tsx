import React, { useState } from 'react';
import { audioSystem } from '../utils/audioSystem';
import { SecretSpot } from '../components/SecretsOverlay';
import { FiPlay, FiVolume2 } from 'react-icons/fi';

interface SongItem {
  id: number;
  trackId: string; // Spotify track ID
  title: string;
  artist: string;
  description: string;
  coverUrl: string;
}

export const PlaylistSection: React.FC = () => {
  const songs: SongItem[] = [
    {
      id: 1,
      trackId: '3ee8J151e3Jha4HIZ8g7v2', // Yellow - Coldplay
      title: 'Yellow',
      artist: 'Coldplay',
      description: 'A música que me lembra o brilho do seu olhar sempre que estamos juntos.',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      trackId: '0tgV52h6t0Jgl5u2CuNs6r', // Perfect - Ed Sheeran
      title: 'Perfect',
      artist: 'Ed Sheeran',
      description: 'Sobre a nossa sintonia impecável e o futuro lindo que estamos desenhando.',
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      trackId: '6b2uoL06TN4nU6Veeg453g', // A Thousand Years - Christina Perri
      title: 'A Thousand Years',
      artist: 'Christina Perri',
      description: 'Eu te amaria por mais mil anos, em todas as realidades possíveis.',
      coverUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 4,
      trackId: '3GZ2V9N837fBqCeaOQjM9Y', // De Janeiro a Janeiro - Roberta Campos
      title: 'De Janeiro a Janeiro',
      artist: 'Roberta Campos & Nando Reis',
      description: 'Porque o meu amor por você não tem folga, acontece de janeiro a janeiro.',
      coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const [activeSong, setActiveSong] = useState<SongItem>(songs[0]);

  const handleSelectSong = (song: SongItem) => {
    setActiveSong(song);
    audioSystem.playClick();
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    
    // Auto-pause background ambient music while listening to Spotify so tracks don't overlay
    audioSystem.stopMusic();
  };

  return (
    <section className="relative w-full min-h-screen bg-dark-900 px-6 py-32 md:py-40 flex flex-col items-center justify-center overflow-hidden">
      {/* Hidden Secret Spot 11 */}
      <SecretSpot id={11} type="star" className="bottom-1/3 left-16 text-base" />

      <div className="z-10 text-center max-w-4xl w-full flex flex-col items-center">
        {/* Header */}
        <div className="mb-24">
          <h2 className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold mb-4">
            Trilha Sonora do Amor
          </h2>
          <p className="font-playfair text-3xl md:text-5xl font-light text-white">
            Nossa Playlist
          </p>
          <p className="text-xs text-gray-400 mt-4 max-w-sm mx-auto">
            Cada música carrega um capítulo, uma risada ou uma viagem nossa. Toque para ouvir.
          </p>
        </div>

        {/* Player Layout */}
        <div className="w-full max-w-3xl flex flex-col md:flex-row gap-8 items-stretch">
          
          {/* Active Song Spotify Embed Card */}
          <div className="flex-1 glass-panel-gold p-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 shadow-inner">
                {/* Spotify Embed Player */}
                <iframe
                  src={`https://open.spotify.com/embed/track/${activeSong.trackId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen={false}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="absolute inset-0 rounded-xl"
                />
              </div>
              
              <div className="text-left pt-2">
                <span className="font-cinzel text-[10px] text-gold tracking-widest uppercase block mb-1">
                  Música Selecionada
                </span>
                <h3 className="font-cinzel text-lg font-bold text-white">
                  {activeSong.title}
                </h3>
                <p className="text-gray-400 text-xs font-light mb-4">
                  {activeSong.artist}
                </p>
                <div className="h-[1px] w-full bg-white/5 my-4" />
                <p className="font-playfair text-sm italic text-gray-300 leading-relaxed">
                  "{activeSong.description}"
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-gold text-xs font-cinzel tracking-wider pt-6">
              <FiVolume2 className="animate-pulse" />
              <span>Tocando via Spotify Embed</span>
            </div>
          </div>

          {/* Playlist Track Selection List */}
          <div className="flex-1 flex flex-col gap-3 justify-center">
            {songs.map((song) => {
              const isActive = activeSong.id === song.id;

              return (
                <button
                  key={song.id}
                  onClick={() => handleSelectSong(song)}
                  className={`w-full p-4 rounded-xl flex items-center gap-4 text-left border transition-all duration-300 cursor-pointer transform active:scale-[0.97] hover:border-gold/30 ${
                    isActive
                      ? 'bg-gold/10 border-gold text-white shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                      : 'bg-white/5 border-white/5 hover:border-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  {/* Miniature Cover */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/5 shrink-0">
                    <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Title & Artist */}
                  <div className="flex-grow min-w-0">
                    <h4 className="font-cinzel text-xs font-bold truncate">
                      {song.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 truncate">
                      {song.artist}
                    </p>
                  </div>

                  {/* Play Indicator Icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isActive ? 'bg-gold text-dark-900 scale-105 shadow-[0_0_8px_rgba(212,175,55,0.3)]' : 'bg-white/10 text-gold'
                  }`}>
                    {isActive ? <FiVolume2 /> : <FiPlay className="translate-x-[1px]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};
export default PlaylistSection;
