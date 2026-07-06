import { SecretsProvider } from './context/SecretsContext';
import { SecretsOverlay } from './components/SecretsOverlay';
import { StarryBackground } from './components/StarryBackground';
import { CustomCursor } from './components/CustomCursor';
import { AmbientMusicToggle } from './components/AmbientMusicToggle';
import { HeroSection } from './sections/HeroSection';
import { IntroSection } from './sections/IntroSection';
import { CounterSection } from './sections/CounterSection';
import { TimelineSection } from './sections/TimelineSection';
import { GallerySection } from './sections/GallerySection';
import { TimeCapsuleSection } from './sections/TimeCapsuleSection';
import { StarSkySection } from './sections/StarSkySection';
import { BookSection } from './sections/BookSection';
import { LoveCardsSection } from './sections/LoveCardsSection';
import { FutureSection } from './sections/FutureSection';
import { VideoSection } from './sections/VideoSection';
import { LetterSection } from './sections/LetterSection';
import { FinalSection } from './sections/FinalSection';
import { SurpriseSection } from './sections/SurpriseSection';
import './App.css';

function App() {
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

        {/* Mosaic photo gallery with Touch-friendly lightbox */}
        <div id="gallery"><GallerySection /></div>

        {/* Interactable chest holding first memories */}
        <div id="capsule"><TimeCapsuleSection /></div>

        {/* Interactive Constellation quality map */}
        <div id="starsky"><StarSkySection /></div>

        {/* 3D flip interactive memories book */}
        <div id="book"><BookSection /></div>

        {/* 3D rotate-on-hover Love card grid */}
        <div id="love-cards"><LoveCardsSection /></div>

        {/* Glowing road mapping our dreams */}
        <div id="future"><FutureSection /></div>

        {/* Carousel messages overlay player */}
        <div id="videos"><VideoSection /></div>

        {/* Wax-sealed envelope love letter */}
        <div id="letter"><LetterSection /></div>

        {/* Cinematic dark text transitions & glowing heart */}
        <div id="final"><FinalSection /></div>

        {/* Surprise video & falling stars confetti blast */}
        <div id="surprise"><SurpriseSection /></div>

      </main>
    </SecretsProvider>
  );
}

export default App;
