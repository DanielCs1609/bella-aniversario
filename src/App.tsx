import { useEffect } from 'react';
import { SecretsProvider } from './context/SecretsContext';
import { SecretsOverlay } from './components/SecretsOverlay';
import { StarryBackground } from './components/StarryBackground';
import { CustomCursor } from './components/CustomCursor';
import { AmbientMusicToggle } from './components/AmbientMusicToggle';
import { HeroSection } from './sections/HeroSection';
import { IntroSection } from './sections/IntroSection';
import { CounterSection } from './sections/CounterSection';
import { TimelineSection } from './sections/TimelineSection';
import { StarSkySection } from './sections/StarSkySection';
import { VideoSection } from './sections/VideoSection';
import { LetterSection } from './sections/LetterSection';
import { FinalSection } from './sections/FinalSection';
import { audioSystem } from './utils/audioSystem';
import './App.css';

function App() {
  useEffect(() => {
    // Try to autoplay immediately
    audioSystem.playMusic();

    const startAudioOnInteraction = () => {
      audioSystem.playMusic();
      // Remove listeners after first interaction
      window.removeEventListener('click', startAudioOnInteraction);
      window.removeEventListener('touchstart', startAudioOnInteraction);
      window.removeEventListener('keydown', startAudioOnInteraction);
      window.removeEventListener('scroll', startAudioOnInteraction);
    };

    window.addEventListener('click', startAudioOnInteraction);
    window.addEventListener('touchstart', startAudioOnInteraction);
    window.addEventListener('keydown', startAudioOnInteraction);
    window.addEventListener('scroll', startAudioOnInteraction);

    return () => {
      window.removeEventListener('click', startAudioOnInteraction);
      window.removeEventListener('touchstart', startAudioOnInteraction);
      window.removeEventListener('keydown', startAudioOnInteraction);
      window.removeEventListener('scroll', startAudioOnInteraction);
    };
  }, []);

  const handleStartScroll = () => {
    const introElement = document.getElementById('intro');
    if (introElement) {
      introElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SecretsProvider>
      {/* Global Interactive Background & Canvas Particles */}
      <StarryBackground />

      {/* Premium Desktop-only Custom Cursor */}
      <CustomCursor />

      {/* Floating Audio Manager (Spotify style wave / mute control) */}
      <AmbientMusicToggle />

      {/* Hidden Message / Easter Egg overlay controller */}
      <SecretsOverlay />

      {/* Main Single Page vertical scroll container */}
      <main className="relative z-10 w-full min-h-screen flex flex-col bg-transparent selection:bg-gold/30 selection:text-white">
        
        {/* Tela 1: Hero Start page */}
        <HeroSection onStart={handleStartScroll} />

        {/* Tela 2: Fade-in intro and portrait */}
        <div id="intro"><IntroSection /></div>

        {/* Live counter (how long we have been together) */}
        <div id="counter"><CounterSection /></div>

        {/* Luminescent Timeline Connectors */}
        <div id="timeline"><TimelineSection /></div>

        {/* Interactive Constellation quality map */}
        <div id="starsky"><StarSkySection /></div>

        {/* Carousel messages overlay player */}
        <div id="videos"><VideoSection /></div>

        {/* Wax-sealed envelope love letter */}
        <div id="letter"><LetterSection /></div>

        {/* Cinematic dark text transitions & glowing heart */}
        <div id="final"><FinalSection /></div>

      </main>
    </SecretsProvider>
  );
}

export default App;
